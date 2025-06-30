import React from 'react';
import { motion } from 'framer-motion';

const DiceComponent = ({ value, isRolling, onClick, disabled = false }) => {
  const getDiceFace = (num) => {
    const faces = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    return faces[num] || [];
  };

  const activeDots = getDiceFace(value);

  return (
    <motion.button
      className={`
        relative w-16 h-16 bg-gradient-to-br from-white to-gray-100 
        border-2 border-gray-300 rounded-xl shadow-dice
        flex items-center justify-center cursor-pointer
        transition-all duration-300 hover:shadow-xl
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      `}
      onClick={!disabled ? onClick : undefined}
      animate={isRolling ? {
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 1.2, 1.1, 1]
      } : {}}
      transition={isRolling ? { duration: 1, ease: "easeInOut" } : {}}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Dice dots grid */}
      <div className="grid grid-cols-3 gap-1 w-10 h-10">
        {Array(9).fill(null).map((_, index) => (
          <motion.div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${activeDots.includes(index) ? 'bg-primary' : 'bg-transparent'}
            `}
            animate={isRolling ? {
              backgroundColor: ['#E85D04', '#DC2F02', '#FFBA08', '#E85D04']
            } : {}}
            transition={isRolling ? { duration: 0.5, repeat: 2 } : {}}
          />
        ))}
      </div>
      
      {/* Rolling indicator */}
      {isRolling && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
      
      {/* Click to roll text */}
      {!value && !isRolling && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
          Click to roll
        </div>
      )}
    </motion.button>
  );
};

export default DiceComponent;