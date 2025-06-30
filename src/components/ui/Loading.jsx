import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-surface">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-lg"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.h2
          className="text-2xl font-display text-primary mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Moksha Patam
        </motion.h2>
        <p className="text-gray-600 font-body">
          Preparing your spiritual journey...
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;