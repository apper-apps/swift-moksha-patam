import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';
import PlayerSetup from '@/components/molecules/PlayerSetup';
import GameBoard from '@/components/molecules/GameBoard';
import GameControls from '@/components/molecules/GameControls';
import PlayerStatus from '@/components/molecules/PlayerStatus';
import VictoryModal from '@/components/molecules/VictoryModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { gameService } from '@/services/api/gameService';

const GamePage = () => {
  const [gameState, setGameState] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [lastDiceRoll, setLastDiceRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  // Initialize game
  useEffect(() => {
    loadSavedGame();
  }, []);

  const loadSavedGame = async () => {
    try {
      setIsLoading(true);
      const savedGame = await gameService.loadGameState();
      if (savedGame) {
        setGameState(savedGame);
        setIsGameStarted(true);
        toast.success('Game loaded successfully!');
      }
    } catch (err) {
      setError('Failed to load saved game');
    } finally {
      setIsLoading(false);
    }
  };

  const startNewGame = async (players) => {
    try {
      setIsLoading(true);
      setError(null);
      
await gameService.getBoardData();
      
      const newGameState = {
        players: players,
        currentPlayerIndex: 0,
        isGameOver: false,
        winner: null,
        turnCount: 0,
        computerDifficulty: 'intermediate', // basic, intermediate, advanced
        isComputerTurn: false
      };
      
      setGameState(newGameState);
      setIsGameStarted(true);
      setLastDiceRoll(null);
      setShowVictoryModal(false);
      
      await gameService.saveGameState(newGameState);
      toast.success('New game started!');
    } catch (err) {
      setError('Failed to start new game');
    } finally {
      setIsLoading(false);
    }
  };

const rollDice = async () => {
    if (isRolling || gameState?.isGameOver) return;

    try {
      setIsRolling(true);
      setError(null);
      
      const currentPlayer = gameState.players[gameState.currentPlayerIndex];
      
      // Check if it's a computer player
      if (currentPlayer.isComputer) {
        await handleComputerTurn();
        return;
      }
      
      // Human player turn
      await executePlayerTurn();
      
    } catch (err) {
      setError('Failed to roll dice');
      toast.error('Failed to roll dice');
    } finally {
      setIsRolling(false);
    }
  };

  const executePlayerTurn = async () => {
    // Simulate dice roll delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const diceValue = gameService.rollDice();
    setLastDiceRoll(diceValue);
    
    await processPlayerMove(diceValue);
  };

  const handleComputerTurn = async () => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    toast.info(`${currentPlayer.name} is thinking...`);
    
    // Computer thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const computerMove = await gameService.makeComputerMove(
      currentPlayer,
      gameState.computerDifficulty,
      gameState
    );
    
    setLastDiceRoll(computerMove.diceValue);
    toast.info(`${currentPlayer.name} rolled a ${computerMove.diceValue}!`);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    await processPlayerMove(computerMove.diceValue);
  };

  const processPlayerMove = async (diceValue) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const newPosition = gameService.calculateNewPosition(currentPlayer.position, diceValue);
    
    // Check for snakes and ladders
    const specialSquare = gameService.checkSpecialSquare(newPosition);
    const finalPosition = specialSquare ? specialSquare.destination : newPosition;
    
    // Update game state
    const updatedPlayers = gameState.players.map((player, index) => {
      if (index === gameState.currentPlayerIndex) {
        return { ...player, position: finalPosition };
      }
      return player;
    });
    
    // Check for victory
    const isVictory = finalPosition >= 100;
    const winner = isVictory ? updatedPlayers[gameState.currentPlayerIndex] : null;
    
    const newGameState = {
      ...gameState,
      players: updatedPlayers,
      currentPlayerIndex: isVictory ? gameState.currentPlayerIndex : (gameState.currentPlayerIndex + 1) % gameState.players.length,
      isGameOver: isVictory,
      winner: winner,
      turnCount: gameState.turnCount + 1
    };
    
    setGameState(newGameState);
    await gameService.saveGameState(newGameState);
    
    // Show appropriate messages
    if (specialSquare) {
      if (specialSquare.type === 'snake') {
        toast.error(`${currentPlayer.name} encountered a snake! Slide down to ${specialSquare.destination}`);
      } else if (specialSquare.type === 'ladder') {
        toast.success(`${currentPlayer.name} climbed a ladder! Advance to ${specialSquare.destination}`);
      }
    }
    
    if (isVictory) {
      setShowVictoryModal(true);
      // Victory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success(`${winner.name} wins! Congratulations!`);
    } else {
      // Auto-trigger computer turn after delay
      const nextPlayer = newGameState.players[newGameState.currentPlayerIndex];
      if (nextPlayer?.isComputer && !newGameState.isGameOver) {
        setTimeout(() => {
          if (!isRolling) {
            rollDice();
          }
        }, 2000);
      }
    }
  };

  const saveGame = async () => {
    try {
      await gameService.saveGameState(gameState);
      toast.success('Game saved successfully!');
    } catch (err) {
      toast.error('Failed to save game');
    }
  };

  const resetGame = async () => {
    try {
      await gameService.clearGameState();
      setGameState(null);
      setIsGameStarted(false);
      setLastDiceRoll(null);
      setShowVictoryModal(false);
      toast.success('Game reset successfully!');
    } catch (err) {
      toast.error('Failed to reset game');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={() => setError(null)} />;
  }

  if (!isGameStarted) {
    return <PlayerSetup onStartGame={startNewGame} />;
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl font-display text-white mb-2 drop-shadow-lg"
            animate={{ 
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)", 
                "0 0 20px rgba(255,255,255,0.8)", 
                "0 0 10px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FECA57)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '300% 300%',
              animation: 'gradient-shift 4s ease infinite'
            }}
          >
            🐍 Moksha Patam 🪜
          </motion.h1>
          <p className="text-2xl text-white font-body drop-shadow-md">
            🎯 The Magical Game of Snakes and Ladders! ✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GameBoard
                players={gameState?.players || []}
                currentPlayerIndex={gameState?.currentPlayerIndex || 0}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GameControls
                currentPlayer={gameState?.players[gameState?.currentPlayerIndex]}
                lastDiceRoll={lastDiceRoll}
                isRolling={isRolling}
                onRollDice={rollDice}
                onNewGame={resetGame}
                onSaveGame={saveGame}
                gameState={gameState}
              />
            </motion.div>

            {/* Player Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PlayerStatus
                players={gameState?.players || []}
                currentPlayerIndex={gameState?.currentPlayerIndex || 0}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Victory Modal */}
      {showVictoryModal && gameState?.winner && (
        <VictoryModal
          winner={gameState.winner}
          onNewGame={resetGame}
          onClose={() => setShowVictoryModal(false)}
        />
      )}
    </div>
  );
};

export default GamePage;