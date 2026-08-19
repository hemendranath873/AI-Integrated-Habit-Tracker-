# Database Design

- auth_user: Django built-in user table.
- habits_habit:
  - owner_id -> FK auth_user.id
  - title, description, frequency, tags, color, created_at
- habits_habitentry:
  - habit_id -> FK habits_habit.id
  - date, status (done/skipped/missed), notes
  - UNIQUE(habit_id, date)
- ai_airesponse:
  - user_id -> FK auth_user.id (optional)
  - prompt (text)
  - response (JSONB)
  - created_at

Notes:
- Use Django migrations for production. Schema here is for documentation or manual setup.
