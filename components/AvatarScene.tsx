"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Hyperrealistic-feeling procedural avatar built from layered face volumes:
// cranium + jaw + cheek + nose + brow ridge + eye sockets + iris + lips + hair
// shell + neck + shoulders. Skin uses MeshPhysicalMaterial with sheen,
// clearcoat, and a high roughness map approximation to read as "human."
// All idle motion (breathing, blink, micro-sway, cursor tracking) is
// driven in useFrame so it feels alive without being twitchy.
//
// Replace with a real GLB later (see README). The framing here is tight
// enough that hair-top, chin, and both ears stay in frame.

function Avatar() {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const leftLid = useRef<THREE.Mesh>(null);
  const rightLid = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  // Idle blink state
  const blinkRef = useRef({ next: 2.5, t: 0 });

  useFrame(({ clock }, delta) => {
    if (!root.current || !head.current) return;
    const t = clock.getElapsedTime();

    // Slow breathing on torso only (so head doesn't bob)
    root.current.scale.y = 1 + Math.sin(t * 0.7) * 0.01;

    // Cursor-tracking head turn (lerped, gentle)
    const targetY = mouse.x * 0.35;
    const targetX = -mouse.y * 0.12;
    head.current.rotation.y += (targetY - head.current.rotation.y) * 0.05;
    head.current.rotation.x += (targetX - head.current.rotation.x) * 0.05;

    // Subtle natural sway
    head.current.rotation.z = Math.sin(t * 0.6) * 0.015;

    // Blink
    blinkRef.current.t += delta;
    if (blinkRef.current.t > blinkRef.current.next) {
      // Quick blink: scale y of eyelid 1 -> 0.05 -> 1 over 180ms
      const cycle = 0.18;
      const phase = (blinkRef.current.t - blinkRef.current.next) / cycle;
      if (phase < 0.5) {
        const k = 1 - phase * 2; // 1 -> 0
        [leftLid.current, rightLid.current].forEach((lid) => {
          if (lid) lid.scale.y = Math.max(0.05, k);
        });
      } else if (phase < 1) {
        const k = (phase - 0.5) * 2; // 0 -> 1
        [leftLid.current, rightLid.current].forEach((lid) => {
          if (lid) lid.scale.y = Math.min(1, k);
        });
      } else {
        [leftLid.current, rightLid.current].forEach((lid) => {
          if (lid) lid.scale.y = 1;
        });
        blinkRef.current.next = 2 + Math.random() * 4; // next blink in 2-6s
        blinkRef.current.t = 0;
      }
    }

    // Eye micro-movement (look slightly off-center)
    if (eyes.current) {
      eyes.current.rotation.y = Math.sin(t * 0.4) * 0.04 + mouse.x * 0.08;
      eyes.current.rotation.x = Math.cos(t * 0.5) * 0.02 - mouse.y * 0.05;
    }
  });

  // Slightly different skin tone per cheek warmth layer
  const skinColor = "#e8c5a4";
  const skinSubsurface = "#ffd6b8";

  return (
    <group ref={root}>
      {/* Shoulders + upper chest (anchor the portrait) */}
      <group position={[0, -1.05, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.95, 1.15, 0.7, 48]} />
          <meshPhysicalMaterial
            color="#15151a"
            roughness={0.85}
            metalness={0}
          />
        </mesh>
        {/* Neck shadow under jaw */}
        <mesh position={[0, 0.78, 0.05]}>
          <cylinderGeometry args={[0.22, 0.28, 0.3, 32]} />
          <meshPhysicalMaterial
            color={skinColor}
            roughness={0.5}
            metalness={0}
          />
        </mesh>
      </group>

      {/* Head group */}
      <group ref={head} position={[0, 0.2, 0]}>
        {/* Cranium — slightly egg-shaped (taller, narrower forward) */}
        <mesh scale={[0.5, 0.58, 0.52]} position={[0, 0.05, 0]}>
          <sphereGeometry args={[1, 96, 96]} />
          <meshPhysicalMaterial
            color={skinColor}
            roughness={0.55}
            metalness={0}
            sheen={0.6}
            sheenColor={skinSubsurface}
            sheenRoughness={0.5}
            clearcoat={0.15}
            clearcoatRoughness={0.6}
          />
        </mesh>

        {/* Jaw / chin volume */}
        <mesh scale={[0.42, 0.32, 0.42]} position={[0, -0.28, 0.08]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color={skinColor}
            roughness={0.6}
            sheen={0.5}
            sheenColor={skinSubsurface}
          />
        </mesh>

        {/* Cheekbone warmth (left + right) */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.28, -0.05, 0.3]} scale={[0.18, 0.12, 0.08]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color="#f0b89a"
              roughness={0.6}
              transparent
              opacity={0.55}
            />
          </mesh>
        ))}

        {/* Brow ridge */}
        <mesh position={[0, 0.18, 0.44]} scale={[0.32, 0.06, 0.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial color={skinColor} roughness={0.6} />
        </mesh>

        {/* Nose bridge */}
        <mesh position={[0, 0.04, 0.52]} scale={[0.06, 0.18, 0.08]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial color={skinColor} roughness={0.55} />
        </mesh>
        {/* Nose tip */}
        <mesh position={[0, -0.08, 0.55]} scale={[0.08, 0.06, 0.07]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial color={skinColor} roughness={0.55} />
        </mesh>
        {/* Nostrils */}
        {[-0.04, 0.04].map((x, i) => (
          <mesh key={i} position={[x, -0.1, 0.57]} scale={[0.025, 0.02, 0.02]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshPhysicalMaterial color="#7a4a3a" roughness={0.7} />
          </mesh>
        ))}

        {/* Eye sockets (recessed dark) */}
        {[-0.14, 0.14].map((x, i) => (
          <mesh key={i} position={[x, 0.08, 0.42]} scale={[0.1, 0.06, 0.04]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial color="#1a1410" roughness={0.9} />
          </mesh>
        ))}

        {/* Eyeballs + iris (group rotates for gaze) */}
        <group ref={eyes} position={[0, 0.08, 0.45]}>
          {[-0.14, 0.14].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              {/* Sclera */}
              <mesh scale={[0.07, 0.045, 0.05]}>
                <sphereGeometry args={[1, 48, 48]} />
                <meshPhysicalMaterial
                  color="#f4ede2"
                  roughness={0.25}
                  clearcoat={1}
                  clearcoatRoughness={0.05}
                />
              </mesh>
              {/* Iris */}
              <mesh position={[0, 0, 0.045]} scale={[0.035, 0.035, 0.01]}>
                <sphereGeometry args={[1, 48, 48]} />
                <meshPhysicalMaterial
                  color={i === 0 ? "#7a5a2a" : "#5a8a5a"}
                  roughness={0.3}
                  clearcoat={1}
                  emissive={i === 0 ? "#1a1208" : "#081a08"}
                  emissiveIntensity={0.4}
                />
              </mesh>
              {/* Pupil */}
              <mesh position={[0, 0, 0.052]} scale={[0.018, 0.018, 0.005]}>
                <sphereGeometry args={[1, 24, 24]} />
                <meshStandardMaterial color="#050505" roughness={0.1} />
              </mesh>
              {/* Catchlight */}
              <mesh position={[0.015, 0.015, 0.055]} scale={[0.008, 0.008, 0.003]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}
        </group>

        {/* Eyelids (blink) */}
        <mesh
          ref={leftLid}
          position={[-0.14, 0.085, 0.46]}
          scale={[0.085, 0.05, 0.025]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial color={skinColor} roughness={0.55} />
        </mesh>
        <mesh
          ref={rightLid}
          position={[0.14, 0.085, 0.46]}
          scale={[0.085, 0.05, 0.025]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial color={skinColor} roughness={0.55} />
        </mesh>

        {/* Lips — upper + lower */}
        <mesh position={[0, -0.22, 0.48]} scale={[0.09, 0.025, 0.04]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color="#c47878"
            roughness={0.35}
            clearcoat={0.8}
            clearcoatRoughness={0.3}
            sheen={0.3}
            sheenColor="#ff9999"
          />
        </mesh>
        <mesh position={[0, -0.26, 0.48]} scale={[0.085, 0.02, 0.04]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color="#b06868"
            roughness={0.4}
            clearcoat={0.7}
          />
        </mesh>

        {/* Ear hints */}
        {[-1, 1].map((s) => (
          <mesh
            key={s}
            position={[s * 0.5, 0, 0.02]}
            scale={[0.05, 0.12, 0.08]}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial color={skinColor} roughness={0.6} />
          </mesh>
        ))}

        {/* Hair — outer shell (slightly larger than cranium, pulled forward) */}
        <mesh position={[0, 0.18, -0.05]} scale={[0.54, 0.55, 0.56]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color="#1a0e08"
            roughness={0.78}
            metalness={0.05}
            clearcoat={0.5}
            clearcoatRoughness={0.4}
          />
        </mesh>
        {/* Hair top volume (a bit taller) */}
        <mesh position={[0, 0.42, -0.05]} scale={[0.42, 0.22, 0.42]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color="#120906"
            roughness={0.85}
            clearcoat={0.4}
          />
        </mesh>
        {/* Hair front strands (subtle wedge over forehead) */}
        <mesh position={[0, 0.3, 0.36]} scale={[0.28, 0.06, 0.08]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color="#1a0e08"
            roughness={0.85}
          />
        </mesh>
      </group>
    </group>
  );
}

function StudioLights() {
  return (
    <>
      {/* Warm key light from camera-right */}
      <spotLight
        position={[3, 4, 5]}
        angle={0.45}
        penumbra={0.7}
        intensity={2.4}
        color="#fff2e0"
        castShadow
      />
      {/* Cool fill from camera-left */}
      <spotLight
        position={[-4, 2, 3]}
        angle={0.7}
        penumbra={1}
        intensity={0.9}
        color="#b8d4ff"
      />
      {/* Rim/back light — accent lime */}
      <spotLight
        position={[0, 3, -4]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.5}
        color="#d4ff3a"
      />
      {/* Subtle bottom fill */}
      <pointLight position={[0, -2, 2]} intensity={0.3} color="#ffd9b8" />
      <ambientLight intensity={0.2} />
    </>
  );
}

export default function AvatarScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.05, 2.2], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0a0a0b"]} />
        <fog attach="fog" args={["#0a0a0b", 4, 12]} />
        <StudioLights />
        <Avatar />
        <ContactShadows
          position={[0, -1.65, 0]}
          opacity={0.55}
          scale={5}
          blur={2.6}
          far={2}
          color="#000000"
        />
        <Environment preset="studio" environmentIntensity={0.6} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.35}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.3}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
