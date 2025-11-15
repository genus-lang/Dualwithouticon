import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertCircle, Lightbulb, FileCheck } from 'lucide-react';

export function AIAssistantSection() {
  const features = [
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: 'Explain My Error',
      description: 'Instantly understand what went wrong — no stack overflow needed.',
      color: '#FF00FF',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Smart Hints',
      description: 'AI suggests the next best step based on your code progress.',
      color: '#00FFFF',
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Code Review',
      description: 'Get automated peer reviews and score feedback instantly.',
      color: '#00FF88',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
            AI That <span className="text-[#FF00FF]">Codes With You</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Real-time debugging, explanations, and guidance inside the editor.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glassmorphism rounded-xl p-6 border border-[#FF00FF]/20 hover:border-[#FF00FF]/50 transition-all group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-lg transition-transform group-hover:scale-110 duration-300"
                    style={{ 
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </div>
                  
                  <div>
                    <h3 className="mb-2 text-white" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                      {feature.title}
                    </h3>
                    <p className="text-white/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Editor Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glassmorphism rounded-2xl overflow-hidden border border-[#FF00FF]/30"
              style={{ boxShadow: '0 0 60px rgba(255, 0, 255, 0.2)' }}
            >
              {/* Editor Header */}
              <div className="bg-[#1A1A1A] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 text-sm text-white/60">main.py</div>
              </div>

              {/* Editor Content */}
              <div className="p-6 font-mono text-sm">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608742213509-815b97c30b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB0ZXJtaW5hbCUyMHNjcmVlbnxlbnwxfHx8fDE3NjI4NzI0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Code editor"
                  className="w-full h-[300px] object-cover rounded-lg opacity-70"
                />

                {/* AI Hint Popup */}
                <motion.div
                  className="absolute bottom-12 right-8 glassmorphism rounded-lg p-4 border border-[#00FFFF]/50 max-w-xs"
                  style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00FFFF]/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-[#00FFFF]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#00FFFF] mb-1">AI Suggestion</div>
                      <div className="text-xs text-white/80">
                        Consider using a list comprehension here for better performance
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Split View Indicators */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
                <motion.div
                  className="w-2 h-16 rounded-full bg-[#00FFFF]/50"
                  animate={{ height: [64, 80, 64] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-16 rounded-full bg-[#FF00FF]/50"
                  animate={{ height: [64, 80, 64] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Floating Cursors */}
            <motion.div
              className="absolute top-20 left-10 flex items-center gap-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-6 rounded-full bg-[#00FFFF] border-2 border-white" />
              <div className="text-xs text-white bg-[#00FFFF]/20 px-2 py-1 rounded">User 1</div>
            </motion.div>

            <motion.div
              className="absolute top-32 right-10 flex items-center gap-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-6 h-6 rounded-full bg-[#FF00FF] border-2 border-white" />
              <div className="text-xs text-white bg-[#FF00FF]/20 px-2 py-1 rounded">User 2</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
