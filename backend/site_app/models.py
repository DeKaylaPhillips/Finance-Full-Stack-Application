from django.db import models
from django.contrib.auth.models import (AbstractUser)
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class UserBudget(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    budget_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00, null=False)
    spend_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00, null=False)
    remaining_balance = models.DecimalField(max_digits=8, decimal_places=2, default=0.00, null=False)

class UserExpenses(models.Model):
    budget_id = models.OneToOneField(UserBudget, on_delete=models.CASCADE) 
    title = models.CharField(max_length=32, null=False)
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00, null=False)

class Budget_Expense_Items(models.Model): 
    pass