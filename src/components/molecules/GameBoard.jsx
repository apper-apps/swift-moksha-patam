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
        className="grid grid-cols-10 gap-1 bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-2xl shadow-game board-pattern"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
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

{/* Snakes and Ladders 3D overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{
            position: [0, 0, 100],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, -10, -5]} intensity={0.3} />
          
          <Suspense fallback={null}>
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
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default GameBoard;