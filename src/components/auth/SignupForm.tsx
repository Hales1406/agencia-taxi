"use client";
import { Flex, TextField, Button } from "@radix-ui/themes";
import { PersonIcon, LockClosedIcon, MobileIcon } from "@radix-ui/react-icons";
import React from "react";

function SignupForm() {
  return (
    <Flex direction="column" gap="2">
      <label htmlFor="name">Nombre:</label>
      <TextField.Root
        type="text"
        placeholder="Entre su nombre y apellidos"
        autoFocus
      >
        <TextField.Slot>
          <PersonIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="tel">Teléfon</label>
      <TextField.Root
        type="tel"
        placeholder="Entre su número de teléfono sin +53"
        prefix="+53"
      >
        <TextField.Slot>
          <MobileIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <label htmlFor="password">Contraseña:</label>
      <TextField.Root type="password" placeholder="******">
        <TextField.Slot>
          <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Button>Registrarse</Button>
    </Flex>
  );
}

export default SignupForm;
