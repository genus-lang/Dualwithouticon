import { useState, useEffect } from 'react';
import { 
  Clock, 
  HelpCircle, 
  LogOut, 
  Trophy, 
  Pause, 
  Lock, 
  StopCircle, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  Circle,
  X,
  History,
  Code2
} from 'lucide-react';

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

interface MatchPageProps {
  navigationProps: NavigationProps;
}

interface Problem {
  id: string;
  code: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  score: number;
  solvedCount: number;
  totalParticipants: number;
  userCount: number;
  status: 'Solved' | 'Attempted' | 'Not Started';
  isLocked: boolean;
  description?: string;
}

const MOCK_PROBLEMS: Problem[] = [
  {
    id: '1',
    code: 'A',
    title: 'Two Sum',
    difficulty: 'Easy',
    score: 100,
    solvedCount: 7,
    totalParticipants: 18,
    userCount: 842,
    status: 'Solved',
    isLocked: true,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
  },
  {
    id: '2',
    code: 'B',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    score: 200,
    solvedCount: 4,
    totalParticipants: 18,
    userCount: 421,
    status: 'Attempted',
    isLocked: true
  },
  {
    id: '3',
    code: 'C',
    title: 'Grid Paths',
    difficulty: 'Hard',
    score: 300,
    solvedCount: 2,
    totalParticipants: 18,
    userCount: 89,
    status: 'Not Started',
    isLocked: true
  },
  {
    id: '4',
    code: 'D',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    score: 300,
    solvedCount: 1,
    totalParticipants: 18,
    userCount: 156,
    status: 'Not Started',
    isLocked: true
  }
];

// Leaderboard Data
const LEADERBOARD_DATA = [
  { rank: 1, user: '@legend', score: 320, solved: 2, penalty: -10, isCurrentUser: false },
  { rank: 2, user: '@meghram', score: 300, solved: 2, penalty: -15, isCurrentUser: true },
  { rank: 3, user: '@ayush', score: 200, solved: 1, penalty: -5, isCurrentUser: false },
  { rank: 4, user: '@coder99', score: 100, solved: 1, penalty: 0, isCurrentUser: false },
  { rank: 5, user: '@rookie', score: 0, solved: 0, penalty: 0, isCurrentUser: false },
];

