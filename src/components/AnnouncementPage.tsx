import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { PlatformFilter } from './announcement/PlatformFilter';
import { ContestCard } from './announcement/ContestCard';
import { UpcomingWidget } from './announcement/UpcomingWidget';
import { PastContestsTable } from './announcement/PastContestsTable';

interface NavigationProps {
  onStartCoding: () => void;
  onStartMatch: () => void;
  onQuestionBank: () => void;
  onProfile: () => void;
  onAnnouncements: () => void;
  onCommunity: () => void;
  onLeaderboard: () => void;
  onContests: () => void;
  onBlog: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onDocs: () => void;
  onSupport: () => void;
  onHome: () => void;
}

interface AnnouncementPageProps {
  navigationProps: NavigationProps;
}

export function AnnouncementPage({ navigationProps }: AnnouncementPageProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('upcoming');

  // Mock contest data
  const contests = [
    {
      id: '1',
      platform: 'Codeforces',
      platformColor: '#00FFFF',
      title: 'Global Round 28',
      difficulty: 'Rated',
      difficultyColor: '#FFB86C',
      date: '18 Nov 2025',
      startTime: '21:30 IST',
      duration: '2 hours',
      link: 'https://codeforces.com',
      targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
    },
    {
      id: '2',
      platform: 'LeetCode',
      platformColor: '#FFB86C',
      title: 'Weekly Contest 153',
      difficulty: 'All Levels',
      difficultyColor: '#00FF88',
      date: '17 Nov 2025',
      startTime: '08:00 IST',
      duration: '1.5 hours',
      link: 'https://leetcode.com',
      targetDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000),
    },
    {
      id: '3',
      platform: 'CodeChef',
      platformColor: '#A259FF',
      title: 'Starters 113 (Div. 2)',
      difficulty: 'Beginner',
      difficultyColor: '#00FFFF',
      date: '20 Nov 2025',
      startTime: '20:00 IST',
      duration: '2.5 hours',
      link: 'https://codechef.com',
      targetDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
    },
    {
      id: '4',
      platform: 'AtCoder',
      platformColor: '#00FF88',
      title: 'Beginner Contest 350',
      difficulty: 'Beginner',
      difficultyColor: '#00FFFF',
      date: '16 Nov 2025',
      startTime: '17:00 IST',
      duration: '2 hours',
      link: 'https://atcoder.jp',
      targetDate: new Date(Date.now() + 3 * 60 * 60 * 1000 + 21 * 60 * 1000),
      isLive: false,
    },
    {
      id: '5',
      platform: 'Codeforces',
      platformColor: '#00FFFF',
      title: 'Round #988 (Div. 2)',
      difficulty: 'Rated',
      difficultyColor: '#FFB86C',
      date: '19 Nov 2025',
      startTime: '19:30 IST',
      duration: '2 hours',
      link: 'https://codeforces.com',
      targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000),
    },
    {
      id: '6',
      platform: 'HackerRank',
      platformColor: '#00FF88',
      title: 'Week of Code 42',
      difficulty: 'All Levels',
      difficultyColor: '#A259FF',
      date: '21 Nov 2025',
      startTime: '12:00 IST',
      duration: '7 days',
      link: 'https://hackerrank.com',
      targetDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  ];

  // Filter contests based on platform
  const filteredContests = selectedPlatform === 'all' 
    ? contests 
    : contests.filter(c => c.platform.toLowerCase() === selectedPlatform);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Matrix Code Rain */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#00FFFF] text-xs"
              style={{
                left: `${(i * 2) % 100}%`,
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

        {/* Gradient Edges */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 0% 0%, #00FFFF 0%, transparent 50%), radial-gradient(circle at 100% 100%, #A259FF 0%, transparent 50%)',
          }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#00FF88' : '#A259FF',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            top: '20%',
            left: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #A259FF 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <Navbar {...navigationProps} />

        {/* Platform Filter */}
        <PlatformFilter
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contest Cards - Main Column */}
              <div className="lg:col-span-2 space-y-6">
                {filteredContests.map((contest, i) => (
                  <ContestCard
                    key={contest.id}
                    contest={contest}
                    delay={i * 0.1}
                  />
                ))}

                {filteredContests.length === 0 && (
                  <motion.div
                    className="glassmorphism rounded-xl p-12 text-center border border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      No contests found for this platform
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Sidebar - Upcoming Widget */}
              <div className="hidden lg:block">
                <UpcomingWidget />
              </div>
            </div>

            {/* Past Contests Section */}
            <div className="mt-12">
              <PastContestsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}