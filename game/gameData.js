// Game story and dialogue
const storyDialogue = {
    intro: {
        title: "The Beginning",
        text: "In the digital realm of AI research, Neale embarks on a journey to understand the depths of artificial consciousness. Each scroll contains valuable research data...",
        trigger: "start"
    },
    levels: [
        {
            id: 1,
            intro: "Welcome to the Training Ground. Here, you'll learn the basics of data collection and movement.",
            completion: "Well done! You've mastered the basics. The real research begins now."
        },
        {
            id: 2,
            intro: "The Temple Gardens hold ancient wisdom about neural networks. Each scroll reveals new patterns.",
            completion: "Fascinating! The scrolls suggest a connection between consciousness and emergent behavior."
        },
        {
            id: 3,
            name: "Digital Caverns",
            intro: "Deep in the digital caverns, breakthrough algorithms await discovery.",
            completion: "These findings could revolutionize our understanding of AI consciousness!"
        },
        {
            id: 4,
            name: "Quantum Peaks",
            intro: "At these heights, quantum computing principles merge with neural architecture.",
            completion: "The quantum patterns in these scrolls... they're unlike anything we've seen before."
        },
        {
            id: 5,
            name: "Ethics Valley",
            intro: "Here we must balance progress with responsibility. The scrolls contain crucial ethical guidelines.",
            completion: "With great power comes great responsibility. These ethical principles will guide our research."
        }
    ]
};

// Upgrade system
const upgrades = {
    jumpPower: {
        name: "Enhanced Jump",
        levels: [
            { cost: 300, power: -20, description: "Increase jump height by 10%" },
            { cost: 600, power: -22, description: "Increase jump height by 20%" },
            { cost: 1000, power: -24, description: "Increase jump height by 30%" }
        ],
        currentLevel: 0
    },
    speed: {
        name: "Movement Speed",
        levels: [
            { cost: 200, speed: 6, description: "Increase movement speed by 20%" },
            { cost: 400, speed: 7, description: "Increase movement speed by 40%" },
            { cost: 800, speed: 8, description: "Increase movement speed by 60%" }
        ],
        currentLevel: 0
    },
    doubleJump: {
        name: "Double Jump",
        levels: [
            { cost: 1000, description: "Unlock the ability to jump again in mid-air" }
        ],
        currentLevel: 0,
        unlocked: false
    }
};

// Extended level definitions
const gameLevels = [
    {
        id: 1,
        name: "Training Ground",
        platforms: [
            { x: 0, y: 580, width: 800, height: 20, type: 'ground' },
            { x: 200, y: 450, width: 100, height: 20, type: 'platform' },
            { x: 400, y: 380, width: 100, height: 20, type: 'platform' },
            { x: 600, y: 450, width: 100, height: 20, type: 'platform' }
        ],
        collectibles: [
            { x: 250, y: 400, type: 'scroll', collected: false },
            { x: 450, y: 330, type: 'scroll', collected: false },
            { x: 650, y: 400, type: 'scroll', collected: false }
        ],
        background: '#1a1a2e'
    },
    {
        id: 2,
        name: "Temple Gardens",
        platforms: [
            { x: 0, y: 580, width: 800, height: 20, type: 'ground' },
            { x: 100, y: 480, width: 100, height: 20, type: 'platform' },
            { x: 300, y: 420, width: 100, height: 20, type: 'platform' },
            { x: 500, y: 360, width: 100, height: 20, type: 'platform' },
            { x: 700, y: 300, width: 100, height: 20, type: 'platform' }
        ],
        collectibles: [
            { x: 150, y: 430, type: 'scroll', collected: false },
            { x: 350, y: 370, type: 'scroll', collected: false },
            { x: 550, y: 310, type: 'scroll', collected: false },
            { x: 750, y: 250, type: 'scroll', collected: false }
        ],
        background: '#1a2d3e'
    },
    {
        id: 3,
        name: "Digital Caverns",
        platforms: [
            { x: 0, y: 580, width: 800, height: 20, type: 'ground' },
            { x: 150, y: 500, width: 80, height: 20, type: 'platform' },
            { x: 350, y: 450, width: 80, height: 20, type: 'platform' },
            { x: 200, y: 350, width: 80, height: 20, type: 'platform' },
            { x: 400, y: 300, width: 80, height: 20, type: 'platform' },
            { x: 600, y: 250, width: 80, height: 20, type: 'platform' }
        ],
        collectibles: [
            { x: 180, y: 450, type: 'scroll', collected: false },
            { x: 380, y: 400, type: 'scroll', collected: false },
            { x: 230, y: 300, type: 'scroll', collected: false },
            { x: 430, y: 250, type: 'scroll', collected: false },
            { x: 630, y: 200, type: 'scroll', collected: false }
        ],
        background: '#141452'
    },
    {
        id: 4,
        name: "Quantum Peaks",
        platforms: [
            { x: 0, y: 580, width: 800, height: 20, type: 'ground' },
            { x: 100, y: 500, width: 60, height: 20, type: 'platform' },
            { x: 300, y: 450, width: 60, height: 20, type: 'platform' },
            { x: 500, y: 400, width: 60, height: 20, type: 'platform' },
            { x: 400, y: 300, width: 60, height: 20, type: 'platform' },
            { x: 200, y: 250, width: 60, height: 20, type: 'platform' },
            { x: 350, y: 180, width: 60, height: 20, type: 'platform' }
        ],
        collectibles: [
            { x: 120, y: 450, type: 'scroll', collected: false },
            { x: 320, y: 400, type: 'scroll', collected: false },
            { x: 520, y: 350, type: 'scroll', collected: false },
            { x: 420, y: 250, type: 'scroll', collected: false },
            { x: 220, y: 200, type: 'scroll', collected: false },
            { x: 370, y: 130, type: 'scroll', collected: false }
        ],
        background: '#1a0a2e'
    },
    {
        id: 5,
        name: "Ethics Valley",
        platforms: [
            { x: 0, y: 580, width: 800, height: 20, type: 'ground' },
            { x: 700, y: 500, width: 100, height: 20, type: 'platform' },
            { x: 500, y: 450, width: 100, height: 20, type: 'platform' },
            { x: 300, y: 400, width: 100, height: 20, type: 'platform' },
            { x: 100, y: 350, width: 100, height: 20, type: 'platform' },
            { x: 250, y: 250, width: 100, height: 20, type: 'platform' },
            { x: 450, y: 200, width: 100, height: 20, type: 'platform' }
        ],
        collectibles: [
            { x: 750, y: 450, type: 'scroll', collected: false },
            { x: 550, y: 400, type: 'scroll', collected: false },
            { x: 350, y: 350, type: 'scroll', collected: false },
            { x: 150, y: 300, type: 'scroll', collected: false },
            { x: 300, y: 200, type: 'scroll', collected: false },
            { x: 500, y: 150, type: 'scroll', collected: false }
        ],
        background: '#2a1a3e'
    }
];

