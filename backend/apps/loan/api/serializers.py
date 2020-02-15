from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from ..models import LoanRequest
from apps.borrower.api.serializers import BorrowerSerializer

class LoanRequestSerializer(serializers.ModelSerializer):
    borrower_data = BorrowerSerializer(source="borrower",read_only=true)

    class Meta:
        model = LoanRequest
        fields = ("id","borrower","borrower_data","amount","status",)