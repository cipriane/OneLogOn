from django.db import models
from django.utils import timezone
from django.utils.timezone import now

class Student(models.Model):
    name = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class SignIns(models.Model):
    user_id = models.CharField(max_length=30)
    sign_in = models.DateTimeField()
    sign_out = models.DateTimeField()

class Visitors(models.Model):
    user_id = models.ForeignKey(SignIns, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30,null=True)
    isEmployee = models.BooleanField(default=False)
    waiver = models.BooleanField(default=False)

class Company(models.Model):
    company_name = models.CharField(max_length=30)
    company_address = models.CharField(max_length=50)
    company_zip = models.CharField(max_length=15)
    company_state = models.CharField(max_length=2)

class Admin(models.Model):
    company_name = models.ForeignKey(Company,on_delete=models.CASCADE)
    user_name = models.CharField(max_length=25, primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.CharField(max_length=10)


