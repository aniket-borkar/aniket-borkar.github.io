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
 * Q1 (+a, +b): Conventional context, realistic/positive abstraction
 * Q2 (-a, +b): Unconventional context, realistic/positive abstraction
 * Q3 (-a, -b): Unconventional context, negative/subversive abstraction
 * Q4 (+a, -b): Conventional context, negative/subversive abstraction
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
  
  // QUADRANT 3: (-a, -b) - Unconventional context, negative abstraction
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
  
  // QUADRANT 4: (+a, -b) - Conventional context, negative abstraction
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
  {"name": "Richard Serra's Tilted Arc", "a": 0.3, "b": -1.2, "type": "Sculpture"}
];

// Extract unique categories
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
  
  // QUADRANT 3: (-a, -b)
  "Duchamp's Fountain": "This readymade urinal signed 'R. Mutt' radically rejected art conventions (a = -2.8) with negative abstraction (b = -1.3). It challenged the very definition of art by presenting an unmodified utilitarian object in a gallery context, subverting traditional notions of aesthetics and craft.",
  
  "Naked Lunch": "Burroughs' novel completely abandons conventional narrative (a = -3.2) with highly negative abstraction (b = -2.7). Its non-linear 'cut-up' technique, hallucinatory content, and fragmented style deliberately disorient the reader and subvert literary expectations.",
  
  "Eraserhead": "Lynch's debut feature film rejects conventional storytelling (a = -2.4) with extreme negative abstraction (b = -3.5). Its nightmarish imagery, industrial soundscape, and deliberate obscurity create a deeply unsettling experience that defies interpretation.",
  
  "4'33\"": "John Cage's silent composition radically rejects musical conventions (a = -3.5) with strong negative abstraction (b = -2.1). By presenting silence as music, it subverts audience expectations and challenges fundamental assumptions about sound, composition, and performance.",
  
  "House of Leaves": "Danielewski's experimental novel abandons traditional narrative structure (a = -2.9) with strong negative abstraction (b = -2.8). Its nested narratives, typographical experimentation, and physical manipulation of the book format create a disorienting labyrinth of text.",
  
  "Brutalist Architecture": "This architectural movement rejects decorative conventions (a = -1.5) with negative abstraction (b = -1.8). Its exposed concrete, geometric repetition, and imposing scale often create environments that challenge human comfort and traditional aesthetics.",
  
  "Un Chien Andalou": "Buñuel and Dalí's surrealist film completely abandons narrative logic (a = -3.1) with extreme negative abstraction (b = -3.3). Its deliberately shocking imagery and dream-like sequences resist interpretation and were designed to disturb audiences.",
  
  "Howl": "Ginsberg's poem breaks with poetic conventions (a = -1.6) with mild negative abstraction (b = -0.9). Its stream-of-consciousness style, explicit content, and rejection of formal constraints challenged contemporary standards while remaining relatively accessible.",
  
  "Black Square": "Malevich's supreme example of non-objective art rejects all pictorial convention (a = -3.3) with negative abstraction (b = -1.2). By reducing painting to a black square on white ground, it eliminates representation entirely, challenging the viewer with the absence of content.",
  
  "Diane Arbus Portraits": "Arbus's photography defies conventional portrait traditions (a = -1.3) with negative abstraction (b = -2.2). Her unflinching depictions of marginalized subjects and 'freaks' confront viewers with uncomfortable realities typically excluded from photographic representation.",
  
  "Artaud's Theatre of Cruelty": "This theatrical concept rejects conventional drama (a = -2.2) with negative abstraction (b = -2.5). Its emphasis on primal experience, physical assault on the senses, and destruction of the fourth wall aims to shatter theatrical illusion and confront audiences directly.",
  
  "Stockhausen's Helicopter Quartet": "This avant-garde composition completely abandons conventional performance contexts (a = -3.4) with extreme negative abstraction (b = -3.1). By placing string players in separate helicopters, it fractures musical cohesion and challenges fundamental assumptions about ensemble performance.",
  
  // QUADRANT 4: (+a, -b)
  "American Psycho": "Ellis's novel employs conventional narrative techniques (a = 1.6) with strong negative abstraction (b = -2.4). Its unreliable narrator, graphic violence, and satirical portrayal of consumerism create a disturbing experience within a recognizable literary framework.",
  
  "Fight Club": "Fincher's film uses relatively conventional cinematic language (a = 0.8) with negative abstraction (b = -1.9). Its twist ending, unreliable narrator, and critique of masculinity subvert audience expectations while remaining accessible.",
  
  "Pulp Fiction": "Tarantino's film employs recognizable genre conventions (a = 1.2) with negative abstraction (b = -1.5). Its non-linear narrative, stylized violence, and self-referential quality challenge traditional storytelling while remaining commercially successful.",
  
  "Black Mirror": "This anthology series works within conventional television formats (a = 0.7) with strong negative abstraction (b = -2.8). Its dystopian near-future scenarios and technological anxiety create unsettling viewing experiences that subvert audience expectations.",
  
  "Paranoid Android": "Radiohead's song maintains aspects of conventional rock structure (a = 0.5) with negative abstraction (b = -1.7). Its shifting time signatures, dissonant harmonies, and fragmented sections disrupt listener expectations while maintaining recognizable elements.",
  
  "1984": "Orwell's novel employs conventional narrative techniques (a = 1.1) with strong negative abstraction (b = -2.3). Its dystopian setting, linguistic manipulation, and bleak conclusion create a disturbing vision that subverts expectations of narrative resolution.",
  
  "Damien Hirst's Shark": "'The Physical Impossibility of Death in the Mind of Someone Living' presents a conventional gallery object (a = 1.9) with negative abstraction (b = -1.3). Its preserved shark in formaldehyde confronts viewers with mortality while maintaining traditional presentation methods.",
  
  "Clockwork Orange": "Kubrick's film employs recognizable cinematic techniques (a = 0.9) with strong negative abstraction (b = -3.1). Its disturbing violence, invented slang, and moral ambiguity create a subversive viewing experience within recognizable narrative form.",
  
  "Weegee's Crime Photography": "These photographs function within journalistic conventions (a = 2.1) with light negative abstraction (b = -1.1). Their unflinching depiction of urban violence and death challenges comfortable viewing while maintaining documentary purpose.",
  
  "Panopticon Prison Design": "Bentham's architectural concept follows conventional institutional design principles (a = 1.7) with strong negative abstraction (b = -2.7). Its surveillance-based control mechanism creates psychological effects that subvert expectations of humane architecture.",
  
  "Breaking Bad": "This television series employs conventional narrative structure (a = 1.3) with negative abstraction (b = -2.1). Its protagonist's moral deterioration and the series' subversion of sympathetic identification create a viewing experience that challenges audience expectations.",
  
  "The Crucible": "Miller's play uses conventional dramatic structure (a = 1.4) with mild negative abstraction (b = -0.8). Its allegorical approach to McCarthyism through historical events creates subtle subversion within traditional theatrical form.",
  
  "Richard Serra's Tilted Arc": "This public sculpture maintained conventional materials and placement (a = 0.3) with negative abstraction (b = -1.2). Its imposing steel curve disrupted public space and provoked controversy by intentionally interfering with the functionality of Federal Plaza."
}; 