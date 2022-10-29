import Layout from "./Layout";
import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  UnstyledButton,
  Notification,
} from "@mantine/core";
import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { IconX } from "@tabler/icons";
import { userAgentFromString } from "next/server";

const Login = () => {
  const { user, logout, login } = useAuth();
  const [mensajeError, setMensajeError] = useState(null);

  const form = useForm({
    initialValues: { correo: "", clave: "" },
  });

  const iniciarSesion = async () => {
    setMensajeError(null);
    const correo = form.values["correo"];
    const clave = form.values["clave"];
    if (correo === "" || clave === "") {
      setMensajeError("Introducir valores para todos los campos");
      return;
    }

    try {
      await login(correo, clave);
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        setMensajeError(
          "No pudimos encontrar una cuenta con el correo introducido"
        );
        return;
      }
      if (error.code === "auth/wrong-password") {
        setMensajeError("Contraseña incorrecta");
        return;
      }
    }

    setMensajeError(null);
  };

  return (
    <div>
      <div className={styles.login}>
        <form
          className={styles.formulario}
          onSubmit={form.onSubmit(iniciarSesion)}
        >
          <h1 className={styles.formulario__titulo}>
            Sistema de Control de Inventario
          </h1>
          <p className={styles.formulario__label}>Correo Electrónico</p>
          <TextInput
            placeholder="Correo electrónico..."
            {...form.getInputProps("correo")}
          />
          <p className={styles.formulario__label}>Contraseña</p>
          <TextInput
            placeholder="Contraseña..."
            type="password"
            {...form.getInputProps("clave")}
          />

          {mensajeError === null ? null : (
            <Notification
              className={styles.notificacion}
              icon={<IconX size={18} />}
              color="red"
              disallowClose
            >
              {mensajeError}
            </Notification>
          )}

          <UnstyledButton
            className={styles.formulario__boton}
            type="submit"
            mt="sm"
          >
            Entrar
          </UnstyledButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
