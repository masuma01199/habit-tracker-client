# 🌿 HabitQuest

A modern full-stack habit tracking web application that helps users build consistency, track streaks, and explore public habits shared by the community.

Built with a clean SaaS-style UI and smooth user experience.

- [Live Site]() 
- [Client Repo](https://github.com/masuma01199/habit-tracker-client.git)
- [Server Repo](https://github.com/masuma01199/habit-tracker-server.git) 

## ✨ Features

### Authentication & Security: 
*Email & password login

*Google authentication

*Protected routes

*User profile dropdown

### Personalized Dashboard:
 A private "My Habits" area where users can track their own daily routines.

### Streaks & Milestones:
 Visual fire icons and counters to celebrate consecutive days of habit completion.

### Community Sharing: 
Option to set habits as "Public" to inspire others or keep them "Private" for personal growth.

### Dynamic UI:
 Fully responsive design with a high-end SaaS aesthetic (Extra-rounded cards, Indigo branding).

### Real-time Feedback: 
Integrated toast notifications for every action—from habit creation to password resets.

## 🛠️ Tech Stack

|Frontend    |	Backend	Database|  Auth|
| :--- | :--- | :--- |
|React.js    |	Node.js         |	Firebase Auth|
|Tailwind CSS|	Express.js      |   Vercel Deployment|	
|Axios	     | CORS             |	MongoDB |
|React Router|

## 🚀 Getting Started
Follow these steps to set up the project locally.

### Install Dependencies
#### 📦 For the Client:
cd client
npm install

#### 📦 For the Server:
cd ../server
npm install

### Environment Variables

Create a .env file in both the client and server folders.

#### 🔐 Client (/client/.env)
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

#### 🗄️ Server (/server/.env)
DB_USER=your_db_user
DB_PASS=your_db_password
PORT=5000

#### Run the Application
##### ▶ Start Server
cd server
npm start

##### ▶ Start Client
cd client
npm run dev


The application should now be running at:

http://localhost:5173


### 🛣️ Roadmap

* Firebase Authentication (Login / Signup / Forgot Password)

* CRUD Operations for Habits

* Public / Private Visibility Toggle

* Implement a Global Leaderboard

* Add Habit Reminders via Email Notifications

* Dark Mode Support

### 🧠 Notes

* Make sure MongoDB is running locally (or use MongoDB Atlas).

* Ensure CORS is enabled on the backend.

* Do not commit your .env files.


---




