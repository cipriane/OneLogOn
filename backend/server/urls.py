from django.urls import re_path, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from backend.server.custom_jwt import MyTokenObtainPairView
from backend.server.custom_jwt import MyKioskTokenObtainPairView
from . import views

urlpatterns = [
    path('api/students', views.StudentListView.as_view()),
    path('api/students/create/', views.StudentCreateView.as_view()),
    path('api/students/<pk>', views.StudentDetailView.as_view()),
    path('api/students/<pk>/update/', views.StudentUpdateView.as_view()),
    path('api/students/<pk>/delete/', views.StudentDeleteView.as_view()),
    path('api/companies', views.CompanyListView.as_view()),
    path('api/companies/create/', views.CompanyCreateView.as_view()),
    path('api/companies/<pk>', views.CompanyDetailView.as_view()),
    path('api/companies/message/', views.CompanyMessageView.as_view()),
    path('api/visitors', views.VisitorsListView.as_view()),
    path('api/visitors/create/', views.VisitorsCreateView.as_view()),
    path('api/visitors/<pk>', views.VisitorsDetailView.as_view()),
    path('api/visitors/<pk>/waiver/', views.VisitorsUpdateWaiverView.as_view()),
    path('api/listreasons', views.ListReasonsListView.as_view()),
    path('api/listreasons/create/', views.ListReasonsCreateView.as_view()),
    path('api/listreasons/<pk>', views.ListReasonsDetailView.as_view()),
    path('api/checkins', views.CheckInsListView.as_view()),
    path('api/checkins/create/', views.CheckInsCreateView.as_view()),
    path('api/checkins/<pk>', views.CheckInsDetailView.as_view()),
    path('api/timesheets', views.TimeSheetListView.as_view()),
    path('api/timesheets/create/', views.TimeSheetCreateView.as_view()),
    path('api/timesheets/<pk>', views.TimeSheetDetailView.as_view()),
    path('api/visitorreasons', views.VisitorReasonListView.as_view()),
    path('api/visitorreasons/create', views.VisitorReasonCreateView.as_view()),
    path('api/visitorreasons/<pk>', views.VisitorReasonDetailView.as_view()),
    path('api/checkinvisitorreasons', views.CheckInVisitorReasonListView.as_view()),
    path('api/checkinvisitorreasons/create/', views.CheckInVisitorReasonCreateView.as_view()),
    path('api/checkinvisitorreasons/<pk>', views.CheckInVisitorReasonDetailView.as_view()),
    path('api/login', MyTokenObtainPairView.as_view()),
    path('api/kioskmode', MyKioskTokenObtainPairView.as_view()),
    path('api/refresh', TokenRefreshView.as_view()),
    path('api/register', views.Registration.as_view()),
    re_path(r'', views.index, name='index'),
]
