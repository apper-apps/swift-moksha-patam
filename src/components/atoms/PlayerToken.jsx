import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PlayerToken = ({ player, isCurrentPlayer = false, style }) => {
  return (
    <motion.div
      className={`
        w-8 h-8 rounded-full flex items-center justify-center border-4 border-white
        relative z-20 overflow-hidden
        ${isCurrentPlayer ? 'token-bounce' : ''}
      `}
      style={{ 
        backgroundColor: player.color,
        boxShadow: `0 0 20px ${player.color}80, 0 4px 15px rgba(0,0,0,0.3)`,
        background: `radial-gradient(circle at 30% 30%, ${player.color}, ${player.color}CC)`,
        ...style 
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1,
        rotate: 0,
        y: isCurrentPlayer ? [0, -4, 0] : 0
      }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 10,
        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ 
        scale: 1.3,
        rotate: 360,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Cartoon face */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-lg">😊</div>
        
        {/* Sparkle effect for current player */}
        {isCurrentPlayer && (
          <>
            <motion.div
              className="absolute -top-1 -left-1 text-yellow-300 text-xs"
              animate={{ 
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -right-1 text-yellow-300 text-xs"
              animate={{ 
                rotate: [360, 0],
                scale: [1.2, 0.8, 1.2]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ⭐
            </motion.div>
          </>
        )}
      </div>
      
      {/* Current player crown */}
      {isCurrentPlayer && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-yellow-400 text-sm"
          animate={{ 
            y: [0, -2, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          👑
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlayerToken;