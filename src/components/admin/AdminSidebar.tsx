import { 
  LayoutDashboard, 
  Users, 
  FileQuestion, 
  Swords, 
  Trophy, 
  MessageSquare, 
  Radio, 
  Shield, 
  Settings, 
  ScrollText,
  Lock
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type AdminModule = 
  | 'dashboard' 
  | 'users' 
  | 'questions' 
  | 'dual-coding' 
  | 'contests' 
  | 'chat' 
  | 'streaming' 
  | 'admins' 
  | 'settings' 
  | 'logs';

interface AdminSidebarProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  activeModule: AdminModule;
  onModuleChange: (module: AdminModule) => void;
}

export function AdminSidebar({ adminRole, activeModule, onModuleChange }: AdminSidebarProps) {
  const canAccess = (module: AdminModule): boolean => {
    if (adminRole === 'owner') return true;
    if (adminRole === 'dual_admin') {
      // Dual admin has access to everything except some owner-only settings
      return true;
    }
    if (adminRole === 'question_admin') {
      // Question admin only has access to questions
      return module === 'questions' || module === 'dashboard';
    }
    return false;
  };

  const modules = [
    { id: 'dashboard' as AdminModule, icon: LayoutDashboard, label: 'Dashboard', color: 'cyan' },
    { id: 'users' as AdminModule, icon: Users, label: 'Users', color: 'blue' },
    { id: 'questions' as AdminModule, icon: FileQuestion, label: 'Questions', color: 'green' },
    { id: 'dual-coding' as AdminModule, icon: Swords, label: 'Dual Coding', color: 'purple' },
    { id: 'contests' as AdminModule, icon: Trophy, label: 'Contests', color: 'yellow' },
    { id: 'chat' as AdminModule, icon: MessageSquare, label: 'Chat', color: 'pink' },
    { id: 'streaming' as AdminModule, icon: Radio, label: 'Streaming', color: 'red' },
    { id: 'admins' as AdminModule, icon: Shield, label: 'Admins', color: 'red', ownerOnly: true },
    { id: 'settings' as AdminModule, icon: Settings, label: 'Settings', color: 'gray' },
    { id: 'logs' as AdminModule, icon: ScrollText, label: 'Logs', color: 'orange' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#0a0a0a] to-[#0D0D0D] border-r border-gray-800 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
          Admin Modules
        </div>

        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          const hasAccess = canAccess(module.id);
          const isOwnerOnly = module.ownerOnly && adminRole !== 'owner';

          return (
            <TooltipProvider key={module.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => hasAccess && onModuleChange(module.id)}
                    disabled={!hasAccess}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                      ${isActive 
                        ? `bg-gradient-to-r from-${module.color}-600/20 to-${module.color}-700/20 border border-${module.color}-500/30 shadow-[0_0_15px_rgba(0,255,255,0.3)] text-${module.color}-400` 
                        : hasAccess
                          ? 'hover:bg-gray-800/50 text-gray-400 hover:text-gray-300'
                          : 'opacity-40 cursor-not-allowed text-gray-600'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{module.label}</span>
                    {isOwnerOnly && (
                      <Lock className="w-3 h-3 ml-auto text-red-500" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {!hasAccess ? (
                    <p className="text-red-400">Access Denied - Insufficient Permissions</p>
                  ) : isOwnerOnly ? (
                    <p className="text-yellow-400">🔒 Owner Only</p>
                  ) : (
                    <p>{module.label}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
