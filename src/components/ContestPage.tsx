import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  Clock, 
  Timer, 
  Users, 
  Trophy, 
  Zap, 
  ChevronDown, 
  Star,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Navbar } from './Navbar';
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
      date: 'Dec 4',
      startTime: '10:00 AM',
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
      date: 'Dec 10',
      startTime: '6:00 PM',
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
      date: 'Dec 6',
      startTime: '2:00 PM',
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
      date: 'Dec 8',
      startTime: '8:00 PM',
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
      date: 'Dec 1',
      startTime: '5:00 PM',
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
      date: 'Nov 28',
      startTime: '12:00 PM',
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
      case 'Easy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Hard': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a] text-gray-300 font-sans overflow-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
      
      {/* 1. TOP HEADER */}
      <div className="h-10 border-b border-[#333] flex items-center justify-between px-4 shrink-0 bg-[#121212]">
        <div className="flex items-center gap-4">
          <button 
            onClick={navigationProps.onHome}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          
          <div className="h-4 w-[1px] bg-[#333]" />
          
          <h1 className="text-sm font-medium text-gray-200">
            Contests
          </h1>
        </div>

        <div className="flex items-center gap-2">
           <div className="relative">
              <Search className="absolute left-2 top-1.5 w-3 h-3 text-gray-500" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 bg-[#1a1a1a] border border-[#333] rounded px-2 pl-6 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
              />
           </div>
        </div>
      </div>

      {/* 2. FILTERS BAR */}
      <div className="px-4 py-2 border-b border-[#333] bg-[#1a1a1a] flex items-center justify-between shrink-0">
         <div className="flex items-center gap-1">
            {(['All', 'Ongoing', 'Upcoming', 'Completed'] as const).map((status) => (
               <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                     filter === status 
                        ? 'bg-[#333] text-white' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-[#222]'
                  }`}
               >
                  {status}
               </button>
            ))}
         </div>
         
         <div className="flex items-center gap-2">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
               <SelectTrigger className="h-7 w-32 bg-[#222] border-[#333] text-xs text-gray-300">
                  <SelectValue placeholder="Difficulty" />
               </SelectTrigger>
               <SelectContent className="bg-[#222] border-[#333]">
                  <SelectItem value="all" className="text-xs">All Levels</SelectItem>
                  <SelectItem value="easy" className="text-xs">Easy</SelectItem>
                  <SelectItem value="medium" className="text-xs">Medium</SelectItem>
                  <SelectItem value="hard" className="text-xs">Hard</SelectItem>
               </SelectContent>
            </Select>
         </div>
      </div>

      {/* 3. MAIN CONTENT (LIST) */}
      <div className="flex-1 overflow-auto custom-scrollbar p-4">
         <div className="max-w-5xl mx-auto space-y-2">
            {filteredContests.length > 0 ? (
               filteredContests.map((contest, index) => (
                  <ContestCard
                     key={contest.id}
                     contest={contest}
                     index={index}
                     isExpanded={expandedContest === contest.id}
                     onToggle={() => setExpandedContest(expandedContest === contest.id ? null : contest.id)}
                     getDifficultyColor={getDifficultyColor}
                  />
               ))
            ) : (
               <div className="text-center py-20 text-gray-500 text-xs">
                  No contests found matching your filters
               </div>
            )}
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
}

function ContestCard({ contest, index, isExpanded, onToggle, getDifficultyColor }: ContestCardProps) {
  return (
    <div className={`group rounded border border-[#333] bg-[#222] hover:bg-[#262626] transition-colors overflow-hidden ${isExpanded ? 'bg-[#262626] border-[#444]' : ''}`}>
       {/* Main Row */}
       <div 
          className="flex items-center gap-4 p-3 cursor-pointer"
          onClick={onToggle}
       >
          {/* Status Icon */}
          <div className="shrink-0 pl-1">
             {contest.status === 'Ongoing' ? (
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
             ) : contest.status === 'Upcoming' ? (
                <div className="w-2 h-2 rounded-full bg-blue-500" />
             ) : (
                <div className="w-2 h-2 rounded-full bg-gray-600" />
             )}
          </div>

          {/* Title & Badges */}
          <div className="flex-1 min-w-0">
             <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold text-gray-200 truncate">{contest.title}</h3>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${getDifficultyColor(contest.difficulty)}`}>
                   {contest.difficulty}
                </span>
                {contest.rated && (
                   <span className="flex items-center gap-0.5 text-[10px] text-yellow-500 font-medium px-1.5 py-0.5 rounded border border-yellow-500/20 bg-yellow-500/10">
                      <Zap className="w-3 h-3" /> Rated
                   </span>
                )}
             </div>
             <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 font-mono">
                <div className="flex items-center gap-1.5">
                   <Calendar className="w-3 h-3" /> {contest.date}
                </div>
                <div className="flex items-center gap-1.5">
                   <Clock className="w-3 h-3" /> {contest.startTime}
                </div>
                <div className="flex items-center gap-1.5">
                   <Timer className="w-3 h-3" /> {contest.duration}
                </div>
                <div className="flex items-center gap-1.5">
                   <Users className="w-3 h-3" /> {contest.participants}
                </div>
             </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
             {contest.status !== 'Completed' && (
                <div className="hidden sm:block text-right mr-2">
                   <div className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-0.5">Starts In</div>
                   <CountdownTimer endTime={contest.endTime} />
                </div>
             )}
             
             <button 
                onClick={(e) => { e.stopPropagation(); /* Handle join */ }}
                className={`px-4 py-1.5 text-xs font-bold rounded transition-colors ${
                   contest.status === 'Ongoing' 
                      ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20' 
                      : contest.status === 'Upcoming'
                         ? 'bg-blue-600 hover:bg-blue-500 text-white'
                         : 'bg-[#333] hover:bg-[#444] text-gray-400 border border-[#444]'
                }`}
             >
                {contest.status === 'Ongoing' ? 'Enter Contest' : contest.status === 'Upcoming' ? 'Register' : 'View Results'}
             </button>

             <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-4 h-4 text-gray-500" />
             </div>
          </div>
       </div>

       {/* Expanded Details */}
       <AnimatePresence>
          {isExpanded && (
             <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-[#333] bg-[#1a1a1a]"
             >
                <div className="p-4 grid grid-cols-3 gap-8 text-xs">
                   <div>
                      <h4 className="font-bold text-gray-400 mb-2 uppercase tracking-wider text-[10px]">Description</h4>
                      <p className="text-gray-300 leading-relaxed">{contest.description}</p>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-400 mb-2 uppercase tracking-wider text-[10px]">Prizes</h4>
                      <p className="text-yellow-500 font-medium">{contest.prize}</p>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-400 mb-2 uppercase tracking-wider text-[10px]">Format</h4>
                      <div className="flex items-center gap-2 text-gray-300">
                         {contest.format === 'Solo' ? <Users className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                         {contest.format === 'Solo' ? 'Individual' : 'Team Based'}
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
}

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState<{h: number, m: number, s: number} | null>(null);

  useEffect(() => {
    const calculate = () => {
      const diff = endTime.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          h: Math.floor(diff / (1000 * 60 * 60)),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
         setTimeLeft(null);
      }
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (!timeLeft) return null;

  return (
    <div className="font-mono text-xs text-gray-300">
      {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
    </div>
  );
}
