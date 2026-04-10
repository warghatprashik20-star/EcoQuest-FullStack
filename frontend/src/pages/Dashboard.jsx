import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar.jsx";
import { getProgress } from "../services/api.js";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({
    completedLessons: 6,
    totalLessons: 10,
    quizScore: 82,
    recommendedTopic: "Practice quadratic equations and their graphs.",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProgress = async () => {
      try {
        const response = await getProgress();
        if (!isMounted) return;
        if (response?.data) {
          setProgress((prev) => ({ ...prev, ...response.data }));
        }
      } catch (err) {
        console.error("Error fetching progress", err);
        if (isMounted) {
          setError(
            "Unable to load live progress from the server. Showing sample data instead."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProgress();

    return () => {
      isMounted = false;
    };
  }, []);

  const completionPercent =
    progress.totalLessons && progress.totalLessons > 0
      ? (progress.completedLessons / progress.totalLessons) * 100
      : 0;

  return (
    <section className="min-h-[calc(100vh-5rem)]">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Learning Dashboard
            </h2>
            <p className="text-xs text-slate-500">
              Track your lessons, quiz performance, and next best step.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 animate-slide-down">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-3 w-24" />
                </div>
                <div className="skeleton h-2.5 w-full" />
                <div className="skeleton h-3 w-3/4" />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
                <div className="skeleton h-4 w-36" />
                <div className="skeleton h-2.5 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
                <div className="skeleton h-4 w-48" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-2/3" />
                <div className="skeleton h-8 w-40" />
              </div>
            </div>
          </div>
        ) : (

        <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 animate-slide-up">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">
                  Lesson Progress
                </p>
                <span className="text-xs text-slate-500">
                  {progress.completedLessons} / {progress.totalLessons} lessons
                  completed
                </span>
              </div>
              <ProgressBar label="Overall completion" value={completionPercent} />
              <p className="text-xs text-slate-500">
                Stay consistent. Short, focused sessions with your AI tutor each
                day lead to the best results.
              </p>
            </div>

            <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-slide-up delay-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-900">
                  Quiz Performance
                </p>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700">
                  Latest quiz
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <ProgressBar label="Average quiz score" value={progress.quizScore || 0} />
                </div>
                <div className="w-px self-stretch bg-slate-100" />
                <div className="flex flex-col items-start text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {progress.quizScore || 0}%
                  </span>
                  <span>Last quiz score</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3 animate-slide-up delay-200">
              <p className="text-sm font-semibold text-slate-900">
                Recommended Next Topic
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {progress.recommendedTopic ||
                  "Ask the assistant for a quick diagnostic quiz to generate a personalized next topic."}
              </p>
              <button
                type="button"
                className="btn-press mt-1 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-950 hover:shadow-md transition-all duration-200"
              >
                Go to Chat to Practice
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[11px] text-slate-600 space-y-1 animate-fade-in delay-400">
              <p className="font-semibold text-slate-900">
                How this dashboard works
              </p>
              <p>
                Your backend can update lesson counts, quiz scores, and next
                topics based on user interactions with the AI chatbot.
              </p>
              <p>
                Connect it to your database or learning content API to keep this
                view fully in sync with each learner&apos;s journey.
              </p>
            </div>
          </div>
        </div>

        )}
      </div>
    </section>
  );
}

export default Dashboard;

