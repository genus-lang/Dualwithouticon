import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronRight, Lightbulb, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

export function ProblemPanel() {
  const [showHints, setShowHints] = useState(false);
  const [constraintsOpen, setConstraintsOpen] = useState(false);

  return (
    <div className="w-80 bg-[#0A0F1C] border-r border-[#00FFFF]/20 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#00FFFF]/20">
        <div className="flex items-start justify-between mb-3">
          <h2 
            className="text-xl text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
          >
            Find the Longest Palindrome
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            Medium
          </Badge>
          <span className="text-xs text-white/60">•</span>
          <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Time Limit: 15 min
          </span>
        </div>

        {/* Divider */}
        <div 
          className="h-px w-full mt-4"
          style={{
            background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
          }}
        />
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {/* Problem Statement */}
          <div>
            <h3 className="text-sm text-white/80 mb-3" style={{ fontWeight: 600 }}>
              Problem Statement
            </h3>
            <p className="text-sm text-white/70 leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Given a string <code className="text-[#00FFFF] px-1">s</code>, find the length of the longest palindromic substring in <code className="text-[#00FFFF] px-1">s</code>.
            </p>
            <p className="text-sm text-white/70 leading-relaxed mt-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              A palindrome is a string that reads the same backward as forward.
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h3 className="text-sm text-white/80" style={{ fontWeight: 600 }}>
              Examples
            </h3>

            {/* Example 1 */}
            <div className="glassmorphism rounded-lg p-4 border border-[#00FFFF]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#00FFFF]" style={{ fontWeight: 600 }}>
                  Example 1
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-white/60 mb-1">Input:</div>
                  <div 
                    className="text-sm text-[#00FF88] bg-black/30 px-3 py-2 rounded border border-[#00FF88]/20"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    "ababa"
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/60 mb-1">Output:</div>
                  <div 
                    className="text-sm text-[#00FF88] bg-black/30 px-3 py-2 rounded border border-[#00FF88]/20"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    5
                  </div>
                </div>
                <div className="text-xs text-white/50 italic">
                  Explanation: "ababa" is itself a palindrome.
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="glassmorphism rounded-lg p-4 border border-[#00FFFF]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#00FFFF]" style={{ fontWeight: 600 }}>
                  Example 2
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-white/60 mb-1">Input:</div>
                  <div 
                    className="text-sm text-[#00FF88] bg-black/30 px-3 py-2 rounded border border-[#00FF88]/20"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    "cbbd"
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/60 mb-1">Output:</div>
                  <div 
                    className="text-sm text-[#00FF88] bg-black/30 px-3 py-2 rounded border border-[#00FF88]/20"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    2
                  </div>
                </div>
                <div className="text-xs text-white/50 italic">
                  Explanation: "bb" is the longest palindrome.
                </div>
              </div>
            </div>
          </div>

          {/* Constraints */}
          <Collapsible open={constraintsOpen} onOpenChange={setConstraintsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between text-white/80 hover:text-white hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm" style={{ fontWeight: 600 }}>Constraints</span>
                </div>
                {constraintsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 space-y-2 text-sm text-white/70 pl-6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <div>• 1 ≤ s.length ≤ 1000</div>
                <div>• s consists of only digits and English letters</div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Hints */}
          <div>
            <Button
              onClick={() => setShowHints(!showHints)}
              className="w-full bg-[#A259FF]/20 hover:bg-[#A259FF]/30 text-[#A259FF] border border-[#A259FF]/30"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </Button>

            {showHints && (
              <motion.div
                className="mt-3 space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="glassmorphism rounded-lg p-4 border border-[#A259FF]/30">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-[#A259FF] flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-white/70 leading-relaxed">
                      Consider expanding around the center. For each character, treat it as the middle of a potential palindrome.
                    </div>
                  </div>
                </div>

                <div className="glassmorphism rounded-lg p-4 border border-[#A259FF]/30">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-[#A259FF] flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-white/70 leading-relaxed">
                      Don't forget to handle both odd-length (single center) and even-length (two centers) palindromes.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
