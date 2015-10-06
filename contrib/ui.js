(function (b, c, d, e) {

/* document | [] | prototype | null */

  /*
   * init function (internal use)
   * a = selector, dom element or function
   */
  function i(a) {
    c.push.apply(this, a && a.nodeType ? [a] : '' + a === a ? b.querySelectorAll(a) : e)
  }

  /*
   * $ main function
   * a = css selector, dom object, or function
   * http://www.dustindiaz.com/smallest-domready-ever
   * returns instance or executes function on ready
   */
  $=function (a) {
    // no dependencies
    return /^f/.test(typeof a)?  
             /c/.test(b.readyState)?
               a():
               $(b).on('DOMContentLoaded', a)
             :new i(a)
  }

  // set ki prototype
  $[d] = i[d] = {

    length: 0, // default length

    /* on method
     * a = string event type i.e 'click'
     * b = function
     * return this
     */
    on: function (a, b) {
      return this.each(function (c) {
        c.addEventListener(a, b)
      })
    },

    /* off method
     * a = string event type i.e 'click'
     * b = function
     * return this
     */
    off: function (a, b) {
      return this.each(function (c) {
        c.removeEventListener(a, b)
      })
    },

    /*
     * each method
     * use native forEach to iterate collection
     * a = the function to call on each iteration
     * i = the index for that function
     */
    each: function (a, i,z) {
      c.forEach.call(this, a, i,z)
      return this
    },

    // for some reason is needed to get an array-like
    // representation instead of an object
    splice: c.splice
  }
}(/*b*/document,/*c*/[],/*d*/'prototype'/*e*/));

// taken from ki.extend.js
(function() {

  // map some classlist functions to the jQuery counterpart
  var props = ['addClass', 'removeClass', 'toggleClass'],
  maps = ['add', 'remove', 'toggle'];

  props.forEach(function(prop, index) {
    $.prototype[prop] = function(a) {
      return this.each(function(b) {
        b.classList[maps[index]](a);
      });
    };
  });

  $.prototype.hasClass = function(a) {
    return this[0].classList.contains(a);
  };

  $.prototype.append = function(a) {
    return this.each(function(b) {
      b.appendChild(a[0]);
    });
  };

  $.prototype.prepend = function(a) {
    return this.each(function(b) {
      b.insertBefore(a[0], b.parentNode.firstChild);
    });
  };

  $.prototype.hide = function() {
    return this.each(function(b) {
      b.style.display = 'none';
    });
  };

  $.prototype.show = function() {
    return this.each(function(b) {
      b.style.display = '';
    });
  };

  $.prototype.attr = function(a, b) {
    return b === []._ ? this[0].getAttribute(a) : this.each(function(c) {
      c.setAttribute(a, 
        (typeof b==='function')?
          b(c.getAttribute(a)):
          b
      );
    });
  };

  // by ansuz
  $.prototype.data = function(a,b){
    return b === []._ ? this[0].getAttribute('data-'+a) : this.each(function(c){
      c.setAttribute('data-'+a,b);
    });
  };

  $.prototype.removeAttr = function(a) {
    return this.each(function(b) {
      b.removeAttribute(a);
    });
  };

  $.prototype.hasAttr = function(a) {
    return this[0].hasAttribute(a);
  };

  $.prototype.before = function(a) {
    return this.each(function(b) {
      b.insertAdjacentHTML('beforebegin', a);
    });
  };

  $.prototype.after = function(a) {
    return this.each(function(b) {
      b.insertAdjacentHTML('afterend', a);
    });
  };

  $.prototype.css = function(a, b) {
    if(typeof a ==='object'){
      var that=this;
      Object.keys(a).map(function(prop){
        that.each(function(c) {
          c.style[prop] = a[prop];
        });
      });
      return this;
    }else{
      return b === []._ ? this[0].style[a] : this.each(function(c) {
        c.style[a] = b;
      });
    }
  };

  $.prototype.first = function() {
    return $(this[0]);
  };

  $.prototype.last = function() {
    return $(this[this.length - 1]);
  };

  $.prototype.get = function(a) {
    return $(this[a]);
  };

  $.prototype.text = function(a) {
    return a === []._ ? this[0].textContent : this.each(function(b) {
      b.textContent = a;
    });
  };

  $.prototype.html = function(a) {
    return a === []._ ? this[0].innerHTML : this.each(function(b) {
      b.innerHTML = (typeof a === 'function')?
        a(b.innerHTML):
        a;
    });
  };

  $.prototype.parent = function() {
    return (this.length < 2) ? $(this[0].parentNode): [];
  };

  $.prototype.next = function(){
    return $(this[0].nextElementSibling);
  };

  // it would be nice if 'sel' could be a function
  // maybe 'find by regex'? that would go a long way
  // isn't quite working?
  $.prototype.find = function(sel){
    sel=sel||'*';
    return (this.length < 2)? $(this[0].querySelectorAll(sel)):[];
  };

  $.prototype.remove = function() {
    return this.each(function(b) {
      b.parentNode.removeChild(b);
    });
  };

  $.prototype.trigger = function(a) {
    if (document.createEvent) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(a, true, false);
      this.each(function(b) {
        b.dispatchEvent(event);
      });
    } else {
      this.each(function(b) {
        b.fireEvent('on' + a);
      });
    }
  };

  $.prototype.is = function(a) {
    var m = (this[0].matches || this[0].matchesSelector || this[0].msMatchesSelector || this[0].mozMatchesSelector || this[0].webkitMatchesSelector || this[0].oMatchesSelector);
    if (m) {
      return m.call(this[0], a);
    } else {
      var n = this[0].parentNode.querySelectorAll(a);
      for (var i = n.length; i--;) {
        if (n[i] === this[0]) {
          return true;
        }
      }
      return false;
    }
  };

  $.prototype.create=function(type,id){
    var temp=document.createElement(type);
    if(id)temp.id=id;
    this[0].appendChild(temp);
    return temp;
  };

  $.prototype.resize=function(e,f){
    e.addEventListener('resize',f);
  };

  $.stop = function(e) {
    if (!e.preventDefault) {
      e.returnValue = false;
    } else {
      e.preventDefault();
    }
  };

  $.prototype.offset=function(el){
    el=this[0];
    var _x = 0, _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
  };


  $.param = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ? $.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
  };

  $.ajax = function(opt){  // a tiny little ajax function
    opt.callback||function(x){
      console.log(x);
    };
    var content=opt.content||false;
    var type = content?"POST":"GET";
    var url=opt.url||'/';
    opt.stack=[];
    opt.then=function(next){
      opt.stack.push(next);
      return opt;
    };
    var call=function(){
      
    };

    var jax = new XMLHttpRequest();
    jax.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        opt.callback(this.responseText);
      }
    }
    jax.open(type, url, true);
    jax.send(type==='POST'?
      Object.keys(b)
        .map(function(k){
          return k+'='+b[k];
        }).join('&'):null);
    return opt;
  };
}());

