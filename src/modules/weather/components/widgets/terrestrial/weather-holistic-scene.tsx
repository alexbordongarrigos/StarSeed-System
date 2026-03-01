'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WeatherHolisticScene({ temp, kpIndex }: { temp: number, kpIndex: number }) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 4.5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        // Ensure the canvas fully covers the container
        const currentRef = mountRef.current;
        const rect = currentRef.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        currentRef.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // Colors
        const earthColor = temp > 25 ? 0xef4444 : temp > 15 ? 0x25f46a : 0x0ea5e9;
        const auraColor = kpIndex > 5 ? 0xff00ff : kpIndex > 3 ? 0xd946ef : 0x25f46a;

        // Core Earth (Simulated with simple phong material instead of complex distort for raw performance)
        const earthGeo = new THREE.SphereGeometry(1.5, 64, 64);
        const earthMat = new THREE.MeshStandardMaterial({
            color: earthColor,
            roughness: 0.2,
            metalness: 0.8
        });
        const earth = new THREE.Mesh(earthGeo, earthMat);
        scene.add(earth);

        // Energetic Aura
        const auraGeo = new THREE.SphereGeometry(1.6, 32, 32);
        const auraMat = new THREE.MeshBasicMaterial({
            color: auraColor,
            transparent: true,
            opacity: 0.3,
            wireframe: true,
            blending: THREE.AdditiveBlending
        });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        scene.add(aura);

        const clock = new THREE.Clock();

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsedTime = clock.getElapsedTime();

            earth.rotation.y += delta * 0.1;

            aura.rotation.y -= delta * 0.15;
            aura.rotation.z += delta * 0.05;

            const scaleBase = 1.1 + (kpIndex * 0.02);
            const pulse = Math.sin(elapsedTime * (1 + kpIndex * 0.5)) * 0.05;
            const newScale = scaleBase + pulse;
            aura.scale.set(newScale, newScale, newScale);

            // Float effect (bobbing up and down)
            const floatOffset = Math.sin(elapsedTime * 2) * 0.1;
            earth.position.y = floatOffset;
            aura.position.y = floatOffset;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        const handleResize = () => {
            if (!currentRef) return;
            const rect = currentRef.getBoundingClientRect();
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width, rect.height);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            if (currentRef) {
                currentRef.removeChild(renderer.domElement);
            }
        };
    }, [temp, kpIndex]); // Re-initialize if values change significantly (simplified for fix)

    return (
        <div ref={mountRef} className="w-full h-full relative" />
    );
}
