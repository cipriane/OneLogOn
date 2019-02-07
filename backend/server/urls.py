from django.urls import re_path, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from . import views

urlpatterns = [
    path('api/student', views.StudentListCreate.as_view()),
    path('api/admin', views.AdminListCreate.as_view()),
    path('api/company', views.CompanyListCreate.as_view()),
    path('api/signins', views.SignInsListCreate.as_view()),
    path('api/login', TokenObtainPairView.as_view()),
    path('api/refresh', TokenRefreshView.as_view()),
    re_path(r'', views.index, name='index'),
]
