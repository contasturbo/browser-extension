
/********** NOTES **********\

- What does this extension do?

It creates a 70px tall iframe in the top of specific sites
when loaded or when the user click on the extension's button.
This iframe allows the user to access our (paid) services
without having to navigate to our website.


- SSL

The iframe does not use SSL, therefore it will not be loaded
in site that use SSL. The extension will not perform any
automated action in such sites. If the user clicks in the
extension button, he will be redirected to another page.


- showHeader.js

chrome.tabs.executeScript is not working properly on firefox 42.
The logic was moved to the content script showHeader.js until
dez/2015 when firefox 43 become available.

*/

/*
function ContasTurbo_checkUrl(href) {
	
	/* List of urls in witch the iframe will be inserted automatically *
	
	return ((href.indexOf('ul.to/') != -1 ||
	href.indexOf('uploaded.net/file/') != -1 ||
	href.indexOf('datafile.com/d/') != -1 ||
	(href.indexOf('crocko.com/') != -1 && href.indexOf('.html') == -1 && href.length > 25) ||
	(href.indexOf('uploadrocket.net/') != -1 && href.indexOf('?op=') == -1 && href.length > 35) ||
	href.indexOf('ryushare.com/') != -1 ||
	href.indexOf('uploadable.ch/file/') != -1 ||
	(href.indexOf('2shared.com/') != -1 && href.indexOf('.html') != -1) ||
	(href.indexOf('rockfile.eu/') != -1 && href.indexOf('?op=') == -1 && href.length > 30) ||
	(href.indexOf('uptobox.com/') != -1 && href.indexOf('?op=') == -1 && href.length > 25) ||
	(href.indexOf('1fichier.com') != -1 && href.length > 24) ||
	href.indexOf('filepost.com/files/') != -1 ||
	href.indexOf('jumbofiles.com/') != -1 ||
	href.indexOf('file4go.net/r/') != -1 ||
	((href.indexOf('4shared.com/') != -1 || href.indexOf('4shared.com/get')) != -1 && href.length > 25) ||
	href.indexOf('freakshare.com/files/') != -1 ||
	href.indexOf('bitshare.com/files/') != -1 || href.indexOf('bitshare.com/?f=') != -1 ||
	href.indexOf('mediafire.com/?') != -1 || href.indexOf('mediafire.com/download') != -1 ||
	href.indexOf('depfile.com/') != -1 ||
	(href.indexOf('netload.in/') != -1 && href.length > 30) ||
	href.indexOf('sendspace.com/file/') != -1 ||
	href.indexOf('megashares.com/') != -1 ||
	href.indexOf('gigasize.com/get/') != -1));
	
}

function ContasTurbo_checkRedirect(href) {
	
	return ((href.indexOf('contasturbo.com/') != -1 ||
			href.indexOf('conexaomega.com/') != -1 ||
			href.indexOf('conexaomega.com/') != -1 ||
			href.indexOf('brupload.net/') != -1 ||
			href.indexOf('filefactory.com/file') != -1 ||
			href.indexOf('filefactory.com/stream') != -1));
	
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
	if (!ContasTurbo_checkRedirect(tab.url)) {
		
		if (changeInfo.status == 'complete' && ContasTurbo_checkUrl(tab.url) && tab.url.indexOf('http://') == 0) {
			
			chrome.tabs.executeScript(null, {file: 'showHeader.js'});
			
		}
		
	}
	
});
*/


chrome.browserAction.onClicked.addListener(function(tab) {
	
	chrome.tabs.update(tab.id, {url: 'http://api.contasturbo.com/plugin/?link=' + tab.url});
	
	/*
	if (tab.url.indexOf('http://') == 0 && !ContasTurbo_checkRedirect(tab.url)) {
		
		chrome.tabs.executeScript(null, {file: 'showHeader.js'});
		
	} else {
		
		chrome.tabs.update(tab.id, {url: 'http://api.contasturbo.com/plugin/?link=' + tab.url});
		
	}
	*/
	
});