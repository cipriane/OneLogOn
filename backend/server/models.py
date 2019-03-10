from django.db import models
from django.utils import timezone
from django.utils.timezone import now
from django.contrib.auth.models import User

class Company(models.Model):
    company_name = models.CharField(max_length=30)
    company_address = models.CharField(max_length=50, null=True)
    company_city = models.CharField(max_length=30, null=True)
    company_zip = models.CharField(max_length=15, null=True)
    company_state = models.CharField(max_length=2, null=True)
    company_message = models.TextField()

class Visitors(models.Model):
    company = models.ForeignKey(Company,on_delete=models.CASCADE,verbose_name="company_id")
    visitor_id = models.CharField(max_length=10)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30,null=True)
    is_employee = models.BooleanField(default=False)
    waiver_signed = models.BooleanField(default=False)
    class Meta:
        unique_together = ('company', 'visitor_id')

class CheckIns(models.Model):
    visitor = models.ForeignKey(Visitors,on_delete=models.CASCADE,verbose_name="visitor_id")
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()

class UserCompany(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    company = models.ForeignKey(Company,on_delete=models.CASCADE)

class Timesheet(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()

class VisitReason(models.Model):
    company= models.ForeignKey(Company, on_delete=models.CASCADE)
    description = models.CharField(max_length=30)
    is_active = models.BooleanField(default=False)

class CheckInVisitReason(models.Model):
    CheckIn_id = models.ForeignKey(CheckIns, on_delete=models.CASCADE)
    visitor_reason_id = models.ForeignKey(VisitReason, on_delete=models.CASCADE)
