import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Users, X } from 'lucide-react';

interface FloatingActionButtonProps {
  onStartCoding: () => void;
  onStartMatch: () => void;
}

export function FloatingActionButton({ onStartCoding, onStartMatch }: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartCoding = () => {
    setIsExpanded(false);
    onStartCoding();
  };

  const handleStartMatch = () => {
    setIsExpanded(false);
    onStartMatch();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Halo Glow Background - Only visible when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, rgba(162, 89, 255, 0.15) 50%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Expanded Menu Options */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-4">
            {/* Start Dual Coding Button */}
            <motion.button
              onClick={handleStartCoding}
              className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all"
              style={{
                backgroundColor: 'rgba(13, 13, 13, 0.85)',
                borderColor: 'rgba(0, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2)',
              }}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 12px 48px rgba(0, 255, 255, 0.4)',
              }}
            >
              {/* Glow Effect on Hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, transparent 100%)',
                }}
              />
              
              {/* Icon */}
              <div 
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(0, 255, 255, 0.15)',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                }}
              >
                <Code2 className="w-6 h-6 text-[#00FFFF]" />
                {/* Icon Pulse */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(0, 255, 255, 0.3)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>

              {/* Text */}
              <span 
                className="relative text-[#00FFFF] whitespace-nowrap"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                Start Dual Coding
              </span>
            </motion.button>

            {/* Friendly Match Button */}
            <motion.button
              onClick={handleStartMatch}
              className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all"
              style={{
                backgroundColor: 'rgba(13, 13, 13, 0.85)',
                borderColor: 'rgba(162, 89, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(162, 89, 255, 0.2)',
              }}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 12px 48px rgba(162, 89, 255, 0.4)',
              }}
            >
              {/* Glow Effect on Hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(162, 89, 255, 0.1) 0%, transparent 100%)',
                }}
              />
              
              {/* Icon */}
              <div 
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(162, 89, 255, 0.15)',
                  border: '1px solid rgba(162, 89, 255, 0.3)',
                }}
              >
                <Users className="w-6 h-6 text-[#A259FF]" />
                {/* Icon Pulse */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(162, 89, 255, 0.3)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
              </div>

              {/* Text */}
              <span 
                className="relative text-[#A259FF] whitespace-nowrap"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                Friendly Match
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={toggleExpand}
        className="relative w-16 h-16 rounded-full backdrop-blur-xl border flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: 'rgba(13, 13, 13, 0.9)',
          borderColor: isExpanded ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 255, 255, 0.3)',
          boxShadow: isExpanded 
            ? '0 0 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(162, 89, 255, 0.3)'
            : '0 8px 32px rgba(0, 255, 255, 0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isExpanded ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Rotating Gradient Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, rgba(0, 255, 255, 0.2), rgba(162, 89, 255, 0.2), rgba(0, 255, 255, 0.2))',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Cyber Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
          }}
        />

        {/* Logo / Icon */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <X className="w-7 h-7 text-[#00FFFF]" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              {/* Arena Triangular Logo */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main Triangle */}
                <path
                  d="M16 4L28 26H4L16 4Z"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  fill="rgba(0, 255, 255, 0.1)"
                />
                {/* Inner Lines */}
                <path
                  d="M16 10L22 22H10L16 10Z"
                  stroke="url(#gradient2)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* Center Dot */}
                <circle
                  cx="16"
                  cy="18"
                  r="2"
                  fill="url(#gradient3)"
                />
                
                <defs>
                  <linearGradient id="gradient1" x1="4" y1="4" x2="28" y2="26">
                    <stop offset="0%" stopColor="#00FFFF" />
                    <stop offset="100%" stopColor="#A259FF" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="10" y1="10" x2="22" y2="22">
                    <stop offset="0%" stopColor="#A259FF" />
                    <stop offset="100%" stopColor="#00FFFF" />
                  </linearGradient>
                  <radialGradient id="gradient3">
                    <stop offset="0%" stopColor="#00FFFF" />
                    <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.5" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: 'rgba(0, 255, 255, 0.4)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.button>
    </div>
  );
}
