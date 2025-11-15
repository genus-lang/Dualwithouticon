import { motion } from 'motion/react';
import { Code2, Bell, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

interface CommunityHeaderProps {
  onExit: () => void;
  onAskQuestion: () => void;
  hasNotifications?: boolean;
}

export function CommunityHeader({ onExit, onAskQuestion, hasNotifications = false }: CommunityHeaderProps) {
  return (
    <header className="h-16 border-b border-[#00FFFF]/20 glassmorphism flex items-center justify-between px-6">
      {/* Left - Logo */}
      <motion.button
        onClick={onExit}
        className="flex items-center gap-3 group"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#A259FF] flex items-center justify-center">
          <Code2 className="w-6 h-6 text-black" />
        </div>
        <span 
          className="text-white"
          style={{ 
            fontFamily: 'Orbitron, sans-serif', 
            fontWeight: 700,
          }}
        >
          CodeArena
        </span>
      </motion.button>

      {/* Center - Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">💬</span>
        <span 
          className="text-xl text-white"
          style={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
          }}
        >
          Community
        </span>
        <motion.div
          className="h-0.5 w-12 bg-gradient-to-r from-[#00FFFF] to-transparent ml-2"
          animate={{
            width: ['48px', '64px', '48px'],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <motion.button
          className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5 text-[#00FFFF]" />
          {hasNotifications && (
            <motion.div
              className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00FF88] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.button>

        {/* Ask Question Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            onClick={onAskQuestion}
            className="bg-gradient-to-r from-[#A259FF] to-[#9B51E0] hover:from-[#B269FF] hover:to-[#AC61F0] shadow-[0_0_20px_rgba(162,89,255,0.3)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
        </motion.div>

        {/* Profile Avatar */}
        <motion.div whileHover={{ scale: 1.1 }}>
          <Avatar className="w-9 h-9 ring-2 ring-[#00FFFF]/50 cursor-pointer">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=CodeArena" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </header>
  );
}
