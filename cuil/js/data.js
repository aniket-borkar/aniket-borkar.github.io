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

// Works data - expanded to 50 works across all four quadrants with fractional values
const works = [
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
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Guernica", "a": -1.2, "b": 2.8, "type": "Visual Art"},
  {"name": "One Hundred Years of Solitude", "a": -2.1, "b": 3.5, "type": "Literature"},
  {"name": "Mulholland Drive", "a": -2.6, "b": 3.2, "type": "Film"},
  {"name": "The Waste Land", "a": -1.8, "b": 2.4, "type": "Poetry"},
  {"name": "Sagrada Familia", "a": -0.9, "b": 1.7, "type": "Architecture"},
  {"name": "Twin Peaks", "a": -2.3, "b": 3.7, "type": "Television"},
  {"name": "Waiting for Godot", "a": -1.7, "b": 2.9, "type": "Drama"},
  {"name": "The Rite of Spring", "a": -1.4, "b": 2.2, "type": "Music"},
  {"name": "Man Ray's Rayographs", "a": -2.5, "b": 3.1, "type": "Photography"},
  {"name": "Infinite Jest", "a": -1.9, "b": 2.6, "type": "Literature"},
  {"name": "Surrealist Manifesto", "a": -2.7, "b": 1.9, "type": "Literature"},
  {"name": "Cloud Gate (The Bean)", "a": -0.6, "b": 1.1, "type": "Sculpture"},
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Duchamp's Fountain", "a": -2.8, "b": -1.3, "type": "Sculpture"},
  {"name": "Naked Lunch", "a": -3.2, "b": -2.7, "type": "Literature"},
  {"name": "Eraserhead", "a": -2.4, "b": -3.5, "type": "Film"},
  {"name": "4'33\"", "a": -3.5, "b": -2.1, "type": "Music"},
  {"name": "House of Leaves", "a": -2.9, "b": -2.8, "type": "Literature"},
  {"name": "Brutalist Architecture", "a": -1.5, "b": -1.8, "type": "Architecture"},
  {"name": "Un Chien Andalou", "a": -3.1, "b": -3.3, "type": "Film"},
  {"name": "Howl", "a": -1.6, "b": -0.9, "type": "Poetry"},
  {"name": "Black Square", "a": -3.3, "b": -1.2, "type": "Visual Art"},
  {"name": "Diane Arbus Portraits", "a": -1.3, "b": -2.2, "type": "Photography"},
  {"name": "Artaud's Theatre of Cruelty", "a": -2.2, "b": -2.5, "type": "Drama"},
  {"name": "Stockhausen's Helicopter Quartet", "a": -3.4, "b": -3.1, "type": "Music"},
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "American Psycho", "a": 1.6, "b": -2.4, "type": "Literature"},
  {"name": "Fight Club", "a": 0.8, "b": -1.9, "type": "Film"},
  {"name": "Pulp Fiction", "a": 1.2, "b": -1.5, "type": "Film"},
  {"name": "Black Mirror", "a": 0.7, "b": -2.8, "type": "Television"},
  {"name": "Paranoid Android", "a": 0.5, "b": -1.7, "type": "Music"},
  {"name": "1984", "a": 1.1, "b": -2.3, "type": "Literature"},
  {"name": "Damien Hirst's Shark", "a": 1.9, "b": -1.3, "type": "Sculpture"},
  {"name": "Clockwork Orange", "a": 0.9, "b": -3.1, "type": "Film"},
  {"name": "Weegee's Crime Photography", "a": 2.1, "b": -1.1, "type": "Photography"},
  {"name": "Panopticon Prison Design", "a": 1.7, "b": -2.7, "type": "Architecture"},
  {"name": "Breaking Bad", "a": 1.3, "b": -2.1, "type": "Television"},
  {"name": "The Crucible", "a": 1.4, "b": -0.8, "type": "Drama"},
  {"name": "Richard Serra's Tilted Arc", "a": 0.3, "b": -1.2, "type": "Sculpture"},
  {"name": "The Road", "a": 0.8, "b": -3.0, "type": "Literature"}
];

// Additional 51 works (total 100), evenly distributed across quadrants
const additionalWorks = [
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  {"name": "The Shawshank Redemption", "a": 2.2, "b": 1.9, "type": "Film"},
  {"name": "The Beatles' Abbey Road", "a": 1.7, "b": 1.3, "type": "Music"},
  {"name": "The Thinker", "a": 2.0, "b": 0.8, "type": "Sculpture"},
  {"name": "Friends", "a": 2.6, "b": 0.4, "type": "Television"},
  {"name": "The Odyssey", "a": 2.1, "b": 1.6, "type": "Literature"},
  {"name": "Casablanca", "a": 1.9, "b": 1.4, "type": "Film"},
  {"name": "Vivaldi's Four Seasons", "a": 2.3, "b": 0.9, "type": "Music"},
  {"name": "The Sistine Chapel", "a": 1.8, "b": 2.0, "type": "Visual Art"},
  {"name": "Jane Eyre", "a": 1.5, "b": 1.1, "type": "Literature"},
  {"name": "Eiffel Tower", "a": 2.2, "b": 1.0, "type": "Architecture"},
  {"name": "Hitchcock's Vertigo", "a": 1.3, "b": 1.5, "type": "Film"},
  {"name": "Tchaikovsky's Swan Lake", "a": 1.8, "b": 1.7, "type": "Music"},
  {"name": "I Love Lucy", "a": 2.4, "b": 0.6, "type": "Television"},

  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Kafka's Metamorphosis", "a": -2.4, "b": 3.0, "type": "Literature"},
  {"name": "Blade Runner", "a": -1.9, "b": 2.7, "type": "Film"},
  {"name": "Salvador Dalí's Persistence of Memory", "a": -2.2, "b": 3.3, "type": "Visual Art"},
  {"name": "Bjork's Homogenic", "a": -1.5, "b": 2.5, "type": "Music"},
  {"name": "Lost", "a": -2.0, "b": 3.4, "type": "Television"},
  {"name": "Haruki Murakami's Wind-Up Bird Chronicle", "a": -1.8, "b": 2.9, "type": "Literature"},
  {"name": "Gaudí's Casa Batlló", "a": -1.3, "b": 2.0, "type": "Architecture"},
  {"name": "Yeats' The Second Coming", "a": -1.7, "b": 3.1, "type": "Poetry"},
  {"name": "Radiohead's OK Computer", "a": -1.1, "b": 2.4, "type": "Music"},
  {"name": "Tarkovsky's Stalker", "a": -2.1, "b": 3.2, "type": "Film"},
  {"name": "Pina Bausch's Choreography", "a": -2.3, "b": 2.6, "type": "Drama"},
  {"name": "Cindy Sherman Self-Portraits", "a": -1.2, "b": 2.3, "type": "Photography"},

  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Requiem for a Dream", "a": -3.0, "b": -2.9, "type": "Film"},
  {"name": "Francis Bacon's Screaming Pope", "a": -2.7, "b": -3.2, "type": "Visual Art"},
  {"name": "Joy Division's Unknown Pleasures", "a": -2.3, "b": -2.6, "type": "Music"},
  {"name": "The Trial", "a": -3.1, "b": -2.4, "type": "Literature"},
  {"name": "The Cabinet of Dr. Caligari", "a": -2.6, "b": -3.0, "type": "Film"},
  {"name": "Throbbing Gristle's Music", "a": -2.8, "b": -3.4, "type": "Music"},
  {"name": "William S. Burroughs' Nova Express", "a": -3.4, "b": -2.8, "type": "Literature"},
  {"name": "Hieronymus Bosch's Garden of Earthly Delights", "a": -2.5, "b": -1.9, "type": "Visual Art"},
  {"name": "Antichrist", "a": -3.2, "b": -3.6, "type": "Film"},
  {"name": "Deconstructivist Architecture", "a": -1.9, "b": -1.6, "type": "Architecture"},
  {"name": "Twin Peaks: Fire Walk With Me", "a": -2.2, "b": -2.7, "type": "Film"},
  {"name": "Antonin Artaud's Poetry", "a": -2.9, "b": -2.5, "type": "Poetry"},
  {"name": "Chris Burden's Performance Art", "a": -3.3, "b": -2.3, "type": "Visual Art"},

  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "The Handmaid's Tale", "a": 1.5, "b": -2.9, "type": "Literature"},
  {"name": "Radiohead's Kid A", "a": 0.6, "b": -2.5, "type": "Music"},
  {"name": "Se7en", "a": 1.0, "b": -3.2, "type": "Film"},
  {"name": "Edward Hopper's Nighthawks", "a": 1.8, "b": -1.6, "type": "Visual Art"},
  {"name": "Game of Thrones", "a": 1.4, "b": -2.6, "type": "Television"},
  {"name": "Sylvia Plath's Ariel", "a": 0.9, "b": -2.4, "type": "Poetry"},
  {"name": "The Sopranos", "a": 1.2, "b": -2.0, "type": "Television"},
  {"name": "No Country for Old Men", "a": 1.1, "b": -2.8, "type": "Film"},
  {"name": "René Magritte's The Treachery of Images", "a": 1.3, "b": -1.4, "type": "Visual Art"},
  {"name": "Tool's Ænima", "a": 0.7, "b": -2.2, "type": "Music"},
  {"name": "Diane Arbus' Identical Twins", "a": 1.6, "b": -1.8, "type": "Photography"},
  {"name": "Haneke's Funny Games", "a": 0.4, "b": -2.7, "type": "Film"}
];

// Merge additional works into existing works array
works.push(...additionalWorks);

// Add additional works near the center of the chart
const centralWorks = [
  // Only keeping real works
  {"name": "Ambient 1: Music for Airports", "a": 0.3, "b": -0.2, "type": "Music"}
];

