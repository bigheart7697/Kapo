from rest_framework import permissions
from django.core.exceptions import PermissionDenied


class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff:
            raise PermissionDenied()
        return True
