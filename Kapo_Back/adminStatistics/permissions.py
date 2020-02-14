from rest_framework import permissions
from django.core.exceptions import PermissionDenied


class IsStaff(permissions.BasePermission):
    @staticmethod
    def is_staff(request, view, obj):
        if not request.user.is_staff:
            raise PermissionDenied()
        return True
