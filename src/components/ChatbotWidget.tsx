import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { MessageSquare, X, Send, Bot, Shield, Loader, Terminal, ArrowRight, CornerDownLeft } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      parts: [{ text: "Hello! I am the Impulse Digital Solutions AI Ambassador. How can I assist you with cybersecurity, AEO, branding, or UAE expansion questions today?" }]
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested prompt chips for high engagement
  const chips = [
    "What is AEO & AI Search?",
    "How does 24/7 Media Monitoring work?",
    "Tell me about Dubai market entry",
    "Are websites built security-first?"
  ];

  // Auto-scroll inside chat drawer
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: textToSend }]
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role,
        parts: m.parts
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to reach AI agent.");
      }

      const botMessage: ChatMessage = {
        role: "model",
        parts: [{ text: data.text }]
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: `Handshake error: Unable to contact endpoint. ${err.message || ""}. Please try again.` }]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Icon */}
      <button
        id="btn-bot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_5px_25px_rgba(6,182,212,0.4)] hover:shadow-[0_5px_30px_rgba(6,182,212,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="absolute inset-x-0 inset-y-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? <X className="w-5.5 h-5.5 animate-[spin_0.3s_ease]" /> : <MessageSquare className="w-6 h-6" />}
        
        {/* Neon ping signal indicator */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
        )}
      </button>

      {/* Floating Chat Panel Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[90vw] sm:w-[400px] h-[480px] sm:h-[550px] max-h-[calc(100vh-120px)] bg-[#030712]/90 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col overflow-hidden animate-[fadeIn_0.25s_ease-out]">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center font-mono">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">IDS Assistant</span>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE SECURE CORE
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Interactive Messages Display */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 scroll-behavior-smooth bg-slate-950/20"
          >
            {messages.map((m, idx) => {
              const isBot = m.role === "model";
              return (
                <div key={idx} className={`flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2 max-w-full`}>
                  
                  {isBot && (
                    <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed max-w-[80%] ${
                      isBot
                        ? "bg-white/5 border border-white/10 text-slate-100"
                        : "bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md rounded-tr-none"
                    }`}
                  >
                    {m.parts[0].text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Loader className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Generating neural feed...</span>
                </div>
              </div>
            )}
          </div>

          {/* Prompt chips suggestions */}
          <div className="p-3 border-t border-white/5 bg-slate-950/45 flex flex-wrap gap-1.5 shrink-0">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="text-[10px] font-sans font-medium px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/20 text-slate-300 transition-all cursor-pointer hover:text-cyan-400 block shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Form input */}
          <div className="p-3 bg-slate-950/70 border-t border-white/10 flex items-center gap-2 shrink-0">
            <input
              type="text"
              className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-slate-900 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs text-white outline-none transition-all placeholder:text-slate-500"
              placeholder="Ask IDS security, visibility, or growth scope..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <button
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim() || loading}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 disabled:opacity-40 text-white hover:shadow-cyan-500/10 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Styled inline keyframes for dropdown opening */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}
