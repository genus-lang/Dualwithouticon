import { useState } from 'react';
import { Navbar } from './Navbar';
import { 
  Eye, MessageSquare, Star, Code2, Edit, Calendar, Info, Linkedin, Github, Mail, MapPin, Briefcase, ExternalLink, Trophy, CheckCircle2
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

// User data
const userData = {
  username: 'code_master',
  displayName: 'Alex Chen',
  fullName: 'Alex Chen',
  bio: 'Full Stack Developer | Competitive Programmer | Open Source Contributor',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  rank: '~42,316',
  location: 'San Francisco, CA',
  company: 'Tech Corp',
  email: 'alex.chen@email.com',
  github: 'https://github.com/alexchen',
  linkedin: 'https://linkedin.com/in/alexchen',
  website: 'https://alexchen.dev',
};

// Problem stats
const problemStats = {
  totalProblems: 3007,
  solved: 347,
  attempting: 12,
  easy: { solved: 180, total: 922 },
  medium: { solved: 130, total: 1985 },
  hard: { solved: 37, total: 900 },
};

// Community stats
const communityStats = [
  { icon: Eye, label: 'Views', value: 0, lastWeek: 0, color: 'text-blue-500' },
  { icon: Code2, label: 'Solution', value: 0, lastWeek: 0, color: 'text-green-500' },
  { icon: MessageSquare, label: 'Discuss', value: 0, lastWeek: 0, color: 'text-cyan-500' },
  { icon: Star, label: 'Reputation', value: 0, lastWeek: 0, color: 'text-orange-500' },
];

// Rating progression data
const ratingData = [
  { month: 'Jan', rating: 1200 },
  { month: 'Feb', rating: 1280 },
  { month: 'Mar', rating: 1350 },
  { month: 'Apr', rating: 1420 },
  { month: 'May', rating: 1380 },
  { month: 'Jun', rating: 1465 },
  { month: 'Jul', rating: 1510 },
  { month: 'Aug', rating: 1488 },
  { month: 'Sep', rating: 1542 },
  { month: 'Oct', rating: 1580 },
  { month: 'Nov', rating: 1625 },
  { month: 'Dec', rating: 1680 },
];

// Generate activity heatmap data for past year
const generateActivityData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random activity level (0-4) - mostly 0 for empty state
    const level = Math.random() > 0.85 ? Math.floor(Math.random() * 5) : 0;
    
    data.push({
      date: date.toISOString().split('T')[0],
      count: level,
      level: level,
    });
  }
  
  return data;
};

const activityData = generateActivityData();

// Recent AC (Accepted) submissions
const recentACData = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', date: '2 hours ago', language: 'C++', time: '5ms' },
  { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', date: '5 hours ago', language: 'Python', time: '45ms' },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', date: '1 day ago', language: 'Java', time: '12ms' },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', date: '2 days ago', language: 'C++', time: '8ms' },
  { id: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', date: '3 days ago', language: 'JavaScript', time: '78ms' },
  { id: 6, title: 'Reverse Integer', difficulty: 'Easy', date: '4 days ago', language: 'Python', time: '32ms' },
  { id: 7, title: 'String to Integer (atoi)', difficulty: 'Medium', date: '5 days ago', language: 'C++', time: '3ms' },
  { id: 8, title: 'Container With Most Water', difficulty: 'Medium', date: '1 week ago', language: 'Java', time: '18ms' },
];

