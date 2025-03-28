from rest_framework import permissions, viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Exercise, Serie, Workout, WorkoutExercise, WorkoutSerie
from gympro_api.gympro_api_v1.serializers import (
    UserSerializer,
    TeacherSerializer,
    StudentSerializer,
    ExerciseSerializer,
    SerieSerializer,
    WorkoutSerializer
)

class ExerciseList(generics.GenericAPIView):
    serializer_class = ExerciseSerializer

    def get(self, request, format=None):
        exercises = Exercise.objects.all() 
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        student = Student.objects.get(pk=request.data['student'])

        new_exercise = Exercise.objects.create(
            name=request.data['name'],
            weekday=request.data['weekday'],
            category=request.data['category'],
            student=student
        )
        
        for serie in request.data["series"]:
          new_serie = Serie.objects.create(weight=serie['weight'], repetitions=serie['repetitions'])
          new_serie.save()
          new_exercise.series.add(new_serie)

        new_exercise.save()

        serializer = ExerciseSerializer(new_exercise)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

class ExerciseDetail(generics.GenericAPIView):
    serializer_class = ExerciseSerializer

    def get(self, request, pk, format=None):
        exercises = Exercise.objects.all() 
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        student = Student.objects.get(pk=request.data['student'])

        exercise = Exercise.objects.get(pk=pk) 
        exercise.name = request.data['name']
        exercise.weekday = request.data['weekday']
        exercise.category = request.data['category']
        exercise.student = student

        exercise.series.clear()

        for serie in request.data["series"]:
            new_serie = Serie.objects.create(weight=serie['weight'], repetitions=serie['repetitions'])
            new_serie.save()
            exercise.series.add(new_serie)

        exercise.save()

        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data) 


class TeacherList(generics.GenericAPIView):
    serializer_class = TeacherSerializer

    def get(self, request, format=None):
        teachers = Teacher.objects.all() 
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        new_user = User.objects.create_user(request.data['user']['username'], request.data['user']['email'], request.data['user']['password'])
        new_user.save()

        new_teacher = Teacher.objects.create(
            user=new_user, 
            fullName=request.data['fullName']
        )

        serializer = TeacherSerializer(new_teacher)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED) 


class StudentList(generics.GenericAPIView):
    serializer_class = StudentSerializer

    def get(self, request, format=None):
        students = Student.objects.all() 
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        new_user = User.objects.create_user(request.data['user']['username'], request.data['user']['email'], request.data['user']['password'])
        new_user.save()

        teacher = Teacher.objects.get(pk=request.data['teacher'])

        new_student = Student.objects.create(
            user=new_user, 
            teacher=teacher,
            fullName=request.data['fullName']
        )

        serializer = StudentSerializer(new_student)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED) 


class WorkoutList(generics.GenericAPIView):
    serializer_class = WorkoutSerializer

    def get(self, request, format=None):
        workouts = Workout.objects.all() 
        serializer = WorkoutSerializer(workouts, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        student = Student.objects.get(pk=request.data['student'])

        workout = Workout.objects.create(
            student=student,
            startDate=request.data['startDate'],
            endDate=request.data['endDate'],
            duration=request.data['duration']
        )

        for exercise in request.data["exercises"]:
            reletad_exercise = Exercise.objects.get(pk=exercise['id'])
            workout_exercise = WorkoutExercise.objects.create(
                workout=workout,
                exercise=reletad_exercise
            )

            workout_exercise.save()

            for serie in exercise["series"]:
                related_serie = Serie.objects.get(pk=serie["id"])

                workout_serie = WorkoutSerie.objects.create(
                    workout_exercise=workout_exercise,
                    series=related_serie,
                    weight=serie['weight'],
                    repetitions=serie['repetitions']
                )

                workout_serie.save()

        workout.save()
        serializer = WorkoutSerializer(workout)

        return Response(serializer.data)


  

    
