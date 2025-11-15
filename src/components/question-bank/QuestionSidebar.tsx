import { motion } from 'motion/react';
import { Trophy, Clock, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function QuestionSidebar() {
  const topCoders = [
    { rank: 1, name: 'AlexDev', score: 2847, avatar: 'alex', streak: 45 },
    { rank: 2, name: 'SarahCode', score: 2691, avatar: 'sarah', streak: 32 },
    { rank: 3, name: 'MikeJS', score: 2543, avatar: 'mike', streak: 28 },
  ];

  const recentlySolved = [
    { user: 'You', problem: 'Binary Search Tree', time: '2m ago' },
    { user: 'AlexDev', problem: 'Graph Traversal', time: '5m ago' },
    { user: 'SarahCode', problem: 'Dynamic Programming', time: '12m ago' },
  ];

  const aiRecommended = [
    { title: 'Two Sum Problem', difficulty: 'easy' as const, match: 95 },
    { title: 'Merge Intervals', difficulty: 'medium' as const, match: 88 },
    { title: 'N-Queens', difficulty: 'hard' as const, match: 72 },
  ];

  return (
    <div className="w-80 space-y-6 flex-shrink-0">
      {/* Top Coders */}
      <motion.div
        className="glassmorphism rounded-lg border border-[#00FFFF]/20 p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-[#FFB86C]" />
          <h3 
            className="text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
          >
            Top Coders This Week
          </h3>
        </div>

        <div className="space-y-3">
          {topCoders.map((coder, i) => (
            <motion.div
              key={coder.rank}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: i === 0 
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    : i === 1
                    ? 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)'
                    : 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)',
                }}
              >
                <span className="text-black" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                  {coder.rank}
                </span>
              </div>

              <Avatar className="w-8 h-8 border-2 border-[#00FFFF]/30">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${coder.avatar}`} />
                <AvatarFallback>{coder.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate" style={{ fontWeight: 600 }}>
                  {coder.name}
                </div>
                <div className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {coder.score} pts
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#FFB86C]">
                <Zap className="w-3 h-3" fill="currentColor" />
                <span className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {coder.streak}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recently Solved */}
      <motion.div
        className="glassmorphism rounded-lg border border-[#A259FF]/20 p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#A259FF]" />
          <h3 
            className="text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
          >
            Recently Solved
          </h3>
        </div>

        <div className="space-y-3">
          {recentlySolved.map((activity, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-1 p-2 rounded-lg bg-white/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span 
                  className="text-sm text-[#A259FF]"
                  style={{ fontWeight: 600 }}
                >
                  {activity.user}
                </span>
                <span 
                  className="text-xs text-white/40"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {activity.time}
                </span>
              </div>
              <div 
                className="text-xs text-white/70"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {activity.problem}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommended */}
      <motion.div
        className="glassmorphism rounded-lg border border-[#00FF88]/20 p-4 relative overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'linear-gradient(0deg, transparent, #00FF88, transparent)',
              'linear-gradient(90deg, transparent, #00FF88, transparent)',
              'linear-gradient(180deg, transparent, #00FF88, transparent)',
              'linear-gradient(270deg, transparent, #00FF88, transparent)',
              'linear-gradient(0deg, transparent, #00FF88, transparent)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <div className="flex items-center gap-2 mb-4 relative z-10">
          <Zap className="w-5 h-5 text-[#00FF88]" />
          <h3 
            className="text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
          >
            AI Recommended
          </h3>
        </div>

        <div className="space-y-3 relative z-10">
          {aiRecommended.map((rec, i) => {
            const diffColors = {
              easy: '#00FF88',
              medium: '#FFB86C',
              hard: '#FF0088',
            };
            const color = diffColors[rec.difficulty];

            return (
              <motion.div
                key={i}
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span 
                    className="text-sm text-white flex-1"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
                  >
                    {rec.title}
                  </span>
                  <Badge
                    className="text-xs ml-2 border"
                    style={{
                      backgroundColor: `${color}20`,
                      borderColor: `${color}50`,
                      color: color,
                    }}
                  >
                    {rec.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#00FF88]"
                      initial={{ width: 0 }}
                      animate={{ width: `${rec.match}%` }}
                      transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                    />
                  </div>
                  <span 
                    className="text-xs text-[#00FF88]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {rec.match}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
