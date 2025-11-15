import { useState } from 'react';
import { Code2, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface NavbarProps {
  onStartCoding?: () => void;
  onStartMatch?: () => void;
  onQuestionBank?: () => void;
  onProfile?: () => void;
  onAnnouncements?: () => void;
  onCommunity?: () => void;
  onLeaderboard?: () => void;
}

export function Navbar({ onStartCoding, onStartMatch, onQuestionBank, onProfile, onAnnouncements, onCommunity, onLeaderboard }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-[#00FFFF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-[#00FFFF]" />
            <span className="text-xl tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Code<span className="text-[#00FFFF]">Arena</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-white/80 hover:text-[#00FFFF] transition-colors">
              How It Works
            </a>
            <button 
              onClick={onQuestionBank}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Question Bank
            </button>
            <button 
              onClick={onLeaderboard}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Leaderboard
            </button>
            <button 
              onClick={onAnnouncements}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Announcements
            </button>
            <button 
              onClick={onCommunity}
              className="text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Community
            </button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="default" 
              onClick={onStartCoding}
              className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              Start Dual Coding
            </Button>
            <Button 
              variant="outline"
              onClick={onStartMatch}
              className="glassmorphism border-[#A259FF]/30 text-white hover:border-[#A259FF] hover:bg-[#A259FF]/10"
            >
              Friendly Match
            </Button>
            
            {/* Avatar Dropdown */}
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
              <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[#00FFFF]/20 min-w-[200px]">
                <DropdownMenuItem 
                  onClick={onProfile}
                  className="text-white hover:bg-[#00FFFF]/10 cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-[#00FFFF]/10 cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-[#00FFFF]/10 cursor-pointer">
                  Logout
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
          <div className="md:hidden py-4 space-y-4 border-t border-[#00FFFF]/20">
            <a href="#how-it-works" className="block text-white/80 hover:text-[#00FFFF] transition-colors">
              How It Works
            </a>
            <button 
              onClick={onQuestionBank}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Question Bank
            </button>
            <button 
              onClick={onLeaderboard}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Leaderboard
            </button>
            <button 
              onClick={onAnnouncements}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Announcements
            </button>
            <button 
              onClick={onCommunity}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Community
            </button>
            <button 
              onClick={onProfile}
              className="block w-full text-left text-white/80 hover:text-[#00FFFF] transition-colors"
            >
              Profile
            </button>
            <div className="flex flex-col gap-3 pt-4">
              <Button 
                variant="default"
                onClick={onStartCoding}
                className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 w-full"
              >
                Start Dual Coding
              </Button>
              <Button 
                variant="outline"
                onClick={onStartMatch}
                className="glassmorphism border-[#A259FF]/30 text-white w-full"
              >
                Friendly Match
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
