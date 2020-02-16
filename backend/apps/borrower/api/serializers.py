from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from ..models import Borrower

class BorrowerSerializer(serializers.ModelSerializer):
    gender = serializers.SerializerMethodField()

    def get_gender(self,obj):
        try:
            return obj.get_gender_display()
        except Exception as e:
            return None

    class Meta:
        model = Borrower
        fields = ("id","full_name","email","document_number","gender")