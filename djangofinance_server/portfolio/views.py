from rest_framework import generics, permissions
from .models import StockHolding
from .serializers import StockHoldingSerializer

class stock_holding_list_create_view(generics.ListCreateAPIView):
    serializer_class = StockHoldingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user)
        return StockHolding.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)