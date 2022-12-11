from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index),
    path('api/createAccount/', views.createAccount),
    path('api/signIn/', views.signIn),
    path('api/dashboard/', views.dashboard, name='dashboard'),
    re_path('.*/', views.index),
]