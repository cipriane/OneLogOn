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
from backend.server.models import CompanyInvite
from backend.server.serializers import CompanySerializer
from backend.server.serializers import CompanyInviteSerializer
from backend.server.serializers import CheckInsSerializer
from backend.server.serializers import TimesheetSerializer
from backend.server.serializers import VisitorsSerializer
from backend.server.serializers import VisitReasonSerializer
from backend.server.serializers import CheckInVisitReasonSerializer
from backend.server.serializers import UserCompanySerializer
from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse

from datetime import timedelta
from datetime import datetime
from django.utils.timezone import now
from pytz import timezone
from datetime import date
import pytz

from django.core.mail import send_mail, EmailMultiAlternatives

import string, random # for generating random keys


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
        start_time = request.query_params.get('start_time')
        end_time = request.query_params.get('end_time')

        if not start_time:
            return Response({'Start time' : 'invalid'}, status = status.HTTP_400_BAD_REQUEST)

        if not end_time:
            return Response({'End time' : 'invalid'}, status = status.HTTP_400_BAD_REQUEST)

        california_tz = pytz.timezone('US/Pacific')
        start_time = california_tz.localize(datetime.strptime(start_time, '%m/%d/%Y'))
        end_time   = california_tz.localize(datetime.strptime(end_time,   '%m/%d/%Y'))

        # get all CheckIns
        c = CheckIns.objects.all().select_related('visitor').order_by('-check_in')

        # filter for dates,
        # check_in greater than or equal to start time
        # check_in less than or equal to end time (may use lt for less than)
        c = c.filter(check_in__gte = start_time, check_in__lte = end_time)

        # Filter by company
        company_id = UserCompany.objects.get(user_id=request.user.id).company_id
        c = c.filter(visitor__company=company_id)

        # format as JSON and send it back
        # this returns an array of json values per checkin -- probably what we wont
        check_ins = list(c.values(
            'visitor_id',
            'id',
            'check_in',
            'check_out',
            'visitor__visitor_id',
            'visitor__first_name',
            'visitor__last_name',
            'visitor__is_employee',
            'visitor__waiver_signed',
        ))

        check_in_ids = [c['id'] for c in check_ins]

        # Get visit reasons
        check_in_visit_reasons = CheckInVisitReason.objects.all().select_related('visit_reason').filter(check_in__in=check_in_ids)

        check_in_visit_reasons = list(check_in_visit_reasons.values(
            'check_in',
            'visit_reason__description',
        ))

        # normalize check_in_visit_reasons to be in the form:
        # {
        #   check_in_id: [reason_descriptions],
        # }
        normalized = {}
        for item in check_in_visit_reasons:
            if not item['check_in'] in normalized:
                normalized[item['check_in']] = []
            normalized[item['check_in']].append(item['visit_reason__description'])

        for check_in in check_ins:
            if check_in['id'] in normalized:
                check_in['reasons'] = normalized[check_in['id']]
            else:
                check_in['reasons'] = []

        return JsonResponse(check_ins, safe=False)
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
            lastCheckIn = None
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

