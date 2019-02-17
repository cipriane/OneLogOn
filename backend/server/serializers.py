from rest_framework import serializers
from backend.server.models import Student
from backend.server.models import Admin
from backend.server.models import Company
from backend.server.models import CheckIns
from backend.server.models import TimeSheet
from backend.server.models import Visitors
from backend.server.models import ListReasons
from backend.server.models import VisitorReason
from backend.server.models import CheckInVisitorReason


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class CheckInsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIns
        fields = '__all__'

class TimeSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSheet
        fields = '__all__'

class VisitorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields ='__all__'

class VisitorReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorReason
        fields ='__all__'

class CheckInVisitorReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInVisitorReason
        fields ='__all__'

class ListReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListReasons
        fields ='__all__'
