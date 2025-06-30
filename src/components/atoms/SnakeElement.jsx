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
  
  // Calculate positions and curve
  const squareSize = 64; // Adjusted for gap-2 spacing
  const startX = headPos.col * squareSize + squareSize / 2;
  const startY = headPos.row * squareSize + squareSize / 2;
  const endX = tailPos.col * squareSize + squareSize / 2;
  const endY = tailPos.row * squareSize + squareSize / 2;
  
  // Create curved path points
  const segments = 8;
  const pathPoints = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = startX + (endX - startX) * t;
    const y = startY + (endY - startY) * t;
    // Add curve by offsetting middle points
    const curveOffset = Math.sin(t * Math.PI) * 30;
    pathPoints.push({ x, y: y + curveOffset });
  }

  const pathString = pathPoints.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${path} Q ${point.x} ${point.y} ${point.x} ${point.y}`;
  }, '');

  return (
    <div className="absolute pointer-events-none z-10">
      <svg
        className="absolute top-0 left-0 w-full h-full overflow-visible"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Snake body path */}
        <motion.path
          d={pathString}
          stroke="url(#snakeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(220,47,2,0.5))'
          }}
        />
        
        {/* Snake gradient definition */}
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4757" />
            <stop offset="25%" stopColor="#DC2F02" />
            <stop offset="50%" stopColor="#FF6B6B" />
            <stop offset="75%" stopColor="#FF3838" />
            <stop offset="100%" stopColor="#C0392B" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Snake head */}
      <motion.div
        className="absolute w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white z-20"
        style={{
          left: startX - 16,
          top: startY - 16,
          boxShadow: '0 4px 12px rgba(220,47,2,0.6)'
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {/* Snake eyes */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
        {/* Snake tongue */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-pink-400"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 75% 100%, 25% 100%)'
          }}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Snake tail */}
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full border border-white z-15"
        style={{
          left: endX - 8,
          top: endY - 8,
          boxShadow: '0 2px 6px rgba(220,47,2,0.4)'
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
      
      {/* Snake scale segments */}
      {pathPoints.slice(1, -1).map((point, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-6 bg-gradient-to-b from-red-300 to-red-500 rounded-full border border-red-600"
          style={{
            left: point.x - 6,
            top: point.y - 12,
            opacity: 0.8
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: 1,
            rotate: Math.sin(index) * 10
          }}
          transition={{ 
            duration: 0.3, 
            delay: 0.6 + index * 0.1,
            type: "spring"
          }}
        />
      ))}
      
      {/* Danger effects */}
      <motion.div
        className="absolute text-red-500 text-lg"
        style={{
          left: startX - 20,
          top: startY - 30
        }}
        animate={{
          y: [0, -5, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ⚠️
      </motion.div>
      
      <motion.div
        className="absolute text-red-400 text-sm"
        style={{
          left: endX + 15,
          top: endY - 10
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        💀
      </motion.div>

      {/* Snake emoji indicator */}
      <motion.div
        className="absolute text-2xl"
        style={{
          left: (startX + endX) / 2 - 12,
          top: (startY + endY) / 2 - 20
        }}
        animate={{
          y: [0, -3, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🐍
      </motion.div>
    </div>
  );
};

export default SnakeElement;