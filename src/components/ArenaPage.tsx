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
  Terminal
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

type TabType = 'problem' | 'submissions' | 'editorial' | 'discussion';
type Verdict = 'AC' | 'WA' | 'TLE' | 'RTE' | 'CE' | 'PENDING' | null;

interface Submission {
  id: string;
  time: string;
  verdict: Verdict;
  memory: string;
  runtime: string;
  language: string;
  problem: string;
}

const MOCK_SUBMISSIONS: Submission[] = [
  { id: '1', time: '10:22 AM', verdict: 'WA', memory: '14.2 MB', runtime: '124 ms', language: 'C++', problem: 'A' },
  { id: '2', time: '10:30 AM', verdict: 'AC', memory: '14.5 MB', runtime: '45 ms', language: 'C++', problem: 'A' },
  { id: '3', time: '10:41 AM', verdict: 'TLE', memory: '14.2 MB', runtime: '>2000 ms', language: 'Python3', problem: 'B' },
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
  const [leftWidth, setLeftWidth] = useState('40%');
  const [editorHeight, setEditorHeight] = useState('60%');
  const [isProblemPanelVisible, setIsProblemPanelVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // App State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeProblem, setActiveProblem] = useState('A');
  const [timeLeft, setTimeLeft] = useState(960); // 16 mins for demo
  
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
  const [showSubmissions, setShowSubmissions] = useState(false);
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

  // Timer & Keyboard Shortcuts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
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
        setShowSubmissions(false);
        setShowExitModal(false);
        setShowLeaveContestModal(false);
        setShowLangWarning(false);
        setShowResetModal(false);
        setShowSubmitWarning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, code, language, activeProblem]); // dependencies for closure capture if needed

  // Timer Colors
  const getTimerColor = () => {
    if (timeLeft <= 300) return 'text-red-500'; // 5 mins
    if (timeLeft <= 900) return 'text-orange-500'; // 15 mins
    return 'text-white';
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
    // Auto-save current mock
    // Load new mock
    setActiveProblem(newProblem);
    setUnsavedChanges(false);
    showToast(`Switched to Problem ${newProblem}`);
    // In real app, load code from state/backend
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
    showToast("Copied to clipboard");
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
      setShowSubmissions(true);
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

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#1a1a1a] text-gray-300' : 'bg-gray-100 text-gray-800'} overflow-hidden font-sans transition-colors duration-300`}>
      
      {/* 1. TOP BAR */}
      {!isFullscreen && (
        <header className={`h-14 ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#3a3a3a]' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-4 sticky top-0 z-40 shrink-0`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${theme === 'dark' ? 'hover:bg-[#333] text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Back</span>
            </button>
            
            <div className="h-6 w-[1px] bg-gray-700/50 hidden sm:block" />

            {/* Problem Switcher */}
            <div className="flex items-center gap-1">
              {['A', 'B', 'C', 'D'].map((prob) => (
                <button
                  key={prob}
                  onClick={() => handleProblemSwitch(prob)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                    activeProblem === prob 
                      ? 'bg-blue-600 text-white' 
                      : theme === 'dark' 
                        ? 'text-gray-400 hover:bg-[#333] hover:text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {prob}
                  {/* Status Dot Mock */}
                  {prob === 'A' && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex items-center gap-3 px-4 py-1.5 rounded-md border ${theme === 'dark' ? 'bg-[#262626] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
            <Clock className={`w-4 h-4 ${getTimerColor()}`} />
            <span className={`font-mono text-lg font-medium tracking-wider ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSubmissions(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#333]' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Submissions</span>
            </button>
            
            <button 
              onClick={() => setShowLeaveContestModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium transition-colors"
            >
              <span className="hidden sm:inline">Leave Contest</span>
              <MoreVertical className="w-4 h-4 sm:hidden" />
            </button>
          </div>
        </header>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: PROBLEM */}
        <AnimatePresence mode='wait'>
          {isProblemPanelVisible && (
            <Resizable
              size={{ width: leftWidth, height: '100%' }}
              onResizeStop={(e, direction, ref, d) => {
                setLeftWidth(leftWidth + d.width);
              }}
              minWidth="20%"
              maxWidth="50%"
              enable={{ right: true }}
              className={`border-r ${theme === 'dark' ? 'border-[#3a3a3a] bg-[#1a1a1a]' : 'border-gray-200 bg-white'} flex flex-col z-10`}
              handleClasses={{ right: "w-1 hover:bg-blue-500 transition-colors z-50 cursor-col-resize" }}
            >
              {/* Problem Header */}
              <div className={`p-6 border-b ${theme === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Two Sum</h1>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsProblemPanelVisible(false)}
                      className="p-1 hover:bg-gray-700/50 rounded text-gray-500"
                      title="Collapse Panel (Ctrl+B)"
                    >
                      <Sidebar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-500 rounded border border-green-500/20">Easy</span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="w-3.5 h-3.5" /> 2.0s
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5" /> 256MB
                  </span>
                </div>
              </div>

              {/* Problem Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
                  <p className="leading-relaxed opacity-90">
                    Given an array of integers <code className={`${theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-100'} px-1.5 py-0.5 rounded font-mono text-sm`}>nums</code> and an integer <code className={`${theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-100'} px-1.5 py-0.5 rounded font-mono text-sm`}>target</code>, return indices of the two numbers such that they add up to <code className={`${theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-100'} px-1.5 py-0.5 rounded font-mono text-sm`}>target</code>.
                  </p>
                  <p className="leading-relaxed mt-4 opacity-90">
                    You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                  </p>
                </div>

                {/* Samples */}
                <div className="space-y-6">
                  {[
                    { input: "nums = [2,7,11,15]\ntarget = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
                    { input: "nums = [3,2,4]\ntarget = 6", output: "[1,2]", explanation: null },
                  ].map((sample, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Example {idx + 1}</span>
                        <button 
                          onClick={() => handleCopy(sample.input)}
                          className="text-xs flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>
                      <div className={`${theme === 'dark' ? 'bg-[#262626] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'} border rounded-lg overflow-hidden`}>
                        <div className={`flex border-b ${theme === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
                          <div className={`flex-1 p-3 border-r ${theme === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
                            <span className="text-xs text-gray-500 uppercase block mb-1">Input</span>
                            <code className={`text-sm font-mono whitespace-pre ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{sample.input}</code>
                          </div>
                          <div className="flex-1 p-3">
                            <span className="text-xs text-gray-500 uppercase block mb-1">Output</span>
                            <code className={`text-sm font-mono whitespace-pre ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{sample.output}</code>
                          </div>
                        </div>
                        {sample.explanation && (
                          <div className={`p-3 ${theme === 'dark' ? 'bg-[#222]' : 'bg-white'}`}>
                            <span className="text-xs text-gray-500 uppercase block mb-1">Explanation</span>
                            <p className="text-sm text-gray-500">{sample.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Resizable>
          )}
        </AnimatePresence>
        
        {/* Toggle Button for Sidebar when hidden */}
        {!isProblemPanelVisible && (
          <div className={`absolute top-4 left-4 z-20`}>
             <button 
               onClick={() => setIsProblemPanelVisible(true)}
               className={`p-2 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-[#262626] text-white border border-[#3a3a3a]' : 'bg-white text-gray-800 border border-gray-200'}`}
             >
               <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        )}

        {/* RIGHT PANEL: EDITOR + OUTPUT */}
        <div className={`flex-1 flex flex-col min-w-0 ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
          
          {/* Editor Toolbar */}
          <div className={`h-10 ${theme === 'dark' ? 'bg-[#262626] border-[#3a3a3a]' : 'bg-gray-100 border-gray-200'} border-b flex items-center justify-between px-4 shrink-0`}>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className={`flex items-center gap-2 text-sm transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                  <span className={`w-2 h-2 rounded-full ${language === 'C++' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                  {language}
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
                <div className={`absolute top-full left-0 mt-1 w-32 rounded shadow-xl hidden group-hover:block z-50 border ${theme === 'dark' ? 'bg-[#333] border-[#444]' : 'bg-white border-gray-200'}`}>
                  {Object.keys(BOILERPLATES).map(l => (
                    <button 
                      key={l}
                      onClick={() => handleLanguageChange(l)}
                      className={`w-full text-left px-3 py-2 text-sm first:rounded-t last:rounded-b ${theme === 'dark' ? 'text-gray-300 hover:bg-[#444] hover:text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`h-4 w-[1px] ${theme === 'dark' ? 'bg-[#3a3a3a]' : 'bg-gray-300'}`} />

              <button 
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                className={`flex items-center gap-2 text-xs font-medium transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleReset}
                className={`text-xs flex items-center gap-1 transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`} 
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Code Editor Area */}
          <Resizable
            size={{ width: '100%', height: editorHeight }}
            onResizeStop={(e, direction, ref, d) => {
              setEditorHeight(editorHeight + d.height);
            }}
            minHeight="20%"
            maxHeight="90%"
            enable={{ bottom: true }}
            className="relative flex flex-col"
            handleClasses={{ bottom: "h-1 hover:bg-blue-500 transition-colors z-30 cursor-row-resize" }}
          >
            <div className="flex-1 relative flex overflow-hidden">
              {/* Line Numbers */}
              <div 
                ref={lineNumbersRef}
                className={`w-12 text-right pr-3 pt-4 font-mono text-sm select-none overflow-hidden ${theme === 'dark' ? 'bg-[#1e1e1e] border-r border-[#333] text-gray-600' : 'bg-gray-50 border-r border-gray-200 text-gray-400'}`}
              >
                {lineNumbers.map(n => (
                  <div key={n} className="leading-6">{n}</div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setUnsavedChanges(true);
                }}
                onScroll={handleScroll}
                className={`flex-1 p-4 font-mono text-sm resize-none outline-none border-none leading-6 w-full h-full custom-scrollbar ${theme === 'dark' ? 'bg-[#1e1e1e] text-gray-300 placeholder-gray-700' : 'bg-white text-gray-800 placeholder-gray-300'}`}
                spellCheck={false}
                placeholder="// Start coding here..."
              />
            </div>
          </Resizable>

          {/* Output / Console */}
          <div className={`flex-1 flex flex-col min-h-0 ${theme === 'dark' ? 'bg-[#1a1a1a] border-t border-[#3a3a3a]' : 'bg-gray-50 border-t border-gray-200'}`}>
            {/* Console Toolbar */}
            <div className={`h-9 border-b px-4 flex items-center justify-between shrink-0 ${theme === 'dark' ? 'border-[#3a3a3a] bg-[#222]' : 'border-gray-200 bg-gray-100'}`}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Console</span>
                {verdict && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${getVerdictColor(verdict)} bg-opacity-10`}>
                    {verdict === 'PENDING' ? 'Running...' : verdict}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCustomInputVisible(!customInputVisible)}
                  className={`text-xs flex items-center gap-1 ${customInputVisible ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                >
                  <Terminal className="w-3 h-3" /> Custom Input
                </button>
                <button 
                  onClick={() => { setOutput(null); setVerdict(null); }}
                  className="text-xs flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>
            </div>

            {/* Custom Input Area */}
            {customInputVisible && (
              <div className={`h-24 p-2 border-b ${theme === 'dark' ? 'border-[#3a3a3a] bg-[#1a1a1a]' : 'border-gray-200 bg-white'}`}>
                 <textarea
                   value={customInput}
                   onChange={(e) => setCustomInput(e.target.value)}
                   className={`w-full h-full resize-none bg-transparent outline-none font-mono text-sm p-2 ${theme === 'dark' ? 'text-gray-300 placeholder-gray-700' : 'text-gray-800 placeholder-gray-400'}`}
                   placeholder="Enter custom input cases..."
                 />
              </div>
            )}

            {/* Console Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm custom-scrollbar relative">
              {isRunning || isSubmitting ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">{isSubmitting ? 'Evaluating Submission...' : 'Running Code...'}</span>
                </div>
              ) : output ? (
                <div className="space-y-2 animate-in fade-in duration-300">
                  {verdict === 'AC' && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <div>
                        <div className="font-bold">Accepted</div>
                        <div className="text-xs opacity-70 font-normal">All test cases passed</div>
                      </div>
                    </div>
                  )}
                  <pre className={`whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{output}</pre>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 text-xs italic opacity-50 select-none">
                  Run code to see output
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BAR */}
      <footer className={`h-14 border-t px-4 flex items-center justify-between shrink-0 z-30 ${theme === 'dark' ? 'bg-[#1f1f1f] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-1 h-full pt-1">
          {['Submissions', 'Discussion', 'Editorial', 'Stats'].map((tab) => (
             <button 
               key={tab}
               onClick={() => tab === 'Submissions' && setShowSubmissions(true)}
               className={`flex items-center gap-2 px-4 h-full text-sm border-b-2 transition-colors ${
                 theme === 'dark' 
                   ? 'text-gray-400 hover:text-white border-transparent hover:border-blue-500' 
                   : 'text-gray-600 hover:text-black border-transparent hover:border-blue-500'
               }`}
             >
               {tab === 'Submissions' && <List className="w-4 h-4" />}
               {tab === 'Discussion' && <MessageSquare className="w-4 h-4" />}
               {tab === 'Editorial' && <FileText className="w-4 h-4" />}
               {tab === 'Stats' && <BarChart2 className="w-4 h-4" />}
               <span className="hidden sm:inline">{tab}</span>
             </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={handleRun}
             disabled={isRunning || isSubmitting}
             className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
               theme === 'dark' 
                ? 'bg-[#333] hover:bg-[#444] text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
             }`}
           >
             <Play className="w-4 h-4 fill-current" />
             Run
           </button>
           <button 
             onClick={handleSubmitCheck}
             disabled={isRunning || isSubmitting}
             className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
           >
             <Send className="w-4 h-4" />
             Submit
           </button>
        </div>
      </footer>

      {/* --- MODALS --- */}

      {/* 1. Submissions Modal */}
      {showSubmissions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`w-[800px] rounded-xl border shadow-2xl flex flex-col overflow-hidden max-h-[80vh] ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}>
            <div className={`flex items-center justify-between px-6 py-4 border-b ${theme === 'dark' ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
              <h2 className={`text-lg font-medium flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <List className="w-5 h-5 text-blue-500" />
                Submissions
              </h2>
              <button onClick={() => setShowSubmissions(false)} className="text-gray-500 hover:text-blue-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'bg-[#222] text-gray-500' : 'bg-gray-50 text-gray-600'}`}>
                    <th className="px-6 py-3 font-medium">Problem</th>
                    <th className="px-6 py-3 font-medium">Time</th>
                    <th className="px-6 py-3 font-medium">Verdict</th>
                    <th className="px-6 py-3 font-medium">Runtime</th>
                    <th className="px-6 py-3 font-medium">Memory</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-[#3a3a3a]' : 'divide-gray-200'}`}>
                  {MOCK_SUBMISSIONS.map((sub) => (
                    <tr key={sub.id} className={`transition-colors cursor-pointer text-sm ${theme === 'dark' ? 'hover:bg-[#2c2c2c] text-gray-300' : 'hover:bg-gray-50 text-gray-800'}`}>
                      <td className="px-6 py-4 font-bold">{sub.problem}</td>
                      <td className="px-6 py-4 opacity-70">{sub.time}</td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${getVerdictColor(sub.verdict)}`}>
                          {sub.verdict}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono opacity-70">{sub.runtime}</td>
                      <td className="px-6 py-4 font-mono opacity-70">{sub.memory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Generic Modal Template (Used for Exit, Language, etc.) */}
      {(showExitModal || showLeaveContestModal || showLangWarning || showResetModal || showSubmitWarning) && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className={`w-full max-w-md rounded-xl border p-6 shadow-2xl ${theme === 'dark' ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                       <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                       {showExitModal && "Unsaved Changes"}
                       {showLeaveContestModal && "Leave Contest?"}
                       {showLangWarning && "Change Language?"}
                       {showResetModal && "Reset Code?"}
                       {showSubmitWarning && "Direct Submission?"}
                    </h3>
                 </div>
                 
                 <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {showExitModal && "You have unsaved changes in your editor. If you leave now, these changes will be lost."}
                    {showLeaveContestModal && "Are you sure you want to leave the contest? You can rejoin later, but the timer will continue."}
                    {showLangWarning && "Changing the language will reset your current code. This action cannot be undone."}
                    {showResetModal && "This will reset your editor to the default boilerplate. All current code will be lost."}
                    {showSubmitWarning && "You haven't run your code yet. We recommend running it against sample test cases before submitting to avoid penalties."}
                 </p>

                 <div className="flex items-center justify-end gap-3 mt-2">
                    <button 
                       onClick={() => {
                          setShowExitModal(false);
                          setShowLeaveContestModal(false);
                          setShowLangWarning(false);
                          setShowResetModal(false);
                          setShowSubmitWarning(false);
                       }}
                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-[#333] hover:bg-[#444] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                    >
                       Cancel
                    </button>
                    <button 
                       onClick={() => {
                          if (showExitModal) { setShowExitModal(false); navigationProps.onStartMatch(); }
                          if (showLeaveContestModal) { setShowLeaveContestModal(false); navigationProps.onHome(); }
                          if (showLangWarning) confirmLanguageChange();
                          if (showResetModal) confirmReset();
                          if (showSubmitWarning) performSubmit();
                       }}
                       className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-red-500/20"
                    >
                       {showSubmitWarning ? "Submit Anyway" : "Confirm"}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[120] px-4 py-2 bg-black/80 text-white text-sm rounded-full backdrop-blur-md shadow-xl border border-white/10"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
