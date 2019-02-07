from rest_framework import serializers
from backend.server.models import Student
from backend.server.models import Admin
from backend.server.models import Company
from backend.server.models import SignIns
from backend.server.models import Visitors


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