import { motion } from 'motion/react';
import { ProfileHeader } from './profile/ProfileHeader';
import { UserSummary } from './profile/UserSummary';
import { StatsCards } from './profile/StatsCards';
import { APIRatingsPanel } from './profile/APIRatingsPanel';
import { AchievementsBadges } from './profile/AchievementsBadges';
import { PerformanceGraph } from './profile/PerformanceGraph';
import { ActivityFeed } from './profile/ActivityFeed';

interface ProfilePageProps {
  onNavigate: (page: 'home' | 'arena' | 'questions' | 'match') => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Matrix Code Rain */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#00FFFF] text-xs"
              style={{
                left: `${(i * 2.5) % 100}%`,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              animate={{
                y: ['-100px', '100vh'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 30 }, () => 
                Math.random() > 0.5 ? '1' : '0'
              ).join('')}
            </motion.div>
          ))}
        </div>

        {/* Neon Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            top: '10%',
            left: '5%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #A259FF 0%, transparent 70%)',
            bottom: '10%',
            right: '5%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />

        {/* Circuit Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#00FFFF] to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: '200px',
              }}
              animate={{
                y: ['-200px', '100vh'],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#00FF88' : '#A259FF',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <ProfileHeader onNavigate={onNavigate} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            <div className="space-y-8">
              {/* User Summary */}
              <UserSummary />

              {/* Stats Cards */}
              <StatsCards />

              {/* API Ratings */}
              <APIRatingsPanel />

              {/* Achievements */}
              <AchievementsBadges />

              {/* Performance Graph */}
              <PerformanceGraph />

              {/* Activity Feed */}
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Edit Profile Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-[#A259FF] to-[#00FFFF] flex items-center justify-center shadow-lg z-20"
        style={{
          boxShadow: '0 0 30px rgba(162, 89, 255, 0.5)',
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 40px rgba(162, 89, 255, 0.8)',
        }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </motion.button>
    </div>
  );
}
