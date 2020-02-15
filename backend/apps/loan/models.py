from django.db import models
from django.core.validators import MinValueValidator
from apps.core.models import BaseModel

LOAN_STATUS_CHOICES = (
    ("approved", "Aprobado"),
    ("denied", "Denegado")
)

class LoanRequest(BaseModel):
    borrower = models.ForeignKey('borrower.Borrower',related_name='loanrequest_borrower',on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=LOAN_STATUS_CHOICES)
    amount = models.DecimalField(decimal_places=2, max_digits=15, validators=[MinValueValidator(0.1)])


    def __str__(self):
        return "%s-%s" % (self.borrower.document_number,self.status)

    class Meta:
        ordering = ['created_at']

