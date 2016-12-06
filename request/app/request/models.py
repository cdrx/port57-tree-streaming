from django.db import models
import uuid

class Colour(models.Model):
    txt = models.CharField(max_length=255)
    seen = models.BooleanField(default=False)
