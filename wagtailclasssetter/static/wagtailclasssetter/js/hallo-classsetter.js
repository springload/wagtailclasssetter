(function() {
  (function($) {
    return $.widget("IKS.halloclass", {
      options: {
        uuid: '',
        editable: null
      },
      populateToolbar: function(toolbar) {
        var button, getEnclosingLink, widget;

        widget = this;
        getEnclosingLink = function() {
          var node;

          node = widget.options.editable.getSelection().commonAncestorContainer;
          return $(node).parents('a').get(0);
        };
        checkLinkWithClass = function() {
          var node, link;

          node = widget.options.editable.getSelection().commonAncestorContainer;
          link = $(node).parents('a').get(0);
          if (link) {
            if (link.classList.length > 0) {
              return true;
            }
          }  
          return false;
        };
        button = $('<span></span>');
        button.hallobutton({
          uuid: this.options.uuid,
          editable: this.options.editable,
          label: 'Class',
          icon: 'fa fa-tag',
          command: null,
          queryState: function(event) {
            return button.hallobutton('checked', checkLinkWithClass());
          }
        });
        toolbar.append(button);
        return button.on("click", function(event) {
          var enclosingLink, lastSelection, url;
          var linkClass = "";

          enclosingLink = getEnclosingLink();

          if (enclosingLink) {
            linkClass = "";
            if ($(enclosingLink).attr('class')) {
              linkClass =  $(enclosingLink).attr('class');
            }
            
            button.hallobutton('checked', false);
            lastSelection = widget.options.editable.getSelection();
            if (!lastSelection.collapsed) {
              url = window.classChooserUrls.classChooser + '?class=' + linkClass;
              return ModalWorkflow({
                url: url,
                responses: {
                  classChosen: function(response) {
                    $(enclosingLink).attr('class', response.class_name);
                    widget.options.editable.element.trigger('change');
                  }
                }
              });
            }
          }

          return false;

        });
      }
    });
  })(jQuery);

}).call(this);