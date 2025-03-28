from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Exercise, Serie, Workout, WorkoutExercise, WorkoutSerie
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
 
    class Meta:
        model = Teacher
        fields = ['id', 'fullName', 'user']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    class Meta:
        model = Student
        fields = ['id', 'fullName', 'user', 'teacher']


class SerieSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Serie
        fields = ['id', 'weight', 'repetitions']

class ExerciseSerializer(serializers.ModelSerializer):
    series = SerieSerializer(many=True, required=False)
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'series', 'weekday', 'category', 'student']

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
        fields = ['id', 'student', 'startDate', 'endDate', 'duration', 'exercises']
