/**
 * Data definitions for the Cuil Visualization
 */

// Make variables global by attaching to window
window.allWorks = [];
window.descriptions = {};
window.categories = [];

// Log global variables initialization
console.log("Global variables initialized:", {
  "allWorks empty array": Array.isArray(window.allWorks),
  "descriptions empty object": typeof window.descriptions === "object",
  "categories empty array": Array.isArray(window.categories)
});

// Type colors for visualization and UI - vibrant colors
const typeColors = {
  "Literature": "#60a5fa", // bright blue
  "Drama": "#f97316", // bright orange
  "Poetry": "#a855f7", // bright purple
  "Visual Art": "#10b981", // bright green
  "Sculpture": "#ef4444", // bright red
  "Film": "#818cf8", // bright indigo
  "Television": "#ec4899", // bright pink
  "Music": "#fbbf24", // bright yellow
  "Architecture": "#06b6d4", // bright cyan
  "Photography": "#8b5cf6" // bright violet
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
  "Music": "bg-yellow-500 bg-opacity-20 text-yellow-300",
  "Architecture": "bg-cyan-500 bg-opacity-20 text-cyan-300",
  "Photography": "bg-violet-500 bg-opacity-20 text-violet-300"
};

/**
 * COMPLEX PLANE QUADRANTS:
 * Q1 (+a, +b): Conventional context, positive abstraction
 * Q2 (-a, +b): Unconventional context, positive abstraction
 * Q3 (-a, -b): Unconventional context, hyper realism
 * Q4 (+a, -b): Conventional context, hyper realism
 */

// Initialize descriptions for specific works
window.descriptions["Sargent's Madame X"] = "This portrait adheres to conventional portraiture traditions (a = 2.2) with moderate abstraction (b = 1.2) through its bold use of negative space and psychological tension. Its elegant minimalism and contrast between pale skin and black dress create a striking image that transcends mere likeness.";

window.descriptions["Anna Karenina"] = "Tolstoy's novel employs conventional 19th-century narrative techniques (a = 1.9) with moderate abstraction (b = 1.3) through its psychological depth and philosophical digressions. Its realistic social portrayal is elevated by moral complexity and symbolic elements.";

window.descriptions["Frida Kahlo's Self-Portraits"] = "These paintings reject conventional portraiture (a = -1.8) with high abstraction (b = 2.4) through their symbolic elements and psychological intensity. They transform personal trauma into universal statements through surreal juxtapositions and mythological references.";

window.descriptions["Persona"] = "Bergman's film breaks with narrative convention (a = -2.2) with very high abstraction (b = 3.1) through its exploration of identity dissolution and psychological merging. Its stark imagery and experimental techniques create a dreamlike examination of human consciousness.";

window.descriptions["The Sound and the Fury"] = "Faulkner's novel abandons linear narrative (a = -2.7) with intense hyper-realism (b = -2.0) through its stream-of-consciousness technique and shifting perspectives. Its microscopic attention to sensory detail and psychological states creates an unfiltered experience of subjective reality.";

window.descriptions["Lucian Freud's Sleeping by the Lion Carpet"] = "This painting employs traditional portraiture format (a = 1.3) with strong hyper-realism (b = -2.3) through its unflinching depiction of flesh and physiological vulnerability. Its impasto technique and harsh lighting emphasize the physical materiality of the human body.";

