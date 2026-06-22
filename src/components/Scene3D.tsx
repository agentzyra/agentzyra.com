'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const count = 1500;
  const meshRef = useRef<THREE.Points>(null!);
  const geomRef = useRef<THREE.BufferGeometry>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 10 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.cos(phi) * 0.4;
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const t = Math.random();
      // Cyan to purple gradient
      col[i3] = 0 + t * 0.5;
      col[i3 + 1] = 0.5 + t * 0.3;
      col[i3 + 2] = 0.9 + t * 0.1;
    }
    return [pos, col];
  }, []);

  useEffect(() => {
    if (geomRef.current) {
      geomRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geomRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [positions, colors]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
      meshRef.current.rotation.x += delta * 0.003;
      // Subtle breathing effect
      const t = state.clock.elapsedTime * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(t) * 0.02);
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geomRef} />
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
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
  const count = 60;
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 25
      ));
    }
    return pts;
  }, []);

  const linePositions = useMemo(() => {
    const positions: number[] = [];
    const threshold = 7;
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
      linesRef.current.rotation.y += delta * 0.01;
    }
  });

  if (linePositions.length === 0) return null;

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry ref={geomRef} />
      <lineBasicMaterial color="#00f0ff" opacity={0.04} transparent />
    </lineSegments>
  );
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(t * 0.5) * 2;
      meshRef.current.position.x = Math.cos(t * 0.3) * 3;
    }
  });

  return (
    <mesh ref={meshRef} position={[5, 0, -10]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.03} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 16], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <ParticleField />
        <ConnectingLines />
        <FloatingOrb />
      </Canvas>
    </div>
  );
}
