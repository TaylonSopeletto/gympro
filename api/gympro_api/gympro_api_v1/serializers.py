from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Category, Exercise, Serie
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email']
        

class TeacherSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
 
    class Meta:
        model = Teacher
        fields = ['id', 'fullName', 'user']


class StudentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    class Meta:
        model = Student
        fields = ['id', 'fullName', 'user', 'teacher']


class CategorySerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    class Meta:
        model = Category
        fields = ['id', 'name', 'weekday', 'student']


class ExerciseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'category']

class SerieSerializer(serializers.ModelSerializer):
    exercise = serializers.PrimaryKeyRelatedField(queryset=Exercise.objects.all())
    class Meta:
        model = Serie
        fields = ['id', 'exercise', 'weight', 'repetitions']
