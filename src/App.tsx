import { useState, useEffect } from 'react';
import { CreateRoomPage } from './components/CreateRoomPage';
import { JoinRoomPage } from './components/JoinRoomPage';
import { WaitingRoomPage } from './components/WaitingRoomPage';
import { ContestResultPage } from './components/ContestResultPage';
import { EditProfilePage } from './components/EditProfilePage';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ArenaPage } from './components/ArenaPage';
import { MatchPage } from './components/MatchPage';
import { ProblemSetPage } from './components/ProblemSetPage';
import { ProfilePage } from './components/ProfilePage';
import { AnnouncementPage } from './components/AnnouncementPage';
import { CommunityPage } from './components/CommunityPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ContestPage } from './components/ContestPage';
import { BlogPage } from './components/BlogPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { DocumentationPage } from './components/DocumentationPage';
import { SupportPage } from './components/SupportPage';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ActivitySection } from './components/ActivitySection';
import { AIAssistantSection } from './components/AIAssistantSection';
import { CommunitySection } from './components/CommunitySection';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import './styles/globals.css';

type PageType = 
  | 'home' 
  | 'arena' 
  | 'match' 
  | 'questions' 
  | 'profile' 
  | 'editprofile'
  | 'announcements' 
  | 'community' 
  | 'leaderboard'
  | 'contests'
  | 'contestresult'
  | 'blog'
  | 'privacy'
  | 'terms'
  | 'docs'
  | 'support'
  | 'login'
  | 'admin'
  | 'createroom'
  | 'joinroom'
  | 'waitingroom';

type UserType = 'guest' | 'user' | 'admin';
type AdminRole = 'owner' | 'dual_admin' | 'question_admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [userType, setUserType] = useState<UserType>('guest');
  const [adminRole, setAdminRole] = useState<AdminRole | undefined>();

  useEffect(() => {
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  // Handle login
  const handleLogin = (type: 'user' | 'admin', role?: AdminRole) => {
    setUserType(type);
    if (type === 'admin' && role) {
      setAdminRole(role);
      setCurrentPage('admin');
    } else {
      setCurrentPage('home');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUserType('guest');
    setAdminRole(undefined);
    setCurrentPage('login');
  };

  // Navigation handlers
  const navigateToArena = () => setCurrentPage('arena');
  const navigateToMatch = () => setCurrentPage('match');
  const navigateToQuestions = () => setCurrentPage('questions');
  const navigateToProfile = () => setCurrentPage('profile');
  const navigateToEditProfile = () => setCurrentPage('editprofile');
  const navigateToAnnouncements = () => setCurrentPage('announcements');
  const navigateToCommunity = () => setCurrentPage('community');
  const navigateToLeaderboard = () => setCurrentPage('leaderboard');
  const navigateToContests = () => setCurrentPage('contests');
  const navigateToContestResult = () => setCurrentPage('contestresult');
  const navigateToBlog = () => setCurrentPage('blog');
  const navigateToPrivacy = () => setCurrentPage('privacy');
  const navigateToTerms = () => setCurrentPage('terms');
  const navigateToDocs = () => setCurrentPage('docs');
  const navigateToSupport = () => setCurrentPage('support');
  const navigateToHome = () => setCurrentPage(userType === 'admin' ? 'admin' : 'home');
  const navigateToCreateRoom = () => setCurrentPage('createroom');
  const navigateToJoinRoom = () => setCurrentPage('joinroom');
  const navigateToWaitingRoom = () => setCurrentPage('waitingroom');

  const handlePageNavigation = (page: PageType) => {
    setCurrentPage(page);
  };

  // Create navigation props object for consistency
  const navigationProps = {
    onStartCoding: navigateToArena,
    onStartMatch: navigateToMatch,
    onQuestionBank: navigateToQuestions,
    onProfile: navigateToProfile,
    onEditProfile: navigateToEditProfile,
    onAnnouncements: navigateToAnnouncements,
    onCommunity: navigateToCommunity,
    onLeaderboard: navigateToLeaderboard,
    onContests: navigateToContests,
    onContestResult: navigateToContestResult,
    onBlog: navigateToBlog,
    onPrivacy: navigateToPrivacy,
    onTerms: navigateToTerms,
    onDocs: navigateToDocs,
    onSupport: navigateToSupport,
    onHome: navigateToHome,
    onCreateRoom: navigateToCreateRoom,
    onJoinRoom: navigateToJoinRoom,
    onWaitingRoom: navigateToWaitingRoom,
  };

  // Login page
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigateHome={navigateToHome} />;
  }

  // Admin dashboard
  if (currentPage === 'admin' && userType === 'admin' && adminRole) {
    return <AdminDashboard adminRole={adminRole} onLogout={handleLogout} />;
  }

  // Full-page routes
  if (currentPage === 'arena') {
    return <ArenaPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'match') {
    return <MatchPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'questions') {
    return <ProblemSetPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'profile') {
    return <ProfilePage navigationProps={navigationProps} />;
  }

  if (currentPage === 'editprofile') {
    return <EditProfilePage navigationProps={navigationProps} />;
  }

  if (currentPage === 'announcements') {
    return <AnnouncementPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'community') {
    return <CommunityPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'leaderboard') {
    return <LeaderboardPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'contests') {
    return <ContestPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'contestresult') {
    return <ContestResultPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'blog') {
    return <BlogPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'terms') {
    return <TermsPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'docs') {
    return <DocumentationPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'support') {
    return <SupportPage navigationProps={navigationProps} />;
  }

  if (currentPage === 'createroom') {
    return <CreateRoomPage navigationProps={navigationProps} onRoomCreated={navigateToWaitingRoom} />;
  }

  if (currentPage === 'joinroom') {
    return <JoinRoomPage navigationProps={navigationProps} onJoinRoom={navigateToWaitingRoom} />;
  }

  if (currentPage === 'waitingroom') {
    return <WaitingRoomPage navigationProps={navigationProps} roomId="A9X3QZ" isAdmin={true} onMatchStart={navigateToMatch} />;
  }

  // Home page
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <Navbar {...navigationProps} />
      <HeroSection onStartCoding={navigateToArena} onStartMatch={navigateToMatch} />
      <HowItWorksSection />
      <ActivitySection />
      <AIAssistantSection />
      <CommunitySection />
      <CTABanner onStartCoding={navigateToArena} onStartMatch={navigateToMatch} />
      <Footer 
        onPrivacy={navigateToPrivacy}
        onTerms={navigateToTerms}
        onDocs={navigateToDocs}
        onSupport={navigateToSupport}
      />
      
      {/* Floating Action Button */}
      <FloatingActionButton 
        onStartCoding={navigateToArena}
        onStartMatch={navigateToMatch}
      />
    </div>
  );
}