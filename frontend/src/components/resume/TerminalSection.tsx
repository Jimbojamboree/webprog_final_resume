import { useState } from 'react';
import { Send } from 'lucide-react';
import SectionHeader from './SectionHeader';

const TerminalSection = () => {
  const [messages, setMessages] = useState<{ handle: string; msg: string; time: string }[]>([
    {
      handle: 'system',
      msg: 'Welcome to the public ledger. Leave your mark.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [handle, setHandle] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!handle.trim() || !message.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { handle: handle.trim(), msg: message.trim(), time }]);
    setMessage('');
  };

  return (
    <section id="terminal" className="py-24 px-6 max-w-4xl mx-auto">
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
    </section>
  );
};

export default TerminalSection;
