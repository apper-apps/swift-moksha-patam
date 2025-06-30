import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Ladder3D = ({ startPos, endPos, ladderLength, angle, rungs, bottom }) => {
  const railGeometry = useMemo(() => new THREE.CylinderGeometry(0.8, 0.8, ladderLength, 8), [ladderLength]);
  const rungGeometry = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 12, 8), []);
  
  // Wood texture colors
  const woodColor = '#8B4513';
  const darkWoodColor = '#654321';
  
  return (
    <group rotation={[0, 0, (angle * Math.PI) / 180]}>
      {/* Left rail */}
      <mesh position={[-6, 0, 2]} rotation={[0, 0, Math.PI / 2]}>
        <primitive object={railGeometry} />
        <meshLambertMaterial color={woodColor} />
      </mesh>
      
      {/* Right rail */}
      <mesh position={[6, 0, 2]} rotation={[0, 0, Math.PI / 2]}>
        <primitive object={railGeometry} />
        <meshLambertMaterial color={woodColor} />
      </mesh>
      
      {/* Rungs */}
      {Array(rungs).fill(null).map((_, index) => {
        const rungX = (index + 1) * (ladderLength / (rungs + 1)) - ladderLength / 2;
        return (
          <mesh key={index} position={[0, rungX, 2]} rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={rungGeometry} />
            <meshLambertMaterial color={darkWoodColor} />
          </mesh>
        );
      })}
    </group>
  );
};

const LadderElement = ({ bottom, top, boardNumbers }) => {
  // Calculate positions based on board layout
  const getSquarePosition = (number) => {
    for (let row = 0; row < boardNumbers.length; row++) {
      for (let col = 0; col < boardNumbers[row].length; col++) {
        if (boardNumbers[row][col] === number) {
          return { row, col };
        }
      }
    }
    return { row: 0, col: 0 };
  };

  const bottomPos = getSquarePosition(bottom);
  const topPos = getSquarePosition(top);
  
  // Calculate ladder position and properties
  const squareSize = 40;
  const startX = bottomPos.col * squareSize + squareSize / 2;
  const startY = bottomPos.row * squareSize + squareSize / 2;
  const endX = topPos.col * squareSize + squareSize / 2;
  const endY = topPos.row * squareSize + squareSize / 2;
  
  const ladderLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  const rungs = Math.floor(ladderLength / 20);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{
        left: startX - 20,
        top: startY - 20,
        width: Math.abs(endX - startX) + 40,
        height: Math.abs(endY - startY) + 40,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <Canvas
        camera={{
          position: [0, 0, 100],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        <Ladder3D 
          startPos={{ x: startX, y: startY }}
          endPos={{ x: endX, y: endY }}
          ladderLength={ladderLength}
          angle={angle}
          rungs={rungs}
          bottom={bottom}
        />
      </Canvas>
    </motion.div>
  );
};

export default LadderElement;