from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from TodoApp.models import Item
# from TodoApp.models import ItemExpiration
from TodoApp.serializers import ItemSerializer
# from TodoApp.serializers import ItemExpirationSelectSerializer, ItemExpirationInsertSerializer, ItemExpirationUpdateSerializer
from TodoApp.responses import success, failure, failure_delete
# Create your views here.



@csrf_exempt
def itemApi(request):
    if request.method=='GET':
        item = Item.objects.all()
        item_serializer = ItemSerializer(item, many=True)
        return JsonResponse(item_serializer.data, safe=False)
    elif request.method=='POST':
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse(success, safe=False)
        return JsonResponse(failure, safe=False)
    elif request.method=='PUT':
        item_data = JSONParser().parse(request)
        item=Item.objects.get(id=item_data['id'])
        item_serializer = ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse(success, safe=False)
        return JsonResponse(failure, safe=False)
    elif request.method=='DELETE':
        item_data = JSONParser().parse(request)
        item = Item.objects.filter(id=item_data['id'])
        if (item.count() > 0):
            item.delete()
            return JsonResponse(success, safe=False)
        return JsonResponse(failure_delete, safe=False)

@csrf_exempt
def createdDateItemApi(request):
    if request.method=='GET':
        item = Item.objects.all().order_by('created_date')
        item_serializer = ItemSerializer(item, many=True)
        return JsonResponse(item_serializer.data, safe=False)

@csrf_exempt
def expirationDateItemApi(request):
    if request.method=='GET':
        item = Item.objects.all().order_by('expiration_date')
        item_serializer = ItemSerializer(item, many=True)
        return JsonResponse(item_serializer.data, safe=False)

# @csrf_exempt
# def itemExpirationApi(request):
#     if request.method=='GET':
#         item_expiration = ItemExpiration.objects.select_related('item')
#         item_expiration_serializer = ItemExpirationSelectSerializer(item_expiration, many=True)
#         return JsonResponse(item_expiration_serializer.data, safe=False)
#     elif request.method=='POST':
#         item_expiration_data = JSONParser().parse(request)
#         item_expiration_serializer = ItemExpirationInsertSerializer(data=item_expiration_data)
#         if item_expiration_serializer.is_valid():
#             item_expiration_serializer.save()
#             return JsonResponse(success, safe=False)
#         return JsonResponse(failure, safe=False)
#     elif request.method=='PUT':
#         item_expiration_data = JSONParser().parse(request)
#         item_expiration=ItemExpiration.objects.get(id=item_expiration_data['id'])
#         item_expiration_serializer = ItemExpirationUpdateSerializer(item_expiration, data=item_expiration_data)
#         if item_expiration_serializer.is_valid():
#             item_expiration_serializer.save()
#             return JsonResponse(success, safe=False)
#         return JsonResponse(failure, safe=False)
