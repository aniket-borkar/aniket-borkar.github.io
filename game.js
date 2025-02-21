const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Basic game setup
canvas.width = 800;
canvas.height = 600;

// Import game data
const levels = gameLevels;

// Game objects
const player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    speed: 5,
    velocityY: 0,
    isJumping: false,
    canDoubleJump: false,
    hasDoubleJumped: false,
    facingRight: true,
    frame: 0,
    frameCount: 8,
    animationSpeed: 0.15,
    animationTimer: 0,
    jumpPower: -18,
    // Combat properties
    health: 3,
    isAttacking: false,
    attackTimer: 0,
    attackCooldown: 0,
    currentAttack: null,
    invulnerable: false,
    invulnerabilityTimer: 0,
    // World position
    worldX: 0,
    // Special attack properties
    specialMeter: 0,
    maxSpecialMeter: 100,
    specialDamage: 999 // Instant kill
};

// Game state
let gameActive = true;
let score = 0;
let scrollsCollected = 0;
let dataPoints = 0;
let lastTime = 0;
let worldOffset = 0;
let difficulty = 1;

// World generation
const CHUNK_WIDTH = 800;
const VISIBLE_CHUNKS = 3;
let currentChunks = [];

// Platform generation parameters
const PLATFORM_CONFIG = {
    minHeight: 100,
    maxHeight: 300,
    minWidth: 120,
    maxWidth: 250,
    minGap: 80,
    maxGap: 150,
    types: ['platform', 'ground']
};

// Enemy spawn parameters
const ENEMY_SPAWN_CONFIG = {
    minDistance: 300,
    maxEnemies: 2,
    types: ['drone', 'virus', 'firewall'],
    spawnChance: 0.5
};

// Controls
const keys = {};

// UI Elements
const dialogueBox = document.createElement('div');
dialogueBox.className = 'dialogue-box';
document.body.appendChild(dialogueBox);

const upgradeMenu = document.createElement('div');
upgradeMenu.className = 'upgrade-menu';
document.body.appendChild(upgradeMenu);

let showingUpgradeMenu = false;

// Active enemies in the current level
let activeEnemies = [];

// Initialize game
function initGame() {
    // Reset game state
    gameActive = true;
    score = 0;
    scrollsCollected = 0;
    dataPoints = 0;
    worldOffset = 0;
    currentChunks = [];
    
    // Reset player position and stats
    player.x = 50;
    player.y = canvas.height - 100;
    player.velocityY = 0;
    player.isJumping = false;
    player.hasDoubleJumped = false;
    player.health = 3;
    player.isAttacking = false;
    player.attackTimer = 0;
    player.attackCooldown = 0;
    player.currentAttack = null;
    player.invulnerable = false;
    
    // Generate initial chunks
    for (let i = 0; i < VISIBLE_CHUNKS; i++) {
        const startX = i * CHUNK_WIDTH;
        currentChunks.push(generateChunk(startX));
    }
    
    // Show initial dialogue
    setTimeout(() => {
        showDialogue(storyDialogue.intro.text, 5000);
        setTimeout(showLevelIntro, 5000);
    }, 500);
}

function handleKeyDown(e) {
    keys[e.key.toLowerCase()] = true; // Convert to lowercase to handle both cases
    
    if (e.key === ' ') {
        if (!player.isJumping) {
            player.velocityY = player.jumpPower;
            player.isJumping = true;
        } else if (player.canDoubleJump && !player.hasDoubleJumped) {
            player.velocityY = player.jumpPower * 0.8;
            player.hasDoubleJumped = true;
        }
    }
    
    if (e.key.toLowerCase() === 'u') {
        toggleUpgradeMenu();
    }
    
    // Attack controls
    if (e.key.toLowerCase() === 'z' && !player.isAttacking && player.attackCooldown <= 0) {
        startAttack('slash');
    }
    if (e.key.toLowerCase() === 'x' && !player.isAttacking && player.attackCooldown <= 0) {
        startAttack('special');
    }
}

