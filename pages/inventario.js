import { ActionIcon, Title } from '@mantine/core';
import Layout from '../components/Layout';
import { IconPlus } from '@tabler/icons';
import ListaInventario from '../components/ListaInventario';

const Inventario = () => {
  return (
    <Layout>
      <div>
        <Title align='center'>Lista de productos</Title>
        <div>
          <ActionIcon variant='filled' color='#01497c'>
            <IconPlus size={18} />
          </ActionIcon>
          <ListaInventario />
        </div>
      </div>
    </Layout>
  );
};

export default Inventario;
