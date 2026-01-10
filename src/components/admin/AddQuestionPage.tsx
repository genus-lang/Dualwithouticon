import { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus,
  Trash2,
  AlertTriangle,
  FileCode,
  TestTube,
  Brain,
  Settings,
  Lock,
  Database
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

interface AddQuestionPageProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  onBack: () => void;
  onCreateQuestion?: (questionData: any) => void;
}

interface TestCase {
  id: string;
  input: string;
  output: string;
  weight: number;
  isPublic: boolean;
}

export function AddQuestionPage({ adminRole, onBack, onCreateQuestion }: AddQuestionPageProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Basic Info
  const [title, setTitle] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Input/Output
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [constraints, setConstraints] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');

  // Sample Test Cases
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');
  const [explanation, setExplanation] = useState('');

  // Hidden Test Cases
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  // AI & Arena Controls
  const [aiHints, setAiHints] = useState<'disabled' | 'limited' | 'full'>('limited');
  const [maxHints, setMaxHints] = useState('3');
  const [aiPenaltyWeight, setAiPenaltyWeight] = useState('0.1');
  const [allowDualCoding, setAllowDualCoding] = useState(true);
  const [allowFriendlyMatch, setAllowFriendlyMatch] = useState(true);
  const [timePerTurn, setTimePerTurn] = useState('5');

  // Contest & Usage
  const [availableFor, setAvailableFor] = useState<'practice' | 'contest' | 'both'>('both');
  const [lockDuringContest, setLockDuringContest] = useState(true);
  const [allowPartialScoring, setAllowPartialScoring] = useState(false);
  const [maxSubmissions, setMaxSubmissions] = useState('');

  // Offline Mode
  const [allowOffline, setAllowOffline] = useState(true);
  const [cachePriority, setCachePriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [offlineExecutionLimit, setOfflineExecutionLimit] = useState('10');

  // Admin Notes
  const [adminNote, setAdminNote] = useState('');

  const canManageQuestions = adminRole === 'owner' || adminRole === 'dual_admin' || adminRole === 'question_admin';

  if (!canManageQuestions) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-gray-400">You don't have permission to add questions.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: '',
      output: '',
      weight: 10,
      isPublic: false,
    };
    setTestCases([...testCases, newTestCase]);
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: any) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const removeTestCase = (id: string) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const handleCreateQuestion = () => {
    const questionData = {
      title,
      problemStatement,
      difficulty,
      tags,
      inputFormat,
      outputFormat,
      constraints,
      timeComplexity,
      spaceComplexity,
      sampleInput,
      sampleOutput,
      explanation,
      testCases,
      aiHints,
      maxHints,
      aiPenaltyWeight,
      allowDualCoding,
      allowFriendlyMatch,
      timePerTurn,
      availableFor,
      lockDuringContest,
      allowPartialScoring,
      maxSubmissions,
      allowOffline,
      cachePriority,
      offlineExecutionLimit,
      adminNote,
      createdBy: adminRole,
      createdAt: new Date().toISOString(),
    };

    onCreateQuestion?.(questionData);
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 border-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-400 border-yellow-500 bg-yellow-500/10';
      case 'hard': return 'text-red-400 border-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a0a1a] to-[#0D0D0D] text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] border-b border-cyan-500/30 shadow-[0_4px_20px_rgba(0,255,255,0.2)] backdrop-blur-sm">
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <button onClick={onBack} className="hover:text-cyan-400 transition-colors">Admin</button>
            <span>/</span>
            <span>Question Bank</span>
            <span>/</span>
            <span className="text-cyan-400">Add Question</span>
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
                  <FileCode className="w-6 h-6" />
                  Add New Question
                </h1>
                <p className="text-sm text-gray-400">Create a high-quality coding problem</p>
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
                onClick={handleCreateQuestion}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                <FileCode className="w-4 h-4 mr-2" />
                Publish Question
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
            <TabsList className="grid grid-cols-4 w-full bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="basic" className="data-[state=active]:bg-cyan-600">
                <FileCode className="w-4 h-4 mr-2" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="testcases" className="data-[state=active]:bg-cyan-600">
                <TestTube className="w-4 h-4 mr-2" />
                Test Cases
              </TabsTrigger>
              <TabsTrigger value="ai-arena" className="data-[state=active]:bg-cyan-600">
                <Brain className="w-4 h-4 mr-2" />
                AI & Arena
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-cyan-600">
                <Settings className="w-4 h-4 mr-2" />
                Advanced
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Question Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-300">Question Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Find the Maximum Subarray Sum"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="statement" className="text-gray-300">Problem Statement *</Label>
                    <Textarea
                      id="statement"
                      placeholder="Write the problem statement here (Markdown supported)..."
                      value={problemStatement}
                      onChange={(e) => setProblemStatement(e.target.value)}
                      rows={8}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2 font-mono text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Difficulty</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['easy', 'medium', 'hard'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`p-3 rounded-lg border-2 transition-all capitalize ${
                              difficulty === level
                                ? level === 'easy' ? 'border-green-500 bg-green-500/10 text-green-400' :
                                  level === 'medium' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400' :
                                  'border-red-500 bg-red-500/10 text-red-400'
                                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 text-gray-400'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 mb-2 block">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTag()}
                          className="bg-gray-800/50 border-gray-700 focus:border-cyan-500"
                        />
                        <Button onClick={addTag} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Input/Output Definition */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Input/Output Specification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="inputFormat" className="text-gray-300">Input Format</Label>
                    <Textarea
                      id="inputFormat"
                      placeholder="Describe the input format..."
                      value={inputFormat}
                      onChange={(e) => setInputFormat(e.target.value)}
                      rows={3}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="outputFormat" className="text-gray-300">Output Format</Label>
                    <Textarea
                      id="outputFormat"
                      placeholder="Describe the expected output format..."
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      rows={3}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="constraints" className="text-gray-300">Constraints</Label>
                    <Textarea
                      id="constraints"
                      placeholder="e.g., 1 ≤ N ≤ 10^5"
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      rows={3}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeComplexity" className="text-gray-300">Expected Time Complexity</Label>
                      <Input
                        id="timeComplexity"
                        placeholder="e.g., O(N log N)"
                        value={timeComplexity}
                        onChange={(e) => setTimeComplexity(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="spaceComplexity" className="text-gray-300">Expected Space Complexity</Label>
                      <Input
                        id="spaceComplexity"
                        placeholder="e.g., O(N)"
                        value={spaceComplexity}
                        onChange={(e) => setSpaceComplexity(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Test Case */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Sample Test Case</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sampleInput" className="text-gray-300">Sample Input</Label>
                    <Textarea
                      id="sampleInput"
                      placeholder="Example input..."
                      value={sampleInput}
                      onChange={(e) => setSampleInput(e.target.value)}
                      rows={4}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2 font-mono"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sampleOutput" className="text-gray-300">Sample Output</Label>
                    <Textarea
                      id="sampleOutput"
                      placeholder="Expected output..."
                      value={sampleOutput}
                      onChange={(e) => setSampleOutput(e.target.value)}
                      rows={4}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2 font-mono"
                    />
                  </div>

                  <div>
                    <Label htmlFor="explanation" className="text-gray-300">Explanation</Label>
                    <Textarea
                      id="explanation"
                      placeholder="Explain the sample test case..."
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      rows={3}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Test Cases Tab */}
            <TabsContent value="testcases" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-cyan-400">Hidden Test Cases</CardTitle>
                  <Button onClick={addTestCase} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Test Case
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testCases.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <TestTube className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No test cases added yet</p>
                      <p className="text-sm mt-1">Click "Add Test Case" to get started</p>
                    </div>
                  ) : (
                    testCases.map((testCase, index) => (
                      <Card key={testCase.id} className="bg-gray-800/30 border-gray-700">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm text-gray-300">Test Case #{index + 1}</CardTitle>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <Label className="text-xs text-gray-400">Public</Label>
                                <Switch
                                  checked={testCase.isPublic}
                                  onCheckedChange={(checked) => updateTestCase(testCase.id, 'isPublic', checked)}
                                />
                              </div>
                              <button
                                onClick={() => removeTestCase(testCase.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-gray-400 text-xs">Input</Label>
                            <Textarea
                              value={testCase.input}
                              onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                              rows={3}
                              className="bg-gray-900/50 border-gray-600 focus:border-cyan-500 mt-1 font-mono text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-400 text-xs">Expected Output</Label>
                            <Textarea
                              value={testCase.output}
                              onChange={(e) => updateTestCase(testCase.id, 'output', e.target.value)}
                              rows={3}
                              className="bg-gray-900/50 border-gray-600 focus:border-cyan-500 mt-1 font-mono text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-400 text-xs">Weight (Points)</Label>
                            <Input
                              type="number"
                              value={testCase.weight}
                              onChange={(e) => updateTestCase(testCase.id, 'weight', parseInt(e.target.value) || 0)}
                              className="bg-gray-900/50 border-gray-600 focus:border-cyan-500 mt-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI & Arena Tab */}
            <TabsContent value="ai-arena" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">AI Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">AI Hints</Label>
                    <Select value={aiHints} onValueChange={(v: any) => setAiHints(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxHints" className="text-gray-300">Max Hints Per User</Label>
                      <Input
                        id="maxHints"
                        type="number"
                        value={maxHints}
                        onChange={(e) => setMaxHints(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="aiPenalty" className="text-gray-300">AI Penalty Weight</Label>
                      <Input
                        id="aiPenalty"
                        type="number"
                        step="0.1"
                        value={aiPenaltyWeight}
                        onChange={(e) => setAiPenaltyWeight(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Arena Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <div className="text-gray-300 font-medium">Allow in Dual Coding</div>
                      <div className="text-xs text-gray-400">Enable this question for dual coding arena</div>
                    </div>
                    <Switch checked={allowDualCoding} onCheckedChange={setAllowDualCoding} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <div className="text-gray-300 font-medium">Allow in Friendly Match</div>
                      <div className="text-xs text-gray-400">Enable for friendly matches</div>
                    </div>
                    <Switch checked={allowFriendlyMatch} onCheckedChange={setAllowFriendlyMatch} />
                  </div>

                  <div>
                    <Label htmlFor="timePerTurn" className="text-gray-300">Time Per Turn (minutes)</Label>
                    <Input
                      id="timePerTurn"
                      type="number"
                      value={timePerTurn}
                      onChange={(e) => setTimePerTurn(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Contest & Usage Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Available For</Label>
                    <Select value={availableFor} onValueChange={(v: any) => setAvailableFor(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="practice">Practice Only</SelectItem>
                        <SelectItem value="contest">Contest Only</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <div className="text-gray-300 font-medium">Lock During Contest</div>
                      <div className="text-xs text-gray-400">Prevent practice submissions during active contests</div>
                    </div>
                    <Switch checked={lockDuringContest} onCheckedChange={setLockDuringContest} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <div className="text-gray-300 font-medium">Allow Partial Scoring</div>
                      <div className="text-xs text-gray-400">Award points for partially correct solutions</div>
                    </div>
                    <Switch checked={allowPartialScoring} onCheckedChange={setAllowPartialScoring} />
                  </div>

                  <div>
                    <Label htmlFor="maxSubmissions" className="text-gray-300">Max Submissions Per User</Label>
                    <Input
                      id="maxSubmissions"
                      type="number"
                      placeholder="Leave empty for unlimited"
                      value={maxSubmissions}
                      onChange={(e) => setMaxSubmissions(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Offline Mode Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <div className="text-gray-300 font-medium">Allow Offline Usage</div>
                      <div className="text-xs text-gray-400">Enable this question for offline practice</div>
                    </div>
                    <Switch checked={allowOffline} onCheckedChange={setAllowOffline} />
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Cache Priority</Label>
                    <Select value={cachePriority} onValueChange={(v: any) => setCachePriority(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="offlineLimit" className="text-gray-300">Offline Execution Limit</Label>
                    <Input
                      id="offlineLimit"
                      type="number"
                      value={offlineExecutionLimit}
                      onChange={(e) => setOfflineExecutionLimit(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Admin Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Internal notes (not visible to users)..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={4}
                    className="bg-gray-800/50 border-gray-700 focus:border-cyan-500"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <div className="w-1/3 sticky top-24 h-fit">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-sm">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-lg font-bold text-gray-200">{title || 'Untitled Question'}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`${getDifficultyColor()} border`}>
                      {difficulty}
                    </Badge>
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {problemStatement && (
                  <div className="p-3 bg-gray-800/30 rounded-lg text-sm text-gray-300 whitespace-pre-wrap">
                    {problemStatement.substring(0, 200)}
                    {problemStatement.length > 200 && '...'}
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Test Cases:</span>
                    <span className="text-cyan-400">{testCases.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>AI Hints:</span>
                    <span className="text-cyan-400">{aiHints}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Dual Coding:</span>
                    <span className="text-cyan-400">{allowDualCoding ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Offline Mode:</span>
                    <span className="text-cyan-400">{allowOffline ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Discard Changes?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to go back? All unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onBack}
              className="bg-red-600 hover:bg-red-700"
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
