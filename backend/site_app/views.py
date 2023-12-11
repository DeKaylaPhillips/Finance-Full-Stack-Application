from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from dotenv import load_dotenv
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import UserSerializer
from functools import reduce
import requests
import pprint as pp

import os

load_dotenv()


@api_view(["POST"])
def create_account(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        create_default_user_expenses(user)
        return Response({"register": True, "user_id": user.id})
    else:
        return Response({"register": False, "error": serializer.errors})


@api_view(["POST"])
def sign_in(request):
    username = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if not user:
        return Response(
            {"login": False, "error": "Invalid login credentials. Please try again."},
        )
    elif user and user.is_active:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        user_data = {
            "user_id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
        return Response({"login": True, "user": user_data, "token": token.key})


@api_view(["GET"])
def sign_out(request):
    logout(request._requests)
    return JsonResponse({"logout": True, "data": "Logout successful."})

# START HERE ---------------------------
@api_view(["GET"])
def dashboard(request):
    # Grab the current user's information
    if request.method == "GET":
        first_name = request.user.first_name
        last_name = request.user.last_name

        api_key = os.environ["API_KEY2"]
        api_endpoint = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=finance&sort=LATEST&limit=20&apikey={api_key}"

        response = requests.get(api_endpoint)
        articles = response.json()

        pp.pprint(articles)

        data = {"first_name": first_name, "last_name": last_name, "articles": articles}
    return JsonResponse({"data": data})


@api_view(["GET", "POST", "PUT", "DELETE"])
def budget_sheet(request):
    if request.method == "GET":
        first_name = request.user.first_name
        last_name = request.user.last_name

        UserBudget.objects.get_or_create(user=request.user)
        budget = list(UserBudget.objects.filter(user=request.user).values())

        # Expense Calculation
        expenses = list(UserExpense.objects.all().values())
        expense_total = reduce(
            lambda acc, curr_val: acc + curr_val["amount"], expenses, 0
        )

        # Spend Total Calculation
        budget_obj = UserBudget.objects.get(user=request.user)
        budget_obj.spend_amount = expense_total
        budget_obj.save()

        # Remaining Balance Calculation
        budget_obj.remaining_balance = float(
            budget_obj.budget_amount - budget_obj.spend_amount
        )
        budget_obj.save()

        data = {
            "First Name": first_name,
            "Last Name": last_name,
            "Budget": budget[0],
            "Budget Amount": budget_obj.budget_amount,
            "Expenses": expenses,
            "Spend Amount": budget_obj.spend_amount,
            "Remaining Balance": budget_obj.remaining_balance,
        }

        return JsonResponse(
            {"Success": f"{True} - User Budget Information Accessible", "data": data}
        )

    # Update a user's budget amount from the default amount based on the input and save to the database
    if request.method == "PUT":
        budget_amount = request.data.get("budget_amount", None)
        expense_amount = request.data.get("amount", None)

        if budget_amount:
            user_budget = UserBudget.objects.get(user=request.user)
            user_budget.budget_amount = request.data["budget_amount"]
            user_budget.save()

            data = {"BUDGET AMOUNT UPDATED": user_budget.budget_amount}

            return JsonResponse({"Success": True, "Budget": data})

        elif expense_amount:
            expense_id = request.data["id"]
            UserExpense.objects.filter(user=request.user, id=expense_id).update(
                amount=request.data["amount"]
            )
            expenses = UserExpense.objects.filter(user=request.user).order_by("id")

            data = {"EXPENSE AMOUNT UPDATED (ID#)": expense_id}

            return JsonResponse({"Success": True, "data": data})

    # Delete an expense item from the user's list of expenses.
    if request.method == "DELETE":
        expense_to_delete = request.data["id"]
        UserExpense.objects.filter(user=request.user, id=expense_to_delete).delete()

        data = {"EXPENSE REMOVED": expense_to_delete}

        return JsonResponse({"Success": True, "data": data})

    # Add an expense item to the user's list of expenses.
    if request.method == "POST":
        add_expense_title = request.data["title"]
        add_expense_amount = request.data["amount"]
        UserExpense.objects.create(
            user=request.user, title=add_expense_title, amount=add_expense_amount
        )

        data = {"Category": add_expense_title, "Cost": add_expense_amount}

        return JsonResponse({"Success": True, "data": data})


@api_view(["GET", "POST"])
def salary_finder(request):
    # Retrieves the user's information, the API response, and caches the response to not have to continuously make API calls due to call limitation
    if request.method == "GET":
        first_name = request.user.first_name
        last_name = request.user.last_name

        data = {
            "First Name": first_name,
            "Last Name": last_name,
        }

        return JsonResponse({"Success": True, "data": data})

    # Accepts Job and Location input on salary finder page

    if request.method == "POST":
        job_query = request.data["Job Query"]
        location_query = request.data["Location Query"]

        if not job_query or not location_query:
            # Add "required" attribute to input on frontend
            return JsonResponse({"Success": False, "Error": "Missing required fields."})

        api_key = os.environ["API_KEY1"]
        api_endpoint = "https://job-salary-data.p.rapidapi.com/job-salary"
        querystring = {
            "job_title": job_query,
            "location": location_query,
        }

        headers = {
            "X-RapidAPI-Key": api_key,
            "X-RapidAPI-Host": "job-salary-data.p.rapidapi.com",
        }

        response = requests.request(
            "GET", api_endpoint, headers=headers, params=querystring
        )
        salary_data = response.json()["data"]

        job_data = []
        for i, data in enumerate(salary_data):
            # Format specifier to ensure salaries are casted with only 2 decimal points.
            min_salary = "{:.2f}".format(data["min_salary"])
            max_salary = "{:.2f}".format(data["max_salary"])
            med_salary = "{:.2f}".format(data["median_salary"])

            job_data.append(
                {
                    "id": i + 1,
                    "job_title": data["job_title"],
                    "location": data["location"],
                    "min_salary": f"${min_salary}",
                    "median_salary": f"${med_salary}",
                    "max_salary": f"${max_salary}",
                    "publisher": data["publisher_name"],
                    "link_to_source": data["publisher_link"],
                }
            )

        data = {
            "Job Query": job_query,
            "Location Query": location_query,
            "Salary Info": job_data,
        }
        print(data)
        return JsonResponse({"Success": True, "data": data})


@api_view(["GET"])
def salary_calculator(request):
    if request.method == "GET":
        first_name = request.user.first_name
        print(first_name)
        last_name = request.user.last_name

        data = {
            "First Name": first_name,
            "Last Name": last_name,
        }

        return JsonResponse({"Success": True, "data": data})


def create_default_user_expenses(user):
    expenses = [
        "Rent",
        "Utilities",
        "Transportation",
        "Food/Dining",
        "Childcare",
        "Uncategorized",
    ]
    for title in expenses:
        UserExpense.objects.create(user=user, title=title, amount=0.0)


def index(request):
    homepage = open("./static/index.html").read()
    return HttpResponse(homepage)
