from django.db import models
from django.utils import timezone

class Student(models.Model):
    name = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Visitors(models.Model):
    user_id = models.ForeignKey(SignIns, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, 
        null=True)
    last_name = models.CharField(max_length=30,
        null=True)
    isEmployee = models.BooleanField(default=False)
    waiver = models.BooleanField(default=False)
