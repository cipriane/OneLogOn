from django.urls import re_path, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from . import views

urlpatterns = [
    path('api/student', views.StudentListCreate.as_view()),
    path('api/company', views.CompanyListCreate.as_view()),
    path('api/visitors', views.VisitorsListCreate.as_view()),
    path('api/listreasons', views.ListReasonsListCreate.as_view()),
    path('api/checkins', views.CheckInsListCreate.as_view()),
    path('api/admin', views.AdminListCreate.as_view()),
    path('api/timesheet', views.TimeSheetListCreate.as_view()),
    path('api/visitorreason', views.VisitorReasonListCreate.as_view()),
    path('api/checkinvisitorreason', views.CheckInVisitorReasonListCreate.as_view()),
    path('api/login', TokenObtainPairView.as_view()),
    path('api/refresh', TokenRefreshView.as_view()),
    re_path(r'', views.index, name='index'),
]
