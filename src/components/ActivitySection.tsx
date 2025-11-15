import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Clock, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function ActivitySection() {
  const activeRooms = [
    { users: ['Aisha', 'Ravi'], language: 'Python', timeLeft: '12 min', region: 'Asia' },
    { users: ['Emma', 'Lucas'], language: 'JavaScript', timeLeft: '8 min', region: 'Europe' },
    { users: ['Sofia', 'Chen'], language: 'Rust', timeLeft: '22 min', region: 'Americas' },
    { users: ['Alex', 'Jordan'], language: 'Go', timeLeft: '15 min', region: 'Oceania' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
            See Coders Pairing in <span className="text-[#00FFFF]">Real Time</span>
          </h2>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className="flex flex-wrap gap-4 mb-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Select>
            <SelectTrigger className="w-[180px] glassmorphism border-[#00FFFF]/20 text-white">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/20">
              <SelectItem value="python" className="text-white">Python</SelectItem>
              <SelectItem value="javascript" className="text-white">JavaScript</SelectItem>
              <SelectItem value="rust" className="text-white">Rust</SelectItem>
              <SelectItem value="go" className="text-white">Go</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] glassmorphism border-[#00FFFF]/20 text-white">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/20">
              <SelectItem value="beginner" className="text-white">Beginner</SelectItem>
              <SelectItem value="intermediate" className="text-white">Intermediate</SelectItem>
              <SelectItem value="advanced" className="text-white">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] glassmorphism border-[#00FFFF]/20 text-white">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#00FFFF]/20">
              <SelectItem value="americas" className="text-white">Americas</SelectItem>
              <SelectItem value="europe" className="text-white">Europe</SelectItem>
              <SelectItem value="asia" className="text-white">Asia</SelectItem>
              <SelectItem value="oceania" className="text-white">Oceania</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Live Map Visual */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-12 border border-[#00FFFF]/20"
          style={{
            height: '400px',
            boxShadow: '0 0 60px rgba(0, 255, 255, 0.2)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1570106413982-7f2897b8d0c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMG5ldHdvcmt8ZW58MXx8fHwxNzYyOTE5NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Global activity map"
            className="w-full h-full object-cover opacity-30"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/50" />

          {/* Animated connection points */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-[#00FFFF]"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Active Rooms */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeRooms.map((room, index) => (
            <motion.div
              key={index}
              className="glassmorphism rounded-xl p-6 border border-[#00FFFF]/20 hover:border-[#00FFFF]/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-2xl">👩‍💻</span>
                  <span className="text-white">{room.users[0]}</span>
                </div>
                <span className="text-white/40">&</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">🧑‍💻</span>
                  <span className="text-white">{room.users[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Badge 
                  variant="outline" 
                  className="border-[#00FFFF]/30 text-[#00FFFF]"
                >
                  {room.language}
                </Badge>
                
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Clock className="w-4 h-4" />
                  <span>Live Now ({room.timeLeft} left)</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4" />
                  <span>{room.region}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  <span className="text-sm text-[#00FF88]">Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
