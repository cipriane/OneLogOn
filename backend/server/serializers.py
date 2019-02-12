from rest_framework import serializers
from backend.server.models import Student
from backend.server.models import Admin
from backend.server.models import Company
from backend.server.models import SignIns
from backend.server.models import Visitors
from backend.server.models import VisitorReason
from backend.server.models import SignInVisitorReason


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

class SignInsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignIns
        fields = '__all__'

class VisitorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields ='__all__'

class VisitorReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorReason
        fields ='__all__'

class SignInVisitorReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignInVisitorReason
        fields ='__all__'
