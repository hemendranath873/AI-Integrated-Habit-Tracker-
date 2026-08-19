from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Habit, HabitEntry
from .serializers import HabitSerializer, HabitEntrySerializer
from datetime import date

class HabitViewSet(viewsets.ModelViewSet):
    serializer_class = HabitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def mark(self, request, pk=None):
        habit = self.get_object()
        d = request.data.get('date') or str(date.today())
        status_ = request.data.get('status','done')
        notes = request.data.get('notes','')
        entry, created = HabitEntry.objects.update_or_create(habit=habit, date=d, defaults={'status':status_,'notes':notes})
        return Response(HabitEntrySerializer(entry).data)

class HabitEntryViewSet(viewsets.ModelViewSet):
    serializer_class = HabitEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HabitEntry.objects.filter(habit__owner=self.request.user)