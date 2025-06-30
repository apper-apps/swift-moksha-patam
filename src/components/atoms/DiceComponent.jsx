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
        relative w-20 h-20 bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400
        border-4 border-white rounded-3xl shadow-2xl
        flex items-center justify-center cursor-pointer
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
      `}
      style={{
        background: isRolling 
          ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FECA57)'
          : 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 50%, #4ECDC4 100%)',
        backgroundSize: '400% 400%',
        animation: isRolling ? 'gradient-shift 0.5s ease infinite' : 'none',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)'
      }}
      onClick={!disabled ? onClick : undefined}
      animate={isRolling ? {
        rotate: [0, 180, 360, 540, 720],
        scale: [1, 1.2, 0.9, 1.1, 1],
        y: [0, -10, 0, -5, 0]
      } : {
        y: [0, -2, 0]
      }}
      transition={isRolling ? { 
        duration: 1.5, 
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      } : {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={!disabled ? { 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        boxShadow: "0 12px 35px rgba(0,0,0,0.4)"
      } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
    >
      {/* Cartoon dice face */}
      <div className="text-4xl font-bold text-white drop-shadow-lg">
        {isRolling ? '🎲' : value || '🎯'}
      </div>
      
      {/* Sparkle effects when rolling */}
      {isRolling && (
        <>
          <motion.div
            className="absolute -top-2 -left-2 text-yellow-300 text-lg"
            animate={{ 
              rotate: [0, 360],
              scale: [0, 1, 0]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -right-2 text-blue-300 text-lg"
            animate={{ 
              rotate: [360, 0],
              scale: [0, 1, 0]
            }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
          >
            ⭐
          </motion.div>
        </>
      )}
      
      {/* Click to roll text */}
      {!value && !isRolling && (
        <motion.div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-white font-bold drop-shadow-md whitespace-nowrap"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎯 Click to roll! 🎯
        </motion.div>
      )}
    </motion.button>
  );
};

export default DiceComponent;