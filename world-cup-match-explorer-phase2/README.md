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