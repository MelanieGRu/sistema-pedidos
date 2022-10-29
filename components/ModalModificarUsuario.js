import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons";
import {
  NumberInput,
  TextInput,
  Button,
  Chip,
  UnstyledButton,
  Notification,
} from "@mantine/core";
import styles from "../styles/ModalModificarUsuario.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ModalModificarUsuario = ({ usuario }) => {
  const { user, modificar } = useAuth();

  const [mensajeError, setMensajeError] = useState(null);

  const form = useForm({
    initialValues: {
      nombre: usuario["nombre"],
      correo: usuario["correo"],
      perfil: usuario["perfil"],
      telefono: usuario["telefono"],
      clave: usuario["clave"],
      rol: usuario["rol"],
    },
  });

  const modificarUsuario = () => {
    setMensajeError(null);
    const nombre = form.values["nombre"];
    const correo = form.values["correo"];
    const perfil = form.values["perfil"];
    const telefono = form.values["telefono"];
    const clave = form.values["clave"];
    const rol = form.values["rol"];
    let cuentaExiste = false;

    if (
      nombre === "" ||
      correo === "" ||
      perfil === "" ||
      telefono === "" ||
      clave === "" ||
      rol === ""
    ) {
      setMensajeError("Rellenar todos los campos");
      return;
    }

    const nuevosDatos = {
      nombre: nombre,
      correo: correo,
      perfil: perfil,
      telefono: telefono,
      clave: clave,
      rol: rol,
    };

    modificar(usuario["id"], nuevosDatos);
  };

  return (
    <div>
      <form
        className={styles.formulario}
        onSubmit={form.onSubmit(modificarUsuario)}
      >
        <h1>Modificar Usuario</h1>

        <div>
          <p>Nombre Completo</p>
          <TextInput
            className={styles.formulario__input}
            placeholder="Nombre completo..."
            {...form.getInputProps("nombre")}
          />
        </div>

        <div>
          <p>Correo Electrónico</p>
          <TextInput
            className={styles.formulario__input}
            placeholder="correo@ejemplo.com"
            type="email"
            {...form.getInputProps("correo")}
          />
        </div>

        <div>
          <p>Perfil</p>
          <TextInput
            className={styles.formulario__input}
            placeholder="Perfil..."
            {...form.getInputProps("perfil")}
          />
        </div>

        <div>
          <p>Teléfono</p>
          <TextInput
            className={styles.formulario__input}
            placeholder="123-1234-1234"
            {...form.getInputProps("telefono")}
          />
        </div>

        <div>
          <p>Contraseña</p>
          <TextInput
            className={styles.formulario__input}
            placeholder="Introducir contraseña..."
            type="password"
            {...form.getInputProps("clave")}
          />
        </div>

        <Chip.Group
          className={styles.chips}
          position="center"
          {...form.getInputProps("rol")}
        >
          <Chip size="lg" value="admin">
            Administrador
          </Chip>
          <Chip size="lg" value="cliente">
            Cliente
          </Chip>
        </Chip.Group>

        {mensajeError === null ? null : (
          <Notification
            className={styles.notificacion}
            icon={<IconX size={18} />}
            color="red"
            disallowClose
          >
            {mensajeError}
          </Notification>
        )}

        <UnstyledButton
          className={styles.formulario__boton}
          type="submit"
          mt="sm"
        >
          Modificar
        </UnstyledButton>
      </form>
    </div>
  );
};

export default ModalModificarUsuario;
