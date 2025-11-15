import { Code2, Github, Linkedin, Twitter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function Footer() {
  return (
    <footer className="relative border-t border-[#00FFFF]/20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-[#00FFFF]" />
              <span className="text-xl tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Code<span className="text-[#00FFFF]">Arena</span>
              </span>
            </div>
            <p className="text-white/60 text-sm mb-4">
              The future of collaborative coding. Pair up, compete, and grow together.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-white/60 hover:text-[#00FFFF] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-[#00FFFF] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-[#00FFFF] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600 }}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contests" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Contests
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600 }}>Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Language Selector */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600 }}>Language</h4>
            <Select defaultValue="en">
              <SelectTrigger className="glassmorphism border-[#00FFFF]/20 text-white w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/20">
                <SelectItem value="en" className="text-white">English</SelectItem>
                <SelectItem value="es" className="text-white">Español</SelectItem>
                <SelectItem value="fr" className="text-white">Français</SelectItem>
                <SelectItem value="de" className="text-white">Deutsch</SelectItem>
                <SelectItem value="ja" className="text-white">日本語</SelectItem>
                <SelectItem value="zh" className="text-white">中文</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-6">
              <h4 className="text-white mb-2" style={{ fontWeight: 600 }}>Newsletter</h4>
              <p className="text-white/60 text-sm mb-3">
                Get weekly coding tips and updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-[#00FFFF]/20 text-white text-sm focus:outline-none focus:border-[#00FFFF]/50"
                />
                <button className="px-4 py-2 rounded-lg bg-[#00FFFF] text-black text-sm hover:bg-[#00FFFF]/90 transition-colors" style={{ fontWeight: 600 }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#00FFFF]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/50 text-sm">
            © 2025 CodeArena. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors">
              Status
            </a>
            <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors">
              API
            </a>
            <a href="#" className="text-white/60 hover:text-[#00FFFF] transition-colors">
              Careers
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
          boxShadow: '0 0 20px #00FFFF',
        }}
      />
    </footer>
  );
}
