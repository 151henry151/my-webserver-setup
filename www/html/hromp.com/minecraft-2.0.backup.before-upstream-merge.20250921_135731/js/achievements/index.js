// Achievements Index File
// This file combines all achievement configurations into one unified system

// Import all achievement modules
import { BASIC_ACHIEVEMENTS } from './basic-achievements.js';
import { ADVANCED_TOOL_ACHIEVEMENTS } from './advanced-tool-achievements.js';
import { CHALLENGE_ACHIEVEMENTS } from './challenge-achievements.js';
import { CLICK_ACHIEVEMENTS } from './click-achievements.js';
import { MATHEMATICAL_ACHIEVEMENTS } from './mathematical-achievements.js';
import { TIME_BASED_ACHIEVEMENTS } from './time-based-achievements.js';
import { EASTER_EGG_ACHIEVEMENTS } from './easter-egg-achievements.js';
import { FUN_ACHIEVEMENTS } from './fun-achievements.js';
import { GAME_STATE_ACHIEVEMENTS } from './game-state-achievements.js';

// Combine all achievements into one configuration
const ACHIEVEMENTS_CONFIG = {
    ...BASIC_ACHIEVEMENTS,
    ...ADVANCED_TOOL_ACHIEVEMENTS,
    ...CHALLENGE_ACHIEVEMENTS,
    ...CLICK_ACHIEVEMENTS,
    ...MATHEMATICAL_ACHIEVEMENTS,
    ...TIME_BASED_ACHIEVEMENTS,
    ...EASTER_EGG_ACHIEVEMENTS,
    ...FUN_ACHIEVEMENTS,
    ...GAME_STATE_ACHIEVEMENTS
};

// Helper functions for working with achievements
const AchievementsHelper = {
    // Get all achievements as an array
    getAllAchievements() {
        return Object.values(ACHIEVEMENTS_CONFIG);
    },

    // Get achievements by category
    getAchievementsByCategory(category) {
        return Object.values(ACHIEVEMENTS_CONFIG).filter(achievement => achievement.category === category);
    },

    // Get achievement by ID
    getAchievementById(id) {
        return ACHIEVEMENTS_CONFIG[id];
    },

    // Get achievement categories
    getCategories() {
        const categories = new Set();
        Object.values(ACHIEVEMENTS_CONFIG).forEach(achievement => {
            categories.add(achievement.category);
        });
        return Array.from(categories);
    },

    // Get achievements for display (without conditions, for UI purposes)
    getAchievementsForDisplay() {
        return Object.values(ACHIEVEMENTS_CONFIG).map(achievement => ({
            id: achievement.id,
            name: achievement.name,
            description: achievement.description,
            reward: achievement.reward,
            category: achievement.category,
            type: achievement.type,
            hidden: achievement.hidden || false,
            conflicts: achievement.conflicts || [],
            crossRun: achievement.crossRun || false
        }));
    },

    // Get achievements for game logic (with conditions)
    getAchievementsForGame() {
        return Object.values(ACHIEVEMENTS_CONFIG).map(achievement => ({
            id: achievement.id,
            name: achievement.name,
            description: achievement.description,
            reward: achievement.reward,
            category: achievement.category,
            type: achievement.type,
            hidden: achievement.hidden || false,
            conflicts: achievement.conflicts || [],
            crossRun: achievement.crossRun || false,
            impossible: achievement.impossible || false
        }));
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ACHIEVEMENTS_CONFIG, AchievementsHelper };
}

// For browser usage
if (typeof window !== 'undefined') {
    window.ACHIEVEMENTS_CONFIG = ACHIEVEMENTS_CONFIG;
    window.AchievementsHelper = AchievementsHelper;
} 