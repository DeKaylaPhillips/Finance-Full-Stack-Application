from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
# Create your views here.

def index(request):
    homepage = open('./static/index.html').read()
    return HttpResponse(homepage)

@api_view(["POST"])
def createAccount(request):
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]
    email = request.data["email"]
    password = request.data["password"]
    print(first_name, last_name, email, password)
 
    try:
        new_user = User.objects.create_user(first_name=first_name, last_name=last_name, email=email, password=password, username=email)
        new_user.save()

        expense_data = [
            {'title': "Rent", 'amount': 0.0}, 
            {'title': "Utilities", 'amount': 0.0},
            {'title': "Transportation", 'amount': 0.0},
            {'title': "Food/Dining", 'amount': 0.0},
            {'title': "Childcare", 'amount': 0.0},
            {'title': "Uncategorized", 'amount': 0.0}
        ]
        
        for e in expense_data:
            UserExpense.objects.create(user=new_user, title=e['title'], amount=e['amount']).save()
              
        return JsonResponse({"AccountCreated": True, "data": request.data})
    except Exception as e:
        print(str(e))
        return JsonResponse({"Error": str(e)})

@api_view(["POST"])
def signIn(request):
    username = request.data["email"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)
    
    if user is not None and user.is_active:
        try:
            login(request._request, user)
            if user.is_authenticated:
                # print(user.id)
                return HttpResponseRedirect(reverse('dashboard'))
        except Exception as e:
            print(str(e))
            return JsonResponse({"Login": False, "Login Failed": f"Server-side error."})
    else:
        return JsonResponse({"Login": False, "Login Message": f"False - User not found. {request.data}"})

@api_view(["GET"])
def dashboard(request):
    first_name = request.user.first_name
    last_name = request.user.last_name

    data = {
        "First Name": first_name,
        "Last Name": last_name
    }
    return JsonResponse({"data": data})

@api_view(["GET", "POST", "PUT"])
def budget_sheet(request):
    # Get the user to display in the "Sign In As" section of the NavBar
    if request.method == "GET":
        first_name = request.user.first_name
        last_name = request.user.last_name
        UserBudget.objects.get_or_create(user=request.user)
        budget = list(UserBudget.objects.filter(user=request.user).values())

        data = {
        "First Name": first_name,
        "Last Name": last_name,
        "Budget": budget[0]
        }
        print(data)
        return JsonResponse({"data": data})
    # Update a user's budget amount from the default amount based on the input and save to the database
    if request.method == "PUT":
        budget_amount = request.data['budget_amount']
        user_budget = UserBudget.objects.get(user=request.user)
        user_budget.budget_amount = budget_amount
        user_budget.save()
        
        # Retrieves the remaining balance
        # user_budget.remaining_balance
        
        # Retrieves the spend amount - this total is based on the expense total
        # user_budget.spend_amount

        # Retrieves the current user's expenses
        # user_expenses = UserExpense.objects.get(user=request.user)
        # Use this query to access the amounts of the expenses - may need use a method to calculate all of the current expenses
        # user_expenses.amount
            
        return JsonResponse({"success": True})

    
    