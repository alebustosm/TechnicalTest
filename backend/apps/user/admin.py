from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin


class UserCustomAdmin(UserAdmin):
   
    def save_model( self, request, obj, form, change ):
        obj.save()


admin.site.register(User, UserCustomAdmin)
