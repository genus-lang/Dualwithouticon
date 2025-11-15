import { motion } from 'motion/react';
import { Trophy, Zap, Target, Clock, Code2, Award, Star, Lock } from 'lucide-react';
import { Progress } from '../ui/progress';

interface BadgeData {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  unlocked: boolean;
  color: string;
}

function BadgeCard({ badge, delay }: { badge: BadgeData; delay: number }) {
  return (
    <motion.div
      className="glassmorphism rounded-xl p-4 border relative overflow-hidden group cursor-pointer"
      style={{ 
        borderColor: badge.unlocked ? `${badge.color}30` : 'rgba(255, 255, 255, 0.1)',
        opacity: badge.unlocked ? 1 : 0.6,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: badge.unlocked ? 1 : 0.6, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
      }}
    >
      {/* Background Glow for Unlocked Badges */}
      {badge.unlocked && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${badge.color}20, transparent 70%)`,
          }}
        />
      )}

      {/* Holographic Scan Line on Hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        initial={{ y: '-100%' }}
        whileHover={{
          y: '100%',
        }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.3), transparent)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3 relative"
          style={{ 
            backgroundColor: badge.unlocked ? `${badge.color}20` : 'rgba(255, 255, 255, 0.05)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: badge.unlocked ? badge.color : 'rgba(255, 255, 255, 0.1)',
          }}
          animate={badge.unlocked ? {
            boxShadow: [
              `0 0 10px ${badge.color}40`,
              `0 0 20px ${badge.color}60`,
              `0 0 10px ${badge.color}40`,
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div style={{ color: badge.unlocked ? badge.color : 'rgba(255, 255, 255, 0.3)' }}>
            {badge.unlocked ? badge.icon : <Lock className="w-6 h-6" />}
          </div>

          {/* Pulsing Ring */}
          {badge.unlocked && (
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: badge.color }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        {/* Title */}
        <div 
          className="text-sm mb-1"
          style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 600,
            color: badge.unlocked ? 'white' : 'rgba(255, 255, 255, 0.4)',
          }}
        >
          {badge.title}
        </div>

        {/* Description */}
        <div 
          className="text-xs text-white/50"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {badge.description}
        </div>
      </div>
    </motion.div>
  );
}

export function AchievementsBadges() {
  const badges: BadgeData[] = [
    {
      id: 1,
      icon: <Trophy className="w-6 h-6" />,
      title: '100 Matches',
      description: 'Completed 100 challenges',
      unlocked: true,
      color: '#FFB86C',
    },
    {
      id: 2,
      icon: <Zap className="w-6 h-6" />,
      title: 'Speed Demon',
      description: 'Solved in under 5 mins',
      unlocked: true,
      color: '#00FFFF',
    },
    {
      id: 3,
      icon: <Target className="w-6 h-6" />,
      title: '90% Accuracy',
      description: 'Maintain 90% accuracy',
      unlocked: true,
      color: '#00FF88',
    },
    {
      id: 4,
      icon: <Clock className="w-6 h-6" />,
      title: '50 Hour Coder',
      description: 'Coded for 50+ hours',
      unlocked: true,
      color: '#A259FF',
    },
    {
      id: 5,
      icon: <Code2 className="w-6 h-6" />,
      title: 'AI Master',
      description: 'Used AI assistance wisely',
      unlocked: true,
      color: '#00FFFF',
    },
    {
      id: 6,
      icon: <Award className="w-6 h-6" />,
      title: 'Fastest Debugger',
      description: 'Debug 10 problems quickly',
      unlocked: true,
      color: '#FFB86C',
    },
    {
      id: 7,
      icon: <Star className="w-6 h-6" />,
      title: 'Perfect Score',
      description: 'Get 100% on 5 matches',
      unlocked: true,
      color: '#FF0088',
    },
    {
      id: 8,
      icon: <Trophy className="w-6 h-6" />,
      title: 'Contest Winner',
      description: 'Win a weekly contest',
      unlocked: false,
      color: '#00FF88',
    },
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;

  return (
    <div>
      {/* Section Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏅</span>
            <h2 
              className="text-2xl text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
            >
              Achievements & Badges
            </h2>
          </div>

          <div 
            className="text-sm text-white/60"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {unlockedCount}/{totalCount} unlocked
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#A259FF] to-[#00FFFF]"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, i) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            delay={i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
