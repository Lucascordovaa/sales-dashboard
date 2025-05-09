### 📊 Sales Dashboard

Full-stack sales dashboard application with:

* **Frontend:** Next.js 15 + Tailwind CSS 4
* **Backend:** FastAPI + SQLAlchemy

📁 Project structure:

```
sales-dashboard/
├── backend/
└── frontend/
```

---

## 🚀 Getting Started

### 🧱 Prerequisites

* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js 18+ and npm](https://nodejs.org/)
* [VS Code](https://code.visualstudio.com/) with the **Python extension**
* Git (if you’re cloning the repo)

---

## 💻 Backend Setup (FastAPI)

1. Open your terminal and navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the environment:

   * **PowerShell**:

     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **Command Prompt**:

     ```cmd
     venv\Scripts\activate.bat
     ```
   * **Git Bash / WSL / Linux / macOS**:

     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Start the FastAPI server:

   ```bash
   uvicorn app.main:app --reload
   ```

6. Visit:

   ```
   http://127.0.0.1:8000
   ```

---

## 🌐 Frontend Setup (Next.js + TailwindCSS)

1. In a new terminal, navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit:

   ```
   http://localhost:3000
   ```

---

## ⚙️ Environment Setup (Optional for production or advanced use)

If you plan to run this in production or want more control:

* Create a `.env` file in both the `backend` and `frontend` folders if needed.

* For example, in `backend/.env`, you might define:

  ```
  DATABASE_URL=sqlite:///./sales.db
  ```

* And in `frontend/.env.local`:

  ```
  NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
  ```

> Note: This project works without environment variables out-of-the-box in development.

---

## 📸 Screenshots

* \[image goes here]
* \[image goes here]

---
