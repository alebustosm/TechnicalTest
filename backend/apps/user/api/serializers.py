from rest_framework import serializers
from django.db import transaction

from ..models import User


class UserModelSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,min_length=8)

    def create(self, validated_data,*args,**kwargs):
        with transaction.atomic():
            request = self.context.get('request',None)
            user = super(UserModelSerializer, self).create(validated_data)
            user.set_password(validated_data['password'])
            user.save()
            return user
           
    class Meta:
        model = User
        fields = ('username','email', "first_name", "last_name","password")
