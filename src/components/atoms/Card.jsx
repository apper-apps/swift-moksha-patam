import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  onClick,
  gradient = false,
  ...props 
}) => {
  const baseClasses = `
    rounded-2xl p-6 transition-all duration-300
    ${gradient 
      ? 'bg-gradient-to-br from-white to-surface/20 backdrop-blur-sm' 
      : 'bg-white'
    }
    shadow-game
  `;
  
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      className={`${baseClasses} ${className}`}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;