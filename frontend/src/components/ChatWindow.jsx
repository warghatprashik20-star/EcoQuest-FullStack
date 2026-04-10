import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble.jsx";
import QuizCard from "./QuizCard.jsx";
import { sendMessage } from "../services/api.js";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      type: "text",
      content:
        "Hi! I'm your AI learning assistant. Tell me your goal (e.g., 'learn basic algebra' or 'prepare for a JavaScript interview') and I'll create a personalized learning path for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      type: "text",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage({ message: trimmed });
      const data = response.data;

      if (data.type === "quiz") {
        const quizMessage = {
          id: `quiz-${Date.now()}`,
          sender: "ai",
          type: "quiz",
          question: data.question,
          options: data.options || [],
          correctOption: data.correctOption,
          explanation: data.explanation,
          selectedOption: null,
        };
        setMessages((prev) => [...prev, quizMessage]);
      } else {
        const aiMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          type: "text",
          content: data.message || "I'm here to help you learn!",
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error sending message", error);
      const errorMessage =
        error.response?.data?.message ||
        "Sorry, I couldn't reach the learning assistant. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "ai",
          type: "text",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuizSelect = (id, value) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, selectedOption: value } : msg
      )
    );
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)] min-h-[400px] sm:min-h-[500px] rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in">
      <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-slate-50/60">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Personalized Learning Chatbot
          </p>
          <p className="text-xs text-slate-500">
            Ask questions, get explanations, and practice with quizzes.
          </p>
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
          Live
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin bg-gradient-to-b from-slate-50 to-slate-100/60"
      >
        {messages.map((msg) =>
          msg.type === "quiz" ? (
            <QuizCard
              key={msg.id}
              question={msg.question}
              options={msg.options}
              selectedOption={msg.selectedOption}
              correctOption={msg.correctOption}
              explanation={msg.explanation}
              onSelect={(value) => handleQuizSelect(msg.id, value)}
            />
          ) : (
            <MessageBubble
              key={msg.id}
              sender={msg.sender}
              content={msg.content}
            />
          )
        )}
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white border border-slate-100 px-4 py-3 shadow-sm">
              <span className="typing-dot h-2 w-2 rounded-full bg-indigo-400" />
              <span className="typing-dot h-2 w-2 rounded-full bg-indigo-400" />
              <span className="typing-dot h-2 w-2 rounded-full bg-indigo-400" />
              <span className="ml-1 text-xs text-slate-400">Thinking…</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your subject, or request a quiz..."
            className="flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-200"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn-press inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5L19.5 12 4.5 4.5 7.5 12l-3 7.5z"
              />
            </svg>
            Send
          </button>
        </div>
        <p className="mt-1 text-[11px] text-slate-400">
          The assistant can generate explanations, examples, and quick quizzes based on your level.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;

