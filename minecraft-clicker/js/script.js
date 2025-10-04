// Minecraft Clicker Game
console.log('Script file is loading...');

class MinecraftClicker {
    constructor() {
        console.log('MinecraftClicker constructor starting...');
        this.gameState = {
            // Block-based economy system
            blocks: 0,
            blocksPerClick: 1,
            blocksPerSecond: 0,
            totalMined: 0,
            totalClicks: 0,
            upgradesOwned: 0,
            startTime: Date.now(),
            playTime: 0,
            upgrades: {},
            enchantments: {},
            achievements: {},
            username: '',
            password: '',
            highScore: 0,
            lastClickTime: 0,
            sessionStartTime: Date.now(),
            rebirthCount: 0,
            currentBlockTier: 0,
            currentBlockMultiplier: 1,
            currentBlockName: 'Grass Block',
            // Individual tool durability system
            toolDurability: {
                wooden_pickaxe: { current: 0, max: 60, isBroken: false },
                stone_pickaxe: { current: 0, max: 132, isBroken: false },
                iron_pickaxe: { current: 0, max: 251, isBroken: false },
                diamond_pickaxe: { current: 0, max: 1562, isBroken: false },
                netherite_pickaxe: { current: 0, max: 2032, isBroken: false }
            },
            // Current active tool
            activeTool: null,
            // Mining speed system
            miningSpeed: 1.0,
            miningCooldown: 0,
            // Block health system
            currentBlockHealth: 1,
            maxBlockHealth: 1,
            blockDamageDealt: 0,
            // Block properties system
            currentBlockReward: 1,
            currentBlockRequiredTool: null,
            currentBlockColor: '#8B4513',
            currentBlockImage: 'assets/blocks/grass.png',
            currentBlockBitcoinValue: 1,
            canMineCurrentBlock: true,
            miningBlockedReason: null,
            // Rare block system
            rareBlocksFound: 0,
            specialBlocksFound: [],
            // Mining power system
            miningPower: 1.0,
            // Chest system
            chestSystem: {
                isVisible: false,
                spawnChance: 1/30, // 1 in 30 chance
                lastSpawnAttempt: 0,
                spawnCooldown: 30000, // 30 seconds between spawn attempts
                activeEffects: []
            }
        };
        console.log('Game state initialized');

        this.upgrades = [
            // Tool upgrades
            {
                id: 'wooden_pickaxe',
                name: 'Wooden Pickaxe',
                description: 'A basic wooden pickaxe. Adds +1 block per click.',
                cost: 25, // 25 dirt blocks
                costMultiplier: 1.15,
                effect: { type: 'click', value: 1 }
            },
            {
                id: 'stone_pickaxe',
                name: 'Stone Pickaxe',
                description: 'A sturdy stone pickaxe. Adds +5 blocks per click.',
                cost: 50, // 50 cobblestone blocks
                costMultiplier: 1.15,
                effect: { type: 'click', value: 5 }
            },
            {
                id: 'iron_pickaxe',
                name: 'Iron Pickaxe',
                description: 'A durable iron pickaxe. Adds +20 blocks per click.',
                cost: 100, // 100 iron ore blocks
                costMultiplier: 1.15,
                effect: { type: 'click', value: 20 }
            },
            {
                id: 'diamond_pickaxe',
                name: 'Diamond Pickaxe',
                description: 'A powerful diamond pickaxe. Adds +50 blocks per click.',
                cost: 250, // 250 diamond ore blocks
                costMultiplier: 1.15,
                effect: { type: 'click', value: 50 }
            },
            {
                id: 'netherite_pickaxe',
                name: 'Netherite Pickaxe',
                description: 'The ultimate pickaxe. Adds +100 blocks per click.',
                cost: 500, // 500 netherite ore blocks
                costMultiplier: 1.15,
                effect: { type: 'click', value: 100 }
            },
            {
                id: 'mining_robot',
                name: 'Mining Robot',
                description: 'An automated mining robot. Generates +100 blocks per second.',
                cost: 25000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 100 }
            },
            {
                id: 'automated_mine',
                name: 'Automated Mine',
                description: 'A fully automated mining facility. Generates +500 blocks per second.',
                cost: 100000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 500 }
            },
            {
                id: 'quantum_miner',
                name: 'Quantum Miner',
                description: 'A quantum-powered mining device. Generates +2,500 blocks per second.',
                cost: 500000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 2500 }
            },
            {
                id: 'pickaxe_army',
                name: 'Pickaxe Army',
                description: 'An army of pickaxe-wielding miners. Generates +12,500 blocks per second.',
                cost: 2500000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 12500 }
            },
            {
                id: 'diamond_legion',
                name: 'Diamond Legion',
                description: 'A legion of diamond-clad warriors. Generates +62,500 blocks per second.',
                cost: 10000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 62500 }
            },
            {
                id: 'netherite_swarm',
                name: 'Netherite Swarm',
                description: 'A swarm of netherite-enhanced miners. Generates +312,500 blocks per second.',
                cost: 50000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 312500 }
            },
            {
                id: 'robot_legion',
                name: 'Robot Legion',
                description: 'A legion of advanced mining robots. Generates +1,562,500 blocks per second.',
                cost: 250000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 1562500 }
            },
            {
                id: 'mine_empire',
                name: 'Mine Empire',
                description: 'An empire of automated mines. Generates +7,812,500 blocks per second.',
                cost: 1000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 7812500 }
            },
            {
                id: 'quantum_legion',
                name: 'Quantum Legion',
                description: 'A legion of quantum miners. Generates +39,062,500 blocks per second.',
                cost: 5000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 39062500 }
            },
            {
                id: 'time_machine',
                name: 'Time Machine',
                description: 'A machine that mines through time itself. Generates +195,312,500 blocks per second.',
                cost: 25000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 195312500 }
            },
            {
                id: 'reality_bender',
                name: 'Reality Bender',
                description: 'A device that bends reality to mine blocks. Generates +976,562,500 blocks per second.',
                cost: 100000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 976562500 }
            },
            {
                id: 'dimension_breaker',
                name: 'Dimension Breaker',
                description: 'A machine that breaks through dimensions to mine. Generates +4,882,812,500 blocks per second.',
                cost: 500000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 4882812500 }
            },
            {
                id: 'cosmic_miner',
                name: 'Cosmic Miner',
                description: 'A miner that harvests from the cosmos. Generates +24,414,062,500 blocks per second.',
                cost: 2500000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 24414062500 }
            },
            {
                id: 'galaxy_crusher',
                name: 'Galaxy Crusher',
                description: 'A machine that crushes entire galaxies for resources. Generates +122,070,312,500 blocks per second.',
                cost: 10000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 122070312500 }
            },
            {
                id: 'universe_shaper',
                name: 'Universe Shaper',
                description: 'A device that shapes universes to extract blocks. Generates +610,351,562,500 blocks per second.',
                cost: 50000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 610351562500 }
            },
            {
                id: 'multiverse_harvester',
                name: 'Multiverse Harvester',
                description: 'A harvester that reaps from multiple universes. Generates +3,051,757,812,500 blocks per second.',
                cost: 250000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 3051757812500 }
            },
            {
                id: 'existence_miner',
                name: 'Existence Miner',
                description: 'A miner that extracts blocks from existence itself. Generates +15,258,789,062,500 blocks per second.',
                cost: 1000000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 15258789062500 }
            },
            {
                id: 'infinity_breaker',
                name: 'Infinity Breaker',
                description: 'A machine that breaks through infinity to mine. Generates +76,293,945,312,500 blocks per second.',
                cost: 5000000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 76293945312500 }
            },
            {
                id: 'rebirth',
                name: 'Rebirth',
                description: 'Start a new life with increased power. Multiplies all production by 2x.',
                cost: 10000000000000000,
                costMultiplier: 1.0,
                effect: { type: 'rebirth', value: 2 }
            }
        ];

        // Define enchantments array (sorted by price from lowest to highest)
        this.enchantments = [
            {
                id: 'mending',
                name: 'Mending',
                description: 'Tools repair themselves over time. Each level increases repair rate.',
                cost: 100000, // 100k - Early game pricing
                costMultiplier: 1.5,
                effect: { type: 'mending', value: 0.1 },
                maxLevel: 3
            },
            {
                id: 'unbreaking',
                name: 'Unbreaking',
                description: 'Reduces the chance of tools breaking. Each level adds 20% durability.',
                cost: 120000, // 120k - Early game pricing
                costMultiplier: 1.5,
                effect: { type: 'unbreaking', value: 0.2 },
                maxLevel: 3
            },
            {
                id: 'amplification',
                name: 'Amplification',
                description: 'Makes pickaxe tools 3x more powerful. Each level multiplies by another 3x.',
                cost: 10000000, // 10M - Mid-game pricing
                costMultiplier: 2.0,
                effect: { type: 'amplification', value: 3.0 },
                maxLevel: 3
            },
            {
                id: 'efficiency',
                name: 'Efficiency',
                description: 'Increases mining speed by 25%. Each level adds another 25%.',
                cost: 10000000000000, // 10T
                costMultiplier: 3.0,
                effect: { type: 'efficiency', value: 0.25 },
                maxLevel: 5
            },
            {
                id: 'sharpness',
                name: 'Sharpness',
                description: 'Increases damage to blocks. Each level adds 15% damage.',
                cost: 30000000000000, // 30T
                costMultiplier: 3.3,
                effect: { type: 'sharpness', value: 0.15 },
                maxLevel: 5
            },
            {
                id: 'fortune',
                name: 'Fortune',
                description: 'Chance to get bonus blocks when mining. Each level adds 10% chance.',
                cost: 25000000000000, // 25T
                costMultiplier: 3.5,
                effect: { type: 'fortune', value: 0.1 },
                maxLevel: 3
            },
            {
                id: 'looting',
                name: 'Looting',
                description: 'Increases rare block drops. Each level adds 15% rare drop chance.',
                cost: 40000000000000, // 40T
                costMultiplier: 3.7,
                effect: { type: 'looting', value: 0.15 },
                maxLevel: 3
            },
            {
                id: 'silk_touch',
                name: 'Silk Touch',
                description: 'Allows mining of special blocks. Each level unlocks new block types.',
                cost: 100000000000000, // 100T
                costMultiplier: 5.0,
                effect: { type: 'silk_touch', value: 1 },
                maxLevel: 1
            },
            {
                id: 'infinity',
                name: 'Infinity',
                description: 'Unlimited mining power. Each level adds 50% to all mining stats.',
                cost: 500000000000000, // 500T
                costMultiplier: 6.0,
                effect: { type: 'infinity', value: 0.5 },
                maxLevel: 1
            }
        ];

        // Define tools array for UI management
        this.tools = [
            'woodenPickaxe', 'stonePickaxe', 'ironPickaxe', 'diamondPickaxe', 'netheritePickaxe',
            'miningRobot', 'automatedMine', 'quantumMiner', 'pickaxeArmy', 'diamondLegion',
            'netheriteSwarm', 'robotLegion', 'mineEmpire', 'quantumLegion', 'timeMachine',
            'realityBender', 'dimensionBreaker', 'cosmicMiner', 'galaxyCrusher', 'universeShaper',
            'multiverseHarvester', 'existenceMiner', 'infinityBreaker', 'rebirth'
        ];



        // Initialize the game
        console.log('About to initialize achievements...');
        // Initialize achievements from centralized configuration FIRST
        this.initializeAchievements();
        console.log('Achievements initialized');
        
        // Then load the game state
        console.log('About to load game...');
        this.loadGame();
        console.log('Game loaded');
        
        // Update mining tools and setup event listeners
        console.log('About to update mining tools...');
        this.updateMiningTools();
        console.log('Mining tools updated');
        
        // Continue with normal initialization flow
        console.log('About to call setupEventListeners...');
        this.setupEventListeners();
        console.log('setupEventListeners completed');
        console.log('About to render upgrades...');
        this.renderUpgrades();
        console.log('Upgrades rendered');
        console.log('About to render enchantments...');
        this.renderEnchantments();
        console.log('Enchantments rendered');
        console.log('About to start game loop...');
        this.startGameLoop();
        console.log('Game loop started');
        
        // Initialize the first block
        this.generateNewBlock();
        
        
        // Update display after everything is initialized (but don't check achievements yet)
        this.updateDisplayWithoutAchievements();
    }



    updateMiningTools() {
        try {
            console.log('Updating mining tools...');
            console.log('Current upgrades:', this.gameState.upgrades);
            console.log('Tools array:', this.tools);
            
            // Reset all tools to inactive
            this.tools.forEach(toolId => {
                const tool = document.getElementById(toolId);
                if (tool) {
                    tool.classList.remove('active');
                    console.log(`Removed active class from ${toolId}`);
                } else {
                    console.warn(`Tool element not found: ${toolId}`);
                }
            });

            // Show all tools you own
            if (this.gameState.upgrades['wooden_pickaxe'] > 0) {
                const tool = document.getElementById('woodenPickaxe');
                if (tool) {
                    tool.classList.add('active');
                    console.log('Activated wooden pickaxe');
                } else {
                    console.warn('Wooden pickaxe element not found');
                }
            }
            if (this.gameState.upgrades['stone_pickaxe'] > 0) {
                const tool = document.getElementById('stonePickaxe');
                if (tool) {
                    tool.classList.add('active');
                    console.log('Activated stone pickaxe');
                }
            }
            if (this.gameState.upgrades['iron_pickaxe'] > 0) {
                const tool = document.getElementById('ironPickaxe');
                if (tool) {
                    tool.classList.add('active');
                    console.log('Activated iron pickaxe');
                }
            }
            if (this.gameState.upgrades['diamond_pickaxe'] > 0) {
                const tool = document.getElementById('diamondPickaxe');
                if (tool) {
                    tool.classList.add('active');
                    console.log('Activated diamond pickaxe');
                }
            }
            if (this.gameState.upgrades['netherite_pickaxe'] > 0) {
                const tool = document.getElementById('netheritePickaxe');
                if (tool) {
                    tool.classList.add('active');
                    console.log('Activated netherite pickaxe');
                }
            }
            if (this.gameState.upgrades['mining_robot'] > 0) {
                const tool = document.getElementById('miningRobot');
                if (tool) {
                    tool.classList.add('active');
                    console.log('Activated mining robot');
                }
            }
            if (this.gameState.upgrades['automated_mine'] > 0) {
                const tool = document.getElementById('automatedMine');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['quantum_miner'] > 0) {
                const tool = document.getElementById('quantumMiner');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['pickaxe_army'] > 0) {
                const tool = document.getElementById('pickaxeArmy');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['diamond_legion'] > 0) {
                const tool = document.getElementById('diamondLegion');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['netherite_swarm'] > 0) {
                const tool = document.getElementById('netheriteSwarm');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['robot_legion'] > 0) {
                const tool = document.getElementById('robotLegion');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['mine_empire'] > 0) {
                const tool = document.getElementById('mineEmpire');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['quantum_legion'] > 0) {
                const tool = document.getElementById('quantumLegion');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['time_machine'] > 0) {
                const tool = document.getElementById('timeMachine');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['reality_bender'] > 0) {
                const tool = document.getElementById('realityBender');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['dimension_breaker'] > 0) {
                const tool = document.getElementById('dimensionBreaker');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['cosmic_miner'] > 0) {
                const tool = document.getElementById('cosmicMiner');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['galaxy_crusher'] > 0) {
                const tool = document.getElementById('galaxyCrusher');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['universe_shaper'] > 0) {
                const tool = document.getElementById('universeShaper');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['multiverse_harvester'] > 0) {
                const tool = document.getElementById('multiverseHarvester');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['existence_miner'] > 0) {
                const tool = document.getElementById('existenceMiner');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['infinity_breaker'] > 0) {
                const tool = document.getElementById('infinityBreaker');
                if (tool) tool.classList.add('active');
            }
            if (this.gameState.upgrades['rebirth'] > 0) {
                const tool = document.getElementById('rebirth');
                if (tool) tool.classList.add('active');
            }
        } catch (error) {
            console.error('Error updating mining tools:', error);
        }
    }

    // Core Game Methods
    updateDisplayWithoutAchievements() {
        // Update main display
        document.getElementById('bitcoinAmount').textContent = this.formatNumber(this.gameState.blocks);
        document.getElementById('bitcoinRate').textContent = this.formatNumber(this.gameState.blocksPerSecond);
        document.getElementById('clickValue').textContent = this.formatNumber(this.gameState.blocksPerClick);
        
        // Update statistics
        document.getElementById('totalMined').textContent = this.formatNumber(this.gameState.totalMined);
        document.getElementById('totalClicks').textContent = this.formatNumber(this.gameState.totalClicks);
        document.getElementById('upgradesOwned').textContent = this.formatNumber(this.gameState.upgradesOwned);
        
        // Update play time
        const playTimeSeconds = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        this.gameState.playTime = playTimeSeconds;
        document.getElementById('playTime').textContent = this.formatTime(playTimeSeconds);
    }

    updateDisplay() {
        // Update main display
        document.getElementById('bitcoinAmount').textContent = this.formatNumber(this.gameState.blocks);
        document.getElementById('bitcoinRate').textContent = this.formatNumber(this.gameState.blocksPerSecond);
        
        // Update click value display with tool information
        const clickValueElement = document.getElementById('clickValue');
        const clickValueTextElement = document.querySelector('.click-value');
        if (clickValueElement) {
            if (this.gameState.activeTool) {
                clickValueElement.textContent = this.formatNumber(this.gameState.blocksPerClick);
                if (clickValueTextElement) {
                    clickValueTextElement.innerHTML = `+<span id="clickValue">${this.formatNumber(this.gameState.blocksPerClick)}</span> Blocks per click`;
                }
            } else {
                // Show bare-handed mining
                clickValueElement.textContent = '1';
                if (clickValueTextElement) {
                    clickValueTextElement.innerHTML = `+<span id="clickValue">1</span> Blocks per click (Bare Hands)`;
                }
            }
        }
        
        // Update statistics
        document.getElementById('totalMined').textContent = this.formatNumber(this.gameState.totalMined);
        document.getElementById('totalClicks').textContent = this.formatNumber(this.gameState.totalClicks);
        document.getElementById('upgradesOwned').textContent = this.formatNumber(this.gameState.upgradesOwned);
        
        // Update rebirth stats
        document.getElementById('rebirthCount').textContent = this.gameState.rebirthCount || 0;
        document.getElementById('currentBlockName').textContent = this.gameState.currentBlockName || 'Grass Block';
        
        // Update play time
        const playTimeSeconds = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        this.gameState.playTime = playTimeSeconds;
        document.getElementById('playTime').textContent = this.formatTime(playTimeSeconds);
        
        // Update upgrades availability
        this.renderUpgrades();
        this.renderEnchantments();
        
        
        // Update enchantment effects display
        this.updateEnchantmentEffectsDisplay();
        
        // Check for achievements
        this.checkAchievements();
        
        // Update new game mechanics displays
        this.updateGameMechanicsDisplay();
        
        // Update block information and skip button
        this.updateBlockDisplay();
        
        // Update block image on mining button
        this.updateBlockImage();
    }
    
    
    updateGameMechanicsDisplay() {
        // Update tool durability display
        const durabilityBar = document.getElementById('durabilityBar');
        const durabilityText = document.getElementById('durabilityText');
        if (durabilityBar && durabilityText) {
            if (this.gameState.activeTool && this.gameState.toolDurability[this.gameState.activeTool]) {
                const toolDurability = this.gameState.toolDurability[this.gameState.activeTool];
                const durabilityPercent = (toolDurability.current / toolDurability.max) * 100;
                durabilityBar.style.width = `${durabilityPercent}%`;
                durabilityText.textContent = `${Math.floor(toolDurability.current)}/${toolDurability.max}`;
                
                // Color code based on durability
                if (durabilityPercent > 60) {
                    durabilityBar.style.backgroundColor = '#4CAF50';
                } else if (durabilityPercent > 30) {
                    durabilityBar.style.backgroundColor = '#FF9800';
                } else {
                    durabilityBar.style.backgroundColor = '#f44336';
                }
                
                // Show broken state
                const durabilityContainer = document.getElementById('durabilityContainer');
                if (durabilityContainer) {
                    if (toolDurability.isBroken) {
                        durabilityContainer.classList.add('broken');
                    } else {
                        durabilityContainer.classList.remove('broken');
                    }
                }
            } else {
                // No active tool
                durabilityBar.style.width = '0%';
                durabilityText.textContent = 'Bare Hands';
                durabilityBar.style.backgroundColor = '#ccc';
                
                const durabilityContainer = document.getElementById('durabilityContainer');
                if (durabilityContainer) {
                    durabilityContainer.classList.remove('broken');
                    // Add a helpful tooltip or class for bare hands
                    durabilityContainer.title = 'No tools equipped - mining with bare hands at 1 block per click';
                }
            }
        }
        
        // Update block health display
        const blockHealthBar = document.getElementById('blockHealthBar');
        const blockHealthText = document.getElementById('blockHealthText');
        if (blockHealthBar && blockHealthText) {
            const healthPercent = ((this.gameState.currentBlockHealth - this.gameState.blockDamageDealt) / this.gameState.currentBlockHealth) * 100;
            blockHealthBar.style.width = `${Math.max(0, healthPercent)}%`;
            blockHealthText.textContent = `${Math.ceil(this.gameState.currentBlockHealth - this.gameState.blockDamageDealt)}/${this.gameState.currentBlockHealth}`;
        }
        
        // Update special stats
        const rareBlocksText = document.getElementById('rareBlocksFound');
        const specialBlocksText = document.getElementById('specialBlocksFound');
        const miningPowerText = document.getElementById('miningPower');
        const miningSpeedText = document.getElementById('miningSpeed');
        
        if (rareBlocksText) rareBlocksText.textContent = this.gameState.rareBlocksFound || 0;
        if (specialBlocksText) specialBlocksText.textContent = this.gameState.specialBlocksFound.length || 0;
        if (miningPowerText) miningPowerText.textContent = `${(this.gameState.miningPower * 100).toFixed(0)}%`;
        if (miningSpeedText) {
            const speedMultiplier = this.gameState.enchantments && this.gameState.enchantments.efficiency > 0 
                ? 1 + (this.gameState.enchantments.efficiency * 0.25) 
                : 1;
            miningSpeedText.textContent = `${(speedMultiplier * 100).toFixed(0)}%`;
        }
    }

    updateEnchantmentEffectsDisplay() {
        const enchantmentEffects = document.getElementById('enchantmentEffects');
        const fortuneEffect = document.getElementById('fortuneEffect');
        const lootingEffect = document.getElementById('lootingEffect');
        
        if (!enchantmentEffects || !fortuneEffect || !lootingEffect) return;
        
        let hasActiveEffects = false;
        
        // Check Fortune enchantment
        if (this.gameState.enchantments && this.gameState.enchantments.fortune > 0) {
            fortuneEffect.style.display = 'flex';
            hasActiveEffects = true;
        } else {
            fortuneEffect.style.display = 'none';
        }
        
        // Check Looting enchantment
        if (this.gameState.enchantments && this.gameState.enchantments.looting > 0) {
            lootingEffect.style.display = 'flex';
            hasActiveEffects = true;
        } else {
            lootingEffect.style.display = 'none';
        }
        
        // Show/hide the container
        enchantmentEffects.style.display = hasActiveEffects ? 'flex' : 'none';
    }

    formatTime(seconds) {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }

    renderUpgrades() {
        const upgradesGrid = document.getElementById('upgradesGrid');
        if (!upgradesGrid) return;

        upgradesGrid.innerHTML = '';
        
        this.upgrades.forEach(upgrade => {
            const upgradeElement = document.createElement('div');
            upgradeElement.className = 'upgrade-item';
            upgradeElement.id = `upgrade-${upgrade.id}`;
            
            const owned = this.gameState.upgrades[upgrade.id] || 0;
            const cost = this.calculateUpgradeCost(upgrade, owned);
            const canAfford = Number(this.gameState.blocks) >= Number(cost);
            
            // Check if this is a pickaxe tool
            const isPickaxeTool = ['wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe'].includes(upgrade.id);
            const isActiveTool = this.gameState.activeTool === upgrade.id;
            const toolDurability = isPickaxeTool ? this.gameState.toolDurability[upgrade.id] : null;
            const isBroken = toolDurability ? toolDurability.isBroken : false;
            const needsRepair = toolDurability ? toolDurability.current < toolDurability.max : false;
            
            let durabilityInfo = '';
            let actionButtons = '';
            
            if (isPickaxeTool && owned > 0) {
                const durabilityPercent = (toolDurability.current / toolDurability.max) * 100;
                const durabilityColor = durabilityPercent > 60 ? '#4CAF50' : durabilityPercent > 30 ? '#FF9800' : '#f44336';
                
                durabilityInfo = `
                    <div class="tool-durability">
                        <div class="durability-bar">
                            <div class="durability-fill" style="width: ${durabilityPercent}%; background-color: ${durabilityColor};"></div>
                        </div>
                        <div class="durability-text">${Math.floor(toolDurability.current)}/${toolDurability.max}</div>
                    </div>
                `;
                
                if (isBroken) {
                    actionButtons = `<button class="repair-button" onclick="game.repairTool('${upgrade.id}')">Repair</button>`;
                } else if (isActiveTool) {
                    actionButtons = `<span class="active-tool-indicator">Active Tool</span>`;
                } else {
                    actionButtons = `<button class="switch-button" onclick="game.switchTool('${upgrade.id}')">Switch To</button>`;
                }
            }
            
            upgradeElement.innerHTML = `
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name}</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                    <div class="upgrade-owned">Owned: ${owned}</div>
                    <div class="upgrade-cost">Cost: ${this.formatNumber(cost)} blocks</div>
                    ${durabilityInfo}
                    ${actionButtons}
                </div>
            `;
            
            // Add data attribute and styling for clickability
            upgradeElement.dataset.upgradeId = upgrade.id;
            if (!canAfford) {
                upgradeElement.classList.add('disabled');
            }
            
            // Add special styling for broken tools
            if (isBroken) {
                upgradeElement.classList.add('broken-tool');
            }
            
            upgradesGrid.appendChild(upgradeElement);
        });
    }

    renderEnchantments() {
        const enchantmentsGrid = document.getElementById('enchantmentsGrid');
        if (!enchantmentsGrid) return;

        enchantmentsGrid.innerHTML = '';
        
        this.enchantments.forEach(enchantment => {
            const enchantmentElement = document.createElement('div');
            enchantmentElement.className = 'enchantment-item';
            enchantmentElement.id = `enchantment-${enchantment.id}`;
            
            const owned = this.gameState.enchantments[enchantment.id] || 0;
            const cost = this.calculateEnchantmentCost(enchantment, owned);
            const canAfford = Number(this.gameState.blocks) >= Number(cost);
            const maxLevelReached = owned >= enchantment.maxLevel;
            
            enchantmentElement.innerHTML = `
                <div class="enchantment-info">
                    <div class="enchantment-name">${enchantment.name}</div>
                    <div class="enchantment-description">${enchantment.description}</div>
                    <div class="enchantment-level">Level: ${owned}/${enchantment.maxLevel}</div>
                    <div class="enchantment-cost">Cost: ${this.formatNumber(cost)} blocks</div>
                </div>
            `;
            
            // Add data attribute and styling for clickability
            enchantmentElement.dataset.enchantmentId = enchantment.id;
            if (!canAfford || maxLevelReached) {
                enchantmentElement.classList.add('disabled');
            }
            
            enchantmentsGrid.appendChild(enchantmentElement);
        });
    }

    calculateEnchantmentCost(enchantment, owned) {
        return Math.floor(enchantment.cost * Math.pow(enchantment.costMultiplier, owned));
    }

    buyEnchantment(enchantmentId) {
        const enchantment = this.enchantments.find(e => e.id === enchantmentId);
        if (!enchantment) return;

        const owned = this.gameState.enchantments[enchantmentId] || 0;
        const cost = this.calculateEnchantmentCost(enchantment, owned);

        // Check if max level reached
        if (owned >= enchantment.maxLevel) {
            this.showNotification(`${enchantment.name} is already at maximum level!`, 'warning');
            return;
        }

        if (Number(this.gameState.blocks) >= Number(cost)) {
            this.gameState.blocks -= cost;
            this.gameState.enchantments[enchantmentId] = (this.gameState.enchantments[enchantmentId] || 0) + 1;

                            // Apply enchantment effect
                this.applyEnchantmentEffect(enchantment);

                this.updateDisplay();
                this.renderEnchantments();
                this.saveGame();
                this.autoSave();
                
                // Show special notification for enchantments
                const effectText = this.getEnchantmentEffectText(enchantment, owned + 1);
                this.showNotification(`${enchantment.name} level ${owned + 1} purchased! ${effectText}`, 'success');
        }
    }

    applyEnchantmentEffect(enchantment) {
        // Recalculate all enchantment effects from scratch
        this.recalculateEnchantmentEffects();
    }

    recalculateEnchantmentEffects() {
        // Reset to base values first
        this.gameState.blocksPerClick = 1;
        this.gameState.blocksPerSecond = 0;
        
        // Apply all upgrade effects first
        this.upgrades.forEach(upgrade => {
            const owned = this.gameState.upgrades[upgrade.id] || 0;
            if (owned > 0) {
                if (upgrade.effect.type === 'click') {
                    this.gameState.blocksPerClick += upgrade.effect.value * owned;
                } else if (upgrade.effect.type === 'passive') {
                    this.gameState.blocksPerSecond += upgrade.effect.value * owned;
                }
            }
        });
        
        // Ensure minimum mining power for bare-handed mining
        this.gameState.blocksPerClick = Math.max(1, this.gameState.blocksPerClick);
        
        // Then apply enchantment effects
        if (this.gameState.enchantments) {
            Object.keys(this.gameState.enchantments).forEach(enchantmentId => {
                const enchantment = this.enchantments.find(e => e.id === enchantmentId);
                if (enchantment) {
                    const level = this.gameState.enchantments[enchantmentId];
                    
                    switch (enchantment.effect.type) {
                        case 'efficiency':
                            // Efficiency increases mining speed
                            this.gameState.blocksPerClick = Math.floor(this.gameState.blocksPerClick * (1 + enchantment.effect.value * level));
                            break;
                        case 'sharpness':
                            // Sharpness increases damage to blocks
                            this.gameState.blocksPerClick = Math.floor(this.gameState.blocksPerClick * (1 + enchantment.effect.value * level));
                            break;
                        case 'infinity':
                            // Infinity provides massive boost to all stats
                            this.gameState.blocksPerClick = Math.floor(this.gameState.blocksPerClick * (1 + enchantment.effect.value * level));
                            this.gameState.blocksPerSecond = Math.floor(this.gameState.blocksPerSecond * (1 + enchantment.effect.value * level));
                            break;
                        case 'amplification':
                            // Amplification multiplies pickaxe tool strength by 3x per level
                            // This affects the base pickaxe upgrades, not passive income
                            const beforeAmplification = this.gameState.blocksPerClick;
                            this.gameState.blocksPerClick = Math.floor(this.gameState.blocksPerClick * Math.pow(enchantment.effect.value, level));
                            console.log(`Amplification level ${level}: ${beforeAmplification} -> ${this.gameState.blocksPerClick} (${Math.pow(enchantment.effect.value, level)}x multiplier)`);
                            break;
                    }
                }
            });
        }
        
        // Finally apply rebirth multipliers
        const rebirthCount = this.gameState.rebirthCount || 0;
        if (rebirthCount > 0) {
            const rebirthMultiplier = Math.pow(2, rebirthCount); // 2x per rebirth
            this.gameState.blocksPerClick = Math.floor(this.gameState.blocksPerClick * rebirthMultiplier);
            this.gameState.blocksPerSecond = Math.floor(this.gameState.blocksPerSecond * rebirthMultiplier);
        }
    }

    getEnchantmentEffectText(enchantment, level) {
        switch (enchantment.effect.type) {
            case 'efficiency':
                return `Mining speed increased by ${Math.floor(enchantment.effect.value * level * 100)}%`;
            case 'fortune':
                return `Fortune chance increased to ${Math.floor(enchantment.effect.value * level * 100)}%`;
            case 'unbreaking':
                return `Durability increased by ${Math.floor(enchantment.effect.value * level * 100)}%`;
            case 'mending':
                return `Repair rate increased by ${Math.floor(enchantment.effect.value * level * 100)}%`;
            case 'sharpness':
                return `Damage increased by ${Math.floor(enchantment.effect.value * level * 100)}%`;
            case 'looting':
                return `Rare drop chance increased to ${Math.floor(enchantment.effect.value * level * 100)}%`;
            case 'silk_touch':
                return `Special blocks unlocked!`;
            case 'infinity':
                return `All stats boosted by ${Math.floor(enchantment.effect.value * level * 100)}%`;
            case 'amplification':
                return `Pickaxe strength multiplied by ${Math.pow(enchantment.effect.value, level)}x!`;
            default:
                return '';
        }
    }

    applyRebirthEffect() {
        // Increment rebirth count
        this.gameState.rebirthCount = (this.gameState.rebirthCount || 0) + 1;
        
        // Progress to next block tier
        this.progressToNextBlockTier();
        
        // Apply rebirth multiplier to all production
        this.applyRebirthMultiplier();
        
        // Recalculate all effects with rebirth multipliers
        this.recalculateEnchantmentEffects();
        
        // Update the visual block
        this.updateBlockVisual();
    }

    progressToNextBlockTier() {
        const rebirthCount = this.gameState.rebirthCount || 0;
        
        // Define block progression tiers
        const blockTiers = [
            { name: 'Grass Block', image: 'assets/blocks/grass.png', multiplier: 1 },
            { name: 'Stone Block', image: 'assets/blocks/cobblestone.png', multiplier: 2 },
            { name: 'Iron Block', image: 'assets/blocks/iron.png', multiplier: 5 },
            { name: 'Gold Block', image: 'assets/blocks/gold.png', multiplier: 10 },
            { name: 'Diamond Block', image: 'assets/blocks/diamond.png', multiplier: 25 },
            { name: 'Emerald Block', image: 'assets/blocks/emerald.png', multiplier: 50 },
            { name: 'Netherite Block', image: 'assets/blocks/netherite.png', multiplier: 100 },
            { name: 'Obsidian Block', image: 'assets/blocks/cobblestone.png', multiplier: 250 }, // Using cobblestone for obsidian
            { name: 'Bedrock Block', image: 'assets/blocks/cobblestone.png', multiplier: 500 }, // Using cobblestone for bedrock
            { name: 'Void Block', image: 'assets/blocks/netherite.png', multiplier: 1000 } // Using netherite for void
        ];
        
        // Calculate current tier based on rebirth count
        const tierIndex = Math.min(Math.floor(rebirthCount / 3), blockTiers.length - 1);
        this.gameState.currentBlockTier = tierIndex;
        this.gameState.currentBlockMultiplier = blockTiers[tierIndex].multiplier;
        this.gameState.currentBlockName = blockTiers[tierIndex].name;
    }

    applyRebirthMultiplier() {
        // Instead of multiplying existing values, we'll recalculate everything
        // This method is called after the rebirth effect is applied
        // The actual calculation happens in recalculateEnchantmentEffects
    }

    updateBlockVisual() {
        const grassBlockImage = document.querySelector('.grass-block-image');
        if (grassBlockImage) {
            const tier = this.gameState.currentBlockTier || 0;
            const blockName = this.gameState.currentBlockName || 'Grass Block';
            
            // Update the image source based on tier (for now using the same image)
            // grassBlockImage.src = this.getBlockImageForTier(tier);
            
            // Update the alt text and title
            grassBlockImage.alt = blockName;
            grassBlockImage.title = blockName;
            
            // Add a special class for visual effects
            const grassBlock = document.querySelector('.grass-block');
            if (grassBlock) {
                grassBlock.className = `grass-block block-tier-${tier}`;
            }
        }
    }

    getBlockImageForTier(tier) {
        // Return the appropriate block image based on tier
        const blockTiers = [
            'assets/blocks/grass.png',
            'assets/blocks/cobblestone.png',
            'assets/blocks/iron.png',
            'assets/blocks/gold.png',
            'assets/blocks/diamond.png',
            'assets/blocks/emerald.png',
            'assets/blocks/netherite.png',
            'assets/blocks/cobblestone.png', // Obsidian
            'assets/blocks/cobblestone.png', // Bedrock
            'assets/blocks/netherite.png'    // Void
        ];
        return blockTiers[tier] || 'assets/blocks/grass.png';
    }

    calculateUpgradeCost(upgrade, owned) {
        return Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, owned));
    }

    buyUpgrade(upgradeId) {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        if (!upgrade) return;

        const owned = this.gameState.upgrades[upgradeId] || 0;
        const cost = this.calculateUpgradeCost(upgrade, owned);

        // Check if player has enough blocks
        if (Number(this.gameState.blocks) >= Number(cost)) {
            this.gameState.blocks -= cost;
            this.gameState.upgrades[upgradeId] = (this.gameState.upgrades[upgradeId] || 0) + 1;
            this.gameState.upgradesOwned += 1;

            // Initialize tool durability for pickaxe tools
            if (upgradeId === 'wooden_pickaxe' || upgradeId === 'stone_pickaxe' || 
                upgradeId === 'iron_pickaxe' || upgradeId === 'diamond_pickaxe' || 
                upgradeId === 'netherite_pickaxe') {
                
                // Set as active tool if it's the first one purchased
                if (!this.gameState.activeTool) {
                    this.gameState.activeTool = upgradeId;
                }
                
                // Initialize durability if this is the first time purchasing this tool
                if (this.gameState.upgrades[upgradeId] === 1) {
                    this.gameState.toolDurability[upgradeId].current = this.gameState.toolDurability[upgradeId].max;
                    this.gameState.toolDurability[upgradeId].isBroken = false;
                }
            }

            // Apply upgrade effect
            if (upgrade.effect.type === 'click') {
                this.gameState.blocksPerClick += upgrade.effect.value;
            } else if (upgrade.effect.type === 'passive') {
                this.gameState.blocksPerSecond += upgrade.effect.value;
            } else if (upgrade.effect.type === 'rebirth') {
                // Handle rebirth logic here
                this.applyRebirthEffect();
                this.showNotification('Rebirth effect applied!', 'success');
            }

            // Recalculate enchantment effects to apply amplification to new tools
            this.recalculateEnchantmentEffects();

            // Recheck block mineability if this was a tool purchase
            if (upgradeId === 'wooden_pickaxe' || upgradeId === 'stone_pickaxe' || 
                upgradeId === 'iron_pickaxe' || upgradeId === 'diamond_pickaxe' || 
                upgradeId === 'netherite_pickaxe') {
                this.checkBlockMineability();
            }

            this.updateDisplay();
            this.renderUpgrades();
            this.updateMiningTools();
            this.saveGame();
            // Also auto-save to ensure immediate persistence
            this.autoSave();
            this.showNotification(`${upgrade.name} purchased!`, 'success');
        } else {
            this.showNotification(`Not enough blocks! You need ${this.formatNumber(cost)} blocks.`, 'error');
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        // Click handler
        const miningButton = document.getElementById('bitcoinButton');
        console.log('Mining button found:', miningButton);
        if (miningButton) {
            miningButton.addEventListener('click', (e) => {
                console.log('Mining button clicked!', e);
                e.preventDefault();
                e.stopPropagation();
                
                // Check if mining is on cooldown (from mining speed)
                const now = Date.now();
                if (this.gameState.miningCooldown > now) {
                    return; // Still on cooldown
                }
                
                // Check if tool is broken - allow bare-handed mining if no tools available
                if (this.gameState.activeTool && this.gameState.toolDurability[this.gameState.activeTool].isBroken) {
                    this.showNotification('Your tool is broken! Repair it or buy a new one.', 'error');
                    return;
                }
                
                // Check if player can mine the current block
                if (!this.gameState.canMineCurrentBlock) {
                    this.showNotification(this.gameState.miningBlockedReason, 'error');
                    return;
                }
                
                // If no active tool, use bare hands (1 block per click)
                if (!this.gameState.activeTool) {
                    // Ensure base mining power is preserved for bare-handed mining
                    this.gameState.blocksPerClick = Math.max(1, this.gameState.blocksPerClick);
                    
                    // Show helpful message for new players
                    if (this.gameState.totalClicks === 0) {
                        this.showNotification('Mining with bare hands! Buy tools to mine faster.', 'info');
                    }
                }
                
                // Calculate mining speed multiplier from Efficiency enchantment
                let miningSpeedMultiplier = 1.0;
                if (this.gameState.enchantments && this.gameState.enchantments.efficiency > 0) {
                    miningSpeedMultiplier = 1 + (this.gameState.enchantments.efficiency * 0.25);
                }
                
                // Set mining cooldown based on speed
                const baseCooldown = 100; // Base 100ms between clicks
                this.gameState.miningCooldown = now + (baseCooldown / miningSpeedMultiplier);
                
                // Calculate damage to block (for Sharpness enchantment)
                let damageDealt = 1;
                if (this.gameState.enchantments && this.gameState.enchantments.sharpness > 0) {
                    damageDealt = 1 + (this.gameState.enchantments.sharpness * 0.15);
                }
                
                // Apply damage to current block
                this.gameState.blockDamageDealt += damageDealt;
                
                // Check if block is broken
                let blockBroken = false;
                if (this.gameState.blockDamageDealt >= this.gameState.currentBlockHealth) {
                    blockBroken = true;
                    this.gameState.blockDamageDealt = 0;
                    
                    // Generate new block with random health
                    this.generateNewBlock();
                }
                
                // Only get blocks if the block was broken
                if (blockBroken) {
                    // Check if this is a special chest block
                    if (this.gameState.currentBlockName === 'Mystery Chest') {
                        this.openMysteryChest();
                        return; // Exit early since chest handles its own display update
                    }
                    
                    // Use the block's value for direct currency
                    let blocksToAdd = this.gameState.currentBlockBitcoinValue || 1;
                    
                    // Apply block tier multiplier from rebirths
                    const blockMultiplier = this.gameState.currentBlockMultiplier || 1;
                    blocksToAdd = Math.floor(blocksToAdd * blockMultiplier);
                    
                    // Apply Mining Power multiplier (Infinity enchantment)
                    if (this.gameState.enchantments && this.gameState.enchantments.infinity > 0) {
                        const infinityMultiplier = 1 + (this.gameState.enchantments.infinity * 0.5);
                        blocksToAdd = Math.floor(blocksToAdd * infinityMultiplier);
                        this.gameState.miningPower = infinityMultiplier;
                    }
                    
                    // Apply chest profit multiplier
                    const profitMultiplier = this.getChestEffectMultiplier('profit_multiplier');
                    blocksToAdd = Math.floor(blocksToAdd * profitMultiplier);
                    
                    // Apply enchantment effects
                    if (this.gameState.enchantments) {
                        // Fortune enchantment - chance for bonus blocks
                        if (this.gameState.enchantments.fortune > 0) {
                            const fortuneLevel = this.gameState.enchantments.fortune;
                            const fortuneChance = fortuneLevel * 0.1; // 10% per level
                            if (Math.random() < fortuneChance) {
                                const bonusMultiplier = 1 + (Math.random() * fortuneLevel * 0.5); // Up to 50% bonus per level
                                blocksToAdd = Math.floor(blocksToAdd * blockMultiplier);
                                this.showNotification(`Fortune proc! ${Math.floor((bonusMultiplier - 1) * 100)}% bonus blocks!`, 'fortune');
                            }
                        }
                        
                        // Looting enchantment - chance for rare blocks
                        if (this.gameState.enchantments.looting > 0) {
                            const lootingLevel = this.gameState.enchantments.looting;
                            const lootingChance = lootingLevel * 0.15; // 15% per level
                            if (Math.random() < lootingChance) {
                                // Chance for rare block
                                const rareBlockTypes = ['Diamond Ore', 'Emerald Ore', 'Gold Ore', 'Iron Ore', 'Coal Ore'];
                                const rareBlock = rareBlockTypes[Math.floor(Math.random() * rareBlockTypes.length)];
                                this.gameState.rareBlocksFound++;
                                this.showNotification(`Rare ${rareBlock} found!`, 'rare');
                            }
                        }
                        
                        // Silk Touch enchantment - chance for special blocks
                        if (this.gameState.enchantments.silk_touch > 0) {
                            const silkTouchChance = 0.05; // 5% chance
                            if (Math.random() < silkTouchChance) {
                                const specialBlocks = ['Ancient Debris', 'End Stone', 'Nether Star', 'Dragon Egg'];
                                const specialBlock = specialBlocks[Math.floor(Math.random() * specialBlocks.length)];
                                if (!this.gameState.specialBlocksFound.includes(specialBlock)) {
                                    this.gameState.specialBlocksFound.push(specialBlock);
                                    this.showNotification(`Special ${specialBlock} collected!`, 'special');
                                }
                            }
                        }
                    }
                    
                    // Add blocks to main currency
                    this.gameState.blocks += blocksToAdd;
                    this.gameState.totalMined += blocksToAdd;
                }
                
                // Tool durability damage
                if (this.gameState.activeTool && !this.gameState.toolDurability[this.gameState.activeTool].isBroken) {
                    // Calculate durability loss
                    let durabilityLoss = 1;
                    
                    // Unbreaking reduces durability loss
                    if (this.gameState.enchantments && this.gameState.enchantments.unbreaking > 0) {
                        const unbreakingLevel = this.gameState.enchantments.unbreaking;
                        const durabilityReduction = 1 / (1 + unbreakingLevel); // Level 3 = 25% durability loss
                        if (Math.random() > durabilityReduction) {
                            durabilityLoss = 0; // Unbreaking proc - no durability loss
                        }
                    }
                    
                    this.gameState.toolDurability[this.gameState.activeTool].current -= durabilityLoss;
                    
                    // Check if tool broke
                    if (this.gameState.toolDurability[this.gameState.activeTool].current <= 0) {
                        this.gameState.toolDurability[this.gameState.activeTool].current = 0;
                        this.gameState.toolDurability[this.gameState.activeTool].isBroken = true;
                        this.showNotification(`Your ${this.gameState.activeTool.replace('_', ' ')} broke! Repair it or buy a new one.`, 'error');
                        
                        // Auto-switch to best available tool
                        this.autoSwitchToBestTool();
                    }
                }
                
                this.gameState.totalClicks += 1;
                this.gameState.lastClickTime = now;
                this.updateDisplay();
                this.checkAchievements();
                
                // Visual feedback for mining speed
                this.animateMiningSpeed(miningSpeedMultiplier);
                
                // Auto-save after each click
                this.autoSave();
            });
            console.log('Mining button event listener added');
        }

        // Upgrade cards
        document.addEventListener('click', (e) => {
            const upgradeElement = e.target.closest('.upgrade-item');
            if (upgradeElement && !upgradeElement.classList.contains('disabled')) {
                const upgradeId = upgradeElement.dataset.upgradeId;
                this.buyUpgrade(upgradeId);
            }
        });

        // Enchantment cards
        document.addEventListener('click', (e) => {
            const enchantmentElement = e.target.closest('.enchantment-item');
            if (enchantmentElement && !enchantmentElement.classList.contains('disabled')) {
                const enchantmentId = enchantmentElement.dataset.enchantmentId;
                this.buyEnchantment(enchantmentId);
            }
        });

        // Control buttons
        const saveButton = document.getElementById('saveButton');
        console.log('Save button found:', saveButton);
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                console.log('Save button clicked!', e);
                e.preventDefault();
                e.stopPropagation();
                this.saveGame();
                this.showNotification('Game saved!', 'success');
            });
            console.log('Save button event listener added');
        }

        const loadButton = document.getElementById('loadButton');
        if (loadButton) {
            loadButton.addEventListener('click', () => {
                if (this.loadGame()) {
                    this.showNotification('Game loaded!', 'success');
                }
            });
        }

        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset the game? This cannot be undone.')) {
                    this.resetGame();
                    this.showNotification('Game reset!', 'success');
                }
            });
        }

        // Skip block button
        const skipBlockButton = document.getElementById('skipBlockButton');
        if (skipBlockButton) {
            skipBlockButton.addEventListener('click', () => {
                this.skipBlock();
            });
        }
        

        // Auto-save when user leaves the page
        window.addEventListener('beforeunload', () => {
            this.autoSave();
        });

        // Account buttons
        const registerButton = document.getElementById('registerButton');
        if (registerButton) {
            registerButton.addEventListener('click', async () => {
                const username = document.getElementById('usernameInput').value;
                const password = document.getElementById('passwordInput').value;
                
                if (!username || !password) {
                    this.showNotification('Please enter both username and password!', 'error');
                    return;
                }

                const result = await this.registerUser(username, password);
                if (result.success) {
                    this.gameState.username = username;
                    this.gameState.password = password;
                    this.updateAccountDisplay();
                    this.showNotification('Registration successful!', 'success');
                } else {
                    this.showNotification(result.message || 'Registration failed!', 'error');
                }
            });
        }

        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', async () => {
                const username = document.getElementById('usernameInput').value;
                const password = document.getElementById('passwordInput').value;
                
                if (!username || !password) {
                    this.showNotification('Please enter both username and password!', 'error');
                    return;
                }

                const result = await this.loginUser(username, password);
                if (result.success) {
                    this.gameState.username = username;
                    this.gameState.password = password;
                    this.updateAccountDisplay();
                    this.showNotification('Login successful!', 'success');
                } else {
                    this.showNotification(result.message || 'Login failed!', 'error');
                }
            });
        }

        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                this.gameState.username = '';
                this.gameState.password = '';
                this.updateAccountDisplay();
                this.showNotification('Logged out!', 'success');
            });
        }

        const profileButton = document.getElementById('profileButton');
        if (profileButton) {
            profileButton.addEventListener('click', () => {
                window.location.href = '/minecraft-2.0/profile.html';
            });
        }

        // High score buttons
        const saveHighScoreButton = document.getElementById('saveHighScoreButton');
        if (saveHighScoreButton) {
            saveHighScoreButton.addEventListener('click', () => {
                this.saveHighScore();
            });
        }

        const showHighScoresButton = document.getElementById('showHighScoresButton');
        if (showHighScoresButton) {
                    showHighScoresButton.addEventListener('click', () => {
            window.location.href = '/minecraft-2.0/highscores.html';
        });
        }
        
        // Mystery chest click handler
        const mysteryChest = document.getElementById('mysteryChest');
        if (mysteryChest) {
            mysteryChest.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openMysteryChest();
            });
        }
    }

    updateAccountDisplay() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        const currentUsername = document.getElementById('currentUsername');

        if (this.gameState.username) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            currentUsername.textContent = `Logged in as: ${this.gameState.username}`;
        } else {
            loginForm.style.display = 'block';
            userInfo.style.display = 'none';
            currentUsername.textContent = '';
        }
    }

    // Achievement System Methods
    initializeAchievements() {
        // Initialize achievements from the centralized configuration
        this.achievements = AchievementsHelper.getAllAchievements().reduce((acc, achievement) => {
            acc[achievement.id] = {
                ...achievement,
                unlocked: false,
                unlockedAt: null
            };
            return acc;
        }, {});
        
        // Load any previously unlocked achievements from game state
        if (this.gameState.achievements) {
            Object.keys(this.gameState.achievements).forEach(achievementId => {
                if (this.achievements[achievementId]) {
                    this.achievements[achievementId].unlocked = this.gameState.achievements[achievementId].unlocked;
                    this.achievements[achievementId].unlockedAt = this.gameState.achievements[achievementId].unlockedAt;
                }
            });
        }
        
        this.renderAchievements();
    }

    renderAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;

        achievementsGrid.innerHTML = '';
        
        // Get achievements by category for better organization
        const categories = AchievementsHelper.getCategories();
        
        // Track if we have any session achievements to show
        let hasSessionAchievements = false;
        
        categories.forEach(category => {
            const categoryAchievements = AchievementsHelper.getAchievementsByCategory(category);
            
            // Filter achievements to only show:
            // 1. Per-game achievements (not per-account)
            // 2. Achievements unlocked in the current session
            const sessionAchievements = categoryAchievements.filter(achievement => {
                // Only show per_game achievements
                if (achievement.type !== 'per_game') {
                    return false;
                }
                
                // Only show achievements unlocked in the current session
                const achievementData = this.achievements[achievement.id];
                if (!achievementData || !achievementData.unlocked) {
                    return false;
                }
                
                // Check if achievement was unlocked after session start
                return achievementData.unlockedAt && achievementData.unlockedAt >= this.gameState.sessionStartTime;
            });
            
            // Only create category section if there are session achievements
            if (sessionAchievements.length > 0) {
                hasSessionAchievements = true;
                
                // Create category section
                const categorySection = document.createElement('div');
                categorySection.className = 'achievement-category';
                
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = this.formatCategoryName(category);
                categorySection.appendChild(categoryTitle);
                
                const categoryGrid = document.createElement('div');
                categoryGrid.className = 'achievements-category-grid';
                
                sessionAchievements.forEach(achievement => {
                    const achievementElement = this.createAchievementElement(achievement);
                    categoryGrid.appendChild(achievementElement);
                });
                
                categorySection.appendChild(categoryGrid);
                achievementsGrid.appendChild(categorySection);
            }
        });
        
        // If no session achievements, show a message
        if (!hasSessionAchievements) {
            const noAchievementsMessage = document.createElement('div');
            noAchievementsMessage.className = 'no-achievements-message';
            noAchievementsMessage.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #a0a0a0;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🏆</div>
                    <h3 style="color: #4CAF50; margin-bottom: 10px;">No Achievements Yet</h3>
                    <p>Start playing to earn achievements in this session!</p>
                    <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">
                        Only achievements earned in this game session are shown here.
                    </p>
                </div>
            `;
            achievementsGrid.appendChild(noAchievementsMessage);
        }
    }

    createAchievementElement(achievement) {
        const element = document.createElement('div');
        element.className = 'achievement-item';
        element.id = `achievement-${achievement.id}`;
        
        const isUnlocked = this.achievements[achievement.id]?.unlocked || false;
        
        if (isUnlocked) {
            element.classList.add('unlocked');
        } else if (achievement.hidden) {
            element.classList.add('hidden');
        }
        
        // Don't show reward for per_account achievements
        const rewardText = achievement.type === 'per_account' ? '' : `<div class="achievement-reward">Reward: ${this.formatNumber(achievement.reward)} blocks</div>`;
        
        element.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                ${rewardText}
                ${isUnlocked ? `<div class="achievement-unlocked">✓ Unlocked</div>` : ''}
            </div>
        `;
        
        return element;
    }

    formatCategoryName(category) {
        return category.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    checkAchievements() {
        // Safety check: ensure achievements are initialized
        if (!this.achievements) {
            console.warn('Achievements not initialized yet, skipping achievement check');
            return;
        }
        
        const achievements = AchievementsHelper.getAllAchievements();
        
        achievements.forEach(achievement => {
            if (this.achievements[achievement.id]?.unlocked) return; // Already unlocked
            
            if (this.checkAchievementCondition(achievement)) {
                this.unlockAchievement(achievement.id);
            }
        });

        // Check additional achievement categories
        this.checkTimeBasedAchievements();
        this.checkBrowserAchievements();
        this.checkMathematicalAchievements();
        this.checkPatternAchievements();
        this.checkResourceManagementAchievements();
        this.checkAdvancedChallengeAchievements();
        this.checkPsychologicalAchievements();
    }

    checkAchievementCondition(achievement) {
        switch (achievement.id) {
            case 'first_upgrade':
                return this.gameState.upgradesOwned >= 1;
            case 'ten_upgrades':
                return this.gameState.upgradesOwned >= 10;
            case 'hundred_upgrades':
                return this.gameState.upgradesOwned >= 100;
            case 'thousand_upgrades':
                return this.gameState.upgradesOwned >= 1000;
            case 'click_master':
                return this.gameState.totalClicks >= 1000;
            case 'click_legend':
                return this.gameState.totalClicks >= 10000;
            case 'click_god':
                return this.gameState.totalClicks >= 100000;
            case 'click_insanity':
                return this.gameState.totalClicks >= 1000000;
            case 'efficient_miner':
                return this.gameState.blocksPerClick >= 100;
            case 'super_efficient':
                return this.gameState.blocksPerClick >= 500;
            case 'ultra_efficient':
                return this.gameState.blocksPerClick >= 1000;
            case 'speed_demon':
                return this.gameState.blocksPerSecond >= 10000;
            case 'speed_legend':
                return this.gameState.blocksPerSecond >= 100000;
            case 'speed_god':
                return this.gameState.blocksPerSecond >= 1000000;
            case 'first_million':
                return this.gameState.totalMined >= 1000000;
            case 'first_billion':
                return this.gameState.totalMined >= 1000000000;
            case 'first_trillion':
                return this.gameState.totalMined >= 1000000000000;
            case 'bare_hands':
                return this.gameState.totalMined >= 10000 && this.gameState.upgradesOwned === 0;
            case 'bare_hands_master':
                return this.gameState.totalMined >= 100000 && this.gameState.upgradesOwned === 0;
            case 'wooden_only':
                return this.gameState.totalMined >= 10000 && 
                       this.gameState.upgrades['wooden_pickaxe'] > 0 && 
                       this.gameState.upgradesOwned === this.gameState.upgrades['wooden_pickaxe'];
            case 'stone_only':
                return this.gameState.totalMined >= 50000 && 
                       this.gameState.upgrades['stone_pickaxe'] > 0 && 
                       this.gameState.upgradesOwned === this.gameState.upgrades['stone_pickaxe'];
            case 'iron_only':
                return this.gameState.totalMined >= 250000 && 
                       this.gameState.upgrades['iron_pickaxe'] > 0 && 
                       this.gameState.upgradesOwned === this.gameState.upgrades['iron_pickaxe'];
            case 'diamond_only':
                return this.gameState.totalMined >= 1000000 && 
                       this.gameState.upgrades['diamond_pickaxe'] > 0 && 
                       this.gameState.upgradesOwned === this.gameState.upgrades['diamond_pickaxe'];
            case 'netherite_only':
                return this.gameState.totalMined >= 5000000 && 
                       this.gameState.upgrades['netherite_pickaxe'] > 0 && 
                       this.gameState.upgradesOwned === this.gameState.upgrades['netherite_pickaxe'];
            case 'secret_clicker':
                return this.gameState.totalClicks === 42;
            case 'lucky_seven':
                return this.gameState.blocksPerSecond === 777;
            case 'double_lucky':
                return this.gameState.blocksPerSecond === 7777;
            case 'triple_lucky':
                return this.gameState.blocksPerSecond === 77777;
            case 'perfect_balance':
                return this.gameState.blocksPerClick > 0 && 
                       this.gameState.blocksPerSecond > 0 && 
                       Math.abs(this.gameState.blocksPerClick - this.gameState.blocksPerSecond) < 1;
            case 'click_dominant':
                return this.gameState.blocksPerClick > 0 && 
                       this.gameState.blocksPerSecond > 0 && 
                       this.gameState.blocksPerClick >= this.gameState.blocksPerSecond * 10;
            case 'passive_dominant':
                return this.gameState.blocksPerClick > 0 && 
                       this.gameState.blocksPerSecond > 0 && 
                       this.gameState.blocksPerSecond >= this.gameState.blocksPerClick * 10;
            case 'tool_hoarder':
                return Object.keys(this.gameState.upgrades).length >= 20; // Assuming 20 different tool types
            case 'click_efficiency':
                return this.gameState.blocksPerClick >= 1000;
            case 'passive_efficiency':
                return this.gameState.blocksPerSecond >= 1000000;
            case 'achievement_hunter':
                return Object.values(this.achievements).filter(a => a.unlocked).length >= 50;
            case 'achievement_collector':
                return Object.values(this.achievements).filter(a => a.unlocked).length >= 100;
            case 'achievement_legend':
                return Object.values(this.achievements).filter(a => a.unlocked).length >= 200;
            default:
                return false;
        }
    }

    // Additional achievement checking methods
    checkTimeBasedAchievements() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const dayOfWeek = now.getDay();

        // Time precision achievements
        if (hour === 0 && minute === 0 && second === 0) {
            this.unlockAchievement('midnight_strike');
        }
        if (hour === 12 && minute === 0 && second === 0) {
            this.unlockAchievement('noon_strike');
        }
        if (second === 30) {
            this.unlockAchievement('second_precision');
        }

        // Time of day achievements
        if (hour >= 5 && hour < 7) {
            this.unlockAchievement('early_bird');
        }
        if (hour >= 23 || hour < 1) {
            this.unlockAchievement('night_owl');
        }

        // Day of week achievements
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            this.unlockAchievement('weekend_warrior');
        }

        // Seasonal achievements
        if (month >= 6 && month <= 8) {
            this.unlockAchievement('summer_gamer');
        }
        if (month === 12 || month <= 2) {
            this.unlockAchievement('winter_gamer');
        }

        // Holiday achievements
        if ((month === 1 && day === 1) || (month === 12 && day === 25) || (month === 10 && day === 31)) {
            this.unlockAchievement('holiday_spirit');
        }
    }

    checkBrowserAchievements() {
        // Only check browser achievements if achievements are properly initialized
        if (!this.achievements || Object.keys(this.achievements).length === 0) {
            console.log('Achievements not yet initialized, skipping browser achievement check');
            return;
        }

        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
        const isFirefox = /Firefox/.test(userAgent);
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

        if (isMobile) {
            if (!this.achievements['mobile_player']?.unlocked) {
                this.unlockAchievement('mobile_player');
            }
        } else {
            if (!this.achievements['desktop_player']?.unlocked) {
                this.unlockAchievement('desktop_player');
            }
        }

        if (isChrome) {
            if (!this.achievements['chrome_user']?.unlocked) {
                this.unlockAchievement('chrome_user');
            }
        }
        if (isFirefox) {
            if (!this.achievements['firefox_user']?.unlocked) {
                this.unlockAchievement('firefox_user');
            }
        }
        if (isSafari) {
            if (!this.achievements['safari_user']?.unlocked) {
                this.unlockAchievement('safari_user');
            }
        }
    }

    checkMathematicalAchievements() {
        const blocks = this.gameState.blocks;
        const totalClicks = this.gameState.totalClicks;
        const blocksPerSecond = this.gameState.blocksPerSecond;

        // Mathematical constants
        if (blocks === 314159) {
            this.unlockAchievement('pi_master');
        }
        if (blocks === 271828) {
            this.unlockAchievement('e_master');
        }
        if (blocks === 161803) {
            this.unlockAchievement('golden_ratio');
        }

        // Special numbers
        if (blocks === 1337) {
            this.unlockAchievement('doge_miner');
        }
        if (blocks === 420) {
            this.unlockAchievement('pepe_miner');
        }

        // Minecraft references
        if (blocks === 64) {
            this.unlockAchievement('minecraft_reference');
        }
        if (blocks === 576) {
            this.unlockAchievement('diamond_blocks');
        }
        if (blocks === 640) {
            this.unlockAchievement('nether_portal');
        }
        if (blocks === 128) {
            this.unlockAchievement('ender_pearl');
        }

        // Lucky numbers
        if (blocksPerSecond === 777 || blocksPerSecond === 7777 || blocksPerSecond === 77777 || blocksPerSecond === 777777) {
            this.unlockAchievement('lucky_numbers');
        }
        if (blocksPerSecond === 666 || blocksPerSecond === 6666 || blocksPerSecond === 66666 || blocksPerSecond === 666666) {
            this.unlockAchievement('unlucky_numbers');
        }
    }

    checkPatternAchievements() {
        const blocks = this.gameState.blocks;
        const totalClicks = this.gameState.totalClicks;

        // Palindrome blocks - trigger at exactly 112233445566778899
        if (blocks === 112233445566778899) {
            this.unlockAchievement('palindrome_master');
        }

        // Sequential numbers - trigger at exactly 1234567890
        if (blocks === 1234567890) {
            this.unlockAchievement('sequential_master');
        }

        // Repeating patterns
        const repeatingPatterns = [123, 1234, 12345, 123456, 1234567, 12345678, 123456789];
        if (repeatingPatterns.includes(blocks)) {
            this.unlockAchievement('repeating_pattern');
        }

        // All same digits
        const allOnes = [111, 1111, 11111, 111111, 1111111, 11111111, 111111111];
        const allTwos = [222, 2222, 22222, 222222, 2222222, 22222222, 222222222];
        const allThrees = [333, 3333, 33333, 333333, 3333333, 33333333, 333333333];
        const allFours = [444, 4444, 44444, 444444, 4444444, 44444444, 444444444];
        const allFives = [555, 5555, 55555, 555555, 5555555, 55555555, 555555555];
        const allSixes = [666, 6666, 66666, 666666, 6666666, 66666666, 666666666];
        const allSevens = [777, 7777, 77777, 777777, 7777777, 77777777, 777777777];
        const allEights = [888, 8888, 88888, 888888, 8888888, 88888888, 888888888];
        const allNines = [999, 9999, 99999, 999999, 9999999, 99999999, 999999999];

        if (allOnes.includes(blocks)) this.unlockAchievement('all_ones');
        if (allTwos.includes(blocks)) this.unlockAchievement('all_twos');
        if (allThrees.includes(blocks)) this.unlockAchievement('all_threes');
        if (allFours.includes(blocks)) this.unlockAchievement('all_fours');
        if (allFives.includes(blocks)) this.unlockAchievement('all_fives');
        if (allSixes.includes(blocks)) this.unlockAchievement('all_sixes');
        if (allSevens.includes(blocks)) this.unlockAchievement('all_sevens');
        if (allEights.includes(blocks)) this.unlockAchievement('all_eights');
        if (allNines.includes(blocks)) this.unlockAchievement('all_nines');

        // Round numbers
        if (blocks === 100) {
            this.unlockAchievement('round_100');
        }
        if (blocks === 1000) {
            this.unlockAchievement('round_1000');
        }
        if (blocks === 10000) {
            this.unlockAchievement('round_10000');
        }
        if (blocks === 100000) {
            this.unlockAchievement('round_100000');
        }
        if (blocks === 1000000) {
            this.unlockAchievement('round_1000000');
        }
        if (blocks === 10000000) {
            this.unlockAchievement('round_10000000');
        }
        if (blocks === 100000000) {
            this.unlockAchievement('round_100000000');
        }
        if (blocks === 1000000000) {
            this.unlockAchievement('round_1000000000');
        }
    }

    checkResourceManagementAchievements() {
        const blocks = this.gameState.blocks;
        const upgradesOwned = this.gameState.upgradesOwned;
        const totalSpent = this.calculateTotalSpent();

        if (blocks >= 100000 && upgradesOwned === 0) {
            this.unlockAchievement('frugal_miner');
        }
        if (blocks >= 1000000 && upgradesOwned === 0) {
            this.unlockAchievement('hoarder');
        }
        if (totalSpent >= 1000000) {
            this.unlockAchievement('spendthrift');
        }
        if (totalSpent >= 100000000) {
            this.unlockAchievement('big_spender');
        }
    }

    calculateTotalSpent() {
        let total = 0;
        Object.keys(this.gameState.upgrades).forEach(upgradeId => {
            const upgrade = this.upgrades.find(u => u.id === upgradeId);
            if (upgrade) {
                const owned = this.gameState.upgrades[upgradeId];
                for (let i = 0; i < owned; i++) {
                    total += this.calculateUpgradeCost(upgrade, i);
                }
            }
        });
        return total;
    }

    checkAdvancedChallengeAchievements() {
        const blocks = this.gameState.blocks;
        const upgradesOwned = this.gameState.upgradesOwned;
        const blocksPerClick = this.gameState.blocksPerClick;
        const blocksPerSecond = this.gameState.blocksPerSecond;

        if (blocks >= 1000000 && upgradesOwned === 0) {
            this.unlockAchievement('no_upgrade_challenge');
        }
        if (this.gameState.totalClicks >= 100000 && blocksPerSecond === 0) {
            this.unlockAchievement('click_only_challenge');
        }
        if (blocksPerSecond >= 10000 && blocksPerClick === 1) {
            this.unlockAchievement('passive_only_challenge');
        }
        if (Math.abs(blocksPerClick - blocksPerSecond) < 1 && blocksPerClick > 0) {
            this.unlockAchievement('balanced_challenge');
        }
    }

    checkPsychologicalAchievements() {
        const playTime = this.gameState.playTime;
        const lastClickTime = this.gameState.lastClickTime || 0;
        const currentTime = Date.now();

        // Patience master - 5 minutes without clicking (only if user has clicked at least once)
        if (this.gameState.totalClicks > 0 && currentTime - lastClickTime >= 300000) { // 5 minutes
            this.unlockAchievement('patience_master');
        }

        // Focus master - 30 minutes without tab switching
        if (playTime >= 1800) { // 30 minutes
            this.unlockAchievement('focus_master');
        }

        // Wojak miner - 4 hours straight
        if (playTime >= 14400) { // 4 hours
            this.unlockAchievement('wojak_miner');
        }
    }

    unlockAchievement(achievementId) {
        if (!this.achievements[achievementId] || this.achievements[achievementId].unlocked) {
            return;
        }

        const achievement = this.achievements[achievementId];
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();

        // Update game state
        if (!this.gameState.achievements) {
            this.gameState.achievements = {};
        }
        this.gameState.achievements[achievementId] = {
            unlocked: true,
            unlockedAt: achievement.unlockedAt
        };

        // Handle different achievement types
        if (achievement.type === 'per_account' || achievement.reward === 0) {
            // Per-account achievements or zero-reward achievements: no rewards, permanent
            this.showNotification(`🏆 Achievement Unlocked: ${achievement.name}!`, 'achievement');
        } else {
            // Per-game achievements with rewards: give rewards
            this.gameState.blocks += achievement.reward;
            this.gameState.totalMined += achievement.reward;
            this.showNotification(`🏆 Achievement Unlocked: ${achievement.name}! +${this.formatNumber(achievement.reward)} blocks`, 'achievement');
        }

        // Update display
        this.updateDisplay();
        this.renderAchievements();
        this.saveGame();
        // Also auto-save to ensure immediate persistence
        this.autoSave();
    }

    startGameLoop() {
        setInterval(() => {
            // Add passive income if user has any passive income upgrades
            if (this.gameState.blocksPerSecond > 0) {
                // Apply chest speed multipliers
                const speedMultiplier = this.getChestEffectMultiplier('speed_multiplier') * this.getChestEffectMultiplier('speed_penalty');
                const adjustedBlocksPerSecond = Math.floor(this.gameState.blocksPerSecond * speedMultiplier);
                
                console.log(`Adding ${adjustedBlocksPerSecond} blocks per second (${speedMultiplier}x multiplier). Current blocks: ${this.gameState.blocks}`);
                this.gameState.blocks += adjustedBlocksPerSecond;
                this.gameState.totalMined += adjustedBlocksPerSecond;
                console.log(`After adding: ${this.gameState.blocks} blocks`);
            }
            
            // Handle tool repair (Mending enchantment)
            if (this.gameState.activeTool && this.gameState.toolDurability[this.gameState.activeTool]) {
                const toolDurability = this.gameState.toolDurability[this.gameState.activeTool];
                if (toolDurability.isBroken || toolDurability.current < toolDurability.max) {
                    if (this.gameState.enchantments && this.gameState.enchantments.mending > 0) {
                        const mendingLevel = this.gameState.enchantments.mending;
                        const repairRate = mendingLevel * 2; // 2 durability per second per level
                        
                        toolDurability.current = Math.min(
                            toolDurability.current + repairRate,
                            toolDurability.max
                        );
                        
                        // Check if tool is fully repaired
                        if (toolDurability.isBroken && toolDurability.current >= toolDurability.max) {
                            toolDurability.isBroken = false;
                            this.showNotification(`Your ${this.gameState.activeTool.replace('_', ' ')} has been repaired!`, 'success');
                        }
                    }
                }
            }
            
            // Handle chest spawning
            this.handleChestSpawning();
            
            // Handle active chest effects
            this.updateChestEffects();
            
            this.updateDisplay();
        }, 1000);

        // Auto-save every 10 seconds
        setInterval(() => {
            this.autoSave();
        }, 10000);
    }

    formatNumber(num) {
        if (num < 1000) return num.toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num < 1000000000000000) return (num / 1000000000000).toFixed(1) + 'T';
        if (num < 1000000000000000000) return (num / 1000000000000000).toFixed(1) + 'Q';
        return (num / 1000000000000000000).toFixed(1) + 'Qt';
    }
    
    
    
    generateNewBlock() {
        // Define block types with proper rarity, health, block value, and mining requirements
        const blockTypes = [
            { 
                name: 'Grass Block', 
                chance: 0.40, // 40% - most common (1 in 2.5)
                health: 1,
                requiredTool: null, // Can mine with bare hands
                blockReward: 1,
                blockValue: 1, // Least valuable
                color: '#8B4513',
                image: 'assets/blocks/grass.png',
                rarity: 'Common',
                rarityColor: '#FFFFFF'
            },
            { 
                name: 'Dirt Block', 
                chance: 0.30, // 30% - very common (1 in 3.3)
                health: 1,
                requiredTool: null, // Can mine with bare hands
                blockReward: 1,
                blockValue: 1, // Least valuable
                color: '#8B4513',
                image: 'assets/blocks/dirt.png',
                rarity: 'Common',
                rarityColor: '#FFFFFF'
            },
            { 
                name: 'Cobblestone', 
                chance: 0.15, // 15% - common (1 in 6.7)
                health: 5,
                requiredTool: 'wooden_pickaxe', // Need at least wooden pickaxe
                blockReward: 2,
                blockValue: 5, // Low value
                color: '#808080',
                image: 'assets/blocks/cobblestone.png',
                rarity: 'Common',
                rarityColor: '#FFFFFF'
            },
            { 
                name: 'Coal Ore', 
                chance: 0.08, // 8% - uncommon (1 in 12.5)
                health: 10,
                requiredTool: 'wooden_pickaxe', // Need at least wooden pickaxe
                blockReward: 3,
                blockValue: 10, // Low-medium value
                color: '#2F2F2F',
                image: 'assets/blocks/coal.png',
                rarity: 'Uncommon',
                rarityColor: '#1EFF00'
            },
            { 
                name: 'Iron Ore', 
                chance: 0.04, // 4% - rare (1 in 25)
                health: 20,
                requiredTool: 'stone_pickaxe', // Need at least stone pickaxe
                blockReward: 5,
                blockValue: 25, // Medium value
                color: '#C0C0C0',
                image: 'assets/blocks/iron.png',
                rarity: 'Rare',
                rarityColor: '#0070DD'
            },
            { 
                name: 'Gold Ore', 
                chance: 0.015, // 1.5% - very rare (1 in 67)
                health: 30,
                requiredTool: 'iron_pickaxe', // Need at least iron pickaxe
                blockReward: 8,
                blockValue: 50, // Medium-high value
                color: '#FFD700',
                image: 'assets/blocks/gold.png',
                rarity: 'Very Rare',
                rarityColor: '#B8860B'
            },
            { 
                name: 'Diamond Ore', 
                chance: 0.004, // 0.4% - extremely rare (1 in 250)
                health: 40,
                requiredTool: 'iron_pickaxe', // Need at least iron pickaxe
                blockReward: 12,
                blockValue: 100, // High value
                color: '#00BFFF',
                image: 'assets/blocks/diamond.png',
                rarity: 'Epic',
                rarityColor: '#A335EE'
            },
            { 
                name: 'Emerald Ore', 
                chance: 0.0025, // 0.25% - extremely rare (1 in 400)
                health: 50,
                requiredTool: 'iron_pickaxe', // Need at least iron pickaxe
                blockReward: 15,
                blockValue: 150, // Very high value
                color: '#32CD32',
                image: 'assets/blocks/emerald.png',
                rarity: 'Legendary',
                rarityColor: '#FF8000'
            },
            { 
                name: 'Netherite Ore', 
                chance: 0.0005, // 0.05% - ultra rare (1 in 2000)
                health: 100,
                requiredTool: 'diamond_pickaxe', // Need at least diamond pickaxe
                blockReward: 25,
                blockValue: 500, // Most valuable
                color: '#8B008B',
                image: 'assets/blocks/netherite.png',
                rarity: 'Mythic',
                rarityColor: '#E6CC80'
            },
            { 
                name: 'Mystery Chest', 
                chance: 0.0015, // 0.15% - ultra rare (1 in 670)
                health: 1, // Easy to break but very rare
                requiredTool: null, // Can break with bare hands
                blockReward: 0, // Special chest - no direct block value
                blockValue: 0, // Special chest - rewards are random
                color: '#8B4513',
                image: 'assets/blocks/gold.png', // Using gold block as placeholder for chest
                rarity: 'Mystery',
                rarityColor: '#FFD700',
                isSpecial: true // Mark as special chest
            }
        ];
        
        // Generate random block based on chances
        const roll = Math.random();
        let cumulativeChance = 0;
        let selectedBlock = blockTypes[0]; // Default to grass block
        
        for (const blockType of blockTypes) {
            cumulativeChance += blockType.chance;
            if (roll < cumulativeChance) {
                selectedBlock = blockType;
                break;
            }
        }
        
        // Set block properties
        this.gameState.currentBlockName = selectedBlock.name;
        this.gameState.currentBlockHealth = selectedBlock.health;
        this.gameState.maxBlockHealth = selectedBlock.health;
        this.gameState.blockDamageDealt = 0;
        this.gameState.currentBlockReward = selectedBlock.blockReward;
        this.gameState.currentBlockRequiredTool = selectedBlock.requiredTool;
        this.gameState.currentBlockColor = selectedBlock.color;
        this.gameState.currentBlockImage = selectedBlock.image;
        this.gameState.currentBlockBitcoinValue = selectedBlock.blockValue;
        this.gameState.currentBlockRarity = selectedBlock.rarity;
        this.gameState.currentBlockRarityColor = selectedBlock.rarityColor;
        this.gameState.currentBlockChance = selectedBlock.chance;
        
        // Check if player can mine this block
        this.checkBlockMineability();
        
        // Update the block image on the mining button
        this.updateBlockImage();
        
        // Update block display with rarity information
        this.updateBlockDisplay();
        
        // Show rarity notification for rare blocks
        if (selectedBlock.chance < 0.1) { // Less than 10% chance
            const chanceText = selectedBlock.chance < 0.01 ? 
                `1 in ${Math.round(1/selectedBlock.chance)}` : 
                `${(selectedBlock.chance * 100).toFixed(1)}%`;
            
            this.showNotification(
                `✨ ${selectedBlock.rarity} ${selectedBlock.name} Found! ✨<br>` +
                `Spawn Chance: ${chanceText}<br>` +
                `Health: ${selectedBlock.health} clicks`,
                'rare'
            );
        }
        
        console.log(`Generated block: ${selectedBlock.name} (Health: ${selectedBlock.health}, Required Tool: ${selectedBlock.requiredTool || 'None'}, Rarity: ${selectedBlock.rarity})`);
    }
    
    openMysteryChest() {
        // Define 67 different rewards (good and bad)
        const chestRewards = [
            // Amazing rewards (1-5)
            { type: 'blocks', amount: 1000000, message: 'Jackpot! +1,000,000 blocks!', color: '#00FF00' },
            { type: 'blocks', amount: 500000, message: 'Massive Win! +500,000 blocks!', color: '#00FF00' },
            { type: 'blocks', amount: 250000, message: 'Huge Reward! +250,000 blocks!', color: '#00FF00' },
            { type: 'blocks', amount: 100000, message: 'Big Win! +100,000 blocks!', color: '#00FF00' },
            { type: 'blocks', amount: 50000, message: 'Great Find! +50,000 blocks!', color: '#00FF00' },
            
            // Very good rewards (6-15)
            { type: 'blocks', amount: 25000, message: 'Nice Reward! +25,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 20000, message: 'Good Fortune! +20,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 15000, message: 'Lucky Find! +15,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 12000, message: 'Sweet Reward! +12,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 10000, message: 'Decent Haul! +10,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 8000, message: 'Not Bad! +8,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 6000, message: 'Fair Reward! +6,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 5000, message: 'Decent Find! +5,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 4000, message: 'Okay Reward! +4,000 blocks!', color: '#90EE90' },
            { type: 'blocks', amount: 3000, message: 'Small Win! +3,000 blocks!', color: '#90EE90' },
            
            // Good rewards (16-25)
            { type: 'blocks', amount: 2500, message: 'Good Find! +2,500 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 2000, message: 'Nice! +2,000 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 1500, message: 'Decent! +1,500 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 1200, message: 'Okay! +1,200 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 1000, message: 'Fair! +1,000 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 800, message: 'Not Bad! +800 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 600, message: 'Decent! +600 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 500, message: 'Okay! +500 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 400, message: 'Fair! +400 blocks!', color: '#98FB98' },
            { type: 'blocks', amount: 300, message: 'Small! +300 blocks!', color: '#98FB98' },
            
            // Neutral rewards (26-35)
            { type: 'blocks', amount: 250, message: 'Meh... +250 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 200, message: 'Okay... +200 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 150, message: 'Fine... +150 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 100, message: 'Whatever... +100 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 75, message: 'Meh... +75 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 50, message: 'Okay... +50 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 25, message: 'Fine... +25 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 10, message: 'Whatever... +10 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 5, message: 'Meh... +5 blocks', color: '#FFFF99' },
            { type: 'blocks', amount: 1, message: 'Really? +1 block', color: '#FFFF99' },
            
            // Bad rewards (36-50)
            { type: 'blocks', amount: -1000, message: 'Oops! -1,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -2000, message: 'Bad Luck! -2,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -3000, message: 'Unlucky! -3,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -4000, message: 'Rough! -4,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -5000, message: 'Tough Break! -5,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -6000, message: 'Bad Day! -6,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -8000, message: 'Unlucky! -8,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -10000, message: 'Rough! -10,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -15000, message: 'Tough Break! -15,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -20000, message: 'Bad Day! -20,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -25000, message: 'Unlucky! -25,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -30000, message: 'Rough! -30,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -40000, message: 'Tough Break! -40,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -50000, message: 'Bad Day! -50,000 blocks', color: '#FFB6C1' },
            { type: 'blocks', amount: -75000, message: 'Unlucky! -75,000 blocks', color: '#FFB6C1' },
            
            // Terrible rewards (51-62)
            { type: 'blocks', amount: -100000, message: 'Disaster! -100,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -150000, message: 'Catastrophe! -150,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -200000, message: 'Disaster! -200,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -300000, message: 'Catastrophe! -300,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -400000, message: 'Disaster! -400,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -500000, message: 'Catastrophe! -500,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -750000, message: 'Disaster! -750,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -1000000, message: 'Catastrophe! -1,000,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -1500000, message: 'Disaster! -1,500,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -2000000, message: 'Catastrophe! -2,000,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -3000000, message: 'Disaster! -3,000,000 blocks', color: '#FF6B6B' },
            { type: 'blocks', amount: -4000000, message: 'Catastrophe! -4,000,000 blocks', color: '#FF6B6B' },
            
            // Extreme rewards (63-67)
            { type: 'blocks', amount: -5000000, message: 'DEVASTATING! -5,000,000 blocks', color: '#FF0000' },
            { type: 'blocks', amount: -6825742, message: 'CATASTROPHIC! -6,825,742 blocks', color: '#FF0000' },
            { type: 'blocks', amount: -10000000, message: 'APOCALYPTIC! -10,000,000 blocks', color: '#FF0000' },
            { type: 'blocks', amount: -20000000, message: 'WORLD ENDING! -20,000,000 blocks', color: '#FF0000' },
            { type: 'blocks', amount: -50000000, message: 'UNIVERSE DESTROYING! -50,000,000 blocks', color: '#FF0000' }
        ];
        
        // Pick a random reward
        const reward = chestRewards[Math.floor(Math.random() * chestRewards.length)];
        
        // Apply the reward
        if (reward.type === 'blocks') {
            // Ensure player can't go below 0 blocks (unless it's a massive loss)
            if (reward.amount < 0 && Math.abs(reward.amount) > this.gameState.blocks) {
                // For massive losses, set to 0 instead of negative
                if (Math.abs(reward.amount) > 1000000) {
                    this.gameState.blocks = 0;
                } else {
                    this.gameState.blocks = Math.max(0, this.gameState.blocks + reward.amount);
                }
            } else {
                this.gameState.blocks += reward.amount;
            }
        }
        
        // Show the reward notification
        this.showNotification(`<strong>🎁 Mystery Chest Opened!</strong><br>${reward.message}`, 'chest');
        
        // Add some visual flair for big rewards/losses
        if (Math.abs(reward.amount) >= 100000) {
            // Create particle effects for big rewards
            this.createChestParticles(reward.amount > 0);
        }
        
        // Update display
        this.updateDisplay();
        
        console.log(`Mystery chest opened: ${reward.message} (${reward.amount} blocks)`);
    }
    
    createChestParticles(isPositive) {
        // Create visual particles for chest rewards
        const miningButton = document.getElementById('bitcoinButton');
        if (!miningButton) return;
        
        const rect = miningButton.getBoundingClientRect();
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = (rect.left + rect.width / 2) + 'px';
            particle.style.top = (rect.top + rect.height / 2) + 'px';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.backgroundColor = isPositive ? '#00FF00' : '#FF0000';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            particle.style.transition = 'all 2s ease-out';
            
            document.body.appendChild(particle);
            
            // Animate particle
            setTimeout(() => {
                const angle = (i / particleCount) * Math.PI * 2;
                const distance = 100 + Math.random() * 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = '0';
            }, 10);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2100);
        }
    }
    
    checkBlockMineability() {
        const requiredTool = this.gameState.currentBlockRequiredTool;
        
        if (!requiredTool) {
            // Can mine with bare hands
            this.gameState.canMineCurrentBlock = true;
            this.gameState.miningBlockedReason = null;
            return;
        }
        
        // Define tool tiers (higher index = better tool)
        const toolTiers = [
            'wooden_pickaxe',
            'stone_pickaxe', 
            'iron_pickaxe',
            'diamond_pickaxe',
            'netherite_pickaxe'
        ];
        
        // Find the required tool's tier
        const requiredToolTier = toolTiers.indexOf(requiredTool);
        if (requiredToolTier === -1) {
            // Unknown tool requirement
            this.gameState.canMineCurrentBlock = false;
            this.gameState.miningBlockedReason = `Unknown tool requirement: ${requiredTool}`;
            return;
        }
        
        // Check if player has any tool of the required tier or better
        let hasSuitableTool = false;
        let bestAvailableTool = null;
        
        for (let i = requiredToolTier; i < toolTiers.length; i++) {
            const toolId = toolTiers[i];
            if (this.gameState.upgrades[toolId] && this.gameState.upgrades[toolId] > 0) {
                // Check if this tool is broken
                if (this.gameState.toolDurability[toolId] && !this.gameState.toolDurability[toolId].isBroken) {
                    hasSuitableTool = true;
                    bestAvailableTool = toolId;
                    break;
                }
            }
        }
        
        if (hasSuitableTool) {
            this.gameState.canMineCurrentBlock = true;
            this.gameState.miningBlockedReason = null;
            
            // Auto-switch to the best available tool if current tool is worse
            if (this.gameState.activeTool) {
                const currentToolTier = toolTiers.indexOf(this.gameState.activeTool);
                if (currentToolTier < requiredToolTier || 
                    (this.gameState.toolDurability[this.gameState.activeTool] && 
                     this.gameState.toolDurability[this.gameState.activeTool].isBroken)) {
                    // Switch to a better tool
                    this.gameState.activeTool = bestAvailableTool;
                    this.showNotification(`Auto-switched to ${bestAvailableTool.replace('_', ' ')} for better mining!`, 'info');
                }
            }
        } else {
            this.gameState.canMineCurrentBlock = false;
            const toolName = requiredTool.replace('_', ' ');
            this.gameState.miningBlockedReason = `You need a ${toolName} or better to mine ${this.gameState.currentBlockName}!`;
        }
    }
    
    animateMiningSpeed(speedMultiplier) {
        const miningButton = document.getElementById('bitcoinButton');
        if (miningButton) {
            // Add visual feedback for faster mining
            miningButton.style.transform = 'scale(0.95)';
            const duration = 100 / speedMultiplier;
            setTimeout(() => {
                miningButton.style.transform = 'scale(1)';
            }, duration);
            
            // Add particle effect for high speed mining
            if (speedMultiplier > 1.5) {
                this.createMiningParticle();
            }
        }
    }
    
    createMiningParticle() {
        const miningButton = document.getElementById('bitcoinButton');
        if (!miningButton) return;
        
        const particle = document.createElement('div');
        particle.className = 'mining-particle';
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = '#ffd700';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const rect = miningButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 50;
        const y = rect.top + rect.height / 2;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-50px) scale(0)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.innerHTML = message;
        notification.className = `notification ${type} show`;
        
        // Add different colors/styles based on type
        switch(type) {
            case 'fortune':
                notification.style.backgroundColor = '#4CAF50';
                notification.style.borderColor = '#45a049';
                break;
            case 'rare':
                notification.style.backgroundColor = '#9C27B0';
                notification.style.borderColor = '#7B1FA2';
                break;
            case 'special':
                notification.style.backgroundColor = '#FF9800';
                notification.style.borderColor = '#F57C00';
                break;
            case 'error':
                notification.style.backgroundColor = '#f44336';
                notification.style.borderColor = '#da190b';
                break;
            case 'achievement':
                notification.style.backgroundColor = '#2196F3';
                notification.style.borderColor = '#1976D2';
                break;
            case 'chest':
                notification.style.backgroundColor = '#FFD700';
                notification.style.borderColor = '#FFA500';
                notification.style.color = '#000';
                break;
            default:
                notification.style.backgroundColor = '#333';
                notification.style.borderColor = '#555';
        }

        setTimeout(() => {
            notification.classList.remove('show');
            // Reset styles after hiding
            notification.style.backgroundColor = '';
            notification.style.borderColor = '';
        }, 3000);
    }

    autoSave() {
        // Only auto-save if the user has made some progress
        if (this.gameState.totalClicks > 0 || this.gameState.totalMined > 0) {
            this.saveGame();
        }
    }

    saveGame() {
        try {
            const saveData = {
                ...this.gameState,
                saveTime: Date.now()
            };

            localStorage.setItem('minecraftClickerSave', JSON.stringify(saveData));
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }

    loadGame() {
        try {
            const saveData = localStorage.getItem('minecraftClickerSave');
            if (saveData) {
                const loadedState = JSON.parse(saveData);
                
                // Validate save data structure
                if (!loadedState || typeof loadedState !== 'object') {
                    throw new Error('Invalid save data format');
                }
                
                // Merge with current game state to handle missing properties
                const mergedState = {
                    blocks: 0,
                    blocksPerClick: 1,
                    blocksPerSecond: 0,
                    totalMined: 0,
                    totalClicks: 0,
                    upgradesOwned: 0,
                    startTime: Date.now(),
                    playTime: 0,
                    upgrades: {},
                    enchantments: {},
                    achievements: {},
                    username: '',
                    password: '',
                    highScore: 0,
                    lastClickTime: 0,
                    sessionStartTime: Date.now(), // Always set to current time for new session
                    rebirthCount: 0,
                    currentBlockTier: 0,
                    currentBlockMultiplier: 1,
                    currentBlockName: 'Grass Block',
                    // New game mechanics defaults
                    toolDurability: {
                        wooden_pickaxe: { current: 0, max: 60, isBroken: false },
                        stone_pickaxe: { current: 0, max: 132, isBroken: false },
                        iron_pickaxe: { current: 0, max: 251, isBroken: false },
                        diamond_pickaxe: { current: 0, max: 1562, isBroken: false },
                        netherite_pickaxe: { current: 0, max: 2032, isBroken: false }
                    },
                    // Current active tool
                    activeTool: null,
                    // Mining speed system
                    miningSpeed: 1.0,
                    miningCooldown: 0,
                    currentBlockHealth: 1,
                    maxBlockHealth: 1,
                    blockDamageDealt: 0,
                    currentBlockReward: 1,
                    currentBlockRequiredTool: null,
                    currentBlockColor: '#8B4513',
                    currentBlockImage: 'assets/blocks/grass.png',
                    canMineCurrentBlock: true,
                    miningBlockedReason: null,
                    rareBlocksFound: 0,
                    specialBlocksFound: [],
                    miningPower: 1.0,
                    ...loadedState
                };
                
                // Ensure numeric values are properly converted to numbers
                mergedState.blocks = Number(mergedState.blocks) || 0;
                mergedState.blocksPerClick = Number(mergedState.blocksPerClick) || 1;
                mergedState.blocksPerSecond = Number(mergedState.blocksPerSecond) || 0;
                mergedState.totalMined = Number(mergedState.totalMined) || 0;
                mergedState.totalClicks = Number(mergedState.totalClicks) || 0;
                mergedState.upgradesOwned = Number(mergedState.upgradesOwned) || 0;
                mergedState.highScore = Number(mergedState.highScore) || 0;
                mergedState.lastClickTime = Number(mergedState.lastClickTime) || 0;
                

                
                // Calculate play time correctly
                const currentTime = Date.now();
                const saveTime = loadedState.saveTime || currentTime;
                const timeSinceSave = currentTime - saveTime;
                
                this.gameState = mergedState;
                this.gameState.startTime = currentTime - (timeSinceSave + (loadedState.playTime || 0));
                this.gameState.sessionStartTime = currentTime; // Ensure session starts now
                
                // Recalculate enchantment effects after loading
                this.recalculateEnchantmentEffects();
                
                // Generate a new block and check mineability
                this.generateNewBlock();
                
                // Update block visual after loading
                this.updateBlockVisual();
                
                this.updateDisplayWithoutAchievements();
                this.renderUpgrades();
                this.renderEnchantments();
                this.renderAchievements();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to load game:', error);
            this.showNotification('Failed to load save data. Starting fresh game.', 'error');
            return false;
        }
    }

    resetGame() {
        // Preserve per_account achievements
        const perAccountAchievements = {};
        if (this.gameState.achievements) {
            Object.keys(this.gameState.achievements).forEach(achievementId => {
                if (this.achievements[achievementId]?.type === 'per_account') {
                    perAccountAchievements[achievementId] = this.gameState.achievements[achievementId];
                }
            });
        }
        
        this.gameState = {
            blocks: 0,
            blocksPerClick: 1,
            blocksPerSecond: 0,
            totalMined: 0,
            totalClicks: 0,
            upgradesOwned: 0,
            startTime: Date.now(),
            playTime: 0,
            upgrades: {},
            enchantments: {},
            achievements: perAccountAchievements, // Preserve per_account achievements
            username: this.gameState.username,
            password: this.gameState.password,
            highScore: this.gameState.highScore,
            lastClickTime: 0,
            sessionStartTime: Date.now(), // Reset session start time
            rebirthCount: 0,
            currentBlockTier: 0,
            currentBlockMultiplier: 1,
            currentBlockName: 'Grass Block'
        };
        
        localStorage.removeItem('minecraftClickerSave');
        this.recalculateEnchantmentEffects();
        this.updateBlockVisual();
        this.updateDisplayWithoutAchievements();
        this.renderUpgrades();
        this.renderEnchantments();
        this.renderAchievements();
        console.log('resetGame() completed');
    }

    setUsername(username) {
        if (username && username.trim()) {
            this.gameState.username = username.trim();
            this.saveGame();
            this.updateDisplay();
            this.showNotification(`Username set to: ${this.gameState.username}`, 'success');
        }
    }

    async checkUsernameAvailability(username) {
        try {
            const response = await fetch('/minecraft-2.0/api/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username.trim() })
            });
            const data = await response.json();
            return data.success && data.available;
        } catch (error) {
            console.error('Failed to check username:', error);
            return false;
        }
    }

    async registerUser(username, password) {
        try {
            const response = await fetch('/minecraft-2.0/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to register user:', error);
            return { success: false, message: 'Registration failed' };
        }
    }

    async loginUser(username, password) {
        try {
            const response = await fetch('/minecraft-2.0/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to login user:', error);
            return { success: false, message: 'Login failed' };
        }
    }

    async getHighScores() {
        try {
            const response = await fetch('/minecraft-2.0/api/highscores');
            const data = await response.json();
            return data.success ? data.scores : [];
        } catch (error) {
            console.error('Failed to load high scores:', error);
            return [];
        }
    }

    async saveHighScore() {
        if (!this.gameState.username) {
            this.showNotification('Please log in first!', 'error');
            return;
        }

        if (!this.gameState.password) {
            this.showNotification('Please log in first!', 'error');
            return;
        }

        try {
            const response = await fetch('/minecraft-2.0/api/highscores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.gameState.username,
                    password: this.gameState.password,
                    blocks: this.gameState.blocks,
                    totalMined: this.gameState.totalMined,
                    totalClicks: this.gameState.totalClicks,
                    upgradesOwned: this.gameState.upgradesOwned,
                    playTime: Math.floor((Date.now() - this.gameState.startTime) / 1000)
                })
            });

            const data = await response.json();
            
            if (data.success) {
                // Update personal high score
                if (this.gameState.totalMined > this.gameState.highScore) {
                    this.gameState.highScore = this.gameState.totalMined;
                    this.saveGame();
                }
                this.showNotification('High score saved!', 'success');
            } else {
                this.showNotification(data.message || 'Failed to save high score!', 'error');
            }
        } catch (error) {
            console.error('Failed to save high score:', error);
            this.showNotification('Failed to save high score!', 'error');
        }
    }

    // Switch to a different tool
    switchTool(toolId) {
        console.log('Attempting to switch to tool:', toolId);
        console.log('Current upgrades:', this.gameState.upgrades);
        console.log('Current active tool:', this.gameState.activeTool);
        
        if (!this.gameState.upgrades[toolId] || this.gameState.upgrades[toolId] === 0) {
            this.showNotification('You need to purchase this tool first!', 'error');
            return;
        }

        if (this.gameState.toolDurability[toolId].isBroken) {
            this.showNotification('This tool is broken! Repair it first.', 'error');
            return;
        }

        this.gameState.activeTool = toolId;
        console.log('Switched to tool:', toolId);
        this.showNotification(`Switched to ${toolId.replace('_', ' ')}!`, 'success');
        this.updateDisplay();
        this.saveGame();
    }

    // Repair a broken tool
    repairTool(toolId) {
        console.log('Attempting to repair tool:', toolId);
        console.log('Current blocks:', this.gameState.blocks);
        console.log('Tool durability:', this.gameState.toolDurability[toolId]);
        
        if (!this.gameState.upgrades[toolId] || this.gameState.upgrades[toolId] === 0) {
            this.showNotification('You need to purchase this tool first!', 'error');
            return;
        }

        const toolDurability = this.gameState.toolDurability[toolId];
        if (!toolDurability.isBroken) {
            this.showNotification('This tool is not broken!', 'error');
            return;
        }

        // Calculate repair cost (cheaper than buying new)
        const baseCost = this.upgrades.find(u => u.id === toolId)?.cost || 100;
        const repairCost = Math.floor(baseCost * 0.3); // 30% of original cost
        
        console.log('Repair cost:', repairCost, 'Base cost:', baseCost);

        if (this.gameState.blocks >= repairCost) {
            this.gameState.blocks -= repairCost;
            toolDurability.current = toolDurability.max;
            toolDurability.isBroken = false;
            
            console.log('Tool repaired successfully');
            this.showNotification(`${toolId.replace('_', ' ')} repaired!`, 'success');
            
            // Recheck block mineability after repair
            this.checkBlockMineability();
            
            this.updateDisplay();
            this.saveGame();
        } else {
            this.showNotification(`Not enough blocks! Need ${repairCost} blocks to repair.`, 'error');
        }
    }

    // Get the best available tool (highest tier that's not broken)
    getBestAvailableTool() {
        const toolOrder = ['netherite_pickaxe', 'diamond_pickaxe', 'iron_pickaxe', 'stone_pickaxe', 'wooden_pickaxe'];
        console.log('Checking tool availability. Tool order:', toolOrder);
        
        for (const toolId of toolOrder) {
            console.log(`Checking ${toolId}: owned=${this.gameState.upgrades[toolId]}, broken=${this.gameState.toolDurability[toolId]?.isBroken}`);
            if (this.gameState.upgrades[toolId] && this.gameState.upgrades[toolId] > 0) {
                if (!this.gameState.toolDurability[toolId].isBroken) {
                    console.log(`Found best available tool: ${toolId}`);
                    return toolId;
                }
            }
        }
        console.log('No available tools found');
        return null;
    }

    // Auto-switch to best available tool when current one breaks
    autoSwitchToBestTool() {
        console.log('Auto-switching to best available tool');
        console.log('Current active tool:', this.gameState.activeTool);
        
        if (this.gameState.activeTool && this.gameState.toolDurability[this.gameState.activeTool].isBroken) {
            const bestTool = this.getBestAvailableTool();
            console.log('Best available tool:', bestTool);
            
            if (bestTool) {
                this.gameState.activeTool = bestTool;
                this.showNotification(`Auto-switched to ${bestTool.replace('_', ' ')}!`, 'info');
            } else {
                this.gameState.activeTool = null;
                this.showNotification('All your tools are broken! Buy or repair a tool to continue mining.', 'error');
            }
        }
    }

    // Skip to the next block
    skipBlock() {
        this.showNotification(`Skipping ${this.gameState.currentBlockName}...`, 'info');
        this.generateNewBlock();
        this.updateDisplay();
        this.saveGame();
    }

    updateBlockDisplay() {
        // Update block name in sidebar
        const blockNameElement = document.getElementById('currentBlockName');
        if (blockNameElement) {
            blockNameElement.textContent = this.gameState.currentBlockName || 'Grass Block';
        }
        
        // Update block info display
        const blockNameInfoElement = document.getElementById('blockName');
        const blockRarityElement = document.getElementById('blockRarity');
        const blockRequirementElement = document.getElementById('blockRequirement');
        
        if (blockNameInfoElement) {
            blockNameInfoElement.textContent = this.gameState.currentBlockName || 'Grass Block';
        }
        
        // Update rarity display
        if (blockRarityElement && this.gameState.currentBlockRarity) {
            blockRarityElement.textContent = this.gameState.currentBlockRarity;
            blockRarityElement.style.color = this.gameState.currentBlockRarityColor || '#FFFFFF';
            blockRarityElement.style.display = 'block';
            blockRarityElement.style.fontWeight = 'bold';
            blockRarityElement.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
        } else if (blockRarityElement) {
            blockRarityElement.style.display = 'none';
        }
        
        if (blockRequirementElement) {
            // Hide tool requirement messages
            blockRequirementElement.textContent = '';
        }
        
        // Update block value display
        const blockValueElement = document.getElementById('blockValue');
        if (blockValueElement && this.gameState.currentBlockBitcoinValue) {
            blockValueElement.textContent = `Value: ${this.gameState.currentBlockBitcoinValue} blocks`;
        }
        
        // Update skip button
        const skipBlockButton = document.getElementById('skipBlockButton');
        if (skipBlockButton) {
            if (!this.gameState.canMineCurrentBlock) {
                skipBlockButton.style.display = 'inline-block';
                skipBlockButton.textContent = `⏭️ Skip ${this.gameState.currentBlockName}`;
                skipBlockButton.disabled = false;
            } else {
                skipBlockButton.style.display = 'none';
            }
        }
    }

    updateBlockImage() {
        const grassBlockImage = document.querySelector('.grass-block-image');
        console.log('updateBlockImage called');
        console.log('grassBlockImage element:', grassBlockImage);
        console.log('currentBlockImage:', this.gameState.currentBlockImage);
        
        if (grassBlockImage && this.gameState.currentBlockImage) {
            console.log('Updating block image to:', this.gameState.currentBlockImage);
            grassBlockImage.src = this.gameState.currentBlockImage;
            grassBlockImage.alt = this.gameState.currentBlockName || 'Block';
            grassBlockImage.textContent = this.gameState.currentBlockName || 'Block';
        } else {
            console.log('Could not update block image - missing element or image path');
        }
    }
    
    // Debug function to test block system
    debugBlockSystem() {
        console.log('=== Block System Debug ===');
        console.log('Current blocks:', this.gameState.blocks);
        console.log('Current block:', this.gameState.currentBlockName);
        console.log('Current block value:', this.gameState.currentBlockBitcoinValue);
        console.log('Current block health:', this.gameState.currentBlockHealth);
        console.log('Current block rarity:', this.gameState.currentBlockRarity);
    }
    
    // Chest System Methods
    handleChestSpawning() {
        // Ensure chestSystem exists (for loaded games that don't have it)
        if (!this.gameState.chestSystem) {
            this.gameState.chestSystem = {
                isVisible: false,
                spawnChance: 1/30, // 1 in 30 chance
                lastSpawnAttempt: 0,
                spawnCooldown: 30000, // 30 seconds between spawn attempts
                activeEffects: []
            };
        }
        
        const now = Date.now();
        const chestSystem = this.gameState.chestSystem;
        
        console.log('Chest spawning check:', {
            now,
            lastSpawnAttempt: chestSystem.lastSpawnAttempt,
            cooldownRemaining: chestSystem.spawnCooldown - (now - chestSystem.lastSpawnAttempt),
            isVisible: chestSystem.isVisible,
            spawnChance: chestSystem.spawnChance
        });
        
        // Check if enough time has passed since last spawn attempt
        if (now - chestSystem.lastSpawnAttempt < chestSystem.spawnCooldown) {
            console.log('Chest spawn on cooldown');
            return;
        }
        
        // Don't spawn if chest is already visible
        if (chestSystem.isVisible) {
            console.log('Chest already visible');
            return;
        }
        
        // Check spawn chance (1 in 25)
        const randomValue = Math.random();
        console.log('Chest spawn roll:', randomValue, 'vs', chestSystem.spawnChance);
        
        if (randomValue < chestSystem.spawnChance) {
            console.log('Chest spawning!');
            this.spawnChest();
        } else {
            console.log('Chest spawn failed (bad roll)');
        }
        
        chestSystem.lastSpawnAttempt = now;
    }
    
    spawnChest() {
        console.log('spawnChest called');
        const chestElement = document.getElementById('mysteryChest');
        console.log('Chest element found:', chestElement);
        
        if (chestElement) {
            this.gameState.chestSystem.isVisible = true;
            chestElement.style.display = 'block';
            console.log('Chest made visible');
            this.showNotification('A mysterious chest has appeared! Click it to see what\'s inside!', 'info');
            console.log('Chest spawn notification sent');
        } else {
            console.error('Chest element not found!');
        }
    }
    
    openMysteryChest() {
        const chestElement = document.getElementById('mysteryChest');
        if (!chestElement || !this.gameState.chestSystem.isVisible) {
            return;
        }
        
        // Hide the chest
        chestElement.style.display = 'none';
        this.gameState.chestSystem.isVisible = false;
        
        // Generate random effect
        const effect = this.generateChestEffect();
        this.applyChestEffect(effect);
    }
    
    generateChestEffect() {
        const effects = [
            // Good effects
            {
                type: 'profit_multiplier',
                value: 10,
                duration: 15 * 60 * 1000, // 15 minutes
                description: 'x10 Profit for 15 minutes!',
                isGood: true
            },
            {
                type: 'blocks_bonus',
                value: 100000,
                description: '+100,000 Blocks!',
                isGood: true
            },
            {
                type: 'speed_multiplier',
                value: 5,
                duration: 10 * 60 * 1000, // 10 minutes
                description: 'x5 Mining Speed for 10 minutes!',
                isGood: true
            },
            {
                type: 'blocks_bonus',
                value: 50000,
                description: '+50,000 Blocks!',
                isGood: true
            },
            {
                type: 'profit_multiplier',
                value: 5,
                duration: 20 * 60 * 1000, // 20 minutes
                description: 'x5 Profit for 20 minutes!',
                isGood: true
            },
            // Bad effects
            {
                type: 'blocks_penalty',
                value: 100000,
                description: '-100,000 Blocks!',
                isGood: false
            },
            {
                type: 'blocks_penalty',
                value: 50000,
                description: '-50,000 Blocks!',
                isGood: false
            },
            {
                type: 'speed_penalty',
                value: 0.5,
                duration: 5 * 60 * 1000, // 5 minutes
                description: 'x0.5 Mining Speed for 5 minutes!',
                isGood: false
            }
        ];
        
        // 70% chance for good effects, 30% for bad effects
        const isGoodEffect = Math.random() < 0.7;
        const filteredEffects = effects.filter(effect => effect.isGood === isGoodEffect);
        
        return filteredEffects[Math.floor(Math.random() * filteredEffects.length)];
    }
    
    applyChestEffect(effect) {
        const notification = document.createElement('div');
        notification.className = `chest-effect-notification ${effect.isGood ? 'good' : 'bad'}`;
        notification.textContent = effect.description;
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
        
        // Apply the effect
        switch (effect.type) {
            case 'profit_multiplier':
                this.gameState.chestSystem.activeEffects.push({
                    type: 'profit_multiplier',
                    value: effect.value,
                    endTime: Date.now() + effect.duration
                });
                break;
                
            case 'blocks_bonus':
                this.gameState.blocks += effect.value;
                this.gameState.totalMined += effect.value;
                break;
                
            case 'speed_multiplier':
                this.gameState.chestSystem.activeEffects.push({
                    type: 'speed_multiplier',
                    value: effect.value,
                    endTime: Date.now() + effect.duration
                });
                break;
                
            case 'blocks_penalty':
                this.gameState.blocks = Math.max(0, this.gameState.blocks - effect.value);
                break;
                
            case 'speed_penalty':
                this.gameState.chestSystem.activeEffects.push({
                    type: 'speed_penalty',
                    value: effect.value,
                    endTime: Date.now() + effect.duration
                });
                break;
        }
        
        this.updateDisplay();
    }
    
    updateChestEffects() {
        const now = Date.now();
        const activeEffects = this.gameState.chestSystem.activeEffects;
        
        // Remove expired effects
        this.gameState.chestSystem.activeEffects = activeEffects.filter(effect => {
            return effect.endTime > now;
        });
    }
    
    getChestEffectMultiplier(effectType) {
        // Ensure chestSystem exists (for loaded games that don't have it)
        if (!this.gameState.chestSystem) {
            this.gameState.chestSystem = {
                isVisible: false,
                spawnChance: 1/30, // 1 in 30 chance
                lastSpawnAttempt: 0,
                spawnCooldown: 30000, // 30 seconds between spawn attempts
                activeEffects: []
            };
        }
        
        const activeEffects = this.gameState.chestSystem.activeEffects;
        const now = Date.now();
        
        let multiplier = 1;
        activeEffects.forEach(effect => {
            if (effect.type === effectType && effect.endTime > now) {
                if (effectType === 'speed_penalty') {
                    multiplier *= effect.value;
                } else {
                    multiplier *= effect.value;
                }
            }
        });
        
        return multiplier;
    }
    
    // Debug function to manually test chest spawning
    testChestSpawn() {
        console.log('Manual chest spawn test called');
        this.spawnChest();
    }

}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Minecraft Clicker');
    try {
        window.game = new MinecraftClicker();
        console.log('Minecraft Clicker initialized successfully');
    } catch (error) {
        console.error('Error initializing Minecraft Clicker:', error);
    }
});

console.log('Script file has finished loading'); 