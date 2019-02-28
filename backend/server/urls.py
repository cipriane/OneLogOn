from django.urls import re_path, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from backend.server.custom_jwt import MyTokenObtainPairView
from backend.server.custom_jwt import MyKioskTokenObtainPairView
from . import views

urlpatterns = [
    path('api/student', views.StudentListCreate.as_view()),
    path('api/company', views.CompanyListCreate.as_view()),
    path('api/visitor', views.VisitorsListCreate.as_view()),
    path('api/listreason', views.ListReasonsListCreate.as_view()),
    path('api/checkin', views.CheckInsListCreate.as_view()),
    path('api/timesheet', views.TimeSheetListCreate.as_view()),
    path('api/visitorreason', views.VisitorReasonListCreate.as_view()),
    path('api/checkinvisitorreason', views.CheckInVisitorReasonListCreate.as_view()),
    path('api/login', MyTokenObtainPairView.as_view()),
    path('api/kioskmode', MyKioskTokenObtainPairView.as_view()),
    path('api/refresh', TokenRefreshView.as_view()),
    path('api/register', views.Registration.as_view()),
    re_path(r'', views.index, name='index'),
]
