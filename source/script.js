
function loadPage(arrayOfTabs) {

  document.getElementById('content').src = 'https://www.contasturbo.com/api/plugin/header.php?link=' + arrayOfTabs[0].url

}

window.addEventListener('load', function(){

  try {     

    if (chrome) {

      chrome.tabs.query({active: true, currentWindow: true},
        (arrayOfTabs) => { loadPage(arrayOfTabs) }
      )

      return

    }

    browser.tabs.query({currentWindow: true, active: true}).then(loadPage)

  } catch(o) {}

}, false)