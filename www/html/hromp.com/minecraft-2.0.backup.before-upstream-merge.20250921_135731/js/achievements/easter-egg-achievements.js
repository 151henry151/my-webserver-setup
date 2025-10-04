// Easter Egg and Hidden Achievements Configuration
// This file contains secret achievements and fun references

const EASTER_EGG_ACHIEVEMENTS = {
    // Easter egg achievements
    konami_code: {
        id: 'konami_code',
        name: 'Konami Code',
        description: 'Enter the Konami code while playing (↑↑↓↓←→←→BA)',
        reward: 1337,
        category: 'easter_egg',
        type: 'per_game',
        hidden: true
    },
    secret_clicker: {
        id: 'secret_clicker',
        name: 'Secret Clicker',
        description: 'Click exactly 42 times (the answer to life, the universe, and everything)',
        reward: 42,
        category: 'easter_egg',
        type: 'per_game',
    },
    matrix_fan: {
        id: 'matrix_fan',
        name: 'Matrix Fan',
        description: 'Generate exactly 101 blocks per second (binary for 5, like the Matrix)',
        reward: 10101,
        category: 'easter_egg',
        type: 'per_game',
    },
    leet_hacker: {
        id: 'leet_hacker',
        name: 'Leet Hacker',
        description: 'Generate exactly 1337 blocks per second',
        reward: 133700,
        category: 'easter_egg',
        type: 'per_game',
    },
    boomer: {
        id: 'boomer',
        name: 'Boomer',
        description: 'Click exactly 1969 times (year of the moon landing)',
        reward: 196900,
        category: 'easter_egg',
        type: 'per_game',
    },
    y2k: {
        id: 'y2k',
        name: 'Y2K',
        description: 'Click exactly 2000 times',
        reward: 20000,
        category: 'easter_egg',
        type: 'per_game',
    },
    covid_year: {
        id: 'covid_year',
        name: 'COVID Year',
        description: 'Click exactly 2020 times',
        reward: 20200,
        category: 'easter_egg',
        type: 'per_game',
    },

    // Hidden achievements
    inspector: {
        id: 'inspector',
        name: 'Inspector',
        description: 'Open the browser console while playing',
        reward: 5000,
        category: 'hidden',
        type: 'per_game',
        hidden: true
    },
    copy_paste: {
        id: 'copy_paste',
        name: 'Copy Paste',
        description: 'Use copy and paste while playing',
        reward: 3000,
        category: 'hidden',
        type: 'per_game',
        hidden: true
    },
    tab_switcher: {
        id: 'tab_switcher',
        name: 'Tab Switcher',
        description: 'Switch tabs while playing',
        reward: 2000,
        category: 'hidden',
        type: 'per_game',
        hidden: true
    },
    resize_master: {
        id: 'resize_master',
        name: 'Resize Master',
        description: 'Resize the browser window while playing',
        reward: 3000,
        category: 'hidden',
        type: 'per_game',
        hidden: true
    },

    // Browser and system achievements (per_account - permanent, no rewards)
    mobile_player: {
        id: 'mobile_player',
        name: 'Mobile Player',
        description: 'Play on a mobile device',
        reward: 0,
        category: 'browser_system',
        type: 'per_account'
    },
    desktop_player: {
        id: 'desktop_player',
        name: 'Desktop Player',
        description: 'Play on a desktop computer',
        reward: 0,
        category: 'browser_system',
        type: 'per_account'
    },
    chrome_user: {
        id: 'chrome_user',
        name: 'Chrome User',
        description: 'Play using Google Chrome',
        reward: 0,
        category: 'browser_system',
        type: 'per_account'
    },
    firefox_user: {
        id: 'firefox_user',
        name: 'Firefox User',
        description: 'Play using Mozilla Firefox',
        reward: 0,
        category: 'browser_system',
        type: 'per_account'
    },
    safari_user: {
        id: 'safari_user',
        name: 'Safari User',
        description: 'Play using Safari',
        reward: 0,
        category: 'browser_system',
        type: 'per_account'
    },

    // Ultra Creative Achievements
    minecraft_reference: {
        id: 'minecraft_reference',
        name: 'Minecraft Reference',
        description: 'Have exactly 64 blocks (stack size in Minecraft)',
        reward: 64,
        category: 'minecraft_themed',
        type: 'per_game',
    },
    diamond_blocks: {
        id: 'diamond_blocks',
        name: 'Diamond Blocks',
        description: 'Have exactly 9 diamonds worth of blocks (9 * 64 = 576)',
        reward: 57600,
        category: 'minecraft_themed',
        type: 'per_game',
    },
    nether_portal: {
        id: 'nether_portal',
        name: 'Nether Portal',
        description: 'Have exactly 10 obsidian blocks worth (10 * 64 = 640)',
        reward: 64000,
        category: 'minecraft_themed',
        type: 'per_game',
    },
    ender_pearl: {
        id: 'ender_pearl',
        name: 'Ender Pearl',
        description: 'Have exactly 8 ender pearls worth of blocks (8 * 16 = 128)',
        reward: 12800,
        category: 'minecraft_themed',
        type: 'per_game',
    },

    // Keyboard and Input Achievements
    keyboard_warrior: {
        id: 'keyboard_warrior',
        name: 'Keyboard Warrior',
        description: 'Use keyboard shortcuts while playing (Ctrl+C, Ctrl+V, etc.)',
        reward: 5000,
        category: 'input_methods',
        type: 'per_game',
    },
    mouse_master: {
        id: 'mouse_master',
        name: 'Mouse Master',
        description: 'Click with different mouse buttons (left, right, middle)',
        reward: 3000,
        category: 'input_methods',
        type: 'per_game',
    },
    touch_screen: {
        id: 'touch_screen',
        name: 'Touch Screen',
        description: 'Play using touch input on a touchscreen device',
        reward: 4000,
        category: 'input_methods',
        type: 'per_game',
    },

    // Performance and Technical Achievements
    fps_master: {
        id: 'fps_master',
        name: 'FPS Master',
        description: 'Maintain 60+ FPS while playing for 10 minutes',
        reward: 15000,
        category: 'technical',
        type: 'per_game',
    },
    memory_efficient: {
        id: 'memory_efficient',
        name: 'Memory Efficient',
        description: 'Play for 1 hour without the page using more than 100MB RAM',
        reward: 25000,
        category: 'technical',
        type: 'per_game',
    },
    network_warrior: {
        id: 'network_warrior',
        name: 'Network Warrior',
        description: 'Play while having a slow internet connection (< 1Mbps)',
        reward: 10000,
        category: 'technical',
        type: 'per_game',
    },

    // Social and Multiplayer Achievements
    share_master: {
        id: 'share_master',
        name: 'Share Master',
        description: 'Share your game progress on social media',
        reward: 5000,
        category: 'social',
        type: 'per_game',
    },
    screenshot_artist: {
        id: 'screenshot_artist',
        name: 'Screenshot Artist',
        description: 'Take a screenshot while playing',
        reward: 3000,
        category: 'social',
        type: 'per_game',
    },
    streamer: {
        id: 'streamer',
        name: 'Streamer',
        description: 'Play while screen recording or streaming',
        reward: 10000,
        category: 'social',
        type: 'per_game',
    },

    // Environmental Achievements
    dark_mode: {
        id: 'dark_mode',
        name: 'Dark Mode',
        description: 'Play in a dark room with minimal lighting',
        reward: 5000,
        category: 'environment',
        type: 'per_game',
    },
    outdoor_gamer: {
        id: 'outdoor_gamer',
        name: 'Outdoor Gamer',
        description: 'Play outside or near a window with natural light',
        reward: 3000,
        category: 'environment',
        type: 'per_game',
    },
    coffee_gamer: {
        id: 'coffee_gamer',
        name: 'Coffee Gamer',
        description: 'Play while drinking coffee or tea',
        reward: 2000,
        category: 'environment',
        type: 'per_game',
    },

    // Psychological Achievements
    patience_master: {
        id: 'patience_master',
        name: 'Patience Master',
        description: 'Wait 5 minutes without clicking anything',
        reward: 50000,
        category: 'psychological',
        type: 'per_game',
    },
    focus_master: {
        id: 'focus_master',
        name: 'Focus Master',
        description: 'Play for 30 minutes without switching tabs or windows',
        reward: 100,
        category: 'psychological',
        type: 'per_game',
    },
    zen_miner: {
        id: 'zen_miner',
        name: 'Zen Miner',
        description: 'Click exactly once every 3 seconds for 10 minutes',
        reward: 75000,
        category: 'psychological',
        type: 'per_game',
    },

    // Gaming Culture References
    speedrun_master: {
        id: 'speedrun_master',
        name: 'Speedrun Master',
        description: 'Reach 1,000,000 blocks in under 10 minutes',
        reward: 1000000,
        category: 'gaming_culture',
        type: 'per_game',
    },
    completionist: {
        id: 'completionist',
        name: 'Completionist',
        description: 'Own at least 10 of every tool type',
        reward: 500000,
        category: 'gaming_culture',
        type: 'per_game',
    },
    min_maxer: {
        id: 'min_maxer',
        name: 'Min-Maxer',
        description: 'Optimize your build for maximum efficiency',
        reward: 200000,
        category: 'gaming_culture',
        type: 'per_game',
    },
    casual_gamer: {
        id: 'casual_gamer',
        name: 'Casual Gamer',
        description: 'Play for exactly 30 minutes and then stop',
        reward: 15000,
        category: 'gaming_culture',
        type: 'per_game',
    },

    // Internet and Meme Culture
    doge_miner: {
        id: 'doge_miner',
        name: 'Doge Miner',
        description: 'Have exactly 1337 blocks (much wow, very leet)',
        reward: 133700,
        category: 'meme_culture',
        type: 'per_game',
    },
    pepe_miner: {
        id: 'pepe_miner',
        name: 'Pepe Miner',
        description: 'Have exactly 420 blocks (rare pepe)',
        reward: 42000,
        category: 'meme_culture',
        type: 'per_game',
    },
    wojak_miner: {
        id: 'wojak_miner',
        name: 'Wojak Miner',
        description: 'Play for 4 hours straight (feels bad man)',
        reward: 100000,
        category: 'meme_culture',
        type: 'per_game',
    }
};

// Export for use in other files
export { EASTER_EGG_ACHIEVEMENTS }; 