from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Habit(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    frequency = models.CharField(max_length=50, default='daily')  # daily/weekly/custom
    tags = models.CharField(max_length=200, blank=True)
    color = models.CharField(max_length=20, default='indigo')  # for colorful dashboard
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.title} ({self.owner})"

class HabitEntry(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='entries')
    date = models.DateField()
    status = models.CharField(max_length=20, choices=(('done','done'),('skipped','skipped'),('missed','missed')), default='done')
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('habit','date')
        ordering = ['-date']

    def _str_(self):
        return f"{self.habit.title} {self.date} {self.status}"