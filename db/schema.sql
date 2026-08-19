-- db/schema.sql
-- PostgreSQL schema for AI-Integrated Habit Tracker

-- Note: Django will normally create auth_user via migrations.
-- The following documents app tables.

CREATE TABLE IF NOT EXISTS habits_habit (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  frequency VARCHAR(50) NOT NULL DEFAULT 'daily',
  tags VARCHAR(200),
  color VARCHAR(20) DEFAULT 'indigo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS habits_habitentry (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER NOT NULL REFERENCES habits_habit(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('done','skipped','missed')),
  notes TEXT,
  UNIQUE (habit_id, date)
);

CREATE TABLE IF NOT EXISTS ai_airesponse (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES auth_user(id) ON DELETE SET NULL,
  prompt TEXT,
  response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
