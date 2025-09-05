// pages/Practica4.jsx
// Práctica 4: lil-gui para controlar luces en Three.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GUI } from "lil-gui";

const Practica4 = () => {
  const mountRef = useRef();

  useEffect(() => {
    // Escena, cámara y renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222233);
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.set(0, 3, 8);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Objetos
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    scene.add(cube);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0x888888 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(2, 4, 2);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // GUI - Control de parámetros
    const gui = new GUI();
    gui.add(ambientLight, "intensity", 0, 3, 0.1).name("Ambient Intensity");
    gui.addColor({ color: ambientLight.color.getHex() }, "color")
      .name("Ambient Color")
      .onChange((value) => ambientLight.color.set(value));
    gui.add(pointLight, "intensity", 0, 5, 0.1).name("Point Intensity");

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza
    return () => {
      gui.destroy();
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <h2>Laboratorio: Práctica 4 - lil-gui y control de luces</h2>
      <p>
        Usa los controles para modificar la intensidad y el color de la luz ambiental, y la intensidad de la luz puntual.<br/>
        Observa cómo cambian la iluminación y las sombras en la escena.
      </p>
      <div ref={mountRef} />
    </div>
  );
};

export default Practica4;
