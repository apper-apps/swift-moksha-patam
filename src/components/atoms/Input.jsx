import React from 'react';
import { motion } from 'framer-motion';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary/20
          ${error 
            ? 'border-error focus:border-error' 
            : 'border-gray-200 focus:border-primary hover:border-primary/50'
          }
          bg-white placeholder-gray-400 text-gray-900
        `}
        {...props}
      />
      
      {error && (
        <motion.p 
          className="mt-1 text-sm text-error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Input;