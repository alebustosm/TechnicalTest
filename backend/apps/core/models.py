from django.contrib.postgres.fields import JSONField
from django.db import models
from django.db.models.deletion import ProtectedError
from django.urls import reverse

from .utils import normalize_text


class ExcludeDeletedManager(models.Manager):
    def get_queryset(self):
        return super(ExcludeDeletedManager, self).get_queryset().filter(_deleted=False)


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    _deleted = models.BooleanField(default=False)

    objects = ExcludeDeletedManager()
    admin_manager = models.Manager()

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def delete(self, using=None):
        try:
            super(BaseModel, self).delete(using)
        except ProtectedError:
            self._deleted = True
            self.save()



class Person(BaseModel):
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    full_name = models.CharField(max_length=61, null=True,blank=True, editable=False)
    email = models.EmailField(blank=False, null=True)
    gender = models.CharField(max_length=1,
                           blank=True,
                           default='',
                           choices=(('F', 'Femenino'), ('M', 'Masculino')))
    

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        self.full_name = normalize_text("%s %s" % (self.first_name if self.first_name else "",
                                                   self.last_name if self.last_name else ""))
        if not getattr(self, 'email') and getattr(self, 'user'):
            self.email = self.user.email
        super(Person, self).save(*args, **kwargs)


