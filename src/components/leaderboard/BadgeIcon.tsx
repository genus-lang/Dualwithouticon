import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface BadgeIconProps {
  type: 'gold' | 'silver' | 'bronze';
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeIcon({ type, size = 'md' }: BadgeIconProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8',
    lg: 'w-12 h-12 text-xl'
  };

  const badges = {
    gold: {
      emoji: '🥇',
      gradient: 'from-yellow-400 via-yellow-300 to-yellow-500',
      shadow: 'rgba(255, 215, 0, 0.5)',
      tooltip: 'Gold Badge — Elite Coder (Rating > 2000)'
    },
    silver: {
      emoji: '🥈',
      gradient: 'from-gray-300 via-gray-200 to-gray-400',
      shadow: 'rgba(192, 192, 192, 0.5)',
      tooltip: 'Silver Badge — Advanced Coder (1500-1999)'
    },
    bronze: {
      emoji: '🥉',
      gradient: 'from-orange-400 via-orange-300 to-orange-500',
      shadow: 'rgba(205, 127, 50, 0.5)',
      tooltip: 'Bronze Badge — Skilled Coder (1000-1499)'
    }
  };

  const badge = badges[type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gradient-to-br ${badge.gradient} cursor-pointer`}
            whileHover={{ 
              scale: 1.2,
              boxShadow: `0 0 20px ${badge.shadow}`
            }}
            animate={{
              boxShadow: [`0 0 5px ${badge.shadow}`, `0 0 15px ${badge.shadow}`, `0 0 5px ${badge.shadow}`]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>{badge.emoji}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-900 border-cyan-500/30 text-cyan-100">
          <p>{badge.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
