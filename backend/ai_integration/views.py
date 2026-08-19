from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import os
import openai
from .prompts import HABIT_SUGGEST_PROMPT, PROGRESS_SUMMARY_PROMPT

openai.api_key = os.getenv('OPENAI_API_KEY')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def suggest_habits(request):
    user_text = request.data.get('text','')
    if not user_text:
        return Response({'error':'text is required'}, status=400)
    prompt = HABIT_SUGGEST_PROMPT.format(user_text=user_text)
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":prompt}],
        max_tokens=400,
    )
    content = resp.choices[0].message.content
    return Response({'raw': content})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def summarize_progress(request):
    logs = request.data.get('logs','')
    prompt = PROGRESS_SUMMARY_PROMPT.format(logs=logs)
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":prompt}],
        max_tokens=300,
    )
    return Response({'summary': resp.choices[0].message.content})
