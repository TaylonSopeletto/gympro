from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Category, Exercise, Serie
from rest_framework import permissions, viewsets
from gympro_api.gympro_api_v1.serializers import  UserSerializer, TeacherSerializer, StudentSerializer, CategorySerializer, ExerciseSerializer, SerieSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().order_by('fullName')
    serializer_class = TeacherSerializer
    permission_classes = [permissions.AllowAny]


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('fullName')
    serializer_class = StudentSerializer
    permission_classes = [permissions.AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.AllowAny]

class SerieViewSet(viewsets.ModelViewSet):
    queryset = Serie.objects.all()
    serializer_class = SerieSerializer
    permission_classes = [permissions.AllowAny]