import styles from "../styles/ListaUsuarios.module.css";
import { ActionIcon, Modal, Button, Group } from "@mantine/core";
import { useState } from "react";
import { IconHighlight, IconTrash } from "@tabler/icons";
import ModalModificarUsuario from "./ModalModificarUsuario";
import ModalEliminarUsuario from "./ModalEliminarUsuario";

const ListaUsuarios = ({ usuarios }) => {
  const [openedEditar, setOpenedEditar] = useState(false);
  const [openedEliminar, setOpenedEliminar] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const abrirModalEditar = (usuario) => {
    setUsuarioActual(usuario);
    setOpenedEditar(true);
  };

  const abrirModalEliminar = (usuario) => {
    setUsuarioActual(usuario);
    setOpenedEliminar(true);
  };

  return (
    <div>
      <table className={styles.minimalistBlack}>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Correo Electr&oacute;nico</th>
            <th>Perfil</th>
            <th>Tel&eacute;fono</th>
            <th>Contrase&ntilde;a</th>
            <th>Rol</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            return (
              <tr key={usuario.correo}>
                <td>{usuario["nombre"]}</td>
                <td>{usuario["correo"]}</td>
                <td>{usuario["perfil"]}</td>
                <td>{usuario["telefono"]}</td>
                <td>{usuario["clave"]}</td>
                <td>{usuario["rol"]}</td>
                <td>
                  <div className={styles.editar}>
                    <ActionIcon onClick={(e) => abrirModalEditar(usuario)}>
                      <IconHighlight size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={(e) => abrirModalEliminar(usuario)}>
                      <IconTrash size={18} color="red" />
                    </ActionIcon>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal opened={openedEditar} onClose={() => setOpenedEditar(false)}>
        <ModalModificarUsuario usuario={usuarioActual} />
      </Modal>

      <Modal opened={openedEliminar} onClose={() => setOpenedEliminar(false)}>
        <ModalEliminarUsuario usuario={usuarioActual} />
      </Modal>
    </div>
  );
};

export default ListaUsuarios;
