import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BoardSquare = ({ number, type = 'normal', isHighlighted = false, onClick }) => {
  const getSquareColor = () => {
    switch (type) {
      case 'snake':
        return 'bg-gradient-to-br from-secondary/20 to-error/20 border-secondary/30';
      case 'ladder':
        return 'bg-gradient-to-br from-accent/20 to-warning/20 border-accent/30';
      default:
        return number === 100 
          ? 'bg-gradient-to-br from-success/20 to-accent/20 border-success/30'
          : 'bg-white border-gray-200';
    }
  };

  const getSquareIcon = () => {
    switch (type) {
      case 'snake':
        return <ApperIcon name="Zap" className="w-3 h-3 text-secondary" />;
      case 'ladder':
        return <ApperIcon name="TrendingUp" className="w-3 h-3 text-accent" />;
      default:
        return number === 100 ? <ApperIcon name="Crown" className="w-3 h-3 text-success" /> : null;
    }
  };

  return (
    <motion.div
      className={`
        w-full h-full border-2 rounded-lg flex flex-col items-center justify-center
        cursor-pointer transition-all duration-300 relative overflow-hidden
        ${getSquareColor()}
        ${isHighlighted ? 'ring-2 ring-primary shadow-lg' : ''}
        hover:shadow-md hover:scale-105
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background pattern for special squares */}
      {(type === 'snake' || type === 'ladder') && (
        <div className="absolute inset-0 opacity-10">
          <div className={`w-full h-full ${type === 'snake' ? 'snake-gradient' : 'ladder-gradient'}`} />
        </div>
      )}
      
      {/* Square number */}
      <div className={`
        text-xs font-bold z-10 
        ${type === 'snake' ? 'text-secondary' : 
          type === 'ladder' ? 'text-accent' : 
          number === 100 ? 'text-success' : 'text-gray-700'}
      `}>
        {number}
      </div>
      
      {/* Special square icon */}
      {getSquareIcon() && (
        <div className="z-10 mt-1">
          {getSquareIcon()}
        </div>
      )}
      
      {/* Finish line effect for square 100 */}
      {number === 100 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-success/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default BoardSquare;