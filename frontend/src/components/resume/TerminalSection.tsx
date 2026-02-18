import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface TerminalSectionProps {
  className?: string;
}

const TerminalSection = ({ className = "" }: TerminalSectionProps) => {
  const [messages, setMessages] = useState<{ handle: string; msg: string; time: string }[]>([]);
  const [handle, setHandle] = useState('');
  const [message, setMessage] = useState('');

  // Fetch messages on mount
  useEffect(() => {
    fetch('http://localhost:3000/api/guestbook')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((item: any) => ({
            handle: item.name,
            msg: item.comment,
            time: new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          // Reverse if needed, but backend orders by DESC (newest first). 
          // Terminal usually shows oldest at top? 
          // Current UI maps top-to-bottom. If we want chat log style (newest at bottom), we differ via flex-col-reverse or just order.
          // The dummy data had 1 item.
          // The UI has `overflow-y-auto`.
          // Let's reverse fields from backend so oldest is first?
          // Backend returns newest first (DESC).
          setMessages(mapped.reverse());
        }
      })
      .catch(err => console.error('Failed to fetch guestbook:', err));
  });

  const sendMessage = async () => {
    if (!handle.trim() || !message.trim()) return;

    // Optimistic update
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const payload = { name: handle.trim(), comment: message.trim() };

    try {
      setMessages((prev) => [...prev, { handle: payload.name, msg: payload.comment, time }]);
      setMessage('');

      await fetch('http://localhost:3000/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      // specific error handling/revert if needed
    }
  };

  return (
    <section id="terminal" className={`py-24 ${className}`}>
      <div className="px-6 max-w-4xl mx-auto">
        <SectionHeader number="04" title="The Terminal" />
        <p className="text-muted-foreground mb-8">
          Leave a digital footprint. Say hello or drop a critique.
        </p>

        <div className="rounded-lg border border-border overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">public_ledger.sh</span>
          </div>

          {/* Terminal body */}
          <div className="bg-terminal p-4 font-mono text-sm min-h-[180px] max-h-[280px] overflow-y-auto">
            {messages.map((m, i) => (
              <p key={i} className="mb-1">
                <span className="text-terminal-green">{m.handle}</span>
                <span className="text-muted-foreground">@{m.time}</span>
                <span className="text-muted-foreground"> ~ </span>
                <span className="text-foreground">{m.msg}</span>
              </p>
            ))}
            <span className="inline-block w-2 h-4 bg-terminal-green animate-blink" />
          </div>

          {/* Input area */}
          <div className="flex border-t border-border">
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="your_handle"
              className="w-28 md:w-36 px-4 py-3 bg-card text-sm font-mono text-foreground placeholder:text-muted-foreground border-r border-border focus:outline-none"
            />
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Leave a message..."
              className="flex-1 px-4 py-3 bg-card text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-card text-muted-foreground hover:text-primary transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;
