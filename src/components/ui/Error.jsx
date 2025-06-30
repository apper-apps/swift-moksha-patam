import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-surface">
      <motion.div
        className="text-center p-8 bg-white rounded-2xl shadow-game max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-error to-secondary rounded-full flex items-center justify-center"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-display text-error mb-2">
          Oops! Game Error
        </h2>
        
        <p className="text-gray-600 font-body mb-6">
          {message}
        </p>
        
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="RotateCcw" className="w-5 h-5" />
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Error;