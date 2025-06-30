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
  }
};