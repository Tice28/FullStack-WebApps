from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user_api.urls')),
    path('', include('portfolio.urls'))
]