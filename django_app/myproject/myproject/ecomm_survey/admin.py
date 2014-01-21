from django.contrib import admin
from .models import Feature, SurveyResponse


class FeatureAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title')


class SurveyResponseAdmin(admin.ModelAdmin):
    list_display = ('pk', 'ip_address', 'device_type', 'completion_time', 'created')


admin.site.register(Feature, FeatureAdmin)
admin.site.register(SurveyResponse, SurveyResponseAdmin)
