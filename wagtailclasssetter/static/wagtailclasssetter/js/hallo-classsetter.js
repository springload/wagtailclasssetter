(function() {
  (function(jQuery) {
    return jQuery.widget("IKS.halloclass", {
      options: {
        editable: null,
        uuid: "",
        link: false,
        image: false,
        defaultUrl: 'http://',
        dialogOpts: {
          autoOpen: false,
          width: 540,
          height: 200,
          title: "Enter class",
          buttonTitle: "Insert",
          buttonUpdateTitle: "Update",
          modal: true,
          resizable: false,
          draggable: false,
          dialogClass: 'hallolink-dialog'
        },
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var butTitle, butUpdateTitle, buttonize, buttonset, dialog, dialogId, dialogSubmitCb, isEmptyLink, urlInput, widget,
          _this = this;
        widget = this;
        dialogId = "" + this.options.uuid + "-dialog";
        butTitle = this.options.dialogOpts.buttonTitle;
        butUpdateTitle = this.options.dialogOpts.buttonUpdateTitle;
        dialog = jQuery("<div id=\"" + dialogId + "\">        <form action=\"#\" method=\"post\" class=\"linkForm\">          <input class=\"url\" type=\"text\" name=\"url\"            value=\"" + this.options.defaultUrl + "\" />          <input type=\"submit\" id=\"addlinkButton\" value=\"" + butTitle + "\"/>        </form></div>");
        urlInput = jQuery('input[name=url]', dialog);
        isEmptyLink = function(link) {
          if ((new RegExp(/^\s*$/)).test(link)) {
            return true;
          }
          if (link === widget.options.defaultUrl) {
            return true;
          }
          return false;
        };
        dialogSubmitCb = function(event) {
          var link, linkNode;
          event.preventDefault();
          link = urlInput.val();
          dialog.dialog('close');
          widget.options.editable.restoreSelection(widget.lastSelection);
          if (isEmptyLink(link)) {
            document.execCommand("unlink", null, "");
          } else {
            if (!(/:\/\//.test(link)) && !(/^mailto:/.test(link))) {
              link = 'http://' + link;
            }
            if (widget.lastSelection.startContainer.parentNode.href === void 0) {
              if (widget.lastSelection.collapsed) {
                linkNode = jQuery("<a href='" + link + "'>" + link + "</a>")[0];
                widget.lastSelection.insertNode(linkNode);
              } else {
                document.execCommand("createLink", null, link);
              }
            } else {
              widget.lastSelection.startContainer.parentNode.href = link;
            }
          }
          widget.options.editable.element.trigger('change');
          return false;
        };
        dialog.find("input[type=submit]").click(dialogSubmitCb);
        buttonset = jQuery("<span class=\"" + widget.widgetName + "\"></span>");
        buttonize = function(type) {
          var button, buttonHolder, id;
          id = "" + _this.options.uuid + "-" + type;
          buttonHolder = jQuery('<span></span>');
          buttonHolder.hallobutton({
            label: 'Link',
            icon: 'icon-link',
            editable: _this.options.editable,
            command: null,
            queryState: false,
            uuid: _this.options.uuid,
            cssClass: _this.options.buttonCssClass
          });
          buttonset.append(buttonHolder);
          button = buttonHolder;
          button.on("click", function(event) {
            var button_selector, selectionParent;
            widget.lastSelection = widget.options.editable.getSelection();
            urlInput = jQuery('input[name=url]', dialog);
            selectionParent = widget.lastSelection.startContainer.parentNode;
            if (!selectionParent.href) {
              urlInput.val(widget.options.defaultUrl);
              jQuery(urlInput[0].form).find('input[type=submit]').val(butTitle);
            } else {
              urlInput.val(jQuery(selectionParent).attr('href'));
              button_selector = 'input[type=submit]';
              jQuery(urlInput[0].form).find(button_selector).val(butUpdateTitle);
            }
            widget.options.editable.keepActivated(true);
            dialog.dialog('open');
            dialog.on('dialogclose', function() {
              widget.options.editable.restoreSelection(widget.lastSelection);
              jQuery('label', buttonHolder).removeClass('ui-state-active');
              widget.options.editable.element.focus();
              return widget.options.editable.keepActivated(false);
            });
            return false;
          });
          return _this.element.on("keyup paste change mouseup", function(event) {
            var nodeName, start;
            start = jQuery(widget.options.editable.getSelection().startContainer);
            if (start.prop('nodeName')) {
              nodeName = start.prop('nodeName');
            } else {
              nodeName = start.parent().prop('nodeName');
            }
            if (nodeName && nodeName.toUpperCase() === "A") {
              jQuery('label', button).addClass('ui-state-active');
              return;
            }
            return jQuery('label', button).removeClass('ui-state-active');
          });
        };
        if (this.options.link) {
          buttonize("A");
        }
        if (this.options.link) {
          toolbar.append(buttonset);
          buttonset.hallobuttonset();
          return dialog.dialog(this.options.dialogOpts);
        }
      }
    });
  })(jQuery);

}).call(this);
