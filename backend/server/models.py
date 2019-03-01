from django.db import models
from django.utils import timezone
from django.utils.timezone import now
from django.contrib.auth.models import User

class Student(models.Model):
    name = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Company(models.Model):
    company_name = models.CharField(max_length=30)
    company_address = models.CharField(max_length=50, null=True)
    company_city = models.CharField(max_length=30, null=True)
    company_zip = models.CharField(max_length=15, null=True)
    company_state = models.CharField(max_length=2, null=True)

class Visitors(models.Model):
    company = models.ForeignKey(Company,on_delete=models.CASCADE,verbose_name="company_ID")
    visitor_id = models.CharField(max_length=10)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30,null=True)
    is_employee = models.BooleanField(default=False)
    waiver_signed = models.BooleanField(default=False)

class ListReasons(models.Model):
    company_sponsoring = models.ForeignKey(Company,on_delete=models.CASCADE)
    visit_reason = models.CharField(max_length=50)

    def _str_(self):
        return self.company_sponsoring


class CheckIns(models.Model):
    visitor_id = models.IntegerField()
    user_id = models.CharField(max_length=30)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    visit_reason = models.ForeignKey(ListReasons, on_delete=models.CASCADE)

class UserCompany(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    company = models.ForeignKey(Company,on_delete=models.CASCADE)

class TimeSheet(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()

class VisitorReason(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    visit_reason = models.CharField(max_length=30)
    is_active = models.BooleanField(default=False)

class CheckInVisitorReason(models.Model):
    CheckIn_id = models.ForeignKey(CheckIns, on_delete=models.CASCADE)
    visitor_reason_id = models.ForeignKey(VisitorReason, on_delete=models.CASCADE)
