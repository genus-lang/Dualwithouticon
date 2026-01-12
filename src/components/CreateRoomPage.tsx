import { useState } from 'react';
import { Navbar } from './Navbar';
import { ChevronRight, Plus, Lock, Globe, Users, Clock, Gamepad2, Zap, Brain, MessageSquare, Tv, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
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
}

interface CreateRoomPageProps {
  navigationProps: NavigationProps;
  onRoomCreated?: (roomId: string) => void;
}

interface PowerUp {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  cooldown: number;
  maxUses: number;
}

export function CreateRoomPage({ navigationProps, onRoomCreated }: CreateRoomPageProps) {
  // Basic Room Info
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');

  // Participant Controls
  const [entryMode, setEntryMode] = useState<'invite' | 'open'>('invite');
  const [maxParticipants, setMaxParticipants] = useState(2);
  const [joinPassword, setJoinPassword] = useState('');
  const [requireApproval, setRequireApproval] = useState(false);

  // Time Configuration
  const [matchDuration, setMatchDuration] = useState(30);
  const [allowPause, setAllowPause] = useState(true);
  const [autoEnd, setAutoEnd] = useState(true);
  const [overtimeAllowed, setOvertimeAllowed] = useState(false);

  // Match Mode & Rules
  const [matchType, setMatchType] = useState<'friendly' | 'competitive' | 'practice'>('friendly');
  const [turnBased, setTurnBased] = useState(false);
  const [simultaneousTyping, setSimultaneousTyping] = useState(true);
  const [submissionLimit, setSubmissionLimit] = useState(0);
  const [wrongSubmissionPenalty, setWrongSubmissionPenalty] = useState(false);

  // Power-Ups
  const [powerUps, setPowerUps] = useState<PowerUp[]>([
    { id: 'freeze', name: 'Freeze Opponent Editor', description: 'Freeze opponent editor for X seconds', enabled: false, cooldown: 60, maxUses: 2 },
    { id: 'hide', name: 'Hide Test Case Output', description: 'Temporarily hide output panel', enabled: false, cooldown: 45, maxUses: 3 },
    { id: 'reduce', name: 'Reduce Opponent Time', description: 'Deduct seconds from opponent', enabled: false, cooldown: 90, maxUses: 1 },
    { id: 'hint', name: 'Reveal Hint', description: 'Get one forced hint', enabled: false, cooldown: 120, maxUses: 2 },
    { id: 'lock', name: 'Lock Run Button', description: 'Prevent opponent from running code', enabled: false, cooldown: 75, maxUses: 2 },
  ]);

  // AI Assistance
  const [aiLevel, setAiLevel] = useState<'disabled' | 'limited' | 'full'>('limited');
  const [maxAiHints, setMaxAiHints] = useState(3);
  const [aiPenalty, setAiPenalty] = useState(false);

  // Chat & Communication
  const [enableChat, setEnableChat] = useState(true);
  const [enablePrivateMessages, setEnablePrivateMessages] = useState(false);

  // Streaming & Spectators
  const [allowSpectators, setAllowSpectators] = useState(false);
  const [enableStreaming, setEnableStreaming] = useState(false);
  const [streamDelay, setStreamDelay] = useState(5);
  const [spectatorChat, setSpectatorChat] = useState(false);

  const togglePowerUp = (id: string) => {
    setPowerUps(powerUps.map(pu => 
      pu.id === id ? { ...pu, enabled: !pu.enabled } : pu
    ));
  };

  const updatePowerUp = (id: string, field: 'cooldown' | 'maxUses', value: number) => {
    setPowerUps(powerUps.map(pu => 
      pu.id === id ? { ...pu, [field]: value } : pu
    ));
  };

  const handleCreateRoom = () => {
    // Mock room creation
    const roomId = `room_${Date.now()}`;
    console.log('Creating room with settings:', {
      roomName,
      roomDescription,
      visibility,
      entryMode,
      maxParticipants,
      matchDuration,
      matchType,
      powerUps: powerUps.filter(pu => pu.enabled),
      aiLevel,
      enableChat,
      allowSpectators,
    });
    
    if (onRoomCreated) {
      onRoomCreated(roomId);
    }
    toast.success('Room created successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar {...navigationProps} />
      
      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pb-12">
        {/* Header */}
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
            <span className="text-white/60">Create Room</span>
          </div>

          {/* Page Title */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FFFF]/20 to-[#9333EA]/20 border border-[#00FFFF]/30 flex items-center justify-center">
              <Plus className="w-6 h-6 text-[#00FFFF]" />
            </div>
            <h1 className="text-3xl text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Create a Custom Match Room
            </h1>
          </div>
          <p className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Configure rules, invite players, and start coding.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left & Center Column - Form Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* SECTION 1: Basic Room Information */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Users className="w-5 h-5 text-[#00FFFF]" />
                  Basic Room Information
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Set up your room name, description, and visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="room-name" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Room Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="room-name"
                    placeholder="e.g., Meghram vs Ayush – Practice Match"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room-description" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Room Description <span className="text-white/50">(Optional)</span>
                  </Label>
                  <Textarea
                    id="room-description"
                    placeholder="Short explanation or rules (markdown supported)"
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                    className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white min-h-[80px]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Room Visibility
                  </Label>
                  <ToggleGroup 
                    type="single" 
                    value={visibility}
                    onValueChange={(value) => value && setVisibility(value as 'private' | 'public')}
                    className="justify-start"
                  >
                    <ToggleGroupItem 
                      value="private" 
                      className="data-[state=on]:bg-[#00FFFF]/20 data-[state=on]:text-[#00FFFF] data-[state=on]:border-[#00FFFF]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Private (Invite-only)
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="public"
                      className="data-[state=on]:bg-[#00FFFF]/20 data-[state=on]:text-[#00FFFF] data-[state=on]:border-[#00FFFF]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Public (Anyone can join)
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 2: Participant Access Control */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Users className="w-5 h-5 text-[#00FFFF]" />
                  Participant Access Control
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Manage who can join your room
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Entry Mode
                  </Label>
                  <ToggleGroup 
                    type="single" 
                    value={entryMode}
                    onValueChange={(value) => value && setEntryMode(value as 'invite' | 'open')}
                    className="justify-start"
                  >
                    <ToggleGroupItem 
                      value="invite" 
                      className="data-[state=on]:bg-[#00FFFF]/20 data-[state=on]:text-[#00FFFF] data-[state=on]:border-[#00FFFF]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      Invite Only
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="open"
                      className="data-[state=on]:bg-[#00FFFF]/20 data-[state=on]:text-[#00FFFF] data-[state=on]:border-[#00FFFF]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      Open to All
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-participants" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Max Participants: {maxParticipants}
                  </Label>
                  <Slider
                    id="max-participants"
                    min={2}
                    max={10}
                    step={1}
                    value={[maxParticipants]}
                    onValueChange={(value) => setMaxParticipants(value[0])}
                    className="w-full"
                  />
                </div>

                {entryMode === 'open' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="join-password" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Join Password <span className="text-white/50">(Optional)</span>
                      </Label>
                      <Input
                        id="join-password"
                        type="password"
                        placeholder="Set a password for entry"
                        value={joinPassword}
                        onChange={(e) => setJoinPassword(e.target.value)}
                        className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="require-approval" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Require Manual Approval
                        </Label>
                        <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Admin must approve each join request
                        </p>
                      </div>
                      <Switch
                        id="require-approval"
                        checked={requireApproval}
                        onCheckedChange={setRequireApproval}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* SECTION 3: Match Time Configuration */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Clock className="w-5 h-5 text-[#00FFFF]" />
                  Match Time Configuration
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Set time limits and controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Match Duration (minutes)
                  </Label>
                  <div className="flex gap-2">
                    {[15, 30, 45, 60].map((duration) => (
                      <Button
                        key={duration}
                        variant={matchDuration === duration ? 'default' : 'outline'}
                        className={matchDuration === duration 
                          ? 'bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF] hover:bg-[#00FFFF]/30' 
                          : 'border-[#00FFFF]/30 text-white hover:bg-[#00FFFF]/10'
                        }
                        onClick={() => setMatchDuration(duration)}
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {duration} min
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2 items-center mt-2">
                    <Label className="text-white/70 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Custom:
                    </Label>
                    <Input
                      type="number"
                      min={5}
                      max={180}
                      value={matchDuration}
                      onChange={(e) => setMatchDuration(parseInt(e.target.value) || 30)}
                      className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white w-24"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    />
                    <span className="text-white/50 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>minutes</span>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-pause" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Allow Pause (Admin Only)
                      </Label>
                      <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Room admin can pause the match
                      </p>
                    </div>
                    <Switch
                      id="allow-pause"
                      checked={allowPause}
                      onCheckedChange={setAllowPause}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-end" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Auto-End Match
                      </Label>
                      <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Match ends when time runs out
                      </p>
                    </div>
                    <Switch
                      id="auto-end"
                      checked={autoEnd}
                      onCheckedChange={setAutoEnd}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="overtime" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Overtime Allowed
                      </Label>
                      <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Extra time if match is tied
                      </p>
                    </div>
                    <Switch
                      id="overtime"
                      checked={overtimeAllowed}
                      onCheckedChange={setOvertimeAllowed}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 4: Match Mode & Rules */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Gamepad2 className="w-5 h-5 text-[#00FFFF]" />
                  Match Mode & Rules
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Configure match type and gameplay rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Match Type
                  </Label>
                  <RadioGroup value={matchType} onValueChange={(value) => setMatchType(value as any)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="friendly" id="friendly" />
                      <Label htmlFor="friendly" className="text-white cursor-pointer" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Friendly Match - Casual practice session
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="competitive" id="competitive" />
                      <Label htmlFor="competitive" className="text-white cursor-pointer" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Competitive Match - Ranked play with ratings
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="practice" id="practice" />
                      <Label htmlFor="practice" className="text-white cursor-pointer" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Practice Mode - No scoring, learning focus
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="turn-based" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Turn-Based Coding
                      </Label>
                      <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Players take turns writing code
                      </p>
                    </div>
                    <Switch
                      id="turn-based"
                      checked={turnBased}
                      onCheckedChange={setTurnBased}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="simultaneous" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Simultaneous Typing
                      </Label>
                      <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Both players can code at same time
                      </p>
                    </div>
                    <Switch
                      id="simultaneous"
                      checked={simultaneousTyping}
                      onCheckedChange={setSimultaneousTyping}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="submission-limit" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Submission Limit (0 = Unlimited)
                    </Label>
                    <Input
                      id="submission-limit"
                      type="number"
                      min={0}
                      value={submissionLimit}
                      onChange={(e) => setSubmissionLimit(parseInt(e.target.value) || 0)}
                      className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="penalty" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Penalty on Wrong Submission
                      </Label>
                      <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Time penalty for incorrect answers
                      </p>
                    </div>
                    <Switch
                      id="penalty"
                      checked={wrongSubmissionPenalty}
                      onCheckedChange={setWrongSubmissionPenalty}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 5: Power-Ups Configuration */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Zap className="w-5 h-5 text-[#00FFFF]" />
                  Power-Ups Configuration
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Enable and configure special abilities (Advanced & Unique)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {powerUps.map((powerUp) => (
                  <div 
                    key={powerUp.id}
                    className={`p-4 rounded-lg border transition-all ${
                      powerUp.enabled 
                        ? 'bg-[#00FFFF]/5 border-[#00FFFF]/40' 
                        : 'bg-[#0D0D0D]/50 border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {powerUp.name}
                          </Label>
                          {powerUp.enabled && (
                            <Badge className="bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/40">
                              Enabled
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {powerUp.description}
                        </p>
                      </div>
                      <Switch
                        checked={powerUp.enabled}
                        onCheckedChange={() => togglePowerUp(powerUp.id)}
                      />
                    </div>

                    {powerUp.enabled && (
                      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10">
                        <div className="space-y-1">
                          <Label className="text-xs text-white/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            Cooldown (seconds)
                          </Label>
                          <Input
                            type="number"
                            min={5}
                            value={powerUp.cooldown}
                            onChange={(e) => updatePowerUp(powerUp.id, 'cooldown', parseInt(e.target.value) || 60)}
                            className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white h-8"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-white/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            Max Uses Per Player
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            value={powerUp.maxUses}
                            onChange={(e) => updatePowerUp(powerUp.id, 'maxUses', parseInt(e.target.value) || 1)}
                            className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white h-8"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SECTION 6: AI Assistance Controls */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Brain className="w-5 h-5 text-[#00FFFF]" />
                  AI Assistance Controls
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Configure AI help level and restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    AI Assistance Level
                  </Label>
                  <Select value={aiLevel} onValueChange={(value) => setAiLevel(value as any)}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/30">
                      <SelectItem value="disabled" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Disabled - No AI assistance
                      </SelectItem>
                      <SelectItem value="limited" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Limited - Basic hints only
                      </SelectItem>
                      <SelectItem value="full" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Full - Complete AI support
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {aiLevel !== 'disabled' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="max-ai-hints" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Max AI Hints Per Player
                      </Label>
                      <Input
                        id="max-ai-hints"
                        type="number"
                        min={0}
                        value={maxAiHints}
                        onChange={(e) => setMaxAiHints(parseInt(e.target.value) || 0)}
                        className="bg-[#0D0D0D] border-[#00FFFF]/30 text-white"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ai-penalty" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          AI Usage Penalty
                        </Label>
                        <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Reduce score for using AI hints
                        </p>
                      </div>
                      <Switch
                        id="ai-penalty"
                        checked={aiPenalty}
                        onCheckedChange={setAiPenalty}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* SECTION 7: Chat & Communication */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <MessageSquare className="w-5 h-5 text-[#00FFFF]" />
                  Chat & Communication
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Enable chat features during match
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-chat" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Enable Match Chat
                    </Label>
                    <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Allow participants to chat during match
                    </p>
                  </div>
                  <Switch
                    id="enable-chat"
                    checked={enableChat}
                    onCheckedChange={setEnableChat}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="private-messages" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Enable Private Messages
                    </Label>
                    <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Allow 1-on-1 private conversations
                    </p>
                  </div>
                  <Switch
                    id="private-messages"
                    checked={enablePrivateMessages}
                    onCheckedChange={setEnablePrivateMessages}
                  />
                </div>

                <div className="p-3 bg-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-lg">
                  <p className="text-xs text-white/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    💡 <strong>Admin Controls:</strong> You can mute participants or disable chat mid-match as Room Admin.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 8: Streaming & Spectator Mode */}
            <Card className="bg-[#1A1A1A]/60 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Tv className="w-5 h-5 text-[#00FFFF]" />
                  Streaming & Spectator Mode
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Allow others to watch the match
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-spectators" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Allow Spectators
                    </Label>
                    <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Let others watch the match live
                    </p>
                  </div>
                  <Switch
                    id="allow-spectators"
                    checked={allowSpectators}
                    onCheckedChange={setAllowSpectators}
                  />
                </div>

                {allowSpectators && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-streaming" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Enable Live Stream
                        </Label>
                        <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Broadcast match publicly
                        </p>
                      </div>
                      <Switch
                        id="enable-streaming"
                        checked={enableStreaming}
                        onCheckedChange={setEnableStreaming}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stream-delay" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Stream Delay: {streamDelay} seconds
                      </Label>
                      <Slider
                        id="stream-delay"
                        min={0}
                        max={30}
                        step={5}
                        value={[streamDelay]}
                        onValueChange={(value) => setStreamDelay(value[0])}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="spectator-chat" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Allow Spectator Chat
                        </Label>
                        <p className="text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Spectators can chat with each other
                        </p>
                      </div>
                      <Switch
                        id="spectator-chat"
                        checked={spectatorChat}
                        onCheckedChange={setSpectatorChat}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* SECTION 9: Room Admin Controls Preview */}
            <Card className="bg-gradient-to-br from-[#00FFFF]/10 to-[#9333EA]/10 border-[#00FFFF]/40">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Shield className="w-5 h-5 text-[#00FFFF]" />
                  Room Admin Controls
                </CardTitle>
                <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  You will be the Room Admin for this match
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-white/80 text-sm mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    As Room Admin, you'll have the following powers:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Kick participant',
                      'Start match',
                      'Pause match',
                      'End match',
                      'Disable power-ups',
                      'Lock room',
                      'Mute participants',
                      'Manage settings'
                    ].map((power) => (
                      <div key={power} className="flex items-center gap-2 text-sm text-white/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]" />
                        {power}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Live Summary Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/30">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Live Room Preview
                  </CardTitle>
                  <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    How players will see your room
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ROOM NAME
                    </Label>
                    <p className="text-white mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {roomName || 'Untitled Room'}
                    </p>
                  </div>

                  {roomDescription && (
                    <div>
                      <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        DESCRIPTION
                      </Label>
                      <p className="text-white/80 text-sm mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {roomDescription}
                      </p>
                    </div>
                  )}

                  <Separator className="bg-white/10" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Visibility
                      </span>
                      <Badge className={visibility === 'private' ? 'bg-purple-500/20 text-purple-300' : 'bg-green-500/20 text-green-300'}>
                        {visibility === 'private' ? 'Private' : 'Public'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Entry Mode
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {entryMode === 'invite' ? 'Invite Only' : 'Open'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Max Players
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {maxParticipants}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Duration
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {matchDuration} min
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Match Type
                      </span>
                      <Badge className="bg-[#00FFFF]/20 text-[#00FFFF]">
                        {matchType.charAt(0).toUpperCase() + matchType.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        AI Assistance
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {aiLevel.charAt(0).toUpperCase() + aiLevel.slice(1)}
                      </span>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <Label className="text-white/60 text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      POWER-UPS ENABLED ({powerUps.filter(p => p.enabled).length})
                    </Label>
                    {powerUps.filter(p => p.enabled).length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {powerUps.filter(p => p.enabled).map((pu) => (
                          <Badge 
                            key={pu.id}
                            className="bg-purple-500/20 text-purple-300 text-xs"
                          >
                            {pu.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/40 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        None
                      </p>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-1">
                    <Label className="text-white/60 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      FEATURES
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {enableChat && (
                        <Badge variant="outline" className="border-[#00FFFF]/30 text-[#00FFFF] text-xs">
                          Chat
                        </Badge>
                      )}
                      {allowSpectators && (
                        <Badge variant="outline" className="border-[#00FFFF]/30 text-[#00FFFF] text-xs">
                          Spectators
                        </Badge>
                      )}
                      {allowPause && (
                        <Badge variant="outline" className="border-[#00FFFF]/30 text-[#00FFFF] text-xs">
                          Pausable
                        </Badge>
                      )}
                      {simultaneousTyping && (
                        <Badge variant="outline" className="border-[#00FFFF]/30 text-[#00FFFF] text-xs">
                          Simultaneous
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                <Button
                  onClick={handleCreateRoom}
                  disabled={!roomName}
                  className="w-full bg-gradient-to-r from-[#00FFFF] to-[#9333EA] text-black hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Room
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#00FFFF]/30 text-white hover:bg-[#00FFFF]/10"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="ghost"
                  onClick={navigationProps.onHome}
                  className="w-full text-white/60 hover:text-white hover:bg-white/5"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}