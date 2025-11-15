import { motion } from 'motion/react';
import { Trophy, Code2, Award, Clock } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'win' | 'solve' | 'badge';
  title: string;
  subtitle: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

function ActivityCard({ activity, delay }: { activity: ActivityItem; delay: number }) {
  return (
    <motion.div
      className="glassmorphism rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 5 }}
    >
      {/* Glow on Hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${activity.color}10, transparent)`,
        }}
      />

      <div className="flex items-start gap-4 relative z-10">
        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${activity.color}20` }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ color: activity.color }}>
            {activity.icon}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div 
            className="text-sm text-white mb-1"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
          >
            {activity.title}
          </div>
          <div 
            className="text-xs text-white/60 mb-2"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {activity.subtitle}
          </div>
          <div 
            className="text-xs flex items-center gap-1"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              color: activity.color,
            }}
          >
            <Clock className="w-3 h-3" />
            {activity.time}
          </div>
        </div>

        {/* Pulse Indicator */}
        <div className="flex-shrink-0">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: activity.color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ActivityFeed() {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'win',
      title: 'Won a match against @coderx',
      subtitle: 'Binary Tree Traversal (Hard)',
      time: '2 hours ago',
      icon: <Trophy className="w-5 h-5" />,
      color: '#FFB86C',
    },
    {
      id: 2,
      type: 'solve',
      title: 'Solved "Longest Common Subsequence"',
      subtitle: 'LeetCode • Dynamic Programming',
      time: '5 hours ago',
      icon: <Code2 className="w-5 h-5" />,
      color: '#00FFFF',
    },
    {
      id: 3,
      type: 'badge',
      title: 'New Badge Unlocked: Accuracy 90%+',
      subtitle: 'Maintained high accuracy across 20 matches',
      time: '1 day ago',
      icon: <Award className="w-5 h-5" />,
      color: '#00FF88',
    },
    {
      id: 4,
      type: 'win',
      title: 'Won a match against @sarah_codes',
      subtitle: 'Graph Shortest Path (Medium)',
      time: '1 day ago',
      icon: <Trophy className="w-5 h-5" />,
      color: '#FFB86C',
    },
    {
      id: 5,
      type: 'solve',
      title: 'Solved "Merge K Sorted Lists"',
      subtitle: 'CodeChef • Divide and Conquer',
      time: '2 days ago',
      icon: <Code2 className="w-5 h-5" />,
      color: '#00FFFF',
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕓</span>
          <h2 
            className="text-2xl text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
          >
            Recent Activity
          </h2>
        </div>
      </motion.div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity, i) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            delay={i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
