from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

from .forms import CreateUserForm, TestForm

@ensure_csrf_cookie
@require_http_methods(['GET'])
def set_csrf_token(request):
    return JsonResponse({'message': 'Token Set'})

@require_http_methods(['POST'])
def login_view(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        email = data['email']
        password = data['password']
    except json.JSONDecodeError:
        return JsonResponse({'success' : False, 'message' : 'Invalid JSON'}, status = 400 )
        
    user = authenticate(email=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({'success' : True, 'message': 'login successful'}, status = 200)
    else:
        return JsonResponse({'success' : False , 'error' : 'Login failed, please check your credentials and try again'} , status = 401)

def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'logged out'})

@require_http_methods(['GET'])
def user_view(request):
    if request.user.is_authenticated :
        return JsonResponse({'success': True, 'message' : 'logged in'}, status = 200)
    else:
        return JsonResponse({'success': False, 'message' : 'not logged in'}, status = 401)

@require_http_methods(['POST'])
def register_view(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        email = data['email']
        password = data['password']

        user = User.objects.create_user(username = email, password = password)
        user.save()

        return JsonResponse({'success': True, 'message' : 'Account created successfully, please log in.'}, status = 200)
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message' : 'Failed to create account please try again'} , status = 400)