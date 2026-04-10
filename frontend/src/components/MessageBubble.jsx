function MessageBubble({ sender, content }) {
  const isUser = sender === "user";

  return (
    <div
      className={[
        "flex w-full animate-slide-up",
        isUser ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      <div
        className={[
          "max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm transition-shadow duration-200 hover:shadow-md",
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white text-slate-900 border border-slate-100 rounded-bl-sm",
        ].join(" ")}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  );
}

export default MessageBubble;

