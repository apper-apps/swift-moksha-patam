import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import DiceComponent from '@/components/atoms/DiceComponent';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const GameControls = ({ 
  currentPlayer, 
  lastDiceRoll, 
  isRolling, 
  onRollDice, 
  onNewGame,
  onSaveGame,
  gameState 
}) => {
  return (
    <Card className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-display text-primary mb-2">
          Current Turn
        </h2>
        <motion.div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3`}
          style={{ backgroundColor: currentPlayer?.color }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ApperIcon name="User" className="w-6 h-6 text-white" />
        </motion.div>
        <p className="text-lg font-semibold text-gray-800">
          {currentPlayer?.name}
        </p>
        <p className="text-sm text-gray-600">
          Position: {currentPlayer?.position}
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <DiceComponent
          value={lastDiceRoll}
          isRolling={isRolling}
          onClick={onRollDice}  
          disabled={isRolling}
        />
        
        {lastDiceRoll && !isRolling && (
          <motion.p
            className="text-sm text-gray-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You rolled a {lastDiceRoll}!
          </motion.p>
        )}
      </div>

      <div className="space-y-3">
        <Button
          onClick={onSaveGame}
          variant="secondary"
          className="w-full"
          icon="Save"
        >
          Save Game
        </Button>
        
        <Button
          onClick={onNewGame}
          variant="outline"
          className="w-full"
          icon="RotateCcw"
        >
          New Game
        </Button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Game Progress
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Turn:</span>
            <span className="font-medium">{gameState?.turnCount || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Leading Player:</span>
            <span className="font-medium">
              {gameState?.players?.reduce((leading, player) => 
                player.position > (leading?.position || 0) ? player : leading
              )?.name || 'None'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameControls;