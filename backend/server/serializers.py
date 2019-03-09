from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from backend.server.models import Student
from backend.server.models import Company
from backend.server.models import CheckIns
from backend.server.models import TimeSheet
from backend.server.models import Visitors
from backend.server.models import ListReasons
from backend.server.models import VisitorReason
from backend.server.models import CheckInVisitorReason
from backend.server.models import UserCompany

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('name', 'major', 'created_at', 'updated_at')


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('company_name', 'company_address','company_city',
        'company_zip','company_state')

class CheckInsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIns
        fields = ('visitor_id', 'user_id', 'check_in',
        'check_out', 'visit_reason')

class TimeSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSheet
        fields = ('user', 'time_in', 'time_out')

class VisitorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields = ('company', 'visitor_id', 'first_name',
        'last_name', 'is_employee', 'waiver_signed')

class VisitorReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorReason
        fields = ('company_id', 'visit_reason', 'is_active')

class CheckInVisitorReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInVisitorReason
        fields = ('CheckIn_id', 'visitor_reason_id')

class ListReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListReasons
        fields = ('company_sponsoring', 'visit_reason')

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
