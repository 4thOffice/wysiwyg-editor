/*!
 * froala_editor v3.2.6-1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2021 Froala Labs
 */

! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(require("froala-editor")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
}(this, function(p) {
    "use strict";
    p = p && p.hasOwnProperty("default") ? p["default"] : p, Object.assign(p.DEFAULTS, {
        listAdvancedTypes: !0
    }), p.PLUGINS.lists = function(d) {
        var f = d.$;

        function g(e) {
            return '<span class="fr-open-'.concat(e.toLowerCase(), '"></span>')
        }

        function m(e) {
            return '<span class="fr-close-'.concat(e.toLowerCase(), '"></span>')
        }

        function o(e, t) {
            ! function c(e, t) {
                for (var n = [], a = 0; a < e.length; a++) {
                    var r = e[a].parentNode;
                    "LI" == e[a].tagName && r.tagName != t && n.indexOf(r) < 0 && n.push(r)
                }
                for (var o = n.length - 1; 0 <= o; o--) {
                    var i = f(n[o]);
                    i.replaceWith("<".concat(t.toLowerCase(), " ").concat(d.node.attributes(i.get(0)), ">").concat(i.html(), "</").concat(t.toLowerCase(), ">"))
                }
            }(e, t);
            var n, a = d.html.defaultTag(),
                r = null;
            e.length && (n = "rtl" == d.opts.direction || "rtl" == f(e[0]).css("direction") ? "margin-right" : "margin-left");
            for (var o = 0; o < e.length; o++)
                if ("TD" != e[o].tagName && "TH" != e[o].tagName && "LI" != e[o].tagName) {
                    var i = d.helpers.getPX(f(e[o]).css(n)) || 0;
                    (e[o].style.marginLeft = null) === r && (r = i);
                    var l = 0 < r ? "<".concat(t, ' style="').concat(n, ": ").concat(r, 'px ">') : "<".concat(t, ">"),
                        s = "</".concat(t, ">");
                    for (i -= r; 0 < i / d.opts.indentMargin;) l += "</".concat(t, ">"), s += s, i -= d.opts.indentMargin;
                    a && e[o].tagName.toLowerCase() == a ? f(e[o]).replaceWith("".concat(l, "<li").concat(d.node.attributes(e[o]), ">").concat(f(e[o]).html(), "</li>").concat(s)) : f(e[o]).wrap("".concat(l, "<li></li>").concat(s))
                } d.clean.lists()
        }

        function i(e) {
            var t, n;
            for (t = e.length - 1; 0 <= t; t--)
                for (n = t - 1; 0 <= n; n--)
                    if (f(e[n]).find(e[t]).length || e[n] == e[t]) {
                        e.splice(t, 1);
                        break
                    } var a = [];
            for (t = 0; t < e.length; t++) {
                var r = f(e[t]),
                    o = e[t].parentNode,
                    i = r.attr("class");
                if (r.before(m(o.tagName)), "LI" == o.parentNode.tagName) r.before(m("LI")), r.after(g("LI"));
                else {
                    var l = "";
                    i && (l += ' class="'.concat(i, '"'));
                    var s = "rtl" == d.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left";
                    d.helpers.getPX(f(o).css(s)) && 0 <= (f(o).attr("style") || "").indexOf("".concat(s, ":")) && (l += ' style="'.concat(s, ":").concat(d.helpers.getPX(f(o).css(s)), 'px;"')), d.html.defaultTag() && 0 === r.find(d.html.blockTagsQuery()).length && r.wrapInner(d.html.defaultTag() + l), d.node.isEmpty(r.get(0), !0) || 0 !== r.find(d.html.blockTagsQuery()).length || r.append("<br>"), r.append(g("LI")), r.prepend(m("LI"))
                }
                r.after(g(o.tagName)), "LI" == o.parentNode.tagName && (o = o.parentNode.parentNode), a.indexOf(o) < 0 && a.push(o)
            }
            for (t = 0; t < a.length; t++) {
                var c = f(a[t]),
                    p = c.html();
                p = (p = p.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>")).replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), c.replaceWith(d.node.openTagString(c.get(0)) + p + d.node.closeTagString(c.get(0)))
            }
            d.$el.find("li:empty").remove(), d.$el.find("ul:empty, ol:empty").remove(), d.clean.lists(), d.html.wrap()
        }

        function s(e) {
            d.selection.save();
            for (var t = 0; t < e.length; t++) {
                var n = e[t].previousSibling;
                if (n) {
                    var a = f(e[t]).find("> ul, > ol").last().get(0);
                    if (a) {
                        var r = f(document.createElement("li"));
                        f(a).prepend(r);
                        for (var o = d.node.contents(e[t])[0]; o && !d.node.isList(o);) {
                            var i = o.nextSibling;
                            r.append(o), o = i
                        }
                        f(n).append(f(a)), f(e[t]).remove()
                    } else {
                        var l = f(n).find("> ul, > ol").last().get(0);
                        if (l) f(l).append(f(e[t]));
                        else {
                            var s = f("<".concat(e[t].parentNode.tagName, ">"));
                            f(n).append(s), s.append(f(e[t]))
                        }
                    }
                }
            }
            d.clean.lists(), d.selection.restore()
        }

        function c(e) {
            d.selection.save(), i(e), d.selection.restore()
        }

        function e(e) {
            if ("indent" == e || "outdent" == e) {
                var t = !1,
                    n = d.selection.blocks(),
                    a = [],
                    r = n[0].previousSibling || n[0].parentElement;
                    
                if ("outdent" == e) {
                    if ("UL" != r.parentNode.tagName && "OL" != r.parentNode.tagName && "LI" != r.parentNode.tagName) return;
                    if (!n[0].previousSibling && "none" == r.parentNode.style.listStyleType) return void
                    function i(e) {
                        for (d.selection.save(); 0 < e.childNodes.length;) e.parentNode.parentNode.append(e.childNodes[0]);
                        d.clean.lists(), d.selection.restore()
                    }(r)
                } else if (!n[0].previousSibling || "LI" != n[0].previousSibling.tagName) return void

                function l(e) {
                    d.selection.save();
                    for (var t = "OL" == e.tagName
                        ? document.createElement("ol")
                        : document.createElement("ul"); 0 < e.childNodes.length;
                    ) {
                            t.append(e.childNodes[0]);
                        }

                    var n = document.createElement("li");
                    n.style.listStyleType = "none", n.append(t), e.append(n), d.clean.lists(), d.selection.restore()
                }(r);

                for (var o = 0; o < n.length; o++) {
                    "LI" == n[o].tagName
                        ? (t = !0, a.push(n[o]))
                        : "LI" == n[o].parentNode.tagName && (t = !0, a.push(n[o].parentNode));
                }

                t && ("indent" == e ? s(a) : c(a))
            }
        }
        return {
            _init: function t() {
                d.events.on("commands.after", e),
                d.events.on("keydown", function(e) {
                    if (e.which == p.KEYCODE.TAB) {
                        for (var t = d.selection.blocks(), n = [], a = 0; a < t.length; a++) "LI" == t[a].tagName ? n.push(t[a]) : "LI" == t[a].parentNode.tagName && n.push(t[a].parentNode);
                        if (1 < n.length || n.length && (d.selection.info(n[0]).atStart || d.node.isEmpty(n[0]))) return e.preventDefault(), e.stopPropagation(), e.shiftKey ? c(n) : s(n), !1
                    }
                }, !0)
            },
            format: function l(e, t) {
                var n, a;
                for (d.html.syncInputs(), d.selection.save(), d.html.wrap(!0, !0, !0, !0), d.selection.restore(), a = d.selection.blocks(!0), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);
                if (d.selection.save(), function r(e, t) {
                        for (var n = !0, a = 0; a < e.length; a++) {
                            if ("LI" != e[a].tagName) return !1;
                            e[a].parentNode.tagName != t && (n = !1)
                        }
                        return n
                    }(a, e) ? t || i(a) : o(a, e), d.html.unwrap(), d.selection.restore(), t = t || "default") {
                    for (a = d.selection.blocks(), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);
                    for (n = 0; n < a.length; n++) "LI" == a[n].tagName && (f(a[n].parentNode).css("list-style-type", "default" === t ? "" : t), 0 === (f(a[n].parentNode).attr("style") || "").length && f(a[n].parentNode).removeAttr("style"))
                }
            },
            refresh: function r(e, t) {
                var n = f(d.selection.element());
                if (n.get(0) != d.el) {
                    var a = n.get(0);
                    (a = "LI" != a.tagName && a.firstElementChild && "LI" != a.firstElementChild.tagName ? n.parents("li").get(0) : "LI" == a.tagName || a.firstElementChild ? a.firstElementChild && "LI" == a.firstElementChild.tagName ? n.get(0).firstChild : n.get(0) : n.parents("li").get(0)) && a.parentNode.tagName == t && d.el.contains(a.parentNode) && e.addClass("fr-active")
                }
            }
        }
    }, p.DefineIcon("formatOLSimple", {
        NAME: "list-ol",
        SVG_KEY: "orderedList"
    }), p.RegisterCommand("formatOLSimple", {
        title: "Ordered List",
        type: "button",
        options: {
            "default": "Default",
            circle: "Circle",
            disc: "Disc",
            square: "Square"
        },
        refresh: function(e) {
            this.lists.refresh(e, "OL")
        },
        callback: function(e, t) {
            this.lists.format("OL", t)
        },
        plugin: "lists"
    }), p.RegisterCommand("formatUL", {
        title: `Unordered List (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+Shift+8)`,
        type: "button",
        hasOptions: function() {
            return this.opts.listAdvancedTypes
        },
        options: {
            "default": "Default",
            circle: "Circle",
            disc: "Disc",
            square: "Square"
        },
        refresh: function(e) {
            this.lists.refresh(e, "UL")
        },
        callback: function(e, t) {
            this.lists.format("UL", t)
        },
        plugin: "lists"
    }), p.RegisterCommand("formatOL", {
        title: `Ordered List (${navigator.userAgent.indexOf("Mac OS X") !== -1 ? '⌘': 'Ctrl'}+Shift+7)`,
        hasOptions: function() {
            return this.opts.listAdvancedTypes
        },
        options: {
            "default": "Default",
            "lower-alpha": "Lower Alpha",
            "lower-greek": "Lower Greek",
            "lower-roman": "Lower Roman",
            "upper-alpha": "Upper Alpha",
            "upper-roman": "Upper Roman"
        },
        refresh: function(e) {
            this.lists.refresh(e, "OL")
        },
        callback: function(e, t) {
            this.lists.format("OL", t)
        },
        plugin: "lists"
    }), p.DefineIcon("formatUL", {
        NAME: "list-ul",
        SVG_KEY: "unorderedList"
    }), p.DefineIcon("formatOL", {
        NAME: "list-ol",
        SVG_KEY: "orderedList"
    })
});