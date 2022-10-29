import styles from "../styles/ListaUsuarios.module.css";

const ListaUsuarios = ({ usuarios }) => {
  return (
    <table className={styles.minimalistBlack}>
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <th>Correo Electr&oacute;nico</th>
          <th>Perfil</th>
          <th>Tel&eacute;fono</th>
          <th>Contrase&ntilde;a</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => {
          return (
            <tr>
              <td>{usuario["nombre"]}</td>
              <td>{usuario["correo"]}</td>
              <td>{usuario["perfil"]}</td>
              <td>{usuario["telefono"]}</td>
              <td>{usuario["clave"]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListaUsuarios;
