import { useState } from 'react';
import { MessageSquare, Lock, Trash2, Eye, Pin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';

interface ChatCommunityModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

export function ChatCommunityModule({ adminRole }: ChatCommunityModuleProps) {
  const [globalChatEnabled, setGlobalChatEnabled] = useState(false);
  const [matchChatEnabled, setMatchChatEnabled] = useState(true);
  const [communityEnabled, setCommunityEnabled] = useState(true);

  const reportedContent = [
    { id: '1', type: 'Chat', user: 'spammer123', content: 'Inappropriate message in global chat', reports: 5 },
    { id: '2', type: 'Post', user: 'trollUser', content: 'Offensive community post', reports: 12 },
    { id: '3', type: 'Comment', user: 'badActor', content: 'Spam links in discussion', reports: 3 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Chat & Community Control</h1>
        <p className="text-gray-400">Manage communication and community features</p>
      </div>

      {/* Global Controls */}
      <Card className="bg-gradient-to-br from-pink-950/20 to-gray-900/30 border-pink-500/30">
        <CardHeader>
          <CardTitle className="text-pink-400 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Global Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="global-chat" className="text-gray-300">
                Global Chat
              </Label>
              <Switch
                id="global-chat"
                checked={globalChatEnabled}
                onCheckedChange={setGlobalChatEnabled}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="match-chat" className="text-gray-300">
                Match Chat
              </Label>
              <Switch
                id="match-chat"
                checked={matchChatEnabled}
                onCheckedChange={setMatchChatEnabled}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <Label htmlFor="community" className="text-gray-300">
                Community Posts
              </Label>
              <Switch
                id="community"
                checked={communityEnabled}
                onCheckedChange={setCommunityEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reported Content */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Reported Content ({reportedContent.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportedContent.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-gray-800/30 rounded-lg border border-red-700/50 hover:border-red-500/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">
                        {item.type}
                      </span>
                      <span className="text-gray-400 text-sm">by @{item.user}</span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                        {item.reports} reports
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{item.content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:border-cyan-500"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:border-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="border-gray-700 hover:border-cyan-500">
              <Pin className="w-4 h-4 mr-2" />
              Pin Announcement
            </Button>
            <Button variant="outline" className="border-gray-700 hover:border-yellow-500">
              <Lock className="w-4 h-4 mr-2" />
              Lock Thread
            </Button>
            <Button variant="outline" className="border-gray-700 hover:border-purple-500">
              <MessageSquare className="w-4 h-4 mr-2" />
              View Logs
            </Button>
            <Button variant="outline" className="border-gray-700 hover:border-red-500">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Spam
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
