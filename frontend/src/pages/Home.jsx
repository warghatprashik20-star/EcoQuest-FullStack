import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
        <div className="space-y-6">
          <p className="animate-slide-up inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            AI-Powered · Personalized · Interactive
          </p>
          <div className="space-y-3 animate-slide-up delay-100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
              AI Personalized Learning Assistant
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Chat with an AI tutor that adapts to your level, explains
              concepts in simple language, and generates practice quizzes to
              keep you on track.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center animate-slide-up delay-200">
            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="btn-press inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
            >
              Start Learning
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-press inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 hover:shadow-sm transition-all duration-200"
            >
              View Progress
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="hover-lift rounded-xl border border-slate-100 bg-white px-3 py-2 animate-slide-up delay-300">
              <p className="font-semibold text-slate-900">Adaptive Paths</p>
              <p>Lessons that match your pace and level.</p>
            </div>
            <div className="hover-lift rounded-xl border border-slate-100 bg-white px-3 py-2 animate-slide-up delay-400">
              <p className="font-semibold text-slate-900">Chat-based Learning</p>
              <p>Ask questions in natural language.</p>
            </div>
            <div className="hover-lift rounded-xl border border-slate-100 bg-white px-3 py-2 animate-slide-up delay-500">
              <p className="font-semibold text-slate-900">Built-in Quizzes</p>
              <p>Practice with instant feedback.</p>
            </div>
          </div>
        </div>

        <div className="relative animate-scale-in delay-300">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-100 via-sky-50 to-emerald-50" />
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-900">Live session</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-slate-900 px-3 py-2 text-white">
                  What topic are you studying today?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-indigo-50 px-3 py-2 text-slate-900">
                  I want help preparing for my math exam.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-indigo-100 bg-white px-3 py-2 text-slate-900">
                  Great. Let's quickly check your understanding with a short
                  quiz, then I&apos;ll build a personalized revision plan.
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
              Track your progress, revisit weak topics, and stay consistent
              with an AI study partner available 24/7.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

