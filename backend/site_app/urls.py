from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index),
    path('api/createAccount/', views.createAccount),
    path('api/signIn/', views.signIn),
    path('api/dashboard/', views.dashboard, name='dashboard'),
    path('api/budgetSheet/', views.budget_sheet, name='budget-sheet'),
    path('api/salaryFinder/', views.salary_finder),
    path('api/salaryCalculator/', views.salary_calculator),
    re_path('.*/', views.index),
]