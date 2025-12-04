import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, FileText, Globe, Mail } from 'lucide-react';
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

interface PrivacyPageProps {
  navigationProps: NavigationProps;
}

export function PrivacyPage({ navigationProps }: PrivacyPageProps) {
  const [activeSection, setActiveSection] = useState('information-we-collect');

  const sections = [
    { id: 'information-we-collect', title: 'Information We Collect', icon: FileText },
    { id: 'how-we-use', title: 'How We Use Your Information', icon: Eye },
    { id: 'data-security', title: 'Data Security', icon: Lock },
    { id: 'third-party', title: 'Third-Party Integrations', icon: Globe },
    { id: 'your-rights', title: 'Your Rights', icon: Shield },
    { id: 'contact', title: 'Contact Us', icon: Mail },
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
                🔐 Privacy Policy
              </h1>
              <p 
                className="text-lg text-white/70"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Your data, your control — explained clearly.
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
              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/20 rounded-xl p-4">
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
                            ? 'bg-[#00FFFF]/20 text-[#00FFFF]'
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
                
                {/* Information We Collect */}
                <section id="information-we-collect">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#00FFFF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FFFF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Information We Collect
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FFFF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>We collect the following types of information:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Account information (email, username, password hash)</li>
                      <li>Profile data (name, avatar, coding preferences)</li>
                      <li>Code submissions and contest performance data</li>
                      <li>Usage analytics and interaction patterns</li>
                      <li>Device and browser information</li>
                    </ul>
                    <div className="bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg p-4 mt-4">
                      <p className="text-[#00FF88] text-sm">
                        ✓ We never sell your personal data.
                      </p>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section id="how-we-use">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#A259FF]/20 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-[#A259FF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#A259FF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      How We Use Your Information
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#A259FF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>Your information is used to:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Provide and improve our coding platform services</li>
                      <li>Personalize your experience and AI assistance</li>
                      <li>Process contest registrations and rankings</li>
                      <li>Send important notifications and updates</li>
                      <li>Analyze platform usage to enhance features</li>
                      <li>Prevent fraud and ensure platform security</li>
                    </ul>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FF88]/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#00FF88]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FF88]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Data Security
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FF88] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>We implement industry-standard security measures:</p>
                    <div className="bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg p-4 space-y-2">
                      <p className="text-[#00FFFF] text-sm">
                        🔒 We use encryption for all stored information.
                      </p>
                      <p className="text-[#00FFFF] text-sm">
                        🔒 All data transmissions are secured with HTTPS/TLS.
                      </p>
                      <p className="text-[#00FFFF] text-sm">
                        🔒 Passwords are hashed using bcrypt with salt.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Third-Party Integrations */}
                <section id="third-party">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#00FFFF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FFFF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Third-Party Integrations
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FFFF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>We may share limited data with:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Analytics providers (Google Analytics, Mixpanel)</li>
                      <li>Email service providers (SendGrid)</li>
                      <li>Payment processors (Stripe) for contest prizes</li>
                      <li>AI model providers for code assistance features</li>
                    </ul>
                    <p>All third-party services comply with GDPR and data protection regulations.</p>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#A259FF]/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#A259FF]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#A259FF]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Your Rights
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#A259FF] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Access your personal data</li>
                      <li>Request data correction or deletion</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Export your data in a portable format</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </div>
                </section>

                {/* Contact Us */}
                <section id="contact">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00FF88]/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#00FF88]" />
                    </div>
                    <h2 
                      className="text-2xl text-[#00FF88]"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                    >
                      Contact Us
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#00FF88] to-transparent mb-6" />
                  <div className="space-y-4 text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <p>For privacy-related questions or requests, contact us at:</p>
                    <div className="bg-[#0D0D0D] border border-[#00FFFF]/30 rounded-lg p-4">
                      <p className="text-[#00FFFF]">📧 privacy@codearena.com</p>
                      <p className="text-white/60 mt-2">We'll respond within 48 hours.</p>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}