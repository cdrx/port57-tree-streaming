from django.conf.urls import patterns, include, url
from jsonview.decorators import json_view

from django.contrib import admin
admin.autodiscover()

from request.models import Colour

from django.http import HttpResponse

@json_view
def one(request):
    Colour.objects.create(txt=request.GET['q'])
    return {'success': True}

@json_view
def two(request):
    objects = Colour.objects.filter(seen=False)
    data = {'requests': [x.seen for x in objects]}
    objects.update(seen=True)
    return data

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'website.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^r', one),
    url(r'^q', two),
)
