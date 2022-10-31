import styles from '../styles/ListaUsuarios.module.css';
import { ActionIcon, Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { IconHighlight, IconTrash } from '@tabler/icons';
import ModalModificarProducto from './ModalModificarProducto';
import ModalEliminarProducto from './ModalEliminarProducto';

const ListaInventario = ({ productos }) => {
  const [openedEditar, setOpenedEditar] = useState(false);
  const [openedEliminar, setOpenedEliminar] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

  const abrirModalEditar = (producto) => {
    setProductoActual(producto);
    setOpenedEditar(true);
  };

  const abrirModalEliminar = (producto) => {
    setProductoActual(producto);
    setOpenedEliminar(true);
  };

  return (
    <div>
      <table className={styles.minimalistBlack}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => {
            return (
              <tr key={producto.id}>
                <td>{producto['id']}</td>
                <td>{producto['nombre']}</td>
                <td>{producto['stock']}</td>
                <td>
                  <div className={styles.editar}>
                    <ActionIcon onClick={(e) => abrirModalEditar(producto)}>
                      <IconHighlight size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={(e) => abrirModalEliminar(producto)}>
                      <IconTrash size={18} color='red' />
                    </ActionIcon>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal opened={openedEditar} onClose={() => setOpenedEditar(false)}>
        <ModalModificarProducto producto={productoActual} />
      </Modal>

      <Modal opened={openedEliminar} onClose={() => setOpenedEliminar(false)}>
        <ModalEliminarProducto producto={productoActual} />
      </Modal>
    </div>
  );
};

export default ListaInventario;
