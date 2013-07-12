from django.contrib.gis.db import models
from django.contrib.translation import ugettext as _
from django.contrib.auth.models import get_user_model


class Layer(models.Model):
    """
    Abstract model of Sharamaan Layer model.
    """
    name = models.CharField(_("name"), max_length=128)

    created_by = models.ForeignKey(get_user_model,
                                   verbose_name=_("created_by"))
    created_at = models.DateTimeField(_("created_at"),
                                      auto_now_add=True)

    updated_at = models.DateTimeField(_("updated_at"),
                                      auto_now=True)

    objects = models.GeoManager()

    def __unicode__(self):
        return self.name

    def save(self,request=None, *args, **kwargs):
        """
        Retreive the current user from request and save the layer
        with created_by = user
        """
        if request:
            self.created_by = request.user
        super(Layer, self).save(*args, **kwargs)

    class Meta:
        abstract = True
