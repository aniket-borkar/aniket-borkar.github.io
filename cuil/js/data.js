/**
 * Data definitions for the Cuil Visualization
 */

// Type colors for visualization and UI - vibrant colors
const typeColors = {
  "Literature": "#60a5fa", // bright blue
  "Drama": "#f97316", // bright orange
  "Poetry": "#a855f7", // bright purple
  "Visual Art": "#10b981", // bright green
  "Sculpture": "#ef4444", // bright red
  "Film": "#818cf8", // bright indigo
  "Television": "#ec4899", // bright pink
  "Music": "#fbbf24" // bright yellow
};

// Tailwind CSS classes for type badges
const typeBgColors = {
  "Literature": "bg-blue-500 bg-opacity-20 text-blue-300",
  "Drama": "bg-orange-500 bg-opacity-20 text-orange-300", 
  "Poetry": "bg-purple-500 bg-opacity-20 text-purple-300",
  "Visual Art": "bg-green-500 bg-opacity-20 text-green-300",
  "Sculpture": "bg-red-500 bg-opacity-20 text-red-300",
  "Film": "bg-indigo-500 bg-opacity-20 text-indigo-300",
  "Television": "bg-pink-500 bg-opacity-20 text-pink-300",
  "Music": "bg-yellow-500 bg-opacity-20 text-yellow-300"
};

// Works data
const works = [
  {"name": "Pride and Prejudice", "a": 2, "b": 2, "type": "Literature"},
  {"name": "1984", "a": -1, "b": 3, "type": "Literature"},
  {"name": "To Kill a Mockingbird", "a": 2, "b": 2, "type": "Literature"},
  {"name": "The Great Gatsby", "a": 1, "b": 2, "type": "Literature"},
  {"name": "One Hundred Years of Solitude", "a": -2, "b": 4, "type": "Literature"},
  {"name": "The Metamorphosis", "a": -3, "b": 4, "type": "Literature"},
  {"name": "Brave New World", "a": -1, "b": 3, "type": "Literature"},
  {"name": "The Catcher in the Rye", "a": 1, "b": 2, "type": "Literature"},
  {"name": "Beloved", "a": -1, "b": 3, "type": "Literature"},
  {"name": "Don Quixote", "a": -2, "b": 3, "type": "Literature"},
  {"name": "Hamlet", "a": 1, "b": 2, "type": "Drama"},
  {"name": "Waiting for Godot", "a": -2, "b": 4, "type": "Drama"},
  {"name": "A Streetcar Named Desire", "a": 1, "b": 2, "type": "Drama"},
  {"name": "Death of a Salesman", "a": 1, "b": 2, "type": "Drama"},
  {"name": "Rosencrantz and Guildenstern Are Dead", "a": -1, "b": 3, "type": "Drama"},
  {"name": "Oedipus Rex", "a": 1, "b": 2, "type": "Drama"},
  {"name": "The Crucible", "a": 1, "b": 2, "type": "Drama"},
  {"name": "The Waste Land", "a": -2, "b": 3, "type": "Poetry"},
  {"name": "Howl", "a": -1, "b": 3, "type": "Poetry"},
  {"name": "Sonnet 18", "a": 2, "b": 1, "type": "Poetry"},
  {"name": "The Love Song of J. Alfred Prufrock", "a": -1, "b": 2, "type": "Poetry"},
  {"name": "Ode to a Nightingale", "a": 1, "b": 2, "type": "Poetry"},
  {"name": "Do Not Go Gentle into That Good Night", "a": 1, "b": 2, "type": "Poetry"},
  {"name": "The Raven", "a": -1, "b": 3, "type": "Poetry"},
  {"name": "Leaves of Grass", "a": 1, "b": 2, "type": "Poetry"},
  {"name": "Mona Lisa", "a": 2, "b": 1, "type": "Visual Art"},
  {"name": "The Starry Night", "a": 1, "b": 3, "type": "Visual Art"},
  {"name": "Guernica", "a": -1, "b": 4, "type": "Visual Art"},
  {"name": "The Persistence of Memory", "a": -2, "b": 4, "type": "Visual Art"},
  {"name": "American Gothic", "a": 2, "b": 1, "type": "Visual Art"},
  {"name": "The Scream", "a": -1, "b": 3, "type": "Visual Art"},
  {"name": "Nighthawks", "a": 2, "b": 1, "type": "Visual Art"},
  {"name": "Les Demoiselles d'Avignon", "a": -2, "b": 3, "type": "Visual Art"},
  {"name": "David", "a": 2, "b": 1, "type": "Sculpture"},
  {"name": "The Thinker", "a": 2, "b": 1, "type": "Sculpture"},
  {"name": "Venus de Milo", "a": 2, "b": 1, "type": "Sculpture"},
  {"name": "Balloon Dog", "a": -1, "b": 2, "type": "Sculpture"},
  {"name": "Citizen Kane", "a": 1, "b": 2, "type": "Film"},
  {"name": "The Godfather", "a": 2, "b": 1, "type": "Film"},
  {"name": "Pulp Fiction", "a": -1, "b": 3, "type": "Film"},
  {"name": "The Matrix", "a": 1, "b": 3, "type": "Film"},
  {"name": "Inception", "a": -1, "b": 4, "type": "Film"},
  {"name": "Blade Runner", "a": -1, "b": 3, "type": "Film"},
  {"name": "Eternal Sunshine of the Spotless Mind", "a": -2, "b": 4, "type": "Film"},
  {"name": "Casablanca", "a": 2, "b": 1, "type": "Film"},
  {"name": "The Sopranos", "a": 1, "b": 2, "type": "Television"},
  {"name": "Twin Peaks", "a": -2, "b": 4, "type": "Television"},
  {"name": "Breaking Bad", "a": 1, "b": 2, "type": "Television"},
  {"name": "Moonlight Sonata", "a": 1, "b": 2, "type": "Music"},
  {"name": "The Rite of Spring", "a": -1, "b": 3, "type": "Music"}
];

// Extract unique categories
const categories = [...new Set(works.map(work => work.type))];

// Work descriptions (for selected works)
const descriptions = {
  "Pride and Prejudice": "A classic novel of manners with a conventional narrative structure set in early 19th century England, exploring marriage and social class.",
  "1984": "A dystopian novel set in a negative future where individuality is suppressed, exploring unconventional political themes with a straightforward narrative.",
  "The Great Gatsby": "Set in the Jazz Age on Long Island, this novel presents a somewhat conventional narrative about wealth and the American Dream.",
  "One Hundred Years of Solitude": "A landmark magical realist novel with non-linear narrative exploring multiple generations of a family in the fictional town of Macondo.",
  "The Metamorphosis": "A highly surreal narrative beginning with a man transforming into an insect, set in a conventional domestic environment.",
  "Twin Peaks": "David Lynch's surreal television series set in a small town where conventional reality gradually gives way to dream logic and supernatural elements.",
  "The Persistence of Memory": "Salvador Dalí's iconic surrealist painting featuring melting clocks in a dreamlike landscape that defies physical reality."
}; 