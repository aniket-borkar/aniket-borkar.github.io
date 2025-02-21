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

// Available upgrades
const upgrades = {
    speed: {
        name: "Swift Steps",
        levels: [
            { level: 1, cost: 50, multiplier: 1.2, description: "Increase movement speed by 20%" },
            { level: 2, cost: 100, multiplier: 1.4, description: "Increase movement speed by 40%" },
            { level: 3, cost: 200, multiplier: 1.6, description: "Increase movement speed by 60%" }
        ]
    },
    collection: {
        name: "Star Magnetism",
        levels: [
            { level: 1, cost: 75, radius: 1.2, description: "Increase star collection radius by 20%" },
            { level: 2, cost: 150, radius: 1.4, description: "Increase star collection radius by 40%" },
            { level: 3, cost: 300, radius: 1.6, description: "Increase star collection radius by 60%" }
        ]
    },
    lives: {
        name: "Celestial Vitality",
        levels: [
            { level: 1, cost: 100, bonus: 1, description: "Gain +1 extra life" },
            { level: 2, cost: 200, bonus: 2, description: "Gain +2 extra lives" },
            { level: 3, cost: 400, bonus: 3, description: "Gain +3 extra lives" }
        ]
    },
    special: {
        name: "Star Burst",
        levels: [
            { level: 1, cost: 150, cooldown: 30, description: "Unleash a burst of energy that collects all stars on screen" },
            { level: 2, cost: 300, cooldown: 20, description: "Reduced cooldown and increased range" },
            { level: 3, cost: 600, cooldown: 10, description: "Maximum power and minimum cooldown" }
        ]
    }
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