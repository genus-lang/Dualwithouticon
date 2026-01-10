import { useState } from 'react';
import { Trophy, Plus, Calendar, Users, Lock, Play, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface ContestManagementModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  onNavigateToCreateContest?: () => void;
}

interface Contest {
  id: string;
  name: string;
  status: 'upcoming' | 'live' | 'ended';
  startTime: string;
  duration: string;
  participants: number;
  problems: number;
  type: 'rated' | 'unrated';
}

export function ContestManagementModule({ adminRole, onNavigateToCreateContest }: ContestManagementModuleProps) {
  const contests: Contest[] = [
    { id: '1', name: 'CodeSprint Weekly #45', status: 'live', startTime: '2026-01-10 14:00', duration: '2h', participants: 234, problems: 5, type: 'rated' },
    { id: '2', name: 'Practice Arena', status: 'live', startTime: '2026-01-10 10:00', duration: '4h', participants: 89, problems: 8, type: 'unrated' },
    { id: '3', name: 'Monthly Championship', status: 'upcoming', startTime: '2026-01-15 18:00', duration: '3h', participants: 567, problems: 6, type: 'rated' },
    { id: '4', name: 'Beginner Bootcamp', status: 'ended', startTime: '2026-01-09 12:00', duration: '2h', participants: 145, problems: 4, type: 'unrated' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">Contest Management</h1>
          <p className="text-gray-400">Create and manage coding competitions</p>
        </div>
        <Button 
          onClick={onNavigateToCreateContest}
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Contest
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-950/20 to-gray-900/30 border-green-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{contests.filter(c => c.status === 'live').length}</div>
            <div className="text-sm text-gray-400">Live Contests</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-950/20 to-gray-900/30 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">{contests.filter(c => c.status === 'upcoming').length}</div>
            <div className="text-sm text-gray-400">Upcoming</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-950/20 to-gray-900/30 border-purple-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-400">
              {contests.reduce((acc, c) => acc + c.participants, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Participants</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-950/20 to-gray-900/30 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-cyan-400">{contests.filter(c => c.type === 'rated').length}</div>
            <div className="text-sm text-gray-400">Rated Contests</div>
          </CardContent>
        </Card>
      </div>

      {/* Contests List */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            All Contests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contests.map((contest) => (
              <div 
                key={contest.id}
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-200 font-semibold">{contest.name}</h3>
                      <Badge 
                        className={`
                          ${contest.status === 'live' ? 'bg-green-500/20 text-green-400 border-green-500/30 animate-pulse' : ''}
                          ${contest.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}
                          ${contest.status === 'ended' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : ''}
                        `}
                      >
                        {contest.status === 'live' && '🔴 '}
                        {contest.status.toUpperCase()}
                      </Badge>
                      <Badge className={contest.type === 'rated' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}>
                        {contest.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {contest.startTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" />
                        {contest.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {contest.participants} participants
                      </div>
                      <div>
                        {contest.problems} problems
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {contest.status === 'live' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 hover:border-yellow-500"
                        >
                          <Lock className="w-4 h-4 mr-1" />
                          Freeze
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 hover:border-red-500"
                        >
                          <Square className="w-4 h-4 mr-1" />
                          End
                        </Button>
                      </>
                    )}
                    {contest.status === 'upcoming' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:border-green-500"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start Early
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:border-cyan-500"
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}