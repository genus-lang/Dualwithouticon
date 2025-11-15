import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Send, CheckCircle2, XCircle, Loader2, Lightbulb } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';

export function TestPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('results');

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const testCases = [
    { id: 1, passed: true, input: '"ababa"', expected: '5', actual: '5', time: '0.02s' },
    { id: 2, passed: true, input: '"cbbd"', expected: '2', actual: '2', time: '0.01s' },
    { id: 3, passed: false, input: '""', expected: '0', actual: 'null', time: '0.00s' },
    { id: 4, passed: true, input: '"racecar"', expected: '7', actual: '7', time: '0.03s' },
    { id: 5, passed: true, input: '"a"', expected: '1', actual: '1', time: '0.01s' },
  ];

  const passedCount = testCases.filter(tc => tc.passed).length;
  const totalCount = testCases.length;

  return (
    <div className="w-96 bg-[#0A0F1C] border-l border-[#A259FF]/20 flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        {/* Tab Header */}
        <div className="border-b border-[#A259FF]/20 px-4 py-3">
          <TabsList className="w-full bg-white/5 h-9 grid grid-cols-4">
            <TabsTrigger 
              value="input" 
              className="text-xs data-[state=active]:bg-[#A259FF]/20 data-[state=active]:text-[#A259FF]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Input
            </TabsTrigger>
            <TabsTrigger 
              value="output" 
              className="text-xs data-[state=active]:bg-[#A259FF]/20 data-[state=active]:text-[#A259FF]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Output
            </TabsTrigger>
            <TabsTrigger 
              value="results" 
              className="text-xs data-[state=active]:bg-[#A259FF]/20 data-[state=active]:text-[#A259FF]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Tests
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="text-xs data-[state=active]:bg-[#A259FF]/20 data-[state=active]:text-[#A259FF]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              AI Help
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {/* Input Tab */}
          <TabsContent value="input" className="h-full m-0 p-4 flex flex-col gap-3">
            <div>
              <div className="text-xs text-white/60 mb-2">Custom Input:</div>
              <Textarea
                placeholder="Enter your test input here..."
                className="min-h-[200px] bg-white/5 border-[#A259FF]/20 text-white font-mono text-sm"
                defaultValue='"ababa"'
              />
            </div>
          </TabsContent>

          {/* Output Tab */}
          <TabsContent value="output" className="h-full m-0 p-4">
            {isRunning ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-8 h-8 text-[#00FFFF] animate-spin mb-3" />
                <div className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Running tests...
                </div>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <pre 
                  className="text-sm text-[#00FF88]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
{`5

Test Case 1: Passed ✓
Input: "ababa"
Output: 5
Time: 0.02s`}
                </pre>
              </ScrollArea>
            )}
          </TabsContent>

          {/* Test Results Tab */}
          <TabsContent value="results" className="h-full m-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-3">
                {testCases.map((test, index) => (
                  <motion.div
                    key={test.id}
                    className="glassmorphism rounded-lg p-4 border"
                    style={{ 
                      borderColor: test.passed ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 0, 136, 0.3)',
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {test.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-[#00FF88]" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[#FF0088]" />
                        )}
                        <span 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'JetBrains Mono, monospace',
                            fontWeight: 600,
                            color: test.passed ? '#00FF88' : '#FF0088',
                          }}
                        >
                          Test Case {test.id}
                        </span>
                      </div>
                      <span 
                        className="text-xs text-white/60"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {test.time}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <div className="text-white/60">
                        Input: <span className="text-[#A259FF]">{test.input}</span>
                      </div>
                      <div className="text-white/60">
                        Expected: <span className="text-[#00FF88]">{test.expected}</span>
                      </div>
                      <div className="text-white/60">
                        Actual: <span className={test.passed ? 'text-[#00FF88]' : 'text-[#FF0088]'}>{test.actual}</span>
                      </div>
                    </div>

                    {!test.passed && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-xs text-[#FF0088]">
                          ⚠️ Edge case: Empty string not handled
                        </div>
                      </div>
                    )}

                    {/* Progress Ring */}
                    <div className="absolute top-4 right-4">
                      <svg className="w-8 h-8 transform -rotate-90">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke={test.passed ? '#00FF88' : '#FF0088'}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${test.passed ? 88 : 0} 88`}
                          style={{ transition: 'stroke-dasharray 0.5s' }}
                        />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* AI Help Tab */}
          <TabsContent value="ai" className="h-full m-0 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <div className="glassmorphism rounded-lg p-4 border border-[#A259FF]/30">
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="w-5 h-5 text-[#A259FF] flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#A259FF] mb-1" style={{ fontWeight: 600 }}>
                        Edge Case Issue Detected
                      </div>
                      <div className="text-xs text-white/70 leading-relaxed">
                        Your solution doesn't handle empty strings correctly. Consider adding a check at the beginning.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="text-xs bg-[#A259FF]/20 text-[#A259FF] hover:bg-[#A259FF]/30 border border-[#A259FF]/30"
                    >
                      Apply Fix
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-white/60 hover:text-white"
                    >
                      Explain Issue
                    </Button>
                  </div>
                </div>

                <div className="glassmorphism rounded-lg p-4 border border-[#00FFFF]/30">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#00FFFF] flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#00FFFF] mb-1" style={{ fontWeight: 600 }}>
                        Optimization Tip
                      </div>
                      <div className="text-xs text-white/70 leading-relaxed">
                        Your current time complexity is O(n²). This is optimal for this approach. Good work!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>

        {/* Bottom Action Buttons */}
        <div className="border-t border-[#A259FF]/20 p-4 flex gap-3">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className="flex-1 bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
          >
            {isRunning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="w-4 h-4 mr-2" />
                </motion.div>
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </>
            )}
          </Button>

          <Button
            className="flex-1 bg-[#A259FF] text-white hover:bg-[#A259FF]/90"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </div>

        {/* Pass/Fail Summary */}
        <div className="border-t border-[#A259FF]/20 px-4 py-3 bg-gradient-to-r from-[#0A0F1C] to-[#101B2E]">
          <div className="flex items-center justify-between">
            <div className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span className="text-[#00FF88]">{passedCount}</span>
              <span className="text-white/40"> / </span>
              <span className="text-white/60">{totalCount}</span>
              <span className="text-white/60 ml-2">Test Cases Passed</span>
            </div>
            <div className="flex gap-1">
              {testCases.map((test) => (
                <div
                  key={test.id}
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: test.passed ? '#00FF88' : '#FF0088',
                    boxShadow: `0 0 4px ${test.passed ? '#00FF88' : '#FF0088'}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
