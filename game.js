const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let score = 0;
let lives = 3;
let exp = 0;
let level = 1;
let stardust = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameActive = true;
let currentLevel = 0;

// Physics constants
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;

// Upgrade levels
const playerUpgrades = {
    speed: 0,
    collection: 0,
    lives: 0,
    special: 0
};

// Special ability state
let specialAbilityReady = true;
let specialAbilityCooldown = 0;
const SPECIAL_ABILITY_COOLDOWN = 30000; // 30 seconds

// Player character (Neale)
const neale = {
    x: canvas.width / 2,
    y: canvas.height - 80,
    width: 50,
    height: 80,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    facingRight: true,
    frame: 0,
    frameCount: 8,
    animationSpeed: 0.15,
    animationTimer: 0
};

// Visual settings
const VISUAL_SETTINGS = {
    trailLength: 8,
    glowIntensity: 0.6,
    starTrailColors: ['#FFD700', '#FFA500', '#FF4500']
};

// Arrays for game objects
const fallingObjects = [];
const scorePopups = [];
const visualEffects = [];

// Level design
const levels = [
    {
        name: "Research Lab",
        platforms: [
            { x: 100, y: canvas.height - 100, width: 200, height: 20 },
            { x: 400, y: canvas.height - 150, width: 200, height: 20 },
            { x: 700, y: canvas.height - 200, width: 200, height: 20 }
        ],
        collectibles: [
            { x: 150, y: canvas.height - 150, collected: false },
            { x: 450, y: canvas.height - 200, collected: false },
            { x: 750, y: canvas.height - 250, collected: false }
        ],
        background: {
            color: '#1a1a2e',
            elements: [
                { type: 'computer', x: 200, y: canvas.height - 180 },
                { type: 'server', x: 600, y: canvas.height - 230 }
            ]
        }
    },
    // Add more levels here
];

// Game controls
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

function handleKeyDown(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!neale.isJumping) {
            neale.velocityY = JUMP_FORCE;
            neale.isJumping = true;
        }
    }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        keys[e.code] = true;
        neale.facingRight = e.code === 'ArrowRight';
    }
}

function handleKeyUp(e) {
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        keys[e.code] = false;
    }
}

// Remove old event listeners if they exist
document.removeEventListener('keydown', handleKeyDown);
document.removeEventListener('keyup', handleKeyUp);

// Add event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Create falling object with different star types
function createFallingObject() {
    if (!gameActive) return;
    
    const rand = Math.random();
    let starType;
    if (rand < starTypes.legendary.probability) {
        starType = starTypes.legendary;
    } else if (rand < starTypes.rare.probability + starTypes.legendary.probability) {
        starType = starTypes.rare;
    } else {
        starType = starTypes.common;
    }
    
    const object = {
        x: Math.random() * (canvas.width - 30),
        y: 0,
        width: 30,
        height: 30,
        speed: 3 * gameSpeed,
        color: starType.color,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        points: starType.points,
        exp: starType.exp,
        effect: starType.effect
    };
    fallingObjects.push(object);
}

// Special ability activation
function activateSpecialAbility() {
    if (!gameActive || !specialAbilityReady || playerUpgrades.special === 0) return;
    
    const cooldown = SPECIAL_ABILITY_COOLDOWN / 
        (1 + (playerUpgrades.special * 0.5)); // Reduce cooldown with upgrades
    
    // Visual feedback for activation
    createVisualEffect('starburst', canvas.width / 2, canvas.height / 2);
    
    // Collect all stars on screen with a delay for visual effect
    setTimeout(() => {
        const stars = [...fallingObjects];
        fallingObjects.length = 0;
        stars.forEach(object => {
            collectStar(object);
        });
    }, 300);
    
    // Start cooldown
    specialAbilityReady = false;
    specialAbilityCooldown = cooldown;
    updateSpecialAbilityUI();
}

