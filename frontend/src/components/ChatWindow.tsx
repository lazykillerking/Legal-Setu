"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const MOCK_RESPONSE =
  "This is a mock response — no backend is wired up yet. Once connected, this reply will come from the Legal Orchestrator, routed to the relevant specialized agent.";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm Legal Setu. Ask me a legal question in plain language and I'll route it to the right agent.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Stubbed response — replace with real /api/chat call once backend is wired.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: MOCK_RESPONSE },
      ]);
      setIsTyping(false);
    }, 700);
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[65%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-gold-400 text-navy-950"
                  : "bg-navy-800 text-white/90 border border-white/10"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-lg px-4 py-3 text-sm bg-navy-800 border border-white/10 text-white/50">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 bg-navy-900 p-4 flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your legal question..."
          className="flex-1 rounded-md bg-navy-800 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
        />
        <button
          type="submit"
          className="rounded-md bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 hover:bg-gold-300 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
