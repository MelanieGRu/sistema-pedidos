import { useAuth } from '../context/AuthContext';
import { Button } from '@mantine/core';
import styles from '../styles/ModalEliminarUsuario.module.css';

const ModalEliminarCategoria = ({ categoria }) => {
  const { eliminarCategoria } = useAuth();

  const eliminar = () => {
    eliminarCategoria(categoria['id']);
  };
  return (
    <div className={styles.modal}>
      <h3>¿Desea eliminar la siguiente categoria ?</h3>
      <div>
        <p>
          Categoria: <span className={styles.span}>{categoria['nombre']}</span>
        </p>
      </div>

      <Button onClick={eliminar} color='red'>
        Eliminar
      </Button>
    </div>
  );
};

export default ModalEliminarCategoria;
