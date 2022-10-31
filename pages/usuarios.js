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

import FormularioRegistrar from "../components/FormularioRegistrar";
import ListaUsuarios from "../components/ListaUsuarios";

const Usuarios = ({ usuarios }) => {
  return (
    <Layout>
      <FormularioRegistrar />
      <h1 className={styles.titulo}>Cuentas Creadas</h1>
      <ListaUsuarios usuarios={usuarios} />
    </Layout>
  );
};

export default Usuarios;

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/usuarios");
  const usuarios = await res.json();

  return {
    props: {
      usuarios,
    },
  };
}
