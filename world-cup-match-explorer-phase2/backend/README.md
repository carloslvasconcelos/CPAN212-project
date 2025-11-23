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

🧾 Summary of Progress
Phase	Focus	Key Deliverables
Phase 1	Project setup	Node + Express skeleton, routes dummy
Phase 2	Modular architecture	JSON CRUD + validations + middlewares
Phase 3	Database integration	MongoDB Atlas + Mongoose CRUD + filtering