from django.urls import path
from . import views

urlpatterns = [
    path('', views.auth_view, name='auth'),
    path('doctor/', views.doctor_dashboard, name='doctor_dashboard'),
    path('patient/', views.patient_dashboard, name='patient_dashboard'),
]
