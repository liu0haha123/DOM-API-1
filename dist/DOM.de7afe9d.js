// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"qNh7":[function(require,module,exports) {
window.dom = {
  // 增
  create: function create(string) {
    var container = document.createElement("template"); //只有这个标签能100%容纳所有标签

    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after: function after(node, nodeInsert) {
    //没有下一个节点也可以插入
    node.parentNode.insertBefore(nodeInsert, node.nextSibling);
  },
  before: function before(node, nodeInsert) {
    node.parentNode.insertBefore(nodeInsert, node);
  },
  append: function append(parent, node) {
    parent.appendChild(node);
  },
  wrap: function wrap(node, parent) {
    // 先把父节点放到子节点前面，然后用append移动进去
    dom.before(node, parent);
    dom.append(parent, node);
  },
  // 删 注意返回删除的对象
  remove: function remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty: function empty(node) {
    // 解构赋值
    var childNodes = node.childNodes.childNodes;
    var array = []; // for循环方法有子节点长度动态变换的问题

    var fc = node.firstChild;

    while (fc) {
      array.push(dom.remove(node.firstChild));
      fc = node.firstChild;
    }

    return array;
  },
  // 改
  attr: function attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      return node.setAttributeNode(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text: function text(node, string) {
    if (arguments.length === 2) {
      //适配
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      return node.innerText;
    }
  },
  html: function html(node, string) {
    if (arguments.length === 2) {
      //适配
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style: function style(node, name, value) {
    if (arguments.length === 3) {
      //style("div","color","red")
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        var object = name;

        for (var key in Object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add: function add(node, className) {
      node.classList.add(className);
    },
    remove: function remove(node, className) {
      node.classList.remove(className);
    },
    has: function has(node, className) {
      return node.classList.contains(className);
    }
  },
  on: function on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off: function off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 查
  find: function find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent: function parent(node) {
    return node.parentNode;
  },
  children: function children(node) {
    return node.children;
  },
  siblings: function siblings(node) {
    // 注意children是伪数组
    return Array.from(node.parentNode.children).filter(function (n) {
      return n !== node;
    });
  },
  next: function next(node) {
    var x = node.nextSibling;

    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }

    return x;
  },
  previous: function previous(node) {
    var x = node.previousSibling;

    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }

    return x;
  },
  each: function each(nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index: function index(node) {
    var list = dom.children(node.parentNode);
    var i;

    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }

    return i;
  }
};
},{}]},{},["qNh7"], null)
//# sourceMappingURL=DOM.de7afe9d.js.map