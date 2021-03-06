// stayDropUpload jQuery plugin version 1.0.0
// (c) 2017 Michele Salvini
//
// https://github.com/StayDistributed/jquery-upload-progress
//
// Released under MIT license.
(function($, document) {

  jQuery.fn.stayDrop = function (options) {

    options = options || {};

    if (options.click) {
      var $input = jQuery('<input>', {
        type: 'file',
        css: {
          display: 'block',
          position: 'absolute',
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          overflow: 'hidden'
        },
        on: {
          click: function (e) {
            e.stopPropagation();
          },
          change: function (e) {
            if (this.files && this.files[0] && options.drop) options.drop(this.files[0]);
          }
        }
      });
      this.append($input);
    }

    this.on({
      click: function (e) {
        if (options.click)
          $input.trigger('click');
      },
      dragover: function (e) {
        e.preventDefault();
        if (options.dragover) options.dragover();
      },
      dragenter: function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (options.dragenter) options.dragenter();
      },
      dragleave: function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (options.dragleave) options.dragleave();
      },
      drop: function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.originalEvent && e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files) {
          var file = e.originalEvent.dataTransfer.files[0];

          if (options.drop) options.drop(file);
        }
      }
    });

    return this;
  };


  var stayUpload = $.stayUpload = function (options) {

    var onProgress = options.onProgress;
    var onEnd = options.onEnd;
    delete options.onProgress;
    delete options.onEnd;

    var formData = new FormData();

    $.each(options.data, function (k, v) {
      formData.append(k, v);
    });

    options.data = formData;
    options.processData = false,
    options.contentType = false;

    options.xhr = function () {
      var self = this,
          myXhr = jQuery.ajaxSettings.xhr();

      if (myXhr.upload && onProgress)
        myXhr.upload.addEventListener('progress', function (e) {
          var progress = e.lengthComputable ? e.loaded/e.total : 0;

          onProgress(progress, e);

          if (e.loaded == e.total) onEnd();
        }, false);

      return myXhr;
    }

    return $.ajax(options);
  };

})(jQuery, document);

