### Sales Dashboard

Full-stack sales dashboard application with:

* **Frontend:** Next.js 15 + Tailwind CSS 4
* **Backend:** Python + FastAPI + SQLAlchemy

Project structure:

```
sales-dashboard/
├── backend/
└── frontend/
```

Project Features: 

* **Filter products by category:** On the products list, you can filter by category using the dropdown menu.
* **Add products:** When clicking on the Add Product button, you'll be redirected to the add product page, where you can manually add products or upload a CSV file.
* **Add categories:** When clicking on the Add Category button, you'll be redirected to the add category page, where you can manually add new categories or upload a CSV file.
* **Edit/add sales:** When clicking on the Add/edit sales button, you'll be redirected to the sales page, where you can manually add sales or upload a CSV file, and also see the sales by month.
* **Download CSV buttons:** You can download updated CSV files containing the sales and the products list.
---

## Screenshots

![main page](https://github.com/Lucascordovaa/sales-dashboard/blob/main/screenshots/print1.PNG)

![add product](https://github.com/Lucascordovaa/sales-dashboard/blob/main/screenshots/print3.PNG)

![add category](https://github.com/Lucascordovaa/sales-dashboard/blob/main/screenshots/print2.PNG)

![add sales](https://github.com/Lucascordovaa/sales-dashboard/blob/main/screenshots/print4.PNG)

---

## Getting Started

### Prerequisites

* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js 18+ and npm](https://nodejs.org/)
* Git (if you’re cloning the repo)
* Python extension if you're on VSCode

---

## Backend Setup (FastAPI)

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
     If the script fails to activate, open powershell as administrator and type Set-ExecutionPolicy RemoteSigned, then press enter, A and enter again.
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
   ```bash
   pip install python-multipart
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

## Frontend Setup (Next.js + TailwindCSS)

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
