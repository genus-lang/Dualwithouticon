import { motion } from 'motion/react';
import { Flame, Clock } from 'lucide-react';

interface UpcomingEvent {
  id: string;
  name: string;
  timeLeft: string;
  isUrgent: boolean;
}

export function UpcomingWidget() {
  const events: UpcomingEvent[] = [
    {
      id: '1',
      name: 'LeetCode Weekly Contest 152',
      timeLeft: '3h 21m',
      isUrgent: true,
    },
    {
      id: '2',
      name: 'Codeforces Round #987 (Div. 2)',
      timeLeft: '12h',
      isUrgent: false,
    },
    {
      id: '3',
      name: 'AtCoder Beginner Contest 349',
      timeLeft: '1d 4h',
      isUrgent: false,
    },
    {
      id: '4',
      name: 'CodeChef Starters 112',
      timeLeft: '2d 8h',
      isUrgent: false,
    },
  ];

  return (
    <motion.div
      className="glassmorphism rounded-xl p-6 border border-[#00FFFF]/20 sticky top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Flame className="w-5 h-5 text-[#FFB86C]" />
        </motion.div>
        <h3 
          className="text-lg text-white"
          style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
        >
          Hot Upcoming Events
        </h3>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#00FFFF]/50 transition-all cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div 
                className="text-sm flex-1"
                style={{ 
                  fontFamily: 'JetBrains Mono, monospace',
                  color: event.isUrgent ? '#FFB86C' : 'white',
                }}
              >
                {event.name}
              </div>
              {event.isUrgent && (
                <motion.div
                  className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFB86C]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Clock className="w-3 h-3" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                in {event.timeLeft}
              </span>
            </div>

            {/* Pulse effect for urgent events */}
            {event.isUrgent && (
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255, 184, 108, 0)',
                    '0 0 0 4px rgba(255, 184, 108, 0.2)',
                    '0 0 0 0 rgba(255, 184, 108, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: '#00FFFF' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
