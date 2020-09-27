
/****** READ THE NOTES IN THE background.js ******/

/*dom insertion library function from MDN - https://developer.mozilla.org/en-US/docs/XUL_School/DOM_Building_and_HTML_Insertion*/
jsonToDOM.namespaces = {
    html: 'http://www.w3.org/1999/xhtml',
    xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
};
jsonToDOM.defaultNamespace = jsonToDOM.namespaces.html;
function jsonToDOM(xml, doc, nodes) {
    function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);        
        return [jsonToDOM.namespaces[m[1]], m[2]];
    }

    function tag(name, attr) {
        if (Array.isArray(name)) {
            var frag = doc.createDocumentFragment();
            Array.forEach(arguments, function (arg) {
                if (!Array.isArray(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.slice(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || jsonToDOM.defaultNamespace, vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == 'key')
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == 'function')
                elem.addEventListener(key.replace(/^on/, ''), val, false);
            else
                elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function(e) {
			try {
				elem.appendChild(
							Object.prototype.toString.call(e) == '[object Array]'
							?
								tag.apply(null, e)
							:
								e instanceof doc.defaultView.Node
								?
									e
								:
									doc.createTextNode(e)
						);
			} catch (ex) {
				elem.appendChild(doc.createTextNode(ex));
			}
        });
        return elem;
    }
    return tag.apply(null, xml);
}
	
if (document.getElementById('contasturbo_plugin') == null) {
	
	var ContasTurbo_iframe = 
	['div', {style:'width:100%; height:70px;', id:'contasturbo_plugin'}, 
		['iframe', {
            src:'https://www.contasturbo.com/api/plugin/header.php',
            referrerpolicy:'no-referrer-when-downgrade',
			scrolling:'no',
			frameBorder:'0',
			style:'position: absulute; z-index: 99999; width: 100%; min-width: 950px; border: 0px;'}
		]
	];
	
	var ContasTurbo_iframe_close = 
	['div', {style:'position: relative; top: 23px; left: 8px; padding: 0px 25px 0 3px; height: 0px; z-index: 999999;', id:'contasturbo_close'}, 
		['a',{id:'contasturbo_close_a', href:'#'},
			['img', {src: 'https://www.contasturbo.com/api/plugin/img/ico_close.png'}]
		]
	];
	
	document.body.insertBefore(jsonToDOM(ContasTurbo_iframe, document, {}), document.body.firstChild);
	document.body.insertBefore(jsonToDOM(ContasTurbo_iframe_close, document, {}), document.body.firstChild);
	
	contasturbo_close_a.onclick = function() {
		
		document.getElementById('contasturbo_close').remove();
		document.getElementById('contasturbo_plugin').remove();
		
		return false;
		
	}
	
}