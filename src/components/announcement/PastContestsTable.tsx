import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Trophy, Code2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface PastContest {
  id: string;
  platform: string;
  platformColor: string;
  name: string;
  endedOn: string;
  topRank: string;
}

export function PastContestsTable() {
  const [isExpanded, setIsExpanded] = useState(false);

  const pastContests: PastContest[] = [
    {
      id: '1',
      platform: 'Codeforces',
      platformColor: '#00FFFF',
      name: 'Global Round 27',
      endedOn: '10 Nov 2025',
      topRank: '1872',
    },
    {
      id: '2',
      platform: 'LeetCode',
      platformColor: '#FFB86C',
      name: 'Biweekly Contest 145',
      endedOn: '11 Nov 2025',
      topRank: '341',
    },
    {
      id: '3',
      platform: 'CodeChef',
      platformColor: '#A259FF',
      name: 'Starters 111',
      endedOn: '09 Nov 2025',
      topRank: '2145',
    },
    {
      id: '4',
      platform: 'AtCoder',
      platformColor: '#00FF88',
      name: 'Beginner Contest 348',
      endedOn: '08 Nov 2025',
      topRank: '987',
    },
    {
      id: '5',
      platform: 'Codeforces',
      platformColor: '#00FFFF',
      name: 'Round #986 (Div. 1)',
      endedOn: '07 Nov 2025',
      topRank: '1456',
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕔</span>
          <h2 
            className="text-2xl text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
          >
            Recent Contests & Results
          </h2>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="border-white/20 text-white hover:border-[#00FFFF]"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Expand
            </>
          )}
        </Button>
      </motion.div>

      {/* Table Container */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="glassmorphism rounded-xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/10 hover:bg-transparent">
                  <TableHead 
                    className="text-white/80"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Platform
                  </TableHead>
                  <TableHead 
                    className="text-white/80"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Contest Name
                  </TableHead>
                  <TableHead 
                    className="text-white/80"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Ended On
                  </TableHead>
                  <TableHead 
                    className="text-white/80"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Top Rank
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastContests.map((contest, i) => (
                  <motion.tr
                    key={contest.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${contest.platformColor}20` }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Code2 className="w-4 h-4" style={{ color: contest.platformColor }} />
                        </motion.div>
                        <span 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'JetBrains Mono, monospace',
                            color: contest.platformColor,
                          }}
                        >
                          {contest.platform}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell 
                      className="text-white"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {contest.name}
                    </TableCell>
                    <TableCell 
                      className="text-white/60"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {contest.endedOn}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-[#FFB86C]" />
                        <span 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'JetBrains Mono, monospace',
                            color: '#FFB86C',
                          }}
                        >
                          #{contest.topRank}
                        </span>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
