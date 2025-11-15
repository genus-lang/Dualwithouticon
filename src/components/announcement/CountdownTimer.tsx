import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CountdownTimerProps {
  targetDate: Date;
  isLive?: boolean;
}

export function CountdownTimer({ targetDate, isLive = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isLive) {
    return (
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 bg-[#00FF88]/20"
        style={{ borderColor: '#00FF88' }}
        animate={{
          borderColor: ['#00FF88', '#00FFFF', '#00FF88'],
          boxShadow: [
            '0 0 10px rgba(0, 255, 136, 0.5)',
            '0 0 20px rgba(0, 255, 255, 0.5)',
            '0 0 10px rgba(0, 255, 136, 0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <span 
          className="text-lg"
          style={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
            color: '#00FF88',
          }}
        >
          Live Now ⚡
        </span>
      </motion.div>
    );
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 1;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-white/60 mr-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        ⏱️
      </span>
      
      {timeLeft.days > 0 && (
        <TimeBlock value={timeLeft.days} label="d" isUrgent={isUrgent} />
      )}
      <TimeBlock value={timeLeft.hours} label="h" isUrgent={isUrgent} />
      <span className="text-white/40">:</span>
      <TimeBlock value={timeLeft.minutes} label="m" isUrgent={isUrgent} />
      <span className="text-white/40">:</span>
      <TimeBlock value={timeLeft.seconds} label="s" isUrgent={isUrgent} />
    </div>
  );
}

interface TimeBlockProps {
  value: number;
  label: string;
  isUrgent: boolean;
}

function TimeBlock({ value, label, isUrgent }: TimeBlockProps) {
  return (
    <motion.div
      className="flex flex-col items-center min-w-[40px]"
      animate={isUrgent ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    >
      <span 
        className="text-2xl tabular-nums"
        style={{ 
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
          color: isUrgent ? '#FFB86C' : '#00FFFF',
          textShadow: isUrgent 
            ? '0 0 10px rgba(255, 184, 108, 0.5)' 
            : '0 0 10px rgba(0, 255, 255, 0.5)',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span 
        className="text-xs text-white/40"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
