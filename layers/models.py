# -----------------------------------------------------------------------------
#    Sharamaan Web client - Web client of Sharamaan GIS suite
#    Copyright (C) 2012-2013 Yellowen Development Team <checkout AUTHORS>
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License along
#    with this program; if not, write to the Free Software Foundation, Inc.,
#    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
# -----------------------------------------------------------------------------
from django.contrib.gis.db import models
from django.utils.translation import ugettext as _
from django.contrib.auth import get_user_model


class Layer(models.Model):
    """
    Abstract model of Sharamaan Layer model.
    """
    name = models.CharField(_("name"), max_length=128)

    created_by = models.ForeignKey(get_user_model(),
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
