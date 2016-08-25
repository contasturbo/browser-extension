
if (document.getElementById('contasturbo_plugin') == null) {
	
	document.body.innerHTML = '\
		<div id="contasturbo_close" style="position: relative; top: 23px; left: 8px; padding: 0px 25px 0 3px; height: 0px; z-index: 999999;">\
			<a href="#" onclick="document.getElementById(\'contasturbo_plugin\').remove();document.getElementById(\'contasturbo_close\').remove();return false;">\
				<img src="https://www.contasturbo.com/api/plugin/img/ico_close.png" />\
			</a>\
		</div>\
		<div id="contasturbo_plugin" style="width:100%; height:70px;">\
			<iframe style="position: absulute; z-index: 99999; width: 100%; min-width: 950px;" scrolling="no" src="https://www.contasturbo.com/api/plugin/header.php" frameBorder="0"></iframe>\
		</div>\
	' + document.body.innerHTML;

}