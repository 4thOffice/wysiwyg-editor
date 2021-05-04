/**
 * @license
 froala_editor v3.2.6-1 (https://www.froala.com/wysiwyg-editor)
 License https://froala.com/wysiwyg-editor/terms/
 Copyright 2014-2021 Froala Labs 
*/
'use strict';
!function (value, t) {
    if ("object" == typeof exports && "undefined" != typeof module) {
        module.exports = t();
    } else {
        if ("function" == typeof define && define.amd) {
            define(t);
        } else {
            value.FroalaEditor = t();
        }
    }
}(this, function () {
    /**
     * This function will return the type of the primitive passed to it, with some safeguards for Symbol objects
     * 
     * @param {any} primitive
     * @return {string}
     */
    function getTypeOf(primitive) {
        return (getTypeOf = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (_primitive) {
            return typeof _primitive;
        } : function (_primitive) {
            return _primitive && "function" == typeof Symbol && _primitive.constructor === Symbol && _primitive !== Symbol.prototype ?
                "symbol" :
                typeof _primitive;
        })(primitive);
    }
    /**
     * CREATE FROALA INSTANCE
     * 
     * @param {string} e
     * @param {!Object} element
     * @param {!Object} options
     * @return {?}
     */
    function data(e, element, options) {
        if ("string" != typeof e) {
            return new data.Bootstrap(e, element, options);
        }
        /** @type {!NodeList<Element>} */
        var o = document.querySelectorAll(e);
        if (element && element.iframe_document) {
            o = element.iframe_document.querySelectorAll(e);
        }
        /** @type {!Array} */
        var stack = [];
        /** @type {number} */
        var oo = 0;
        for (; oo < o.length; oo++) {
            var ARRAY_TERMINATOR = o[oo]["data-froala.editor"];
            if (ARRAY_TERMINATOR) {
                stack.push(ARRAY_TERMINATOR);
            } else {
                stack.push(new data.Bootstrap(o[oo], element, options));
            }
        }
        return 1 == stack.length ? stack[0] : stack;
    }
    /**
     * @return {undefined}
     */
    function init() {
        this.doc = this.$el.get(0).ownerDocument;
        this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow;
        this.$doc = jQuery(this.doc);
        this.$win = jQuery(this.win);
        if (!this.opts.pluginsEnabled) {
            /** @type {!Array<string>} */
            this.opts.pluginsEnabled = Object.keys(config.PLUGINS);
        }
        if (this.opts.initOnClick) {
            this.load(config.MODULES);
            this.$el.on("touchstart.init", function () {
                jQuery(this).data("touched", true);
            });
            this.$el.on("touchmove.init", function () {
                jQuery(this).removeData("touched");
            });
            this.$el.on("mousedown.init touchend.init dragenter.init focus.init", function (event) {
                if ("touchend" === event.type && !this.$el.data("touched")) {
                    return true;
                }
                if (1 === event.which || !event.which) {
                    this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init");
                    this.load(config.MODULES);
                    this.load(config.PLUGINS);
                    var dom_element = event.originalEvent && event.originalEvent.originalTarget;
                    if (dom_element && "IMG" === dom_element.tagName && jQuery(dom_element).trigger("mousedown"), void 0 === this.ul && this.destroy(), "touchend" === event.type && this.image && event.originalEvent && event.originalEvent.target && jQuery(event.originalEvent.target).is("img")) {
                        var locale = this;
                        setTimeout(function () {
                            locale.image.edit(jQuery(event.originalEvent.target));
                        }, 100);
                    }
                    /** @type {boolean} */
                    this.ready = true;
                    this.events.trigger("initialized");
                }
            }.bind(this));
            this.events.trigger("initializationDelayed");
        } else {
            this.load(config.MODULES);
            this.load(config.PLUGINS);
            jQuery(this.o_win).scrollTop(this.c_scroll);
            if (void 0 === this.ul) {
                this.destroy();
            }
            /** @type {boolean} */
            this.ready = true;
            this.events.trigger("initialized");
        }
    }
    if (!Element.prototype.matches) {
        /** @type {function(this:Element, string): boolean} */
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        /**
         * @param {string} node
         * @return {(Element|null)}
         */
        Element.prototype.closest = function (node) {
            /** @type {!Element} */
            var parent = this;
            if (!document.documentElement.contains(parent)) {
                return null;
            }
            do {
                if (parent.matches(node)) {
                    return parent;
                }
                /** @type {(Node|null)} */
                parent = parent.parentElement || parent.parentNode;
            } while (null !== parent && 1 === parent.nodeType);
            return null;
        };
    }
    if (!Element.prototype.matches) {
        /** @type {function(this:Element, string, (Node|NodeList<?>|null)=): boolean} */
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (name) {
            /** @type {!NodeList<Element>} */
            var val = (this.document || this.ownerDocument).querySelectorAll(name);
            /** @type {number} */
            var j = val.length;
            for (; 0 <= --j && val.item(j) !== this;) {
            }
            return -1 < j;
        };
    }
    if (!Array.isArray) {
        /**
         * @param {*} obj
         * @return {boolean}
         */
        Array.isArray = function (obj) {
            return "[object Array]" === Object.prototype.toString.call(obj);
        };
    }
    if ("function" != typeof Object.assign) {
        Object.defineProperty(Object, "assign", {
            value: function (n, t) {
                if (null == n) {
                    throw new TypeError("Cannot convert undefined or null to object");
                }
                /** @type {!Object} */
                var obj = Object(n);
                /** @type {number} */
                var i = 1;
                for (; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (null != data) {
                        var i;
                        for (i in data) {
                            if (Object.prototype.hasOwnProperty.call(data, i)) {
                                obj[i] = data[i];
                            }
                        }
                    }
                }
                return obj;
            },
            writable: true,
            configurable: true
        });
    }
    (function () {
        /**
         * @param {!Object} value
         * @param {string} type
         * @return {undefined}
         */
        function isNative(value, type) {
            var event = value[type];
            /**
             * @param {string} layer
             * @return {?}
             */
            value[type] = function (layer) {
                var result;
                /** @type {boolean} */
                var a = false;
                /** @type {boolean} */
                var s = false;
                if (!layer || Array.isArray(layer) || !layer.match(e) && !layer.match(url)) {
                    return event.call(this, layer);
                }
                if (!this.parentNode) {
                    n.appendChild(this);
                    /** @type {boolean} */
                    s = true;
                }
                var form = this.parentNode;
                return this.id || (this.id = "rootedQuerySelector_id_".concat((new Date).getTime()), a = true), result = event.call(form, layer.replace(e, "#".concat(this.id)).replace(url, ",#".concat(this.id))), a && (this.id = ""), s && n.removeChild(this), result;
            };
        }
        /** @type {!RegExp} */
        var e = /^\s*:scope/gi;
        /** @type {!RegExp} */
        var url = /,\s*:scope/gi;
        /** @type {!Element} */
        var n = document.createElement("div");
        try {
            /** @type {!NodeList<Element>} */
            var o = n.querySelectorAll(":scope *");
            if (!o || Array.isArray(o)) {
                throw "error";
            }
        } catch (e) {
            isNative(Element.prototype, "querySelector");
            isNative(Element.prototype, "querySelectorAll");
            isNative(HTMLElement.prototype, "querySelector");
            isNative(HTMLElement.prototype, "querySelectorAll");
        }
    })();
    if ("document" in self) {
        if (!("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")))) {
            (function (view) {
                if ("Element" in view) {
                    /** @type {string} */
                    var classListProp = "classList";
                    /** @type {string} */
                    var protoProp = "prototype";
                    var elemCtrProto = view.Element[protoProp];
                    /** @type {function(new:Object, *=): !Object} */
                    var objCtr = Object;
                    var strTrim = String[protoProp].trim || function () {
                        return this.replace(/^\s+|\s+$/g, "");
                    };
                    var spy = Array[protoProp].indexOf || function (name) {
                        /** @type {number} */
                        var j = 0;
                        var len = this.length;
                        for (; j < len; j++) {
                            if (j in this && this[j] === name) {
                                return j;
                            }
                        }
                        return -1;
                    };
                    /**
                     * @param {string} type
                     * @param {string} message
                     * @return {undefined}
                     */
                    var DOMEx = function (type, message) {
                        /** @type {string} */
                        this.name = type;
                        this.code = DOMException[type];
                        /** @type {string} */
                        this.message = message;
                    };
                    /**
                     * @param {string} response
                     * @param {string} data
                     * @return {?}
                     */
                    var callback = function (response, data) {
                        if ("" === data) {
                            throw new DOMEx("SYNTAX_ERR", "The token must not be empty.");
                        }
                        if (/\s/.test(data)) {
                            throw new DOMEx("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
                        }
                        return spy.call(response, data);
                    };
                    /**
                     * @param {!Element} elem
                     * @return {undefined}
                     */
                    var ClassList = function (elem) {
                        var componentsStr = strTrim.call(elem.getAttribute("class") || "");
                        var itemsToAppend = componentsStr ? componentsStr.split(/\s+/) : [];
                        /** @type {number} */
                        var i = 0;
                        var patchLen = itemsToAppend.length;
                        for (; i < patchLen; i++) {
                            this.push(itemsToAppend[i]);
                        }
                        /**
                         * @return {undefined}
                         */
                        this._updateClassName = function () {
                            elem.setAttribute("class", this.toString());
                        };
                    };
                    /** @type {!Array} */
                    var d = ClassList[protoProp] = [];
                    /**
                     * @return {?}
                     */
                    var classListGetter = function () {
                        return new ClassList(this);
                    };
                    if (DOMEx[protoProp] = Error[protoProp], d.item = function (n) {
                        return this[n] || null;
                    }, d.contains = function (elem) {
                        return ~callback(this, elem + "");
                    }, d.add = function () {
                        var input;
                        /** @type {!Arguments} */
                        var tokens = arguments;
                        /** @type {number} */
                        var i = 0;
                        /** @type {number} */
                        var l = tokens.length;
                        /** @type {boolean} */
                        var caretPos = false;
                        for (; input = tokens[i] + "", ~callback(this, input) || (this.push(input), caretPos = true), ++i < l;) {
                        }
                        if (caretPos) {
                            this._updateClassName();
                        }
                    }, d.remove = function () {
                        var all;
                        var b;
                        /** @type {!Arguments} */
                        var config = arguments;
                        /** @type {number} */
                        var i = 0;
                        /** @type {number} */
                        var index = config.length;
                        /** @type {boolean} */
                        var actionType = false;
                        do {
                            /** @type {string} */
                            all = config[i] + "";
                            b = callback(this, all);
                            for (; ~b;) {
                                this.splice(b, 1);
                                /** @type {boolean} */
                                actionType = true;
                                b = callback(this, all);
                            }
                        } while (++i < index);
                        if (actionType) {
                            this._updateClassName();
                        }
                    }, d.toggle = function (name, uuid) {
                        var result = this.contains(name);
                        /** @type {(boolean|string)} */
                        var type = result ? true !== uuid && "remove" : false !== uuid && "add";
                        return type && this[type](name), true === uuid || false === uuid ? uuid : !result;
                    }, d.replace = function (text, data) {
                        var value = callback(text + "");
                        if (~value) {
                            this.splice(value, 1, data);
                            this._updateClassName();
                        }
                    }, d.toString = function () {
                        return this.join(" ");
                    }, objCtr.defineProperty) {
                        var classListPropDesc = {
                            get: classListGetter,
                            enumerable: true,
                            configurable: true
                        };
                        try {
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        } catch (storageIdentities) {
                            if (!(void 0 !== storageIdentities.number && -2146823252 !== storageIdentities.number)) {
                                /** @type {boolean} */
                                classListPropDesc.enumerable = false;
                                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                            }
                        }
                    } else {
                        if (objCtr[protoProp].__defineGetter__) {
                            elemCtrProto.__defineGetter__(classListProp, classListGetter);
                        }
                    }
                }
            })(self);
        }
        (function () {
            /** @type {!Element} */
            var toolbarEl = document.createElement("_");
            if (toolbarEl.classList.add("c1", "c2"), !toolbarEl.classList.contains("c2")) {
                /**
                 * @param {string} method
                 * @return {undefined}
                 */
                var createMethod = function (method) {
                    var f = DOMTokenList.prototype[method];
                    /**
                     * @param {?} e
                     * @return {undefined}
                     * @this {!DOMTokenList}
                     */
                    DOMTokenList.prototype[method] = function (e) {
                        var i;
                        /** @type {number} */
                        var argl = arguments.length;
                        /** @type {number} */
                        i = 0;
                        for (; i < argl; i++) {
                            e = arguments[i];
                            f.call(this, e);
                        }
                    };
                };
                createMethod("add");
                createMethod("remove");
            }
            if (toolbarEl.classList.toggle("c3", false), toolbarEl.classList.contains("c3")) {
                /** @type {function(this:DOMTokenList, string, boolean=): boolean} */
                var _toggle = DOMTokenList.prototype.toggle;
                /**
                 * @param {string} token
                 * @param {boolean=} opt_callback
                 * @return {boolean}
                 */
                DOMTokenList.prototype.toggle = function (token, opt_callback) {
                    return 1 in arguments && !this.contains(token) == !opt_callback ? opt_callback : _toggle.call(this, token);
                };
            }
            if (!("replace" in document.createElement("_").classList)) {
                /**
                 * @param {!Object} p
                 * @param {string} s
                 * @return {undefined}
                 */
                DOMTokenList.prototype.replace = function (p, s) {
                    /** @type {!Array<string>} */
                    var filePath = this.toString().split(" ");
                    /** @type {number} */
                    var _frameworkSubModuleDirPath = filePath.indexOf(p + "");
                    if (~_frameworkSubModuleDirPath) {
                        /** @type {!Array<string>} */
                        filePath = filePath.slice(_frameworkSubModuleDirPath);
                        this.remove.apply(this, filePath);
                        this.add(s);
                        this.add.apply(this, filePath.slice(1));
                    }
                };
            }
            /** @type {null} */
            toolbarEl = null;
        })();
    }
    /**
     * REGISTER PLUGIN
     * 
     * @param {!NodeList} functionArray
     * @return {undefined}
     */
    data.RegisterPlugins = function (functionArray) {
        /** @type {number} */
        var i = 0;
        for (; i < functionArray.length; i++) {
            functionArray[i].call(data);
        }
    };
    Object.assign(data, {
        DEFAULTS: {
            initOnClick: false,
            pluginsEnabled: null
        },
        MODULES: {},
        PLUGINS: {},
        VERSION: "3.2.6-1",
        INSTANCES: [],
        OPTS_MAPPING: {},
        SHARED: {},
        ID: 0
    });
    /**
     * NODE
     * 
     * @param {!Object} that
     * @return {?}
     */
    data.MODULES.node = function (that) {
        /**
         * @param {!Node} element
         * @return {?}
         */
        function find(element) {
            return element && "IFRAME" !== element.tagName ? Array.prototype.slice.call(element.childNodes || []) : [];
        }
        /**
         * @param {!Object} element
         * @return {?}
         */
        function createNode(element) {
            return !!element && element.nodeType === Node.ELEMENT_NODE && 0 <= data.BLOCK_TAGS.indexOf(element.tagName.toLowerCase());
        }
        /**
         * @param {!Object} props
         * @return {?}
         */
        function clone(props) {
            var result = {};
            var m = props.attributes;
            if (m) {
                /** @type {number} */
                var i = 0;
                for (; i < m.length; i++) {
                    var field = m[i];
                    result[field.nodeName] = field.value;
                }
            }
            return result;
        }
        /**
         * @param {string} name
         * @return {?}
         */
        function next(name) {
            /** @type {string} */
            var value = "";
            var data = clone(name);
            /** @type {!Array<string>} */
            var atlines = Object.keys(data).sort();
            /** @type {number} */
            var i = 0;
            for (; i < atlines.length; i++) {
                /** @type {string} */
                var a = atlines[i];
                var b = data[a];
                if (b.indexOf("'") < 0 && 0 <= b.indexOf('"')) {
                    /** @type {string} */
                    value = value + " ".concat(a, "='").concat(b, "'");
                } else {
                    if (0 <= b.indexOf('"') && 0 <= b.indexOf("'")) {
                        b = b.replace(/"/g, "&quot;");
                    }
                    /** @type {string} */
                    value = value + " ".concat(a, '="').concat(b, '"');
                }
            }
            return value;
        }
        /**
         * @param {!Object} node
         * @return {?}
         */
        function fire(node) {
            return node === that.el;
        }
        var $ = that.$;
        return {
            isBlock: createNode,
            isEmpty: function (node, item) {
                if (!node) {
                    return true;
                }
                if (node.querySelector("table")) {
                    return false;
                }
                var obj = find(node);
                if (1 === obj.length && createNode(obj[0])) {
                    obj = find(obj[0]);
                }
                /** @type {boolean} */
                var s = false;
                /** @type {number} */
                var i = 0;
                for (; i < obj.length; i++) {
                    var node = obj[i];
                    if (!(item && that.node.hasClass(node, "fr-marker") || node.nodeType === Node.TEXT_NODE && 0 === node.textContent.length)) {
                        if ("BR" !== node.tagName && 0 < (node.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) {
                            return false;
                        }
                        if (s) {
                            return false;
                        }
                        if ("BR" === node.tagName) {
                            /** @type {boolean} */
                            s = true;
                        }
                    }
                }
                return !(node.querySelectorAll(data.VOID_ELEMENTS.join(",")).length - node.querySelectorAll("br").length || node.querySelector("".concat(that.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || 1 < node.querySelectorAll(data.BLOCK_TAGS.join(",")).length || node.querySelector("".concat(that.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")));
            },
            blockParent: function (e) {
                for (; e && e.parentNode !== that.el && (!e.parentNode || !that.node.hasClass(e.parentNode, "fr-inner"));) {
                    if (createNode(e = e.parentNode)) {
                        return e;
                    }
                }
                return null;
            },
            deepestParent: function (node, dom, selector) {
                if (void 0 === dom && (dom = []), void 0 === selector && (selector = true), dom.push(that.el), 0 <= dom.indexOf(node.parentNode) || node.parentNode && that.node.hasClass(node.parentNode, "fr-inner") || node.parentNode && 0 <= data.SIMPLE_ENTER_TAGS.indexOf(node.parentNode.tagName) && selector) {
                    return null;
                }
                for (; dom.indexOf(node.parentNode) < 0 && node.parentNode && !that.node.hasClass(node.parentNode, "fr-inner") && (data.SIMPLE_ENTER_TAGS.indexOf(node.parentNode.tagName) < 0 || !selector) && (!createNode(node) || createNode(node.parentNode)) && (!createNode(node) || !createNode(node.parentNode) || !selector);) {
                    node = node.parentNode;
                }
                return node;
            },
            rawAttributes: clone,
            attributes: next,
            clearAttributes: function (element) {
                var params = element.attributes;
                /** @type {number} */
                var locale = params.length - 1;
                for (; 0 <= locale; locale--) {
                    var o = params[locale];
                    element.removeAttribute(o.nodeName);
                }
            },
            openTagString: function (item) {
                return "<".concat(item.tagName.toLowerCase()).concat(next(item), ">");
            },
            closeTagString: function (obj) {
                return "</".concat(obj.tagName.toLowerCase(), ">");
            },
            isFirstSibling: function createNode(target, parent) {
                if (void 0 === parent) {
                    /** @type {boolean} */
                    parent = true;
                }
                var node = target.previousSibling;
                for (; node && parent && that.node.hasClass(node, "fr-marker");) {
                    node = node.previousSibling;
                }
                return !node || node.nodeType === Node.TEXT_NODE && "" === node.textContent && createNode(node);
            },
            isLastSibling: function createNode(next, parent) {
                if (void 0 === parent) {
                    /** @type {boolean} */
                    parent = true;
                }
                var node = next.nextSibling;
                for (; node && parent && that.node.hasClass(node, "fr-marker");) {
                    node = node.nextSibling;
                }
                return !node || node.nodeType === Node.TEXT_NODE && "" === node.textContent && createNode(node);
            },
            isList: function (element) {
                return !!element && 0 <= ["UL", "OL"].indexOf(element.tagName);
            },
            isLink: function (element) {
                return !!element && element.nodeType === Node.ELEMENT_NODE && "a" === element.tagName.toLowerCase();
            },
            isElement: fire,
            contents: find,
            isVoid: function (node) {
                return node && node.nodeType === Node.ELEMENT_NODE && 0 <= data.VOID_ELEMENTS.indexOf((node.tagName || "").toLowerCase());
            },
            hasFocus: function (target) {
                return target === that.doc.activeElement && (!that.doc.hasFocus || that.doc.hasFocus()) && Boolean(fire(target) || target.type || target.href || ~target.tabIndex);
            },
            isEditable: function (element) {
                return (!element.getAttribute || "false" !== element.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(element.tagName) < 0;
            },
            isDeletable: function (parent) {
                return parent && parent.nodeType === Node.ELEMENT_NODE && parent.getAttribute("class") && 0 <= (parent.getAttribute("class") || "").indexOf("fr-deletable");
            },
            hasClass: function (node, name) {
                return node instanceof $ && (node = node.get(0)), node && node.classList && node.classList.contains(name);
            },
            filter: function (name) {
                return that.browser.msie ? name : {
                    acceptNode: name
                };
            }
        };
    };
    //////////////
    // DEFAULTS
    //////////////
    Object.assign(data.DEFAULTS, {
        htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map",
            "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"],
        htmlRemoveTags: ["script", "style"],
        htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone",
            "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed",
            "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
        htmlAllowedStyleProps: [".*"],
        htmlAllowComments: true,
        htmlUntouched: false,
        fullPage: false
    });
    data.HTML5Map = {
        B: "STRONG",
        I: "EM",
        STRIKE: "S"
    };
    /**
     * CLEAN
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.clean = function (editor) {
        /**
         * @param {!Node} element
         * @return {?}
         */
        function check(element) {
            if (element.nodeType === Node.ELEMENT_NODE && element.getAttribute("class") && 0 <= element.getAttribute("class").indexOf("fr-marker")) {
                return false;
            }
            var i;
            var actual = editor.node.contents(element);
            /** @type {!Array} */
            var styles = [];
            /** @type {number} */
            i = 0;
            for (; i < actual.length; i++) {
                if (actual[i].nodeType !== Node.ELEMENT_NODE || editor.node.isVoid(actual[i])) {
                    if (actual[i].nodeType === Node.TEXT_NODE) {
                        actual[i].textContent = actual[i].textContent.replace(/\u200b/g, "");
                    }
                } else {
                    if (actual[i].textContent.replace(/\u200b/g, "").length !== actual[i].textContent.length) {
                        check(actual[i]);
                    }
                }
            }
            if (element.nodeType === Node.ELEMENT_NODE && !editor.node.isVoid(element) && (element.normalize(), actual = editor.node.contents(element), styles = element.querySelectorAll(".fr-marker"), actual.length - styles.length == 0)) {
                /** @type {number} */
                i = 0;
                for (; i < actual.length; i++) {
                    if (actual[i].nodeType === Node.ELEMENT_NODE && (actual[i].getAttribute("class") || "").indexOf("fr-marker") < 0) {
                        return false;
                    }
                }
                /** @type {number} */
                i = 0;
                for (; i < styles.length; i++) {
                    element.parentNode.insertBefore(styles[i].cloneNode(true), element);
                }
                return element.parentNode.removeChild(element), false;
            }
        }
        /**
         * @param {!Object} node
         * @param {number} report
         * @return {?}
         */
        function render(node, report) {
            if (node.nodeType === Node.COMMENT_NODE) {
                return "\x3c!--".concat(node.nodeValue, "--\x3e");
            }
            if (node.nodeType === Node.TEXT_NODE) {
                return report ? node.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : node.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
            }
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return node.outerHTML;
            }
            if (node.nodeType === Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(node.tagName)) {
                return node.outerHTML;
            }
            if (node.nodeType === Node.ELEMENT_NODE && "svg" === node.tagName) {
                /** @type {!Element} */
                var op = document.createElement("div");
                var e = node.cloneNode(true);
                return op.appendChild(e), op.innerHTML;
            }
            if ("IFRAME" === node.tagName) {
                return node.outerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            }
            var children = node.childNodes;
            if (0 === children.length) {
                return node.outerHTML;
            }
            /** @type {string} */
            var name = "";
            /** @type {number} */
            var i = 0;
            for (; i < children.length; i++) {
                if ("PRE" === node.tagName) {
                    /** @type {boolean} */
                    report = true;
                }
                /** @type {string} */
                name = name + render(children[i], report);
            }
            return editor.node.openTagString(node) + name + editor.node.closeTagString(node);
        }
        /**
         * @param {string} xPath
         * @return {?}
         */
        function parse(xPath) {
            var str = xPath.replace(/;;/gi, ";");
            return ";" !== (str = str.replace(/^;/gi, "")).charAt(str.length) && (str = str + ";"), str;
        }
        /**
         * @param {!Object} data
         * @return {?}
         */
        function toString(data) {
            var key;
            for (key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    /** @type {(Array<string>|null)} */
                    var match = key.match(regexp);
                    /** @type {null} */
                    var network = null;
                    if ("style" === key && editor.opts.htmlAllowedStyleProps.length) {
                        network = data[key].match(version);
                    }
                    if (match && network) {
                        data[key] = parse(network.join(";"));
                    } else {
                        if (!(match && ("style" !== key || network))) {
                            delete data[key];
                        }
                    }
                }
            }
            /** @type {string} */
            var finalTable = "";
            /** @type {!Array<string>} */
            var potentialKeys = Object.keys(data).sort();
            /** @type {number} */
            var i = 0;
            for (; i < potentialKeys.length; i++) {
                if (data[key = potentialKeys[i]].indexOf('"') < 0) {
                    /** @type {string} */
                    finalTable = finalTable + " ".concat(key, '="').concat(data[key], '"');
                } else {
                    /** @type {string} */
                    finalTable = finalTable + " ".concat(key, "='").concat(data[key], "'");
                }
            }
            return finalTable;
        }
        /**
         * @param {string} tree
         * @param {!Function} fn
         * @return {?}
         */
        function get(tree, fn) {
            var i;
            /** @type {!Element} */
            var node = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
            $(node).append(tree);
            /** @type {string} */
            var buf = "";
            if (node) {
                var result = editor.node.contents(node);
                /** @type {number} */
                i = 0;
                for (; i < result.length; i++) {
                    fn(result[i]);
                }
                result = editor.node.contents(node);
                /** @type {number} */
                i = 0;
                for (; i < result.length; i++) {
                    /** @type {string} */
                    buf = buf + render(result[i]);
                }
            }
            return buf;
        }
        /**
         * @param {string} node
         * @param {!Function} name
         * @param {boolean} t
         * @return {?}
         */
        function create(node, name, t) {
            var data = node = function (s) {
                return args = [], (s = (s = (s = s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function (display_arg) {
                    return args.push(display_arg), "[FROALA.EDITOR.SCRIPT ".concat(args.length - 1, "]");
                })).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function (display_arg) {
                    return args.push(display_arg), "[FROALA.EDITOR.NOSCRIPT ".concat(args.length - 1, "]");
                })).replace(/<meta((?:[\w\W]*?)) http-equiv="/g, '<meta$1 data-fr-http-equiv="')).replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="');
            }(node);
            /** @type {null} */
            var value = null;
            return editor.opts.fullPage && (data = editor.html.extractNode(node, "body") || (0 <= node.indexOf("<body") ? "" : node), t && (value = editor.html.extractNode(node, "head") || "")), data = get(data, name), value && (value = get(value, name)), function (s) {
                return (s = (s = s.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function (canCreateDiscussions, nIndex) {
                    return 0 <= editor.opts.htmlRemoveTags.indexOf("script") ? "" : args[parseInt(nIndex, 10)];
                })).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function (canCreateDiscussions, nIndex) {
                    if (0 <= editor.opts.htmlRemoveTags.indexOf("noscript")) {
                        return "";
                    }
                    var table = args[parseInt(nIndex, 10)].replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                    var container = $(table);
                    if (container && container.length) {
                        var el = get(container.html(), init);
                        container.html(el);
                        table = container.get(0).outerHTML;
                    }
                    return table;
                })).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="');
            }(function (body, value, node) {
                if (editor.opts.fullPage) {
                    var level = editor.html.extractDoctype(node);
                    var result = toString(editor.html.extractNodeAttrs(node, "html"));
                    value = null === value ? editor.html.extractNode(node, "head") || "<title></title>" : value;
                    var string = toString(editor.html.extractNodeAttrs(node, "head"));
                    var type = toString(editor.html.extractNodeAttrs(node, "body"));
                    return "".concat(level, "<html").concat(result, "><head").concat(string, ">").concat(value, "</head><body").concat(type, ">").concat(body, "</body></html>");
                }
                return body;
            }(data, value, node));
        }
        /**
         * @param {string} content
         * @return {?}
         */
        function filter(content) {
            var e = editor.doc.createElement("DIV");
            return e.innerText = content, e.textContent;
        }
        /**
         * @param {undefined} block
         * @return {undefined}
         */
        function init(block) {
            var props = editor.node.contents(block);
            /** @type {number} */
            var i = 0;
            for (; i < props.length; i++) {
                if (props[i].nodeType !== Node.TEXT_NODE) {
                    init(props[i]);
                }
            }
            !function (node) {
                if ("SPAN" === node.tagName && 0 <= (node.getAttribute("class") || "").indexOf("fr-marker")) {
                    return false;
                }
                if ("PRE" === node.tagName && function (row) {
                    var id = row.innerHTML;
                    if (0 <= id.indexOf("\n")) {
                        row.innerHTML = id.replace(/\n/g, "<br>");
                    }
                }(node), node.nodeType === Node.ELEMENT_NODE && (node.getAttribute("data-fr-src") && 0 !== node.getAttribute("data-fr-src").indexOf("blob:") && node.setAttribute("data-fr-src", editor.helpers.sanitizeURL(filter(node.getAttribute("data-fr-src")))), node.getAttribute("href") && node.setAttribute("href", editor.helpers.sanitizeURL(filter(node.getAttribute("href")))), node.getAttribute("src") && node.setAttribute("src", editor.helpers.sanitizeURL(filter(node.getAttribute("src")))), node.getAttribute("srcdoc") &&
                    node.setAttribute("srcdoc", editor.clean.html(node.getAttribute("srcdoc"))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(node.tagName) && (node.innerHTML = node.innerHTML.trim())), !editor.opts.pasteAllowLocalImages && node.nodeType === Node.ELEMENT_NODE && "IMG" === node.tagName && node.getAttribute("data-fr-src") && 0 === node.getAttribute("data-fr-src").indexOf("file://")) {
                    return node.parentNode.removeChild(node), false;
                }
                if (node.nodeType === Node.ELEMENT_NODE && data.HTML5Map[node.tagName] && "" === editor.node.attributes(node)) {
                    var step = data.HTML5Map[node.tagName];
                    /** @type {string} */
                    var value = "<".concat(step, ">").concat(node.innerHTML, "</").concat(step, ">");
                    node.insertAdjacentHTML("beforebegin", value);
                    (node = node.previousSibling).parentNode.removeChild(node.nextSibling);
                }
                if (editor.opts.htmlAllowComments || node.nodeType !== Node.COMMENT_NODE) {
                    if (node.tagName && node.tagName.match(target)) {
                        if ("STYLE" == node.tagName && editor.helpers.isMac()) {
                            (function () {
                                var point;
                                var p = node.innerHTML.trim();
                                /** @type {!Array} */
                                var options = [];
                                /** @type {!RegExp} */
                                var r = /{([^}]+)}/g;
                                p = p.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|\x3c!--[\s\S]*?--\x3e$/, "");
                                for (; point = r.exec(p);) {
                                    options.push(point[1]);
                                }
                                /**
                                 * @param {number} e
                                 * @return {undefined}
                                 */
                                var injectElement = function (e) {
                                    var qs = p.substring(0, p.indexOf("{")).trim();
                                    if (0 == !/^[a-z_-][a-z\d_-]*$/i.test(qs)) {
                                        node.parentNode.querySelectorAll(qs).forEach(function (main) {
                                            main.removeAttribute("class");
                                            main.setAttribute("style", options[e]);
                                        });
                                    }
                                    p = p.substring(p.indexOf("}") + 1);
                                };
                                /** @type {number} */
                                var script = 0;
                                for (; -1 != p.indexOf("{"); script++) {
                                    injectElement(script);
                                }
                            })();
                        }
                        node.parentNode.removeChild(node);
                    } else {
                        if (node.tagName && !node.tagName.match(specialWords)) {
                            if ("svg" === node.tagName) {
                                node.parentNode.removeChild(node);
                            } else {
                                if (!(editor.browser.safari && "path" === node.tagName && node.parentNode && "svg" === node.parentNode.tagName)) {
                                    node.outerHTML = node.innerHTML;
                                }
                            }
                        } else {
                            var row = node.attributes;
                            if (row) {
                                /** @type {number} */
                                var i = row.length - 1;
                                for (; 0 <= i; i--) {
                                    var e = row[i];
                                    var isStartThisDay = e.nodeName.match(regexp);
                                    /** @type {null} */
                                    var isEndThisDay = null;
                                    if ("style" === e.nodeName && editor.opts.htmlAllowedStyleProps.length) {
                                        isEndThisDay = e.value.match(version);
                                    }
                                    if (isStartThisDay && isEndThisDay) {
                                        e.value = parse(isEndThisDay.join(";"));
                                    } else {
                                        if (!(isStartThisDay && ("style" !== e.nodeName || isEndThisDay))) {
                                            node.removeAttribute(e.nodeName);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (0 !== node.data.indexOf("[FROALA.EDITOR")) {
                        node.parentNode.removeChild(node);
                    }
                }
            }(block);
        }
        var specialWords;
        var target;
        var regexp;
        var version;
        var $ = editor.$;
        /** @type {!Array} */
        var args = [];
        return {
            _init: function () {
                if (editor.opts.fullPage) {
                    $.merge(editor.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"]);
                }
            },
            html: function (name, value, url, manageUrl) {
                if (void 0 === value) {
                    /** @type {!Array} */
                    value = [];
                }
                if (void 0 === url) {
                    /** @type {!Array} */
                    url = [];
                }
                if (void 0 === manageUrl) {
                    /** @type {boolean} */
                    manageUrl = false;
                }
                var i;
                var bindings = $.merge([], editor.opts.htmlAllowedTags);
                /** @type {number} */
                i = 0;
                for (; i < value.length; i++) {
                    if (0 <= bindings.indexOf(value[i])) {
                        bindings.splice(bindings.indexOf(value[i]), 1);
                    }
                }
                var sources = $.merge([], editor.opts.htmlAllowedAttrs);
                /** @type {number} */
                i = 0;
                for (; i < url.length; i++) {
                    if (0 <= sources.indexOf(url[i])) {
                        sources.splice(sources.indexOf(url[i]), 1);
                    }
                }
                return sources.push("data-fr-.*"), sources.push("fr-.*"), specialWords = new RegExp("^".concat(bindings.join("$|^"), "$"), "gi"), regexp = new RegExp("^".concat(sources.join("$|^"), "$"), "gi"), target = new RegExp("^".concat(editor.opts.htmlRemoveTags.join("$|^"), "$"), "gi"), version = editor.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)".concat(editor.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)"), ":.+?(?=(;)|$))"), "gi") : null, create(name, init, true);
            },
            toHTML5: function () {
                var blocks = editor.el.querySelectorAll(Object.keys(data.HTML5Map).join(","));
                if (blocks.length) {
                    /** @type {boolean} */
                    var r = false;
                    if (!editor.el.querySelector(".fr-marker")) {
                        editor.selection.save();
                        /** @type {boolean} */
                        r = true;
                    }
                    /** @type {number} */
                    var i = 0;
                    for (; i < blocks.length; i++) {
                        if ("" === editor.node.attributes(blocks[i])) {
                            $(blocks[i]).replaceWith("<".concat(data.HTML5Map[blocks[i].tagName], ">").concat(blocks[i].innerHTML, "</").concat(data.HTML5Map[blocks[i].tagName], ">"));
                        }
                    }
                    if (r) {
                        editor.selection.restore();
                    }
                }
            },
            tables: function () {
                !function () {
                    var nodes = editor.el.querySelectorAll("tr");
                    /** @type {number} */
                    var j = 0;
                    for (; j < nodes.length; j++) {
                        var ths = nodes[j].children;
                        /** @type {boolean} */
                        var t = true;
                        /** @type {number} */
                        var i = 0;
                        for (; i < ths.length; i++) {
                            if ("TH" !== ths[i].tagName) {
                                /** @type {boolean} */
                                t = false;
                                break;
                            }
                        }
                        if (false !== t && 0 !== ths.length) {
                            var target = nodes[j];
                            for (; target && "TABLE" !== target.tagName && "THEAD" !== target.tagName;) {
                                target = target.parentNode;
                            }
                            var el = target;
                            if ("THEAD" !== el.tagName) {
                                el = editor.doc.createElement("THEAD");
                                target.insertBefore(el, target.firstChild);
                            }
                            el.appendChild(nodes[j]);
                        }
                    }
                }();
            },
            lists: function () {
                !function () {
                    var last;
                    /** @type {!Array} */
                    var children = [];
                    do {
                        if (children.length) {
                            var node = children[0];
                            var ret = editor.doc.createElement("ul");
                            node.parentNode.insertBefore(ret, node);
                            do {
                                var curNode = node;
                                node = node.nextSibling;
                                ret.appendChild(curNode);
                            } while (node && "LI" === node.tagName);
                        }
                        /** @type {!Array} */
                        children = [];
                        var items = editor.el.querySelectorAll("li");
                        /** @type {number} */
                        var i = 0;
                        for (; i < items.length; i++) {
                            last = items[i];
                            if (!editor.node.isList(last.parentNode)) {
                                children.push(items[i]);
                            }
                        }
                    } while (0 < children.length);
                }();
                (function () {
                    var walkables = editor.el.querySelectorAll("ol + ol, ul + ul");
                    /** @type {number} */
                    var j = 0;
                    for (; j < walkables.length; j++) {
                        var node = walkables[j];
                        if (editor.node.isList(node.previousSibling) && editor.node.openTagString(node) === editor.node.openTagString(node.previousSibling)) {
                            var o = editor.node.contents(node);
                            /** @type {number} */
                            var i = 0;
                            for (; i < o.length; i++) {
                                node.previousSibling.appendChild(o[i]);
                            }
                            node.parentNode.removeChild(node);
                        }
                    }
                })();
                (function () {
                    var blocks = editor.el.querySelectorAll("ul, ol");
                    /** @type {number} */
                    var indexBlock = 0;
                    for (; indexBlock < blocks.length; indexBlock++) {
                        var childNodes = editor.node.contents(blocks[indexBlock]);
                        /** @type {null} */
                        var dom = null;
                        /** @type {number} */
                        var i = childNodes.length - 1;
                        for (; 0 <= i; i--) {
                            if ("LI" !== childNodes[i].tagName && "UL" != childNodes[i].tagName && "OL" != childNodes[i].tagName) {
                                if (!dom) {
                                    (dom = $(editor.doc.createElement("LI"))).insertBefore(childNodes[i]);
                                }
                                dom.prepend(childNodes[i]);
                            } else {
                                /** @type {null} */
                                dom = null;
                            }
                        }
                    }
                })();
                (function () {
                    var i;
                    var h;
                    var node;
                    do {
                        /** @type {boolean} */
                        h = false;
                        var eiFrame = editor.el.querySelectorAll("li:empty");
                        /** @type {number} */
                        i = 0;
                        for (; i < eiFrame.length; i++) {
                            eiFrame[i].parentNode.removeChild(eiFrame[i]);
                        }
                        var topLevelNodes = editor.el.querySelectorAll("ul, ol");
                        /** @type {number} */
                        i = 0;
                        for (; i < topLevelNodes.length; i++) {
                            if (!(node = topLevelNodes[i]).querySelector("LI")) {
                                /** @type {boolean} */
                                h = true;
                                node.parentNode.removeChild(node);
                            }
                        }
                    } while (true === h);
                })();
                (function () {
                    var filtersChildren = editor.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul");
                    /** @type {number} */
                    var i = 0;
                    for (; i < filtersChildren.length; i++) {
                        var element = filtersChildren[i];
                        var sibling = element.previousSibling;
                        if (sibling) {
                            if ("LI" === sibling.tagName) {
                                sibling.appendChild(element);
                            } else {
                                $(element).wrap("<li></li>");
                            }
                        }
                    }
                })();
                (function () {
                    var sorted_changes = editor.el.querySelectorAll("li > ul, li > ol");
                    /** @type {number} */
                    var j = 0;
                    for (; j < sorted_changes.length; j++) {
                        var r = sorted_changes[j];
                        if (r.nextSibling) {
                            var n = r.nextSibling;
                            for (; 0 < n.childNodes.length;) {
                                r.append(n.childNodes[0]);
                            }
                        }
                    }
                })();
                (function () {
                    var tdList = editor.el.querySelectorAll("li > ul, li > ol");
                    /** @type {number} */
                    var j = 0;
                    for (; j < tdList.length; j++) {
                        var div = tdList[j];
                        if (editor.node.isFirstSibling(div) && "none" != div.parentNode.style.listStyleType) {
                            $(div).before("<br/>");
                        } else {
                            if (div.previousSibling && "BR" === div.previousSibling.tagName) {
                                var previousSibling = div.previousSibling.previousSibling;
                                for (; previousSibling && editor.node.hasClass(previousSibling, "fr-marker");) {
                                    previousSibling = previousSibling.previousSibling;
                                }
                                if (previousSibling && "BR" !== previousSibling.tagName) {
                                    $(div.previousSibling).remove();
                                }
                            }
                        }
                    }
                })();
                (function () {
                    var bcofl_checkbox = editor.el.querySelectorAll("li:empty");
                    /** @type {number} */
                    var i = 0;
                    for (; i < bcofl_checkbox.length; i++) {
                        $(bcofl_checkbox[i]).remove();
                    }
                })();
            },
            invisibleSpaces: function (r) {
                return r.replace(/\u200b/g, "").length === r.length ? r : editor.clean.exec(r, check);
            },
            exec: create
        };
    };
    ////////////
    // HELPERS
    ////////////
    /** @type {number} */
    data.XS = 0;
    /** @type {number} */
    data.SM = 1;
    /** @type {number} */
    data.MD = 2;
    /** @type {number} */
    data.LG = 3;
    /** @type {string} */
    data.LinkRegExCommon = "[".concat("a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_\\.", "]{1,}");
    /** @type {string} */
    data.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;\\/~+#-\\'*-_{}]*)|())";
    /** @type {string} */
    data.LinkRegExTLD = "((".concat(data.LinkRegExCommon, ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))");
    /** @type {string} */
    data.LinkRegExHTTP = "((ftp|http|https):\\/\\/".concat(data.LinkRegExCommon, ")");
    /** @type {string} */
    data.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@".concat(data.LinkRegExCommon, ")");
    /** @type {string} */
    data.LinkRegExWWW = "(www\\.".concat(data.LinkRegExCommon, "\\.[a-z0-9-]{2,24})");
    /** @type {string} */
    data.LinkRegEx = "(".concat(data.LinkRegExTLD, "|").concat(data.LinkRegExHTTP, "|").concat(data.LinkRegExWWW, "|").concat(data.LinkRegExAuth, ")").concat(data.LinkRegExEnd);
    /** @type {!Array} */
    data.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"];
    /** @type {!RegExp} */
    data.MAIL_REGEX = /.+@.+\..+/i;
    /**
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.helpers = function (editor) {
        /**
         * @return {?}
         */
        function isIOS() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !test();
        }
        /**
         * @return {?}
         */
        function isAndroid() {
            return /(Android)/g.test(navigator.userAgent) && !test();
        }
        /**
         * @return {?}
         */
        function check() {
            return /(Blackberry)/g.test(navigator.userAgent);
        }
        /**
         * @return {?}
         */
        function test() {
            return /(Windows Phone)/gi.test(navigator.userAgent);
        }
        var type;
        var $ = editor.$;
        /** @type {null} */
        var c = null;
        return {
            _init: function () {
                editor.browser = function () {
                    var browser = {};
                    var version = function () {
                        var browser;
                        /** @type {number} */
                        var numChildOptions = -1;
                        return "Microsoft Internet Explorer" === navigator.appName ? (browser = navigator.userAgent, null !== (new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})")).exec(browser) && (numChildOptions = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (browser = navigator.userAgent, null !== (new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})")).exec(browser) && (numChildOptions = parseFloat(RegExp.$1))), numChildOptions;
                    }();
                    if (0 < version) {
                        /** @type {boolean} */
                        browser.msie = true;
                    } else {
                        /** @type {string} */
                        var a = navigator.userAgent.toLowerCase();
                        /** @type {!Array<string>} */
                        var BROWSER_ENGINES = /(edge)[ /]([\w.]+)/.exec(a) || /(chrome)[ /]([\w.]+)/.exec(a) || /(webkit)[ /]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
                        /** @type {string} */
                        var p = BROWSER_ENGINES[1] || "";
                        BROWSER_ENGINES[2];
                        if (BROWSER_ENGINES[1]) {
                            /** @type {boolean} */
                            browser[p] = true;
                        }
                        if (browser.chrome) {
                            /** @type {boolean} */
                            browser.webkit = true;
                        } else {
                            if (browser.webkit) {
                                /** @type {boolean} */
                                browser.safari = true;
                            }
                        }
                    }
                    return browser.msie && (browser.version = version), browser;
                }();
            },
            isIOS: isIOS,
            isMac: function () {
                return null === c && (c = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), c;
            },
            isAndroid: isAndroid,
            isBlackberry: check,
            isWindowsPhone: test,
            isMobile: function () {
                return isAndroid() || isIOS() || check();
            },
            isEmail: function (emailValue) {
                return !/^(https?:|ftps?:|)\/\//i.test(emailValue) && data.MAIL_REGEX.test(emailValue);
            },
            requestAnimationFrame: function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (rafFunction) {
                    window.setTimeout(rafFunction, 1E3 / 60);
                };
            },
            getPX: function (id_local) {
                return parseInt(id_local, 10) || 0;
            },
            screenSize: function (val) {
                try {
                    var result;
                    if ((result = val ? editor.$box.width() : editor.$sc.width()) < 768) {
                        return data.XS;
                    }
                    if (768 <= result && result < 992) {
                        return data.SM;
                    }
                    if (992 <= result && result < 1200) {
                        return data.MD;
                    }
                    if (1200 <= result) {
                        return data.LG;
                    }
                } catch (e) {
                    return data.LG;
                }
            },
            isTouch: function () {
                return "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch;
            },
            sanitizeURL: function (url) {
                return /^(https?:|ftps?:|)\/\//i.test(url) || /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(url) || (new RegExp("^(".concat(data.LinkProtocols.join("|"), "):"), "i")).test(url) ? url : url = encodeURIComponent(url).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi,
                    "blob:").replace(/%3A(\d)/gi, ":$1").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}");
            },
            isArray: function (obj) {
                return obj && !Object.prototype.propertyIsEnumerable.call(obj, "length") && "object" === getTypeOf(obj) && "number" == typeof obj.length;
            },
            RGBToHex: function (r) {
                /**
                 * @param {?} value
                 * @return {?}
                 */
                function pad(value) {
                    return "0".concat(parseInt(value, 10).toString(16)).slice(-2);
                }
                try {
                    return r && "transparent" !== r ? /^#[0-9A-F]{6}$/i.test(r) ? r : (r = r.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), "#".concat(pad(r[1])).concat(pad(r[2])).concat(pad(r[3])).toUpperCase()) : "";
                } catch (e) {
                    return null;
                }
            },
            HEXtoRGB: function (e) {
                e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (canCreateDiscussions, h, s, Q) {
                    return h + h + s + s + Q + Q;
                });
                /** @type {(Array<string>|null)} */
                var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return t ? "rgb(".concat(parseInt(t[1], 16), ", ").concat(parseInt(t[2], 16), ", ").concat(parseInt(t[3], 16), ")") : "";
            },
            isURL: function (url) {
                return !!/^(https?:|ftps?:|)\/\//i.test(url) && (url = String(url).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), (new RegExp("^".concat(data.LinkRegExHTTP).concat(data.LinkRegExEnd, "$"), "gi")).test(url));
            },
            getAlignment: function (element) {
                if (!element.css) {
                    element = $(element);
                }
                var str = (element.css("text-align") || "").replace(/-(.*)-/g, "");
                if (["left", "right", "justify", "center"].indexOf(str) < 0) {
                    if (!type) {
                        var div = $('<div dir="'.concat("rtl" === editor.opts.direction ? "rtl" : "auto", '" style="text-align: ').concat(editor.$el.css("text-align"), '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>'));
                        $("body").first().append(div);
                        var leftDistance = div.find("#s1").get(0).getBoundingClientRect().left;
                        var rightDistance = div.find("#s2").get(0).getBoundingClientRect().left;
                        div.remove();
                        /** @type {string} */
                        type = leftDistance < rightDistance ? "left" : "right";
                    }
                    /** @type {string} */
                    str = type;
                }
                return str;
            },
            scrollTop: function () {
                return editor.o_win.pageYOffset ? editor.o_win.pageYOffset : editor.o_doc.documentElement && editor.o_doc.documentElement.scrollTop ? editor.o_doc.documentElement.scrollTop : editor.o_doc.body.scrollTop ? editor.o_doc.body.scrollTop : 0;
            },
            scrollLeft: function () {
                return editor.o_win.pageXOffset ? editor.o_win.pageXOffset : editor.o_doc.documentElement && editor.o_doc.documentElement.scrollLeft ? editor.o_doc.documentElement.scrollLeft : editor.o_doc.body.scrollLeft ? editor.o_doc.body.scrollLeft : 0;
            },
            isInViewPort: function (item) {
                var positions = item.getBoundingClientRect();
                return 0 <= (positions = {
                    top: Math.round(positions.top),
                    bottom: Math.round(positions.bottom)
                }).top && positions.bottom <= (window.innerHeight || document.documentElement.clientHeight) || positions.top <= 0 && positions.bottom >= (window.innerHeight || document.documentElement.clientHeight);
            }
        };
    };
    /**
     * EVENTS
     * 
     * @param {!Object} self
     * @return {?}
     */
    data.MODULES.events = function (self) {
        /**
         * @param {!Object} target
         * @param {string} n
         * @param {!Function} elem
         * @return {undefined}
         */
        function on(target, n, elem) {
            bind(target, n, elem);
        }
        /**
         * @param {number} new_tracker
         * @return {?}
         */
        function render(new_tracker) {
            if (void 0 === new_tracker && (new_tracker = true), !self.$wp) {
                return false;
            }
            if (self.helpers.isIOS() && self.$win.get(0).focus(), self.core.hasFocus()) {
                return false;
            }
            if (self.selection.isCollapsed() && !self.selection.get().anchorNode) {
                var optionsWrapper = self.$el.find(self.html.blockTagsQuery()).get(0);
                if (optionsWrapper) {
                    $(optionsWrapper).prepend(data.MARKERS);
                    self.selection.restore();
                }
            }
            if (!self.core.hasFocus() && new_tracker) {
                var value = self.$win.scrollTop();
                if (self.browser.msie && self.$box && self.$box.css("position", "fixed"), self.browser.msie && self.$wp && self.$wp.css("overflow", "visible"), self.browser.msie && self.$sc && self.$sc.css("position", "fixed"), self.browser.msie || (removeEventListener(), self.el.focus(), self.events.trigger("focus"), children()), self.browser.msie && self.$sc && self.$sc.css("position", ""), self.browser.msie && self.$box && self.$box.css("position", ""), self.browser.msie && self.$wp && self.$wp.css("overflow",
                    "auto"), value !== self.$win.scrollTop() && self.$win.scrollTop(value), !self.selection.info(self.el).atStart) {
                    return false;
                }
            }
            if (!self.core.hasFocus() || 0 < self.$el.find(".fr-marker").length) {
                return false;
            }
            if (self.selection.info(self.el).atStart && self.selection.isCollapsed() && null !== self.html.defaultTag()) {
                var t = self.markers.insert();
                if (t && !self.node.blockParent(t)) {
                    $(t).remove();
                    var optionsWrapper = self.$el.find(self.html.blockTagsQuery()).get(0);
                    if (optionsWrapper) {
                        $(optionsWrapper).prepend(data.MARKERS);
                        self.selection.restore();
                    }
                } else {
                    if (t) {
                        $(t).remove();
                    }
                }
            }
        }
        /**
         * @return {undefined}
         */
        function children() {
            /** @type {boolean} */
            body = true;
        }
        /**
         * @return {undefined}
         */
        function removeEventListener() {
            /** @type {boolean} */
            body = false;
        }
        /**
         * @return {?}
         */
        function wrap() {
            return body;
        }
        /**
         * @param {string} name
         * @param {!Function} type
         * @param {?} data
         * @return {?}
         */
        function callback(name, type, data) {
            var i;
            var returnedData = name.split(" ");
            if (1 < returnedData.length) {
                /** @type {number} */
                var i = 0;
                for (; i < returnedData.length; i++) {
                    callback(returnedData[i], type, data);
                }
                return true;
            }
            if (void 0 === data) {
                /** @type {boolean} */
                data = false;
            }
            i = 0 !== name.indexOf("shared.") ? (m[name] = m[name] || [], m[name]) : (self.shared._events[name] = self.shared._events[name] || [], self.shared._events[name]);
            if (data) {
                i.unshift(type);
            } else {
                i.push(type);
            }
        }
        /**
         * @param {!Object} e
         * @param {string} type
         * @param {string} name
         * @param {!Function} fn
         * @param {boolean} cb
         * @return {undefined}
         */
        function bind(e, type, name, fn, cb) {
            if ("function" == typeof name) {
                /** @type {!Function} */
                cb = fn;
                /** @type {string} */
                fn = name;
                /** @type {boolean} */
                name = false;
            }
            var results = cb ? self.shared.$_events : items;
            var channel = cb ? self.sid : self.id;
            /** @type {string} */
            var i = "".concat(type.trim().split(" ").join(".ed".concat(channel, " ")), ".ed").concat(channel);
            if (name) {
                e.on(i, name, fn);
            } else {
                e.on(i, fn);
            }
            results.push([e, i]);
        }
        /**
         * @param {!Array} items
         * @return {undefined}
         */
        function remove(items) {
            /** @type {number} */
            var i = 0;
            for (; i < items.length; i++) {
                items[i][0].off(items[i][1]);
            }
        }
        /**
         * @param {string} type
         * @param {!Array} parent
         * @param {boolean} data
         * @return {?}
         */
        function trigger(type, parent, data) {
            if (!self.edit.isDisabled() || data) {
                var t;
                var query;
                if (0 !== type.indexOf("shared.")) {
                    t = m[type];
                } else {
                    if (0 < self.shared.count) {
                        return false;
                    }
                    t = self.shared._events[type];
                }
                if (t) {
                    /** @type {number} */
                    var k = 0;
                    for (; k < t.length; k++) {
                        if (false === (query = t[k].apply(self, parent))) {
                            return false;
                        }
                    }
                }
                return (!self.opts.events || !self.opts.events[type] || false !== (query = self.opts.events[type].apply(self, parent))) && query;
            }
        }
        /**
         * @return {undefined}
         */
        function init() {
            var origin;
            for (origin in m) {
                if (Object.prototype.hasOwnProperty.call(m, origin)) {
                    delete m[origin];
                }
            }
        }
        /**
         * @return {undefined}
         */
        function copy() {
            var event;
            for (event in self.shared._events) {
                if (Object.prototype.hasOwnProperty.call(self.shared._events, event)) {
                    delete self.shared._events[event];
                }
            }
        }
        var body;
        var $ = self.$;
        var m = {};
        /** @type {boolean} */
        var number = false;
        /** @type {!Array} */
        var items = [];
        return {
            _init: function () {
                self.shared.$_events = self.shared.$_events || [];
                self.shared._events = {};
                if (self.helpers.isMobile()) {
                    /** @type {string} */
                    self._mousedown = "touchstart";
                    /** @type {string} */
                    self._mouseup = "touchend";
                    /** @type {string} */
                    self._move = "touchmove";
                    /** @type {string} */
                    self._mousemove = "touchmove";
                } else {
                    /** @type {string} */
                    self._mousedown = "mousedown";
                    /** @type {string} */
                    self._mouseup = "mouseup";
                    /** @type {string} */
                    self._move = "";
                    /** @type {string} */
                    self._mousemove = "mousemove";
                }
                on(self.$el, "click mouseup mousemove mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function (data) {
                    trigger(data.type, [data]);
                });
                callback("mousedown", function () {
                    /** @type {number} */
                    var i = 0;
                    for (; i < data.INSTANCES.length; i++) {
                        if (data.INSTANCES[i] !== self && data.INSTANCES[i].popups && data.INSTANCES[i].popups.areVisible()) {
                            data.INSTANCES[i].$el.find(".fr-marker").remove();
                        }
                    }
                });
                on(self.$win, self._mousedown, function (object) {
                    trigger("window.mousedown", [object]);
                    children();
                });
                on(self.$win, self._mouseup, function (object) {
                    trigger("window.mouseup", [object]);
                });
                on(self.$win, "cut copy keydown keyup touchmove touchend", function (object) {
                    trigger("window.".concat(object.type), [object]);
                });
                on(self.$doc, "dragend drop", function (object) {
                    trigger("document.".concat(object.type), [object]);
                });
                on(self.$el, "keydown keypress keyup input", function (data) {
                    trigger(data.type, [data]);
                });
                on(self.$el, "focus", function (data) {
                    if (wrap()) {
                        render(false);
                        if (false === number) {
                            trigger(data.type, [data]);
                        }
                    }
                });
                on(self.$el, "blur", function (data) {
                    if (wrap() && true === number) {
                        trigger(data.type, [data]);
                        children();
                    }
                });
                bind(self.$el, "mousedown", '[contenteditable="true"]', function () {
                    removeEventListener();
                    self.$el.blur();
                });
                callback("focus", function () {
                    /** @type {boolean} */
                    number = true;
                });
                callback("blur", function () {
                    /** @type {boolean} */
                    number = false;
                });
                children();
                on(self.$el, "cut copy paste beforepaste", function (data) {
                    trigger(data.type, [data]);
                });
                callback("destroy", init);
                callback("shared.destroy", copy);
            },
            on: callback,
            trigger: trigger,
            bindClick: function (el, name, cb) {
                bind(el, self._mousedown, name, function (alreadyFailedWithException) {
                    if (!self.edit.isDisabled()) {
                        (function (e) {
                            var $input = $(e.currentTarget);
                            if (self.edit.isDisabled() || self.node.hasClass($input.get(0), "fr-disabled")) {
                                e.preventDefault();
                            } else {
                                if (!("mousedown" === e.type && 1 !== e.which)) {
                                    if (!self.helpers.isMobile()) {
                                        e.preventDefault();
                                    }
                                    if ((self.helpers.isAndroid() || self.helpers.isWindowsPhone()) && 0 === $input.parents(".fr-dropdown-menu").length) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }
                                    $input.addClass("fr-selected");
                                    self.events.trigger("commands.mousedown", [$input]);
                                }
                            }
                        })(alreadyFailedWithException);
                    }
                }, true);
                bind(el, "".concat(self._mouseup, " ").concat(self._move), name, function (alreadyFailedWithException) {
                    if (!self.edit.isDisabled()) {
                        (function (e, callback) {
                            var $elem = $(e.currentTarget);
                            if (self.edit.isDisabled() || self.node.hasClass($elem.get(0), "fr-disabled")) {
                                return e.preventDefault(), false;
                            }
                            if ("mouseup" === e.type && 1 !== e.which) {
                                return true;
                            }
                            if (self.button.getButtons(".fr-selected", true).get(0) == $elem.get(0) && !self.node.hasClass($elem.get(0), "fr-selected")) {
                                return true;
                            }
                            if ("touchmove" !== e.type) {
                                if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !self.node.hasClass($elem.get(0), "fr-selected")) {
                                    return self.button.getButtons(".fr-selected", true).removeClass("fr-selected"), false;
                                }
                                if (self.button.getButtons(".fr-selected", true).removeClass("fr-selected"), $elem.data("dragging") || $elem.attr("disabled")) {
                                    return $elem.removeData("dragging"), false;
                                }
                                var ontimeout = $elem.data("timeout");
                                if (ontimeout) {
                                    clearTimeout(ontimeout);
                                    $elem.removeData("timeout");
                                }
                                callback.apply(self, [e]);
                            } else {
                                if (!$elem.data("timeout")) {
                                    $elem.data("timeout", setTimeout(function () {
                                        $elem.data("dragging", true);
                                    }, 100));
                                }
                            }
                        })(alreadyFailedWithException, cb);
                    }
                }, true);
                bind(el, "mousedown click mouseup", name, function (event) {
                    if (!self.edit.isDisabled()) {
                        event.stopPropagation();
                    }
                }, true);
                callback("window.mouseup", function () {
                    if (!self.edit.isDisabled()) {
                        el.find(name).removeClass("fr-selected");
                        children();
                    }
                });
                bind(el, "mouseover", name, function () {
                    if ($(this).hasClass("fr-options")) {
                        $(this).prev(".fr-btn").addClass("fr-btn-hover");
                    }
                    if ($(this).next(".fr-btn").hasClass("fr-options")) {
                        $(this).next(".fr-btn").addClass("fr-btn-hover");
                    }
                });
                bind(el, "mouseout", name, function () {
                    if ($(this).hasClass("fr-options")) {
                        $(this).prev(".fr-btn").removeClass("fr-btn-hover");
                    }
                    if ($(this).next(".fr-btn").hasClass("fr-options")) {
                        $(this).next(".fr-btn").removeClass("fr-btn-hover");
                    }
                });
            },
            disableBlur: removeEventListener,
            enableBlur: children,
            blurActive: wrap,
            focus: render,
            chainTrigger: function (type, n, froot) {
                if (!self.edit.isDisabled() || froot) {
                    var t;
                    var body;
                    if (0 !== type.indexOf("shared.")) {
                        t = m[type];
                    } else {
                        if (0 < self.shared.count) {
                            return false;
                        }
                        t = self.shared._events[type];
                    }
                    if (t) {
                        /** @type {number} */
                        var k = 0;
                        for (; k < t.length; k++) {
                            if (void 0 !== (body = t[k].apply(self, [n]))) {
                                n = body;
                            }
                        }
                    }
                    return self.opts.events && self.opts.events[type] && void 0 !== (body = self.opts.events[type].apply(self, [n])) && (n = body), n;
                }
            },
            $on: bind,
            $off: function () {
                remove(items);
                /** @type {!Array} */
                items = [];
                if (0 === self.shared.count) {
                    remove(self.shared.$_events);
                    /** @type {!Array} */
                    self.shared.$_events = [];
                }
            }
        };
    };
    Object.assign(data.DEFAULTS, {
        indentMargin: 20
    });
    /////////////
    // COMMANDS
    /////////////
    data.COMMANDS = {
        bold: {
            title: `Bold (${-1 !== navigator.userAgent.indexOf("Mac OS X") ? "\u2318" : "Ctrl"}+B)`,
            toggle: true,
            refresh: function ($btn) {
                var disabled = this.format.is("strong") || this.format.is("b");
                $btn.toggleClass("fr-active", disabled).attr("aria-pressed", disabled);
            }
        },
        italic: {
            title: `Italic (${-1 !== navigator.userAgent.indexOf("Mac OS X") ? "\u2318" : "Ctrl"}+I)`,
            toggle: true,
            refresh: function ($btn) {
                var disabled = this.format.is("em") || this.format.is("i");
                $btn.toggleClass("fr-active", disabled).attr("aria-pressed", disabled);
            }
        },
        underline: {
            title: `Underline (${-1 !== navigator.userAgent.indexOf("Mac OS X") ? "\u2318" : "Ctrl"}+U)`,
            toggle: true,
            refresh: function ($btn) {
                var disabled = this.format.is("u");
                $btn.toggleClass("fr-active", disabled).attr("aria-pressed", disabled);
            }
        },
        strikeThrough: {
            title: "Strikethrough",
            toggle: true,
            refresh: function ($btn) {
                var disabled = this.format.is("s");
                $btn.toggleClass("fr-active", disabled).attr("aria-pressed", disabled);
            }
        },
        subscript: {
            title: "Subscript",
            toggle: true,
            refresh: function ($btn) {
                var disabled = this.format.is("sub");
                $btn.toggleClass("fr-active", disabled).attr("aria-pressed", disabled);
            }
        },
        superscript: {
            title: "Superscript",
            toggle: true,
            refresh: function ($btn) {
                var disabled = this.format.is("sup");
                $btn.toggleClass("fr-active", disabled).attr("aria-pressed", disabled);
            }
        },
        outdent: {
            title: `Decrease Indent (${-1 !== navigator.userAgent.indexOf("Mac OS X") ? "\u2318" : "Ctrl"}+[)`
        },
        indent: {
            title: `Increase Indent (${-1 !== navigator.userAgent.indexOf("Mac OS X") ? "\u2318" : "Ctrl"}+])`
        },
        undo: {
            title: "Undo",
            undo: false,
            forcedRefresh: true,
            disabled: true
        },
        redo: {
            title: "Redo",
            undo: false,
            forcedRefresh: true,
            disabled: true
        },
        insertHR: {
            title: `Insert Horizontal Line (${-1 !== navigator.userAgent.indexOf("Mac OS X") ? "\u2318" : "Ctrl"}+K)`
        },
        clearFormatting: {
            title: "Clear Formatting"
        },
        selectAll: {
            title: "Select All",
            undo: false
        },
        moreText: {
            title: "More Text",
            undo: false
        },
        moreParagraph: {
            title: "More Paragraph",
            undo: false
        },
        moreRich: {
            title: "More Rich",
            undo: false
        },
        moreMisc: {
            title: "More Misc",
            undo: false
        }
    };
    /**
     * @param {?} command
     * @param {?} isDown
     * @return {undefined}
     */
    data.RegisterCommand = function (command, isDown) {
        data.COMMANDS[command] = isDown;
    };
    /**
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.commands = function (editor) {
        /**
         * @param {string} val
         * @return {?}
         */
        function refresh(val) {
            return editor.html.defaultTag() && (val = "<".concat(editor.html.defaultTag(), ">").concat(val, "</").concat(editor.html.defaultTag(), ">")), val;
        }
        /**
         * @param {?} c
         * @return {undefined}
         */
        function toggle(c) {
            !function (el) {
                var n = editor.$tb.find('.fr-more-toolbar[data-name="'.concat(el.attr("data-group-name"), '"]'));
                editor.$tb.find(".fr-open").not(el).removeClass("fr-open");
                el.toggleClass("fr-open");
                editor.$tb.find(".fr-more-toolbar").removeClass("fr-overflow-visible");
                if (editor.$tb.find(".fr-expanded").not(n).length) {
                    editor.$tb.find(".fr-expanded").toggleClass("fr-expanded");
                    n.toggleClass("fr-expanded");
                } else {
                    n.toggleClass("fr-expanded");
                    editor.$box.toggleClass("fr-toolbar-open");
                    editor.$tb.toggleClass("fr-toolbar-open");
                }
            }(editor.$tb.find("[data-cmd=".concat(c, "]")));
            editor.toolbar.setMoreToolbarsHeight();
        }
        /**
         * @param {!Object} index
         * @param {!Function} callback
         * @return {undefined}
         */
        function render(index, callback) {
            if (false !== editor.events.trigger("commands.before", $.merge([index], callback || []))) {
                var onEngineLoad = data.COMMANDS[index] && data.COMMANDS[index].callback || tags[index];
                /** @type {boolean} */
                var doFocus = true;
                /** @type {boolean} */
                var l = false;
                if (data.COMMANDS[index]) {
                    if (void 0 !== data.COMMANDS[index].focus) {
                        doFocus = data.COMMANDS[index].focus;
                    }
                    if (void 0 !== data.COMMANDS[index].accessibilityFocus) {
                        l = data.COMMANDS[index].accessibilityFocus;
                    }
                }
                if (!editor.core.hasFocus() && doFocus && !editor.popups.areVisible() || !editor.core.hasFocus() && l && editor.accessibility.hasFocus()) {
                    editor.events.focus(true);
                }
                if (data.COMMANDS[index] && false !== data.COMMANDS[index].undo) {
                    if (editor.$el.find(".fr-marker").length) {
                        editor.events.disableBlur();
                        editor.selection.restore();
                    }
                    editor.undo.saveStep();
                }
                if (onEngineLoad) {
                    onEngineLoad.apply(editor, $.merge([index], callback || []));
                }
                editor.events.trigger("commands.after", $.merge([index], callback || []));
                if (data.COMMANDS[index] && false !== data.COMMANDS[index].undo) {
                    editor.undo.saveStep();
                }
            }
        }
        /**
         * @param {string} name
         * @param {string} type
         * @return {undefined}
         */
        function execCommand(name, type) {
            editor.format.toggle(type);
        }
        /**
         * @param {number} i
         * @return {undefined}
         */
        function init(i) {
            editor.selection.save();
            editor.html.wrap(true, true, true, true);
            editor.selection.restore();
            var stars = editor.selection.blocks();
            /** @type {number} */
            var j = 0;
            for (; j < stars.length; j++) {
                if ("LI" !== stars[j].tagName || "LI" !== stars[j].parentNode.tagName) {
                    var target = $(stars[j]);
                    if ("LI" != stars[j].tagName && "LI" == stars[j].parentNode.tagName) {
                        target = $(stars[j].parentNode);
                    }
                    /** @type {string} */
                    var a = "rtl" === editor.opts.direction || "rtl" === target.css("direction") ? "margin-right" : "margin-left";
                    var gridLeft = editor.helpers.getPX(target.css(a));
                    if (target.width() < 2 * editor.opts.indentMargin && 0 < i) {
                        continue;
                    }
                    if ("UL" != stars[j].parentNode.tagName && "OL" != stars[j].parentNode.tagName && "LI" != stars[j].parentNode.tagName) {
                        target.css(a, Math.max(gridLeft + i * editor.opts.indentMargin, 0) || "");
                    }
                    target.removeClass("fr-temp-div");
                }
            }
            editor.selection.save();
            editor.html.unwrap();
            editor.selection.restore();
        }
        /**
         * @param {string} element
         * @return {?}
         */
        function action(element) {
            return function () {
                render(element);
            };
        }
        var $ = editor.$;
        var tags = {
            bold: function () {
                execCommand("bold", ["strong", "b"]);
            },
            subscript: function () {
                if (editor.format.is("sup")) {
                    editor.format.remove("sup");
                }
                execCommand("subscript", "sub");
            },
            superscript: function () {
                if (editor.format.is("sub")) {
                    editor.format.remove("sub");
                }
                execCommand("superscript", "sup");
            },
            italic: function () {
                execCommand("italic", ["em", "i"]);
            },
            strikeThrough: function () {
                execCommand("strikeThrough", "s");
            },
            underline: function () {
                execCommand("underline", "u");
            },
            undo: function () {
                editor.undo.run();
            },
            redo: function () {
                editor.undo.redo();
            },
            indent: function () {
                init(1);
            },
            outdent: function () {
                init(-1);
            },
            show: function () {
                if (editor.opts.toolbarInline) {
                    editor.toolbar.showInline(null, true);
                }
            },
            insertHR: function () {
                editor.selection.remove();
                /** @type {string} */
                var c = "";
                if (editor.core.isEmpty()) {
                    c = refresh(c = "<br>");
                }
                editor.html.insert('<hr id="fr-just" class="fr-just">'.concat(c));
                var i;
                var a = editor.$el.find("hr#fr-just").length ? editor.$el.find("hr#fr-just") : editor.$el.find(".fr-just");
                if (a.removeAttr("id"), a.removeAttr("class"), 0 === a.next().length) {
                    var s = editor.html.defaultTag();
                    if (s) {
                        a.after($(editor.doc.createElement(s)).append("<br>").get(0));
                    } else {
                        a.after("<br>");
                    }
                }
                if (a.prev().is("hr")) {
                    i = editor.selection.setAfter(a.get(0), false);
                } else {
                    if (a.next().is("hr")) {
                        i = editor.selection.setBefore(a.get(0), false);
                    } else {
                        if (!editor.selection.setAfter(a.get(0), false)) {
                            editor.selection.setBefore(a.get(0), false);
                        }
                    }
                }
                if (!(i || void 0 === i)) {
                    c = refresh(c = "".concat(data.MARKERS, "<br>"));
                    a.after(c);
                }
                editor.selection.restore();
            },
            clearFormatting: function () {
                editor.format.remove();
            },
            selectAll: function () {
                editor.doc.execCommand("selectAll", false, false);
            },
            moreText: function (left) {
                toggle(left);
            },
            moreParagraph: function (left) {
                toggle(left);
            },
            moreRich: function (left) {
                toggle(left);
            },
            moreMisc: function (left) {
                toggle(left);
            }
        };
        var copy = {};
        var key;
        for (key in tags) {
            if (Object.prototype.hasOwnProperty.call(tags, key)) {
                copy[key] = action(key);
            }
        }
        return Object.assign(copy, {
            exec: render,
            _init: function () {
                editor.events.on("keydown", function (event) {
                    var oDom = editor.selection.element();
                    if (oDom && "HR" === oDom.tagName && !editor.keys.isArrow(event.which)) {
                        return event.preventDefault(), false;
                    }
                });
                editor.events.on("keyup", function (event) {
                    var node = editor.selection.element();
                    if (node && "HR" === node.tagName) {
                        if (event.which === data.KEYCODE.ARROW_LEFT || event.which === data.KEYCODE.ARROW_UP) {
                            if (node.previousSibling) {
                                return editor.node.isBlock(node.previousSibling) ? editor.selection.setAtEnd(node.previousSibling) : $(node).before(data.MARKERS), editor.selection.restore(), false;
                            }
                        } else {
                            if ((event.which === data.KEYCODE.ARROW_RIGHT || event.which === data.KEYCODE.ARROW_DOWN) && node.nextSibling) {
                                return editor.node.isBlock(node.nextSibling) ? editor.selection.setAtStart(node.nextSibling) : $(node).after(data.MARKERS), editor.selection.restore(), false;
                            }
                        }
                    }
                });
                editor.events.on("mousedown", function (event) {
                    if (event.target && "HR" === event.target.tagName) {
                        return event.preventDefault(), event.stopPropagation(), false;
                    }
                });
                editor.events.on("mouseup", function () {
                    var node = editor.selection.element();
                    if (node === editor.selection.endElement() && node && "HR" === node.tagName) {
                        if (node.nextSibling) {
                            if (editor.node.isBlock(node.nextSibling)) {
                                editor.selection.setAtStart(node.nextSibling);
                            } else {
                                $(node).after(data.MARKERS);
                            }
                        }
                        editor.selection.restore();
                    }
                });
            }
        });
    };
    /**
     * CURSOR LISTS
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.cursorLists = function (editor) {
        /**
         * @param {!Object} elem
         * @return {?}
         */
        function get(elem) {
            /** @type {!Object} */
            var t = elem;
            for (; "LI" !== t.tagName;) {
                t = t.parentNode;
            }
            return t;
        }
        /**
         * @param {?} object
         * @return {?}
         */
        function append(object) {
            var item = object;
            for (; !editor.node.isList(item);) {
                item = item.parentNode;
            }
            return item;
        }
        var $ = editor.$;
        return {
            _startEnter: function (parent) {
                var el;
                var element = get(parent);
                var s = element.nextSibling;
                var p = element.previousSibling;
                var selected = editor.html.defaultTag();
                if (editor.node.isEmpty(element, true) && s) {
                    /** @type {string} */
                    var name = "";
                    /** @type {string} */
                    var x = "";
                    var node = parent.parentNode;
                    for (; !editor.node.isList(node) && node.parentNode && ("LI" !== node.parentNode.tagName || node.parentNode === element);) {
                        name = editor.node.openTagString(node) + name;
                        x = x + editor.node.closeTagString(node);
                        node = node.parentNode;
                    }
                    name = editor.node.openTagString(node) + name;
                    x = x + editor.node.closeTagString(node);
                    var u;
                    /** @type {string} */
                    u = node.parentNode && "LI" === node.parentNode.tagName ? "".concat(x, "<li>").concat(data.MARKERS, "<br>").concat(name) : selected ? "".concat(x, "<").concat(selected, ">").concat(data.MARKERS, "<br></").concat(selected, ">").concat(name) : "".concat(x + data.MARKERS, "<br>").concat(name);
                    for (; ["UL", "OL"].indexOf(node.tagName) < 0 || node.parentNode && "LI" === node.parentNode.tagName;) {
                        node = node.parentNode;
                    }
                    $(element).replaceWith('<span id="fr-break"></span>');
                    var r = editor.node.openTagString(node) + $(node).html() + editor.node.closeTagString(node);
                    r = r.replace(/<span id="fr-break"><\/span>/g, u);
                    $(node).replaceWith(r);
                    editor.$el.find("li:empty").remove();
                } else {
                    if (p && s || !editor.node.isEmpty(element, true)) {
                        /** @type {string} */
                        var name = "<br>";
                        var node = parent.parentNode;
                        for (; node && "LI" !== node.tagName;) {
                            name = editor.node.openTagString(node) + name + editor.node.closeTagString(node);
                            node = node.parentNode;
                        }
                        $(element).before("<li>".concat(name, "</li>"));
                        $(parent).remove();
                    } else {
                        if (p) {
                            el = append(element);
                            /** @type {string} */
                            var result = "".concat(data.MARKERS, "<br>");
                            var node = parent.parentNode;
                            for (; node && "LI" !== node.tagName;) {
                                result = editor.node.openTagString(node) + result + editor.node.closeTagString(node);
                                node = node.parentNode;
                            }
                            if (el.parentNode && "LI" === el.parentNode.tagName) {
                                $(el.parentNode).after("<li>".concat(result, "</li>"));
                            } else {
                                if (selected) {
                                    $(el).after("<".concat(selected, ">").concat(result, "</").concat(selected, ">"));
                                } else {
                                    $(el).after(result);
                                }
                            }
                            $(element).remove();
                        } else {
                            if ((el = append(element)).parentNode && "LI" === el.parentNode.tagName) {
                                if (s) {
                                    $(el.parentNode).before("".concat(editor.node.openTagString(element) + data.MARKERS, "<br></li>"));
                                } else {
                                    $(el.parentNode).after("".concat(editor.node.openTagString(element) + data.MARKERS, "<br></li>"));
                                }
                            } else {
                                if (selected) {
                                    $(el).before("<".concat(selected, ">").concat(data.MARKERS, "<br></").concat(selected, ">"));
                                } else {
                                    $(el).before("".concat(data.MARKERS, "<br>"));
                                }
                            }
                            $(element).remove();
                        }
                    }
                }
            },
            _middleEnter: function (container) {
                var parent = get(container);
                /** @type {string} */
                var k = "";
                var node = container;
                /** @type {string} */
                var d = "";
                /** @type {string} */
                var s = "";
                /** @type {boolean} */
                var element = false;
                for (; node !== parent;) {
                    /** @type {string} */
                    var value = "A" === (node = node.parentNode).tagName && editor.cursor.isAtEnd(container, node) ? "fr-to-remove" : "";
                    if (!(element || node == parent || editor.node.isBlock(node))) {
                        /** @type {boolean} */
                        element = true;
                        /** @type {string} */
                        d = d + data.INVISIBLE_SPACE;
                    }
                    d = editor.node.openTagString($(node).clone().addClass(value).get(0)) + d;
                    s = editor.node.closeTagString(node) + s;
                }
                /** @type {string} */
                k = s + k + d + data.MARKERS + (editor.opts.keepFormatOnDelete ? data.INVISIBLE_SPACE : "");
                $(container).replaceWith('<span id="fr-break"></span>');
                var url = editor.node.openTagString(parent) + $(parent).html() + editor.node.closeTagString(parent);
                url = url.replace(/<span id="fr-break"><\/span>/g, k);
                $(parent).replaceWith(url);
            },
            _endEnter: function (node) {
                var container = get(node);
                /** @type {string} */
                var i = data.MARKERS;
                /** @type {string} */
                var s = "";
                var target = node;
                /** @type {boolean} */
                var id = false;
                for (; target !== container;) {
                    if (!(target = target.parentNode).classList.contains("fr-img-space-wrap") && !target.classList.contains("fr-img-space-wrap2")) {
                        /** @type {string} */
                        var value = "A" === target.tagName && editor.cursor.isAtEnd(node, target) ? "fr-to-remove" : "";
                        if (!(id || target === container || editor.node.isBlock(target))) {
                            /** @type {boolean} */
                            id = true;
                            /** @type {string} */
                            s = s + data.INVISIBLE_SPACE;
                        }
                        s = editor.node.openTagString($(target).clone().addClass(value).get(0)) + s;
                        i = i + editor.node.closeTagString(target);
                    }
                }
                var x = s + i;
                $(node).remove();
                $(container).after(x);
            },
            _backspace: function (target) {
                var node = get(target);
                var element = node.previousSibling;
                if (element) {
                    element = $(element).find(editor.html.blockTagsQuery()).get(-1) || element;
                    $(target).replaceWith(data.MARKERS);
                    var elements = editor.node.contents(element);
                    if (elements.length && "BR" === elements[elements.length - 1].tagName) {
                        $(elements[elements.length - 1]).remove();
                    }
                    $(node).find(editor.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                        if (this.parentNode === node) {
                            $(this).replaceWith($(this).html() + (editor.node.isEmpty(this) ? "" : "<br>"));
                        }
                    });
                    var c;
                    var b = editor.node.contents(node)[0];
                    for (; b && !editor.node.isList(b);) {
                        c = b.nextSibling;
                        $(element).append(b);
                        b = c;
                    }
                    element = node.previousSibling;
                    for (; b;) {
                        c = b.nextSibling;
                        $(element).append(b);
                        b = c;
                    }
                    if (1 < (elements = editor.node.contents(element)).length && "BR" === elements[elements.length - 1].tagName) {
                        $(elements[elements.length - 1]).remove();
                    }
                    $(node).remove();
                } else {
                    var el = append(node);
                    if ($(target).replaceWith(data.MARKERS), el.parentNode && "LI" === el.parentNode.tagName) {
                        var target = el.previousSibling;
                        if (editor.node.isBlock(target)) {
                            $(node).find(editor.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                                if (this.parentNode === node) {
                                    $(this).replaceWith($(this).html() + (editor.node.isEmpty(this) ? "" : "<br>"));
                                }
                            });
                            $(target).append($(node).html());
                        } else {
                            $(el).before($(node).html());
                        }
                    } else {
                        var item2 = editor.html.defaultTag();
                        if (item2 && 0 === $(node).find(editor.html.blockTagsQuery()).length) {
                            $(el).before("<".concat(item2, ">").concat($(node).html(), "</").concat(item2, ">"));
                        } else {
                            $(el).before($(node).html());
                        }
                    }
                    $(node).remove();
                    editor.html.wrap();
                    if (0 === $(el).find("li").length) {
                        $(el).remove();
                    }
                }
            },
            _del: function (key) {
                var elements;
                var element = get(key);
                var node = element.nextSibling;
                if (node) {
                    if ((elements = editor.node.contents(node)).length && "BR" === elements[0].tagName) {
                        $(elements[0]).remove();
                    }
                    $(node).find(editor.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                        if (this.parentNode === node) {
                            $(this).replaceWith($(this).html() + (editor.node.isEmpty(this) ? "" : "<br>"));
                        }
                    });
                    var n;
                    /** @type {!Object} */
                    var target = key;
                    var list = editor.node.contents(node)[0];
                    for (; list && !editor.node.isList(list);) {
                        n = list.nextSibling;
                        $(target).after(list);
                        target = list;
                        list = n;
                    }
                    for (; list;) {
                        n = list.nextSibling;
                        $(element).append(list);
                        list = n;
                    }
                    $(key).replaceWith(data.MARKERS);
                    $(node).remove();
                } else {
                    var node = element;
                    for (; !node.nextSibling && node !== editor.el;) {
                        node = node.parentNode;
                    }
                    if (node === editor.el) {
                        return false;
                    }
                    if (node = node.nextSibling, editor.node.isBlock(node)) {
                        if (data.NO_DELETE_TAGS.indexOf(node.tagName) < 0) {
                            $(key).replaceWith(data.MARKERS);
                            if ((elements = editor.node.contents(element)).length && "BR" === elements[elements.length - 1].tagName) {
                                $(elements[elements.length - 1]).remove();
                            }
                            $(element).append($(node).html());
                            $(node).remove();
                        }
                    } else {
                        if ((elements = editor.node.contents(element)).length && "BR" === elements[elements.length - 1].tagName) {
                            $(elements[elements.length - 1]).remove();
                        }
                        $(key).replaceWith(data.MARKERS);
                        for (; node && !editor.node.isBlock(node) && "BR" !== node.tagName;) {
                            $(element).append($(node));
                            node = node.nextSibling;
                        }
                        $(node).remove();
                    }
                }
            }
        };
    };
    /** @type {!Array} */
    data.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"];
    /** @type {!Array} */
    data.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"];
    /**
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.cursor = function (editor) {
        /**
         * @param {!Object} node
         * @return {?}
         */
        function walk(node) {
            return !!node && (!!editor.node.isBlock(node) || (node.nextSibling && node.nextSibling.nodeType === Node.TEXT_NODE && 0 === node.nextSibling.textContent.replace(/\u200b/g, "").length ? walk(node.nextSibling) : !(node.nextSibling && (!node.previousSibling || "BR" !== node.nextSibling.tagName || node.nextSibling.nextSibling)) && walk(node.parentNode)));
        }
        /**
         * @param {!Object} target
         * @return {?}
         */
        function find(target) {
            return !!target && (!!editor.node.isBlock(target) || (target.previousSibling && target.previousSibling.nodeType === Node.TEXT_NODE && 0 === target.previousSibling.textContent.replace(/\u200b/g, "").length ? find(target.previousSibling) : !target.previousSibling && (!(target.previousSibling || !editor.node.hasClass(target.parentNode, "fr-inner")) || find(target.parentNode))));
        }
        /**
         * @param {!Node} obj
         * @param {?} node
         * @return {?}
         */
        function get(obj, node) {
            return !!obj && obj !== editor.$wp.get(0) && (obj.previousSibling && obj.previousSibling.nodeType === Node.TEXT_NODE && 0 === obj.previousSibling.textContent.replace(/\u200b/g, "").length ? get(obj.previousSibling, node) : !obj.previousSibling && (obj.parentNode === node || get(obj.parentNode, node)));
        }
        /**
         * @param {!Node} obj
         * @param {?} target
         * @return {?}
         */
        function wrap(obj, target) {
            return !!obj && obj !== editor.$wp.get(0) && (obj.nextSibling && obj.nextSibling.nodeType === Node.TEXT_NODE && 0 === obj.nextSibling.textContent.replace(/\u200b/g, "").length ? wrap(obj.nextSibling, target) : !(obj.nextSibling && (!obj.previousSibling || "BR" !== obj.nextSibling.tagName || obj.nextSibling.nextSibling)) && (obj.parentNode === target || wrap(obj.parentNode, target)));
        }
        /**
         * @param {!Object} node
         * @return {?}
         */
        function filter(node) {
            return 0 < $(node).parentsUntil(editor.$el, "LI").length && 0 === $(node).parentsUntil("LI", "TABLE").length;
        }
        /**
         * @param {string} css
         * @param {string} prefix
         * @return {?}
         */
        function check(css, prefix) {
            /** @type {!RegExp} */
            var re = new RegExp("".concat(prefix ? "^" : "", "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})").concat(prefix ? "" : "$"), "i");
            var res = css.match(re);
            return res ? res[0].length : 1;
        }
        /**
         * @param {!Object} n
         * @return {?}
         */
        function parse(n) {
            var nodes;
            /** @type {!Object} */
            var node = n;
            for (; !node.previousSibling;) {
                if (node = node.parentNode, editor.node.isElement(node)) {
                    return false;
                }
            }
            node = node.previousSibling;
            var tagWhitelist = editor.opts.htmlAllowedEmptyTags;
            var tag = node.tagName && node.tagName.toLowerCase();
            if ((!editor.node.isBlock(node) || node.lastChild && tag && 0 <= tagWhitelist.indexOf(tag)) && editor.node.isEditable(node)) {
                nodes = editor.node.contents(node);
                for (; node.nodeType !== Node.TEXT_NODE && !editor.node.isDeletable(node) && nodes.length && editor.node.isEditable(node);) {
                    node = nodes[nodes.length - 1];
                    nodes = editor.node.contents(node);
                }
                if (node.nodeType === Node.TEXT_NODE) {
                    var result = node.textContent;
                    var resultLength = result.length;
                    if (result.length && "\n" === result[result.length - 1]) {
                        return node.textContent = result.substring(0, resultLength - 2), 0 === node.textContent.length && node.parentNode.removeChild(node), parse(n);
                    }
                    if (editor.opts.tabSpaces && result.length >= editor.opts.tabSpaces && 0 === result.substr(result.length - editor.opts.tabSpaces, result.length - 1).replace(/ /g, "").replace(new RegExp(data.UNICODE_NBSP, "g"), "").length) {
                        /** @type {number} */
                        resultLength = result.length - editor.opts.tabSpaces + 1;
                    }
                    node.textContent = result.substring(0, resultLength - check(result));
                    if (editor.opts.htmlUntouched && !n.nextSibling && node.textContent.length && " " === node.textContent[node.textContent.length - 1]) {
                        /** @type {string} */
                        node.textContent = node.textContent.substring(0, node.textContent.length - 1) + data.UNICODE_NBSP;
                    }
                    /** @type {boolean} */
                    var p = result.length !== node.textContent.length;
                    if (0 === node.textContent.length) {
                        if (p && editor.opts.keepFormatOnDelete) {
                            $(node).after(data.INVISIBLE_SPACE + data.MARKERS);
                        } else {
                            if (0 !== result.length && editor.node.isBlock(node.parentNode)) {
                                $(node).after(data.MARKERS);
                            } else {
                                if ((2 != node.parentNode.childNodes.length || node.parentNode != n.parentNode) && 1 != node.parentNode.childNodes.length || editor.node.isBlock(node.parentNode) || editor.node.isElement(node.parentNode) || !editor.node.isDeletable(node.parentNode)) {
                                    var h;
                                    var tmpNode = node;
                                    for (; !editor.node.isElement(node.parentNode) && editor.node.isEmpty(node.parentNode) && data.NO_DELETE_TAGS.indexOf(node.parentNode.tagName) < 0;) {
                                        if ("A" === (node = node.parentNode).tagName) {
                                            var block = node.childNodes[0];
                                            $(node).before(block);
                                            /** @type {boolean} */
                                            h = true;
                                            for (; 0 < block.childNodes.length;) {
                                                block = block.childNodes[0];
                                            }
                                            node.parentNode.removeChild(node);
                                            node = block;
                                            break;
                                        }
                                    }
                                    if (!h) {
                                        node = tmpNode;
                                    }
                                    $(node).after(data.MARKERS);
                                    if (editor.node.isElement(node.parentNode) && !n.nextSibling && node.previousSibling && "BR" === node.previousSibling.tagName) {
                                        $(n).after("<br>");
                                    }
                                    var m = node.parentNode;
                                    node.parentNode.removeChild(node);
                                    if (editor.node.isEmpty(m)) {
                                        $(m).html(data.INVISIBLE_SPACE + data.MARKERS);
                                    }
                                } else {
                                    $(node.parentNode).after(data.MARKERS);
                                    $(node.parentNode).remove();
                                }
                            }
                        }
                    } else {
                        $(node).after(data.MARKERS);
                    }
                } else {
                    if (editor.node.isDeletable(node)) {
                        $(node).after(data.MARKERS);
                        $(node).remove();
                    } else {
                        if (n.nextSibling && "BR" === n.nextSibling.tagName && editor.node.isVoid(node) && "BR" !== node.tagName) {
                            $(n.nextSibling).remove();
                            $(n).replaceWith(data.MARKERS);
                        } else {
                            if (false !== editor.events.trigger("node.remove", [$(node)])) {
                                $(node).after(data.MARKERS);
                                $(node).remove();
                            }
                        }
                    }
                }
            } else {
                if (data.NO_DELETE_TAGS.indexOf(node.tagName) < 0 && (editor.node.isEditable(node) || editor.node.isDeletable(node))) {
                    if (editor.node.isDeletable(node)) {
                        $(n).replaceWith(data.MARKERS);
                        $(node).remove();
                    } else {
                        if (editor.node.isEmpty(node) && !editor.node.isList(node)) {
                            $(node).remove();
                            $(n).replaceWith(data.MARKERS);
                        } else {
                            if (editor.node.isList(node)) {
                                node = $(node).find("li").last().get(0);
                            }
                            if ((nodes = editor.node.contents(node)) && "BR" === nodes[nodes.length - 1].tagName) {
                                $(nodes[nodes.length - 1]).remove();
                            }
                            nodes = editor.node.contents(node);
                            for (; nodes && editor.node.isBlock(nodes[nodes.length - 1]);) {
                                node = nodes[nodes.length - 1];
                                nodes = editor.node.contents(node);
                            }
                            $(node).append(data.MARKERS);
                            /** @type {!Object} */
                            var target = n;
                            for (; !target.previousSibling;) {
                                target = target.parentNode;
                            }
                            for (; target && "BR" !== target.tagName && !editor.node.isBlock(target);) {
                                var curEl = target;
                                target = target.nextSibling;
                                $(node).append(curEl);
                            }
                            if (target && "BR" === target.tagName) {
                                $(target).remove();
                            }
                            $(n).remove();
                        }
                    }
                } else {
                    if (n.nextSibling && "BR" === n.nextSibling.tagName) {
                        $(n.nextSibling).remove();
                    }
                }
            }
            return true;
        }
        /**
         * @param {!Object} target
         * @return {undefined}
         */
        function init(target) {
            /** @type {boolean} */
            var o = 0 < $(target).parentsUntil(editor.$el, "BLOCKQUOTE").length;
            var element = editor.node.deepestParent(target, [], !o);
            if (element && "BLOCKQUOTE" === element.tagName) {
                var next = editor.node.deepestParent(target, [$(target).parentsUntil(editor.$el, "BLOCKQUOTE").get(0)]);
                if (next && next.nextSibling) {
                    element = next;
                }
            }
            if (null !== element) {
                var elements;
                var node = element.nextSibling;
                if (editor.node.isBlock(element) && (editor.node.isEditable(element) || editor.node.isDeletable(element)) && node && data.NO_DELETE_TAGS.indexOf(node.tagName) < 0) {
                    if (editor.node.isDeletable(node)) {
                        $(node).remove();
                        $(target).replaceWith(data.MARKERS);
                    } else {
                        if (editor.node.isBlock(node) && editor.node.isEditable(node)) {
                            if (editor.node.isList(node)) {
                                if (editor.node.isEmpty(element, true)) {
                                    $(element).remove();
                                    $(node).find("li").first().prepend(data.MARKERS);
                                } else {
                                    var c = $(node).find("li").first();
                                    if ("BLOCKQUOTE" === element.tagName && (elements = editor.node.contents(element)).length && editor.node.isBlock(elements[elements.length - 1])) {
                                        element = elements[elements.length - 1];
                                    }
                                    if (0 === c.find("ul, ol").length) {
                                        $(target).replaceWith(data.MARKERS);
                                        c.find(editor.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                                            if (this.parentNode === c.get(0)) {
                                                $(this).replaceWith($(this).html() + (editor.node.isEmpty(this) ? "" : "<br>"));
                                            }
                                        });
                                        $(element).append(editor.node.contents(c.get(0)));
                                        c.remove();
                                        if (0 === $(node).find("li").length) {
                                            $(node).remove();
                                        }
                                    }
                                }
                            } else {
                                if ((elements = editor.node.contents(node)).length && "BR" === elements[0].tagName && $(elements[0]).remove(), "BLOCKQUOTE" !== node.tagName && "BLOCKQUOTE" === element.tagName) {
                                    elements = editor.node.contents(element);
                                    for (; elements.length && editor.node.isBlock(elements[elements.length - 1]);) {
                                        element = elements[elements.length - 1];
                                        elements = editor.node.contents(element);
                                    }
                                } else {
                                    if ("BLOCKQUOTE" === node.tagName && "BLOCKQUOTE" !== element.tagName) {
                                        elements = editor.node.contents(node);
                                        for (; elements.length && editor.node.isBlock(elements[0]);) {
                                            node = elements[0];
                                            elements = editor.node.contents(node);
                                        }
                                    }
                                }
                                $(target).replaceWith(data.MARKERS);
                                $(element).append(node.innerHTML);
                                $(node).remove();
                            }
                        } else {
                            $(target).replaceWith(data.MARKERS);
                            for (; node && "BR" !== node.tagName && !editor.node.isBlock(node) && editor.node.isEditable(node);) {
                                var selectedNode = node;
                                node = node.nextSibling;
                                $(element).append(selectedNode);
                            }
                            if (node && "BR" === node.tagName && editor.node.isEditable(node)) {
                                $(node).remove();
                            }
                        }
                    }
                }
            }
        }
        /**
         * @return {undefined}
         */
        function set() {
            var eiFrame = editor.el.querySelectorAll("blockquote:empty");
            /** @type {number} */
            var i = 0;
            for (; i < eiFrame.length; i++) {
                eiFrame[i].parentNode.removeChild(eiFrame[i]);
            }
        }
        /**
         * @param {!Element} el
         * @param {boolean} fn
         * @param {boolean} name
         * @return {?}
         */
        function render(el, fn, name) {
            var category;
            var target = editor.node.deepestParent(el, [], !name);
            if (target && "BLOCKQUOTE" === target.tagName) {
                return wrap(el, target) ? (category = editor.html.defaultTag(), fn ? $(el).replaceWith("<br>" + data.MARKERS) : category ? $(target).after("<".concat(category, ">").concat(data.MARKERS, "<br></").concat(category, ">")) : $(target).after("".concat(data.MARKERS, "<br>")), $(el).remove()) : insert(el, fn, name), false;
            }
            if (null === target) {
                if ((category = editor.html.defaultTag()) && editor.node.isElement(el.parentNode)) {
                    $(el).replaceWith("<".concat(category, ">").concat(data.MARKERS, "<br></").concat(category, ">"));
                } else {
                    if (!el.previousSibling || $(el.previousSibling).is("br") || el.nextSibling) {
                        $(el).replaceWith("<br>".concat(data.MARKERS));
                    } else {
                        $(el).replaceWith("<br>".concat(data.MARKERS, "<br>"));
                    }
                }
            } else {
                /** @type {!Element} */
                var node = el;
                /** @type {string} */
                var d = "";
                if (!("PRE" != target.tagName || el.nextSibling)) {
                    /** @type {boolean} */
                    fn = true;
                }
                if (!(editor.node.isBlock(target) && !fn)) {
                    /** @type {string} */
                    d = "<br/>";
                }
                var r;
                /** @type {string} */
                var s = "";
                /** @type {string} */
                var result = "";
                /** @type {string} */
                var newStr = "";
                /** @type {string} */
                var questions = "";
                if ((category = editor.html.defaultTag()) && editor.node.isBlock(target)) {
                    /** @type {string} */
                    newStr = "<".concat(category, ">");
                    /** @type {string} */
                    questions = "</".concat(category, ">");
                    if (target.tagName === category.toUpperCase()) {
                        newStr = editor.node.openTagString($(target).clone().removeAttr("id").get(0));
                    }
                }
                do {
                    if (node = node.parentNode, !fn || node !== target || fn && !editor.node.isBlock(target)) {
                        if (s = s + editor.node.closeTagString(node), node === target && editor.node.isBlock(target)) {
                            result = newStr + result;
                        } else {
                            /** @type {string} */
                            var value = ("A" === node.tagName || editor.node.hasClass(node, "fa")) && wrap(el, node) ? "fr-to-remove" : "";
                            result = editor.node.openTagString($(node).clone().addClass(value).get(0)) + result;
                        }
                    }
                } while (node !== target);
                /** @type {string} */
                d = s + d + result + (el.parentNode === target && editor.node.isBlock(target) ? "" : data.INVISIBLE_SPACE) + data.MARKERS;
                if (editor.node.isBlock(target) && !$(target).find("*").last().is("br")) {
                    $(target).append("<br/>");
                }
                $(el).after('<span id="fr-break"></span>');
                $(el).remove();
                if (!(target.nextSibling && !editor.node.isBlock(target.nextSibling) || editor.node.isBlock(target))) {
                    $(target).after("<br>");
                }
                r = (r = !fn && editor.node.isBlock(target) ? editor.node.openTagString(target) + $(target).html() + questions : editor.node.openTagString(target) + $(target).html() + editor.node.closeTagString(target)).replace(/<span id="fr-break"><\/span>/g, d);
                $(target).replaceWith(r);
            }
        }
        /**
         * @param {!Element} e
         * @param {boolean} object
         * @param {boolean} s
         * @return {undefined}
         */
        function insert(e, object, s) {
            var node = editor.node.deepestParent(e, [], !s);
            if (null === node) {
                if (editor.html.defaultTag() && e.parentNode === editor.el) {
                    $(e).replaceWith("<".concat(editor.html.defaultTag(), ">").concat(data.MARKERS, "<br></").concat(editor.html.defaultTag(), ">"));
                } else {
                    if (!(e.nextSibling && !editor.node.isBlock(e.nextSibling))) {
                        $(e).after("<br>");
                    }
                    $(e).replaceWith("<br>".concat(data.MARKERS));
                }
            } else {
                if (e.previousSibling && "IMG" == e.previousSibling.tagName || e.nextSibling && "IMG" == e.nextSibling.tagName) {
                    $(e).replaceWith("<" + editor.html.defaultTag() + ">" + data.MARKERS + "<br></" + editor.html.defaultTag() + ">");
                } else {
                    /** @type {!Element} */
                    var i = e;
                    /** @type {string} */
                    var d = "";
                    if ("PRE" === node.tagName) {
                        /** @type {boolean} */
                        object = true;
                    }
                    if (!(editor.node.isBlock(node) && !object)) {
                        /** @type {string} */
                        d = "<br>";
                    }
                    /** @type {string} */
                    var id = "";
                    /** @type {string} */
                    var b = "";
                    do {
                        var a = i;
                        if (i = i.parentNode, "BLOCKQUOTE" === node.tagName && editor.node.isEmpty(a) && !editor.node.hasClass(a, "fr-marker") && $(a).contains(e) && $(a).after(e), "BLOCKQUOTE" !== node.tagName || !wrap(e, i) && !get(e, i)) {
                            if (!object || i !== node || object && !editor.node.isBlock(node)) {
                                id = id + editor.node.closeTagString(i);
                                /** @type {string} */
                                var vid = "A" == i.tagName && wrap(e, i) || editor.node.hasClass(i, "fa") ? "fr-to-remove" : "";
                                b = editor.node.openTagString($(i).clone().addClass(vid).removeAttr("id").get(0)) + b;
                            } else {
                                if ("BLOCKQUOTE" == node.tagName && object) {
                                    /** @type {string} */
                                    b = id = "";
                                }
                            }
                        }
                    } while (i !== node);
                    var details = node === e.parentNode && editor.node.isBlock(node) || e.nextSibling;
                    if ("BLOCKQUOTE" === node.tagName) {
                        if (e.previousSibling && editor.node.isBlock(e.previousSibling) && e.nextSibling && "BR" === e.nextSibling.tagName && ($(e.nextSibling).after(e), e.nextSibling && "BR" === e.nextSibling.tagName && $(e.nextSibling).remove()), object) {
                            /** @type {string} */
                            d = id + d + data.MARKERS + b;
                        } else {
                            var extraParams = editor.html.defaultTag();
                            /** @type {string} */
                            d = "".concat(id + d + (extraParams ? "<".concat(extraParams, ">") : "") + data.MARKERS, "<br>").concat(extraParams ? "</".concat(extraParams, ">") : "").concat(b);
                        }
                    } else {
                        /** @type {string} */
                        d = id + d + b + (details ? "" : data.INVISIBLE_SPACE) + data.MARKERS;
                    }
                    $(e).replaceWith('<span id="fr-break"></span>');
                    var n = editor.node.openTagString(node) + $(node).html() + editor.node.closeTagString(node);
                    n = n.replace(/<span id="fr-break"><\/span>/g, d);
                    $(node).replaceWith(n);
                }
            }
        }
        var $ = editor.$;
        return {
            enter: function (name) {
                var el = editor.markers.insert();
                if (!el) {
                    return true;
                }
                var node = el.parentNode;
                for (; node && !editor.node.isElement(node);) {
                    if ("false" === node.getAttribute("contenteditable")) {
                        return $(el).replaceWith(data.MARKERS), editor.selection.restore(), false;
                    }
                    if ("true" === node.getAttribute("contenteditable")) {
                        break;
                    }
                    node = node.parentNode;
                }
                editor.el.normalize();
                /** @type {boolean} */
                var view = false;
                if (0 < $(el).parentsUntil(editor.$el, "BLOCKQUOTE").length) {
                    /** @type {boolean} */
                    view = true;
                }
                if ($(el).parentsUntil(editor.$el, "TD, TH").length) {
                    /** @type {boolean} */
                    view = false;
                }
                if (walk(el)) {
                    if (!filter(el) || name || view) {
                        render(el, name, view);
                    } else {
                        editor.cursorLists._endEnter(el);
                    }
                } else {
                    if (find(el)) {
                        if (!filter(el) || name || view) {
                            (function init(item, target, callback) {
                                var options;
                                var node = editor.node.deepestParent(item, [], !callback);
                                if (node && "TABLE" === node.tagName) {
                                    return $(node).find("td, th").first().prepend(item), init(item, target, callback);
                                }
                                if (node && "BLOCKQUOTE" === node.tagName) {
                                    if (get(item, node)) {
                                        if (!target) {
                                            return (options = editor.html.defaultTag()) ? $(node).before("<".concat(options, ">").concat(data.MARKERS, "<br></").concat(options, ">")) : $(node).before("".concat(data.MARKERS, "<br>")), $(item).remove(), false;
                                        }
                                    } else {
                                        if (wrap(item, node)) {
                                            render(item, target, true);
                                        } else {
                                            insert(item, target, true);
                                        }
                                    }
                                }
                                if (null === node) {
                                    if ((options = editor.html.defaultTag()) && editor.node.isElement(item.parentNode)) {
                                        $(item).replaceWith("<".concat(options, ">").concat(data.MARKERS, "<br></").concat(options, ">"));
                                    } else {
                                        $(item).replaceWith("<br>".concat(data.MARKERS));
                                    }
                                } else {
                                    if (options = editor.html.defaultTag(), editor.node.isBlock(node)) {
                                        if ("PRE" === node.tagName && (target = true), target) {
                                            $(item).remove();
                                            $(node).prepend("<br>".concat(data.MARKERS));
                                        } else {
                                            if (item.nextSibling && "IMG" == item.nextSibling.tagName || item.nextSibling && item.nextSibling.nextElementSibling && "IMG" == item.nextSibling.nextElementSibling) {
                                                $(item).replaceWith("<" + editor.html.defaultTag() + ">" + data.MARKERS + "<br></" + editor.html.defaultTag() + ">");
                                            } else {
                                                if (editor.node.isEmpty(node, true)) {
                                                    return render(item, target, callback);
                                                }
                                                if (editor.opts.keepFormatOnDelete || "DIV" === node.tagName || "div" === editor.html.defaultTag()) {
                                                    if (!editor.opts.keepFormatOnDelete && "DIV" === node.tagName || "div" === editor.html.defaultTag()) {
                                                        $(node).before("<" + editor.html.defaultTag() + "><br></" + editor.html.defaultTag() + ">");
                                                    } else {
                                                        /** @type {!Element} */
                                                        var parent = item;
                                                        /** @type {string} */
                                                        var file = data.INVISIBLE_SPACE;
                                                        for (; parent !== node && !editor.node.isElement(parent);) {
                                                            parent = parent.parentNode;
                                                            file = editor.node.openTagString(parent) + file + editor.node.closeTagString(parent);
                                                        }
                                                        $(node).before(file);
                                                    }
                                                } else {
                                                    $(node).before("".concat(editor.node.openTagString($(node).clone().removeAttr("id").get(0)), "<br>").concat(editor.node.closeTagString(node)));
                                                }
                                            }
                                        }
                                    } else {
                                        $(node).before("<br>");
                                    }
                                    $(item).remove();
                                }
                            })(el, name, view);
                        } else {
                            editor.cursorLists._startEnter(el);
                        }
                    } else {
                        if (!filter(el) || name || view) {
                            insert(el, name, view);
                        } else {
                            editor.cursorLists._middleEnter(el);
                        }
                    }
                }
                editor.$el.find(".fr-to-remove").each(function () {
                    var options = editor.node.contents(this);
                    /** @type {number} */
                    var i = 0;
                    for (; i < options.length; i++) {
                        if (options[i].nodeType === Node.TEXT_NODE) {
                            options[i].textContent = options[i].textContent.replace(/\u200B/g, "");
                        }
                    }
                    $(this).replaceWith(this.innerHTML);
                });
                editor.html.fillEmptyBlocks(true);
                if (!editor.opts.htmlUntouched) {
                    editor.html.cleanEmptyTags();
                    editor.clean.lists();
                    editor.spaces.normalizeAroundCursor();
                }
                editor.selection.restore();
                var h = editor.o_win.innerHeight;
                if (editor.$oel[0].offsetHeight > h) {
                    var min_y = editor.helpers.scrollTop();
                    var $previousSiblingTr = editor.selection.blocks();
                    if ($previousSiblingTr && 0 < $previousSiblingTr.length && $previousSiblingTr[0].offsetTop) {
                        var max_y = $previousSiblingTr[0].offsetTop;
                        if (h - 100 < max_y - min_y) {
                            editor.o_win.scroll(0, max_y - h + 120);
                        } else {
                            if (max_y - min_y < 0) {
                                editor.o_win.scroll(0, max_y - 20);
                            }
                        }
                    }
                }
            },
            backspace: function () {
                /** @type {boolean} */
                var ret = false;
                var target = editor.markers.insert();
                if (!target) {
                    return true;
                }
                var node = target.parentNode;
                for (; node && !editor.node.isElement(node);) {
                    if ("false" === node.getAttribute("contenteditable")) {
                        return $(target).replaceWith(data.MARKERS), editor.selection.restore(), false;
                    }
                    if (node.innerText.length && "true" === node.getAttribute("contenteditable")) {
                        break;
                    }
                    node = node.parentNode;
                }
                editor.el.normalize();
                var input = target.previousSibling;
                if (input) {
                    var str = input.textContent;
                    if (str && str.length && 8203 === str.charCodeAt(str.length - 1)) {
                        if (1 === str.length) {
                            $(input).remove();
                        } else {
                            input.textContent = input.textContent.substr(0, str.length - check(str));
                        }
                    }
                }
                return walk(target) ? filter(target) && get(target, $(target).parents("li").first().get(0)) ? editor.cursorLists._backspace(target) : ret = parse(target) : find(target) ? filter(target) && get(target, $(target).parents("li").first().get(0)) ? editor.cursorLists._backspace(target) : function (parent) {
                    /** @type {boolean} */
                    var o = 0 < $(parent).parentsUntil(editor.$el, "BLOCKQUOTE").length;
                    var element = editor.node.deepestParent(parent, [], !o);
                    var el = element;
                    for (; element && !element.previousSibling && "BLOCKQUOTE" !== element.tagName && element.parentElement !== editor.el && !editor.node.hasClass(element.parentElement, "fr-inner") && data.SIMPLE_ENTER_TAGS.indexOf(element.parentElement.tagName) < 0;) {
                        element = element.parentElement;
                    }
                    if (element && "BLOCKQUOTE" === element.tagName) {
                        var start = editor.node.deepestParent(parent, [$(parent).parentsUntil(editor.$el, "BLOCKQUOTE").get(0)]);
                        if (start && start.previousSibling) {
                            el = element = start;
                        }
                    }
                    if (null !== element) {
                        var nodes;
                        var node = element.previousSibling;
                        if (editor.node.isBlock(element) && editor.node.isEditable(element)) {
                            if (node && data.NO_DELETE_TAGS.indexOf(node.tagName) < 0) {
                                if (editor.node.isDeletable(node)) {
                                    $(node).remove();
                                    $(parent).replaceWith(data.MARKERS);
                                } else {
                                    if (editor.node.isEditable(node)) {
                                        if (editor.node.isBlock(node)) {
                                            if (editor.node.isEmpty(node) && !editor.node.isList(node)) {
                                                $(node).remove();
                                                $(parent).after(editor.opts.keepFormatOnDelete ? data.INVISIBLE_SPACE : "");
                                            } else {
                                                if (editor.node.isList(node) && (node = $(node).find("li").last().get(0)), (nodes = editor.node.contents(node)).length && "BR" === nodes[nodes.length - 1].tagName && $(nodes[nodes.length - 1]).remove(), "BLOCKQUOTE" === node.tagName && "BLOCKQUOTE" !== element.tagName) {
                                                    nodes = editor.node.contents(node);
                                                    for (; nodes.length && editor.node.isBlock(nodes[nodes.length - 1]);) {
                                                        node = nodes[nodes.length - 1];
                                                        nodes = editor.node.contents(node);
                                                    }
                                                } else {
                                                    if ("BLOCKQUOTE" !== node.tagName && "BLOCKQUOTE" === el.tagName) {
                                                        nodes = editor.node.contents(el);
                                                        for (; nodes.length && editor.node.isBlock(nodes[0]);) {
                                                            el = nodes[0];
                                                            nodes = editor.node.contents(el);
                                                        }
                                                    }
                                                }
                                                if (editor.node.isEmpty(element)) {
                                                    $(parent).remove();
                                                    editor.selection.setAtEnd(node, true);
                                                } else {
                                                    $(parent).replaceWith(data.MARKERS);
                                                    var tabElements = node.childNodes;
                                                    if (editor.node.isBlock(tabElements[tabElements.length - 1])) {
                                                        $(tabElements[tabElements.length - 1]).append(el.innerHTML);
                                                    } else {
                                                        $(node).append(el.innerHTML);
                                                    }
                                                }
                                                $(el).remove();
                                                if (editor.node.isEmpty(element)) {
                                                    $(element).remove();
                                                }
                                            }
                                        } else {
                                            $(parent).replaceWith(data.MARKERS);
                                            if ("BLOCKQUOTE" === element.tagName && node.nodeType === Node.ELEMENT_NODE) {
                                                $(node).remove();
                                            } else {
                                                $(node).after(editor.node.isEmpty(element) ? "" : $(element).html());
                                                $(element).remove();
                                                if ("BR" === node.tagName) {
                                                    $(node).remove();
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (!node) {
                                    if (element && "BLOCKQUOTE" === element.tagName && 0 === $(element).text().replace(/\u200B/g, "").length) {
                                        $(element).remove();
                                    } else {
                                        if (editor.node.isEmpty(element) && element.parentNode && editor.node.isEditable(element.parentNode) && element.parentNode != editor.el) {
                                            $(element.parentNode).remove();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }(target) : ret = parse(target), $(target).remove(), set(), editor.html.fillEmptyBlocks(true), editor.opts.htmlUntouched || (editor.html.cleanEmptyTags(), editor.clean.lists(), editor.spaces.normalizeAroundCursor()), editor.selection.restore(), ret;
            },
            del: function () {
                var target = editor.markers.insert();
                if (!target) {
                    return false;
                }
                if (editor.el.normalize(), walk(target)) {
                    if (filter(target)) {
                        if (0 === $(target).parents("li").first().find("ul, ol").length) {
                            editor.cursorLists._del(target);
                        } else {
                            var _ref = $(target).parents("li").first().find("ul, ol").first().find("li").first();
                            (_ref = _ref.find(editor.html.blockTagsQuery()).get(-1) || _ref).prepend(target);
                            editor.cursorLists._backspace(target);
                        }
                    } else {
                        init(target);
                    }
                } else {
                    find(target);
                    (function (target) {
                        var nodes;
                        /** @type {!Object} */
                        var node = target;
                        for (; !node.nextSibling;) {
                            if (node = node.parentNode, editor.node.isElement(node)) {
                                return false;
                            }
                        }
                        if ("BR" === (node = node.nextSibling).tagName && editor.node.isEditable(node)) {
                            if (node.nextSibling) {
                                if (editor.node.isBlock(node.nextSibling) && editor.node.isEditable(node.nextSibling)) {
                                    if (!(data.NO_DELETE_TAGS.indexOf(node.nextSibling.tagName) < 0)) {
                                        return void $(node).remove();
                                    }
                                    node = node.nextSibling;
                                    $(node.previousSibling).remove();
                                }
                            } else {
                                if (walk(node)) {
                                    return void (filter(target) ? editor.cursorLists._del(target) : editor.node.deepestParent(node) && ((!editor.node.isEmpty(editor.node.blockParent(node)) || (editor.node.blockParent(node).nextSibling && data.NO_DELETE_TAGS.indexOf(editor.node.blockParent(node).nextSibling.tagName)) < 0) && $(node).remove(), init(target)));
                                }
                            }
                        }
                        if (!editor.node.isBlock(node) && editor.node.isEditable(node)) {
                            nodes = editor.node.contents(node);
                            for (; node.nodeType !== Node.TEXT_NODE && nodes.length && !editor.node.isDeletable(node) && editor.node.isEditable(node);) {
                                node = nodes[0];
                                nodes = editor.node.contents(node);
                            }
                            if (node.nodeType === Node.TEXT_NODE) {
                                $(node).before(data.MARKERS);
                                if (node.textContent.length) {
                                    node.textContent = node.textContent.substring(check(node.textContent, true), node.textContent.length);
                                }
                            } else {
                                if (editor.node.isDeletable(node) || false !== editor.events.trigger("node.remove", [$(node)])) {
                                    $(node).before(data.MARKERS);
                                    $(node).remove();
                                }
                            }
                            $(target).remove();
                        } else {
                            if (data.NO_DELETE_TAGS.indexOf(node.tagName) < 0 && (editor.node.isEditable(node) || editor.node.isDeletable(node))) {
                                if (editor.node.isDeletable(node)) {
                                    $(target).replaceWith(data.MARKERS);
                                    $(node).remove();
                                } else {
                                    if (editor.node.isList(node)) {
                                        if (target.previousSibling) {
                                            $(node).find("li").first().prepend(target);
                                            editor.cursorLists._backspace(target);
                                        } else {
                                            $(node).find("li").first().prepend(data.MARKERS);
                                            $(target).remove();
                                        }
                                    } else {
                                        if ((nodes = editor.node.contents(node)) && "BR" === nodes[0].tagName && $(nodes[0]).remove(), nodes && "BLOCKQUOTE" === node.tagName) {
                                            var node = nodes[0];
                                            $(target).before(data.MARKERS);
                                            for (; node && "BR" !== node.tagName;) {
                                                var temp = node;
                                                node = node.nextSibling;
                                                $(target).before(temp);
                                            }
                                            if (node && "BR" === node.tagName) {
                                                $(node).remove();
                                            }
                                        } else {
                                            $(target).after($(node).html()).after(data.MARKERS);
                                            $(node).remove();
                                        }
                                    }
                                }
                            }
                        }
                    })(target);
                }
                $(target).remove();
                set();
                editor.html.fillEmptyBlocks(true);
                if (!editor.opts.htmlUntouched) {
                    editor.html.cleanEmptyTags();
                    editor.clean.lists();
                }
                editor.spaces.normalizeAroundCursor();
                editor.selection.restore();
            },
            isAtEnd: wrap,
            isAtStart: get
        };
    };
    /**
     * DATA MODULE
     * 
     * @param {!Object} data
     * @return {?}
     */
    data.MODULES.data = function (data) {
        /**
         * @param {number} trendId
         * @return {?}
         */
        function load(trendId) {
            var lineText = trendId.toString();
            /** @type {number} */
            var w = 0;
            /** @type {number} */
            var index = 0;
            for (; index < lineText.length; index++) {
                /** @type {number} */
                w = w + parseInt(lineText.charAt(index), 10);
            }
            return 10 < w ? w % 9 + 1 : w;
        }
        /**
         * @param {number} x
         * @param {number} y
         * @param {number} level
         * @return {?}
         */
        function bind(x, y, level) {
            /** @type {number} */
            var adjustedLevel = Math.abs(level);
            for (; 0 < adjustedLevel--;) {
                /** @type {number} */
                x = x - y;
            }
            return level < 0 && (x = x + 123), x;
        }
        /**
         * @param {!Object} message
         * @return {?}
         */
        function fn(message) {
            return message && "block" !== message.css("display") || message && 0 === data.helpers.getPX(message.css("height")) ? (message.remove(), true) : !(!message || "absolute" !== message.css("position") && "fixed" !== message.css("position") || (message.remove(), 0));
        }
        /**
         * @param {boolean} content
         * @return {?}
         */
        function reply(content) {
            return content && 0 === data.$box.find(content).length;
        }
        /**
         * @return {?}
         */
        function _init() {
            if (10 < m && (data[get("0ppecjvc==")](), setTimeout(function () {
                /** @type {null} */
                $.FE = null;
            }, 10)), !data.$box) {
                return false;
            }
            data.$wp.prepend(get(get(state)));
            body = data.$wp.find("> div").first();
            msg = body.find("> a");
            if ("rtl" === data.opts.direction) {
                body.css("left", "auto").css("right", 0).attr("direction", "rtl");
            }
            m++;
        }
        /**
         * @param {!Object} type
         * @return {?}
         */
        function getValue(type) {
            /** @type {!Array} */
            var variables = [get("9qqG-7amjlwq=="), get("KA3B3C2A6D1D5H5H1A3=="), get("3B9B3B5F3C4G3E3=="), get("QzbzvxyB2yA-9m=="), get("ji1kacwmgG5bc=="), get("nmA-13aogi1A3c1jd=="), get("BA9ggq=="), get("emznbjbH3fij=="), get("tkC-22d1qC-13sD1wzF-7=="), get("tA3jjf=="), get("1D1brkm==")];
            /** @type {number} */
            var i = 0;
            for (; i < variables.length; i++) {
                if (String.prototype.endsWith || (String.prototype.endsWith = function (str, len) {
                    return (void 0 === len || len > this.length) && (len = this.length), this.substring(len - str.length, len) === str;
                }), type.endsWith(variables[i])) {
                    return true;
                }
            }
            return false;
        }
        /**
         * @return {?}
         */
        function cb() {
            var parent = get(first);
            var easing = get("tzgatD-13eD1dtdrvmF3c1nrC-7saQcdav==").split(".");
            try {
                return window.parent.document.querySelector(parent) && window[easing[1]][easing[2]];
            } catch (e) {
                return false;
            }
        }
        var body;
        var msg;
        var $ = data.$;
        /** @type {string} */
        var PARSE_HEADER = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2FC1A3NB2IF1HE1TH4WB8eB-11zVG2F3I3yYB5ZG4CB2DA15CC5AD3F1A1KG1oLA10B1A6wQF1H3vgale2C4F4XA2qc2A5D5B3pepmriKB3OE1HD1fUC10pjD-11E-11TB4YJ3bC-16zE-11yc1B2CE2BC3jhjKC1pdA-21OA6C1D5B-8vF4QA11pD6sqf1C3lldA-16BD4A2H3qoEA7bB-16rmNH5H1F1vSB7RE2A3TH4YC5A5b1A4d1B3whepyAC3AA2zknC3mbgf1SC4WH4PD8TC5ZB2C3H3jb2A5ZA2EF2aoFC5qqHC4B1H1zeGA7UA5RF4TA29TA6ZC4d1C3hyWA10A3rBB2E3decorationRD3QC10UD3E6E6ZD2F3F3fme2E5uxxrEC9C3E4fB-11azhHB1LD7D6VF4VVTPC6b1C4TYG3qzDD6B3B3AH4I2H2kxbHE1JD1yihfd1QD6WB1D4mhrc1B5rvFG3A14A7cDA2OC1AA1JB5zC-16KA6WB4C-8wvlTB5A5lkZB2C2C7zynBD2D2bI-7C-21d1HE2cubyvPC8A6VB3aroxxZE4C4F4e1I2BE1WjdifH1H4A14NA1GB1YG-10tWA3A14A9sVA2C5XH2A29b2A6gsleGG2jaED2D-13fhE1OA8NjwytyTD4e1sc1D-16ZC3B5C-9e1C2FB6EFF5B2C2JH4E1C2tdLE5A3UG4G-7b2D3B4fA-9oh1G3kqvB4AG3ibnjcAC6D2B1cDA9KC2QA6bRC4VA30RB8hYB2A4A-8h1A21A2B2==";
        /** @type {string} */
        var first = "MekC-11nB-8tIzpD7pewxvzC6mD-16xerg1==";
        /** @type {string} */
        var state = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2EE1MA2ND1KD1IE4cA-21pSD2D5ve1G3h1A8b1E5ZC3CD2FA16mC5OC5E1hpnG1NA10B1D7hkUD4I-7b2C3C5nXD2E3F3whidEC2EH3GI2mJE2E2bxci1WA10VC7pllSG2F3A7xd1A4ZC3DB2aaeGA2DE4H2E1j1ywD-13FD1A3VE4WA3D8C6wuc1A2hf1B5B7vnrrjA1B9ic1mpbD1oMB1iSB7rWC4RI4G-7upB6jd1A2F3H2EA4FD3kDF4A2moc1anJD1TD4VI4b2C7oeQF4c1E3XC7ZA3C3G3uDB2wGB6D1JC4D1JD4C1hTE6QC5pH4pD3C-22D7c1A3textAA4gdlB2mpozkmhNC1mrxA3yWA5edhg1I2H3B7ozgmvAI3I2B5GD1LD2RSNH1KA1XA5SB4PA3sA9tlmC-9tnf1G3nd1coBH4I2I2JC3C-16LE6A1tnUA3vbwQB1G3f1A20a3A8a1C6pxAB2eniuE1F3kH2lnjB2hB-16XA5PF1G4zwtYA5B-11mzTG2B9pHB3BE2hGH3B3B2cMD5C1F1wzPA8E7VG5H5vD3H-7C8tyvsVF2I1G2A5fE3bg1mgajoyxMA4fhuzSD8aQB2B4g1A20ukb1A4B3F3GG2CujjanIC1ObiB11SD1C5pWC1D4YB8YE5FE-11jXE2F-7jB4CC2G-10uLH4E1C2tA-13yjUH5d1H1A7sWD5E4hmjF-7pykafoGA16hDD4joyD-8OA33B3C2tC7cRE4SA31a1B8d1e2A4F4g1A2A22CC5zwlAC2C1A12==";
        var s = function () {
            /** @type {number} */
            var e = 0;
            /** @type {string} */
            var name = document.domain;
            /** @type {!Array<string>} */
            var charListNotLatin = name.split(".");
            /** @type {string} */
            var x = "_gd".concat((new Date).getTime());
            for (; e < charListNotLatin.length - 1 && -1 === document.cookie.indexOf("".concat(x, "=").concat(x));) {
                /** @type {string} */
                name = charListNotLatin.slice(-1 - ++e).join(".");
                /** @type {string} */
                document.cookie = "".concat(x, "=").concat(x, ";domain=").concat(name, ";");
            }
            return document.cookie = "".concat(x, "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=").concat(name, ";"), (name || "").replace(/(^\.*)|(\.*$)/g, "");
        }();
        /**
         * @param {string} s
         * @return {?}
         */
        var get = function (s) {
            if (!s) {
                return s;
            }
            /** @type {string} */
            var re = "";
            /** @type {number} */
            var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(s[0]);
            /** @type {number} */
            var i = 1;
            for (; i < s.length - 2; i++) {
                var data = load(++o);
                var p = s.charCodeAt(i);
                /** @type {string} */
                var out = "";
                for (; /[0-9-]/.test(s[i + 1]);) {
                    out = out + s[++i];
                }
                p = bind(p, data, out = parseInt(out, 10) || 0);
                /** @type {number} */
                p = p ^ o - 1 & 31;
                /** @type {string} */
                re = re + String.fromCharCode(p);
            }
            return re;
        };
        /** @type {number} */
        var m = 0;
        return {
            _init: function () {
                var elems = data.opts.key || [""];
                var dirtyMap = get("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9==");
                if ("string" == typeof elems) {
                    /** @type {!Array} */
                    elems = [elems];
                }
                var exp;
                var match;
                var notProcessed;
                /** @type {boolean} */
                var srcThumb = !(data.ul = true);
                /** @type {number} */
                var newNodeLists = 0;
                /** @type {number} */
                var i = 0;
                for (; i < elems.length; i++) {
                    /** @type {!Array} */
                    var _ref4 = (match = elems[i], 4 === (notProcessed = (get(match) || "").split("|")).length && "V3" === notProcessed[0] ? [notProcessed[1], notProcessed[3], notProcessed[2]] : [null, null, ""]);
                    var b = _ref4[2];
                    if (b === get(get("LGnD1KNZf1CPBYCAZB-8F3UDSLLSG1VFf1A3C2==")) || 0 <= b.indexOf(s, b.length - s.length) || getValue(s) || cb()) {
                        if (null !== (exp = _ref4[1]) && !(0 == exp.indexOf("TRIAL") ? (exp = new Date(exp.replace(/TRIAL/, "")), new Date(exp) < new Date && (PARSE_HEADER = "7D4YH4fkhHB3pqDC3H2E1fkMD1IB1NF1D3QD9wB5rxqlh1A8c2B4ZA3FD2AA6FB5EB3jJG4D2J-7aC-21GB6PC5RE4TC11QD6XC4XE3XH3mlvnqjbaOA2OC2BE6A1fmI-7ujwbc1G5f1F3e1C11mXF4owBG3E1yD1E4F1D2D-8B-8C-7yC-22HD1MF5UE4cWA3D8D6a1B2C3H3a3I3sZA4B3A2akfwEB3xHD5D1F1wIC11pA-16xdxtVI2C9A6YC4a1A2F3B2GA6B4C3lsjyJB1eMA1D-11MF5PE4ja1D3D7byrf1C3e1C7D-16lwqAF3H2A1B-21wNE1MA1OG1HB2A-16tSE5UD4RB3icRA4F-10wtwzBB3E1C3CC2DA8LA2LA1EB1kdH-8uVB7decorg1J2B7B6qjrqGI2J1C6ijehIB1hkemC-13hqkrH4H-7QD6XF5XF3HLNAC3CB2aD2CD2KB10B4ycg1A-8KA4H4B11jVB5TC4yqpB-21pd1E4pedzGB6MD5B3ncB-7MA4LD2JB6PD5uH-8TB9C7YD5XD2E3I3jmiDB3zeimhLD8E2F2JC1H-9ivkPC5lG-10SB1D3H3A-21rc1A3d1E3fsdqwfGA2KA1OrC-22LA6D1B4afUB16SC7AitC-8qYA11fsxcajGA15avjNE2A-9h1hDB16B9tPC1C5F5UC1G3B8d2A5d1D4RnHJ3C3JB5D3ucMG1yzD-17hafjC-8VD3yWC6e1YD2H3ZE2C8C5oBA3H3D2vFA4WzJC4C2i1A-65fNB8afWA1H4A26mvkC-13ZB3E3h1A21BC4eFB2GD2AA5ghqND2A2B2==",
                            1)) : new Date(exp) < new Date(get("lC4B3A3B2B5A1C2E4G1A2=="))) || !(0 < (s || "").length) || getValue(s) || cb()) {
                            /** @type {boolean} */
                            data.ul = false;
                            break;
                        }
                        /** @type {boolean} */
                        srcThumb = true;
                        state = PARSE_HEADER;
                        newNodeLists = _ref4[0] || -1;
                    }
                }
                /** @type {!Image} */
                var testImg = new Image;
                if (true === data.ul) {
                    _init();
                    /** @type {string} */
                    testImg.src = srcThumb ? "".concat(get(dirtyMap), "e=").concat(newNodeLists) : "".concat(get(dirtyMap), "u");
                }
                if (true === data.ul) {
                    data.events.on("contentChanged", function () {
                        if (fn(body) || fn(msg) || reply(body) || reply(msg)) {
                            _init();
                        }
                    });
                    data.events.on("html.get", function (foo) {
                        return foo + get("qD2H-9G3ioD-17qA1tE1B-8qI3A4hA-13C-11E2C1njfldD1E6pg1C-8sC3hfbkcD2G3stC-22gqgB3G2B-7vtoA4nweeD1A31A15B9uC-16A1F5dkykdc1B8dE-11bA3F2D3A9gd1E7F2tlI-8H-7vtxB2A5B2C3B2F2B5A6ldbyC4iqC-22D-17E-13mA3D2dywiB3oxlvfC1H4C2TjqbzlnI3ntB4E3qA2zaqsC6D3pmnkoE3C6D5wvuE3bwifdhB6hch1E4xibD-17dmrC1rG-7pntnF6nB-8F1D2A11C8plrkmF2F3MC-16bocqA2WwA-21ayeA1C4d1isC-22rD-13D6DfjpjtC2E6hB2G2G4A-7D2==");
                    });
                }
                data.events.on("html.set", function () {
                    var puzzle = data.el.querySelector('[data-f-id="pbf"]');
                    if (puzzle) {
                        $(puzzle).remove();
                    }
                });
                data.events.on("destroy", function () {
                    if (body && body.length) {
                        body.remove();
                    }
                }, true);
            }
        };
    };
    /**
     * EDIT MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.edit = function (editor) {
        /**
         * @return {undefined}
         */
        function init() {
            if (editor.browser.mozilla) {
                try {
                    editor.doc.execCommand("enableObjectResizing", false, "false");
                    editor.doc.execCommand("enableInlineTableEditing", false, "false");
                } catch (e) {
                }
            }
            if (editor.browser.msie) {
                try {
                    editor.doc.body.addEventListener("mscontrolselect", function (event) {
                        return event.srcElement.focus(), false;
                    });
                } catch (e) {
                }
            }
        }
        /**
         * @return {?}
         */
        function select() {
            return selected;
        }
        /** @type {boolean} */
        var selected = false;
        return {
            _init: function () {
                editor.events.on("focus", function () {
                    if (select()) {
                        editor.edit.off();
                    } else {
                        editor.edit.on();
                    }
                });
            },
            on: function () {
                if (editor.$wp) {
                    editor.$el.attr("contenteditable", true);
                    editor.$el.removeClass("fr-disabled").attr("aria-disabled", false);
                    init();
                } else {
                    if (editor.$el.is("a")) {
                        editor.$el.attr("contenteditable", true);
                    }
                }
                editor.events.trigger("edit.on", [], true);
                /** @type {boolean} */
                selected = false;
            },
            off: function () {
                editor.events.disableBlur();
                if (editor.$wp) {
                    editor.$el.attr("contenteditable", false);
                    editor.$el.addClass("fr-disabled").attr("aria-disabled", true);
                } else {
                    if (editor.$el.is("a")) {
                        editor.$el.attr("contenteditable", false);
                    }
                }
                editor.events.trigger("edit.off");
                editor.events.enableBlur();
                /** @type {boolean} */
                selected = true;
            },
            disableDesign: init,
            isDisabled: select
        };
    };
    /**
     * FORMAT MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.format = function (editor) {
        /**
         * @param {!Object} c
         * @param {?} t
         * @return {?}
         */
        function error(c, t) {
            /** @type {string} */
            var numberNode = "<".concat(c);
            var n;
            for (n in t) {
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                    /** @type {string} */
                    numberNode = numberNode + " ".concat(n, '="').concat(t[n], '"');
                }
            }
            return numberNode + ">";
        }
        /**
         * @param {!Object} value
         * @param {!Array} p
         * @return {?}
         */
        function format(value, p) {
            /** @type {!Object} */
            var css = value;
            var i;
            for (i in p) {
                if (Object.prototype.hasOwnProperty.call(p, i)) {
                    /** @type {string} */
                    css = css + ("id" === i ? "#".concat(p[i]) : "class" === i ? ".".concat(p[i]) : "[".concat(i, '="').concat(p[i], '"]'));
                }
            }
            return css;
        }
        /**
         * @param {!Object} el
         * @param {?} expr
         * @return {?}
         */
        function matches(el, expr) {
            return !(!el || el.nodeType !== Node.ELEMENT_NODE) && (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, expr);
        }
        /**
         * @param {!Object} node
         * @param {!Object} type
         * @param {boolean} value
         * @return {?}
         */
        function create(node, type, value) {
            if (node) {
                for (; node.nodeType === Node.COMMENT_NODE;) {
                    node = node.nextSibling;
                }
                if (node) {
                    if (editor.node.isBlock(node) && "HR" !== node.tagName) {
                        return editor.node.hasClass(node.firstChild, "fr-marker") ? create(node.firstChild.nextSibling, type, value) : create(node.firstChild, type, value), false;
                    }
                    var ref = $(editor.doc.createElement(type));
                    ref.attr(value);
                    ref.insertBefore(node);
                    /** @type {!Object} */
                    var item = node;
                    for (; item && !$(item).hasClass("fr-marker") && 0 === $(item).find(".fr-marker").length && "UL" !== item.tagName && "OL" !== item.tagName;) {
                        var parent = item;
                        if (editor.node.isBlock(item) && "HR" !== node.tagName) {
                            return create(item.firstChild, type, value), false;
                        }
                        item = item.nextSibling;
                        ref.append(parent);
                    }
                    if (item) {
                        if ($(item).find(".fr-marker").length || "UL" === item.tagName || "OL" === item.tagName) {
                            create(item.firstChild, type, value);
                        } else {
                            if (editor.browser.mozilla && editor.node.hasClass(item, "fr-marker")) {
                                var i;
                                var allElements = editor.selection.blocks();
                                var allElementsLength = allElements.length;
                                /** @type {number} */
                                i = 0;
                                for (; i < allElementsLength; i++) {
                                    if (allElements[i] != item.parentNode && allElements[i].childNodes.length && allElements[i].childNodes[0] != item.parentNode) {
                                        item = allElements[i].childNodes[1] || allElements[i].childNodes[0];
                                        (ref = $(error(type, value)).insertBefore(item)).append(item);
                                    }
                                }
                            }
                        }
                    } else {
                        var element = ref.get(0).parentNode;
                        for (; element && !element.nextSibling && !editor.node.isElement(element);) {
                            element = element.parentNode;
                        }
                        if (element) {
                            var target = element.nextSibling;
                            if (target) {
                                if (editor.node.isBlock(target)) {
                                    if ("HR" === target.tagName) {
                                        create(target.nextSibling, type, value);
                                    } else {
                                        create(target.firstChild, type, value);
                                    }
                                } else {
                                    create(target, type, value);
                                }
                            }
                        }
                    }
                    if (ref.is(":empty")) {
                        ref.remove();
                    }
                }
            }
        }
        /**
         * APPLY FORMATTING
         * 
         * @param {!Object} key
         * @param {?} value
         * @return {undefined}
         */
        function render(key, value) {
            var i;
            if (void 0 === value && (value = {}), value.style && delete value.style, editor.selection.isCollapsed()) {
                editor.markers.insert();
                editor.$el.find(".fr-marker").replaceWith(error(key, value) + data.INVISIBLE_SPACE + data.MARKERS + function (documents) {
                    return "</".concat(documents, ">");
                }(key));
                editor.selection.restore();
            } else {
                var divs;
                editor.selection.save();
                create(editor.$el.find('.fr-marker[data-type="true"]').length && editor.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, key, value);
                do {
                    divs = editor.$el.find("".concat(format(key, value), " > ").concat(format(key, value)));
                    /** @type {number} */
                    i = 0;
                    for (; i < divs.length; i++) {
                        divs[i].outerHTML = divs[i].innerHTML;
                    }
                } while (divs.length);
                editor.el.normalize();
                var bcofl_checkbox = editor.el.querySelectorAll(".fr-marker");
                /** @type {number} */
                i = 0;
                for (; i < bcofl_checkbox.length; i++) {
                    var d = $(bcofl_checkbox[i]);
                    if (true === d.data("type")) {
                        if (matches(d.get(0).nextSibling, format(key, value))) {
                            d.next().prepend(d);
                        }
                    } else {
                        if (matches(d.get(0).previousSibling, format(key, value))) {
                            d.prev().append(d);
                        }
                    }
                }
                editor.selection.restore();
            }
        }
        /**
         * @param {!Object} item
         * @param {?} node
         * @param {!Array} n
         * @param {boolean} a
         * @return {?}
         */
        function callback(item, node, n, a) {
            if (!a) {
                /** @type {boolean} */
                var s = false;
                if (true === item.data("type")) {
                    for (; editor.node.isFirstSibling(item.get(0)) && !item.parent().is(editor.$el) && !item.parent().is("ol") && !item.parent().is("ul");) {
                        item.parent().before(item);
                        /** @type {boolean} */
                        s = true;
                    }
                } else {
                    if (false === item.data("type")) {
                        for (; editor.node.isLastSibling(item.get(0)) && !item.parent().is(editor.$el) && !item.parent().is("ol") && !item.parent().is("ul");) {
                            item.parent().after(item);
                            /** @type {boolean} */
                            s = true;
                        }
                    }
                }
                if (s) {
                    return true;
                }
            }
            if (item.parents(node).length || void 0 === node) {
                var l;
                /** @type {string} */
                var style = "";
                /** @type {string} */
                var value = "";
                var element = item.parent();
                if (element.is(editor.$el) || editor.node.isBlock(element.get(0))) {
                    return false;
                }
                for (; !(editor.node.isBlock(element.parent().get(0)) || void 0 !== node && matches(element.get(0), format(node, n)));) {
                    style = style + editor.node.closeTagString(element.get(0));
                    value = editor.node.openTagString(element.get(0)) + value;
                    element = element.parent();
                }
                var _ = item.get(0).outerHTML;
                return item.replaceWith('<span id="mark"></span>'), l = element.html().replace(/<span id="mark"><\/span>/, style + editor.node.closeTagString(element.get(0)) + value + _ + style + editor.node.openTagString(element.get(0)) + value), element.replaceWith(editor.node.openTagString(element.get(0)) + l + editor.node.closeTagString(element.get(0))), true;
            }
            return false;
        }
        /**
         * REMOVE FORMATTING
         * 
         * @param {?} text
         * @param {?} a
         * @return {undefined}
         */
        function update(text, a) {
            if (void 0 === a) {
                a = {};
            }
            if (a.style) {
                delete a.style;
            }
            var new_tags = editor.selection.isCollapsed();
            editor.selection.save();
            /** @type {boolean} */
            var c = true;
            for (; c;) {
                /** @type {boolean} */
                c = false;
                var bcofl_checkbox = editor.$el.find(".fr-marker");
                /** @type {number} */
                var i = 0;
                for (; i < bcofl_checkbox.length; i++) {
                    var clone = $(bcofl_checkbox[i]);
                    /** @type {null} */
                    var h = null;
                    if (clone.attr("data-cloned") || new_tags || (h = clone.clone().removeClass("fr-marker").addClass("fr-clone"), clone.data("type") && "true" === clone.data("type").toString() ? clone.attr("data-cloned", true).after(h) : clone.attr("data-cloned", true).before(h)), callback(clone, text, a, new_tags)) {
                        /** @type {boolean} */
                        c = true;
                        break;
                    }
                }
            }
            !function render(r, result, template, next) {
                var bodyChildNodes = editor.node.contents(r.get(0));
                /** @type {number} */
                var i = 0;
                for (; i < bodyChildNodes.length; i++) {
                    var node = bodyChildNodes[i];
                    if (node.innerHTML && 8203 == node.innerHTML.charCodeAt() && node.tagName.toLocaleLowerCase() == template && node.childNodes.length < 2 && (node.outerHTML = node.innerHTML), editor.node.hasClass(node, "fr-marker")) {
                        /** @type {number} */
                        result = (result + 1) % 2;
                    } else {
                        if (result) {
                            if (0 < $(node).find(".fr-marker").length) {
                                result = render($(node), result, template, next);
                            } else {
                                var forgottenTemplates = $(node).find(template || "*:not(br)");
                                /** @type {number} */
                                var i = forgottenTemplates.length - 1;
                                for (; 0 <= i; i--) {
                                    var el = forgottenTemplates[i];
                                    if (editor.node.isBlock(el) || editor.node.isVoid(el) || void 0 !== template && !matches(el, format(template, next))) {
                                        if (editor.node.isBlock(el) && void 0 === template && "TABLE" !== node.tagName) {
                                            editor.node.clearAttributes(el);
                                        }
                                    } else {
                                        if (!editor.node.hasClass(el, "fr-clone")) {
                                            el.outerHTML = el.innerHTML;
                                        }
                                    }
                                }
                                if (void 0 === template && node.nodeType === Node.ELEMENT_NODE && !editor.node.isVoid(node) || matches(node, format(template, next))) {
                                    if (!(editor.node.isBlock(node) || editor.node.hasClass(node, "fr-clone"))) {
                                        node.outerHTML = node.innerHTML;
                                    }
                                } else {
                                    if (void 0 === template && node.nodeType === Node.ELEMENT_NODE && editor.node.isBlock(node) && "TABLE" !== node.tagName) {
                                        editor.node.clearAttributes(node);
                                    }
                                }
                            }
                        } else {
                            if (0 < $(node).find(".fr-marker").length) {
                                result = render($(node), result, template, next);
                            }
                        }
                    }
                }
                return result;
            }(editor.$el, 0, text, a);
            if (!new_tags) {
                editor.$el.find(".fr-marker").remove();
                editor.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker");
            }
            if (new_tags) {
                editor.$el.find(".fr-marker").before(data.INVISIBLE_SPACE).after(data.INVISIBLE_SPACE);
            }
            editor.html.cleanEmptyTags();
            editor.el.normalize();
            editor.selection.restore();
            var node = editor.win.getSelection() && editor.win.getSelection().anchorNode;
            if (node) {
                var operandNode = editor.node.blockParent(node);
                /** @type {boolean} */
                var m = !!node.textContent.replace(/\u200B/g, "").length;
                var _sourceCodeTextEditor$visibleRangeOffsets = editor.win.getSelection().getRangeAt(0);
                var startOffset = _sourceCodeTextEditor$visibleRangeOffsets.startOffset;
                var endOffset = _sourceCodeTextEditor$visibleRangeOffsets.endOffset;
                if (!editor.selection.text().replace(/\u200B/g, "").length) {
                    (function parse(node, parent) {
                        if (node && parent) {
                            if (node.isSameNode(parent) ? node.textContent = node.textContent.replace(/\u200B(?=.*\u200B)/g, "") : node.nodeType === Node.TEXT_NODE && (node.textContent = node.textContent.replace(/\u200B/g, "")), !node.childNodes.length) {
                                return false;
                            }
                            if (Array.isArray(node.childNodes)) {
                                node.childNodes.forEach(function (fromDateTimeString) {
                                    parse(fromDateTimeString, parent);
                                });
                            }
                        }
                    })(operandNode, node);
                }
                var range = editor.win.getSelection().getRangeAt(0);
                if (node.nodeType === Node.TEXT_NODE) {
                    if (!m || !editor.selection.text().length && startOffset === endOffset) {
                        var n_offset = node.textContent.search(/\u200B/g) + 1;
                        if (editor.browser.msie) {
                            var range = editor.doc.createRange();
                            editor.selection.get().removeAllRanges();
                            range.setStart(node, n_offset);
                            range.setEnd(node, n_offset);
                            editor.selection.get().addRange(range);
                        } else {
                            range.setStart(node, n_offset);
                            range.setEnd(node, n_offset);
                        }
                    }
                } else {
                    var p;
                    var el;
                    /** @type {number} */
                    var _i = 0;
                    var currentContent = $(node).contents();
                    if (editor.browser.msie) {
                        for (; el = currentContent[_i];) {
                            if (el.nodeType === Node.TEXT_NODE && 0 <= el.textContent.search(/\u200B/g)) {
                                p = el;
                            }
                            _i++;
                        }
                        p = $(p);
                    } else {
                        p = currentContent.filter(function (n) {
                            return n.nodeType === Node.TEXT_NODE && 0 <= n.textContent.search(/\u200B/g);
                        });
                    }
                    if (p.length) {
                        var n_offset = p.text().search(/\u200B/g) + 1;
                        range.setStart(p.get(0), n_offset);
                        range.setEnd(p.get(0), n_offset);
                    }
                }
            }
        }
        /**
         * @param {string} name
         * @param {!Object} val
         * @return {undefined}
         */
        function init(name, val) {
            var i;
            var element;
            var c;
            var d;
            var n;
            /** @type {null} */
            var target = null;
            if (editor.selection.isCollapsed()) {
                editor.markers.insert();
                var u = (element = editor.$el.find(".fr-marker")).parent();
                if (editor.node.openTagString(u.get(0)) === '<span style="'.concat(name, ": ").concat(u.css(name), ';">')) {
                    if (editor.node.isEmpty(u.get(0))) {
                        target = $(editor.doc.createElement("span")).attr("style", "".concat(name, ": ").concat(val, ";")).html("".concat(data.INVISIBLE_SPACE).concat(data.MARKERS));
                        u.replaceWith(target);
                    } else {
                        var h = {};
                        /** @type {string} */
                        h["style*"] = "".concat(name, ":");
                        callback(element, "span", h, true);
                        element = editor.$el.find(".fr-marker");
                        if (val) {
                            target = $(editor.doc.createElement("span")).attr("style", "".concat(name, ": ").concat(val, ";")).html("".concat(data.INVISIBLE_SPACE).concat(data.MARKERS));
                            element.replaceWith(target);
                        } else {
                            element.replaceWith(data.INVISIBLE_SPACE + data.MARKERS);
                        }
                    }
                    editor.html.cleanEmptyTags();
                } else {
                    if (editor.node.isEmpty(u.get(0)) && u.is("span")) {
                        element.replaceWith(data.MARKERS);
                        u.css(name, val);
                    } else {
                        target = $('<span style="'.concat(name, ": ").concat(val, ';">').concat(data.INVISIBLE_SPACE).concat(data.MARKERS, "</span>"));
                        element.replaceWith(target);
                    }
                }
                if (target) {
                    select(target, name, val);
                }
            } else {
                if (editor.selection.save(), null === val || "color" === name && 0 < editor.$el.find(".fr-marker").parents("u, a").length) {
                    var bcofl_checkbox = editor.$el.find(".fr-marker");
                    /** @type {number} */
                    i = 0;
                    for (; i < bcofl_checkbox.length; i++) {
                        if (true === (element = $(bcofl_checkbox[i])).data("type") || "true" === element.data("type")) {
                            for (; editor.node.isFirstSibling(element.get(0)) && !element.parent().is(editor.$el) && !editor.node.isElement(element.parent().get(0)) && !editor.node.isBlock(element.parent().get(0));) {
                                element.parent().before(element);
                            }
                        } else {
                            for (; editor.node.isLastSibling(element.get(0)) && !element.parent().is(editor.$el) && !editor.node.isElement(element.parent().get(0)) && !editor.node.isBlock(element.parent().get(0));) {
                                element.parent().after(element);
                            }
                        }
                    }
                }
                var td = editor.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling;
                for (; td.firstChild;) {
                    td = td.firstChild;
                }
                var data = {
                    class: "fr-unprocessed"
                };
                if (val) {
                    /** @type {string} */
                    data.style = "".concat(name, ": ").concat(val, ";");
                }
                create(td, "span", data);
                editor.$el.find(".fr-marker + .fr-unprocessed").each(function () {
                    $(this).prepend($(this).prev());
                });
                editor.$el.find(".fr-unprocessed + .fr-marker").each(function () {
                    $(this).prev().append($(this));
                });
                if ((val || "").match(/\dem$/)) {
                    editor.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed");
                }
                for (; 0 < editor.$el.find("span.fr-unprocessed").length;) {
                    if ((target = editor.$el.find("span.fr-unprocessed").first().removeClass("fr-unprocessed")).parent().get(0).normalize(), target.parent().is("span") && 1 === target.parent().get(0).childNodes.length) {
                        target.parent().css(name, val);
                        var editor = target;
                        target = target.parent();
                        editor.replaceWith(editor.html());
                    }
                    var connDivs = target.find("span");
                    /** @type {number} */
                    i = connDivs.length - 1;
                    for (; 0 <= i; i--) {
                        c = connDivs[i];
                        /** @type {string} */
                        d = name;
                        n = void 0;
                        (n = $(c)).css(d, "");
                        if ("" === n.attr("style")) {
                            n.replaceWith(n.html());
                        }
                    }
                    select(target, name, val);
                }
            }
            !function () {
                var i;
                for (; 0 < editor.$el.find(".fr-split:empty").length;) {
                    editor.$el.find(".fr-split:empty").remove();
                }
                editor.$el.find(".fr-split").removeClass("fr-split");
                editor.$el.find('[style=""]').removeAttr("style");
                editor.$el.find('[class=""]').removeAttr("class");
                editor.html.cleanEmptyTags();
                var result = editor.$el.find("span");
                /** @type {number} */
                var name = result.length - 1;
                for (; 0 <= name; name--) {
                    var e = result[name];
                    if (!(e.attributes && 0 !== e.attributes.length)) {
                        $(e).replaceWith(e.innerHTML);
                    }
                }
                editor.el.normalize();
                var bcofl_checkbox = editor.$el.find("span[style] + span[style]");
                /** @type {number} */
                i = 0;
                for (; i < bcofl_checkbox.length; i++) {
                    var $scrollerElement = $(bcofl_checkbox[i]);
                    var timeOverlay = $(bcofl_checkbox[i]).prev();
                    if ($scrollerElement.get(0).previousSibling === timeOverlay.get(0) && editor.node.openTagString($scrollerElement.get(0)) === editor.node.openTagString(timeOverlay.get(0))) {
                        $scrollerElement.prepend(timeOverlay.html());
                        timeOverlay.remove();
                    }
                }
                editor.$el.find("span[style] span[style]").each(function () {
                    if (0 <= $(this).attr("style").indexOf("font-size")) {
                        var sparklineElement = $(this).parents("span[style]");
                        if (0 <= sparklineElement.attr("style").indexOf("background-color")) {
                            $(this).attr("style", "".concat($(this).attr("style"), ";").concat(sparklineElement.attr("style")));
                            callback($(this), "span[style]", {}, false);
                        }
                    }
                });
                editor.el.normalize();
                editor.selection.restore();
            }();
        }
        /**
         * @param {!Object} element
         * @param {string} value
         * @param {!Object} color
         * @return {undefined}
         */
        function select(element, value, color) {
            var i;
            var parent;
            var pattern;
            var params = element.parentsUntil(editor.$el, "span[style]");
            /** @type {!Array} */
            var str = [];
            /** @type {number} */
            i = params.length - 1;
            for (; 0 <= i; i--) {
                parent = params[i];
                /** @type {string} */
                pattern = value;
                if (!(0 === $(parent).attr("style").indexOf("".concat(pattern, ":")) || 0 <= $(parent).attr("style").indexOf(";".concat(pattern, ":")) || 0 <= $(parent).attr("style").indexOf("; ".concat(pattern, ":")))) {
                    str.push(params[i]);
                }
            }
            if ((params = params.not(str)).length) {
                /** @type {string} */
                var type = "";
                /** @type {string} */
                var html = "";
                /** @type {string} */
                var i = "";
                /** @type {string} */
                var s = "";
                var target = element.get(0);
                for (; target = target.parentNode, $(target).addClass("fr-split"), type = type + editor.node.closeTagString(target), html = editor.node.openTagString($(target).clone().addClass("fr-split").get(0)) + html, params.get(0) !== target && (i = i + editor.node.closeTagString(target), s = editor.node.openTagString($(target).clone().addClass("fr-split").get(0)) + s), params.get(0) !== target;) {
                }
                /** @type {string} */
                var select = "".concat(type + editor.node.openTagString($(params.get(0)).clone().css(value, color || "").get(0)) + s + element.css(value, "").get(0).outerHTML + i, "</span>").concat(html);
                element.replaceWith('<span id="fr-break"></span>');
                var htmlstr = params.get(0).outerHTML;
                $(params.get(0)).replaceWith(htmlstr.replace(/<span id="fr-break"><\/span>/g, function () {
                    return select;
                }));
            }
        }
        /**
         * @param {string} name
         * @param {?} p
         * @return {?}
         */
        function next(name, p) {
            if (void 0 === p) {
                p = {};
            }
            if (p.style) {
                delete p.style;
            }
            var range = editor.selection.ranges(0);
            var element = range.startContainer;
            if (element.nodeType === Node.ELEMENT_NODE && 0 < element.childNodes.length && element.childNodes[range.startOffset] && (element = element.childNodes[range.startOffset]), !range.collapsed && element.nodeType === Node.TEXT_NODE && range.startOffset === (element.textContent || "").length) {
                for (; !editor.node.isBlock(element.parentNode) && !element.nextSibling;) {
                    element = element.parentNode;
                }
                if (element.nextSibling) {
                    element = element.nextSibling;
                }
            }
            var child = element;
            for (; child && child.nodeType === Node.ELEMENT_NODE && !matches(child, format(name, p));) {
                child = child.firstChild;
            }
            if (child && child.nodeType === Node.ELEMENT_NODE && matches(child, format(name, p))) {
                return true;
            }
            var node = element;
            if (node && node.nodeType !== Node.ELEMENT_NODE) {
                node = node.parentNode;
            }
            for (; node && node.nodeType === Node.ELEMENT_NODE && node !== editor.el && !matches(node, format(name, p));) {
                node = node.parentNode;
            }
            return !(!node || node.nodeType !== Node.ELEMENT_NODE || node === editor.el || !matches(node, format(name, p)));
        }
        var $ = editor.$;
        return {
            // Check if selection includes given tag e
            is: next,
            // Toggle formatting on selection
            toggle: function (obj, item) {
                if (Array.isArray(obj)) {
                    // Test for both (for bold (['strong', 'b']) and italic (['em', 'i']))
                    if (next(obj[0], item) || next(obj[1], item)) {
                        // Apply one
                        update(obj[0], item);
                    } else {
                        if (render(obj[0], item)) {
                            // Remove both
                            render(obj[1], item);
                        }
                    }
                } else {
                    if (next(obj, item)) {
                        update(obj, item);
                    } else {
                        render(obj, item);
                    }
                }
            },
            // Apply formatting
            apply: render,
            // Remove formatting
            remove: update,
            applyStyle: init,
            removeStyle: function (canvas) {
                init(canvas, null);
            }
        };
    };
    /**
     * SPACES MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.spaces = function (editor) {
        /**
         * @param {!Object} target
         * @param {number} parentOptions
         * @return {undefined}
         */
        function parse(target, parentOptions) {
            var child = target.previousSibling;
            var element = target.nextSibling;
            var line = target.textContent;
            var node = target.parentNode;
            /** @type {!Array} */
            var container = [data.ENTER_P, data.ENTER_DIV, data.ENTER_BR];
            if (!editor.html.isPreformatted(node)) {
                if (parentOptions) {
                    line = line.replace(/[\f\n\r\t\v ]{2,}/g, " ");
                    if (!(element && "BR" !== element.tagName && !editor.node.isBlock(element) || !(editor.node.isBlock(node) || editor.node.isLink(node) && !node.nextSibling || editor.node.isElement(node)))) {
                        line = line.replace(/[\f\n\r\t\v ]{1,}$/g, "");
                    }
                    if (!(child && "BR" !== child.tagName && !editor.node.isBlock(child) || !(editor.node.isBlock(node) || editor.node.isLink(node) && !node.previousSibling || editor.node.isElement(node)))) {
                        line = line.replace(/^[\f\n\r\t\v ]{1,}/g, "");
                    }
                    if (editor.node.isBlock(element) || editor.node.isBlock(child)) {
                        line = line.replace(/^[\f\n\r\t\v ]{1,}/g, "");
                    }
                    if (" " === line && (child && editor.node.isVoid(child) || element && editor.node.isVoid(element)) && !(child && element && editor.node.isVoid(child) || element && child && editor.node.isVoid(element))) {
                        /** @type {string} */
                        line = "";
                    }
                }
                if ((!child && editor.node.isBlock(element) || !element && editor.node.isBlock(child)) && editor.node.isBlock(node) && node !== editor.el) {
                    line = line.replace(/^[\f\n\r\t\v ]{1,}/g, "");
                }
                if (!parentOptions) {
                    line = line.replace(new RegExp(data.UNICODE_NBSP, "g"), " ");
                }
                /** @type {string} */
                var text = "";
                /** @type {number} */
                var i = 0;
                for (; i < line.length; i++) {
                    if (32 != line.charCodeAt(i) || 0 !== i && 32 != text.charCodeAt(i - 1) || !((editor.opts.enter === data.ENTER_BR || editor.opts.enter === data.ENTER_DIV) && (child && "BR" === child.tagName || element && "BR" === element.tagName) || child && element && child.tagName === element.tagName) && (child && element && editor.node.isVoid(child) || child && element && editor.node.isVoid(element))) {
                        text = text + line[i];
                    } else {
                        /** @type {string} */
                        text = text + data.UNICODE_NBSP;
                    }
                }
                if ((!element || element && editor.node.isBlock(element) || element && element.nodeType === Node.ELEMENT_NODE && editor.win.getComputedStyle(element) && "block" === editor.win.getComputedStyle(element).display) && (!editor.node.isVoid(child) || child && -1 !== ["P", "DIV", "BR"].indexOf(child.tagName) && -1 !== container.indexOf(editor.opts.enter))) {
                    /** @type {string} */
                    text = text.replace(/ $/, data.UNICODE_NBSP);
                }
                if (!(!child || editor.node.isVoid(child) || editor.node.isBlock(child) || 1 !== (text = text.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== text.charCodeAt(0) || !element || editor.node.isVoid(element) || editor.node.isBlock(element) || editor.node.hasClass(child, "fr-marker") && editor.node.hasClass(element, "fr-marker"))) {
                    /** @type {string} */
                    text = " ";
                }
                if (!parentOptions) {
                    /** @type {string} */
                    text = text.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2");
                }
                if (target.textContent !== text) {
                    /** @type {string} */
                    target.textContent = text;
                }
            }
        }
        /**
         * @param {!Object} el
         * @param {number} options
         * @return {undefined}
         */
        function init(el, options) {
            if (void 0 !== el && el || (el = editor.el), void 0 === options && (options = false), !el.getAttribute || "false" !== el.getAttribute("contenteditable")) {
                if (el.nodeType === Node.TEXT_NODE) {
                    parse(el, options);
                } else {
                    if (el.nodeType === Node.ELEMENT_NODE) {
                        var node = editor.doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, editor.node.filter(function (child) {
                            var node = child.parentNode;
                            for (; node && node !== editor.el;) {
                                if ("STYLE" === node.tagName || "IFRAME" === node.tagName) {
                                    return false;
                                }
                                if ("PRE" === node.tagName) {
                                    return false;
                                }
                                node = node.parentNode;
                            }
                            return null !== child.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !editor.node.hasClass(child.parentNode, "fr-marker");
                        }), false);
                        for (; node.nextNode();) {
                            parse(node.currentNode, options);
                        }
                    }
                }
            }
        }
        return {
            normalize: init,
            normalizeAroundCursor: function () {
                /** @type {!Array} */
                var args = [];
                var spheres = editor.el.querySelectorAll(".fr-marker");
                /** @type {number} */
                var iter_sph = 0;
                for (; iter_sph < spheres.length; iter_sph++) {
                    var prev;
                    var node = (prev = editor.node.blockParent(spheres[iter_sph]) || spheres[iter_sph]).nextSibling;
                    var x = prev.previousSibling;
                    for (; node && "BR" === node.tagName;) {
                        node = node.nextSibling;
                    }
                    for (; x && "BR" === x.tagName;) {
                        x = x.previousSibling;
                    }
                    if (prev && args.indexOf(prev) < 0) {
                        args.push(prev);
                    }
                    if (x && args.indexOf(x) < 0) {
                        args.push(x);
                    }
                    if (node && args.indexOf(node) < 0) {
                        args.push(node);
                    }
                }
                /** @type {number} */
                var i = 0;
                for (; i < args.length; i++) {
                    init(args[i]);
                }
            }
        };
    };
    //////////////////
    // MARKER MODULE
    //////////////////
    /** @type {string} */
    data.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">'.concat(data.INVISIBLE_SPACE = "&#8203;", "</span>");
    /** @type {string} */
    data.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">'.concat(data.INVISIBLE_SPACE, "</span>");
    /** @type {string} */
    data.MARKERS = data.START_MARKER + data.END_MARKER;
    /**
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.markers = function (editor) {
        /**
         * @return {?}
         */
        function init() {
            if (!editor.$wp) {
                return null;
            }
            try {
                var rng = editor.selection.ranges(0);
                var node = rng.commonAncestorContainer;
                if (node !== editor.el && !editor.$el.contains(node)) {
                    return null;
                }
                var self = rng.cloneRange();
                var stored_selection = rng.cloneRange();
                self.collapse(true);
                var child = $(editor.doc.createElement("SPAN")).addClass("fr-marker").attr("style", "display: none; line-height: 0;").html(data.INVISIBLE_SPACE).get(0);
                if (self.insertNode(child), child = editor.$el.find("span.fr-marker").get(0)) {
                    var node = child.nextSibling;
                    for (; node && node.nodeType === Node.TEXT_NODE && 0 === node.textContent.length;) {
                        $(node).remove();
                        node = editor.$el.find("span.fr-marker").get(0).nextSibling;
                    }
                    return editor.selection.clear(), editor.selection.get().addRange(stored_selection), child;
                }
                return null;
            } catch (e) {
            }
        }
        /**
         * @return {undefined}
         */
        function remove() {
            editor.$el.find(".fr-marker").remove();
        }
        var $ = editor.$;
        return {
            place: function (obj, node, name) {
                var item;
                var nodes;
                var node;
                try {
                    var self = obj.cloneRange();
                    if (self.collapse(node), self.insertNode(function (stopx, r) {
                        var i = $(editor.doc.createElement("SPAN"));
                        return i.addClass("fr-marker").attr("data-id", r).attr("data-type", stopx).attr("style", "display: ".concat(editor.browser.safari ? "none" : "inline-block", "; line-height: 0;")).html(data.INVISIBLE_SPACE), i.get(0);
                    }(node, name)), true === node) {
                        node = (item = editor.$el.find('span.fr-marker[data-type="true"][data-id="'.concat(name, '"]')).get(0)).nextSibling;
                        for (; node && node.nodeType === Node.TEXT_NODE && 0 === node.textContent.length;) {
                            $(node).remove();
                            node = item.nextSibling;
                        }
                    }
                    if (true === node && !obj.collapsed) {
                        for (; !editor.node.isElement(item.parentNode) && !node;) {
                            if (-1 < /\bfa\b/g.test(item.parentNode.className) && "I" === item.parentNode.tagName) {
                                $(item.parentNode).before(item);
                            } else {
                                $(item.parentNode).after(item);
                            }
                            node = item.nextSibling;
                        }
                        if (node && node.nodeType === Node.ELEMENT_NODE && editor.node.isBlock(node) && "HR" !== node.tagName) {
                            /** @type {!Array} */
                            nodes = [node];
                            for (; node = nodes[0], (nodes = editor.node.contents(node))[0] && editor.node.isBlock(nodes[0]);) {
                            }
                            $(node).prepend($(item));
                        }
                    }
                    if (false === node && !obj.collapsed) {
                        if ((node = (item = editor.$el.find('span.fr-marker[data-type="false"][data-id="'.concat(name, '"]')).get(0)).previousSibling) && node.nodeType === Node.ELEMENT_NODE && editor.node.isBlock(node) && "HR" !== node.tagName) {
                            /** @type {!Array} */
                            nodes = [node];
                            for (; node = nodes[nodes.length - 1], (nodes = editor.node.contents(node))[nodes.length - 1] && editor.node.isBlock(nodes[nodes.length - 1]);) {
                            }
                            $(node).append($(item));
                        }
                        if (item.parentNode && 0 <= ["TD", "TH"].indexOf(item.parentNode.tagName) || !item.previousSibling && editor.node.isBlock(item.parentElement)) {
                            if (item.parentNode.previousSibling && !item.previousSibling) {
                                $(item.parentNode.previousSibling).append(item);
                            } else {
                                if (0 <= ["TD", "TH"].indexOf(item.parentNode.tagName) && item.parentNode.firstChild === item) {
                                    if (item.parentNode.previousSibling) {
                                        $(item.parentNode.previousSibling).append(item);
                                    } else {
                                        if (item.parentNode.parentNode && item.parentNode.parentNode.previousSibling) {
                                            $(item.parentNode.parentNode.previousSibling).append(item);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var boxChild = editor.$el.find('span.fr-marker[data-type="'.concat(node, '"][data-id="').concat(name, '"]')).get(0);
                    return boxChild && (boxChild.style.display = "none"), boxChild;
                } catch (e) {
                    return null;
                }
            },
            insert: init,
            split: function () {
                if (!editor.selection.isCollapsed()) {
                    editor.selection.remove();
                }
                var e = editor.$el.find(".fr-marker").get(0);
                if (e || (e = init()), !e) {
                    return null;
                }
                var node = editor.node.deepestParent(e);
                if (node || (node = editor.node.blockParent(e)) && "LI" !== node.tagName && (node = null), node) {
                    if (editor.node.isBlock(node) && editor.node.isEmpty(node)) {
                        if ("LI" !== node.tagName || node.parentNode.firstElementChild !== node || editor.node.isEmpty(node.parentNode)) {
                            $(node).replaceWith('<span class="fr-marker"></span>');
                        } else {
                            $(node).append('<span class="fr-marker"></span>');
                        }
                    } else {
                        if (editor.cursor.isAtStart(e, node)) {
                            $(node).before('<span class="fr-marker"></span>');
                            $(e).remove();
                        } else {
                            if (editor.cursor.isAtEnd(e, node)) {
                                $(node).after('<span class="fr-marker"></span>');
                                $(e).remove();
                            } else {
                                var i = e;
                                /** @type {string} */
                                var x = "";
                                /** @type {string} */
                                var val = "";
                                for (; i = i.parentNode, x = x + editor.node.closeTagString(i), val = editor.node.openTagString(i) + val, i !== node;) {
                                }
                                $(e).replaceWith('<span id="fr-break"></span>');
                                var config = editor.node.openTagString(node) + $(node).html() + editor.node.closeTagString(node);
                                config = config.replace(/<span id="fr-break"><\/span>/g, "".concat(x, '<span class="fr-marker"></span>').concat(val));
                                $(node).replaceWith(config);
                            }
                        }
                    }
                }
                return editor.$el.find(".fr-marker").get(0);
            },
            insertAtPoint: function (event) {
                var range;
                var x = event.clientX;
                var y = event.clientY;
                remove();
                /** @type {null} */
                var r = null;
                if (void 0 !== editor.doc.caretPositionFromPoint ? (range = editor.doc.caretPositionFromPoint(x, y), (r = editor.doc.createRange()).setStart(range.offsetNode, range.offset), r.setEnd(range.offsetNode, range.offset)) : void 0 !== editor.doc.caretRangeFromPoint && (range = editor.doc.caretRangeFromPoint(x, y), (r = editor.doc.createRange()).setStart(range.startContainer, range.startOffset), r.setEnd(range.startContainer, range.startOffset)), null !== r && void 0 !== editor.win.getSelection) {
                    var sel = editor.win.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(r);
                } else {
                    if (void 0 !== editor.doc.body.createTextRange) {
                        try {
                            (r = editor.doc.body.createTextRange()).moveToPoint(x, y);
                            var rng = r.duplicate();
                            rng.moveToPoint(x, y);
                            r.setEndPoint("EndToEnd", rng);
                            r.select();
                        } catch (e) {
                            return false;
                        }
                    }
                }
                init();
            },
            remove: remove
        };
    };
    /**
     * SELECTION MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.selection = function (editor) {
        /**
         * Get selected text
         * 
         * @return {?}
         */
        function replace() {
            /** @type {string} */
            var cellText = "";
            return editor.win.getSelection ? cellText = editor.win.getSelection() : editor.doc.getSelection ? cellText = editor.doc.getSelection() : editor.doc.selection && (cellText = editor.doc.selection.createRange().text), cellText.toString();
        }
        /**
         * Get or create selection
         * 
         * @return {?}
         */
        function getSelection() {
            return editor.win.getSelection ? editor.win.getSelection() : editor.doc.getSelection ? editor.doc.getSelection() : editor.doc.selection.createRange();
        }
        /**
         * Get the selection ranges or a single range at a specified index.
         * 
         * @param {number} o
         * @return {?}
         */
        function find(o) {
            var selection = getSelection();
            /** @type {!Array} */
            var r = [];
            if (selection && selection.getRangeAt && selection.rangeCount) {
                /** @type {!Array} */
                r = [];
                /** @type {number} */
                var i = 0;
                for (; i < selection.rangeCount; i++) {
                    r.push(selection.getRangeAt(i));
                }
            } else {
                /** @type {!Array} */
                r = editor.doc.createRange ? [editor.doc.createRange()] : [];
            }
            return void 0 !== o ? r[o] : r;
        }
        /**
         * @return {undefined}
         */
        function clearSelection() {
            var sel = getSelection();
            try {
                if (sel.removeAllRanges) {
                    sel.removeAllRanges();
                } else {
                    if (sel.empty) {
                        sel.empty();
                    } else {
                        if (sel.clear) {
                            sel.clear();
                        }
                    }
                }
            } catch (e) {
            }
        }
        /**
         * Range element
         * 
         * @param {?} cb
         * @param {?} t
         * @return {?}
         */
        function check(cb, t) {
            var el = cb;
            return el.nodeType === Node.ELEMENT_NODE && 0 < el.childNodes.length && el.childNodes[t] && (el = el.childNodes[t]), el.nodeType === Node.TEXT_NODE && (el = el.parentNode), el;
        }
        /**
         * Save selection
         * 
         * @return {undefined}
         */
        function render() {
            if (editor.$wp) {
                editor.markers.remove();
                var range;
                var i;
                var ref = find();
                /** @type {!Array} */
                var ranges = [];
                /** @type {number} */
                i = 0;
                for (; i < ref.length; i++) {
                    if (ref[i].startContainer !== editor.doc || editor.browser.msie) {
                        var full_list = (range = ref[i]).collapsed;
                        var last = editor.markers.place(range, true, i);
                        var end = editor.markers.place(range, false, i);
                        if (void 0 !== last && last || !full_list || ($(".fr-marker").remove(), editor.selection.setAtEnd(editor.el)), editor.el.normalize(), editor.browser.safari && !full_list) {
                            try {
                                (range = editor.doc.createRange()).setStartAfter(last);
                                range.setEndBefore(end);
                                ranges.push(range);
                            } catch (e) {
                            }
                        }
                    }
                }
                if (editor.browser.safari && ranges.length) {
                    editor.selection.clear();
                    /** @type {number} */
                    i = 0;
                    for (; i < ranges.length; i++) {
                        editor.selection.get().addRange(ranges[i]);
                    }
                }
            }
        }
        /**
         * Restore selection
         * 
         * @return {?}
         */
        function init() {
            var i;
            var nodeList = editor.el.querySelectorAll('.fr-marker[data-type="true"]');
            if (!editor.$wp) {
                return editor.markers.remove(), false;
            }
            if (0 === nodeList.length) {
                return false;
            }
            if (editor.browser.msie || editor.browser.edge) {
                /** @type {number} */
                i = 0;
                for (; i < nodeList.length; i++) {
                    /** @type {string} */
                    nodeList[i].style.display = "inline-block";
                }
            }
            if (!(editor.core.hasFocus() || editor.browser.msie || editor.browser.webkit)) {
                editor.$el.focus();
            }
            clearSelection();
            var sel = getSelection();
            /** @type {number} */
            i = 0;
            for (; i < nodeList.length; i++) {
                var labels = $(nodeList[i]).data("id");
                var node = nodeList[i];
                var range = editor.doc.createRange();
                var a = editor.$el.find('.fr-marker[data-type="false"][data-id="'.concat(labels, '"]'));
                if (editor.browser.msie || editor.browser.edge) {
                    a.css("display", "inline-block");
                }
                /** @type {null} */
                var b = null;
                if (0 < a.length) {
                    a = a[0];
                    try {
                        /** @type {boolean} */
                        var h = false;
                        var child = node.nextSibling;
                        /** @type {null} */
                        var prev = null;
                        for (; child && child.nodeType === Node.TEXT_NODE && 0 === child.textContent.length;) {
                            child = (prev = child).nextSibling;
                            $(prev).remove();
                        }
                        var next = a.nextSibling;
                        for (; next && next.nodeType === Node.TEXT_NODE && 0 === next.textContent.length;) {
                            next = (prev = next).nextSibling;
                            $(prev).remove();
                        }
                        if (node.nextSibling === a || a.nextSibling === node) {
                            var el = node.nextSibling === a ? node : a;
                            var targetNode = el === node ? a : node;
                            var parent = el.previousSibling;
                            for (; parent && parent.nodeType === Node.TEXT_NODE && 0 === parent.length;) {
                                parent = (prev = parent).previousSibling;
                                $(prev).remove();
                            }
                            if (parent && parent.nodeType === Node.TEXT_NODE) {
                                for (; parent && parent.previousSibling && parent.previousSibling.nodeType === Node.TEXT_NODE;) {
                                    parent.previousSibling.textContent += parent.textContent;
                                    parent = parent.previousSibling;
                                    $(parent.nextSibling).remove();
                                }
                            }
                            var child = targetNode.nextSibling;
                            for (; child && child.nodeType === Node.TEXT_NODE && 0 === child.length;) {
                                child = (prev = child).nextSibling;
                                $(prev).remove();
                            }
                            if (child && child.nodeType === Node.TEXT_NODE) {
                                for (; child && child.nextSibling && child.nextSibling.nodeType === Node.TEXT_NODE;) {
                                    child.nextSibling.textContent = child.textContent + child.nextSibling.textContent;
                                    child = child.nextSibling;
                                    $(child.previousSibling).remove();
                                }
                            }
                            if (parent && (editor.node.isVoid(parent) || editor.node.isBlock(parent)) && (parent = null), child && (editor.node.isVoid(child) || editor.node.isBlock(child)) && (child = null), parent && child && parent.nodeType === Node.TEXT_NODE && child.nodeType === Node.TEXT_NODE) {
                                $(node).remove();
                                $(a).remove();
                                var count = parent.textContent.length;
                                parent.textContent += child.textContent;
                                $(child).remove();
                                if (!editor.opts.htmlUntouched) {
                                    editor.spaces.normalize(parent);
                                }
                                range.setStart(parent, count);
                                range.setEnd(parent, count);
                                /** @type {boolean} */
                                h = true;
                            } else {
                                if (!parent && child && child.nodeType === Node.TEXT_NODE) {
                                    $(node).remove();
                                    $(a).remove();
                                    if (!editor.opts.htmlUntouched) {
                                        editor.spaces.normalize(child);
                                    }
                                    b = $(editor.doc.createTextNode("\u200b")).get(0);
                                    $(child).before(b);
                                    range.setStart(child, 0);
                                    range.setEnd(child, 0);
                                    /** @type {boolean} */
                                    h = true;
                                } else {
                                    if (!child && parent && parent.nodeType === Node.TEXT_NODE) {
                                        $(node).remove();
                                        $(a).remove();
                                        if (!editor.opts.htmlUntouched) {
                                            editor.spaces.normalize(parent);
                                        }
                                        b = $(editor.doc.createTextNode("\u200b")).get(0);
                                        $(parent).after(b);
                                        range.setStart(parent, parent.textContent.length);
                                        range.setEnd(parent, parent.textContent.length);
                                        /** @type {boolean} */
                                        h = true;
                                    }
                                }
                            }
                        }
                        if (!h) {
                            var host = void 0;
                            var transform = void 0;
                            transform = (editor.browser.chrome || editor.browser.edge) && node.nextSibling === a ? (host = update(a, range, true) || range.setStartAfter(a), update(node, range, false) || range.setEndBefore(node)) : (node.previousSibling === a && (a = (node = a).nextSibling), a.nextSibling && "BR" === a.nextSibling.tagName || !a.nextSibling && editor.node.isBlock(node.previousSibling) || node.previousSibling && "BR" === node.previousSibling.tagName || (node.style.display = "inline", a.style.display =
                                "inline", b = $(editor.doc.createTextNode("\u200b")).get(0)), host = update(node, range, true) || $(node).before(b) && range.setStartBefore(node), update(a, range, false) || $(a).after(b) && range.setEndAfter(a));
                            if ("function" == typeof host) {
                                host();
                            }
                            if ("function" == typeof transform) {
                                transform();
                            }
                        }
                    } catch (e) {
                    }
                }
                if (b) {
                    $(b).remove();
                }
                try {
                    sel.addRange(range);
                } catch (e) {
                }
            }
            editor.markers.remove();
        }
        /**
         * @param {!Object} el
         * @param {!Range} range
         * @param {boolean} modifyStart
         * @return {?}
         */
        function update(el, range, modifyStart) {
            var count;
            var node = el.previousSibling;
            var next = el.nextSibling;
            return node && next && node.nodeType === Node.TEXT_NODE && next.nodeType === Node.TEXT_NODE ? (count = node.textContent.length, modifyStart ? (next.textContent = node.textContent + next.textContent, $(node).remove(), $(el).remove(), editor.opts.htmlUntouched || editor.spaces.normalize(next), function () {
                range.setStart(next, count);
            }) : (node.textContent += next.textContent, $(next).remove(), $(el).remove(), editor.opts.htmlUntouched || editor.spaces.normalize(node), function () {
                range.setEnd(node, count);
            })) : node && !next && node.nodeType === Node.TEXT_NODE ? (count = node.textContent.length, modifyStart ? (editor.opts.htmlUntouched || editor.spaces.normalize(node), function () {
                range.setStart(node, count);
            }) : (editor.opts.htmlUntouched || editor.spaces.normalize(node), function () {
                range.setEnd(node, count);
            })) : !(!next || node || next.nodeType !== Node.TEXT_NODE) && (modifyStart ? (editor.opts.htmlUntouched || editor.spaces.normalize(next), function () {
                range.setStart(next, 0);
            }) : (editor.opts.htmlUntouched || editor.spaces.normalize(next), function () {
                range.setEnd(next, 0);
            }));
        }
        /**
         * isCollapsed
         * 
         * @return {?}
         */
        function isValid() {
            var items = find();
            /** @type {number} */
            var i = 0;
            for (; i < items.length; i++) {
                if (!items[i].collapsed) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Get selection info
         * 
         * @param {?} cell
         * @return {?}
         */
        function allSelected(cell) {
            var range;
            var r;
            /** @type {boolean} */
            var _ref = false;
            /** @type {boolean} */
            var tmp = false;
            if (editor.win.getSelection) {
                var sel = editor.win.getSelection();
                if (sel.rangeCount) {
                    (r = (range = sel.getRangeAt(0)).cloneRange()).selectNodeContents(cell);
                    r.setEnd(range.startContainer, range.startOffset);
                    _ref = get(r);
                    r.selectNodeContents(cell);
                    r.setStart(range.endContainer, range.endOffset);
                    tmp = get(r);
                }
            } else {
                if (editor.doc.selection && "Control" !== editor.doc.selection.type) {
                    (r = (range = editor.doc.selection.createRange()).duplicate()).moveToElementText(cell);
                    r.setEndPoint("EndToStart", range);
                    _ref = get(r);
                    r.moveToElementText(cell);
                    r.setEndPoint("StartToEnd", range);
                    tmp = get(r);
                }
            }
            return {
                atStart: _ref,
                atEnd: tmp
            };
        }
        /**
         * @param {number} s
         * @return {?}
         */
        function get(s) {
            return "" === s.toString().replace(/[\u200B-\u200D\uFEFF]/g, "");
        }
        /**
         * @param {!Element} node
         * @param {number} struc_store
         * @return {undefined}
         */
        function parse(node, struc_store) {
            if (void 0 === struc_store) {
                /** @type {boolean} */
                struc_store = true;
            }
            var asciiBuffer = $(node).html();
            if (asciiBuffer && asciiBuffer.replace(/\u200b/g, "").length !== asciiBuffer.length) {
                $(node).html(asciiBuffer.replace(/\u200b/g, ""));
            }
            var childs = editor.node.contents(node);
            /** @type {number} */
            var i = 0;
            for (; i < childs.length; i++) {
                if (childs[i].nodeType !== Node.ELEMENT_NODE) {
                    $(childs[i]).remove();
                } else {
                    parse(childs[i], 0 === i);
                    if (0 === i) {
                        /** @type {boolean} */
                        struc_store = false;
                    }
                }
            }
            if (node.nodeType === Node.TEXT_NODE) {
                var $new = $(document.createElement("span")).attr("data-first", "true").attr("data-text", "true");
                $(node)[0].replaceWith($new[0]);
            } else {
                if (struc_store) {
                    $(node).attr("data-first", true);
                }
            }
        }
        /**
         * @return {?}
         */
        function getText() {
            return 0 === $(this).find("fr-inner").length;
        }
        /**
         * In editor
         * 
         * @return {?}
         */
        function getNode() {
            try {
                if (!editor.$wp) {
                    return false;
                }
                var parent = find(0).commonAncestorContainer;
                for (; parent && !editor.node.isElement(parent);) {
                    parent = parent.parentNode;
                }
                return !!editor.node.isElement(parent);
            } catch (e) {
                return false;
            }
        }
        /**
         * Set at start
         * 
         * @param {!Object} node
         * @param {!Object} proxy
         * @return {?}
         */
        function process(node, proxy) {
            if (!node || 0 < node.getElementsByClassName("fr-marker").length) {
                return false;
            }
            var child = node.firstChild;
            for (; child && (editor.node.isBlock(child) || proxy && !editor.node.isVoid(child) && child.nodeType === Node.ELEMENT_NODE);) {
                child = (node = child).firstChild;
            }
            /** @type {string} */
            node.innerHTML = data.MARKERS + node.innerHTML;
        }
        /**
         * Set after
         * 
         * @param {!Element} node
         * @param {boolean} elem
         * @return {?}
         */
        function wrap(node, elem) {
            if (!node || 0 < node.getElementsByClassName("fr-marker").length) {
                return false;
            }
            var n = node.lastChild;
            for (; n && (editor.node.isBlock(n) || elem && !editor.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE);) {
                n = (node = n).lastChild;
            }
            var el = editor.doc.createElement("SPAN");
            el.setAttribute("id", "fr-sel-markers");
            /** @type {string} */
            el.innerHTML = data.MARKERS;
            for (; node.parentNode && editor.opts.htmlAllowedEmptyTags && 0 <= editor.opts.htmlAllowedEmptyTags.indexOf(node.tagName.toLowerCase());) {
                node = node.parentNode;
            }
            node.appendChild(el);
            var elm = node.querySelector("#fr-sel-markers");
            elm.outerHTML = elm.innerHTML;
        }
        var $ = editor.$;
        return {
            // Returns the selected text.
            text: replace,
            // Returns the current selection.
            get: getSelection,
            // Get the selection ranges or a single range at a specified index.
            ranges: find,
            // Clear current selection.
            clear: clearSelection,
            // Returns the element where the current selection starts.
            element: function () {
                var sel = getSelection();
                try {
                    if (sel.rangeCount) {
                        var sibling;
                        var range = find(0);
                        var node = range.startContainer;
                        if (editor.node.isElement(node) && 0 === range.startOffset && node.childNodes.length) {
                            for (; node.childNodes.length && node.childNodes[0].nodeType === Node.ELEMENT_NODE;) {
                                node = node.childNodes[0];
                            }
                        }
                        if (node.nodeType === Node.TEXT_NODE && range.startOffset === (node.textContent || "").length && node.nextSibling && (node = node.nextSibling), node.nodeType === Node.ELEMENT_NODE) {
                            /** @type {boolean} */
                            var parent = false;
                            if (0 < node.childNodes.length && node.childNodes[range.startOffset]) {
                                sibling = node.childNodes[range.startOffset];
                                for (; sibling && sibling.nodeType === Node.TEXT_NODE && 0 === sibling.textContent.length;) {
                                    sibling = sibling.nextSibling;
                                }
                                if (sibling && sibling.textContent.replace(/\u200B/g, "") === replace().replace(/\u200B/g, "") && (node = sibling, parent = true), !parent && 1 < node.childNodes.length && 0 < range.startOffset && node.childNodes[range.startOffset - 1]) {
                                    sibling = node.childNodes[range.startOffset - 1];
                                    for (; sibling && sibling.nodeType === Node.TEXT_NODE && 0 === sibling.textContent.length;) {
                                        sibling = sibling.nextSibling;
                                    }
                                    if (sibling && sibling.textContent.replace(/\u200B/g, "") === replace().replace(/\u200B/g, "")) {
                                        node = sibling;
                                        /** @type {boolean} */
                                        parent = true;
                                    }
                                }
                            } else {
                                if (!range.collapsed && node.nextSibling && node.nextSibling.nodeType === Node.ELEMENT_NODE && (sibling = node.nextSibling) && sibling.textContent.replace(/\u200B/g, "") === replace().replace(/\u200B/g, "")) {
                                    node = sibling;
                                    /** @type {boolean} */
                                    parent = true;
                                }
                            }
                            if (!parent && 0 < node.childNodes.length && $(node.childNodes[0]).text().replace(/\u200B/g, "") === replace().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(node.childNodes[0].tagName) < 0) {
                                node = node.childNodes[0];
                            }
                        }
                        for (; node.nodeType !== Node.ELEMENT_NODE && node.parentNode;) {
                            node = node.parentNode;
                        }
                        var target = node;
                        for (; target && "HTML" !== target.tagName;) {
                            if (target === editor.el) {
                                return node;
                            }
                            target = $(target).parent()[0];
                        }
                    }
                } catch (e) {
                }
                return editor.el;
            },
            // Returns the element where the current selection ends.
            endElement: function () {
                var sel = getSelection();
                try {
                    if (sel.rangeCount) {
                        var node;
                        var range = find(0);
                        var element = range.endContainer;
                        if (element.nodeType === Node.ELEMENT_NODE) {
                            /** @type {boolean} */
                            var c = false;
                            if (0 < element.childNodes.length && element.childNodes[range.endOffset] && $(element.childNodes[range.endOffset]).text() === replace()) {
                                element = element.childNodes[range.endOffset];
                                /** @type {boolean} */
                                c = true;
                            } else {
                                if (!range.collapsed && element.previousSibling && element.previousSibling.nodeType === Node.ELEMENT_NODE) {
                                    if ((node = element.previousSibling) && node.textContent.replace(/\u200B/g, "") === replace().replace(/\u200B/g, "")) {
                                        element = node;
                                        /** @type {boolean} */
                                        c = true;
                                    }
                                } else {
                                    if (!range.collapsed && 0 < element.childNodes.length && element.childNodes[range.endOffset] && (node = element.childNodes[range.endOffset].previousSibling).nodeType === Node.ELEMENT_NODE && node && node.textContent.replace(/\u200B/g, "") === replace().replace(/\u200B/g, "")) {
                                        element = node;
                                        /** @type {boolean} */
                                        c = true;
                                    }
                                }
                            }
                            if (!c && 0 < element.childNodes.length && $(element.childNodes[element.childNodes.length - 1]).text() === replace() && ["BR", "IMG", "HR"].indexOf(element.childNodes[element.childNodes.length - 1].tagName) < 0) {
                                element = element.childNodes[element.childNodes.length - 1];
                            }
                        }
                        if (element.nodeType === Node.TEXT_NODE && 0 === range.endOffset && element.previousSibling && element.previousSibling.nodeType === Node.ELEMENT_NODE) {
                            element = element.previousSibling;
                        }
                        for (; element.nodeType !== Node.ELEMENT_NODE && element.parentNode;) {
                            element = element.parentNode;
                        }
                        var target = element;
                        for (; target && "HTML" !== target.tagName;) {
                            if (target === editor.el) {
                                return element;
                            }
                            target = $(target).parent()[0];
                        }
                    }
                } catch (e) {
                }
                return editor.el;
            },
            // Saves the current selection by adding HTML markers.
            save: render,
            // Restores the current selection by using the HTML markers.
            restore: init,
            // Check if selection is collapsed.
            isCollapsed: isValid,
            // Check if all the content of the editor is selected.
            isFull: function () {
                if (isValid()) {
                    return false;
                }
                editor.selection.save();
                var i;
                var spans = editor.el.querySelectorAll("td, th, img, br");
                /** @type {number} */
                i = 0;
                for (; i < spans.length; i++) {
                    if (spans[i].nextSibling || "IMG" === spans[i].tagName) {
                        /** @type {string} */
                        spans[i].innerHTML = '<span class="fr-mk" style="display: none;">&nbsp;</span>'.concat(spans[i].innerHTML);
                    }
                }
                /** @type {boolean} */
                var r = false;
                var self = allSelected(editor.el);
                if (self.atStart && self.atEnd) {
                    /** @type {boolean} */
                    r = true;
                }
                spans = editor.el.querySelectorAll(".fr-mk");
                /** @type {number} */
                i = 0;
                for (; i < spans.length; i++) {
                    spans[i].parentNode.removeChild(spans[i]);
                }
                return editor.selection.restore(), r;
            },
            // Check if the selection is inside the editor.
            inEditor: getNode,
            remove: function () {
                /**
                 * @param {!Node} e
                 * @return {?}
                 */
                function next(e) {
                    var n = e.previousSibling;
                    for (; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length;) {
                        var i = n;
                        n = n.previousSibling;
                        $(i).remove();
                    }
                    return n;
                }
                /**
                 * @param {!Node} t
                 * @return {?}
                 */
                function process(t) {
                    var sibling = t.nextSibling;
                    for (; sibling && sibling.nodeType === Node.TEXT_NODE && 0 === sibling.textContent.length;) {
                        var table = sibling;
                        sibling = sibling.nextSibling;
                        $(table).remove();
                    }
                    return sibling;
                }
                if (isValid()) {
                    return true;
                }
                var i;
                render();
                var children = editor.$el.find('.fr-marker[data-type="true"]');
                /** @type {number} */
                i = 0;
                for (; i < children.length; i++) {
                    var e = children[i];
                    for (; !(next(e) || editor.node.isBlock(e.parentNode) || editor.$el.is(e.parentNode) || editor.node.hasClass(e.parentNode, "fr-inner"));) {
                        $(e.parentNode).before(e);
                    }
                }
                var queryEvents = editor.$el.find('.fr-marker[data-type="false"]');
                /** @type {number} */
                i = 0;
                for (; i < queryEvents.length; i++) {
                    var e = queryEvents[i];
                    for (; !(process(e) || editor.node.isBlock(e.parentNode) || editor.$el.is(e.parentNode) || editor.node.hasClass(e.parentNode, "fr-inner"));) {
                        $(e.parentNode).after(e);
                    }
                    if (e.parentNode && editor.node.isBlock(e.parentNode) && editor.node.isEmpty(e.parentNode) && !editor.$el.is(e.parentNode) && !editor.node.hasClass(e.parentNode, "fr-inner") && editor.opts.keepFormatOnDelete) {
                        $(e.parentNode).after(e);
                    }
                }
                if (function () {
                    var bcofl_checkbox = editor.$el.find(".fr-marker");
                    /** @type {number} */
                    var i = 0;
                    for (; i < bcofl_checkbox.length; i++) {
                        if ($(bcofl_checkbox[i]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) {
                            return false;
                        }
                    }
                    return true;
                }()) {
                    !function process(left, str) {
                        var elements = editor.node.contents(left.get(0));
                        if (0 <= ["TD", "TH"].indexOf(left.get(0).tagName) && 1 === left.find(".fr-marker").length && (editor.node.hasClass(elements[0], "fr-marker") || "BR" == elements[0].tagName && editor.node.hasClass(elements[0].nextElementSibling, "fr-marker"))) {
                            left.attr("data-del-cell", true);
                        }
                        /** @type {number} */
                        var i = 0;
                        for (; i < elements.length; i++) {
                            var element = elements[i];
                            if (editor.node.hasClass(element, "fr-marker")) {
                                /** @type {number} */
                                str = (str + 1) % 2;
                            } else {
                                if (str) {
                                    if (0 < $(element).find(".fr-marker").length) {
                                        str = process($(element), str);
                                    } else {
                                        if (["TD", "TH"].indexOf(element.tagName) < 0 && !editor.node.hasClass(element, "fr-inner")) {
                                            if (!editor.opts.keepFormatOnDelete || 0 < editor.$el.find("[data-first]").length || editor.node.isVoid(element)) {
                                                $(element).remove();
                                            } else {
                                                parse(element);
                                            }
                                        } else {
                                            if (editor.node.hasClass(element, "fr-inner")) {
                                                if (0 === $(element).find(".fr-inner").length) {
                                                    $(element).html("<br>");
                                                } else {
                                                    $(element).find(".fr-inner").filter(getText).html("<br>");
                                                }
                                            } else {
                                                $(element).empty();
                                                $(element).attr("data-del-cell", true);
                                            }
                                        }
                                    }
                                } else {
                                    if (0 < $(element).find(".fr-marker").length) {
                                        str = process($(element), str);
                                    }
                                }
                            }
                        }
                        return str;
                    }(editor.$el, 0);
                    var label = editor.$el.find('[data-first="true"]');
                    if (label.length) {
                        editor.$el.find(".fr-marker").remove();
                        label.append(data.INVISIBLE_SPACE + data.MARKERS).removeAttr("data-first");
                        if (label.attr("data-text")) {
                            label.replaceWith(label.html());
                        }
                    } else {
                        editor.$el.find("table").filter(function () {
                            return 0 < $(this).find("[data-del-cell]").length && $(this).find("[data-del-cell]").length === $(this).find("td, th").length;
                        }).remove();
                        editor.$el.find("[data-del-cell]").removeAttr("data-del-cell");
                        children = editor.$el.find('.fr-marker[data-type="true"]');
                        /** @type {number} */
                        i = 0;
                        for (; i < children.length; i++) {
                            var node = children[i];
                            var e = node.nextSibling;
                            var t = editor.$el.find('.fr-marker[data-type="false"][data-id="'.concat($(node).data("id"), '"]')).get(0);
                            if (t) {
                                if (node && (!e || e !== t)) {
                                    var target = editor.node.blockParent(node);
                                    var element = editor.node.blockParent(t);
                                    /** @type {boolean} */
                                    var E = false;
                                    /** @type {boolean} */
                                    var elementMetaId = false;
                                    if (target && 0 <= ["UL", "OL"].indexOf(target.tagName) && (E = !(target = null)), element && 0 <= ["UL", "OL"].indexOf(element.tagName) && (elementMetaId = !(element = null)), $(node).after(t), target !== element) {
                                        if (null !== target || E) {
                                            if (null !== element || elementMetaId || 0 !== $(target).parentsUntil(editor.$el, "table").length) {
                                                if (target && element && 0 === $(target).parentsUntil(editor.$el, "table").length && 0 === $(element).parentsUntil(editor.$el, "table").length && !$(target).contains(element) && !$(element).contains(target)) {
                                                    $(target).append($(element).html());
                                                    $(element).remove();
                                                }
                                            } else {
                                                e = target;
                                                for (; !e.nextSibling && e.parentNode !== editor.el;) {
                                                    e = e.parentNode;
                                                }
                                                e = e.nextSibling;
                                                for (; e && "BR" !== e.tagName;) {
                                                    var a = e.nextSibling;
                                                    $(target).append(e);
                                                    e = a;
                                                }
                                                if (e && "BR" === e.tagName) {
                                                    $(e).remove();
                                                }
                                            }
                                        } else {
                                            var rel = editor.node.deepestParent(node);
                                            if (rel) {
                                                $(rel).after($(element).html());
                                                $(element).remove();
                                            } else {
                                                if (0 === $(element).parentsUntil(editor.$el, "table").length) {
                                                    $(node).next().after($(element).html());
                                                    $(element).remove();
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                t = $(node).clone().attr("data-type", false);
                                $(node).after(t);
                            }
                        }
                    }
                }
                editor.$el.find("li:empty").remove();
                if (!editor.opts.keepFormatOnDelete) {
                    editor.html.fillEmptyBlocks();
                }
                editor.html.cleanEmptyTags(true);
                if (!editor.opts.htmlUntouched) {
                    editor.clean.lists();
                    editor.$el.find("li:empty").append("<br>");
                    editor.spaces.normalize();
                }
                var row = editor.$el.find(".fr-marker").last().get(0);
                var startNode = editor.$el.find(".fr-marker").first().get(0);
                if (void 0 !== row && void 0 !== startNode && !row.nextSibling && startNode.previousSibling && "BR" === startNode.previousSibling.tagName && editor.node.isElement(row.parentNode) && editor.node.isElement(startNode.parentNode)) {
                    editor.$el.append("<br>");
                }
                init();
            },
            // Returns an array with DOM elements of the current selection.
            blocks: function (context) {
                var index;
                var resource;
                /** @type {!Array} */
                var l = [];
                var sel = getSelection();
                if (getNode() && sel.rangeCount) {
                    var section = find();
                    /** @type {number} */
                    index = 0;
                    for (; index < section.length; index++) {
                        var options = section[index];
                        var item = check(options.startContainer, options.startOffset);
                        var target = check(options.endContainer, options.endOffset);
                        if ((editor.node.isBlock(item) || editor.node.hasClass(item, "fr-inner")) && l.indexOf(item) < 0) {
                            l.push(item);
                        }
                        if ((resource = editor.node.blockParent(item)) && l.indexOf(resource) < 0) {
                            l.push(resource);
                        }
                        /** @type {!Array} */
                        var sourceBases = [];
                        var node = item;
                        for (; node !== target && node !== editor.el;) {
                            if (sourceBases.indexOf(node) < 0 && node.children && node.children.length) {
                                sourceBases.push(node);
                                node = node.children[0];
                            } else {
                                if (node.nextSibling) {
                                    node = node.nextSibling;
                                } else {
                                    if (node.parentNode) {
                                        node = node.parentNode;
                                        sourceBases.push(node);
                                    }
                                }
                            }
                            if (editor.node.isBlock(node) && sourceBases.indexOf(node) < 0 && l.indexOf(node) < 0 && (node !== target || 0 < options.endOffset)) {
                                l.push(node);
                            }
                        }
                        if (editor.node.isBlock(target) && l.indexOf(target) < 0 && 0 < options.endOffset) {
                            l.push(target);
                        }
                        if ((resource = editor.node.blockParent(target)) && l.indexOf(resource) < 0) {
                            l.push(resource);
                        }
                    }
                }
                /** @type {number} */
                index = l.length - 1;
                for (; 0 < index; index--) {
                    if ($(l[index]).find(l).length) {
                        if (context && $(l[index]).find("ul, ol").length) {
                            continue;
                        }
                        l.splice(index, 1);
                    }
                }
                return l;
            },
            // Get the info about the selection and the current node.
            // The returned object will contain two boolean properties
            // (atStart and atEnd) with the selection position relative to the node passed as parameter.
            info: allSelected,
            // Places selection markers at the end of the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setAtEnd: wrap,
            // Places the HTML selection markers at the start of the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setAtStart: process,
            // Places selection markers before the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setBefore: function (parent, line) {
                if (void 0 === line) {
                    /** @type {boolean} */
                    line = true;
                }
                var node = parent.previousSibling;
                for (; node && node.nodeType === Node.TEXT_NODE && 0 === node.textContent.length;) {
                    node = node.previousSibling;
                }
                return node ? (editor.node.isBlock(node) ? wrap(node) : "BR" === node.tagName ? $(node).before(data.MARKERS) : $(node).after(data.MARKERS), true) : !!line && (editor.node.isBlock(parent) ? process(parent) : $(parent).before(data.MARKERS), true);
            },
            // Places selection markers after the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setAfter: function (node, value) {
                if (void 0 === value) {
                    /** @type {boolean} */
                    value = true;
                }
                var child = node.nextSibling;
                for (; child && child.nodeType === Node.TEXT_NODE && 0 === child.textContent.length;) {
                    child = child.nextSibling;
                }
                return child ? (editor.node.isBlock(child) ? process(child) : $(child).before(data.MARKERS), true) : !!value && (editor.node.isBlock(node) ? wrap(node) : $(node).after(data.MARKERS), true);
            },
            rangeElement: check
        };
    };
    Object.assign(data.DEFAULTS, {
        language: null
    });
    data.LANGUAGE = {};
    /**
     * @param {!Object} state
     * @return {?}
     */
    data.MODULES.language = function (state) {
        var options;
        return {
            _init: function () {
                if (data.LANGUAGE) {
                    options = data.LANGUAGE[state.opts.language];
                }
                if (options && options.direction) {
                    state.opts.direction = options.direction;
                }
            },
            translate: function (key) {
                return options && options.translation[key] && options.translation[key].length ? options.translation[key] : key;
            }
        };
    };
    Object.assign(data.DEFAULTS, {
        placeholderText: "Type something"
    });
    /**
     * PLACEHOLDER MODULE
     * 
     * @param {!Object} self
     * @return {?}
     */
    data.MODULES.placeholder = function (self) {
        /**
         * @return {undefined}
         */
        function init() {
            if (!self.$placeholder) {
                self.$placeholder = $(self.doc.createElement("SPAN")).addClass("fr-placeholder");
                self.$wp.append(self.$placeholder);
            }
            var add = self.opts.iframe ? self.$iframe.prev().outerHeight(true) : self.$el.prev().outerHeight(true);
            /** @type {number} */
            var index = 0;
            /** @type {number} */
            var maxExistIndex = 0;
            /** @type {number} */
            var fieldPanelLength = 0;
            /** @type {number} */
            var dateOrdersChanged = 0;
            /** @type {number} */
            var maxPrimaryDepth = 0;
            /** @type {number} */
            var minimumSpace = 0;
            var chldrn = self.node.contents(self.el);
            var align = $(self.selection.element()).css("text-align");
            if (chldrn.length && chldrn[0].nodeType === Node.ELEMENT_NODE) {
                var element = $(chldrn[0]);
                if ((0 < self.$wp.prev().length || 0 < self.$el.prev().length) && self.ready) {
                    index = self.helpers.getPX(element.css("margin-top"));
                    dateOrdersChanged = self.helpers.getPX(element.css("padding-top"));
                    maxExistIndex = self.helpers.getPX(element.css("margin-left"));
                    fieldPanelLength = self.helpers.getPX(element.css("margin-right"));
                    maxPrimaryDepth = self.helpers.getPX(element.css("padding-left"));
                    minimumSpace = self.helpers.getPX(element.css("padding-right"));
                }
                self.$placeholder.css("font-size", element.css("font-size"));
                self.$placeholder.css("line-height", element.css("line-height"));
            } else {
                self.$placeholder.css("font-size", self.$el.css("font-size"));
                self.$placeholder.css("line-height", self.$el.css("line-height"));
            }
            self.$wp.addClass("show-placeholder");
            self.$placeholder.css({
                marginTop: Math.max(self.helpers.getPX(self.$el.css("margin-top")), index) + (add || 0),
                paddingTop: Math.max(self.helpers.getPX(self.$el.css("padding-top")), dateOrdersChanged),
                paddingLeft: Math.max(self.helpers.getPX(self.$el.css("padding-left")), maxPrimaryDepth),
                marginLeft: Math.max(self.helpers.getPX(self.$el.css("margin-left")), maxExistIndex),
                paddingRight: Math.max(self.helpers.getPX(self.$el.css("padding-right")), minimumSpace),
                marginRight: Math.max(self.helpers.getPX(self.$el.css("margin-right")), fieldPanelLength),
                textAlign: align
            }).text(self.language.translate(self.opts.placeholderText || self.$oel.attr("placeholder") || ""));
            self.$placeholder.html(self.$placeholder.text().replace(/\n/g, "<br>"));
        }
        /**
         * @return {undefined}
         */
        function hide() {
            self.$wp.removeClass("show-placeholder");
        }
        /**
         * @return {?}
         */
        function update() {
            if (!self.$wp) {
                return false;
            }
            if (self.core.isEmpty()) {
                init();
            } else {
                hide();
            }
        }
        var $ = self.$;
        return {
            _init: function () {
                if (!self.$wp) {
                    return false;
                }
                self.events.on("init input keydown keyup contentChanged initialized", update);
            },
            show: init,
            hide: hide,
            refresh: update,
            isVisible: function () {
                return !self.$wp || self.node.hasClass(self.$wp.get(0), "show-placeholder");
            }
        };
    };
    /** @type {string} */
    data.UNICODE_NBSP = String.fromCharCode(160);
    /** @type {!Array} */
    data.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
    /** @type {!Array} */
    data.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"];
    Object.assign(data.DEFAULTS, {
        htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line", "hr"],
        htmlDoNotWrapTags: ["script", "style"],
        htmlSimpleAmpersand: false,
        htmlIgnoreCSSProperties: [],
        htmlExecuteScripts: true
    });
    /**
     * HTML MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.html = function (editor) {
        /**
         * @return {?}
         */
        function traverse() {
            return editor.opts.enter === data.ENTER_P ? "p" : editor.opts.enter === data.ENTER_DIV ? "div" : editor.opts.enter === data.ENTER_BR ? null : void 0;
        }
        /**
         * @param {!Object} element
         * @param {boolean} data
         * @return {?}
         */
        function append(element, data) {
            return !(!element || element === editor.el) && (data ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(element.tagName) || append(element.parentNode, data) : -1 !== ["PRE", "SCRIPT", "STYLE"].indexOf(element.tagName));
        }
        /**
         * @param {boolean} card
         * @return {?}
         */
        function next(card) {
            var i;
            /** @type {!Array} */
            var results = [];
            /** @type {!Array} */
            var nodes = [];
            if (card) {
                var keywordResults = editor.el.querySelectorAll(".fr-marker");
                /** @type {number} */
                i = 0;
                for (; i < keywordResults.length; i++) {
                    var node = editor.node.blockParent(keywordResults[i]) || keywordResults[i];
                    if (node) {
                        var child = node.nextSibling;
                        var target = node.previousSibling;
                        if (node && nodes.indexOf(node) < 0 && editor.node.isBlock(node)) {
                            nodes.push(node);
                        }
                        if (target && editor.node.isBlock(target) && nodes.indexOf(target) < 0) {
                            nodes.push(target);
                        }
                        if (child && editor.node.isBlock(child) && nodes.indexOf(child) < 0) {
                            nodes.push(child);
                        }
                    }
                }
            } else {
                nodes = editor.el.querySelectorAll(filter());
            }
            var autofill = filter();
            /** @type {string} */
            autofill = autofill + ",".concat(data.VOID_ELEMENTS.join(","));
            /** @type {string} */
            autofill = autofill + ", .fr-inner";
            /** @type {string} */
            autofill = autofill + ",".concat(editor.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)");
            /** @type {number} */
            i = nodes.length - 1;
            for (; 0 <= i; i--) {
                if (!(nodes[i].textContent && 0 < nodes[i].textContent.replace(/\u200B|\n/g, "").length || 0 < nodes[i].querySelectorAll(autofill).length)) {
                    var all = editor.node.contents(nodes[i]);
                    /** @type {boolean} */
                    var h = false;
                    /** @type {number} */
                    var j = 0;
                    for (; j < all.length; j++) {
                        if (all[j].nodeType !== Node.COMMENT_NODE && all[j].textContent && 0 < all[j].textContent.replace(/\u200B|\n/g, "").length) {
                            /** @type {boolean} */
                            h = true;
                            break;
                        }
                    }
                    if (!h) {
                        results.push(nodes[i]);
                    }
                }
            }
            return results;
        }
        /**
         * @return {?}
         */
        function filter() {
            return data.BLOCK_TAGS.join(", ");
        }
        /**
         * @param {?} string
         * @return {undefined}
         */
        function create(string) {
            var options;
            var obj;
            var p = $.merge([], data.VOID_ELEMENTS);
            p = $.merge(p, editor.opts.htmlAllowedEmptyTags);
            p = void 0 === string ? $.merge(p, data.BLOCK_TAGS) : $.merge(p, data.NO_DELETE_TAGS);
            options = editor.el.querySelectorAll("*:empty:not(".concat(p.join("):not("), "):not(.fr-marker):not(template)"));
            do {
                /** @type {boolean} */
                obj = false;
                /** @type {number} */
                var i = 0;
                for (; i < options.length; i++) {
                    if (!(0 !== options[i].attributes.length && void 0 === options[i].getAttribute("href"))) {
                        options[i].parentNode.removeChild(options[i]);
                        /** @type {boolean} */
                        obj = true;
                    }
                }
                options = editor.el.querySelectorAll("*:empty:not(".concat(p.join("):not("), "):not(.fr-marker):not(template)"));
            } while (options.length && obj);
        }
        /**
         * @param {!Object} o
         * @param {!Object} value
         * @return {undefined}
         */
        function process(o, value) {
            var parent = traverse();
            if (value && (parent = "div"), parent) {
                var i = editor.doc.createDocumentFragment();
                /** @type {null} */
                var el = null;
                /** @type {boolean} */
                var styles = false;
                var node = o.firstChild;
                /** @type {boolean} */
                var c = false;
                for (; node;) {
                    var next_node = node.nextSibling;
                    if (node.nodeType === Node.ELEMENT_NODE && (editor.node.isBlock(node) || 0 <= editor.opts.htmlDoNotWrapTags.indexOf(node.tagName.toLowerCase()) && !editor.node.hasClass(node, "fr-marker"))) {
                        /** @type {null} */
                        el = null;
                        i.appendChild(node.cloneNode(true));
                    } else {
                        if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.TEXT_NODE) {
                            /** @type {null} */
                            el = null;
                            i.appendChild(node.cloneNode(true));
                        } else {
                            if ("BR" === node.tagName) {
                                if (null === el) {
                                    el = editor.doc.createElement(parent);
                                    /** @type {boolean} */
                                    c = true;
                                    if (value) {
                                        el.setAttribute("class", "fr-temp-div");
                                        el.setAttribute("data-empty", true);
                                    }
                                    el.appendChild(node.cloneNode(true));
                                    i.appendChild(el);
                                } else {
                                    if (false === styles) {
                                        el.appendChild(editor.doc.createElement("br"));
                                        if (value) {
                                            el.setAttribute("class", "fr-temp-div");
                                            el.setAttribute("data-empty", true);
                                        }
                                    }
                                }
                                /** @type {null} */
                                el = null;
                            } else {
                                var variableValue = node.textContent;
                                if (node.nodeType !== Node.TEXT_NODE || 0 < variableValue.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || variableValue.replace(/(^ *)|( *$)/g, "").length && variableValue.indexOf("\n") < 0) {
                                    if (null === el) {
                                        el = editor.doc.createElement(parent);
                                        /** @type {boolean} */
                                        c = true;
                                        if (value) {
                                            el.setAttribute("class", "fr-temp-div");
                                        }
                                        i.appendChild(el);
                                        /** @type {boolean} */
                                        styles = false;
                                    }
                                    el.appendChild(node.cloneNode(true));
                                    if (!(styles || editor.node.hasClass(node, "fr-marker") || node.nodeType === Node.TEXT_NODE && 0 === variableValue.replace(/ /g, "").length)) {
                                        /** @type {boolean} */
                                        styles = true;
                                    }
                                } else {
                                    /** @type {boolean} */
                                    c = true;
                                }
                            }
                        }
                    }
                    node = next_node;
                }
                if (c) {
                    /** @type {string} */
                    o.innerHTML = "";
                    o.appendChild(i);
                }
            }
        }
        /**
         * @param {!NodeList} object
         * @param {!Array} key
         * @return {undefined}
         */
        function error(object, key) {
            /** @type {number} */
            var name = object.length - 1;
            for (; 0 <= name; name--) {
                process(object[name], key);
            }
        }
        /**
         * @param {?} length
         * @param {number} options
         * @param {number} callbacks
         * @param {number} data
         * @param {!Array} noFallback
         * @return {?}
         */
        function get(length, options, callbacks, data, noFallback) {
            if (!editor.$wp) {
                return false;
            }
            if (void 0 === length) {
                /** @type {boolean} */
                length = false;
            }
            if (void 0 === options) {
                /** @type {boolean} */
                options = false;
            }
            if (void 0 === callbacks) {
                /** @type {boolean} */
                callbacks = false;
            }
            if (void 0 === data) {
                /** @type {boolean} */
                data = false;
            }
            if (void 0 === noFallback) {
                /** @type {boolean} */
                noFallback = false;
            }
            var scrollPos = editor.$wp.scrollTop();
            process(editor.el, length);
            if (data) {
                error(editor.el.querySelectorAll(".fr-inner"), length);
            }
            if (options) {
                error(editor.el.querySelectorAll("td, th"), length);
            }
            if (callbacks) {
                error(editor.el.querySelectorAll("blockquote"), length);
            }
            if (noFallback) {
                error(editor.el.querySelectorAll("li"), length);
            }
            if (scrollPos !== editor.$wp.scrollTop()) {
                editor.$wp.scrollTop(scrollPos);
            }
        }
        /**
         * @param {string} parent
         * @return {?}
         */
        function init(parent) {
            if (void 0 === parent && (parent = editor.el), parent && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(parent.tagName)) {
                return false;
            }
            var walker = editor.doc.createTreeWalker(parent, NodeFilter.SHOW_TEXT, editor.node.filter(function (e) {
                return null !== e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g);
            }), false);
            for (; walker.nextNode();) {
                var node = walker.currentNode;
                if (!append(node.parentNode, true)) {
                    var i = editor.node.isBlock(node.parentNode) || editor.node.isElement(node.parentNode);
                    var string = node.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                    if (i) {
                        var element = node.previousSibling;
                        var child = node.nextSibling;
                        if (element && child && " " === string) {
                            /** @type {string} */
                            string = editor.node.isBlock(element) && editor.node.isBlock(child) ? "" : " ";
                        } else {
                            if (!element) {
                                string = string.replace(/^ */, "");
                            }
                            if (!child) {
                                string = string.replace(/ *$/, "");
                            }
                        }
                    }
                    node.textContent = string;
                }
            }
        }
        /**
         * @param {!Object} code
         * @param {string} expected
         * @param {number} name
         * @return {?}
         */
        function test(code, expected, name) {
            /** @type {(Array<string>|null)} */
            var defaults = (new RegExp(expected, "gi")).exec(code);
            return defaults ? defaults[name] : null;
        }
        /**
         * @param {!Object} root
         * @return {?}
         */
        function walk(root) {
            var node = root.doctype;
            /** @type {string} */
            var type = "<!DOCTYPE html>";
            return node && (type = "<!DOCTYPE ".concat(node.name).concat(node.publicId ? ' PUBLIC "'.concat(node.publicId, '"') : "").concat(!node.publicId && node.systemId ? " SYSTEM" : "").concat(node.systemId ? ' "'.concat(node.systemId, '"') : "", ">")), type;
        }
        /**
         * @param {!Object} obj
         * @return {?}
         */
        function update(obj) {
            var element = obj.parentNode;
            if (element && (editor.node.isBlock(element) || editor.node.isElement(element)) && ["TD", "TH"].indexOf(element.tagName) < 0) {
                var target = obj.previousSibling;
                var i = obj.nextSibling;
                for (; target && (target.nodeType === Node.TEXT_NODE && 0 === target.textContent.replace(/\n|\r/g, "").length || editor.node.hasClass(target, "fr-tmp"));) {
                    target = target.previousSibling;
                }
                if (i) {
                    return false;
                }
                if (target && element && "BR" !== target.tagName && !editor.node.isBlock(target) && !i && 0 < element.textContent.replace(/\u200B/g, "").length && 0 < target.textContent.length && !editor.node.hasClass(target, "fr-marker")) {
                    if (!(editor.el === element && !i && editor.opts.enter === data.ENTER_BR && editor.browser.msie)) {
                        obj.parentNode.removeChild(obj);
                    }
                }
            } else {
                if (!(!element || editor.node.isBlock(element) || editor.node.isElement(element) || obj.previousSibling || obj.nextSibling || !editor.node.isDeletable(obj.parentNode))) {
                    update(obj.parentNode);
                }
            }
        }
        /**
         * @return {undefined}
         */
        function remove() {
            if (!editor.opts.htmlUntouched) {
                create();
                get();
                init();
                editor.spaces.normalize(null, true);
                editor.html.fillEmptyBlocks();
                editor.clean.lists();
                editor.clean.tables();
                editor.clean.toHTML5();
                editor.html.cleanBRs();
            }
            editor.selection.restore();
            render();
            editor.placeholder.refresh();
        }
        /**
         * Clean white tags
         * 
         * @return {undefined}
         */
        function render() {
            if (editor.node.isEmpty(editor.el)) {
                if (null !== traverse()) {
                    if (!(editor.el.querySelector(filter()) || editor.el.querySelector("".concat(editor.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")))) {
                        if (editor.core.hasFocus()) {
                            editor.$el.html("<".concat(traverse(), ">").concat(data.MARKERS, "<br/></").concat(traverse(), ">"));
                            editor.selection.restore();
                        } else {
                            editor.$el.html("<".concat(traverse(), "><br/></").concat(traverse(), ">"));
                        }
                    }
                } else {
                    if (!editor.el.querySelector("*:not(.fr-marker):not(br)")) {
                        if (editor.core.hasFocus()) {
                            editor.$el.html("".concat(data.MARKERS, "<br/>"));
                            editor.selection.restore();
                        } else {
                            editor.$el.html("<br/>");
                        }
                    }
                }
            }
        }
        /**
         * @param {!Object} e
         * @param {string} node
         * @return {?}
         */
        function wrap(e, node) {
            return test(e, "<".concat(node, "[^>]*?>([\\w\\W]*)</").concat(node, ">"), 1);
        }
        /**
         * @param {!Array} type
         * @param {string} val
         * @return {?}
         */
        function write(type, val) {
            var $zeroclipboardflash = $("<div ".concat(test(type, "<".concat(val, "([^>]*?)>"), 1) || "", ">"));
            return editor.node.rawAttributes($zeroclipboardflash.get(0));
        }
        /**
         * @param {!Array} text
         * @return {?}
         */
        function trim(text) {
            return (test(text, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ");
        }
        /**
         * @param {!Object} res
         * @param {string} field
         * @return {undefined}
         */
        function fn(res, field) {
            if (editor.opts.htmlExecuteScripts) {
                res.html(field);
            } else {
                /** @type {string} */
                res.get(0).innerHTML = field;
            }
        }
        /**
         * @param {string} r
         * @return {?}
         */
        function getValue(r) {
            var data;
            return (data = /:not\(([^)]*)\)/g).test(r) && (r = r.replace(data, "     $1 ")), 100 * (r.match(/(#[^\s+>~.[:]+)/g) || []).length + 10 * (r.match(/(\[[^]]+\])/g) || []).length + 10 * (r.match(/(\.[^\s+>~.[:]+)/g) || []).length + 10 * (r.match(/(:[\w-]+\([^)]*\))/gi) || []).length + 10 * (r.match(/(:[^\s+>~.[:]+)/g) || []).length + (r.match(/(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length + ((r = (r = r.replace(/[*\s+>~]/g, " ")).replace(/[#.]/g, " ")).match(/([^\s+>~.[:]+)/g) ||
                []).length;
        }
        /**
         * @param {!Object} node
         * @return {undefined}
         */
        function callback(node) {
            if (editor.events.trigger("html.processGet", [node]), node && node.getAttribute && "" === node.getAttribute("class") && node.removeAttribute("class"), node && node.getAttribute && "" === node.getAttribute("style") && node.removeAttribute("style"), node && node.nodeType === Node.ELEMENT_NODE) {
                var i;
                var tmpKeys = node.querySelectorAll('[class=""],[style=""]');
                /** @type {number} */
                i = 0;
                for (; i < tmpKeys.length; i++) {
                    var o = tmpKeys[i];
                    if ("" === o.getAttribute("class")) {
                        o.removeAttribute("class");
                    }
                    if ("" === o.getAttribute("style")) {
                        o.removeAttribute("style");
                    }
                }
                if ("BR" === node.tagName) {
                    update(node);
                } else {
                    var elements = node.querySelectorAll("br");
                    /** @type {number} */
                    i = 0;
                    for (; i < elements.length; i++) {
                        update(elements[i]);
                    }
                }
            }
        }
        /**
         * @param {!Array} subtractor
         * @param {!Array} subtractee
         * @return {?}
         */
        function subtract(subtractor, subtractee) {
            return subtractor[3] - subtractee[3];
        }
        /**
         * @return {undefined}
         */
        function compile() {
            var inputs = editor.el.querySelectorAll("input, textarea");
            /** @type {number} */
            var i = 0;
            for (; i < inputs.length; i++) {
                if (!("checkbox" !== inputs[i].type && "radio" !== inputs[i].type)) {
                    if (inputs[i].checked) {
                        inputs[i].setAttribute("checked", inputs[i].checked);
                    } else {
                        editor.$(inputs[i]).removeAttr("checked");
                    }
                }
                if (inputs[i].getAttribute("value")) {
                    inputs[i].setAttribute("value", inputs[i].value);
                }
            }
        }
        /**
         * @param {string} div
         * @return {?}
         */
        function success(div) {
            var a = editor.doc.createElement("div");
            return a.innerHTML = div, null !== a.querySelector(filter());
        }
        /**
         * @param {!Array} isZoom
         * @return {?}
         */
        function refresh(isZoom) {
            /** @type {null} */
            var r = null;
            if (void 0 === isZoom && (r = editor.selection.element()), editor.opts.keepFormatOnDelete) {
                return false;
            }
            var spheres;
            var iter_sph;
            /** @type {number} */
            var b64 = r ? (r.textContent.match(/\u200B/g) || []).length - r.querySelectorAll(".fr-marker").length : 0;
            if ((editor.el.textContent.match(/\u200B/g) || []).length - editor.el.querySelectorAll(".fr-marker").length === b64) {
                return false;
            }
            do {
                /** @type {boolean} */
                iter_sph = false;
                spheres = editor.el.querySelectorAll("*:not(.fr-marker)");
                /** @type {number} */
                var i = 0;
                for (; i < spheres.length; i++) {
                    var s = spheres[i];
                    if (r !== s) {
                        var t = s.textContent;
                        if (0 === s.children.length && 1 === t.length && 8203 === t.charCodeAt(0) && "TD" !== s.tagName) {
                            $(s).remove();
                            /** @type {boolean} */
                            iter_sph = true;
                        }
                    }
                }
            } while (iter_sph);
        }
        /**
         * @return {undefined}
         */
        function warning() {
            refresh();
            if (editor.placeholder) {
                setTimeout(editor.placeholder.refresh, 0);
            }
        }
        var $ = editor.$;
        return {
            defaultTag: traverse,
            isPreformatted: append,
            emptyBlocks: next,
            emptyBlockTagsQuery: function () {
                return "".concat(data.BLOCK_TAGS.join(":empty, "), ":empty");
            },
            blockTagsQuery: filter,
            fillEmptyBlocks: function (element) {
                var el = next(element);
                if (editor.node.isEmpty(editor.el) && editor.opts.enter === data.ENTER_BR) {
                    el.push(editor.el);
                }
                /** @type {number} */
                var i = 0;
                for (; i < el.length; i++) {
                    var element = el[i];
                    if (!("false" === element.getAttribute("contenteditable") || element.querySelector("".concat(editor.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || editor.node.isVoid(element))) {
                        if ("TABLE" !== element.tagName && "TBODY" !== element.tagName && "TR" !== element.tagName && "UL" !== element.tagName && "OL" !== element.tagName) {
                            element.appendChild(editor.doc.createElement("br"));
                        }
                    }
                }
                if (editor.browser.msie && editor.opts.enter === data.ENTER_BR) {
                    var lastContentNode = editor.node.contents(editor.el);
                    if (lastContentNode.length && lastContentNode[lastContentNode.length - 1].nodeType === Node.TEXT_NODE) {
                        editor.$el.append("<br>");
                    }
                }
            },
            cleanEmptyTags: create,
            cleanWhiteTags: refresh,
            cleanBlankSpaces: init,
            blocks: function () {
                return editor.$el.get(0).querySelectorAll(filter());
            },
            getDoctype: walk,
            set: function (delimiter) {
                var QuickBase = editor.clean.html((delimiter || "").trim(), [], [], editor.opts.fullPage);
                /** @type {!RegExp} */
                var val = new RegExp("%3A//", "g");
                var id = QuickBase.replace(val, "://");
                if (editor.opts.fullPage) {
                    var i = wrap(id, "body") || (0 <= id.indexOf("<body") ? "" : id);
                    var w = write(id, "body");
                    var content = wrap(id, "head") || "<title></title>";
                    var iframe = write(id, "head");
                    var btnPh = $("<div>");
                    btnPh.append(content).contents().each(function () {
                        if (this.nodeType === Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) {
                            this.parentNode.removeChild(this);
                        }
                    });
                    var yyyy = btnPh.html().trim();
                    content = $("<div>").append(content).contents().map(function () {
                        return this.nodeType === Node.COMMENT_NODE ? "\x3c!--".concat(this.nodeValue, "--\x3e") : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : "";
                    }).toArray().join("");
                    var p = trim(id);
                    var tr = write(id, "html");
                    fn(editor.$el, "".concat(yyyy, "\n").concat(i));
                    editor.node.clearAttributes(editor.el);
                    editor.$el.attr(w);
                    editor.$el.addClass("fr-view");
                    editor.$el.attr("spellcheck", editor.opts.spellcheck);
                    editor.$el.attr("dir", editor.opts.direction);
                    fn(editor.$head, content);
                    editor.node.clearAttributes(editor.$head.get(0));
                    editor.$head.attr(iframe);
                    editor.node.clearAttributes(editor.$html.get(0));
                    editor.$html.attr(tr);
                    editor.iframe_document.doctype.parentNode.replaceChild(function (name, dom) {
                        var publicPieces = name.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
                        return publicPieces ? dom.implementation.createDocumentType(publicPieces[1], publicPieces[3], publicPieces[4]) : dom.implementation.createDocumentType("html");
                    }(p, editor.iframe_document), editor.iframe_document.doctype);
                } else {
                    fn(editor.$el, id);
                }
                var u = editor.edit.isDisabled();
                editor.edit.on();
                editor.core.injectStyle(editor.opts.iframeDefaultStyle + editor.opts.iframeStyle);
                remove();
                if (!editor.opts.useClasses) {
                    editor.$el.find("[fr-original-class]").each(function () {
                        this.setAttribute("class", this.getAttribute("fr-original-class"));
                        this.removeAttribute("fr-original-class");
                    });
                    editor.$el.find("[fr-original-style]").each(function () {
                        // Only apply fr-original-style, when style is not set.
                        // Adresses font-size changes, where fr-original-style is only updated the first time font-size is changed.
                        if (!this.getAttribute("style")) {
                            this.setAttribute("style", this.getAttribute("fr-original-style"));
                            this.removeAttribute("fr-original-style");
                        }
                    });
                }
                if (u) {
                    editor.edit.off();
                }
                editor.events.trigger("html.set");
                editor.events.trigger("charCounter.update");
            },
            syncInputs: compile,
            get: function (type, n) {
                if (!editor.$wp) {
                    return editor.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                }
                /** @type {string} */
                var r = "";
                editor.events.trigger("html.beforeGet");
                var j;
                var i;
                /** @type {!Array} */
                var elms = [];
                var hash = {};
                /** @type {!Array} */
                var self = [];
                if (compile(), !editor.opts.useClasses && !n) {
                    /** @type {!RegExp} */
                    var regx = new RegExp("^".concat(editor.opts.htmlIgnoreCSSProperties.join("$|^"), "$"), "gi");
                    /** @type {number} */
                    j = 0;
                    for (; j < editor.doc.styleSheets.length; j++) {
                        var rules = void 0;
                        /** @type {number} */
                        var h = 0;
                        try {
                            rules = editor.doc.styleSheets[j].cssRules;
                            if (editor.doc.styleSheets[j].ownerNode && "STYLE" === editor.doc.styleSheets[j].ownerNode.nodeType) {
                                /** @type {number} */
                                h = 1;
                            }
                        } catch (e) {
                        }
                        if (rules) {
                            /** @type {number} */
                            var j = 0;
                            var i = rules.length;
                            for (; j < i; j++) {
                                if (rules[j].selectorText && 0 < rules[j].style.cssText.length) {
                                    var query = rules[j].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":");
                                    var el = void 0;
                                    try {
                                        el = editor.el.querySelectorAll(query);
                                    } catch (e) {
                                        /** @type {!Array} */
                                        el = [];
                                    }
                                    /** @type {number} */
                                    i = 0;
                                    for (; i < el.length; i++) {
                                        if (!el[i].getAttribute("fr-original-style") && el[i].getAttribute("style")) {
                                            el[i].setAttribute("fr-original-style", el[i].getAttribute("style"));
                                            elms.push(el[i]);
                                        } else {
                                            if (!el[i].getAttribute("fr-original-style")) {
                                                el[i].setAttribute("fr-original-style", "");
                                                elms.push(el[i]);
                                            }
                                        }
                                        if (!hash[el[i]]) {
                                            hash[el[i]] = {};
                                        }
                                        var name = 1E3 * h + getValue(rules[j].selectorText);
                                        var sibs = rules[j].style.cssText.split(";");
                                        /** @type {number} */
                                        var sibi = 0;
                                        for (; sibi < sibs.length; sibi++) {
                                            var key = sibs[sibi].trim().split(":")[0];
                                            if (key && !key.match(regx) && (hash[el[i]][key] || (hash[el[i]][key] = 0) <= (el[i].getAttribute("fr-original-style") || "").indexOf("".concat(key, ":")) && (hash[el[i]][key] = 1E4), name >= hash[el[i]][key] && (hash[el[i]][key] = name, sibs[sibi].trim().length))) {
                                                var outChance = sibs[sibi].trim().split(":");
                                                outChance.splice(0, 1);
                                                self.push([el[i], key.trim(), outChance.join(":").trim(), name]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    self.sort(subtract);
                    /** @type {number} */
                    j = 0;
                    for (; j < self.length; j++) {
                        var value = self[j];
                        value[0].style[value[1]] = value[2];
                    }
                    /** @type {number} */
                    j = 0;
                    for (; j < elms.length; j++) {
                        if (elms[j].getAttribute("class") && (elms[j].setAttribute("fr-original-class", elms[j].getAttribute("class")), elms[j].removeAttribute("class")), 0 < (elms[j].getAttribute("fr-original-style") || "").trim().length) {
                            var newUrlParts = elms[j].getAttribute("fr-original-style").split(";");
                            /** @type {number} */
                            i = 0;
                            for (; i < newUrlParts.length; i++) {
                                if (0 < newUrlParts[i].indexOf(":")) {
                                    var conditions = newUrlParts[i].split(":");
                                    var item = conditions[0];
                                    conditions.splice(0, 1);
                                    elms[j].style[item.trim()] = conditions.join(":").trim();
                                }
                            }
                        }
                    }
                }
                if (editor.node.isEmpty(editor.el)) {
                    if (editor.opts.fullPage) {
                        r = walk(editor.iframe_document);
                        /** @type {string} */
                        r = r + "<html".concat(editor.node.attributes(editor.$html.get(0)), ">").concat(editor.$html.find("head").get(0).outerHTML, "<body></body></html>");
                    }
                } else {
                    if (void 0 === type && (type = false), editor.opts.fullPage) {
                        r = walk(editor.iframe_document);
                        editor.$el.removeClass("fr-view");
                        var w = editor.opts.heightMin;
                        var designHeight = editor.opts.height;
                        var max_height = editor.opts.heightMax;
                        /** @type {null} */
                        editor.opts.heightMin = null;
                        /** @type {null} */
                        editor.opts.height = null;
                        /** @type {null} */
                        editor.opts.heightMax = null;
                        editor.size.refresh();
                        /** @type {string} */
                        r = r + "<html".concat(editor.node.attributes(editor.$html.get(0)), ">").concat(editor.$html.html(), "</html>");
                        editor.opts.heightMin = w;
                        editor.opts.height = designHeight;
                        editor.opts.heightMax = max_height;
                        editor.size.refresh();
                        editor.$el.addClass("fr-view");
                    } else {
                        r = editor.$el.html();
                    }
                }
                if (!editor.opts.useClasses && !n) {
                    /** @type {number} */
                    j = 0;
                    for (; j < elms.length; j++) {
                        if (elms[j].getAttribute("fr-original-class")) {
                            elms[j].setAttribute("class", elms[j].getAttribute("fr-original-class"));
                            elms[j].removeAttribute("fr-original-class");
                        }
                        if (null !== elms[j].getAttribute("fr-original-style") && void 0 !== elms[j].getAttribute("fr-original-style")) {
                            if (0 !== elms[j].getAttribute("fr-original-style").length) {
                                elms[j].setAttribute("style", elms[j].getAttribute("fr-original-style"));
                            } else {
                                elms[j].removeAttribute("style");
                            }
                            elms[j].removeAttribute("fr-original-style");
                        } else {
                            elms[j].removeAttribute("style");
                        }
                    }
                }
                if (editor.opts.fullPage) {
                    r = (r = (r = (r = (r = (r = (r = (r = r.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,
                        "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>");
                }
                if (editor.opts.htmlSimpleAmpersand) {
                    r = r.replace(/&amp;/gi, "&");
                }
                editor.events.trigger("html.afterGet");
                if (!type) {
                    r = r.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "");
                }
                r = editor.clean.invisibleSpaces(r);
                r = editor.clean.exec(r, callback);
                var q = editor.events.chainTrigger("html.get", r);
                return "string" == typeof q && (r = q), (r = r.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function (commaParam) {
                    return commaParam.replace(/<br>/g, "\n");
                })).replace(/<meta((?:[\w\W]*?)) data-fr-http-equiv="/g, '<meta$1 http-equiv="');
            },
            getSelected: function () {
                /**
                 * @param {!Object} el
                 * @param {!Object} node
                 * @return {undefined}
                 */
                function parse(el, node) {
                    for (; node && (node.nodeType === Node.TEXT_NODE || !editor.node.isBlock(node)) && !editor.node.isElement(node) && !editor.node.hasClass(node, "fr-inner");) {
                        if (node && node.nodeType !== Node.TEXT_NODE) {
                            $(el).wrapInner(editor.node.openTagString(node) + editor.node.closeTagString(node));
                        }
                        node = node.parentNode;
                    }
                    if (node && el.innerHTML === node.innerHTML) {
                        el.innerHTML = node.outerHTML;
                    } else {
                        if (-1 != node.innerText.indexOf(el.innerHTML)) {
                            el.innerHTML = editor.node.openTagString(node) + node.innerHTML + editor.node.closeTagString(node);
                        }
                    }
                }
                var sel;
                var node;
                /** @type {string} */
                var result = "";
                if (void 0 !== editor.win.getSelection) {
                    if (editor.browser.mozilla) {
                        editor.selection.save();
                        if (1 < editor.$el.find('.fr-marker[data-type="false"]').length) {
                            editor.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove();
                            editor.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0");
                            editor.$el.find(".fr-marker").not('[data-id="0"]').remove();
                        }
                        editor.selection.restore();
                    }
                    var keywordResults = editor.selection.ranges();
                    /** @type {number} */
                    var i = 0;
                    for (; i < keywordResults.length; i++) {
                        /** @type {!Element} */
                        var el = document.createElement("div");
                        el.appendChild(keywordResults[i].cloneContents());
                        parse(el, (node = sel = void 0, node = null, editor.win.getSelection ? (sel = editor.win.getSelection()) && sel.rangeCount && (node = sel.getRangeAt(0).commonAncestorContainer).nodeType !== Node.ELEMENT_NODE && (node = node.parentNode) : (sel = editor.doc.selection) && "Control" !== sel.type && (node = sel.createRange().parentElement()), null !== node && (0 <= $(node).parents().toArray().indexOf(editor.el) || node === editor.el) ? node : null));
                        if (0 < $(el).find(".fr-element").length) {
                            el = editor.el;
                        }
                        /** @type {string} */
                        result = result + el.innerHTML;
                    }
                } else {
                    if (void 0 !== editor.doc.selection && "Text" === editor.doc.selection.type) {
                        result = editor.doc.selection.createRange().htmlText;
                    }
                }
                return result;
            },
            insert: function (value, key, n) {
                var result;
                if (editor.selection.isCollapsed() || editor.selection.remove(), result = key ? value : editor.clean.html(value), value.indexOf('class="fr-marker"') < 0 && (result = function (e) {
                    var t = editor.doc.createElement("div");
                    return t.innerHTML = e, editor.selection.setAtEnd(t, true), t.innerHTML;
                }(result)), editor.node.isEmpty(editor.el) && !editor.opts.keepFormatOnDelete && success(result)) {
                    editor.el.innerHTML = result;
                } else {
                    var node = editor.markers.insert();
                    if (node) {
                        if (editor.node.isLastSibling(node) && $(node).parent().hasClass("fr-deletable")) {
                            $(node).insertAfter($(node).parent());
                        }
                        var color = editor.node.blockParent(node);
                        if ((success(result) || n) && (editor.node.deepestParent(node) || color && "LI" === color.tagName)) {
                            if (color && "LI" === color.tagName && (result = function (value) {
                                if (!editor.html.defaultTag()) {
                                    return value;
                                }
                                var parent = editor.doc.createElement("div");
                                /** @type {string} */
                                parent.innerHTML = value;
                                var forgottenTemplates = parent.querySelectorAll(":scope > ".concat(editor.html.defaultTag()));
                                /** @type {number} */
                                var i = forgottenTemplates.length - 1;
                                for (; 0 <= i; i--) {
                                    var el = forgottenTemplates[i];
                                    if (!editor.node.isBlock(el.previousSibling)) {
                                        if (el.previousSibling && !editor.node.isEmpty(el)) {
                                            $("<br>").insertAfter(el.previousSibling);
                                        }
                                        el.outerHTML = el.innerHTML;
                                    }
                                }
                                return parent.innerHTML;
                            }(result)), !(node = editor.markers.split())) {
                                return false;
                            }
                            node.outerHTML = result;
                        } else {
                            node.outerHTML = result;
                        }
                    } else {
                        editor.el.innerHTML += result;
                    }
                }
                remove();
                editor.keys.positionCaret();
                editor.events.trigger("html.inserted");
            },
            wrap: get,
            unwrap: function () {
                editor.$el.find("div.fr-temp-div").each(function () {
                    if (this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE) {
                        $(this).before("<br>");
                    }
                    if ($(this).attr("data-empty") || !this.nextSibling || editor.node.isBlock(this.nextSibling) && !$(this.nextSibling).hasClass("fr-temp-div")) {
                        $(this).replaceWith($(this).html());
                    } else {
                        $(this).replaceWith("".concat($(this).html(), "<br>"));
                    }
                });
                editor.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function () {
                    return "" === $(this).attr("class");
                }).removeAttr("class");
            },
            escapeEntities: function (text) {
                return text.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;");
            },
            checkIfEmpty: render,
            extractNode: wrap,
            extractNodeAttrs: write,
            extractDoctype: trim,
            cleanBRs: function () {
                var elements = editor.el.getElementsByTagName("br");
                /** @type {number} */
                var i = 0;
                for (; i < elements.length; i++) {
                    update(elements[i]);
                }
            },
            _init: function () {
                editor.events.$on(editor.$el, "mousemove", "span.fr-word-select", function (event) {
                    /** @type {(Selection|null)} */
                    var sel = window.getSelection();
                    /** @type {(Selection|null)} */
                    sel = window.getSelection();
                    /** @type {(Range|null)} */
                    var range = document.createRange();
                    range.selectNodeContents(event.target);
                    sel.removeAllRanges();
                    sel.addRange(range);
                });
                if (editor.$wp) {
                    editor.events.on("mouseup", warning);
                    editor.events.on("keydown", warning);
                    editor.events.on("contentChanged", render);
                }
            },
            _setHtml: fn
        };
    };
    /////////////
    // KEY CODES
    /////////////
    /** @type {number} */
    data.ENTER_P = 0;
    /** @type {number} */
    data.ENTER_DIV = 1;
    /** @type {number} */
    data.ENTER_BR = 2;
    data.KEYCODE = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        FF_HYPHEN: 173,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        HYPHEN: 189,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        IME: 229
    };
    Object.assign(data.DEFAULTS, {
        enter: data.ENTER_P,
        multiLine: true,
        tabSpaces: 0
    });
    /**
     * KEY MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.keys = function (editor) {
        /**
         * @param {!Object} event
         * @return {undefined}
         */
        function create(event) {
            if (editor.selection.isCollapsed()) {
                if (["INPUT", "BUTTON", "TEXTAREA"].indexOf(event.target && event.target.tagName) < 0 && editor.cursor.backspace(), editor.helpers.isIOS()) {
                    var range = editor.selection.ranges(0);
                    range.deleteContents();
                    range.insertNode(document.createTextNode("\u200b"));
                    editor.selection.get().modify("move", "forward", "character");
                } else {
                    if (["INPUT", "BUTTON", "TEXTAREA"].indexOf(event.target && event.target.tagName) < 0) {
                        event.preventDefault();
                    }
                    event.stopPropagation();
                }
            } else {
                event.preventDefault();
                event.stopPropagation();
                editor.selection.remove();
            }
            editor.placeholder.refresh();
        }
        /**
         * @param {!Object} event
         * @return {undefined}
         */
        function remove(event) {
            if (["INPUT", "BUTTON", "TEXTAREA"].indexOf(event.target && event.target.tagName) < 0) {
                event.preventDefault();
            }
            event.stopPropagation();
            if ("" !== editor.selection.text() || !editor.selection.isCollapsed() && "IMG" == editor.selection.element().tagName) {
                editor.selection.remove();
            } else {
                editor.cursor.del();
            }
            editor.placeholder.refresh();
        }
        /**
         * @return {undefined}
         */
        function insert() {
            if (editor.browser.mozilla && editor.selection.isCollapsed() && !a) {
                var range = editor.selection.ranges(0);
                var node = range.startContainer;
                var pos = range.startOffset;
                if (node && node.nodeType === Node.TEXT_NODE && pos <= node.textContent.length && 0 < pos && 32 === node.textContent.charCodeAt(pos - 1)) {
                    editor.selection.save();
                    editor.spaces.normalize();
                    editor.selection.restore();
                }
            }
        }
        /**
         * @return {undefined}
         */
        function start() {
            if (editor.selection.isFull()) {
                setTimeout(function () {
                    var n = editor.html.defaultTag();
                    if (n) {
                        editor.$el.html("<".concat(n, ">").concat(data.MARKERS, "<br/></").concat(n, ">"));
                    } else {
                        editor.$el.html("".concat(data.MARKERS, "<br/>"));
                    }
                    editor.selection.restore();
                    editor.placeholder.refresh();
                    editor.button.bulkRefresh();
                    editor.undo.saveStep();
                }, 0);
            }
        }
        /**
         * @return {undefined}
         */
        function isEqual() {
            /** @type {boolean} */
            a = false;
        }
        /**
         * @return {undefined}
         */
        function error() {
            /** @type {boolean} */
            a = false;
        }
        /**
         * @return {undefined}
         */
        function refresh() {
            var n = editor.html.defaultTag();
            if (n) {
                editor.$el.html("<".concat(n, ">").concat(data.MARKERS, "<br/></").concat(n, ">"));
            } else {
                editor.$el.html("".concat(data.MARKERS, "<br/>"));
            }
            editor.selection.restore();
        }
        /**
         * @param {!HTMLElement} e
         * @param {!Object} obj
         * @return {?}
         */
        function callback(e, obj) {
            if ((-1 < e.innerHTML.indexOf("<span") || -1 < e.parentElement.innerHTML.indexOf("<span") || -1 < e.parentElement.parentElement.innerHTML.indexOf("<span")) && (e.classList.contains("fr-img-space-wrap") || e.parentElement.classList.contains("fr-img-space-wrap") || e.parentElement.parentElement.classList.contains("fr-img-space-wrap"))) {
                if ($(e.parentElement).is("p")) {
                    var n = e.parentElement.innerHTML;
                    return (n = n.replace(/<br>/g, "")).length < 1 ? e.parentElement.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != n && " " != n && "Backspace" == obj.key ? create(obj) : "&nbsp;" != n && " " != n && "Delete" == obj.key && remove(obj), true;
                }
                if ($(e).is("p")) {
                    var t = e.innerHTML.replace(/<br>/g, "");
                    return t.length < 1 ? e.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != t && " " != t && "Backspace" == obj.key ? create(obj) : "&nbsp;" != t && " " != t && "Delete" == obj.key && remove(obj), true;
                }
            }
            return false;
        }
        /**
         * @param {!Object} event
         * @return {?}
         */
        function update(event) {
            var f = editor.selection.element();
            if (f && 0 <= ["INPUT", "TEXTAREA"].indexOf(f.tagName)) {
                return true;
            }
            if (event && success(event.which)) {
                return true;
            }
            editor.events.disableBlur();
            var key = event.which;
            if (16 === key) {
                return true;
            }
            if ((keyCode = key) === data.KEYCODE.IME) {
                return a = true;
            }
            /** @type {boolean} */
            a = false;
            var o = next(key) && !click(event) && !event.altKey;
            /** @type {boolean} */
            var Post = key === data.KEYCODE.BACKSPACE || key === data.KEYCODE.DELETE;
            if ((editor.selection.isFull() && !editor.opts.keepFormatOnDelete && !editor.placeholder.isVisible() || Post && editor.placeholder.isVisible() && editor.opts.keepFormatOnDelete) && (o || Post) && (refresh(), !next(key))) {
                return event.preventDefault(), true;
            }
            if (key === data.KEYCODE.ENTER) {
                if (event.shiftKey || f.classList.contains("fr-inner") || f.parentElement.classList.contains("fr-inner")) {
                    (function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (editor.opts.multiLine) {
                            if (!editor.selection.isCollapsed()) {
                                editor.selection.remove();
                            }
                            editor.cursor.enter(true);
                        }
                    })(event);
                } else {
                    (function (event) {
                        if (editor.opts.multiLine) {
                            if (!editor.helpers.isIOS()) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            if (!editor.selection.isCollapsed()) {
                                editor.selection.remove();
                            }
                            editor.cursor.enter();
                        } else {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    })(event);
                }
            } else {
                if (key === data.KEYCODE.BACKSPACE && (event.metaKey || event.ctrlKey)) {
                    setTimeout(function () {
                        editor.events.disableBlur();
                        editor.events.focus();
                    }, 0);
                } else {
                    if (key !== data.KEYCODE.BACKSPACE || click(event) || event.altKey) {
                        if (key !== data.KEYCODE.DELETE || click(event) || event.altKey || event.shiftKey) {
                            if (key === data.KEYCODE.SPACE) {
                                (function (event) {
                                    var target = editor.selection.element();
                                    if (!editor.helpers.isMobile() && target && "A" === target.tagName) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        if (!editor.selection.isCollapsed()) {
                                            editor.selection.remove();
                                        }
                                        var e = editor.markers.insert();
                                        if (e) {
                                            var el = e.previousSibling;
                                            if (!e.nextSibling && e.parentNode && "A" === e.parentNode.tagName) {
                                                e.parentNode.insertAdjacentHTML("afterend", "&nbsp;".concat(data.MARKERS));
                                                e.parentNode.removeChild(e);
                                            } else {
                                                if (el && el.nodeType === Node.TEXT_NODE && 1 === el.textContent.length && 160 === el.textContent.charCodeAt(0)) {
                                                    el.textContent += " ";
                                                } else {
                                                    e.insertAdjacentHTML("beforebegin", "&nbsp;");
                                                }
                                                /** @type {string} */
                                                e.outerHTML = data.MARKERS;
                                            }
                                            editor.selection.restore();
                                        }
                                    }
                                })(event);
                            } else {
                                // Handlle tab
                                if (key === data.KEYCODE.TAB) {
                                    (function (event) {
                                        if (0 < editor.opts.tabSpaces) {
                                            if (editor.selection.isCollapsed()) {
                                                editor.undo.saveStep();
                                                event.preventDefault();
                                                event.stopPropagation();
                                                /** @type {string} */
                                                var header = "";
                                                /** @type {number} */
                                                var r = 0;
                                                for (; r < editor.opts.tabSpaces; r++) {
                                                    /** @type {string} */
                                                    header = header + "&nbsp;";
                                                }
                                                editor.html.insert(header);
                                                editor.placeholder.refresh();
                                                editor.undo.saveStep();
                                            } else {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                if (event.shiftKey) {
                                                    editor.commands.outdent();
                                                } else {
                                                    editor.commands.indent();
                                                }
                                            }
                                        }
                                    })(event);
                                } else {
                                    if (!(click(event) || !next(event.which) || editor.selection.isCollapsed() || event.ctrlKey || event.altKey)) {
                                        editor.selection.remove();
                                    }
                                }
                            }
                        } else {
                            if (callback(f, event)) {
                                return event.preventDefault(), void event.stopPropagation();
                            }
                            if (editor.placeholder.isVisible()) {
                                if (!editor.opts.keepFormatOnDelete) {
                                    refresh();
                                }
                                event.preventDefault();
                                event.stopPropagation();
                            } else {
                                remove(event);
                            }
                        }
                    } else {
                        if (callback(f, event)) {
                            return event.preventDefault(), void event.stopPropagation();
                        }
                        if (editor.placeholder.isVisible()) {
                            if (!editor.opts.keepFormatOnDelete) {
                                refresh();
                            }
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            create(event);
                        }
                    }
                }
            }
            editor.events.enableBlur();
        }
        /**
         * @return {?}
         */
        function setup() {
            if (!editor.$wp) {
                return true;
            }
            var height;
            if (editor.opts.height || editor.opts.heightMax) {
                height = editor.position.getBoundingRect().top;
                if (editor.helpers.isIOS() || editor.helpers.isAndroid()) {
                    /** @type {number} */
                    height = height - editor.helpers.scrollTop();
                }
                if (editor.opts.iframe) {
                    height = height + editor.$iframe.offset().top;
                }
                if (height > editor.$wp.offset().top - editor.helpers.scrollTop() + editor.$wp.height() - 20) {
                    editor.$wp.scrollTop(height + editor.$wp.scrollTop() - (editor.$wp.height() + editor.$wp.offset().top) + editor.helpers.scrollTop() + 20);
                }
            } else {
                height = editor.position.getBoundingRect().top;
                if (editor.opts.toolbarBottom) {
                    height = height + editor.opts.toolbarStickyOffset;
                }
                if (editor.helpers.isIOS() || editor.helpers.isAndroid()) {
                    /** @type {number} */
                    height = height - editor.helpers.scrollTop();
                }
                if (editor.opts.iframe) {
                    height = height + editor.$iframe.offset().top;
                    /** @type {number} */
                    height = height - editor.helpers.scrollTop();
                }
                if ((height = height + editor.opts.toolbarStickyOffset) > editor.o_win.innerHeight - 20) {
                    $(editor.o_win).scrollTop(height + editor.helpers.scrollTop() - editor.o_win.innerHeight + 20);
                }
                height = editor.position.getBoundingRect().top;
                if (!editor.opts.toolbarBottom) {
                    /** @type {number} */
                    height = height - editor.opts.toolbarStickyOffset;
                }
                if (editor.helpers.isIOS() || editor.helpers.isAndroid()) {
                    /** @type {number} */
                    height = height - editor.helpers.scrollTop();
                }
                if (editor.opts.iframe) {
                    height = height + editor.$iframe.offset().top;
                    /** @type {number} */
                    height = height - editor.helpers.scrollTop();
                }
                if (height < 100) {
                    $(editor.o_win).scrollTop(height + editor.helpers.scrollTop() - 100);
                }
            }
        }
        /**
         * @param {!Object} e
         * @return {?}
         */
        function init(e) {
            var inConfig = editor.selection.element();
            if (inConfig && 0 <= ["INPUT", "TEXTAREA"].indexOf(inConfig.tagName)) {
                return true;
            }
            if (e && 0 === e.which && keyCode && (e.which = keyCode), editor.helpers.isAndroid() && editor.browser.mozilla) {
                return true;
            }
            if (a) {
                return false;
            }
            if (e && editor.helpers.isIOS() && e.which === data.KEYCODE.ENTER && editor.doc.execCommand("undo"), !editor.selection.isCollapsed()) {
                return true;
            }
            if (e && (e.which === data.KEYCODE.META || e.which === data.KEYCODE.CTRL)) {
                return true;
            }
            if (e && success(e.which)) {
                return true;
            }
            if (e && !editor.helpers.isIOS() && (e.which === data.KEYCODE.ENTER || e.which === data.KEYCODE.BACKSPACE || 37 <= e.which && e.which <= 40 && !editor.browser.msie)) {
                try {
                    setup();
                } catch (e) {
                }
            }
            var element = editor.selection.element();
            if (function (item) {
                if (!item) {
                    return false;
                }
                var t = item.innerHTML;
                return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length);
            }(element) && !editor.node.hasClass(element, "fr-marker") && "IFRAME" !== element.tagName && function (item) {
                return !editor.helpers.isIOS() || 0 === ((item.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length;
            }(element)) {
                editor.selection.save();
                (function (rootElement) {
                    var walker = editor.doc.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, editor.node.filter(function (nod) {
                        return /\u200B/gi.test(nod.textContent);
                    }), false);
                    for (; walker.nextNode();) {
                        var element = walker.currentNode;
                        element.textContent = element.textContent.replace(/\u200B/gi, "");
                    }
                })(element);
                editor.selection.restore();
            }
        }
        /**
         * @param {!Object} event
         * @return {?}
         */
        function click(event) {
            if (-1 !== navigator.userAgent.indexOf("Mac OS X")) {
                if (event.metaKey && !event.altKey) {
                    return true;
                }
            } else {
                if (event.ctrlKey && !event.altKey) {
                    return true;
                }
            }
            return false;
        }
        /**
         * @param {number} s
         * @return {?}
         */
        function success(s) {
            if (s >= data.KEYCODE.ARROW_LEFT && s <= data.KEYCODE.ARROW_DOWN) {
                return true;
            }
        }
        /**
         * @param {number} keyCode
         * @return {?}
         */
        function next(keyCode) {
            if (keyCode >= data.KEYCODE.ZERO && keyCode <= data.KEYCODE.NINE) {
                return true;
            }
            if (keyCode >= data.KEYCODE.NUM_ZERO && keyCode <= data.KEYCODE.NUM_MULTIPLY) {
                return true;
            }
            if (keyCode >= data.KEYCODE.A && keyCode <= data.KEYCODE.Z) {
                return true;
            }
            if (editor.browser.webkit && 0 === keyCode) {
                return true;
            }
            switch (keyCode) {
                case data.KEYCODE.SPACE:
                case data.KEYCODE.QUESTION_MARK:
                case data.KEYCODE.NUM_PLUS:
                case data.KEYCODE.NUM_MINUS:
                case data.KEYCODE.NUM_PERIOD:
                case data.KEYCODE.NUM_DIVISION:
                case data.KEYCODE.SEMICOLON:
                case data.KEYCODE.FF_SEMICOLON:
                case data.KEYCODE.DASH:
                case data.KEYCODE.EQUALS:
                case data.KEYCODE.FF_EQUALS:
                case data.KEYCODE.COMMA:
                case data.KEYCODE.PERIOD:
                case data.KEYCODE.SLASH:
                case data.KEYCODE.APOSTROPHE:
                case data.KEYCODE.SINGLE_QUOTE:
                case data.KEYCODE.OPEN_SQUARE_BRACKET:
                case data.KEYCODE.BACKSLASH:
                case data.KEYCODE.CLOSE_SQUARE_BRACKET:
                    return true;
                default:
                    return false;
            }
        }
        /**
         * @param {!Object} event
         * @return {?}
         */
        function onKeyDown(event) {
            var key = event.which;
            if (click(event) || 37 <= key && key <= 40 || !next(key) && key !== data.KEYCODE.DELETE && key !== data.KEYCODE.BACKSPACE && key !== data.KEYCODE.ENTER && key !== data.KEYCODE.IME) {
                return true;
            }
            if (!_takingTooLongTimeout) {
                gridSubStep = editor.snapshot.get();
                if (!editor.undo.canDo()) {
                    editor.undo.saveStep();
                }
            }
            clearTimeout(_takingTooLongTimeout);
            /** @type {number} */
            _takingTooLongTimeout = setTimeout(function () {
                /** @type {null} */
                _takingTooLongTimeout = null;
                editor.undo.saveStep();
            }, Math.max(250, editor.opts.typingTimer));
        }
        /**
         * @param {!Object} event
         * @return {?}
         */
        function handler(event) {
            var code = event.which;
            if (click(event) || 37 <= code && code <= 40) {
                return true;
            }
            if (gridSubStep && _takingTooLongTimeout) {
                editor.undo.saveStep(gridSubStep);
                /** @type {null} */
                gridSubStep = null;
            } else {
                if (!(void 0 !== code && 0 !== code || gridSubStep || _takingTooLongTimeout)) {
                    editor.undo.saveStep();
                }
            }
        }
        /**
         * @param {!Node} node
         * @return {?}
         */
        function getValue(node) {
            if (node && "BR" === node.tagName) {
                return false;
            }
            try {
                return 0 === (node.textContent || "").length && node.querySelector && !node.querySelector(":scope > br") || node.childNodes && 1 === node.childNodes.length && node.childNodes[0].getAttribute && ("false" === node.childNodes[0].getAttribute("contenteditable") || editor.node.hasClass(node.childNodes[0], "fr-img-caption"));
            } catch (e) {
                return false;
            }
        }
        /**
         * @param {!Event} e
         * @return {?}
         */
        function render(e) {
            var nodes = editor.el.childNodes;
            var result = editor.html.defaultTag();
            var node = editor.node.blockParent(editor.selection.blocks()[0]);
            return node && "TR" == node.tagName && null == node.getAttribute("contenteditable") && (node = node.closest("table")), !editor.node.isEditable(e.target) || node && "false" === node.getAttribute("contenteditable") ? editor.toolbar.disable() : editor.toolbar.enable(), !(!e.target || e.target === editor.el) || 0 === nodes.length || void (nodes[0].offsetHeight + nodes[0].offsetTop <= e.offsetY ? getValue(nodes[nodes.length - 1]) && (result ? editor.$el.append("<".concat(result, ">").concat(data.MARKERS,
                "<br></").concat(result, ">")) : editor.$el.append("".concat(data.MARKERS, "<br>")), editor.selection.restore(), setup()) : e.offsetY <= 10 && getValue(nodes[0]) && (result ? editor.$el.prepend("<".concat(result, ">").concat(data.MARKERS, "<br></").concat(result, ">")) : editor.$el.prepend("".concat(data.MARKERS, "<br>")), editor.selection.restore(), setup()));
        }
        /**
         * @return {undefined}
         */
        function done() {
            if (_takingTooLongTimeout) {
                clearTimeout(_takingTooLongTimeout);
            }
        }
        var keyCode;
        var _takingTooLongTimeout;
        var gridSubStep;
        var $ = editor.$;
        /** @type {boolean} */
        var a = false;
        return {
            _init: function () {
                editor.events.on("keydown", onKeyDown);
                editor.events.on("input", insert);
                editor.events.on("mousedown", error);
                editor.events.on("keyup input", handler);
                editor.events.on("keypress", isEqual);
                editor.events.on("keydown", update);
                editor.events.on("keyup", init);
                editor.events.on("destroy", done);
                editor.events.on("html.inserted", init);
                editor.events.on("cut", start);
                if (editor.opts.multiLine) {
                    editor.events.on("click", render);
                }
            },
            ctrlKey: click,
            isCharacter: next,
            isArrow: success,
            forceUndo: function () {
                if (_takingTooLongTimeout) {
                    clearTimeout(_takingTooLongTimeout);
                    editor.undo.saveStep();
                    /** @type {null} */
                    gridSubStep = null;
                }
            },
            isIME: function () {
                return a;
            },
            isBrowserAction: function (event) {
                var keyCode = event.which;
                return click(event) || keyCode === data.KEYCODE.F5;
            },
            positionCaret: setup
        };
    };
    Object.assign(data.DEFAULTS, {
        pastePlain: false,
        pasteDeniedTags: ["colgroup", "col", "meta"],
        pasteDeniedAttrs: ["class", "id"],
        pasteAllowedStyleProps: [".*"],
        pasteAllowLocalImages: false
    });
    /**
     * PASTE MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.paste = function (editor) {
        /**
         * @param {?} val
         * @param {?} secret
         * @return {undefined}
         */
        function filter(val, secret) {
            try {
                editor.win.localStorage.setItem("fr-copied-html", val);
                editor.win.localStorage.setItem("fr-copied-text", secret);
            } catch (e) {
            }
        }
        /**
         * @param {!Object} matchesLookup
         * @return {undefined}
         */
        function render(matchesLookup) {
            var current = editor.html.getSelected();
            filter(current, $(editor.doc.createElement("div")).html(current).text());
            if ("cut" === matchesLookup.type) {
                editor.undo.saveStep();
                setTimeout(function () {
                    editor.selection.save();
                    editor.html.wrap();
                    editor.selection.restore();
                    editor.events.focus();
                    editor.undo.saveStep();
                }, 0);
            }
        }
        /**
         * @param {!Event} e
         * @return {?}
         */
        function update(e) {
            if ("INPUT" === e.target.nodeName && "text" === e.target.type) {
                return true;
            }
            if (editor.edit.isDisabled()) {
                return false;
            }
            if (add(e.target)) {
                return false;
            }
            if (d) {
                return false;
            }
            if (e.originalEvent && (e = e.originalEvent), false === editor.events.trigger("paste.before", [e])) {
                return e.preventDefault(), false;
            }
            if (e && e.clipboardData && e.clipboardData.getData) {
                /** @type {string} */
                var url = "";
                var m = e.clipboardData.types;
                if (editor.helpers.isArray(m)) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < m.length; i++) {
                        /** @type {string} */
                        url = url + "".concat(m[i], ";");
                    }
                } else {
                    url = m;
                }
                if (data = "", /text\/rtf/.test(url) && (id = e.clipboardData.getData("text/rtf")), /text\/html/.test(url) && !editor.browser.safari ? data = e.clipboardData.getData("text/html") : /text\/rtf/.test(url) && editor.browser.safari ? data = id : /public.rtf/.test(url) && editor.browser.safari && (data = e.clipboardData.getData("text/rtf")), l = e.clipboardData.getData("text"), "" !== data) {
                    return show(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), false;
                }
                /** @type {null} */
                data = null;
            }
            return function () {
                var scrollPos;
                editor.selection.save();
                editor.events.disableBlur();
                /** @type {null} */
                data = null;
                if (i) {
                    i.html("");
                    if (editor.browser.edge && editor.opts.iframe) {
                        editor.$el.append(i);
                    }
                } else {
                    i = $('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>');
                    if (editor.browser.webkit || editor.browser.mozilla) {
                        i.css("top", editor.$sc.scrollTop());
                        editor.$el.after(i);
                    } else {
                        if (editor.browser.edge && editor.opts.iframe) {
                            editor.$el.append(i);
                        } else {
                            editor.$box.after(i);
                        }
                    }
                    editor.events.on("destroy", function () {
                        i.remove();
                    });
                }
                if (editor.helpers.isIOS() && editor.$sc) {
                    scrollPos = editor.$sc.scrollTop();
                }
                if (editor.opts.iframe) {
                    editor.$el.attr("contenteditable", "false");
                }
                i.focus();
                if (editor.helpers.isIOS() && editor.$sc) {
                    editor.$sc.scrollTop(scrollPos);
                }
                editor.win.setTimeout(show, 1);
            }(), false;
        }
        /**
         * @param {!Object} cont
         * @return {?}
         */
        function add(cont) {
            return cont && "false" === cont.contentEditable;
        }
        /**
         * @param {!Object} e
         * @return {?}
         */
        function callback(e) {
            if (e.originalEvent && (e = e.originalEvent), add(e.target)) {
                return false;
            }
            if (e && e.dataTransfer && e.dataTransfer.getData) {
                /** @type {string} */
                var url = "";
                var m = e.dataTransfer.types;
                if (editor.helpers.isArray(m)) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < m.length; i++) {
                        /** @type {string} */
                        url = url + "".concat(m[i], ";");
                    }
                } else {
                    url = m;
                }
                if (data = "", /text\/rtf/.test(url) && (id = e.dataTransfer.getData("text/rtf")), /text\/html/.test(url) ? data = e.dataTransfer.getData("text/html") : /text\/rtf/.test(url) && editor.browser.safari ? data = id : /text\/plain/.test(url) && !this.browser.mozilla && (data = editor.html.escapeEntities(e.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), "" !== data) {
                    editor.keys.forceUndo();
                    gridSubStep = editor.snapshot.get();
                    editor.selection.save();
                    editor.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
                    var this_area = editor.markers.insertAtPoint(e);
                    if (editor.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), editor.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), editor.selection.restore(), editor.selection.remove(), editor.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), false !== this_area) {
                        var widget_element = editor.el.querySelector(".fr-marker");
                        return $(widget_element).replaceWith(data.MARKERS), editor.selection.restore(), show(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), false;
                    }
                } else {
                    /** @type {null} */
                    data = null;
                }
            }
        }
        /**
         * @return {undefined}
         */
        function show() {
            if (editor.opts.iframe) {
                editor.$el.attr("contenteditable", "true");
            }
            if (editor.browser.edge && editor.opts.iframe) {
                editor.$box.after(i);
            }
            if (!gridSubStep) {
                editor.keys.forceUndo();
                gridSubStep = editor.snapshot.get();
            }
            if (!data) {
                data = i.get(0).innerHTML;
                l = i.text();
                editor.selection.restore();
                editor.events.enableBlur();
            }
            var text = data.match(/(class="?Mso|class='?Mso|class="?Xl|class='?Xl|class=Xl|style="[^"]*\bmso-|style='[^']*\bmso-|w:WordDocument|LibreOffice)/gi);
            var opts = editor.events.chainTrigger("paste.beforeCleanup", data);
            if (opts && "string" == typeof opts) {
                /** @type {string} */
                data = opts;
            }
            if (!text || text && false !== editor.events.trigger("paste.wordPaste", [data])) {
                init(data, text);
            }
        }
        /**
         * @param {number} limit
         * @return {?}
         */
        function fetch(limit) {
            /** @type {string} */
            var script = "";
            /** @type {number} */
            var i = 0;
            for (; i++ < limit;) {
                /** @type {string} */
                script = script + "&nbsp;";
            }
            return script;
        }
        /**
         * @param {string} value
         * @param {?} children
         * @param {!Array} tag
         * @return {undefined}
         */
        function init(value, children, tag) {
            var i;
            /** @type {null} */
            var result = null;
            /** @type {null} */
            var item = null;
            if (0 <= value.toLowerCase().indexOf("<body")) {
                /** @type {string} */
                var base = "";
                if (0 <= value.indexOf("<style")) {
                    base = value.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1");
                }
                value = (value = (value = base + value.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function (commaParam) {
                    return commaParam.replace(/\n/g, "<br />");
                })).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2");
            }
            /** @type {boolean} */
            var c = false;
            if (0 <= value.indexOf('id="docs-internal-guid')) {
                value = value.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1");
                /** @type {boolean} */
                c = true;
            }
            if (0 <= value.indexOf('content="Sheets"')) {
                value = value.replace(/width:0px;/g, "");
            }
            /** @type {boolean} */
            var use = false;
            if (!children) {
                if ((use = function () {
                    /** @type {null} */
                    var t = null;
                    try {
                        t = editor.win.localStorage.getItem("fr-copied-text");
                    } catch (e) {
                    }
                    return !(!t || !l || l.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") !== t.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") && l.replace(/\s/g, "") !== t.replace(/\s/g, ""));
                }()) && (value = editor.win.localStorage.getItem("fr-copied-html")), use) {
                    value = editor.clean.html(value, editor.opts.pasteDeniedTags, editor.opts.pasteDeniedAttrs);
                } else {
                    var u = editor.opts.htmlAllowedStyleProps;
                    editor.opts.htmlAllowedStyleProps = editor.opts.pasteAllowedStyleProps;
                    /** @type {boolean} */
                    editor.opts.htmlAllowComments = false;
                    value = (value = (value = value.replace(/<span class="Apple-tab-span">\s*<\/span>/g, fetch(editor.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function (canCreateDiscussions, inRevIdx) {
                        return fetch(inRevIdx.length * (editor.opts.tabSpaces || 4));
                    })).replace(/\t/g, fetch(editor.opts.tabSpaces || 4));
                    value = editor.clean.html(value, editor.opts.pasteDeniedTags, editor.opts.pasteDeniedAttrs);
                    editor.opts.htmlAllowedStyleProps = u;
                    /** @type {boolean} */
                    editor.opts.htmlAllowComments = true;
                    value = (value = (value = build(value)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "");
                }
            }
            if (!(!children || editor.wordPaste && tag)) {
                if (0 === (value = value.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>")) {
                    /** @type {string} */
                    value = "<table>".concat(value, "</table>");
                }
                value = build(value = function (str) {
                    var i;
                    str = (str = (str = (str = (str = (str = (str = (str = (str = (str = (str = (str = (str = (str = (str = str.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,
                        "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,
                            "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/\x3c!--\[if !supportLists\]--\x3e([\s\S]*?)\x3c!--\[endif\]--\x3e/gi, "")).replace(/<!\[if !supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/\x3c!--[\s\S]*?--\x3e/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                    var beforeReplace;
                    /** @type {!Array} */
                    var badTags = ["style", "script", "applet", "embed", "noframes", "noscript"];
                    /** @type {number} */
                    i = 0;
                    for (; i < badTags.length; i++) {
                        /** @type {!RegExp} */
                        var s = new RegExp("<".concat(badTags[i], ".*?").concat(badTags[i], "(.*?)>"), "gi");
                        str = str.replace(s, "");
                    }
                    str = (str = (str = str.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
                    for (; (str = (beforeReplace = str).replace(/<[^/>][^>]*><\/[^>]+>/gi, "")) !== beforeReplace;) {
                    }
                    str = (str = str.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>");
                    str = (str = (str = editor.clean.html(str, editor.opts.pasteDeniedTags, editor.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
                    var d = editor.o_doc.createElement("div");
                    /** @type {string} */
                    d.innerHTML = str;
                    var allSections = d.querySelectorAll("li[data-indent]");
                    /** @type {number} */
                    i = 0;
                    for (; i < allSections.length; i++) {
                        var item = allSections[i];
                        var tmp = item.previousElementSibling;
                        if (tmp && "LI" === tmp.tagName) {
                            var a = tmp.querySelector(":scope > ul, :scope > ol");
                            if (!a) {
                                /** @type {!Element} */
                                a = document.createElement("ul");
                                tmp.appendChild(a);
                            }
                            a.appendChild(item);
                        } else {
                            item.removeAttribute("data-indent");
                        }
                    }
                    return editor.html.cleanBlankSpaces(d), d.innerHTML;
                }(value));
            }
            if (editor.opts.pastePlain && !use) {
                value = function (line) {
                    var i;
                    /** @type {null} */
                    var el = null;
                    var l = editor.doc.createElement("div");
                    /** @type {string} */
                    l.innerHTML = line;
                    var elements = l.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                    /** @type {number} */
                    i = 0;
                    for (; i < elements.length; i++) {
                        /** @type {string} */
                        (el = elements[i]).outerHTML = "<".concat(editor.html.defaultTag() || "DIV", ">").concat(el.innerText, "</").concat(editor.html.defaultTag() || "DIV", ">");
                    }
                    /** @type {number} */
                    i = (elements = l.querySelectorAll("*:not(".concat("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not("), ")"))).length - 1;
                    for (; 0 <= i; i--) {
                        (el = elements[i]).outerHTML = el.innerHTML;
                    }
                    return function walk(block) {
                        var elems = editor.node.contents(block);
                        /** @type {number} */
                        var i = 0;
                        for (; i < elems.length; i++) {
                            if (elems[i].nodeType !== Node.TEXT_NODE && elems[i].nodeType !== Node.ELEMENT_NODE) {
                                elems[i].parentNode.removeChild(elems[i]);
                            } else {
                                walk(elems[i]);
                            }
                        }
                    }(l), l.innerHTML;
                }(value);
            }
            var str = editor.events.chainTrigger("paste.afterCleanup", value);
            if ("string" == typeof str && (value = str), "" !== value) {
                var doc = editor.o_doc.createElement("div");
                if (0 <= (doc.innerHTML = value).indexOf("<body>")) {
                    editor.html.cleanBlankSpaces(doc);
                    editor.spaces.normalize(doc, true);
                } else {
                    editor.spaces.normalize(doc);
                }
                var getall = doc.getElementsByTagName("span");
                /** @type {number} */
                i = getall.length - 1;
                for (; 0 <= i; i--) {
                    var elm = getall[i];
                    if (0 === elm.attributes.length) {
                        elm.outerHTML = elm.innerHTML;
                    }
                }
                if (true === editor.opts.linkAlwaysBlank) {
                    var as = doc.getElementsByTagName("a");
                    /** @type {number} */
                    i = as.length - 1;
                    for (; 0 <= i; i--) {
                        var a = as[i];
                        if (!a.getAttribute("target")) {
                            a.setAttribute("target", "_blank");
                        }
                    }
                }
                var el = editor.selection.element();
                /** @type {boolean} */
                var t = false;
                if (el && $(el).parentsUntil(editor.el, "ul, ol").length && (t = true), t) {
                    var styles = doc.children;
                    if (1 === styles.length && 0 <= ["OL", "UL"].indexOf(styles[0].tagName)) {
                        styles[0].outerHTML = styles[0].innerHTML;
                    }
                }
                if (!c) {
                    var b = doc.getElementsByTagName("br");
                    /** @type {number} */
                    i = b.length - 1;
                    for (; 0 <= i; i--) {
                        var br = b[i];
                        if (editor.node.isBlock(br.previousSibling)) {
                            br.parentNode.removeChild(br);
                        }
                    }
                }
                if (editor.opts.enter === data.ENTER_BR) {
                    /** @type {number} */
                    i = (result = doc.querySelectorAll("p, div")).length - 1;
                    for (; 0 <= i; i--) {
                        if (0 === (item = result[i]).attributes.length) {
                            /** @type {string} */
                            item.outerHTML = item.innerHTML + (item.nextSibling && !editor.node.isEmpty(item) ? "<br>" : "");
                        }
                    }
                } else {
                    if (editor.opts.enter === data.ENTER_DIV) {
                        /** @type {number} */
                        i = (result = doc.getElementsByTagName("p")).length - 1;
                        for (; 0 <= i; i--) {
                            if (0 === (item = result[i]).attributes.length) {
                                /** @type {string} */
                                item.outerHTML = "<div>".concat(item.innerHTML, "</div>");
                            }
                        }
                    } else {
                        if (editor.opts.enter === data.ENTER_P && 1 === doc.childNodes.length && "P" === doc.childNodes[0].tagName && 0 === doc.childNodes[0].attributes.length) {
                            doc.childNodes[0].outerHTML = doc.childNodes[0].innerHTML;
                        }
                    }
                }
                value = doc.innerHTML;
                if (use) {
                    value = function (q) {
                        var i;
                        var parent = editor.o_doc.createElement("div");
                        /** @type {string} */
                        parent.innerHTML = q;
                        var eiFrame = parent.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(data.VOID_ELEMENTS.join("):not("), "):not(").concat(editor.opts.htmlAllowedEmptyTags.join("):not("), ")"));
                        for (; eiFrame.length;) {
                            /** @type {number} */
                            i = 0;
                            for (; i < eiFrame.length; i++) {
                                eiFrame[i].parentNode.removeChild(eiFrame[i]);
                            }
                            eiFrame = parent.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(data.VOID_ELEMENTS.join("):not("), "):not(").concat(editor.opts.htmlAllowedEmptyTags.join("):not("), ")"));
                        }
                        return parent.innerHTML;
                    }(value);
                }
                editor.html.insert(value, true);
            }
            editor.events.trigger("paste.after");
            editor.undo.saveStep(gridSubStep);
            /** @type {null} */
            gridSubStep = null;
            editor.undo.saveStep();
        }
        /**
         * @param {!Array} value
         * @return {?}
         */
        function stringify(value) {
            /** @type {number} */
            var i = value.length - 1;
            for (; 0 <= i; i--) {
                if (value[i].attributes && value[i].attributes.length) {
                    value.splice(i, 1);
                }
            }
            return value;
        }
        /**
         * @param {string} text
         * @return {?}
         */
        function build(text) {
            var i;
            var desc = editor.o_doc.createElement("div");
            /** @type {string} */
            desc.innerHTML = text;
            var result = stringify(Array.prototype.slice.call(desc.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")));
            for (; result.length;) {
                var el = result[result.length - 1];
                if (editor.html.defaultTag() && "div" !== editor.html.defaultTag()) {
                    if (el.querySelector(editor.html.blockTagsQuery())) {
                        el.outerHTML = el.innerHTML;
                    } else {
                        /** @type {string} */
                        el.outerHTML = "<".concat(editor.html.defaultTag(), ">").concat(el.innerHTML, "</").concat(editor.html.defaultTag(), ">");
                    }
                } else {
                    var headings = el.querySelectorAll("*");
                    if (!headings.length || "BR" !== headings[headings.length - 1].tagName && 0 === el.innerText.length || !headings.length || "BR" !== headings[headings.length - 1].tagName || headings[headings.length - 1].nextSibling) {
                        /** @type {string} */
                        el.outerHTML = el.innerHTML + (el.nextSibling ? "<br>" : "");
                    } else {
                        el.outerHTML = el.innerHTML;
                    }
                }
                result = stringify(Array.prototype.slice.call(desc.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")));
            }
            result = stringify(Array.prototype.slice.call(desc.querySelectorAll("div:not([style])")));
            for (; result.length;) {
                /** @type {number} */
                i = 0;
                for (; i < result.length; i++) {
                    var e = result[i];
                    var s = e.innerHTML.replace(/\u0009/gi, "").trim();
                    e.outerHTML = s;
                }
                result = stringify(Array.prototype.slice.call(desc.querySelectorAll("div:not([style])")));
            }
            return desc.innerHTML;
        }
        /**
         * @return {undefined}
         */
        function paste() {
            editor.el.removeEventListener("copy", render);
            editor.el.removeEventListener("cut", render);
            editor.el.removeEventListener("paste", update);
        }
        var data;
        var id;
        var l;
        var i;
        var gridSubStep;
        var $ = editor.$;
        /** @type {boolean} */
        var d = false;
        return {
            _init: function () {
                editor.el.addEventListener("copy", render);
                editor.el.addEventListener("cut", render);
                editor.el.addEventListener("paste", update, {
                    capture: true
                });
                editor.events.on("drop", callback);
                if (editor.browser.msie && editor.browser.version < 11) {
                    editor.events.on("mouseup", function (event) {
                        if (2 === event.button) {
                            setTimeout(function () {
                                /** @type {boolean} */
                                d = false;
                            }, 50);
                            /** @type {boolean} */
                            d = true;
                        }
                    }, true);
                    editor.events.on("beforepaste", update);
                }
                editor.events.on("destroy", paste);
            },
            cleanEmptyTagsAndDivs: build,
            getRtfClipboard: function () {
                return id;
            },
            saveCopiedText: filter,
            clean: init
        };
    };
    Object.assign(data.DEFAULTS, {
        shortcutsEnabled: [],
        shortcutsHint: true
    });
    data.SHORTCUTS_MAP = {};
    /**
     * SHORTCUTS
     * 
     * @param {number} url
     * @param {string} command
     * @param {string} c
     * @param {string} x
     * @param {string} isCmd
     * @param {!Object} isCtrl
     * @return {undefined}
     */
    data.RegisterShortcut = function (url, command, c, x, isCmd, isCtrl) {
        data.SHORTCUTS_MAP[(isCmd ? "^" : "") + (isCtrl ? "@" : "") + url] = {
            cmd: command,
            val: c,
            letter: x,
            shift: isCmd,
            option: isCtrl
        };
        data.DEFAULTS.shortcutsEnabled.push(command);
    };
    data.RegisterShortcut(data.KEYCODE.E, "show", null, "E", false, false);
    data.RegisterShortcut(data.KEYCODE.B, "bold", null, "B", false, false);
    data.RegisterShortcut(data.KEYCODE.I, "italic", null, "I", false, false);
    data.RegisterShortcut(data.KEYCODE.U, "underline", null, "U", false, false);
    data.RegisterShortcut(data.KEYCODE.S, "strikeThrough", null, "S", false, false);
    data.RegisterShortcut(data.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", false, false);
    data.RegisterShortcut(data.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", false, false);
    data.RegisterShortcut(data.KEYCODE.Z, "undo", null, "Z", false, false);
    data.RegisterShortcut(data.KEYCODE.Z, "redo", null, "Z", true, false);
    data.RegisterShortcut(data.KEYCODE.Y, "redo", null, "Y", false, false);
    /**
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.shortcuts = function (editor) {
        /**
         * @param {!Event} e
         * @return {?}
         */
        function render(e) {
            if (!editor.core.hasFocus()) {
                return true;
            }
            var c = e.which;
            var rebuilds = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
            if ("keyup" === e.type && optDelim && c !== data.KEYCODE.META) {
                return optDelim = false;
            }
            if ("keydown" === e.type) {
                /** @type {boolean} */
                optDelim = false;
            }
            /** @type {string} */
            var i = (e.shiftKey ? "^" : "") + (e.altKey ? "@" : "") + c;
            var node = editor.node.blockParent(editor.selection.blocks()[0]);
            if (node && "TR" == node.tagName && null == node.getAttribute("contenteditable") && (node = node.closest("table")), rebuilds && data.SHORTCUTS_MAP[i] && (!node || "false" !== node.getAttribute("contenteditable"))) {
                var name = data.SHORTCUTS_MAP[i].cmd;
                if (name && 0 <= editor.opts.shortcutsEnabled.indexOf(name)) {
                    var state = data.SHORTCUTS_MAP[i].val;
                    if (false === editor.events.trigger("shortcut", [e, name, state])) {
                        return !(optDelim = true);
                    }
                    if (name && (editor.commands[name] || data.COMMANDS[name] && data.COMMANDS[name].callback)) {
                        return e.preventDefault(), e.stopPropagation(), "keydown" === e.type && ((editor.commands[name] || data.COMMANDS[name].callback)(), optDelim = true), false;
                    }
                }
            }
        }
        /** @type {null} */
        var ret = null;
        /** @type {boolean} */
        var optDelim = false;
        return {
            _init: function () {
                editor.events.on("keydown", render, true);
                editor.events.on("keyup", render, true);
            },
            get: function (type) {
                if (!editor.opts.shortcutsHint) {
                    return null;
                }
                if (!ret) {
                    var i;
                    for (i in ret = {}, data.SHORTCUTS_MAP) {
                        if (Object.prototype.hasOwnProperty.call(data.SHORTCUTS_MAP, i) && 0 <= editor.opts.shortcutsEnabled.indexOf(data.SHORTCUTS_MAP[i].cmd)) {
                            ret["".concat(data.SHORTCUTS_MAP[i].cmd, ".").concat(data.SHORTCUTS_MAP[i].val || "")] = {
                                shift: data.SHORTCUTS_MAP[i].shift,
                                option: data.SHORTCUTS_MAP[i].option,
                                letter: data.SHORTCUTS_MAP[i].letter
                            };
                        }
                    }
                }
                var a = ret[type];
                return a ? (editor.helpers.isMac() ? String.fromCharCode(8984) : "".concat(editor.language.translate("Ctrl"), "+")) + (a.shift ? editor.helpers.isMac() ? String.fromCharCode(8679) : "".concat(editor.language.translate("Shift"), "+") : "") + (a.option ? editor.helpers.isMac() ? String.fromCharCode(8997) : "".concat(editor.language.translate("Alt"), "+") : "") + a.letter : null;
            }
        };
    };
    /**
     * SNAPSHOT MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.snapshot = function (editor) {
        /**
         * @param {!Object} elem
         * @return {?}
         */
        function add(elem) {
            var siblings = elem.parentNode.childNodes;
            /** @type {number} */
            var xhrID = 0;
            /** @type {null} */
            var node = null;
            /** @type {number} */
            var i = 0;
            for (; i < siblings.length; i++) {
                if (node) {
                    /** @type {boolean} */
                    var canViewMyFiles = siblings[i].nodeType === Node.TEXT_NODE && "" === siblings[i].textContent;
                    /** @type {boolean} */
                    var canViewSiteFiles = node.nodeType === Node.TEXT_NODE && siblings[i].nodeType === Node.TEXT_NODE;
                    /** @type {boolean} */
                    var canUploadFiles = node.nodeType === Node.TEXT_NODE && "" === node.textContent;
                    if (!(canViewMyFiles || canViewSiteFiles || canUploadFiles)) {
                        xhrID++;
                    }
                }
                if (siblings[i] === elem) {
                    return xhrID;
                }
                node = siblings[i];
            }
        }
        /**
         * @param {!Object} child
         * @return {?}
         */
        function wrap(child) {
            /** @type {!Array} */
            var result = [];
            if (!child.parentNode) {
                return [];
            }
            for (; !editor.node.isElement(child);) {
                result.push(add(child));
                child = child.parentNode;
            }
            return result.reverse();
        }
        /**
         * @param {!Object} n
         * @param {string} index
         * @return {?}
         */
        function check(n, index) {
            for (; n && n.nodeType === Node.TEXT_NODE;) {
                var el = n.previousSibling;
                if (el && el.nodeType === Node.TEXT_NODE) {
                    index = index + el.textContent.length;
                }
                n = el;
            }
            return index;
        }
        /**
         * @param {!NodeList} offsets
         * @return {?}
         */
        function createElement(offsets) {
            var node = editor.el;
            /** @type {number} */
            var i = 0;
            for (; i < offsets.length; i++) {
                node = node.childNodes[offsets[i]];
            }
            return node;
        }
        /**
         * @param {!Selection} selection
         * @param {?} results
         * @return {undefined}
         */
        function select(selection, results) {
            try {
                var rp = createElement(results.scLoc);
                var count = results.scOffset;
                var elem = createElement(results.ecLoc);
                var end = results.ecOffset;
                var range = editor.doc.createRange();
                range.setStart(rp, count);
                range.setEnd(elem, end);
                selection.addRange(range);
            } catch (e) {
            }
        }
        return {
            get: function () {
                var options;
                var data = {};
                if (editor.events.trigger("snapshot.before"), data.html = (editor.$wp ? editor.$el.html() : editor.$oel.get(0).outerHTML).replace(/ style=""/g, ""), data.ranges = [], editor.$wp && editor.selection.inEditor() && editor.core.hasFocus()) {
                    var reqs = editor.selection.ranges();
                    /** @type {number} */
                    var i = 0;
                    for (; i < reqs.length; i++) {
                        data.ranges.push({
                            scLoc: wrap((options = reqs[i]).startContainer),
                            scOffset: check(options.startContainer, options.startOffset),
                            ecLoc: wrap(options.endContainer),
                            ecOffset: check(options.endContainer, options.endOffset)
                        });
                    }
                }
                return editor.events.trigger("snapshot.after", [data]), data;
            },
            restore: function (json) {
                if (editor.$el.html() !== json.html) {
                    if (editor.opts.htmlExecuteScripts) {
                        editor.$el.html(json.html);
                    } else {
                        editor.el.innerHTML = json.html;
                    }
                }
                var selection = editor.selection.get();
                editor.selection.clear();
                editor.events.focus(true);
                /** @type {number} */
                var i = 0;
                for (; i < json.ranges.length; i++) {
                    select(selection, json.ranges[i]);
                }
            },
            equal: function (node, data) {
                return node.html === data.html && (!editor.core.hasFocus() || JSON.stringify(node.ranges) === JSON.stringify(data.ranges));
            }
        };
    };
    /**
     * UNDO MODULE
     * 
     * @param {!Object} self
     * @return {?}
     */
    data.MODULES.undo = function (self) {
        /**
         * @param {!Object} e
         * @return {undefined}
         */
        function listener(e) {
            var key = e.which;
            if (self.keys.ctrlKey(e)) {
                if (key === data.KEYCODE.Z && e.shiftKey) {
                    e.preventDefault();
                }
                if (key === data.KEYCODE.Z) {
                    e.preventDefault();
                }
            }
        }
        /**
         * @return {undefined}
         */
        function undo() {
            if (self.undo_stack && !self.undoing) {
                for (; self.undo_stack.length > self.undo_index;) {
                    self.undo_stack.pop();
                }
            }
        }
        /**
         * @return {undefined}
         */
        function done() {
            /** @type {number} */
            self.undo_index = 0;
            /** @type {!Array} */
            self.undo_stack = [];
        }
        /**
         * @return {undefined}
         */
        function callback() {
            /** @type {!Array} */
            self.undo_stack = [];
        }
        /** @type {null} */
        var text = null;
        return {
            _init: function () {
                done();
                self.events.on("initialized", function () {
                    text = (self.$wp ? self.$el.html() : self.$oel.get(0).outerHTML).replace(/ style=""/g, "");
                });
                self.events.on("blur", function () {
                    if (!self.el.querySelector(".fr-dragging")) {
                        self.undo.saveStep();
                    }
                });
                self.events.on("keydown", listener);
                self.events.on("destroy", callback);
            },
            run: function () {
                if (1 < self.undo_index) {
                    /** @type {boolean} */
                    self.undoing = true;
                    var json = self.undo_stack[--self.undo_index - 1];
                    clearTimeout(self._content_changed_timer);
                    self.snapshot.restore(json);
                    text = json.html;
                    self.popups.hideAll();
                    self.toolbar.enable();
                    self.events.trigger("contentChanged");
                    self.events.trigger("commands.undo");
                    /** @type {boolean} */
                    self.undoing = false;
                }
            },
            redo: function () {
                if (self.undo_index < self.undo_stack.length) {
                    /** @type {boolean} */
                    self.undoing = true;
                    var json = self.undo_stack[self.undo_index++];
                    clearTimeout(self._content_changed_timer);
                    self.snapshot.restore(json);
                    text = json.html;
                    self.popups.hideAll();
                    self.toolbar.enable();
                    self.events.trigger("contentChanged");
                    self.events.trigger("commands.redo");
                    /** @type {boolean} */
                    self.undoing = false;
                }
            },
            canDo: function () {
                return !(0 === self.undo_stack.length || self.undo_index <= 1);
            },
            canRedo: function () {
                return self.undo_index !== self.undo_stack.length;
            },
            dropRedo: undo,
            reset: done,
            saveStep: function (step) {
                if (!(!self.undo_stack || self.undoing || self.el.querySelector(".fr-marker"))) {
                    if (void 0 === step) {
                        step = self.snapshot.get();
                        if (!(self.undo_stack[self.undo_index - 1] && self.snapshot.equal(self.undo_stack[self.undo_index - 1], step))) {
                            undo();
                            self.undo_stack.push(step);
                            self.undo_index++;
                            if (step.html !== text) {
                                self.events.trigger("contentChanged");
                                text = step.html;
                            }
                        }
                    } else {
                        undo();
                        if (0 < self.undo_index) {
                            /** @type {!Array} */
                            self.undo_stack[self.undo_index - 1] = step;
                        } else {
                            self.undo_stack.push(step);
                            self.undo_index++;
                        }
                    }
                }
            }
        };
    };
    Object.assign(data.DEFAULTS, {
        height: null,
        heightMax: null,
        heightMin: null,
        width: null
    });
    /**
     * SIZE MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.size = function (editor) {
        /**
         * @return {undefined}
         */
        function resize() {
            init();
            if (editor.opts.height) {
                editor.$el.css("minHeight", editor.opts.height - editor.helpers.getPX(editor.$el.css("padding-top")) - editor.helpers.getPX(editor.$el.css("padding-bottom")));
            }
            editor.$iframe.height(editor.$el.outerHeight(true));
        }
        /**
         * @return {undefined}
         */
        function init() {
            if (editor.opts.heightMin) {
                editor.$el.css("minHeight", editor.opts.heightMin);
            } else {
                editor.$el.css("minHeight", "");
            }
            if (editor.opts.heightMax) {
                editor.$wp.css("maxHeight", editor.opts.heightMax);
                editor.$wp.css("overflow", "auto");
            } else {
                editor.$wp.css("maxHeight", "");
                editor.$wp.css("overflow", "");
            }
            if (editor.opts.height) {
                editor.$wp.css("height", editor.opts.height);
                editor.$wp.css("overflow", "auto");
                editor.$el.css("minHeight", editor.opts.height - editor.helpers.getPX(editor.$el.css("padding-top")) - editor.helpers.getPX(editor.$el.css("padding-bottom")));
            } else {
                editor.$wp.css("height", "");
                if (!editor.opts.heightMin) {
                    editor.$el.css("minHeight", "");
                }
                if (!editor.opts.heightMax) {
                    editor.$wp.css("overflow", "");
                }
            }
            if (editor.opts.width) {
                editor.$box.width(editor.opts.width);
            }
        }
        return {
            _init: function () {
                if (!editor.$wp) {
                    return false;
                }
                init();
                if (editor.$iframe) {
                    editor.events.on("keyup keydown", function () {
                        setTimeout(resize, 0);
                    }, true);
                    editor.events.on("commands.after html.set init initialized paste.after", resize);
                }
            },
            syncIframe: resize,
            refresh: init
        };
    };
    Object.assign(data.DEFAULTS, {
        documentReady: false,
        editorClass: null,
        typingTimer: 500,
        iframe: false,
        requestWithCORS: true,
        requestWithCredentials: false,
        requestHeaders: {},
        useClasses: true,
        spellcheck: true,
        iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:20px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}',
        iframeStyle: "",
        iframeStyleFiles: [],
        direction: "auto",
        zIndex: 1,
        tabIndex: null,
        disableRightClick: false,
        scrollableContainer: "body",
        keepFormatOnDelete: false,
        theme: null
    });
    /**
     * CORE MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.core = function (editor) {
        var $ = editor.$;
        return {
            _init: function () {
                if (data.INSTANCES.push(editor), editor.drag_support = {
                    filereader: "undefined" != typeof FileReader,
                    formdata: Boolean(editor.win.FormData),
                    progress: "upload" in new XMLHttpRequest
                }, editor.$wp) {
                    (function () {
                        if (editor.$box.addClass("fr-box".concat(editor.opts.editorClass ? " ".concat(editor.opts.editorClass) : "")), editor.$box.attr("role", "application"), editor.$wp.addClass("fr-wrapper"), editor.opts.documentReady && editor.$box.addClass("fr-document"), editor.opts.iframe || editor.$el.addClass("fr-element fr-view"), editor.opts.iframe) {
                            editor.$iframe.addClass("fr-iframe");
                            editor.$el.addClass("fr-view");
                            /** @type {number} */
                            var i = 0;
                            for (; i < editor.o_doc.styleSheets.length; i++) {
                                var rules = void 0;
                                try {
                                    rules = editor.o_doc.styleSheets[i].cssRules;
                                } catch (e) {
                                }
                                if (rules) {
                                    /** @type {number} */
                                    var i = 0;
                                    var rulesCount = rules.length;
                                    for (; i < rulesCount; i++) {
                                        if (!(!rules[i].selectorText || 0 !== rules[i].selectorText.indexOf(".fr-view") && 0 !== rules[i].selectorText.indexOf(".fr-element"))) {
                                            if (0 < rules[i].style.cssText.length) {
                                                if (0 === rules[i].selectorText.indexOf(".fr-view")) {
                                                    editor.opts.iframeStyle += "".concat(rules[i].selectorText.replace(/\.fr-view/g, "body"), "{").concat(rules[i].style.cssText, "}");
                                                } else {
                                                    editor.opts.iframeStyle += "".concat(rules[i].selectorText.replace(/\.fr-element/g, "body"), "{").concat(rules[i].style.cssText, "}");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if ("auto" !== editor.opts.direction) {
                            editor.$box.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(editor.opts.direction));
                        }
                        editor.$el.attr("dir", editor.opts.direction);
                        editor.$wp.attr("dir", editor.opts.direction);
                        if (1 < editor.opts.zIndex) {
                            editor.$box.css("z-index", editor.opts.zIndex);
                        }
                        if (editor.opts.theme) {
                            editor.$box.addClass("".concat(editor.opts.theme, "-theme"));
                        }
                        editor.opts.tabIndex = editor.opts.tabIndex || editor.$oel.attr("tabIndex");
                        if (editor.opts.tabIndex) {
                            editor.$el.attr("tabIndex", editor.opts.tabIndex);
                        }
                    })();
                    editor.html.set(editor._original_html);
                    editor.$el.attr("spellcheck", editor.opts.spellcheck);
                    if (editor.helpers.isMobile()) {
                        editor.$el.attr("autocomplete", editor.opts.spellcheck ? "on" : "off");
                        editor.$el.attr("autocorrect", editor.opts.spellcheck ? "on" : "off");
                        editor.$el.attr("autocapitalize", editor.opts.spellcheck ? "on" : "off");
                    }
                    if (editor.opts.disableRightClick) {
                        editor.events.$on(editor.$el, "contextmenu", function (event) {
                            if (2 === event.button) {
                                return event.preventDefault(), event.stopPropagation(), false;
                            }
                        });
                    }
                    try {
                        editor.doc.execCommand("styleWithCSS", false, false);
                    } catch (e) {
                    }
                }
                if ("TEXTAREA" === editor.$oel.get(0).tagName) {
                    editor.events.on("contentChanged", function () {
                        editor.$oel.val(editor.html.get());
                    });
                    editor.events.on("form.submit", function () {
                        editor.$oel.val(editor.html.get());
                    });
                    editor.events.on("form.reset", function () {
                        editor.html.set(editor._original_html);
                    });
                    editor.$oel.val(editor.html.get());
                }
                if (editor.helpers.isIOS()) {
                    editor.events.$on(editor.$doc, "selectionchange", function () {
                        if (!editor.$doc.get(0).hasFocus()) {
                            editor.$win.get(0).focus();
                        }
                    });
                }
                editor.events.trigger("init");
                if (editor.opts.autofocus && !editor.opts.initOnClick && editor.$wp) {
                    editor.events.on("initialized", function () {
                        editor.events.focus(true);
                    });
                }
            },
            destroy: function (state) {
                if ("TEXTAREA" === editor.$oel.get(0).tagName) {
                    editor.$oel.val(state);
                }
                if (editor.$box) {
                    editor.$box.removeAttr("role");
                }
                if (editor.$wp) {
                    if ("TEXTAREA" === editor.$oel.get(0).tagName) {
                        editor.$el.html("");
                        editor.$wp.html("");
                        editor.$box.replaceWith(editor.$oel);
                        editor.$oel.show();
                    } else {
                        editor.$wp.replaceWith(state);
                        editor.$el.html("");
                        editor.$box.removeClass("fr-view fr-ltr fr-box ".concat(editor.opts.editorClass || ""));
                        if (editor.opts.theme) {
                            editor.$box.addClass("".concat(editor.opts.theme, "-theme"));
                        }
                    }
                }
                /** @type {null} */
                this.$wp = null;
                /** @type {null} */
                this.$el = null;
                /** @type {null} */
                this.el = null;
                /** @type {null} */
                this.$box = null;
            },
            isEmpty: function () {
                return editor.node.isEmpty(editor.el);
            },
            getXHR: function (url, method) {
                /** @type {!XMLHttpRequest} */
                var xhr = new XMLHttpRequest;
                var i;
                for (i in xhr.open(method, url, true), editor.opts.requestWithCredentials && (xhr.withCredentials = true), editor.opts.requestHeaders) {
                    if (Object.prototype.hasOwnProperty.call(editor.opts.requestHeaders, i)) {
                        xhr.setRequestHeader(i, editor.opts.requestHeaders[i]);
                    }
                }
                return xhr;
            },
            injectStyle: function (text) {
                if (editor.opts.iframe) {
                    editor.$head.find("style[data-fr-style], link[data-fr-style]").remove();
                    editor.$head.append('<style data-fr-style="true">'.concat(text, "</style>"));
                    /** @type {number} */
                    var i = 0;
                    for (; i < editor.opts.iframeStyleFiles.length; i++) {
                        var newNode = $('<link data-fr-style="true" rel="stylesheet" href="'.concat(editor.opts.iframeStyleFiles[i], '">'));
                        newNode.get(0).addEventListener("load", editor.size.syncIframe);
                        editor.$head.append(newNode);
                    }
                }
            },
            hasFocus: function () {
                return editor.browser.mozilla && editor.helpers.isMobile() ? editor.selection.inEditor() : editor.node.hasFocus(editor.el) || 0 < editor.$el.find("*:focus").length;
            },
            sameInstance: function (obj) {
                if (!obj) {
                    return false;
                }
                var ed = obj.data("instance");
                return !!ed && ed.id === editor.id;
            }
        };
    };
    data.POPUP_TEMPLATES = {
        "text.edit": "[_EDIT_]"
    };
    /**
     * @param {?} javascriptName
     * @param {?} jsonName
     * @return {undefined}
     */
    data.RegisterTemplate = function (javascriptName, jsonName) {
        data.POPUP_TEMPLATES[javascriptName] = jsonName;
    };
    /**
     * POPUP MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.popups = function (editor) {
        /**
         * @param {!Object} id
         * @param {!Object} t
         * @return {undefined}
         */
        function disable(id, t) {
            if (!t.isVisible()) {
                t = editor.$sc;
            }
            if (!t.is(elements[id].data("container"))) {
                elements[id].data("container", t);
                t.append(elements[id]);
            }
        }
        /**
         * @param {!Object} root
         * @return {undefined}
         */
        function render(root) {
            var i;
            root.find(".fr-upload-progress").addClass("fr-height-set");
            root.find(".fr-upload-progress").removeClass("fr-height-auto");
            editor.popups.get("filesManager.insert").removeClass("fr-height-auto");
            if (root.find(".fr-files-upload-layer").hasClass("fr-active")) {
                /** @type {number} */
                i = 1;
            }
            if (root.find(".fr-files-by-url-layer").hasClass("fr-active")) {
                /** @type {number} */
                i = 2;
            }
            if (root.find(".fr-files-embed-layer").hasClass("fr-active")) {
                /** @type {number} */
                i = 3;
            }
            if (root.find(".fr-upload-progress-layer").get(0).clientHeight + 10 < root.find(".fr-upload-progress").get(0).clientHeight) {
                root.find(".fr-upload-progress").addClass("fr-height-auto");
            }
            if (400 < root[0].clientHeight) {
                /** @type {string} */
                root[0].childNodes[4].style.height = "".concat(root[0].clientHeight - (root[0].childNodes[0].clientHeight + root[0].childNodes[i].clientHeight) - 80, "px");
            }
        }
        /**
         * @return {undefined}
         */
        function _hide() {
            $(this).toggleClass("fr-not-empty", true);
        }
        /**
         * @return {undefined}
         */
        function filter() {
            var e = $(this);
            e.toggleClass("fr-not-empty", "" !== e.val());
        }
        /**
         * @param {!Object} x
         * @return {?}
         */
        function f(x) {
            return elements[x] && editor.node.hasClass(elements[x], "fr-active") && editor.core.sameInstance(elements[x]) || false;
        }
        /**
         * @param {!Array} object
         * @return {?}
         */
        function test(object) {
            var i;
            for (i in elements) {
                if (Object.prototype.hasOwnProperty.call(elements, i) && f(i) && (void 0 === object || elements[i].data("instance") === object)) {
                    return elements[i];
                }
            }
            return false;
        }
        /**
         * @param {!Object} name
         * @return {?}
         */
        function update(name) {
            /** @type {null} */
            var key = null;
            if (key = "string" != typeof name ? name : elements[name], "filesManager.insert" === name && void 0 !== editor.filesManager && editor.filesManager.isChildWindowOpen()) {
                return false;
            }
            if (key && editor.node.hasClass(key, "fr-active") && (key.removeClass("fr-active fr-above"), editor.events.trigger("popups.hide.".concat(name)), editor.$tb && (1 < editor.opts.zIndex ? editor.$tb.css("zIndex", editor.opts.zIndex + 1) : editor.$tb.css("zIndex", "")), editor.events.disableBlur(), key.find("input, textarea, button").each(function () {
                if (this === this.ownerDocument.activeElement) {
                    this.blur();
                }
            }), key.find("input, textarea").attr("disabled", "disabled"), relatedWebsiteList)) {
                /** @type {number} */
                var i = 0;
                for (; i < relatedWebsiteList.length; i++) {
                    $(relatedWebsiteList[i]).removeClass("fr-btn-active-popup");
                }
            }
        }
        /**
         * @param {!Array} match
         * @return {undefined}
         */
        function fn(match) {
            var cur;
            for (cur in void 0 === match && (match = []), elements) {
                if (Object.prototype.hasOwnProperty.call(elements, cur) && match.indexOf(cur) < 0) {
                    update(cur);
                }
            }
        }
        /**
         * @return {undefined}
         */
        function create() {
            /** @type {boolean} */
            editor.shared.exit_flag = true;
        }
        /**
         * @return {undefined}
         */
        function method() {
            /** @type {boolean} */
            editor.shared.exit_flag = false;
        }
        /**
         * @return {?}
         */
        function _open() {
            return editor.shared.exit_flag;
        }
        /**
         * @param {!Object} e
         * @return {?}
         */
        function resolve(e) {
            var element = elements[e];
            return {
                _windowResize: function () {
                    var inst = element.data("instance") || editor;
                    if (!inst.helpers.isMobile() && element.isVisible()) {
                        inst.events.disableBlur();
                        inst.popups.hide(e);
                        inst.events.enableBlur();
                    }
                },
                _inputFocus: function (e) {
                    var inst = element.data("instance") || editor;
                    var socialButton = $(e.currentTarget);
                    if (socialButton.is("input:file") && socialButton.closest(".fr-layer").addClass("fr-input-focus"), e.preventDefault(), e.stopPropagation(), setTimeout(function () {
                        inst.events.enableBlur();
                    }, 100), inst.helpers.isMobile()) {
                        var scrollPos = $(inst.o_win).scrollTop();
                        setTimeout(function () {
                            $(inst.o_win).scrollTop(scrollPos);
                        }, 0);
                    }
                },
                _inputBlur: function (e) {
                    var inst = element.data("instance") || editor;
                    var socialButton = $(e.currentTarget);
                    if (socialButton.is("input:file")) {
                        socialButton.closest(".fr-layer").removeClass("fr-input-focus");
                    }
                    if (document.activeElement !== this && $(this).isVisible()) {
                        if (inst.events.blurActive()) {
                            inst.events.trigger("blur");
                        }
                        inst.events.enableBlur();
                    }
                },
                _editorKeydown: function (e) {
                    var options = element.data("instance") || editor;
                    if (!(options.keys.ctrlKey(e) || e.which === data.KEYCODE.ALT || e.which === data.KEYCODE.ESC)) {
                        if (f(e) && element.findVisible(".fr-back").length) {
                            options.button.exec(element.findVisible(".fr-back").first());
                        } else {
                            if (e.which !== data.KEYCODE.ALT) {
                                options.popups.hide(e);
                            }
                        }
                    }
                },
                _preventFocus: function (e) {
                    var inst = element.data("instance") || editor;
                    var active = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    if (!("mouseup" === e.type || $(active).is(":focus"))) {
                        inst.events.disableBlur();
                    }
                    if (!("mouseup" !== e.type || $(active).hasClass("fr-command") || 0 < $(active).parents(".fr-command").length || $(active).hasClass("fr-dropdown-content"))) {
                        editor.button.hideActiveDropdowns(element);
                    }
                    if ((editor.browser.safari || editor.browser.mozilla) && "mousedown" === e.type && $(active).is("input[type=file]")) {
                        inst.events.disableBlur();
                    }
                    /** @type {string} */
                    var a = "input, textarea, button, select, label, .fr-command";
                    if (active && !$(active).is(a) && 0 === $(active).parents(a).length) {
                        return e.stopPropagation(), false;
                    }
                    if (active && $(active).is(a)) {
                        e.stopPropagation();
                    }
                    method();
                },
                _editorMouseup: function () {
                    if (element.isVisible() && _open() && 0 < element.findVisible("input:focus, textarea:focus, button:focus, select:focus").length) {
                        editor.events.disableBlur();
                    }
                },
                _windowMouseup: function (event) {
                    if (!editor.core.sameInstance(element)) {
                        return true;
                    }
                    var map = element.data("instance") || editor;
                    if (element.isVisible() && _open()) {
                        event.stopPropagation();
                        map.markers.remove();
                        map.popups.hide(e);
                        method();
                    }
                },
                _windowKeydown: function (event) {
                    if (!editor.core.sameInstance(element)) {
                        return true;
                    }
                    var item = element.data("instance") || editor;
                    var key = event.which;
                    if (data.KEYCODE.ESC === key) {
                        if (item.popups.isVisible(e) && item.opts.toolbarInline) {
                            return event.stopPropagation(), item.popups.isVisible(e) && (element.findVisible(".fr-back").length ? (item.button.exec(element.findVisible(".fr-back").first()), item.accessibility.focusPopupButton(element)) : element.findVisible(".fr-dismiss").length ? item.button.exec(element.findVisible(".fr-dismiss").first()) : (item.popups.hide(e), item.toolbar.showInline(null, true), item.accessibility.focusPopupButton(element))), false;
                        }
                        if (item.popups.isVisible(e)) {
                            return element.findVisible(".fr-back").length ? (item.button.exec(element.findVisible(".fr-back").first), item.accessibility.focusPopupButton(element)) : element.findVisible(".fr-dismiss").length ? item.button.exec(element.findVisible(".fr-dismiss").first()) : (item.popups.hide(e), item.accessibility.focusPopupButton(element)), false;
                        }
                    }
                },
                _repositionPopup: function () {
                    if (!editor.opts.height && !editor.opts.heightMax || editor.opts.toolbarInline) {
                        return true;
                    }
                    if (editor.$wp && f(e) && element.parent().get(0) === editor.$sc.get(0)) {
                        /** @type {number} */
                        var small_diff = element.offset().top - editor.$wp.offset().top;
                        var j_diff = editor.$wp.outerHeight();
                        if (editor.node.hasClass(element.get(0), "fr-above")) {
                            small_diff = small_diff + element.outerHeight();
                        }
                        if (j_diff < small_diff || small_diff < 0) {
                            element.addClass("fr-hidden");
                        } else {
                            element.removeClass("fr-hidden");
                        }
                    }
                }
            };
        }
        /**
         * @param {?} level
         * @param {number} key
         * @return {undefined}
         */
        function init(level, key) {
            editor.events.on("mouseup", level._editorMouseup, true);
            if (editor.$wp) {
                editor.events.on("keydown", level._editorKeydown);
            }
            editor.events.on("focus", function () {
                elements[key].removeClass("focused");
            });
            editor.events.on("blur", function () {
                if (test()) {
                    editor.markers.remove();
                }
                if (editor.helpers.isMobile()) {
                    if (elements[key].hasClass("focused")) {
                        fn();
                        elements[key].removeClass("focused");
                    } else {
                        elements[key].addClass("focused");
                    }
                } else {
                    if (!elements[key].find("iframe").length) {
                        fn();
                    }
                }
            });
            if (editor.$wp && !editor.helpers.isMobile()) {
                editor.events.$on(editor.$wp, "scroll.popup".concat(key), level._repositionPopup);
            }
            editor.events.on("window.mouseup", level._windowMouseup, true);
            editor.events.on("window.keydown", level._windowKeydown, true);
            elements[key].data("inst".concat(editor.id), true);
            editor.events.on("destroy", function () {
                if (editor.core.sameInstance(elements[key])) {
                    $("body").first().append(elements[key]);
                    elements[key].removeClass("fr-active");
                }
            }, true);
        }
        /**
         * @return {undefined}
         */
        function callback() {
            var showIP = $(this).prev().children().first();
            showIP.attr("checked", !showIP.attr("checked"));
        }
        /**
         * @return {undefined}
         */
        function close() {
            var i;
            for (i in elements) {
                if (Object.prototype.hasOwnProperty.call(elements, i)) {
                    var $el = elements[i];
                    if ($el) {
                        $el.html("").removeData().remove();
                        /** @type {null} */
                        elements[i] = null;
                    }
                }
            }
            /** @type {!Array} */
            elements = [];
        }
        var positionOut;
        var $ = editor.$;
        if (!editor.shared.popups) {
            editor.shared.popups = {};
        }
        var relatedWebsiteList;
        var elements = editor.shared.popups;
        /** @type {number} */
        var lastContentHeight = 2E3;
        return editor.shared.exit_flag = false, {
            _init: function () {
                /** @type {number} */
                positionOut = window.innerHeight;
                editor.events.on("shared.destroy", close, true);
                editor.events.on("window.mousedown", create);
                editor.events.on("window.touchmove", method);
                editor.events.$on($(editor.o_win), "scroll", method);
                editor.events.on("mousedown", function (event) {
                    if (test()) {
                        event.stopPropagation();
                        editor.$el.find(".fr-marker").remove();
                        create();
                        editor.events.disableBlur();
                    }
                });
            },
            create: function (options, data) {
                var el = function (key, value) {
                    var ref;
                    var left = function (option, obj) {
                        var o = data.POPUP_TEMPLATES[option];
                        if (!o) {
                            return null;
                        }
                        var key;
                        for (key in "function" == typeof o && (o = o.apply(editor)), obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                o = o.replace("[_".concat(key.toUpperCase(), "_]"), obj[key]);
                            }
                        }
                        return o;
                    }(key, value);
                    var el = $(editor.doc.createElement("DIV"));
                    if (!left) {
                        return "filesManager.insert" === key ? el.addClass("fr-popup fr-files-manager fr-empty") : el.addClass("fr-popup fr-empty"), (ref = $("body").first()).append(el), el.data("container", ref), elements[key] = el;
                    }
                    if ("filesManager.insert" === key) {
                        el.addClass("fr-popup fr-files-manager".concat(editor.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(editor.opts.toolbarInline ? " fr-inline" : ""));
                    } else {
                        el.addClass("fr-popup".concat(editor.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(editor.opts.toolbarInline ? " fr-inline" : ""));
                    }
                    el.html(left);
                    if (editor.opts.theme) {
                        el.addClass("".concat(editor.opts.theme, "-theme"));
                    }
                    if (1 < editor.opts.zIndex) {
                        if (!editor.opts.editInPopup && editor.$tb) {
                            editor.$tb.css("z-index", editor.opts.zIndex + 2);
                        } else {
                            el.css("z-index", editor.opts.zIndex + 2);
                        }
                    }
                    if ("auto" !== editor.opts.direction) {
                        el.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(editor.opts.direction));
                    }
                    el.find("input, textarea").attr("dir", editor.opts.direction).attr("disabled", "disabled");
                    (ref = $("body").first()).append(el);
                    el.data("container", ref);
                    var $container = (elements[key] = el).find(".fr-color-hex-layer");
                    if (0 < $container.length) {
                        var day = editor.helpers.getPX(el.find(".fr-color-set > span").css("width"));
                        var time = editor.helpers.getPX($container.css("paddingLeft"));
                        var additional_height = editor.helpers.getPX($container.css("paddingRight"));
                        $container.css("width", day * editor.opts.colorsStep + time + additional_height);
                    }
                    return editor.button.bindCommands(el, false), el;
                }(options, data);
                var that = resolve(options);
                init(that, options);
                editor.events.$on(el, "mousedown mouseup touchstart touchend touch", "*", that._preventFocus, true);
                editor.events.$on(el, "focus", "input, textarea, button, select", that._inputFocus, true);
                editor.events.$on(el, "blur", "input, textarea, button, select", that._inputBlur, true);
                var e = el.find("input, textarea");
                return function (ar) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < ar.length; i++) {
                        var p = ar[i];
                        var input = $(p);
                        if (0 === input.next().length && input.attr("placeholder")) {
                            input.after('<label for="'.concat(input.attr("id"), '">').concat(input.attr("placeholder"), "</label>"));
                            input.attr("placeholder", "");
                        }
                    }
                }(e), editor.events.$on(e, "focus", _hide), editor.events.$on(e, "blur change", filter), editor.events.$on(el, "click", ".fr-checkbox + label", callback), editor.accessibility.registerPopup(options), editor.helpers.isIOS() && editor.events.$on(el, "touchend", "label", function () {
                    $("#".concat($(this).attr("for"))).prop("checked", function (canCreateDiscussions, isSlidingUp) {
                        return !isSlidingUp;
                    });
                }, true), editor.events.$on($(editor.o_win), "resize", that._windowResize, true), "filesManager.insert" === options && elements["filesManager.insert"].css("zIndex", 2147483641), el;
            },
            get: function (i) {
                var $el = elements[i];
                return $el && !$el.data("inst".concat(editor.id)) && init(resolve(i), i), $el;
            },
            show: function (i, pos, prop, opt, videoId) {
                if (f(i) || (test() && 0 < editor.$el.find(".fr-marker").length ? (editor.events.disableBlur(), editor.selection.restore()) : test() || (editor.events.disableBlur(), editor.events.focus(), editor.events.enableBlur())), fn([i]), !elements[i]) {
                    return false;
                }
                var $btn = editor.button.getButtons(".fr-dropdown.fr-active");
                $btn.removeClass("fr-active").attr("aria-expanded", false).parents(".fr-toolbar").css("zIndex", "").find("> .fr-dropdown-wrapper").css("height", "");
                $btn.next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", "");
                elements[i].data("instance", editor);
                if (editor.$tb) {
                    editor.$tb.data("instance", editor);
                }
                var g = f(i);
                elements[i].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                var select = elements[i].data("container");
                if (function (i, t) {
                    if (!t.isVisible()) {
                        t = editor.$sc;
                    }
                    if (!t.contains([elements[i].get(0)])) {
                        t.append(elements[i]);
                    }
                }(i, select), editor.opts.toolbarInline && select && editor.$tb && select.get(0) === editor.$tb.get(0) && (disable(i, editor.$sc), prop = editor.$tb.offset().top - editor.helpers.getPX(editor.$tb.css("margin-top")), pos = editor.$tb.offset().left + editor.$tb.outerWidth() / 2, editor.node.hasClass(editor.$tb.get(0), "fr-above") && prop && (prop = prop + editor.$tb.outerHeight()), opt = 0), select = elements[i].data("container"), editor.opts.iframe && !opt && !g) {
                    var searchBarHeight = editor.helpers.getPX(editor.$wp.find(".fr-iframe").css("padding-top"));
                    var pageSize = editor.helpers.getPX(editor.$wp.find(".fr-iframe").css("padding-left"));
                    if (pos) {
                        /** @type {number} */
                        pos = pos - (editor.$iframe.offset().left + pageSize);
                    }
                    if (prop) {
                        /** @type {number} */
                        prop = prop - (editor.$iframe.offset().top + searchBarHeight);
                    }
                }
                if (select.is(editor.$tb)) {
                    editor.$tb.css("zIndex", (editor.opts.zIndex || 1) + 4);
                } else {
                    elements[i].css("zIndex", (editor.opts.zIndex || 1) + 3);
                }
                if (editor.opts.toolbarBottom && select && editor.$tb && select.get(0) === editor.$tb.get(0)) {
                    elements[i].addClass("fr-above");
                    if (prop) {
                        /** @type {number} */
                        prop = prop - elements[i].outerHeight();
                    }
                }
                if (videoId) {
                    /** @type {number} */
                    pos = pos - elements[i].width() / 2;
                }
                if (pos + elements[i].outerWidth() > editor.$sc.offset().left + editor.$sc.width()) {
                    /** @type {number} */
                    pos = pos - (pos + elements[i].outerWidth() - editor.$sc.offset().left - editor.$sc.width());
                }
                if (pos < editor.$sc.offset().left && "rtl" === editor.opts.direction) {
                    pos = editor.$sc.offset().left;
                }
                elements[i].removeClass("fr-active");
                editor.position.at(pos, prop, elements[i], opt || 0);
                var limit = editor.node.blockParent(editor.selection.blocks()[0]);
                if (limit && "false" === limit.getAttribute("contenteditable")) {
                    elements[i].removeClass("fr-active");
                } else {
                    var value = editor.selection.element().parentElement.getAttribute("contenteditable");
                    if (value && "false" === value) {
                        elements[i].removeClass("fr-active");
                    } else {
                        elements[i].addClass("fr-active");
                    }
                }
                if (!g) {
                    editor.accessibility.focusPopup(elements[i]);
                }
                if (editor.opts.toolbarInline) {
                    editor.toolbar.hide();
                }
                if (editor.$tb) {
                    relatedWebsiteList = editor.$tb.find(".fr-btn-active-popup");
                }
                editor.events.trigger("popups.show.".concat(i));
                resolve(i)._repositionPopup();
                method();
            },
            hide: update,
            onHide: function (element, event) {
                editor.events.on("popups.hide.".concat(element), event);
            },
            hideAll: fn,
            setContainer: disable,
            refresh: function (key) {
                elements[key].data("instance", editor);
                editor.events.trigger("popups.refresh.".concat(key));
                var bcofl_checkbox = elements[key].find(".fr-command");
                /** @type {number} */
                var i = 0;
                for (; i < bcofl_checkbox.length; i++) {
                    var $this = $(bcofl_checkbox[i]);
                    if (0 === $this.parents(".fr-dropdown-menu").length) {
                        editor.button.refresh($this);
                    }
                }
            },
            onRefresh: function (event, data) {
                editor.events.on("popups.refresh.".concat(event), data);
            },
            onShow: function (element, callback) {
                editor.events.on("popups.show.".concat(element), callback);
            },
            isVisible: f,
            setFileListHeight: render,
            areVisible: test,
            setPopupDimensions: function (tab, fromHashChange) {
                if (fromHashChange && tab.find(".fr-upload-progress-layer").get(0).clientHeight < lastContentHeight) {
                    tab.find(".fr-upload-progress").addClass("fr-height-auto");
                    editor.popups.get("filesManager.insert").addClass("fr-height-auto");
                    tab.find(".fr-upload-progress").removeClass("fr-height-set");
                    /** @type {number} */
                    lastContentHeight = 2E3;
                }
                if (tab.get(0).clientHeight > window.innerHeight / 2) {
                    if (window.innerWidth < 500) {
                        if (tab.get(0).clientHeight > .6 * positionOut) {
                            render(tab);
                        }
                    } else {
                        if (400 < tab.get(0).clientHeight) {
                            render(tab);
                        }
                    }
                    lastContentHeight = tab.find(".fr-upload-progress-layer").get(0).clientHeight;
                }
                /** @type {number} */
                var window_w = window.innerWidth;
                switch (true) {
                    case window_w <= 320:
                        tab.width(200);
                        break;
                    case window_w <= 420:
                        tab.width(250);
                        break;
                    case window_w <= 520:
                        tab.width(300);
                        break;
                    case window_w <= 720:
                        tab.width(400);
                        break;
                    case 720 < window_w:
                        tab.width(530);
                }
            }
        };
    };
    /**
     * ACCESSIBILITY MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.accessibility = function (editor) {
        /**
         * @param {!Object} e
         * @return {undefined}
         */
        function update(e) {
            var r = editor.$el.find('[contenteditable="true"]');
            /** @type {boolean} */
            var force = false;
            /** @type {number} */
            var i = 0;
            for (; r.get(i);) {
                if ($(r.get(i)).is(":focus")) {
                    /** @type {boolean} */
                    force = true;
                }
                i++;
            }
            if (e && e.length && !force) {
                if (!(e.data("blur-event-set") || e.parents(".fr-popup").length)) {
                    editor.events.$on(e, "blur", function () {
                        var inst = e.parents(".fr-toolbar, .fr-popup").data("instance") || editor;
                        if (inst.events.blurActive() && !editor.core.hasFocus()) {
                            inst.events.trigger("blur");
                        }
                        setTimeout(function () {
                            inst.events.enableBlur();
                        }, 100);
                    }, true);
                    e.data("blur-event-set", true);
                }
                (e.parents(".fr-toolbar, .fr-popup").data("instance") || editor).events.disableBlur();
                e.get(0).focus();
                /** @type {!Object} */
                editor.shared.$f_el = e;
            }
        }
        /**
         * @param {?} options
         * @param {string} prev
         * @return {?}
         */
        function fn(options, prev) {
            /** @type {string} */
            var method = prev ? "last" : "first";
            var preview = init(all(options))[method]();
            if (preview.length) {
                return update(preview), true;
            }
        }
        /**
         * @param {!Object} t
         * @return {?}
         */
        function extend(t) {
            return t.is("input, textarea, select") && get(), editor.events.disableBlur(), t.get(0).focus(), true;
        }
        /**
         * @param {!Object} self
         * @param {boolean} fn
         * @return {?}
         */
        function filter(self, fn) {
            var data = self.find("input, textarea, button, select").filter(function () {
                return $(this).isVisible();
            }).not(":disabled");
            if ((data = fn ? data.last() : data.first()).length) {
                return extend(data);
            }
            if (editor.shared.with_kb) {
                var date = self.findVisible(".fr-active-item").first();
                if (date.length) {
                    return extend(date);
                }
                var e = self.findVisible("[tabIndex]").first();
                if (e.length) {
                    return extend(e);
                }
            }
        }
        /**
         * @return {undefined}
         */
        function get() {
            if (0 === editor.$el.find(".fr-marker").length && editor.core.hasFocus()) {
                editor.selection.save();
            }
        }
        /**
         * @return {?}
         */
        function test() {
            var $insert_helper = editor.popups.areVisible();
            if ($insert_helper) {
                var n = $insert_helper.find(".fr-buttons");
                return n.find("button:focus, .fr-group span:focus").length ? !fn($insert_helper.data("instance").$tb) : !fn(n);
            }
            return !fn(editor.$tb);
        }
        /**
         * @return {?}
         */
        function create() {
            /** @type {null} */
            var t = null;
            return editor.shared.$f_el.is(".fr-dropdown.fr-active") ? t = editor.shared.$f_el : editor.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (t = editor.shared.$f_el.closest(".fr-dropdown-menu").prev()), t;
        }
        /**
         * @param {!Array} n
         * @return {?}
         */
        function init(n) {
            /** @type {number} */
            var j = -1;
            /** @type {number} */
            var i = 0;
            for (; i < n.length; i++) {
                if ($(n[i]).hasClass("fr-open")) {
                    /** @type {number} */
                    j = i;
                }
            }
            var p = n.index(editor.$tb.find(".fr-more-toolbar.fr-expanded > button.fr-command").first());
            if (0 < p && -1 !== j) {
                var a = n.slice(p, n.length);
                var numInternals = (n = n.slice(0, p)).slice(0, j + 1);
                var positions = n.slice(j + 1, n.length);
                n = numInternals;
                /** @type {number} */
                var i = 0;
                for (; i < a.length; i++) {
                    n.push(a[i]);
                }
                /** @type {number} */
                var k = 0;
                for (; k < positions.length; k++) {
                    n.push(positions[k]);
                }
            }
            return n;
        }
        /**
         * @param {?} body
         * @return {?}
         */
        function all(body) {
            return body.findVisible("button:not(.fr-disabled), .fr-group span.fr-command").filter(function (iframe) {
                var khover = $(iframe).parents(".fr-more-toolbar");
                return 0 === khover.length || 0 < khover.length && khover.hasClass("fr-expanded");
            });
        }
        /**
         * @param {?} options
         * @param {boolean} array
         * @param {boolean} value
         * @return {?}
         */
        function callback(options, array, value) {
            if (editor.shared.$f_el) {
                var headerrow = create();
                if (headerrow) {
                    editor.button.click(headerrow);
                    editor.shared.$f_el = headerrow;
                }
                var Array;
                var data = init(all(options));
                var name = data.index(editor.shared.$f_el);
                if (0 === name && !value || name === data.length - 1 && value) {
                    if (array) {
                        if (options.parent().is(".fr-popup")) {
                            /** @type {boolean} */
                            Array = !filter(options.parent().children().not(".fr-buttons"), !value);
                        }
                        if (false === Array) {
                            /** @type {null} */
                            editor.shared.$f_el = null;
                        }
                    }
                    if (!(array && false === Array)) {
                        fn(options, !value);
                    }
                } else {
                    update($(data.get(name + (value ? 1 : -1))));
                }
                return false;
            }
        }
        /**
         * @param {(!Function|string)} cb
         * @param {boolean} file
         * @return {?}
         */
        function spawn(cb, file) {
            return callback(cb, file, true);
        }
        /**
         * @param {(!Function|string)} obj
         * @param {boolean} h
         * @return {?}
         */
        function merge(obj, h) {
            return callback(obj, h);
        }
        /**
         * @param {boolean} e
         * @return {?}
         */
        function post(e) {
            if (editor.shared.$f_el) {
                var d;
                if (editor.shared.$f_el.is(".fr-dropdown.fr-active")) {
                    return update(d = e ? editor.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : editor.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), false;
                }
                if (editor.shared.$f_el.is("a.fr-command")) {
                    return (d = e ? editor.shared.$f_el.closest("li").nextAllVisible().first().find(".fr-command:not(.fr-disabled)").first() : editor.shared.$f_el.closest("li").prevAllVisible().first().find(".fr-command:not(.fr-disabled)").first()).length || (d = e ? editor.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : editor.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), update(d), false;
                }
            }
        }
        /**
         * @return {?}
         */
        function remove() {
            if (editor.shared.$f_el) {
                if (editor.shared.$f_el.hasClass("fr-dropdown")) {
                    editor.button.click(editor.shared.$f_el);
                } else {
                    if (editor.shared.$f_el.is("button.fr-back")) {
                        if (editor.opts.toolbarInline) {
                            editor.events.disableBlur();
                            editor.events.focus();
                        }
                        var input = editor.popups.areVisible(editor);
                        if (input) {
                            /** @type {boolean} */
                            editor.shared.with_kb = false;
                        }
                        editor.button.click(editor.shared.$f_el);
                        run(input);
                    } else {
                        if (editor.events.disableBlur(), editor.button.click(editor.shared.$f_el), editor.shared.$f_el.attr("data-group-name")) {
                            var self = editor.$tb.find('.fr-more-toolbar[data-name="'.concat(editor.shared.$f_el.attr("data-group-name"), '"]'));
                            var preview = editor.shared.$f_el;
                            if (self.hasClass("fr-expanded")) {
                                preview = self.findVisible("button:not(.fr-disabled)").first();
                            }
                            if (preview) {
                                update(preview);
                            }
                        } else {
                            if (editor.shared.$f_el.attr("data-popup")) {
                                var instance = editor.popups.areVisible(editor);
                                if (instance) {
                                    instance.data("popup-button", editor.shared.$f_el);
                                }
                            } else {
                                if (editor.shared.$f_el.attr("data-modal")) {
                                    var instance = editor.modals.areVisible(editor);
                                    if (instance) {
                                        instance.data("modal-button", editor.shared.$f_el);
                                    }
                                }
                            }
                        }
                        /** @type {null} */
                        editor.shared.$f_el = null;
                    }
                }
                return false;
            }
        }
        /**
         * @return {undefined}
         */
        function back() {
            if (editor.shared.$f_el) {
                editor.events.disableBlur();
                editor.shared.$f_el.blur();
                /** @type {null} */
                editor.shared.$f_el = null;
            }
            if (false !== editor.events.trigger("toolbar.focusEditor")) {
                editor.events.disableBlur();
                editor.$el.get(0).focus();
                editor.events.focus();
            }
        }
        /**
         * @param {!Object} data
         * @return {undefined}
         */
        function setup(data) {
            if (data && data.length) {
                editor.events.$on(data, "keydown", function (r) {
                    if (!$(r.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) {
                        return true;
                    }
                    var inst = data.parents(".fr-popup").data("instance") || data.data("instance") || editor;
                    /** @type {boolean} */
                    editor.shared.with_kb = true;
                    var hsl = inst.accessibility.exec(r, data);
                    return editor.shared.with_kb = false, hsl;
                }, true);
                editor.events.$on(data, "mouseenter", "[tabIndex]", function (event) {
                    var self = data.parents(".fr-popup").data("instance") || data.data("instance") || editor;
                    if (!r) {
                        return event.stopPropagation(), void event.preventDefault();
                    }
                    var a = $(event.currentTarget);
                    if (self.shared.$f_el && self.shared.$f_el.not(a)) {
                        self.accessibility.focusEditor();
                    }
                }, true);
                if (editor.$tb) {
                    editor.events.$on(editor.$tb, "transitionend", ".fr-more-toolbar", function () {
                        editor.shared.$f_el = $(document.activeElement);
                    });
                }
            }
        }
        /**
         * @param {!Object} data
         * @return {undefined}
         */
        function run(data) {
            var preview = data.data("popup-button");
            if (preview) {
                setTimeout(function () {
                    update(preview);
                    data.data("popup-button", null);
                }, 0);
            }
        }
        /**
         * @param {!Array} selector
         * @return {undefined}
         */
        function render(selector) {
            var $ = editor.popups.areVisible(selector);
            if ($) {
                $.data("popup-button", null);
            }
        }
        /**
         * @param {!Event} e
         * @return {?}
         */
        function listener(e) {
            var freeZoom = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
            if (e.which !== data.KEYCODE.F10 || freeZoom || e.shiftKey || !e.altKey) {
                return true;
            }
            /** @type {boolean} */
            editor.shared.with_kb = true;
            var frame = editor.popups.areVisible(editor);
            /** @type {boolean} */
            var val = false;
            return frame && (val = filter(frame.children().not(".fr-buttons"))), val || test(), editor.shared.with_kb = false, e.preventDefault(), e.stopPropagation(), false;
        }
        var $ = editor.$;
        /** @type {boolean} */
        var r = true;
        return {
            _init: function () {
                if (editor.$wp) {
                    editor.events.on("keydown", listener, true);
                } else {
                    editor.events.$on(editor.$win, "keydown", listener, true);
                }
                editor.events.on("mousedown", function (event) {
                    render(editor);
                    if (editor.shared.$f_el && editor.el.isSameNode(editor.shared.$f_el[0])) {
                        editor.accessibility.restoreSelection();
                        event.stopPropagation();
                        editor.events.disableBlur();
                        /** @type {null} */
                        editor.shared.$f_el = null;
                    }
                }, true);
                editor.events.on("blur", function () {
                    /** @type {null} */
                    editor.shared.$f_el = null;
                    render(editor);
                }, true);
            },
            registerPopup: function (h) {
                var el = editor.popups.get(h);
                var cos_h = function (v) {
                    var input = editor.popups.get(v);
                    return {
                        _tiKeydown: function (e) {
                            var self = input.data("instance") || editor;
                            if (false === self.events.trigger("popup.tab", [e])) {
                                return false;
                            }
                            var key = e.which;
                            var d = input.find(":focus").first();
                            if (data.KEYCODE.TAB === key) {
                                e.preventDefault();
                                var self = input.children().not(".fr-buttons");
                                var p = self.findVisible("input, textarea, button, select").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray();
                                var i = p.indexOf(this) + (e.shiftKey ? -1 : 1);
                                if (0 <= i && i < p.length) {
                                    return self.events.disableBlur(), $(p[i]).focus(), e.stopPropagation(), false;
                                }
                                var parsed = input.find(".fr-buttons");
                                if (parsed.length && fn(parsed, Boolean(e.shiftKey))) {
                                    return e.stopPropagation(), false;
                                }
                                if (filter(self)) {
                                    return e.stopPropagation(), false;
                                }
                            } else {
                                if (data.KEYCODE.ENTER !== key || !e.target || "TEXTAREA" === e.target.tagName) {
                                    return data.KEYCODE.ESC === key ? (e.preventDefault(), e.stopPropagation(), self.accessibility.restoreSelection(), self.popups.isVisible(v) && input.findVisible(".fr-back").length ? (self.opts.toolbarInline && (self.events.disableBlur(), self.events.focus()), self.button.exec(input.findVisible(".fr-back").first()), run(input)) : self.popups.isVisible(v) && input.findVisible(".fr-dismiss").length ? self.button.exec(input.findVisible(".fr-dismiss").first()) : (self.popups.hide(v),
                                        self.opts.toolbarInline && self.toolbar.showInline(null, true), run(input)), false) : data.KEYCODE.SPACE === key && (d.is(".fr-submit") || d.is(".fr-dismiss")) ? (e.preventDefault(), e.stopPropagation(), self.events.disableBlur(), self.button.exec(d), true) : self.keys.isBrowserAction(e) || d.is("input[type=text], textarea") || data.KEYCODE.SPACE === key && (d.is(".fr-link-attr") || d.is("input[type=file]")) ? void e.stopPropagation() : (e.stopPropagation(), e.preventDefault(),
                                            false);
                                }
                                /** @type {null} */
                                var g = null;
                                if (0 < input.findVisible(".fr-submit").length) {
                                    g = input.findVisible(".fr-submit").first();
                                } else {
                                    if (input.findVisible(".fr-dismiss").length) {
                                        g = input.findVisible(".fr-dismiss").first();
                                    }
                                }
                                if (g) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    self.events.disableBlur();
                                    self.button.exec(g);
                                }
                            }
                        },
                        _tiMouseenter: function () {
                            render(input.data("instance") || editor);
                        }
                    };
                }(h);
                setup(el.find(".fr-buttons"));
                editor.events.$on(el, "mouseenter", "tabIndex", cos_h._tiMouseenter, true);
                editor.events.$on(el.children().not(".fr-buttons"), "keydown", "[tabIndex]", cos_h._tiKeydown, true);
                editor.popups.onHide(h, function () {
                    (el.data("instance") || editor).accessibility.restoreSelection();
                });
                editor.popups.onShow(h, function () {
                    /** @type {boolean} */
                    r = false;
                    setTimeout(function () {
                        /** @type {boolean} */
                        r = true;
                    }, 0);
                });
            },
            registerToolbar: setup,
            focusToolbarElement: update,
            focusToolbar: fn,
            focusContent: filter,
            focusPopup: function ($gallery) {
                var el = $gallery.children().not(".fr-buttons");
                if (!el.data("mouseenter-event-set")) {
                    editor.events.$on(el, "mouseenter", "[tabIndex]", function (event) {
                        var inst = $gallery.data("instance") || editor;
                        if (!r) {
                            return event.stopPropagation(), void event.preventDefault();
                        }
                        var a = el.find(":focus").first();
                        if (a.length && !a.is("input, button, textarea, select")) {
                            inst.events.disableBlur();
                            a.blur();
                            inst.events.disableBlur();
                            inst.events.focus();
                        }
                    });
                    el.data("mouseenter-event-set", true);
                }
                if (!filter(el) && editor.shared.with_kb) {
                    fn($gallery.find(".fr-buttons"));
                }
            },
            focusModal: function (elem) {
                if (!editor.core.hasFocus()) {
                    editor.events.disableBlur();
                    editor.events.focus();
                }
                editor.accessibility.saveSelection();
                editor.events.disableBlur();
                editor.el.blur();
                editor.selection.clear();
                editor.events.disableBlur();
                if (editor.shared.with_kb) {
                    elem.find(".fr-command[tabIndex], [tabIndex]").first().focus();
                } else {
                    elem.find("[tabIndex]").first().focus();
                }
            },
            focusEditor: back,
            focusPopupButton: run,
            focusModalButton: function (fn) {
                var preview = fn.data("modal-button");
                if (preview) {
                    setTimeout(function () {
                        update(preview);
                        fn.data("modal-button", null);
                    }, 0);
                }
            },
            hasFocus: function () {
                return null !== editor.shared.$f_el;
            },
            exec: function (e, name) {
                var freeZoom = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
                var key = e.which;
                /** @type {boolean} */
                var result = false;
                return key !== data.KEYCODE.TAB || freeZoom || e.shiftKey || e.altKey ? key !== data.KEYCODE.ARROW_RIGHT || freeZoom || e.shiftKey || e.altKey ? key !== data.KEYCODE.TAB || freeZoom || !e.shiftKey || e.altKey ? key !== data.KEYCODE.ARROW_LEFT || freeZoom || e.shiftKey || e.altKey ? key !== data.KEYCODE.ARROW_UP || freeZoom || e.shiftKey || e.altKey ? key !== data.KEYCODE.ARROW_DOWN || freeZoom || e.shiftKey || e.altKey ? key !== data.KEYCODE.ENTER && key !== data.KEYCODE.SPACE || freeZoom ||
                    e.shiftKey || e.altKey ? key !== data.KEYCODE.ESC || freeZoom || e.shiftKey || e.altKey ? key !== data.KEYCODE.F10 || freeZoom || e.shiftKey || !e.altKey || (result = test()) : result = function (instance) {
                        if (editor.shared.$f_el) {
                            var app = create();
                            return app ? (editor.button.click(app), update(app)) : instance.parent().findVisible(".fr-back").length ? (editor.shared.with_kb = false, editor.opts.toolbarInline && (editor.events.disableBlur(), editor.events.focus()), editor.button.exec(instance.parent().findVisible(".fr-back")).first(), run(instance.parent())) : editor.shared.$f_el.is("button, .fr-group span") && (instance.parent().is(".fr-popup") ? (editor.accessibility.restoreSelection(), editor.shared.$f_el = null, false !== editor.events.trigger("toolbar.esc") &&
                                (editor.popups.hide(instance.parent()), editor.opts.toolbarInline && editor.toolbar.showInline(null, true), run(instance.parent()))) : back()), false;
                        }
                    }(name) : result = remove() : result = editor.shared.$f_el && editor.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? remove() : post(true) : result = post() : result = merge(name) : result = merge(name, true) : result = spawn(name) : result = spawn(name, true), editor.shared.$f_el || void 0 !== result || (result = true), !result && editor.keys.isBrowserAction(e) && (result = true), !!result || (e.preventDefault(), e.stopPropagation(), false);
            },
            saveSelection: get,
            restoreSelection: function () {
                if (editor.$el.find(".fr-marker").length) {
                    editor.events.disableBlur();
                    editor.selection.restore();
                    editor.events.enableBlur();
                }
            }
        };
    };
    Object.assign(data.DEFAULTS, {
        tooltips: true
    });
    /**
     * TOOLTIP MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.tooltip = function (editor) {
        /**
         * @return {undefined}
         */
        function show() {
            if (!editor.helpers.isMobile()) {
                if (editor.$tooltip) {
                    editor.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed");
                }
            }
        }
        /**
         * @param {!Object} $this
         * @param {number} type
         * @return {undefined}
         */
        function init($this, type) {
            if (!editor.helpers.isMobile() && ($this.data("title") || $this.data("title", $this.attr("title")), $this.data("title"))) {
                if (!editor.$tooltip) {
                    if (editor.opts.tooltips && !editor.helpers.isMobile()) {
                        if (editor.shared.$tooltip) {
                            editor.$tooltip = editor.shared.$tooltip;
                        } else {
                            editor.shared.$tooltip = $(editor.doc.createElement("DIV")).addClass("fr-tooltip");
                            editor.$tooltip = editor.shared.$tooltip;
                            if (editor.opts.theme) {
                                editor.$tooltip.addClass("".concat(editor.opts.theme, "-theme"));
                            }
                            $(editor.o_doc).find("body").first().append(editor.$tooltip);
                        }
                        editor.events.on("shared.destroy", function () {
                            editor.$tooltip.html("").removeData().remove();
                            /** @type {null} */
                            editor.$tooltip = null;
                        }, true);
                    }
                }
                $this.removeAttr("title");
                editor.$tooltip.text(editor.language.translate($this.data("title")));
                editor.$tooltip.addClass("fr-visible");
                var o = $this.offset().left + ($this.outerWidth() - editor.$tooltip.outerWidth()) / 2;
                if (o < 0) {
                    /** @type {number} */
                    o = 0;
                }
                if (o + editor.$tooltip.outerWidth() > $(editor.o_win).width()) {
                    /** @type {number} */
                    o = $(editor.o_win).width() - editor.$tooltip.outerWidth();
                }
                if (void 0 === type) {
                    type = editor.opts.toolbarBottom;
                }
                if ($this.offset().top - $(window).scrollTop() + $this.outerHeight() + 10 >= $(window).height()) {
                    /** @type {boolean} */
                    type = true;
                }
                var i = type ? $this.offset().top - editor.$tooltip.height() : $this.offset().top + $this.outerHeight();
                editor.$tooltip.css("position", "");
                editor.$tooltip.css("left", o);
                editor.$tooltip.css("top", Math.ceil(i));
                if ("static" !== $(editor.o_doc).find("body").first().css("position")) {
                    editor.$tooltip.css("margin-left", -$(editor.o_doc).find("body").first().offset().left);
                    editor.$tooltip.css("margin-top", -$(editor.o_doc).find("body").first().offset().top);
                } else {
                    editor.$tooltip.css("margin-left", "");
                    editor.$tooltip.css("margin-top", "");
                }
            }
        }
        var $ = editor.$;
        return {
            hide: show,
            to: init,
            bind: function (event, filter, data) {
                if (editor.opts.tooltips && !editor.helpers.isMobile()) {
                    editor.events.$on(event, "mouseover", filter, function (event) {
                        if (!(editor.node.hasClass(event.currentTarget, "fr-disabled") || editor.edit.isDisabled())) {
                            init($(event.currentTarget), data);
                        }
                    }, true);
                    editor.events.$on(event, "mouseout ".concat(editor._mousedown, " ").concat(editor._mouseup), filter, function () {
                        show();
                    }, true);
                }
            }
        };
    };
    /** @type {number} */
    data.TOOLBAR_VISIBLE_BUTTONS = 3;
    /**
     * BUTTON MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.button = function (editor) {
        /**
         * @param {!Array} r
         * @param {string} value
         * @param {boolean} indent
         * @return {?}
         */
        function fn(r, value, indent) {
            var result = $();
            /** @type {number} */
            var i = 0;
            for (; i < r.length; i++) {
                var a = $(r[i]);
                if (a.is(value) && (result = result.add(a)), indent && a.is(".fr-dropdown")) {
                    var s = a.next().find(value);
                    result = result.add(s);
                }
            }
            return result;
        }
        /**
         * @param {string} b
         * @param {boolean} i
         * @return {?}
         */
        function create(b, i) {
            var key;
            var a = $();
            if (!b) {
                return a;
            }
            for (key in a = (a = a.add(fn(result, b, i))).add(fn(value, b, i)), editor.shared.popups) {
                if (Object.prototype.hasOwnProperty.call(editor.shared.popups, key)) {
                    var c = editor.shared.popups[key].children().find(b);
                    a = a.add(c);
                }
            }
            for (key in editor.shared.modals) {
                if (Object.prototype.hasOwnProperty.call(editor.shared.modals, key)) {
                    var d = editor.shared.modals[key].$modal.find(b);
                    a = a.add(d);
                }
            }
            return a;
        }
        /**
         * @param {!Object} x
         * @return {undefined}
         */
        function close(x) {
            x.addClass("fr-blink");
            setTimeout(function () {
                x.removeClass("fr-blink");
            }, 500);
            var p = x.data("cmd");
            /** @type {!Array} */
            var sort = [];
            for (; void 0 !== x.data("param".concat(sort.length + 1));) {
                sort.push(x.data("param".concat(sort.length + 1)));
            }
            var $btn = create(".fr-dropdown.fr-active");
            if ($btn.length) {
                $btn.removeClass("fr-active").attr("aria-expanded", false).next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", "");
                $btn.prev(".fr-expanded").removeClass("fr-expanded");
                $btn.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", "");
            }
            x.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(p, sort);
        }
        /**
         * @param {!Object} parent
         * @return {undefined}
         */
        function init(parent) {
            var self = parent.parents(".fr-popup, .fr-toolbar").data("instance");
            if (0 === parent.parents(".fr-popup").length && parent.data("popup") && !parent.hasClass("fr-btn-active-popup") && parent.addClass("fr-btn-active-popup"), 0 !== parent.parents(".fr-popup").length || parent.data("popup") || self.popups.hideAll(), self.popups.areVisible() && !self.popups.areVisible(self)) {
                /** @type {number} */
                var i = 0;
                for (; i < data.INSTANCES.length; i++) {
                    if (data.INSTANCES[i] !== self && data.INSTANCES[i].popups && data.INSTANCES[i].popups.areVisible()) {
                        data.INSTANCES[i].$el.find(".fr-marker").remove();
                    }
                }
                self.popups.hideAll();
            }
            if (editor.node.hasClass(parent.get(0), "fr-dropdown")) {
                (function (elem) {
                    var widget = elem.next();
                    var i = editor.node.hasClass(elem.get(0), "fr-active");
                    var $btn = create(".fr-dropdown.fr-active").not(elem);
                    var app = elem.parents(".fr-toolbar, .fr-popup").data("instance") || editor;
                    if (app.helpers.isIOS() && !app.el.querySelector(".fr-marker")) {
                        app.selection.save();
                        app.selection.clear();
                        app.selection.restore();
                    }
                    widget.parents(".fr-more-toolbar").addClass("fr-overflow-visible");
                    /** @type {number} */
                    var scrollY = 0;
                    /** @type {number} */
                    var minHeight = 0;
                    var _self = widget.find("> .fr-dropdown-wrapper");
                    if (!i) {
                        var command = elem.data("cmd");
                        widget.find(".fr-command").removeClass("fr-active").attr("aria-selected", false);
                        if (data.COMMANDS[command] && data.COMMANDS[command].refreshOnShow) {
                            data.COMMANDS[command].refreshOnShow.apply(app, [elem, widget]);
                        }
                        widget.css("left", elem.offset().left - elem.parents(".fr-btn-wrap, .fr-toolbar, .fr-buttons").offset().left - ("rtl" === editor.opts.direction ? widget.width() - elem.outerWidth() : 0));
                        widget.addClass("test-height");
                        scrollY = widget.outerHeight();
                        minHeight = editor.helpers.getPX(_self.css("max-height"));
                        widget.removeClass("test-height");
                        widget.css("top", "").css("bottom", "");
                        /** @type {number} */
                        var sOffs = elem.outerHeight() / 10;
                        if (!editor.opts.toolbarBottom && widget.offset().top + elem.outerHeight() + scrollY < $(editor.o_doc).height()) {
                            widget.css("top", elem.position().top + elem.outerHeight() - sOffs);
                        } else {
                            /** @type {number} */
                            var stickyHeight = 0;
                            var tokQue = elem.parents(".fr-more-toolbar");
                            if (0 < tokQue.length) {
                                stickyHeight = tokQue.first().height();
                            }
                            widget.css("bottom", elem.parents(".fr-popup, .fr-toolbar").first().height() - stickyHeight - elem.position().top);
                        }
                    }
                    elem.addClass("fr-blink").toggleClass("fr-active");
                    if (elem.hasClass("fr-options")) {
                        elem.prev().toggleClass("fr-expanded");
                    }
                    if (elem.hasClass("fr-active")) {
                        widget.attr("aria-hidden", false);
                        elem.attr("aria-expanded", true);
                        (function (win, scrollY, minHeight) {
                            if (minHeight <= scrollY) {
                                win.parent().css("overflow", "auto");
                            }
                            win.css("height", Math.min(scrollY, minHeight));
                        })(_self, scrollY, minHeight);
                    } else {
                        widget.attr("aria-hidden", true).css("overflow", "");
                        elem.attr("aria-expanded", false);
                        _self.css("height", "");
                    }
                    setTimeout(function () {
                        elem.removeClass("fr-blink");
                    }, 300);
                    widget.css("margin-left", "");
                    if (widget.offset().left + widget.outerWidth() > editor.$sc.offset().left + editor.$sc.width()) {
                        widget.css("margin-left", -(widget.offset().left + widget.outerWidth() - editor.$sc.offset().left - editor.$sc.width()));
                    }
                    if (widget.offset().left < editor.$sc.offset().left && "rtl" === editor.opts.direction) {
                        widget.css("margin-left", editor.$sc.offset().left);
                    }
                    $btn.removeClass("fr-active").attr("aria-expanded", false).next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", "");
                    $btn.prev(".fr-expanded").removeClass("fr-expanded");
                    $btn.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", "");
                    if (!(0 !== elem.parents(".fr-popup").length || editor.opts.toolbarInline)) {
                        if (editor.node.hasClass(elem.get(0), "fr-active")) {
                            editor.$tb.css("zIndex", (editor.opts.zIndex || 1) + 4);
                        } else {
                            editor.$tb.css("zIndex", "");
                        }
                    }
                    var m = widget.find("a.fr-command.fr-active").first();
                    if (!editor.helpers.isMobile()) {
                        if (m.length) {
                            editor.accessibility.focusToolbarElement(m);
                            _self.scrollTop(Math.abs(m.parents(".fr-dropdown-content").offset().top - m.offset().top) - m.offset().top);
                        } else {
                            editor.accessibility.focusToolbarElement(elem);
                            _self.scrollTop(0);
                        }
                    }
                })(parent);
            } else {
                (function (arg) {
                    close(arg);
                })(parent);
                if (data.COMMANDS[parent.data("cmd")] && false !== data.COMMANDS[parent.data("cmd")].refreshAfterCallback) {
                    self.button.bulkRefresh();
                }
            }
        }
        /**
         * @param {!Event} p
         * @return {undefined}
         */
        function resolve(p) {
            init($(p.currentTarget));
        }
        /**
         * @param {!Object} o
         * @return {undefined}
         */
        function open(o) {
            var $btn = o.find(".fr-dropdown.fr-active");
            if ($btn.length) {
                $btn.removeClass("fr-active").attr("aria-expanded", false).next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", "");
                $btn.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", "");
                $btn.prev().removeClass("fr-expanded");
            }
        }
        /**
         * @param {!Event} event
         * @return {undefined}
         */
        function capture(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        /**
         * @param {!Event} e
         * @return {?}
         */
        function _edit(e) {
            if (e.stopPropagation(), !editor.helpers.isMobile()) {
                return false;
            }
        }
        /**
         * @param {string} name
         * @return {?}
         */
        function render(name) {
            var self = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            var i = 2 < arguments.length ? arguments[2] : void 0;
            if (editor.helpers.isMobile() && false === self.showOnMobile) {
                return "";
            }
            var a = self.displaySelection;
            if ("function" == typeof a) {
                a = a(editor);
            }
            /** @type {string} */
            var path = "";
            if ("options" !== self.type) {
                if (a) {
                    var x = "function" == typeof self.defaultSelection ? self.defaultSelection(editor) : self.defaultSelection;
                    /** @type {string} */
                    path = '<span style="width:'.concat(self.displaySelectionWidth || 100, 'px">').concat(editor.language.translate(x || self.title), "</span>");
                } else {
                    path = editor.icon.create(self.icon || name);
                    /** @type {string} */
                    path = path + '<span class="fr-sr-only">'.concat(editor.language.translate(self.title) || "", "</span>");
                }
            }
            /** @type {string} */
            var s = self.popup ? ' data-popup="true"' : "";
            /** @type {string} */
            var l = self.modal ? ' data-modal="true"' : "";
            var value = editor.shortcuts.get("".concat(name, "."));
            /** @type {string} */
            value = value ? " (".concat(value, ")") : "";
            /** @type {string} */
            var msg = "".concat(name, "-").concat(editor.id);
            /** @type {string} */
            var messages = "dropdown-menu-".concat(msg);
            /** @type {string} */
            var p = '<button id="'.concat(msg, '"').concat(self.more_btn ? ' data-group-name="'.concat(msg, '" ') : "", 'type="button" tabIndex="-1" role="button"').concat(self.toggle ? ' aria-pressed="false"' : "").concat("dropdown" === self.type || "options" === self.type ? ' aria-controls="'.concat(messages, '" aria-expanded="false" aria-haspopup="true"') : "").concat(self.disabled ? ' aria-disabled="true"' : "", ' title="').concat(editor.language.translate(self.title) || "").concat(value, '" class="fr-command fr-btn').concat("dropdown" ===
                self.type || "options" == self.type ? " fr-dropdown" : "").concat("options" == self.type ? " fr-options" : "").concat("more" == self.type ? " fr-more" : "").concat(self.displaySelection ? " fr-selection" : "").concat(self.back ? " fr-back" : "").concat(self.disabled ? " fr-disabled" : "").concat(i ? "" : " fr-hidden", '" data-cmd="').concat(name, '"').concat(s).concat(l, ">").concat(path, "</button>");
            if ("dropdown" === self.type || "options" === self.type) {
                /** @type {string} */
                var id = '<div id="'.concat(messages, '" class="fr-dropdown-menu" role="listbox" aria-labelledby="').concat(msg, '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">');
                /** @type {string} */
                id = id + function (name, data) {
                    /** @type {string} */
                    var html = "";
                    if (data.html) {
                        if ("function" == typeof data.html) {
                            /** @type {string} */
                            html = html + data.html.call(editor);
                        } else {
                            /** @type {string} */
                            html = html + data.html;
                        }
                    } else {
                        var item = data.options;
                        var i;
                        for (i in "function" == typeof item && (item = item()), html = html + '<ul class="fr-dropdown-list" role="presentation">', item) {
                            if (Object.prototype.hasOwnProperty.call(item, i)) {
                                var args = editor.shortcuts.get("".concat(name, ".").concat(i));
                                /** @type {string} */
                                args = args ? '<span class="fr-shortcut">'.concat(args, "</span>") : "";
                                /** @type {string} */
                                html = html + '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="'.concat("options" === data.type ? name.replace(/Options/g, "") : name, '" data-param1="').concat(i, '" title="').concat(item[i], '">').concat(editor.language.translate(item[i]), "</a></li>");
                            }
                        }
                        /** @type {string} */
                        html = html + "</ul>";
                    }
                    return html;
                }(name, self);
                /** @type {string} */
                p = p + (id = id + "</div></div></div>");
            }
            return self.hasOptions && self.hasOptions.apply(editor) && (p = '<div class="fr-btn-wrap">'.concat(p, " ").concat(render(name + "Options", Object.assign({}, self, {
                type: "options",
                hasOptions: false
            }), i), "  </div>")), p;
        }
        /**
         * @param {!Array} r
         * @return {?}
         */
        function _init(r) {
            var that = editor.$tb && editor.$tb.data("instance") || editor;
            if (false === editor.events.trigger("buttons.refresh")) {
                return true;
            }
            setTimeout(function () {
                var j = that.selection.inEditor() && that.core.hasFocus();
                /** @type {number} */
                var i = 0;
                for (; i < r.length; i++) {
                    var $btn = $(r[i]);
                    var command = $btn.data("cmd");
                    if (0 === $btn.parents(".fr-popup").length) {
                        if (j || data.COMMANDS[command] && data.COMMANDS[command].forcedRefresh) {
                            that.button.refresh($btn);
                        } else {
                            if (!editor.node.hasClass($btn.get(0), "fr-dropdown")) {
                                $btn.removeClass("fr-active");
                                if ($btn.attr("aria-pressed")) {
                                    $btn.attr("aria-pressed", false);
                                }
                            }
                        }
                    } else {
                        if ($btn.parents(".fr-popup").isVisible()) {
                            that.button.refresh($btn);
                        }
                    }
                }
            }, 0);
        }
        /**
         * @return {undefined}
         */
        function method() {
            _init(result);
            _init(value);
        }
        /**
         * @return {undefined}
         */
        function action() {
            /** @type {!Array} */
            result = [];
            /** @type {!Array} */
            value = [];
        }
        /**
         * @return {undefined}
         */
        function v() {
            clearTimeout(timer);
            /** @type {number} */
            timer = setTimeout(method, 50);
        }
        var $ = editor.$;
        /** @type {!Array} */
        var result = [];
        if (editor.opts.toolbarInline || editor.opts.toolbarContainer) {
            if (!editor.shared.buttons) {
                /** @type {!Array} */
                editor.shared.buttons = [];
            }
            result = editor.shared.buttons;
        }
        /** @type {!Array} */
        var value = [];
        if (!editor.shared.popup_buttons) {
            /** @type {!Array} */
            editor.shared.popup_buttons = [];
        }
        value = editor.shared.popup_buttons;
        /** @type {null} */
        var timer = null;
        return {
            _init: function () {
                if (editor.opts.toolbarInline) {
                    editor.events.on("toolbar.show", method);
                } else {
                    editor.events.on("mouseup", v);
                    editor.events.on("keyup", v);
                    editor.events.on("blur", v);
                    editor.events.on("focus", v);
                    editor.events.on("contentChanged", v);
                    if (editor.helpers.isMobile()) {
                        editor.events.$on(editor.$doc, "selectionchange", method);
                    }
                }
                editor.events.on("shared.destroy", action);
            },
            build: render,
            buildList: function (options, attributes) {
                /** @type {string} */
                var output = "";
                /** @type {number} */
                var i = 0;
                for (; i < options.length; i++) {
                    var key = options[i];
                    var values = data.COMMANDS[key];
                    if (!(values && void 0 !== values.plugin && editor.opts.pluginsEnabled.indexOf(values.plugin) < 0)) {
                        if (values) {
                            /** @type {string} */
                            output = output + render(key, values, void 0 === attributes || 0 <= attributes.indexOf(key));
                        } else {
                            if ("|" === key) {
                                /** @type {string} */
                                output = output + '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>';
                            } else {
                                if ("-" === key) {
                                    /** @type {string} */
                                    output = output + '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>';
                                }
                            }
                        }
                    }
                }
                return output;
            },
            buildGroup: function (options) {
                /** @type {string} */
                var result = "";
                /** @type {string} */
                var mm = "";
                var i;
                for (i in options) {
                    var menuOpts = options[i];
                    if (menuOpts.buttons) {
                        /** @type {string} */
                        var text = "";
                        /** @type {string} */
                        var output = "";
                        /** @type {number} */
                        var last = 0;
                        /** @type {string} */
                        var dir = "left";
                        /** @type {number} */
                        var index = data.TOOLBAR_VISIBLE_BUTTONS;
                        /** @type {number} */
                        var i = 0;
                        for (; i < menuOpts.buttons.length; i++) {
                            var start = menuOpts.buttons[i];
                            var end = data.COMMANDS[start];
                            if (!end) {
                                if ("|" == start) {
                                    /** @type {string} */
                                    text = text + '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>';
                                } else {
                                    if ("-" == start) {
                                        /** @type {string} */
                                        text = text + '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>';
                                    }
                                }
                            }
                            if (!(!end || end && void 0 !== end.plugin && editor.opts.pluginsEnabled.indexOf(end.plugin) < 0)) {
                                if (void 0 !== options[i].align) {
                                    dir = options[i].align;
                                }
                                if (void 0 !== options[i].buttonsVisible) {
                                    index = options[i].buttonsVisible;
                                }
                                if (options.showMoreButtons && index <= last) {
                                    /** @type {string} */
                                    output = output + render(start, end, true);
                                } else {
                                    /** @type {string} */
                                    text = text + render(start, end, true);
                                }
                                last++;
                            }
                        }
                        if (options.showMoreButtons && index < last) {
                            /** @type {string} */
                            var index = i;
                            var next = data.COMMANDS[index];
                            /** @type {boolean} */
                            next.more_btn = true;
                            /** @type {string} */
                            text = text + render(index, next, true);
                        }
                        /** @type {string} */
                        result = result + '<div class="fr-btn-grp fr-float-'.concat(dir, '">').concat(text, "</div>");
                        if (options.showMoreButtons && 0 < output.length) {
                            /** @type {string} */
                            mm = mm + '<div class="fr-more-toolbar" data-name="'.concat(i + "-" + editor.id, '">').concat(output, "</div>");
                        }
                    }
                }
                return editor.opts.toolbarBottom ? "".concat(mm, '<div class="fr-newline"></div>').concat(result) : "".concat(result, '<div class="fr-newline"></div>').concat(mm);
            },
            bindCommands: function (e, nodes) {
                /**
                 * @param {!Object} e
                 * @return {undefined}
                 */
                function listener(e) {
                    if (!e || e.type === editor._mouseup && e.target !== $("html").get(0) || "keydown" === e.type && (editor.keys.isCharacter(e.which) && !editor.keys.ctrlKey(e) || e.which === data.KEYCODE.ESC)) {
                        open(e);
                    }
                }
                editor.events.bindClick(e, ".fr-command:not(.fr-disabled)", resolve);
                editor.events.$on(e, "".concat(editor._mousedown, " ").concat(editor._mouseup, " ").concat(editor._move), ".fr-dropdown-menu", capture, true);
                editor.events.$on(e, "".concat(editor._mousedown, " ").concat(editor._mouseup, " ").concat(editor._move), ".fr-dropdown-menu .fr-dropdown-wrapper", _edit, true);
                var doc = e.get(0).ownerDocument;
                var channel = "defaultView" in doc ? doc.defaultView : doc.parentWindow;
                editor.events.$on($(channel), "".concat(editor._mouseup, " resize keydown"), listener, true);
                if (editor.opts.iframe) {
                    editor.events.$on(editor.$win, editor._mouseup, listener, true);
                }
                if (editor.node.hasClass(e.get(0), "fr-popup")) {
                    $.merge(value, e.find(".fr-btn").toArray());
                } else {
                    $.merge(result, e.find(".fr-btn").toArray());
                }
                editor.tooltip.bind(e, ".fr-btn, .fr-title", nodes);
            },
            refresh: function ($btn) {
                var originalEvent;
                var range = $btn.parents(".fr-popup, .fr-toolbar").data("instance") || editor;
                var i = $btn.data("cmd");
                if (editor.node.hasClass($btn.get(0), "fr-dropdown")) {
                    originalEvent = $btn.next();
                } else {
                    $btn.removeClass("fr-active");
                    if ($btn.attr("aria-pressed")) {
                        $btn.attr("aria-pressed", false);
                    }
                }
                if (data.COMMANDS[i] && data.COMMANDS[i].refresh) {
                    data.COMMANDS[i].refresh.apply(range, [$btn, originalEvent]);
                } else {
                    if (editor.refresh[i]) {
                        range.refresh[i]($btn, originalEvent);
                    }
                }
            },
            bulkRefresh: method,
            exec: close,
            click: init,
            hideActiveDropdowns: open,
            addButtons: function (element) {
                /** @type {number} */
                var elementIndex = 0;
                for (; elementIndex < element.length; elementIndex++) {
                    result.push(element);
                }
            },
            getButtons: create,
            getPosition: function (zone) {
                var menuIndexLeft = zone.offset().left;
                /** @type {number} */
                var topAdjustment = editor.opts.toolbarBottom ? 10 : zone.outerHeight() - 10;
                return {
                    left: menuIndexLeft,
                    top: zone.offset().top + topAdjustment
                };
            }
        };
    };
    /////////
    // ICONS
    /////////
    data.ICON_TEMPLATES = {
        font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
        font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5b: '<i class="fab fa-[FA5NAME]" aria-hidden="true"></i>',
        text: '<span style="text-align: center;">[NAME]</span>',
        image: "<img src=[SRC] alt=[ALT] />",
        svg: '<svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="[PATH]"/></svg>',
        empty: " "
    };
    data.ICONS = {
        bold: {
            NAME: "bold",
            SVG_KEY: "bold"
        },
        italic: {
            NAME: "italic",
            SVG_KEY: "italic"
        },
        underline: {
            NAME: "underline",
            SVG_KEY: "underline"
        },
        strikeThrough: {
            NAME: "strikethrough",
            SVG_KEY: "strikeThrough"
        },
        subscript: {
            NAME: "subscript",
            SVG_KEY: "subscript"
        },
        superscript: {
            NAME: "superscript",
            SVG_KEY: "superscript"
        },
        cancel: {
            NAME: "cancel",
            SVG_KEY: "cancel"
        },
        color: {
            NAME: "tint",
            SVG_KEY: "textColor"
        },
        outdent: {
            NAME: "outdent",
            SVG_KEY: "outdent"
        },
        indent: {
            NAME: "indent",
            SVG_KEY: "indent"
        },
        undo: {
            NAME: "rotate-left",
            FA5NAME: "undo",
            SVG_KEY: "undo"
        },
        redo: {
            NAME: "rotate-right",
            FA5NAME: "redo",
            SVG_KEY: "redo"
        },
        insert: {
            NAME: "insert",
            SVG_KEY: "insert"
        },
        insertAll: {
            NAME: "insertAll",
            SVG_KEY: "insertAll"
        },
        insertHR: {
            NAME: "minus",
            SVG_KEY: "horizontalLine"
        },
        clearFormatting: {
            NAME: "eraser",
            SVG_KEY: "clearFormatting"
        },
        selectAll: {
            NAME: "mouse-pointer",
            SVG_KEY: "selectAll"
        },
        minimize: {
            NAME: "minimize",
            SVG_KEY: "minimize"
        },
        moreText: {
            NAME: "ellipsis-v",
            SVG_KEY: "textMore"
        },
        moreParagraph: {
            NAME: "ellipsis-v",
            SVG_KEY: "paragraphMore"
        },
        moreRich: {
            NAME: "ellipsis-v",
            SVG_KEY: "insertMore"
        },
        moreMisc: {
            NAME: "ellipsis-v",
            SVG_KEY: "more"
        }
    };
    /**
     * @param {?} javascriptName
     * @param {?} jsonName
     * @return {undefined}
     */
    data.DefineIconTemplate = function (javascriptName, jsonName) {
        data.ICON_TEMPLATES[javascriptName] = jsonName;
    };
    /**
     * @param {?} dimensionId
     * @param {?} value
     * @return {undefined}
     */
    data.DefineIcon = function (dimensionId, value) {
        data.ICONS[dimensionId] = value;
    };
    Object.assign(data.DEFAULTS, {
        iconsTemplate: "svg"
    });
    /**
     * @param {!Object} item
     * @return {?}
     */
    data.MODULES.icon = function (item) {
        return {
            create: function (name) {
                /** @type {null} */
                var uniqueMatch = null;
                var self = data.ICONS[name];
                if (void 0 !== self) {
                    var fn = self.template || data.ICON_DEFAULT_TEMPLATE || item.opts.iconsTemplate;
                    if (fn && fn.apply) {
                        fn = fn.apply(item);
                    }
                    if (!self.FA5NAME) {
                        self.FA5NAME = self.NAME;
                    }
                    if (!("svg" !== fn || self.PATH)) {
                        self.PATH = data.SVG[self.SVG_KEY] || "";
                    }
                    if (fn && (fn = data.ICON_TEMPLATES[fn])) {
                        uniqueMatch = fn.replace(/\[([a-zA-Z0-9]*)\]/g, function (canCreateDiscussions, k) {
                            return "NAME" === k ? self[k] || name : self[k];
                        });
                    }
                }
                return uniqueMatch || name;
            },
            getTemplate: function (platform) {
                var params = data.ICONS[platform];
                var i = item.opts.iconsTemplate;
                return void 0 !== params ? i = params.template || data.ICON_DEFAULT_TEMPLATE || item.opts.iconsTemplate : i;
            },
            getFileIcon: function (file) {
                var item = data.FILEICONS[file];
                return void 0 !== item ? item : file;
            }
        };
    };
    data.SVG = {
        add: "M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z",
        advancedImageEditor: "M3,17v2h6v-2H3z M3,5v2h10V5H3z M13,21v-2h8v-2h-8v-2h-2v6H13z M7,9v2H3v2h4v2h2V9H7z M21,13v-2H11v2H21z M15,9h2V7h4V5h-4  V3h-2V9z",
        alignCenter: "M9,18h6v-2H9V18z M6,11v2h12v-2H6z M3,6v2h18V6H3z",
        alignJustify: "M3,18h18v-2H3V18z M3,11v2h18v-2H3z M3,6v2h18V6H3z",
        alignLeft: "M3,18h6v-2H3V18z M3,11v2h12v-2H3z M3,6v2h18V6H3z",
        alignRight: "M15,18h6v-2h-6V18z M9,11v2h12v-2H9z M3,6v2h18V6H3z",
        anchors: "M16,4h-4H8C6.9,4,6,4.9,6,6v4v10l6-2.6l6,2.6V10V6C18,4.9,17.1,4,16,4z M16,17l-4-1.8L8,17v-7V6h4h4v4V17z",
        autoplay: "M 7.570312 0.292969 C 7.542969 0.292969 7.515625 0.292969 7.488281 0.296875 C 7.203125 0.324219 6.984375 0.539062 6.980469 0.792969 L 6.925781 3.535156 C 2.796875 3.808594 -0.0078125 6.425781 -0.0859375 10.09375 C -0.121094 11.96875 0.710938 13.6875 2.265625 14.921875 C 3.769531 16.117188 5.839844 16.796875 8.097656 16.828125 C 8.140625 16.828125 12.835938 16.898438 13.035156 16.886719 C 15.171875 16.796875 17.136719 16.128906 18.558594 15.003906 C 20.066406 13.816406 20.882812 12.226562 20.917969 10.40625 C 20.960938 8.410156 20.023438 6.605469 18.289062 5.335938 C 18.214844 5.277344 18.128906 5.230469 18.035156 5.203125 C 17.636719 5.074219 17.222656 5.199219 17 5.476562 L 15.546875 7.308594 C 15.304688 7.609375 15.363281 8.007812 15.664062 8.265625 C 16.351562 8.851562 16.707031 9.625 16.6875 10.5 C 16.652344 12.25 15.070312 13.390625 12.757812 13.535156 C 12.59375 13.539062 8.527344 13.472656 8.164062 13.464844 C 5.703125 13.429688 4.101562 12.191406 4.140625 10.3125 C 4.175781 8.570312 5.132812 7.46875 6.847656 7.199219 L 6.796875 9.738281 C 6.792969 9.992188 7 10.214844 7.285156 10.253906 C 7.3125 10.257812 7.339844 10.257812 7.367188 10.257812 C 7.503906 10.261719 7.632812 10.222656 7.738281 10.148438 L 14.039062 5.785156 C 14.171875 5.691406 14.253906 5.558594 14.253906 5.410156 C 14.257812 5.261719 14.1875 5.125 14.058594 5.027344 L 7.941406 0.414062 C 7.835938 0.335938 7.707031 0.292969 7.570312 0.292969 ",
        back: "M20 11L7.83 11 11.425 7.405 10.01 5.991 5.416 10.586 5.414 10.584 4 11.998 4.002 12 4 12.002 5.414 13.416 5.416 13.414 10.01 18.009 11.425 16.595 7.83 13 20 13 20 13 20 11 20 11Z",
        backgroundColor: "M9.91752,12.24082l7.74791-5.39017,1.17942,1.29591-6.094,7.20747L9.91752,12.24082M7.58741,12.652l4.53533,4.98327a.93412.93412,0,0,0,1.39531-.0909L20.96943,8.7314A.90827.90827,0,0,0,20.99075,7.533l-2.513-2.76116a.90827.90827,0,0,0-1.19509-.09132L7.809,11.27135A.93412.93412,0,0,0,7.58741,12.652ZM2.7939,18.52772,8.41126,19.5l1.47913-1.34617-3.02889-3.328Z",
        blockquote: "M10.31788,5l.93817,1.3226A12.88271,12.88271,0,0,0,8.1653,9.40125a5.54242,5.54242,0,0,0-.998,3.07866v.33733q.36089-.04773.66067-.084a4.75723,4.75723,0,0,1,.56519-.03691,2.87044,2.87044,0,0,1,2.11693.8427,2.8416,2.8416,0,0,1,.8427,2.09274,3.37183,3.37183,0,0,1-.8898,2.453A3.143,3.143,0,0,1,8.10547,19,3.40532,3.40532,0,0,1,5.375,17.7245,4.91156,4.91156,0,0,1,4.30442,14.453,9.3672,9.3672,0,0,1,5.82051,9.32933,14.75716,14.75716,0,0,1,10.31788,5Zm8.39243,0,.9369,1.3226a12.88289,12.88289,0,0,0-3.09075,3.07865,5.54241,5.54241,0,0,0-.998,3.07866v.33733q.33606-.04773.63775-.084a4.91773,4.91773,0,0,1,.58938-.03691,2.8043,2.8043,0,0,1,2.1042.83,2.89952,2.89952,0,0,1,.80578,2.10547,3.42336,3.42336,0,0,1-.86561,2.453A3.06291,3.06291,0,0,1,16.49664,19,3.47924,3.47924,0,0,1,13.742,17.7245,4.846,4.846,0,0,1,12.64721,14.453,9.25867,9.25867,0,0,1,14.17476,9.3898,15.26076,15.26076,0,0,1,18.71031,5Z",
        bold: "M15.25,11.8h0A3.68,3.68,0,0,0,17,9a3.93,3.93,0,0,0-3.86-4H6.65V19h7a3.74,3.74,0,0,0,3.7-3.78V15.1A3.64,3.64,0,0,0,15.25,11.8ZM8.65,7h4.2a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61,2.23,2.23,0,0,1-.63.09H8.65Zm4.6,10H8.65V13h4.6a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61A2.23,2.23,0,0,1,13.25,17Z",
        cancel: "M13.4,12l5.6,5.6L17.6,19L12,13.4L6.4,19L5,17.6l5.6-5.6L5,6.4L6.4,5l5.6,5.6L17.6,5L19,6.4L13.4,12z",
        cellBackground: "M16.6,12.4L7.6,3.5L6.2,4.9l2.4,2.4l-5.2,5.2c-0.6,0.6-0.6,1.5,0,2.1l5.5,5.5c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4  l5.5-5.5C17.2,14,17.2,13,16.6,12.4z M5.2,13.5L10,8.7l4.8,4.8H5.2z M19,15c0,0-2,2.2-2,3.5c0,1.1,0.9,2,2,2s2-0.9,2-2  C21,17.2,19,15,19,15z",
        cellBorderColor: "M22,22H2v2h20V22z",
        cellOptions: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M9.5,6.5h5V9h-5V6.5z M8,17.5H4  c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z   M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4  c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0V9z",
        cellStyle: "M20,19.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L12.3,17h3.8l1.7-3.5l1.4,3.5H23L20,19.9z M20,5H4C2.9,5,2,5.9,2,7v10  c0,1.1,0.9,2,2,2h7.5l-0.6-0.6L10,17.5H9.5V15h5.4l1.1-2.3v-2.2h4.5v3H20l0.6,1.5H22V7C22,5.9,21.1,5,20,5z M3.5,7  c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0.1,0h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M4,17.5c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0-0.1v-2H8v2.5H4  z M14.5,9h-5V6.5h5V9z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0.1V9z",
        clearFormatting: "M11.48,10.09l-1.2-1.21L8.8,7.41,6.43,5,5.37,6.1,8.25,9,4.66,19h2l1.43-4h5.14l1.43,4h2l-.89-2.51L18.27,19l1.07-1.06L14.59,13.2ZM8.8,13l.92-2.56L12.27,13Zm.56-7.15L9.66,5h2l1.75,4.9Z",
        close: "M13.4,12l5.6,5.6L17.6,19L12,13.4L6.4,19L5,17.6l5.6-5.6L5,6.4L6.4,5l5.6,5.6L17.6,5L19,6.4L13.4,12z",
        codeView: "M9.4,16.6,4.8,12,9.4,7.4,8,6,2,12l6,6Zm5.2,0L19.2,12,14.6,7.4,16,6l6,6-6,6Z",
        cogs: "M18.877 12.907a6.459 6.459 0 0 0 0 -1.814l1.952 -1.526a0.468 0.468 0 0 0 0.111 -0.593l-1.851 -3.2a0.461 0.461 0 0 0 -0.407 -0.231 0.421 0.421 0 0 0 -0.157 0.028l-2.3 0.925a6.755 6.755 0 0 0 -1.563 -0.907l-0.352 -2.452a0.451 0.451 0 0 0 -0.453 -0.388h-3.7a0.451 0.451 0 0 0 -0.454 0.388L9.347 5.588A7.077 7.077 0 0 0 7.783 6.5l-2.3 -0.925a0.508 0.508 0 0 0 -0.166 -0.028 0.457 0.457 0 0 0 -0.4 0.231l-1.851 3.2a0.457 0.457 0 0 0 0.111 0.593l1.952 1.526A7.348 7.348 0 0 0 5.063 12a7.348 7.348 0 0 0 0.064 0.907L3.175 14.433a0.468 0.468 0 0 0 -0.111 0.593l1.851 3.2a0.461 0.461 0 0 0 0.407 0.231 0.421 0.421 0 0 0 0.157 -0.028l2.3 -0.925a6.74 6.74 0 0 0 1.564 0.907L9.7 20.864a0.451 0.451 0 0 0 0.454 0.388h3.7a0.451 0.451 0 0 0 0.453 -0.388l0.352 -2.452a7.093 7.093 0 0 0 1.563 -0.907l2.3 0.925a0.513 0.513 0 0 0 0.167 0.028 0.457 0.457 0 0 0 0.4 -0.231l1.851 -3.2a0.468 0.468 0 0 0 -0.111 -0.593Zm-0.09 2.029l-0.854 1.476 -2.117 -0.852 -0.673 0.508a5.426 5.426 0 0 1 -1.164 0.679l-0.795 0.323 -0.33 2.269h-1.7l-0.32 -2.269 -0.793 -0.322a5.3 5.3 0 0 1 -1.147 -0.662L8.2 15.56l-2.133 0.86 -0.854 -1.475 1.806 -1.411 -0.1 -0.847c-0.028 -0.292 -0.046 -0.5 -0.046 -0.687s0.018 -0.4 0.045 -0.672l0.106 -0.854L5.217 9.064l0.854 -1.475 2.117 0.851 0.673 -0.508a5.426 5.426 0 0 1 1.164 -0.679l0.8 -0.323 0.331 -2.269h1.7l0.321 2.269 0.792 0.322a5.3 5.3 0 0 1 1.148 0.661l0.684 0.526 2.133 -0.859 0.853 1.473 -1.8 1.421 0.1 0.847a5 5 0 0 1 0.046 0.679c0 0.193 -0.018 0.4 -0.045 0.672l-0.106 0.853ZM12 14.544A2.544 2.544 0 1 1 14.546 12 2.552 2.552 0 0 1 12 14.544Z",
        columns: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z M20.5,17  c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0  V9z",
        edit: "M17,11.2L12.8,7L5,14.8V19h4.2L17,11.2z M7,16.8v-1.5l5.6-5.6l1.4,1.5l-5.6,5.6H7z M13.5,6.3l0.7-0.7c0.8-0.8,2.1-0.8,2.8,0  c0,0,0,0,0,0L18.4,7c0.8,0.8,0.8,2,0,2.8l-0.7,0.7L13.5,6.3z",
        exitFullscreen: "M5,16H8v3h2V14H5ZM8,8H5v2h5V5H8Zm6,11h2V16h3V14H14ZM16,8V5H14v5h5V8Z",
        fileInsert: "M 8.09375 12.75 L 5.90625 12.75 C 5.542969 12.75 5.25 12.394531 5.25 11.953125 L 5.25 6.375 L 2.851562 6.375 C 2.367188 6.375 2.121094 5.660156 2.464844 5.242188 L 6.625 0.1875 C 6.832031 -0.0585938 7.167969 -0.0585938 7.371094 0.1875 L 11.535156 5.242188 C 11.878906 5.660156 11.632812 6.375 11.148438 6.375 L 8.75 6.375 L 8.75 11.953125 C 8.75 12.394531 8.457031 12.75 8.09375 12.75 Z M 14 12.484375 L 14 16.203125 C 14 16.644531 13.707031 17 13.34375 17 L 0.65625 17 C 0.292969 17 0 16.644531 0 16.203125 L 0 12.484375 C 0 12.042969 0.292969 11.6875 0.65625 11.6875 L 4.375 11.6875 L 4.375 11.953125 C 4.375 12.980469 5.0625 13.8125 5.90625 13.8125 L 8.09375 13.8125 C 8.9375 13.8125 9.625 12.980469 9.625 11.953125 L 9.625 11.6875 L 13.34375 11.6875 C 13.707031 11.6875 14 12.042969 14 12.484375 Z M 10.609375 15.40625 C 10.609375 15.039062 10.363281 14.742188 10.0625 14.742188 C 9.761719 14.742188 9.515625 15.039062 9.515625 15.40625 C 9.515625 15.773438 9.761719 16.070312 10.0625 16.070312 C 10.363281 16.070312 10.609375 15.773438 10.609375 15.40625 Z M 12.359375 15.40625 C 12.359375 15.039062 12.113281 14.742188 11.8125 14.742188 C 11.511719 14.742188 11.265625 15.039062 11.265625 15.40625 C 11.265625 15.773438 11.511719 16.070312 11.8125 16.070312 C 12.113281 16.070312 12.359375 15.773438 12.359375 15.40625 Z M 12.359375 15.40625 ",
        fileManager: "M 0 5.625 L 20.996094 5.625 L 21 15.75 C 21 16.371094 20.410156 16.875 19.6875 16.875 L 1.3125 16.875 C 0.585938 16.875 0 16.371094 0 15.75 Z M 0 5.625 M 21 4.5 L 0 4.5 L 0 2.25 C 0 1.628906 0.585938 1.125 1.3125 1.125 L 6.921875 1.125 C 7.480469 1.125 8.015625 1.316406 8.40625 1.652344 L 9.800781 2.847656 C 10.195312 3.183594 10.730469 3.375 11.289062 3.375 L 19.6875 3.375 C 20.414062 3.375 21 3.878906 21 4.5 Z M 21 4.5",
        fontAwesome: "M18.99018,13.98212V7.52679c-.08038-1.21875-1.33929-.683-1.33929-.683-2.933,1.39282-4.36274.61938-5.85938.15625a6.23272,6.23272,0,0,0-2.79376-.20062l-.00946.004A1.98777,1.98777,0,0,0,7.62189,5.106a.984.984,0,0,0-.17517-.05432c-.02447-.0055-.04882-.01032-.0736-.0149A.9565.9565,0,0,0,7.1908,5H6.82539a.9565.9565,0,0,0-.18232.0368c-.02472.00458-.04907.0094-.07348.01484a.985.985,0,0,0-.17523.05438,1.98585,1.98585,0,0,0-.573,3.49585v9.394A1.004,1.004,0,0,0,6.82539,19H7.1908a1.00406,1.00406,0,0,0,1.00409-1.00409V15.52234c3.64221-1.09827,5.19709.64282,7.09888.57587a5.57291,5.57291,0,0,0,3.25446-1.05805A1.2458,1.2458,0,0,0,18.99018,13.98212Z",
        fontFamily: "M16,19h2L13,5H11L6,19H8l1.43-4h5.14Zm-5.86-6L12,7.8,13.86,13Z",
        fontSize: "M20.75,19h1.5l-3-10h-1.5l-3,10h1.5L17,16.5h3Zm-3.3-4,1.05-3.5L19.55,15Zm-5.7,4h2l-5-14h-2l-5,14h2l1.43-4h5.14ZM5.89,13,7.75,7.8,9.61,13Z",
        fullscreen: "M7,14H5v5h5V17H7ZM5,10H7V7h3V5H5Zm12,7H14v2h5V14H17ZM14,5V7h3v3h2V5Z",
        help: "M11,17h2v2h-2V17z M12,5C9.8,5,8,6.8,8,9h2c0-1.1,0.9-2,2-2s2,0.9,2,2c0,2-3,1.7-3,5v1h2v-1c0-2.2,3-2.5,3-5  C16,6.8,14.2,5,12,5z",
        horizontalLine: "M5,12h14 M19,11H5v2h14V11z",
        imageAltText: "M19,7h-6v12h-2V7H5V5h6h2h6V7z",
        imageCaption: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z M22,22H2v2h20V22z",
        imageClass: "M9.5,13.4l-2.9-2.9h3.8L12.2,7l1.4,3.5h3.8l-3,2.9l0.9,3.6L12,15.1L8.8,17L9.5,13.4z M22,6v12c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,6H4v12h16V8.8V6z",
        imageDisplay: "M3,5h18v2H3V5z M13,9h8v2h-8V9z M13,13h8v2h-8V13z M3,17h18v2H3V17z M3,9h8v6H3V9z",
        imageManager: "M20,6h-7l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18H4V6h6.2l2,2H20V18z   M18,16l-3.8-5H14l-2.9,3.8L9,12.1L6,16H18z M10,9.5C10,8.7,9.3,8,8.5,8S7,8.7,7,9.5S7.7,11,8.5,11S10,10.3,10,9.5z",
        imageSize: "M16.9,4c-0.3,0-0.5,0.2-0.8,0.3L3.3,13c-0.9,0.6-1.1,1.9-0.5,2.8l2.2,3.3c0.4,0.7,1.2,1,2,0.8c0.3,0,0.5-0.2,0.8-0.3  L20.7,11c0.9-0.6,1.1-1.9,0.5-2.8l-2.2-3.3C18.5,4.2,17.7,3.9,16.9,4L16.9,4z M16.9,9.9L18.1,9l-2-2.9L17,5.6c0.1,0,0.1-0.1,0.2-0.1  c0.2,0,0.4,0,0.5,0.2L19.9,9c0.2,0.2,0.1,0.5-0.1,0.7L7,18.4c-0.1,0-0.1,0.1-0.2,0.1c-0.2,0-0.4,0-0.5-0.2L4.1,15  c-0.2-0.2-0.1-0.5,0.1-0.7L5,13.7l2,2.9l1.2-0.8l-2-2.9L7.5,12l1.1,1.7l1.2-0.8l-1.1-1.7l1.2-0.8l2,2.9l1.2-0.8l-2-2.9l1.2-0.8  l1.1,1.7l1.2-0.8l-1.1-1.7L14.9,7L16.9,9.9z",
        indent: "M3,9v6l3-3L3,9z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z",
        inlineClass: "M9.9,13.313A1.2,1.2,0,0,1,9.968,13H6.277l1.86-5.2,1.841,5.148A1.291,1.291,0,0,1,11.212,12h.426l-2.5-7h-2l-5,14h2l1.43-4H9.9Zm2.651,6.727a2.884,2.884,0,0,1-.655-2.018v-2.71A1.309,1.309,0,0,1,13.208,14h3.113a3.039,3.039,0,0,1,2,1.092s1.728,1.818,2.964,2.928a1.383,1.383,0,0,1,.318,1.931,1.44,1.44,0,0,1-.19.215l-3.347,3.31a1.309,1.309,0,0,1-1.832.258h0a1.282,1.282,0,0,1-.258-.257l-1.71-1.728Zm2.48-3.96a.773.773,0,1,0,.008,0Z",
        inlineStyle: "M11.88,15h.7l.7-1.7-3-8.3h-2l-5,14h2l1.4-4Zm-4.4-2,1.9-5.2,1.9,5.2ZM15.4,21.545l3.246,1.949-.909-3.637L20.72,17H16.954l-1.429-3.506L13.837,17H10.071l2.857,2.857-.779,3.637Z",
        insert: "M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10",
        insertEmbed: "M20.73889,15.45929a3.4768,3.4768,0,0,0-5.45965-.28662L9.5661,12.50861a3.49811,3.49811,0,0,0-.00873-1.01331l5.72174-2.66809a3.55783,3.55783,0,1,0-.84527-1.81262L8.70966,9.6839a3.50851,3.50851,0,1,0,.0111,4.63727l5.7132,2.66412a3.49763,3.49763,0,1,0,6.30493-1.526ZM18.00745,5.01056A1.49993,1.49993,0,1,1,16.39551,6.3894,1.49994,1.49994,0,0,1,18.00745,5.01056ZM5.99237,13.49536a1.49989,1.49989,0,1,1,1.61194-1.37878A1.49982,1.49982,0,0,1,5.99237,13.49536Zm11.78211,5.494a1.49993,1.49993,0,1,1,1.61193-1.37885A1.49987,1.49987,0,0,1,17.77448,18.98932Z",
        insertFile: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z",
        insertImage: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z",
        insertLink: "M11,17H7A5,5,0,0,1,7,7h4V9H7a3,3,0,0,0,0,6h4ZM17,7H13V9h4a3,3,0,0,1,0,6H13v2h4A5,5,0,0,0,17,7Zm-1,4H8v2h8Z",
        insertMore: "M16.5,13h-6v6h-2V13h-6V11h6V5h2v6h6Zm5,4.5A1.5,1.5,0,1,1,20,16,1.5,1.5,0,0,1,21.5,17.5Zm0-4A1.5,1.5,0,1,1,20,12,1.5,1.5,0,0,1,21.5,13.5Zm0-4A1.5,1.5,0,1,1,20,8,1.5,1.5,0,0,1,21.5,9.5Z",
        insertTable: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M9.5,13.5v-3  h5v3H9.5z M14.5,15v2.5h-5V15H14.5z M9.5,9V6.5h5V9H9.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M3.5,17  v-2H8v2.5H4C3.7,17.5,3.5,17.3,3.5,17z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M16,9V6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16z",
        insertVideo: "M15,8v8H5V8H15m2,2.5V7a1,1,0,0,0-1-1H4A1,1,0,0,0,3,7V17a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V13.5l2.29,2.29A1,1,0,0,0,21,15.08V8.91a1,1,0,0,0-1.71-.71Z",
        upload: "M12 6.66667a4.87654 4.87654 0 0 1 4.77525 3.92342l0.29618 1.50268 1.52794 0.10578a2.57021 2.57021 0 0 1 -0.1827 5.13478H6.5a3.49774 3.49774 0 0 1 -0.3844 -6.97454l1.06682 -0.11341L7.678 9.29387A4.86024 4.86024 0 0 1 12 6.66667m0 -2A6.871 6.871 0 0 0 5.90417 8.37 5.49773 5.49773 0 0 0 6.5 19.33333H18.41667a4.57019 4.57019 0 0 0 0.32083 -9.13A6.86567 6.86567 0 0 0 12 4.66667Zm0.99976 7.2469h1.91406L11.99976 9 9.08618 11.91357h1.91358v3H11V16h2V14h-0.00024Z",
        uploadFiles: "M12 6.66667a4.87654 4.87654 0 0 1 4.77525 3.92342l0.29618 1.50268 1.52794 0.10578a2.57021 2.57021 0 0 1 -0.1827 5.13478H6.5a3.49774 3.49774 0 0 1 -0.3844 -6.97454l1.06682 -0.11341L7.678 9.29387A4.86024 4.86024 0 0 1 12 6.66667m0 -2A6.871 6.871 0 0 0 5.90417 8.37 5.49773 5.49773 0 0 0 6.5 19.33333H18.41667a4.57019 4.57019 0 0 0 0.32083 -9.13A6.86567 6.86567 0 0 0 12 4.66667Zm0.99976 7.2469h1.91406L11.99976 9 9.08618 11.91357h1.91358v3H11V16h2V14h-0.00024Z",
        italic: "M11.76,9h2l-2.2,10h-2Zm1.68-4a1,1,0,1,0,1,1,1,1,0,0,0-1-1Z",
        search: "M15.5 14h-0.79l-0.28 -0.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09 -0.59 4.23 -1.57l0.27 0.28v0.79l5 4.99L20.49 19l-4.99 -5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        lineHeight: "M6.25,7h2.5L5.25,3.5,1.75,7h2.5V17H1.75l3.5,3.5L8.75,17H6.25Zm4-2V7h12V5Zm0,14h12V17h-12Zm0-6h12V11h-12Z",
        linkStyles: "M19,17.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L11.3,15h3.8l1.7-3.5l1.4,3.5H22L19,17.9z M20,12c0,0.3-0.1,0.7-0.2,1h2.1  c0.1-0.3,0.1-0.6,0.1-1c0-2.8-2.2-5-5-5h-4v2h4C18.7,9,20,10.3,20,12z M14.8,11H8v2h3.3h2.5L14.8,11z M9.9,16.4L8.5,15H7  c-1.7,0-3-1.3-3-3s1.3-3,3-3h4V7H7c-2.8,0-5,2.2-5,5s2.2,5,5,5h3.5L9.9,16.4z",
        mention: "M12.4,5c-4.1,0-7.5,3.4-7.5,7.5S8.3,20,12.4,20h3.8v-1.5h-3.8c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6v1.1  c0,0.6-0.5,1.2-1.1,1.2s-1.1-0.6-1.1-1.2v-1.1c0-2.1-1.7-3.8-3.8-3.8s-3.7,1.7-3.7,3.8s1.7,3.8,3.8,3.8c1,0,2-0.4,2.7-1.1  c0.5,0.7,1.3,1.1,2.2,1.1c1.5,0,2.6-1.2,2.6-2.7v-1.1C19.9,8.4,16.6,5,12.4,5z M12.4,14.7c-1.2,0-2.3-1-2.3-2.2s1-2.3,2.3-2.3  s2.3,1,2.3,2.3S13.6,14.7,12.4,14.7z",
        minimize: "M5,12h14 M19,11H5v2h14V11z",
        more: "M13.5,17c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,16.2,13.5,17z M13.5,12c0,0.8-0.7,1.5-1.5,1.5 s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,11.2,13.5,12z M13.5,7c0,0.8-0.7,1.5-1.5,1.5S10.5,7.8,10.5,7s0.7-1.5,1.5-1.5 S13.5,6.2,13.5,7z",
        openLink: "M17,17H7V7h3V5H7C6,5,5,6,5,7v10c0,1,1,2,2,2h10c1,0,2-1,2-2v-3h-2V17z M14,5v2h1.6l-5.8,5.8l1.4,1.4L17,8.4V10h2V5H14z",
        orderedList: "M2.5,16h2v.5h-1v1h1V18h-2v1h3V15h-3Zm1-7h1V5h-2V6h1Zm-1,2H4.3L2.5,13.1V14h3V13H3.7l1.8-2.1V10h-3Zm5-5V8h14V6Zm0,12h14V16H7.5Zm0-5h14V11H7.5Z",
        outdent: "M3,12l3,3V9L3,12z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z",
        pageBreaker: "M3,9v6l3-3L3,9z M21,9H8V4h2v3h9V4h2V9z M21,20h-2v-3h-9v3H8v-5h13V20z M11,13H8v-2h3V13z M16,13h-3v-2h3V13z M21,13h-3v-2  h3V13z",
        paragraphFormat: "M10.15,5A4.11,4.11,0,0,0,6.08,8.18,4,4,0,0,0,10,13v6h2V7h2V19h2V7h2V5ZM8,9a2,2,0,0,1,2-2v4A2,2,0,0,1,8,9Z",
        paragraphMore: "M7.682,5a4.11,4.11,0,0,0-4.07,3.18,4,4,0,0,0,3.11,4.725h0l.027.005a3.766,3.766,0,0,0,.82.09v6h2V7h2V19h2V7h2V5ZM5.532,9a2,2,0,0,1,2-2v4A2,2,0,0,1,5.532,9Zm14.94,8.491a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,17.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,13.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,9.491Z",
        paragraphStyle: "M4,9c0-1.1,0.9-2,2-2v4C4.9,11,4,10.1,4,9z M16.7,20.5l3.2,1.9L19,18.8l3-2.9h-3.7l-1.4-3.5L15.3,16h-3.8l2.9,2.9l-0.9,3.6  L16.7,20.5z M10,17.4V19h1.6L10,17.4z M6.1,5c-1.9,0-3.6,1.3-4,3.2c-0.5,2.1,0.8,4.2,2.9,4.7c0,0,0,0,0,0h0.2C5.5,13,5.8,13,6,13v6  h2V7h2v7h2V7h2V5H6.1z",
        pdfExport: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z M16.3,13.5  c-0.2-0.6-1.1-0.8-2.6-0.8c-0.1,0-0.1,0-0.2,0c-0.3-0.3-0.8-0.9-1-1.2c-0.2-0.2-0.3-0.3-0.4-0.6c0.2-0.7,0.2-1,0.3-1.5  c0.1-0.9,0-1.6-0.2-1.8c-0.4-0.2-0.7-0.2-0.9-0.2c-0.1,0-0.3,0.2-0.7,0.7c-0.2,0.7-0.1,1.8,0.6,2.8c-0.2,0.8-0.7,1.6-1,2.4  c-0.8,0.2-1.5,0.7-1.9,1.1c-0.7,0.7-0.9,1.1-0.7,1.6c0,0.3,0.2,0.6,0.7,0.6c0.3-0.1,0.3-0.2,0.7-0.3c0.6-0.3,1.2-1.7,1.7-2.4  c0.8-0.2,1.7-0.3,2-0.3c0.1,0,0.3,0,0.6,0c0.8,0.8,1.2,1.1,1.8,1.2c0.1,0,0.2,0,0.3,0c0.3,0,0.8-0.1,1-0.6  C16.4,14.1,16.4,13.9,16.3,13.5z M8.3,15.7c-0.1,0.1-0.2,0.1-0.2,0.1c0-0.1,0-0.3,0.6-0.8c0.2-0.2,0.6-0.3,0.9-0.7  C9,15,8.6,15.5,8.3,15.7z M11.3,9c0-0.1,0.1-0.2,0.1-0.2S11.6,9,11.5,10c0,0.1,0,0.3-0.1,0.7C11.3,10.1,11,9.5,11.3,9z M10.9,13.1  c0.2-0.6,0.6-1,0.7-1.5c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.2,0.3,0.7,0.7,0.9C12.2,12.8,11.6,13,10.9,13.1z M15.2,14.1  c-0.1,0-0.1,0-0.2,0c-0.2,0-0.7-0.2-1-0.7c1.1,0,1.6,0.2,1.6,0.6C15.5,14.1,15.4,14.1,15.2,14.1z",
        print: "M16.1,17c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1s-0.4,1-1,1C16.5,18,16.1,17.6,16.1,17z M22,15v4c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h1V5c0-1.1,0.9-2,2-2h7.4L19,7.6V13h1C21.1,13,22,13.9,22,15z M7,13h10V9h-4V5H7V13z M20,15H4  v4h16V15z",
        redo: "M13.6,9.4c1.7,0.3,3.2,0.9,4.6,2L21,8.5v7h-7l2.7-2.7C13,10.1,7.9,11,5.3,14.7c-0.2,0.3-0.4,0.5-0.5,0.8L3,14.6  C5.1,10.8,9.3,8.7,13.6,9.4z",
        removeTable: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z",
        insertAll: "M 9.25 12 L 6.75 12 C 6.335938 12 6 11.664062 6 11.25 L 6 6 L 3.257812 6 C 2.703125 6 2.425781 5.328125 2.820312 4.933594 L 7.570312 0.179688 C 7.804688 -0.0546875 8.191406 -0.0546875 8.425781 0.179688 L 13.179688 4.933594 C 13.574219 5.328125 13.296875 6 12.742188 6 L 10 6 L 10 11.25 C 10 11.664062 9.664062 12 9.25 12 Z M 16 11.75 L 16 15.25 C 16 15.664062 15.664062 16 15.25 16 L 0.75 16 C 0.335938 16 0 15.664062 0 15.25 L 0 11.75 C 0 11.335938 0.335938 11 0.75 11 L 5 11 L 5 11.25 C 5 12.214844 5.785156 13 6.75 13 L 9.25 13 C 10.214844 13 11 12.214844 11 11.25 L 11 11 L 15.25 11 C 15.664062 11 16 11.335938 16 11.75 Z M 12.125 14.5 C 12.125 14.15625 11.84375 13.875 11.5 13.875 C 11.15625 13.875 10.875 14.15625 10.875 14.5 C 10.875 14.84375 11.15625 15.125 11.5 15.125 C 11.84375 15.125 12.125 14.84375 12.125 14.5 Z M 14.125 14.5 C 14.125 14.15625 13.84375 13.875 13.5 13.875 C 13.15625 13.875 12.875 14.15625 12.875 14.5 C 12.875 14.84375 13.15625 15.125 13.5 15.125 C 13.84375 15.125 14.125 14.84375 14.125 14.5 Z M 14.125 14.5 ",
        remove: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z",
        replaceImage: "M16,5v3H4v2h12v3l4-4L16,5z M8,19v-3h12v-2H8v-3l-4,4L8,19z",
        row: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M16,6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16V6.5z M9.5,6.5h5V9h-5V6.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.5  v-2H8V17.5z M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z",
        selectAll: "M5,7h2V5C5.9,5,5,5.9,5,7z M5,11h2V9H5V11z M9,19h2v-2H9V19z M5,11h2V9H5V11z M15,5h-2v2h2V5z M17,5v2h2C19,5.9,18.1,5,17,5  z M7,19v-2H5C5,18.1,5.9,19,7,19z M5,15h2v-2H5V15z M11,5H9v2h2V5z M13,19h2v-2h-2V19z M17,11h2V9h-2V11z M17,19c1.1,0,2-0.9,2-2h-2  V19z M17,11h2V9h-2V11z M17,15h2v-2h-2V15z M13,19h2v-2h-2V19z M13,7h2V5h-2V7z M9,15h6V9H9V15z M11,11h2v2h-2V11z",
        smile: "M11.991,3A9,9,0,1,0,21,12,8.99557,8.99557,0,0,0,11.991,3ZM12,19a7,7,0,1,1,7-7A6.99808,6.99808,0,0,1,12,19Zm3.105-5.2h1.503a4.94542,4.94542,0,0,1-9.216,0H8.895a3.57808,3.57808,0,0,0,6.21,0ZM7.5,9.75A1.35,1.35,0,1,1,8.85,11.1,1.35,1.35,0,0,1,7.5,9.75Zm6.3,0a1.35,1.35,0,1,1,1.35,1.35A1.35,1.35,0,0,1,13.8,9.75Z",
        spellcheck: "M19.1,13.6l-5.6,5.6l-2.7-2.7l-1.4,1.4l4.1,4.1l7-7L19.1,13.6z M10.8,13.7l2.7,2.7l0.8-0.8L10.5,5h-2l-5,14h2l1.4-4h2.6  L10.8,13.7z M9.5,7.8l1.9,5.2H7.6L9.5,7.8z",
        star: "M12.1,7.7l1,2.5l0.4,0.9h1h2.4l-2.1,2l-0.6,0.6l0.2,0.9l0.6,2.3l-2.2-1.3L12,15.2l-0.8,0.5L9,17l0.5-2.5l0.1-0.8L9,13.1  l-2-2h2.5h0.9l0.4-0.8L12.1,7.7 M12.2,4L9.5,9.6H3.4L8,14.2L6.9,20l5.1-3.1l5.3,3.1l-1.5-5.8l4.8-4.6h-6.1L12.2,4L12.2,4z",
        strikeThrough: "M3,12.20294H21v1.5H16.63422a3.59782,3.59782,0,0,1,.34942,1.5929,3.252,3.252,0,0,1-1.31427,2.6997A5.55082,5.55082,0,0,1,12.20251,19a6.4421,6.4421,0,0,1-2.62335-.539,4.46335,4.46335,0,0,1-1.89264-1.48816,3.668,3.668,0,0,1-.67016-2.15546V14.704h.28723v-.0011h.34149v.0011H9.02v.11334a2.18275,2.18275,0,0,0,.85413,1.83069,3.69,3.69,0,0,0,2.32836.67926,3.38778,3.38778,0,0,0,2.07666-.5462,1.73346,1.73346,0,0,0,.7013-1.46655,1.69749,1.69749,0,0,0-.647-1.43439,3.00525,3.00525,0,0,0-.27491-.17725H3ZM16.34473,7.05981A4.18163,4.18163,0,0,0,14.6236,5.5462,5.627,5.627,0,0,0,12.11072,5,5.16083,5.16083,0,0,0,8.74719,6.06213,3.36315,3.36315,0,0,0,7.44006,8.76855a3.22923,3.22923,0,0,0,.3216,1.42786h2.59668c-.08338-.05365-.18537-.10577-.25269-.16064a1.60652,1.60652,0,0,1-.65283-1.30036,1.79843,1.79843,0,0,1,.68842-1.5108,3.12971,3.12971,0,0,1,1.96948-.55243,3.04779,3.04779,0,0,1,2.106.6687,2.35066,2.35066,0,0,1,.736,1.83258v.11341h2.00317V9.17346A3.90013,3.90013,0,0,0,16.34473,7.05981Z",
        subscript: "M10.4,12l3.6,3.6L12.6,17L9,13.4L5.4,17L4,15.6L7.6,12L4,8.4L5.4,7L9,10.6L12.6,7L14,8.4L10.4,12z M18.31234,19.674  l1.06812-1.1465c0.196-0.20141,0.37093-0.40739,0.5368-0.6088c0.15975-0.19418,0.30419-0.40046,0.432-0.617  c0.11969-0.20017,0.21776-0.41249,0.29255-0.6334c0.07103-0.21492,0.10703-0.43986,0.10662-0.66621  c0.00297-0.28137-0.04904-0.56062-0.1531-0.82206c-0.09855-0.24575-0.25264-0.46534-0.45022-0.6416  c-0.20984-0.18355-0.45523-0.32191-0.72089-0.40646c-0.63808-0.19005-1.3198-0.17443-1.94851,0.04465  c-0.28703,0.10845-0.54746,0.2772-0.76372,0.49487c-0.20881,0.20858-0.37069,0.45932-0.47483,0.73548  c-0.10002,0.26648-0.15276,0.54838-0.15585,0.833l-0.00364,0.237H17.617l0.00638-0.22692  c0.00158-0.12667,0.01966-0.25258,0.05377-0.37458c0.03337-0.10708,0.08655-0.20693,0.15679-0.29437  c0.07105-0.08037,0.15959-0.14335,0.25882-0.1841c0.22459-0.08899,0.47371-0.09417,0.7018-0.01458  c0.0822,0.03608,0.15559,0.08957,0.21509,0.15679c0.06076,0.07174,0.10745,0.15429,0.13761,0.24333  c0.03567,0.10824,0.05412,0.22141,0.05469,0.33538c-0.00111,0.08959-0.0118,0.17881-0.0319,0.26612  c-0.02913,0.10428-0.07076,0.20465-0.124,0.29893c-0.07733,0.13621-0.1654,0.26603-0.26338,0.38823  c-0.13438,0.17465-0.27767,0.34226-0.42929,0.50217l-2.15634,2.35315V21H21v-1.326H18.31234z",
        superscript: "M10.4,12,14,15.6,12.6,17,9,13.4,5.4,17,4,15.6,7.6,12,4,8.4,5.4,7,9,10.6,12.6,7,14,8.4Zm8.91234-3.326,1.06812-1.1465c.196-.20141.37093-.40739.5368-.6088a4.85745,4.85745,0,0,0,.432-.617,3.29,3.29,0,0,0,.29255-.6334,2.11079,2.11079,0,0,0,.10662-.66621,2.16127,2.16127,0,0,0-.1531-.82206,1.7154,1.7154,0,0,0-.45022-.6416,2.03,2.03,0,0,0-.72089-.40646,3.17085,3.17085,0,0,0-1.94851.04465,2.14555,2.14555,0,0,0-.76372.49487,2.07379,2.07379,0,0,0-.47483.73548,2.446,2.446,0,0,0-.15585.833l-.00364.237H18.617L18.62338,5.25a1.45865,1.45865,0,0,1,.05377-.37458.89552.89552,0,0,1,.15679-.29437.70083.70083,0,0,1,.25882-.1841,1.00569,1.00569,0,0,1,.7018-.01458.62014.62014,0,0,1,.21509.15679.74752.74752,0,0,1,.13761.24333,1.08893,1.08893,0,0,1,.05469.33538,1.25556,1.25556,0,0,1-.0319.26612,1.34227,1.34227,0,0,1-.124.29893,2.94367,2.94367,0,0,1-.26338.38823,6.41629,6.41629,0,0,1-.42929.50217L17.19709,8.92642V10H22V8.674Z",
        symbols: "M15.77493,16.98885a8.21343,8.21343,0,0,0,1.96753-2.57651,7.34824,7.34824,0,0,0,.6034-3.07618A6.09092,6.09092,0,0,0,11.99515,5a6.13347,6.13347,0,0,0-4.585,1.79187,6.417,6.417,0,0,0-1.756,4.69207,6.93955,6.93955,0,0,0,.622,2.97415,8.06587,8.06587,0,0,0,1.949,2.53076H5.41452V19h5.54114v-.04331h-.00147V16.84107a5.82825,5.82825,0,0,1-2.2052-2.2352A6.40513,6.40513,0,0,1,7.97672,11.447,4.68548,4.68548,0,0,1,9.07785,8.19191a3.73232,3.73232,0,0,1,2.9173-1.22462,3.76839,3.76839,0,0,1,2.91241,1.21489,4.482,4.482,0,0,1,1.11572,3.154,6.71141,6.71141,0,0,1-.75384,3.24732,5.83562,5.83562,0,0,1-2.22357,2.25759v2.11562H13.0444V19h5.54108V16.98885Z",
        tags: "M8.9749 7.47489a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 8.9749 7.47489Zm3.78866 -3.12713L16.5362 8.12041l0.33565 0.33564 2.77038 2.77038a2.01988 2.01988 0 0 1 0.59 1.42 1.95518 1.95518 0 0 1 -0.5854 1.40455l0.00044 0.00043 -5.59583 5.59583 -0.00043 -0.00044a1.95518 1.95518 0 0 1 -1.40455 0.5854 1.98762 1.98762 0 0 1 -1.41 -0.58L8.45605 16.87185l-0.33564 -0.33565L4.35777 12.77357a1.99576 1.99576 0 0 1 -0.59 -1.42V9.36358l0 -3.59582a2.00579 2.00579 0 0 1 2 -2l3.59582 0h1.98995A1.98762 1.98762 0 0 1 12.76356 4.34776ZM15.46186 9.866l-0.33564 -0.33564L11.36359 5.76776H5.76776v5.59583L9.866 15.46186l2.7794 2.7794 5.5878 -5.60385 -0.001 -0.001Z",
        tableHeader: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  l0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M14.5,17.5h-5V15h5V17.5z M14.5,13.5h-5v-3h5V13.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5l0,0  H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9h-4.4H16h-1.5h-5H8H7.9H3.5V7c0-0.3,0.2-0.5,0.4-0.5l0,0h4l0,0h8.2l0,0H20  c0.3,0,0.5,0.2,0.5,0.4l0,0V9z",
        tableStyle: "M20.0171,19.89752l.9,3.6-3.2-1.9-3.3,1.9.8-3.6-2.9-2.9h3.8l1.7-3.5,1.4,3.5h3.8ZM20,5H4A2.00591,2.00591,0,0,0,2,7V17a2.00591,2.00591,0,0,0,2,2h7.49115l-.58826-.58826L9.99115,17.5H9.5V14.9975h5.36511L16,12.66089V10.5h4.5v3h-.52783l.599,1.4975H22V7A2.00591,2.00591,0,0,0,20,5ZM3.5,7A.4724.4724,0,0,1,4,6.5H8V9H3.5Zm0,3.5H8v3H3.5Zm.5,7a.4724.4724,0,0,1-.5-.5V15H8v2.5Zm10.5-4h-5v-3h5Zm0-4.5h-5V6.5h5Zm6,0H16V6.5h4a.4724.4724,0,0,1,.5.5Z",
        textColor: "M15.2,13.494s-3.6,3.9-3.6,6.3a3.65,3.65,0,0,0,7.3.1v-.1C18.9,17.394,15.2,13.494,15.2,13.494Zm-1.47-1.357.669-.724L12.1,5h-2l-5,14h2l1.43-4h2.943A24.426,24.426,0,0,1,13.726,12.137ZM11.1,7.8l1.86,5.2H9.244Z",
        textMore: "M13.55,19h2l-5-14h-2l-5,14h2l1.4-4h5.1Zm-5.9-6,1.9-5.2,1.9,5.2Zm12.8,4.5a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,17.5Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,13.5Zm0-4A1.5,1.5,0,1,1,18.95,8,1.5,1.5,0,0,1,20.45,9.5Z",
        underline: "M19,20v2H5V20Zm-3-6.785a4,4,0,0,1-5.74,3.4A3.75,3.75,0,0,1,8,13.085V5.005H6v8.21a6,6,0,0,0,8,5.44,5.851,5.851,0,0,0,4-5.65v-8H16ZM16,5v0h2V5ZM8,5H6v0H8Z",
        undo: "M10.4,9.4c-1.7,0.3-3.2,0.9-4.6,2L3,8.5v7h7l-2.7-2.7c3.7-2.6,8.8-1.8,11.5,1.9c0.2,0.3,0.4,0.5,0.5,0.8l1.8-0.9  C18.9,10.8,14.7,8.7,10.4,9.4z",
        unlink: "M14.4,11l1.6,1.6V11H14.4z M17,7h-4v1.9h4c1.7,0,3.1,1.4,3.1,3.1c0,1.3-0.8,2.4-1.9,2.8l1.4,1.4C21,15.4,22,13.8,22,12  C22,9.2,19.8,7,17,7z M2,4.3l3.1,3.1C3.3,8.1,2,9.9,2,12c0,2.8,2.2,5,5,5h4v-1.9H7c-1.7,0-3.1-1.4-3.1-3.1c0-1.6,1.2-2.9,2.8-3.1  L8.7,11H8v2h2.7l2.3,2.3V17h1.7l4,4l1.4-1.4L3.4,2.9L2,4.3z",
        unorderedList: "M4,10.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,10.5,4,10.5z M4,5.5C3.2,5.5,2.5,6.2,2.5,7  S3.2,8.5,4,8.5S5.5,7.8,5.5,7S4.8,5.5,4,5.5z M4,15.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,15.5,4,15.5z   M7.5,6v2h14V6H7.5z M7.5,18h14v-2h-14V18z M7.5,13h14v-2h-14V13z",
        verticalAlignBottom: "M16,13h-3V3h-2v10H8l4,4L16,13z M3,19v2h18v-2H3z",
        verticalAlignMiddle: "M3,11v2h18v-2H3z M8,18h3v3h2v-3h3l-4-4L8,18z M16,6h-3V3h-2v3H8l4,4L16,6z",
        verticalAlignTop: "M8,11h3v10h2V11h3l-4-4L8,11z M21,5V3H3v2H21z"
    };
    data.FILEICONS = {
        docIcon: {
            extension: ".doc",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.617188 46.875 C 13.234375 46.875 16.160156 43.929688 16.160156 40.292969 C 16.160156 36.695312 13.234375 33.75 9.617188 33.75 L 7.402344 33.75 C 6.820312 33.75 6.371094 34.199219 6.371094 34.78125 L 6.371094 45.84375 C 6.371094 46.335938 6.714844 46.757812 7.191406 46.855469 L 7.402344 46.875 Z M 9.617188 44.792969 L 8.453125 44.792969 L 8.453125 35.832031 L 9.617188 35.832031 C 12.089844 35.832031 14.078125 37.835938 14.078125 40.292969 C 14.078125 42.789062 12.089844 44.773438 9.617188 44.792969 Z M 24.816406 46.875 C 26.539062 46.875 28.191406 46.085938 29.296875 44.867188 C 30.460938 43.648438 31.191406 41.980469 31.191406 40.125 C 31.191406 38.269531 30.460938 36.617188 29.296875 35.382812 C 28.191406 34.144531 26.539062 33.375 24.816406 33.375 C 23.015625 33.375 21.367188 34.144531 20.222656 35.382812 C 19.058594 36.617188 18.367188 38.269531 18.367188 40.125 C 18.367188 41.980469 19.058594 43.648438 20.222656 44.867188 C 21.367188 46.085938 23.015625 46.875 24.816406 46.875 Z M 24.816406 44.738281 C 23.617188 44.738281 22.566406 44.230469 21.777344 43.386719 C 20.992188 42.582031 20.503906 41.398438 20.503906 40.125 C 20.503906 38.851562 20.992188 37.667969 21.777344 36.84375 C 22.566406 36 23.617188 35.511719 24.816406 35.511719 C 25.941406 35.511719 26.992188 36 27.777344 36.84375 C 28.546875 37.667969 29.054688 38.851562 29.054688 40.125 C 29.054688 41.398438 28.546875 42.582031 27.777344 43.386719 C 26.992188 44.230469 25.941406 44.738281 24.816406 44.738281 Z M 39.996094 46.875 C 41.648438 46.875 43.148438 46.332031 44.328125 45.414062 C 44.777344 45.054688 44.851562 44.382812 44.515625 43.914062 C 44.140625 43.460938 43.445312 43.386719 43.015625 43.707031 C 42.171875 44.382812 41.160156 44.738281 39.996094 44.738281 C 38.703125 44.738281 37.503906 44.210938 36.621094 43.386719 C 35.777344 42.5625 35.253906 41.398438 35.253906 40.125 C 35.253906 38.851562 35.777344 37.726562 36.621094 36.863281 C 37.503906 36.039062 38.703125 35.511719 39.996094 35.511719 C 41.160156 35.511719 42.191406 35.867188 43.015625 36.542969 C 43.445312 36.882812 44.140625 36.804688 44.515625 36.335938 C 44.851562 35.867188 44.777344 35.210938 44.328125 34.835938 C 43.148438 33.917969 41.648438 33.375 39.996094 33.375 C 36.246094 33.394531 33.132812 36.414062 33.117188 40.125 C 33.132812 43.855469 36.246094 46.875 39.996094 46.875 Z M 39.996094 46.875 "/>\n      </g>'
        },
        gifIcon: {
            extension: ".gif",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 17.394531 46.875 C 18.988281 46.875 20.46875 46.332031 21.648438 45.414062 C 21.835938 45.28125 21.949219 45.132812 22.003906 44.960938 L 22.003906 44.945312 C 22.023438 44.90625 22.023438 44.886719 22.042969 44.851562 C 22.0625 44.738281 22.097656 44.664062 22.097656 44.53125 L 22.097656 40.386719 C 22.097656 39.789062 21.613281 39.335938 21.011719 39.335938 L 17.28125 39.335938 C 16.699219 39.335938 16.210938 39.789062 16.210938 40.386719 C 16.210938 40.96875 16.699219 41.457031 17.28125 41.457031 L 19.960938 41.457031 L 19.960938 44.023438 C 19.210938 44.457031 18.332031 44.738281 17.394531 44.738281 C 16.042969 44.738281 14.863281 44.230469 14.019531 43.367188 C 13.136719 42.523438 12.613281 41.382812 12.613281 40.144531 C 12.613281 38.867188 13.136719 37.726562 14.019531 36.882812 C 14.863281 36.019531 16.042969 35.511719 17.394531 35.511719 C 18.519531 35.511719 19.550781 35.90625 20.355469 36.523438 C 20.824219 36.898438 21.519531 36.804688 21.875 36.355469 C 22.230469 35.886719 22.15625 35.195312 21.667969 34.835938 C 20.503906 33.917969 18.988281 33.375 17.394531 33.375 C 13.585938 33.375 10.472656 36.375 10.472656 40.144531 C 10.472656 43.894531 13.585938 46.875 17.394531 46.875 Z M 26.945312 46.875 C 27.507812 46.875 27.996094 46.425781 27.996094 45.84375 L 27.996094 34.78125 C 27.996094 34.199219 27.507812 33.75 26.945312 33.75 C 26.363281 33.75 25.914062 34.199219 25.914062 34.78125 L 25.914062 45.84375 C 25.914062 46.425781 26.363281 46.875 26.945312 46.875 Z M 33.066406 46.875 C 33.648438 46.875 34.117188 46.40625 34.117188 45.84375 L 34.117188 41.34375 L 38.488281 41.34375 C 39.050781 41.34375 39.519531 40.875 39.519531 40.292969 C 39.519531 39.75 39.050781 39.261719 38.488281 39.261719 L 34.117188 39.261719 L 34.117188 35.832031 L 39.199219 35.832031 C 39.742188 35.832031 40.230469 35.363281 40.230469 34.78125 C 40.230469 34.21875 39.742188 33.75 39.199219 33.75 L 33.066406 33.75 C 32.488281 33.75 32.035156 34.21875 32.035156 34.78125 L 32.035156 45.84375 C 32.035156 46.40625 32.488281 46.875 33.066406 46.875 Z M 33.066406 46.875 "/>\n      </g>'
        },
        jpegIcon: {
            extension: ".jpeg",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9 43.75 C 11.140625 43.75 12.890625 42.015625 12.890625 39.875 L 12.890625 33.671875 C 12.890625 33.1875 12.5 32.8125 12.03125 32.8125 C 11.546875 32.8125 11.15625 33.1875 11.15625 33.671875 L 11.15625 39.875 C 11.15625 41.046875 10.1875 42.015625 9 42.015625 C 8.046875 42.015625 7.234375 41.390625 6.953125 40.53125 C 6.8125 40.078125 6.328125 39.828125 5.859375 39.984375 C 5.421875 40.109375 5.15625 40.59375 5.3125 41.0625 C 5.8125 42.625 7.28125 43.75 9 43.75 Z M 15.640625 43.75 C 16.125 43.75 16.515625 43.359375 16.515625 42.890625 L 16.515625 39.5 L 18.4375 39.5 C 20.296875 39.5 21.796875 38 21.796875 36.171875 C 21.796875 34.3125 20.296875 32.8125 18.4375 32.8125 L 15.640625 32.8125 C 15.171875 32.8125 14.78125 33.1875 14.78125 33.671875 L 14.78125 42.890625 C 14.78125 43.359375 15.171875 43.75 15.640625 43.75 Z M 18.4375 37.765625 L 16.515625 37.765625 L 16.515625 34.546875 L 18.4375 34.546875 C 19.34375 34.546875 20.046875 35.265625 20.0625 36.171875 C 20.046875 37.046875 19.34375 37.765625 18.4375 37.765625 Z M 29.234375 43.75 C 29.6875 43.75 30.09375 43.359375 30.09375 42.890625 C 30.09375 42.40625 29.6875 42.015625 29.234375 42.015625 L 25 42.015625 L 25 39.140625 L 28.640625 39.140625 C 29.109375 39.140625 29.5 38.75 29.5 38.265625 C 29.5 37.8125 29.109375 37.40625 28.640625 37.40625 L 25 37.40625 L 25 34.546875 L 29.234375 34.546875 C 29.6875 34.546875 30.09375 34.15625 30.09375 33.671875 C 30.09375 33.1875 29.6875 32.8125 29.234375 32.8125 L 24.125 32.8125 C 23.640625 32.8125 23.265625 33.1875 23.265625 33.671875 L 23.265625 42.890625 C 23.265625 43.359375 23.640625 43.75 24.125 43.75 C 24.125 43.75 24.140625 43.734375 24.140625 43.734375 C 24.140625 43.734375 24.140625 43.75 24.171875 43.75 Z M 37.1875 43.75 C 38.515625 43.75 39.75 43.296875 40.734375 42.53125 C 40.890625 42.421875 40.984375 42.296875 41.03125 42.15625 L 41.03125 42.140625 C 41.046875 42.109375 41.046875 42.09375 41.0625 42.0625 C 41.078125 41.96875 41.109375 41.90625 41.109375 41.796875 L 41.109375 38.34375 C 41.109375 37.914062 40.8125 37.578125 40.410156 37.492188 L 40.203125 37.46875 L 37.09375 37.46875 C 36.609375 37.46875 36.203125 37.84375 36.203125 38.34375 C 36.203125 38.828125 36.609375 39.234375 37.09375 39.234375 L 39.328125 39.234375 L 39.328125 41.375 C 38.703125 41.734375 37.96875 41.96875 37.1875 41.96875 C 36.0625 41.96875 35.078125 41.546875 34.375 40.828125 C 33.640625 40.125 33.203125 39.171875 33.203125 38.140625 C 33.203125 37.078125 33.640625 36.125 34.375 35.421875 C 35.078125 34.703125 36.0625 34.28125 37.1875 34.28125 C 38.125 34.28125 38.984375 34.609375 39.65625 35.125 C 40.046875 35.4375 40.625 35.359375 40.921875 34.984375 C 41.21875 34.59375 41.15625 34.015625 40.75 33.71875 C 39.78125 32.953125 38.515625 32.5 37.1875 32.5 C 34.015625 32.5 31.421875 35 31.421875 38.140625 C 31.421875 41.265625 34.015625 43.75 37.1875 43.75 Z M 37.1875 43.75 "/>\n      </g>'
        },
        logIcon: {
            extension: ".log",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 13.542969 46.875 C 14.085938 46.875 14.574219 46.40625 14.574219 45.84375 C 14.574219 45.261719 14.085938 44.792969 13.542969 44.792969 L 8.460938 44.792969 L 8.460938 34.78125 C 8.460938 34.21875 7.992188 33.75 7.410156 33.75 C 6.828125 33.75 6.378906 34.21875 6.378906 34.78125 L 6.378906 45.84375 C 6.378906 46.40625 6.828125 46.875 7.410156 46.875 Z M 21.742188 46.875 C 23.46875 46.875 25.117188 46.085938 26.222656 44.867188 C 27.386719 43.648438 28.117188 41.980469 28.117188 40.125 C 28.117188 38.269531 27.386719 36.617188 26.222656 35.382812 C 25.117188 34.144531 23.46875 33.375 21.742188 33.375 C 19.941406 33.375 18.292969 34.144531 17.148438 35.382812 C 15.984375 36.617188 15.292969 38.269531 15.292969 40.125 C 15.292969 41.980469 15.984375 43.648438 17.148438 44.867188 C 18.292969 46.085938 19.941406 46.875 21.742188 46.875 Z M 21.742188 44.738281 C 20.542969 44.738281 19.492188 44.230469 18.703125 43.386719 C 17.917969 42.582031 17.429688 41.398438 17.429688 40.125 C 17.429688 38.851562 17.917969 37.667969 18.703125 36.84375 C 19.492188 36 20.542969 35.511719 21.742188 35.511719 C 22.867188 35.511719 23.917969 36 24.703125 36.84375 C 25.472656 37.667969 25.980469 38.851562 25.980469 40.125 C 25.980469 41.398438 25.472656 42.582031 24.703125 43.386719 C 23.917969 44.230469 22.867188 44.738281 21.742188 44.738281 Z M 37.300781 46.875 C 38.894531 46.875 40.375 46.332031 41.558594 45.414062 C 41.746094 45.28125 41.855469 45.132812 41.914062 44.960938 L 41.914062 44.945312 L 41.949219 44.851562 C 41.96875 44.738281 42.007812 44.664062 42.007812 44.53125 L 42.007812 40.386719 C 42.007812 39.789062 41.519531 39.335938 40.917969 39.335938 L 37.1875 39.335938 C 36.605469 39.335938 36.121094 39.789062 36.121094 40.386719 C 36.121094 40.96875 36.605469 41.457031 37.1875 41.457031 L 39.871094 41.457031 L 39.871094 44.023438 C 39.121094 44.457031 38.238281 44.738281 37.300781 44.738281 C 35.949219 44.738281 34.769531 44.230469 33.925781 43.367188 C 33.042969 42.523438 32.519531 41.382812 32.519531 40.144531 C 32.519531 38.867188 33.042969 37.726562 33.925781 36.882812 C 34.769531 36.019531 35.949219 35.511719 37.300781 35.511719 C 38.425781 35.511719 39.457031 35.90625 40.261719 36.523438 C 40.730469 36.898438 41.425781 36.804688 41.78125 36.355469 C 42.136719 35.886719 42.0625 35.195312 41.574219 34.835938 C 40.414062 33.917969 38.894531 33.375 37.300781 33.375 C 33.496094 33.375 30.382812 36.375 30.382812 40.144531 C 30.382812 43.894531 33.496094 46.875 37.300781 46.875 Z M 37.300781 46.875 "/>\n      </g>'
        },
        movIcon: {
            extension: ".mov",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 15.472656 46.875 C 16.035156 46.875 16.523438 46.40625 16.523438 45.84375 L 16.523438 34.78125 C 16.523438 34.289062 16.152344 33.882812 15.679688 33.777344 L 15.472656 33.75 L 15.453125 33.75 C 15.117188 33.75 14.816406 33.898438 14.609375 34.179688 L 10.878906 39.355469 L 7.148438 34.179688 C 6.960938 33.898438 6.625 33.75 6.324219 33.75 L 6.265625 33.75 C 5.703125 33.75 5.234375 34.21875 5.234375 34.78125 L 5.234375 45.84375 C 5.234375 46.40625 5.703125 46.875 6.265625 46.875 C 6.847656 46.875 7.316406 46.40625 7.316406 45.84375 L 7.316406 37.949219 L 10 41.699219 C 10.203125 41.980469 10.523438 42.132812 10.859375 42.132812 L 10.898438 42.132812 C 11.234375 42.132812 11.535156 41.980469 11.742188 41.699219 L 14.441406 37.949219 L 14.441406 45.84375 C 14.441406 46.40625 14.890625 46.875 15.472656 46.875 Z M 25.460938 46.875 C 27.1875 46.875 28.835938 46.085938 29.941406 44.867188 C 31.105469 43.648438 31.835938 41.980469 31.835938 40.125 C 31.835938 38.269531 31.105469 36.617188 29.941406 35.382812 C 28.835938 34.144531 27.1875 33.375 25.460938 33.375 C 23.660156 33.375 22.011719 34.144531 20.867188 35.382812 C 19.703125 36.617188 19.011719 38.269531 19.011719 40.125 C 19.011719 41.980469 19.703125 43.648438 20.867188 44.867188 C 22.011719 46.085938 23.660156 46.875 25.460938 46.875 Z M 25.460938 44.738281 C 24.261719 44.738281 23.210938 44.230469 22.421875 43.386719 C 21.636719 42.582031 21.148438 41.398438 21.148438 40.125 C 21.148438 38.851562 21.636719 37.667969 22.421875 36.84375 C 23.210938 36 24.261719 35.511719 25.460938 35.511719 C 26.585938 35.511719 27.636719 36 28.421875 36.84375 C 29.191406 37.667969 29.699219 38.851562 29.699219 40.125 C 29.699219 41.398438 29.191406 42.582031 28.421875 43.386719 C 27.636719 44.230469 26.585938 44.738281 25.460938 44.738281 Z M 38.683594 46.855469 L 38.71875 46.855469 C 38.777344 46.835938 38.8125 46.820312 38.871094 46.820312 C 38.886719 46.800781 38.886719 46.800781 38.90625 46.800781 C 38.964844 46.78125 39.019531 46.726562 39.058594 46.707031 L 39.09375 46.6875 L 39.207031 46.59375 C 39.226562 46.574219 39.226562 46.574219 39.246094 46.539062 L 39.339844 46.425781 C 39.355469 46.425781 39.355469 46.425781 39.355469 46.40625 C 39.394531 46.367188 39.414062 46.292969 39.433594 46.257812 L 44.0625 35.304688 C 44.269531 34.800781 44.027344 34.179688 43.5 33.976562 C 42.996094 33.75 42.375 33.992188 42.152344 34.519531 L 38.496094 43.199219 L 34.839844 34.519531 C 34.613281 33.992188 34.011719 33.75 33.507812 33.976562 C 32.964844 34.179688 32.71875 34.800781 32.945312 35.304688 L 37.539062 46.257812 C 37.574219 46.292969 37.613281 46.367188 37.632812 46.40625 C 37.632812 46.425781 37.652344 46.425781 37.652344 46.425781 C 37.667969 46.460938 37.707031 46.5 37.746094 46.539062 C 37.746094 46.574219 37.761719 46.574219 37.761719 46.59375 C 37.820312 46.632812 37.855469 46.648438 37.894531 46.6875 L 37.914062 46.6875 C 37.96875 46.726562 38.042969 46.78125 38.082031 46.800781 L 38.101562 46.800781 C 38.101562 46.800781 38.121094 46.800781 38.121094 46.820312 C 38.15625 46.820312 38.230469 46.835938 38.269531 46.855469 L 38.308594 46.855469 L 38.402344 46.871094 L 38.496094 46.875 C 38.550781 46.875 38.605469 46.875 38.683594 46.855469 Z M 38.683594 46.855469 "/>\n      </g>'
        },
        ogvIcon: {
            extension: ".ogv",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 11.511719 46.875 C 13.238281 46.875 14.886719 46.085938 15.996094 44.867188 C 17.15625 43.648438 17.886719 41.980469 17.886719 40.125 C 17.886719 38.269531 17.15625 36.617188 15.996094 35.382812 C 14.886719 34.144531 13.238281 33.375 11.511719 33.375 C 9.714844 33.375 8.0625 34.144531 6.917969 35.382812 C 5.757812 36.617188 5.0625 38.269531 5.0625 40.125 C 5.0625 41.980469 5.757812 43.648438 6.917969 44.867188 C 8.0625 46.085938 9.714844 46.875 11.511719 46.875 Z M 11.511719 44.738281 C 10.3125 44.738281 9.261719 44.230469 8.476562 43.386719 C 7.6875 42.582031 7.199219 41.398438 7.199219 40.125 C 7.199219 38.851562 7.6875 37.667969 8.476562 36.84375 C 9.261719 36 10.3125 35.511719 11.511719 35.511719 C 12.636719 35.511719 13.6875 36 14.476562 36.84375 C 15.246094 37.667969 15.75 38.851562 15.75 40.125 C 15.75 41.398438 15.246094 42.582031 14.476562 43.386719 C 13.6875 44.230469 12.636719 44.738281 11.511719 44.738281 Z M 27.25 46.875 C 28.84375 46.875 30.324219 46.332031 31.507812 45.414062 C 31.695312 45.28125 31.804688 45.132812 31.863281 44.960938 L 31.863281 44.945312 C 31.882812 44.90625 31.882812 44.886719 31.898438 44.851562 C 31.917969 44.738281 31.957031 44.664062 31.957031 44.53125 L 31.957031 40.386719 C 31.957031 39.789062 31.46875 39.335938 30.867188 39.335938 L 27.136719 39.335938 C 26.554688 39.335938 26.070312 39.789062 26.070312 40.386719 C 26.070312 40.96875 26.554688 41.457031 27.136719 41.457031 L 29.820312 41.457031 L 29.820312 44.023438 C 29.070312 44.457031 28.1875 44.738281 27.25 44.738281 C 25.898438 44.738281 24.71875 44.230469 23.875 43.367188 C 22.992188 42.523438 22.46875 41.382812 22.46875 40.144531 C 22.46875 38.867188 22.992188 37.726562 23.875 36.882812 C 24.71875 36.019531 25.898438 35.511719 27.25 35.511719 C 28.375 35.511719 29.40625 35.90625 30.210938 36.523438 C 30.679688 36.898438 31.375 36.804688 31.730469 36.355469 C 32.085938 35.886719 32.011719 35.195312 31.523438 34.835938 C 30.363281 33.917969 28.84375 33.375 27.25 33.375 C 23.445312 33.375 20.332031 36.375 20.332031 40.144531 C 20.332031 43.894531 23.445312 46.875 27.25 46.875 Z M 40.191406 46.855469 L 40.230469 46.855469 C 40.285156 46.835938 40.324219 46.820312 40.378906 46.820312 C 40.398438 46.800781 40.398438 46.800781 40.417969 46.800781 C 40.472656 46.78125 40.53125 46.726562 40.566406 46.707031 C 40.605469 46.6875 40.605469 46.6875 40.605469 46.6875 L 40.71875 46.59375 C 40.738281 46.574219 40.738281 46.574219 40.753906 46.539062 L 40.847656 46.425781 C 40.867188 46.425781 40.867188 46.425781 40.867188 46.40625 C 40.90625 46.367188 40.925781 46.292969 40.941406 46.257812 L 45.574219 35.304688 C 45.78125 34.800781 45.535156 34.179688 45.011719 33.976562 C 44.503906 33.75 43.886719 33.992188 43.660156 34.519531 L 40.003906 43.199219 L 36.347656 34.519531 C 36.125 33.992188 35.523438 33.75 35.019531 33.976562 C 34.472656 34.179688 34.230469 34.800781 34.457031 35.304688 L 39.050781 46.257812 C 39.085938 46.292969 39.125 46.367188 39.144531 46.40625 C 39.144531 46.425781 39.160156 46.425781 39.160156 46.425781 C 39.179688 46.460938 39.21875 46.5 39.253906 46.539062 C 39.253906 46.574219 39.273438 46.574219 39.273438 46.59375 C 39.332031 46.632812 39.367188 46.648438 39.40625 46.6875 L 39.425781 46.6875 C 39.480469 46.726562 39.554688 46.78125 39.59375 46.800781 L 39.613281 46.800781 C 39.613281 46.800781 39.628906 46.800781 39.628906 46.820312 C 39.667969 46.820312 39.742188 46.835938 39.78125 46.855469 L 39.816406 46.855469 L 39.910156 46.871094 L 40.003906 46.875 C 40.0625 46.875 40.117188 46.875 40.191406 46.855469 Z M 40.191406 46.855469 "/>\n      </g>'
        },
        pngIcon: {
            extension: ".png",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 7.523438 46.875 C 8.105469 46.875 8.574219 46.40625 8.574219 45.84375 L 8.574219 41.773438 L 10.878906 41.773438 C 13.109375 41.773438 14.910156 39.976562 14.910156 37.78125 C 14.910156 35.550781 13.109375 33.75 10.878906 33.75 L 7.523438 33.75 C 6.960938 33.75 6.492188 34.199219 6.492188 34.78125 L 6.492188 45.84375 C 6.492188 46.40625 6.960938 46.875 7.523438 46.875 Z M 10.878906 39.695312 L 8.574219 39.695312 L 8.574219 35.832031 L 10.878906 35.832031 C 11.964844 35.832031 12.808594 36.695312 12.828125 37.78125 C 12.808594 38.832031 11.964844 39.695312 10.878906 39.695312 Z M 26.75 46.875 C 27.3125 46.875 27.78125 46.40625 27.78125 45.84375 L 27.78125 34.949219 C 27.78125 34.40625 27.3125 33.9375 26.75 33.9375 C 26.1875 33.9375 25.738281 34.40625 25.738281 34.949219 L 25.738281 42.675781 L 19.679688 34.292969 C 19.363281 33.84375 18.722656 33.75 18.253906 34.070312 C 17.972656 34.273438 17.824219 34.613281 17.84375 34.929688 L 17.84375 45.84375 C 17.84375 46.40625 18.292969 46.875 18.875 46.875 C 19.417969 46.875 19.886719 46.40625 19.886719 45.84375 L 19.886719 38.0625 L 25.886719 46.386719 C 25.90625 46.425781 25.941406 46.460938 25.980469 46.5 C 26.167969 46.726562 26.449219 46.875 26.75 46.875 Z M 38.082031 46.875 C 39.675781 46.875 41.15625 46.332031 42.339844 45.414062 C 42.527344 45.28125 42.636719 45.132812 42.695312 44.960938 L 42.695312 44.945312 C 42.714844 44.90625 42.714844 44.886719 42.730469 44.851562 C 42.75 44.738281 42.789062 44.664062 42.789062 44.53125 L 42.789062 40.386719 C 42.789062 39.789062 42.300781 39.335938 41.699219 39.335938 L 37.96875 39.335938 C 37.386719 39.335938 36.902344 39.789062 36.902344 40.386719 C 36.902344 40.96875 37.386719 41.457031 37.96875 41.457031 L 40.652344 41.457031 L 40.652344 44.023438 C 39.902344 44.457031 39.019531 44.738281 38.082031 44.738281 C 36.730469 44.738281 35.550781 44.230469 34.707031 43.367188 C 33.824219 42.523438 33.300781 41.382812 33.300781 40.144531 C 33.300781 38.867188 33.824219 37.726562 34.707031 36.882812 C 35.550781 36.019531 36.730469 35.511719 38.082031 35.511719 C 39.207031 35.511719 40.238281 35.90625 41.042969 36.523438 C 41.511719 36.898438 42.207031 36.804688 42.5625 36.355469 C 42.917969 35.886719 42.84375 35.195312 42.355469 34.835938 C 41.195312 33.917969 39.675781 33.375 38.082031 33.375 C 34.277344 33.375 31.164062 36.375 31.164062 40.144531 C 31.164062 43.894531 34.277344 46.875 38.082031 46.875 Z M 38.082031 46.875 "/>\n      </g>'
        },
        txtIcon: {
            extension: ".txt",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 12.847656 46.875 C 13.429688 46.875 13.878906 46.425781 13.878906 45.84375 L 13.878906 35.832031 L 16.859375 35.832031 C 17.421875 35.832031 17.890625 35.34375 17.890625 34.78125 C 17.890625 34.199219 17.421875 33.75 16.859375 33.75 L 8.855469 33.75 C 8.273438 33.75 7.824219 34.199219 7.824219 34.78125 C 7.824219 35.34375 8.273438 35.832031 8.855469 35.832031 L 11.816406 35.832031 L 11.816406 45.84375 C 11.816406 46.425781 12.285156 46.875 12.847656 46.875 Z M 29.019531 46.875 C 29.222656 46.875 29.429688 46.800781 29.617188 46.667969 C 30.085938 46.351562 30.160156 45.695312 29.84375 45.242188 L 26.28125 40.367188 L 29.84375 35.53125 C 30.160156 35.0625 30.085938 34.425781 29.617188 34.105469 C 29.148438 33.75 28.53125 33.84375 28.175781 34.332031 L 25.023438 38.644531 L 21.855469 34.332031 C 21.535156 33.84375 20.878906 33.75 20.429688 34.105469 C 19.960938 34.425781 19.867188 35.0625 20.1875 35.53125 L 23.75 40.367188 L 20.1875 45.242188 C 19.867188 45.695312 19.960938 46.351562 20.429688 46.667969 C 20.597656 46.800781 20.804688 46.875 21.03125 46.875 C 21.347656 46.875 21.648438 46.707031 21.855469 46.445312 L 25.023438 42.113281 L 28.175781 46.445312 C 28.378906 46.707031 28.679688 46.875 29.019531 46.875 Z M 37.464844 46.875 C 38.042969 46.875 38.496094 46.425781 38.496094 45.84375 L 38.496094 35.832031 L 41.476562 35.832031 C 42.039062 35.832031 42.507812 35.34375 42.507812 34.78125 C 42.507812 34.199219 42.039062 33.75 41.476562 33.75 L 33.46875 33.75 C 32.886719 33.75 32.4375 34.199219 32.4375 34.78125 C 32.4375 35.34375 32.886719 35.832031 33.46875 35.832031 L 36.433594 35.832031 L 36.433594 45.84375 C 36.433594 46.425781 36.902344 46.875 37.464844 46.875 Z M 37.464844 46.875 "/>\n      </g>'
        },
        webmIcon: {
            extension: ".webm",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 7.195312 43.734375 L 7.242188 43.734375 C 7.273438 43.71875 7.304688 43.703125 7.367188 43.703125 C 7.367188 43.6875 7.382812 43.6875 7.382812 43.6875 L 7.398438 43.6875 C 7.429688 43.671875 7.476562 43.625 7.523438 43.59375 L 7.554688 43.59375 C 7.585938 43.5625 7.617188 43.53125 7.648438 43.515625 C 7.648438 43.5 7.664062 43.5 7.664062 43.46875 L 7.757812 43.375 C 7.757812 43.375 7.757812 43.359375 7.773438 43.359375 C 7.789062 43.328125 7.820312 43.265625 7.835938 43.21875 L 9.882812 38.375 L 11.929688 43.21875 C 11.945312 43.265625 11.960938 43.328125 11.992188 43.359375 C 11.992188 43.359375 11.992188 43.375 12.023438 43.375 L 12.085938 43.46875 C 12.101562 43.5 12.101562 43.5 12.117188 43.515625 C 12.148438 43.53125 12.179688 43.5625 12.226562 43.59375 L 12.242188 43.59375 C 12.273438 43.625 12.320312 43.671875 12.382812 43.6875 C 12.398438 43.6875 12.398438 43.6875 12.414062 43.703125 C 12.445312 43.703125 12.476562 43.71875 12.523438 43.734375 L 12.570312 43.734375 L 12.640625 43.746094 L 12.710938 43.75 C 12.773438 43.75 12.820312 43.75 12.867188 43.734375 L 12.898438 43.734375 C 12.945312 43.71875 12.992188 43.703125 13.023438 43.703125 C 13.023438 43.6875 13.039062 43.6875 13.039062 43.6875 L 13.054688 43.6875 C 13.117188 43.671875 13.148438 43.625 13.195312 43.59375 L 13.210938 43.59375 C 13.242188 43.5625 13.289062 43.53125 13.320312 43.515625 C 13.320312 43.5 13.335938 43.5 13.335938 43.46875 C 13.367188 43.4375 13.398438 43.40625 13.414062 43.375 C 13.414062 43.375 13.429688 43.359375 13.429688 43.359375 C 13.460938 43.328125 13.492188 43.265625 13.507812 43.21875 L 17.335938 34.109375 C 17.523438 33.6875 17.320312 33.171875 16.898438 33 C 16.445312 32.8125 15.945312 33.015625 15.757812 33.453125 L 12.710938 40.6875 L 10.695312 35.890625 C 10.539062 35.546875 10.210938 35.359375 9.882812 35.359375 C 9.539062 35.359375 9.210938 35.546875 9.070312 35.890625 L 7.054688 40.6875 L 3.992188 33.453125 C 3.820312 33.015625 3.304688 32.8125 2.882812 33 C 2.429688 33.171875 2.242188 33.6875 2.414062 34.109375 L 6.257812 43.21875 C 6.289062 43.265625 6.304688 43.328125 6.335938 43.359375 L 6.335938 43.375 C 6.367188 43.40625 6.382812 43.4375 6.414062 43.46875 C 6.429688 43.5 6.429688 43.5 6.445312 43.515625 C 6.492188 43.53125 6.507812 43.5625 6.554688 43.59375 L 6.570312 43.59375 C 6.601562 43.625 6.664062 43.671875 6.710938 43.6875 C 6.726562 43.6875 6.726562 43.6875 6.742188 43.703125 C 6.773438 43.703125 6.804688 43.71875 6.851562 43.734375 L 6.898438 43.734375 L 6.976562 43.746094 L 7.054688 43.75 C 7.101562 43.75 7.148438 43.75 7.195312 43.734375 Z M 25.179688 43.75 C 25.632812 43.75 26.039062 43.359375 26.039062 42.890625 C 26.039062 42.40625 25.632812 42.015625 25.179688 42.015625 L 20.945312 42.015625 L 20.945312 39.140625 L 24.585938 39.140625 C 25.054688 39.140625 25.445312 38.75 25.445312 38.265625 C 25.445312 37.8125 25.054688 37.40625 24.585938 37.40625 L 20.945312 37.40625 L 20.945312 34.546875 L 25.179688 34.546875 C 25.632812 34.546875 26.039062 34.15625 26.039062 33.671875 C 26.039062 33.1875 25.632812 32.8125 25.179688 32.8125 L 20.070312 32.8125 C 19.585938 32.8125 19.210938 33.1875 19.210938 33.671875 L 19.210938 42.890625 C 19.210938 43.359375 19.585938 43.75 20.070312 43.75 C 20.070312 43.75 20.085938 43.734375 20.085938 43.734375 C 20.085938 43.734375 20.085938 43.75 20.117188 43.75 Z M 31.539062 43.75 C 33.382812 43.75 34.882812 42.25 34.882812 40.390625 C 34.882812 39.203125 34.242188 38.15625 33.304688 37.5625 C 33.679688 37.0625 33.898438 36.453125 33.898438 35.78125 C 33.898438 34.140625 32.570312 32.8125 30.929688 32.8125 L 28.710938 32.8125 C 28.242188 32.8125 27.851562 33.1875 27.851562 33.671875 L 27.851562 42.890625 C 27.851562 43.359375 28.242188 43.75 28.710938 43.75 L 28.757812 43.734375 C 28.757812 43.734375 28.757812 43.75 28.773438 43.75 Z M 30.929688 37.046875 L 29.585938 37.046875 L 29.585938 34.546875 L 30.929688 34.546875 C 31.617188 34.546875 32.164062 35.09375 32.164062 35.78125 C 32.164062 36.46875 31.617188 37.046875 30.929688 37.046875 Z M 31.539062 42.015625 L 29.585938 42.015625 L 29.585938 38.78125 L 31.539062 38.78125 C 32.429688 38.796875 33.148438 39.5 33.148438 40.390625 C 33.148438 41.296875 32.429688 42 31.539062 42.015625 Z M 45.664062 43.75 C 46.132812 43.75 46.539062 43.359375 46.539062 42.890625 L 46.539062 33.671875 C 46.539062 33.269531 46.242188 32.9375 45.859375 32.839844 L 45.664062 32.8125 L 45.648438 32.8125 C 45.367188 32.8125 45.117188 32.9375 44.945312 33.171875 L 41.835938 37.484375 L 38.726562 33.171875 C 38.570312 32.9375 38.289062 32.8125 38.039062 32.8125 L 37.992188 32.8125 C 37.523438 32.8125 37.132812 33.203125 37.132812 33.671875 L 37.132812 42.890625 C 37.132812 43.359375 37.523438 43.75 37.992188 43.75 C 38.476562 43.75 38.867188 43.359375 38.867188 42.890625 L 38.867188 36.3125 L 41.101562 39.4375 C 41.273438 39.671875 41.539062 39.796875 41.820312 39.796875 L 41.851562 39.796875 C 42.132812 39.796875 42.382812 39.671875 42.554688 39.4375 L 44.804688 36.3125 L 44.804688 42.890625 C 44.804688 43.359375 45.179688 43.75 45.664062 43.75 Z M 45.664062 43.75 "/>\n      </g>'
        },
        webpIcon: {
            extension: ".webp",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.234375 43.734375 L 9.28125 43.734375 C 9.3125 43.71875 9.34375 43.703125 9.40625 43.703125 L 9.414062 43.6875 C 9.421875 43.6875 9.421875 43.6875 9.4375 43.6875 C 9.46875 43.671875 9.515625 43.625 9.5625 43.59375 L 9.59375 43.59375 C 9.625 43.5625 9.65625 43.53125 9.6875 43.515625 C 9.6875 43.5 9.703125 43.5 9.703125 43.46875 L 9.796875 43.375 C 9.796875 43.375 9.796875 43.359375 9.8125 43.359375 C 9.828125 43.328125 9.859375 43.265625 9.875 43.21875 L 11.921875 38.375 L 13.96875 43.21875 C 13.984375 43.265625 14 43.328125 14.03125 43.359375 C 14.03125 43.359375 14.03125 43.375 14.0625 43.375 L 14.125 43.46875 C 14.140625 43.5 14.140625 43.5 14.15625 43.515625 L 14.203125 43.546875 L 14.265625 43.59375 C 14.265625 43.59375 14.265625 43.59375 14.28125 43.59375 C 14.3125 43.625 14.359375 43.671875 14.421875 43.6875 C 14.4375 43.6875 14.4375 43.6875 14.453125 43.703125 C 14.484375 43.703125 14.515625 43.71875 14.5625 43.734375 L 14.609375 43.734375 L 14.679688 43.746094 L 14.75 43.75 C 14.8125 43.75 14.859375 43.75 14.90625 43.734375 L 14.9375 43.734375 C 14.984375 43.71875 15.03125 43.703125 15.0625 43.703125 C 15.0625 43.6875 15.078125 43.6875 15.078125 43.6875 L 15.09375 43.6875 C 15.15625 43.671875 15.1875 43.625 15.234375 43.59375 L 15.25 43.59375 C 15.28125 43.5625 15.328125 43.53125 15.359375 43.515625 C 15.359375 43.5 15.375 43.5 15.375 43.46875 C 15.40625 43.4375 15.4375 43.40625 15.453125 43.375 L 15.46875 43.359375 C 15.5 43.328125 15.53125 43.265625 15.546875 43.21875 L 19.375 34.109375 C 19.5625 33.6875 19.359375 33.171875 18.9375 33 C 18.484375 32.8125 17.984375 33.015625 17.796875 33.453125 L 14.75 40.6875 L 12.734375 35.890625 C 12.578125 35.546875 12.25 35.359375 11.921875 35.359375 C 11.578125 35.359375 11.25 35.546875 11.109375 35.890625 L 9.09375 40.6875 L 6.03125 33.453125 C 5.859375 33.015625 5.34375 32.8125 4.921875 33 C 4.46875 33.171875 4.28125 33.6875 4.453125 34.109375 L 8.296875 43.21875 C 8.328125 43.265625 8.34375 43.328125 8.375 43.359375 L 8.375 43.375 C 8.40625 43.40625 8.421875 43.4375 8.453125 43.46875 C 8.46875 43.5 8.46875 43.5 8.484375 43.515625 L 8.539062 43.546875 L 8.59375 43.59375 C 8.59375 43.59375 8.59375 43.59375 8.609375 43.59375 C 8.640625 43.625 8.703125 43.671875 8.75 43.6875 C 8.765625 43.6875 8.765625 43.6875 8.78125 43.703125 C 8.8125 43.703125 8.84375 43.71875 8.890625 43.734375 L 8.9375 43.734375 L 9.015625 43.746094 L 9.09375 43.75 C 9.140625 43.75 9.1875 43.75 9.234375 43.734375 Z M 27.21875 43.75 C 27.671875 43.75 28.078125 43.359375 28.078125 42.890625 C 28.078125 42.40625 27.671875 42.015625 27.21875 42.015625 L 22.984375 42.015625 L 22.984375 39.140625 L 26.625 39.140625 C 27.09375 39.140625 27.484375 38.75 27.484375 38.265625 C 27.484375 37.8125 27.09375 37.40625 26.625 37.40625 L 22.984375 37.40625 L 22.984375 34.546875 L 27.21875 34.546875 C 27.671875 34.546875 28.078125 34.15625 28.078125 33.671875 C 28.078125 33.1875 27.671875 32.8125 27.21875 32.8125 L 22.109375 32.8125 C 21.625 32.8125 21.25 33.1875 21.25 33.671875 L 21.25 42.890625 C 21.25 43.359375 21.625 43.75 22.109375 43.75 L 22.125 43.734375 C 22.125 43.734375 22.125 43.75 22.15625 43.75 Z M 33.578125 43.75 C 35.421875 43.75 36.921875 42.25 36.921875 40.390625 C 36.921875 39.203125 36.28125 38.15625 35.34375 37.5625 C 35.71875 37.0625 35.9375 36.453125 35.9375 35.78125 C 35.9375 34.140625 34.609375 32.8125 32.96875 32.8125 L 30.75 32.8125 C 30.28125 32.8125 29.890625 33.1875 29.890625 33.671875 L 29.890625 42.890625 C 29.890625 43.359375 30.28125 43.75 30.75 43.75 C 30.765625 43.75 30.765625 43.734375 30.796875 43.734375 C 30.796875 43.734375 30.796875 43.75 30.8125 43.75 Z M 32.96875 37.046875 L 31.625 37.046875 L 31.625 34.546875 L 32.96875 34.546875 C 33.65625 34.546875 34.203125 35.09375 34.203125 35.78125 C 34.203125 36.46875 33.65625 37.046875 32.96875 37.046875 Z M 33.578125 42.015625 L 31.625 42.015625 L 31.625 38.78125 L 33.578125 38.78125 C 34.46875 38.796875 35.1875 39.5 35.1875 40.390625 C 35.1875 41.296875 34.46875 42 33.578125 42.015625 Z M 40.03125 43.75 C 40.515625 43.75 40.90625 43.359375 40.90625 42.890625 L 40.90625 39.5 L 42.828125 39.5 C 44.6875 39.5 46.1875 38 46.1875 36.171875 C 46.1875 34.3125 44.6875 32.8125 42.828125 32.8125 L 40.03125 32.8125 C 39.5625 32.8125 39.171875 33.1875 39.171875 33.671875 L 39.171875 42.890625 C 39.171875 43.359375 39.5625 43.75 40.03125 43.75 Z M 42.828125 37.765625 L 40.90625 37.765625 L 40.90625 34.546875 L 42.828125 34.546875 C 43.734375 34.546875 44.4375 35.265625 44.453125 36.171875 C 44.4375 37.046875 43.734375 37.765625 42.828125 37.765625 Z M 42.828125 37.765625 "/>\n      </g>'
        },
        wmvIcon: {
            extension: ".wmv",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.484375 43.734375 L 8.53125 43.734375 C 8.5625 43.71875 8.59375 43.703125 8.65625 43.703125 L 8.664062 43.6875 C 8.671875 43.6875 8.671875 43.6875 8.6875 43.6875 C 8.71875 43.671875 8.765625 43.625 8.8125 43.59375 L 8.84375 43.59375 C 8.875 43.5625 8.90625 43.53125 8.9375 43.515625 C 8.9375 43.5 8.953125 43.5 8.953125 43.46875 L 9.046875 43.375 C 9.046875 43.375 9.046875 43.359375 9.0625 43.359375 C 9.078125 43.328125 9.109375 43.265625 9.125 43.21875 L 11.171875 38.375 L 13.21875 43.21875 C 13.234375 43.265625 13.25 43.328125 13.28125 43.359375 C 13.28125 43.359375 13.28125 43.375 13.3125 43.375 L 13.375 43.46875 C 13.390625 43.5 13.390625 43.5 13.40625 43.515625 L 13.453125 43.546875 L 13.515625 43.59375 C 13.515625 43.59375 13.515625 43.59375 13.53125 43.59375 C 13.5625 43.625 13.609375 43.671875 13.671875 43.6875 C 13.6875 43.6875 13.6875 43.6875 13.703125 43.703125 C 13.734375 43.703125 13.765625 43.71875 13.8125 43.734375 L 13.859375 43.734375 L 13.929688 43.746094 L 14 43.75 C 14.0625 43.75 14.109375 43.75 14.15625 43.734375 L 14.1875 43.734375 C 14.234375 43.71875 14.28125 43.703125 14.3125 43.703125 C 14.3125 43.6875 14.328125 43.6875 14.328125 43.6875 L 14.34375 43.6875 C 14.40625 43.671875 14.4375 43.625 14.484375 43.59375 L 14.5 43.59375 C 14.53125 43.5625 14.578125 43.53125 14.609375 43.515625 C 14.609375 43.5 14.625 43.5 14.625 43.46875 C 14.65625 43.4375 14.6875 43.40625 14.703125 43.375 L 14.71875 43.359375 C 14.75 43.328125 14.78125 43.265625 14.796875 43.21875 L 18.625 34.109375 C 18.8125 33.6875 18.609375 33.171875 18.1875 33 C 17.734375 32.8125 17.234375 33.015625 17.046875 33.453125 L 14 40.6875 L 11.984375 35.890625 C 11.828125 35.546875 11.5 35.359375 11.171875 35.359375 C 10.828125 35.359375 10.5 35.546875 10.359375 35.890625 L 8.34375 40.6875 L 5.28125 33.453125 C 5.109375 33.015625 4.59375 32.8125 4.171875 33 C 3.71875 33.171875 3.53125 33.6875 3.703125 34.109375 L 7.546875 43.21875 C 7.578125 43.265625 7.59375 43.328125 7.625 43.359375 L 7.625 43.375 C 7.65625 43.40625 7.671875 43.4375 7.703125 43.46875 C 7.71875 43.5 7.71875 43.5 7.734375 43.515625 L 7.789062 43.546875 L 7.84375 43.59375 C 7.84375 43.59375 7.84375 43.59375 7.859375 43.59375 C 7.890625 43.625 7.953125 43.671875 8 43.6875 C 8.015625 43.6875 8.015625 43.6875 8.03125 43.703125 C 8.0625 43.703125 8.09375 43.71875 8.140625 43.734375 L 8.1875 43.734375 L 8.265625 43.746094 L 8.34375 43.75 C 8.390625 43.75 8.4375 43.75 8.484375 43.734375 Z M 29.03125 43.75 C 29.5 43.75 29.90625 43.359375 29.90625 42.890625 L 29.90625 33.671875 C 29.90625 33.269531 29.609375 32.9375 29.226562 32.839844 L 29.03125 32.8125 L 29.015625 32.8125 C 28.734375 32.8125 28.484375 32.9375 28.3125 33.171875 L 25.203125 37.484375 L 22.09375 33.171875 C 21.9375 32.9375 21.65625 32.8125 21.40625 32.8125 L 21.359375 32.8125 C 20.890625 32.8125 20.5 33.203125 20.5 33.671875 L 20.5 42.890625 C 20.5 43.359375 20.890625 43.75 21.359375 43.75 C 21.84375 43.75 22.234375 43.359375 22.234375 42.890625 L 22.234375 36.3125 L 24.46875 39.4375 C 24.640625 39.671875 24.90625 39.796875 25.1875 39.796875 L 25.21875 39.796875 C 25.5 39.796875 25.75 39.671875 25.921875 39.4375 L 28.171875 36.3125 L 28.171875 42.890625 C 28.171875 43.359375 28.546875 43.75 29.03125 43.75 Z M 37.015625 43.734375 L 37.0625 43.734375 C 37.09375 43.71875 37.125 43.703125 37.1875 43.703125 L 37.195312 43.6875 C 37.203125 43.6875 37.203125 43.6875 37.21875 43.6875 C 37.25 43.671875 37.296875 43.625 37.34375 43.59375 L 37.375 43.59375 C 37.40625 43.5625 37.4375 43.53125 37.46875 43.515625 C 37.46875 43.5 37.484375 43.5 37.484375 43.46875 L 37.578125 43.375 C 37.578125 43.375 37.578125 43.359375 37.59375 43.359375 C 37.609375 43.328125 37.640625 43.265625 37.65625 43.21875 L 39.703125 38.375 L 41.75 43.21875 C 41.765625 43.265625 41.78125 43.328125 41.8125 43.359375 C 41.8125 43.359375 41.8125 43.375 41.84375 43.375 L 41.90625 43.46875 C 41.921875 43.5 41.921875 43.5 41.9375 43.515625 L 41.984375 43.546875 L 42.046875 43.59375 C 42.046875 43.59375 42.046875 43.59375 42.0625 43.59375 C 42.09375 43.625 42.140625 43.671875 42.203125 43.6875 C 42.21875 43.6875 42.21875 43.6875 42.234375 43.703125 C 42.265625 43.703125 42.296875 43.71875 42.34375 43.734375 L 42.390625 43.734375 L 42.460938 43.746094 L 42.53125 43.75 C 42.59375 43.75 42.640625 43.75 42.6875 43.734375 L 42.71875 43.734375 C 42.765625 43.71875 42.8125 43.703125 42.84375 43.703125 C 42.84375 43.6875 42.859375 43.6875 42.859375 43.6875 L 42.875 43.6875 C 42.9375 43.671875 42.96875 43.625 43.015625 43.59375 L 43.03125 43.59375 C 43.0625 43.5625 43.109375 43.53125 43.140625 43.515625 C 43.140625 43.5 43.15625 43.5 43.15625 43.46875 C 43.1875 43.4375 43.21875 43.40625 43.234375 43.375 L 43.25 43.359375 C 43.28125 43.328125 43.3125 43.265625 43.328125 43.21875 L 47.15625 34.109375 C 47.34375 33.6875 47.140625 33.171875 46.71875 33 C 46.265625 32.8125 45.765625 33.015625 45.578125 33.453125 L 42.53125 40.6875 L 40.515625 35.890625 C 40.359375 35.546875 40.03125 35.359375 39.703125 35.359375 C 39.359375 35.359375 39.03125 35.546875 38.890625 35.890625 L 36.875 40.6875 L 33.8125 33.453125 C 33.640625 33.015625 33.125 32.8125 32.703125 33 C 32.25 33.171875 32.0625 33.6875 32.234375 34.109375 L 36.078125 43.21875 C 36.109375 43.265625 36.125 43.328125 36.15625 43.359375 L 36.15625 43.375 C 36.1875 43.40625 36.203125 43.4375 36.234375 43.46875 C 36.25 43.5 36.25 43.5 36.265625 43.515625 L 36.320312 43.546875 L 36.375 43.59375 C 36.375 43.59375 36.375 43.59375 36.390625 43.59375 C 36.421875 43.625 36.484375 43.671875 36.53125 43.6875 C 36.546875 43.6875 36.546875 43.6875 36.5625 43.703125 C 36.59375 43.703125 36.625 43.71875 36.671875 43.734375 L 36.71875 43.734375 L 36.796875 43.746094 L 36.875 43.75 C 36.921875 43.75 36.96875 43.75 37.015625 43.734375 Z M 37.015625 43.734375 "/>\n      </g>'
        },
        xlsIcon: {
            extension: ".xls",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 17.21875 46.875 C 17.425781 46.875 17.632812 46.800781 17.820312 46.667969 C 18.289062 46.351562 18.363281 45.695312 18.042969 45.242188 L 14.480469 40.367188 L 18.042969 35.53125 C 18.363281 35.0625 18.289062 34.425781 17.820312 34.105469 C 17.351562 33.75 16.730469 33.84375 16.375 34.332031 L 13.226562 38.644531 L 10.054688 34.332031 C 9.738281 33.84375 9.082031 33.75 8.632812 34.105469 C 8.164062 34.425781 8.070312 35.0625 8.386719 35.53125 L 11.949219 40.367188 L 8.386719 45.242188 C 8.070312 45.695312 8.164062 46.351562 8.632812 46.667969 C 8.800781 46.800781 9.007812 46.875 9.230469 46.875 C 9.550781 46.875 9.851562 46.707031 10.054688 46.445312 L 13.226562 42.113281 L 16.375 46.445312 C 16.582031 46.707031 16.882812 46.875 17.21875 46.875 Z M 29.351562 46.875 C 29.894531 46.875 30.382812 46.40625 30.382812 45.84375 C 30.382812 45.261719 29.894531 44.792969 29.351562 44.792969 L 24.269531 44.792969 L 24.269531 34.78125 C 24.269531 34.21875 23.800781 33.75 23.21875 33.75 C 22.636719 33.75 22.1875 34.21875 22.1875 34.78125 L 22.1875 45.84375 C 22.1875 46.335938 22.53125 46.757812 23.007812 46.855469 L 23.222656 46.875 Z M 37.28125 46.855469 C 38.613281 46.855469 39.832031 46.460938 40.75 45.789062 C 41.6875 45.113281 42.363281 44.082031 42.363281 42.882812 C 42.363281 42.300781 42.195312 41.738281 41.914062 41.289062 C 41.480469 40.59375 40.804688 40.105469 40.039062 39.730469 C 39.289062 39.375 38.40625 39.132812 37.449219 38.945312 L 37.414062 38.945312 C 36.398438 38.757812 35.554688 38.457031 35.070312 38.117188 C 34.824219 37.949219 34.65625 37.78125 34.5625 37.632812 C 34.46875 37.480469 34.429688 37.332031 34.429688 37.105469 C 34.429688 36.710938 34.636719 36.300781 35.144531 35.925781 C 35.648438 35.550781 36.398438 35.289062 37.242188 35.289062 C 38.386719 35.289062 39.304688 35.851562 40.261719 36.488281 C 40.710938 36.789062 41.3125 36.65625 41.59375 36.207031 C 41.894531 35.773438 41.761719 35.175781 41.332031 34.875 C 40.375 34.257812 39.042969 33.375 37.242188 33.375 C 36.023438 33.375 34.882812 33.730469 34 34.367188 C 33.136719 35.007812 32.5 35.980469 32.5 37.105469 C 32.5 37.667969 32.648438 38.195312 32.929688 38.644531 C 33.34375 39.300781 33.960938 39.769531 34.675781 40.105469 C 35.386719 40.445312 36.210938 40.667969 37.09375 40.835938 L 37.132812 40.835938 C 38.238281 41.042969 39.15625 41.363281 39.699219 41.71875 C 39.980469 41.90625 40.148438 42.09375 40.261719 42.28125 C 40.375 42.46875 40.429688 42.636719 40.429688 42.882812 C 40.429688 43.351562 40.1875 43.820312 39.625 44.230469 C 39.0625 44.644531 38.21875 44.925781 37.28125 44.925781 C 35.949219 44.945312 34.523438 44.15625 33.699219 43.480469 C 33.289062 43.144531 32.667969 43.199219 32.332031 43.613281 C 32.011719 44.023438 32.070312 44.644531 32.480469 44.980469 C 33.550781 45.824219 35.257812 46.835938 37.28125 46.855469 Z M 37.28125 46.855469 "/>\n      </g>'
        },
        xlsxIcon: {
            extension: ".xlsx",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 13.070312 43.75 C 13.242188 43.75 13.414062 43.6875 13.570312 43.578125 C 13.960938 43.3125 14.023438 42.765625 13.757812 42.390625 L 10.789062 38.328125 L 13.757812 34.296875 C 14.023438 33.90625 13.960938 33.375 13.570312 33.109375 C 13.179688 32.8125 12.664062 32.890625 12.367188 33.296875 L 9.742188 36.890625 L 7.101562 33.296875 C 6.835938 32.890625 6.289062 32.8125 5.914062 33.109375 C 5.523438 33.375 5.445312 33.90625 5.710938 34.296875 L 8.679688 38.328125 L 5.710938 42.390625 C 5.445312 42.765625 5.523438 43.3125 5.914062 43.578125 C 6.054688 43.6875 6.226562 43.75 6.414062 43.75 C 6.679688 43.75 6.929688 43.609375 7.101562 43.390625 L 9.742188 39.78125 L 12.367188 43.390625 C 12.539062 43.609375 12.789062 43.75 13.070312 43.75 Z M 23.179688 43.75 C 23.632812 43.75 24.039062 43.359375 24.039062 42.890625 C 24.039062 42.40625 23.632812 42.015625 23.179688 42.015625 L 18.945312 42.015625 L 18.945312 33.671875 C 18.945312 33.203125 18.554688 32.8125 18.070312 32.8125 C 17.585938 32.8125 17.210938 33.203125 17.210938 33.671875 L 17.210938 42.890625 C 17.210938 43.359375 17.585938 43.75 18.070312 43.75 Z M 29.789062 43.734375 C 30.898438 43.734375 31.914062 43.40625 32.679688 42.84375 C 33.460938 42.28125 34.023438 41.421875 34.023438 40.421875 C 34.023438 39.9375 33.882812 39.46875 33.648438 39.09375 C 33.289062 38.515625 32.726562 38.109375 32.085938 37.796875 C 31.460938 37.5 30.726562 37.296875 29.929688 37.140625 L 29.898438 37.140625 C 29.054688 36.984375 28.351562 36.734375 27.945312 36.453125 C 27.742188 36.3125 27.601562 36.171875 27.523438 36.046875 C 27.445312 35.921875 27.414062 35.796875 27.414062 35.609375 C 27.414062 35.28125 27.585938 34.9375 28.007812 34.625 C 28.429688 34.3125 29.054688 34.09375 29.757812 34.09375 C 30.710938 34.09375 31.476562 34.5625 32.273438 35.09375 C 32.648438 35.34375 33.148438 35.234375 33.382812 34.859375 C 33.632812 34.5 33.523438 34 33.164062 33.75 C 32.367188 33.234375 31.257812 32.5 29.757812 32.5 C 28.742188 32.5 27.789062 32.796875 27.054688 33.328125 C 26.335938 33.859375 25.804688 34.671875 25.804688 35.609375 C 25.804688 36.078125 25.929688 36.515625 26.164062 36.890625 C 26.507812 37.4375 27.023438 37.828125 27.617188 38.109375 C 28.210938 38.390625 28.898438 38.578125 29.632812 38.71875 L 29.664062 38.71875 C 30.585938 38.890625 31.351562 39.15625 31.804688 39.453125 C 32.039062 39.609375 32.179688 39.765625 32.273438 39.921875 C 32.367188 40.078125 32.414062 40.21875 32.414062 40.421875 C 32.414062 40.8125 32.210938 41.203125 31.742188 41.546875 C 31.273438 41.890625 30.570312 42.125 29.789062 42.125 C 28.679688 42.140625 27.492188 41.484375 26.804688 40.921875 C 26.460938 40.640625 25.945312 40.6875 25.664062 41.03125 C 25.398438 41.375 25.445312 41.890625 25.789062 42.171875 C 26.679688 42.875 28.101562 43.71875 29.789062 43.734375 Z M 43.179688 43.75 C 43.351562 43.75 43.523438 43.6875 43.679688 43.578125 C 44.070312 43.3125 44.132812 42.765625 43.867188 42.390625 L 40.898438 38.328125 L 43.867188 34.296875 C 44.132812 33.90625 44.070312 33.375 43.679688 33.109375 C 43.289062 32.8125 42.773438 32.890625 42.476562 33.296875 L 39.851562 36.890625 L 37.210938 33.296875 C 36.945312 32.890625 36.398438 32.8125 36.023438 33.109375 C 35.632812 33.375 35.554688 33.90625 35.820312 34.296875 L 38.789062 38.328125 L 35.820312 42.390625 C 35.554688 42.765625 35.632812 43.3125 36.023438 43.578125 C 36.164062 43.6875 36.335938 43.75 36.523438 43.75 C 36.789062 43.75 37.039062 43.609375 37.210938 43.390625 L 39.851562 39.78125 L 42.476562 43.390625 C 42.648438 43.609375 42.898438 43.75 43.179688 43.75 Z M 43.179688 43.75 "/>\n      </g>'
        },
        zipIcon: {
            extension: ".zip",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 20.175781 46.875 C 20.855469 46.875 21.402344 46.351562 21.402344 45.671875 C 21.402344 44.992188 20.855469 44.445312 20.175781 44.445312 L 13.132812 44.445312 L 21.183594 33.488281 L 21.183594 33.445312 C 21.203125 33.421875 21.226562 33.378906 21.25 33.335938 C 21.269531 33.3125 21.269531 33.289062 21.292969 33.269531 C 21.3125 33.203125 21.3125 33.179688 21.335938 33.136719 C 21.335938 33.09375 21.378906 33.070312 21.378906 33.007812 C 21.378906 32.984375 21.378906 32.960938 21.402344 32.917969 L 21.402344 32.679688 C 21.402344 32.632812 21.402344 32.613281 21.378906 32.546875 C 21.378906 32.503906 21.378906 32.480469 21.335938 32.4375 C 21.335938 32.414062 21.3125 32.371094 21.3125 32.304688 C 21.292969 32.285156 21.269531 32.242188 21.269531 32.21875 C 21.25 32.195312 21.226562 32.152344 21.203125 32.109375 C 21.183594 32.066406 21.160156 32.042969 21.117188 32.023438 C 21.09375 32 21.074219 31.957031 21.050781 31.933594 C 21.03125 31.914062 21.007812 31.867188 20.964844 31.847656 C 20.941406 31.824219 20.941406 31.804688 20.898438 31.78125 L 20.875 31.78125 C 20.832031 31.757812 20.8125 31.738281 20.765625 31.714844 C 20.746094 31.695312 20.722656 31.648438 20.65625 31.648438 L 20.570312 31.605469 L 20.4375 31.585938 C 20.417969 31.585938 20.375 31.5625 20.351562 31.5625 L 10.75 31.5625 C 10.070312 31.5625 9.546875 32.085938 9.546875 32.765625 C 9.546875 33.421875 10.070312 33.992188 10.75 33.992188 L 17.8125 33.992188 L 9.785156 44.972656 L 9.765625 44.972656 C 9.742188 45.015625 9.71875 45.058594 9.699219 45.082031 C 9.699219 45.101562 9.675781 45.148438 9.632812 45.167969 C 9.632812 45.210938 9.609375 45.257812 9.609375 45.277344 C 9.589844 45.320312 9.589844 45.367188 9.566406 45.386719 L 9.566406 45.496094 C 9.546875 45.539062 9.546875 45.585938 9.546875 45.648438 L 9.546875 45.738281 C 9.546875 45.78125 9.566406 45.824219 9.566406 45.890625 C 9.566406 45.933594 9.589844 45.957031 9.589844 45.976562 L 9.632812 46.109375 C 9.632812 46.152344 9.675781 46.175781 9.699219 46.21875 C 9.699219 46.242188 9.71875 46.261719 9.742188 46.328125 C 9.765625 46.351562 9.785156 46.394531 9.808594 46.414062 C 9.828125 46.4375 9.851562 46.460938 9.894531 46.480469 L 9.9375 46.542969 L 9.984375 46.589844 C 10.003906 46.613281 10.027344 46.632812 10.046875 46.632812 L 10.046875 46.65625 C 10.070312 46.679688 10.09375 46.679688 10.136719 46.699219 C 10.179688 46.722656 10.222656 46.742188 10.246094 46.742188 C 10.265625 46.789062 10.289062 46.789062 10.3125 46.808594 C 10.375 46.808594 10.421875 46.832031 10.464844 46.832031 C 10.484375 46.851562 10.507812 46.851562 10.53125 46.851562 L 10.648438 46.871094 Z M 26.214844 46.875 C 26.871094 46.875 27.4375 46.351562 27.4375 45.671875 L 27.4375 32.765625 C 27.4375 32.085938 26.871094 31.5625 26.214844 31.5625 C 25.535156 31.5625 25.011719 32.085938 25.011719 32.765625 L 25.011719 45.671875 C 25.011719 46.351562 25.535156 46.875 26.214844 46.875 Z M 32.734375 46.875 C 33.410156 46.875 33.957031 46.328125 33.957031 45.671875 L 33.957031 40.925781 L 36.648438 40.925781 C 39.25 40.925781 41.351562 38.824219 41.351562 36.265625 C 41.351562 33.664062 39.25 31.5625 36.648438 31.5625 L 32.734375 31.5625 C 32.078125 31.5625 31.53125 32.085938 31.53125 32.765625 L 31.53125 45.671875 C 31.53125 46.328125 32.078125 46.875 32.734375 46.875 Z M 36.648438 38.496094 L 33.957031 38.496094 L 33.957031 33.992188 L 36.648438 33.992188 C 37.917969 33.992188 38.902344 34.996094 38.921875 36.265625 C 38.902344 37.492188 37.917969 38.496094 36.648438 38.496094 Z M 36.648438 38.496094 "/>\n      </g>'
        },
        docxIcon: {
            extension: ".docx",
            path: '<g id="surface9" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 7.789062 43.75 C 9.589844 43.75 10.988281 43.269531 11.984375 42.304688 C 12.980469 41.339844 13.476562 39.984375 13.476562 38.234375 C 13.476562 36.496094 12.980469 35.144531 11.984375 34.179688 C 10.988281 33.214844 9.589844 32.734375 7.789062 32.734375 L 4.695312 32.734375 C 4.394531 32.734375 4.15625 32.816406 3.984375 32.984375 C 3.8125 33.152344 3.726562 33.386719 3.726562 33.6875 L 3.726562 42.796875 C 3.726562 43.097656 3.8125 43.332031 3.984375 43.5 C 4.15625 43.667969 4.394531 43.75 4.695312 43.75 Z M 7.664062 42.109375 L 5.742188 42.109375 L 5.742188 34.375 L 7.664062 34.375 C 10.195312 34.375 11.460938 35.660156 11.460938 38.234375 C 11.460938 40.816406 10.195312 42.109375 7.664062 42.109375 Z M 20.414062 43.890625 C 21.476562 43.890625 22.402344 43.660156 23.1875 43.203125 C 23.972656 42.746094 24.582031 42.089844 25.007812 41.234375 C 25.433594 40.378906 25.648438 39.378906 25.648438 38.234375 C 25.648438 37.089844 25.4375 36.089844 25.015625 35.242188 C 24.59375 34.394531 23.988281 33.738281 23.203125 33.28125 C 22.417969 32.824219 21.488281 32.59375 20.414062 32.59375 C 19.339844 32.59375 18.410156 32.824219 17.617188 33.28125 C 16.824219 33.738281 16.21875 34.394531 15.796875 35.242188 C 15.375 36.089844 15.164062 37.089844 15.164062 38.234375 C 15.164062 39.378906 15.378906 40.378906 15.804688 41.234375 C 16.230469 42.089844 16.839844 42.746094 17.625 43.203125 C 18.410156 43.660156 19.339844 43.890625 20.414062 43.890625 Z M 20.414062 42.28125 C 19.394531 42.28125 18.597656 41.933594 18.03125 41.234375 C 17.464844 40.535156 17.179688 39.535156 17.179688 38.234375 C 17.179688 36.933594 17.464844 35.933594 18.03125 35.242188 C 18.597656 34.550781 19.394531 34.203125 20.414062 34.203125 C 21.425781 34.203125 22.214844 34.550781 22.78125 35.242188 C 23.347656 35.933594 23.632812 36.933594 23.632812 38.234375 C 23.632812 39.535156 23.347656 40.535156 22.78125 41.234375 C 22.214844 41.933594 21.425781 42.28125 20.414062 42.28125 Z M 32.601562 43.890625 C 33.289062 43.890625 33.933594 43.789062 34.539062 43.585938 C 35.144531 43.382812 35.679688 43.089844 36.148438 42.703125 C 36.285156 42.597656 36.378906 42.488281 36.429688 42.367188 C 36.480469 42.246094 36.507812 42.109375 36.507812 41.953125 C 36.507812 41.722656 36.445312 41.53125 36.320312 41.375 C 36.195312 41.21875 36.042969 41.140625 35.867188 41.140625 C 35.753906 41.140625 35.644531 41.160156 35.539062 41.203125 C 35.433594 41.246094 35.332031 41.296875 35.226562 41.359375 C 34.746094 41.683594 34.316406 41.910156 33.9375 42.046875 C 33.558594 42.183594 33.144531 42.25 32.695312 42.25 C 31.613281 42.25 30.792969 41.910156 30.234375 41.234375 C 29.675781 40.558594 29.398438 39.558594 29.398438 38.234375 C 29.398438 36.921875 29.675781 35.925781 30.234375 35.25 C 30.792969 34.574219 31.613281 34.234375 32.695312 34.234375 C 33.164062 34.234375 33.589844 34.300781 33.976562 34.429688 C 34.363281 34.558594 34.777344 34.792969 35.226562 35.125 C 35.445312 35.269531 35.660156 35.34375 35.867188 35.34375 C 36.042969 35.34375 36.195312 35.265625 36.320312 35.109375 C 36.445312 34.953125 36.507812 34.761719 36.507812 34.53125 C 36.507812 34.363281 36.480469 34.222656 36.429688 34.109375 C 36.378906 33.996094 36.285156 33.886719 36.148438 33.78125 C 35.679688 33.394531 35.144531 33.101562 34.539062 32.898438 C 33.933594 32.695312 33.289062 32.59375 32.601562 32.59375 C 31.539062 32.59375 30.609375 32.824219 29.8125 33.28125 C 29.015625 33.738281 28.402344 34.394531 27.976562 35.242188 C 27.550781 36.089844 27.335938 37.089844 27.335938 38.234375 C 27.335938 39.378906 27.550781 40.378906 27.976562 41.234375 C 28.402344 42.089844 29.015625 42.746094 29.8125 43.203125 C 30.609375 43.660156 31.539062 43.890625 32.601562 43.890625 Z M 46.132812 43.84375 C 46.382812 43.84375 46.605469 43.75 46.796875 43.5625 C 46.988281 43.375 47.085938 43.15625 47.085938 42.90625 C 47.085938 42.707031 47.003906 42.511719 46.835938 42.3125 L 43.445312 38.15625 L 46.710938 34.171875 C 46.867188 34.003906 46.945312 33.808594 46.945312 33.578125 C 46.945312 33.328125 46.847656 33.113281 46.65625 32.929688 C 46.464844 32.746094 46.242188 32.65625 45.992188 32.65625 C 45.730469 32.65625 45.507812 32.769531 45.320312 33 L 42.273438 36.765625 L 39.226562 33 C 39.027344 32.769531 38.800781 32.65625 38.539062 32.65625 C 38.289062 32.65625 38.070312 32.746094 37.882812 32.929688 C 37.695312 33.113281 37.601562 33.328125 37.601562 33.578125 C 37.601562 33.808594 37.679688 34.003906 37.835938 34.171875 L 41.101562 38.15625 L 37.695312 42.3125 C 37.539062 42.5 37.460938 42.699219 37.460938 42.90625 C 37.460938 43.15625 37.558594 43.371094 37.75 43.554688 C 37.941406 43.738281 38.164062 43.828125 38.414062 43.828125 C 38.675781 43.828125 38.898438 43.71875 39.085938 43.5 L 42.273438 39.5625 L 45.445312 43.5 C 45.644531 43.730469 45.871094 43.84375 46.132812 43.84375 Z M 46.132812 43.84375 "/>\n      </g>'
        },
        jpgIcon: {
            extension: ".jpg",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.789062 47.007812 L 9.488281 46.960938 C 12.214844 46.757812 13.578125 45.277344 13.578125 42.523438 L 13.578125 32.742188 C 13.578125 32.320312 13.453125 31.980469 13.195312 31.726562 C 12.941406 31.472656 12.59375 31.34375 12.15625 31.34375 C 11.734375 31.34375 11.394531 31.472656 11.140625 31.726562 C 10.886719 31.980469 10.757812 32.320312 10.757812 32.742188 L 10.757812 42.523438 C 10.757812 43.238281 10.605469 43.769531 10.296875 44.117188 C 9.992188 44.46875 9.539062 44.660156 8.941406 44.6875 L 8.242188 44.730469 C 7.847656 44.761719 7.558594 44.867188 7.378906 45.046875 C 7.195312 45.230469 7.105469 45.496094 7.105469 45.847656 C 7.105469 46.664062 7.667969 47.050781 8.789062 47.007812 Z M 18.304688 47.007812 C 18.742188 47.007812 19.089844 46.878906 19.34375 46.625 C 19.597656 46.367188 19.726562 46.023438 19.726562 45.585938 L 19.726562 40.882812 L 23.640625 40.882812 C 25.289062 40.882812 26.574219 40.464844 27.492188 39.632812 C 28.410156 38.804688 28.871094 37.644531 28.871094 36.15625 C 28.871094 34.667969 28.410156 33.511719 27.492188 32.6875 C 26.574219 31.863281 25.289062 31.453125 23.640625 31.453125 L 18.261719 31.453125 C 17.839844 31.453125 17.507812 31.570312 17.265625 31.804688 C 17.023438 32.035156 16.90625 32.363281 16.90625 32.789062 L 16.90625 45.585938 C 16.90625 46.023438 17.03125 46.367188 17.289062 46.625 C 17.542969 46.878906 17.882812 47.007812 18.304688 47.007812 Z M 23.292969 38.714844 L 19.726562 38.714844 L 19.726562 33.640625 L 23.292969 33.640625 C 25.230469 33.640625 26.203125 34.488281 26.203125 36.179688 C 26.203125 37.871094 25.230469 38.714844 23.292969 38.714844 Z M 38.605469 47.070312 C 39.320312 47.070312 40.0625 47.011719 40.835938 46.898438 C 41.609375 46.78125 42.285156 46.621094 42.871094 46.414062 C 43.410156 46.242188 43.765625 46.015625 43.941406 45.738281 C 44.117188 45.460938 44.203125 44.988281 44.203125 44.316406 L 44.203125 39.613281 C 44.203125 39.292969 44.101562 39.03125 43.898438 38.835938 C 43.695312 38.640625 43.425781 38.539062 43.089844 38.539062 L 39.21875 38.539062 C 38.867188 38.539062 38.59375 38.628906 38.398438 38.804688 C 38.199219 38.976562 38.101562 39.226562 38.101562 39.546875 C 38.101562 39.867188 38.199219 40.117188 38.398438 40.289062 C 38.59375 40.464844 38.867188 40.554688 39.21875 40.554688 L 41.6875 40.554688 L 41.6875 44.425781 C 40.699219 44.703125 39.707031 44.839844 38.714844 44.839844 C 35.390625 44.839844 33.726562 42.945312 33.726562 39.152344 C 33.726562 37.300781 34.132812 35.90625 34.941406 34.964844 C 35.75 34.023438 36.949219 33.554688 38.539062 33.554688 C 39.238281 33.554688 39.867188 33.644531 40.421875 33.828125 C 40.972656 34.007812 41.574219 34.324219 42.214844 34.777344 C 42.390625 34.894531 42.542969 34.980469 42.671875 35.03125 C 42.804688 35.082031 42.949219 35.105469 43.109375 35.105469 C 43.359375 35.105469 43.570312 34.996094 43.746094 34.777344 C 43.921875 34.558594 44.007812 34.289062 44.007812 33.96875 C 44.007812 33.75 43.96875 33.558594 43.886719 33.398438 C 43.808594 33.238281 43.679688 33.078125 43.503906 32.917969 C 42.191406 31.808594 40.507812 31.257812 38.453125 31.257812 C 36.90625 31.257812 35.5625 31.574219 34.425781 32.207031 C 33.289062 32.84375 32.410156 33.753906 31.789062 34.941406 C 31.171875 36.128906 30.859375 37.535156 30.859375 39.152344 C 30.859375 40.800781 31.171875 42.21875 31.789062 43.40625 C 32.410156 44.597656 33.304688 45.503906 34.46875 46.132812 C 35.636719 46.757812 37.015625 47.070312 38.605469 47.070312 Z M 38.605469 47.070312 "/>\n      </g>'
        },
        mp3Icon: {
            extension: ".mp3",
            path: '<g id="surface9" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 43.828125 43.710938 C 43.605469 44.28125 43.273438 44.804688 42.84375 45.265625 C 42.40625 45.730469 41.867188 46.113281 41.242188 46.398438 C 40.597656 46.699219 39.851562 46.855469 39.027344 46.855469 C 38.328125 46.855469 37.703125 46.757812 37.160156 46.570312 C 36.609375 46.378906 36.160156 46.136719 35.769531 45.839844 C 35.386719 45.550781 35.050781 45.210938 34.796875 44.832031 C 34.570312 44.507812 34.394531 44.195312 34.265625 43.890625 C 34.140625 43.59375 34.054688 43.335938 33.996094 43.101562 C 33.792969 42.261719 34.304688 41.417969 35.140625 41.210938 C 35.980469 41.007812 36.828125 41.519531 37.03125 42.355469 C 37.039062 42.390625 37.066406 42.488281 37.144531 42.671875 C 37.191406 42.777344 37.265625 42.914062 37.371094 43.0625 C 37.4375 43.160156 37.53125 43.257812 37.65625 43.351562 C 37.792969 43.453125 37.972656 43.542969 38.195312 43.625 C 38.332031 43.667969 38.59375 43.730469 39.027344 43.730469 C 39.390625 43.730469 39.695312 43.675781 39.925781 43.566406 C 40.1875 43.445312 40.398438 43.300781 40.558594 43.132812 C 40.71875 42.957031 40.839844 42.773438 40.914062 42.578125 C 40.996094 42.371094 41.03125 42.195312 41.03125 42.023438 C 41.03125 41.789062 41 41.585938 40.921875 41.398438 C 40.871094 41.257812 40.785156 41.148438 40.660156 41.039062 C 40.515625 40.910156 40.296875 40.792969 40.011719 40.699219 C 39.6875 40.59375 39.253906 40.539062 38.738281 40.535156 C 37.882812 40.527344 37.1875 39.832031 37.1875 38.972656 L 37.1875 38.832031 C 37.1875 37.984375 37.859375 37.292969 38.699219 37.265625 C 39.070312 37.257812 39.398438 37.195312 39.679688 37.101562 C 39.921875 37.011719 40.121094 36.902344 40.273438 36.773438 C 40.40625 36.652344 40.507812 36.519531 40.582031 36.359375 C 40.652344 36.210938 40.6875 36.027344 40.6875 35.8125 C 40.6875 35.523438 40.644531 35.289062 40.574219 35.125 C 40.5 34.96875 40.414062 34.847656 40.304688 34.757812 C 40.1875 34.660156 40.042969 34.582031 39.867188 34.53125 C 39.402344 34.386719 38.878906 34.398438 38.480469 34.542969 C 38.289062 34.617188 38.121094 34.714844 37.976562 34.84375 C 37.820312 34.984375 37.695312 35.148438 37.59375 35.339844 C 37.484375 35.550781 37.40625 35.773438 37.367188 36.039062 C 37.230469 36.890625 36.429688 37.472656 35.574219 37.335938 C 34.722656 37.195312 34.140625 36.398438 34.28125 35.542969 C 34.378906 34.9375 34.5625 34.378906 34.835938 33.871094 C 35.109375 33.355469 35.464844 32.898438 35.890625 32.519531 C 36.320312 32.132812 36.824219 31.828125 37.382812 31.617188 C 38.433594 31.226562 39.667969 31.199219 40.78125 31.539062 C 41.351562 31.714844 41.863281 31.992188 42.308594 32.355469 C 42.777344 32.753906 43.148438 33.242188 43.414062 33.824219 C 43.679688 34.402344 43.8125 35.070312 43.8125 35.8125 C 43.8125 36.476562 43.679688 37.097656 43.421875 37.660156 C 43.25 38.046875 43.023438 38.394531 42.746094 38.707031 C 43.242188 39.148438 43.609375 39.671875 43.835938 40.261719 C 44.046875 40.804688 44.15625 41.398438 44.15625 42.023438 C 44.15625 42.578125 44.046875 43.148438 43.828125 43.710938 Z M 31.445312 38.492188 C 31.148438 39.140625 30.734375 39.703125 30.199219 40.164062 C 29.6875 40.605469 29.078125 40.957031 28.390625 41.199219 C 27.71875 41.4375 26.976562 41.5625 26.191406 41.5625 L 25 41.5625 L 25 45 C 25 45.859375 24.296875 46.5625 23.4375 46.5625 C 22.578125 46.5625 21.875 45.859375 21.875 45 L 21.875 32.8125 C 21.875 31.945312 22.578125 31.25 23.4375 31.25 L 26.191406 31.25 C 27.890625 31.25 29.257812 31.667969 30.253906 32.5 C 31.339844 33.398438 31.886719 34.714844 31.886719 36.40625 C 31.886719 37.148438 31.738281 37.851562 31.445312 38.492188 Z M 18.730469 45.210938 C 18.730469 46.070312 18.03125 46.773438 17.167969 46.773438 C 16.300781 46.773438 15.605469 46.070312 15.605469 45.210938 L 15.605469 39.28125 L 14.015625 43.140625 C 14.007812 43.164062 13.996094 43.191406 13.984375 43.214844 C 13.71875 43.777344 13.15625 44.117188 12.566406 44.117188 L 12.53125 44.117188 C 11.9375 44.117188 11.375 43.777344 11.109375 43.214844 L 11.082031 43.160156 L 9.339844 39.101562 L 9.339844 45.210938 C 9.339844 46.070312 8.640625 46.773438 7.777344 46.773438 C 6.910156 46.773438 6.214844 46.070312 6.214844 45.210938 L 6.214844 32.824219 C 6.214844 31.960938 6.910156 31.261719 7.777344 31.261719 L 7.835938 31.261719 C 8.472656 31.261719 9.046875 31.617188 9.335938 32.1875 L 12.527344 39.09375 L 15.59375 32.207031 C 15.894531 31.617188 16.46875 31.261719 17.105469 31.261719 L 17.167969 31.261719 C 18.03125 31.261719 18.730469 31.960938 18.730469 32.824219 Z M 41.382812 28.125 L 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.136719 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.136719 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 41.382812 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 28.257812 34.902344 C 27.835938 34.550781 27.140625 34.375 26.191406 34.375 L 25 34.375 L 25 38.4375 L 26.191406 38.4375 C 26.621094 38.4375 27.007812 38.375 27.34375 38.253906 C 27.667969 38.140625 27.929688 37.992188 28.148438 37.804688 C 28.34375 37.632812 28.492188 37.4375 28.601562 37.195312 C 28.710938 36.964844 28.757812 36.703125 28.757812 36.40625 C 28.757812 35.324219 28.382812 35.003906 28.257812 34.902344 "/>\n      <path style="fill:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(99.607843%,99.607843%,99.607843%);stroke-opacity:1;stroke-miterlimit:4;" d="M 11.34125 13.57875 C 11.345 13.5925 11.3525 13.62375 11.36375 13.67375 C 11.3775 13.7225 11.3975 13.78125 11.42625 13.85 C 11.45375 13.9175 11.49375 13.9875 11.54625 14.0625 C 11.5975 14.13875 11.66625 14.20875 11.75 14.27125 C 11.83375 14.33625 11.9375 14.38875 12.0575 14.43125 C 12.1775 14.4725 12.32 14.49375 12.4875 14.49375 C 12.67875 14.49375 12.845 14.46125 12.9875 14.39375 C 13.13 14.32875 13.24875 14.245 13.34375 14.1425 C 13.43875 14.0425 13.51125 13.93 13.55875 13.8075 C 13.6075 13.6825 13.63125 13.56375 13.63125 13.4475 C 13.63125 13.31125 13.6075 13.1825 13.5625 13.065 C 13.515 12.9475 13.4425 12.845 13.3425 12.7575 C 13.2425 12.67 13.115 12.6 12.96 12.55 C 12.805 12.49875 12.6175 12.4725 12.4 12.4725 L 12.4 12.42625 C 12.57 12.42 12.72375 12.3925 12.8625 12.34375 C 13.0025 12.29625 13.11875 12.2275 13.21625 12.14375 C 13.31375 12.05875 13.3875 11.96 13.44125 11.845 C 13.4925 11.7275 13.52 11.60125 13.52 11.46 C 13.52 11.29375 13.4925 11.1525 13.43875 11.0325 C 13.38375 10.91375 13.31125 10.81625 13.21875 10.74 C 13.1275 10.66375 13.0225 10.6075 12.90375 10.5725 C 12.78625 10.535 12.66375 10.5175 12.5375 10.5175 C 12.395 10.5175 12.26125 10.54 12.14 10.58625 C 12.0175 10.6325 11.91 10.69625 11.81875 10.77875 C 11.72625 10.8625 11.64875 10.96 11.5875 11.07375 C 11.5275 11.18875 11.48625 11.315 11.4625 11.45375 M 7.5 14.4 L 7.5 10.5 L 8.3825 10.5 C 8.8075 10.5 9.13375 10.595 9.3625 10.78375 C 9.59 10.975 9.7025 11.2625 9.7025 11.65 C 9.7025 11.81625 9.6725 11.97125 9.6075 12.11125 C 9.5425 12.2525 9.4525 12.37375 9.335 12.475 C 9.21875 12.5775 9.0775 12.65625 8.9175 12.71375 C 8.75625 12.77125 8.5775 12.8 8.3825 12.8 L 7.6 12.8 M 2.4875 14.4675 L 2.4875 10.50375 L 2.5075 10.50375 C 2.5225 10.50375 2.53375 10.5125 2.5425 10.52625 L 3.9925 13.58625 C 3.99875 13.5975 4.005 13.6075 4.00875 13.6175 M 4.02125 13.6175 C 4.02625 13.6075 4.03125 13.5975 4.0375 13.58625 L 5.44 10.52625 C 5.4475 10.5125 5.45875 10.50375 5.4725 10.50375 L 5.4925 10.50375 L 5.4925 14.4675 " transform="matrix(3.125,0,0,3.125,0,0)"/>\n      </g>'
        },
        mp4Icon: {
            extension: ".mp4",
            path: '<g id="surface6" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 36.898438 40.625 L 40.625 35.480469 L 40.625 40.625 Z M 28.761719 36.40625 C 28.761719 36.703125 28.707031 36.964844 28.605469 37.195312 C 28.496094 37.433594 28.347656 37.632812 28.148438 37.804688 C 27.929688 37.992188 27.667969 38.144531 27.34375 38.257812 C 27.003906 38.375 26.621094 38.4375 26.191406 38.4375 L 25 38.4375 L 25 34.375 L 26.191406 34.375 C 27.140625 34.375 27.835938 34.554688 28.253906 34.902344 C 28.378906 35.007812 28.761719 35.324219 28.761719 36.40625 Z M 44.6875 43.75 L 43.75 43.75 L 43.75 45.3125 C 43.75 46.175781 43.050781 46.875 42.1875 46.875 C 41.324219 46.875 40.625 46.175781 40.625 45.3125 L 40.625 43.75 L 34.066406 43.75 C 33.199219 43.75 32.503906 43.050781 32.503906 42.1875 L 32.503906 41.875 C 32.503906 41.546875 32.605469 41.226562 32.800781 40.957031 L 39.363281 31.898438 C 39.660156 31.492188 40.128906 31.25 40.628906 31.25 L 42.1875 31.25 C 43.050781 31.25 43.75 31.949219 43.75 32.8125 L 43.75 40.625 L 44.6875 40.625 C 45.550781 40.625 46.25 41.324219 46.25 42.1875 C 46.25 43.050781 45.550781 43.75 44.6875 43.75 Z M 31.445312 38.492188 C 31.148438 39.140625 30.730469 39.703125 30.195312 40.167969 C 29.6875 40.605469 29.082031 40.957031 28.390625 41.203125 C 27.71875 41.441406 26.976562 41.5625 26.191406 41.5625 L 25 41.5625 L 25 45 C 25 45.863281 24.300781 46.5625 23.4375 46.5625 C 22.578125 46.5625 21.875 45.863281 21.875 45 L 21.875 32.8125 C 21.875 31.949219 22.578125 31.25 23.4375 31.25 L 26.191406 31.25 C 27.890625 31.25 29.257812 31.671875 30.253906 32.5 C 31.339844 33.398438 31.886719 34.714844 31.886719 36.40625 C 31.886719 37.148438 31.738281 37.851562 31.445312 38.492188 Z M 18.730469 45.210938 C 18.730469 46.070312 18.027344 46.773438 17.167969 46.773438 C 16.300781 46.773438 15.605469 46.070312 15.605469 45.210938 L 15.605469 39.6875 L 14.035156 43.105469 C 14.019531 43.144531 14.003906 43.179688 13.984375 43.214844 C 13.71875 43.78125 13.15625 44.117188 12.566406 44.117188 L 12.53125 44.117188 C 11.941406 44.117188 11.378906 43.78125 11.113281 43.214844 C 11.097656 43.183594 11.078125 43.152344 11.066406 43.125 L 9.339844 39.484375 L 9.339844 45.210938 C 9.339844 46.070312 8.640625 46.773438 7.777344 46.773438 C 6.910156 46.773438 6.214844 46.070312 6.214844 45.210938 L 6.214844 32.824219 C 6.214844 31.960938 6.910156 31.261719 7.777344 31.261719 L 7.835938 31.261719 C 8.472656 31.261719 9.046875 31.617188 9.335938 32.191406 L 9.355469 32.226562 L 12.523438 38.90625 L 15.578125 32.242188 C 15.585938 32.226562 15.597656 32.210938 15.605469 32.191406 C 15.894531 31.617188 16.46875 31.261719 17.105469 31.261719 L 17.164062 31.261719 C 18.027344 31.261719 18.726562 31.960938 18.726562 32.824219 L 18.726562 45.210938 Z M 41.382812 28.125 L 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 41.382812 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface6" mask="url(#mask0)"/>\n      <path style="fill:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(99.607843%,99.607843%,99.607843%);stroke-opacity:1;stroke-miterlimit:4;" d="M 14.3 13.5 L 10.90125 13.5 L 10.90125 13.4 L 13.00125 10.5 L 13.5 10.5 L 13.5 14.5 M 7.5 14.4 L 7.5 10.5 L 8.3825 10.5 C 8.8075 10.5 9.13375 10.595 9.3625 10.78375 C 9.59 10.975 9.7025 11.2625 9.7025 11.65 C 9.7025 11.81625 9.6725 11.97125 9.6075 12.11125 C 9.5425 12.2525 9.4525 12.37375 9.335 12.47625 C 9.21875 12.5775 9.0775 12.65625 8.9175 12.71375 C 8.75625 12.77125 8.5775 12.8 8.3825 12.8 L 7.6 12.8 M 2.4875 14.4675 L 2.4875 10.50375 L 2.5075 10.50375 C 2.5225 10.50375 2.53375 10.5125 2.5425 10.52625 L 3.9925 13.58625 C 3.99875 13.5975 4.005 13.6075 4.00875 13.6175 M 4.02125 13.6175 C 4.02625 13.6075 4.03125 13.5975 4.0375 13.58625 L 5.44 10.52625 C 5.4475 10.5125 5.45875 10.50375 5.4725 10.50375 L 5.4925 10.50375 L 5.4925 14.4675 " transform="matrix(3.125,0,0,3.125,0,0)"/>\n      </g>'
        },
        oggIcon: {
            extension: ".ogg",
            path: '<g id="surface9" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.976562 47.070312 C 10.464844 47.070312 11.757812 46.75 12.859375 46.109375 C 13.960938 45.46875 14.808594 44.550781 15.40625 43.351562 C 16.003906 42.15625 16.304688 40.757812 16.304688 39.152344 C 16.304688 37.550781 16.007812 36.152344 15.417969 34.964844 C 14.828125 33.777344 13.980469 32.859375 12.882812 32.21875 C 11.78125 31.578125 10.480469 31.257812 8.976562 31.257812 C 7.472656 31.257812 6.167969 31.578125 5.0625 32.21875 C 3.953125 32.859375 3.101562 33.777344 2.511719 34.964844 C 1.921875 36.152344 1.625 37.550781 1.625 39.152344 C 1.625 40.757812 1.925781 42.15625 2.523438 43.351562 C 3.121094 44.550781 3.972656 45.46875 5.070312 46.109375 C 6.171875 46.75 7.472656 47.070312 8.976562 47.070312 Z M 8.976562 44.820312 C 7.546875 44.820312 6.433594 44.332031 5.640625 43.351562 C 4.847656 42.375 4.449219 40.976562 4.449219 39.152344 C 4.449219 37.332031 4.847656 35.933594 5.640625 34.964844 C 6.433594 33.996094 7.546875 33.507812 8.976562 33.507812 C 10.390625 33.507812 11.496094 33.996094 12.289062 34.964844 C 13.085938 35.933594 13.484375 37.332031 13.484375 39.152344 C 13.484375 40.976562 13.085938 42.375 12.289062 43.351562 C 11.496094 44.332031 10.390625 44.820312 8.976562 44.820312 Z M 26.410156 47.070312 C 27.125 47.070312 27.871094 47.011719 28.640625 46.898438 C 29.414062 46.78125 30.09375 46.621094 30.675781 46.414062 C 31.214844 46.242188 31.574219 46.015625 31.75 45.738281 C 31.921875 45.460938 32.011719 44.988281 32.011719 44.316406 L 32.011719 39.613281 C 32.011719 39.292969 31.910156 39.03125 31.703125 38.835938 C 31.5 38.640625 31.230469 38.539062 30.894531 38.539062 L 27.023438 38.539062 C 26.671875 38.539062 26.398438 38.628906 26.203125 38.804688 C 26.007812 38.976562 25.90625 39.226562 25.90625 39.546875 C 25.90625 39.867188 26.007812 40.117188 26.203125 40.289062 C 26.398438 40.464844 26.671875 40.554688 27.023438 40.554688 L 29.496094 40.554688 L 29.496094 44.425781 C 28.503906 44.703125 27.511719 44.839844 26.519531 44.839844 C 23.195312 44.839844 21.53125 42.945312 21.53125 39.152344 C 21.53125 37.300781 21.9375 35.90625 22.746094 34.964844 C 23.554688 34.023438 24.753906 33.554688 26.34375 33.554688 C 27.046875 33.554688 27.671875 33.644531 28.226562 33.828125 C 28.78125 34.007812 29.378906 34.324219 30.019531 34.777344 C 30.195312 34.894531 30.347656 34.980469 30.480469 35.03125 C 30.609375 35.082031 30.757812 35.105469 30.917969 35.105469 C 31.164062 35.105469 31.375 34.996094 31.550781 34.777344 C 31.726562 34.558594 31.8125 34.289062 31.8125 33.96875 C 31.8125 33.75 31.773438 33.558594 31.695312 33.398438 C 31.613281 33.238281 31.484375 33.078125 31.3125 32.917969 C 30 31.808594 28.3125 31.257812 26.257812 31.257812 C 24.710938 31.257812 23.371094 31.574219 22.234375 32.207031 C 21.09375 32.84375 20.214844 33.753906 19.597656 34.941406 C 18.976562 36.128906 18.667969 37.535156 18.667969 39.152344 C 18.667969 40.800781 18.976562 42.21875 19.597656 43.40625 C 20.214844 44.597656 21.109375 45.503906 22.277344 46.132812 C 23.441406 46.757812 24.820312 47.070312 26.410156 47.070312 Z M 42.445312 47.070312 C 43.160156 47.070312 43.902344 47.011719 44.675781 46.898438 C 45.449219 46.78125 46.128906 46.621094 46.710938 46.414062 C 47.25 46.242188 47.609375 46.015625 47.78125 45.738281 C 47.957031 45.460938 48.046875 44.988281 48.046875 44.316406 L 48.046875 39.613281 C 48.046875 39.292969 47.941406 39.03125 47.738281 38.835938 C 47.535156 38.640625 47.265625 38.539062 46.929688 38.539062 L 43.058594 38.539062 C 42.707031 38.539062 42.433594 38.628906 42.238281 38.804688 C 42.039062 38.976562 41.941406 39.226562 41.941406 39.546875 C 41.941406 39.867188 42.039062 40.117188 42.238281 40.289062 C 42.433594 40.464844 42.707031 40.554688 43.058594 40.554688 L 45.53125 40.554688 L 45.53125 44.425781 C 44.539062 44.703125 43.546875 44.839844 42.554688 44.839844 C 39.230469 44.839844 37.566406 42.945312 37.566406 39.152344 C 37.566406 37.300781 37.972656 35.90625 38.78125 34.964844 C 39.589844 34.023438 40.789062 33.554688 42.378906 33.554688 C 43.078125 33.554688 43.707031 33.644531 44.261719 33.828125 C 44.816406 34.007812 45.414062 34.324219 46.054688 34.777344 C 46.230469 34.894531 46.382812 34.980469 46.515625 35.03125 C 46.644531 35.082031 46.792969 35.105469 46.953125 35.105469 C 47.199219 35.105469 47.410156 34.996094 47.585938 34.777344 C 47.761719 34.558594 47.847656 34.289062 47.847656 33.96875 C 47.847656 33.75 47.808594 33.558594 47.726562 33.398438 C 47.648438 33.238281 47.519531 33.078125 47.34375 32.917969 C 46.03125 31.808594 44.347656 31.257812 42.292969 31.257812 C 40.746094 31.257812 39.40625 31.574219 38.265625 32.207031 C 37.128906 32.84375 36.25 33.753906 35.632812 34.941406 C 35.011719 36.128906 34.703125 37.535156 34.703125 39.152344 C 34.703125 40.800781 35.011719 42.21875 35.632812 43.40625 C 36.25 44.597656 37.144531 45.503906 38.3125 46.132812 C 39.476562 46.757812 40.855469 47.070312 42.445312 47.070312 Z M 42.445312 47.070312 "/>\n      </g>'
        },
        pdfIcon: {
            extension: ".pdf",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.59375 25 L 39.4375 25 C 41.476562 25.003906 43.484375 25.472656 45.3125 26.375 L 45.3125 15.375 C 45.347656 14.191406 44.867188 13.054688 44 12.25 L 34.625 2.875 C 33.875 2.003906 32.773438 1.523438 31.625 1.5625 L 6.625 1.5625 C 5.589844 1.5625 4.75 2.402344 4.75 3.4375 L 4.75 26.375 C 6.566406 25.480469 8.566406 25.007812 10.59375 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.71875 L 42.15625 12.5 L 34.53125 12.5 C 34.480469 12.511719 34.425781 12.511719 34.375 12.5 Z M 6.25 25.71875 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.300781 13.980469 32.316406 15.253906 33.75 15.625 C 33.957031 15.675781 34.167969 15.675781 34.375 15.625 L 43.75 15.625 L 43.75 25.71875 C 44.859375 26.09375 45.910156 26.621094 46.875 27.28125 L 46.875 15.375 C 46.964844 13.722656 46.3125 12.117188 45.09375 11 L 35.71875 1.625 C 34.648438 0.523438 33.160156 -0.0664062 31.625 0 L 6.625 0 C 5.703125 -0.015625 4.8125 0.339844 4.152344 0.984375 C 3.496094 1.632812 3.125 2.515625 3.125 3.4375 L 3.125 27.28125 C 4.09375 26.625 5.144531 26.101562 6.25 25.71875 Z M 6.25 25.71875 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.625 28.125 C 6.335938 28.117188 4.136719 29.023438 2.515625 30.640625 C 0.898438 32.261719 -0.0078125 34.460938 0 36.75 L 0 41.375 C 0 46.136719 3.863281 50 8.625 50 L 41.375 50 C 46.132812 49.984375 49.984375 46.132812 50 41.375 L 50 36.75 C 50 31.988281 46.136719 28.125 41.375 28.125 Z M 8.625 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 14.40625 41.78125 L 12.09375 41.78125 L 12.09375 45.84375 C 12.003906 46.351562 11.5625 46.726562 11.046875 46.726562 C 10.53125 46.726562 10.089844 46.351562 10 45.84375 L 10 34.78125 C 10 34.210938 10.460938 33.75 11.03125 33.75 L 14.40625 33.75 C 15.925781 33.617188 17.390625 34.351562 18.191406 35.648438 C 18.992188 36.945312 18.992188 38.585938 18.191406 39.882812 C 17.390625 41.179688 15.925781 41.914062 14.40625 41.78125 Z M 12.09375 39.6875 L 14.40625 39.6875 C 15.152344 39.78125 15.882812 39.4375 16.289062 38.804688 C 16.691406 38.171875 16.691406 37.359375 16.289062 36.726562 C 15.882812 36.09375 15.152344 35.75 14.40625 35.84375 L 12.09375 35.84375 Z M 12.09375 39.6875 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 20.3125 45.84375 L 20.3125 34.78125 C 20.3125 34.210938 20.773438 33.75 21.34375 33.75 L 23.5625 33.75 C 27.1875 33.75 30.125 36.6875 30.125 40.3125 C 30.125 43.9375 27.1875 46.875 23.5625 46.875 L 21.34375 46.875 C 20.773438 46.875 20.3125 46.414062 20.3125 45.84375 Z M 22.40625 44.78125 L 23.5625 44.78125 C 26.03125 44.78125 28.03125 42.78125 28.03125 40.3125 C 28.03125 37.84375 26.03125 35.84375 23.5625 35.84375 L 22.40625 35.84375 Z M 22.40625 44.78125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 33.1875 45.84375 L 33.1875 34.78125 C 33.183594 34.476562 33.3125 34.1875 33.542969 33.992188 C 33.769531 33.792969 34.074219 33.703125 34.375 33.75 L 40.625 33.75 C 41.132812 33.839844 41.507812 34.28125 41.507812 34.796875 C 41.507812 35.3125 41.132812 35.753906 40.625 35.84375 L 35.25 35.84375 L 35.25 39.28125 L 39.625 39.28125 C 40.195312 39.28125 40.65625 39.742188 40.65625 40.3125 C 40.65625 40.882812 40.195312 41.34375 39.625 41.34375 L 35.25 41.34375 L 35.25 45.84375 C 35.257812 46.359375 34.882812 46.796875 34.375 46.875 C 34.074219 46.921875 33.769531 46.832031 33.542969 46.632812 C 33.3125 46.4375 33.183594 46.148438 33.1875 45.84375 Z M 33.1875 45.84375 "/>\n      </g>'
        },
        defaultIcon: {
            extension: ".default",
            path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 3.117188 44.777344 C 1.394531 44.777344 0 43.386719 0 41.671875 L 0 3.484375 C 0 1.769531 1.394531 0.378906 3.117188 0.378906 L 25.792969 0.378906 C 27.164062 0.304688 28.5 0.808594 29.480469 1.765625 L 37.980469 10.230469 C 39.144531 11.242188 39.769531 12.730469 39.683594 14.265625 L 39.683594 41.671875 C 39.683594 43.386719 38.289062 44.777344 36.5625 44.777344 Z M 25.511719 3.203125 L 3.117188 3.203125 C 2.960938 3.203125 2.832031 3.328125 2.832031 3.484375 L 2.832031 41.671875 C 2.832031 41.828125 2.960938 41.957031 3.117188 41.957031 L 36.5625 41.957031 C 36.679688 41.949219 36.785156 41.867188 36.820312 41.757812 L 36.820312 14.492188 L 28.34375 14.492188 C 28.160156 14.539062 27.964844 14.539062 27.777344 14.492188 C 26.480469 14.15625 25.554688 13.007812 25.511719 11.671875 Z M 28.34375 4.640625 L 28.34375 11.671875 C 28.390625 11.683594 28.441406 11.683594 28.488281 11.671875 L 35.402344 11.671875 Z M 28.34375 4.640625 "/>\n      </g>'
        }
    };
    /**
     * MODALS MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.modals = function (editor) {
        /**
         * @return {undefined}
         */
        function init() {
            var i;
            for (i in b) {
                if (Object.prototype.hasOwnProperty.call(b, i)) {
                    var j = b[i];
                    if (j && j.$modal) {
                        j.$modal.removeData().remove();
                    }
                }
            }
            if ($overlay) {
                $overlay.removeData().remove();
            }
            b = {};
        }
        /**
         * @param {!Object} num
         * @param {boolean} success
         * @return {undefined}
         */
        function hide(num, success) {
            if (b[num]) {
                var $modal = b[num].$modal;
                var inst = $modal.data("instance") || editor;
                inst.events.enableBlur();
                $modal.hide();
                $overlay.hide();
                $(inst.o_doc).find("body").first().removeClass("fr-prevent-scroll fr-mobile");
                $modal.removeClass("fr-active");
                if (!success) {
                    inst.accessibility.restoreSelection();
                    inst.events.trigger("modals.hide");
                }
            }
        }
        /**
         * @param {!Object} n
         * @return {?}
         */
        function f(n) {
            var e;
            if ("string" == typeof n) {
                if (!b[n]) {
                    return;
                }
                e = b[n].$modal;
            } else {
                /** @type {!Object} */
                e = n;
            }
            return e && editor.node.hasClass(e, "fr-active") && editor.core.sameInstance(e) || false;
        }
        var $ = editor.$;
        if (!editor.shared.modals) {
            editor.shared.modals = {};
        }
        var $overlay;
        var b = editor.shared.modals;
        return {
            _init: function () {
                editor.events.on("shared.destroy", init, true);
            },
            get: function (type) {
                return b[type];
            },
            create: function (i, url, data) {
                if (url = '<div class="fr-modal-head-line">'.concat(url, "</div>"), editor.shared.$overlay || (editor.shared.$overlay = $(editor.doc.createElement("DIV")).addClass("fr-overlay"), $("body").first().append(editor.shared.$overlay)), $overlay = editor.shared.$overlay, editor.opts.theme && $overlay.addClass("".concat(editor.opts.theme, "-theme")), !b[i]) {
                    var e = function (item2, args) {
                        /** @type {string} */
                        var url = '<div tabIndex="-1" class="fr-modal'.concat(editor.opts.theme ? " ".concat(editor.opts.theme, "-theme") : "", '"><div class="fr-modal-wrapper">');
                        /** @type {string} */
                        var i = '<button title="'.concat(editor.language.translate("Cancel"), '" class="fr-command fr-btn fr-modal-close"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="').concat(data.SVG.close, '"/></svg></button>');
                        /** @type {string} */
                        url = url + '<div class="fr-modal-head">'.concat(item2).concat(i, "</div>");
                        /** @type {string} */
                        url = url + '<div tabIndex="-1" class="fr-modal-body">'.concat(args, "</div>");
                        /** @type {string} */
                        url = url + "</div></div>";
                        var o = $(editor.doc.createElement("DIV"));
                        return o.html(url), o.find("> .fr-modal");
                    }(url, data);
                    b[i] = {
                        $modal: e,
                        $head: e.find(".fr-modal-head"),
                        $body: e.find(".fr-modal-body")
                    };
                    if (!editor.helpers.isMobile()) {
                        e.addClass("fr-desktop");
                    }
                    $("body").first().append(e);
                    editor.events.$on(e, "click", ".fr-modal-close", function () {
                        hide(i);
                    }, true);
                    b[i].$body.css("margin-top", b[i].$head.outerHeight());
                    editor.events.$on(e, "keydown", function (event) {
                        var key = event.which;
                        return key === data.KEYCODE.ESC ? (hide(i), editor.accessibility.focusModalButton(e), false) : !(!$(event.currentTarget).is("input[type=text], textarea") && key !== data.KEYCODE.ARROW_UP && key !== data.KEYCODE.ARROW_DOWN && !editor.keys.isBrowserAction(event) && (event.preventDefault(), event.stopPropagation(), 1));
                    }, true);
                    hide(i, true);
                }
                return b[i];
            },
            show: function (rank) {
                if (b[rank]) {
                    var $modal = b[rank].$modal;
                    $modal.data("instance", editor);
                    $modal.show();
                    $overlay.show();
                    $(editor.o_doc).find("body").first().addClass("fr-prevent-scroll");
                    if (editor.helpers.isMobile()) {
                        $(editor.o_doc).find("body").first().addClass("fr-mobile");
                    }
                    $modal.addClass("fr-active");
                    editor.accessibility.focusModal($modal);
                }
            },
            hide: hide,
            resize: function (num) {
                if (b[num]) {
                    var self = b[num];
                    var $el = self.$modal;
                    var $body = self.$body;
                    var rtHeight = editor.o_win.innerHeight;
                    var middleEl = $el.find(".fr-modal-wrapper");
                    /** @type {number} */
                    var currentHeight = rtHeight - middleEl.outerHeight(true) + (middleEl.height() - ($body.outerHeight(true) - $body.height()));
                    /** @type {string} */
                    var height = "auto";
                    if (currentHeight < $body.get(0).scrollHeight) {
                        /** @type {number} */
                        height = currentHeight;
                    }
                    $body.height(height);
                }
            },
            isVisible: f,
            areVisible: function (object) {
                var e;
                for (e in b) {
                    if (Object.prototype.hasOwnProperty.call(b, e) && f(e) && (void 0 === object || b[e].$modal.data("instance") === object)) {
                        return b[e].$modal;
                    }
                }
                return false;
            }
        };
    };
    /**
     * POSITION MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.position = function (editor) {
        /**
         * @return {?}
         */
        function render() {
            var data = editor.selection.ranges(0).getBoundingClientRect();
            if (0 === data.top && 0 === data.left && 0 === data.width || 0 === data.height) {
                /** @type {boolean} */
                var n = false;
                if (0 === editor.$el.find(".fr-marker").length) {
                    editor.selection.save();
                    /** @type {boolean} */
                    n = true;
                }
                var div = editor.$el.find(".fr-marker").first();
                div.css("display", "inline");
                div.css("line-height", "");
                var options = div.offset();
                var zooomHeight = div.outerHeight();
                div.css("display", "none");
                div.css("line-height", 0);
                (data = {}).left = options && options.left;
                /** @type {number} */
                data.width = 0;
                data.height = zooomHeight;
                data.top = options && options.top - (editor.helpers.isMobile() && !editor.helpers.isIOS() || editor.opts.iframe ? 0 : editor.helpers.scrollTop());
                /** @type {number} */
                data.right = 1;
                /** @type {number} */
                data.bottom = 1;
                /** @type {boolean} */
                data.ok = true;
                if (n) {
                    editor.selection.restore();
                }
            }
            return data;
        }
        /**
         * @param {number} x
         * @param {number} value
         * @param {!Object} el
         * @param {undefined} idx
         * @return {undefined}
         */
        function _init(x, value, el, idx) {
            var $scrollerElement = el.data("container");
            if (!$scrollerElement || "BODY" === $scrollerElement.get(0).tagName && "static" === $scrollerElement.css("position") || (x && (x = x - $scrollerElement.offset().left), value && (value = value - $scrollerElement.offset().top), "BODY" !== $scrollerElement.get(0).tagName ? (x && (x = x + $scrollerElement.get(0).scrollLeft), value && (value = value + $scrollerElement.get(0).scrollTop)) : "absolute" === $scrollerElement.css("position") && (x && (x = x + $scrollerElement.position().left), value &&
                (value = value + $scrollerElement.position().top))), editor.opts.iframe && $scrollerElement && editor.$tb && $scrollerElement.get(0) !== editor.$tb.get(0)) {
                var step = editor.helpers.getPX(editor.$wp.find(".fr-iframe").css("padding-top"));
                var delta = editor.helpers.getPX(editor.$wp.find(".fr-iframe").css("padding-left"));
                if (x) {
                    x = x + (editor.$iframe.offset().left + delta);
                }
                if (value) {
                    value = value + (editor.$iframe.offset().top + step);
                }
            }
            var styleElId = function (fileInput, i) {
                var blockSize = fileInput.outerWidth(true);
                return i + blockSize > editor.$sc.get(0).clientWidth - 10 && (i = editor.$sc.get(0).clientWidth - blockSize - 10), i < 0 && (i = 10), i;
            }(el, x);
            if (x) {
                el.css("left", styleElId);
            }
            if (value) {
                el.css("top", function (element, html, ptIdx) {
                    var nearThreshold = element.outerHeight(true);
                    if (!editor.helpers.isMobile() && editor.$tb && element.parent().get(0) !== editor.$tb.get(0)) {
                        var scrollTop = element.parent().offset().top;
                        /** @type {number} */
                        var value = html - nearThreshold - (ptIdx || 0);
                        if (element.parent().get(0) === editor.$sc.get(0)) {
                            /** @type {number} */
                            scrollTop = scrollTop - element.parent().position().top;
                        }
                        var elemHeight = editor.$sc.get(0).clientHeight;
                        if (scrollTop + html + nearThreshold > editor.$sc.offset().top + elemHeight && 0 < element.parent().offset().top + value && 0 < value) {
                            if (value > editor.$wp.scrollTop()) {
                                /** @type {number} */
                                html = value;
                                element.addClass("fr-above");
                            }
                        } else {
                            element.removeClass("fr-above");
                        }
                    }
                    return html;
                }(el, value, idx));
            }
        }
        /**
         * @param {!Object} elem
         * @return {undefined}
         */
        function init(elem) {
            var self = $(elem);
            var o = self.is(".fr-sticky-on");
            var include = self.data("sticky-top");
            var exclude = self.data("sticky-scheduled");
            if (void 0 === include) {
                self.data("sticky-top", 0);
                var s = $('<div class="fr-sticky-dummy" style="height: '.concat(self.outerHeight(), 'px;"></div>'));
                editor.$box.prepend(s);
            } else {
                editor.$box.find(".fr-sticky-dummy").css("height", self.outerHeight());
            }
            if (editor.core.hasFocus() || 0 < editor.$tb.findVisible("input:focus").length) {
                var top = editor.helpers.scrollTop();
                /** @type {number} */
                var c = Math.min(Math.max(top - editor.$tb.parent().offset().top, 0), editor.$tb.parent().outerHeight() - self.outerHeight());
                if (c !== include && c !== exclude && (clearTimeout(self.data("sticky-timeout")), self.data("sticky-scheduled", c), self.outerHeight() < top - editor.$tb.parent().offset().top && self.addClass("fr-opacity-0"), self.data("sticky-timeout", setTimeout(function () {
                    var top = editor.helpers.scrollTop();
                    /** @type {number} */
                    var i = Math.min(Math.max(top - editor.$tb.parent().offset().top, 0), editor.$tb.parent().outerHeight() - self.outerHeight());
                    if (0 < i && "BODY" === editor.$tb.parent().get(0).tagName) {
                        i = i + editor.$tb.parent().position().top;
                    }
                    if (i !== include) {
                        self.css("top", Math.max(i, 0));
                        self.data("sticky-top", i);
                        self.data("sticky-scheduled", i);
                    }
                    self.removeClass("fr-opacity-0");
                }, 100))), !o) {
                    var nextPopup = editor.$tb.parent();
                    /** @type {number} */
                    var x = nextPopup.get(0).offsetWidth - nextPopup.get(0).clientWidth;
                    self.css("top", "0");
                    self.width(nextPopup.width() - x);
                    self.addClass("fr-sticky-on");
                    editor.$box.addClass("fr-sticky-box");
                }
            } else {
                clearTimeout($(elem).css("sticky-timeout"));
                self.css("top", "0");
                self.css("position", "");
                self.css("width", "");
                self.data("sticky-top", 0);
                self.removeClass("fr-sticky-on");
                editor.$box.removeClass("fr-sticky-box");
            }
        }
        /**
         * @param {!Object} href
         * @return {undefined}
         */
        function update(href) {
            if (href.offsetWidth) {
                var el = $(href);
                var size = el.outerHeight();
                var scroll = el.data("sticky-position");
                var total = $("body" === editor.opts.scrollableContainer ? editor.o_win : editor.opts.scrollableContainer).outerHeight();
                /** @type {number} */
                var t = 0;
                /** @type {number} */
                var yPos = 0;
                if ("body" !== editor.opts.scrollableContainer) {
                    t = editor.$sc.offset().top;
                    /** @type {number} */
                    yPos = $(editor.o_win).outerHeight() - t - total;
                }
                var m = "body" === editor.opts.scrollableContainer ? editor.helpers.scrollTop() : t;
                var d = el.is(".fr-sticky-on");
                if (!el.data("sticky-parent")) {
                    el.data("sticky-parent", el.parent());
                }
                var $scrollerElement = el.data("sticky-parent");
                var a = $scrollerElement.offset().top;
                var b = $scrollerElement.outerHeight();
                if (el.data("sticky-offset") ? editor.$box.find(".fr-sticky-dummy").css("height", "".concat(size, "px")) : (el.data("sticky-offset", true), el.after('<div class="fr-sticky-dummy" style="height: '.concat(size, 'px;"></div>'))), !scroll) {
                    /** @type {boolean} */
                    var u = "auto" !== el.css("top") || "auto" !== el.css("bottom");
                    if (!u) {
                        el.css("position", "fixed");
                    }
                    scroll = {
                        top: editor.node.hasClass(el.get(0), "fr-top"),
                        bottom: editor.node.hasClass(el.get(0), "fr-bottom")
                    };
                    if (!u) {
                        el.css("position", "");
                    }
                    el.data("sticky-position", scroll);
                    el.data("top", editor.node.hasClass(el.get(0), "fr-top") ? el.css("top") : "auto");
                    el.data("bottom", editor.node.hasClass(el.get(0), "fr-bottom") ? el.css("bottom") : "auto");
                }
                var g = editor.helpers.getPX(el.data("top"));
                var space = editor.helpers.getPX(el.data("bottom"));
                var inputWin = scroll.top && a < m + g && m + g <= a + b - size && (editor.helpers.isInViewPort(editor.$sc.get(0)) || "body" === editor.opts.scrollableContainer);
                var winRef = scroll.bottom && a + size < m + total - space && m + total - space < a + b;
                if (inputWin || winRef) {
                    /** @type {number} */
                    var r = $scrollerElement.get(0).offsetWidth - $scrollerElement.get(0).clientWidth;
                    el.css("width", "".concat($scrollerElement.get(0).getBoundingClientRect().width - r, "px"));
                    if (!d) {
                        el.addClass("fr-sticky-on");
                        el.removeClass("fr-sticky-off");
                        if (el.css("top")) {
                            if ("auto" !== el.data("top")) {
                                el.css("top", editor.helpers.getPX(el.data("top")) + t);
                            } else {
                                el.data("top", "auto");
                            }
                        }
                        if (el.css("bottom")) {
                            if ("auto" !== el.data("bottom")) {
                                el.css("bottom", editor.helpers.getPX(el.data("bottom")) + yPos);
                            } else {
                                el.css("bottom", "auto");
                            }
                        }
                    }
                } else {
                    if (!editor.node.hasClass(el.get(0), "fr-sticky-off")) {
                        el.css("width", "");
                        el.removeClass("fr-sticky-on");
                        el.addClass("fr-sticky-off");
                        if (el.css("top") && "auto" !== el.data("top") && scroll.top) {
                            el.css("top", 0);
                        }
                        if (el.css("bottom") && "auto" !== el.data("bottom") && scroll.bottom) {
                            el.css("bottom", 0);
                        }
                    }
                }
            }
        }
        /**
         * @return {undefined}
         */
        function add() {
            if (editor.helpers.requestAnimationFrame()(add), false !== editor.events.trigger("position.refresh")) {
                /** @type {number} */
                var i = 0;
                for (; i < editor._stickyElements.length; i++) {
                    init(editor._stickyElements[i]);
                }
            }
        }
        /**
         * @return {undefined}
         */
        function callback() {
            if (editor._stickyElements) {
                /** @type {number} */
                var index = 0;
                for (; index < editor._stickyElements.length; index++) {
                    update(editor._stickyElements[index]);
                }
            }
        }
        var $ = editor.$;
        return {
            _init: function () {
                /** @type {!Array} */
                editor._stickyElements = [];
                if (editor.helpers.isIOS()) {
                    add();
                    editor.events.$on($(editor.o_win), "scroll", function () {
                        if (editor.core.hasFocus()) {
                            /** @type {number} */
                            var page = 0;
                            for (; page < editor._stickyElements.length; page++) {
                                var $overlayContent = $(editor._stickyElements[page]);
                                var rowWithMoreColumns = $overlayContent.parent();
                                var tagHeight = editor.helpers.scrollTop();
                                if ($overlayContent.outerHeight() < tagHeight - rowWithMoreColumns.offset().top) {
                                    $overlayContent.addClass("fr-opacity-0");
                                    $overlayContent.data("sticky-top", -1);
                                    $overlayContent.data("sticky-scheduled", -1);
                                }
                            }
                        }
                    }, true);
                } else {
                    if ("body" !== editor.opts.scrollableContainer) {
                        editor.events.$on($(editor.opts.scrollableContainer), "scroll", callback, true);
                    }
                    editor.events.$on($(editor.o_win), "scroll", callback, true);
                    editor.events.$on($(editor.o_win), "resize", callback, true);
                    editor.events.on("initialized", callback);
                    editor.events.on("focus", callback);
                    editor.events.$on($(editor.o_win), "resize", "textarea", callback, true);
                }
                editor.events.on("destroy", function () {
                    /** @type {!Array} */
                    editor._stickyElements = [];
                });
            },
            forSelection: function (input) {
                var s = render();
                input.css({
                    top: 0,
                    left: 0
                });
                var phone = s.top + s.height;
                var len = s.left + s.width / 2 - input.get(0).offsetWidth / 2 + editor.helpers.scrollLeft();
                if (!editor.opts.iframe) {
                    phone = phone + editor.helpers.scrollTop();
                }
                _init(len, phone, input, s.height);
            },
            addSticky: function (c) {
                c.addClass("fr-sticky");
                if (editor.helpers.isIOS()) {
                    c.addClass("fr-sticky-ios");
                }
                c.removeClass("fr-sticky");
                editor._stickyElements.push(c.get(0));
            },
            refresh: callback,
            at: _init,
            getBoundingRect: render
        };
    };
    /**
     * REFRESH MODULE
     * 
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.refresh = function (editor) {
        /**
         * @param {!Object} array
         * @param {boolean} func
         * @return {undefined}
         */
        function each(array, func) {
            array.toggleClass("fr-disabled", func).attr("aria-disabled", func);
        }
        /**
         * @param {!Object} el
         * @return {undefined}
         */
        function init(el) {
            var options = editor.$tb.find('.fr-more-toolbar[data-name="'.concat(el.attr("data-group-name"), '"]'));
            var o = function (fileInput, r) {
                /** @type {number} */
                var px = 0;
                var markers = r.find("> .fr-command, > .fr-btn-wrap");
                markers.each(function (canCreateDiscussions, $this) {
                    px = px + $($this).outerWidth();
                });
                var i;
                var bw = editor.helpers.getPX($(markers[0]).css("margin-left"));
                var bs = editor.helpers.getPX($(markers[0]).css("margin-right"));
                return (i = "rtl" === editor.opts.direction ? editor.$tb.outerWidth() - fileInput.offset().left + editor.$tb.offset().left - (px + fileInput.outerWidth() + markers.length * (bw + bs)) / 2 : fileInput.offset().left - editor.$tb.offset().left - (px - fileInput.outerWidth() + markers.length * (bw + bs)) / 2) + px + markers.length * (bw + bs) > editor.$tb.outerWidth() && (i = i - (px + markers.length * (bw + bs) - fileInput.outerWidth()) / 2), i < 0 && (i = 0), i;
            }(el, options);
            if ("rtl" === editor.opts.direction) {
                options.css("padding-right", o);
            } else {
                options.css("padding-left", o);
            }
        }
        var $ = editor.$;
        return {
            undo: function (value) {
                each(value, !editor.undo.canDo());
            },
            redo: function (value) {
                each(value, !editor.undo.canRedo());
            },
            outdent: function (elements) {
                if (editor.node.hasClass(elements.get(0), "fr-no-refresh")) {
                    return false;
                }
                var els = editor.selection.blocks();
                /** @type {number} */
                var i = 0;
                for (; i < els.length; i++) {
                    /** @type {string} */
                    var marginFluid = "rtl" === editor.opts.direction || "rtl" === $(els[i]).css("direction") ? "margin-right" : "margin-left";
                    var block = els[0].parentElement;
                    if ("UL" != block.parentNode.tagName && "OL" != block.parentNode.tagName && "LI" != block.parentNode.tagName) {
                        return each(elements, true), true;
                    }
                    if (els[0].previousSibling && "none" == block.parentNode.style.listStyleType) {
                        return each(elements, true), true;
                    }
                    if ("LI" === els[i].tagName || "LI" === els[i].parentNode.tagName) {
                        return each(elements, false), true;
                    }
                    if (0 < editor.helpers.getPX($(els[i]).css(marginFluid))) {
                        return each(elements, false), true;
                    }
                }
                each(elements, true);
            },
            indent: function (value) {
                if (editor.node.hasClass(value.get(0), "fr-no-refresh")) {
                    return false;
                }
                var blocks = editor.selection.blocks();
                /** @type {number} */
                var i = 0;
                for (; i < blocks.length; i++) {
                    var node = blocks[i].previousSibling;
                    for (; node && node.nodeType === Node.TEXT_NODE && 0 === node.textContent.length;) {
                        node = node.previousSibling;
                    }
                    if ("LI" !== blocks[i].tagName || node) {
                        return each(value, false), true;
                    }
                    each(value, true);
                }
            },
            moreText: init,
            moreParagraph: init,
            moreMisc: init,
            moreRich: init
        };
    };
    ////////////
    // TOOLBAR
    ////////////
    Object.assign(data.DEFAULTS, {
        attribution: true,
        toolbarBottom: false,
        toolbarButtons: null,
        toolbarButtonsXS: null,
        toolbarButtonsSM: null,
        toolbarButtonsMD: null,
        toolbarContainer: null,
        toolbarInline: false,
        toolbarSticky: true,
        toolbarStickyOffset: 0,
        toolbarVisibleWithoutSelection: false
    });
    data.TOOLBAR_BUTTONS = {
        moreText: {
            buttons: ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", "textColor", "backgroundColor", "inlineClass", "inlineStyle", "clearFormatting"]
        },
        moreParagraph: {
            buttons: ["alignLeft", "alignCenter", "formatOLSimple", "alignRight", "alignJustify", "formatOL", "formatUL", "paragraphFormat", "paragraphStyle", "lineHeight", "outdent", "indent", "quote"]
        },
        moreRich: {
            buttons: ["insertLink", "insertFiles", "insertImage", "insertVideo", "insertTable", "emoticons", "fontAwesome", "specialCharacters", "embedly", "insertFile", "insertHR"]
        },
        moreMisc: {
            buttons: ["undo", "redo", "fullscreen", "print", "getPDF", "spellChecker", "selectAll", "html", "help"],
            align: "right",
            buttonsVisible: 2
        }
    };
    /** @type {null} */
    data.TOOLBAR_BUTTONS_MD = null;
    /** @type {!Object} */
    (data.TOOLBAR_BUTTONS_SM = {}).moreText = Object.assign({}, data.TOOLBAR_BUTTONS.moreText, {
        buttonsVisible: 2
    });
    /** @type {!Object} */
    data.TOOLBAR_BUTTONS_SM.moreParagraph = Object.assign({}, data.TOOLBAR_BUTTONS.moreParagraph, {
        buttonsVisible: 2
    });
    /** @type {!Object} */
    data.TOOLBAR_BUTTONS_SM.moreRich = Object.assign({}, data.TOOLBAR_BUTTONS.moreRich, {
        buttonsVisible: 2
    });
    /** @type {!Object} */
    data.TOOLBAR_BUTTONS_SM.moreMisc = Object.assign({}, data.TOOLBAR_BUTTONS.moreMisc, {
        buttonsVisible: 2
    });
    /** @type {!Object} */
    (data.TOOLBAR_BUTTONS_XS = {}).moreText = Object.assign({}, data.TOOLBAR_BUTTONS.moreText, {
        buttonsVisible: 0
    });
    /** @type {!Object} */
    data.TOOLBAR_BUTTONS_XS.moreParagraph = Object.assign({}, data.TOOLBAR_BUTTONS.moreParagraph, {
        buttonsVisible: 0
    });
    /** @type {!Object} */
    data.TOOLBAR_BUTTONS_XS.moreRich = Object.assign({}, data.TOOLBAR_BUTTONS.moreRich, {
        buttonsVisible: 0
    });
    /** @type {!Object} */
    data.TOOLBAR_BUTTONS_XS.moreMisc = Object.assign({}, data.TOOLBAR_BUTTONS.moreMisc, {
        buttonsVisible: 2
    });
    /** @type {string} */
    data.POWERED_BY = "";
    /**
     * @param {!Object} editor
     * @return {?}
     */
    data.MODULES.toolbar = function (editor) {
        /**
         * @param {!Array} data
         * @return {?}
         */
        function parse(data) {
            var cities = {};
            if (Array.isArray(data)) {
                if (!Array.isArray(data[0])) {
                    /** @type {!Array} */
                    var tmpData = [];
                    /** @type {!Array} */
                    var tmp = [];
                    /** @type {number} */
                    var i = 0;
                    for (; i < data.length; i++) {
                        if ("|" === data[i] || "-" === data[i]) {
                            if (0 < tmp.length) {
                                tmpData.push(tmp);
                            }
                            /** @type {!Array} */
                            tmp = [];
                        } else {
                            tmp.push(data[i]);
                        }
                    }
                    if (0 < tmp.length) {
                        tmpData.push(tmp);
                    }
                    /** @type {!Array} */
                    data = tmpData;
                }
                data.forEach(function (buttons, i) {
                    cities["group".concat(i + 1)] = {
                        buttons: buttons
                    };
                });
                /** @type {boolean} */
                cities.showMoreButtons = false;
            } else {
                if (!("object" !== getTypeOf(data) || Array.isArray(data))) {
                    /** @type {boolean} */
                    (cities = data).showMoreButtons = true;
                }
            }
            return cities;
        }
        /**
         * @return {?}
         */
        function create() {
            var viewportCenter = editor.helpers.screenSize();
            return stylesheets[interestingPoint = viewportCenter];
        }
        /**
         * @return {undefined}
         */
        function resize() {
            var relatedWebsiteList = editor.$tb.find(".fr-more-toolbar");
            /** @type {string} */
            var t = "";
            /** @type {number} */
            var i = 0;
            for (; i < relatedWebsiteList.length; i++) {
                var element = $(relatedWebsiteList[i]);
                if (element.hasClass("fr-expanded")) {
                    (function () {
                        var b = editor.helpers.getPX(element.css("padding-left"));
                        var $columnHeaders = element.find("> .fr-command, > .fr-btn-wrap");
                        var $this = $($columnHeaders[0]);
                        var tmp32 = editor.helpers.getPX($this.css("margin-left"));
                        var const3 = editor.helpers.getPX($this.css("margin-right"));
                        var sitesowners = editor.helpers.getPX($this.css("margin-top"));
                        var skipSteps = editor.helpers.getPX($this.css("margin-bottom"));
                        if ($columnHeaders.each(function (canCreateDiscussions, $this) {
                            b = b + ($($this).outerWidth() + tmp32 + const3);
                        }), editor.$tb.outerWidth() < b) {
                            /** @type {number} */
                            var stepSize = Math.floor(b / editor.$tb.outerWidth());
                            b = b + stepSize * (b / element[0].childElementCount);
                            /** @type {number} */
                            stepSize = Math.ceil(b / editor.$tb.outerWidth());
                            /** @type {number} */
                            var val = (editor.helpers.getPX($this.css("height")) + sitesowners + skipSteps) * stepSize;
                            element.css("height", val);
                            /** @type {number} */
                            t = val;
                        }
                    })();
                } else {
                    element.css("height", "");
                }
            }
            editor.$tb.css("padding-bottom", t);
        }
        /**
         * @return {undefined}
         */
        function show() {
            if (interestingPoint !== editor.helpers.screenSize()) {
                var row = create();
                var that = $();
                var a = $();
                var index;
                for (index in editor.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").addClass("fr-hidden"), function () {
                    var e = editor.$tb.find(".fr-btn-grp, .fr-more-toolbar");
                    /**
                     * @param {number} item
                     * @return {undefined}
                     */
                    var render = function (item) {
                        var n = $(e[item]);
                        n.children().each(function (canCreateDiscussions, t) {
                            n.before(t);
                        });
                        n.remove();
                    };
                    /** @type {number} */
                    var i = 0;
                    for (; i < e.length; i++) {
                        render(i);
                    }
                }(), row) {
                    var e = row[index];
                    if (e.buttons) {
                        var list = void 0;
                        /** @type {number} */
                        var othersPriority = 0;
                        /** @type {number} */
                        var authedPriority = 3;
                        var $text = $('<div class="fr-btn-grp fr-float-'.concat(row[index].align ? row[index].align : "left", '"></div>'));
                        if (row.showMoreButtons) {
                            list = $('<div class="fr-more-toolbar"></div>').data("name", "".concat(index, "-").concat(editor.id));
                        }
                        /** @type {number} */
                        var i = 0;
                        for (; i < e.buttons.length; i++) {
                            if (void 0 !== e.buttonsVisible) {
                                authedPriority = e.buttonsVisible;
                            }
                            var $btn = editor.$tb.find('> .fr-command[data-cmd="' + e.buttons[i] + '"], > div.fr-btn-wrap > .fr-command[data-cmd="' + e.buttons[i] + '"]');
                            /** @type {null} */
                            var blur = null;
                            if (editor.node.hasClass($btn.next().get(0), "fr-dropdown-menu")) {
                                blur = $btn.next();
                            }
                            if (editor.node.hasClass($btn.next().get(0), "fr-options")) {
                                $btn.removeClass("fr-hidden");
                                $btn.next().removeClass("fr-hidden");
                                $btn = $btn.parent();
                            }
                            $btn.removeClass("fr-hidden");
                            if (row.showMoreButtons && authedPriority <= othersPriority) {
                                list.append($btn);
                                if (blur) {
                                    list.append(blur);
                                }
                            } else {
                                $text.append($btn);
                                if (blur) {
                                    $text.append(blur);
                                }
                            }
                            othersPriority++;
                        }
                        if (row.showMoreButtons && authedPriority < othersPriority) {
                            var title = editor.$tb.find('.fr-command[data-cmd="'.concat(index, '"]'));
                            if (0 < title.length) {
                                title.removeClass("fr-hidden fr-open");
                            } else {
                                /** @type {string} */
                                var action = index;
                                var callback = data.COMMANDS[action];
                                /** @type {boolean} */
                                callback.more_btn = true;
                                title = $(editor.button.build(action, callback, true));
                                editor.button.addButtons(title);
                            }
                            $text.append(title);
                        }
                        that.push($text);
                        if (row.showMoreButtons) {
                            a.push(list);
                        }
                    }
                }
                if (editor.opts.toolbarBottom) {
                    editor.$tb.append(a);
                    editor.$tb.find(".fr-newline").remove();
                    editor.$tb.append('<div class="fr-newline"></div>');
                    editor.$tb.append(that);
                } else {
                    editor.$tb.append(that);
                    editor.$tb.find(".fr-newline").remove();
                    editor.$tb.append('<div class="fr-newline"></div>');
                    editor.$tb.append(a);
                }
                editor.$tb.removeClass("fr-toolbar-open");
                editor.$box.removeClass("fr-toolbar-open");
                editor.events.trigger("codeView.toggle");
            }
            resize();
        }
        /**
         * @param {!Object} e
         * @param {string} islongclick
         * @return {undefined}
         */
        function render(e, islongclick) {
            setTimeout(function () {
                if ((!e || e.which != data.KEYCODE.ESC) && editor.selection.inEditor() && editor.core.hasFocus() && !editor.popups.areVisible() && "false" != $(editor.selection.blocks()[0]).closest("table").attr("contenteditable") && (editor.opts.toolbarVisibleWithoutSelection || !editor.selection.isCollapsed() && !editor.keys.isIME() || islongclick)) {
                    if (editor.$tb.data("instance", editor), false === editor.events.trigger("toolbar.show", [e])) {
                        return;
                    }
                    editor.$tb.show();
                    if (!editor.opts.toolbarContainer) {
                        editor.position.forSelection(editor.$tb);
                    }
                    if (1 < editor.opts.zIndex) {
                        editor.$tb.css("z-index", editor.opts.zIndex + 1);
                    } else {
                        editor.$tb.css("z-index", null);
                    }
                }
            }, 0);
        }
        /**
         * @param {!Object} e
         * @return {?}
         */
        function callback(e) {
            return (!e || "blur" !== e.type || document.activeElement !== editor.el) && (!(!e || "keydown" !== e.type || !editor.keys.ctrlKey(e)) || !!editor.button.getButtons(".fr-dropdown.fr-active").next().find(editor.o_doc.activeElement).length || void (false !== editor.events.trigger("toolbar.hide") && editor.$tb.hide()));
        }
        /**
         * @param {!Object} event
         * @return {undefined}
         */
        function listener(event) {
            clearTimeout(resizeTimeout);
            if (!(event && event.which === data.KEYCODE.ESC)) {
                /** @type {number} */
                resizeTimeout = setTimeout(render, editor.opts.typingTimer);
            }
        }
        /**
         * @return {undefined}
         */
        function _init() {
            editor.events.on("window.mousedown", callback);
            editor.events.on("keydown", callback);
            editor.events.on("blur", callback);
            editor.events.$on(editor.$tb, "transitionend", ".fr-more-toolbar", function () {
                editor.position.forSelection(editor.$tb);
            });
            if (!editor.helpers.isMobile()) {
                editor.events.on("window.mouseup", render);
            }
            if (editor.helpers.isMobile()) {
                if (!editor.helpers.isIOS()) {
                    editor.events.on("window.touchend", render);
                    if (editor.browser.mozilla) {
                        setInterval(render, 200);
                    }
                }
            } else {
                editor.events.on("window.keyup", listener);
            }
            editor.events.on("keydown", function (event) {
                if (event && event.which === data.KEYCODE.ESC) {
                    editor.events.trigger("toolbar.esc");
                }
            });
            editor.events.on("keydown", function (e) {
                if (e.which === data.KEYCODE.ALT) {
                    return e.stopPropagation(), false;
                }
            }, true);
            editor.events.$on(editor.$wp, "scroll.toolbar", render);
            editor.events.on("commands.after", render);
            if (editor.helpers.isMobile()) {
                editor.events.$on(editor.$doc, "selectionchange", listener);
                editor.events.$on(editor.$doc, "orientationchange", render);
            }
        }
        /**
         * @return {undefined}
         */
        function close() {
            editor.$tb.html("").removeData().remove();
            /** @type {null} */
            editor.$tb = null;
            if (editor.$second_tb) {
                editor.$second_tb.html("").removeData().remove();
                /** @type {null} */
                editor.$second_tb = null;
            }
        }
        /**
         * @return {undefined}
         */
        function toggle() {
            editor.$box.removeClass("fr-top fr-bottom fr-inline fr-basic");
            editor.$box.find(".fr-sticky-dummy").remove();
        }
        /**
         * @return {undefined}
         */
        function init() {
            if (editor.opts.theme) {
                editor.$tb.addClass("".concat(editor.opts.theme, "-theme"));
            }
            if (1 < editor.opts.zIndex) {
                editor.$tb.css("z-index", editor.opts.zIndex + 1);
            }
            if ("auto" !== editor.opts.direction) {
                editor.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(editor.opts.direction));
            }
            if (editor.helpers.isMobile()) {
                editor.$tb.addClass("fr-mobile");
            } else {
                editor.$tb.addClass("fr-desktop");
            }
            if (editor.opts.toolbarContainer) {
                if (editor.opts.toolbarInline) {
                    _init();
                    callback();
                }
                if (editor.opts.toolbarBottom) {
                    editor.$tb.addClass("fr-bottom");
                } else {
                    editor.$tb.addClass("fr-top");
                }
            } else {
                if (editor.opts.toolbarInline) {
                    editor.$sc.append(editor.$tb);
                    editor.$tb.data("container", editor.$sc);
                    editor.$tb.addClass("fr-inline");
                    _init();
                    /** @type {boolean} */
                    editor.opts.toolbarBottom = false;
                } else {
                    if (editor.opts.toolbarBottom && !editor.helpers.isIOS()) {
                        editor.$box.append(editor.$tb);
                        editor.$tb.addClass("fr-bottom");
                        editor.$box.addClass("fr-bottom");
                    } else {
                        /** @type {boolean} */
                        editor.opts.toolbarBottom = false;
                        editor.$box.prepend(editor.$tb);
                        editor.$tb.addClass("fr-top");
                        editor.$box.addClass("fr-top");
                    }
                    editor.$tb.addClass("fr-basic");
                    if (editor.opts.toolbarSticky) {
                        if (editor.opts.toolbarStickyOffset) {
                            if (editor.opts.toolbarBottom) {
                                editor.$tb.css("bottom", editor.opts.toolbarStickyOffset);
                            } else {
                                editor.$tb.css("top", editor.opts.toolbarStickyOffset);
                            }
                        }
                        editor.position.addSticky(editor.$tb);
                    }
                }
            }
            (function () {
                var e = editor.button.buildGroup(create());
                editor.$tb.append(e);
                resize();
                editor.button.bindCommands(editor.$tb);
            })();
            editor.events.$on($(editor.o_win), "resize", show);
            editor.events.$on($(editor.o_win), "orientationchange", show);
            editor.accessibility.registerToolbar(editor.$tb);
            editor.events.$on(editor.$tb, "".concat(editor._mousedown, " ").concat(editor._mouseup), function (event) {
                var npt = event.originalEvent ? event.originalEvent.target || event.originalEvent.originalTarget : null;
                if (npt && "INPUT" !== npt.tagName && !editor.edit.isDisabled()) {
                    return event.stopPropagation(), event.preventDefault(), false;
                }
            }, true);
            if (editor.helpers.isMobile()) {
                editor.events.$on(editor.$tb, "click", function () {
                    if (!editor.popups.areVisible().length) {
                        editor.$el.focus();
                    }
                });
            }
            editor.events.$on(editor.$tb, "transitionend", ".fr-more-toolbar", function () {
                if (editor.$box.hasClass("fr-fullscreen")) {
                    /** @type {number} */
                    editor.opts.height = editor.o_win.innerHeight - (editor.opts.toolbarInline ? 0 : editor.$tb.outerHeight() + (editor.$second_tb ? editor.$second_tb.outerHeight() : 0));
                    editor.size.refresh();
                }
            });
        }
        var interestingPoint;
        var $ = editor.$;
        /** @type {!Array} */
        var stylesheets = [];
        stylesheets[data.XS] = parse(editor.opts.toolbarButtonsXS || editor.opts.toolbarButtons || data.TOOLBAR_BUTTONS_XS || data.TOOLBAR_BUTTONS || []);
        stylesheets[data.SM] = parse(editor.opts.toolbarButtonsSM || editor.opts.toolbarButtons || data.TOOLBAR_BUTTONS_SM || data.TOOLBAR_BUTTONS || []);
        stylesheets[data.MD] = parse(editor.opts.toolbarButtonsMD || editor.opts.toolbarButtons || data.TOOLBAR_BUTTONS_MD || data.TOOLBAR_BUTTONS || []);
        stylesheets[data.LG] = parse(editor.opts.toolbarButtons || data.TOOLBAR_BUTTONS || []);
        /** @type {null} */
        var resizeTimeout = null;
        /** @type {boolean} */
        var isHandlingData = false;
        return {
            _init: function () {
                if (editor.$sc = $(editor.opts.scrollableContainer).first(), !editor.$wp) {
                    return false;
                }
                if (!(editor.opts.toolbarInline || editor.opts.toolbarBottom)) {
                    editor.$second_tb = $(editor.doc.createElement("div")).attr("class", "fr-second-toolbar");
                    editor.$box.append(editor.$second_tb);
                    if (false !== editor.ul || editor.opts.attribution) {
                        editor.$second_tb.prepend(data.POWERED_BY);
                    }
                }
                if (editor.opts.toolbarContainer) {
                    if (editor.shared.$tb) {
                        editor.$tb = editor.shared.$tb;
                        if (editor.opts.toolbarInline) {
                            _init();
                        }
                    } else {
                        editor.shared.$tb = $(editor.doc.createElement("DIV"));
                        editor.shared.$tb.addClass("fr-toolbar");
                        editor.$tb = editor.shared.$tb;
                        $(editor.opts.toolbarContainer).append(editor.$tb);
                        init();
                        editor.$tb.data("instance", editor);
                    }
                    if (editor.opts.toolbarInline) {
                        editor.$box.addClass("fr-inline");
                    } else {
                        editor.$box.addClass("fr-basic");
                    }
                    editor.events.on("focus", function () {
                        editor.$tb.data("instance", editor);
                    }, true);
                    /** @type {boolean} */
                    editor.opts.toolbarInline = false;
                } else {
                    if (editor.opts.toolbarInline) {
                        editor.$box.addClass("fr-inline");
                        if (editor.shared.$tb) {
                            editor.$tb = editor.shared.$tb;
                            _init();
                        } else {
                            editor.shared.$tb = $(editor.doc.createElement("DIV"));
                            editor.shared.$tb.addClass("fr-toolbar");
                            editor.$tb = editor.shared.$tb;
                            init();
                        }
                    } else {
                        editor.$box.addClass("fr-basic");
                        editor.$tb = $(editor.doc.createElement("DIV"));
                        editor.$tb.addClass("fr-toolbar");
                        init();
                        editor.$tb.data("instance", editor);
                    }
                }
                editor.events.on("destroy", toggle, true);
                editor.events.on(editor.opts.toolbarInline || editor.opts.toolbarContainer ? "shared.destroy" : "destroy", close, true);
                editor.events.on("edit.on", function () {
                    editor.$tb.removeClass("fr-disabled").removeAttr("aria-disabled");
                });
                editor.events.on("edit.off", function () {
                    editor.$tb.addClass("fr-disabled").attr("aria-disabled", true);
                });
                editor.events.on("shortcut", function (e, i, j) {
                    var val;
                    if (i && !j ? val = editor.$tb.find('.fr-command[data-cmd="'.concat(i, '"]')) : i && j && (val = editor.$tb.find('.fr-command[data-cmd="'.concat(i, '"][data-param1="').concat(j, '"]'))), val.length && (e.preventDefault(), e.stopPropagation(), val.parents(".fr-toolbar").data("instance", editor), "keydown" === e.type)) {
                        return editor.button.exec(val), false;
                    }
                });
            },
            hide: callback,
            show: function () {
                if (false === editor.events.trigger("toolbar.show")) {
                    return false;
                }
                editor.$tb.show();
            },
            showInline: render,
            disable: function () {
                if (!isHandlingData && editor.$tb) {
                    editor.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", true);
                    /** @type {boolean} */
                    isHandlingData = true;
                }
            },
            enable: function () {
                if (isHandlingData && editor.$tb) {
                    editor.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", false);
                    /** @type {boolean} */
                    isHandlingData = false;
                }
                editor.button.bulkRefresh();
            },
            setMoreToolbarsHeight: resize
        };
    };
    //////////
    // OTHER
    //////////
    /** @type {!Array} */
    var events = ["scroll", "wheel", "touchmove", "touchstart", "touchend"];
    /** @type {!Array} */
    var vendors = ["webkit", "moz", "ms", "o"];
    /** @type {!Array} */
    var optForFields = ["transitionend"];
    /** @type {!CSSStyleDeclaration} */
    var s2 = document.createElement("div").style;
    /** @type {!Array} */
    var prefixes = ["Webkit", "Moz", "ms", "O", "css", "style"];
    var style = {
        visibility: "hidden",
        display: "block"
    };
    /** @type {!Array} */
    var eventTypes = ["focus", "blur", "click"];
    var keycodes = {};
    /**
     * @param {!Object} event
     * @param {!Object} item
     * @return {?}
     */
    var handler = function (event, item) {
        return {
            altKey: event.altKey,
            bubbles: event.bubbles,
            cancelable: event.cancelable,
            changedTouches: event.changedTouches,
            ctrlKey: event.ctrlKey,
            detail: event.detail,
            eventPhase: event.eventPhase,
            metaKey: event.metaKey,
            pageX: event.pageX,
            pageY: event.pageY,
            shiftKey: event.shiftKey,
            view: event.view,
            char: event.char,
            key: event.key,
            keyCode: event.keyCode,
            button: event.button,
            buttons: event.buttons,
            clientX: event.clientX,
            clientY: event.clientY,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            pointerId: event.pointerId,
            pointerType: event.pointerType,
            screenX: event.screenX,
            screenY: event.screenY,
            targetTouches: event.targetTouches,
            toElement: event.toElement,
            touches: event.touches,
            type: event.type,
            which: event.which,
            target: event.target,
            currentTarget: item,
            originalEvent: event,
            stopPropagation: function () {
                event.stopPropagation();
            },
            stopImmediatePropagation: function () {
                event.stopImmediatePropagation();
            },
            preventDefault: function () {
                if (-1 === events.indexOf(event.type)) {
                    event.preventDefault();
                }
            }
        };
    };
    /**
     * @param {(!Function|string)} fn
     * @param {string} name
     * @return {?}
     */
    var on = function (fn, name) {
        return function (e) {
            var item = e.target;
            if (name) {
                name = find(name);
                for (; item && item !== this;) {
                    if (item.matches && item.matches(find(name))) {
                        fn.call(item, handler(e, item));
                    }
                    item = item.parentNode;
                }
            } else {
                if (function (elem) {
                    return elem.ownerDocument && elem.ownerDocument.body.contains(elem) || "#document" === elem.nodeName || "HTML" === elem.nodeName || elem === window;
                }(item)) {
                    fn.call(item, handler(e, item));
                }
            }
        };
    };
    /**
     * @param {!Object} element
     * @param {string} selector
     * @return {?}
     */
    var jQuery = function (element, selector) {
        return new Selector(element, selector);
    };
    /**
     * @param {string} fn
     * @return {?}
     */
    var find = function (fn) {
        return fn && "string" == typeof fn ? fn.replace(/^\s*>/g, ":scope >").replace(/,\s*>/g, ", :scope >") : fn;
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    var call = function (callback) {
        return "function" == typeof callback && "number" != typeof callback.nodeType;
    };
    /** @type {function(!Object, string): ?} */
    var $ = jQuery;
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        length: 0,
        contains: function (elem) {
            if (!elem) {
                return false;
            }
            if (Array.isArray(elem)) {
                /** @type {number} */
                var i = 0;
                for (; i < elem.length; i++) {
                    if (this.contains(elem[i]) && this != elem[i]) {
                        return true;
                    }
                }
                return false;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                /** @type {!Object} */
                var cur = elem;
                for (; cur;) {
                    if (cur == this[i] || cur[0] && cur[0].isEqualNode(this[i])) {
                        return true;
                    }
                    cur = cur.parentNode;
                }
            }
            return false;
        },
        findVisible: function (el) {
            var t = this.find(el);
            /** @type {number} */
            var i = t.length - 1;
            for (; 0 <= i; i--) {
                if (!$(t[i]).isVisible()) {
                    t.splice(i, 1);
                }
            }
            return t;
        },
        formatParams: function (data) {
            return "".concat(Object.keys(data).map(function (name) {
                return "".concat(name, "=").concat(encodeURIComponent(data[name]));
            }).join("&")) || "";
        },
        ajax: function (options) {
            /** @type {!XMLHttpRequest} */
            var xhr = new XMLHttpRequest;
            var query = this.formatParams(options.data);
            var i;
            for (i in "GET" === options.method.toUpperCase() && (options.url = query ? options.url + "?" + query : options.url), xhr.open(options.method, options.url, true), options.withCredentials && (xhr.withCredentials = true), options.crossDomain && xhr.setRequestHeader("Access-Control-Allow-Origin", "*"), options.headers) {
                if (Object.prototype.hasOwnProperty.call(options.headers, i)) {
                    xhr.setRequestHeader(i, options.headers[i]);
                }
            }
            if (!Object.prototype.hasOwnProperty.call(options.headers, "Content-Type")) {
                if ("json" === options.dataType) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                } else {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                }
            }
            /**
             * @return {undefined}
             */
            xhr.onload = function () {
                if (200 == xhr.status) {
                    /** @type {string} */
                    var data = xhr.responseText;
                    if ("json" === options.dataType) {
                        /** @type {*} */
                        data = JSON.parse(data);
                    }
                    options.done(data, xhr.status, xhr);
                } else {
                    options.fail(xhr);
                }
            };
            xhr.send(query);
        },
        prevAll: function () {
            var e = $();
            if (!this[0]) {
                return e;
            }
            var start = this[0];
            for (; start && start.previousSibling;) {
                start = start.previousSibling;
                e.push(start);
            }
            return e;
        },
        index: function (value) {
            return value ? "string" == typeof value ? [].indexOf.call($(value), this[0]) : [].indexOf.call(this, value.length ? value[0] : value) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        isVisible: function () {
            return !!this[0] && !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
        },
        toArray: function () {
            return [].slice.call(this);
        },
        get: function (i) {
            return null == i ? [].slice.call(this) : i < 0 ? this[i + this.length] : this[i];
        },
        pushStack: function (name) {
            var ret = jQuery.merge(this.constructor(), name);
            return ret.prevObject = this, ret;
        },
        wrapAll: function (html) {
            var t;
            return this[0] && (call(html) && (html = html.call(this[0])), t = jQuery(html, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var elem = this;
                for (; elem.firstElementChild;) {
                    elem = elem.firstElementChild;
                }
                return elem;
            }).append(this)), this;
        },
        wrapInner: function (child) {
            if ("string" == typeof child) {
                /** @type {!Array<string>} */
                var selsRaw = child.split(" ");
                /** @type {number} */
                var si = 0;
                for (; si < selsRaw.length && 0 === selsRaw[si].trim().length;) {
                    si++;
                }
                if (si < selsRaw.length && ($(child).length && selsRaw[si].trim() === $(child)[0].tagName && (child = document.createElement(selsRaw[si].trim())), si++), "string" != typeof child) {
                    var elem = $(child);
                    for (; si < selsRaw.length; si++) {
                        /** @type {string} */
                        selsRaw[si] = selsRaw[si].trim();
                        /** @type {!Array<string>} */
                        var attributes = selsRaw[si].split("=");
                        elem.attr(attributes[0], attributes[1].replace('"', ""));
                    }
                }
            }
            for (; this[0].firstChild && this[0].firstChild !== child && "string" != typeof child;) {
                child.appendChild(this[0].firstChild);
            }
        },
        wrap: function (html) {
            var isFunction = call(html);
            return this.each(function (i) {
                $(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                if (!(this.nodeName && this.nodeName.toLowerCase() === name.toLowerCase())) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            });
        },
        grep: function (elems, callback, a) {
            /** @type {!Array} */
            var ret = [];
            /** @type {number} */
            var i = 0;
            var length = elems.length;
            /** @type {boolean} */
            var booA = !a;
            for (; i < length; i++) {
                if (!callback(elems[i], i) !== booA) {
                    ret.push(elems[i]);
                }
            }
            return ret;
        },
        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, localMediaStream) {
                return callback.call(elem, localMediaStream, elem);
            }));
        },
        slice: function () {
            return this.pushStack([].slice.apply(this, arguments));
        },
        each: function (callback) {
            if (this.length) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length && false !== callback.call(this[i], i, this[i]); i++) {
                }
            }
            return this;
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (i) {
            var len = this.length;
            var end = +i + (i < 0 ? len : 0);
            return this.pushStack(0 <= end && end < len ? [this[end]] : []);
        },
        empty: function () {
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                /** @type {string} */
                this[i].innerHTML = "";
            }
        },
        contents: function () {
            var self = $();
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                var n = this[i].childNodes;
                /** @type {number} */
                var s = 0;
                for (; s < n.length; s++) {
                    self.push(n[s]);
                }
            }
            return self;
        },
        attr: function (name, key) {
            if ("object" === getTypeOf(name)) {
                var key;
                for (key in name) {
                    if (Object.prototype.hasOwnProperty.call(name, key) && null !== name[key]) {
                        this.attr(key, name[key]);
                    }
                }
                return this;
            }
            if (void 0 === key) {
                return 0 === this.length || !this[0].getAttribute && "checked" !== name ? void 0 : "checked" === name ? this[0].checked : "tagName" === name ? this[0].tagName : this[0].getAttribute(name);
            }
            if ("checked" === name) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    this[i].checked = key;
                }
            } else {
                if ("tagName" === name) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.length; i++) {
                        this[i].tagName = key;
                    }
                } else {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.length; i++) {
                        this[i].setAttribute(name, key);
                    }
                }
            }
            return this;
        },
        removeAttr: function (name) {
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (this[i].removeAttribute) {
                    this[i].removeAttribute(name);
                }
            }
            return this;
        },
        hide: function () {
            return this.css("display", "none"), this;
        },
        show: function () {
            return this.css("display", "block"), this;
        },
        focus: function () {
            return this.length && this[0].focus(), this;
        },
        blur: function () {
            return this.length && this[0].blur(), this;
        },
        data: function (name, n) {
            if (void 0 !== n) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    if ("object" !== getTypeOf(this[i]["data-" + name] = n) && "function" != typeof n && this[i].setAttribute) {
                        this[i].setAttribute("data-" + name, n);
                    }
                }
                return this;
            }
            if (void 0 !== n) {
                return this.attr("data-" + name, n);
            }
            if (0 !== this.length) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    var thisNodeProperties = this[i]["data-" + name];
                    if (null == thisNodeProperties && this[i].getAttribute && (thisNodeProperties = this[i].getAttribute("data-" + name)), void 0 !== thisNodeProperties && null != thisNodeProperties) {
                        return thisNodeProperties;
                    }
                }
            }
        },
        removeData: function (name) {
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (this[i].removeAttribute) {
                    this[i].removeAttribute("data-" + name);
                }
                /** @type {null} */
                this[i]["data-" + name] = null;
            }
            return this;
        },
        getCorrectStyleName: function (key) {
            if (!keycodes[key]) {
                var k;
                if (key in s2) {
                    /** @type {string} */
                    k = key;
                }
                var method = key[0].toUpperCase() + key.slice(1);
                /** @type {number} */
                var i = prefixes.length;
                for (; i--;) {
                    if ((key = prefixes[i] + method) in s2) {
                        /** @type {string} */
                        k = key;
                    }
                }
                keycodes[key] = k;
            }
            return keycodes[key];
        },
        css: function (name, value) {
            if (void 0 !== value) {
                if (0 === this.length) {
                    return this;
                }
                if (!(("string" != typeof value || "" === value.trim() || isNaN(value)) && "number" != typeof value || !/(margin)|(padding)|(height)|(width)|(top)|(left)|(right)|(bottom)/gi.test(name) || /(line-height)/gi.test(name))) {
                    /** @type {string} */
                    value = value + "px";
                }
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    name = $(this).getCorrectStyleName(name);
                    this[i].style[name] = value;
                }
                return this;
            }
            if ("string" == typeof name) {
                if (0 === this.length) {
                    return;
                }
                var doc = this[0].ownerDocument || document;
                var styleUtils = doc.defaultView || doc.parentWindow;
                return name = $(this).getCorrectStyleName(name), styleUtils.getComputedStyle(this[0])[name];
            }
            var key;
            for (key in name) {
                if (Object.prototype.hasOwnProperty.call(name, key)) {
                    this.css(key, name[key]);
                }
            }
            return this;
        },
        toggleClass: function (value, state) {
            if (1 < value.split(" ").length) {
                var keywordResults = value.split(" ");
                /** @type {number} */
                var i = 0;
                for (; i < keywordResults.length; i++) {
                    this.toggleClass(keywordResults[i], state);
                }
                return this;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (void 0 === state) {
                    if (this[i].classList.contains(value)) {
                        this[i].classList.remove(value);
                    } else {
                        this[i].classList.add(value);
                    }
                } else {
                    if (state) {
                        if (!this[i].classList.contains(value)) {
                            this[i].classList.add(value);
                        }
                    } else {
                        if (this[i].classList.contains(value)) {
                            this[i].classList.remove(value);
                        }
                    }
                }
            }
            return this;
        },
        addClass: function (value) {
            if (0 === value.length) {
                return this;
            }
            if (1 < value.split(" ").length) {
                var class_names = value.split(" ");
                /** @type {number} */
                var i = 0;
                for (; i < class_names.length; i++) {
                    this.addClass(class_names[i]);
                }
                return this;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                this[i].classList.add(value);
            }
            return this;
        },
        removeClass: function (value) {
            if (1 < value.split(" ").length) {
                var commentLines = value.split(" ");
                /** @type {number} */
                var i = 0;
                for (; i < commentLines.length; i++) {
                    commentLines[i] = commentLines[i].trim();
                    if (commentLines[i].length) {
                        this.removeClass(commentLines[i]);
                    }
                }
                return this;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (value.length) {
                    this[i].classList.remove(value);
                }
            }
            return this;
        },
        getClass: function (elem) {
            return elem.getAttribute && elem.getAttribute("class") || "";
        },
        stripAndCollapse: function (strRect) {
            return (strRect.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
        },
        hasClass: function (element) {
            var t;
            var parent;
            /** @type {number} */
            var r = 0;
            /** @type {string} */
            t = " " + element + " ";
            for (; parent = this[r++];) {
                if (1 === parent.nodeType && -1 < (" " + $(this).stripAndCollapse($(this).getClass(parent)) + " ").indexOf(t)) {
                    return true;
                }
            }
            return false;
        },
        scrollTop: function (y) {
            if (void 0 === y) {
                return 0 === this.length ? void 0 : this[0] === document ? document.documentElement.scrollTop : this[0].scrollTop;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (this[i] === document) {
                    window.scrollTo(document.documentElement.scrollLeft, y);
                } else {
                    /** @type {string} */
                    this[i].scrollTop = y;
                }
            }
        },
        scrollLeft: function (pos) {
            if (void 0 === pos) {
                return 0 === this.length ? void 0 : this[0] === document ? document.documentElement.scrollLeft : this[0].scrollLeft;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (this[i] === document) {
                    window.scrollTo(pos, document.documentElement.scrollTop);
                } else {
                    /** @type {string} */
                    this[i].scrollLeft = pos;
                }
            }
        },
        on: function (name, type, fn) {
            if (1 < name.split(" ").length) {
                var split = name.split(" ");
                /** @type {number} */
                var i = 0;
                for (; i < split.length; i++) {
                    if (-1 !== optForFields.indexOf(name)) {
                        /** @type {number} */
                        var i = 0;
                        for (; i < vendors.length; i++) {
                            this.on(vendors[i] + name[0].toUpperCase() + name.slice(1), type, fn);
                        }
                    } else {
                        this.on(split[i], type, fn);
                    }
                }
                return this;
            }
            fn = "function" == typeof type ? on(type, null) : on(fn, type);
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                var $input = $(this[i]);
                if (!$input.data("events")) {
                    $input.data("events", []);
                }
                $input.data("events").push([name, fn]);
                var root = name.split(".");
                root = root[0];
                if (0 <= events.indexOf(root)) {
                    $input.get(0).addEventListener(root, fn, {
                        passive: true
                    });
                } else {
                    $input.get(0).addEventListener(root, fn);
                }
            }
        },
        off: function (id) {
            if (1 < id.split(" ").length) {
                var args = id.split(" ");
                /** @type {number} */
                var i = 0;
                for (; i < args.length; i++) {
                    this.off(args[i]);
                }
                return this;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                var $input = $(this[i]);
                if ($input.data("events")) {
                    var orig = id.split(".");
                    orig = orig[0];
                    var overEls = $input.data("events") || [];
                    /** @type {number} */
                    var i = overEls.length - 1;
                    for (; 0 <= i; i--) {
                        var el = overEls[i];
                        if (el[0] == id) {
                            $input.get(0).removeEventListener(orig, el[1]);
                            overEls.splice(i, 1);
                        }
                    }
                }
            }
        },
        trigger: function (type) {
            /** @type {number} */
            var j = 0;
            for (; j < this.length; j++) {
                var event = void 0;
                if ("function" == typeof Event) {
                    /** @type {!Event} */
                    event = 0 <= type.search(/^mouse/g) ? new MouseEvent(type, {
                        view: window,
                        cancelable: true,
                        bubbles: true
                    }) : new Event(type);
                } else {
                    if (0 <= type.search(/^mouse/g)) {
                        (event = document.createEvent("MouseEvents")).initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    } else {
                        (event = document.createEvent("Event")).initEvent(type, true, true);
                    }
                }
                if (0 <= eventTypes.indexOf(type) && "function" == typeof this[j][type]) {
                    this[j][type]();
                } else {
                    this[j].dispatchEvent(event);
                }
            }
        },
        triggerHandler: function () {
        },
        val: function (name) {
            if (void 0 === name) {
                return this[0].value;
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                this[i].value = name;
            }
            return this;
        },
        siblings: function () {
            return $(this[0]).parent().children().not(this);
        },
        find: function (target) {
            var current = $();
            if ("string" != typeof target) {
                /** @type {number} */
                var j = 0;
                for (; j < target.length; j++) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.length; i++) {
                        if (this[i] !== target[j] && $(this[i]).contains(target[j])) {
                            current.push(target[j]);
                            break;
                        }
                    }
                }
                return current;
            }
            /**
             * @param {!Object} obj
             * @return {?}
             */
            var match = function (obj) {
                return "object" === ("undefined" == typeof HTMLElement ? "undefined" : getTypeOf(HTMLElement)) ? obj instanceof HTMLElement : obj && "object" === getTypeOf(obj) && null !== obj && 1 === obj.nodeType && "string" == typeof obj.nodeName;
            };
            target = find(target);
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (this[i].querySelectorAll) {
                    /** @type {!Array} */
                    var targets = [];
                    if (target && "string" == typeof target) {
                        targets = this[i].querySelectorAll(target);
                    } else {
                        if (match(target)) {
                            /** @type {!Array} */
                            targets = [target];
                        }
                    }
                    /** @type {number} */
                    var i = 0;
                    for (; i < targets.length; i++) {
                        current.push(targets[i]);
                    }
                }
            }
            return current;
        },
        children: function () {
            var items = $();
            /** @type {number} */
            var j = 0;
            for (; j < this.length; j++) {
                var trs = this[j].children;
                /** @type {number} */
                var i = 0;
                for (; i < trs.length; i++) {
                    items.push(trs[i]);
                }
            }
            return items;
        },
        not: function (data) {
            if ("string" == typeof data) {
                /** @type {number} */
                var i = this.length - 1;
                for (; 0 <= i; i--) {
                    if (this[i].matches(data)) {
                        this.splice(i, 1);
                    }
                }
            } else {
                if (data instanceof jQuery) {
                    /** @type {number} */
                    var i = this.length - 1;
                    for (; 0 <= i; i--) {
                        /** @type {number} */
                        var k = 0;
                        for (; k < data.length; k++) {
                            if (this[i] === data[k]) {
                                this.splice(i, 1);
                                break;
                            }
                        }
                    }
                } else {
                    /** @type {number} */
                    var i = this.length - 1;
                    for (; 0 <= i; i--) {
                        if (this[i] === data[0]) {
                            this.splice(i, 1);
                        }
                    }
                }
            }
            return this;
        },
        add: function (keys) {
            /** @type {number} */
            var i = 0;
            for (; i < keys.length; i++) {
                this.push(keys[i]);
            }
            return this;
        },
        closest: function (selector) {
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                var n = this[i].closest && this[i].closest(selector);
                if (n) {
                    return $(n);
                }
            }
            return $();
        },
        html: function (name) {
            if (void 0 === name) {
                return 0 === this.length ? void 0 : this[0].innerHTML;
            }
            if ("string" == typeof name) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    /** @type {string} */
                    this[i].innerHTML = name;
                    var objects = this[i].children;
                    var doc = this[i].ownerDocument || document;
                    /** @type {number} */
                    var index = 0;
                    for (; index < objects.length; index++) {
                        if ("SCRIPT" === objects[index].tagName) {
                            var script = doc.createElement("script");
                            script.innerHTML = objects[index].innerHTML;
                            doc.head.appendChild(script).parentNode.removeChild(script);
                        }
                    }
                }
            } else {
                /** @type {string} */
                this[0].innerHTML = "";
                this.append(name[0]);
                var doc = this[0].ownerDocument || document;
                if ("SCRIPT" === name[0].tagName) {
                    var script = doc.createElement("script");
                    script.innerHTML = name[0].innerHTML;
                    doc.head.appendChild(script).parentNode.removeChild(script);
                }
            }
            return this;
        },
        text: function (name) {
            if (!name) {
                return this.length ? this[0].textContent : "";
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                /** @type {string} */
                this[i].textContent = name;
            }
        },
        after: function (a) {
            if (a) {
                if ("string" == typeof a) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.length; i++) {
                        var elem = this[i];
                        if (elem.nodeType != Node.ELEMENT_NODE) {
                            var element = elem.ownerDocument.createElement("SPAN");
                            $(elem).after(element);
                            $(element).after(a).remove();
                        } else {
                            elem.insertAdjacentHTML("afterend", a);
                        }
                    }
                } else {
                    var o = this[0];
                    if (o.nextSibling) {
                        if (a instanceof jQuery) {
                            /** @type {number} */
                            var i = 0;
                            for (; i < a.length; i++) {
                                o.nextSibling.parentNode.insertBefore(a[i], o.nextSibling);
                            }
                        } else {
                            o.nextSibling.parentNode.insertBefore(a, o.nextSibling);
                        }
                    } else {
                        $(o.parentNode).append(a);
                    }
                }
            }
            return this;
        },
        clone: function (deep) {
            var elems = $();
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                elems.push(this[i].cloneNode(deep));
            }
            return elems;
        },
        replaceWith: function (val) {
            if ("string" == typeof val) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    if (this[i].parentNode) {
                        /** @type {string} */
                        this[i].outerHTML = val;
                    }
                }
            } else {
                if (val.length) {
                    /** @type {number} */
                    var j = 0;
                    for (; j < this.length; j++) {
                        this.replaceWith(val[j]);
                    }
                } else {
                    this.after(val).remove();
                }
            }
        },
        insertBefore: function (node) {
            return $(node).before(this[0]), this;
        },
        before: function (a) {
            if (a instanceof jQuery) {
                /** @type {number} */
                var i = 0;
                for (; i < a.length; i++) {
                    this.before(a[i]);
                }
                return this;
            }
            if (a) {
                if ("string" == typeof a) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.length; i++) {
                        var node = this[i];
                        if (node.nodeType != Node.ELEMENT_NODE) {
                            var button = node.ownerDocument.createElement("SPAN");
                            $(node).before(button);
                            $(button).before(a).remove();
                        } else {
                            if (node.parentNode) {
                                node.insertAdjacentHTML("beforebegin", a);
                            }
                        }
                    }
                } else {
                    var wafCss = this[0];
                    if (wafCss.parentNode) {
                        if (a instanceof jQuery) {
                            /** @type {number} */
                            var i = 0;
                            for (; i < a.length; i++) {
                                wafCss.parentNode.insertBefore(a[i], wafCss);
                            }
                        } else {
                            wafCss.parentNode.insertBefore(a, wafCss);
                        }
                    }
                }
            }
            return this;
        },
        append: function (node) {
            if (0 == this.length) {
                return this;
            }
            if ("string" == typeof node) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    var elem = this[i];
                    var el = elem.ownerDocument.createElement("SPAN");
                    $(elem).append(el);
                    $(el).after(node).remove();
                }
            } else {
                if (node instanceof jQuery || Array.isArray(node)) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < node.length; i++) {
                        this.append(node[i]);
                    }
                } else {
                    if ("function" != typeof node) {
                        this[0].appendChild(node);
                    }
                }
            }
            return this;
        },
        prepend: function (node) {
            if (0 == this.length) {
                return this;
            }
            if ("string" == typeof node) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    var elem = this[i];
                    var el = elem.ownerDocument.createElement("SPAN");
                    $(elem).prepend(el);
                    $(el).before(node).remove();
                }
            } else {
                if (node instanceof jQuery) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < node.length; i++) {
                        this.prepend(node[i]);
                    }
                } else {
                    var code = this[0];
                    if (code.firstChild) {
                        if (code.firstChild) {
                            code.insertBefore(node, code.firstChild);
                        } else {
                            code.appendChild(node);
                        }
                    } else {
                        $(code).append(node);
                    }
                }
            }
            return this;
        },
        remove: function () {
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                if (this[i].parentNode) {
                    this[i].parentNode.removeChild(this[i]);
                }
            }
            return this;
        },
        prev: function () {
            return this.length && this[0].previousElementSibling ? $(this[0].previousElementSibling) : $();
        },
        next: function () {
            return this.length && this[0].nextElementSibling ? $(this[0].nextElementSibling) : $();
        },
        nextAllVisible: function () {
            return this.next();
        },
        prevAllVisible: function () {
            return this.prev();
        },
        outerHeight: function (el) {
            if (0 !== this.length) {
                var node = this[0];
                if (node === node.window) {
                    return node.innerHeight;
                }
                var originObject = {};
                var visible = this.isVisible();
                if (!visible) {
                    var prop;
                    for (prop in style) {
                        originObject[prop] = node.style[prop];
                        node.style[prop] = style[prop];
                    }
                }
                var size = node.offsetHeight;
                if (el && (size = size + (parseInt($(node).css("marginTop")) + parseInt($(node).css("marginBottom")))), !visible) {
                    var prop;
                    for (prop in style) {
                        node.style[prop] = originObject[prop];
                    }
                }
                return size;
            }
        },
        outerWidth: function (bool) {
            if (0 !== this.length) {
                var node = this[0];
                if (node === node.window) {
                    return node.outerWidth;
                }
                var originObject = {};
                var visible = this.isVisible();
                if (!visible) {
                    var prop;
                    for (prop in style) {
                        originObject[prop] = node.style[prop];
                        node.style[prop] = style[prop];
                    }
                }
                var width = node.offsetWidth;
                if (bool && (width = width + (parseInt($(node).css("marginLeft")) + parseInt($(node).css("marginRight")))), !visible) {
                    var prop;
                    for (prop in style) {
                        node.style[prop] = originObject[prop];
                    }
                }
                return width;
            }
        },
        width: function (width) {
            if (void 0 === width) {
                if (this[0] instanceof HTMLDocument) {
                    return this[0].body.offsetWidth;
                }
                if (this[0]) {
                    return this[0].offsetWidth;
                }
            } else {
                /** @type {string} */
                this[0].style.width = width + "px";
            }
        },
        height: function (val) {
            var el = this[0];
            if (void 0 === val) {
                if (el instanceof HTMLDocument) {
                    /** @type {!Element} */
                    var html = el.documentElement;
                    return Math.max(el.body.scrollHeight, html.scrollHeight, el.body.offsetHeight, html.offsetHeight, html.clientHeight);
                }
                return el.offsetHeight;
            }
            /** @type {string} */
            el.style.height = val + "px";
        },
        is: function (type) {
            return 0 !== this.length && ("string" == typeof type && this[0].matches ? this[0].matches(type) : type instanceof jQuery ? this[0] == type[0] : this[0] == type);
        },
        parent: function () {
            return 0 === this.length ? $() : $(this[0].parentNode);
        },
        _matches: function (el, url) {
            var n = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector;
            return el && !url ? n : n.call(el, url);
        },
        parents: function (selector) {
            var el = $();
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
                var p = this[i].parentNode;
                for (; p && p != document && this._matches(p);) {
                    if (selector) {
                        if (this._matches(p, selector)) {
                            el.push(p);
                        }
                    } else {
                        el.push(p);
                    }
                    p = p.parentNode;
                }
            }
            return el;
        },
        parentsUntil: function (elem, tagName) {
            var result = $();
            if (elem instanceof jQuery && 0 < elem.length) {
                elem = elem[0];
            }
            /** @type {number} */
            var x = 0;
            for (; x < this.length; x++) {
                var parent = this[x].parentNode;
                for (; parent && parent != document && parent.matches && parent != elem && this[x] != elem && ("string" != typeof elem || !parent.matches(elem));) {
                    if (tagName) {
                        if (parent.matches(tagName)) {
                            result.push(parent);
                        }
                    } else {
                        result.push(parent);
                    }
                    parent = parent.parentNode;
                }
            }
            return result;
        },
        insertAfter: function (name) {
            var parent = name.parent()[0];
            if (parent) {
                parent.insertBefore(this[0], name[0].nextElementSibling);
            }
        },
        filter: function (name) {
            var results = $();
            if ("function" == typeof name) {
                /** @type {number} */
                var i = 0;
                for (; i < this.length; i++) {
                    if (name.call(this[i], this[i])) {
                        results.push(this[i]);
                    }
                }
            } else {
                if ("string" == typeof name) {
                    /** @type {number} */
                    var i = 0;
                    for (; i < this.length; i++) {
                        if (this[i].matches(name)) {
                            results.push(this[i]);
                        }
                    }
                }
            }
            return results;
        },
        offset: function () {
            if (0 !== this.length) {
                var box = this[0].getBoundingClientRect();
                var win = this[0].ownerDocument.defaultView;
                return {
                    top: box.top + win.pageYOffset,
                    left: box.left + win.pageXOffset
                };
            }
        },
        position: function () {
            return {
                left: this[0].offsetLeft,
                top: this[0].offsetTop
            };
        },
        push: [].push,
        splice: [].splice
    };
    /**
     * @param {!Object} to
     * @return {?}
     */
    jQuery.extend = function (to) {
        to = to || {};
        /** @type {number} */
        var i = 1;
        for (; i < arguments.length; i++) {
            if (arguments[i]) {
                var prop;
                for (prop in arguments[i]) {
                    if (Object.prototype.hasOwnProperty.call(arguments[i], prop)) {
                        to[prop] = arguments[i][prop];
                    }
                }
            }
        }
        return to;
    };
    /**
     * @param {!Array} out
     * @param {!Array} params
     * @return {?}
     */
    jQuery.merge = function (out, params) {
        /** @type {number} */
        var targetName = +params.length;
        /** @type {number} */
        var name = 0;
        var i = out.length;
        for (; name < targetName; name++) {
            out[i++] = params[name];
        }
        return out.length = i, out;
    };
    /**
     * @param {string} input
     * @param {!Function} t
     * @param {?} lang
     * @return {?}
     */
    jQuery.map = function (input, t, lang) {
        var inpLen;
        var m;
        /** @type {number} */
        var i = 0;
        /** @type {!Array} */
        var a = [];
        if (Array.isArray(input)) {
            inpLen = input.length;
            for (; i < inpLen; i++) {
                if (null != (m = t(input[i], i, lang))) {
                    a.push(m);
                }
            }
        } else {
            for (i in input) {
                if (null != (m = t(input[i], i, lang))) {
                    a.push(m);
                }
            }
        }
        return [].concat.apply([], a);
    };
    /**
     * @param {string} selector
     * @param {!Object} context
     * @return {?}
     */
    var Selector = function (selector, context) {
        if (!selector) {
            return this;
        }
        if ("string" == typeof selector && "<" === selector[0]) {
            /** @type {!Element} */
            var wrap = document.createElement("DIV");
            return wrap.innerHTML = selector, $(wrap.firstElementChild);
        }
        if (context = context instanceof jQuery ? context[0] : context, "string" != typeof selector) {
            return selector instanceof jQuery ? selector : (this[0] = selector, this.length = 1, this);
        }
        selector = find(selector);
        var elems = (context || document).querySelectorAll(selector);
        /** @type {number} */
        var i = 0;
        for (; i < elems.length; i++) {
            this[i] = elems[i];
        }
        return this.length = elems.length, this;
    };
    Selector.prototype = jQuery.prototype;
    /** @type {function(string, !Object, !Object): ?} */
    var config = data;
    return config.Bootstrap = function (element, options, cbOnEnd) {
        /** @type {number} */
        this.id = ++config.ID;
        /** @type {function(!Object, string): ?} */
        this.$ = jQuery;
        var data = {};
        if ("function" == typeof options) {
            /** @type {string} */
            cbOnEnd = options;
            options = {};
        }
        if (cbOnEnd) {
            if (!options.events) {
                options.events = {};
            }
            /** @type {string} */
            options.events.initialized = cbOnEnd;
        }
        if (options && options.documentReady) {
            /** @type {!Array} */
            data.toolbarButtons = [["fullscreen", "undo", "redo", "getPDF", "print"], ["bold", "italic", "underline", "textColor", "backgroundColor", "clearFormatting"], ["alignLeft", "alignCenter", "alignRight", "alignJustify"], ["formatOL", "formatUL", "indent", "outdent"], ["paragraphFormat"], ["fontFamily"], ["fontSize"], ["insertLink", "insertImage", "quote"]];
            /** @type {boolean} */
            data.paragraphFormatSelection = true;
            /** @type {boolean} */
            data.fontFamilySelection = true;
            /** @type {boolean} */
            data.fontSizeSelection = true;
            /** @type {string} */
            data.placeholderText = "";
            /** @type {boolean} */
            data.quickInsertEnabled = false;
            /** @type {boolean} */
            data.charCounterCount = false;
        }
        /** @type {!Object} */
        this.opts = Object.assign({}, Object.assign({}, config.DEFAULTS, data, "object" === getTypeOf(options) && options));
        /** @type {string} */
        var p = JSON.stringify(this.opts);
        config.OPTS_MAPPING[p] = config.OPTS_MAPPING[p] || this.id;
        this.sid = config.OPTS_MAPPING[p];
        config.SHARED[this.sid] = config.SHARED[this.sid] || {};
        this.shared = config.SHARED[this.sid];
        this.shared.count = (this.shared.count || 0) + 1;
        this.$oel = jQuery(element);
        this.$oel.data("froala.editor", this);
        this.o_doc = element.ownerDocument;
        this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow;
        this.c_scroll = jQuery(this.o_win).scrollTop();
        this._init();
    }, config.Bootstrap.prototype._init = function () {
        var undefined = this.$oel.get(0).tagName;
        this.$oel.closest("label").length;
        var _showNavsIfNeeded = function () {
            if ("TEXTAREA" !== undefined) {
                this._original_html = this._original_html || this.$oel.html();
            }
            this.$box = this.$box || this.$oel;
            if (this.opts.fullPage) {
                /** @type {boolean} */
                this.opts.iframe = true;
            }
            if (this.opts.iframe) {
                this.$iframe = jQuery('<iframe src="about:blank" frameBorder="0">');
                this.$wp = jQuery("<div></div>");
                this.$box.html(this.$wp);
                this.$wp.append(this.$iframe);
                this.$iframe.get(0).contentWindow.document.open();
                this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>");
                this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>");
                this.$iframe.get(0).contentWindow.document.close();
                this.iframe_document = this.$iframe.get(0).contentWindow.document;
                this.$el = jQuery(this.iframe_document.querySelector("body"));
                this.el = this.$el.get(0);
                this.$head = jQuery(this.iframe_document.querySelector("head"));
                this.$html = jQuery(this.iframe_document.querySelector("html"));
            } else {
                this.$el = jQuery(this.o_doc.createElement("DIV"));
                this.el = this.$el.get(0);
                this.$wp = jQuery(this.o_doc.createElement("DIV")).append(this.$el);
                this.$box.html(this.$wp);
            }
            setTimeout(init.bind(this), 0);
        }.bind(this);
        var _searchCards = function () {
            this.$box = jQuery("<div>");
            this.$oel.before(this.$box).hide();
            this._original_html = this.$oel.val();
            var lithe = this;
            this.$oel.parents("form").on("submit.".concat(this.id), function () {
                lithe.events.trigger("form.submit");
            });
            this.$oel.parents("form").on("reset.".concat(this.id), function () {
                lithe.events.trigger("form.reset");
            });
            _showNavsIfNeeded();
        }.bind(this);
        var _setupPlayAria = function () {
            this.$el = this.$oel;
            this.el = this.$el.get(0);
            this.$el.attr("contenteditable", true).css("outline", "none").css("display", "inline-block");
            /** @type {boolean} */
            this.opts.multiLine = false;
            /** @type {boolean} */
            this.opts.toolbarInline = false;
            setTimeout(init.bind(this), 0);
        }.bind(this);
        var _getPageSource = function () {
            this.$el = this.$oel;
            this.el = this.$el.get(0);
            /** @type {boolean} */
            this.opts.toolbarInline = false;
            setTimeout(init.bind(this), 0);
        }.bind(this);
        var _listenForLogMessages = function () {
            this.$el = this.$oel;
            this.el = this.$el.get(0);
            /** @type {boolean} */
            this.opts.toolbarInline = false;
            this.$oel.on("click.popup", function (event) {
                event.preventDefault();
            });
            setTimeout(init.bind(this), 0);
        }.bind(this);
        if (this.opts.editInPopup) {
            _listenForLogMessages();
        } else {
            if ("TEXTAREA" === undefined) {
                _searchCards();
            } else {
                if ("A" === undefined) {
                    _setupPlayAria();
                } else {
                    if ("IMG" === undefined) {
                        _getPageSource();
                    } else {
                        if ("BUTTON" === undefined || "INPUT" === undefined) {
                            /** @type {boolean} */
                            this.opts.editInPopup = true;
                            /** @type {boolean} */
                            this.opts.toolbarInline = false;
                            _listenForLogMessages();
                        } else {
                            _showNavsIfNeeded();
                        }
                    }
                }
            }
        }
    }, config.Bootstrap.prototype.load = function (e) {
        var name;
        for (name in e) {
            if (Object.prototype.hasOwnProperty.call(e, name)) {
                if (this[name]) {
                    continue;
                }
                if (config.PLUGINS[name] && this.opts.pluginsEnabled.indexOf(name) < 0) {
                    continue;
                }
                if (this[name] = new e[name](this), this[name]._init && (this[name]._init(), this.opts.initOnClick && "core" === name)) {
                    return false;
                }
            }
        }
    }, config.Bootstrap.prototype.destroy = function () {
        /** @type {boolean} */
        this.destrying = true;
        this.shared.count--;
        if (this.events) {
            this.events.$off();
        }
        var state = this.html && this.html.get();
        if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events && (this.events.trigger("destroy", [], true), this.events.trigger("shared.destroy", [], true)), 0 === this.shared.count) {
            var name;
            for (name in this.shared) {
                if (Object.prototype.hasOwnProperty.call(this.shared, name)) {
                    /** @type {null} */
                    this.shared[name] = null;
                    /** @type {null} */
                    config.SHARED[this.sid][name] = null;
                }
            }
            delete config.SHARED[this.sid];
        }
        this.$oel.parents("form").off(".".concat(this.id));
        this.$oel.off("click.popup");
        this.$oel.removeData("froala.editor");
        this.$oel.off("froalaEditor");
        if (this.core) {
            this.core.destroy(state);
        }
        config.INSTANCES.splice(config.INSTANCES.indexOf(this), 1);
    }, data;
});
