import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, useTexture } from '@react-three/drei'
import * as random from "maath/random/dist/maath-random.esm"
import Planet from './Components/Planet'
import { planets } from './Constants'

const Stars = (props) => {

  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(10000), { radius: 350 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

function Sun(props) {
  const sunTexture = useTexture("./assets/sun.jpg");
  const sunRef = useRef();

  useFrame(({ clock }) => {
    sunRef.current.rotation.y += 0.004;
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereBufferGeometry attach="geometry" args={[16, 30, 30]} />
      <meshStandardMaterial map={sunTexture} />
    </mesh>
  );
}

function App() {

  return (
    <div className='w-full h-full absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [-70, 100, 100] }} style={{ height: window.innerWidth > 1900 ? "98vh" : "97vh" }}>
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[100, 15, 10]} angle={0.3} />
        <OrbitControls />
        <Sun />
        {
          planets.map((planet, index) => (
            <Planet key={index} size={planet.size} texture={`${planet.texture}`} position={planet.position} sunRotSpeed={planet.sunRotSpeed} rotationSpeed={planet.rotationSpeed} ring={planet.ring}/>
          ))
        }
      </Canvas>
    </div>
  );
}

export default App
