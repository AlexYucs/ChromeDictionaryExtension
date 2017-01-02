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
	var newURL = "https://www.merriam-webster.com/dictionary/"+word;
	chrome.tabs.create({ url: newURL });
}

%20 for spaces
var url_req = "http://www.dictionaryapi.com/api/v1/references/learners/xml/"+word+"?key=[YOUR KEY GOES HERE]";
var request = new XMLHttpRequest();
request.open("GET", url_req);
request.send();
var resp = request.responseXML;
var entries = resp.getElementsByTagName("entry id");

for(var i = 0; i < entries.length; i++) {
    if( entries[i])
	
    var d = def[i];
    var singledef = d.getElementsByTagName("dt");
    singledef[0];
}






