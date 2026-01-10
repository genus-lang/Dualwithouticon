import { useState } from 'react';
import { Shield, UserPlus, ArrowUp, ArrowDown, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface AdminManagementModuleProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
}

interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'owner' | 'dual_admin' | 'question_admin';
  lastActive: string;
}

export function AdminManagementModule({ adminRole }: AdminManagementModuleProps) {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: '1', username: 'admin_owner', email: 'owner@codearena.com', role: 'owner', lastActive: '2 min ago' },
    { id: '2', username: 'admin_dual', email: 'dualadmin@codearena.com', role: 'dual_admin', lastActive: '15 min ago' },
    { id: '3', username: 'admin_questions', email: 'questionadmin@codearena.com', role: 'question_admin', lastActive: '1 hour ago' },
  ]);

  const canManageAdmins = adminRole === 'owner' || adminRole === 'dual_admin';

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">🔴 OWNER</Badge>;
      case 'dual_admin':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">🟣 DUAL ADMIN</Badge>;
      case 'question_admin':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">🟡 QUESTION ADMIN</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">Admin Management</h1>
          <p className="text-gray-400">Manage admin roles and permissions</p>
        </div>
        {canManageAdmins && (
          <Button className="bg-red-600 hover:bg-red-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Admin
          </Button>
        )}
      </div>

      {/* Permission Notice */}
      {!canManageAdmins && (
        <Card className="bg-gradient-to-br from-yellow-950/20 to-gray-900/30 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-yellow-400">
              <Shield className="w-5 h-5" />
              <div className="text-sm">
                <div className="font-semibold">Limited Access</div>
                <div className="text-yellow-400/80">Only Owner and Dual Admin can manage other admins</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admins List */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            All Admins ({admins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {admins.map((admin) => (
              <div 
                key={admin.id}
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                        {admin.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-200 font-semibold">{admin.username}</span>
                          {getRoleBadge(admin.role)}
                        </div>
                        <div className="text-sm text-gray-400">{admin.email}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 ml-13">
                      Last active: {admin.lastActive}
                    </div>
                  </div>
                  {canManageAdmins && admin.role !== 'owner' && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:border-cyan-500"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {adminRole === 'owner' && (
                        <>
                          {admin.role === 'question_admin' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700 hover:border-green-500"
                            >
                              <ArrowUp className="w-4 h-4 mr-1" />
                              Promote
                            </Button>
                          )}
                          {admin.role === 'dual_admin' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700 hover:border-yellow-500"
                            >
                              <ArrowDown className="w-4 h-4 mr-1" />
                              Demote
                            </Button>
                          )}
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:border-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Activity Log */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-400">Recent Admin Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 bg-gray-800/30 rounded-lg text-sm">
              <span className="text-purple-400">Dual Admin</span> <span className="text-gray-400">deleted user @coderX</span> <span className="text-gray-600">• 2 min ago</span>
            </div>
            <div className="p-3 bg-gray-800/30 rounded-lg text-sm">
              <span className="text-red-400">Owner</span> <span className="text-gray-400">disabled global chat</span> <span className="text-gray-600">• 15 min ago</span>
            </div>
            <div className="p-3 bg-gray-800/30 rounded-lg text-sm">
              <span className="text-yellow-400">Question Admin</span> <span className="text-gray-400">added new question</span> <span className="text-gray-600">• 2 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
