// Minecraft Clicker Game
console.log('Script file is loading...');

class MinecraftClicker {
    constructor() {
        console.log('MinecraftClicker constructor starting...');
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
            achievements: {},
            username: '',
            password: '',
            highScore: 0,
            lastClickTime: 0,
            sessionStartTime: Date.now(),
            rebirthCount: 0,
            currentBlockTier: 0,
            currentBlockMultiplier: 1,
            currentBlockName: 'Grass Block'
        };
        console.log('Game state initialized');

        this.upgrades = [
            // Tool upgrades
            {
                id: 'wooden_pickaxe',
                name: 'Wooden Pickaxe',
                description: 'A basic wooden pickaxe. Adds +1 block per click.',
                cost: 10,
                costMultiplier: 1.15,
                effect: { type: 'click', value: 1 }
            },
            {
                id: 'stone_pickaxe',
                name: 'Stone Pickaxe',
                description: 'A sturdy stone pickaxe. Adds +5 blocks per click.',
                cost: 50,
                costMultiplier: 1.15,
                effect: { type: 'click', value: 5 }
            },
            {
                id: 'iron_pickaxe',
                name: 'Iron Pickaxe',
                description: 'A durable iron pickaxe. Adds +20 blocks per click.',
                cost: 200,
                costMultiplier: 1.15,
                effect: { type: 'click', value: 20 }
            },
            {
                id: 'diamond_pickaxe',
                name: 'Diamond Pickaxe',
                description: 'A powerful diamond pickaxe. Adds +50 blocks per click.',
                cost: 1000,
                costMultiplier: 1.15,
                effect: { type: 'click', value: 50 }
            },
            {
                id: 'netherite_pickaxe',
                name: 'Netherite Pickaxe',
                description: 'The ultimate pickaxe. Adds +100 blocks per click.',
                cost: 5000,
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

        // Define enchantments array
        this.enchantments = [
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
                id: 'fortune',
                name: 'Fortune',
                description: 'Chance to get bonus blocks when mining. Each level adds 10% chance.',
                cost: 25000000000000, // 25T
                costMultiplier: 3.5,
                effect: { type: 'fortune', value: 0.1 },
                maxLevel: 3
            },
            {
                id: 'unbreaking',
                name: 'Unbreaking',
                description: 'Reduces the chance of tools breaking. Each level adds 20% durability.',
                cost: 15000000000000, // 15T
                costMultiplier: 3.2,
                effect: { type: 'unbreaking', value: 0.2 },
                maxLevel: 3
            },
            {
                id: 'mending',
                name: 'Mending',
                description: 'Tools repair themselves over time. Each level increases repair rate.',
                cost: 50000000000000, // 50T
                costMultiplier: 4.0,
                effect: { type: 'mending', value: 0.1 },
                maxLevel: 3
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
        document.getElementById('clickValue').textContent = this.formatNumber(this.gameState.blocksPerClick);
        
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
            

            
            upgradeElement.innerHTML = `
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name}</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                    <div class="upgrade-owned">Owned: ${owned}</div>
                    <div class="upgrade-cost">Cost: ${this.formatNumber(cost)} blocks</div>
                </div>
            `;
            
            // Add data attribute and styling for clickability
            upgradeElement.dataset.upgradeId = upgrade.id;
            if (!canAfford) {
                upgradeElement.classList.add('disabled');
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
            { name: 'Grass Block', image: 'assets/grassblock.jpeg', multiplier: 1 },
            { name: 'Stone Block', image: 'assets/grassblock.jpeg', multiplier: 2 }, // Using grass block for now
            { name: 'Iron Block', image: 'assets/grassblock.jpeg', multiplier: 5 },
            { name: 'Gold Block', image: 'assets/grassblock.jpeg', multiplier: 10 },
            { name: 'Diamond Block', image: 'assets/grassblock.jpeg', multiplier: 25 },
            { name: 'Emerald Block', image: 'assets/grassblock.jpeg', multiplier: 50 },
            { name: 'Netherite Block', image: 'assets/grassblock.jpeg', multiplier: 100 },
            { name: 'Obsidian Block', image: 'assets/grassblock.jpeg', multiplier: 250 },
            { name: 'Bedrock Block', image: 'assets/grassblock.jpeg', multiplier: 500 },
            { name: 'Void Block', image: 'assets/grassblock.jpeg', multiplier: 1000 }
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
        // For now, return the grass block image
        // In the future, you could add different block images
        return 'assets/grassblock.jpeg';
    }

    calculateUpgradeCost(upgrade, owned) {
        return Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, owned));
    }

    buyUpgrade(upgradeId) {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        if (!upgrade) return;

        const owned = this.gameState.upgrades[upgradeId] || 0;
        const cost = this.calculateUpgradeCost(upgrade, owned);

        if (Number(this.gameState.blocks) >= Number(cost)) {
            this.gameState.blocks -= cost;
            this.gameState.upgrades[upgradeId] = (this.gameState.upgrades[upgradeId] || 0) + 1;
            this.gameState.upgradesOwned += 1;

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

            this.updateDisplay();
            this.renderUpgrades();
            this.updateMiningTools();
            this.saveGame();
            // Also auto-save to ensure immediate persistence
            this.autoSave();
            this.showNotification(`${upgrade.name} purchased!`, 'success');
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        // Click handler
        const bitcoinButton = document.getElementById('bitcoinButton');
        console.log('Bitcoin button found:', bitcoinButton);
        if (bitcoinButton) {
            bitcoinButton.addEventListener('click', (e) => {
                console.log('Bitcoin button clicked!', e);
                e.preventDefault();
                e.stopPropagation();
                
                let blocksToAdd = this.gameState.blocksPerClick;
                
                // Apply block tier multiplier from rebirths
                const blockMultiplier = this.gameState.currentBlockMultiplier || 1;
                blocksToAdd = Math.floor(blocksToAdd * blockMultiplier);
                
                // Apply enchantment effects
                if (this.gameState.enchantments) {
                    // Fortune enchantment - chance for bonus blocks
                    if (this.gameState.enchantments.fortune > 0) {
                        const fortuneLevel = this.gameState.enchantments.fortune;
                        const fortuneChance = fortuneLevel * 0.1; // 10% per level
                        if (Math.random() < fortuneChance) {
                            blocksToAdd = Math.floor(blocksToAdd * 1.5); // 50% bonus
                        }
                    }
                    
                    // Looting enchantment - chance for rare drops
                    if (this.gameState.enchantments.looting > 0) {
                        const lootingLevel = this.gameState.enchantments.looting;
                        const lootingChance = lootingLevel * 0.15; // 15% per level
                        if (Math.random() < lootingChance) {
                            blocksToAdd = Math.floor(blocksToAdd * 1.3); // 30% bonus
                        }
                    }
                }
                
                this.gameState.blocks += blocksToAdd;
                this.gameState.totalMined += blocksToAdd;
                this.gameState.totalClicks += 1;
                this.gameState.lastClickTime = Date.now();
                this.updateDisplay();
                this.checkAchievements();
                // Auto-save after each click
                this.autoSave();
            });
            console.log('Bitcoin button event listener added');
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
                console.log(`Adding ${this.gameState.blocksPerSecond} blocks per second. Current blocks: ${this.gameState.blocks}`);
                this.gameState.blocks += this.gameState.blocksPerSecond;
                this.gameState.totalMined += this.gameState.blocksPerSecond;
                console.log(`After adding: ${this.gameState.blocks} blocks`);
            }
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

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
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


}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Minecraft Clicker');
    try {
        new MinecraftClicker();
        console.log('Minecraft Clicker initialized successfully');
    } catch (error) {
        console.error('Error initializing Minecraft Clicker:', error);
    }
});

console.log('Script file has finished loading'); 