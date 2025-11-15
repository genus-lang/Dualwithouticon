import { useState } from 'react';
import { motion } from 'motion/react';
import { MatchHeader } from './match/MatchHeader';
import { ProblemPanel } from './match/ProblemPanel';
import { MatchEditor } from './match/MatchEditor';
import { TestPanel } from './match/TestPanel';
import { FeedbackBar } from './match/FeedbackBar';
import { MatchSummaryModal } from './match/MatchSummaryModal';

interface MatchPageProps {
  onExit: () => void;
}

export function MatchPage({ onExit }: MatchPageProps) {
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
    onExit();
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
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 25 }, () => 
                String.fromCharCode(33 + Math.floor(Math.random() * 94))
              ).join('')}
            </motion.div>
          ))}
        </div>

        {/* Circuit Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            top: '10%',
            left: '20%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #A259FF 0%, transparent 70%)',
            bottom: '10%',
            right: '20%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00FFFF]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <MatchHeader onExit={onExit} />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Problem Description */}
          <ProblemPanel />

          {/* Center - Code Editor */}
          <MatchEditor />

          {/* Right Panel - Test Cases */}
          <TestPanel />
        </div>

        {/* Bottom Feedback Bar */}
        <FeedbackBar />
      </div>

      {/* Match Summary Modal */}
      {showSummary && (
        <MatchSummaryModal
          isWinner={isWinner}
          onRematch={handleRematch}
          onReturnToLobby={handleReturnToLobby}
        />
      )}

      {/* Show Summary Button (for demo) */}
      <button
        onClick={() => setShowSummary(true)}
        className="fixed top-20 right-4 z-30 px-4 py-2 bg-[#A259FF]/20 text-[#A259FF] rounded-lg border border-[#A259FF]/30 text-xs"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        Show Summary (Demo)
      </button>
    </div>
  );
}
