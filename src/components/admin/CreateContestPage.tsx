import { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  X, 
  Calendar,
  Clock,
  Trophy,
  Users,
  FileText,
  Settings,
  Brain,
  MessageSquare,
  Radio,
  Award,
  Shield,
  AlertTriangle,
  Plus,
  Trash2,
  GripVertical
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface CreateContestPageProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  onBack: () => void;
  onCreateContest?: (contestData: any) => void;
}

interface Question {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  scoreWeight: number;
}

export function CreateContestPage({ adminRole, onBack, onCreateContest }: CreateContestPageProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Basic Info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contestType, setContestType] = useState<'solo' | 'team' | 'dual'>('solo');
  const [visibility, setVisibility] = useState<'public' | 'private' | 'invite'>('public');

  // Schedule
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('2');
  const [allowLateJoin, setAllowLateJoin] = useState(true);
  const [gracePeriod, setGracePeriod] = useState('15');
  const [autoEnd, setAutoEnd] = useState(true);

  // Problems
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  // Rules
  const [scoringType, setScoringType] = useState<'icpc' | 'codeforces' | 'custom'>('icpc');
  const [wrongPenalty, setWrongPenalty] = useState('10');
  const [partialScoring, setPartialScoring] = useState(false);
  const [testCaseVisibility, setTestCaseVisibility] = useState<'public' | 'hidden'>('hidden');
  const [freezeLeaderboard, setFreezeLeaderboard] = useState(true);
  const [freezeTime, setFreezeTime] = useState('30');
  const [plagiarismCheck, setPlagiarismCheck] = useState(true);

  // AI Controls
  const [aiEnabled, setAiEnabled] = useState<'disabled' | 'limited' | 'full'>('limited');
  const [maxAiHints, setMaxAiHints] = useState('3');
  const [aiVisibleTo, setAiVisibleTo] = useState<'everyone' | 'beginners'>('beginners');
  const [logAiUsage, setLogAiUsage] = useState(true);

  // Chat & Community
  const [chatEnabled, setChatEnabled] = useState(true);
  const [teamChatEnabled, setTeamChatEnabled] = useState(false);
  const [globalAnnouncements, setGlobalAnnouncements] = useState(true);
  const [autoDiscussionThread, setAutoDiscussionThread] = useState(true);

  // Streaming
  const [streamingEnabled, setStreamingEnabled] = useState(false);
  const [allowSpectators, setAllowSpectators] = useState(true);
  const [streamDelay, setStreamDelay] = useState('30');

  // Leaderboard
  const [realtimeLeaderboard, setRealtimeLeaderboard] = useState(true);
  const [rankVisibility, setRankVisibility] = useState(true);
  const [autoPublishLeaderboard, setAutoPublishLeaderboard] = useState(true);

  const canManageContests = adminRole === 'owner' || adminRole === 'dual_admin';

  if (!canManageContests) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-gray-400">You don't have permission to create contests.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const handleCreateContest = () => {
    const contestData = {
      title,
      description,
      contestType,
      visibility,
      startDate,
      startTime,
      duration,
      allowLateJoin,
      gracePeriod,
      autoEnd,
      selectedQuestions,
      scoringType,
      wrongPenalty,
      partialScoring,
      testCaseVisibility,
      freezeLeaderboard,
      freezeTime,
      plagiarismCheck,
      aiEnabled,
      maxAiHints,
      aiVisibleTo,
      logAiUsage,
      chatEnabled,
      teamChatEnabled,
      globalAnnouncements,
      autoDiscussionThread,
      streamingEnabled,
      allowSpectators,
      streamDelay,
      realtimeLeaderboard,
      rankVisibility,
      autoPublishLeaderboard,
      createdBy: adminRole,
      createdAt: new Date().toISOString(),
    };

    onCreateContest?.(contestData);
  };

  const mockQuestions: Question[] = [
    { id: '1', title: 'Two Sum Problem', difficulty: 'easy', tags: ['Array', 'Hash Table'], scoreWeight: 100 },
    { id: '2', title: 'Maximum Subarray', difficulty: 'medium', tags: ['Array', 'DP'], scoreWeight: 200 },
    { id: '3', title: 'Binary Tree Traversal', difficulty: 'medium', tags: ['Tree', 'DFS'], scoreWeight: 200 },
    { id: '4', title: 'Graph Shortest Path', difficulty: 'hard', tags: ['Graph', 'Dijkstra'], scoreWeight: 300 },
  ];

  const addQuestion = (question: Question) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const removeQuestion = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a0a1a] to-[#0D0D0D] text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] border-b border-red-500/30 shadow-[0_4px_20px_rgba(239,68,68,0.2)] backdrop-blur-sm">
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <button onClick={onBack} className="hover:text-cyan-400 transition-colors">Admin</button>
            <span>/</span>
            <span>Contests</span>
            <span>/</span>
            <span className="text-cyan-400">Create Contest</span>
          </div>

          {/* Title & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCancelDialog(true)}
                className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500 flex items-center justify-center transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
                  Create New Contest
                </h1>
                <p className="text-sm text-gray-400">Configure and launch a new coding competition</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="border-gray-700 hover:border-cyan-500"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 hover:border-purple-500"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={handleCreateContest}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Create Contest
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 p-6">
        {/* Left Panel - Form */}
        <div className={`${showPreview ? 'w-2/3' : 'w-full'} space-y-6 transition-all`}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="basic" className="data-[state=active]:bg-cyan-600">
                <FileText className="w-4 h-4 mr-2" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-cyan-600">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="problems" className="data-[state=active]:bg-cyan-600">
                <Trophy className="w-4 h-4 mr-2" />
                Problems
              </TabsTrigger>
              <TabsTrigger value="rules" className="data-[state=active]:bg-cyan-600">
                <Settings className="w-4 h-4 mr-2" />
                Rules
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-cyan-600">
                <Shield className="w-4 h-4 mr-2" />
                Advanced
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Contest Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-300">Contest Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., CodeArena Weekly Clash #12"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Contest description (Markdown supported)..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Contest Type</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['solo', 'team', 'dual'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setContestType(type)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            contestType === type
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                          }`}
                        >
                          <div className="font-semibold capitalize">{type}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Visibility</Label>
                    <Select value={visibility} onValueChange={(v: any) => setVisibility(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="invite">Invite Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Contest Timing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-gray-300">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime" className="text-gray-300">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="0.5">30 minutes</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Allow Late Join</div>
                      <div className="text-sm text-gray-500">Users can join after contest starts</div>
                    </div>
                    <Switch checked={allowLateJoin} onCheckedChange={setAllowLateJoin} />
                  </div>

                  {allowLateJoin && (
                    <div>
                      <Label className="text-gray-300">Grace Period (minutes)</Label>
                      <Input
                        type="number"
                        value={gracePeriod}
                        onChange={(e) => setGracePeriod(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 mt-2"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Auto-End Contest</div>
                      <div className="text-sm text-gray-500">Automatically end when time expires</div>
                    </div>
                    <Switch checked={autoEnd} onCheckedChange={setAutoEnd} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Problems Tab */}
            <TabsContent value="problems" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cyan-400">Problem Selection</CardTitle>
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add from Bank
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Questions */}
                  {selectedQuestions.length > 0 ? (
                    <div className="space-y-2">
                      <Label className="text-gray-300">Selected Problems ({selectedQuestions.length})</Label>
                      {selectedQuestions.map((q, index) => (
                        <div
                          key={q.id}
                          className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all"
                        >
                          <GripVertical className="w-4 h-4 text-gray-500" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-300">{index + 1}. {q.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${
                                q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                q.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {q.difficulty}
                              </Badge>
                              {q.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              <span className="text-xs text-gray-500">Score: {q.scoreWeight}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeQuestion(q.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No problems selected. Click "Add from Bank" to add questions.
                    </div>
                  )}

                  {/* Available Questions */}
                  <div className="mt-6">
                    <Label className="text-gray-300 mb-3 block">Available Questions</Label>
                    <div className="grid gap-2">
                      {mockQuestions.map((q) => (
                        <div
                          key={q.id}
                          className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
                        >
                          <div>
                            <div className="font-medium text-gray-300">{q.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${
                                q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                q.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {q.difficulty}
                              </Badge>
                              {q.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addQuestion(q)}
                            disabled={selectedQuestions.some(sq => sq.id === q.id)}
                            className="border-gray-700 hover:border-cyan-500"
                          >
                            {selectedQuestions.some(sq => sq.id === q.id) ? 'Added' : 'Add'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Rules & Evaluation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Scoring Type</Label>
                    <Select value={scoringType} onValueChange={(v: any) => setScoringType(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="icpc">ICPC Style</SelectItem>
                        <SelectItem value="codeforces">Codeforces Style</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Wrong Submission Penalty (minutes)</Label>
                    <Input
                      type="number"
                      value={wrongPenalty}
                      onChange={(e) => setWrongPenalty(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Partial Scoring</div>
                      <div className="text-sm text-gray-500">Award points for passing some test cases</div>
                    </div>
                    <Switch checked={partialScoring} onCheckedChange={setPartialScoring} />
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Test Case Visibility</Label>
                    <Select value={testCaseVisibility} onValueChange={(v: any) => setTestCaseVisibility(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Freeze Leaderboard</div>
                      <div className="text-sm text-gray-500">Hide standings before contest ends</div>
                    </div>
                    <Switch checked={freezeLeaderboard} onCheckedChange={setFreezeLeaderboard} />
                  </div>

                  {freezeLeaderboard && (
                    <div>
                      <Label className="text-gray-300">Freeze Time (minutes before end)</Label>
                      <Input
                        type="number"
                        value={freezeTime}
                        onChange={(e) => setFreezeTime(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 mt-2"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Plagiarism Detection</div>
                      <div className="text-sm text-gray-500">Automatically detect code similarity</div>
                    </div>
                    <Switch checked={plagiarismCheck} onCheckedChange={setPlagiarismCheck} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6">
              {/* AI Controls */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Assistance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">AI Level</Label>
                    <Select value={aiEnabled} onValueChange={(v: any) => setAiEnabled(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="full">Fully Enabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {aiEnabled !== 'disabled' && (
                    <>
                      <div>
                        <Label className="text-gray-300">Max AI Hints Per User</Label>
                        <Input
                          type="number"
                          value={maxAiHints}
                          onChange={(e) => setMaxAiHints(e.target.value)}
                          className="bg-gray-800/50 border-gray-700 mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300 mb-2 block">AI Visible To</Label>
                        <Select value={aiVisibleTo} onValueChange={(v: any) => setAiVisibleTo(v)}>
                          <SelectTrigger className="bg-gray-800/50 border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="beginners">Only Beginners</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                        <div>
                          <div className="font-medium text-gray-300">Log AI Usage</div>
                          <div className="text-sm text-gray-500">Track AI usage for leaderboard</div>
                        </div>
                        <Switch checked={logAiUsage} onCheckedChange={setLogAiUsage} />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Chat & Community */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Chat & Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Contest Chat</div>
                      <div className="text-sm text-gray-500">Enable chat during contest</div>
                    </div>
                    <Switch checked={chatEnabled} onCheckedChange={setChatEnabled} />
                  </div>

                  {contestType === 'team' && (
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                      <div>
                        <div className="font-medium text-gray-300">Private Team Chat</div>
                        <div className="text-sm text-gray-500">Teams can chat privately</div>
                      </div>
                      <Switch checked={teamChatEnabled} onCheckedChange={setTeamChatEnabled} />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Global Announcements</div>
                      <div className="text-sm text-gray-500">Admin can broadcast messages</div>
                    </div>
                    <Switch checked={globalAnnouncements} onCheckedChange={setGlobalAnnouncements} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Auto-Create Discussion</div>
                      <div className="text-sm text-gray-500">Create community thread after contest</div>
                    </div>
                    <Switch checked={autoDiscussionThread} onCheckedChange={setAutoDiscussionThread} />
                  </div>
                </CardContent>
              </Card>

              {/* Streaming */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Radio className="w-5 h-5" />
                    Streaming & Spectators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Enable Live Streaming</div>
                      <div className="text-sm text-gray-500">Broadcast contest live</div>
                    </div>
                    <Switch checked={streamingEnabled} onCheckedChange={setStreamingEnabled} />
                  </div>

                  {streamingEnabled && (
                    <>
                      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                        <div>
                          <div className="font-medium text-gray-300">Allow Spectators</div>
                          <div className="text-sm text-gray-500">Non-participants can watch</div>
                        </div>
                        <Switch checked={allowSpectators} onCheckedChange={setAllowSpectators} />
                      </div>

                      <div>
                        <Label className="text-gray-300">Stream Delay (seconds)</Label>
                        <Input
                          type="number"
                          value={streamDelay}
                          onChange={(e) => setStreamDelay(e.target.value)}
                          className="bg-gray-800/50 border-gray-700 mt-2"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Leaderboard Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Real-time Leaderboard</div>
                      <div className="text-sm text-gray-500">Update standings live</div>
                    </div>
                    <Switch checked={realtimeLeaderboard} onCheckedChange={setRealtimeLeaderboard} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Rank Visibility</div>
                      <div className="text-sm text-gray-500">Show user ranks publicly</div>
                    </div>
                    <Switch checked={rankVisibility} onCheckedChange={setRankVisibility} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-300">Auto-Publish After Contest</div>
                      <div className="text-sm text-gray-500">Automatically publish final standings</div>
                    </div>
                    <Switch checked={autoPublishLeaderboard} onCheckedChange={setAutoPublishLeaderboard} />
                  </div>
                </CardContent>
              </Card>

              {/* Admin Controls */}
              {adminRole === 'owner' && (
                <Card className="bg-gradient-to-br from-red-950/20 to-gray-900/30 border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Emergency Controls (Owner Only)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-400 mb-4">
                      These controls will be available during the live contest.
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30 text-center">
                        <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-1" />
                        <div className="text-xs text-red-400 font-semibold">Contest Kill Switch</div>
                      </div>
                      <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30 text-center">
                        <Shield className="w-5 h-5 text-red-400 mx-auto mb-1" />
                        <div className="text-xs text-red-400 font-semibold">Manual Disqualification</div>
                      </div>
                      <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30 text-center">
                        <Trophy className="w-5 h-5 text-red-400 mx-auto mb-1" />
                        <div className="text-xs text-red-400 font-semibold">Force Rejudge</div>
                      </div>
                      <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30 text-center">
                        <Clock className="w-5 h-5 text-red-400 mx-auto mb-1" />
                        <div className="text-xs text-red-400 font-semibold">Emergency Pause</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Live Preview */}
        {showPreview && (
          <div className="w-1/3 space-y-4 sticky top-24 h-fit">
            <Card className="bg-gradient-to-br from-cyan-950/20 to-purple-950/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-sm">Contest Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contest Card Preview */}
                <div className="p-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-lg border border-cyan-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">
                        {title || 'Untitled Contest'}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge className="text-xs bg-cyan-500/20 text-cyan-400 capitalize">
                          {contestType}
                        </Badge>
                        <Badge className="text-xs bg-purple-500/20 text-purple-400 capitalize">
                          {visibility}
                        </Badge>
                      </div>
                    </div>
                    <Trophy className="w-5 h-5 text-cyan-400" />
                  </div>

                  {description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{startDate || 'Not set'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{duration || '0'}h duration</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Trophy className="w-3 h-3" />
                      <span>{selectedQuestions.length} problems</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>0 registered</span>
                    </div>
                  </div>

                  {streamingEnabled && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <Badge className="text-xs bg-red-500/20 text-red-400">
                        <Radio className="w-3 h-3 mr-1" />
                        Live Streaming Enabled
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-400">AI Assistance</span>
                    <span className="text-cyan-400 capitalize">{aiEnabled}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-400">Scoring Type</span>
                    <span className="text-cyan-400 uppercase">{scoringType}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-400">Chat Enabled</span>
                    <span className={chatEnabled ? 'text-green-400' : 'text-red-400'}>
                      {chatEnabled ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-400">Leaderboard Freeze</span>
                    <span className={freezeLeaderboard ? 'text-yellow-400' : 'text-gray-500'}>
                      {freezeLeaderboard ? `${freezeTime} min` : 'Disabled'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Discard Changes?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              You have unsaved changes. Are you sure you want to leave? All progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700">Continue Editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={onBack}
              className="bg-red-600 hover:bg-red-700"
            >
              Discard & Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
