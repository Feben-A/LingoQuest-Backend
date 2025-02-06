# LingoQuest Backend Application

## Overview

LingoQuest is a language learning application designed to help students improve their language skills through interactive quizzes. The backend of this application is responsible for user authentication, data storage, and game functionality, ensuring an enjoyable experience for students.

## Features

### User Authentication & Authorisation:

Students must log in to access their dashboard.
Authentication is handled using JSON Web Tokens (JWT) for security.
If a student doesn’t have an account, they must sign up, and their details are securely stored in a cloud-based database (supabase).

### Translation Game:

Students can choose between Easy, Medium, or Hard quiz levels.
Each quiz session is recorded, and marks are stored in the database.

### Leaderboard:

The dashboard displays the top 3 students with the highest scores.
Students can track their progress and rankings in real-time.

## Access the application

To get all of the files onto your device, clone down the repository either with the HTTPS or SSH.
If you are using the terminal, ensure you are in the correct location on your device before doing so.
Once there, run the following command:

```
git clone <repository https or ssh>
cd LingoQuest-Backend
```

### Installation

To install any dependencies, use the following command:

```
npm install
```

This will install:

- Production dependencies (e.g., express, pg, jsonwebtoken, bcrypt)
- Development dependencies (e.g., jest, nodemon, supertest)

### Set Up the Database

Run the following command to initialise the database:

```
npm run setup-db
```

### Start the Server

- For development mode run:

```
npm run dev
```

- For production mode run:

```
npm start

```

### Deployed API

All endpoints can be accessed using the following deployed link (render)

https://lingoquest-backend.onrender.com

### **Endpoints - LingoQuest Backend**

| **Method** | **Endpoint**                      | **Description**                                    |
| ---------- | --------------------------------- | -------------------------------------------------- |
| `POST`     | `/users/register`                 | Register a new user                                |
| `POST`     | `/users/login`                    | Authenticate and log in a user                     |
| `PATCH`    | `/student/games/score`            | Update total student marks at the end of each game |
| `GET`      | `/spanish/games/translate/:level` | Send 10 random questions at chosen level           |
| `GET`      | `/student/dashboard/leaders`      | Get top 3 students by total marks                  |

---

## Future Features

Some future features include:

- Allowing users to personalise their dashboard
- Implementing a subject specific leaderboard
- Double points for games leading up to exams: to be set by teachers
- Allow teachers to log in and retrieve all student marks.

## Known Bugs & Issues

- No known bugs