class VisitorsUpdateWaiverView(generics.UpdateAPIView):
    """
    /api/visitors/<pk>/waiver/
    """
    queryset = Visitors.objects.all()
    serializer_class = VisitorsSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request,pk, format = 'json'):
        """
        POST /api/visitors/<pk>/waiver/
        Set visitor's waiver_signed field to True
        """
        try:
            #get visitor object with specified pk
            visitor = self.queryset.get(id=pk)

            visitor.waiver_signed = True
            visitor.save()
            return Response(status=status.HTTP_200_OK)
        except Exception:
            message = {'error' : 'Visitor doesn\'t exist'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class VisitReasonListView(generics.ListAPIView):
    queryset = VisitReason.objects.all()
    serializer_class = VisitReasonSerializer

    def get(self, request, *args, **kwargs):
        company_id = UserCompany.objects.get(user_id=request.user.id).company_id
        reasons = VisitReason.objects.filter(company=company_id)
        is_main = self.request.query_params.get('is_main_reason', None)
        if is_main is not None:
            is_main = True if is_main == 'true' else False
            reasons = reasons.filter(is_main_reason=is_main)
        is_archived = self.request.query_params.get('is_archived', None)
        if is_archived is not None:
            is_archived = True if is_archived == 'true' else False
            is_active = not is_archived
            reasons = reasons.filter(is_active=is_active)
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
    Required Parameters: username, email, password, company_name,
        company_address, company_city, company_zip, company_state
    """
    permission_classes = (AllowAny,)
    def post(self, request, format='json'):

        # make this a function in the future please.
        california_tz = pytz.timezone('US/Pacific')

        # obtain the key
        key =request.data.get('key', None)

        # verify the user is unique
        user_serializer = UserSerializer(data=request.data)

        # if we cannot verify the user, then throw
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # verify the company
        # if we have the key, locate the company
        if key:

            # verify the invite -- find the company associated with it
            try:
                # get the company id that has the key and expiration is greater than equal to today
                company_id = CompanyInvite.objects.get(
                    invite_key=key,
                    expires_on__gte = california_tz.localize(datetime.now())
                    ).company_id
            except Exception as err:
                # invite not found or expired
                return Response({'error': 'Invite is invalid or has expired.'}, status=status.HTTP_400_BAD_REQUEST)


        # if we do not have the key, make a new company
        else:
            # verify the company is not null
            company_serializer = CompanySerializer(data=request.data)

            # if we cannot verify, throw
            if not company_serializer.is_valid():
               return Response(company.errors, status=status.HTTP_400_BAD_REQUEST)

            # save the company -- get the id where we should save
            company_id = company_serializer.save().id

        # get the user
        user_id = user_serializer.save().id

        # bind user and company -- company already has the id
        data = {
            'user' : user_id,
            'company' : company_id
            }

        # attempt to bind otherwise throw
        user_company_serializer = UserCompanySerializer(data=data)
        if not user_company_serializer.is_valid():
            return Response(user_company_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # successfully created user and company, so we can now save
        user_company = user_company_serializer.save()

        return Response(user_serializer.data, status=status.HTTP_201_CREATED)


class ChangePassword(APIView):
    """
    /api/password
    Changes user password
    Required Parameters: old_password, new_password
    """
    permission_classes = (IsAuthenticated,)
    def post(self, request, format='json'):
        try:
            old_password, new_password = request.data['old_password'], request.data['new_password']
            user_id = request.user.id

            try:
                user = User.objects.get(id=user_id)

                if(user.check_password(old_password)):
                    user.set_password(new_password)
                    user.save()
                    return Response({'success' : 'password succesfully changed'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error' : 'incorrect old password'}, status=status.HTTP_400_BAD_REQUEST)

            except Exception:
                return Response({'error' : 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response({'error' : 'required parameters: old_password, new_password'}, status=status.HTTP_400_BAD_REQUEST)


class SendInvite(APIView):
    def post(self, request, format = 'json'):
        '''
            must pass in the body:
                recipient: email_address
        '''

        recipient = request.data['recipient']

        # to do: send expiration data through request or have static time
        # currently it expires exaclty 10 years from now -- see timedelta
        california_tz = pytz.timezone('US/Pacific')

        data = {
            'company'       : UserCompany.objects.get(user_id=request.user.id).company_id,
            'invite_key'    : '', # fill this out later in the loop
            'expires_on'    : california_tz.localize(datetime.now() + timedelta(days=365*10))
        }

        attempts = 0

        # generate invite code
        while True:
            # attempt to find a random string that has not been used before

            # generate len 32 random key
            data['invite_key'] = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])


            # attempt to save it, if it already exits, try again in the loop
            invite_serializer = CompanyInviteSerializer(data=data)

            # if it is valid, you will get a key, break
            if invite_serializer.is_valid():
                key = invite_serializer.save().invite_key
                break




        # to do: get a specific invite code
        invite_code = key

        # to do: get get email from request
        recipient = 'skarchmit@gmail.com'
        creator = 'onebitoffteam@gmail.com'
        link = 'http://127.0.0.1:8000/register/?key={invite_code}'.format(invite_code=invite_code)
        msg = 'Click this <a href = \"{link}\">link</a> to join'.format(link=link)
        subject = 'Invite to Join OneLogOn'

        send_mail(
            subject,
            '',
            creator,
            [recipient],
            html_message=msg,
            fail_silently=False,
        )

        return Response(status=status.HTTP_200_OK)
