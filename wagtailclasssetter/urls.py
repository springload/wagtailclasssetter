from django.conf.urls import url

from wagtailclasssetter.views import chooser


urlpatterns = [
    url(r'^chooser/class_set/$', chooser.class_set, name='class_set'),
    url(r'^chooser/class_chosen/$', chooser.class_chosen, name='class_chosen'),
]
