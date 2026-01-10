import { useState } from 'react';
import { Play, RotateCcw, Terminal } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

export function IOConsole() {
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  const handleRun = () => {
    setIsRunning(true);
    setExecutionTime(0);
    
    const interval = setInterval(() => {
      setExecutionTime(prev => prev + 10);
    }, 10);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
    }, 1500);
  };

  const inputData = `head = [1, 2, 3, 4, 5]`;
  const outputData = `[5, 4, 3, 2, 1]

Execution completed successfully!
Time complexity: O(n)
Space complexity: O(1)`;

  const logs = [
    { level: 'info', message: 'Starting execution...', timestamp: '00:00.001' },
    { level: 'info', message: 'Processing node 1', timestamp: '00:00.105' },
    { level: 'info', message: 'Processing node 2', timestamp: '00:00.210' },
    { level: 'success', message: 'All test cases passed ✓', timestamp: '00:00.450' },
  ];

  return (
    <div className="h-72 bg-[#0A0F1C] border-t border-[#00FFFF]/20">
      <Tabs defaultValue="output" className="h-full flex flex-col">
        {/* Tab Header */}
        <div className="flex items-center justify-between border-b border-[#00FFFF]/20 px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00FFFF]" />
              <span className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                Console
              </span>
            </div>

            <TabsList className="bg-white/5 h-8">
              <TabsTrigger 
                value="input" 
                className="text-xs data-[state=active]:bg-[#00FFFF]/20 data-[state=active]:text-[#00FFFF]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Input
              </TabsTrigger>
              <TabsTrigger 
                value="output" 
                className="text-xs data-[state=active]:bg-[#00FFFF]/20 data-[state=active]:text-[#00FFFF]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Output
              </TabsTrigger>
              <TabsTrigger 
                value="logs" 
                className="text-xs data-[state=active]:bg-[#00FFFF]/20 data-[state=active]:text-[#00FFFF]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Logs
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center gap-3">
            {executionTime > 0 && (
              <Badge 
                variant="outline" 
                className="border-[#00FF88]/30 text-[#00FF88]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {(executionTime / 1000).toFixed(3)}s
              </Badge>
            )}

            <Button
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90 h-8 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="input" className="h-full m-0 p-4 overflow-auto">
            <pre 
              className="text-sm text-[#00FF88]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {inputData}
            </pre>
          </TabsContent>

          <TabsContent value="output" className="h-full m-0 p-4 overflow-auto relative">
            {isRunning ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Terminal className="w-12 h-12 text-[#00FFFF] mb-4" />
                <div className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Executing code...
                </div>
                <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-[#00FFFF] to-[#00FF88]" />
                </div>
              </div>
            ) : (
              <div>
                <pre 
                  className="text-sm text-[#00FF88]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {outputData}
                </pre>

                <div className="mt-4 inline-flex items-center gap-2 glassmorphism px-3 py-2 rounded-lg border border-[#00FF88]/30">
                  <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
                  <span className="text-xs text-[#00FF88]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Success
                  </span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="h-full m-0 p-4 overflow-auto">
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-xs"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <span className="text-white/40 flex-shrink-0 w-20">
                    {log.timestamp}
                  </span>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs ${
                    log.level === 'success' 
                      ? 'bg-[#00FF88]/20 text-[#00FF88]'
                      : log.level === 'error'
                      ? 'bg-[#FF0088]/20 text-[#FF0088]'
                      : 'bg-[#00FFFF]/20 text-[#00FFFF]'
                  }`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-white/80">{log.message}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
