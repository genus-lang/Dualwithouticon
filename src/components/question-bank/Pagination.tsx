import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Previous Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full glassmorphism border border-[#00FFFF]/20 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00FFFF]"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              className="w-10 h-10 rounded-full glassmorphism border relative"
              style={{
                borderColor: isActive ? '#00FFFF' : 'rgba(255, 255, 255, 0.1)',
                color: isActive ? '#00FFFF' : 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                background: isActive ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {page}
              
              {/* Pulsing Effect for Active Page */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#00FFFF]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full glassmorphism border border-[#00FFFF]/20 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00FFFF]"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Page Info */}
      <div 
        className="ml-4 text-sm text-white/60"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