// Contest Results
const contestResults = [
  { 
    id: 1, 
    name: 'Weekly Contest 372', 
    date: 'Dec 15, 2023', 
    rank: 458, 
    totalParticipants: 12432, 
    solved: '3/4', 
    rating: '+28',
    ratingChange: 'positive'
  },
  { 
    id: 2, 
    name: 'Biweekly Contest 118', 
    date: 'Dec 8, 2023', 
    rank: 1245, 
    totalParticipants: 8567, 
    solved: '2/4', 
    rating: '-12',
    ratingChange: 'negative'
  },
  { 
    id: 3, 
    name: 'Weekly Contest 371', 
    date: 'Dec 1, 2023', 
    rank: 324, 
    totalParticipants: 11890, 
    solved: '4/4', 
    rating: '+42',
    ratingChange: 'positive'
  },
  { 
    id: 4, 
    name: 'Weekly Contest 370', 
    date: 'Nov 24, 2023', 
    rank: 789, 
    totalParticipants: 10234, 
    solved: '3/4', 
    rating: '+15',
    ratingChange: 'positive'
  },
  { 
    id: 5, 
    name: 'Biweekly Contest 117', 
    date: 'Nov 18, 2023', 
    rank: 2156, 
    totalParticipants: 9012, 
    solved: '2/4', 
    rating: '-8',
    ratingChange: 'negative'
  },
];

// Solutions posted
const solutionsData = [
  { 
    id: 1, 
    title: 'Elegant DP Solution for Longest Palindromic Substring', 
    problem: 'Longest Palindromic Substring',
    language: 'C++',
    votes: 234, 
    views: 5678,
    date: '3 days ago'
  },
  { 
    id: 2, 
    title: 'O(n) Time Complexity Two Pointer Approach', 
    problem: 'Container With Most Water',
    language: 'Python',
    votes: 156, 
    views: 3421,
    date: '1 week ago'
  },
  { 
    id: 3, 
    title: 'Binary Search Solution with Detailed Explanation', 
    problem: 'Median of Two Sorted Arrays',
    language: 'Java',
    votes: 89, 
    views: 1890,
    date: '2 weeks ago'
  },
  { 
    id: 4, 
    title: 'Clean Sliding Window Implementation', 
    problem: 'Longest Substring Without Repeating',
    language: 'JavaScript',
    votes: 67, 
    views: 1234,
    date: '3 weeks ago'
  },
];

