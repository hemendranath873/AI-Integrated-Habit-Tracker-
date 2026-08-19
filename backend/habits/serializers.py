from rest_framework import serializers
from .models import Habit, HabitEntry

class HabitEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitEntry
        fields = ('id','date','status','notes')

class HabitSerializer(serializers.ModelSerializer):
    entries = HabitEntrySerializer(many=True, read_only=True)
    class Meta:
        model = Habit
        fields = ('id','owner','title','description','frequency','tags','color','created_at','entries')
        read_only_fields = ('owner','created_at')