// First batch of new works to reach 250 total
const newWorks = [
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  {"name": "The Birth of Venus", "a": 2.5, "b": 1.3, "type": "Visual Art"},
  {"name": "War and Peace", "a": 2.0, "b": 1.2, "type": "Literature"},
  {"name": "The Dark Knight", "a": 1.4, "b": 1.8, "type": "Film"},
  {"name": "Beethoven's 5th Symphony", "a": 2.6, "b": 1.7, "type": "Music"},
  {"name": "Taj Mahal", "a": 2.3, "b": 1.1, "type": "Architecture"},
  {"name": "Rodin's The Kiss", "a": 1.8, "b": 1.2, "type": "Sculpture"},
  {"name": "Girl with a Pearl Earring", "a": 2.1, "b": 0.8, "type": "Visual Art"},
  {"name": "A Midsummer Night's Dream", "a": 1.7, "b": 1.9, "type": "Drama"},
  {"name": "Great Expectations", "a": 1.9, "b": 1.0, "type": "Literature"},
  {"name": "Dorothea Lange's Migrant Mother", "a": 1.7, "b": 0.7, "type": "Photography"},
  {"name": "The Lord of the Rings", "a": 1.6, "b": 2.2, "type": "Film"},
  {"name": "The Simpsons", "a": 1.3, "b": 1.6, "type": "Television"},
  {"name": "David Copperfield", "a": 2.2, "b": 0.9, "type": "Literature"},
  {"name": "Monet's Water Lilies", "a": 1.5, "b": 2.3, "type": "Visual Art"},
  {"name": "Mozart's The Magic Flute", "a": 2.0, "b": 1.5, "type": "Music"},
  {"name": "Chrysler Building", "a": 1.9, "b": 1.3, "type": "Architecture"},
  {"name": "The Office", "a": 1.8, "b": 1.4, "type": "Television"},
  {"name": "Romeo and Juliet", "a": 2.4, "b": 0.8, "type": "Drama"},
  {"name": "Bach's Brandenburg Concertos", "a": 2.7, "b": 1.0, "type": "Music"},
  {"name": "Steve McCurry's Afghan Girl", "a": 1.4, "b": 1.1, "type": "Photography"},
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Picasso's Les Demoiselles d'Avignon", "a": -1.9, "b": 2.7, "type": "Visual Art"},
  {"name": "Ulysses", "a": -2.5, "b": 3.0, "type": "Literature"},
  {"name": "2001: A Space Odyssey", "a": -2.3,  "b": 3.3, "type": "Film"},
  {"name": "John Coltrane's A Love Supreme", "a": -1.6, "b": 2.8, "type": "Music"},
  {"name": "Fallingwater", "a": -1.2, "b": 2.2, "type": "Architecture"},
  {"name": "Calder's Mobiles", "a": -1.8, "b": 2.6, "type": "Sculpture"},
  {"name": "Mondrian's Broadway Boogie Woogie", "a": -2.0, "b": 2.5, "type": "Visual Art"},
  {"name": "The Cherry Orchard", "a": -1.5, "b": 2.3, "type": "Drama"},
  {"name": "Mrs. Dalloway", "a": -1.3, "b": 2.7, "type": "Literature"},
  {"name": "Man Ray's Tears", "a": -2.1, "b": 2.9, "type": "Photography"},
  {"name": "Eternal Sunshine of the Spotless Mind", "a": -1.7, "b": 2.6, "type": "Film"},
  {"name": "The Wire", "a": -1.4, "b": 2.1, "type": "Television"},
  {"name": "To the Lighthouse", "a": -2.2, "b": 2.8, "type": "Literature"},
  {"name": "Kandinsky's Composition VIII", "a": -2.7, "b": 3.2, "type": "Visual Art"},
  {"name": "Miles Davis' Kind of Blue", "a": -1.3, "b": 2.5, "type": "Music"},
  {"name": "Sydney Opera House", "a": -1.0, "b": 1.9, "type": "Architecture"},
  {"name": "Atlanta", "a": -1.6, "b": 2.4, "type": "Television"},
  {"name": "Waiting for Lefty", "a": -1.9, "b": 2.0, "type": "Drama"},
  {"name": "Debussy's Prélude à l'après-midi d'un faune", "a": -1.8, "b": 2.7, "type": "Music"},
  {"name": "Diane Arbus' Child with Toy Hand Grenade", "a": -1.5, "b": 1.8, "type": "Photography"},
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Damien Hirst's A Thousand Years", "a": -2.5, "b": -2.7, "type": "Visual Art"},
  {"name": "Last Exit to Brooklyn", "a": -2.3, "b": -2.5, "type": "Literature"},
  {"name": "Irreversible", "a": -2.8, "b": -3.3, "type": "Film"},
  {"name": "Throbbing Gristle's 20 Jazz Funk Greats", "a": -2.4, "b": -2.2, "type": "Music"},
  {"name": "Peter Eisenman's House VI", "a": -2.0, "b": -1.5, "type": "Architecture"},
  {"name": "Kiki Smith's Body Sculptures", "a": -2.2, "b": -2.4, "type": "Sculpture"},
  {"name": "Lucian Freud's Benefits Supervisor Sleeping", "a": -1.8, "b": -3.0, "type": "Visual Art"},
  {"name": "Sarah Kane's Blasted", "a": -2.6, "b": -2.9, "type": "Drama"},
  {"name": "Blood Meridian", "a": -2.1, "b": -2.6, "type": "Literature"},
  {"name": "Nan Goldin's The Ballad of Sexual Dependency", "a": -1.9, "b": -2.8, "type": "Photography"},
  {"name": "Gaspar Noé's Enter the Void", "a": -3.1, "b": -2.7, "type": "Film"},
  {"name": "Lars von Trier's Breaking the Waves", "a": -2.4, "b": -3.0, "type": "Film"},
  {"name": "Hubert Selby Jr.'s Requiem for a Dream", "a": -2.7, "b": -3.1, "type": "Literature"},
  {"name": "Andres Serrano's Piss Christ", "a": -3.0, "b": -2.3, "type": "Visual Art"},
  {"name": "Scott Walker's The Drift", "a": -2.9, "b": -2.4, "type": "Music"},
  {"name": "Tadao Ando's Church of the Light", "a": -1.7, "b": -1.4, "type": "Architecture"},
  {"name": "Hannibal", "a": -2.2, "b": -2.5, "type": "Television"},
  {"name": "The Theatre of Cruelty", "a": -3.2, "b": -2.2, "type": "Drama"},
  {"name": "Schoenberg's Pierrot Lunaire", "a": -2.8, "b": -1.7, "type": "Music"},
  {"name": "Robert Mapplethorpe's X Portfolio", "a": -2.6, "b": -2.8, "type": "Photography"},
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "Chuck Close's Self-Portrait", "a": 1.4, "b": -2.2, "type": "Visual Art"},
  {"name": "In Cold Blood", "a": 1.3, "b": -2.5, "type": "Literature"},
  {"name": "The Blair Witch Project", "a": 0.8, "b": -2.9, "type": "Film"},
  {"name": "Nine Inch Nails' The Downward Spiral", "a": 0.9, "b": -2.7, "type": "Music"},
  {"name": "Mies van der Rohe's Barcelona Pavilion", "a": 1.7, "b": -1.5, "type": "Architecture"},
  {"name": "Ron Mueck's Dead Dad", "a": 1.2, "b": -2.4, "type": "Sculpture"},
  {"name": "Richard Estes' Telephone Booths", "a": 1.9, "b": -1.7, "type": "Visual Art"},
  {"name": "August Strindberg's Miss Julie", "a": 1.0, "b": -2.0, "type": "Drama"},
  {"name": "Bret Easton Ellis' Less Than Zero", "a": 1.1, "b": -2.6, "type": "Literature"},
  {"name": "Walker Evans' Subway Portraits", "a": 1.5, "b": -1.9, "type": "Photography"},
  {"name": "Michael Haneke's The Piano Teacher", "a": 0.6, "b": -3.0, "type": "Film"},
  {"name": "True Detective (Season 1)", "a": 1.0, "b": -2.3, "type": "Television"},
  {"name": "Joan Didion's The Year of Magical Thinking", "a": 1.6, "b": -2.1, "type": "Literature"},
  {"name": "Gerhard Richter's Photo Paintings", "a": 1.3, "b": -1.8, "type": "Visual Art"},
  {"name": "Pink Floyd's The Wall", "a": 0.8, "b": -2.5, "type": "Music"},
  {"name": "Philip Johnson's Glass House", "a": 1.8, "b": -1.3, "type": "Architecture"},
  {"name": "Mindhunter", "a": 1.2, "b": -2.5, "type": "Television"},
  {"name": "Eugene O'Neill's Long Day's Journey into Night", "a": 1.5, "b": -1.6, "type": "Drama"},
  {"name": "Philip Glass' Koyaanisqatsi", "a": 0.7, "b": -2.3, "type": "Music"},
  {"name": "Robert Frank's The Americans", "a": 1.4, "b": -1.7, "type": "Photography"}
];

// Second batch of new works
const newWorks2 = [
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  {"name": "Sargent's Madame X", "a": 2.2, "b": 1.2, "type": "Visual Art"},
  {"name": "Anna Karenina", "a": 1.9, "b": 1.3, "type": "Literature"},
  {"name": "The Godfather Part II", "a": 1.6, "b": 1.9, "type": "Film"},
  {"name": "Debussy's Claire de Lune", "a": 1.8, "b": 2.0, "type": "Music"},
  {"name": "St. Paul's Cathedral", "a": 2.5, "b": 1.4, "type": "Architecture"},
  {"name": "Winged Victory of Samothrace", "a": 2.3, "b": 0.9, "type": "Sculpture"},
  {"name": "Van Gogh's Starry Night", "a": 1.2, "b": 2.4, "type": "Visual Art"},
  {"name": "The Glass Menagerie", "a": 1.5, "b": 1.6, "type": "Drama"},
  {"name": "Middlemarch", "a": 2.0, "b": 1.1, "type": "Literature"},
  {"name": "Henri Cartier-Bresson's Behind the Gare Saint-Lazare", "a": 1.6, "b": 1.2, "type": "Photography"},
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Frida Kahlo's Self-Portraits", "a": -1.8, "b": 2.4, "type": "Visual Art"},
  {"name": "Pale Fire", "a": -2.6, "b": 2.9, "type": "Literature"},
  {"name": "Persona", "a": -2.2, "b": 3.1, "type": "Film"},
  {"name": "Steve Reich's Music for 18 Musicians", "a": -1.9, "b": 2.3, "type": "Music"},
  {"name": "Guggenheim Museum Bilbao", "a": -1.4, "b": 2.5, "type": "Architecture"},
  {"name": "Louise Bourgeois' Spiders", "a": -2.0, "b": 2.7, "type": "Sculpture"},
  {"name": "Magritte's The Treachery of Images", "a": -1.7, "b": 2.8, "type": "Visual Art"},
  {"name": "Six Characters in Search of an Author", "a": -2.3, "b": 2.2, "type": "Drama"},
  {"name": "If on a winter's night a traveler", "a": -2.4, "b": 3.0, "type": "Literature"},
  {"name": "William Eggleston's The Red Ceiling", "a": -1.6, "b": 2.1, "type": "Photography"},
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Sophie Calle's The Hotel", "a": -2.1, "b": -2.3, "type": "Visual Art"},
  {"name": "The Sound and the Fury", "a": -2.7, "b": -2.0, "type": "Literature"},
  {"name": "Salò, or the 120 Days of Sodom", "a": -3.0, "b": -3.2, "type": "Film"},
  {"name": "Penderecki's Threnody to the Victims of Hiroshima", "a": -2.9, "b": -2.1, "type": "Music"},
  {"name": "Lebbeus Woods' War and Architecture", "a": -2.2, "b": -1.8, "type": "Architecture"},
  {"name": "Paul McCarthy's Complex Shit", "a": -3.1, "b": -2.4, "type": "Sculpture"},
  {"name": "Jenny Saville's Strategy", "a": -1.8, "b": -2.7, "type": "Visual Art"},
  {"name": "Peter Handke's Offending the Audience", "a": -2.5, "b": -1.9, "type": "Drama"},
  {"name": "Cormac McCarthy's Blood Meridian", "a": -2.3, "b": -3.1, "type": "Literature"},
  {"name": "Joel-Peter Witkin's Sanitarium", "a": -2.8, "b": -2.6, "type": "Photography"},
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "Lucian Freud's Sleeping by the Lion Carpet", "a": 1.3, "b": -2.3, "type": "Visual Art"},
  {"name": "Raymond Carver's Short Stories", "a": 1.2, "b": -2.0, "type": "Literature"},
  {"name": "David Fincher's Zodiac", "a": 1.1, "b": -2.4, "type": "Film"},
  {"name": "Portishead's Dummy", "a": 0.9, "b": -2.1, "type": "Music"},
  {"name": "Tadao Ando's Church of the Light", "a": 1.5, "b": -1.7, "type": "Architecture"},
  {"name": "Duane Hanson's Tourists", "a": 1.7, "b": -2.6, "type": "Sculpture"},
  {"name": "Antonio López García's Madrid from Torres Blancas", "a": 1.8, "b": -1.9, "type": "Visual Art"},
  {"name": "Sam Shepard's Buried Child", "a": 1.0, "b": -2.2, "type": "Drama"},
  {"name": "Denis Johnson's Jesus' Son", "a": 0.8, "b": -2.3, "type": "Literature"},
  {"name": "Philip-Lorca diCorcia's Hustlers", "a": 1.4, "b": -2.1, "type": "Photography"}
];

