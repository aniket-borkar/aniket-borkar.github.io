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
    jumpPower: -18 // Add default jump power
};

// Game state
let gameActive = true;
let currentLevel = 0;
let score = 0;
let scrollsCollected = 0;
let showingDialogue = false;
let currentDialogue = null;
let dataPoints = 0;

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

// Initialize game
function initGame() {
    // Reset game state
    gameActive = true;
    currentLevel = 0;
    score = 0;
    scrollsCollected = 0;
    dataPoints = 0;
    
    // Reset player position
    player.x = 50;
    player.y = canvas.height - 100;
    player.velocityY = 0;
    player.isJumping = false;
    player.hasDoubleJumped = false;
    
    // Show initial dialogue
    setTimeout(() => {
        showDialogue(storyDialogue.intro.text, 5000);
        setTimeout(showLevelIntro, 5000);
    }, 500);
}

function handleKeyDown(e) {
    keys[e.key] = true;
    
    if (e.key === ' ') {
        if (!player.isJumping) {
            player.velocityY = player.jumpPower; // Use player's jump power
            player.isJumping = true;
        } else if (player.canDoubleJump && !player.hasDoubleJumped) {
            player.velocityY = player.jumpPower * 0.8; // Slightly weaker double jump
            player.hasDoubleJumped = true;
        }
    }
    
    if (e.key === 'u') {
        toggleUpgradeMenu();
    }
}

function handleKeyUp(e) {
    keys[e.key] = false;
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
    // Move player
    if (keys['ArrowLeft']) {
        player.x -= player.speed;
        player.facingRight = false;
        player.animationTimer += player.animationSpeed;
    }
    if (keys['ArrowRight']) {
        player.x += player.speed;
        player.facingRight = true;
        player.animationTimer += player.animationSpeed;
    }
    
    // Update animation frame
    if (player.animationTimer >= 1) {
        player.frame = (player.frame + 1) % player.frameCount;
        player.animationTimer = 0;
    }
    
    // Reset animation when not moving
    if (!keys['ArrowLeft'] && !keys['ArrowRight']) {
        player.animationTimer = 0;
        player.frame = 0;
    }
    
    // Apply gravity
    player.velocityY += 0.8;
    player.y += player.velocityY;
    
    // Check platform collisions
    checkPlatformCollisions();
    
    // Check collectibles
    checkCollectibles();
    
    // Screen boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
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
    ctx.fillText(`Level: ${currentLevel + 1} - ${levels[currentLevel].name}`, 20, 30);
    ctx.fillText(`Score: ${score}`, 20, 60);
    ctx.fillText(`Data Points: ${dataPoints}`, 20, 90);
    ctx.fillText(`Scrolls: ${scrollsCollected}`, 20, 120);
    
    // Update HTML elements
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('dataPoints').textContent = dataPoints;
    
    // Draw upgrade menu hint
    ctx.font = '16px Arial';
    ctx.fillText('Press U for Upgrades', canvas.width - 150, 30);
}

function draw() {
    const level = levels[currentLevel];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = level.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw platforms
    level.platforms.forEach(drawPlatform);
    
    // Draw collectibles
    level.collectibles.forEach(drawCollectible);
    
    // Draw player character
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

    // Add character shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(25, 85, 20, 5, 0, 0, Math.PI * 2);
    ctx.fill();

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

function gameLoop() {
    if (gameActive) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
window.addEventListener('load', () => {
    initGame();
    gameLoop();
}); 