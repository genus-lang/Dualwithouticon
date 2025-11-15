import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Mail, MessageSquare, Check } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestName: string;
  onSave: (reminder: ReminderSettings) => void;
}

export interface ReminderSettings {
  time: string;
  method: string;
}

export function ReminderModal({ isOpen, onClose, contestName, onSave }: ReminderModalProps) {
  const [reminderTime, setReminderTime] = useState('30min');
  const [notificationMethod, setNotificationMethod] = useState('popup');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave({ time: reminderTime, method: notificationMethod });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div 
              className="glassmorphism rounded-xl border-2 p-6 relative overflow-hidden"
              style={{ borderColor: '#00FFFF' }}
            >
              {/* Animated Border Glow */}
              <motion.div
                className="absolute inset-0 opacity-30 pointer-events-none"
                animate={{
                  background: [
                    'linear-gradient(0deg, #00FFFF 0%, transparent 50%)',
                    'linear-gradient(90deg, #00FFFF 0%, transparent 50%)',
                    'linear-gradient(180deg, #00FFFF 0%, transparent 50%)',
                    'linear-gradient(270deg, #00FFFF 0%, transparent 50%)',
                    'linear-gradient(0deg, #00FFFF 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#00FFFF]" />
                    <h2 
                      className="text-xl text-white"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Set Contest Reminder
                    </h2>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-white/80" />
                  </motion.button>
                </div>

                {/* Contest Name */}
                <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Contest
                  </div>
                  <div className="text-sm text-[#00FFFF]" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                    {contestName}
                  </div>
                </div>

                {/* Reminder Time */}
                <div className="mb-6">
                  <label className="block text-sm text-white/80 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Remind me before
                  </label>
                  <Select value={reminderTime} onValueChange={setReminderTime}>
                    <SelectTrigger 
                      className="w-full bg-white/5 border-white/20 text-white hover:border-[#00FFFF]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/20">
                      <SelectItem value="10min" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        10 minutes
                      </SelectItem>
                      <SelectItem value="30min" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        30 minutes
                      </SelectItem>
                      <SelectItem value="1hour" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        1 hour
                      </SelectItem>
                      <SelectItem value="1day" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        1 day
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notification Method */}
                <div className="mb-6">
                  <label className="block text-sm text-white/80 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Notification type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <NotificationMethodButton
                      icon={<Bell className="w-4 h-4" />}
                      label="Popup"
                      value="popup"
                      selected={notificationMethod === 'popup'}
                      onClick={() => setNotificationMethod('popup')}
                    />
                    <NotificationMethodButton
                      icon={<Mail className="w-4 h-4" />}
                      label="Email"
                      value="email"
                      selected={notificationMethod === 'email'}
                      onClick={() => setNotificationMethod('email')}
                    />
                    <NotificationMethodButton
                      icon={<MessageSquare className="w-4 h-4" />}
                      label="Discord"
                      value="discord"
                      selected={notificationMethod === 'discord'}
                      onClick={() => setNotificationMethod('discord')}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Cancel
                  </Button>
                  <motion.div className="flex-1">
                    <Button
                      onClick={handleSave}
                      disabled={saved}
                      className="w-full bg-gradient-to-r from-[#00FF88] to-[#00FFFF] text-black hover:opacity-90"
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
                    >
                      {saved ? (
                        <span className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Saved!
                        </span>
                      ) : (
                        'Save Reminder'
                      )}
                    </Button>
                  </motion.div>
                </div>

                {/* Success Animation */}
                <AnimatePresence>
                  {saved && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-[#00FF88]"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 1.5 }}
                        style={{ opacity: 0.3 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface NotificationMethodButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}

function NotificationMethodButton({ icon, label, value, selected, onClick }: NotificationMethodButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="p-3 rounded-lg border transition-all"
      style={{
        borderColor: selected ? '#00FFFF' : 'rgba(255, 255, 255, 0.2)',
        backgroundColor: selected ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center gap-1">
        <div style={{ color: selected ? '#00FFFF' : 'rgba(255, 255, 255, 0.6)' }}>
          {icon}
        </div>
        <span 
          className="text-xs"
          style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            color: selected ? '#00FFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          {label}
        </span>
      </div>
    </motion.button>
  );
}
