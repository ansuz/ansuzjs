/*!
 * ki.extend.js
 * extend ki.js with jQuery style prototypes
 * @author James Doyle (james2doyle)
 * @license MIT
 * Resource for prototypes
 * http://youmightnotneedjquery.com/
 */

(function() {

$.each = function(arr, callback) {
  var i = 0, l = arr.length;
  for(; i < l; ++i) {
    callback(i, arr[i]);
  }
  return this;
};
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
    c.setAttribute(a, b);
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
  if (typeof(a) === 'object') {
    for(var prop in a) {
      this.each(function(c) {
        c.style[prop] = a[prop];
      });
    }
    return this;
  } else {
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
    b.innerHTML = a;
  });
};

$.prototype.parent = function() {
  return (this.length < 2) ? $(this[0].parentNode): [];
};

$.prototype.remove = function() {
  return this.each(function(b) {
    b.parentNode.removeChild(b);
  });
};

$.trim = function(a) {
  return a.replace(/^\s+|\s+$/g, '');
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

$.map = function(arr, fn) {
  var results = [];
  var i = 0, l = arr.length;
  for(; i < l; ++i) {
    results.push(fn(arr[i], i));
  }
  return results;
};

$.stop = function(e) {
  if (!e.preventDefault) {
    e.returnValue = false;
  } else {
    e.preventDefault();
  }
};

$.param = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
    str.push(typeof v == "object" ? $.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }
  return str.join("&");
};

// var p = new $.Deferred();
// p.resolve(n);
// return p.promise();

$.ajax = function(a, b, c) {
  var xhr = new XMLHttpRequest();
  var p = new $.Deferred();
  // 1 == post, 0 == get
  var type = (typeof(b) === 'object') ? 1: 0;
  var gp = ['GET', 'POST'];
  xhr.open(gp[type], a, true);
  var cb = (!type) ? b: c;
  if (typeof(c) === 'undefined' && typeof(b) !== 'function') {
    cb = function(){};
  }
  xhr.onerror = function() {
    p.reject(this);
    cb(this, true);
  };
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400){
        p.resolve(this.response);
        cb(this.response, true);
      } else {
        p.reject(this);
        cb(this, true);
      }
    }
  };
  if (type) {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send($.param(b));
  } else {
    xhr.send();
  }
  xhr = null;
  return p.promise();
};

})();
