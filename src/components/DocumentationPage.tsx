import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Code2, BookOpen, Zap, Terminal, GitBranch } from 'lucide-react';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';

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

interface DocumentationPageProps {
  navigationProps: NavigationProps;
}

export function DocumentationPage({ navigationProps }: DocumentationPageProps) {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: BookOpen },
    { id: 'editor', title: 'Using the Editor', icon: Code2 },
    { id: 'dual-mode', title: 'Dual Mode API', icon: GitBranch },
    { id: 'ai-guide', title: 'CodeArena AI Guide', icon: Zap },
    { id: 'offline', title: 'Offline Mode', icon: Terminal },
    { id: 'leaderboard', title: 'Leaderboard System', icon: Terminal },
    { id: 'faq', title: 'FAQ', icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar {...navigationProps} />
        
        {/* Header */}
        <header className="border-b border-[#00FFFF]/10 bg-[#0A0F1C]/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 
                className="text-4xl text-white mb-3"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                📚 Documentation
              </h1>
              <p 
                className="text-lg text-white/70"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Everything you need to master CodeArena.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 sticky top-8 self-start">
              <nav className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/20 rounded-xl p-4">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-all flex items-center gap-3 mb-2 ${
                        activeSection === section.id
                          ? 'bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/30'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/10 rounded-xl p-8 space-y-12">
                
                {/* Getting Started */}
                <section id="getting-started">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#00FFFF]" />
                    </div>
                    <h2 
                      className="text-3xl text-[#00FFFF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Getting Started
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FFFF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>Welcome to CodeArena! Follow these steps to get started:</p>
                    <ol className="list-decimal list-inside space-y-3 pl-4">
                      <li>Create an account or log in</li>
                      <li>Complete your profile setup</li>
                      <li>Choose between Dual Mode or Friendly Spar</li>
                      <li>Start coding and earn points!</li>
                    </ol>
                    <div className="bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg p-4 mt-6">
                      <p className="text-[#00FFFF]">
                        💡 <strong>Tip:</strong> Try the tutorial mode first to familiarize yourself with the interface.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Using the Editor */}
                <section id="editor">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#A259FF]/20 flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-[#A259FF]" />
                    </div>
                    <h2 
                      className="text-3xl text-[#A259FF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Using the Editor
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#A259FF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>Our code editor supports multiple languages with syntax highlighting:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Python, JavaScript, Java, C++, and more</li>
                      <li>Real-time collaboration with partner</li>
                      <li>Auto-completion and smart indentation</li>
                      <li>Customizable themes and fonts</li>
                    </ul>
                    
                    <h4 className="text-[#A259FF] text-lg mt-6 mb-3">Keyboard Shortcuts</h4>
                    <div className="bg-[#000000] border border-[#A259FF]/20 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><kbd className="px-2 py-1 bg-white/10 rounded">Ctrl+S</kbd> Save code</div>
                        <div><kbd className="px-2 py-1 bg-white/10 rounded">Ctrl+Enter</kbd> Run code</div>
                        <div><kbd className="px-2 py-1 bg-white/10 rounded">Ctrl+/</kbd> Toggle comment</div>
                        <div><kbd className="px-2 py-1 bg-white/10 rounded">Ctrl+F</kbd> Find</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Dual Mode API */}
                <section id="dual-mode">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#00FF88]/20 flex items-center justify-center">
                      <GitBranch className="w-6 h-6 text-[#00FF88]" />
                    </div>
                    <h2 
                      className="text-3xl text-[#00FF88]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Dual Mode API
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FF88] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>Create a dual coding session programmatically:</p>
                    
                    <div className="bg-[#000000] border border-[#00FF88]/20 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code className="text-[#00FF88]">{`// CodeArena API Example
{
  "mode": "dual",
  "partner": "random", // or specific user ID
  "language": "python",
  "problem": "reverse-linked-list"
}`}</code>
                      </pre>
                    </div>

                    <div className="bg-[#FF0088]/10 border border-[#FF0088]/30 rounded-lg p-4 mt-4">
                      <p className="text-[#FF0088]">
                        ⚠️ <strong>Warning:</strong> Avoid exceeding rate limits when using real-time AI assistance.
                      </p>
                    </div>
                  </div>
                </section>

                {/* CodeArena AI Guide */}
                <section id="ai-guide">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[#00FFFF]" />
                    </div>
                    <h2 
                      className="text-3xl text-[#00FFFF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      CodeArena AI Guide
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FFFF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>Our AI assistant can help you:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Identify syntax errors and bugs</li>
                      <li>Suggest optimizations</li>
                      <li>Provide hints without giving away solutions</li>
                      <li>Explain complex algorithms</li>
                    </ul>
                    <p className="mt-4">
                      To activate AI assistance, click the AI panel or use the command palette (<kbd className="px-2 py-1 bg-white/10 rounded">Ctrl+Shift+A</kbd>).
                    </p>
                  </div>
                </section>

                {/* Offline Mode */}
                <section id="offline">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#A259FF]/20 flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-[#A259FF]" />
                    </div>
                    <h2 
                      className="text-3xl text-[#A259FF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Offline Mode
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#A259FF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>
                      CodeArena supports offline practice mode. Your code is saved locally and 
                      synced when you reconnect.
                    </p>
                    <p>
                      <strong>Limitations:</strong> Real-time collaboration and AI assistance 
                      require an internet connection.
                    </p>
                  </div>
                </section>

                {/* Leaderboard System */}
                <section id="leaderboard">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <h2 
                      className="text-3xl text-[#FFD700]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Leaderboard System
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#FFD700] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>Rankings are based on:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Contest performance (50% weight)</li>
                      <li>Problem-solving accuracy (30% weight)</li>
                      <li>Consistency and activity (20% weight)</li>
                    </ul>
                    <p className="mt-4">
                      Leaderboards reset monthly, with all-time rankings preserved separately.
                    </p>
                  </div>
                </section>

                {/* FAQ */}
                <section id="faq">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#00FF88]/20 flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-[#00FF88]" />
                    </div>
                    <h2 
                      className="text-3xl text-[#00FF88]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      FAQ
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FF88] to-transparent mb-6" />
                  <div className="space-y-6 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    
                    <div>
                      <h4 className="text-[#00FFFF] mb-2">Q: Can I use CodeArena for free?</h4>
                      <p>A: Yes! CodeArena is free with optional premium features.</p>
                    </div>

                    <div>
                      <h4 className="text-[#00FFFF] mb-2">Q: How do I find a coding partner?</h4>
                      <p>A: Use the "Find Partner" button or join random matching.</p>
                    </div>

                    <div>
                      <h4 className="text-[#00FFFF] mb-2">Q: Are contest problems original?</h4>
                      <p>A: Yes, all problems are created by our expert team.</p>
                    </div>

                    <div>
                      <h4 className="text-[#00FFFF] mb-2">Q: Can I download my code?</h4>
                      <p>A: Yes, export your submissions anytime from your profile.</p>
                    </div>

                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}