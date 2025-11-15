import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Timer, ExternalLink, Bell, Code2 } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { ReminderModal, ReminderSettings } from './ReminderModal';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

interface Contest {
  id: string;
  platform: string;
  platformColor: string;
  title: string;
  difficulty: string;
  difficultyColor: string;
  date: string;
  startTime: string;
  duration: string;
  link: string;
  targetDate: Date;
  isLive?: boolean;
}

interface ContestCardProps {
  contest: Contest;
  delay: number;
}

export function ContestCard({ contest, delay }: ContestCardProps) {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [hasReminder, setHasReminder] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleSaveReminder = (settings: ReminderSettings) => {
    setHasReminder(true);
    console.log('Reminder saved:', settings);
  };

  return (
    <>
      <motion.div
        className="glassmorphism rounded-xl p-6 border relative overflow-hidden group"
        style={{ borderColor: `${contest.platformColor}30` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ 
          scale: 1.02,
          y: -4,
        }}
      >
        {/* Animated Border Glow on Hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${contest.platformColor}20, transparent)`,
          }}
        />

        {/* Gradient Flow Animation */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${contest.platformColor}30, transparent)`,
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              {/* Platform Icon */}
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${contest.platformColor}20` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Code2 className="w-5 h-5" style={{ color: contest.platformColor }} />
              </motion.div>

              <div className="flex-1 min-w-0">
                {/* Platform Name */}
                <div className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {contest.platform}
                </div>
                {/* Contest Title */}
                <h3 
                  className="text-lg truncate"
                  style={{ 
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 700,
                    color: contest.platformColor,
                  }}
                >
                  {contest.title}
                </h3>
              </div>
            </div>

            {/* Difficulty Badge */}
            <Badge
              className="flex-shrink-0"
              style={{
                backgroundColor: `${contest.difficultyColor}20`,
                borderColor: contest.difficultyColor,
                color: contest.difficultyColor,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {contest.difficulty}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <DetailItem icon={<Calendar className="w-4 h-4" />} label="Date" value={contest.date} />
            <DetailItem icon={<Clock className="w-4 h-4" />} label="Start Time" value={contest.startTime} />
            <DetailItem icon={<Timer className="w-4 h-4" />} label="Duration" value={contest.duration} />
            <div className="col-span-2 md:col-span-1">
              <motion.a
                href={contest.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#00FFFF] hover:text-[#00FFFF]/80 group/link"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
                whileHover={{ x: 5 }}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="relative">
                  Participate
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-[#00FFFF]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.a>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-4 p-4 rounded-lg bg-black/20 border border-white/10">
            <CountdownTimer targetDate={contest.targetDate} isLive={contest.isLive} />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReminderModalOpen(true)}
                className="border-[#A259FF]/50 text-white hover:bg-[#A259FF]/10 hover:border-[#A259FF]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <Bell className="w-4 h-4 mr-2" />
                {hasReminder ? 'Update Reminder' : 'Add Reminder'}
              </Button>
            </motion.div>

            <div className="flex items-center gap-2">
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                className="data-[state=checked]:bg-[#00FFFF]"
              />
              <span 
                className="text-xs text-white/60"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Platform Notifications
              </span>
            </div>
          </div>

          {/* Reminder Active Indicator */}
          {hasReminder && (
            <motion.div
              className="mt-3 p-2 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Bell className="w-3 h-3 text-[#00FF88]" />
              <span className="text-xs text-[#00FF88]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Reminder set
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        contestName={`${contest.platform} - ${contest.title}`}
        onSave={handleSaveReminder}
      />
    </>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-white/40 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-white/40 mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {label}
        </div>
        <div className="text-sm text-white truncate" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {value}
        </div>
      </div>
    </div>
  );
}
