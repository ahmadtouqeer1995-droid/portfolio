import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Dev bot, based on 21st.dev "Robot Hero" by uithefactory (robot.md).
// Adapted: only the floating head (dome with `</>` code-tag face, headphone
// ears, antennas). Same logic as the original: follows the cursor, head looks
// at the mouse, blinks, and clicking it shows heart eyes. Transparent canvas.

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}

const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const scale = Math.min(1.1, viewport.width / 3.5);
  return <group scale={scale}>{children}</group>;
}

function GlassCapsule({ color, power, intensity }: { color: string; power: number; intensity: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color('#ffffff') },
      power: { value: 2.5 },
      intensity: { value: 0.6 },
    }),
    []
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.30, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

const earBaseMat = new THREE.MeshStandardMaterial({ color: '#f0f0f0', roughness: 0.5 });
const earRingMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 });
const earCenterMat = new THREE.MeshStandardMaterial({ color: '#cccccc', roughness: 0.8 });
const antennaBaseMat = new THREE.MeshStandardMaterial({ color: '#999999', roughness: 0.4, metalness: 0.5 });
const antennaStickMat = new THREE.MeshStandardMaterial({ color: '#d0d0d0', roughness: 0.4, metalness: 0.2 });
const antennaTipMat = new THREE.MeshStandardMaterial({ color: '#ff3366', roughness: 0.2, toneMapped: false });

function RobotEar({ position, scale = 1, isLeft = false }: { position: [number, number, number]; scale?: number; isLeft?: boolean }) {
  const dir = isLeft ? -1 : 1;

  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earBaseMat}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>

      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earRingMat}>
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>

      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow material={earCenterMat}>
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]} castShadow receiveShadow material={antennaBaseMat}>
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow material={antennaStickMat}>
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} castShadow receiveShadow material={antennaTipMat}>
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 2, 2), toneMapped: false, transparent: true });
const heartMat = new THREE.MeshBasicMaterial({ color: '#ff3366', toneMapped: false });

