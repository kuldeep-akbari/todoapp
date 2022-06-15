from rest_framework import serializers
from TodoApp.models import Item
# from TodoApp.models import ItemExpiration

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields=('__all__')

# class ItemExpirationSelectSerializer(serializers.ModelSerializer):
#     item = ItemSerializer()
#     class Meta:
#         model=ItemExpiration
#         fields=('__all__')

# class ItemExpirationInsertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=ItemExpiration
#         fields=('id', 'item', 'expiration_date')

# class ItemExpirationUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=ItemExpiration
#         fields=('id', 'expiration_date')