import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CommunityHeader } from './community/CommunityHeader';
import { SearchHeroSection } from './community/SearchHeroSection';
import { PostCard } from './community/PostCard';
import { VotePanel } from './community/VotePanel';
import { SidebarTagPanel } from './community/SidebarTagPanel';
import { TopContributorCard } from './community/TopContributorCard';
import { StatsPanel } from './community/StatsPanel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Sparkles } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface CommunityPageProps {
  onExit: () => void;
}

interface Post {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    username: string;
    avatar: string;
    level: string;
    badge: string;
  };
  timeAgo: string;
  votes: number;
  comments: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export function CommunityPage({ onExit }: CommunityPageProps) {
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [aiAssistEnabled, setAiAssistEnabled] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');

  // Mock posts data
  const posts: Post[] = [
    {
      id: '1',
      title: 'How to optimize recursive calls in C++?',
      description: 'Facing TLE on Codeforces when recursion depth > 10^5. Tried memoization, still fails...',
      tags: ['C++', 'Recursion', 'Optimization'],
      author: {
        username: 'coderx',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coderx',
        level: 'Level 8',
        badge: 'Challenger',
      },
      timeAgo: '2h ago',
      votes: 54,
      comments: 14,
      difficulty: 'Medium',
    },
    {
      id: '2',
      title: 'Best approach for dynamic programming problems?',
      description: 'Looking for strategies to identify DP patterns and optimize space complexity...',
      tags: ['Dynamic Programming', 'Algorithms', 'Strategy'],
      author: {
        username: 'sarah_codes',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        level: 'Level 12',
        badge: 'Expert',
      },
      timeAgo: '5h ago',
      votes: 89,
      comments: 23,
      difficulty: 'Hard',
    },
    {
      id: '3',
      title: 'Understanding graph traversal algorithms',
      description: 'Can someone explain the difference between BFS and DFS with real examples?',
      tags: ['Graphs', 'BFS', 'DFS', 'Algorithms'],
      author: {
        username: 'newbie_dev',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newbie',
        level: 'Level 3',
        badge: 'Beginner',
      },
      timeAgo: '1d ago',
      votes: 32,
      comments: 8,
      difficulty: 'Easy',
    },
    {
      id: '4',
      title: 'Time complexity of nested loops - common mistakes',
      description: 'Made a mistake calculating O(n²) vs O(n log n). What are common pitfalls?',
      tags: ['Complexity', 'Big-O', 'Performance'],
      author: {
        username: 'algo_master',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=algo',
        level: 'Level 15',
        badge: 'Legend',
      },
      timeAgo: '3h ago',
      votes: 67,
      comments: 19,
      difficulty: 'Medium',
    },
    {
      id: '5',
      title: 'Python vs C++ for competitive programming?',
      description: 'Which language is better for contests? Considering speed and ease of coding...',
      tags: ['Python', 'C++', 'Competitive Programming'],
      author: {
        username: 'polyglot_coder',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=poly',
        level: 'Level 10',
        badge: 'Pro',
      },
      timeAgo: '8h ago',
      votes: 42,
      comments: 31,
      difficulty: 'Easy',
    },
    {
      id: '6',
      title: 'Debugging segmentation faults in C++',
      description: 'Getting SIGSEGV errors in array manipulation. Any tools to help debug?',
      tags: ['C++', 'Debugging', 'Arrays'],
      author: {
        username: 'debug_ninja',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=debug',
        level: 'Level 7',
        badge: 'Advanced',
      },
      timeAgo: '12h ago',
      votes: 28,
      comments: 11,
      difficulty: 'Medium',
    },
  ];

  const popularTags = [
    { name: 'Dynamic Programming', count: 142, color: '#00FFFF' },
    { name: 'AI', count: 89, color: '#A259FF' },
    { name: 'Python', count: 77, color: '#00FF88' },
    { name: 'C++', count: 65, color: '#FFB86C' },
    { name: 'Graphs', count: 54, color: '#FF0088' },
    { name: 'Arrays', count: 48, color: '#00D4D4' },
  ];

  const topContributors = [
    {
      username: 'meghram_meena',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=megh',
      xp: 1823,
      badge: 'Legend',
    },
    {
      username: 'code_warrior',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=warrior',
      xp: 1654,
      badge: 'Expert',
    },
    {
      username: 'algo_queen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=queen',
      xp: 1432,
      badge: 'Expert',
    },
  ];

  const handleAskQuestion = () => {
    setIsAskModalOpen(true);
  };

  const handlePostQuestion = () => {
    // Here you would normally submit to backend
    console.log('Posting question:', { questionTitle, questionDescription, selectedTags });
    setIsAskModalOpen(false);
    setQuestionTitle('');
    setQuestionDescription('');
    setSelectedTags([]);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Matrix Code Rain */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#00FFFF] text-xs"
              style={{
                left: `${(i * 3.33) % 100}%`,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              animate={{
                y: ['-100px', '100vh'],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 5,
              }}
            >
              {Array.from({ length: 20 }, () => 
                Math.random() > 0.5 ? '1' : '0'
              ).join('\n')}
            </motion.div>
          ))}
        </div>

        {/* Neon Grid */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FFFF] rounded-full blur-[150px] opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A259FF] rounded-full blur-[150px] opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <CommunityHeader 
          onExit={onExit} 
          onAskQuestion={handleAskQuestion}
          hasNotifications={true}
        />
        
        <SearchHeroSection onAskQuestion={handleAskQuestion} />

        {/* Main Content Area */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Discussion Feed */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 
                    className="text-white"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                  >
                    Recent Discussions
                  </h2>
                  <select className="bg-black/40 border border-[#00FFFF]/30 rounded-lg px-3 py-1.5 text-sm text-white/80 focus:outline-none focus:border-[#00FFFF]">
                    <option>Newest</option>
                    <option>Top</option>
                    <option>Trending</option>
                  </select>
                </div>

                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PostCard 
                      id={post.id}
                      title={post.title}
                      description={post.description}
                      tags={post.tags}
                      author={{
                        username: post.author.username,
                        avatar: post.author.avatar,
                        level: parseInt(post.author.level.replace('Level ', '')),
                        badge: post.author.badge,
                      }}
                      timeAgo={post.timeAgo}
                      votes={post.votes}
                      commentCount={post.comments}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <StatsPanel 
                  activeThreads={324}
                  repliesToday={1234}
                  onlineUsers={183}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <SidebarTagPanel tags={popularTags} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="glassmorphic p-5 rounded-xl border border-[#A259FF]/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">🏆</span>
                    <h3 
                      className="text-white"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Top Contributors
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {topContributors.map((contributor, index) => (
                      <TopContributorCard 
                        key={contributor.username}
                        contributor={contributor}
                        rank={index + 1}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Modal */}
      <Dialog open={isAskModalOpen} onOpenChange={setIsAskModalOpen}>
        <DialogContent className="bg-[#0A0F1C] border-[#00FFFF]/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle 
              className="text-white flex items-center gap-2"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                ⚡
              </motion.span>
              Ask a New Question
            </DialogTitle>
            <DialogDescription className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Share your coding question with the community and get help from fellow developers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Question Title */}
            <div>
              <label className="text-white/80 text-sm mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Question Title
              </label>
              <Input
                placeholder="Your question title..."
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                className="bg-black/40 border-[#00FFFF]/30 focus:border-[#00FFFF] text-white"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-white/80 text-sm mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Description
              </label>
              <Textarea
                placeholder="Explain your issue or approach..."
                value={questionDescription}
                onChange={(e) => setQuestionDescription(e.target.value)}
                className="bg-black/40 border-[#00FFFF]/30 focus:border-[#00FFFF] text-white min-h-[120px]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-white/80 text-sm mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {popularTags.slice(0, 8).map((tag) => (
                  <Badge
                    key={tag.name}
                    variant={selectedTags.includes(tag.name) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all ${
                      selectedTags.includes(tag.name)
                        ? 'bg-[#00FFFF]/20 border-[#00FFFF] text-[#00FFFF]'
                        : 'border-white/20 text-white/60 hover:border-[#00FFFF]/50'
                    }`}
                    onClick={() => handleTagSelect(tag.name)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-[#00FFFF]/20 border-[#00FFFF] text-[#00FFFF] pr-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleTagSelect(tag)}
                        className="ml-1 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* AI Assistant Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#A259FF]/10 border border-[#A259FF]/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A259FF]" />
                <Label htmlFor="ai-assist" className="text-white/80 cursor-pointer" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Enable AI suggestions for question formatting
                </Label>
              </div>
              <Switch
                id="ai-assist"
                checked={aiAssistEnabled}
                onCheckedChange={setAiAssistEnabled}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handlePostQuestion}
                className="flex-1 bg-gradient-to-r from-[#00FF88] to-[#00D46E] hover:from-[#00FF88] hover:to-[#00E07C] text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]"
              >
                Post Question
              </Button>
              <Button
                onClick={() => setIsAskModalOpen(false)}
                variant="outline"
                className="border-white/20 text-white/80 hover:bg-white/5"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#A259FF] to-[#9B51E0] flex items-center justify-center shadow-[0_0_30px_rgba(162,89,255,0.5)]"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAskQuestion}
        >
          <span className="text-2xl">⚡</span>
        </motion.button>
      </div>
    </div>
  );
}
