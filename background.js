chrome.runtime.onInstalled.addListener(startListening);
chrome.runtime.onMessage.addListener(messageListener);
chrome.contextMenus.onClicked.addListener(contextMenuListener);
var word = '';

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
    
    
    request.open("GET", "http://www.dictionaryapi.com/api/v1/references/learners/xml/"+word+"?key=[key ss]", true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        //console.log(request.responseXML);
		var returned_xml = request.responseText;
		var start = returned_xml.indexOf(":");   //"dt>:");
		//var textin = start.toString()+" kk";
		var end = 0;
		if(returned_xml.indexOf("<wsgram")>returned_xml.indexOf("<vi")|| returned_xml.indexOf("<wsgram") == -1){
			end = returned_xml.indexOf("<vi")
		}
		else{
			end = returned_xml.indexOf("<wsgram")
		}
		var fin_string = returned_xml.slice(start, end);
	
		chrome.tabs.create({ url: typeof(returned_xml)});
		chrome.tabs.create({ url: fin_string});
		//chrome.tabs.create({ url: request.responseText});
		//chrome.tabs.create({ url: textin});
		
		
      } else if (request.readyState == 4 && request.status != 200) {
        console.log("not found");
		chrome.tabs.create({ url: "wrong" });
      } else {
		console.log("not found");
        chrome.tabs.create({ url: "loading" });
      }
    }

}















//%20 for spaces







