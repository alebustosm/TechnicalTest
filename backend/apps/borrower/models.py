import uuid
from django.db import models
from apps.core.models import Person



class Borrower(Person):
    document_number = models.CharField(max_length=30, unique=True,null=True)
    
    def __str__(self):
        return self.document_number