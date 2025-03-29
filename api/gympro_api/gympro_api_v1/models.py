from django.db import models
from django.contrib. auth.models import User

class Teacher(models.Model):
    full_name = models.CharField(max_length=30)
    picture_url = models.CharField(max_length=400, default="https://i.stack.imgur.com/y9DpT.jpg")
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.full_name


class Student(models.Model):
    full_name = models.CharField(max_length=30)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    picture_url = models.CharField(max_length=400, default="https://i.stack.imgur.com/y9DpT.jpg")
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
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Serie(models.Model):
    weight = models.IntegerField(default=0)
    repetitions = models.IntegerField(default=0)
    exercise = models.ForeignKey(Exercise, related_name='series', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return ''

class Workout(models.Model):
    name = models.CharField(max_length=30)
    start_date = models.DateTimeField(blank=True)
    end_date = models.DateTimeField(blank=True)
    duration = models.IntegerField(default=0)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class WorkoutExercise(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.workout.name} - {self.exercise.name}"

class WorkoutSerie(models.Model):
    workout_exercise = models.ForeignKey(WorkoutExercise, on_delete=models.CASCADE) 
    series = models.ForeignKey(Serie, on_delete=models.CASCADE) 
    repetitions = models.PositiveIntegerField() 
    weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Serie for {self.workout_exercise.exercise.name} in {self.workout_exercise.workout.name}"
