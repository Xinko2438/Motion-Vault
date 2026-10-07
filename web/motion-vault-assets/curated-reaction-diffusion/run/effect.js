(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // node_modules/ev-emitter/ev-emitter.js
  var require_ev_emitter = __commonJS({
    "node_modules/ev-emitter/ev-emitter.js"(exports, module) {
      init_define_import_meta_env();
      (function(global, factory) {
        if (typeof module == "object" && module.exports) {
          module.exports = factory();
        } else {
          global.EvEmitter = factory();
        }
      })(typeof window != "undefined" ? window : exports, function() {
        function EvEmitter() {
        }
        let proto = EvEmitter.prototype;
        proto.on = function(eventName, listener) {
          if (!eventName || !listener) return this;
          let events = this._events = this._events || {};
          let listeners = events[eventName] = events[eventName] || [];
          if (!listeners.includes(listener)) {
            listeners.push(listener);
          }
          return this;
        };
        proto.once = function(eventName, listener) {
          if (!eventName || !listener) return this;
          this.on(eventName, listener);
          let onceEvents = this._onceEvents = this._onceEvents || {};
          let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
          onceListeners[listener] = true;
          return this;
        };
        proto.off = function(eventName, listener) {
          let listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) return this;
          let index = listeners.indexOf(listener);
          if (index != -1) {
            listeners.splice(index, 1);
          }
          return this;
        };
        proto.emitEvent = function(eventName, args) {
          let listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) return this;
          listeners = listeners.slice(0);
          args = args || [];
          let onceListeners = this._onceEvents && this._onceEvents[eventName];
          for (let listener of listeners) {
            let isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
              this.off(eventName, listener);
              delete onceListeners[listener];
            }
            listener.apply(this, args);
          }
          return this;
        };
        proto.allOff = function() {
          delete this._events;
          delete this._onceEvents;
          return this;
        };
        return EvEmitter;
      });
    }
  });

  // node_modules/imagesloaded/imagesloaded.js
  var require_imagesloaded = __commonJS({
    "node_modules/imagesloaded/imagesloaded.js"(exports, module) {
      init_define_import_meta_env();
      (function(window2, factory) {
        if (typeof module == "object" && module.exports) {
          module.exports = factory(window2, require_ev_emitter());
        } else {
          window2.imagesLoaded = factory(window2, window2.EvEmitter);
        }
      })(
        typeof window !== "undefined" ? window : exports,
        function factory(window2, EvEmitter) {
          let $ = window2.jQuery;
          let console2 = window2.console;
          function makeArray(obj) {
            if (Array.isArray(obj)) return obj;
            let isArrayLike2 = typeof obj == "object" && typeof obj.length == "number";
            if (isArrayLike2) return [...obj];
            return [obj];
          }
          function ImagesLoaded(elem, options, onAlways) {
            if (!(this instanceof ImagesLoaded)) {
              return new ImagesLoaded(elem, options, onAlways);
            }
            let queryElem = elem;
            if (typeof elem == "string") {
              queryElem = document.querySelectorAll(elem);
            }
            if (!queryElem) {
              console2.error(`Bad element for imagesLoaded ${queryElem || elem}`);
              return;
            }
            this.elements = makeArray(queryElem);
            this.options = {};
            if (typeof options == "function") {
              onAlways = options;
            } else {
              Object.assign(this.options, options);
            }
            if (onAlways) this.on("always", onAlways);
            this.getImages();
            if ($) this.jqDeferred = new $.Deferred();
            setTimeout(this.check.bind(this));
          }
          ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
          ImagesLoaded.prototype.getImages = function() {
            this.images = [];
            this.elements.forEach(this.addElementImages, this);
          };
          const elementNodeTypes = [1, 9, 11];
          ImagesLoaded.prototype.addElementImages = function(elem) {
            if (elem.nodeName === "IMG") {
              this.addImage(elem);
            }
            if (this.options.background === true) {
              this.addElementBackgroundImages(elem);
            }
            let { nodeType } = elem;
            if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
            let childImgs = elem.querySelectorAll("img");
            for (let img of childImgs) {
              this.addImage(img);
            }
            if (typeof this.options.background == "string") {
              let children = elem.querySelectorAll(this.options.background);
              for (let child of children) {
                this.addElementBackgroundImages(child);
              }
            }
          };
          const reURL = /url\((['"])?(.*?)\1\)/gi;
          ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
            let style = getComputedStyle(elem);
            if (!style) return;
            let matches = reURL.exec(style.backgroundImage);
            while (matches !== null) {
              let url = matches && matches[2];
              if (url) {
                this.addBackground(url, elem);
              }
              matches = reURL.exec(style.backgroundImage);
            }
          };
          ImagesLoaded.prototype.addImage = function(img) {
            let loadingImage = new LoadingImage(img);
            this.images.push(loadingImage);
          };
          ImagesLoaded.prototype.addBackground = function(url, elem) {
            let background = new Background(url, elem);
            this.images.push(background);
          };
          ImagesLoaded.prototype.check = function() {
            this.progressedCount = 0;
            this.hasAnyBroken = false;
            if (!this.images.length) {
              this.complete();
              return;
            }
            let onProgress = (image, elem, message) => {
              setTimeout(() => {
                this.progress(image, elem, message);
              });
            };
            this.images.forEach(function(loadingImage) {
              loadingImage.once("progress", onProgress);
              loadingImage.check();
            });
          };
          ImagesLoaded.prototype.progress = function(image, elem, message) {
            this.progressedCount++;
            this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
            this.emitEvent("progress", [this, image, elem]);
            if (this.jqDeferred && this.jqDeferred.notify) {
              this.jqDeferred.notify(this, image);
            }
            if (this.progressedCount === this.images.length) {
              this.complete();
            }
            if (this.options.debug && console2) {
              console2.log(`progress: ${message}`, image, elem);
            }
          };
          ImagesLoaded.prototype.complete = function() {
            let eventName = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = true;
            this.emitEvent(eventName, [this]);
            this.emitEvent("always", [this]);
            if (this.jqDeferred) {
              let jqMethod = this.hasAnyBroken ? "reject" : "resolve";
              this.jqDeferred[jqMethod](this);
            }
          };
          function LoadingImage(img) {
            this.img = img;
          }
          LoadingImage.prototype = Object.create(EvEmitter.prototype);
          LoadingImage.prototype.check = function() {
            let isComplete = this.getIsImageComplete();
            if (isComplete) {
              this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
              return;
            }
            this.proxyImage = new Image();
            if (this.img.crossOrigin) {
              this.proxyImage.crossOrigin = this.img.crossOrigin;
            }
            this.proxyImage.addEventListener("load", this);
            this.proxyImage.addEventListener("error", this);
            this.img.addEventListener("load", this);
            this.img.addEventListener("error", this);
            this.proxyImage.src = this.img.currentSrc || this.img.src;
          };
          LoadingImage.prototype.getIsImageComplete = function() {
            return this.img.complete && this.img.naturalWidth;
          };
          LoadingImage.prototype.confirm = function(isLoaded, message) {
            this.isLoaded = isLoaded;
            let { parentNode } = this.img;
            let elem = parentNode.nodeName === "PICTURE" ? parentNode : this.img;
            this.emitEvent("progress", [this, elem, message]);
          };
          LoadingImage.prototype.handleEvent = function(event) {
            let method = "on" + event.type;
            if (this[method]) {
              this[method](event);
            }
          };
          LoadingImage.prototype.onload = function() {
            this.confirm(true, "onload");
            this.unbindEvents();
          };
          LoadingImage.prototype.onerror = function() {
            this.confirm(false, "onerror");
            this.unbindEvents();
          };
          LoadingImage.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this);
            this.proxyImage.removeEventListener("error", this);
            this.img.removeEventListener("load", this);
            this.img.removeEventListener("error", this);
          };
          function Background(url, element) {
            this.url = url;
            this.element = element;
            this.img = new Image();
          }
          Background.prototype = Object.create(LoadingImage.prototype);
          Background.prototype.check = function() {
            this.img.addEventListener("load", this);
            this.img.addEventListener("error", this);
            this.img.src = this.url;
            let isComplete = this.getIsImageComplete();
            if (isComplete) {
              this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
              this.unbindEvents();
            }
          };
          Background.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this);
            this.img.removeEventListener("error", this);
          };
          Background.prototype.confirm = function(isLoaded, message) {
            this.isLoaded = isLoaded;
            this.emitEvent("progress", [this, this.element, message]);
          };
          ImagesLoaded.makeJQueryPlugin = function(jQuery) {
            jQuery = jQuery || window2.jQuery;
            if (!jQuery) return;
            $ = jQuery;
            $.fn.imagesLoaded = function(options, onAlways) {
              let instance = new ImagesLoaded(this, options, onAlways);
              return instance.jqDeferred.promise($(this));
            };
          };
          ImagesLoaded.makeJQueryPlugin();
          return ImagesLoaded;
        }
      );
    }
  });

  // node_modules/splitting/dist/splitting.js
  var require_splitting = __commonJS({
    "node_modules/splitting/dist/splitting.js"(exports, module) {
      init_define_import_meta_env();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.Splitting = factory();
      })(exports, (function() {
        "use strict";
        var root = document;
        var createText = root.createTextNode.bind(root);
        function setProperty(el, varName, value) {
          el.style.setProperty(varName, value);
        }
        function appendChild(el, child) {
          return el.appendChild(child);
        }
        function createElement2(parent, key, text, whitespace) {
          var el = root.createElement("span");
          key && (el.className = key);
          if (text) {
            !whitespace && el.setAttribute("data-" + key, text);
            el.textContent = text;
          }
          return parent && appendChild(parent, el) || el;
        }
        function getData(el, key) {
          return el.getAttribute("data-" + key);
        }
        function $(e, parent) {
          return !e || e.length == 0 ? (
            // null or empty string returns empty array
            []
          ) : e.nodeName ? (
            // a single element is wrapped in an array
            [e]
          ) : (
            // selector and NodeList are converted to Element[]
            [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e))
          );
        }
        function Array2D(len) {
          var a = [];
          for (; len--; ) {
            a[len] = [];
          }
          return a;
        }
        function each(items, fn) {
          items && items.some(fn);
        }
        function selectFrom(obj) {
          return function(key) {
            return obj[key];
          };
        }
        function index(element, key, items) {
          var prefix = "--" + key;
          var cssVar = prefix + "-index";
          each(items, function(items2, i) {
            if (Array.isArray(items2)) {
              each(items2, function(item) {
                setProperty(item, cssVar, i);
              });
            } else {
              setProperty(items2, cssVar, i);
            }
          });
          setProperty(element, prefix + "-total", items.length);
        }
        var plugins = {};
        function resolvePlugins(by, parent, deps) {
          var index2 = deps.indexOf(by);
          if (index2 == -1) {
            deps.unshift(by);
            each(plugins[by].depends, function(p) {
              resolvePlugins(p, by, deps);
            });
          } else {
            var indexOfParent = deps.indexOf(parent);
            deps.splice(index2, 1);
            deps.splice(indexOfParent, 0, by);
          }
          return deps;
        }
        function createPlugin(by, depends, key, split2) {
          return {
            by,
            depends,
            key,
            split: split2
          };
        }
        function resolve(by) {
          return resolvePlugins(by, 0, []).map(selectFrom(plugins));
        }
        function add(opts) {
          plugins[opts.by] = opts;
        }
        function splitText(el, key, splitOn, includePrevious, preserveWhitespace) {
          el.normalize();
          var elements = [];
          var F = document.createDocumentFragment();
          if (includePrevious) {
            elements.push(el.previousSibling);
          }
          var allElements = [];
          $(el.childNodes).some(function(next3) {
            if (next3.tagName && !next3.hasChildNodes()) {
              allElements.push(next3);
              return;
            }
            if (next3.childNodes && next3.childNodes.length) {
              allElements.push(next3);
              elements.push.apply(elements, splitText(next3, key, splitOn, includePrevious, preserveWhitespace));
              return;
            }
            var wholeText = next3.wholeText || "";
            var contents = wholeText.trim();
            if (contents.length) {
              if (wholeText[0] === " ") {
                allElements.push(createText(" "));
              }
              each(contents.split(splitOn), function(splitText2, i) {
                if (i && preserveWhitespace) {
                  allElements.push(createElement2(F, "whitespace", " ", preserveWhitespace));
                }
                var splitEl = createElement2(F, key, splitText2);
                elements.push(splitEl);
                allElements.push(splitEl);
              });
              if (wholeText[wholeText.length - 1] === " ") {
                allElements.push(createText(" "));
              }
            }
          });
          each(allElements, function(el2) {
            appendChild(F, el2);
          });
          el.innerHTML = "";
          appendChild(el, F);
          return elements;
        }
        var _ = 0;
        function copy(dest, src) {
          for (var k in src) {
            dest[k] = src[k];
          }
          return dest;
        }
        var WORDS = "words";
        var wordPlugin = createPlugin(
          /*by: */
          WORDS,
          /*depends: */
          _,
          /*key: */
          "word",
          /*split: */
          function(el) {
            return splitText(el, "word", /\s+/, 0, 1);
          }
        );
        var CHARS = "chars";
        var charPlugin = createPlugin(
          /*by: */
          CHARS,
          /*depends: */
          [WORDS],
          /*key: */
          "char",
          /*split: */
          function(el, options, ctx) {
            var results = [];
            each(ctx[WORDS], function(word, i) {
              results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
            });
            return results;
          }
        );
        function Splitting2(opts) {
          opts = opts || {};
          var key = opts.key;
          return $(opts.target || "[data-splitting]").map(function(el) {
            var ctx = el["\u{1F34C}"];
            if (!opts.force && ctx) {
              return ctx;
            }
            ctx = el["\u{1F34C}"] = { el };
            var items = resolve(opts.by || getData(el, "splitting") || CHARS);
            var opts2 = copy({}, opts);
            each(items, function(plugin) {
              if (plugin.split) {
                var pluginBy = plugin.by;
                var key2 = (key ? "-" + key : "") + plugin.key;
                var results = plugin.split(el, opts2, ctx);
                key2 && index(el, key2, results);
                ctx[pluginBy] = results;
                el.classList.add(pluginBy);
              }
            });
            el.classList.add("splitting");
            return ctx;
          });
        }
        function html(opts) {
          opts = opts || {};
          var parent = opts.target = createElement2();
          parent.innerHTML = opts.content;
          Splitting2(opts);
          return parent.outerHTML;
        }
        Splitting2.html = html;
        Splitting2.add = add;
        function detectGrid(el, options, side) {
          var items = $(options.matching || el.children, el);
          var c = {};
          each(items, function(w) {
            var val = Math.round(w[side]);
            (c[val] || (c[val] = [])).push(w);
          });
          return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
        }
        function byNumber(a, b2) {
          return a - b2;
        }
        var linePlugin = createPlugin(
          /*by: */
          "lines",
          /*depends: */
          [WORDS],
          /*key: */
          "line",
          /*split: */
          function(el, options, ctx) {
            return detectGrid(el, { matching: ctx[WORDS] }, "offsetTop");
          }
        );
        var itemPlugin = createPlugin(
          /*by: */
          "items",
          /*depends: */
          _,
          /*key: */
          "item",
          /*split: */
          function(el, options) {
            return $(options.matching || el.children, el);
          }
        );
        var rowPlugin = createPlugin(
          /*by: */
          "rows",
          /*depends: */
          _,
          /*key: */
          "row",
          /*split: */
          function(el, options) {
            return detectGrid(el, options, "offsetTop");
          }
        );
        var columnPlugin = createPlugin(
          /*by: */
          "cols",
          /*depends: */
          _,
          /*key: */
          "col",
          /*split: */
          function(el, options) {
            return detectGrid(el, options, "offsetLeft");
          }
        );
        var gridPlugin = createPlugin(
          /*by: */
          "grid",
          /*depends: */
          ["rows", "cols"]
        );
        var LAYOUT = "layout";
        var layoutPlugin = createPlugin(
          /*by: */
          LAYOUT,
          /*depends: */
          _,
          /*key: */
          _,
          /*split: */
          function(el, opts) {
            var rows = opts.rows = +(opts.rows || getData(el, "rows") || 1);
            var columns = opts.columns = +(opts.columns || getData(el, "columns") || 1);
            opts.image = opts.image || getData(el, "image") || el.currentSrc || el.src;
            if (opts.image) {
              var img = $("img", el)[0];
              opts.image = img && (img.currentSrc || img.src);
            }
            if (opts.image) {
              setProperty(el, "background-image", "url(" + opts.image + ")");
            }
            var totalCells = rows * columns;
            var elements = [];
            var container = createElement2(_, "cell-grid");
            while (totalCells--) {
              var cell = createElement2(container, "cell");
              createElement2(cell, "cell-inner");
              elements.push(cell);
            }
            appendChild(el, container);
            return elements;
          }
        );
        var cellRowPlugin = createPlugin(
          /*by: */
          "cellRows",
          /*depends: */
          [LAYOUT],
          /*key: */
          "row",
          /*split: */
          function(el, opts, ctx) {
            var rowCount = opts.rows;
            var result = Array2D(rowCount);
            each(ctx[LAYOUT], function(cell, i, src) {
              result[Math.floor(i / (src.length / rowCount))].push(cell);
            });
            return result;
          }
        );
        var cellColumnPlugin = createPlugin(
          /*by: */
          "cellColumns",
          /*depends: */
          [LAYOUT],
          /*key: */
          "col",
          /*split: */
          function(el, opts, ctx) {
            var columnCount = opts.columns;
            var result = Array2D(columnCount);
            each(ctx[LAYOUT], function(cell, i) {
              result[i % columnCount].push(cell);
            });
            return result;
          }
        );
        var cellPlugin = createPlugin(
          /*by: */
          "cells",
          /*depends: */
          ["cellRows", "cellColumns"],
          /*key: */
          "cell",
          /*split: */
          function(el, opt, ctx) {
            return ctx[LAYOUT];
          }
        );
        add(wordPlugin);
        add(charPlugin);
        add(linePlugin);
        add(itemPlugin);
        add(rowPlugin);
        add(columnPlugin);
        add(gridPlugin);
        add(layoutPlugin);
        add(cellRowPlugin);
        add(cellColumnPlugin);
        add(cellPlugin);
        return Splitting2;
      }));
    }
  });

  // entry.mjs
  init_define_import_meta_env();

  // globals.mjs
  init_define_import_meta_env();

  // node_modules/gsap/index.js
  init_define_import_meta_env();

  // node_modules/gsap/gsap-core.js
  init_define_import_meta_env();
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  };
  var _defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
  };
  var _suppressOverwrites;
  var _reverting;
  var _context;
  var _bigNum = 1e8;
  var _tinyNum = 1 / _bigNum;
  var _2PI = Math.PI * 2;
  var _HALF_PI = _2PI / 4;
  var _gsID = 0;
  var _sqrt = Math.sqrt;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _isString = function _isString2(value) {
    return typeof value === "string";
  };
  var _isFunction = function _isFunction2(value) {
    return typeof value === "function";
  };
  var _isNumber = function _isNumber2(value) {
    return typeof value === "number";
  };
  var _isUndefined = function _isUndefined2(value) {
    return typeof value === "undefined";
  };
  var _isObject = function _isObject2(value) {
    return typeof value === "object";
  };
  var _isNotFalse = function _isNotFalse2(value) {
    return value !== false;
  };
  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };
  var _isFuncOrString = function _isFuncOrString2(value) {
    return _isFunction(value) || _isString(value);
  };
  var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
  };
  var _isArray = Array.isArray;
  var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
  var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
  var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
  var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
  var _relExp = /[+-]=-?[.\d]+/;
  var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
  var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
  var _globalTimeline;
  var _win;
  var _coreInitted;
  var _doc;
  var _globals = {};
  var _installScope = {};
  var _coreReady;
  var _install = function _install2(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  };
  var _missingPlugin = function _missingPlugin2(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  };
  var _warn = function _warn2(message, suppress) {
    return !suppress && console.warn(message);
  };
  var _addGlobal = function _addGlobal2(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  };
  var _emptyFunc = function _emptyFunc2() {
    return 0;
  };
  var _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  };
  var _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  };
  var _revertConfig = {
    suppressEvents: true
  };
  var _reservedProps = {};
  var _lazyTweens = [];
  var _lazyLookup = {};
  var _lastRenderedFrame;
  var _plugins = {};
  var _effects = {};
  var _nextGCFrame = 30;
  var _harnessPlugins = [];
  var _callbackNames = "";
  var _harness = function _harness2(targets) {
    var target = targets[0], harnessPlugin, i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {
      }
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  };
  var _getCache = function _getCache2(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  };
  var _getProperty = function _getProperty2(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  };
  var _forEachName = function _forEachName2(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  };
  var _round = function _round2(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _roundPrecise = function _roundPrecise2(value) {
    return Math.round(value * 1e7) / 1e7 || 0;
  };
  var _parseRelative = function _parseRelative2(start, value) {
    var operator = value.charAt(0), end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  };
  var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
    var l = toFind.length, i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
    }
    return i < l;
  };
  var _lazyRender = function _lazyRender2() {
    var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  };
  var _isRevertWorthy = function _isRevertWorthy2(animation) {
    return !!(animation._initted || animation._startAt || animation.add);
  };
  var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
    _lazyTweens.length && !_reverting && _lazyRender();
    animation.render(time, suppressEvents, force || !!(_reverting && time < 0 && _isRevertWorthy(animation)));
    _lazyTweens.length && !_reverting && _lazyRender();
  };
  var _numericIfPossible = function _numericIfPossible2(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  };
  var _passThrough = function _passThrough2(p) {
    return p;
  };
  var _setDefaults = function _setDefaults2(obj, defaults3) {
    for (var p in defaults3) {
      p in obj || (obj[p] = defaults3[p]);
    }
    return obj;
  };
  var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
    return function(obj, defaults3) {
      for (var p in defaults3) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults3[p]);
      }
    };
  };
  var _merge = function _merge2(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  };
  var _mergeDeep = function _mergeDeep2(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  };
  var _copyExcluding = function _copyExcluding2(obj, excluding) {
    var copy = {}, p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  };
  var _inheritDefaults = function _inheritDefaults2(vars) {
    var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  };
  var _arraysMatch = function _arraysMatch2(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {
    }
    return i < 0;
  };
  var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp], t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  };
  var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev, next3 = child._next;
    if (prev) {
      prev._next = next3;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next3;
    }
    if (next3) {
      next3._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null;
  };
  var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
    child._act = 0;
  };
  var _uncache = function _uncache2(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  };
  var _recacheAncestors = function _recacheAncestors2(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  };
  var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  };
  var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
  };
  var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  };
  var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
    var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
    return tTime && whole === tTime ? whole - 1 : whole;
  };
  var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  };
  var _setEnd = function _setEnd2(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  };
  var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation);
    }
    return animation;
  };
  var _postAddChecks = function _postAddChecks2(timeline2, child) {
    var t;
    if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
      t = _parentToChildTotalTime(timeline2.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }
    if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
      if (timeline2._dur < timeline2.duration()) {
        t = timeline2;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }
      timeline2._zTime = -_tinyNum;
    }
  };
  var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline2._recent = child);
    skipChecks || _postAddChecks(timeline2, child);
    timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
    return timeline2;
  };
  var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  };
  var _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
    _initTween(tween, time, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  };
  var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
  };
  var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  };
  var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  };
  var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  };
  var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  };
  var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  };
  var _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  };
  var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  };
  var _createTweenType = function _createTweenType2(type, params, timeline2) {
    var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline2;
    if (type) {
      irVars = vars;
      parent = timeline2;
      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }
    return new Tween(params[0], vars, params[varsIndex + 1]);
  };
  var _conditionalReturn = function _conditionalReturn2(value, func) {
    return value || value === 0 ? func(value) : func;
  };
  var _clamp = function _clamp2(min, max, value) {
    return value < min ? min : value > max ? max : value;
  };
  var getUnit = function getUnit2(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  };
  var clamp = function clamp2(min, max, value) {
    return _conditionalReturn(value, function(v) {
      return _clamp(min, max, v);
    });
  };
  var _slice = [].slice;
  var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  };
  var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function(value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  };
  var toArray = function toArray2(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  };
  var selector = function selector2(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function(v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  };
  var shuffle = function shuffle2(a) {
    return a.sort(function() {
      return 0.5 - Math.random();
    });
  };
  var distribute = function distribute2(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
      each: v
    }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache2 = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: 0.5,
        edges: 0.5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache2[l], originX, originY, x, y, d, j, max, min, wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
          }
          wrapAt < l && wrapAt--;
        }
        distances = cache2[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  };
  var _roundModifier = function _roundModifier2(v) {
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
    return function(raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  };
  var snap = function snap2(snapTo, value) {
    var isArray2 = _isArray(snapTo), radius, is2D;
    if (!isArray2 && _isObject(snapTo)) {
      radius = isArray2 = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray2 ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
      var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length, dx, dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  };
  var random = function random2(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  };
  var pipe = function pipe2() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(value) {
      return functions.reduce(function(v, f) {
        return f(v);
      }, value);
    };
  };
  var unitize = function unitize2(func, unit) {
    return function(value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  };
  var normalize = function normalize2(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  };
  var _wrapArray = function _wrapArray2(a, wrapper, value) {
    return _conditionalReturn(value, function(index) {
      return a[~~wrapper(index)];
    });
  };
  var wrap = function wrap2(min, max, value) {
    var range2 = max - min;
    return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
      return (range2 + (value2 - min) % range2) % range2 + min;
    });
  };
  var wrapYoyo = function wrapYoyo2(min, max, value) {
    var range2 = max - min, total = range2 * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
      value2 = (total + (value2 - min) % total) % total || 0;
      return min + (value2 > range2 ? total - value2 : value2);
    });
  };
  var _replaceRandom = function _replaceRandom2(value) {
    var prev = 0, s = "", i, nums, end, isArray2;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray2 = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray2 ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray2 ? nums : +nums[0], isArray2 ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  };
  var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return _conditionalReturn(value, function(value2) {
      return outMin + ((value2 - inMin) / inRange * outRange || 0);
    });
  };
  var interpolate = function interpolate2(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p2) {
      return (1 - p2) * start + p2 * end;
    };
    if (!func) {
      var isString2 = _isString(start), master = {}, p, i, interpolators, l, il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString2) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate2(start[i - 1], start[i]));
        }
        l--;
        func = function func2(p2) {
          p2 *= l;
          var i2 = Math.min(il, ~~p2);
          return interpolators[i2](p2 - i2);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func2(p2) {
          return _renderPropTweens(p2, master) || (isString2 ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  };
  var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
    var labels = timeline2.labels, min = _bigNum, p, distance, label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  };
  var _callback = function _callback2(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], prevContext = _context, context3 = animation._ctx, params, scope, result;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    context3 && (_context = context3);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    _context = prevContext;
    return result;
  };
  var _interrupt = function _interrupt2(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  };
  var _quickTween;
  var _registerPluginQueue = [];
  var _createPlugin = function _createPlugin2(config3) {
    if (!config3) return;
    config3 = !config3.name && config3["default"] || config3;
    if (_windowExists() || config3.headless) {
      var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
        this._props = [];
      } : config3, instanceDefaults = {
        init: _emptyFunc,
        render: _renderPropTweens,
        add: _addPropTween,
        kill: _killPropTweensOf,
        modifier: _addPluginModifier,
        rawVars: 0
      }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: _getSetter,
        aliases: {},
        register: 0
      };
      _wake();
      if (config3 !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
        _plugins[Plugin.prop = name] = Plugin;
        if (config3.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
      }
      _addGlobal(name, Plugin);
      config3.register && config3.register(gsap, Plugin, PropTween);
    } else {
      _registerPluginQueue.push(config3);
    }
  };
  var _255 = 255;
  var _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  };
  var _hue = function _hue2(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
  };
  var splitColor = function splitColor2(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b2, h, s, l, max, min, d, wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b2 = v.charAt(3);
          v = "#" + r + r + g + g + b2 + b2 + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b2 = a[2] / _255;
      max = Math.max(r, g, b2);
      min = Math.min(r, g, b2);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b2) / d + (g < b2 ? 6 : 0) : max === g ? (b2 - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + 0.5);
      a[1] = ~~(s * 100 + 0.5);
      a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  };
  var _colorOrderData = function _colorOrderData2(v) {
    var values2 = [], c = [], i = -1;
    v.split(_colorExp).forEach(function(v2) {
      var a = v2.match(_numWithUnitExp) || [];
      values2.push.apply(values2, a);
      c.push(i += a.length + 1);
    });
    values2.c = c;
    return values2;
  };
  var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function(color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  };
  var _colorExp = (function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  })();
  var _hslExp = /hsl[a]?\(/;
  var _colorStringFilter = function _colorStringFilter2(a) {
    var combined = a.join(" "), toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  };
  var _tickerActive;
  var _ticker = (function() {
    var _getTime3 = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime3(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners3 = [], _id2, _req, _raf, _self, _delta, _i2, _tick = function _tick2(v) {
      var elapsed = _getTime3() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
      (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;
      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1e3;
        _self.time = time = time / 1e3;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }
      manual || (_id2 = _req(_tick2));
      if (dispatch) {
        for (_i2 = 0; _i2 < _listeners3.length; _i2++) {
          _listeners3[_i2](time, _delta, frame, v);
        }
      }
    };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1e3 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _registerPluginQueue.forEach(_createPlugin);
          }
          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
          _id2 && _self.sleep();
          _req = _raf || function(f) {
            return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? cancelAnimationFrame : clearTimeout)(_id2);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || Infinity;
        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
      },
      fps: function fps(_fps) {
        _gap = 1e3 / (_fps || 240);
        _nextTime = _self.time * 1e3 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function(t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners3[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove2(callback, i) {
        ~(i = _listeners3.indexOf(callback)) && _listeners3.splice(i, 1) && _i2 >= i && _i2--;
      },
      _listeners: _listeners3
    };
    return _self;
  })();
  var _wake = function _wake2() {
    return !_tickerActive && _ticker.wake();
  };
  var _easeMap = {};
  var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
  var _quotesExp = /["']/g;
  var _parseObjectInString = function _parseObjectInString2(value) {
    var obj = {}, split2 = value.substr(1, value.length - 3).split(":"), key = split2[0], i = 1, l = split2.length, index, val, parsedVal;
    for (; i < l; i++) {
      val = split2[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  };
  var _valueInParentheses = function _valueInParentheses2(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  };
  var _configEaseFromString = function _configEaseFromString2(name) {
    var split2 = (name + "").split("("), ease = _easeMap[split2[0]];
    return ease && split2.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split2[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  };
  var _invertEase = function _invertEase2(ease) {
    return function(p) {
      return 1 - ease(1 - p);
    };
  };
  var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
    var child = timeline2._first, ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase2(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase2(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  };
  var _parseEase = function _parseEase2(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  };
  var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut2(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut2(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
      easeIn,
      easeOut,
      easeInOut
    }, lowercaseName;
    _forEachName(names, function(name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  };
  var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
    return function(p) {
      return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
  };
  var _configElastic = function _configElastic2(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2;
    ease.config = function(amplitude2, period2) {
      return _configElastic2(type, amplitude2, period2);
    };
    return ease;
  };
  var _configBack = function _configBack2(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut2(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    ease.config = function(overshoot2) {
      return _configBack2(type, overshoot2);
    };
    return ease;
  };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function(p) {
      return Math.pow(p, power);
    } : function(p) {
      return p;
    }, function(p) {
      return 1 - Math.pow(1 - p, power);
    }, function(p) {
      return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    _insertEase("Bounce", function(p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function(p) {
    return Math.pow(2, 10 * (p - 1)) * p + p * p * p * p * p * p * (1 - p);
  });
  _insertEase("Circ", function(p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function(p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
      return function(p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache2(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = /* @__PURE__ */ (function() {
    function Animation2(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      if (_context) {
        this._ctx = _context;
        _context.data.push(this);
      }
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation2.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value, suppressEvents) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      this.totalTime(_clamp(-Math.abs(this._delay), this.totalDuration(), tTime), suppressEvents !== false);
      _setEnd(this);
      return _recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config3) {
      if (config3 === void 0) {
        config3 = _revertConfig;
      }
      var prevIsReverting = _reverting;
      _reverting = config3;
      if (_isRevertWorthy(this)) {
        this.timeline && this.timeline.revert(config3);
        this.totalTime(-0.01, config3.suppressEvents);
      }
      this.data !== "nested" && config3.kill !== false && this.kill();
      _reverting = prevIsReverting;
      return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this, time = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time = animation._start + time / (Math.abs(animation._ts) || 1);
        animation = animation._dp;
      }
      return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time ? this.time(time) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
      this._dur || (this._zTime = -_tinyNum);
      return this;
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp, start = this._start, rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function(resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
          var _then = self.then;
          self.then = null;
          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };
        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill() {
      _interrupt(this);
    };
    return Animation2;
  })();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = /* @__PURE__ */ (function(_Animation) {
    _inheritsLoose(Timeline2, _Animation);
    function Timeline2(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline2.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set2(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render4(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next3, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -1e-4;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && tTime && !suppressEvents && !prevIteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next3 = child._next;
            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next3 && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next3;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;
          while (child) {
            next3 = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && _isRevertWorthy(child));
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next3 && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next3;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
          if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
            if (!this._lock) {
              (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
              if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
              }
            }
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function(obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [], child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById2(id) {
      var animations = this.getChildren(1, 1, 1), i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove2(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      child.parent === this && _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
      var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first, labels = this.labels, p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate(soft);
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear2(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first, next3;
      while (child) {
        next3 = child._next;
        this.remove(child);
        child = next3;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max = 0, self = this, child = self._last, prevStart = _bigNum, prev, start, parent;
      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }
      if (self._dirty) {
        parent = self.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self._sort && child._ts && !self._lock) {
            self._lock = 1;
            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max -= start;
            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }
            self.shiftChildren(-start, false, -Infinity);
            prevStart = 0;
          }
          child._end > max && child._ts && (max = child._end);
          child = prev;
        }
        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
        self._dirty = 0;
      }
      return self._tDur;
    };
    Timeline2.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) {
          if (_config.autoSleep && _ticker._listeners.length < 2) {
            while (child && !child._ts) {
              child = child._next;
            }
            child || _ticker.sleep();
          }
        }
      }
    };
    return Timeline2;
  })(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }
    this._pt = pt;
    return pt;
  };
  var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  };
  var _processVars = function _processVars2(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {}, p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  };
  var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  };
  var _overwritingTween;
  var _forceAllPropTweens;
  var _initTween = function _initTween2(tween, time, tTime) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards;
    if (!tl || keyframes && !vars.stagger) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1);
        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent,
          immediateRender: true,
          lazy: !prevStartAt && _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate && function() {
            return _callback(tween, "onUpdate");
          },
          stagger: 0
        }, startAt)));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
        if (immediateRender) {
          if (dur && time <= 0 && tTime <= 0) {
            time && (tween._zTime = time);
            return;
          }
        }
      } else if (runBackwards && dur) {
        if (!prevStartAt) {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
            immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent
            //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);
          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0;
          tween._startAt._sat = tween;
          time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time;
          if (!immediateRender) {
            _initTween2(tween._startAt, _tinyNum, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function(name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
    keyframes && time <= 0 && tl.render(_bigNum, true, true);
  };
  var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            pt = pt._next;
          }
        }
        if (!pt) {
          _forceAllPropTweens = 1;
          tween.vars[property] = "+=0";
          _initTween(tween, time);
          _forceAllPropTweens = 0;
          return skipRecursion ? _warn(property + " not eligible for reset") : 1;
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT;
      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
    }
  };
  var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  };
  var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut", p, a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []);
      obj.forEach(function(value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  };
  var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  };
  var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
  var _staggerPropsToSkip = {};
  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
    return _staggerPropsToSkip[name] = 1;
  });
  var Tween = /* @__PURE__ */ (function(_Animation2) {
    _inheritsLoose(Tween2, _Animation2);
    function Tween2(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults3 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults3 || {},
          targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;
        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl._ease = _easeMap.none;
          }
          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));
          tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time = 0, a, kf, v;
          if (_isArray(keyframes)) {
            keyframes.forEach(function(frame) {
              return tl.to(parsedTargets, frame, ">");
            });
            tl.duration();
          } else {
            copy = {};
            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }
            for (p in copy) {
              a = copy[p].sort(function(a2, b2) {
                return a2.t - b2.t;
              });
              time = 0;
              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl.to(parsedTargets, v, time);
                time += v.duration;
              }
            }
            tl.duration() < duration && tl.to({}, {
              duration: duration - tl.duration()
            });
          }
        }
        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay) || 0);
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween2.prototype;
    _proto3.render = function render4(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
        time = tTime;
        timeline2 = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && isNegative) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time = dur;
              iteration--;
            } else if (time > dur) {
              time = dur;
            }
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time === prevTime && !force && this._initted && iteration === prevIteration) {
            this._tTime = tTime;
            return this;
          }
          if (iteration !== prevIteration) {
            timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
            this._tTime = 0;
            return this;
          }
          if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (!prevTime && tTime && !suppressEvents && !prevIteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
      (!soft || !this.vars.runBackwards) && (this._startAt = 0);
      this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate(soft);
      return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
      this._initted || _initTween(this, time);
      ratio = this._ease(time / this._dur);
      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
        return this.resetTo(property, value, start, startIsRelative, 1);
      }
      _alignPlayhead(this, 0);
      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };
    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting);
        return this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function(name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween2.to = function to(targets, vars) {
      return new Tween2(targets, vars, arguments[2]);
    };
    Tween2.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween2(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };
    Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween2.set = function set2(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween2(targets, vars);
    };
    Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween2;
  })(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
    Tween[name] = function() {
      var tl = new Timeline(), params = _slice.call(arguments, 0);
      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  var _setterPlain = function _setterPlain2(target, property, value) {
    return target[property] = value;
  };
  var _setterFunc = function _setterFunc2(target, property, value) {
    return target[property](value);
  };
  var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
    return target[property](data.fp, value);
  };
  var _setterAttribute = function _setterAttribute2(target, property, value) {
    return target.setAttribute(property, value);
  };
  var _getSetter = function _getSetter2(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  };
  var _renderPlain = function _renderPlain2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
  };
  var _renderBoolean = function _renderBoolean2(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  };
  var _renderComplexString = function _renderComplexString2(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
        pt = pt._next;
      }
      s += data.c;
    }
    data.set(data.t, data.p, s, data);
  };
  var _renderPropTweens = function _renderPropTweens2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  };
  var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
    var pt = this._pt, next3;
    while (pt) {
      next3 = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next3;
    }
  };
  var _killPropTweensOf = function _killPropTweensOf2(property) {
    var pt = this._pt, hasNonDependentRemaining, next3;
    while (pt) {
      next3 = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next3;
    }
    return !hasNonDependentRemaining;
  };
  var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  };
  var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
    var pt = parent._pt, next3, pt2, first, last;
    while (pt) {
      next3 = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next3;
    }
    parent._pt = first;
  };
  var PropTween = /* @__PURE__ */ (function() {
    function PropTween3(next3, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next3;
      if (next3) {
        next3._prev = this;
      }
    }
    var _proto4 = PropTween3.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween3;
  })();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _media = [];
  var _listeners = {};
  var _emptyArray = [];
  var _lastMediaTime = 0;
  var _contextID = 0;
  var _dispatch = function _dispatch2(type) {
    return (_listeners[type] || _emptyArray).map(function(f) {
      return f();
    });
  };
  var _onMediaChange = function _onMediaChange2() {
    var time = Date.now(), matches = [];
    if (time - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function(c) {
        var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches;
          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches.forEach(function(c) {
        return c.onMatch(c, function(func) {
          return c.add(null, func);
        });
      });
      _lastMediaTime = time;
      _dispatch("matchMedia");
    }
  };
  var Context = /* @__PURE__ */ (function() {
    function Context2(func, scope) {
      this.selector = scope && selector(scope);
      this.data = [];
      this._r = [];
      this.isReverted = false;
      this.id = _contextID++;
      func && this.add(func);
    }
    var _proto5 = Context2.prototype;
    _proto5.add = function add(name, func, scope) {
      if (_isFunction(name)) {
        scope = func;
        func = name;
        name = _isFunction;
      }
      var self = this, f = function f2() {
        var prev = _context, prevSelector = self.selector, result;
        prev && prev !== self && prev.data.push(self);
        scope && (self.selector = selector(scope));
        _context = self;
        result = func.apply(self, arguments);
        _isFunction(result) && self._r.push(result);
        _context = prev;
        self.selector = prevSelector;
        self.isReverted = false;
        return result;
      };
      self.last = f;
      return name === _isFunction ? f(self, function(func2) {
        return self.add(null, func2);
      }) : name ? self[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
      var prev = _context;
      _context = null;
      func(this);
      _context = prev;
    };
    _proto5.getTweens = function getTweens() {
      var a = [];
      this.data.forEach(function(e) {
        return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
      });
      return a;
    };
    _proto5.clear = function clear2() {
      this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill(revert, matchMedia2) {
      var _this4 = this;
      if (revert) {
        (function() {
          var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
          while (i2--) {
            t = _this4.data[i2];
            if (t.data === "isFlip") {
              t.revert();
              t.getChildren(true, true, false).forEach(function(tween) {
                return tweens.splice(tweens.indexOf(tween), 1);
              });
            }
          }
          tweens.map(function(t2) {
            return {
              g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
              t: t2
            };
          }).sort(function(a, b2) {
            return b2.g - a.g || -Infinity;
          }).forEach(function(o) {
            return o.t.revert(revert);
          });
          i2 = _this4.data.length;
          while (i2--) {
            t = _this4.data[i2];
            if (t instanceof Timeline) {
              if (t.data !== "nested") {
                t.scrollTrigger && t.scrollTrigger.revert();
                t.kill();
              }
            } else {
              !(t instanceof Tween) && t.revert && t.revert(revert);
            }
          }
          _this4._r.forEach(function(f) {
            return f(revert, _this4);
          });
          _this4.isReverted = true;
        })();
      } else {
        this.data.forEach(function(e) {
          return e.kill && e.kill();
        });
      }
      this.clear();
      if (matchMedia2) {
        var i = _media.length;
        while (i--) {
          _media[i].id === this.id && _media.splice(i, 1);
        }
      }
    };
    _proto5.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    return Context2;
  })();
  var MatchMedia = /* @__PURE__ */ (function() {
    function MatchMedia2(scope) {
      this.contexts = [];
      this.scope = scope;
      _context && _context.data.push(this);
    }
    var _proto6 = MatchMedia2.prototype;
    _proto6.add = function add(conditions, func, scope) {
      _isObject(conditions) || (conditions = {
        matches: conditions
      });
      var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
      _context && !context3.selector && (context3.selector = _context.selector);
      this.contexts.push(context3);
      func = context3.add("onMatch", func);
      context3.queries = conditions;
      for (p in conditions) {
        if (p === "all") {
          active = 1;
        } else {
          mq = _win.matchMedia(conditions[p]);
          if (mq) {
            _media.indexOf(context3) < 0 && _media.push(context3);
            (cond[p] = mq.matches) && (active = 1);
            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }
        }
      }
      active && func(context3, function(f) {
        return context3.add(null, f);
      });
      return this;
    };
    _proto6.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    _proto6.kill = function kill(revert) {
      this.contexts.forEach(function(c) {
        return c.kill(revert, true);
      });
    };
    return MatchMedia2;
  })();
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function(config3) {
        return _createPlugin(config3);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);
      var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function(property2, unit2, uncache2) {
        return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);
      if (target.length > 1) {
        var setters = target.map(function(t) {
          return gsap.quickSetter(t, property, unit);
        }), l = setters.length;
        return function(value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property], cache2 = _getCache(target), p = cache2.harness && (cache2.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
        var p2 = new Plugin();
        _quickTween._pt = 0;
        p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p2.render(1, p2);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache2.set(target, p);
      return Plugin ? setter : function(value) {
        return setter(target, p, unit ? value + unit : value, cache2, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _setDefaults22;
      var tween = gsap.to(target, _setDefaults((_setDefaults22 = {}, _setDefaults22[property] = "+=0.1", _setDefaults22.paused = true, _setDefaults22.stagger = 0, _setDefaults22), vars || {})), func = function func2(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config2(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults3 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function(pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function(targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults3), tl);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function(targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl = new Timeline(vars), child, next3;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl);
      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next3 = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }
        child = next3;
      }
      _addToTimeline(_globalTimeline, tl, 0);
      return tl;
    },
    context: function context(func, scope) {
      return func ? new Context(func, scope) : _context;
    },
    matchMedia: function matchMedia(scope) {
      return new MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return _media.forEach(function(c) {
        var cond = c.conditions, found, p;
        for (p in cond) {
          if (cond[p]) {
            cond[p] = false;
            found = 1;
          }
        }
        found && c.revert();
      }) || _onMediaChange();
    },
    addEventListener: function addEventListener(type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
      var a = _listeners[type], i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    },
    utils: {
      wrap,
      wrapYoyo,
      distribute,
      random,
      snap,
      normalize,
      getUnit,
      clamp,
      splitColor,
      toArray,
      selector,
      mapRange,
      pipe,
      unitize,
      interpolate,
      shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween,
      globals: _addGlobal,
      Tween,
      Timeline,
      Animation,
      getCache: _getCache,
      _removeLinkedListItem,
      reverting: function reverting() {
        return _reverting;
      },
      context: function context2(toAdd) {
        if (toAdd && _context) {
          _context.data.push(toAdd);
          toAdd._ctx = _context;
        }
        return _context;
      },
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  };
  var _addModifiers = function _addModifiers2(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  };
  var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
    return {
      name,
      headless: 1,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init6(target, vars, tween) {
        tween._onInit = function(tween2) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function(name2) {
              return temp[name2] = 1;
            });
            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween2, vars);
        };
      }
    };
  };
  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt, v;
      this.tween = tween;
      for (p in vars) {
        v = target.getAttribute(p) || "";
        pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
        pt.op = p;
        pt.b = v;
        this._props.push(p);
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt;
      while (pt) {
        _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
        pt = pt._next;
      }
    }
  }, {
    name: "endArray",
    headless: 1,
    init: function init2(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.13.0";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0;
  var Power1 = _easeMap.Power1;
  var Power2 = _easeMap.Power2;
  var Power3 = _easeMap.Power3;
  var Power4 = _easeMap.Power4;
  var Linear = _easeMap.Linear;
  var Quad = _easeMap.Quad;
  var Cubic = _easeMap.Cubic;
  var Quart = _easeMap.Quart;
  var Quint = _easeMap.Quint;
  var Strong = _easeMap.Strong;
  var Elastic = _easeMap.Elastic;
  var Back = _easeMap.Back;
  var SteppedEase = _easeMap.SteppedEase;
  var Bounce = _easeMap.Bounce;
  var Sine = _easeMap.Sine;
  var Expo = _easeMap.Expo;
  var Circ = _easeMap.Circ;

  // node_modules/gsap/CSSPlugin.js
  init_define_import_meta_env();
  var _win2;
  var _doc2;
  var _docElement;
  var _pluginInitted;
  var _tempDiv;
  var _tempDivStyler;
  var _recentSetterPlugin;
  var _reverting2;
  var _windowExists3 = function _windowExists4() {
    return typeof window !== "undefined";
  };
  var _transformProps = {};
  var _RAD2DEG = 180 / Math.PI;
  var _DEG2RAD = Math.PI / 180;
  var _atan2 = Math.atan2;
  var _bigNum2 = 1e8;
  var _capsExp = /([A-Z])/g;
  var _horizontalExp = /(left|right|width|margin|padding|x)/i;
  var _complexExp = /[\s,\(]\S/;
  var _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  };
  var _renderCSSProp = function _renderCSSProp2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
  };
  var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
  };
  var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  };
  var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  };
  var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
    return target.style[property] = value;
  };
  var _setterCSSProp = function _setterCSSProp2(target, property, value) {
    return target.style.setProperty(property, value);
  };
  var _setterTransform = function _setterTransform2(target, property, value) {
    return target._gsap[property] = value;
  };
  var _setterScale = function _setterScale2(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  };
  var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
    var cache2 = target._gsap;
    cache2.scaleX = cache2.scaleY = value;
    cache2.renderTransform(ratio, cache2);
  };
  var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
    var cache2 = target._gsap;
    cache2[property] = value;
    cache2.renderTransform(ratio, cache2);
  };
  var _transformProp = "transform";
  var _transformOriginProp = _transformProp + "Origin";
  var _saveStyle = function _saveStyle2(property, isNotCSS) {
    var _this = this;
    var target = this.target, style = target.style, cache2 = target._gsap;
    if (property in _transformProps && style) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function(a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = cache2.x ? cache2[property] : _get(target, property);
        property === _transformOriginProp && (this.tfm.zOrigin = cache2.zOrigin);
      } else {
        return _propertyAliases.transform.split(",").forEach(function(p) {
          return _saveStyle2.call(_this, p, isNotCSS);
        });
      }
      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (cache2.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  };
  var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _revertStyle = function _revertStyle2() {
    var props = this.props, target = this.target, style = target.style, cache2 = target._gsap, i, p;
    for (i = 0; i < props.length; i += 3) {
      if (!props[i + 1]) {
        props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
      } else if (props[i + 1] === 2) {
        target[props[i]](props[i + 2]);
      } else {
        target[props[i]] = props[i + 2];
      }
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache2[p] = this.tfm[p];
      }
      if (cache2.svg) {
        cache2.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = _reverting2();
      if ((!i || !i.isStart) && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        if (cache2.zOrigin && style[_transformOriginProp]) {
          style[_transformOriginProp] += " " + cache2.zOrigin + "px";
          cache2.zOrigin = 0;
          cache2.renderTransform();
        }
        cache2.uncache = 1;
      }
    }
  };
  var _getStyleSaver = function _getStyleSaver2(target, properties) {
    var saver = {
      target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    target._gsap || gsap.core.getCache(target);
    properties && target.style && target.nodeType && properties.split(",").forEach(function(p) {
      return saver.save(p);
    });
    return saver;
  };
  var _supports3D;
  var _createElement = function _createElement2(type, ns) {
    var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
    return e && e.style ? e : _doc2.createElement(type);
  };
  var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
  };
  var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
  var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
    var e = element || _tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {
    }
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  };
  var _initCore = function _initCore2() {
    if (_windowExists3() && window.document) {
      _win2 = window;
      _doc2 = _win2.document;
      _docElement = _doc2.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _reverting2 = gsap.core.reverting;
      _pluginInitted = 1;
    }
  };
  var _getReparentedCloneBBox = function _getReparentedCloneBBox2(target) {
    var owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone = target.cloneNode(true), bbox;
    clone.style.display = "block";
    svg.appendChild(clone);
    _docElement.appendChild(svg);
    try {
      bbox = clone.getBBox();
    } catch (e) {
    }
    svg.removeChild(clone);
    _docElement.removeChild(svg);
    return bbox;
  };
  var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  };
  var _getBBox = function _getBBox2(target) {
    var bounds, cloned;
    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getReparentedCloneBBox(target);
      cloned = 1;
    }
    bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  };
  var _isSVG = function _isSVG2(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  };
  var _removeProperty = function _removeProperty2(target, property) {
    if (property) {
      var style = target.style, first2Chars;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        first2Chars = property.substr(0, 2);
        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }
        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  };
  var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  };
  var _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  };
  var _nonStandardLayouts = {
    grid: 1,
    flex: 1
  };
  var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache2, isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc2 || !parent.appendChild) {
      parent = _doc2.body;
    }
    cache2 = parent._gsap;
    if (cache2 && toPercent && cache2.width && horizontal && cache2.time === _ticker.time && !cache2.uncache) {
      return _round(curValue / cache2.width * amount);
    } else {
      if (toPercent && (property === "height" || property === "width")) {
        var v = target.style[property];
        target.style[property] = amount + unit;
        px = target[measureProperty];
        v ? target.style[property] = v : _removeProperty(target, property);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static");
        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
      }
      if (horizontal && toPercent) {
        cache2 = _getCache(parent);
        cache2.time = _ticker.time;
        cache2.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  };
  var _get = function _get2(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  };
  var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }
    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (end.substring(0, 6) === "var(--") {
      end = _getComputedProperty(target, end.substring(4, end.indexOf(")")));
    }
    if (end === "auto") {
      startValue = target.style[prop];
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
    }
    a = [start, end];
    _colorStringFilter(a);
    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  };
  var _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  };
  var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
    var split2 = value.split(" "), x = split2[0], y = split2[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }
    split2[0] = _keywordToPercent[x] || x;
    split2[1] = _keywordToPercent[y] || y;
    return split2.join(" ");
  };
  var _renderClearProps = function _renderClearProps2(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t, style = target.style, props = data.u, cache2 = target._gsap, prop, clearTransforms, i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache2) {
          cache2.svg && target.removeAttribute("transform");
          style.scale = style.rotate = style.translate = "none";
          _parseTransform(target, 1);
          cache2.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  };
  var _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */
  };
  var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
  var _rotationalProperties = {};
  var _isNullTransform = function _isNullTransform2(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  };
  var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  };
  var _getMatrix = function _getMatrix2(target, force2D) {
    var cache2 = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache2.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache2.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
        addedToDOM = 1;
        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target);
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  };
  var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache2 = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache2.xOrigin || 0, yOriginOld = cache2.yOrigin || 0, xOffsetOld = cache2.xOffset || 0, yOffsetOld = cache2.yOffset || 0, a = matrix[0], b2 = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b2 * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b2 / determinant) + yOrigin * (a / determinant) - (a * ty - b2 * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache2.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache2.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache2.yOffset = yOffsetOld + (tx * b2 + ty * d) - ty;
    } else {
      cache2.xOffset = cache2.yOffset = 0;
    }
    cache2.xOrigin = xOrigin;
    cache2.yOrigin = yOrigin;
    cache2.smooth = !!smooth;
    cache2.origin = origin;
    cache2.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";
    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "xOffset", xOffsetOld, cache2.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "yOffset", yOffsetOld, cache2.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  };
  var _parseTransform = function _parseTransform2(target, uncache) {
    var cache2 = target._gsap || new GSCache(target);
    if ("x" in cache2 && !uncache && !cache2.uncache) {
      return cache2;
    }
    var style = target.style, invertedScaleX = cache2.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b2, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache2.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache2.svg);
    if (cache2.svg) {
      if (cache2.uncache) {
        t2 = target.getBBox();
        origin = cache2.xOrigin - t2.x + "px " + (cache2.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin");
      }
      _applySVGOrigin(target, t1 || origin, !!t1 || cache2.originIsAbsolute, cache2.smooth !== false, matrix);
    }
    xOrigin = cache2.xOrigin || 0;
    yOrigin = cache2.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b2 = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];
      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b2 * b2);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b2 ? _atan2(b2, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache2.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b2 + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b2 * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b2 = t2;
          c = t3;
        }
        angle = _atan2(b2, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b2 * sin;
          t2 = a12 * cos + a22 * sin;
          b2 = b2 * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b2 * b2 + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache2.svg) {
        t1 = target.getAttribute("transform");
        cache2.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache2.uncache;
    cache2.x = x - ((cache2.xPercent = x && (!uncache && cache2.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache2.xPercent / 100 : 0) + px;
    cache2.y = y - ((cache2.yPercent = y && (!uncache && cache2.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache2.yPercent / 100 : 0) + px;
    cache2.z = z + px;
    cache2.scaleX = _round(scaleX);
    cache2.scaleY = _round(scaleY);
    cache2.rotation = _round(rotation) + deg;
    cache2.rotationX = _round(rotationX) + deg;
    cache2.rotationY = _round(rotationY) + deg;
    cache2.skewX = skewX + deg;
    cache2.skewY = skewY + deg;
    cache2.transformPerspective = perspective + px;
    if (cache2.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache2.zOrigin || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache2.xOffset = cache2.yOffset = 0;
    cache2.force3D = _config.force3D;
    cache2.renderTransform = cache2.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache2.uncache = 0;
    return cache2;
  };
  var _firstTwoOnly = function _firstTwoOnly2(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  };
  var _addPxTranslate = function _addPxTranslate2(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  };
  var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache2) {
    cache2.z = "0px";
    cache2.rotationY = cache2.rotationX = "0deg";
    cache2.force3D = 0;
    _renderCSSTransforms(ratio, cache2);
  };
  var _zeroDeg = "0deg";
  var _zeroPx = "0px";
  var _endParenthesis = ") ";
  var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache2) {
    var _ref = cache2 || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  };
  var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache2) {
    var _ref2 = cache2 || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp);
  };
  var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
    var cap = 360, isString2 = _isString(endValue), endNum = parseFloat(endValue) * (isString2 && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString2) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  };
  var _assign = function _assign2(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  };
  var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  };
  _forEachName("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b2 = "Bottom", l = "Left", props = (index < 3 ? [t, r, b2, l] : [t + l, t + r, b2 + r, b2 + l]).map(function(side) {
      return index < 2 ? name + side : "border" + side + name;
    });
    _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function(prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function(prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init3(target, vars, tween, index, targets) {
      var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache2, smooth, hasPriority, inlineProps;
      _pluginInitted || _initCore();
      this.styles = this.styles || _getStyleSaver(target);
      inlineProps = this.styles.props;
      this.tween = tween;
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = typeof endValue;
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
          inlineProps.push(p, 0, style[p]);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              inlineProps.push("visibility", 0, style.visibility);
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            this.styles.save(p);
            if (type === "string" && endValue.substring(0, 6) === "var(--") {
              endValue = _getComputedProperty(target, endValue.substring(4, endValue.indexOf(")")));
              endNum = parseFloat(endValue);
            }
            if (!transformPropTween) {
              cache2 = target._gsap;
              cache2.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache2.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache2.renderTransform, cache2, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache2, "scaleY", cache2.scaleY, (relative ? _parseRelative(cache2.scaleY, relative + endNum) : endNum) - cache2.scaleY || 0, _renderCSSProp);
              this._pt.u = 0;
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache2.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache2.zOrigin && _addNonTweeningPT(this, cache2, "zOrigin", cache2.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache2, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache2, "smooth", cache2.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache2[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache2 : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else if (p !== "parseTransform") {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }
          isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : typeof target[p] === "function" ? inlineProps.push(p, 2, target[p]()) : inlineProps.push(p, 1, startValue || target[p]));
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    render: function render2(ratio, data) {
      if (data.tween._time || !_reverting2()) {
        var pt = data._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
      } else {
        data.styles.revert();
      }
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty,
      _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;
  gsap.core.getStyleSaver = _getStyleSaver;
  (function(positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function(name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function(name) {
      var split2 = name.split(":");
      _propertyAliases[split2[1]] = all[split2[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    _config.units[name] = "px";
  });
  gsap.registerPlugin(CSSPlugin);

  // node_modules/gsap/index.js
  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
  var TweenMaxWithCSS = gsapWithCSS.core.Tween;

  // node_modules/gsap/ScrollTrigger.js
  init_define_import_meta_env();

  // node_modules/gsap/Observer.js
  init_define_import_meta_env();
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var gsap2;
  var _coreInitted2;
  var _clamp3;
  var _win3;
  var _doc3;
  var _docEl;
  var _body;
  var _isTouch;
  var _pointerType;
  var ScrollTrigger;
  var _root;
  var _normalizer;
  var _eventTypes;
  var _context2;
  var _getGSAP = function _getGSAP2() {
    return gsap2 || typeof window !== "undefined" && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
  };
  var _startup = 1;
  var _observers = [];
  var _scrollers = [];
  var _proxies = [];
  var _getTime = Date.now;
  var _bridge = function _bridge2(name, value) {
    return value;
  };
  var _integrate = function _integrate2() {
    var core = ScrollTrigger.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
    scrollers.push.apply(scrollers, _scrollers);
    proxies.push.apply(proxies, _proxies);
    _scrollers = scrollers;
    _proxies = proxies;
    _bridge = function _bridge3(name, value) {
      return data[name](value);
    };
  };
  var _getProxyProp = function _getProxyProp2(element, property) {
    return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
  };
  var _isViewport = function _isViewport2(el) {
    return !!~_root.indexOf(el);
  };
  var _addListener = function _addListener2(element, type, func, passive, capture) {
    return element.addEventListener(type, func, {
      passive: passive !== false,
      capture: !!capture
    });
  };
  var _removeListener = function _removeListener2(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  };
  var _scrollLeft = "scrollLeft";
  var _scrollTop = "scrollTop";
  var _onScroll = function _onScroll2() {
    return _normalizer && _normalizer.isPressed || _scrollers.cache++;
  };
  var _scrollCacheFunc = function _scrollCacheFunc2(f, doNotCache) {
    var cachingFunc = function cachingFunc2(value) {
      if (value || value === 0) {
        _startup && (_win3.history.scrollRestoration = "manual");
        var isNormalizing = _normalizer && _normalizer.isPressed;
        value = cachingFunc2.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
        f(value);
        cachingFunc2.cacheID = _scrollers.cache;
        isNormalizing && _bridge("ss", value);
      } else if (doNotCache || _scrollers.cache !== cachingFunc2.cacheID || _bridge("ref")) {
        cachingFunc2.cacheID = _scrollers.cache;
        cachingFunc2.v = f();
      }
      return cachingFunc2.v + cachingFunc2.offset;
    };
    cachingFunc.offset = 0;
    return f && cachingFunc;
  };
  var _horizontal = {
    s: _scrollLeft,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(value, _vertical.sc()) : _win3.pageXOffset || _doc3[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
    })
  };
  var _vertical = {
    s: _scrollTop,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: _horizontal,
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(_horizontal.sc(), value) : _win3.pageYOffset || _doc3[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
    })
  };
  var _getTarget = function _getTarget2(t, self) {
    return (self && self._ctx && self._ctx.selector || gsap2.utils.toArray)(t)[0] || (typeof t === "string" && gsap2.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
  };
  var _isWithin = function _isWithin2(element, list) {
    var i = list.length;
    while (i--) {
      if (list[i] === element || list[i].contains(element)) {
        return true;
      }
    }
    return false;
  };
  var _getScrollFunc = function _getScrollFunc2(element, _ref) {
    var s = _ref.s, sc = _ref.sc;
    _isViewport(element) && (element = _doc3.scrollingElement || _docEl);
    var i = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
    !~i && (i = _scrollers.push(element) - 1);
    _scrollers[i + offset] || _addListener(element, "scroll", _onScroll);
    var prev = _scrollers[i + offset], func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function(value) {
      return arguments.length ? element[s] = value : element[s];
    })));
    func.target = element;
    prev || (func.smooth = gsap2.getProperty(element, "scrollBehavior") === "smooth");
    return func;
  };
  var _getVelocityProp = function _getVelocityProp2(value, minTimeRefresh, useDelta) {
    var v1 = value, v2 = value, t1 = _getTime(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update = function update2(value2, force) {
      var t = _getTime();
      if (force || t - t1 > min) {
        v2 = v1;
        v1 = value2;
        t2 = t1;
        t1 = t;
      } else if (useDelta) {
        v1 += value2;
      } else {
        v1 = v2 + (value2 - v2) / (t - t2) * (t1 - t2);
      }
    }, reset = function reset2() {
      v2 = v1 = useDelta ? 0 : v1;
      t2 = t1 = 0;
    }, getVelocity = function getVelocity2(latestValue) {
      var tOld = t2, vOld = v2, t = _getTime();
      (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
      return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
    };
    return {
      update,
      reset,
      getVelocity
    };
  };
  var _getEvent = function _getEvent2(e, preventDefault) {
    preventDefault && !e._gsapAllow && e.preventDefault();
    return e.changedTouches ? e.changedTouches[0] : e;
  };
  var _getAbsoluteMax = function _getAbsoluteMax2(a) {
    var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
    return Math.abs(max) >= Math.abs(min) ? max : min;
  };
  var _setScrollTrigger = function _setScrollTrigger2() {
    ScrollTrigger = gsap2.core.globals().ScrollTrigger;
    ScrollTrigger && ScrollTrigger.core && _integrate();
  };
  var _initCore3 = function _initCore4(core) {
    gsap2 = core || _getGSAP();
    if (!_coreInitted2 && gsap2 && typeof document !== "undefined" && document.body) {
      _win3 = window;
      _doc3 = document;
      _docEl = _doc3.documentElement;
      _body = _doc3.body;
      _root = [_win3, _doc3, _docEl, _body];
      _clamp3 = gsap2.utils.clamp;
      _context2 = gsap2.core.context || function() {
      };
      _pointerType = "onpointerenter" in _body ? "pointer" : "mouse";
      _isTouch = Observer.isTouch = _win3.matchMedia && _win3.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win3 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
      _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
      setTimeout(function() {
        return _startup = 0;
      }, 500);
      _setScrollTrigger();
      _coreInitted2 = 1;
    }
    return _coreInitted2;
  };
  _horizontal.op = _vertical;
  _scrollers.cache = 0;
  var Observer = /* @__PURE__ */ (function() {
    function Observer2(vars) {
      this.init(vars);
    }
    var _proto = Observer2.prototype;
    _proto.init = function init6(vars) {
      _coreInitted2 || _initCore3(gsap2) || console.warn("Please gsap.registerPlugin(Observer)");
      ScrollTrigger || _setScrollTrigger();
      var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
      this.target = target = _getTarget(target) || _docEl;
      this.vars = vars;
      ignore && (ignore = gsap2.utils.toArray(ignore));
      tolerance = tolerance || 1e-9;
      dragMinimum = dragMinimum || 0;
      wheelSpeed = wheelSpeed || 1;
      scrollSpeed = scrollSpeed || 1;
      type = type || "wheel,touch,pointer";
      debounce = debounce !== false;
      lineHeight || (lineHeight = parseFloat(_win3.getComputedStyle(_body).lineHeight) || 22);
      var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault && vars.passive !== false, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport(target), ownerDoc = target.ownerDocument || _doc3, deltaX = [0, 0, 0], deltaY = [0, 0, 0], onClickTime = 0, clickCapture = function clickCapture2() {
        return onClickTime = _getTime();
      }, _ignoreCheck = function _ignoreCheck2(e, isPointerOrTouch) {
        return (self.event = e) && ignore && _isWithin(e.target, ignore) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
      }, onStopFunc = function onStopFunc2() {
        self._vx.reset();
        self._vy.reset();
        onStopDelayedCall.pause();
        onStop && onStop(self);
      }, update = function update2() {
        var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
        onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
        if (changedX) {
          onRight && self.deltaX > 0 && onRight(self);
          onLeft && self.deltaX < 0 && onLeft(self);
          onChangeX && onChangeX(self);
          onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
          prevDeltaX = self.deltaX;
          deltaX[0] = deltaX[1] = deltaX[2] = 0;
        }
        if (changedY) {
          onDown && self.deltaY > 0 && onDown(self);
          onUp && self.deltaY < 0 && onUp(self);
          onChangeY && onChangeY(self);
          onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
          prevDeltaY = self.deltaY;
          deltaY[0] = deltaY[1] = deltaY[2] = 0;
        }
        if (moved || dragged) {
          onMove && onMove(self);
          if (dragged) {
            onDragStart && dragged === 1 && onDragStart(self);
            onDrag && onDrag(self);
            dragged = 0;
          }
          moved = false;
        }
        locked && !(locked = false) && onLockAxis && onLockAxis(self);
        if (wheeled) {
          onWheel(self);
          wheeled = false;
        }
        id = 0;
      }, onDelta = function onDelta2(x, y, index) {
        deltaX[index] += x;
        deltaY[index] += y;
        self._vx.update(x);
        self._vy.update(y);
        debounce ? id || (id = requestAnimationFrame(update)) : update();
      }, onTouchOrPointerDelta = function onTouchOrPointerDelta2(x, y) {
        if (lockAxis && !axis) {
          self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
          locked = true;
        }
        if (axis !== "y") {
          deltaX[2] += x;
          self._vx.update(x, true);
        }
        if (axis !== "x") {
          deltaY[2] += y;
          self._vy.update(y, true);
        }
        debounce ? id || (id = requestAnimationFrame(update)) : update();
      }, _onDrag = function _onDrag2(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y, isDragging = self.isDragging;
        self.x = x;
        self.y = y;
        if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum)) {
          dragged = isDragging ? 2 : 1;
          isDragging || (self.isDragging = true);
          onTouchOrPointerDelta(dx, dy);
        }
      }, _onPress = self.onPress = function(e) {
        if (_ignoreCheck(e, 1) || e && e.button) {
          return;
        }
        self.axis = axis = null;
        onStopDelayedCall.pause();
        self.isPressed = true;
        e = _getEvent(e);
        prevDeltaX = prevDeltaY = 0;
        self.startX = self.x = e.clientX;
        self.startY = self.y = e.clientY;
        self._vx.reset();
        self._vy.reset();
        _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
        self.deltaX = self.deltaY = 0;
        onPress && onPress(self);
      }, _onRelease = self.onRelease = function(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging, isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e);
        if (!isDragNotClick && isTrackingDrag) {
          self._vx.reset();
          self._vy.reset();
          if (preventDefault && allowClicks) {
            gsap2.delayedCall(0.08, function() {
              if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
                if (e.target.click) {
                  e.target.click();
                } else if (ownerDoc.createEvent) {
                  var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                  syntheticEvent.initMouseEvent("click", true, true, _win3, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                  e.target.dispatchEvent(syntheticEvent);
                }
              }
            });
          }
        }
        self.isDragging = self.isGesturing = self.isPressed = false;
        onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
        dragged && update();
        onDragEnd && wasDragging && onDragEnd(self);
        onRelease && onRelease(self, isDragNotClick);
      }, _onGestureStart = function _onGestureStart2(e) {
        return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
      }, _onGestureEnd = function _onGestureEnd2() {
        return (self.isGesturing = false) || onGestureEnd(self);
      }, onScroll = function onScroll2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = scrollFuncX(), y = scrollFuncY();
        onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
        scrollX = x;
        scrollY = y;
        onStop && onStopDelayedCall.restart(true);
      }, _onWheel = function _onWheel2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        onWheel && (wheeled = true);
        var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win3.innerHeight : 1) * wheelSpeed;
        onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
        onStop && !isNormalizer && onStopDelayedCall.restart(true);
      }, _onMove = function _onMove2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y;
        self.x = x;
        self.y = y;
        moved = true;
        onStop && onStopDelayedCall.restart(true);
        (dx || dy) && onTouchOrPointerDelta(dx, dy);
      }, _onHover = function _onHover2(e) {
        self.event = e;
        onHover(self);
      }, _onHoverEnd = function _onHoverEnd2(e) {
        self.event = e;
        onHoverEnd(self);
      }, _onClick = function _onClick2(e) {
        return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
      };
      onStopDelayedCall = self._dc = gsap2.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
      self.deltaX = self.deltaY = 0;
      self._vx = _getVelocityProp(0, 50, true);
      self._vy = _getVelocityProp(0, 50, true);
      self.scrollX = scrollFuncX;
      self.scrollY = scrollFuncY;
      self.isDragging = self.isGesturing = self.isPressed = false;
      _context2(this);
      self.enable = function(e) {
        if (!self.isEnabled) {
          _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
          type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, passive, capture);
          if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
            _addListener(target, _eventTypes[0], _onPress, passive, capture);
            _addListener(ownerDoc, _eventTypes[2], _onRelease);
            _addListener(ownerDoc, _eventTypes[3], _onRelease);
            allowClicks && _addListener(target, "click", clickCapture, true, true);
            onClick && _addListener(target, "click", _onClick);
            onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
            onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
            onHover && _addListener(target, _pointerType + "enter", _onHover);
            onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
            onMove && _addListener(target, _pointerType + "move", _onMove);
          }
          self.isEnabled = true;
          self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
          self._vx.reset();
          self._vy.reset();
          scrollX = scrollFuncX();
          scrollY = scrollFuncY();
          e && e.type && _onPress(e);
          onEnable && onEnable(self);
        }
        return self;
      };
      self.disable = function() {
        if (self.isEnabled) {
          _observers.filter(function(o) {
            return o !== self && _isViewport(o.target);
          }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          if (self.isPressed) {
            self._vx.reset();
            self._vy.reset();
            _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
          }
          _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
          _removeListener(target, "wheel", _onWheel, capture);
          _removeListener(target, _eventTypes[0], _onPress, capture);
          _removeListener(ownerDoc, _eventTypes[2], _onRelease);
          _removeListener(ownerDoc, _eventTypes[3], _onRelease);
          _removeListener(target, "click", clickCapture, true);
          _removeListener(target, "click", _onClick);
          _removeListener(ownerDoc, "gesturestart", _onGestureStart);
          _removeListener(ownerDoc, "gestureend", _onGestureEnd);
          _removeListener(target, _pointerType + "enter", _onHover);
          _removeListener(target, _pointerType + "leave", _onHoverEnd);
          _removeListener(target, _pointerType + "move", _onMove);
          self.isEnabled = self.isPressed = self.isDragging = false;
          onDisable && onDisable(self);
        }
      };
      self.kill = self.revert = function() {
        self.disable();
        var i = _observers.indexOf(self);
        i >= 0 && _observers.splice(i, 1);
        _normalizer === self && (_normalizer = 0);
      };
      _observers.push(self);
      isNormalizer && _isViewport(target) && (_normalizer = self);
      self.enable(event);
    };
    _createClass(Observer2, [{
      key: "velocityX",
      get: function get2() {
        return this._vx.getVelocity();
      }
    }, {
      key: "velocityY",
      get: function get2() {
        return this._vy.getVelocity();
      }
    }]);
    return Observer2;
  })();
  Observer.version = "3.13.0";
  Observer.create = function(vars) {
    return new Observer(vars);
  };
  Observer.register = _initCore3;
  Observer.getAll = function() {
    return _observers.slice();
  };
  Observer.getById = function(id) {
    return _observers.filter(function(o) {
      return o.vars.id === id;
    })[0];
  };
  _getGSAP() && gsap2.registerPlugin(Observer);

  // node_modules/gsap/ScrollTrigger.js
  var gsap3;
  var _coreInitted3;
  var _win4;
  var _doc4;
  var _docEl2;
  var _body2;
  var _root2;
  var _resizeDelay;
  var _toArray;
  var _clamp4;
  var _time2;
  var _syncInterval;
  var _refreshing;
  var _pointerIsDown;
  var _transformProp2;
  var _i;
  var _prevWidth;
  var _prevHeight;
  var _autoRefresh;
  var _sort;
  var _suppressOverwrites2;
  var _ignoreResize;
  var _normalizer2;
  var _ignoreMobileResize;
  var _baseScreenHeight;
  var _baseScreenWidth;
  var _fixIOSBug;
  var _context3;
  var _scrollRestoration;
  var _div100vh;
  var _100vh;
  var _isReverted;
  var _clampingMax;
  var _limitCallbacks;
  var _startup2 = 1;
  var _getTime2 = Date.now;
  var _time1 = _getTime2();
  var _lastScrollTime = 0;
  var _enabled = 0;
  var _parseClamp = function _parseClamp2(value, type, self) {
    var clamp3 = _isString3(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
    self["_" + type + "Clamp"] = clamp3;
    return clamp3 ? value.substr(6, value.length - 7) : value;
  };
  var _keepClamp = function _keepClamp2(value, clamp3) {
    return clamp3 && (!_isString3(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
  };
  var _rafBugFix = function _rafBugFix2() {
    return _enabled && requestAnimationFrame(_rafBugFix2);
  };
  var _pointerDownHandler = function _pointerDownHandler2() {
    return _pointerIsDown = 1;
  };
  var _pointerUpHandler = function _pointerUpHandler2() {
    return _pointerIsDown = 0;
  };
  var _passThrough3 = function _passThrough4(v) {
    return v;
  };
  var _round3 = function _round4(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _windowExists5 = function _windowExists6() {
    return typeof window !== "undefined";
  };
  var _getGSAP3 = function _getGSAP4() {
    return gsap3 || _windowExists5() && (gsap3 = window.gsap) && gsap3.registerPlugin && gsap3;
  };
  var _isViewport3 = function _isViewport4(e) {
    return !!~_root2.indexOf(e);
  };
  var _getViewportDimension = function _getViewportDimension2(dimensionProperty) {
    return (dimensionProperty === "Height" ? _100vh : _win4["inner" + dimensionProperty]) || _docEl2["client" + dimensionProperty] || _body2["client" + dimensionProperty];
  };
  var _getBoundsFunc = function _getBoundsFunc2(element) {
    return _getProxyProp(element, "getBoundingClientRect") || (_isViewport3(element) ? function() {
      _winOffsets.width = _win4.innerWidth;
      _winOffsets.height = _100vh;
      return _winOffsets;
    } : function() {
      return _getBounds(element);
    });
  };
  var _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
    var d = _ref.d, d2 = _ref.d2, a = _ref.a;
    return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
      return a()[d];
    } : function() {
      return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
    };
  };
  var _getOffsetsFunc = function _getOffsetsFunc2(element, isViewport) {
    return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
      return _winOffsets;
    };
  };
  var _maxScroll = function _maxScroll2(element, _ref2) {
    var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
    return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport3(element) ? (_docEl2[s] || _body2[s]) - _getViewportDimension(d2) : element[s] - element["offset" + d2]);
  };
  var _iterateAutoRefresh = function _iterateAutoRefresh2(func, events) {
    for (var i = 0; i < _autoRefresh.length; i += 3) {
      (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
    }
  };
  var _isString3 = function _isString4(value) {
    return typeof value === "string";
  };
  var _isFunction3 = function _isFunction4(value) {
    return typeof value === "function";
  };
  var _isNumber3 = function _isNumber4(value) {
    return typeof value === "number";
  };
  var _isObject3 = function _isObject4(value) {
    return typeof value === "object";
  };
  var _endAnimation = function _endAnimation2(animation, reversed, pause) {
    return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
  };
  var _callback3 = function _callback4(self, func) {
    if (self.enabled) {
      var result = self._ctx ? self._ctx.add(function() {
        return func(self);
      }) : func(self);
      result && result.totalTime && (self.callbackAnimation = result);
    }
  };
  var _abs = Math.abs;
  var _left = "left";
  var _top = "top";
  var _right = "right";
  var _bottom = "bottom";
  var _width = "width";
  var _height = "height";
  var _Right = "Right";
  var _Left = "Left";
  var _Top = "Top";
  var _Bottom = "Bottom";
  var _padding = "padding";
  var _margin = "margin";
  var _Width = "Width";
  var _Height = "Height";
  var _px = "px";
  var _getComputedStyle = function _getComputedStyle2(element) {
    return _win4.getComputedStyle(element);
  };
  var _makePositionable = function _makePositionable2(element) {
    var position = _getComputedStyle(element).position;
    element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
  };
  var _setDefaults3 = function _setDefaults4(obj, defaults3) {
    for (var p in defaults3) {
      p in obj || (obj[p] = defaults3[p]);
    }
    return obj;
  };
  var _getBounds = function _getBounds2(element, withoutTransforms) {
    var tween = withoutTransforms && _getComputedStyle(element)[_transformProp2] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap3.to(element, {
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0
    }).progress(1), bounds = element.getBoundingClientRect();
    tween && tween.progress(0).kill();
    return bounds;
  };
  var _getSize = function _getSize2(element, _ref3) {
    var d2 = _ref3.d2;
    return element["offset" + d2] || element["client" + d2] || 0;
  };
  var _getLabelRatioArray = function _getLabelRatioArray2(timeline2) {
    var a = [], labels = timeline2.labels, duration = timeline2.duration(), p;
    for (p in labels) {
      a.push(labels[p] / duration);
    }
    return a;
  };
  var _getClosestLabel = function _getClosestLabel2(animation) {
    return function(value) {
      return gsap3.utils.snap(_getLabelRatioArray(animation), value);
    };
  };
  var _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
    var snap3 = gsap3.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a2, b2) {
      return a2 - b2;
    });
    return a ? function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var i;
      if (!direction) {
        return snap3(value);
      }
      if (direction > 0) {
        value -= threshold;
        for (i = 0; i < a.length; i++) {
          if (a[i] >= value) {
            return a[i];
          }
        }
        return a[i - 1];
      } else {
        i = a.length;
        value += threshold;
        while (i--) {
          if (a[i] <= value) {
            return a[i];
          }
        }
      }
      return a[0];
    } : function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var snapped = snap3(value);
      return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap3(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
    };
  };
  var _getLabelAtDirection = function _getLabelAtDirection2(timeline2) {
    return function(value, st) {
      return _snapDirectional(_getLabelRatioArray(timeline2))(value, st.direction);
    };
  };
  var _multiListener = function _multiListener2(func, element, types, callback) {
    return types.split(",").forEach(function(type) {
      return func(element, type, callback);
    });
  };
  var _addListener3 = function _addListener4(element, type, func, nonPassive, capture) {
    return element.addEventListener(type, func, {
      passive: !nonPassive,
      capture: !!capture
    });
  };
  var _removeListener3 = function _removeListener4(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  };
  var _wheelListener = function _wheelListener2(func, el, scrollFunc) {
    scrollFunc = scrollFunc && scrollFunc.wheelHandler;
    if (scrollFunc) {
      func(el, "wheel", scrollFunc);
      func(el, "touchmove", scrollFunc);
    }
  };
  var _markerDefaults = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
  };
  var _defaults2 = {
    toggleActions: "play",
    anticipatePin: 0
  };
  var _keywords = {
    top: 0,
    left: 0,
    center: 0.5,
    bottom: 1,
    right: 1
  };
  var _offsetToPx = function _offsetToPx2(value, size) {
    if (_isString3(value)) {
      var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
      if (~eqIndex) {
        value.indexOf("%") > eqIndex && (relative *= size / 100);
        value = value.substr(0, eqIndex - 1);
      }
      value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
    }
    return value;
  };
  var _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
    var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
    var e = _doc4.createElement("div"), useFixedPosition = _isViewport3(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body2 : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
    (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
    matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
    e._isStart = isStart;
    e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
    e.style.cssText = css;
    e.innerText = name || name === 0 ? type + "-" + name : type;
    parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
    e._offset = e["offset" + direction.op.d2];
    _positionMarker(e, 0, direction, isStart);
    return e;
  };
  var _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
    var vars = {
      display: "block"
    }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
    marker._isFlipped = flipped;
    vars[direction.a + "Percent"] = flipped ? -100 : 0;
    vars[direction.a] = flipped ? "1px" : 0;
    vars["border" + side + _Width] = 1;
    vars["border" + oppositeSide + _Width] = 0;
    vars[direction.p] = start + "px";
    gsap3.set(marker, vars);
  };
  var _triggers = [];
  var _ids = {};
  var _rafID;
  var _sync = function _sync2() {
    return _getTime2() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
  };
  var _onScroll3 = function _onScroll4() {
    if (!_normalizer2 || !_normalizer2.isPressed || _normalizer2.startX > _body2.clientWidth) {
      _scrollers.cache++;
      if (_normalizer2) {
        _rafID || (_rafID = requestAnimationFrame(_updateAll));
      } else {
        _updateAll();
      }
      _lastScrollTime || _dispatch3("scrollStart");
      _lastScrollTime = _getTime2();
    }
  };
  var _setBaseDimensions = function _setBaseDimensions2() {
    _baseScreenWidth = _win4.innerWidth;
    _baseScreenHeight = _win4.innerHeight;
  };
  var _onResize = function _onResize2(force) {
    _scrollers.cache++;
    (force === true || !_refreshing && !_ignoreResize && !_doc4.fullscreenElement && !_doc4.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win4.innerWidth || Math.abs(_win4.innerHeight - _baseScreenHeight) > _win4.innerHeight * 0.25)) && _resizeDelay.restart(true);
  };
  var _listeners2 = {};
  var _emptyArray2 = [];
  var _softRefresh = function _softRefresh2() {
    return _removeListener3(ScrollTrigger2, "scrollEnd", _softRefresh2) || _refreshAll(true);
  };
  var _dispatch3 = function _dispatch4(type) {
    return _listeners2[type] && _listeners2[type].map(function(f) {
      return f();
    }) || _emptyArray2;
  };
  var _savedStyles = [];
  var _revertRecorded = function _revertRecorded2(media) {
    for (var i = 0; i < _savedStyles.length; i += 5) {
      if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
        _savedStyles[i].style.cssText = _savedStyles[i + 1];
        _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
        _savedStyles[i + 3].uncache = 1;
      }
    }
  };
  var _revertAll = function _revertAll2(kill, media) {
    var trigger;
    for (_i = 0; _i < _triggers.length; _i++) {
      trigger = _triggers[_i];
      if (trigger && (!media || trigger._ctx === media)) {
        if (kill) {
          trigger.kill(1);
        } else {
          trigger.revert(true, true);
        }
      }
    }
    _isReverted = true;
    media && _revertRecorded(media);
    media || _dispatch3("revert");
  };
  var _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
    _scrollers.cache++;
    (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && obj.cacheID++ && (obj.rec = 0);
    });
    _isString3(scrollRestoration) && (_win4.history.scrollRestoration = _scrollRestoration = scrollRestoration);
  };
  var _refreshingAll;
  var _refreshID = 0;
  var _queueRefreshID;
  var _queueRefreshAll = function _queueRefreshAll2() {
    if (_queueRefreshID !== _refreshID) {
      var id = _queueRefreshID = _refreshID;
      requestAnimationFrame(function() {
        return id === _refreshID && _refreshAll(true);
      });
    }
  };
  var _refresh100vh = function _refresh100vh2() {
    _body2.appendChild(_div100vh);
    _100vh = !_normalizer2 && _div100vh.offsetHeight || _win4.innerHeight;
    _body2.removeChild(_div100vh);
  };
  var _hideAllMarkers = function _hideAllMarkers2(hide) {
    return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
      return el.style.display = hide ? "none" : "block";
    });
  };
  var _refreshAll = function _refreshAll2(force, skipRevert) {
    _docEl2 = _doc4.documentElement;
    _body2 = _doc4.body;
    _root2 = [_win4, _doc4, _docEl2, _body2];
    if (_lastScrollTime && !force && !_isReverted) {
      _addListener3(ScrollTrigger2, "scrollEnd", _softRefresh);
      return;
    }
    _refresh100vh();
    _refreshingAll = ScrollTrigger2.isRefreshing = true;
    _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && ++obj.cacheID && (obj.rec = obj());
    });
    var refreshInits = _dispatch3("refreshInit");
    _sort && ScrollTrigger2.sort();
    skipRevert || _revertAll();
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && (obj.target.style.scrollBehavior = "auto");
        obj(0);
      }
    });
    _triggers.slice(0).forEach(function(t) {
      return t.refresh();
    });
    _isReverted = false;
    _triggers.forEach(function(t) {
      if (t._subPinOffset && t.pin) {
        var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
        t.revert(true, 1);
        t.adjustPinSpacing(t.pin[prop] - original);
        t.refresh();
      }
    });
    _clampingMax = 1;
    _hideAllMarkers(true);
    _triggers.forEach(function(t) {
      var max = _maxScroll(t.scroller, t._dir), endClamp = t.vars.end === "max" || t._endClamp && t.end > max, startClamp = t._startClamp && t.start >= max;
      (endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
    });
    _hideAllMarkers(false);
    _clampingMax = 0;
    refreshInits.forEach(function(result) {
      return result && result.render && result.render(-1);
    });
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && requestAnimationFrame(function() {
          return obj.target.style.scrollBehavior = "smooth";
        });
        obj.rec && obj(obj.rec);
      }
    });
    _clearScrollMemory(_scrollRestoration, 1);
    _resizeDelay.pause();
    _refreshID++;
    _refreshingAll = 2;
    _updateAll(2);
    _triggers.forEach(function(t) {
      return _isFunction3(t.vars.onRefresh) && t.vars.onRefresh(t);
    });
    _refreshingAll = ScrollTrigger2.isRefreshing = false;
    _dispatch3("refresh");
  };
  var _lastScroll = 0;
  var _direction = 1;
  var _primary;
  var _updateAll = function _updateAll2(force) {
    if (force === 2 || !_refreshingAll && !_isReverted) {
      ScrollTrigger2.isUpdating = true;
      _primary && _primary.update(0);
      var l = _triggers.length, time = _getTime2(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
      _direction = _lastScroll > scroll ? -1 : 1;
      _refreshingAll || (_lastScroll = scroll);
      if (recordVelocity) {
        if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
          _lastScrollTime = 0;
          _dispatch3("scrollEnd");
        }
        _time2 = _time1;
        _time1 = time;
      }
      if (_direction < 0) {
        _i = l;
        while (_i-- > 0) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
        _direction = 1;
      } else {
        for (_i = 0; _i < l; _i++) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
      }
      ScrollTrigger2.isUpdating = false;
    }
    _rafID = 0;
  };
  var _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"];
  var _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]);
  var _swapPinOut = function _swapPinOut2(pin, spacer, state) {
    _setState(state);
    var cache2 = pin._gsap;
    if (cache2.spacerIsNative) {
      _setState(cache2.spacerState);
    } else if (pin._gsap.swappedIn) {
      var parent = spacer.parentNode;
      if (parent) {
        parent.insertBefore(pin, spacer);
        parent.removeChild(spacer);
      }
    }
    pin._gsap.swappedIn = false;
  };
  var _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
    if (!pin._gsap.swappedIn) {
      var i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p;
      while (i--) {
        p = _propNamesToCopy[i];
        spacerStyle[p] = cs[p];
      }
      spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
      cs.display === "inline" && (spacerStyle.display = "inline-block");
      pinStyle[_bottom] = pinStyle[_right] = "auto";
      spacerStyle.flexBasis = cs.flexBasis || "auto";
      spacerStyle.overflow = "visible";
      spacerStyle.boxSizing = "border-box";
      spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
      spacerStyle[_height] = _getSize(pin, _vertical) + _px;
      spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
      _setState(spacerState);
      pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
      pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
      pinStyle[_padding] = cs[_padding];
      if (pin.parentNode !== spacer) {
        pin.parentNode.insertBefore(spacer, pin);
        spacer.appendChild(pin);
      }
      pin._gsap.swappedIn = true;
    }
  };
  var _capsExp2 = /([A-Z])/g;
  var _setState = function _setState2(state) {
    if (state) {
      var style = state.t.style, l = state.length, i = 0, p, value;
      (state.t._gsap || gsap3.core.getCache(state.t)).uncache = 1;
      for (; i < l; i += 2) {
        value = state[i + 1];
        p = state[i];
        if (value) {
          style[p] = value;
        } else if (style[p]) {
          style.removeProperty(p.replace(_capsExp2, "-$1").toLowerCase());
        }
      }
    }
  };
  var _getState = function _getState2(element) {
    var l = _stateProps.length, style = element.style, state = [], i = 0;
    for (; i < l; i++) {
      state.push(_stateProps[i], style[_stateProps[i]]);
    }
    state.t = element;
    return state;
  };
  var _copyState = function _copyState2(state, override, omitOffsets) {
    var result = [], l = state.length, i = omitOffsets ? 8 : 0, p;
    for (; i < l; i += 2) {
      p = state[i];
      result.push(p, p in override ? override[p] : state[i + 1]);
    }
    result.t = state.t;
    return result;
  };
  var _winOffsets = {
    left: 0,
    top: 0
  };
  var _parsePosition3 = function _parsePosition4(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
    _isFunction3(value) && (value = value(self));
    if (_isString3(value) && value.substr(0, 3) === "max") {
      value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
    }
    var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
    containerAnimation && containerAnimation.seek(0);
    isNaN(value) || (value = +value);
    if (!_isNumber3(value)) {
      _isFunction3(trigger) && (trigger = trigger(self));
      var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
      element = _getTarget(trigger, self) || _body2;
      bounds = _getBounds(element) || {};
      if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
        display = element.style.display;
        element.style.display = "block";
        bounds = _getBounds(element);
        display ? element.style.display = display : element.style.removeProperty("display");
      }
      localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
      globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
      value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
      markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
      scrollerSize -= scrollerSize - globalOffset;
    } else {
      containerAnimation && (value = gsap3.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
      markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
    }
    if (clampZeroProp) {
      self[clampZeroProp] = value || -1e-3;
      value < 0 && (value = 0);
    }
    if (marker) {
      var position = value + scrollerSize, isStart = marker._isStart;
      p1 = "scroll" + direction.d2;
      _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body2[p1], _docEl2[p1]) : marker.parentNode[p1]) <= position + 1);
      if (useFixedPosition) {
        scrollerBounds = _getBounds(markerScroller);
        useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
      }
    }
    if (containerAnimation && element) {
      p1 = _getBounds(element);
      containerAnimation.seek(scrollerMax);
      p2 = _getBounds(element);
      containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
      value = value / containerAnimation._caScrollDist * scrollerMax;
    }
    containerAnimation && containerAnimation.seek(time);
    return containerAnimation ? value : Math.round(value);
  };
  var _prefixExp = /(webkit|moz|length|cssText|inset)/i;
  var _reparent = function _reparent2(element, parent, top, left) {
    if (element.parentNode !== parent) {
      var style = element.style, p, cs;
      if (parent === _body2) {
        element._stOrig = style.cssText;
        cs = _getComputedStyle(element);
        for (p in cs) {
          if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
            style[p] = cs[p];
          }
        }
        style.top = top;
        style.left = left;
      } else {
        style.cssText = element._stOrig;
      }
      gsap3.core.getCache(element).uncache = 1;
      parent.appendChild(element);
    }
  };
  var _interruptionTracker = function _interruptionTracker2(getValueFunc, initialValue, onInterrupt) {
    var last1 = initialValue, last2 = last1;
    return function(value) {
      var current = Math.round(getValueFunc());
      if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
        value = current;
        onInterrupt && onInterrupt();
      }
      last2 = last1;
      last1 = Math.round(value);
      return last1;
    };
  };
  var _shiftMarker = function _shiftMarker2(marker, direction, value) {
    var vars = {};
    vars[direction.p] = "+=" + value;
    gsap3.set(marker, vars);
  };
  var _getTweenCreator = function _getTweenCreator2(scroller, direction) {
    var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
      var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
      initialValue = initialValue || getScroll();
      var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
        tween.kill();
        getTween2.tween = 0;
      });
      change2 = change1 && change2 || 0;
      change1 = change1 || scrollTo - initialValue;
      tween && tween.kill();
      vars[prop] = scrollTo;
      vars.inherit = false;
      vars.modifiers = modifiers;
      modifiers[prop] = function() {
        return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
      };
      vars.onUpdate = function() {
        _scrollers.cache++;
        getTween2.tween && _updateAll();
      };
      vars.onComplete = function() {
        getTween2.tween = 0;
        onComplete && onComplete.call(tween);
      };
      tween = getTween2.tween = gsap3.to(scroller, vars);
      return tween;
    };
    scroller[prop] = getScroll;
    getScroll.wheelHandler = function() {
      return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
    };
    _addListener3(scroller, "wheel", getScroll.wheelHandler);
    ScrollTrigger2.isTouch && _addListener3(scroller, "touchmove", getScroll.wheelHandler);
    return getTween;
  };
  var ScrollTrigger2 = /* @__PURE__ */ (function() {
    function ScrollTrigger4(vars, animation) {
      _coreInitted3 || ScrollTrigger4.register(gsap3) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
      _context3(this);
      this.init(vars, animation);
    }
    var _proto = ScrollTrigger4.prototype;
    _proto.init = function init6(vars, animation) {
      this.progress = this.start = 0;
      this.vars && this.kill(true, true);
      if (!_enabled) {
        this.update = this.refresh = this.kill = _passThrough3;
        return;
      }
      vars = _setDefaults3(_isString3(vars) || _isNumber3(vars) || vars.nodeType ? {
        trigger: vars
      } : vars, _defaults2);
      var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap3 = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win4), scrollerCache = gsap3.core.getCache(scroller), isViewport = _isViewport3(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults2.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
        return vars.onRefreshInit(self);
      }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap22, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
      self._startClamp = self._endClamp = false;
      self._dir = direction;
      anticipatePin *= 45;
      self.scroller = scroller;
      self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
      scroll1 = scrollFunc();
      self.vars = vars;
      animation = animation || vars.animation;
      if ("refreshPriority" in vars) {
        _sort = 1;
        vars.refreshPriority === -9999 && (_primary = self);
      }
      scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
        top: _getTweenCreator(scroller, _vertical),
        left: _getTweenCreator(scroller, _horizontal)
      };
      self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
      self.scrubDuration = function(value) {
        scrubSmooth = _isNumber3(value) && value;
        if (!scrubSmooth) {
          scrubTween && scrubTween.progress(1).kill();
          scrubTween = 0;
        } else {
          scrubTween ? scrubTween.duration(value) : scrubTween = gsap3.to(animation, {
            ease: "expo",
            totalProgress: "+=0",
            inherit: false,
            duration: scrubSmooth,
            paused: true,
            onComplete: function onComplete() {
              return onScrubComplete && onScrubComplete(self);
            }
          });
        }
      };
      if (animation) {
        animation.vars.lazy = false;
        animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
        self.animation = animation.pause();
        animation.scrollTrigger = self;
        self.scrubDuration(scrub);
        snap1 = 0;
        id || (id = animation.vars.id);
      }
      if (snap3) {
        if (!_isObject3(snap3) || snap3.push) {
          snap3 = {
            snapTo: snap3
          };
        }
        "scrollBehavior" in _body2.style && gsap3.set(isViewport ? [_body2, _docEl2] : scroller, {
          scrollBehavior: "auto"
        });
        _scrollers.forEach(function(o) {
          return _isFunction3(o) && o.target === (isViewport ? _doc4.scrollingElement || _docEl2 : scroller) && (o.smooth = false);
        });
        snapFunc = _isFunction3(snap3.snapTo) ? snap3.snapTo : snap3.snapTo === "labels" ? _getClosestLabel(animation) : snap3.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap3.directional !== false ? function(value, st) {
          return _snapDirectional(snap3.snapTo)(value, _getTime2() - lastRefresh < 500 ? 0 : st.direction);
        } : gsap3.utils.snap(snap3.snapTo);
        snapDurClamp = snap3.duration || {
          min: 0.1,
          max: 2
        };
        snapDurClamp = _isObject3(snapDurClamp) ? _clamp4(snapDurClamp.min, snapDurClamp.max) : _clamp4(snapDurClamp, snapDurClamp);
        snapDelayedCall = gsap3.delayedCall(snap3.delay || scrubSmooth / 2 || 0.1, function() {
          var scroll = scrollFunc(), refreshedRecently = _getTime2() - lastRefresh < 500, tween = tweenTo.tween;
          if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
            var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap22) / (_getTime2() - _time2) * 1e3 || 0, change1 = gsap3.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap3.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap3, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
            endValue = snapFunc(naturalEnd, self);
            _isNumber3(endValue) || (endValue = naturalEnd);
            endScroll = Math.max(0, Math.round(start + endValue * change));
            if (scroll <= end && scroll >= start && endScroll !== scroll) {
              if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
                return;
              }
              if (snap3.inertia === false) {
                change1 = endValue - progress;
              }
              tweenTo(endScroll, {
                duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
                ease: snap3.ease || "power3",
                data: _abs(endScroll - scroll),
                // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
                onInterrupt: function onInterrupt() {
                  return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
                },
                onComplete: function onComplete() {
                  self.update();
                  lastSnap = scrollFunc();
                  if (animation && !isToggle) {
                    scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
                  }
                  snap1 = snap22 = animation && !isToggle ? animation.totalProgress() : self.progress;
                  onSnapComplete && onSnapComplete(self);
                  _onComplete && _onComplete(self);
                }
              }, scroll, change1 * change, endScroll - scroll - change1 * change);
              onStart && onStart(self, tweenTo.tween);
            }
          } else if (self.isActive && lastSnap !== scroll) {
            snapDelayedCall.restart(true);
          }
        }).pause();
      }
      id && (_ids[id] = self);
      trigger = self.trigger = _getTarget(trigger || pin !== true && pin);
      customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
      customRevertReturn && (customRevertReturn = customRevertReturn(self));
      pin = pin === true ? trigger : _getTarget(pin);
      _isString3(toggleClass) && (toggleClass = {
        targets: trigger,
        className: toggleClass
      });
      if (pin) {
        pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
        self.pin = pin;
        pinCache = gsap3.core.getCache(pin);
        if (!pinCache.spacer) {
          if (pinSpacer) {
            pinSpacer = _getTarget(pinSpacer);
            pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
            pinCache.spacerIsNative = !!pinSpacer;
            pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
          }
          pinCache.spacer = spacer = pinSpacer || _doc4.createElement("div");
          spacer.classList.add("pin-spacer");
          id && spacer.classList.add("pin-spacer-" + id);
          pinCache.pinState = pinOriginalState = _getState(pin);
        } else {
          pinOriginalState = pinCache.pinState;
        }
        vars.force3D !== false && gsap3.set(pin, {
          force3D: true
        });
        self.spacer = spacer = pinCache.spacer;
        cs = _getComputedStyle(pin);
        spacingStart = cs[pinSpacing + direction.os2];
        pinGetter = gsap3.getProperty(pin);
        pinSetter = gsap3.quickSetter(pin, direction.a, _px);
        _swapPinIn(pin, spacer, cs);
        pinState = _getState(pin);
      }
      if (markers) {
        markerVars = _isObject3(markers) ? _setDefaults3(markers, _markerDefaults) : _markerDefaults;
        markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
        markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
        offset = markerStartTrigger["offset" + direction.op.d2];
        var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
        markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
        markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
        containerAnimation && (caMarkerSetter = gsap3.quickSetter([markerStart, markerEnd], direction.a, _px));
        if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
          _makePositionable(isViewport ? _body2 : scroller);
          gsap3.set([markerStartTrigger, markerEndTrigger], {
            force3D: true
          });
          markerStartSetter = gsap3.quickSetter(markerStartTrigger, direction.a, _px);
          markerEndSetter = gsap3.quickSetter(markerEndTrigger, direction.a, _px);
        }
      }
      if (containerAnimation) {
        var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
        containerAnimation.eventCallback("onUpdate", function() {
          self.update(0, 0, 1);
          oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
        });
      }
      self.previous = function() {
        return _triggers[_triggers.indexOf(self) - 1];
      };
      self.next = function() {
        return _triggers[_triggers.indexOf(self) + 1];
      };
      self.revert = function(revert, temp) {
        if (!temp) {
          return self.kill(true);
        }
        var r = revert !== false || !self.enabled, prevRefreshing = _refreshing;
        if (r !== self.isReverted) {
          if (r) {
            prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
            prevProgress = self.progress;
            prevAnimProgress = animation && animation.progress();
          }
          markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
            return m.style.display = r ? "none" : "block";
          });
          if (r) {
            _refreshing = self;
            self.update(r);
          }
          if (pin && (!pinReparent || !self.isActive)) {
            if (r) {
              _swapPinOut(pin, spacer, pinOriginalState);
            } else {
              _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
            }
          }
          r || self.update(r);
          _refreshing = prevRefreshing;
          self.isReverted = r;
        }
      };
      self.refresh = function(soft, force, position, pinOffset) {
        if ((_refreshing || !self.enabled) && !force) {
          return;
        }
        if (pin && soft && _lastScrollTime) {
          _addListener3(ScrollTrigger4, "scrollEnd", _softRefresh);
          return;
        }
        !_refreshingAll && onRefreshInit && onRefreshInit(self);
        _refreshing = self;
        if (tweenTo.tween && !position) {
          tweenTo.tween.kill();
          tweenTo.tween = 0;
        }
        scrubTween && scrubTween.pause();
        if (invalidateOnRefresh && animation) {
          animation.revert({
            kill: false
          }).invalidate();
          animation.getChildren && animation.getChildren(true, true, false).forEach(function(t) {
            return t.vars.immediateRender && t.render(0, true, true);
          });
        }
        self.isReverted || self.revert(true, true);
        self._subPinOffset = false;
        var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= 0.01 || !change, offset2 = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject3(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject3(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
        if (markers && _isObject3(position)) {
          markerStartOffset = gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset = gsap3.getProperty(markerEndTrigger, direction.p);
        }
        while (i-- > 0) {
          curTrigger = _triggers[i];
          curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);
          curPin = curTrigger.pin;
          if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
            revertedPins || (revertedPins = []);
            revertedPins.unshift(curTrigger);
            curTrigger.revert(true, true);
          }
          if (curTrigger !== _triggers[i]) {
            triggerIndex--;
            i--;
          }
        }
        _isFunction3(parsedStart) && (parsedStart = parsedStart(self));
        parsedStart = _parseClamp(parsedStart, "start", self);
        start = _parsePosition3(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -1e-3 : 0);
        _isFunction3(parsedEnd) && (parsedEnd = parsedEnd(self));
        if (_isString3(parsedEnd) && !parsedEnd.indexOf("+=")) {
          if (~parsedEnd.indexOf(" ")) {
            parsedEnd = (_isString3(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
          } else {
            offset2 = _offsetToPx(parsedEnd.substr(2), size);
            parsedEnd = _isString3(parsedStart) ? parsedStart : (containerAnimation ? gsap3.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset2;
            parsedEndTrigger = trigger;
          }
        }
        parsedEnd = _parseClamp(parsedEnd, "end", self);
        end = Math.max(start, _parsePosition3(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -1e-3;
        offset2 = 0;
        i = triggerIndex;
        while (i--) {
          curTrigger = _triggers[i];
          curPin = curTrigger.pin;
          if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
            cs2 = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
            if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
              offset2 += cs2 * (1 - curTrigger.progress);
            }
            curPin === pin && (otherPinOffset += cs2);
          }
        }
        start += offset2;
        end += offset2;
        self._startClamp && (self._startClamp += offset2);
        if (self._endClamp && !_refreshingAll) {
          self._endClamp = end || -1e-3;
          end = Math.min(end, _maxScroll(scroller, direction));
        }
        change = end - start || (start -= 0.01) && 1e-3;
        if (isFirstRefresh) {
          prevProgress = gsap3.utils.clamp(0, 1, gsap3.utils.normalize(start, end, prevScroll));
        }
        self._pinPush = otherPinOffset;
        if (markerStart && offset2) {
          cs2 = {};
          cs2[direction.a] = "+=" + offset2;
          pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
          gsap3.set([markerStart, markerEnd], cs2);
        }
        if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
          cs2 = _getComputedStyle(pin);
          isVertical = direction === _vertical;
          scroll = scrollFunc();
          pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
          if (!max && end > 1) {
            forcedOverflow = (isViewport ? _doc4.scrollingElement || _docEl2 : scroller).style;
            forcedOverflow = {
              style: forcedOverflow,
              value: forcedOverflow["overflow" + direction.a.toUpperCase()]
            };
            if (isViewport && _getComputedStyle(_body2)["overflow" + direction.a.toUpperCase()] !== "scroll") {
              forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
            }
          }
          _swapPinIn(pin, spacer, cs2);
          pinState = _getState(pin);
          bounds = _getBounds(pin, true);
          oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
          if (pinSpacing) {
            spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
            spacerState.t = spacer;
            i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
            if (i) {
              spacerState.push(direction.d, i + _px);
              spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
            }
            _setState(spacerState);
            if (pinnedContainer) {
              _triggers.forEach(function(t) {
                if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                  t._subPinOffset = true;
                }
              });
            }
            useFixedPosition && scrollFunc(prevScroll);
          } else {
            i = _getSize(pin, direction);
            i && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
          }
          if (useFixedPosition) {
            override = {
              top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
              left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
              boxSizing: "border-box",
              position: "fixed"
            };
            override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
            override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
            override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
            override[_padding] = cs2[_padding];
            override[_padding + _Top] = cs2[_padding + _Top];
            override[_padding + _Right] = cs2[_padding + _Right];
            override[_padding + _Bottom] = cs2[_padding + _Bottom];
            override[_padding + _Left] = cs2[_padding + _Left];
            pinActiveState = _copyState(pinOriginalState, override, pinReparent);
            _refreshingAll && scrollFunc(0);
          }
          if (animation) {
            initted = animation._initted;
            _suppressOverwrites2(1);
            animation.render(animation.duration(), true, true);
            pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
            pinMoves = Math.abs(change - pinChange) > 1;
            useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
            animation.render(0, true, true);
            initted || animation.invalidate(true);
            animation.parent || animation.totalTime(animation.totalTime());
            _suppressOverwrites2(0);
          } else {
            pinChange = change;
          }
          forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
        } else if (trigger && scrollFunc() && !containerAnimation) {
          bounds = trigger.parentNode;
          while (bounds && bounds !== _body2) {
            if (bounds._pinOffset) {
              start -= bounds._pinOffset;
              end -= bounds._pinOffset;
            }
            bounds = bounds.parentNode;
          }
        }
        revertedPins && revertedPins.forEach(function(t) {
          return t.revert(false, true);
        });
        self.start = start;
        self.end = end;
        scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
        if (!containerAnimation && !_refreshingAll) {
          scroll1 < prevScroll && scrollFunc(prevScroll);
          self.scroll.rec = 0;
        }
        self.revert(false, true);
        lastRefresh = _getTime2();
        if (snapDelayedCall) {
          lastSnap = -1;
          snapDelayedCall.restart(true);
        }
        _refreshing = 0;
        animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
        if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
          animation && !isToggle && (animation._initted || prevProgress || animation.vars.immediateRender !== false) && animation.totalProgress(containerAnimation && start < -1e-3 && !prevProgress ? gsap3.utils.normalize(start, end, 0) : prevProgress, true);
          self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
        }
        pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
        scrubTween && scrubTween.invalidate();
        if (!isNaN(markerStartOffset)) {
          markerStartOffset -= gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset -= gsap3.getProperty(markerEndTrigger, direction.p);
          _shiftMarker(markerStartTrigger, direction, markerStartOffset);
          _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
          _shiftMarker(markerEndTrigger, direction, markerEndOffset);
          _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
        }
        isFirstRefresh && !_refreshingAll && self.update();
        if (onRefresh && !_refreshingAll && !executingOnRefresh) {
          executingOnRefresh = true;
          onRefresh(self);
          executingOnRefresh = false;
        }
      };
      self.getVelocity = function() {
        return (scrollFunc() - scroll2) / (_getTime2() - _time2) * 1e3 || 0;
      };
      self.endAnimation = function() {
        _endAnimation(self.callbackAnimation);
        if (animation) {
          scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
        }
      };
      self.labelToScroll = function(label) {
        return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
      };
      self.getTrailing = function(name) {
        var i = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
        return (_isString3(name) ? a.filter(function(t) {
          return t.vars.preventOverlaps === name;
        }) : a).filter(function(t) {
          return self.direction > 0 ? t.end <= start : t.start >= end;
        });
      };
      self.update = function(reset, recordVelocity, forceFake) {
        if (containerAnimation && !forceFake && !reset) {
          return;
        }
        var scroll = _refreshingAll === true ? prevScroll : self.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress2 = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
        if (recordVelocity) {
          scroll2 = scroll1;
          scroll1 = containerAnimation ? scrollFunc() : scroll;
          if (snap3) {
            snap22 = snap1;
            snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
          }
        }
        if (anticipatePin && pin && !_refreshing && !_startup2 && _lastScrollTime) {
          if (!clipped && start < scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 1e-4;
          } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 0.9999;
          }
        }
        if (clipped !== prevProgress2 && self.enabled) {
          isActive = self.isActive = !!clipped && clipped < 1;
          wasActive = !!prevProgress2 && prevProgress2 < 1;
          toggled = isActive !== wasActive;
          stateChanged = toggled || !!clipped !== !!prevProgress2;
          self.direction = clipped > prevProgress2 ? 1 : -1;
          self.progress = clipped;
          if (stateChanged && !_refreshing) {
            toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
            if (isToggle) {
              action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
              isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
            }
          }
          preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction3(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t) {
            return t.endAnimation();
          }));
          if (!isToggle) {
            if (scrubTween && !_refreshing && !_startup2) {
              scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
              if (scrubTween.resetTo) {
                scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
              } else {
                scrubTween.vars.totalProgress = clipped;
                scrubTween.invalidate().restart();
              }
            } else if (animation) {
              animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
            }
          }
          if (pin) {
            reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
            if (!useFixedPosition) {
              pinSetter(_round3(pinStart + pinChange * clipped));
            } else if (stateChanged) {
              isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
              if (pinReparent) {
                if (!reset && (isActive || isAtMax)) {
                  var bounds = _getBounds(pin, true), _offset = scroll - start;
                  _reparent(pin, _body2, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                } else {
                  _reparent(pin, spacer);
                }
              }
              _setState(isActive || isAtMax ? pinActiveState : pinState);
              pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
            }
          }
          snap3 && !tweenTo.tween && !_refreshing && !_startup2 && snapDelayedCall.restart(true);
          toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function(el) {
            return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
          });
          onUpdate && !isToggle && !reset && onUpdate(self);
          if (stateChanged && !_refreshing) {
            if (isToggle) {
              if (isTakingAction) {
                if (action === "complete") {
                  animation.pause().totalProgress(1);
                } else if (action === "reset") {
                  animation.restart(true).pause();
                } else if (action === "restart") {
                  animation.restart(true);
                } else {
                  animation[action]();
                }
              }
              onUpdate && onUpdate(self);
            }
            if (toggled || !_limitCallbacks) {
              onToggle && toggled && _callback3(self, onToggle);
              callbacks[toggleState] && _callback3(self, callbacks[toggleState]);
              once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
              if (!toggled) {
                toggleState = clipped === 1 ? 1 : 3;
                callbacks[toggleState] && _callback3(self, callbacks[toggleState]);
              }
            }
            if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber3(fastScrollEnd) ? fastScrollEnd : 2500)) {
              _endAnimation(self.callbackAnimation);
              scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
            }
          } else if (isToggle && onUpdate && !_refreshing) {
            onUpdate(self);
          }
        }
        if (markerEndSetter) {
          var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
          markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
          markerEndSetter(n);
        }
        caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
      };
      self.enable = function(reset, refresh) {
        if (!self.enabled) {
          self.enabled = true;
          _addListener3(scroller, "resize", _onResize);
          isViewport || _addListener3(scroller, "scroll", _onScroll3);
          onRefreshInit && _addListener3(ScrollTrigger4, "refreshInit", onRefreshInit);
          if (reset !== false) {
            self.progress = prevProgress = 0;
            scroll1 = scroll2 = lastSnap = scrollFunc();
          }
          refresh !== false && self.refresh();
        }
      };
      self.getTween = function(snap4) {
        return snap4 && tweenTo ? tweenTo.tween : scrubTween;
      };
      self.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
        if (containerAnimation) {
          var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
          newStart = st.start + _change * newStart / duration;
          newEnd = st.start + _change * newEnd / duration;
        }
        self.refresh(false, false, {
          start: _keepClamp(newStart, keepClamp && !!self._startClamp),
          end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
        }, pinOffset);
        self.update();
      };
      self.adjustPinSpacing = function(amount) {
        if (spacerState && amount) {
          var i = spacerState.indexOf(direction.d) + 1;
          spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
          spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
          _setState(spacerState);
        }
      };
      self.disable = function(reset, allowAnimation) {
        if (self.enabled) {
          reset !== false && self.revert(true, true);
          self.enabled = self.isActive = false;
          allowAnimation || scrubTween && scrubTween.pause();
          prevScroll = 0;
          pinCache && (pinCache.uncache = 1);
          onRefreshInit && _removeListener3(ScrollTrigger4, "refreshInit", onRefreshInit);
          if (snapDelayedCall) {
            snapDelayedCall.pause();
            tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
          }
          if (!isViewport) {
            var i = _triggers.length;
            while (i--) {
              if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
                return;
              }
            }
            _removeListener3(scroller, "resize", _onResize);
            isViewport || _removeListener3(scroller, "scroll", _onScroll3);
          }
        }
      };
      self.kill = function(revert, allowAnimation) {
        self.disable(revert, allowAnimation);
        scrubTween && !allowAnimation && scrubTween.kill();
        id && delete _ids[id];
        var i = _triggers.indexOf(self);
        i >= 0 && _triggers.splice(i, 1);
        i === _i && _direction > 0 && _i--;
        i = 0;
        _triggers.forEach(function(t) {
          return t.scroller === self.scroller && (i = 1);
        });
        i || _refreshingAll || (self.scroll.rec = 0);
        if (animation) {
          animation.scrollTrigger = null;
          revert && animation.revert({
            kill: false
          });
          allowAnimation || animation.kill();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
          return m.parentNode && m.parentNode.removeChild(m);
        });
        _primary === self && (_primary = 0);
        if (pin) {
          pinCache && (pinCache.uncache = 1);
          i = 0;
          _triggers.forEach(function(t) {
            return t.pin === pin && i++;
          });
          i || (pinCache.spacer = 0);
        }
        vars.onKill && vars.onKill(self);
      };
      _triggers.push(self);
      self.enable(false, false);
      customRevertReturn && customRevertReturn(self);
      if (animation && animation.add && !change) {
        var updateFunc = self.update;
        self.update = function() {
          self.update = updateFunc;
          _scrollers.cache++;
          start || end || self.refresh();
        };
        gsap3.delayedCall(0.01, self.update);
        change = 0.01;
        start = end = 0;
      } else {
        self.refresh();
      }
      pin && _queueRefreshAll();
    };
    ScrollTrigger4.register = function register2(core) {
      if (!_coreInitted3) {
        gsap3 = core || _getGSAP3();
        _windowExists5() && window.document && ScrollTrigger4.enable();
        _coreInitted3 = _enabled;
      }
      return _coreInitted3;
    };
    ScrollTrigger4.defaults = function defaults3(config3) {
      if (config3) {
        for (var p in config3) {
          _defaults2[p] = config3[p];
        }
      }
      return _defaults2;
    };
    ScrollTrigger4.disable = function disable(reset, kill) {
      _enabled = 0;
      _triggers.forEach(function(trigger) {
        return trigger[kill ? "kill" : "disable"](reset);
      });
      _removeListener3(_win4, "wheel", _onScroll3);
      _removeListener3(_doc4, "scroll", _onScroll3);
      clearInterval(_syncInterval);
      _removeListener3(_doc4, "touchcancel", _passThrough3);
      _removeListener3(_body2, "touchstart", _passThrough3);
      _multiListener(_removeListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
      _multiListener(_removeListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
      _resizeDelay.kill();
      _iterateAutoRefresh(_removeListener3);
      for (var i = 0; i < _scrollers.length; i += 3) {
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
      }
    };
    ScrollTrigger4.enable = function enable() {
      _win4 = window;
      _doc4 = document;
      _docEl2 = _doc4.documentElement;
      _body2 = _doc4.body;
      if (gsap3) {
        _toArray = gsap3.utils.toArray;
        _clamp4 = gsap3.utils.clamp;
        _context3 = gsap3.core.context || _passThrough3;
        _suppressOverwrites2 = gsap3.core.suppressOverwrites || _passThrough3;
        _scrollRestoration = _win4.history.scrollRestoration || "auto";
        _lastScroll = _win4.pageYOffset || 0;
        gsap3.core.globals("ScrollTrigger", ScrollTrigger4);
        if (_body2) {
          _enabled = 1;
          _div100vh = document.createElement("div");
          _div100vh.style.height = "100vh";
          _div100vh.style.position = "absolute";
          _refresh100vh();
          _rafBugFix();
          Observer.register(gsap3);
          ScrollTrigger4.isTouch = Observer.isTouch;
          _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
          _ignoreMobileResize = Observer.isTouch === 1;
          _addListener3(_win4, "wheel", _onScroll3);
          _root2 = [_win4, _doc4, _docEl2, _body2];
          if (gsap3.matchMedia) {
            ScrollTrigger4.matchMedia = function(vars) {
              var mm = gsap3.matchMedia(), p;
              for (p in vars) {
                mm.add(p, vars[p]);
              }
              return mm;
            };
            gsap3.addEventListener("matchMediaInit", function() {
              return _revertAll();
            });
            gsap3.addEventListener("matchMediaRevert", function() {
              return _revertRecorded();
            });
            gsap3.addEventListener("matchMedia", function() {
              _refreshAll(0, 1);
              _dispatch3("matchMedia");
            });
            gsap3.matchMedia().add("(orientation: portrait)", function() {
              _setBaseDimensions();
              return _setBaseDimensions;
            });
          } else {
            console.warn("Requires GSAP 3.11.0 or later");
          }
          _setBaseDimensions();
          _addListener3(_doc4, "scroll", _onScroll3);
          var bodyHasStyle = _body2.hasAttribute("style"), bodyStyle = _body2.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap3.core.Animation.prototype, bounds, i;
          AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
            value: function value() {
              return this.time(-0.01, true);
            }
          });
          bodyStyle.borderTopStyle = "solid";
          bounds = _getBounds(_body2);
          _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
          _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
          border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
          if (!bodyHasStyle) {
            _body2.setAttribute("style", "");
            _body2.removeAttribute("style");
          }
          _syncInterval = setInterval(_sync, 250);
          gsap3.delayedCall(0.5, function() {
            return _startup2 = 0;
          });
          _addListener3(_doc4, "touchcancel", _passThrough3);
          _addListener3(_body2, "touchstart", _passThrough3);
          _multiListener(_addListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
          _multiListener(_addListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
          _transformProp2 = gsap3.utils.checkPrefix("transform");
          _stateProps.push(_transformProp2);
          _coreInitted3 = _getTime2();
          _resizeDelay = gsap3.delayedCall(0.2, _refreshAll).pause();
          _autoRefresh = [_doc4, "visibilitychange", function() {
            var w = _win4.innerWidth, h = _win4.innerHeight;
            if (_doc4.hidden) {
              _prevWidth = w;
              _prevHeight = h;
            } else if (_prevWidth !== w || _prevHeight !== h) {
              _onResize();
            }
          }, _doc4, "DOMContentLoaded", _refreshAll, _win4, "load", _refreshAll, _win4, "resize", _onResize];
          _iterateAutoRefresh(_addListener3);
          _triggers.forEach(function(trigger) {
            return trigger.enable(0, 1);
          });
          for (i = 0; i < _scrollers.length; i += 3) {
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
          }
        }
      }
    };
    ScrollTrigger4.config = function config3(vars) {
      "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
      var ms = vars.syncInterval;
      ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
      "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger4.isTouch === 1 && vars.ignoreMobileResize);
      if ("autoRefreshEvents" in vars) {
        _iterateAutoRefresh(_removeListener3) || _iterateAutoRefresh(_addListener3, vars.autoRefreshEvents || "none");
        _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
      }
    };
    ScrollTrigger4.scrollerProxy = function scrollerProxy(target, vars) {
      var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = _isViewport3(t);
      if (~i) {
        _scrollers.splice(i, isViewport ? 6 : 2);
      }
      if (vars) {
        isViewport ? _proxies.unshift(_win4, vars, _body2, vars, _docEl2, vars) : _proxies.unshift(t, vars);
      }
    };
    ScrollTrigger4.clearMatchMedia = function clearMatchMedia(query) {
      _triggers.forEach(function(t) {
        return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
      });
    };
    ScrollTrigger4.isInViewport = function isInViewport(element, ratio, horizontal) {
      var bounds = (_isString3(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
      return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win4.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win4.innerHeight;
    };
    ScrollTrigger4.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
      _isString3(element) && (element = _getTarget(element));
      var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
      return horizontal ? (bounds.left + offset) / _win4.innerWidth : (bounds.top + offset) / _win4.innerHeight;
    };
    ScrollTrigger4.killAll = function killAll(allowListeners) {
      _triggers.slice(0).forEach(function(t) {
        return t.vars.id !== "ScrollSmoother" && t.kill();
      });
      if (allowListeners !== true) {
        var listeners = _listeners2.killAll || [];
        _listeners2 = {};
        listeners.forEach(function(f) {
          return f();
        });
      }
    };
    return ScrollTrigger4;
  })();
  ScrollTrigger2.version = "3.13.0";
  ScrollTrigger2.saveStyles = function(targets) {
    return targets ? _toArray(targets).forEach(function(target) {
      if (target && target.style) {
        var i = _savedStyles.indexOf(target);
        i >= 0 && _savedStyles.splice(i, 5);
        _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap3.core.getCache(target), _context3());
      }
    }) : _savedStyles;
  };
  ScrollTrigger2.revert = function(soft, media) {
    return _revertAll(!soft, media);
  };
  ScrollTrigger2.create = function(vars, animation) {
    return new ScrollTrigger2(vars, animation);
  };
  ScrollTrigger2.refresh = function(safe) {
    return safe ? _onResize(true) : (_coreInitted3 || ScrollTrigger2.register()) && _refreshAll(true);
  };
  ScrollTrigger2.update = function(force) {
    return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
  };
  ScrollTrigger2.clearScrollMemory = _clearScrollMemory;
  ScrollTrigger2.maxScroll = function(element, horizontal) {
    return _maxScroll(element, horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getScrollFunc = function(element, horizontal) {
    return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getById = function(id) {
    return _ids[id];
  };
  ScrollTrigger2.getAll = function() {
    return _triggers.filter(function(t) {
      return t.vars.id !== "ScrollSmoother";
    });
  };
  ScrollTrigger2.isScrolling = function() {
    return !!_lastScrollTime;
  };
  ScrollTrigger2.snapDirectional = _snapDirectional;
  ScrollTrigger2.addEventListener = function(type, callback) {
    var a = _listeners2[type] || (_listeners2[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  };
  ScrollTrigger2.removeEventListener = function(type, callback) {
    var a = _listeners2[type], i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  };
  ScrollTrigger2.batch = function(targets, vars) {
    var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
      var elements = [], triggers = [], delay = gsap3.delayedCall(interval, function() {
        callback(elements, triggers);
        elements = [];
        triggers = [];
      }).pause();
      return function(self) {
        elements.length || delay.restart(true);
        elements.push(self.trigger);
        triggers.push(self);
        batchMax <= elements.length && delay.progress(1);
      };
    }, p;
    for (p in vars) {
      varsCopy[p] = p.substr(0, 2) === "on" && _isFunction3(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
    }
    if (_isFunction3(batchMax)) {
      batchMax = batchMax();
      _addListener3(ScrollTrigger2, "refresh", function() {
        return batchMax = vars.batchMax();
      });
    }
    _toArray(targets).forEach(function(target) {
      var config3 = {};
      for (p in varsCopy) {
        config3[p] = varsCopy[p];
      }
      config3.trigger = target;
      result.push(ScrollTrigger2.create(config3));
    });
    return result;
  };
  var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
    current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
    return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
  };
  var _allowNativePanning = function _allowNativePanning2(target, direction) {
    if (direction === true) {
      target.style.removeProperty("touch-action");
    } else {
      target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
    }
    target === _docEl2 && _allowNativePanning2(_body2, direction);
  };
  var _overflow = {
    auto: 1,
    scroll: 1
  };
  var _nestedScroll = function _nestedScroll2(_ref5) {
    var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
    var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache2 = node._gsap || gsap3.core.getCache(node), time = _getTime2(), cs;
    if (!cache2._isScrollT || time - cache2._isScrollT > 2e3) {
      while (node && node !== _body2 && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
        node = node.parentNode;
      }
      cache2._isScroll = node && node !== target && !_isViewport3(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
      cache2._isScrollT = time;
    }
    if (cache2._isScroll || axis === "x") {
      event.stopPropagation();
      event._gsapAllow = true;
    }
  };
  var _inputObserver = function _inputObserver2(target, type, inputs, nested) {
    return Observer.create({
      target,
      capture: true,
      debounce: false,
      lockAxis: true,
      type,
      onWheel: nested = nested && _nestedScroll,
      onPress: nested,
      onDrag: nested,
      onScroll: nested,
      onEnable: function onEnable() {
        return inputs && _addListener3(_doc4, Observer.eventTypes[0], _captureInputs, false, true);
      },
      onDisable: function onDisable() {
        return _removeListener3(_doc4, Observer.eventTypes[0], _captureInputs, true);
      }
    });
  };
  var _inputExp = /(input|label|select|textarea)/i;
  var _inputIsFocused;
  var _captureInputs = function _captureInputs2(e) {
    var isInput = _inputExp.test(e.target.tagName);
    if (isInput || _inputIsFocused) {
      e._gsapAllow = true;
      _inputIsFocused = isInput;
    }
  };
  var _getScrollNormalizer = function _getScrollNormalizer2(vars) {
    _isObject3(vars) || (vars = {});
    vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
    vars.type || (vars.type = "wheel,touch");
    vars.debounce = !!vars.debounce;
    vars.id = vars.id || "normalizer";
    var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self, maxY, target = _getTarget(vars.target) || _docEl2, smoother = gsap3.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win4.visualViewport ? _win4.visualViewport.scale * _win4.visualViewport.width : _win4.outerWidth) / _win4.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction3(momentum) ? function() {
      return momentum(self);
    } : function() {
      return momentum || 2.8;
    }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
      return skipTouchMove = false;
    }, scrollClampX = _passThrough3, scrollClampY = _passThrough3, updateClamps = function updateClamps2() {
      maxY = _maxScroll(target, _vertical);
      scrollClampY = _clamp4(_fixIOSBug ? 1 : 0, maxY);
      normalizeScrollX && (scrollClampX = _clamp4(0, _maxScroll(target, _horizontal)));
      lastRefreshID = _refreshID;
    }, removeContentOffset = function removeContentOffset2() {
      content._gsap.y = _round3(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
      content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
      scrollFuncY.offset = scrollFuncY.cacheID = 0;
    }, ignoreDrag = function ignoreDrag2() {
      if (skipTouchMove) {
        requestAnimationFrame(resumeTouchMove);
        var offset = _round3(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
        if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
          scrollFuncY.offset = scroll - scrollFuncY.v;
          var y = _round3((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
          content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
          content._gsap.y = y + "px";
          scrollFuncY.cacheID = _scrollers.cache;
          _updateAll();
        }
        return true;
      }
      scrollFuncY.offset && removeContentOffset();
      skipTouchMove = true;
    }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize2() {
      updateClamps();
      if (tween.isActive() && tween.vars.scrollY > maxY) {
        scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
      }
    };
    content && gsap3.set(content, {
      y: "+=0"
    });
    vars.ignoreCheck = function(e) {
      return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
    };
    vars.onPress = function() {
      skipTouchMove = false;
      var prevScale = scale;
      scale = _round3((_win4.visualViewport && _win4.visualViewport.scale || 1) / initialScale);
      tween.pause();
      prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
      startScrollX = scrollFuncX();
      startScrollY = scrollFuncY();
      updateClamps();
      lastRefreshID = _refreshID;
    };
    vars.onRelease = vars.onGestureStart = function(self2, wasDragging) {
      scrollFuncY.offset && removeContentOffset();
      if (!wasDragging) {
        onStopDelayedCall.restart(true);
      } else {
        _scrollers.cache++;
        var dur = resolveMomentumDuration(), currentScroll, endScroll;
        if (normalizeScrollX) {
          currentScroll = scrollFuncX();
          endScroll = currentScroll + dur * 0.05 * -self2.velocityX / 0.227;
          dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
          tween.vars.scrollX = scrollClampX(endScroll);
        }
        currentScroll = scrollFuncY();
        endScroll = currentScroll + dur * 0.05 * -self2.velocityY / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
        tween.vars.scrollY = scrollClampY(endScroll);
        tween.invalidate().duration(dur).play(0.01);
        if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
          gsap3.to({}, {
            onUpdate: onResize,
            duration: dur
          });
        }
      }
      onRelease && onRelease(self2);
    };
    vars.onWheel = function() {
      tween._ts && tween.pause();
      if (_getTime2() - wheelRefresh > 1e3) {
        lastRefreshID = 0;
        wheelRefresh = _getTime2();
      }
    };
    vars.onChange = function(self2, dx, dy, xArray, yArray) {
      _refreshID !== lastRefreshID && updateClamps();
      dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self2.startX - self2.x) : scrollFuncX() + dx - xArray[1]));
      if (dy) {
        scrollFuncY.offset && removeContentOffset();
        var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self2.startY - self2.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
        isTouch && y !== yClamped && (startScrollY += yClamped - y);
        scrollFuncY(yClamped);
      }
      (dy || dx) && _updateAll();
    };
    vars.onEnable = function() {
      _allowNativePanning(target, normalizeScrollX ? false : "x");
      ScrollTrigger2.addEventListener("refresh", onResize);
      _addListener3(_win4, "resize", onResize);
      if (scrollFuncY.smooth) {
        scrollFuncY.target.style.scrollBehavior = "auto";
        scrollFuncY.smooth = scrollFuncX.smooth = false;
      }
      inputObserver.enable();
    };
    vars.onDisable = function() {
      _allowNativePanning(target, true);
      _removeListener3(_win4, "resize", onResize);
      ScrollTrigger2.removeEventListener("refresh", onResize);
      inputObserver.kill();
    };
    vars.lockAxis = vars.lockAxis !== false;
    self = new Observer(vars);
    self.iOS = _fixIOSBug;
    _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
    _fixIOSBug && gsap3.ticker.add(_passThrough3);
    onStopDelayedCall = self._dc;
    tween = gsap3.to(self, {
      ease: "power4",
      paused: true,
      inherit: false,
      scrollX: normalizeScrollX ? "+=0.1" : "+=0",
      scrollY: "+=0.1",
      modifiers: {
        scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
          return tween.pause();
        })
      },
      onUpdate: _updateAll,
      onComplete: onStopDelayedCall.vars.onComplete
    });
    return self;
  };
  ScrollTrigger2.sort = function(func) {
    if (_isFunction3(func)) {
      return _triggers.sort(func);
    }
    var scroll = _win4.pageYOffset || 0;
    ScrollTrigger2.getAll().forEach(function(t) {
      return t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + _win4.innerHeight;
    });
    return _triggers.sort(func || function(a, b2) {
      return (a.vars.refreshPriority || 0) * -1e6 + (a.vars.containerAnimation ? 1e6 : a._sortY) - ((b2.vars.containerAnimation ? 1e6 : b2._sortY) + (b2.vars.refreshPriority || 0) * -1e6);
    });
  };
  ScrollTrigger2.observe = function(vars) {
    return new Observer(vars);
  };
  ScrollTrigger2.normalizeScroll = function(vars) {
    if (typeof vars === "undefined") {
      return _normalizer2;
    }
    if (vars === true && _normalizer2) {
      return _normalizer2.enable();
    }
    if (vars === false) {
      _normalizer2 && _normalizer2.kill();
      _normalizer2 = vars;
      return;
    }
    var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
    _normalizer2 && _normalizer2.target === normalizer.target && _normalizer2.kill();
    _isViewport3(normalizer.target) && (_normalizer2 = normalizer);
    return normalizer;
  };
  ScrollTrigger2.core = {
    // smaller file size way to leverage in ScrollSmoother and Observer
    _getVelocityProp,
    _inputObserver,
    _scrollers,
    _proxies,
    bridge: {
      // when normalizeScroll sets the scroll position (ss = setScroll)
      ss: function ss() {
        _lastScrollTime || _dispatch3("scrollStart");
        _lastScrollTime = _getTime2();
      },
      // a way to get the _refreshing value in Observer
      ref: function ref() {
        return _refreshing;
      }
    }
  };
  _getGSAP3() && gsap3.registerPlugin(ScrollTrigger2);

  // node_modules/gsap/ScrollSmoother.js
  init_define_import_meta_env();
  function _defineProperties2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties2(Constructor, staticProps);
    return Constructor;
  }
  var gsap4;
  var _coreInitted4;
  var _win5;
  var _doc5;
  var _docEl3;
  var _body3;
  var _root3;
  var _toArray2;
  var _clamp5;
  var ScrollTrigger3;
  var _mainInstance;
  var _expo;
  var _getVelocityProp3;
  var _inputObserver3;
  var _context4;
  var _onResizeDelayedCall;
  var _windowExists7 = function _windowExists8() {
    return typeof window !== "undefined";
  };
  var _getGSAP5 = function _getGSAP6() {
    return gsap4 || _windowExists7() && (gsap4 = window.gsap) && gsap4.registerPlugin && gsap4;
  };
  var _round5 = function _round6(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _maxScroll3 = function _maxScroll4(scroller) {
    return ScrollTrigger3.maxScroll(scroller || _win5);
  };
  var _autoDistance = function _autoDistance2(el, progress) {
    var parent = el.parentNode || _docEl3, b1 = el.getBoundingClientRect(), b2 = parent.getBoundingClientRect(), gapTop = b2.top - b1.top, gapBottom = b2.bottom - b1.bottom, change = (Math.abs(gapTop) > Math.abs(gapBottom) ? gapTop : gapBottom) / (1 - progress), offset = -change * progress, ratio, extraChange;
    if (change > 0) {
      ratio = b2.height / (_win5.innerHeight + b2.height);
      extraChange = ratio === 0.5 ? b2.height * 2 : Math.min(b2.height, Math.abs(-change * ratio / (2 * ratio - 1))) * 2 * (progress || 1);
      offset += progress ? -extraChange * progress : -extraChange / 2;
      change += extraChange;
    }
    return {
      change,
      offset
    };
  };
  var _wrap = function _wrap2(el) {
    var wrapper = _doc5.querySelector(".ScrollSmoother-wrapper");
    if (!wrapper) {
      wrapper = _doc5.createElement("div");
      wrapper.classList.add("ScrollSmoother-wrapper");
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    }
    return wrapper;
  };
  var ScrollSmoother = /* @__PURE__ */ (function() {
    function ScrollSmoother2(vars) {
      var _this = this;
      _coreInitted4 || ScrollSmoother2.register(gsap4) || console.warn("Please gsap.registerPlugin(ScrollSmoother)");
      vars = this.vars = vars || {};
      _mainInstance && _mainInstance.kill();
      _mainInstance = this;
      _context4(this);
      var _vars = vars, smoothTouch = _vars.smoothTouch, _onUpdate = _vars.onUpdate, onStop = _vars.onStop, smooth = _vars.smooth, onFocusIn = _vars.onFocusIn, normalizeScroll = _vars.normalizeScroll, wholePixels = _vars.wholePixels, content, wrapper, height, mainST, effects, sections, intervalID, wrapperCSS, contentCSS, paused, pausedNormalizer, recordedRefreshScroll, recordedRefreshScrub, allowUpdates, self = this, effectsPrefix = vars.effectsPrefix || "", scrollFunc = ScrollTrigger3.getScrollFunc(_win5), smoothDuration = ScrollTrigger3.isTouch === 1 ? smoothTouch === true ? 0.8 : parseFloat(smoothTouch) || 0 : smooth === 0 || smooth === false ? 0 : parseFloat(smooth) || 0.8, speed = smoothDuration && +vars.speed || 1, currentY = 0, delta = 0, startupPhase = 1, tracker = _getVelocityProp3(0), updateVelocity = function updateVelocity2() {
        return tracker.update(-currentY);
      }, scroll = {
        y: 0
      }, removeScroll = function removeScroll2() {
        return content.style.overflow = "visible";
      }, isProxyScrolling, killScrub = function killScrub2(trigger) {
        trigger.update();
        var scrub = trigger.getTween();
        if (scrub) {
          scrub.pause();
          scrub._time = scrub._dur;
          scrub._tTime = scrub._tDur;
        }
        isProxyScrolling = false;
        trigger.animation.progress(trigger.progress, true);
      }, render4 = function render5(y, force) {
        if (y !== currentY && !paused || force) {
          wholePixels && (y = Math.round(y));
          if (smoothDuration) {
            content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
            content._gsap.y = y + "px";
          }
          delta = y - currentY;
          currentY = y;
          ScrollTrigger3.isUpdating || ScrollSmoother2.isRefreshing || ScrollTrigger3.update();
        }
      }, scrollTop = function scrollTop2(value) {
        if (arguments.length) {
          value < 0 && (value = 0);
          scroll.y = -value;
          isProxyScrolling = true;
          paused ? currentY = -value : render4(-value);
          ScrollTrigger3.isRefreshing ? mainST.update() : scrollFunc(value / speed);
          return this;
        }
        return -currentY;
      }, resizeObserver = typeof ResizeObserver !== "undefined" && vars.autoResize !== false && new ResizeObserver(function() {
        if (!ScrollTrigger3.isRefreshing) {
          var max = _maxScroll3(wrapper) * speed;
          max < -currentY && scrollTop(max);
          _onResizeDelayedCall.restart(true);
        }
      }), lastFocusElement, _onFocusIn = function _onFocusIn2(e) {
        wrapper.scrollTop = 0;
        if (e.target.contains && e.target.contains(wrapper) || onFocusIn && onFocusIn(_this, e) === false) {
          return;
        }
        ScrollTrigger3.isInViewport(e.target) || e.target === lastFocusElement || _this.scrollTo(e.target, false, "center center");
        lastFocusElement = e.target;
      }, _transformPosition = function _transformPosition2(position, st) {
        if (position < st.start) {
          return position;
        }
        var ratio = isNaN(st.ratio) ? 1 : st.ratio, change = st.end - st.start, distance = position - st.start, offset = st.offset || 0, pins = st.pins || [], pinOffset = pins.offset || 0, progressOffset = st._startClamp && st.start <= 0 || st.pins && st.pins.offset ? 0 : st._endClamp && st.end === _maxScroll3() ? 1 : 0.5;
        pins.forEach(function(p) {
          change -= p.distance;
          if (p.nativeStart <= position) {
            distance -= p.distance;
          }
        });
        if (pinOffset) {
          distance *= (change - pinOffset / ratio) / change;
        }
        return position + (distance - offset * progressOffset) / ratio - distance;
      }, adjustEffectRelatedTriggers = function adjustEffectRelatedTriggers2(st, triggers, partial) {
        partial || (st.pins.length = st.pins.offset = 0);
        var pins = st.pins, markers = st.markers, dif, isClamped, start, end, nativeStart, nativeEnd, i, trig;
        for (i = 0; i < triggers.length; i++) {
          trig = triggers[i];
          if (st.trigger && trig.trigger && st !== trig && (trig.trigger === st.trigger || trig.pinnedContainer === st.trigger || st.trigger.contains(trig.trigger))) {
            nativeStart = trig._startNative || trig._startClamp || trig.start;
            nativeEnd = trig._endNative || trig._endClamp || trig.end;
            start = _transformPosition(nativeStart, st);
            end = trig.pin && nativeEnd > 0 ? start + (nativeEnd - nativeStart) : _transformPosition(nativeEnd, st);
            trig.setPositions(start, end, true, (trig._startClamp ? Math.max(0, start) : start) - nativeStart);
            trig.markerStart && markers.push(gsap4.quickSetter([trig.markerStart, trig.markerEnd], "y", "px"));
            if (trig.pin && trig.end > 0 && !partial) {
              dif = trig.end - trig.start;
              isClamped = st._startClamp && trig.start < 0;
              if (isClamped) {
                if (st.start > 0) {
                  st.setPositions(0, st.end + (st._startNative - st.start), true);
                  adjustEffectRelatedTriggers2(st, triggers);
                  return;
                }
                dif += trig.start;
                pins.offset = -trig.start;
              }
              pins.push({
                start: trig.start,
                nativeStart,
                end: trig.end,
                distance: dif,
                trig
              });
              st.setPositions(st.start, st.end + (isClamped ? -trig.start : dif), true);
            }
          }
        }
      }, adjustParallaxPosition = function adjustParallaxPosition2(triggers, createdAfterEffectWasApplied) {
        effects.forEach(function(st) {
          return adjustEffectRelatedTriggers(st, triggers, createdAfterEffectWasApplied);
        });
      }, onRefresh = function onRefresh2() {
        _docEl3 = _doc5.documentElement;
        _body3 = _doc5.body;
        removeScroll();
        requestAnimationFrame(removeScroll);
        if (effects) {
          ScrollTrigger3.getAll().forEach(function(st) {
            st._startNative = st.start;
            st._endNative = st.end;
          });
          effects.forEach(function(st) {
            var start = st._startClamp || st.start, end = st.autoSpeed ? Math.min(_maxScroll3(), st.end) : start + Math.abs((st.end - start) / st.ratio), offset = end - st.end;
            start -= offset / 2;
            end -= offset / 2;
            if (start > end) {
              var s = start;
              start = end;
              end = s;
            }
            if (st._startClamp && start < 0) {
              end = st.ratio < 0 ? _maxScroll3() : st.end / st.ratio;
              offset = end - st.end;
              start = 0;
            } else if (st.ratio < 0 || st._endClamp && end >= _maxScroll3()) {
              end = _maxScroll3();
              start = st.ratio < 0 ? 0 : st.ratio > 1 ? 0 : end - (end - st.start) / st.ratio;
              offset = (end - start) * st.ratio - (st.end - st.start);
            }
            st.offset = offset || 1e-4;
            st.pins.length = st.pins.offset = 0;
            st.setPositions(start, end, true);
          });
          adjustParallaxPosition(ScrollTrigger3.sort());
        }
        tracker.reset();
      }, addOnRefresh = function addOnRefresh2() {
        return ScrollTrigger3.addEventListener("refresh", onRefresh);
      }, restoreEffects = function restoreEffects2() {
        return effects && effects.forEach(function(st) {
          return st.vars.onRefresh(st);
        });
      }, revertEffects = function revertEffects2() {
        effects && effects.forEach(function(st) {
          return st.vars.onRefreshInit(st);
        });
        return restoreEffects;
      }, effectValueGetter = function effectValueGetter2(name, value, index, el) {
        return function() {
          var v = typeof value === "function" ? value(index, el) : value;
          v || v === 0 || (v = el.getAttribute("data-" + effectsPrefix + name) || (name === "speed" ? 1 : 0));
          el.setAttribute("data-" + effectsPrefix + name, v);
          var clamp3 = (v + "").substr(0, 6) === "clamp(";
          return {
            clamp: clamp3,
            value: clamp3 ? v.substr(6, v.length - 7) : v
          };
        };
      }, createEffect = function createEffect2(el, speed2, lag, index, effectsPadding) {
        effectsPadding = (typeof effectsPadding === "function" ? effectsPadding(index, el) : effectsPadding) || 0;
        var getSpeed = effectValueGetter("speed", speed2, index, el), getLag = effectValueGetter("lag", lag, index, el), startY = gsap4.getProperty(el, "y"), cache2 = el._gsap, ratio, st, autoSpeed, scrub, progressOffset, yOffset, pins = [], initDynamicValues = function initDynamicValues2() {
          speed2 = getSpeed();
          lag = parseFloat(getLag().value);
          ratio = parseFloat(speed2.value) || 1;
          autoSpeed = speed2.value === "auto";
          progressOffset = autoSpeed || st && st._startClamp && st.start <= 0 || pins.offset ? 0 : st && st._endClamp && st.end === _maxScroll3() ? 1 : 0.5;
          scrub && scrub.kill();
          scrub = lag && gsap4.to(el, {
            ease: _expo,
            overwrite: false,
            y: "+=0",
            duration: lag
          });
          if (st) {
            st.ratio = ratio;
            st.autoSpeed = autoSpeed;
          }
        }, revert = function revert2() {
          cache2.y = startY + "px";
          cache2.renderTransform(1);
          initDynamicValues();
        }, markers = [], change = 0, updateChange = function updateChange2(self2) {
          if (autoSpeed) {
            revert();
            var auto = _autoDistance(el, _clamp5(0, 1, -self2.start / (self2.end - self2.start)));
            change = auto.change;
            yOffset = auto.offset;
          } else {
            yOffset = pins.offset || 0;
            change = (self2.end - self2.start - yOffset) * (1 - ratio);
          }
          pins.forEach(function(p) {
            return change -= p.distance * (1 - ratio);
          });
          self2.offset = change || 1e-3;
          self2.vars.onUpdate(self2);
          scrub && scrub.progress(1);
        };
        initDynamicValues();
        if (ratio !== 1 || autoSpeed || scrub) {
          st = ScrollTrigger3.create({
            trigger: autoSpeed ? el.parentNode : el,
            start: function start() {
              return speed2.clamp ? "clamp(top bottom+=" + effectsPadding + ")" : "top bottom+=" + effectsPadding;
            },
            end: function end() {
              return speed2.value < 0 ? "max" : speed2.clamp ? "clamp(bottom top-=" + effectsPadding + ")" : "bottom top-=" + effectsPadding;
            },
            scroller: wrapper,
            scrub: true,
            refreshPriority: -999,
            // must update AFTER any other ScrollTrigger pins
            onRefreshInit: revert,
            onRefresh: updateChange,
            onKill: function onKill(self2) {
              var i = effects.indexOf(self2);
              i >= 0 && effects.splice(i, 1);
              revert();
            },
            onUpdate: function onUpdate(self2) {
              var y = startY + change * (self2.progress - progressOffset), i = pins.length, extraY = 0, pin, scrollY, end;
              if (self2.offset) {
                if (i) {
                  scrollY = -currentY;
                  end = self2.end;
                  while (i--) {
                    pin = pins[i];
                    if (pin.trig.isActive || scrollY >= pin.start && scrollY <= pin.end) {
                      if (scrub) {
                        pin.trig.progress += pin.trig.direction < 0 ? 1e-3 : -1e-3;
                        pin.trig.update(0, 0, 1);
                        scrub.resetTo("y", parseFloat(cache2.y), -delta, true);
                        startupPhase && scrub.progress(1);
                      }
                      return;
                    }
                    scrollY > pin.end && (extraY += pin.distance);
                    end -= pin.distance;
                  }
                  y = startY + extraY + change * ((gsap4.utils.clamp(self2.start, self2.end, scrollY) - self2.start - extraY) / (end - self2.start) - progressOffset);
                }
                markers.length && !autoSpeed && markers.forEach(function(setter) {
                  return setter(y - extraY);
                });
                y = _round5(y + yOffset);
                if (scrub) {
                  scrub.resetTo("y", y, -delta, true);
                  startupPhase && scrub.progress(1);
                } else {
                  cache2.y = y + "px";
                  cache2.renderTransform(1);
                }
              }
            }
          });
          updateChange(st);
          gsap4.core.getCache(st.trigger).stRevert = revertEffects;
          st.startY = startY;
          st.pins = pins;
          st.markers = markers;
          st.ratio = ratio;
          st.autoSpeed = autoSpeed;
          el.style.willChange = "transform";
        }
        return st;
      };
      addOnRefresh();
      ScrollTrigger3.addEventListener("killAll", addOnRefresh);
      gsap4.delayedCall(0.5, function() {
        return startupPhase = 0;
      });
      this.scrollTop = scrollTop;
      this.scrollTo = function(target, smooth2, position) {
        var p = gsap4.utils.clamp(0, _maxScroll3(), isNaN(target) ? _this.offset(target, position, !!smooth2 && !paused) : +target);
        !smooth2 ? scrollTop(p) : paused ? gsap4.to(_this, {
          duration: smoothDuration,
          scrollTop: p,
          overwrite: "auto",
          ease: _expo
        }) : scrollFunc(p);
      };
      this.offset = function(target, position, ignoreSpeed) {
        target = _toArray2(target)[0];
        var cssText = target.style.cssText, st = ScrollTrigger3.create({
          trigger: target,
          start: position || "top top"
        }), y;
        if (effects) {
          startupPhase ? ScrollTrigger3.refresh() : adjustParallaxPosition([st], true);
        }
        y = st.start / (ignoreSpeed ? speed : 1);
        st.kill(false);
        target.style.cssText = cssText;
        gsap4.core.getCache(target).uncache = 1;
        return y;
      };
      function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible";
        _body3.style.height = _win5.innerHeight + (height - _win5.innerHeight) / speed + "px";
        return height - _win5.innerHeight;
      }
      this.content = function(element) {
        if (arguments.length) {
          var newContent = _toArray2(element || "#smooth-content")[0] || console.warn("ScrollSmoother needs a valid content element.") || _body3.children[0];
          if (newContent !== content) {
            content = newContent;
            contentCSS = content.getAttribute("style") || "";
            resizeObserver && resizeObserver.observe(content);
            gsap4.set(content, {
              overflow: "visible",
              width: "100%",
              boxSizing: "border-box",
              y: "+=0"
            });
            smoothDuration || gsap4.set(content, {
              clearProps: "transform"
            });
          }
          return this;
        }
        return content;
      };
      this.wrapper = function(element) {
        if (arguments.length) {
          wrapper = _toArray2(element || "#smooth-wrapper")[0] || _wrap(content);
          wrapperCSS = wrapper.getAttribute("style") || "";
          refreshHeight();
          gsap4.set(wrapper, smoothDuration ? {
            overflow: "hidden",
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          } : {
            overflow: "visible",
            position: "relative",
            width: "100%",
            height: "auto",
            top: "auto",
            bottom: "auto",
            left: "auto",
            right: "auto"
          });
          return this;
        }
        return wrapper;
      };
      this.effects = function(targets, config3) {
        var _effects2;
        effects || (effects = []);
        if (!targets) {
          return effects.slice(0);
        }
        targets = _toArray2(targets);
        targets.forEach(function(target) {
          var i2 = effects.length;
          while (i2--) {
            effects[i2].trigger === target && effects[i2].kill();
          }
        });
        config3 = config3 || {};
        var _config2 = config3, speed2 = _config2.speed, lag = _config2.lag, effectsPadding = _config2.effectsPadding, effectsToAdd = [], i, st;
        for (i = 0; i < targets.length; i++) {
          st = createEffect(targets[i], speed2, lag, i, effectsPadding);
          st && effectsToAdd.push(st);
        }
        (_effects2 = effects).push.apply(_effects2, effectsToAdd);
        config3.refresh !== false && ScrollTrigger3.refresh();
        return effectsToAdd;
      };
      this.sections = function(targets, config3) {
        var _sections;
        sections || (sections = []);
        if (!targets) {
          return sections.slice(0);
        }
        var newSections = _toArray2(targets).map(function(el) {
          return ScrollTrigger3.create({
            trigger: el,
            start: "top 120%",
            end: "bottom -20%",
            onToggle: function onToggle(self2) {
              el.style.opacity = self2.isActive ? "1" : "0";
              el.style.pointerEvents = self2.isActive ? "all" : "none";
            }
          });
        });
        config3 && config3.add ? (_sections = sections).push.apply(_sections, newSections) : sections = newSections.slice(0);
        return newSections;
      };
      this.content(vars.content);
      this.wrapper(vars.wrapper);
      this.render = function(y) {
        return render4(y || y === 0 ? y : currentY);
      };
      this.getVelocity = function() {
        return tracker.getVelocity(-currentY);
      };
      ScrollTrigger3.scrollerProxy(wrapper, {
        scrollTop,
        scrollHeight: function scrollHeight() {
          return refreshHeight() && _body3.scrollHeight;
        },
        fixedMarkers: vars.fixedMarkers !== false && !!smoothDuration,
        content,
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: _win5.innerWidth,
            height: _win5.innerHeight
          };
        }
      });
      ScrollTrigger3.defaults({
        scroller: wrapper
      });
      var existingScrollTriggers = ScrollTrigger3.getAll().filter(function(st) {
        return st.scroller === _win5 || st.scroller === wrapper;
      });
      existingScrollTriggers.forEach(function(st) {
        return st.revert(true, true);
      });
      mainST = ScrollTrigger3.create({
        animation: gsap4.fromTo(scroll, {
          y: function y() {
            allowUpdates = 0;
            return 0;
          }
        }, {
          y: function y() {
            allowUpdates = 1;
            return -refreshHeight();
          },
          immediateRender: false,
          ease: "none",
          data: "ScrollSmoother",
          duration: 100,
          // for added precision
          onUpdate: function onUpdate() {
            if (allowUpdates) {
              var force = isProxyScrolling;
              if (force) {
                killScrub(mainST);
                scroll.y = currentY;
              }
              render4(scroll.y, force);
              updateVelocity();
              _onUpdate && !paused && _onUpdate(self);
            }
          }
        }),
        onRefreshInit: function onRefreshInit(self2) {
          if (ScrollSmoother2.isRefreshing) {
            return;
          }
          ScrollSmoother2.isRefreshing = true;
          if (effects) {
            var _pins = ScrollTrigger3.getAll().filter(function(st) {
              return !!st.pin;
            });
            effects.forEach(function(st) {
              if (!st.vars.pinnedContainer) {
                _pins.forEach(function(pinST) {
                  if (pinST.pin.contains(st.trigger)) {
                    var v = st.vars;
                    v.pinnedContainer = pinST.pin;
                    st.vars = null;
                    st.init(v, st.animation);
                  }
                });
              }
            });
          }
          var scrub = self2.getTween();
          recordedRefreshScrub = scrub && scrub._end > scrub._dp._time;
          recordedRefreshScroll = currentY;
          scroll.y = 0;
          if (smoothDuration) {
            ScrollTrigger3.isTouch === 1 && (wrapper.style.position = "absolute");
            wrapper.scrollTop = 0;
            ScrollTrigger3.isTouch === 1 && (wrapper.style.position = "fixed");
          }
        },
        onRefresh: function onRefresh2(self2) {
          self2.animation.invalidate();
          self2.setPositions(self2.start, refreshHeight() / speed);
          recordedRefreshScrub || killScrub(self2);
          scroll.y = -scrollFunc() * speed;
          render4(scroll.y);
          if (!startupPhase) {
            recordedRefreshScrub && (isProxyScrolling = false);
            self2.animation.progress(gsap4.utils.clamp(0, 1, recordedRefreshScroll / speed / -self2.end));
          }
          if (recordedRefreshScrub) {
            self2.progress -= 1e-3;
            self2.update();
          }
          ScrollSmoother2.isRefreshing = false;
        },
        id: "ScrollSmoother",
        scroller: _win5,
        invalidateOnRefresh: true,
        start: 0,
        refreshPriority: -9999,
        // because all other pins, etc. should be calculated first before this figures out the height of the body. BUT this should also update FIRST so that the scroll position on the proxy is up-to-date when all the ScrollTriggers calculate their progress! -9999 is a special number that ScrollTrigger looks for to handle in this way.
        end: function end() {
          return refreshHeight() / speed;
        },
        onScrubComplete: function onScrubComplete() {
          tracker.reset();
          onStop && onStop(_this);
        },
        scrub: smoothDuration || true
      });
      this.smooth = function(value) {
        if (arguments.length) {
          smoothDuration = value || 0;
          speed = smoothDuration && +vars.speed || 1;
          mainST.scrubDuration(value);
        }
        return mainST.getTween() ? mainST.getTween().duration() : 0;
      };
      mainST.getTween() && (mainST.getTween().vars.ease = vars.ease || _expo);
      this.scrollTrigger = mainST;
      vars.effects && this.effects(vars.effects === true ? "[data-" + effectsPrefix + "speed], [data-" + effectsPrefix + "lag]" : vars.effects, {
        effectsPadding: vars.effectsPadding,
        refresh: false
      });
      vars.sections && this.sections(vars.sections === true ? "[data-section]" : vars.sections);
      existingScrollTriggers.forEach(function(st) {
        st.vars.scroller = wrapper;
        st.revert(false, true);
        st.init(st.vars, st.animation);
      });
      this.paused = function(value, allowNestedScroll) {
        if (arguments.length) {
          if (!!paused !== value) {
            if (value) {
              mainST.getTween() && mainST.getTween().pause();
              scrollFunc(-currentY / speed);
              tracker.reset();
              pausedNormalizer = ScrollTrigger3.normalizeScroll();
              pausedNormalizer && pausedNormalizer.disable();
              paused = ScrollTrigger3.observe({
                preventDefault: true,
                type: "wheel,touch,scroll",
                debounce: false,
                allowClicks: true,
                onChangeY: function onChangeY() {
                  return scrollTop(-currentY);
                }
                // refuse to scroll
              });
              paused.nested = _inputObserver3(_docEl3, "wheel,touch,scroll", true, allowNestedScroll !== false);
            } else {
              paused.nested.kill();
              paused.kill();
              paused = 0;
              pausedNormalizer && pausedNormalizer.enable();
              mainST.progress = (-currentY / speed - mainST.start) / (mainST.end - mainST.start);
              killScrub(mainST);
            }
          }
          return this;
        }
        return !!paused;
      };
      this.kill = this.revert = function() {
        _this.paused(false);
        killScrub(mainST);
        mainST.kill();
        var triggers = (effects || []).concat(sections || []), i = triggers.length;
        while (i--) {
          triggers[i].kill();
        }
        ScrollTrigger3.scrollerProxy(wrapper);
        ScrollTrigger3.removeEventListener("killAll", addOnRefresh);
        ScrollTrigger3.removeEventListener("refresh", onRefresh);
        wrapper.style.cssText = wrapperCSS;
        content.style.cssText = contentCSS;
        var defaults3 = ScrollTrigger3.defaults({});
        defaults3 && defaults3.scroller === wrapper && ScrollTrigger3.defaults({
          scroller: _win5
        });
        _this.normalizer && ScrollTrigger3.normalizeScroll(false);
        clearInterval(intervalID);
        _mainInstance = null;
        resizeObserver && resizeObserver.disconnect();
        _body3.style.removeProperty("height");
        _win5.removeEventListener("focusin", _onFocusIn);
      };
      this.refresh = function(soft, force) {
        return mainST.refresh(soft, force);
      };
      if (normalizeScroll) {
        this.normalizer = ScrollTrigger3.normalizeScroll(normalizeScroll === true ? {
          debounce: true,
          content: !smoothDuration && content
        } : normalizeScroll);
      }
      ScrollTrigger3.config(vars);
      "scrollBehavior" in _win5.getComputedStyle(_body3) && gsap4.set([_body3, _docEl3], {
        scrollBehavior: "auto"
      });
      _win5.addEventListener("focusin", _onFocusIn);
      intervalID = setInterval(updateVelocity, 250);
      _doc5.readyState === "loading" || requestAnimationFrame(function() {
        return ScrollTrigger3.refresh();
      });
    }
    ScrollSmoother2.register = function register2(core) {
      if (!_coreInitted4) {
        gsap4 = core || _getGSAP5();
        if (_windowExists7() && window.document) {
          _win5 = window;
          _doc5 = document;
          _docEl3 = _doc5.documentElement;
          _body3 = _doc5.body;
        }
        if (gsap4) {
          _toArray2 = gsap4.utils.toArray;
          _clamp5 = gsap4.utils.clamp;
          _expo = gsap4.parseEase("expo");
          _context4 = gsap4.core.context || function() {
          };
          ScrollTrigger3 = gsap4.core.globals().ScrollTrigger;
          gsap4.core.globals("ScrollSmoother", ScrollSmoother2);
          if (_body3 && ScrollTrigger3) {
            _onResizeDelayedCall = gsap4.delayedCall(0.2, function() {
              return ScrollTrigger3.isRefreshing || _mainInstance && _mainInstance.refresh();
            }).pause();
            _root3 = [_win5, _doc5, _docEl3, _body3];
            _getVelocityProp3 = ScrollTrigger3.core._getVelocityProp;
            _inputObserver3 = ScrollTrigger3.core._inputObserver;
            ScrollSmoother2.refresh = ScrollTrigger3.refresh;
            _coreInitted4 = 1;
          }
        }
      }
      return _coreInitted4;
    };
    _createClass2(ScrollSmoother2, [{
      key: "progress",
      get: function get2() {
        return this.scrollTrigger ? this.scrollTrigger.animation._time / 100 : 0;
      }
    }]);
    return ScrollSmoother2;
  })();
  ScrollSmoother.version = "3.13.0";
  ScrollSmoother.create = function(vars) {
    return _mainInstance && vars && _mainInstance.content() === _toArray2(vars.content)[0] ? _mainInstance : new ScrollSmoother(vars);
  };
  ScrollSmoother.get = function() {
    return _mainInstance;
  };
  _getGSAP5() && gsap4.registerPlugin(ScrollSmoother);

  // node_modules/gsap/Flip.js
  init_define_import_meta_env();

  // node_modules/gsap/utils/matrix.js
  init_define_import_meta_env();
  var _doc6;
  var _win6;
  var _docElement2;
  var _body4;
  var _divContainer;
  var _svgContainer;
  var _identityMatrix;
  var _gEl;
  var _transformProp3 = "transform";
  var _transformOriginProp2 = _transformProp3 + "Origin";
  var _hasOffsetBug;
  var _setDoc = function _setDoc2(element) {
    var doc = element.ownerDocument || element;
    if (!(_transformProp3 in element.style) && "msTransform" in element.style) {
      _transformProp3 = "msTransform";
      _transformOriginProp2 = _transformProp3 + "Origin";
    }
    while (doc.parentNode && (doc = doc.parentNode)) {
    }
    _win6 = window;
    _identityMatrix = new Matrix2D();
    if (doc) {
      _doc6 = doc;
      _docElement2 = doc.documentElement;
      _body4 = doc.body;
      _gEl = _doc6.createElementNS("http://www.w3.org/2000/svg", "g");
      _gEl.style.transform = "none";
      var d1 = doc.createElement("div"), d2 = doc.createElement("div"), root = doc && (doc.body || doc.firstElementChild);
      if (root && root.appendChild) {
        root.appendChild(d1);
        d1.appendChild(d2);
        d1.setAttribute("style", "position:static;transform:translate3d(0,0,1px)");
        _hasOffsetBug = d2.offsetParent !== d1;
        root.removeChild(d1);
      }
    }
    return doc;
  };
  var _forceNonZeroScale = function _forceNonZeroScale2(e) {
    var a, cache2;
    while (e && e !== _body4) {
      cache2 = e._gsap;
      cache2 && cache2.uncache && cache2.get(e, "x");
      if (cache2 && !cache2.scaleX && !cache2.scaleY && cache2.renderTransform) {
        cache2.scaleX = cache2.scaleY = 1e-4;
        cache2.renderTransform(1, cache2);
        a ? a.push(cache2) : a = [cache2];
      }
      e = e.parentNode;
    }
    return a;
  };
  var _svgTemps = [];
  var _divTemps = [];
  var _getDocScrollTop = function _getDocScrollTop2() {
    return _win6.pageYOffset || _doc6.scrollTop || _docElement2.scrollTop || _body4.scrollTop || 0;
  };
  var _getDocScrollLeft = function _getDocScrollLeft2() {
    return _win6.pageXOffset || _doc6.scrollLeft || _docElement2.scrollLeft || _body4.scrollLeft || 0;
  };
  var _svgOwner = function _svgOwner2(element) {
    return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
  };
  var _isFixed = function _isFixed2(element) {
    if (_win6.getComputedStyle(element).position === "fixed") {
      return true;
    }
    element = element.parentNode;
    if (element && element.nodeType === 1) {
      return _isFixed2(element);
    }
  };
  var _createSibling = function _createSibling2(element, i) {
    if (element.parentNode && (_doc6 || _setDoc(element))) {
      var svg = _svgOwner(element), ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", type = svg ? i ? "rect" : "g" : "div", x = i !== 2 ? 0 : 100, y = i === 3 ? 100 : 0, css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", e = _doc6.createElementNS ? _doc6.createElementNS(ns.replace(/^https/, "http"), type) : _doc6.createElement(type);
      if (i) {
        if (!svg) {
          if (!_divContainer) {
            _divContainer = _createSibling2(element);
            _divContainer.style.cssText = css;
          }
          e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";
          _divContainer.appendChild(e);
        } else {
          _svgContainer || (_svgContainer = _createSibling2(element));
          e.setAttribute("width", 0.01);
          e.setAttribute("height", 0.01);
          e.setAttribute("transform", "translate(" + x + "," + y + ")");
          _svgContainer.appendChild(e);
        }
      }
      return e;
    }
    throw "Need document and parent.";
  };
  var _consolidate = function _consolidate2(m) {
    var c = new Matrix2D(), i = 0;
    for (; i < m.numberOfItems; i++) {
      c.multiply(m.getItem(i).matrix);
    }
    return c;
  };
  var _getCTM = function _getCTM2(svg) {
    var m = svg.getCTM(), transform;
    if (!m) {
      transform = svg.style[_transformProp3];
      svg.style[_transformProp3] = "none";
      svg.appendChild(_gEl);
      m = _gEl.getCTM();
      svg.removeChild(_gEl);
      transform ? svg.style[_transformProp3] = transform : svg.style.removeProperty(_transformProp3.replace(/([A-Z])/g, "-$1").toLowerCase());
    }
    return m || _identityMatrix.clone();
  };
  var _placeSiblings = function _placeSiblings2(element, adjustGOffset) {
    var svg = _svgOwner(element), isRootSVG = element === svg, siblings = svg ? _svgTemps : _divTemps, parent = element.parentNode, appendToEl = parent && !svg && parent.shadowRoot && parent.shadowRoot.appendChild ? parent.shadowRoot : parent, container, m, b2, x, y, cs;
    if (element === _win6) {
      return element;
    }
    siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
    container = svg ? _svgContainer : _divContainer;
    if (svg) {
      if (isRootSVG) {
        b2 = _getCTM(element);
        x = -b2.e / b2.a;
        y = -b2.f / b2.d;
        m = _identityMatrix;
      } else if (element.getBBox) {
        b2 = element.getBBox();
        m = element.transform ? element.transform.baseVal : {};
        m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix;
        x = m.a * b2.x + m.c * b2.y;
        y = m.b * b2.x + m.d * b2.y;
      } else {
        m = new Matrix2D();
        x = y = 0;
      }
      if (adjustGOffset && element.tagName.toLowerCase() === "g") {
        x = y = 0;
      }
      (isRootSVG ? svg : parent).appendChild(container);
      container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
    } else {
      x = y = 0;
      if (_hasOffsetBug) {
        m = element.offsetParent;
        b2 = element;
        while (b2 && (b2 = b2.parentNode) && b2 !== m && b2.parentNode) {
          if ((_win6.getComputedStyle(b2)[_transformProp3] + "").length > 4) {
            x = b2.offsetLeft;
            y = b2.offsetTop;
            b2 = 0;
          }
        }
      }
      cs = _win6.getComputedStyle(element);
      if (cs.position !== "absolute" && cs.position !== "fixed") {
        m = element.offsetParent;
        while (parent && parent !== m) {
          x += parent.scrollLeft || 0;
          y += parent.scrollTop || 0;
          parent = parent.parentNode;
        }
      }
      b2 = container.style;
      b2.top = element.offsetTop - y + "px";
      b2.left = element.offsetLeft - x + "px";
      b2[_transformProp3] = cs[_transformProp3];
      b2[_transformOriginProp2] = cs[_transformOriginProp2];
      b2.position = cs.position === "fixed" ? "fixed" : "absolute";
      appendToEl.appendChild(container);
    }
    return container;
  };
  var _setMatrix = function _setMatrix2(m, a, b2, c, d, e, f) {
    m.a = a;
    m.b = b2;
    m.c = c;
    m.d = d;
    m.e = e;
    m.f = f;
    return m;
  };
  var Matrix2D = /* @__PURE__ */ (function() {
    function Matrix2D2(a, b2, c, d, e, f) {
      if (a === void 0) {
        a = 1;
      }
      if (b2 === void 0) {
        b2 = 0;
      }
      if (c === void 0) {
        c = 0;
      }
      if (d === void 0) {
        d = 1;
      }
      if (e === void 0) {
        e = 0;
      }
      if (f === void 0) {
        f = 0;
      }
      _setMatrix(this, a, b2, c, d, e, f);
    }
    var _proto = Matrix2D2.prototype;
    _proto.inverse = function inverse() {
      var a = this.a, b2 = this.b, c = this.c, d = this.d, e = this.e, f = this.f, determinant = a * d - b2 * c || 1e-10;
      return _setMatrix(this, d / determinant, -b2 / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b2 * e) / determinant);
    };
    _proto.multiply = function multiply(matrix) {
      var a = this.a, b2 = this.b, c = this.c, d = this.d, e = this.e, f = this.f, a2 = matrix.a, b22 = matrix.c, c2 = matrix.b, d2 = matrix.d, e2 = matrix.e, f2 = matrix.f;
      return _setMatrix(this, a2 * a + c2 * c, a2 * b2 + c2 * d, b22 * a + d2 * c, b22 * b2 + d2 * d, e + e2 * a + f2 * c, f + e2 * b2 + f2 * d);
    };
    _proto.clone = function clone() {
      return new Matrix2D2(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    _proto.equals = function equals(matrix) {
      var a = this.a, b2 = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
      return a === matrix.a && b2 === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
    };
    _proto.apply = function apply(point, decoratee) {
      if (decoratee === void 0) {
        decoratee = {};
      }
      var x = point.x, y = point.y, a = this.a, b2 = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
      decoratee.x = x * a + y * c + e || 0;
      decoratee.y = x * b2 + y * d + f || 0;
      return decoratee;
    };
    return Matrix2D2;
  })();
  function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
    if (!element || !element.parentNode || (_doc6 || _setDoc(element)).documentElement === element) {
      return new Matrix2D();
    }
    var zeroScales = _forceNonZeroScale(element), svg = _svgOwner(element), temps = svg ? _svgTemps : _divTemps, container = _placeSiblings(element, adjustGOffset), b1 = temps[0].getBoundingClientRect(), b2 = temps[1].getBoundingClientRect(), b3 = temps[2].getBoundingClientRect(), parent = container.parentNode, isFixed = !includeScrollInFixed && _isFixed(element), m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));
    parent.removeChild(container);
    if (zeroScales) {
      b1 = zeroScales.length;
      while (b1--) {
        b2 = zeroScales[b1];
        b2.scaleX = b2.scaleY = 0;
        b2.renderTransform(1, b2);
      }
    }
    return inverse ? m.inverse() : m;
  }

  // node_modules/gsap/Flip.js
  var _id = 1;
  var _toArray3;
  var gsap5;
  var _batch;
  var _batchAction;
  var _body5;
  var _closestTenth;
  var _getStyleSaver3;
  var _forEachBatch = function _forEachBatch2(batch, name) {
    return batch.actions.forEach(function(a) {
      return a.vars[name] && a.vars[name](a);
    });
  };
  var _batchLookup = {};
  var _RAD2DEG2 = 180 / Math.PI;
  var _DEG2RAD2 = Math.PI / 180;
  var _emptyObj = {};
  var _dashedNameLookup = {};
  var _memoizedRemoveProps = {};
  var _listToArray = function _listToArray2(list) {
    return typeof list === "string" ? list.split(" ").join("").split(",") : list;
  };
  var _callbacks = _listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt");
  var _removeProps = _listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight");
  var _getEl = function _getEl2(target) {
    return _toArray3(target)[0] || console.warn("Element not found:", target);
  };
  var _round7 = function _round8(value) {
    return Math.round(value * 1e4) / 1e4 || 0;
  };
  var _toggleClass = function _toggleClass2(targets, className, action) {
    return targets.forEach(function(el) {
      return el.classList[action](className);
    });
  };
  var _reserved = {
    zIndex: 1,
    kill: 1,
    simple: 1,
    spin: 1,
    clearProps: 1,
    targets: 1,
    toggleClass: 1,
    onComplete: 1,
    onUpdate: 1,
    onInterrupt: 1,
    onStart: 1,
    delay: 1,
    repeat: 1,
    repeatDelay: 1,
    yoyo: 1,
    scale: 1,
    fade: 1,
    absolute: 1,
    props: 1,
    onEnter: 1,
    onLeave: 1,
    custom: 1,
    paused: 1,
    nested: 1,
    prune: 1,
    absoluteOnLeave: 1
  };
  var _fitReserved = {
    zIndex: 1,
    simple: 1,
    clearProps: 1,
    scale: 1,
    absolute: 1,
    fitChild: 1,
    getVars: 1,
    props: 1
  };
  var _camelToDashed = function _camelToDashed2(p) {
    return p.replace(/([A-Z])/g, "-$1").toLowerCase();
  };
  var _copy = function _copy2(obj, exclude) {
    var result = {}, p;
    for (p in obj) {
      exclude[p] || (result[p] = obj[p]);
    }
    return result;
  };
  var _memoizedProps = {};
  var _memoizeProps = function _memoizeProps2(props) {
    var p = _memoizedProps[props] = _listToArray(props);
    _memoizedRemoveProps[props] = p.concat(_removeProps);
    return p;
  };
  var _getInverseGlobalMatrix = function _getInverseGlobalMatrix2(el) {
    var cache2 = el._gsap || gsap5.core.getCache(el);
    if (cache2.gmCache === gsap5.ticker.frame) {
      return cache2.gMatrix;
    }
    cache2.gmCache = gsap5.ticker.frame;
    return cache2.gMatrix = getGlobalMatrix(el, true, false, true);
  };
  var _getDOMDepth = function _getDOMDepth2(el, invert, level) {
    if (level === void 0) {
      level = 0;
    }
    var parent = el.parentNode, inc = 1e3 * Math.pow(10, level) * (invert ? -1 : 1), l = invert ? -inc * 900 : 0;
    while (el) {
      l += inc;
      el = el.previousSibling;
    }
    return parent ? l + _getDOMDepth2(parent, invert, level + 1) : l;
  };
  var _orderByDOMDepth = function _orderByDOMDepth2(comps, invert, isElStates) {
    comps.forEach(function(comp) {
      return comp.d = _getDOMDepth(isElStates ? comp.element : comp.t, invert);
    });
    comps.sort(function(c1, c2) {
      return c1.d - c2.d;
    });
    return comps;
  };
  var _recordInlineStyles = function _recordInlineStyles2(elState, props) {
    var style = elState.element.style, a = elState.css = elState.css || [], i = props.length, p, v;
    while (i--) {
      p = props[i];
      v = style[p] || style.getPropertyValue(p);
      a.push(v ? p : _dashedNameLookup[p] || (_dashedNameLookup[p] = _camelToDashed(p)), v);
    }
    return style;
  };
  var _applyInlineStyles = function _applyInlineStyles2(state) {
    var css = state.css, style = state.element.style, i = 0;
    state.cache.uncache = 1;
    for (; i < css.length; i += 2) {
      css[i + 1] ? style[css[i]] = css[i + 1] : style.removeProperty(css[i]);
    }
    if (!css[css.indexOf("transform") + 1] && style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _setFinalStates = function _setFinalStates2(comps, onlyTransforms) {
    comps.forEach(function(c) {
      return c.a.cache.uncache = 1;
    });
    onlyTransforms || comps.finalStates.forEach(_applyInlineStyles);
  };
  var _absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(",");
  var _makeAbsolute = function _makeAbsolute2(elState, fallbackNode, ignoreBatch) {
    var element = elState.element, width = elState.width, height = elState.height, uncache = elState.uncache, getProp = elState.getProp, style = element.style, i = 4, result, displayIsNone, cs;
    typeof fallbackNode !== "object" && (fallbackNode = elState);
    if (_batch && ignoreBatch !== 1) {
      _batch._abs.push({
        t: element,
        b: elState,
        a: elState,
        sd: 0
      });
      _batch._final.push(function() {
        return (elState.cache.uncache = 1) && _applyInlineStyles(elState);
      });
      return element;
    }
    displayIsNone = getProp("display") === "none";
    if (!elState.isVisible || displayIsNone) {
      displayIsNone && (_recordInlineStyles(elState, ["display"]).display = fallbackNode.display);
      elState.matrix = fallbackNode.matrix;
      elState.width = width = elState.width || fallbackNode.width;
      elState.height = height = elState.height || fallbackNode.height;
    }
    _recordInlineStyles(elState, _absoluteProps);
    cs = window.getComputedStyle(element);
    while (i--) {
      style[_absoluteProps[i]] = cs[_absoluteProps[i]];
    }
    style.gridArea = "1 / 1 / 1 / 1";
    style.transition = "none";
    style.position = "absolute";
    style.width = width + "px";
    style.height = height + "px";
    style.top || (style.top = "0px");
    style.left || (style.left = "0px");
    if (uncache) {
      result = new ElementState(element);
    } else {
      result = _copy(elState, _emptyObj);
      result.position = "absolute";
      if (elState.simple) {
        var bounds = element.getBoundingClientRect();
        result.matrix = new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop());
      } else {
        result.matrix = getGlobalMatrix(element, false, false, true);
      }
    }
    result = _fit(result, elState, true);
    elState.x = _closestTenth(result.x, 0.01);
    elState.y = _closestTenth(result.y, 0.01);
    return element;
  };
  var _filterComps = function _filterComps2(comps, targets) {
    if (targets !== true) {
      targets = _toArray3(targets);
      comps = comps.filter(function(c) {
        if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) {
          return true;
        } else {
          c.t._gsap.renderTransform(1);
          if (c.b.isVisible) {
            c.t.style.width = c.b.width + "px";
            c.t.style.height = c.b.height + "px";
          }
        }
      });
    }
    return comps;
  };
  var _makeCompsAbsolute = function _makeCompsAbsolute2(comps) {
    return _orderByDOMDepth(comps, true).forEach(function(c) {
      return (c.a.isVisible || c.b.isVisible) && _makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
    });
  };
  var _findElStateInState = function _findElStateInState2(state, other) {
    return other && state.idLookup[_parseElementState(other).id] || state.elementStates[0];
  };
  var _parseElementState = function _parseElementState2(elOrNode, props, simple, other) {
    return elOrNode instanceof ElementState ? elOrNode : elOrNode instanceof FlipState ? _findElStateInState(elOrNode, other) : new ElementState(typeof elOrNode === "string" ? _getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
  };
  var _recordProps = function _recordProps2(elState, props) {
    var getProp = gsap5.getProperty(elState.element, null, "native"), obj = elState.props = {}, i = props.length;
    while (i--) {
      obj[props[i]] = (getProp(props[i]) + "").trim();
    }
    obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
    return elState;
  };
  var _applyProps = function _applyProps2(element, props) {
    var style = element.style || element, p;
    for (p in props) {
      style[p] = props[p];
    }
  };
  var _getID = function _getID2(el) {
    var id = el.getAttribute("data-flip-id");
    id || el.setAttribute("data-flip-id", id = "auto-" + _id++);
    return id;
  };
  var _elementsFromElementStates = function _elementsFromElementStates2(elStates) {
    return elStates.map(function(elState) {
      return elState.element;
    });
  };
  var _handleCallback = function _handleCallback2(callback, elStates, tl) {
    return callback && elStates.length && tl.add(callback(_elementsFromElementStates(elStates), tl, new FlipState(elStates, 0, true)), 0);
  };
  var _fit = function _fit2(fromState, toState, scale, applyProps, fitChild, vars) {
    var element = fromState.element, cache2 = fromState.cache, parent = fromState.parent, x = fromState.x, y = fromState.y, width = toState.width, height = toState.height, scaleX = toState.scaleX, scaleY = toState.scaleY, rotation = toState.rotation, bounds = toState.bounds, styles = vars && _getStyleSaver3 && _getStyleSaver3(element, "transform,width,height"), dimensionState = fromState, _toState$matrix = toState.matrix, e = _toState$matrix.e, f = _toState$matrix.f, deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation, simple = !deep && fromState.simple && toState.simple && !fitChild, skewX, fromPoint, toPoint, getProp, parentMatrix, matrix, bbox;
    if (simple || !parent) {
      scaleX = scaleY = 1;
      rotation = skewX = 0;
    } else {
      parentMatrix = _getInverseGlobalMatrix(parent);
      matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix);
      rotation = _round7(Math.atan2(matrix.b, matrix.a) * _RAD2DEG2);
      skewX = _round7(Math.atan2(matrix.c, matrix.d) * _RAD2DEG2 + rotation) % 360;
      scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
      scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * _DEG2RAD2);
      if (fitChild) {
        fitChild = _toArray3(fitChild)[0];
        getProp = gsap5.getProperty(fitChild);
        bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
        dimensionState = {
          scaleX: getProp("scaleX"),
          scaleY: getProp("scaleY"),
          width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
          height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
        };
      }
      cache2.rotation = rotation + "deg";
      cache2.skewX = skewX + "deg";
    }
    if (scale) {
      scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width;
      scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
      cache2.scaleX = scaleX;
      cache2.scaleY = scaleY;
    } else {
      width = _closestTenth(width * scaleX / dimensionState.scaleX, 0);
      height = _closestTenth(height * scaleY / dimensionState.scaleY, 0);
      element.style.width = width + "px";
      element.style.height = height + "px";
    }
    applyProps && _applyProps(element, toState.props);
    if (simple || !parent) {
      x += e - fromState.matrix.e;
      y += f - fromState.matrix.f;
    } else if (deep || parent !== toState.parent) {
      cache2.renderTransform(1, cache2);
      matrix = getGlobalMatrix(fitChild || element, false, false, true);
      fromPoint = parentMatrix.apply({
        x: matrix.e,
        y: matrix.f
      });
      toPoint = parentMatrix.apply({
        x: e,
        y: f
      });
      x += toPoint.x - fromPoint.x;
      y += toPoint.y - fromPoint.y;
    } else {
      parentMatrix.e = parentMatrix.f = 0;
      toPoint = parentMatrix.apply({
        x: e - fromState.matrix.e,
        y: f - fromState.matrix.f
      });
      x += toPoint.x;
      y += toPoint.y;
    }
    x = _closestTenth(x, 0.02);
    y = _closestTenth(y, 0.02);
    if (vars && !(vars instanceof ElementState)) {
      styles && styles.revert();
    } else {
      cache2.x = x + "px";
      cache2.y = y + "px";
      cache2.renderTransform(1, cache2);
    }
    if (vars) {
      vars.x = x;
      vars.y = y;
      vars.rotation = rotation;
      vars.skewX = skewX;
      if (scale) {
        vars.scaleX = scaleX;
        vars.scaleY = scaleY;
      } else {
        vars.width = width;
        vars.height = height;
      }
    }
    return vars || cache2;
  };
  var _parseState = function _parseState2(targetsOrState, vars) {
    return targetsOrState instanceof FlipState ? targetsOrState : new FlipState(targetsOrState, vars);
  };
  var _getChangingElState = function _getChangingElState2(toState, fromState, id) {
    var to1 = toState.idLookup[id], to2 = toState.alt[id];
    return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
  };
  var _bodyMetrics = [];
  var _bodyProps = "width,height,overflowX,overflowY".split(",");
  var _bodyLocked;
  var _lockBodyScroll = function _lockBodyScroll2(lock) {
    if (lock !== _bodyLocked) {
      var s = _body5.style, w = _body5.clientWidth === window.outerWidth, h = _body5.clientHeight === window.outerHeight, i = 4;
      if (lock && (w || h)) {
        while (i--) {
          _bodyMetrics[i] = s[_bodyProps[i]];
        }
        if (w) {
          s.width = _body5.clientWidth + "px";
          s.overflowY = "hidden";
        }
        if (h) {
          s.height = _body5.clientHeight + "px";
          s.overflowX = "hidden";
        }
        _bodyLocked = lock;
      } else if (_bodyLocked) {
        while (i--) {
          _bodyMetrics[i] ? s[_bodyProps[i]] = _bodyMetrics[i] : s.removeProperty(_camelToDashed(_bodyProps[i]));
        }
        _bodyLocked = lock;
      }
    }
  };
  var _fromTo = function _fromTo2(fromState, toState, vars, relative) {
    fromState instanceof FlipState && toState instanceof FlipState || console.warn("Not a valid state object.");
    vars = vars || {};
    var _vars = vars, clearProps2 = _vars.clearProps, onEnter = _vars.onEnter, onLeave = _vars.onLeave, absolute = _vars.absolute, absoluteOnLeave = _vars.absoluteOnLeave, custom = _vars.custom, delay = _vars.delay, paused = _vars.paused, repeat = _vars.repeat, repeatDelay = _vars.repeatDelay, yoyo = _vars.yoyo, toggleClass = _vars.toggleClass, nested = _vars.nested, _zIndex = _vars.zIndex, scale = _vars.scale, fade = _vars.fade, stagger = _vars.stagger, spin = _vars.spin, prune = _vars.prune, props = ("props" in vars ? vars : fromState).props, tweenVars = _copy(vars, _reserved), animation = gsap5.timeline({
      delay,
      paused,
      repeat,
      repeatDelay,
      yoyo,
      data: "isFlip"
    }), remainingProps = tweenVars, entering = [], leaving = [], comps = [], swapOutTargets = [], spinNum = spin === true ? 1 : spin || 0, spinFunc = typeof spin === "function" ? spin : function() {
      return spinNum;
    }, interrupted = fromState.interrupted || toState.interrupted, addFunc = animation[relative !== 1 ? "to" : "from"], v, p, endTime, i, el, comp, state, targets, finalStates, fromNode, toNode, run2, a, b2;
    for (p in toState.idLookup) {
      toNode = !toState.alt[p] ? toState.idLookup[p] : _getChangingElState(toState, fromState, p);
      el = toNode.element;
      fromNode = fromState.idLookup[p];
      fromState.alt[p] && el === fromNode.element && (fromState.alt[p].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p]);
      if (fromNode) {
        comp = {
          t: el,
          b: fromNode,
          a: toNode,
          sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
        };
        comps.push(comp);
        if (comp.sd) {
          if (comp.sd < 0) {
            comp.b = toNode;
            comp.a = fromNode;
          }
          interrupted && _recordInlineStyles(comp.b, props ? _memoizedRemoveProps[props] : _removeProps);
          fade && comps.push(comp.swap = {
            t: fromNode.element,
            b: comp.b,
            a: comp.a,
            sd: -comp.sd,
            swap: comp
          });
        }
        el._flip = fromNode.element._flip = _batch ? _batch.timeline : animation;
      } else if (toNode.isVisible) {
        comps.push({
          t: el,
          b: _copy(toNode, {
            isVisible: 1
          }),
          a: toNode,
          sd: 0,
          entering: 1
        });
        el._flip = _batch ? _batch.timeline : animation;
      }
    }
    props && (_memoizedProps[props] || _memoizeProps(props)).forEach(function(p2) {
      return tweenVars[p2] = function(i2) {
        return comps[i2].a.props[p2];
      };
    });
    comps.finalStates = finalStates = [];
    run2 = function run3() {
      _orderByDOMDepth(comps);
      _lockBodyScroll(true);
      for (i = 0; i < comps.length; i++) {
        comp = comps[i];
        a = comp.a;
        b2 = comp.b;
        if (prune && !a.isDifferent(b2) && !comp.entering) {
          comps.splice(i--, 1);
        } else {
          el = comp.t;
          nested && !(comp.sd < 0) && i && (a.matrix = getGlobalMatrix(el, false, false, true));
          if (b2.isVisible && a.isVisible) {
            if (comp.sd < 0) {
              state = new ElementState(el, props, fromState.simple);
              _fit(state, a, scale, 0, 0, state);
              state.matrix = getGlobalMatrix(el, false, false, true);
              state.css = comp.b.css;
              comp.a = a = state;
              fade && (el.style.opacity = interrupted ? b2.opacity : a.opacity);
              stagger && swapOutTargets.push(el);
            } else if (comp.sd > 0 && fade) {
              el.style.opacity = interrupted ? a.opacity - b2.opacity : "0";
            }
            _fit(a, b2, scale, props);
          } else if (b2.isVisible !== a.isVisible) {
            if (!b2.isVisible) {
              a.isVisible && entering.push(a);
              comps.splice(i--, 1);
            } else if (!a.isVisible) {
              b2.css = a.css;
              leaving.push(b2);
              comps.splice(i--, 1);
              absolute && nested && _fit(a, b2, scale, props);
            }
          }
          if (!scale) {
            el.style.maxWidth = Math.max(a.width, b2.width) + "px";
            el.style.maxHeight = Math.max(a.height, b2.height) + "px";
            el.style.minWidth = Math.min(a.width, b2.width) + "px";
            el.style.minHeight = Math.min(a.height, b2.height) + "px";
          }
          nested && toggleClass && el.classList.add(toggleClass);
        }
        finalStates.push(a);
      }
      var classTargets;
      if (toggleClass) {
        classTargets = finalStates.map(function(s) {
          return s.element;
        });
        nested && classTargets.forEach(function(e) {
          return e.classList.remove(toggleClass);
        });
      }
      _lockBodyScroll(false);
      if (scale) {
        tweenVars.scaleX = function(i2) {
          return comps[i2].a.scaleX;
        };
        tweenVars.scaleY = function(i2) {
          return comps[i2].a.scaleY;
        };
      } else {
        tweenVars.width = function(i2) {
          return comps[i2].a.width + "px";
        };
        tweenVars.height = function(i2) {
          return comps[i2].a.height + "px";
        };
        tweenVars.autoRound = vars.autoRound || false;
      }
      tweenVars.x = function(i2) {
        return comps[i2].a.x + "px";
      };
      tweenVars.y = function(i2) {
        return comps[i2].a.y + "px";
      };
      tweenVars.rotation = function(i2) {
        return comps[i2].a.rotation + (spin ? spinFunc(i2, targets[i2], targets) * 360 : 0);
      };
      tweenVars.skewX = function(i2) {
        return comps[i2].a.skewX;
      };
      targets = comps.map(function(c) {
        return c.t;
      });
      if (_zIndex || _zIndex === 0) {
        tweenVars.modifiers = {
          zIndex: function zIndex() {
            return _zIndex;
          }
        };
        tweenVars.zIndex = _zIndex;
        tweenVars.immediateRender = vars.immediateRender !== false;
      }
      fade && (tweenVars.opacity = function(i2) {
        return comps[i2].sd < 0 ? 0 : comps[i2].sd > 0 ? comps[i2].a.opacity : "+=0";
      });
      if (swapOutTargets.length) {
        stagger = gsap5.utils.distribute(stagger);
        var dummyArray = targets.slice(swapOutTargets.length);
        tweenVars.stagger = function(i2, el2) {
          return stagger(~swapOutTargets.indexOf(el2) ? targets.indexOf(comps[i2].swap.t) : i2, el2, dummyArray);
        };
      }
      _callbacks.forEach(function(name) {
        return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
      });
      if (custom && targets.length) {
        remainingProps = _copy(tweenVars, _reserved);
        if ("scale" in custom) {
          custom.scaleX = custom.scaleY = custom.scale;
          delete custom.scale;
        }
        for (p in custom) {
          v = _copy(custom[p], _fitReserved);
          v[p] = tweenVars[p];
          !("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
          v.stagger = tweenVars.stagger;
          addFunc.call(animation, targets, v, 0);
          delete remainingProps[p];
        }
      }
      if (targets.length || leaving.length || entering.length) {
        toggleClass && animation.add(function() {
          return _toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
        }, 0) && !paused && _toggleClass(classTargets, toggleClass, "add");
        targets.length && addFunc.call(animation, targets, remainingProps, 0);
      }
      _handleCallback(onEnter, entering, animation);
      _handleCallback(onLeave, leaving, animation);
      var batchTl = _batch && _batch.timeline;
      if (batchTl) {
        batchTl.add(animation, 0);
        _batch._final.push(function() {
          return _setFinalStates(comps, !clearProps2);
        });
      }
      endTime = animation.duration();
      animation.call(function() {
        var forward = animation.time() >= endTime;
        forward && !batchTl && _setFinalStates(comps, !clearProps2);
        toggleClass && _toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
      });
    };
    absoluteOnLeave && (absolute = comps.filter(function(comp2) {
      return !comp2.sd && !comp2.a.isVisible && comp2.b.isVisible;
    }).map(function(comp2) {
      return comp2.a.element;
    }));
    if (_batch) {
      var _batch$_abs;
      absolute && (_batch$_abs = _batch._abs).push.apply(_batch$_abs, _filterComps(comps, absolute));
      _batch._run.push(run2);
    } else {
      absolute && _makeCompsAbsolute(_filterComps(comps, absolute));
      run2();
    }
    var anim = _batch ? _batch.timeline : animation;
    anim.revert = function() {
      return _killFlip(anim, 1, 1);
    };
    return anim;
  };
  var _interrupt3 = function _interrupt4(tl) {
    tl.vars.onInterrupt && tl.vars.onInterrupt.apply(tl, tl.vars.onInterruptParams || []);
    tl.getChildren(true, false, true).forEach(_interrupt4);
  };
  var _killFlip = function _killFlip2(tl, action, force) {
    if (tl && tl.progress() < 1 && (!tl.paused() || force)) {
      if (action) {
        _interrupt3(tl);
        action < 2 && tl.progress(1);
        tl.kill();
      }
      return true;
    }
  };
  var _createLookup = function _createLookup2(state) {
    var lookup = state.idLookup = {}, alt = state.alt = {}, elStates = state.elementStates, i = elStates.length, elState;
    while (i--) {
      elState = elStates[i];
      lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
    }
  };
  var FlipState = /* @__PURE__ */ (function() {
    function FlipState2(targets, vars, targetsAreElementStates) {
      this.props = vars && vars.props;
      this.simple = !!(vars && vars.simple);
      if (targetsAreElementStates) {
        this.targets = _elementsFromElementStates(targets);
        this.elementStates = targets;
        _createLookup(this);
      } else {
        this.targets = _toArray3(targets);
        var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
        _batch && !soft && _batch._kill.push(this);
        this.update(soft || !!_batch);
      }
    }
    var _proto = FlipState2.prototype;
    _proto.update = function update(soft) {
      var _this = this;
      this.elementStates = this.targets.map(function(el) {
        return new ElementState(el, _this.props, _this.simple);
      });
      _createLookup(this);
      this.interrupt(soft);
      this.recordInlineStyles();
      return this;
    };
    _proto.clear = function clear2() {
      this.targets.length = this.elementStates.length = 0;
      _createLookup(this);
      return this;
    };
    _proto.fit = function fit(state, scale, nested) {
      var elStatesInOrder = _orderByDOMDepth(this.elementStates.slice(0), false, true), toElStates = (state || this).idLookup, i = 0, fromNode, toNode;
      for (; i < elStatesInOrder.length; i++) {
        fromNode = elStatesInOrder[i];
        nested && (fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true));
        toNode = toElStates[fromNode.id];
        toNode && _fit(fromNode, toNode, scale, true, 0, fromNode);
        fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true);
      }
      return this;
    };
    _proto.getProperty = function getProperty2(element, property) {
      var es = this.getElementState(element) || _emptyObj;
      return (property in es ? es : es.props || _emptyObj)[property];
    };
    _proto.add = function add(state) {
      var i = state.targets.length, lookup = this.idLookup, alt = this.alt, index, es, es2;
      while (i--) {
        es = state.elementStates[i];
        es2 = lookup[es.id];
        if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
          index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
          this.targets.splice(index, 1, state.targets[i]);
          this.elementStates.splice(index, 1, es);
        } else {
          this.targets.push(state.targets[i]);
          this.elementStates.push(es);
        }
      }
      state.interrupted && (this.interrupted = true);
      state.simple || (this.simple = false);
      _createLookup(this);
      return this;
    };
    _proto.compare = function compare(state) {
      var l1 = state.idLookup, l2 = this.idLookup, unchanged = [], changed = [], enter = [], leave = [], targets = [], a1 = state.alt, a2 = this.alt, place = function place2(s12, s22, el2) {
        return (s12.isVisible !== s22.isVisible ? s12.isVisible ? enter : leave : s12.isVisible ? changed : unchanged).push(el2) && targets.push(el2);
      }, placeIfDoesNotExist = function placeIfDoesNotExist2(s12, s22, el2) {
        return targets.indexOf(el2) < 0 && place(s12, s22, el2);
      }, s1, s2, p, el, s1Alt, s2Alt, c1, c2;
      for (p in l1) {
        s1Alt = a1[p];
        s2Alt = a2[p];
        s1 = !s1Alt ? l1[p] : _getChangingElState(state, this, p);
        el = s1.element;
        s2 = l2[p];
        if (s2Alt) {
          c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
          c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1;
          if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
            (c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
            targets.push(c1.element, c2.element);
          } else {
            place(c1, c2, c1.element);
          }
          s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p]);
          placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
          placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
          s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
        } else {
          !s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
          s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
        }
      }
      for (p in l2) {
        if (!l1[p]) {
          leave.push(l2[p].element);
          a2[p] && leave.push(a2[p].element);
        }
      }
      return {
        changed,
        unchanged,
        enter,
        leave
      };
    };
    _proto.recordInlineStyles = function recordInlineStyles() {
      var props = _memoizedRemoveProps[this.props] || _removeProps, i = this.elementStates.length;
      while (i--) {
        _recordInlineStyles(this.elementStates[i], props);
      }
    };
    _proto.interrupt = function interrupt(soft) {
      var _this2 = this;
      var timelines = [];
      this.targets.forEach(function(t) {
        var tl = t._flip, foundInProgress = _killFlip(tl, soft ? 0 : 1);
        soft && foundInProgress && timelines.indexOf(tl) < 0 && tl.add(function() {
          return _this2.updateVisibility();
        });
        foundInProgress && timelines.push(tl);
      });
      !soft && timelines.length && this.updateVisibility();
      this.interrupted || (this.interrupted = !!timelines.length);
    };
    _proto.updateVisibility = function updateVisibility() {
      this.elementStates.forEach(function(es) {
        var b2 = es.element.getBoundingClientRect();
        es.isVisible = !!(b2.width || b2.height || b2.top || b2.left);
        es.uncache = 1;
      });
    };
    _proto.getElementState = function getElementState(element) {
      return this.elementStates[this.targets.indexOf(_getEl(element))];
    };
    _proto.makeAbsolute = function makeAbsolute() {
      return _orderByDOMDepth(this.elementStates.slice(0), true, true).map(_makeAbsolute);
    };
    return FlipState2;
  })();
  var ElementState = /* @__PURE__ */ (function() {
    function ElementState2(element, props, simple) {
      this.element = element;
      this.update(props, simple);
    }
    var _proto2 = ElementState2.prototype;
    _proto2.isDifferent = function isDifferent(state) {
      var b1 = this.bounds, b2 = state.bounds;
      return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
    };
    _proto2.update = function update(props, simple) {
      var self = this, element = self.element, getProp = gsap5.getProperty(element), cache2 = gsap5.core.getCache(element), bounds = element.getBoundingClientRect(), bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(), m = simple ? new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop()) : getGlobalMatrix(element, false, false, true);
      cache2.uncache = 1;
      self.getProp = getProp;
      self.element = element;
      self.id = _getID(element);
      self.matrix = m;
      self.cache = cache2;
      self.bounds = bounds;
      self.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
      self.display = getProp("display");
      self.position = getProp("position");
      self.parent = element.parentNode;
      self.x = getProp("x");
      self.y = getProp("y");
      self.scaleX = cache2.scaleX;
      self.scaleY = cache2.scaleY;
      self.rotation = getProp("rotation");
      self.skewX = getProp("skewX");
      self.opacity = getProp("opacity");
      self.width = bbox ? bbox.width : _closestTenth(getProp("width", "px"), 0.04);
      self.height = bbox ? bbox.height : _closestTenth(getProp("height", "px"), 0.04);
      props && _recordProps(self, _memoizedProps[props] || _memoizeProps(props));
      self.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && _getCTM(element).inverse();
      self.simple = simple || _round7(m.a) === 1 && !_round7(m.b) && !_round7(m.c) && _round7(m.d) === 1;
      self.uncache = 0;
    };
    return ElementState2;
  })();
  var FlipAction = /* @__PURE__ */ (function() {
    function FlipAction2(vars, batch) {
      this.vars = vars;
      this.batch = batch;
      this.states = [];
      this.timeline = batch.timeline;
    }
    var _proto3 = FlipAction2.prototype;
    _proto3.getStateById = function getStateById(id) {
      var i = this.states.length;
      while (i--) {
        if (this.states[i].idLookup[id]) {
          return this.states[i];
        }
      }
    };
    _proto3.kill = function kill() {
      this.batch.remove(this);
    };
    return FlipAction2;
  })();
  var FlipBatch = /* @__PURE__ */ (function() {
    function FlipBatch2(id) {
      this.id = id;
      this.actions = [];
      this._kill = [];
      this._final = [];
      this._abs = [];
      this._run = [];
      this.data = {};
      this.state = new FlipState();
      this.timeline = gsap5.timeline();
    }
    var _proto4 = FlipBatch2.prototype;
    _proto4.add = function add(config3) {
      var result = this.actions.filter(function(action) {
        return action.vars === config3;
      });
      if (result.length) {
        return result[0];
      }
      result = new FlipAction(typeof config3 === "function" ? {
        animate: config3
      } : config3, this);
      this.actions.push(result);
      return result;
    };
    _proto4.remove = function remove2(action) {
      var i = this.actions.indexOf(action);
      i >= 0 && this.actions.splice(i, 1);
      return this;
    };
    _proto4.getState = function getState(merge) {
      var _this3 = this;
      var prevBatch = _batch, prevAction = _batchAction;
      _batch = this;
      this.state.clear();
      this._kill.length = 0;
      this.actions.forEach(function(action) {
        if (action.vars.getState) {
          action.states.length = 0;
          _batchAction = action;
          action.state = action.vars.getState(action);
        }
        merge && action.states.forEach(function(s) {
          return _this3.state.add(s);
        });
      });
      _batchAction = prevAction;
      _batch = prevBatch;
      this.killConflicts();
      return this;
    };
    _proto4.animate = function animate() {
      var _this4 = this;
      var prevBatch = _batch, tl = this.timeline, i = this.actions.length, finalStates, endTime;
      _batch = this;
      tl.clear();
      this._abs.length = this._final.length = this._run.length = 0;
      this.actions.forEach(function(a) {
        a.vars.animate && a.vars.animate(a);
        var onEnter = a.vars.onEnter, onLeave = a.vars.onLeave, targets = a.targets, s, result;
        if (targets && targets.length && (onEnter || onLeave)) {
          s = new FlipState();
          a.states.forEach(function(state) {
            return s.add(state);
          });
          result = s.compare(Flip.getState(targets));
          result.enter.length && onEnter && onEnter(result.enter);
          result.leave.length && onLeave && onLeave(result.leave);
        }
      });
      _makeCompsAbsolute(this._abs);
      this._run.forEach(function(f) {
        return f();
      });
      endTime = tl.duration();
      finalStates = this._final.slice(0);
      tl.add(function() {
        if (endTime <= tl.time()) {
          finalStates.forEach(function(f) {
            return f();
          });
          _forEachBatch(_this4, "onComplete");
        }
      });
      _batch = prevBatch;
      while (i--) {
        this.actions[i].vars.once && this.actions[i].kill();
      }
      _forEachBatch(this, "onStart");
      tl.restart();
      return this;
    };
    _proto4.loadState = function loadState(done) {
      done || (done = function done2() {
        return 0;
      });
      var queue = [];
      this.actions.forEach(function(c) {
        if (c.vars.loadState) {
          var i, f = function f2(targets) {
            targets && (c.targets = targets);
            i = queue.indexOf(f2);
            if (~i) {
              queue.splice(i, 1);
              queue.length || done();
            }
          };
          queue.push(f);
          c.vars.loadState(f);
        }
      });
      queue.length || done();
      return this;
    };
    _proto4.setState = function setState() {
      this.actions.forEach(function(c) {
        return c.targets = c.vars.setState && c.vars.setState(c);
      });
      return this;
    };
    _proto4.killConflicts = function killConflicts(soft) {
      this.state.interrupt(soft);
      this._kill.forEach(function(state) {
        return state.interrupt(soft);
      });
      return this;
    };
    _proto4.run = function run2(skipGetState, merge) {
      var _this5 = this;
      if (this !== _batch) {
        skipGetState || this.getState(merge);
        this.loadState(function() {
          if (!_this5._killed) {
            _this5.setState();
            _this5.animate();
          }
        });
      }
      return this;
    };
    _proto4.clear = function clear2(stateOnly) {
      this.state.clear();
      stateOnly || (this.actions.length = 0);
    };
    _proto4.getStateById = function getStateById(id) {
      var i = this.actions.length, s;
      while (i--) {
        s = this.actions[i].getStateById(id);
        if (s) {
          return s;
        }
      }
      return this.state.idLookup[id] && this.state;
    };
    _proto4.kill = function kill() {
      this._killed = 1;
      this.clear();
      delete _batchLookup[this.id];
    };
    return FlipBatch2;
  })();
  var Flip = /* @__PURE__ */ (function() {
    function Flip2() {
    }
    Flip2.getState = function getState(targets, vars) {
      var state = _parseState(targets, vars);
      _batchAction && _batchAction.states.push(state);
      vars && vars.batch && Flip2.batch(vars.batch).state.add(state);
      return state;
    };
    Flip2.from = function from(state, vars) {
      vars = vars || {};
      "clearProps" in vars || (vars.clearProps = true);
      return _fromTo(state, _parseState(vars.targets || state.targets, {
        props: vars.props || state.props,
        simple: vars.simple,
        kill: !!vars.kill
      }), vars, -1);
    };
    Flip2.to = function to(state, vars) {
      return _fromTo(state, _parseState(vars.targets || state.targets, {
        props: vars.props || state.props,
        simple: vars.simple,
        kill: !!vars.kill
      }), vars, 1);
    };
    Flip2.fromTo = function fromTo(fromState, toState, vars) {
      return _fromTo(fromState, toState, vars);
    };
    Flip2.fit = function fit(fromEl, toEl, vars) {
      var v = vars ? _copy(vars, _fitReserved) : {}, _ref = vars || v, absolute = _ref.absolute, scale = _ref.scale, getVars = _ref.getVars, props = _ref.props, runBackwards = _ref.runBackwards, onComplete = _ref.onComplete, simple = _ref.simple, fitChild = vars && vars.fitChild && _getEl(vars.fitChild), before = _parseElementState(toEl, props, simple, fromEl), after = _parseElementState(fromEl, 0, simple, before), inlineProps = props ? _memoizedRemoveProps[props] : _removeProps, ctx = gsap5.context();
      props && _applyProps(v, before.props);
      _recordInlineStyles(after, inlineProps);
      if (runBackwards) {
        "immediateRender" in v || (v.immediateRender = true);
        v.onComplete = function() {
          _applyInlineStyles(after);
          onComplete && onComplete.apply(this, arguments);
        };
      }
      absolute && _makeAbsolute(after, before);
      v = _fit(after, before, scale || fitChild, !v.duration && props, fitChild, v.duration || getVars ? v : 0);
      typeof vars === "object" && "zIndex" in vars && (v.zIndex = vars.zIndex);
      ctx && !getVars && ctx.add(function() {
        return function() {
          return _applyInlineStyles(after);
        };
      });
      return getVars ? v : v.duration ? gsap5.to(after.element, v) : null;
    };
    Flip2.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
      return (targetsOrStates instanceof FlipState ? targetsOrStates : new FlipState(targetsOrStates, vars)).makeAbsolute();
    };
    Flip2.batch = function batch(id) {
      id || (id = "default");
      return _batchLookup[id] || (_batchLookup[id] = new FlipBatch(id));
    };
    Flip2.killFlipsOf = function killFlipsOf(targets, complete) {
      (targets instanceof FlipState ? targets.targets : _toArray3(targets)).forEach(function(t) {
        return t && _killFlip(t._flip, complete !== false ? 1 : 2);
      });
    };
    Flip2.isFlipping = function isFlipping(target) {
      var f = Flip2.getByTarget(target);
      return !!f && f.isActive();
    };
    Flip2.getByTarget = function getByTarget(target) {
      return (_getEl(target) || _emptyObj)._flip;
    };
    Flip2.getElementState = function getElementState(target, props) {
      return new ElementState(_getEl(target), props);
    };
    Flip2.convertCoordinates = function convertCoordinates2(fromElement, toElement, point) {
      var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
      return point ? m.apply(point) : m;
    };
    Flip2.register = function register2(core) {
      _body5 = typeof document !== "undefined" && document.body;
      if (_body5) {
        gsap5 = core;
        _setDoc(_body5);
        _toArray3 = gsap5.utils.toArray;
        _getStyleSaver3 = gsap5.core.getStyleSaver;
        var snap3 = gsap5.utils.snap(0.1);
        _closestTenth = function _closestTenth2(value, add) {
          return snap3(parseFloat(value) + add);
        };
      }
    };
    return Flip2;
  })();
  Flip.version = "3.13.0";
  typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin(Flip);

  // node_modules/gsap/MotionPathPlugin.js
  init_define_import_meta_env();

  // node_modules/gsap/utils/paths.js
  init_define_import_meta_env();
  var _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
  var _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
  var _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig;
  var _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/i;
  var _DEG2RAD3 = Math.PI / 180;
  var _RAD2DEG3 = 180 / Math.PI;
  var _sin2 = Math.sin;
  var _cos2 = Math.cos;
  var _abs2 = Math.abs;
  var _sqrt2 = Math.sqrt;
  var _atan22 = Math.atan2;
  var _largeNum = 1e8;
  var _isString5 = function _isString6(value) {
    return typeof value === "string";
  };
  var _isNumber5 = function _isNumber6(value) {
    return typeof value === "number";
  };
  var _isUndefined3 = function _isUndefined4(value) {
    return typeof value === "undefined";
  };
  var _temp = {};
  var _temp2 = {};
  var _roundingNum = 1e5;
  var _wrapProgress = function _wrapProgress2(progress) {
    return Math.round((progress + _largeNum) % 1 * _roundingNum) / _roundingNum || (progress < 0 ? 0 : 1);
  };
  var _round9 = function _round10(value) {
    return Math.round(value * _roundingNum) / _roundingNum || 0;
  };
  var _roundPrecise3 = function _roundPrecise4(value) {
    return Math.round(value * 1e10) / 1e10 || 0;
  };
  var _splitSegment = function _splitSegment2(rawPath, segIndex, i, t) {
    var segment = rawPath[segIndex], shift = t === 1 ? 6 : subdivideSegment(segment, i, t);
    if ((shift || !t) && shift + i + 2 < segment.length) {
      rawPath.splice(segIndex, 0, segment.slice(0, i + shift + 2));
      segment.splice(0, i + shift);
      return 1;
    }
  };
  var _getSampleIndex = function _getSampleIndex2(samples, length, progress) {
    var l = samples.length, i = ~~(progress * l);
    if (samples[i] > length) {
      while (--i && samples[i] > length) {
      }
      i < 0 && (i = 0);
    } else {
      while (samples[++i] < length && i < l) {
      }
    }
    return i < l ? i : l - 1;
  };
  var _reverseRawPath = function _reverseRawPath2(rawPath, skipOuter) {
    var i = rawPath.length;
    skipOuter || rawPath.reverse();
    while (i--) {
      rawPath[i].reversed || reverseSegment(rawPath[i]);
    }
  };
  var _copyMetaData = function _copyMetaData2(source, copy) {
    copy.totalLength = source.totalLength;
    if (source.samples) {
      copy.samples = source.samples.slice(0);
      copy.lookup = source.lookup.slice(0);
      copy.minLength = source.minLength;
      copy.resolution = source.resolution;
    } else if (source.totalPoints) {
      copy.totalPoints = source.totalPoints;
    }
    return copy;
  };
  var _appendOrMerge = function _appendOrMerge2(rawPath, segment) {
    var index = rawPath.length, prevSeg = rawPath[index - 1] || [], l = prevSeg.length;
    if (index && segment[0] === prevSeg[l - 2] && segment[1] === prevSeg[l - 1]) {
      segment = prevSeg.concat(segment.slice(2));
      index--;
    }
    rawPath[index] = segment;
  };
  function getRawPath(value) {
    value = _isString5(value) && _selectorExp.test(value) ? document.querySelector(value) || value : value;
    var e = value.getAttribute ? value : 0, rawPath;
    if (e && (value = value.getAttribute("d"))) {
      if (!e._gsPath) {
        e._gsPath = {};
      }
      rawPath = e._gsPath[value];
      return rawPath && !rawPath._dirty ? rawPath : e._gsPath[value] = stringToRawPath(value);
    }
    return !value ? console.warn("Expecting a <path> element or an SVG path data string") : _isString5(value) ? stringToRawPath(value) : _isNumber5(value[0]) ? [value] : value;
  }
  function copyRawPath(rawPath) {
    var a = [], i = 0;
    for (; i < rawPath.length; i++) {
      a[i] = _copyMetaData(rawPath[i], rawPath[i].slice(0));
    }
    return _copyMetaData(rawPath, a);
  }
  function reverseSegment(segment) {
    var i = 0, y;
    segment.reverse();
    for (; i < segment.length; i += 2) {
      y = segment[i];
      segment[i] = segment[i + 1];
      segment[i + 1] = y;
    }
    segment.reversed = !segment.reversed;
  }
  var _createPath = function _createPath2(e, ignore) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path"), attr = [].slice.call(e.attributes), i = attr.length, name;
    ignore = "," + ignore + ",";
    while (--i > -1) {
      name = attr[i].nodeName.toLowerCase();
      if (ignore.indexOf("," + name + ",") < 0) {
        path.setAttributeNS(null, name, attr[i].nodeValue);
      }
    }
    return path;
  };
  var _typeAttrs = {
    rect: "rx,ry,x,y,width,height",
    circle: "r,cx,cy",
    ellipse: "rx,ry,cx,cy",
    line: "x1,x2,y1,y2"
  };
  var _attrToObj = function _attrToObj2(e, attrs) {
    var props = attrs ? attrs.split(",") : [], obj = {}, i = props.length;
    while (--i > -1) {
      obj[props[i]] = +e.getAttribute(props[i]) || 0;
    }
    return obj;
  };
  function convertToPath(element, swap) {
    var type = element.tagName.toLowerCase(), circ = 0.552284749831, data, x, y, r, ry, path, rcirc, rycirc, points, w, h, x2, x3, x4, x5, x6, y2, y3, y4, y5, y6, attr;
    if (type === "path" || !element.getBBox) {
      return element;
    }
    path = _createPath(element, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");
    attr = _attrToObj(element, _typeAttrs[type]);
    if (type === "rect") {
      r = attr.rx;
      ry = attr.ry || r;
      x = attr.x;
      y = attr.y;
      w = attr.width - r * 2;
      h = attr.height - ry * 2;
      if (r || ry) {
        x2 = x + r * (1 - circ);
        x3 = x + r;
        x4 = x3 + w;
        x5 = x4 + r * circ;
        x6 = x4 + r;
        y2 = y + ry * (1 - circ);
        y3 = y + ry;
        y4 = y3 + h;
        y5 = y4 + ry * circ;
        y6 = y4 + ry;
        data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [x6, y5, x5, y6, x4, y6, x4 - (x4 - x3) / 3, y6, x3 + (x4 - x3) / 3, y6, x3, y6, x2, y6, x, y5, x, y4, x, y4 - (y4 - y3) / 3, x, y3 + (y4 - y3) / 3, x, y3, x, y2, x2, y, x3, y, x3 + (x4 - x3) / 3, y, x4 - (x4 - x3) / 3, y, x4, y, x5, y, x6, y2, x6, y3].join(",") + "z";
      } else {
        data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
      }
    } else if (type === "circle" || type === "ellipse") {
      if (type === "circle") {
        r = ry = attr.r;
        rycirc = r * circ;
      } else {
        r = attr.rx;
        ry = attr.ry;
        rycirc = ry * circ;
      }
      x = attr.cx;
      y = attr.cy;
      rcirc = r * circ;
      data = "M" + (x + r) + "," + y + " C" + [x + r, y + rycirc, x + rcirc, y + ry, x, y + ry, x - rcirc, y + ry, x - r, y + rycirc, x - r, y, x - r, y - rycirc, x - rcirc, y - ry, x, y - ry, x + rcirc, y - ry, x + r, y - rycirc, x + r, y].join(",") + "z";
    } else if (type === "line") {
      data = "M" + attr.x1 + "," + attr.y1 + " L" + attr.x2 + "," + attr.y2;
    } else if (type === "polyline" || type === "polygon") {
      points = (element.getAttribute("points") + "").match(_numbersExp) || [];
      x = points.shift();
      y = points.shift();
      data = "M" + x + "," + y + " L" + points.join(",");
      if (type === "polygon") {
        data += "," + x + "," + y + "z";
      }
    }
    path.setAttribute("d", rawPathToString(path._gsRawPath = stringToRawPath(data)));
    if (swap && element.parentNode) {
      element.parentNode.insertBefore(path, element);
      element.parentNode.removeChild(element);
    }
    return path;
  }
  function getRotationAtBezierT(segment, i, t) {
    var a = segment[i], b2 = segment[i + 2], c = segment[i + 4], x;
    a += (b2 - a) * t;
    b2 += (c - b2) * t;
    a += (b2 - a) * t;
    x = b2 + (c + (segment[i + 6] - c) * t - b2) * t - a;
    a = segment[i + 1];
    b2 = segment[i + 3];
    c = segment[i + 5];
    a += (b2 - a) * t;
    b2 += (c - b2) * t;
    a += (b2 - a) * t;
    return _round9(_atan22(b2 + (c + (segment[i + 7] - c) * t - b2) * t - a, x) * _RAD2DEG3);
  }
  function sliceRawPath(rawPath, start, end) {
    end = _isUndefined3(end) ? 1 : _roundPrecise3(end) || 0;
    start = _roundPrecise3(start) || 0;
    var loops = Math.max(0, ~~(_abs2(end - start) - 1e-8)), path = copyRawPath(rawPath);
    if (start > end) {
      start = 1 - start;
      end = 1 - end;
      _reverseRawPath(path);
      path.totalLength = 0;
    }
    if (start < 0 || end < 0) {
      var offset = Math.abs(~~Math.min(start, end)) + 1;
      start += offset;
      end += offset;
    }
    path.totalLength || cacheRawPathMeasurements(path);
    var wrap4 = end > 1, s = getProgressData(path, start, _temp, true), e = getProgressData(path, end, _temp2), eSeg = e.segment, sSeg = s.segment, eSegIndex = e.segIndex, sSegIndex = s.segIndex, ei = e.i, si = s.i, sameSegment = sSegIndex === eSegIndex, sameBezier = ei === si && sameSegment, wrapsBehind, sShift, eShift, i, copy, totalSegments, l, j;
    if (wrap4 || loops) {
      wrapsBehind = eSegIndex < sSegIndex || sameSegment && ei < si || sameBezier && e.t < s.t;
      if (_splitSegment(path, sSegIndex, si, s.t)) {
        sSegIndex++;
        if (!wrapsBehind) {
          eSegIndex++;
          if (sameBezier) {
            e.t = (e.t - s.t) / (1 - s.t);
            ei = 0;
          } else if (sameSegment) {
            ei -= si;
          }
        }
      }
      if (Math.abs(1 - (end - start)) < 1e-5) {
        eSegIndex = sSegIndex - 1;
      } else if (!e.t && eSegIndex) {
        eSegIndex--;
      } else if (_splitSegment(path, eSegIndex, ei, e.t) && wrapsBehind) {
        sSegIndex++;
      }
      if (s.t === 1) {
        sSegIndex = (sSegIndex + 1) % path.length;
      }
      copy = [];
      totalSegments = path.length;
      l = 1 + totalSegments * loops;
      j = sSegIndex;
      l += (totalSegments - sSegIndex + eSegIndex) % totalSegments;
      for (i = 0; i < l; i++) {
        _appendOrMerge(copy, path[j++ % totalSegments]);
      }
      path = copy;
    } else {
      eShift = e.t === 1 ? 6 : subdivideSegment(eSeg, ei, e.t);
      if (start !== end) {
        sShift = subdivideSegment(sSeg, si, sameBezier ? s.t / e.t : s.t);
        sameSegment && (eShift += sShift);
        eSeg.splice(ei + eShift + 2);
        (sShift || si) && sSeg.splice(0, si + sShift);
        i = path.length;
        while (i--) {
          (i < sSegIndex || i > eSegIndex) && path.splice(i, 1);
        }
      } else {
        eSeg.angle = getRotationAtBezierT(eSeg, ei + eShift, 0);
        ei += eShift;
        s = eSeg[ei];
        e = eSeg[ei + 1];
        eSeg.length = eSeg.totalLength = 0;
        eSeg.totalPoints = path.totalPoints = 8;
        eSeg.push(s, e, s, e, s, e, s, e);
      }
    }
    path.totalLength = 0;
    return path;
  }
  function measureSegment(segment, startIndex, bezierQty) {
    startIndex = startIndex || 0;
    if (!segment.samples) {
      segment.samples = [];
      segment.lookup = [];
    }
    var resolution = ~~segment.resolution || 12, inc = 1 / resolution, endIndex = bezierQty ? startIndex + bezierQty * 6 + 1 : segment.length, x1 = segment[startIndex], y1 = segment[startIndex + 1], samplesIndex = startIndex ? startIndex / 6 * resolution : 0, samples = segment.samples, lookup = segment.lookup, min = (startIndex ? segment.minLength : _largeNum) || _largeNum, prevLength = samples[samplesIndex + bezierQty * resolution - 1], length = startIndex ? samples[samplesIndex - 1] : 0, i, j, x4, x3, x2, xd, xd1, y4, y3, y2, yd, yd1, inv, t, lengthIndex, l, segLength;
    samples.length = lookup.length = 0;
    for (j = startIndex + 2; j < endIndex; j += 6) {
      x4 = segment[j + 4] - x1;
      x3 = segment[j + 2] - x1;
      x2 = segment[j] - x1;
      y4 = segment[j + 5] - y1;
      y3 = segment[j + 3] - y1;
      y2 = segment[j + 1] - y1;
      xd = xd1 = yd = yd1 = 0;
      if (_abs2(x4) < 0.01 && _abs2(y4) < 0.01 && _abs2(x2) + _abs2(y2) < 0.01) {
        if (segment.length > 8) {
          segment.splice(j, 6);
          j -= 6;
          endIndex -= 6;
        }
      } else {
        for (i = 1; i <= resolution; i++) {
          t = inc * i;
          inv = 1 - t;
          xd = xd1 - (xd1 = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t);
          yd = yd1 - (yd1 = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t);
          l = _sqrt2(yd * yd + xd * xd);
          if (l < min) {
            min = l;
          }
          length += l;
          samples[samplesIndex++] = length;
        }
      }
      x1 += x4;
      y1 += y4;
    }
    if (prevLength) {
      prevLength -= length;
      for (; samplesIndex < samples.length; samplesIndex++) {
        samples[samplesIndex] += prevLength;
      }
    }
    if (samples.length && min) {
      segment.totalLength = segLength = samples[samples.length - 1] || 0;
      segment.minLength = min;
      if (segLength / min < 9999) {
        l = lengthIndex = 0;
        for (i = 0; i < segLength; i += min) {
          lookup[l++] = samples[lengthIndex] < i ? ++lengthIndex : lengthIndex;
        }
      }
    } else {
      segment.totalLength = samples[0] = 0;
    }
    return startIndex ? length - samples[startIndex / 2 - 1] : length;
  }
  function cacheRawPathMeasurements(rawPath, resolution) {
    var pathLength, points, i;
    for (i = pathLength = points = 0; i < rawPath.length; i++) {
      rawPath[i].resolution = ~~resolution || 12;
      points += rawPath[i].length;
      pathLength += measureSegment(rawPath[i]);
    }
    rawPath.totalPoints = points;
    rawPath.totalLength = pathLength;
    return rawPath;
  }
  function subdivideSegment(segment, i, t) {
    if (t <= 0 || t >= 1) {
      return 0;
    }
    var ax = segment[i], ay = segment[i + 1], cp1x = segment[i + 2], cp1y = segment[i + 3], cp2x = segment[i + 4], cp2y = segment[i + 5], bx = segment[i + 6], by = segment[i + 7], x1a = ax + (cp1x - ax) * t, x2 = cp1x + (cp2x - cp1x) * t, y1a = ay + (cp1y - ay) * t, y2 = cp1y + (cp2y - cp1y) * t, x1 = x1a + (x2 - x1a) * t, y1 = y1a + (y2 - y1a) * t, x2a = cp2x + (bx - cp2x) * t, y2a = cp2y + (by - cp2y) * t;
    x2 += (x2a - x2) * t;
    y2 += (y2a - y2) * t;
    segment.splice(
      i + 2,
      4,
      _round9(x1a),
      //first control point
      _round9(y1a),
      _round9(x1),
      //second control point
      _round9(y1),
      _round9(x1 + (x2 - x1) * t),
      //new fabricated anchor on line
      _round9(y1 + (y2 - y1) * t),
      _round9(x2),
      //third control point
      _round9(y2),
      _round9(x2a),
      //fourth control point
      _round9(y2a)
    );
    segment.samples && segment.samples.splice(i / 6 * segment.resolution | 0, 0, 0, 0, 0, 0, 0, 0);
    return 6;
  }
  function getProgressData(rawPath, progress, decoratee, pushToNextIfAtEnd) {
    decoratee = decoratee || {};
    rawPath.totalLength || cacheRawPathMeasurements(rawPath);
    if (progress < 0 || progress > 1) {
      progress = _wrapProgress(progress);
    }
    var segIndex = 0, segment = rawPath[0], samples, resolution, length, min, max, i, t;
    if (!progress) {
      t = i = segIndex = 0;
      segment = rawPath[0];
    } else if (progress === 1) {
      t = 1;
      segIndex = rawPath.length - 1;
      segment = rawPath[segIndex];
      i = segment.length - 8;
    } else {
      if (rawPath.length > 1) {
        length = rawPath.totalLength * progress;
        max = i = 0;
        while ((max += rawPath[i++].totalLength) < length) {
          segIndex = i;
        }
        segment = rawPath[segIndex];
        min = max - segment.totalLength;
        progress = (length - min) / (max - min) || 0;
      }
      samples = segment.samples;
      resolution = segment.resolution;
      length = segment.totalLength * progress;
      i = segment.lookup.length ? segment.lookup[~~(length / segment.minLength)] || 0 : _getSampleIndex(samples, length, progress);
      min = i ? samples[i - 1] : 0;
      max = samples[i];
      if (max < length) {
        min = max;
        max = samples[++i];
      }
      t = 1 / resolution * ((length - min) / (max - min) + i % resolution);
      i = ~~(i / resolution) * 6;
      if (pushToNextIfAtEnd && t === 1) {
        if (i + 6 < segment.length) {
          i += 6;
          t = 0;
        } else if (segIndex + 1 < rawPath.length) {
          i = t = 0;
          segment = rawPath[++segIndex];
        }
      }
    }
    decoratee.t = t;
    decoratee.i = i;
    decoratee.path = rawPath;
    decoratee.segment = segment;
    decoratee.segIndex = segIndex;
    return decoratee;
  }
  function getPositionOnPath(rawPath, progress, includeAngle, point) {
    var segment = rawPath[0], result = point || {}, samples, resolution, length, min, max, i, t, a, inv;
    if (progress < 0 || progress > 1) {
      progress = _wrapProgress(progress);
    }
    segment.lookup || cacheRawPathMeasurements(rawPath);
    if (rawPath.length > 1) {
      length = rawPath.totalLength * progress;
      max = i = 0;
      while ((max += rawPath[i++].totalLength) < length) {
        segment = rawPath[i];
      }
      min = max - segment.totalLength;
      progress = (length - min) / (max - min) || 0;
    }
    samples = segment.samples;
    resolution = segment.resolution;
    length = segment.totalLength * progress;
    i = segment.lookup.length ? segment.lookup[progress < 1 ? ~~(length / segment.minLength) : segment.lookup.length - 1] || 0 : _getSampleIndex(samples, length, progress);
    min = i ? samples[i - 1] : 0;
    max = samples[i];
    if (max < length) {
      min = max;
      max = samples[++i];
    }
    t = 1 / resolution * ((length - min) / (max - min) + i % resolution) || 0;
    inv = 1 - t;
    i = ~~(i / resolution) * 6;
    a = segment[i];
    result.x = _round9((t * t * (segment[i + 6] - a) + 3 * inv * (t * (segment[i + 4] - a) + inv * (segment[i + 2] - a))) * t + a);
    result.y = _round9((t * t * (segment[i + 7] - (a = segment[i + 1])) + 3 * inv * (t * (segment[i + 5] - a) + inv * (segment[i + 3] - a))) * t + a);
    if (includeAngle) {
      result.angle = segment.totalLength ? getRotationAtBezierT(segment, i, t >= 1 ? 1 - 1e-9 : t ? t : 1e-9) : segment.angle || 0;
    }
    return result;
  }
  function transformRawPath(rawPath, a, b2, c, d, tx, ty) {
    var j = rawPath.length, segment, l, i, x, y;
    while (--j > -1) {
      segment = rawPath[j];
      l = segment.length;
      for (i = 0; i < l; i += 2) {
        x = segment[i];
        y = segment[i + 1];
        segment[i] = x * a + y * c + tx;
        segment[i + 1] = x * b2 + y * d + ty;
      }
    }
    rawPath._dirty = 1;
    return rawPath;
  }
  function arcToSegment(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
    if (lastX === x && lastY === y) {
      return;
    }
    rx = _abs2(rx);
    ry = _abs2(ry);
    var angleRad = angle % 360 * _DEG2RAD3, cosAngle = _cos2(angleRad), sinAngle = _sin2(angleRad), PI = Math.PI, TWOPI = PI * 2, dx2 = (lastX - x) / 2, dy2 = (lastY - y) / 2, x1 = cosAngle * dx2 + sinAngle * dy2, y1 = -sinAngle * dx2 + cosAngle * dy2, x1_sq = x1 * x1, y1_sq = y1 * y1, radiiCheck = x1_sq / (rx * rx) + y1_sq / (ry * ry);
    if (radiiCheck > 1) {
      rx = _sqrt2(radiiCheck) * rx;
      ry = _sqrt2(radiiCheck) * ry;
    }
    var rx_sq = rx * rx, ry_sq = ry * ry, sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);
    if (sq < 0) {
      sq = 0;
    }
    var coef = (largeArcFlag === sweepFlag ? -1 : 1) * _sqrt2(sq), cx1 = coef * (rx * y1 / ry), cy1 = coef * -(ry * x1 / rx), sx2 = (lastX + x) / 2, sy2 = (lastY + y) / 2, cx = sx2 + (cosAngle * cx1 - sinAngle * cy1), cy = sy2 + (sinAngle * cx1 + cosAngle * cy1), ux = (x1 - cx1) / rx, uy = (y1 - cy1) / ry, vx = (-x1 - cx1) / rx, vy = (-y1 - cy1) / ry, temp = ux * ux + uy * uy, angleStart = (uy < 0 ? -1 : 1) * Math.acos(ux / _sqrt2(temp)), angleExtent = (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos((ux * vx + uy * vy) / _sqrt2(temp * (vx * vx + vy * vy)));
    isNaN(angleExtent) && (angleExtent = PI);
    if (!sweepFlag && angleExtent > 0) {
      angleExtent -= TWOPI;
    } else if (sweepFlag && angleExtent < 0) {
      angleExtent += TWOPI;
    }
    angleStart %= TWOPI;
    angleExtent %= TWOPI;
    var segments = Math.ceil(_abs2(angleExtent) / (TWOPI / 4)), rawPath = [], angleIncrement = angleExtent / segments, controlLength = 4 / 3 * _sin2(angleIncrement / 2) / (1 + _cos2(angleIncrement / 2)), ma = cosAngle * rx, mb = sinAngle * rx, mc = sinAngle * -ry, md = cosAngle * ry, i;
    for (i = 0; i < segments; i++) {
      angle = angleStart + i * angleIncrement;
      x1 = _cos2(angle);
      y1 = _sin2(angle);
      ux = _cos2(angle += angleIncrement);
      uy = _sin2(angle);
      rawPath.push(x1 - controlLength * y1, y1 + controlLength * x1, ux + controlLength * uy, uy - controlLength * ux, ux, uy);
    }
    for (i = 0; i < rawPath.length; i += 2) {
      x1 = rawPath[i];
      y1 = rawPath[i + 1];
      rawPath[i] = x1 * ma + y1 * mc + cx;
      rawPath[i + 1] = x1 * mb + y1 * md + cy;
    }
    rawPath[i - 2] = x;
    rawPath[i - 1] = y;
    return rawPath;
  }
  function stringToRawPath(d) {
    var a = (d + "").replace(_scientific, function(m) {
      var n = +m;
      return n < 1e-4 && n > -1e-4 ? 0 : n;
    }).match(_svgPathExp) || [], path = [], relativeX = 0, relativeY = 0, twoThirds = 2 / 3, elements = a.length, points = 0, errorMessage = "ERROR: malformed path: " + d, i, j, x, y, command, isRelative, segment, startX, startY, difX, difY, beziers, prevCommand, flag1, flag2, line = function line2(sx, sy, ex, ey) {
      difX = (ex - sx) / 3;
      difY = (ey - sy) / 3;
      segment.push(sx + difX, sy + difY, ex - difX, ey - difY, ex, ey);
    };
    if (!d || !isNaN(a[0]) || isNaN(a[1])) {
      console.log(errorMessage);
      return path;
    }
    for (i = 0; i < elements; i++) {
      prevCommand = command;
      if (isNaN(a[i])) {
        command = a[i].toUpperCase();
        isRelative = command !== a[i];
      } else {
        i--;
      }
      x = +a[i + 1];
      y = +a[i + 2];
      if (isRelative) {
        x += relativeX;
        y += relativeY;
      }
      if (!i) {
        startX = x;
        startY = y;
      }
      if (command === "M") {
        if (segment) {
          if (segment.length < 8) {
            path.length -= 1;
          } else {
            points += segment.length;
          }
        }
        relativeX = startX = x;
        relativeY = startY = y;
        segment = [x, y];
        path.push(segment);
        i += 2;
        command = "L";
      } else if (command === "C") {
        if (!segment) {
          segment = [0, 0];
        }
        if (!isRelative) {
          relativeX = relativeY = 0;
        }
        segment.push(x, y, relativeX + a[i + 3] * 1, relativeY + a[i + 4] * 1, relativeX += a[i + 5] * 1, relativeY += a[i + 6] * 1);
        i += 6;
      } else if (command === "S") {
        difX = relativeX;
        difY = relativeY;
        if (prevCommand === "C" || prevCommand === "S") {
          difX += relativeX - segment[segment.length - 4];
          difY += relativeY - segment[segment.length - 3];
        }
        if (!isRelative) {
          relativeX = relativeY = 0;
        }
        segment.push(difX, difY, x, y, relativeX += a[i + 3] * 1, relativeY += a[i + 4] * 1);
        i += 4;
      } else if (command === "Q") {
        difX = relativeX + (x - relativeX) * twoThirds;
        difY = relativeY + (y - relativeY) * twoThirds;
        if (!isRelative) {
          relativeX = relativeY = 0;
        }
        relativeX += a[i + 3] * 1;
        relativeY += a[i + 4] * 1;
        segment.push(difX, difY, relativeX + (x - relativeX) * twoThirds, relativeY + (y - relativeY) * twoThirds, relativeX, relativeY);
        i += 4;
      } else if (command === "T") {
        difX = relativeX - segment[segment.length - 4];
        difY = relativeY - segment[segment.length - 3];
        segment.push(relativeX + difX, relativeY + difY, x + (relativeX + difX * 1.5 - x) * twoThirds, y + (relativeY + difY * 1.5 - y) * twoThirds, relativeX = x, relativeY = y);
        i += 2;
      } else if (command === "H") {
        line(relativeX, relativeY, relativeX = x, relativeY);
        i += 1;
      } else if (command === "V") {
        line(relativeX, relativeY, relativeX, relativeY = x + (isRelative ? relativeY - relativeX : 0));
        i += 1;
      } else if (command === "L" || command === "Z") {
        if (command === "Z") {
          x = startX;
          y = startY;
          segment.closed = true;
        }
        if (command === "L" || _abs2(relativeX - x) > 0.5 || _abs2(relativeY - y) > 0.5) {
          line(relativeX, relativeY, x, y);
          if (command === "L") {
            i += 2;
          }
        }
        relativeX = x;
        relativeY = y;
      } else if (command === "A") {
        flag1 = a[i + 4];
        flag2 = a[i + 5];
        difX = a[i + 6];
        difY = a[i + 7];
        j = 7;
        if (flag1.length > 1) {
          if (flag1.length < 3) {
            difY = difX;
            difX = flag2;
            j--;
          } else {
            difY = flag2;
            difX = flag1.substr(2);
            j -= 2;
          }
          flag2 = flag1.charAt(1);
          flag1 = flag1.charAt(0);
        }
        beziers = arcToSegment(relativeX, relativeY, +a[i + 1], +a[i + 2], +a[i + 3], +flag1, +flag2, (isRelative ? relativeX : 0) + difX * 1, (isRelative ? relativeY : 0) + difY * 1);
        i += j;
        if (beziers) {
          for (j = 0; j < beziers.length; j++) {
            segment.push(beziers[j]);
          }
        }
        relativeX = segment[segment.length - 2];
        relativeY = segment[segment.length - 1];
      } else {
        console.log(errorMessage);
      }
    }
    i = segment.length;
    if (i < 6) {
      path.pop();
      i = 0;
    } else if (segment[0] === segment[i - 2] && segment[1] === segment[i - 1]) {
      segment.closed = true;
    }
    path.totalPoints = points + i;
    return path;
  }
  function flatPointsToSegment(points, curviness) {
    if (curviness === void 0) {
      curviness = 1;
    }
    var x = points[0], y = 0, segment = [x, y], i = 2;
    for (; i < points.length; i += 2) {
      segment.push(x, y, points[i], y = (points[i] - x) * curviness / 2, x = points[i], -y);
    }
    return segment;
  }
  function pointsToSegment(points, curviness) {
    _abs2(points[0] - points[2]) < 1e-4 && _abs2(points[1] - points[3]) < 1e-4 && (points = points.slice(2));
    var l = points.length - 2, x = +points[0], y = +points[1], nextX = +points[2], nextY = +points[3], segment = [x, y, x, y], dx2 = nextX - x, dy2 = nextY - y, closed = Math.abs(points[l] - x) < 1e-3 && Math.abs(points[l + 1] - y) < 1e-3, prevX, prevY, i, dx1, dy1, r1, r2, r3, tl, mx1, mx2, mxm, my1, my2, mym;
    if (closed) {
      points.push(nextX, nextY);
      nextX = x;
      nextY = y;
      x = points[l - 2];
      y = points[l - 1];
      points.unshift(x, y);
      l += 4;
    }
    curviness = curviness || curviness === 0 ? +curviness : 1;
    for (i = 2; i < l; i += 2) {
      prevX = x;
      prevY = y;
      x = nextX;
      y = nextY;
      nextX = +points[i + 2];
      nextY = +points[i + 3];
      if (x === nextX && y === nextY) {
        continue;
      }
      dx1 = dx2;
      dy1 = dy2;
      dx2 = nextX - x;
      dy2 = nextY - y;
      r1 = _sqrt2(dx1 * dx1 + dy1 * dy1);
      r2 = _sqrt2(dx2 * dx2 + dy2 * dy2);
      r3 = _sqrt2(Math.pow(dx2 / r2 + dx1 / r1, 2) + Math.pow(dy2 / r2 + dy1 / r1, 2));
      tl = (r1 + r2) * curviness * 0.25 / r3;
      mx1 = x - (x - prevX) * (r1 ? tl / r1 : 0);
      mx2 = x + (nextX - x) * (r2 ? tl / r2 : 0);
      mxm = x - (mx1 + ((mx2 - mx1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
      my1 = y - (y - prevY) * (r1 ? tl / r1 : 0);
      my2 = y + (nextY - y) * (r2 ? tl / r2 : 0);
      mym = y - (my1 + ((my2 - my1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
      if (x !== prevX || y !== prevY) {
        segment.push(
          _round9(mx1 + mxm),
          // first control point
          _round9(my1 + mym),
          _round9(x),
          // anchor
          _round9(y),
          _round9(mx2 + mxm),
          // second control point
          _round9(my2 + mym)
        );
      }
    }
    x !== nextX || y !== nextY || segment.length < 4 ? segment.push(_round9(nextX), _round9(nextY), _round9(nextX), _round9(nextY)) : segment.length -= 2;
    if (segment.length === 2) {
      segment.push(x, y, x, y, x, y);
    } else if (closed) {
      segment.splice(0, 6);
      segment.length = segment.length - 6;
    }
    return segment;
  }
  function rawPathToString(rawPath) {
    if (_isNumber5(rawPath[0])) {
      rawPath = [rawPath];
    }
    var result = "", l = rawPath.length, sl, s, i, segment;
    for (s = 0; s < l; s++) {
      segment = rawPath[s];
      result += "M" + _round9(segment[0]) + "," + _round9(segment[1]) + " C";
      sl = segment.length;
      for (i = 2; i < sl; i++) {
        result += _round9(segment[i++]) + "," + _round9(segment[i++]) + " " + _round9(segment[i++]) + "," + _round9(segment[i++]) + " " + _round9(segment[i++]) + "," + _round9(segment[i]) + " ";
      }
      if (segment.closed) {
        result += "z";
      }
    }
    return result;
  }

  // node_modules/gsap/MotionPathPlugin.js
  var _xProps = "x,translateX,left,marginLeft,xPercent".split(",");
  var _yProps = "y,translateY,top,marginTop,yPercent".split(",");
  var _DEG2RAD4 = Math.PI / 180;
  var gsap6;
  var PropTween2;
  var _getUnit;
  var _toArray4;
  var _getStyleSaver4;
  var _reverting3;
  var _getGSAP7 = function _getGSAP8() {
    return gsap6 || typeof window !== "undefined" && (gsap6 = window.gsap) && gsap6.registerPlugin && gsap6;
  };
  var _populateSegmentFromArray = function _populateSegmentFromArray2(segment, values2, property, mode) {
    var l = values2.length, si = mode === 2 ? 0 : mode, i = 0, v;
    for (; i < l; i++) {
      segment[si] = v = parseFloat(values2[i][property]);
      mode === 2 && (segment[si + 1] = 0);
      si += 2;
    }
    return segment;
  };
  var _getPropNum = function _getPropNum2(target, prop, unit) {
    return parseFloat(target._gsap.get(target, prop, unit || "px")) || 0;
  };
  var _relativize = function _relativize2(segment) {
    var x = segment[0], y = segment[1], i;
    for (i = 2; i < segment.length; i += 2) {
      x = segment[i] += x;
      y = segment[i + 1] += y;
    }
  };
  var _segmentToRawPath = function _segmentToRawPath2(plugin, segment, target, x, y, slicer, vars, unitX, unitY) {
    if (vars.type === "cubic") {
      segment = [segment];
    } else {
      vars.fromCurrent !== false && segment.unshift(_getPropNum(target, x, unitX), y ? _getPropNum(target, y, unitY) : 0);
      vars.relative && _relativize(segment);
      var pointFunc = y ? pointsToSegment : flatPointsToSegment;
      segment = [pointFunc(segment, vars.curviness)];
    }
    segment = slicer(_align(segment, target, vars));
    _addDimensionalPropTween(plugin, target, x, segment, "x", unitX);
    y && _addDimensionalPropTween(plugin, target, y, segment, "y", unitY);
    return cacheRawPathMeasurements(segment, vars.resolution || (vars.curviness === 0 ? 20 : 12));
  };
  var _emptyFunc3 = function _emptyFunc4(v) {
    return v;
  };
  var _numExp2 = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g;
  var _originToPoint = function _originToPoint2(element, origin, parentMatrix) {
    var m = getGlobalMatrix(element), x = 0, y = 0, svg;
    if ((element.tagName + "").toLowerCase() === "svg") {
      svg = element.viewBox.baseVal;
      svg.width || (svg = {
        width: +element.getAttribute("width"),
        height: +element.getAttribute("height")
      });
    } else {
      svg = origin && element.getBBox && element.getBBox();
    }
    if (origin && origin !== "auto") {
      x = origin.push ? origin[0] * (svg ? svg.width : element.offsetWidth || 0) : origin.x;
      y = origin.push ? origin[1] * (svg ? svg.height : element.offsetHeight || 0) : origin.y;
    }
    return parentMatrix.apply(x || y ? m.apply({
      x,
      y
    }) : {
      x: m.e,
      y: m.f
    });
  };
  var _getAlignMatrix = function _getAlignMatrix2(fromElement, toElement, fromOrigin, toOrigin) {
    var parentMatrix = getGlobalMatrix(fromElement.parentNode, true, true), m = parentMatrix.clone().multiply(getGlobalMatrix(toElement)), fromPoint = _originToPoint(fromElement, fromOrigin, parentMatrix), _originToPoint22 = _originToPoint(toElement, toOrigin, parentMatrix), x = _originToPoint22.x, y = _originToPoint22.y, p;
    m.e = m.f = 0;
    if (toOrigin === "auto" && toElement.getTotalLength && toElement.tagName.toLowerCase() === "path") {
      p = toElement.getAttribute("d").match(_numExp2) || [];
      p = m.apply({
        x: +p[0],
        y: +p[1]
      });
      x += p.x;
      y += p.y;
    }
    if (p) {
      p = m.apply(toElement.getBBox());
      x -= p.x;
      y -= p.y;
    }
    m.e = x - fromPoint.x;
    m.f = y - fromPoint.y;
    return m;
  };
  var _align = function _align2(rawPath, target, _ref) {
    var align = _ref.align, matrix = _ref.matrix, offsetX = _ref.offsetX, offsetY = _ref.offsetY, alignOrigin = _ref.alignOrigin;
    var x = rawPath[0][0], y = rawPath[0][1], curX = _getPropNum(target, "x"), curY = _getPropNum(target, "y"), alignTarget, m, p;
    if (!rawPath || !rawPath.length) {
      return getRawPath("M0,0L0,0");
    }
    if (align) {
      if (align === "self" || (alignTarget = _toArray4(align)[0] || target) === target) {
        transformRawPath(rawPath, 1, 0, 0, 1, curX - x, curY - y);
      } else {
        if (alignOrigin && alignOrigin[2] !== false) {
          gsap6.set(target, {
            transformOrigin: alignOrigin[0] * 100 + "% " + alignOrigin[1] * 100 + "%"
          });
        } else {
          alignOrigin = [_getPropNum(target, "xPercent") / -100, _getPropNum(target, "yPercent") / -100];
        }
        m = _getAlignMatrix(target, alignTarget, alignOrigin, "auto");
        p = m.apply({
          x,
          y
        });
        transformRawPath(rawPath, m.a, m.b, m.c, m.d, curX + m.e - (p.x - m.e), curY + m.f - (p.y - m.f));
      }
    }
    if (matrix) {
      transformRawPath(rawPath, matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    } else if (offsetX || offsetY) {
      transformRawPath(rawPath, 1, 0, 0, 1, offsetX || 0, offsetY || 0);
    }
    return rawPath;
  };
  var _addDimensionalPropTween = function _addDimensionalPropTween2(plugin, target, property, rawPath, pathProperty, forceUnit) {
    var cache2 = target._gsap, harness = cache2.harness, alias = harness && harness.aliases && harness.aliases[property], prop = alias && alias.indexOf(",") < 0 ? alias : property, pt = plugin._pt = new PropTween2(plugin._pt, target, prop, 0, 0, _emptyFunc3, 0, cache2.set(target, prop, plugin));
    pt.u = _getUnit(cache2.get(target, prop, forceUnit)) || 0;
    pt.path = rawPath;
    pt.pp = pathProperty;
    plugin._props.push(prop);
  };
  var _sliceModifier = function _sliceModifier2(start, end) {
    return function(rawPath) {
      return start || end !== 1 ? sliceRawPath(rawPath, start, end) : rawPath;
    };
  };
  var MotionPathPlugin = {
    version: "3.13.0",
    name: "motionPath",
    register: function register(core, Plugin, propTween) {
      gsap6 = core;
      _getUnit = gsap6.utils.getUnit;
      _toArray4 = gsap6.utils.toArray;
      _getStyleSaver4 = gsap6.core.getStyleSaver;
      _reverting3 = gsap6.core.reverting || function() {
      };
      PropTween2 = propTween;
    },
    init: function init4(target, vars, tween) {
      if (!gsap6) {
        console.warn("Please gsap.registerPlugin(MotionPathPlugin)");
        return false;
      }
      if (!(typeof vars === "object" && !vars.style) || !vars.path) {
        vars = {
          path: vars
        };
      }
      var rawPaths = [], _vars = vars, path = _vars.path, autoRotate = _vars.autoRotate, unitX = _vars.unitX, unitY = _vars.unitY, x = _vars.x, y = _vars.y, firstObj = path[0], slicer = _sliceModifier(vars.start, "end" in vars ? vars.end : 1), rawPath, p;
      this.rawPaths = rawPaths;
      this.target = target;
      this.tween = tween;
      this.styles = _getStyleSaver4 && _getStyleSaver4(target, "transform");
      if (this.rotate = autoRotate || autoRotate === 0) {
        this.rOffset = parseFloat(autoRotate) || 0;
        this.radians = !!vars.useRadians;
        this.rProp = vars.rotation || "rotation";
        this.rSet = target._gsap.set(target, this.rProp, this);
        this.ru = _getUnit(target._gsap.get(target, this.rProp)) || 0;
      }
      if (Array.isArray(path) && !("closed" in path) && typeof firstObj !== "number") {
        for (p in firstObj) {
          if (!x && ~_xProps.indexOf(p)) {
            x = p;
          } else if (!y && ~_yProps.indexOf(p)) {
            y = p;
          }
        }
        if (x && y) {
          rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray(_populateSegmentFromArray([], path, x, 0), path, y, 1), target, x, y, slicer, vars, unitX || _getUnit(path[0][x]), unitY || _getUnit(path[0][y])));
        } else {
          x = y = 0;
        }
        for (p in firstObj) {
          p !== x && p !== y && rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray([], path, p, 2), target, p, 0, slicer, vars, _getUnit(path[0][p])));
        }
      } else {
        rawPath = slicer(_align(getRawPath(vars.path), target, vars));
        cacheRawPathMeasurements(rawPath, vars.resolution);
        rawPaths.push(rawPath);
        _addDimensionalPropTween(this, target, vars.x || "x", rawPath, "x", vars.unitX || "px");
        _addDimensionalPropTween(this, target, vars.y || "y", rawPath, "y", vars.unitY || "px");
      }
      tween.vars.immediateRender && this.render(tween.progress(), this);
    },
    render: function render3(ratio, data) {
      var rawPaths = data.rawPaths, i = rawPaths.length, pt = data._pt;
      if (data.tween._time || !_reverting3()) {
        if (ratio > 1) {
          ratio = 1;
        } else if (ratio < 0) {
          ratio = 0;
        }
        while (i--) {
          getPositionOnPath(rawPaths[i], ratio, !i && data.rotate, rawPaths[i]);
        }
        while (pt) {
          pt.set(pt.t, pt.p, pt.path[pt.pp] + pt.u, pt.d, ratio);
          pt = pt._next;
        }
        data.rotate && data.rSet(data.target, data.rProp, rawPaths[0].angle * (data.radians ? _DEG2RAD4 : 1) + data.rOffset + data.ru, data, ratio);
      } else {
        data.styles.revert();
      }
    },
    getLength: function getLength(path) {
      return cacheRawPathMeasurements(getRawPath(path)).totalLength;
    },
    sliceRawPath,
    getRawPath,
    pointsToSegment,
    stringToRawPath,
    rawPathToString,
    transformRawPath,
    getGlobalMatrix,
    getPositionOnPath,
    cacheRawPathMeasurements,
    convertToPath: function convertToPath2(targets, swap) {
      return _toArray4(targets).map(function(target) {
        return convertToPath(target, swap !== false);
      });
    },
    convertCoordinates: function convertCoordinates(fromElement, toElement, point) {
      var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
      return point ? m.apply(point) : m;
    },
    getAlignMatrix: _getAlignMatrix,
    getRelativePosition: function getRelativePosition(fromElement, toElement, fromOrigin, toOrigin) {
      var m = _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin);
      return {
        x: m.e,
        y: m.f
      };
    },
    arrayToRawPath: function arrayToRawPath(value, vars) {
      vars = vars || {};
      var segment = _populateSegmentFromArray(_populateSegmentFromArray([], value, vars.x || "x", 0), value, vars.y || "y", 1);
      vars.relative && _relativize(segment);
      return [vars.type === "cubic" ? segment : pointsToSegment(segment, vars.curviness)];
    }
  };
  _getGSAP7() && gsap6.registerPlugin(MotionPathPlugin);

  // node_modules/gsap/SplitText.js
  init_define_import_meta_env();
  var gsap7;
  var _fonts;
  var _coreInitted5;
  var _initIfNecessary = () => _coreInitted5 || SplitText.register(window.gsap);
  var _charSegmenter = typeof Intl !== "undefined" ? new Intl.Segmenter() : 0;
  var _toArray5 = (r) => typeof r === "string" ? _toArray5(document.querySelectorAll(r)) : "length" in r ? Array.from(r) : [r];
  var _elements = (targets) => _toArray5(targets).filter((e) => e instanceof HTMLElement);
  var _emptyArray3 = [];
  var _context5 = function() {
  };
  var _spacesRegEx = /\s+/g;
  var _emojiSafeRegEx = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu");
  var _emptyBounds = { left: 0, top: 0, width: 0, height: 0 };
  var _stretchToFitSpecialChars = (collection, specialCharsRegEx) => {
    if (specialCharsRegEx) {
      let charsFound = new Set(collection.join("").match(specialCharsRegEx) || _emptyArray3), i = collection.length, slots, word, char, combined;
      if (charsFound.size) {
        while (--i > -1) {
          word = collection[i];
          for (char of charsFound) {
            if (char.startsWith(word) && char.length > word.length) {
              slots = 0;
              combined = word;
              while (char.startsWith(combined += collection[i + ++slots]) && combined.length < char.length) {
              }
              if (slots && combined.length === char.length) {
                collection[i] = char;
                collection.splice(i + 1, slots);
                break;
              }
            }
          }
        }
      }
    }
    return collection;
  };
  var _disallowInline = (element) => window.getComputedStyle(element).display === "inline" && (element.style.display = "inline-block");
  var _insertNodeBefore = (newChild, parent, existingChild) => parent.insertBefore(typeof newChild === "string" ? document.createTextNode(newChild) : newChild, existingChild);
  var _getWrapper = (type, config3, collection) => {
    let className = config3[type + "sClass"] || "", { tag = "div", aria = "auto", propIndex = false } = config3, display = type === "line" ? "block" : "inline-block", incrementClass = className.indexOf("++") > -1, wrapper = (text) => {
      let el = document.createElement(tag), i = collection.length + 1;
      className && (el.className = className + (incrementClass ? " " + className + i : ""));
      propIndex && el.style.setProperty("--" + type, i + "");
      aria !== "none" && el.setAttribute("aria-hidden", "true");
      if (tag !== "span") {
        el.style.position = "relative";
        el.style.display = display;
      }
      el.textContent = text;
      collection.push(el);
      return el;
    };
    incrementClass && (className = className.replace("++", ""));
    wrapper.collection = collection;
    return wrapper;
  };
  var _getLineWrapper = (element, nodes, config3, collection) => {
    let lineWrapper = _getWrapper("line", config3, collection), textAlign = window.getComputedStyle(element).textAlign || "left";
    return (startIndex, endIndex) => {
      let newLine = lineWrapper("");
      newLine.style.textAlign = textAlign;
      element.insertBefore(newLine, nodes[startIndex]);
      for (; startIndex < endIndex; startIndex++) {
        newLine.appendChild(nodes[startIndex]);
      }
      newLine.normalize();
    };
  };
  var _splitWordsAndCharsRecursively = (element, config3, wordWrapper, charWrapper, prepForCharsOnly, deepSlice, ignore, charSplitRegEx, specialCharsRegEx, isNested) => {
    var _a2;
    let nodes = Array.from(element.childNodes), i = 0, { wordDelimiter, reduceWhiteSpace = true, prepareText } = config3, elementBounds = element.getBoundingClientRect(), lastBounds = elementBounds, isPreformatted = !reduceWhiteSpace && window.getComputedStyle(element).whiteSpace.substring(0, 3) === "pre", ignoredPreviousSibling = 0, wordsCollection = wordWrapper.collection, wordDelimIsNotSpace, wordDelimString, wordDelimSplitter, curNode, words, curWordEl, startsWithSpace, endsWithSpace, j, bounds, curWordChars, clonedNode, curSubNode, tempSubNode, curTextContent, wordText, lastWordText, k;
    if (typeof wordDelimiter === "object") {
      wordDelimSplitter = wordDelimiter.delimiter || wordDelimiter;
      wordDelimString = wordDelimiter.replaceWith || "";
    } else {
      wordDelimString = wordDelimiter === "" ? "" : wordDelimiter || " ";
    }
    wordDelimIsNotSpace = wordDelimString !== " ";
    for (; i < nodes.length; i++) {
      curNode = nodes[i];
      if (curNode.nodeType === 3) {
        curTextContent = curNode.textContent || "";
        if (reduceWhiteSpace) {
          curTextContent = curTextContent.replace(_spacesRegEx, " ");
        } else if (isPreformatted) {
          curTextContent = curTextContent.replace(/\n/g, wordDelimString + "\n");
        }
        prepareText && (curTextContent = prepareText(curTextContent, element));
        curNode.textContent = curTextContent;
        words = wordDelimString || wordDelimSplitter ? curTextContent.split(wordDelimSplitter || wordDelimString) : curTextContent.match(charSplitRegEx) || _emptyArray3;
        lastWordText = words[words.length - 1];
        endsWithSpace = wordDelimIsNotSpace ? lastWordText.slice(-1) === " " : !lastWordText;
        lastWordText || words.pop();
        lastBounds = elementBounds;
        startsWithSpace = wordDelimIsNotSpace ? words[0].charAt(0) === " " : !words[0];
        startsWithSpace && _insertNodeBefore(" ", element, curNode);
        words[0] || words.shift();
        _stretchToFitSpecialChars(words, specialCharsRegEx);
        deepSlice && isNested || (curNode.textContent = "");
        for (j = 1; j <= words.length; j++) {
          wordText = words[j - 1];
          if (!reduceWhiteSpace && isPreformatted && wordText.charAt(0) === "\n") {
            (_a2 = curNode.previousSibling) == null ? void 0 : _a2.remove();
            _insertNodeBefore(document.createElement("br"), element, curNode);
            wordText = wordText.slice(1);
          }
          if (!reduceWhiteSpace && wordText === "") {
            _insertNodeBefore(wordDelimString, element, curNode);
          } else if (wordText === " ") {
            element.insertBefore(document.createTextNode(" "), curNode);
          } else {
            wordDelimIsNotSpace && wordText.charAt(0) === " " && _insertNodeBefore(" ", element, curNode);
            if (ignoredPreviousSibling && j === 1 && !startsWithSpace && wordsCollection.indexOf(ignoredPreviousSibling.parentNode) > -1) {
              curWordEl = wordsCollection[wordsCollection.length - 1];
              curWordEl.appendChild(document.createTextNode(charWrapper ? "" : wordText));
            } else {
              curWordEl = wordWrapper(charWrapper ? "" : wordText);
              _insertNodeBefore(curWordEl, element, curNode);
              ignoredPreviousSibling && j === 1 && !startsWithSpace && curWordEl.insertBefore(ignoredPreviousSibling, curWordEl.firstChild);
            }
            if (charWrapper) {
              curWordChars = _charSegmenter ? _stretchToFitSpecialChars([..._charSegmenter.segment(wordText)].map((s) => s.segment), specialCharsRegEx) : wordText.match(charSplitRegEx) || _emptyArray3;
              for (k = 0; k < curWordChars.length; k++) {
                curWordEl.appendChild(curWordChars[k] === " " ? document.createTextNode(" ") : charWrapper(curWordChars[k]));
              }
            }
            if (deepSlice && isNested) {
              curTextContent = curNode.textContent = curTextContent.substring(wordText.length + 1, curTextContent.length);
              bounds = curWordEl.getBoundingClientRect();
              if (bounds.top > lastBounds.top && bounds.left <= lastBounds.left) {
                clonedNode = element.cloneNode();
                curSubNode = element.childNodes[0];
                while (curSubNode && curSubNode !== curWordEl) {
                  tempSubNode = curSubNode;
                  curSubNode = curSubNode.nextSibling;
                  clonedNode.appendChild(tempSubNode);
                }
                element.parentNode.insertBefore(clonedNode, element);
                prepForCharsOnly && _disallowInline(clonedNode);
              }
              lastBounds = bounds;
            }
            if (j < words.length || endsWithSpace) {
              _insertNodeBefore(j >= words.length ? " " : wordDelimIsNotSpace && wordText.slice(-1) === " " ? " " + wordDelimString : wordDelimString, element, curNode);
            }
          }
        }
        element.removeChild(curNode);
        ignoredPreviousSibling = 0;
      } else if (curNode.nodeType === 1) {
        if (ignore && ignore.indexOf(curNode) > -1) {
          wordsCollection.indexOf(curNode.previousSibling) > -1 && wordsCollection[wordsCollection.length - 1].appendChild(curNode);
          ignoredPreviousSibling = curNode;
        } else {
          _splitWordsAndCharsRecursively(curNode, config3, wordWrapper, charWrapper, prepForCharsOnly, deepSlice, ignore, charSplitRegEx, specialCharsRegEx, true);
          ignoredPreviousSibling = 0;
        }
        prepForCharsOnly && _disallowInline(curNode);
      }
    }
  };
  var _SplitText = class _SplitText2 {
    constructor(elements, config3) {
      this.isSplit = false;
      _initIfNecessary();
      this.elements = _elements(elements);
      this.chars = [];
      this.words = [];
      this.lines = [];
      this.masks = [];
      this.vars = config3;
      this._split = () => this.isSplit && this.split(this.vars);
      let orig = [], timerId, checkWidths = () => {
        let i = orig.length, o;
        while (i--) {
          o = orig[i];
          let w = o.element.offsetWidth;
          if (w !== o.width) {
            o.width = w;
            this._split();
            return;
          }
        }
      };
      this._data = { orig, obs: typeof ResizeObserver !== "undefined" && new ResizeObserver(() => {
        clearTimeout(timerId);
        timerId = setTimeout(checkWidths, 200);
      }) };
      _context5(this);
      this.split(config3);
    }
    split(config3) {
      this.isSplit && this.revert();
      this.vars = config3 = config3 || this.vars || {};
      let { type = "chars,words,lines", aria = "auto", deepSlice = true, smartWrap, onSplit, autoSplit = false, specialChars, mask } = this.vars, splitLines = type.indexOf("lines") > -1, splitCharacters = type.indexOf("chars") > -1, splitWords = type.indexOf("words") > -1, onlySplitCharacters = splitCharacters && !splitWords && !splitLines, specialCharsRegEx = specialChars && ("push" in specialChars ? new RegExp("(?:" + specialChars.join("|") + ")", "gu") : specialChars), finalCharSplitRegEx = specialCharsRegEx ? new RegExp(specialCharsRegEx.source + "|" + _emojiSafeRegEx.source, "gu") : _emojiSafeRegEx, ignore = !!config3.ignore && _elements(config3.ignore), { orig, animTime, obs } = this._data, onSplitResult;
      if (splitCharacters || splitWords || splitLines) {
        this.elements.forEach((element, index) => {
          orig[index] = {
            element,
            html: element.innerHTML,
            ariaL: element.getAttribute("aria-label"),
            ariaH: element.getAttribute("aria-hidden")
          };
          aria === "auto" ? element.setAttribute("aria-label", (element.textContent || "").trim()) : aria === "hidden" && element.setAttribute("aria-hidden", "true");
          let chars = [], words = [], lines = [], charWrapper = splitCharacters ? _getWrapper("char", config3, chars) : null, wordWrapper = _getWrapper("word", config3, words), i, curWord, smartWrapSpan, nextSibling;
          _splitWordsAndCharsRecursively(element, config3, wordWrapper, charWrapper, onlySplitCharacters, deepSlice && (splitLines || onlySplitCharacters), ignore, finalCharSplitRegEx, specialCharsRegEx, false);
          if (splitLines) {
            let nodes = _toArray5(element.childNodes), wrapLine = _getLineWrapper(element, nodes, config3, lines), curNode, toRemove = [], lineStartIndex = 0, allBounds = nodes.map((n) => n.nodeType === 1 ? n.getBoundingClientRect() : _emptyBounds), lastBounds = _emptyBounds;
            for (i = 0; i < nodes.length; i++) {
              curNode = nodes[i];
              if (curNode.nodeType === 1) {
                if (curNode.nodeName === "BR") {
                  toRemove.push(curNode);
                  wrapLine(lineStartIndex, i + 1);
                  lineStartIndex = i + 1;
                  lastBounds = allBounds[lineStartIndex];
                } else {
                  if (i && allBounds[i].top > lastBounds.top && allBounds[i].left <= lastBounds.left) {
                    wrapLine(lineStartIndex, i);
                    lineStartIndex = i;
                  }
                  lastBounds = allBounds[i];
                }
              }
            }
            lineStartIndex < i && wrapLine(lineStartIndex, i);
            toRemove.forEach((el) => {
              var _a2;
              return (_a2 = el.parentNode) == null ? void 0 : _a2.removeChild(el);
            });
          }
          if (!splitWords) {
            for (i = 0; i < words.length; i++) {
              curWord = words[i];
              if (splitCharacters || !curWord.nextSibling || curWord.nextSibling.nodeType !== 3) {
                if (smartWrap && !splitLines) {
                  smartWrapSpan = document.createElement("span");
                  smartWrapSpan.style.whiteSpace = "nowrap";
                  while (curWord.firstChild) {
                    smartWrapSpan.appendChild(curWord.firstChild);
                  }
                  curWord.replaceWith(smartWrapSpan);
                } else {
                  curWord.replaceWith(...curWord.childNodes);
                }
              } else {
                nextSibling = curWord.nextSibling;
                if (nextSibling && nextSibling.nodeType === 3) {
                  nextSibling.textContent = (curWord.textContent || "") + (nextSibling.textContent || "");
                  curWord.remove();
                }
              }
            }
            words.length = 0;
            element.normalize();
          }
          this.lines.push(...lines);
          this.words.push(...words);
          this.chars.push(...chars);
        });
        mask && this[mask] && this.masks.push(...this[mask].map((el) => {
          let maskEl = el.cloneNode();
          el.replaceWith(maskEl);
          maskEl.appendChild(el);
          el.className && (maskEl.className = el.className.replace(/(\b\w+\b)/g, "$1-mask"));
          maskEl.style.overflow = "clip";
          return maskEl;
        }));
      }
      this.isSplit = true;
      _fonts && (autoSplit ? _fonts.addEventListener("loadingdone", this._split) : _fonts.status === "loading" && console.warn("SplitText called before fonts loaded"));
      if ((onSplitResult = onSplit && onSplit(this)) && onSplitResult.totalTime) {
        this._data.anim = animTime ? onSplitResult.totalTime(animTime) : onSplitResult;
      }
      splitLines && autoSplit && this.elements.forEach((element, index) => {
        orig[index].width = element.offsetWidth;
        obs && obs.observe(element);
      });
      return this;
    }
    revert() {
      var _a2, _b;
      let { orig, anim, obs } = this._data;
      obs && obs.disconnect();
      orig.forEach(({ element, html, ariaL, ariaH }) => {
        element.innerHTML = html;
        ariaL ? element.setAttribute("aria-label", ariaL) : element.removeAttribute("aria-label");
        ariaH ? element.setAttribute("aria-hidden", ariaH) : element.removeAttribute("aria-hidden");
      });
      this.chars.length = this.words.length = this.lines.length = orig.length = this.masks.length = 0;
      this.isSplit = false;
      _fonts == null ? void 0 : _fonts.removeEventListener("loadingdone", this._split);
      if (anim) {
        this._data.animTime = anim.totalTime();
        anim.revert();
      }
      (_b = (_a2 = this.vars).onRevert) == null ? void 0 : _b.call(_a2, this);
      return this;
    }
    static create(elements, config3) {
      return new _SplitText2(elements, config3);
    }
    static register(core) {
      gsap7 = gsap7 || core || window.gsap;
      if (gsap7) {
        _toArray5 = gsap7.utils.toArray;
        _context5 = gsap7.core.context || _context5;
      }
      if (!_coreInitted5 && window.innerWidth > 0) {
        _fonts = document.fonts;
        _coreInitted5 = true;
      }
    }
  };
  _SplitText.version = "3.13.0";
  var SplitText = _SplitText;

  // globals.mjs
  var import_imagesloaded = __toESM(require_imagesloaded(), 1);
  var import_splitting = __toESM(require_splitting(), 1);

  // node_modules/split-type/dist/index.js
  init_define_import_meta_env();
  (function() {
    function append() {
      var length = arguments.length;
      for (var i = 0; i < length; i++) {
        var node = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (node.nodeType === 1 || node.nodeType === 11) this.appendChild(node);
        else this.appendChild(document.createTextNode(String(node)));
      }
    }
    function replaceChildren() {
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }
      if (arguments.length) this.append.apply(this, arguments);
    }
    function replaceWith() {
      var parent = this.parentNode;
      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }
      var i = nodes.length;
      if (!parent) return;
      if (!i) parent.removeChild(this);
      while (i--) {
        var node = nodes[i];
        if (typeof node !== "object") {
          node = this.ownerDocument.createTextNode(node);
        } else if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
        if (!i) {
          parent.replaceChild(node, this);
        } else {
          parent.insertBefore(this.previousSibling, node);
        }
      }
    }
    if (typeof Element !== "undefined") {
      if (!Element.prototype.append) {
        Element.prototype.append = append;
        DocumentFragment.prototype.append = append;
      }
      if (!Element.prototype.replaceChildren) {
        Element.prototype.replaceChildren = replaceChildren;
        DocumentFragment.prototype.replaceChildren = replaceChildren;
      }
      if (!Element.prototype.replaceWith) {
        Element.prototype.replaceWith = replaceWith;
        DocumentFragment.prototype.replaceWith = replaceWith;
      }
    }
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties3(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i2 = arr[Symbol.iterator](), _s; !(_n = (_s = _i2.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i2["return"] != null) _i2["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function extend(target, object) {
    return Object.getOwnPropertyNames(Object(target)).reduce(function(extended, key) {
      var currentValue = Object.getOwnPropertyDescriptor(Object(target), key);
      var newValue = Object.getOwnPropertyDescriptor(Object(object), key);
      return Object.defineProperty(extended, key, newValue || currentValue);
    }, {});
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function parseSettings() {
    var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var object = extend(settings);
    var types;
    if (object.types !== void 0) {
      types = object.types;
    } else if (object.split !== void 0) {
      types = object.split;
    }
    if (types !== void 0) {
      object.types = (isString(types) || isArray(types) ? String(types) : "").split(",").map(function(type) {
        return String(type).trim();
      }).filter(function(type) {
        return /((line)|(word)|(char))/i.test(type);
      });
    }
    if (object.absolute || object.position) {
      object.absolute = object.absolute || /absolute/.test(settings.position);
    }
    return object;
  }
  function parseTypes(value) {
    var types = isString(value) || isArray(value) ? String(value) : "";
    return {
      none: !types,
      lines: /line/i.test(types),
      words: /word/i.test(types),
      chars: /char/i.test(types)
    };
  }
  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  function isNode(input) {
    return isObject(input) && /^(1|3|11)$/.test(input.nodeType);
  }
  function isLength(value) {
    return typeof value === "number" && value > -1 && value % 1 === 0;
  }
  function isArrayLike(value) {
    return isObject(value) && isLength(value.length);
  }
  function toArray3(value) {
    if (isArray(value)) return value;
    if (value == null) return [];
    return isArrayLike(value) ? Array.prototype.slice.call(value) : [value];
  }
  function getTargetElements(target) {
    var elements = target;
    if (isString(target)) {
      if (/^(#[a-z]\w+)$/.test(target.trim())) {
        elements = document.getElementById(target.trim().slice(1));
      } else {
        elements = document.querySelectorAll(target);
      }
    }
    return toArray3(elements).reduce(function(result, element) {
      return [].concat(_toConsumableArray(result), _toConsumableArray(toArray3(element).filter(isNode)));
    }, []);
  }
  var entries = Object.entries;
  var expando = "_splittype";
  var cache = {};
  var uid = 0;
  function set(owner, key, value) {
    if (!isObject(owner)) {
      console.warn("[data.set] owner is not an object");
      return null;
    }
    var id = owner[expando] || (owner[expando] = ++uid);
    var data = cache[id] || (cache[id] = {});
    if (value === void 0) {
      if (!!key && Object.getPrototypeOf(key) === Object.prototype) {
        cache[id] = _objectSpread2(_objectSpread2({}, data), key);
      }
    } else if (key !== void 0) {
      data[key] = value;
    }
    return value;
  }
  function get(owner, key) {
    var id = isObject(owner) ? owner[expando] : null;
    var data = id && cache[id] || {};
    if (key === void 0) {
      return data;
    }
    return data[key];
  }
  function remove(element) {
    var id = element && element[expando];
    if (id) {
      delete element[id];
      delete cache[id];
    }
  }
  function clear() {
    Object.keys(cache).forEach(function(key) {
      delete cache[key];
    });
  }
  function cleanup() {
    entries(cache).forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], _ref2$ = _ref2[1], isRoot = _ref2$.isRoot, isSplit = _ref2$.isSplit;
      if (!isRoot || !isSplit) {
        cache[id] = null;
        delete cache[id];
      }
    });
  }
  function toWords(value) {
    var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ";
    var string = value ? String(value) : "";
    return string.trim().replace(/\s+/g, " ").split(separator);
  }
  var rsAstralRange = "\\ud800-\\udfff";
  var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
  var rsComboSymbolsRange = "\\u20d0-\\u20f0";
  var rsVarRange = "\\ufe0e\\ufe0f";
  var rsAstral = "[".concat(rsAstralRange, "]");
  var rsCombo = "[".concat(rsComboMarksRange).concat(rsComboSymbolsRange, "]");
  var rsFitz = "\\ud83c[\\udffb-\\udfff]";
  var rsModifier = "(?:".concat(rsCombo, "|").concat(rsFitz, ")");
  var rsNonAstral = "[^".concat(rsAstralRange, "]");
  var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
  var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
  var rsZWJ = "\\u200d";
  var reOptMod = "".concat(rsModifier, "?");
  var rsOptVar = "[".concat(rsVarRange, "]?");
  var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
  var rsSeq = rsOptVar + reOptMod + rsOptJoin;
  var rsSymbol = "(?:".concat(["".concat(rsNonAstral).concat(rsCombo, "?"), rsCombo, rsRegional, rsSurrPair, rsAstral].join("|"), "\n)");
  var reUnicode = RegExp("".concat(rsFitz, "(?=").concat(rsFitz, ")|").concat(rsSymbol).concat(rsSeq), "g");
  var unicodeRange = [rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange];
  var reHasUnicode = RegExp("[".concat(unicodeRange.join(""), "]"));
  function asciiToArray(string) {
    return string.split("");
  }
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  function toString(value) {
    return value == null ? "" : String(value);
  }
  function toChars(string) {
    var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    string = toString(string);
    if (string && isString(string)) {
      if (!separator && hasUnicode(string)) {
        return stringToArray(string);
      }
    }
    return string.split(separator);
  }
  function createElement(name, attributes) {
    var element = document.createElement(name);
    if (!attributes) {
      return element;
    }
    Object.keys(attributes).forEach(function(attribute) {
      var rawValue = attributes[attribute];
      var value = isString(rawValue) ? rawValue.trim() : rawValue;
      if (value === null || value === "") return;
      if (attribute === "children") {
        element.append.apply(element, _toConsumableArray(toArray3(value)));
      } else {
        element.setAttribute(attribute, value);
      }
    });
    return element;
  }
  var defaults2 = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: false,
    tagName: "div"
  };
  function splitWordsAndChars(textNode, settings) {
    settings = extend(defaults2, settings);
    var types = parseTypes(settings.types);
    var TAG_NAME = settings.tagName;
    var VALUE = textNode.nodeValue;
    var splitText = document.createDocumentFragment();
    var words = [];
    var chars = [];
    if (/^\s/.test(VALUE)) {
      splitText.append(" ");
    }
    words = toWords(VALUE).reduce(function(result, WORD, idx, arr) {
      var wordElement;
      var characterElementsForCurrentWord;
      if (types.chars) {
        characterElementsForCurrentWord = toChars(WORD).map(function(CHAR) {
          var characterElement = createElement(TAG_NAME, {
            "class": "".concat(settings.splitClass, " ").concat(settings.charClass),
            style: "display: inline-block;",
            children: CHAR
          });
          set(characterElement, "isChar", true);
          chars = [].concat(_toConsumableArray(chars), [characterElement]);
          return characterElement;
        });
      }
      if (types.words || types.lines) {
        wordElement = createElement(TAG_NAME, {
          "class": "".concat(settings.wordClass, " ").concat(settings.splitClass),
          style: "display: inline-block; ".concat(types.words && settings.absolute ? "position: relative;" : ""),
          children: types.chars ? characterElementsForCurrentWord : WORD
        });
        set(wordElement, {
          isWord: true,
          isWordStart: true,
          isWordEnd: true
        });
        splitText.appendChild(wordElement);
      } else {
        characterElementsForCurrentWord.forEach(function(characterElement) {
          splitText.appendChild(characterElement);
        });
      }
      if (idx < arr.length - 1) {
        splitText.append(" ");
      }
      return types.words ? result.concat(wordElement) : result;
    }, []);
    if (/\s$/.test(VALUE)) {
      splitText.append(" ");
    }
    textNode.replaceWith(splitText);
    return {
      words,
      chars
    };
  }
  function split(node, settings) {
    var type = node.nodeType;
    var wordsAndChars = {
      words: [],
      chars: []
    };
    if (!/(1|3|11)/.test(type)) {
      return wordsAndChars;
    }
    if (type === 3 && /\S/.test(node.nodeValue)) {
      return splitWordsAndChars(node, settings);
    }
    var childNodes = toArray3(node.childNodes);
    if (childNodes.length) {
      set(node, "isSplit", true);
      if (!get(node).isRoot) {
        node.style.display = "inline-block";
        node.style.position = "relative";
        var nextSibling = node.nextSibling;
        var prevSibling = node.previousSibling;
        var text = node.textContent || "";
        var textAfter = nextSibling ? nextSibling.textContent : " ";
        var textBefore = prevSibling ? prevSibling.textContent : " ";
        set(node, {
          isWordEnd: /\s$/.test(text) || /^\s/.test(textAfter),
          isWordStart: /^\s/.test(text) || /\s$/.test(textBefore)
        });
      }
    }
    return childNodes.reduce(function(result, child) {
      var _split = split(child, settings), words = _split.words, chars = _split.chars;
      return {
        words: [].concat(_toConsumableArray(result.words), _toConsumableArray(words)),
        chars: [].concat(_toConsumableArray(result.chars), _toConsumableArray(chars))
      };
    }, wordsAndChars);
  }
  function getPosition(node, isWord, settings, scrollPos) {
    if (!settings.absolute) {
      return {
        top: isWord ? node.offsetTop : null
      };
    }
    var parent = node.offsetParent;
    var _scrollPos = _slicedToArray(scrollPos, 2), scrollX = _scrollPos[0], scrollY = _scrollPos[1];
    var parentX = 0;
    var parentY = 0;
    if (parent && parent !== document.body) {
      var parentRect = parent.getBoundingClientRect();
      parentX = parentRect.x + scrollX;
      parentY = parentRect.y + scrollY;
    }
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height, x = _node$getBoundingClie.x, y = _node$getBoundingClie.y;
    var top = y + scrollY - parentY;
    var left = x + scrollX - parentX;
    return {
      width,
      height,
      top,
      left
    };
  }
  function unSplitWords(element) {
    if (!get(element).isWord) {
      toArray3(element.children).forEach(function(child) {
        return unSplitWords(child);
      });
    } else {
      remove(element);
      element.replaceWith.apply(element, _toConsumableArray(element.childNodes));
    }
  }
  var createFragment = function createFragment2() {
    return document.createDocumentFragment();
  };
  function repositionAfterSplit(element, settings, scrollPos) {
    var types = parseTypes(settings.types);
    var TAG_NAME = settings.tagName;
    var nodes = element.getElementsByTagName("*");
    var wordsInEachLine = [];
    var wordsInCurrentLine = [];
    var lineOffsetY = null;
    var elementHeight;
    var elementWidth;
    var contentBox;
    var lines = [];
    var parent = element.parentElement;
    var nextSibling = element.nextElementSibling;
    var splitText = createFragment();
    var cs = window.getComputedStyle(element);
    var align = cs.textAlign;
    var fontSize = parseFloat(cs.fontSize);
    var lineThreshold = fontSize * 0.2;
    if (settings.absolute) {
      contentBox = {
        left: element.offsetLeft,
        top: element.offsetTop,
        width: element.offsetWidth
      };
      elementWidth = element.offsetWidth;
      elementHeight = element.offsetHeight;
      set(element, {
        cssWidth: element.style.width,
        cssHeight: element.style.height
      });
    }
    toArray3(nodes).forEach(function(node) {
      var isWordLike = node.parentElement === element;
      var _getPosition = getPosition(node, isWordLike, settings, scrollPos), width = _getPosition.width, height = _getPosition.height, top = _getPosition.top, left = _getPosition.left;
      if (/^br$/i.test(node.nodeName)) return;
      if (types.lines && isWordLike) {
        if (lineOffsetY === null || top - lineOffsetY >= lineThreshold) {
          lineOffsetY = top;
          wordsInEachLine.push(wordsInCurrentLine = []);
        }
        wordsInCurrentLine.push(node);
      }
      if (settings.absolute) {
        set(node, {
          top,
          left,
          width,
          height
        });
      }
    });
    if (parent) {
      parent.removeChild(element);
    }
    if (types.lines) {
      lines = wordsInEachLine.map(function(wordsInThisLine) {
        var lineElement = createElement(TAG_NAME, {
          "class": "".concat(settings.splitClass, " ").concat(settings.lineClass),
          style: "display: block; text-align: ".concat(align, "; width: 100%;")
        });
        set(lineElement, "isLine", true);
        var lineDimensions = {
          height: 0,
          top: 1e4
        };
        splitText.appendChild(lineElement);
        wordsInThisLine.forEach(function(wordOrElement, idx, arr) {
          var _data$get = get(wordOrElement), isWordEnd = _data$get.isWordEnd, top = _data$get.top, height = _data$get.height;
          var next3 = arr[idx + 1];
          lineDimensions.height = Math.max(lineDimensions.height, height);
          lineDimensions.top = Math.min(lineDimensions.top, top);
          lineElement.appendChild(wordOrElement);
          if (isWordEnd && get(next3).isWordStart) {
            lineElement.append(" ");
          }
        });
        if (settings.absolute) {
          set(lineElement, {
            height: lineDimensions.height,
            top: lineDimensions.top
          });
        }
        return lineElement;
      });
      if (!types.words) {
        unSplitWords(splitText);
      }
      element.replaceChildren(splitText);
    }
    if (settings.absolute) {
      element.style.width = "".concat(element.style.width || elementWidth, "px");
      element.style.height = "".concat(elementHeight, "px");
      toArray3(nodes).forEach(function(node) {
        var _data$get2 = get(node), isLine = _data$get2.isLine, top = _data$get2.top, left = _data$get2.left, width = _data$get2.width, height = _data$get2.height;
        var parentData = get(node.parentElement);
        var isChildOfLineNode = !isLine && parentData.isLine;
        node.style.top = "".concat(isChildOfLineNode ? top - parentData.top : top, "px");
        node.style.left = isLine ? "".concat(contentBox.left, "px") : "".concat(left - (isChildOfLineNode ? contentBox.left : 0), "px");
        node.style.height = "".concat(height, "px");
        node.style.width = isLine ? "".concat(contentBox.width, "px") : "".concat(width, "px");
        node.style.position = "absolute";
      });
    }
    if (parent) {
      if (nextSibling) parent.insertBefore(element, nextSibling);
      else parent.appendChild(element);
    }
    return lines;
  }
  var _defaults3 = extend(defaults2, {});
  var SplitType = /* @__PURE__ */ (function() {
    _createClass3(SplitType2, null, [{
      key: "clearData",
      /**
       * CLears all data
       */
      value: function clearData() {
        clear();
      }
      /**
       * The default settings for all splitType instances
       * @static
       */
    }, {
      key: "setDefaults",
      /**
       * Sets the default settings for all SplitType instances.
       * The provided object will be merged with the existing defaults objects.
       *
       * @param {Object} settings an object containing the settings to override
       * @returns {Object} the new default settings
       * @public
       * @static
       * @example
       * SplitType.setDefaults({ "position": "absolute" })
       */
      value: function setDefaults(options) {
        _defaults3 = extend(_defaults3, parseSettings(options));
        return defaults2;
      }
      /**
       * Revert target elements to their original html content
       * Has no effect on that
       *
       * @param {any} elements The target elements to revert. One of:
       *  - {string} A css selector
       *  - {HTMLElement} A single element
       * -  {NodeList} A NodeList or collection
       *  - {HTMLElement[]} An array of Elements
       * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
       * @static
       */
    }, {
      key: "revert",
      value: function revert(elements) {
        getTargetElements(elements).forEach(function(element) {
          var _data$get = get(element), isSplit = _data$get.isSplit, html = _data$get.html, cssWidth = _data$get.cssWidth, cssHeight = _data$get.cssHeight;
          if (isSplit) {
            element.innerHTML = html;
            element.style.width = cssWidth || "";
            element.style.height = cssHeight || "";
            remove(element);
          }
        });
      }
      /**
       * Creates a new SplitType instance
       * This static method provides a way to create a `SplitType` instance without
       * using the `new` keyword.
       *
       * @param {any} target The target elements to split. One of:
       *  - {string} A css selector
       *  - {HTMLElement} A single element
       * -  {NodeList} A NodeList or collection
       *  - {HTMLElement[]} An array of Elements
       * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
       * @param {Object} [options] Settings for the SplitType instance
       * @return {SplitType} the SplitType instance
       * @static
       */
    }, {
      key: "create",
      value: function create(target, options) {
        return new SplitType2(target, options);
      }
      /**
       * Creates a new `SplitType` instance
       *
       * @param {any} elements The target elements to split. One of:
       *  - {string} A css selector
       *  - {HTMLElement} A single element
       * -  {NodeList} A NodeList or collection
       *  - {HTMLElement[]} An array of Elements
       * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
       * @param {Object} [options] Settings for the SplitType instance
       */
    }, {
      key: "data",
      /**
       * The internal data store
       */
      get: function get2() {
        return cache;
      }
    }, {
      key: "defaults",
      get: function get2() {
        return _defaults3;
      },
      set: function set2(options) {
        _defaults3 = extend(_defaults3, parseSettings(options));
      }
    }]);
    function SplitType2(elements, options) {
      _classCallCheck(this, SplitType2);
      this.isSplit = false;
      this.settings = extend(_defaults3, parseSettings(options));
      this.elements = getTargetElements(elements);
      this.split();
    }
    _createClass3(SplitType2, [{
      key: "split",
      value: function split$1(options) {
        var _this = this;
        this.revert();
        this.elements.forEach(function(element) {
          set(element, "html", element.innerHTML);
        });
        this.lines = [];
        this.words = [];
        this.chars = [];
        var scrollPos = [window.pageXOffset, window.pageYOffset];
        if (options !== void 0) {
          this.settings = extend(this.settings, parseSettings(options));
        }
        var types = parseTypes(this.settings.types);
        if (types.none) {
          return;
        }
        this.elements.forEach(function(element) {
          set(element, "isRoot", true);
          var _split2 = split(element, _this.settings), words = _split2.words, chars = _split2.chars;
          _this.words = [].concat(_toConsumableArray(_this.words), _toConsumableArray(words));
          _this.chars = [].concat(_toConsumableArray(_this.chars), _toConsumableArray(chars));
        });
        this.elements.forEach(function(element) {
          if (types.lines || _this.settings.absolute) {
            var lines = repositionAfterSplit(element, _this.settings, scrollPos);
            _this.lines = [].concat(_toConsumableArray(_this.lines), _toConsumableArray(lines));
          }
        });
        this.isSplit = true;
        window.scrollTo(scrollPos[0], scrollPos[1]);
        cleanup();
      }
      /**
       * Reverts target element(s) back to their original html content
       * Deletes all stored data associated with the target elements
       * Resets the properties on the splitType instance
       *
       * @public
       */
    }, {
      key: "revert",
      value: function revert() {
        if (this.isSplit) {
          this.lines = null;
          this.words = null;
          this.chars = null;
          this.isSplit = false;
        }
        SplitType2.revert(this.elements);
      }
    }]);
    return SplitType2;
  })();

  // globals.mjs
  gsapWithCSS.registerPlugin(ScrollTrigger2, ScrollSmoother, Flip, MotionPathPlugin, SplitText);
  Object.assign(window, { gsap: gsapWithCSS, ScrollTrigger: ScrollTrigger2, ScrollSmoother, Flip, MotionPathPlugin, SplitText, imagesLoaded: import_imagesloaded.default, Splitting: import_splitting.default, SplitType });

  // source/js/main.js
  init_define_import_meta_env();

  // source/js/rd-compute.js
  init_define_import_meta_env();

  // source/js/libs/webgpu-utils.module.js
  init_define_import_meta_env();
  var roundUpToMultipleOf = (v, multiple) => ((v + multiple - 1) / multiple | 0) * multiple;
  function keysOf(obj) {
    return Object.keys(obj);
  }
  function range(count, fn) {
    return new Array(count).fill(0).map((_, i) => fn(i));
  }
  var isTypedArray = (arr) => arr && typeof arr.length === "number" && arr.buffer instanceof ArrayBuffer && typeof arr.byteLength === "number";
  var b = {
    i32: { numElements: 1, align: 4, size: 4, type: "i32", View: Int32Array },
    u32: { numElements: 1, align: 4, size: 4, type: "u32", View: Uint32Array },
    f32: { numElements: 1, align: 4, size: 4, type: "f32", View: Float32Array },
    f16: { numElements: 1, align: 2, size: 2, type: "u16", View: Uint16Array },
    vec2f: { numElements: 2, align: 8, size: 8, type: "f32", View: Float32Array },
    vec2i: { numElements: 2, align: 8, size: 8, type: "i32", View: Int32Array },
    vec2u: { numElements: 2, align: 8, size: 8, type: "u32", View: Uint32Array },
    vec2h: { numElements: 2, align: 4, size: 4, type: "u16", View: Uint16Array },
    vec3i: { numElements: 3, align: 16, size: 12, type: "i32", View: Int32Array },
    vec3u: { numElements: 3, align: 16, size: 12, type: "u32", View: Uint32Array },
    vec3f: { numElements: 3, align: 16, size: 12, type: "f32", View: Float32Array },
    vec3h: { numElements: 3, align: 8, size: 6, type: "u16", View: Uint16Array },
    vec4i: { numElements: 4, align: 16, size: 16, type: "i32", View: Int32Array },
    vec4u: { numElements: 4, align: 16, size: 16, type: "u32", View: Uint32Array },
    vec4f: { numElements: 4, align: 16, size: 16, type: "f32", View: Float32Array },
    vec4h: { numElements: 4, align: 8, size: 8, type: "u16", View: Uint16Array },
    // AlignOf(vecR)	SizeOf(array<vecR, C>)
    mat2x2f: { numElements: 4, align: 8, size: 16, type: "f32", View: Float32Array },
    mat2x2h: { numElements: 4, align: 4, size: 8, type: "u16", View: Uint16Array },
    mat3x2f: { numElements: 6, align: 8, size: 24, type: "f32", View: Float32Array },
    mat3x2h: { numElements: 6, align: 4, size: 12, type: "u16", View: Uint16Array },
    mat4x2f: { numElements: 8, align: 8, size: 32, type: "f32", View: Float32Array },
    mat4x2h: { numElements: 8, align: 4, size: 16, type: "u16", View: Uint16Array },
    mat2x3f: { numElements: 8, align: 16, size: 32, pad: [3, 1], type: "f32", View: Float32Array },
    mat2x3h: { numElements: 8, align: 8, size: 16, pad: [3, 1], type: "u16", View: Uint16Array },
    mat3x3f: { numElements: 12, align: 16, size: 48, pad: [3, 1], type: "f32", View: Float32Array },
    mat3x3h: { numElements: 12, align: 8, size: 24, pad: [3, 1], type: "u16", View: Uint16Array },
    mat4x3f: { numElements: 16, align: 16, size: 64, pad: [3, 1], type: "f32", View: Float32Array },
    mat4x3h: { numElements: 16, align: 8, size: 32, pad: [3, 1], type: "u16", View: Uint16Array },
    mat2x4f: { numElements: 8, align: 16, size: 32, type: "f32", View: Float32Array },
    mat2x4h: { numElements: 8, align: 8, size: 16, type: "u16", View: Uint16Array },
    mat3x4f: { numElements: 12, align: 16, size: 48, pad: [3, 1], type: "f32", View: Float32Array },
    mat3x4h: { numElements: 12, align: 8, size: 24, pad: [3, 1], type: "u16", View: Uint16Array },
    mat4x4f: { numElements: 16, align: 16, size: 64, type: "f32", View: Float32Array },
    mat4x4h: { numElements: 16, align: 8, size: 32, type: "u16", View: Uint16Array },
    // Note: At least as of WGSL V1 you can not create a bool for uniform or storage.
    // You can only create one in an internal struct. But, this code generates
    // views of structs and it needs to not fail if the struct has a bool
    bool: { numElements: 0, align: 1, size: 0, type: "bool", View: Uint32Array }
  };
  var typeInfo = {
    ...b,
    "vec2<i32>": b.vec2i,
    "vec2<u32>": b.vec2u,
    "vec2<f32>": b.vec2f,
    "vec2<f16>": b.vec2h,
    "vec3<i32>": b.vec3i,
    "vec3<u32>": b.vec3u,
    "vec3<f32>": b.vec3f,
    "vec3<f16>": b.vec3h,
    "vec4<i32>": b.vec4i,
    "vec4<u32>": b.vec4u,
    "vec4<f32>": b.vec4f,
    "vec4<f16>": b.vec4h,
    "mat2x2<f32>": b.mat2x2f,
    "mat2x2<f16>": b.mat2x2h,
    "mat3x2<f32>": b.mat3x2f,
    "mat3x2<f16>": b.mat3x2h,
    "mat4x2<f32>": b.mat4x2f,
    "mat4x2<f16>": b.mat4x2h,
    "mat2x3<f32>": b.mat2x3f,
    "mat2x3<f16>": b.mat2x3h,
    "mat3x3<f32>": b.mat3x3f,
    "mat3x3<f16>": b.mat3x3h,
    "mat4x3<f32>": b.mat4x3f,
    "mat4x3<f16>": b.mat4x3h,
    "mat2x4<f32>": b.mat2x4f,
    "mat2x4<f16>": b.mat2x4h,
    "mat3x4<f32>": b.mat3x4f,
    "mat3x4<f16>": b.mat3x4h,
    "mat4x4<f32>": b.mat4x4f,
    "mat4x4<f16>": b.mat4x4h
  };
  var kTypes = keysOf(typeInfo);
  function setIntrinsicsToView(types = [], flatten) {
    const visited = /* @__PURE__ */ new Set();
    for (const type of kTypes) {
      const info = typeInfo[type];
      if (!visited.has(info)) {
        visited.add(info);
        info.flatten = types.includes(type) ? flatten : !flatten;
      }
    }
  }
  setIntrinsicsToView();
  function getSizeOfTypeDef(typeDef) {
    const asArrayDef = typeDef;
    const elementType = asArrayDef.elementType;
    if (elementType) {
      return asArrayDef.size;
    } else {
      const asStructDef = typeDef;
      const numElements = asArrayDef.numElements || 1;
      if (asStructDef.fields) {
        return typeDef.size * numElements;
      } else {
        const asIntrinsicDef = typeDef;
        const { align } = typeInfo[asIntrinsicDef.type];
        return numElements > 1 ? roundUpToMultipleOf(typeDef.size, align) * numElements : typeDef.size;
      }
    }
  }
  function makeIntrinsicTypedArrayView(typeDef, buffer2, baseOffset, numElements) {
    const { size, type } = typeDef;
    try {
      const { View, align } = typeInfo[type];
      const isArray2 = numElements !== void 0;
      const sizeInBytes = isArray2 ? roundUpToMultipleOf(size, align) : size;
      const baseNumElements = sizeInBytes / View.BYTES_PER_ELEMENT;
      const effectiveNumElements = isArray2 ? numElements === 0 ? (buffer2.byteLength - baseOffset) / sizeInBytes : numElements : 1;
      return new View(buffer2, baseOffset, baseNumElements * effectiveNumElements);
    } catch {
      throw new Error(`unknown type: ${type}`);
    }
  }
  function isIntrinsic(typeDef) {
    return !typeDef.fields && !typeDef.elementType;
  }
  function makeTypedArrayViews(typeDef, arrayBuffer, offset) {
    const baseOffset = offset || 0;
    const buffer2 = arrayBuffer || new ArrayBuffer(getSizeOfTypeDef(typeDef));
    const makeViews = (typeDef2, baseOffset2) => {
      const asArrayDef = typeDef2;
      const elementType = asArrayDef.elementType;
      if (elementType) {
        if (isIntrinsic(elementType) && typeInfo[elementType.type].flatten) {
          return makeIntrinsicTypedArrayView(elementType, buffer2, baseOffset2, asArrayDef.numElements);
        } else {
          const { size } = getSizeAndAlignmentOfUnsizedArrayElementOfTypeDef(typeDef2);
          const effectiveNumElements = asArrayDef.numElements === 0 ? (buffer2.byteLength - baseOffset2) / size : asArrayDef.numElements;
          return range(effectiveNumElements, (i) => makeViews(elementType, baseOffset2 + size * i));
        }
      } else if (typeof typeDef2 === "string") {
        throw Error("unreachable");
      } else {
        const fields = typeDef2.fields;
        if (fields) {
          const views = {};
          for (const [name, { type, offset: offset2 }] of Object.entries(fields)) {
            views[name] = makeViews(type, baseOffset2 + offset2);
          }
          return views;
        } else {
          return makeIntrinsicTypedArrayView(typeDef2, buffer2, baseOffset2);
        }
      }
    };
    return { views: makeViews(typeDef, baseOffset), arrayBuffer: buffer2 };
  }
  function setStructuredView(data, views) {
    if (data === void 0) {
      return;
    } else if (isTypedArray(views)) {
      const view = views;
      if (view.length === 1 && typeof data === "number") {
        view[0] = data;
      } else {
        if (Array.isArray(data[0]) || isTypedArray(data[0])) {
          const dataLen = data[0].length;
          const stride = dataLen === 3 ? 4 : dataLen;
          for (let i = 0; i < data.length; ++i) {
            const offset = i * stride;
            view.set(data[i], offset);
          }
        } else {
          view.set(data);
        }
      }
    } else if (Array.isArray(views)) {
      const asArray = views;
      data.forEach((newValue, ndx) => {
        setStructuredView(newValue, asArray[ndx]);
      });
    } else {
      const asViews = views;
      for (const [key, newValue] of Object.entries(data)) {
        const view = asViews[key];
        if (view) {
          setStructuredView(newValue, view);
        }
      }
    }
  }
  function makeStructuredView(varDef, arrayBuffer, offset = 0) {
    const asVarDef = varDef;
    const typeDef = asVarDef.group === void 0 ? varDef : asVarDef.typeDefinition;
    const views = makeTypedArrayViews(typeDef, arrayBuffer, offset);
    return {
      ...views,
      set(data) {
        setStructuredView(data, views.views);
      }
    };
  }
  function getAlignmentOfTypeDef(typeDef) {
    const asArrayDef = typeDef;
    const elementType = asArrayDef.elementType;
    if (elementType) {
      return getAlignmentOfTypeDef(elementType);
    }
    const asStructDef = typeDef;
    const fields = asStructDef.fields;
    if (fields) {
      return Object.values(fields).reduce((max, { type: type2 }) => Math.max(max, getAlignmentOfTypeDef(type2)), 0);
    }
    const { type } = typeDef;
    const { align } = typeInfo[type];
    return align;
  }
  function getSizeAndAlignmentOfUnsizedArrayElementOfTypeDef(typeDef) {
    const asArrayDef = typeDef;
    const elementType = asArrayDef.elementType;
    if (elementType) {
      const unalignedSize = elementType.size;
      const align = getAlignmentOfTypeDef(elementType);
      return {
        unalignedSize,
        align,
        size: roundUpToMultipleOf(unalignedSize, align)
      };
    }
    const asStructDef = typeDef;
    const fields = asStructDef.fields;
    if (fields) {
      const lastField = Object.values(fields).pop();
      if (lastField.type.size === 0) {
        return getSizeAndAlignmentOfUnsizedArrayElementOfTypeDef(lastField.type);
      }
    }
    return {
      size: 0,
      unalignedSize: 0,
      align: 1
    };
  }
  var ParseContext = class {
    constructor() {
      this.constants = /* @__PURE__ */ new Map();
      this.aliases = /* @__PURE__ */ new Map();
      this.structs = /* @__PURE__ */ new Map();
    }
  };
  var Node = class {
    constructor() {
    }
    get isAstNode() {
      return true;
    }
    get astNodeType() {
      return "";
    }
    evaluate(context3) {
      throw new Error("Cannot evaluate node");
    }
    evaluateString(context3) {
      return this.evaluate(context3).toString();
    }
    search(callback) {
    }
    searchBlock(block, callback) {
      if (block) {
        callback(_BlockStart.instance);
        for (const node of block) {
          if (node instanceof Array) {
            this.searchBlock(node, callback);
          } else {
            node.search(callback);
          }
        }
        callback(_BlockEnd.instance);
      }
    }
  };
  var _BlockStart = class extends Node {
  };
  _BlockStart.instance = new _BlockStart();
  var _BlockEnd = class extends Node {
  };
  _BlockEnd.instance = new _BlockEnd();
  var Statement = class extends Node {
    constructor() {
      super();
    }
  };
  var Function = class extends Statement {
    constructor(name, args, returnType, body) {
      super();
      this.name = name;
      this.args = args;
      this.returnType = returnType;
      this.body = body;
    }
    get astNodeType() {
      return "function";
    }
    search(callback) {
      this.searchBlock(this.body, callback);
    }
  };
  var StaticAssert = class extends Statement {
    constructor(expression) {
      super();
      this.expression = expression;
    }
    get astNodeType() {
      return "staticAssert";
    }
    search(callback) {
      this.expression.search(callback);
    }
  };
  var While = class extends Statement {
    constructor(condition, body) {
      super();
      this.condition = condition;
      this.body = body;
    }
    get astNodeType() {
      return "while";
    }
    search(callback) {
      this.condition.search(callback);
      this.searchBlock(this.body, callback);
    }
  };
  var Continuing = class extends Statement {
    constructor(body) {
      super();
      this.body = body;
    }
    get astNodeType() {
      return "continuing";
    }
    search(callback) {
      this.searchBlock(this.body, callback);
    }
  };
  var For = class extends Statement {
    constructor(init6, condition, increment, body) {
      super();
      this.init = init6;
      this.condition = condition;
      this.increment = increment;
      this.body = body;
    }
    get astNodeType() {
      return "for";
    }
    search(callback) {
      var _a2, _b, _c;
      (_a2 = this.init) === null || _a2 === void 0 ? void 0 : _a2.search(callback);
      (_b = this.condition) === null || _b === void 0 ? void 0 : _b.search(callback);
      (_c = this.increment) === null || _c === void 0 ? void 0 : _c.search(callback);
      this.searchBlock(this.body, callback);
    }
  };
  var Var = class extends Statement {
    constructor(name, type, storage, access, value) {
      super();
      this.name = name;
      this.type = type;
      this.storage = storage;
      this.access = access;
      this.value = value;
    }
    get astNodeType() {
      return "var";
    }
    search(callback) {
      var _a2;
      callback(this);
      (_a2 = this.value) === null || _a2 === void 0 ? void 0 : _a2.search(callback);
    }
  };
  var Override = class extends Statement {
    constructor(name, type, value) {
      super();
      this.name = name;
      this.type = type;
      this.value = value;
    }
    get astNodeType() {
      return "override";
    }
    search(callback) {
      var _a2;
      (_a2 = this.value) === null || _a2 === void 0 ? void 0 : _a2.search(callback);
    }
  };
  var Let = class extends Statement {
    constructor(name, type, storage, access, value) {
      super();
      this.name = name;
      this.type = type;
      this.storage = storage;
      this.access = access;
      this.value = value;
    }
    get astNodeType() {
      return "let";
    }
    search(callback) {
      var _a2;
      (_a2 = this.value) === null || _a2 === void 0 ? void 0 : _a2.search(callback);
    }
  };
  var Const = class extends Statement {
    constructor(name, type, storage, access, value) {
      super();
      this.name = name;
      this.type = type;
      this.storage = storage;
      this.access = access;
      this.value = value;
    }
    get astNodeType() {
      return "const";
    }
    evaluate(context3) {
      return this.value.evaluate(context3);
    }
    search(callback) {
      var _a2;
      (_a2 = this.value) === null || _a2 === void 0 ? void 0 : _a2.search(callback);
    }
  };
  var IncrementOperator;
  (function(IncrementOperator2) {
    IncrementOperator2["increment"] = "++";
    IncrementOperator2["decrement"] = "--";
  })(IncrementOperator || (IncrementOperator = {}));
  (function(IncrementOperator2) {
    function parse(val) {
      const key = val;
      if (key == "parse")
        throw new Error("Invalid value for IncrementOperator");
      return IncrementOperator2[key];
    }
    IncrementOperator2.parse = parse;
  })(IncrementOperator || (IncrementOperator = {}));
  var Increment = class extends Statement {
    constructor(operator, variable) {
      super();
      this.operator = operator;
      this.variable = variable;
    }
    get astNodeType() {
      return "increment";
    }
    search(callback) {
      this.variable.search(callback);
    }
  };
  var AssignOperator;
  (function(AssignOperator2) {
    AssignOperator2["assign"] = "=";
    AssignOperator2["addAssign"] = "+=";
    AssignOperator2["subtractAssin"] = "-=";
    AssignOperator2["multiplyAssign"] = "*=";
    AssignOperator2["divideAssign"] = "/=";
    AssignOperator2["moduloAssign"] = "%=";
    AssignOperator2["andAssign"] = "&=";
    AssignOperator2["orAssign"] = "|=";
    AssignOperator2["xorAssign"] = "^=";
    AssignOperator2["shiftLeftAssign"] = "<<=";
    AssignOperator2["shiftRightAssign"] = ">>=";
  })(AssignOperator || (AssignOperator = {}));
  (function(AssignOperator2) {
    function parse(val) {
      const key = val;
      if (key == "parse") {
        throw new Error("Invalid value for AssignOperator");
      }
      return key;
    }
    AssignOperator2.parse = parse;
  })(AssignOperator || (AssignOperator = {}));
  var Assign = class extends Statement {
    constructor(operator, variable, value) {
      super();
      this.operator = operator;
      this.variable = variable;
      this.value = value;
    }
    get astNodeType() {
      return "assign";
    }
    search(callback) {
      this.value.search(callback);
    }
  };
  var Call = class extends Statement {
    constructor(name, args) {
      super();
      this.name = name;
      this.args = args;
    }
    get astNodeType() {
      return "call";
    }
  };
  var Loop = class extends Statement {
    constructor(body, continuing) {
      super();
      this.body = body;
      this.continuing = continuing;
    }
    get astNodeType() {
      return "loop";
    }
  };
  var Switch = class extends Statement {
    constructor(condition, body) {
      super();
      this.condition = condition;
      this.body = body;
    }
    get astNodeType() {
      return "body";
    }
  };
  var If = class extends Statement {
    constructor(condition, body, elseif, _else) {
      super();
      this.condition = condition;
      this.body = body;
      this.elseif = elseif;
      this.else = _else;
    }
    get astNodeType() {
      return "if";
    }
    search(callback) {
      this.condition.search(callback);
      this.searchBlock(this.body, callback);
      this.searchBlock(this.elseif, callback);
      this.searchBlock(this.else, callback);
    }
  };
  var Return = class extends Statement {
    constructor(value) {
      super();
      this.value = value;
    }
    get astNodeType() {
      return "return";
    }
    search(callback) {
      var _a2;
      (_a2 = this.value) === null || _a2 === void 0 ? void 0 : _a2.search(callback);
    }
  };
  var Enable = class extends Statement {
    constructor(name) {
      super();
      this.name = name;
    }
    get astNodeType() {
      return "enable";
    }
  };
  var Alias = class extends Statement {
    constructor(name, type) {
      super();
      this.name = name;
      this.type = type;
    }
    get astNodeType() {
      return "alias";
    }
  };
  var Discard = class extends Statement {
    constructor() {
      super();
    }
    get astNodeType() {
      return "discard";
    }
  };
  var Break = class extends Statement {
    constructor() {
      super();
    }
    get astNodeType() {
      return "break";
    }
  };
  var Continue = class extends Statement {
    constructor() {
      super();
    }
    get astNodeType() {
      return "continue";
    }
  };
  var Type = class extends Statement {
    constructor(name) {
      super();
      this.name = name;
    }
    get astNodeType() {
      return "type";
    }
    get isStruct() {
      return false;
    }
    get isArray() {
      return false;
    }
  };
  var Struct = class extends Type {
    constructor(name, members) {
      super(name);
      this.members = members;
    }
    get astNodeType() {
      return "struct";
    }
    get isStruct() {
      return true;
    }
    /// Return the index of the member with the given name, or -1 if not found.
    getMemberIndex(name) {
      for (let i = 0; i < this.members.length; i++) {
        if (this.members[i].name == name)
          return i;
      }
      return -1;
    }
  };
  var TemplateType = class extends Type {
    constructor(name, format, access) {
      super(name);
      this.format = format;
      this.access = access;
    }
    get astNodeType() {
      return "template";
    }
  };
  var PointerType = class extends Type {
    constructor(name, storage, type, access) {
      super(name);
      this.storage = storage;
      this.type = type;
      this.access = access;
    }
    get astNodeType() {
      return "pointer";
    }
  };
  var ArrayType = class extends Type {
    constructor(name, attributes, format, count) {
      super(name);
      this.attributes = attributes;
      this.format = format;
      this.count = count;
    }
    get astNodeType() {
      return "array";
    }
    get isArray() {
      return true;
    }
  };
  var SamplerType = class extends Type {
    constructor(name, format, access) {
      super(name);
      this.format = format;
      this.access = access;
    }
    get astNodeType() {
      return "sampler";
    }
  };
  var Expression = class extends Node {
    constructor() {
      super();
    }
  };
  var StringExpr = class extends Expression {
    constructor(value) {
      super();
      this.value = value;
    }
    get astNodeType() {
      return "stringExpr";
    }
    toString() {
      return this.value;
    }
    evaluateString() {
      return this.value;
    }
  };
  var CreateExpr = class extends Expression {
    constructor(type, args) {
      super();
      this.type = type;
      this.args = args;
    }
    get astNodeType() {
      return "createExpr";
    }
  };
  var CallExpr = class extends Expression {
    constructor(name, args) {
      super();
      this.name = name;
      this.args = args;
    }
    get astNodeType() {
      return "callExpr";
    }
    evaluate(context3) {
      switch (this.name) {
        case "abs":
          return Math.abs(this.args[0].evaluate(context3));
        case "acos":
          return Math.acos(this.args[0].evaluate(context3));
        case "acosh":
          return Math.acosh(this.args[0].evaluate(context3));
        case "asin":
          return Math.asin(this.args[0].evaluate(context3));
        case "asinh":
          return Math.asinh(this.args[0].evaluate(context3));
        case "atan":
          return Math.atan(this.args[0].evaluate(context3));
        case "atan2":
          return Math.atan2(this.args[0].evaluate(context3), this.args[1].evaluate(context3));
        case "atanh":
          return Math.atanh(this.args[0].evaluate(context3));
        case "ceil":
          return Math.ceil(this.args[0].evaluate(context3));
        case "clamp":
          return Math.min(Math.max(this.args[0].evaluate(context3), this.args[1].evaluate(context3)), this.args[2].evaluate(context3));
        case "cos":
          return Math.cos(this.args[0].evaluate(context3));
        //case "cross":
        //TODO: (x[i] * y[j] - x[j] * y[i])
        case "degrees":
          return this.args[0].evaluate(context3) * 180 / Math.PI;
        //case "determinant":
        //TODO implement
        case "distance":
          return Math.sqrt(Math.pow(this.args[0].evaluate(context3) - this.args[1].evaluate(context3), 2));
        case "dot":
        //TODO: (x[i] * y[i])
        case "exp":
          return Math.exp(this.args[0].evaluate(context3));
        case "exp2":
          return Math.pow(2, this.args[0].evaluate(context3));
        //case "extractBits":
        //TODO: implement
        //case "firstLeadingBit":
        //TODO: implement
        case "floor":
          return Math.floor(this.args[0].evaluate(context3));
        case "fma":
          return this.args[0].evaluate(context3) * this.args[1].evaluate(context3) + this.args[2].evaluate(context3);
        case "fract":
          return this.args[0].evaluate(context3) - Math.floor(this.args[0].evaluate(context3));
        //case "frexp":
        //TODO: implement
        case "inverseSqrt":
          return 1 / Math.sqrt(this.args[0].evaluate(context3));
        //case "length":
        //TODO: implement
        case "log":
          return Math.log(this.args[0].evaluate(context3));
        case "log2":
          return Math.log2(this.args[0].evaluate(context3));
        case "max":
          return Math.max(this.args[0].evaluate(context3), this.args[1].evaluate(context3));
        case "min":
          return Math.min(this.args[0].evaluate(context3), this.args[1].evaluate(context3));
        case "mix":
          return this.args[0].evaluate(context3) * (1 - this.args[2].evaluate(context3)) + this.args[1].evaluate(context3) * this.args[2].evaluate(context3);
        case "modf":
          return this.args[0].evaluate(context3) - Math.floor(this.args[0].evaluate(context3));
        case "pow":
          return Math.pow(this.args[0].evaluate(context3), this.args[1].evaluate(context3));
        case "radians":
          return this.args[0].evaluate(context3) * Math.PI / 180;
        case "round":
          return Math.round(this.args[0].evaluate(context3));
        case "sign":
          return Math.sign(this.args[0].evaluate(context3));
        case "sin":
          return Math.sin(this.args[0].evaluate(context3));
        case "sinh":
          return Math.sinh(this.args[0].evaluate(context3));
        case "saturate":
          return Math.min(Math.max(this.args[0].evaluate(context3), 0), 1);
        case "smoothstep":
          return this.args[0].evaluate(context3) * this.args[0].evaluate(context3) * (3 - 2 * this.args[0].evaluate(context3));
        case "sqrt":
          return Math.sqrt(this.args[0].evaluate(context3));
        case "step":
          return this.args[0].evaluate(context3) < this.args[1].evaluate(context3) ? 0 : 1;
        case "tan":
          return Math.tan(this.args[0].evaluate(context3));
        case "tanh":
          return Math.tanh(this.args[0].evaluate(context3));
        case "trunc":
          return Math.trunc(this.args[0].evaluate(context3));
        default:
          throw new Error("Non const function: " + this.name);
      }
    }
    search(callback) {
      for (const node of this.args) {
        node.search(callback);
      }
      callback(this);
    }
  };
  var VariableExpr = class extends Expression {
    constructor(name) {
      super();
      this.name = name;
    }
    get astNodeType() {
      return "varExpr";
    }
    search(callback) {
      callback(this);
    }
  };
  var ConstExpr = class extends Expression {
    constructor(name, initializer) {
      super();
      this.name = name;
      this.initializer = initializer;
    }
    get astNodeType() {
      return "constExpr";
    }
    evaluate(context3) {
      var _a2, _b;
      if (this.initializer instanceof CreateExpr) {
        const property = (_a2 = this.postfix) === null || _a2 === void 0 ? void 0 : _a2.evaluateString(context3);
        const type = (_b = this.initializer.type) === null || _b === void 0 ? void 0 : _b.name;
        const struct = context3.structs.get(type);
        const memberIndex = struct === null || struct === void 0 ? void 0 : struct.getMemberIndex(property);
        if (memberIndex != -1) {
          const value = this.initializer.args[memberIndex].evaluate(context3);
          return value;
        }
        console.log(memberIndex);
      }
      return this.initializer.evaluate(context3);
    }
    search(callback) {
      this.initializer.search(callback);
    }
  };
  var LiteralExpr = class extends Expression {
    constructor(value) {
      super();
      this.value = value;
    }
    get astNodeType() {
      return "literalExpr";
    }
    evaluate() {
      return this.value;
    }
  };
  var BitcastExpr = class extends Expression {
    constructor(type, value) {
      super();
      this.type = type;
      this.value = value;
    }
    get astNodeType() {
      return "bitcastExpr";
    }
    search(callback) {
      this.value.search(callback);
    }
  };
  var TypecastExpr = class extends Expression {
    constructor(type, args) {
      super();
      this.type = type;
      this.args = args;
    }
    get astNodeType() {
      return "typecastExpr";
    }
    evaluate(context3) {
      return this.args[0].evaluate(context3);
    }
    search(callback) {
      this.searchBlock(this.args, callback);
    }
  };
  var GroupingExpr = class extends Expression {
    constructor(contents) {
      super();
      this.contents = contents;
    }
    get astNodeType() {
      return "groupExpr";
    }
    evaluate(context3) {
      return this.contents[0].evaluate(context3);
    }
    search(callback) {
      this.searchBlock(this.contents, callback);
    }
  };
  var Operator = class extends Expression {
    constructor() {
      super();
    }
  };
  var UnaryOperator = class extends Operator {
    constructor(operator, right) {
      super();
      this.operator = operator;
      this.right = right;
    }
    get astNodeType() {
      return "unaryOp";
    }
    evaluate(context3) {
      switch (this.operator) {
        case "+":
          return this.right.evaluate(context3);
        case "-":
          return -this.right.evaluate(context3);
        case "!":
          return this.right.evaluate(context3) ? 0 : 1;
        case "~":
          return ~this.right.evaluate(context3);
        default:
          throw new Error("Unknown unary operator: " + this.operator);
      }
    }
    search(callback) {
      this.right.search(callback);
    }
  };
  var BinaryOperator = class extends Operator {
    constructor(operator, left, right) {
      super();
      this.operator = operator;
      this.left = left;
      this.right = right;
    }
    get astNodeType() {
      return "binaryOp";
    }
    evaluate(context3) {
      switch (this.operator) {
        case "+":
          return this.left.evaluate(context3) + this.right.evaluate(context3);
        case "-":
          return this.left.evaluate(context3) - this.right.evaluate(context3);
        case "*":
          return this.left.evaluate(context3) * this.right.evaluate(context3);
        case "/":
          return this.left.evaluate(context3) / this.right.evaluate(context3);
        case "%":
          return this.left.evaluate(context3) % this.right.evaluate(context3);
        case "==":
          return this.left.evaluate(context3) == this.right.evaluate(context3) ? 1 : 0;
        case "!=":
          return this.left.evaluate(context3) != this.right.evaluate(context3) ? 1 : 0;
        case "<":
          return this.left.evaluate(context3) < this.right.evaluate(context3) ? 1 : 0;
        case ">":
          return this.left.evaluate(context3) > this.right.evaluate(context3) ? 1 : 0;
        case "<=":
          return this.left.evaluate(context3) <= this.right.evaluate(context3) ? 1 : 0;
        case ">=":
          return this.left.evaluate(context3) >= this.right.evaluate(context3) ? 1 : 0;
        case "&&":
          return this.left.evaluate(context3) && this.right.evaluate(context3) ? 1 : 0;
        case "||":
          return this.left.evaluate(context3) || this.right.evaluate(context3) ? 1 : 0;
        default:
          throw new Error(`Unknown operator ${this.operator}`);
      }
    }
    search(callback) {
      this.left.search(callback);
      this.right.search(callback);
    }
  };
  var SwitchCase = class extends Node {
    constructor() {
      super();
    }
  };
  var Case = class extends SwitchCase {
    constructor(selector3, body) {
      super();
      this.selector = selector3;
      this.body = body;
    }
    get astNodeType() {
      return "case";
    }
    search(callback) {
      this.searchBlock(this.body, callback);
    }
  };
  var Default = class extends SwitchCase {
    constructor(body) {
      super();
      this.body = body;
    }
    get astNodeType() {
      return "default";
    }
    search(callback) {
      this.searchBlock(this.body, callback);
    }
  };
  var Argument = class extends Node {
    constructor(name, type, attributes) {
      super();
      this.name = name;
      this.type = type;
      this.attributes = attributes;
    }
    get astNodeType() {
      return "argument";
    }
  };
  var ElseIf = class extends Node {
    constructor(condition, body) {
      super();
      this.condition = condition;
      this.body = body;
    }
    get astNodeType() {
      return "elseif";
    }
    search(callback) {
      this.condition.search(callback);
      this.searchBlock(this.body, callback);
    }
  };
  var Member = class extends Node {
    constructor(name, type, attributes) {
      super();
      this.name = name;
      this.type = type;
      this.attributes = attributes;
    }
    get astNodeType() {
      return "member";
    }
  };
  var Attribute = class extends Node {
    constructor(name, value) {
      super();
      this.name = name;
      this.value = value;
    }
    get astNodeType() {
      return "attribute";
    }
  };
  var _a;
  var TokenClass;
  (function(TokenClass2) {
    TokenClass2[TokenClass2["token"] = 0] = "token";
    TokenClass2[TokenClass2["keyword"] = 1] = "keyword";
    TokenClass2[TokenClass2["reserved"] = 2] = "reserved";
  })(TokenClass || (TokenClass = {}));
  var TokenType = class {
    constructor(name, type, rule) {
      this.name = name;
      this.type = type;
      this.rule = rule;
    }
    toString() {
      return this.name;
    }
  };
  var TokenTypes = class {
  };
  _a = TokenTypes;
  TokenTypes.none = new TokenType("", TokenClass.reserved, "");
  TokenTypes.eof = new TokenType("EOF", TokenClass.token, "");
  TokenTypes.reserved = {
    asm: new TokenType("asm", TokenClass.reserved, "asm"),
    bf16: new TokenType("bf16", TokenClass.reserved, "bf16"),
    do: new TokenType("do", TokenClass.reserved, "do"),
    enum: new TokenType("enum", TokenClass.reserved, "enum"),
    f16: new TokenType("f16", TokenClass.reserved, "f16"),
    f64: new TokenType("f64", TokenClass.reserved, "f64"),
    handle: new TokenType("handle", TokenClass.reserved, "handle"),
    i8: new TokenType("i8", TokenClass.reserved, "i8"),
    i16: new TokenType("i16", TokenClass.reserved, "i16"),
    i64: new TokenType("i64", TokenClass.reserved, "i64"),
    mat: new TokenType("mat", TokenClass.reserved, "mat"),
    premerge: new TokenType("premerge", TokenClass.reserved, "premerge"),
    regardless: new TokenType("regardless", TokenClass.reserved, "regardless"),
    typedef: new TokenType("typedef", TokenClass.reserved, "typedef"),
    u8: new TokenType("u8", TokenClass.reserved, "u8"),
    u16: new TokenType("u16", TokenClass.reserved, "u16"),
    u64: new TokenType("u64", TokenClass.reserved, "u64"),
    unless: new TokenType("unless", TokenClass.reserved, "unless"),
    using: new TokenType("using", TokenClass.reserved, "using"),
    vec: new TokenType("vec", TokenClass.reserved, "vec"),
    void: new TokenType("void", TokenClass.reserved, "void")
  };
  TokenTypes.keywords = {
    array: new TokenType("array", TokenClass.keyword, "array"),
    atomic: new TokenType("atomic", TokenClass.keyword, "atomic"),
    bool: new TokenType("bool", TokenClass.keyword, "bool"),
    f32: new TokenType("f32", TokenClass.keyword, "f32"),
    i32: new TokenType("i32", TokenClass.keyword, "i32"),
    mat2x2: new TokenType("mat2x2", TokenClass.keyword, "mat2x2"),
    mat2x3: new TokenType("mat2x3", TokenClass.keyword, "mat2x3"),
    mat2x4: new TokenType("mat2x4", TokenClass.keyword, "mat2x4"),
    mat3x2: new TokenType("mat3x2", TokenClass.keyword, "mat3x2"),
    mat3x3: new TokenType("mat3x3", TokenClass.keyword, "mat3x3"),
    mat3x4: new TokenType("mat3x4", TokenClass.keyword, "mat3x4"),
    mat4x2: new TokenType("mat4x2", TokenClass.keyword, "mat4x2"),
    mat4x3: new TokenType("mat4x3", TokenClass.keyword, "mat4x3"),
    mat4x4: new TokenType("mat4x4", TokenClass.keyword, "mat4x4"),
    ptr: new TokenType("ptr", TokenClass.keyword, "ptr"),
    sampler: new TokenType("sampler", TokenClass.keyword, "sampler"),
    sampler_comparison: new TokenType("sampler_comparison", TokenClass.keyword, "sampler_comparison"),
    struct: new TokenType("struct", TokenClass.keyword, "struct"),
    texture_1d: new TokenType("texture_1d", TokenClass.keyword, "texture_1d"),
    texture_2d: new TokenType("texture_2d", TokenClass.keyword, "texture_2d"),
    texture_2d_array: new TokenType("texture_2d_array", TokenClass.keyword, "texture_2d_array"),
    texture_3d: new TokenType("texture_3d", TokenClass.keyword, "texture_3d"),
    texture_cube: new TokenType("texture_cube", TokenClass.keyword, "texture_cube"),
    texture_cube_array: new TokenType("texture_cube_array", TokenClass.keyword, "texture_cube_array"),
    texture_multisampled_2d: new TokenType("texture_multisampled_2d", TokenClass.keyword, "texture_multisampled_2d"),
    texture_storage_1d: new TokenType("texture_storage_1d", TokenClass.keyword, "texture_storage_1d"),
    texture_storage_2d: new TokenType("texture_storage_2d", TokenClass.keyword, "texture_storage_2d"),
    texture_storage_2d_array: new TokenType("texture_storage_2d_array", TokenClass.keyword, "texture_storage_2d_array"),
    texture_storage_3d: new TokenType("texture_storage_3d", TokenClass.keyword, "texture_storage_3d"),
    texture_depth_2d: new TokenType("texture_depth_2d", TokenClass.keyword, "texture_depth_2d"),
    texture_depth_2d_array: new TokenType("texture_depth_2d_array", TokenClass.keyword, "texture_depth_2d_array"),
    texture_depth_cube: new TokenType("texture_depth_cube", TokenClass.keyword, "texture_depth_cube"),
    texture_depth_cube_array: new TokenType("texture_depth_cube_array", TokenClass.keyword, "texture_depth_cube_array"),
    texture_depth_multisampled_2d: new TokenType("texture_depth_multisampled_2d", TokenClass.keyword, "texture_depth_multisampled_2d"),
    texture_external: new TokenType("texture_external", TokenClass.keyword, "texture_external"),
    u32: new TokenType("u32", TokenClass.keyword, "u32"),
    vec2: new TokenType("vec2", TokenClass.keyword, "vec2"),
    vec3: new TokenType("vec3", TokenClass.keyword, "vec3"),
    vec4: new TokenType("vec4", TokenClass.keyword, "vec4"),
    bitcast: new TokenType("bitcast", TokenClass.keyword, "bitcast"),
    block: new TokenType("block", TokenClass.keyword, "block"),
    break: new TokenType("break", TokenClass.keyword, "break"),
    case: new TokenType("case", TokenClass.keyword, "case"),
    continue: new TokenType("continue", TokenClass.keyword, "continue"),
    continuing: new TokenType("continuing", TokenClass.keyword, "continuing"),
    default: new TokenType("default", TokenClass.keyword, "default"),
    discard: new TokenType("discard", TokenClass.keyword, "discard"),
    else: new TokenType("else", TokenClass.keyword, "else"),
    enable: new TokenType("enable", TokenClass.keyword, "enable"),
    fallthrough: new TokenType("fallthrough", TokenClass.keyword, "fallthrough"),
    false: new TokenType("false", TokenClass.keyword, "false"),
    fn: new TokenType("fn", TokenClass.keyword, "fn"),
    for: new TokenType("for", TokenClass.keyword, "for"),
    function: new TokenType("function", TokenClass.keyword, "function"),
    if: new TokenType("if", TokenClass.keyword, "if"),
    let: new TokenType("let", TokenClass.keyword, "let"),
    const: new TokenType("const", TokenClass.keyword, "const"),
    loop: new TokenType("loop", TokenClass.keyword, "loop"),
    while: new TokenType("while", TokenClass.keyword, "while"),
    private: new TokenType("private", TokenClass.keyword, "private"),
    read: new TokenType("read", TokenClass.keyword, "read"),
    read_write: new TokenType("read_write", TokenClass.keyword, "read_write"),
    return: new TokenType("return", TokenClass.keyword, "return"),
    storage: new TokenType("storage", TokenClass.keyword, "storage"),
    switch: new TokenType("switch", TokenClass.keyword, "switch"),
    true: new TokenType("true", TokenClass.keyword, "true"),
    alias: new TokenType("alias", TokenClass.keyword, "alias"),
    type: new TokenType("type", TokenClass.keyword, "type"),
    uniform: new TokenType("uniform", TokenClass.keyword, "uniform"),
    var: new TokenType("var", TokenClass.keyword, "var"),
    override: new TokenType("override", TokenClass.keyword, "override"),
    workgroup: new TokenType("workgroup", TokenClass.keyword, "workgroup"),
    write: new TokenType("write", TokenClass.keyword, "write"),
    r8unorm: new TokenType("r8unorm", TokenClass.keyword, "r8unorm"),
    r8snorm: new TokenType("r8snorm", TokenClass.keyword, "r8snorm"),
    r8uint: new TokenType("r8uint", TokenClass.keyword, "r8uint"),
    r8sint: new TokenType("r8sint", TokenClass.keyword, "r8sint"),
    r16uint: new TokenType("r16uint", TokenClass.keyword, "r16uint"),
    r16sint: new TokenType("r16sint", TokenClass.keyword, "r16sint"),
    r16float: new TokenType("r16float", TokenClass.keyword, "r16float"),
    rg8unorm: new TokenType("rg8unorm", TokenClass.keyword, "rg8unorm"),
    rg8snorm: new TokenType("rg8snorm", TokenClass.keyword, "rg8snorm"),
    rg8uint: new TokenType("rg8uint", TokenClass.keyword, "rg8uint"),
    rg8sint: new TokenType("rg8sint", TokenClass.keyword, "rg8sint"),
    r32uint: new TokenType("r32uint", TokenClass.keyword, "r32uint"),
    r32sint: new TokenType("r32sint", TokenClass.keyword, "r32sint"),
    r32float: new TokenType("r32float", TokenClass.keyword, "r32float"),
    rg16uint: new TokenType("rg16uint", TokenClass.keyword, "rg16uint"),
    rg16sint: new TokenType("rg16sint", TokenClass.keyword, "rg16sint"),
    rg16float: new TokenType("rg16float", TokenClass.keyword, "rg16float"),
    rgba8unorm: new TokenType("rgba8unorm", TokenClass.keyword, "rgba8unorm"),
    rgba8unorm_srgb: new TokenType("rgba8unorm_srgb", TokenClass.keyword, "rgba8unorm_srgb"),
    rgba8snorm: new TokenType("rgba8snorm", TokenClass.keyword, "rgba8snorm"),
    rgba8uint: new TokenType("rgba8uint", TokenClass.keyword, "rgba8uint"),
    rgba8sint: new TokenType("rgba8sint", TokenClass.keyword, "rgba8sint"),
    bgra8unorm: new TokenType("bgra8unorm", TokenClass.keyword, "bgra8unorm"),
    bgra8unorm_srgb: new TokenType("bgra8unorm_srgb", TokenClass.keyword, "bgra8unorm_srgb"),
    rgb10a2unorm: new TokenType("rgb10a2unorm", TokenClass.keyword, "rgb10a2unorm"),
    rg11b10float: new TokenType("rg11b10float", TokenClass.keyword, "rg11b10float"),
    rg32uint: new TokenType("rg32uint", TokenClass.keyword, "rg32uint"),
    rg32sint: new TokenType("rg32sint", TokenClass.keyword, "rg32sint"),
    rg32float: new TokenType("rg32float", TokenClass.keyword, "rg32float"),
    rgba16uint: new TokenType("rgba16uint", TokenClass.keyword, "rgba16uint"),
    rgba16sint: new TokenType("rgba16sint", TokenClass.keyword, "rgba16sint"),
    rgba16float: new TokenType("rgba16float", TokenClass.keyword, "rgba16float"),
    rgba32uint: new TokenType("rgba32uint", TokenClass.keyword, "rgba32uint"),
    rgba32sint: new TokenType("rgba32sint", TokenClass.keyword, "rgba32sint"),
    rgba32float: new TokenType("rgba32float", TokenClass.keyword, "rgba32float"),
    static_assert: new TokenType("static_assert", TokenClass.keyword, "static_assert")
    // WGSL grammar has a few keywords that have different token names than the strings they
    // represent. Aliasing them here.
    /*int32: new TokenType("i32", TokenClass.keyword, "i32"),
        uint32: new TokenType("u32", TokenClass.keyword, "u32"),
        float32: new TokenType("f32", TokenClass.keyword, "f32"),
        pointer: new TokenType("ptr", TokenClass.keyword, "ptr"),*/
  };
  TokenTypes.tokens = {
    decimal_float_literal: new TokenType("decimal_float_literal", TokenClass.token, /((-?[0-9]*\.[0-9]+|-?[0-9]+\.[0-9]*)((e|E)(\+|-)?[0-9]+)?f?)|(-?[0-9]+(e|E)(\+|-)?[0-9]+f?)|([0-9]+f)/),
    hex_float_literal: new TokenType("hex_float_literal", TokenClass.token, /-?0x((([0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+\.[0-9a-fA-F]*)((p|P)(\+|-)?[0-9]+f?)?)|([0-9a-fA-F]+(p|P)(\+|-)?[0-9]+f?))/),
    int_literal: new TokenType("int_literal", TokenClass.token, /-?0x[0-9a-fA-F]+|0i?|-?[1-9][0-9]*i?/),
    uint_literal: new TokenType("uint_literal", TokenClass.token, /0x[0-9a-fA-F]+u|0u|[1-9][0-9]*u/),
    ident: new TokenType("ident", TokenClass.token, /[a-zA-Z][0-9a-zA-Z_]*/),
    and: new TokenType("and", TokenClass.token, "&"),
    and_and: new TokenType("and_and", TokenClass.token, "&&"),
    arrow: new TokenType("arrow ", TokenClass.token, "->"),
    attr: new TokenType("attr", TokenClass.token, "@"),
    attr_left: new TokenType("attr_left", TokenClass.token, "[["),
    attr_right: new TokenType("attr_right", TokenClass.token, "]]"),
    forward_slash: new TokenType("forward_slash", TokenClass.token, "/"),
    bang: new TokenType("bang", TokenClass.token, "!"),
    bracket_left: new TokenType("bracket_left", TokenClass.token, "["),
    bracket_right: new TokenType("bracket_right", TokenClass.token, "]"),
    brace_left: new TokenType("brace_left", TokenClass.token, "{"),
    brace_right: new TokenType("brace_right", TokenClass.token, "}"),
    colon: new TokenType("colon", TokenClass.token, ":"),
    comma: new TokenType("comma", TokenClass.token, ","),
    equal: new TokenType("equal", TokenClass.token, "="),
    equal_equal: new TokenType("equal_equal", TokenClass.token, "=="),
    not_equal: new TokenType("not_equal", TokenClass.token, "!="),
    greater_than: new TokenType("greater_than", TokenClass.token, ">"),
    greater_than_equal: new TokenType("greater_than_equal", TokenClass.token, ">="),
    shift_right: new TokenType("shift_right", TokenClass.token, ">>"),
    less_than: new TokenType("less_than", TokenClass.token, "<"),
    less_than_equal: new TokenType("less_than_equal", TokenClass.token, "<="),
    shift_left: new TokenType("shift_left", TokenClass.token, "<<"),
    modulo: new TokenType("modulo", TokenClass.token, "%"),
    minus: new TokenType("minus", TokenClass.token, "-"),
    minus_minus: new TokenType("minus_minus", TokenClass.token, "--"),
    period: new TokenType("period", TokenClass.token, "."),
    plus: new TokenType("plus", TokenClass.token, "+"),
    plus_plus: new TokenType("plus_plus", TokenClass.token, "++"),
    or: new TokenType("or", TokenClass.token, "|"),
    or_or: new TokenType("or_or", TokenClass.token, "||"),
    paren_left: new TokenType("paren_left", TokenClass.token, "("),
    paren_right: new TokenType("paren_right", TokenClass.token, ")"),
    semicolon: new TokenType("semicolon", TokenClass.token, ";"),
    star: new TokenType("star", TokenClass.token, "*"),
    tilde: new TokenType("tilde", TokenClass.token, "~"),
    underscore: new TokenType("underscore", TokenClass.token, "_"),
    xor: new TokenType("xor", TokenClass.token, "^"),
    plus_equal: new TokenType("plus_equal", TokenClass.token, "+="),
    minus_equal: new TokenType("minus_equal", TokenClass.token, "-="),
    times_equal: new TokenType("times_equal", TokenClass.token, "*="),
    division_equal: new TokenType("division_equal", TokenClass.token, "/="),
    modulo_equal: new TokenType("modulo_equal", TokenClass.token, "%="),
    and_equal: new TokenType("and_equal", TokenClass.token, "&="),
    or_equal: new TokenType("or_equal", TokenClass.token, "|="),
    xor_equal: new TokenType("xor_equal", TokenClass.token, "^="),
    shift_right_equal: new TokenType("shift_right_equal", TokenClass.token, ">>="),
    shift_left_equal: new TokenType("shift_left_equal", TokenClass.token, "<<=")
  };
  TokenTypes.storage_class = [
    _a.keywords.function,
    _a.keywords.private,
    _a.keywords.workgroup,
    _a.keywords.uniform,
    _a.keywords.storage
  ];
  TokenTypes.access_mode = [
    _a.keywords.read,
    _a.keywords.write,
    _a.keywords.read_write
  ];
  TokenTypes.sampler_type = [
    _a.keywords.sampler,
    _a.keywords.sampler_comparison
  ];
  TokenTypes.sampled_texture_type = [
    _a.keywords.texture_1d,
    _a.keywords.texture_2d,
    _a.keywords.texture_2d_array,
    _a.keywords.texture_3d,
    _a.keywords.texture_cube,
    _a.keywords.texture_cube_array
  ];
  TokenTypes.multisampled_texture_type = [
    _a.keywords.texture_multisampled_2d
  ];
  TokenTypes.storage_texture_type = [
    _a.keywords.texture_storage_1d,
    _a.keywords.texture_storage_2d,
    _a.keywords.texture_storage_2d_array,
    _a.keywords.texture_storage_3d
  ];
  TokenTypes.depth_texture_type = [
    _a.keywords.texture_depth_2d,
    _a.keywords.texture_depth_2d_array,
    _a.keywords.texture_depth_cube,
    _a.keywords.texture_depth_cube_array,
    _a.keywords.texture_depth_multisampled_2d
  ];
  TokenTypes.texture_external_type = [_a.keywords.texture_external];
  TokenTypes.any_texture_type = [
    ..._a.sampled_texture_type,
    ..._a.multisampled_texture_type,
    ..._a.storage_texture_type,
    ..._a.depth_texture_type,
    ..._a.texture_external_type
  ];
  TokenTypes.texel_format = [
    _a.keywords.r8unorm,
    _a.keywords.r8snorm,
    _a.keywords.r8uint,
    _a.keywords.r8sint,
    _a.keywords.r16uint,
    _a.keywords.r16sint,
    _a.keywords.r16float,
    _a.keywords.rg8unorm,
    _a.keywords.rg8snorm,
    _a.keywords.rg8uint,
    _a.keywords.rg8sint,
    _a.keywords.r32uint,
    _a.keywords.r32sint,
    _a.keywords.r32float,
    _a.keywords.rg16uint,
    _a.keywords.rg16sint,
    _a.keywords.rg16float,
    _a.keywords.rgba8unorm,
    _a.keywords.rgba8unorm_srgb,
    _a.keywords.rgba8snorm,
    _a.keywords.rgba8uint,
    _a.keywords.rgba8sint,
    _a.keywords.bgra8unorm,
    _a.keywords.bgra8unorm_srgb,
    _a.keywords.rgb10a2unorm,
    _a.keywords.rg11b10float,
    _a.keywords.rg32uint,
    _a.keywords.rg32sint,
    _a.keywords.rg32float,
    _a.keywords.rgba16uint,
    _a.keywords.rgba16sint,
    _a.keywords.rgba16float,
    _a.keywords.rgba32uint,
    _a.keywords.rgba32sint,
    _a.keywords.rgba32float
  ];
  TokenTypes.const_literal = [
    _a.tokens.int_literal,
    _a.tokens.uint_literal,
    _a.tokens.decimal_float_literal,
    _a.tokens.hex_float_literal,
    _a.keywords.true,
    _a.keywords.false
  ];
  TokenTypes.literal_or_ident = [
    _a.tokens.ident,
    _a.tokens.int_literal,
    _a.tokens.uint_literal,
    _a.tokens.decimal_float_literal,
    _a.tokens.hex_float_literal
  ];
  TokenTypes.element_count_expression = [
    _a.tokens.int_literal,
    _a.tokens.uint_literal,
    _a.tokens.ident
  ];
  TokenTypes.template_types = [
    _a.keywords.vec2,
    _a.keywords.vec3,
    _a.keywords.vec4,
    _a.keywords.mat2x2,
    _a.keywords.mat2x3,
    _a.keywords.mat2x4,
    _a.keywords.mat3x2,
    _a.keywords.mat3x3,
    _a.keywords.mat3x4,
    _a.keywords.mat4x2,
    _a.keywords.mat4x3,
    _a.keywords.mat4x4,
    _a.keywords.atomic,
    _a.keywords.bitcast,
    ..._a.any_texture_type
  ];
  TokenTypes.attribute_name = [_a.tokens.ident, _a.keywords.block];
  TokenTypes.assignment_operators = [
    _a.tokens.equal,
    _a.tokens.plus_equal,
    _a.tokens.minus_equal,
    _a.tokens.times_equal,
    _a.tokens.division_equal,
    _a.tokens.modulo_equal,
    _a.tokens.and_equal,
    _a.tokens.or_equal,
    _a.tokens.xor_equal,
    _a.tokens.shift_right_equal,
    _a.tokens.shift_left_equal
  ];
  TokenTypes.increment_operators = [
    _a.tokens.plus_plus,
    _a.tokens.minus_minus
  ];
  var Token = class {
    constructor(type, lexeme, line) {
      this.type = type;
      this.lexeme = lexeme;
      this.line = line;
    }
    toString() {
      return this.lexeme;
    }
    isTemplateType() {
      return TokenTypes.template_types.indexOf(this.type) != -1;
    }
    isArrayType() {
      return this.type == TokenTypes.keywords.array;
    }
    isArrayOrTemplateType() {
      return this.isArrayType() || this.isTemplateType();
    }
  };
  var WgslScanner = class {
    constructor(source) {
      this._tokens = [];
      this._start = 0;
      this._current = 0;
      this._line = 1;
      this._source = source !== null && source !== void 0 ? source : "";
    }
    /// Scan all tokens from the source.
    scanTokens() {
      while (!this._isAtEnd()) {
        this._start = this._current;
        if (!this.scanToken())
          throw `Invalid syntax at line ${this._line}`;
      }
      this._tokens.push(new Token(TokenTypes.eof, "", this._line));
      return this._tokens;
    }
    /// Scan a single token from the source.
    scanToken() {
      let lexeme = this._advance();
      if (lexeme == "\n") {
        this._line++;
        return true;
      }
      if (this._isWhitespace(lexeme)) {
        return true;
      }
      if (lexeme == "/") {
        if (this._peekAhead() == "/") {
          while (lexeme != "\n") {
            if (this._isAtEnd())
              return true;
            lexeme = this._advance();
          }
          this._line++;
          return true;
        } else if (this._peekAhead() == "*") {
          this._advance();
          let commentLevel = 1;
          while (commentLevel > 0) {
            if (this._isAtEnd())
              return true;
            lexeme = this._advance();
            if (lexeme == "\n") {
              this._line++;
            } else if (lexeme == "*") {
              if (this._peekAhead() == "/") {
                this._advance();
                commentLevel--;
                if (commentLevel == 0) {
                  return true;
                }
              }
            } else if (lexeme == "/") {
              if (this._peekAhead() == "*") {
                this._advance();
                commentLevel++;
              }
            }
          }
          return true;
        }
      }
      let matchType = TokenTypes.none;
      for (; ; ) {
        let matchedType = this._findType(lexeme);
        const nextLexeme = this._peekAhead();
        if (lexeme == ">" && (nextLexeme == ">" || nextLexeme == "=")) {
          let foundLessThan = false;
          let ti = this._tokens.length - 1;
          for (let count = 0; count < 5 && ti >= 0; ++count, --ti) {
            if (this._tokens[ti].type === TokenTypes.tokens.less_than) {
              if (ti > 0 && this._tokens[ti - 1].isArrayOrTemplateType()) {
                foundLessThan = true;
              }
              break;
            }
          }
          if (foundLessThan) {
            this._addToken(matchedType);
            return true;
          }
        }
        if (matchedType === TokenTypes.none) {
          let lookAheadLexeme = lexeme;
          let lookAhead = 0;
          const maxLookAhead = 2;
          for (let li = 0; li < maxLookAhead; ++li) {
            lookAheadLexeme += this._peekAhead(li);
            matchedType = this._findType(lookAheadLexeme);
            if (matchedType !== TokenTypes.none) {
              lookAhead = li;
              break;
            }
          }
          if (matchedType === TokenTypes.none) {
            if (matchType === TokenTypes.none)
              return false;
            this._current--;
            this._addToken(matchType);
            return true;
          }
          lexeme = lookAheadLexeme;
          this._current += lookAhead + 1;
        }
        matchType = matchedType;
        if (this._isAtEnd())
          break;
        lexeme += this._advance();
      }
      if (matchType === TokenTypes.none)
        return false;
      this._addToken(matchType);
      return true;
    }
    _findType(lexeme) {
      for (const name in TokenTypes.keywords) {
        const type = TokenTypes.keywords[name];
        if (this._match(lexeme, type.rule)) {
          return type;
        }
      }
      for (const name in TokenTypes.tokens) {
        const type = TokenTypes.tokens[name];
        if (this._match(lexeme, type.rule)) {
          return type;
        }
      }
      return TokenTypes.none;
    }
    _match(lexeme, rule) {
      if (typeof rule === "string") {
        if (rule == lexeme) {
          return true;
        }
      } else {
        const match = rule.exec(lexeme);
        if (match && match.index == 0 && match[0] == lexeme)
          return true;
      }
      return false;
    }
    _isAtEnd() {
      return this._current >= this._source.length;
    }
    _isWhitespace(c) {
      return c == " " || c == "	" || c == "\r";
    }
    _advance(amount = 0) {
      let c = this._source[this._current];
      amount = amount || 0;
      amount++;
      this._current += amount;
      return c;
    }
    _peekAhead(offset = 0) {
      offset = offset || 0;
      if (this._current + offset >= this._source.length)
        return "\0";
      return this._source[this._current + offset];
    }
    _addToken(type) {
      const text = this._source.substring(this._start, this._current);
      this._tokens.push(new Token(type, text, this._line));
    }
  };
  var WgslParser = class {
    constructor() {
      this._tokens = [];
      this._current = 0;
      this._context = new ParseContext();
    }
    parse(tokensOrCode) {
      this._initialize(tokensOrCode);
      let statements = [];
      while (!this._isAtEnd()) {
        const statement = this._global_decl_or_directive();
        if (!statement)
          break;
        statements.push(statement);
      }
      return statements;
    }
    _initialize(tokensOrCode) {
      if (tokensOrCode) {
        if (typeof tokensOrCode == "string") {
          const scanner = new WgslScanner(tokensOrCode);
          this._tokens = scanner.scanTokens();
        } else {
          this._tokens = tokensOrCode;
        }
      } else {
        this._tokens = [];
      }
      this._current = 0;
    }
    _error(token, message) {
      console.error(token, message);
      return {
        token,
        message,
        toString: function() {
          return `${message}`;
        }
      };
    }
    _isAtEnd() {
      return this._current >= this._tokens.length || this._peek().type == TokenTypes.eof;
    }
    _match(types) {
      if (types instanceof TokenType) {
        if (this._check(types)) {
          this._advance();
          return true;
        }
        return false;
      }
      for (let i = 0, l = types.length; i < l; ++i) {
        const type = types[i];
        if (this._check(type)) {
          this._advance();
          return true;
        }
      }
      return false;
    }
    _consume(types, message) {
      if (this._check(types))
        return this._advance();
      throw this._error(this._peek(), message);
    }
    _check(types) {
      if (this._isAtEnd())
        return false;
      const tk = this._peek();
      if (types instanceof Array) {
        let t = tk.type;
        let index = types.indexOf(t);
        return index != -1;
      }
      return tk.type == types;
    }
    _advance() {
      if (!this._isAtEnd())
        this._current++;
      return this._previous();
    }
    _peek() {
      return this._tokens[this._current];
    }
    _previous() {
      return this._tokens[this._current - 1];
    }
    _global_decl_or_directive() {
      while (this._match(TokenTypes.tokens.semicolon) && !this._isAtEnd())
        ;
      if (this._match(TokenTypes.keywords.alias)) {
        const type = this._type_alias();
        this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
        return type;
      }
      if (this._match(TokenTypes.keywords.enable)) {
        const enable = this._enable_directive();
        this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
        return enable;
      }
      const attrs = this._attribute();
      if (this._check(TokenTypes.keywords.var)) {
        const _var = this._global_variable_decl();
        if (_var != null)
          _var.attributes = attrs;
        this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
        return _var;
      }
      if (this._check(TokenTypes.keywords.override)) {
        const _override = this._override_variable_decl();
        if (_override != null)
          _override.attributes = attrs;
        this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
        return _override;
      }
      if (this._check(TokenTypes.keywords.let)) {
        const _let = this._global_let_decl();
        if (_let != null)
          _let.attributes = attrs;
        this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
        return _let;
      }
      if (this._check(TokenTypes.keywords.const)) {
        const _const = this._global_const_decl();
        if (_const != null)
          _const.attributes = attrs;
        this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
        return _const;
      }
      if (this._check(TokenTypes.keywords.struct)) {
        const _struct = this._struct_decl();
        if (_struct != null)
          _struct.attributes = attrs;
        return _struct;
      }
      if (this._check(TokenTypes.keywords.fn)) {
        const _fn = this._function_decl();
        if (_fn != null)
          _fn.attributes = attrs;
        return _fn;
      }
      return null;
    }
    _function_decl() {
      if (!this._match(TokenTypes.keywords.fn))
        return null;
      const name = this._consume(TokenTypes.tokens.ident, "Expected function name.").toString();
      this._consume(TokenTypes.tokens.paren_left, "Expected '(' for function arguments.");
      const args = [];
      if (!this._check(TokenTypes.tokens.paren_right)) {
        do {
          if (this._check(TokenTypes.tokens.paren_right))
            break;
          const argAttrs = this._attribute();
          const name2 = this._consume(TokenTypes.tokens.ident, "Expected argument name.").toString();
          this._consume(TokenTypes.tokens.colon, "Expected ':' for argument type.");
          const typeAttrs = this._attribute();
          const type = this._type_decl();
          if (type != null) {
            type.attributes = typeAttrs;
            args.push(new Argument(name2, type, argAttrs));
          }
        } while (this._match(TokenTypes.tokens.comma));
      }
      this._consume(TokenTypes.tokens.paren_right, "Expected ')' after function arguments.");
      let _return = null;
      if (this._match(TokenTypes.tokens.arrow)) {
        const attrs = this._attribute();
        _return = this._type_decl();
        if (_return != null)
          _return.attributes = attrs;
      }
      const body = this._compound_statement();
      return new Function(name, args, _return, body);
    }
    _compound_statement() {
      const statements = [];
      this._consume(TokenTypes.tokens.brace_left, "Expected '{' for block.");
      while (!this._check(TokenTypes.tokens.brace_right)) {
        const statement = this._statement();
        if (statement !== null)
          statements.push(statement);
      }
      this._consume(TokenTypes.tokens.brace_right, "Expected '}' for block.");
      return statements;
    }
    _statement() {
      while (this._match(TokenTypes.tokens.semicolon) && !this._isAtEnd())
        ;
      if (this._check(TokenTypes.keywords.if))
        return this._if_statement();
      if (this._check(TokenTypes.keywords.switch))
        return this._switch_statement();
      if (this._check(TokenTypes.keywords.loop))
        return this._loop_statement();
      if (this._check(TokenTypes.keywords.for))
        return this._for_statement();
      if (this._check(TokenTypes.keywords.while))
        return this._while_statement();
      if (this._check(TokenTypes.keywords.continuing))
        return this._continuing_statement();
      if (this._check(TokenTypes.keywords.static_assert))
        return this._static_assert_statement();
      if (this._check(TokenTypes.tokens.brace_left))
        return this._compound_statement();
      let result = null;
      if (this._check(TokenTypes.keywords.return))
        result = this._return_statement();
      else if (this._check([
        TokenTypes.keywords.var,
        TokenTypes.keywords.let,
        TokenTypes.keywords.const
      ]))
        result = this._variable_statement();
      else if (this._match(TokenTypes.keywords.discard))
        result = new Discard();
      else if (this._match(TokenTypes.keywords.break))
        result = new Break();
      else if (this._match(TokenTypes.keywords.continue))
        result = new Continue();
      else
        result = this._increment_decrement_statement() || this._func_call_statement() || this._assignment_statement();
      if (result != null)
        this._consume(TokenTypes.tokens.semicolon, "Expected ';' after statement.");
      return result;
    }
    _static_assert_statement() {
      if (!this._match(TokenTypes.keywords.static_assert))
        return null;
      let expression = this._optional_paren_expression();
      return new StaticAssert(expression);
    }
    _while_statement() {
      if (!this._match(TokenTypes.keywords.while))
        return null;
      let condition = this._optional_paren_expression();
      const block = this._compound_statement();
      return new While(condition, block);
    }
    _continuing_statement() {
      if (!this._match(TokenTypes.keywords.continuing))
        return null;
      const block = this._compound_statement();
      return new Continuing(block);
    }
    _for_statement() {
      if (!this._match(TokenTypes.keywords.for))
        return null;
      this._consume(TokenTypes.tokens.paren_left, "Expected '('.");
      const init6 = !this._check(TokenTypes.tokens.semicolon) ? this._for_init() : null;
      this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
      const condition = !this._check(TokenTypes.tokens.semicolon) ? this._short_circuit_or_expression() : null;
      this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
      const increment = !this._check(TokenTypes.tokens.paren_right) ? this._for_increment() : null;
      this._consume(TokenTypes.tokens.paren_right, "Expected ')'.");
      const body = this._compound_statement();
      return new For(init6, condition, increment, body);
    }
    _for_init() {
      return this._variable_statement() || this._func_call_statement() || this._assignment_statement();
    }
    _for_increment() {
      return this._func_call_statement() || this._increment_decrement_statement() || this._assignment_statement();
    }
    _variable_statement() {
      if (this._check(TokenTypes.keywords.var)) {
        const _var = this._variable_decl();
        if (_var === null)
          throw this._error(this._peek(), "Variable declaration expected.");
        let value = null;
        if (this._match(TokenTypes.tokens.equal))
          value = this._short_circuit_or_expression();
        return new Var(_var.name, _var.type, _var.storage, _var.access, value);
      }
      if (this._match(TokenTypes.keywords.let)) {
        const name = this._consume(TokenTypes.tokens.ident, "Expected name for let.").toString();
        let type = null;
        if (this._match(TokenTypes.tokens.colon)) {
          const typeAttrs = this._attribute();
          type = this._type_decl();
          if (type != null)
            type.attributes = typeAttrs;
        }
        this._consume(TokenTypes.tokens.equal, "Expected '=' for let.");
        const value = this._short_circuit_or_expression();
        return new Let(name, type, null, null, value);
      }
      if (this._match(TokenTypes.keywords.const)) {
        const name = this._consume(TokenTypes.tokens.ident, "Expected name for const.").toString();
        let type = null;
        if (this._match(TokenTypes.tokens.colon)) {
          const typeAttrs = this._attribute();
          type = this._type_decl();
          if (type != null)
            type.attributes = typeAttrs;
        }
        this._consume(TokenTypes.tokens.equal, "Expected '=' for const.");
        const value = this._short_circuit_or_expression();
        return new Const(name, type, null, null, value);
      }
      return null;
    }
    _increment_decrement_statement() {
      const savedPos = this._current;
      const _var = this._unary_expression();
      if (_var == null)
        return null;
      if (!this._check(TokenTypes.increment_operators)) {
        this._current = savedPos;
        return null;
      }
      const token = this._consume(TokenTypes.increment_operators, "Expected increment operator");
      return new Increment(token.type === TokenTypes.tokens.plus_plus ? IncrementOperator.increment : IncrementOperator.decrement, _var);
    }
    _assignment_statement() {
      let _var = null;
      if (this._check(TokenTypes.tokens.brace_right)) {
        return null;
      }
      let isUnderscore = this._match(TokenTypes.tokens.underscore);
      if (!isUnderscore) {
        _var = this._unary_expression();
      }
      if (!isUnderscore && _var == null) {
        return null;
      }
      const type = this._consume(TokenTypes.assignment_operators, "Expected assignment operator.");
      const value = this._short_circuit_or_expression();
      return new Assign(AssignOperator.parse(type.lexeme), _var, value);
    }
    _func_call_statement() {
      if (!this._check(TokenTypes.tokens.ident))
        return null;
      const savedPos = this._current;
      const name = this._consume(TokenTypes.tokens.ident, "Expected function name.");
      const args = this._argument_expression_list();
      if (args === null) {
        this._current = savedPos;
        return null;
      }
      return new Call(name.lexeme, args);
    }
    _loop_statement() {
      if (!this._match(TokenTypes.keywords.loop))
        return null;
      this._consume(TokenTypes.tokens.brace_left, "Expected '{' for loop.");
      const statements = [];
      let statement = this._statement();
      while (statement !== null) {
        if (Array.isArray(statement)) {
          for (let s of statement) {
            statements.push(s);
          }
        } else {
          statements.push(statement);
        }
        statement = this._statement();
      }
      let continuing = null;
      if (this._match(TokenTypes.keywords.continuing))
        continuing = this._compound_statement();
      this._consume(TokenTypes.tokens.brace_right, "Expected '}' for loop.");
      return new Loop(statements, continuing);
    }
    _switch_statement() {
      if (!this._match(TokenTypes.keywords.switch))
        return null;
      const condition = this._optional_paren_expression();
      this._consume(TokenTypes.tokens.brace_left, "Expected '{' for switch.");
      const body = this._switch_body();
      if (body == null || body.length == 0)
        throw this._error(this._previous(), "Expected 'case' or 'default'.");
      this._consume(TokenTypes.tokens.brace_right, "Expected '}' for switch.");
      return new Switch(condition, body);
    }
    _switch_body() {
      const cases = [];
      if (this._match(TokenTypes.keywords.case)) {
        const selector3 = this._case_selectors();
        this._match(TokenTypes.tokens.colon);
        this._consume(TokenTypes.tokens.brace_left, "Exected '{' for switch case.");
        const body = this._case_body();
        this._consume(TokenTypes.tokens.brace_right, "Exected '}' for switch case.");
        cases.push(new Case(selector3, body));
      }
      if (this._match(TokenTypes.keywords.default)) {
        this._match(TokenTypes.tokens.colon);
        this._consume(TokenTypes.tokens.brace_left, "Exected '{' for switch default.");
        const body = this._case_body();
        this._consume(TokenTypes.tokens.brace_right, "Exected '}' for switch default.");
        cases.push(new Default(body));
      }
      if (this._check([TokenTypes.keywords.default, TokenTypes.keywords.case])) {
        const _cases = this._switch_body();
        cases.push(_cases[0]);
      }
      return cases;
    }
    _case_selectors() {
      var _a2, _b, _c, _d;
      const selectors = [
        (_b = (_a2 = this._shift_expression()) === null || _a2 === void 0 ? void 0 : _a2.evaluate(this._context).toString()) !== null && _b !== void 0 ? _b : ""
      ];
      while (this._match(TokenTypes.tokens.comma)) {
        selectors.push((_d = (_c = this._shift_expression()) === null || _c === void 0 ? void 0 : _c.evaluate(this._context).toString()) !== null && _d !== void 0 ? _d : "");
      }
      return selectors;
    }
    _case_body() {
      if (this._match(TokenTypes.keywords.fallthrough)) {
        this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
        return [];
      }
      let statement = this._statement();
      if (statement == null)
        return [];
      if (!(statement instanceof Array)) {
        statement = [statement];
      }
      const nextStatement = this._case_body();
      if (nextStatement.length == 0)
        return statement;
      return [...statement, nextStatement[0]];
    }
    _if_statement() {
      if (!this._match(TokenTypes.keywords.if))
        return null;
      const condition = this._optional_paren_expression();
      const block = this._compound_statement();
      let elseif = [];
      if (this._match_elseif()) {
        elseif = this._elseif_statement(elseif);
      }
      let _else = null;
      if (this._match(TokenTypes.keywords.else))
        _else = this._compound_statement();
      return new If(condition, block, elseif, _else);
    }
    _match_elseif() {
      if (this._tokens[this._current].type === TokenTypes.keywords.else && this._tokens[this._current + 1].type === TokenTypes.keywords.if) {
        this._advance();
        this._advance();
        return true;
      }
      return false;
    }
    _elseif_statement(elseif = []) {
      const condition = this._optional_paren_expression();
      const block = this._compound_statement();
      elseif.push(new ElseIf(condition, block));
      if (this._match_elseif()) {
        this._elseif_statement(elseif);
      }
      return elseif;
    }
    _return_statement() {
      if (!this._match(TokenTypes.keywords.return))
        return null;
      const value = this._short_circuit_or_expression();
      return new Return(value);
    }
    _short_circuit_or_expression() {
      let expr = this._short_circuit_and_expr();
      while (this._match(TokenTypes.tokens.or_or)) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._short_circuit_and_expr());
      }
      return expr;
    }
    _short_circuit_and_expr() {
      let expr = this._inclusive_or_expression();
      while (this._match(TokenTypes.tokens.and_and)) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._inclusive_or_expression());
      }
      return expr;
    }
    _inclusive_or_expression() {
      let expr = this._exclusive_or_expression();
      while (this._match(TokenTypes.tokens.or)) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._exclusive_or_expression());
      }
      return expr;
    }
    _exclusive_or_expression() {
      let expr = this._and_expression();
      while (this._match(TokenTypes.tokens.xor)) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._and_expression());
      }
      return expr;
    }
    _and_expression() {
      let expr = this._equality_expression();
      while (this._match(TokenTypes.tokens.and)) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._equality_expression());
      }
      return expr;
    }
    _equality_expression() {
      const expr = this._relational_expression();
      if (this._match([TokenTypes.tokens.equal_equal, TokenTypes.tokens.not_equal])) {
        return new BinaryOperator(this._previous().toString(), expr, this._relational_expression());
      }
      return expr;
    }
    _relational_expression() {
      let expr = this._shift_expression();
      while (this._match([
        TokenTypes.tokens.less_than,
        TokenTypes.tokens.greater_than,
        TokenTypes.tokens.less_than_equal,
        TokenTypes.tokens.greater_than_equal
      ])) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._shift_expression());
      }
      return expr;
    }
    _shift_expression() {
      let expr = this._additive_expression();
      while (this._match([TokenTypes.tokens.shift_left, TokenTypes.tokens.shift_right])) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._additive_expression());
      }
      return expr;
    }
    _additive_expression() {
      let expr = this._multiplicative_expression();
      while (this._match([TokenTypes.tokens.plus, TokenTypes.tokens.minus])) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._multiplicative_expression());
      }
      return expr;
    }
    _multiplicative_expression() {
      let expr = this._unary_expression();
      while (this._match([
        TokenTypes.tokens.star,
        TokenTypes.tokens.forward_slash,
        TokenTypes.tokens.modulo
      ])) {
        expr = new BinaryOperator(this._previous().toString(), expr, this._unary_expression());
      }
      return expr;
    }
    _unary_expression() {
      if (this._match([
        TokenTypes.tokens.minus,
        TokenTypes.tokens.bang,
        TokenTypes.tokens.tilde,
        TokenTypes.tokens.star,
        TokenTypes.tokens.and
      ])) {
        return new UnaryOperator(this._previous().toString(), this._unary_expression());
      }
      return this._singular_expression();
    }
    _singular_expression() {
      const expr = this._primary_expression();
      const p = this._postfix_expression();
      if (p)
        expr.postfix = p;
      return expr;
    }
    _postfix_expression() {
      if (this._match(TokenTypes.tokens.bracket_left)) {
        const expr = this._short_circuit_or_expression();
        this._consume(TokenTypes.tokens.bracket_right, "Expected ']'.");
        const p = this._postfix_expression();
        if (p)
          expr.postfix = p;
        return expr;
      }
      if (this._match(TokenTypes.tokens.period)) {
        const name = this._consume(TokenTypes.tokens.ident, "Expected member name.");
        const p = this._postfix_expression();
        const expr = new StringExpr(name.lexeme);
        if (p)
          expr.postfix = p;
        return expr;
      }
      return null;
    }
    _getStruct(name) {
      if (this._context.aliases.has(name)) {
        const alias = this._context.aliases.get(name).type;
        return alias;
      }
      if (this._context.structs.has(name)) {
        const struct = this._context.structs.get(name);
        return struct;
      }
      return null;
    }
    _primary_expression() {
      if (this._match(TokenTypes.tokens.ident)) {
        const name = this._previous().toString();
        if (this._check(TokenTypes.tokens.paren_left)) {
          const args2 = this._argument_expression_list();
          const struct = this._getStruct(name);
          if (struct != null) {
            return new CreateExpr(struct, args2);
          }
          return new CallExpr(name, args2);
        }
        if (this._context.constants.has(name)) {
          const c = this._context.constants.get(name);
          return new ConstExpr(name, c.value);
        }
        return new VariableExpr(name);
      }
      if (this._match(TokenTypes.const_literal)) {
        return new LiteralExpr(parseFloat(this._previous().toString()));
      }
      if (this._check(TokenTypes.tokens.paren_left)) {
        return this._paren_expression();
      }
      if (this._match(TokenTypes.keywords.bitcast)) {
        this._consume(TokenTypes.tokens.less_than, "Expected '<'.");
        const type2 = this._type_decl();
        this._consume(TokenTypes.tokens.greater_than, "Expected '>'.");
        const value = this._paren_expression();
        return new BitcastExpr(type2, value);
      }
      const type = this._type_decl();
      const args = this._argument_expression_list();
      return new TypecastExpr(type, args);
    }
    _argument_expression_list() {
      if (!this._match(TokenTypes.tokens.paren_left))
        return null;
      const args = [];
      do {
        if (this._check(TokenTypes.tokens.paren_right))
          break;
        const arg = this._short_circuit_or_expression();
        args.push(arg);
      } while (this._match(TokenTypes.tokens.comma));
      this._consume(TokenTypes.tokens.paren_right, "Expected ')' for agument list");
      return args;
    }
    _optional_paren_expression() {
      this._match(TokenTypes.tokens.paren_left);
      const expr = this._short_circuit_or_expression();
      this._match(TokenTypes.tokens.paren_right);
      return new GroupingExpr([expr]);
    }
    _paren_expression() {
      this._consume(TokenTypes.tokens.paren_left, "Expected '('.");
      const expr = this._short_circuit_or_expression();
      this._consume(TokenTypes.tokens.paren_right, "Expected ')'.");
      return new GroupingExpr([expr]);
    }
    _struct_decl() {
      if (!this._match(TokenTypes.keywords.struct))
        return null;
      const name = this._consume(TokenTypes.tokens.ident, "Expected name for struct.").toString();
      this._consume(TokenTypes.tokens.brace_left, "Expected '{' for struct body.");
      const members = [];
      while (!this._check(TokenTypes.tokens.brace_right)) {
        const memberAttrs = this._attribute();
        const memberName = this._consume(TokenTypes.tokens.ident, "Expected variable name.").toString();
        this._consume(TokenTypes.tokens.colon, "Expected ':' for struct member type.");
        const typeAttrs = this._attribute();
        const memberType = this._type_decl();
        if (memberType != null)
          memberType.attributes = typeAttrs;
        if (!this._check(TokenTypes.tokens.brace_right))
          this._consume(TokenTypes.tokens.comma, "Expected ',' for struct member.");
        else
          this._match(TokenTypes.tokens.comma);
        members.push(new Member(memberName, memberType, memberAttrs));
      }
      this._consume(TokenTypes.tokens.brace_right, "Expected '}' after struct body.");
      const structNode = new Struct(name, members);
      this._context.structs.set(name, structNode);
      return structNode;
    }
    _global_variable_decl() {
      const _var = this._variable_decl();
      if (_var && this._match(TokenTypes.tokens.equal))
        _var.value = this._const_expression();
      return _var;
    }
    _override_variable_decl() {
      const _override = this._override_decl();
      if (_override && this._match(TokenTypes.tokens.equal))
        _override.value = this._const_expression();
      return _override;
    }
    _global_const_decl() {
      if (!this._match(TokenTypes.keywords.const))
        return null;
      const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
      let type = null;
      if (this._match(TokenTypes.tokens.colon)) {
        const attrs = this._attribute();
        type = this._type_decl();
        if (type != null)
          type.attributes = attrs;
      }
      let value = null;
      if (this._match(TokenTypes.tokens.equal)) {
        const valueExpr = this._short_circuit_or_expression();
        if (valueExpr instanceof CreateExpr) {
          value = valueExpr;
        } else if (valueExpr instanceof ConstExpr && valueExpr.initializer instanceof CreateExpr) {
          value = valueExpr.initializer;
        } else {
          try {
            const constValue = valueExpr.evaluate(this._context);
            value = new LiteralExpr(constValue);
          } catch (_a2) {
            value = valueExpr;
          }
        }
      }
      const c = new Const(name.toString(), type, "", "", value);
      this._context.constants.set(c.name, c);
      return c;
    }
    _global_let_decl() {
      if (!this._match(TokenTypes.keywords.let))
        return null;
      const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
      let type = null;
      if (this._match(TokenTypes.tokens.colon)) {
        const attrs = this._attribute();
        type = this._type_decl();
        if (type != null)
          type.attributes = attrs;
      }
      let value = null;
      if (this._match(TokenTypes.tokens.equal)) {
        value = this._const_expression();
      }
      return new Let(name.toString(), type, "", "", value);
    }
    _const_expression() {
      if (this._match(TokenTypes.const_literal))
        return new StringExpr(this._previous().toString());
      const type = this._type_decl();
      this._consume(TokenTypes.tokens.paren_left, "Expected '('.");
      let args = [];
      while (!this._check(TokenTypes.tokens.paren_right)) {
        args.push(this._const_expression());
        if (!this._check(TokenTypes.tokens.comma))
          break;
        this._advance();
      }
      this._consume(TokenTypes.tokens.paren_right, "Expected ')'.");
      return new CreateExpr(type, args);
    }
    _variable_decl() {
      if (!this._match(TokenTypes.keywords.var))
        return null;
      let storage = "";
      let access = "";
      if (this._match(TokenTypes.tokens.less_than)) {
        storage = this._consume(TokenTypes.storage_class, "Expected storage_class.").toString();
        if (this._match(TokenTypes.tokens.comma))
          access = this._consume(TokenTypes.access_mode, "Expected access_mode.").toString();
        this._consume(TokenTypes.tokens.greater_than, "Expected '>'.");
      }
      const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
      let type = null;
      if (this._match(TokenTypes.tokens.colon)) {
        const attrs = this._attribute();
        type = this._type_decl();
        if (type != null)
          type.attributes = attrs;
      }
      return new Var(name.toString(), type, storage, access, null);
    }
    _override_decl() {
      if (!this._match(TokenTypes.keywords.override))
        return null;
      const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
      let type = null;
      if (this._match(TokenTypes.tokens.colon)) {
        const attrs = this._attribute();
        type = this._type_decl();
        if (type != null)
          type.attributes = attrs;
      }
      return new Override(name.toString(), type, null);
    }
    _enable_directive() {
      const name = this._consume(TokenTypes.tokens.ident, "identity expected.");
      return new Enable(name.toString());
    }
    _type_alias() {
      const name = this._consume(TokenTypes.tokens.ident, "identity expected.");
      this._consume(TokenTypes.tokens.equal, "Expected '=' for type alias.");
      let aliasType = this._type_decl();
      if (aliasType === null) {
        throw this._error(this._peek(), "Expected Type for Alias.");
      }
      if (this._context.aliases.has(aliasType.name)) {
        aliasType = this._context.aliases.get(aliasType.name).type;
      }
      const aliasNode = new Alias(name.toString(), aliasType);
      this._context.aliases.set(aliasNode.name, aliasNode);
      return aliasNode;
    }
    _type_decl() {
      if (this._check([
        TokenTypes.tokens.ident,
        ...TokenTypes.texel_format,
        TokenTypes.keywords.bool,
        TokenTypes.keywords.f32,
        TokenTypes.keywords.i32,
        TokenTypes.keywords.u32
      ])) {
        const type2 = this._advance();
        const typeName = type2.toString();
        if (this._context.structs.has(typeName)) {
          return this._context.structs.get(typeName);
        }
        if (this._context.aliases.has(typeName)) {
          return this._context.aliases.get(typeName).type;
        }
        return new Type(type2.toString());
      }
      let type = this._texture_sampler_types();
      if (type)
        return type;
      if (this._check(TokenTypes.template_types)) {
        let type2 = this._advance().toString();
        let format = null;
        let access = null;
        if (this._match(TokenTypes.tokens.less_than)) {
          format = this._type_decl();
          access = null;
          if (this._match(TokenTypes.tokens.comma))
            access = this._consume(TokenTypes.access_mode, "Expected access_mode for pointer").toString();
          this._consume(TokenTypes.tokens.greater_than, "Expected '>' for type.");
        }
        return new TemplateType(type2, format, access);
      }
      if (this._match(TokenTypes.keywords.ptr)) {
        let pointer = this._previous().toString();
        this._consume(TokenTypes.tokens.less_than, "Expected '<' for pointer.");
        const storage = this._consume(TokenTypes.storage_class, "Expected storage_class for pointer");
        this._consume(TokenTypes.tokens.comma, "Expected ',' for pointer.");
        const decl = this._type_decl();
        let access = null;
        if (this._match(TokenTypes.tokens.comma))
          access = this._consume(TokenTypes.access_mode, "Expected access_mode for pointer").toString();
        this._consume(TokenTypes.tokens.greater_than, "Expected '>' for pointer.");
        return new PointerType(pointer, storage.toString(), decl, access);
      }
      const attrs = this._attribute();
      if (this._match(TokenTypes.keywords.array)) {
        let format = null;
        let countInt = -1;
        const array = this._previous();
        if (this._match(TokenTypes.tokens.less_than)) {
          format = this._type_decl();
          if (this._context.aliases.has(format.name)) {
            format = this._context.aliases.get(format.name).type;
          }
          let count = "";
          if (this._match(TokenTypes.tokens.comma)) {
            let c = this._shift_expression();
            count = c.evaluate(this._context).toString();
          }
          this._consume(TokenTypes.tokens.greater_than, "Expected '>' for array.");
          countInt = count ? parseInt(count) : 0;
        }
        return new ArrayType(array.toString(), attrs, format, countInt);
      }
      return null;
    }
    _texture_sampler_types() {
      if (this._match(TokenTypes.sampler_type))
        return new SamplerType(this._previous().toString(), null, null);
      if (this._match(TokenTypes.depth_texture_type))
        return new SamplerType(this._previous().toString(), null, null);
      if (this._match(TokenTypes.sampled_texture_type) || this._match(TokenTypes.multisampled_texture_type)) {
        const sampler = this._previous();
        this._consume(TokenTypes.tokens.less_than, "Expected '<' for sampler type.");
        const format = this._type_decl();
        this._consume(TokenTypes.tokens.greater_than, "Expected '>' for sampler type.");
        return new SamplerType(sampler.toString(), format, null);
      }
      if (this._match(TokenTypes.storage_texture_type)) {
        const sampler = this._previous();
        this._consume(TokenTypes.tokens.less_than, "Expected '<' for sampler type.");
        const format = this._consume(TokenTypes.texel_format, "Invalid texel format.").toString();
        this._consume(TokenTypes.tokens.comma, "Expected ',' after texel format.");
        const access = this._consume(TokenTypes.access_mode, "Expected access mode for storage texture type.").toString();
        this._consume(TokenTypes.tokens.greater_than, "Expected '>' for sampler type.");
        return new SamplerType(sampler.toString(), format, access);
      }
      return null;
    }
    _attribute() {
      let attributes = [];
      while (this._match(TokenTypes.tokens.attr)) {
        const name = this._consume(TokenTypes.attribute_name, "Expected attribute name");
        const attr = new Attribute(name.toString(), null);
        if (this._match(TokenTypes.tokens.paren_left)) {
          attr.value = this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString();
          if (this._check(TokenTypes.tokens.comma)) {
            this._advance();
            do {
              const v = this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString();
              if (!(attr.value instanceof Array)) {
                attr.value = [attr.value];
              }
              attr.value.push(v);
            } while (this._match(TokenTypes.tokens.comma));
          }
          this._consume(TokenTypes.tokens.paren_right, "Expected ')'");
        }
        attributes.push(attr);
      }
      while (this._match(TokenTypes.tokens.attr_left)) {
        if (!this._check(TokenTypes.tokens.attr_right)) {
          do {
            const name = this._consume(TokenTypes.attribute_name, "Expected attribute name");
            const attr = new Attribute(name.toString(), null);
            if (this._match(TokenTypes.tokens.paren_left)) {
              attr.value = [
                this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString()
              ];
              if (this._check(TokenTypes.tokens.comma)) {
                this._advance();
                do {
                  const v = this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString();
                  attr.value.push(v);
                } while (this._match(TokenTypes.tokens.comma));
              }
              this._consume(TokenTypes.tokens.paren_right, "Expected ')'");
            }
            attributes.push(attr);
          } while (this._match(TokenTypes.tokens.comma));
        }
        this._consume(TokenTypes.tokens.attr_right, "Expected ']]' after attribute declarations");
      }
      if (attributes.length == 0)
        return null;
      return attributes;
    }
  };
  var TypeInfo = class {
    constructor(name, attributes) {
      this.name = name;
      this.attributes = attributes;
      this.size = 0;
    }
    get isArray() {
      return false;
    }
    get isStruct() {
      return false;
    }
    get isTemplate() {
      return false;
    }
  };
  var MemberInfo = class {
    constructor(name, type, attributes) {
      this.name = name;
      this.type = type;
      this.attributes = attributes;
      this.offset = 0;
      this.size = 0;
    }
    get isArray() {
      return this.type.isArray;
    }
    get isStruct() {
      return this.type.isStruct;
    }
    get isTemplate() {
      return this.type.isTemplate;
    }
    get align() {
      return this.type.isStruct ? this.type.align : 0;
    }
    get members() {
      return this.type.isStruct ? this.type.members : null;
    }
    get format() {
      return this.type.isArray ? this.type.format : this.type.isTemplate ? this.type.format : null;
    }
    get count() {
      return this.type.isArray ? this.type.count : 0;
    }
    get stride() {
      return this.type.isArray ? this.type.stride : this.size;
    }
  };
  var StructInfo = class extends TypeInfo {
    constructor(name, attributes) {
      super(name, attributes);
      this.members = [];
      this.align = 0;
    }
    get isStruct() {
      return true;
    }
  };
  var ArrayInfo = class extends TypeInfo {
    constructor(name, attributes) {
      super(name, attributes);
      this.count = 0;
      this.stride = 0;
    }
    get isArray() {
      return true;
    }
  };
  var TemplateInfo = class extends TypeInfo {
    constructor(name, format, attributes, access) {
      super(name, attributes);
      this.format = format;
      this.access = access;
    }
    get isTemplate() {
      return true;
    }
  };
  var ResourceType;
  (function(ResourceType2) {
    ResourceType2[ResourceType2["Uniform"] = 0] = "Uniform";
    ResourceType2[ResourceType2["Storage"] = 1] = "Storage";
    ResourceType2[ResourceType2["Texture"] = 2] = "Texture";
    ResourceType2[ResourceType2["Sampler"] = 3] = "Sampler";
    ResourceType2[ResourceType2["StorageTexture"] = 4] = "StorageTexture";
  })(ResourceType || (ResourceType = {}));
  var VariableInfo = class {
    constructor(name, type, group, binding, attributes, resourceType, access) {
      this.name = name;
      this.type = type;
      this.group = group;
      this.binding = binding;
      this.attributes = attributes;
      this.resourceType = resourceType;
      this.access = access;
    }
    get isArray() {
      return this.type.isArray;
    }
    get isStruct() {
      return this.type.isStruct;
    }
    get isTemplate() {
      return this.type.isTemplate;
    }
    get size() {
      return this.type.size;
    }
    get align() {
      return this.type.isStruct ? this.type.align : 0;
    }
    get members() {
      return this.type.isStruct ? this.type.members : null;
    }
    get format() {
      return this.type.isArray ? this.type.format : this.type.isTemplate ? this.type.format : null;
    }
    get count() {
      return this.type.isArray ? this.type.count : 0;
    }
    get stride() {
      return this.type.isArray ? this.type.stride : this.size;
    }
  };
  var AliasInfo = class {
    constructor(name, type) {
      this.name = name;
      this.type = type;
    }
  };
  var _TypeSize = class {
    constructor(align, size) {
      this.align = align;
      this.size = size;
    }
  };
  var InputInfo = class {
    constructor(name, type, locationType, location) {
      this.name = name;
      this.type = type;
      this.locationType = locationType;
      this.location = location;
      this.interpolation = null;
    }
  };
  var OutputInfo = class {
    constructor(name, type, locationType, location) {
      this.name = name;
      this.type = type;
      this.locationType = locationType;
      this.location = location;
    }
  };
  var FunctionInfo = class {
    constructor(name, stage = null) {
      this.stage = null;
      this.inputs = [];
      this.outputs = [];
      this.resources = [];
      this.name = name;
      this.stage = stage;
    }
  };
  var EntryFunctions = class {
    constructor() {
      this.vertex = [];
      this.fragment = [];
      this.compute = [];
    }
  };
  var OverrideInfo = class {
    constructor(name, type, attributes, id) {
      this.name = name;
      this.type = type;
      this.attributes = attributes;
      this.id = id;
    }
  };
  var _FunctionResources = class {
    constructor(node) {
      this.resources = null;
      this.node = node;
    }
  };
  var WgslReflect = class _WgslReflect {
    constructor(code) {
      this.uniforms = [];
      this.storage = [];
      this.textures = [];
      this.samplers = [];
      this.aliases = [];
      this.overrides = [];
      this.structs = [];
      this.entry = new EntryFunctions();
      this._types = /* @__PURE__ */ new Map();
      this._functions = /* @__PURE__ */ new Map();
      if (code) {
        this.update(code);
      }
    }
    _isStorageTexture(type) {
      return type.name == "texture_storage_1d" || type.name == "texture_storage_2d" || type.name == "texture_storage_2d_array" || type.name == "texture_storage_3d";
    }
    update(code) {
      const parser = new WgslParser();
      const ast = parser.parse(code);
      for (const node of ast) {
        if (node instanceof Function) {
          this._functions.set(node.name, new _FunctionResources(node));
        }
      }
      for (const node of ast) {
        if (node instanceof Struct) {
          const info = this._getTypeInfo(node, null);
          if (info instanceof StructInfo) {
            this.structs.push(info);
          }
          continue;
        }
        if (node instanceof Alias) {
          this.aliases.push(this._getAliasInfo(node));
          continue;
        }
        if (node instanceof Override) {
          const v = node;
          const id = this._getAttributeNum(v.attributes, "id", 0);
          const type = v.type != null ? this._getTypeInfo(v.type, v.attributes) : null;
          this.overrides.push(new OverrideInfo(v.name, type, v.attributes, id));
          continue;
        }
        if (this._isUniformVar(node)) {
          const v = node;
          const g = this._getAttributeNum(v.attributes, "group", 0);
          const b2 = this._getAttributeNum(v.attributes, "binding", 0);
          const type = this._getTypeInfo(v.type, v.attributes);
          const varInfo = new VariableInfo(v.name, type, g, b2, v.attributes, ResourceType.Uniform, v.access);
          this.uniforms.push(varInfo);
          continue;
        }
        if (this._isStorageVar(node)) {
          const v = node;
          const g = this._getAttributeNum(v.attributes, "group", 0);
          const b2 = this._getAttributeNum(v.attributes, "binding", 0);
          const type = this._getTypeInfo(v.type, v.attributes);
          const isStorageTexture = this._isStorageTexture(type);
          const varInfo = new VariableInfo(v.name, type, g, b2, v.attributes, isStorageTexture ? ResourceType.StorageTexture : ResourceType.Storage, v.access);
          this.storage.push(varInfo);
          continue;
        }
        if (this._isTextureVar(node)) {
          const v = node;
          const g = this._getAttributeNum(v.attributes, "group", 0);
          const b2 = this._getAttributeNum(v.attributes, "binding", 0);
          const type = this._getTypeInfo(v.type, v.attributes);
          const isStorageTexture = this._isStorageTexture(type);
          const varInfo = new VariableInfo(v.name, type, g, b2, v.attributes, isStorageTexture ? ResourceType.StorageTexture : ResourceType.Texture, v.access);
          if (isStorageTexture) {
            this.storage.push(varInfo);
          } else {
            this.textures.push(varInfo);
          }
          continue;
        }
        if (this._isSamplerVar(node)) {
          const v = node;
          const g = this._getAttributeNum(v.attributes, "group", 0);
          const b2 = this._getAttributeNum(v.attributes, "binding", 0);
          const type = this._getTypeInfo(v.type, v.attributes);
          const varInfo = new VariableInfo(v.name, type, g, b2, v.attributes, ResourceType.Sampler, v.access);
          this.samplers.push(varInfo);
          continue;
        }
        if (node instanceof Function) {
          const vertexStage = this._getAttribute(node, "vertex");
          const fragmentStage = this._getAttribute(node, "fragment");
          const computeStage = this._getAttribute(node, "compute");
          const stage = vertexStage || fragmentStage || computeStage;
          if (stage) {
            const fn = new FunctionInfo(node.name, stage === null || stage === void 0 ? void 0 : stage.name);
            fn.inputs = this._getInputs(node.args);
            fn.outputs = this._getOutputs(node.returnType);
            fn.resources = this._findResources(node);
            this.entry[stage.name].push(fn);
          }
          continue;
        }
      }
    }
    _findResource(name) {
      for (const u of this.uniforms) {
        if (u.name == name) {
          return u;
        }
      }
      for (const s of this.storage) {
        if (s.name == name) {
          return s;
        }
      }
      for (const t of this.textures) {
        if (t.name == name) {
          return t;
        }
      }
      for (const s of this.samplers) {
        if (s.name == name) {
          return s;
        }
      }
      return null;
    }
    _findResources(fn) {
      const resources = [];
      const self = this;
      const varStack = [];
      fn.search((node) => {
        if (node instanceof _BlockStart) {
          varStack.push({});
        } else if (node instanceof _BlockEnd) {
          varStack.pop();
        } else if (node instanceof Var) {
          if (varStack.length > 0) {
            const v = node;
            varStack[varStack.length - 1][v.name] = v;
          }
        } else if (node instanceof Let) {
          if (varStack.length > 0) {
            const v = node;
            varStack[varStack.length - 1][v.name] = v;
          }
        } else if (node instanceof VariableExpr) {
          const v = node;
          if (varStack.length > 0) {
            const varInfo2 = varStack[varStack.length - 1][v.name];
            if (varInfo2) {
              return;
            }
          }
          const varInfo = self._findResource(v.name);
          if (varInfo) {
            resources.push(varInfo);
          }
        } else if (node instanceof CallExpr) {
          const c = node;
          const fn2 = self._functions.get(c.name);
          if (fn2) {
            if (fn2.resources === null) {
              fn2.resources = self._findResources(fn2.node);
            }
            resources.push(...fn2.resources);
          }
        }
      });
      return [...new Map(resources.map((r) => [r.name, r])).values()];
    }
    getBindGroups() {
      const groups = [];
      function _makeRoom(group, binding) {
        if (group >= groups.length)
          groups.length = group + 1;
        if (groups[group] === void 0)
          groups[group] = [];
        if (binding >= groups[group].length)
          groups[group].length = binding + 1;
      }
      for (const u of this.uniforms) {
        _makeRoom(u.group, u.binding);
        const group = groups[u.group];
        group[u.binding] = u;
      }
      for (const u of this.storage) {
        _makeRoom(u.group, u.binding);
        const group = groups[u.group];
        group[u.binding] = u;
      }
      for (const t of this.textures) {
        _makeRoom(t.group, t.binding);
        const group = groups[t.group];
        group[t.binding] = t;
      }
      for (const t of this.samplers) {
        _makeRoom(t.group, t.binding);
        const group = groups[t.group];
        group[t.binding] = t;
      }
      return groups;
    }
    _getOutputs(type, outputs = void 0) {
      if (outputs === void 0)
        outputs = [];
      if (type instanceof Struct) {
        this._getStructOutputs(type, outputs);
      } else {
        const output = this._getOutputInfo(type);
        if (output !== null)
          outputs.push(output);
      }
      return outputs;
    }
    _getStructOutputs(struct, outputs) {
      for (const m of struct.members) {
        if (m.type instanceof Struct) {
          this._getStructOutputs(m.type, outputs);
        } else {
          const location = this._getAttribute(m, "location") || this._getAttribute(m, "builtin");
          if (location !== null) {
            const typeInfo2 = this._getTypeInfo(m.type, m.type.attributes);
            const locationValue = this._parseInt(location.value);
            const info = new OutputInfo(m.name, typeInfo2, location.name, locationValue);
            outputs.push(info);
          }
        }
      }
    }
    _getOutputInfo(type) {
      const location = this._getAttribute(type, "location") || this._getAttribute(type, "builtin");
      if (location !== null) {
        const typeInfo2 = this._getTypeInfo(type, type.attributes);
        const locationValue = this._parseInt(location.value);
        const info = new OutputInfo("", typeInfo2, location.name, locationValue);
        return info;
      }
      return null;
    }
    _getInputs(args, inputs = void 0) {
      if (inputs === void 0)
        inputs = [];
      for (const arg of args) {
        if (arg.type instanceof Struct) {
          this._getStructInputs(arg.type, inputs);
        } else {
          const input = this._getInputInfo(arg);
          if (input !== null)
            inputs.push(input);
        }
      }
      return inputs;
    }
    _getStructInputs(struct, inputs) {
      for (const m of struct.members) {
        if (m.type instanceof Struct) {
          this._getStructInputs(m.type, inputs);
        } else {
          const input = this._getInputInfo(m);
          if (input !== null)
            inputs.push(input);
        }
      }
    }
    _getInputInfo(node) {
      const location = this._getAttribute(node, "location") || this._getAttribute(node, "builtin");
      if (location !== null) {
        const interpolation = this._getAttribute(node, "interpolation");
        const type = this._getTypeInfo(node.type, node.attributes);
        const locationValue = this._parseInt(location.value);
        const info = new InputInfo(node.name, type, location.name, locationValue);
        if (interpolation !== null) {
          info.interpolation = this._parseString(interpolation.value);
        }
        return info;
      }
      return null;
    }
    _parseString(s) {
      if (s instanceof Array) {
        s = s[0];
      }
      return s;
    }
    _parseInt(s) {
      if (s instanceof Array) {
        s = s[0];
      }
      const n = parseInt(s);
      return isNaN(n) ? s : n;
    }
    _getAlias(name) {
      for (const a of this.aliases) {
        if (a.name == name)
          return a.type;
      }
      return null;
    }
    _getAliasInfo(node) {
      return new AliasInfo(node.name, this._getTypeInfo(node.type, null));
    }
    _getTypeInfo(type, attributes) {
      if (this._types.has(type)) {
        return this._types.get(type);
      }
      if (type instanceof ArrayType) {
        const a = type;
        const t = this._getTypeInfo(a.format, a.attributes);
        const info2 = new ArrayInfo(a.name, attributes);
        info2.format = t;
        info2.count = a.count;
        this._types.set(type, info2);
        this._updateTypeInfo(info2);
        return info2;
      }
      if (type instanceof Struct) {
        const s = type;
        const info2 = new StructInfo(s.name, attributes);
        for (const m of s.members) {
          const t = this._getTypeInfo(m.type, m.attributes);
          info2.members.push(new MemberInfo(m.name, t, m.attributes));
        }
        this._types.set(type, info2);
        this._updateTypeInfo(info2);
        return info2;
      }
      if (type instanceof SamplerType) {
        const s = type;
        const formatIsType = s.format instanceof Type;
        const format = s.format ? formatIsType ? this._getTypeInfo(s.format, null) : new TypeInfo(s.format, null) : null;
        const info2 = new TemplateInfo(s.name, format, attributes, s.access);
        this._types.set(type, info2);
        this._updateTypeInfo(info2);
        return info2;
      }
      if (type instanceof TemplateType) {
        const t = type;
        const format = t.format ? this._getTypeInfo(t.format, null) : null;
        const info2 = new TemplateInfo(t.name, format, attributes, t.access);
        this._types.set(type, info2);
        this._updateTypeInfo(info2);
        return info2;
      }
      const info = new TypeInfo(type.name, attributes);
      this._types.set(type, info);
      this._updateTypeInfo(info);
      return info;
    }
    _updateTypeInfo(type) {
      var _a2, _b;
      const typeSize = this._getTypeSize(type);
      type.size = (_a2 = typeSize === null || typeSize === void 0 ? void 0 : typeSize.size) !== null && _a2 !== void 0 ? _a2 : 0;
      if (type instanceof ArrayInfo) {
        const formatInfo = this._getTypeSize(type["format"]);
        type.stride = (_b = formatInfo === null || formatInfo === void 0 ? void 0 : formatInfo.size) !== null && _b !== void 0 ? _b : 0;
        this._updateTypeInfo(type["format"]);
      }
      if (type instanceof StructInfo) {
        this._updateStructInfo(type);
      }
    }
    _updateStructInfo(struct) {
      var _a2;
      let offset = 0;
      let lastSize = 0;
      let lastOffset = 0;
      let structAlign = 0;
      for (let mi = 0, ml = struct.members.length; mi < ml; ++mi) {
        const member = struct.members[mi];
        const sizeInfo = this._getTypeSize(member);
        if (!sizeInfo)
          continue;
        (_a2 = this._getAlias(member.type.name)) !== null && _a2 !== void 0 ? _a2 : member.type;
        const align = sizeInfo.align;
        const size = sizeInfo.size;
        offset = this._roundUp(align, offset + lastSize);
        lastSize = size;
        lastOffset = offset;
        structAlign = Math.max(structAlign, align);
        member.offset = offset;
        member.size = size;
        this._updateTypeInfo(member.type);
      }
      struct.size = this._roundUp(structAlign, lastOffset + lastSize);
      struct.align = structAlign;
    }
    _getTypeSize(type) {
      var _a2;
      if (type === null || type === void 0)
        return null;
      const explicitSize = this._getAttributeNum(type.attributes, "size", 0);
      const explicitAlign = this._getAttributeNum(type.attributes, "align", 0);
      if (type instanceof MemberInfo)
        type = type.type;
      if (type instanceof TypeInfo) {
        const alias = this._getAlias(type.name);
        if (alias !== null) {
          type = alias;
        }
      }
      {
        const info = _WgslReflect._typeInfo[type.name];
        if (info !== void 0) {
          const divisor = type["format"] === "f16" ? 2 : 1;
          return new _TypeSize(Math.max(explicitAlign, info.align / divisor), Math.max(explicitSize, info.size / divisor));
        }
      }
      {
        const info = _WgslReflect._typeInfo[type.name.substring(0, type.name.length - 1)];
        if (info) {
          const divisor = type.name[type.name.length - 1] === "h" ? 2 : 1;
          return new _TypeSize(Math.max(explicitAlign, info.align / divisor), Math.max(explicitSize, info.size / divisor));
        }
      }
      if (type instanceof ArrayInfo) {
        let arrayType = type;
        let align = 8;
        let size = 8;
        const E = this._getTypeSize(arrayType.format);
        if (E !== null) {
          size = E.size;
          align = E.align;
        }
        const N = arrayType.count;
        const stride = this._getAttributeNum((_a2 = type === null || type === void 0 ? void 0 : type.attributes) !== null && _a2 !== void 0 ? _a2 : null, "stride", this._roundUp(align, size));
        size = N * stride;
        if (explicitSize)
          size = explicitSize;
        return new _TypeSize(Math.max(explicitAlign, align), Math.max(explicitSize, size));
      }
      if (type instanceof StructInfo) {
        let align = 0;
        let size = 0;
        let offset = 0;
        let lastSize = 0;
        let lastOffset = 0;
        for (const m of type.members) {
          const mi = this._getTypeSize(m.type);
          if (mi !== null) {
            align = Math.max(mi.align, align);
            offset = this._roundUp(mi.align, offset + lastSize);
            lastSize = mi.size;
            lastOffset = offset;
          }
        }
        size = this._roundUp(align, lastOffset + lastSize);
        return new _TypeSize(Math.max(explicitAlign, align), Math.max(explicitSize, size));
      }
      return null;
    }
    _isUniformVar(node) {
      return node instanceof Var && node.storage == "uniform";
    }
    _isStorageVar(node) {
      return node instanceof Var && node.storage == "storage";
    }
    _isTextureVar(node) {
      return node instanceof Var && node.type !== null && _WgslReflect._textureTypes.indexOf(node.type.name) != -1;
    }
    _isSamplerVar(node) {
      return node instanceof Var && node.type !== null && _WgslReflect._samplerTypes.indexOf(node.type.name) != -1;
    }
    _getAttribute(node, name) {
      const obj = node;
      if (!obj || !obj["attributes"])
        return null;
      const attrs = obj["attributes"];
      for (let a of attrs) {
        if (a.name == name)
          return a;
      }
      return null;
    }
    _getAttributeNum(attributes, name, defaultValue) {
      if (attributes === null)
        return defaultValue;
      for (let a of attributes) {
        if (a.name == name) {
          let v = a !== null && a.value !== null ? a.value : defaultValue;
          if (v instanceof Array) {
            v = v[0];
          }
          if (typeof v === "number") {
            return v;
          }
          if (typeof v === "string") {
            return parseInt(v);
          }
          return defaultValue;
        }
      }
      return defaultValue;
    }
    _roundUp(k, n) {
      return Math.ceil(n / k) * k;
    }
  };
  WgslReflect._typeInfo = {
    f16: { align: 2, size: 2 },
    i32: { align: 4, size: 4 },
    u32: { align: 4, size: 4 },
    f32: { align: 4, size: 4 },
    atomic: { align: 4, size: 4 },
    vec2: { align: 8, size: 8 },
    vec3: { align: 16, size: 12 },
    vec4: { align: 16, size: 16 },
    mat2x2: { align: 8, size: 16 },
    mat3x2: { align: 8, size: 24 },
    mat4x2: { align: 8, size: 32 },
    mat2x3: { align: 16, size: 32 },
    mat3x3: { align: 16, size: 48 },
    mat4x3: { align: 16, size: 64 },
    mat2x4: { align: 16, size: 32 },
    mat3x4: { align: 16, size: 48 },
    mat4x4: { align: 16, size: 64 }
  };
  WgslReflect._textureTypes = TokenTypes.any_texture_type.map((t) => {
    return t.name;
  });
  WgslReflect._samplerTypes = TokenTypes.sampler_type.map((t) => {
    return t.name;
  });
  function getEntryPointForStage(defs, stage, stageFlags) {
    const { entryPoint: entryPointName } = stage;
    if (entryPointName) {
      const ep = defs.entryPoints[entryPointName];
      return ep && ep.stage === stageFlags ? ep : void 0;
    }
    return Object.values(defs.entryPoints).filter((ep) => ep.stage === stageFlags)[0];
  }
  function getStageResources(defs, stage, stageFlags) {
    if (!stage) {
      return [];
    }
    const entryPoint = getEntryPointForStage(defs, stage, stageFlags);
    return entryPoint?.resources || [];
  }
  var byBinding = (a, b2) => Math.sign(a.binding - b2.binding);
  function makeBindGroupLayoutDescriptors(defs, desc) {
    defs = Array.isArray(defs) ? defs : [defs];
    const resources = [
      ...getStageResources(defs[0], desc.vertex, GPUShaderStage.VERTEX),
      ...getStageResources(defs[defs.length - 1], desc.fragment, GPUShaderStage.FRAGMENT),
      ...getStageResources(defs[0], desc.compute, GPUShaderStage.COMPUTE)
    ];
    const bindGroupLayoutDescriptorsByGroupByBinding = [];
    for (const resource of resources) {
      const bindingsToBindGroupEntry = bindGroupLayoutDescriptorsByGroupByBinding[resource.group] || /* @__PURE__ */ new Map();
      bindGroupLayoutDescriptorsByGroupByBinding[resource.group] = bindingsToBindGroupEntry;
      const entry = bindingsToBindGroupEntry.get(resource.entry.binding);
      bindingsToBindGroupEntry.set(resource.entry.binding, {
        ...resource.entry,
        visibility: resource.entry.visibility | (entry?.visibility || 0)
      });
    }
    return bindGroupLayoutDescriptorsByGroupByBinding.map((v) => ({ entries: [...v.values()].sort(byBinding) }));
  }
  function getNamedVariables(reflect, variables) {
    return Object.fromEntries(variables.map((v) => {
      const typeDefinition = addType(reflect, v.type, 0);
      return [
        v.name,
        {
          typeDefinition,
          group: v.group,
          binding: v.binding,
          size: typeDefinition.size
        }
      ];
    }));
  }
  function makeStructDefinition(reflect, structInfo, offset) {
    const fields = Object.fromEntries(structInfo.members.map((m) => {
      return [
        m.name,
        {
          offset: m.offset,
          type: addType(reflect, m.type, 0)
        }
      ];
    }));
    return {
      fields,
      size: structInfo.size,
      offset
    };
  }
  function getTextureSampleType(type) {
    if (type.name.includes("depth")) {
      return "depth";
    }
    switch (type.format?.name) {
      case "f32":
        return "float";
      case "i32":
        return "sint";
      case "u32":
        return "uint";
      default:
        throw new Error("unknown texture sample type");
    }
  }
  function getViewDimension(type) {
    if (type.name.includes("2d_array")) {
      return "2d-array";
    }
    if (type.name.includes("cube_array")) {
      return "cube-array";
    }
    if (type.name.includes("3d")) {
      return "3d";
    }
    if (type.name.includes("1d")) {
      return "1d";
    }
    if (type.name.includes("cube")) {
      return "cube";
    }
    return "2d";
  }
  function getStorageTextureAccess(type) {
    switch (type.access) {
      case "read":
        return "read-only";
      case "write":
        return "write-only";
      case "read_write":
        return "read-write";
      default:
        throw new Error("unknonw storage texture access");
    }
  }
  function getSamplerType(type) {
    return type.name.endsWith("_comparison") ? "comparison" : "filtering";
  }
  function getBindGroupLayoutEntry(resource, visibility) {
    const { binding, access, type } = resource;
    switch (resource.resourceType) {
      case ResourceType.Uniform:
        return {
          binding,
          visibility,
          buffer: {}
        };
      case ResourceType.Storage:
        return {
          binding,
          visibility,
          buffer: {
            type: access === "" || access === "read" ? "read-only-storage" : "storage"
          }
        };
      case ResourceType.Texture: {
        if (type.name === "texture_external") {
          return {
            binding,
            visibility,
            externalTexture: {}
          };
        }
        const multisampled = type.name.includes("multisampled");
        return {
          binding,
          visibility,
          texture: {
            sampleType: getTextureSampleType(type),
            viewDimension: getViewDimension(type),
            multisampled
          }
        };
      }
      case ResourceType.Sampler:
        return {
          binding,
          visibility,
          sampler: {
            type: getSamplerType(type)
          }
        };
      case ResourceType.StorageTexture:
        return {
          binding,
          visibility,
          storageTexture: {
            access: getStorageTextureAccess(type),
            format: type.format.name,
            viewDimension: getViewDimension(type)
          }
        };
      default:
        throw new Error("unknown resource type");
    }
  }
  function addEntryPoints(funcInfos, stage) {
    const entryPoints = {};
    for (const info of funcInfos) {
      entryPoints[info.name] = {
        stage,
        resources: info.resources.map((resource) => {
          const { name, group } = resource;
          return {
            name,
            group,
            entry: getBindGroupLayoutEntry(resource, stage)
          };
        })
      };
    }
    return entryPoints;
  }
  function makeShaderDataDefinitions(code) {
    const reflect = new WgslReflect(code);
    const structs = Object.fromEntries(reflect.structs.map((structInfo) => {
      return [structInfo.name, makeStructDefinition(reflect, structInfo, 0)];
    }));
    const uniforms = getNamedVariables(reflect, reflect.uniforms);
    const storages = getNamedVariables(reflect, reflect.storage);
    const entryPoints = {
      ...addEntryPoints(reflect.entry.vertex, GPUShaderStage.VERTEX),
      ...addEntryPoints(reflect.entry.fragment, GPUShaderStage.FRAGMENT),
      ...addEntryPoints(reflect.entry.compute, GPUShaderStage.COMPUTE)
    };
    return {
      structs,
      storages,
      uniforms,
      entryPoints
    };
  }
  function assert(cond, msg = "") {
    if (!cond) {
      throw new Error(msg);
    }
  }
  function addType(reflect, typeInfo2, offset) {
    if (typeInfo2.isArray) {
      assert(!typeInfo2.isStruct, "struct array is invalid");
      assert(!typeInfo2.isStruct, "template array is invalid");
      const arrayInfo = typeInfo2;
      return {
        size: arrayInfo.size,
        elementType: addType(reflect, arrayInfo.format, offset),
        numElements: arrayInfo.count
      };
    } else if (typeInfo2.isStruct) {
      assert(!typeInfo2.isTemplate, "template struct is invalid");
      const structInfo = typeInfo2;
      return makeStructDefinition(reflect, structInfo, offset);
    } else {
      const asTemplateInfo = typeInfo2;
      const type = typeInfo2.isTemplate ? `${asTemplateInfo.name}<${asTemplateInfo.format.name}>` : typeInfo2.name;
      return {
        size: typeInfo2.size,
        type
      };
    }
  }
  var kTypedArrayToAttribFormat = /* @__PURE__ */ new Map([
    [Int8Array, { formats: ["sint8", "snorm8"], defaultForType: 1 }],
    [Uint8Array, { formats: ["uint8", "unorm8"], defaultForType: 1 }],
    [Int16Array, { formats: ["sint16", "snorm16"], defaultForType: 1 }],
    [Uint16Array, { formats: ["uint16", "unorm16"], defaultForType: 1 }],
    [Int32Array, { formats: ["sint32", "snorm32"], defaultForType: 0 }],
    [Uint32Array, { formats: ["uint32", "unorm32"], defaultForType: 0 }],
    [Float32Array, { formats: ["float32", "float32"], defaultForType: 0 }]
    // TODO: Add Float16Array
  ]);
  var kVertexFormatPrefixToType = new Map([...kTypedArrayToAttribFormat.entries()].map(([Type2, { formats: [s1, s2] }]) => [[s1, Type2], [s2, Type2]]).flat());

  // source/js/libs/float16.js
  init_define_import_meta_env();
  var THIS_IS_NOT_AN_OBJECT = "This is not an object";
  var THIS_IS_NOT_A_FLOAT16ARRAY_OBJECT = "This is not a Float16Array object";
  var THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY = "This constructor is not a subclass of Float16Array";
  var THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT = "The constructor property value is not an object";
  var SPECIES_CONSTRUCTOR_DIDNT_RETURN_TYPEDARRAY_OBJECT = "Species constructor didn't return TypedArray object";
  var DERIVED_CONSTRUCTOR_CREATED_TYPEDARRAY_OBJECT_WHICH_WAS_TOO_SMALL_LENGTH = "Derived constructor created TypedArray object which was too small length";
  var ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER = "Attempting to access detached ArrayBuffer";
  var CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT = "Cannot convert undefined or null to object";
  var CANNOT_MIX_BIGINT_AND_OTHER_TYPES = "Cannot mix BigInt and other types, use explicit conversions";
  var ITERATOR_PROPERTY_IS_NOT_CALLABLE = "@@iterator property is not callable";
  var REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE = "Reduce of empty array with no initial value";
  var THE_COMPARISON_FUNCTION_MUST_BE_EITHER_A_FUNCTION_OR_UNDEFINED = "The comparison function must be either a function or undefined";
  var OFFSET_IS_OUT_OF_BOUNDS = "Offset is out of bounds";
  function uncurryThis(target) {
    return (thisArg, ...args) => {
      return ReflectApply(target, thisArg, args);
    };
  }
  function uncurryThisGetter(target, key) {
    return uncurryThis(
      ReflectGetOwnPropertyDescriptor(
        target,
        key
      ).get
    );
  }
  var {
    apply: ReflectApply,
    construct: ReflectConstruct,
    defineProperty: ReflectDefineProperty,
    get: ReflectGet,
    getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor,
    getPrototypeOf: ReflectGetPrototypeOf,
    has: ReflectHas,
    ownKeys: ReflectOwnKeys,
    set: ReflectSet,
    setPrototypeOf: ReflectSetPrototypeOf
  } = Reflect;
  var NativeProxy = Proxy;
  var {
    EPSILON,
    MAX_SAFE_INTEGER,
    isFinite: NumberIsFinite,
    isNaN: NumberIsNaN
  } = Number;
  var {
    iterator: SymbolIterator,
    species: SymbolSpecies,
    toStringTag: SymbolToStringTag,
    for: SymbolFor
  } = Symbol;
  var NativeObject = Object;
  var {
    create: ObjectCreate,
    defineProperty: ObjectDefineProperty,
    freeze: ObjectFreeze,
    is: ObjectIs
  } = NativeObject;
  var ObjectPrototype = NativeObject.prototype;
  var ObjectPrototype__lookupGetter__ = ObjectPrototype.__lookupGetter__ ? uncurryThis(ObjectPrototype.__lookupGetter__) : (object, key) => {
    if (object == null) {
      throw NativeTypeError(
        CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT
      );
    }
    let target = NativeObject(object);
    do {
      const descriptor = ReflectGetOwnPropertyDescriptor(target, key);
      if (descriptor !== void 0) {
        if (ObjectHasOwn(descriptor, "get")) {
          return descriptor.get;
        }
        return;
      }
    } while ((target = ReflectGetPrototypeOf(target)) !== null);
  };
  var ObjectHasOwn = NativeObject.hasOwn || uncurryThis(ObjectPrototype.hasOwnProperty);
  var NativeArray = Array;
  var ArrayIsArray = NativeArray.isArray;
  var ArrayPrototype = NativeArray.prototype;
  var ArrayPrototypeJoin = uncurryThis(ArrayPrototype.join);
  var ArrayPrototypePush = uncurryThis(ArrayPrototype.push);
  var ArrayPrototypeToLocaleString = uncurryThis(
    ArrayPrototype.toLocaleString
  );
  var NativeArrayPrototypeSymbolIterator = ArrayPrototype[SymbolIterator];
  var ArrayPrototypeSymbolIterator = uncurryThis(NativeArrayPrototypeSymbolIterator);
  var {
    abs: MathAbs,
    trunc: MathTrunc
  } = Math;
  var NativeArrayBuffer = ArrayBuffer;
  var ArrayBufferIsView = NativeArrayBuffer.isView;
  var ArrayBufferPrototype = NativeArrayBuffer.prototype;
  var ArrayBufferPrototypeSlice = uncurryThis(ArrayBufferPrototype.slice);
  var ArrayBufferPrototypeGetByteLength = uncurryThisGetter(ArrayBufferPrototype, "byteLength");
  var NativeSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : null;
  var SharedArrayBufferPrototypeGetByteLength = NativeSharedArrayBuffer && uncurryThisGetter(NativeSharedArrayBuffer.prototype, "byteLength");
  var TypedArray = ReflectGetPrototypeOf(Uint8Array);
  var TypedArrayFrom = TypedArray.from;
  var TypedArrayPrototype = TypedArray.prototype;
  var NativeTypedArrayPrototypeSymbolIterator = TypedArrayPrototype[SymbolIterator];
  var TypedArrayPrototypeKeys = uncurryThis(TypedArrayPrototype.keys);
  var TypedArrayPrototypeValues = uncurryThis(
    TypedArrayPrototype.values
  );
  var TypedArrayPrototypeEntries = uncurryThis(
    TypedArrayPrototype.entries
  );
  var TypedArrayPrototypeSet = uncurryThis(TypedArrayPrototype.set);
  var TypedArrayPrototypeReverse = uncurryThis(
    TypedArrayPrototype.reverse
  );
  var TypedArrayPrototypeFill = uncurryThis(TypedArrayPrototype.fill);
  var TypedArrayPrototypeCopyWithin = uncurryThis(
    TypedArrayPrototype.copyWithin
  );
  var TypedArrayPrototypeSort = uncurryThis(TypedArrayPrototype.sort);
  var TypedArrayPrototypeSlice = uncurryThis(TypedArrayPrototype.slice);
  var TypedArrayPrototypeSubarray = uncurryThis(
    TypedArrayPrototype.subarray
  );
  var TypedArrayPrototypeGetBuffer = uncurryThisGetter(
    TypedArrayPrototype,
    "buffer"
  );
  var TypedArrayPrototypeGetByteOffset = uncurryThisGetter(
    TypedArrayPrototype,
    "byteOffset"
  );
  var TypedArrayPrototypeGetLength = uncurryThisGetter(
    TypedArrayPrototype,
    "length"
  );
  var TypedArrayPrototypeGetSymbolToStringTag = uncurryThisGetter(
    TypedArrayPrototype,
    SymbolToStringTag
  );
  var NativeUint8Array = Uint8Array;
  var NativeUint16Array = Uint16Array;
  var Uint16ArrayFrom = (...args) => {
    return ReflectApply(TypedArrayFrom, NativeUint16Array, args);
  };
  var NativeUint32Array = Uint32Array;
  var NativeFloat32Array = Float32Array;
  var ArrayIteratorPrototype = ReflectGetPrototypeOf([][SymbolIterator]());
  var ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);
  var GeneratorPrototypeNext = uncurryThis((function* () {
  })().next);
  var IteratorPrototype = ReflectGetPrototypeOf(ArrayIteratorPrototype);
  var DataViewPrototype = DataView.prototype;
  var DataViewPrototypeGetUint16 = uncurryThis(
    DataViewPrototype.getUint16
  );
  var DataViewPrototypeSetUint16 = uncurryThis(
    DataViewPrototype.setUint16
  );
  var NativeTypeError = TypeError;
  var NativeRangeError = RangeError;
  var NativeWeakSet = WeakSet;
  var WeakSetPrototype = NativeWeakSet.prototype;
  var WeakSetPrototypeAdd = uncurryThis(WeakSetPrototype.add);
  var WeakSetPrototypeHas = uncurryThis(WeakSetPrototype.has);
  var NativeWeakMap = WeakMap;
  var WeakMapPrototype = NativeWeakMap.prototype;
  var WeakMapPrototypeGet = uncurryThis(WeakMapPrototype.get);
  var WeakMapPrototypeHas = uncurryThis(WeakMapPrototype.has);
  var WeakMapPrototypeSet = uncurryThis(WeakMapPrototype.set);
  var arrayIterators = new NativeWeakMap();
  var SafeIteratorPrototype = ObjectCreate(null, {
    next: {
      value: function next() {
        const arrayIterator = WeakMapPrototypeGet(arrayIterators, this);
        return ArrayIteratorPrototypeNext(arrayIterator);
      }
    },
    [SymbolIterator]: {
      value: function values() {
        return this;
      }
    }
  });
  function safeIfNeeded(array) {
    if (array[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext) {
      return array;
    }
    const safe = ObjectCreate(SafeIteratorPrototype);
    WeakMapPrototypeSet(arrayIterators, safe, ArrayPrototypeSymbolIterator(array));
    return safe;
  }
  var generators = new NativeWeakMap();
  var DummyArrayIteratorPrototype = ObjectCreate(IteratorPrototype, {
    next: {
      value: function next2() {
        const generator = WeakMapPrototypeGet(generators, this);
        return GeneratorPrototypeNext(generator);
      },
      writable: true,
      configurable: true
    }
  });
  for (const key of ReflectOwnKeys(ArrayIteratorPrototype)) {
    if (key === "next") {
      continue;
    }
    ObjectDefineProperty(DummyArrayIteratorPrototype, key, ReflectGetOwnPropertyDescriptor(ArrayIteratorPrototype, key));
  }
  function wrap3(generator) {
    const dummy = ObjectCreate(DummyArrayIteratorPrototype);
    WeakMapPrototypeSet(generators, dummy, generator);
    return dummy;
  }
  function isObject2(value) {
    return value !== null && typeof value === "object" || typeof value === "function";
  }
  function isObjectLike(value) {
    return value !== null && typeof value === "object";
  }
  function isNativeTypedArray(value) {
    return TypedArrayPrototypeGetSymbolToStringTag(value) !== void 0;
  }
  function isNativeBigIntTypedArray(value) {
    const typedArrayName = TypedArrayPrototypeGetSymbolToStringTag(value);
    return typedArrayName === "BigInt64Array" || typedArrayName === "BigUint64Array";
  }
  function isArrayBuffer(value) {
    try {
      if (ArrayIsArray(value)) {
        return false;
      }
      ArrayBufferPrototypeGetByteLength(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  function isSharedArrayBuffer(value) {
    if (NativeSharedArrayBuffer === null) {
      return false;
    }
    try {
      SharedArrayBufferPrototypeGetByteLength(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  function isAnyArrayBuffer(value) {
    return isArrayBuffer(value) || isSharedArrayBuffer(value);
  }
  function isOrdinaryArray(value) {
    if (!ArrayIsArray(value)) {
      return false;
    }
    return value[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext;
  }
  function isOrdinaryNativeTypedArray(value) {
    if (!isNativeTypedArray(value)) {
      return false;
    }
    return value[SymbolIterator] === NativeTypedArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext;
  }
  function isCanonicalIntegerIndexString(value) {
    if (typeof value !== "string") {
      return false;
    }
    const number = +value;
    if (value !== number + "") {
      return false;
    }
    if (!NumberIsFinite(number)) {
      return false;
    }
    return number === MathTrunc(number);
  }
  var brand = SymbolFor("__Float16Array__");
  function hasFloat16ArrayBrand(target) {
    if (!isObjectLike(target)) {
      return false;
    }
    const prototype = ReflectGetPrototypeOf(target);
    if (!isObjectLike(prototype)) {
      return false;
    }
    const constructor = prototype.constructor;
    if (constructor === void 0) {
      return false;
    }
    if (!isObject2(constructor)) {
      throw NativeTypeError(THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT);
    }
    return ReflectHas(constructor, brand);
  }
  var INVERSE_OF_EPSILON = 1 / EPSILON;
  function roundTiesToEven(num) {
    return num + INVERSE_OF_EPSILON - INVERSE_OF_EPSILON;
  }
  var FLOAT16_MIN_VALUE = 6103515625e-14;
  var FLOAT16_MAX_VALUE = 65504;
  var FLOAT16_EPSILON = 9765625e-10;
  var FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE = FLOAT16_EPSILON * FLOAT16_MIN_VALUE;
  var FLOAT16_EPSILON_DEVIDED_BY_EPSILON = FLOAT16_EPSILON * INVERSE_OF_EPSILON;
  function roundToFloat16(num) {
    const number = +num;
    if (!NumberIsFinite(number) || number === 0) {
      return number;
    }
    const sign = number > 0 ? 1 : -1;
    const absolute = MathAbs(number);
    if (absolute < FLOAT16_MIN_VALUE) {
      return sign * roundTiesToEven(absolute / FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE) * FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE;
    }
    const temp = (1 + FLOAT16_EPSILON_DEVIDED_BY_EPSILON) * absolute;
    const result = temp - (temp - absolute);
    if (result > FLOAT16_MAX_VALUE || NumberIsNaN(result)) {
      return sign * Infinity;
    }
    return sign * result;
  }
  var buffer = new NativeArrayBuffer(4);
  var floatView = new NativeFloat32Array(buffer);
  var uint32View = new NativeUint32Array(buffer);
  var baseTable = new NativeUint16Array(512);
  var shiftTable = new NativeUint8Array(512);
  for (let i = 0; i < 256; ++i) {
    const e = i - 127;
    if (e < -27) {
      baseTable[i] = 0;
      baseTable[i | 256] = 32768;
      shiftTable[i] = 24;
      shiftTable[i | 256] = 24;
    } else if (e < -14) {
      baseTable[i] = 1024 >> -e - 14;
      baseTable[i | 256] = 1024 >> -e - 14 | 32768;
      shiftTable[i] = -e - 1;
      shiftTable[i | 256] = -e - 1;
    } else if (e <= 15) {
      baseTable[i] = e + 15 << 10;
      baseTable[i | 256] = e + 15 << 10 | 32768;
      shiftTable[i] = 13;
      shiftTable[i | 256] = 13;
    } else if (e < 128) {
      baseTable[i] = 31744;
      baseTable[i | 256] = 64512;
      shiftTable[i] = 24;
      shiftTable[i | 256] = 24;
    } else {
      baseTable[i] = 31744;
      baseTable[i | 256] = 64512;
      shiftTable[i] = 13;
      shiftTable[i | 256] = 13;
    }
  }
  function roundToFloat16Bits(num) {
    floatView[0] = roundToFloat16(num);
    const f = uint32View[0];
    const e = f >> 23 & 511;
    return baseTable[e] + ((f & 8388607) >> shiftTable[e]);
  }
  var mantissaTable = new NativeUint32Array(2048);
  for (let i = 1; i < 1024; ++i) {
    let m = i << 13;
    let e = 0;
    while ((m & 8388608) === 0) {
      m <<= 1;
      e -= 8388608;
    }
    m &= ~8388608;
    e += 947912704;
    mantissaTable[i] = m | e;
  }
  for (let i = 1024; i < 2048; ++i) {
    mantissaTable[i] = 939524096 + (i - 1024 << 13);
  }
  var exponentTable = new NativeUint32Array(64);
  for (let i = 1; i < 31; ++i) {
    exponentTable[i] = i << 23;
  }
  exponentTable[31] = 1199570944;
  exponentTable[32] = 2147483648;
  for (let i = 33; i < 63; ++i) {
    exponentTable[i] = 2147483648 + (i - 32 << 23);
  }
  exponentTable[63] = 3347054592;
  var offsetTable = new NativeUint16Array(64);
  for (let i = 1; i < 64; ++i) {
    if (i !== 32) {
      offsetTable[i] = 1024;
    }
  }
  function convertToNumber(float16bits) {
    const i = float16bits >> 10;
    uint32View[0] = mantissaTable[offsetTable[i] + (float16bits & 1023)] + exponentTable[i];
    return floatView[0];
  }
  function ToIntegerOrInfinity(target) {
    const number = +target;
    if (NumberIsNaN(number) || number === 0) {
      return 0;
    }
    return MathTrunc(number);
  }
  function ToLength(target) {
    const length = ToIntegerOrInfinity(target);
    if (length < 0) {
      return 0;
    }
    return length < MAX_SAFE_INTEGER ? length : MAX_SAFE_INTEGER;
  }
  function SpeciesConstructor(target, defaultConstructor) {
    if (!isObject2(target)) {
      throw NativeTypeError(THIS_IS_NOT_AN_OBJECT);
    }
    const constructor = target.constructor;
    if (constructor === void 0) {
      return defaultConstructor;
    }
    if (!isObject2(constructor)) {
      throw NativeTypeError(THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT);
    }
    const species = constructor[SymbolSpecies];
    if (species == null) {
      return defaultConstructor;
    }
    return species;
  }
  function IsDetachedBuffer(buffer2) {
    if (isSharedArrayBuffer(buffer2)) {
      return false;
    }
    try {
      ArrayBufferPrototypeSlice(buffer2, 0, 0);
      return false;
    } catch (e) {
    }
    return true;
  }
  function defaultCompare(x, y) {
    const isXNaN = NumberIsNaN(x);
    const isYNaN = NumberIsNaN(y);
    if (isXNaN && isYNaN) {
      return 0;
    }
    if (isXNaN) {
      return 1;
    }
    if (isYNaN) {
      return -1;
    }
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    if (x === 0 && y === 0) {
      const isXPlusZero = ObjectIs(x, 0);
      const isYPlusZero = ObjectIs(y, 0);
      if (!isXPlusZero && isYPlusZero) {
        return -1;
      }
      if (isXPlusZero && !isYPlusZero) {
        return 1;
      }
    }
    return 0;
  }
  var BYTES_PER_ELEMENT = 2;
  var float16bitsArrays = new NativeWeakMap();
  function isFloat16Array(target) {
    return WeakMapPrototypeHas(float16bitsArrays, target) || !ArrayBufferIsView(target) && hasFloat16ArrayBrand(target);
  }
  function assertFloat16Array(target) {
    if (!isFloat16Array(target)) {
      throw NativeTypeError(THIS_IS_NOT_A_FLOAT16ARRAY_OBJECT);
    }
  }
  function assertSpeciesTypedArray(target, count) {
    const isTargetFloat16Array = isFloat16Array(target);
    const isTargetTypedArray = isNativeTypedArray(target);
    if (!isTargetFloat16Array && !isTargetTypedArray) {
      throw NativeTypeError(SPECIES_CONSTRUCTOR_DIDNT_RETURN_TYPEDARRAY_OBJECT);
    }
    if (typeof count === "number") {
      let length;
      if (isTargetFloat16Array) {
        const float16bitsArray = getFloat16BitsArray(target);
        length = TypedArrayPrototypeGetLength(float16bitsArray);
      } else {
        length = TypedArrayPrototypeGetLength(target);
      }
      if (length < count) {
        throw NativeTypeError(
          DERIVED_CONSTRUCTOR_CREATED_TYPEDARRAY_OBJECT_WHICH_WAS_TOO_SMALL_LENGTH
        );
      }
    }
    if (isNativeBigIntTypedArray(target)) {
      throw NativeTypeError(CANNOT_MIX_BIGINT_AND_OTHER_TYPES);
    }
  }
  function getFloat16BitsArray(float16) {
    const float16bitsArray = WeakMapPrototypeGet(float16bitsArrays, float16);
    if (float16bitsArray !== void 0) {
      const buffer3 = TypedArrayPrototypeGetBuffer(float16bitsArray);
      if (IsDetachedBuffer(buffer3)) {
        throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
      }
      return float16bitsArray;
    }
    const buffer2 = float16.buffer;
    if (IsDetachedBuffer(buffer2)) {
      throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
    }
    const cloned = ReflectConstruct(Float16Array, [
      buffer2,
      float16.byteOffset,
      float16.length
    ], float16.constructor);
    return WeakMapPrototypeGet(float16bitsArrays, cloned);
  }
  function copyToArray(float16bitsArray) {
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const array = [];
    for (let i = 0; i < length; ++i) {
      array[i] = convertToNumber(float16bitsArray[i]);
    }
    return array;
  }
  var TypedArrayPrototypeGetters = new NativeWeakSet();
  for (const key of ReflectOwnKeys(TypedArrayPrototype)) {
    if (key === SymbolToStringTag) {
      continue;
    }
    const descriptor = ReflectGetOwnPropertyDescriptor(TypedArrayPrototype, key);
    if (ObjectHasOwn(descriptor, "get") && typeof descriptor.get === "function") {
      WeakSetPrototypeAdd(TypedArrayPrototypeGetters, descriptor.get);
    }
  }
  var handler = ObjectFreeze({
    get(target, key, receiver) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key)) {
        return convertToNumber(ReflectGet(target, key));
      }
      if (WeakSetPrototypeHas(TypedArrayPrototypeGetters, ObjectPrototype__lookupGetter__(target, key))) {
        return ReflectGet(target, key);
      }
      return ReflectGet(target, key, receiver);
    },
    set(target, key, value, receiver) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key)) {
        return ReflectSet(target, key, roundToFloat16Bits(value));
      }
      return ReflectSet(target, key, value, receiver);
    },
    getOwnPropertyDescriptor(target, key) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key)) {
        const descriptor = ReflectGetOwnPropertyDescriptor(target, key);
        descriptor.value = convertToNumber(descriptor.value);
        return descriptor;
      }
      return ReflectGetOwnPropertyDescriptor(target, key);
    },
    defineProperty(target, key, descriptor) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key) && ObjectHasOwn(descriptor, "value")) {
        descriptor.value = roundToFloat16Bits(descriptor.value);
        return ReflectDefineProperty(target, key, descriptor);
      }
      return ReflectDefineProperty(target, key, descriptor);
    }
  });
  var Float16Array = class _Float16Array {
    constructor(input, _byteOffset, _length) {
      let float16bitsArray;
      if (isFloat16Array(input)) {
        float16bitsArray = ReflectConstruct(NativeUint16Array, [getFloat16BitsArray(input)], new.target);
      } else if (isObject2(input) && !isAnyArrayBuffer(input)) {
        let list;
        let length;
        if (isNativeTypedArray(input)) {
          list = input;
          length = TypedArrayPrototypeGetLength(input);
          const buffer2 = TypedArrayPrototypeGetBuffer(input);
          if (IsDetachedBuffer(buffer2)) {
            throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
          }
          if (isNativeBigIntTypedArray(input)) {
            throw NativeTypeError(CANNOT_MIX_BIGINT_AND_OTHER_TYPES);
          }
          const data = new NativeArrayBuffer(
            length * BYTES_PER_ELEMENT
          );
          float16bitsArray = ReflectConstruct(NativeUint16Array, [data], new.target);
        } else {
          const iterator = input[SymbolIterator];
          if (iterator != null && typeof iterator !== "function") {
            throw NativeTypeError(ITERATOR_PROPERTY_IS_NOT_CALLABLE);
          }
          if (iterator != null) {
            if (isOrdinaryArray(input)) {
              list = input;
              length = input.length;
            } else {
              list = [...input];
              length = list.length;
            }
          } else {
            list = input;
            length = ToLength(list.length);
          }
          float16bitsArray = ReflectConstruct(NativeUint16Array, [length], new.target);
        }
        for (let i = 0; i < length; ++i) {
          float16bitsArray[i] = roundToFloat16Bits(list[i]);
        }
      } else {
        float16bitsArray = ReflectConstruct(NativeUint16Array, arguments, new.target);
      }
      const proxy = new NativeProxy(float16bitsArray, handler);
      WeakMapPrototypeSet(float16bitsArrays, proxy, float16bitsArray);
      return proxy;
    }
    static from(src, ...opts) {
      const Constructor = this;
      if (!ReflectHas(Constructor, brand)) {
        throw NativeTypeError(
          THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY
        );
      }
      if (Constructor === _Float16Array) {
        if (isFloat16Array(src) && opts.length === 0) {
          const float16bitsArray = getFloat16BitsArray(src);
          const uint16 = new NativeUint16Array(
            TypedArrayPrototypeGetBuffer(float16bitsArray),
            TypedArrayPrototypeGetByteOffset(float16bitsArray),
            TypedArrayPrototypeGetLength(float16bitsArray)
          );
          return new _Float16Array(
            TypedArrayPrototypeGetBuffer(TypedArrayPrototypeSlice(uint16))
          );
        }
        if (opts.length === 0) {
          return new _Float16Array(
            TypedArrayPrototypeGetBuffer(
              Uint16ArrayFrom(src, roundToFloat16Bits)
            )
          );
        }
        const mapFunc = opts[0];
        const thisArg = opts[1];
        return new _Float16Array(
          TypedArrayPrototypeGetBuffer(
            Uint16ArrayFrom(src, function(val, ...args) {
              return roundToFloat16Bits(
                ReflectApply(mapFunc, this, [val, ...safeIfNeeded(args)])
              );
            }, thisArg)
          )
        );
      }
      let list;
      let length;
      const iterator = src[SymbolIterator];
      if (iterator != null && typeof iterator !== "function") {
        throw NativeTypeError(ITERATOR_PROPERTY_IS_NOT_CALLABLE);
      }
      if (iterator != null) {
        if (isOrdinaryArray(src)) {
          list = src;
          length = src.length;
        } else if (isOrdinaryNativeTypedArray(src)) {
          list = src;
          length = TypedArrayPrototypeGetLength(src);
        } else {
          list = [...src];
          length = list.length;
        }
      } else {
        if (src == null) {
          throw NativeTypeError(
            CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT
          );
        }
        list = NativeObject(src);
        length = ToLength(list.length);
      }
      const array = new Constructor(length);
      if (opts.length === 0) {
        for (let i = 0; i < length; ++i) {
          array[i] = list[i];
        }
      } else {
        const mapFunc = opts[0];
        const thisArg = opts[1];
        for (let i = 0; i < length; ++i) {
          array[i] = ReflectApply(mapFunc, thisArg, [list[i], i]);
        }
      }
      return array;
    }
    static of(...items) {
      const Constructor = this;
      if (!ReflectHas(Constructor, brand)) {
        throw NativeTypeError(
          THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY
        );
      }
      const length = items.length;
      if (Constructor === _Float16Array) {
        const proxy = new _Float16Array(length);
        const float16bitsArray = getFloat16BitsArray(proxy);
        for (let i = 0; i < length; ++i) {
          float16bitsArray[i] = roundToFloat16Bits(items[i]);
        }
        return proxy;
      }
      const array = new Constructor(length);
      for (let i = 0; i < length; ++i) {
        array[i] = items[i];
      }
      return array;
    }
    keys() {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      return TypedArrayPrototypeKeys(float16bitsArray);
    }
    values() {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      return wrap3((function* () {
        for (const val of TypedArrayPrototypeValues(float16bitsArray)) {
          yield convertToNumber(val);
        }
      })());
    }
    entries() {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      return wrap3((function* () {
        for (const [i, val] of TypedArrayPrototypeEntries(float16bitsArray)) {
          yield [i, convertToNumber(val)];
        }
      })());
    }
    at(index) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const relativeIndex = ToIntegerOrInfinity(index);
      const k = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
      if (k < 0 || k >= length) {
        return;
      }
      return convertToNumber(float16bitsArray[k]);
    }
    with(index, value) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const relativeIndex = ToIntegerOrInfinity(index);
      const k = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
      const number = +value;
      if (k < 0 || k >= length) {
        throw NativeRangeError(OFFSET_IS_OUT_OF_BOUNDS);
      }
      const uint16 = new NativeUint16Array(
        TypedArrayPrototypeGetBuffer(float16bitsArray),
        TypedArrayPrototypeGetByteOffset(float16bitsArray),
        TypedArrayPrototypeGetLength(float16bitsArray)
      );
      const cloned = new _Float16Array(
        TypedArrayPrototypeGetBuffer(
          TypedArrayPrototypeSlice(uint16)
        )
      );
      const array = getFloat16BitsArray(cloned);
      array[k] = roundToFloat16Bits(number);
      return cloned;
    }
    map(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
      if (Constructor === _Float16Array) {
        const proxy = new _Float16Array(length);
        const array2 = getFloat16BitsArray(proxy);
        for (let i = 0; i < length; ++i) {
          const val = convertToNumber(float16bitsArray[i]);
          array2[i] = roundToFloat16Bits(
            ReflectApply(callback, thisArg, [val, i, this])
          );
        }
        return proxy;
      }
      const array = new Constructor(length);
      assertSpeciesTypedArray(array, length);
      for (let i = 0; i < length; ++i) {
        const val = convertToNumber(float16bitsArray[i]);
        array[i] = ReflectApply(callback, thisArg, [val, i, this]);
      }
      return array;
    }
    filter(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      const kept = [];
      for (let i = 0; i < length; ++i) {
        const val = convertToNumber(float16bitsArray[i]);
        if (ReflectApply(callback, thisArg, [val, i, this])) {
          ArrayPrototypePush(kept, val);
        }
      }
      const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
      const array = new Constructor(kept);
      assertSpeciesTypedArray(array);
      return array;
    }
    reduce(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      if (length === 0 && opts.length === 0) {
        throw NativeTypeError(REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
      }
      let accumulator, start;
      if (opts.length === 0) {
        accumulator = convertToNumber(float16bitsArray[0]);
        start = 1;
      } else {
        accumulator = opts[0];
        start = 0;
      }
      for (let i = start; i < length; ++i) {
        accumulator = callback(
          accumulator,
          convertToNumber(float16bitsArray[i]),
          i,
          this
        );
      }
      return accumulator;
    }
    reduceRight(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      if (length === 0 && opts.length === 0) {
        throw NativeTypeError(REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
      }
      let accumulator, start;
      if (opts.length === 0) {
        accumulator = convertToNumber(float16bitsArray[length - 1]);
        start = length - 2;
      } else {
        accumulator = opts[0];
        start = length - 1;
      }
      for (let i = start; i >= 0; --i) {
        accumulator = callback(
          accumulator,
          convertToNumber(float16bitsArray[i]),
          i,
          this
        );
      }
      return accumulator;
    }
    forEach(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      for (let i = 0; i < length; ++i) {
        ReflectApply(callback, thisArg, [
          convertToNumber(float16bitsArray[i]),
          i,
          this
        ]);
      }
    }
    find(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      for (let i = 0; i < length; ++i) {
        const value = convertToNumber(float16bitsArray[i]);
        if (ReflectApply(callback, thisArg, [value, i, this])) {
          return value;
        }
      }
    }
    findIndex(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      for (let i = 0; i < length; ++i) {
        const value = convertToNumber(float16bitsArray[i]);
        if (ReflectApply(callback, thisArg, [value, i, this])) {
          return i;
        }
      }
      return -1;
    }
    findLast(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      for (let i = length - 1; i >= 0; --i) {
        const value = convertToNumber(float16bitsArray[i]);
        if (ReflectApply(callback, thisArg, [value, i, this])) {
          return value;
        }
      }
    }
    findLastIndex(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      for (let i = length - 1; i >= 0; --i) {
        const value = convertToNumber(float16bitsArray[i]);
        if (ReflectApply(callback, thisArg, [value, i, this])) {
          return i;
        }
      }
      return -1;
    }
    every(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      for (let i = 0; i < length; ++i) {
        if (!ReflectApply(callback, thisArg, [
          convertToNumber(float16bitsArray[i]),
          i,
          this
        ])) {
          return false;
        }
      }
      return true;
    }
    some(callback, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const thisArg = opts[0];
      for (let i = 0; i < length; ++i) {
        if (ReflectApply(callback, thisArg, [
          convertToNumber(float16bitsArray[i]),
          i,
          this
        ])) {
          return true;
        }
      }
      return false;
    }
    set(input, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const targetOffset = ToIntegerOrInfinity(opts[0]);
      if (targetOffset < 0) {
        throw NativeRangeError(OFFSET_IS_OUT_OF_BOUNDS);
      }
      if (input == null) {
        throw NativeTypeError(
          CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT
        );
      }
      if (isNativeBigIntTypedArray(input)) {
        throw NativeTypeError(
          CANNOT_MIX_BIGINT_AND_OTHER_TYPES
        );
      }
      if (isFloat16Array(input)) {
        return TypedArrayPrototypeSet(
          getFloat16BitsArray(this),
          getFloat16BitsArray(input),
          targetOffset
        );
      }
      if (isNativeTypedArray(input)) {
        const buffer2 = TypedArrayPrototypeGetBuffer(input);
        if (IsDetachedBuffer(buffer2)) {
          throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
        }
      }
      const targetLength = TypedArrayPrototypeGetLength(float16bitsArray);
      const src = NativeObject(input);
      const srcLength = ToLength(src.length);
      if (targetOffset === Infinity || srcLength + targetOffset > targetLength) {
        throw NativeRangeError(OFFSET_IS_OUT_OF_BOUNDS);
      }
      for (let i = 0; i < srcLength; ++i) {
        float16bitsArray[i + targetOffset] = roundToFloat16Bits(src[i]);
      }
    }
    reverse() {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      TypedArrayPrototypeReverse(float16bitsArray);
      return this;
    }
    toReversed() {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const uint16 = new NativeUint16Array(
        TypedArrayPrototypeGetBuffer(float16bitsArray),
        TypedArrayPrototypeGetByteOffset(float16bitsArray),
        TypedArrayPrototypeGetLength(float16bitsArray)
      );
      const cloned = new _Float16Array(
        TypedArrayPrototypeGetBuffer(
          TypedArrayPrototypeSlice(uint16)
        )
      );
      const clonedFloat16bitsArray = getFloat16BitsArray(cloned);
      TypedArrayPrototypeReverse(clonedFloat16bitsArray);
      return cloned;
    }
    fill(value, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      TypedArrayPrototypeFill(
        float16bitsArray,
        roundToFloat16Bits(value),
        ...safeIfNeeded(opts)
      );
      return this;
    }
    copyWithin(target, start, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      TypedArrayPrototypeCopyWithin(float16bitsArray, target, start, ...safeIfNeeded(opts));
      return this;
    }
    sort(compareFn) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const sortCompare = compareFn !== void 0 ? compareFn : defaultCompare;
      TypedArrayPrototypeSort(float16bitsArray, (x, y) => {
        return sortCompare(convertToNumber(x), convertToNumber(y));
      });
      return this;
    }
    toSorted(compareFn) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      if (compareFn !== void 0 && typeof compareFn !== "function") {
        throw new NativeTypeError(THE_COMPARISON_FUNCTION_MUST_BE_EITHER_A_FUNCTION_OR_UNDEFINED);
      }
      const sortCompare = compareFn !== void 0 ? compareFn : defaultCompare;
      const uint16 = new NativeUint16Array(
        TypedArrayPrototypeGetBuffer(float16bitsArray),
        TypedArrayPrototypeGetByteOffset(float16bitsArray),
        TypedArrayPrototypeGetLength(float16bitsArray)
      );
      const cloned = new _Float16Array(
        TypedArrayPrototypeGetBuffer(
          TypedArrayPrototypeSlice(uint16)
        )
      );
      const clonedFloat16bitsArray = getFloat16BitsArray(cloned);
      TypedArrayPrototypeSort(clonedFloat16bitsArray, (x, y) => {
        return sortCompare(convertToNumber(x), convertToNumber(y));
      });
      return cloned;
    }
    slice(start, end) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
      if (Constructor === _Float16Array) {
        const uint16 = new NativeUint16Array(
          TypedArrayPrototypeGetBuffer(float16bitsArray),
          TypedArrayPrototypeGetByteOffset(float16bitsArray),
          TypedArrayPrototypeGetLength(float16bitsArray)
        );
        return new _Float16Array(
          TypedArrayPrototypeGetBuffer(
            TypedArrayPrototypeSlice(uint16, start, end)
          )
        );
      }
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      const relativeStart = ToIntegerOrInfinity(start);
      const relativeEnd = end === void 0 ? length : ToIntegerOrInfinity(end);
      let k;
      if (relativeStart === -Infinity) {
        k = 0;
      } else if (relativeStart < 0) {
        k = length + relativeStart > 0 ? length + relativeStart : 0;
      } else {
        k = length < relativeStart ? length : relativeStart;
      }
      let final;
      if (relativeEnd === -Infinity) {
        final = 0;
      } else if (relativeEnd < 0) {
        final = length + relativeEnd > 0 ? length + relativeEnd : 0;
      } else {
        final = length < relativeEnd ? length : relativeEnd;
      }
      const count = final - k > 0 ? final - k : 0;
      const array = new Constructor(count);
      assertSpeciesTypedArray(array, count);
      if (count === 0) {
        return array;
      }
      const buffer2 = TypedArrayPrototypeGetBuffer(float16bitsArray);
      if (IsDetachedBuffer(buffer2)) {
        throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
      }
      let n = 0;
      while (k < final) {
        array[n] = convertToNumber(float16bitsArray[k]);
        ++k;
        ++n;
      }
      return array;
    }
    subarray(begin, end) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
      const uint16 = new NativeUint16Array(
        TypedArrayPrototypeGetBuffer(float16bitsArray),
        TypedArrayPrototypeGetByteOffset(float16bitsArray),
        TypedArrayPrototypeGetLength(float16bitsArray)
      );
      const uint16Subarray = TypedArrayPrototypeSubarray(uint16, begin, end);
      const array = new Constructor(
        TypedArrayPrototypeGetBuffer(uint16Subarray),
        TypedArrayPrototypeGetByteOffset(uint16Subarray),
        TypedArrayPrototypeGetLength(uint16Subarray)
      );
      assertSpeciesTypedArray(array);
      return array;
    }
    indexOf(element, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      let from = ToIntegerOrInfinity(opts[0]);
      if (from === Infinity) {
        return -1;
      }
      if (from < 0) {
        from += length;
        if (from < 0) {
          from = 0;
        }
      }
      for (let i = from; i < length; ++i) {
        if (ObjectHasOwn(float16bitsArray, i) && convertToNumber(float16bitsArray[i]) === element) {
          return i;
        }
      }
      return -1;
    }
    lastIndexOf(element, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      let from = opts.length >= 1 ? ToIntegerOrInfinity(opts[0]) : length - 1;
      if (from === -Infinity) {
        return -1;
      }
      if (from >= 0) {
        from = from < length - 1 ? from : length - 1;
      } else {
        from += length;
      }
      for (let i = from; i >= 0; --i) {
        if (ObjectHasOwn(float16bitsArray, i) && convertToNumber(float16bitsArray[i]) === element) {
          return i;
        }
      }
      return -1;
    }
    includes(element, ...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const length = TypedArrayPrototypeGetLength(float16bitsArray);
      let from = ToIntegerOrInfinity(opts[0]);
      if (from === Infinity) {
        return false;
      }
      if (from < 0) {
        from += length;
        if (from < 0) {
          from = 0;
        }
      }
      const isNaN2 = NumberIsNaN(element);
      for (let i = from; i < length; ++i) {
        const value = convertToNumber(float16bitsArray[i]);
        if (isNaN2 && NumberIsNaN(value)) {
          return true;
        }
        if (value === element) {
          return true;
        }
      }
      return false;
    }
    join(separator) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const array = copyToArray(float16bitsArray);
      return ArrayPrototypeJoin(array, separator);
    }
    toLocaleString(...opts) {
      assertFloat16Array(this);
      const float16bitsArray = getFloat16BitsArray(this);
      const array = copyToArray(float16bitsArray);
      return ArrayPrototypeToLocaleString(array, ...safeIfNeeded(opts));
    }
    get [SymbolToStringTag]() {
      if (isFloat16Array(this)) {
        return "Float16Array";
      }
    }
  };
  ObjectDefineProperty(Float16Array, "BYTES_PER_ELEMENT", {
    value: BYTES_PER_ELEMENT
  });
  ObjectDefineProperty(Float16Array, brand, {});
  ReflectSetPrototypeOf(Float16Array, TypedArray);
  var Float16ArrayPrototype = Float16Array.prototype;
  ObjectDefineProperty(Float16ArrayPrototype, "BYTES_PER_ELEMENT", {
    value: BYTES_PER_ELEMENT
  });
  ObjectDefineProperty(Float16ArrayPrototype, SymbolIterator, {
    value: Float16ArrayPrototype.values,
    writable: true,
    configurable: true
  });
  ReflectSetPrototypeOf(Float16ArrayPrototype, TypedArrayPrototype);

  // source/js/shader/rd-compute-shader.js
  init_define_import_meta_env();
  var kernelSize = 3;
  var workgroupSize = [8, 8];
  var tileSize = [2, 2];
  var cacheSize = [
    tileSize[0] * workgroupSize[0],
    // 16
    tileSize[1] * workgroupSize[1]
    // 16
  ];
  var dispatchSize = [
    cacheSize[0] - (kernelSize - 1),
    // 14
    cacheSize[1] - (kernelSize - 1)
    // 14
  ];
  var ReactionDiffusionShaderDispatchSize = dispatchSize;
  var ReactionDiffusionComputeShader = `

const kernelSize = ${kernelSize};
const dispatchSize = vec2u(${dispatchSize[0]},${dispatchSize[1]});
const tileSize = vec2u(${tileSize[0]},${tileSize[1]});
const laplacian: array<f32, 9> = array(
    0.05, 0.20, 0.05,
    0.20, -1.0, 0.20,
    0.05, 0.20, 0.05,
);

struct AnimationUniforms {
   pulse: f32,
   pointerVelocity: vec2f,
   pointerPos: vec2f
};

@group(0) @binding(0) var inputTex: texture_2d<f32>;
@group(0) @binding(1) var outputTex: texture_storage_2d<rgba16float, write>;
@group(0) @binding(2) var seedTex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> animationUniforms: AnimationUniforms;

// based on: https://community.khronos.org/t/manual-bilinear-filter/58504
fn texture2D_bilinear(t: texture_2d<f32>, coord: vec2f, dims: vec2u) -> vec4f {
    let f: vec2f = fract(coord);
    let sample: vec2u = vec2u(coord + (0.5 - f));
    let tl: vec4f = textureLoad(t, clamp(sample, vec2u(1, 1), dims), 0);
    let tr: vec4f = textureLoad(t, clamp(sample + vec2u(1, 0), vec2u(1, 1), dims), 0);
    let bl: vec4f = textureLoad(t, clamp(sample + vec2u(0, 1), vec2u(1, 1), dims), 0);
    let br: vec4f = textureLoad(t, clamp(sample + vec2u(1, 1), vec2u(1, 1), dims), 0);
    let tA: vec4f = mix(tl, tr, f.x);
    let tB: vec4f = mix(bl, br, f.x);
    return mix(tA, tB, f.y);
}

// the cache for the texture lookups (tileSize * workgroupSize).
// each thread adds a tile of pixels to the workgroups shared memory
var<workgroup> cache: array<array<vec4f, ${cacheSize[0]}>, ${cacheSize[1]}>;

@compute @workgroup_size(${workgroupSize[0]}, ${workgroupSize[1]}, 1)
fn compute_main(
  @builtin(workgroup_id) workGroupID : vec3<u32>,
  @builtin(local_invocation_id) localInvocationID : vec3<u32>,
  @builtin(global_invocation_id) globalInvocationID : vec3<u32>
) {
  // the kernel offset (number of pixels next to the center of the kernel) defines
  // the border area next to the dispatched (=work) area that has to be included
  // within the pixel cache
  let kernelOffset: vec2u = vec2((kernelSize - 1) / 2);

  // the local pixel offset of this threads tile (the tile inside the workgroup)
  let tileOffset: vec2u = localInvocationID.xy * tileSize;

  // the global pixel offset of the workgroup
  let dispatchOffset: vec2u = workGroupID.xy * dispatchSize;

  // get texture dimensions
  let dims: vec2u = vec2<u32>(textureDimensions(inputTex, 0));
  let aspectFactor: vec2f = vec2f(dims) / f32(max(dims.x, dims.y));

  // add the pixels of this thread's tiles to the cache
  for (var c=0u; c<tileSize.x; c++) {
    for (var r=0u; r<tileSize.y; r++) {
      let local: vec2u = vec2u(c, r) + tileOffset;

      // subtract the kernel offset to include the border pixels needed
      // for the convolution of the kernel within the dispatch (work) area
      var sample: vec2u = dispatchOffset + local - kernelOffset;
      
      // clamp to edges
      sample.x = clamp(sample.x, 1, u32(dims.x));
      sample.y = clamp(sample.y, 1, u32(dims.y));
      
      // convert to uv space
      var sampleCoord: vec2f = vec2f(sample);
      var sampleUv: vec2f = sampleCoord / vec2f(dims);
      
      // move the sample away from the center (center pulse motion)
      sampleCoord -= (sampleUv * 2. - 1.) * 0.01 * (2. * animationUniforms.pulse + 2. + 1.5);
      
      // move the sample by the pointer velocity
      let st = ((sampleUv * 2. - 1.) * aspectFactor) * .5 + .5;
      let pointerPos = (animationUniforms.pointerPos * aspectFactor) * .5 + .5;
      var pointerMask = smoothstep(0.6, 1., 1. - min(1., (distance(st, pointerPos))));
      sampleCoord -= animationUniforms.pointerVelocity * 2.5 * pointerMask;
      
      // perform manual bilinear sampling of the input texture
      let input: vec4f = texture2D_bilinear(inputTex, sampleCoord, dims);
      
      // create the combined value: R = chemical A, G = chemical B, B = seed value (clock text)
      var value: vec4f = vec4f(input.rg, vec2f(0.));
      let seed: vec4f = textureLoad(seedTex, sample, 0);
      value.b = seed.r;
      
      cache[local.y][local.x] = value;
    }
  }

  workgroupBarrier();

  // global pixel bounds within the application of the kernel is valid
  let bounds: vec4u = vec4u(
    dispatchOffset,
    min(dims, dispatchOffset + dispatchSize)
  );

  // perform reaction diffusion for every pixel of this tile
  for (var c=0u; c<tileSize.x; c++) {
    for (var r=0u; r<tileSize.y; r++) {
      let local: vec2u = vec2u(c, r) + tileOffset;
      let sample: vec2u = dispatchOffset + local - kernelOffset;

      // only apply the kernel to pixels for which we have all
      // necessary pixels in the cache
      if (all(sample >= bounds.xy) && all(sample < bounds.zw)) {
      
        // get centered uv coords
        let uv: vec2f = (2. * vec2f(sample) / vec2f(dims)) - 1.;

        // convolution with laplacian kernel
        var lap = vec2f(0);
        let ks: i32 = i32(kernelSize);
        for (var x = 0; x < ks; x++) {
          for (var y = 0; y < ks; y++) {
            var i = vec2i(local) + vec2(x, y) - vec2i(kernelOffset);
            lap += cache[i.y][i.x].xy * laplacian[y * ks + x];
          }
        }
        
        // create a pointer mask value to influence the dB value
        var st = (uv * aspectFactor) * .5 + .5;
        let pointerPos = (animationUniforms.pointerPos * aspectFactor) * .5 + .5;
        var pointerMask = smoothstep(0.6, 1., 1. - min(1., (distance(st, pointerPos))));
        pointerMask = pointerMask * length(animationUniforms.pointerVelocity) * 30.;
        
        // the dA and dB values are also influenced by the horizontal or vertical distance from the center
        let dist = mix(dot(uv.xx, uv.xx), dot(uv.yy, uv.yy), step(1.4, f32(dims.x) / f32(dims.y)));

        // reaction diffusion parameters
        let cacheValue: vec4f = cache[local.y][local.x];
        let dA = 1. - dist * .15;
        var dB = .25 + dist * 0.1;
        dB = dB + 0.1 * (animationUniforms.pulse * .5 + .5); // apply pulse motion
        dB = dB - min(0.15, 0.2 * pointerMask); // apply pointer mask
        dB = max(0.1, dB); // prevent instable values
        let feed = 0.065;
        var kill = 0.06;
        // increase the kill param in the areas covered by the clock letters
        kill = kill + cacheValue.b * .05 * (animationUniforms.pulse * .3 + .7);
        
        // reaction diffusion calculation
        let rd0 = cacheValue.xy;
        let A = rd0.x;
        let B = rd0.y;
        let reaction = A * B * B;
        let rd = vec2f(
          A + (dA * lap.x - reaction + feed * (1. - A)),
          B + (dB * lap.y + reaction - (kill + feed) * B),
        );

        textureStore(outputTex, sample, vec4(rd, 0., 1.0));
      }
    }
  }
}
`;

  // source/js/rd-compute.js
  var ReactionDiffusionCompute = class {
    // these are the iterations of the simulation during one frame (the more iterations, the faster the simulation)
    ITERATIONS = 10;
    // this is the scaling factor for the simulation textures (one quarter the size of the canvas)
    SCALE = 0.25;
    // interaction data
    pointer = {
      position: [0, 0],
      followerPosition: void 0,
      followerVelocity: [0, 0]
    };
    constructor(device2, viewportSize2) {
      this.device = device2;
      const module = this.device.createShaderModule({ code: ReactionDiffusionComputeShader });
      const defs = makeShaderDataDefinitions(ReactionDiffusionComputeShader);
      const pipelineDescriptor = {
        compute: {
          module,
          entryPoint: "compute_main"
        }
      };
      const descriptors = makeBindGroupLayoutDescriptors(defs, pipelineDescriptor);
      descriptors[0].entries.push({
        binding: 1,
        storageTexture: { access: "write-only", format: "rgba16float" },
        visibility: GPUShaderStage.COMPUTE
      });
      this.bindGroupLayout = this.device.createBindGroupLayout(descriptors[0]);
      const pipelineLayout = this.device.createPipelineLayout({
        bindGroupLayouts: [this.bindGroupLayout]
      });
      this.pipeline = this.device.createComputePipeline({
        label: "reaction diffusion compute pipeline",
        layout: pipelineLayout,
        ...pipelineDescriptor
      });
      const animationUniformView = makeStructuredView(defs.uniforms.animationUniforms);
      this.animationUniform = {
        view: animationUniformView,
        buffer: this.device.createBuffer({
          size: animationUniformView.arrayBuffer.byteLength,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
      };
      this.initEvents();
      this.resize(viewportSize2[0], viewportSize2[1]);
    }
    initEvents() {
      document.body.addEventListener("pointerdown", (e) => {
        this.pointer.position = this.getNormalizedPointerCoords(e.clientX, e.clientY);
        this.pointer.followerPosition = [...this.pointer.position];
      });
      document.body.addEventListener("pointermove", (e) => {
        this.pointer.position = this.getNormalizedPointerCoords(e.clientX, e.clientY);
        if (!this.pointer.followerPosition) this.pointer.followerPosition = [...this.pointer.position];
      });
    }
    resize(width, height) {
      this.width = Math.round(width * this.SCALE);
      this.height = Math.round(height * this.SCALE);
      this.aspect = this.width / this.height;
      this.inputCanvas = document.createElement("canvas");
      this.inputCanvas.width = this.width;
      this.inputCanvas.height = this.height;
      this.fontSize = Math.max(this.aspect > 1 ? 70 : 80, Math.min(this.inputCanvas.width, this.inputCanvas.height) / 3.75);
      this.inputContext = this.inputCanvas.getContext("2d", { willReadFrequently: true });
      this.inputContext.font = `${this.fontSize}px "Syne Mono"`;
      this.letterWidth = this.inputContext.measureText("0").width;
      this.letterHeight = this.inputContext.measureText("0").actualBoundingBoxAscent;
      this.createTextures(this.width, this.height);
      this.createBindGroups();
    }
    get resultStorageTexture() {
      return this.swapTextures[0];
    }
    createTextures(width, height) {
      if (this.swapTextures) {
        this.swapTextures.forEach((texture) => texture.destroy());
        this.seedTexture.destroy();
      }
      this.seedTexture = this.device.createTexture({
        size: { width, height },
        format: "rgba8unorm",
        usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING
      });
      this.swapTextures = new Array(2).fill(null).map((v, ndx) => {
        const texture = this.device.createTexture({
          size: { width, height },
          format: "rgba16float",
          usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT
        });
        if (ndx === 0) {
          const imgData = this.drawTime(true);
          const imgNormRGBA = Array.from(imgData.data).map((v2) => v2 / 255);
          const data = new Float16Array(imgNormRGBA);
          this.device.queue.writeTexture({ texture }, data.buffer, { bytesPerRow: width * 8 }, { width, height });
        } else {
          const data = new Float16Array(new Array(width * height * 4).fill(0));
          this.device.queue.writeTexture({ texture }, data.buffer, { bytesPerRow: width * 8 }, { width, height });
        }
        return texture;
      });
      this.dispatches = [
        Math.ceil(width / ReactionDiffusionShaderDispatchSize[0]),
        Math.ceil(height / ReactionDiffusionShaderDispatchSize[1])
      ];
    }
    drawTime(init6 = false) {
      const ctx = this.inputContext;
      ctx.resetTransform();
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.scale(1, 1);
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = init6 ? "#0f0" : "rgba(0, 0, 0, 0)";
      ctx.fill();
      ctx.translate(this.width / 2, this.height / 2);
      ctx.scale(1, -1);
      ctx.fillStyle = "#f00";
      const now = /* @__PURE__ */ new Date();
      if (this.aspect > 1.4) {
        ctx.fillText(
          `${now.getHours().toString(10).padStart(2, "0")}:${now.getMinutes().toString(10).padStart(2, "0")}:${now.getSeconds().toString(10).padStart(2, "0")}`,
          -this.letterWidth * 4,
          +this.letterHeight * 0.5
        );
      } else {
        const lineHeight = 1.25;
        const x = -this.letterWidth;
        const y = -this.letterHeight * 0.5 + this.letterHeight * (1 - lineHeight);
        const rowHeight = this.letterHeight * lineHeight;
        ctx.fillText(
          `${now.getHours().toString(10).padStart(2, "0")}`,
          x,
          y
        );
        ctx.fillText(
          `${now.getMinutes().toString(10).padStart(2, "0")}`,
          x,
          y + rowHeight
        );
        ctx.fillText(
          `${now.getSeconds().toString(10).padStart(2, "0")}`,
          x,
          y + rowHeight * 2
        );
      }
      this.lastTime = init6 ? void 0 : now;
      return this.inputContext.getImageData(0, 0, this.width, this.height);
    }
    createBindGroups() {
      this.swapBindGroups = [
        this.device.createBindGroup({
          layout: this.bindGroupLayout,
          entries: [
            { binding: 0, resource: this.swapTextures[0].createView() },
            { binding: 1, resource: this.swapTextures[1].createView() },
            { binding: 2, resource: this.seedTexture.createView() },
            { binding: 3, resource: { buffer: this.animationUniform.buffer } }
          ]
        }),
        this.device.createBindGroup({
          layout: this.bindGroupLayout,
          entries: [
            { binding: 0, resource: this.swapTextures[1].createView() },
            { binding: 1, resource: this.swapTextures[0].createView() },
            { binding: 2, resource: this.seedTexture.createView() },
            { binding: 3, resource: { buffer: this.animationUniform.buffer } }
          ]
        })
      ];
    }
    compute(computePassEncoder, pulse) {
      this.animatePointer();
      this.animationUniform.view.set({ pulse });
      this.animationUniform.view.set({ pointerVelocity: this.pointer.followerVelocity });
      this.animationUniform.view.set({ pointerPos: this.pointer.followerPosition ? this.pointer.followerPosition : [0, 0] });
      this.device.queue.writeBuffer(this.animationUniform.buffer, 0, this.animationUniform.view.arrayBuffer);
      computePassEncoder.setPipeline(this.pipeline);
      if (!this.lastTime || this.lastTime.getSeconds() !== (/* @__PURE__ */ new Date()).getSeconds()) {
        const imgData = this.drawTime();
        const seedData = new Uint8Array(Array.from(imgData.data));
        this.device.queue.writeTexture({ texture: this.seedTexture }, seedData.buffer, { bytesPerRow: this.width * 4 }, { width: this.width, height: this.height });
      }
      for (let i = 0; i < this.ITERATIONS; i++) {
        computePassEncoder.setBindGroup(0, this.swapBindGroups[0]);
        computePassEncoder.dispatchWorkgroups(this.dispatches[0], this.dispatches[1]);
        computePassEncoder.setBindGroup(0, this.swapBindGroups[1]);
        computePassEncoder.dispatchWorkgroups(this.dispatches[0], this.dispatches[1]);
      }
    }
    animatePointer() {
      if (!this.pointer.followerPosition) return;
      const prevPointerFollower = [...this.pointer.followerPosition];
      this.pointer.followerPosition[0] += (this.pointer.position[0] - this.pointer.followerPosition[0]) / 18;
      this.pointer.followerPosition[1] += (this.pointer.position[1] - this.pointer.followerPosition[1]) / 18;
      this.pointer.followerVelocity[0] = this.pointer.followerPosition[0] - prevPointerFollower[0];
      this.pointer.followerVelocity[1] = this.pointer.followerPosition[1] - prevPointerFollower[1];
    }
    getNormalizedPointerCoords(clientX, clientY) {
      return [
        clientX / window.innerWidth * 2 - 1,
        (1 - clientY / window.innerHeight) * 2 - 1
      ];
    }
  };

  // source/js/composite.js
  init_define_import_meta_env();

  // source/js/shader/composite-shader.js
  init_define_import_meta_env();
  var CompositeShader = `
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f
}

struct AnimationUniforms {
   pulse: f32,
};

@group(0) @binding(0) var<uniform> animationUniforms: AnimationUniforms;

@vertex
fn vertex_main(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
    const pos : array<vec2f, 3> = array(
        vec2f(-1, 3),
        vec2f(-1, -1),
        vec2f(3, -1)
    );
    const uv : array<vec2f, 3> = array(
        vec2f(0, 2),
        vec2f(0, 0),
        vec2f(2, 0)
    );
    var output : VertexOutput;
    output.position = vec4f(pos[vertexIndex], 0., 1.);
    output.uv = uv[vertexIndex];
    return output;
}

@group(0) @binding(1) var inputTexSampler : sampler;
@group(0) @binding(2) var inputTex : texture_2d<f32>;

// https://iquilezles.org/articles/palettes/
fn pal(t: f32, a: vec3<f32>, b: vec3<f32>, c: vec3<f32>, d: vec3<f32>) -> vec3<f32> {
    return a + b * cos(6.28318 * (c * t + d));
}

// Bulge distortion based on: https://www.shadertoy.com/view/ldBfRV
fn distort(r: vec2<f32>, alpha: f32) -> vec2<f32> {
    return r + r * -alpha * (1. - dot(r, r) * 1.25);
}

fn emboss(
    p: vec2f,
    channel: vec4f,
    center: vec4f,
    tex: texture_2d<f32>, 
    texSampler: sampler,
    texelSize: vec2f,
    scale: f32,
    shift: f32) -> vec4f
{
    let tlColor: vec4f = textureSample(tex, texSampler, p + vec2(-texelSize.x,  texelSize.y) * scale);
    let brColor: vec4f = textureSample(tex, texSampler, p + vec2(texelSize.x,  -texelSize.y) * scale);
    let c: f32 = smoothstep(0., shift, dot(center, channel));
    let tl: f32 = smoothstep(0., shift, dot(tlColor, channel));
    let br: f32 = smoothstep(0., shift, dot(brColor, channel));
    return vec4f(tl, c, br, clamp(2.0 * br - c - tl, 0.0, 1.0));
}

@fragment
fn frag_main(@location(0) uv : vec2f) -> @location(0) vec4f {

    // add bulge distortion to the uv coords
    let p = distort(uv * 2. - 1., -0.15) * .5 + .5;
    
    // get input data
    let inputTexSize : vec2f = vec2f(textureDimensions(inputTex));
    let inputTexelSize = 1. / inputTexSize;
    let input: vec4f = textureSample(inputTex, inputTexSampler, p);
    
    // use the chemical B distribution as the base color value
    let value = smoothstep(0.225, .8, input.g);
    var base: vec3f = pal(value * .4 + 0.4, vec3(.5,0.5,0.5), vec3(0.5,0.5,.5), vec3(1.,1.0,1.0), vec3(0.05,0.1,0.2));
    base *= 1.5 * ((animationUniforms.pulse) * .15 + .85);
    
    // get centered uv coords and distance to center
    let st = uv * 2. - 1.;
    let dist = length(st);
    
    // inner emboss effect
    var emboss1: vec4f = emboss(p, vec4(1., 0., 0., 0.), input, inputTex, inputTexSampler, inputTexelSize, .5, .4 + dist * .3);
    emboss1.w = emboss1.w * .3 * (animationUniforms.pulse * .2 + .8);
    
    // inner specular from emboss data
    let specular = smoothstep(0.2, 0.3, 2.0 * emboss1.x - emboss1.y - emboss1.z) * .5 * (1. - dist) * ((1. - animationUniforms.pulse) * .15 + .85);
    
    // outer emboss for iridescence
    var emboss2: vec4f = emboss(p, vec4(0., 1., 0., 0.), input, inputTex, inputTexSampler, inputTexelSize, .8, .1);
    var iridescence = pal(input.r * 5. + .2, vec3(.5,0.5,0.5), vec3(0.5,0.5,.5), vec3(1.,1.0,1.0),vec3(0.0,0.33,0.67));
    iridescence = mix(iridescence, vec3f(0.), smoothstep(0., .4, max(input.g, emboss2.w)));
    iridescence *= .07 * ((1. - animationUniforms.pulse) * .2 + .8);
    
    // simple centered vignette
    let vignette = dist * .075;
    
    var color: vec4f = vec4f(base + vec3(emboss1.w) + specular + iridescence - vignette, 1.);
    
    return color;
}
`;

  // source/js/composite.js
  var Composite = class {
    constructor(device2, reactionDiffusion2) {
      this.device = device2;
      this.reactionDiffusion = reactionDiffusion2;
      const module = device2.createShaderModule({ code: CompositeShader });
      const defs = makeShaderDataDefinitions(CompositeShader);
      const pipelineLayout = {
        vertex: {
          module,
          entryPoint: "vertex_main"
        },
        fragment: {
          module,
          entryPoint: "frag_main",
          targets: [
            { format: navigator.gpu.getPreferredCanvasFormat() }
          ]
        },
        primitive: {
          topology: "triangle-list"
        }
      };
      const descriptors = makeBindGroupLayoutDescriptors(defs, pipelineLayout);
      const bindGroupLayout = device2.createBindGroupLayout(descriptors[0]);
      const animationUniformView = makeStructuredView(defs.uniforms.animationUniforms);
      this.animationUniform = {
        view: animationUniformView,
        buffer: this.device.createBuffer({
          size: animationUniformView.arrayBuffer.byteLength,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
      };
      this.sampler = device2.createSampler({
        minFilter: "linear",
        magFilter: "linear"
      });
      this.bindGroupLayouts = [bindGroupLayout];
      this.pipeline = device2.createRenderPipeline({
        label: "composite pipeline",
        layout: device2.createPipelineLayout({
          bindGroupLayouts: [bindGroupLayout]
        }),
        ...pipelineLayout
      });
      this.resize();
    }
    resize() {
      this.createBindGroups();
    }
    render(renderPassEncoder, pulse) {
      this.animationUniform.view.set({ pulse });
      this.device.queue.writeBuffer(this.animationUniform.buffer, 0, this.animationUniform.view.arrayBuffer);
      renderPassEncoder.setPipeline(this.pipeline);
      renderPassEncoder.setBindGroup(0, this.bindGroup);
      renderPassEncoder.draw(3);
    }
    createBindGroups() {
      this.bindGroup = this.device.createBindGroup({
        layout: this.bindGroupLayouts[0],
        entries: [
          { binding: 0, resource: { buffer: this.animationUniform.buffer } },
          { binding: 1, resource: this.sampler },
          { binding: 2, resource: this.reactionDiffusion.resultStorageTexture.createView() }
        ]
      });
    }
  };

  // source/js/main.js
  var hasWebGPU = !!navigator.gpu;
  var canvas;
  var device;
  var webGPUContext;
  var viewportSize;
  var timeMS = 0;
  var reactionDiffusion;
  var composite;
  async function init5() {
    if (!hasWebGPU) {
      const noWebGPUMessage = document.querySelector("#no-webgpu");
      noWebGPUMessage.style.display = "";
      return;
    }
    const format = navigator.gpu.getPreferredCanvasFormat();
    const adapter = await navigator.gpu?.requestAdapter();
    device = await adapter?.requestDevice();
    canvas = document.getElementById("viewport");
    webGPUContext = canvas.getContext("webgpu");
    webGPUContext.configure({ device, format });
    updateViewportSize();
    reactionDiffusion = new ReactionDiffusionCompute(device, viewportSize);
    composite = new Composite(device, reactionDiffusion);
    const observer = new ResizeObserver(() => resize());
    observer.observe(canvas);
    run(0);
  }
  function updateViewportSize() {
    const pixelRatio = Math.min(2, window.devicePixelRatio);
    viewportSize = [
      Math.max(1, Math.min(window.innerWidth * pixelRatio, device.limits.maxTextureDimension2D)),
      Math.max(1, Math.min(window.innerHeight * pixelRatio, device.limits.maxTextureDimension2D))
    ];
  }
  function resize() {
    updateViewportSize();
    canvas.width = viewportSize[0];
    canvas.height = viewportSize[1];
    reactionDiffusion.resize(viewportSize[0], viewportSize[1]);
    composite.resize();
  }
  function run(t) {
    timeMS += Math.min(32, t);
    const dateTimeMS = (/* @__PURE__ */ new Date()).getTime() + 800;
    const pulse = Math.sin(2 * Math.PI * dateTimeMS * 1e-3);
    const commandEncoder = device.createCommandEncoder();
    const computePassEncoder = commandEncoder.beginComputePass(commandEncoder);
    reactionDiffusion.compute(computePassEncoder, pulse);
    computePassEncoder.end();
    const compositePassEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: webGPUContext.getCurrentTexture().createView(),
        clearValue: { r: 1, g: 1, b: 1, a: 1 },
        loadOp: "clear",
        storeOp: "store"
      }]
    });
    composite.render(compositePassEncoder, pulse);
    compositePassEncoder.end();
    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame((t2) => run(t2));
  }
  document.fonts.ready.then(() => init5());
})();
/*! @petamoriken/float16 v3.8.6 | MIT License - https://github.com/petamoriken/float16 */
/*! Bundled license information:

imagesloaded/imagesloaded.js:
  (*!
   * imagesLoaded v5.0.0
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollSmoother.js:
  (*!
   * ScrollSmoother 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/utils/matrix.js:
  (*!
   * matrix 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Flip.js:
  (*!
   * Flip 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/utils/paths.js:
  (*!
   * paths 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/MotionPathPlugin.js:
  (*!
   * MotionPathPlugin 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/SplitText.js:
  (*!
   * SplitText 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
   * @author: Jack Doyle
   *)
*/