// Consolidated collection of all art works
window.allWorks = [
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  {"name": "Mona Lisa", "a": 2.3, "b": 1.5, "type": "Visual Art"},
  {"name": "Pride and Prejudice", "a": 1.8, "b": 0.9, "type": "Literature"},
  {"name": "The Godfather", "a": 1.5, "b": 1.7, "type": "Film"},
  {"name": "Symphony No. 9", "a": 2.4, "b": 2.1, "type": "Music"},
  {"name": "Notre-Dame Cathedral", "a": 2.7, "b": 1.2, "type": "Architecture"},
  {"name": "Michelangelo's David", "a": 1.6, "b": 0.5, "type": "Sculpture"},
  {"name": "The Night Watch", "a": 1.4, "b": 1.8, "type": "Visual Art"},
  {"name": "Hamlet", "a": 0.8, "b": 1.4, "type": "Drama"},
  {"name": "To Kill a Mockingbird", "a": 1.2, "b": 0.7, "type": "Literature"},
  {"name": "Ansel Adams' Landscapes", "a": 1.9, "b": 0.6, "type": "Photography"},
  {"name": "Star Wars: A New Hope", "a": 0.9, "b": 2.3, "type": "Film"},
  {"name": "The Great British Bake Off", "a": 2.5, "b": 0.3, "type": "Television"},
  {"name": "Sargent's Madame X", "a": 2.2, "b": 1.2, "type": "Visual Art"},
  {"name": "Anna Karenina", "a": 1.9, "b": 1.3, "type": "Literature"},
  {"name": "The Goldfinch", "a": 1.7, "b": 1.1, "type": "Literature"},
  {"name": "Casablanca", "a": 1.8, "b": 1.4, "type": "Film"},
  {"name": "Monet's Water Lilies", "a": 1.5, "b": 1.9, "type": "Visual Art"},
  {"name": "Swan Lake", "a": 2.1, "b": 1.7, "type": "Music"},
  {"name": "Empire State Building", "a": 2.3, "b": 0.8, "type": "Architecture"},
  {"name": "Rodin's The Kiss", "a": 1.8, "b": 1.0, "type": "Sculpture"},
  {"name": "Jane Eyre", "a": 1.4, "b": 1.2, "type": "Literature"},
  {"name": "The Seventh Seal", "a": 1.3, "b": 2.0, "type": "Film"},
  {"name": "Tchaikovsky's 1812 Overture", "a": 2.2, "b": 1.6, "type": "Music"},
  {"name": "The Office", "a": 1.7, "b": 0.7, "type": "Television"},
  {"name": "Parthenon", "a": 2.8, "b": 0.9, "type": "Architecture"},
  {"name": "The Old Man and the Sea", "a": 1.6, "b": 0.8, "type": "Literature"},
  {"name": "Rembrandt's Self-Portraits", "a": 1.9, "b": 1.4, "type": "Visual Art"},
  {"name": "Citizen Kane", "a": 1.2, "b": 1.9, "type": "Film"},
  {"name": "Mozart's The Magic Flute", "a": 2.0, "b": 1.5, "type": "Music"},
  {"name": "The Great Gatsby", "a": 1.3, "b": 1.6, "type": "Literature"},
  {"name": "Game of Thrones", "a": 1.1, "b": 2.2, "type": "Television"},
  {"name": "St. Peter's Basilica", "a": 2.6, "b": 1.3, "type": "Architecture"},
  {"name": "The Nutcracker", "a": 2.3, "b": 1.1, "type": "Music"},
  {"name": "Van Gogh's Starry Night", "a": 1.0, "b": 2.2, "type": "Visual Art"},
  {"name": "The Maltese Falcon", "a": 1.5, "b": 0.9, "type": "Film"},
  {"name": "War and Peace", "a": 2.0, "b": 1.2, "type": "Literature"},
  {"name": "Friends", "a": 2.4, "b": 0.5, "type": "Television"},
  {"name": "The Birth of Venus", "a": 2.2, "b": 1.0, "type": "Visual Art"},
  {"name": "Saving Private Ryan", "a": 1.9, "b": 0.8, "type": "Film"},
  {"name": "Debussy's Claire de Lune", "a": 1.6, "b": 2.0, "type": "Music"},
  {"name": "The Chrysler Building", "a": 2.0, "b": 1.4, "type": "Architecture"},
  {"name": "Lord of the Rings", "a": 1.3, "b": 1.8, "type": "Literature"},
  {"name": "Downton Abbey", "a": 2.2, "b": 0.6, "type": "Television"},
  {"name": "Madame Bovary", "a": 1.8, "b": 1.0, "type": "Literature"},
  {"name": "Rear Window", "a": 1.6, "b": 1.3, "type": "Film"},
  {"name": "Beethoven's Symphony No. 5", "a": 2.1, "b": 1.4, "type": "Music"},
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Guernica", "a": -1.3, "b": 2.1, "type": "Visual Art"},
  {"name": "Ulysses", "a": -2.1, "b": 1.8, "type": "Literature"},
  {"name": "Pulp Fiction", "a": -1.7, "b": 1.5, "type": "Film"},
  {"name": "Rite of Spring", "a": -2.5, "b": 2.8, "type": "Music"},
  {"name": "Falling Water", "a": -0.8, "b": 1.7, "type": "Architecture"},
  {"name": "Fountain (Duchamp)", "a": -2.8, "b": 3.0, "type": "Sculpture"},
  {"name": "Dali's The Persistence of Memory", "a": -1.5, "b": 2.7, "type": "Visual Art"},
  {"name": "Waiting for Godot", "a": -2.4, "b": 2.5, "type": "Drama"},
  {"name": "The Waste Land", "a": -1.9, "b": 2.2, "type": "Poetry"},
  {"name": "Man Ray's Rayographs", "a": -2.2, "b": 2.6, "type": "Photography"},
  {"name": "2001: A Space Odyssey", "a": -1.6, "b": 2.9, "type": "Film"},
  {"name": "Twin Peaks", "a": -1.8, "b": 2.0, "type": "Television"},
  {"name": "Frida Kahlo's Self-Portraits", "a": -1.8, "b": 2.4, "type": "Visual Art"},
  {"name": "Persona", "a": -2.2, "b": 3.1, "type": "Film"},
  {"name": "Infinite Jest", "a": -2.4, "b": 2.3, "type": "Literature"},
  {"name": "Blue Velvet", "a": -1.9, "b": 2.2, "type": "Film"},
  {"name": "Kandinsky's Compositions", "a": -2.0, "b": 3.0, "type": "Visual Art"},
  {"name": "John Cage's 4'33\"", "a": -3.0, "b": 3.3, "type": "Music"},
  {"name": "Sagrada Familia", "a": -1.2, "b": 2.5, "type": "Architecture"},
  {"name": "Koons' Balloon Dog", "a": -1.4, "b": 1.9, "type": "Sculpture"},
  {"name": "Finnegans Wake", "a": -3.1, "b": 3.4, "type": "Literature"},
  {"name": "Rosencrantz and Guildenstern Are Dead", "a": -1.7, "b": 2.3, "type": "Drama"},
  {"name": "e. e. cummings' Poetry", "a": -1.5, "b": 2.0, "type": "Poetry"},
  {"name": "Cindy Sherman's Film Stills", "a": -1.3, "b": 2.4, "type": "Photography"},
  {"name": "Mulholland Drive", "a": -2.3, "b": 2.7, "type": "Film"},
  {"name": "The Leftovers", "a": -1.6, "b": 2.5, "type": "Television"},
  {"name": "Mondrian's Compositions", "a": -1.9, "b": 2.6, "type": "Visual Art"},
  {"name": "Philip Glass's Einstein on the Beach", "a": -2.2, "b": 2.9, "type": "Music"},
  {"name": "CCTV Headquarters", "a": -1.1, "b": 1.8, "type": "Architecture"},
  {"name": "Banksy's Street Art", "a": -1.5, "b": 2.1, "type": "Visual Art"},
  {"name": "House of Leaves", "a": -2.5, "b": 2.6, "type": "Literature"},
  {"name": "Being John Malkovich", "a": -1.8, "b": 2.2, "type": "Film"},
  {"name": "Bjork's Biophilia", "a": -2.0, "b": 2.5, "type": "Music"},
  {"name": "Legion", "a": -2.1, "b": 2.8, "type": "Television"},
  {"name": "Magritte's The Treachery of Images", "a": -1.4, "b": 2.3, "type": "Visual Art"},
  {"name": "Gravity's Rainbow", "a": -2.6, "b": 2.5, "type": "Literature"},
  {"name": "The Tree of Life", "a": -1.9, "b": 3.0, "type": "Film"},
  {"name": "Stockhausen's Helicopter Quartet", "a": -2.8, "b": 3.2, "type": "Music"},
  {"name": "Guggenheim Bilbao", "a": -1.3, "b": 2.2, "type": "Architecture"},
  {"name": "Yayoi Kusama's Infinity Rooms", "a": -1.7, "b": 2.9, "type": "Visual Art"},
  {"name": "The Crying of Lot 49", "a": -2.1, "b": 2.4, "type": "Literature"},
  {"name": "Mr. Robot", "a": -1.5, "b": 2.3, "type": "Television"},
  {"name": "Meredith Monk's Vocal Works", "a": -2.3, "b": 2.7, "type": "Music"},
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Duchamp's Étant donnés", "a": -1.5, "b": -1.8, "type": "Visual Art"},
  {"name": "Naked Lunch", "a": -2.7, "b": -1.5, "type": "Literature"},
  {"name": "Eraserhead", "a": -2.9, "b": -2.2, "type": "Film"},
  {"name": "Metal Machine Music", "a": -3.0, "b": -1.9, "type": "Music"},
  {"name": "Brutalist Architecture", "a": -1.2, "b": -1.3, "type": "Architecture"},
  {"name": "Damien Hirst's Preserved Shark", "a": -2.1, "b": -2.5, "type": "Sculpture"},
  {"name": "Francis Bacon's Figures", "a": -1.9, "b": -2.7, "type": "Visual Art"},
  {"name": "Artaud's Theatre of Cruelty", "a": -2.4, "b": -1.9, "type": "Drama"},
  {"name": "Allen Ginsberg's Howl", "a": -1.7, "b": -1.2, "type": "Poetry"},
  {"name": "Diane Arbus Portraits", "a": -1.6, "b": -2.4, "type": "Photography"},
  {"name": "Requiem for a Dream", "a": -2.0, "b": -2.8, "type": "Film"},
  {"name": "Black Mirror", "a": -1.5, "b": -2.1, "type": "Television"},
  {"name": "The Sound and the Fury", "a": -2.7, "b": -2.0, "type": "Literature"},
  {"name": "Crash", "a": -2.3, "b": -2.4, "type": "Literature"},
  {"name": "The Blair Witch Project", "a": -1.8, "b": -1.7, "type": "Film"},
  {"name": "Throbbing Gristle's Music", "a": -2.6, "b": -2.2, "type": "Music"},
  {"name": "Lebbeus Woods' Drawings", "a": -2.2, "b": -1.4, "type": "Architecture"},
  {"name": "Chapman Brothers' Sculptures", "a": -2.5, "b": -2.3, "type": "Sculpture"},
  {"name": "Otto Dix's War Series", "a": -1.7, "b": -2.5, "type": "Visual Art"},
  {"name": "Sarah Kane's Blasted", "a": -2.8, "b": -2.6, "type": "Drama"},
  {"name": "William S. Burroughs' Poetry", "a": -2.4, "b": -1.8, "type": "Poetry"},
  {"name": "Roger Ballen Photography", "a": -1.9, "b": -2.2, "type": "Photography"},
  {"name": "Irreversible", "a": -2.1, "b": -2.9, "type": "Film"},
  {"name": "True Detective Season 1", "a": -1.4, "b": -1.9, "type": "Television"},
  {"name": "American Psycho", "a": -1.8, "b": -2.3, "type": "Literature"},
  {"name": "Possession (Zulawski film)", "a": -2.5, "b": -2.7, "type": "Film"},
  {"name": "Scott Walker's Late Albums", "a": -2.3, "b": -2.0, "type": "Music"},
  {"name": "Tadao Ando's Church of Light", "a": -1.3, "b": -1.5, "type": "Architecture"},
  {"name": "Louise Bourgeois' Cells", "a": -1.8, "b": -1.7, "type": "Sculpture"},
  {"name": "Egon Schiele's Self-Portraits", "a": -1.5, "b": -2.1, "type": "Visual Art"},
  {"name": "Peter Greenaway's The Cook...", "a": -2.0, "b": -2.2, "type": "Film"},
  {"name": "Hannibal", "a": -1.6, "b": -2.4, "type": "Television"},
  {"name": "Blood Meridian", "a": -2.2, "b": -2.6, "type": "Literature"},
  {"name": "Gaspar Noé's Enter the Void", "a": -2.4, "b": -2.3, "type": "Film"},
  {"name": "Swans' To Be Kind", "a": -2.1, "b": -1.8, "type": "Music"},
  {"name": "A Clockwork Orange", "a": -1.9, "b": -2.0, "type": "Film"},
  {"name": "Hubert Selby Jr.'s Last Exit to Brooklyn", "a": -2.2, "b": -2.5, "type": "Literature"},
  {"name": "Merzbow's Noise Music", "a": -2.9, "b": -2.1, "type": "Music"},
  {"name": "Trenton Doyle Hancock's Paintings", "a": -1.7, "b": -1.9, "type": "Visual Art"},
  {"name": "Lars von Trier's Antichrist", "a": -2.6, "b": -2.8, "type": "Film"},
  {"name": "Dostoyevsky's Notes from Underground", "a": -1.6, "b": -1.8, "type": "Literature"},
  {"name": "David Cronenberg's Videodrome", "a": -2.3, "b": -2.2, "type": "Film"},
  {"name": "HR Giger's Biomechanical Art", "a": -2.0, "b": -2.3, "type": "Visual Art"},
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "Vermeer's Girl with a Pearl Earring", "a": 2.1, "b": -1.2, "type": "Visual Art"},
  {"name": "In Cold Blood", "a": 1.6, "b": -2.1, "type": "Literature"},
  {"name": "The Godfather Part II", "a": 1.8, "b": -1.5, "type": "Film"},
  {"name": "Adagio for Strings", "a": 2.2, "b": -0.9, "type": "Music"},
  {"name": "Bauhaus Architecture", "a": 1.9, "b": -1.6, "type": "Architecture"},
  {"name": "Rodin's The Thinker", "a": 2.0, "b": -1.1, "type": "Sculpture"},
  {"name": "Wyeth's Christina's World", "a": 1.5, "b": -1.9, "type": "Visual Art"},
  {"name": "Death of a Salesman", "a": 1.3, "b": -1.8, "type": "Drama"},
  {"name": "Robert Frost's Poetry", "a": 1.7, "b": -0.8, "type": "Poetry"},
  {"name": "Ansel Adams' Moonrise", "a": 2.3, "b": -1.0, "type": "Photography"},
  {"name": "The Shawshank Redemption", "a": 1.4, "b": -1.7, "type": "Film"},
  {"name": "Breaking Bad", "a": 1.2, "b": -2.3, "type": "Television"},
  {"name": "Lucian Freud's Sleeping by the Lion Carpet", "a": 1.3, "b": -2.3, "type": "Visual Art"},
  {"name": "Caravaggio's The Calling of St. Matthew", "a": 1.7, "b": -1.4, "type": "Visual Art"},
  {"name": "The Road", "a": 1.5, "b": -2.5, "type": "Literature"},
  {"name": "Schindler's List", "a": 1.9, "b": -1.8, "type": "Film"},
  {"name": "Górecki's Symphony No. 3", "a": 2.0, "b": -1.3, "type": "Music"},
  {"name": "Fallingwater", "a": 1.8, "b": -0.9, "type": "Architecture"},
  {"name": "Bernini's The Ecstasy of St. Teresa", "a": 2.1, "b": -1.2, "type": "Sculpture"},
  {"name": "Edward Hopper's Nighthawks", "a": 1.6, "b": -1.6, "type": "Visual Art"},
  {"name": "Long Day's Journey Into Night", "a": 1.4, "b": -2.1, "type": "Drama"},
  {"name": "Sylvia Plath's Ariel", "a": 1.3, "b": -1.7, "type": "Poetry"},
  {"name": "Sebastião Salgado's Genesis", "a": 1.8, "b": -1.5, "type": "Photography"},
  {"name": "No Country for Old Men", "a": 1.5, "b": -2.0, "type": "Film"},
  {"name": "The Sopranos", "a": 1.6, "b": -1.9, "type": "Television"},
  {"name": "John Singer Sargent's Portraits", "a": 2.2, "b": -1.1, "type": "Visual Art"},
  {"name": "Blood Meridian", "a": 1.4, "b": -2.4, "type": "Literature"},
  {"name": "There Will Be Blood", "a": 1.7, "b": -2.2, "type": "Film"},
  {"name": "Bach's St. Matthew Passion", "a": 2.5, "b": -0.7, "type": "Music"},
  {"name": "Le Corbusier's Villa Savoye", "a": 1.9, "b": -1.3, "type": "Architecture"},
  {"name": "Auguste Rodin's Burghers of Calais", "a": 1.8, "b": -1.4, "type": "Sculpture"},
  {"name": "Andrew Wyeth's Helga Pictures", "a": 1.6, "b": -1.8, "type": "Visual Art"},
  {"name": "The Wire", "a": 1.3, "b": -2.2, "type": "Television"},
  {"name": "Arundhati Roy's The God of Small Things", "a": 1.5, "b": -1.6, "type": "Literature"},
  {"name": "Apocalypse Now", "a": 1.7, "b": -1.9, "type": "Film"},
  {"name": "Hitchcock's Psycho", "a": 1.4, "b": -1.8, "type": "Film"},
  {"name": "Steinbeck's The Grapes of Wrath", "a": 1.8, "b": -1.7, "type": "Literature"},
  {"name": "Mahler's Symphony No. 5", "a": 2.0, "b": -1.2, "type": "Music"},
  {"name": "Chuck Close's Photorealism", "a": 1.9, "b": -2.0, "type": "Visual Art"},
  {"name": "Mad Men", "a": 1.5, "b": -1.5, "type": "Television"},
  {"name": "Flannery O'Connor's Stories", "a": 1.6, "b": -1.9, "type": "Literature"},
  {"name": "Taxi Driver", "a": 1.3, "b": -2.1, "type": "Film"},
  {"name": "Richard Avedon's Portraits", "a": 1.8, "b": -1.3, "type": "Photography"},
  {"name": "Thomas Hardy's Jude the Obscure", "a": 1.7, "b": -1.8, "type": "Literature"},
  {"name": "Goodfellas", "a": 1.5, "b": -1.7, "type": "Film"},
  {"name": "Annie Leibovitz's Celebrity Portraits", "a": 1.9, "b": -1.1, "type": "Photography"},
  {"name": "Raymond Carver's Short Stories", "a": 1.6, "b": -1.9, "type": "Literature"},
  {"name": "Philip Roth's American Pastoral", "a": 1.8, "b": -1.6, "type": "Literature"},
  {"name": "Edward Weston's Nudes", "a": 2.0, "b": -1.3, "type": "Photography"},
  {"name": "Michael Haneke's Amour", "a": 1.4, "b": -2.2, "type": "Film"},
  {"name": "Émile Zola's Germinal", "a": 1.7, "b": -2.0, "type": "Literature"},
  {"name": "Nan Goldin's The Ballad of Sexual Dependency", "a": 1.5, "b": -1.8, "type": "Photography"},
  {"name": "Cormac McCarthy's All the Pretty Horses", "a": 1.8, "b": -1.7, "type": "Literature"},
  {"name": "Jacques-Louis David's Death of Marat", "a": 2.1, "b": -1.4, "type": "Visual Art"},
  {"name": "John Steinbeck's Of Mice and Men", "a": 1.9, "b": -1.9, "type": "Literature"},
  {"name": "Mindhunter", "a": 1.6, "b": -2.1, "type": "Television"},
  {"name": "Dorothea Lange's Migrant Mother", "a": 2.0, "b": -1.5, "type": "Photography"},
  {"name": "Denis Villeneuve's Prisoners", "a": 1.7, "b": -2.0, "type": "Film"},
  {"name": "Theodore Dreiser's An American Tragedy", "a": 1.8, "b": -1.8, "type": "Literature"},
  {"name": "The Iliad", "a": 2.4, "b": 1.1, "type": "Literature"},
  {"name": "Taj Mahal", "a": 2.5, "b": 0.8, "type": "Architecture"},
  {"name": "Charles Dickens' A Tale of Two Cities", "a": 1.7, "b": 1.1, "type": "Literature"},
  {"name": "Vivaldi's Four Seasons", "a": 2.0, "b": 1.3, "type": "Music"},
  {"name": "The Shining", "a": 1.4, "b": 1.7, "type": "Film"},
  {"name": "Don Quixote", "a": 1.5, "b": 1.2, "type": "Literature"},
  {"name": "Goya's The Third of May 1808", "a": 1.8, "b": 1.4, "type": "Visual Art"},
  {"name": "Rachmaninoff's Piano Concerto No. 2", "a": 1.9, "b": 1.5, "type": "Music"},
  {"name": "Audrey Hepburn's Roman Holiday", "a": 2.0, "b": 0.7, "type": "Film"},
  {"name": "Walt Disney Concert Hall", "a": 1.6, "b": 1.8, "type": "Architecture"},
  {"name": "Norman Rockwell's Americana", "a": 2.3, "b": 0.6, "type": "Visual Art"},
  {"name": "Hemingway's For Whom the Bell Tolls", "a": 1.7, "b": 0.9, "type": "Literature"},
  {"name": "Hitchcock's Vertigo", "a": 1.5, "b": 1.6, "type": "Film"},
  {"name": "The Crying of Lot 49", "a": -2.1, "b": 2.4, "type": "Literature"},
  {"name": "Mr. Robot", "a": -1.5, "b": 2.3, "type": "Television"},
  {"name": "Meredith Monk's Vocal Works", "a": -2.3, "b": 2.7, "type": "Music"},
  {"name": "The Cabinet of Dr. Caligari", "a": -1.6, "b": 2.1, "type": "Film"},
  {"name": "Italo Calvino's Invisible Cities", "a": -1.9, "b": 2.7, "type": "Literature"},
  {"name": "Philip Glass's Koyaanisqatsi", "a": -2.1, "b": 2.4, "type": "Music"},
  {"name": "Pina Bausch's Tanztheater", "a": -1.8, "b": 2.6, "type": "Drama"},
  {"name": "Alejandro Jodorowsky's The Holy Mountain", "a": -2.4, "b": 2.8, "type": "Film"},
  {"name": "La Monte Young's Dream House", "a": -2.7, "b": 2.5, "type": "Music"},
  {"name": "Jenny Holzer's Projections", "a": -1.7, "b": 2.2, "type": "Visual Art"},
  {"name": "Charlie Kaufman's Synecdoche, New York", "a": -2.2, "b": 2.4, "type": "Film"},
  {"name": "Kurt Schwitters' Merzbau", "a": -2.0, "b": 2.6, "type": "Visual Art"},
  {"name": "Anthony Braxton's Compositions", "a": -2.3, "b": 2.5, "type": "Music"},
  {"name": "Miranda July's Me and You and Everyone We Know", "a": -1.5, "b": 2.0, "type": "Film"},
  {"name": "Donald Barthelme's Short Stories", "a": -1.9, "b": 2.1, "type": "Literature"},
  {"name": "Laurie Anderson's Big Science", "a": -1.8, "b": 2.3, "type": "Music"},
  {"name": "Haruki Murakami's The Wind-Up Bird Chronicle", "a": -1.6, "b": 2.4, "type": "Literature"},
  {"name": "Duchamp's Étant donnés", "a": -1.5, "b": -1.8, "type": "Visual Art"},
  {"name": "Naked Lunch", "a": -2.7, "b": -1.5, "type": "Literature"},
  {"name": "Eraserhead", "a": -2.9, "b": -2.2, "type": "Film"},
  {"name": "Francis Bacon's Figures", "a": -1.9, "b": -2.7, "type": "Visual Art"},
  {"name": "Diane Arbus Portraits", "a": -1.6, "b": -2.4, "type": "Photography"},
  {"name": "Requiem for a Dream", "a": -2.0, "b": -2.8, "type": "Film"},
  {"name": "American Psycho", "a": -1.8, "b": -2.3, "type": "Literature"},
  {"name": "Sarah Kane's Blasted", "a": -2.8, "b": -2.6, "type": "Drama"},
  {"name": "Irreversible", "a": -2.1, "b": -2.9, "type": "Film"},
  {"name": "Hannibal", "a": -1.6, "b": -2.4, "type": "Television"},
  {"name": "Kathy Acker's Blood and Guts in High School", "a": -2.2, "b": -1.7, "type": "Literature"},
  {"name": "Marina Abramović's Rhythm 0", "a": -2.1, "b": -2.4, "type": "Visual Art"},
  {"name": "Harmony Korine's Gummo", "a": -2.4, "b": -2.1, "type": "Film"},
  {"name": "Chris Burden's Shoot", "a": -2.6, "b": -2.5, "type": "Visual Art"},
  {"name": "Dennis Cooper's The George Miles Cycle", "a": -2.3, "b": -2.0, "type": "Literature"},
  {"name": "Shinya Tsukamoto's Tetsuo: The Iron Man", "a": -2.5, "b": -2.3, "type": "Film"},
  {"name": "Joel-Peter Witkin's Photography", "a": -1.9, "b": -2.4, "type": "Photography"},
  {"name": "Bataille's Story of the Eye", "a": -2.2, "b": -1.9, "type": "Literature"},
  {"name": "Pier Paolo Pasolini's Salò", "a": -2.4, "b": -2.6, "type": "Film"},
  {"name": "Andres Serrano's Immersions", "a": -1.8, "b": -2.2, "type": "Visual Art"},
  {"name": "Bret Easton Ellis's Less Than Zero", "a": -1.7, "b": -2.0, "type": "Literature"},
  {"name": "Diamanda Galás's Plague Mass", "a": -2.5, "b": -1.8, "type": "Music"},
  {"name": "Yukio Mishima's The Sailor Who Fell from Grace with the Sea", "a": -1.9, "b": -2.1, "type": "Literature"},
  {"name": "Jan Švankmajer's Alice", "a": -2.0, "b": -1.7, "type": "Film"},
  {"name": "Vermeer's Girl with a Pearl Earring", "a": 2.1, "b": -1.2, "type": "Visual Art"},
  {"name": "In Cold Blood", "a": 1.6, "b": -2.1, "type": "Literature"},
  {"name": "The Godfather Part II", "a": 1.8, "b": -1.5, "type": "Film"},
  {"name": "Wyeth's Christina's World", "a": 1.5, "b": -1.9, "type": "Visual Art"},
  {"name": "Breaking Bad", "a": 1.2, "b": -2.3, "type": "Television"},
  {"name": "The Road", "a": 1.5, "b": -2.5, "type": "Literature"},
  {"name": "Edward Hopper's Nighthawks", "a": 1.6, "b": -1.6, "type": "Visual Art"},
  {"name": "No Country for Old Men", "a": 1.5, "b": -2.0, "type": "Film"},
  {"name": "There Will Be Blood", "a": 1.7, "b": -2.2, "type": "Film"},
  {"name": "The Wire", "a": 1.3, "b": -2.2, "type": "Television"},
  {"name": "Arundhati Roy's The God of Small Things", "a": 1.5, "b": -1.6, "type": "Literature"},
  {"name": "Apocalypse Now", "a": 1.7, "b": -1.9, "type": "Film"},
  {"name": "Hitchcock's Psycho", "a": 1.4, "b": -1.8, "type": "Film"},
  {"name": "Steinbeck's The Grapes of Wrath", "a": 1.8, "b": -1.7, "type": "Literature"},
  {"name": "Mahler's Symphony No. 5", "a": 2.0, "b": -1.2, "type": "Music"},
  {"name": "Chuck Close's Photorealism", "a": 1.9, "b": -2.0, "type": "Visual Art"},
  {"name": "Mad Men", "a": 1.5, "b": -1.5, "type": "Television"},
  {"name": "Flannery O'Connor's Stories", "a": 1.6, "b": -1.9, "type": "Literature"},
  {"name": "Taxi Driver", "a": 1.3, "b": -2.1, "type": "Film"},
  {"name": "Richard Avedon's Portraits", "a": 1.8, "b": -1.3, "type": "Photography"},
  {"name": "Thomas Hardy's Jude the Obscure", "a": 1.7, "b": -1.8, "type": "Literature"},
  {"name": "Goodfellas", "a": 1.5, "b": -1.7, "type": "Film"},
  {"name": "Annie Leibovitz's Celebrity Portraits", "a": 1.9, "b": -1.1, "type": "Photography"},
  {"name": "Raymond Carver's Short Stories", "a": 1.6, "b": -1.9, "type": "Literature"},
  {"name": "Philip Roth's American Pastoral", "a": 1.8, "b": -1.6, "type": "Literature"},
  {"name": "Edward Weston's Nudes", "a": 2.0, "b": -1.3, "type": "Photography"},
  {"name": "Michael Haneke's Amour", "a": 1.4, "b": -2.2, "type": "Film"},
  {"name": "Émile Zola's Germinal", "a": 1.7, "b": -2.0, "type": "Literature"},
  {"name": "Nan Goldin's The Ballad of Sexual Dependency", "a": 1.5, "b": -1.8, "type": "Photography"},
  {"name": "Cormac McCarthy's All the Pretty Horses", "a": 1.8, "b": -1.7, "type": "Literature"},
  {"name": "Jacques-Louis David's Death of Marat", "a": 2.1, "b": -1.4, "type": "Visual Art"},
  {"name": "John Steinbeck's Of Mice and Men", "a": 1.9, "b": -1.9, "type": "Literature"},
  {"name": "Mindhunter", "a": 1.6, "b": -2.1, "type": "Television"},
  {"name": "Dorothea Lange's Migrant Mother", "a": 2.0, "b": -1.5, "type": "Photography"},
  {"name": "Denis Villeneuve's Prisoners", "a": 1.7, "b": -2.0, "type": "Film"},
  {"name": "Theodore Dreiser's An American Tragedy", "a": 1.8, "b": -1.8, "type": "Literature"}
];

