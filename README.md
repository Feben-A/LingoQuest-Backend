# LingoQuest Backend Application

## Overview
LingoQuest is a language learning application designed to help students improve their language skills through interactive quizzes. The backend of this application is responsible for user authentication, data storage, and game functionality, ensuring an enjoyable experience for students.

## Features

### User Authentication & Authorisation:

Students must log in to access their dashboard.
Authentication is handled using JSON Web Tokens (JWT) for security.
If a student doesn’t have an account, they must sign up, and their details are securely stored in the database.

### Quiz Game:

Students can choose between Easy, Medium, or Hard quiz levels.
Each quiz session is recorded, and marks are stored in the database.

### Leaderboard:

The dashboard displays the top 3 students with the highest scores.
Students can track their progress and rankings in real-time.

### Database Management:

The backend securely stores student information, including ID, login credentials, and quiz scores.
Data is structured to ensure efficient retrieval and updates when students complete quizzes or register new accounts.
This backend provides a secure, efficient, and scalable solution for managing users, quizzes, and scores in the LingoQuest application.

### **Endpoints - LingoQuest Backend**

| **Method** | **Endpoint**                      | **Description**                    |
|-----------|----------------------------------|------------------------------------|
| `POST`    | `/users/register`               | Register a new user               |
| `POST`    | `/users/login`                  | Authenticate and log in a user    |
| `GET`     | `/users`                        | Retrieve all users                |
| `GET`     | `/users/:id`                    | Retrieve a specific user by ID    |
| `POST`    | `/spanish/games/translate`      | Start a translation quiz          |
| `GET`     | `/spanish/games/translate/:level` | Get translation questions by level |
| `GET`     | `/student/dashboard`            | Retrieve student dashboard data   |
| `GET`     | `/student/dashboard/leaderboard` | Get top 3 students by marks      |

---
**Notes:**  
- `users` routes handle authentication and user management.  
- `spanish/games/translate` routes manage the translation quiz.  
- `student/dashboard` provides access to user-specific stats, including the leaderboard.



## Access the application

To get all of the files onto your device, clone down the repository either with the HTTPS or SSH.
If you are using the terminal, ensure you are in the correct location on your device before doing so.
Once there, run the following command:

```
git clone <repository https or ssh>
cd LingoQuest-Backend
```

### Installation

To install any dependencies, use the following terminal command:

```
npm install
```

This will install:

 - Production dependencies (e.g., express, pg, jsonwebtoken, bcrypt)
 - Development dependencies (e.g., jest, nodemon, supertest)

### Set Up the Database

Run the following command to initialise the database schema:

```
npm run setup-db
```

### Start the Server

To start the server in development mode (auto-restarts on changes):

```
npm run dev
```

## Future Features
Here are some features that could be added in the future:
- Example 1
- Example 2
- Example 3

## Known Bugs
- Bug 1
- Bug 2