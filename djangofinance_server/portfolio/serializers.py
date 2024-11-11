from rest_framework import serializers
from .models import StockHolding

class StockHoldingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockHolding
        fields = ['id', 'user', 'ticker_symbol', 'shares_bought', 'purchase_price', 'purchase_date']
        read_only_fields = ['user', 'purchase_date']