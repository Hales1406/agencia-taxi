"use client";
import { Flex, TextField, Button } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  MobileIcon,
} from "@radix-ui/react-icons";
import React from "react";

function SigninForm() {
  return (
    <Flex direction="column" gap="2">
      {/*<label htmlFor="email">Email:</label>
            <TextField.Root
                type="email"
                placeholder="Entre su correo electrónico"
                autoFocus
            >
                <TextField.Slot>
                    <EnvelopeClosedIcon height="16" width="16" />
                </TextField.Slot>

            </TextField.Root>*/}

      <label htmlFor="tel">Teléfono</label>
      <TextField.Root
        type="tel"
        placeholder="Entre su número de teléfono sin +53"
        prefix="+53"
        autoFocus
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

      <Button>Inicia</Button>
    </Flex>
  );
}

export default SigninForm;
