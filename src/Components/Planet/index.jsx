import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { DoubleSide } from 'three'

const Planet = ({ size, texture, position, rotationSpeed, sunRotSpeed, ring }) => {
  
  const planetTexture = useTexture(texture);
  const ringTexture = ring !== undefined ? useTexture(ring.texture) : null;
  const planetRef = useRef();
  const ringRef= useRef();
  const objRef = useRef();

  useFrame(({ clock }) => {
    planetRef.current.rotation.y += rotationSpeed;
    objRef.current.rotation.y += sunRotSpeed;
  });

  return (
    <object3D ref={objRef}>
      <mesh ref={planetRef} position={[position, 0, 0]} >
        <sphereBufferGeometry attach="geometry" args={[size, 30, 30]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>
      {
        ring !== undefined
          ?
            <mesh ref={ringRef} position={[position, 0, 0]} rotation={[-0.5 * Math.PI ,0, 0]}>
              <ringBufferGeometry args={[ring.innerRadius, ring.outerRadius, 32]}/>
              <meshBasicMaterial map={ringTexture} side={DoubleSide}/>
            </mesh>
          : null
      }
    </object3D>
  )
}

export default Planet