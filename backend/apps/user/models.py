from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from apps.core.models import BaseModel



class User(AbstractUser):
    username = models.CharField(
        _('username'),
        null=True,
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        error_messages={
            'unique': _("A user with that username already exists."),
        })
    email = models.EmailField(_('email address'), null=False,unique=True)

    


    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'
        ordering = ['-id']
        
    def save(self, *args, **kwargs):
        self.username = self.email
        return super(User, self).save(*args, **kwargs)



