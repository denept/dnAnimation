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
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

function getSerialNum(n) {
     var sn = ""
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35)
         sn += chars[id]
     }
     return sn
}

function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

function addClass(obj, cls) {
  if (!this.hasClass(obj, cls)) obj.className += " " + cls
}

function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    obj.className = obj.className.replace(reg, ' ')
  }
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

//button click effect
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
  },600)
  //callback.call(this, e);
  return dnAnimation
}

//div popup effect
dnAnimation.windowspopup = function(obj,callback) {
  var cls = data['windowspopup']['classname']
  //if(!hasClass(obj, cls)) obj.className += " " + cls
  obj.className = cls
  obj.style.display = 'block'
  callback.call(obj)
  return dnAnimation
}

//div popup effect
/*  x using width, y using height
 *
 */
dnAnimation.switchpopup = function(obj1,obj2,px,type,callback) {
  var cls = data['switchpopup']['classname']
  var axis = data['switchpopup']['axis'].toUpperCase()
  if(type.toUpperCase() == 'A'){
    if(axis == 'X'){
      var style1 = '@-webkit-keyframes switchpopupAXKF{0%{left: 0px;} 100%{left: '+(-px)+'px;}}'
      var style2 = '@-webkit-keyframes switchpopupBXKF{0%{left: '+px+'px;} 100%{left: 0px;}}'
    }else{
      var style1 = '@-webkit-keyframes switchpopupAYKF{0%{top: 0px;} 100%{top: '+(-px)+'px;}}'
      var style2 = '@-webkit-keyframes switchpopupBYKF{0%{top: '+px+'px;} 100%{top: 0px;}}'
    }
    cls1 = cls + 'A'
    cls2 = cls + 'B'
    removeClass(obj1, cls + 'B' + axis)
    removeClass(obj2, cls + 'A' + axis)
  }else{
    if(axis == 'X'){
      var style1 = '@-webkit-keyframes switchpopupBXKF{0%{left: '+(-px)+'px;} 100%{left: 0px;}}'
      var style2 = '@-webkit-keyframes switchpopupAXKF{0%{left: 0px;} 100%{left: '+px+'px;}}'
    }else{
      var style1 = '@-webkit-keyframes switchpopupBYKF{0%{top: '+(-px)+'px;} 100%{top: 0px;}}'
      var style2 = '@-webkit-keyframes switchpopupAYKF{0%{top: 0px;} 100%{top: '+px+'px;}}'
    }
    cls1 = cls + 'B'
    cls2 = cls + 'A'
    removeClass(obj1, cls + 'A' + axis)
    removeClass(obj2, cls + 'B' + axis)
  }
  var idObject = document.getElementById(obj1.id+'style')
    if (idObject != null) 
          obj1.removeChild(idObject)
  var style=document.createElement("style")
  style.id = obj1.id+'style'
  style.innerHTML = style1
  obj1.appendChild(style)
  if(!hasClass(obj1, cls1 + axis)) obj1.className += " " + cls1 + axis
  obj1.style.display = 'block'
  var idObject = document.getElementById(obj2.id+'style')
    if (idObject != null) 
          obj2.removeChild(idObject)
  var style=document.createElement("style")
  style.id = obj2.id+'style'
  style.innerHTML = style2
  obj2.appendChild(style)
  if(!hasClass(obj2, cls2 + axis)) obj2.className += " " + cls2 + axis
  obj2.style.display = 'block'
  callback.call(obj1,obj2)
  return dnAnimation
}
// end
})(this);
