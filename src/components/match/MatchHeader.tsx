import { useState, useEffect } from 'react';
import { Code2, LogOut, Trophy, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

interface MatchHeaderProps {
  onExit: () => void;
}

export function MatchHeader({ onExit }: MatchHeaderProps) {
  const [time, setTime] = useState(512); // 8:32 in seconds
  const totalTime = 900; // 15:00 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (time / totalTime) * 100;

  return (
    <header className="h-16 border-b border-[#00FFFF]/20 glassmorphism flex items-center justify-between px-6">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#A259FF] flex items-center justify-center">
            <Code2 className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
              CodeArena
            </span>
          </div>
        </div>

        <div className="h-8 w-px bg-white/20" />

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Room ID:</span>
          <span 
            className="text-sm text-[#00FF88] px-2 py-1 rounded bg-[#00FF88]/10 border border-[#00FF88]/30"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              textShadow: '0 0 10px #00FF88',
            }}
          >
            #4591-A
          </span>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={onExit}
          className="text-white/60 hover:text-[#FF0088] hover:bg-[#FF0088]/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Exit
        </Button>
      </div>

      {/* Center - Timer */}
      <div className="flex flex-col items-center gap-2 min-w-[280px]">
        <div className="flex items-center gap-3">
          <Badge 
            className="bg-[#A259FF]/20 text-[#A259FF] border-[#A259FF]/50 gap-1"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <Trophy className="w-3 h-3" />
            Friendly Spar
          </Badge>

          <div 
            className="px-4 py-1.5 rounded-lg bg-[#0A0F1C] border-2"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: time < 60 ? '#FF0088' : '#00FFFF',
              borderColor: time < 60 ? '#FF0088' : '#00FFFF',
              textShadow: `0 0 20px ${time < 60 ? '#FF0088' : '#00FFFF'}`,
            }}
          >
            ⏱️ {formatTime(time)} / {formatTime(totalTime)}
          </div>
        </div>

        <div className="w-full">
          <Progress 
            value={progress} 
            className="h-1.5 bg-white/10"
            style={{
              '--progress-background': 'linear-gradient(90deg, #00FFFF 0%, #A259FF 100%)',
            } as any}
          />
        </div>
      </div>

      {/* Right Side - Leaderboard Mini */}
      <div className="flex items-center gap-4">
        <div className="glassmorphism px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 border-2 border-[#00FFFF]">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=you" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs text-white/60">You</span>
              <span className="text-sm text-[#00FFFF]" style={{ fontWeight: 600 }}>
                60%
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/20" />

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/60">Opponent</span>
              <span className="text-sm text-[#A259FF]" style={{ fontWeight: 600 }}>
                45%
              </span>
            </div>
            <Avatar className="w-8 h-8 border-2 border-[#A259FF]">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=opponent" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Users className="w-5 h-5 text-white/40" />
      </div>
    </header>
  );
}
