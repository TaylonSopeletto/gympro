from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Exercise, Serie, Workout, Day, WorkoutExercise, WorkoutSerie, ExerciseDay
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
 
    class Meta:
        model = Teacher
        fields = ['id', 'full_name', 'user', 'picture_url']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    class Meta:
        model = Student
        fields = ['id', 'full_name', 'user', 'teacher', 'picture_url']


class SerieSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Serie
        fields = ['id', 'weight', 'repetitions']


class ExerciseDaySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='exercise.name')
    class Meta:
        model = ExerciseDay
        fields = ['id', 'position', 'name']

class DaySerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    exercises = ExerciseDaySerializer(source='exerciseday_set', many=True)
    class Meta:
        model = Day
        fields = ['id', 'name', 'weekday', 'student', 'exercises']

class ExerciseSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Exercise
        fields = ['id', 'name']

class WorkoutSerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSerie
        fields = ['id', 'weight', 'repetitions']


class WorkoutExerciseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='exercise.name')
    weekday = serializers.CharField(source='exercise.weekday')
    category = serializers.CharField(source='exercise.category')
    series = WorkoutSerieSerializer(source='workoutserie_set', many=True)

    class Meta:
        model = WorkoutExercise
        fields = ['id', 'name', 'weekday', 'category', 'series']


class WorkoutSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    exercises = WorkoutExerciseSerializer(source='workoutexercise_set', many=True)

    class Meta:
        model = Workout
        fields = ['id', 'student', 'start_date', 'end_date', 'duration', 'exercises']
