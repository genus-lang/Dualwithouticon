import { motion } from 'motion/react';
import { Sword, Trophy, Target, Clock } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
  delay: number;
}

function StatCard({ icon, value, label, color, delay }: StatCardProps) {
  return (
    <motion.div
      className="glassmorphism rounded-xl p-6 border relative overflow-hidden group"
      style={{ borderColor: `${color}30` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: `0 0 30px ${color}40`,
      }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}20` }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ color }}>
            {icon}
          </div>
        </motion.div>

        {/* Value with counter animation */}
        <motion.div
          className="text-3xl mb-2"
          style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            color,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {value}
        </motion.div>

        {/* Label */}
        <div 
          className="text-sm text-white/60"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {label}
        </div>
      </div>

      {/* Corner Accent */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 blur-2xl opacity-30"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}

export function StatsCards() {
  const stats = [
    {
      icon: <Sword className="w-6 h-6" />,
      value: 154,
      label: 'Matches Played',
      color: '#00FFFF',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: 92,
      label: 'Wins',
      color: '#FFB86C',
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: '87.3%',
      label: 'Accuracy',
      color: '#00FF88',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: '78 hrs',
      label: 'Total Time Coded',
      color: '#A259FF',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          color={stat.color}
          delay={i * 0.1}
        />
      ))}
    </div>
  );
}
