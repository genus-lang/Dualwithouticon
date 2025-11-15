import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Trophy } from 'lucide-react';

interface Contributor {
  username: string;
  avatar: string;
  xp: number;
  rank: number;
}

const topContributors: Contributor[] = [
  { username: 'meghram_meena', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meghram', xp: 1823, rank: 1 },
  { username: 'code_ninja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja', xp: 1654, rank: 2 },
  { username: 'algo_master', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=algo', xp: 1432, rank: 3 },
  { username: 'debug_queen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=queen', xp: 1287, rank: 4 },
  { username: 'python_pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=python', xp: 1156, rank: 5 },
];

export function TopContributorCard() {
  return (
    <div className="glassmorphic border border-[#00FFFF]/10 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-[#FFB86C]" />
        <h3 
          className="text-white"
          style={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
          }}
        >
          Top Coders This Week
        </h3>
      </div>

      {/* Contributors List */}
      <div className="flex flex-col gap-2">
        {topContributors.map((contributor, index) => (
          <motion.div
            key={contributor.username}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.button
              className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
              whileHover={{ x: 4 }}
            >
              {/* Rank Badge */}
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  contributor.rank === 1 
                    ? 'bg-[#FFB86C] text-black' 
                    : contributor.rank === 2 
                    ? 'bg-[#00FFFF]/20 text-[#00FFFF]' 
                    : contributor.rank === 3
                    ? 'bg-[#A259FF]/20 text-[#A259FF]'
                    : 'bg-white/5 text-white/40'
                }`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {contributor.rank}
              </div>

              {/* Avatar */}
              <Avatar className="w-8 h-8 ring-1 ring-[#00FFFF]/30">
                <AvatarImage src={contributor.avatar} />
                <AvatarFallback>{contributor.username[0]}</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0 text-left">
                <div 
                  className="text-sm text-white group-hover:text-[#00FFFF] transition-colors truncate"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  @{contributor.username}
                </div>
                <div 
                  className="text-xs text-white/40 flex items-center gap-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {contributor.xp} XP
                  <span className="text-[#00FF88]">⚡</span>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
