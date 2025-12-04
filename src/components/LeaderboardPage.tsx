import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { TopUtilityStrip } from './TopUtilityStrip';
import { MobileUtilityFAB } from './MobileUtilityFAB';
import { LeaderboardHeader } from './leaderboard/LeaderboardHeader';
import { HeroFilterBar } from './leaderboard/HeroFilterBar';
import { TopThreePodium } from './leaderboard/TopThreePodium';
import { LeaderboardTable } from './leaderboard/LeaderboardTable';
import { SidebarPanel } from './leaderboard/SidebarPanel';

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

interface LeaderboardPageProps {
  navigationProps: NavigationProps;
}

export function LeaderboardPage({ navigationProps }: LeaderboardPageProps) {
  const [timeFilter, setTimeFilter] = useState("week");
  const [sortBy, setSortBy] = useState("rating");
  const [activeFilter, setActiveFilter] = useState("matches");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Handle utility strip actions
  const handleSearch = () => {
    console.log('Search clicked');
    // Search functionality can be wired up here
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // Settings modal can be triggered here
  };

  // Mock data for top 3
  const topThree = [
    {
      rank: 1,
      username: 'legendCoder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=legend',
      rating: 2184,
      problemsSolved: 341,
      accuracy: 94.2,
      badge: 'gold' as const
    },
    {
      rank: 2,
      username: 'byteWarrior',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=warrior',
      rating: 2029,
      problemsSolved: 321,
      accuracy: 91.4,
      badge: 'gold' as const
    },
    {
      rank: 3,
      username: 'codePhantom',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phantom',
      rating: 1885,
      problemsSolved: 287,
      accuracy: 88.6,
      badge: 'silver' as const
    }
  ];

  // Mock data for leaderboard rows (ranks 4-20)
  const leaderboardUsers = [
    { rank: 4, username: 'meghram_meena', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meena', level: 42, rating: 1823, problemsSolved: 276, accuracy: 87.3, badge: 'silver' as const },
    { rank: 5, username: 'dataHunter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hunter', level: 40, rating: 1764, problemsSolved: 251, accuracy: 85.1, badge: 'silver' as const },
    { rank: 6, username: 'aiNinja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja2', level: 38, rating: 1620, problemsSolved: 224, accuracy: 82.9, badge: 'silver' as const },
    { rank: 7, username: 'pythonPro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=python', level: 37, rating: 1589, problemsSolved: 218, accuracy: 81.5, badge: 'silver' as const },
    { rank: 8, username: 'debugMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=debug', level: 35, rating: 1543, problemsSolved: 203, accuracy: 79.8, badge: 'silver' as const },
    { rank: 9, username: 'arrayWizard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wizard', level: 34, rating: 1512, problemsSolved: 197, accuracy: 78.4, badge: 'silver' as const },
    { rank: 10, username: 'loopLegend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=loop', level: 33, rating: 1487, problemsSolved: 189, accuracy: 77.1, badge: 'bronze' as const },
    { rank: 11, username: 'recursiveRex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rex', level: 32, rating: 1456, problemsSolved: 182, accuracy: 75.9, badge: 'bronze' as const },
    { rank: 12, username: 'stackMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=stack', level: 31, rating: 1423, problemsSolved: 174, accuracy: 74.5, badge: 'bronze' as const },
    { rank: 13, username: 'queueQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=queen', level: 30, rating: 1398, problemsSolved: 168, accuracy: 73.2, badge: 'bronze' as const },
    { rank: 14, username: 'hashHero', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hero', level: 29, rating: 1367, problemsSolved: 161, accuracy: 71.8, badge: 'bronze' as const },
    { rank: 15, username: 'binaryBoss', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=binary', level: 28, rating: 1334, problemsSolved: 155, accuracy: 70.4, badge: 'bronze' as const },
    { rank: 16, username: 'sortSamurai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=samurai', level: 27, rating: 1301, problemsSolved: 148, accuracy: 69.1, badge: 'bronze' as const },
    { rank: 17, username: 'graphGuru', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=graph', level: 26, rating: 1278, problemsSolved: 142, accuracy: 67.7, badge: 'bronze' as const },
    { rank: 18, username: 'treeTitan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tree', level: 25, rating: 1245, problemsSolved: 136, accuracy: 66.3, badge: 'bronze' as const },
    { rank: 19, username: 'dpDynamo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dynamo', level: 24, rating: 1212, problemsSolved: 129, accuracy: 64.9, badge: 'bronze' as const },
    { rank: 20, username: 'greedyGladiator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gladiator', level: 23, rating: 1189, problemsSolved: 123, accuracy: 63.5, badge: 'bronze' as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Matrix rain effect */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400 text-xs"
              style={{
                left: `${i * 5}%`,
                fontFamily: 'JetBrains Mono, monospace'
              }}
              animate={{
                y: ['0vh', '100vh'],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('\n')}
            </motion.div>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar {...navigationProps} />
        
        {/* Top Utility Strip - Desktop Only */}
        <TopUtilityStrip
          onHome={navigationProps.onHome}
          onProfile={navigationProps.onProfile}
          onSearch={handleSearch}
          onSettings={handleSettings}
        />

        {/* Mobile Utility FAB - Mobile Only */}
        <MobileUtilityFAB
          onHome={navigationProps.onHome}
          onProfile={navigationProps.onProfile}
          onSearch={handleSearch}
          onSettings={handleSettings}
        />

        <LeaderboardHeader
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <HeroFilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <TopThreePodium topThree={topThree} />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
          <div className="lg:col-span-8">
            <LeaderboardTable
              users={leaderboardUsers}
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="lg:col-span-4">
            <SidebarPanel />
          </div>
        </div>
      </div>
    </div>
  );
}