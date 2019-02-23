from django.shortcuts import get_object_or_404, render
from rest_framework import generics
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

class StudentListCreate(generics.ListCreateAPIView):
    """
    /api/student
    Test student API endpoint
    """
    permission_classes = (IsAuthenticated,)
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # test get
    def get(self, request):
        content = { 'message': 'mitch says hello' }
        return Response(content)

class CompanyListCreate(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CheckInsListCreate(generics.ListCreateAPIView):
    queryset = CheckIns.objects.all()
    serializer_class = CheckInsSerializer

class TimeSheetListCreate(generics.ListCreateAPIView):
    queryset = TimeSheet.objects.all()
    serializer_class = CheckInsSerializer

class VisitorsListCreate(generics.ListCreateAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer

class VisitorReasonListCreate(generics.ListCreateAPIView):
    queryset = VisitorReason.objects.all()
    serializer_class = VisitorReasonSerializer

class CheckInVisitorReasonListCreate(generics.ListCreateAPIView):
    queryset = CheckInVisitorReason.objects.all()
    serializer_class = CheckInVisitorReasonSerializer

class ListReasonsListCreate(generics.ListCreateAPIView):
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

            try: # check if company exists
                company = Company.objects.get(company_name=request.data['company_name'])
            except Exception: # create new company
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
            message = {'error' : 'invalid user data'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        