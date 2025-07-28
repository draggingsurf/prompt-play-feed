import { useState } from "react";
import { cn } from "@/lib/utils";

interface GameTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const GameTabs = ({ tabs, activeTab, onTabChange }: GameTabsProps) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-secondary/50 rounded-full p-1 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
              activeTab === tab
                ? "bg-accent text-accent-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};