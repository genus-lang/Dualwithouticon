import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { ProblemPanel } from './match/ProblemPanel';
import { MatchEditor } from './match/MatchEditor';
import { TestPanel } from './match/TestPanel';
import { FeedbackBar } from './match/FeedbackBar';
import { MatchSummaryModal } from './match/MatchSummaryModal';

interface NavigationProps {
  onStartCoding: () => void;
  onStartMatch: () => void;
  onQuestionBank: () => void;
  onProfile: () => void;
  onAnnouncements: () => void;
  onCommunity: () => void;
  onLeaderboard: () => void;
  onContests: () => void;
  onBlog: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onDocs: () => void;
  onSupport: () => void;
  onHome: () => void;
}

interface MatchPageProps {
  navigationProps: NavigationProps;
}

export function MatchPage({ navigationProps }: MatchPageProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [isWinner] = useState(true);

  // Simulate match end after 15 seconds for demo
  // useState(() => {
  //   const timer = setTimeout(() => {
  //     setShowSummary(true);
  //   }, 15000);
  //   return () => clearTimeout(timer);
  // });

  const handleRematch = () => {
    setShowSummary(false);
    // Reset match state
  };

  const handleReturnToLobby = () => {
    navigationProps.onStartMatch();
  };

  return (
    <div className="h-screen flex flex-col bg-[#0D0D0D] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Matrix Code Rain */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#00FFFF] text-xs"
              style={{
                left: `${(i * 2.5) % 100}%`,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              animate={{
                y: ['-100px', '100vh'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 15 }, () => 
                Math.random() > 0.5 ? '1' : '0'
              ).join('')}
            </motion.div>
          ))}
        </div>

        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(162, 89, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glowing Orbs - Purple Theme */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #A259FF 0%, transparent 70%)',
            top: '10%',
            left: '5%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #FF00FF 0%, transparent 70%)',
            bottom: '10%',
            right: '5%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <Navbar {...navigationProps} />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Problem Description */}
          <ProblemPanel />

          {/* Code Editor + Test Panel */}
          <div className="flex-1 flex flex-col">
            <MatchEditor />
            <TestPanel />
          </div>
        </div>

        {/* Bottom Feedback Bar */}
        <FeedbackBar />
      </div>

      {/* Match Summary Modal */}
      {showSummary && (
        <MatchSummaryModal
          isWinner={isWinner}
          onRematch={handleRematch}
          onExit={handleReturnToLobby}
        />
      )}

      {/* Floating Timer */}
      <motion.div
        className="fixed top-20 right-4 z-20 glassmorphism rounded-xl px-6 py-3 border border-[#A259FF]/30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          boxShadow: '0 0 30px rgba(162, 89, 255, 0.3)',
        }}
      >
        <div className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Time Remaining
        </div>
        <div className="text-2xl text-[#A259FF]" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
          08:32
        </div>
      </motion.div>
    </div>
  );
}