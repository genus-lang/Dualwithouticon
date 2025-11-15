import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

interface CTABannerProps {
  onStartCoding?: () => void;
  onStartMatch?: () => void;
}

export function CTABanner({ onStartCoding, onStartMatch }: CTABannerProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #00FF88 100%)',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, #0D0D0D 70%)',
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#00FFFF', '#FF00FF', '#00FF88'][Math.floor(Math.random() * 3)],
              boxShadow: `0 0 10px ${['#00FFFF', '#FF00FF', '#00FF88'][Math.floor(Math.random() * 3)]}`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glassmorphism border border-[#00FFFF]/30"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 255, 255, 0.3)',
                '0 0 40px rgba(0, 255, 255, 0.5)',
                '0 0 20px rgba(0, 255, 255, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#00FFFF]" />
            <span className="text-sm text-white/80">Join 10,000+ developers worldwide</span>
          </motion.div>

          <h2 
            className="mb-6 text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            Ready to Code with <br />
            <span className="neon-glow text-[#00FFFF]">the World?</span>
          </h2>

          <p className="mb-10 text-white/70 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            Join thousands of developers learning, competing, and growing together in real-time coding sessions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={onStartCoding}
              className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 shadow-[0_0_30px_rgba(0,255,255,0.5)] px-8"
              style={{ fontSize: '1.125rem' }}
            >
              Start Dual Coding
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="glassmorphism border-[#FF00FF]/30 text-white hover:border-[#FF00FF] hover:bg-[#FF00FF]/10 px-8"
              style={{ fontSize: '1.125rem' }}
            >
              Join Community
            </Button>
          </div>

          <motion.div
            className="mt-8 text-sm text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            No credit card required • Free to start • Cancel anytime
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
