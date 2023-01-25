from django.urls import path

from . import views

urlpatterns = [
    path('current/<str:place>', views.get_current_place, name='current_place'),
    path('cities/<str:q>', views.get_cities, name='cities'),
    path('history/<str:place>/<str:dateISO>', views.get_history_data, name='history_data'),
]
