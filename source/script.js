
function loadPage(arrayOfTabs) {

  document.getElementById('content').src = 'https://www.contasturbo.com/api/plugin/header.php?link=' + arrayOfTabs[0].url

}

window.addEventListener('load', function(){

  try {

    if (typeof browser !== 'undefined') {
      
      browser.tabs.query({currentWindow: true, active: true}, function (tabs) {
        loadPage(tabs)
      });

      return
      
    }

    chrome.tabs.query({active: true, currentWindow: true},
      (arrayOfTabs) => { loadPage(arrayOfTabs) }
    )

  } catch(o) {}

}, false)