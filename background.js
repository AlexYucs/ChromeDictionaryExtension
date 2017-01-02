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
	var newURL = "https://www.merriam-webster.com/dictionary/"+word;
	chrome.tabs.create({ url: newURL });
}

%20 for spaces
http://www.dictionaryapi.com/api/v1/references/learners/xml/STRING?key=[YOUR KEY GOES HERE]