// Visual effects system
function createVisualEffect(type, x, y) {
    switch(type) {
        case 'starburst':
            visualEffects.push({
                type,
                x,
                y,
                radius: 0,
                maxRadius: canvas.width,
                speed: 10,
                alpha: 1
            });
            break;
        case 'sparkle':
            visualEffects.push({
                type,
                x,
                y,
                size: 20,
                rotation: 0,
                duration: 30,
                alpha: 1
            });
            break;
    }
}

function updateVisualEffects() {
    for (let i = visualEffects.length - 1; i >= 0; i--) {
        const effect = visualEffects[i];
        switch(effect.type) {
            case 'starburst':
                effect.radius += effect.speed;
                effect.alpha -= 0.02;
                if (effect.alpha <= 0) {
                    visualEffects.splice(i, 1);
                }
                break;
            case 'sparkle':
                effect.rotation += 0.1;
                effect.duration--;
                effect.alpha = effect.duration / 30;
                if (effect.duration <= 0) {
                    visualEffects.splice(i, 1);
                }
                break;
        }
    }
}

// Update game state
function update(currentTime) {
    if (!gameActive) return;

    // Update special ability cooldown
    if (!specialAbilityReady) {
        specialAbilityCooldown -= 16.67; // Approximately 60 FPS
        if (specialAbilityCooldown <= 0) {
            specialAbilityReady = true;
            updateSpecialAbilityUI();
        }
    }

    // Update player physics
    if (keys.ArrowLeft) {
        neale.velocityX = -MOVE_SPEED;
        neale.animationTimer += neale.animationSpeed;
    } else if (keys.ArrowRight) {
        neale.velocityX = MOVE_SPEED;
        neale.animationTimer += neale.animationSpeed;
    } else {
        neale.velocityX = 0;
        neale.animationTimer = 0;
        neale.frame = 0;
    }

    // Update animation frame
    if (neale.animationTimer >= 1) {
        neale.frame = (neale.frame + 1) % neale.frameCount;
        neale.animationTimer = 0;
    }

    // Apply gravity
    neale.velocityY += GRAVITY;

    // Update position
    neale.x += neale.velocityX;
    neale.y += neale.velocityY;

    // Check platform collisions
    let onPlatform = false;
    levels[currentLevel].platforms.forEach(platform => {
        if (checkPlatformCollision(neale, platform)) {
            onPlatform = true;
            neale.isJumping = false;
            neale.y = platform.y - neale.height;
            neale.velocityY = 0;
        }
    });

    // Check collectibles
    levels[currentLevel].collectibles.forEach(collectible => {
        if (!collectible.collected && checkCollision(neale, {
            x: collectible.x,
            y: collectible.y,
            width: 20,
            height: 20
        })) {
            collectible.collected = true;
            score += 10;
            exp += 1;
            updatePlayerStats();
        }
    });

    // Screen boundaries
    if (neale.x < 0) neale.x = 0;
    if (neale.x > canvas.width - neale.width) neale.x = canvas.width - neale.width;
    if (neale.y > canvas.height) {
        lives--;
        if (lives <= 0) {
            gameOver();
        } else {
            resetLevel();
        }
    }

    updateScorePopups();
    updateVisualEffects();
}

function checkPlatformCollision(player, platform) {
    return player.x < platform.x + platform.width &&
           player.x + player.width > platform.x &&
           player.y + player.height > platform.y &&
           player.y + player.height < platform.y + platform.height + 10;
}

function resetLevel() {
    neale.x = canvas.width / 2;
    neale.y = canvas.height - 80;
    neale.velocityX = 0;
    neale.velocityY = 0;
}

function collectStar(star) {
    score += star.points;
    exp += star.exp;
    stardust += Math.floor(star.points / 10);
    
    createScorePopup(star.x, star.y, `+${star.points}`, star.color);
    if (star.effect) {
        createVisualEffect(star.effect, star.x, star.y);
    }
    
    updatePlayerStats();
    checkLevelUp();
    checkStoryProgress();
}

