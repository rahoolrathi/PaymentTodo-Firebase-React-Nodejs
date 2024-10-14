# Payment Reminder App

## Introduction
The Payment Reminder App is a web application that allows users to manage their payments and receive notifications for unpaid payments. Built using React for the frontend and Node.js for the backend, this application utilizes Firebase for user authentication and real-time notifications.

## Technologies Used
- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** Firebase
- **Notifications:** Firebase Cloud Messaging (FCM)
- **Task Scheduling:** Node Cron for scheduling daily notifications

## Features
- User authentication using Firebase Auth
- CRUD operations for managing payment todos
- Notifications for unpaid payments sent daily at 6 AM
- Responsive UI with Bootstrap

## API Endpoints

### Payment Todos
- `GET /api/paymenttodo`: Fetch all payment todos.
- `POST /api/paymenttodo`: Create a new payment todo.
- `PUT /api/paymenttodo`: Update an existing payment todo.
- `DELETE /api/paymenttodo/:id`: Delete a payment todo by ID.

### Notifications
- `GET /api/notification`: Fetch notifications for the user.

## Database Collections
- **Notification:** Stores notification messages sent to users.
- **UserToken:** Stores the FCM tokens for users to send push notifications.
- **PaymentTodo:** Stores the user's payment todos with details such as title, description, due date, and status.

## Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/payment-reminder-app.git
   
<ol>
  <li>
    <strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/yourusername/payment-reminder-app.git</code></pre>
  </li>
  <li>
    <strong>Navigate to the backend directory:</strong>
    <pre><code>cd payment-reminder-app/backend</code></pre>
  </li>
  <li>
    <strong>Install dependencies:</strong>
    <pre><code>npm install</code></pre>
  </li>
  <li>
    <strong>Set up environment variables:</strong> Create a <code>.env</code> file in the backend directory and add the necessary environment variables (e.g., database connection string, Firebase credentials).
  </li>
  <li>
    <strong>Start the backend server:</strong>
    <pre><code>npm start</code></pre>
  </li>
  <li>
    <strong>Navigate to the frontend directory:</strong>
    <pre><code>cd ../frontend</code></pre>
  </li>
  <li>
    <strong>Install dependencies:</strong>
    <pre><code>npm install</code></pre>
  </li>
  <li>
    <strong>Start the frontend development server:</strong>
    <pre><code>npm start</code></pre>
  </li>
</ol>
