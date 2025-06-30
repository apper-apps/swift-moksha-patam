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
  
  // Calculate ladder position and properties
  const squareSize = 64; // Adjusted for gap-2 spacing
  const startX = bottomPos.col * squareSize + squareSize / 2;
  const startY = bottomPos.row * squareSize + squareSize / 2;
  const endX = topPos.col * squareSize + squareSize / 2;
  const endY = topPos.row * squareSize + squareSize / 2;
  
  const ladderLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  const rungs = Math.max(3, Math.floor(ladderLength / 15));

  const centerX = (startX + endX) / 2;
  const centerY = (startY + endY) / 2;

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{
        left: centerX - ladderLength / 2,
        top: centerY - 4,
        width: ladderLength,
        height: 8,
        transformOrigin: 'center',
        transform: `rotate(${angle}deg)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Cartoon ladder with bright colors */}
      <div className="relative w-full h-full">
        {/* Left rail */}
        <motion.div
          className="absolute left-0 top-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full"
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 2px 8px rgba(255,193,7,0.6)',
              '0 4px 12px rgba(255,193,7,0.8)',
              '0 2px 8px rgba(255,193,7,0.6)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            boxShadow: '0 2px 8px rgba(255,193,7,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
          }}
        />
        
        {/* Right rail */}
        <motion.div
          className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full"
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 2px 8px rgba(255,193,7,0.6)',
              '0 4px 12px rgba(255,193,7,0.8)',
              '0 2px 8px rgba(255,193,7,0.6)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
          style={{
            boxShadow: '0 2px 8px rgba(255,193,7,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
          }}
        />
        
        {/* Rungs */}
        {Array(rungs).fill(null).map((_, index) => {
          const rungPosition = (index + 1) * (100 / (rungs + 1));
          return (
            <motion.div
              key={index}
              className="absolute w-1 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"
              style={{
                left: `${rungPosition}%`,
                top: '0%',
                height: '100%',
                transform: 'translateX(-50%)',
                boxShadow: '0 1px 4px rgba(34,197,94,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 300
              }}
            />
          );
        })}
        
        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-2 left-1/4 text-yellow-300 text-sm"
          animate={{ 
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 right-1/4 text-blue-300 text-sm"
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 0.8, 1.2],
            opacity: [1, 0.7, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          ⭐
        </motion.div>

        {/* Helper emoji */}
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg"
          animate={{
            y: [0, -3, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🪜
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LadderElement;