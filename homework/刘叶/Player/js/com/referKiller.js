
//参考https://github.com/jpgerek/referrer-killer/blob/master/example.html


function videoHtml(url){
  return htmlString('<video id="video" src="' + escapeDoubleQuotes(url) + '" ' + '/>');
}

function htmlString(html) {
  var defaultStyles = 'border:none; overflow:hidden; ',
    id;

  id = '__referrer_killer_' + (new Date).getTime() + Math.floor(Math.random()*9999);
  /*-- Returning html with the hack wrapper --*/
  return '<iframe \
      style="border: none" \
      scrolling="no" \
      frameborder="no" \
      allowtransparency="true" ' +
    'id="' + id + '" ' +
    '	src="javascript:\'\
    <!doctype html>\
    <html>\
    <head>\
    <meta charset=\\\'utf-8\\\'>\
    <style>*{margin:0;padding:0;border:0;}</style>\
    </head>' +
    /*-- Function to adapt iframe's size to content's size --*/
    '<script>\
       function resizeWindow() {\
        var elems  = document.getElementsByTagName(\\\'*\\\'),\
          width  = 0,\
          height = 0,\
          first  = document.body.firstChild,\
          elem;\
        if (first.offsetHeight && first.offsetWidth) {\
          width = first.offsetWidth;\
          height = first.offsetHeight;\
        } else {\
          for (var i in elems) {\
                    elem = elems[i];\
                    if (!elem.offsetWidth) {\
                      continue;\
                    }\
                    width  = Math.max(elem.offsetWidth, width);\
                    height = Math.max(elem.offsetHeight, height);\
          }\
        }\
        var ifr = parent.document.getElementById(\\\'' + id + '\\\');\
        ifr.height = height;\
        ifr.width  = width;\
      }\
    </script>' +
    '<body onload=\\\'resizeWindow()\\\'>\' + decodeURIComponent(\'' +
    /*-- Content --*/
    encodeURIComponent(html) +
  '\') +\'</body></html>\'"></iframe>';
}

function escapeDoubleQuotes(str) {
  return str.split('"').join('\\"');
}
