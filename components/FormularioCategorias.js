import { Button, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from '../styles/FormularioCategorias.module.css';

const FormularioCategorias = () => {
  const form = useForm({
    initialValues: { categoria: '' },

    validate: {
      categoria: (value) => (value !== '' ? 'Debe introducir un nombre' : null),
    },
  });

  return (
    <div className={styles.formulario}>
      <Title align='center'>Crear nueva categoría</Title>
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label='Nombre'
          placeholder='Nombre de la categoría'
          {...form.getInputProps('categoria')}
        />
        <div className={styles.contenidoForm}>
          <Button type='submit' mt='sm'>
            Crear categoría
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCategorias;
