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
import FormularioRegistrar from "../components/FormularioRegistrar";
import ListaUsuarios from "../components/ListaUsuarios";

const Usuarios = ({ usuarios }) => {
  const { user, signup } = useAuth();

  console.log(usuarios);

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
  console.log("HI");
  const usuariosRes = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/usuarios`
  );
  console.log(usuariosRes);
  return {
    props: {
      usuarios: usuariosRes,
    },
  };
}
