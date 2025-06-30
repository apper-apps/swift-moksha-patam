import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const PlayerSetup = ({ onStartGame }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2']);

  const handlePlayerCountChange = (count) => {
    setPlayerCount(count);
    const newNames = Array(count).fill(null).map((_, i) => 
      playerNames[i] || `Player ${i + 1}`
    );
    setPlayerNames(newNames);
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const players = playerNames.slice(0, playerCount).map((name, index) => ({
      id: `player-${index + 1}`,
      name: name.trim() || `Player ${index + 1}`,
      position: 0,
      color: ['#E85D04', '#06A77D', '#005377', '#D00000'][index],
      isAI: false
    }));
    
    onStartGame(players);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface mandala-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-4"
      >
        <Card gradient>
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ApperIcon name="Crown" className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-display text-primary mb-2">
              Moksha Patam
            </h1>
            <p className="text-gray-600 font-body">
              The path to enlightenment awaits
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Number of Players
            </h3>
            <div className="flex gap-2">
              {[2, 3, 4].map((count) => (
                <Button
                  key={count}
                  variant={playerCount === count ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => handlePlayerCountChange(count)}
                  className="flex-1"
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Player Names
            </h3>
            <div className="space-y-3">
              {Array(playerCount).fill(null).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Input
                    placeholder={`Player ${index + 1}`}
                    value={playerNames[index] || ''}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStartGame}
            className="w-full"
            icon="Play"
          >
            Start Game
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlayerSetup;