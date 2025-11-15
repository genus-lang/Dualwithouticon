import { motion } from 'motion/react';
import { Star, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function UserSummary() {
  const level = 12;
  const xp = 1240;
  const maxXp = 1900;
  const rating = 1823;
  const stars = 4; // out of 5

  return (
    <motion.div
      className="glassmorphism rounded-xl border border-[#00FFFF]/20 p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #00FFFF 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #A259FF 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, #00FFFF 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Particle Effects */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#00FFFF]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="flex items-start gap-8 relative z-10">
        {/* Avatar */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            {/* Animated Gradient Ring */}
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #00FFFF, #A259FF, #00FF88, #00FFFF)',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            
            <Avatar className="w-32 h-32 border-4 border-[#0D0D0D] relative">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=meghram" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>

            {/* Status Indicator */}
            <div 
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00FF88] border-4 border-[#0D0D0D]"
              style={{ boxShadow: '0 0 12px #00FF88' }}
            />
          </div>

          {/* Glow Ripple on Hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#00FFFF]"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          {/* Username & Name */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span 
                className="text-2xl text-[#00FFFF]"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                @meghram_meena
              </span>
              <Badge
                className="bg-gradient-to-r from-[#A259FF] to-[#00FFFF] text-white border-0"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                PRO
              </Badge>
            </div>
            <p className="text-lg text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Meghram Meena
            </p>
          </div>

          {/* Level Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  className="bg-[#FFB86C]/20 border-[#FFB86C] text-[#FFB86C]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Level {level}
                </Badge>
                <span className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  65% to next level
                </span>
              </div>
              <span className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                XP: {xp} / {maxXp}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#A259FF] to-[#00FFFF]"
                initial={{ width: 0 }}
                animate={{ width: `${(xp / maxXp) * 100}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Coding Rating */}
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Coding Rating
              </div>
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-3xl text-white"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {rating}
                </motion.span>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Zap className="w-6 h-6 text-[#FFB86C]" fill="currentColor" />
                </motion.div>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <div className="text-sm text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Performance
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star
                      className="w-5 h-5 text-yellow-400"
                      fill={i < stars ? 'currentColor' : 'none'}
                      style={{
                        filter: i < stars ? 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.5))' : 'none',
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
