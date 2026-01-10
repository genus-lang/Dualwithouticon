import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SearchHeroSectionProps {
  onAskQuestion: () => void;
}

export function SearchHeroSection({ onAskQuestion }: SearchHeroSectionProps) {
  return (
    <div className="relative overflow-hidden border-b border-[#00FFFF]/10">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/10 via-[#A259FF]/10 to-[#00FFFF]/10"
      />

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00FFFF]" />
          <Input
            placeholder="Search questions, tags, or users..."
            className="pl-12 h-14 bg-black/40 border-[#00FFFF]/30 focus:border-[#00FFFF] text-white placeholder:text-white/40 rounded-xl"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-white/60 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Can't find your question?
          </p>
          <Button
            onClick={onAskQuestion}
            className="bg-gradient-to-r from-[#00FFFF] to-[#00D4D4] hover:from-[#00FFFF] hover:to-[#00E8E8] text-black shadow-[0_0_30px_rgba(0,255,255,0.4)]"
          >
            Ask Question ⚡
          </Button>
          
          {/* Stats */}
          <p 
            className="text-white/40 text-sm mt-6"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Over <span className="text-[#00FFFF]">14,000</span> discussions and{' '}
            <span className="text-[#00FF88]">6,200</span> active members online.
          </p>
        </div>
      </div>
    </div>
  );
}
