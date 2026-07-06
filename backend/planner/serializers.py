from rest_framework import serializers
from .models import Trip, Day, Activity, UserProfile

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class DaySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    class Meta:
        model = Day
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    days = DaySerializer(many=True, read_only=True)
    class Meta:
        model = Trip
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
