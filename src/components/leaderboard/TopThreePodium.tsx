import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BadgeIcon } from "./BadgeIcon";
import { Crown } from "lucide-react";

interface TopCoderData {
  rank: number;
  username: string;
  avatar: string;
  rating: number;
  problemsSolved: number;
  accuracy: number;
  badge: 'gold' | 'silver' | 'bronze';
}

interface TopThreePodiumProps {
  topThree: TopCoderData[];
}

export function TopThreePodium({ topThree }: TopThreePodiumProps) {
  const getPodiumOrder = () => {
    if (topThree.length < 3) return topThree;
    return [topThree[1], topThree[0], topThree[2]]; // Silver, Gold, Bronze
  };

  const orderedPodium = getPodiumOrder();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl" />
        
        <div className="relative flex items-end justify-center gap-8">
          {orderedPodium.map((coder, index) => {
            const isFirst = coder.rank === 1;
            const podiumHeight = isFirst ? 'h-72' : 'h-56';
            const cardMargin = isFirst ? 'mb-16' : 'mb-0';

            return (
              <motion.div
                key={coder.rank}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Card */}
                <motion.div
                  className={`relative bg-black/60 backdrop-blur-md border border-${coder.badge === 'gold' ? 'yellow' : coder.badge === 'silver' ? 'gray' : 'orange'}-400/40 rounded-2xl p-6 w-64 ${cardMargin} shadow-2xl`}
                  style={{
                    boxShadow: `0 0 30px ${
                      coder.badge === 'gold' ? 'rgba(255, 215, 0, 0.3)' : 
                      coder.badge === 'silver' ? 'rgba(192, 192, 192, 0.3)' : 
                      'rgba(205, 127, 50, 0.3)'
                    }`
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  {/* Crown for #1 */}
                  {isFirst && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="w-12 h-12 text-yellow-400 fill-yellow-400" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }} />
                    </motion.div>
                  )}

                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className={`${isFirst ? 'w-24 h-24' : 'w-20 h-20'} border-4 ${
                        coder.badge === 'gold' ? 'border-yellow-400' : 
                        coder.badge === 'silver' ? 'border-gray-300' : 
                        'border-orange-400'
                      }`} style={{
                        boxShadow: `0 0 20px ${
                          coder.badge === 'gold' ? 'rgba(255, 215, 0, 0.6)' : 
                          coder.badge === 'silver' ? 'rgba(192, 192, 192, 0.6)' : 
                          'rgba(205, 127, 50, 0.6)'
                        }`
                      }}>
                        <AvatarImage src={coder.avatar} />
                        <AvatarFallback className="bg-gray-800">{coder.username[0]}</AvatarFallback>
                      </Avatar>

                      {/* Rank badge */}
                      <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${
                        coder.badge === 'gold' ? 'from-yellow-400 to-yellow-600' :
                        coder.badge === 'silver' ? 'from-gray-300 to-gray-500' :
                        'from-orange-400 to-orange-600'
                      } flex items-center justify-center border-2 border-black`}>
                        <span className="text-black" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          #{coder.rank}
                        </span>
                      </div>
                    </div>

                    {/* Username */}
                    <div className="text-center">
                      <p className="text-cyan-300 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        @{coder.username}
                      </p>
                      <BadgeIcon type={coder.badge} size="md" />
                    </div>

                    {/* Stats */}
                    <div className="w-full space-y-2 text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <div>
                        <p className="text-gray-500 text-xs">Rating</p>
                        <p className="text-cyan-400">{coder.rating}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Problems Solved</p>
                        <p className="text-green-400">{coder.problemsSolved}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Accuracy</p>
                        <p className="text-purple-400">{coder.accuracy}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Particle effects */}
                  {isFirst && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                {/* Podium base */}
                <motion.div
                  className={`${podiumHeight} w-64 bg-gradient-to-b ${
                    coder.badge === 'gold' ? 'from-yellow-900/40 to-yellow-950/20 border-yellow-400/30' :
                    coder.badge === 'silver' ? 'from-gray-700/40 to-gray-900/20 border-gray-400/30' :
                    'from-orange-900/40 to-orange-950/20 border-orange-400/30'
                  } border rounded-b-xl flex items-center justify-center backdrop-blur-sm`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  <span className={`text-6xl ${
                    coder.badge === 'gold' ? 'text-yellow-400' :
                    coder.badge === 'silver' ? 'text-gray-300' :
                    'text-orange-400'
                  }`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {coder.rank}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
