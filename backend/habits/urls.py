from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import HabitViewSet, HabitEntryViewSet

router = DefaultRouter()
router.register(r'', HabitViewSet, basename='habits')
router.register(r'entries', HabitEntryViewSet, basename='entries')

urlpatterns = [
    path('', include(router.urls)),
]