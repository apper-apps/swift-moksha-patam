import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No Game in Progress", 
  message = "Start a new game to begin your journey to enlightenment!",
  actionText = "Start New Game",
  onAction 
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-surface">
      <motion.div
        className="text-center p-8 bg-white rounded-2xl shadow-game max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ApperIcon name="Gamepad2" className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-display text-primary mb-3">
          {title}
        </h2>
        
        <p className="text-gray-600 font-body mb-6 leading-relaxed">
          {message}
        </p>
        
        {onAction && (
          <motion.button
            onClick={onAction}
            className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Play" className="w-5 h-5" />
            {actionText}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Empty;