import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BadgeIcon } from "./BadgeIcon";
import { Badge } from "../ui/badge";

interface LeaderboardUser {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  rating: number;
  problemsSolved: number;
  accuracy: number;
  badge: 'gold' | 'silver' | 'bronze';
}

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function LeaderboardTable({ users, currentPage, totalPages, onPageChange }: LeaderboardTableProps) {
  const getBadgeType = (rating: number): 'gold' | 'silver' | 'bronze' => {
    if (rating >= 2000) return 'gold';
    if (rating >= 1500) return 'silver';
    return 'bronze';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.1)' }}>
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-cyan-500/5 border-b border-cyan-500/20" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <div className="col-span-1 text-cyan-400 text-sm">Rank</div>
          <div className="col-span-4 text-cyan-400 text-sm">Username</div>
          <div className="col-span-2 text-cyan-400 text-sm">Rating</div>
          <div className="col-span-2 text-cyan-400 text-sm">Problems</div>
          <div className="col-span-2 text-cyan-400 text-sm">Accuracy</div>
          <div className="col-span-1 text-cyan-400 text-sm text-center">Badge</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-cyan-500/10">
          {users.map((user, index) => {
            const isTopTen = user.rank <= 10;
            
            return (
              <motion.div
                key={user.rank}
                className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-cyan-500/10 transition-all cursor-pointer group ${
                  isTopTen ? 'border-l-2 border-cyan-400/50' : ''
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  x: 5,
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
                }}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  <div className={`w-10 h-10 rounded-lg border ${
                    isTopTen ? 'border-cyan-400 bg-cyan-500/10' : 'border-cyan-500/30 bg-black/40'
                  } flex items-center justify-center group-hover:shadow-lg transition-shadow`}
                  style={isTopTen ? { boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)' } : {}}>
                    <span className="text-cyan-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      #{user.rank}
                    </span>
                  </div>
                </div>

                {/* Username */}
                <div className="col-span-4 flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-cyan-500/50">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-cyan-900">{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-cyan-100" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      @{user.username}
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/20 border-cyan-400/40 text-cyan-300 text-xs">
                      Level {user.level}
                    </Badge>
                  </div>
                </div>

                {/* Rating */}
                <div className="col-span-2 flex items-center">
                  <span className="text-cyan-400 text-lg" style={{ 
                    fontFamily: 'JetBrains Mono, monospace',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                  }}>
                    {user.rating}
                  </span>
                </div>

                {/* Problems Solved */}
                <div className="col-span-2 flex items-center">
                  <span className="text-green-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {user.problemsSolved}
                  </span>
                </div>

                {/* Accuracy */}
                <div className="col-span-2 flex items-center">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {user.accuracy}%
                  </span>
                </div>

                {/* Badge */}
                <div className="col-span-1 flex items-center justify-center">
                  <BadgeIcon type={user.badge} size="sm" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-cyan-500/5 border-t border-cyan-500/20 flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-black/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            ← Prev
          </button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-lg border transition-all ${
                  currentPage === pageNum
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg'
                    : 'bg-black/40 border-cyan-500/30 text-gray-400 hover:bg-cyan-500/10 hover:border-cyan-400'
                }`}
                style={currentPage === pageNum ? { boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)' } : {}}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-black/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
