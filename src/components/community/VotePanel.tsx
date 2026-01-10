import { ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface VotePanelProps {
  initialVotes: number;
  commentCount: number;
}

export function VotePanel({ initialVotes, commentCount }: VotePanelProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setVotes(votes - 1);
      setUserVote(null);
    } else if (userVote === 'down') {
      setVotes(votes + 2);
      setUserVote('up');
    } else {
      setVotes(votes + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setVotes(votes + 1);
      setUserVote(null);
    } else if (userVote === 'up') {
      setVotes(votes - 2);
      setUserVote('down');
    } else {
      setVotes(votes - 1);
      setUserVote('down');
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Upvote */}
      <button
        onClick={handleUpvote}
        className={`p-1 rounded transition-colors ${
          userVote === 'up' 
            ? 'text-[#00FF88] bg-[#00FF88]/10' 
            : 'text-white/60 hover:text-[#00FF88] hover:bg-[#00FF88]/5'
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Vote Count */}
      <div
        className={`text-center min-w-[3rem] px-2 py-1 rounded-lg ${
          votes > 0 ? 'text-[#00FF88]' : votes < 0 ? 'text-[#FF0088]' : 'text-white/60'
        }`}
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        {votes > 0 ? '+' : ''}{votes}
      </div>

      {/* Downvote */}
      <button
        onClick={handleDownvote}
        className={`p-1 rounded transition-colors ${
          userVote === 'down' 
            ? 'text-[#FF0088] bg-[#FF0088]/10' 
            : 'text-white/60 hover:text-[#FF0088] hover:bg-[#FF0088]/5'
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Comment Count */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <MessageSquare className="w-5 h-5 text-[#00FFFF]/60" />
        <span 
          className="text-xs text-white/40"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {commentCount}
        </span>
      </div>
    </div>
  );
}
