import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

interface Message {
  id: number;
  user: string;
  text: string;
  color: string;
  timestamp: string;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: 'AlexDev',
      text: "Hey! Ready to solve this?",
      color: '#00FFFF',
      timestamp: '12:45',
    },
    {
      id: 2,
      user: 'SarahCode',
      text: "Let's do it! I'll start with the base case",
      color: '#FF00FF',
      timestamp: '12:45',
    },
    {
      id: 3,
      user: 'AlexDev',
      text: "Let's fix line 23!",
      color: '#00FFFF',
      timestamp: '12:46',
    },
    {
      id: 4,
      user: 'SarahCode',
      text: "Done ✅",
      color: '#FF00FF',
      timestamp: '12:46',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      user: 'You',
      text: inputValue,
      color: '#00FF88',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setHasNewMessage(true);
    setTimeout(() => setHasNewMessage(false), 1000);
  };

  return (
    <div className="w-64 bg-[#0A0F1C] border-r border-[#00FFFF]/20 flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-[#00FFFF]/20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center relative">
            <MessageSquare className="w-5 h-5 text-[#00FFFF]" />
            {hasNewMessage && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00FF88]"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            Live Chat
          </span>
        </div>

        <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className="space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-baseline gap-2">
                <span 
                  className="text-xs"
                  style={{ 
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: message.color,
                  }}
                >
                  &lt;{message.user}&gt;
                </span>
                <span className="text-xs text-white/40">
                  {message.timestamp}
                </span>
              </div>
              <div 
                className="text-sm text-white/80 pl-2 border-l-2"
                style={{ 
                  borderColor: `${message.color}40`,
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {message.text}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <motion.div
            className="flex items-center gap-2 text-xs text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              &lt;SarahCode&gt; is typing
            </span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#FF00FF]" />
              <div className="w-1 h-1 rounded-full bg-[#FF00FF]" />
              <div className="w-1 h-1 rounded-full bg-[#FF00FF]" />
            </div>
          </motion.div>
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t border-[#00FFFF]/20">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type message..."
            className="flex-1 h-9 bg-white/5 border-[#00FFFF]/20 text-white placeholder:text-white/40 text-sm"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          />
          <Button
            size="icon"
            onClick={handleSend}
            className="h-9 w-9 bg-[#00FFFF]/20 hover:bg-[#00FFFF]/30 text-[#00FFFF]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            onClick={() => setInputValue('Nice work! 👍')}
          >
            👍 Nice
          </button>
          <button
            className="flex-1 text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            onClick={() => setInputValue('Need help here')}
          >
            🤔 Help
          </button>
        </div>
      </div>
    </div>
  );
}
