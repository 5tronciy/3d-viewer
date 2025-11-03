"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

function FitCameraToModel({
  url,
  controlsRef,
}: {
  url: string;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { scene } = useGLTF(url);
  const { camera } = useThree();

  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const fov = perspectiveCamera.fov * (Math.PI / 180);
    let cameraZ =
      Math.abs(Math.max(size.x, size.y, size.z) / 2 / Math.tan(fov / 2));
    cameraZ *= 1.5;

    perspectiveCamera.position.set(center.x, center.y, center.z + cameraZ);
    perspectiveCamera.lookAt(center);
    perspectiveCamera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  }, [scene, camera, controlsRef]);

  return <primitive object={scene} dispose={null} />;
}

export default function Viewer({ modelUrl }: { modelUrl: string }) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-2xl">
      <Canvas camera={{ fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <Suspense fallback={null}>
          <FitCameraToModel url={modelUrl} controlsRef={controlsRef} />
          <Preload all />
        </Suspense>
        <OrbitControls ref={controlsRef} />
      </Canvas>
    </div>
  );
}
