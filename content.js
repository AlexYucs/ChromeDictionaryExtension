// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
	var selection = window.getSelection().toString();
  	if (selection.length > 0) {
		searchText(e.clientX, e.clientY, selection);
  	}
}, false);


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  	bubbleDOM.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  	bubbleDOM.innerHTML = selection;
  	bubbleDOM.style.top = mouseY + 'px';
  	bubbleDOM.style.left = mouseX + 'px';
  	bubbleDOM.style.visibility = 'visible';
}


function searchText(X,Y,word) {
    	request = new XMLHttpRequest();
    
    	//Send XML request to Merriam Webster API
    	request.open("GET", "http://www.dictionaryapi.com/api/v1/references/learners/xml/"+word+"?key=[API KEY]", true);
    	request.send();
    	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {

			//parse xml returned
			var returned_xml = request.responseText;		
			var front = returned_xml.substring(returned_xml.indexOf("<dt>")+5);
			var fin_string = front.substring(0, front.indexOf("<"));


			renderBubble(X, Y, fin_string);


		} else if (request.readyState == 4 && request.status != 200) {
			//error in connection
			renderBubble(X, Y, "Connection Error");
		} else {
			//loading issues?
			renderBubble(X, Y, "Loading?");

		}
    	}

}


/**document.addEventListener('mouseup', function () {
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

**/

