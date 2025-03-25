from rest_framework import permissions, viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django.contrib.auth.models import Group, User

from .models import Teacher, Student, Exercise, Serie
from gympro_api.gympro_api_v1.serializers import (
    UserSerializer,
    TeacherSerializer,
    StudentSerializer,
    ExerciseSerializer,
    SerieSerializer,
)

class ExerciseList(generics.GenericAPIView):
    serializer_class = ExerciseSerializer

    def get(self, request, format=None):
        exercises = Exercise.objects.all() 
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        new_exercise = Exercise.objects.create()
        new_exercise.name = request.data['name']
        new_exercise.weekday = request.data['weekday']
        new_exercise.category = request.data['category']

        new_exercise.save()

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
        exercise = Exercise.objects.get(pk=pk) 
        exercise.name = request.data['name']
        exercise.weekday = request.data['weekday']
        exercise.category = request.data['category']

        exercise.series.clear()

        for serie in request.data["series"]:
            new_serie = Serie.objects.create(weight=serie['weight'], repetitions=serie['repetitions'])
            new_serie.save()
            exercise.series.add(new_serie)

        exercise.save()

        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data) 


# better way of doing it

# from django.db import transaction
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Exercise, Serie
# from gympro_api.gympro_api_v1.serializers import ExerciseSerializer

# class ExerciseCreateView(APIView):
#     def post(self, request, format=None):
#         with transaction.atomic():  # Ensure atomicity
#             # Extract data safely
#             name = request.data.get("name", "")
#             weekday = request.data.get("weekday", "")
#             category = request.data.get("category", "")
#             series_data = request.data.get("series", [])

#             # Create the exercise instance
#             new_exercise = Exercise.objects.create(
#                 name=name, weekday=weekday, category=category
#             )

#             # Bulk create series
#             series_instances = [
#                 Serie(weight=serie.get('weight', 0), repetitions=serie.get('repetitions', 0))
#                 for serie in series_data
#             ]
#             created_series = Serie.objects.bulk_create(series_instances)

#             # Add the created series to the exercise
#             new_exercise.series.add(*created_series)

#             # Serialize and return the response
#             serializer = ExerciseSerializer(new_exercise)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

    
