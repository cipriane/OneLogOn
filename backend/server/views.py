from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.server.serializers import UserSerializer
from django.contrib.auth.models import User
from backend.server.models import Student
from backend.server.models import Company
from backend.server.models import Visitors
from backend.server.models import CheckIns
from backend.server.models import TimeSheet
from backend.server.models import ListReasons
from backend.server.models import VisitorReason
from backend.server.models import CheckInVisitorReason
from backend.server.models import UserCompany
from backend.server.serializers import StudentSerializer
from backend.server.serializers import CompanySerializer
from backend.server.serializers import CheckInsSerializer
from backend.server.serializers import TimeSheetSerializer
from backend.server.serializers import ListReasonsSerializer
from backend.server.serializers import VisitorsSerializer
from backend.server.serializers import VisitorReasonSerializer
from backend.server.serializers import CheckInVisitorReasonSerializer
from backend.server.serializers import UserCompanySerializer

def index(request):
    return render(request, 'index.html')

    """
    START
    /api/student
    Test student API endpoint
    """

class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
class StudentDetailView(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
class StudentUpdateView(generics.UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
class StudentDeleteView(generics.DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    """
    /api/student
    Test student API endpoint
    END
    """

class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
class CompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
class CompanyCreateView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CheckInsListView(generics.ListAPIView):
    queryset = CheckIns.objects.all()
    serializer_class = CheckInsSerializer
class CheckInsDetailView(generics.RetrieveAPIView):
    queryset = CheckIns.objects.all()
    serializer_class = CheckInsSerializer
class CheckInsCreateView(generics.CreateAPIView):
    queryset = CheckIns.objects.all()
    serializer_class = CheckInsSerializer

class TimeSheetListView(generics.ListAPIView):
    queryset = TimeSheet.objects.all()
    serializer_class = CheckInsSerializer
class TimeSheetDetailView(generics.RetrieveAPIView):
        queryset = TimeSheet.objects.all()
        serializer_class = CheckInsSerializer
class TimeSheetCreateView(generics.CreateAPIView):
    queryset = TimeSheet.objects.all()
    serializer_class = CheckInsSerializer

class VisitorsListView(generics.ListAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer
class VisitorsDetailView(generics.RetrieveAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer
class VisitorsCreateView(generics.CreateAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer

class VisitorReasonListView(generics.ListAPIView):
    queryset = VisitorReason.objects.all()
    serializer_class = VisitorReasonSerializer
class VisitorReasonDetailView(generics.RetrieveAPIView):
    queryset = VisitorReason.objects.all()
    serializer_class = VisitorReasonSerializer
class VisitorReasonCreateView(generics.CreateAPIView):
    queryset = VisitorReason.objects.all()
    serializer_class = VisitorReasonSerializer

class CheckInVisitorReasonListView(generics.ListAPIView):
    queryset = CheckInVisitorReason.objects.all()
    serializer_class = CheckInVisitorReasonSerializer
class CheckInVisitorReasonDetailView(generics.RetrieveAPIView):
    queryset = CheckInVisitorReason.objects.all()
    serializer_class = CheckInVisitorReasonSerializer
class CheckInVisitorReasonCreateView(generics.CreateAPIView):
    queryset = CheckInVisitorReason.objects.all()
    serializer_class = CheckInVisitorReasonSerializer

class ListReasonsListView(generics.ListAPIView):
    queryset = ListReasons.objects.all()
    serializer_class = ListReasonsSerializer
class ListReasonsDetailView(generics.RetrieveAPIView):
    queryset = ListReasons.objects.all()
    serializer_class = ListReasonsSerializer
class ListReasonsCreateView(generics.CreateAPIView):
    queryset = ListReasons.objects.all()
    serializer_class = ListReasonsSerializer


class UserCreate(APIView):
    permission_classes = []
    """
    Creates the user.
    """
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

class Registration(APIView):
    """
    /api/register
    Register new User and new Company.
    Required Parameters: username, email, password, company_name,
        company_address, company_city, company_zip, company_state
    """
    permission_classes = (AllowAny,)
    def post(self, request, format='json'):
        user_serializer = UserSerializer(data=request.data)

        if user_serializer.is_valid():

            # check to make sure company data is valid
            company_serializer = CompanySerializer(data=request.data)
            if company_serializer.is_valid():
                company = company_serializer.save()
            else:
                message = {'error' : 'invalid company data'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

            # save user
            user = user_serializer.save()

            # connect company to user
            data = {'user' : user.id, 'company' : company.id}
            user_company_serializer = UserCompanySerializer(data=data)

            if user_company_serializer.is_valid():
                user_company = user_company_serializer.save()
                if user_company:
                    return Response(user_serializer.data, status=status.HTTP_201_CREATED)
                else:
                    message = {'error' : 'problem connecting user and company'}
                    return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = user_serializer.errors
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
