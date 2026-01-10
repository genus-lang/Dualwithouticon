import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield, User, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface LoginPageProps {
  onLogin: (userType: 'user' | 'admin', role?: 'owner' | 'dual_admin' | 'question_admin') => void;
  onNavigateHome: () => void;
}

export function LoginPage({ onLogin, onNavigateHome }: LoginPageProps) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const handleLogin = () => {
    if (isAdminMode) {
      // Mock admin authentication
      // In a real app, this would validate credentials against a backend
      if (email === 'owner@codearena.com' && password === 'owner123') {
        onLogin('admin', 'owner');
      } else if (email === 'dualadmin@codearena.com' && password === 'dual123') {
        onLogin('admin', 'dual_admin');
      } else if (email === 'questionadmin@codearena.com' && password === 'question123') {
        onLogin('admin', 'question_admin');
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      // Mock user authentication
      onLogin('user');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a0a1a] to-[#0D0D0D] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-150"></div>
      </div>

      {/* Matrix Background Effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Home Button */}
      <button
        onClick={onNavigateHome}
        className="absolute top-8 left-8 z-10 text-cyan-400 hover:text-cyan-300 transition-all group"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center transform rotate-180 relative group-hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all">
            <div className="absolute inset-[2px] bg-[#0D0D0D] flex items-center justify-center">
              <span className="text-xs font-bold text-cyan-400 transform -rotate-180">▲</span>
            </div>
          </div>
          <span className="font-semibold">CodeArena</span>
        </div>
      </button>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Admin Mode Toggle */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <Label 
              htmlFor="admin-mode" 
              className={`text-sm font-medium transition-all ${!isAdminMode ? 'text-cyan-400' : 'text-gray-500'}`}
            >
              User Login
            </Label>
            <Switch
              id="admin-mode"
              checked={isAdminMode}
              onCheckedChange={setIsAdminMode}
              className="data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-cyan-600"
            />
            <Label 
              htmlFor="admin-mode" 
              className={`text-sm font-medium transition-all ${isAdminMode ? 'text-red-400' : 'text-gray-500'}`}
            >
              Admin Login
            </Label>
          </div>

          {/* Login Card */}
          <div 
            className={`relative backdrop-blur-xl rounded-2xl p-8 shadow-2xl border transition-all duration-300 ${
              isAdminMode 
                ? 'bg-gradient-to-br from-red-950/40 to-gray-900/40 border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.3)]' 
                : 'bg-gradient-to-br from-cyan-950/20 to-purple-950/20 border-cyan-500/20 shadow-[0_0_40px_rgba(0,255,255,0.2)]'
            }`}
          >
            {/* Warning Banner for Admin Mode */}
            {isAdminMode && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-3 animate-pulse">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div className="text-xs text-red-300">
                  <div className="font-bold">Restricted Access</div>
                  <div className="text-red-400/80">Authorized Personnel Only</div>
                </div>
              </div>
            )}

            {/* Title */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isAdminMode 
                  ? 'bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
                  : 'bg-cyan-500/20 shadow-[0_0_30px_rgba(0,255,255,0.4)]'
              }`}>
                {isAdminMode ? (
                  <Shield className="w-8 h-8 text-red-400" />
                ) : (
                  <User className="w-8 h-8 text-cyan-400" />
                )}
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${
                isAdminMode ? 'text-red-400' : 'text-cyan-400'
              }`}>
                {isAdminMode ? 'Admin Core' : 'Welcome Back'}
              </h1>
              <p className="text-gray-400 text-sm">
                {isAdminMode 
                  ? 'Enter your credentials to access the command center' 
                  : 'Login to continue your coding journey'}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 text-sm">
                  {isAdminMode ? 'Admin Email' : 'Email'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={isAdminMode ? 'admin@codearena.com' : 'your@email.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-${isAdminMode ? 'red' : 'cyan'}-500 focus:ring-${isAdminMode ? 'red' : 'cyan'}-500/20`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-${isAdminMode ? 'red' : 'cyan'}-500 focus:ring-${isAdminMode ? 'red' : 'cyan'}-500/20`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Admin Key (only for admin mode) */}
              {isAdminMode && (
                <div className="space-y-2">
                  <Label htmlFor="admin-key" className="text-gray-300 text-sm">
                    Admin Key (Optional)
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="admin-key"
                      type="text"
                      placeholder="2FA / OTP"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      className="pl-10 bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
                    />
                  </div>
                </div>
              )}

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                className={`w-full font-semibold transition-all ${
                  isAdminMode
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)]'
                    : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]'
                }`}
              >
                {isAdminMode ? (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Enter Admin Core
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>

              {/* Demo Credentials */}
              {isAdminMode && (
                <div className="mt-6 p-4 bg-black/40 rounded-lg border border-gray-700">
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="font-bold text-red-400 mb-2">Demo Credentials:</div>
                    <div><span className="text-gray-500">Owner:</span> owner@codearena.com / owner123</div>
                    <div><span className="text-gray-500">Dual Admin:</span> dualadmin@codearena.com / dual123</div>
                    <div><span className="text-gray-500">Question Admin:</span> questionadmin@codearena.com / question123</div>
                  </div>
                </div>
              )}

              {/* Forgot Password */}
              {!isAdminMode && (
                <div className="text-center">
                  <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sign Up Link (only for user mode) */}
          {!isAdminMode && (
            <div className="mt-6 text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <button className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
