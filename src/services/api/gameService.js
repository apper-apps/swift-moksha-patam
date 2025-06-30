import { mockBoardData } from '@/services/mockData/boardData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const gameService = {
  async getBoardData() {
    await delay(200);
    return { ...mockBoardData };
  },

  async saveGameState(gameState) {
    await delay(300);
    // In a real app, this would save to a backend
    localStorage.setItem('moksha-patam-game', JSON.stringify(gameState));
    return { success: true };
  },

  async loadGameState() {
    await delay(200);
    const saved = localStorage.getItem('moksha-patam-game');
    return saved ? JSON.parse(saved) : null;
  },

  async clearGameState() {
    await delay(100);
    localStorage.removeItem('moksha-patam-game');
    return { success: true };
  },

rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  },

  calculateNewPosition(currentPosition, diceValue) {
    const newPosition = currentPosition + diceValue;
    return newPosition > 100 ? currentPosition : newPosition;
  },

  checkSpecialSquare(position) {
    const square = mockBoardData.squares.find(s => s.number === position);
    return square && square.type !== 'normal' ? square : null;
  },

  async makeComputerMove(player, difficulty = 'intermediate', gameState) {
    await delay(500); // Thinking time
    
    const diceValue = this.rollDice();
    const strategies = this.getComputerStrategies();
    const strategy = strategies[difficulty] || strategies.intermediate;
    
    // Computer makes strategic decision based on difficulty
    const decision = strategy.makeDecision(player, diceValue, gameState);
    
    return {
      diceValue,
      strategy: decision.reasoning,
      confidence: decision.confidence
    };
  },

  getComputerStrategies() {
    return {
      basic: {
        makeDecision: (player, diceValue, gameState) => {
          // Basic: Random moves with minimal strategy
          return {
            reasoning: "Playing casually",
            confidence: 0.3
          };
        }
      },
      
      intermediate: {
        makeDecision: (player, diceValue, gameState) => {
          const currentPos = player.position;
          const newPos = Math.min(currentPos + diceValue, 100);
          
          // Check for snakes and ladders
          const specialSquare = this.checkSpecialSquare(newPos);
          let reasoning = "Standard move";
          let confidence = 0.6;
          
          if (specialSquare) {
            if (specialSquare.type === 'ladder') {
              reasoning = "Aiming for a ladder!";
              confidence = 0.9;
            } else if (specialSquare.type === 'snake') {
              reasoning = "Hope to avoid the snake...";
              confidence = 0.3;
            }
          }
          
          // Consider proximity to victory
          if (newPos >= 95) {
            reasoning = "So close to victory!";
            confidence = 0.95;
          }
          
          return { reasoning, confidence };
        }
      },
      
      advanced: {
        makeDecision: (player, diceValue, gameState) => {
          const currentPos = player.position;
          const newPos = Math.min(currentPos + diceValue, 100);
          
          // Advanced strategy: Analyze risk vs reward
          const riskAssessment = this.analyzeRisk(currentPos, diceValue);
          const ladderOpportunities = this.findNearbyLadders(currentPos);
          const snakeThreats = this.findNearbySnakes(currentPos);
          
          let reasoning = "Calculated strategic move";
          let confidence = 0.8;
          
          if (riskAssessment.isHighRisk) {
            reasoning = "Taking a calculated risk";
            confidence = 0.4;
          } else if (ladderOpportunities.length > 0) {
            reasoning = "Positioning for ladder advantage";
            confidence = 0.9;
          } else if (snakeThreats.length > 0) {
            reasoning = "Avoiding snake threats";
            confidence = 0.7;
          }
          
          return { reasoning, confidence };
        }
      }
    };
  },

  analyzeRisk(position, diceValue) {
    const newPosition = Math.min(position + diceValue, 100);
    const snakes = mockBoardData.squares.filter(s => s.type === 'snake');
    const nearbySnakes = snakes.filter(s => 
      s.number >= newPosition && s.number <= newPosition + 6
    );
    
    return {
      isHighRisk: nearbySnakes.length > 1,
      riskLevel: nearbySnakes.length,
      threats: nearbySnakes
    };
  },

  findNearbyLadders(position) {
    const ladders = mockBoardData.squares.filter(s => s.type === 'ladder');
    return ladders.filter(l => 
      l.number >= position && l.number <= position + 6
    );
  },

  findNearbySnakes(position) {
    const snakes = mockBoardData.squares.filter(s => s.type === 'snake');
    return snakes.filter(s => 
      s.number >= position && s.number <= position + 6
    );
  }
};