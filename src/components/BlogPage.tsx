import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Clock, User, Tag, TrendingUp, BookOpen } from 'lucide-react';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

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

interface BlogPageProps {
  navigationProps: NavigationProps;
}

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  views: number;
}

export function BlogPage({ navigationProps }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Tutorials', 'AI Help', 'Contest Editorials', 'Platform Updates', 'DSA Guides'];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Mastering Dynamic Programming: A Complete Guide',
      summary: 'Learn the fundamentals of DP with practical examples and optimization techniques used in competitive programming.',
      author: 'AlgoMaster_X',
      date: 'Dec 2, 2025',
      readTime: '12 min read',
      tags: ['Tutorials', 'DSA Guides'],
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
      views: 4521,
    },
    {
      id: 2,
      title: 'How CodeArena AI Helps You Debug Faster',
      summary: 'Discover how our AI assistant can identify bugs, suggest fixes, and help you write cleaner code in real-time.',
      author: 'CodeArena Team',
      date: 'Dec 1, 2025',
      readTime: '8 min read',
      tags: ['AI Help', 'Platform Updates'],
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      views: 7823,
    },
    {
      id: 3,
      title: 'Weekly Challenge #47 Editorial',
      summary: 'Detailed solutions and approach breakdown for all problems from last week\'s algorithm challenge.',
      author: 'ByteWizard',
      date: 'Nov 30, 2025',
      readTime: '15 min read',
      tags: ['Contest Editorials'],
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      views: 3245,
    },
    {
      id: 4,
      title: 'Graph Algorithms: From Basics to Advanced',
      summary: 'A comprehensive guide covering BFS, DFS, Dijkstra, and advanced graph traversal techniques.',
      author: 'CodeNinja47',
      date: 'Nov 28, 2025',
      readTime: '20 min read',
      tags: ['Tutorials', 'DSA Guides'],
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop',
      views: 5912,
    },
    {
      id: 5,
      title: 'New Features: Team Coding Mode Launch',
      summary: 'Announcing our new team collaboration features that let you code with friends in real-time.',
      author: 'CodeArena Team',
      date: 'Nov 25, 2025',
      readTime: '5 min read',
      tags: ['Platform Updates'],
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
      views: 9234,
    },
    {
      id: 6,
      title: 'Binary Search: Hidden Patterns & Tricks',
      summary: 'Uncover the secret patterns that make binary search problems easier to solve.',
      author: 'SearchMaster',
      date: 'Nov 22, 2025',
      readTime: '10 min read',
      tags: ['Tutorials', 'DSA Guides'],
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      views: 6453,
    },
  ];

  const popularPosts = [
    { title: 'Top 10 DP Patterns You Must Know', views: 12453 },
    { title: 'How to Solve Any Array Problem', views: 10234 },
    { title: 'String Algorithms Cheat Sheet', views: 9821 },
    { title: 'Tree Traversal Master Guide', views: 8765 },
  ];

  const tagCloud = ['Dynamic Programming', 'Arrays', 'Graphs', 'Trees', 'Binary Search', 'Greedy', 'Sliding Window', 'Two Pointers'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.tags.includes(selectedCategory);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          style={{ background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)', top: '10%', right: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar {...navigationProps} />
        
        {/* Hero Banner */}
        <div 
          className="relative overflow-hidden border-b border-[#00FFFF]/10 mt-16"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(162, 89, 255, 0.1) 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 
                className="text-5xl text-white mb-4"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                📰 CodeArena Blog
              </h1>
              <p 
                className="text-xl text-white/70 max-w-2xl"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Insights, Tutorials & Updates – Level up your coding skills
              </p>
            </motion.div>

            {/* Neon wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Filters & Search */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedCategory === category
                          ? 'bg-[#00FFFF]/20 border-[#00FFFF] text-[#00FFFF]'
                          : 'bg-[#0D0D0D] border-[#00FFFF]/20 text-white/60 hover:text-white hover:border-[#00FFFF]/40'
                      }`}
                      style={{ 
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: selectedCategory === category ? 600 : 400,
                        boxShadow: selectedCategory === category ? '0 0 20px rgba(0, 255, 255, 0.3)' : 'none',
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="pl-11 bg-[#0D0D0D] border-[#00FFFF]/20 text-white placeholder:text-white/40 h-12"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid gap-6">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    No articles found
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              {/* Popular This Week */}
              <motion.div
                className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/20 rounded-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 
                  className="text-lg text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  <TrendingUp className="w-5 h-5 text-[#00FF88]" />
                  Popular This Week
                </h3>
                <div className="space-y-3">
                  {popularPosts.map((post, i) => (
                    <div 
                      key={i}
                      className="pb-3 border-b border-white/5 last:border-0 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors"
                    >
                      <p 
                        className="text-sm text-white/90 mb-1"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {post.title}
                      </p>
                      <p className="text-xs text-white/50">
                        {post.views.toLocaleString()} views
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tag Cloud */}
              <motion.div
                className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#A259FF]/20 rounded-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 
                  className="text-lg text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  <Tag className="w-5 h-5 text-[#A259FF]" />
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tagCloud.map((tag, i) => (
                    <Badge
                      key={i}
                      className="px-3 py-1 bg-[#A259FF]/10 border border-[#A259FF]/30 text-[#A259FF] hover:bg-[#A259FF]/20 cursor-pointer transition-colors"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/10 rounded-xl overflow-hidden hover:border-[#00FFFF]/30 transition-all group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0, 255, 255, 0.1)' }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div 
            className="absolute inset-0 border-2 border-[#00FFFF] opacity-0 group-hover:opacity-30 transition-opacity"
            style={{ boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.3)' }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                className="px-2 py-1 text-xs bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h2 
            className="text-2xl text-white mb-3 group-hover:text-[#00FFFF] transition-colors"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
          >
            {post.title}
          </h2>

          <p 
            className="text-white/70 mb-4 line-clamp-2"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {post.summary}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{post.readTime}</span>
              </div>
            </div>

            <Button
              className="bg-transparent border border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
            >
              Read More →
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-white/40">
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{post.date}</span>
            <span>•</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{post.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}