import { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Search, Settings, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface QuestionBankHeaderProps {
  onBack: () => void;
}

export function QuestionBankHeader({ onBack }: QuestionBankHeaderProps) {
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <header className="h-16 border-b border-[#00FFFF]/20 glassmorphism flex items-center justify-between px-6">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#A259FF] flex items-center justify-center">
            <Code2 className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col">
            <span 
              className="text-white"
              style={{ 
                fontFamily: 'Orbitron, sans-serif', 
                fontWeight: 700,
              }}
            >
              CodeArena
            </span>
          </div>
        </motion.button>

        <div className="h-8 w-px bg-white/20" />

        <div className="flex items-center gap-2">
          <span 
            className="text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
            }}
          >
            Problem Set 💾
          </span>
          <motion.div
            className="h-0.5 w-12 bg-gradient-to-r from-[#00FFFF] to-transparent"
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
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <motion.div
          className="relative"
          animate={{ width: searchExpanded ? '300px' : '200px' }}
          transition={{ duration: 0.3 }}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search problems by title or tag..."
            className="pl-10 bg-white/5 border-[#00FFFF]/20 text-white placeholder:text-white/40 h-10"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            onFocus={() => setSearchExpanded(true)}
            onBlur={() => setSearchExpanded(false)}
          />
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{
              boxShadow: searchExpanded
                ? '0 0 20px rgba(0, 255, 255, 0.3)'
                : '0 0 0px rgba(0, 255, 255, 0)',
            }}
          />
        </motion.div>

        {/* Filter Button */}
        <Button
          size="icon"
          variant="ghost"
          className="text-white/60 hover:text-[#00FFFF] hover:bg-[#00FFFF]/10 relative group"
        >
          <Settings className="w-5 h-5" />
          <motion.div
            className="absolute inset-0 rounded-lg border border-[#00FFFF] opacity-0 group-hover:opacity-100"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>

        {/* Profile */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <Avatar className="w-10 h-10 border-2 border-[#00FFFF] cursor-pointer">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div 
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00FF88] border-2 border-[#0A0F1C]"
            style={{ boxShadow: '0 0 8px #00FF88' }}
          />
        </motion.div>
      </div>
    </header>
  );
}