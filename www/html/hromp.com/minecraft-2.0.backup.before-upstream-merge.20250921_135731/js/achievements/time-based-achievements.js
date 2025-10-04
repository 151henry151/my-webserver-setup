// Time-based Achievements Configuration
// This file contains achievements related to time, dates, and seasonal events

const TIME_BASED_ACHIEVEMENTS = {
    // Time-based achievements
    midnight_miner: {
        id: 'midnight_miner',
        name: 'Midnight Miner',
        description: 'Play at exactly midnight (00:00)',
        reward: 0,
        category: 'time',
        type: 'per_game',
    },
    noon_miner: {
        id: 'noon_miner',
        name: 'Noon Miner',
        description: 'Play at exactly noon (12:00)',
        reward: 0,
        category: 'time',
        type: 'per_game',
    },
    friday_13th: {
        id: 'friday_13th',
        name: 'Friday the 13th',
        description: 'Play on Friday the 13th',
        reward: 0,
        category: 'time',
        type: 'per_game',
    },
    leap_year: {
        id: 'leap_year',
        name: 'Leap Year',
        description: 'Play on February 29th',
        reward: 0,
        category: 'time',
        type: 'per_game',
    },

    // Extended Time-based achievements
    early_bird: {
        id: 'early_bird',
        name: 'Early Bird',
        description: 'Play between 5:00 AM and 7:00 AM',
        reward: 0,
        category: 'extended_time',
        type: 'per_account',
    },
    night_owl: {
        id: 'night_owl',
        name: 'Night Owl',
        description: 'Play between 11:00 PM and 1:00 AM',
        reward: 0,
        category: 'extended_time',
        type: 'per_account',
    },
    weekend_warrior: {
        id: 'weekend_warrior',
        name: 'Weekend Warrior',
        description: 'Play on a Saturday or Sunday',
        reward: 0,
        category: 'extended_time',
        type: 'per_account',
    },
    new_year: {
        id: 'new_year',
        name: 'New Year',
        description: 'Play on January 1st',
        reward: 0,
        category: 'extended_time',
        type: 'per_account',
    },
    christmas: {
        id: 'christmas',
        name: 'Christmas',
        description: 'Play on December 25th',
        reward: 0,
        category: 'extended_time',
        type: 'per_account',
    },
    halloween: {
        id: 'halloween',
        name: 'Halloween',
        description: 'Play on October 31st',
        reward: 0,
        category: 'extended_time',
        type: 'per_account',
    },

    // Time-based Precision Achievements
    midnight_strike: {
        id: 'midnight_strike',
        name: 'Midnight Strike',
        description: 'Click exactly at midnight (00:00:00)',
        reward: 0,
        category: 'time_precision',
        type: 'per_account',
    },
    noon_strike: {
        id: 'noon_strike',
        name: 'Noon Strike',
        description: 'Click exactly at noon (12:00:00)',
        reward: 0,
        category: 'time_precision',
        type: 'per_account',
    },
    second_precision: {
        id: 'second_precision',
        name: 'Second Precision',
        description: 'Click exactly on the 30th second of any minute',
        reward: 0,
        category: 'time_precision',
        type: 'per_account',
    },

    // Seasonal and Event Achievements
    summer_gamer: {
        id: 'summer_gamer',
        name: 'Summer Gamer',
        description: 'Play during summer months (June-August)',
        reward: 0,
        category: 'seasonal',
        type: 'per_account',
    },
    winter_gamer: {
        id: 'winter_gamer',
        name: 'Winter Gamer',
        description: 'Play during winter months (December-February)',
        reward: 0,
        category: 'seasonal',
        type: 'per_account',
    },
    holiday_spirit: {
        id: 'holiday_spirit',
        name: 'Holiday Spirit',
        description: 'Play on a major holiday (Christmas, New Year, etc.)',
        reward: 0,
        category: 'seasonal',
        type: 'per_account',
    }
};

// Export for use in other files
export { TIME_BASED_ACHIEVEMENTS }; 