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
from django.shortcuts import render_to_response as rr
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.utils.translation import ugettext as _

from auth.forms import LoginForm


def login_view(request):

    if request.method == "POST":
        form = LoginForm(request.POST)
        next_ = request.POST.get("next", "/")

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            user = authenticate(username=username, password=password)

            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect(next_)
                else:
                    return rr("registration/login.html",
                              {"msg": _("Your account is not active.")},
                              context_instance=RequestContext(request))
            else:
                return rr("registration/login.html",
                          {"msg": _("username or password is incorrect.")},
                          context_instance=RequestContext(request))

    else:
        next_ = request.GET.get("next", "/")
        if request.user.is_authenticated():
            return HttpResponseRedirect(next_)

        return rr("registration/login.html", {"next": next_},
                  context_instance=RequestContext(request))


def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")
