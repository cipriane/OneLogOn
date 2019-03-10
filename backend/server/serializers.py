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

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('company_name', 'company_address','company_city',
        'company_zip','company_state')

class CheckInsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIns
        fields = ('visitor', 'check_in', 'check_out')

class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = ('user', 'time_in', 'time_out')

class VisitorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields = ('id', 'company', 'visitor_id', 'first_name',
        'last_name', 'is_employee', 'waiver_signed')

class VisitReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitReason
        fields = ('id', 'description', 'is_active')

class CheckInVisitReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInVisitReason
        fields = ('CheckIn_id', 'visitor_reason_id')

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)
    email = serializers.EmailField()

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'])
        user.email = validated_data['email']
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class UserCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCompany
        fields = '__all__'
