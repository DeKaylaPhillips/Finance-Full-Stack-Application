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
        User.objects.create_user(first_name=first_name, last_name=last_name, email=email, password=password, username=email)
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

    print(data)
    return JsonResponse({"data": data})

@api_view(["GET", "POST", "PUT"])
def budget_sheet(request):
    if request.method == "GET":
        first_name = request.user.first_name
        last_name = request.user.last_name
        data = {
        "First Name": first_name,
        "Last Name": last_name
        }
        print(data)
        return JsonResponse({"data": data})
    elif request.method == "POST":
        pass
    elif request.method == "PUT":
        pass
