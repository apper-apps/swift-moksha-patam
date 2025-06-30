import React from 'react';
import { motion } from 'framer-motion';

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
  
  // Calculate ladder position
  const squareSize = 40; // Approximate size of each square
  const startX = bottomPos.col * squareSize + squareSize / 2;
  const startY = bottomPos.row * squareSize + squareSize / 2;
  const endX = topPos.col * squareSize + squareSize / 2;
  const endY = topPos.row * squareSize + squareSize / 2;
  
  const ladderLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  
  // Number of rungs based on ladder length
  const rungs = Math.floor(ladderLength / 20);

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id={`ladder-gradient-${bottom}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFBA08" />
          <stop offset="50%" stopColor="#FAA307" />
          <stop offset="100%" stopColor="#FFBA08" />
        </linearGradient>
        <filter id={`ladder-shadow-${bottom}`}>
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
        </filter>
      </defs>
      
      <g transform={`translate(${startX}, ${startY}) rotate(${angle})`}>
        {/* Left rail */}
        <motion.line
          x1="0"
          y1="-3"
          x2={ladderLength}
          y2="-3"
          stroke={`url(#ladder-gradient-${bottom})`}
          strokeWidth="4"
          filter={`url(#ladder-shadow-${bottom})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        
        {/* Right rail */}
        <motion.line
          x1="0"
          y1="3"
          x2={ladderLength}
          y2="3"
          stroke={`url(#ladder-gradient-${bottom})`}
          strokeWidth="4"
          filter={`url(#ladder-shadow-${bottom})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        
        {/* Rungs */}
        {Array(rungs).fill(null).map((_, index) => {
          const rungX = (index + 1) * (ladderLength / (rungs + 1));
          return (
            <motion.line
              key={index}
              x1={rungX}
              y1="-3"
              x2={rungX}
              y2="3"
              stroke={`url(#ladder-gradient-${bottom})`}
              strokeWidth="3"
              filter={`url(#ladder-shadow-${bottom})`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.2, delay: 0.5 + index * 0.1 }}
            />
          );
        })}
      </g>
    </motion.svg>
  );
};

export default LadderElement;