import { motion } from 'motion/react';
import { MessageSquare, Share2, Bookmark } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { VotePanel } from './VotePanel';

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    username: string;
    avatar: string;
    level: number;
    badge: string;
  };
  timeAgo: string;
  votes: number;
  commentCount: number;
  onClick?: () => void;
}

export function PostCard({
  title,
  description,
  tags,
  author,
  timeAgo,
  votes,
  commentCount,
  onClick,
}: PostCardProps) {
  return (
    <motion.div
      className="glassmorphic border border-[#00FFFF]/10 rounded-xl p-5 hover:border-[#00FFFF]/30 transition-all cursor-pointer group"
      whileHover={{ 
        y: -4,
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.15)',
      }}
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Left - Vote Panel */}
        <VotePanel initialVotes={votes} commentCount={commentCount} />

        {/* Right - Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 
            className="text-white mb-2 group-hover:text-[#00FFFF] transition-colors"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p 
            className="text-white/60 text-sm mb-3 line-clamp-2"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-[#00FFFF]/30 text-[#00FFFF] bg-[#00FFFF]/5 hover:bg-[#00FFFF]/10 transition-colors"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* User Info Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-6 h-6 ring-1 ring-[#00FFFF]/30">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.username[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex items-center gap-2 text-sm">
                <span 
                  className="text-[#00FFFF] hover:underline"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  @{author.username}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-white/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {timeAgo}
                </span>
                <span className="text-white/30">•</span>
                <span 
                  className="text-[#FFB86C] text-xs"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Level {author.level} – {author.badge}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-[#00FFFF] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <MessageSquare className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-[#A259FF] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-[#00FF88] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Bookmark className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
