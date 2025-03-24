from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Exercise, Serie
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


class SerieSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Serie
        fields = ['id', 'weight', 'repetitions', 'exercise']

class ExerciseSerializer(serializers.ModelSerializer):
    series = SerieSerializer(many=True, read_only=True)
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'series', 'weekday', 'category']

