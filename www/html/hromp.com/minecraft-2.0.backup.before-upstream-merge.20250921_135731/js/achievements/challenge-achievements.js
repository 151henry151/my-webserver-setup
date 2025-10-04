// Challenge Achievements Configuration
// This file contains difficult gameplay challenges and restrictions

const CHALLENGE_ACHIEVEMENTS = {
    // Challenge achievements
    bare_hands: {
        id: 'bare_hands',
        name: 'Bare Hands',
        description: 'Reach 10,000 blocks without using any tools',
        reward: 5000,
        category: 'challenge',
        type: 'per_game',
    },
    wooden_only: {
        id: 'wooden_only',
        name: 'Wooden Warrior',
        description: 'Reach 10,000 blocks using only wooden pickaxes',
        reward: 250,
        category: 'challenge',
        type: 'per_game',
    },
    stone_only: {
        id: 'stone_only',
        name: 'Stone Specialist',
        description: 'Reach 50,000 blocks using only stone pickaxes',
        reward: 1000,
        category: 'challenge',
        type: 'per_game',
    },
    iron_only: {
        id: 'iron_only',
        name: 'Iron Icon',
        description: 'Reach 250,000 blocks using only iron pickaxes',
        reward: 5000,
        category: 'challenge',
        type: 'per_game',
    },
    diamond_only: {
        id: 'diamond_only',
        name: 'Diamond Devotee',
        description: 'Reach 1,000,000 blocks using only diamond pickaxes',
        reward: 25000,
        category: 'challenge',
        type: 'per_game',
    },
    netherite_only: {
        id: 'netherite_only',
        name: 'Netherite Noble',
        description: 'Reach 5,000,000 blocks using only netherite pickaxes',
        reward: 100000,
        category: 'challenge',
        type: 'per_game',
    },

    // Conflicting Achievements (mutually exclusive)
    bare_hands_master: {
        id: 'bare_hands_master',
        name: 'Bare Hands Master',
        description: 'Reach 100,000 blocks without using any tools',
        reward: 50000,
        category: 'challenge',
        type: 'per_game',
        conflicts: ['wooden_only_master', 'stone_only_master', 'iron_only_master', 'diamond_only_master', 'netherite_only_master']
    },
    wooden_only_master: {
        id: 'wooden_only_master',
        name: 'Wooden Only Master',
        description: 'Reach 100,000 blocks using only bare hands and wooden pickaxes',
        reward: 1000,
        category: 'challenge',
        type: 'per_game',
        conflicts: ['bare_hands_master', 'stone_only_master', 'iron_only_master', 'diamond_only_master', 'netherite_only_master']
    },
    stone_only_master: {
        id: 'stone_only_master',
        name: 'Stone Only Master',
        description: 'Reach 500,000 blocks using only bare hands and stone pickaxes',
        reward: 5000,
        category: 'challenge',
        type: 'per_game',
        conflicts: ['bare_hands_master', 'wooden_only_master', 'iron_only_master', 'diamond_only_master', 'netherite_only_master']
    },

    // Special challenge achievements
    minimalist: {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Reach 100,000 blocks with only 5 different tools',
        reward: 750,
        category: 'special_challenge',
        type: 'per_game',
    },
    tool_hoarder: {
        id: 'tool_hoarder',
        name: 'Tool Hoarder',
        description: 'Own at least 1 of every tool type',
        reward: 1000,
        category: 'special_challenge',
        type: 'per_game',
    },
    click_efficiency: {
        id: 'click_efficiency',
        name: 'Click Efficiency',
        description: 'Generate 1000 blocks per click',
        reward: 2000,
        category: 'special_challenge',
        type: 'per_game',
    },
    passive_efficiency: {
        id: 'passive_efficiency',
        name: 'Passive Efficiency',
        description: 'Generate 1,000,000 blocks per second',
        reward: 5000,
        category: 'special_challenge',
        type: 'per_game',
    },

    // Advanced Challenge Achievements
    no_upgrade_challenge: {
        id: 'no_upgrade_challenge',
        name: 'No Upgrade Challenge',
        description: 'Reach 1,000,000 blocks without buying any upgrades',
        reward: 5000,
        category: 'advanced_challenge',
        type: 'per_game',
    },
    click_only_challenge: {
        id: 'click_only_challenge',
        name: 'Click Only Challenge',
        description: 'Click 100,000 times (no passive income allowed)',
        reward: 2500,
        category: 'advanced_challenge',
        type: 'per_game',
    },
    passive_only_challenge: {
        id: 'passive_only_challenge',
        name: 'Passive Only Challenge',
        description: 'Generate 10,000 blocks per second without any click upgrades',
        reward: 3000,
        category: 'advanced_challenge',
        type: 'per_game',
    },
    balanced_challenge: {
        id: 'balanced_challenge',
        name: 'Balanced Challenge',
        description: 'Have exactly equal blocks per click and blocks per second for 1 hour',
        reward: 4000,
        category: 'advanced_challenge',
        type: 'per_game',
    },

    // Speed and timing achievements
    speed_clicker: {
        id: 'speed_clicker',
        name: 'Speed Clicker',
        description: 'Click 100 times in under 10 seconds',
        reward: 5000,
        category: 'speed_timing',
        type: 'per_game',
    },
    lightning_clicker: {
        id: 'lightning_clicker',
        name: 'Lightning Clicker',
        description: 'Click 500 times in under 30 seconds',
        reward: 250,
        category: 'speed_timing',
        type: 'per_game',
    },
    rapid_fire: {
        id: 'rapid_fire',
        name: 'Rapid Fire',
        description: 'Click 1000 times in under 60 seconds',
        reward: 1000,
        category: 'speed_timing',
        type: 'per_game',
    },

    // Speed Challenge Achievements
    speed_clicker_master: {
        id: 'speed_clicker_master',
        name: 'Speed Clicker Master',
        description: 'Click 100 times in under 5 seconds',
        reward: 50000,
        category: 'speed_challenge',
        type: 'per_game',
    },
    ultra_speed_clicker: {
        id: 'ultra_speed_clicker',
        name: 'Ultra Speed Clicker',
        description: 'Click 500 times in under 15 seconds',
        reward: 2000,
        category: 'speed_challenge',
        type: 'per_game',
    },
    click_god_speed: {
        id: 'click_god_speed',
        name: 'Click God Speed',
        description: 'Click 1000 times in under 30 seconds',
        reward: 10000,
        category: 'speed_challenge',
        type: 'per_game',
    },

    // Timing and Rhythm Achievements
    rhythm_miner: {
        id: 'rhythm_miner',
        name: 'Rhythm Miner',
        description: 'Click exactly once per second for 60 seconds straight',
        reward: 750,
        category: 'timing',
        type: 'per_game',
    },
    perfect_timing: {
        id: 'perfect_timing',
        name: 'Perfect Timing',
        description: 'Click exactly 60 times in exactly 60 seconds',
        reward: 1000,
        category: 'timing',
        type: 'per_game',
    },
    slow_and_steady: {
        id: 'slow_and_steady',
        name: 'Slow and Steady',
        description: 'Click exactly once every 2 seconds for 5 minutes',
        reward: 1500,
        category: 'timing',
        type: 'per_game',
    },

    // Resource Management Achievements
    frugal_miner: {
        id: 'frugal_miner',
        name: 'Frugal Miner',
        description: 'Reach 100,000 blocks without spending any on upgrades',
        reward: 50000,
        category: 'resource_management',
        type: 'per_game',
    },
    hoarder: {
        id: 'hoarder',
        name: 'Hoarder',
        description: 'Have 1,000,000 blocks without buying any upgrades',
        reward: 1500,
        category: 'resource_management',
        type: 'per_game',
    },
    spendthrift: {
        id: 'spendthrift',
        name: 'Spendthrift',
        description: 'Spend 1,000,000 blocks in a single session',
        reward: 1000,
        category: 'resource_management',
        type: 'per_game',
    },
    big_spender: {
        id: 'big_spender',
        name: 'Big Spender',
        description: 'Spend 100,000,000 blocks in a single session',
        reward: 10000,
        category: 'resource_management',
        type: 'per_game',
    }
};

// Export for use in other files
export { CHALLENGE_ACHIEVEMENTS }; 