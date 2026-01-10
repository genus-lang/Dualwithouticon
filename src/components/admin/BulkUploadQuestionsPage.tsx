import { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Download,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  Eye,
  FileJson,
  Table as TableIcon,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
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

interface BulkUploadQuestionsPageProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  onBack: () => void;
  onBulkUpload?: (uploadData: any) => void;
}

interface UploadedQuestion {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  status: 'valid' | 'invalid' | 'warning';
  errors: string[];
  rowNumber: number;
}

export function BulkUploadQuestionsPage({ adminRole, onBack, onBulkUpload }: BulkUploadQuestionsPageProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<UploadedQuestion[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Bulk configuration overrides
  const [defaultDifficulty, setDefaultDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [aiAllowed, setAiAllowed] = useState(true);
  const [arenaAllowed, setArenaAllowed] = useState(true);
  const [offlineAllowed, setOfflineAllowed] = useState(true);
  const [applyGlobalRules, setApplyGlobalRules] = useState(false);

  const canManageQuestions = adminRole === 'owner' || adminRole === 'dual_admin' || adminRole === 'question_admin';

  if (!canManageQuestions) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-gray-400">You don't have permission to upload questions.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateFileValidation(file);
    }
  };

  const simulateFileValidation = (file: File) => {
    setIsValidating(true);
    setUploadProgress(0);

    // Simulate file parsing and validation
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          // Generate mock questions with validation results
          generateMockQuestions();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateMockQuestions = () => {
    const mockQuestions: UploadedQuestion[] = [
      {
        id: '1',
        title: 'Two Sum Problem',
        difficulty: 'easy',
        tags: ['Array', 'Hash Table'],
        status: 'valid',
        errors: [],
        rowNumber: 2,
      },
      {
        id: '2',
        title: 'Maximum Subarray Sum',
        difficulty: 'medium',
        tags: ['Array', 'DP'],
        status: 'valid',
        errors: [],
        rowNumber: 3,
      },
      {
        id: '3',
        title: 'Binary Tree Traversal',
        difficulty: 'medium',
        tags: ['Tree', 'DFS'],
        status: 'warning',
        errors: ['Missing sample test case'],
        rowNumber: 4,
      },
      {
        id: '4',
        title: '',
        difficulty: 'hard',
        tags: [],
        status: 'invalid',
        errors: ['Title is required', 'No tags provided'],
        rowNumber: 5,
      },
      {
        id: '5',
        title: 'Graph Shortest Path',
        difficulty: 'hard',
        tags: ['Graph', 'Dijkstra'],
        status: 'valid',
        errors: [],
        rowNumber: 6,
      },
    ];
    setQuestions(mockQuestions);
  };

  const handleDownloadTemplate = () => {
    // In a real app, this would download an actual CSV/JSON template
    const csvContent = `title,statement,difficulty,tags,input_format,output_format,constraints,sample_input,sample_output,hidden_testcases,ai_allowed,arena_allowed,offline_allowed
"Two Sum Problem","Given an array of integers...","easy","Array,Hash Table","First line: N...","Single integer","1 ≤ N ≤ 10^5","[2,7,11,15]\\n9","[0,1]","[1,2,3]","true","true","true"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'question_template.csv';
    link.click();
  };

  const handleBulkUpload = () => {
    setShowConfirmDialog(true);
  };

  const confirmUpload = () => {
    const validQuestions = questions.filter(q => q.status === 'valid' || q.status === 'warning');
    
    onBulkUpload?.({
      questions: validQuestions,
      totalCount: questions.length,
      successCount: validQuestions.length,
      failedCount: questions.filter(q => q.status === 'invalid').length,
      globalSettings: {
        defaultDifficulty,
        aiAllowed,
        arenaAllowed,
        offlineAllowed,
        applyGlobalRules,
      },
    });
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const validCount = questions.filter(q => q.status === 'valid').length;
  const warningCount = questions.filter(q => q.status === 'warning').length;
  const invalidCount = questions.filter(q => q.status === 'invalid').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a0a1a] to-[#0D0D0D] text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] border-b border-purple-500/30 shadow-[0_4px_20px_rgba(168,85,247,0.2)] backdrop-blur-sm">
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <button onClick={onBack} className="hover:text-cyan-400 transition-colors">Admin</button>
            <span>/</span>
            <span>Question Bank</span>
            <span>/</span>
            <span className="text-purple-400">Bulk Upload</span>
          </div>

          {/* Title & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCancelDialog(true)}
                className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500 flex items-center justify-center transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                  <Upload className="w-6 h-6" />
                  Bulk Upload Questions
                </h1>
                <p className="text-sm text-gray-400">Upload hundreds of questions at once</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleDownloadTemplate}
                className="border-gray-700 hover:border-cyan-500"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
              {questions.length > 0 && (
                <Button
                  onClick={handleBulkUpload}
                  disabled={validCount === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {validCount + warningCount} Questions
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Upload Zone */}
        {!uploadedFile && (
          <Card className="bg-gradient-to-br from-purple-900/20 to-gray-900/30 border-purple-500/30">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="mb-6">
                  <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Upload Question File</h3>
                  <p className="text-gray-400">Supports CSV, JSON, and Excel formats</p>
                  <p className="text-sm text-gray-500 mt-1">Maximum 500 questions per file</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".csv,.json,.xlsx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all font-semibold">
                      Choose File
                    </div>
                  </label>

                  <div className="text-sm text-gray-400">or drag and drop here</div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FileSpreadsheet className="w-4 h-4 text-green-400" />
                    CSV
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FileJson className="w-4 h-4 text-blue-400" />
                    JSON
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <TableIcon className="w-4 h-4 text-purple-400" />
                    Excel
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Validation Progress */}
        {isValidating && (
          <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-lg font-semibold text-cyan-400">Validating Questions...</div>
                <Progress value={uploadProgress} className="h-2" />
                <div className="text-sm text-gray-400">{uploadProgress}% Complete</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Validation Results & Settings */}
        {questions.length > 0 && !isValidating && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-400">Total Questions</div>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">{questions.length}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-gray-900/30 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Valid
                  </div>
                  <div className="text-2xl font-bold text-green-400 mt-1">{validCount}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/20 to-gray-900/30 border-yellow-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    Warnings
                  </div>
                  <div className="text-2xl font-bold text-yellow-400 mt-1">{warningCount}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-900/20 to-gray-900/30 border-red-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Invalid
                  </div>
                  <div className="text-2xl font-bold text-red-400 mt-1">{invalidCount}</div>
                </CardContent>
              </Card>
            </div>

            {/* Bulk Configuration */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-400">Bulk Configuration Overrides</CardTitle>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-gray-400">Apply to all questions</Label>
                    <Switch checked={applyGlobalRules} onCheckedChange={setApplyGlobalRules} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Default Difficulty</Label>
                    <Select value={defaultDifficulty} onValueChange={(v: any) => setDefaultDifficulty(v)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <Label className="text-gray-300">AI Allowed</Label>
                    <Switch checked={aiAllowed} onCheckedChange={setAiAllowed} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <Label className="text-gray-300">Arena Allowed</Label>
                    <Switch checked={arenaAllowed} onCheckedChange={setArenaAllowed} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <Label className="text-gray-300">Offline Allowed</Label>
                    <Switch checked={offlineAllowed} onCheckedChange={setOfflineAllowed} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions Table */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
              <CardHeader>
                <CardTitle className="text-purple-400">Question Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left p-3 text-sm font-semibold text-gray-400 w-12">Row</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-400">Title</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-400">Difficulty</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-400">Tags</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-400">Status</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-400">Errors</th>
                        <th className="text-right p-3 text-sm font-semibold text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((question) => (
                        <tr 
                          key={question.id} 
                          className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-all"
                        >
                          <td className="p-3 text-gray-500 font-mono text-sm">{question.rowNumber}</td>
                          <td className="p-3">
                            <div className="text-gray-300 font-medium">{question.title || '(No title)'}</div>
                          </td>
                          <td className="p-3">
                            <Badge 
                              className={`${
                                question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                'bg-red-500/20 text-red-400 border-red-500/30'
                              } border capitalize`}
                            >
                              {question.difficulty}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {question.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {question.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{question.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            {question.status === 'valid' && (
                              <div className="flex items-center gap-1 text-green-400">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm">Valid</span>
                              </div>
                            )}
                            {question.status === 'warning' && (
                              <div className="flex items-center gap-1 text-yellow-400">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm">Warning</span>
                              </div>
                            )}
                            {question.status === 'invalid' && (
                              <div className="flex items-center gap-1 text-red-400">
                                <XCircle className="w-4 h-4" />
                                <span className="text-sm">Invalid</span>
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            {question.errors.length > 0 && (
                              <div className="text-xs text-gray-400">
                                {question.errors[0]}
                                {question.errors.length > 1 && (
                                  <span className="text-gray-500"> +{question.errors.length - 1} more</span>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-2">
                              <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => removeQuestion(question.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Cancel Upload?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to cancel? All uploaded data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700">Continue Editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={onBack}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel Upload
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Upload Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-purple-400">Confirm Bulk Upload</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 space-y-2">
              <p>You are about to upload:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li className="text-green-400">{validCount} valid questions</li>
                {warningCount > 0 && <li className="text-yellow-400">{warningCount} questions with warnings</li>}
                {invalidCount > 0 && <li className="text-red-400">{invalidCount} invalid questions (will be skipped)</li>}
              </ul>
              <p className="mt-3">This action cannot be undone. Continue?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmUpload}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            >
              Upload Questions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
