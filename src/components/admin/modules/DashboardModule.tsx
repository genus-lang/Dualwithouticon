import { 
  Users, 
  Swords, 
  Trophy, 
  MessageSquare, 
  TrendingUp, 
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface DashboardModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

export function DashboardModule({ adminRole }: DashboardModuleProps) {
  const stats = [
    { 
      title: 'Total Users', 
      value: '15,234', 
      change: '+12.5%', 
      icon: Users, 
      color: 'cyan',
      trend: 'up'
    },
    { 
      title: 'Online Users', 
      value: '1,453', 
      change: '+3.2%', 
      icon: Activity, 
      color: 'green',
      trend: 'up'
    },
    { 
      title: 'Active Matches', 
      value: '47', 
      change: '-8.1%', 
      icon: Swords, 
      color: 'purple',
      trend: 'down'
    },
    { 
      title: 'Running Contests', 
      value: '3', 
      change: '0%', 
      icon: Trophy, 
      color: 'yellow',
      trend: 'stable'
    },
  ];

  const systemStatus = [
    { name: 'Chat Status', status: 'Disabled', color: 'red', icon: MessageSquare },
    { name: 'Streaming Status', status: 'Limited', color: 'yellow', icon: Activity },
    { name: 'AI Systems', status: 'Online', color: 'green', icon: CheckCircle },
    { name: 'Database', status: 'Healthy', color: 'green', icon: CheckCircle },
  ];

  const recentActivity = [
    { 
      time: '2 min ago', 
      action: 'User @coderX deleted by DualAdmin',
      type: 'danger',
      admin: 'Dual Admin'
    },
    { 
      time: '15 min ago', 
      action: 'Chat disabled globally',
      type: 'warning',
      admin: 'Owner'
    },
    { 
      time: '1 hour ago', 
      action: 'Contest "CodeSprint" started',
      type: 'success',
      admin: 'System'
    },
    { 
      time: '2 hours ago', 
      action: 'New question added: "Binary Tree Traversal"',
      type: 'info',
      admin: 'Question Admin'
    },
    { 
      time: '3 hours ago', 
      action: 'User @devGuru promoted to moderator',
      type: 'info',
      admin: 'Dual Admin'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Platform overview and real-time monitoring</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-cyan-500/30 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-500/20 shadow-[0_0_15px_rgba(0,255,255,0.3)]`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded ${
                    stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 
                    stat.trend === 'down' ? 'bg-red-500/20 text-red-400' : 
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.title}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemStatus.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 text-${item.color}-400`} />
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.color === 'green' ? 'bg-green-500/20 text-green-400' :
                    item.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {item.status}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Admin Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'danger' ? 'bg-red-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    activity.type === 'success' ? 'bg-green-500' :
                    'bg-cyan-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-purple-400">{activity.admin}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions (Owner/Dual Admin only) */}
      {(adminRole === 'owner' || adminRole === 'dual_admin') && (
        <Card className="bg-gradient-to-br from-red-950/20 to-gray-900/30 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="p-4 bg-gray-800/50 hover:bg-cyan-500/10 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all text-sm text-gray-300 hover:text-cyan-400">
                Enable Chat
              </button>
              <button className="p-4 bg-gray-800/50 hover:bg-green-500/10 border border-gray-700 hover:border-green-500 rounded-lg transition-all text-sm text-gray-300 hover:text-green-400">
                Start Contest
              </button>
              <button className="p-4 bg-gray-800/50 hover:bg-purple-500/10 border border-gray-700 hover:border-purple-500 rounded-lg transition-all text-sm text-gray-300 hover:text-purple-400">
                View Logs
              </button>
              <button className="p-4 bg-gray-800/50 hover:bg-red-500/10 border border-gray-700 hover:border-red-500 rounded-lg transition-all text-sm text-gray-300 hover:text-red-400">
                Backup DB
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
