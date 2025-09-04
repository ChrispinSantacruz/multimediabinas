**Propuesta propia: Cruces en vez de tumbas**
Para cumplir la propuesta, se modificó el código en `CasaFantasma.jsx`:
- Se reemplazó la generación de tumbas por cruces, usando dos cajas alargadas agrupadas en un `THREE.Group` para formar la cruz.
- Se aplicó un material personalizado (`MeshStandardMaterial`) con textura y color propio.
- Las cruces se distribuyen alrededor de la casa, con posiciones y rotaciones aleatorias para mayor realismo.

**Fragmento de código:**
```js
const crossMaterial = new THREE.MeshStandardMaterial({
	color: '#bfa77a',
	metalness: 0.2,
	roughness: 0.7,
	map: graveColorTexture,
	normalMap: graveNormalTexture,
	aoMap: graveARMTexture,
});
const crosses = new THREE.Group();
scene.add(crosses);
for (let i = 0; i < 30; i++) {
	const angle = Math.random() * Math.PI * 2;
	const radius = 3 + Math.random() * 4;
	const x = Math.sin(angle) * radius;
	const z = Math.cos(angle) * radius;
	// Grupo cruz
	const crossGroup = new THREE.Group();
	// Caja vertical
	const vertical = new THREE.Mesh(
		new THREE.BoxGeometry(0.15, 0.8, 0.15),
		crossMaterial
	);
	vertical.position.y = 0.4;
	// Caja horizontal
	const horizontal = new THREE.Mesh(
		new THREE.BoxGeometry(0.5, 0.12, 0.15),
		crossMaterial
	);
	horizontal.position.y = 0.6;
	crossGroup.add(vertical);
	crossGroup.add(horizontal);
	crossGroup.position.set(x, Math.random() * 0.4, z);
	crossGroup.rotation.x = (Math.random() - 0.5) * 0.4;
	crossGroup.rotation.y = (Math.random() - 0.5) * 0.4;
	crossGroup.rotation.z = (Math.random() - 0.5) * 0.4;
	crosses.add(crossGroup);
}
```

**Efecto visual:**
Las cruces aparecen distribuidas en el entorno, con textura y color propio, y agrupadas para facilitar su manipulación. El resultado es una escena más personalizada y realista, cumpliendo el objetivo de la práctica.
# Tarea de Laboratorio - Multimedia 3

## Integrantes

(Nombres de los estudiantes aquí)

## 1. Exploración de componentes en Ejercicio4

### Análisis de componentes marcados en rojo

En el archivo `pages/Ejercicio4.jsx`, los componentes marcados en rojo en la imagen son:

**<axesHelper args={[2]} />**
Este componente agrega un sistema de ejes visuales a la escena, útil para identificar la orientación de los ejes X, Y y Z. El argumento `[2]` indica el tamaño de los ejes.

**<Environment preset="studio" />**
Este componente de la librería `drei` añade una iluminación ambiental HDRI a la escena, simulando condiciones de luz realistas. La propiedad `preset` permite elegir entre diferentes ambientes predefinidos, en este caso "studio".

**<Objgrupo />**
Componente personalizado que agrupa varios objetos 3D y permite manipularlos juntos. Suele contener geometrías y materiales que se transforman como una sola entidad.

**<OrbitControls enableRotate={true} />**
Permite controlar la cámara con el mouse, habilitando la rotación de la vista para explorar la escena en 3D.

**<Canvas>**
Contenedor principal de la escena 3D en React Three Fiber. Aquí se definen la cámara, el tamaño y los componentes hijos que forman la escena.

### Propiedad preset de <Environment>

La propiedad `preset` del componente `<Environment />` permite seleccionar diferentes ambientes HDRI predefinidos para iluminar la escena. Los valores disponibles incluyen:

- `sunset`: Iluminación cálida de atardecer.
- `dawn`: Luz suave de amanecer.
- `night`: Ambiente nocturno con luz tenue.
- `warehouse`: Luz industrial, fría y difusa.
- `forest`: Luz filtrada por árboles, verde y natural.
- `apartment`: Luz interior cálida y suave.
- `studio`: Luz neutra y profesional, ideal para mostrar modelos.
- `city`: Luz urbana, mezcla de artificial y natural.
- `park`: Luz exterior, natural y brillante.

Cada preset cambia el color, intensidad y dirección de la luz ambiental, afectando el realismo y la atmósfera de la escena.

### Evidencia de presets aplicados

Para evidenciar el uso de diferentes presets, se realizaron pruebas con los siguientes valores en el componente `<Environment />`:

