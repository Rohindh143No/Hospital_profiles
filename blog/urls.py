from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('doctor/', views.doctor_blog_view, name='doctor_view'),
    path('patient/', views.patient_blog_view, name='patient_view'),
    
]
