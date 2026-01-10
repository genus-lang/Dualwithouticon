import { useState } from 'react';
import { Swords, Eye, StopCircle, Zap, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';

interface DualCodingModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

interface Match {
  id: string;
  players: [string, string];
  problem: string;
  duration: string;
  status: 'active' | 'paused';
}

export function DualCodingModule({ adminRole }: DualCodingModuleProps) {
  const [dualCodingEnabled, setDualCodingEnabled] = useState(true);
  const [aiAssistanceEnabled, setAiAssistanceEnabled] = useState(true);
  const [spectatorMode, setSpectatorMode] = useState(false);

  const activeMatches: Match[] = [
    { id: '1', players: ['coderX', 'devGuru'], problem: 'Binary Search Tree', duration: '12:45', status: 'active' },
    { id: '2', players: ['bugSlayer', 'codeNinja'], problem: 'Graph Traversal', duration: '08:30', status: 'active' },
    { id: '3', players: ['hackMaster', 'proDevil'], problem: 'Dynamic Programming', duration: '15:20', status: 'paused' },
  ];

  const forceTerminateMatch = (matchId: string) => {
    if (confirm('Force terminate this match? This will end the session immediately.')) {
      alert(`Match ${matchId} terminated`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Dual Coding & Arena Control</h1>
        <p className="text-gray-400">Manage dual coding sessions and arena settings</p>
      </div>

      {/* Global Controls */}
      <Card className="bg-gradient-to-br from-purple-950/20 to-gray-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Swords className="w-5 h-5" />
            Global Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="dual-coding" className="text-gray-300">
                Dual Coding Mode
              </Label>
              <Switch
                id="dual-coding"
                checked={dualCodingEnabled}
                onCheckedChange={setDualCodingEnabled}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="ai-assistance" className="text-gray-300">
                AI Assistance
              </Label>
              <Switch
                id="ai-assistance"
                checked={aiAssistanceEnabled}
                onCheckedChange={setAiAssistanceEnabled}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="spectator" className="text-gray-300">
                Spectator Mode
              </Label>
              <Switch
                id="spectator"
                checked={spectatorMode}
                onCheckedChange={setSpectatorMode}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">Turn Duration Limit</div>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="30" 
                  max="300" 
                  defaultValue="120" 
                  className="flex-1"
                />
                <span className="text-cyan-400 font-mono">120s</span>
              </div>
            </div>
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">AI Hint Limit</div>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  defaultValue="3" 
                  className="flex-1"
                />
                <span className="text-cyan-400 font-mono">3</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Matches */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Live Matches ({activeMatches.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeMatches.map((match) => (
              <div 
                key={match.id}
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                          {match.players[0][0].toUpperCase()}
                        </div>
                        <span className="text-gray-300 font-medium">{match.players[0]}</span>
                      </div>
                      <Swords className="w-4 h-4 text-purple-400" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xs font-bold">
                          {match.players[1][0].toUpperCase()}
                        </div>
                        <span className="text-gray-300 font-medium">{match.players[1]}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        {match.problem}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {match.duration}
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        match.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {match.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:border-cyan-500"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Monitor
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => forceTerminateMatch(match.id)}
                      className="border-gray-700 hover:border-red-500 hover:text-red-400"
                    >
                      <StopCircle className="w-4 h-4 mr-1" />
                      Terminate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Match Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-cyan-950/20 to-gray-900/30 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-cyan-400">47</div>
            <div className="text-sm text-gray-400">Active Matches</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-950/20 to-gray-900/30 border-purple-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-400">1,234</div>
            <div className="text-sm text-gray-400">Matches Today</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-950/20 to-gray-900/30 border-green-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">85%</div>
            <div className="text-sm text-gray-400">Completion Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
