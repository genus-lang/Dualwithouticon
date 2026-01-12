import { useState } from 'react';
import { Navbar } from './Navbar';
import { 
  Trophy, TrendingUp, Target, Clock, Award, ExternalLink, 
  ChevronRight, Flame, Calendar, Lock, ChevronDown, Filter,
  Code2, Zap, CheckCircle, XCircle, Activity, Brain, AlertTriangle,
  Lightbulb, Eye, EyeOff, Settings, Shield, Ban, Trash2, LogOut,
  UserX, RotateCcw, Mail, Calendar as CalendarIcon, TrendingDown, Edit
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface NavigationProps {
  onStartCoding?: () => void;
  onStartMatch?: () => void;
  onQuestionBank?: () => void;
  onProfile?: () => void;
  onEditProfile?: () => void;
  onContestResult?: () => void;
  onAnnouncements?: () => void;
  onCommunity?: () => void;
  onLeaderboard?: () => void;
  onContests?: () => void;
  onBlog?: () => void;
  onPrivacy?: () => void;
  onTerms?: () => void;
  onDocs?: () => void;
  onSupport?: () => void;
  onHome?: () => void;
}

interface ProfilePageProps {
  navigationProps: NavigationProps;
  viewMode?: 'owner' | 'public' | 'admin';
  isAdmin?: boolean;
}

interface Contest {
  name: string;
  platform: string;
  rank: number;
  score: number | string;
  date: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
  progress?: number;
  total?: number;
}

interface ActivityItem {
  id: string;
  type: 'solved' | 'match' | 'room' | 'contest';
  description: string;
  timestamp: string;
}

export function ProfilePage({ navigationProps, viewMode = 'owner', isAdmin = false }: ProfilePageProps) {
  const [contestFilter, setContestFilter] = useState('all');
  const [graphType, setGraphType] = useState<'rating' | 'skills'>('rating');
  const [currentViewMode, setCurrentViewMode] = useState<'owner' | 'public'>(viewMode === 'admin' ? 'owner' : viewMode);
  
  // Privacy Settings (Owner only)
  const [showContestHistory, setShowContestHistory] = useState(true);
  const [showExternalRatings, setShowExternalRatings] = useState(true);
  const [showStreakData, setShowStreakData] = useState(true);
  const [showAchievements, setShowAchievements] = useState(true);

  // Leaderboard Data
  const leaderboardData = {
    globalRank: 312,
    weeklyRank: 47,
    monthlyRank: 88,
    lastWeekChange: 12,
    lastMonthChange: -4,
    bestRank: 29,
  };

  // Admin-only data
  const adminData = {
    userId: 'usr_1234567890',
    email: 'meghram@example.com',
    accountCreated: '15 Jan 2024',
    lastLogin: '2 hours ago',
    accountStatus: 'active' as 'active' | 'blocked' | 'shadow-banned',
    matchesPlayed: 154,
    roomsCreated: 23,
    roomsJoined: 89,
    contestsJoined: 18,
    reportsReceived: 0,
  };

  const adminLogs = [
    { id: '1', action: 'Account created', timestamp: '15 Jan 2024', admin: 'System' },
    { id: '2', action: 'First contest participation', timestamp: '20 Jan 2024', admin: 'System' },
    { id: '3', action: 'Reached Level 10', timestamp: '05 Feb 2024', admin: 'System' },
  ];

  // User Data
  const userData = {
    username: '@meghram_meena',
    fullName: 'Meghram Meena',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meghram',
    rating: 1823,
    level: 12,
    xp: 1240,
    maxXp: 1900,
    isOnline: true,
  };

  // Streak Data
  const streakData = {
    currentStreak: 14,
    longestStreak: 31,
    weeklyActive: 5,
    weeklyTotal: 7,
    monthlyConsistency: 82,
  };

  // Stats Data
  const statsData = [
    { label: 'Matches Played', value: '154', icon: Trophy },
    { label: 'Wins', value: '92', icon: Target },
    { label: 'Accuracy', value: '87.3%', icon: TrendingUp },
    { label: 'Total Time Coded', value: '78 hrs', icon: Clock },
  ];

  // Contest History
  const contests: Contest[] = [
    { name: 'Weekly Clash #12', platform: 'CodeArena', rank: 42, score: 560, date: '12 Sep' },
    { name: 'CF Round 918', platform: 'Codeforces', rank: 1872, score: '—', date: '08 Sep' },
    { name: 'LeetCode Weekly 402', platform: 'LeetCode', rank: 341, score: '—', date: '01 Sep' },
    { name: 'Monthly Challenge #8', platform: 'CodeArena', rank: 89, score: 412, date: '28 Aug' },
    { name: 'CodeChef Starters 105', platform: 'CodeChef', rank: 567, score: '—', date: '24 Aug' },
  ];

  const filteredContests = contests.filter(c => 
    contestFilter === 'all' || c.platform.toLowerCase() === contestFilter
  );

  // External Ratings
  const externalRatings = [
    {
      platform: 'Codeforces',
      handle: '@meghram_cf',
      rating: 1675,
      rank: 'Expert',
      color: '#3B82F6',
    },
    {
      platform: 'LeetCode',
      handle: '@meghram',
      rating: 2021,
      rank: '341 Problems Solved',
      color: '#F59E0B',
    },
    {
      platform: 'CodeChef',
      handle: '@meghram_iiit',
      rating: 1803,
      rank: '4 Stars',
      color: '#8B5CF6',
    },
  ];

  // Achievements
  const achievements: Achievement[] = [
    { id: '1', title: '100 Matches', description: 'Complete 100 matches', unlocked: true, icon: '🎯', progress: 154, total: 100 },
    { id: '2', title: 'Accuracy Master', description: 'Achieve 90% accuracy', unlocked: false, icon: '🎪', progress: 87, total: 90 },
    { id: '3', title: 'Contest Winner', description: 'Win a contest', unlocked: true, icon: '🏆' },
    { id: '4', title: 'Streak Master', description: '30 day streak', unlocked: true, icon: '🔥', progress: 31, total: 30 },
    { id: '5', title: 'Speed Demon', description: 'Complete match in under 10 min', unlocked: true, icon: '⚡' },
    { id: '6', title: 'Problem Solver', description: 'Solve 500 problems', unlocked: false, icon: '🧩', progress: 341, total: 500 },
    { id: '7', title: 'Consistent Coder', description: 'Code 30 days in a month', unlocked: false, icon: '📅', progress: 24, total: 30 },
    { id: '8', title: 'Challenger', description: 'Challenge 50 users', unlocked: false, icon: '⚔️', progress: 32, total: 50 },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Performance Data
  const ratingData = [
    { date: 'Jan', rating: 1245 },
    { date: 'Feb', rating: 1398 },
    { date: 'Mar', rating: 1456 },
    { date: 'Apr', rating: 1523 },
    { date: 'May', rating: 1634 },
    { date: 'Jun', rating: 1789 },
    { date: 'Jul', rating: 1823 },
  ];

  const skillsData = [
    { skill: 'Speed', value: 85 },
    { skill: 'Accuracy', value: 87 },
    { skill: 'Problem Solving', value: 78 },
    { skill: 'Debugging', value: 82 },
    { skill: 'Consistency', value: 82 },
  ];

  // Recent Activity
  const activities: ActivityItem[] = [
    { id: '1', type: 'solved', description: 'Solved "Longest Common Subsequence"', timestamp: '2 hours ago' },
    { id: '2', type: 'match', description: 'Won match vs @coderx', timestamp: '5 hours ago' },
    { id: '3', type: 'room', description: 'Joined Room "Weekly Practice"', timestamp: '1 day ago' },
    { id: '4', type: 'contest', description: 'Participated in Contest #12', timestamp: '2 days ago' },
    { id: '5', type: 'solved', description: 'Solved "Binary Tree Maximum Path Sum"', timestamp: '2 days ago' },
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'solved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'match': return <Trophy className="w-4 h-4 text-[#00FFFF]" />;
      case 'room': return <Code2 className="w-4 h-4 text-purple-500" />;
      case 'contest': return <Award className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Navbar {...navigationProps} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <button 
              onClick={navigationProps.onHome}
              className="text-[#00FFFF] hover:underline"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-white/60">Profile</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-white flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
              👤 Profile
            </h1>

            {/* View Mode Toggle & Edit Profile (Show only for owner or admin) */}
            {(viewMode === 'owner' || isAdmin) && (
              <div className="flex gap-2">
                {/* View Toggle Buttons (Owner only) */}
                {viewMode === 'owner' && (
                  <div className="flex gap-1 p-1 bg-[#0A0F1C]/80 rounded-lg border border-[#00FFFF]/20">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentViewMode('owner')}
                      className={currentViewMode === 'owner' 
                        ? 'bg-[#00FFFF]/20 text-[#00FFFF]' 
                        : 'text-white/60 hover:text-white'
                      }
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Owner
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentViewMode('public')}
                      className={currentViewMode === 'public' 
                        ? 'bg-[#00FFFF]/20 text-[#00FFFF]' 
                        : 'text-white/60 hover:text-white'
                      }
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <EyeOff className="w-4 h-4 mr-2" />
                      Public View
                    </Button>
                  </div>
                )}

                {/* Edit Profile Button (Owner only) */}
                {viewMode === 'owner' && (
                  <Button
                    onClick={navigationProps.onEditProfile}
                    className="bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/40 hover:bg-[#00FFFF]/30"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}

                {/* Admin View Badge */}
                {viewMode === 'admin' && (
                  <Badge 
                    className="bg-red-500/20 text-red-400 border border-red-500/40"
                    style={{ fontFamily: 'JetBrains Mono, monospace', padding: '6px 12px' }}
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    Admin View
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* User Summary Section */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-[#00FFFF]">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="bg-[#00FFFF]/20 text-[#00FFFF] text-2xl">
                    {userData.username.charAt(1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-[#1A1A1A] ${
                  userData.isOnline ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl text-white mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                    {userData.username}
                  </h2>
                  <p className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {userData.fullName}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      CODING RATING
                    </p>
                    <p className="text-xl text-[#00FFFF]" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {userData.rating}
                    </p>
                  </div>

                  <Separator orientation="vertical" className="h-12 bg-white/10" />

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      LEVEL
                    </p>
                    <p className="text-xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      Level {userData.level}
                    </p>
                  </div>

                  <Separator orientation="vertical" className="h-12 bg-white/10" />

                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        XP PROGRESS
                      </p>
                      <p className="text-xs text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {userData.xp} / {userData.maxXp}
                      </p>
                    </div>
                    <Progress 
                      value={(userData.xp / userData.maxXp) * 100} 
                      className="h-2 bg-[#0A0F1C]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consistency & Streak Section */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Flame className="w-5 h-5 text-orange-500" />
              Consistency & Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  CURRENT STREAK
                </p>
                <p className="text-3xl text-orange-500" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  {streakData.currentStreak} <span className="text-lg text-white/60">days</span>
                </p>
              </div>

              <div>
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  LONGEST STREAK
                </p>
                <p className="text-3xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  {streakData.longestStreak} <span className="text-lg text-white/60">days</span>
                </p>
              </div>

              <div>
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  WEEKLY ACTIVITY
                </p>
                <p className="text-3xl text-green-500" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  {streakData.weeklyActive} <span className="text-lg text-white/60">/ {streakData.weeklyTotal}</span>
                </p>
              </div>

              <div>
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  MONTHLY CONSISTENCY
                </p>
                <p className="text-3xl text-[#00FFFF]" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  {streakData.monthlyConsistency}<span className="text-lg">%</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-white/50 mt-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Streak is calculated based on daily activity including solving problems, matches, or contests.
            </p>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-5 h-5 text-[#00FFFF]" />
                  <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {stat.label.toUpperCase()}
                  </p>
                </div>
                <p className="text-2xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contest History & Results */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Trophy className="w-5 h-5 text-yellow-500" />
                Contest History & Results
              </CardTitle>
              
              <Select value={contestFilter} onValueChange={setContestFilter}>
                <SelectTrigger className="w-[180px] bg-[#0A0F1C] border-[#00FFFF]/30 text-white">
                  <SelectValue placeholder="Filter by platform" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/30">
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="codearena">CodeArena</SelectItem>
                  <SelectItem value="codeforces">Codeforces</SelectItem>
                  <SelectItem value="leetcode">LeetCode</SelectItem>
                  <SelectItem value="codechef">CodeChef</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Summary Stats */}
            <div className="flex flex-wrap gap-6 mt-4 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <div>
                <span className="text-white/60">Total Contests: </span>
                <span className="text-white">{contests.length}</span>
              </div>
              <div>
                <span className="text-white/60">Best Rank: </span>
                <span className="text-green-500">#{Math.min(...contests.map(c => c.rank))}</span>
              </div>
              <div>
                <span className="text-white/60">Average Rank: </span>
                <span className="text-white">#{Math.round(contests.reduce((sum, c) => sum + c.rank, 0) / contests.length)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Contest Table */}
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs text-white/60 py-3 px-2">CONTEST NAME</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">PLATFORM</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">RANK</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">SCORE</th>
                    <th className="text-left text-xs text-white/60 py-3 px-2">DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContests.map((contest, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-white/5 hover:bg-[#00FFFF]/5 transition-colors cursor-pointer"
                      onClick={() => contest.platform === 'CodeArena' && navigationProps.onContestResult?.()}
                    >
                      <td className="py-3 px-2 text-white">{contest.name}</td>
                      <td className="py-3 px-2">
                        <Badge className="bg-purple-500/20 text-purple-300">
                          {contest.platform}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <span className={
                          contest.rank <= 50 ? 'text-green-500' :
                          contest.rank <= 200 ? 'text-yellow-500' :
                          'text-white/60'
                        }>
                          #{contest.rank}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-white/80">{contest.score}</td>
                      <td className="py-3 px-2 text-white/60">{contest.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* External Ratings Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {externalRatings.map((platform, index) => (
            <Card 
              key={index}
              className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <span>{platform.platform}</span>
                  <ExternalLink className="w-4 h-4 text-[#00FFFF]" />
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {platform.handle}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    RATING
                  </p>
                  <p className="text-2xl" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: platform.color }}>
                    {platform.rating}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    RANK / STATUS
                  </p>
                  <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {platform.rank}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements & Badges */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Achievements
              </div>
              <span className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {unlockedCount} / {achievements.length} unlocked
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-[#00FFFF]/10 to-[#9333EA]/10 border-[#00FFFF]/30' 
                      : 'bg-[#0A0F1C]/50 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-3xl ${!achievement.unlocked && 'grayscale opacity-40'}`}>
                      {achievement.icon}
                    </span>
                    {!achievement.unlocked && <Lock className="w-4 h-4 text-white/40" />}
                  </div>
                  <h4 className={`text-sm mb-1 ${achievement.unlocked ? 'text-white' : 'text-white/40'}`} style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs ${achievement.unlocked ? 'text-white/60' : 'text-white/30'}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {achievement.description}
                  </p>
                  {achievement.progress !== undefined && achievement.total && (
                    <p className={`text-xs mt-2 ${achievement.unlocked ? 'text-[#00FFFF]' : 'text-white/40'}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {achievement.progress} / {achievement.total}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Performance Insights (Owner & Admin Only) */}
        {(currentViewMode === 'owner' || viewMode === 'admin') && (
          <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Brain className="w-5 h-5 text-purple-500" />
                AI Performance Insights
              </CardTitle>
              <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                These insights are generated from your matches, contests, and problem-solving activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Strengths */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h4 className="text-white font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Strengths
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Strong performance in medium-difficulty problems
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      High accuracy in array and DP problems
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Consistent contest participation
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Improvement Areas */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <h4 className="text-white font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Improvement Areas
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Slower execution in hard problems
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Accuracy drops under time pressure
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Low activity on weekends
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Recommendations */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#00FFFF]" />
                  <h4 className="text-white font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Recommendations
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#00FFFF] mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Practice 2 hard problems daily
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#00FFFF] mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Join more rated contests
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#00FFFF] mt-0.5" />
                    <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Focus on debugging speed drills
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Standing */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Trophy className="w-5 h-5 text-yellow-500" />
              Leaderboard Standing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Global Rank */}
              <div 
                className="p-4 rounded-lg bg-gradient-to-br from-[#00FFFF]/10 to-[#9333EA]/10 border border-[#00FFFF]/30 cursor-pointer hover:border-[#00FFFF]/60 transition-colors"
                onClick={navigationProps.onLeaderboard}
              >
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  GLOBAL RANK
                </p>
                <p className="text-3xl text-[#00FFFF] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  #{leaderboardData.globalRank}
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    +{leaderboardData.lastWeekChange} this week
                  </span>
                </div>
              </div>

              {/* Weekly Rank */}
              <div 
                className="p-4 rounded-lg bg-[#0A0F1C]/80 border border-white/10 cursor-pointer hover:border-[#00FFFF]/30 transition-colors"
                onClick={navigationProps.onLeaderboard}
              >
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  WEEKLY RANK
                </p>
                <p className="text-3xl text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  #{leaderboardData.weeklyRank}
                </p>
                <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Click to view leaderboard
                </p>
              </div>

              {/* Monthly Rank */}
              <div 
                className="p-4 rounded-lg bg-[#0A0F1C]/80 border border-white/10 cursor-pointer hover:border-[#00FFFF]/30 transition-colors"
                onClick={navigationProps.onLeaderboard}
              >
                <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  MONTHLY RANK
                </p>
                <p className="text-3xl text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  #{leaderboardData.monthlyRank}
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-red-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {leaderboardData.lastMonthChange} this month
                  </span>
                </div>
              </div>
            </div>

            {/* Best Rank Achieved */}
            <Alert className="bg-[#00FFFF]/5 border-[#00FFFF]/30">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <AlertDescription className="text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <strong>Best Rank Achieved:</strong> #{leaderboardData.bestRank}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Privacy Settings (Owner Only) */}
        {currentViewMode === 'owner' && viewMode === 'owner' && (
          <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <Settings className="w-5 h-5 text-[#00FFFF]" />
                Privacy Settings
              </CardTitle>
              <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Control what others can see on your public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-contest" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Show Contest History
                  </Label>
                  <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Display your contest participation and ranks publicly
                  </p>
                </div>
                <Switch
                  id="show-contest"
                  checked={showContestHistory}
                  onCheckedChange={setShowContestHistory}
                />
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-external" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Show External Ratings
                  </Label>
                  <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Display ratings from Codeforces, LeetCode, CodeChef
                  </p>
                </div>
                <Switch
                  id="show-external"
                  checked={showExternalRatings}
                  onCheckedChange={setShowExternalRatings}
                />
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-streak" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Show Streak Data
                  </Label>
                  <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Display your current and longest streaks
                  </p>
                </div>
                <Switch
                  id="show-streak"
                  checked={showStreakData}
                  onCheckedChange={setShowStreakData}
                />
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-achievements" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Show Achievements
                  </Label>
                  <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Display your unlocked badges and achievements
                  </p>
                </div>
                <Switch
                  id="show-achievements"
                  checked={showAchievements}
                  onCheckedChange={setShowAchievements}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Controls (Admin Only) */}
        {viewMode === 'admin' && (
          <>
            {/* Identity & Status Panel */}
            <Card className="bg-[#1A1A1A]/80 border-red-500/30 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Shield className="w-5 h-5 text-red-500" />
                  Admin: Identity & Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      USER ID
                    </Label>
                    <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {adminData.userId}
                    </p>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      EMAIL
                    </Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#00FFFF]" />
                      <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {adminData.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ACCOUNT CREATED
                    </Label>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#00FFFF]" />
                      <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {adminData.accountCreated}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      LAST LOGIN
                    </Label>
                    <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {adminData.lastLogin}
                    </p>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ACCOUNT STATUS
                    </Label>
                    <Badge className={
                      adminData.accountStatus === 'active' ? 'bg-green-500/20 text-green-400' :
                      adminData.accountStatus === 'blocked' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }>
                      {adminData.accountStatus.toUpperCase()}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      REPORTS RECEIVED
                    </Label>
                    <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {adminData.reportsReceived}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Overview */}
            <Card className="bg-[#1A1A1A]/80 border-red-500/30 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Activity className="w-5 h-5 text-red-500" />
                  Admin: Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      MATCHES PLAYED
                    </p>
                    <p className="text-2xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {adminData.matchesPlayed}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ROOMS CREATED
                    </p>
                    <p className="text-2xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {adminData.roomsCreated}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ROOMS JOINED
                    </p>
                    <p className="text-2xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {adminData.roomsJoined}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      CONTESTS JOINED
                    </p>
                    <p className="text-2xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {adminData.contestsJoined}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      REPORTS
                    </p>
                    <p className="text-2xl text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {adminData.reportsReceived}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Actions (Danger Zone) */}
            <Card className="bg-[#1A1A1A]/80 border-red-500/40 mb-6">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <AlertTriangle className="w-5 h-5" />
                  Admin Actions (Danger Zone)
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  All actions are logged and irreversible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Block User
                  </Button>

                  <Button
                    variant="outline"
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Shadow Ban
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Streak
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Rating
                  </Button>

                  <Button
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Force Logout
                  </Button>

                  <Button
                    variant="outline"
                    className="border-red-500/50 text-red-500 hover:bg-red-500/20"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Logs */}
            <Card className="bg-[#1A1A1A]/80 border-red-500/30 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Activity className="w-5 h-5 text-red-500" />
                  Admin Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {adminLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#0A0F1C]/50 border border-white/5"
                    >
                      <div>
                        <p className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {log.action}
                        </p>
                        <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          by {log.admin}
                        </p>
                      </div>
                      <p className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {log.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Performance Analytics */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <TrendingUp className="w-5 h-5 text-green-500" />
                Performance Analytics
              </CardTitle>
              
              <div className="flex gap-2">
                <Button
                  variant={graphType === 'rating' ? 'default' : 'outline'}
                  onClick={() => setGraphType('rating')}
                  className={graphType === 'rating' 
                    ? 'bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/40' 
                    : 'border-white/20 text-white/60 hover:text-white'
                  }
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Rating vs Time
                </Button>
                <Button
                  variant={graphType === 'skills' ? 'default' : 'outline'}
                  onClick={() => setGraphType('skills')}
                  className={graphType === 'skills' 
                    ? 'bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/40' 
                    : 'border-white/20 text-white/60 hover:text-white'
                  }
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Skills Radar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {graphType === 'rating' ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#ffffff60"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#ffffff60"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1A1A', 
                      border: '1px solid #00FFFF40',
                      borderRadius: '8px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#00FFFF" 
                    strokeWidth={2}
                    dot={{ fill: '#00FFFF', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    stroke="#ffffff60"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                  />
                  <PolarRadiusAxis 
                    stroke="#ffffff60"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                  />
                  <Radar 
                    dataKey="value" 
                    stroke="#00FFFF" 
                    fill="#00FFFF" 
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Activity className="w-5 h-5 text-[#00FFFF]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0F1C]/50 hover:bg-[#00FFFF]/5 transition-colors cursor-pointer"
                >
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {activity.description}
                    </p>
                    <p className="text-xs text-white/40 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {activity.timestamp}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}