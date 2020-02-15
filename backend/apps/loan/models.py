from django.db import models
from django.core.validators import MinValueValidator
from apps.core.models import BaseModel

LP_TYPE_CHOICES = (
    ("approved", "Aprobado"),
    ("denied", "Denegado")
)

class LoanRequest(BaseModel):
    borrower = models.ForeignKey('borrower.Borrower',related_name='loanrequest_borrower',on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=LP_TYPE_CHOICES)
    amount = models.DecimalField(decimal_places=2, max_digits=15, validators=[MinValueValidator(0.1)])




    def __str__(self):
        return "%s" % (borrower.full_name)

    class Meta:
        ordering = ['created_at']

