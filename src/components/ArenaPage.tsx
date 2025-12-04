import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { CodeEditor } from './arena/CodeEditor';
import { AIPanel } from './arena/AIPanel';
import { ChatPanel } from './arena/ChatPanel';
import { IOConsole } from './arena/IOConsole';

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

interface ArenaPageProps {
  navigationProps: NavigationProps;
}

export function ArenaPage({ navigationProps }: ArenaPageProps) {
  const [activeEditor, setActiveEditor] = useState<'left' | 'right'>('left');

  // Switch active editor every 10 seconds for demo
  useState(() => {
    const interval = setInterval(() => {
      setActiveEditor(prev => prev === 'left' ? 'right' : 'left');
    }, 10000);
    return () => clearInterval(interval);
  });

  return (
    <div className="h-screen flex flex-col bg-[#0D0D0D] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Matrix Code Rain */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#00FFFF] text-xs"
              style={{
                left: `${(i * 3.33) % 100}%`,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              animate={{
                y: ['-100px', '100vh'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 20 }, () => 
                String.fromCharCode(33 + Math.floor(Math.random() * 94))
              ).join('')}
            </motion.div>
          ))}
        </div>

        {/* Circuit Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            top: '20%',
            left: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #FF00FF 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <Navbar {...navigationProps} />

        {/* Main Arena */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Sidebar */}
          <ChatPanel />

          {/* Code Editors */}
          <div className="flex-1 flex">
            <CodeEditor
              side="left"
              userName="AlexDev"
              userColor="#00FFFF"
              isActive={activeEditor === 'left'}
            />
            <CodeEditor
              side="right"
              userName="SarahCode"
              userColor="#FF00FF"
              isActive={activeEditor === 'right'}
            />
          </div>

          {/* AI Assistant */}
          <AIPanel />
        </div>

        {/* Console */}
        <IOConsole />
      </div>

      {/* Floating Stats (Optional) */}
      <motion.div
        className="fixed bottom-24 right-4 z-20 glassmorphism rounded-xl p-4 border border-[#00FFFF]/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-xs text-white/60 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Session Stats
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-white/40">Lines Written</div>
            <div className="text-lg text-[#00FFFF]" style={{ fontWeight: 700 }}>247</div>
          </div>
          <div>
            <div className="text-xs text-white/40">Accuracy</div>
            <div className="text-lg text-[#00FF88]" style={{ fontWeight: 700 }}>94%</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}