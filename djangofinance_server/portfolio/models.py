from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class StockHolding(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticker_symbol = models.CharField(max_length=10)
    shares_bought = models.DecimalField(max_digits=20, decimal_places=2)
    purchase_price = models.DecimalField(max_digits=20, decimal_places=2)
    purchase_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} purchased {self.ticker_symbol} at {self.purchase_price} for {self.shares_bought} qty on {self.purchase_date}"