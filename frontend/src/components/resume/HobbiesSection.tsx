import { useState } from 'react';
import { Power, Send } from 'lucide-react';
import SectionHeader from './SectionHeader';

const HobbiesSection = () => {
  const [pcOn, setPcOn] = useState(false);
  const [messages, setMessages] = useState<{ handle: string; msg: string }[]>([]);
  const [handle, setHandle] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!handle.trim() || !message.trim()) return;
    setMessages((prev) => [...prev, { handle: handle.trim(), msg: message.trim() }]);
    setMessage('');
  };

  return (
    <section id="hobbies" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeader number="03" title="Hobbies" />

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* ── Desktop PC ── */}
        <div>
          <h3 className="font-mono text-sm text-muted-foreground mb-6 tracking-wide">
            💻 Computer Programming
          </h3>

          <div className="flex flex-col items-center">
            {/* Monitor */}
            <div className="relative w-full max-w-sm">
              <div className="bg-muted rounded-lg p-2.5 border-2 border-border">
                <div className="bg-terminal rounded aspect-[16/10] flex items-center justify-center overflow-hidden">
                  {pcOn ? (
                    <div className="w-full h-full p-3 font-mono text-[11px] leading-relaxed overflow-y-auto">
                      <p className="text-terminal-green">
                        system@desktop ~$ <span className="text-foreground">Welcome. Type below.</span>
                      </p>
                      {messages.map((m, i) => (
                        <p key={i} className="text-terminal-green mt-0.5">
                          <span className="text-primary">{m.handle}</span>
                          <span className="text-muted-foreground">: </span>
                          <span className="text-foreground">{m.msg}</span>
                        </p>
                      ))}
                      <span className="inline-block w-1.5 h-3.5 bg-terminal-green animate-blink mt-0.5" />
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground select-none">
                      <Power size={22} className="mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-mono">Awaiting Input...</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Stand */}
              <div className="mx-auto w-14 h-5 bg-muted border-x-2 border-border" />
              <div className="mx-auto w-24 h-2 bg-muted rounded-b-md border-2 border-t-0 border-border" />
            </div>

            {/* CPU Tower + Controls */}
            <div className="mt-5 flex items-start gap-4 w-full max-w-sm">
              {/* CPU */}
              <div className="w-16 h-24 bg-muted rounded border-2 border-border flex flex-col items-center justify-between py-2.5 shrink-0">
                <div className="space-y-1.5">
                  <div className="w-8 h-0.5 bg-border rounded" />
                  <div className="w-8 h-0.5 bg-border rounded" />
                </div>
                <button
                  onClick={() => setPcOn(!pcOn)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    pcOn
                      ? 'border-terminal-green text-terminal-green'
                      : 'border-border text-muted-foreground'
                  }`}
                  style={pcOn ? { boxShadow: '0 0 8px hsl(var(--terminal-green) / 0.5)' } : undefined}
                >
                  <Power size={10} />
                </button>
              </div>

              {/* Chat inputs (visible when on) */}
              {pcOn && (
                <div className="flex-1 flex flex-col gap-2 pt-1">
                  <div className="flex gap-2">
                    <input
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="handle"
                      className="w-20 px-2 py-1.5 text-xs font-mono bg-card border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    />
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="type a message..."
                      className="flex-1 px-2 py-1.5 text-xs font-mono bg-card border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile Phone ── */}
        <div>
          <h3 className="font-mono text-sm text-muted-foreground mb-6 tracking-wide">
            📱 Mobile Gaming
          </h3>

          <div className="flex justify-center">
            <div className="w-44 h-[340px] bg-muted rounded-[2rem] border-2 border-border p-2 relative shadow-lg">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-card rounded-b-xl z-10" />

              {/* Screen */}
              <div className="w-full h-full bg-terminal rounded-[1.4rem] overflow-hidden flex flex-col">
                {/* Game HUD */}
                <div className="pt-6 px-3 pb-2 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-terminal-green">SCORE: 1250</span>
                  <span className="text-[9px] font-mono text-primary">★★★</span>
                  <span className="text-[9px] font-mono text-terminal-green">HI: 3400</span>
                </div>

                {/* Game area */}
                <div className="flex-1 relative px-3">
                  {/* Enemies */}
                  <div className="grid grid-cols-5 gap-1.5 mb-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${
                          [1, 3, 5, 7, 9].includes(i)
                            ? 'bg-primary/80'
                            : 'bg-terminal-green/60'
                        }`}
                        style={{
                          animation: `float ${1.5 + (i % 3) * 0.3}s ease-in-out infinite alternate`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Stars */}
                  {[
                    { top: '40%', left: '20%' },
                    { top: '55%', left: '70%' },
                    { top: '45%', left: '45%' },
                    { top: '65%', left: '15%' },
                    { top: '50%', left: '85%' },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-0.5 rounded-full bg-foreground/30"
                      style={{ ...pos, animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite` }}
                    />
                  ))}

                  {/* Player ship */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-primary" />
                  </div>
                </div>

                {/* Controls */}
                <div className="p-3 flex justify-center gap-8">
                  <div className="w-7 h-7 border border-muted-foreground/30 rounded-full flex items-center justify-center text-muted-foreground text-[10px]">
                    ◀
                  </div>
                  <div className="w-7 h-7 border border-primary/50 rounded-full flex items-center justify-center text-primary text-[10px]">
                    ●
                  </div>
                  <div className="w-7 h-7 border border-muted-foreground/30 rounded-full flex items-center justify-center text-muted-foreground text-[10px]">
                    ▶
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframes for game animations */}
      <style>{`
        @keyframes float {
          from { transform: translateY(0); }
          to { transform: translateY(3px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HobbiesSection;
