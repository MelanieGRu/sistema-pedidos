import { useForm } from "@mantine/form";
import { IconX, IconCheck } from "@tabler/icons";
import {
  NumberInput,
  TextInput,
  Button,
  UnstyledButton,
  Chip,
  Notification,
} from "@mantine/core";
import { useState } from "react";

import Layout from "../components/Layout";
import styles from "../styles/Usuarios.module.css";
import { useAuth } from "../context/AuthContext";
import { fetcher } from "../lib/api";

const FormularioRegistrar = () => {
  const [mensajeError, setMensajeError] = useState(null);
  const [mensajeCuentaCreada, setMensajeCuentaCreada] = useState(null);

  const form = useForm({
    initialValues: {
      nombre: "",
      correo: "",
      perfil: "",
      telefono: "",
      clave: "",
      rol: "",
    },
  });

  const crearUsuario = async () => {
    setMensajeCuentaCreada(null);
    setMensajeError(null);
    const nombre = form.values["nombre"];
    const correo = form.values["correo"];
    const perfil = form.values["perfil"];
    const telefono = form.values["telefono"];
    const clave = form.values["clave"];
    const rol = form.values["rol"];

    if (
      nombre === "" ||
      correo === "" ||
      perfil === "" ||
      telefono === "" ||
      clave === "" ||
      rol === ""
    ) {
      setMensajeError("Rellenar todos los campos");
      return;
    }

    try {
      await signup(correo, clave);

      setMensajeError(null);
      setMensajeCuentaCreada("Cuenta ha sido creada");
      return;
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setMensajeError("Correo electrónico es invalido");
        return;
      }
      if (error.code === "auth/email-already-in-use") {
        setMensajeError("Ya existe usuario con ese correo electrónico");
      }
      if (error.code === "auth/weak-password") {
        setMensajeError("Contraseña debe tener por lo menos 6 caracteres");
      }
      console.log(error.code);
    }
  };

  return (
    <form className={styles.formulario} onSubmit={form.onSubmit(crearUsuario)}>
      <h1 className={styles.formulario__titulo}>Crear Usuario</h1>

      <div className={styles.formulario__label__input}>
        <p className={styles.formulario__label}>Nombre Completo</p>
        <TextInput
          className={styles.formulario__input}
          placeholder="Nombre completo..."
          {...form.getInputProps("nombre")}
        />
      </div>

      <div className={styles.formulario__label__input}>
        <p className={styles.formulario__label}>Correo Electrónico</p>
        <TextInput
          className={styles.formulario__input}
          placeholder="correo@ejemplo.com"
          {...form.getInputProps("correo")}
        />
      </div>

      <div className={styles.formulario__label__input}>
        <p className={styles.formulario__label}>Perfil</p>
        <TextInput
          className={styles.formulario__input}
          placeholder="Perfil..."
          {...form.getInputProps("perfil")}
        />
      </div>

      <div className={styles.formulario__label__input}>
        <p className={styles.formulario__label}>Teléfono</p>
        <TextInput
          className={styles.formulario__input}
          placeholder="123-1234-1234"
          {...form.getInputProps("telefono")}
        />
      </div>

      <div className={styles.formulario__label__input}>
        <p className={styles.formulario__label}>Contraseña</p>
        <TextInput
          className={styles.formulario__input}
          placeholder="Introducir contraseña..."
          type="password"
          {...form.getInputProps("clave")}
        />
      </div>

      <Chip.Group
        className={styles.chips}
        position="center"
        {...form.getInputProps("rol")}
      >
        <Chip size="lg" value="admin">
          Administrador
        </Chip>
        <Chip size="lg" value="cliente">
          Cliente
        </Chip>
      </Chip.Group>

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

      {mensajeCuentaCreada === null ? null : (
        <Notification
          className={styles.notificacion}
          icon={<IconCheck size={18} />}
          color="green"
          disallowClose
        >
          {mensajeCuentaCreada}
        </Notification>
      )}

      <UnstyledButton
        className={styles.formulario__boton}
        type="submit"
        mt="sm"
      >
        Crear
      </UnstyledButton>
    </form>
  );
};

export default FormularioRegistrar;
