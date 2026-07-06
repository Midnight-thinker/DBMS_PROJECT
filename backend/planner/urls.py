from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripViewSet, DayViewSet, ActivityViewSet, UserProfileViewSet

router = DefaultRouter()
router.register(r'trips', TripViewSet, basename='trip')
router.register(r'days', DayViewSet, basename='day')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'profiles', UserProfileViewSet, basename='profile')

urlpatterns = [
    path('api/', include(router.urls)),
]
