from django import forms
from django.utils.translation import ugettext as _


class ClassNameForm(forms.Form):
    class_name = forms.CharField(
        label=_("Class name"),
        max_length=255,
        required=False,
        help_text="Set the class for the selected element."
    )
