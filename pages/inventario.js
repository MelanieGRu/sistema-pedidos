import { ActionIcon, Center, Modal, Title } from "@mantine/core";
import Layout from "../components/Layout";
import { IconPlus } from "@tabler/icons";
import ListaInventario from "../components/ListaInventario";
import ModalCrearProducto from "../components/ModalCrearProducto";
import { useState } from "react";
import styles from "../styles/Inventario.module.css";

const Inventario = ({ productos, categorias }) => {
  const [openedEditar, setOpenedEditar] = useState(false);
  const abrirModalEditar = () => {
    setOpenedEditar(true);
  };
  return (
    <Layout>
      <Center>
        <div className={styles.contenido}>
          <Title align="center">Lista de productos</Title>
          <div className={styles.componentes}>
            <div className={styles.btnAgregar}>
              <ActionIcon
                variant="filled"
                color="#01497c"
                onClick={(e) => abrirModalEditar()}
              >
                <IconPlus size={18} />
              </ActionIcon>
            </div>
            <ListaInventario productos={productos} />
          </div>
        </div>
        <Modal opened={openedEditar} onClose={() => setOpenedEditar(false)}>
          <ModalCrearProducto categorias={categorias} />
        </Modal>
      </Center>
    </Layout>
  );
};

export default Inventario;

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/productos");
  const productos = await res.json();

  const respon = await fetch("http://localhost:1337/categorias");
  const categorias = await respon.json();

  const resUsuarios = await fetch("http://localhost:1337/usuarios");
  const usuarios = await resUsuarios.json();

  return {
    props: {
      productos,
      categorias,
    },
  };
}