// Third batch of new works
const newWorks3 = [
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  {"name": "Turner's The Fighting Temeraire", "a": 1.9, "b": 1.7, "type": "Visual Art"},
  {"name": "Crime and Punishment", "a": 1.7, "b": 1.5, "type": "Literature"},
  {"name": "La Dolce Vita", "a": 1.5, "b": 2.1, "type": "Film"},
  {"name": "Bach's Mass in B Minor", "a": 2.5, "b": 1.8, "type": "Music"},
  {"name": "Barcelona Pavilion", "a": 1.6, "b": 1.3, "type": "Architecture"},
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Max Ernst's The Elephant Celebes", "a": -2.1, "b": 2.6, "type": "Visual Art"},
  {"name": "Finnegans Wake", "a": -3.0, "b": 3.4, "type": "Literature"},
  {"name": "Last Year at Marienbad", "a": -2.7, "b": 3.0, "type": "Film"},
  {"name": "Philip Glass's Einstein on the Beach", "a": -2.6, "b": 2.5, "type": "Music"},
  {"name": "Frank Gehry's Dancing House", "a": -1.8, "b": 2.3, "type": "Architecture"},
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Mike Kelley's Categorical Imperative", "a": -2.3, "b": -2.2, "type": "Visual Art"},
  {"name": "Thomas Bernhard's Extinction", "a": -2.6, "b": -2.3, "type": "Literature"},
  {"name": "Harmony Korine's Gummo", "a": -2.9, "b": -2.9, "type": "Film"},
  {"name": "Swans' The Seer", "a": -2.5, "b": -2.6, "type": "Music"},
  {"name": "Gordon Matta-Clark's Splitting", "a": -2.4, "b": -1.9, "type": "Architecture"},
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "Richard Estes' Telephone Booths", "a": 1.6, "b": -2.2, "type": "Visual Art"},
  {"name": "Cormac McCarthy's No Country for Old Men", "a": 1.2, "b": -2.7, "type": "Literature"},
  {"name": "Paul Greengrass's United 93", "a": 1.5, "b": -2.5, "type": "Film"},
  {"name": "Leonard Cohen's Songs of Love and Hate", "a": 0.9, "b": -2.0, "type": "Music"},
  {"name": "Peter Zumthor's Therme Vals", "a": 1.3, "b": -1.6, "type": "Architecture"}
];

// Fourth batch of new works
const newWorks4 = [
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  {"name": "Monet's Impression, Sunrise", "a": 1.7, "b": 1.8, "type": "Visual Art"},
  {"name": "The Brothers Karamazov", "a": 1.9, "b": 1.4, "type": "Literature"},
  {"name": "The Seventh Seal", "a": 1.4, "b": 2.3, "type": "Film"},
  {"name": "Chopin's Nocturnes", "a": 2.1, "b": 1.5, "type": "Music"},
  {"name": "Fallingwater", "a": 1.5, "b": 2.0, "type": "Architecture"},
  {"name": "The Thinker", "a": 1.9, "b": 1.0, "type": "Sculpture"},
  {"name": "Wyeth's Christina's World", "a": 2.0, "b": 0.7, "type": "Visual Art"},
  {"name": "The Glass Menagerie", "a": 1.6, "b": 1.4, "type": "Drama"},
  {"name": "The Great Gatsby", "a": 1.8, "b": 1.3, "type": "Literature"},
  {"name": "Henri Cartier-Bresson's The Decisive Moment", "a": 1.7, "b": 1.1, "type": "Photography"},
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Kandinsky's Improvisation 28", "a": -2.2, "b": 2.8, "type": "Visual Art"},
  {"name": "If on a winter's night a traveler", "a": -2.3, "b": 2.9, "type": "Literature"},
  {"name": "8½", "a": -1.9, "b": 2.7, "type": "Film"},
  {"name": "Stockhausen's Stimmung", "a": -2.7, "b": 2.5, "type": "Music"},
  {"name": "CCTV Headquarters", "a": -1.7, "b": 2.2, "type": "Architecture"},
  {"name": "Barbara Hepworth's Pelagos", "a": -1.6, "b": 2.4, "type": "Sculpture"},
  {"name": "Rothko's Seagram Murals", "a": -2.5, "b": 2.9, "type": "Visual Art"},
  {"name": "Happy Days", "a": -2.0, "b": 2.6, "type": "Drama"},
  {"name": "At Swim-Two-Birds", "a": -2.4, "b": 2.8, "type": "Literature"},
  {"name": "Lee Miller's Revenge on Culture", "a": -1.8, "b": 2.1, "type": "Photography"},
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Cindy Sherman's Untitled Film Stills", "a": -1.9, "b": -2.1, "type": "Visual Art"},
  {"name": "Gravity's Rainbow", "a": -2.8, "b": -2.0, "type": "Literature"},
  {"name": "Come and See", "a": -2.2, "b": -3.1, "type": "Film"},
  {"name": "Diamanda Galás's The Litanies of Satan", "a": -3.1, "b": -2.4, "type": "Music"},
  {"name": "Rem Koolhaas's Seattle Central Library", "a": -1.7, "b": -1.5, "type": "Architecture"},
  {"name": "Paul Thek's Technological Reliquaries", "a": -2.4, "b": -2.2, "type": "Sculpture"},
  {"name": "Basquiat's Untitled (Skull)", "a": -2.0, "b": -1.8, "type": "Visual Art"},
  {"name": "The Balcony", "a": -2.3, "b": -1.9, "type": "Drama"},
  {"name": "Crash", "a": -2.5, "b": -2.7, "type": "Literature"},
  {"name": "Roger Ballen's Boarding House", "a": -2.6, "b": -2.8, "type": "Photography"},
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "Freud's Portrait of Francis Bacon", "a": 1.3, "b": -2.1, "type": "Visual Art"},
  {"name": "The Road", "a": 1.1, "b": -2.9, "type": "Literature"},
  {"name": "Incendies", "a": 1.2, "b": -2.4, "type": "Film"},
  {"name": "Nick Cave's Murder Ballads", "a": 0.8, "b": -2.3, "type": "Music"},
  {"name": "Ando's Church of the Light", "a": 1.4, "b": -1.5, "type": "Architecture"},
  {"name": "Berlinde De Bruyckere's Cripplewood", "a": 0.9, "b": -2.5, "type": "Sculpture"},
  {"name": "Pearlstein's Two Female Models in Studio", "a": 1.7, "b": -1.6, "type": "Visual Art"},
  {"name": "Who's Afraid of Virginia Woolf?", "a": 1.0, "b": -2.2, "type": "Drama"},
  {"name": "A Visit from the Goon Squad", "a": 1.2, "b": -1.9, "type": "Literature"},
  {"name": "Sally Mann's Immediate Family", "a": 1.5, "b": -2.0, "type": "Photography"}
];

