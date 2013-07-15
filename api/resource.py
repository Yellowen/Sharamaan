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
import json

#from django.db import transaction
from django.http import HttpResponse

class JsonResource(object):
    """
    Very simple REST like api class.
    """
    name = ""
    model = None
    query_types = {}

    def get_objects(self, request):
        if request.method == "GET":
            query = {}
            if self.query_types:
                [query.update({k, v}) for k, v in request.GET.items() \
                 if k in self.query_types]

            if query:
                return self.model.objects.filter(**query)

        return self.model.objects.all()

    @property
    def urls(self):
        from django.conf.urls import patterns, url

        urlpatterns = patterns('',
            url("^$", self.object_list, name="%s-path" % self.name),
        )

        return urlpatterns

    def object_list(self, request):
        objects = self.get_objects(request)
        return HttpResponse(json.dumps([i.to_json() for i in objects]),
                            mimetype="text/json")

    class NotImplemented(Exception):
        pass
