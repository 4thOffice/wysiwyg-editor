/*!
 * froala_editor v3.2.6-1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2021 Froala Labs
 */

! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.FroalaEditor = t()
}(this, function () {
    "use strict";

    function N(e) {
        return (N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function (e) {
        var t = this;
        if (!document.documentElement.contains(t)) return null;
        do {
            if (t.matches(e)) return t;
            t = t.parentElement || t.parentNode
        } while (null !== t && 1 === t.nodeType);
        return null
    }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (e) {
        for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; 0 <= --n && t.item(n) !== this;);
        return -1 < n
    }), Array.isArray || (Array.isArray = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function (e, t) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(e), r = 1; r < arguments.length; r++) {
                var o = arguments[r];
                if (null != o)
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
            }
            return n
        },
        writable: !0,
        configurable: !0
    }),
        function () {
            var a = /^\s*:scope/gi,
                s = /,\s*:scope/gi,
                l = document.createElement("div");

            function e(e, t) {
                var i = e[t];
                e[t] = function (e) {
                    var t, n = !1,
                        r = !1;
                    if (!e || Array.isArray(e) || !e.match(a) && !e.match(s)) return i.call(this, e);
                    this.parentNode || (l.appendChild(this), r = !0);
                    var o = this.parentNode;
                    return this.id || (this.id = "rootedQuerySelector_id_".concat((new Date).getTime()), n = !0), t = i.call(o, e.replace(a, "#".concat(this.id)).replace(s, ",#".concat(this.id))), n && (this.id = ""), r && l.removeChild(this), t
                }
            }
            try {
                var t = l.querySelectorAll(":scope *");
                if (!t || Array.isArray(t)) throw "error"
            } catch (n) {
                e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll")
            }
        }(), "document" in self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || function (e) {
            if ("Element" in e) {
                var t = "classList",
                    n = "prototype",
                    r = e.Element[n],
                    o = Object,
                    i = String[n].trim || function () {
                        return this.replace(/^\s+|\s+$/g, "")
                    },
                    a = Array[n].indexOf || function (e) {
                        for (var t = 0, n = this.length; t < n; t++)
                            if (t in this && this[t] === e) return t;
                        return -1
                    },
                    s = function s(e, t) {
                        this.name = e, this.code = DOMException[e], this.message = t
                    },
                    l = function l(e, t) {
                        if ("" === t) throw new s("SYNTAX_ERR", "The token must not be empty.");
                        if (/\s/.test(t)) throw new s("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
                        return a.call(e, t)
                    },
                    c = function c(e) {
                        for (var t = i.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, o = n.length; r < o; r++) this.push(n[r]);
                        this._updateClassName = function () {
                            e.setAttribute("class", this.toString())
                        }
                    },
                    d = c[n] = [],
                    f = function f() {
                        return new c(this)
                    };
                if (s[n] = Error[n], d.item = function (e) {
                    return this[e] || null
                }, d.contains = function (e) {
                    return ~l(this, e + "")
                }, d.add = function () {
                    for (var e, t = arguments, n = 0, r = t.length, o = !1; e = t[n] + "", ~l(this, e) || (this.push(e), o = !0), ++n < r;);
                    o && this._updateClassName()
                }, d.remove = function () {
                    var e, t, n = arguments,
                        r = 0,
                        o = n.length,
                        i = !1;
                    do {
                        for (e = n[r] + "", t = l(this, e); ~t;) this.splice(t, 1), i = !0, t = l(this, e)
                    } while (++r < o);
                    i && this._updateClassName()
                }, d.toggle = function (e, t) {
                    var n = this.contains(e),
                        r = n ? !0 !== t && "remove" : !1 !== t && "add";
                    return r && this[r](e), !0 === t || !1 === t ? t : !n
                }, d.replace = function (e, t) {
                    var n = l(e + "");
                    ~n && (this.splice(n, 1, t), this._updateClassName())
                }, d.toString = function () {
                    return this.join(" ")
                }, o.defineProperty) {
                    var p = {
                        get: f,
                        enumerable: !0,
                        configurable: !0
                    };
                    try {
                        o.defineProperty(r, t, p)
                    } catch (u) {
                        void 0 !== u.number && -2146823252 !== u.number || (p.enumerable = !1, o.defineProperty(r, t, p))
                    }
                } else o[n].__defineGetter__ && r.__defineGetter__(t, f)
            }
        }(self), function () {
            var e = document.createElement("_");
            if (e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
                var t = function yc(e) {
                    var yc = DOMTokenList.prototype[e];
                    DOMTokenList.prototype[e] = function (e) {
                        var t, n = arguments.length;
                        for (t = 0; t < n; t++) e = arguments[t], yc.call(this, e)
                    }
                };
                t("add"), t("remove")
            }
            if (e.classList.toggle("c3", !1), e.classList.contains("c3")) {
                var n = DOMTokenList.prototype.toggle;
                DOMTokenList.prototype.toggle = function (e, t) {
                    return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e)
                }
            }
            "replace" in document.createElement("_").classList || (DOMTokenList.prototype.replace = function (e, t) {
                var n = this.toString().split(" "),
                    r = n.indexOf(e + "");
                ~r && (n = n.slice(r), this.remove.apply(this, n), this.add(t), this.add.apply(this, n.slice(1)))
            }), e = null
        }());

    //////////////////////////
    // CREATE FROALA INSTANCE
    //////////////////////////
    function V(e, t, n) {
        if ("string" != typeof e) return new V.Bootstrap(e, t, n);
        var r = document.querySelectorAll(e);
        t && t.iframe_document && (r = t.iframe_document.querySelectorAll(e));
        for (var o = [], i = 0; i < r.length; i++) {
            var a = r[i]["data-froala.editor"];
            a ? o.push(a) : o.push(new V.Bootstrap(r[i], t, n))
        }
        return 1 == o.length ? o[0] : o
    }

    ////////////////////
    // REGISTER PLUGIN
    ////////////////////
    V.RegisterPlugins = function (e) {
        for (var t = 0; t < e.length; t++) e[t].call(V)
    }, Object.assign(V, {
        DEFAULTS: {
            initOnClick: !1,
            pluginsEnabled: null
        },
        MODULES: {},
        PLUGINS: {},
        VERSION: "3.2.6-1",
        INSTANCES: [],
        OPTS_MAPPING: {},
        SHARED: {},
        ID: 0
    }),
    
    /////////
    // NODE
    /////////
    V.MODULES.node = function (a) {
        var n = a.$;

        function s(e) {
            return e && "IFRAME" !== e.tagName ? Array.prototype.slice.call(e.childNodes || []) : []
        }

        function l(e) {
            return !!e && (e.nodeType === Node.ELEMENT_NODE && 0 <= V.BLOCK_TAGS.indexOf(e.tagName.toLowerCase()))
        }

        function c(e) {
            var t = {},
                n = e.attributes;
            if (n)
                for (var r = 0; r < n.length; r++) {
                    var o = n[r];
                    t[o.nodeName] = o.value
                }
            return t
        }

        function t(e) {
            for (var t = "", n = c(e), r = Object.keys(n).sort(), o = 0; o < r.length; o++) {
                var i = r[o],
                    a = n[i];
                a.indexOf("'") < 0 && 0 <= a.indexOf('"') ? t += " ".concat(i, "='").concat(a, "'") : (0 <= a.indexOf('"') && 0 <= a.indexOf("'") && (a = a.replace(/"/g, "&quot;")), t += " ".concat(i, '="').concat(a, '"'))
            }
            return t
        }

        function r(e) {
            return e === a.el
        }
        return {
            isBlock: l,
            isEmpty: function d(e, t) {
                if (!e) return !0;
                if (e.querySelector("table")) return !1;
                var n = s(e);
                1 === n.length && l(n[0]) && (n = s(n[0]));
                for (var r = !1, o = 0; o < n.length; o++) {
                    var i = n[o];
                    if (!(t && a.node.hasClass(i, "fr-marker") || i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length)) {
                        if ("BR" !== i.tagName && 0 < (i.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return !1;
                        if (r) return !1;
                        "BR" === i.tagName && (r = !0)
                    }
                }
                return !(e.querySelectorAll(V.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length || e.querySelector("".concat(a.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || 1 < e.querySelectorAll(V.BLOCK_TAGS.join(",")).length || e.querySelector("".concat(a.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")))
            },
            blockParent: function o(e) {
                for (; e && e.parentNode !== a.el && (!e.parentNode || !a.node.hasClass(e.parentNode, "fr-inner"));)
                    if (l(e = e.parentNode)) return e;
                return null
            },
            deepestParent: function i(e, t, n) {
                if (void 0 === t && (t = []), void 0 === n && (n = !0), t.push(a.el), 0 <= t.indexOf(e.parentNode) || e.parentNode && a.node.hasClass(e.parentNode, "fr-inner") || e.parentNode && 0 <= V.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) && n) return null;
                for (; t.indexOf(e.parentNode) < 0 && e.parentNode && !a.node.hasClass(e.parentNode, "fr-inner") && (V.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) < 0 || !n) && (!l(e) || l(e.parentNode)) && (!l(e) || !l(e.parentNode) || !n);) e = e.parentNode;
                return e
            },
            rawAttributes: c,
            attributes: t,
            clearAttributes: function f(e) {
                for (var t = e.attributes, n = t.length - 1; 0 <= n; n--) {
                    var r = t[n];
                    e.removeAttribute(r.nodeName)
                }
            },
            openTagString: function p(e) {
                return "<".concat(e.tagName.toLowerCase()).concat(t(e), ">")
            },
            closeTagString: function u(e) {
                return "</".concat(e.tagName.toLowerCase(), ">")
            },
            isFirstSibling: function h(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.previousSibling; n && t && a.node.hasClass(n, "fr-marker");) n = n.previousSibling;
                return !n || n.nodeType === Node.TEXT_NODE && "" === n.textContent && h(n)
            },
            isLastSibling: function g(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.nextSibling; n && t && a.node.hasClass(n, "fr-marker");) n = n.nextSibling;
                return !n || n.nodeType === Node.TEXT_NODE && "" === n.textContent && g(n)
            },
            isList: function m(e) {
                return !!e && 0 <= ["UL", "OL"].indexOf(e.tagName)
            },
            isLink: function C(e) {
                return !!e && e.nodeType === Node.ELEMENT_NODE && "a" === e.tagName.toLowerCase()
            },
            isElement: r,
            contents: s,
            isVoid: function v(e) {
                return e && e.nodeType === Node.ELEMENT_NODE && 0 <= V.VOID_ELEMENTS.indexOf((e.tagName || "").toLowerCase())
            },
            hasFocus: function b(e) {
                return e === a.doc.activeElement && (!a.doc.hasFocus || a.doc.hasFocus()) && Boolean(r(e) || e.type || e.href || ~e.tabIndex)
            },
            isEditable: function L(e) {
                return (!e.getAttribute || "false" !== e.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(e.tagName) < 0
            },
            isDeletable: function E(e) {
                return e && e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable")
            },
            hasClass: function y(e, t) {
                return e instanceof n && (e = e.get(0)), e && e.classList && e.classList.contains(t)
            },
            filter: function S(e) {
                return a.browser.msie ? e : {
                    acceptNode: e
                }
            }
        }
    },
    //////////////
    // DEFAULTS
    //////////////
    Object.assign(V.DEFAULTS, {
        htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"],
        htmlRemoveTags: ["script", "style"],
        htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
        htmlAllowedStyleProps: [".*"],
        htmlAllowComments: !0,
        htmlUntouched: !1,
        fullPage: !1
    }), V.HTML5Map = {
        B: "STRONG",
        I: "EM",
        STRIKE: "S"
    },
    //////////
    // CLEAN
    //////////
    V.MODULES.clean = function (f) {
        var d, p, u, h, g = f.$;

        function o(e) {
            if (e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker")) return !1;
            var t, n = f.node.contents(e),
                r = [];
            for (t = 0; t < n.length; t++) n[t].nodeType !== Node.ELEMENT_NODE || f.node.isVoid(n[t]) ? n[t].nodeType === Node.TEXT_NODE && (n[t].textContent = n[t].textContent.replace(/\u200b/g, "")) : n[t].textContent.replace(/\u200b/g, "").length !== n[t].textContent.length && o(n[t]);
            if (e.nodeType === Node.ELEMENT_NODE && !f.node.isVoid(e) && (e.normalize(), n = f.node.contents(e), r = e.querySelectorAll(".fr-marker"), n.length - r.length == 0)) {
                for (t = 0; t < n.length; t++)
                    if (n[t].nodeType === Node.ELEMENT_NODE && (n[t].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                for (t = 0; t < r.length; t++) e.parentNode.insertBefore(r[t].cloneNode(!0), e);
                return e.parentNode.removeChild(e), !1
            }
        }

        function s(e, t) {
            if (e.nodeType === Node.COMMENT_NODE) return "\x3c!--".concat(e.nodeValue, "--\x3e");
            if (e.nodeType === Node.TEXT_NODE) return t ? e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
            if (e.nodeType !== Node.ELEMENT_NODE) return e.outerHTML;
            if (e.nodeType === Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(e.tagName)) return e.outerHTML;
            if (e.nodeType === Node.ELEMENT_NODE && "svg" === e.tagName) {
                var n = document.createElement("div"),
                    r = e.cloneNode(!0);
                return n.appendChild(r), n.innerHTML
            }
            if ("IFRAME" === e.tagName) return e.outerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            var o = e.childNodes;
            if (0 === o.length) return e.outerHTML;
            for (var i = "", a = 0; a < o.length; a++) "PRE" === e.tagName && (t = !0), i += s(o[a], t);
            return f.node.openTagString(e) + i + f.node.closeTagString(e)
        }
        var l = [];

        function m(e) {
            var t = e.replace(/;;/gi, ";");
            return ";" !== (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t
        }

        function c(e) {
            var t;
            for (t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    var n = t.match(u),
                        r = null;
                    "style" === t && f.opts.htmlAllowedStyleProps.length && (r = e[t].match(h)), n && r ? e[t] = m(r.join(";")) : n && ("style" !== t || r) || delete e[t]
                } for (var o = "", i = Object.keys(e).sort(), a = 0; a < i.length; a++) e[t = i[a]].indexOf('"') < 0 ? o += " ".concat(t, '="').concat(e[t], '"') : o += " ".concat(t, "='").concat(e[t], "'");
            return o
        }

        function C(e, t) {
            var n, r = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
            g(r).append(e);
            var o = "";
            if (r) {
                var i = f.node.contents(r);
                for (n = 0; n < i.length; n++) t(i[n]);
                for (i = f.node.contents(r), n = 0; n < i.length; n++) o += s(i[n])
            }
            return o
        }

        function v(e, t, n) {
            var r = e = function i(e) {
                return l = [], e = (e = (e = (e = e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function (e) {
                    return l.push(e), "[FROALA.EDITOR.SCRIPT ".concat(l.length - 1, "]")
                })).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function (e) {
                    return l.push(e), "[FROALA.EDITOR.NOSCRIPT ".concat(l.length - 1, "]")
                })).replace(/<meta((?:[\w\W]*?)) http-equiv="/g, '<meta$1 data-fr-http-equiv="')).replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="')
            }(e),
                o = null;
            return f.opts.fullPage && (r = f.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), n && (o = f.html.extractNode(e, "head") || "")), r = C(r, t), o && (o = C(o, t)),
                function a(e) {
                    return e = (e = (e = e.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function (e, t) {
                        return 0 <= f.opts.htmlRemoveTags.indexOf("script") ? "" : l[parseInt(t, 10)]
                    })).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function (e, t) {
                        if (0 <= f.opts.htmlRemoveTags.indexOf("noscript")) return "";
                        var n = l[parseInt(t, 10)].replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
                            r = g(n);
                        if (r && r.length) {
                            var o = C(r.html(), L);
                            r.html(o), n = r.get(0).outerHTML
                        }
                        return n
                    })).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="')
                }(function s(e, t, n) {
                    if (f.opts.fullPage) {
                        var r = f.html.extractDoctype(n),
                            o = c(f.html.extractNodeAttrs(n, "html"));
                        t = null === t ? f.html.extractNode(n, "head") || "<title></title>" : t;
                        var i = c(f.html.extractNodeAttrs(n, "head")),
                            a = c(f.html.extractNodeAttrs(n, "body"));
                        return "".concat(r, "<html").concat(o, "><head").concat(i, ">").concat(t, "</head><body").concat(a, ">").concat(e, "</body></html>")
                    }
                    return e
                }(r, o, e))
        }

        function b(e) {
            var t = f.doc.createElement("DIV");
            return t.innerText = e, t.textContent
        }

        function L(e) {
            for (var t = f.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType !== Node.TEXT_NODE && L(t[n]);
            ! function c(a) {
                if ("SPAN" === a.tagName && 0 <= (a.getAttribute("class") || "").indexOf("fr-marker")) return !1;
                if ("PRE" === a.tagName && function l(e) {
                    var t = e.innerHTML;
                    0 <= t.indexOf("\n") && (e.innerHTML = t.replace(/\n/g, "<br>"))
                }(a), a.nodeType === Node.ELEMENT_NODE && (a.getAttribute("data-fr-src") && 0 !== a.getAttribute("data-fr-src").indexOf("blob:") && a.setAttribute("data-fr-src", f.helpers.sanitizeURL(b(a.getAttribute("data-fr-src")))), a.getAttribute("href") && a.setAttribute("href", f.helpers.sanitizeURL(b(a.getAttribute("href")))), a.getAttribute("src") && a.setAttribute("src", f.helpers.sanitizeURL(b(a.getAttribute("src")))), a.getAttribute("srcdoc") && a.setAttribute("srcdoc", f.clean.html(a.getAttribute("srcdoc"))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(a.tagName) && (a.innerHTML = a.innerHTML.trim())), !f.opts.pasteAllowLocalImages && a.nodeType === Node.ELEMENT_NODE && "IMG" === a.tagName && a.getAttribute("data-fr-src") && 0 === a.getAttribute("data-fr-src").indexOf("file://")) return a.parentNode.removeChild(a), !1;
                if (a.nodeType === Node.ELEMENT_NODE && V.HTML5Map[a.tagName] && "" === f.node.attributes(a)) {
                    var e = V.HTML5Map[a.tagName],
                        t = "<".concat(e, ">").concat(a.innerHTML, "</").concat(e, ">");
                    a.insertAdjacentHTML("beforebegin", t), (a = a.previousSibling).parentNode.removeChild(a.nextSibling)
                }
                if (f.opts.htmlAllowComments || a.nodeType !== Node.COMMENT_NODE)
                    if (a.tagName && a.tagName.match(p)) "STYLE" == a.tagName && f.helpers.isMac() && function () {
                        var e, n = a.innerHTML.trim(),
                            r = [],
                            t = /{([^}]+)}/g;
                        for (n = n.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/, ""); e = t.exec(n);) r.push(e[1]);
                        for (var o = function o(t) {
                            var e = n.substring(0, n.indexOf("{")).trim();
                            0 == !/^[a-z_-][a-z\d_-]*$/i.test(e) && a.parentNode.querySelectorAll(e).forEach(function (e) {
                                e.removeAttribute("class"), e.setAttribute("style", r[t])
                            }), n = n.substring(n.indexOf("}") + 1)
                        }, i = 0; - 1 != n.indexOf("{"); i++) o(i)
                    }(), a.parentNode.removeChild(a);
                    else if (a.tagName && !a.tagName.match(d)) "svg" === a.tagName ? a.parentNode.removeChild(a) : f.browser.safari && "path" === a.tagName && a.parentNode && "svg" === a.parentNode.tagName || (a.outerHTML = a.innerHTML);
                    else {
                        var n = a.attributes;
                        if (n)
                            for (var r = n.length - 1; 0 <= r; r--) {
                                var o = n[r],
                                    i = o.nodeName.match(u),
                                    s = null;
                                "style" === o.nodeName && f.opts.htmlAllowedStyleProps.length && (s = o.value.match(h)), i && s ? o.value = m(s.join(";")) : i && ("style" !== o.nodeName || s) || a.removeAttribute(o.nodeName)
                            }
                    } else 0 !== a.data.indexOf("[FROALA.EDITOR") && a.parentNode.removeChild(a)
            }(e)
        }
        return {
            _init: function e() {
                f.opts.fullPage && g.merge(f.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"])
            },
            html: function E(e, t, n, r) {
                void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = !1);
                var o, i = g.merge([], f.opts.htmlAllowedTags);
                for (o = 0; o < t.length; o++) 0 <= i.indexOf(t[o]) && i.splice(i.indexOf(t[o]), 1);
                var a = g.merge([], f.opts.htmlAllowedAttrs);
                for (o = 0; o < n.length; o++) 0 <= a.indexOf(n[o]) && a.splice(a.indexOf(n[o]), 1);
                return a.push("data-fr-.*"), a.push("fr-.*"), d = new RegExp("^".concat(i.join("$|^"), "$"), "gi"), u = new RegExp("^".concat(a.join("$|^"), "$"), "gi"), p = new RegExp("^".concat(f.opts.htmlRemoveTags.join("$|^"), "$"), "gi"), h = f.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)".concat(f.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)"), ":.+?(?=(;)|$))"), "gi") : null, e = v(e, L, !0)
            },
            toHTML5: function r() {
                var e = f.el.querySelectorAll(Object.keys(V.HTML5Map).join(","));
                if (e.length) {
                    var t = !1;
                    f.el.querySelector(".fr-marker") || (f.selection.save(), t = !0);
                    for (var n = 0; n < e.length; n++) "" === f.node.attributes(e[n]) && g(e[n]).replaceWith("<".concat(V.HTML5Map[e[n].tagName], ">").concat(e[n].innerHTML, "</").concat(V.HTML5Map[e[n].tagName], ">"));
                    t && f.selection.restore()
                }
            },
            tables: function t() {
                ! function s() {
                    for (var e = f.el.querySelectorAll("tr"), t = 0; t < e.length; t++) {
                        for (var n = e[t].children, r = !0, o = 0; o < n.length; o++)
                            if ("TH" !== n[o].tagName) {
                                r = !1;
                                break
                            } if (!1 !== r && 0 !== n.length) {
                                for (var i = e[t]; i && "TABLE" !== i.tagName && "THEAD" !== i.tagName;) i = i.parentNode;
                                var a = i;
                                "THEAD" !== a.tagName && (a = f.doc.createElement("THEAD"), i.insertBefore(a, i.firstChild)), a.appendChild(e[t])
                            }
                    }
                }()
            },
            lists: function y() {
                ! function s() {
                    var e, t = [];
                    do {
                        if (t.length) {
                            var n = t[0],
                                r = f.doc.createElement("ul");
                            n.parentNode.insertBefore(r, n);
                            do {
                                var o = n;
                                n = n.nextSibling, r.appendChild(o)
                            } while (n && "LI" === n.tagName)
                        }
                        t = [];
                        for (var i = f.el.querySelectorAll("li"), a = 0; a < i.length; a++) e = i[a], f.node.isList(e.parentNode) || t.push(i[a])
                    } while (0 < t.length)
                }(),
                    function i() {
                        for (var e = f.el.querySelectorAll("ol + ol, ul + ul"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (f.node.isList(n.previousSibling) && f.node.openTagString(n) === f.node.openTagString(n.previousSibling)) {
                                for (var r = f.node.contents(n), o = 0; o < r.length; o++) n.previousSibling.appendChild(r[o]);
                                n.parentNode.removeChild(n)
                            }
                        }
                    }(),
                    function a() {
                        for (var e = f.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++)
                            for (var n = f.node.contents(e[t]), r = null, o = n.length - 1; 0 <= o; o--) "LI" !== n[o].tagName && "UL" != n[o].tagName && "OL" != n[o].tagName ? (r || (r = g(f.doc.createElement("LI"))).insertBefore(n[o]), r.prepend(n[o])) : r = null
                    }(),
                    function l() {
                        var e, t, n;
                        do {
                            t = !1;
                            var r = f.el.querySelectorAll("li:empty");
                            for (e = 0; e < r.length; e++) r[e].parentNode.removeChild(r[e]);
                            var o = f.el.querySelectorAll("ul, ol");
                            for (e = 0; e < o.length; e++)(n = o[e]).querySelector("LI") || (t = !0, n.parentNode.removeChild(n))
                        } while (!0 === t)
                    }(),
                    function o() {
                        for (var e = f.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), t = 0; t < e.length; t++) {
                            var n = e[t],
                                r = n.previousSibling;
                            r && ("LI" === r.tagName ? r.appendChild(n) : g(n).wrap("<li></li>"))
                        }
                    }(),
                    function c() {
                        for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (n.nextSibling)
                                for (var r = n.nextSibling; 0 < r.childNodes.length;) n.append(r.childNodes[0])
                        }
                    }(),
                    function d() {
                        for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (f.node.isFirstSibling(n) && "none" != n.parentNode.style.listStyleType) g(n).before("<br/>");
                            else if (n.previousSibling && "BR" === n.previousSibling.tagName) {
                                for (var r = n.previousSibling.previousSibling; r && f.node.hasClass(r, "fr-marker");) r = r.previousSibling;
                                r && "BR" !== r.tagName && g(n.previousSibling).remove()
                            }
                        }
                    }(),
                    function n() {
                        for (var e = f.el.querySelectorAll("li:empty"), t = 0; t < e.length; t++) g(e[t]).remove()
                    }()
            },
            invisibleSpaces: function n(e) {
                return e.replace(/\u200b/g, "").length === e.length ? e : f.clean.exec(e, o)
            },
            exec: v
        }
    },
    ////////////
    // HELPERS
    ////////////
    V.XS = 0, V.SM = 1, V.MD = 2, V.LG = 3;
    V.LinkRegExCommon = "[".concat("a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_\\.", "]{1,}"), V.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;\\/~+#-\\'*-_{}]*)|())", V.LinkRegExTLD = "((".concat(V.LinkRegExCommon, ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))"), V.LinkRegExHTTP = "((ftp|http|https):\\/\\/".concat(V.LinkRegExCommon, ")"), V.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@".concat(V.LinkRegExCommon, ")"), V.LinkRegExWWW = "(www\\.".concat(V.LinkRegExCommon, "\\.[a-z0-9-]{2,24})"), V.LinkRegEx = "(".concat(V.LinkRegExTLD, "|").concat(V.LinkRegExHTTP, "|").concat(V.LinkRegExWWW, "|").concat(V.LinkRegExAuth, ")").concat(V.LinkRegExEnd), V.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], V.MAIL_REGEX = /.+@.+\..+/i, V.MODULES.helpers = function (i) {
        var a, s = i.$;

        function e() {
            var e = {},
                t = function i() {
                    var e, t = -1;
                    return "Microsoft Internet Explorer" === navigator.appName ? (e = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (e = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), t
                }();
            if (0 < t) e.msie = !0;
            else {
                var n = navigator.userAgent.toLowerCase(),
                    r = /(edge)[ /]([\w.]+)/.exec(n) || /(chrome)[ /]([\w.]+)/.exec(n) || /(webkit)[ /]([\w.]+)/.exec(n) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || n.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n) || [],
                    o = r[1] || "";
                r[2];
                r[1] && (e[o] = !0), e.chrome ? e.webkit = !0 : e.webkit && (e.safari = !0)
            }
            return e.msie && (e.version = t), e
        }

        function t() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !o()
        }

        function n() {
            return /(Android)/g.test(navigator.userAgent) && !o()
        }

        function r() {
            return /(Blackberry)/g.test(navigator.userAgent)
        }

        function o() {
            return /(Windows Phone)/gi.test(navigator.userAgent)
        }
        var l = null;
        return {
            _init: function c() {
                i.browser = e()
            },
            isIOS: t,
            isMac: function d() {
                return null === l && (l = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), l
            },
            isAndroid: n,
            isBlackberry: r,
            isWindowsPhone: o,
            isMobile: function f() {
                return n() || t() || r()
            },
            isEmail: function p(e) {
                return !/^(https?:|ftps?:|)\/\//i.test(e) && V.MAIL_REGEX.test(e)
            },
            requestAnimationFrame: function u() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
                    window.setTimeout(e, 1e3 / 60)
                }
            },
            getPX: function h(e) {
                return parseInt(e, 10) || 0
            },
            screenSize: function g(e) {
                try {
                    var t = 0;
                    if ((t = e ? i.$box.width() : i.$sc.width()) < 768) return V.XS;
                    if (768 <= t && t < 992) return V.SM;
                    if (992 <= t && t < 1200) return V.MD;
                    if (1200 <= t) return V.LG
                } catch (n) {
                    return V.LG
                }
            },
            isTouch: function m() {
                return "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch
            },
            sanitizeURL: function C(e) {
                return /^(https?:|ftps?:|)\/\//i.test(e) ? e : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) ? e : new RegExp("^(".concat(V.LinkProtocols.join("|"), "):"), "i").test(e) ? e : e = encodeURIComponent(e).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/%3A(\d)/gi, ":$1").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}")
            },
            isArray: function v(e) {
                return e && !Object.prototype.propertyIsEnumerable.call(e, "length") && "object" === N(e) && "number" == typeof e.length
            },
            RGBToHex: function b(e) {
                function t(e) {
                    return "0".concat(parseInt(e, 10).toString(16)).slice(-2)
                }
                try {
                    return e && "transparent" !== e ? /^#[0-9A-F]{6}$/i.test(e) ? e : (e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), "#".concat(t(e[1])).concat(t(e[2])).concat(t(e[3])).toUpperCase()) : ""
                } catch (n) {
                    return null
                }
            },
            HEXtoRGB: function L(e) {
                e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, r) {
                    return t + t + n + n + r + r
                });
                var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return t ? "rgb(".concat(parseInt(t[1], 16), ", ").concat(parseInt(t[2], 16), ", ").concat(parseInt(t[3], 16), ")") : ""
            },
            isURL: function E(e) {
                return !!/^(https?:|ftps?:|)\/\//i.test(e) && (e = String(e).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), new RegExp("^".concat(V.LinkRegExHTTP).concat(V.LinkRegExEnd, "$"), "gi").test(e))
            },
            getAlignment: function y(e) {
                e.css || (e = s(e));
                var t = (e.css("text-align") || "").replace(/-(.*)-/g, "");
                if (["left", "right", "justify", "center"].indexOf(t) < 0) {
                    if (!a) {
                        var n = s('<div dir="'.concat("rtl" === i.opts.direction ? "rtl" : "auto", '" style="text-align: ').concat(i.$el.css("text-align"), '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>'));
                        s("body").first().append(n);
                        var r = n.find("#s1").get(0).getBoundingClientRect().left,
                            o = n.find("#s2").get(0).getBoundingClientRect().left;
                        n.remove(), a = r < o ? "left" : "right"
                    }
                    t = a
                }
                return t
            },
            scrollTop: function S() {
                return i.o_win.pageYOffset ? i.o_win.pageYOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollTop ? i.o_doc.documentElement.scrollTop : i.o_doc.body.scrollTop ? i.o_doc.body.scrollTop : 0
            },
            scrollLeft: function T() {
                return i.o_win.pageXOffset ? i.o_win.pageXOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollLeft ? i.o_doc.documentElement.scrollLeft : i.o_doc.body.scrollLeft ? i.o_doc.body.scrollLeft : 0
            },
            isInViewPort: function M(e) {
                var t = e.getBoundingClientRect();
                return 0 <= (t = {
                    top: Math.round(t.top),
                    bottom: Math.round(t.bottom)
                }).top && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t.top <= 0 && t.bottom >= (window.innerHeight || document.documentElement.clientHeight)
            }
        }
    },
    ///////////
    // EVENTS
    ///////////
    V.MODULES.events = function (l) {
        var e, i = l.$,
            a = {};

        function s(e, t, n) {
            m(e, t, n)
        }

        function c(e) {
            if (void 0 === e && (e = !0), !l.$wp) return !1;
            if (l.helpers.isIOS() && l.$win.get(0).focus(), l.core.hasFocus()) return !1;
            if (l.selection.isCollapsed() && !l.selection.get().anchorNode) {
                var t = l.$el.find(l.html.blockTagsQuery()).get(0);
                t && (i(t).prepend(V.MARKERS), l.selection.restore())
            }
            if (!l.core.hasFocus() && e) {
                var n = l.$win.scrollTop();
                if (l.browser.msie && l.$box && l.$box.css("position", "fixed"), l.browser.msie && l.$wp && l.$wp.css("overflow", "visible"), l.browser.msie && l.$sc && l.$sc.css("position", "fixed"), l.browser.msie || (p(), l.el.focus(), l.events.trigger("focus"), f()), l.browser.msie && l.$sc && l.$sc.css("position", ""), l.browser.msie && l.$box && l.$box.css("position", ""), l.browser.msie && l.$wp && l.$wp.css("overflow", "auto"), n !== l.$win.scrollTop() && l.$win.scrollTop(n), !l.selection.info(l.el).atStart) return !1
            }
            if (!l.core.hasFocus() || 0 < l.$el.find(".fr-marker").length) return !1;
            if (l.selection.info(l.el).atStart && l.selection.isCollapsed() && null !== l.html.defaultTag()) {
                var r = l.markers.insert();
                if (r && !l.node.blockParent(r)) {
                    i(r).remove();
                    var o = l.$el.find(l.html.blockTagsQuery()).get(0);
                    o && (i(o).prepend(V.MARKERS), l.selection.restore())
                } else r && i(r).remove()
            }
        }
        var d = !1;

        function f() {
            e = !0
        }

        function p() {
            e = !1
        }

        function u() {
            return e
        }

        function h(e, t, n) {
            var r, o = e.split(" ");
            if (1 < o.length) {
                for (var i = 0; i < o.length; i++) h(o[i], t, n);
                return !0
            }
            void 0 === n && (n = !1), r = 0 !== e.indexOf("shared.") ? (a[e] = a[e] || [], a[e]) : (l.shared._events[e] = l.shared._events[e] || [], l.shared._events[e]), n ? r.unshift(t) : r.push(t)
        }
        var g = [];

        function m(e, t, n, r, o) {
            "function" == typeof n && (o = r, r = n, n = !1);
            var i = o ? l.shared.$_events : g,
                a = o ? l.sid : l.id,
                s = "".concat(t.trim().split(" ").join(".ed".concat(a, " ")), ".ed").concat(a);
            n
                ? e.on(s, n, r)
                : e.on(s, r), i.push([e, s])
        }

        function t(e) {
            for (var t = 0; t < e.length; t++) e[t][0].off(e[t][1])
        }

        function C(e, t, n) {
            if (!l.edit.isDisabled() || n) {
                var r, o;
                if (0 !== e.indexOf("shared.")) r = a[e];
                else {
                    if (0 < l.shared.count) return !1;
                    r = l.shared._events[e]
                }
                if (r)
                    for (var i = 0; i < r.length; i++)
                        if (!1 === (o = r[i].apply(l, t))) return !1;
                return (!l.opts.events || !l.opts.events[e] || !1 !== (o = l.opts.events[e].apply(l, t))) && o
            }
        }

        function v() {
            for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && delete a[e]
        }

        function b() {
            for (var e in l.shared._events) Object.prototype.hasOwnProperty.call(l.shared._events, e) && delete l.shared._events[e]
        }
        return {
            _init: function L() {
                l.shared.$_events = l.shared.$_events || [], l.shared._events = {},
                    function e() {
                        l.helpers.isMobile() ? (l._mousedown = "touchstart", l._mouseup = "touchend", l._move = "touchmove", l._mousemove = "touchmove") : (l._mousedown = "mousedown", l._mouseup = "mouseup", l._move = "", l._mousemove = "mousemove")
                    }(),
                    function t() {
                        s(l.$el, "click mouseup mousemove mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function (e) {
                            C(e.type, [e])
                        }), h("mousedown", function () {
                            for (var e = 0; e < V.INSTANCES.length; e++) V.INSTANCES[e] !== l && V.INSTANCES[e].popups && V.INSTANCES[e].popups.areVisible() && V.INSTANCES[e].$el.find(".fr-marker").remove()
                        })
                    }(),
                    function n() {
                        s(l.$win, l._mousedown, function (e) {
                            C("window.mousedown", [e]), f()
                        }), s(l.$win, l._mouseup, function (e) {
                            C("window.mouseup", [e])
                        }), s(l.$win, "cut copy keydown keyup touchmove touchend", function (e) {
                            C("window.".concat(e.type), [e])
                        })
                    }(),
                    function r() {
                        s(l.$doc, "dragend drop", function (e) {
                            C("document.".concat(e.type), [e])
                        })
                    }(),
                    function o() {
                        s(l.$el, "keydown keypress keyup input", function (e) {
                            C(e.type, [e])
                        })
                    }(),
                    function i() {
                        s(l.$el, "focus", function (e) {
                            u() && (c(!1), !1 === d && C(e.type, [e]))
                        }), s(l.$el, "blur", function (e) {
                            u() && !0 === d && (C(e.type, [e]), f())
                        }), m(l.$el, "mousedown", '[contenteditable="true"]', function () {
                            p(), l.$el.blur()
                        }), h("focus", function () {
                            d = !0
                        }), h("blur", function () {
                            d = !1
                        })
                    }(), f(),
                    function a() {
                        s(l.$el, "cut copy paste beforepaste", function (e) {
                            C(e.type, [e])
                        })
                    }(), h("destroy", v), h("shared.destroy", b)
            },
            on: h,
            trigger: C,
            bindClick: function r(e, t, n) {
                m(e, l._mousedown, t, function (e) {
                    l.edit.isDisabled() || function n(e) {
                        var t = i(e.currentTarget);
                        return l.edit.isDisabled() || l.node.hasClass(t.get(0), "fr-disabled") ? (e.preventDefault(), !1) : "mousedown" === e.type && 1 !== e.which || (l.helpers.isMobile() || e.preventDefault(), (l.helpers.isAndroid() || l.helpers.isWindowsPhone()) && 0 === t.parents(".fr-dropdown-menu").length && (e.preventDefault(), e.stopPropagation()), t.addClass("fr-selected"), void l.events.trigger("commands.mousedown", [t]))
                    }(e)
                }, !0), m(e, "".concat(l._mouseup, " ").concat(l._move), t, function (e) {
                    l.edit.isDisabled() || function o(e, t) {
                        var n = i(e.currentTarget);
                        if (l.edit.isDisabled() || l.node.hasClass(n.get(0), "fr-disabled")) return e.preventDefault(), !1;
                        if ("mouseup" === e.type && 1 !== e.which) return !0;
                        if (l.button.getButtons(".fr-selected", !0).get(0) == n.get(0) && !l.node.hasClass(n.get(0), "fr-selected")) return !0;
                        if ("touchmove" !== e.type) {
                            if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !l.node.hasClass(n.get(0), "fr-selected")) return l.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), !1;
                            if (l.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), n.data("dragging") || n.attr("disabled")) return n.removeData("dragging"), !1;
                            var r = n.data("timeout");
                            r && (clearTimeout(r), n.removeData("timeout")), t.apply(l, [e])
                        } else n.data("timeout") || n.data("timeout", setTimeout(function () {
                            n.data("dragging", !0)
                        }, 100))
                    }(e, n)
                }, !0), m(e, "mousedown click mouseup", t, function (e) {
                    l.edit.isDisabled() || e.stopPropagation()
                }, !0), h("window.mouseup", function () {
                    l.edit.isDisabled() || (e.find(t).removeClass("fr-selected"), f())
                }), m(e, "mouseover", t, function () {
                    i(this).hasClass("fr-options") && i(this).prev(".fr-btn").addClass("fr-btn-hover"), i(this).next(".fr-btn").hasClass("fr-options") && i(this).next(".fr-btn").addClass("fr-btn-hover")
                }), m(e, "mouseout", t, function () {
                    i(this).hasClass("fr-options") && i(this).prev(".fr-btn").removeClass("fr-btn-hover"), i(this).next(".fr-btn").hasClass("fr-options") && i(this).next(".fr-btn").removeClass("fr-btn-hover")
                })
            },
            disableBlur: p,
            enableBlur: f,
            blurActive: u,
            focus: c,
            chainTrigger: function E(e, t, n) {
                if (!l.edit.isDisabled() || n) {
                    var r, o;
                    if (0 !== e.indexOf("shared.")) r = a[e];
                    else {
                        if (0 < l.shared.count) return !1;
                        r = l.shared._events[e]
                    }
                    if (r)
                        for (var i = 0; i < r.length; i++) void 0 !== (o = r[i].apply(l, [t])) && (t = o);
                    return l.opts.events && l.opts.events[e] && void 0 !== (o = l.opts.events[e].apply(l, [t])) && (t = o), t
                }
            },
            $on: m,
            $off: function n() {
                t(g), g = [], 0 === l.shared.count && (t(l.shared.$_events), l.shared.$_events = [])
            }
        }
    }, Object.assign(V.DEFAULTS, {
        indentMargin: 20
    }),
    /////////////
    // COMMANDS
    /////////////
    V.COMMANDS = {
        bold: {
            title: `Bold (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+B)`,
            toggle: !0,
            refresh: function (e) {
                var t = this.format.is("strong") || this.format.is("b");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        italic: {
            title: `Italic (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+I)`,
            toggle: !0,
            refresh: function (e) {
                var t = this.format.is("em") || this.format.is("i");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        underline: {
            title: `Underline (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+U)`,
            toggle: !0,
            refresh: function (e) {
                var t = this.format.is("u");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        strikeThrough: {
            title: "Strikethrough",
            toggle: !0,
            refresh: function (e) {
                var t = this.format.is("s");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        subscript: {
            title: "Subscript",
            toggle: !0,
            refresh: function (e) {
                var t = this.format.is("sub");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        superscript: {
            title: "Superscript",
            toggle: !0,
            refresh: function (e) {
                var t = this.format.is("sup");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        outdent: {
            title: `Decrease Indent (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+[)`
        },
        indent: {
            title: `Increase Indent (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+])`
        },
        undo: {
            title: "Undo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        redo: {
            title: "Redo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        insertHR: {
            title: `Insert Horizontal Line (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+K)`
        },
        clearFormatting: {
            title: "Clear Formatting"
        },
        selectAll: {
            title: "Select All",
            undo: !1
        },
        moreText: {
            title: "More Text",
            undo: !1
        },
        moreParagraph: {
            title: "More Paragraph",
            undo: !1
        },
        moreRich: {
            title: "More Rich",
            undo: !1
        },
        moreMisc: {
            title: "More Misc",
            undo: !1
        }
    }, V.RegisterCommand = function (e, t) {
        V.COMMANDS[e] = t
    }, V.MODULES.commands = function (a) {
        var s = a.$;

        function o(e) {
            return a.html.defaultTag() && (e = "<".concat(a.html.defaultTag(), ">").concat(e, "</").concat(a.html.defaultTag(), ">")), e
        }
        var i = {
            bold: function () {
                e("bold", ["strong", "b"])
            },
            subscript: function () {
                a.format.is("sup") && a.format.remove("sup"), e("subscript", "sub")
            },
            superscript: function () {
                a.format.is("sub") && a.format.remove("sub"), e("superscript", "sup")
            },
            italic: function () {
                e("italic", ["em", "i"])
            },
            strikeThrough: function () {
                e("strikeThrough", "s")
            },
            underline: function () {
                e("underline", "u")
            },
            undo: function () {
                a.undo.run()
            },
            redo: function () {
                a.undo.redo()
            },
            indent: function () {
                r(1)
            },
            outdent: function () {
                r(-1)
            },
            show: function () {
                a.opts.toolbarInline && a.toolbar.showInline(null, !0)
            },
            insertHR: function () {
                a.selection.remove();
                var e = "";
                a.core.isEmpty() && (e = o(e = "<br>")), a.html.insert('<hr id="fr-just" class="fr-just">'.concat(e));
                var t, n = a.$el.find("hr#fr-just").length ? a.$el.find("hr#fr-just") : a.$el.find(".fr-just");
                if (n.removeAttr("id"), n.removeAttr("class"), 0 === n.next().length) {
                    var r = a.html.defaultTag();
                    r ? n.after(s(a.doc.createElement(r)).append("<br>").get(0)) : n.after("<br>")
                }
                n.prev().is("hr") ? t = a.selection.setAfter(n.get(0), !1) : n.next().is("hr") ? t = a.selection.setBefore(n.get(0), !1) : a.selection.setAfter(n.get(0), !1) || a.selection.setBefore(n.get(0), !1), t || void 0 === t || (e = o(e = "".concat(V.MARKERS, "<br>")), n.after(e)), a.selection.restore()
            },
            clearFormatting: function () {
                a.format.remove()
            },
            selectAll: function () {
                a.doc.execCommand("selectAll", !1, !1)
            },
            moreText: function (e) {
                t(e)
            },
            moreParagraph: function (e) {
                t(e)
            },
            moreRich: function (e) {
                t(e)
            },
            moreMisc: function (e) {
                t(e)
            }
        };

        function t(e) {
            ! function n(e) {
                var t = a.$tb.find('.fr-more-toolbar[data-name="'.concat(e.attr("data-group-name"), '"]'));
                a.$tb.find(".fr-open").not(e).removeClass("fr-open"), e.toggleClass("fr-open"), a.$tb.find(".fr-more-toolbar").removeClass("fr-overflow-visible"), a.$tb.find(".fr-expanded").not(t).length ? (a.$tb.find(".fr-expanded").toggleClass("fr-expanded"), t.toggleClass("fr-expanded")) : (t.toggleClass("fr-expanded"), a.$box.toggleClass("fr-toolbar-open"), a.$tb.toggleClass("fr-toolbar-open"))
            }(a.$tb.find("[data-cmd=".concat(e, "]"))), a.toolbar.setMoreToolbarsHeight()
        }

        function n(e, t) {
            if (!1 !== a.events.trigger("commands.before", s.merge([e], t || []))) {
                var n = V.COMMANDS[e] && V.COMMANDS[e].callback || i[e],
                    r = !0,
                    o = !1;
                V.COMMANDS[e] && ("undefined" != typeof V.COMMANDS[e].focus && (r = V.COMMANDS[e].focus), "undefined" != typeof V.COMMANDS[e].accessibilityFocus && (o = V.COMMANDS[e].accessibilityFocus)), (!a.core.hasFocus() && r && !a.popups.areVisible() || !a.core.hasFocus() && o && a.accessibility.hasFocus()) && a.events.focus(!0), V.COMMANDS[e] && !1 !== V.COMMANDS[e].undo && (a.$el.find(".fr-marker").length && (a.events.disableBlur(), a.selection.restore()), a.undo.saveStep()), n && n.apply(a, s.merge([e], t || [])), a.events.trigger("commands.after", s.merge([e], t || [])), V.COMMANDS[e] && !1 !== V.COMMANDS[e].undo && a.undo.saveStep()
            }
        }

        function e(e, t) {
            a.format.toggle(t)
        }

        // Indent/outdent
        function r(e) {
            // Stash
            a.selection.save(),
            a.html.wrap(!0, !0, !0, !0),
            a.selection.restore();

            // Iterate through selected blocks
            for (var t = a.selection.blocks(), n = 0; n < t.length; n++) {
                // Modify is selected block or its parent are not 'li'
                if ("LI" !== t[n].tagName || "LI" !== t[n].parentNode.tagName) {
                    var r = s(t[n]);

                    // If parent is 'li' modify r to use parent
                    "LI" != t[n].tagName && "LI" == t[n].parentNode.tagName && (r = s(t[n].parentNode));

                    // Define margin based on direction of text editor (left-to-right/right-to-left)
                    var o = "rtl" === a.opts.direction || "rtl" === r.css("direction") ? "margin-right" : "margin-left";

                    // Get current margin in px
                    var i = a.helpers.getPX(r.css(o));

                    // Do nothing if called for indent 
                    if (r.width() < 2 * a.opts.indentMargin && 0 < e){
                        continue;
                    }

                    "UL" != t[n].parentNode.tagName && "OL" != t[n].parentNode.tagName && "LI" != t[n].parentNode.tagName && r.css(o, Math.max(i + e * a.opts.indentMargin, 0) || ""),
                    r.removeClass("fr-temp-div")
                }
            }
            
            // Stash pop
            a.selection.save(),
            a.html.unwrap(),
            a.selection.restore()
        }

        function l(e) {
            return function () {
                n(e)
            }
        }
        var c = {};
        for (var d in i) Object.prototype.hasOwnProperty.call(i, d) && (c[d] = l(d));
        return Object.assign(c, {
            exec: n,
            _init: function f() {
                a.events.on("keydown", function (e) {
                    var t = a.selection.element();
                    if (t && "HR" === t.tagName && !a.keys.isArrow(e.which)) return e.preventDefault(), !1
                }), a.events.on("keyup", function (e) {
                    var t = a.selection.element();
                    if (t && "HR" === t.tagName)
                        if (e.which === V.KEYCODE.ARROW_LEFT || e.which === V.KEYCODE.ARROW_UP) {
                            if (t.previousSibling) return a.node.isBlock(t.previousSibling)
                                ? a.selection.setAtEnd(t.previousSibling)
                                : s(t).before(V.MARKERS), a.selection.restore(), !1
                        } else if ((e.which === V.KEYCODE.ARROW_RIGHT || e.which === V.KEYCODE.ARROW_DOWN) && t.nextSibling) return a.node.isBlock(t.nextSibling) ? a.selection.setAtStart(t.nextSibling) : s(t).after(V.MARKERS), a.selection.restore(), !1
                }), a.events.on("mousedown", function (e) {
                    if (e.target && "HR" === e.target.tagName) return e.preventDefault(), e.stopPropagation(), !1
                }), a.events.on("mouseup", function () {
                    var e = a.selection.element();
                    e === a.selection.endElement() && e && "HR" === e.tagName && (e.nextSibling && (a.node.isBlock(e.nextSibling) ? a.selection.setAtStart(e.nextSibling) : s(e).after(V.MARKERS)), a.selection.restore())
                })
            }
        })
    },
    ////////////////
    // CURSOR LISTS
    ////////////////
    V.MODULES.cursorLists = function (g) {
        var m = g.$;

        function C(e) {
            for (var t = e;
                "LI" !== t.tagName;) t = t.parentNode;
            return t
        }

        function v(e) {
            for (var t = e; !g.node.isList(t);) t = t.parentNode;
            return t
        }
        return {
            _startEnter: function b(e) {
                var t, n = C(e),
                    r = n.nextSibling,
                    o = n.previousSibling,
                    i = g.html.defaultTag();
                if (g.node.isEmpty(n, !0) && r) {
                    for (var a = "", s = "", l = e.parentNode; !g.node.isList(l) && l.parentNode && ("LI" !== l.parentNode.tagName || l.parentNode === n);) a = g.node.openTagString(l) + a, s += g.node.closeTagString(l), l = l.parentNode;
                    a = g.node.openTagString(l) + a, s += g.node.closeTagString(l);
                    var c = "";
                    for (c = l.parentNode && "LI" === l.parentNode.tagName ? "".concat(s, "<li>").concat(V.MARKERS, "<br>").concat(a) : i ? "".concat(s, "<").concat(i, ">").concat(V.MARKERS, "<br></").concat(i, ">").concat(a) : "".concat(s + V.MARKERS, "<br>").concat(a);
                        ["UL", "OL"].indexOf(l.tagName) < 0 || l.parentNode && "LI" === l.parentNode.tagName;) l = l.parentNode;
                    m(n).replaceWith('<span id="fr-break"></span>');
                    var d = g.node.openTagString(l) + m(l).html() + g.node.closeTagString(l);
                    d = d.replace(/<span id="fr-break"><\/span>/g, c), m(l).replaceWith(d), g.$el.find("li:empty").remove()
                } else if (o && r || !g.node.isEmpty(n, !0)) {
                    for (var f = "<br>", p = e.parentNode; p && "LI" !== p.tagName;) f = g.node.openTagString(p) + f + g.node.closeTagString(p), p = p.parentNode;
                    m(n).before("<li>".concat(f, "</li>")), m(e).remove()
                } else if (o) {
                    t = v(n);
                    for (var u = "".concat(V.MARKERS, "<br>"), h = e.parentNode; h && "LI" !== h.tagName;) u = g.node.openTagString(h) + u + g.node.closeTagString(h), h = h.parentNode;
                    t.parentNode && "LI" === t.parentNode.tagName ? m(t.parentNode).after("<li>".concat(u, "</li>")) : i ? m(t).after("<".concat(i, ">").concat(u, "</").concat(i, ">")) : m(t).after(u), m(n).remove()
                } else (t = v(n)).parentNode && "LI" === t.parentNode.tagName ? r ? m(t.parentNode).before("".concat(g.node.openTagString(n) + V.MARKERS, "<br></li>")) : m(t.parentNode).after("".concat(g.node.openTagString(n) + V.MARKERS, "<br></li>")) : i ? m(t).before("<".concat(i, ">").concat(V.MARKERS, "<br></").concat(i, ">")) : m(t).before("".concat(V.MARKERS, "<br>")), m(n).remove()
            },
            _middleEnter: function c(e) {
                for (var t = C(e), n = "", r = e, o = "", i = "", a = !1; r !== t;) {
                    var s = "A" === (r = r.parentNode).tagName && g.cursor.isAtEnd(e, r) ? "fr-to-remove" : "";
                    a || r == t || g.node.isBlock(r) || (a = !0, o += V.INVISIBLE_SPACE), o = g.node.openTagString(m(r).clone().addClass(s).get(0)) + o, i = g.node.closeTagString(r) + i
                }
                n = i + n + o + V.MARKERS + (g.opts.keepFormatOnDelete ? V.INVISIBLE_SPACE : ""), m(e).replaceWith('<span id="fr-break"></span>');
                var l = g.node.openTagString(t) + m(t).html() + g.node.closeTagString(t);
                l = l.replace(/<span id="fr-break"><\/span>/g, n), m(t).replaceWith(l)
            },
            _endEnter: function l(e) {
                for (var t = C(e), n = V.MARKERS, r = "", o = e, i = !1; o !== t;)
                    if (!(o = o.parentNode).classList.contains("fr-img-space-wrap") && !o.classList.contains("fr-img-space-wrap2")) {
                        var a = "A" === o.tagName && g.cursor.isAtEnd(e, o) ? "fr-to-remove" : "";
                        i || o === t || g.node.isBlock(o) || (i = !0, r += V.INVISIBLE_SPACE), r = g.node.openTagString(m(o).clone().addClass(a).get(0)) + r, n += g.node.closeTagString(o)
                    } var s = r + n;
                m(e).remove(), m(t).after(s)
            },
            _backspace: function d(e) {
                var t = C(e),
                    n = t.previousSibling;
                if (n) {
                    n = m(n).find(g.html.blockTagsQuery()).get(-1) || n, m(e).replaceWith(V.MARKERS);
                    var r = g.node.contents(n);
                    r.length && "BR" === r[r.length - 1].tagName && m(r[r.length - 1]).remove(), m(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                        this.parentNode === t && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                    });
                    for (var o, i = g.node.contents(t)[0]; i && !g.node.isList(i);) o = i.nextSibling, m(n).append(i), i = o;
                    for (n = t.previousSibling; i;) o = i.nextSibling, m(n).append(i), i = o;
                    1 < (r = g.node.contents(n)).length && "BR" === r[r.length - 1].tagName && m(r[r.length - 1]).remove(), m(t).remove()
                } else {
                    var a = v(t);
                    if (m(e).replaceWith(V.MARKERS), a.parentNode && "LI" === a.parentNode.tagName) {
                        var s = a.previousSibling;
                        g.node.isBlock(s) ? (m(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                            this.parentNode === t && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                        }), m(s).append(m(t).html())) : m(a).before(m(t).html())
                    } else {
                        var l = g.html.defaultTag();
                        l && 0 === m(t).find(g.html.blockTagsQuery()).length ? m(a).before("<".concat(l, ">").concat(m(t).html(), "</").concat(l, ">")) : m(a).before(m(t).html())
                    }
                    m(t).remove(), g.html.wrap(), 0 === m(a).find("li").length && m(a).remove()
                }
            },
            _del: function f(e) {
                var t, n = C(e),
                    r = n.nextSibling;
                if (r) {
                    (t = g.node.contents(r)).length && "BR" === t[0].tagName && m(t[0]).remove(), m(r).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                        this.parentNode === r && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                    });
                    for (var o, i = e, a = g.node.contents(r)[0]; a && !g.node.isList(a);) o = a.nextSibling, m(i).after(a), i = a, a = o;
                    for (; a;) o = a.nextSibling, m(n).append(a), a = o;
                    m(e).replaceWith(V.MARKERS), m(r).remove()
                } else {
                    for (var s = n; !s.nextSibling && s !== g.el;) s = s.parentNode;
                    if (s === g.el) return !1;
                    if (s = s.nextSibling, g.node.isBlock(s)) V.NO_DELETE_TAGS.indexOf(s.tagName) < 0 && (m(e).replaceWith(V.MARKERS), (t = g.node.contents(n)).length && "BR" === t[t.length - 1].tagName && m(t[t.length - 1]).remove(), m(n).append(m(s).html()), m(s).remove());
                    else {
                        for ((t = g.node.contents(n)).length && "BR" === t[t.length - 1].tagName && m(t[t.length - 1]).remove(), m(e).replaceWith(V.MARKERS); s && !g.node.isBlock(s) && "BR" !== s.tagName;) m(n).append(m(s)), s = s.nextSibling;
                        m(s).remove()
                    }
                }
            }
        }
    }, V.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], V.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], V.MODULES.cursor = function (h) {
        var g = h.$;

        function d(e) {
            return !!e && (!!h.node.isBlock(e) || (e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? d(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && d(e.parentNode)))
        }

        function f(e) {
            return !!e && (!!h.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? f(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !h.node.hasClass(e.parentNode, "fr-inner")) || f(e.parentNode))))
        }

        function u(e, t) {
            return !!e && (e !== h.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? u(e.previousSibling, t) : !e.previousSibling && (e.parentNode === t || u(e.parentNode, t))))
        }

        function m(e, t) {
            return !!e && (e !== h.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? m(e.nextSibling, t) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode === t || m(e.parentNode, t))))
        }

        function p(e) {
            return 0 < g(e).parentsUntil(h.$el, "LI").length && 0 === g(e).parentsUntil("LI", "TABLE").length
        }

        function C(e, t) {
            var n = new RegExp("".concat(t ? "^" : "", "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})").concat(t ? "" : "$"), "i"),
                r = e.match(n);
            return r ? r[0].length : 1
        }

        function v(e) {
            for (var t, n = e; !n.previousSibling;)
                if (n = n.parentNode, h.node.isElement(n)) return !1;
            n = n.previousSibling;
            var r = h.opts.htmlAllowedEmptyTags,
                o = n.tagName && n.tagName.toLowerCase();
            if ((!h.node.isBlock(n) || n.lastChild && o && 0 <= r.indexOf(o)) && h.node.isEditable(n)) {
                for (t = h.node.contents(n); n.nodeType !== Node.TEXT_NODE && !h.node.isDeletable(n) && t.length && h.node.isEditable(n);) n = t[t.length - 1], t = h.node.contents(n);
                if (n.nodeType === Node.TEXT_NODE) {
                    var i = n.textContent,
                        a = i.length;
                    if (i.length && "\n" === i[i.length - 1]) return n.textContent = i.substring(0, a - 2), 0 === n.textContent.length && n.parentNode.removeChild(n), v(e);
                    if (h.opts.tabSpaces && i.length >= h.opts.tabSpaces) 0 === i.substr(i.length - h.opts.tabSpaces, i.length - 1).replace(/ /g, "").replace(new RegExp(V.UNICODE_NBSP, "g"), "").length && (a = i.length - h.opts.tabSpaces + 1);
                    n.textContent = i.substring(0, a - C(i)), h.opts.htmlUntouched && !e.nextSibling && n.textContent.length && " " === n.textContent[n.textContent.length - 1] && (n.textContent = n.textContent.substring(0, n.textContent.length - 1) + V.UNICODE_NBSP);
                    var s = i.length !== n.textContent.length;
                    if (0 === n.textContent.length)
                        if (s && h.opts.keepFormatOnDelete) g(n).after(V.INVISIBLE_SPACE + V.MARKERS);
                        else if (0 !== i.length && h.node.isBlock(n.parentNode)) g(n).after(V.MARKERS);
                        else if ((2 != n.parentNode.childNodes.length || n.parentNode != e.parentNode) && 1 != n.parentNode.childNodes.length || h.node.isBlock(n.parentNode) || h.node.isElement(n.parentNode) || !h.node.isDeletable(n.parentNode)) {
                            for (var l, c = n; !h.node.isElement(n.parentNode) && h.node.isEmpty(n.parentNode) && V.NO_DELETE_TAGS.indexOf(n.parentNode.tagName) < 0;)
                                if ("A" === (n = n.parentNode).tagName) {
                                    var d = n.childNodes[0];
                                    for (g(n).before(d), l = !0; 0 < d.childNodes.length;) d = d.childNodes[0];
                                    n.parentNode.removeChild(n), n = d;
                                    break
                                } l || (n = c), g(n).after(V.MARKERS), h.node.isElement(n.parentNode) && !e.nextSibling && n.previousSibling && "BR" === n.previousSibling.tagName && g(e).after("<br>");
                            var f = n.parentNode;
                            n.parentNode.removeChild(n), h.node.isEmpty(f) && g(f).html(V.INVISIBLE_SPACE + V.MARKERS)
                        } else g(n.parentNode).after(V.MARKERS), g(n.parentNode).remove();
                    else g(n).after(V.MARKERS)
                } else h.node.isDeletable(n) ? (g(n).after(V.MARKERS), g(n).remove()) : e.nextSibling && "BR" === e.nextSibling.tagName && h.node.isVoid(n) && "BR" !== n.tagName ? (g(e.nextSibling).remove(), g(e).replaceWith(V.MARKERS)) : !1 !== h.events.trigger("node.remove", [g(n)]) && (g(n).after(V.MARKERS), g(n).remove())
            } else if (V.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (h.node.isEditable(n) || h.node.isDeletable(n)))
                if (h.node.isDeletable(n)) g(e).replaceWith(V.MARKERS), g(n).remove();
                else if (h.node.isEmpty(n) && !h.node.isList(n)) g(n).remove(), g(e).replaceWith(V.MARKERS);
                else {
                    for (h.node.isList(n) && (n = g(n).find("li").last().get(0)), (t = h.node.contents(n)) && "BR" === t[t.length - 1].tagName && g(t[t.length - 1]).remove(), t = h.node.contents(n); t && h.node.isBlock(t[t.length - 1]);) n = t[t.length - 1], t = h.node.contents(n);
                    g(n).append(V.MARKERS);
                    for (var p = e; !p.previousSibling;) p = p.parentNode;
                    for (; p && "BR" !== p.tagName && !h.node.isBlock(p);) {
                        var u = p;
                        p = p.nextSibling, g(n).append(u)
                    }
                    p && "BR" === p.tagName && g(p).remove(), g(e).remove()
                } else e.nextSibling && "BR" === e.nextSibling.tagName && g(e.nextSibling).remove();
            return !0
        }

        function i(e) {
            var t = 0 < g(e).parentsUntil(h.$el, "BLOCKQUOTE").length,
                n = h.node.deepestParent(e, [], !t);
            if (n && "BLOCKQUOTE" === n.tagName) {
                var r = h.node.deepestParent(e, [g(e).parentsUntil(h.$el, "BLOCKQUOTE").get(0)]);
                r && r.nextSibling && (n = r)
            }
            if (null !== n) {
                var o, i = n.nextSibling;
                if (h.node.isBlock(n) && (h.node.isEditable(n) || h.node.isDeletable(n)) && i && V.NO_DELETE_TAGS.indexOf(i.tagName) < 0)
                    if (h.node.isDeletable(i)) g(i).remove(), g(e).replaceWith(V.MARKERS);
                    else if (h.node.isBlock(i) && h.node.isEditable(i))
                        if (h.node.isList(i))
                            if (h.node.isEmpty(n, !0)) g(n).remove(), g(i).find("li").first().prepend(V.MARKERS);
                            else {
                                var a = g(i).find("li").first();
                                "BLOCKQUOTE" === n.tagName && (o = h.node.contents(n)).length && h.node.isBlock(o[o.length - 1]) && (n = o[o.length - 1]), 0 === a.find("ul, ol").length && (g(e).replaceWith(V.MARKERS), a.find(h.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                                    this.parentNode === a.get(0) && g(this).replaceWith(g(this).html() + (h.node.isEmpty(this) ? "" : "<br>"))
                                }), g(n).append(h.node.contents(a.get(0))), a.remove(), 0 === g(i).find("li").length && g(i).remove())
                            }
                        else {
                            if ((o = h.node.contents(i)).length && "BR" === o[0].tagName && g(o[0]).remove(), "BLOCKQUOTE" !== i.tagName && "BLOCKQUOTE" === n.tagName)
                                for (o = h.node.contents(n); o.length && h.node.isBlock(o[o.length - 1]);) n = o[o.length - 1], o = h.node.contents(n);
                            else if ("BLOCKQUOTE" === i.tagName && "BLOCKQUOTE" !== n.tagName)
                                for (o = h.node.contents(i); o.length && h.node.isBlock(o[0]);) i = o[0], o = h.node.contents(i);
                            g(e).replaceWith(V.MARKERS), g(n).append(i.innerHTML), g(i).remove()
                        } else {
                        for (g(e).replaceWith(V.MARKERS); i && "BR" !== i.tagName && !h.node.isBlock(i) && h.node.isEditable(i);) {
                            var s = i;
                            i = i.nextSibling, g(n).append(s)
                        }
                        i && "BR" === i.tagName && h.node.isEditable(i) && g(i).remove()
                    }
            }
        }

        function n(e) {
            for (var t, n = e; !n.nextSibling;)
                if (n = n.parentNode, h.node.isElement(n)) return !1;
            if ("BR" === (n = n.nextSibling).tagName && h.node.isEditable(n))
                if (n.nextSibling) {
                    if (h.node.isBlock(n.nextSibling) && h.node.isEditable(n.nextSibling)) {
                        if (!(V.NO_DELETE_TAGS.indexOf(n.nextSibling.tagName) < 0)) return void g(n).remove();
                        n = n.nextSibling, g(n.previousSibling).remove()
                    }
                } else if (d(n)) {
                    if (p(e)) h.cursorLists._del(e);
                    else h.node.deepestParent(n) && ((!h.node.isEmpty(h.node.blockParent(n)) || (h.node.blockParent(n).nextSibling && V.NO_DELETE_TAGS.indexOf(h.node.blockParent(n).nextSibling.tagName)) < 0) && g(n).remove(), i(e));
                    return
                }
            if (!h.node.isBlock(n) && h.node.isEditable(n)) {
                for (t = h.node.contents(n); n.nodeType !== Node.TEXT_NODE && t.length && !h.node.isDeletable(n) && h.node.isEditable(n);) n = t[0], t = h.node.contents(n);
                n.nodeType === Node.TEXT_NODE ? (g(n).before(V.MARKERS), n.textContent.length && (n.textContent = n.textContent.substring(C(n.textContent, !0), n.textContent.length))) : h.node.isDeletable(n) ? (g(n).before(V.MARKERS), g(n).remove()) : !1 !== h.events.trigger("node.remove", [g(n)]) && (g(n).before(V.MARKERS), g(n).remove()), g(e).remove()
            } else if (V.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (h.node.isEditable(n) || h.node.isDeletable(n)))
                if (h.node.isDeletable(n)) g(e).replaceWith(V.MARKERS), g(n).remove();
                else if (h.node.isList(n)) e.previousSibling ? (g(n).find("li").first().prepend(e), h.cursorLists._backspace(e)) : (g(n).find("li").first().prepend(V.MARKERS), g(e).remove());
                else if ((t = h.node.contents(n)) && "BR" === t[0].tagName && g(t[0]).remove(), t && "BLOCKQUOTE" === n.tagName) {
                    var r = t[0];
                    for (g(e).before(V.MARKERS); r && "BR" !== r.tagName;) {
                        var o = r;
                        r = r.nextSibling, g(e).before(o)
                    }
                    r && "BR" === r.tagName && g(r).remove()
                } else g(e).after(g(n).html()).after(V.MARKERS), g(n).remove()
        }

        function a() {
            for (var e = h.el.querySelectorAll("blockquote:empty"), t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t])
        }

        function b(e, t, n) {
            var r, o = h.node.deepestParent(e, [], !n);
            if (o && "BLOCKQUOTE" === o.tagName) return m(e, o) ? (r = h.html.defaultTag(), t ? g(e).replaceWith("<br>" + V.MARKERS) : r ? g(o).after("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : g(o).after("".concat(V.MARKERS, "<br>")), g(e).remove()) : L(e, t, n), !1;
            if (null === o) (r = h.html.defaultTag()) && h.node.isElement(e.parentNode) ? g(e).replaceWith("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : !e.previousSibling || g(e.previousSibling).is("br") || e.nextSibling ? g(e).replaceWith("<br>".concat(V.MARKERS)) : g(e).replaceWith("<br>".concat(V.MARKERS, "<br>"));
            else {
                var i = e,
                    a = "";
                "PRE" != o.tagName || e.nextSibling || (t = !0), h.node.isBlock(o) && !t || (a = "<br/>");
                var s, l = "",
                    c = "",
                    d = "",
                    f = "";
                (r = h.html.defaultTag()) && h.node.isBlock(o) && (d = "<".concat(r, ">"), f = "</".concat(r, ">"), o.tagName === r.toUpperCase() && (d = h.node.openTagString(g(o).clone().removeAttr("id").get(0))));
                do {
                    if (i = i.parentNode, !t || i !== o || t && !h.node.isBlock(o))
                        if (l += h.node.closeTagString(i), i === o && h.node.isBlock(o)) c = d + c;
                        else {
                            var p = ("A" === i.tagName || h.node.hasClass(i, "fa")) && m(e, i) ? "fr-to-remove" : "";
                            c = h.node.openTagString(g(i).clone().addClass(p).get(0)) + c
                        }
                } while (i !== o);
                a = l + a + c + (e.parentNode === o && h.node.isBlock(o) ? "" : V.INVISIBLE_SPACE) + V.MARKERS, h.node.isBlock(o) && !g(o).find("*").last().is("br") && g(o).append("<br/>"), g(e).after('<span id="fr-break"></span>'), g(e).remove(), o.nextSibling && !h.node.isBlock(o.nextSibling) || h.node.isBlock(o) || g(o).after("<br>"), s = (s = !t && h.node.isBlock(o) ? h.node.openTagString(o) + g(o).html() + f : h.node.openTagString(o) + g(o).html() + h.node.closeTagString(o)).replace(/<span id="fr-break"><\/span>/g, a), g(o).replaceWith(s)
            }
        }

        function L(e, t, n) {
            var r = h.node.deepestParent(e, [], !n);
            if (null === r) h.html.defaultTag() && e.parentNode === h.el ? g(e).replaceWith("<".concat(h.html.defaultTag(), ">").concat(V.MARKERS, "<br></").concat(h.html.defaultTag(), ">")) : (e.nextSibling && !h.node.isBlock(e.nextSibling) || g(e).after("<br>"), g(e).replaceWith("<br>".concat(V.MARKERS)));
            else if (e.previousSibling && "IMG" == e.previousSibling.tagName || e.nextSibling && "IMG" == e.nextSibling.tagName) g(e).replaceWith("<" + h.html.defaultTag() + ">" + V.MARKERS + "<br></" + h.html.defaultTag() + ">");
            else {
                var o = e,
                    i = "";
                "PRE" === r.tagName && (t = !0), h.node.isBlock(r) && !t || (i = "<br>");
                var a = "",
                    s = "";
                do {
                    var l = o;
                    if (o = o.parentNode, "BLOCKQUOTE" === r.tagName && h.node.isEmpty(l) && !h.node.hasClass(l, "fr-marker") && g(l).contains(e) && g(l).after(e), "BLOCKQUOTE" !== r.tagName || !m(e, o) && !u(e, o))
                        if (!t || o !== r || t && !h.node.isBlock(r)) {
                            a += h.node.closeTagString(o);
                            var c = "A" == o.tagName && m(e, o) || h.node.hasClass(o, "fa") ? "fr-to-remove" : "";
                            s = h.node.openTagString(g(o).clone().addClass(c).removeAttr("id").get(0)) + s
                        } else "BLOCKQUOTE" == r.tagName && t && (s = a = "")
                } while (o !== r);
                var d = r === e.parentNode && h.node.isBlock(r) || e.nextSibling;
                if ("BLOCKQUOTE" === r.tagName)
                    if (e.previousSibling && h.node.isBlock(e.previousSibling) && e.nextSibling && "BR" === e.nextSibling.tagName && (g(e.nextSibling).after(e), e.nextSibling && "BR" === e.nextSibling.tagName && g(e.nextSibling).remove()), t) i = a + i + V.MARKERS + s;
                    else {
                        var f = h.html.defaultTag();
                        i = "".concat(a + i + (f ? "<".concat(f, ">") : "") + V.MARKERS, "<br>").concat(f ? "</".concat(f, ">") : "").concat(s)
                    }
                else i = a + i + s + (d ? "" : V.INVISIBLE_SPACE) + V.MARKERS;
                g(e).replaceWith('<span id="fr-break"></span>');
                var p = h.node.openTagString(r) + g(r).html() + h.node.closeTagString(r);
                p = p.replace(/<span id="fr-break"><\/span>/g, i), g(r).replaceWith(p)
            }
        }
        return {
            enter: function E(e) {
                var t = h.markers.insert();
                if (!t) return !0;
                for (var n = t.parentNode; n && !h.node.isElement(n);) {
                    if ("false" === n.getAttribute("contenteditable")) return g(t).replaceWith(V.MARKERS), h.selection.restore(), !1;
                    if ("true" === n.getAttribute("contenteditable")) break;
                    n = n.parentNode
                }
                h.el.normalize();
                var r = !1;
                0 < g(t).parentsUntil(h.$el, "BLOCKQUOTE").length && (r = !0), g(t).parentsUntil(h.$el, "TD, TH").length && (r = !1), d(t) ? !p(t) || e || r ? b(t, e, r) : h.cursorLists._endEnter(t) : f(t) ? !p(t) || e || r ? function l(e, t, n) {
                    var r, o = h.node.deepestParent(e, [], !n);
                    if (o && "TABLE" === o.tagName) return g(o).find("td, th").first().prepend(e), l(e, t, n);
                    if (o && "BLOCKQUOTE" === o.tagName)
                        if (u(e, o)) {
                            if (!t) return (r = h.html.defaultTag()) ? g(o).before("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : g(o).before("".concat(V.MARKERS, "<br>")), g(e).remove(), !1
                        } else m(e, o) ? b(e, t, !0) : L(e, t, !0);
                    if (null === o) (r = h.html.defaultTag()) && h.node.isElement(e.parentNode) ? g(e).replaceWith("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : g(e).replaceWith("<br>".concat(V.MARKERS));
                    else {
                        if (r = h.html.defaultTag(), h.node.isBlock(o))
                            if ("PRE" === o.tagName && (t = !0), t) g(e).remove(), g(o).prepend("<br>".concat(V.MARKERS));
                            else if (e.nextSibling && "IMG" == e.nextSibling.tagName || e.nextSibling && e.nextSibling.nextElementSibling && "IMG" == e.nextSibling.nextElementSibling) g(e).replaceWith("<" + h.html.defaultTag() + ">" + V.MARKERS + "<br></" + h.html.defaultTag() + ">");
                            else {
                                if (h.node.isEmpty(o, !0)) return b(e, t, n);
                                if (h.opts.keepFormatOnDelete || "DIV" === o.tagName || "div" === h.html.defaultTag())
                                    if (!h.opts.keepFormatOnDelete && "DIV" === o.tagName || "div" === h.html.defaultTag()) g(o).before("<" + h.html.defaultTag() + "><br></" + h.html.defaultTag() + ">");
                                    else {
                                        for (var i = e, a = V.INVISIBLE_SPACE; i !== o && !h.node.isElement(i);) i = i.parentNode, a = h.node.openTagString(i) + a + h.node.closeTagString(i);
                                        g(o).before(a)
                                    }
                                else g(o).before("".concat(h.node.openTagString(g(o).clone().removeAttr("id").get(0)), "<br>").concat(h.node.closeTagString(o)))
                            } else g(o).before("<br>");
                        g(e).remove()
                    }
                }(t, e, r) : h.cursorLists._startEnter(t) : !p(t) || e || r ? L(t, e, r) : h.cursorLists._middleEnter(t),
                    function c() {
                        h.$el.find(".fr-to-remove").each(function () {
                            for (var e = h.node.contents(this), t = 0; t < e.length; t++) e[t].nodeType === Node.TEXT_NODE && (e[t].textContent = e[t].textContent.replace(/\u200B/g, ""));
                            g(this).replaceWith(this.innerHTML)
                        })
                    }(), h.html.fillEmptyBlocks(!0), h.opts.htmlUntouched || (h.html.cleanEmptyTags(), h.clean.lists(), h.spaces.normalizeAroundCursor()), h.selection.restore();
                var o = h.o_win.innerHeight;
                if (h.$oel[0].offsetHeight > o) {
                    var i = h.helpers.scrollTop(),
                        a = h.selection.blocks();
                    if (a && 0 < a.length && a[0].offsetTop) {
                        var s = a[0].offsetTop;
                        o - 100 < s - i ? h.o_win.scroll(0, s - o + 120) : s - i < 0 && h.o_win.scroll(0, s - 20)
                    }
                }
            },
            backspace: function s() {
                var e = !1,
                    t = h.markers.insert();
                if (!t) return !0;
                for (var n = t.parentNode; n && !h.node.isElement(n);) {
                    if ("false" === n.getAttribute("contenteditable")) return g(t).replaceWith(V.MARKERS), h.selection.restore(), !1;
                    if (n.innerText.length && "true" === n.getAttribute("contenteditable")) break;
                    n = n.parentNode
                }
                h.el.normalize();
                var r = t.previousSibling;
                if (r) {
                    var o = r.textContent;
                    o && o.length && 8203 === o.charCodeAt(o.length - 1) && (1 === o.length ? g(r).remove() : r.textContent = r.textContent.substr(0, o.length - C(o)))
                }
                return d(t) ? p(t) && u(t, g(t).parents("li").first().get(0)) ? h.cursorLists._backspace(t) : e = v(t) : f(t) ? p(t) && u(t, g(t).parents("li").first().get(0)) ? h.cursorLists._backspace(t) : function l(e) {
                    for (var t = 0 < g(e).parentsUntil(h.$el, "BLOCKQUOTE").length, n = h.node.deepestParent(e, [], !t), r = n; n && !n.previousSibling && "BLOCKQUOTE" !== n.tagName && n.parentElement !== h.el && !h.node.hasClass(n.parentElement, "fr-inner") && V.SIMPLE_ENTER_TAGS.indexOf(n.parentElement.tagName) < 0;) n = n.parentElement;
                    if (n && "BLOCKQUOTE" === n.tagName) {
                        var o = h.node.deepestParent(e, [g(e).parentsUntil(h.$el, "BLOCKQUOTE").get(0)]);
                        o && o.previousSibling && (r = n = o)
                    }
                    if (null !== n) {
                        var i, a = n.previousSibling;
                        if (h.node.isBlock(n) && h.node.isEditable(n))
                            if (a && V.NO_DELETE_TAGS.indexOf(a.tagName) < 0) {
                                if (h.node.isDeletable(a)) g(a).remove(), g(e).replaceWith(V.MARKERS);
                                else if (h.node.isEditable(a))
                                    if (h.node.isBlock(a))
                                        if (h.node.isEmpty(a) && !h.node.isList(a)) g(a).remove(), g(e).after(h.opts.keepFormatOnDelete ? V.INVISIBLE_SPACE : "");
                                        else {
                                            if (h.node.isList(a) && (a = g(a).find("li").last().get(0)), (i = h.node.contents(a)).length && "BR" === i[i.length - 1].tagName && g(i[i.length - 1]).remove(), "BLOCKQUOTE" === a.tagName && "BLOCKQUOTE" !== n.tagName)
                                                for (i = h.node.contents(a); i.length && h.node.isBlock(i[i.length - 1]);) a = i[i.length - 1], i = h.node.contents(a);
                                            else if ("BLOCKQUOTE" !== a.tagName && "BLOCKQUOTE" === r.tagName)
                                                for (i = h.node.contents(r); i.length && h.node.isBlock(i[0]);) r = i[0], i = h.node.contents(r);
                                            if (h.node.isEmpty(n)) g(e).remove(), h.selection.setAtEnd(a, !0);
                                            else {
                                                g(e).replaceWith(V.MARKERS);
                                                var s = a.childNodes;
                                                h.node.isBlock(s[s.length - 1]) ? g(s[s.length - 1]).append(r.innerHTML) : g(a).append(r.innerHTML)
                                            }
                                            g(r).remove(), h.node.isEmpty(n) && g(n).remove()
                                        }
                                    else g(e).replaceWith(V.MARKERS), "BLOCKQUOTE" === n.tagName && a.nodeType === Node.ELEMENT_NODE ? g(a).remove() : (g(a).after(h.node.isEmpty(n) ? "" : g(n).html()), g(n).remove(), "BR" === a.tagName && g(a).remove())
                            } else a || (n && "BLOCKQUOTE" === n.tagName && 0 === g(n).text().replace(/\u200B/g, "").length ? g(n).remove() : h.node.isEmpty(n) && n.parentNode && h.node.isEditable(n.parentNode) && n.parentNode != h.el && g(n.parentNode).remove())
                    }
                }(t) : e = v(t), g(t).remove(), a(), h.html.fillEmptyBlocks(!0), h.opts.htmlUntouched || (h.html.cleanEmptyTags(), h.clean.lists(), h.spaces.normalizeAroundCursor()), h.selection.restore(), e
            },
            del: function r() {
                var e = h.markers.insert();
                if (!e) return !1;
                if (h.el.normalize(), d(e))
                    if (p(e))
                        if (0 === g(e).parents("li").first().find("ul, ol").length) h.cursorLists._del(e);
                        else {
                            var t = g(e).parents("li").first().find("ul, ol").first().find("li").first();
                            (t = t.find(h.html.blockTagsQuery()).get(-1) || t).prepend(e), h.cursorLists._backspace(e)
                        }
                    else i(e);
                else f(e), n(e);
                g(e).remove(), a(), h.html.fillEmptyBlocks(!0), h.opts.htmlUntouched || (h.html.cleanEmptyTags(), h.clean.lists()), h.spaces.normalizeAroundCursor(), h.selection.restore()
            },
            isAtEnd: m,
            isAtStart: u
        }
    },
    /////////////////
    // DATA MODULE
    /////////////////
    V.MODULES.data = function (f) {
        function p(e) {
            return e
        }

        function c(e) {
            for (var t = e.toString(), n = 0, r = 0; r < t.length; r++) n += parseInt(t.charAt(r), 10);
            return 10 < n ? n % 9 + 1 : n
        }

        function d(e, t, n) {
            for (var r = Math.abs(n); 0 < r--;) e -= t;
            return n < 0 && (e += 123), e
        }

        function u(e) {
            return e && "block" !== e.css("display") ? (e.remove(), !0) : e && 0 === f.helpers.getPX(e.css("height")) ? (e.remove(), !0) : !(!e || "absolute" !== e.css("position") && "fixed" !== e.css("position") || (e.remove(), 0))
        }

        function h(e) {
            return e && 0 === f.$box.find(e).length
        }

        function g() {
            if (10 < e && (f[p(N("0ppecjvc=="))](), setTimeout(function () {
                L.FE = null
            }, 10)), !f.$box) return !1;
            f.$wp.prepend(N(p(N(T)))), v = f.$wp.find("> div").first(), b = v.find("> a"), "rtl" === f.opts.direction && v.css("left", "auto").css("right", 0).attr("direction", "rtl"), e++
        }

        function m(e) {
            for (var t = [N("9qqG-7amjlwq=="), N("KA3B3C2A6D1D5H5H1A3=="), N("3B9B3B5F3C4G3E3=="), N("QzbzvxyB2yA-9m=="), N("ji1kacwmgG5bc=="), N("nmA-13aogi1A3c1jd=="), N("BA9ggq=="), N("emznbjbH3fij=="), N("tkC-22d1qC-13sD1wzF-7=="), N("tA3jjf=="), N("1D1brkm==")], n = 0; n < t.length; n++)
                if (String.prototype.endsWith || (String.prototype.endsWith = function (e, t) {
                    return (void 0 === t || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e
                }), e.endsWith(t[n])) return !0;
            return !1
        }

        function C() {
            var e = N(p(n)),
                t = N(p("tzgatD-13eD1dtdrvmF3c1nrC-7saQcdav==")).split(".");
            try {
                return window.parent.document.querySelector(e) && window[t[1]][t[2]]
            } catch (e) {
                return !1
            }
        }
        var v, b, L = f.$,
            E = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2FC1A3NB2IF1HE1TH4WB8eB-11zVG2F3I3yYB5ZG4CB2DA15CC5AD3F1A1KG1oLA10B1A6wQF1H3vgale2C4F4XA2qc2A5D5B3pepmriKB3OE1HD1fUC10pjD-11E-11TB4YJ3bC-16zE-11yc1B2CE2BC3jhjKC1pdA-21OA6C1D5B-8vF4QA11pD6sqf1C3lldA-16BD4A2H3qoEA7bB-16rmNH5H1F1vSB7RE2A3TH4YC5A5b1A4d1B3whepyAC3AA2zknC3mbgf1SC4WH4PD8TC5ZB2C3H3jb2A5ZA2EF2aoFC5qqHC4B1H1zeGA7UA5RF4TA29TA6ZC4d1C3hyWA10A3rBB2E3decorationRD3QC10UD3E6E6ZD2F3F3fme2E5uxxrEC9C3E4fB-11azhHB1LD7D6VF4VVTPC6b1C4TYG3qzDD6B3B3AH4I2H2kxbHE1JD1yihfd1QD6WB1D4mhrc1B5rvFG3A14A7cDA2OC1AA1JB5zC-16KA6WB4C-8wvlTB5A5lkZB2C2C7zynBD2D2bI-7C-21d1HE2cubyvPC8A6VB3aroxxZE4C4F4e1I2BE1WjdifH1H4A14NA1GB1YG-10tWA3A14A9sVA2C5XH2A29b2A6gsleGG2jaED2D-13fhE1OA8NjwytyTD4e1sc1D-16ZC3B5C-9e1C2FB6EFF5B2C2JH4E1C2tdLE5A3UG4G-7b2D3B4fA-9oh1G3kqvB4AG3ibnjcAC6D2B1cDA9KC2QA6bRC4VA30RB8hYB2A4A-8h1A21A2B2==",
            y = "7D4YH4fkhHB3pqDC3H2E1fkMD1IB1NF1D3QD9wB5rxqlh1A8c2B4ZA3FD2AA6FB5EB3jJG4D2J-7aC-21GB6PC5RE4TC11QD6XC4XE3XH3mlvnqjbaOA2OC2BE6A1fmI-7ujwbc1G5f1F3e1C11mXF4owBG3E1yD1E4F1D2D-8B-8C-7yC-22HD1MF5UE4cWA3D8D6a1B2C3H3a3I3sZA4B3A2akfwEB3xHD5D1F1wIC11pA-16xdxtVI2C9A6YC4a1A2F3B2GA6B4C3lsjyJB1eMA1D-11MF5PE4ja1D3D7byrf1C3e1C7D-16lwqAF3H2A1B-21wNE1MA1OG1HB2A-16tSE5UD4RB3icRA4F-10wtwzBB3E1C3CC2DA8LA2LA1EB1kdH-8uVB7decorg1J2B7B6qjrqGI2J1C6ijehIB1hkemC-13hqkrH4H-7QD6XF5XF3HLNAC3CB2aD2CD2KB10B4ycg1A-8KA4H4B11jVB5TC4yqpB-21pd1E4pedzGB6MD5B3ncB-7MA4LD2JB6PD5uH-8TB9C7YD5XD2E3I3jmiDB3zeimhLD8E2F2JC1H-9ivkPC5lG-10SB1D3H3A-21rc1A3d1E3fsdqwfGA2KA1OrC-22LA6D1B4afUB16SC7AitC-8qYA11fsxcajGA15avjNE2A-9h1hDB16B9tPC1C5F5UC1G3B8d2A5d1D4RnHJ3C3JB5D3ucMG1yzD-17hafjC-8VD3yWC6e1YD2H3ZE2C8C5oBA3H3D2vFA4WzJC4C2i1A-65fNB8afWA1H4A26mvkC-13ZB3E3h1A21BC4eFB2GD2AA5ghqND2A2B2==",
            n = "MekC-11nB-8tIzpD7pewxvzC6mD-16xerg1==",
            S = "lC4B3A3B2B5A1C2E4G1A2==",
            T = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2EE1MA2ND1KD1IE4cA-21pSD2D5ve1G3h1A8b1E5ZC3CD2FA16mC5OC5E1hpnG1NA10B1D7hkUD4I-7b2C3C5nXD2E3F3whidEC2EH3GI2mJE2E2bxci1WA10VC7pllSG2F3A7xd1A4ZC3DB2aaeGA2DE4H2E1j1ywD-13FD1A3VE4WA3D8C6wuc1A2hf1B5B7vnrrjA1B9ic1mpbD1oMB1iSB7rWC4RI4G-7upB6jd1A2F3H2EA4FD3kDF4A2moc1anJD1TD4VI4b2C7oeQF4c1E3XC7ZA3C3G3uDB2wGB6D1JC4D1JD4C1hTE6QC5pH4pD3C-22D7c1A3textAA4gdlB2mpozkmhNC1mrxA3yWA5edhg1I2H3B7ozgmvAI3I2B5GD1LD2RSNH1KA1XA5SB4PA3sA9tlmC-9tnf1G3nd1coBH4I2I2JC3C-16LE6A1tnUA3vbwQB1G3f1A20a3A8a1C6pxAB2eniuE1F3kH2lnjB2hB-16XA5PF1G4zwtYA5B-11mzTG2B9pHB3BE2hGH3B3B2cMD5C1F1wzPA8E7VG5H5vD3H-7C8tyvsVF2I1G2A5fE3bg1mgajoyxMA4fhuzSD8aQB2B4g1A20ukb1A4B3F3GG2CujjanIC1ObiB11SD1C5pWC1D4YB8YE5FE-11jXE2F-7jB4CC2G-10uLH4E1C2tA-13yjUH5d1H1A7sWD5E4hmjF-7pykafoGA16hDD4joyD-8OA33B3C2tC7cRE4SA31a1B8d1e2A4F4g1A2A22CC5zwlAC2C1A12==",
            M = function () {
                for (var e = 0, t = document.domain, n = t.split("."), r = "_gd".concat((new Date).getTime()); e < n.length - 1 && -1 === document.cookie.indexOf("".concat(r, "=").concat(r));) t = n.slice(-1 - ++e).join("."), document.cookie = "".concat(r, "=").concat(r, ";domain=").concat(t, ";");
                return document.cookie = "".concat(r, "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=").concat(t, ";"), (t || "").replace(/(^\.*)|(\.*$)/g, "")
            }(),
            N = p(function A(e) {
                if (!e) return e;
                for (var t = "", n = p("charCodeAt"), r = p("fromCharCode"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(e[0]), i = 1; i < e.length - 2; i++) {
                    for (var a = c(++o), s = e[n](i), l = "";
                        /[0-9-]/.test(e[i + 1]);) l += e[++i];
                    s = d(s, a, l = parseInt(l, 10) || 0), s ^= o - 1 & 31, t += String[r](s)
                }
                return t
            }),
            e = 0;
        return {
            _init: function x() {
                var e = f.opts.key || [""],
                    t = N(p("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
                "string" == typeof e && (e = [e]);
                for (var n, r, o, i = !(f.ul = !0), a = 0, s = 0; s < e.length; s++) {
                    var l = (r = e[s], 4 === (o = (N(r) || "").split("|")).length && "V3" === o[0] ? [o[1], o[3], o[2]] : [null, null, ""]),
                        c = l[2];
                    if (c === N(p(N("LGnD1KNZf1CPBYCAZB-8F3UDSLLSG1VFf1A3C2=="))) || 0 <= c.indexOf(M, c.length - M.length) || m(M) || C()) {
                        if (null !== (n = l[1]) && !(0 == n.indexOf("TRIAL") ? (n = new Date(n.replace(/TRIAL/, "")), new Date(n) < new Date && (E = y, 1)) : new Date(n) < new Date(N(S))) || !(0 < (M || "").length) || m(M) || C()) {
                            f.ul = !1;
                            break
                        }
                        i = !0, T = E, a = l[0] || -1
                    }
                }
                var d = new Image;
                !0 === f.ul && (g(), d.src = i ? "".concat(p(N(t)), "e=").concat(a) : "".concat(p(N(t)), "u")), !0 === f.ul && (f.events.on("contentChanged", function () {
                    (function e() {
                        return u(v) || u(b) || h(v) || h(b)
                    })() && g()
                }), f.events.on("html.get", function (e) {
                    return e + N("qD2H-9G3ioD-17qA1tE1B-8qI3A4hA-13C-11E2C1njfldD1E6pg1C-8sC3hfbkcD2G3stC-22gqgB3G2B-7vtoA4nweeD1A31A15B9uC-16A1F5dkykdc1B8dE-11bA3F2D3A9gd1E7F2tlI-8H-7vtxB2A5B2C3B2F2B5A6ldbyC4iqC-22D-17E-13mA3D2dywiB3oxlvfC1H4C2TjqbzlnI3ntB4E3qA2zaqsC6D3pmnkoE3C6D5wvuE3bwifdhB6hch1E4xibD-17dmrC1rG-7pntnF6nB-8F1D2A11C8plrkmF2F3MC-16bocqA2WwA-21ayeA1C4d1isC-22rD-13D6DfjpjtC2E6hB2G2G4A-7D2==")
                })), f.events.on("html.set", function () {
                    var e = f.el.querySelector('[data-f-id="pbf"]');
                    e && L(e).remove()
                }), f.events.on("destroy", function () {
                    v && v.length && v.remove()
                }, !0)
            }
        }
    },
    /////////////////
    // EDIT MODULE
    /////////////////
    V.MODULES.edit = function (t) {
        function e() {
            if (t.browser.mozilla) try {
                t.doc.execCommand("enableObjectResizing", !1, "false"), t.doc.execCommand("enableInlineTableEditing", !1, "false")
            } catch (e) { }
            if (t.browser.msie) try {
                t.doc.body.addEventListener("mscontrolselect", function (e) {
                    return e.srcElement.focus(), !1
                })
            } catch (e) { }
        }
        var n = !1;

        function r() {
            return n
        }
        return {
            _init: function o() {
                t.events.on("focus", function () {
                    r() ? t.edit.off() : t.edit.on()
                })
            },
            on: function i() {
                t.$wp ? (t.$el.attr("contenteditable", !0), t.$el.removeClass("fr-disabled").attr("aria-disabled", !1), e()) : t.$el.is("a") && t.$el.attr("contenteditable", !0), t.events.trigger("edit.on", [], !0), n = !1
            },
            off: function a() {
                t.events.disableBlur(), t.$wp ? (t.$el.attr("contenteditable", !1), t.$el.addClass("fr-disabled").attr("aria-disabled", !0)) : t.$el.is("a") && t.$el.attr("contenteditable", !1), t.events.trigger("edit.off"), t.events.enableBlur(), n = !0
            },
            disableDesign: e,
            isDisabled: r
        }
    },
    /////////////////
    // FORMAT MODULE
    /////////////////
    V.MODULES.format = function (T) {
        var M = T.$;

        function f(e, t) {
            var n = "<".concat(e);
            for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (n += " ".concat(r, '="').concat(t[r], '"'));
            return n += ">"
        }

        function N(e, t) {
            var n = e;
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n += "id" === r ? "#".concat(t[r]) : "class" === r ? ".".concat(t[r]) : "[".concat(r, '="').concat(t[r], '"]'));
            return n
        }

        function A(e, t) {
            return !(!e || e.nodeType !== Node.ELEMENT_NODE) &&
                (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
        }

        function m(e, t, n) {
            if (e) {
                for (; e.nodeType === Node.COMMENT_NODE;) e = e.nextSibling;
                if (e) {
                    if (T.node.isBlock(e) && "HR" !== e.tagName) return T.node.hasClass(e.firstChild, "fr-marker") ? m(e.firstChild.nextSibling, t, n) : m(e.firstChild, t, n), !1;
                    var r = M(T.doc.createElement(t));
                    r.attr(n), r.insertBefore(e);
                    for (var o = e; o && !M(o).hasClass("fr-marker") && 0 === M(o).find(".fr-marker").length && "UL" !== o.tagName && "OL" !== o.tagName;) {
                        var i = o;
                        if (T.node.isBlock(o) && "HR" !== e.tagName) return m(o.firstChild, t, n), !1;
                        o = o.nextSibling, r.append(i)
                    }
                    if (o) {
                        if (M(o).find(".fr-marker").length || "UL" === o.tagName || "OL" === o.tagName) m(o.firstChild, t, n);
                        else if (T.browser.mozilla && T.node.hasClass(o, "fr-marker")) {
                            var a, s = T.selection.blocks(),
                                l = s.length;
                            for (a = 0; a < l; a++) s[a] != o.parentNode && s[a].childNodes.length && s[a].childNodes[0] != o.parentNode && (o = s[a].childNodes[1] || s[a].childNodes[0], (r = M(f(t, n)).insertBefore(o)).append(o))
                        }
                    } else {
                        for (var c = r.get(0).parentNode; c && !c.nextSibling && !T.node.isElement(c);) c = c.parentNode;
                        if (c) {
                            var d = c.nextSibling;
                            d && (T.node.isBlock(d) ? "HR" === d.tagName ? m(d.nextSibling, t, n) : m(d.firstChild, t, n) : m(d, t, n))
                        }
                    }
                    r.is(":empty") && r.remove()
                }
            }
        }

        // Apply formatting
        function n(e, t) {
            var n;
            if (void 0 === t && (t = {}), t.style && delete t.style, T.selection.isCollapsed()) {
                T.markers.insert(),
                T.$el.find(".fr-marker").replaceWith(
                    f(e, t) + V.INVISIBLE_SPACE + V.MARKERS + function a(e) {
                        return "</".concat(e, ">")
                    }(e)
                ),
                T.selection.restore()
            } else {
                var r;
                T.selection.save(), m(T.$el.find('.fr-marker[data-type="true"]').length && T.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, e, t);
                do {
                    for (r = T.$el.find("".concat(N(e, t), " > ").concat(N(e, t))), n = 0; n < r.length; n++) r[n].outerHTML = r[n].innerHTML
                } while (r.length);
                T.el.normalize();
                var o = T.el.querySelectorAll(".fr-marker");
                for (n = 0; n < o.length; n++) {
                    var i = M(o[n]);
                    !0 === i.data("type") ? A(i.get(0).nextSibling, N(e, t)) && i.next().prepend(i) : A(i.get(0).previousSibling, N(e, t)) && i.prev().append(i)
                }
                T.selection.restore()
            }
        }

        function x(e, t, n, r) {
            if (!r) {
                var o = !1;
                if (!0 === e.data("type"))
                    for (; T.node.isFirstSibling(e.get(0)) && !e.parent().is(T.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().before(e), o = !0;
                else if (!1 === e.data("type"))
                    for (; T.node.isLastSibling(e.get(0)) && !e.parent().is(T.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().after(e), o = !0;
                if (o) return !0
            }
            if (e.parents(t).length || void 0 === t) {
                var i, a = "",
                    s = "",
                    l = e.parent();
                if (l.is(T.$el) || T.node.isBlock(l.get(0))) return !1;
                for (; !(T.node.isBlock(l.parent().get(0)) || void 0 !== t && A(l.get(0), N(t, n)));) a += T.node.closeTagString(l.get(0)), s = T.node.openTagString(l.get(0)) + s, l = l.parent();
                var c = e.get(0).outerHTML;
                return e.replaceWith('<span id="mark"></span>'), i = l.html().replace(/<span id="mark"><\/span>/, a + T.node.closeTagString(l.get(0)) + s + c + a + T.node.openTagString(l.get(0)) + s), l.replaceWith(T.node.openTagString(l.get(0)) + i + T.node.closeTagString(l.get(0))), !0
            }
            return !1
        }

        // Remove formatting
        function r(e, t) {
            void 0 === t && (t = {}), t.style && delete t.style;
            var n = T.selection.isCollapsed();
            T.selection.save();
            for (var r = !0; r;) {
                r = !1;
                for (var o = T.$el.find(".fr-marker"), i = 0; i < o.length; i++) {
                    var a = M(o[i]),
                        s = null;
                    if (a.attr("data-cloned") || n || (s = a.clone().removeClass("fr-marker").addClass("fr-clone"), a.data("type") && "true" === a.data("type").toString() ? a.attr("data-cloned", !0).after(s) : a.attr("data-cloned", !0).before(s)), x(a, e, t, n)) {
                        r = !0;
                        break
                    }
                }
            } ! function y(e, t, n, r) {
                for (var o = T.node.contents(e.get(0)), i = 0; i < o.length; i++) {
                    var a = o[i];
                    if (a.innerHTML && 8203 == a.innerHTML.charCodeAt() && a.tagName.toLocaleLowerCase() == n && a.childNodes.length < 2 && (a.outerHTML = a.innerHTML), T.node.hasClass(a, "fr-marker")) t = (t + 1) % 2;
                    else if (t)
                        if (0 < M(a).find(".fr-marker").length) t = y(M(a), t, n, r);
                        else {
                            for (var s = M(a).find(n || "*:not(br)"), l = s.length - 1; 0 <= l; l--) {
                                var c = s[l];
                                T.node.isBlock(c) || T.node.isVoid(c) || void 0 !== n && !A(c, N(n, r)) ? T.node.isBlock(c) && void 0 === n && "TABLE" !== a.tagName && T.node.clearAttributes(c) : T.node.hasClass(c, "fr-clone") || (c.outerHTML = c.innerHTML)
                            }
                            void 0 === n && a.nodeType === Node.ELEMENT_NODE && !T.node.isVoid(a) || A(a, N(n, r)) ? T.node.isBlock(a) || T.node.hasClass(a, "fr-clone") || (a.outerHTML = a.innerHTML) : void 0 === n && a.nodeType === Node.ELEMENT_NODE && T.node.isBlock(a) && "TABLE" !== a.tagName && T.node.clearAttributes(a)
                        }
                    else 0 < M(a).find(".fr-marker").length && (t = y(M(a), t, n, r))
                }
                return t
            }(T.$el, 0, e, t), n ||
            (T.$el.find(".fr-marker").remove(),
            T.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")),
            n && T.$el.find(".fr-marker").before(V.INVISIBLE_SPACE).after(V.INVISIBLE_SPACE),
            T.html.cleanEmptyTags(),
            T.el.normalize(),
            T.selection.restore();
            var l = T.win.getSelection() && T.win.getSelection().anchorNode;
            if (l) {
                var c = T.node.blockParent(l),
                    d = !!l.textContent.replace(/\u200B/g, "").length,
                    f = T.win.getSelection().getRangeAt(0),
                    p = f.startOffset,
                    u = f.endOffset;
                T.selection.text().replace(/\u200B/g, "").length || function S(e, t) {
                    if (e && t) {
                        if (e.isSameNode(t) ? e.textContent = e.textContent.replace(/\u200B(?=.*\u200B)/g, "") : e.nodeType === Node.TEXT_NODE && (e.textContent = e.textContent.replace(/\u200B/g, "")), !e.childNodes.length) return !1;
                        Array.isArray(e.childNodes) && e.childNodes.forEach(function (e) {
                            S(e, t)
                        })
                    }
                }(c, l);
                var h = T.win.getSelection().getRangeAt(0);
                if (l.nodeType === Node.TEXT_NODE) {
                    if (!d || !T.selection.text().length && p === u) {
                        var g = l.textContent.search(/\u200B/g) + 1;
                        if (T.browser.msie) {
                            var m = T.doc.createRange();
                            T.selection.get().removeAllRanges(), m.setStart(l, g), m.setEnd(l, g), T.selection.get().addRange(m)
                        } else h.setStart(l, g), h.setEnd(l, g)
                    }
                } else {
                    var C, v, b = 0,
                        L = M(l).contents();
                    if (T.browser.msie) {
                        for (; v = L[b];) v.nodeType === Node.TEXT_NODE && 0 <= v.textContent.search(/\u200B/g) && (C = v), b++;
                        C = M(C)
                    } else C = L.filter(function (e) {
                        return e.nodeType === Node.TEXT_NODE && 0 <= e.textContent.search(/\u200B/g)
                    });
                    if (C.length) {
                        var E = C.text().search(/\u200B/g) + 1;
                        h.setStart(C.get(0), E), h.setEnd(C.get(0), E)
                    }
                }
            }
        }

        function t(e, t) {
            var n, r, o, i, a, s = null;
            if (T.selection.isCollapsed()) {
                T.markers.insert();
                var l = (r = T.$el.find(".fr-marker")).parent();
                if (T.node.openTagString(l.get(0)) === '<span style="'.concat(e, ": ").concat(l.css(e), ';">')) {
                    if (T.node.isEmpty(l.get(0))) s = M(T.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t, ";")).html("".concat(V.INVISIBLE_SPACE).concat(V.MARKERS)), l.replaceWith(s);
                    else {
                        var c = {};
                        c["style*"] = "".concat(e, ":"), x(r, "span", c, !0), r = T.$el.find(".fr-marker"), t ? (s = M(T.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t, ";")).html("".concat(V.INVISIBLE_SPACE).concat(V.MARKERS)), r.replaceWith(s)) : r.replaceWith(V.INVISIBLE_SPACE + V.MARKERS)
                    }
                    T.html.cleanEmptyTags()
                } else T.node.isEmpty(l.get(0)) && l.is("span") ? (r.replaceWith(V.MARKERS), l.css(e, t)) : (s = M('<span style="'.concat(e, ": ").concat(t, ';">').concat(V.INVISIBLE_SPACE).concat(V.MARKERS, "</span>")), r.replaceWith(s));
                s && C(s, e, t)
            } else {
                if (T.selection.save(), null === t || "color" === e && 0 < T.$el.find(".fr-marker").parents("u, a").length) {
                    var d = T.$el.find(".fr-marker");
                    for (n = 0; n < d.length; n++)
                        if (!0 === (r = M(d[n])).data("type") || "true" === r.data("type"))
                            for (; T.node.isFirstSibling(r.get(0)) && !r.parent().is(T.$el) && !T.node.isElement(r.parent().get(0)) && !T.node.isBlock(r.parent().get(0));) r.parent().before(r);
                        else
                            for (; T.node.isLastSibling(r.get(0)) && !r.parent().is(T.$el) && !T.node.isElement(r.parent().get(0)) && !T.node.isBlock(r.parent().get(0));) r.parent().after(r)
                }
                for (var f = T.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling; f.firstChild;) f = f.firstChild;
                var p = {
                    "class": "fr-unprocessed"
                };
                for (t && (p.style = "".concat(e, ": ").concat(t, ";")), m(f, "span", p), T.$el.find(".fr-marker + .fr-unprocessed").each(function () {
                    M(this).prepend(M(this).prev())
                }), T.$el.find(".fr-unprocessed + .fr-marker").each(function () {
                    M(this).prev().append(M(this))
                }), (t || "").match(/\dem$/) && T.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < T.$el.find("span.fr-unprocessed").length;) {
                    if ((s = T.$el.find("span.fr-unprocessed").first().removeClass("fr-unprocessed")).parent().get(0).normalize(), s.parent().is("span") && 1 === s.parent().get(0).childNodes.length) {
                        s.parent().css(e, t);
                        var u = s;
                        s = s.parent(), u.replaceWith(u.html())
                    }
                    var h = s.find("span");
                    for (n = h.length - 1; 0 <= n; n--) o = h[n], i = e, a = void 0, (a = M(o)).css(i, ""), "" === a.attr("style") && a.replaceWith(a.html());
                    C(s, e, t)
                }
            } ! function g() {
                var e;
                for (; 0 < T.$el.find(".fr-split:empty").length;) T.$el.find(".fr-split:empty").remove();
                T.$el.find(".fr-split").removeClass("fr-split"), T.$el.find('[style=""]').removeAttr("style"), T.$el.find('[class=""]').removeAttr("class"), T.html.cleanEmptyTags();
                for (var t = T.$el.find("span"), n = t.length - 1; 0 <= n; n--) {
                    var r = t[n];
                    r.attributes && 0 !== r.attributes.length || M(r).replaceWith(r.innerHTML)
                }
                T.el.normalize();
                var o = T.$el.find("span[style] + span[style]");
                for (e = 0; e < o.length; e++) {
                    var i = M(o[e]),
                        a = M(o[e]).prev();
                    i.get(0).previousSibling === a.get(0) && T.node.openTagString(i.get(0)) === T.node.openTagString(a.get(0)) && (i.prepend(a.html()), a.remove())
                }
                T.$el.find("span[style] span[style]").each(function () {
                    if (0 <= M(this).attr("style").indexOf("font-size")) {
                        var e = M(this).parents("span[style]");
                        0 <= e.attr("style").indexOf("background-color") && (M(this).attr("style", "".concat(M(this).attr("style"), ";").concat(e.attr("style"))), x(M(this), "span[style]", {}, !1))
                    }
                }), T.el.normalize(), T.selection.restore()
            }()
        }

        function C(e, t, n) {
            var r, o, i, a = e.parentsUntil(T.$el, "span[style]"),
                s = [];
            for (r = a.length - 1; 0 <= r; r--) o = a[r], i = t, 0 === M(o).attr("style").indexOf("".concat(i, ":")) || 0 <= M(o).attr("style").indexOf(";".concat(i, ":")) || 0 <= M(o).attr("style").indexOf("; ".concat(i, ":")) || s.push(a[r]);
            if ((a = a.not(s)).length) {
                for (var l = "", c = "", d = "", f = "", p = e.get(0); p = p.parentNode, M(p).addClass("fr-split"), l += T.node.closeTagString(p), c = T.node.openTagString(M(p).clone().addClass("fr-split").get(0)) + c, a.get(0) !== p && (d += T.node.closeTagString(p), f = T.node.openTagString(M(p).clone().addClass("fr-split").get(0)) + f), a.get(0) !== p;);
                var u = "".concat(l + T.node.openTagString(M(a.get(0)).clone().css(t, n || "").get(0)) + f + e.css(t, "").get(0).outerHTML + d, "</span>").concat(c);
                e.replaceWith('<span id="fr-break"></span>');
                var h = a.get(0).outerHTML;
                M(a.get(0)).replaceWith(h.replace(/<span id="fr-break"><\/span>/g, function () {
                    return u
                }))
            }
        }

        function o(e, t) {
            void 0 === t && (t = {}), t.style && delete t.style;

            // Get first range
            var n = T.selection.ranges(0),

            // Get start container
            r = n.startContainer;

            if (
                r.nodeType === Node.ELEMENT_NODE &&                     // Is html node (not text node)
                0 < r.childNodes.length &&                              // Has child elements (text node will not have them)
                r.childNodes[n.startOffset] &&                          
                (r = r.childNodes[n.startOffset]), !n.collapsed &&
                r.nodeType === Node.TEXT_NODE &&
                n.startOffset === (r.textContent || "").length
            ) {
                for (; !T.node.isBlock(r.parentNode) && !r.nextSibling;) r = r.parentNode;
                r.nextSibling && (r = r.nextSibling)
            }

            for (var o = r; o && o.nodeType === Node.ELEMENT_NODE && !A(o, N(e, t));)
                o = o.firstChild;

            if (o && o.nodeType === Node.ELEMENT_NODE && A(o, N(e, t)))
                return !0;
                
            var i = r;
            for (i && i.nodeType !== Node.ELEMENT_NODE && (i = i.parentNode); i && i.nodeType === Node.ELEMENT_NODE && i !== T.el && !A(i, N(e, t));)
                i = i.parentNode;
                
            return !(!i || i.nodeType !== Node.ELEMENT_NODE || i === T.el || !A(i, N(e, t)))
        }
        return {
            // Check if selection includes given tag e
            is: o,
            // Toggle formatting on selection
            toggle: function i(e, t) {
                Array.isArray(e)
                    ? o(e[0], t) || o(e[1], t)              // Test for both (for bold (['strong', 'b']) and italic (['em', 'i']))
                            ? r(e[0], t)                    // Apply one
                            : n(e[0], t) && n(e[1], t)      // Remove both
                    
                    : o(e, t)                               // If not array, do as default
                        ? r(e, t)
                        : n(e, t)
            },
            // Apply formatting
            apply: n,
            // Remove formatting
            remove: r,
            // ??
            applyStyle: t,
            // ??
            removeStyle: function a(e) {
                t(e, null)
            }
        }
    },
    /////////////////
    // SPACES MODULE
    /////////////////
    V.MODULES.spaces = function (c) {
        function r(e, t) {
            var n = e.previousSibling,
                r = e.nextSibling,
                o = e.textContent,
                i = e.parentNode,
                a = [V.ENTER_P, V.ENTER_DIV, V.ENTER_BR];
            if (!c.html.isPreformatted(i)) {
                t && (o = o.replace(/[\f\n\r\t\v ]{2,}/g, " "), r && "BR" !== r.tagName && !c.node.isBlock(r) || !(c.node.isBlock(i) || c.node.isLink(i) && !i.nextSibling || c.node.isElement(i)) || (o = o.replace(/[\f\n\r\t\v ]{1,}$/g, "")), n && "BR" !== n.tagName && !c.node.isBlock(n) || !(c.node.isBlock(i) || c.node.isLink(i) && !i.previousSibling || c.node.isElement(i)) || (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), (c.node.isBlock(r) || c.node.isBlock(n)) && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), " " === o && (n && c.node.isVoid(n) || r && c.node.isVoid(r)) && !(n && r && c.node.isVoid(n) || r && n && c.node.isVoid(r)) && (o = "")), (!n && c.node.isBlock(r) || !r && c.node.isBlock(n)) && c.node.isBlock(i) && i !== c.el && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), t || (o = o.replace(new RegExp(V.UNICODE_NBSP, "g"), " "));
                for (var s = "", l = 0; l < o.length; l++) 32 != o.charCodeAt(l) || 0 !== l && 32 != s.charCodeAt(l - 1) || !((c.opts.enter === V.ENTER_BR || c.opts.enter === V.ENTER_DIV) && (n && "BR" === n.tagName || r && "BR" === r.tagName) || n && r && n.tagName === r.tagName) && (n && r && c.node.isVoid(n) || n && r && c.node.isVoid(r)) ? s += o[l] : s += V.UNICODE_NBSP;
                (!r || r && c.node.isBlock(r) || r && r.nodeType === Node.ELEMENT_NODE && c.win.getComputedStyle(r) && "block" === c.win.getComputedStyle(r).display) && (!c.node.isVoid(n) || n && -1 !== ["P", "DIV", "BR"].indexOf(n.tagName) && -1 !== a.indexOf(c.opts.enter)) && (s = s.replace(/ $/, V.UNICODE_NBSP)), !n || c.node.isVoid(n) || c.node.isBlock(n) || 1 !== (s = s.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== s.charCodeAt(0) || !r || c.node.isVoid(r) || c.node.isBlock(r) || c.node.hasClass(n, "fr-marker") && c.node.hasClass(r, "fr-marker") || (s = " "), t || (s = s.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2")), e.textContent !== s && (e.textContent = s)
            }
        }

        function l(e, t) {
            if (void 0 !== e && e || (e = c.el), void 0 === t && (t = !1), !e.getAttribute || "false" !== e.getAttribute("contenteditable"))
                if (e.nodeType === Node.TEXT_NODE) r(e, t);
                else if (e.nodeType === Node.ELEMENT_NODE)
                    for (var n = c.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, c.node.filter(function (e) {
                        for (var t = e.parentNode; t && t !== c.el;) {
                            if ("STYLE" === t.tagName || "IFRAME" === t.tagName) return !1;
                            if ("PRE" === t.tagName) return !1;
                            t = t.parentNode
                        }
                        return null !== e.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !c.node.hasClass(e.parentNode, "fr-marker")
                    }), !1); n.nextNode();) r(n.currentNode, t)
        }
        return {
            normalize: l,
            normalizeAroundCursor: function d() {
                for (var e = [], t = c.el.querySelectorAll(".fr-marker"), n = 0; n < t.length; n++) {
                    for (var r = null, o = c.node.blockParent(t[n]), i = (r = o || t[n]).nextSibling, a = r.previousSibling; i && "BR" === i.tagName;) i = i.nextSibling;
                    for (; a && "BR" === a.tagName;) a = a.previousSibling;
                    r && e.indexOf(r) < 0 && e.push(r), a && e.indexOf(a) < 0 && e.push(a), i && e.indexOf(i) < 0 && e.push(i)
                }
                for (var s = 0; s < e.length; s++) l(e[s])
            }
        }
    },
    //////////////////
    // MARKER MODULE
    //////////////////
    V.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">'.concat(V.INVISIBLE_SPACE = "&#8203;", "</span>"),
    V.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">'.concat(V.INVISIBLE_SPACE, "</span>"),
    V.MARKERS = V.START_MARKER + V.END_MARKER,
    V.MODULES.markers = function (d) {
        var f = d.$;

        // Insert marker
        function l() {
            if (!d.$wp) return null;
            try {
                var e = d.selection.ranges(0),
                    t = e.commonAncestorContainer;

                if (t !== d.el && !d.$el.contains(t))
                    	return null;

                var n = e.cloneRange(),
                    r = e.cloneRange();

                n.collapse(!0);
                var o = f(d.doc.createElement("SPAN")).addClass("fr-marker").attr("style", "display: none; line-height: 0;").html(V.INVISIBLE_SPACE).get(0);
                if (n.insertNode(o), o = d.$el.find("span.fr-marker").get(0)) {
                    for (var i = o.nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;)
                        f(i).remove(),
                        i = d.$el.find("span.fr-marker").get(0).nextSibling;

                    return d.selection.clear(), d.selection.get().addRange(r), o
                }
                return null
            } catch (a) {
                //console.log('error: '+a)
            }
        }

        function c() {
            d.$el.find(".fr-marker").remove()
        }
        return {
            place: function p(e, t, n) {
                var r, o, i;
                try {
                    var a = e.cloneRange();
                    if (a.collapse(t), a.insertNode(function l(e, t) {
                        var n = f(d.doc.createElement("SPAN"));
                        return n.addClass("fr-marker").attr("data-id", t).attr("data-type", e).attr("style", "display: ".concat(d.browser.safari ? "none" : "inline-block", "; line-height: 0;")).html(V.INVISIBLE_SPACE), n.get(0)
                    }(t, n)), !0 === t)
                        for (i = (r = d.$el.find('span.fr-marker[data-type="true"][data-id="'.concat(n, '"]')).get(0)).nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) f(i).remove(), i = r.nextSibling;
                    if (!0 === t && !e.collapsed) {
                        for (; !d.node.isElement(r.parentNode) && !i;) - 1 < /\bfa\b/g.test(r.parentNode.className) && "I" === r.parentNode.tagName ? f(r.parentNode).before(r) : f(r.parentNode).after(r), i = r.nextSibling;
                        if (i && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
                            for (o = [i]; i = o[0], (o = d.node.contents(i))[0] && d.node.isBlock(o[0]););
                            f(i).prepend(f(r))
                        }
                    }
                    if (!1 === t && !e.collapsed) {
                        if ((i = (r = d.$el.find('span.fr-marker[data-type="false"][data-id="'.concat(n, '"]')).get(0)).previousSibling) && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
                            for (o = [i]; i = o[o.length - 1], (o = d.node.contents(i))[o.length - 1] && d.node.isBlock(o[o.length - 1]););
                            f(i).append(f(r))
                        } (r.parentNode && 0 <= ["TD", "TH"].indexOf(r.parentNode.tagName) || !r.previousSibling && d.node.isBlock(r.parentElement)) && (r.parentNode.previousSibling && !r.previousSibling ? f(r.parentNode.previousSibling).append(r) : 0 <= ["TD", "TH"].indexOf(r.parentNode.tagName) && r.parentNode.firstChild === r && (r.parentNode.previousSibling ? f(r.parentNode.previousSibling).append(r) : r.parentNode.parentNode && r.parentNode.parentNode.previousSibling && f(r.parentNode.parentNode.previousSibling).append(r)))
                    }
                    var s = d.$el.find('span.fr-marker[data-type="'.concat(t, '"][data-id="').concat(n, '"]')).get(0);
                    return s && (s.style.display = "none"), s
                } catch (c) {
                    return null
                }
            },
            insert: l,
            split: function a() {
                d.selection.isCollapsed() || d.selection.remove();
                var e = d.$el.find(".fr-marker").get(0);
                if (e || (e = l()), !e) return null;
                var t = d.node.deepestParent(e);
                if (t || (t = d.node.blockParent(e)) && "LI" !== t.tagName && (t = null), t)
                    if (d.node.isBlock(t) && d.node.isEmpty(t)) "LI" !== t.tagName || t.parentNode.firstElementChild !== t || d.node.isEmpty(t.parentNode) ? f(t).replaceWith('<span class="fr-marker"></span>') : f(t).append('<span class="fr-marker"></span>');
                    else if (d.cursor.isAtStart(e, t)) f(t).before('<span class="fr-marker"></span>'), f(e).remove();
                    else if (d.cursor.isAtEnd(e, t)) f(t).after('<span class="fr-marker"></span>'), f(e).remove();
                    else {
                        for (var n = e, r = "", o = ""; n = n.parentNode, r += d.node.closeTagString(n), o = d.node.openTagString(n) + o, n !== t;);
                        f(e).replaceWith('<span id="fr-break"></span>');
                        var i = d.node.openTagString(t) + f(t).html() + d.node.closeTagString(t);
                        i = i.replace(/<span id="fr-break"><\/span>/g, "".concat(r, '<span class="fr-marker"></span>').concat(o)), f(t).replaceWith(i)
                    }
                return d.$el.find(".fr-marker").get(0)
            },
            insertAtPoint: function u(e) {
                var t, n = e.clientX,
                    r = e.clientY;
                c();
                var o = null;
                if ("undefined" != typeof d.doc.caretPositionFromPoint ? (t = d.doc.caretPositionFromPoint(n, r), (o = d.doc.createRange()).setStart(t.offsetNode, t.offset), o.setEnd(t.offsetNode, t.offset)) : "undefined" != typeof d.doc.caretRangeFromPoint && (t = d.doc.caretRangeFromPoint(n, r), (o = d.doc.createRange()).setStart(t.startContainer, t.startOffset), o.setEnd(t.startContainer, t.startOffset)), null !== o && "undefined" != typeof d.win.getSelection) {
                    var i = d.win.getSelection();
                    i.removeAllRanges(), i.addRange(o)
                } else if ("undefined" != typeof d.doc.body.createTextRange) try {
                    (o = d.doc.body.createTextRange()).moveToPoint(n, r);
                    var a = o.duplicate();
                    a.moveToPoint(n, r), o.setEndPoint("EndToEnd", a), o.select()
                } catch (s) {
                    return !1
                }
                l()
            },
            remove: c
        }
    },
    ////////////////////
    // SELECTION MODULE
    ////////////////////
    V.MODULES.selection = function (E) {
        var y = E.$;

        // Get selected text
        function s() {
            var e = "";
            return E.win.getSelection
                ? e = E.win.getSelection()
                : E.doc.getSelection
                    ? e = E.doc.getSelection()
                    : E.doc.selection && (e = E.doc.selection.createRange().text), e.toString()
        }

        // Get or create selection
        function L() {
            // Try on window and fallback to document. Last resort: create range on document
            return E.win.getSelection
                ? E.win.getSelection()
                : E.doc.getSelection
                    ? E.doc.getSelection()
                    : E.doc.selection.createRange()
        }

        // Get the selection ranges or a single range at a specified index.
        function f(e) {
            var t = L(),
                n = [];

            if (t && t.getRangeAt && t.rangeCount) {
                n = [];
                for (var r = 0; r < t.rangeCount; r++)
                    n.push(t.getRangeAt(r))
            }
            else n = E.doc.createRange
                ? [E.doc.createRange()]
                : [];

            return void 0 !== e
                ? n[e]
                : n
        }

        // Clear selection
        function S() {
            var e = L();
            try {
                e.removeAllRanges
                    ? e.removeAllRanges()
                    : e.empty
                        ? e.empty()
                        : e.clear && e.clear()
            } catch (t) {
                //console.log('error in S(): ',t)
            }
        }

        // Range element
        function p(e, t) {
            var n = e;
            return n.nodeType === Node.ELEMENT_NODE &&
                0 < n.childNodes.length &&
                n.childNodes[t] &&
                (n = n.childNodes[t]), n.nodeType === Node.TEXT_NODE &&
                (n = n.parentNode), n
        }

        // Save selection
        function T() {
            if (E.$wp) {
                E.markers.remove();
                var e,
                    t,
                    n = f(),
                    r = [];
                for (t = 0; t < n.length; t++)
                    if (n[t].startContainer !== E.doc || E.browser.msie) {
                        var o = (e = n[t]).collapsed,
                            i = E.markers.place(e, !0, t),
                            a = E.markers.place(e, !1, t);
                        if (void 0 !== i && i || !o || (y(".fr-marker").remove(), E.selection.setAtEnd(E.el)), E.el.normalize(), E.browser.safari && !o) try {
                            (e = E.doc.createRange()).setStartAfter(i), e.setEndBefore(a), r.push(e)
                        } catch (s) { }
                    }
                    
                    if (E.browser.safari && r.length)
                        for (E.selection.clear(), t = 0; t < r.length; t++)
                            E.selection.get().addRange(r[t])
            }
        }

        // Restore selection
        function M() {
            var e, t = E.el.querySelectorAll('.fr-marker[data-type="true"]');
            if (!E.$wp) return E.markers.remove(), !1;
            if (0 === t.length) return !1;
            if (E.browser.msie || E.browser.edge)
                for (e = 0; e < t.length; e++) t[e].style.display = "inline-block";
            E.core.hasFocus() || E.browser.msie || E.browser.webkit || E.$el.focus(), S();
            var n = L();
            for (e = 0; e < t.length; e++) {
                var r = y(t[e]).data("id"),
                    o = t[e],
                    i = E.doc.createRange(),
                    a = E.$el.find('.fr-marker[data-type="false"][data-id="'.concat(r, '"]'));
                (E.browser.msie || E.browser.edge) && a.css("display", "inline-block");
                var s = null;
                if (0 < a.length) {
                    a = a[0];
                    try {
                        for (var l = !1, c = o.nextSibling, d = null; c && c.nodeType === Node.TEXT_NODE && 0 === c.textContent.length;) c = (d = c).nextSibling, y(d).remove();
                        for (var f = a.nextSibling; f && f.nodeType === Node.TEXT_NODE && 0 === f.textContent.length;) f = (d = f).nextSibling, y(d).remove();
                        if (o.nextSibling === a || a.nextSibling === o) {
                            for (var p = o.nextSibling === a ? o : a, u = p === o ? a : o, h = p.previousSibling; h && h.nodeType === Node.TEXT_NODE && 0 === h.length;) h = (d = h).previousSibling, y(d).remove();
                            if (h && h.nodeType === Node.TEXT_NODE)
                                for (; h && h.previousSibling && h.previousSibling.nodeType === Node.TEXT_NODE;) h.previousSibling.textContent += h.textContent, h = h.previousSibling, y(h.nextSibling).remove();
                            for (var g = u.nextSibling; g && g.nodeType === Node.TEXT_NODE && 0 === g.length;) g = (d = g).nextSibling, y(d).remove();
                            if (g && g.nodeType === Node.TEXT_NODE)
                                for (; g && g.nextSibling && g.nextSibling.nodeType === Node.TEXT_NODE;) g.nextSibling.textContent = g.textContent + g.nextSibling.textContent, g = g.nextSibling, y(g.previousSibling).remove();
                            if (h && (E.node.isVoid(h) || E.node.isBlock(h)) && (h = null), g && (E.node.isVoid(g) || E.node.isBlock(g)) && (g = null), h && g && h.nodeType === Node.TEXT_NODE && g.nodeType === Node.TEXT_NODE) {
                                y(o).remove(), y(a).remove();
                                var m = h.textContent.length;
                                h.textContent += g.textContent, y(g).remove(), E.opts.htmlUntouched || E.spaces.normalize(h), i.setStart(h, m), i.setEnd(h, m), l = !0
                            } else !h && g && g.nodeType === Node.TEXT_NODE ? (y(o).remove(), y(a).remove(), E.opts.htmlUntouched || E.spaces.normalize(g), s = y(E.doc.createTextNode("\u200b")).get(0), y(g).before(s), i.setStart(g, 0), i.setEnd(g, 0), l = !0) : !g && h && h.nodeType === Node.TEXT_NODE && (y(o).remove(), y(a).remove(), E.opts.htmlUntouched || E.spaces.normalize(h), s = y(E.doc.createTextNode("\u200b")).get(0), y(h).after(s), i.setStart(h, h.textContent.length), i.setEnd(h, h.textContent.length), l = !0)
                        }
                        if (!l) {
                            var C = void 0,
                                v = void 0;
                            v = (E.browser.chrome || E.browser.edge) && o.nextSibling === a ? (C = N(a, i, !0) || i.setStartAfter(a), N(o, i, !1) || i.setEndBefore(o)) : (o.previousSibling === a && (a = (o = a).nextSibling), a.nextSibling && "BR" === a.nextSibling.tagName || !a.nextSibling && E.node.isBlock(o.previousSibling) || o.previousSibling && "BR" === o.previousSibling.tagName || (o.style.display = "inline", a.style.display = "inline", s = y(E.doc.createTextNode("\u200b")).get(0)), C = N(o, i, !0) || y(o).before(s) && i.setStartBefore(o), N(a, i, !1) || y(a).after(s) && i.setEndAfter(a)), "function" == typeof C && C(), "function" == typeof v && v()
                        }
                    } catch (b) { }
                }
                s && y(s).remove();
                try {
                    n.addRange(i)
                } catch (b) { }
            }
            E.markers.remove()
        }

        function N(e, t, n) {
            var r, o = e.previousSibling,
                i = e.nextSibling;
            return o && i && o.nodeType === Node.TEXT_NODE && i.nodeType === Node.TEXT_NODE ? (r = o.textContent.length, n ? (i.textContent = o.textContent + i.textContent, y(o).remove(), y(e).remove(), E.opts.htmlUntouched || E.spaces.normalize(i), function () {
                t.setStart(i, r)
            }) : (o.textContent += i.textContent, y(i).remove(), y(e).remove(), E.opts.htmlUntouched || E.spaces.normalize(o), function () {
                t.setEnd(o, r)
            })) : o && !i && o.nodeType === Node.TEXT_NODE ? (r = o.textContent.length, n ? (E.opts.htmlUntouched || E.spaces.normalize(o), function () {
                t.setStart(o, r)
            }) : (E.opts.htmlUntouched || E.spaces.normalize(o), function () {
                t.setEnd(o, r)
            })) : !(!i || o || i.nodeType !== Node.TEXT_NODE) && (n ? (E.opts.htmlUntouched || E.spaces.normalize(i), function () {
                t.setStart(i, 0)
            }) : (E.opts.htmlUntouched || E.spaces.normalize(i), function () {
                t.setEnd(i, 0)
            }))
        }

        // isCollapsed
        function A() {
            for (var e = f(), t = 0; t < e.length; t++)
                if (!e[t].collapsed) return !1;
            return !0
        }

        // Get selection info
        function o(e) {
            var t, n, r = !1,
                o = !1;
            if (E.win.getSelection) {
                var i = E.win.getSelection();
                i.rangeCount && ((n = (t = i.getRangeAt(0)).cloneRange()).selectNodeContents(e), n.setEnd(t.startContainer, t.startOffset), r = a(n), n.selectNodeContents(e), n.setStart(t.endContainer, t.endOffset), o = a(n))
            } else E.doc.selection && "Control" !== E.doc.selection.type && ((n = (t = E.doc.selection.createRange()).duplicate()).moveToElementText(e), n.setEndPoint("EndToStart", t), r = a(n), n.moveToElementText(e), n.setEndPoint("StartToEnd", t), o = a(n));
            return {
                atStart: r,
                atEnd: o
            }
        }

        function a(e) {
            return "" === e.toString().replace(/[\u200B-\u200D\uFEFF]/g, "")
        }

        function x(e, t) {
            void 0 === t && (t = !0);
            var n = y(e).html();
            n && n.replace(/\u200b/g, "").length !== n.length && y(e).html(n.replace(/\u200b/g, ""));
            for (var r = E.node.contents(e), o = 0; o < r.length; o++) r[o].nodeType !== Node.ELEMENT_NODE ? y(r[o]).remove() : (x(r[o], 0 === o), 0 === o && (t = !1));
            if (e.nodeType === Node.TEXT_NODE) {
                var i = y(document.createElement("span")).attr("data-first", "true").attr("data-text", "true");
                y(e)[0].replaceWith(i[0])
            } else t && y(e).attr("data-first", !0)
        }

        function O() {
            return 0 === y(this).find("fr-inner").length
        }

        // In editor
        function u() {
            try {
                if (!E.$wp) return !1;
                for (var e = f(0).commonAncestorContainer; e && !E.node.isElement(e);) e = e.parentNode;
                return !!E.node.isElement(e)
            } catch (t) {
                return !1
            }
        }

        // Set at start
        function r(e, t) {
            if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
            for (var n = e.firstChild; n && (E.node.isBlock(n) || t && !E.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE);) n = (e = n).firstChild;
            e.innerHTML = V.MARKERS + e.innerHTML
        }

        // Set after
        function i(e, t) {
            if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
            for (var n = e.lastChild; n && (E.node.isBlock(n) || t && !E.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE);) n = (e = n).lastChild;
            var r = E.doc.createElement("SPAN");
            for (r.setAttribute("id", "fr-sel-markers"), r.innerHTML = V.MARKERS; e.parentNode && E.opts.htmlAllowedEmptyTags && 0 <= E.opts.htmlAllowedEmptyTags.indexOf(e.tagName.toLowerCase());) e = e.parentNode;
            e.appendChild(r);
            var o = e.querySelector("#fr-sel-markers");
            o.outerHTML = o.innerHTML
        }
        return {
            // Returns the selected text.
            text: s,
            // Returns the current selection.
            get: L,
            // Get the selection ranges or a single range at a specified index.
            ranges: f,
            // Clear current selection.
            clear: S,
            // Returns the element where the current selection starts.
            element: function l() {
                var e = L();
                try {
                    if (e.rangeCount) {
                        var t, n = f(0),
                            r = n.startContainer;
                        if (E.node.isElement(r) && 0 === n.startOffset && r.childNodes.length)
                            for (; r.childNodes.length && r.childNodes[0].nodeType === Node.ELEMENT_NODE;) r = r.childNodes[0];
                        if (r.nodeType === Node.TEXT_NODE && n.startOffset === (r.textContent || "").length && r.nextSibling && (r = r.nextSibling), r.nodeType === Node.ELEMENT_NODE) {
                            var o = !1;
                            if (0 < r.childNodes.length && r.childNodes[n.startOffset]) {
                                for (t = r.childNodes[n.startOffset]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                if (t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 1 < r.childNodes.length && 0 < n.startOffset && r.childNodes[n.startOffset - 1]) {
                                    for (t = r.childNodes[n.startOffset - 1]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                    t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0)
                                }
                            } else !n.collapsed && r.nextSibling && r.nextSibling.nodeType === Node.ELEMENT_NODE && (t = r.nextSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0);
                            !o && 0 < r.childNodes.length && y(r.childNodes[0]).text().replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(r.childNodes[0].tagName) < 0 && (r = r.childNodes[0])
                        }
                        for (; r.nodeType !== Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                        for (var i = r; i && "HTML" !== i.tagName;) {
                            if (i === E.el) return r;
                            i = y(i).parent()[0]
                        }
                    }
                } catch (a) { }
                return E.el
            },
            // Returns the element where the current selection ends.
            endElement: function c() {
                var e = L();
                try {
                    if (e.rangeCount) {
                        var t, n = f(0),
                            r = n.endContainer;
                        if (r.nodeType === Node.ELEMENT_NODE) {
                            var o = !1;
                            0 < r.childNodes.length && r.childNodes[n.endOffset] && y(r.childNodes[n.endOffset]).text() === s() ? (r = r.childNodes[n.endOffset], o = !0) : !n.collapsed && r.previousSibling && r.previousSibling.nodeType === Node.ELEMENT_NODE ? (t = r.previousSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0) : !n.collapsed && 0 < r.childNodes.length && r.childNodes[n.endOffset] && (t = r.childNodes[n.endOffset].previousSibling).nodeType === Node.ELEMENT_NODE && t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 0 < r.childNodes.length && y(r.childNodes[r.childNodes.length - 1]).text() === s() && ["BR", "IMG", "HR"].indexOf(r.childNodes[r.childNodes.length - 1].tagName) < 0 && (r = r.childNodes[r.childNodes.length - 1])
                        }
                        for (r.nodeType === Node.TEXT_NODE && 0 === n.endOffset && r.previousSibling && r.previousSibling.nodeType === Node.ELEMENT_NODE && (r = r.previousSibling); r.nodeType !== Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                        for (var i = r; i && "HTML" !== i.tagName;) {
                            if (i === E.el) return r;
                            i = y(i).parent()[0]
                        }
                    }
                } catch (a) { }
                return E.el
            },
            // Saves the current selection by adding HTML markers.
            save: T,
            // Restores the current selection by using the HTML markers.
            restore: M,
            // Check if selection is collapsed.
            isCollapsed: A,
            // Check if all the content of the editor is selected.
            isFull: function d() {
                if (A()) return !1;
                E.selection.save();
                var e, t = E.el.querySelectorAll("td, th, img, br");
                for (e = 0; e < t.length; e++)(t[e].nextSibling || "IMG" === t[e].tagName) && (t[e].innerHTML = '<span class="fr-mk" style="display: none;">&nbsp;</span>'.concat(t[e].innerHTML));
                var n = !1,
                    r = o(E.el);
                for (r.atStart && r.atEnd && (n = !0), t = E.el.querySelectorAll(".fr-mk"), e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);
                return E.selection.restore(), n
            },
            // Check if the selection is inside the editor.
            inEditor: u,
            remove: function w() {
                if (A()) return !0;
                var e;

                function t(e) {
                    for (var t = e.previousSibling; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) {
                        var n = t;
                        t = t.previousSibling, y(n).remove()
                    }
                    return t
                }

                function n(e) {
                    for (var t = e.nextSibling; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) {
                        var n = t;
                        t = t.nextSibling, y(n).remove()
                    }
                    return t
                }
                T();
                var r = E.$el.find('.fr-marker[data-type="true"]');
                for (e = 0; e < r.length; e++)
                    for (var o = r[e]; !(t(o) || E.node.isBlock(o.parentNode) || E.$el.is(o.parentNode) || E.node.hasClass(o.parentNode, "fr-inner"));) y(o.parentNode).before(o);
                var i = E.$el.find('.fr-marker[data-type="false"]');
                for (e = 0; e < i.length; e++) {
                    for (var a = i[e]; !(n(a) || E.node.isBlock(a.parentNode) || E.$el.is(a.parentNode) || E.node.hasClass(a.parentNode, "fr-inner"));) y(a.parentNode).after(a);
                    a.parentNode && E.node.isBlock(a.parentNode) && E.node.isEmpty(a.parentNode) && !E.$el.is(a.parentNode) && !E.node.hasClass(a.parentNode, "fr-inner") && E.opts.keepFormatOnDelete && y(a.parentNode).after(a)
                }
                if (function b() {
                    for (var e = E.$el.find(".fr-marker"), t = 0; t < e.length; t++)
                        if (y(e[t]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return !1;
                    return !0
                }()) {
                    ! function L(e, t) {
                        var n = E.node.contents(e.get(0));
                        0 <= ["TD", "TH"].indexOf(e.get(0).tagName) && 1 === e.find(".fr-marker").length && (E.node.hasClass(n[0], "fr-marker") || "BR" == n[0].tagName && E.node.hasClass(n[0].nextElementSibling, "fr-marker")) && e.attr("data-del-cell", !0);
                        for (var r = 0; r < n.length; r++) {
                            var o = n[r];
                            E.node.hasClass(o, "fr-marker") ? t = (t + 1) % 2 : t ? 0 < y(o).find(".fr-marker").length ? t = L(y(o), t) : ["TD", "TH"].indexOf(o.tagName) < 0 && !E.node.hasClass(o, "fr-inner") ? !E.opts.keepFormatOnDelete || 0 < E.$el.find("[data-first]").length || E.node.isVoid(o) ? y(o).remove() : x(o) : E.node.hasClass(o, "fr-inner") ? 0 === y(o).find(".fr-inner").length ? y(o).html("<br>") : y(o).find(".fr-inner").filter(O).html("<br>") : (y(o).empty(), y(o).attr("data-del-cell", !0)) : 0 < y(o).find(".fr-marker").length && (t = L(y(o), t))
                        }
                        return t
                    }(E.$el, 0);
                    var s = E.$el.find('[data-first="true"]');
                    if (s.length) E.$el.find(".fr-marker").remove(), s.append(V.INVISIBLE_SPACE + V.MARKERS).removeAttr("data-first"), s.attr("data-text") && s.replaceWith(s.html());
                    else
                        for (E.$el.find("table").filter(function () {
                            return 0 < y(this).find("[data-del-cell]").length && y(this).find("[data-del-cell]").length === y(this).find("td, th").length
                        }).remove(), E.$el.find("[data-del-cell]").removeAttr("data-del-cell"), r = E.$el.find('.fr-marker[data-type="true"]'), e = 0; e < r.length; e++) {
                            var l = r[e],
                                c = l.nextSibling,
                                d = E.$el.find('.fr-marker[data-type="false"][data-id="'.concat(y(l).data("id"), '"]')).get(0);
                            if (d) {
                                if (l && (!c || c !== d)) {
                                    var f = E.node.blockParent(l),
                                        p = E.node.blockParent(d),
                                        u = !1,
                                        h = !1;
                                    if (f && 0 <= ["UL", "OL"].indexOf(f.tagName) && (u = !(f = null)), p && 0 <= ["UL", "OL"].indexOf(p.tagName) && (h = !(p = null)), y(l).after(d), f !== p)
                                        if (null !== f || u)
                                            if (null !== p || h || 0 !== y(f).parentsUntil(E.$el, "table").length) f && p && 0 === y(f).parentsUntil(E.$el, "table").length && 0 === y(p).parentsUntil(E.$el, "table").length && !y(f).contains(p) && !y(p).contains(f) && (y(f).append(y(p).html()), y(p).remove());
                                            else {
                                                for (c = f; !c.nextSibling && c.parentNode !== E.el;) c = c.parentNode;
                                                for (c = c.nextSibling; c && "BR" !== c.tagName;) {
                                                    var g = c.nextSibling;
                                                    y(f).append(c), c = g
                                                }
                                                c && "BR" === c.tagName && y(c).remove()
                                            }
                                        else {
                                            var m = E.node.deepestParent(l);
                                            m ? (y(m).after(y(p).html()), y(p).remove()) : 0 === y(p).parentsUntil(E.$el, "table").length && (y(l).next().after(y(p).html()), y(p).remove())
                                        }
                                }
                            } else d = y(l).clone().attr("data-type", !1), y(l).after(d)
                        }
                }
                E.$el.find("li:empty").remove(), E.opts.keepFormatOnDelete || E.html.fillEmptyBlocks(), E.html.cleanEmptyTags(!0), E.opts.htmlUntouched || (E.clean.lists(), E.$el.find("li:empty").append("<br>"), E.spaces.normalize());
                var C = E.$el.find(".fr-marker").last().get(0),
                    v = E.$el.find(".fr-marker").first().get(0);
                void 0 !== C && void 0 !== v && !C.nextSibling && v.previousSibling && "BR" === v.previousSibling.tagName && E.node.isElement(C.parentNode) && E.node.isElement(v.parentNode) && E.$el.append("<br>"), M()
            },
            // Returns an array with DOM elements of the current selection.
            blocks: function h(e) {
                var t, n, r = [],
                    o = L();
                if (u() && o.rangeCount) {
                    var i = f();
                    for (t = 0; t < i.length; t++) {
                        var a = i[t],
                            s = p(a.startContainer, a.startOffset),
                            l = p(a.endContainer, a.endOffset);
                        (E.node.isBlock(s) || E.node.hasClass(s, "fr-inner")) && r.indexOf(s) < 0 && r.push(s), (n = E.node.blockParent(s)) && r.indexOf(n) < 0 && r.push(n);
                        for (var c = [], d = s; d !== l && d !== E.el;) c.indexOf(d) < 0 && d.children && d.children.length ? (c.push(d), d = d.children[0]) : d.nextSibling ? d = d.nextSibling : d.parentNode && (d = d.parentNode, c.push(d)), E.node.isBlock(d) && c.indexOf(d) < 0 && r.indexOf(d) < 0 && (d !== l || 0 < a.endOffset) && r.push(d);
                        E.node.isBlock(l) && r.indexOf(l) < 0 && 0 < a.endOffset && r.push(l), (n = E.node.blockParent(l)) && r.indexOf(n) < 0 && r.push(n)
                    }
                }
                for (t = r.length - 1; 0 < t; t--)
                    if (y(r[t]).find(r).length) {
                        if (e && y(r[t]).find("ul, ol").length) continue;
                        r.splice(t, 1)
                    } return r
            },
            // Get the info about the selection and the current node.
            // The returned object will contain two boolean properties
            // (atStart and atEnd) with the selection position relative to the node passed as parameter.
            info: o,
            // Places selection markers at the end of the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setAtEnd: i,
            // Places the HTML selection markers at the start of the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setAtStart: r,
            // Places selection markers before the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setBefore: function g(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.previousSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length;) n = n.previousSibling;
                return n ? (E.node.isBlock(n) ? i(n) : "BR" === n.tagName ? y(n).before(V.MARKERS) : y(n).after(V.MARKERS), !0) : !!t && (E.node.isBlock(e) ? r(e) : y(e).before(V.MARKERS), !0)
            },
            // Places selection markers after the node passed as argument.
            // In order to restore selection the selection.restore method should be called after it.
            setAfter: function m(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.nextSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length;) n = n.nextSibling;
                return n ? (E.node.isBlock(n) ? r(n) : y(n).before(V.MARKERS), !0) : !!t && (E.node.isBlock(e) ? i(e) : y(e).after(V.MARKERS), !0)
            },
            rangeElement: p
        }
    }, Object.assign(V.DEFAULTS, {
        language: null
    }), V.LANGUAGE = {}, V.MODULES.language = function (e) {
        var t;
        return {
            _init: function n() {
                V.LANGUAGE && (t = V.LANGUAGE[e.opts.language]), t && t.direction && (e.opts.direction = t.direction)
            },
            translate: function r(e) {
                return t && t.translation[e] && t.translation[e].length ? t.translation[e] : e
            }
        }
    }, Object.assign(V.DEFAULTS, {
        placeholderText: "Type something"
    }),
    ///////////////////////
    // PLACEHOLDER MODULE
    ///////////////////////
    V.MODULES.placeholder = function (f) {
        var p = f.$;

        function e() {
            f.$placeholder || function d() {
                f.$placeholder = p(f.doc.createElement("SPAN")).addClass("fr-placeholder"), f.$wp.append(f.$placeholder)
            }();
            var e = f.opts.iframe ? f.$iframe.prev().outerHeight(!0) : f.$el.prev().outerHeight(!0),
                t = 0,
                n = 0,
                r = 0,
                o = 0,
                i = 0,
                a = 0,
                s = f.node.contents(f.el),
                l = p(f.selection.element()).css("text-align");
            if (s.length && s[0].nodeType === Node.ELEMENT_NODE) {
                var c = p(s[0]);
                (0 < f.$wp.prev().length || 0 < f.$el.prev().length) && f.ready && (t = f.helpers.getPX(c.css("margin-top")), o = f.helpers.getPX(c.css("padding-top")), n = f.helpers.getPX(c.css("margin-left")), r = f.helpers.getPX(c.css("margin-right")), i = f.helpers.getPX(c.css("padding-left")), a = f.helpers.getPX(c.css("padding-right"))), f.$placeholder.css("font-size", c.css("font-size")), f.$placeholder.css("line-height", c.css("line-height"))
            } else f.$placeholder.css("font-size", f.$el.css("font-size")), f.$placeholder.css("line-height", f.$el.css("line-height"));
            f.$wp.addClass("show-placeholder"), f.$placeholder.css({
                marginTop: Math.max(f.helpers.getPX(f.$el.css("margin-top")), t) + (e || 0),
                paddingTop: Math.max(f.helpers.getPX(f.$el.css("padding-top")), o),
                paddingLeft: Math.max(f.helpers.getPX(f.$el.css("padding-left")), i),
                marginLeft: Math.max(f.helpers.getPX(f.$el.css("margin-left")), n),
                paddingRight: Math.max(f.helpers.getPX(f.$el.css("padding-right")), a),
                marginRight: Math.max(f.helpers.getPX(f.$el.css("margin-right")), r),
                textAlign: l
            }).text(f.language.translate(f.opts.placeholderText || f.$oel.attr("placeholder") || "")), f.$placeholder.html(f.$placeholder.text().replace(/\n/g, "<br>"))
        }

        function t() {
            f.$wp.removeClass("show-placeholder")
        }

        function n() {
            if (!f.$wp)
                return !1;
            f.core.isEmpty()
                ? e()
                : t()
        }
        return {
            _init: function r() {
                if (!f.$wp)
                    return !1;
                f.events.on("init input keydown keyup contentChanged initialized", n)
            },
            show: e,
            hide: t,
            refresh: n,
            isVisible: function o() {
                return !f.$wp || f.node.hasClass(f.$wp.get(0), "show-placeholder")
            }
        }
    }, V.UNICODE_NBSP = String.fromCharCode(160), V.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], V.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], Object.assign(V.DEFAULTS, {
        htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line", "hr"],
        htmlDoNotWrapTags: ["script", "style"],
        htmlSimpleAmpersand: !1,
        htmlIgnoreCSSProperties: [],
        htmlExecuteScripts: !0
    }),
    ////////////////
    // HTML MODULE
    ////////////////
    V.MODULES.html = function (O) {
        var h = O.$;

        function d() {
            return O.opts.enter === V.ENTER_P ? "p" : O.opts.enter === V.ENTER_DIV ? "div" : O.opts.enter === V.ENTER_BR ? null : void 0
        }

        function s(e, t) {
            return !(!e || e === O.el) && (t ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName) || s(e.parentNode, t) : -1 !== ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName))
        }

        function i(e) {
            var t, n = [],
                r = [];
            if (e) {
                var o = O.el.querySelectorAll(".fr-marker");
                for (t = 0; t < o.length; t++) {
                    var i = O.node.blockParent(o[t]) || o[t];
                    if (i) {
                        var a = i.nextSibling,
                            s = i.previousSibling;
                        i && r.indexOf(i) < 0 && O.node.isBlock(i) && r.push(i), s && O.node.isBlock(s) && r.indexOf(s) < 0 && r.push(s), a && O.node.isBlock(a) && r.indexOf(a) < 0 && r.push(a)
                    }
                }
            } else r = O.el.querySelectorAll(p());
            var l = p();
            for (l += ",".concat(V.VOID_ELEMENTS.join(",")), l += ", .fr-inner", l += ",".concat(O.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)"), t = r.length - 1; 0 <= t; t--)
                if (!(r[t].textContent && 0 < r[t].textContent.replace(/\u200B|\n/g, "").length || 0 < r[t].querySelectorAll(l).length)) {
                    for (var c = O.node.contents(r[t]), d = !1, f = 0; f < c.length; f++)
                        if (c[f].nodeType !== Node.COMMENT_NODE && c[f].textContent && 0 < c[f].textContent.replace(/\u200B|\n/g, "").length) {
                            d = !0;
                            break
                        } d || n.push(r[t])
                } return n
        }

        function p() {
            return V.BLOCK_TAGS.join(", ")
        }

        function e(e) {
            var t, n, r = h.merge([], V.VOID_ELEMENTS);
            r = h.merge(r, O.opts.htmlAllowedEmptyTags), r = void 0 === e ? h.merge(r, V.BLOCK_TAGS) : h.merge(r, V.NO_DELETE_TAGS), t = O.el.querySelectorAll("*:empty:not(".concat(r.join("):not("), "):not(.fr-marker):not(template)"));
            do {
                n = !1;
                for (var o = 0; o < t.length; o++) 0 !== t[o].attributes.length && void 0 === t[o].getAttribute("href") || (t[o].parentNode.removeChild(t[o]), n = !0);
                t = O.el.querySelectorAll("*:empty:not(".concat(r.join("):not("), "):not(.fr-marker):not(template)"))
            } while (t.length && n)
        }

        function a(e, t) {
            var n = d();
            if (t && (n = "div"), n) {
                for (var r = O.doc.createDocumentFragment(), o = null, i = !1, a = e.firstChild, s = !1; a;) {
                    var l = a.nextSibling;
                    if (a.nodeType === Node.ELEMENT_NODE && (O.node.isBlock(a) || 0 <= O.opts.htmlDoNotWrapTags.indexOf(a.tagName.toLowerCase()) && !O.node.hasClass(a, "fr-marker"))) o = null, r.appendChild(a.cloneNode(!0));
                    else if (a.nodeType !== Node.ELEMENT_NODE && a.nodeType !== Node.TEXT_NODE) o = null, r.appendChild(a.cloneNode(!0));
                    else if ("BR" === a.tagName) null === o ? (o = O.doc.createElement(n), s = !0, t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0)), o.appendChild(a.cloneNode(!0)), r.appendChild(o)) : !1 === i && (o.appendChild(O.doc.createElement("br")), t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0))), o = null;
                    else {
                        var c = a.textContent;
                        a.nodeType !== Node.TEXT_NODE || 0 < c.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || c.replace(/(^ *)|( *$)/g, "").length && c.indexOf("\n") < 0 ? (null === o && (o = O.doc.createElement(n), s = !0, t && o.setAttribute("class", "fr-temp-div"), r.appendChild(o), i = !1), o.appendChild(a.cloneNode(!0)), i || O.node.hasClass(a, "fr-marker") || a.nodeType === Node.TEXT_NODE && 0 === c.replace(/ /g, "").length || (i = !0)) : s = !0
                    }
                    a = l
                }
                s && (e.innerHTML = "", e.appendChild(r))
            }
        }

        function l(e, t) {
            for (var n = e.length - 1; 0 <= n; n--) a(e[n], t)
        }

        function t(e, t, n, r, o) {
            if (!O.$wp) return !1;
            void 0 === e && (e = !1), void 0 === t && (t = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === o && (o = !1);
            var i = O.$wp.scrollTop();
            a(O.el, e), r && l(O.el.querySelectorAll(".fr-inner"), e), t && l(O.el.querySelectorAll("td, th"), e), n && l(O.el.querySelectorAll("blockquote"), e), o && l(O.el.querySelectorAll("li"), e), i !== O.$wp.scrollTop() && O.$wp.scrollTop(i)
        }

        function n(e) {
            if (void 0 === e && (e = O.el), e && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(e.tagName)) return !1;
            for (var t = O.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, O.node.filter(function (e) {
                return null !== e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g)
            }), !1); t.nextNode();) {
                var n = t.currentNode;
                if (!s(n.parentNode, !0)) {
                    var r = O.node.isBlock(n.parentNode) || O.node.isElement(n.parentNode),
                        o = n.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                    if (r) {
                        var i = n.previousSibling,
                            a = n.nextSibling;
                        i && a && " " === o ? o = O.node.isBlock(i) && O.node.isBlock(a) ? "" : " " : (i || (o = o.replace(/^ */, "")), a || (o = o.replace(/ *$/, "")))
                    }
                    n.textContent = o
                }
            }
        }

        function r(e, t, n) {
            var r = new RegExp(t, "gi").exec(e);
            return r ? r[n] : null
        }

        function w(e) {
            var t = e.doctype,
                n = "<!DOCTYPE html>";
            return t && (n = "<!DOCTYPE ".concat(t.name).concat(t.publicId ? ' PUBLIC "'.concat(t.publicId, '"') : "").concat(!t.publicId && t.systemId ? " SYSTEM" : "").concat(t.systemId ? ' "'.concat(t.systemId, '"') : "", ">")), n
        }

        function c(e) {
            var t = e.parentNode;
            if (t && (O.node.isBlock(t) || O.node.isElement(t)) && ["TD", "TH"].indexOf(t.tagName) < 0) {
                for (var n = e.previousSibling, r = e.nextSibling; n && (n.nodeType === Node.TEXT_NODE && 0 === n.textContent.replace(/\n|\r/g, "").length || O.node.hasClass(n, "fr-tmp"));) n = n.previousSibling;
                if (r) return !1;
                n && t && "BR" !== n.tagName && !O.node.isBlock(n) && !r && 0 < t.textContent.replace(/\u200B/g, "").length && 0 < n.textContent.length && !O.node.hasClass(n, "fr-marker") && (O.el === t && !r && O.opts.enter === V.ENTER_BR && O.browser.msie || e.parentNode.removeChild(e))
            } else !t || O.node.isBlock(t) || O.node.isElement(t) || e.previousSibling || e.nextSibling || !O.node.isDeletable(e.parentNode) || c(e.parentNode)
        }

        function g() {
            O.opts.htmlUntouched || (e(), t(), n(), O.spaces.normalize(null, !0), O.html.fillEmptyBlocks(), O.clean.lists(), O.clean.tables(), O.clean.toHTML5(), O.html.cleanBRs()), O.selection.restore(), o(), O.placeholder.refresh()
        }

        function o() {
            O.node.isEmpty(O.el) &&
            (null !== d()
                ? O.el.querySelector(p()) || O.el.querySelector("".concat(O.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || (O.core.hasFocus()
                    ? (O.$el.html("<".concat(d(), ">").concat(V.MARKERS, "<br/></").concat(d(), ">")), O.selection.restore())
                    : O.$el.html("<".concat(d(), "><br/></").concat(d(), ">")))
                : O.el.querySelector("*:not(.fr-marker):not(br)") || (O.core.hasFocus()
                    ? (O.$el.html("".concat(V.MARKERS, "<br/>")), O.selection.restore())
                    : O.$el.html("<br/>")))
        }

        function m(e, t) {
            return r(e, "<".concat(t, "[^>]*?>([\\w\\W]*)</").concat(t, ">"), 1)
        }

        function C(e, t) {
            var n = h("<div ".concat(r(e, "<".concat(t, "([^>]*?)>"), 1) || "", ">"));
            return O.node.rawAttributes(n.get(0))
        }

        function v(e) {
            return (r(e, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ")
        }

        function b(e, t) {
            O.opts.htmlExecuteScripts ? e.html(t) : e.get(0).innerHTML = t
        }

        function $(e) {
            var t;
            (t = /:not\(([^)]*)\)/g).test(e) && (e = e.replace(t, "     $1 "));
            var n = 100 * (e.match(/(#[^\s+>~.[:]+)/g) || []).length + 10 * (e.match(/(\[[^]]+\])/g) || []).length + 10 * (e.match(/(\.[^\s+>~.[:]+)/g) || []).length + 10 * (e.match(/(:[\w-]+\([^)]*\))/gi) || []).length + 10 * (e.match(/(:[^\s+>~.[:]+)/g) || []).length + (e.match(/(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
            return n += ((e = (e = e.replace(/[*\s+>~]/g, " ")).replace(/[#.]/g, " ")).match(/([^\s+>~.[:]+)/g) || []).length
        }

        function k(e) {
            if (O.events.trigger("html.processGet", [e]), e && e.getAttribute && "" === e.getAttribute("class") && e.removeAttribute("class"), e && e.getAttribute && "" === e.getAttribute("style") && e.removeAttribute("style"), e && e.nodeType === Node.ELEMENT_NODE) {
                var t, n = e.querySelectorAll('[class=""],[style=""]');
                for (t = 0; t < n.length; t++) {
                    var r = n[t];
                    "" === r.getAttribute("class") && r.removeAttribute("class"), "" === r.getAttribute("style") && r.removeAttribute("style")
                }
                if ("BR" === e.tagName) c(e);
                else {
                    var o = e.querySelectorAll("br");
                    for (t = 0; t < o.length; t++) c(o[t])
                }
            }
        }

        function D(e, t) {
            return e[3] - t[3]
        }

        function _() {
            for (var e = O.el.querySelectorAll("input, textarea"), t = 0; t < e.length; t++) "checkbox" !== e[t].type && "radio" !== e[t].type || (e[t].checked ? e[t].setAttribute("checked", e[t].checked) : O.$(e[t]).removeAttr("checked")), e[t].getAttribute("value") && e[t].setAttribute("value", e[t].value)
        }

        function f(e) {
            var t = O.doc.createElement("div");
            return t.innerHTML = e, null !== t.querySelector(p())
        }

        // Clean White Tags
        function u(e) {
            var t = null;
            if (void 0 === e && (t = O.selection.element()), O.opts.keepFormatOnDelete) return !1;
            var n, r, o = t ? (t.textContent.match(/\u200B/g) || []).length - t.querySelectorAll(".fr-marker").length : 0;
            if ((O.el.textContent.match(/\u200B/g) || []).length - O.el.querySelectorAll(".fr-marker").length === o) return !1;
            do {
                r = !1, n = O.el.querySelectorAll("*:not(.fr-marker)");
                for (var i = 0; i < n.length; i++) {
                    var a = n[i];
                    if (t !== a) {
                        var s = a.textContent;
                        0 === a.children.length && 1 === s.length && 8203 === s.charCodeAt(0) && "TD" !== a.tagName && (h(a).remove(), r = !0)
                    }
                }
            } while (r)
        }

        function L() {
            u(), O.placeholder && setTimeout(O.placeholder.refresh, 0)
        }
        return {
            defaultTag: d,
            isPreformatted: s,
            emptyBlocks: i,
            emptyBlockTagsQuery: function E() {
                return "".concat(V.BLOCK_TAGS.join(":empty, "), ":empty")
            },
            blockTagsQuery: p,
            fillEmptyBlocks: function y(e) {
                var t = i(e);
                O.node.isEmpty(O.el) && O.opts.enter === V.ENTER_BR && t.push(O.el);
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    "false" === r.getAttribute("contenteditable") || r.querySelector("".concat(O.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || O.node.isVoid(r) || "TABLE" !== r.tagName && "TBODY" !== r.tagName && "TR" !== r.tagName && "UL" !== r.tagName && "OL" !== r.tagName && r.appendChild(O.doc.createElement("br"))
                }
                if (O.browser.msie && O.opts.enter === V.ENTER_BR) {
                    var o = O.node.contents(O.el);
                    o.length && o[o.length - 1].nodeType === Node.TEXT_NODE && O.$el.append("<br>")
                }
            },
            cleanEmptyTags: e,
            cleanWhiteTags: u,
            cleanBlankSpaces: n,
            blocks: function S() {
                return O.$el.get(0).querySelectorAll(p())
            },
            getDoctype: w,
            set: function T(e) {
                var t = O.clean.html((e || "").trim(), [], [], O.opts.fullPage),
                    n = new RegExp("%3A//", "g"),
                    r = t.replace(n, "://");
                if (O.opts.fullPage) {
                    var o = m(r, "body") || (0 <= r.indexOf("<body") ? "" : r),
                        i = C(r, "body"),
                        a = m(r, "head") || "<title></title>",
                        s = C(r, "head"),
                        l = h("<div>");
                    l.append(a).contents().each(function () {
                        (this.nodeType === Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) && this.parentNode.removeChild(this)
                    });
                    var c = l.html().trim();
                    a = h("<div>").append(a).contents().map(function () {
                        return this.nodeType === Node.COMMENT_NODE ? "\x3c!--".concat(this.nodeValue, "--\x3e") : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : ""
                    }).toArray().join("");
                    var d = v(r),
                        f = C(r, "html");
                    b(O.$el, "".concat(c, "\n").concat(o)), O.node.clearAttributes(O.el), O.$el.attr(i), O.$el.addClass("fr-view"), O.$el.attr("spellcheck", O.opts.spellcheck), O.$el.attr("dir", O.opts.direction), b(O.$head, a), O.node.clearAttributes(O.$head.get(0)), O.$head.attr(s), O.node.clearAttributes(O.$html.get(0)), O.$html.attr(f), O.iframe_document.doctype.parentNode.replaceChild(function u(e, t) {
                        var n = e.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
                        return n ? t.implementation.createDocumentType(n[1], n[3], n[4]) : t.implementation.createDocumentType("html")
                    }(d, O.iframe_document), O.iframe_document.doctype)
                } else b(O.$el, r);
                var p = O.edit.isDisabled();
                O.edit.on(), O.core.injectStyle(O.opts.iframeDefaultStyle + O.opts.iframeStyle), g(), O.opts.useClasses || (O.$el.find("[fr-original-class]").each(function () {
                    this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class")
                }), O.$el.find("[fr-original-style]").each(function () {
                    // Only apply fr-original-style, when style is not set.
                    // Adresses font-size changes, where fr-original-style is only updated the first time font-size is changed.
                    !this.getAttribute("style") && this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style")
                })), p && O.edit.off(), O.events.trigger("html.set"), O.events.trigger("charCounter.update")
            },
            syncInputs: _,
            get: function B(e, t) {
                if (!O.$wp) return O.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                var n = "";
                O.events.trigger("html.beforeGet");
                var r, o, i = [],
                    a = {},
                    s = [];
                if (_(), !O.opts.useClasses && !t) {
                    var l = new RegExp("^".concat(O.opts.htmlIgnoreCSSProperties.join("$|^"), "$"), "gi");
                    for (r = 0; r < O.doc.styleSheets.length; r++) {
                        var c = void 0,
                            d = 0;
                        try {
                            c = O.doc.styleSheets[r].cssRules, O.doc.styleSheets[r].ownerNode && "STYLE" === O.doc.styleSheets[r].ownerNode.nodeType && (d = 1)
                        } catch (x) { }
                        if (c)
                            for (var f = 0, p = c.length; f < p; f++)
                                if (c[f].selectorText && 0 < c[f].style.cssText.length) {
                                    var u = c[f].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":"),
                                        h = void 0;
                                    try {
                                        h = O.el.querySelectorAll(u)
                                    } catch (x) {
                                        h = []
                                    }
                                    for (o = 0; o < h.length; o++) {
                                        !h[o].getAttribute("fr-original-style") && h[o].getAttribute("style") ? (h[o].setAttribute("fr-original-style", h[o].getAttribute("style")), i.push(h[o])) : h[o].getAttribute("fr-original-style") || (h[o].setAttribute("fr-original-style", ""), i.push(h[o])), a[h[o]] || (a[h[o]] = {});
                                        for (var g = 1e3 * d + $(c[f].selectorText), m = c[f].style.cssText.split(";"), C = 0; C < m.length; C++) {
                                            var v = m[C].trim().split(":")[0];
                                            if (v && !v.match(l) && (a[h[o]][v] || (a[h[o]][v] = 0) <= (h[o].getAttribute("fr-original-style") || "").indexOf("".concat(v, ":")) && (a[h[o]][v] = 1e4), g >= a[h[o]][v] && (a[h[o]][v] = g, m[C].trim().length))) {
                                                var b = m[C].trim().split(":");
                                                b.splice(0, 1), s.push([h[o], v.trim(), b.join(":").trim(), g])
                                            }
                                        }
                                    }
                                }
                    }
                    for (s.sort(D), r = 0; r < s.length; r++) {
                        var L = s[r];
                        L[0].style[L[1]] = L[2]
                    }
                    for (r = 0; r < i.length; r++)
                        if (i[r].getAttribute("class") && (i[r].setAttribute("fr-original-class", i[r].getAttribute("class")), i[r].removeAttribute("class")), 0 < (i[r].getAttribute("fr-original-style") || "").trim().length) {
                            var E = i[r].getAttribute("fr-original-style").split(";");
                            for (o = 0; o < E.length; o++)
                                if (0 < E[o].indexOf(":")) {
                                    var y = E[o].split(":"),
                                        S = y[0];
                                    y.splice(0, 1), i[r].style[S.trim()] = y.join(":").trim()
                                }
                        }
                }
                if (O.node.isEmpty(O.el)) O.opts.fullPage && (n = w(O.iframe_document), n += "<html".concat(O.node.attributes(O.$html.get(0)), ">").concat(O.$html.find("head").get(0).outerHTML, "<body></body></html>"));
                else if (void 0 === e && (e = !1), O.opts.fullPage) {
                    n = w(O.iframe_document), O.$el.removeClass("fr-view");
                    var T = O.opts.heightMin,
                        M = O.opts.height,
                        N = O.opts.heightMax;
                    O.opts.heightMin = null, O.opts.height = null, O.opts.heightMax = null, O.size.refresh(), n += "<html".concat(O.node.attributes(O.$html.get(0)), ">").concat(O.$html.html(), "</html>"), O.opts.heightMin = T, O.opts.height = M, O.opts.heightMax = N, O.size.refresh(), O.$el.addClass("fr-view")
                } else n = O.$el.html();
                if (!O.opts.useClasses && !t)
                    for (r = 0; r < i.length; r++) i[r].getAttribute("fr-original-class") && (i[r].setAttribute("class", i[r].getAttribute("fr-original-class")), i[r].removeAttribute("fr-original-class")), null !== i[r].getAttribute("fr-original-style") && void 0 !== i[r].getAttribute("fr-original-style") ? (0 !== i[r].getAttribute("fr-original-style").length ? i[r].setAttribute("style", i[r].getAttribute("fr-original-style")) : i[r].removeAttribute("style"), i[r].removeAttribute("fr-original-style")) : i[r].removeAttribute("style");
                O.opts.fullPage && (n = (n = (n = (n = (n = (n = (n = (n = n.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), O.opts.htmlSimpleAmpersand && (n = n.replace(/&amp;/gi, "&")), O.events.trigger("html.afterGet"), e || (n = n.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), n = O.clean.invisibleSpaces(n), n = O.clean.exec(n, k);
                var A = O.events.chainTrigger("html.get", n);
                return "string" == typeof A && (n = A), n = (n = n.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function (e) {
                    return e.replace(/<br>/g, "\n")
                })).replace(/<meta((?:[\w\W]*?)) data-fr-http-equiv="/g, '<meta$1 http-equiv="')
            },
            getSelected: function M() {
                function e(e, t) {
                    for (; t && (t.nodeType === Node.TEXT_NODE || !O.node.isBlock(t)) && !O.node.isElement(t) && !O.node.hasClass(t, "fr-inner");) t && t.nodeType !== Node.TEXT_NODE && h(e).wrapInner(O.node.openTagString(t) + O.node.closeTagString(t)), t = t.parentNode;
                    t && e.innerHTML === t.innerHTML ? e.innerHTML = t.outerHTML : -1 != t.innerText.indexOf(e.innerHTML) && (e.innerHTML = O.node.openTagString(t) + t.innerHTML + O.node.closeTagString(t))
                }
                var t, n, r = "";
                if ("undefined" != typeof O.win.getSelection) {
                    O.browser.mozilla && (O.selection.save(), 1 < O.$el.find('.fr-marker[data-type="false"]').length && (O.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), O.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), O.$el.find(".fr-marker").not('[data-id="0"]').remove()), O.selection.restore());
                    for (var o = O.selection.ranges(), i = 0; i < o.length; i++) {
                        var a = document.createElement("div");
                        a.appendChild(o[i].cloneContents()), e(a, (n = t = void 0, n = null, O.win.getSelection ? (t = O.win.getSelection()) && t.rangeCount && (n = t.getRangeAt(0).commonAncestorContainer).nodeType !== Node.ELEMENT_NODE && (n = n.parentNode) : (t = O.doc.selection) && "Control" !== t.type && (n = t.createRange().parentElement()), null !== n && (0 <= h(n).parents().toArray().indexOf(O.el) || n === O.el) ? n : null)), 0 < h(a).find(".fr-element").length && (a = O.el), r += a.innerHTML
                    }
                } else "undefined" != typeof O.doc.selection && "Text" === O.doc.selection.type && (r = O.doc.selection.createRange().htmlText);
                return r
            },
            insert: function N(e, t, n) {
                var r;
                if (O.selection.isCollapsed() || O.selection.remove(), r = t ? e : O.clean.html(e), e.indexOf('class="fr-marker"') < 0 && (r = function a(e) {
                    var t = O.doc.createElement("div");
                    return t.innerHTML = e, O.selection.setAtEnd(t, !0), t.innerHTML
                }(r)), O.node.isEmpty(O.el) && !O.opts.keepFormatOnDelete && f(r)) O.el.innerHTML = r;
                else {
                    var o = O.markers.insert();
                    if (o) {
                        O.node.isLastSibling(o) && h(o).parent().hasClass("fr-deletable") && h(o).insertAfter(h(o).parent());
                        var i = O.node.blockParent(o);
                        if ((f(r) || n) && (O.node.deepestParent(o) || i && "LI" === i.tagName)) {
                            if (i && "LI" === i.tagName && (r = function s(e) {
                                if (!O.html.defaultTag()) return e;
                                var t = O.doc.createElement("div");
                                t.innerHTML = e;
                                for (var n = t.querySelectorAll(":scope > ".concat(O.html.defaultTag())), r = n.length - 1; 0 <= r; r--) {
                                    var o = n[r];
                                    O.node.isBlock(o.previousSibling) || (o.previousSibling && !O.node.isEmpty(o) && h("<br>").insertAfter(o.previousSibling), o.outerHTML = o.innerHTML)
                                }
                                return t.innerHTML
                            }(r)), !(o = O.markers.split())) return !1;
                            o.outerHTML = r
                        } else o.outerHTML = r
                    } else O.el.innerHTML += r
                }
                g(), O.keys.positionCaret(), O.events.trigger("html.inserted")
            },
            wrap: t,
            unwrap: function A() {
                O.$el.find("div.fr-temp-div").each(function () {
                    this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && h(this).before("<br>"), h(this).attr("data-empty") || !this.nextSibling || O.node.isBlock(this.nextSibling) && !h(this.nextSibling).hasClass("fr-temp-div") ? h(this).replaceWith(h(this).html()) : h(this).replaceWith("".concat(h(this).html(), "<br>"))
                }), O.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function () {
                    return "" === h(this).attr("class")
                }).removeAttr("class")
            },
            escapeEntities: function x(e) {
                return e.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;")
            },
            checkIfEmpty: o,
            extractNode: m,
            extractNodeAttrs: C,
            extractDoctype: v,
            cleanBRs: function R() {
                for (var e = O.el.getElementsByTagName("br"), t = 0; t < e.length; t++) c(e[t])
            },
            _init: function H() {
                O.events.$on(O.$el, "mousemove", "span.fr-word-select", function (e) {
                    var t = window.getSelection();
                    t = window.getSelection();
                    var n = document.createRange();
                    n.selectNodeContents(e.target), t.removeAllRanges(), t.addRange(n)
                }),
                O.$wp && (O.events.on("mouseup", L), O.events.on("keydown", L), O.events.on("contentChanged", o))
            },
            _setHtml: b
        }
    },
    /////////////
    // KEY CODES
    /////////////
    V.ENTER_P = 0,
    V.ENTER_DIV = 1,
    V.ENTER_BR = 2,
    V.KEYCODE = {
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
    }, Object.assign(V.DEFAULTS, {
        enter: V.ENTER_P,
        multiLine: !0,
        tabSpaces: 0
    }),
    ///////////////
    // KEY MODULE
    ///////////////
    V.MODULES.keys = function (d) {
        var f, n, r, o = d.$,
            p = !1;

        function u(e) {
            if (d.selection.isCollapsed())
                if (["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && d.cursor.backspace(), d.helpers.isIOS()) {
                    var t = d.selection.ranges(0);
                    t.deleteContents(), t.insertNode(document.createTextNode("\u200b")), d.selection.get().modify("move", "forward", "character")
                } else["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && e.preventDefault(), e.stopPropagation();
            else e.preventDefault(), e.stopPropagation(), d.selection.remove();
            d.placeholder.refresh()
        }

        function h(e) {
            ["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && e.preventDefault(), e.stopPropagation(), "" !== d.selection.text() || !d.selection.isCollapsed() && "IMG" == d.selection.element().tagName ? d.selection.remove() : d.cursor.del(), d.placeholder.refresh()
        }

        function e() {
            if (d.browser.mozilla && d.selection.isCollapsed() && !p) {
                var e = d.selection.ranges(0),
                    t = e.startContainer,
                    n = e.startOffset;
                t && t.nodeType === Node.TEXT_NODE && n <= t.textContent.length && 0 < n && 32 === t.textContent.charCodeAt(n - 1) && (d.selection.save(), d.spaces.normalize(), d.selection.restore())
            }
        }

        function t() {
            d.selection.isFull() && setTimeout(function () {
                var e = d.html.defaultTag();
                e ? d.$el.html("<".concat(e, ">").concat(V.MARKERS, "<br/></").concat(e, ">")) : d.$el.html("".concat(V.MARKERS, "<br/>")), d.selection.restore(), d.placeholder.refresh(), d.button.bulkRefresh(), d.undo.saveStep()
            }, 0)
        }

        function i() {
            p = !1
        }

        function a() {
            p = !1
        }

        function g() {
            var e = d.html.defaultTag();
            e ? d.$el.html("<".concat(e, ">").concat(V.MARKERS, "<br/></").concat(e, ">")) : d.$el.html("".concat(V.MARKERS, "<br/>")), d.selection.restore()
        }

        function m(e, t) {
            if ((-1 < e.innerHTML.indexOf("<span") || -1 < e.parentElement.innerHTML.indexOf("<span") || -1 < e.parentElement.parentElement.innerHTML.indexOf("<span")) && (e.classList.contains("fr-img-space-wrap") || e.parentElement.classList.contains("fr-img-space-wrap") || e.parentElement.parentElement.classList.contains("fr-img-space-wrap"))) {
                if (o(e.parentElement).is("p")) {
                    var n = e.parentElement.innerHTML;
                    return (n = n.replace(/<br>/g, "")).length < 1 ? e.parentElement.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != n && " " != n && "Backspace" == t.key ? u(t) : "&nbsp;" != n && " " != n && "Delete" == t.key && h(t), !0
                }
                if (o(e).is("p")) {
                    var r = e.innerHTML.replace(/<br>/g, "");
                    return r.length < 1 ? e.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != r && " " != r && "Backspace" == t.key ? u(t) : "&nbsp;" != r && " " != r && "Delete" == t.key && h(t), !0
                }
            }
            return !1
        }

        function s(e) {
            var t = d.selection.element();
            if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
            if (e && v(e.which)) return !0;
            d.events.disableBlur();
            var n = e.which;
            if (16 === n) return !0;
            if ((f = n) === V.KEYCODE.IME) return p = !0;
            p = !1;
            var r = b(n) && !C(e) && !e.altKey,
                o = n === V.KEYCODE.BACKSPACE || n === V.KEYCODE.DELETE;
            if ((d.selection.isFull() && !d.opts.keepFormatOnDelete && !d.placeholder.isVisible() || o && d.placeholder.isVisible() && d.opts.keepFormatOnDelete) && (r || o) && (g(), !b(n))) return e.preventDefault(), !0;
            if (n === V.KEYCODE.ENTER) e.shiftKey || t.classList.contains("fr-inner") || t.parentElement.classList.contains("fr-inner") ? function i(e) {
                e.preventDefault(), e.stopPropagation(), d.opts.multiLine && (d.selection.isCollapsed() || d.selection.remove(), d.cursor.enter(!0))
            }(e) : function a(e) {
                d.opts.multiLine ? (d.helpers.isIOS() || (e.preventDefault(), e.stopPropagation()), d.selection.isCollapsed() || d.selection.remove(), d.cursor.enter()) : (e.preventDefault(), e.stopPropagation())
            }(e);
            else if (n === V.KEYCODE.BACKSPACE && (e.metaKey || e.ctrlKey)) ! function s() {
                setTimeout(function () {
                    d.events.disableBlur(), d.events.focus()
                }, 0)
            }();
            else if (n !== V.KEYCODE.BACKSPACE || C(e) || e.altKey)
                if (n !== V.KEYCODE.DELETE || C(e) || e.altKey || e.shiftKey)
                
                n === V.KEYCODE.SPACE
                // Handle space
                ? function l(e) {
                    var t = d.selection.element();
                    if (!d.helpers.isMobile() && t && "A" === t.tagName) {
                        e.preventDefault(), e.stopPropagation(), d.selection.isCollapsed() || d.selection.remove();
                        var n = d.markers.insert();
                        if (n) {
                            var r = n.previousSibling;
                            !n.nextSibling && n.parentNode && "A" === n.parentNode.tagName ? (n.parentNode.insertAdjacentHTML("afterend", "&nbsp;".concat(V.MARKERS)), n.parentNode.removeChild(n)) : (r && r.nodeType === Node.TEXT_NODE && 1 === r.textContent.length && 160 === r.textContent.charCodeAt(0) ? r.textContent += " " : n.insertAdjacentHTML("beforebegin", "&nbsp;"), n.outerHTML = V.MARKERS), d.selection.restore()
                        }
                    }
                }(e)
                // Handle tab
                : n === V.KEYCODE.TAB
                    ? function c(e) {
                        if (0 < d.opts.tabSpaces)
                            if (d.selection.isCollapsed()) {
                                d.undo.saveStep(), e.preventDefault(), e.stopPropagation();
                                for (var t = "", n = 0; n < d.opts.tabSpaces; n++) t += "&nbsp;";
                                d.html.insert(t), d.placeholder.refresh(), d.undo.saveStep()
                            } else e.preventDefault(), e.stopPropagation(), e.shiftKey ? d.commands.outdent() : d.commands.indent()
                    }(e)
                    : C(e) || !b(e.which) || d.selection.isCollapsed() || e.ctrlKey || e.altKey || d.selection.remove();
                else {
                    if (m(t, e)) return e.preventDefault(), void e.stopPropagation();
                    d.placeholder.isVisible() ? (d.opts.keepFormatOnDelete || g(), e.preventDefault(), e.stopPropagation()) : h(e)
                }
            else {
                if (m(t, e)) return e.preventDefault(), void e.stopPropagation();
                d.placeholder.isVisible() ? (d.opts.keepFormatOnDelete || g(), e.preventDefault(), e.stopPropagation()) : u(e)
            }
            d.events.enableBlur()
        }

        function l() {
            if (!d.$wp) return !0;
            var e;
            d.opts.height || d.opts.heightMax ? (e = d.position.getBoundingRect().top, (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top), e > d.$wp.offset().top - d.helpers.scrollTop() + d.$wp.height() - 20 && d.$wp.scrollTop(e + d.$wp.scrollTop() - (d.$wp.height() + d.$wp.offset().top) + d.helpers.scrollTop() + 20)) : (e = d.position.getBoundingRect().top, d.opts.toolbarBottom && (e += d.opts.toolbarStickyOffset), (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top, e -= d.helpers.scrollTop()), (e += d.opts.toolbarStickyOffset) > d.o_win.innerHeight - 20 && o(d.o_win).scrollTop(e + d.helpers.scrollTop() - d.o_win.innerHeight + 20), e = d.position.getBoundingRect().top, d.opts.toolbarBottom || (e -= d.opts.toolbarStickyOffset), (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top, e -= d.helpers.scrollTop()), e < 100 && o(d.o_win).scrollTop(e + d.helpers.scrollTop() - 100))
        }

        function c(e) {
            var t = d.selection.element();

            if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName))
                return !0;

            if (e && 0 === e.which && f && (e.which = f), d.helpers.isAndroid() && d.browser.mozilla)
                return !0;

            if (p)
                return !1;

            if (e && d.helpers.isIOS() && e.which === V.KEYCODE.ENTER && d.doc.execCommand("undo"), !d.selection.isCollapsed())
                return !0;

            if (e && (e.which === V.KEYCODE.META || e.which === V.KEYCODE.CTRL))
                return !0;

            if (e && v(e.which))
                return !0;

            if (e && !d.helpers.isIOS() && (e.which === V.KEYCODE.ENTER || e.which === V.KEYCODE.BACKSPACE || 37 <= e.which && e.which <= 40 && !d.browser.msie))
                try {
                    l()
                } catch (r) { }

            var n = d.selection.element();

            (function o(e) {
                if (!e) return !1;
                var t = e.innerHTML;
                return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length)
            })(n) && !d.node.hasClass(n, "fr-marker") && "IFRAME" !== n.tagName && function i(e) {
                return !d.helpers.isIOS() || 0 === ((e.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length
            }(n) && (d.selection.save(), function a(e) {
                for (var t = d.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, d.node.filter(function (e) {
                    return /\u200B/gi.test(e.textContent)
                }), !1); t.nextNode();) {
                    var n = t.currentNode;
                    n.textContent = n.textContent.replace(/\u200B/gi, "")
                }
            }(n), d.selection.restore())
        }

        function C(e) {
            if (-1 !== navigator.userAgent.indexOf("Mac OS X")) {
                if (e.metaKey && !e.altKey) return !0
            } else if (e.ctrlKey && !e.altKey) return !0;
            return !1
        }

        function v(e) {
            if (e >= V.KEYCODE.ARROW_LEFT && e <= V.KEYCODE.ARROW_DOWN) return !0
        }

        function b(e) {
            if (e >= V.KEYCODE.ZERO && e <= V.KEYCODE.NINE) return !0;
            if (e >= V.KEYCODE.NUM_ZERO && e <= V.KEYCODE.NUM_MULTIPLY) return !0;
            if (e >= V.KEYCODE.A && e <= V.KEYCODE.Z) return !0;
            if (d.browser.webkit && 0 === e) return !0;
            switch (e) {
                case V.KEYCODE.SPACE:
                case V.KEYCODE.QUESTION_MARK:
                case V.KEYCODE.NUM_PLUS:
                case V.KEYCODE.NUM_MINUS:
                case V.KEYCODE.NUM_PERIOD:
                case V.KEYCODE.NUM_DIVISION:
                case V.KEYCODE.SEMICOLON:
                case V.KEYCODE.FF_SEMICOLON:
                case V.KEYCODE.DASH:
                case V.KEYCODE.EQUALS:
                case V.KEYCODE.FF_EQUALS:
                case V.KEYCODE.COMMA:
                case V.KEYCODE.PERIOD:
                case V.KEYCODE.SLASH:
                case V.KEYCODE.APOSTROPHE:
                case V.KEYCODE.SINGLE_QUOTE:
                case V.KEYCODE.OPEN_SQUARE_BRACKET:
                case V.KEYCODE.BACKSLASH:
                case V.KEYCODE.CLOSE_SQUARE_BRACKET:
                    return !0;
                default:
                    return !1
            }
        }

        function L(e) {
            var t = e.which;
            if (C(e) || 37 <= t && t <= 40 || !b(t) && t !== V.KEYCODE.DELETE && t !== V.KEYCODE.BACKSPACE && t !== V.KEYCODE.ENTER && t !== V.KEYCODE.IME)
                return !0;

            n || (r = d.snapshot.get(), d.undo.canDo() || d.undo.saveStep()), clearTimeout(n), n = setTimeout(function () {
                n = null, d.undo.saveStep()
            }, Math.max(250, d.opts.typingTimer))
        }

        function E(e) {
            var t = e.which;
            if (C(e) || 37 <= t && t <= 40) return !0;
            r && n ? (d.undo.saveStep(r), r = null) : void 0 !== t && 0 !== t || r || n || d.undo.saveStep()
        }

        function y(e) {
            if (e && "BR" === e.tagName) return !1;
            try {
                return 0 === (e.textContent || "").length && e.querySelector && !e.querySelector(":scope > br") || e.childNodes && 1 === e.childNodes.length && e.childNodes[0].getAttribute && ("false" === e.childNodes[0].getAttribute("contenteditable") || d.node.hasClass(e.childNodes[0], "fr-img-caption"))
            } catch (t) {
                return !1
            }
        }

        function S(e) {
            var t = d.el.childNodes,
                n = d.html.defaultTag(),
                r = d.node.blockParent(d.selection.blocks()[0]);
            return r && "TR" == r.tagName && r.getAttribute("contenteditable") == undefined && (r = r.closest("table")), !d.node.isEditable(e.target) || r && "false" === r.getAttribute("contenteditable") ? d.toolbar.disable() : d.toolbar.enable(), !(!e.target || e.target === d.el) || (0 === t.length || void (t[0].offsetHeight + t[0].offsetTop <= e.offsetY ? y(t[t.length - 1]) && (n ? d.$el.append("<".concat(n, ">").concat(V.MARKERS, "<br></").concat(n, ">")) : d.$el.append("".concat(V.MARKERS, "<br>")), d.selection.restore(), l()) : e.offsetY <= 10 && y(t[0]) && (n ? d.$el.prepend("<".concat(n, ">").concat(V.MARKERS, "<br></").concat(n, ">")) : d.$el.prepend("".concat(V.MARKERS, "<br>")), d.selection.restore(), l())))
        }

        function T() {
            n && clearTimeout(n)
        }
        return {
            _init: function M() {
                d.events.on("keydown", L),
                d.events.on("input", e),
                d.events.on("mousedown", a),
                d.events.on("keyup input", E),
                d.events.on("keypress", i),
                d.events.on("keydown", s),
                d.events.on("keyup", c),
                d.events.on("destroy", T),
                d.events.on("html.inserted", c),
                d.events.on("cut", t),
                d.opts.multiLine && d.events.on("click", S)
            },
            ctrlKey: C,
            isCharacter: b,
            isArrow: v,
            forceUndo: function N() {
                n && (clearTimeout(n), d.undo.saveStep(), r = null)
            },
            isIME: function A() {
                return p
            },
            isBrowserAction: function x(e) {
                var t = e.which;
                return C(e) || t === V.KEYCODE.F5
            },
            positionCaret: l
        }
    }, Object.assign(V.DEFAULTS, {
        pastePlain: !1,
        pasteDeniedTags: ["colgroup", "col", "meta"],
        pasteDeniedAttrs: ["class", "id"],
        pasteAllowedStyleProps: [".*"],
        pasteAllowLocalImages: !1
    }),
    /////////////////
    // PASTE MODULE
    /////////////////
    V.MODULES.paste = function (N) {
        var a, s, A, i, x, O = N.$;

        function n(e, t) {
            try {
                N.win.localStorage.setItem("fr-copied-html", e), N.win.localStorage.setItem("fr-copied-text", t)
            } catch (n) { }
        }

        function e(e) {
            var t = N.html.getSelected();
            n(t, O(N.doc.createElement("div")).html(t).text()), "cut" === e.type && (N.undo.saveStep(), setTimeout(function () {
                N.selection.save(), N.html.wrap(), N.selection.restore(), N.events.focus(), N.undo.saveStep()
            }, 0))
        }
        var l = !1;

        function t(e) {
            if ("INPUT" === e.target.nodeName && "text" === e.target.type) return !0;
            if (N.edit.isDisabled()) return !1;
            if (c(e.target)) return !1;
            if (l) return !1;
            if (e.originalEvent && (e = e.originalEvent), !1 === N.events.trigger("paste.before", [e])) return e.preventDefault(), !1;
            if (e && e.clipboardData && e.clipboardData.getData) {
                var t = "",
                    n = e.clipboardData.types;
                if (N.helpers.isArray(n))
                    for (var r = 0; r < n.length; r++) t += "".concat(n[r], ";");
                else t = n;
                if (a = "", /text\/rtf/.test(t) && (s = e.clipboardData.getData("text/rtf")), /text\/html/.test(t) && !N.browser.safari ? a = e.clipboardData.getData("text/html") : /text\/rtf/.test(t) && N.browser.safari ? a = s : /public.rtf/.test(t) && N.browser.safari && (a = e.clipboardData.getData("text/rtf")), A = e.clipboardData.getData("text"), "" !== a) return d(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1;
                a = null
            }
            return function o() {
                N.selection.save(), N.events.disableBlur(), a = null, i ? (i.html(""), N.browser.edge && N.opts.iframe && N.$el.append(i)) : (i = O('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>'), N.browser.webkit || N.browser.mozilla ? (i.css("top", N.$sc.scrollTop()), N.$el.after(i)) : N.browser.edge && N.opts.iframe ? N.$el.append(i) : N.$box.after(i), N.events.on("destroy", function () {
                    i.remove()
                }));
                var e;
                N.helpers.isIOS() && N.$sc && (e = N.$sc.scrollTop());
                N.opts.iframe && N.$el.attr("contenteditable", "false");
                i.focus(), N.helpers.isIOS() && N.$sc && N.$sc.scrollTop(e);
                N.win.setTimeout(d, 1)
            }(), !1
        }

        function c(e) {
            return e && "false" === e.contentEditable
        }

        function r(e) {
            if (e.originalEvent && (e = e.originalEvent), c(e.target)) return !1;
            if (e && e.dataTransfer && e.dataTransfer.getData) {
                var t = "",
                    n = e.dataTransfer.types;
                if (N.helpers.isArray(n))
                    for (var r = 0; r < n.length; r++) t += "".concat(n[r], ";");
                else t = n;
                if (a = "", /text\/rtf/.test(t) && (s = e.dataTransfer.getData("text/rtf")), /text\/html/.test(t) ? a = e.dataTransfer.getData("text/html") : /text\/rtf/.test(t) && N.browser.safari ? a = s : /text\/plain/.test(t) && !this.browser.mozilla && (a = N.html.escapeEntities(e.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), "" !== a) {
                    N.keys.forceUndo(), x = N.snapshot.get(), N.selection.save(), N.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
                    var o = N.markers.insertAtPoint(e);
                    if (N.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), N.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), N.selection.restore(), N.selection.remove(), N.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), !1 !== o) {
                        var i = N.el.querySelector(".fr-marker");
                        return O(i).replaceWith(V.MARKERS), N.selection.restore(), d(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1
                    }
                } else a = null
            }
        }

        function d() {
            N.opts.iframe && N.$el.attr("contenteditable", "true"), N.browser.edge && N.opts.iframe && N.$box.after(i), x || (N.keys.forceUndo(), x = N.snapshot.get()), a || (a = i.get(0).innerHTML, A = i.text(), N.selection.restore(), N.events.enableBlur());
            var e = a.match(/(class="?Mso|class='?Mso|class="?Xl|class='?Xl|class=Xl|style="[^"]*\bmso-|style='[^']*\bmso-|w:WordDocument|LibreOffice)/gi),
                t = N.events.chainTrigger("paste.beforeCleanup", a);
            t && "string" == typeof t && (a = t), (!e || e && !1 !== N.events.trigger("paste.wordPaste", [a])) && o(a, e)
        }

        function w(e) {
            for (var t = "", n = 0; n++ < e;) t += "&nbsp;";
            return t
        }

        function o(e, t, n) {
            var r, o = null,
                i = null;
            if (0 <= e.toLowerCase().indexOf("<body")) {
                var a = "";
                0 <= e.indexOf("<style") && (a = e.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), e = (e = (e = a + e.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function (e) {
                    return e.replace(/\n/g, "<br />")
                })).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2")
            }
            var s = !1;
            0 <= e.indexOf('id="docs-internal-guid') && (e = e.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), s = !0), 0 <= e.indexOf('content="Sheets"') && (e = e.replace(/width:0px;/g, ""));
            var l = !1;
            if (!t)
                if ((l = function E() {
                    var e = null;
                    try {
                        e = N.win.localStorage.getItem("fr-copied-text")
                    } catch (t) { }
                    return !(!e || !A || A.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") !== e.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") && A.replace(/\s/g, "") !== e.replace(/\s/g, ""))
                }()) && (e = N.win.localStorage.getItem("fr-copied-html")), l) e = N.clean.html(e, N.opts.pasteDeniedTags, N.opts.pasteDeniedAttrs);
                else {
                    var c = N.opts.htmlAllowedStyleProps;
                    N.opts.htmlAllowedStyleProps = N.opts.pasteAllowedStyleProps, N.opts.htmlAllowComments = !1, e = (e = (e = e.replace(/<span class="Apple-tab-span">\s*<\/span>/g, w(N.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function (e, t) {
                        return w(t.length * (N.opts.tabSpaces || 4))
                    })).replace(/\t/g, w(N.opts.tabSpaces || 4)), e = N.clean.html(e, N.opts.pasteDeniedTags, N.opts.pasteDeniedAttrs), N.opts.htmlAllowedStyleProps = c, N.opts.htmlAllowComments = !0, e = (e = (e = $(e)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "")
                } !t || N.wordPaste && n || (0 === (e = e.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (e = "<table>".concat(e, "</table>")), e = $(e = function y(e) {
                    var t;
                    e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e
                            .replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>"))
                            .replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>"))
                            .replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>"))
                            .replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>"))
                            .replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"))
                            .replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"))
                            .replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"))
                            .replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>"))
                            .replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>"))
                            .replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span"))
                            .replace(/<!--\[if !supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, ""))
                            .replace(/<!\[if !supportLists\]>([\s\S]*?)<!\[endif\]>/gi, ""))
                            .replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " "))
                            .replace(/<!--[\s\S]*?-->/gi, ""))
                            .replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                    var n, r = ["style", "script", "applet", "embed", "noframes", "noscript"];
                    for (t = 0; t < r.length; t++) {
                        var o = new RegExp("<".concat(r[t], ".*?").concat(r[t], "(.*?)>"), "gi");
                        e = e.replace(o, "")
                    }
                    for (e = (e = (e = e.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
                        (e = (n = e).replace(/<[^/>][^>]*><\/[^>]+>/gi, "")) !== n;);
                    e = (e = e.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), e = (e = (e = N.clean.html(e, N.opts.pasteDeniedTags, N.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
                    var i = N.o_doc.createElement("div");
                    i.innerHTML = e;
                    var a = i.querySelectorAll("li[data-indent]");
                    for (t = 0; t < a.length; t++) {
                        var s = a[t],
                            l = s.previousElementSibling;
                        if (l && "LI" === l.tagName) {
                            var c = l.querySelector(":scope > ul, :scope > ol");
                            c || (c = document.createElement("ul"), l.appendChild(c)), c.appendChild(s)
                        } else s.removeAttribute("data-indent")
                    }
                    return N.html.cleanBlankSpaces(i), e = i.innerHTML
                }(e))), N.opts.pastePlain && !l && (e = function S(e) {
                    var t, n = null,
                        r = N.doc.createElement("div");
                    r.innerHTML = e;
                    var o = r.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                    for (t = 0; t < o.length; t++)(n = o[t]).outerHTML = "<".concat(N.html.defaultTag() || "DIV", ">").concat(n.innerText, "</").concat(N.html.defaultTag() || "DIV", ">");
                    for (t = (o = r.querySelectorAll("*:not(".concat("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not("), ")"))).length - 1; 0 <= t; t--)(n = o[t]).outerHTML = n.innerHTML;
                    return function i(e) {
                        for (var t = N.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType !== Node.TEXT_NODE && t[n].nodeType !== Node.ELEMENT_NODE ? t[n].parentNode.removeChild(t[n]) : i(t[n])
                    }(r), r.innerHTML
                }(e));
            var d = N.events.chainTrigger("paste.afterCleanup", e);
            if ("string" == typeof d && (e = d), "" !== e) {
                var f = N.o_doc.createElement("div");
                0 <= (f.innerHTML = e).indexOf("<body>") ? (N.html.cleanBlankSpaces(f), N.spaces.normalize(f, !0)) : N.spaces.normalize(f);
                var p = f.getElementsByTagName("span");
                for (r = p.length - 1; 0 <= r; r--) {
                    var u = p[r];
                    0 === u.attributes.length && (u.outerHTML = u.innerHTML)
                }
                if (!0 === N.opts.linkAlwaysBlank) {
                    var h = f.getElementsByTagName("a");
                    for (r = h.length - 1; 0 <= r; r--) {
                        var g = h[r];
                        g.getAttribute("target") || g.setAttribute("target", "_blank")
                    }
                }
                var m = N.selection.element(),
                    C = !1;
                if (m && O(m).parentsUntil(N.el, "ul, ol").length && (C = !0), C) {
                    var v = f.children;
                    1 === v.length && 0 <= ["OL", "UL"].indexOf(v[0].tagName) && (v[0].outerHTML = v[0].innerHTML)
                }
                if (!s) {
                    var b = f.getElementsByTagName("br");
                    for (r = b.length - 1; 0 <= r; r--) {
                        var L = b[r];
                        N.node.isBlock(L.previousSibling) && L.parentNode.removeChild(L)
                    }
                }
                if (N.opts.enter === V.ENTER_BR)
                    for (r = (o = f.querySelectorAll("p, div")).length - 1; 0 <= r; r--) 0 === (i = o[r]).attributes.length && (i.outerHTML = i.innerHTML + (i.nextSibling && !N.node.isEmpty(i) ? "<br>" : ""));
                else if (N.opts.enter === V.ENTER_DIV)
                    for (r = (o = f.getElementsByTagName("p")).length - 1; 0 <= r; r--) 0 === (i = o[r]).attributes.length && (i.outerHTML = "<div>".concat(i.innerHTML, "</div>"));
                else N.opts.enter === V.ENTER_P && 1 === f.childNodes.length && "P" === f.childNodes[0].tagName && 0 === f.childNodes[0].attributes.length && (f.childNodes[0].outerHTML = f.childNodes[0].innerHTML);
                e = f.innerHTML, l && (e = function T(e) {
                    var t, n = N.o_doc.createElement("div");
                    n.innerHTML = e;
                    var r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(V.VOID_ELEMENTS.join("):not("), "):not(").concat(N.opts.htmlAllowedEmptyTags.join("):not("), ")"));
                    for (; r.length;) {
                        for (t = 0; t < r.length; t++) r[t].parentNode.removeChild(r[t]);
                        r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(V.VOID_ELEMENTS.join("):not("), "):not(").concat(N.opts.htmlAllowedEmptyTags.join("):not("), ")"))
                    }
                    return n.innerHTML
                }(e)), N.html.insert(e, !0)
            } ! function M() {
                N.events.trigger("paste.after")
            }(), N.undo.saveStep(x), x = null, N.undo.saveStep()
        }

        function f(e) {
            for (var t = e.length - 1; 0 <= t; t--) e[t].attributes && e[t].attributes.length && e.splice(t, 1);
            return e
        }

        function $(e) {
            var t, n = N.o_doc.createElement("div");
            n.innerHTML = e;
            for (var r = f(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); r.length;) {
                var o = r[r.length - 1];
                if (N.html.defaultTag() && "div" !== N.html.defaultTag()) o.querySelector(N.html.blockTagsQuery()) ? o.outerHTML = o.innerHTML : o.outerHTML = "<".concat(N.html.defaultTag(), ">").concat(o.innerHTML, "</").concat(N.html.defaultTag(), ">");
                else {
                    var i = o.querySelectorAll("*");
                    !i.length || "BR" !== i[i.length - 1].tagName && 0 === o.innerText.length ? o.outerHTML = o.innerHTML + (o.nextSibling ? "<br>" : "") : !i.length || "BR" !== i[i.length - 1].tagName || i[i.length - 1].nextSibling ? o.outerHTML = o.innerHTML + (o.nextSibling ? "<br>" : "") : o.outerHTML = o.innerHTML
                }
                r = f(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")))
            }
            for (r = f(Array.prototype.slice.call(n.querySelectorAll("div:not([style])"))); r.length;) {
                for (t = 0; t < r.length; t++) {
                    var a = r[t],
                        s = a.innerHTML.replace(/\u0009/gi, "").trim();
                    a.outerHTML = s
                }
                r = f(Array.prototype.slice.call(n.querySelectorAll("div:not([style])")))
            }
            return n.innerHTML
        }

        function p() {
            N.el.removeEventListener("copy", e), N.el.removeEventListener("cut", e), N.el.removeEventListener("paste", t)
        }
        return {
            _init: function u() {
                N.el.addEventListener("copy", e), N.el.addEventListener("cut", e), N.el.addEventListener("paste", t, {
                    capture: !0
                }), N.events.on("drop", r), N.browser.msie && N.browser.version < 11 && (N.events.on("mouseup", function (e) {
                    2 === e.button && (setTimeout(function () {
                        l = !1
                    }, 50), l = !0)
                }, !0), N.events.on("beforepaste", t)), N.events.on("destroy", p)
            },
            cleanEmptyTagsAndDivs: $,
            getRtfClipboard: function h() {
                return s
            },
            saveCopiedText: n,
            clean: o
        }
    },
    //////////////
    // SHORTCUTS
    //////////////
    Object.assign(V.DEFAULTS, {
        shortcutsEnabled: [],
        shortcutsHint: !0
    }),
    V.SHORTCUTS_MAP = {},
    V.RegisterShortcut = function (e, t, n, r, o, i) {
        V.SHORTCUTS_MAP[(o ? "^" : "") + (i ? "@" : "") + e] = {
            cmd: t,
            val: n,
            letter: r,
            shift: o,
            option: i
        }, V.DEFAULTS.shortcutsEnabled.push(t)
    },
    V.RegisterShortcut(V.KEYCODE.E, "show", null, "E", !1, !1),
    V.RegisterShortcut(V.KEYCODE.B, "bold", null, "B", !1, !1),
    V.RegisterShortcut(V.KEYCODE.I, "italic", null, "I", !1, !1),
    V.RegisterShortcut(V.KEYCODE.U, "underline", null, "U", !1, !1),
    V.RegisterShortcut(V.KEYCODE.S, "strikeThrough", null, "S", !1, !1),
    V.RegisterShortcut(V.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1),
    V.RegisterShortcut(V.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1),
    V.RegisterShortcut(V.KEYCODE.Z, "undo", null, "Z", !1, !1),
    V.RegisterShortcut(V.KEYCODE.Z, "redo", null, "Z", !0, !1),
    V.RegisterShortcut(V.KEYCODE.Y, "redo", null, "Y", !1, !1),
    V.MODULES.shortcuts = function (s) {
        var r = null;
        var l = !1;

        function e(e) {
            if (!s.core.hasFocus())
                return !0;

            var t = e.which,
                n = -1 !== navigator.userAgent.indexOf("Mac OS X")
                    ? e.metaKey
                    : e.ctrlKey;

            if ("keyup" === e.type && l && t !== V.KEYCODE.META)
                return l = !1;

            "keydown" === e.type && (l = !1);

            var r = (e.shiftKey ? "^" : "") + (e.altKey ? "@" : "") + t,
                o = s.node.blockParent(s.selection.blocks()[0]);

            if (o && "TR" == o.tagName &&
                o.getAttribute("contenteditable") == undefined &&
                (o = o.closest("table")), n &&
                V.SHORTCUTS_MAP[r] &&
                (!o || "false" !== o.getAttribute("contenteditable"))
            ) {
                var i = V.SHORTCUTS_MAP[r].cmd;
                if (i && 0 <= s.opts.shortcutsEnabled.indexOf(i)) {
                    var a = V.SHORTCUTS_MAP[r].val;
                    if (!1 === s.events.trigger("shortcut", [e, i, a]))
                        return !(l = !0);

                    if (i && (s.commands[i] || V.COMMANDS[i] && V.COMMANDS[i].callback))
                        return e.preventDefault(), e.stopPropagation(), "keydown" === e.type && ((s.commands[i] || V.COMMANDS[i].callback)(), l = !0), !1
                }
            }
        }
        return {
            _init: function t() {
                s.events.on("keydown", e, !0), s.events.on("keyup", e, !0)
            },
            get: function o(e) {
                if (!s.opts.shortcutsHint)
                    return null;
                if (!r)
                    for (var t in r = {}, V.SHORTCUTS_MAP)
                        Object.prototype.hasOwnProperty.call(V.SHORTCUTS_MAP, t) &&
                        0 <= s.opts.shortcutsEnabled.indexOf(V.SHORTCUTS_MAP[t].cmd) &&
                        (r["".concat(V.SHORTCUTS_MAP[t].cmd, ".").concat(V.SHORTCUTS_MAP[t].val || "")] = {
                            shift: V.SHORTCUTS_MAP[t].shift,
                            option: V.SHORTCUTS_MAP[t].option,
                            letter: V.SHORTCUTS_MAP[t].letter
                        });
                var n = r[e];
                return n ? (s.helpers.isMac() ? String.fromCharCode(8984) : "".concat(s.language.translate("Ctrl"), "+")) + (n.shift ? s.helpers.isMac() ? String.fromCharCode(8679) : "".concat(s.language.translate("Shift"), "+") : "") + (n.option ? s.helpers.isMac() ? String.fromCharCode(8997) : "".concat(s.language.translate("Alt"), "+") : "") + n.letter : null
            }
        }
    },
    ///////////////////
    // SNAPSHOT MODULE
    ///////////////////
    V.MODULES.snapshot = function (l) {
        function n(e) {
            for (var t = e.parentNode.childNodes, n = 0, r = null, o = 0; o < t.length; o++) {
                if (r) {
                    var i = t[o].nodeType === Node.TEXT_NODE && "" === t[o].textContent,
                        a = r.nodeType === Node.TEXT_NODE && t[o].nodeType === Node.TEXT_NODE,
                        s = r.nodeType === Node.TEXT_NODE && "" === r.textContent;
                    i || a || s || n++
                }
                if (t[o] === e) return n;
                r = t[o]
            }
        }

        function o(e) {
            var t = [];
            if (!e.parentNode) return [];
            for (; !l.node.isElement(e);) t.push(n(e)), e = e.parentNode;
            return t.reverse()
        }

        function i(e, t) {
            for (; e && e.nodeType === Node.TEXT_NODE;) {
                var n = e.previousSibling;
                n && n.nodeType === Node.TEXT_NODE && (t += n.textContent.length), e = n
            }
            return t
        }

        function c(e) {
            for (var t = l.el, n = 0; n < e.length; n++) t = t.childNodes[e[n]];
            return t
        }

        function r(e, t) {
            try {
                var n = c(t.scLoc),
                    r = t.scOffset,
                    o = c(t.ecLoc),
                    i = t.ecOffset,
                    a = l.doc.createRange();
                a.setStart(n, r), a.setEnd(o, i), e.addRange(a)
            } catch (s) { }
        }
        return {
            get: function a() {
                var e, t = {};
                if (l.events.trigger("snapshot.before"), t.html = (l.$wp ? l.$el.html() : l.$oel.get(0).outerHTML).replace(/ style=""/g, ""), t.ranges = [], l.$wp && l.selection.inEditor() && l.core.hasFocus())
                    for (var n = l.selection.ranges(), r = 0; r < n.length; r++) t.ranges.push({
                        scLoc: o((e = n[r]).startContainer),
                        scOffset: i(e.startContainer, e.startOffset),
                        ecLoc: o(e.endContainer),
                        ecOffset: i(e.endContainer, e.endOffset)
                    });
                return l.events.trigger("snapshot.after", [t]), t
            },
            restore: function s(e) {
                l.$el.html() !== e.html && (l.opts.htmlExecuteScripts ? l.$el.html(e.html) : l.el.innerHTML = e.html);
                var t = l.selection.get();
                l.selection.clear(), l.events.focus(!0);
                for (var n = 0; n < e.ranges.length; n++) r(t, e.ranges[n])
            },
            equal: function d(e, t) {
                return e.html === t.html && (!l.core.hasFocus() || JSON.stringify(e.ranges) === JSON.stringify(t.ranges))
            }
        }
    },
    ///////////////
    // UNDO MODULE
    ///////////////
    V.MODULES.undo = function (n) {
        function e(e) {
            var t = e.which;
            n.keys.ctrlKey(e) &&
            (   t === V.KEYCODE.Z &&
                e.shiftKey &&
                e.preventDefault(),
                t === V.KEYCODE.Z &&
                e.preventDefault()
            )
        }
        var t = null;

        function r() {
            if (n.undo_stack && !n.undoing)
                for (; n.undo_stack.length > n.undo_index;) n.undo_stack.pop()
        }

        function o() {
            n.undo_index = 0, n.undo_stack = []
        }

        function i() {
            n.undo_stack = []
        }
        return {
            _init: function a() {
                o(),
                n.events.on("initialized", function () {
                    t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, "")
                }),
                n.events.on("blur", function () {
                    n.el.querySelector(".fr-dragging") || n.undo.saveStep()
                }),
                n.events.on("keydown", e),
                n.events.on("destroy", i)
            },
            run: function s() {
                if (1 < n.undo_index) {
                    n.undoing = !0;
                    var e = n.undo_stack[--n.undo_index - 1];
                    clearTimeout(n._content_changed_timer),
                    n.snapshot.restore(e),
                    t = e.html,
                    n.popups.hideAll(),
                    n.toolbar.enable(),
                    n.events.trigger("contentChanged"),
                    n.events.trigger("commands.undo"),
                    n.undoing = !1
                }
            },
            redo: function l() {
                if (n.undo_index < n.undo_stack.length) {
                    n.undoing = !0;
                    var e = n.undo_stack[n.undo_index++];
                    clearTimeout(n._content_changed_timer),
                    n.snapshot.restore(e),
                    t = e.html,
                    n.popups.hideAll(),
                    n.toolbar.enable(),
                    n.events.trigger("contentChanged"),
                    n.events.trigger("commands.redo"),
                    n.undoing = !1
                }
            },
            canDo: function c() {
                return !(0 === n.undo_stack.length || n.undo_index <= 1)
            },
            canRedo: function d() {
                return n.undo_index !== n.undo_stack.length
            },
            dropRedo: r,
            reset: o,
            saveStep: function f(e) {
                !n.undo_stack ||
                n.undoing ||
                n.el.querySelector(".fr-marker") ||
                (void 0 === e
                    ? (e = n.snapshot.get(), n.undo_stack[n.undo_index - 1] && n.snapshot.equal(n.undo_stack[n.undo_index - 1], e) || (r(), n.undo_stack.push(e), n.undo_index++, e.html !== t && (n.events.trigger("contentChanged"), t = e.html)))
                    : (r(), 0 < n.undo_index ? n.undo_stack[n.undo_index - 1] = e : (n.undo_stack.push(e), n.undo_index++)))
            }
        }
    },
    ////////////////
    // SIZE MODULE
    ////////////////
    Object.assign(V.DEFAULTS, {
        height: null,
        heightMax: null,
        heightMin: null,
        width: null
    }),
    V.MODULES.size = function (e) {
        function t() {
            n(), e.opts.height && e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom"))), e.$iframe.height(e.$el.outerHeight(!0))
        }

        function n() {
            e.opts.heightMin ? e.$el.css("minHeight", e.opts.heightMin) : e.$el.css("minHeight", ""), e.opts.heightMax ? (e.$wp.css("maxHeight", e.opts.heightMax), e.$wp.css("overflow", "auto")) : (e.$wp.css("maxHeight", ""), e.$wp.css("overflow", "")), e.opts.height ? (e.$wp.css("height", e.opts.height), e.$wp.css("overflow", "auto"), e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom")))) : (e.$wp.css("height", ""), e.opts.heightMin || e.$el.css("minHeight", ""), e.opts.heightMax || e.$wp.css("overflow", "")), e.opts.width && e.$box.width(e.opts.width)
        }
        return {
            _init: function r() {
                if (!e.$wp) return !1;
                n(), e.$iframe && (e.events.on("keyup keydown", function () {
                    setTimeout(t, 0)
                }, !0), e.events.on("commands.after html.set init initialized paste.after", t))
            },
            syncIframe: t,
            refresh: n
        }
    },
    ///////////////////
    // CORE MODULE
    ///////////////////
    Object.assign(V.DEFAULTS, {
        documentReady: !1,
        editorClass: null,
        typingTimer: 500,
        iframe: !1,
        requestWithCORS: !0,
        requestWithCredentials: !1,
        requestHeaders: {},
        useClasses: !0,
        spellcheck: !0,
        iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:20px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}',
        iframeStyle: "",
        iframeStyleFiles: [],
        direction: "auto",
        zIndex: 1,
        tabIndex: null,
        disableRightClick: !1,
        scrollableContainer: "body",
        keepFormatOnDelete: !1,
        theme: null
    }),
    V.MODULES.core = function (a) {
        var r = a.$;

        function n() {
            if (a.$box.addClass("fr-box".concat(a.opts.editorClass ? " ".concat(a.opts.editorClass) : "")), a.$box.attr("role", "application"), a.$wp.addClass("fr-wrapper"), a.opts.documentReady && a.$box.addClass("fr-document"), function o() {
                a.opts.iframe || a.$el.addClass("fr-element fr-view")
            }(), a.opts.iframe) {
                a.$iframe.addClass("fr-iframe"), a.$el.addClass("fr-view");
                for (var e = 0; e < a.o_doc.styleSheets.length; e++) {
                    var t = void 0;
                    try {
                        t = a.o_doc.styleSheets[e].cssRules
                    } catch (i) { }
                    if (t)
                        for (var n = 0, r = t.length; n < r; n++) !t[n].selectorText || 0 !== t[n].selectorText.indexOf(".fr-view") && 0 !== t[n].selectorText.indexOf(".fr-element") || 0 < t[n].style.cssText.length && (0 === t[n].selectorText.indexOf(".fr-view") ? a.opts.iframeStyle += "".concat(t[n].selectorText.replace(/\.fr-view/g, "body"), "{").concat(t[n].style.cssText, "}") : a.opts.iframeStyle += "".concat(t[n].selectorText.replace(/\.fr-element/g, "body"), "{").concat(t[n].style.cssText, "}"))
                }
            }
            "auto" !== a.opts.direction && a.$box.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(a.opts.direction)), a.$el.attr("dir", a.opts.direction), a.$wp.attr("dir", a.opts.direction), 1 < a.opts.zIndex && a.$box.css("z-index", a.opts.zIndex), a.opts.theme && a.$box.addClass("".concat(a.opts.theme, "-theme")), a.opts.tabIndex = a.opts.tabIndex || a.$oel.attr("tabIndex"), a.opts.tabIndex && a.$el.attr("tabIndex", a.opts.tabIndex)
        }
        return {
            _init: function o() {
                if (V.INSTANCES.push(a), function e() {
                    a.drag_support = {
                        filereader: "undefined" != typeof FileReader,
                        formdata: Boolean(a.win.FormData),
                        progress: "upload" in new XMLHttpRequest
                    }
                }(), a.$wp) {
                    n(), a.html.set(a._original_html), a.$el.attr("spellcheck", a.opts.spellcheck), a.helpers.isMobile() && (a.$el.attr("autocomplete", a.opts.spellcheck ? "on" : "off"), a.$el.attr("autocorrect", a.opts.spellcheck ? "on" : "off"), a.$el.attr("autocapitalize", a.opts.spellcheck ? "on" : "off")), a.opts.disableRightClick && a.events.$on(a.$el, "contextmenu", function (e) {
                        if (2 === e.button) return e.preventDefault(), e.stopPropagation(), !1
                    });
                    try {
                        a.doc.execCommand("styleWithCSS", !1, !1)
                    } catch (t) { }
                }
                "TEXTAREA" === a.$oel.get(0).tagName && (a.events.on("contentChanged", function () {
                    a.$oel.val(a.html.get())
                }), a.events.on("form.submit", function () {
                    a.$oel.val(a.html.get())
                }), a.events.on("form.reset", function () {
                    a.html.set(a._original_html)
                }), a.$oel.val(a.html.get())), a.helpers.isIOS() && a.events.$on(a.$doc, "selectionchange", function () {
                    a.$doc.get(0).hasFocus() || a.$win.get(0).focus()
                }), a.events.trigger("init"), a.opts.autofocus && !a.opts.initOnClick && a.$wp && a.events.on("initialized", function () {
                    a.events.focus(!0)
                })
            },
            destroy: function t(e) {
                "TEXTAREA" === a.$oel.get(0).tagName && a.$oel.val(e), a.$box && a.$box.removeAttr("role"), a.$wp && ("TEXTAREA" === a.$oel.get(0).tagName ? (a.$el.html(""), a.$wp.html(""), a.$box.replaceWith(a.$oel), a.$oel.show()) : (a.$wp.replaceWith(e), a.$el.html(""), a.$box.removeClass("fr-view fr-ltr fr-box ".concat(a.opts.editorClass || "")), a.opts.theme && a.$box.addClass("".concat(a.opts.theme, "-theme")))), this.$wp = null, this.$el = null, this.el = null, this.$box = null
            },
            isEmpty: function e() {
                return a.node.isEmpty(a.el)
            },
            getXHR: function i(e, t) {
                var n = new XMLHttpRequest;
                for (var r in n.open(t, e, !0), a.opts.requestWithCredentials && (n.withCredentials = !0), a.opts.requestHeaders) Object.prototype.hasOwnProperty.call(a.opts.requestHeaders, r) && n.setRequestHeader(r, a.opts.requestHeaders[r]);
                return n
            },
            injectStyle: function s(e) {
                if (a.opts.iframe) {
                    a.$head.find("style[data-fr-style], link[data-fr-style]").remove(), a.$head.append('<style data-fr-style="true">'.concat(e, "</style>"));
                    for (var t = 0; t < a.opts.iframeStyleFiles.length; t++) {
                        var n = r('<link data-fr-style="true" rel="stylesheet" href="'.concat(a.opts.iframeStyleFiles[t], '">'));
                        n.get(0).addEventListener("load", a.size.syncIframe), a.$head.append(n)
                    }
                }
            },
            hasFocus: function l() {
                return a.browser.mozilla && a.helpers.isMobile() ? a.selection.inEditor() : a.node.hasFocus(a.el) || 0 < a.$el.find("*:focus").length
            },
            sameInstance: function c(e) {
                if (!e) return !1;
                var t = e.data("instance");
                return !!t && t.id === a.id
            }
        }
    },
    /////////////////
    // POPUP MODULE
    /////////////////
    V.POPUP_TEMPLATES = {
        "text.edit": "[_EDIT_]"
    },
    V.RegisterTemplate = function (e, t) {
        V.POPUP_TEMPLATES[e] = t
    },
    V.MODULES.popups = function (u) {
        var r, d = u.$;
        u.shared.popups || (u.shared.popups = {});
        var h, g = u.shared.popups;

        function m(e, t) {
            t.isVisible() || (t = u.$sc), t.is(g[e].data("container")) || (g[e].data("container", t), t.append(g[e]))
        }

        function o(e) {
            var t;
            e.find(".fr-upload-progress").addClass("fr-height-set"), e.find(".fr-upload-progress").removeClass("fr-height-auto"), u.popups.get("filesManager.insert").removeClass("fr-height-auto"), e.find(".fr-files-upload-layer").hasClass("fr-active") && (t = 1), e.find(".fr-files-by-url-layer").hasClass("fr-active") && (t = 2), e.find(".fr-files-embed-layer").hasClass("fr-active") && (t = 3), e.find(".fr-upload-progress-layer").get(0).clientHeight + 10 < e.find(".fr-upload-progress").get(0).clientHeight && e.find(".fr-upload-progress").addClass("fr-height-auto"), 400 < e[0].clientHeight && (e[0].childNodes[4].style.height = "".concat(e[0].clientHeight - (e[0].childNodes[0].clientHeight + e[0].childNodes[t].clientHeight) - 80, "px"))
        }
        var i = 2e3;

        function a() {
            d(this).toggleClass("fr-not-empty", !0)
        }

        function s() {
            var e = d(this);
            e.toggleClass("fr-not-empty", "" !== e.val())
        }

        function C(e) {
            return g[e] && u.node.hasClass(g[e], "fr-active") && u.core.sameInstance(g[e]) || !1
        }

        function v(e) {
            for (var t in g)
                if (Object.prototype.hasOwnProperty.call(g, t) && C(t) && (void 0 === e || g[t].data("instance") === e)) return g[t];
            return !1
        }

        function n(e) {
            var t = null;
            if (t = "string" != typeof e ? e : g[e], "filesManager.insert" === e && u.filesManager !== undefined && u.filesManager.isChildWindowOpen()) return !1;
            if (t && u.node.hasClass(t, "fr-active") && (t.removeClass("fr-active fr-above"), u.events.trigger("popups.hide.".concat(e)), u.$tb && (1 < u.opts.zIndex ? u.$tb.css("zIndex", u.opts.zIndex + 1) : u.$tb.css("zIndex", "")), u.events.disableBlur(), t.find("input, textarea, button").each(function () {
                this === this.ownerDocument.activeElement && this.blur()
            }), t.find("input, textarea").attr("disabled", "disabled"), h))
                for (var n = 0; n < h.length; n++) d(h[n]).removeClass("fr-btn-active-popup")
        }

        function b(e) {
            for (var t in void 0 === e && (e = []), g) Object.prototype.hasOwnProperty.call(g, t) && e.indexOf(t) < 0 && n(t)
        }

        function t() {
            u.shared.exit_flag = !0
        }

        function L() {
            u.shared.exit_flag = !1
        }

        function l() {
            return u.shared.exit_flag
        }

        function c(e, t) {
            var n, r = function c(e, t) {
                var n = V.POPUP_TEMPLATES[e];
                if (!n) return null;
                for (var r in "function" == typeof n && (n = n.apply(u)), t) Object.prototype.hasOwnProperty.call(t, r) && (n = n.replace("[_".concat(r.toUpperCase(), "_]"), t[r]));
                return n
            }(e, t),
                o = d(u.doc.createElement("DIV"));
            if (!r) return "filesManager.insert" === e ? o.addClass("fr-popup fr-files-manager fr-empty") : o.addClass("fr-popup fr-empty"), (n = d("body").first()).append(o), o.data("container", n), g[e] = o;
            "filesManager.insert" === e ? o.addClass("fr-popup fr-files-manager".concat(u.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(u.opts.toolbarInline ? " fr-inline" : "")) : o.addClass("fr-popup".concat(u.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(u.opts.toolbarInline ? " fr-inline" : "")), o.html(r), u.opts.theme && o.addClass("".concat(u.opts.theme, "-theme")), 1 < u.opts.zIndex && (!u.opts.editInPopup && u.$tb ? u.$tb.css("z-index", u.opts.zIndex + 2) : o.css("z-index", u.opts.zIndex + 2)), "auto" !== u.opts.direction && o.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(u.opts.direction)), o.find("input, textarea").attr("dir", u.opts.direction).attr("disabled", "disabled"), (n = d("body").first()).append(o), o.data("container", n);
            var i = (g[e] = o).find(".fr-color-hex-layer");
            if (0 < i.length) {
                var a = u.helpers.getPX(o.find(".fr-color-set > span").css("width")),
                    s = u.helpers.getPX(i.css("paddingLeft")),
                    l = u.helpers.getPX(i.css("paddingRight"));
                i.css("width", a * u.opts.colorsStep + s + l)
            }
            return u.button.bindCommands(o, !1), o
        }

        function E(r) {
            var o = g[r];
            return {
                _windowResize: function () {
                    var e = o.data("instance") || u;
                    !e.helpers.isMobile() && o.isVisible() && (e.events.disableBlur(), e.popups.hide(r), e.events.enableBlur())
                },
                _inputFocus: function (e) {
                    var t = o.data("instance") || u,
                        n = d(e.currentTarget);
                    if (n.is("input:file") && n.closest(".fr-layer").addClass("fr-input-focus"), e.preventDefault(), e.stopPropagation(), setTimeout(function () {
                        t.events.enableBlur()
                    }, 100), t.helpers.isMobile()) {
                        var r = d(t.o_win).scrollTop();
                        setTimeout(function () {
                            d(t.o_win).scrollTop(r)
                        }, 0)
                    }
                },
                _inputBlur: function (e) {
                    var t = o.data("instance") || u,
                        n = d(e.currentTarget);
                    n.is("input:file") && n.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement !== this && d(this).isVisible() && (t.events.blurActive() && t.events.trigger("blur"), t.events.enableBlur())
                },
                _editorKeydown: function (e) {
                    var t = o.data("instance") || u;
                    t.keys.ctrlKey(e) ||
                        e.which === V.KEYCODE.ALT ||
                        e.which === V.KEYCODE.ESC ||
                        (C(r) && o.findVisible(".fr-back").length
                            ? t.button.exec(o.findVisible(".fr-back").first())
                            : e.which !== V.KEYCODE.ALT && t.popups.hide(r))
                },
                _preventFocus: function (e) {
                    var t = o.data("instance") || u,
                        n = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    "mouseup" === e.type || d(n).is(":focus") || t.events.disableBlur(), "mouseup" !== e.type || d(n).hasClass("fr-command") || 0 < d(n).parents(".fr-command").length || d(n).hasClass("fr-dropdown-content") || u.button.hideActiveDropdowns(o), (u.browser.safari || u.browser.mozilla) && "mousedown" === e.type && d(n).is("input[type=file]") && t.events.disableBlur();
                    var r = "input, textarea, button, select, label, .fr-command";
                    if (n && !d(n).is(r) && 0 === d(n).parents(r).length) return e.stopPropagation(), !1;
                    n && d(n).is(r) && e.stopPropagation(), L()
                },
                _editorMouseup: function () {
                    o.isVisible() && l() && 0 < o.findVisible("input:focus, textarea:focus, button:focus, select:focus").length && u.events.disableBlur()
                },
                _windowMouseup: function (e) {
                    if (!u.core.sameInstance(o)) return !0;
                    var t = o.data("instance") || u;
                    o.isVisible() && l() && (e.stopPropagation(), t.markers.remove(), t.popups.hide(r), L())
                },
                _windowKeydown: function (e) {
                    if (!u.core.sameInstance(o)) return !0;
                    var t = o.data("instance") || u,
                        n = e.which;
                    if (V.KEYCODE.ESC === n) {
                        if (t.popups.isVisible(r) && t.opts.toolbarInline) return e.stopPropagation(), t.popups.isVisible(r) && (o.findVisible(".fr-back").length ? (t.button.exec(o.findVisible(".fr-back").first()), t.accessibility.focusPopupButton(o)) : o.findVisible(".fr-dismiss").length ? t.button.exec(o.findVisible(".fr-dismiss").first()) : (t.popups.hide(r), t.toolbar.showInline(null, !0), t.accessibility.focusPopupButton(o))), !1;
                        if (t.popups.isVisible(r)) return o.findVisible(".fr-back").length ? (t.button.exec(o.findVisible(".fr-back").first), t.accessibility.focusPopupButton(o)) : o.findVisible(".fr-dismiss").length ? t.button.exec(o.findVisible(".fr-dismiss").first()) : (t.popups.hide(r), t.accessibility.focusPopupButton(o)), !1
                    }
                },
                _repositionPopup: function () {
                    if (!u.opts.height && !u.opts.heightMax || u.opts.toolbarInline) return !0;
                    if (u.$wp && C(r) && o.parent().get(0) === u.$sc.get(0)) {
                        var e = o.offset().top - u.$wp.offset().top,
                            t = u.$wp.outerHeight();
                        u.node.hasClass(o.get(0), "fr-above") && (e += o.outerHeight()), t < e || e < 0 ? o.addClass("fr-hidden") : o.removeClass("fr-hidden")
                    }
                }
            }
        }

        function f(e, t) {
            u.events.on("mouseup", e._editorMouseup, !0),
            u.$wp &&
            u.events.on("keydown", e._editorKeydown),
            u.events.on("focus", function () {
                g[t].removeClass("focused")
            }), u.events.on("blur", function () {
                v() && u.markers.remove(), u.helpers.isMobile() ? g[t].hasClass("focused") ? (b(), g[t].removeClass("focused")) : g[t].addClass("focused") : g[t].find("iframe").length || b()
            }), u.$wp && !u.helpers.isMobile() && u.events.$on(u.$wp, "scroll.popup".concat(t), e._repositionPopup), u.events.on("window.mouseup", e._windowMouseup, !0), u.events.on("window.keydown", e._windowKeydown, !0), g[t].data("inst".concat(u.id), !0), u.events.on("destroy", function () {
                u.core.sameInstance(g[t]) && (d("body").first().append(g[t]), g[t].removeClass("fr-active"))
            }, !0)
        }

        function p() {
            var e = d(this).prev().children().first();
            e.attr("checked", !e.attr("checked"))
        }

        function e() {
            for (var e in g)
                if (Object.prototype.hasOwnProperty.call(g, e)) {
                    var t = g[e];
                    t && (t.html("").removeData().remove(), g[e] = null)
                } g = []
        }
        return u.shared.exit_flag = !1, {
            _init: function y() {
                r = window.innerHeight, u.events.on("shared.destroy", e, !0), u.events.on("window.mousedown", t), u.events.on("window.touchmove", L), u.events.$on(d(u.o_win), "scroll", L), u.events.on("mousedown", function (e) {
                    v() && (e.stopPropagation(), u.$el.find(".fr-marker").remove(), t(), u.events.disableBlur())
                })
            },
            create: function S(e, t) {
                var n = c(e, t),
                    r = E(e);
                f(r, e), u.events.$on(n, "mousedown mouseup touchstart touchend touch", "*", r._preventFocus, !0), u.events.$on(n, "focus", "input, textarea, button, select", r._inputFocus, !0), u.events.$on(n, "blur", "input, textarea, button, select", r._inputBlur, !0);
                var o = n.find("input, textarea");
                return function i(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t],
                            r = d(n);
                        0 === r.next().length && r.attr("placeholder") && (r.after('<label for="'.concat(r.attr("id"), '">').concat(r.attr("placeholder"), "</label>")), r.attr("placeholder", ""))
                    }
                }(o), u.events.$on(o, "focus", a), u.events.$on(o, "blur change", s), u.events.$on(n, "click", ".fr-checkbox + label", p), u.accessibility.registerPopup(e), u.helpers.isIOS() && u.events.$on(n, "touchend", "label", function () {
                    d("#".concat(d(this).attr("for"))).prop("checked", function (e, t) {
                        return !t
                    })
                }, !0), u.events.$on(d(u.o_win), "resize", r._windowResize, !0), "filesManager.insert" === e && g["filesManager.insert"].css("zIndex", 2147483641), n
            },
            get: function T(e) {
                var t = g[e];
                return t && !t.data("inst".concat(u.id)) && f(E(e), e), t
            },
            show: function M(e, t, n, r, o) {
                if (C(e) || (v() && 0 < u.$el.find(".fr-marker").length ? (u.events.disableBlur(), u.selection.restore()) : v() || (u.events.disableBlur(), u.events.focus(), u.events.enableBlur())), b([e]), !g[e]) return !1;
                var i = u.button.getButtons(".fr-dropdown.fr-active");
                i.removeClass("fr-active").attr("aria-expanded", !1).parents(".fr-toolbar").css("zIndex", "").find("> .fr-dropdown-wrapper").css("height", ""), i.next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), g[e].data("instance", u), u.$tb && u.$tb.data("instance", u);
                var a = C(e);
                g[e].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                var s = g[e].data("container");
                if (function p(e, t) {
                    t.isVisible() || (t = u.$sc), t.contains([g[e].get(0)]) || t.append(g[e])
                }(e, s), u.opts.toolbarInline && s && u.$tb && s.get(0) === u.$tb.get(0) && (m(e, u.$sc), n = u.$tb.offset().top - u.helpers.getPX(u.$tb.css("margin-top")), t = u.$tb.offset().left + u.$tb.outerWidth() / 2, u.node.hasClass(u.$tb.get(0), "fr-above") && n && (n += u.$tb.outerHeight()), r = 0), s = g[e].data("container"), u.opts.iframe && !r && !a) {
                    var l = u.helpers.getPX(u.$wp.find(".fr-iframe").css("padding-top")),
                        c = u.helpers.getPX(u.$wp.find(".fr-iframe").css("padding-left"));
                    t && (t -= u.$iframe.offset().left + c), n && (n -= u.$iframe.offset().top + l)
                }
                s.is(u.$tb) ? u.$tb.css("zIndex", (u.opts.zIndex || 1) + 4) : g[e].css("zIndex", (u.opts.zIndex || 1) + 3), u.opts.toolbarBottom && s && u.$tb && s.get(0) === u.$tb.get(0) && (g[e].addClass("fr-above"), n && (n -= g[e].outerHeight())), o && (t -= g[e].width() / 2), t + g[e].outerWidth() > u.$sc.offset().left + u.$sc.width() && (t -= t + g[e].outerWidth() - u.$sc.offset().left - u.$sc.width()), t < u.$sc.offset().left && "rtl" === u.opts.direction && (t = u.$sc.offset().left), g[e].removeClass("fr-active"), u.position.at(t, n, g[e], r || 0);
                var d = u.node.blockParent(u.selection.blocks()[0]);
                if (d && "false" === d.getAttribute("contenteditable")) g[e].removeClass("fr-active");
                else {
                    var f = u.selection.element().parentElement.getAttribute("contenteditable");
                    f && "false" === f ? g[e].removeClass("fr-active") : g[e].addClass("fr-active")
                }
                a || u.accessibility.focusPopup(g[e]), u.opts.toolbarInline && u.toolbar.hide(), u.$tb && (h = u.$tb.find(".fr-btn-active-popup")), u.events.trigger("popups.show.".concat(e)), E(e)._repositionPopup(), L()
            },
            hide: n,
            onHide: function N(e, t) {
                u.events.on("popups.hide.".concat(e), t)
            },
            hideAll: b,
            setContainer: m,
            refresh: function A(e) {
                g[e].data("instance", u), u.events.trigger("popups.refresh.".concat(e));
                for (var t = g[e].find(".fr-command"), n = 0; n < t.length; n++) {
                    var r = d(t[n]);
                    0 === r.parents(".fr-dropdown-menu").length && u.button.refresh(r)
                }
            },
            onRefresh: function x(e, t) {
                u.events.on("popups.refresh.".concat(e), t)
            },
            onShow: function O(e, t) {
                u.events.on("popups.show.".concat(e), t)
            },
            isVisible: C,
            setFileListHeight: o,
            areVisible: v,
            setPopupDimensions: function w(e, t) {
                t && e.find(".fr-upload-progress-layer").get(0).clientHeight < i && (e.find(".fr-upload-progress").addClass("fr-height-auto"), u.popups.get("filesManager.insert").addClass("fr-height-auto"), e.find(".fr-upload-progress").removeClass("fr-height-set"), i = 2e3), e.get(0).clientHeight > window.innerHeight / 2 && (window.innerWidth < 500 ? e.get(0).clientHeight > .6 * r && o(e) : 400 < e.get(0).clientHeight && o(e), i = e.find(".fr-upload-progress-layer").get(0).clientHeight);
                var n = window.innerWidth;
                switch (!0) {
                    case n <= 320:
                        e.width(200);
                        break;
                    case n <= 420:
                        e.width(250);
                        break;
                    case n <= 520:
                        e.width(300);
                        break;
                    case n <= 720:
                        e.width(400);
                        break;
                    case 720 < n:
                        e.width(530)
                }
            }
        }
    },
    /////////////////////////
    // ACCESSIBILITY MODULE
    /////////////////////////
    V.MODULES.accessibility = function (f) {
        var p = f.$,
            i = !0;

        function l(t) {
            for (var e = f.$el.find('[contenteditable="true"]'), n = !1, r = 0; e.get(r);) p(e.get(r)).is(":focus") && (n = !0), r++;
            t && t.length && !n && (t.data("blur-event-set") || t.parents(".fr-popup").length || (f.events.$on(t, "blur", function () {
                var e = t.parents(".fr-toolbar, .fr-popup").data("instance") || f;
                e.events.blurActive() && !f.core.hasFocus() && e.events.trigger("blur"), setTimeout(function () {
                    e.events.enableBlur()
                }, 100)
            }, !0), t.data("blur-event-set", !0)), (t.parents(".fr-toolbar, .fr-popup").data("instance") || f).events.disableBlur(), t.get(0).focus(), f.shared.$f_el = t)
        }

        function u(e, t) {
            var n = t ? "last" : "first",
                r = s(g(e))[n]();
            if (r.length) return l(r), !0
        }

        function a(e) {
            return e.is("input, textarea, select") && t(), f.events.disableBlur(), e.get(0).focus(), !0
        }

        function h(e, t) {
            var n = e.find("input, textarea, button, select").filter(function () {
                return p(this).isVisible()
            }).not(":disabled");
            if ((n = t ? n.last() : n.first()).length) return a(n);
            if (f.shared.with_kb) {
                var r = e.findVisible(".fr-active-item").first();
                if (r.length) return a(r);
                var o = e.findVisible("[tabIndex]").first();
                if (o.length) return a(o)
            }
        }

        function t() {
            0 === f.$el.find(".fr-marker").length && f.core.hasFocus() && f.selection.save()
        }

        function c() {
            var e = f.popups.areVisible();
            if (e) {
                var t = e.find(".fr-buttons");
                return t.find("button:focus, .fr-group span:focus").length ? !u(e.data("instance").$tb) : !u(t)
            }
            return !u(f.$tb)
        }

        function d() {
            var e = null;
            return f.shared.$f_el.is(".fr-dropdown.fr-active") ? e = f.shared.$f_el : f.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e = f.shared.$f_el.closest(".fr-dropdown-menu").prev()), e
        }

        function s(e) {
            for (var t = -1, n = 0; n < e.length; n++) p(e[n]).hasClass("fr-open") && (t = n);
            var r = e.index(f.$tb.find(".fr-more-toolbar.fr-expanded > button.fr-command").first());
            if (0 < r && -1 !== t) {
                var o = e.slice(r, e.length),
                    i = (e = e.slice(0, r)).slice(0, t + 1),
                    a = e.slice(t + 1, e.length);
                e = i;
                for (var s = 0; s < o.length; s++) e.push(o[s]);
                for (var l = 0; l < a.length; l++) e.push(a[l])
            }
            return e
        }

        function g(e) {
            return e.findVisible("button:not(.fr-disabled), .fr-group span.fr-command").filter(function (e) {
                var t = p(e).parents(".fr-more-toolbar");
                return 0 === t.length || 0 < t.length && t.hasClass("fr-expanded")
            })
        }

        function n(e, t, n) {
            if (f.shared.$f_el) {
                var r = d();
                r && (f.button.click(r), f.shared.$f_el = r);
                var o = s(g(e)),
                    i = o.index(f.shared.$f_el);
                if (0 === i && !n || i === o.length - 1 && n) {
                    var a;
                    if (t) {
                        if (e.parent().is(".fr-popup")) a = !h(e.parent().children().not(".fr-buttons"), !n);
                        !1 === a && (f.shared.$f_el = null)
                    }
                    t && !1 === a || u(e, !n)
                } else l(p(o.get(i + (n ? 1 : -1))));
                return !1
            }
        }

        function m(e, t) {
            return n(e, t, !0)
        }

        function C(e, t) {
            return n(e, t)
        }

        function v(e) {
            if (f.shared.$f_el) {
                var t;
                if (f.shared.$f_el.is(".fr-dropdown.fr-active")) return l(t = e ? f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), !1;
                if (f.shared.$f_el.is("a.fr-command")) return (t = e ? f.shared.$f_el.closest("li").nextAllVisible().first().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest("li").prevAllVisible().first().find(".fr-command:not(.fr-disabled)").first()).length || (t = e ? f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), l(t), !1
            }
        }

        function b() {
            if (f.shared.$f_el) {
                if (f.shared.$f_el.hasClass("fr-dropdown")) f.button.click(f.shared.$f_el);
                else if (f.shared.$f_el.is("button.fr-back")) {
                    f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus());
                    var e = f.popups.areVisible(f);
                    e && (f.shared.with_kb = !1), f.button.click(f.shared.$f_el), E(e)
                } else {
                    if (f.events.disableBlur(), f.button.click(f.shared.$f_el), f.shared.$f_el.attr("data-group-name")) {
                        var t = f.$tb.find('.fr-more-toolbar[data-name="'.concat(f.shared.$f_el.attr("data-group-name"), '"]')),
                            n = f.shared.$f_el;
                        t.hasClass("fr-expanded") && (n = t.findVisible("button:not(.fr-disabled)").first()), n && l(n)
                    } else if (f.shared.$f_el.attr("data-popup")) {
                        var r = f.popups.areVisible(f);
                        r && r.data("popup-button", f.shared.$f_el)
                    } else if (f.shared.$f_el.attr("data-modal")) {
                        var o = f.modals.areVisible(f);
                        o && o.data("modal-button", f.shared.$f_el)
                    }
                    f.shared.$f_el = null
                }
                return !1
            }
        }

        function L() {
            f.shared.$f_el && (f.events.disableBlur(), f.shared.$f_el.blur(), f.shared.$f_el = null), !1 !== f.events.trigger("toolbar.focusEditor") && (f.events.disableBlur(), f.$el.get(0).focus(), f.events.focus())
        }

        function o(r) {
            r && r.length && (f.events.$on(r, "keydown", function (e) {
                if (!p(e.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                f.shared.with_kb = !0;
                var n = t.accessibility.exec(e, r);
                return f.shared.with_kb = !1, n
            }, !0), f.events.$on(r, "mouseenter", "[tabIndex]", function (e) {
                var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                if (!i) return e.stopPropagation(), void e.preventDefault();
                var n = p(e.currentTarget);
                t.shared.$f_el && t.shared.$f_el.not(n) && t.accessibility.focusEditor()
            }, !0), f.$tb && f.events.$on(f.$tb, "transitionend", ".fr-more-toolbar", function () {
                f.shared.$f_el = p(document.activeElement)
            }))
        }

        function E(e) {
            var t = e.data("popup-button");
            t && setTimeout(function () {
                l(t), e.data("popup-button", null)
            }, 0)
        }

        function y(e) {
            var t = f.popups.areVisible(e);
            t && t.data("popup-button", null)
        }

        function e(e) {
            var t = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
            if (e.which !== V.KEYCODE.F10 || t || e.shiftKey || !e.altKey) return !0;
            f.shared.with_kb = !0;
            var n = f.popups.areVisible(f),
                r = !1;
            return n && (r = h(n.children().not(".fr-buttons"))), r || c(), f.shared.with_kb = !1, e.preventDefault(), e.stopPropagation(), !1
        }
        return {
            _init: function r() {
                f.$wp
                    ? f.events.on("keydown", e, !0)
                    : f.events.$on(f.$win, "keydown", e, !0),

                f.events.on("mousedown", function (e) {
                    y(f), f.shared.$f_el && f.el.isSameNode(f.shared.$f_el[0]) && (f.accessibility.restoreSelection(), e.stopPropagation(), f.events.disableBlur(), f.shared.$f_el = null)
                }, !0), f.events.on("blur", function () {
                    f.shared.$f_el = null, y(f)
                }, !0)
            },
            registerPopup: function S(e) {
                var t = f.popups.get(e),
                    n = function r(c) {
                        var d = f.popups.get(c);
                        return {
                            _tiKeydown: function (e) {
                                var t = d.data("instance") || f;
                                if (!1 === t.events.trigger("popup.tab", [e])) return !1;
                                var n = e.which,
                                    r = d.find(":focus").first();
                                if (V.KEYCODE.TAB === n) {
                                    e.preventDefault();
                                    var o = d.children().not(".fr-buttons"),
                                        i = o.findVisible("input, textarea, button, select").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                                        a = i.indexOf(this) + (e.shiftKey ? -1 : 1);
                                    if (0 <= a && a < i.length) return t.events.disableBlur(), p(i[a]).focus(), e.stopPropagation(), !1;
                                    var s = d.find(".fr-buttons");
                                    if (s.length && u(s, Boolean(e.shiftKey))) return e.stopPropagation(), !1;
                                    if (h(o)) return e.stopPropagation(), !1
                                } else {
                                    if (V.KEYCODE.ENTER !== n || !e.target || "TEXTAREA" === e.target.tagName) return V.KEYCODE.ESC === n ? (e.preventDefault(), e.stopPropagation(), t.accessibility.restoreSelection(), t.popups.isVisible(c) && d.findVisible(".fr-back").length ? (t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus()), t.button.exec(d.findVisible(".fr-back").first()), E(d)) : t.popups.isVisible(c) && d.findVisible(".fr-dismiss").length ? t.button.exec(d.findVisible(".fr-dismiss").first()) : (t.popups.hide(c), t.opts.toolbarInline && t.toolbar.showInline(null, !0), E(d)), !1) : V.KEYCODE.SPACE === n && (r.is(".fr-submit") || r.is(".fr-dismiss")) ? (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(r), !0) : t.keys.isBrowserAction(e) ? void e.stopPropagation() : r.is("input[type=text], textarea") ? void e.stopPropagation() : V.KEYCODE.SPACE === n && (r.is(".fr-link-attr") || r.is("input[type=file]")) ? void e.stopPropagation() : (e.stopPropagation(), e.preventDefault(), !1);
                                    var l = null;
                                    0 < d.findVisible(".fr-submit").length ? l = d.findVisible(".fr-submit").first() : d.findVisible(".fr-dismiss").length && (l = d.findVisible(".fr-dismiss").first()), l && (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(l))
                                }
                            },
                            _tiMouseenter: function () {
                                var e = d.data("instance") || f;
                                y(e)
                            }
                        }
                    }(e);
                o(t.find(".fr-buttons")), f.events.$on(t, "mouseenter", "tabIndex", n._tiMouseenter, !0), f.events.$on(t.children().not(".fr-buttons"), "keydown", "[tabIndex]", n._tiKeydown, !0), f.popups.onHide(e, function () {
                    (t.data("instance") || f).accessibility.restoreSelection()
                }), f.popups.onShow(e, function () {
                    i = !1, setTimeout(function () {
                        i = !0
                    }, 0)
                })
            },
            registerToolbar: o,
            focusToolbarElement: l,
            focusToolbar: u,
            focusContent: h,
            focusPopup: function T(r) {
                var o = r.children().not(".fr-buttons");
                o.data("mouseenter-event-set") || (f.events.$on(o, "mouseenter", "[tabIndex]", function (e) {
                    var t = r.data("instance") || f;
                    if (!i) return e.stopPropagation(), void e.preventDefault();
                    var n = o.find(":focus").first();
                    n.length && !n.is("input, button, textarea, select") && (t.events.disableBlur(), n.blur(), t.events.disableBlur(), t.events.focus())
                }), o.data("mouseenter-event-set", !0)), !h(o) && f.shared.with_kb && u(r.find(".fr-buttons"))
            },
            focusModal: function M(e) {
                f.core.hasFocus() || (f.events.disableBlur(), f.events.focus()), f.accessibility.saveSelection(), f.events.disableBlur(), f.el.blur(), f.selection.clear(), f.events.disableBlur(), f.shared.with_kb ? e.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e.find("[tabIndex]").first().focus()
            },
            focusEditor: L,
            focusPopupButton: E,
            focusModalButton: function N(e) {
                var t = e.data("modal-button");
                t && setTimeout(function () {
                    l(t), e.data("modal-button", null)
                }, 0)
            },
            hasFocus: function A() {
                return null !== f.shared.$f_el
            },
            exec: function x(e, t) {
                var n = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                    r = e.which,
                    o = !1;
                return r !== V.KEYCODE.TAB || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_RIGHT || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.TAB || n || !e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_LEFT || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_UP || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_DOWN || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ENTER && r !== V.KEYCODE.SPACE || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ESC || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.F10 || n || e.shiftKey || !e.altKey || (o = c()) : o = function i(e) {
                    if (f.shared.$f_el) {
                        var t = d();
                        return t ? (f.button.click(t), l(t)) : e.parent().findVisible(".fr-back").length ? (f.shared.with_kb = !1, f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus()), f.button.exec(e.parent().findVisible(".fr-back")).first(), E(e.parent())) : f.shared.$f_el.is("button, .fr-group span") && (e.parent().is(".fr-popup") ? (f.accessibility.restoreSelection(), f.shared.$f_el = null, !1 !== f.events.trigger("toolbar.esc") && (f.popups.hide(e.parent()), f.opts.toolbarInline && f.toolbar.showInline(null, !0), E(e.parent()))) : L()), !1
                    }
                }(t) : o = b() : o = function a() {
                    return f.shared.$f_el && f.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? b() : v(!0)
                }() : o = function s() {
                    return v()
                }() : o = C(t) : o = C(t, !0) : o = m(t) : o = m(t, !0), f.shared.$f_el || void 0 !== o || (o = !0), !o && f.keys.isBrowserAction(e) && (o = !0), !!o || (e.preventDefault(), e.stopPropagation(), !1)
            },
            saveSelection: t,
            restoreSelection: function O() {
                f.$el.find(".fr-marker").length && (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur())
            }
        }
    },
    ///////////////////
    // TOOLTIP MODULE
    ///////////////////
    Object.assign(V.DEFAULTS, {
        tooltips: !0
    }),
    V.MODULES.tooltip = function (i) {
        var a = i.$;

        function r() {
            i.helpers.isMobile() || i.$tooltip && i.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed")
        }

        function o(e, t) {
            if (!i.helpers.isMobile() && (e.data("title") || e.data("title", e.attr("title")), e.data("title"))) {
                i.$tooltip || function o() {
                    i.opts.tooltips && !i.helpers.isMobile() && (i.shared.$tooltip ? i.$tooltip = i.shared.$tooltip : (i.shared.$tooltip = a(i.doc.createElement("DIV")).addClass("fr-tooltip"), i.$tooltip = i.shared.$tooltip, i.opts.theme && i.$tooltip.addClass("".concat(i.opts.theme, "-theme")), a(i.o_doc).find("body").first().append(i.$tooltip)), i.events.on("shared.destroy", function () {
                        i.$tooltip.html("").removeData().remove(), i.$tooltip = null
                    }, !0))
                }(), e.removeAttr("title"), i.$tooltip.text(i.language.translate(e.data("title"))), i.$tooltip.addClass("fr-visible");
                var n = e.offset().left + (e.outerWidth() - i.$tooltip.outerWidth()) / 2;
                n < 0 && (n = 0), n + i.$tooltip.outerWidth() > a(i.o_win).width() && (n = a(i.o_win).width() - i.$tooltip.outerWidth()), void 0 === t && (t = i.opts.toolbarBottom), e.offset().top - a(window).scrollTop() + e.outerHeight() + 10 >= a(window).height() && (t = !0);
                var r = t ? e.offset().top - i.$tooltip.height() : e.offset().top + e.outerHeight();
                i.$tooltip.css("position", ""), i.$tooltip.css("left", n), i.$tooltip.css("top", Math.ceil(r)), "static" !== a(i.o_doc).find("body").first().css("position") ? (i.$tooltip.css("margin-left", -a(i.o_doc).find("body").first().offset().left), i.$tooltip.css("margin-top", -a(i.o_doc).find("body").first().offset().top)) : (i.$tooltip.css("margin-left", ""), i.$tooltip.css("margin-top", ""))
            }
        }
        return {
            hide: r,
            to: o,
            bind: function s(e, t, n) {
                i.opts.tooltips && !i.helpers.isMobile() && (i.events.$on(e, "mouseover", t, function (e) {
                    i.node.hasClass(e.currentTarget, "fr-disabled") || i.edit.isDisabled() || o(a(e.currentTarget), n)
                }, !0), i.events.$on(e, "mouseout ".concat(i._mousedown, " ").concat(i._mouseup), t, function () {
                    r()
                }, !0))
            }
        }
    },
    /////////////////
    // BUTTON MODULE
    /////////////////
    V.TOOLBAR_VISIBLE_BUTTONS = 3,
    V.MODULES.button = function (g) {
        var h = g.$,
            a = [];
        (g.opts.toolbarInline || g.opts.toolbarContainer) && (g.shared.buttons || (g.shared.buttons = []), a = g.shared.buttons);
        var s = [];

        function l(e, t, n) {
            for (var r = h(), o = 0; o < e.length; o++) {
                var i = h(e[o]);
                if (i.is(t) && (r = r.add(i)), n && i.is(".fr-dropdown")) {
                    var a = i.next().find(t);
                    r = r.add(a)
                }
            }
            return r
        }

        function m(e, t) {
            var n, r = h();
            if (!e) return r;
            for (n in r = (r = r.add(l(a, e, t))).add(l(s, e, t)), g.shared.popups)
                if (Object.prototype.hasOwnProperty.call(g.shared.popups, n)) {
                    var o = g.shared.popups[n].children().find(e);
                    r = r.add(o)
                } for (n in g.shared.modals)
                if (Object.prototype.hasOwnProperty.call(g.shared.modals, n)) {
                    var i = g.shared.modals[n].$modal.find(e);
                    r = r.add(i)
                } return r
        }

        function o(e) {
            var t = e.next(),
                n = g.node.hasClass(e.get(0), "fr-active"),
                r = m(".fr-dropdown.fr-active").not(e),
                o = e.parents(".fr-toolbar, .fr-popup").data("instance") || g;
            o.helpers.isIOS() && !o.el.querySelector(".fr-marker") && (o.selection.save(), o.selection.clear(), o.selection.restore()), t.parents(".fr-more-toolbar").addClass("fr-overflow-visible");
            var i = 0,
                a = 0,
                s = t.find("> .fr-dropdown-wrapper");
            if (!n) {
                var l = e.data("cmd");
                t.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), V.COMMANDS[l] && V.COMMANDS[l].refreshOnShow && V.COMMANDS[l].refreshOnShow.apply(o, [e, t]), t.css("left", e.offset().left - e.parents(".fr-btn-wrap, .fr-toolbar, .fr-buttons").offset().left - ("rtl" === g.opts.direction ? t.width() - e.outerWidth() : 0)), t.addClass("test-height"), i = t.outerHeight(), a = g.helpers.getPX(s.css("max-height")), t.removeClass("test-height"), t.css("top", "").css("bottom", "");
                var c = e.outerHeight() / 10;
                if (!g.opts.toolbarBottom && t.offset().top + e.outerHeight() + i < h(g.o_doc).height()) t.css("top", e.position().top + e.outerHeight() - c);
                else {
                    var d = 0,
                        f = e.parents(".fr-more-toolbar");
                    0 < f.length && (d = f.first().height()), t.css("bottom", e.parents(".fr-popup, .fr-toolbar").first().height() - d - e.position().top)
                }
            } (e.addClass("fr-blink").toggleClass("fr-active"), e.hasClass("fr-options")) && e.prev().toggleClass("fr-expanded");
            e.hasClass("fr-active") ? (t.attr("aria-hidden", !1), e.attr("aria-expanded", !0), function u(e, t, n) {
                n <= t && e.parent().css("overflow", "auto"), e.css("height", Math.min(t, n))
            }(s, i, a)) : (t.attr("aria-hidden", !0).css("overflow", ""), e.attr("aria-expanded", !1), s.css("height", "")), setTimeout(function () {
                e.removeClass("fr-blink")
            }, 300), t.css("margin-left", ""), t.offset().left + t.outerWidth() > g.$sc.offset().left + g.$sc.width() && t.css("margin-left", -(t.offset().left + t.outerWidth() - g.$sc.offset().left - g.$sc.width())), t.offset().left < g.$sc.offset().left && "rtl" === g.opts.direction && t.css("margin-left", g.$sc.offset().left), r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== e.parents(".fr-popup").length || g.opts.toolbarInline || (g.node.hasClass(e.get(0), "fr-active") ? g.$tb.css("zIndex", (g.opts.zIndex || 1) + 4) : g.$tb.css("zIndex", ""));
            var p = t.find("a.fr-command.fr-active").first();
            g.helpers.isMobile() || (p.length ? (g.accessibility.focusToolbarElement(p), s.scrollTop(Math.abs(p.parents(".fr-dropdown-content").offset().top - p.offset().top) - p.offset().top)) : (g.accessibility.focusToolbarElement(e), s.scrollTop(0)))
        }

        function i(e) {
            e.addClass("fr-blink"), setTimeout(function () {
                e.removeClass("fr-blink")
            }, 500);
            for (var t = e.data("cmd"), n = []; void 0 !== e.data("param".concat(n.length + 1));) n.push(e.data("param".concat(n.length + 1)));
            var r = m(".fr-dropdown.fr-active");
            r.length && (r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t, n)
        }

        function t(e) {
            var t = e.parents(".fr-popup, .fr-toolbar").data("instance");
            if (0 === e.parents(".fr-popup").length && e.data("popup") && !e.hasClass("fr-btn-active-popup") && e.addClass("fr-btn-active-popup"), 0 !== e.parents(".fr-popup").length || e.data("popup") || t.popups.hideAll(), t.popups.areVisible() && !t.popups.areVisible(t)) {
                for (var n = 0; n < V.INSTANCES.length; n++) V.INSTANCES[n] !== t && V.INSTANCES[n].popups && V.INSTANCES[n].popups.areVisible() && V.INSTANCES[n].$el.find(".fr-marker").remove();
                t.popups.hideAll()
            }
            g.node.hasClass(e.get(0), "fr-dropdown") ? o(e) : (! function r(e) {
                i(e)
            }(e), V.COMMANDS[e.data("cmd")] && !1 !== V.COMMANDS[e.data("cmd")].refreshAfterCallback && t.button.bulkRefresh())
        }

        function c(e) {
            t(h(e.currentTarget))
        }

        function d(e) {
            var t = e.find(".fr-dropdown.fr-active");
            t.length && (t.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), t.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), t.prev().removeClass("fr-expanded"))
        }

        function f(e) {
            e.preventDefault(), e.stopPropagation()
        }

        function p(e) {
            if (e.stopPropagation(), !g.helpers.isMobile()) return !1
        }

        function C(e) {
            var t = 1 < arguments.length && arguments[1] !== undefined ? arguments[1] : {},
                n = 2 < arguments.length ? arguments[2] : undefined;
            if (g.helpers.isMobile() && !1 === t.showOnMobile) return "";
            var r = t.displaySelection;
            "function" == typeof r && (r = r(g));
            var o = "";
            if ("options" !== t.type)
                if (r) {
                    var i = "function" == typeof t.defaultSelection ? t.defaultSelection(g) : t.defaultSelection;
                    o = '<span style="width:'.concat(t.displaySelectionWidth || 100, 'px">').concat(g.language.translate(i || t.title), "</span>")
                } else o = g.icon.create(t.icon || e), o += '<span class="fr-sr-only">'.concat(g.language.translate(t.title) || "", "</span>");
            var a = t.popup ? ' data-popup="true"' : "",
                s = t.modal ? ' data-modal="true"' : "",
                l = g.shortcuts.get("".concat(e, "."));
            l = l ? " (".concat(l, ")") : "";
            var c = "".concat(e, "-").concat(g.id),
                d = "dropdown-menu-".concat(c),
                f = '<button id="'.concat(c, '"').concat(t.more_btn ? ' data-group-name="'.concat(c, '" ') : "", 'type="button" tabIndex="-1" role="button"').concat(t.toggle ? ' aria-pressed="false"' : "").concat("dropdown" === t.type || "options" === t.type ? ' aria-controls="'.concat(d, '" aria-expanded="false" aria-haspopup="true"') : "").concat(t.disabled ? ' aria-disabled="true"' : "", ' title="').concat(g.language.translate(t.title) || "").concat(l, '" class="fr-command fr-btn').concat("dropdown" === t.type || "options" == t.type ? " fr-dropdown" : "").concat("options" == t.type ? " fr-options" : "").concat("more" == t.type ? " fr-more" : "").concat(t.displaySelection ? " fr-selection" : "").concat(t.back ? " fr-back" : "").concat(t.disabled ? " fr-disabled" : "").concat(n ? "" : " fr-hidden", '" data-cmd="').concat(e, '"').concat(a).concat(s, ">").concat(o, "</button>");
            if ("dropdown" === t.type || "options" === t.type) {
                var p = '<div id="'.concat(d, '" class="fr-dropdown-menu" role="listbox" aria-labelledby="').concat(c, '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">');
                p += function u(e, t) {
                    var n = "";
                    if (t.html) "function" == typeof t.html ? n += t.html.call(g) : n += t.html;
                    else {
                        var r = t.options;
                        for (var o in "function" == typeof r && (r = r()), n += '<ul class="fr-dropdown-list" role="presentation">', r)
                            if (Object.prototype.hasOwnProperty.call(r, o)) {
                                var i = g.shortcuts.get("".concat(e, ".").concat(o));
                                i = i ? '<span class="fr-shortcut">'.concat(i, "</span>") : "", n += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="'.concat("options" === t.type ? e.replace(/Options/g, "") : e, '" data-param1="').concat(o, '" title="').concat(r[o], '">').concat(g.language.translate(r[o]), "</a></li>")
                            } n += "</ul>"
                    }
                    return n
                }(e, t), f += p += "</div></div></div>"
            }
            return t.hasOptions && t.hasOptions.apply(g) && (f = '<div class="fr-btn-wrap">'.concat(f, " ").concat(C(e + "Options", Object.assign({}, t, {
                type: "options",
                hasOptions: !1
            }), n), "  </div>")), f
        }

        function e(o) {
            var i = g.$tb && g.$tb.data("instance") || g;
            if (!1 === g.events.trigger("buttons.refresh")) return !0;
            setTimeout(function () {
                for (var e = i.selection.inEditor() && i.core.hasFocus(), t = 0; t < o.length; t++) {
                    var n = h(o[t]),
                        r = n.data("cmd");
                    0 === n.parents(".fr-popup").length ? e || V.COMMANDS[r] && V.COMMANDS[r].forcedRefresh ? i.button.refresh(n) : g.node.hasClass(n.get(0), "fr-dropdown") || (n.removeClass("fr-active"), n.attr("aria-pressed") && n.attr("aria-pressed", !1)) : n.parents(".fr-popup").isVisible() && i.button.refresh(n)
                }
            }, 0)
        }

        function n() {
            e(a), e(s)
        }

        function r() {
            a = [], s = []
        }
        g.shared.popup_buttons || (g.shared.popup_buttons = []), s = g.shared.popup_buttons;
        var u = null;

        function v() {
            clearTimeout(u), u = setTimeout(n, 50)
        }
        return {
            _init: function b() {
                g.opts.toolbarInline ? g.events.on("toolbar.show", n) : (g.events.on("mouseup", v), g.events.on("keyup", v), g.events.on("blur", v), g.events.on("focus", v), g.events.on("contentChanged", v), g.helpers.isMobile() && g.events.$on(g.$doc, "selectionchange", n)), g.events.on("shared.destroy", r)
            },
            build: C,
            buildList: function L(e, t) {
                for (var n = "", r = 0; r < e.length; r++) {
                    var o = e[r],
                        i = V.COMMANDS[o];
                    i && "undefined" != typeof i.plugin && g.opts.pluginsEnabled.indexOf(i.plugin) < 0 || (i ? n += C(o, i, void 0 === t || 0 <= t.indexOf(o)) : "|" === o ? n += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" === o && (n += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'))
                }
                return n
            },
            buildGroup: function E(e) {
                var t = "",
                    n = "";
                for (var r in e) {
                    var o = e[r];
                    if (o.buttons) {
                        for (var i = "", a = "", s = 0, l = "left", c = V.TOOLBAR_VISIBLE_BUTTONS, d = 0; d < o.buttons.length; d++) {
                            var f = o.buttons[d],
                                p = V.COMMANDS[f];
                            p || ("|" == f ? i += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == f && (i += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')), !p || p && "undefined" != typeof p.plugin && g.opts.pluginsEnabled.indexOf(p.plugin) < 0 || (e[r].align !== undefined && (l = e[r].align), e[r].buttonsVisible !== undefined && (c = e[r].buttonsVisible), e.showMoreButtons && c <= s ? a += C(f, p, !0) : i += C(f, p, !0), s++)
                        }
                        if (e.showMoreButtons && c < s) {
                            var u = r,
                                h = V.COMMANDS[u];
                            h.more_btn = !0, i += C(u, h, !0)
                        }
                        t += '<div class="fr-btn-grp fr-float-'.concat(l, '">').concat(i, "</div>"), e.showMoreButtons && 0 < a.length && (n += '<div class="fr-more-toolbar" data-name="'.concat(r + "-" + g.id, '">').concat(a, "</div>"))
                    }
                }
                return g.opts.toolbarBottom ? "".concat(n, '<div class="fr-newline"></div>').concat(t) : "".concat(t, '<div class="fr-newline"></div>').concat(n)
            },
            bindCommands: function y(t, e) {
                g.events.bindClick(t, ".fr-command:not(.fr-disabled)", c), g.events.$on(t, "".concat(g._mousedown, " ").concat(g._mouseup, " ").concat(g._move), ".fr-dropdown-menu", f, !0), g.events.$on(t, "".concat(g._mousedown, " ").concat(g._mouseup, " ").concat(g._move), ".fr-dropdown-menu .fr-dropdown-wrapper", p, !0);
                var n = t.get(0).ownerDocument,
                    r = "defaultView" in n ? n.defaultView : n.parentWindow;

                function o(e) {
                    (!e || e.type === g._mouseup && e.target !== h("html").get(0) || "keydown" === e.type && (g.keys.isCharacter(e.which) && !g.keys.ctrlKey(e) || e.which === V.KEYCODE.ESC)) && d(t)
                }
                g.events.$on(h(r), "".concat(g._mouseup, " resize keydown"), o, !0), g.opts.iframe && g.events.$on(g.$win, g._mouseup, o, !0), g.node.hasClass(t.get(0), "fr-popup") ? h.merge(s, t.find(".fr-btn").toArray()) : h.merge(a, t.find(".fr-btn").toArray()), g.tooltip.bind(t, ".fr-btn, .fr-title", e)
            },
            refresh: function S(e) {
                var t, n = e.parents(".fr-popup, .fr-toolbar").data("instance") || g,
                    r = e.data("cmd");
                g.node.hasClass(e.get(0), "fr-dropdown") ? t = e.next() : (e.removeClass("fr-active"), e.attr("aria-pressed") && e.attr("aria-pressed", !1)), V.COMMANDS[r] && V.COMMANDS[r].refresh ? V.COMMANDS[r].refresh.apply(n, [e, t]) : g.refresh[r] && n.refresh[r](e, t)
            },
            bulkRefresh: n,
            exec: i,
            click: t,
            hideActiveDropdowns: d,
            addButtons: function T(e) {
                for (var t = 0; t < e.length; t++) a.push(e)
            },
            getButtons: m,
            getPosition: function M(e) {
                var t = e.offset().left,
                    n = g.opts.toolbarBottom ? 10 : e.outerHeight() - 10;
                return {
                    left: t,
                    top: e.offset().top + n
                }
            }
        }
    },
    /////////
    // ICONS
    /////////
    V.ICON_TEMPLATES = {
        font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
        font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5b: '<i class="fab fa-[FA5NAME]" aria-hidden="true"></i>',
        text: '<span style="text-align: center;">[NAME]</span>',
        image: "<img src=[SRC] alt=[ALT] />",
        svg: '<svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="[PATH]"/></svg>',
        empty: " "
    }, V.ICONS = {
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
    },
    V.DefineIconTemplate = function (e, t) {
        V.ICON_TEMPLATES[e] = t
    },
    V.DefineIcon = function (e, t) {
        V.ICONS[e] = t
    },
    Object.assign(V.DEFAULTS, {
        iconsTemplate: "svg"
    }),
    V.MODULES.icon = function (o) {
        return {
            create: function i(n) {
                var e = null,
                    r = V.ICONS[n];
                if (void 0 !== r) {
                    var t = r.template || V.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate;
                    t && t.apply && (t = t.apply(o)), r.FA5NAME || (r.FA5NAME = r.NAME), "svg" !== t || r.PATH || (r.PATH = V.SVG[r.SVG_KEY] || ""), t && (t = V.ICON_TEMPLATES[t]) && (e = t.replace(/\[([a-zA-Z0-9]*)\]/g, function (e, t) {
                        return "NAME" === t ? r[t] || n : r[t]
                    }))
                }
                return e || n
            },
            getTemplate: function r(e) {
                var t = V.ICONS[e],
                    n = o.opts.iconsTemplate;
                return void 0 !== t ? n = t.template || V.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate : n
            },
            getFileIcon: function n(e) {
                var t = V.FILEICONS[e];
                return void 0 !== t ? t : e
            }
        }
    }, V.SVG = {
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
    },
    V.FILEICONS = {
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
    },
    ///////////////////
    // MODALS MODULE
    ///////////////////
    V.MODULES.modals = function (l) {
        var a = l.$;
        l.shared.modals || (l.shared.modals = {});
        var o, c = l.shared.modals;

        function e() {
            for (var e in c)
                if (Object.prototype.hasOwnProperty.call(c, e)) {
                    var t = c[e];
                    t && t.$modal && t.$modal.removeData().remove()
                } o && o.removeData().remove(), c = {}
        }

        function s(e, t) {
            if (c[e]) {
                var n = c[e].$modal,
                    r = n.data("instance") || l;
                r.events.enableBlur(), n.hide(), o.hide(), a(r.o_doc).find("body").first().removeClass("fr-prevent-scroll fr-mobile"), n.removeClass("fr-active"), t || (r.accessibility.restoreSelection(), r.events.trigger("modals.hide"))
            }
        }

        function n(e) {
            var t;
            if ("string" == typeof e) {
                if (!c[e]) return;
                t = c[e].$modal
            } else t = e;
            return t && l.node.hasClass(t, "fr-active") && l.core.sameInstance(t) || !1
        }
        return {
            _init: function t() {
                l.events.on("shared.destroy", e, !0)
            },
            get: function r(e) {
                return c[e]
            },
            create: function d(n, e, t) {
                if (e = '<div class="fr-modal-head-line">'.concat(e, "</div>"), l.shared.$overlay || (l.shared.$overlay = a(l.doc.createElement("DIV")).addClass("fr-overlay"), a("body").first().append(l.shared.$overlay)), o = l.shared.$overlay, l.opts.theme && o.addClass("".concat(l.opts.theme, "-theme")), !c[n]) {
                    var r = function i(e, t) {
                        var n = '<div tabIndex="-1" class="fr-modal'.concat(l.opts.theme ? " ".concat(l.opts.theme, "-theme") : "", '"><div class="fr-modal-wrapper">'),
                            r = '<button title="'.concat(l.language.translate("Cancel"), '" class="fr-command fr-btn fr-modal-close"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="').concat(V.SVG.close, '"/></svg></button>');
                        n += '<div class="fr-modal-head">'.concat(e).concat(r, "</div>"), n += '<div tabIndex="-1" class="fr-modal-body">'.concat(t, "</div>"), n += "</div></div>";
                        var o = a(l.doc.createElement("DIV"));
                        return o.html(n), o.find("> .fr-modal")
                    }(e, t);
                    c[n] = {
                        $modal: r,
                        $head: r.find(".fr-modal-head"),
                        $body: r.find(".fr-modal-body")
                    }, l.helpers.isMobile() || r.addClass("fr-desktop"), a("body").first().append(r), l.events.$on(r, "click", ".fr-modal-close", function () {
                        s(n)
                    }, !0), c[n].$body.css("margin-top", c[n].$head.outerHeight()), l.events.$on(r, "keydown", function (e) {
                        var t = e.which;
                        return t === V.KEYCODE.ESC ? (s(n), l.accessibility.focusModalButton(r), !1) : !(!a(e.currentTarget).is("input[type=text], textarea") && t !== V.KEYCODE.ARROW_UP && t !== V.KEYCODE.ARROW_DOWN && !l.keys.isBrowserAction(e) && (e.preventDefault(), e.stopPropagation(), 1))
                    }, !0), s(n, !0)
                }
                return c[n]
            },
            show: function i(e) {
                if (c[e]) {
                    var t = c[e].$modal;
                    t.data("instance", l), t.show(), o.show(), a(l.o_doc).find("body").first().addClass("fr-prevent-scroll"), l.helpers.isMobile() && a(l.o_doc).find("body").first().addClass("fr-mobile"), t.addClass("fr-active"), l.accessibility.focusModal(t)
                }
            },
            hide: s,
            resize: function f(e) {
                if (c[e]) {
                    var t = c[e],
                        n = t.$modal,
                        r = t.$body,
                        o = l.o_win.innerHeight,
                        i = n.find(".fr-modal-wrapper"),
                        a = o - i.outerHeight(!0) + (i.height() - (r.outerHeight(!0) - r.height())),
                        s = "auto";
                    a < r.get(0).scrollHeight && (s = a), r.height(s)
                }
            },
            isVisible: n,
            areVisible: function p(e) {
                for (var t in c)
                    if (Object.prototype.hasOwnProperty.call(c, t) && n(t) && (void 0 === e || c[t].$modal.data("instance") === e)) return c[t].$modal;
                return !1
            }
        }
    },
    ///////////////////
    // POSITION MODULE
    ///////////////////
    V.MODULES.position = function (L) {
        var E = L.$;

        function o() {
            var e = L.selection.ranges(0).getBoundingClientRect();
            if (0 === e.top && 0 === e.left && 0 === e.width || 0 === e.height) {
                var t = !1;
                0 === L.$el.find(".fr-marker").length && (L.selection.save(), t = !0);
                var n = L.$el.find(".fr-marker").first();
                n.css("display", "inline"), n.css("line-height", "");
                var r = n.offset(),
                    o = n.outerHeight();
                n.css("display", "none"), n.css("line-height", 0), (e = {}).left = r && r.left, e.width = 0, e.height = o, e.top = r && r.top - (L.helpers.isMobile() && !L.helpers.isIOS() || L.opts.iframe ? 0 : L.helpers.scrollTop()), e.right = 1, e.bottom = 1, e.ok = !0, t && L.selection.restore()
            }
            return e
        }

        function i(e, t, n, r) {
            var o = n.data("container");
            if (!o || "BODY" === o.get(0).tagName && "static" === o.css("position") || (e && (e -= o.offset().left), t && (t -= o.offset().top), "BODY" !== o.get(0).tagName ? (e && (e += o.get(0).scrollLeft), t && (t += o.get(0).scrollTop)) : "absolute" === o.css("position") && (e && (e += o.position().left), t && (t += o.position().top))), L.opts.iframe && o && L.$tb && o.get(0) !== L.$tb.get(0)) {
                var i = L.helpers.getPX(L.$wp.find(".fr-iframe").css("padding-top")),
                    a = L.helpers.getPX(L.$wp.find(".fr-iframe").css("padding-left"));
                e && (e += L.$iframe.offset().left + a), t && (t += L.$iframe.offset().top + i)
            }
            var s = function l(e, t) {
                var n = e.outerWidth(!0);
                return t + n > L.$sc.get(0).clientWidth - 10 && (t = L.$sc.get(0).clientWidth - n - 10), t < 0 && (t = 10), t
            }(n, e);
            e && n.css("left", s), t && n.css("top", function c(e, t, n) {
                var r = e.outerHeight(!0);
                if (!L.helpers.isMobile() && L.$tb && e.parent().get(0) !== L.$tb.get(0)) {
                    var o = e.parent().offset().top,
                        i = t - r - (n || 0);
                    e.parent().get(0) === L.$sc.get(0) && (o -= e.parent().position().top);
                    var a = L.$sc.get(0).clientHeight;
                    o + t + r > L.$sc.offset().top + a && 0 < e.parent().offset().top + i && 0 < i ? i > L.$wp.scrollTop() && (t = i, e.addClass("fr-above")) : e.removeClass("fr-above")
                }
                return t
            }(n, t, r))
        }

        function t(e) {
            var n = E(e),
                t = n.is(".fr-sticky-on"),
                r = n.data("sticky-top"),
                o = n.data("sticky-scheduled");
            if (void 0 === r) {
                n.data("sticky-top", 0);
                var i = E('<div class="fr-sticky-dummy" style="height: '.concat(n.outerHeight(), 'px;"></div>'));
                L.$box.prepend(i)
            } else L.$box.find(".fr-sticky-dummy").css("height", n.outerHeight());
            if (L.core.hasFocus() || 0 < L.$tb.findVisible("input:focus").length) {
                var a = L.helpers.scrollTop(),
                    s = Math.min(Math.max(a - L.$tb.parent().offset().top, 0), L.$tb.parent().outerHeight() - n.outerHeight());
                if (s !== r && s !== o && (clearTimeout(n.data("sticky-timeout")), n.data("sticky-scheduled", s), n.outerHeight() < a - L.$tb.parent().offset().top && n.addClass("fr-opacity-0"), n.data("sticky-timeout", setTimeout(function () {
                    var e = L.helpers.scrollTop(),
                        t = Math.min(Math.max(e - L.$tb.parent().offset().top, 0), L.$tb.parent().outerHeight() - n.outerHeight());
                    0 < t && "BODY" === L.$tb.parent().get(0).tagName && (t += L.$tb.parent().position().top), t !== r && (n.css("top", Math.max(t, 0)), n.data("sticky-top", t), n.data("sticky-scheduled", t)), n.removeClass("fr-opacity-0")
                }, 100))), !t) {
                    var l = L.$tb.parent(),
                        c = l.get(0).offsetWidth - l.get(0).clientWidth;
                    n.css("top", "0"), n.width(l.width() - c), n.addClass("fr-sticky-on"), L.$box.addClass("fr-sticky-box")
                }
            } else clearTimeout(E(e).css("sticky-timeout")), n.css("top", "0"), n.css("position", ""), n.css("width", ""), n.data("sticky-top", 0), n.removeClass("fr-sticky-on"), L.$box.removeClass("fr-sticky-box")
        }

        function n(e) {
            if (e.offsetWidth) {
                var t = E(e),
                    n = t.outerHeight(),
                    r = t.data("sticky-position"),
                    o = E("body" === L.opts.scrollableContainer ? L.o_win : L.opts.scrollableContainer).outerHeight(),
                    i = 0,
                    a = 0;
                "body" !== L.opts.scrollableContainer && (i = L.$sc.offset().top, a = E(L.o_win).outerHeight() - i - o);
                var s = "body" === L.opts.scrollableContainer ? L.helpers.scrollTop() : i,
                    l = t.is(".fr-sticky-on");
                t.data("sticky-parent") || t.data("sticky-parent", t.parent());
                var c = t.data("sticky-parent"),
                    d = c.offset().top,
                    f = c.outerHeight();
                if (t.data("sticky-offset") ? L.$box.find(".fr-sticky-dummy").css("height", "".concat(n, "px")) : (t.data("sticky-offset", !0), t.after('<div class="fr-sticky-dummy" style="height: '.concat(n, 'px;"></div>'))), !r) {
                    var p = "auto" !== t.css("top") || "auto" !== t.css("bottom");
                    p || t.css("position", "fixed"), r = {
                        top: L.node.hasClass(t.get(0), "fr-top"),
                        bottom: L.node.hasClass(t.get(0), "fr-bottom")
                    }, p || t.css("position", ""), t.data("sticky-position", r), t.data("top", L.node.hasClass(t.get(0), "fr-top") ? t.css("top") : "auto"), t.data("bottom", L.node.hasClass(t.get(0), "fr-bottom") ? t.css("bottom") : "auto")
                }
                var u = L.helpers.getPX(t.data("top")),
                    h = L.helpers.getPX(t.data("bottom")),
                    g = r.top && function v() {
                        return d < s + u && s + u <= d + f - n
                    }() && (L.helpers.isInViewPort(L.$sc.get(0)) || "body" === L.opts.scrollableContainer),
                    m = r.bottom && function b() {
                        return d + n < s + o - h && s + o - h < d + f
                    }();
                if (g || m) {
                    var C = c.get(0).offsetWidth - c.get(0).clientWidth;
                    t.css("width", "".concat(c.get(0).getBoundingClientRect().width - C, "px")), l || (t.addClass("fr-sticky-on"), t.removeClass("fr-sticky-off"), t.css("top") && ("auto" !== t.data("top") ? t.css("top", L.helpers.getPX(t.data("top")) + i) : t.data("top", "auto")), t.css("bottom") && ("auto" !== t.data("bottom") ? t.css("bottom", L.helpers.getPX(t.data("bottom")) + a) : t.css("bottom", "auto")))
                } else L.node.hasClass(t.get(0), "fr-sticky-off") || (t.css("width", ""), t.removeClass("fr-sticky-on"), t.addClass("fr-sticky-off"), t.css("top") && "auto" !== t.data("top") && r.top && t.css("top", 0), t.css("bottom") && "auto" !== t.data("bottom") && r.bottom && t.css("bottom", 0))
            }
        }

        function r() {
            if (L.helpers.requestAnimationFrame()(r), !1 !== L.events.trigger("position.refresh"))
                for (var e = 0; e < L._stickyElements.length; e++) t(L._stickyElements[e])
        }

        function a() {
            if (L._stickyElements)
                for (var e = 0; e < L._stickyElements.length; e++) n(L._stickyElements[e])
        }
        return {
            _init: function s() {
                ! function e() {
                    L._stickyElements = [], L.helpers.isIOS() ? (r(), L.events.$on(E(L.o_win), "scroll", function () {
                        if (L.core.hasFocus())
                            for (var e = 0; e < L._stickyElements.length; e++) {
                                var t = E(L._stickyElements[e]),
                                    n = t.parent(),
                                    r = L.helpers.scrollTop();
                                t.outerHeight() < r - n.offset().top && (t.addClass("fr-opacity-0"), t.data("sticky-top", -1), t.data("sticky-scheduled", -1))
                            }
                    }, !0)) : ("body" !== L.opts.scrollableContainer && L.events.$on(E(L.opts.scrollableContainer), "scroll", a, !0), L.events.$on(E(L.o_win), "scroll", a, !0), L.events.$on(E(L.o_win), "resize", a, !0), L.events.on("initialized", a), L.events.on("focus", a), L.events.$on(E(L.o_win), "resize", "textarea", a, !0)), L.events.on("destroy", function () {
                        L._stickyElements = []
                    })
                }()
            },
            forSelection: function l(e) {
                var t = o();
                e.css({
                    top: 0,
                    left: 0
                });
                var n = t.top + t.height,
                    r = t.left + t.width / 2 - e.get(0).offsetWidth / 2 + L.helpers.scrollLeft();
                L.opts.iframe || (n += L.helpers.scrollTop()), i(r, n, e, t.height)
            },
            addSticky: function c(e) {
                e.addClass("fr-sticky"), L.helpers.isIOS() && e.addClass("fr-sticky-ios"), e.removeClass("fr-sticky"), L._stickyElements.push(e.get(0))
            },
            refresh: a,
            at: i,
            getBoundingRect: o
        }
    },
    ///////////////////
    // REFRESH MODULE
    ///////////////////
    V.MODULES.refresh = function (l) {
        var c = l.$;

        function i(e, t) {
            e.toggleClass("fr-disabled", t).attr("aria-disabled", t)
        }

        function e(e) {
            var t = l.$tb.find('.fr-more-toolbar[data-name="'.concat(e.attr("data-group-name"), '"]')),
                n = function s(e, t) {
                    var n = 0,
                        r = t.find("> .fr-command, > .fr-btn-wrap");
                    r.each(function (e, t) {
                        n += c(t).outerWidth()
                    });
                    var o, i = l.helpers.getPX(c(r[0]).css("margin-left")),
                        a = l.helpers.getPX(c(r[0]).css("margin-right"));
                    o = "rtl" === l.opts.direction ? l.$tb.outerWidth() - e.offset().left + l.$tb.offset().left - (n + e.outerWidth() + r.length * (i + a)) / 2 : e.offset().left - l.$tb.offset().left - (n - e.outerWidth() + r.length * (i + a)) / 2;
                    o + n + r.length * (i + a) > l.$tb.outerWidth() && (o -= (n + r.length * (i + a) - e.outerWidth()) / 2);
                    o < 0 && (o = 0);
                    return o
                }(e, t);
            "rtl" === l.opts.direction ? t.css("padding-right", n) : t.css("padding-left", n)
        }
        return {
            undo: function t(e) {
                i(e, !l.undo.canDo())
            },
            redo: function n(e) {
                i(e, !l.undo.canRedo())
            },
            outdent: function a(e) {
                if (l.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                for (var t = l.selection.blocks(), n = 0; n < t.length; n++) {
                    var r = "rtl" === l.opts.direction || "rtl" === c(t[n]).css("direction") ? "margin-right" : "margin-left",
                        o = t[0].parentElement;
                    if ("UL" != o.parentNode.tagName && "OL" != o.parentNode.tagName && "LI" != o.parentNode.tagName) return i(e, !0), !0;
                    if (t[0].previousSibling && "none" == o.parentNode.style.listStyleType) return i(e, !0), !0;
                    if ("LI" === t[n].tagName || "LI" === t[n].parentNode.tagName) return i(e, !1), !0;
                    if (0 < l.helpers.getPX(c(t[n]).css(r))) return i(e, !1), !0
                }
                i(e, !0)
            },
            indent: function o(e) {
                if (l.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                for (var t = l.selection.blocks(), n = 0; n < t.length; n++) {
                    for (var r = t[n].previousSibling; r && r.nodeType === Node.TEXT_NODE && 0 === r.textContent.length;) r = r.previousSibling;
                    if ("LI" !== t[n].tagName || r) return i(e, !1), !0;
                    i(e, !0)
                }
            },
            moreText: e,
            moreParagraph: e,
            moreMisc: e,
            moreRich: e
        }
    },
    ////////////
    // TOOLBAR
    ////////////
    Object.assign(V.DEFAULTS, {
        attribution: !0,
        toolbarBottom: !1,
        toolbarButtons: null,
        toolbarButtonsXS: null,
        toolbarButtonsSM: null,
        toolbarButtonsMD: null,
        toolbarContainer: null,
        toolbarInline: !1,
        toolbarSticky: !0,
        toolbarStickyOffset: 0,
        toolbarVisibleWithoutSelection: !1
    }),
    V.TOOLBAR_BUTTONS = {
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
    },
    V.TOOLBAR_BUTTONS_MD = null,
    (V.TOOLBAR_BUTTONS_SM = {}).moreText = Object.assign({}, V.TOOLBAR_BUTTONS.moreText, {
        buttonsVisible: 2
    }),
    V.TOOLBAR_BUTTONS_SM.moreParagraph = Object.assign({}, V.TOOLBAR_BUTTONS.moreParagraph, {
        buttonsVisible: 2
    }),
    V.TOOLBAR_BUTTONS_SM.moreRich = Object.assign({}, V.TOOLBAR_BUTTONS.moreRich, {
        buttonsVisible: 2
    }),
    V.TOOLBAR_BUTTONS_SM.moreMisc = Object.assign({}, V.TOOLBAR_BUTTONS.moreMisc, {
        buttonsVisible: 2
    }),
    (V.TOOLBAR_BUTTONS_XS = {}).moreText = Object.assign({}, V.TOOLBAR_BUTTONS.moreText, {
        buttonsVisible: 0
    }),
    V.TOOLBAR_BUTTONS_XS.moreParagraph = Object.assign({}, V.TOOLBAR_BUTTONS.moreParagraph, {
        buttonsVisible: 0
    }),
    V.TOOLBAR_BUTTONS_XS.moreRich = Object.assign({}, V.TOOLBAR_BUTTONS.moreRich, {
        buttonsVisible: 0
    }),
    V.TOOLBAR_BUTTONS_XS.moreMisc = Object.assign({}, V.TOOLBAR_BUTTONS.moreMisc, {
        buttonsVisible: 2
    }),
    V.POWERED_BY = '',
    V.MODULES.toolbar = function (m) {
        var C, v = m.$,
            t = [];

        function e(e) {
            var n = {};
            if (Array.isArray(e)) {
                if (!Array.isArray(e[0])) {
                    for (var t = [], r = [], o = 0; o < e.length; o++) "|" === e[o] || "-" === e[o] ? (0 < r.length && t.push(r), r = []) : r.push(e[o]);
                    0 < r.length && t.push(r), e = t
                }
                e.forEach(function (e, t) {
                    n["group".concat(t + 1)] = {
                        buttons: e
                    }
                }), n.showMoreButtons = !1
            } else "object" !== N(e) || Array.isArray(e) || ((n = e).showMoreButtons = !0);
            return n
        }

        function b() {
            var e = m.helpers.screenSize();
            return t[C = e]
        }

        function L() {
            for (var e = m.$tb.find(".fr-more-toolbar"), c = "", t = 0; t < e.length; t++) {
                var d = v(e[t]);
                d.hasClass("fr-expanded") ? function () {
                    var n = m.helpers.getPX(d.css("padding-left")),
                        e = d.find("> .fr-command, > .fr-btn-wrap"),
                        t = v(e[0]),
                        r = m.helpers.getPX(t.css("margin-left")),
                        o = m.helpers.getPX(t.css("margin-right")),
                        i = m.helpers.getPX(t.css("margin-top")),
                        a = m.helpers.getPX(t.css("margin-bottom"));
                    if (e.each(function (e, t) {
                        n += v(t).outerWidth() + r + o
                    }), m.$tb.outerWidth() < n) {
                        var s = Math.floor(n / m.$tb.outerWidth());
                        n += s * (n / d[0].childElementCount), s = Math.ceil(n / m.$tb.outerWidth());
                        var l = (m.helpers.getPX(t.css("height")) + i + a) * s;
                        d.css("height", l), c = l
                    }
                }() : d.css("height", "")
            }
            m.$tb.css("padding-bottom", c)
        }

        function r() {
            if (C !== m.helpers.screenSize()) {
                var e = b(),
                    t = v(),
                    n = v();
                for (var r in m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").addClass("fr-hidden"),
                    function g() {
                        for (var t = m.$tb.find(".fr-btn-grp, .fr-more-toolbar"), r = function r(e) {
                            var n = v(t[e]);
                            n.children().each(function (e, t) {
                                n.before(t)
                            }), n.remove()
                        }, e = 0; e < t.length; e++) r(e)
                    }(), e) {
                    var o = e[r];
                    if (o.buttons) {
                        var i = void 0,
                            a = 0,
                            s = 3,
                            l = v('<div class="fr-btn-grp fr-float-'.concat(e[r].align ? e[r].align : "left", '"></div>'));
                        e.showMoreButtons && (i = v('<div class="fr-more-toolbar"></div>').data("name", "".concat(r, "-").concat(m.id)));
                        for (var c = 0; c < o.buttons.length; c++) {
                            o.buttonsVisible !== undefined && (s = o.buttonsVisible);
                            var d = m.$tb.find('> .fr-command[data-cmd="' + o.buttons[c] + '"], > div.fr-btn-wrap > .fr-command[data-cmd="' + o.buttons[c] + '"]'),
                                f = null;
                            m.node.hasClass(d.next().get(0), "fr-dropdown-menu") && (f = d.next()), m.node.hasClass(d.next().get(0), "fr-options") && (d.removeClass("fr-hidden"), d.next().removeClass("fr-hidden"), d = d.parent()), d.removeClass("fr-hidden"), e.showMoreButtons && s <= a ? (i.append(d), f && i.append(f)) : (l.append(d), f && l.append(f)), a++
                        }
                        if (e.showMoreButtons && s < a) {
                            var p = m.$tb.find('.fr-command[data-cmd="'.concat(r, '"]'));
                            if (0 < p.length) p.removeClass("fr-hidden fr-open");
                            else {
                                var u = r,
                                    h = V.COMMANDS[u];
                                h.more_btn = !0, p = v(m.button.build(u, h, !0)), m.button.addButtons(p)
                            }
                            l.append(p)
                        }
                        t.push(l), e.showMoreButtons && n.push(i)
                    }
                }
                m.opts.toolbarBottom ? (m.$tb.append(n), m.$tb.find(".fr-newline").remove(), m.$tb.append('<div class="fr-newline"></div>'), m.$tb.append(t)) : (m.$tb.append(t), m.$tb.find(".fr-newline").remove(), m.$tb.append('<div class="fr-newline"></div>'), m.$tb.append(n)), m.$tb.removeClass("fr-toolbar-open"), m.$box.removeClass("fr-toolbar-open"), m.events.trigger("codeView.toggle")
            }
            L()
        }

        function n(e, t) {
            setTimeout(function () {
                if ((!e || e.which != V.KEYCODE.ESC) && m.selection.inEditor() && m.core.hasFocus() && !m.popups.areVisible() && "false" != v(m.selection.blocks()[0]).closest("table").attr("contenteditable") && (m.opts.toolbarVisibleWithoutSelection || !m.selection.isCollapsed() && !m.keys.isIME() || t)) {
                    if (m.$tb.data("instance", m), !1 === m.events.trigger("toolbar.show", [e])) return;
                    m.$tb.show(), m.opts.toolbarContainer || m.position.forSelection(m.$tb), 1 < m.opts.zIndex ? m.$tb.css("z-index", m.opts.zIndex + 1) : m.$tb.css("z-index", null)
                }
            }, 0)
        }

        function o(e) {
            return (!e || "blur" !== e.type || document.activeElement !== m.el) && (!(!e || "keydown" !== e.type || !m.keys.ctrlKey(e)) || (!!m.button.getButtons(".fr-dropdown.fr-active").next().find(m.o_doc.activeElement).length || void (!1 !== m.events.trigger("toolbar.hide") && m.$tb.hide())))
        }
        t[V.XS] = e(m.opts.toolbarButtonsXS || m.opts.toolbarButtons || V.TOOLBAR_BUTTONS_XS || V.TOOLBAR_BUTTONS || []), t[V.SM] = e(m.opts.toolbarButtonsSM || m.opts.toolbarButtons || V.TOOLBAR_BUTTONS_SM || V.TOOLBAR_BUTTONS || []), t[V.MD] = e(m.opts.toolbarButtonsMD || m.opts.toolbarButtons || V.TOOLBAR_BUTTONS_MD || V.TOOLBAR_BUTTONS || []), t[V.LG] = e(m.opts.toolbarButtons || V.TOOLBAR_BUTTONS || []);
        var i = null;

        function a(e) {
            clearTimeout(i), e && e.which === V.KEYCODE.ESC || (i = setTimeout(n, m.opts.typingTimer))
        }

        function s() {
            m.events.on("window.mousedown", o), m.events.on("keydown", o), m.events.on("blur", o), m.events.$on(m.$tb, "transitionend", ".fr-more-toolbar", function () {
                m.position.forSelection(m.$tb)
            }), m.helpers.isMobile() || m.events.on("window.mouseup", n), m.helpers.isMobile() ? m.helpers.isIOS() || (m.events.on("window.touchend", n), m.browser.mozilla && setInterval(n, 200)) : m.events.on("window.keyup", a), m.events.on("keydown", function (e) {
                e && e.which === V.KEYCODE.ESC && m.events.trigger("toolbar.esc")
            }), m.events.on("keydown", function (e) {
                if (e.which === V.KEYCODE.ALT) return e.stopPropagation(), !1
            }, !0), m.events.$on(m.$wp, "scroll.toolbar", n), m.events.on("commands.after", n), m.helpers.isMobile() && (m.events.$on(m.$doc, "selectionchange", a), m.events.$on(m.$doc, "orientationchange", n))
        }

        function l() {
            m.$tb.html("").removeData().remove(), m.$tb = null, m.$second_tb && (m.$second_tb.html("").removeData().remove(), m.$second_tb = null)
        }

        function c() {
            m.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), m.$box.find(".fr-sticky-dummy").remove()
        }

        function d() {
            m.opts.theme && m.$tb.addClass("".concat(m.opts.theme, "-theme")), 1 < m.opts.zIndex && m.$tb.css("z-index", m.opts.zIndex + 1), "auto" !== m.opts.direction && m.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(m.opts.direction)), m.helpers.isMobile() ? m.$tb.addClass("fr-mobile") : m.$tb.addClass("fr-desktop"), m.opts.toolbarContainer ? (m.opts.toolbarInline && (s(), o()), m.opts.toolbarBottom ? m.$tb.addClass("fr-bottom") : m.$tb.addClass("fr-top")) : function e() {
                m.opts.toolbarInline ? (m.$sc.append(m.$tb), m.$tb.data("container", m.$sc), m.$tb.addClass("fr-inline"), s(), m.opts.toolbarBottom = !1) : (m.opts.toolbarBottom && !m.helpers.isIOS() ? (m.$box.append(m.$tb), m.$tb.addClass("fr-bottom"), m.$box.addClass("fr-bottom")) : (m.opts.toolbarBottom = !1, m.$box.prepend(m.$tb), m.$tb.addClass("fr-top"), m.$box.addClass("fr-top")), m.$tb.addClass("fr-basic"), m.opts.toolbarSticky && (m.opts.toolbarStickyOffset && (m.opts.toolbarBottom ? m.$tb.css("bottom", m.opts.toolbarStickyOffset) : m.$tb.css("top", m.opts.toolbarStickyOffset)), m.position.addSticky(m.$tb)))
            }(),
                function t() {
                    var e = m.button.buildGroup(b());
                    m.$tb.append(e), L(), m.button.bindCommands(m.$tb)
                }(),
                function n() {
                    m.events.$on(v(m.o_win), "resize", r), m.events.$on(v(m.o_win), "orientationchange", r)
                }(), m.accessibility.registerToolbar(m.$tb), m.events.$on(m.$tb, "".concat(m._mousedown, " ").concat(m._mouseup), function (e) {
                    var t = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    if (t && "INPUT" !== t.tagName && !m.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1
                }, !0), m.helpers.isMobile() && m.events.$on(m.$tb, "click", function () {
                    m.popups.areVisible().length || m.$el.focus()
                }), m.events.$on(m.$tb, "transitionend", ".fr-more-toolbar", function () {
                    m.$box.hasClass("fr-fullscreen") && (m.opts.height = m.o_win.innerHeight - (m.opts.toolbarInline ? 0 : m.$tb.outerHeight() + (m.$second_tb ? m.$second_tb.outerHeight() : 0)), m.size.refresh())
                })
        }
        var f = !1;
        return {
            _init: function p() {
                if (m.$sc = v(m.opts.scrollableContainer).first(), !m.$wp)
                    return !1;

                m.opts.toolbarInline ||
                m.opts.toolbarBottom ||

                (
                    m.$second_tb = v(m.doc.createElement("div")).attr("class", "fr-second-toolbar"),
                    m.$box.append(m.$second_tb),
                    (!1 !== m.ul || m.opts.attribution) && m.$second_tb.prepend(V.POWERED_BY)
                ),

                m.opts.toolbarContainer
                    ? (m.shared.$tb ? (m.$tb = m.shared.$tb, m.opts.toolbarInline && s())
                        : (
                            m.shared.$tb = v(m.doc.createElement("DIV")),
                            m.shared.$tb.addClass("fr-toolbar"),
                            m.$tb = m.shared.$tb,
                            v(m.opts.toolbarContainer).append(m.$tb),
                            d(),
                            m.$tb.data("instance", m)
                        ),

                        m.opts.toolbarInline
                            ? m.$box.addClass("fr-inline")
                            : m.$box.addClass("fr-basic"),
                        
                        m.events.on("focus", function () {
                                m.$tb.data("instance", m)
                        }, !0),

                        m.opts.toolbarInline = !1
                    )
                    : m.opts.toolbarInline
                        ? (
                            m.$box.addClass("fr-inline"),
                            m.shared.$tb
                                ? (m.$tb = m.shared.$tb, s())
                                : (m.shared.$tb = v(m.doc.createElement("DIV")),
                                
                            m.shared.$tb.addClass("fr-toolbar"),
                            m.$tb = m.shared.$tb, d())
                        )
                        : (
                            m.$box.addClass("fr-basic"),
                            m.$tb = v(m.doc.createElement("DIV")),
                            m.$tb.addClass("fr-toolbar"),
                            d(),
                            m.$tb.data("instance", m)
                        ),

                m.events.on("destroy", c, !0),

                m.events.on(m.opts.toolbarInline || m.opts.toolbarContainer
                    ? "shared.destroy"
                    : "destroy", l, !0
                ),

                m.events.on("edit.on", function () {
                    m.$tb.removeClass("fr-disabled").removeAttr("aria-disabled")
                }),

                m.events.on("edit.off", function () {
                    m.$tb.addClass("fr-disabled").attr("aria-disabled", !0)
                }),

                function e() {
                    m.events.on("shortcut", function (e, t, n) {
                        var r;
                        if (t && !n
                            ? r = m.$tb.find('.fr-command[data-cmd="'.concat(t, '"]'))
                            : t && n && (r = m.$tb.find('.fr-command[data-cmd="'.concat(t, '"][data-param1="').concat(n, '"]'))),
                            r.length && (
                                e.preventDefault(),
                                e.stopPropagation(),
                                r.parents(".fr-toolbar").data("instance", m),
                                "keydown" === e.type
                            )
                        ) return m.button.exec(r), !1
                    })
                }()
            },
            hide: o,
            show: function u() {
                if (!1 === m.events.trigger("toolbar.show")) return !1;
                m.$tb.show()
            },
            showInline: n,
            disable: function h() {
                !f && m.$tb && (m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), f = !0)
            },
            enable: function g() {
                f && m.$tb && (m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), f = !1), m.button.bulkRefresh()
            },
            setMoreToolbarsHeight: L
        }
    };
    //////////
    // OTHER
    //////////
    var c = ["scroll", "wheel", "touchmove", "touchstart", "touchend"],
        d = ["webkit", "moz", "ms", "o"],
        f = ["transitionend"],
        o = document.createElement("div").style,
        i = ["Webkit", "Moz", "ms", "O", "css", "style"],
        s = {
            visibility: "hidden",
            display: "block"
        },
        r = ["focus", "blur", "click"],
        a = {},
        l = function l(e, t) {
            return {
                altKey: e.altKey,
                bubbles: e.bubbles,
                cancelable: e.cancelable,
                changedTouches: e.changedTouches,
                ctrlKey: e.ctrlKey,
                detail: e.detail,
                eventPhase: e.eventPhase,
                metaKey: e.metaKey,
                pageX: e.pageX,
                pageY: e.pageY,
                shiftKey: e.shiftKey,
                view: e.view,
                "char": e["char"],
                key: e.key,
                keyCode: e.keyCode,
                button: e.button,
                buttons: e.buttons,
                clientX: e.clientX,
                clientY: e.clientY,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                pointerId: e.pointerId,
                pointerType: e.pointerType,
                screenX: e.screenX,
                screenY: e.screenY,
                targetTouches: e.targetTouches,
                toElement: e.toElement,
                touches: e.touches,
                type: e.type,
                which: e.which,
                target: e.target,
                currentTarget: t,
                originalEvent: e,
                stopPropagation: function () {
                    e.stopPropagation()
                },
                stopImmediatePropagation: function () {
                    e.stopImmediatePropagation()
                },
                preventDefault: function () {
                    -1 === c.indexOf(e.type) && e.preventDefault()
                }
            }
        },
        p = function p(e) {
            return e.ownerDocument && e.ownerDocument.body.contains(e) || "#document" === e.nodeName || "HTML" === e.nodeName || e === window
        },
        u = function u(n, r) {
            return function (e) {
                var t = e.target;
                if (r)
                    for (r = g(r); t && t !== this;) t.matches && t.matches(g(r)) && n.call(t, l(e, t)), t = t.parentNode;
                else p(t) && n.call(t, l(e, t))
            }
        },
        h = function h(e, t) {
            return new v(e, t)
        },
        g = function g(e) {
            return e && "string" == typeof e ? e.replace(/^\s*>/g, ":scope >").replace(/,\s*>/g, ", :scope >") : e
        },
        m = function m(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        C = h;
    h.fn = h.prototype = {
        constructor: h,
        length: 0,
        contains: function (e) {
            if (!e) return !1;
            if (Array.isArray(e)) {
                for (var t = 0; t < e.length; t++)
                    if (this.contains(e[t]) && this != e[t]) return !0;
                return !1
            }
            for (var n = 0; n < this.length; n++)
                for (var r = e; r;) {
                    if (r == this[n] || r[0] && r[0].isEqualNode(this[n])) return !0;
                    r = r.parentNode
                }
            return !1
        },
        findVisible: function (e) {
            for (var t = this.find(e), n = t.length - 1; 0 <= n; n--) C(t[n]).isVisible() || t.splice(n, 1);
            return t
        },
        formatParams: function (t) {
            var e = "".concat(Object.keys(t).map(function (e) {
                return "".concat(e, "=").concat(encodeURIComponent(t[e]))
            }).join("&"));
            return e || ""
        },
        ajax: function (t) {
            var n = new XMLHttpRequest,
                e = this.formatParams(t.data);
            for (var r in "GET" === t.method.toUpperCase() && (t.url = e ? t.url + "?" + e : t.url), n.open(t.method, t.url, !0), t.withCredentials && (n.withCredentials = !0), t.crossDomain && n.setRequestHeader("Access-Control-Allow-Origin", "*"), t.headers) Object.prototype.hasOwnProperty.call(t.headers, r) && n.setRequestHeader(r, t.headers[r]);
            Object.prototype.hasOwnProperty.call(t.headers, "Content-Type") || ("json" === t.dataType ? n.setRequestHeader("Content-Type", "application/json") : n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")), n.onload = function () {
                if (200 == n.status) {
                    var e = n.responseText;
                    "json" === t.dataType && (e = JSON.parse(e)), t.done(e, n.status, n)
                } else t.fail(n)
            }, n.send(e)
        },
        prevAll: function () {
            var e = C();
            if (!this[0]) return e;
            for (var t = this[0]; t && t.previousSibling;) t = t.previousSibling, e.push(t);
            return e
        },
        index: function (e) {
            return e ? "string" == typeof e ? [].indexOf.call(C(e), this[0]) : [].indexOf.call(this, e.length ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        isVisible: function () {
            return !!this[0] && !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length)
        },
        toArray: function () {
            return [].slice.call(this)
        },
        get: function (e) {
            return null == e ? [].slice.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function (e) {
            var t = h.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        wrapAll: function (e) {
            var t;
            return this[0] && (m(e) && (e = e.call(this[0])), t = h(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function (e) {
            if ("string" == typeof e) {
                for (var t = e.split(" "), n = 0; n < t.length && 0 === t[n].trim().length;) n++;
                if (n < t.length && (C(e).length && t[n].trim() === C(e)[0].tagName && (e = document.createElement(t[n].trim())), n++), "string" != typeof e)
                    for (var r = C(e); n < t.length; n++) {
                        t[n] = t[n].trim();
                        var o = t[n].split("=");
                        r.attr(o[0], o[1].replace('"', ""))
                    }
            }
            for (; this[0].firstChild && this[0].firstChild !== e && "string" != typeof e;) e.appendChild(this[0].firstChild)
        },
        wrap: function (t) {
            var n = m(t);
            return this.each(function (e) {
                C(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                this.nodeName && this.nodeName.toLowerCase() === name.toLowerCase() || h(this).replaceWith(this.childNodes)
            })
        },
        grep: function (e, t, n) {
            for (var r = [], o = 0, i = e.length, a = !n; o < i; o++) !t(e[o], o) !== a && r.push(e[o]);
            return r
        },
        map: function (n) {
            return this.pushStack(h.map(this, function (e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function () {
            return this.pushStack([].slice.apply(this, arguments))
        },
        each: function (e) {
            if (this.length)
                for (var t = 0; t < this.length && !1 !== e.call(this[t], t, this[t]); t++);
            return this
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        empty: function () {
            for (var e = 0; e < this.length; e++) this[e].innerHTML = ""
        },
        contents: function () {
            for (var e = C(), t = 0; t < this.length; t++)
                for (var n = this[t].childNodes, r = 0; r < n.length; r++) e.push(n[r]);
            return e
        },
        attr: function (e, t) {
            if ("object" === N(e)) {
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && null !== e[n] && this.attr(n, e[n]);
                return this
            }
            if (void 0 === t) return 0 === this.length || !this[0].getAttribute && "checked" !== e ? undefined : "checked" === e ? this[0].checked : "tagName" === e ? this[0].tagName : this[0].getAttribute(e);
            if ("checked" === e)
                for (var r = 0; r < this.length; r++) this[r].checked = t;
            else if ("tagName" === e)
                for (var o = 0; o < this.length; o++) this[o].tagName = t;
            else
                for (var i = 0; i < this.length; i++) this[i].setAttribute(e, t);
            return this
        },
        removeAttr: function (e) {
            for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute(e);
            return this
        },
        hide: function () {
            return this.css("display", "none"), this
        },
        show: function () {
            return this.css("display", "block"), this
        },
        focus: function () {
            return this.length && this[0].focus(), this
        },
        blur: function () {
            return this.length && this[0].blur(), this
        },
        data: function (e, t) {
            if (void 0 !== t) {
                for (var n = 0; n < this.length; n++) "object" !== N(this[n]["data-" + e] = t) && "function" != typeof t && this[n].setAttribute && this[n].setAttribute("data-" + e, t);
                return this
            }
            if (void 0 !== t) return this.attr("data-" + e, t);
            if (0 === this.length) return undefined;
            for (var r = 0; r < this.length; r++) {
                var o = this[r]["data-" + e];
                if (null == o && this[r].getAttribute && (o = this[r].getAttribute("data-" + e)), void 0 !== o && null != o) return o
            }
            return undefined
        },
        removeData: function (e) {
            for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute("data-" + e), this[t]["data-" + e] = null;
            return this
        },
        getCorrectStyleName: function (e) {
            if (!a[e]) {
                var t;
                e in o && (t = e);
                for (var n = e[0].toUpperCase() + e.slice(1), r = i.length; r--;)(e = i[r] + n) in o && (t = e);
                a[e] = t
            }
            return a[e]
        },
        css: function (e, t) {
            if (void 0 !== t) {
                if (0 === this.length) return this;
                ("string" != typeof t || "" === t.trim() || isNaN(t)) && "number" != typeof t || !/(margin)|(padding)|(height)|(width)|(top)|(left)|(right)|(bottom)/gi.test(e) || /(line-height)/gi.test(e) || (t += "px");
                for (var n = 0; n < this.length; n++) e = C(this).getCorrectStyleName(e), this[n].style[e] = t;
                return this
            }
            if ("string" == typeof e) {
                if (0 === this.length) return undefined;
                var r = this[0].ownerDocument || document,
                    o = r.defaultView || r.parentWindow;
                return e = C(this).getCorrectStyleName(e), o.getComputedStyle(this[0])[e]
            }
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && this.css(i, e[i]);
            return this
        },
        toggleClass: function (e, t) {
            if (1 < e.split(" ").length) {
                for (var n = e.split(" "), r = 0; r < n.length; r++) this.toggleClass(n[r], t);
                return this
            }
            for (var o = 0; o < this.length; o++)
                void 0 === t
                    ? this[o].classList.contains(e)
                        ? this[o].classList.remove(e)
                        : this[o].classList.add(e)
                    : t
                        ? this[o].classList.contains(e) || this[o].classList.add(e)
                        : this[o].classList.contains(e) && this[o].classList.remove(e);

            return this
        },
        addClass: function (e) {
            if (0 === e.length) return this;
            if (1 < e.split(" ").length) {
                for (var t = e.split(" "), n = 0; n < t.length; n++) this.addClass(t[n]);
                return this
            }
            for (var r = 0; r < this.length; r++) this[r].classList.add(e);
            return this
        },
        removeClass: function (e) {
            if (1 < e.split(" ").length) {
                for (var t = e.split(" "), n = 0; n < t.length; n++) t[n] = t[n].trim(), t[n].length && this.removeClass(t[n]);
                return this
            }
            for (var r = 0; r < this.length; r++) e.length && this[r].classList.remove(e);
            return this
        },
        getClass: function (e) {
            return e.getAttribute && e.getAttribute("class") || ""
        },
        stripAndCollapse: function (e) {
            return (e.match(/[^\x20\t\r\n\f]+/g) || []).join(" ")
        },
        hasClass: function (e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && -1 < (" " + C(this).stripAndCollapse(C(this).getClass(n)) + " ").indexOf(t)) return !0;
            return !1
        },
        scrollTop: function (e) {
            if (void 0 === e) return 0 === this.length ? undefined : this[0] === document ? document.documentElement.scrollTop : this[0].scrollTop;
            for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(document.documentElement.scrollLeft, e) : this[t].scrollTop = e
        },
        scrollLeft: function (e) {
            if (void 0 === e) return 0 === this.length ? undefined : this[0] === document ? document.documentElement.scrollLeft : this[0].scrollLeft;
            for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(e, document.documentElement.scrollTop) : this[t].scrollLeft = e
        },
        on: function (e, t, n) {
            if (1 < e.split(" ").length) {
                for (var r = e.split(" "), o = 0; o < r.length; o++)
                    if (-1 !== f.indexOf(e))
                        for (var i = 0; i < d.length; i++) this.on(d[i] + e[0].toUpperCase() + e.slice(1), t, n);
                    else this.on(r[o], t, n);
                return this
            }
            n = "function" == typeof t ? u(t, null) : u(n, t);
            for (var a = 0; a < this.length; a++) {
                var s = C(this[a]);
                s.data("events") || s.data("events", []), s.data("events").push([e, n]);
                var l = e.split(".");
                l = l[0], 0 <= c.indexOf(l) ? s.get(0).addEventListener(l, n, {
                    passive: !0
                }) : s.get(0).addEventListener(l, n)
            }
        },
        off: function (e) {
            if (1 < e.split(" ").length) {
                for (var t = e.split(" "), n = 0; n < t.length; n++) this.off(t[n]);
                return this
            }
            for (var r = 0; r < this.length; r++) {
                var o = C(this[r]);
                if (o.data("events")) {
                    var i = e.split(".");
                    i = i[0];
                    for (var a = o.data("events") || [], s = a.length - 1; 0 <= s; s--) {
                        var l = a[s];
                        l[0] == e && (o.get(0).removeEventListener(i, l[1]), a.splice(s, 1))
                    }
                }
            }
        },
        trigger: function (e) {
            for (var t = 0; t < this.length; t++) {
                var n = void 0;
                "function" == typeof Event ? n = 0 <= e.search(/^mouse/g) ? new MouseEvent(e, {
                    view: window,
                    cancelable: !0,
                    bubbles: !0
                }) : new Event(e) : 0 <= e.search(/^mouse/g) ? (n = document.createEvent("MouseEvents")).initMouseEvent(e, !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null) : (n = document.createEvent("Event")).initEvent(e, !0, !0), 0 <= r.indexOf(e) && "function" == typeof this[t][e] ? this[t][e]() : this[t].dispatchEvent(n)
            }
        },
        triggerHandler: function () { },
        val: function (e) {
            if (void 0 === e) return this[0].value;
            for (var t = 0; t < this.length; t++) this[t].value = e;
            return this
        },
        siblings: function () {
            return C(this[0]).parent().children().not(this)
        },
        find: function (e) {
            var t = C();
            if ("string" != typeof e) {
                for (var n = 0; n < e.length; n++)
                    for (var r = 0; r < this.length; r++)
                        if (this[r] !== e[n] && C(this[r]).contains(e[n])) {
                            t.push(e[n]);
                            break
                        } return t
            }
            var o = function o(e) {
                return "object" === ("undefined" == typeof HTMLElement ? "undefined" : N(HTMLElement)) ? e instanceof HTMLElement : e && "object" === N(e) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
            };
            e = g(e);
            for (var i = 0; i < this.length; i++)
                if (this[i].querySelectorAll) {
                    var a = [];
                    e && "string" == typeof e ? a = this[i].querySelectorAll(e) : o(e) && (a = [e]);
                    for (var s = 0; s < a.length; s++) t.push(a[s])
                } return t
        },
        children: function () {
            for (var e = C(), t = 0; t < this.length; t++)
                for (var n = this[t].children, r = 0; r < n.length; r++) e.push(n[r]);
            return e
        },
        not: function (e) {
            if ("string" == typeof e)
                for (var t = this.length - 1; 0 <= t; t--) this[t].matches(e) && this.splice(t, 1);
            else if (e instanceof h) {
                for (var n = this.length - 1; 0 <= n; n--)
                    for (var r = 0; r < e.length; r++)
                        if (this[n] === e[r]) {
                            this.splice(n, 1);
                            break
                        }
            } else
                for (var o = this.length - 1; 0 <= o; o--) this[o] === e[0] && this.splice(o, 1);
            return this
        },
        add: function (e) {
            for (var t = 0; t < e.length; t++) this.push(e[t]);
            return this
        },
        closest: function (e) {
            for (var t = 0; t < this.length; t++) {
                var n = this[t].closest && this[t].closest(e);
                if (n) return C(n)
            }
            return C()
        },
        html: function (e) {
            if (void 0 === e) return 0 === this.length ? undefined : this[0].innerHTML;
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) {
                    this[t].innerHTML = e;
                    for (var n = this[t].children, r = this[t].ownerDocument || document, o = 0; o < n.length; o++)
                        if ("SCRIPT" === n[o].tagName) {
                            var i = r.createElement("script");
                            i.innerHTML = n[o].innerHTML, r.head.appendChild(i).parentNode.removeChild(i)
                        }
                } else {
                this[0].innerHTML = "", this.append(e[0]);
                var a = this[0].ownerDocument || document;
                if ("SCRIPT" === e[0].tagName) {
                    var s = a.createElement("script");
                    s.innerHTML = e[0].innerHTML, a.head.appendChild(s).parentNode.removeChild(s)
                }
            }
            return this
        },
        text: function (e) {
            if (!e) return this.length ? this[0].textContent : "";
            for (var t = 0; t < this.length; t++) this[t].textContent = e
        },
        after: function e(t) {
            if (t)
                if ("string" == typeof t)
                    for (var n = 0; n < this.length; n++) {
                        var e = this[n];
                        if (e.nodeType != Node.ELEMENT_NODE) {
                            var r = e.ownerDocument.createElement("SPAN");
                            C(e).after(r), C(r).after(t).remove()
                        } else e.insertAdjacentHTML("afterend", t)
                    } else {
                    var o = this[0];
                    if (o.nextSibling)
                        if (t instanceof h)
                            for (var i = 0; i < t.length; i++) o.nextSibling.parentNode.insertBefore(t[i], o.nextSibling);
                        else o.nextSibling.parentNode.insertBefore(t, o.nextSibling);
                    else C(o.parentNode).append(t)
                }
            return this
        },
        clone: function (e) {
            for (var t = C(), n = 0; n < this.length; n++) t.push(this[n].cloneNode(e));
            return t
        },
        replaceWith: function (e) {
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) this[t].parentNode && (this[t].outerHTML = e);
            else if (e.length)
                for (var n = 0; n < this.length; n++) this.replaceWith(e[n]);
            else this.after(e).remove()
        },
        insertBefore: function (e) {
            return C(e).before(this[0]), this
        },
        before: function e(t) {
            if (t instanceof h) {
                for (var n = 0; n < t.length; n++) this.before(t[n]);
                return this
            }
            if (t)
                if ("string" == typeof t)
                    for (var r = 0; r < this.length; r++) {
                        var e = this[r];
                        if (e.nodeType != Node.ELEMENT_NODE) {
                            var o = e.ownerDocument.createElement("SPAN");
                            C(e).before(o), C(o).before(t).remove()
                        } else e.parentNode && e.insertAdjacentHTML("beforebegin", t)
                    } else {
                    var i = this[0];
                    if (i.parentNode)
                        if (t instanceof h)
                            for (var a = 0; a < t.length; a++) i.parentNode.insertBefore(t[a], i);
                        else i.parentNode.insertBefore(t, i)
                }
            return this
        },
        append: function (e) {
            if (0 == this.length) return this;
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) {
                    var n = this[t],
                        r = n.ownerDocument.createElement("SPAN");
                    C(n).append(r), C(r).after(e).remove()
                } else if (e instanceof h || Array.isArray(e))
                for (var o = 0; o < e.length; o++) this.append(e[o]);
            else "function" != typeof e && this[0].appendChild(e);
            return this
        },
        prepend: function (e) {
            if (0 == this.length) return this;
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) {
                    var n = this[t],
                        r = n.ownerDocument.createElement("SPAN");
                    C(n).prepend(r), C(r).before(e).remove()
                } else if (e instanceof h)
                for (var o = 0; o < e.length; o++) this.prepend(e[o]);
            else {
                var i = this[0];
                i.firstChild ? i.firstChild ? i.insertBefore(e, i.firstChild) : i.appendChild(e) : C(i).append(e)
            } return this
        },
        remove: function () {
            for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        prev: function () {
            return this.length && this[0].previousElementSibling ? C(this[0].previousElementSibling) : C()
        },
        next: function () {
            return this.length && this[0].nextElementSibling ? C(this[0].nextElementSibling) : C()
        },
        nextAllVisible: function () {
            return this.next()
        },
        prevAllVisible: function () {
            return this.prev()
        },
        outerHeight: function (e) {
            if (0 === this.length) return undefined;
            var t = this[0];
            if (t === t.window) return t.innerHeight;
            var n = {},
                r = this.isVisible();
            if (!r)
                for (var o in s) n[o] = t.style[o], t.style[o] = s[o];
            var i = t.offsetHeight;
            if (e && (i += parseInt(C(t).css("marginTop")) + parseInt(C(t).css("marginBottom"))), !r)
                for (var a in s) t.style[a] = n[a];
            return i
        },
        outerWidth: function (e) {
            if (0 === this.length) return undefined;
            var t = this[0];
            if (t === t.window) return t.outerWidth;
            var n = {},
                r = this.isVisible();
            if (!r)
                for (var o in s) n[o] = t.style[o], t.style[o] = s[o];
            var i = t.offsetWidth;
            if (e && (i += parseInt(C(t).css("marginLeft")) + parseInt(C(t).css("marginRight"))), !r)
                for (var a in s) t.style[a] = n[a];
            return i
        },
        width: function (e) {
            if (e === undefined) {
                if (this[0] instanceof HTMLDocument) return this[0].body.offsetWidth;
                if (this[0]) return this[0].offsetWidth
            } else this[0].style.width = e + "px"
        },
        height: function (e) {
            var t = this[0];
            if (e === undefined) {
                if (t instanceof HTMLDocument) {
                    var n = t.documentElement;
                    return Math.max(t.body.scrollHeight, n.scrollHeight, t.body.offsetHeight, n.offsetHeight, n.clientHeight)
                }
                return t.offsetHeight
            }
            t.style.height = e + "px"
        },
        is: function (e) {
            return 0 !== this.length && ("string" == typeof e && this[0].matches ? this[0].matches(e) : e instanceof h ? this[0] == e[0] : this[0] == e)
        },
        parent: function () {
            return 0 === this.length ? C() : C(this[0].parentNode)
        },
        _matches: function (e, t) {
            var n = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector;
            return e && !t ? n : n.call(e, t)
        },
        parents: function (e) {
            for (var t = C(), n = 0; n < this.length; n++)
                for (var r = this[n].parentNode; r && r != document && this._matches(r);) e ? this._matches(r, e) && t.push(r) : t.push(r), r = r.parentNode;
            return t
        },
        parentsUntil: function (e, t) {
            var n = C();
            e instanceof h && 0 < e.length && (e = e[0]);
            for (var r = 0; r < this.length; r++)
                for (var o = this[r].parentNode; o && o != document && o.matches && o != e && this[r] != e && ("string" != typeof e || !o.matches(e));) t ? o.matches(t) && n.push(o) : n.push(o), o = o.parentNode;
            return n
        },
        insertAfter: function (e) {
            var t = e.parent()[0];
            t && t.insertBefore(this[0], e[0].nextElementSibling)
        },
        filter: function (e) {
            var t = C();
            if ("function" == typeof e)
                for (var n = 0; n < this.length; n++) e.call(this[n], this[n]) && t.push(this[n]);
            else if ("string" == typeof e)
                for (var r = 0; r < this.length; r++) this[r].matches(e) && t.push(this[r]);
            return t
        },
        offset: function () {
            if (0 === this.length) return undefined;
            var e = this[0].getBoundingClientRect(),
                t = this[0].ownerDocument.defaultView;
            return {
                top: e.top + t.pageYOffset,
                left: e.left + t.pageXOffset
            }
        },
        position: function () {
            return {
                left: this[0].offsetLeft,
                top: this[0].offsetTop
            }
        },
        push: [].push,
        splice: [].splice
    }, h.extend = function (e) {
        e = e || {};
        for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
        return e
    }, h.merge = function (e, t) {
        for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
        return e.length = o, e
    }, h.map = function (e, t, n) {
        var r, o, i = 0,
            a = [];
        if (Array.isArray(e))
            for (r = e.length; i < r; i++) null != (o = t(e[i], i, n)) && a.push(o);
        else
            for (i in e) null != (o = t(e[i], i, n)) && a.push(o);
        return [].concat.apply([], a)
    };
    var v = function v(e, t) {
        if (!e) return this;
        if ("string" == typeof e && "<" === e[0]) {
            var n = document.createElement("DIV");
            return n.innerHTML = e, C(n.firstElementChild)
        }
        if (t = t instanceof h ? t[0] : t, "string" != typeof e) return e instanceof h ? e : (this[0] = e, this.length = 1, this);
        e = g(e);
        for (var r = (t || document).querySelectorAll(e), o = 0; o < r.length; o++) this[o] = r[o];
        return this.length = r.length, this
    };
    v.prototype = h.prototype;
    var b = V;

    function L() {
        this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = h(this.doc), this.$win = h(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(b.PLUGINS)), this.opts.initOnClick ? (this.load(b.MODULES), this.$el.on("touchstart.init", function () {
            h(this).data("touched", !0)
        }), this.$el.on("touchmove.init", function () {
            h(this).removeData("touched")
        }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", function r(e) {
            if ("touchend" === e.type && !this.$el.data("touched")) return !0;
            if (1 === e.which || !e.which) {
                this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(b.MODULES), this.load(b.PLUGINS);
                var t = e.originalEvent && e.originalEvent.originalTarget;
                if (t && "IMG" === t.tagName && h(t).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" === e.type && this.image && e.originalEvent && e.originalEvent.target && h(e.originalEvent.target).is("img")) {
                    var n = this;
                    setTimeout(function () {
                        n.image.edit(h(e.originalEvent.target))
                    }, 100)
                }
                this.ready = !0, this.events.trigger("initialized")
            }
        }.bind(this)), this.events.trigger("initializationDelayed")) : (this.load(b.MODULES), this.load(b.PLUGINS), h(this.o_win).scrollTop(this.c_scroll), "undefined" == typeof this.ul && this.destroy(), this.ready = !0, this.events.trigger("initialized"))
    }
    return b.Bootstrap = function (e, t, n) {
        this.id = ++b.ID, this.$ = h;
        var r = {};
        "function" == typeof t && (n = t, t = {}), n && (t.events || (t.events = {}), t.events.initialized = n), t && t.documentReady && (r.toolbarButtons = [
            ["fullscreen", "undo", "redo", "getPDF", "print"],
            ["bold", "italic", "underline", "textColor", "backgroundColor", "clearFormatting"],
            ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
            ["formatOL", "formatUL", "indent", "outdent"],
            ["paragraphFormat"],
            ["fontFamily"],
            ["fontSize"],
            ["insertLink", "insertImage", "quote"]
        ], r.paragraphFormatSelection = !0, r.fontFamilySelection = !0, r.fontSizeSelection = !0, r.placeholderText = "", r.quickInsertEnabled = !1, r.charCounterCount = !1), this.opts = Object.assign({}, Object.assign({}, b.DEFAULTS, r, "object" === N(t) && t));
        var o = JSON.stringify(this.opts);
        b.OPTS_MAPPING[o] = b.OPTS_MAPPING[o] || this.id, this.sid = b.OPTS_MAPPING[o], b.SHARED[this.sid] = b.SHARED[this.sid] || {}, this.shared = b.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = h(e), this.$oel.data("froala.editor", this), this.o_doc = e.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow, this.c_scroll = h(this.o_win).scrollTop(), this._init()
    }, b.Bootstrap.prototype._init = function () {
        var e = this.$oel.get(0).tagName;
        this.$oel.closest("label").length;
        var t = function () {
            "TEXTAREA" !== e && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = h('<iframe src="about:blank" frameBorder="0">'), this.$wp = h("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.iframe_document = this.$iframe.get(0).contentWindow.document, this.$el = h(this.iframe_document.querySelector("body")), this.el = this.$el.get(0), this.$head = h(this.iframe_document.querySelector("head")), this.$html = h(this.iframe_document.querySelector("html"))) : (this.$el = h(this.o_doc.createElement("DIV")), this.el = this.$el.get(0), this.$wp = h(this.o_doc.createElement("DIV")).append(this.$el), this.$box.html(this.$wp)), setTimeout(L.bind(this), 0)
        }.bind(this),
            n = function () {
                this.$box = h("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val();
                var e = this;
                this.$oel.parents("form").on("submit.".concat(this.id), function () {
                    e.events.trigger("form.submit")
                }), this.$oel.parents("form").on("reset.".concat(this.id), function () {
                    e.events.trigger("form.reset")
                }), t()
            }.bind(this),
            r = function () {
                this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, setTimeout(L.bind(this), 0)
            }.bind(this),
            o = function () {
                this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, setTimeout(L.bind(this), 0)
            }.bind(this),
            i = function () {
                this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function (e) {
                    e.preventDefault()
                }), setTimeout(L.bind(this), 0)
            }.bind(this);
        this.opts.editInPopup ? i() : "TEXTAREA" === e ? n() : "A" === e ? r() : "IMG" === e ? o() : "BUTTON" === e || "INPUT" === e ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, i()) : t()
    }, b.Bootstrap.prototype.load = function (e) {
        for (var t in e)
            if (Object.prototype.hasOwnProperty.call(e, t)) {
                if (this[t]) continue;
                if (b.PLUGINS[t] && this.opts.pluginsEnabled.indexOf(t) < 0) continue;
                if (this[t] = new e[t](this), this[t]._init && (this[t]._init(), this.opts.initOnClick && "core" === t)) return !1
            }
    }, b.Bootstrap.prototype.destroy = function () {
        this.destrying = !0, this.shared.count--, this.events && this.events.$off();
        var e = this.html && this.html.get();
        if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events && (this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", [], !0)), 0 === this.shared.count) {
            for (var t in this.shared) Object.prototype.hasOwnProperty.call(this.shared, t) && (this.shared[t] = null, b.SHARED[this.sid][t] = null);
            delete b.SHARED[this.sid]
        }
        this.$oel.parents("form").off(".".concat(this.id)), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core && this.core.destroy(e), b.INSTANCES.splice(b.INSTANCES.indexOf(this), 1)
    }, V
});