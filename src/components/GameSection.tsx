import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/GameCard";
import { ChevronRight } from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  badges: string[];
  tags: string[];
  featured?: boolean;
  genre: string;
}

interface GameSectionProps {
  title: string;
  emoji: string;
  games: Game[];
}

export const GameSection = ({ title, emoji, games }: GameSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          {title}
        </h2>
        <Button variant="ghost" className="text-accent hover:text-accent-foreground group">
          See More
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.slice(0, 6).map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            description={game.description}
            badges={game.badges}
            tags={game.tags}
            featured={game.featured}
            genre={game.genre}
          />
        ))}
      </div>
    </section>
  );
};