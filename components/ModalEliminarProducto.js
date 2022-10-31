import { useAuth } from '../context/AuthContext';
import { Button } from '@mantine/core';
import styles from '../styles/ModalEliminarUsuario.module.css';

const ModalEliminarProducto = ({ producto }) => {
  const { eliminarProducto } = useAuth();

  const eliminar = () => {
    eliminarProducto(producto['id']);
  };
  return (
    <div className={styles.modal}>
      <h3>¿Desea eliminar el siguiente producto ?</h3>
      <div>
        <p>
          Producto: <span className={styles.span}>{producto['nombre']}</span>
        </p>
        <p>
          Cantidad: <span className={styles.span}>{producto['stock']}</span>
        </p>
      </div>

      <Button onClick={eliminar} color='red'>
        Eliminar
      </Button>
    </div>
  );
};

export default ModalEliminarProducto;
