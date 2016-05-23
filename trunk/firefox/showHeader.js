
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

function ContasTurbo_checkUrl(href) {
	
	/* List of urls in witch the iframe will be inserted automatically */
	
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
	
	/* List of urls in witch the iframe will NOT inserted */
	
	return ((href.indexOf('contasturbo.com/') != -1 ||
			href.indexOf('conexaomega.com/') != -1 ||
			href.indexOf('conexaomega.com/') != -1 ||
			href.indexOf('brupload.net/') != -1 ||
			href.indexOf('filefactory.com/file') != -1 ||
			href.indexOf('filefactory.com/stream') != -1));
	
}
	
if (window.location.href.indexOf('http://') == 0 && !ContasTurbo_checkRedirect(window.location.href) && ContasTurbo_checkUrl(window.location.href) && document.getElementById('contasturbo_plugin') == null) {
	
	var ContasTurbo_iframe = 
	['div', {style:'width:100%; height:70px;', id:'contasturbo_plugin'}, 
		['iframe', {
			src:'http://api.contasturbo.com/plugin/header.php?v=2',
			scrolling:'no',
			frameBorder:'0',
			style:'position: absulute; z-index: 99999; width: 100%; min-width: 950px; border: 0px;'}
		]
	];
	
	var ContasTurbo_iframe_close = 
	['div', {style:'position: relative; top: 23px; left: 8px; padding: 0px 25px 0 3px; height: 0px; z-index: 999999;', id:'contasturbo_close'}, 
		['a',{id:'contasturbo_close_a', href:'#'},
			['img', {src: 'http://api.contasturbo.com/plugin/img/ico_close'}]
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