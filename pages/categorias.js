import FormularioCategorias from "../components/FormularioCategorias";
import Layout from "../components/Layout";

const Categorias = ({ categorias }) => {
  return (
    <Layout>
      <div>
        <FormularioCategorias categorias={categorias} />
      </div>
    </Layout>
  );
};

export default Categorias;

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/categorias");
  const categorias = await res.json();

  return {
    props: {
      categorias,
    },
  };
}
