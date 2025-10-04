// Click Achievements Configuration
// This file contains achievements related to clicking and click efficiency

const CLICK_ACHIEVEMENTS = {
    // Click achievements
    click_master: {
        id: 'click_master',
        name: 'Click Master',
        description: 'Click 1,000 times',
        reward: 1000,
        category: 'click',
        type: 'per_game',
    },
    click_legend: {
        id: 'click_legend',
        name: 'Click Legend',
        description: 'Click 10,000 times',
        reward: 10000,
        category: 'click',
        type: 'per_game',
    },
    click_god: {
        id: 'click_god',
        name: 'Click God',
        description: 'Click 100,000 times',
        reward: 1000,
        category: 'click',
        type: 'per_game',
    },
    click_insanity: {
        id: 'click_insanity',
        name: 'Click Insanity',
        description: 'Click 1,000,000 times',
        reward: 10000,
        category: 'click',
        type: 'per_game',
    },

    // Efficiency achievements
    efficient_miner: {
        id: 'efficient_miner',
        name: 'Efficient Miner',
        description: 'Generate 100 blocks per click',
        reward: 500,
        category: 'efficiency',
        type: 'per_game',
    },
    super_efficient: {
        id: 'super_efficient',
        name: 'Super Efficient',
        description: 'Generate 500 blocks per click',
        reward: 2500,
        category: 'efficiency',
        type: 'per_game',
    },
    ultra_efficient: {
        id: 'ultra_efficient',
        name: 'Ultra Efficient',
        description: 'Generate 1,000 blocks per click',
        reward: 10000,
        category: 'efficiency',
        type: 'per_game',
    },

    // Speed achievements
    speed_demon: {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Generate 10,000 blocks per second',
        reward: 500,
        category: 'speed',
        type: 'per_game',
    },
    speed_legend: {
        id: 'speed_legend',
        name: 'Speed Legend',
        description: 'Generate 100,000 blocks per second',
        reward: 5000,
        category: 'speed',
        type: 'per_game',
    },
    speed_god: {
        id: 'speed_god',
        name: 'Speed God',
        description: 'Generate 1,000,000 blocks per second',
        reward: 50000,
        category: 'speed',
        type: 'per_game',
    },

    // Efficiency and balance achievements
    perfect_balance: {
        id: 'perfect_balance',
        name: 'Perfect Balance',
        description: 'Have exactly equal blocks per click and blocks per second',
        reward: 500,
        category: 'efficiency_balance',
        type: 'per_game',
    },
    click_dominant: {
        id: 'click_dominant',
        name: 'Click Dominant',
        description: 'Have 10x more blocks per click than blocks per second',
        reward: 250,
        category: 'efficiency_balance',
        type: 'per_game',
    },
    passive_dominant: {
        id: 'passive_dominant',
        name: 'Passive Dominant',
        description: 'Have 10x more blocks per second than blocks per click',
        reward: 250,
        category: 'efficiency_balance',
        type: 'per_game',
    }
};

// Export for use in other files
export { CLICK_ACHIEVEMENTS }; 