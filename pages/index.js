import {
  AspectRatio,
  Button,
  Card,
  CardSection,
  Group,
  Text,
  Title,
} from '@mantine/core';

import Image from 'next/image';

import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Index.module.css';

export default function Home({ usuarios }) {
  return (
    <Layout>
      <div className={styles.cuadros}>
        <Card className={styles.card} shadow='sm' p='lg' radius='md' withBorder>
          <CardSection>
            <Image
              src='/assets/img/inventario.png'
              width={1920}
              height={1080}
              alt='Norway'
            />
          </CardSection>

          <Group position='apart' mt='md' mb='xs'>
            <Title>Inventario</Title>
          </Group>

          <Text size='m' color='dimmed' className={styles.resumen}>
            En esta sección podrá ver el inventario de la empresa, así como
            agregar, editar y eliminar productos.
          </Text>

          <Link href='/inventario'>
            <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
              Revisar inventario
            </Button>
          </Link>
        </Card>
        <Card className={styles.card} shadow='sm' p='lg' radius='md' withBorder>
          <CardSection>
            <Image
              src='/assets/img/categorias.png'
              width={1920}
              height={1080}
              alt='Norway'
            />
          </CardSection>

          <Group position='apart' mt='md' mb='xs'>
            <Title>Categorías</Title>
          </Group>

          <Text size='m' color='dimmed' className={styles.resumen}>
            En esta sección se pueden agregar, editar y eliminar categorías de
            los productos del inventario.
          </Text>

          <Link href='/categorias'>
            <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
              Modificar categorías
            </Button>
          </Link>
        </Card>
        <Card className={styles.card} shadow='sm' p='lg' radius='md' withBorder>
          <CardSection>
            <Image
              src='/assets/img/pedidos.png'
              width={1920}
              height={1080}
              alt='Norway'
            />
          </CardSection>

          <Group position='apart' mt='md' mb='xs'>
            <Title>Pedidos</Title>
          </Group>

          <Text size='m' color='dimmed' className={styles.resumen}>
            En esta sección se podrá ver los pedidos que se han realizado y
            llevar un control de los mismos.
          </Text>

          <Link href='/pedidos'>
            <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
              Revisar pedidos
            </Button>
          </Link>
        </Card>
        <Card className={styles.card} shadow='sm' p='lg' radius='md' withBorder>
          <CardSection>
            <Image
              src='/assets/img/usuarios.png'
              width={1920}
              height={1080}
              radius='md'
              alt='Norway'
            />
          </CardSection>

          <Group position='apart' mt='md' mb='xs'>
            <Title>Usuarios</Title>
          </Group>

          <Text size='m' color='dimmed' className={styles.resumen}>
            En esta sección se pueden agregar, editar y eliminar usuarios.
          </Text>

          <Link href='/usuarios'>
            <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
              Modificar usuarios
            </Button>
          </Link>
        </Card>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/usuarios');
  const usuarios = await res.json();

  return {
    props: {
      usuarios,
    },
  };
}
