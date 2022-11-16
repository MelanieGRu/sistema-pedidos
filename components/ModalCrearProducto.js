import { useForm } from "@mantine/form";
import { IconX, IconUpload } from "@tabler/icons";

import {
  NumberInput,
  TextInput,
  UnstyledButton,
  Notification,
  FileInput,
  NativeSelect,
  Select,
} from "@mantine/core";
import styles from "../styles/ModalCrearProducto.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormData from "form-data";

import axios from "axios";

const ModalCrearProducto = ({ categorias }) => {
  const { crearProducto, subirImagen } = useAuth();
  const [mensajeError, setMensajeError] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [controlCategorias, setControlCategorias] = useState([
    "Eliga una categoria",
  ]);
  let selectorCategorias = categorias.map((categoria) => {
    return categoria["nombre"];
  });

  const form = useForm({
    initialValues: {
      nombre: "",
      cantidad: "",
      categoria: "",
    },
  });

  const { nombre, cantidad, categoria } = form.values;

  const crear = async (e) => {
    setMensajeError(null);

    if (
      nombre === "" ||
      cantidad === "" ||
      categoria === "" ||
      archivo == null
    ) {
      setMensajeError("Rellenar todos los campos");
      return;
    }

    // GUARDAR IMAGEN EN ARCHIVO LOCAL
    const formData = new FormData();
    formData.append("myImage", archivo);

    const { data } = await axios.post("/api/image", formData);
    const { data2 } = await axios.post("/api/image2", formData);

    const datos = {
      nombre: nombre.toUpperCase(),
      stock: cantidad,
      categoria_id: categoria,
      imagen: data["nombre"],
    };

    setArchivo(null);
    crearProducto(datos);
  };

  return (
    <div>
      <form className={styles.formulario} onSubmit={form.onSubmit(crear)}>
        <h1>Crear Producto</h1>

        <div className={styles.campos}>
          <TextInput
            className={styles.formulario__input}
            placeholder="Nombre completo..."
            label="Nombre del producto"
            {...form.getInputProps("nombre")}
          />

          <NumberInput
            className={styles.formulario__input}
            placeholder="Cantidad del producto"
            label="Cantidad"
            {...form.getInputProps("cantidad")}
          />

          <Select
            data={selectorCategorias}
            label="Categorías"
            placeholder="Seleccione una categoría"
            {...form.getInputProps("categoria")}
          />
          {/* <input type='file' onChange={(e) => setArchivo(e.target.files[0])} /> */}

          {
            <FileInput
              label="Subir icono"
              placeholder="Icono del producto"
              accept="image/png,image/jpeg"
              onChange={(e) => setArchivo(e)}
              type="file"
            />
          }
        </div>

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
          Crear
        </UnstyledButton>
      </form>
    </div>
  );
};

export default ModalCrearProducto;
