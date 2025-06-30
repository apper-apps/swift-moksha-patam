import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const PlayerStatus = ({ players, currentPlayerIndex }) => {
  const sortedPlayers = [...players].sort((a, b) => b.position - a.position);

  return (
    <Card>
      <h3 className="text-lg font-display text-primary mb-4">
        Player Rankings
      </h3>
      
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
              player.id === players[currentPlayerIndex]?.id
                ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: player.color }}
                >
                  <ApperIcon name="User" className="w-4 h-4 text-white" />
                </div>
                {index === 0 && player.position > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent to-warning rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ApperIcon name="Crown" className="w-2 h-2 text-white" />
                  </motion.div>
                )}
              </div>
              
              <div>
                <p className="font-medium text-gray-800">
                  {player.name}
                </p>
                <p className="text-sm text-gray-600">
                  Position {player.position}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-gray-800">
                #{index + 1}
              </div>
              {player.position === 100 && (
                <motion.div
                  className="text-xs text-success font-semibold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  WINNER!
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Game Progress</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${Math.max(...players.map(p => p.position))}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-medium text-gray-800">
              {Math.max(...players.map(p => p.position))}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlayerStatus;