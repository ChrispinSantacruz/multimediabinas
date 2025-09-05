# Programación Orientada a Entornos Multimedia

## Actividad Teórico–Práctica

**Programa:** Ingeniería de Software  
**Materia:** Programación Orientada a Entornos Multimedia  
**Integrantes:** Christian Santacruz, Julian Bastidas  

---

## Objetivo
Explorar las diferentes opciones que ofrece Three.js a través de React con @react-three/fiber y drei, describiendo los cambios realizados y representando procesos en el aplicativo dispuesto para prácticas.

---

## Descripción del trabajo en binas

Trabajamos en parejas (binas) para analizar, modificar y documentar el proyecto clonado desde el repositorio base. Cada integrante participó activamente en la exploración de componentes, implementación de cambios, pruebas y documentación. Se utilizó GitHub para el control de versiones y la colaboración.

- **Christian Santacruz:** Análisis de componentes, documentación, pruebas y propuestas de mejora.
- **Julian Bastidas:** Implementación de cambios en el código, experimentación con GUI y materiales, documentación técnica.

---

## Publicación en GitHub

Repositorio utilizado para la práctica:  
[https://github.com/guswill24/Portafolio_guswill](https://github.com/guswill24/Portafolio_guswill)

---

# Actividades y Respuestas

## 1. Exploración de componentes en Ejercicio4

**Ubicación:** `src/pages/Ejercicio4.jsx`

### a) Análisis de componentes marcados en rojo

| Componente | Descripción |
|------------|-------------|
| `<Canvas />` | Lienzo principal de @react-three/fiber donde se renderiza la escena 3D. |
| `<Environment />` | Componente de drei que añade iluminación ambiental HDRI a la escena. |
| `<OrbitControls />` | Permite rotar, hacer zoom y desplazar la cámara con el mouse. |
| `<Objgrupo />` | Componente personalizado que agrupa y posiciona objetos 3D. |

### b) Otras opciones de la propiedad `preset` en `<Environment>`

La propiedad `preset` permite elegir entre diferentes entornos HDRI predefinidos. Ejemplos:

| Valor de preset | Descripción breve |
|-----------------|------------------|
| 'sunset'        | Iluminación cálida de atardecer |
| 'dawn'          | Luz suave de amanecer |
| 'night'         | Ambiente nocturno |
| 'warehouse'     | Luz industrial |
| 'forest'        | Entorno natural boscoso |
| 'apartment'     | Interior de apartamento |
| 'studio'        | Luz de estudio fotográfico |
| 'city'          | Entorno urbano |
| 'park'          | Parque al aire libre |
| 'lobby'         | Vestíbulo interior |

### c) Evidencia de presets aplicados

- Se probaron los siguientes presets en el proyecto:
  - `night`
  - `sunset`
  - `warehouse`

**[Colocar aquí capturas de pantalla de cada preset aplicado]**

---

## 2. Análisis del componente `<Objgrupo />`

### a) Explicación teórica

La agrupación de objetos en React con @react-three/fiber y drei se realiza usando el componente `<group>`, que es equivalente a `THREE.Group` en Three.js. Permite manipular varias geometrías como una sola entidad (rotar, escalar, mover, etc.).

### b) Otras props soportadas por `<group>`

| Propiedad      | Descripción |
|---------------|-------------|
| position      | Posición del grupo en el espacio (array [x, y, z]) |
| rotation      | Rotación del grupo (array [x, y, z] en radianes) |
| scale         | Escala del grupo (array [x, y, z]) |
| visible       | Si el grupo es visible o no |
| name          | Nombre identificador |
| onClick       | Evento de click |
| ...           | Cualquier prop de objeto 3D de Three.js |

### c) Práctica en Laboratorio: Practica-1

- Se crearon tres agrupaciones, cada una con 3 objetos diferentes, aplicando distintas propiedades.
- Se aplicaron rotaciones:
  - `rotation={[8, 0, 0]}`
  - `rotation={[10, 0, 0]}`
  - `rotation={[15, 0, 0]}`

**Efectos observados:**
- Los objetos dentro de cada grupo rotan conjuntamente sobre el eje X, generando inclinaciones pronunciadas.
- A mayor valor de rotación, mayor inclinación del grupo.

**[Colocar aquí capturas de cada agrupación y rotación]**

---

## 3. Análisis de jerarquía de escena

### a) Dependencias
- Dependen directamente de la escena: AmbientLight, DirectionalLight, Mesh (suelo), Group.
- Dependen del grupo: Mesh (cubo), Mesh (esfera).

### b) Movimiento del `<group>` en eje Y
- Si se mueve el `<group>` en Y, todos los objetos hijos (cubo y esfera) se trasladan juntos en ese eje.

### c) ¿El orden en el JSX afecta la jerarquía?
- No afecta la jerarquía real de la escena, pero sí el orden de renderizado. La jerarquía depende de cómo se agregan los objetos a la escena y sus relaciones padre-hijo.

---

## 4. Agrupación con Three.js (sin React Fiber)

**Ubicación:** `src/pages/Ejercicio5.jsx`

### a) Función de `THREE.Group()`
- Permite agrupar varios objetos 3D para manipularlos como una sola entidad.
- Los objetos agregados a la escena (`scene.add(...)`) son independientes; los agregados al grupo (`group.add(...)`) se mueven, rotan y escalan juntos.

### b) Transformaciones en Practica-2
- Se aplicaron rotación, escala y posición al grupo, afectando a los tres cubos simultáneamente.
- Si se elimina el grupo y se agregan los cubos directamente a la escena, cada cubo debe ser transformado individualmente.

---

## 5. Análisis de Luces en Three.js y React Three Fiber

| Tipo de luz        | Color     | Intensidad | Propiedades adicionales | Efecto visual |
|--------------------|-----------|------------|------------------------|---------------|
| AmbientLight       | #fff      | 0.5        | -                      | Ilumina todo suavemente |
| DirectionalLight   | #fff      | 1.0        | position, castShadow   | Sombras nítidas |
| HemisphereLight    | #fff/#00f | 0.6        | skyColor, groundColor  | Luz ambiental con gradiente |
| PointLight         | #fff      | 1.2        | position, distance     | Ilumina en todas direcciones |
| SpotLight          | #fff      | 1.5        | angle, penumbra        | Haz de luz enfocado |
| RectAreaLight      | #fff      | 2.0        | width, height          | Luz rectangular |

**[Colocar aquí capturas de los cambios de luces y efectos]**

### b) Experimentación
- Se modificaron intensidad, color y posición de tres tipos de luces y se documentaron los cambios visuales.

### c) Migración a React Three Fiber (Practica-3)
- Se replicó la escena usando los componentes equivalentes de R3F.
- Ventajas: sintaxis declarativa, integración con React, fácil manejo de estado y props.

---

## 6. Uso de lil-gui en Three.js (Practica-4)

- Se implementó un panel lil-gui para controlar intensidad y color de la luz ambiental y la intensidad de la luz puntual.
- Cada línea de código vincula un control de la GUI con una propiedad de la luz, permitiendo modificarla en tiempo real.

**[Colocar aquí capturas de la GUI y los cambios de luz]**

---

## 7. Análisis de Sombras y Luces

- `castShadow`: Permite que un objeto proyecte sombras.
- `receiveShadow`: Permite que un objeto reciba sombras de otros.
- Se experimentó con la GUI para ajustar intensidades y posiciones de las luces, observando los cambios en las sombras.
- Se probó la escena con solo una luz activa para comparar efectos.

**[Colocar aquí capturas de las sombras y combinaciones de luces]**

---

## 8. Materiales y Sombras (Practica-5)

- Se compararon materiales MeshStandardMaterial, MeshPhongMaterial y MeshLambertMaterial.
- Se documentó cómo reflejan la luz y proyectan sombras.
- Se usó la GUI para modificar metalness y roughness, observando los cambios visuales.
- Se agregó un cubo adicional para comparar efectos bajo diferentes luces.

**[Colocar aquí capturas de los materiales y comparaciones]**

---

## 9. Escena Casa 3D (Practica-6)

- Se identificaron los objetos principales: casa, arbustos, cruces (antes tumbas), fantasmas, cielo, suelo.
- Los grupos (`THREE.Group`) organizan elementos relacionados para manipularlos juntos.
- Se experimentó con la GUI para modificar el desplazamiento del piso y observar el efecto visual.
- Se analizaron los tipos de luces y sus diferencias.
- Se propuso y aplicó una variación en el movimiento de los fantasmas.
- Se modificaron parámetros del cielo y la niebla para observar su influencia en la atmósfera.
- Se reemplazaron las tumbas por cruces, cada una formada por dos cajas agrupadas y texturizadas.

**[Colocar aquí capturas de la escena, GUI y variaciones]**

---

## Evidencias y capturas

**[Colocar aquí todas las imágenes y capturas de pantalla solicitadas en cada sección]**

---

## URL del repositorio

[https://github.com/guswill24/Portafolio_guswill](https://github.com/guswill24/Portafolio_guswill)

---

## Observaciones finales

- El trabajo en binas permitió una mejor comprensión y colaboración.
- El uso de React y @react-three/fiber facilitó la manipulación de escenas 3D de forma declarativa.
- La integración de lil-gui y drei enriqueció la experiencia interactiva y visual.
