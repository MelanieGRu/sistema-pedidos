import Layout from "./Layout";
import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button, UnstyledButton } from "@mantine/core";
import styles from "../styles/Login.module.css";

const Login = () => {
  const form = useForm({
    initialValues: { correo: "", clave: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      correo: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : "Introduce un correo electrónico válido",
    },
  });

  const iniciarSesion = () => {
    console.log("hi");
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
