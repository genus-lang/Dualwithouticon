import { AlertTriangle, LogOut, Shield, Activity, Zap, Radio } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface AdminTopBarProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  onLogout: () => void;
  onEmergencyLockdown?: () => void;
}

export function AdminTopBar({ adminRole, onLogout, onEmergencyLockdown }: AdminTopBarProps) {
  const getRoleBadge = () => {
    switch (adminRole) {
      case 'owner':
        return (
          <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 rounded-md text-xs font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            🔴 OWNER
          </div>
        );
      case 'dual_admin':
        return (
          <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-md text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            🟣 DUAL ADMIN
          </div>
        );
      case 'question_admin':
        return (
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-md text-xs font-bold shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            🟡 QUESTION ADMIN
          </div>
        );
    }
  };

  return (
    <div className="h-16 bg-gradient-to-r from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] border-b border-red-500/30 shadow-[0_4px_20px_rgba(239,68,68,0.2)] sticky top-0 z-50 backdrop-blur-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center transform rotate-180 relative shadow-[0_0_20px_rgba(239,68,68,0.6)]">
              <div className="absolute inset-[2px] bg-[#0D0D0D] flex items-center justify-center">
                <span className="text-sm font-bold text-red-400 transform -rotate-180">▲</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-red-400">CodeArena</div>
              <div className="text-xs text-gray-500">:: ADMIN CORE</div>
            </div>
          </div>

          {/* Live System Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-500/30 rounded-md">
            <div className="relative">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-xs font-semibold text-red-400">LIVE SYSTEM</span>
          </div>
        </div>

        {/* Center Section - System Status */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Role Badge */}
          {getRoleBadge()}

          {/* Status Indicators */}
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Activity className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 font-medium">Servers</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>All servers operational</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Zap className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 font-medium">AI</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI systems online</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Radio className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Streaming</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Streaming limited capacity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Activity className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-red-400 font-medium">Chat</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chat currently disabled</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Admin Profile */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] transition-all">
                  {adminRole === 'owner' ? 'OW' : adminRole === 'dual_admin' ? 'DA' : 'QA'}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Admin Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Emergency Lockdown (Owner Only) */}
          {adminRole === 'owner' && onEmergencyLockdown && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onEmergencyLockdown}
                    className="h-8 rounded-md gap-1.5 px-3 inline-flex items-center justify-center text-sm font-medium transition-all bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span className="hidden xl:inline">Emergency</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-red-900 border-red-500">
                  <p className="font-bold">🚨 Emergency Lockdown</p>
                  <p className="text-xs">Freeze all platform activity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Logout */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onLogout}
                  className="h-8 rounded-md gap-1.5 px-3 inline-flex items-center justify-center text-sm font-medium transition-all border border-gray-700 bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-cyan-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exit Admin Core</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}