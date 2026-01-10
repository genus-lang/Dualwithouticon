import { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  FileText,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface QuestionBankModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  onNavigateToAddQuestion?: () => void;
  onNavigateToBulkUpload?: () => void;
}

interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  enabled: boolean;
  testCases: number;
  submissions: number;
}

export function QuestionBankModule({ adminRole, onNavigateToAddQuestion, onNavigateToBulkUpload }: QuestionBankModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock question data
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], enabled: true, testCases: 12, submissions: 1523 },
    { id: '2', title: 'Binary Tree Traversal', difficulty: 'Medium', tags: ['Tree', 'DFS'], enabled: true, testCases: 8, submissions: 876 },
    { id: '3', title: 'Merge Sort Implementation', difficulty: 'Medium', tags: ['Sorting', 'Recursion'], enabled: true, testCases: 15, submissions: 654 },
    { id: '4', title: 'Graph Cycle Detection', difficulty: 'Hard', tags: ['Graph', 'DFS'], enabled: false, testCases: 20, submissions: 234 },
    { id: '5', title: 'Dynamic Programming - Knapsack', difficulty: 'Hard', tags: ['DP', 'Optimization'], enabled: true, testCases: 18, submissions: 445 },
  ]);

  const filteredQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleQuestion = (id: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, enabled: !q.enabled } : q
    ));
  };

  const deleteQuestion = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">Question Bank Control</h1>
          <p className="text-gray-400">Manage coding problems and test cases</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={onNavigateToBulkUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={onNavigateToAddQuestion}>
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-950/20 to-gray-900/30 border-green-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{questions.filter(q => q.difficulty === 'Easy').length}</div>
            <div className="text-sm text-gray-400">Easy Questions</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-950/20 to-gray-900/30 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">{questions.filter(q => q.difficulty === 'Medium').length}</div>
            <div className="text-sm text-gray-400">Medium Questions</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-950/20 to-gray-900/30 border-red-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">{questions.filter(q => q.difficulty === 'Hard').length}</div>
            <div className="text-sm text-gray-400">Hard Questions</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-950/20 to-gray-900/30 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-cyan-400">{questions.filter(q => q.enabled).length}</div>
            <div className="text-sm text-gray-400">Active Questions</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search questions by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400">
            Questions ({filteredQuestions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredQuestions.map((question) => (
              <div 
                key={question.id}
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-200 font-semibold">{question.title}</h3>
                      <Badge 
                        className={`
                          ${question.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                          ${question.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}
                          ${question.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                        `}
                      >
                        {question.difficulty}
                      </Badge>
                      <Badge className={`${question.enabled ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                        {question.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        {question.tags.join(', ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {question.testCases} test cases
                      </div>
                      <div>
                        {question.submissions} submissions
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:border-cyan-500"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleQuestion(question.id)}
                      className={`border-gray-700 ${question.enabled ? 'hover:border-yellow-500' : 'hover:border-green-500'}`}
                    >
                      {question.enabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteQuestion(question.id)}
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
    </div>
  );
}