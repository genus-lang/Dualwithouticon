import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Users, Trophy } from 'lucide-react';

export function CommunitySection() {
  const posts = [
    {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      username: 'AlexCoder',
      text: 'Just finished an amazing Python session! Learned so much about async programming.',
      tags: ['Python', 'Beginner'],
    },
    {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      username: 'SarahDev',
      text: 'The AI assistant helped me debug a tricky React hook issue in minutes!',
      tags: ['JavaScript', 'React'],
    },
    {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      username: 'MikeRust',
      text: 'Won my first friendly match today! The competitive coding is addictive 🔥',
      tags: ['Rust', 'Advanced'],
    },
  ];

  const contests = [
    {
      title: 'Global Code Sprint 2025',
      date: 'Nov 25, 2025',
      participants: '2,451',
      prize: '$5,000',
    },
    {
      title: 'AI Hackathon Weekend',
      date: 'Dec 1, 2025',
      participants: '1,892',
      prize: '$3,000',
    },
  ];

  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00FF88]/5 via-transparent to-[#00FF88]/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
            Join the Global <span className="text-[#00FF88]">Coding Community</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Learn, compete, and share with coders worldwide.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Community Feed */}
          <div>
            <h3 className="mb-6 text-white flex items-center gap-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              <Users className="w-6 h-6 text-[#00FF88]" />
              Community Feed
            </h3>

            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  className="glassmorphism rounded-xl p-6 border border-[#00FF88]/20 hover:border-[#00FF88]/50 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 border-2 border-[#00FF88]/50">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.username[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="mb-2" style={{ fontWeight: 600 }}>
                        {post.username}
                      </div>
                      <p className="text-white/80 mb-3">
                        {post.text}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map((tag, i) => (
                          <Badge 
                            key={i}
                            variant="outline"
                            className="border-[#00FF88]/30 text-[#00FF88] text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                variant="outline"
                className="glassmorphism border-[#00FF88]/30 text-white hover:border-[#00FF88] hover:bg-[#00FF88]/10"
              >
                View All Posts
              </Button>
            </motion.div>
          </div>

          {/* Upcoming Contests */}
          <div>
            <h3 className="mb-6 text-white flex items-center gap-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              <Trophy className="w-6 h-6 text-[#00FFFF]" />
              Upcoming Contests
            </h3>

            <div className="space-y-6">
              {contests.map((contest, index) => (
                <motion.div
                  key={index}
                  className="glassmorphism rounded-xl p-8 border border-[#00FFFF]/20 hover:border-[#00FFFF]/50 transition-all group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
                >
                  <div className="mb-4">
                    <h4 className="text-white mb-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                      {contest.title}
                    </h4>
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="w-4 h-4" />
                      <span>Starts {contest.date}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glassmorphism rounded-lg p-4 border border-white/10">
                      <div className="text-sm text-white/60 mb-1">Participants</div>
                      <div className="text-white" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {contest.participants}
                      </div>
                    </div>

                    <div className="glassmorphism rounded-lg p-4 border border-white/10">
                      <div className="text-sm text-white/60 mb-1">Prize Pool</div>
                      <div className="text-[#00FFFF]" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {contest.prize}
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all"
                  >
                    Register Now
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 glassmorphism rounded-xl p-6 border border-[#FF00FF]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-white mb-2" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                Host Your Own Contest
              </h4>
              <p className="text-white/70 mb-4 text-sm">
                Create custom coding challenges for your team or community
              </p>
              <Button 
                variant="outline"
                className="border-[#FF00FF]/30 text-white hover:border-[#FF00FF] hover:bg-[#FF00FF]/10"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
