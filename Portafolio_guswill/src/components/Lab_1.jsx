import { Canvas, useLoader } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { TextureLoader} from "three";

const Lab1 = () => {
  const cubeTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const sphereTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const coneTexture = useLoader(TextureLoader, "/assets/alpha.png");
  const coneTexture1 = useLoader(TextureLoader, "/assets/texture1.jpg");
  const albedoTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const alphaTexture = useLoader(TextureLoader, "/assets/alpha.png");

  const boxRef = useRef();
  const esfeRef = useRef();

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (boxRef.current && esfeRef.current) {
        boxRef.current.rotation.x += 0.01;
        boxRef.current.rotation.y += 0.01;
        esfeRef.current.rotation.x += 0.01;
        esfeRef.current.rotation.y += 0.01;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Base: plano que actúa como suelo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* Practica-5: Comparación de materiales */}
      {/* Grupo con MeshPhongMaterial */}
      <group position={[-5, 0, 0]}>
        {/* Esfera con MeshPhongMaterial */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshPhongMaterial color="orange" shininess={100} />
        </mesh>
        {/* Cubo con MeshPhongMaterial */}
        <mesh position={[3, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhongMaterial color="purple" shininess={30} />
        </mesh>
      </group>

      {/* Grupo con MeshLambertMaterial */}
      <group position={[5, 0, 0]}>
        {/* Esfera con MeshLambertMaterial */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshLambertMaterial color="green" />
        </mesh>
        {/* Cubo con MeshLambertMaterial */}
        <mesh position={[3, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshLambertMaterial color="blue" />
        </mesh>
      </group>

      {/* Grupo con MeshStandardMaterial y GUI para metalness/roughness */}
      <group position={[0, 0, 0]}>
        {/* Esfera con MeshStandardMaterial */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="red" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Cubo con MeshStandardMaterial */}
        <mesh position={[3, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="yellow" metalness={0.2} roughness={0.8} />
        </mesh>
      </group>

      {/* Grupo 2: rotation={[10, 0, 0]} */}
      <group rotation={[10, 0, 0]}>
        {/* Cilindro */}
        <mesh position={[8, 1, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
          <meshStandardMaterial map={coneTexture1} />
        </mesh>
        {/* Torus */}
        <mesh position={[-8, 1, 0]} castShadow>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial map={albedoTexture} alphaMap={alphaTexture} transparent={true} />
        </mesh>
        {/* Esfera pequeña */}
        <mesh position={[0, 1, 4]} castShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>

      {/* Grupo 3: rotation={[15, 0, 0]} */}
      <group rotation={[15, 0, 0]}>
        {/* Cubo pequeño */}
        <mesh position={[-2, 1, 4]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="purple" />
        </mesh>
        {/* Cono pequeño */}
        <mesh position={[2, 1, 4]} castShadow>
          <coneGeometry args={[0.5, 1.5, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>
        {/* Cilindro pequeño */}
        <mesh position={[0, 1, 6]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </group>
    </>
  );
};

export default Lab1;
