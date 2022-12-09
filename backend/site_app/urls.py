from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index),
    path('api/createAccount/', views.createAccount),
    path('api/login/', views.login),
    re_path('.*/', views.index),
]