# World Cup Match Explorer — Phase 2 (Modular Architecture)

## ✅ What’s included in Phase 2
- Feature-based modular architecture (Express Router per module)
- JSON data source (no DB yet)
- CRUD for **Matches** and **Teams**
- Route-level validation with **express-validator**
- Application-level middlewares (body parsing, 404, error handler)
- Proper HTTP status codes & JSON responses

## 📁 Project Structure
```
src/
├─ data/
│  ├─ matches.json
│  └─ teams.json
├─ middlewares/
│  ├─ errorHandler.js
│  ├─ notFound.js
│  └─ validate.js
└─ modules/
   ├─ matches/
   │  ├─ matches.model.js
   │  ├─ matches.routes.js
   │  └─ matches.validation.js
   └─ teams/
      ├─ teams.model.js
      ├─ teams.routes.js
      └─ teams.validation.js
server.js
package.json
```

## ▶️ Running locally
```bash
npm install
npm run dev
# Server on http://localhost:3001
```

## 🔗 Endpoints

### Health
- `GET /api/v1/health`

### Matches
- `GET    /api/v1/matches`
- `GET    /api/v1/matches/:id`
- `POST   /api/v1/matches` (validated)
- `PUT    /api/v1/matches/:id` (validated)
- `DELETE /api/v1/matches/:id`

### Teams
- `GET    /api/v1/teams`
- `GET    /api/v1/teams/:id`
- `POST   /api/v1/teams` (validated)
- `PUT    /api/v1/teams/:id` (validated)
- `DELETE /api/v1/teams/:id`

## 🧪 Quick cURL tests
```bash
curl http://localhost:3001/api/v1/health

curl http://localhost:3001/api/v1/matches
curl http://localhost:3001/api/v1/matches/match_1
curl -X POST http://localhost:3001/api/v1/matches -H "Content-Type: application/json" -d '{
  "year": 2022, "stage": "final", "home": "Argentina", "away": "France", "score": "3-3 (4-2 pens)"
}'
curl -X PUT http://localhost:3001/api/v1/matches/match_1 -H "Content-Type: application/json" -d '{
  "score": "4-3"
}'
curl -X DELETE http://localhost:3001/api/v1/matches/match_3
```
Project Continuity

This Phase 2 submission continues the development of my Phase 1 project, World Cup Match Explorer — Phase 1

It evolves the initial setup into a modular Express.js architecture with CRUD functionality, validation, and middlewares.

# World Cup Match Explorer — Phase 3 (Database Integration with MongoDB Atlas)

🆕 Added in Phase 3 — Database integration, real Mongoose models, and advanced querying.

✅ What’s included in Phase 3

MongoDB Atlas integration via Mongoose

dotenv environment setup for secure database connection

Database connection middleware (connect-db.js)

Mongoose schemas & models replacing JSON data files

CRUD using Mongoose for both Matches and Teams

Search, sort, and pagination for GET routes

Error handling for invalid requests or missing records

⚙️ Environment Setup

Added: .env file (excluded via .gitignore)


MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.ws00g4x.mongodb.net/worldcupDB
PORT=3001


The connect-db.js middleware connects automatically to MongoDB Atlas at server startup.

✅ Expected console output:

✅ Connected to MongoDB Atlas
Server running on http://localhost:3001

🗂️ Updated Project Structure

Added: MongoDB integration + shared middleware

src/
├─ shared/
│  └─ middlewares/
│     └─ connect-db.js       # Mongoose connection logic
├─ modules/
│  ├─ matches/
│  │  ├─ models/
│  │  │  └─ match.model.js   # Mongoose schema for Matches
│  │  ├─ matches.model.js    # Updated with Mongoose CRUD
│  │  ├─ matches.routes.js
│  │  └─ matches.validation.js
│  └─ teams/
│     ├─ models/
│     │  └─ team.model.js    # 🆕 Mongoose schema for Teams
│     ├─ teams.model.js      # Updated with Mongoose CRUD
│     ├─ teams.routes.js
│     └─ teams.validation.js

🔍 Searching, Sorting & Pagination

🆕 Implemented in matches.model.js:

Filter by year or stage

Sort by any field (e.g., sort=year)

Paginate with page and limit

Example queries:
# All matches from 2022
GET /api/v1/matches?year=2022

# Final matches only
GET /api/v1/matches?stage=final

# Paginated & sorted
GET /api/v1/matches?sort=year&page=1&limit=5

🧠 Technologies

Node.js + Express

MongoDB Atlas

Mongoose

dotenv

express-validator

Nodemon
-------------------------------------------------------------------------------------------

World Cup Match Explorer — Phase 4 (Frontend Integration with React)

🆕 Added in Phase 4 — Complete React frontend connected to the Express + MongoDB backend.

✅ What’s included in Phase 4
🖥️ React Frontend Application

A new React application was created inside the /frontend directory using Create React App.
This frontend provides a full user interface for interacting with the backend API.

✔ Implemented Pages

Matches List Page (READ + DELETE)

Create Match Page (CREATE)

Edit Match Page (UPDATE)

Navigation bar to access all pages

✔ Features Implemented

Fully functional CRUD operations through the UI

React Router for navigation between pages

Forms with client-side validation (required fields)

Success and error messages for all operations

Fetch API used to communicate with the backend

UI automatically updates after create/edit/delete

Loading of match data by ID for editing

