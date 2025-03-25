from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Exercise, Serie
from rest_framework import permissions, viewsets, generics, status
from gympro_api.gympro_api_v1.serializers import  UserSerializer, TeacherSerializer, StudentSerializer, ExerciseSerializer, SerieSerializer

class ExerciseList(generics.GenericAPIView):
    serializer_class = ExerciseSerializer

    def get(self, request, format=None):
        exercises = Exercise.objects.all() 
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

class ExerciseDetail(generics.GenericAPIView):
    serializer_class = ExerciseSerializer

    def get(self, request, pk, format=None):
        exercises = Exercise.objects.all() 
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

    
