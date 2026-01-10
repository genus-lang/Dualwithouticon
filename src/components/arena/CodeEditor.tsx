import { useState, useEffect } from 'react';

interface CodeEditorProps {
  side: 'left' | 'right';
  userName: string;
  userColor: string;
  isActive: boolean;
}

export function CodeEditor({ side, userName, userColor, isActive }: CodeEditorProps) {
  const [code, setCode] = useState(
    `def reverse_linked_list(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`
  );

  const [cursorPosition, setCursorPosition] = useState({ line: 3, col: 8 });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCursorPosition({
          line: Math.floor(Math.random() * 10) + 1,
          col: Math.floor(Math.random() * 20) + 1,
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className="flex-1 flex flex-col bg-[#0A0F1C] relative">
      {/* Header */}
      <div 
        className="h-12 border-b flex items-center justify-between px-4"
        style={{ 
          borderColor: `${userColor}40`,
          backgroundColor: `${userColor}10`,
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: isActive ? '#00FF88' : '#666' }}
          />
          <span 
            className="text-sm"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              color: isActive ? '#00FF88' : '#666',
            }}
          >
            {isActive ? '🟢 Your Turn' : '🔴 Opponent\'s Turn'}
          </span>
          <span className="text-white/40 text-sm ml-4">|</span>
          <span className="text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {userName}
          </span>
        </div>

        <div className="text-xs text-white/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          main.py
        </div>
      </div>

      {/* Problem Title */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="text-sm text-white/60 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Problem:
        </div>
        <div className="text-white" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
          Reverse a Linked List
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 p-4 overflow-auto relative">
        <div className="font-mono text-sm leading-relaxed">
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex group hover:bg-white/5">
              {/* Line Number */}
              <div className="w-12 text-white/30 select-none flex-shrink-0 text-right pr-4">
                {i + 1}
              </div>

              {/* Code Line */}
              <div className="flex-1 relative">
                <pre className="text-white/90">
                  <code dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
                </pre>

                {/* Cursor */}
                {isActive && cursorPosition.line === i + 1 && (
                  <div
                    className="absolute top-0 w-0.5 h-5"
                    style={{ 
                      left: `${cursorPosition.col * 8.5}px`,
                      backgroundColor: userColor,
                      boxShadow: `0 0 10px ${userColor}`,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Typing Indicator */}
        {isActive && (
          <div
            className="absolute bottom-4 right-4 flex items-center gap-2 glassmorphism px-3 py-2 rounded-lg border"
            style={{ borderColor: `${userColor}40` }}
          >
            <span className="text-xs text-white/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {userName} is typing
            </span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: userColor }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: userColor }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: userColor }} />
            </div>
          </div>
        )}
      </div>

      {/* Vertical Border */}
      {side === 'left' && (
        <div 
          className="absolute top-0 right-0 w-px h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, ${userColor}80, transparent)`,
            boxShadow: `0 0 10px ${userColor}`,
          }}
        />
      )}
    </div>
  );
}

function highlightSyntax(line: string): string {
  // Simple syntax highlighting
  let highlighted = line;
  
  // Keywords
  const keywords = ['def', 'return', 'while', 'None', 'class', 'if', 'else', 'for', 'in'];
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span style="color: #FF00FF">${keyword}</span>`);
  });
  
  // Functions
  highlighted = highlighted.replace(/\b([a-z_][a-z0-9_]*)\(/g, '<span style="color: #00FFFF">$1</span>(');
  
  // Variables
  highlighted = highlighted.replace(/\b([a-z_][a-z0-9_]*)\b/g, '<span style="color: #00FF88">$1</span>');
  
  // Strings
  highlighted = highlighted.replace(/(['"])(.*?)\1/g, '<span style="color: #FFB86C">$1$2$1</span>');
  
  // Comments
  highlighted = highlighted.replace(/(#.*$)/g, '<span style="color: #6272A4">$1</span>');
  
  return highlighted;
}
