import { motion } from 'motion/react';
import { Link, Code, Bot } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Link className="w-12 h-12" />,
      title: '1. Match',
      description: 'Get auto-paired with a coder who matches your level or interests.',
      color: '#00FFFF',
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: '2. Code',
      description: 'Collaborate live with split-screen editor, voice chat, and timer.',
      color: '#FF00FF',
    },
    {
      icon: <Bot className="w-12 h-12" />,
      title: '3. Learn',
      description: 'Use built-in AI to debug, explain errors, and review together.',
      color: '#00FF88',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
            How Dual Coding <span className="text-[#00FFFF]">Works</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Jump in, code with others, and improve faster.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div 
                className="glassmorphism rounded-2xl p-8 border border-[#00FFFF]/20 hover:border-[#00FFFF]/50 transition-all h-full"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div 
                  className="mb-6 transition-transform group-hover:scale-110 duration-300"
                  style={{ color: step.color }}
                >
                  {step.icon}
                </div>
                
                <h3 className="mb-4 text-white" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  {step.title}
                </h3>
                
                <p className="text-white/70">
                  {step.description}
                </p>

                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 40px ${step.color}30`,
                  }}
                />
              </div>

              {/* Connecting Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#00FFFF]/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
