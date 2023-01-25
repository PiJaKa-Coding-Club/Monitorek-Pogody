from django.contrib import admin
from .models import Pogoda, Lokalizacja, ObiektGeograficzny

# Register your models here.
admin.site.register(Pogoda)
admin.site.register(Lokalizacja)
admin.site.register(ObiektGeograficzny)
