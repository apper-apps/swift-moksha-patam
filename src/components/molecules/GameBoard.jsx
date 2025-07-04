import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import BoardSquare from '@/components/atoms/BoardSquare';
import PlayerToken from '@/components/atoms/PlayerToken';
import SnakeElement from '@/components/atoms/SnakeElement';
import LadderElement from '@/components/atoms/LadderElement';
import { mockBoardData } from '@/services/mockData/boardData';

const GameBoard = ({ players, currentPlayerIndex, onSquareClick }) => {
  // Generate board numbers in snake pattern (right-to-left on even rows)
  const generateBoardNumbers = () => {
    const numbers = [];
    for (let row = 9; row >= 0; row--) {
      const rowNumbers = [];
      for (let col = 0; col < 10; col++) {
        if (row % 2 === 0) {
          // Even rows: left to right
          rowNumbers.push(row * 10 + col + 1);
        } else {
          // Odd rows: right to left
          rowNumbers.push(row * 10 + (9 - col) + 1);
        }
      }
      numbers.push(rowNumbers);
    }
    return numbers;
  };

  const boardNumbers = generateBoardNumbers();

  const getSquareData = (number) => {
    return mockBoardData.squares.find(s => s.number === number);
  };

  const getPlayersOnSquare = (squareNumber) => {
    return players.filter(player => player.position === squareNumber);
  };

  return (
    <div className="relative">
<motion.div
        className="grid grid-cols-10 gap-2 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-6 rounded-3xl shadow-2xl board-pattern"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
        }}
      >
        {boardNumbers.map((row, rowIndex) =>
          row.map((number, colIndex) => {
            const squareData = getSquareData(number);
            const playersOnSquare = getPlayersOnSquare(number);
            
            return (
              <motion.div
                key={number}
                className="relative aspect-square"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: (rowIndex * 10 + colIndex) * 0.01 
                }}
              >
                <BoardSquare
                  number={number}
                  type={squareData?.type || 'normal'}
                  isHighlighted={false}
                  onClick={() => onSquareClick && onSquareClick(number)}
                />
                
                {/* Player tokens */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {playersOnSquare.map((player, index) => (
                    <PlayerToken
                      key={player.id}
                      player={player}
                      isCurrentPlayer={player.id === players[currentPlayerIndex]?.id}
                      style={{
                        transform: `translate(${index * 4}px, ${index * 4}px)`,
                        zIndex: 10 + index
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>

{/* Cartoon Snakes and Ladders 2D overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {mockBoardData.snakePositions.map((snake, index) => (
          <SnakeElement
            key={`snake-${index}`}
            head={snake.head}
            tail={snake.tail}
            boardNumbers={boardNumbers}
          />
        ))}
        
        {mockBoardData.ladderPositions.map((ladder, index) => (
          <LadderElement
            key={`ladder-${index}`}
            bottom={ladder.bottom}
            top={ladder.top}
            boardNumbers={boardNumbers}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;