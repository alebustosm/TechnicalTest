from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from ..models import Borrower

class BorrowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Borrower
        fields = ("id","first_name","last_name","email","document_number","gender")