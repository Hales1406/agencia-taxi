"use client";
import { Flex, TextField, Button, Text } from "@radix-ui/themes";
import { PersonIcon, LockClosedIcon, MobileIcon } from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import React from "react";

function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      tel: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
  });
  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        <label htmlFor="name">Nombre</label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: "El nombre es obligatorio",
            },
          }}
          render={({ field }) => (
            <TextField.Root
              type="text"
              placeholder="Ingrese su nombre completo"
              autoFocus
              {...field}
            >
              <TextField.Slot>
                <PersonIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.name && (
          <Text color="ruby" className="text-xs">
            {errors.name.message}
          </Text>
        )}

        <label htmlFor="tel">Teléfono</label>
        <Controller
          name="tel"
          control={control}
          rules={{
            required: {
              value: true,
              message: "El número de teléfono es obligatorio",
            },
            pattern: {
              value: /^[0-9]{8}$/,
              message: "El número de teléfono debe tener 8 dígitos",
            },
          }}
          render={({ field }) => (
            <TextField.Root
              type="tel"
              placeholder="Ingrese su número de teléfono sin +53"
              {...field}
            >
              <TextField.Slot>
                <MobileIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.tel && (
          <Text color="ruby" className="text-xs">
            {errors.tel.message}
          </Text>
        )}

        <label htmlFor="password">Contraseña</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: "La contraseña es obligatoria",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          }}
          render={({ field }) => (
            <TextField.Root
              type="password"
              placeholder="Ingrese su contraseña"
              {...field}
            >
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.password && (
          <Text color="ruby" className="text-xs">
            {errors.password.message}
          </Text>
        )}
        <Button type="submit" mt="4">
          Registrarse
        </Button>
      </Flex>
    </form>
  );
}

export default SignupForm;
