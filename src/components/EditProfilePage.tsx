import { useState } from 'react';
import { Navbar } from './Navbar';
import { 
  ChevronRight, ChevronLeft, Camera, Mail, Phone, MapPin, 
  Code2, ExternalLink, Eye, EyeOff, Globe, Lock, Shield,
  Brain, LogOut, Trash2, Save, RotateCw, RotateCcw, X, CheckCircle,
  AlertTriangle, User
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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

interface EditProfilePageProps {
  navigationProps: NavigationProps;
  isAdmin?: boolean;
}

export function EditProfilePage({ navigationProps, isAdmin = false }: EditProfilePageProps) {
  // Form State
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Basic Information
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=meghram');
  const [username] = useState('@meghram_meena'); // Read-only
  const [fullName, setFullName] = useState('Meghram Meena');
  const [bio, setBio] = useState('Passionate coder | Competitive programmer | Open source contributor');

  // Account Details
  const [email, setEmail] = useState('meghram@example.com');
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [country, setCountry] = useState('india');
  const [city, setCity] = useState('Jaipur');

  // External Platform Links
  const [codeforcesHandle, setCodeforcesHandle] = useState('meghram_cf');
  const [leetcodeHandle, setLeetcodeHandle] = useState('meghram');
  const [codechefHandle, setCodechefHandle] = useState('meghram_iiit');
  const [githubUrl, setGithubUrl] = useState('https://github.com/meghram');

  // Platform Visibility
  const [showCodeforcesPublic, setShowCodeforcesPublic] = useState(true);
  const [showLeetcodePublic, setShowLeetcodePublic] = useState(true);
  const [showCodechefPublic, setShowCodechefPublic] = useState(true);
  const [showGithubPublic, setShowGithubPublic] = useState(true);

  // Privacy Settings
  const [showContestHistory, setShowContestHistory] = useState(true);
  const [showStreakPublic, setShowStreakPublic] = useState(true);
  const [showExternalRatings, setShowExternalRatings] = useState(true);
  const [showAchievements, setShowAchievements] = useState(true);

  // Preferences
  const [defaultLanguage, setDefaultLanguage] = useState('cpp');
  const [timezone, setTimezone] = useState('asia_kolkata');
  const [dateFormat, setDateFormat] = useState('dd-mm-yyyy');
  const [showRankPublic, setShowRankPublic] = useState(true);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // AI Preferences
  const [allowAiAnalysis, setAllowAiAnalysis] = useState(true);
  const [allowAiInsights, setAllowAiInsights] = useState(true);
  const [allowDataUsage, setAllowDataUsage] = useState(true);

  // Active Sessions
  const activeSessions = [
    { id: '1', device: 'Chrome on Windows', location: 'Jaipur, India', lastActive: '2 mins ago', current: true },
    { id: '2', device: 'Safari on iPhone', location: 'Jaipur, India', lastActive: '2 hours ago', current: false },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG and PNG files are supported');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
          setHasChanges(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSaving(false);
    setSaveSuccess(true);
    setHasChanges(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to discard all changes?')) {
      // Reset to original values
      window.location.reload();
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigationProps.onProfile?.();
      }
    } else {
      navigationProps.onProfile?.();
    }
  };

  const handleChange = () => {
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Navbar {...navigationProps} />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto pb-24">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <button 
              onClick={navigationProps.onHome}
              className="text-[#00FFFF] hover:underline"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <button 
              onClick={navigationProps.onProfile}
              className="text-[#00FFFF] hover:underline"
            >
              Profile
            </button>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-white/60">Edit</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <h1 className="text-3xl text-white flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
                ✏️ Edit Profile
              </h1>
            </div>
            
            <Button
              variant="outline"
              onClick={handleCancel}
              className="border-white/20 text-white/60 hover:bg-white/5"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>

        {/* Save Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 bg-green-500/10 border-green-500/30">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <AlertDescription className="text-green-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Basic Profile Information */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <User className="w-5 h-5 text-[#00FFFF]" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div>
              <Label className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Profile Photo
              </Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-24 h-24 border-2 border-[#00FFFF]">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-[#00FFFF]/20 text-[#00FFFF] text-2xl">
                    {username.charAt(1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/jpeg,image/png"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                    className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-white/50 mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    JPG or PNG • Max 2MB • Square crop
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Username (Read-only) */}
            <div>
              <Label className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Username
              </Label>
              <Input
                value={username}
                disabled
                className="bg-[#0A0F1C]/50 border-white/10 text-white/60 cursor-not-allowed"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
              <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Usernames cannot be changed.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <Label htmlFor="fullname" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Full Name
              </Label>
              <Input
                id="fullname"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); handleChange(); }}
                placeholder="Enter your full name"
                className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Bio
              </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => { 
                  if (e.target.value.length <= 160) {
                    setBio(e.target.value); 
                    handleChange(); 
                  }
                }}
                placeholder="Tell us about yourself..."
                className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white min-h-[100px]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
              <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {bio.length} / 160 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account & Identity */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Lock className="w-5 h-5 text-[#00FFFF]" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Email Address
              </Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); handleChange(); setIsEmailVerified(false); }}
                    placeholder="your@email.com"
                    className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>
                <Badge className={isEmailVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                  {isEmailVerified ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Unverified
                    </>
                  )}
                </Badge>
              </div>
              {!isEmailVerified && (
                <p className="text-xs text-yellow-500 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Email verification required after change.
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-white mb-2 flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Phone Number
                <span className="text-xs text-white/50">(Optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); handleChange(); }}
                placeholder="+1 234 567 8900"
                className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
              <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Used for account recovery.
              </p>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country" className="text-white mb-2 flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Country
                  <span className="text-xs text-white/50">(Optional)</span>
                </Label>
                <Select value={country} onValueChange={(value) => { setCountry(value); handleChange(); }}>
                  <SelectTrigger className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/30">
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city" className="text-white mb-2 flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  City
                  <span className="text-xs text-white/50">(Optional)</span>
                </Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => { setCity(e.target.value); handleChange(); }}
                  placeholder="Your city"
                  className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Coding Platform Links */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Globe className="w-5 h-5 text-[#00FFFF]" />
              Coding Platform Profiles
            </CardTitle>
            <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Used for profile ratings, AI insights, and external rating sync.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Codeforces */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="codeforces" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Codeforces Handle
                </Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showCodeforcesPublic}
                    onCheckedChange={(checked) => { setShowCodeforcesPublic(checked); handleChange(); }}
                  />
                  <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Public
                  </span>
                </div>
              </div>
              <Input
                id="codeforces"
                value={codeforcesHandle}
                onChange={(e) => { setCodeforcesHandle(e.target.value); handleChange(); }}
                placeholder="your_handle"
                className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* LeetCode */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="leetcode" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  LeetCode Username
                </Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showLeetcodePublic}
                    onCheckedChange={(checked) => { setShowLeetcodePublic(checked); handleChange(); }}
                  />
                  <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Public
                  </span>
                </div>
              </div>
              <Input
                id="leetcode"
                value={leetcodeHandle}
                onChange={(e) => { setLeetcodeHandle(e.target.value); handleChange(); }}
                placeholder="your_username"
                className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* CodeChef */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="codechef" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  CodeChef Username
                </Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showCodechefPublic}
                    onCheckedChange={(checked) => { setShowCodechefPublic(checked); handleChange(); }}
                  />
                  <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Public
                  </span>
                </div>
              </div>
              <Input
                id="codechef"
                value={codechefHandle}
                onChange={(e) => { setCodechefHandle(e.target.value); handleChange(); }}
                placeholder="your_username"
                className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* GitHub */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="github" className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  GitHub Profile URL
                </Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showGithubPublic}
                    onCheckedChange={(checked) => { setShowGithubPublic(checked); handleChange(); }}
                  />
                  <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Public
                  </span>
                </div>
              </div>
              <Input
                id="github"
                value={githubUrl}
                onChange={(e) => { setGithubUrl(e.target.value); handleChange(); }}
                placeholder="https://github.com/username"
                className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Visibility */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Eye className="w-5 h-5 text-[#00FFFF]" />
              Privacy & Visibility
            </CardTitle>
            <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              These settings affect what other users can see on your public profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Show Contest History
                </Label>
                <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Display your contest participation and ranks publicly
                </p>
              </div>
              <Switch
                checked={showContestHistory}
                onCheckedChange={(checked) => { setShowContestHistory(checked); handleChange(); }}
              />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Show Streak & Consistency
                </Label>
                <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Display your current and longest streaks
                </p>
              </div>
              <Switch
                checked={showStreakPublic}
                onCheckedChange={(checked) => { setShowStreakPublic(checked); handleChange(); }}
              />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Show External Ratings
                </Label>
                <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Display ratings from Codeforces, LeetCode, CodeChef
                </p>
              </div>
              <Switch
                checked={showExternalRatings}
                onCheckedChange={(checked) => { setShowExternalRatings(checked); handleChange(); }}
              />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Show Achievements
                </Label>
                <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Display your unlocked badges and achievements
                </p>
              </div>
              <Switch
                checked={showAchievements}
                onCheckedChange={(checked) => { setShowAchievements(checked); handleChange(); }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences & Platform Settings */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Code2 className="w-5 h-5 text-[#00FFFF]" />
              Preferences
            </CardTitle>
            <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Applied across contests, matches, and rooms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default Coding Language */}
            <div>
              <Label htmlFor="language" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Default Coding Language
              </Label>
              <Select value={defaultLanguage} onValueChange={(value) => { setDefaultLanguage(value); handleChange(); }}>
                <SelectTrigger className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/30">
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timezone */}
            <div>
              <Label htmlFor="timezone" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Timezone
              </Label>
              <Select value={timezone} onValueChange={(value) => { setTimezone(value); handleChange(); }}>
                <SelectTrigger className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/30">
                  <SelectItem value="asia_kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="america_new_york">America/New York (EST)</SelectItem>
                  <SelectItem value="europe_london">Europe/London (GMT)</SelectItem>
                  <SelectItem value="asia_tokyo">Asia/Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Format */}
            <div>
              <Label htmlFor="dateformat" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Date & Time Format
              </Label>
              <Select value={dateFormat} onValueChange={(value) => { setDateFormat(value); handleChange(); }}>
                <SelectTrigger className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/30">
                  <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Leaderboard Visibility */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Show Rank on Leaderboard
                </Label>
                <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Make your ranking visible to other users
                </p>
              </div>
              <Switch
                checked={showRankPublic}
                onCheckedChange={(checked) => { setShowRankPublic(checked); handleChange(); }}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI & Data Usage */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Brain className="w-5 h-5 text-purple-500" />
              AI & Data Usage
            </CardTitle>
            <CardDescription style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Disabling this may limit AI insights on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Allow AI Performance Analysis
              </Label>
              <Switch
                checked={allowAiAnalysis}
                onCheckedChange={(checked) => { setAllowAiAnalysis(checked); handleChange(); }}
              />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Allow AI-Generated Insights
              </Label>
              <Switch
                checked={allowAiInsights}
                onCheckedChange={(checked) => { setAllowAiInsights(checked); handleChange(); }}
              />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <Label className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Allow Data Usage for Recommendations
              </Label>
              <Switch
                checked={allowDataUsage}
                onCheckedChange={(checked) => { setAllowDataUsage(checked); handleChange(); }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-[#1A1A1A]/80 border-[#00FFFF]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Shield className="w-5 h-5 text-[#00FFFF]" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Change Password */}
            <div>
              <h4 className="text-white mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                Change Password
              </h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                <div>
                  <Label htmlFor="new-password" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password" className="text-white mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-[#0A0F1C] border-[#00FFFF]/30 text-white"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  />
                </div>

                <Button
                  variant="outline"
                  disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                  className="border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10 disabled:opacity-50"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Update Password
                </Button>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Active Sessions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                  Active Sessions
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout All
                </Button>
              </div>

              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0A0F1C]/50 border border-white/10"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {session.device}
                        </p>
                        {session.current && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-white/50 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:bg-red-500/10"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Account Deletion */}
            <div>
              <h4 className="text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                Account Deletion
              </h4>
              <Alert className="bg-red-500/5 border-red-500/30 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <AlertDescription className="text-red-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Account deletion is permanent and cannot be undone.
                </AlertDescription>
              </Alert>
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Request Account Deletion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A]/95 border-t border-[#00FFFF]/20 backdrop-blur-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge className="bg-yellow-500/20 text-yellow-400">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={!hasChanges}
              className="border-white/20 text-white/60 hover:bg-white/5 disabled:opacity-50"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/40 hover:bg-[#00FFFF]/30 disabled:opacity-50"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {isSaving ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