export function ProfilePage({ navigationProps, viewMode = 'owner' }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'recent-ac' | 'contests' | 'solutions'>('recent-ac');

  // Calculate solved percentage
  const solvedPercent = (problemStats.solved / problemStats.totalProblems) * 100;

  // Donut chart data - showing solved vs unsolved
  const donutData = [
    { name: 'Solved', value: problemStats.solved, color: '#FFA116' },
    { name: 'Unsolved', value: problemStats.totalProblems - problemStats.solved, color: '#3a3a3a' },
  ];

  // Activity heatmap color based on level
  const getActivityColor = (level: number) => {
    if (level === 0) return '#2d2d2d';
    if (level === 1) return '#0e4429';
    if (level === 2) return '#006d32';
    if (level === 3) return '#26a641';
    return '#39d353';
  };

  // Group activity data by weeks for heatmap
  const weeks: any[][] = [];
  let currentWeek: any[] = [];
  
  activityData.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    
    if (index === 0 && dayOfWeek !== 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }
    
    currentWeek.push(day);
    
    if (dayOfWeek === 6 || index === activityData.length - 1) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate total submissions and max streak
  const totalSubmissions = activityData.filter(d => d.count > 0).length;
  const maxStreak = 0; // Calculate based on consecutive days

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-16">
      <Navbar {...navigationProps} />
      
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-4">
            {/* Profile Card */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardContent className="p-4">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-24 h-24 mb-3">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback className="bg-gray-600 text-white text-2xl">
                      {userData.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Name and Title */}
                  <h2 className="text-white text-lg text-center mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                    {userData.fullName}
                  </h2>
                  <p className="text-gray-400 text-sm text-center mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    @{userData.username}
                  </p>
                  <p className="text-white text-sm mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Rank <span className="font-semibold">{userData.rank}</span>
                  </p>
                </div>

                {/* Bio */}
                <p className="text-gray-400 text-sm text-center mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {userData.bio}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span style={{ fontFamily: 'system-ui, sans-serif' }}>{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Briefcase className="w-4 h-4 flex-shrink-0" />
                    <span style={{ fontFamily: 'system-ui, sans-serif' }}>{userData.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span style={{ fontFamily: 'system-ui, sans-serif' }}>{userData.email}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent text-gray-400 border-gray-600 hover:bg-gray-700 hover:text-white h-9"
                    onClick={() => window.open(userData.github, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent text-gray-400 border-gray-600 hover:bg-gray-700 hover:text-white h-9"
                    onClick={() => window.open(userData.linkedin, '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-1" />
                    LinkedIn
                  </Button>
                </div>

                {/* Edit Profile Button */}
                {viewMode === 'owner' && (
                  <Button
                    onClick={navigationProps.onEditProfile}
                    className="w-full bg-transparent text-green-500 border border-green-600 hover:bg-green-600/10 h-9 text-sm"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardContent className="p-4">
                <h3 className="text-white text-base mb-4" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                  Community Stats
                </h3>
                
                <div className="space-y-3">
                  {communityStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Icon className={`w-4 h-4 mt-0.5 ${stat.color}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                              {stat.label}
                            </span>
                            <span className="text-white text-sm font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>
                              {stat.value}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>Last week</span>
                            <Info className="w-3 h-3" />
                            <span>{stat.lastWeek}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardContent className="p-4">
                <h3 className="text-white text-base mb-3" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                  Languages
                </h3>
                <p className="text-gray-500 text-sm text-center py-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Not enough data
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardContent className="p-4">
                <h3 className="text-white text-base mb-3" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                  Skills
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Advanced
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs ml-3.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Not enough data
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Intermediate
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs ml-3.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Not enough data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 space-y-4">
            {/* Top Stats Section */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Half - Problem Stats */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Circular Progress Chart */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <ResponsiveContainer width={140} height={140}>
                          <PieChart>
                            <Pie
                              data={donutData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={65}
                              startAngle={90}
                              endAngle={-270}
                              paddingAngle={0}
                              dataKey="value"
                            >
                              {donutData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl text-white mb-0.5" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                            {problemStats.solved}
                            <span className="text-xl text-gray-400">/{problemStats.totalProblems}</span>
                          </div>
                          <div className="text-xs text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Solved
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {problemStats.attempting} Attempting
                      </div>
                    </div>

                    {/* Problem Breakdown */}
                    <div className="flex flex-col justify-center gap-4">
                      {/* Easy */}
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Easy
                        </div>
                        <div className="text-xl" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                          <span className="text-white">{problemStats.easy.solved}</span>
                          <span className="text-gray-500">/{problemStats.easy.total}</span>
                        </div>
                      </div>

                      {/* Medium */}
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Medium
                        </div>
                        <div className="text-xl" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                          <span className="text-white">{problemStats.medium.solved}</span>
                          <span className="text-gray-500">/{problemStats.medium.total}</span>
                        </div>
                      </div>

                      {/* Hard */}
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Hard
                        </div>
                        <div className="text-xl" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                          <span className="text-white">{problemStats.hard.solved}</span>
                          <span className="text-gray-500">/{problemStats.hard.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Half - Rating Graph */}
                  <div className="flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-white text-base mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                        Rating Progress
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-white font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          {ratingData[ratingData.length - 1].rating}
                        </span>
                        <span className="text-sm text-green-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          +{ratingData[ratingData.length - 1].rating - ratingData[0].rating}
                        </span>
                      </div>
                    </div>
                    
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={ratingData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#666"
                          style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px' }}
                        />
                        <YAxis 
                          stroke="#666"
                          style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #3a3a3a',
                            borderRadius: '6px',
                            fontFamily: 'system-ui, sans-serif',
                            fontSize: '12px',
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rating" 
                          stroke="#FFA116" 
                          strokeWidth={2}
                          dot={{ fill: '#FFA116', r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Heatmap */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-lg" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                    Badges
                  </h3>
                  <span className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    0 earned
                  </span>
                </div>

                {/* Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Locked Badge 1 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full flex items-center justify-center opacity-40">
                      <Star className="w-8 h-8 text-orange-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      Jan LeetCoding Challenge
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>

                  {/* Locked Badge 2 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center opacity-40">
                      <Code2 className="w-8 h-8 text-blue-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      50 Days Badge
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>

                  {/* Locked Badge 3 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center opacity-40">
                      <MessageSquare className="w-8 h-8 text-purple-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      Study Plan
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>

                  {/* Locked Badge 4 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center opacity-40">
                      <Star className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      Annual Badge
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>

                  {/* Locked Badge 5 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center opacity-40">
                      <Eye className="w-8 h-8 text-red-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      Contest Badge
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>

                  {/* Locked Badge 6 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center opacity-40">
                      <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      Guardian
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>

                  {/* Locked Badge 7 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center opacity-40">
                      <Code2 className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      Knight
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>

                  {/* Locked Badge 8 */}
                  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center opacity-40">
                      <Star className="w-8 h-8 text-pink-500" />
                    </div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                      Premium
                    </h4>
                    <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Locked
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs and Content Section */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardContent className="p-0">
                {/* Tab Headers */}
                <div className="flex items-center border-b border-[#3a3a3a] px-4 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('recent-ac')}
                    className={`px-4 py-3 text-sm border-b-2 whitespace-nowrap ${
                      activeTab === 'recent-ac'
                        ? 'border-white text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Recent AC
                  </button>
                  <button
                    onClick={() => setActiveTab('contests')}
                    className={`px-4 py-3 text-sm border-b-2 whitespace-nowrap ${
                      activeTab === 'contests'
                        ? 'border-white text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Contests
                  </button>
                  <button
                    onClick={() => setActiveTab('solutions')}
                    className={`px-4 py-3 text-sm border-b-2 whitespace-nowrap ${
                      activeTab === 'solutions'
                        ? 'border-white text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    <Code2 className="w-4 h-4 inline mr-2" />
                    Solutions
                  </button>
                  
                  <div className="ml-auto">
                    <button className="text-sm text-gray-400 hover:text-white px-4 py-3 whitespace-nowrap" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      View all submissions →
                    </button>
                  </div>
                </div>

                {/* Tab Content - Recent AC */}
                {activeTab === 'recent-ac' && (
                  <div className="p-8 sm:p-16">
                    <div className="space-y-4">
                      {recentACData.map((item) => (
                        <div key={item.id} className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-blue-500" />
                              </div>
                              <div>
                                <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                                  {item.title}
                                </h4>
                                <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                  {item.difficulty} • {item.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              </div>
                              <span className="text-gray-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                {item.language} • {item.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Content - Contests */}
                {activeTab === 'contests' && (
                  <div className="p-8 sm:p-16">
                    <div className="space-y-4">
                      {contestResults.map((item) => (
                        <div key={item.id} className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-blue-500" />
                              </div>
                              <div>
                                <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                                  {item.name}
                                </h4>
                                <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                  {item.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              </div>
                              <span className="text-gray-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                Rank {item.rank} • {item.solved}
                              </span>
                              <span className={`text-${item.ratingChange === 'positive' ? 'green' : 'red'}-500`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Content - Solutions */}
                {activeTab === 'solutions' && (
                  <div className="p-8 sm:p-16">
                    <div className="space-y-4">
                      {solutionsData.map((item) => (
                        <div key={item.id} className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-blue-500" />
                              </div>
                              <div>
                                <h4 className="text-white text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                                  {item.title}
                                </h4>
                                <p className="text-gray-500 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                  {item.problem} • {item.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              </div>
                              <span className="text-gray-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                {item.language} • {item.votes} votes • {item.views} views
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}