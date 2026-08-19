HABIT_SUGGEST_PROMPT = """
You are an expert habit coach. Given user description and goals, return 3 suggested daily/weekly habits.
Format as JSON list objects: [{"title":"...", "description":"...", "frequency":"daily/weekly", "suggested_time":"morning/evening", "color":"indigo"}]
User description:
{user_text}
"""

PROGRESS_SUMMARY_PROMPT = """
You are an assistant that summarizes habit progress. Given user habit logs and metadata, produce a short summary of progress, current streaks, suggestions to improve.
Logs:
{logs}
"""
