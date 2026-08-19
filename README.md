# AI-Integrated Habit Tracker
CSE4204-8B-T06 — (Mobile Computing Lab)

Repository: ai-integrated-habit-tracker- 
Team: CSE4204-8B-T06


---

## Contents
- Project Summary
- Minimum Requirements
- Features
- Architecture & Design
- Database Schema & ER Diagram
- Setup & Run (development)
- API Reference (summary)
- Frontend Structure
- Backend Structure
- AI Integration
- Testing
- Deployment
- Weekly Plan & Deliverables
- Contribution & Git Workflow
- License & Academic Integrity

---

## Project Summary
AI‑Integrated Habit Tracker is a full‑stack web application that helps users create, track, and analyze personal habits. The system combines standard habit‑tracking features (CRUD, daily entries, streaks) with AI powered features (habit suggestions and progress summarization).

---

## Features
- User registration and JWT authentication
- Create/edit/delete habits with metadata (frequency, tags, color)
- Daily marking (done / skipped / missed)
- Dashboard with colorful habit cards, quick stats and placeholders for charts
- AI Coach: habit suggestions and progress summaries
- REST API using Django REST Framework
- Documentation, ER diagram, and DB schema included

---

## Quick Start (development)
Prereqs:
- Python 3.10+, Node 16+, PostgreSQL (or Supabase), OpenAI key (optional)

Backend:
1. cd backend
2. copy .env.example → .env and edit (DB, SECRET_KEY, OPENAI_API_KEY)
3. python -m venv venv
4. activate venv and pip install -r requirements.txt
5. python manage.py migrate
6. python manage.py createsuperuser
7. python manage.py runserver

Frontend:
1. cd frontend
2. npm install
3. npm run dev

---

## API summary
Auth
- POST /api/auth/register/
- POST /api/auth/token/
- GET  /api/auth/me/

Habits
- GET /api/habits/
- POST /api/habits/
- POST /api/habits/{id}/mark/

AI
- POST /api/ai/suggest/
- POST /api/ai/summarize/

---

## DB & Design
See `db/schema.sql` and `docs/er_diagram.mmd`.

---

## Contribution & Branching
- main (stable)
- development (integration)
- feature/<name>

Commit examples:
- `init: repo skeleton`
- `feat(backend): add habit models`
- `feat(frontend): add dashboard and auth`
