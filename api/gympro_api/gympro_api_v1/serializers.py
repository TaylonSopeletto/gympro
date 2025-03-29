from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Exercise, Serie, Workout, Category, Day, WorkoutExercise, WorkoutSerie, DayCategory
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

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class DayCategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='category.name')

    class Meta:
        model = DayCategory
        fields = ['id', 'name']

class DaySerializer(serializers.ModelSerializer):
    categories = DayCategorySerializer(source='daycategory_set', many=True)
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    class Meta:
        model = Day
        fields = ['id', 'weekday', 'categories', 'student']

class ExerciseSerializer(serializers.ModelSerializer):
    series = SerieSerializer(many=True, required=False)
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'series', 'student', 'category']

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
