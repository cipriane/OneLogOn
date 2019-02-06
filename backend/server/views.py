from django.shortcuts import render
from backend.server.models import Student
from backend.server.models import Admin
from backend.server.models import Company
from backend.server.models import SignIns
from backend.server.models import Visitors
from backend.server.serializers import StudentSerializer
from backend.server.serializers import AdminSerializer
from backend.server.serializers import CompanySerializer
from backend.server.serializers import SignInsSerializer
from backend.server.serializers import VisitorsSerializer
from rest_framework import generics

def index(request):
    return render(request, 'index.html')

class StudentListCreate(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class AdminListCreate(generics.ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class CompanyListCreate(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class SignInsListCreate(generics.ListCreateAPIView):
    queryset = SignIns.objects.all()
    serializer_class = SignInsSerializer

class VisitorsListCreate(generics.ListCreateAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer
