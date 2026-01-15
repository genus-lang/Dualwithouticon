import { useState } from 'react';
import { Navbar } from './Navbar';
import { ChevronRight, Plus, Lock, Globe, Users, Clock, Code, X, Settings, List, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';
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

interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

// Mock question bank
const availableQuestions: Question[] = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', points: 100 },
  { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', points: 200 },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', points: 200 },
  { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', points: 300 },
  { id: '5', title: 'Longest Palindromic Substring', difficulty: 'Medium', points: 200 },
  { id: '6', title: 'Reverse Integer', difficulty: 'Easy', points: 100 },
  { id: '7', title: 'String to Integer (atoi)', difficulty: 'Medium', points: 200 },
  { id: '8', title: 'Container With Most Water', difficulty: 'Medium', points: 200 },
  { id: '9', title: 'Regular Expression Matching', difficulty: 'Hard', points: 300 },
  { id: '10', title: 'Valid Parentheses', difficulty: 'Easy', points: 100 },
];

export function CreateRoomPage({ navigationProps, onRoomCreated }: CreateRoomPageProps) {
  // Basic Room Info
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');

  // Contest Settings
  const [matchDuration, setMatchDuration] = useState('30');
  const [maxParticipants, setMaxParticipants] = useState('2');
  const [matchType, setMatchType] = useState<'friendly' | 'competitive' | 'practice'>('friendly');

  // Questions
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);

  // Advanced Settings
  const [allowPause, setAllowPause] = useState(true);
  const [enableChat, setEnableChat] = useState(true);
  const [allowSpectators, setAllowSpectators] = useState(false);

  const handleAddQuestion = (question: Question) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
      toast.success(`Added "${question.title}" to contest`);
    } else {
      toast.error('Question already added');
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
    toast.success('Question removed from contest');
  };

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      toast.error('Please enter a room name');
      return;
    }

    if (selectedQuestions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    // Mock room creation
    const roomId = `room_${Date.now()}`;
    console.log('Creating room with settings:', {
      roomName,
      roomDescription,
      visibility,
      matchDuration,
      maxParticipants,
      matchType,
      questions: selectedQuestions,
      allowPause,
      enableChat,
      allowSpectators,
    });

    toast.success('Room created successfully!');
    
    if (onRoomCreated) {
      onRoomCreated(roomId);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Hard':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const totalPoints = selectedQuestions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-16">
      <Navbar {...navigationProps} />

      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
          <button
            onClick={navigationProps.onHome}
            className="text-gray-400 hover:text-white"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <button
            onClick={navigationProps.onStartCoding}
            className="text-gray-400 hover:text-white"
          >
            Arena
          </button>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white">Create Room</span>
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl text-white mb-2" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
            Create Contest Room
          </h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Configure your coding contest settings and select questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Information */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="room-name" className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Room Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="room-name"
                    placeholder="Enter room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white text-sm h-8"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="room-description" className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="room-description"
                    placeholder="Enter room description"
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white text-sm min-h-[60px]"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Visibility
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => setVisibility('private')}
                        className={`flex-1 h-8 text-xs ${
                          visibility === 'private'
                            ? 'bg-[#3a3a3a] text-white border-[#4a4a4a]'
                            : 'bg-[#1a1a1a] text-gray-400 border-[#3a3a3a] hover:bg-[#2a2a2a]'
                        }`}
                        variant="outline"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        <Lock className="w-3 h-3 mr-1" />
                        Private
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setVisibility('public')}
                        className={`flex-1 h-8 text-xs ${
                          visibility === 'public'
                            ? 'bg-[#3a3a3a] text-white border-[#4a4a4a]'
                            : 'bg-[#1a1a1a] text-gray-400 border-[#3a3a3a] hover:bg-[#2a2a2a]'
                        }`}
                        variant="outline"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Match Type
                    </Label>
                    <Select value={matchType} onValueChange={(value) => setMatchType(value as any)}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#262626] border-[#3a3a3a]">
                        <SelectItem value="friendly" className="text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Friendly
                        </SelectItem>
                        <SelectItem value="competitive" className="text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Competitive
                        </SelectItem>
                        <SelectItem value="practice" className="text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Practice
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="duration" className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Duration (min)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min="5"
                      max="180"
                      value={matchDuration}
                      onChange={(e) => setMatchDuration(e.target.value)}
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white text-sm h-8"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="max-participants" className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Max Participants
                    </Label>
                    <Input
                      id="max-participants"
                      type="number"
                      min="2"
                      max="10"
                      value={maxParticipants}
                      onChange={(e) => setMaxParticipants(e.target.value)}
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white text-sm h-8"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions Section */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                    Contest Questions
                  </CardTitle>
                  <Button
                    onClick={() => setShowQuestionSelector(!showQuestionSelector)}
                    className="bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
                    size="sm"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Questions
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedQuestions.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    No questions added yet. Click "Add Questions" to get started.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedQuestions.map((question, index) => (
                      <div
                        key={question.id}
                        className="flex items-center justify-between bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            {index + 1}.
                          </span>
                          <div>
                            <h4 className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                              {question.title}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className={`text-[10px] ${getDifficultyColor(question.difficulty)}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                {question.difficulty}
                              </span>
                              <span className="text-gray-500 text-[10px]">•</span>
                              <span className="text-gray-400 text-[10px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                {question.points} pts
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRemoveQuestion(question.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-6 w-6 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Question Selector Modal */}
                {showQuestionSelector && (
                  <div className="mt-3 p-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                        Select Questions
                      </h4>
                      <Button
                        onClick={() => setShowQuestionSelector(false)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                      {availableQuestions.map((question) => {
                        const isSelected = selectedQuestions.find(q => q.id === question.id);
                        return (
                          <button
                            key={question.id}
                            onClick={() => handleAddQuestion(question)}
                            disabled={!!isSelected}
                            className={`w-full text-left p-2 rounded-lg border ${
                              isSelected
                                ? 'bg-[#2a2a2a] border-[#4a4a4a] opacity-50 cursor-not-allowed'
                                : 'bg-[#262626] border-[#3a3a3a] hover:bg-[#2a2a2a] hover:border-[#4a4a4a]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="text-white text-xs mb-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                  {question.title}
                                </h5>
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] ${getDifficultyColor(question.difficulty)}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    {question.difficulty}
                                  </span>
                                  <span className="text-gray-500 text-[10px]">•</span>
                                  <span className="text-gray-400 text-[10px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    {question.points} pts
                                  </span>
                                </div>
                              </div>
                              {isSelected && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-[10px] h-5">
                                  Added
                                </Badge>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center gap-2" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                  <Settings className="w-3.5 h-3.5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-pause" className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Allow Pause
                    </Label>
                    <p className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Admin can pause the contest
                    </p>
                  </div>
                  <Switch
                    id="allow-pause"
                    checked={allowPause}
                    onCheckedChange={setAllowPause}
                  />
                </div>

                <Separator className="bg-[#3a3a3a]" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-chat" className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Enable Chat
                    </Label>
                    <p className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Participants can chat during contest
                    </p>
                  </div>
                  <Switch
                    id="enable-chat"
                    checked={enableChat}
                    onCheckedChange={setEnableChat}
                  />
                </div>

                <Separator className="bg-[#3a3a3a]" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-spectators" className="text-white text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Allow Spectators
                    </Label>
                    <p className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Others can watch the contest
                    </p>
                  </div>
                  <Switch
                    id="allow-spectators"
                    checked={allowSpectators}
                    onCheckedChange={setAllowSpectators}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-[#262626] border-[#3a3a3a]">
                <CardHeader>
                  <CardTitle className="text-white text-base" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                    Contest Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-400 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      ROOM NAME
                    </Label>
                    <p className="text-white mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {roomName || 'Untitled Room'}
                    </p>
                  </div>

                  <Separator className="bg-[#3a3a3a]" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Visibility
                      </span>
                      <Badge className={visibility === 'private' ? 'bg-purple-500/20 text-purple-300' : 'bg-green-500/20 text-green-300'}>
                        {visibility === 'private' ? 'Private' : 'Public'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Type
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {matchType.charAt(0).toUpperCase() + matchType.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Duration
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {matchDuration} min
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Max Players
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {maxParticipants}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Questions
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {selectedQuestions.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Total Points
                      </span>
                      <span className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {totalPoints}
                      </span>
                    </div>
                  </div>

                  <Separator className="bg-[#3a3a3a]" />

                  <div>
                    <Label className="text-gray-400 text-xs mb-2 block" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      FEATURES
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {allowPause && (
                        <Badge variant="outline" className="border-[#3a3a3a] text-gray-300 text-xs">
                          Pausable
                        </Badge>
                      )}
                      {enableChat && (
                        <Badge variant="outline" className="border-[#3a3a3a] text-gray-300 text-xs">
                          Chat
                        </Badge>
                      )}
                      {allowSpectators && (
                        <Badge variant="outline" className="border-[#3a3a3a] text-gray-300 text-xs">
                          Spectators
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Separator className="bg-[#3a3a3a]" />

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleCreateRoom}
                      disabled={!roomName || selectedQuestions.length === 0}
                      className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Room
                    </Button>
                    <Button
                      variant="outline"
                      onClick={navigationProps.onHome}
                      className="w-full border-[#3a3a3a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}