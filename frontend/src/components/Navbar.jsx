import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/chat", label: "Chat" },
  { to: "/dashboard", label: "Dashboard" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-slate-900"
          onClick={close}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-lg font-bold">
            AI
          </span>
          <span className="hidden sm:inline">AI Learning Assistant</span>
          <span className="sm:hidden inline">AI Tutor</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "px-3 py-1.5 rounded-full transition-colors",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex md:hidden items-center justify-center rounded-full p-2 text-slate-600 hover:bg-slate-100"
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white animate-slide-down">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1 text-sm">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={close}
                  className={[
                    "px-3 py-2 rounded-lg transition-colors duration-200 animate-slide-up",
                    `delay-${(i + 1) * 100}`,
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100",
                  ].join(" ")}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

