import { useState } from 'react';
import { AdminTopBar } from './AdminTopBar';
import { AdminSidebar } from './AdminSidebar';
import { DashboardModule } from './modules/DashboardModule';
import { UserManagementModule } from './modules/UserManagementModule';
import { QuestionBankModule } from './modules/QuestionBankModule';
import { DualCodingModule } from './modules/DualCodingModule';
import { ContestManagementModule } from './modules/ContestManagementModule';
import { ChatCommunityModule } from './modules/ChatCommunityModule';
import { StreamingModule } from './modules/StreamingModule';
import { AdminManagementModule } from './modules/AdminManagementModule';
import { SystemSettingsModule } from './modules/SystemSettingsModule';
import { LogsModule } from './modules/LogsModule';
import { CreateContestPage } from './CreateContestPage';
import { AddQuestionPage } from './AddQuestionPage';
import { BulkUploadQuestionsPage } from './BulkUploadQuestionsPage';

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
  | 'logs'
  | 'create-contest'
  | 'add-question'
  | 'bulk-upload-questions';

interface AdminDashboardProps {
  adminRole: 'owner' | 'dual_admin' | 'question_admin';
  onLogout: () => void;
}

export function AdminDashboard({ adminRole, onLogout }: AdminDashboardProps) {
  const [activeModule, setActiveModule] = useState<AdminModule>('dashboard');

  const handleEmergencyLockdown = () => {
    const confirmed = confirm(
      '🚨 EMERGENCY LOCKDOWN\n\nThis will immediately:\n• Freeze all platform activity\n• Force logout all users\n• Disable submissions\n• Stop all matches\n\nAre you absolutely sure?'
    );
    
    if (confirmed) {
      alert('🚨 EMERGENCY LOCKDOWN ACTIVATED\n\nAll systems frozen. Platform is in maintenance mode.');
    }
  };

  const handleCreateContest = (contestData: any) => {
    console.log('Contest created:', contestData);
    alert('✅ Contest created successfully!');
    setActiveModule('contests');
  };

  const handleCreateQuestion = (questionData: any) => {
    console.log('Question created:', questionData);
    alert('✅ Question created successfully!');
    setActiveModule('questions');
  };

  const handleBulkUpload = (uploadData: any) => {
    console.log('Bulk upload completed:', uploadData);
    alert(`✅ Successfully uploaded ${uploadData.successCount} questions!`);
    setActiveModule('questions');
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule adminRole={adminRole} />;
      case 'users':
        return <UserManagementModule adminRole={adminRole} />;
      case 'questions':
        return <QuestionBankModule adminRole={adminRole} onNavigateToAddQuestion={() => setActiveModule('add-question')} onNavigateToBulkUpload={() => setActiveModule('bulk-upload-questions')} />;
      case 'dual-coding':
        return <DualCodingModule adminRole={adminRole} />;
      case 'contests':
        return <ContestManagementModule adminRole={adminRole} onNavigateToCreateContest={() => setActiveModule('create-contest')} />;
      case 'chat':
        return <ChatCommunityModule adminRole={adminRole} />;
      case 'streaming':
        return <StreamingModule adminRole={adminRole} />;
      case 'admins':
        return <AdminManagementModule adminRole={adminRole} />;
      case 'settings':
        return <SystemSettingsModule adminRole={adminRole} />;
      case 'logs':
        return <LogsModule adminRole={adminRole} />;
      case 'create-contest':
        return <CreateContestPage adminRole={adminRole} onBack={() => setActiveModule('contests')} onCreateContest={handleCreateContest} />;
      case 'add-question':
        return <AddQuestionPage adminRole={adminRole} onBack={() => setActiveModule('questions')} onCreateQuestion={handleCreateQuestion} />;
      case 'bulk-upload-questions':
        return <BulkUploadQuestionsPage adminRole={adminRole} onBack={() => setActiveModule('questions')} onBulkUpload={handleBulkUpload} />;
      default:
        return <DashboardModule adminRole={adminRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <AdminTopBar 
        adminRole={adminRole} 
        onLogout={onLogout}
        onEmergencyLockdown={adminRole === 'owner' ? handleEmergencyLockdown : undefined}
      />
      
      <div className="flex">
        <AdminSidebar 
          adminRole={adminRole}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />
        
        <div className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {renderModule()}
        </div>
      </div>
    </div>
  );
}