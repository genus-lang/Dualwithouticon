import { motion } from 'motion/react';
import { Trophy, Zap, Clock, Target, Award, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import matchSummaryImage from 'figma:asset/9702a484a1017d0264356676d9a9f3c900724415.png';

interface MatchSummaryModalProps {
  isWinner: boolean;
  onRematch: () => void;
  onReturnToLobby: () => void;
}

export function MatchSummaryModal({ isWinner, onRematch, onReturnToLobby }: MatchSummaryModalProps) {
  const yourStats = {
    time: '12:47',
    correctCases: '5 / 5',
    aiHelpUsed: '3%',
    bonusPoints: '+20 XP',
  };

  const opponentStats = {
    time: '13:09',
    correctCases: '4 / 5',
    aiHelpUsed: '8%',
    bonusPoints: '+10 XP',
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Confetti Effect */}
      {isWinner && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#00FFFF', '#A259FF', '#00FF88', '#FF00FF'][i % 4],
                left: `${50}%`,
                top: `${30}%`,
              }}
              animate={{
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 600],
                y: [0, Math.random() * 400 + 200],
                opacity: [1, 0],
                rotate: [0, Math.random() * 720],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      {/* Modal Content */}
      <motion.div
        className="relative glassmorphism rounded-2xl border-2 max-w-3xl w-full overflow-hidden"
        style={{
          borderColor: isWinner ? '#00FF88' : '#A259FF',
          boxShadow: `0 0 40px ${isWinner ? 'rgba(0, 255, 136, 0.3)' : 'rgba(162, 89, 255, 0.3)'}`,
        }}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Header - Victory/Defeat */}
        <div 
          className="relative h-40 flex items-center justify-center overflow-hidden"
          style={{
            background: isWinner 
              ? 'linear-gradient(135deg, #00FF88 0%, #00FFFF 100%)'
              : 'linear-gradient(135deg, #A259FF 0%, #FF00FF 100%)',
          }}
        >
          {/* Burst Animation */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full rounded-full bg-white" />
          </motion.div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
            >
              {isWinner ? (
                <Trophy className="w-20 h-20 text-black mx-auto mb-3" />
              ) : (
                <Target className="w-20 h-20 text-black mx-auto mb-3" />
              )}
            </motion.div>
            
            <motion.h2
              className="text-4xl text-black"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {isWinner ? '🏆 YOU WON!' : 'DEFEATED'}
            </motion.h2>
            
            {!isWinner && (
              <motion.p
                className="text-black/80 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Better luck next time!
              </motion.p>
            )}
          </div>
        </div>

        {/* Match Summary Card */}
        <div className="p-8">
          <h3 
            className="text-xl text-white mb-6 text-center"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
          >
            Match Summary
          </h3>

          {/* Stats Table */}
          <div className="glassmorphism rounded-lg border border-white/10 overflow-hidden mb-6">
            <table className="w-full text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-4 text-white/80">Metric</th>
                  <th className="text-center py-3 px-4 text-white/80">Your Score</th>
                  <th className="text-center py-3 px-4 text-white/80">Opponent</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-white/60">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time Taken
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-[#00FFFF]">{yourStats.time}</td>
                  <td className="py-3 px-4 text-center text-white/80">{opponentStats.time}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-white/60">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Correct Cases
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-[#00FF88]">{yourStats.correctCases}</td>
                  <td className="py-3 px-4 text-center text-white/80">{opponentStats.correctCases}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-white/60">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      AI Help Used
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-[#A259FF]">{yourStats.aiHelpUsed}</td>
                  <td className="py-3 px-4 text-center text-white/80">{opponentStats.aiHelpUsed}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white/60">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Bonus Points
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-[#00FF88]">{yourStats.bonusPoints}</td>
                  <td className="py-3 px-4 text-center text-white/80">{opponentStats.bonusPoints}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Player Cards */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Avatar className="w-16 h-16 border-4 border-[#00FFFF] mb-2">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=you" />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
              <span className="text-sm text-[#00FFFF]" style={{ fontWeight: 600 }}>
                You
              </span>
            </motion.div>

            <div className="text-3xl text-white/40">VS</div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Avatar className="w-16 h-16 border-4 border-[#A259FF] mb-2">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=opponent" />
                <AvatarFallback>OPP</AvatarFallback>
              </Avatar>
              <span className="text-sm text-[#A259FF]" style={{ fontWeight: 600 }}>
                Opponent
              </span>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onRematch}
              className="flex-1 bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 h-12"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              }}
            >
              <Trophy className="w-5 h-5 mr-2" />
              Rematch
            </Button>

            <Button
              onClick={onReturnToLobby}
              variant="outline"
              className="flex-1 glassmorphism border-[#A259FF]/30 text-white hover:border-[#A259FF] h-12"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Lobby
            </Button>
          </div>
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${isWinner ? 'rgba(0, 255, 136, 0.1)' : 'rgba(162, 89, 255, 0.1)'} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
