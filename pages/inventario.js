import { ActionIcon, Modal, Title } from '@mantine/core';
import Layout from '../components/Layout';
import { IconPlus } from '@tabler/icons';
import ListaInventario from '../components/ListaInventario';
import ModalCrearProducto from '../components/ModalCrearProducto';
import { useState } from 'react';
import styles from '../styles/Inventario.module.css';

const Inventario = ({ productos }) => {
  const [openedEditar, setOpenedEditar] = useState(false);
  const abrirModalEditar = () => {
    setOpenedEditar(true);
  };
  return (
    <Layout>
      <div className={styles.contenido}>
        <Title align='center'>Lista de productos</Title>
        <div className={styles.btnAgregar}>
          <ActionIcon
            variant='filled'
            color='#01497c'
            onClick={(e) => abrirModalEditar()}
          >
            <IconPlus size={18} />
          </ActionIcon>
        </div>
        <ListaInventario productos={productos} />
      </div>
      <Modal opened={openedEditar} onClose={() => setOpenedEditar(false)}>
        <ModalCrearProducto />
      </Modal>
    </Layout>
  );
};

export default Inventario;

export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/productos');
  const productos = await res.json();

  return {
    props: {
      productos,
    },
  };
}
