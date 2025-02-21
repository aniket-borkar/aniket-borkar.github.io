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
let gameSpeed = 1;
let lastSpawnTime = 0;
const spawnInterval = 1500; // Time between star spawns in milliseconds

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
    width: 40,
    height: 80,
    baseSpeed: 8,
    color: '#FF6B6B',
    collectionRadius: 0,
    trail: []
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

// Initialize UI
document.getElementById('highScoreValue').textContent = highScore;
updatePlayerStats();

// Game controls
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

function handleKeyDown(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        activateSpecialAbility();
    } else if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        keys[e.code] = true;
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

    // Spawn new objects based on time
    if (currentTime - lastSpawnTime > spawnInterval / gameSpeed) {
        createFallingObject();
        lastSpawnTime = currentTime;
    }

    // Calculate player speed with upgrades
    const playerSpeed = neale.baseSpeed * (1 + (playerUpgrades.speed * 0.2));

    // Move Neale
    if (keys.ArrowLeft && neale.x > 0) {
        neale.x -= playerSpeed;
    }
    if (keys.ArrowRight && neale.x < canvas.width - neale.width) {
        neale.x += playerSpeed;
    }

    // Update falling objects
    for (let i = fallingObjects.length - 1; i >= 0; i--) {
        const object = fallingObjects[i];
        object.y += object.speed;

        // Check collision with expanded collection radius
        const collectionRadius = playerUpgrades.collection * 20; // 20 pixels per upgrade level
        if (checkCollision(neale, object, collectionRadius)) {
            collectStar(object);
            fallingObjects.splice(i, 1);
            continue;
        }

        // Remove objects that fall off screen and reduce lives
        if (object.y > canvas.height) {
            lives--;
            document.getElementById('livesValue').textContent = lives;
            fallingObjects.splice(i, 1);
            
            createScorePopup(object.x, canvas.height - 30, '-1 ❤️', '#ff4444');

            if (lives <= 0) {
                gameOver();
            }
        }
    }

    updateScorePopups();
    updateVisualEffects();
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

    // Draw visual effects behind everything
    drawVisualEffects();

    // Draw Neale
    drawNeale(neale.x, neale.y);

    // Draw collection radius if upgraded
    if (playerUpgrades.collection > 0) {
        const radius = playerUpgrades.collection * 20;
        ctx.beginPath();
        ctx.arc(neale.x + neale.width/2, neale.y + neale.height/2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
    }

    // Draw falling objects
    fallingObjects.forEach(object => {
        ctx.save();
        ctx.translate(object.x + object.width/2, object.y + object.height/2);
        object.rotation += object.rotationSpeed;
        ctx.rotate(object.rotation);
        drawStar(0, 0, 5, object.width/2, object.width/4, object.color);
        if (object.effect === 'glow') {
            drawStarGlow(0, 0, object.width/2 + 5, object.color);
        }
        ctx.restore();
    });

    // Draw score popups
    drawScorePopups();
}

function drawVisualEffects() {
    visualEffects.forEach(effect => {
        ctx.save();
        ctx.globalAlpha = effect.alpha;
        
        switch(effect.type) {
            case 'starburst':
                ctx.beginPath();
                ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 2;
                ctx.stroke();
                break;
                
            case 'sparkle':
                ctx.translate(effect.x, effect.y);
                ctx.rotate(effect.rotation);
                drawStar(0, 0, 5, effect.size, effect.size/2, '#FFD700');
                break;
        }
        
        ctx.restore();
    });
}

function drawStarGlow(cx, cy, radius, color) {
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Score popup system
function createScorePopup(x, y, text, color = '#FFD700') {
    scorePopups.push({
        x,
        y,
        text,
        color,
        alpha: 1,
        life: 60
    });
}

function updateScorePopups() {
    for (let i = scorePopups.length - 1; i >= 0; i--) {
        const popup = scorePopups[i];
        popup.y -= 1;
        popup.alpha -= 1/60;
        if (popup.alpha <= 0) {
            scorePopups.splice(i, 1);
        }
    }
}

function drawScorePopups() {
    scorePopups.forEach(popup => {
        ctx.save();
        ctx.globalAlpha = popup.alpha;
        ctx.font = '20px Arial';
        ctx.fillStyle = popup.color;
        ctx.textAlign = 'center';
        ctx.fillText(popup.text, popup.x, popup.y);
        ctx.restore();
    });
}

// Function to draw Neale as a humanoid
function drawNeale(x, y) {
    // Update trail
    neale.trail.push({ x: x + neale.width/2, y: y + neale.height/2 });
    if (neale.trail.length > VISUAL_SETTINGS.trailLength) {
        neale.trail.shift();
    }

    // Draw trail
    if (neale.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(neale.trail[0].x, neale.trail[0].y);
        for (let i = 1; i < neale.trail.length; i++) {
            ctx.lineTo(neale.trail[i].x, neale.trail[i].y);
        }
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.3)';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    // Glow effect
    const glow = ctx.createRadialGradient(
        x + neale.width/2, y + 40,
        0,
        x + neale.width/2, y + 40,
        80
    );
    glow.addColorStop(0, 'rgba(255, 215, 0, 0.2)');
    glow.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(x - 20, y - 20, neale.width + 40, neale.height + 40);

    // Head with glow
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x + neale.width/2, y + 15, 15, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Body with gradient
    const bodyGradient = ctx.createLinearGradient(x + 10, y + 30, x + 30, y + 60);
    bodyGradient.addColorStop(0, '#FF6B6B');
    bodyGradient.addColorStop(1, '#FF4444');
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(x + 10, y + 30, 20, 30);

    // Legs with gradient
    ctx.fillRect(x + 10, y + 60, 8, 20);
    ctx.fillRect(x + 22, y + 60, 8, 20);

    // Arms with gradient
    ctx.fillRect(x, y + 35, 10, 8);
    ctx.fillRect(x + 30, y + 35, 10, 8);

    // Face
    ctx.fillStyle = 'black';
    // Eyes with shine
    ctx.beginPath();
    ctx.arc(x + neale.width/2 - 5, y + 15, 2, 0, Math.PI * 2);
    ctx.arc(x + neale.width/2 + 5, y + 15, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add eye shine
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x + neale.width/2 - 6, y + 14, 1, 0, Math.PI * 2);
    ctx.arc(x + neale.width/2 + 4, y + 14, 1, 0, Math.PI * 2);
    ctx.fill();

    // Smile with gradient
    const smileGradient = ctx.createLinearGradient(
        x + neale.width/2 - 8, y + 15,
        x + neale.width/2 + 8, y + 15
    );
    smileGradient.addColorStop(0, '#333');
    smileGradient.addColorStop(1, '#000');
    ctx.strokeStyle = smileGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + neale.width/2, y + 15, 8, 0, Math.PI, false);
    ctx.stroke();
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
    gameSpeed = 1;
    gameActive = true;
    
    // Reset arrays
    fallingObjects.length = 0;
    scorePopups.length = 0;
    visualEffects.length = 0;
    
    // Reset player position
    neale.x = canvas.width / 2;
    
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
    lastSpawnTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// Start the game when the window loads
window.addEventListener('load', initGame); 