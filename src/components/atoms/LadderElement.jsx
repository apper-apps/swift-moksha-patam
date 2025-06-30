import React, { useMemo } from 'react';
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

// Convert positions to 3D coordinates
  const position = [
    (startX + endX) / 2 - 200,
    200 - (startY + endY) / 2,
    0
  ];
  
  return (
    <group position={position}>
      <Ladder3D 
        startPos={{ x: 0, y: 0 }}
        endPos={{ x: endX - startX, y: startY - endY }}
        ladderLength={ladderLength}
        angle={-angle}
        rungs={rungs}
        bottom={bottom}
      />
    </group>
  );
};

export default LadderElement;