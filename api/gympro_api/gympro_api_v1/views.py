from rest_framework import permissions, viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth.models import Group, User
from .models import Teacher, Student, Exercise, Serie, Workout, Category, Day, WorkoutExercise, WorkoutSerie, DayCategory
from gympro_api.gympro_api_v1.serializers import (
    UserSerializer,
    TeacherSerializer,
    StudentSerializer,
    ExerciseSerializer,
    CategorySerializer,
    SerieSerializer,
    WorkoutSerializer,
    DaySerializer
)

class DayList(generics.GenericAPIView):
    serializer_class = DaySerializer
    
    def get(self, request, format=None):
        days = Day.objects.all() 
        serializer = DaySerializer(days, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        student = Student.objects.get(pk=request.data['student'])

        new_day = Day.objects.create(
            weekday=request.data['weekday'],
            student=student
        )

        for category in request.data["categories"]:
            find_category = Category.objects.get(pk=category['id'])
            DayCategory.objects.create(day=new_day, category=find_category)

        new_day.save() 
           
        serializer = DaySerializer(new_day)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 


class DayDetail(generics.GenericAPIView):
    serializer_class = DaySerializer
    
    def delete(self, request, pk, format=None):
        entry = Day.objects.get(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
       

class CategoryList(generics.GenericAPIView):
    serializer_class = CategorySerializer
    
    def get(self, request, format=None):
        categories = Category.objects.all() 
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        new_category = Category.objects.create(
            name=request.data['name']
        )
        new_category.save()
        serializer = CategorySerializer(new_category)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

class CategoryDetail(generics.GenericAPIView):
    serializer_class = CategorySerializer
    
    def delete(self, request, pk, format=None):
        entry = Category.objects.get(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

   

class ExerciseList(generics.ListAPIView):
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
   
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'category_ids',
                openapi.IN_QUERY,
                description="Comma-separated category IDs (e.g., ?category_ids=1,2,3)",
                type=openapi.TYPE_STRING,
            ),
        ],
        responses={200: ExerciseSerializer(many=True)}
    )
    def get(self, request, format=None):
        category_ids = request.query_params.get('category_ids')

        exercises = Exercise.objects.all()

        if category_ids:           
            category_ids = [int(id) for id in category_ids.split(",")]
            exercises = exercises.filter(category_id__in=category_ids)

        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        student = Student.objects.get(pk=request.data['student'])
        category = Category.objects.get(pk=request.data['category'])

        new_exercise = Exercise.objects.create(
            name=request.data['name'],
            student=student,
            category=category
        )
        
        for serie in request.data["series"]:
            new_serie = Serie.objects.create(
                weight=serie['weight'],
                repetitions=serie['repetitions']
            )
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
            new_serie = Serie.objects.create(
                weight=serie['weight'],
                repetitions=serie['repetitions']
            )
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
        new_user = User.objects.create_user(
            request.data['user']['username'],
            request.data['user']['email'],
            request.data['user']['password']
        )
        new_user.save()

        new_teacher = Teacher.objects.create(
            user=new_user, 
            full_name=request.data['full_name']
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
        new_user = User.objects.create_user(
            request.data['user']['username'],
            request.data['user']['email'],
            request.data['user']['password']
        )
        new_user.save()

        teacher = Teacher.objects.get(pk=request.data['teacher'])

        new_student = Student.objects.create(
            user=new_user, 
            teacher=teacher,
            full_name=request.data['full_name']
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
            startDate=request.data['start_date'],
            endDate=request.data['end_date'],
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


  

    