// Fifth batch of new works
const newWorks5 = [
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  {"name": "Degas' Ballet Dancers", "a": 2.0, "b": 1.2, "type": "Visual Art"},
  {"name": "The Divine Comedy", "a": 2.2, "b": 1.6, "type": "Literature"},
  {"name": "Lawrence of Arabia", "a": 1.9, "b": 1.9, "type": "Film"},
  {"name": "Schubert's Winterreise", "a": 1.8, "b": 1.7, "type": "Music"},
  {"name": "Sydney Opera House", "a": 1.6, "b": 1.9, "type": "Architecture"},
  {"name": "Statue of Liberty", "a": 2.4, "b": 0.9, "type": "Sculpture"},
  {"name": "Manet's Olympia", "a": 1.7, "b": 1.3, "type": "Visual Art"},
  {"name": "Our Town", "a": 2.1, "b": 1.1, "type": "Drama"},
  {"name": "Wuthering Heights", "a": 1.5, "b": 1.8, "type": "Literature"},
  {"name": "Steichen's The Family of Man", "a": 1.9, "b": 1.5, "type": "Photography"},
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  {"name": "Yves Klein's Anthropometries", "a": -2.0, "b": 2.5, "type": "Visual Art"},
  {"name": "Tropic of Cancer", "a": -1.8, "b": 2.4, "type": "Literature"},
  {"name": "La Jetée", "a": -2.1, "b": 2.9, "type": "Film"},
  {"name": "Laurie Anderson's O Superman", "a": -2.3, "b": 2.6, "type": "Music"},
  {"name": "Hundertwasser House", "a": -1.9, "b": 2.0, "type": "Architecture"},
  {"name": "Brancusi's Bird in Space", "a": -1.5, "b": 2.3, "type": "Sculpture"},
  {"name": "Duchamp's Nude Descending a Staircase", "a": -1.7, "b": 2.7, "type": "Visual Art"},
  {"name": "Rhinoceros", "a": -1.6, "b": 2.2, "type": "Drama"},
  {"name": "The Sound and the Fury", "a": -2.2, "b": 2.8, "type": "Literature"},
  {"name": "Moholy-Nagy's Photograms", "a": -2.4, "b": 2.3, "type": "Photography"},
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  {"name": "Kienholz's Five Car Stud", "a": -2.2, "b": -2.5, "type": "Visual Art"},
  {"name": "Céline's Journey to the End of the Night", "a": -2.0, "b": -2.6, "type": "Literature"},
  {"name": "Haneke's The White Ribbon", "a": -1.8, "b": -2.7, "type": "Film"},
  {"name": "Einstürzende Neubauten's Haus der Lüge", "a": -2.7, "b": -2.2, "type": "Music"},
  {"name": "Soleri's Arcosanti", "a": -2.1, "b": -1.7, "type": "Architecture"},
  {"name": "Thomas Hirschhorn's Outgrowth", "a": -2.5, "b": -2.3, "type": "Sculpture"},
  {"name": "Sue Williams' It's a New Age", "a": -1.9, "b": -2.4, "type": "Visual Art"},
  {"name": "Edward Bond's Saved", "a": -1.7, "b": -2.9, "type": "Drama"},
  {"name": "William T. Vollmann's Europe Central", "a": -2.3, "b": -2.1, "type": "Literature"},
  {"name": "Andres Serrano's Morgue", "a": -2.6, "b": -3.0, "type": "Photography"},
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  {"name": "Crewdson's Beneath the Roses", "a": 1.4, "b": -2.2, "type": "Visual Art"},
  {"name": "Capote's In Cold Blood", "a": 1.7, "b": -1.8, "type": "Literature"},
  {"name": "Michael Haneke's Amour", "a": 1.1, "b": -2.6, "type": "Film"},
  {"name": "Billie Holiday's Strange Fruit", "a": 1.0, "b": -2.3, "type": "Music"},
  {"name": "Brutalist Architecture", "a": 1.3, "b": -1.7, "type": "Architecture"},
  {"name": "Daniel Edwards' Monument to Pro-Life", "a": 1.5, "b": -2.0, "type": "Sculpture"},
  {"name": "Courbet's A Burial at Ornans", "a": 1.8, "b": -1.5, "type": "Visual Art"},
  {"name": "Arthur Miller's Death of a Salesman", "a": 1.2, "b": -1.9, "type": "Drama"},
  {"name": "Émile Zola's Germinal", "a": 1.6, "b": -2.1, "type": "Literature"},
  {"name": "Jacob Riis's How the Other Half Lives", "a": 1.9, "b": -1.6, "type": "Photography"}
];

// Add the central works to the main works array
works.push(...centralWorks);
// Add the new works to the main works array
works.push(...newWorks);
// Add the second batch of new works
works.push(...newWorks2);
// Add the third batch of new works
works.push(...newWorks3);
// Add the fourth batch of new works
works.push(...newWorks4);
// Add the fifth batch of new works
works.push(...newWorks5);

// Reinitialize categories properly
const categories = [...new Set(works.map(work => work.type))];

// Log the total number of works
console.log("Total number of works in visualization:", works.length);

