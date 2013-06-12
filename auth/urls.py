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
from django.conf.urls import patterns, url


urlpatterns = patterns('',

    # Password reset -------------------------
    url(r'^password_reset/$',
        'django.contrib.auth.views.password_reset',
        name='password_reset'),

    url(r'^password_reset/done/$',
        'django.contrib.auth.views.password_reset_done',
        name='password_reset_done'),

    url(r'^reset/(?P<uidb36>[0-9A-Za-z]{1,13})-(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        'django.contrib.auth.views.password_reset_confirm',
        name='password_reset_confirm'),
    url(r'^reset/done/$',
        'django.contrib.auth.views.password_reset_complete',
        name='password_reset_complete'),
    # ----------------------------------------

    url(r'^login/$', "django.contrib.auth.views.login", name="login"),
    url(r'^logout/$', "django.contrib.auth.views.logout", name="logout"),
)
