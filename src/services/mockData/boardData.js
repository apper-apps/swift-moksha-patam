export const mockBoardData = {
  squares: [
    // Snakes - Representing challenges and setbacks
    { number: 16, type: 'snake', destination: 6, theme: 'anger', description: 'Anger leads to downfall' },
    { number: 47, type: 'snake', destination: 26, theme: 'greed', description: 'Greed causes regression' },
    { number: 49, type: 'snake', destination: 11, theme: 'pride', description: 'Pride before the fall' },
    { number: 56, type: 'snake', destination: 53, theme: 'jealousy', description: 'Jealousy hinders progress' },
    { number: 62, type: 'snake', destination: 19, theme: 'lust', description: 'Lust leads astray' },
    { number: 64, type: 'snake', destination: 60, theme: 'vanity', description: 'Vanity is a trap' },
    { number: 87, type: 'snake', destination: 24, theme: 'violence', description: 'Violence destroys progress' },
    { number: 93, type: 'snake', destination: 73, theme: 'ignorance', description: 'Ignorance holds back' },
    { number: 95, type: 'snake', destination: 75, theme: 'ego', description: 'Ego prevents growth' },
    { number: 98, type: 'snake', destination: 78, theme: 'attachment', description: 'Attachment binds us' },

    // Ladders - Representing virtues and progress
    { number: 1, type: 'ladder', destination: 38, theme: 'faith', description: 'Faith lifts the spirit' },
    { number: 4, type: 'ladder', destination: 14, theme: 'generosity', description: 'Generosity elevates' },
    { number: 9, type: 'ladder', destination: 21, theme: 'knowledge', description: 'Knowledge empowers' },
    { number: 21, type: 'ladder', destination: 42, theme: 'compassion', description: 'Compassion uplifts' },
    { number: 28, type: 'ladder', destination: 84, theme: 'devotion', description: 'Devotion transcends' },
    { number: 36, type: 'ladder', destination: 44, theme: 'humility', description: 'Humility brings wisdom' },
    { number: 51, type: 'ladder', destination: 67, theme: 'truthfulness', description: 'Truth sets free' },
    { number: 71, type: 'ladder', destination: 91, theme: 'purity', description: 'Purity of heart' },
    { number: 80, type: 'ladder', destination: 100, theme: 'enlightenment', description: 'Enlightenment awaits' },
  ],
  
  playerColors: [
    '#E85D04', // Saffron - Human player
    '#06A77D', // Emerald - Computer Easy
    '#005377', // Deep Blue - Computer Medium  
    '#D00000', // Crimson - Computer Hard
  ],

  // Enhanced visual themes for different square ranges
  squareThemes: {
    enlightenment: { range: [90, 100], color: 'purple', icon: 'Crown' },
    wisdom: { range: [80, 89], color: 'blue', icon: 'BookOpen' },
    growth: { range: [70, 79], color: 'teal', icon: 'TrendingUp' },
    prosperity: { range: [60, 69], color: 'green', icon: 'Coins' },
    balance: { range: [50, 59], color: 'yellow', icon: 'Scale' },
    courage: { range: [40, 49], color: 'orange', icon: 'Shield' },
    love: { range: [30, 39], color: 'pink', icon: 'Heart' },
    learning: { range: [20, 29], color: 'violet', icon: 'BookOpen' },
    hope: { range: [10, 19], color: 'indigo', icon: 'Sunrise' },
    beginning: { range: [1, 9], color: 'gray', icon: 'Seedling' }
  },

  // Special milestone squares
  milestoneSquares: [
    { number: 10, significance: 'First Milestone', reward: 'Confidence boost' },
    { number: 25, significance: 'Quarter Journey', reward: 'Perseverance' },
    { number: 50, significance: 'Halfway Point', reward: 'Balanced perspective' },
    { number: 75, significance: 'Three Quarters', reward: 'Wisdom gained' },
    { number: 90, significance: 'Almost There', reward: 'Final push' },
    { number: 100, significance: 'Moksha Achieved', reward: 'Liberation' }
  ],

  snakePositions: [
    { head: 16, tail: 6, path: 'M16,6 Q11,1 6,6', intensity: 'moderate' },
    { head: 47, tail: 26, path: 'M47,26 Q36,16 26,26', intensity: 'high' },
    { head: 49, tail: 11, path: 'M49,11 Q30,1 11,11', intensity: 'severe' },
    { head: 56, tail: 53, path: 'M56,53 Q54,51 53,53', intensity: 'mild' },
    { head: 62, tail: 19, path: 'M62,19 Q40,10 19,19', intensity: 'severe' },
    { head: 64, tail: 60, path: 'M64,60 Q62,58 60,60', intensity: 'mild' },
    { head: 87, tail: 24, path: 'M87,24 Q55,15 24,24', intensity: 'devastating' },
    { head: 93, tail: 73, path: 'M93,73 Q83,68 73,73', intensity: 'high' },
    { head: 95, tail: 75, path: 'M95,75 Q85,70 75,75', intensity: 'high' },
    { head: 98, tail: 78, path: 'M98,78 Q88,73 78,78', intensity: 'devastating' },
  ],

  ladderPositions: [
    { bottom: 1, top: 38, significance: 'Great leap of faith' },
    { bottom: 4, top: 14, significance: 'Kindness rewarded' },
    { bottom: 9, top: 21, significance: 'Learning accelerated' },
    { bottom: 21, top: 42, significance: 'Compassion elevated' },
    { bottom: 28, top: 84, significance: 'Devotion transcends' },
    { bottom: 36, top: 44, significance: 'Humility lifts' },
    { bottom: 51, top: 67, significance: 'Truth prevails' },
    { bottom: 71, top: 91, significance: 'Purity ascends' },
    { bottom: 80, top: 100, significance: 'Final enlightenment' },
  ]
};