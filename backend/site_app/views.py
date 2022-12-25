from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
from functools import reduce
import os
import requests
from dotenv import load_dotenv
load_dotenv()
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
    # Grab the current user's information
    first_name = request.user.first_name
    last_name = request.user.last_name

    data = {
        "First Name": first_name,
        "Last Name": last_name
    }

    return JsonResponse({"data": data})

@api_view(["GET", "POST", "PUT", "DELETE"])
def budget_sheet(request):

    # Get the user to display in the "Sign In As" section of the NavBar
    if request.method == "GET":
        # Grab the user's information
        first_name = request.user.first_name
        last_name = request.user.last_name

        # If the user is new, create a new personal budget sheet for them - otherwise, get the current logged in user's budget sheet.
        UserBudget.objects.get_or_create(user=request.user)

        # Access the values in the budget sheet w/o serialization by creating lists.
        budget = list(UserBudget.objects.filter(user=request.user).values())

        # Expense Calculation
        expenses = list(UserExpense.objects.all().values())   
        expense_total = reduce(lambda acc, curr_val: acc + curr_val['amount'], expenses, 0)
        
        # Spend Total Calculation
        budget_obj = UserBudget.objects.get(user=request.user)
        budget_obj.spend_amount = expense_total
        budget_obj.save()
        
        # Remaining Balance Calculation
        budget_obj.remaining_balance = float(budget_obj.budget_amount - budget_obj.spend_amount)
        budget_obj.save()

        data = {
            "First Name": first_name,
            "Last Name": last_name,
            "Budget": budget[0],
            "Budget Amount": budget_obj.budget_amount,
            "Expenses": expenses,
            "Spend Amount": budget_obj.spend_amount,
            "Remaining Balance": budget_obj.remaining_balance
        }

        return JsonResponse({"Success": f"{True} - User Budget Information Accessible", "data": data})
    
    # Update a user's budget amount from the default amount based on the input and save to the database
    if request.method == "PUT":
        budget_amount = request.data.get('budget_amount', None)
        expense_amount = request.data.get('amount', None)

        if budget_amount:
            user_budget = UserBudget.objects.get(user=request.user)
            user_budget.budget_amount = request.data['budget_amount']
            user_budget.save()

            data = {
                "BUDGET AMOUNT UPDATED": user_budget.budget_amount
            }

            return JsonResponse({"Success": True, "Budget": data})

        elif expense_amount:
            expense_id = request.data['id']
            UserExpense.objects.filter(user=request.user, id=expense_id).update(amount=request.data['amount'])
            expenses = UserExpense.objects.filter(user=request.user).order_by('id')
            
            data = {
                "EXPENSE AMOUNT UPDATED (ID#)": expense_id
            }

            return JsonResponse({"Success": True, "data": data})

    # Delete an expense item from the user's list of expenses.
    if request.method == "DELETE":
        expense_to_delete = request.data['id']
        UserExpense.objects.filter(user=request.user, id=expense_to_delete).delete()

        data = {
            "EXPENSE REMOVED": expense_to_delete
        }

        return JsonResponse({"Success": True, "data": data})

    # Add an expense item to the user's list of expenses.   
    if request.method == "POST":
        add_expense_title = request.data['title']
        add_expense_amount = request.data['amount']
        UserExpense.objects.create(user=request.user, title=add_expense_title, amount=add_expense_amount)

        data = {
            "Category": add_expense_title, 
            "Cost": add_expense_amount
        }

        return JsonResponse({"Success": True, "data": data})

@api_view(["GET", "POST"])       
def salary_finder(request):
    if request.method == "POST":
        pass
    elif request.method == "GET":
        pass
    
    
    
    first_name = request.user.first_name
    last_name = request.user.last_name  
    print(request.data)

    data = {
        "First Name": first_name,
        "Last Name": last_name
    }

    # api_key = os.environ['API_KEY']
    # api_endpoint = "https://job-salary-data.p.rapidapi.com/job-salary"
    # # querystring = {"job_title":"nodejs developer","location":"new york, usa","radius":"200"}
    
    # headers = {
    #     "X-RapidAPI-Key": api_key,
    #     "X-RapidAPI-Host": "job-salary-data.p.rapidapi.com"
    # }

    # response = requests.request("GET", api_endpoint, headers=headers, params=querystring)

    # print(response.text)

    return JsonResponse({"Success": True, "data": data})

    
    