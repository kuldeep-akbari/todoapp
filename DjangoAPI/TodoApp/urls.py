from django.urls import re_path as url
from TodoApp import views

urlpatterns=[
    url(r'^item/$', views.itemApi),
    url(r'^item/created_date/$', views.createdDateItemApi),
    url(r'^item/expiration_date/$', views.expirationDateItemApi),
    # url(r'^itemexpiration$/', views.itemExpirationApi)
]