import React from "react";
import Objgrupo from "../components/objgrupo";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

const Ejercicio4 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h3>Agrupacion de Elementos con @react-three/fiber</h3>

      <div style={{ height: "600px" }}>
        <Canvas
          className="position-absolute w-100 h-100"
          style={{ position: "fixed", width: "100vw", height: "100vh" }}
          camera={{ position: [10, 5, 10], fov: 40 }}
        >
          <axesHelper args={[2]} />
          {/* Cambia el preset para evidenciar los resultados visuales */}
          {/* Preset 1: warehouse */}
          <Environment preset="warehouse" />
          {/* Preset 2: sunset */}
          {/* <Environment preset="sunset" /> */}
          {/* Preset 3: night */}
          {/* <Environment preset="night" /> */}
          <Objgrupo/>
          <OrbitControls enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default Ejercicio4;
