from django.conf.urls import include, url
from django.conf import settings
from django.utils.html import format_html, format_html_join
from django.core.urlresolvers import reverse
from wagtail.wagtailcore import hooks
from wagtailclasssetter import urls


@hooks.register('register_admin_urls')
def register_admin_urls():
    return [
        url(r'^classsetter/', include(urls)),
    ]


@hooks.register('insert_editor_js')
def editor_js():
    """
    Add extra JS files to the admin
    """
    js_files = [
        'wagtailclasssetter/js/hallo-classsetter.js',
    ]
    js_includes = format_html_join(
        '\n',
        '<script src="{0}{1}"></script>',
        ((settings.STATIC_URL, filename) for filename in js_files)
    )

    return js_includes + format_html("""
            <script>
                registerHalloPlugin('halloclass');
                window.classChooserUrls = [];
                window.classChooserUrls.classChooser = '{0}';
            </script>
        """, reverse('class_set')
    )
