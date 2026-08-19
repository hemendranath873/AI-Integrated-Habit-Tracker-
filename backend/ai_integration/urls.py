from django.urls import path
from .views import suggest_habits, summarize_progress

urlpatterns = [
    path('suggest/', suggest_habits, name='suggest-habits'),
    path('summarize/', summarize_progress, name='summarize-progress'),
]
