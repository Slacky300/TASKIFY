# Taskify Node.js Application

Taskify is a simple Node.js application built using Express.js, MongoDB, and JSON Web Tokens (JWT). It allows users to manage tasks by providing features such as creating, viewing, updating, and deleting tasks. Users can also mark tasks as completed and gain insights into their task completion status.

## Features

- **User Authentication:** Users must be logged in to perform any task operations.
- **Task Management:**
  - Create tasks with a title and description.
  - View a list of all tasks.
  - Mark tasks as completed.
  - Edit task details.
  - Delete tasks.
  - Get insights into task completion status.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

## Installation

1. Clone the repository: `git clone https://github.com/your-username/taskify.git`
2. Install dependencies: `npm install`
3. Set up the environment variables in a `.env` file:

   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```
## Run the application

  ```bash
      npm run dev
  ```

## API Endpoints

### Task Routes - `base_url/api/v1/tasks`

- **GET /insights** - Get insights into task completion and incompletion.
- **POST /** - Create a new task.
- **GET /** - Get a list of all tasks.
- **GET /:taskId** - Get details of a specific task.
- **PUT /:taskId** - Update details of a specific task.
- **DELETE /:taskId** - Delete a specific task.
- **PATCH /:taskId** - Mark a specific task as completed.

### User Routes - `base_url/api/v1/auth`

- **POST /register** - Register a new user.
- **POST /login** - Log in an existing user.
