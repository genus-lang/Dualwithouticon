import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { FilterToolbar } from './question-bank/FilterToolbar';
import { QuestionCard } from './question-bank/QuestionCard';
import { QuestionSidebar } from './question-bank/QuestionSidebar';
import { Pagination } from './question-bank/Pagination';

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

interface ProblemSetPageProps {
  navigationProps: NavigationProps;
}

export function ProblemSetPage({ navigationProps }: ProblemSetPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock question data
  const questions = [
    {
      id: 1,
      title: 'Reverse a Linked List',
      difficulty: 'medium' as const,
      tags: ['Linked List', 'Recursion'],
      rating: 4.5,
      solvedBy: 5600,
    },
    {
      id: 2,
      title: 'Find the Missing Number in Array',
      difficulty: 'easy' as const,
      tags: ['Array', 'Math', 'Logic'],
      rating: 4.2,
      solvedBy: 8300,
    },
    {
      id: 3,
      title: 'Binary Tree Maximum Path Sum',
      difficulty: 'hard' as const,
      tags: ['Tree', 'DFS', 'Recursion'],
      rating: 4.8,
      solvedBy: 2300,
    },
    {
      id: 4,
      title: 'Two Sum Problem',
      difficulty: 'easy' as const,
      tags: ['Array', 'Hash Table'],
      rating: 4.1,
      solvedBy: 12500,
    },
    {
      id: 5,
      title: 'Longest Palindromic Substring',
      difficulty: 'medium' as const,
      tags: ['String', 'DP'],
      rating: 4.6,
      solvedBy: 7200,
    },
    {
      id: 6,
      title: 'Merge K Sorted Lists',
      difficulty: 'hard' as const,
      tags: ['Linked List', 'Heap', 'Divide & Conquer'],
      rating: 4.7,
      solvedBy: 3100,
    },
    {
      id: 7,
      title: 'Valid Parentheses',
      difficulty: 'easy' as const,
      tags: ['Stack', 'String'],
      rating: 4.0,
      solvedBy: 9800,
    },
    {
      id: 8,
      title: 'LRU Cache Implementation',
      difficulty: 'medium' as const,
      tags: ['Design', 'Hash Table', 'Linked List'],
      rating: 4.5,
      solvedBy: 4200,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Animated Matrix Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Animated Glow Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)', top: '20%', left: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #A259FF 0%, transparent 70%)', bottom: '20%', right: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar {...navigationProps} />

        <div className="max-w-[1800px] mx-auto px-6 py-8 mt-16">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl text-[#00FFFF] mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
              Problem Set 💾
            </h1>
            <p className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Practice and master coding challenges
            </p>
          </div>

          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <FilterToolbar />

              {/* Question Grid */}
              <div className="grid gap-6 mt-8">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <QuestionCard question={question} onSolve={navigationProps.onStartMatch} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* Right Sidebar */}
            <QuestionSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}