from ..models import User
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics, permissions, serializers
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from .serializers import UserModelSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated



class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    
    def get_permissions(self):
        if self.action in ['create']:
            return [AllowAny()]
        return [TokenHasReadWriteScope(), TokenHasScope()]
