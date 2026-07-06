from rest_framework import viewsets
from .models import Trip, Day, Activity, UserProfile
from .serializers import TripSerializer, DaySerializer, ActivitySerializer, UserProfileSerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_at')
    serializer_class = TripSerializer

class DayViewSet(viewsets.ModelViewSet):
    serializer_class = DaySerializer

    def get_queryset(self):
        queryset = Day.objects.all().order_by('date')
        trip_id = self.request.query_params.get('trip')
        if trip_id is not None:
            queryset = queryset.filter(trip_id=trip_id)
        return queryset

class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = Activity.objects.all().order_by('time')
        day_id = self.request.query_params.get('day')
        if day_id is not None:
            queryset = queryset.filter(day_id=day_id)
        return queryset

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
