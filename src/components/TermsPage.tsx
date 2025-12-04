import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, Scale, AlertCircle, Users, Shield, Ban } from 'lucide-react';
import { Navbar } from './Navbar';
import { Button } from './ui/button';

interface NavigationProps {
  onStartCoding: () => void;
  onStartMatch: () => void;
  onQuestionBank: () => void;
  onProfile: () => void;
  onAnnouncements: () => void;
  onCommunity: () => void;
  onLeaderboard: () => void;
  onContests: () => void;
  onBlog: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onDocs: () => void;
  onSupport: () => void;
  onHome: () => void;
}

interface TermsPageProps {
  navigationProps: NavigationProps;
}

export function TermsPage({ navigationProps }: TermsPageProps) {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: FileText },
    { id: 'user-responsibilities', title: 'User Responsibilities', icon: Users },
    { id: 'eligibility', title: 'Account Eligibility', icon: Scale },
    { id: 'content-ownership', title: 'Content Ownership', icon: Shield },
    { id: 'contest-rules', title: 'CodeArena Rules', icon: AlertCircle },
    { id: 'liability', title: 'Liability Limitations', icon: Ban },
    { id: 'termination', title: 'Termination Conditions', icon: Ban },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar {...navigationProps} />
        
        {/* Header */}
        <header className="border-b border-[#00FFFF]/10 bg-[#0A0F1C]/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 
                className="text-4xl text-white mb-3"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                📜 Terms of Service
              </h1>
              <p 
                className="text-lg text-white/70"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Please read these terms carefully before using CodeArena.
              </p>
              <p className="text-sm text-white/50 mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Last updated: December 4, 2025
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Sidebar TOC */}
            <div className="hidden lg:block w-64 sticky top-8 self-start">
              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#A259FF]/20 rounded-xl p-4">
                <h3 
                  className="text-sm text-white/60 mb-4"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
                >
                  TABLE OF CONTENTS
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                          activeSection === section.id
                            ? 'bg-[#A259FF]/20 text-[#A259FF]'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/10 rounded-xl p-8 space-y-12">
                
                {/* Acceptance of Terms */}
                <section id="acceptance">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#00FFFF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FFFF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Acceptance of Terms
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FFFF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>
                      By accessing or using CodeArena, you agree to be bound by these Terms of Service. 
                      If you disagree with any part of these terms, you may not access the service.
                    </p>
                    <p>
                      These terms apply to all visitors, users, and others who access or use the service.
                    </p>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section id="user-responsibilities">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#A259FF]/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#A259FF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#A259FF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      User Responsibilities
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#A259FF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>As a CodeArena user, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Provide accurate and complete registration information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Not share your account with others</li>
                      <li>Respect other users and maintain a professional environment</li>
                      <li>Not engage in cheating, plagiarism, or unfair practices</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </div>
                </section>

                {/* Account Eligibility */}
                <section id="eligibility">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FF88]/20 flex items-center justify-center">
                      <Scale className="w-5 h-5 text-[#00FF88]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FF88]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Account Eligibility
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FF88] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>To use CodeArena, you must:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Be at least 13 years of age</li>
                      <li>Have the legal capacity to enter into these terms</li>
                      <li>Not be prohibited from using the service under applicable law</li>
                      <li>Provide accurate contact information</li>
                    </ul>
                    <p>
                      Users under 18 should have parental or guardian consent to use CodeArena.
                    </p>
                  </div>
                </section>

                {/* Content Ownership */}
                <section id="content-ownership">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FF0088]/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#FF0088]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#FF0088]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Content Ownership
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#FF0088] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>
                      You retain all rights to code and content you create on CodeArena. However, 
                      by submitting content to our platform, you grant us a license to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Display your submissions for contest evaluation</li>
                      <li>Use anonymized code for AI training and platform improvement</li>
                      <li>Share contest solutions for educational purposes (with attribution)</li>
                    </ul>
                    <p>
                      CodeArena respects intellectual property and expects users to do the same.
                    </p>
                  </div>
                </section>

                {/* CodeArena Rules */}
                <section id="contest-rules">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-[#00FFFF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FFFF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      CodeArena Rules
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FFFF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>The following actions are strictly prohibited:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Copying solutions from external sources during contests</li>
                      <li>Using multiple accounts to gain unfair advantages</li>
                      <li>Sharing contest problems before the contest ends</li>
                      <li>Attempting to exploit or hack the platform</li>
                      <li>Harassing or abusing other users</li>
                      <li>Spamming or posting inappropriate content</li>
                    </ul>
                    <div className="bg-[#FF0088]/10 border border-[#FF0088]/30 rounded-lg p-4 mt-4">
                      <p className="text-[#FF0088]">
                        ⚠️ Violation of contest rules may result in temporary or permanent bans.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Liability Limitations */}
                <section id="liability">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#A259FF]/20 flex items-center justify-center">
                      <Ban className="w-5 h-5 text-[#A259FF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#A259FF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Liability Limitations
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#A259FF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>
                      CodeArena is provided "as is" without warranties of any kind. We are not liable for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Service interruptions or downtime</li>
                      <li>Loss of data or contest submissions</li>
                      <li>Indirect, incidental, or consequential damages</li>
                      <li>Actions of other users on the platform</li>
                    </ul>
                    <p>
                      You use CodeArena at your own risk. We recommend backing up important code externally.
                    </p>
                  </div>
                </section>

                {/* Termination Conditions */}
                <section id="termination">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FF88]/20 flex items-center justify-center">
                      <Ban className="w-5 h-5 text-[#00FF88]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FF88]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Termination Conditions
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FF88] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>
                      We may terminate or suspend your account immediately, without prior notice, for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Breach of these Terms of Service</li>
                      <li>Violation of contest rules or fair play policies</li>
                      <li>Fraudulent activity or payment disputes</li>
                      <li>Requests from law enforcement or legal authorities</li>
                    </ul>
                    <p>
                      You may close your account at any time through account settings. All data will be 
                      deleted within 30 days in accordance with our Privacy Policy.
                    </p>
                  </div>
                </section>

                {/* Footer */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Questions about these terms? Contact us at <span className="text-[#00FFFF]">legal@codearena.com</span>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}