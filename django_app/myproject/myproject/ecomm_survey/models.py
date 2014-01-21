from django.db import models

NUMBER_OF_FEATURES = 8


class Feature(models.Model):
    title = models.CharField(max_length=255)


class SurveyResponse(models.Model):
    DEVICE_CHOICES = (
        ('Computer', 'Computer'),
        ('Tablet', 'Tablet'),
        ('Phone', 'Phone'),
    )
    FEATURE_RANK_CHOICES = tuple((n, n) for n in range(1, NUMBER_OF_FEATURES + 1))

    ip_address = models.GenericIPAddressField(blank=True, null=True)
    completion_time = models.TimeField(blank=True, null=True)
    device_type = models.CharField(max_length=20, choices=DEVICE_CHOICES, blank=True)
    feature_1 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    feature_2 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    feature_3 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    feature_4 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    feature_5 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    feature_6 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    feature_7 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    feature_8 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now=True, auto_now_add=True)
