# Achievements System

This directory contains the modular achievements system for the Minecraft Clicker game. The achievements have been broken down into smaller, more manageable components to make editing and maintenance easier.

## File Structure

### Core Files
- `index.js` - Main entry point that combines all achievement modules
- `README.md` - This documentation file

### Achievement Categories
- `basic-achievements.js` - Fundamental achievements (first upgrades, tool quantities, milestones)
- `advanced-tool-achievements.js` - Advanced tool achievements (robots, quantum miners, etc.)
- `challenge-achievements.js` - Difficult gameplay challenges and restrictions
- `click-achievements.js` - Click-related achievements and efficiency
- `mathematical-achievements.js` - Mathematical patterns and sequences
- `time-based-achievements.js` - Time-specific and seasonal achievements
- `easter-egg-achievements.js` - Secret achievements and fun references
- `fun-achievements.js` - Amusing and entertaining achievements
- `game-state-achievements.js` - Game progress and state management

## Usage

### Importing Achievements
```javascript
// Import the main achievements system
import { ACHIEVEMENTS_CONFIG, AchievementsHelper } from './js/achievements/index.js';

// Or import specific categories
import { BASIC_ACHIEVEMENTS } from './js/achievements/basic-achievements.js';
import { CHALLENGE_ACHIEVEMENTS } from './js/achievements/challenge-achievements.js';
```

### Using the Helper Functions
```javascript
// Get all achievements
const allAchievements = AchievementsHelper.getAllAchievements();

// Get achievements by category
const basicAchievements = AchievementsHelper.getAchievementsByCategory('basic');

// Get a specific achievement
const achievement = AchievementsHelper.getAchievementById('first_upgrade');

// Get all categories
const categories = AchievementsHelper.getCategories();
```

## Achievement Structure

Each achievement follows this structure:
```javascript
{
    id: 'unique_id',
    name: 'Achievement Name',
    description: 'Achievement description',
    reward: 1000,
    category: 'category_name',
    type: 'per_game', // or 'per_account'
    hidden: false, // optional
    conflicts: [], // optional - conflicting achievement IDs
    crossRun: false // optional - persists across game resets
}
```

## Adding New Achievements

1. **Choose the appropriate category file** based on the achievement type
2. **Add the achievement object** to the appropriate constant
3. **Update the index.js file** if you've added a new category
4. **Test the achievement** to ensure it works correctly

### Example: Adding a Basic Achievement
```javascript
// In basic-achievements.js
const BASIC_ACHIEVEMENTS = {
    // ... existing achievements ...
    
    new_achievement: {
        id: 'new_achievement',
        name: 'New Achievement',
        description: 'Description of the new achievement',
        reward: 5000,
        category: 'basic',
        type: 'per_game',
    }
};
```

## Categories

- **basic** - Fundamental game milestones
- **tool_quantity** - Owning specific quantities of tools
- **challenge** - Difficult gameplay restrictions
- **click** - Click-related achievements
- **efficiency** - Efficiency and optimization
- **speed** - Speed-based achievements
- **milestone** - Major game milestones
- **obscure** - Mathematical and pattern-based
- **time** - Time-specific achievements
- **easter_egg** - Secret and fun achievements
- **hidden** - Hidden achievements
- **browser_system** - Browser and system detection
- **game_state** - Game progress tracking
- **special_challenge** - Special gameplay challenges
- **fun_silly** - Amusing achievements
- **minecraft_themed** - Minecraft references
- **input_methods** - Input method achievements
- **technical** - Technical performance achievements
- **social** - Social and sharing achievements
- **environment** - Environmental achievements
- **psychological** - Psychological gameplay achievements
- **seasonal** - Seasonal and holiday achievements
- **time_precision** - Precise timing achievements
- **mathematical_mastery** - Advanced mathematical achievements
- **gaming_culture** - Gaming culture references
- **meme_culture** - Internet meme references
- **speed_challenge** - Speed-based challenges
- **resource_management** - Resource management achievements
- **timing** - Timing and rhythm achievements
- **mathematical_patterns** - Mathematical pattern recognition
- **special_numbers** - Special number achievements
- **patterns** - Pattern-based achievements
- **extended_time** - Extended time-based achievements
- **pattern_recognition** - Pattern recognition achievements
- **mathematical** - Mathematical sequence achievements
- **efficiency_balance** - Efficiency and balance achievements
- **specific_numbers** - Specific number achievements
- **advanced_challenge** - Advanced gameplay challenges

## Benefits of This Structure

1. **Easier Editing** - Each file is focused on a specific type of achievement
2. **Better Organization** - Achievements are logically grouped
3. **Reduced File Size** - No more massive single files that crash editors
4. **Modularity** - Easy to add new categories or modify existing ones
5. **Maintainability** - Clear separation of concerns
6. **Collaboration** - Multiple developers can work on different achievement types

## Migration from Old System

The old `achievements.js` file has been replaced with this modular system. The `index.js` file provides the same interface as the old system, so existing code should continue to work without changes.

## Browser Compatibility

This system uses ES6 modules, which are supported in all modern browsers. For older browser support, you may need to use a bundler like Webpack or Rollup. 