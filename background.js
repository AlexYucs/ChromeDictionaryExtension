chrome.runtime.onInstalled.addListener(startListening);
chrome.runtime.onMessage.addListener(messageListener);
chrome.contextMenus.onClicked.addListener(contextMenuListener);
var word = "";
var fin_def = "";
function startListening() {
  reviseCM();
}

function messageListener(request) {
  if(request.type === 'selection') {
    word = request.selection;
  }
  else{
	  reviseCM();
  }
}

function contextMenuListener(info) {
  searchText();
}

function reviseCM() {
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
	  'id':         'alexyucode',
    'title':      'Search Selected Text...',
    'contexts':   ['selection']
  });
}

function searchText() {	
	//var newURL = "https://www.merriam-webster.com/dictionary/"+word;
	//chrome.tabs.create({ url: newURL });
	request = new XMLHttpRequest();
    
    
    	request.open("GET", "http://www.dictionaryapi.com/api/v1/references/learners/xml/cat?key=[key here]", true);
   	request.send();
   	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log(request.responseText);
			chrome.tabs.create({ url: request.responseText});
		} else if (request.readyState == 4 && request.status != 200) {
			console.log('content', "not found");
			chrome.tabs.create({ url: "wrong" });
		} else {
			console.log('content', "loading");
			chrome.tabs.create({ url: "loading" });
		}
    	}
}

//%20 for spaces







