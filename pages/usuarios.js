import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button, UnstyledButton } from "@mantine/core";
import { useState } from "react";

import Layout from "../components/Layout";
import styles from "../styles/Usuarios.module.css";

import { AuthContextProvider, useAuth } from "../context/AuthContext";

const Usuarios = () => {
  const { user, signup } = useAuth();
  const [mensajeError, setMensajeError] = useState("");

  const form = useForm({
    initialValues: {
      nombre: "",
      correo: "",
      perfil: "",
      telefono: "",
      clave: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      nombre: (value) => (value.length < 1 ? "Introduce un Nombre" : null),
      correo: (value) => (/^\S+@\S+$/.test(value) ? null : "Correo Invalido"),
      perfil: (value) => (value.length < 1 ? "Introduce un Perfil" : null),
      telefono: (value) => (value.length < 1 ? "Introduce un Teléfono" : null),
      clave: (value) => (value.length < 1 ? "Introduce una Contraseña" : null),
    },
  });

  const crearUsuario = async () => {
    const nombre = form.values["nombre"];
    const correo = form.values["correo"];
    const perfil = form.values["perfil"];
    const telefono = form.values["telefono"];
    const clave = form.values["clave"];

    try {
      console.log("INICIANDO");
      await signup(correo, clave);
    } catch (error) {
      // console.log(error.code)
      console.log(error);
    }
  };

  return (
    <AuthContextProvider>
      <Layout>
        <h1>{mensajeError}</h1>
        <form
          className={styles.formulario}
          onSubmit={form.onSubmit(crearUsuario)}
        >
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

          <UnstyledButton
            className={styles.formulario__boton}
            type="submit"
            mt="sm"
          >
            Crear
          </UnstyledButton>
        </form>
      </Layout>
    </AuthContextProvider>
  );
};

export default Usuarios;
