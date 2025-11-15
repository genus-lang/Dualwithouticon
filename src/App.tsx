import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ActivitySection } from './components/ActivitySection';
import { AIAssistantSection } from './components/AIAssistantSection';
import { CommunitySection } from './components/CommunitySection';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';
import { ArenaPage } from './components/ArenaPage';
import { MatchPage } from './components/MatchPage';
import { QuestionBankPage } from './components/QuestionBankPage';
import { ProfilePage } from './components/ProfilePage';
import { AnnouncementPage } from './components/AnnouncementPage';
import { CommunityPage } from './components/CommunityPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import './styles/globals.css';

type PageType = 'home' | 'arena' | 'match' | 'questions' | 'profile' | 'announcements' | 'community' | 'leaderboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  // Handle navigation
  const navigateToArena = () => setCurrentPage('arena');
  const navigateToMatch = () => setCurrentPage('match');
  const navigateToQuestions = () => setCurrentPage('questions');
  const navigateToProfile = () => setCurrentPage('profile');
  const navigateToAnnouncements = () => setCurrentPage('announcements');
  const navigateToCommunity = () => setCurrentPage('community');
  const navigateToLeaderboard = () => setCurrentPage('leaderboard');
  const navigateToHome = () => setCurrentPage('home');

  const handlePageNavigation = (page: 'home' | 'arena' | 'questions' | 'match' | 'announcements' | 'community' | 'leaderboard') => {
    setCurrentPage(page);
  };

  if (currentPage === 'arena') {
    return <ArenaPage onExit={navigateToHome} />;
  }

  if (currentPage === 'match') {
    return <MatchPage onExit={navigateToHome} />;
  }

  if (currentPage === 'questions') {
    return <QuestionBankPage onExit={navigateToHome} onSolveQuestion={navigateToMatch} />;
  }

  if (currentPage === 'profile') {
    return <ProfilePage onNavigate={handlePageNavigation} />;
  }

  if (currentPage === 'announcements') {
    return <AnnouncementPage onExit={navigateToHome} />;
  }

  if (currentPage === 'community') {
    return <CommunityPage onExit={navigateToHome} />;
  }

  if (currentPage === 'leaderboard') {
    return <LeaderboardPage onProfile={navigateToProfile} onHome={navigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <Navbar 
        onStartCoding={navigateToArena} 
        onStartMatch={navigateToMatch} 
        onQuestionBank={navigateToQuestions} 
        onProfile={navigateToProfile}
        onAnnouncements={navigateToAnnouncements}
        onCommunity={navigateToCommunity}
        onLeaderboard={navigateToLeaderboard}
      />
      <HeroSection onStartCoding={navigateToArena} onStartMatch={navigateToMatch} />
      <HowItWorksSection />
      <ActivitySection />
      <AIAssistantSection />
      <CommunitySection />
      <CTABanner onStartCoding={navigateToArena} onStartMatch={navigateToMatch} />
      <Footer />
    </div>
  );
}
