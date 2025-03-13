# Reminder API

A simple RESTful API built with Hono and Node.js for managing reminders.

## Features
- Create, read, update, and delete reminders.
- Mark/unmark reminders as completed.
- Retrieve completed, not completed, and due-today reminders.

## Technologies Used
- Node.js
- Hono
- TypeScript

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/reminder-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd reminder-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Add a Reminder
**POST** `/reminders`
- Request Body:
  ```json
  {
    "id": "1",
    "title": "Meeting",
    "description": "Project discussion",
    "dueDate": "2025-03-15",
    "isCompleted": false
  }
  ```
- Response: `201 Created`

### Get All Reminders
**GET** `/reminders`
- Response: `200 OK`

### Get a Reminder by ID
**GET** `/reminders/:id`
- Response: `200 OK` or `404 Not Found`

### Update a Reminder
**PATCH** `/reminders/:id`
- Request Body (optional fields):
  ```json
  {
    "title": "Updated Meeting",
    "description": "Updated details"
  }
  ```
- Response: `200 OK`

### Delete a Reminder
**DELETE** `/reminders/:id`
- Response: `200 OK`

### Mark Reminder as Completed
**POST** `/reminders/:id/mark-completed`
- Response: `200 OK`

### Unmark Reminder as Completed
**POST** `/reminders/:id/unmark-completed`
- Response: `200 OK`

### Get Completed Reminders
**GET** `/reminders/completed`
- Response: `200 OK`

### Get Not Completed Reminders
**GET** `/reminders/not-completed`
- Response: `200 OK`

### Get Reminders Due Today
**GET** `/reminders/due-today`
- Response: `200 OK`



