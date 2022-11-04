import styles from '../styles/ListaCategorias.module.css';
import { ActionIcon, Modal } from '@mantine/core';
import { useState } from 'react';
import { IconHighlight, IconTrash } from '@tabler/icons';
import ModalEliminarCategoria from './ModalEliminarCategoria';
import ModalModificarCategoria from './ModalModificarCategoria';

const ListaCategorias = ({ categorias }) => {
  const [openedEditar, setOpenedEditar] = useState(false);
  const [openedEliminar, setOpenedEliminar] = useState(false);
  const [categoriaActual, setCategoriaActual] = useState(null);

  const abrirModalEditar = (categoria) => {
    setCategoriaActual(categoria);
    setOpenedEditar(true);
  };

  const abrirModalEliminar = (categoria) => {
    setCategoriaActual(categoria);
    setOpenedEliminar(true);
  };
  return (
    <div>
      <div>
        <table className={styles.minimalistBlack}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => {
              return (
                <tr key={categoria.id}>
                  <td>{categoria['nombre']}</td>
                  <td>
                    <div className={styles.editar}>
                      <ActionIcon onClick={(e) => abrirModalEditar(categoria)}>
                        <IconHighlight size={18} />
                      </ActionIcon>
                      <ActionIcon
                        onClick={(e) => abrirModalEliminar(categoria)}
                      >
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
          <ModalModificarCategoria categoria={categoriaActual} />
        </Modal>

        <Modal opened={openedEliminar} onClose={() => setOpenedEliminar(false)}>
          <ModalEliminarCategoria categoria={categoriaActual} />
        </Modal>
      </div>
    </div>
  );
};

export default ListaCategorias;
