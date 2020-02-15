from ..models import LoanRequest
from apps.borrower.models import Borrower
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from .serializers import LoanRequestSerializer, CreateLoanRequestSerializer
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from apps.core.moni import MoniAPI, MoniConsumerAPIException

from rest_framework.exceptions import APIException

class ScoringErrorApi(APIException):
    status_code = 460
    default_detail = 'Scoring not approved'
    default_code = 'Scoring Error'





class LoanRequestViewSet(ModelViewSet):
    queryset = LoanRequest.objects.all()

    def create(self, request, *args, **kwargs):
        try:
            email = request.data.get('email',None)
            first_name = request.data.get('first_name',None)
            last_name = request.data.get('last_name',None)
            document_number = request.data.get('document_number',None)
            gender = request.data.get('gender',None)

            borrower, created = Borrower.objects.get_or_create(first_name=first_name,last_name=last_name,document_number=document_number,email=email,gender=gender)
            request.data['borrower'] = borrower.id

            moni = MoniAPI()
            scoring = moni.get_scoring(borrower)

            if scoring['approved']:
                request.data['status'] = 'approved'
                return super().create(request, *args, **kwargs)
            else:
                request.data['status'] = 'denied'
                loan = super().create(request, *args, **kwargs)
                raise ScoringErrorApi
        except (MoniConsumerAPIException) as e:
            return Response({'error': 'creation loan error'}, status=400)
        
        
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateLoanRequestSerializer
        return LoanRequestSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return [TokenHasReadWriteScope()]

    
    class Meta:
        ordering = ['-id']