## AI Personalized Learning Assistant – Frontend

This is a **React + Vite + Tailwind CSS** frontend for an AI‑powered personalized learning chatbot.  
Students can chat with an AI tutor, answer quick quizzes, and track their learning progress on a dashboard.

---

### 🧰 Tech Stack

- **React.js** (SPA, components, hooks)
- **Vite** (fast dev server & bundler)
- **Tailwind CSS** (utility‑first styling)
- **Axios** (API calls)
- **React Router** (client‑side routing)

---

### 📁 Project Structure (frontend)

```text
frontend/
 ├── index.html
 ├── src/
 │   ├── main.jsx
 │   ├── App.jsx
 │   ├── index.css
 │   ├── components/
 │   │   ├── Navbar.jsx
 │   │   ├── ChatWindow.jsx
 │   │   ├── MessageBubble.jsx
 │   │   ├── QuizCard.jsx
 │   │   └── ProgressBar.jsx
 │   ├── pages/
 │   │   ├── Home.jsx
 │   │   ├── Chat.jsx
 │   │   └── Dashboard.jsx
 │   └── services/
 │       └── api.js
```

The frontend talks to a backend running at `http://localhost:5000/api`.

---

### ⚙️ Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Backend server exposing:
  - `POST /api/chat`
  - `GET /api/progress`

---

### 📦 Installation

From the project root (`MYVIBEPROJECT/`):

```bash
cd frontend
npm install
```

Make sure you also install and configure **Tailwind CSS** and **Vite** (if not already done) using the official docs:

- Vite React template
- Tailwind CSS with Vite

---

### ▶️ Running the App

1. **Start the backend** (in a separate terminal, from your backend folder):

```bash
npm run dev
```

2. **Start the frontend dev server**:

```bash
cd frontend
npm run dev
```

3. Open the app in your browser (usually `http://localhost:5173`).

---

### 🌐 Routes

- `/` – **Home**: simple landing page with “Start Learning” button.
- `/chat` – **Chat**: ChatGPT‑style interface with AI + user bubbles and quiz messages.
- `/dashboard` – **Dashboard**: learning progress, quiz score card, and recommended next topic.

---

### 🔌 API Integration

`src/services/api.js` defines a reusable Axios instance:

- **Base URL**: `http://localhost:5000/api`
- **Functions**:
  - `sendMessage({ message })` → `POST /chat`
  - `getProgress()` → `GET /progress`

Update these as needed to match your backend.

---

### 🎨 UI & Responsiveness

- Clean, light theme using Tailwind utilities.
- Responsive layout for mobile, tablet, and desktop.
- Chat area is scrollable with sticky input bar at the bottom.