export function MatchPage({ navigationProps }: MatchPageProps) {
  const [timeLeft, setTimeLeft] = useState(6138);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [adminConfirmation, setAdminConfirmation] = useState<'pause' | 'lock' | 'end' | null>(null);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Hard': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Solved': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'Attempted': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };

  // Helper to render admin confirmation content
  const renderAdminConfirmation = () => {
    if (!adminConfirmation) return null;

    const config = {
      pause: {
        color: 'text-yellow-500',
        borderColor: 'border-yellow-500',
        bgButton: 'bg-yellow-600 hover:bg-yellow-500',
        text: 'Are you sure you want to pause the contest? This action will be logged.',
        btnText: 'Pause Contest'
      },
      lock: {
        color: 'text-orange-500',
        borderColor: 'border-orange-500',
        bgButton: 'bg-orange-600 hover:bg-orange-500',
        text: 'Are you sure you want to lock the contest? Participants will not be able to submit.',
        btnText: 'Lock Contest'
      },
      end: {
        color: 'text-red-500',
        borderColor: 'border-red-500',
        bgButton: 'bg-red-600 hover:bg-red-500',
        text: 'Are you sure you want to end the contest? This action cannot be undone.',
        btnText: 'End Contest'
      }
    };

    const activeConfig = config[adminConfirmation];

    return (
      <div className="mt-4 flex items-center justify-between bg-black/20 p-4 rounded-lg border-l-2 border-[#3a3a3a]">
        <div className="flex items-center gap-4">
          <div className={`w-1 h-10 ${activeConfig.borderColor} border-l-2 rounded-full`}></div>
          <p className="text-gray-300 text-sm">{activeConfig.text}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className={`px-4 py-1.5 ${activeConfig.bgButton} text-white text-sm font-medium rounded shadow-sm transition-colors`}
            onClick={() => setAdminConfirmation(null)} // Mock action
          >
            Confirm
          </button>
          <button 
            onClick={() => setAdminConfirmation(null)}
            className="px-4 py-1.5 bg-[#333] hover:bg-[#444] text-gray-300 text-sm font-medium rounded border border-[#4a4a4a] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-300 font-sans flex flex-col relative">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#3a3a3a] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium text-white">Weekly Clash – Room A9X3QZ</h1>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full border border-blue-500/20 font-medium">
            Rated
          </span>
        </div>

        <div className="flex flex-col items-center bg-[#262626] px-6 py-2 rounded-lg border border-[#3a3a3a]">
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Time Remaining</span>
          <div className="text-xl font-mono text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowLeaderboard(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#262626] hover:bg-[#333] border border-[#3a3a3a] rounded-lg text-yellow-500 transition-colors"
          >
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">View Leaderboard</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-[#262626] hover:bg-[#333] border border-[#3a3a3a] rounded-lg text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Help</span>
          </button>

          <button 
            onClick={navigationProps.onHome}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Leave</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 pb-24">
        
        {/* Admin Controls Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-500">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Admin Controls</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setAdminConfirmation(adminConfirmation === 'pause' ? null : 'pause')}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${adminConfirmation === 'pause' ? 'bg-yellow-600 text-white border-yellow-600' : 'border-yellow-600/50 text-yellow-600 hover:bg-yellow-600/10'}`}
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
              <button 
                onClick={() => setAdminConfirmation(adminConfirmation === 'lock' ? null : 'lock')}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${adminConfirmation === 'lock' ? 'bg-orange-600 text-white border-orange-600' : 'border-orange-600/50 text-orange-600 hover:bg-orange-600/10'}`}
              >
                <Lock className="w-4 h-4" />
                Lock
              </button>
              <button 
                onClick={() => setAdminConfirmation(adminConfirmation === 'end' ? null : 'end')}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${adminConfirmation === 'end' ? 'bg-red-600 text-white border-red-600' : 'border-red-600/50 text-red-600 hover:bg-red-600/10'}`}
              >
                <StopCircle className="w-4 h-4" />
                End
              </button>
            </div>
          </div>
          
          {/* Expanded Confirmation Area */}
          {renderAdminConfirmation()}
        </div>

        {/* Problems Table */}
        <div className="bg-[#262626] rounded-xl border border-[#3a3a3a] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#3a3a3a] flex items-center justify-between">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-500" />
              Problems <span className="text-gray-500 text-sm ml-2 font-normal">4 total</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#3a3a3a] text-gray-500 text-sm">
                  <th className="px-6 py-4 font-medium w-16">Code</th>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Difficulty</th>
                  <th className="px-6 py-4 font-medium">Score</th>
                  <th className="px-6 py-4 font-medium">Solved By</th>
                  <th className="px-6 py-4 font-medium">Your Status</th>
                  <th className="px-6 py-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3a3a3a]">
                {MOCK_PROBLEMS.map((problem) => (
                  <tr key={problem.id} className="hover:bg-[#2c2c2c] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded bg-[#333] flex items-center justify-center text-gray-400 text-sm font-medium">
                        {problem.code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedProblem(problem)}
                        className="text-white font-medium hover:text-blue-400 cursor-pointer transition-colors text-left"
                      >
                        {problem.title}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {problem.score}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-gray-300 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" />
                          <span>{problem.solvedCount} / {problem.totalParticipants}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 ${problem.status === 'Solved' ? 'text-green-500' : problem.status === 'Attempted' ? 'text-yellow-500' : 'text-gray-500'}`}>
                        {getStatusIcon(problem.status)}
                        <span className="text-sm font-medium">{problem.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedProblem(problem)}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors w-24"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#1f1f1f] border-t border-[#3a3a3a] px-8 py-3 z-50 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-sm">Solved: <span className="text-white font-medium">1/4</span></span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Trophy className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Score: <span className="text-white font-medium">200</span></span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-sm">Penalty: <span className="text-orange-500 font-medium">-18</span></span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-sm font-medium">Rank: #2</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Time Left: <span className="text-white font-mono">{formatTime(timeLeft)}</span></span>
          </div>
        </div>
      </footer>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[600px] bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3a3a3a]">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Leaderboard
              </h2>
              <button 
                onClick={() => setShowLeaderboard(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-0">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#3a3a3a] text-sm text-gray-500 font-medium bg-[#222]">
                <div className="col-span-2">Rank</div>
                <div className="col-span-4">User</div>
                <div className="col-span-2">Score</div>
                <div className="col-span-2">Solved</div>
                <div className="col-span-2">Penalty</div>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {LEADERBOARD_DATA.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#3a3a3a] text-sm items-center ${entry.isCurrentUser ? 'bg-blue-500/10' : 'hover:bg-[#222]'}`}
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      {entry.rank === 1 && <Trophy className="w-4 h-4 text-yellow-400" />}
                      {entry.rank === 2 && <Trophy className="w-4 h-4 text-gray-300" />}
                      {entry.rank === 3 && <Trophy className="w-4 h-4 text-orange-400" />}
                      <span className={`font-mono ${entry.rank <= 3 ? 'font-bold text-white' : 'text-gray-500'}`}>#{entry.rank}</span>
                    </div>
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-white font-medium">{entry.user}</span>
                      {entry.isCurrentUser && (
                        <span className="px-1.5 py-0.5 bg-blue-500 text-[10px] text-white rounded font-medium">You</span>
                      )}
                    </div>
                    <div className="col-span-2 text-blue-400 font-mono font-medium">{entry.score}</div>
                    <div className="col-span-2 flex items-center gap-1.5 text-green-500 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {entry.solved}
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-orange-500 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {entry.penalty}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 bg-[#222] border-t border-[#3a3a3a] text-center">
              <span className="text-xs text-gray-500">Updates automatically during contest</span>
            </div>
          </div>
        </div>
      )}

      {/* Problem Details Modal */}
      {selectedProblem && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3a3a3a] bg-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-mono text-lg">Problem {selectedProblem.code}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>
              <button 
                onClick={() => setSelectedProblem(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{selectedProblem.title}</h1>
              <p className="text-gray-500 text-sm mb-6">Max Score: {selectedProblem.score} points</p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Problem Statement</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProblem.description || "No description available for this problem."}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Constraints</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 font-mono text-sm">
                    <li>2 ≤ nums.length ≤ 10^4</li>
                    <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                    <li>-10^9 ≤ target ≤ 10^9</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Sample Test Case</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-xs text-gray-500">Input</span>
                      <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-3 font-mono text-sm text-gray-300">
                        [2,7,11,15]<br/>9
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs text-gray-500">Output</span>
                      <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-3 font-mono text-sm text-gray-300">
                        [0,1]
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-gray-500 font-mono pt-2">
                  <span>Time Limit: <span className="text-gray-300">2s</span></span>
                  <span>Memory Limit: <span className="text-gray-300">256 MB</span></span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#3a3a3a] bg-[#1f1f1f] flex items-center justify-between">
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => {
                     navigationProps.onStartCoding();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4" />
                  Start Solving
                </button>
                <button className="px-6 py-2.5 bg-[#2a2a2a] hover:bg-[#333] text-gray-300 border border-[#3a3a3a] rounded-lg transition-colors flex items-center gap-2 font-medium">
                  <History className="w-4 h-4" />
                  My Submissions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
