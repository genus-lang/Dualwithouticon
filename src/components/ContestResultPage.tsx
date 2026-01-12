import { useState } from 'react';
import { Navbar } from './Navbar';
import { 
  Trophy, ChevronRight, Medal, Award, Clock, TrendingUp, TrendingDown,
  CheckCircle, XCircle, Target, Flame, Brain, AlertTriangle, Search,
  Download, RotateCcw, Ban, FileText, ExternalLink, ChevronLeft, ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface NavigationProps {
  onStartCoding?: () => void;
  onStartMatch?: () => void;
  onQuestionBank?: () => void;
  onProfile?: () => void;
  onEditProfile?: () => void;
  onContestResult?: () => void;
  onAnnouncements?: () => void;
  onCommunity?: () => void;
  onLeaderboard?: () => void;
  onContests?: () => void;
  onBlog?: () => void;
  onPrivacy?: () => void;
  onTerms?: () => void;
  onDocs?: () => void;
  onSupport?: () => void;
  onHome?: () => void;
}

interface ContestResultPageProps {
  navigationProps: NavigationProps;
  contestId?: string;
  isParticipant?: boolean;
  isAdmin?: boolean;
}

interface Participant {
  rank: number;
  username: string;
  score: number;
  solved: string;
  penalty: string;
  ratingChange: number;
}

interface ProblemResult {
  id: string;
  name: string;
  status: 'solved' | 'unsolved' | 'attempted';
  attempts: number;
  time: string;
}

export function ContestResultPage({ 
  navigationProps, 
  contestId = 'weekly-clash-12',
  isParticipant = true,
  isAdmin = false 
}: ContestResultPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Contest Data
  const contestData = {
    name: 'CodeArena Weekly Clash #12',
    type: 'Rated | Solo',
    date: '12 Sep 2025',
    duration: '2 Hours',
    totalParticipants: 1284,
    difficulty: {
      easy: 1,
      medium: 2,
      hard: 1,
    },
  };

  // Top 3 Performers
  const topPerformers = [
    { rank: 1, username: '@legendCoder', score: 620, penalty: '-30 min', ratingChange: 72 },
    { rank: 2, username: '@byteWarrior', score: 598, penalty: '-18 min', ratingChange: 51 },
    { rank: 3, username: '@codePhantom', score: 582, penalty: '-10 min', ratingChange: 43 },
  ];

  // Full Rankings Data
  const allParticipants: Participant[] = [
    { rank: 1, username: '@legendCoder', score: 620, solved: '4/4', penalty: '-30', ratingChange: 72 },
    { rank: 2, username: '@byteWarrior', score: 598, solved: '4/4', penalty: '-18', ratingChange: 51 },
    { rank: 3, username: '@codePhantom', score: 582, solved: '3/4', penalty: '-10', ratingChange: 43 },
    { rank: 4, username: '@nullPointer', score: 570, solved: '3/4', penalty: '-15', ratingChange: 38 },
    { rank: 5, username: '@arrayMaster', score: 565, solved: '3/4', penalty: '-12', ratingChange: 35 },
    { rank: 142, username: '@meghram_meena', score: 410, solved: '3/4', penalty: '-24', ratingChange: 18 },
    { rank: 143, username: '@coder123', score: 408, solved: '3/4', penalty: '-28', ratingChange: 17 },
    { rank: 144, username: '@devX', score: 405, solved: '2/4', penalty: '-15', ratingChange: 16 },
  ];

  // Personal Performance (if user participated)
  const personalPerformance = {
    rank: 142,
    score: 410,
    solved: '3 / 4',
    ratingChange: 18,
    timeUsed: '1h 42m',
  };

  // Problem-wise breakdown
  const problemResults: ProblemResult[] = [
    { id: 'A', name: 'Array Sum Problem', status: 'solved', attempts: 1, time: '12m' },
    { id: 'B', name: 'Binary Tree Traversal', status: 'solved', attempts: 2, time: '28m' },
    { id: 'C', name: 'Dynamic Programming', status: 'solved', attempts: 1, time: '34m' },
    { id: 'D', name: 'Graph Algorithms', status: 'unsolved', attempts: 3, time: '—' },
  ];

  // Profile Impact
  const profileImpact = {
    streakStatus: 'Streak Maintained: Day 14',
    contestCount: 'Contests Participated: +1',
  };

  // Leaderboard Impact
  const leaderboardImpact = {
    weeklyChange: 5,
    monthlyChange: -2,
    bestRankAchieved: false,
  };

  // Admin Logs
  const adminLogs = [
    { id: '1', action: 'Result published by Admin @admin01', timestamp: '12 Sep 2025, 6:00 PM' },
    { id: '2', action: 'Rejudge triggered for Problem C', timestamp: '12 Sep 2025, 5:45 PM' },
  ];

  const filteredParticipants = allParticipants.filter(p =>
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score;
      case 'rating':
        return b.ratingChange - a.ratingChange;
      default:
        return a.rank - b.rank;
    }
  });

  const totalPages = Math.ceil(sortedParticipants.length / itemsPerPage);
  const paginatedParticipants = sortedParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'border-yellow-500 bg-yellow-500/10';
    if (rank === 2) return 'border-gray-400 bg-gray-400/10';
    if (rank === 3) return 'border-amber-600 bg-amber-600/10';
    return 'border-[#00FFFF]/20 bg-[#1A1A1A]/80';
  };

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Navbar {...navigationProps} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <button 
              onClick={navigationProps.onHome}
              className="text-[#00FFFF] hover:underline"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <button 
              onClick={navigationProps.onContests}
              className="text-[#00FFFF] hover:underline"
            >
              Contests
            </button>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-white/60">Results</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-white flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
              🏁 Contest Results
            </h1>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={navigationProps.onContests}
                className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Contests
              </Button>
              <Button
                variant="outline"
                onClick={navigationProps.onLeaderboard}
                className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Leaderboard
              </Button>
            </div>
          </div>
        </div>

        {/* Contest Summary */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-2xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              {contestData.name}
            </CardTitle>
            <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {contestData.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  DATE
                </p>
                <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {contestData.date}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  DURATION
                </p>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#00FFFF]" />
                  <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {contestData.duration}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  PARTICIPANTS
                </p>
                <p className="text-white text-xl" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  {contestData.totalParticipants.toLocaleString()}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  DIFFICULTY MIX
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-green-500/20 text-green-400">
                    Easy ×{contestData.difficulty.easy}
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    Medium ×{contestData.difficulty.medium}
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-400">
                    Hard ×{contestData.difficulty.hard}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers Podium */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Trophy className="w-5 h-5 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topPerformers.map((performer) => (
                <Card 
                  key={performer.rank}
                  className={`${getRankColor(performer.rank)} cursor-pointer hover:border-opacity-60 transition-colors`}
                >
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">{getRankMedal(performer.rank)}</div>
                      <h3 className="text-xl text-white mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                        Rank {performer.rank}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          USERNAME
                        </p>
                        <p 
                          className="text-[#00FFFF] hover:underline cursor-pointer" 
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          onClick={navigationProps.onProfile}
                        >
                          {performer.username}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          SCORE
                        </p>
                        <p className="text-white text-2xl" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                          {performer.score}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          TIME PENALTY
                        </p>
                        <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {performer.penalty}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          RATING CHANGE
                        </p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <p className="text-green-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            +{performer.ratingChange}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Complete Standings */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Target className="w-5 h-5 text-[#00FFFF]" />
                Complete Standings
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[#0A0F1C] border-[#00FFFF]/30 text-white w-full sm:w-[200px]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[140px] bg-[#0A0F1C] border-[#00FFFF]/30 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/30">
                    <SelectItem value="rank">Sort by Rank</SelectItem>
                    <SelectItem value="score">Sort by Score</SelectItem>
                    <SelectItem value="rating">Sort by Rating Δ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Rankings Table */}
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs text-white/60 py-3 px-2">RANK</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">USER</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">SCORE</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">SOLVED</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">PENALTY</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">RATING Δ</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedParticipants.map((participant) => (
                    <tr 
                      key={participant.rank}
                      className={`border-b border-white/5 hover:bg-[#00FFFF]/5 transition-colors ${
                        participant.username === '@meghram_meena' ? 'bg-[#00FFFF]/10' : ''
                      }`}
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {getRankMedal(participant.rank) && (
                            <span className="text-lg">{getRankMedal(participant.rank)}</span>
                          )}
                          <span className={
                            participant.rank <= 10 ? 'text-yellow-500' :
                            participant.rank <= 50 ? 'text-green-500' :
                            'text-white/80'
                          }>
                            #{participant.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span 
                          className="text-[#00FFFF] hover:underline cursor-pointer"
                          onClick={navigationProps.onProfile}
                        >
                          {participant.username}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-white">{participant.score}</td>
                      <td className="py-3 px-2 text-white">{participant.solved}</td>
                      <td className="py-3 px-2 text-white/60">{participant.penalty}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          {participant.ratingChange > 0 ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="text-green-500">+{participant.ratingChange}</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-red-500" />
                              <span className="text-red-500">{participant.ratingChange}</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, sortedParticipants.length)} of {sortedParticipants.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="border-[#00FFFF]/30 text-white disabled:opacity-50"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="border-[#00FFFF]/30 text-white disabled:opacity-50"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scoring & Rating Breakdown */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              📐 Scoring & Rating Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div>
              <h4 className="text-white mb-2">Score Calculation:</h4>
              <p className="text-white/70 text-sm">
                Score = Base Points - Time Penalty - Wrong Submissions
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h4 className="text-white mb-2">Points per Problem:</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Easy: 100 base points</li>
                <li>• Medium: 200 base points</li>
                <li>• Hard: 300 base points</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h4 className="text-white mb-2">Penalties:</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Time Penalty: -1 point per minute used</li>
                <li>• Wrong Submission: -10 points per attempt</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h4 className="text-white mb-2">Rating Algorithm:</h4>
              <p className="text-white/70 text-sm">
                Rating updated using <span className="text-[#00FFFF]">CodeArena Rated Formula v2</span>
              </p>
              <p className="text-white/50 text-xs mt-1">
                Based on performance relative to expected rank
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Performance Summary */}
        {isParticipant && (
          <>
            <Card className="bg-gradient-to-br from-[#00FFFF]/10 to-[#9333EA]/10 border-[#00FFFF]/30 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  👤 Your Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      FINAL RANK
                    </p>
                    <p className="text-3xl text-[#00FFFF]" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      #{personalPerformance.rank}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      SCORE
                    </p>
                    <p className="text-3xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {personalPerformance.score}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      PROBLEMS SOLVED
                    </p>
                    <p className="text-3xl text-green-500" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {personalPerformance.solved}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      RATING CHANGE
                    </p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                      <p className="text-3xl text-green-500" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                        +{personalPerformance.ratingChange}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      TIME USED
                    </p>
                    <p className="text-2xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {personalPerformance.timeUsed}
                    </p>
                  </div>
                </div>

                {/* Problem-wise Breakdown */}
                <div>
                  <h4 className="text-white mb-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                    Problem-wise Breakdown
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-xs text-white/60 py-2 px-2">PROBLEM</th>
                          <th className="text-left text-xs text-white/60 py-2 px-2">STATUS</th>
                          <th className="text-left text-xs text-white/60 py-2 px-2">ATTEMPTS</th>
                          <th className="text-left text-xs text-white/60 py-2 px-2">TIME</th>
                          <th className="text-left text-xs text-white/60 py-2 px-2">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {problemResults.map((problem) => (
                          <tr key={problem.id} className="border-b border-white/5">
                            <td className="py-3 px-2">
                              <div>
                                <span className="text-white font-medium">{problem.id}</span>
                                <p className="text-xs text-white/60">{problem.name}</p>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              {problem.status === 'solved' ? (
                                <div className="flex items-center gap-1 text-green-500">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Solved</span>
                                </div>
                              ) : problem.status === 'attempted' ? (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span>Attempted</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-red-500">
                                  <XCircle className="w-4 h-4" />
                                  <span>Unsolved</span>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-2 text-white">{problem.attempts}</td>
                            <td className="py-3 px-2 text-white">{problem.time}</td>
                            <td className="py-3 px-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Impact */}
            <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Flame className="w-5 h-5 text-orange-500" />
                  Profile Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-white">{profileImpact.streakStatus}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-white">{profileImpact.contestCount}</span>
                </div>

                <Alert className="bg-[#00FFFF]/5 border-[#00FFFF]/30 mt-3">
                  <AlertDescription className="text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    This contest has been added to your profile history and AI insights dataset.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Leaderboard Impact */}
            <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Leaderboard Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        WEEKLY RANK CHANGE
                      </p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <p className="text-2xl text-green-500" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                          +{leaderboardImpact.weeklyChange}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        MONTHLY RANK CHANGE
                      </p>
                      <div className="flex items-center gap-1">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                        <p className="text-2xl text-red-500" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                          {leaderboardImpact.monthlyChange}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={navigationProps.onLeaderboard}
                    className="w-full bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/40 hover:bg-[#00FFFF]/30"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    View Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Contest Insights */}
            <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Brain className="w-5 h-5 text-purple-500" />
                  AI Contest Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-white/80">
                      You performed strongly in medium difficulty problems
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm text-white/80">
                      Lost time in debugging hard constraints
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#00FFFF] mt-0.5" />
                    <p className="text-sm text-white/80">
                      Suggested focus: Practice graph algorithms under time pressure
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <>
            <Card className="bg-[#1A1A1A]/80 border-red-500/30 mb-6">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <AlertTriangle className="w-5 h-5" />
                  Admin Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    variant="outline"
                    className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Rejudge
                  </Button>

                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Disqualify
                  </Button>

                  <Button
                    variant="outline"
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Plagiarism
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Logs */}
            <Card className="bg-[#1A1A1A]/80 border-red-500/30 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <FileText className="w-5 h-5 text-red-500" />
                  Admin Audit Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {adminLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#0A0F1C]/50 border border-white/5"
                    >
                      <p className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {log.action}
                      </p>
                      <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {log.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}