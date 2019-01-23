from django.urls import re_path, path
from . import views

urlpatterns = [
    path('api/student', views.StudentListCreate.as_view()),
    re_path(r'', views.index, name='index'),
]
