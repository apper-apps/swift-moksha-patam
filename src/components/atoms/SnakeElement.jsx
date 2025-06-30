import React from 'react';
import { motion } from 'framer-motion';

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
  
  // Calculate SVG path for snake
  const squareSize = 40; // Approximate size of each square
  const startX = headPos.col * squareSize + squareSize / 2;
  const startY = headPos.row * squareSize + squareSize / 2;
  const endX = tailPos.col * squareSize + squareSize / 2;
  const endY = tailPos.row * squareSize + squareSize / 2;
  
  // Create curved path
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2 - 50; // Curve upward
  
  const pathData = `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`;

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id={`snake-gradient-${head}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC2F02" />
          <stop offset="50%" stopColor="#D00000" />
          <stop offset="100%" stopColor="#DC2F02" />
        </linearGradient>
        <filter id={`snake-shadow-${head}`}>
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>
      
      <motion.path
        d={pathData}
        stroke={`url(#snake-gradient-${head})`}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        filter={`url(#snake-shadow-${head})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Snake head */}
      <motion.circle
        cx={startX}
        cy={startY}
        r="6"
        fill="#DC2F02"
        filter={`url(#snake-shadow-${head})`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      />
      
      {/* Snake tail */}
      <motion.circle
        cx={endX}
        cy={endY}
        r="4"
        fill="#D00000"
        filter={`url(#snake-shadow-${head})`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
    </motion.svg>
  );
};

export default SnakeElement;