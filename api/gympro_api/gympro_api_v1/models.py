from django.db import models
from django.contrib. auth.models import User


class Teacher(models.Model):
    fullName = models.CharField(max_length=30)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.fullName


class Student(models.Model):
    fullName = models.CharField(max_length=30)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.fullName



class Exercise(models.Model):
    name = models.CharField(max_length=30)
    weekday = models.CharField(max_length=30)
    category = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name


class Serie(models.Model):
    weight = models.IntegerField(default=0)
    repetitions = models.IntegerField(default=0)
    exercise = models.ForeignKey(Exercise, related_name='series', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return ''

