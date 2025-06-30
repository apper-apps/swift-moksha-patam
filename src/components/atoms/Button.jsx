import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white",
    secondary: "bg-gradient-to-r from-accent to-surface hover:from-surface hover:to-accent text-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white",
    ghost: "text-primary hover:bg-primary/10",
  };
  
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Loader2" className="w-5 h-5" />
        </motion.div>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} className="w-5 h-5" />
      )}
      
      {!loading && children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default Button;