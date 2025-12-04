import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Settings, Code2, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface MobileUtilityFABProps {
  onHome?: () => void;
  onProfile?: () => void;
  onSearch?: () => void;
  onSettings?: () => void;
}

export function MobileUtilityFAB({ 
  onHome, 
  onProfile, 
  onSearch, 
  onSettings 
}: MobileUtilityFABProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    {
      icon: Code2,
      label: 'Home',
      onClick: onHome,
      color: 'text-[#00FFFF]',
      position: { x: -70, y: -70 } // Top-left
    },
    {
      icon: Search,
      label: 'Search',
      onClick: onSearch,
      color: 'text-white',
      position: { x: 0, y: -80 } // Top
    },
    {
      icon: null, // Avatar
      label: 'Profile',
      onClick: onProfile,
      color: 'text-white',
      position: { x: 70, y: -70 } // Top-right
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: onSettings,
      color: 'text-white',
      position: { x: -80, y: 0 } // Left
    }
  ];

  const handleItemClick = (onClick?: () => void) => {
    onClick?.();
    setIsExpanded(false);
  };

  return (
    <div className="md:hidden fixed bottom-20 right-6 z-50">
      {/* Radial Menu Items */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: item.position.x,
                  y: item.position.y
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.05 
                }}
                onClick={() => handleItemClick(item.onClick)}
                className={`absolute bottom-0 right-0 w-12 h-12 glassmorphism border border-[#00FFFF]/30 rounded-full flex items-center justify-center ${item.color} hover:bg-[#00FFFF]/10 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.3)]`}
                aria-label={item.label}
              >
                {item.icon ? (
                  <item.icon className="w-5 h-5" />
                ) : (
                  <Avatar className="w-7 h-7 border-2 border-[#00FFFF] shadow-[0_0_8px_rgba(0,255,255,0.5)]">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback className="bg-[#00FFFF] text-black text-xs">U</AvatarFallback>
                  </Avatar>
                )}
              </motion.button>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-14 h-14 glassmorphism border-2 border-[#00FFFF] rounded-full flex items-center justify-center text-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] transition-all"
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop overlay when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
