import { Badge } from '../ui/badge';

interface Tag {
  name: string;
  count: number;
  color: string;
}

const popularTags: Tag[] = [
  { name: 'DynamicProgramming', count: 142, color: '#00FFFF' },
  { name: 'AI', count: 89, color: '#A259FF' },
  { name: 'Python', count: 77, color: '#00FF88' },
  { name: 'Recursion', count: 64, color: '#FFB86C' },
  { name: 'GraphTheory', count: 58, color: '#00FFFF' },
  { name: 'Optimization', count: 51, color: '#FF0088' },
  { name: 'DataStructures', count: 47, color: '#00FF88' },
  { name: 'Algorithms', count: 43, color: '#A259FF' },
];

export function SidebarTagPanel() {
  return (
    <div className="glassmorphic border border-[#00FFFF]/10 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔥</span>
        <h3 
          className="text-white"
          style={{ 
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
          }}
        >
          Trending Tags
        </h3>
      </div>

      {/* Tags List */}
      <div className="flex flex-col gap-2">
        {popularTags.map((tag) => (
          <button
            key={tag.name}
            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <Badge
              variant="outline"
              className="border-[#00FFFF]/30 bg-[#00FFFF]/5 group-hover:bg-[#00FFFF]/10 transition-colors"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                borderColor: `${tag.color}30`,
                color: tag.color,
              }}
            >
              #{tag.name}
            </Badge>
            <span 
              className="text-white/40 text-sm"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {tag.count}
            </span>
          </button>
        ))}
      </div>

      {/* View All Link */}
      <button
        className="w-full mt-3 pt-3 border-t border-white/10 text-[#00FFFF] text-sm hover:underline"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        View all tags →
      </button>
    </div>
  );
}
