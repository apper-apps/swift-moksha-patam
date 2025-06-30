import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BoardSquare = ({ number, type = 'normal', isHighlighted = false, onClick }) => {
const getSquareTheme = () => {
    // Special squares with cartoon styling
    if (type === 'snake') {
      return {
        bg: 'bg-gradient-to-br from-red-400 to-red-600',
        border: 'border-red-300',
        text: 'text-white font-bold',
        emoji: '🐍',
        pattern: 'cartoon-snake'
      };
    }
    if (type === 'ladder') {
      return {
        bg: 'bg-gradient-to-br from-green-400 to-blue-500',
        border: 'border-green-300',
        text: 'text-white font-bold',
        emoji: '🪜',
        pattern: 'cartoon-ladder'
      };
    }
    
    // Victory square with celebration
    if (number === 100) {
      return {
        bg: 'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500',
        border: 'border-yellow-400',
        text: 'text-white font-extrabold',
        emoji: '🏆',
        pattern: 'cartoon-pop'
      };
    }
    
    // Colorful cartoon squares based on ranges
    const colors = [
      { range: 90, bg: 'from-purple-400 to-pink-500', border: 'purple-300', text: 'white', emoji: '👑' },
      { range: 80, bg: 'from-blue-400 to-indigo-500', border: 'blue-300', text: 'white', emoji: '🔮' },
      { range: 70, bg: 'from-teal-400 to-green-500', border: 'teal-300', text: 'white', emoji: '🍀' },
      { range: 60, bg: 'from-green-400 to-emerald-500', border: 'green-300', text: 'white', emoji: '🌟' },
      { range: 50, bg: 'from-yellow-400 to-orange-500', border: 'yellow-300', text: 'white', emoji: '🌻' },
      { range: 40, bg: 'from-orange-400 to-red-500', border: 'orange-300', text: 'white', emoji: '🎨' },
      { range: 30, bg: 'from-pink-400 to-rose-500', border: 'pink-300', text: 'white', emoji: '🌺' },
      { range: 20, bg: 'from-violet-400 to-purple-500', border: 'violet-300', text: 'white', emoji: '🦄' },
      { range: 10, bg: 'from-indigo-400 to-blue-500', border: 'indigo-300', text: 'white', emoji: '⚡' },
      { range: 0, bg: 'from-gray-300 to-gray-400', border: 'gray-300', text: 'gray-700', emoji: '🌱' }
    ];
    
    const colorScheme = colors.find(c => number >= c.range);
    return {
      bg: `bg-gradient-to-br ${colorScheme.bg}`,
      border: `border-${colorScheme.border}`,
      text: `text-${colorScheme.text} font-bold`,
      emoji: colorScheme.emoji
    };
  };

  const getSquareIcon = () => {
    if (type === 'snake') return '🐍';
    if (type === 'ladder') return '🪜';
    if (number === 100) return '🏆';
    
    // Fun icons based on number significance
    if (number % 10 === 0) return '⭐';
    if (number === 1) return '🚀';
    if ([13, 17, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].includes(number)) {
      return '✨';
    }
    if (number % 5 === 0) return '💎';
    if (number % 7 === 0) return '❤️';
    
    return null;
  };

  const getContextualEmoji = () => {
    if (number >= 90) return '👑';
    if (number >= 80) return '🏆';
    if (number >= 70) return '🎯';
    if (number >= 60) return '🌟';
    if (number >= 50) return '💎';
    if (number >= 40) return '🎨';
    if (number >= 30) return '🌸';
    if (number >= 20) return '🌈';
    if (number >= 10) return '✨';
    return '🌱';
  };

  const theme = getSquareTheme();

  return (
    <motion.div
      className={`
        w-full h-full border-2 rounded-lg flex flex-col items-center justify-center
        cursor-pointer transition-all duration-300 relative overflow-hidden
        ${theme.bg} ${theme.border}
        ${isHighlighted ? 'ring-2 ring-primary shadow-lg scale-105' : ''}
        hover:shadow-md hover:scale-105 hover:border-opacity-70
        group
      `}
      onClick={onClick}
whileHover={{ 
        scale: 1.1, 
        rotate: [0, -2, 2, 0],
        className: "cartoon-wobble"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background pattern */}
      {theme.pattern && (
        <div className={`absolute inset-0 opacity-20 ${theme.pattern}`} />
      )}
      
      {/* Contextual emoji background */}
      <div className="absolute top-0 right-0 text-xs opacity-20 group-hover:opacity-40 transition-opacity">
        {getContextualEmoji()}
      </div>
      
      {/* Square number */}
      <div className={`text-xs font-bold z-10 ${theme.text} group-hover:scale-110 transition-transform`}>
        {number}
      </div>
      
      {/* Special square icon */}
      {getSquareIcon() && (
        <motion.div 
          className="z-10 mt-1"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {getSquareIcon()}
        </motion.div>
      )}
      
      {/* Interactive particles for special squares */}
      {(type === 'snake' || type === 'ladder' || number === 100) && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full animate-ping animation-delay-200" />
          <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping animation-delay-400" />
        </motion.div>
      )}
      
      {/* Victory shimmer effect */}
      {number === 100 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {/* Milestone glow for multiples of 10 */}
      {number % 10 === 0 && number !== 100 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default BoardSquare;