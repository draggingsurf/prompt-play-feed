import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

const FILTER_OPTIONS = {
  genre: ["Platformer", "Shooter", "Racing", "Puzzle", "Card"],
  status: ["Live", "Beta", "Featured"],
  tags: ["AI", "Multiplayer", "Fast-paced", "Tactical", "Strategy", "Adventure", "Retro", "Sci-Fi", "Fantasy"]
};

interface FilterSectionProps {
  onFiltersChange: (filters: { genre: string[]; status: string[]; tags: string[] }) => void;
}

export const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [activeFilters, setActiveFilters] = useState({
    genre: [] as string[],
    status: [] as string[],
    tags: [] as string[]
  });

  const [openDropdowns, setOpenDropdowns] = useState({
    genre: false,
    status: false,
    tags: false
  });

  const toggleFilter = (type: keyof typeof activeFilters, value: string) => {
    const newFilters = { ...activeFilters };
    const currentFilters = newFilters[type];
    
    if (currentFilters.includes(value)) {
      newFilters[type] = currentFilters.filter(f => f !== value);
    } else {
      newFilters[type] = [...currentFilters, value];
    }
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleDropdown = (type: keyof typeof openDropdowns) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const renderFilterDropdown = (type: keyof typeof activeFilters, label: string, options: string[]) => {
    const isOpen = openDropdowns[type];
    const activeCount = activeFilters[type].length;

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(type)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
            ${activeCount > 0 
              ? 'border-neon-glow bg-neon-glow/10 text-neon-glow shadow-glow' 
              : 'border-border hover:border-neon-glow/50 text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <span className="text-sm font-medium">{label}</span>
          {activeCount > 0 && (
            <Badge variant="neon" className="text-xs px-1.5 py-0.5 min-w-5 h-5">
              {activeCount}
            </Badge>
          )}
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 min-w-48 max-h-64 overflow-y-auto">
            <div className="p-2 space-y-1">
              {options.map((option) => {
                const isActive = activeFilters[type].includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleFilter(type, option)}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200
                      ${isActive 
                        ? 'bg-neon-glow/20 text-neon-glow border border-neon-glow' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const clearAllFilters = () => {
    const emptyFilters = { genre: [], status: [], tags: [] };
    setActiveFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const totalActiveFilters = activeFilters.genre.length + activeFilters.status.length + activeFilters.tags.length;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        {renderFilterDropdown('genre', 'Genre', FILTER_OPTIONS.genre)}
        {renderFilterDropdown('status', 'Status', FILTER_OPTIONS.status)}
        {renderFilterDropdown('tags', 'Tags', FILTER_OPTIONS.tags)}
        
        {totalActiveFilters > 0 && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all ({totalActiveFilters})
          </button>
        )}
      </div>

      {/* Active filters display */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(activeFilters).map(([type, filters]) =>
            filters.map((filter) => (
              <Badge
                key={`${type}-${filter}`}
                variant="neon"
                className="cursor-pointer hover:bg-neon-glow/30 transition-colors"
                onClick={() => toggleFilter(type as keyof typeof activeFilters, filter)}
              >
                {filter} ×
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  );
};