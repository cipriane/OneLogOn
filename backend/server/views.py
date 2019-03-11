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
from backend.server.models import Company
from backend.server.models import Visitors
from backend.server.models import CheckIns
from backend.server.models import Timesheet
from backend.server.models import VisitReason
from backend.server.models import CheckInVisitReason
from backend.server.models import UserCompany
from backend.server.serializers import CompanySerializer
from backend.server.serializers import CheckInsSerializer
from backend.server.serializers import TimesheetSerializer
from backend.server.serializers import VisitorsSerializer
from backend.server.serializers import VisitReasonSerializer
from backend.server.serializers import CheckInVisitReasonSerializer
from backend.server.serializers import UserCompanySerializer
from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from datetime import datetime
from django.utils.timezone import now
from pytz import timezone
from datetime import date
import pytz


def index(request):
    return render(request, 'index.html')

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
        Required Parameters: company_message
        """
        try:
            id, message = request.user.id, request.data['company_message']
            try:
                # Get company
                company_id = UserCompany.objects.get(user_id=id).company_id
                company = Company.objects.get(id=company_id)
                # Update company message and save it
                company.company_message = message
                company.save()
                message = {'company_message' : company.company_message}
                return Response(message, status=status.HTTP_200_OK)

            except Exception:
                message = {'error' : 'company does not exist'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            message = {'missing parameter' : 'company_message'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format='json'):
        """
        GET /api/companies/message
        Returns company message
        Required Parameters: None
        """
        try:
            id = request.user.id
            try:
                # Get company message using UserCompany table and return company message
                company_id = UserCompany.objects.get(user_id=id).company_id
                company = Company.objects.get(id=company_id)
                message = {'company_message' : company.company_message}
                return Response(message, status=status.HTTP_200_OK)

            except Exception:
                message = {'error' : 'company does not exist'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            message = {'error' : 'user is not logged in'}
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
class CheckInsUpdateView(generics.UpdateAPIView):
    queryset = CheckIns.objects.all()
    serializer_class = CheckInsSerializer

class TimesheetListView(generics.ListAPIView):
    queryset = Timesheet.objects.all()
    serializer_class = CheckInsSerializer
class TimesheetDetailView(generics.RetrieveAPIView):
    queryset = Timesheet.objects.all()
    serializer_class = CheckInsSerializer
class TimesheetCreateView(generics.CreateAPIView):
    queryset = Timesheet.objects.all()
    serializer_class = CheckInsSerializer

class VisitorsListView(generics.ListAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer
class VisitorsDetailView(generics.RetrieveAPIView):
    lookup_field = 'visitor_id'
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer
    def get(self, request, *args, **kwargs):
        company_id = UserCompany.objects.get(user_id=request.user.id).company_id
        visitor = Visitors.objects.filter(visitor_id=self.kwargs[self.lookup_field], company=company_id)
        if not visitor:
            return Response({'visitor': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        visitor = visitor.values()[0]
        try:
            lastCheckIn = CheckIns.objects.filter(visitor=visitor['id'],check_out__isnull=True).latest('check_in')
        except CheckIns.DoesNotExist:
            lastCheckIn = None;
        if lastCheckIn is None:
            visitor['is_checked_in'] = False
            visitor['check_in_id'] = False
        else:
            visitor['is_checked_in'] = lastCheckIn.check_in.astimezone(timezone('US/Pacific')).date() == now().today().date()
            visitor['check_in_id'] = lastCheckIn.id
        return JsonResponse(visitor)
class VisitorsCreateView(generics.CreateAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer
    def post(self, request, *args, **kwargs):
        request.data['company'] = UserCompany.objects.get(user_id=request.user.id).company_id
        return self.create(request, *args, **kwargs)
class VisitorsUpdateView(generics.UpdateAPIView):
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer

class VisitReasonListView(generics.ListAPIView):
    queryset = VisitReason.objects.all()
    serializer_class = VisitReasonSerializer
    def get(self, request, *args, **kwargs):
        company_id = UserCompany.objects.get(user_id=request.user.id).company_id
        reasons = VisitReason.objects.filter(company=company_id)
        data = list(reasons.values())
        return JsonResponse(data, safe=False)
class VisitReasonDetailView(generics.RetrieveAPIView):
    queryset = VisitReason.objects.all()
    serializer_class = VisitReasonSerializer
class VisitReasonCreateView(generics.CreateAPIView):
    queryset = VisitReason.objects.all()
    serializer_class = VisitReasonSerializer
    def post(self, request, *args, **kwargs):
        request.data['company'] = UserCompany.objects.get(user_id=request.user.id).company_id
        return self.create(request, *args, **kwargs)
class VisitReasonUpdateView(generics.UpdateAPIView):
    queryset = VisitReason.objects.all()
    serializer_class = VisitReasonSerializer
class VisitReasonDestroyView(generics.DestroyAPIView):
    queryset = VisitReason.objects.all()
    serializer_class = VisitReasonSerializer

class CheckInVisitReasonListView(generics.ListAPIView):
    queryset = CheckInVisitReason.objects.all()
    serializer_class = CheckInVisitReasonSerializer
class CheckInVisitReasonDetailView(generics.RetrieveAPIView):
    queryset = CheckInVisitReason.objects.all()
    serializer_class = CheckInVisitReasonSerializer
class CheckInVisitReasonCreateView(generics.CreateAPIView):
    queryset = CheckInVisitReason.objects.all()
    serializer_class = CheckInVisitReasonSerializer
    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        if not is_many:
            return super(CheckInVisitReasonCreateView, self).create(request, *args, **kwargs)
        else:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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
    Required Parameters: username, email, password, company_name
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
