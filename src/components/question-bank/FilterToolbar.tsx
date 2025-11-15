import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

interface FilterToolbarProps {
  onDifficultyChange?: (difficulty: Difficulty) => void;
  onTopicChange?: (topic: string) => void;
  onSortChange?: (sort: string) => void;
}

export function FilterToolbar({ onDifficultyChange, onTopicChange, onSortChange }: FilterToolbarProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');

  const difficulties: { value: Difficulty; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: '#00FFFF' },
    { value: 'easy', label: 'Easy', color: '#00FF88' },
    { value: 'medium', label: 'Medium', color: '#FFB86C' },
    { value: 'hard', label: 'Hard', color: '#FF0088' },
  ];

  const handleDifficultyClick = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    onDifficultyChange?.(difficulty);
  };

  return (
    <div className="glassmorphism border-b border-white/10 px-6 py-4">
      <div className="flex items-center gap-4 overflow-x-auto">
        {/* Difficulty Filters */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-white/60 mr-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Difficulty:
          </span>
          {difficulties.map((diff) => {
            const isActive = selectedDifficulty === diff.value;
            return (
              <motion.button
                key={diff.value}
                onClick={() => handleDifficultyClick(diff.value)}
                className="px-4 py-2 rounded-lg border text-sm relative overflow-hidden"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  borderColor: isActive ? diff.color : 'rgba(255, 255, 255, 0.1)',
                  color: isActive ? diff.color : 'rgba(255, 255, 255, 0.6)',
                  background: isActive ? `${diff.color}15` : 'rgba(255, 255, 255, 0.05)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {diff.label}
                
                {/* Glow Effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    style={{
                      boxShadow: `0 0 20px ${diff.color}`,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="h-8 w-px bg-white/20 flex-shrink-0" />

        {/* Topic Dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Topic:
          </span>
          <Select onValueChange={onTopicChange}>
            <SelectTrigger 
              className="w-48 h-10 bg-white/5 border-[#A259FF]/20 text-white"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              <SelectItem value="array">Arrays</SelectItem>
              <SelectItem value="string">Strings</SelectItem>
              <SelectItem value="linkedlist">Linked Lists</SelectItem>
              <SelectItem value="tree">Trees</SelectItem>
              <SelectItem value="graph">Graphs</SelectItem>
              <SelectItem value="dp">Dynamic Programming</SelectItem>
              <SelectItem value="recursion">Recursion</SelectItem>
              <SelectItem value="sorting">Sorting</SelectItem>
              <SelectItem value="searching">Searching</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-px bg-white/20 flex-shrink-0" />

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Sort By:
          </span>
          <Select onValueChange={onSortChange} defaultValue="newest">
            <SelectTrigger 
              className="w-48 h-10 bg-white/5 border-[#A259FF]/20 text-white"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="mostSolved">Most Solved</SelectItem>
              <SelectItem value="ratingHigh">Rating: High to Low</SelectItem>
              <SelectItem value="ratingLow">Rating: Low to High</SelectItem>
              <SelectItem value="titleAsc">Title: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
