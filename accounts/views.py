from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import CustomUserCreationForm, CustomAuthenticationForm

def auth_view(request):
    signup_form = CustomUserCreationForm()
    login_form = CustomAuthenticationForm()

    if request.method == 'POST':
        if 'signup' in request.POST:
            signup_form = CustomUserCreationForm(request.POST, request.FILES)
            if signup_form.is_valid():
                user = signup_form.save(commit=False)
                user.set_password(signup_form.cleaned_data['password1'])
                user.save()
                print("Signup successful for:", user.username)
                return redirect('auth')
            else:
                print("Signup errors:", signup_form.errors)

        elif 'login' in request.POST:
            login_form = CustomAuthenticationForm(request, data=request.POST)
            if login_form.is_valid():
                user = authenticate(
                    request,
                    username=login_form.cleaned_data['username'],
                    password=login_form.cleaned_data['password']
                )
                if user is not None:
                    login(request, user)
                    print("Login successful for:", user.username, "user_type:", user.user_type)
                    if user.user_type == 'doctor':
                        return redirect('doctor_dashboard')
                    else:
                        return redirect('patient_dashboard')
                else:
                    print("Authentication failed: invalid credentials")
            else:
                print("Login form errors:", login_form.errors)

    return render(request, 'accounts/auth.html', {
        'signup_form': signup_form,
        'login_form': login_form
    })


def doctor_dashboard(request):
    return render(request, 'accounts/doctor.html')

def patient_dashboard(request):
    return render(request, 'accounts/patient.html')
