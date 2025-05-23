from accounts.models import CustomUser
from django.shortcuts import render
from accounts.models import CustomUser

def show_details(request):
    doctors = CustomUser.objects.filter(user_type='doctor')
    patients = CustomUser.objects.filter(user_type='patient')
    return render(request, 'viewdetails/details.html', {'doctors': doctors, 'patients': patients})

