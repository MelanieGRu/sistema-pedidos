import Layout from '../components/Layout';
import styles from '../styles/Usuarios.module.css';

import FormularioRegistrar from '../components/FormularioRegistrar';
import ListaUsuarios from '../components/ListaUsuarios';

const Usuarios = ({ usuarios }) => {
  return (
    <Layout>
      <div className={styles.contenido__usuarios}>
        <FormularioRegistrar />
        <h1 className={styles.titulo}>Cuentas Creadas</h1>
        <ListaUsuarios usuarios={usuarios} />
      </div>
    </Layout>
  );
};

export default Usuarios;

export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/usuarios');
  const usuarios = await res.json();

  return {
    props: {
      usuarios,
    },
  };
}
