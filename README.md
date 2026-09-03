# Alfred

AI-powered task management for software development.

## 1. Project Overview
Alfred is a sleek, modern task management application built to help software teams track their work seamlessly. It features an intuitive, fast frontend UI and a robust Node.js backend. One of its standout features is the integration of AI to automatically generate contextual summaries of tasks, helping team members quickly understand what needs to be done.

## 2. Technologies Used
* **Frontend**: Next.js, React, Tailwind CSS, Lucide Icons
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL (hosted on Supabase), Prisma ORM
* **AI Integration**: Google Gemini API

## 3. Setup Instructions
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/julian-ritondale/alfred.git
   cd alfred
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Configure your .env file
   npx prisma db push
   npx prisma generate
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   # Configure your .env file
   npm run dev
   ```
   
4. **Access the Application:**
   Open `http://localhost:3000` in your browser.

## 4. Required Environment Variables

### Backend (`backend/.env`)
* `DATABASE_URL`: Connection string for the Prisma connection pool.
* `DIRECT_DATABASE_URL`: Direct connection string for Supabase migrations.
* `PORT`: Backend server port (e.g., `3001`).
* `GEMINI_API_KEY`: Your Google Gemini API key.
* `GEMINI_MODEL_NAME`: The Gemini model to use (e.g., `gemini-3.1-flash-lite`).
* `CORS_ORIGINS`: Allowed origins for CORS (e.g., `http://localhost:3000`).

### Frontend (`frontend/.env`)
* `NEXT_PUBLIC_API_BASE_URL`: URL of the backend API (e.g., `http://localhost:3001`).

## 5. API Endpoints
* `GET /api/tasks` - Retrieve a list of all tasks.
* `POST /api/tasks` - Create a new task.
* `PUT /api/tasks/:id` - Update an existing task.
* `DELETE /api/tasks/:id` - Delete a task.
* `POST /api/tasks/:id/summary` - Generate an AI summary for a specific task based on its details.

## 6. Database Setup & Schema
This project uses **PostgreSQL** hosted on **Supabase** with **Prisma ORM** for schema management and queries.

**Task Model Schema:**
* `id`: String (UUID, Primary Key)
* `title`: String
* `description`: String (Nullable)
* `status`: Enum (`UNASSIGNED`, `TODO`, `IN_PROGRESS`, `DONE`)
* `priority`: Enum (`UNASSIGNED`, `LOW`, `MEDIUM`, `HIGH`)
* `assignee`: String (Nullable)
* `createdAt`: DateTime
* `updatedAt`: DateTime

## 7. AI Integration Approach
The AI integration utilizes the **Google Gemini API** to provide concise summaries of tasks. When a user opens a task in the frontend, they can click the "AI Summary" button. The frontend calls the backend `/api/tasks/:id/summary` endpoint, which retrieves the task's title and description from the database, constructs a specialized prompt, and queries Gemini. The response is then returned and displayed in a polished, floating bubble in the UI.

## 8. Known Limitations
* **Local Filtering & Pagination:** Currently, filtering and search are performed locally in the frontend. Because the task population is small, this works perfectly and negates the need for complex debouncing or loading states. However, this approach **does not scale** for production systems with thousands of tasks, where filtering, search, and pagination must be handled by the backend.
* **Testing:** The project is currently missing a robust test suite (unit and integration) to perform regression tests for new changes.

## 9. What I Would Improve With More Time
If given more time, I would expand the application to include:
* **AI Task Generation:** Allow users to create tasks dynamically using natural language (e.g., "Create a high priority task for Julian to fix the login bug by Friday").
* **Authentication & Authorization:** Implement secure user login, role-based access control, and user-specific task assignments instead of string-based assignees.
* **Email Notifications:** Notify users when they are assigned to a task or when the status of their task changes.
* **Collaboration:** Add real-time collaboration features (WebSockets) so multiple users can view, update, and comment on tasks simultaneously without refreshing.
