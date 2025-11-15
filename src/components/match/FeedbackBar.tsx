import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export function FeedbackBar() {
  const passedTests = 3;
  const totalTests = 5;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-16 glassmorphism border-t border-[#00FF88]/30 z-20"
      style={{
        background: 'linear-gradient(to right, rgba(10, 15, 28, 0.95), rgba(16, 27, 46, 0.95))',
      }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        {/* Left - Test Results */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#00FF88]" />
            <div>
              <div 
                className="text-lg"
                style={{ 
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  color: '#00FF88',
                  textShadow: '0 0 10px #00FF88',
                }}
              >
                {passedTests} / {totalTests} Test Cases Passed ✅
              </div>
              <div className="text-xs text-white/60">
                Keep it up! {totalTests - passedTests} left to clear for victory!
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-2 ml-4">
            {[...Array(totalTests)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: i < passedTests ? '#00FF88' : '#FF0088',
                  boxShadow: `0 0 8px ${i < passedTests ? '#00FF88' : '#FF0088'}`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Right - AI Suggestion Bubble */}
        <motion.div
          className="flex items-center gap-3 glassmorphism px-4 py-2 rounded-lg border border-[#A259FF]/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-5 h-5 text-[#A259FF]" />
          </motion.div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00FFFF]" />
            <span className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              AI detected a quick fix for Test Case 3
            </span>
          </div>
        </motion.div>
      </div>

      {/* Animated Bottom Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, #00FFFF 0%, #A259FF 50%, #00FF88 100%)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
