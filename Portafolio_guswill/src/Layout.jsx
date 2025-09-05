import { AnimatePresence, motion } from "framer-motion";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <div className="d-flex flex-column vh-100">
      {/* Cabecera fija */}
      <Navbar expand="lg" bg="dark" variant="dark"> {/* 🔥 Navbar también en oscuro */}
        <Container fluid>
          <Navbar.Brand href="#">Portafolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              {/* Menú desplegable de Ejercicios */}
              <Dropdown as={Nav.Item} className="me-2">
                <Dropdown.Toggle as={Nav.Link} id="dropdown-ejercicios">
                  Ejercicios
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/ejercicio1">Ejercicio 1: Geometrías</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio2">Ejercicio 2: Texturas</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio3">Ejercicio 3: Plano y Figuras</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio4">Ejercicio 4: Agrupación de Objetos - React</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio5">Ejercicio 5: Agrupación de Objetos - Three.js</Dropdown.Item>
                  <Dropdown.Item href="/luces">Luces</Dropdown.Item>
                  <Dropdown.Item href="/sombras">Sombras</Dropdown.Item>
                  <Dropdown.Item href="/efectos">Efectos</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* Menú desplegable de Prácticas */}
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-practicas">
                  Prácticas
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/laboratorio1">Laboratorio: Práctica 1</Dropdown.Item>
                  <Dropdown.Item href="/practica2">Laboratorio: Práctica 2 (Three.js Group)</Dropdown.Item>
                  <Dropdown.Item href="/practica3">Laboratorio: Práctica 3 (Luces R3F)</Dropdown.Item>
                  <Dropdown.Item href="/practica4">Laboratorio: Práctica 4 (lil-gui Luces)</Dropdown.Item>
                  <Dropdown.Item href="/practica5">Laboratorio: Práctica 5 (Materiales y Sombras)</Dropdown.Item>
                  <Dropdown.Item href="/practica6">Laboratorio: Práctica 6 (Casa 3D)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor de las páginas con transiciones suaves */}
      <Container
        fluid
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}

export default Layout;
