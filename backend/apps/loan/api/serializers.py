from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from ..models import LoanRequest
from apps.borrower.api.serializers import BorrowerSerializer

class LoanRequestSerializer(serializers.ModelSerializer):
    borrower_data = BorrowerSerializer(source="borrower",read_only=True)

    class Meta:
        model = LoanRequest
        fields = ("id","borrower","borrower_data","amount","status",)

class CreateLoanRequestSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    document_number = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    gender = serializers.CharField(read_only=True)
    borrower_data = BorrowerSerializer(source="borrower",read_only=True)


    class Meta:
        model = LoanRequest
        fields = ("id","borrower","borrower_data","amount","first_name","last_name","document_number","email","status","gender")


