import json

from django.contrib.auth.decorators import permission_required

from wagtail.wagtailadmin.modal_workflow import render_modal_workflow
from wagtailclasssetter.forms import *


@permission_required('wagtailadmin.access_admin')
def class_set(request):
    class_name = None
    if request.GET.get('class'):
        class_name = request.GET.get('class')
        form = ClassNameForm(initial={'class_name': class_name})
    else:
        form = ClassNameForm()
    return render_modal_workflow(
        request,
        "wagtailclasssetter/chooser/class.html",
        "wagtailclasssetter/chooser/class.js",
        {
            'form': form
        }
    )


@permission_required('wagtailadmin.access_admin')
def class_chosen(request):
    if request.POST:
        form = ClassNameForm(request.POST)
        if form.is_valid():
            return render_modal_workflow(request, None, "wagtailclasssetter/chooser/class_chosen.js", {
                'response': json.dumps({'class_name': form.cleaned_data['class_name']}),
            })
    else:
        form = ClassNameForm()
    return render_modal_workflow(
        request,
        "wagtailclasssetter/chooser/class.html",
        "wagtailclasssetter/chooser/class.js",
        {
            'form': form
        }
    )
