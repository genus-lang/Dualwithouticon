import { motion } from 'motion/react';
import { Code2, Home, Sword, BookOpen, LogOut, Bell, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';

interface ProfileHeaderProps {
  onNavigate: (page: 'home' | 'arena' | 'questions' | 'match' | 'announcements' | 'community') => void;
}

export function ProfileHeader({ onNavigate }: ProfileHeaderProps) {
  return (
    <header className="h-16 border-b border-[#00FFFF]/20 glassmorphism flex items-center justify-between px-6">
      {/* Left - Logo */}
      <motion.button
        onClick={() => onNavigate('home')}
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
        <span className="text-2xl">👤</span>
        <span 
          className="text-xl text-white"
          style={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
          }}
        >
          Profile Dashboard
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

      {/* Right - Navigation */}
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="text-white/60 hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onNavigate('match')}
            className="text-white/60 hover:text-[#A259FF] hover:bg-[#A259FF]/10"
          >
            <Sword className="w-4 h-4 mr-2" />
            Matches
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onNavigate('questions')}
            className="text-white/60 hover:text-[#00FF88] hover:bg-[#00FF88]/10"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Questions
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onNavigate('announcements')}
            className="text-white/60 hover:text-[#FFB86C] hover:bg-[#FFB86C]/10"
          >
            <Bell className="w-4 h-4 mr-2" />
            Announcements
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onNavigate('community')}
            className="text-white/60 hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Community
          </Button>
        </motion.div>

        <div className="h-6 w-px bg-white/20 mx-2" />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/60 hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
