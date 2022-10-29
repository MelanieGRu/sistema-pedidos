import { useAuth } from "../context/AuthContext";
import { Button } from "@mantine/core";
import styles from "../styles/ModalEliminarUsuario.module.css";

const ModalEliminarUsuario = ({ usuario }) => {
  const { user, eliminar } = useAuth();

  const eliminarUsuario = () => {
    eliminar(usuario["id"]);
  };

  return (
    <div className={styles.modal}>
      <h3>¿Eliminar el siguiente usuario?</h3>
      <div>
        <p>
          Nombre Completo:{" "}
          <span className={styles.span}>{usuario["nombre"]}</span>
        </p>
        <p>
          Correo Electrónico:{" "}
          <span className={styles.span}>{usuario["correo"]}</span>
        </p>
        <p>
          Perfil: <span className={styles.span}>{usuario["perfil"]}</span>
        </p>
        <p>
          Teléfono: <span className={styles.span}>{usuario["telefono"]}</span>
        </p>
        <p>
          Rol: <span className={styles.span}>{usuario["rol"]}</span>
        </p>
      </div>

      <Button onClick={eliminarUsuario} color="red">
        Eliminar
      </Button>
    </div>
  );
};

export default ModalEliminarUsuario;
