import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import { TrendingUp } from 'lucide-react';

type ViewType = 'line' | 'radar';

export function PerformanceGraph() {
  const [view, setView] = useState<ViewType>('line');

  // Line chart data - rating over time
  const lineData = [
    { match: 'M1', rating: 1200 },
    { match: 'M2', rating: 1350 },
    { match: 'M3', rating: 1280 },
    { match: 'M4', rating: 1420 },
    { match: 'M5', rating: 1550 },
    { match: 'M6', rating: 1480 },
    { match: 'M7', rating: 1620 },
    { match: 'M8', rating: 1700 },
    { match: 'M9', rating: 1780 },
    { match: 'M10', rating: 1823 },
  ];

  // Radar chart data - skill analysis
  const radarData = [
    { skill: 'Speed', value: 85 },
    { skill: 'Accuracy', value: 87 },
    { skill: 'Problem Solving', value: 92 },
    { skill: 'Debugging', value: 78 },
    { skill: 'Creativity', value: 88 },
  ];

  return (
    <div>
      {/* Section Header */}
      <motion.div
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <h2 
            className="text-2xl text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
          >
            Performance Analytics
          </h2>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={view === 'line' ? 'default' : 'outline'}
            onClick={() => setView('line')}
            className={
              view === 'line'
                ? 'bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90'
                : 'border-white/20 text-white/60 hover:text-white hover:border-[#00FFFF]'
            }
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Line View
          </Button>
          <Button
            size="sm"
            variant={view === 'radar' ? 'default' : 'outline'}
            onClick={() => setView('radar')}
            className={
              view === 'radar'
                ? 'bg-[#A259FF] text-white hover:bg-[#A259FF]/90'
                : 'border-white/20 text-white/60 hover:text-white hover:border-[#A259FF]'
            }
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Radar View
          </Button>
        </div>
      </motion.div>

      {/* Chart Container */}
      <motion.div
        className="glassmorphism rounded-xl p-6 border border-[#00FFFF]/20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          animate={{
            background: view === 'line'
              ? [
                  'radial-gradient(circle at 0% 100%, #00FFFF 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 0%, #00FFFF 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 100%, #00FFFF 0%, transparent 50%)',
                ]
              : [
                  'radial-gradient(circle at 50% 50%, #A259FF 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, #00FFFF 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, #A259FF 0%, transparent 50%)',
                ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Chart */}
        <div className="relative z-10 h-80">
          {view === 'line' ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="match" 
                  stroke="rgba(255, 255, 255, 0.5)"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                />
                <YAxis 
                  stroke="rgba(255, 255, 255, 0.5)"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                  domain={[1000, 2000]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    borderRadius: '8px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#00FFFF' }}
                  itemStyle={{ color: '#00FFFF' }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#00FFFF"
                  strokeWidth={3}
                  dot={{ fill: '#00FFFF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#00FFFF', strokeWidth: 0 }}
                  style={{ filter: 'drop-shadow(0 0 8px #00FFFF)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                <PolarAngleAxis
                  dataKey="skill"
                  stroke="rgba(255, 255, 255, 0.6)"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  stroke="rgba(255, 255, 255, 0.3)"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    border: '1px solid rgba(162, 89, 255, 0.3)',
                    borderRadius: '8px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#A259FF' }}
                  itemStyle={{ color: '#A259FF' }}
                />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#A259FF"
                  fill="#A259FF"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  style={{ filter: 'drop-shadow(0 0 8px #A259FF)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 flex items-center justify-between text-sm border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-[#00FF88]">
            <TrendingUp className="w-4 h-4" />
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {view === 'line' ? '+623 rating gain' : 'Average: 86%'}
            </span>
          </div>
          <div className="text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {view === 'line' ? 'Last 10 matches' : 'Overall skill distribution'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
