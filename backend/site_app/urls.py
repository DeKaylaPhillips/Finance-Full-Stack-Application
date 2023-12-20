from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index),
    path('api/create_account/', views.create_account, name="create_account"),
    path('api/sign_in/', views.sign_in),
    path('api/articles/', views.articles, name='articles'),
    path('api/budgetSheet/', views.budget_sheet, name='budget-sheet'),
    path('api/salaryFinder/', views.salary_finder),
    path('api/signOut/', views.sign_out),
    re_path('.*/', views.index),
]