import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Calendar, Clock, Timer, Users, Trophy, Zap, ChevronDown, Star } from 'lucide-react';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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

interface ContestPageProps {
  navigationProps: NavigationProps;
}

interface Contest {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Ongoing' | 'Upcoming' | 'Completed';
  date: string;
  startTime: string;
  duration: string;
  format: 'Solo' | 'Team';
  description: string;
  participants: number;
  rated: boolean;
  prize: string;
  endTime: Date;
}

export function ContestPage({ navigationProps }: ContestPageProps) {
  const [filter, setFilter] = useState<'All' | 'Ongoing' | 'Upcoming' | 'Completed'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedContest, setExpandedContest] = useState<number | null>(null);

  const contests: Contest[] = [
    {
      id: 1,
      title: 'Weekly Algorithm Challenge #47',
      difficulty: 'Medium',
      status: 'Ongoing',
      date: 'Dec 4, 2025',
      startTime: '10:00 AM EST',
      duration: '2h 30m',
      format: 'Solo',
      description: 'Test your skills with medium-level DSA problems',
      participants: 2847,
      rated: true,
      prize: '$500 + Swag',
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000),
    },
    {
      id: 2,
      title: 'CodeArena Championship 2025',
      difficulty: 'Hard',
      status: 'Upcoming',
      date: 'Dec 10, 2025',
      startTime: '6:00 PM EST',
      duration: '4h',
      format: 'Solo',
      description: 'The ultimate coding competition with massive prizes',
      participants: 5924,
      rated: true,
      prize: '$10,000 + Trophy',
      endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      title: 'Beginner Bootcamp Contest',
      difficulty: 'Easy',
      status: 'Upcoming',
      date: 'Dec 6, 2025',
      startTime: '2:00 PM EST',
      duration: '1h 30m',
      format: 'Solo',
      description: 'Perfect for beginners to practice fundamental concepts',
      participants: 1423,
      rated: false,
      prize: 'Practice Round',
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 4,
      title: 'Team Coding Clash',
      difficulty: 'Hard',
      status: 'Upcoming',
      date: 'Dec 8, 2025',
      startTime: '8:00 PM EST',
      duration: '3h',
      format: 'Team',
      description: 'Collaborate with your team to solve complex problems',
      participants: 892,
      rated: true,
      prize: '$2,000 + Medals',
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 5,
      title: 'Lightning Round #12',
      difficulty: 'Easy',
      status: 'Completed',
      date: 'Dec 1, 2025',
      startTime: '5:00 PM EST',
      duration: '45m',
      format: 'Solo',
      description: 'Fast-paced quick problem solving challenge',
      participants: 3156,
      rated: false,
      prize: 'Leaderboard Points',
      endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 6,
      title: 'AI-Assisted Coding Marathon',
      difficulty: 'Medium',
      status: 'Completed',
      date: 'Nov 28, 2025',
      startTime: '12:00 PM EST',
      duration: '5h',
      format: 'Solo',
      description: 'Use CodeArena AI to assist you in solving problems',
      participants: 4521,
      rated: true,
      prize: '$1,500 + Badge',
      endTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
  ];

  const filteredContests = contests.filter(contest => {
    const matchesFilter = filter === 'All' || contest.status === filter;
    const matchesDifficulty = difficultyFilter === 'all' || contest.difficulty.toLowerCase() === difficultyFilter;
    const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#00FF88';
      case 'Medium': return '#FFA500';
      case 'Hard': return '#FF0088';
      default: return '#00FFFF';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return '#00FF88';
      case 'Upcoming': return '#00FFFF';
      case 'Completed': return '#A259FF';
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)', top: '10%', left: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #A259FF 0%, transparent 70%)', bottom: '10%', right: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar {...navigationProps} />

        {/* Page Header */}
        <div className="border-b border-[#00FFFF]/10 bg-[#0A0F1C]/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  🏁 CodeArena Contests
                </h1>
                <p className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Join competitive coding challenges and win prizes
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Filter */}
              <div className="flex gap-2">
                {(['All', 'Ongoing', 'Upcoming', 'Completed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      filter === status
                        ? 'bg-[#00FFFF]/20 text-[#00FFFF] border-b-2 border-[#00FFFF]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="h-8 w-px bg-white/10" />

              {/* Difficulty Filter */}
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#00FFFF]/20 text-white">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contests..."
                  className="pl-10 bg-[#0D0D0D] border-[#00FFFF]/20 text-white placeholder:text-white/40"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contest Grid */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid gap-6">
            {filteredContests.map((contest, index) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                index={index}
                isExpanded={expandedContest === contest.id}
                onToggle={() => setExpandedContest(expandedContest === contest.id ? null : contest.id)}
                getDifficultyColor={getDifficultyColor}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>

          {filteredContests.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/40 text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                No contests found matching your filters
              </p>
            </div>
          )}
        </div>

        {/* Sidebar - Rules & Past Winners */}
        <div className="fixed right-6 top-32 w-80 space-y-4 hidden xl:block">
          <motion.div
            className="bg-[#0D0D0D]/90 backdrop-blur-md border border-[#00FFFF]/20 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 
              className="text-lg text-white mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
            >
              Contest Rules
            </h3>
            <ul className="space-y-2 text-sm text-white/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <li>• No plagiarism allowed</li>
              <li>• Fair play enforced by AI</li>
              <li>• Rated contests affect rank</li>
              <li>• Team contests need 2-4 members</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-[#0D0D0D]/90 backdrop-blur-md border border-[#A259FF]/20 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 
              className="text-lg text-white mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
            >
              <Trophy className="w-5 h-5 inline mr-2 text-[#FFD700]" />
              Past Winners
            </h3>
            <div className="space-y-3">
              {['AlgoMaster_X', 'CodeNinja47', 'ByteWizard'].map((winner, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#A259FF]" />
                  <span className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {winner}
                  </span>
                  <Star className="w-4 h-4 text-[#FFD700] ml-auto" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface ContestCardProps {
  contest: Contest;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  getDifficultyColor: (difficulty: string) => string;
  getStatusColor: (status: string) => string;
}

function ContestCard({ contest, index, isExpanded, onToggle, getDifficultyColor, getStatusColor }: ContestCardProps) {
  return (
    <motion.div
      className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/10 rounded-xl p-6 hover:border-[#00FFFF]/30 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0, 255, 255, 0.1)' }}
    >
      <div className="flex items-start justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 
              className="text-xl text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
            >
              {contest.title}
            </h3>
            <Badge 
              className="px-2 py-1 text-xs border"
              style={{ 
                backgroundColor: `${getDifficultyColor(contest.difficulty)}20`,
                borderColor: `${getDifficultyColor(contest.difficulty)}50`,
                color: getDifficultyColor(contest.difficulty),
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {contest.difficulty}
            </Badge>
            {contest.rated && (
              <Badge 
                className="px-2 py-1 text-xs bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/50"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <Zap className="w-3 h-3 mr-1" />
                Rated
              </Badge>
            )}
            <Badge 
              className="px-2 py-1 text-xs border"
              style={{ 
                backgroundColor: `${getStatusColor(contest.status)}20`,
                borderColor: `${getStatusColor(contest.status)}50`,
                color: getStatusColor(contest.status),
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {contest.status}
            </Badge>
          </div>

          <p className="text-white/60 mb-4 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {contest.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <Calendar className="w-4 h-4 text-[#00FFFF]" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{contest.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-4 h-4 text-[#A259FF]" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{contest.startTime}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Timer className="w-4 h-4 text-[#00FF88]" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{contest.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Users className="w-4 h-4 text-[#FF0088]" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{contest.format}</span>
            </div>
          </div>
        </div>

        {/* Right Content - Timer & Actions */}
        <div className="flex flex-col items-end gap-4">
          {contest.status !== 'Completed' && (
            <CountdownTimer endTime={contest.endTime} status={contest.status} />
          )}

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#A259FF] border-2 border-[#0D0D0D]"
                />
              ))}
            </div>
            <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              +{contest.participants}
            </span>
          </div>

          <div className="flex gap-2">
            {contest.status === 'Ongoing' ? (
              <Button
                className="bg-[#00FF88] hover:bg-[#00FF88]/90 text-black"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                Join Now
              </Button>
            ) : contest.status === 'Upcoming' ? (
              <Button
                className="bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                Register
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-[#A259FF] text-[#A259FF] hover:bg-[#A259FF]/10"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                View Results
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onToggle}
              className="border-[#00FFFF]/30 text-white/80 hover:bg-[#00FFFF]/10"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div
          className="mt-6 pt-6 border-t border-[#00FFFF]/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm text-[#00FFFF] mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                Prize Structure
              </h4>
              <p className="text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {contest.prize}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-[#A259FF] mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                Problem Categories
              </h4>
              <p className="text-white/80 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Arrays, DP, Graphs, Trees
              </p>
            </div>
            <div>
              <h4 className="text-sm text-[#00FF88] mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                Format Details
              </h4>
              <p className="text-white/80 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {contest.format === 'Solo' ? 'Individual competition' : 'Team collaboration (2-4 members)'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function CountdownTimer({ endTime, status }: { endTime: Date; status: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const color = status === 'Ongoing' ? '#00FF88' : '#00FFFF';

  return (
    <div className="flex gap-2">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div 
          key={unit}
          className="flex flex-col items-center px-3 py-2 rounded-lg border"
          style={{ 
            backgroundColor: `${color}10`,
            borderColor: `${color}30`,
          }}
        >
          <span 
            className="text-xl"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              color: color,
            }}
          >
            {String(value).padStart(2, '0')}
          </span>
          <span 
            className="text-xs text-white/60"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {unit.slice(0, 1)}
          </span>
        </div>
      ))}
    </div>
  );
}