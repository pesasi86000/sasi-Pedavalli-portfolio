import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NeuralNodes({ count = 80 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random() * 0.5 + 0.3;
      speeds[i] = Math.random() * 0.3 + 0.1;
    }
    return { positions, scales, speeds };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const speed = particles.speeds[i];
      pos[i * 3 + 1] += Math.sin(time * speed + i) * 0.002;
      pos[i * 3] += Math.cos(time * speed * 0.7 + i * 0.5) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c9a227"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines({ nodeCount = 80 }) {
  const lineRef = useRef();

  const lineGeometry = useMemo(() => {
    const positions = [];
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push([
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
      ]);
    }
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = Math.sqrt(
          (nodes[i][0] - nodes[j][0]) ** 2 +
          (nodes[i][1] - nodes[j][1]) ** 2 +
          (nodes[i][2] - nodes[j][2]) ** 2
        );
        if (dist < 3.5) {
          positions.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    return new Float32Array(positions);
  }, [nodeCount]);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lineGeometry.length / 3}
          array={lineGeometry}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#c9a227"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function DataStream() {
  const ref = useRef();
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      const t = i / 49;
      points.push(
        new THREE.Vector3(
          -8 + t * 16,
          Math.sin(t * Math.PI * 3) * 1.5,
          Math.cos(t * Math.PI * 2) * 1.5 - 2
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.015, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.dashOffset -= 0.01;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial
        color="#c9a227"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function FloatingRing({ position, rotation, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = rotation[0] + t * 0.1;
    ref.current.rotation.y = rotation[1] + t * 0.15;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1.5, 0.008, 16, 100]} />
      <meshBasicMaterial
        color="#c9a227"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <NeuralNodes count={100} />
      <ConnectionLines nodeCount={100} />
      <DataStream />
      <FloatingRing position={[0, 0, -3]} rotation={[0.5, 0, 0]} scale={1.5} />
      <FloatingRing position={[2, 1, -2]} rotation={[1, 0.5, 0]} scale={0.8} />
      <FloatingRing position={[-3, -1, -1]} rotation={[0.2, 1, 0]} scale={1.1} />
    </group>
  );
}

export default function NeuralNetwork() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      opacity: 0.9,
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <Scene />
      </Canvas>
    </div>
  );
}
