from rest_framework import permissions
from django.core.exceptions import PermissionDenied


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user


class IsNotOwnerOfOrderedProduct(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.product.owner == request.user:
            raise PermissionDenied()
        return True


class IsCustomerOfOrderedProduct(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.customer != request.user:
            raise PermissionDenied()
        return True


class IsOwnerOfProduct(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.product.owner != request.user:
            raise PermissionDenied()
        return True


class IsOwnerOfTransaction(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.transaction_object.product.owner != request.user:
            raise PermissionDenied()
        return True
