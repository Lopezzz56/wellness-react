# Wellness Sessions Platform — Documentation

## Setup Instructions

### Folder Structure

```
/backend   → Node.js + Express + MongoDB (API)
  └── server.js
  └── routes/
  └── controllers/
  └── models/
  └── middleware/

/frontend  → React + TypeScript (UI)
  └── src/
      └── pages/
      └── components/
      └── App.tsx
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with:

```
PORT=5000
MONGO_URI=Paste your MongoDB connection string here
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Routes

### Auth Routes (`/api/auth`)

**POST /register**

* Registers a new user with email and password.

**POST /login**

* Authenticates a user.
* Returns a JWT token and user email.

**GET /profile**

* Returns the authenticated user's email.
* Requires `Authorization: Bearer <token>` header.

---

### Session Routes (`/api`)

**GET /sessions**

* Returns all published wellness sessions.
* Accessible to everyone (no authentication required).

**GET /sessions/search?q=keyword**

* Searches published sessions by title, tags, etc.

**GET /my-sessions**

* Returns sessions created by the logged-in user.
* Requires authentication.

**GET /my-sessions/:id**

* Returns a single session (draft or published) owned by the user.
* Requires authentication.

**POST /my-sessions/save-draft**

* Saves a session as a draft (new or update).
* Requires authentication.

**POST /my-sessions/publish**

* Publishes a draft session.
* Requires authentication.

---

## Features

### Authentication

* Register and login with email and password.
* JWT-based protected APIs.
* Token stored in localStorage and used for profile access.

### Dashboard

* View all published sessions.

### View Published Sessions

* Publicly visible sessions.

### My Sessions

* Logged-in users can:
  * View their own sessions (draft and published).
  * Edit their sessions.

### Session Editor

* Form to create or edit a wellness session.
* Buttons to:
  * Save as Draft
  * Publish Session

### Profile Page

* Shows the logged-in user's email.