```jsx
<Environment preset="studio" />
<Environment preset="sunset" />
<Environment preset="night" />
```

**Resultados observados:**
- Con `studio`, la escena se ve neutra y bien iluminada, ideal para resaltar detalles de los modelos.
- Con `sunset`, la iluminación es cálida y genera sombras largas, simulando el atardecer.
- Con `night`, la luz es tenue y azulada, creando un ambiente nocturno.

Se adjuntan capturas de pantalla en la sección de evidencias para mostrar los cambios visuales en la escena con cada preset.

## 2. Análisis del componente <Objgrupo />

### Explicación teórica

La agrupación de objetos en React con @react-three/fiber y drei se realiza usando el componente `<group>`, que permite manipular varias geometrías como una sola entidad.

### Props soportadas por <group>

Algunas props soportadas por `<group>` incluyen: `position`, `rotation`, `scale`, `visible`, `name`, `userData`, `onClick`, etc.

### Práctica en el laboratorio

(Describe los tres cambios significativos aplicando diferentes propiedades en `<group>` en Practica-1, incluyendo rotaciones y observaciones)

## 3. Análisis de jerarquía de escena

- Elementos que dependen directamente de la escena: AmbientLight, DirectionalLight, Mesh (suelo), Group.
- Elementos que dependen del grupo: Mesh (cubo), Mesh (esfera).

Si se mueve el `<group>` en el eje Y, todos los objetos hijos (cubo y esfera) se moverán juntos en ese eje.

El orden en que aparecen las luces y el piso en el JSX no afecta la jerarquía, pero sí puede afectar el renderizado si hay dependencias entre ellos.

## 4. Agrupación con Three.js (sin React Fiber)

`THREE.Group()` permite agrupar objetos para aplicarles transformaciones conjuntas. Los objetos agregados a la escena se transforman individualmente, mientras que los agregados al grupo se transforman junto con el grupo.

Transformaciones aplicadas al grupo afectan a todos los cubos simultáneamente. Si se eliminan del grupo y se agregan directamente a la escena, cada cubo debe transformarse por separado.

## 5. Análisis de Luces en Three.js y React Three Fiber

| Luz             | Color   | Intensidad | Propiedades adicionales | Efecto visual |
|-----------------|---------|------------|------------------------|---------------|
| AmbientLight    | ...     | ...        | ...                    | ...           |
| DirectionalLight| ...     | ...        | ...                    | ...           |
| HemisphereLight | ...     | ...        | ...                    | ...           |
| PointLight      | ...     | ...        | ...                    | ...           |
| SpotLight       | ...     | ...        | ...                    | ...           |
| RectAreaLight   | ...     | ...        | ...                    | ...           |


| Luz             | Color      | Intensidad | Propiedades adicionales                | Efecto visual en la escena |
|-----------------|------------|------------|----------------------------------------|---------------------------|
| AmbientLight    | Blanco     | 0.5-3      | -                                     | Ilumina todo de forma uniforme, sin sombras marcadas |
| DirectionalLight| Amarillo   | 0.7-1.2    | position, castShadow                  | Luz direccional, genera sombras definidas |
| HemisphereLight | Azul/rojo  | 0.6        | skyColor, groundColor                 | Simula luz ambiental desde arriba y abajo |
| PointLight      | Naranja    | 1-5        | position, distance, decay, castShadow  | Luz puntual, genera sombras suaves y realistas |
| SpotLight       | Verde      | 2          | position, angle, penumbra, distance    | Luz focal, genera sombras duras y dirigidas |
| RectAreaLight   | Violeta    | 5          | width, height, position                | Luz rectangular, ilumina áreas específicas |

**Experimentación en Three.js:**
- Se modificaron la intensidad, color y posición de AmbientLight, PointLight y DirectionalLight usando lil-gui.
- Al aumentar la intensidad de AmbientLight, la escena se vuelve más clara y menos contrastada.
- Cambiar el color de AmbientLight a rojo, verde, azul y blanco afecta el tono general de la escena.
- Ajustar la intensidad de PointLight entre 0 y 5 cambia la fuerza de las sombras y el brillo en los objetos cercanos.
- Mover DirectionalLight cambia la dirección y longitud de las sombras proyectadas.
- Se tomaron capturas para evidenciar estos cambios.

