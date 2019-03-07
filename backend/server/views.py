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
from django.core import serializers
from django.http import HttpResponse
from datetime import datetime
from datetime import date
import pytz
from django.http import JsonResponse


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

class CompanyMessageView(APIView):
    """
    /api/companies/message
    Handle company check-in messages
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        """
        POST /api/companies/message
        Set new company message
        Required Parameters: company_name, company_message
        """
        try:
            name, message = request.data['company_name'], request.data['company_message']

            # Get all companies with corresponding name
            companies = Company.objects.all().filter(company_name=name)
            if(companies):
                # Update all companies with company message
                for company in companies:
                    company.company_message = message
                    company.save()
                return Response(companies.first().company_message, status=status.HTTP_200_OK)
            else:
                message = {'error' : 'company with that name does not exist!'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception:
            message = {'missing parameters' : 'company_name or company_message'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format='json'):
        """
        GET /api/companies/message
        Returns company message
        Required Parameters: company_name
        """
        try:
            name = request.data['company_name']

            # Get company message and return it
            company = Company.objects.all().filter(company_name=name).first()
            if(company):
                company_message = company.company_message
                return Response(company_message, status=status.HTTP_200_OK)
            else:
                message = {'error' : 'company with that name does not exist!'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            message = {'missing parameter' : 'company_name'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

            

class CheckInsListView(generics.ListAPIView):
    queryset = CheckIns.objects.all()
    serializer_class = CheckInsSerializer

    def get(self, request, format = 'json'):
        # find var in the query, else get the second param
        start_time = request.GET.get('start_time',None) 
        end_time =  request.GET.get('end_time',None) 

        if not start_time:
            return Response({'Start time' : 'invalid'}, status = status.HTTP_400_BAD_REQUEST)

        if not end_time:
            return Response({'End time' : 'invalid'}, status = status.HTTP_400_BAD_REQUEST)

        tz = pytz.utc

        start_time = tz.localize(datetime.strptime(start_time, '%m/%d/%Y'))#.date()
        end_time   = tz.localize(datetime.strptime(end_time,   '%m/%d/%Y'))#.date()

        # swap if start time is bigger
        if start_time > end_time:
            start_time, end_time = end_time, start_time

        # get all CheckIns 
        c = CheckIns.objects.all() 

        # filter for dates, 
        # check_in greater than or equal to start time
        # check_in less than or equal to end time (may use lt for less than)
        c = c.filter(check_in__gte = start_time, check_in__lte = end_time)
          
        # may need to filter by company :: TO DO

        # format as JSON and send it back
        # this returns an array of json values per checkin -- probably what we wont
        data = list(c.values())
        return JsonResponse(data, safe=False) 

        # this returns an array of objects, that have stuff like primary keys in them and stuff like that -- probably what we dont want
        qs_json = serializers.serialize('json', c)
        return HttpResponse(qs_json, content_type='application/json', status = status.HTTP_200_OK)


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

