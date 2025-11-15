import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Progress } from '../ui/progress';

export function MatchEditor() {
  const [language, setLanguage] = useState('python');
  const [aiAssist, setAiAssist] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [timeProgress] = useState(65);

  const code = `def longest_palindrome(s: str) -> int:
    if not s:
        return 0
    
    def expand_around_center(left: int, right: int) -> int:
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1
    
    max_len = 0
    for i in range(len(s)):
        # Odd length palindromes
        len1 = expand_around_center(i, i)
        # Even length palindromes
        len2 = expand_around_center(i, i + 1)
        max_len = max(max_len, len1, len2)
    
    return max_len`;

  return (
    <div className="flex-1 bg-[#0A0F1C] flex flex-col">
      {/* Toolbar */}
      <div className="h-14 border-b border-[#00FFFF]/20 flex items-center justify-between px-6 bg-gradient-to-r from-[#0A0F1C] to-[#101B2E]">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40 h-9 bg-white/5 border-[#00FFFF]/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-6 w-px bg-white/20" />

          {/* AI Assist Toggle */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A259FF]" />
            <span className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              AI Assist
            </span>
            <Switch
              checked={aiAssist}
              onCheckedChange={setAiAssist}
              className="data-[state=checked]:bg-[#A259FF]"
            />
          </div>

          <div className="h-6 w-px bg-white/20" />

          {/* Theme Toggle */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="h-9 text-white/60 hover:text-white"
          >
            {isDarkTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>

        {/* Status Indicator */}
        {isTyping && (
          <motion.div
            className="flex items-center gap-2 text-xs text-white/60"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              You are typing...
            </span>
          </motion.div>
        )}
      </div>

      {/* Time Progress Bar */}
      <div className="h-1 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #00FFFF 0%, #A259FF 100%)',
            width: `${timeProgress}%`,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto p-6">
        <div className="font-mono text-sm leading-relaxed">
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex group hover:bg-white/5 transition-colors">
              {/* Line Number */}
              <div 
                className="w-12 text-white/30 select-none flex-shrink-0 text-right pr-4 group-hover:text-[#00FFFF] transition-colors"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {i + 1}
              </div>

              {/* Code Line */}
              <div className="flex-1 relative">
                <pre className="text-white/90">
                  <code dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
                </pre>

                {/* Cursor effect */}
                {i === 8 && (
                  <motion.div
                    className="absolute top-0 w-0.5 h-5"
                    style={{ 
                      left: '200px',
                      background: 'linear-gradient(to bottom, #00FFFF, transparent)',
                      boxShadow: '0 0 10px #00FFFF',
                    }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cursor Trail Effect */}
        <motion.div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [100, 400, 700, 400, 100],
            y: [100, 300, 100, 200, 100],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* AI Suggestion Popup */}
      {aiAssist && (
        <motion.div
          className="absolute bottom-8 right-8 glassmorphism rounded-lg p-4 border border-[#A259FF]/30 max-w-sm z-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A259FF]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#A259FF]" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-[#A259FF] mb-1" style={{ fontWeight: 600 }}>
                AI Suggestion
              </div>
              <div className="text-xs text-white/70 leading-relaxed">
                Consider memoizing the center expansion results to optimize for repeated substrings.
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function highlightSyntax(line: string): string {
  let highlighted = line;
  
  // Keywords
  const keywords = ['def', 'return', 'if', 'not', 'while', 'and', 'for', 'in', 'range', 'max'];
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span style="color: #FF00FF">${keyword}</span>`);
  });
  
  // Functions
  highlighted = highlighted.replace(/\b([a-z_][a-z0-9_]*)\s*\(/g, '<span style="color: #00FFFF">$1</span>(');
  
  // Variables and parameters
  highlighted = highlighted.replace(/\b([a-z_][a-z0-9_]*)\b/g, '<span style="color: #00FF88">$1</span>');
  
  // Strings
  highlighted = highlighted.replace(/(["'])(.*?)\1/g, '<span style="color: #A259FF">$1$2$1</span>');
  
  // Comments
  highlighted = highlighted.replace(/(#.*$)/g, '<span style="color: #6272A4; font-style: italic;">$1</span>');
  
  // Numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, '<span style="color: #FFB86C">$1</span>');
  
  return highlighted;
}
