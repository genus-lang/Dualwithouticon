import { motion } from 'motion/react';
import { Code2, Search, Bell, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface AnnouncementHeaderProps {
  onNavigateHome: () => void;
  hasNewNotifications?: boolean;
}

export function AnnouncementHeader({ onNavigateHome, hasNewNotifications = true }: AnnouncementHeaderProps) {
  return (
    <header className="h-16 border-b border-[#00FFFF]/20 glassmorphism flex items-center justify-between px-6">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-6">
        <motion.button
          onClick={onNavigateHome}
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

        <div className="hidden md:flex items-center gap-2">
          <span className="text-2xl">📢</span>
          <span 
            className="text-xl text-white"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
            }}
          >
            Announcements & Contests
          </span>
        </div>
      </div>

      {/* Right - Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search contests or platforms..."
            className="w-64 pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-[#00FFFF]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>

        {/* Notification Bell */}
        <motion.button
          className="relative w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center group hover:border-[#00FFFF]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5 text-white/80 group-hover:text-[#00FFFF]" />
          {hasNewNotifications && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF88] rounded-full border-2 border-[#0D0D0D]"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0 0 rgba(0, 255, 136, 0.7)',
                  '0 0 0 4px rgba(0, 255, 136, 0)',
                  '0 0 0 0 rgba(0, 255, 136, 0.7)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.button>

        {/* Profile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <Avatar className="w-10 h-10 border-2 border-[#00FFFF]/50 cursor-pointer">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=meghram" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </header>
  );
}
