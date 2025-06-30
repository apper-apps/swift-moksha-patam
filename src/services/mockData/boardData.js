export const mockBoardData = {
  squares: [
    // Snakes
    { number: 16, type: 'snake', destination: 6 },
    { number: 47, type: 'snake', destination: 26 },
    { number: 49, type: 'snake', destination: 11 },
    { number: 56, type: 'snake', destination: 53 },
    { number: 62, type: 'snake', destination: 19 },
    { number: 64, type: 'snake', destination: 60 },
    { number: 87, type: 'snake', destination: 24 },
    { number: 93, type: 'snake', destination: 73 },
    { number: 95, type: 'snake', destination: 75 },
    { number: 98, type: 'snake', destination: 78 },

    // Ladders
    { number: 1, type: 'ladder', destination: 38 },
    { number: 4, type: 'ladder', destination: 14 },
    { number: 9, type: 'ladder', destination: 21 },
    { number: 21, type: 'ladder', destination: 42 },
    { number: 28, type: 'ladder', destination: 84 },
    { number: 36, type: 'ladder', destination: 44 },
    { number: 51, type: 'ladder', destination: 67 },
    { number: 71, type: 'ladder', destination: 91 },
    { number: 80, type: 'ladder', destination: 100 },
  ],
  
  playerColors: [
    '#E85D04', // Saffron
    '#06A77D', // Emerald
    '#005377', // Deep Blue
    '#D00000', // Crimson
  ],

  snakePositions: [
    { head: 16, tail: 6, path: 'M16,6 Q11,1 6,6' },
    { head: 47, tail: 26, path: 'M47,26 Q36,16 26,26' },
    { head: 49, tail: 11, path: 'M49,11 Q30,1 11,11' },
    { head: 56, tail: 53, path: 'M56,53 Q54,51 53,53' },
    { head: 62, tail: 19, path: 'M62,19 Q40,10 19,19' },
    { head: 64, tail: 60, path: 'M64,60 Q62,58 60,60' },
    { head: 87, tail: 24, path: 'M87,24 Q55,15 24,24' },
    { head: 93, tail: 73, path: 'M93,73 Q83,68 73,73' },
    { head: 95, tail: 75, path: 'M95,75 Q85,70 75,75' },
    { head: 98, tail: 78, path: 'M98,78 Q88,73 78,78' },
  ],

  ladderPositions: [
    { bottom: 1, top: 38 },
    { bottom: 4, top: 14 },
    { bottom: 9, top: 21 },
    { bottom: 21, top: 42 },
    { bottom: 28, top: 84 },
    { bottom: 36, top: 44 },
    { bottom: 51, top: 67 },
    { bottom: 71, top: 91 },
    { bottom: 80, top: 100 },
  ]
};