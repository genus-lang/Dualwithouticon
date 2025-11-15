import { motion } from 'motion/react';
import { Activity, MessageCircle, Users } from 'lucide-react';

export function StatsPanel() {
  const stats = [
    { icon: Activity, label: 'Active Threads', value: '324', color: '#00FFFF' },
    { icon: MessageCircle, label: 'Replies Today', value: '1.2k', color: '#00FF88' },
    { icon: Users, label: 'Online Users', value: '183', color: '#A259FF' },
  ];

  return (
    <div className="glassmorphic border border-[#00FFFF]/10 rounded-xl p-5">
      {/* Header */}
      <h3 
        className="text-white mb-4"
        style={{ 
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
        }}
      >
        Discussion Stats
      </h3>

      {/* Stats List */}
      <div className="flex flex-col gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-black/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div className="flex-1">
              <div 
                className="text-xs text-white/60"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {stat.label}
              </div>
              <div 
                className="text-white"
                style={{ 
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
