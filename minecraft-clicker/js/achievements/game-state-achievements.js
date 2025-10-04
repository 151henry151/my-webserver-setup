// Game State Achievements Configuration
// This file contains achievements related to game progress and state

const GAME_STATE_ACHIEVEMENTS = {
    // Game state achievements
    zero_to_hero: {
        id: 'zero_to_hero',
        name: 'Zero to Hero',
        description: 'Start with 0 blocks and reach 1,000,000 blocks',
        reward: 50000,
        category: 'game_state',
        type: 'per_game',
    },
    persistent_player: {
        id: 'persistent_player',
        name: 'Persistent Player',
        description: 'Play for more than 24 hours total',
        reward: 100000,
        category: 'game_state',
        type: 'per_game',
    },
    quick_start: {
        id: 'quick_start',
        name: 'Quick Start',
        description: 'Reach 10,000 blocks in under 5 minutes',
        reward: 25000,
        category: 'game_state',
        type: 'per_game',
    },
    slow_and_steady: {
        id: 'slow_and_steady',
        name: 'Slow and Steady',
        description: 'Play for more than 1 hour before buying your first tool',
        reward: 15000,
        category: 'game_state',
        type: 'per_game',
    }
};

// Export for use in other files
export { GAME_STATE_ACHIEVEMENTS }; 