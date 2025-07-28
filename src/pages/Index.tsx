import { useState } from "react";
import { GameTabs } from "@/components/GameTabs";
import { GameSection } from "@/components/GameSection";
import { FilterSection } from "@/components/FilterSection";

const TABS = ["Latest", "Trending", "Hot", "Most Liked"];

const SAMPLE_GAMES = {
  platformer: [
    {
      id: "1",
      title: "Neon Dash",
      description: "Reflex-based neon runner where timing and movement unlock score multipliers.",
      badges: ["Live", "Gaming", "AI"],
      tags: ["Platformer", "AI", "Reflex"],
      featured: true,
      genre: "Platformer"
    },
    {
      id: "2", 
      title: "Crystal Caverns",
      description: "Navigate through mystical caves filled with precious gems and ancient traps.",
      badges: ["Live", "Adventure"],
      tags: ["Platformer", "Adventure", "Puzzle"],
      genre: "Platformer"
    },
    {
      id: "3",
      title: "Sky Bridge",
      description: "Build bridges across endless sky gaps while collecting power-ups.",
      badges: ["Beta", "Building"],
      tags: ["Platformer", "Building", "Strategy"],
      genre: "Platformer"
    },
    {
      id: "4",
      title: "Quantum Jump",
      description: "Phase through dimensions to solve mind-bending platform puzzles.",
      badges: ["Live", "Sci-Fi"],
      tags: ["Platformer", "Puzzle", "Sci-Fi"],
      genre: "Platformer"
    },
    {
      id: "5",
      title: "Forest Guardian",
      description: "Protect the magical forest from invaders using nature's power.",
      badges: ["Live", "Fantasy"],
      tags: ["Platformer", "Fantasy", "Action"],
      genre: "Platformer"
    },
    {
      id: "6",
      title: "Pixel Pioneer",
      description: "Retro-style platformer with modern physics and creative level design.",
      badges: ["Live", "Retro"],
      tags: ["Platformer", "Retro", "Pixel"],
      genre: "Platformer"
    }
  ],
  shooter: [
    {
      id: "7",
      title: "Cosmic Strike",
      description: "Fast-paced space combat with customizable ships and dynamic battlefields.",
      badges: ["Live", "Multiplayer"],
      tags: ["Shooter", "Space", "PvP"],
      featured: true,
      genre: "Shooter"
    },
    {
      id: "8",
      title: "Neural Defense",
      description: "Tower defense meets first-person shooting in cyberpunk landscapes.",
      badges: ["Beta", "Strategy"],
      tags: ["Shooter", "Tower Defense", "Cyberpunk"],
      genre: "Shooter"
    },
    {
      id: "9",
      title: "Void Hunter",
      description: "Hunt interdimensional creatures using energy weapons and tactical gear.",
      badges: ["Live", "Horror"],
      tags: ["Shooter", "Horror", "Tactical"],
      genre: "Shooter"
    },
    {
      id: "10",
      title: "Mech Battalion",
      description: "Control giant mechs in strategic combat scenarios.",
      badges: ["Live", "Strategy"],
      tags: ["Shooter", "Mech", "Strategy"],
      genre: "Shooter"
    },
    {
      id: "11",
      title: "Plasma Storm",
      description: "Survive waves of enemies in this intense bullet-hell experience.",
      badges: ["Live", "Survival"],
      tags: ["Shooter", "Bullet Hell", "Survival"],
      genre: "Shooter"
    },
    {
      id: "12",
      title: "Rebel Strike",
      description: "Lead the resistance against an oppressive regime in futuristic warfare.",
      badges: ["Live", "Story"],
      tags: ["Shooter", "Story", "Rebellion"],
      genre: "Shooter"
    }
  ],
  racing: [
    {
      id: "13",
      title: "Velocity Rush",
      description: "High-speed racing through neon-lit cityscapes with gravity-defying tracks.",
      badges: ["Live", "Arcade"],
      tags: ["Racing", "Arcade", "Futuristic"],
      featured: true,
      genre: "Racing"
    },
    {
      id: "14",
      title: "Desert Storm Rally",
      description: "Off-road racing through harsh desert terrain with realistic physics.",
      badges: ["Live", "Simulation"],
      tags: ["Racing", "Off-road", "Realistic"],
      genre: "Racing"
    },
    {
      id: "15",
      title: "Quantum Circuit",
      description: "Race through shifting dimensions where tracks change mid-race.",
      badges: ["Beta", "Sci-Fi"],
      tags: ["Racing", "Sci-Fi", "Dynamic"],
      genre: "Racing"
    },
    {
      id: "16",
      title: "Street Kings",
      description: "Urban street racing with customizable cars and underground circuits.",
      badges: ["Live", "Customization"],
      tags: ["Racing", "Street", "Custom"],
      genre: "Racing"
    },
    {
      id: "17",
      title: "Sky Racer",
      description: "Aerial racing through cloud formations and floating platforms.",
      badges: ["Live", "Flying"],
      tags: ["Racing", "Flying", "Aerial"],
      genre: "Racing"
    },
    {
      id: "18",
      title: "Time Trial Masters",
      description: "Perfect your racing lines through historically-inspired circuits.",
      badges: ["Live", "Historical"],
      tags: ["Racing", "Time Trial", "Classic"],
      genre: "Racing"
    }
  ],
  puzzle: [
    {
      id: "19",
      title: "Mind Matrix",
      description: "Connect neural pathways to solve complex pattern-based challenges.",
      badges: ["Live", "Brain Training"],
      tags: ["Puzzle", "Logic", "Neural"],
      featured: true,
      genre: "Puzzle"
    },
    {
      id: "20",
      title: "Quantum Blocks",
      description: "Manipulate quantum states to arrange blocks in impossible formations.",
      badges: ["Beta", "Physics"],
      tags: ["Puzzle", "Physics", "Quantum"],
      genre: "Puzzle"
    },
    {
      id: "21",
      title: "Color Symphony",
      description: "Create beautiful melodies by solving color-based musical puzzles.",
      badges: ["Live", "Music"],
      tags: ["Puzzle", "Music", "Art"],
      genre: "Puzzle"
    },
    {
      id: "22",
      title: "Maze Architect",
      description: "Design and solve procedurally generated mazes with unique mechanics.",
      badges: ["Live", "Builder"],
      tags: ["Puzzle", "Builder", "Procedural"],
      genre: "Puzzle"
    },
    {
      id: "23",
      title: "Crystal Resonance",
      description: "Align crystal frequencies to unlock ancient mysteries.",
      badges: ["Live", "Mystery"],
      tags: ["Puzzle", "Mystery", "Ancient"],
      genre: "Puzzle"
    },
    {
      id: "24",
      title: "Logic Gates",
      description: "Program your way through circuits and computational challenges.",
      badges: ["Live", "Programming"],
      tags: ["Puzzle", "Programming", "Logic"],
      genre: "Puzzle"
    }
  ],
  card: [
    {
      id: "25",
      title: "Mystic Legends TCG",
      description: "Collectible card battles featuring mythical creatures and spells.",
      badges: ["Live", "Collectible"],
      tags: ["Card", "TCG", "Fantasy"],
      featured: true,
      genre: "Card"
    },
    {
      id: "26",
      title: "Cyber Deck",
      description: "Build powerful card combinations in this cyberpunk-themed CCG.",
      badges: ["Beta", "Cyberpunk"],
      tags: ["Card", "CCG", "Cyberpunk"],
      genre: "Card"
    },
    {
      id: "27",
      title: "Stellar Conquest",
      description: "Conquer galaxies through strategic card deployment and resource management.",
      badges: ["Live", "Strategy"],
      tags: ["Card", "Strategy", "Space"],
      genre: "Card"
    },
    {
      id: "28",
      title: "Elemental Clash",
      description: "Master the four elements in fast-paced tactical card duels.",
      badges: ["Live", "Tactical"],
      tags: ["Card", "Tactical", "Elements"],
      genre: "Card"
    },
    {
      id: "29",
      title: "Rogue's Hand",
      description: "Dungeon crawling meets deck building in this roguelike adventure.",
      badges: ["Live", "Roguelike"],
      tags: ["Card", "Roguelike", "Dungeon"],
      genre: "Card"
    },
    {
      id: "30",
      title: "Memory Palace",
      description: "Train your memory through increasingly complex card matching games.",
      badges: ["Live", "Memory"],
      tags: ["Card", "Memory", "Training"],
      genre: "Card"
    }
  ]
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("Latest");
  const [filters, setFilters] = useState({
    genre: [] as string[],
    status: [] as string[],
    tags: [] as string[]
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="text-center pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative">
          🎮 Game Feed
          <div className="absolute inset-0 bg-gradient-neon opacity-20 blur-xl -z-10"></div>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          A real-time stream of playable games minted from prompts.
        </p>
      </div>

      {/* Tabs Navigation */}
      <GameTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Filter Section */}
      <FilterSection onFiltersChange={setFilters} />

      {/* Game Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <GameSection 
          title="Platformer Games" 
          emoji="🏃" 
          games={SAMPLE_GAMES.platformer} 
        />
        <GameSection 
          title="Shooter Games" 
          emoji="🔫" 
          games={SAMPLE_GAMES.shooter} 
        />
        <GameSection 
          title="Racing Games" 
          emoji="🏎️" 
          games={SAMPLE_GAMES.racing} 
        />
        <GameSection 
          title="Puzzle Games" 
          emoji="🧩" 
          games={SAMPLE_GAMES.puzzle} 
        />
        <GameSection 
          title="Card Games" 
          emoji="🃏" 
          games={SAMPLE_GAMES.card} 
        />
      </div>
    </div>
  );
};

export default Index;
