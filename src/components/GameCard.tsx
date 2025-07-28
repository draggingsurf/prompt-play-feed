import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Info } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  badges: string[];
  tags: string[];
  featured?: boolean;
  genre: string;
}

export const GameCard = ({ title, description, badges, tags, featured, genre }: GameCardProps) => {
  return (
    <div className="group relative bg-gradient-card border border-border rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow">
      {featured && (
        <div className="absolute top-4 right-4">
          <Badge variant="neon" className="text-xs font-medium">
            ⭐ Featured
          </Badge>
        </div>
      )}
      
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-neon-glow transition-colors">
          🎮 {title}
        </h3>
        
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} variant="live" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        
        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="tag" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="tag" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" size="sm" className="flex-1">
            <Info className="w-3 h-3 mr-1" />
            Details
          </Button>
          <Button variant="game" size="sm" className="flex-1">
            <Play className="w-3 h-3 mr-1" />
            Play Now
          </Button>
        </div>
      </div>
    </div>
  );
};