function handleKeyUp(e) {
    keys[e.key.toLowerCase()] = false; // Convert to lowercase to handle both cases
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function checkPlatformCollisions() {
    const level = levels[currentLevel];
    let onPlatform = false;
    
    for (const platform of level.platforms) {
        // Check if player is above the platform and falling
        if (player.velocityY >= 0 &&
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + platform.height + 10) {
            
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.isJumping = false;
            onPlatform = true;
            break;
        }
    }
    
    return onPlatform;
}

function checkCollectibles() {
    const level = levels[currentLevel];
    
    for (const collectible of level.collectibles) {
        if (!collectible.collected &&
            player.x + player.width > collectible.x &&
            player.x < collectible.x + 30 &&
            player.y + player.height > collectible.y &&
            player.y < collectible.y + 30) {
            
            collectible.collected = true;
            score += 100;
            dataPoints += 50;
            scrollsCollected++;
            
            showDialogue("Research data collected! +50 Data Points", 1500);
            
            // Check if all scrolls are collected
            if (level.collectibles.every(c => c.collected)) {
                showLevelCompletion();
                if (currentLevel < levels.length - 1) {
                    setTimeout(() => {
                        currentLevel++;
                        player.x = 50;
                        player.y = canvas.height - 100;
                        player.velocityY = 0;
                        player.isJumping = false;
                        player.hasDoubleJumped = false;
                        initLevel(currentLevel); // Initialize the next level
                        showLevelIntro();
                    }, 2000);
                } else {
                    showDialogue("Congratulations! You've completed all levels!", 5000);
                }
            }
        }
    }
}

function update() {
    // Only update gameplay if player is alive
    if (player.health <= 0) {
        return;
    }
    
    // Move player with WASD
    if (keys['a']) {
        player.x -= player.speed;
        player.facingRight = false;
        player.animationTimer += player.animationSpeed;
    }
    if (keys['d']) {
        player.x += player.speed;
        player.facingRight = true;
        player.animationTimer += player.animationSpeed;
        
        // Move world when player reaches halfway point
        if (player.x > canvas.width / 2) {
            worldOffset += player.speed;
            player.x = canvas.width / 2;
        }
    }
    
    // Jump with W (optional, keeping space as well)
    if ((keys['w'] || keys[' ']) && !player.isJumping) {
        player.velocityY = player.jumpPower;
        player.isJumping = true;
    } else if ((keys['w'] || keys[' ']) && player.canDoubleJump && !player.hasDoubleJumped) {
        player.velocityY = player.jumpPower * 0.8;
        player.hasDoubleJumped = true;
    }
    
    // Update animation frame
    if (player.animationTimer >= 1) {
        player.frame = (player.frame + 1) % player.frameCount;
        player.animationTimer = 0;
    }
    
    // Reset animation when not moving and not attacking
    if (!keys['a'] && !keys['d'] && !player.isAttacking) {
        player.animationTimer = 0;
        player.frame = 0;
    }
    
    // Apply gravity
    player.velocityY += 0.8;
    player.y += player.velocityY;
    
    // Update world generation
    updateWorld();
    
    // Check platform collisions for all visible chunks
    let onPlatform = false;
    for (const chunk of currentChunks) {
        for (const platform of chunk.platforms) {
            if (checkPlatformCollision(player, platform)) {
                onPlatform = true;
                break;
            }
        }
        if (onPlatform) break;
    }
    
    if (onPlatform) {
        player.hasDoubleJumped = false;
        player.isJumping = false;
    }
    
    // Check collectibles and enemies for all visible chunks
    for (const chunk of currentChunks) {
        // Update collectibles
        chunk.collectibles = chunk.collectibles.filter(collectible => {
            if (!collectible.collected && checkCollision(player, {
                x: collectible.x - worldOffset,
                y: collectible.y,
                width: 30,
                height: 30
            })) {
                collectible.collected = true;
                score += 100;
                dataPoints += 50;
                // Add to special meter when collecting items
                player.specialMeter = Math.min(player.maxSpecialMeter, player.specialMeter + 5);
                showFloatingText("+50 Data", collectible.x - worldOffset, collectible.y);
                return false;
            }
            return true;
        });

        // Update enemies
        chunk.enemies = chunk.enemies.filter(enemy => {
            const adjustedEnemy = {
                ...enemy,
                x: enemy.x - worldOffset
            };
            
            // Update enemy behavior
            updateEnemyBehavior(adjustedEnemy);
            
            // Check for enemy death
            return enemy.health > 0;
        });
    }
    
    // Update combat
    updateCombat();
    
    // Screen boundaries (only prevent going left)
    if (player.x < 0) player.x = 0;
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.isJumping = false;
        player.hasDoubleJumped = false;
    }
}

