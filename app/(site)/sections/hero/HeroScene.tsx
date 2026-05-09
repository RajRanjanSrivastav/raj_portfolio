"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiThreedotjs,
  SiFramer,
} from "react-icons/si";

type OrbitItemType = {
  radius: number;
  speed: number;
  angle: number;
  y: number;
  icon: React.ReactNode;
  label: string;
};

/* ─── Camera ─────────────────────────────────────────────── */
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.55,
      0.022
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.35,
      0.022
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Star Field ──────────────────────────────────────────── */
function StarField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(1600 * 3);
    for (let i = 0; i < 1600; i++) {
      // Spherical shell so stars never crowd the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 28;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.009;
    pointsRef.current.rotation.x = clock.elapsedTime * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#93c5fd"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Orbit System ────────────────────────────────────────── */
function OrbitSystem() {
  const groupRef = useRef<THREE.Group>(null);

  const orbitItems = useMemo<OrbitItemType[]>(
    () => [
      { radius: 2,   speed: 0.48, angle: 0, y:  0.20, icon: <SiReact />,      label: "React" },
      { radius: 2.8, speed: 0.36, angle: 1, y: -0.20, icon: <SiAngular />,     label: "Angular" },
      { radius: 3.6, speed: 0.28, angle: 2, y:  0.28, icon: <SiNextdotjs />,   label: "Next.js" },
      { radius: 4.4, speed: 0.20, angle: 3, y: -0.10, icon: <SiTypescript />,  label: "TypeScript" },
      { radius: 5.2, speed: 0.16, angle: 4, y:  0.22, icon: <SiNodedotjs />,   label: "Node.js" },
      { radius: 6.0, speed: 0.12, angle: 5, y: -0.22, icon: <SiThreedotjs />,  label: "Three.js" },
      { radius: 6.8, speed: 0.09, angle: 6, y:  0.14, icon: <SiFramer />,      label: "Framer" },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.055) * 0.055;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.32) * 0.055;
  });

  return (
    <group ref={groupRef}>
      {/* ── Core sphere ── */}
      <mesh>
        <sphereGeometry args={[0.38, 64, 64]} />
        <meshStandardMaterial
          color="#05050f"
          emissive="#1d4ed8"
          emissiveIntensity={4.5}
        />
      </mesh>

      {/* ── Layered outer halos ── */}
      {[
        { r: 0.62, op: 0.07 },
        { r: 0.88, op: 0.04 },
        { r: 1.18, op: 0.02 },
      ].map(({ r, op }, i) => (
        <mesh key={i}>
          <sphereGeometry args={[r, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={op} />
        </mesh>
      ))}

      {/* ── Monogram ── */}
      <Html center>
        <div
          className="
            flex items-center justify-center
            w-[72px] h-[72px] rounded-full
            border border-blue-500/[0.18]
            bg-black/75 backdrop-blur-2xl
            shadow-[0_0_48px_rgba(37,99,235,0.38),inset_0_1px_0_rgba(255,255,255,0.05)]
          "
        >
          <span className="text-lg font-extralight tracking-[0.18em] text-white/85">
            RR
          </span>
        </div>
      </Html>

      {/* ── Orbit rings ── */}
      {[2, 2.8, 3.6, 4.4, 5.2, 6.0, 6.8].map((radius, i) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.007, 128]} />
          <meshBasicMaterial
            color="#1e3a5f"
            transparent
            opacity={i % 2 === 0 ? 0.18 : 0.10}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* ── Orbiting icons ── */}
      {orbitItems.map((item, index) => (
        <OrbitItem key={index} {...item} />
      ))}
    </group>
  );
}

/* ─── Single Orbit Item ───────────────────────────────────── */
function OrbitItem({ radius, speed, angle, y, icon, label }: OrbitItemType) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime * speed + angle;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.z = Math.sin(t) * radius;
    groupRef.current.position.y = Math.sin(t * 2) * 0.09 + y;
    groupRef.current.rotation.y += 0.007;
  });

  return (
    <group ref={groupRef}>
      {/* Micro glow sphere */}
      <mesh>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial
          color="#04040d"
          emissive="#2563eb"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* Icon card */}
      <Html center distanceFactor={10}>
        <div className="group relative cursor-pointer select-none">
          <div
            className="
              flex items-center justify-center
              w-[42px] h-[42px] rounded-[14px]
              border border-white/[0.07]
              bg-black/82 backdrop-blur-xl text-white/75
              shadow-[0_0_18px_rgba(37,99,235,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]
              transition-all duration-500
              group-hover:scale-110
              group-hover:border-blue-400/22
              group-hover:shadow-[0_0_32px_rgba(37,99,235,0.32)]
              group-hover:text-white
            "
          >
            {icon}
          </div>

          {/* Tooltip */}
          <div
            className="
              absolute left-1/2 top-full mt-2.5 -translate-x-1/2
              rounded-full border border-white/[0.07]
              bg-black/92 px-2.5 py-[3px]
              text-[8px] uppercase tracking-[0.28em] text-zinc-500
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100 whitespace-nowrap
            "
          >
            {label}
          </div>
        </div>
      </Html>
    </group>
  );
}

/* ─── Export ──────────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Elliptical atmosphere — shifted right so left text stays dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_68%_50%,rgba(37,99,235,0.13),transparent_72%)]" />

      {/* Depth fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/85" />

      {/* Left-side content protection gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] from-[18%] via-[#050508]/75 via-[42%] to-transparent" />

      {/* Ultra-subtle grid */}
      <div
        className="
          absolute inset-0 opacity-[0.028]
          bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),
              linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
          bg-[size:110px_110px]
        "
      />

      <Canvas
        camera={{ position: [0, 0, 11], fov: 44 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraRig />
        <ambientLight intensity={0.28} />
        <pointLight position={[0, 0, 4]} intensity={5} color="#3b82f6" />
        <pointLight position={[-4, 4, 2]} intensity={0.9} color="#93c5fd" />
        <pointLight position={[6, -3, 1]} intensity={0.4} color="#1d4ed8" />
        <StarField />
        <OrbitSystem />
      </Canvas>
    </div>
  );
}