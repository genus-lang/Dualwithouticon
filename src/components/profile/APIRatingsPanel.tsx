import { motion } from 'motion/react';
import { TrendingUp, Star, Code2 } from 'lucide-react';
import { Badge } from '../ui/badge';

interface RatingCardProps {
  platform: string;
  handle: string;
  rating: number;
  change: number;
  rank?: string;
  solved?: number;
  stars?: number;
  color: string;
  delay: number;
}

function RatingCard({ platform, handle, rating, change, rank, solved, stars, color, delay }: RatingCardProps) {
  return (
    <motion.div
      className="glassmorphism rounded-xl p-6 border relative overflow-hidden flex-1"
      style={{ borderColor: `${color}30` }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Pulsing Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: delay,
        }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Platform & Handle */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div 
              className="text-lg mb-1"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                color: color,
              }}
            >
              {platform}
            </div>
            <div 
              className="text-sm text-white/60"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {handle}
            </div>
          </div>

          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Code2 className="w-6 h-6" style={{ color }} />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <motion.div 
            className="text-3xl mb-1"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              color: color,
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {rating}
          </motion.div>

          {/* Change Indicator */}
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1 px-2 py-0.5 rounded"
              style={{ 
                backgroundColor: change > 0 ? '#00FF8820' : '#FF008820',
                color: change > 0 ? '#00FF88' : '#FF0088',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.3 }}
            >
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {change > 0 ? '+' : ''}{change}
              </span>
            </motion.div>

            {rank && (
              <Badge
                variant="outline"
                className="text-xs border-white/20"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {rank}
              </Badge>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center gap-4 text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {solved !== undefined && (
            <div>
              <span className="text-white/80">{solved}</span> problems
            </div>
          )}
          {stars !== undefined && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 text-yellow-400"
                  fill={i < stars ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function APIRatingsPanel() {
  return (
    <div>
      {/* Section Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🌍</span>
          <h2 
            className="text-2xl text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
          >
            Platform Ratings
          </h2>
        </div>
        <p className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Live data fetched from Codeforces, LeetCode & CodeChef APIs (mock view)
        </p>
      </motion.div>

      {/* Rating Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RatingCard
          platform="Codeforces"
          handle="@meghram_cf"
          rating={1675}
          change={45}
          rank="Expert"
          color="#00FFFF"
          delay={0.2}
        />

        <RatingCard
          platform="LeetCode"
          handle="@meghram"
          rating={2021}
          change={12}
          solved={341}
          color="#FFB86C"
          delay={0.3}
        />

        <RatingCard
          platform="CodeChef"
          handle="@meghram_iiit"
          rating={1803}
          change={-8}
          rank="4★ Coder"
          stars={4}
          color="#A259FF"
          delay={0.4}
        />
      </div>
    </div>
  );
}
