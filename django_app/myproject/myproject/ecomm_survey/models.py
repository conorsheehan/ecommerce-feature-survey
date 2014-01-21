from django.db import models

NUMBER_OF_FEATURES = 8


class Feature(models.Model):
    title = models.CharField(max_length=255)


class SurveyResponse(models.Model):
    """
    Sample POST:
    {"ip_address": "127.0.0.1", "completion_time": "00:03:01", "device_type": "Computer", "feature_1": 1,"feature_2": 1,"feature_3": 1,"feature_4": 1,"feature_5": 1,"feature_6": 1,"feature_7": 1,"feature_8": 1}
    """

    DEVICE_CHOICES = (
        ('Computer', 'Computer'),
        ('Tablet', 'Tablet'),
        ('Phone', 'Phone'),
    )
    FEATURE_RANK_CHOICES = tuple((n, n) for n in range(1, NUMBER_OF_FEATURES + 1))

    ip_address = models.GenericIPAddressField(blank=True, null=True)
    completion_time = models.TimeField(blank=True, null=True)
    device_type = models.CharField(max_length=20, choices=DEVICE_CHOICES, blank=True)
    feature_1 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Free Shipping")
    feature_2 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Reliable User Comments")
    feature_3 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Free Returns")
    feature_4 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Guest Checkout")
    feature_5 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Coupon Codes")
    feature_6 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Customer Support")
    feature_7 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Social Discounts / Referral Programs")
    feature_8 = models.SmallIntegerField(choices=FEATURE_RANK_CHOICES, help_text="Retail Locations")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now=True, auto_now_add=True)
