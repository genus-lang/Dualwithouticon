import { useState } from 'react';
import { Navbar } from './Navbar';
import { ChevronRight, Key, Link2, Loader2, CheckCircle2, XCircle, Lock, Users, Clock, Zap, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
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

interface JoinRoomPageProps {
  navigationProps: NavigationProps;
  onJoinRoom?: (roomId: string) => void;
  isPopup?: boolean;
  onClose?: () => void;
}

interface RoomData {
  id: string;
  name: string;
  type: 'friendly' | 'competitive' | 'practice';
  duration: number;
  currentParticipants: number;
  maxParticipants: number;
  powerUpsEnabled: string[];
  aiLevel: 'disabled' | 'limited' | 'full';
  createdBy: string;
  visibility: 'private' | 'public';
  hasPassword: boolean;
  status: 'waiting' | 'active' | 'ended';
}

type ValidationState = 'idle' | 'validating' | 'valid' | 'invalid' | 'full' | 'ended' | 'blocked';

export function JoinRoomPage({ navigationProps, onJoinRoom, isPopup = false, onClose }: JoinRoomPageProps) {
  const [roomCode, setRoomCode] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [validationState, setValidationState] = useState<ValidationState>('idle');
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  // Format room code (uppercase, remove spaces)
  const handleRoomCodeChange = (value: string) => {
    const formatted = value.toUpperCase().replace(/\s/g, '');
    setRoomCode(formatted);
    setValidationState('idle');
    setRoomData(null);
    setErrorMessage('');
  };

  // Extract room ID from invite link
  const handleInviteLinkChange = (value: string) => {
    setInviteLink(value);
    // Extract room code from URL (mock implementation)
    const match = value.match(/room[\/=]([A-Z0-9]+)/i);
    if (match) {
      handleRoomCodeChange(match[1]);
    }
  };

  // Validate room code
  const validateRoom = async () => {
    if (!roomCode || roomCode.length < 4) {
      setErrorMessage('Please enter a valid room code');
      return;
    }

    setValidationState('validating');
    setErrorMessage('');

    // Mock API call - simulate room validation
    setTimeout(() => {
      // Mock room data
      const mockRoom: RoomData = {
        id: roomCode,
        name: 'Advanced DSA Challenge',
        type: 'competitive',
        duration: 45,
        currentParticipants: 3,
        maxParticipants: 6,
        powerUpsEnabled: ['Freeze Opponent Editor', 'Reveal Hint'],
        aiLevel: 'limited',
        createdBy: '@meghram_meena',
        visibility: 'private',
        hasPassword: false,
        status: 'waiting',
      };

      // Simulate different validation outcomes
      const random = Math.random();
      
      if (roomCode === 'INVALID') {
        setValidationState('invalid');
        setErrorMessage('Room not found');
      } else if (roomCode === 'FULL') {
        setValidationState('full');
        setErrorMessage('Room capacity reached');
      } else if (roomCode === 'ENDED') {
        setValidationState('ended');
        setErrorMessage('This room is no longer active');
      } else if (roomCode === 'BLOCKED') {
        setValidationState('blocked');
        setErrorMessage('You are blocked from this room');
      } else if (mockRoom.hasPassword && !roomPassword) {
        setShowPasswordInput(true);
        setValidationState('idle');
        setErrorMessage('This room requires a password');
      } else {
        setValidationState('valid');
        setRoomData(mockRoom);
        toast.success('Room found!');
      }
    }, 1000);
  };

  // Join room
  const handleJoinRoom = () => {
    if (!roomData) return;

    toast.success(`Joining ${roomData.name}...`);
    
    if (onJoinRoom) {
      onJoinRoom(roomData.id);
    }
  };

  const getStatusIcon = () => {
    switch (validationState) {
      case 'validating':
        return <Loader2 className="w-5 h-5 text-[#00FFFF] animate-spin" />;
      case 'valid':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'invalid':
      case 'full':
      case 'ended':
      case 'blocked':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const content = (
    <div className={isPopup ? '' : 'min-h-screen bg-[#0D0D0D]'}>
      {!isPopup && <Navbar {...navigationProps} />}
      
      <div className={isPopup ? 'p-6' : 'pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pb-12'}>
        {/* Header */}
        {!isPopup && (
          <div className="mb-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <button 
                onClick={navigationProps.onHome}
                className="text-[#00FFFF] hover:underline"
              >
                Home
              </button>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <button 
                onClick={navigationProps.onStartCoding}
                className="text-[#00FFFF] hover:underline"
              >
                Arena
              </button>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <span className="text-white/60">Join Room</span>
            </div>

            {/* Page Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FFFF]/20 to-[#9333EA]/20 border border-[#00FFFF]/30 flex items-center justify-center">
                <Key className="w-6 h-6 text-[#00FFFF]" />
              </div>
              <h1 className="text-3xl text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Join a Room
              </h1>
            </div>
            <p className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Enter a valid room code or invite link to join a match.
            </p>
          </div>
        )}

        {isPopup && (
          <div className="mb-6">
            <h2 className="text-2xl text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Join a Room
            </h2>
            <p className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Enter a valid room code or invite link to join a match.
            </p>
          </div>
        )}

        {/* Join Form */}
        <div className="space-y-6">
          {/* Room Code Input */}
          <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Key className="w-5 h-5 text-[#00FFFF]" />
                Room Code
              </CardTitle>
              <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Enter the room code provided by the host
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    placeholder="Enter Room Code (e.g. A9X3QZ)"
                    value={roomCode}
                    onChange={(e) => handleRoomCodeChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && validateRoom()}
                    className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white pr-12"
                    style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}
                    autoFocus={isPopup}
                    maxLength={10}
                  />
                  {getStatusIcon() && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getStatusIcon()}
                    </div>
                  )}
                </div>
                <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Code is case-insensitive and auto-formatted
                </p>
              </div>

              {showPasswordInput && (
                <div className="space-y-2">
                  <Label htmlFor="room-password" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Room Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="room-password"
                    type="password"
                    placeholder="Enter room password"
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                    className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>
              )}

              <Button
                onClick={validateRoom}
                disabled={!roomCode || validationState === 'validating'}
                className="w-full bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/40 hover:bg-[#00FFFF]/30"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {validationState === 'validating' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  'Validate Room Code'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-white/10" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D0D0D] px-4">
              <span className="text-white/40 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                OR
              </span>
            </div>
          </div>

          {/* Invite Link Input */}
          <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Link2 className="w-5 h-5 text-[#00FFFF]" />
                Invite Link
              </CardTitle>
              <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Paste the full invite URL shared by the host
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="https://codearena.com/room/A9X3QZ"
                  value={inviteLink}
                  onChange={(e) => handleInviteLinkChange(e.target.value)}
                  className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                />
                <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Room code will be auto-extracted from the link
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {errorMessage && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <XCircle className="w-4 h-4 text-red-500" />
              <AlertDescription className="text-red-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Room Preview */}
          {validationState === 'valid' && roomData && (
            <Card className="bg-gradient-to-br from-[#00FFFF]/10 to-[#9333EA]/10 border-[#00FFFF]/40">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Room Found
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Review room details before joining
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Room Name */}
                <div>
                  <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    ROOM NAME
                  </Label>
                  <p className="text-white mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {roomData.name}
                  </p>
                </div>

                <Separator className="bg-white/10" />

                {/* Room Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      MATCH TYPE
                    </Label>
                    <Badge className="mt-1 bg-[#00FFFF]/20 text-[#00FFFF]">
                      {roomData.type.charAt(0).toUpperCase() + roomData.type.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      DURATION
                    </Label>
                    <div className="flex items-center gap-1 mt-1 text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <Clock className="w-4 h-4 text-[#00FFFF]" />
                      {roomData.duration} min
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      PARTICIPANTS
                    </Label>
                    <div className="flex items-center gap-1 mt-1 text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <Users className="w-4 h-4 text-[#00FFFF]" />
                      {roomData.currentParticipants} / {roomData.maxParticipants}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      AI ASSISTANCE
                    </Label>
                    <div className="flex items-center gap-1 mt-1 text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <Brain className="w-4 h-4 text-[#00FFFF]" />
                      {roomData.aiLevel.charAt(0).toUpperCase() + roomData.aiLevel.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Power-ups */}
                {roomData.powerUpsEnabled.length > 0 && (
                  <div>
                    <Label className="text-white/60 text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      POWER-UPS ENABLED
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {roomData.powerUpsEnabled.map((powerUp) => (
                        <Badge 
                          key={powerUp}
                          className="bg-purple-500/20 text-purple-300 text-xs"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          {powerUp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="bg-white/10" />

                {/* Created By */}
                <div>
                  <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    CREATED BY
                  </Label>
                  <p className="text-white mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {roomData.createdBy} <span className="text-[#00FFFF]">(Room Admin)</span>
                  </p>
                </div>

                {/* Join Button */}
                <Button
                  onClick={handleJoinRoom}
                  className="w-full bg-gradient-to-r from-[#00FFFF] to-[#9333EA] text-black hover:opacity-90"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Join Room
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Cancel Button */}
          {!isPopup && (
            <Button
              variant="ghost"
              onClick={navigationProps.onHome}
              className="w-full text-white/60 hover:text-white hover:bg-white/5"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  if (isPopup) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-[#1A1A1A]/95 backdrop-blur-xl border border-[#00FFFF]/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
