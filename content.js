document.addEventListener('mouseup', function () {
  var selectedText1 = window.getSelection().toString();
  if(selectedText1.length > 0) {
    chrome.runtime.sendMessage(
      {
        'type':       'selection',
        'selection':  selectedText1
      }
    );
  }
});
