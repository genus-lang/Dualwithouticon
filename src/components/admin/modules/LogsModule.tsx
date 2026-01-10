import { useState } from 'react';
import { ScrollText, Download, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface LogsModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'login' | 'admin_action' | 'security' | 'system';
  user: string;
  action: string;
  ip?: string;
  status: 'success' | 'warning' | 'error';
}

export function LogsModule({ adminRole }: LogsModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const logs: LogEntry[] = [
    { 
      id: '1', 
      timestamp: '2026-01-10 14:35:22', 
      type: 'admin_action', 
      user: 'Dual Admin', 
      action: 'Deleted user @coderX', 
      ip: '192.168.1.100',
      status: 'success' 
    },
    { 
      id: '2', 
      timestamp: '2026-01-10 14:20:15', 
      type: 'admin_action', 
      user: 'Owner', 
      action: 'Disabled global chat', 
      ip: '192.168.1.1',
      status: 'success' 
    },
    { 
      id: '3', 
      timestamp: '2026-01-10 14:15:08', 
      type: 'security', 
      user: 'System', 
      action: 'Failed login attempt detected', 
      ip: '203.0.113.45',
      status: 'warning' 
    },
    { 
      id: '4', 
      timestamp: '2026-01-10 13:50:33', 
      type: 'login', 
      user: 'admin_dual', 
      action: 'Admin login successful', 
      ip: '192.168.1.100',
      status: 'success' 
    },
    { 
      id: '5', 
      timestamp: '2026-01-10 13:30:12', 
      type: 'admin_action', 
      user: 'Question Admin', 
      action: 'Added new question: Binary Tree Traversal', 
      status: 'success' 
    },
    { 
      id: '6', 
      timestamp: '2026-01-10 12:45:55', 
      type: 'system', 
      user: 'System', 
      action: 'Database backup completed', 
      status: 'success' 
    },
    { 
      id: '7', 
      timestamp: '2026-01-10 12:30:00', 
      type: 'security', 
      user: 'System', 
      action: 'Suspicious activity from IP 198.51.100.25', 
      ip: '198.51.100.25',
      status: 'error' 
    },
    { 
      id: '8', 
      timestamp: '2026-01-10 11:15:40', 
      type: 'admin_action', 
      user: 'Dual Admin', 
      action: 'Started contest: CodeSprint Weekly #45', 
      status: 'success' 
    },
  ];

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'login': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'admin_action': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'security': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'system': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/20 text-green-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'error': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">Logs & Security</h1>
          <p className="text-gray-400">Monitor system activity and security events</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-950/20 to-gray-900/30 border-blue-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">{logs.filter(l => l.type === 'login').length}</div>
            <div className="text-sm text-gray-400">Login Events</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-950/20 to-gray-900/30 border-purple-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-400">{logs.filter(l => l.type === 'admin_action').length}</div>
            <div className="text-sm text-gray-400">Admin Actions</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-950/20 to-gray-900/30 border-red-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">{logs.filter(l => l.type === 'security').length}</div>
            <div className="text-sm text-gray-400">Security Alerts</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-400">{logs.filter(l => l.type === 'system').length}</div>
            <div className="text-sm text-gray-400">System Events</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-500"
              />
            </div>
            <Button variant="outline" className="border-gray-700 hover:border-cyan-500">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <ScrollText className="w-5 h-5" />
            Activity Logs ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div 
                key={log.id}
                className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getLogTypeColor(log.type)}>
                        {log.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500 font-mono">{log.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-1">{log.action}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>User: <span className="text-purple-400">{log.user}</span></span>
                      {log.ip && <span>IP: <span className="text-cyan-400 font-mono">{log.ip}</span></span>}
                    </div>
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
