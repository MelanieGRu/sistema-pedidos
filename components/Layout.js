import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  UnstyledButton,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Divider,
} from "@mantine/core";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const { user, signup, logout } = useAuth();
  // Router para determinar en qué página nos encontramos
  const router = useRouter();

  // Variables para la responsividad del AppShell
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          {/* Botones del menu en AppShell que
           nos redirigen a otras pantallas */}
          <Link href="/">
            <div
              className={
                router.pathname === "/"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Inicio
            </div>
          </Link>

          <Link href="/inventario">
            <div
              className={
                router.pathname === "/inventario"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Inventario
            </div>
          </Link>

          <Link href="/categorias">
            <div
              className={
                router.pathname === "/categorias"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Categorias
            </div>
          </Link>

          <Link href="/pedidos">
            <div
              className={
                router.pathname === "/pedidos"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Pedidos
            </div>
          </Link>

          <Link href="/usuarios">
            <div
              className={
                router.pathname === "/usuarios"
                  ? styles.appshell__boton__seleccionado
                  : styles.appshell__boton
              }
            >
              Usuarios
            </div>
          </Link>

          {/* Boton para cerrar sesion */}
          <Divider />
          <UnstyledButton
            onClick={logout}
            className={styles.boton__cerrar__sesion}
          >
            Cerrar Sesión
          </UnstyledButton>
        </Navbar>
      }
      header={
        <Header height={50}>
          <div className={styles.layout__header}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            {/* Contenido del header de
            AppShell */}
            <Text className={styles.layout__header__texto}>
              <Link href="/">Control de Inventario</Link>
            </Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
