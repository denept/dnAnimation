/**
 * dnAnimation 1.0.0 | LICENSE.md
 * Developers denept
 * powered by talknept.com
 * Reference learning Sea.js seajs.org
 * The user please be sure to keep the above information
 */
(function(global, undefined) {

var show_h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
var show_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
if (global.dnAnimation) {
  return
}

var dnAnimation = global.dnAnimation = {
  // The current version of dnAnimation.js being used
  version: "1.0.0"
}

var data = dnAnimation.data = {}
var isArray = Array.isArray || isType("Array")
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function getSerialNum(n) {
     var sn = ""
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         sn += chars[id]
     }
     return sn
}

function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

// Public API

dnAnimation.config = function(configData) {
  for (var key in configData) {
    var curr = configData[key]
    var prev = data[key]

    // Merge object config such as alias, vars
    if (prev && isObject(prev)) {
      for (var k in curr) {
        prev[k] = curr[k]
      }
    }
    else {
      // Concat array config such as map
      if (isArray(prev)) {
        curr = prev.concat(curr)
      }
      // Set config
      data[key] = curr
    }
  }
  return dnAnimation
}

dnAnimation.btnclick = function(obj,callback) {
  var cls = data['btnclick']['classname']
  var hight = data['btnclick']['height']/2
  var ev = ev || window.event
  var top = ev.clientY + document.body.scrollTop - document.body.clientTop
  var left = ev.clientX + document.body.scrollLeft - document.body.clientLeft
  //alert(obj.getBoundingClientRect().top);
  top = top - obj.getBoundingClientRect().top - hight
  left = left - obj.getBoundingClientRect().left -hight 
  var div=document.createElement("div")
  div.id = 'bc'+getSerialNum(5)
  obj.appendChild(div)
  document.getElementById(div.id).style.top = top+'px'
  document.getElementById(div.id).style.left = left+'px'
  if(!hasClass(document.getElementById(div.id), cls)) document.getElementById(div.id).className += " " + cls
  setTimeout(function(){
    /*if (hasClass(document.getElementById(div.id), cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      document.getElementById(div.id).className = document.getElementById(div.id).className.replace(reg, ' ')
    }*/
    var idObject = document.getElementById(div.id)
    if (idObject != null) 
          obj.removeChild(idObject)
  },600);
  //callback.call(this, e);
  return dnAnimation
}

})(this);