**Migración a React Three Fiber (Practica-3):**
Cada tipo de luz tiene su equivalente en R3F:
```jsx
<ambientLight intensity={1} color="white" />
<directionalLight position={[5, 20, 5]} intensity={1.2} color="#ffcc00" />
<hemisphereLight skyColor="#0000ff" groundColor="#ff0000" intensity={0.6} />
<pointLight position={[0,1,1]} intensity={1} color="#ff9000" distance={10} decay={2} />
<spotLight position={[0,2,3]} intensity={2} color="#78ff00" angle={Math.PI*0.1} penumbra={0.25} distance={10} />
<rectAreaLight position={[-1.5,0,1.5]} intensity={5} color="#4e00ff" width={3} height={3} />
```
La sintaxis cambia de instanciación manual en Three.js a componentes JSX en R3F, lo que facilita la composición y reactividad. Ventajas: integración con React, uso de hooks, mayor legibilidad y modularidad.

**Uso de lil-gui en Three.js (Practica-4):**
El panel lil-gui permite controlar parámetros de las luces en tiempo real:
```js
const gui = new GUI();
gui.add(ambientLight, "intensity", 0, 3, 0.1).name("Ambient Intensity");
gui.addColor({ color: ambientLight.color.getHex() }, "color")
	.name("Ambient Color")
	.onChange((value) => ambientLight.color.set(value));
gui.add(pointLight, "intensity", 0, 5, 0.1).name("Point Intensity");
```
**Explicación de cada línea:**
- `gui.add(ambientLight, "intensity", 0, 3, 0.1)`: Permite modificar la intensidad de la luz ambiental entre 0 y 3.
- `gui.addColor(...)`: Permite cambiar el color de la luz ambiental en tiempo real.
- `.onChange(...)`: Actualiza el color de la luz ambiental cuando se selecciona un nuevo color.
- `gui.add(pointLight, "intensity", 0, 5, 0.1)`: Permite modificar la intensidad de la luz puntual entre 0 y 5.

**Vinculación GUI-luz:**
La GUI se vincula directamente a las propiedades de los objetos de luz, permitiendo que los cambios en la interfaz se reflejen inmediatamente en la escena.

**Evidencias:**
- Se realizaron pruebas cambiando la intensidad y color de AmbientLight y PointLight, observando cómo varía el ambiente, el color general y las sombras en la escena. Las capturas muestran los resultados para cada ajuste.

En React Three Fiber, la sintaxis cambia a componentes JSX y permite una integración más sencilla con React. Ventajas: reactividad, composición, integración con hooks.

## Uso de lil-gui en Three.js

Cada línea del ejemplo vincula la GUI con una propiedad de la luz, permitiendo modificarla en tiempo real desde la interfaz.

La GUI se vincula mediante referencias directas a los objetos de luz y sus propiedades.

(Evidencias de cambios realizados)

## Análisis de Sombras y Luces


**Propiedades castShadow y receiveShadow:**
- `castShadow`: Permite que el objeto proyecte sombras sobre otros objetos en la escena. Por ejemplo, una esfera con `castShadow=true` generará una sombra sobre el plano.
- `receiveShadow`: Permite que el objeto reciba sombras proyectadas por otros. Por ejemplo, un plano con `receiveShadow=true` mostrará la sombra de la esfera.

**Exploración con GUI:**
Usando lil-gui, se ajustó la intensidad de la AmbientLight y DirectionalLight, y se modificaron las posiciones de la DirectionalLight en los ejes X, Y y Z. Al aumentar la intensidad de la luz ambiental, las sombras se suavizan y la escena se aclara. Al modificar la posición de la luz direccional, la dirección y longitud de las sombras cambian, permitiendo observar cómo se proyectan en diferentes ángulos.

**Ejercicio práctico:**
Se apagaron todas las luces menos una para observar el efecto de cada tipo:
- Solo AmbientLight: la escena se ve iluminada de forma uniforme, sin sombras marcadas.
- Solo DirectionalLight: aparecen sombras definidas y direccionales, resaltando el volumen de los objetos.
- Solo PointLight: sombras suaves y realistas, con brillo localizado.
- Solo SpotLight: sombras duras y dirigidas, con un área de iluminación limitada.

**Combinación más realista:**
La combinación de AmbientLight (baja intensidad) y DirectionalLight (media/alta intensidad) da mayor realismo, ya que simula la luz ambiental y la luz solar, generando sombras naturales y buen contraste. Se recomienda ajustar la posición de la DirectionalLight para lograr el efecto deseado en la escena.

**Evidencias:**
Se adjuntan capturas mostrando las variaciones de sombras y luz al modificar los parámetros en la GUI y al activar/desactivar cada tipo de luz.

## Experimentación con Materiales y Sombras


**Comparación de materiales:**
Se crearon tres grupos de objetos (esfera y cubo) usando los materiales MeshPhongMaterial, MeshLambertMaterial y MeshStandardMaterial.

