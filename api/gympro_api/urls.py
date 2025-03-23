from django.urls import include, path
from rest_framework import routers

from gympro_api.gympro_api_v1 import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'exercises', views.ExerciseViewSet)
router.register(r'series', views.SerieViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]