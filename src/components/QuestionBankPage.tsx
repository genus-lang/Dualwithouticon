import { useState } from 'react';
import { motion } from 'motion/react';
import { QuestionBankHeader } from './question-bank/QuestionBankHeader';
import { FilterToolbar } from './question-bank/FilterToolbar';
import { QuestionCard } from './question-bank/QuestionCard';
import { QuestionSidebar } from './question-bank/QuestionSidebar';
import { Pagination } from './question-bank/Pagination';

interface QuestionBankPageProps {
  onExit: () => void;
  onSolveQuestion: () => void;
}

export function QuestionBankPage({ onExit, onSolveQuestion }: QuestionBankPageProps) {
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
      title: 'Merge K Sorted Lists',
      difficulty: 'hard' as const,
      tags: ['Linked List', 'Heap', 'Divide and Conquer'],
      rating: 4.7,
      solvedBy: 1800,
    },
    {
      id: 6,
      title: 'Valid Parentheses',
      difficulty: 'easy' as const,
      tags: ['Stack', 'String'],
      rating: 4.3,
      solvedBy: 9100,
    },
    {
      id: 7,
      title: 'Longest Palindromic Substring',
      difficulty: 'medium' as const,
      tags: ['String', 'Dynamic Programming'],
      rating: 4.6,
      solvedBy: 4200,
    },
    {
      id: 8,
      title: 'Implement LRU Cache',
      difficulty: 'medium' as const,
      tags: ['Hash Table', 'Linked List', 'Design'],
      rating: 4.4,
      solvedBy: 3700,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Matrix Code Rain */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#00FFFF] text-xs"
              style={{
                left: `${(i * 2) % 100}%`,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              animate={{
                y: ['-100px', '100vh'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 30 }, () => 
                Math.random() > 0.5 ? '1' : '0'
              ).join('')}
            </motion.div>
          ))}
        </div>

        {/* Neon Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            top: '20%',
            left: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #A259FF 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? '#00FFFF' : '#00FF88',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <QuestionBankHeader onBack={onExit} />

        {/* Filter Toolbar */}
        <FilterToolbar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="flex gap-6">
              {/* Question List */}
              <div className="flex-1 space-y-6">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <QuestionCard
                      question={question}
                      onSolveNow={onSolveQuestion}
                      onTryYourself={onSolveQuestion}
                    />
                  </motion.div>
                ))}

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={5}
                  onPageChange={setCurrentPage}
                />
              </div>

              {/* Sidebar - Hidden on small screens */}
              <div className="hidden xl:block">
                <div className="sticky top-8">
                  <QuestionSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
