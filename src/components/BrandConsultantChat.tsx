import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { BrandBible, ChatMessage } from '../types/brand';

interface BrandConsultantChatProps {
  brand: BrandBible;
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const BrandConsultantChat: React.FC<BrandConsultantChatProps> = ({
  brand,
  isOpen,
  onClose,
  messages,
  setMessages,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Initial welcome message if conversation is empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'model',
          text: `Welcome to the AuraBrand Design Direction Suite. I'm your Creative Director and Principal Brand Strategist.\n\nI've analyzed your brand identity for **${brand.companyName}** ("*${brand.tagline}*"). How can I help refine or expand your brand bible today? Ask me for alternative taglines, landing page color allocation, investor elevator pitches, or social media guidelines!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'gemini-3.8-flash',
        },
      ]);
    }
  }, [brand.companyName]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update messages with user query immediately
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputText('');
    setIsSending(true);

    try {
      // Send conversation history to backend /api/brand/chat
      const response = await fetch('/api/brand/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          currentBrandContext: brand,
          requestedModel: selectedModel,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get chat response');
      }

      const botMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `Error communicating with brand consultant: ${err.message}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: 'model',
        text: `Fresh brand consultation started for **${brand.companyName}**. What design or strategic challenge would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
  };

  const suggestions = [
    `Suggest 5 alternative taglines for ${brand.companyName}`,
    `How should we allocate our 5 colors on a landing page hero?`,
    `Write a 30-second investor pitch script incorporating our mission`,
    `What are ideal secondary button styles with this palette?`,
    `Draft Instagram & LinkedIn voice guidelines for our brand`,
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-zinc-950/95 border-l border-zinc-800 shadow-2xl backdrop-blur-2xl transition-all duration-300">
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 bg-zinc-900/60">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Brand Director AI</h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-zinc-400">
              Creative Strategy • {brand.companyName} Context Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearChat}
            className="rounded-lg p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title="Reset Conversation"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title="Close Drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Model Selector Bar (gemini-4-argon, gemini-3.8-flash, gemini-3.1-flash-lite) */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/60 px-4 py-2 text-xs">
        <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5">
          <SlidersHorizontal className="h-3 w-3 text-indigo-400" />
          Intelligence Tier:
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSelectedModel('gemini-3.8-flash')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
              selectedModel === 'gemini-3.8-flash'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
            title="gemini-3.8-flash (General brand consulting)"
          >
            3.8 Flash
          </button>
          <button
            type="button"
            onClick={() => setSelectedModel('gemini-4-argon')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
              selectedModel === 'gemini-4-argon'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
            title="gemini-4-argon (Particularly complex strategy tasks)"
          >
            4 Argon (Pro)
          </button>
          <button
            type="button"
            onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
              selectedModel === 'gemini-3.1-flash-lite'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
            title="gemini-3.1-flash-lite (Fast copy & quick answers)"
          >
            3.1 Lite (Fast)
          </button>
        </div>
      </div>

      {/* Messages Scrollable Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-zinc-500">
                <span className="font-semibold text-zinc-400">
                  {isUser ? 'You' : 'Creative Director'}
                </span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {msg.modelUsed && (
                  <span className="rounded bg-zinc-800 px-1 py-0.2 text-[9px] font-mono text-indigo-400">
                    {msg.modelUsed}
                  </span>
                )}
              </div>

              <div
                className={`relative max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
                }`}
              >
                {/* Text formatting with paragraphs */}
                <div className="whitespace-pre-wrap space-y-2">{msg.text}</div>

                {/* Copy message button */}
                <button
                  type="button"
                  onClick={() => copyMessage(msg.text, msg.id)}
                  className={`absolute -bottom-2 ${
                    isUser ? 'left-2' : 'right-2'
                  } rounded-md bg-zinc-800/90 p-1 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white border border-zinc-700`}
                  title="Copy text"
                >
                  {copiedId === msg.id ? (
                    <Check className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex flex-col items-start space-y-1">
            <span className="text-[10px] text-zinc-500">Brand Director is formulating strategy...</span>
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs text-zinc-300">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-indigo-400" />
              <span>Analyzing with {selectedModel}...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="border-t border-zinc-800/80 bg-zinc-950/80 px-4 py-2.5">
        <span className="text-[10px] font-semibold text-zinc-500 flex items-center gap-1 mb-1.5 uppercase tracking-wider">
          <Lightbulb className="h-3 w-3 text-amber-400" /> Quick Creative Inquiries:
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(s)}
              className="whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 hover:text-white transition-all shrink-0"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="border-t border-zinc-800 bg-zinc-900/90 p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2"
        >
          <textarea
            ref={inputRef}
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Ask your Brand Director anything about ${brand.companyName}... (Shift+Enter for new line)`}
            className="w-full rounded-xl border border-zinc-700/80 bg-zinc-950 p-3 pr-12 text-xs text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className={`absolute right-3 rounded-lg p-2 transition-all ${
              !inputText.trim() || isSending
                ? 'text-zinc-600 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95'
            }`}
            title="Send Message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