function drawPlatform(platform) {
    ctx.fillStyle = platform.type === 'ground' ? '#4CAF50' : '#8B4513';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    // Add wood texture for platforms
    if (platform.type === 'platform') {
        ctx.strokeStyle = '#6B3E11';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(platform.x, platform.y + 5);
        ctx.lineTo(platform.x + platform.width, platform.y + 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(platform.x, platform.y + 15);
        ctx.lineTo(platform.x + platform.width, platform.y + 15);
        ctx.stroke();
    }
}

function drawCollectible(collectible) {
    if (collectible.collected) return;
    
    // Draw scroll
    ctx.fillStyle = '#F4D03F';
    ctx.beginPath();
    ctx.moveTo(collectible.x, collectible.y);
    ctx.lineTo(collectible.x + 30, collectible.y);
    ctx.lineTo(collectible.x + 30, collectible.y + 25);
    ctx.lineTo(collectible.x, collectible.y + 25);
    ctx.closePath();
    ctx.fill();
    
    // Scroll details
    ctx.strokeStyle = '#B7950B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(collectible.x + 5, collectible.y + 5);
    ctx.lineTo(collectible.x + 25, collectible.y + 5);
    ctx.moveTo(collectible.x + 5, collectible.y + 12);
    ctx.lineTo(collectible.x + 25, collectible.y + 12);
    ctx.moveTo(collectible.x + 5, collectible.y + 19);
    ctx.lineTo(collectible.x + 25, collectible.y + 19);
    ctx.stroke();
}

function drawHUD() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillText(`Data Points: ${dataPoints}`, 20, 60);
    ctx.fillText(`Distance: ${Math.floor(worldOffset/100)}m`, 20, 90);
    
    // Draw health
    for (let i = 0; i < player.health; i++) {
        ctx.fillText('❤️', 20 + i * 30, 120);
    }
    
    // Draw special meter
    ctx.fillStyle = '#000000';
    ctx.fillRect(20, 140, 200, 20);
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(20, 140, (player.specialMeter / player.maxSpecialMeter) * 200, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Special: ${Math.floor(player.specialMeter)}%`, 25, 156);
    
    // Draw controls hint
    ctx.font = '16px Arial';
    ctx.fillText('WASD/Space: Move & Jump | Z: Slash | X: Special (100%) | U: Upgrades', canvas.width - 450, 30);
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background (could be enhanced with parallax)
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw all visible chunks
    for (const chunk of currentChunks) {
    // Draw platforms
        chunk.platforms.forEach(platform => {
            drawPlatform({
                ...platform,
                x: platform.x - worldOffset
            });
        });
    
    // Draw collectibles
        chunk.collectibles.forEach(collectible => {
            if (!collectible.collected) {
                drawCollectible({
                    ...collectible,
                    x: collectible.x - worldOffset
                });
            }
        });
        
        // Draw enemies
        chunk.enemies.forEach(enemy => {
            drawEnemy({
                ...enemy,
                x: enemy.x - worldOffset
            });
        });
    }
    
    // Draw player
    drawPlayer(player.x, player.y);
    
    // Draw HUD
    drawHUD();
}

function drawPlayer(x, y) {
    ctx.save();
    ctx.translate(x + player.width/2, y + player.height/2);
    if (!player.facingRight) {
        ctx.scale(-1, 1);
    }
    ctx.translate(-player.width/2, -player.height/2);

    // Draw character shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(25, 85, 20, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw katana on back when not attacking
    if (!player.isAttacking) {
        // Katana handle
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(40, 20, 5, 15);
        // Katana sheath
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect(42, 35, 3, 40);
    }

    // Draw the character body parts
    // Legs animation with smoother movement
    const legOffset = Math.sin(player.frame * 0.8) * 8;
    
    // Draw legs (white gi pants with shading)
    // Left leg
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.moveTo(15, 40);
    ctx.lineTo(27, 40);
    ctx.lineTo(30, 80 + legOffset);
    ctx.lineTo(12, 80 + legOffset);
    ctx.closePath();
    ctx.fill();
    
    // Left leg shading
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.moveTo(27, 40);
    ctx.lineTo(30, 80 + legOffset);
    ctx.lineTo(25, 80 + legOffset);
    ctx.lineTo(22, 40);
    ctx.closePath();
    ctx.fill();
    
    // Right leg
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.moveTo(28, 40);
    ctx.lineTo(40, 40);
    ctx.lineTo(43, 80 - legOffset);
    ctx.lineTo(25, 80 - legOffset);
    ctx.closePath();
    ctx.fill();
    
    // Right leg shading
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.moveTo(35, 40);
    ctx.lineTo(40, 40);
    ctx.lineTo(43, 80 - legOffset);
    ctx.lineTo(38, 80 - legOffset);
    ctx.closePath();
    ctx.fill();

    // Draw ninja gi (body) - white with shading
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(15, 20); // Left shoulder
    ctx.lineTo(45, 20); // Right shoulder
    ctx.lineTo(40, 45); // Right hip
    ctx.lineTo(20, 45); // Left hip
    ctx.closePath();
    ctx.fill();

    // Gi shading
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.moveTo(35, 20);
    ctx.lineTo(45, 20);
    ctx.lineTo(40, 45);
    ctx.lineTo(30, 45);
    ctx.closePath();
    ctx.fill();

    // Black belt
    ctx.fillStyle = '#000000';
    ctx.fillRect(18, 40, 24, 5);
    
    // Belt knot with more detail
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(28, 40);
    ctx.lineTo(35, 38);
    ctx.lineTo(38, 43);
    ctx.lineTo(35, 45);
    ctx.lineTo(31, 47);
    ctx.closePath();
    ctx.fill();

    // Head (with mask)
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(30, 15, 12, 0, Math.PI * 2);
    ctx.fill();

    // Ninja mask ties with smoother animation
    ctx.fillStyle = '#1a1a1a';
    const maskOffset = Math.sin(player.frame * 0.8) * 2;
    // Back tie
    ctx.beginPath();
    ctx.moveTo(35, 15);
    ctx.lineTo(50, 15 + maskOffset);
    ctx.lineTo(48, 18 + maskOffset);
    ctx.lineTo(33, 18);
    ctx.closePath();
    ctx.fill();

    // Eyes (ninja mask opening)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(33, 15, 4, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(34, 15, 2, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Arms with smoother animation
    const armOffset = Math.cos(player.frame * 0.8) * 8;
    
    // Back arm
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(20, 25);
    ctx.lineTo(15, 45 + armOffset);
    ctx.lineTo(10, 45 + armOffset);
    ctx.lineTo(15, 25);
    ctx.closePath();
    ctx.fill();
    
    // Back arm shading
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.moveTo(18, 25);
    ctx.lineTo(13, 45 + armOffset);
    ctx.lineTo(15, 45 + armOffset);
    ctx.lineTo(20, 25);
    ctx.closePath();
    ctx.fill();
    
    // Front arm
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(40, 25);
    ctx.lineTo(45, 45 - armOffset);
    ctx.lineTo(50, 45 - armOffset);
    ctx.lineTo(45, 25);
    ctx.closePath();
    ctx.fill();
    
    // Front arm shading
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.moveTo(43, 25);
    ctx.lineTo(48, 45 - armOffset);
    ctx.lineTo(50, 45 - armOffset);
    ctx.lineTo(45, 25);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Draw katana attack animation
    if (player.isAttacking) {
        ctx.save();
        const attackAnim = combat.katana.animations[player.currentAttack];
        const progress = (attackAnim.duration - player.attackTimer) / attackAnim.duration;
        const attackAngle = player.facingRight ? 
            -Math.PI/2 + Math.sin(progress * Math.PI) * Math.PI : 
            -Math.PI/2 - Math.sin(progress * Math.PI) * Math.PI;
        
        ctx.translate(
            player.facingRight ? x + player.width : x,
            y + player.height/2
        );
        ctx.rotate(attackAngle);
        
        // Draw katana blade with trail effect
        ctx.fillStyle = 'rgba(200, 200, 255, 0.3)';
        ctx.fillRect(0, 0, combat.katana.range, 8);
        ctx.fillStyle = 'rgba(220, 220, 255, 0.5)';
        ctx.fillRect(0, 2, combat.katana.range * 0.8, 4);
        
        // Draw katana
        ctx.fillStyle = '#8B4513'; // Handle
        ctx.fillRect(-5, -5, 15, 10);
        ctx.fillStyle = '#C0C0C0'; // Blade
        ctx.fillRect(10, -2, combat.katana.range - 10, 4);

    ctx.restore();
    }
}

function showDialogue(text, duration = 4000) {
    dialogueBox.textContent = text;
    dialogueBox.style.display = 'block';
    showingDialogue = true;
    
    setTimeout(() => {
        dialogueBox.style.display = 'none';
        showingDialogue = false;
    }, duration);
}

function showLevelIntro() {
    const level = storyDialogue.levels[currentLevel];
    if (level && level.intro) {
        showDialogue(level.intro, 3000);
    }
}

function showLevelCompletion() {
    const level = storyDialogue.levels[currentLevel];
    if (level && level.completion) {
        showDialogue(level.completion, 3000);
    }
}

function toggleUpgradeMenu() {
    showingUpgradeMenu = !showingUpgradeMenu;
    upgradeMenu.style.display = showingUpgradeMenu ? 'block' : 'none';
    
    if (showingUpgradeMenu) {
        updateUpgradeMenu();
    }
}

function updateUpgradeMenu() {
    upgradeMenu.innerHTML = `
        <h2>Research Upgrades</h2>
        <p>Data Points: ${dataPoints}</p>
        <div class="upgrade-list">
            ${Object.entries(upgrades).map(([key, upgrade]) => {
                const currentLevel = upgrade.currentLevel;
                const nextLevel = upgrade.levels[currentLevel];
                if (!nextLevel) return '';
                
                return `
                    <div class="upgrade-item">
                        <h3>${upgrade.name}</h3>
                        <p>${nextLevel.description}</p>
                        <p>Cost: ${nextLevel.cost} DP</p>
                        <button onclick="purchaseUpgrade('${key}')" 
                                ${dataPoints >= nextLevel.cost ? '' : 'disabled'}>
                            Purchase
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
        <button onclick="toggleUpgradeMenu()">Close</button>
    `;
}

function purchaseUpgrade(upgradeKey) {
    const upgrade = upgrades[upgradeKey];
    const nextLevel = upgrade.levels[upgrade.currentLevel];
    
    if (dataPoints >= nextLevel.cost) {
        dataPoints -= nextLevel.cost;
        
        switch (upgradeKey) {
            case 'jumpPower':
                player.jumpPower = nextLevel.power;
                break;
            case 'speed':
                player.speed = nextLevel.speed;
                break;
            case 'doubleJump':
                player.canDoubleJump = true;
                break;
        }
        
        upgrade.currentLevel++;
        updateUpgradeMenu();
        showDialogue("Upgrade purchased! Your abilities have improved.", 2000);
        
        // Update UI
        document.getElementById('dataPoints').textContent = dataPoints;
    }
}

function initLevel(levelId) {
    // Existing level initialization code...
    
    // Initialize enemies for the level
    activeEnemies = [];
    const level = levels[levelId];
    level.enemies.forEach(enemyConfig => {
        const enemyType = enemies[enemyConfig.type];
        const enemy = {
            ...enemyConfig,
            ...enemyType,
            frame: 0,
            animationTimer: 0,
            direction: 1,
            state: 'idle'
        };
        activeEnemies.push(enemy);
    });
}

function updateCombat() {
    // Update attack state
    if (player.isAttacking) {
        player.attackTimer = Math.max(0, player.attackTimer - 16); // Assuming 60fps
        
        // Check for hit on the hit frame
        const attackAnim = combat.katana.animations[player.currentAttack];
        if (player.frame === attackAnim.hitFrame) {
            checkAttackHits();
        }
        
        // Update attack animation
        player.frame = Math.floor((attackAnim.duration - player.attackTimer) / attackAnim.duration * attackAnim.frameCount);
        
        if (player.attackTimer <= 0) {
            player.isAttacking = false;
            player.attackCooldown = player.currentAttack === 'special' ? attackAnim.cooldown : 100;
            player.currentAttack = null;
        }
    }
    
    // Update cooldowns
    if (player.attackCooldown > 0) {
        player.attackCooldown = Math.max(0, player.attackCooldown - 16);
    }
    
    // Update invulnerability
    if (player.invulnerable) {
        player.invulnerabilityTimer = Math.max(0, player.invulnerabilityTimer - 16);
        if (player.invulnerabilityTimer <= 0) {
            player.invulnerable = false;
        }
    }
}

function checkAttackHits() {
    if (!player.isAttacking) return;
    
    const attackRange = combat.katana.range;
    const hitbox = {
        x: player.facingRight ? player.x + player.width/2 : player.x - attackRange,
        y: player.y,
        width: attackRange,
        height: player.height
    };
    
    // Check all enemies in all visible chunks
    currentChunks.forEach(chunk => {
        chunk.enemies = chunk.enemies.filter(enemy => {
            const adjustedEnemy = {
                ...enemy,
                x: enemy.x - worldOffset
            };
            
            if (checkCollision(hitbox, adjustedEnemy)) {
                // Regular attack
                if (player.currentAttack === 'slash') {
                    enemy.health -= combat.katana.damage;
                    showFloatingText(`-${combat.katana.damage}`, adjustedEnemy.x + enemy.width/2, adjustedEnemy.y);
                }
                // Special attack
                else if (player.currentAttack === 'special' && player.specialMeter >= player.maxSpecialMeter) {
                    enemy.health = 0; // Instant kill
                    showFloatingText('ELIMINATED!', adjustedEnemy.x + enemy.width/2, adjustedEnemy.y);
                }
                
                if (enemy.health <= 0) {
                    score += enemy.points;
                    showFloatingText(`+${enemy.points}`, adjustedEnemy.x, adjustedEnemy.y - 20);
                    // Add to special meter when defeating enemies
                    player.specialMeter = Math.min(player.maxSpecialMeter, player.specialMeter + 10);
                    return false;
                }
            }
            return true;
        });
    });
}

function damageEnemy(enemy) {
    const damage = combat.katana.damage;
    enemy.health -= damage;
    
    // Show damage number
    showFloatingText(`-${damage}`, enemy.x + enemy.width/2, enemy.y);
    
    if (enemy.health <= 0) {
        // Remove enemy and award points
        const index = activeEnemies.indexOf(enemy);
        if (index > -1) {
            activeEnemies.splice(index, 1);
            score += enemy.points;
            showFloatingText(`+${enemy.points}`, enemy.x, enemy.y - 20);
        }
    }
}

function damagePlayer(damage) {
    if (player.invulnerable) return;
    
    player.health -= damage;
    player.invulnerable = true;
    player.invulnerabilityTimer = 1000; // 1 second of invulnerability
    
    // Update lives display
    document.getElementById('livesValue').textContent = player.health;
    
    if (player.health <= 0) {
        gameOver();
    }
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function showFloatingText(text, x, y) {
    ctx.save();
    ctx.fillStyle = '#ffff00';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
    ctx.restore();
}

function drawEnemy(enemy) {
    ctx.save();
    
    // Draw enemy based on type
    switch(enemy.type) {
        case 'drone':
            // Draw Security Drone
            ctx.fillStyle = '#4A90E2';
            ctx.beginPath();
            ctx.arc(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.width/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Drone details
            ctx.strokeStyle = '#2C3E50';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.width/3, 0, Math.PI * 2);
            ctx.stroke();
            
            // Drone "eye"
            ctx.fillStyle = '#E74C3C';
            ctx.beginPath();
            ctx.arc(enemy.x + enemy.width/2, enemy.y + enemy.height/2, 5, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case 'virus':
            // Draw Digital Virus
            const spikes = 8;
            const centerX = enemy.x + enemy.width/2;
            const centerY = enemy.y + enemy.height/2;
            const outerRadius = enemy.width/2;
            const innerRadius = enemy.width/4;
            
            ctx.fillStyle = '#E74C3C';
            ctx.beginPath();
            for(let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                if(i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            
            // Virus "core"
            ctx.fillStyle = '#C0392B';
            ctx.beginPath();
            ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case 'firewall':
            // Draw Firewall Guardian
            ctx.fillStyle = '#E67E22';
            
            // Main body
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            
            // Flame effect
            const flameHeight = 10;
            ctx.fillStyle = '#D35400';
            for(let i = 0; i < enemy.width; i += 5) {
                const flameOffset = Math.sin(Date.now()/100 + i) * flameHeight;
                ctx.fillRect(
                    enemy.x + i,
                    enemy.y - flameOffset,
                    4,
                    flameOffset
                );
            }
            break;
    }
    
    // Draw health bar with border
    const barWidth = enemy.width;
    const barHeight = 5;
    const barX = enemy.x;
    const barY = enemy.y - 15;
    
    // Health bar border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    
    // Health bar background
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Current health
    const healthPercentage = enemy.health / enemies[enemy.type].health;
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(barX, barY, barWidth * healthPercentage, barHeight);
    
    ctx.restore();
}

function updateEnemies() {
    activeEnemies.forEach(enemy => {
        // Update enemy animation
        enemy.animationTimer += enemy.sprite.animationSpeed;
        if (enemy.animationTimer >= 1) {
            enemy.frame = (enemy.frame + 1) % enemy.sprite.frameCount;
            enemy.animationTimer = 0;
        }
        
        // Update enemy behavior
        switch(enemy.behavior) {
            case 'patrol':
                if (enemy.x <= enemy.patrolStart) {
                    enemy.direction = 1;
                } else if (enemy.x >= enemy.patrolEnd) {
                    enemy.direction = -1;
                }
                enemy.x += enemy.speed * enemy.direction;
                break;
                
            case 'chase':
                const dx = player.x - enemy.x;
                const dy = player.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) { // Chase range
                    enemy.x += (dx / dist) * enemy.speed;
                    enemy.y += (dy / dist) * enemy.speed;
                }
                break;
                
            case 'stationary':
                // Stationary enemies don't move but might have ranged attacks
                break;
        }
        
        // Check for collision with player
        if (!player.invulnerable && checkCollision(player, enemy)) {
            damagePlayer(enemy.damage);
        }
    });
}

function startAttack(attackType) {
    if (player.isAttacking || player.attackCooldown > 0) return;
    
    // Check if we have enough special meter for special attack
    if (attackType === 'special' && player.specialMeter < player.maxSpecialMeter) {
        showFloatingText("Not enough energy!", player.x + player.width/2, player.y - 20);
        return;
    }
    
    player.isAttacking = true;
    player.currentAttack = attackType;
    player.attackTimer = combat.katana.animations[attackType].duration;
    player.frame = 0;
    
    // Special attack effects
    if (attackType === 'special' && player.specialMeter >= player.maxSpecialMeter) {
        // Screen flash effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Clear all enemies on screen with special attack
        currentChunks.forEach(chunk => {
            chunk.enemies.forEach(enemy => {
                enemy.health = 0;
                showFloatingText('ELIMINATED!', enemy.x - worldOffset + enemy.width/2, enemy.y);
                score += enemy.points * 2; // Double points for special attack kills
            });
            chunk.enemies = [];
        });
        
        // Reset special meter
        player.specialMeter = 0;
    }
}

function gameLoop(currentTime) {
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    // Always run update and draw
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

function gameOver() {
    // Don't stop the game loop, just pause gameplay
    player.health = 0;
    player.isAttacking = false;
    player.invulnerable = true;
    
    // Show game over modal
    const gameOverModal = document.getElementById('gameOver');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('dataCollected').textContent = dataPoints;
    document.getElementById('researchProgress').textContent = `${Math.floor(worldOffset/100)}m`;
    gameOverModal.style.display = 'block';
}

function restartGame() {
    // Hide game over modal
    const gameOverModal = document.getElementById('gameOver');
    gameOverModal.style.display = 'none';
    
    // Reset game state
    gameActive = true;
    score = 0;
    scrollsCollected = 0;
    dataPoints = 0;
    worldOffset = 0;
    currentChunks = [];
    difficulty = 1;
    
    // Reset player
    player.x = 50;
    player.y = canvas.height - 100;
    player.velocityY = 0;
    player.isJumping = false;
    player.hasDoubleJumped = false;
    player.health = 3;
    player.isAttacking = false;
    player.attackTimer = 0;
    player.attackCooldown = 0;
    player.currentAttack = null;
    player.invulnerable = false;
    player.facingRight = true;
    
    // Generate initial chunks
    for (let i = 0; i < VISIBLE_CHUNKS; i++) {
        const startX = i * CHUNK_WIDTH;
        currentChunks.push(generateChunk(startX));
    }
    
    // Update UI
    document.getElementById('livesValue').textContent = player.health;
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('dataPoints').textContent = dataPoints;
}

function checkPlatformCollision(player, platform) {
    const adjustedPlatform = {
        ...platform,
        x: platform.x - worldOffset
    };
    
    if (player.velocityY >= 0 &&
        player.x + player.width > adjustedPlatform.x &&
        player.x < adjustedPlatform.x + adjustedPlatform.width &&
        player.y + player.height >= adjustedPlatform.y &&
        player.y + player.height <= adjustedPlatform.y + adjustedPlatform.height + 10) {
        
        player.y = adjustedPlatform.y - player.height;
        player.velocityY = 0;
        return true;
    }
    return false;
}

function updateEnemyBehavior(enemy) {
    switch(enemy.behavior) {
        case 'patrol':
            if (enemy.x <= enemy.patrolStart - worldOffset) {
                enemy.direction = 1;
            } else if (enemy.x >= enemy.patrolEnd - worldOffset) {
                enemy.direction = -1;
            }
            enemy.x += enemy.speed * enemy.direction;
            break;
            
        case 'chase':
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                enemy.x += (dx / dist) * enemy.speed;
                enemy.y += (dy / dist) * enemy.speed;
            }
            break;
    }
    
    // Check for collision with player
    if (!player.invulnerable && checkCollision(player, enemy)) {
        damagePlayer(enemy.damage);
    }
}

function updateWorld() {
    // Generate new chunks as needed
    while (currentChunks.length < VISIBLE_CHUNKS) {
        const startX = currentChunks.length === 0 ? 0 : 
            currentChunks[currentChunks.length - 1].x + CHUNK_WIDTH;
        currentChunks.push(generateChunk(startX));
    }

    // Remove chunks that are too far behind
    const removeIndex = currentChunks.findIndex(chunk => 
        chunk.x + CHUNK_WIDTH < worldOffset - CHUNK_WIDTH);
    if (removeIndex !== -1) {
        currentChunks.splice(0, removeIndex + 1);
    }

    // Update difficulty based on progress
    difficulty = 1 + Math.floor(worldOffset / (CHUNK_WIDTH * 5)) * 0.2;
}

function generateChunk(startX) {
    const chunk = {
        x: startX,
        platforms: [],
        enemies: [],
        collectibles: []
    };

    // Generate ground
    chunk.platforms.push({
        x: startX,
        y: canvas.height - 20,
        width: CHUNK_WIDTH,
        height: 20,
        type: 'ground'
    });

    // Generate platforms
    let currentX = startX + 100; // Start a bit after chunk start
    let lastPlatformY = canvas.height - 150; // Start height for first platform

    while (currentX < startX + CHUNK_WIDTH - 100) {
        const platformWidth = Math.random() * (PLATFORM_CONFIG.maxWidth - PLATFORM_CONFIG.minWidth) + PLATFORM_CONFIG.minWidth;
        
        // Vary platform height relative to last platform
        const heightVariation = Math.random() * 100 - 50; // -50 to +50
        let platformY = Math.min(Math.max(lastPlatformY + heightVariation, canvas.height - PLATFORM_CONFIG.maxHeight), canvas.height - PLATFORM_CONFIG.minHeight);
        lastPlatformY = platformY;
        
        chunk.platforms.push({
            x: currentX,
            y: platformY,
            width: platformWidth,
            height: 20,
            type: 'platform'
        });

        // Add collectibles on platforms with higher chance
        if (Math.random() > 0.3) {
            chunk.collectibles.push({
                x: currentX + platformWidth/2,
                y: platformY - 40,
                collected: false
            });
        }

        // Spawn enemies with adjusted position
        if (Math.random() < ENEMY_SPAWN_CONFIG.spawnChance) {
            const enemyType = ENEMY_SPAWN_CONFIG.types[Math.floor(Math.random() * ENEMY_SPAWN_CONFIG.types.length)];
            const enemyConfig = enemies[enemyType];
            chunk.enemies.push({
                type: enemyType,
                x: currentX + platformWidth/2,
                y: platformY - enemyConfig.height,
                ...enemyConfig,
                health: enemyConfig.health * difficulty,
                frame: 0,
                animationTimer: 0,
                direction: 1,
                state: 'idle',
                patrolStart: currentX,
                patrolEnd: currentX + platformWidth
            });
        }

        // Add a smaller gap for better playability
        currentX += platformWidth + Math.random() * (PLATFORM_CONFIG.maxGap - PLATFORM_CONFIG.minGap) + PLATFORM_CONFIG.minGap;
    }

    return chunk;
}

// Start the game
window.addEventListener('load', () => {
    initGame();
    gameLoop();
}); 