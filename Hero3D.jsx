import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function PulseCore() {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 0.6) * 0.04;
      glowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshBasicMaterial color="#35B8C8" transparent opacity={0.08} />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshStandardMaterial
          color="#1479D1"
          emissive="#0B5F8A"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.35}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius, speed, tilt, color }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) ref.current.rotation.z = t * speed;
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.008, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Particles({ count = 60 }) {
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = t * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#9FE3EA" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Scene({ lowPower }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 5]} intensity={1.4} color="#35B8C8" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#1479D1" />
      <PulseCore />
      <OrbitRing radius={2.0} speed={0.15} tilt={0.5} color="#35B8C8" />
      <OrbitRing radius={2.35} speed={-0.1} tilt={1.1} color="#1479D1" />
      {!lowPower && <Particles count={70} />}
    </>
  );
}

export default function Hero3D() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setLowPower(mq.matches || reduce.matches);
    update();
    mq.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className="hero3d-wrap" aria-hidden="true">
      <Canvas
        dpr={lowPower ? 1 : [1, 1.8]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene lowPower={lowPower} />
        </Suspense>
      </Canvas>
      <style>{`
        .hero3d-wrap {
          width: 100%;
          height: 100%;
          min-height: 340px;
        }
      `}</style>
    </div>
  );
}
