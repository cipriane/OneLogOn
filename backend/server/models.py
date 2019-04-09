from django.db import models
from django.utils import timezone
from django.utils.timezone import now
from django.contrib.auth.models import User
import uuid

class Company(models.Model):
    company_name = models.CharField(max_length=30)
    company_address = models.CharField(max_length=50, null=True)
    company_city = models.CharField(max_length=30, null=True)
    company_zip = models.CharField(max_length=15, null=True)
    company_state = models.CharField(max_length=2, null=True)
    company_message = models.TextField()

class Invite(models.Model):
    company = models.ForeignKey(Company,on_delete=models.CASCADE,verbose_name="company_id")
    invite_key = models.UUIDField(default=uuid.uuid4)
    role = models.IntegerField(default=-1)
    expires_on = models.DateTimeField()
    is_claimed = models.BooleanField(default=False)

class Visitors(models.Model):
    company = models.ForeignKey(Company,on_delete=models.CASCADE,verbose_name="company_id")
    visitor_id = models.CharField(max_length=10)
    first_name = models.CharField(max_length=30,null=True)
    last_name = models.CharField(max_length=30,null=True)
    is_employee = models.BooleanField(default=False)
    waiver_signed = models.BooleanField(default=False)
    date_hired = models.DateTimeField(null=True)
    class Meta:
        unique_together = ('company', 'visitor_id')

class CheckIns(models.Model):
    visitor = models.ForeignKey(Visitors,on_delete=models.CASCADE,verbose_name="visitor_id")
    check_in = models.DateTimeField()
    check_out = models.DateTimeField(null=True)

class UserCompany(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    company = models.ForeignKey(Company,on_delete=models.CASCADE)

class Timesheet(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()

class VisitReason(models.Model):
    company = models.ForeignKey(Company,on_delete=models.CASCADE,verbose_name="company_id")
    description = models.CharField(max_length=30)
    is_main_reason = models.BooleanField(default=False)
    has_sub_reasons = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

class CheckInVisitReason(models.Model):
    check_in = models.ForeignKey(CheckIns, on_delete=models.CASCADE,verbose_name="check_in_id")
    visit_reason = models.ForeignKey(VisitReason, on_delete=models.CASCADE,verbose_name="visit_reason_id")