// Work descriptions with reasoning behind the scores
const descriptions = {
  // QUADRANT 1: (+a, +b)
  "Mona Lisa": "Leonardo da Vinci's masterpiece represents one of the most recognizable and conventional works of art (a = 2.3), yet contains subtle mysteries in its execution that create a moderate level of positive abstraction (b = 1.5). The enigmatic smile and innovative sfumato technique elevated portraiture beyond pure representation.",
  
  "Pride and Prejudice": "Jane Austen's novel employs a conventional narrative structure and setting (a = 1.8), with low but positive levels of abstraction (b = 0.9) through its witty social commentary. The work follows established literary conventions while subtly subverting expectations of the marriage plot.",
  
  "The Godfather": "Coppola's film maintains relatively conventional cinematic language and narrative structure (a = 1.5) with moderate positive abstraction (b = 1.7) in its mythic exploration of the American Dream through a crime family. Its visual richness and thematic depth transcend the gangster genre.",
  
  "Symphony No. 9": "Beethoven's final complete symphony works within classical form (a = 2.4) while pushing toward transcendence through innovative harmonies and the addition of vocal elements (b = 2.1). The 'Ode to Joy' finale breaks conventional boundaries while remaining accessible.",
  
  "Notre-Dame Cathedral": "This Gothic cathedral exemplifies highly conventional religious architecture (a = 2.7) with modest positive abstraction (b = 1.2) in its soaring verticality and symbolic elements. Its structural innovations serve spiritual expression within an established tradition.",
  
  "Michelangelo's David": "This Renaissance masterpiece adheres strongly to classical ideals and proportions (a = 1.6) with minimal abstraction (b = 0.5). Its conventional beauty and anatomical accuracy anchor it firmly in representational tradition.",
  
  "The Night Watch": "Rembrandt's group portrait operates within conventional parameters of commissioned art (a = 1.4) but achieves notable abstraction (b = 1.8) through dramatic lighting, dynamic composition, and psychological depth uncommon in its genre.",
  
  "Hamlet": "Shakespeare's tragedy employs conventional dramatic structure (a = 0.8) with moderate abstraction (b = 1.4) through its philosophical exploration of indecision and self-consciousness. Its metatheatrical elements subtly challenge dramatic conventions.",
  
  "To Kill a Mockingbird": "Harper Lee's novel utilizes conventional narrative techniques (a = 1.2) with minimal abstraction (b = 0.7). Its straightforward storytelling addresses complex social issues through accessible prose and characters.",
  
  "Ansel Adams' Landscapes": "Adams' photographs present nature within conventional pictorial traditions (a = 1.9) with limited abstraction (b = 0.6). His precise technique and dramatic compositions elevate landscape photography while remaining faithful to representational traditions.",
  
  "Star Wars: A New Hope": "Lucas's film employs familiar storytelling patterns and character archetypes (a = 0.9) but achieves significant positive abstraction (b = 2.3) through its creation of a new mythology and groundbreaking visual effects. It reinvented space fantasy while honoring traditional hero narratives.",
  
  "The Great British Bake Off": "This television series follows highly conventional reality competition formats (a = 2.5) with minimal abstraction (b = 0.3). Its straightforward presentation and focus on technical skill make it extremely accessible.",
  
  // QUADRANT 2: (-a, +b)
  "Guernica": "Picasso's anti-war masterpiece employs unconventional formal elements (a = -1.2) with high positive abstraction (b = 2.8). Its fractured perspective and symbolic imagery express profound emotional truths about violence and suffering through non-representational means.",
  
  "One Hundred Years of Solitude": "Márquez's novel employs unconventional narrative techniques (a = -2.1) with very high positive abstraction (b = 3.5). Its magical realist approach blends fantasy and reality, circular time structures, and generational echoes to create a revolutionary literary experience.",
  
  "Mulholland Drive": "Lynch's film subverts conventional narrative logic (a = -2.6) with high positive abstraction (b = 3.2). Its dreamlike structure, identity shifting, and symbolic imagery create meaning through intuitive rather than logical connections.",
  
  "The Waste Land": "T.S. Eliot's poem breaks with conventional structures (a = -1.8) and achieves high abstraction (b = 2.4) through fragmentation, multiple voices, and dense allusions. It creates meaning through juxtaposition rather than linear progression.",
  
  "Sagrada Familia": "Gaudí's basilica departs from conventional architectural traditions (a = -0.9) with moderate positive abstraction (b = 1.7). Its organic forms, mathematical innovations, and naturalistic details reimagine sacred architecture while still serving religious function.",
  
  "Twin Peaks": "Lynch's television series radically subverts the conventions of the medium (a = -2.3) with extremely high abstraction (b = 3.7). Its surreal elements, dream sequences, and non-linear storytelling create a transcendent viewing experience that defies traditional narrative.",
  
  "Waiting for Godot": "Beckett's play undermines dramatic conventions (a = -1.7) with high abstraction (b = 2.9). Its minimal setting, circular dialogue, and absence of traditional plot create meaning through the very negation of theatrical expectations.",
  
  "The Rite of Spring": "Stravinsky's ballet score broke harmonic conventions (a = -1.4) with high abstraction (b = 2.2). Its dissonant harmonies, complex rhythms, and primal energy famously provoked riots at its premiere while expanding musical possibilities.",
  
  "Man Ray's Rayographs": "These photographic works reject conventional photographic processes (a = -2.5) with high abstraction (b = 3.1). Created without a camera by placing objects directly on photosensitive paper, they transform reality into mysterious, ethereal compositions.",
  
  "Infinite Jest": "Wallace's novel challenges conventional narrative structure (a = -1.9) with high abstraction (b = 2.6). Its recursive storytelling, extensive footnotes, and multiple interwoven narratives create a literary experience that mirrors its themes of addiction and entertainment.",
  
  "Surrealist Manifesto": "Breton's foundational text rejects conventional artistic and literary approaches (a = -2.7) while offering moderate abstraction (b = 1.9). It theorizes new forms of artistic expression based on dreams, chance, and the unconscious.",
  
  "Cloud Gate (The Bean)": "Anish Kapoor's sculpture departs somewhat from conventional public art (a = -0.6) with moderate abstraction (b = 1.1). Its reflective surface and organic form create an interactive experience that distorts reality while remaining accessible.",
  
  "The Matrix": "This film employs unconventional visual techniques (a = -1.6) with high positive abstraction (b = 2.8). Its innovative 'bullet time' effects, philosophical underpinnings, and reality-questioning narrative create a transcendent viewing experience that expands the possibilities of cinematic storytelling.",
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  "Duchamp's Fountain": "This readymade urinal signed 'R. Mutt' radically rejected art conventions (a = -2.8) with significant hyper realism (b = -1.3). It challenged the very definition of art by presenting an unmodified utilitarian object in a gallery context, focusing intensely on the reality of the mundane rather than creating an idealized art object.",
  
  "Naked Lunch": "Burroughs' novel completely abandons conventional narrative (a = -3.2) with extreme hyper realism (b = -2.7). Its vivid, hallucinatory descriptions present reality with such microscopic intensity that everyday perceptions are fractured, creating a hyper-focused examination of addiction and control mechanisms.",
  
  "Eraserhead": "Lynch's debut feature film rejects conventional storytelling (a = -2.4) with profound hyper realism (b = -3.5). Its microscopic attention to texture, sound, and visceral physicality creates an intensified reality where ordinary elements become uncanny through excessive focus on their material qualities.",
  
  "4'33\"": "John Cage's silent composition radically rejects musical conventions (a = -3.5) with strong hyper realism (b = -2.1). By presenting silence as music, it forces listeners to experience the hyper-real sounds of their actual environment with acute attention, bringing ordinary ambient noise into the foreground of consciousness.",
  
  "House of Leaves": "Danielewski's experimental novel abandons traditional narrative structure (a = -2.9) with intense hyper realism (b = -2.8). Its obsessive documentation, footnotes, and typographical experiments create a hyper-detailed examination of space, perception, and psychological horror through excessive documentation of reality.",
  
  "Brutalist Architecture": "This architectural movement rejects decorative conventions (a = -1.5) with moderate hyper realism (b = -1.8). Its exposed concrete, geometric repetition, and uncompromising adherence to material truth create buildings that emphasize their physical reality and construction methods with unflinching clarity.",
  
  "Un Chien Andalou": "Buñuel and Dalí's surrealist film completely abandons narrative logic (a = -3.1) with extreme hyper realism (b = -3.3). Its shocking close-ups and precise imagery present reality with such tangible intensity that ordinary objects and actions become disorienting through their excessive clarity and focus.",
  
  "Howl": "Ginsberg's poem breaks with poetic conventions (a = -1.6) with mild hyper realism (b = -0.9). Its direct language and visceral imagery capture real experiences with an unflinching attention to physical and emotional detail that strips away poetic artifice in favor of raw experience.",
  
  "Black Square": "Malevich's supreme example of non-objective art rejects all pictorial convention (a = -3.3) with substantial hyper realism (b = -1.2). By reducing painting to a black square on white ground, it focuses attention on the absolute physical reality of paint on canvas, refusing any representational illusion.",
  
  "Diane Arbus Portraits": "Arbus's photography defies conventional portrait traditions (a = -1.3) with strong hyper realism (b = -2.2). Her unflinching depictions of marginalized subjects present reality with such intense clarity and detail that viewers are forced to confront human difference without the comfortable distance of idealization.",
  
  "Artaud's Theatre of Cruelty": "This theatrical concept rejects conventional drama (a = -2.2) with strong hyper realism (b = -2.5). Its emphasis on primal experience, physical assault on the senses, and destruction of the fourth wall aims to bring audiences into direct contact with raw, unfiltered reality without theatrical artifice.",
  
  "Stockhausen's Helicopter Quartet": "This avant-garde composition completely abandons conventional performance contexts (a = -3.4) with extreme hyper realism (b = -3.1). By placing string players in separate helicopters, it forces attention to the actual physical environment of sound production, making the real-world acoustics and mechanical sounds an integral part of the music.",
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  "American Psycho": "Ellis's novel employs conventional narrative techniques (a = 1.6) with strong hyper realism (b = -2.4). Its meticulous descriptions of brands, products, and violence present reality with such excessive detail and precision that everyday objects and acts become both clinical and disturbing through their heightened presence.",
  
  "Fight Club": "Fincher's film uses relatively conventional cinematic language (a = 0.8) with significant hyper realism (b = -1.9). Its visceral depictions of violence, consumer culture, and masculine identity present physical and psychological reality with unflinching directness that makes ordinary experiences intensely tangible.",
  
  "Pulp Fiction": "Tarantino's film employs conventional narrative elements (a = 1.2) with moderate hyper realism (b = -1.5). Its detailed attention to mundane conversations, physical violence, and pop culture creates an intensified version of reality where ordinary moments are rendered with the same precise focus as dramatic ones.",
  
  "Black Mirror": "This television series works within recognizable formats (a = 0.7) with strong hyper realism (b = -2.8). Its meticulous depiction of technological interfaces, human behavior, and social dynamics creates a heightened reality where our relationship with technology is examined with microscopic precision.",
  
  "Paranoid Android": "Radiohead's song maintains traditional rock structures (a = 0.5) with moderate hyper realism (b = -1.7). Its clinical production, precise instrumentation, and unflinching lyrics create an emotionally intense experience where alienation and technological anxiety are rendered with documentary-like detail.",
  
  "1984": "Orwell's novel uses conventional narrative techniques (a = 1.1) with strong hyper realism (b = -2.3). Its meticulous documentation of surveillance, language control, and psychological manipulation presents totalitarianism with such precise detail that political abstractions become viscerally real.",
  
  "Damien Hirst's Shark": "This installation adheres to recognizable sculptural presentation (a = 1.9) with moderate hyper realism (b = -1.3). By preserving an actual shark in formaldehyde, Hirst forces viewers to confront mortality and organic decay with direct, unmediated reality rather than symbolic representation.",
  
  "Clockwork Orange": "Kubrick's film employs conventional cinematic techniques (a = 0.9) with extreme hyper realism (b = -3.1). Its meticulous framing, clinical violence, and detailed world-building create an intensified reality where physiological and psychological experiences are rendered with disturbing precision.",
  
  "Weegee's Crime Photography": "These photographs follow photojournalistic traditions (a = 2.1) with moderate hyper realism (b = -1.1). Their unflinching documentation of crime scenes, accidents, and urban life presents reality with such direct immediacy that viewers become uncomfortable witnesses rather than distanced observers.",
  
  "Panopticon Prison Design": "This architectural concept follows functional design principles (a = 1.7) with strong hyper realism (b = -2.7). Its arrangement of space to maximize surveillance creates an environment where the reality of being constantly observed becomes a tangible, inescapable experience for inmates.",
  
  "Breaking Bad": "This television series employs conventional narrative structure (a = 1.3) with strong hyper realism (b = -2.1). Its meticulous attention to process, chemical detail, and physical deterioration creates an intensified reality where both mundane activities and extreme situations are rendered with the same unflinching precision.",
  
  "The Crucible": "Miller's play uses conventional dramatic structure (a = 1.4) with moderate hyper realism (b = -0.8). Its precise documentation of mass hysteria, judicial process, and moral decision-making presents historical events with such clarity that their psychological and social dynamics become immediately relevant and tangible.",
  
  "Richard Serra's Tilted Arc": "This public sculpture maintained conventional materials and placement (a = 0.3) with moderate hyper realism (b = -1.2). Its massive, physical presence in public space forces viewers to confront its material reality and spatial disruption with such immediacy that its impact on daily movement becomes an inescapable experience.",
  
  "The Road": "McCarthy's novel employs straightforward narrative prose (a = 0.8) with extreme hyper realism (b = -3.0). Its meticulous documentation of survival, physical deterioration, and environmental devastation presents post-apocalyptic reality with such stark, unmediated clarity that mortality and persistence become tangibly present on every page.",
  
  "Ambient 1: Music for Airports": "Brian Eno's groundbreaking ambient album sits just barely in the conventional realm (a = 0.3) while leaning slightly toward hyper-realism (b = -0.2). The music creates atmospheric textures that blend almost imperceptibly with real-world sounds.",

  // New descriptions for Quadrant 1 works
  "The Birth of Venus": "Botticelli's iconic Renaissance painting adheres to classical mythological tradition (a = 2.5) while achieving moderate abstraction (b = 1.3) through its idealized forms and allegorical elements. The work's delicate linework and symbolic composition represent beauty through conventional means while subtly transcending mere representation.",
  
  "War and Peace": "Tolstoy's epic novel follows a conventional narrative structure and historical setting (a = 2.0) with moderate abstraction (b = 1.2) through its philosophical digressions and psychological depth. The panoramic scope combines representational storytelling with profound human insight.",
  
  "The Dark Knight": "Nolan's film employs established superhero and crime drama conventions (a = 1.4) while achieving significant abstraction (b = 1.8) through its morally complex themes and symbolic exploration of chaos versus order. It elevates genre filmmaking through psychological depth and philosophical inquiry.",
  
  "Beethoven's 5th Symphony": "This cornerstone of classical music adheres strongly to conventional symphonic form (a = 2.6) while achieving notable abstraction (b = 1.7) through its revolutionary use of motif development and emotional expressiveness. Its famous four-note opening transforms into a transcendent journey.",
  
  "Taj Mahal": "This iconic mausoleum represents conventional Mughal architectural traditions (a = 2.3) with moderate abstraction (b = 1.1) through its sublime proportions and symbolic elements. Its mathematical precision and formal beauty elevate it beyond mere structural function.",
  
  "Rodin's The Kiss": "This sculpture works within established figurative tradition (a = 1.8) with moderate abstraction (b = 1.2) through its emotional expressiveness and sensual rendering. The textural contrast between rough stone and smooth figures creates poetic resonance beyond pure mimesis.",
  
  "Girl with a Pearl Earring": "Vermeer's painting employs conventional portraiture techniques (a = 2.1) with subtle abstraction (b = 0.8) through its mysterious gaze and luminous quality. The work's formal simplicity and enigmatic expression elevate it beyond pure representation.",
  
  "A Midsummer Night's Dream": "Shakespeare's comedy follows theatrical conventions of its time (a = 1.7) while achieving significant abstraction (b = 1.9) through its magical elements, layered realities, and poetic language. It transforms conventional drama through its imaginative dream logic.",
  
  "Great Expectations": "Dickens' novel employs conventional Victorian narrative structure (a = 1.9) with modest abstraction (b = 1.0) through its symbolic characters and moral complexity. Its social realism is elevated by psychological insight and atmospheric elements.",
  
  "Dorothea Lange's Migrant Mother": "This documentary photograph adheres to photojournalistic conventions (a = 1.7) with minimal but meaningful abstraction (b = 0.7) through its iconic composition and emotional resonance. It transcends mere documentation through its universal human quality.",
  
  "The Lord of the Rings": "Tolkien's epic follows conventional narrative structure (a = 1.6) while achieving high abstraction (b = 2.2) through its complete creation of a secondary world with its own mythology, languages, and history. It elevates fantasy through scholarly depth and moral vision.",
  
  "The Simpsons": "This animated series began with conventional sitcom formats (a = 1.3) but achieved notable abstraction (b = 1.6) through its satirical meta-commentary, surreal elements, and cultural critique. It transcends its medium through layered references and social commentary.",
  
  "David Copperfield": "Dickens' semi-autobiographical novel follows conventional Victorian narrative structures (a = 2.2) with modest abstraction (b = 0.9) through its memorable characters and social critique. Its bildungsroman format is elevated by psychological insight and emotional depth.",
  
  "Monet's Water Lilies": "These paintings begin with conventional landscape subjects (a = 1.5) but achieve high abstraction (b = 2.3) through their focus on light, color, and atmosphere over representational detail. They transcend pure representation through immersive scale and perceptual exploration.",
  
  "Mozart's The Magic Flute": "This opera employs conventional musical forms of its era (a = 2.0) while achieving moderate abstraction (b = 1.5) through its allegorical narrative and symbolic elements. Its fairy-tale structure contains philosophical and spiritual dimensions that transcend pure entertainment.",
  
  "Chrysler Building": "This Art Deco skyscraper works within established architectural principles (a = 1.9) with moderate abstraction (b = 1.3) through its decorative elements and symbolic aspirations. Its setback design and ornamental crown transform functional structure into cultural icon.",
  
  "The Office": "This mockumentary series employs conventional workplace comedy structure (a = 1.8) with moderate abstraction (b = 1.4) through its meta-textual awareness and cringe-inducing social dynamics. It elevates sitcom format through documentary aesthetics and character development.",
  
  "Romeo and Juliet": "Shakespeare's tragedy follows classical dramatic structure (a = 2.4) with modest abstraction (b = 0.8) through its poetic language and timeless themes. Its conventional star-crossed lovers narrative achieves resonance through psychological insight and linguistic innovation.",
  
  "Bach's Brandenburg Concertos": "These Baroque compositions adhere strictly to conventional musical forms of their time (a = 2.7) with modest abstraction (b = 1.0) through their mathematical precision and contrapuntal complexity. Their formal perfection achieves transcendence through structural harmony.",
  
  "Steve McCurry's Afghan Girl": "This photographic portrait follows conventional documentary traditions (a = 1.4) with moderate abstraction (b = 1.1) through its iconic status and haunting gaze. It transcends photojournalism through its symbolic representation of human resilience and dignity.",
  
  // Descriptions for Quadrant 2 works (unconventional context, positive abstraction)
  "Picasso's Les Demoiselles d'Avignon": "This revolutionary painting abandoned conventional perspective and representation (a = -1.9) while achieving high positive abstraction (b = 2.7) through its fragmented forms and radical aesthetic. It shattered traditional notions of beauty and representation, marking a pivotal moment in the birth of Cubism and modern art.",
  
  "Ulysses": "Joyce's modernist novel radically breaks with narrative conventions (a = -2.5) with very high abstraction (b = 3.0) through its stream-of-consciousness technique and linguistic experimentation. Its densely layered structure and encyclopedic approach create an immersive experience that transcends traditional storytelling.",
  
  "2001: A Space Odyssey": "Kubrick's film subverts conventional cinematic narrative (a = -2.3) while achieving extraordinary abstraction (b = 3.3) through its minimal dialogue, symbolic imagery, and evolutionary themes. Its non-linear structure and metaphysical concerns create a transcendent viewing experience that defies easy interpretation.",
  
  "John Coltrane's A Love Supreme": "This jazz suite breaks from conventional musical structure (a = -1.6) with high abstraction (b = 2.8) through its spiritual exploration and improvisational freedom. Its modal approach and thematic coherence create a transcendent musical expression of divine devotion.",
  
  "Fallingwater": "Wright's masterpiece breaks with traditional architectural conventions (a = -1.2) with significant abstraction (b = 2.2) through its organic integration with nature and cantilever design. It reimagines the relationship between built environment and landscape, creating spaces that flow between interior and exterior.",
  
  "Calder's Mobiles": "These kinetic sculptures reject static sculptural tradition (a = -1.8) with high abstraction (b = 2.6) through their incorporation of movement and chance. They transcend conventional sculpture by embracing temporal dimension and viewer participation in creating ever-changing compositions.",
  
  // Descriptions for Quadrant 3 works (unconventional context, hyper realism)
  "Damien Hirst's A Thousand Years": "This installation adheres to recognizable sculptural presentation (a = -2.5) with moderate hyper realism (b = -2.7). By preserving an actual shark in formaldehyde, Hirst forces viewers to confront mortality and organic decay with direct, unmediated reality rather than symbolic representation.",
  
  "Last Exit to Brooklyn": "This novel employs conventional narrative techniques (a = -2.3) with moderate hyper realism (b = -2.5). Its vivid, hallucinatory descriptions present reality with such microscopic intensity that everyday perceptions are fractured, creating a hyper-focused examination of addiction and control mechanisms.",
  
  "Irreversible": "This film subverts conventional narrative structure (a = -2.8) with strong hyper realism (b = -3.3). Its fragmented narrative and explicit content present reality with such tangible intensity that viewers are forced to confront the harsh realities of human behavior and societal issues.",
  
  "Throbbing Gristle's 20 Jazz Funk Greats": "This album adheres to conventional musical structure (a = -2.4) with moderate hyper realism (b = -2.2). Its fusion of jazz and funk styles creates a transcendent listening experience that combines emotional depth and rhythmic vitality.",
  
  "Peter Eisenman's House VI": "This architectural design adheres to conventional building principles (a = -2.0) with moderate hyper realism (b = -1.5). Its geometric form and exposed concrete structure create a stark, minimalist response to the suburban landscape, emphasizing the physical reality of building construction.",
  
  "Kiki Smith's Body Sculptures": "These sculptures adhere to recognizable sculptural tradition (a = -2.2) with moderate hyper realism (b = -2.4). Their organic forms and detailed surface textures present reality with such tangible intensity that viewers are forced to confront the physicality of the human body and its relationship to the world.",
  
  "Lucian Freud's Benefits Supervisor Sleeping": "This painting adheres to conventional figurative tradition (a = -1.8) with moderate hyper realism (b = -3.0). Its detailed rendering of a sleeping supervisor creates a hyper-focused examination of the human form and its relationship to the workplace environment.",
  
  "Sarah Kane's Blasted": "This play subverts conventional dramatic structure (a = -2.6) with strong hyper realism (b = -2.9). Its brutal depiction of violence and emotional turmoil presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Blood Meridian": "This novel adheres to conventional narrative structure (a = -2.1) with moderate hyper realism (b = -2.6). Its vivid descriptions of violence and the American frontier present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Nan Goldin's The Ballad of Sexual Dependency": "This photographic work adheres to conventional documentary tradition (a = -1.9) with moderate hyper realism (b = -2.8). Its candid portrayal of marginalized subjects presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Gaspar Noé's Enter the Void": "This film subverts conventional narrative structure (a = -3.1) with strong hyper realism (b = -2.7). Its fragmented narrative and explicit content present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Lars von Trier's Breaking the Waves": "This film adheres to conventional narrative structure (a = -2.4) with moderate hyper realism (b = -3.0). Its depiction of a woman's struggle with her faith and sexuality presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Hubert Selby Jr.'s Requiem for a Dream": "This novel adheres to conventional narrative structure (a = -2.7) with moderate hyper realism (b = -3.1). Its vivid descriptions of addiction and its consequences present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Andres Serrano's Piss Christ": "This sculpture adheres to recognizable sculptural tradition (a = -3.0) with moderate hyper realism (b = -2.3). Its explicit content and controversial subject matter present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Scott Walker's The Drift": "This album adheres to conventional musical structure (a = -2.9) with moderate hyper realism (b = -2.4). Its minimalistic approach and atmospheric textures present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Tadao Ando's Church of the Light": "This architectural design adheres to conventional building principles (a = -1.7) with moderate hyper realism (b = -1.4). Its minimalist form and exposed concrete structure create a stark, minimalist response to the natural landscape, emphasizing the physical reality of building construction.",
  
  "Hannibal": "This television series adheres to conventional narrative structure (a = -2.2) with moderate hyper realism (b = -2.5). Its depiction of a complex psychological relationship between a psychiatrist and his patient presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "The Theatre of Cruelty": "This theatrical concept adheres to conventional dramatic structure (a = -3.2) with moderate hyper realism (b = -2.2). Its depiction of primal experiences and physical assault on the senses presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Schoenberg's Pierrot Lunaire": "This composition adheres to conventional musical structure (a = -2.8) with moderate hyper realism (b = -1.7). Its fusion of classical and modern musical styles creates a transcendent listening experience that combines emotional depth and rhythmic vitality.",
  
  "Robert Mapplethorpe's X Portfolio": "This photographic work adheres to conventional portrait tradition (a = -2.6) with moderate hyper realism (b = -2.8). Its candid portrayal of marginalized subjects presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  // Descriptions for Quadrant 4 works (conventional context, hyper realism)
  "Chuck Close's Self-Portrait": "This painting adheres to conventional portrait tradition (a = 1.4) with moderate hyper realism (b = -2.2). Its candid portrayal of a recognizable individual presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "In Cold Blood": "This novel adheres to conventional narrative structure (a = 1.3) with moderate hyper realism (b = -2.5). Its vivid descriptions of crime and its consequences present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "The Blair Witch Project": "This film adheres to conventional narrative structure (a = 0.8) with moderate hyper realism (b = -2.9). Its depiction of a fictional event and its consequences present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Nine Inch Nails' The Downward Spiral": "This album adheres to conventional musical structure (a = 0.9) with moderate hyper realism (b = -2.7). Its dark, atmospheric soundscapes present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Mies van der Rohe's Barcelona Pavilion": "This structure follows modernist architectural principles (a = 1.7) with moderate hyper-realism (b = -1.5) through its emphasis on material properties and spatial relationships. Its reflective surfaces and open plan force awareness of physical presence and movement through space.",
  
  "Ron Mueck's Dead Dad": "This sculpture adheres to recognizable sculptural tradition (a = 1.2) with moderate hyper realism (b = -2.4). Its detailed rendering of a deceased father presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Richard Estes' Telephone Booths": "This painting adheres to conventional portrait tradition (a = 1.9) with moderate hyper realism (b = -1.7). Its candid portrayal of a recognizable individual presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "August Strindberg's Miss Julie": "This play adheres to conventional dramatic structure (a = 1.0) with moderate hyper realism (b = -2.0). Its depiction of a complex psychological relationship between a young woman and her employer presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Bret Easton Ellis' Less Than Zero": "This novel adheres to conventional narrative structure (a = 1.1) with moderate hyper realism (b = -2.6). Its vivid descriptions of youth culture and its consequences present reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Walker Evans' Subway Portraits": "This painting adheres to conventional portrait tradition (a = 1.5) with moderate hyper realism (b = -1.9). Its candid portrayal of a recognizable individual presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Michael Haneke's The Piano Teacher": "This film adheres to conventional narrative structure (a = 0.6) with moderate hyper realism (b = -3.0). Its depiction of a complex psychological relationship between a student and his teacher presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "True Detective (Season 1)": "This television series adheres to conventional narrative structure (a = 1.0) with moderate hyper realism (b = -2.3). Its depiction of a complex police investigation presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Joan Didion's The Year of Magical Thinking": "This novel adheres to conventional narrative structure (a = 1.6) with moderate hyper realism (b = -2.1). Its depiction of a woman's grief and her journey through loss presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Gerhard Richter's Photo Paintings": "This painting adheres to conventional portrait tradition (a = 1.3) with moderate hyper realism (b = -1.8). Its candid portrayal of a recognizable individual presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Pink Floyd's The Wall": "This album adheres to conventional musical structure (a = 0.8) with moderate hyper realism (b = -2.5). Its depiction of a complex psychological relationship between a young man and his environment presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Philip Johnson's Glass House": "This architectural design adheres to conventional building principles (a = 1.8) with moderate hyper realism (b = -1.3). Its minimalist form and exposed concrete structure create a stark, minimalist response to the natural landscape, emphasizing the physical reality of building construction.",
  
  "Mindhunter": "This television series adheres to conventional narrative structure (a = 1.2) with moderate hyper realism (b = -2.5). Its depiction of a complex psychological investigation presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Eugene O'Neill's Long Day's Journey into Night": "This play adheres to conventional dramatic structure (a = 1.5) with moderate hyper realism (b = -1.6). Its depiction of a complex psychological relationship between a young man and his environment presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Philip Glass' Koyaanisqatsi": "This film adheres to conventional narrative structure (a = 0.7) with moderate hyper realism (b = -2.3). Its depiction of a complex psychological relationship between a young man and his environment presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  "Robert Frank's The Americans": "This photographic work adheres to conventional documentary tradition (a = 1.4) with moderate hyper realism (b = -1.7). Its candid portrayal of a recognizable individual presents reality with such tangible intensity that viewers are forced to confront the harsh realities of human experience.",
  
  // NEW DESCRIPTIONS
  
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  "The Shawshank Redemption": "This film operates within established cinematic conventions of prison dramas (a = 2.2) while achieving meaningful abstraction (b = 1.9) through its powerful metaphors for hope and resilience. Its straightforward narrative structure provides accessibility while its thematic depth transcends genre limitations through emotional resonance.",
  
  "The Beatles' Abbey Road": "The album follows conventional pop/rock song structures and harmonies (a = 1.7) with moderate abstraction (b = 1.3) through its innovative production techniques and the cohesive medley on side two. While adhering to accessible melodies, it elevates pop music through studio experimentation and conceptual ambition.",
  
  "Casablanca": "This classic film employs conventional Hollywood narrative techniques and genre elements (a = 1.9) with subtle abstraction (b = 1.4) through its nuanced character development and symbolic imagery. Its straightforward storytelling is elevated by thematic complexity and emotional depth that transcends its wartime romance framework.",
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  "Blade Runner": "Scott's sci-fi noir breaks with conventional genre expectations (a = -1.9) while achieving significant abstraction (b = 2.7) through its philosophical themes and visual poetry. Its fragmented narrative, ambiguous protagonist, and dreamlike atmosphere create a transcendent meditation on humanity that defies simple categorization.",
  
  "Salvador Dalí's Persistence of Memory": "This painting radically departs from conventional representation (a = -2.2) with high abstraction (b = 3.3) through its dreamlike melting watches and barren landscape. While technically precise, its surrealist juxtapositions and psychological symbolism create a transcendent exploration of time and consciousness.",
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  "Francis Bacon's Screaming Pope": "This painting rejects traditional portraiture conventions (a = -2.7) with intense hyper-realism (b = -3.2) through its visceral depiction of a distorted, howling figure. The work's raw emotional immediacy and grotesque physicality force viewers to confront primal human experience without aesthetic distance or comfort.",
  
  "Joy Division's Unknown Pleasures": "This album abandons conventional rock structures (a = -2.3) with strong hyper-realism (b = -2.6) through its stark production and unflinching lyrical content. Its atmospheric soundscapes and Ian Curtis's detached vocals create an intensely immediate experience of alienation and psychological distress without romantic artifice.",
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  "Edward Hopper's Nighthawks": "This painting employs traditional representational techniques (a = 1.8) with significant hyper-realism (b = -1.6) through its clinical observation of urban isolation. Its precise rendering of a late-night diner scene creates an intensified reality where ordinary moments reveal existential loneliness through heightened attention to spatial relationships and artificial light.",
  
  "Game of Thrones": "This television series follows recognizable epic fantasy and historical drama conventions (a = 1.4) with strong hyper-realism (b = -2.6) through its unflinching depiction of violence and political machination. Its detailed world-building and morally complex characters create an intensified reality where fantasy tropes are subjected to unsparing psychological and physical consequences.",
  
  "The Sopranos": "This television series works within familiar gangster and family drama formats (a = 1.2) with potent hyper-realism (b = -2.0) through its unvarnished portrayal of mob life and psychological struggles. Its meticulous attention to the banality of criminal existence and complex character psychology creates an intensified reality where conventional narrative expectations are subverted by uncomfortable authenticity.",
  
  // Second batch of 10 descriptions
  
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  "Vivaldi's Four Seasons": "This baroque composition adheres to classical concerto structure and program music conventions (a = 2.3) with modest abstraction (b = 0.9) through its evocative depiction of seasonal changes. Its accessible melodies and virtuosic passages remain firmly within established musical traditions while elevating nature imagery to transcendent emotional experience.",
  
  "The Sistine Chapel": "Michelangelo's fresco follows traditional religious iconography and Renaissance techniques (a = 1.8) with significant abstraction (b = 2.0) through its dynamic compositions and expressive figures. Its conventional Biblical narratives are transformed through dramatic foreshortening and monumental scale into a transcendent vision of divine order.",
  
  "Jane Eyre": "Brontë's novel employs conventional Victorian narrative structure and bildungsroman elements (a = 1.5) with moderate abstraction (b = 1.1) through its psychological depth and gothic atmosphere. While following literary conventions of its time, it elevates the female protagonist's interior journey through symbolic landscape and emotional intensity.",
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  "Haruki Murakami's Wind-Up Bird Chronicle": "This novel disrupts conventional narrative expectations (a = -1.8) with high abstraction (b = 2.9) through its blending of mundane reality with surreal dreamscapes. Its fragmented storylines, mysterious disappearances, and metaphysical wells create a transcendent reading experience that defies logical interpretation.",
  
  "Radiohead's OK Computer": "This album breaks with conventional rock structures (a = -1.1) with substantial abstraction (b = 2.4) through its experimental production techniques and dystopian themes. Its combination of electronic textures, fragmented lyrics, and unconventional song structures creates a transcendent soundscape that evokes technological alienation.",
  
  "Pina Bausch's Choreography": "Bausch's dance works reject traditional ballet and modern dance conventions (a = -2.3) with high abstraction (b = 2.6) through their theatrical elements and emotional intensity. Her repetitive movements, everyday gestures transformed into ritual, and innovative use of space create transcendent experiences that blur boundaries between dance and theater.",
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  "Requiem for a Dream": "Aronofsky's film abandons conventional narrative structure (a = -3.0) with extreme hyper-realism (b = -2.9) through its fragmented editing and visceral depictions of addiction. Its split screens, extreme close-ups, and unflinching portrayal of physical and psychological deterioration create an intensified reality where sensory experience overwhelms narrative distance.",
  
  "The Cabinet of Dr. Caligari": "This German Expressionist film rejects cinematic realism (a = -2.6) with strong hyper-realism (b = -3.0) through its distorted sets and exaggerated performances. Its painted backdrops with impossible angles and heightened emotional states create an intensified psychological reality where internal states manifest as external environment.",
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  "Se7en": "Fincher's film works within established crime thriller conventions (a = 1.0) with intense hyper-realism (b = -3.2) through its meticulous depiction of gruesome crime scenes and urban decay. Its procedural structure is grounded by unflinching attention to physical details and psychological torment that refuses aesthetic distance or moral comfort.",
  
  "Sylvia Plath's Ariel": "These poems employ recognizable lyric structures (a = 0.9) with strong hyper-realism (b = -2.4) through their unflinching examination of personal suffering and physical sensation. Their precise imagery and emotional directness create an intensified experience where psychological states are rendered with clinical precision and disturbing immediacy.",
  
  // Third batch of 10 descriptions
  
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  "Van Gogh's Starry Night": "This painting employs recognizable landscape elements and impasto technique (a = 1.2) while achieving high abstraction (b = 2.4) through its swirling, animated sky and expressive brushwork. Its conventional subject is transformed through emotional intensity and rhythmic patterning into a transcendent vision that bridges the physical and spiritual realms.",
  
  "Hitchcock's Vertigo": "This film utilizes conventional thriller and mystery narrative frameworks (a = 1.3) with moderate abstraction (b = 1.5) through its psychological complexity and symbolic imagery. Its straightforward genre elements are elevated by dreamlike sequences, color symbolism, and exploration of obsession that transcend pure entertainment.",
  
  "Tchaikovsky's Swan Lake": "This ballet follows classical composition structure and traditional choreography (a = 1.8) with meaningful abstraction (b = 1.7) through its transformation motifs and emotional expressiveness. Its conventional romantic narrative achieves transcendence through the contrast between human and supernatural worlds and symbolic color dualism.",
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  "Tarkovsky's Stalker": "This film abandons conventional narrative pacing and exposition (a = -2.1) with high abstraction (b = 3.2) through its philosophical dialogue and metaphysical imagery. Its long takes, minimal plot, and mysterious 'Zone' create a transcendent cinematic experience where physical journeys become spiritual quests beyond rational understanding.",
  
  "Yeats' The Second Coming": "This poem breaks with traditional religious imagery and poetic structure (a = -1.7) with high abstraction (b = 3.1) through its apocalyptic vision and symbolic beasts. Its fragmented imagery and prophetic tone create a transcendent expression of historical crisis that collapses linear time into mythic consciousness.",
  
  "Bjork's Homogenic": "This album rejects conventional pop structures and instrumentation (a = -1.5) with significant abstraction (b = 2.5) through its fusion of electronic beats with orchestral arrangements. Its unconventional vocal techniques and emotional intensity create a transcendent sonic landscape that blurs boundaries between human and technological expression.",
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  "William S. Burroughs' Nova Express": "This novel completely abandons traditional narrative coherence (a = -3.4) with extreme hyper-realism (b = -2.8) through its 'cut-up' technique and visceral language. Its fragmented texts, viral metaphors, and hallucinatory sequences create an intensified reality where language itself becomes a tangible, autonomous force beyond authorial control.",
  
  "Antonin Artaud's Poetry": "These works reject conventional poetic forms and linguistic structures (a = -2.9) with strong hyper-realism (b = -2.5) through their raw physicality and psychological intensity. Their fragmented syntax, neologisms, and corporeal imagery create an intensified reality where language becomes physical sensation rather than representation.",
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  "Tool's Ænima": "This album employs recognizable progressive metal structures (a = 0.7) with strong hyper-realism (b = -2.2) through its precise production and unflinching lyrical content. Its mathematical time signatures and meticulous instrumental performance create an intensified sonic reality where technical complexity serves visceral emotional and physical impact.",
  
  "Diane Arbus' Identical Twins": "This photograph follows conventional portrait composition (a = 1.6) with significant hyper-realism (b = -1.8) through its unflinching gaze and psychological tension. Its technical precision and frontal presentation create an intensified reality where subtle differences between identical subjects become unsettlingly prominent through heightened visual attention.",
  
  // Fourth batch of 10 descriptions
  
  // QUADRANT 1: (+a, +b) - Conventional context, positive abstraction
  "The Odyssey": "Homer's epic employs conventional narrative structure and mythological elements (a = 2.1) with moderate abstraction (b = 1.6) through its symbolic journey and archetypal characters. Its traditional storytelling framework achieves transcendence through allegorical layers that transform physical wandering into spiritual and psychological exploration.",
  
  "Eiffel Tower": "This architectural landmark follows established engineering principles and functional purpose (a = 2.2) with modest abstraction (b = 1.0) through its elegant form and symbolic significance. Its conventional iron structure achieves transcendence through revolutionary height and mathematical precision that transformed urban aesthetics.",
  
  "I Love Lucy": "This television series adheres strictly to conventional sitcom format and character types (a = 2.4) with minimal abstraction (b = 0.6) through its physical comedy and contained narrative arcs. Its traditional structure achieves modest transcendence through groundbreaking production techniques and subtle commentary on gender roles.",
  
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  "Cindy Sherman Self-Portraits": "These photographs reject traditional self-portraiture conventions (a = -1.2) with significant abstraction (b = 2.3) through their theatrical staging and identity exploration. Their cinematic references and character transformations create a transcendent commentary on gender representation that blurs boundaries between documentary and fiction.",
  
  "Lost": "This television series breaks with conventional narrative continuity (a = -2.0) with high abstraction (b = 3.4) through its non-linear storytelling and supernatural elements. Its complex mythology, philosophical references, and temporal anomalies create a transcendent viewing experience that challenges traditional television storytelling.",
  
  "Guggenheim Museum Bilbao": "Gehry's architectural design rejects traditional building forms (a = -1.4) with high abstraction (b = 2.5) through its undulating titanium surfaces and deconstructed volumes. Its rejection of right angles and conventional spatial organization creates a transcendent experience where building becomes sculptural form beyond functional necessity.",
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  "Hieronymus Bosch's Garden of Earthly Delights": "This triptych abandons Renaissance pictorial conventions (a = -2.5) with intense hyper-realism (b = -1.9) through its hallucinatory details and symbolic creatures. Its microscopic attention to fantastical elements creates an intensified reality where imaginary scenes acquire disturbing tangibility through excess of visual information.",
  
  "Twin Peaks: Fire Walk With Me": "Lynch's film rejects conventional narrative logic (a = -2.2) with strong hyper-realism (b = -2.7) through its fragmented structure and nightmarish imagery. Its disjointed scenes, extreme emotional states, and supernatural elements create an intensified reality where psychological trauma manifests as tangible, disorienting experience.",
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  "Haneke's Funny Games": "This film employs conventional home invasion thriller tropes (a = 0.4) with extreme hyper-realism (b = -2.7) through its unbroken takes of violence and direct audience address. Its methodical pacing and refusal of catharsis create an intensified reality where genre expectations are deliberately frustrated by uncomfortable duration and complicity.",
  
  "Haneke's The White Ribbon": "This film follows traditional period drama conventions (a = -1.8) with strong hyper-realism (b = -2.7) through its meticulous black-and-white cinematography and unsentimental performances. Its precise framing and emotional restraint create an intensified historical reality where social oppression becomes palpably present through sustained visual attention."
};

