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
            achievements: {},
            username: '',
            password: '',
            highScore: 0,
            lastClickTime: 0,
            sessionStartTime: Date.now(),
            rebirthCount: 0  // Track how many rebirths the player has done
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
                description: 'Reset your progress but gain permanent 2x power multiplier for all future upgrades!',
                cost: 10000000000000000,
                costMultiplier: 1.0,
                effect: { type: 'rebirth', value: 2 }
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
        
        // Don't load game state yet - wait for user to log in
        // This prevents loading anonymous/other user's game data
        console.log('Game initialization complete - waiting for user login to load game data');
        
        // Initialize achievements with default state (will be updated when game loads)
        console.log('Achievements initialized with default state');
        
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
        console.log('About to start game loop...');
        this.startGameLoop();
        console.log('Game loop started');
        
        // Update display after everything is initialized (but don't check achievements yet)
        this.updateDisplayWithoutAchievements();
    }



    // Calculate rebirth multiplier (2x for each rebirth)
    getRebirthMultiplier() {
        return Math.pow(2, this.gameState.rebirthCount || 0);
    }
    
    // Debug method to check rebirth state
    debugRebirthState() {
        console.log('Current rebirth state:', {
            gameStateRebirthCount: this.gameState.rebirthCount,
            localStorageData: localStorage.getItem('minecraftClickerSave'),
            calculatedMultiplier: this.getRebirthMultiplier()
        });
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
        
        // Update rebirth stats
        const rebirthCount = this.gameState.rebirthCount || 0;
        const rebirthMultiplier = this.getRebirthMultiplier();
        document.getElementById('rebirthCount').textContent = rebirthCount;
        document.getElementById('rebirthMultiplier').textContent = `${rebirthMultiplier}x`;
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
        
        // Update play time
        const playTimeSeconds = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        this.gameState.playTime = playTimeSeconds;
        document.getElementById('playTime').textContent = this.formatTime(playTimeSeconds);
        
        // Update upgrades availability
        this.renderUpgrades();
        
        // Check for achievements
        this.checkAchievements();
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

            // Apply upgrade effect with rebirth multiplier
            const rebirthMultiplier = this.getRebirthMultiplier();
            if (upgrade.effect.type === 'click') {
                this.gameState.blocksPerClick += upgrade.effect.value * rebirthMultiplier;
            } else if (upgrade.effect.type === 'passive') {
                this.gameState.blocksPerSecond += upgrade.effect.value * rebirthMultiplier;
            } else if (upgrade.effect.type === 'rebirth') {
                // Handle rebirth logic here
                this.performRebirth();
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

    performRebirth() {
        // Confirm rebirth with the player
        if (!confirm('Are you sure you want to perform a Rebirth? This will:\n\n' +
                    '• Reset all your blocks to 0\n' +
                    '• Remove all your tools and upgrades\n' +
                    '• Start you fresh with increased power\n' +
                    '• Multiply all future upgrades by 2x\n\n' +
                    'This action cannot be undone!')) {
            // Refund the rebirth cost if they cancel
            this.gameState.blocks += this.upgrades.find(u => u.id === 'rebirth').cost;
            this.gameState.upgrades['rebirth'] = Math.max(0, this.gameState.upgrades['rebirth'] - 1);
            this.gameState.upgradesOwned = Math.max(0, this.gameState.upgradesOwned - 1);
            return;
        }

        // Store current rebirth count and high score
        const currentRebirthCount = this.gameState.rebirthCount || 0;
        const highScore = this.gameState.highScore;
        const username = this.gameState.username;
        const password = this.gameState.password;

        // Preserve per_account achievements
        const perAccountAchievements = {};
        if (this.gameState.achievements) {
            Object.keys(this.gameState.achievements).forEach(achievementId => {
                if (this.achievements[achievementId]?.type === 'per_account') {
                    perAccountAchievements[achievementId] = this.gameState.achievements[achievementId];
                }
            });
        }

        // Reset game state but keep rebirth count and high score
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
            achievements: perAccountAchievements,
            username: username,
            password: password,
            highScore: highScore,
            lastClickTime: 0,
            sessionStartTime: Date.now(),
            rebirthCount: currentRebirthCount + 1  // Increment rebirth count
        };

        // Update display and show rebirth notification
        this.updateDisplay();
        this.renderUpgrades();
        this.updateMiningTools();
        this.renderAchievements();
        
        // Show rebirth success message
        const multiplier = this.getRebirthMultiplier();
        this.showNotification(`🎉 Rebirth successful! All future upgrades now give ${multiplier}x power!`, 'achievement');
        
        // Save the new state immediately
        this.saveGame();
        this.autoSave();
        
        // Debug: Log the rebirth state
        console.log('Rebirth completed. New state:', {
            rebirthCount: this.gameState.rebirthCount,
            multiplier: this.getRebirthMultiplier(),
            savedData: localStorage.getItem('minecraftClickerSave')
        });
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
                this.gameState.blocks += this.gameState.blocksPerClick;
                this.gameState.totalMined += this.gameState.blocksPerClick;
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

        // New Game button
        const newGameButton = document.getElementById('newGameButton');
        if (newGameButton) {
            newGameButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to start a new game? This will reset all progress and cannot be undone.')) {
                    this.resetGame();
                    this.showNotification('New game started!', 'success');
                }
            });
        }

        // Auto-save when user leaves the page
        window.addEventListener('beforeunload', () => {
            this.autoSave();
        });

        // Event listeners for account management
        const registerButton = document.getElementById('registerButton');
        if (registerButton) {
            registerButton.addEventListener('click', async () => {
                // Show registration form
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('registerForm').style.display = 'block';
            });
        }

        const confirmRegisterButton = document.getElementById('confirmRegisterButton');
        if (confirmRegisterButton) {
            confirmRegisterButton.addEventListener('click', async () => {
                const username = document.getElementById('regUsernameInput').value.trim();
                const email = document.getElementById('regEmailInput').value.trim(); // Email is now optional
                const password = document.getElementById('regPasswordInput').value;
                
                if (!username || !password) {
                    this.showNotification('Username and password are required', 'error');
                    return;
                }
                
                const result = await this.registerUser(username, password, email);
                if (result.success) {
                    // Preserve the current game state before switching to the new user
                    const currentGameState = { ...this.gameState };
                    
                    // Now automatically log them in to get their user_id and complete the process
                    const loginResult = await this.loginUser(username, password);
                    if (loginResult.success) {
                        // Set the new user credentials
                        this.gameState.username = username;
                        this.gameState.password = password;
                        this.gameState.userId = loginResult.user_id;
                        this.gameState.email = loginResult.email;
                        this.gameState.profilePicture = loginResult.profile_picture;
                        
                        // Save the current game state to the new user account
                        console.log(`Preserving game state for new user ${username}...`);
                        this.saveGame();
                        
                        // Show success message
                        this.showNotification(`Registration successful! You're now logged in and your game progress has been saved.`, 'success');
                        
                        // Update the display to show the user is now logged in
                        this.updateAccountDisplay();
                    } else {
                        // If auto-login fails, show error and switch to login form
                        this.showNotification('Registration successful! Please log in manually.', 'success');
                        document.getElementById('registerForm').style.display = 'none';
                        document.getElementById('loginForm').style.display = 'block';
                    }
                    
                    // Clear registration form
                    document.getElementById('regUsernameInput').value = '';
                    document.getElementById('regEmailInput').value = '';
                    document.getElementById('regPasswordInput').value = '';
                } else {
                    this.showNotification(result.message || 'Registration failed!', 'error');
                }
            });
        }

        const backToLoginButton = document.getElementById('backToLoginButton');
        if (backToLoginButton) {
            backToLoginButton.addEventListener('click', () => {
                document.getElementById('registerForm').style.display = 'none';
                document.getElementById('loginForm').style.display = 'block';
            });
        }

        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'forgot-password.html';
            });
        }

        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', async () => {
                const username = document.getElementById('usernameInput').value.trim();
                const password = document.getElementById('passwordInput').value;
                
                if (!username || !password) {
                    this.showNotification('Please enter username and password', 'error');
                    return;
                }
                
                const result = await this.loginUser(username, password);
                if (result.success) {
                    this.gameState.username = username;
                    this.gameState.password = password;
                    this.gameState.userId = result.user_id;
                    this.gameState.email = result.email;
                    this.gameState.profilePicture = result.profile_picture;
                    this.showNotification('Login successful!', 'success');
                    
                    // Load the user's specific game data after login
                    console.log(`User ${username} logged in, loading their game data...`);
                    const gameLoaded = this.loadGame();
                    
                    if (gameLoaded) {
                        console.log(`Successfully loaded game data for ${username}`);
                        this.showNotification(`Welcome back, ${username}! Your game has been loaded.`, 'success');
                    } else {
                        console.log(`No saved game found for ${username}, starting fresh`);
                        this.showNotification(`Welcome, ${username}! Starting a fresh game.`, 'success');
                    }
                    
                    this.updateAccountDisplay();
                    this.saveGame(); // Save the current state with user info
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

        console.log('updateAccountDisplay called with username:', this.gameState.username);

        if (this.gameState.username) {
            console.log('User is logged in, showing user info panel');
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            currentUsername.textContent = `Logged in as: ${this.gameState.username}`;
        } else {
            console.log('User is not logged in, showing login form and fresh game state');
            loginForm.style.display = 'block';
            userInfo.style.display = 'none';
            currentUsername.textContent = '';
            
            // Reset game state to fresh start when no user is logged in
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
                password: '',
                highScore: 0,
                lastClickTime: 0,
                sessionStartTime: Date.now(),
                rebirthCount: 0
            };
            
            // Update display to show fresh game state
            this.updateDisplayWithoutAchievements();
            this.renderUpgrades();
            this.renderAchievements();
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

        console.log('Checking browser achievements for permanent unlock status');

        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
        const isFirefox = /Firefox/.test(userAgent);
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

        console.log('Browser detection:', { isMobile, isChrome, isFirefox, isSafari });

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

        console.log('Browser achievements check completed - achievements are permanent per user account');
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
        console.log(`unlockAchievement called for: ${achievementId}`);
        console.log(`Current achievement state:`, this.achievements[achievementId]);
        
        if (!this.achievements[achievementId] || this.achievements[achievementId].unlocked) {
            console.log(`Achievement ${achievementId} already unlocked or not found, skipping`);
            return;
        }

        console.log(`Unlocking achievement: ${achievementId}`);

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
            // Also auto-save high scores if user is logged in
            if (this.gameState.username && this.gameState.password) {
                this.autoSaveHighScore();
            }
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

            // Use user-specific storage key if logged in, otherwise use generic key
            const storageKey = this.gameState.username ? 
                `minecraftClickerSave_${this.gameState.username}` : 
                'minecraftClickerSave';
            
            localStorage.setItem(storageKey, JSON.stringify(saveData));
            
            // Debug: Log what's being saved
            console.log('Game saved for user:', this.gameState.username || 'anonymous');
            console.log('Game saved. Rebirth state:', {
                rebirthCount: saveData.rebirthCount,
                multiplier: Math.pow(2, saveData.rebirthCount || 0)
            });
            
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }

    loadGame() {
        try {
            // If user is logged in, try to load their specific save data
            if (this.gameState.username) {
                const userStorageKey = `minecraftClickerSave_${this.gameState.username}`;
                const userSaveData = localStorage.getItem(userStorageKey);
                
                if (userSaveData) {
                    console.log(`Loading saved game for user: ${this.gameState.username}`);
                    return this.loadGameFromData(userSaveData);
                } else {
                    console.log(`No saved game found for user: ${this.gameState.username}, starting fresh`);
                    return false;
                }
            } else {
                // No user logged in, try to load generic save data
                const saveData = localStorage.getItem('minecraftClickerSave');
                if (saveData) {
                    console.log('Loading generic saved game (no user logged in)');
                    return this.loadGameFromData(saveData);
                }
                return false;
            }
        } catch (error) {
            console.error('Failed to load game:', error);
            this.showNotification('Failed to load save data. Starting fresh game.', 'error');
            return false;
        }
    }

    loadGameFromData(saveData) {
        try {
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
                username: '',
                password: '',
                highScore: 0,
                lastClickTime: 0,
                sessionStartTime: Date.now(), // Always set to current time for new session
                rebirthCount: 0, // Default rebirth count
                ...loadedState
            };
            
            // Ensure rebirthCount is properly loaded (don't let default override it)
            if (loadedState.rebirthCount !== undefined) {
                mergedState.rebirthCount = Number(loadedState.rebirthCount) || 0;
            }
            
            // Ensure numeric values are properly converted to numbers
            mergedState.blocks = Number(mergedState.blocks) || 0;
            mergedState.blocksPerClick = Number(mergedState.blocksPerClick) || 1;
            mergedState.blocksPerSecond = Number(mergedState.blocksPerSecond) || 0;
            mergedState.totalMined = Number(mergedState.totalMined) || 0;
            mergedState.totalClicks = Number(mergedState.totalClicks) || 0;
            mergedState.upgradesOwned = Number(mergedState.upgradesOwned) || 0;
            mergedState.highScore = Number(mergedState.highScore) || 0;
            mergedState.lastClickTime = Number(loadedState.lastClickTime) || 0;
            
            // Calculate play time correctly
            const currentTime = Date.now();
            const saveTime = loadedState.saveTime || currentTime;
            const timeSinceSave = currentTime - saveTime;
            
            this.gameState = mergedState;
            this.gameState.startTime = currentTime - (timeSinceSave + (loadedState.playTime || 0));
            this.gameState.sessionStartTime = currentTime; // Ensure session starts now
            
            // Debug: Log the loaded rebirth state
            console.log('Game loaded. Rebirth state:', {
                loadedRebirthCount: loadedState.rebirthCount,
                finalRebirthCount: this.gameState.rebirthCount,
                multiplier: this.getRebirthMultiplier()
            });
            
            // Debug: Log the loaded username state
            console.log('Game loaded. Username state:', {
                loadedUsername: loadedState.username,
                finalUsername: this.gameState.username,
                hasPassword: !!this.gameState.password
            });
            
            this.updateDisplayWithoutAchievements();
            this.renderUpgrades();
            this.renderAchievements();
            this.updateAccountDisplay(); // Update account display after loading game state
            return true;
        } catch (error) {
            console.error('Failed to load game from data:', error);
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
            achievements: perAccountAchievements, // Preserve per_account achievements
            username: this.gameState.username,
            password: this.gameState.password,
            highScore: this.gameState.highScore,
            lastClickTime: 0,
            sessionStartTime: Date.now(), // Reset session start time
            rebirthCount: 0 // Reset rebirth count
        };
        
        localStorage.removeItem('minecraftClickerSave');
        this.updateDisplayWithoutAchievements();
        this.renderUpgrades();
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

    async registerUser(username, password, email) {
        try {
            const response = await fetch('/minecraft-2.0/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email })
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

    async autoSaveHighScore() {
        if (!this.gameState.username || !this.gameState.password) {
            return; // Silently return if not logged in
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
                // Update personal high score silently
                if (this.gameState.totalMined > this.gameState.highScore) {
                    this.gameState.highScore = this.gameState.totalMined;
                    this.saveGame();
                }
                // No notification for auto-save
            }
        } catch (error) {
            console.error('Auto-save high score failed:', error);
            // No notification for auto-save failures
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