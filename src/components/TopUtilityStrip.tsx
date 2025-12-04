import { Search, Settings, Code2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface TopUtilityStripProps {
  onHome?: () => void;
  onProfile?: () => void;
  onSearch?: () => void;
  onSettings?: () => void;
}

export function TopUtilityStrip({ 
  onHome, 
  onProfile, 
  onSearch, 
  onSettings 
}: TopUtilityStripProps) {
  return (
    <div className="fixed top-4 right-6 z-40 hidden md:flex items-center gap-3 glassmorphism border border-[#00FFFF]/20 rounded-full px-4 py-2 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
      <TooltipProvider>
        {/* Dimmed CodeArena Logo - Home */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onHome}
              className="text-[#00FFFF]/40 hover:text-[#00FFFF]/80 transition-all hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 rounded-full p-1.5"
              aria-label="Go to Home"
            >
              <Code2 className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/30">
            <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>Go to Home</p>
          </TooltipContent>
        </Tooltip>

        {/* Search Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onSearch}
              className="text-white/60 hover:text-[#00FFFF] transition-all hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 rounded-full p-1.5"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/30">
            <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>Search</p>
          </TooltipContent>
        </Tooltip>

        {/* Profile Avatar */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onProfile}
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 rounded-full"
              aria-label="Profile"
            >
              <Avatar className="w-7 h-7 border-2 border-[#00FFFF]/60 shadow-[0_0_8px_rgba(0,255,255,0.4)]">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback className="bg-[#00FFFF] text-black text-xs">U</AvatarFallback>
              </Avatar>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/30">
            <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>Profile</p>
          </TooltipContent>
        </Tooltip>

        {/* Settings/Filter Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onSettings}
              className="text-white/60 hover:text-[#00FFFF] transition-all hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 rounded-full p-1.5"
              aria-label="Leaderboard Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/30">
            <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>Leaderboard Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
