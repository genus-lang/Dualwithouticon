import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Filter, 
  X, 
  Check, 
  AlertCircle,
  Clock,
  MoreVertical,
  Code2,
  ListFilter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onStartCoding: () => void;
  onStartMatch: () => void;
  onQuestionBank: () => void;
  onProfile: () => void;
  onAnnouncements: () => void;
  onCommunity: () => void;
  onLeaderboard: () => void;
  onContests: () => void;
  onContestResult: () => void;
  onBlog: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onDocs: () => void;
  onSupport: () => void;
  onHome: () => void;
}

interface ContestResultPageProps {
  navigationProps: NavigationProps;
}

type Verdict = 'AC' | 'WA' | 'TLE' | 'RTE' | 'CE' | 'SKIPPED';

interface ProblemResult {
  status: Verdict;
  time?: string; // HH:MM of solve
  attempts: number;
  penalty?: number;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  handle?: string;
  country?: string; // Flag emoji
  score: number;
  penalty: number; // In minutes usually
  problems: Record<string, ProblemResult>; // 'A', 'B', 'C', 'D'
  lastSubmission: string;
}

const PROBLEMS = ['A', 'B', 'C', 'D'];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'tourist',
    handle: 'LGM',
    country: '🇧🇾',
    score: 400,
    penalty: 45,
    problems: {
      'A': { status: 'AC', time: '00:05', attempts: 1 },
      'B': { status: 'AC', time: '00:12', attempts: 1 },
      'C': { status: 'AC', time: '00:25', attempts: 1 },
      'D': { status: 'AC', time: '00:45', attempts: 1 },
    },
    lastSubmission: '00:45'
  },
  {
    rank: 2,
    username: 'Benq',
    handle: 'GM',
    country: '🇺🇸',
    score: 400,
    penalty: 58,
    problems: {
      'A': { status: 'AC', time: '00:04', attempts: 1 },
      'B': { status: 'AC', time: '00:15', attempts: 1 },
      'C': { status: 'AC', time: '00:32', attempts: 2, penalty: 10 },
      'D': { status: 'AC', time: '00:58', attempts: 1 },
    },
    lastSubmission: '00:58'
  },
  {
    rank: 3,
    username: 'meghram',
    handle: 'Master',
    country: '🇮🇳',
    score: 300,
    penalty: 120,
    problems: {
      'A': { status: 'AC', time: '00:10', attempts: 1 },
      'B': { status: 'AC', time: '00:45', attempts: 3, penalty: 20 },
      'C': { status: 'AC', time: '01:30', attempts: 1 },
      'D': { status: 'TLE', attempts: 5 },
    },
    lastSubmission: '01:30'
  },
  {
    rank: 4,
    username: 'jiangly',
    handle: 'LGM',
    country: '🇨🇳',
    score: 200,
    penalty: 25,
    problems: {
      'A': { status: 'AC', time: '00:08', attempts: 1 },
      'B': { status: 'AC', time: '00:25', attempts: 1 },
      'C': { status: 'WA', attempts: 2 },
      'D': { status: 'SKIPPED', attempts: 0 },
    },
    lastSubmission: '00:25'
  },
  // Add more rows to demonstrate scrolling
  ...Array.from({ length: 50 }).map((_, i) => ({
    rank: i + 5,
    username: `coder_${i+5}`,
    handle: 'Expert',
    country: '🌍',
    score: Math.max(0, 400 - (i * 5)),
    penalty: 30 + i * 2,
    problems: {
      'A': { status: 'AC', time: `00:${10 + (i % 50)}`, attempts: 1 },
      'B': i % 3 === 0 ? { status: 'AC', time: `00:${30 + (i % 30)}`, attempts: 2 } : { status: 'WA', attempts: 1 },
      'C': i % 5 === 0 ? { status: 'AC', time: `01:00`, attempts: 1 } : { status: 'SKIPPED', attempts: 0 },
      'D': { status: 'SKIPPED', attempts: 0 },
    },
    lastSubmission: `00:${30 + (i % 30)}`
  }))
];

interface FilterState {
  problem: 'all' | 'A' | 'B' | 'C' | 'D' | 'all_solved';
  minScore: string;
  maxScore: string;
  minRank: string;
  maxRank: string;
  status: {
    atLeastOne: boolean;
    solvedAll: boolean;
    noAC: boolean;
  };
  search: string;
}

