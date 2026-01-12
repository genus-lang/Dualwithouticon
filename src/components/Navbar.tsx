import { useState } from 'react';
import { Code2, Menu, X, ChevronDown, Plus, Key } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface NavbarProps {
  onStartCoding?: () => void;
  onStartMatch?: () => void;
  onQuestionBank?: () => void;
  onProfile?: () => void;
  onAnnouncements?: () => void;
  onCommunity?: () => void;
  onLeaderboard?: () => void;
  onContests?: () => void;
  onBlog?: () => void;
  onPrivacy?: () => void;
  onTerms?: () => void;
  onDocs?: () => void;
  onSupport?: () => void;
  onHome?: () => void;
  onCreateRoom?: () => void;
  onJoinRoom?: () => void;
}

export function Navbar({ 
  onStartCoding, 
  onStartMatch, 
  onQuestionBank, 
  onProfile, 
  onAnnouncements, 
  onCommunity, 
  onLeaderboard, 
  onContests, 
  onBlog,
  onPrivacy,
  onTerms,
  onDocs,
  onSupport,
  onHome,
  onCreateRoom,
  onJoinRoom,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-[#00FFFF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable Brand Block */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={onHome}
                  className="flex items-center gap-2 group hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/50 rounded-md px-2 py-1"
                  aria-label="Go to Home"
                >
                  <Code2 className="w-8 h-8 text-[#00FFFF] group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all" />
                  <span className="text-xl tracking-wider group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Code<span className="text-[#00FFFF]">Arena</span>
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/30">
                <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>Go to Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={onContests}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Contests
            </button>
            <button 
              onClick={onQuestionBank}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Problem Set
            </button>
            <button 
              onClick={onLeaderboard}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Leaderboard
            </button>
            <button 
              onClick={onCommunity}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Community
            </button>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="flex items-center gap-1 text-white/80 hover:text-[#00FFFF] transition-colors focus:outline-none"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/20 min-w-[200px]"
              >
                <DropdownMenuItem 
                  onClick={onBlog}
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  📰 Blog
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  💡 How It Works
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onDocs}
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  📚 Documentation
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onSupport}
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  🆘 Support
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={onPrivacy}
                  className="text-white/70 hover:bg-[#00FFFF]/10 cursor-pointer text-sm"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Privacy Policy
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onTerms}
                  className="text-white/70 hover:bg-[#00FFFF]/10 cursor-pointer text-sm"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Terms of Service
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onAnnouncements}
                  className="text-white/70 hover:bg-[#00FFFF]/10 cursor-pointer text-sm"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Announcements
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop - Avatar Only */}
          <div className="hidden md:flex items-center gap-3">
            {/* Join Room Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onJoinRoom}
                    variant="outline"
                    className="border-[#9333EA]/40 text-[#9333EA] hover:bg-[#9333EA]/10 hover:border-[#9333EA]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Join Room
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/30">
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>Join an existing room</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Create Room Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onCreateRoom}
                    variant="outline"
                    className="border-[#00FFFF]/40 text-[#00FFFF] hover:bg-[#00FFFF]/10 hover:border-[#00FFFF]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Room
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/30">
                  <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>Create a custom match room</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="w-9 h-9 border-2 border-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback className="bg-[#00FFFF] text-black">U</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-[#00FFFF]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1A1A1A]/95 backdrop-blur-xl border-[#00FFFF]/20 min-w-[200px]">
                <DropdownMenuItem 
                  onClick={onProfile}
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  👤 Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  ⚙️ Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  🚪 Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-[#00FFFF]/20">
            {/* Room Action Buttons - Mobile */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onJoinRoom}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#9333EA]/10 border border-[#9333EA]/40 text-[#9333EA] rounded-lg hover:bg-[#9333EA]/20 transition-colors"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <Key className="w-4 h-4" />
                Join Room
              </button>
              <button
                onClick={onCreateRoom}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] rounded-lg hover:bg-[#00FFFF]/20 transition-colors"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <Plus className="w-4 h-4" />
                Create Room
              </button>
            </div>

            <div className="h-px bg-white/10 my-2" />

            <button 
              onClick={onContests}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors px-2 py-2"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Contests
            </button>
            <button 
              onClick={onQuestionBank}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors px-2 py-2"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Problem Set
            </button>
            <button 
              onClick={onLeaderboard}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors px-2 py-2"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Leaderboard
            </button>
            <button 
              onClick={onCommunity}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors px-2 py-2"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Community
            </button>
            
            <div className="h-px bg-white/10 my-2" />
            
            <button 
              onClick={onBlog}
              className="block w-full text-left text-white/60 hover:text-[#00FFFF] transition-colors px-2 py-2 text-sm"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              📰 Blog
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="block w-full text-left text-white/60 hover:text-[#00FFFF] transition-colors px-2 py-2 text-sm"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              💡 How It Works
            </button>
            <button 
              onClick={onDocs}
              className="block w-full text-left text-white/60 hover:text-[#00FFFF] transition-colors px-2 py-2 text-sm"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              📚 Documentation
            </button>
            <button 
              onClick={onSupport}
              className="block w-full text-left text-white/60 hover:text-[#00FFFF] transition-colors px-2 py-2 text-sm"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              🆘 Support
            </button>
            
            <div className="h-px bg-white/10 my-2" />
            
            <button 
              onClick={onProfile}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors px-2 py-2"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              👤 Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}