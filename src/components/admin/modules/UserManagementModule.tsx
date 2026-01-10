import { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Ban, 
  UserX, 
  Eye, 
  MoreVertical,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';

interface UserManagementModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

interface User {
  id: string;
  username: string;
  email: string;
  joinDate: string;
  status: 'active' | 'blocked' | 'shadow-banned';
  rating: number;
  matchesPlayed: number;
}

export function UserManagementModule({ adminRole }: UserManagementModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Mock user data
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'coderX', email: 'coderx@email.com', joinDate: '2024-01-15', status: 'active', rating: 1523, matchesPlayed: 47 },
    { id: '2', username: 'devGuru', email: 'devguru@email.com', joinDate: '2024-02-20', status: 'active', rating: 1876, matchesPlayed: 89 },
    { id: '3', username: 'hackMaster', email: 'hackmaster@email.com', joinDate: '2024-03-10', status: 'blocked', rating: 1234, matchesPlayed: 23 },
    { id: '4', username: 'bugSlayer', email: 'bugslayer@email.com', joinDate: '2024-01-28', status: 'active', rating: 1654, matchesPlayed: 56 },
    { id: '5', username: 'codeNinja', email: 'codeninja@email.com', joinDate: '2024-04-05', status: 'shadow-banned', rating: 1445, matchesPlayed: 34 },
  ]);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleBlockUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' as const } : u
    ));
  };

  const handleShadowBan = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'shadow-banned' ? 'active' : 'shadow-banned' as const } : u
    ));
  };

  const canManageUsers = adminRole === 'owner' || adminRole === 'dual_admin';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">User Management</h1>
        <p className="text-gray-400">View and manage all platform users</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-500"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-700 hover:border-cyan-500">
                Filter
              </Button>
              <Button variant="outline" className="border-gray-700 hover:border-cyan-500">
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400">
            All Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-3 text-sm font-semibold text-gray-400">Username</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-400">Email</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-400">Join Date</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-400">Rating</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-400">Matches</th>
                  <th className="text-right p-3 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-all"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs">
                          {user.username[0].toUpperCase()}
                        </div>
                        <span className="text-gray-300 font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400 text-sm">{user.email}</td>
                    <td className="p-3 text-gray-400 text-sm">{user.joinDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        user.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {user.status === 'shadow-banned' ? 'Shadow Banned' : user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3 text-gray-300 font-mono">{user.rating}</td>
                    <td className="p-3 text-gray-400">{user.matchesPlayed}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        {canManageUsers ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="hover:bg-gray-700"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                              <DropdownMenuItem className="text-cyan-400 focus:bg-cyan-500/10 focus:text-cyan-400">
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-700" />
                              <DropdownMenuItem 
                                onClick={() => handleBlockUser(user.id)}
                                className="text-yellow-400 focus:bg-yellow-500/10 focus:text-yellow-400"
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                {user.status === 'blocked' ? 'Unblock' : 'Block'} User
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleShadowBan(user.id)}
                                className="text-orange-400 focus:bg-orange-500/10 focus:text-orange-400"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                {user.status === 'shadow-banned' ? 'Remove Shadow Ban' : 'Shadow Ban'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-700" />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteUser(user)}
                                className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="hover:bg-gray-700"
                            disabled
                          >
                            <Shield className="w-4 h-4 text-gray-600" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-red-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Delete User - Permanent Action
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to permanently delete user <span className="text-white font-semibold">@{selectedUser?.username}</span>?
              <br /><br />
              This action cannot be undone and will:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Remove all user data</li>
                <li>Delete match history</li>
                <li>Remove community posts</li>
                <li>Invalidate all sessions</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
