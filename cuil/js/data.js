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

// Reinitialize categories properly
const categories = [...new Set(works.map(work => work.type))];

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
  
  "The Road": "McCarthy's novel employs straightforward narrative prose (a = 0.8) with extreme hyper realism (b = -3.0). Its meticulous documentation of survival, physical deterioration, and environmental devastation presents post-apocalyptic reality with such stark, unmediated clarity that mortality and persistence become tangibly present on every page."
};

// Add detailed descriptions for additional works
const additionalDescriptions = {
  // QUADRANT 1 (+a, +b) - Conventional, positive abstraction
  "The Shawshank Redemption": "This film employs conventional storytelling techniques and narrative structure (a = 2.2) with strong positive abstraction through its themes of hope, redemption, and the human spirit's resilience (b = 1.9). Its inspirational message elevates the prison drama beyond its genre conventions.",
  
  "The Beatles' Abbey Road": "The Beatles' final recorded album adheres to established pop/rock structures (a = 1.7) while achieving moderate positive abstraction (b = 1.3) through innovative production techniques and the seamless medley on side two. Its conventional musical foundation supports experimental flourishes.",
  
  "The Thinker": "Rodin's sculpture works within classical figurative tradition (a = 2.0) with modest positive abstraction (b = 0.8). The contemplative pose and detailed musculature represent conventional sculptural ideals while suggesting deeper philosophical meaning.",
  
  "Friends": "This sitcom employs highly conventional television format and storytelling (a = 2.6) with minimal positive abstraction (b = 0.4). Its straightforward approach to character and narrative made it extremely accessible while occasionally touching on more profound themes of friendship and chosen family.",
  
  "The Odyssey": "Homer's epic follows established narrative conventions of its time (a = 2.1) while achieving significant positive abstraction (b = 1.6) through its metaphorical journey, mythological elements, and exploration of homecoming. Its archetypal storytelling has influenced countless narratives.",
  
  "Casablanca": "This film classic employs conventional narrative structure and cinematography of its era (a = 1.9) with moderate positive abstraction (b = 1.4) through its exploration of sacrifice, complex morality, and wartime romance. Its iconic scenes transcend the melodrama genre.",
  
  "Vivaldi's Four Seasons": "This baroque composition follows conventional musical structures of its time (a = 2.3) with modest positive abstraction (b = 0.9). Its programmatic nature and vivid musical 'painting' of seasonal characteristics elevate it beyond mere technical display.",
  
  "The Sistine Chapel": "Michelangelo's masterpiece employs Renaissance conventions of religious art (a = 1.8) with high positive abstraction (b = 2.0). While following traditional religious iconography, its grandeur, compositional complexity, and emotional intensity create a transcendent viewing experience.",
  
  "Jane Eyre": "Brontë's novel utilizes conventional Victorian narrative techniques (a = 1.5) with moderate positive abstraction (b = 1.1). Its exploration of female independence, psychological complexity, and moral growth elevate it beyond the typical romance of its era.",
  
  "Eiffel Tower": "This architectural landmark employed conventional industrial materials and engineering principles of its time (a = 2.2) with modest positive abstraction (b = 1.0). Its unprecedented height and distinctive silhouette transformed it from functional structure to cultural icon.",
  
  "Hitchcock's Vertigo": "This film works within recognizable thriller conventions (a = 1.3) with notable positive abstraction (b = 1.5). Its exploration of obsession, identity, and psychological fragility, along with innovative visual techniques, elevate it beyond genre limitations.",
  
  "Tchaikovsky's Swan Lake": "This ballet score employs classical musical forms and structures (a = 1.8) with significant positive abstraction (b = 1.7). Its emotional expressiveness, memorable themes, and dramatic storytelling transcend technical composition to create a powerful narrative experience.",
  
  "I Love Lucy": "This pioneering sitcom employed conventional television formats of its era (a = 2.4) with minimal positive abstraction (b = 0.6). Its straightforward presentation and accessible humor broke ground primarily through technical innovations like the three-camera setup rather than narrative complexity.",
  
  // QUADRANT 2 (-a, +b) - Unconventional, positive abstraction
  "Kafka's Metamorphosis": "This novella radically departs from realist narrative conventions (a = -2.4) with high positive abstraction (b = 3.0). Its absurdist premise of a man transforming into an insect creates an allegorical framework for exploring alienation, identity, and family dynamics in modernist society.",
  
  "Blade Runner": "Ridley Scott's film subverts conventional sci-fi storytelling (a = -1.9) with strong positive abstraction (b = 2.7). Its philosophical exploration of consciousness, memory, and what constitutes humanity is presented through unconventional pacing and neo-noir visual style.",
  
  "Salvador Dalí's Persistence of Memory": "This surrealist masterpiece rejects representational painting conventions (a = -2.2) with very high positive abstraction (b = 3.3). Its dreamlike melting clocks and strange landscape create a meditation on time and memory that transcends logical interpretation.",
  
  "Bjork's Homogenic": "This album breaks from conventional pop music structures (a = -1.5) with high positive abstraction (b = 2.5). Its fusion of electronic beats, orchestral arrangements, and Bjork's unique vocal approach creates an emotional landscape that transcends genre categorization.",
  
  "Lost": "This television series subverted traditional TV narrative conventions (a = -2.0) with very high positive abstraction (b = 3.4). Its non-linear storytelling, mysterious elements, and philosophical themes created a show that demanded active audience engagement with complex ideas.",
  
  "Haruki Murakami's Wind-Up Bird Chronicle": "This novel departs significantly from conventional narrative (a = -1.8) with high positive abstraction (b = 2.9). Its blend of everyday reality with surreal elements, dream sequences, and parallel worlds creates a meditative exploration of consciousness and connection.",
  
  "The Matrix": "This film employs unconventional visual techniques (a = -1.6) with high positive abstraction (b = 2.8). Its innovative 'bullet time' effects, philosophical underpinnings, and reality-questioning narrative create a transcendent viewing experience that expands the possibilities of cinematic storytelling.",
  
  "Gaudí's Casa Batlló": "This architectural work rejects structural and decorative conventions (a = -1.3) with significant positive abstraction (b = 2.0). Its organic forms, undulating surfaces, and nature-inspired elements create a building that feels alive and spiritually uplifting.",
  
  "Yeats' The Second Coming": "This poem breaks with traditional poetic structure (a = -1.7) with very high positive abstraction (b = 3.1). Its apocalyptic imagery and prophetic tone create a work that transcends its historical moment to become an enduring expression of civilizational anxiety and transformation.",
  
  "Radiohead's OK Computer": "This album departs from conventional rock structures (a = -1.1) with high positive abstraction (b = 2.4). Its experimental soundscapes, unconventional song structures, and themes of technological alienation create a prescient work that transcends genre limitations.",
  
  "Tarkovsky's Stalker": "This film radically subverts narrative cinema conventions (a = -2.1) with very high positive abstraction (b = 3.2). Its philosophical journey through 'the Zone,' deliberate pacing, and metaphysical themes create a meditative experience that transcends typical storytelling.",
  
  "Pina Bausch's Choreography": "Her dance works reject classical ballet conventions (a = -2.3) with high positive abstraction (b = 2.6). By integrating everyday movements, theatrical elements, and emotional expressiveness, she created a form of dance theater that transcends traditional boundaries between art forms.",
  
  "Cindy Sherman Self-Portraits": "These photographic works subvert traditional portraiture (a = -1.2) with high positive abstraction (b = 2.3). By assuming various personas and exploring female stereotypes, Sherman creates works that transcend simple self-representation to comment on identity construction and media representation.",
  
  // QUADRANT 3 (-a, -b) - Unconventional context, hyper realism
  "Requiem for a Dream": "Aronofsky's film radically rejects conventional narrative cinema (a = -3.0) with intense hyper realism (b = -2.9). Its fragmented editing, extreme close-ups, and unrelenting portrayal of addiction create a visceral experience that captures physiological and psychological states with heightened sensory detail.",
  
  "Francis Bacon's Screaming Pope": "This painting series violently distorts figurative representation (a = -2.7) with extreme hyper realism (b = -3.2). The twisted figures present physical and psychological experience with such visceral intensity that the emotional and corporeal reality becomes overwhelming and inescapable.",
  
  "Joy Division's Unknown Pleasures": "This album breaks with conventional rock structure (a = -2.3) with strong hyper realism (b = -2.6). Its sparse, clinical production, unusual rhythmic patterns, and Ian Curtis's unaffected vocals create a sonic environment that focuses intently on emotional states with documentary-like precision.",
  
  "The Trial": "Kafka's novel abandons traditional narrative logic (a = -3.1) with strong hyper realism (b = -2.4). Its detailed description of bureaucratic processes and psychological states presents reality with such obsessive precision that ordinary situations become unsettling through their excessive clarity.",
  
  "The Cabinet of Dr. Caligari": "This German Expressionist film rejects cinematic realism (a = -2.6) with very high hyper realism (b = -3.0). Its distorted sets and exaggerated performances present psychological reality with such intensity that internal states manifest physically in the environment, making subjective experience tangibly real.",
  
  "Throbbing Gristle's Music": "This industrial music pioneer completely rejected musical convention (a = -2.8) with extreme hyper realism (b = -3.4). Their use of actual industrial sounds, disturbing real-world samples, and unprocessed recordings creates music that documents reality with uncomfortable directness and fidelity.",
  
  "William S. Burroughs' Nova Express": "This novel radically abandons narrative coherence (a = -3.4) with strong hyper realism (b = -2.8). Its fragmented prose captures sensory experience, consciousness, and perception with such microscopic detail that reality appears alien through the intensity of observation.",
  
  "Hieronymus Bosch's Garden of Earthly Delights": "This triptych defies the religious painting conventions of its time (a = -2.5) with strong hyper realism (b = -1.9). Its fantastical creatures and scenarios are rendered with such precise detail that they achieve a heightened reality where symbolic and psychological truths become visually manifest.",
  
  "Antichrist": "Von Trier's film completely rejects conventional cinema (a = -3.2) with extreme hyper realism (b = -3.6). Its graphic depictions of psychological states, bodily functions, and natural processes present reality with such unflinching detail that the physical world becomes almost unbearable in its vivid immediacy.",
  
  "Deconstructivist Architecture": "This architectural movement rejects functional and aesthetic conventions (a = -1.9) with moderate hyper realism (b = -1.6). Its fragmented forms and exposed structural elements bring attention to the actual physical components and construction methods, highlighting the material reality of buildings that conventional architecture conceals.",
  
  "Twin Peaks: Fire Walk With Me": "Lynch's film prequel subverts both cinema and television conventions (a = -2.2) with strong hyper realism (b = -2.7). Its visceral depiction of abuse, addiction, and psychological trauma presents emotional and sensory experiences with such intensity that the line between subjective perception and reality disappears.",
  
  "Antonin Artaud's Poetry": "His poetic works reject conventional structure and language (a = -2.9) with strong hyper realism (b = -2.5). Through fragmented syntax and visceral imagery, Artaud creates work that documents extreme psychological states with such precision that internal experience becomes externalized as tangible reality.",
  
  "Chris Burden's Performance Art": "His works reject traditional artistic presentation (a = -3.3) with strong hyper realism (b = -2.3). By using his own body as material—getting shot, crucified on a car, or crawling through glass—Burden creates experiences where physical reality and pain become the unmediated content of the work itself.",
  
  // QUADRANT 4 (+a, -b) - Conventional context, hyper realism
  "The Handmaid's Tale": "Atwood's novel employs conventional narrative techniques (a = 1.5) with extreme hyper realism (b = -2.9). Its meticulous documentation of theocratic oppression, bodily regulation, and psychological degradation presents dystopian elements with such precise detail that their dehumanizing effects become viscerally tangible.",
  
  "Radiohead's Kid A": "This album maintains recognizable musical structures (a = 0.6) with strong hyper realism (b = -2.5). Its clinical production, precise electronic textures, and detailed sonic landscapes create an immersive environment where technological alienation and emotional isolation are rendered with unflinching clarity.",
  
  "Se7en": "Fincher's film employs conventional thriller structure (a = 1.0) with extreme hyper realism (b = -3.2). Its meticulous documentation of crime scenes, urban decay, and moral deterioration creates an intensified reality where violence and ethical corruption are rendered with such microscopic detail that they become overwhelming sensory experiences.",
  
  "Edward Hopper's Nighthawks": "This painting uses conventional realist technique (a = 1.8) with moderate hyper realism (b = -1.6). Its precise documentation of urban isolation, artificial light, and psychological distance presents ordinary moments with such detailed attention that the emotional emptiness of modern life becomes a tangible, inescapable presence.",
  
  "Game of Thrones": "This television series employs familiar fantasy elements (a = 1.4) with strong hyper realism (b = -2.6). Its meticulous attention to violence, political machination, and physical vulnerability creates a heightened reality where medieval conditions and power dynamics are rendered with visceral, unfiltered immediacy.",
  
  "Sylvia Plath's Ariel": "This poetry collection maintains traditional poetic structures (a = 0.9) with strong hyper realism (b = -2.4). Its precise documentation of psychological states, bodily experiences, and emotional trauma creates a heightened reality where internal suffering is rendered with such intense clarity that it becomes physically palpable.",
  
  "The Sopranos": "This television series works within conventional drama frameworks (a = 1.2) with strong hyper realism (b = -2.0). Its detailed documentation of violence, psychological breakdown, and mundane criminal operations creates an intensified reality where both ordinary family dynamics and extreme behaviors are rendered with the same unflinching precision.",
  
  "No Country for Old Men": "The Coen Brothers' film employs conventional Western and thriller elements (a = 1.1) with strong hyper realism (b = -2.8). Its meticulous attention to landscape, violence, and procedural detail creates a heightened reality where mortality and ethical choices are rendered with such precision that their consequences become physically palpable.",
  
  "René Magritte's The Treachery of Images": "This painting uses conventional, realistic technique (a = 1.3) with moderate hyper realism (b = -1.4). Its precise documentation of a pipe with text denying its reality forces viewers to confront representation itself with such clarity that the disconnect between image and reality becomes an immediate, tangible experience.",
  
  "Tool's Ænima": "This album works within recognizable progressive metal conventions (a = 0.7) with strong hyper realism (b = -2.2). Its precise production, visceral sonic textures, and detailed instrumental performances create an immersive environment where psychological disintegration and physical experience are rendered with disturbing immediacy.",
  
  "The Road": "McCarthy's novel employs straightforward narrative prose (a = 0.8) with extreme hyper realism (b = -3.0). Its meticulous documentation of survival, physical deterioration, and environmental devastation presents post-apocalyptic reality with such stark, unmediated clarity that mortality and persistence become tangibly present on every page.",
  
  "Diane Arbus' Identical Twins": "This photograph uses conventional portrait technique (a = 1.6) with moderate hyper realism (b = -1.8). Its unflinching documentation of the twins' subtle differences and penetrating gazes creates an experience where identity and similarity become uncomfortably tangible realities that confront the viewer directly.",
  
  "Haneke's Funny Games": "This film employs conventional home invasion thriller tropes (a = 0.4) with strong hyper realism (b = -2.7). Its clinical, unblinking documentation of violence, emotional breakdown, and physical suffering creates a viewing experience where the reality of trauma becomes unbearably present and inescapable.",
  
  "Requiem for a Dream (Novel)": "Selby's novel employs traditional narrative techniques (a = 1.4) with extreme hyper realism (b = -2.9). Its meticulous documentation of addiction, physical deterioration, and desperation renders physiological and psychological states with such precise detail that readers experience them as tangible, inescapable realities.",
  
  "Exit Through the Gift Shop": "Banksy's documentary follows conventional documentary structure (a = 1.5) with moderate hyper realism (b = -1.8). Its detailed examination of street art, commercialization, and authenticity presents the art world with such unflinching directness that its contradictions and absurdities become uncomfortably real.",
  
  "Blade Runner": "Scott's film employs traditional cinematic language (a = 1.0) with strong hyper realism (b = -2.0). Its meticulously detailed dystopian environment, attention to technological interfaces, and visceral violence create an intensified reality where the line between human and artificial is explored with clinical precision.",
  
  "Watchmen (Comic)": "Moore's graphic novel works within comic conventions (a = 0.4) with moderate hyper realism (b = -1.4). Its detailed world-building, meticulous chronology, and unflinching examination of violence present superheroes with such reality-based immediacy that their psychology and physicality become uncomfortably tangible.",
  
  "Synecdoche, New York": "Kaufman's film uses a traditional narrative framework (a = 0.3) with extreme hyper realism (b = -3.3). Its obsessive documentation of physical deterioration, passage of time, and psychological states presents human experience with such microscopic detail that mortality becomes an overwhelming, tangible presence.",
  
  "The Shining": "Kubrick's film maintains conventional horror elements (a = 1.2) with strong hyper realism (b = -2.2). Its meticulous framing, attention to architectural detail, and documentation of psychological breakdown create an intensified reality where spaces and mental states are rendered with disturbing precision.",
  
  "Truman Show": "This film employs traditional narrative structure (a = 2.0) with moderate hyper realism (b = -1.0). Its detailed portrayal of surveillance, artificial environments, and media construction creates a heightened reality where the fabricated nature of entertainment becomes uncomfortably tangible.",
  
  "Richard Serra's Tilted Arc": "This public sculpture maintained conventional materials and placement (a = 0.3) with moderate hyper realism (b = -1.2). Its massive, physical presence in public space forces viewers to confront its material reality and spatial disruption with such immediacy that its impact on daily movement becomes an inescapable experience.",
  
  "The Road": "McCarthy's novel employs straightforward narrative prose (a = 0.8) with extreme hyper realism (b = -3.0). Its meticulous documentation of survival, physical deterioration, and environmental devastation presents post-apocalyptic reality with such stark, unmediated clarity that mortality and persistence become tangibly present on every page."
};

// Merge additional descriptions
Object.assign(descriptions, additionalDescriptions); 