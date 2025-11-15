import { motion } from 'motion/react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';

interface PlatformFilterProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function PlatformFilter({ selectedPlatform, onPlatformChange, sortBy, onSortChange }: PlatformFilterProps) {
  const platforms = [
    { id: 'all', name: 'All', hasNew: true },
    { id: 'codeforces', name: 'Codeforces', hasNew: true },
    { id: 'leetcode', name: 'LeetCode', hasNew: false },
    { id: 'codechef', name: 'CodeChef', hasNew: true },
    { id: 'atcoder', name: 'AtCoder', hasNew: false },
    { id: 'hackerrank', name: 'HackerRank', hasNew: false },
  ];

  return (
    <div className="glassmorphism border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Platform Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => onPlatformChange(platform.id)}
              className="relative px-4 py-2 rounded-full border transition-all"
              style={{
                borderColor: selectedPlatform === platform.id ? '#00FFFF' : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: selectedPlatform === platform.id ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient flow animation for active */}
              {selectedPlatform === platform.id && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}

              <span
                className="relative z-10 text-sm"
                style={{
                  color: selectedPlatform === platform.id ? '#00FFFF' : 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {platform.name}
              </span>

              {/* New badge */}
              {platform.hasNew && (
                <motion.span
                  className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full bg-[#00FF88] text-black"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  🔔
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger 
              className="w-32 bg-white/5 border-white/20 text-white hover:border-[#00FFFF]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/20">
              <SelectItem value="upcoming" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Upcoming
              </SelectItem>
              <SelectItem value="live" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Live
              </SelectItem>
              <SelectItem value="past" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Past
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Calendar Icon */}
          <motion.button
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center hover:border-[#A259FF]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-5 h-5 text-white/80" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