// Game story and lore
const gameLore = {
    title: "Fun With Neale: The AI Adventure",
    chapters: [
        {
            id: 1,
            title: "The Digital Pioneer",
            story: "Meet Neale, a brilliant AI researcher pushing the boundaries of artificial intelligence. In this virtual world, you control Neale as they collect data points and insights that could revolutionize the field of AI. Each collected point represents a breakthrough in understanding machine learning and consciousness.",
            unlockScore: 0
        },
        {
            id: 2,
            title: "Neural Networks Unleashed",
            story: "As Neale gathers more data, patterns begin to emerge. The neural networks they've designed start showing signs of unprecedented learning capabilities. But with great power comes great responsibility - the AI systems are becoming more complex and harder to control...",
            unlockScore: 100
        },
        {
            id: 3,
            title: "The Ethical Dilemma",
            story: "Strange anomalies begin appearing in the data - signs of emergent behavior in the AI systems. Neale must now balance the pursuit of scientific breakthrough with ethical considerations. Can they maintain control while pushing the boundaries of what's possible?",
            unlockScore: 300
        }
    ]
};

// Character progression system
const progression = {
    levels: [
        { level: 1, expRequired: 0, title: "Junior Researcher" },
        { level: 2, expRequired: 100, title: "AI Engineer" },
        { level: 3, expRequired: 300, title: "ML Architect" },
        { level: 4, expRequired: 600, title: "AI Pioneer" },
        { level: 5, expRequired: 1000, title: "Digital Visionary" }
    ]
};

// Visual effects for different star types
const starTypes = {
    common: {
        color: '#FFD700',
        points: 10,
        exp: 1,
        probability: 0.7
    },
    rare: {
        color: '#00BFFF',
        points: 20,
        exp: 2,
        probability: 0.2,
        effect: 'sparkle'
    },
    legendary: {
        color: '#FF69B4',
        points: 50,
        exp: 5,
        probability: 0.1,
        effect: 'glow'
    }
};

// Enemy types and configurations
const enemies = {
    drone: {
        name: "Security Drone",
        width: 40,
        height: 40,
        speed: 2,
        health: 2,
        damage: 1,
        points: 50,
        behavior: 'patrol',
        sprite: {
            frameCount: 4,
            animationSpeed: 0.1
        }
    },
    virus: {
        name: "Digital Virus",
        width: 30,
        height: 30,
        speed: 3,
        health: 1,
        damage: 1,
        points: 30,
        behavior: 'chase',
        sprite: {
            frameCount: 4,
            animationSpeed: 0.15
        }
    },
    firewall: {
        name: "Firewall Guardian",
        width: 50,
        height: 60,
        speed: 1,
        health: 4,
        damage: 2,
        points: 100,
        behavior: 'stationary',
        sprite: {
            frameCount: 6,
            animationSpeed: 0.08
        }
    }
};

// Katana combat configuration
const combat = {
    katana: {
        damage: 1,
        range: 60,
        attackSpeed: 0.5,
        animations: {
            slash: {
                frameCount: 6,
                duration: 300,
                hitFrame: 3
            },
            special: {
                frameCount: 8,
                duration: 500,
                hitFrame: 4,
                cooldown: 2000
            }
        }
    }
};

// Update level definitions to include enemies
gameLevels.forEach(level => {
    level.enemies = [];
    
    // Add different enemy configurations for each level
    switch(level.id) {
        case 1:
            level.enemies.push(
                { type: 'drone', x: 300, y: 400, patrolStart: 200, patrolEnd: 500 }
            );
            break;
        case 2:
            level.enemies.push(
                { type: 'drone', x: 200, y: 400, patrolStart: 100, patrolEnd: 400 },
                { type: 'virus', x: 600, y: 300 }
            );
            break;
        case 3:
            level.enemies.push(
                { type: 'drone', x: 300, y: 400, patrolStart: 200, patrolEnd: 500 },
                { type: 'virus', x: 500, y: 250 },
                { type: 'firewall', x: 650, y: 500 }
            );
            break;
        case 4:
            level.enemies.push(
                { type: 'virus', x: 400, y: 200 },
                { type: 'virus', x: 600, y: 350 },
                { type: 'firewall', x: 200, y: 450 }
            );
            break;
        case 5:
            level.enemies.push(
                { type: 'drone', x: 300, y: 300, patrolStart: 200, patrolEnd: 400 },
                { type: 'virus', x: 500, y: 400 },
                { type: 'firewall', x: 700, y: 500 },
                { type: 'firewall', x: 100, y: 300 }
            );
            break;
    }
}); 