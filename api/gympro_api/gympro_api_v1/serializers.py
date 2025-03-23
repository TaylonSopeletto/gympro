from django.contrib.auth.models import Group, User
from rest_framework import serializers

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True, read_only=False)
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


