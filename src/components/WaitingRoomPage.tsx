import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { 
  Users, Clock, Shield, Copy, LogOut, MessageSquare, 
  Play, Pause, XCircle, Crown, Check, X, Zap, Brain,
  Lock, Globe, AlertCircle, Send
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface NavigationProps {
  onStartCoding?: () => void;
  onStartMatch?: () => void;
  onQuestionBank?: () => void;
  onProfile?: () => void;
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
  onCreateRoom?: () => void;
}

interface WaitingRoomPageProps {
  navigationProps: NavigationProps;
  roomId: string;
  isAdmin?: boolean;
  onMatchStart?: () => void;
}

interface Participant {
  id: string;
  username: string;
  avatar: string;
  isReady: boolean;
  isAdmin: boolean;
  device: 'desktop' | 'tablet' | 'mobile';
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

export function WaitingRoomPage({ 
  navigationProps, 
  roomId, 
  isAdmin = false,
  onMatchStart 
}: WaitingRoomPageProps) {
  // Room state
  const [roomName, setRoomName] = useState('Advanced DSA Challenge');
  const [matchType, setMatchType] = useState<'friendly' | 'competitive' | 'practice'>('competitive');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');
  const [matchStatus, setMatchStatus] = useState<'waiting' | 'starting' | 'ready'>('waiting');
  
  // Participants
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', username: '@meghram_meena', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meghram', isReady: true, isAdmin: true, device: 'desktop' },
    { id: '2', username: '@ayush_k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayush', isReady: false, isAdmin: false, device: 'desktop' },
    { id: '3', username: '@coderX', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coderx', isReady: false, isAdmin: false, device: 'mobile' },
  ]);
  const [maxParticipants, setMaxParticipants] = useState(6);
  
  // Timer
  const [autoStart, setAutoStart] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  
  // Match settings
  const [matchDuration, setMatchDuration] = useState(45);
  const [aiLevel, setAiLevel] = useState<'disabled' | 'limited' | 'full'>('limited');
  const [powerUps, setPowerUps] = useState(['Freeze Opponent Editor', 'Reveal Hint']);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [spectatorsEnabled, setSpectatorsEnabled] = useState(true);
  
  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', username: '@meghram_meena', message: 'Welcome everyone! Let\'s have a great match!', timestamp: new Date() },
    { id: '2', username: '@ayush_k', message: 'Ready to code! 🚀', timestamp: new Date() },
  ]);
  const [messageInput, setMessageInput] = useState('');
  
  // User readiness
  const [isUserReady, setIsUserReady] = useState(false);
  const [roomLocked, setRoomLocked] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!autoStart || isPaused || matchStatus !== 'waiting') return;
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setMatchStatus('starting');
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoStart, isPaused, matchStatus]);

  // Format countdown time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  // Copy room code
  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Room code copied to clipboard!');
  };

  // Leave room
  const handleLeaveRoom = () => {
    toast.info('Leaving room...');
    if (navigationProps.onHome) {
      navigationProps.onHome();
    }
  };

  // Toggle user ready state
  const handleToggleReady = () => {
    setIsUserReady(!isUserReady);
    toast.success(!isUserReady ? 'You are now ready!' : 'Ready status removed');
  };

  // Admin: Start match
  const handleStartMatch = () => {
    setMatchStatus('starting');
    toast.success('Starting match...');
    setTimeout(() => {
      if (onMatchStart) {
        onMatchStart();
      }
    }, 2000);
  };

  // Admin: Delay start
  const handleDelayStart = (minutes: number) => {
    setCountdown(countdown + minutes * 60);
    toast.success(`Match delayed by ${minutes} minutes`);
  };

  // Admin: Cancel match
  const handleCancelMatch = () => {
    toast.error('Match cancelled by admin');
    if (navigationProps.onHome) {
      navigationProps.onHome();
    }
  };

  // Admin: Kick user
  const handleKickUser = (userId: string) => {
    const user = participants.find(p => p.id === userId);
    if (user) {
      setParticipants(participants.filter(p => p.id !== userId));
      toast.success(`${user.username} has been removed from the room`);
    }
  };

  // Admin: Toggle room lock
  const handleToggleRoomLock = () => {
    setRoomLocked(!roomLocked);
    toast.success(roomLocked ? 'Room unlocked' : 'Room locked - no new joins allowed');
  };

  // Send chat message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: '@current_user',
      message: messageInput,
      timestamp: new Date(),
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput('');
  };

  // Calculate ready percentage
  const readyCount = participants.filter(p => p.isReady).length;
  const readyPercentage = (readyCount / participants.length) * 100;

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar {...navigationProps} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto pb-12">
        {/* Room Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left - Room Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {roomName}
                </h1>
                <Badge className={
                  matchType === 'competitive' ? 'bg-red-500/20 text-red-300' :
                  matchType === 'friendly' ? 'bg-green-500/20 text-green-300' :
                  'bg-blue-500/20 text-blue-300'
                }>
                  {matchType.charAt(0).toUpperCase() + matchType.slice(1)} Match
                </Badge>
                <Badge className={visibility === 'private' ? 'bg-purple-500/20 text-purple-300' : 'bg-green-500/20 text-green-300'}>
                  {visibility === 'private' ? <Lock className="w-3 h-3 mr-1" /> : <Globe className="w-3 h-3 mr-1" />}
                  {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <div className="flex items-center gap-2">
                  <span>Room ID:</span>
                  <code className="px-2 py-1 bg-[#1A1A1A] border border-[#00FFFF]/30 rounded text-[#00FFFF]">
                    {roomId}
                  </code>
                  <button 
                    onClick={handleCopyRoomCode}
                    className="hover:text-[#00FFFF] transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <Separator orientation="vertical" className="h-4 bg-white/20" />
                <span className={
                  matchStatus === 'waiting' ? 'text-yellow-400' :
                  matchStatus === 'starting' ? 'text-green-400' :
                  'text-[#00FFFF]'
                }>
                  {matchStatus === 'waiting' ? 'Waiting for players' :
                   matchStatus === 'starting' ? 'Match starting soon...' :
                   'Ready to start'}
                </span>
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleLeaveRoom}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Leave Room
              </Button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Participants */}
          <div className="lg:col-span-3">
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#00FFFF]" />
                    Participants
                  </div>
                  <span className="text-sm text-white/60">
                    {participants.length} / {maxParticipants}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {participants.map((participant) => (
                      <div 
                        key={participant.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D0D]/50 border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-[#00FFFF]/30">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback className="bg-[#00FFFF]/20 text-[#00FFFF]">
                              {participant.username.charAt(1).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                {participant.username}
                              </p>
                              {participant.isAdmin && (
                                <Crown className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-xs text-white/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {participant.device}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {participant.isReady ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                          
                          {isAdmin && !participant.isAdmin && (
                            <button
                              onClick={() => handleKickUser(participant.id)}
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Ready Status Bar */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      READY STATUS
                    </span>
                    <span className="text-xs text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {readyCount} / {participants.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#0D0D0D] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00FFFF] to-[#9333EA] transition-all duration-300"
                      style={{ width: `${readyPercentage}%` }}
                    />
                  </div>
                </div>

                {/* User Ready Toggle */}
                <div className="mt-4">
                  <Button
                    onClick={handleToggleReady}
                    className={isUserReady 
                      ? 'w-full bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30' 
                      : 'w-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/30'
                    }
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {isUserReady ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Ready
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        Not Ready
                      </>
                    )}
                  </Button>
                </div>

                {/* Admin Controls */}
                {isAdmin && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <p className="text-xs text-white/60 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ADMIN CONTROLS
                    </p>
                    <Button
                      onClick={handleToggleRoomLock}
                      variant="outline"
                      className="w-full border-[#00FFFF]/30 text-white hover:bg-[#00FFFF]/10"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {roomLocked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Unlock Room
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Lock Room
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Timer & Match Info */}
          <div className="lg:col-span-6 space-y-6">
            {/* Countdown Timer */}
            <Card className="bg-gradient-to-br from-[#00FFFF]/10 to-[#9333EA]/10 border-[#00FFFF]/40">
              <CardContent className="pt-6">
                {autoStart ? (
                  <div className="text-center">
                    <p className="text-white/60 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {matchStatus === 'starting' ? 'MATCH STARTING...' : 'MATCH STARTS IN'}
                    </p>
                    <div className="text-6xl text-white mb-6" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {formatTime(countdown)}
                    </div>
                    {isPaused && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 mb-4">
                        <Pause className="w-3 h-3 mr-1" />
                        Paused
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 text-[#00FFFF] mx-auto mb-4" />
                    <p className="text-xl text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Waiting for admin to start the match
                    </p>
                    <p className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      The room admin will start the match manually
                    </p>
                  </div>
                )}

                {/* Admin Controls */}
                {isAdmin && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                    <Button
                      onClick={handleStartMatch}
                      className="w-full bg-gradient-to-r from-[#00FFFF] to-[#9333EA] text-black hover:opacity-90"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Match Now
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => handleDelayStart(5)}
                        variant="outline"
                        className="border-[#00FFFF]/30 text-white hover:bg-[#00FFFF]/10"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        Delay +5 min
                      </Button>
                      <Button
                        onClick={() => handleDelayStart(10)}
                        variant="outline"
                        className="border-[#00FFFF]/30 text-white hover:bg-[#00FFFF]/10"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        Delay +10 min
                      </Button>
                    </div>

                    <Button
                      onClick={handleCancelMatch}
                      variant="outline"
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel Match
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Match Information */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Shield className="w-5 h-5 text-[#00FFFF]" />
                  Match Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      DURATION
                    </Label>
                    <p className="text-white mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {matchDuration} minutes
                    </p>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      AI ASSISTANCE
                    </Label>
                    <div className="flex items-center gap-1 mt-1">
                      <Brain className="w-4 h-4 text-[#00FFFF]" />
                      <p className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {aiLevel.charAt(0).toUpperCase() + aiLevel.slice(1)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      CHAT
                    </Label>
                    <Badge className={chatEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {chatEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      SPECTATORS
                    </Label>
                    <Badge className={spectatorsEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {spectatorsEnabled ? 'Allowed' : 'Disabled'}
                    </Badge>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Power-ups */}
                <div>
                  <Label className="text-white/60 text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    POWER-UPS ({powerUps.length > 0 ? 'Enabled' : 'Disabled'})
                  </Label>
                  {powerUps.length > 0 ? (
                    <div className="space-y-2">
                      {powerUps.map((powerUp, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          <Zap className="w-4 h-4 text-purple-400" />
                          {powerUp}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      No power-ups enabled for this match
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Fair Play Notice */}
            <Alert className="bg-[#00FFFF]/5 border-[#00FFFF]/30">
              <AlertCircle className="w-4 h-4 text-[#00FFFF]" />
              <AlertDescription className="text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <strong>Code of Conduct:</strong> Use of external tools, plagiarism, or unfair practices may result in disqualification and account suspension.
              </AlertDescription>
            </Alert>
          </div>

          {/* Right Panel - Chat */}
          <div className="lg:col-span-3">
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <MessageSquare className="w-5 h-5 text-[#00FFFF]" />
                  Match Chat
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {chatEnabled ? 'Communicate with participants' : 'Chat disabled by admin'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-[600px]">
                {chatEnabled ? (
                  <>
                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 pr-4 mb-4">
                      <div className="space-y-3">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#00FFFF]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                {msg.username}
                              </span>
                              <span className="text-xs text-white/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                {msg.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Chat Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/30"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-3" />
                      <p className="text-white/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Chat has been disabled by the room admin
                      </p>
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
