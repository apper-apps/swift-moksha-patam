import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PlayerToken = ({ player, isCurrentPlayer = false, style }) => {
  return (
    <motion.div
      className={`
        w-6 h-6 rounded-full flex items-center justify-center border-2 border-white
        shadow-token relative z-20
        ${isCurrentPlayer ? 'token-glow' : ''}
      `}
      style={{ 
        backgroundColor: player.color,
        ...style 
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        rotate: isCurrentPlayer ? [0, 5, -5, 0] : 0
      }}
      transition={{ 
        duration: 0.3,
        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ scale: 1.2 }}
    >
      <ApperIcon name="User" className="w-3 h-3 text-white" />
      
      {/* Current player indicator */}
      {isCurrentPlayer && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-accent to-warning rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default PlayerToken;