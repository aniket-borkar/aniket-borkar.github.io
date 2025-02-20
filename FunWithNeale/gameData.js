// Game story and lore
const gameLore = {
    title: "Starfall Guardian: The Celestial Collection",
    chapters: [
        {
            id: 1,
            title: "The First Star",
            story: "In the cosmic realm of Aethoria, you are Neale, the last of the Star Guardians. Your sacred duty is to collect fallen stars before they touch the ground and release chaotic energy. Each star contains ancient wisdom and power that can help restore balance to the universe.",
            unlockScore: 0
        },
        {
            id: 2,
            title: "The Growing Power",
            story: "As you collect more stars, you begin to feel their energy coursing through you. The ancient powers of the Star Guardians slowly awaken within you. But beware - dark forces have noticed your activities...",
            unlockScore: 100
        },
        {
            id: 3,
            title: "The Dark Seeker",
            story: "Shadow creatures begin appearing, trying to intercept the falling stars. Your mission becomes more urgent - you must prevent these cosmic forces from falling into the wrong hands.",
            unlockScore: 300
        }
    ]
};

// Character progression system
const progression = {
    levels: [
        { level: 1, expRequired: 0, title: "Novice Guardian" },
        { level: 2, expRequired: 100, title: "Star Apprentice" },
        { level: 3, expRequired: 300, title: "Stellar Adept" },
        { level: 4, expRequired: 600, title: "Cosmic Collector" },
        { level: 5, expRequired: 1000, title: "Master Guardian" }
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