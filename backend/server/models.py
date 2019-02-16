from django.db import models
from django.utils import timezone
from django.utils.timezone import now

class Student(models.Model):
    name = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Company(models.Model):
    company_name = models.CharField(max_length=30)
    company_address = models.CharField(max_length=50)
    company_city = models.CharField(max_length=30)
    company_zip = models.CharField(max_length=15)
    company_state = models.CharField(max_length=2)

class Visitors(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    visitor_id = models.CharField(max_length=10)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30,null=True)
    is_Employee = models.BooleanField(default=False)
    waiver_signed = models.BooleanField(default=False)

class SignIns(models.Model):
    visitor_id = models.IntegerField()
    user_id = models.CharField(max_length=30)
    sign_in = models.DateTimeField()
    sign_out = models.DateTimeField()
    visit_reason = models.ForeignKey(Visitors, on_delete=models.CASCADE)


class Admin(models.Model):
    company_id = models.ForeignKey(Company,on_delete=models.CASCADE)
    company_name = models.CharField(max_length=50)
    user_name = models.CharField(max_length=25, primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.CharField(max_length=10)

class VisitorReason(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    visit_reason = models.CharField(max_length=30)
    is_active = models.BooleanField(default=False)

class SignInVisitorReason(models.Model):
    signin_id = models.ForeignKey(SignIns, on_delete=models.CASCADE)
    visitor_reason_id = models.ForeignKey(VisitorReason, on_delete=models.CASCADE)
