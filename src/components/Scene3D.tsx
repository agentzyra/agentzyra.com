'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const count = 2000;
  const meshRef = useRef<THREE.Points>(null!);
  const geomRef = useRef<THREE.BufferGeometry>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 12 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.cos(phi) * 0.5;
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const t = Math.random();
      col[i3] = 0 + t * 0.4;
      col[i3 + 1] = 0.6 + t * 0.4;
      col[i3 + 2] = 0.8 + t * 0.2;
    }
    return [pos, col];
  }, []);

  useEffect(() => {
    if (geomRef.current) {
      geomRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geomRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [positions, colors]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geomRef} />
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.LineSegments>(null!);
  const geomRef = useRef<THREE.BufferGeometry>(null!);
  const count = 80;
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 30
      ));
    }
    return pts;
  }, []);

  const linePositions = useMemo(() => {
    const positions: number[] = [];
    const threshold = 8;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < threshold) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useEffect(() => {
    if (geomRef.current && linePositions.length > 0) {
      geomRef.current.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    }
  }, [linePositions]);

  useFrame((_, delta) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.015;
    }
  });

  if (linePositions.length === 0) return null;

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry ref={geomRef} />
      <lineBasicMaterial color="#00f0ff" opacity={0.06} transparent />
    </lineSegments>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <ConnectingLines />
      </Canvas>
    </div>
  );
}
