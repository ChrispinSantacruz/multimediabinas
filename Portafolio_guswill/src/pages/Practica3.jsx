// pages/Practica3.jsx
// Práctica 3: Luces en React Three Fiber
import React from "react";
import { Canvas } from "@react-three/fiber";

const Practica3 = () => (
  <div>
    <h2>Laboratorio: Práctica 3 - Luces en React Three Fiber</h2>
    <p>
      Esta escena replica diferentes tipos de luces usando la sintaxis de React Three Fiber.<br/>
      Modifica los valores de color, intensidad y posición para experimentar los efectos visuales.
    </p>
    <Canvas shadows camera={{ position: [0, 5, 12], fov: 50 }} style={{ width: 600, height: 400 }}>
      {/* Ambient Light */}
      <ambientLight color={0xff0000} intensity={1.5} />
      {/* Directional Light */}
      <directionalLight color={0xffffff} intensity={0.7} position={[-5, 8, 10]} castShadow />
      {/* Hemisphere Light */}
      <hemisphereLight skyColor={0xffeeb1} groundColor={0x080820} intensity={0.6} />
      {/* Point Light */}
      <pointLight color={0xffffff} intensity={3} position={[0, 2, 5]} castShadow />
      {/* Spot Light */}
      <spotLight color={0xffffff} intensity={1} position={[0, 5, 5]} angle={Math.PI/6} penumbra={0.2} castShadow />
      {/* RectAreaLight (requiere meshStandardMaterial para verse) */}
      <rectAreaLight color={0xffffff} intensity={2} position={[0, 5, 0]} width={4} height={2} />
      {/* Objetos de prueba */}
      <mesh position={[-2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[2, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </Canvas>
    <div style={{marginTop: 16}}>
      <b>Comparativa:</b> En R3F, las luces se declaran como componentes JSX y sus propiedades se pasan como props, lo que facilita la integración con React y la reactividad.
    </div>
  </div>
);

export default Practica3;
