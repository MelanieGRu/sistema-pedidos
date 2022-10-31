import { Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import styles from "../styles/FormularioCategorias.module.css";
import { useAuth } from "../context/AuthContext";
import ListaCategorias from "./ListaCategorias";

const FormularioCategorias = ({ categorias }) => {
  const { crearCategoria } = useAuth();
  const form = useForm({
    initialValues: { categoria: "" },

    validate: {
      categoria: (value) => (value === "" ? "Debe introducir un nombre" : null),
    },
  });

  const { categoria } = form.values;

  const guardarCategoria = () => {
    const datos = {
      nombre: categoria.toUpperCase(),
    };
    crearCategoria(datos);
  };

  return (
    <div>
      <div className={styles.formulario}>
        <Title className={styles.formulario__titulo} align="center">
          Crear nueva categoría
        </Title>
        <form onSubmit={form.onSubmit(guardarCategoria)}>
          <TextInput
            label="Nombre"
            placeholder="Nombre de la categoría"
            {...form.getInputProps("categoria")}
          />
          <div className={styles.contenidoForm}>
            <Button type="submit" mt="sm">
              Crear categoría
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.listaCategorias}>
        <ListaCategorias categorias={categorias} />
      </div>
    </div>
  );
};

export default FormularioCategorias;
