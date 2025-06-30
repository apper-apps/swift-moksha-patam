import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Snake3D = ({ startPos, endPos, midPos, head }) => {
  // Create curve for snake body
  const curve = useMemo(() => {
    const start = new THREE.Vector3(0, 0, 0);
    const mid = new THREE.Vector3(
      (midPos.x - startPos.x) * 0.1, 
      (midPos.y - startPos.y) * 0.1, 
      15
    );
    const end = new THREE.Vector3(
      (endPos.x - startPos.x) * 0.1, 
      (endPos.y - startPos.y) * 0.1, 
      0
    );
    
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startPos, endPos, midPos]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 20, 3, 8, false);
  }, [curve]);

  // Snake colors
  const snakeColor = '#DC2F02';
  const scaleColor = '#8B0000';

  // Create segments for scale pattern
  const segments = 15;
  const segmentPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < segments; i++) {
      const t = i / (segments - 1);
      const point = curve.getPoint(t);
      positions.push(point);
    }
    return positions;
  }, [curve, segments]);

  return (
    <group>
      {/* Main snake body */}
      <mesh>
        <primitive object={tubeGeometry} />
        <meshLambertMaterial color={snakeColor} />
      </mesh>
      
      {/* Scale segments */}
      {segmentPositions.map((pos, index) => (
        <mesh key={index} position={pos} scale={[1, 1, 0.8]}>
          <ringGeometry args={[2.5, 3.5, 8]} />
          <meshLambertMaterial color={scaleColor} transparent opacity={0.7} />
        </mesh>
      ))}
      
      {/* Snake head (larger sphere) */}
      <mesh position={segmentPositions[0]} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[4, 12, 8]} />
        <meshLambertMaterial color="#FF0000" />
      </mesh>
      
      {/* Snake eyes */}
      <mesh position={[segmentPositions[0].x - 1.5, segmentPositions[0].y + 1, segmentPositions[0].z + 3]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      <mesh position={[segmentPositions[0].x + 1.5, segmentPositions[0].y + 1, segmentPositions[0].z + 3]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      
      {/* Snake tail (smaller sphere) */}
      <mesh position={segmentPositions[segmentPositions.length - 1]} scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[3, 10, 6]} />
        <meshLambertMaterial color={scaleColor} />
      </mesh>
    </group>
  );
};

const SnakeElement = ({ head, tail, boardNumbers }) => {
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

  const headPos = getSquarePosition(head);
  const tailPos = getSquarePosition(tail);
  
  // Calculate positions and curve
  const squareSize = 40;
  const startX = headPos.col * squareSize + squareSize / 2;
  const startY = headPos.row * squareSize + squareSize / 2;
  const endX = tailPos.col * squareSize + squareSize / 2;
  const endY = tailPos.row * squareSize + squareSize / 2;
  
  // Create curved path
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2 - 50;

// Convert positions to 3D coordinates
  const position = [
    (startX + endX) / 2 - 200,
    200 - (startY + endY) / 2,
    0
  ];
  
  return (
    <group position={position}>
      <Snake3D 
        startPos={{ x: 0, y: 0 }}
        endPos={{ x: endX - startX, y: startY - endY }}
        midPos={{ x: midX - startX, y: startY - midY }}
        head={head}
      />
    </group>
  );
};

export default SnakeElement;