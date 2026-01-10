import { useState } from 'react';
import { Radio, StopCircle, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';

interface StreamingModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

export function StreamingModule({ adminRole }: StreamingModuleProps) {
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [spectatorMode, setSpectatorMode] = useState(true);

  const activeStreams = [
    { id: '1', streamer: 'proStreamer', viewers: 234, platform: 'Internal', delay: '10s' },
    { id: '2', streamer: 'codeGuru', viewers: 567, platform: 'YouTube', delay: '30s' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Streaming Control</h1>
        <p className="text-gray-400">Manage live streams and spectator mode</p>
      </div>

      {/* Global Controls */}
      <Card className="bg-gradient-to-br from-red-950/20 to-gray-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Global Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="streaming" className="text-gray-300">
                Live Streaming
              </Label>
              <Switch
                id="streaming"
                checked={streamingEnabled}
                onCheckedChange={setStreamingEnabled}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="spectator-stream" className="text-gray-300">
                Spectator Mode
              </Label>
              <Switch
                id="spectator-stream"
                checked={spectatorMode}
                onCheckedChange={setSpectatorMode}
              />
            </div>
          </div>

          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Stream Delay (Anti-Cheat)</div>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0" 
                max="60" 
                defaultValue="10" 
                className="flex-1"
              />
              <span className="text-cyan-400 font-mono">10s</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Streams */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Active Streams ({activeStreams.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeStreams.map((stream) => (
              <div 
                key={stream.id}
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                        </div>
                        <span className="text-gray-300 font-medium">@{stream.streamer}</span>
                      </div>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-semibold">
                        {stream.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {stream.viewers} viewers
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {stream.delay} delay
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 hover:border-red-500 hover:text-red-400"
                  >
                    <StopCircle className="w-4 h-4 mr-1" />
                    Force Stop
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
