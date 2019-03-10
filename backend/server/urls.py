from django.urls import re_path, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from backend.server.custom_jwt import MyTokenObtainPairView
from backend.server.custom_jwt import MyKioskTokenObtainPairView
from . import views

urlpatterns = [
    path('api/companies', views.CompanyListView.as_view()),
    path('api/companies/create', views.CompanyCreateView.as_view()),
    path('api/companies/<pk>', views.CompanyDetailView.as_view()),
    path('api/companies/message', views.CompanyMessageView.as_view()),
    path('api/visitors', views.VisitorsListView.as_view()),
    path('api/visitors/create', views.VisitorsCreateView.as_view()),
    path('api/visitors/<visitor_id>', views.VisitorsDetailView.as_view()),
    path('api/visitors/<pk>/update', views.VisitorsUpdateView.as_view()),
    path('api/checkins', views.CheckInsListView.as_view()),
    path('api/checkins/create', views.CheckInsCreateView.as_view()),
    path('api/checkins/<pk>', views.CheckInsDetailView.as_view()),
    path('api/timesheets', views.TimesheetListView.as_view()),
    path('api/timesheets/create', views.TimesheetCreateView.as_view()),
    path('api/timesheets/<pk>', views.TimesheetDetailView.as_view()),
    path('api/visitreasons', views.VisitReasonListView.as_view()),
    path('api/visitreason/create', views.VisitReasonCreateView.as_view()),
    path('api/visitreason/<pk>', views.VisitReasonDetailView.as_view()),
    path('api/checkinvisitreason', views.CheckInVisitReasonListView.as_view()),
    path('api/checkinvisitreason/create', views.CheckInVisitReasonCreateView.as_view()),
    path('api/checkinvisitreason/<pk>', views.CheckInVisitReasonDetailView.as_view()),
    path('api/login', MyTokenObtainPairView.as_view()),
    path('api/kioskmode', MyKioskTokenObtainPairView.as_view()),
    path('api/refresh', TokenRefreshView.as_view()),
    path('api/register', views.Registration.as_view()),
    re_path(r'', views.index, name='index'),
]
