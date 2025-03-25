from django.urls import include, path
from rest_framework import routers
from gympro_api.gympro_api_v1 import views

from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'students', views.StudentViewSet)
# router.register(r'teachers', views.TeacherViewSet)
# router.register(r'exercises', views.ExerciseViewSet)
# router.register(r'series', views.SerieViewSet)



schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('exercises/', views.ExerciseList.as_view()),
    path('exercises/<int:pk>', views.ExerciseDetail.as_view()),
]

