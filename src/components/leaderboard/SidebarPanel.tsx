import { motion } from "motion/react";
import { Switch } from "../ui/switch";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

export function SidebarPanel() {
  const [showFriends, setShowFriends] = useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const [includeGlobal, setIncludeGlobal] = useState(true);

  const risingStars = [
    { username: 'newbie_ninja', growth: '+342', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja' },
    { username: 'code_phoenix', growth: '+298', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phoenix' },
    { username: 'algo_beast', growth: '+267', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beast' }
  ];

  return (
    <div className="space-y-6">
      {/* Filters Card */}
      <motion.div
        className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Filters
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between group">
            <label className="text-gray-300 text-sm cursor-pointer group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Show only friends
            </label>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Switch
                checked={showFriends}
                onCheckedChange={setShowFriends}
                className="data-[state=checked]:bg-cyan-500"
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-between group">
            <label className="text-gray-300 text-sm cursor-pointer group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Show verified coders
            </label>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Switch
                checked={showVerified}
                onCheckedChange={setShowVerified}
                className="data-[state=checked]:bg-cyan-500"
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-between group">
            <label className="text-gray-300 text-sm cursor-pointer group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Include global leaderboard
            </label>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Switch
                checked={includeGlobal}
                onCheckedChange={setIncludeGlobal}
                className="data-[state=checked]:bg-cyan-500"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Summary Card */}
      <motion.div
        className="bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-purple-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Platform Stats
        </h3>
        
        <div className="space-y-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total Coders Ranked</span>
            <span className="text-cyan-400">8,342</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Average Rating</span>
            <span className="text-green-400">1,378</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Top Accuracy</span>
            <span className="text-purple-400">98.7%</span>
          </div>
        </div>
      </motion.div>

      {/* Rising Stars Card */}
      <motion.div
        className="bg-black/40 backdrop-blur-md border border-yellow-500/20 rounded-xl p-6 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          <h3 className="text-yellow-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Fastest Growing
          </h3>
        </div>
        
        <div className="space-y-3">
          {risingStars.map((star, index) => (
            <motion.div
              key={star.username}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-500/10 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {index + 1}
                </div>
                <span className="text-gray-300 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  @{star.username}
                </span>
              </div>
              <span className="text-green-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {star.growth}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mini chart visualization */}
        <div className="mt-4 flex items-end gap-2 h-20">
          {[60, 75, 90].map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
