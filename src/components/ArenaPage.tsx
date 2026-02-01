import { useState, useEffect, useRef } from 'react';
import { Resizable } from 're-resizable';
import { 
  ArrowLeft, 
  Clock, 
  Settings, 
  Maximize2, 
  Minimize2,
  Play, 
  Send, 
  ChevronDown, 
  RotateCcw,
  Copy,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock3,
  List,
  MessageSquare,
  BarChart2,
  FileText,
  X,
  ChevronRight,
  MoreVertical,
  Download,
  Upload,
  Moon,
  Sun,
  Sidebar,
  Trash2,
  Terminal,
  Code2,
  Eye,
  ThumbsUp,
  MessageCircle,
  Trophy
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

interface ArenaPageProps {
  navigationProps: NavigationProps;
}

type TabType = 'problem' | 'submissions' | 'editorial' | 'discussion' | 'stats';
type Verdict = 'AC' | 'WA' | 'TLE' | 'RTE' | 'CE' | 'PENDING' | null;

interface Submission {
  id: string;
  time: string;
  verdict: Verdict;
  memory: string;
  runtime: string;
  language: string;
}

const MOCK_SUBMISSIONS: Submission[] = [
  { id: '1', time: '10:22 AM', verdict: 'WA', memory: '14.2 MB', runtime: '124 ms', language: 'C++' },
  { id: '2', time: '10:30 AM', verdict: 'AC', memory: '14.5 MB', runtime: '45 ms', language: 'C++' },
  { id: '3', time: '10:41 AM', verdict: 'TLE', memory: '14.2 MB', runtime: '>2000 ms', language: 'Python3' },
  { id: '4', time: '10:45 AM', verdict: 'AC', memory: '14.1 MB', runtime: '38 ms', language: 'C++' },
  { id: '5', time: '10:48 AM', verdict: 'RTE', memory: 'N/A', runtime: 'N/A', language: 'Java' },
];

const BOILERPLATES: Record<string, string> = {
  'C++': `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
  'Java': `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
  'Python3': `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
  'JavaScript': `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`
};

export function ArenaPage({ navigationProps }: ArenaPageProps) {
  // Layout State
  const [leftWidth, setLeftWidth] = useState('35%');
  const [editorHeight, setEditorHeight] = useState('70%');
  const [isProblemPanelVisible, setIsProblemPanelVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('problem');
  
  // App State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeProblem, setActiveProblem] = useState('A');
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown
  const [isContestEnded, setIsContestEnded] = useState(false);
  
  // Editor State
  const [code, setCode] = useState<string>(BOILERPLATES['C++']);
  const [language, setLanguage] = useState('C++');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [hasRunCode, setHasRunCode] = useState(false);
  
  // Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [customInputVisible, setCustomInputVisible] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // UI Modals & Feedback
  const [showExitModal, setShowExitModal] = useState(false);
  const [showLeaveContestModal, setShowLeaveContestModal] = useState(false);
  const [showLangWarning, setShowLangWarning] = useState(false);
  const [pendingLang, setPendingLang] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Timer Logic
  useEffect(() => {
    if (timeLeft === 0 && !isContestEnded) {
      setIsContestEnded(true);
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        navigationProps.onContestResult();
      }, 3000);
      return;
    }

    if (isContestEnded) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isContestEnded, navigationProps]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isContestEnded) return; // Disable shortcuts when ended

      // Run: Ctrl + Enter
      if (e.ctrlKey && e.key === 'Enter' && !e.shiftKey) {
        handleRun();
      }
      // Submit: Ctrl + Shift + Enter
      if (e.ctrlKey && e.shiftKey && e.key === 'Enter') {
        handleSubmitCheck();
      }
      // Toggle Sidebar: Ctrl + B
      if (e.ctrlKey && e.key === 'b') {
        setIsProblemPanelVisible(prev => !prev);
      }
      // Fullscreen / Modal Close: Escape
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        setShowExitModal(false);
        setShowLeaveContestModal(false);
        setShowLangWarning(false);
        setShowResetModal(false);
        setShowSubmitWarning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, isContestEnded, code, language, activeProblem]);

  // Timer Colors
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-red-500 animate-pulse';
    if (timeLeft <= 30) return 'text-orange-500';
    return theme === 'dark' ? 'text-white' : 'text-gray-800';
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Actions
  const handleBack = () => {
    if (unsavedChanges) {
      setShowExitModal(true);
    } else {
      navigationProps.onStartMatch();
    }
  };

  const handleProblemSwitch = (newProblem: string) => {
    setActiveProblem(newProblem);
    setUnsavedChanges(false);
    showToast(`Switched to Problem ${newProblem}`);
  };

  const handleLanguageChange = (newLang: string) => {
    if (code !== BOILERPLATES[language] && code.trim().length > 0) {
      setPendingLang(newLang);
      setShowLangWarning(true);
    } else {
      setLanguage(newLang);
      setCode(BOILERPLATES[newLang]);
    }
  };

  const confirmLanguageChange = () => {
    if (pendingLang) {
      setLanguage(pendingLang);
      setCode(BOILERPLATES[pendingLang]);
      setPendingLang(null);
      setShowLangWarning(false);
    }
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    setCode(BOILERPLATES[language]);
    setOutput(null);
    setVerdict(null);
    setShowResetModal(false);
    setUnsavedChanges(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copied");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setVerdict('PENDING');
    setOutput(null);
    
    setTimeout(() => {
      setIsRunning(false);
      setOutput(`> Running on test cases...
Input: [2,7,11,15], 9
Output: [0,1]
Expected: [0,1]

Runtime: 32ms
Memory: 14.1MB`);
      setVerdict(null);
      setHasRunCode(true);
    }, 1200);
  };

  const handleSubmitCheck = () => {
    if (!hasRunCode) {
      setShowSubmitWarning(true);
    } else {
      performSubmit();
    }
  };

  const performSubmit = () => {
    setShowSubmitWarning(false);
    setIsSubmitting(true);
    setVerdict('PENDING');

    setTimeout(() => {
      setIsSubmitting(false);
      setVerdict('AC');
      setActiveTab('submissions');
    }, 2000);
  };

  const getVerdictColor = (v: Verdict) => {
    switch (v) {
      case 'AC': return 'text-green-500';
      case 'WA': return 'text-red-500';
      case 'TLE': return 'text-orange-500';
      case 'RTE': return 'text-purple-500';
      case 'CE': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  // Render Tabs Content
  const renderLeftPanelContent = () => {
    switch (activeTab) {
      case 'problem':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
             <div className="flex items-center justify-between">
                <h1 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>1. Two Sum</h1>
                <div className="flex gap-2">
                   <span className="px-1.5 py-0.5 rounded border text-[10px] font-medium bg-green-500/10 text-green-500 border-green-500/20">Easy</span>
                </div>
             </div>

             <div className={`prose max-w-none text-xs leading-normal ${theme === 'dark' ? 'prose-invert text-gray-300' : 'text-gray-700'}`}>
                <p>Given an array of integers <code className="bg-white/5 px-1 rounded font-mono">nums</code> and an integer <code className="bg-white/5 px-1 rounded font-mono">target</code>, return indices of the two numbers such that they add up to <code className="bg-white/5 px-1 rounded font-mono">target</code>.</p>
                <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
                <p>You can return the answer in any order.</p>
             </div>

             <div className="space-y-3">
                {[
                  { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
                  { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: null },
                  { input: "nums = [3,3], target = 6", output: "[0,1]", explanation: null },
                ].map((sample, idx) => (
                  <div key={idx} className={`rounded border overflow-hidden ${theme === 'dark' ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
                     <div className={`flex items-center justify-between px-2 py-1 border-b ${theme === 'dark' ? 'border-[#333]' : 'border-gray-200'}`}>
                        <span className="text-[10px] font-medium opacity-70">Example {idx + 1}</span>
                        <button onClick={() => handleCopy(sample.input)} className="text-[10px] opacity-50 hover:opacity-100"><Copy className="w-2.5 h-2.5" /></button>
                     </div>
                     <div className="p-2 space-y-2">
                        <div>
                           <div className="text-[10px] opacity-50 uppercase mb-0.5">Input</div>
                           <code className="text-xs font-mono opacity-90">{sample.input}</code>
                        </div>
                        <div>
                           <div className="text-[10px] opacity-50 uppercase mb-0.5">Output</div>
                           <code className="text-xs font-mono opacity-90">{sample.output}</code>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="pt-2">
                <div className="text-[10px] opacity-50 uppercase font-bold mb-2">Constraints</div>
                <ul className="list-disc list-inside text-xs opacity-80 space-y-1 font-mono">
                   <li>2 ≤ nums.length ≤ 10^4</li>
                   <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                   <li>-10^9 ≤ target ≤ 10^9</li>
                   <li>Only one valid answer exists.</li>
                </ul>
             </div>
          </div>
        );
      case 'submissions':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
             <table className="w-full text-left text-xs">
                <thead>
                   <tr className={`border-b ${theme === 'dark' ? 'border-[#333] text-gray-500' : 'border-gray-200 text-gray-500'}`}>
                      <th className="py-2 font-medium">Verdict</th>
                      <th className="py-2 font-medium">Time</th>
                      <th className="py-2 font-medium">Runtime</th>
                      <th className="py-2 font-medium">Memory</th>
                   </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-[#333]' : 'divide-gray-100'}`}>
                   {MOCK_SUBMISSIONS.map((sub) => (
                      <tr key={sub.id} className="group cursor-pointer hover:bg-white/5 transition-colors">
                         <td className={`py-2 font-bold ${getVerdictColor(sub.verdict)}`}>{sub.verdict}</td>
                         <td className="py-2 opacity-70">{sub.time}</td>
                         <td className="py-2 opacity-70 font-mono">{sub.runtime}</td>
                         <td className="py-2 opacity-70 font-mono">{sub.memory}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        );
      case 'discussion':
        return (
           <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className={`p-3 rounded border text-xs ${theme === 'dark' ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">@algorithm_god</span>
                    <span className="opacity-50 text-[10px]">2 hours ago</span>
                 </div>
                 <p className="opacity-80">Does anyone know if the hash map approach is O(n) or O(n log n) in C++? I keep getting TLE on test case 45.</p>
                 <div className="flex gap-3 mt-2 opacity-60">
                    <button className="flex items-center gap-1 hover:text-blue-500"><ThumbsUp className="w-3 h-3" /> 12</button>
                    <button className="flex items-center gap-1 hover:text-blue-500"><MessageCircle className="w-3 h-3" /> Reply</button>
                 </div>
              </div>
           </div>
        );
      case 'editorial':
         return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200 text-xs">
               <div className={`p-2 rounded border-l-2 border-blue-500 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <h3 className="font-bold mb-1">Approach 1: Brute Force</h3>
                  <p className="opacity-80">Loop through each element and find if there is another value that equals to target - x.</p>
                  <div className="mt-2 font-mono text-[10px] opacity-70">Time: O(n²) | Space: O(1)</div>
               </div>
            </div>
         );
      case 'stats':
         return (
            <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
               <div className={`p-3 rounded border text-center ${theme === 'dark' ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-[10px] opacity-50 uppercase mb-1">Acceptance</div>
                  <div className="text-lg font-bold text-green-500">48.2%</div>
               </div>
               <div className={`p-3 rounded border text-center ${theme === 'dark' ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-[10px] opacity-50 uppercase mb-1">Submissions</div>
                  <div className="text-lg font-bold">12.4M</div>
               </div>
            </div>
         );
    }
  };

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#1a1a1a] text-gray-300' : 'bg-white text-gray-800'} overflow-hidden font-sans transition-colors duration-0`}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #666; }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      
      {/* 1. TOP BAR */}
      {!isFullscreen && (
        <header className={`h-10 ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-2 shrink-0`}>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleBack}
              className={`p-1 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-px">
              {['A', 'B', 'C', 'D'].map((prob) => (
                <button
                  key={prob}
                  onClick={() => handleProblemSwitch(prob)}
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                    activeProblem === prob 
                      ? 'bg-blue-600 text-white' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:bg-[#333] hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {prob}
                  {prob === 'A' && <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-green-500 rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex items-center gap-2 px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
            <Clock className={`w-3 h-3 ${getTimerColor()}`} />
            <span className={`font-mono text-sm font-bold tracking-wider ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <button 
             onClick={() => setShowLeaveContestModal(true)}
             className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded text-[10px] font-bold uppercase tracking-wide transition-colors"
           >
             Leave
           </button>
        </header>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL */}
        <AnimatePresence mode='wait'>
          {isProblemPanelVisible && (
            <Resizable
              size={{ width: leftWidth, height: '100%' }}
              onResizeStop={(e, direction, ref, d) => setLeftWidth(leftWidth + d.width)}
              minWidth="20%"
              maxWidth="60%"
              enable={{ right: true }}
              className={`border-r ${theme === 'dark' ? 'border-[#333] bg-[#1a1a1a]' : 'border-gray-200 bg-white'} flex flex-col z-10`}
              handleClasses={{ right: "w-1 hover:bg-blue-600 transition-colors z-50 cursor-col-resize opacity-0 hover:opacity-100" }}
            >
              <div className={`flex items-center gap-1 px-2 border-b h-9 ${theme === 'dark' ? 'border-[#333] bg-[#1a1a1a]' : 'border-gray-200 bg-white'}`}>
                {[
                  { id: 'problem', icon: FileText, label: 'Description' },
                  { id: 'submissions', icon: List, label: 'Submissions' },
                  { id: 'discussion', icon: MessageSquare, label: 'Discussion' },
                  { id: 'editorial', icon: Code2, label: 'Editorial' },
                  { id: 'stats', icon: BarChart2, label: 'Stats' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-1.5 px-3 h-full text-[11px] font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-500'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                {renderLeftPanelContent()}
              </div>
            </Resizable>
          )}
        </AnimatePresence>
        
        {!isProblemPanelVisible && (
          <div className="absolute top-2 left-2 z-20">
             <button 
               onClick={() => setIsProblemPanelVisible(true)}
               className={`p-1 rounded shadow border ${theme === 'dark' ? 'bg-[#222] text-gray-400 border-[#333]' : 'bg-white text-gray-600 border-gray-200'}`}
             >
               <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        )}

        {/* RIGHT PANEL */}
        <div className={`flex-1 flex flex-col min-w-0 ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
          <div className={`h-9 ${theme === 'dark' ? 'bg-[#262626] border-[#333]' : 'bg-gray-100 border-gray-200'} border-b flex items-center justify-between px-2 shrink-0`}>
             <div className="flex items-center gap-2">
                {!isProblemPanelVisible && <span className="text-xs font-bold pl-2">1. Two Sum</span>}
             </div>

             <div className="flex items-center gap-3">
                <div className="relative group">
                  <button className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                    {language}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </button>
                  <div className={`absolute top-full right-0 mt-1 w-24 py-1 rounded shadow-xl hidden group-hover:block z-50 border ${theme === 'dark' ? 'bg-[#333] border-[#444]' : 'bg-white border-gray-200'}`}>
                    {Object.keys(BOILERPLATES).map(l => (
                      <button 
                        key={l}
                        onClick={() => handleLanguageChange(l)}
                        className={`w-full text-left px-3 py-1 text-[10px] ${theme === 'dark' ? 'text-gray-300 hover:bg-[#444] hover:text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                  className={`text-gray-500 hover:text-white transition-colors`}
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>

                <button 
                  onClick={handleReset}
                  className={`text-gray-500 hover:text-white transition-colors`}
                  title="Reset Code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`text-gray-500 hover:text-white transition-colors`} 
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
             </div>
          </div>

          <Resizable
            size={{ width: '100%', height: editorHeight }}
            onResizeStop={(e, direction, ref, d) => setEditorHeight(editorHeight + d.height)}
            minHeight="20%"
            maxHeight="90%"
            enable={{ bottom: true }}
            className="relative flex flex-col"
            handleClasses={{ bottom: "h-1 hover:bg-blue-600 transition-colors z-30 cursor-row-resize" }}
          >
            <div className="flex-1 relative flex overflow-hidden">
              <div 
                ref={lineNumbersRef}
                className={`w-8 text-right pr-2 pt-3 font-mono text-[11px] select-none overflow-hidden ${theme === 'dark' ? 'bg-[#1e1e1e] border-r border-[#333] text-gray-600' : 'bg-white border-r border-gray-200 text-gray-400'}`}
              >
                {lineNumbers.map(n => <div key={n} className="leading-5">{n}</div>)}
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => { setCode(e.target.value); setUnsavedChanges(true); }}
                onScroll={handleScroll}
                className={`flex-1 p-3 font-mono text-[13px] resize-none outline-none border-none leading-5 w-full h-full custom-scrollbar ${theme === 'dark' ? 'bg-[#1e1e1e] text-gray-300 placeholder-gray-700' : 'bg-white text-gray-800 placeholder-gray-300'}`}
                spellCheck={false}
              />
            </div>
          </Resizable>

          <div className={`flex-1 flex flex-col min-h-0 ${theme === 'dark' ? 'bg-[#1a1a1a] border-t border-[#333]' : 'bg-gray-50 border-t border-gray-200'}`}>
            <div className={`h-8 border-b px-2 flex items-center justify-between shrink-0 ${theme === 'dark' ? 'border-[#333] bg-[#222]' : 'border-gray-200 bg-gray-100'}`}>
              <div className="flex items-center gap-2">
                 <button onClick={() => setCustomInputVisible(!customInputVisible)} className={`flex items-center gap-1 text-[10px] font-medium ${customInputVisible ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'}`}>
                    <Terminal className="w-3 h-3" /> Testcase
                 </button>
                 <div className="w-[1px] h-3 bg-gray-600/50" />
                 <button onClick={() => { setOutput(null); setVerdict(null); }} className="text-[10px] font-medium text-gray-500 hover:text-gray-300">
                    Result
                 </button>
              </div>
              
              {verdict && (
                 <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded ${getVerdictColor(verdict)} bg-current/10`}>
                    {verdict === 'AC' && <CheckCircle2 className="w-3 h-3" />}
                    {verdict === 'WA' && <XCircle className="w-3 h-3" />}
                    {verdict === 'PENDING' ? 'Running...' : verdict === 'AC' ? 'Accepted' : verdict}
                 </div>
              )}
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
               {customInputVisible ? (
                  <div className="flex-1 p-2">
                     <textarea 
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        className={`w-full h-full resize-none p-2 font-mono text-xs rounded border outline-none ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#333] text-gray-300' : 'bg-white border-gray-200 text-gray-800'}`}
                        placeholder="Enter custom testcase..."
                     />
                  </div>
               ) : (
                  <div className="flex-1 p-3 overflow-y-auto font-mono text-xs custom-scrollbar">
                     {isRunning || isSubmitting ? (
                        <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500 opacity-60">
                           <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                           <span className="text-[10px] font-medium uppercase tracking-wider">Processing</span>
                        </div>
                     ) : output ? (
                        <pre className={`whitespace-pre-wrap leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{output}</pre>
                     ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-[10px] uppercase tracking-wider opacity-30 select-none">
                           Run code to see output
                        </div>
                     )}
                  </div>
               )}
               
               <div className={`p-2 border-t flex justify-end gap-2 ${theme === 'dark' ? 'border-[#333] bg-[#1e1e1e]' : 'border-gray-200 bg-white'}`}>
                  <button onClick={handleRun} className="px-4 py-1.5 rounded bg-[#333] hover:bg-[#444] text-gray-200 text-[11px] font-medium transition-colors">Run</button>
                  <button onClick={handleSubmitCheck} className="px-4 py-1.5 rounded bg-green-600 hover:bg-green-500 text-white text-[11px] font-bold transition-colors shadow-lg shadow-green-900/20">Submit</button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {(showExitModal || showLeaveContestModal || showLangWarning || showResetModal || showSubmitWarning) && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-100">
           <div className={`w-full max-w-sm rounded border p-4 shadow-2xl ${theme === 'dark' ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                 {showExitModal ? "Unsaved Changes" : showLeaveContestModal ? "Leave Contest?" : showLangWarning ? "Change Language?" : showResetModal ? "Reset Code?" : "Submit?"}
              </h3>
              <p className={`text-xs mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                 {showResetModal ? "This will discard your current code." : "Are you sure you want to proceed?"}
              </p>
              <div className="flex justify-end gap-2">
                 <button onClick={() => { setShowExitModal(false); setShowLeaveContestModal(false); setShowLangWarning(false); setShowResetModal(false); setShowSubmitWarning(false); }} className={`px-3 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'bg-[#333] hover:bg-[#444]' : 'bg-gray-100'}`}>Cancel</button>
                 <button onClick={() => { 
                    if (showExitModal) { setShowExitModal(false); navigationProps.onStartMatch(); }
                    if (showLeaveContestModal) { setShowLeaveContestModal(false); navigationProps.onHome(); }
                    if (showLangWarning) confirmLanguageChange();
                    if (showResetModal) confirmReset();
                    if (showSubmitWarning) performSubmit();
                 }} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-medium">Confirm</button>
              </div>
           </div>
        </div>
      )}

      {/* Contest Ended Modal */}
      {isContestEnded && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
           <div className="text-center w-full max-w-md">
              <div className="mb-6 inline-flex p-4 rounded-full bg-white/5 border border-white/10 shadow-2xl">
                 <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Contest Finished</h2>
              <p className="text-gray-400 mb-8 text-sm">Redirecting to leaderboard rankings...</p>
              
              <div className="relative w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                 <div 
                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-[progress_3s_ease-in-out_forwards]" 
                   style={{ width: '0%' }}
                 />
              </div>
           </div>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[120] px-3 py-1.5 bg-[#333] text-white text-[10px] font-medium rounded shadow border border-white/10">
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