function checkLevelUp() {
    const nextLevel = progression.levels.find(l => l.level === level + 1);
    if (nextLevel && exp >= nextLevel.expRequired) {
        level++;
        const levelUpNotification = `Level ${level} - ${nextLevel.title}`;
        createScorePopup(canvas.width / 2, canvas.height / 2, levelUpNotification, '#4CAF50');
        updatePlayerStats();
    }
}

function checkStoryProgress() {
    gameLore.chapters.forEach(chapter => {
        if (!chapter.unlocked && score >= chapter.unlockScore) {
            chapter.unlocked = true;
            showChapterNotification(chapter);
        }
    });
}

function showChapterNotification(chapter) {
    const notification = document.getElementById('chapterNotification');
    document.getElementById('chapterTitle').textContent = chapter.title;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// UI Updates
function updatePlayerStats() {
    const currentLevel = progression.levels.find(l => l.level === level);
    const nextLevel = progression.levels.find(l => l.level === level + 1);
    
    document.getElementById('levelValue').textContent = level;
    document.getElementById('playerTitle').textContent = currentLevel.title;
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('stardustValue').textContent = stardust;
    
    if (nextLevel) {
        const expProgress = ((exp - currentLevel.expRequired) / 
            (nextLevel.expRequired - currentLevel.expRequired)) * 100;
        document.getElementById('expProgress').style.width = `${expProgress}%`;
        document.getElementById('expText').textContent = 
            `EXP: ${exp - currentLevel.expRequired}/${nextLevel.expRequired - currentLevel.expRequired}`;
    }
}

function updateSpecialAbilityUI() {
    const cooldownOverlay = document.querySelector('.cooldown-overlay');
    const abilityIcon = document.querySelector('.ability-icon');
    
    if (!cooldownOverlay || !abilityIcon) return;
    
    if (playerUpgrades.special === 0) {
        abilityIcon.style.color = '#666';
        cooldownOverlay.style.height = '100%';
        return;
    }
    
    if (!specialAbilityReady) {
        const progress = (specialAbilityCooldown / SPECIAL_ABILITY_COOLDOWN) * 100;
        cooldownOverlay.style.height = `${progress}%`;
        abilityIcon.style.color = '#999';
    } else {
        cooldownOverlay.style.height = '0%';
        abilityIcon.style.color = '#FFD700';
    }
}

// Upgrade System
function showUpgradeMenu() {
    const menu = document.getElementById('upgradeMenu');
    const container = document.getElementById('upgradesContainer');
    container.innerHTML = '';
    
    Object.entries(upgrades).forEach(([key, upgrade]) => {
        const card = createUpgradeCard(key, upgrade);
        container.appendChild(card);
    });
    
    menu.style.display = 'block';
}

function createUpgradeCard(key, upgrade) {
    const card = document.createElement('div');
    card.className = 'upgrade-card';
    
    const currentLevel = playerUpgrades[key];
    const nextLevel = upgrade.levels[currentLevel];
    
    card.innerHTML = `
        <h3>${upgrade.name}</h3>
        <p>${nextLevel ? nextLevel.description : 'Maximum level reached'}</p>
        <div class="upgrade-level">
            ${upgrade.levels.map((_, i) => `
                <div class="level-dot ${i < currentLevel ? 'filled' : ''}"></div>
            `).join('')}
        </div>
        ${nextLevel ? `
            <button onclick="purchaseUpgrade('${key}')" 
                    ${stardust < nextLevel.cost ? 'disabled' : ''}>
                Upgrade (${nextLevel.cost}✨)
            </button>
        ` : ''}
    `;
    
    return card;
}

function purchaseUpgrade(key) {
    const upgrade = upgrades[key];
    const currentLevel = playerUpgrades[key];
    const nextLevel = upgrade.levels[currentLevel];
    
    if (stardust >= nextLevel.cost) {
        stardust -= nextLevel.cost;
        playerUpgrades[key]++;
        updatePlayerStats();
        showUpgradeMenu(); // Refresh the upgrade menu
    }
}

// Story System
function showLoreMenu() {
    const menu = document.getElementById('loreMenu');
    const container = document.getElementById('storyContainer');
    container.innerHTML = '';
    
    gameLore.chapters.forEach(chapter => {
        const isUnlocked = score >= chapter.unlockScore;
        const chapterElement = document.createElement('div');
        chapterElement.className = `story-chapter ${isUnlocked ? '' : 'locked'}`;
        
        chapterElement.innerHTML = `
            <h3>${chapter.title}</h3>
            ${isUnlocked ? `
                <p>${chapter.story}</p>
            ` : `
                <p>Unlock at ${chapter.unlockScore} points</p>
            `}
        `;
        
        container.appendChild(chapterElement);
    });
    
    menu.style.display = 'block';
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Game over and restart
function gameOver() {
    gameActive = false;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('starsCollected').textContent = Math.floor(score / 10);
    document.getElementById('stardustEarned').textContent = stardust;
    document.getElementById('gameOver').style.display = 'block';
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('highScoreValue').textContent = highScore;
    }
}

function restartGame() {
    score = 0;
    lives = 3 + (playerUpgrades.lives * 1);
    gameSpeed = 1;
    gameActive = true;
    fallingObjects.length = 0;
    scorePopups.length = 0;
    visualEffects.length = 0;
    
    // Reset displays
    document.getElementById('scoreValue').textContent = '0';
    document.getElementById('livesValue').textContent = lives;
    document.getElementById('gameOver').style.display = 'none';
    
    // Reset Neale's position
    neale.x = canvas.width / 2;
    
    // Start game loop
    lastSpawnTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// Drawing functions
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    drawBackground();
    
    // Draw platforms
    levels[currentLevel].platforms.forEach(platform => {
        drawPlatform(platform);
    });

    // Draw collectibles
    levels[currentLevel].collectibles.forEach(collectible => {
        if (!collectible.collected) {
            drawCollectible(collectible);
        }
    });

    // Draw Neale
    drawNeale3D(neale.x, neale.y);
}

function drawBackground() {
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background elements
    levels[currentLevel].background.elements.forEach(element => {
        drawBackgroundElement(element);
    });

    // Add some parallax effect
    for (let i = 0; i < 50; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(
            Math.sin(Date.now() * 0.001 + i) * canvas.width/2 + canvas.width/2,
            Math.cos(Date.now() * 0.001 + i) * canvas.height/2 + canvas.height/2,
            1,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

function drawPlatform(platform) {
    // Create 3D effect for platforms
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    // Platform top highlight
    ctx.fillStyle = '#8BC34A';
    ctx.fillRect(platform.x, platform.y, platform.width, 5);
    
    // Platform side shadow
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(platform.x, platform.y + 5, platform.width, 2);
}

function drawCollectible(collectible) {
    const time = Date.now() * 0.003;
    const hoverOffset = Math.sin(time) * 5;
    
    // Glow effect
    ctx.beginPath();
    ctx.arc(collectible.x + 10, collectible.y + 10 + hoverOffset, 15, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
        collectible.x + 10, collectible.y + 10 + hoverOffset, 0,
        collectible.x + 10, collectible.y + 10 + hoverOffset, 15
    );
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw the collectible
    drawStar(collectible.x + 10, collectible.y + 10 + hoverOffset, 5, 10, 5, '#FFD700');
}

function drawNeale3D(x, y) {
    ctx.save();
    ctx.translate(x + neale.width/2, y + neale.height/2);
    if (!neale.facingRight) {
        ctx.scale(-1, 1);
    }
    ctx.translate(-neale.width/2, -neale.height/2);

    // Body
    const bodyGradient = ctx.createLinearGradient(0, 0, neale.width, neale.height);
    bodyGradient.addColorStop(0, '#4CAF50');
    bodyGradient.addColorStop(1, '#2E7D32');
    
    // Legs animation
    const legOffset = Math.sin(neale.frame * 0.5) * 10;
    
    // Draw legs with animation
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(10, 40 + Math.abs(legOffset), 10, 40);
    ctx.fillRect(30, 40 - Math.abs(legOffset), 10, 40);
    
    // Draw body with 3D effect
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.moveTo(10, 20);
    ctx.lineTo(40, 20);
    ctx.lineTo(45, 60);
    ctx.lineTo(5, 60);
    ctx.closePath();
    ctx.fill();
    
    // Head with 3D effect
    const headGradient = ctx.createRadialGradient(25, 15, 0, 25, 15, 15);
    headGradient.addColorStop(0, '#FFD700');
    headGradient.addColorStop(1, '#FFA000');
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(25, 15, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Face features
    ctx.fillStyle = '#000';
    // Eyes
    ctx.fillRect(20, 10, 4, 4);
    ctx.fillRect(30, 10, 4, 4);
    // Mouth
    ctx.beginPath();
    ctx.arc(25, 20, 5, 0, Math.PI, false);
    ctx.stroke();
    
    // Arms with animation
    const armOffset = Math.cos(neale.frame * 0.5) * 10;
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(0, 25 + armOffset, 15, 8);
    ctx.fillRect(35, 25 - armOffset, 15, 8);

    ctx.restore();
}

// Function to draw a star with enhanced effects
function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
    // Glow effect
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerRadius * 2);
    glow.addColorStop(0, color);
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Star shape with shadow
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for(let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();

    // Create gradient fill
    const gradient = ctx.createRadialGradient(cx, cy, innerRadius, cx, cy, outerRadius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, lightenColor(color, 30));
    ctx.fillStyle = gradient;
    ctx.fill();

    // Star border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Reset shadow
    ctx.shadowBlur = 0;
}

// Helper function to lighten a color
function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// Collision detection with optional radius extension
function checkCollision(obj1, obj2, extraRadius = 0) {
    const center1 = {
        x: obj1.x + obj1.width/2,
        y: obj1.y + obj1.height/2
    };
    
    const center2 = {
        x: obj2.x + obj2.width/2,
        y: obj2.y + obj2.height/2
    };
    
    const distance = Math.sqrt(
        Math.pow(center2.x - center1.x, 2) + 
        Math.pow(center2.y - center1.y, 2)
    );
    
    return distance < (obj1.width/2 + obj2.width/2 + extraRadius);
}

// Game loop
function gameLoop(currentTime) {
    if (gameActive) {
        update(currentTime);
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Three.js Background Setup
let scene, camera, renderer, particles;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background-canvas').appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];

    for (let i = 0; i < 2000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
        sizes.push(Math.random() * 2);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        color: 0x8BC34A,
        size: 2,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 1000;

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateBackground() {
    requestAnimationFrame(animateBackground);
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

// Initialize the game state
function initGame() {
    // Initialize Three.js background
    initThreeJS();
    animateBackground();

    // Reset game state
    score = 0;
    lives = 3;
    exp = 0;
    level = 1;
    stardust = 0;
    currentLevel = 0;
    gameActive = true;
    
    // Reset player position
    resetLevel();
    
    // Update UI
    updatePlayerStats();
    document.getElementById('highScoreValue').textContent = highScore;
    document.getElementById('livesValue').textContent = lives;
    
    // Set up UI event listeners
    document.getElementById('upgradeButton').addEventListener('click', showUpgradeMenu);
    document.getElementById('loreButton').addEventListener('click', showLoreMenu);
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', closeModals);
    });
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

// Start the game when the window loads
window.addEventListener('load', initGame); 