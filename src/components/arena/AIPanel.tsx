import { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Lightbulb, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';

export function AIPanel() {
  const [aiEnabled, setAiEnabled] = useState(true);

  const hints = [
    {
      type: 'suggestion',
      icon: <Lightbulb className="w-4 h-4" />,
      title: 'Optimization Tip',
      message: 'Consider using a single pass algorithm to improve time complexity.',
      color: '#00FFFF',
    },
    {
      type: 'error',
      icon: <AlertCircle className="w-4 h-4" />,
      title: 'Potential Error',
      message: 'Line 7: You might be missing a return statement for edge cases.',
      color: '#FF0088',
      line: 7,
    },
    {
      type: 'success',
      icon: <CheckCircle className="w-4 h-4" />,
      title: 'Good Practice',
      message: 'Nice use of descriptive variable names!',
      color: '#00FF88',
    },
  ];

  return (
    <div className="w-80 bg-[#0A0F1C] border-l border-[#FF00FF]/20 flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-[#FF00FF]/20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FF00FF]/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#FF00FF]" />
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            AI Assistant
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={aiEnabled}
            onCheckedChange={setAiEnabled}
            className="data-[state=checked]:bg-[#00FFFF]"
          />
          <span className="text-xs text-white/60">
            {aiEnabled ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {!aiEnabled ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-12 h-12 text-white/20 mb-3" />
            <p className="text-white/40 text-sm">AI Assistant is disabled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Hint Banner */}
            <motion.div
              className="glassmorphism rounded-lg p-3 border border-[#FF00FF]/50"
              style={{ boxShadow: '0 0 20px rgba(255, 0, 255, 0.2)' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#FF00FF] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs text-[#FF00FF] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Active Analysis
                  </div>
                  <div className="text-xs text-white/80">
                    Monitoring your code for improvements...
                  </div>
                </div>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#00FF88]"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>

            {/* Hints List */}
            {hints.map((hint, index) => (
              <motion.div
                key={index}
                className="glassmorphism rounded-lg p-4 border hover:border-opacity-50 transition-all group cursor-pointer"
                style={{ borderColor: `${hint.color}30` }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${hint.color}20`, color: hint.color }}
                  >
                    {hint.icon}
                  </div>
                  <div className="flex-1">
                    <div 
                      className="text-sm mb-1"
                      style={{ 
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                        color: hint.color,
                      }}
                    >
                      {hint.title}
                    </div>
                    <div className="text-xs text-white/70 leading-relaxed">
                      {hint.message}
                    </div>
                  </div>
                </div>

                {hint.type === 'error' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="text-xs h-7 bg-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/30 border border-[#00FFFF]/30"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      Apply Fix
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 text-white/60 hover:text-white"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      Explain Bug
                    </Button>
                  </div>
                )}

                {hint.line && (
                  <div className="mt-2 text-xs text-white/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    → Line {hint.line}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="glassmorphism rounded-lg p-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Hints Used</div>
                <div className="text-lg text-[#00FFFF]" style={{ fontWeight: 700 }}>
                  3
                </div>
              </div>
              <div className="glassmorphism rounded-lg p-3 border border-white/10">
                <div className="text-xs text-white/60 mb-1">Accuracy</div>
                <div className="text-lg text-[#00FF88]" style={{ fontWeight: 700 }}>
                  94%
                </div>
              </div>
            </div>

            {/* Request Help */}
            <Button
              className="w-full bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#00FF88] text-black hover:opacity-90"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
            >
              <Bot className="w-4 h-4 mr-2" />
              Ask AI for Help
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
