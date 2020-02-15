from django.db import models
from apps.core.models import BaseModel

LP_TYPE_CHOICES = (
    ("approved", "Aprobado"),
    ("denied", "Denegado")
)

class LoanRequest(BaseModel):
    borrower = models.ForeignKey('borrower.Borrower',related_name='loanrequest_borrower',on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=LP_TYPE_CHOICES,null=True,blank=True)



    def __str__(self):
        return "%s" % (borrower.full_name)

    class Meta:
        ordering = ['created_at']