Inline styling for simplicity (no external CSS frameworks)

Clean and easy-to-understand component structure

📁 Frontend Project Structure
frontend/
 ├─ src/
 │   ├─ App.js               # Routes + navigation
 │   ├─ index.js             # React root
 │   ├─ MatchesList.js       # List + delete matches
 │   ├─ CreateMatch.js       # Create new match
 │   └─ EditMatch.js         # Edit existing match
 ├─ package.json
 └─ README.md

🔗 Frontend Routes
Route	Description
/	List all matches
/matches	List all matches
/matches/new	Create new match
/matches/:id/edit	Edit a match
🔧 API Integration

All data is fetched directly from the backend API:

http://localhost:3001/api/v1/matches


Using the Fetch API:

GET → load matches

POST → create matches

PUT → update matches

DELETE → remove matches

No hardcoded data is used—all data is from MongoDB Atlas.

✔ Validation & Feedback

Client-side validation prevents submitting empty fields

Errors displayed in red

Success messages in green

Confirmation message before deleting

▶️ Running the frontend
cd frontend
npm install
npm start


Runs on:
👉 http://localhost:3000

Ensure backend is running simultaneously.

World Cup Match Explorer — Phase 5 (Authentication, Authorization & Security)

🆕 Added in Phase 5 — Full authentication system with OTP login, JWT tokens, and role-based authorization.

This phase transforms the project into a secure, production-ready API by adding user accounts, protected routes, and permission control for administrative actions.

✅ What’s included in Phase 5
🔐 Authentication

Email + password login using secure hashed passwords (bcrypt)

OTP (One-Time Password) 6-digit verification workflow

Automatic OTP expiration using MongoDB TTL index

Clean email simulation output during development

🔏 Authorization

JWT-based authentication with 1-hour expiration

Role-based access control (RBAC):

admin

customer (default)

Protected routes using an authorize(["admin"]) middleware

Route-level access checks (e.g., only admin can create/edit/delete)

👤 User Management

User registration with hashed password

Validation rules for name, email, and password

Prevents duplicate email registration

Endpoints to list users (admin-only)

Endpoint to access a user by ID (admin or the user themself)

🛡 Route Protection

Routes now fall into two categories:

Open Routes (No token required)

GET /matches

GET /matches/:id

GET /teams

GET /teams/:id

Protected Routes (Admin only)

POST /matches

PUT /matches/:id

DELETE /matches/:id

POST /teams

PUT /teams/:id

DELETE /teams/:id

GET /auth/users (admin)

GET /auth/users/:id (admin or owner)

🗂️ Updated Project Structure

New files introduced in this phase:

src/
├─ modules/
│  ├─ users/
│  │   ├─ users.routes.js
│  │   ├─ models/user.model.js
│  │   ├─ models/otp.model.js
│  │   └─ middlewares/
│  │       ├─ login-rules.js
│  │       ├─ register-rules.js
│  │       └─ verify-login-rules.js
│  ├─ matches/ (updated with admin protection)
│  └─ teams/ (updated with admin protection)
├─ shared/
│  ├─ middlewares/authorize.js
│  └─ utils/
│       ├─ jwt-utils.js
│       ├─ password-utils.js
│       ├─ email-utils.js
│       └─ compute-utils.js

🔗 New Authentication Endpoints
POST /api/v1/auth/users/register

Registers a new user (admin or customer).

POST /api/v1/auth/users/login

User submits email + password → receives an OTP.

POST /api/v1/auth/users/verify-login

User submits email + OTP → receives a JWT token.

GET /api/v1/auth/users

Admin-only: returns all registered users.

GET /api/v1/auth/users/:id

Accessible by the admin OR the user themselves.

🔒 How Route Protection Works
JWT Verification

Each protected route uses an Authorization: Bearer <token> header.
The middleware checks:

Valid token

Decoded payload (email, _id, role)

Required role(s) for the route

Access Logic

If the route requires "admin" and the token is "customer" → 403 Access denied

If token is missing or invalid → 401 Unauthorized

🧪 Example Postman Tests
Login Flow

POST /auth/users/login → receives OTP

POST /auth/users/verify-login → receives token

Use token to test admin routes

Admin trying to create a match

✔ Works

Customer trying to create a match

❌ Fails with:

{ "errorMessage": "Access denied" }

Missing or invalid token

❌ Fails with:

{ "errorMessage": "Unauthorized" }

🧾 Phase 5 Summary
Feature	Status
OTP Login	✅ Completed
JWT Authentication	✅ Completed
Role-Based Authorization	✅ Completed
Route Protection (Matches/Teams)	✅ Completed
Secure Password Hashing	✅ Completed
User Management	✅ Completed
Postman Tests	✅ Completed

This phase successfully secures the entire backend with a robust authentication and authorization system, ensuring that administrative actions are protected and user access is properly validated.

🧾 Summary of Progress Updated
Phase	Focus	Key Deliverables
Phase 1	Project setup	Node + Express skeleton, dummy routes
Phase 2	Modular architecture	JSON CRUD + validation + middlewares
Phase 3	Database integration	MongoDB Atlas + Mongoose CRUD + filtering
Phase 4	Frontend integration	React UI + CRUD via API + Routing + Validation
Phase 5 Authentication & Authorization   OTP login flow • JWT tokens • Hashed passwords • Role-based access • Protected admin routes • User management