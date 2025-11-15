import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Users, Zap, Trophy, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onStartCoding?: () => void;
  onStartMatch?: () => void;
}

export function HeroSection({ onStartCoding, onStartMatch }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Neon Rain Effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#00FFFF] to-transparent"
              style={{
                left: `${(i * 5) % 100}%`,
                height: '200px',
              }}
              animate={{
                y: ['-200px', '100vh'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Radial Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="mb-6 text-white"
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            lineHeight: 1.1
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Code Together.{' '}
          <span className="neon-glow text-[#00FFFF]">Compete.</span>{' '}
          Learn.
        </motion.h1>

        <motion.p
          className="mb-12 text-white/70 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Auto-pair, run code instantly, and get AI help — all in one room.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            size="lg"
            onClick={onStartCoding}
            className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 shadow-[0_0_30px_rgba(0,255,255,0.5)] px-8"
          >
            Start Dual Coding
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={onStartMatch}
            className="glassmorphism border-[#A259FF]/30 text-white hover:border-[#A259FF] hover:bg-[#A259FF]/10 px-8"
          >
            Friendly Match
          </Button>
          <Button 
            size="lg"
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/5 px-8"
          >
            Join Community
          </Button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <StatItem
            icon={<Users className="w-6 h-6" />}
            label="Coders Online"
            value="1,248"
          />
          <StatItem
            icon={<Zap className="w-6 h-6" />}
            label="Matches Today"
            value="327"
          />
          <StatItem
            icon={<Trophy className="w-6 h-6" />}
            label="Active Rooms"
            value="82"
          />
          <StatItem
            icon={<Calendar className="w-6 h-6" />}
            label="Upcoming Contests"
            value="3"
          />
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glassmorphism rounded-2xl p-4 border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
      <div className="flex items-center justify-center gap-2 mb-2 text-[#00FFFF]">
        {icon}
      </div>
      <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>{value}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}