const INITIAL_FILTERS: FilterState = {
  problem: 'all',
  minScore: '',
  maxScore: '',
  minRank: '',
  maxRank: '',
  status: {
    atLeastOne: false,
    solvedAll: false,
    noAC: false,
  },
  search: ''
};

export function ContestResultPage({ navigationProps }: ContestResultPageProps) {
  const [theme] = useState<'dark' | 'light'>('dark');
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<{user: string, problem: string} | null>(null);
  
  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(INITIAL_FILTERS);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
  };

  const isFilterActive = JSON.stringify(appliedFilters) !== JSON.stringify(INITIAL_FILTERS);

  // Filter Logic
  const filteredLeaderboard = MOCK_LEADERBOARD.filter(entry => {
    // Problem Filter
    if (appliedFilters.problem !== 'all') {
      if (appliedFilters.problem === 'all_solved') {
        const allSolved = PROBLEMS.every(p => entry.problems[p].status === 'AC');
        if (!allSolved) return false;
      } else {
        if (entry.problems[appliedFilters.problem].status !== 'AC') return false;
      }
    }

    // Score Range
    if (appliedFilters.minScore && entry.score < parseInt(appliedFilters.minScore)) return false;
    if (appliedFilters.maxScore && entry.score > parseInt(appliedFilters.maxScore)) return false;

    // Rank Range
    if (appliedFilters.minRank && entry.rank < parseInt(appliedFilters.minRank)) return false;
    if (appliedFilters.maxRank && entry.rank > parseInt(appliedFilters.maxRank)) return false;

    // Status Filter
    const acCount = Object.values(entry.problems).filter(p => p.status === 'AC').length;
    if (appliedFilters.status.atLeastOne && acCount === 0) return false;
    if (appliedFilters.status.solvedAll && acCount < 4) return false;
    if (appliedFilters.status.noAC && acCount > 0) return false;

    // Search
    if (appliedFilters.search) {
      const q = appliedFilters.search.toLowerCase();
      return entry.username.toLowerCase().includes(q) || (entry.handle && entry.handle.toLowerCase().includes(q));
    }

    return true;
  });

  const getStatusColor = (status: Verdict) => {
    switch (status) {
      case 'AC': return 'text-green-500 font-bold';
      case 'WA': return 'text-red-500';
      case 'TLE': return 'text-orange-500';
      case 'RTE': return 'text-purple-500';
      case 'CE': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status: Verdict) => {
    switch (status) {
      case 'AC': return 'bg-green-500/10';
      case 'WA': return 'bg-red-500/10';
      default: return 'transparent';
    }
  };

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#0f0f0f] text-gray-300' : 'bg-white text-gray-800'} font-sans overflow-hidden`}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
        td, th { white-space: nowrap; }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      {/* 1. TOP HEADER (THIN, STICKY) */}
      <header className={`h-10 border-b flex items-center justify-between px-4 shrink-0 z-30 relative ${theme === 'dark' ? 'bg-[#121212] border-[#222]' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={navigationProps.onHome}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          
          <div className={`h-4 w-[1px] ${theme === 'dark' ? 'bg-[#333]' : 'bg-gray-300'}`} />
          
          <h1 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
            Weekly Clash – A9X3QZ
          </h1>
          
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-[#222] text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
            Finished
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs" ref={filterRef}>
          <div className={`px-2 py-0.5 rounded font-medium ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
            Your Rank: 3 / {MOCK_LEADERBOARD.length}
          </div>

          <div className={`h-4 w-[1px] ${theme === 'dark' ? 'bg-[#333]' : 'bg-gray-300'}`} />

          {/* FILTER BUTTON */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-8 h-8 flex items-center justify-center rounded transition-colors relative ${
              isFilterOpen || isFilterActive 
                ? (theme === 'dark' ? 'bg-[#333] text-white' : 'bg-gray-200 text-black')
                : (theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#222]' : 'text-gray-600 hover:text-black hover:bg-gray-100')
            }`}
            title="Filter Leaderboard"
          >
            <ListFilter className="w-4 h-4" />
            {isFilterActive && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-[#121212]" />
            )}
          </button>

          {/* FILTER PANEL DROPDOWN */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className={`absolute top-full right-4 mt-2 w-72 rounded-lg border shadow-xl flex flex-col overflow-hidden z-50 ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-200'}`}
              >
                {/* Panel Header */}
                <div className={`px-4 py-2 border-b text-[10px] font-bold uppercase tracking-wider opacity-50 ${theme === 'dark' ? 'border-[#333] bg-[#222]' : 'border-gray-100 bg-gray-50'}`}>
                  Filter View
                </div>

                <div className="p-4 space-y-4">
                  {/* Search */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold opacity-60">Search User</label>
                    <div className={`flex items-center px-2 py-1.5 rounded border ${theme === 'dark' ? 'bg-[#121212] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
                      <Search className="w-3 h-3 opacity-50 mr-2" />
                      <input 
                        type="text" 
                        value={filters.search}
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                        placeholder="Username or handle" 
                        className="bg-transparent border-none outline-none text-xs w-full placeholder-opacity-40"
                      />
                    </div>
                  </div>

                  {/* Problem Filter */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold opacity-60">Solved Problem</label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'all_solved', label: 'All 4' },
                        ...PROBLEMS.map(p => ({ id: p, label: p }))
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setFilters({...filters, problem: opt.id as any})}
                          className={`px-2 py-1 text-[10px] font-medium rounded border transition-colors ${
                            filters.problem === opt.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : (theme === 'dark' ? 'bg-[#222] border-[#333] text-gray-400 hover:bg-[#333]' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rank Range */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold opacity-60">Rank Range</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        placeholder="Min" 
                        value={filters.minRank}
                        onChange={(e) => setFilters({...filters, minRank: e.target.value})}
                        className={`w-full px-2 py-1.5 text-xs rounded border outline-none ${theme === 'dark' ? 'bg-[#121212] border-[#333]' : 'bg-gray-50 border-gray-200'}`}
                      />
                      <span className="opacity-30 text-xs">-</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        value={filters.maxRank}
                        onChange={(e) => setFilters({...filters, maxRank: e.target.value})}
                        className={`w-full px-2 py-1.5 text-xs rounded border outline-none ${theme === 'dark' ? 'bg-[#121212] border-[#333]' : 'bg-gray-50 border-gray-200'}`}
                      />
                    </div>
                  </div>

                   {/* Score Range */}
                   <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold opacity-60">Score Range</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        placeholder="Min" 
                        value={filters.minScore}
                        onChange={(e) => setFilters({...filters, minScore: e.target.value})}
                        className={`w-full px-2 py-1.5 text-xs rounded border outline-none ${theme === 'dark' ? 'bg-[#121212] border-[#333]' : 'bg-gray-50 border-gray-200'}`}
                      />
                      <span className="opacity-30 text-xs">-</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        value={filters.maxScore}
                        onChange={(e) => setFilters({...filters, maxScore: e.target.value})}
                        className={`w-full px-2 py-1.5 text-xs rounded border outline-none ${theme === 'dark' ? 'bg-[#121212] border-[#333]' : 'bg-gray-50 border-gray-200'}`}
                      />
                    </div>
                  </div>

                  {/* Status Checkboxes */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold opacity-60">Status</label>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${filters.status.atLeastOne ? 'bg-blue-600 border-blue-600' : (theme === 'dark' ? 'border-[#444] bg-[#222]' : 'border-gray-300 bg-white')}`}>
                          {filters.status.atLeastOne && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={filters.status.atLeastOne} 
                          onChange={(e) => setFilters({...filters, status: {...filters.status, atLeastOne: e.target.checked}})}
                        />
                        <span className="text-xs opacity-80 group-hover:opacity-100">Solved ≥ 1 problem</span>
                      </label>
                      
                      <label className="flex items-center gap-2 cursor-pointer group">
                         <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${filters.status.solvedAll ? 'bg-blue-600 border-blue-600' : (theme === 'dark' ? 'border-[#444] bg-[#222]' : 'border-gray-300 bg-white')}`}>
                          {filters.status.solvedAll && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={filters.status.solvedAll} 
                          onChange={(e) => setFilters({...filters, status: {...filters.status, solvedAll: e.target.checked}})}
                        />
                        <span className="text-xs opacity-80 group-hover:opacity-100">Solved all problems</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer group">
                         <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${filters.status.noAC ? 'bg-blue-600 border-blue-600' : (theme === 'dark' ? 'border-[#444] bg-[#222]' : 'border-gray-300 bg-white')}`}>
                          {filters.status.noAC && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={filters.status.noAC} 
                          onChange={(e) => setFilters({...filters, status: {...filters.status, noAC: e.target.checked}})}
                        />
                        <span className="text-xs opacity-80 group-hover:opacity-100">No AC submissions</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className={`p-3 border-t flex gap-2 ${theme === 'dark' ? 'border-[#333] bg-[#222]' : 'border-gray-100 bg-gray-50'}`}>
                  <button 
                    onClick={handleResetFilters}
                    className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#333]' : 'text-gray-600 hover:text-black hover:bg-gray-200'}`}
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handleApplyFilters}
                    className="flex-1 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 2. MAIN LEADERBOARD TABLE */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <table className="w-full text-left text-xs border-collapse">
          <thead className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-[#121212] text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
            <tr>
              <th className={`w-12 px-2 py-2 font-medium border-b border-r sticky left-0 z-20 ${theme === 'dark' ? 'border-[#222] bg-[#121212]' : 'border-gray-200 bg-gray-50'}`}>Rank</th>
              <th className={`w-48 px-3 py-2 font-medium border-b border-r sticky left-12 z-20 ${theme === 'dark' ? 'border-[#222] bg-[#121212]' : 'border-gray-200 bg-gray-50'}`}>User</th>
              <th className={`w-16 px-2 py-2 font-medium border-b border-r text-center ${theme === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>Score</th>
              <th className={`w-16 px-2 py-2 font-medium border-b border-r text-center ${theme === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>Penalty</th>
              {PROBLEMS.map(p => (
                <th key={p} className={`w-20 px-2 py-2 font-medium border-b border-r text-center ${theme === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>{p}</th>
              ))}
              <th className={`px-3 py-2 font-medium border-b ${theme === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>Last Sub</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-[#1a1a1a]' : 'divide-gray-100'}`}>
            {filteredLeaderboard.length > 0 ? (
              filteredLeaderboard.map((entry) => (
                <tr 
                  key={entry.rank} 
                  onClick={() => setSelectedUser(entry)}
                  className={`group cursor-pointer transition-colors ${
                    entry.username === 'meghram' 
                      ? (theme === 'dark' ? 'bg-blue-500/5 hover:bg-blue-500/10' : 'bg-blue-50 hover:bg-blue-100')
                      : (theme === 'dark' ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-50')
                  }`}
                >
                  <td className={`px-2 py-1.5 font-mono text-center border-r sticky left-0 z-10 ${theme === 'dark' ? 'border-[#222] bg-inherit group-hover:bg-[#1a1a1a]' : 'border-gray-200 bg-inherit group-hover:bg-gray-50'}`}>
                     {entry.rank}
                  </td>
                  <td className={`px-3 py-1.5 border-r sticky left-12 z-10 ${theme === 'dark' ? 'border-[#222] bg-inherit group-hover:bg-[#1a1a1a]' : 'border-gray-200 bg-inherit group-hover:bg-gray-50'}`}>
                    <div className="flex flex-col justify-center">
                      <div className={`font-medium truncate max-w-[150px] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {entry.country} {entry.username}
                      </div>
                      {entry.handle && <div className="text-[10px] opacity-50">{entry.handle}</div>}
                    </div>
                  </td>
                  <td className={`px-2 py-1.5 text-center font-bold border-r ${theme === 'dark' ? 'border-[#222] text-white' : 'border-gray-200 text-black'}`}>
                    {entry.score}
                  </td>
                  <td className={`px-2 py-1.5 text-center font-mono opacity-70 border-r ${theme === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>
                    {entry.penalty}
                  </td>
                  
                  {PROBLEMS.map(p => {
                    const prob = entry.problems[p];
                    return (
                      <td 
                        key={p} 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (prob.status !== 'SKIPPED') setSelectedProblem({ user: entry.username, problem: p });
                        }}
                        className={`px-2 py-1.5 text-center border-r cursor-pointer ${theme === 'dark' ? 'border-[#222]' : 'border-gray-200'} ${getStatusBg(prob.status)}`}
                      >
                        {prob.status === 'AC' ? (
                          <div className="flex flex-col items-center">
                             <span className="text-green-500 font-bold leading-none">{prob.time}</span>
                             {prob.attempts > 1 && <span className="text-[9px] text-red-400 mt-0.5">(-{prob.attempts - 1})</span>}
                          </div>
                        ) : prob.status === 'SKIPPED' ? (
                          <span className="opacity-20">-</span>
                        ) : (
                          <div className="flex flex-col items-center">
                             <span className="text-red-500 font-bold leading-none">-{prob.attempts}</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                  
                  <td className={`px-3 py-1.5 font-mono opacity-60 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {entry.lastSubmission}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-xs opacity-50">
                  No matching results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 6. PROBLEM SUMMARY ROW (BOTTOM, FIXED) */}
      <footer className={`h-8 border-t flex items-center px-4 text-[10px] shrink-0 ${theme === 'dark' ? 'bg-[#121212] border-[#222] text-gray-500' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
         <span className="uppercase tracking-wider font-bold mr-3 opacity-70">Solved by:</span>
         <div className="flex gap-4 font-mono">
            <span>A: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>82%</span></span>
            <span className="opacity-30">|</span>
            <span>B: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>61%</span></span>
            <span className="opacity-30">|</span>
            <span>C: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>24%</span></span>
            <span className="opacity-30">|</span>
            <span>D: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>9%</span></span>
         </div>
      </footer>

      {/* 5. USER DETAILS DRAWER (SIDE MODAL) */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedUser(null)}
               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            />
            <motion.div 
               initial={{ x: '100%' }} 
               animate={{ x: 0 }} 
               exit={{ x: '100%' }}
               transition={{ type: 'tween', duration: 0.2 }}
               className={`fixed top-0 right-0 bottom-0 w-[400px] shadow-2xl z-40 flex flex-col ${theme === 'dark' ? 'bg-[#121212] border-l border-[#222]' : 'bg-white border-l border-gray-200'}`}
            >
               <div className={`flex items-center justify-between px-4 py-3 border-b ${theme === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>
                  <div>
                     <h2 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{selectedUser.username}</h2>
                     <div className="text-xs opacity-60 font-mono">Rank #{selectedUser.rank} • Score: {selectedUser.score}</div>
                  </div>
                  <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-white/10 rounded"><X className="w-5 h-5" /></button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-0">
                  <div className={`px-4 py-2 text-[10px] uppercase font-bold tracking-wider opacity-50 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>Submissions History</div>
                  <div className={`divide-y ${theme === 'dark' ? 'divide-[#222]' : 'divide-gray-100'}`}>
                     {Object.entries(selectedUser.problems).map(([probCode, result]) => (
                        <div key={probCode} className={`p-4 hover:bg-white/5 transition-colors ${result.status === 'SKIPPED' ? 'opacity-50' : ''}`}>
                           <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-sm">Problem {probCode}</span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded ${getStatusBg(result.status)} ${getStatusColor(result.status)}`}>
                                 {result.status}
                              </span>
                           </div>
                           <div className="flex items-center gap-4 text-xs opacity-70 font-mono">
                              {result.time && <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {result.time}</div>}
                              <div className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Attempts: {result.attempts}</div>
                           </div>
                           {result.status !== 'SKIPPED' && (
                              <button className={`w-full mt-3 py-1.5 text-xs font-medium rounded border flex items-center justify-center gap-2 transition-colors ${theme === 'dark' ? 'border-[#333] hover:bg-[#222]' : 'border-gray-200 hover:bg-gray-50'}`}>
                                 <Code2 className="w-3 h-3" /> View Code
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PROBLEM CELL POPUP */}
      <AnimatePresence>
        {selectedProblem && (
           <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
           >
              {/* Using a simplified centered modal for this demo, typically would attach to cell */}
              <div className={`w-64 rounded-lg shadow-xl pointer-events-auto p-4 border ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-200'}`}>
                 <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm">Problem {selectedProblem.problem}</span>
                    <button onClick={() => setSelectedProblem(null)}><X className="w-4 h-4 opacity-50 hover:opacity-100" /></button>
                 </div>
                 <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                       <span className="opacity-60">User:</span>
                       <span className="font-mono">{selectedProblem.user}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="opacity-60">Verdict:</span>
                       <span className="text-green-500 font-bold">Accepted</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="opacity-60">Time:</span>
                       <span className="font-mono">00:12</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="opacity-60">Memory:</span>
                       <span className="font-mono">1.2 MB</span>
                    </div>
                 </div>
                 <button className="w-full mt-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">View Source</button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
