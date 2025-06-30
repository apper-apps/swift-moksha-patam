import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const VictoryModal = ({ winner, onNewGame, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Victory animation */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ApperIcon name="Crown" className="w-10 h-10 text-white" />
        </motion.div>

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array(20).fill(null).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-gradient-to-r from-accent to-warning rounded-full"
              initial={{ 
                x: Math.random() * 400,
                y: -20,
                opacity: 1,
                scale: 0
              }}
              animate={{ 
                y: 500,
                opacity: 0,
                scale: 1,
                rotate: 360
              }}
              transition={{
                duration: 2,
                delay: index * 0.1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </div>

        <motion.h2
          className="text-3xl font-display text-primary mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Victory!
        </motion.h2>
        
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="w-12 h-12 rounded-full mr-3 flex items-center justify-center"
            style={{ backgroundColor: winner?.color }}
          >
            <ApperIcon name="User" className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-xl font-bold text-gray-800">
              {winner?.name}
            </p>
            <p className="text-gray-600">
              Reached enlightenment!
            </p>
          </div>
        </motion.div>

        <motion.p
          className="text-gray-600 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Congratulations on completing your journey through the game of life! 
          You have achieved moksha - the ultimate spiritual goal.
        </motion.p>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            onClick={onNewGame}
            className="w-full"
            icon="Play"
          >
            Play Again
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
            icon="X"
          >
            Close
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VictoryModal;