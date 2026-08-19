# API Spec (summary)

Auth:
- POST /api/auth/register/ { username, email, password } -> create user + tokens
- POST /api/auth/token/ { username, password } -> access & refresh
- GET  /api/auth/me/ -> current user

Habits:
- GET  /api/habits/ -> list
- POST /api/habits/ -> create { title, description, frequency, tags, color }
- GET  /api/habits/{id}/ -> detail
- PUT  /api/habits/{id}/ -> update
- DELETE /api/habits/{id}/ -> delete
- POST /api/habits/{id}/mark/ -> mark entry { date?, status, notes? }

Entries:
- GET /api/habits/entries/

AI:
- POST /api/ai/suggest/ { text } -> suggestion (requires OPENAI_API_KEY)
- POST /api/ai/summarize/ { logs } -> summary

All protected endpoints require Authorization: Bearer <access_token>.
