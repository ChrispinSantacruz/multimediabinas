import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const SombrasEscena = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        /**
         * Base
         */
        const scene = new THREE.Scene();

        // Tamaño
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(1, 1, 2);
        scene.add(camera);

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        /**
         * Lights
         */

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    ambientLight.visible = true; // Controlable desde GUI
    scene.add(ambientLight);

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.castShadow = true; // Proyecta sombras
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 6;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.right = 2;
    directionalLight.shadow.camera.bottom = -2;
    directionalLight.shadow.camera.left = -2;
    directionalLight.shadow.radius = 10;
    directionalLight.position.set(0.8, 2.5, -1);
    directionalLight.visible = true; // Controlable desde GUI
    scene.add(directionalLight);

    // Luz spot
    const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 6;
    spotLight.position.set(0, 2, 2);
    spotLight.visible = false; // Por defecto apagada
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Luz puntual
    const pointLight = new THREE.PointLight(0xffffff, 2.7);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 5;
    pointLight.position.set(-1, 1, 0);
    pointLight.visible = false; // Por defecto apagada
    scene.add(pointLight);

        /**
         * Material compartido (para que GUI lo controle)
         */
        const material = new THREE.MeshStandardMaterial({
            color: 0x8888ff,
            metalness: 0.3,
            roughness: 0.6
        });

        /**
         * Objects
         */
    // Ejemplo de uso de castShadow y receiveShadow:
    // castShadow: el objeto proyecta sombra
    // receiveShadow: el objeto recibe sombra
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), material);
    sphere.position.x = -1.5;
    sphere.castShadow = true;      // La esfera proyecta sombra
    sphere.receiveShadow = false;  // La esfera no recibe sombra

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.y = -0.65;
    plane.castShadow = false;      // El plano no proyecta sombra
    plane.receiveShadow = true;    // El plano recibe sombra

    scene.add(sphere, plane);

        /**
         * Controls
         */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        /**
         * GUI (Lil-GUI)
         */
        const gui = new GUI();


    // Carpeta de luces en lil-gui
    const lightFolder = gui.addFolder("Luces");
    // Control de visibilidad para experimentar con una sola luz
    lightFolder.add(ambientLight, "visible").name("Ambient ON/OFF");
    lightFolder.add(directionalLight, "visible").name("Directional ON/OFF");
    lightFolder.add(spotLight, "visible").name("Spot ON/OFF");
    lightFolder.add(pointLight, "visible").name("Point ON/OFF");
    // Intensidad y posición
    lightFolder.add(ambientLight, "intensity").min(0).max(3).step(0.001).name("Ambient Intensity");
    lightFolder.add(directionalLight, "intensity").min(0).max(3).step(0.001).name("Directional Intensity");
    lightFolder.add(directionalLight.position, "x").min(-5).max(5).step(0.001).name("DirLight X");
    lightFolder.add(directionalLight.position, "y").min(-5).max(5).step(0.001).name("DirLight Y");
    lightFolder.add(directionalLight.position, "z").min(-5).max(5).step(0.001).name("DirLight Z");

        const matFolder = gui.addFolder("Materiales");
        matFolder.add(material, "metalness").min(0).max(1).step(0.01).name("Metalness");
        matFolder.add(material, "roughness").min(0).max(1).step(0.01).name("Roughness");

        /**
         * Resize Handling
         */
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener("resize", handleResize);

        /**
         * Animate
         */
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = 0.1 * elapsedTime;
            sphere.rotation.x = 0.15 * elapsedTime;

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();

        /**
         * Cleanup on Unmount
         */
        return () => {
            gui.destroy();
            window.removeEventListener("resize", handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: "70vw", height: "70vh" }} />;
};

export default SombrasEscena;
