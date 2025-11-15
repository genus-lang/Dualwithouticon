import { Trophy, Target, Code } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion } from "motion/react";

interface HeroFilterBarProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
}

export function HeroFilterBar({ sortBy, setSortBy, activeFilter, setActiveFilter }: HeroFilterBarProps) {
  const filters = [
    { id: 'matches', icon: Trophy, label: 'Matches' },
    { id: 'accuracy', icon: Target, label: 'Accuracy' },
    { id: 'problems', icon: Code, label: 'Problems' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <motion.h2 
            className="text-4xl mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            Top Coders of the Week
          </motion.h2>
          <p className="text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Based on match performance and rating progression.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px] bg-black/60 border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition-colors">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-cyan-500/30">
              <SelectItem value="rating" className="text-cyan-300 focus:bg-cyan-500/20">Rating</SelectItem>
              <SelectItem value="problems" className="text-cyan-300 focus:bg-cyan-500/20">Problems Solved</SelectItem>
              <SelectItem value="accuracy" className="text-cyan-300 focus:bg-cyan-500/20">Accuracy</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    activeFilter === filter.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-black/40 border-cyan-500/30 text-gray-400 hover:border-cyan-400 hover:text-cyan-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={activeFilter === filter.id ? { boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' } : {}}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