- **MeshPhongMaterial:** Refleja la luz de manera especular, mostrando brillos intensos y sombras nítidas. Ideal para superficies brillantes como metales o plásticos pulidos. Las sombras proyectadas son más marcadas y el objeto muestra reflejos según la posición de la luz.
- **MeshLambertMaterial:** Refleja la luz de manera difusa, sin brillos especulares. Es adecuado para materiales mate como piedra o madera. Las sombras son suaves y el objeto no muestra reflejos intensos.
- **MeshStandardMaterial:** Permite controlar propiedades físicas como `metalness` y `roughness`. Con la GUI se puede modificar estos valores en tiempo real:
	- Al aumentar `metalness`, el objeto se vuelve más reflectante y metálico.
	- Al aumentar `roughness`, la superficie se vuelve más rugosa y dispersa la luz, perdiendo brillo.

**Observaciones bajo diferentes luces:**
- Los objetos con MeshPhongMaterial muestran brillos intensos cuando la luz incide directamente.
- Los objetos con MeshLambertMaterial mantienen un aspecto mate y uniforme bajo cualquier luz.
- Los objetos con MeshStandardMaterial cambian su apariencia según los valores de metalness y roughness, permitiendo simular desde metales pulidos hasta superficies rugosas.

**Comparación entre objetos:**
Al agregar un cubo con el mismo material que la esfera, se observa que ambos responden igual a la luz y las sombras, pero la forma y orientación pueden afectar la intensidad de los reflejos y sombras.

**Evidencias:**
Se adjuntan capturas mostrando los efectos de cada material bajo diferentes luces y los cambios realizados con la GUI en metalness y roughness.

## Práctica: Exploración de la Escena Casa 3D


**Análisis de la estructura de CasaEscena.jsx:**
- Objetos principales: casa (walls, roof, door), arbustos (bushes), tumbas (graves), fantasmas (ghosts), cielo (sky), suelo (floor).
- Los nombres de los objetos en el código son: `walls`, `roof`, `door`, `bush1-4`, `graves`, `ghost1-3`, `sky`, `floor`.

**Papel de los grupos (THREE.Group):**
- Se usan para organizar elementos relacionados, como la casa (agrupa paredes, techo, puerta y arbustos) y las tumbas (grupo de tumbas distribuidas alrededor de la casa). Esto facilita aplicar transformaciones y manejar la jerarquía de la escena.

**Experimentos con GUI:**
- Se modificaron los valores de `floorDisplacementScale` y `floorDisplacementBias` usando lil-gui. Al aumentar mucho la escala de desplazamiento, la textura del piso se vuelve más rugosa y detallada, simulando relieve y profundidad. Si se exagera, puede verse poco natural.

**Luces y sombras:**
- Se usan tres tipos de luces: AmbientLight (iluminación general), DirectionalLight (simula luz solar, genera sombras definidas) y PointLight (luz puntual en la puerta y fantasmas).
- AmbientLight da luz uniforme, DirectionalLight genera sombras y resalta el volumen, PointLight crea efectos localizados y dinámicos.
- Al activar/desactivar `castShadow` y `receiveShadow` en walls y roof, se observa cómo cambian las sombras proyectadas y recibidas, afectando el realismo de la escena.

**Movimiento de fantasmas:**
- Las posiciones de los fantasmas cambian a lo largo del tiempo usando fórmulas con `Math.sin` y `Math.cos`, creando trayectorias circulares y variaciones en altura. Esto simula movimiento flotante y dinámico.
- Para variar el movimiento, se puede aumentar la velocidad multiplicando el tiempo por un factor mayor, o cambiar el radio de la trayectoria.

**Ambiente:**
- Se modificaron parámetros de `sky.material.uniforms` como `rayleigh` y `turbidity` para cambiar el color y la dispersión de la luz en el cielo. Al activar/desactivar la niebla (`FogExp2`), la atmósfera se vuelve más densa y misteriosa, afectando la visibilidad y el tono general.
- El cielo y la niebla influyen en la atmósfera, haciendo la escena más realista, dramática o fantástica según los valores elegidos.

**Propuesta propia:**
- Se reemplazaron las tumbas por cruces: se crearon dos cajas alargadas, agrupadas para formar una cruz, y se poblaron alrededor de la casa siguiendo el mismo procedimiento aplicado con las tumbas. Se aplicó material y textura propia para diferenciar las cruces.

**Evidencias:**
- Se adjuntan capturas mostrando los cambios en el piso, las sombras, el movimiento de los fantasmas, el ambiente y la propuesta de cruces.

---

**Evidencias:**

(Incluye capturas de pantalla y descripciones de los resultados obtenidos en cada actividad)
