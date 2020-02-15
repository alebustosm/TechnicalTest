import uuid
from django.db import models
from apps.core.models import Person



class Borrower(Person):
    pass
    
    def __str__(self):
        return self.first_name