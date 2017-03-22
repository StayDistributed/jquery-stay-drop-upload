# jquery-stay-drop-upload
jQuery extension to control the file's drop on an element and the progress of file's upload


Drop file

```html
<div id="dropzone">
  <h3>Drop an image here</h3>
</div>

<script type="text/javascript">
  $("#dropzone").stayDrop({

    // if set to true, when you click on the element it apperas the "open file dialog box"
    click: true,

    dragover: function (e) {
      console.log('dragover');
    },

    dragenter: function (e) {
      console.log('dragenter');
    },

    dragleave: function (e) {
      console.log('dragleave');
    },

    // triggered when the file is selected from dialog or released on the element
    drop: function (file) {
      console.log('file dropped!');
    }

  })
</script>

```



Upload file

```html
<div id="dropzone">
  <h3>Drop an image here</h3>
</div>

<script type="text/javascript">
  $("#dropzone").stayDrop({

    click: true,

    drop: function (file) {

      console.log('file dropped!');

      $.stayUpload({

        // same params of $.ajax
        url: 'http://www.domain.com/upload.php',
        type: 'POST',
        data: {
          a_key: 'a value',
          another_key: 'another value',
          image: file // in PHP you'll get in: $_FILES['image']
        },
        success: function () {
        },
        error: function () {
        },

        // additional options from the plugin:
        onProgress: function (progress) {
          console.log('upload progress: ' + (progress*100).toFixed(2) + '%');
        },

        onEnd: function () {
          console.log('upload ended');
        }

      });
    }

  })
</script>

```