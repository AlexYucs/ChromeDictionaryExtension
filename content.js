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
    //var newURL = "https://www.merriam-webster.com/dictionary/"+word;
    //chrome.tabs.create({ url: newURL });
    request = new XMLHttpRequest();
    
    
    request.open("GET", "http://www.dictionaryapi.com/api/v1/references/learners/xml/"+word+"?key=[KEY HERE]", true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        //console.log(request.responseXML);
		var returned_xml = request.responseText;
		var start = returned_xml.indexOf("<dt>");   //"dt>:");
		//var textin = start.toString()+" kk";
		var end = 0;
		if(returned_xml.indexOf("<wsgram")>returned_xml.indexOf("<vi")|| returned_xml.indexOf("<wsgram") == -1){
			end = returned_xml.indexOf("<vi");
		}
		else{
			end = returned_xml.indexOf("<wsgram");
		}
		var fin_string = returned_xml.slice(start, end);
	
		//chrome.tabs.create({ url: typeof(returned_xml)});
		//chrome.tabs.create({ url: fin_string});
		//chrome.tabs.create({ url: request.responseText});
		//chrome.tabs.create({ url: textin});
		
		renderBubble(X, Y, fin_string);
		
		
      } else if (request.readyState == 4 && request.status != 200) {
        //console.log("not found");
		renderBubble(X, Y, "Connection Error");
      } else {
		//console.log("not found");
		renderBubble(X, Y, "Loading?");
        //searchText(X,Y,word);
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
