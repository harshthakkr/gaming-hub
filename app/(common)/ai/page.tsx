"use client";

import { Spinner } from "@/components/Spinner";
import axios from "axios";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AI = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMessage = { role: "user", content: query };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post("/api/ai", { messages: newMessages });
      const aiMessage = { role: "assistant", content: res.data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-supreme h-[calc(100vh-73px-2rem)] flex flex-col dark:bg-neutral-900 bg-neutral-900/10 rounded-lg min-w-screen lg:min-w-xl mx-auto">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 min-h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center flex-1 text-neutral-500">
              Ask me anything about games!
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.role === "user"
                    ? "ml-auto bg-accent/80 rounded-full rounded-br-none w-fit"
                    : "mr-auto"
                } p-4 max-w-3xl`}
              >
                {msg.role === "user" ? (
                  <p className="text-white">{msg.content}</p>
                ) : (
                  <div
                    className="text-white prose prose-invert max-w-none
                    [&>*]:mb-4 [&>*:last-child]:mb-0
                    [&_h1]:text-xl [&_h1]:font-bold [&_h1:first-child]:mt-0
                    [&_h2]:text-lg [&_h2]:font-semibold
                    [&_ul]:list-disc [&_ul]:pl-6
                    [&_ol]:list-decimal [&_ol]:pl-6
                    [&_code]:bg-neutral-950 [&_code]:text-blue-400 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
                    [&_pre]:bg-neutral-950 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
                    [&_pre_code]:bg-transparent [&_pre_code]:p-0
                    [&_a]:text-blue-400 [&_a]:underline
                    [&_blockquote]:border-l-4 [&_blockquote]:border-neutral-600 [&_blockquote]:pl-4 [&_blockquote]:italic"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="p-4 flex items-center gap-2">
              <Spinner />
              <p className="text-neutral-400">Thinking...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-neutral-700">
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Ask me about games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full dark:bg-neutral-800 text-white border border-neutral-700 p-4 pr-14 rounded-xl focus:outline-none"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/80 duration-200 p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AI;
