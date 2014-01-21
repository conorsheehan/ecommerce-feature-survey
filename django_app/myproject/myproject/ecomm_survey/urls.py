from django.conf.urls import url, patterns, include
from .models import SurveyResponse, Feature
from rest_framework import viewsets, routers


# ViewSets define the view behavior.
class SurveyResponseViewSet(viewsets.ModelViewSet):
    model = SurveyResponse


class FeatureViewSet(viewsets.ModelViewSet):
    model = Feature


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'survey-responses', SurveyResponseViewSet)
router.register(r'features', FeatureViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)
