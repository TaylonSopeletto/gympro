from django.urls import include, path
from rest_framework import routers
from gympro_api.gympro_api_v1 import views

from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.urls import path
from rest_framework_simplejwt import views as jwt_views


schema_view = get_schema_view(
   openapi.Info(
      title="Gympro API",
      default_version='v1',
      description="API to help with exercises"
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
   path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
   path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
   path('exercises/', views.ExerciseList.as_view()),
   path('exercises/<int:pk>', views.ExerciseDetail.as_view()),
   path('teachers/', views.TeacherList.as_view()),
   path('students/', views.StudentList.as_view()),
   path('workouts/', views.WorkoutList.as_view()),
   path('categories/', views.CategoryList.as_view()),
   path('categories/<int:pk>', views.CategoryDetail.as_view()),
   path('days/', views.DayList.as_view()),
   path('days/<int:pk>', views.DayDetail.as_view())
]

