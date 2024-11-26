'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Float,
  Lightformer,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  PerspectiveCamera,
  Decal,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { TopMenu } from './top-menu';
import { RSVPForm } from './rsvp-form';
import { ColorSelector } from './color-selector';
import { useMediaQuery } from 'react-responsive';

function ResponsiveCamera({ isMobile }: { isMobile: boolean }) {
  const { camera, scene } = useThree();

  useEffect(() => {
    if (isMobile) {
      camera.position.set(4, 1.5, 8);
      scene.position.x = 0.25;
      scene.position.z = 0;
    
    
    } else {
      camera.position.set(0.6, 0.2, 0.6);
    }
    camera.updateProjectionMatrix();
  }, [camera, isMobile, scene]);

  return null;
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }: { positions?: number[] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.position.z += delta * 1.5;
      if (group.current.position.z > 20) group.current.position.z = -60;
    }
  });

  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={3}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer intensity={6} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      {/* Accent (red) */}
      <Float speed={4} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color="white" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
    </>
  );
}

function CarModel({ color = '#000000' }: { color: string }) {
  const { scene, materials } = useGLTF('https://webof3d.com/wp-content/car-model.glb') as any;
  const { gl } = useThree();
  const logoTexture = useTexture('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PGLang-uoYmHb410iObvXNOst1A8oM2M2LvCo.webp');
  const roofLogoTexture = useTexture('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-6LCo12WBkqBhclyhv39ALvgeRlMwdg.jpeg');
  const carRef = useRef<THREE.Object3D>(null);

  const [whiteLogo, whiteRoofLogo] = useMemo(() => {
    const texture1 = logoTexture.clone();
    const texture2 = roofLogoTexture.clone();
    texture1.colorSpace = THREE.SRGBColorSpace;
    texture2.colorSpace = THREE.SRGBColorSpace;
    return [texture1, texture2];
  }, [logoTexture, roofLogoTexture]);

  useEffect(() => {
    if (materials['Body']) {
      materials['Body'].color = new THREE.Color(color);
    }
  }, [color, materials]);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.material.color) {
          child.material.metalness = 0.9;
          child.material.roughness = 0.1;
          child.material.clearcoat = 1.0;
          child.material.clearcoatRoughness = 0.1;
          child.receiveShadow = true;
          child.castShadow = true;
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return (
    <primitive ref={carRef} object={scene} scale={0.11} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]} />
  );
}

export default function CarScene() {
  const [selectedColor, setSelectedColor] = useState<string>('#1a365d'); // Default to navy
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const spotifyButton = document.querySelector('.bi-spotify');
    const musicCard = document.querySelector('.music-card');
    if (spotifyButton && musicCard) {
      spotifyButton.addEventListener('click', () => {
        (musicCard as HTMLElement).style.display = 'block';
      });
    }
  }, []);

  return (
    <div className="w-full h-screen bg-white relative flex flex-col">
      <TopMenu />
      <i className="bi bi-spotify"></i>
      <div className="flex-1 relative">
        <Canvas shadows>
          <ambientLight intensity={1.8} />
          <Suspense fallback={null}>
            <CarModel color={selectedColor} />
            <ambientLight intensity={0.5} />
            <spotLight position={[2, 2, 2]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <PerspectiveCamera makeDefault position={[0.6, 0.2, 0.6]} fov={45} />
          </Suspense>

          <Environment frames={Infinity} resolution={256}>
            <Lightformers />
          </Environment>

          <ResponsiveCamera isMobile={isMobile} />

          <group position={[0, 0, 0]}>
            <AccumulativeShadows temporal frames={100} color={selectedColor} colorBlend={2} toneMapped opacity={0.7} scale={1.5}>
              <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[3, 5, -7]} bias={0.001} />
            </AccumulativeShadows>
          </group>

          <OrbitControls
            enablePan={false}
            minDistance={0.3}
            maxDistance={1}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 2.1}
            minAzimuthAngle={-Math.PI / 8}
            maxAzimuthAngle={Math.PI / 6}
            target={[0, 0, 0]}
          />
        </Canvas>
        <div className="music-card absolute top-4 right-4 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg flex flex-col gap-4 max-w-md">
          <i
            className="close-btn bi bi-x"
            onClick={() => {
              const musicCard = document.querySelector('.music-card') as HTMLElement;
              if (musicCard) musicCard.style.display = 'none';
            }}
          ></i>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/album/0hvT3yIEysuuvkK73vgdcW?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <RSVPForm />
        </div>
        <div className="color-picker-container absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full">
          <ColorSelector selectedColor={selectedColor} onColorSelect={setSelectedColor} />
        </div>
      </div>
    </div>
  );
}
