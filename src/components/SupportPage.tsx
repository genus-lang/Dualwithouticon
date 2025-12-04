import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Mail, MessageSquare, HelpCircle, CheckCircle, Activity } from 'lucide-react';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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

interface SupportPageProps {
  navigationProps: NavigationProps;
}

export function SupportPage({ navigationProps }: SupportPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Support ticket submitted! We\'ll get back to you within 48 hours.');
    setFormData({ name: '', email: '', category: '', description: '' });
  };

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
    },
    {
      question: 'Why can\'t I join a contest?',
      answer: 'Make sure you\'re registered before the contest starts. Check your account eligibility and internet connection.',
    },
    {
      question: 'How does the AI assistance work?',
      answer: 'Our AI analyzes your code in real-time, identifies potential issues, and provides hints without revealing solutions.',
    },
    {
      question: 'Can I get a refund for premium features?',
      answer: 'Premium subscriptions can be cancelled anytime. Contact support for refund requests within 7 days of purchase.',
    },
    {
      question: 'My code submission is stuck. What should I do?',
      answer: 'Try refreshing the page. If the issue persists, save your code locally and contact support with your session ID.',
    },
  ];

  const systemStatus = [
    { name: 'Contest Servers', status: 'online' },
    { name: 'AI Assistance', status: 'online' },
    { name: 'Sync Services', status: 'online' },
    { name: 'Leaderboard API', status: 'slow' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#00FF88';
      case 'slow': return '#FFA500';
      case 'offline': return '#FF0088';
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(162, 89, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)', top: '20%', left: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-[#00FFFF]/10 bg-[#0A0F1C]/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <Button
              onClick={navigationProps.onSupport}
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-white/5 mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 
                className="text-4xl text-white mb-3"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                🆘 Support Center
              </h1>
              <p 
                className="text-lg text-white/70"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                How can we help you today?
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Contact Options Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all cursor-pointer group"
              whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0, 255, 255, 0.2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center mb-4 group-hover:bg-[#00FFFF]/30 transition-colors">
                <Mail className="w-6 h-6 text-[#00FFFF]" />
              </div>
              <h3 
                className="text-xl text-white mb-2"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                Create Support Ticket
              </h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Submit a detailed ticket for complex issues
              </p>
            </motion.div>

            <motion.div
              className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#A259FF]/20 rounded-xl p-6 hover:border-[#A259FF]/40 transition-all cursor-pointer group"
              whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(162, 89, 255, 0.2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#A259FF]/20 flex items-center justify-center mb-4 group-hover:bg-[#A259FF]/30 transition-colors">
                <MessageSquare className="w-6 h-6 text-[#A259FF]" />
              </div>
              <h3 
                className="text-xl text-white mb-2"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                Chat with AI Assistant
              </h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Get instant answers to common questions
              </p>
            </motion.div>

            <motion.div
              className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FF88]/20 rounded-xl p-6 hover:border-[#00FF88]/40 transition-all cursor-pointer group"
              whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0, 255, 136, 0.2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#00FF88]/20 flex items-center justify-center mb-4 group-hover:bg-[#00FF88]/30 transition-colors">
                <HelpCircle className="w-6 h-6 text-[#00FF88]" />
              </div>
              <h3 
                className="text-xl text-white mb-2"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                Contact Admin Team
              </h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Reach out directly for urgent matters
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Submit Ticket Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/10 rounded-xl p-8">
                <h2 
                  className="text-2xl text-white mb-6"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  📝 Submit a Ticket
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="block text-sm text-white/80 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Name
                    </Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-[#0D0D0D] border-[#00FFFF]/20 text-white placeholder:text-white/40"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      required
                    />
                  </div>

                  <div>
                    <Label className="block text-sm text-white/80 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-[#0D0D0D] border-[#00FFFF]/20 text-white placeholder:text-white/40"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      required
                    />
                  </div>

                  <div>
                    <Label className="block text-sm text-white/80 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="bg-[#0D0D0D] border-[#00FFFF]/20 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="account">Account Problem</SelectItem>
                        <SelectItem value="contest">Contest Question</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm text-white/80 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Description
                    </Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your issue in detail..."
                      className="bg-[#0D0D0D] border-[#00FFFF]/20 text-white placeholder:text-white/40 min-h-[150px]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <input type="checkbox" id="attach" className="rounded" />
                    <label htmlFor="attach">Attach file (optional)</label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#00FFFF] to-[#00FF88] text-black hover:opacity-90 h-12"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                </form>
              </div>

              {/* FAQ Section */}
              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#A259FF]/10 rounded-xl p-8 mt-8">
                <h2 
                  className="text-2xl text-white mb-6"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  🧠 Frequently Asked Questions
                </h2>
                
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-[#A259FF]/10 rounded-lg px-4 data-[state=open]:border-[#A259FF]/30 transition-colors"
                    >
                      <AccordionTrigger 
                        className="text-left text-white/90 hover:text-white py-4"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent 
                        className="text-white/70 pb-4"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Live Status Panel */}
            <div className="space-y-6">
              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FFFF]/20 rounded-xl p-6">
                <h3 
                  className="text-lg text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  <Activity className="w-5 h-5 text-[#00FFFF]" />
                  System Status
                </h3>
                
                <div className="space-y-3">
                  {systemStatus.map((system, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#000000]/50 rounded-lg">
                      <span className="text-sm text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {system.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ 
                            backgroundColor: getStatusColor(system.status),
                            boxShadow: `0 0 8px ${getStatusColor(system.status)}`,
                          }}
                        />
                        <span 
                          className="text-xs capitalize"
                          style={{ 
                            fontFamily: 'JetBrains Mono, monospace',
                            color: getStatusColor(system.status),
                          }}
                        >
                          {system.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Last updated: Just now
                </div>
              </div>

              <div className="bg-[#0D0D0D]/80 backdrop-blur-md border border-[#00FF88]/20 rounded-xl p-6">
                <h3 
                  className="text-lg text-white mb-4"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  📧 Direct Contact
                </h3>
                <div className="space-y-3 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  <p className="text-white/70">
                    <strong className="text-[#00FFFF]">Email:</strong> support@codearena.com
                  </p>
                  <p className="text-white/70">
                    <strong className="text-[#00FFFF]">Response Time:</strong> Within 48 hours
                  </p>
                  <p className="text-white/70">
                    <strong className="text-[#00FFFF]">Hours:</strong> Mon-Fri 9AM-6PM EST
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