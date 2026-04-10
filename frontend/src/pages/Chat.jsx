import ChatWindow from "../components/ChatWindow.jsx";

function Chat() {
  return (
    <section className="min-h-[calc(100vh-5rem)]">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Chat
            </h2>
            <p className="text-xs text-slate-500">
              Ask questions, get explanations, and practice interactively.
            </p>
          </div>
        </div>
        <ChatWindow />
      </div>
    </section>
  );
}

export default Chat;