// Create a new object for our additional work descriptions
const newWorkDescriptions = {
  // QUADRANT 2: (-a, +b) - Unconventional context, positive abstraction
  "Picasso's Les Demoiselles d'Avignon": "This revolutionary painting abandoned conventional perspective and representation (a = -1.9) while achieving high positive abstraction (b = 2.7) through its fragmented forms and radical aesthetic. It shattered traditional notions of beauty and representation, marking a pivotal moment in the birth of Cubism and modern art.",
  
  "Ulysses": "Joyce's modernist novel radically breaks with narrative conventions (a = -2.5) with very high abstraction (b = 3.0) through its stream-of-consciousness technique and linguistic experimentation. Its densely layered structure and encyclopedic approach create an immersive experience that transcends traditional storytelling.",
  
  "2001: A Space Odyssey": "Kubrick's film subverts conventional cinematic narrative (a = -2.3) while achieving extraordinary abstraction (b = 3.3) through its minimal dialogue, symbolic imagery, and evolutionary themes. Its non-linear structure and metaphysical concerns create a transcendent viewing experience that defies easy interpretation.",
  
  "John Coltrane's A Love Supreme": "This jazz suite breaks from conventional musical structure (a = -1.6) with high abstraction (b = 2.8) through its spiritual exploration and improvisational freedom. Its modal approach and thematic coherence create a transcendent musical expression of divine devotion.",
  
  "Fallingwater": "Wright's masterpiece breaks with traditional architectural conventions (a = -1.2) with significant abstraction (b = 2.2) through its organic integration with nature and cantilever design. It reimagines the relationship between built environment and landscape, creating spaces that flow between interior and exterior.",
  
  "Calder's Mobiles": "These kinetic sculptures reject static sculptural tradition (a = -1.8) with high abstraction (b = 2.6) through their incorporation of movement and chance. They transcend conventional sculpture by embracing temporal dimension and viewer participation in creating ever-changing compositions.",
  
  // QUADRANT 3: (-a, -b) - Unconventional context, hyper realism
  "Damien Hirst's A Thousand Years": "This installation radically rejects conventional art forms (a = -2.5) while embracing extreme hyper-realism (b = -2.7) through its use of actual decomposing matter and living flies. It confronts viewers with the unmediated reality of life, death, and decay in a way that refuses aesthetic distance or symbolic representation.",
  
  "Last Exit to Brooklyn": "Selby's novel abandons traditional narrative structure (a = -2.3) with intense hyper-realism (b = -2.5) through its unflinching depiction of violence, addiction, and desperation. Its fractured syntax and vernacular language create an immersive experience of urban despair that refuses literary beautification.",
  
  "Irreversible": "Noé's film completely subverts cinematic conventions (a = -2.8) with extreme hyper-realism (b = -3.3) through its reverse chronology and unbroken takes of graphic violence. Its sensory assault forces viewers to confront physical and emotional trauma with disturbing immediacy and duration.",
  
  "Throbbing Gristle's 20 Jazz Funk Greats": "This album rejects musical conventions (a = -2.4) with strong hyper-realism (b = -2.2) through its industrial noise and disturbing subject matter. Its confrontational sound and deadpan title create an unnerving experience that forces awareness of sound as physical phenomenon rather than aesthetic pleasure.",
  
  "Peter Eisenman's House VI": "This residence breaks with architectural function and form (a = -2.0) with moderate hyper-realism (b = -1.5) through its deliberately dysfunctional elements and exposed structure. Its rejection of comfort forces inhabitants to confront the physical reality of architectural space as theoretical construct.",
  
  "Kiki Smith's Body Sculptures": "These works reject classical sculptural tradition (a = -2.2) with strong hyper-realism (b = -2.4) through their unflinching depiction of bodily functions and mortality. Their use of materials like wax and paper emphasize vulnerability through tactile qualities that evoke actual flesh.",
  
  // QUADRANT 4: (+a, -b) - Conventional context, hyper realism
  "Chuck Close's Self-Portrait": "This painting works within traditional portraiture (a = 1.4) but achieves strong hyper-realism (b = -2.2) through its extreme scale and photographic detail. Its grid system and microscopic focus transform human features into a landscape of color and form that paradoxically becomes more real than reality.",
  
  "In Cold Blood": "Capote's novel employs conventional journalistic techniques (a = 1.3) with intense hyper-realism (b = -2.5) through its meticulous documentation of actual murders and their aftermath. Its objective prose creates a clinical examination of violence that refuses moral or emotional distance.",
  
  "The Blair Witch Project": "This film uses established documentary conventions (a = 0.8) with strong hyper-realism (b = -2.9) through its found-footage aesthetic and improvised performances. Its shaky cameras and environmental sounds create an unmediated experience of fear that collapses the boundary between fiction and reality.",
  
  "Nine Inch Nails' The Downward Spiral": "This album employs recognizable rock structures (a = 0.9) with intense hyper-realism (b = -2.7) through its industrial sounds and unflinching lyrical content. Its layered production emphasizes physical and emotional pain with such clarity that listening becomes a visceral rather than aesthetic experience.",
  
  "Mies van der Rohe's Barcelona Pavilion": "This structure follows modernist architectural principles (a = 1.7) with moderate hyper-realism (b = -1.5) through its emphasis on material properties and spatial relationships. Its reflective surfaces and open plan force awareness of physical presence and movement through space."
};

