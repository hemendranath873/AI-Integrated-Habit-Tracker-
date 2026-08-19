-- db/seed.sql sample data (for testing)
-- Note: assumes auth_user exists (Django creates auth_user via migrations).
INSERT INTO habits_habit (owner_id, title, description, frequency, tags, color)
VALUES (1, 'Study Math', '1 hour focused study', 'daily', 'study,math', 'indigo');

INSERT INTO habits_habitentry (habit_id, date, status, notes)
VALUES (1, CURRENT_DATE - INTERVAL '1 day', 'done', 'Good session');
