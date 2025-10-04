// Minecraft Clicker Game
class MinecraftClicker {
    constructor() {
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
            achievements: {},
            username: '',
            highScore: 0
        };

        this.upgrades = [
            {
                id: 'wooden_pickaxe',
                name: 'Wooden Pickaxe',
                description: 'Increases blocks per click by 1',
                baseCost: 10,
                costMultiplier: 1.15,
                effect: { type: 'click', value: 1 }
            },
            {
                id: 'stone_pickaxe',
                name: 'Stone Pickaxe',
                description: 'Produces 1 block per second',
                baseCost: 50,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 1 }
            },
            {
                id: 'iron_pickaxe',
                name: 'Iron Pickaxe',
                description: 'Produces 5 blocks per second',
                baseCost: 200,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 5 }
            },
            {
                id: 'diamond_pickaxe',
                name: 'Diamond Pickaxe',
                description: 'Produces 25 blocks per second',
                baseCost: 1000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 25 }
            },
            {
                id: 'netherite_pickaxe',
                name: 'Netherite Pickaxe',
                description: 'Produces 100 blocks per second',
                baseCost: 5000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 100 }
            },
            {
                id: 'mining_robot',
                name: 'Mining Robot',
                description: 'Produces 500 blocks per second',
                baseCost: 25000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 500 }
            },
            {
                id: 'automated_mine',
                name: 'Automated Mine',
                description: 'Produces 2500 blocks per second',
                baseCost: 100000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 2500 }
            },
            {
                id: 'quantum_miner',
                name: 'Quantum Miner',
                description: 'Produces 10000 blocks per second',
                baseCost: 500000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 10000 }
            },
            {
                id: 'pickaxe_army',
                name: 'Pickaxe Army',
                description: 'Deploy 50 pickaxes at once! Produces 50000 blocks per second',
                baseCost: 2500000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 50000 }
            },
            {
                id: 'diamond_legion',
                name: 'Diamond Legion',
                description: 'An army of diamond pickaxes. Produces 250000 blocks per second',
                baseCost: 10000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 250000 }
            },
            {
                id: 'netherite_swarm',
                name: 'Netherite Swarm',
                description: 'Swarm of netherite pickaxes. Produces 1000000 blocks per second',
                baseCost: 50000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 1000000 }
            },
            {
                id: 'robot_legion',
                name: 'Robot Legion',
                description: 'Legion of mining robots. Produces 5000000 blocks per second',
                baseCost: 250000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 5000000 }
            },
            {
                id: 'mine_empire',
                name: 'Mine Empire',
                description: 'An empire of automated mines. Produces 25000000 blocks per second',
                baseCost: 1000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 25000000 }
            },
            {
                id: 'quantum_legion',
                name: 'Quantum Legion',
                description: 'Legion of quantum miners. Produces 100000000 blocks per second',
                baseCost: 5000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 100000000 }
            },
            {
                id: 'time_machine',
                name: 'Time Machine',
                description: 'Mine from the past and future! Produces 500000000 blocks per second',
                baseCost: 25000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 500000000 }
            },
            {
                id: 'reality_bender',
                name: 'Reality Bender',
                description: 'Bend reality to mine blocks! Produces 2500000000 blocks per second',
                baseCost: 100000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 2500000000 }
            },
            {
                id: 'dimension_breaker',
                name: 'Dimension Breaker',
                description: 'Break through dimensions to mine! Produces 10000000000 blocks per second',
                baseCost: 500000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 10000000000 }
            },
            {
                id: 'cosmic_miner',
                name: 'Cosmic Miner',
                description: 'Mine from the cosmos! Produces 50000000000 blocks per second',
                baseCost: 2500000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 50000000000 }
            },
            {
                id: 'galaxy_crusher',
                name: 'Galaxy Crusher',
                description: 'Crush entire galaxies for blocks! Produces 250000000000 blocks per second',
                baseCost: 10000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 250000000000 }
            },
            {
                id: 'universe_shaper',
                name: 'Universe Shaper',
                description: 'Shape the universe to mine! Produces 1000000000000 blocks per second',
                baseCost: 50000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 1000000000000 }
            },
            {
                id: 'multiverse_harvester',
                name: 'Multiverse Harvester',
                description: 'Harvest from infinite universes! Produces 5000000000000 blocks per second',
                baseCost: 250000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 5000000000000 }
            },
            {
                id: 'existence_miner',
                name: 'Existence Miner',
                description: 'Mine the very fabric of existence! Produces 25000000000000 blocks per second',
                baseCost: 1000000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 25000000000000 }
            },
            {
                id: 'infinity_breaker',
                name: 'Infinity Breaker',
                description: 'Break infinity itself! Produces 100000000000000 blocks per second',
                baseCost: 5000000000000000,
                costMultiplier: 1.15,
                effect: { type: 'passive', value: 100000000000000 }
            }
        ];

        this.achievements = [
            // Click achievements
            {
                id: 'first_click',
                name: 'First Click',
                description: 'Click the mining button for the first time',
                condition: () => this.gameState.totalClicks >= 1,
                reward: 10
            },
            {
                id: 'hundred_clicks',
                name: 'Hundred Clicks',
                description: 'Click 100 times',
                condition: () => this.gameState.totalClicks >= 100,
                reward: 100
            },
            {
                id: 'thousand_clicks',
                name: 'Thousand Clicks',
                description: 'Click 1000 times',
                condition: () => this.gameState.totalClicks >= 1000,
                reward: 1000
            },
            {
                id: 'ten_thousand_clicks',
                name: 'Ten Thousand Clicks',
                description: 'Click 10,000 times',
                condition: () => this.gameState.totalClicks >= 10000,
                reward: 10000
            },
            {
                id: 'hundred_thousand_clicks',
                name: 'Hundred Thousand Clicks',
                description: 'Click 100,000 times',
                condition: () => this.gameState.totalClicks >= 100000,
                reward: 100000
            },
            {
                id: 'million_clicks',
                name: 'Million Clicks',
                description: 'Click 1,000,000 times',
                condition: () => this.gameState.totalClicks >= 1000000,
                reward: 1000000
            },
            
            // Block achievements
            {
                id: 'hundred_blocks',
                name: 'Hundred Blocks',
                description: 'Have 100 blocks',
                condition: () => this.gameState.blocks >= 100,
                reward: 200
            },
            {
                id: 'thousand_blocks',
                name: 'Thousand Blocks',
                description: 'Have 1,000 blocks',
                condition: () => this.gameState.blocks >= 1000,
                reward: 2000
            },
            {
                id: 'ten_thousand_blocks',
                name: 'Ten Thousand Blocks',
                description: 'Have 10,000 blocks',
                condition: () => this.gameState.blocks >= 10000,
                reward: 20000
            },
            {
                id: 'hundred_thousand_blocks',
                name: 'Hundred Thousand Blocks',
                description: 'Have 100,000 blocks',
                condition: () => this.gameState.blocks >= 100000,
                reward: 200000
            },
            {
                id: 'million_blocks',
                name: 'Million Blocks',
                description: 'Have 1,000,000 blocks',
                condition: () => this.gameState.blocks >= 1000000,
                reward: 1000000
            },
            {
                id: 'ten_million_blocks',
                name: 'Ten Million Blocks',
                description: 'Have 10,000,000 blocks',
                condition: () => this.gameState.blocks >= 10000000,
                reward: 10000000
            },
            {
                id: 'hundred_million_blocks',
                name: 'Hundred Million Blocks',
                description: 'Have 100,000,000 blocks',
                condition: () => this.gameState.blocks >= 100000000,
                reward: 100000000
            },
            {
                id: 'billion_blocks',
                name: 'Billion Blocks',
                description: 'Have 1,000,000,000 blocks',
                condition: () => this.gameState.blocks >= 1000000000,
                reward: 1000000000
            },
            {
                id: 'trillion_blocks',
                name: 'Trillion Blocks',
                description: 'Have 1,000,000,000,000 blocks',
                condition: () => this.gameState.blocks >= 1000000000000,
                reward: 1000000000000
            },
            
            // Total mined achievements
            {
                id: 'million_mined',
                name: 'Million Mined',
                description: 'Mine 1,000,000 blocks total',
                condition: () => this.gameState.totalMined >= 1000000,
                reward: 500000
            },
            {
                id: 'billion_mined',
                name: 'Billion Mined',
                description: 'Mine 1,000,000,000 blocks total',
                condition: () => this.gameState.totalMined >= 1000000000,
                reward: 500000000
            },
            {
                id: 'trillion_mined',
                name: 'Trillion Mined',
                description: 'Mine 1,000,000,000,000 blocks total',
                condition: () => this.gameState.totalMined >= 1000000000000,
                reward: 500000000000
            },
            
            // Upgrade achievements
            {
                id: 'first_upgrade',
                name: 'First Tool',
                description: 'Buy your first mining tool',
                condition: () => this.gameState.upgradesOwned >= 1,
                reward: 50
            },
            {
                id: 'ten_upgrades',
                name: 'Tool Collector',
                description: 'Own 10 mining tools',
                condition: () => this.gameState.upgradesOwned >= 10,
                reward: 500
            },
            {
                id: 'hundred_upgrades',
                name: 'Tool Master',
                description: 'Own 100 mining tools',
                condition: () => this.gameState.upgradesOwned >= 100,
                reward: 5000
            },
            {
                id: 'thousand_upgrades',
                name: 'Tool Legend',
                description: 'Own 1,000 mining tools',
                condition: () => this.gameState.upgradesOwned >= 1000,
                reward: 50000
            },
            
            // Specific tool achievements
            {
                id: 'wooden_master',
                name: 'Wooden Master',
                description: 'Own 10 wooden pickaxes',
                condition: () => (this.gameState.upgrades['wooden_pickaxe'] || 0) >= 10,
                reward: 1000
            },
            {
                id: 'stone_master',
                name: 'Stone Master',
                description: 'Own 10 stone pickaxes',
                condition: () => (this.gameState.upgrades['stone_pickaxe'] || 0) >= 10,
                reward: 5000
            },
            {
                id: 'iron_master',
                name: 'Iron Master',
                description: 'Own 10 iron pickaxes',
                condition: () => (this.gameState.upgrades['iron_pickaxe'] || 0) >= 10,
                reward: 25000
            },
            {
                id: 'diamond_master',
                name: 'Diamond Master',
                description: 'Own 10 diamond pickaxes',
                condition: () => (this.gameState.upgrades['diamond_pickaxe'] || 0) >= 10,
                reward: 100000
            },
            {
                id: 'netherite_master',
                name: 'Netherite Master',
                description: 'Own 10 netherite pickaxes',
                condition: () => (this.gameState.upgrades['netherite_pickaxe'] || 0) >= 10,
                reward: 500000
            },
            {
                id: 'robot_master',
                name: 'Robot Master',
                description: 'Own 10 mining robots',
                condition: () => (this.gameState.upgrades['mining_robot'] || 0) >= 10,
                reward: 2500000
            },
            {
                id: 'mine_master',
                name: 'Mine Master',
                description: 'Own 10 automated mines',
                condition: () => (this.gameState.upgrades['automated_mine'] || 0) >= 10,
                reward: 10000000
            },
            {
                id: 'quantum_master',
                name: 'Quantum Master',
                description: 'Own 10 quantum miners',
                condition: () => (this.gameState.upgrades['quantum_miner'] || 0) >= 10,
                reward: 50000000
            },
            
            // Rate achievements
            {
                id: 'hundred_per_second',
                name: 'Hundred Per Second',
                description: 'Generate 100 blocks per second',
                condition: () => this.gameState.blocksPerSecond >= 100,
                reward: 10000
            },
            {
                id: 'thousand_per_second',
                name: 'Thousand Per Second',
                description: 'Generate 1,000 blocks per second',
                condition: () => this.gameState.blocksPerSecond >= 1000,
                reward: 100000
            },
            {
                id: 'million_per_second',
                name: 'Million Per Second',
                description: 'Generate 1,000,000 blocks per second',
                condition: () => this.gameState.blocksPerSecond >= 1000000,
                reward: 10000000
            },
            
            // Play time achievements
            {
                id: 'hour_played',
                name: 'Hour Player',
                description: 'Play for 1 hour',
                condition: () => this.gameState.playTime >= 3600000,
                reward: 5000
            },
            {
                id: 'day_played',
                name: 'Day Player',
                description: 'Play for 24 hours',
                condition: () => this.gameState.playTime >= 86400000,
                reward: 100000
            },
            {
                id: 'week_played',
                name: 'Week Player',
                description: 'Play for 168 hours (1 week)',
                condition: () => this.gameState.playTime >= 604800000,
                reward: 1000000
            }
        ];

        this.init();
    }

    init() {
        this.loadGame();
        this.setupEventListeners();
        this.renderUpgrades();
        this.renderAchievements();
        this.startGameLoop();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Mining button click
        document.getElementById('bitcoinButton').addEventListener('click', () => {
            this.clickMine();
        });

        // Control buttons
        document.getElementById('saveButton').addEventListener('click', () => {
            if (this.saveGame()) {
                this.showNotification('Game saved!', 'success');
            } else {
                this.showNotification('Failed to save game!', 'error');
            }
        });

        document.getElementById('loadButton').addEventListener('click', () => {
            if (this.loadGame()) {
                this.showNotification('Game loaded!', 'success');
            }
        });

        document.getElementById('resetButton').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
                this.resetGame();
                this.showNotification('Game reset!', 'success');
            }
        });

        // Username functionality
        document.getElementById('setUsernameButton').addEventListener('click', () => {
            const username = document.getElementById('usernameInput').value;
            this.setUsername(username);
        });

        document.getElementById('usernameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const username = e.target.value;
                this.setUsername(username);
            }
        });

        // High score functionality
        document.getElementById('saveHighScoreButton').addEventListener('click', () => {
            this.saveHighScore();
        });

        document.getElementById('showHighScoresButton').addEventListener('click', () => {
            this.showHighScores();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.clickMine();
            }
        });
    }

    clickMine() {
        this.gameState.blocks += this.gameState.blocksPerClick;
        this.gameState.totalMined += this.gameState.blocksPerClick;
        this.gameState.totalClicks++;

        // Visual feedback
        const button = document.getElementById('bitcoinButton');
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 100);

        // Create particle effect
        this.createParticle();

        this.updateDisplay();
        this.checkAchievements();
    }

    createParticle() {
        const button = document.getElementById('bitcoinButton');
        const rect = button.getBoundingClientRect();
        
        // Create multiple particles for a more realistic effect
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position around the button
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;
            
            particle.style.left = rect.left + rect.width / 2 + offsetX + 'px';
            particle.style.top = rect.top + rect.height / 2 + offsetY + 'px';
            document.body.appendChild(particle);

            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1000);
        }
    }

    buyUpgrade(upgradeId) {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        if (!upgrade) return;

        const owned = this.gameState.upgrades[upgradeId] || 0;
        const cost = this.calculateUpgradeCost(upgrade, owned);

        if (this.gameState.blocks >= cost) {
            this.gameState.blocks -= cost;
            this.gameState.upgrades[upgradeId] = (this.gameState.upgrades[upgradeId] || 0) + 1;
            this.gameState.upgradesOwned++;

            // Apply upgrade effect
            if (upgrade.effect.type === 'click') {
                this.gameState.blocksPerClick += upgrade.effect.value;
            } else if (upgrade.effect.type === 'passive') {
                this.gameState.blocksPerSecond += upgrade.effect.value;
            }

            this.updateDisplay();
            this.renderUpgrades();
            this.checkAchievements();
            this.showNotification(`Purchased ${upgrade.name}!`, 'success');
        } else {
            this.showNotification('Not enough blocks!', 'error');
        }
    }

    calculateUpgradeCost(upgrade, owned) {
        return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, owned));
    }

    canAffordUpgrade(upgradeId) {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        if (!upgrade) return false;

        const owned = this.gameState.upgrades[upgradeId] || 0;
        const cost = this.calculateUpgradeCost(upgrade, owned);
        return this.gameState.blocks >= cost;
    }

    renderUpgrades() {
        const grid = document.getElementById('upgradesGrid');
        grid.innerHTML = '';

        this.upgrades.forEach(upgrade => {
            const owned = this.gameState.upgrades[upgrade.id] || 0;
            const cost = this.calculateUpgradeCost(upgrade, owned);
            const canAfford = this.canAffordUpgrade(upgrade.id);

            const upgradeElement = document.createElement('div');
            upgradeElement.className = `upgrade-item ${canAfford ? '' : 'disabled'}`;
            upgradeElement.innerHTML = `
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-cost">Cost: ${this.formatNumber(cost)} Blocks</div>
                <div class="upgrade-owned">Owned: ${owned}</div>
            `;

            if (canAfford) {
                upgradeElement.addEventListener('click', () => this.buyUpgrade(upgrade.id));
            }

            grid.appendChild(upgradeElement);
        });
    }

    renderAchievements() {
        const grid = document.getElementById('achievementsGrid');
        grid.innerHTML = '';

        this.achievements.forEach(achievement => {
            const unlocked = this.gameState.achievements[achievement.id] || false;
            const conditionMet = achievement.condition();

            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${unlocked ? '' : 'locked'}`;
            achievementElement.innerHTML = `
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                ${unlocked ? '<div class="achievement-reward">Reward: ' + this.formatNumber(achievement.reward) + ' BTC</div>' : ''}
            `;

            grid.appendChild(achievementElement);
        });
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.gameState.achievements[achievement.id] && achievement.condition()) {
                this.gameState.achievements[achievement.id] = true;
                this.gameState.blocks += achievement.reward;
                this.gameState.totalMined += achievement.reward;
                this.showNotification(`Achievement Unlocked: ${achievement.name}! +${achievement.reward} Blocks`, 'success');
                this.renderAchievements();
            }
        });
    }

    updateDisplay() {
        // Update main displays
        document.getElementById('bitcoinAmount').textContent = this.formatNumber(this.gameState.blocks);
        document.getElementById('bitcoinRate').textContent = this.formatNumber(this.gameState.blocksPerSecond);
        document.getElementById('clickValue').textContent = this.formatNumber(this.gameState.blocksPerClick);

        // Update statistics
        document.getElementById('totalMined').textContent = this.formatNumber(this.gameState.totalMined);
        document.getElementById('totalClicks').textContent = this.formatNumber(this.gameState.totalClicks);
        document.getElementById('upgradesOwned').textContent = this.formatNumber(this.gameState.upgradesOwned);

        // Update play time
        const playTimeSeconds = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        const hours = Math.floor(playTimeSeconds / 3600);
        const minutes = Math.floor((playTimeSeconds % 3600) / 60);
        const seconds = playTimeSeconds % 60;
        
        let timeString = '';
        if (hours > 0) timeString += `${hours}h `;
        if (minutes > 0) timeString += `${minutes}m `;
        timeString += `${seconds}s`;
        
                document.getElementById('playTime').textContent = timeString;

        // Update username display
        const currentUsernameElement = document.getElementById('currentUsername');
        if (this.gameState.username) {
            currentUsernameElement.textContent = `Current: ${this.gameState.username}`;
            currentUsernameElement.style.display = 'block';
        } else {
            currentUsernameElement.style.display = 'none';
        }
        
        // Update personal high score display
        const personalHighScoreElement = document.getElementById('personalHighScore');
        if (this.gameState.highScore > 0) {
            personalHighScoreElement.textContent = `Personal Best: ${this.formatNumber(this.gameState.highScore)} blocks mined`;
            personalHighScoreElement.style.display = 'block';
        } else {
            personalHighScoreElement.style.display = 'none';
        }

        // Update mining tool display
        this.updateMiningTool();

        // Re-render upgrades to update affordability
        this.renderUpgrades();
    }

    updateMiningTool() {
        // Hide all tools first
        const tools = [
            'woodenPickaxe', 'stonePickaxe', 'ironPickaxe', 'diamondPickaxe', 
            'netheritePickaxe', 'miningRobot', 'automatedMine', 'quantumMiner',
            'pickaxeArmy', 'diamondLegion', 'netheriteSwarm', 'robotLegion',
            'mineEmpire', 'quantumLegion', 'timeMachine', 'realityBender',
            'dimensionBreaker', 'cosmicMiner', 'galaxyCrusher', 'universeShaper',
            'multiverseHarvester', 'existenceMiner', 'infinityBreaker'
        ];
        
        tools.forEach(toolId => {
            const tool = document.getElementById(toolId);
            if (tool) {
                tool.classList.remove('active');
            }
        });

        // Show all tools you own
        if (this.gameState.upgrades['wooden_pickaxe'] > 0) {
            document.getElementById('woodenPickaxe').classList.add('active');
        }
        if (this.gameState.upgrades['stone_pickaxe'] > 0) {
            document.getElementById('stonePickaxe').classList.add('active');
        }
        if (this.gameState.upgrades['iron_pickaxe'] > 0) {
            document.getElementById('ironPickaxe').classList.add('active');
        }
        if (this.gameState.upgrades['diamond_pickaxe'] > 0) {
            document.getElementById('diamondPickaxe').classList.add('active');
        }
        if (this.gameState.upgrades['netherite_pickaxe'] > 0) {
            document.getElementById('netheritePickaxe').classList.add('active');
        }
        if (this.gameState.upgrades['mining_robot'] > 0) {
            document.getElementById('miningRobot').classList.add('active');
        }
        if (this.gameState.upgrades['automated_mine'] > 0) {
            document.getElementById('automatedMine').classList.add('active');
        }
        if (this.gameState.upgrades['quantum_miner'] > 0) {
            document.getElementById('quantumMiner').classList.add('active');
        }
        if (this.gameState.upgrades['pickaxe_army'] > 0) {
            document.getElementById('pickaxeArmy').classList.add('active');
        }
        if (this.gameState.upgrades['diamond_legion'] > 0) {
            document.getElementById('diamondLegion').classList.add('active');
        }
        if (this.gameState.upgrades['netherite_swarm'] > 0) {
            document.getElementById('netheriteSwarm').classList.add('active');
        }
        if (this.gameState.upgrades['robot_legion'] > 0) {
            document.getElementById('robotLegion').classList.add('active');
        }
        if (this.gameState.upgrades['mine_empire'] > 0) {
            document.getElementById('mineEmpire').classList.add('active');
        }
        if (this.gameState.upgrades['quantum_legion'] > 0) {
            document.getElementById('quantumLegion').classList.add('active');
        }
        if (this.gameState.upgrades['time_machine'] > 0) {
            document.getElementById('timeMachine').classList.add('active');
        }
        if (this.gameState.upgrades['reality_bender'] > 0) {
            document.getElementById('realityBender').classList.add('active');
        }
        if (this.gameState.upgrades['dimension_breaker'] > 0) {
            document.getElementById('dimensionBreaker').classList.add('active');
        }
        if (this.gameState.upgrades['cosmic_miner'] > 0) {
            document.getElementById('cosmicMiner').classList.add('active');
        }
        if (this.gameState.upgrades['galaxy_crusher'] > 0) {
            document.getElementById('galaxyCrusher').classList.add('active');
        }
        if (this.gameState.upgrades['universe_shaper'] > 0) {
            document.getElementById('universeShaper').classList.add('active');
        }
        if (this.gameState.upgrades['multiverse_harvester'] > 0) {
            document.getElementById('multiverseHarvester').classList.add('active');
        }
        if (this.gameState.upgrades['existence_miner'] > 0) {
            document.getElementById('existenceMiner').classList.add('active');
        }
        if (this.gameState.upgrades['infinity_breaker'] > 0) {
            document.getElementById('infinityBreaker').classList.add('active');
        }
    }

    startGameLoop() {
        setInterval(() => {
            // Add passive income
            if (this.gameState.blocksPerSecond > 0) {
                this.gameState.blocks += this.gameState.blocksPerSecond;
                this.gameState.totalMined += this.gameState.blocksPerSecond;
            }
            this.updateDisplay();
        }, 1000);
    }

    formatNumber(num) {
        if (num < 1000) return num.toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
        return (num / 1000000000000).toFixed(1) + 'T';
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
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
                    achievements: {},
                    ...loadedState
                };
                
                // Calculate play time correctly
                const currentTime = Date.now();
                const saveTime = loadedState.saveTime || currentTime;
                const timeSinceSave = currentTime - saveTime;
                
                this.gameState = mergedState;
                this.gameState.startTime = currentTime - (timeSinceSave + (loadedState.playTime || 0));
                
                this.updateDisplay();
                this.renderUpgrades();
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
            achievements: {},
            username: this.gameState.username,
            highScore: this.gameState.highScore
        };
        
        localStorage.removeItem('minecraftClickerSave');
        this.updateDisplay();
        this.renderUpgrades();
        this.renderAchievements();
    }

    setUsername(username) {
        if (username && username.trim()) {
            this.gameState.username = username.trim();
            this.saveGame();
            this.updateDisplay();
            this.showNotification(`Username set to: ${this.gameState.username}`, 'success');
        }
    }

    getHighScores() {
        try {
            const scores = localStorage.getItem('minecraftClickerHighScores');
            return scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Failed to load high scores:', error);
            return [];
        }
    }

    saveHighScore() {
        if (!this.gameState.username) {
            this.showNotification('Please set a username first!', 'error');
            return;
        }

        try {
            const scores = this.getHighScores();
            const newScore = {
                username: this.gameState.username,
                blocks: this.gameState.blocks,
                totalMined: this.gameState.totalMined,
                totalClicks: this.gameState.totalClicks,
                upgradesOwned: this.gameState.upgradesOwned,
                playTime: this.gameState.playTime,
                date: new Date().toISOString()
            };

            // Add new score
            scores.push(newScore);

            // Sort by total mined (primary) and blocks (secondary)
            scores.sort((a, b) => {
                if (b.totalMined !== a.totalMined) {
                    return b.totalMined - a.totalMined;
                }
                return b.blocks - a.blocks;
            });

            // Keep only top 10 scores
            const topScores = scores.slice(0, 10);

            localStorage.setItem('minecraftClickerHighScores', JSON.stringify(topScores));
            
            // Update personal high score
            if (this.gameState.totalMined > this.gameState.highScore) {
                this.gameState.highScore = this.gameState.totalMined;
                this.saveGame();
            }

            this.showNotification('High score saved!', 'success');
        } catch (error) {
            console.error('Failed to save high score:', error);
            this.showNotification('Failed to save high score!', 'error');
        }
    }

    showHighScores() {
        const scores = this.getHighScores();
        if (scores.length === 0) {
            this.showNotification('No high scores yet!', 'info');
            return;
        }

        let message = '🏆 HIGH SCORES 🏆\n\n';
        scores.forEach((score, index) => {
            const rank = index + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
            message += `${medal} ${score.username}\n`;
            message += `   Total Mined: ${this.formatNumber(score.totalMined)}\n`;
            message += `   Blocks: ${this.formatNumber(score.blocks)}\n`;
            message += `   Clicks: ${this.formatNumber(score.totalClicks)}\n`;
            message += `   Tools: ${score.upgradesOwned}\n\n`;
        });

        alert(message);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MinecraftClicker();
}); 