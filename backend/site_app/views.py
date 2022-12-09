from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
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
        print(e)
        return JsonResponse({"Error": str(e)})

@api_view(["POST"])
def login(request):
    email = request.data["email"]
    password = request.data["password"]
    print(email, password)

    user = authenticate(username=email, password=password)
    if user != None and user.is_active:
        try:
            login(request._request, user)
            return JsonResponse({"Login": True})
        except Exception as e:
            print(e)
            return JsonResponse({"Login": False})
    else:
        return JsonResponse({"Login": False + "-" + "User not found."})