// Developer face: a glowing `</>` code tag instead of plain eyes. Blinks by
// squishing vertically on the same cycle as the original eyes; clicking the
// robot still swaps the face for a heart.
function CodeFace({
  scale = 1,
  blinkDuration = 0.15,
  blinkCycle = 3.0,
  isLovedRef,
}: {
  scale?: number;
  blinkDuration?: number;
  blinkCycle?: number;
  isLovedRef: React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glyphsRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !glyphsRef.current || !heartRef.current) return;

    const isHeart = isLovedRef.current;

    glyphsRef.current.visible = !isHeart;
    heartRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;

    let targetScaleY = 1;

    if (cycle < blinkDuration && !isHeart) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);

      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { leftChevron, rightChevron, slashPath } = useMemo(() => {
    const w = 0.022; // chevron width
    const h = 0.034; // chevron half-height

    // '<'
    const lPath = new THREE.CurvePath<THREE.Vector3>();
    lPath.add(new THREE.LineCurve3(new THREE.Vector3(w, h, 0), new THREE.Vector3(-w, 0, 0)));
    lPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, 0, 0), new THREE.Vector3(w, -h, 0)));

    // '>'
    const rPath = new THREE.CurvePath<THREE.Vector3>();
    rPath.add(new THREE.LineCurve3(new THREE.Vector3(-w, h, 0), new THREE.Vector3(w, 0, 0)));
    rPath.add(new THREE.LineCurve3(new THREE.Vector3(w, 0, 0), new THREE.Vector3(-w, -h, 0)));

    // '/'
    const sPath = new THREE.CurvePath<THREE.Vector3>();
    sPath.add(new THREE.LineCurve3(new THREE.Vector3(-0.016, -0.04, 0), new THREE.Vector3(0.016, 0.04, 0)));

    return { leftChevron: lPath, rightChevron: rPath, slashPath: sPath };
  }, []);

  return (
    <group ref={groupRef}>
      <mesh ref={heartRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>

      <group ref={glyphsRef}>
        <mesh position={[-0.085, 0, 0]} rotation={[0, -0.18, 0]} material={eyeMat}>
          <tubeGeometry args={[leftChevron, 16, 0.0035, 8, false]} />
        </mesh>
        <mesh position={[0, 0, 0.005]} material={eyeMat}>
          <tubeGeometry args={[slashPath, 8, 0.0035, 8, false]} />
        </mesh>
        <mesh position={[0.085, 0, 0]} rotation={[0, 0.18, 0]} material={eyeMat}>
          <tubeGeometry args={[rightChevron, 16, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

function RobotPrototype() {
  const isLovedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const design = {
    pantallaColor: '#00ffc6',
    pantallaGrosor: 3.8,
    pantallaBrillo: 1.2,
    tamañoOrejas: 1.3,
    escalaOjos: 1.1,
    parpadeoFrecuencia: 3.0,
    parpadeoDuracion: 0.45,
    alturaCabeza: 0.05,
  };

  const config = {
    moveSpeed: 0.35,
    bodyRotSpeed: 10.0,
    headRotSpeed: 20.0,
    bodyTiltX: 0.0,
    bodyTiltY: 0.95,
    headLookX: 0.30,
    headLookY: 1.80,
  };

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;

    const dt = Math.min(delta, 0.1);

    const tx = state.pointer.x;
    const ty = state.pointer.y;

    const maxMoveX = state.viewport.width / 3.5;
    const targetPosX = tx * maxMoveX;
    bodyRef.current.position.x = THREE.MathUtils.lerp(bodyRef.current.position.x, targetPosX, config.moveSpeed * dt);

    const relativeX = tx - bodyRef.current.position.x / 2.5;

    const bodyTargetRotY = -relativeX * config.bodyTiltY;

    const bodyTargetRotX = relativeX * relativeX * config.bodyTiltX - ty * 0.25;

    const bodyTargetRotZ = -relativeX * 0.15;

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, bodyTargetRotY, config.bodyRotSpeed * dt);
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, bodyTargetRotX, config.bodyRotSpeed * dt);
    bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, bodyTargetRotZ, config.bodyRotSpeed * dt);

    const headTargetRotY = relativeX * config.headLookY;
    const headTargetRotX = -ty * config.headLookX;

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headTargetRotY, config.headRotSpeed * dt);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, headTargetRotX, config.headRotSpeed * dt);
  });

  const handlePointerDown = (e: import('@react-three/fiber').ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isLovedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
    }, 2000);
  };

  const headMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#111111',
      roughness: 1.0,
      metalness: 0.0,
    });
  }, []);

  return (
    <group
      ref={bodyRef}
      position={[0, -0.05, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/* Floating head */}
      <group ref={headRef} position={[0, design.alturaCabeza, 0]}>
        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <GlassCapsule color={design.pantallaColor} power={design.pantallaGrosor} intensity={design.pantallaBrillo} />

        <group position={[0, -0.02, 0.29]}>
          <CodeFace
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
        </group>

        <RobotEar position={[-0.29, 0, 0]} isLeft={true} scale={design.tamañoOrejas} />
        <RobotEar position={[0.29, 0, 0]} isLeft={false} scale={design.tamañoOrejas} />
      </group>

    </group>
  );
}

// Canvas-only robot: transparent background, same lights as the original
// RobotHero section.
export function Robot() {
  const entorno = {
    luzAmbiente: 0.75,
    luzPrincipal: 0.0,
    luzPrincipalColor: '#00ffe2',
    luzRelleno: 0.0,
    luzRellenoColor: '#dbdbdb',
    sombraOpacidad: 0.85,
    sombraBlur: 1.7,
  };

  return (
    <Canvas shadows camera={{ position: [0, 0.2, 6], fov: 40 }}>
      <ambientLight intensity={entorno.luzAmbiente} color='#ffffff' />

      <directionalLight
        position={[0, 6, 3]}
        intensity={entorno.luzPrincipal}
        color={entorno.luzPrincipalColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      >
        <orthographicCamera attach='shadow-camera' args={[-1.5, 1.5, 1.5, -1.5, 0.1, 20]} />
      </directionalLight>

      <directionalLight position={[-5, 2, -5]} intensity={entorno.luzRelleno} color={entorno.luzRellenoColor} />

      <Environment preset='studio' blur={0.5} />

      <ResponsiveGroup>
        <ContactShadows
          position={[0, -0.45, 0]}
          opacity={entorno.sombraOpacidad}
          scale={15}
          resolution={1024}
          blur={entorno.sombraBlur}
          far={2.5}
          color='#000000'
        />
        <RobotPrototype />
      </ResponsiveGroup>
    </Canvas>
  );
}