// Merge all descriptions
Object.assign(descriptions, newWorkDescriptions);

// Add descriptions for selected works from newWorks2
descriptions["Sargent's Madame X"] = "This portrait adheres to conventional portraiture traditions (a = 2.2) with moderate abstraction (b = 1.2) through its bold use of negative space and psychological tension. Its elegant minimalism and contrast between pale skin and black dress create a striking image that transcends mere likeness.";

descriptions["Anna Karenina"] = "Tolstoy's novel employs conventional 19th-century narrative techniques (a = 1.9) with moderate abstraction (b = 1.3) through its psychological depth and philosophical digressions. Its realistic social portrayal is elevated by moral complexity and symbolic elements.";

descriptions["Frida Kahlo's Self-Portraits"] = "These paintings reject conventional portraiture (a = -1.8) with high abstraction (b = 2.4) through their symbolic elements and psychological intensity. They transform personal trauma into universal statements through surreal juxtapositions and mythological references.";

descriptions["Persona"] = "Bergman's film breaks with narrative convention (a = -2.2) with very high abstraction (b = 3.1) through its exploration of identity dissolution and psychological merging. Its stark imagery and experimental techniques create a dreamlike examination of human consciousness.";

descriptions["The Sound and the Fury"] = "Faulkner's novel abandons linear narrative (a = -2.7) with intense hyper-realism (b = -2.0) through its stream-of-consciousness technique and shifting perspectives. Its microscopic attention to sensory detail and psychological states creates an unfiltered experience of subjective reality.";

descriptions["Lucian Freud's Sleeping by the Lion Carpet"] = "This painting employs traditional portraiture format (a = 1.3) with strong hyper-realism (b = -2.3) through its unflinching depiction of flesh and physiological vulnerability. Its impasto technique and harsh lighting emphasize the physical materiality of the human body.";