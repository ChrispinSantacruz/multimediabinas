import { Canvas, useLoader } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { TextureLoader } from "three";
import { Environment } from "@react-three/drei";

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

      <Environment preset="warehouse" />
      {/* <Environment preset="sunset" /> */}
      {/* <Environment preset="night" /> */}

      {/* Grupo 1: Solo cubos, alineados y separados */}
      <group rotation={[8, 0, 0]} position={[-8, 0, 0]}>
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh position={[3, 1, 0]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position={[6, 1, 0]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </group>

      {/* Grupo 2: Solo conos (triángulos), alineados y separados */}
      <group rotation={[10, 0, 0]} position={[0, 0, 0]}>
        <mesh position={[0, 1, 0]} castShadow>
          <coneGeometry args={[1, 2, 3]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <mesh position={[3, 1, 0]} castShadow>
          <coneGeometry args={[1, 2, 3]} />
          <meshStandardMaterial color="purple" />
        </mesh>
        <mesh position={[6, 1, 0]} castShadow>
          <coneGeometry args={[1, 2, 3]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      </group>

      {/* Grupo 3: Solo rectángulos (cajas alargadas), alineados y separados */}
      <group rotation={[15, 0, 0]} position={[8, 0, 0]}>
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[3, 1, 1]} />
          <meshStandardMaterial color="green" />
        </mesh>
        <mesh position={[4, 1, 0]} castShadow>
          <boxGeometry args={[3, 1, 1]} />
          <meshStandardMaterial color="lime" />
        </mesh>
        <mesh position={[8, 1, 0]} castShadow>
          <boxGeometry args={[3, 1, 1]} />
          <meshStandardMaterial color="brown" />
        </mesh>
      </group>
    </>
  );
};

export default Lab1;
