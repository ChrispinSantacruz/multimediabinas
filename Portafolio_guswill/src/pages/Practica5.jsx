// pages/Practica5.jsx
// Práctica 5: Materiales y Sombras en Three.js
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GUI } from "lil-gui";

const Practica5 = () => {
  const mountRef = useRef();
  const [materialType, setMaterialType] = useState("standard");

  useEffect(() => {
    if (!mountRef.current) return;
    // Escena, cámara y renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222233);
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.set(0, 2, 7);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(2, 5, 3);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Materiales
    let material;
    if (materialType === "standard") {
      material = new THREE.MeshStandardMaterial({ color: 0x44aaff, metalness: 0.5, roughness: 0.5 });
    } else if (materialType === "phong") {
      material = new THREE.MeshPhongMaterial({ color: 0x44aaff, shininess: 60 });
    } else if (materialType === "lambert") {
      material = new THREE.MeshLambertMaterial({ color: 0x44aaff });
    }

    // Esfera
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), material);
    sphere.position.x = -1.5;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    // Cubo
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    cube.position.x = 1.5;
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Plano
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: 0x888888 }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);

    // GUI
    const gui = new GUI();
    const matFolder = gui.addFolder("Material");
    if (materialType === "standard") {
      matFolder.add(material, "metalness", 0, 1, 0.01).name("Metalness");
      matFolder.add(material, "roughness", 0, 1, 0.01).name("Roughness");
    } else if (materialType === "phong") {
      matFolder.add(material, "shininess", 0, 100, 1).name("Shininess");
    }
    matFolder.open();

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      cube.rotation.y -= 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza
    return () => {
      gui.destroy();
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [materialType]);

  return (
    <div>
      <h2>Laboratorio: Práctica 5 - Materiales y Sombras</h2>
      <p>
        Cambia el material de la esfera y el cubo para comparar cómo interactúan con la luz y las sombras.<br/>
        Usa la GUI para modificar propiedades del material y observa los efectos visuales.
      </p>
      <div style={{ marginBottom: 12 }}>
        <b>Material actual: </b>
        <button onClick={() => setMaterialType("standard")}>MeshStandardMaterial</button>
        <button onClick={() => setMaterialType("phong")}>MeshPhongMaterial</button>
        <button onClick={() => setMaterialType("lambert")}>MeshLambertMaterial</button>
      </div>
      <div ref={mountRef} />
      <div style={{marginTop: 16, fontSize: "0.95em"}}>
        <b>Explicación:</b><br/>
        <ul>
          <li><b>MeshStandardMaterial</b>: Soporta metalness y roughness, ideal para materiales realistas PBR. Refleja la luz de forma física y proyecta sombras suaves.</li>
          <li><b>MeshPhongMaterial</b>: Refleja la luz con brillos especulares (shininess), pero no soporta PBR. Las sombras pueden verse más "duras".</li>
          <li><b>MeshLambertMaterial</b>: Refleja la luz de forma difusa, sin brillos especulares. Sencillo y rápido, pero menos realista.</li>
        </ul>
      </div>
    </div>
  );
};

export default Practica5;
