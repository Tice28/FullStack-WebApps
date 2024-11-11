from django.urls import path
from . import views

urlpatterns = [
    path('api/stock-holdings', views.stock_holding_list_create_view.as_view(), name="stock holding list")
]