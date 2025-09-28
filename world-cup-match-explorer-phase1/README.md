# World Cup Match Explorer

## 📌 Project Proposal
**Team Members:**  
Carlos Vasconcelos

**Dataset Chosen:**  
[FIFA World Cup Dataset (Kaggle)](https://www.kaggle.com/datasets/abecklas/fifa-world-cup)

**Brief Overview:**  
This project will provide a platform where users can search and explore FIFA World Cup matches. Users will be able to filter games by year, stage (group, knockout, final), or team, and view match statistics such as goals, scorers, and results. Future versions will include user authentication and the ability to save favorite matches or teams.

## 🚀 Feature List (Planned)
- View all matches from the dataset
- Filter by year (e.g., 2014, 2018, 2022)
- Filter by stage (group, round of 16, quarter, semi, final)
- Search by team name to list all matches of that team
- Display match details (date, teams, score, goals)
- **Future:** auth (login/register), favorites, pagination, advanced filtering

## 🎨 Wireframes (Optional)
- Matches List Page (search + filters + table)
- Match Details Page

## 🛠️ Backend Setup (Phase 1)
- Node.js + Express
- Dummy routes:
  - `GET /api/v1/matches`
  - `GET /api/v1/matches/:id`
  - `POST /api/v1/matches`
  - `DELETE /api/v1/matches/:id`

### Run locally
```bash
git clone https://github.com/YOUR-USERNAME/world-cup-match-explorer.git
cd world-cup-match-explorer
npm install
npm run dev
```

Server: http://localhost:5000

## 📂 GitHub Repository
https://github.com/YOUR-USERNAME/world-cup-match-explorer

## ✅ Phase 1 Deliverables
- [x] Proposal + Dataset link
- [x] Basic Node/Express setup + dummy routes
- [x] Public GitHub repo + README
- [x] (Optional) Wireframes
