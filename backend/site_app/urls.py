from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index),
    path('api/create_account/', views.create_account, name="create_account"),
    path('api/sign_in/', views.sign_in),
    path('api/dashboard/', views.dashboard, name='dashboard'),
    path('api/budgetSheet/', views.budget_sheet, name='budget-sheet'),
    path('api/salaryFinder/', views.salary_finder),
    path('api/signOut/', views.sign_out),
    re_path('.*/', views.index),
]