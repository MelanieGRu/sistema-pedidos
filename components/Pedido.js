import { Modal, Button, Group, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { formatearFecha } from "../helpers";
import styles from "../styles/Pedido.module.css";

const Pedido = ({ datos }) => {
  const [opened, setOpened] = useState(false);
  const [openedAceptar, setOpenedAceptar] = useState(false);
  const [value, setValue] = useState("");

  const aceptar = async () => {
    const nuevoEstado = {
      estado: "aceptado",
      respuesta: value,
    };

    for (const linea of datos["lineas"]) {
      const res = await fetch(
        "http://localhost:1337/productos/" + linea["producto_id"]
      );
      const producto = await res.json();
      const stock = producto["stock"];
      const nuevoStock = {
        stock: stock - linea["cantidad"],
      };
      axios
        .put(
          `http://localhost:1337/productos/${linea["producto_id"]}`,
          nuevoStock
        )
        .then((response) => {});
    }
    setOpenedAceptar(false);
    axios
      .put(`http://localhost:1337/pedidos/${datos["id"]}`, nuevoEstado)
      .then((response) => {
        Router.push("/pedidos");
      });
  };

  const rechazar = async () => {
    const nuevoEstado = {
      respuesta: value,
      estado: "rechazado",
    };
    datos["respuesta"] = value;

    for (const linea of datos["lineas"]) {
      const res = await fetch(
        "http://localhost:1337/productos/" + linea["producto_id"]
      );
      const producto = await res.json();
      const stock = producto["stock"];
      const nuevoStock = {
        stock: stock + linea["cantidad"],
      };
      axios
        .put(
          `http://localhost:1337/productos/${linea["producto_id"]}`,
          nuevoStock
        )
        .then((response) => {});
    }

    setOpened(false);
    axios
      .put(`http://localhost:1337/pedidos/${datos["id"]}`, nuevoEstado)
      .then((response) => {
        Router.push("/pedidos");
      });
  };

  const abrirModalAceptar = () => {
    setValue("");
    setOpenedAceptar(true);
  };

  const abrirModalRechazar = () => {
    setValue("");
    setOpened(true);
  };

  const getEstado = () => {
    const estado = datos["estado"];

    if (estado === "espera") {
      return (
        <div>
          <Button
            onClick={abrirModalRechazar}
            className={styles.pedido__boton}
            color="red"
          >
            Rechazar
          </Button>
          <Button onClick={abrirModalAceptar} className={styles.pedido__boton}>
            Aceptar
          </Button>
        </div>
      );
    } else {
      return <p className={styles.estado}>{estado.toUpperCase()}</p>;
    }
  };

  return (
    <div className={`${styles.pedido} ${datos["estado"]}`}>
      <div className={styles.pedido__header}>
        <p className={styles.pedido__fecha}>{formatearFecha(datos["fecha"])}</p>

        <div className={styles.pedido__botones}>{getEstado()}</div>
      </div>
      <p className={styles.pedido__datos__titulo}>Datos de Usuario</p>
      <div className={styles.pedido__datos__usuario}>
        <p className={styles.pedido__info}>{datos["nombre"]}</p>
        <p className={styles.pedido__info}>{datos["correo"]}</p>
        <p className={styles.pedido__info}>{datos["telefono"]}</p>
        <p className={styles.pedido__info}>{datos["perfil"]}</p>
      </div>
      <p className={styles.pedido__datos__titulo}>Productos</p>
      <div className={styles.pedido__productos}>
        {datos["lineas"].map((linea) => (
          <p
            className={styles.pedido__producto}
            key={`${linea["producto_id"] + linea["cantidad"].toString()}`}
          >
            • {datos["productos"][`${linea["producto_id"]}`]} : x
            {linea["cantidad"]}
          </p>
        ))}
      </div>
      <p className={styles.pedido__comentario}>
        Comentario de Usuario: {datos["comentario"]}
      </p>
      {datos["respuesta"] === null || datos["respuesta"] === "" ? null : (
        <p className={styles.pedido__comentario}>
          Respuesta: {datos["respuesta"]}
        </p>
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="¿Agregar comentario?"
      >
        <Textarea
          className={styles.modal__textarea}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <Button onClick={rechazar} className={styles.modal__boton} color="red">
          Rechazar
        </Button>
      </Modal>

      <Modal
        opened={openedAceptar}
        onClose={() => setOpenedAceptar(false)}
        title="¿Agregar comentario?"
      >
        <Textarea
          className={styles.modal__textarea}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <Button onClick={aceptar} className={styles.modal__boton}>
          Aceptar
        </Button>
      </Modal>
    </div>
  );
};

export default Pedido;
