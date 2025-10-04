// Mathematical Achievements Configuration
// This file contains achievements related to mathematical patterns and sequences

const MATHEMATICAL_ACHIEVEMENTS = {
    // Obscure achievements
    prime_clicker: {
        id: 'prime_clicker',
        name: 'Prime Clicker',
        description: 'Click exactly 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 times',
        reward: 100,
        category: 'obscure',
        type: 'per_game',
    },
    fibonacci_fan: {
        id: 'fibonacci_fan',
        name: 'Fibonacci Fan',
        description: 'Have exactly 1 wooden pickaxe, 1 stone pickaxe, 2 iron pickaxes, 3 diamond pickaxes, 5 netherite pickaxes, 8 mining robots, 13 automated mines, 21 quantum miners, 34 pickaxe armies, 55 diamond legions, 89 netherite swarms, 144 robot legions',
        reward: 98765,
        category: 'obscure',
        type: 'per_game',
    },
    binary_clicker: {
        id: 'binary_clicker',
        name: 'Binary Clicker',
        description: 'Click exactly 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 times',
        reward: 2048,
        category: 'obscure',
        type: 'per_game',
    },
    palindrome_blocks: {
        id: 'palindrome_blocks',
        name: 'Palindrome Blocks',
        description: 'Have exactly 11, 22, 33, 44, 55, 66, 77, 88, 99, 111, 121, 131, 141, 151, 161, 171, 181, 191, 202, 212 blocks',
        reward: 12321,
        category: 'obscure',
        type: 'per_game',
    },
    pi_blocks: {
        id: 'pi_blocks',
        name: 'Pi Blocks',
        description: 'Have exactly 3, 31, 314, 3141, 31415, 314159 blocks',
        reward: 314159,
        category: 'obscure',
        type: 'per_game',
    },
    e_blocks: {
        id: 'e_blocks',
        name: 'E Blocks',
        description: 'Have exactly 2, 27, 271, 2718, 27182, 271828 blocks',
        reward: 271828,
        category: 'obscure',
        type: 'per_game',
    },
    golden_ratio: {
        id: 'golden_ratio',
        name: 'Golden Ratio',
        description: 'Have exactly 1 wooden pickaxe, 1 stone pickaxe, 2 iron pickaxes, 3 diamond pickaxes, 5 netherite pickaxes, 8 mining robots, 13 automated mines, 21 quantum miners, 34 pickaxe armies, 55 diamond legions, 89 netherite swarms, 144 robot legions, 233 diamond armies, 377 netherite armies, 610 robot armies, 987 quantum armies, 1597 pickaxe legions, 2584 diamond swarms, 4181 netherite legions, 6765 robot swarms',
        reward: 10946,
        category: 'obscure',
        type: 'per_game',
    },
    square_clicker: {
        id: 'square_clicker',
        name: 'Square Clicker',
        description: 'Click exactly 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400 times',
        reward: 441,
        category: 'obscure',
        type: 'per_game',
    },
    cube_clicker: {
        id: 'cube_clicker',
        name: 'Cube Clicker',
        description: 'Click exactly 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000 times',
        reward: 1331,
        category: 'obscure',
        type: 'per_game',
    },

    // Mathematical sequence achievements (Tool-based)
    triangular_numbers: {
        id: 'triangular_numbers',
        name: 'Triangular Numbers',
        description: 'Have exactly 1 wooden pickaxe, 3 stone pickaxes, 6 iron pickaxes, 10 diamond pickaxes, 15 netherite pickaxes, 21 mining robots, 28 automated mines, 36 quantum miners, 45 pickaxe armies, 55 diamond legions, 66 netherite swarms, 78 robot legions',
        reward: 0,
        category: 'mathematical',
        type: 'per_game',
    },
    square_numbers: {
        id: 'square_numbers',
        name: 'Square Numbers',
        description: 'Have exactly 1 wooden pickaxe, 4 stone pickaxes, 9 iron pickaxes, 16 diamond pickaxes, 25 netherite pickaxes, 36 mining robots, 49 automated mines, 64 quantum miners, 81 pickaxe armies, 100 diamond legions, 121 netherite swarms, 144 robot legions',
        reward: 0,
        category: 'mathematical',
        type: 'per_game',
    },
    cube_numbers: {
        id: 'cube_numbers',
        name: 'Cube Numbers',
        description: 'Have exactly 1 wooden pickaxe, 8 stone pickaxes, 27 iron pickaxes, 64 diamond pickaxes, 125 netherite pickaxes, 216 mining robots, 343 automated mines, 512 quantum miners, 729 pickaxe armies, 1000 diamond legions',
        reward: 0,
        category: 'mathematical',
        type: 'per_game',
    },

    // Mathematical Mastery Achievements
    pi_master: {
        id: 'pi_master',
        name: 'Pi Master',
        description: 'Have exactly 3.14159 blocks (314159)',
        reward: 0,
        category: 'mathematical_mastery',
        type: 'per_game',
    },
    e_master: {
        id: 'e_master',
        name: 'E Master',
        description: 'Have exactly 2.71828 blocks (271828)',
        reward: 0,
        category: 'mathematical_mastery',
        type: 'per_game',
    },
    golden_ratio_master: {
        id: 'golden_ratio_master',
        name: 'Golden Ratio Master',
        description: 'Have exactly 1.61803 blocks (161803)',
        reward: 0,
        category: 'mathematical_mastery',
        type: 'per_game',
    },
    fibonacci_sequence: {
        id: 'fibonacci_sequence',
        name: 'Fibonacci Sequence',
        description: 'Have exactly 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 blocks in sequence',
        reward: 0,
        category: 'mathematical_mastery',
        type: 'per_game',
    },

    // Mathematical and Pattern Achievements
    fibonacci_master: {
        id: 'fibonacci_master',
        name: 'Fibonacci Master',
        description: 'Have exactly 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 blocks at different times',
        reward: 0,
        category: 'mathematical_patterns',
        type: 'per_game',
    },
    prime_clicker_master: {
        id: 'prime_clicker_master',
        name: 'Prime Clicker Master',
        description: 'Click exactly 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 times',
        reward: 0,
        category: 'mathematical_patterns',
        type: 'per_game',
    },
    square_master: {
        id: 'square_master',
        name: 'Square Master',
        description: 'Have exactly 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225 blocks',
        reward: 0,
        category: 'mathematical_patterns',
        type: 'per_game',
    },
    cube_master: {
        id: 'cube_master',
        name: 'Cube Master',
        description: 'Have exactly 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000 blocks',
        reward: 0,
        category: 'mathematical_patterns',
        type: 'per_game',
    },

    // Pattern Recognition Achievements
    palindrome_master: {
        id: 'palindrome_master',
        name: 'Palindrome Master',
        description: 'Have exactly 112233445566778899 blocks',
        reward: 500,
        category: 'pattern_recognition',
        type: 'per_game',
    },
    sequential_master: {
        id: 'sequential_master',
        name: 'Sequential Master',
        description: 'Have exactly 1234567890 blocks',
        reward: 500,
        category: 'pattern_recognition',
        type: 'per_game',
    },
    repeating_pattern: {
        id: 'repeating_pattern',
        name: 'Repeating Pattern',
        description: 'Have exactly 123, 1234, 12345, 123456, 1234567, 12345678, 123456789 blocks',
        reward: 0,
        category: 'pattern_recognition',
        type: 'per_game',
    },

    // Pattern Achievements
    palindrome_clicks: {
        id: 'palindrome_clicks',
        name: 'Palindrome Clicks',
        description: 'Click exactly 11, 22, 33, 44, 55, 66, 77, 88, 99, 111, 121, 131, 141, 151, 161, 171, 181, 191, 202, 212 times',
        reward: 0,
        category: 'patterns',
        type: 'per_game',
    },
    sequential_blocks: {
        id: 'sequential_blocks',
        name: 'Sequential Blocks',
        description: 'Generate exactly 123, 234, 345, 456, 567, 678, 789, 890, 901, 012 blocks per second',
        reward: 0,
        category: 'patterns',
        type: 'per_game',
    }
};

// Export for use in other files
export { MATHEMATICAL_ACHIEVEMENTS }; 