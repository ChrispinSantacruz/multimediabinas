// pages/Practica2.jsx
// Ejemplo de agrupación y transformaciones con Three.js puro
// Demuestra la diferencia entre transformar un grupo y transformar objetos individuales

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Practica2 = () => {
  const mountRef = useRef();

  useEffect(() => {
    // Escena, cámara y renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Cubos
    const geometry = new THREE.BoxGeometry();
    const material1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const material3 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const cube1 = new THREE.Mesh(geometry, material1);
    const cube2 = new THREE.Mesh(geometry, material2);
    const cube3 = new THREE.Mesh(geometry, material3);
    cube1.position.x = -2;
    cube2.position.x = 0;
    cube3.position.x = 2;

    // Agrupación
    const group = new THREE.Group();
    group.add(cube1);
    group.add(cube2);
    group.add(cube3);

    // Transformaciones al grupo
    group.rotation.y = Math.PI / 4;
    group.scale.set(1.5, 1.5, 1.5);
    group.position.set(0, 2, 0);

    scene.add(group);

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <h2>Laboratorio: Práctica 2 - Agrupación y Transformaciones</h2>
      <p>
        Este ejemplo muestra cómo las transformaciones aplicadas a un grupo afectan a todos sus objetos hijos (los tres cubos).<br/>
        Puedes modificar el código para comparar con la versión donde los cubos se agregan directamente a la escena.
      </p>
      <div ref={mountRef} />
    </div>
  );
};

export default Practica2;