// Work descriptions
const newWorkDescriptions = {
  // QUADRANT 1: (+a, +b)
  "Mona Lisa": "Leonardo da Vinci's masterpiece represents one of the most recognizable and conventional works of art (a = 2.3), yet contains subtle mysteries in its execution that create a moderate level of positive abstraction (b = 1.5). The enigmatic smile and innovative sfumato technique elevated portraiture beyond pure representation.",
  "Pride and Prejudice": "Austen's novel follows conventional narrative structure and social commentary of its era (a = 1.8) while maintaining a subtle level of abstraction (b = 0.9) through its ironic tone and psychological insights into characters' motivations and social positions.",
  "The Godfather": "Coppola's film employs traditional narrative techniques and genre conventions (a = 1.5) but elevates them through symbolic imagery and thematic complexity (b = 1.7), creating a work that operates on both literal and metaphorical levels.",
  "Symphony No. 9": "Beethoven's final complete symphony adheres to classical form (a = 2.4) while pushing into new territory of abstraction (b = 2.1) through its bold harmonic language and the unprecedented addition of voices in the final movement.",
  "Notre-Dame Cathedral": "This Gothic cathedral exemplifies conventional religious architecture of its period (a = 2.7) with modest abstraction (b = 1.2) in its harmonious proportions and symbolic elements that transcend pure structural necessity.",
  "Michelangelo's David": "This Renaissance sculpture follows classical traditions and proportions (a = 1.6) with minimal abstraction (b = 0.5), focusing on idealized human form with subtle psychological elements in the contemplative expression.",
  "Van Gogh's Starry Night": "This post-impressionist painting adheres to recognizable landscape tradition (a = 1.0) but employs highly abstracted swirling brushwork and emotional color (b = 2.2) to create a spiritual and psychological dimension beyond physical representation.",
  "Citizen Kane": "Welles' film employs conventional narrative framing (a = 1.2) with significant abstraction (b = 1.9) through its innovative cinematography, non-linear storytelling, and metaphorical imagery that explores the complexity of an individual's life.",
  "The Great Gatsby": "Fitzgerald's novel follows traditional American narrative structure (a = 1.3) while achieving moderate abstraction (b = 1.6) through its symbolic imagery, lyrical prose, and exploration of the American Dream as both literal and metaphorical construct.",
  "Game of Thrones": "This television series employs recognizable medieval fantasy conventions (a = 1.1) with significant abstraction (b = 2.2) through its complex character psychology, moral ambiguity, and political allegory that transcends genre expectations.",
  
  // QUADRANT 2: (-a, +b)
  "Guernica": "Picasso's masterpiece breaks from representational conventions (a = -1.3) to achieve high abstraction (b = 2.1) through its fragmented forms and symbolic imagery, creating a powerful anti-war statement that transcends literal depiction.",
  "Ulysses": "Joyce's novel radically departs from conventional narrative structure (a = -2.1) through highly abstract stream-of-consciousness techniques (b = 1.8) that attempt to represent the interior experience of human consciousness.",
  "Pulp Fiction": "Tarantino's film subverts traditional linear narrative (a = -1.7) through a moderately abstract (b = 1.5) non-chronological structure that transforms genre conventions into a self-reflexive meditation on storytelling itself.",
  "Rite of Spring": "Stravinsky's ballet score shocked audiences by rejecting musical conventions (a = -2.5) with its high abstraction (b = 2.8) through dissonant harmonies, irregular rhythms, and primal energy that revolutionized 20th-century music.",
  "Fountain (Duchamp)": "This revolutionary readymade radically challenged art conventions (a = -2.8) through extremely high abstraction (b = 3.0) by recontextualizing a urinal as art, questioning the fundamental nature of artistic creation and meaning.",
  "Dali's The Persistence of Memory": "This surrealist painting violates physical and perceptual norms (a = -1.5) through high abstraction (b = 2.7) with its dreamlike melting watches and barren landscape, creating a meditation on time and consciousness.",
  "John Cage's 4'33\"": "This experimental composition fundamentally disrupts musical convention (a = -3.0) with extreme abstraction (b = 3.3) by presenting silence as music, challenging audience expectations and transforming ambient sounds into the content of the work.",
  "Finnegans Wake": "Joyce's final novel completely abandons conventional linguistic and narrative structures (a = -3.1) with the highest level of abstraction (b = 3.4), creating a circular dream-narrative of neologisms and multilingual puns that defies traditional reading.",
  "Kandinsky's Compositions": "These pioneering abstract paintings reject representational tradition entirely (a = -2.0) to achieve pure abstraction (b = 3.0) through non-objective forms, emotional color relationships, and spiritual philosophy that transformed modern art.",
  "Mulholland Drive": "Lynch's film subverts Hollywood narrative conventions (a = -2.3) through highly abstract dream logic (b = 2.7), creating a surreal meditation on illusion, identity, and the dark side of the entertainment industry.",
  
  // QUADRANT 3: (-a, -b)
  "Duchamp's Étant donnés": "This installation breaks radically with artistic conventions (a = -1.5) through hyper-realistic elements (b = -1.8) that create a voyeuristic tableau of disturbing physicality, challenging the viewer's role and assumptions.",
  "Naked Lunch": "Burroughs' novel rejects narrative coherence (a = -2.7) while presenting intense hyper-realism (b = -1.5) in its visceral depictions of addiction and hallucination, creating a disjointed but physically immediate reading experience.",
  "Eraserhead": "Lynch's debut feature abandons conventional narrative logic (a = -2.9) in favor of nightmarishly hyper-realistic details (b = -2.2) that emphasize texture, sound, and visceral organic imagery to create a sui generis sensory experience.",
  "Francis Bacon's Figures": "These paintings reject traditional representation (a = -1.9) through extreme hyper-realism (b = -2.7) that distorts human bodies into raw, meat-like forms that emphasize physical vulnerability and existential horror.",
  "Diane Arbus Portraits": "These photographs break social conventions (a = -1.6) through unflinching hyper-realism (b = -2.4) that documents societal outsiders with confrontational immediacy and unsettling intimacy.",
  "Requiem for a Dream": "Aronofsky's film subverts conventional narrative (a = -2.0) with extreme hyper-realism (b = -2.8) through visceral depictions of addiction that emphasize physical deterioration and sensory overload.",
  "American Psycho": "Ellis's novel rejects traditional narrative reliability (a = -1.8) through disturbing hyper-realism (b = -2.3) in its clinical depictions of violence, brand obsession, and the hollowness of consumer culture.",
  "Sarah Kane's Blasted": "This play violates theatrical conventions (a = -2.8) through shocking hyper-realism (b = -2.6) in its unflinching portrayal of violence, trauma, and human degradation that forces confrontation with extreme experience.",
  "Irreversible": "Noé's film disrupts cinematic conventions (a = -2.1) through extreme hyper-realism (b = -2.9) with its reverse chronology, extended unbroken takes of violence, and visceral sensory assault on the viewer.",
  "Hannibal": "This television series subverts crime drama conventions (a = -1.6) through meticulously crafted hyper-realism (b = -2.4) in its aestheticized violence, sensory richness, and exploration of the monstrous as beautiful.",
  
  // QUADRANT 4: (+a, -b)
  "Vermeer's Girl with a Pearl Earring": "This painting employs traditional composition and technique (a = 2.1) with a degree of hyper-realism (b = -1.2) in its exquisite attention to light, texture, and the subtle emotional presence of its subject.",
  "In Cold Blood": "Capote's non-fiction novel uses conventional journalistic techniques (a = 1.6) with intense hyper-realism (b = -2.1) to document a brutal murder, focusing on psychological and physical details with clinical precision.",
  "The Godfather Part II": "This film follows conventional narrative structure (a = 1.8) with heightened hyper-realism (b = -1.5) in its unsentimental portrayal of familial relationships and the corruption inherent in power.",
  "Wyeth's Christina's World": "This painting uses traditional American realist techniques (a = 1.5) with pronounced hyper-realism (b = -1.9) to depict its subject's physical condition and psychological isolation with unsentimental clarity.",
  "Breaking Bad": "This television series employs conventional dramatic structure (a = 1.2) with intense hyper-realism (b = -2.3) in its unflinching portrayal of moral corruption and its physical consequences.",
  "The Road": "McCarthy's novel employs spare, traditional prose (a = 1.5) with extreme hyper-realism (b = -2.5) in its post-apocalyptic setting, focusing on physical survival and environmental devastation with unflinching detail.",
  "Edward Hopper's Nighthawks": "This painting follows conventional compositional rules (a = 1.6) with pronounced hyper-realism (b = -1.6) in its stark depiction of urban isolation, emphasizing the psychological distance between individuals in shared space.",
  "No Country for Old Men": "The Coen brothers' film adheres to Western and thriller conventions (a = 1.5) with stark hyper-realism (b = -2.0) in its unsentimental portrayal of violence, fate, and moral decay in the American landscape.",
  "There Will Be Blood": "Anderson's film employs classical dramatic structure (a = 1.7) with intense hyper-realism (b = -2.2) in its portrayal of ambition, greed, and the physical brutality of early American capitalism.",
  "The Wire": "This television series uses conventional police procedural format (a = 1.3) with comprehensive hyper-realism (b = -2.2) to document institutional failure and social inequality through meticulously detailed portrayal of urban life."
};

// Merge all descriptions
Object.assign(window.descriptions, newWorkDescriptions);

// Log the total number of works
console.log("Total number of works in visualization:", window.allWorks.length);

// Initialize categories from the works
window.categories = [...new Set(window.allWorks.map(work => work.type))]; 