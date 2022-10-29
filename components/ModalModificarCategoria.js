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
import styles from '../styles/ModalModificarUsuario.module.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ModalModificarCategoria = ({ categoria }) => {
  const { modificarCategoria } = useAuth();

  const [mensajeError, setMensajeError] = useState(null);

  const form = useForm({
    initialValues: {
      nombre: categoria['nombre'],
    },
  });

  const modificarUsuario = () => {
    setMensajeError(null);
    const nombre = form.values['nombre'].toUpperCase();

    if (nombre === '') {
      setMensajeError('Rellenar todos los campos');
      return;
    }

    const nuevosDatos = {
      nombre: nombre,
    };

    modificarCategoria(categoria['id'], nuevosDatos);
  };

  return (
    <div>
      <form
        className={styles.formulario}
        onSubmit={form.onSubmit(modificarUsuario)}
      >
        <h1>Modificar Categoria</h1>

        <TextInput
          className={styles.formulario__input}
          label='Nombre categoría'
          placeholder='Nombre de la categoria...'
          {...form.getInputProps('nombre')}
        />

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
          Modificar
        </UnstyledButton>
      </form>
    </div>
  );
};

export default ModalModificarCategoria;
