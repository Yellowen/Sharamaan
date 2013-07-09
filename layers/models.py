from django.contrib.gis.db import models
from django.contrib.translation import ugettext as _


class Layer(models.Model):
    """
    Abstract model of Sharamaan Layer model.
    """
    name = models.CharField(_("name"), max_length=128)

    objects = models.GeoManager()

    def __unicode__(self):
        return self.name

    class Meta:
        abstract = True
