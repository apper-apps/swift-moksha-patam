import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BoardSquare = ({ number, type = 'normal', isHighlighted = false, onClick }) => {
  const getSquareTheme = () => {
    // Special squares
    if (type === 'snake') {
      return {
        bg: 'bg-gradient-to-br from-red-100 via-red-50 to-orange-100',
        border: 'border-red-300',
        text: 'text-red-700',
        pattern: 'snake-gradient'
      };
    }
    if (type === 'ladder') {
      return {
        bg: 'bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-100',
        border: 'border-emerald-300',
        text: 'text-emerald-700',
        pattern: 'ladder-gradient'
      };
    }
    
    // Victory square
    if (number === 100) {
      return {
        bg: 'bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100',
        border: 'border-yellow-400',
        text: 'text-yellow-700',
        pattern: 'victory-glow'
      };
    }
    
    // Thematic squares based on number ranges
    if (number >= 90) return { bg: 'bg-gradient-to-br from-purple-50 to-indigo-100', border: 'border-purple-200', text: 'text-purple-700' };
    if (number >= 80) return { bg: 'bg-gradient-to-br from-blue-50 to-cyan-100', border: 'border-blue-200', text: 'text-blue-700' };
    if (number >= 70) return { bg: 'bg-gradient-to-br from-teal-50 to-emerald-100', border: 'border-teal-200', text: 'text-teal-700' };
    if (number >= 60) return { bg: 'bg-gradient-to-br from-green-50 to-lime-100', border: 'border-green-200', text: 'text-green-700' };
    if (number >= 50) return { bg: 'bg-gradient-to-br from-yellow-50 to-amber-100', border: 'border-yellow-200', text: 'text-yellow-700' };
    if (number >= 40) return { bg: 'bg-gradient-to-br from-orange-50 to-red-100', border: 'border-orange-200', text: 'text-orange-700' };
    if (number >= 30) return { bg: 'bg-gradient-to-br from-pink-50 to-rose-100', border: 'border-pink-200', text: 'text-pink-700' };
    if (number >= 20) return { bg: 'bg-gradient-to-br from-violet-50 to-purple-100', border: 'border-violet-200', text: 'text-violet-700' };
    if (number >= 10) return { bg: 'bg-gradient-to-br from-indigo-50 to-blue-100', border: 'border-indigo-200', text: 'text-indigo-700' };
    return { bg: 'bg-gradient-to-br from-gray-50 to-slate-100', border: 'border-gray-200', text: 'text-gray-700' };
  };

  const getSquareIcon = () => {
    if (type === 'snake') return <ApperIcon name="Zap" className="w-3 h-3 text-red-600" />;
    if (type === 'ladder') return <ApperIcon name="TrendingUp" className="w-3 h-3 text-emerald-600" />;
    if (number === 100) return <ApperIcon name="Crown" className="w-4 h-4 text-yellow-600" />;
    
    // Contextual icons based on number significance
    if (number % 10 === 0) return <ApperIcon name="Star" className="w-3 h-3 opacity-60" />;
    if (number === 1) return <ApperIcon name="Play" className="w-3 h-3 text-green-600" />;
    if ([13, 17, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].includes(number)) {
      return <ApperIcon name="Sparkles" className="w-2 h-2 opacity-50" />;
    }
    if (number % 5 === 0) return <ApperIcon name="Diamond" className="w-2 h-2 opacity-40" />;
    if (number % 7 === 0) return <ApperIcon name="Heart" className="w-2 h-2 text-pink-500 opacity-60" />;
    
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
      whileHover={{ scale: 1.05, rotate: [0, 1, 0] }}
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