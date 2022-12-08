from django.db import models
from django.contrib.auth.models import (AbstractUser)
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class UserExpense(models.Model):
    title = models.CharField(max_length=32)
    amount = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.0)

class UserBudget(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    expenses = models.ForeignKey(UserExpense, on_delete=models.CASCADE, null=False)
    budget_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    spend_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    remaining_balance = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)