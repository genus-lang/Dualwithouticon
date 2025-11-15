import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Play, Code2, MessageSquare, Star, Users, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Question {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  rating: number;
  solvedBy: number;
  videoUrl?: string;
  explanation?: string;
  code?: string;
}

interface QuestionCardProps {
  question: Question;
  onSolveNow: () => void;
  onTryYourself: () => void;
}

export function QuestionCard({ question, onSolveNow, onTryYourself }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColors = {
    easy: { bg: '#00FF88', text: '#00FF88' },
    medium: { bg: '#FFB86C', text: '#FFB86C' },
    hard: { bg: '#FF0088', text: '#FF0088' },
  };

  const diffColor = difficultyColors[question.difficulty];

  return (
    <motion.div
      className="glassmorphism rounded-lg border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -3,
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 
          className="text-lg text-white mb-3 relative inline-block group cursor-pointer"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {question.title}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-[#00FFFF]"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </h3>

        {/* Metadata Row */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {/* Difficulty Badge */}
          <Badge
            className="border"
            style={{
              backgroundColor: `${diffColor.bg}20`,
              borderColor: `${diffColor.bg}50`,
              color: diffColor.text,
              fontFamily: 'JetBrains Mono, monospace',
              textShadow: `0 0 10px ${diffColor.bg}`,
            }}
          >
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </Badge>

          {/* Tags */}
          {question.tags.map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className="bg-[#A259FF]/10 border-[#A259FF]/30 text-[#A259FF] text-xs"
            >
              {tag}
            </Badge>
          ))}

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                fill={i < Math.floor(question.rating) ? 'currentColor' : 'none'}
              />
            ))}
            <span className="text-xs text-white/60 ml-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {question.rating.toFixed(1)}
            </span>
          </div>

          {/* Solved Count */}
          <div className="flex items-center gap-1 text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Users className="w-3 h-3" />
            Solved by {(question.solvedBy / 1000).toFixed(1)}k users
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onSolveNow}
              className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90 relative overflow-hidden group"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
            >
              <Code2 className="w-4 h-4 mr-2" />
              Solve Now
              
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ scale: 0, opacity: 1 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>

          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="glassmorphism border-[#00FFFF]/30 text-white hover:border-[#00FFFF]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View Solution
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t border-[#00FFFF]/20 overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 255, 255, 0.05), transparent)',
            }}
          >
            <div className="p-6">
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="w-full bg-white/5 mb-4 grid grid-cols-3">
                  <TabsTrigger 
                    value="video"
                    className="data-[state=active]:bg-[#00FFFF]/20 data-[state=active]:text-[#00FFFF]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger 
                    value="code"
                    className="data-[state=active]:bg-[#00FFFF]/20 data-[state=active]:text-[#00FFFF]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger 
                    value="explanation"
                    className="data-[state=active]:bg-[#00FFFF]/20 data-[state=active]:text-[#00FFFF]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Explanation
                  </TabsTrigger>
                </TabsList>

                {/* Video Tab */}
                <TabsContent value="video" className="space-y-4">
                  <div className="relative glassmorphism rounded-lg overflow-hidden border border-[#00FFFF]/20 aspect-video flex items-center justify-center bg-black/50">
                    <motion.button
                      className="w-16 h-16 rounded-full bg-[#00FFFF]/20 border-2 border-[#00FFFF] flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-8 h-8 text-[#00FFFF] ml-1" fill="currentColor" />
                    </motion.button>
                    <div className="absolute bottom-3 left-3 text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Duration: 12:45 • 15.2k views
                    </div>
                  </div>
                </TabsContent>

                {/* Code Tab */}
                <TabsContent value="code">
                  <div className="glassmorphism rounded-lg p-4 border border-[#A259FF]/20 bg-black/30">
                    <pre className="text-sm overflow-x-auto" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <code className="text-white/90">
{`def reverse_linked_list(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`}
                      </code>
                    </pre>
                  </div>
                </TabsContent>

                {/* Explanation Tab */}
                <TabsContent value="explanation">
                  <div className="space-y-3 text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#00FFFF]/20 flex items-center justify-center flex-shrink-0 text-[#00FFFF] text-xs mt-0.5">
                        1
                      </div>
                      <p>Initialize two pointers: <code className="text-[#A259FF] px-1">prev</code> (None) and <code className="text-[#A259FF] px-1">current</code> (head)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#00FFFF]/20 flex items-center justify-center flex-shrink-0 text-[#00FFFF] text-xs mt-0.5">
                        2
                      </div>
                      <p>Traverse the list, reversing node links iteratively</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#00FFFF]/20 flex items-center justify-center flex-shrink-0 text-[#00FFFF] text-xs mt-0.5">
                        3
                      </div>
                      <p>Return <code className="text-[#A259FF] px-1">prev</code> as the new head</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Try Yourself Button */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={onTryYourself}
                  className="w-full h-12 text-base relative overflow-hidden group"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    background: 'linear-gradient(90deg, #A259FF 0%, #00FFFF 100%)',
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try Yourself 💡
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </Button>
                <p className="text-xs text-center text-white/50 mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Launch interactive editor to practice this problem
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
