import { useState } from 'react';
import { Navbar } from './Navbar';
import { 
  ChevronRight, Camera, Mail, Phone, MapPin, 
  Code2, Globe, Lock, Shield, Save, X, CheckCircle,
  AlertTriangle, User, Github, Linkedin, Eye, Building
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
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Alex');
  const [username] = useState('code_master'); // Read-only
  const [fullName, setFullName] = useState('Alex Chen');
  const [bio, setBio] = useState('Full Stack Developer | Competitive Programmer | Open Source Contributor');

  // Account Details
  const [email, setEmail] = useState('alex.chen@email.com');
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [location, setLocation] = useState('San Francisco, CA');
  const [company, setCompany] = useState('Tech Corp');

  // Social Links
  const [githubUrl, setGithubUrl] = useState('https://github.com/alexchen');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alexchen');
  const [websiteUrl, setWebsiteUrl] = useState('https://alexchen.dev');

  // Platform Visibility
  const [showGithubPublic, setShowGithubPublic] = useState(true);
  const [showLinkedinPublic, setShowLinkedinPublic] = useState(true);
  const [showWebsitePublic, setShowWebsitePublic] = useState(true);

  // Privacy Settings
  const [showContestHistory, setShowContestHistory] = useState(true);
  const [showActivityPublic, setShowActivityPublic] = useState(true);
  const [showStatsPublic, setShowStatsPublic] = useState(true);
  const [showBadgesPublic, setShowBadgesPublic] = useState(true);

  // Preferences
  const [defaultLanguage, setDefaultLanguage] = useState('cpp');
  const [timezone, setTimezone] = useState('america_los_angeles');

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
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

    // Validate passwords if changing
    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        alert('Please enter your current password');
        setIsSaving(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        setIsSaving(false);
        return;
      }
      if (newPassword.length < 8) {
        alert('Password must be at least 8 characters');
        setIsSaving(false);
        return;
      }
    }

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSaving(false);
    setSaveSuccess(true);
    setHasChanges(false);

    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
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
    <div className="min-h-screen bg-[#1a1a1a] pt-16">
      <Navbar {...navigationProps} />
      
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <button 
              onClick={navigationProps.onHome}
              className="text-gray-400 hover:text-white"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <button 
              onClick={navigationProps.onProfile}
              className="text-gray-400 hover:text-white"
            >
              Profile
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Edit Profile</span>
          </div>
          
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl text-white" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
              Edit Profile
            </h1>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="bg-transparent text-gray-400 border-gray-600 hover:bg-gray-700 hover:text-white"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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

        {/* Save Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 bg-green-500/10 border-green-500/30">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <AlertDescription className="text-green-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Profile Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-[#262626] border-[#3a3a3a] sticky top-20">
              <CardHeader>
                <CardTitle className="text-white text-base" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Profile Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatar} />
                      <AvatarFallback className="bg-gray-600 text-white text-2xl">
                        {username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <Button
                      size="sm"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* User Info */}
                  <h2 className="text-white text-lg mb-1" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                    {fullName}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    @{username}
                  </p>
                  
                  {/* Bio Preview */}
                  {bio && (
                    <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {bio}
                    </p>
                  )}

                  {/* Contact Info Preview */}
                  <div className="w-full space-y-2 text-left">
                    {location && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span style={{ fontFamily: 'system-ui, sans-serif' }}>{location}</span>
                      </div>
                    )}
                    {company && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Building className="w-4 h-4" />
                        <span style={{ fontFamily: 'system-ui, sans-serif' }}>{company}</span>
                      </div>
                    )}
                    {email && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span style={{ fontFamily: 'system-ui, sans-serif' }} className="truncate">{email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - Edit Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-base" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <User className="w-4 h-4 text-green-500" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Username (Read-only) */}
                <div>
                  <Label className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Username
                  </Label>
                  <Input
                    value={username}
                    disabled
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-gray-500 cursor-not-allowed"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Username cannot be changed
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <Label htmlFor="fullname" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); handleChange(); }}
                    placeholder="Enter your full name"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => { 
                      if (e.target.value.length <= 200) {
                        setBio(e.target.value); 
                        handleChange(); 
                      }
                    }}
                    placeholder="Tell us about yourself..."
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white min-h-[100px] focus:border-green-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {bio.length} / 200 characters
                  </p>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); handleChange(); }}
                    placeholder="City, Country"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Company */}
                <div>
                  <Label htmlFor="company" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => { setCompany(e.target.value); handleChange(); }}
                    placeholder="Your company"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-base" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <Mail className="w-4 h-4 text-green-500" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Email Address
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); handleChange(); setIsEmailVerified(false); }}
                      placeholder="your@email.com"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500 flex-1"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                    <Badge className={isEmailVerified ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}>
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
                    <p className="text-xs text-yellow-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Email verification required after change
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-white mb-2 flex items-center gap-2 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Phone Number
                    <span className="text-xs text-gray-500">(Optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); handleChange(); }}
                    placeholder="+1 234 567 8900"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-base" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <Globe className="w-4 h-4 text-green-500" />
                  Social Links
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Connect your social profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* GitHub */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="github" className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      GitHub Profile
                    </Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={showGithubPublic}
                        onCheckedChange={(checked) => { setShowGithubPublic(checked); handleChange(); }}
                      />
                      <span className="text-xs text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Public
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#1a1a1a] border border-[#3a3a3a] rounded">
                      <Github className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input
                      id="github"
                      value={githubUrl}
                      onChange={(e) => { setGithubUrl(e.target.value); handleChange(); }}
                      placeholder="https://github.com/username"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500 flex-1"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="linkedin" className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      LinkedIn Profile
                    </Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={showLinkedinPublic}
                        onCheckedChange={(checked) => { setShowLinkedinPublic(checked); handleChange(); }}
                      />
                      <span className="text-xs text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Public
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#1a1a1a] border border-[#3a3a3a] rounded">
                      <Linkedin className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input
                      id="linkedin"
                      value={linkedinUrl}
                      onChange={(e) => { setLinkedinUrl(e.target.value); handleChange(); }}
                      placeholder="https://linkedin.com/in/username"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500 flex-1"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="website" className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Personal Website
                    </Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={showWebsitePublic}
                        onCheckedChange={(checked) => { setShowWebsitePublic(checked); handleChange(); }}
                      />
                      <span className="text-xs text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Public
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#1a1a1a] border border-[#3a3a3a] rounded">
                      <Globe className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input
                      id="website"
                      value={websiteUrl}
                      onChange={(e) => { setWebsiteUrl(e.target.value); handleChange(); }}
                      placeholder="https://yourwebsite.com"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500 flex-1"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Visibility */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-base" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <Eye className="w-4 h-4 text-green-500" />
                  Privacy & Visibility
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Control what others can see on your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Show Contest History
                    </Label>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Display your contest participation and ranks
                    </p>
                  </div>
                  <Switch
                    checked={showContestHistory}
                    onCheckedChange={(checked) => { setShowContestHistory(checked); handleChange(); }}
                  />
                </div>

                <Separator className="bg-[#3a3a3a]" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Show Activity & Heatmap
                    </Label>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Display your coding activity calendar
                    </p>
                  </div>
                  <Switch
                    checked={showActivityPublic}
                    onCheckedChange={(checked) => { setShowActivityPublic(checked); handleChange(); }}
                  />
                </div>

                <Separator className="bg-[#3a3a3a]" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Show Problem Stats
                    </Label>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Display solved problems and difficulty breakdown
                    </p>
                  </div>
                  <Switch
                    checked={showStatsPublic}
                    onCheckedChange={(checked) => { setShowStatsPublic(checked); handleChange(); }}
                  />
                </div>

                <Separator className="bg-[#3a3a3a]" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Show Badges
                    </Label>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Display your earned badges and achievements
                    </p>
                  </div>
                  <Switch
                    checked={showBadgesPublic}
                    onCheckedChange={(checked) => { setShowBadgesPublic(checked); handleChange(); }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-base" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <Code2 className="w-4 h-4 text-green-500" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Default Language */}
                <div>
                  <Label htmlFor="language" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Default Coding Language
                  </Label>
                  <Select value={defaultLanguage} onValueChange={(value) => { setDefaultLanguage(value); handleChange(); }}>
                    <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#262626] border-[#3a3a3a]">
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timezone */}
                <div>
                  <Label htmlFor="timezone" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Timezone
                  </Label>
                  <Select value={timezone} onValueChange={(value) => { setTimezone(value); handleChange(); }}>
                    <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#262626] border-[#3a3a3a]">
                      <SelectItem value="america_los_angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="america_new_york">Eastern Time (ET)</SelectItem>
                      <SelectItem value="europe_london">London (GMT)</SelectItem>
                      <SelectItem value="asia_kolkata">India (IST)</SelectItem>
                      <SelectItem value="asia_tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Security - Change Password */}
            <Card className="bg-[#262626] border-[#3a3a3a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-base" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <Shield className="w-4 h-4 text-green-500" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Password */}
                <div>
                  <Label htmlFor="current-password" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => { setCurrentPassword(e.target.value); handleChange(); }}
                      placeholder="Enter current password"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500 pr-10"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <Label htmlFor="new-password" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); handleChange(); }}
                      placeholder="Enter new password"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500 pr-10"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Must be at least 8 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirm-password" className="text-white mb-2 block text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); handleChange(); }}
                      placeholder="Confirm new password"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-green-500 pr-10"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Passwords do not match
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fixed Bottom Action Bar (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#262626] border-t border-[#3a3a3a] p-4 lg:hidden">
          <div className="flex gap-2 max-w-[1200px] mx-auto">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 bg-transparent text-gray-400 border-gray-600 hover:bg-gray-700 hover:text-white"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="flex-1 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Spacing for fixed bottom bar on mobile */}
        <div className="h-20 lg:hidden" />
      </div>
    </div>
  );
}
