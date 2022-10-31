import { useForm } from '@mantine/form';
import { IconX } from '@tabler/icons';
import {
  NumberInput,
  TextInput,
  Button,
  Chip,
  UnstyledButton,
  Notification,
} from '@mantine/core';
import styles from '../styles/ModalCrearProducto.module.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ModalCrearProducto = ({ usuario }) => {
  const { crearProducto } = useAuth();

  const [mensajeError, setMensajeError] = useState(null);

  const form = useForm({
    initialValues: {
      nombre: '',
      cantidad: '',
    },
  });

  const { nombre, cantidad } = form.values;

  const crear = () => {
    setMensajeError(null);
    let cuentaExiste = false;

    if (nombre === '' || cantidad === '') {
      setMensajeError('Rellenar todos los campos');
      return;
    }

    const nuevosDatos = {
      nombre: nombre.toUpperCase(),
      stock: cantidad,
    };

    crearProducto(nuevosDatos);
  };

  return (
    <div>
      <form className={styles.formulario} onSubmit={form.onSubmit(crear)}>
        <h1>Crear Producto</h1>

        <div className={styles.campos}>
          <TextInput
            className={styles.formulario__input}
            placeholder='Nombre completo...'
            label='Nombre del producto'
            {...form.getInputProps('nombre')}
          />

          <NumberInput
            className={styles.formulario__input}
            placeholder='Cantidad del producto'
            label='Cantidad'
            {...form.getInputProps('cantidad')}
          />
        </div>

        {mensajeError === null ? null : (
          <Notification
            className={styles.notificacion}
            icon={<IconX size={18} />}
            color='red'
            disallowClose
          >
            {mensajeError}
          </Notification>
        )}

        <UnstyledButton
          className={styles.formulario__boton}
          type='submit'
          mt='sm'
        >
          Crear
        </UnstyledButton>
      </form>
    </div>
  );
};

export default ModalCrearProducto;
