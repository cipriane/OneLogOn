from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from backend.server.models import Company
from backend.server.models import CheckIns
from backend.server.models import Timesheet
from backend.server.models import Visitors
from backend.server.models import VisitReason
from backend.server.models import CheckInVisitReason
from backend.server.models import UserCompany
from backend.server.models import Invite

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('company_name', 'company_address','company_city',
        'company_zip','company_state')

class CheckInsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIns
        fields = ('id', 'visitor', 'check_in', 'check_out')

class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = ('user', 'time_in', 'time_out')

class VisitorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields = ('id', 'company', 'visitor_id', 'first_name',
        'last_name', 'is_employee', 'waiver_signed', 'date_hired')

class VisitReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitReason
        fields = ('id', 'company', 'description', 'is_active', 'is_main_reason', 'has_sub_reasons')

class CheckInVisitReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInVisitReason
        fields = ('check_in', 'visit_reason')

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)
    email = serializers.EmailField()

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'])
        user.email = validated_data['email']
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.is_staff = validated_data['is_staff']
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_staff', 'is_active')

class UserCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCompany
        fields = '__all__'

class InviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invite
        fields = '__all__'
