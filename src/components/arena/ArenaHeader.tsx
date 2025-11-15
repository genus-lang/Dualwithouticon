import { useState, useEffect } from 'react';
import { Code2, Settings, LogOut, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface ArenaHeaderProps {
  onExit: () => void;
}

export function ArenaHeader({ onExit }: ArenaHeaderProps) {
  const [time, setTime] = useState(768); // 12:48 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addTime = () => {
    setTime((prev) => prev + 300); // Add 5 minutes
  };

  return (
    <header className="h-16 border-b border-[#00FFFF]/20 glassmorphism flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] flex items-center justify-center">
          <Code2 className="w-6 h-6 text-black" />
        </div>
        <span className="text-lg tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
          CodeArena
        </span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div 
            className="px-6 py-2 rounded-lg bg-[#0A0F1C] border border-[#00FFFF]/30"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: time < 60 ? '#FF0088' : '#00FFFF',
              textShadow: `0 0 20px ${time < 60 ? '#FF0088' : '#00FFFF'}`,
            }}
          >
            {formatTime(time)}
          </div>
          <Button
            size="sm"
            onClick={addTime}
            className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90 animate-pulse"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <Plus className="w-4 h-4 mr-1" />
            +5 min
          </Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Badge 
          className="bg-[#FF00FF]/20 text-[#FF00FF] border-[#FF00FF]/50"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Dual Mode
        </Badge>

        <div className="flex items-center gap-2">
          <Avatar className="w-9 h-9 border-2 border-[#00FFFF]">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="w-9 h-9 border-2 border-[#FF00FF]">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="text-white/60 hover:text-white hover:bg-white/5"
        >
          <Settings className="w-5 h-5" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={onExit}
          className="text-white/60 hover:text-[#FF0088] hover:bg-[#FF0088]/10"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
