from django.urls import path
from .views import show_details

urlpatterns = [
    path('', show_details, name='show_details'),
]
