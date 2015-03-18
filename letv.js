try {
    document.domain = "letv.com"
} catch(e) {} (function(e) {
    if (e.LTK) return;
    var t = e.LTK = {
        version: "1.0.0"
    };
    var i = t.mods = {};
    var a = t.data = {};
    function s(e) {
        return function(t) {
            return {}.toString.call(t) === "[object " + e + "]"
        }
    }
    var n = Array.isArray || s("Array"),
    o = s("Function"),
    r = s("String"),
    d = s("Object");
    var l = /\\\\/g,
    c = /^\-([\w\.\/\-]*)$/;
    var h = /\w+\.\//g;
    var p = /\w+\.\w+\.\.\//;
    function f(e, t) {
        if (!/^\./.test(e)) return e;
        t = (t + e).replace(h, "");
        while (t.match(p)) {
            t = t.replace(p, "")
        }
        return t
    }
    function u(e) {
        var t = a.alias;
        return t && r(t[e]) ? t[e] : e
    }
    function v(e, t) {
        if (!e) return "";
        e = u(e);
        e = f(e, t);
        return e
    }
    function g(e) {
        if (e.exports !== null) return e.exports;
        for (var t in e.deps) {
            g(i[e.deps[t].id])
        }
        function a(t) {
            t = v(t, e.id);
            if (!i[t]) throw new Error(t + " not found.");
            return g(i[t])
        }
        a.async = a;
        var s = e.factory;
        var n = o(s) ? s(a, e.exports = {},
        e) : s;
        if (n === undefined) {
            n = e.exports
        }
        e.exports = n;
        delete e.factory;
        return n
    }
    var b = document,
    m = b.head || b.getElementsByTagName("head")[0] || b.documentElement;
    var _ = /\.css(?:\?|$)/i,
    y, T;
    var x = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536;
    function k(e, t, i, s) {
        var n = "onload" in e;
        if (i && (x || !n)) {
            setTimeout(function() {
                pollCss(e, t)
            },
            1);
            return
        }
        if (n) {
            e.onload = o;
            e.onerror = function() {
                o()
            }
        } else {
            e.onreadystatechange = function() {
                if (/loaded|complete/.test(e.readyState)) {
                    o()
                }
            }
        }
        function o() {
            e.onload = e.onerror = e.onreadystatechange = null;
            if (!i && !a.debug) {
                m.removeChild(e)
            }
            e = null;
            t()
        }
    }
    t.request = function(e, t, i) {
        var a = _.test(e);
        var s = b.createElement(a ? "link": "script");
        if (i) {
            var n = o(i) ? i(e) : i;
            if (n) {
                s.charset = n
            }
        }
        k(s, t, a, e);
        if (a) {
            s.rel = "stylesheet";
            s.href = e
        } else {
            s.async = true;
            s.src = e
        }
        y = s;
        m.appendChild(s);
        y = null
    };
    t.define = function(e, a, s) {
        var n = arguments.length;
        if (n === 1) {
            throw "module must has a id and factory."
        } else if (n === 2) {
            s = a;
            a = []
        }
        if (c.test(e)) e = RegExp.$1;
        var o = {
            id: e,
            deps: a,
            factory: s,
            exports: null
        };
        i[e] = o;
        RegExp.$1 == e && t.exec(e, true)
    };
    t.exec = function(e) {
        return g(i[e])
    };
    t.use = function(i, a) {
        if (!n(i)) i = [i];
        var s = [];
        for (var o = 0; o < i.length; o++) {
            s[o] = t.exec(i[o])
        }
        if (a) {
            a.apply(e, s)
        }
    };
    t.config = function(e) {
        for (var i in e) {
            var s = e[i];
            var o = a[i];
            if (o && d(o)) {
                for (var r in s) {
                    o[r] = s[r]
                }
            } else {
                if (n(o)) {
                    s = o.concat(s)
                }
                a[i] = s
            }
        }
        return t
    };
    t.require = function(e) {
        return t.exec(e)
    };
    e.define = t.define
})(window);
define("-extend.logger",
function(e, t, i) {
    var a = {
        init: function() {
            if (a.sip) {
                this.loadSocket();
                return
            }
            if (!location.search) return;
            var e = location.search.match(/\bsip=((\d+\.){3}\d+)/);
            if (e == null) return;
            a.sip = e[1];
            this.loadSocket()
        },
        loadSocket: function() {
            document.write('<script type="text/javascript" src="http://js.letvcdn.com/js/201405/07/lejs_1851/socket.io.min.js"></script>')
        },
        log: function(e) {}
    };
    a.sip = "";
    a.init();
    window.logger = a
}); (function() {
    if (typeof modjewel !== "undefined") return;
    if (!location.search) return;
    var e = location.search.match(/\bsip=((\d+\.){3}\d+)/);
    if (e == null || e.length < 2) return;
    var t = "http://" + e[1] + ":8080/target/target-script-min.js#anonymous";
    var i = document.createElement("script");
    i.setAttribute("src", t);
    document.getElementsByTagName("head")[0].appendChild(i)
})();
define("core.vjs",
function(e, t, i) {
    var a, s = [].filter,
    n = [].slice,
    o = {},
    r = /^\.([\w-]+)$/,
    d = /^#([\w-]*)$/,
    l = /^[\w-]+$/;
    var c = e("extend.detect");
    vjs = function(e, t) {
        return new vjs.fn.init(e, t)
    };
    vjs.isPC = false;
    var h = function(e, t) {
        var i;
        try {
            return b(e) && d.test(t) ? (i = e.getElementById(RegExp.$1)) ? [i] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : n.call(r.test(t) ? e.getElementsByClassName ? e.getElementsByClassName(RegExp.$1) : u(e, RegExp.$1) : l.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))
        } catch(a) {
            return []
        }
    };
    var p = function(e, t, i) {
        t = t || [];
        e.selector = i || "";
        e.length = t.length;
        for (var a = 0,
        s = t.length; a < s; a++) {
            e[a] = t[a]
        }
        return e
    };
    var f = function(e) {
        return e instanceof p
    };
    var u = function(e, t) {
        if (e.getElementsByTagName) {
            var i = e.getElementsByTagName("*");
            var a = new RegExp("(^|\\s)" + t + "(\\s|$)");
            for (var s = 0,
            n = i.length; s < n; s++) {
                if (a.test(i[s].className)) {
                    return [i[s]]
                }
            }
        }
        return []
    };
    vjs.fn = {
        init: function(e, t) {
            if (!e) return p(this);
            else if (e.nodeType) return p(this, [e]);
            else {
                var i;
                if (m(e)) i = y(e);
                else if (t !== a) return vjs(t).find(e);
                else i = h(document, e);
                return p(this, i, e)
            }
        },
        find: function(e) {
            var t, i = this;
            if (typeof e == "object") t = vjs(e).filter(function() {
                var e = this;
                return [].some.call(i,
                function(t) {
                    return vjs.contains(t, e)
                })
            });
            else if (this.length == 1) t = vjs(h(this[0], e));
            else t = this.map(function() {
                return h(this, e)
            });
            return t
        },
        each: function(e) {
            if ([].every) { [].every.call(this,
                function(t, i) {
                    return e.call(t, i, t) !== false
                })
            } else {
                for (var t = 0,
                i = this.length; t < i; t++) {
                    e.call(this[t], t, this[t])
                }
            }
            return this
        },
        hasClass: function(e) {
            var t = this[0];
            return new RegExp("(\\s|^)" + e + "(\\s|$)").test(t.className)
        },
        addClass: function(e) {
            var t = (e || "").split(/\s+/);
            return this.each(function() {
                var e = this.className;
                for (var i = 0,
                a = t.length; i < a; i++) {
                    if (!vjs(this).hasClass(t[i])) {
                        e += " " + t[i]
                    }
                }
                this.className = e
            })
        },
        removeClass: function(e) {
            var t = (e || "").split(/\s+/);
            return this.each(function() {
                var e = this.className;
                for (var i = 0,
                a = t.length; i < a; i++) {
                    var s = new RegExp("(\\s|^)" + t[i] + "(\\s|$)");
                    e = e.replace(s, " ")
                }
                this.className = vjs.trim(e)
            })
        },
        on: function(e, t, i) {
            return this.each(function(a, s) {
                var n = function(e) {
                    e.target = e.target || e.srcElement;
                    t.call(i, e)
                };
                if (!s["domid"]) s["domid"] = String(Math.random()).slice( - 4);
                var o = e + "_" + s["domid"];
                t[o] = n;
                if (s.addEventListener) {
                    s.addEventListener(e, n, false)
                } else if (s.attachEvent) {
                    s.attachEvent("on" + e, n)
                }
            })
        },
        off: function(e, t, i) {
            return this.each(function(i, a) {
                var s = e + "_" + a["domid"],
                n = t[s] || t;
                if (a.removeEventListener) {
                    a.removeEventListener(e, n, false)
                } else if (a.detachEvent) {
                    a.detachEvent("on" + e, n)
                }
            })
        },
        getStyle: function(e) {
            var t = this[0];
            if (c.msie) {
                switch (e) {
                case "opacity":
                    return (t.filters["DXImageTransform.Microsoft.Alpha"] || t.filters["alpha"] || {}).opacity || 100;
                case "float":
                    e = "styleFloat"
                }
                return t.style[e] || t.currentStyle ? t.currentStyle[e] : 0
            } else {
                if (e == "float") {
                    e = "cssFloat"
                }
                return t.style[e] || (document.defaultView.getComputedStyle(t, "") ? document.defaultView.getComputedStyle(t, "")[e] : null) || 0
            }
        },
        setStyle: function(e, t) {
            return this.each(function() {
                var i = this;
                if (c.msie) {
                    switch (e) {
                    case "opacity":
                        i.style.filter = "alpha(opacity=" + t * 100 + ")";
                        if (!i.currentStyle || !i.currentStyle.hasLayout) {
                            i.style.zoom = 1
                        }
                        return;
                    case "float":
                        e = "styleFloat"
                    }
                } else {
                    if (e == "float") {
                        e = "cssFloat"
                    }
                }
                i.style[e] = t
            })
        },
        getAttr: function(e) {
            var t = this[0];
            return t.getAttribute(e)
        },
        setAttr: function(e, t) {
            return this.each(function() {
                var i = this;
                i.setAttribute(e, t)
            })
        },
        offset: function() {
            var e = this[0];
            var t = document.body,
            i = e.getBoundingClientRect();
            return {
                top: i.top + (window.scrollY || t.parentNode.scrollTop || e.scrollTop) - (document.documentElement.clientTop || t.clientTop || 0),
                left: i.left + (window.scrollX || t.parentNode.scrollLeft || e.scrollLeft) - (document.documentElement.clientLeft || t.clientLeft || 0)
            }
        },
        width: function(e) {
            if (typeof e == "undefined") {
                return this[0].offsetWidth
            }
            this[0].style.width = parseFloat(e) + "px"
        },
        height: function(e) {
            if (typeof e == "undefined") {
                return this[0].offsetHeight
            }
            this[0].style.height = parseFloat(e) + "px"
        },
        map: function(e) {
            return vjs(vjs.map(this,
            function(t, i) {
                return e.call(t, i, t)
            }))
        }
    };
    vjs.fn.init.prototype = vjs.fn;
    function v(e) {
        return e == null ? String(e) : o[toString.call(e)] || "object"
    }
    function g(e) {
        return v(e) == "function"
    }
    function b(e) {
        return e != null && (e.nodeType == 9 || e.nodeType == e.DOCUMENT_NODE)
    }
    function m(e) {
        return e instanceof Array
    }
    function _(e) {
        return typeof e.length == "number"
    }
    function y(e) {
        return s.call(e,
        function(e) {
            return e != null
        })
    }
    function T(e, t) {
        var i = e.className,
        s = i && i.baseVal !== a;
        if (t === a) return s ? i.baseVal: i;
        s ? i.baseVal = t: e.className = t
    }
    function x(e, t, i, a) {
        return g(t) ? t.call(e, i, a) : t
    }
    vjs.contains = function(e, t) {
        return e !== t && e.contains(t)
    };
    vjs.map = function(e, t) {
        var i, a = [],
        s,
        n;
        if (_(e)) for (s = 0; s < e.length; s++) {
            i = t(e[s], s);
            if (i != null) a.push(i)
        } else for (n in e) {
            i = t(e[n], n);
            if (i != null) a.push(i)
        }
        return a
    };
    vjs.each = function(e, t) {
        var i, a;
        if (_(e)) {
            for (i = 0; i < e.length; i++) if (t.call(this, i, e[i]) === false) return e
        } else {
            for (a in e) if (t.call(this, a, e[a]) === false) return e
        }
        return e
    };
    vjs.trim = function(e) {
        return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    };
    vjs.each("Boolean Number String Function Array Date RegExp Object".split(" "),
    function(e, t) {
        o["[object " + t + "]"] = t.toLowerCase()
    });
    vjs.extend = function(e) {
        var t, i;
        e = e || {};
        t = e["init"] || e.init || this.prototype["init"] || this.prototype.init ||
        function() {};
        i = function() {
            t.apply(this, arguments)
        };
        i.prototype = vjs.create(this.prototype);
        i.prototype.constructor = i;
        if (!e.__proto__) e.__proto__ = i.prototype;
        i.extend = vjs.extend;
        for (var a in e) {
            if (e.hasOwnProperty(a)) {
                i.prototype[a] = e[a]
            }
        }
        return i
    };
    vjs.create = function(e) {
        function t() {}
        t.prototype = e;
        return new t
    };
    vjs.getWinWH = function() {
        var e = window.innerWidth,
        t = window.innerHeight;
        if (typeof e != "number") {
            if (document.compatMode == "CSS1Compat") {
                e = document.documentElement.clientWidth;
                t = document.documentElement.clientHeight
            } else {
                e = document.body.clientWidth;
                t = document.body.clientHeight
            }
        }
        return {
            width: e,
            height: t
        }
    };
    vjs.safari = c.safari;
    return vjs
});
define("core.event",
function(e, t, i) {
    var a = [].slice,
    s = /\s+/,
    n = function() {
        return false
    },
    o = function() {
        return true
    };
    function r(e, t, i) { (e || "").split(s).forEach(function(e) {
            i(e, t)
        })
    }
    function d(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }
    function l(e) {
        var t = ("" + e).split(".");
        return {
            e: t[0],
            ns: t.slice(1).sort().join(" ")
        }
    }
    function c(e, t, i, a) {
        var s, n;
        n = l(t);
        n.ns && (s = d(n.ns));
        return e.filter(function(e) {
            return e && (!n.e || e.e === n.e) && (!n.ns || s.test(e.ns)) && (!i || e.cb === i || e.cb._cb === i) && (!a || e.ctx === a)
        })
    }
    function h(e, t) {
        if (! (this instanceof h)) {
            return new h(e, t)
        }
        t && $.extend(this, t);
        this.type = e;
        return this
    }
    h.prototype = {
        isDefaultPrevented: n,
        isPropagationStopped: n,
        preventDefault: function() {
            this.isDefaultPrevented = o
        },
        stopPropagation: function() {
            this.isPropagationStopped = o
        }
    };
    var p = {
        on: function(e, t, i) {
            var a = this,
            s;
            if (!t) {
                return this
            }
            s = this._events || (this._events = []);
            r(e, t,
            function(e, t) {
                var n = l(e);
                n.cb = t;
                n.ctx = i;
                n.ctx2 = i || a;
                n.id = s.length;
                s.push(n)
            });
            return this
        },
        one: function(e, t, i) {
            var a = this;
            if (!t) {
                return this
            }
            r(e, t,
            function(e, t) {
                var s = function() {
                    a.off(e, s);
                    return t.apply(i || a, arguments)
                };
                s._cb = t;
                a.on(e, s, i)
            });
            return this
        },
        off: function(e, t, i) {
            var a = this._events;
            if (!a) {
                return this
            }
            if (!e && !t && !i) {
                this._events = [];
                return this
            }
            r(e, t,
            function(e, t) {
                c(a, e, t, i).forEach(function(e) {
                    delete a[e.id]
                })
            });
            return this
        },
        trigger: function(e) {
            var t = -1,
            i, s, n, o, r;
            if (!this._events || !e) {
                return this
            }
            typeof e === "string" && (e = new h(e));
            i = a.call(arguments, 1);
            e.args = i;
            s = c(this._events, e.type);
            if (s) {
                o = s.length;
                while (++t < o) {
                    if ((n = e.isPropagationStopped()) || false === (r = s[t]).cb.call(r.ctx2, e)) {
                        n || (e.stopPropagation(), e.preventDefault());
                        break
                    }
                }
            }
            return this
        }
    };
    i.exports = p
});
define("extend.detect",
function(e, t, i) {
    var a; (function() {
        var e = navigator.userAgent.toLowerCase();
        a = {
            iPhone: /iphone/.test(e),
            iPad: /ipad/.test(e),
            iPod: /ipod/.test(e),
            mac: /macintosh/.test(e),
            isLetv: /letv/.test(e),
            Android: /android/.test(e),
            AndroidPad: /android/.test(e) && !/mobile/.test(e),
            atwin: /win/.test(e),
            opera: /opera/.test(e),
            msie: /msie/.test(e),
            firefox: /firefox/.test(e),
            safari: /safari/.test(e) && !/chrome/.test(e),
            wph: /windows phone/.test(e),
            ps: /playstation/.test(e),
            uc: /ucbrowser|ucweb/.test(e),
            qq: /mqqbrowser/.test(e),
            xiaomi: /xiaomi/.test(e),
            weixin: /micromessenger/i.test(e),
            weibo: /__weibo__/i.test(e),
            isLetvTv: function() {
                try {
                    return typeof LetvFish.getBrowserType == "function"
                } catch(e) {
                    return false
                }
            }
        };
        var t = /(webkit)[ \/]([\w.]+)/,
        i = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        s = /(msie) ([\w.]+)/,
        n = /(mozilla)(?:.*? rv:([\w.]+))?/;
        var o = t.exec(e) || i.exec(e) || s.exec(e) || e.indexOf("compatible") < 0 && n.exec(e) || [];
        a.version = o[2] || "0"
    })();
    i.exports = a
});
define("extend.lib",
function(e, t, i) {
    var a = Function.prototype.bind,
    s = Array.prototype.slice;
    i.exports = {
        getParamVal: function(e, t) {
            var i = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i");
            var a = e.match(i);
            if (a != null) return unescape(a[2]);
            return ""
        },
        inheritFrom: function(e, t) {
            var i = function() {};
            i.prototype = e.prototype;
            t.prototype = new i;
            t.prototype.constructor = t;
            t.superclass = e.prototype;
            if (e.prototype.constructor == Object.prototype.constructor) {
                e.prototype.constructor = e
            }
        },
        merge: function(e, t, i) {
            if (!t) {
                t = {}
            }
            for (var a in t) {
                if (t.hasOwnProperty(a) && (!i || !e.hasOwnProperty(a))) {
                    e[a] = t[a]
                }
            }
            return e
        },
        setCookie: function(e, t, i) {
            i = i || {};
            if (t === null) {
                t = "";
                i.expires = -1
            }
            var a = "";
            if (i.expires && (typeof i.expires == "number" || i.expires.toUTCString)) {
                var s;
                if (typeof i.expires == "number") {
                    s = new Date;
                    s.setTime(s.getTime() + i.expires * 24 * 60 * 60 * 1e3)
                } else {
                    s = i.expires
                }
                a = "; expires=" + s.toUTCString()
            }
            var n = i.path ? "; path=" + i.path: "";
            var o = i.domain ? "; domain=" + i.domain: "";
            var r = i.secure ? "; secure": "";
            document.cookie = [e, "=", encodeURIComponent(t), a, n, o, r].join("")
        },
        getCookie: function(e) {
            var t, i = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            if (t = document.cookie.match(i)) return unescape(t[2]);
            else return ""
        },
        getJSON: function(e, t, i, a, s) {
            var n = this.now(),
            o = "vjs_" + n + Math.floor(Math.random() * 100),
            r = "$1" + o + "$2",
            d = 0,
            l = 0,
            c = this,
            h,
            p = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            if (!/_r=/i.test(e)) e += "&_r=?";
            e = e.replace(/(\=)\?(&|$)|\?\?/i, r);
            a = a || 5e3;
            s = s || 2;
            window[o] = function(e) {
                f();
                vjs.responseTime = c.now() - n;
                vjs.retryCount = d;
                t.call(this, e, {
                    responseTime: c.now() - n,
                    retryCount: d
                });
                window[o] = null
            };
            var f = function() {
                clearTimeout(l);
                if (h && h.parentNode) {
                    p.removeChild(h);
                    h.onload = h.onreadystatechange = null;
                    h = undefined
                }
            };
            var u = function() {
                f();
                if (d >= s) {
                    clearTimeout(l);
                    window[o] = null;
                    i && i.call(this);
                    return
                }
                e = e.replace(/&_r=[\d|\?]+/i, "&_r=" + d);
                h = document.createElement("script");
                h.setAttribute("type", "text/javascript");
                h.setAttribute("src", e);
                h.onload = h.onreadystatechange = function(e) {
                    clearTimeout(l)
                };
                p.insertBefore(h, p.firstChild);
                l = setTimeout(u, a);
                d++
            };
            u()
        },
        timer: function(e, t) {
            var i = 0,
            a = false,
            s;
            return {
                repeatCount: function() {
                    return i
                },
                delay: function() {
                    return e
                },
                running: function() {
                    return a
                },
                start: function() {
                    s && clearInterval(s);
                    i = 0;
                    a = true;
                    s = setInterval(function() {
                        i++;
                        if (t) t()
                    },
                    e)
                },
                stop: function() {
                    clearInterval(s);
                    a = false
                },
                reset: function() {
                    i = 0;
                    s || this.start()
                }
            }
        },
        bind: function(e, t) {
            if (e.bind === a && a) return a.apply(e, s.call(arguments, 1));
            var i = s.call(arguments, 2);
            return function() {
                return e.apply(t, i.concat(s.call(arguments)))
            }
        },
        createOrientationChangeProxy: function(e) {
            var t, i;
            return function() {
                clearTimeout(t);
                var a = Array.prototype.slice.call(arguments, 0);
                t = setTimeout(function() {
                    var t = window.orientation;
                    if (t != i) {
                        e(a)
                    }
                    i = t
                },
                400)
            }
        },
        createElement: function(e, t) {
            var i = document.createElement(e),
            a;
            for (a in t) {
                if (t.hasOwnProperty(a)) {
                    if (a.indexOf("-") !== -1) {
                        i.setAttribute(a, t[a])
                    } else {
                        i[a] = t[a]
                    }
                }
            }
            return i
        },
        now: Date.now ||
        function() {
            return + new Date
        },
        formatTime: function(e) {
            var t = Math.floor(e / 60);
            t = t < 10 ? "0" + t: t.toString();
            var i = Math.floor(e % 60);
            i = i < 10 ? "0" + i: i.toString();
            return t + ":" + i
        }
    }
});
define("extend.base64",
function(e, t, i) {
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var s = new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    function n(e) {
        var t, i, s;
        var n, o, r;
        s = e.length;
        i = 0;
        t = "";
        while (i < s) {
            n = e.charCodeAt(i++) & 255;
            if (i == s) {
                t += a.charAt(n >> 2);
                t += a.charAt((n & 3) << 4);
                t += "==";
                break
            }
            o = e.charCodeAt(i++);
            if (i == s) {
                t += a.charAt(n >> 2);
                t += a.charAt((n & 3) << 4 | (o & 240) >> 4);
                t += a.charAt((o & 15) << 2);
                t += "=";
                break
            }
            r = e.charCodeAt(i++);
            t += a.charAt(n >> 2);
            t += a.charAt((n & 3) << 4 | (o & 240) >> 4);
            t += a.charAt((o & 15) << 2 | (r & 192) >> 6);
            t += a.charAt(r & 63)
        }
        return t
    }
    function o(e) {
        var t, i, a, n;
        var o, r, d;
        r = e.length;
        o = 0;
        d = "";
        while (o < r) {
            do {
                t = s[e.charCodeAt(o++) & 255]
            } while ( o < r && t == - 1 );
            if (t == -1) break;
            do {
                i = s[e.charCodeAt(o++) & 255]
            } while ( o < r && i == - 1 );
            if (i == -1) break;
            d += String.fromCharCode(t << 2 | (i & 48) >> 4);
            do {
                a = e.charCodeAt(o++) & 255;
                if (a == 61) return d;
                a = s[a]
            } while ( o < r && a == - 1 );
            if (a == -1) break;
            d += String.fromCharCode((i & 15) << 4 | (a & 60) >> 2);
            do {
                n = e.charCodeAt(o++) & 255;
                if (n == 61) return d;
                n = s[n]
            } while ( o < r && n == - 1 );
            if (n == -1) break;
            d += String.fromCharCode((a & 3) << 6 | n)
        }
        return d
    }
    function r(e) {
        var t, i, a, s;
        t = "";
        a = e.length;
        for (i = 0; i < a; i++) {
            s = e.charCodeAt(i);
            if (s >= 1 && s <= 127) {
                t += e.charAt(i)
            } else if (s > 2047) {
                t += String.fromCharCode(224 | s >> 12 & 15);
                t += String.fromCharCode(128 | s >> 6 & 63);
                t += String.fromCharCode(128 | s >> 0 & 63)
            } else {
                t += String.fromCharCode(192 | s >> 6 & 31);
                t += String.fromCharCode(128 | s >> 0 & 63)
            }
        }
        return t
    }
    function d(e) {
        var t, i, a, s;
        var n, o;
        t = "";
        a = e.length;
        i = 0;
        while (i < a) {
            s = e.charCodeAt(i++);
            switch (s >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                t += e.charAt(i - 1);
                break;
            case 12:
            case 13:
                n = e.charCodeAt(i++);
                t += String.fromCharCode((s & 31) << 6 | n & 63);
                break;
            case 14:
                n = e.charCodeAt(i++);
                o = e.charCodeAt(i++);
                t += String.fromCharCode((s & 15) << 12 | (n & 63) << 6 | (o & 63) << 0);
                break
            }
        }
        return t
    }
    i.exports = {
        encode: n,
        decode: o
    }
});
define("extend.md5",
function(e, t, i) {
    return function(e) {
        function t(e, t) {
            return e << t | e >>> 32 - t
        }
        function i(e, t) {
            var i, a, s, n, o;
            s = e & 2147483648;
            n = t & 2147483648;
            i = e & 1073741824;
            a = t & 1073741824;
            o = (e & 1073741823) + (t & 1073741823);
            if (i & a) {
                return o ^ 2147483648 ^ s ^ n
            }
            if (i | a) {
                if (o & 1073741824) {
                    return o ^ 3221225472 ^ s ^ n
                } else {
                    return o ^ 1073741824 ^ s ^ n
                }
            } else {
                return o ^ s ^ n
            }
        }
        function a(e, t, i) {
            return e & t | ~e & i
        }
        function s(e, t, i) {
            return e & i | t & ~i
        }
        function n(e, t, i) {
            return e ^ t ^ i
        }
        function o(e, t, i) {
            return t ^ (e | ~i)
        }
        function r(e, s, n, o, r, d, l) {
            e = i(e, i(i(a(s, n, o), r), l));
            return i(t(e, d), s)
        }
        function d(e, a, n, o, r, d, l) {
            e = i(e, i(i(s(a, n, o), r), l));
            return i(t(e, d), a)
        }
        function l(e, a, s, o, r, d, l) {
            e = i(e, i(i(n(a, s, o), r), l));
            return i(t(e, d), a)
        }
        function c(e, a, s, n, r, d, l) {
            e = i(e, i(i(o(a, s, n), r), l));
            return i(t(e, d), a)
        }
        function h(e) {
            var t;
            var i = e.length;
            var a = i + 8;
            var s = (a - a % 64) / 64;
            var n = (s + 1) * 16;
            var o = Array(n - 1);
            var r = 0;
            var d = 0;
            while (d < i) {
                t = (d - d % 4) / 4;
                r = d % 4 * 8;
                o[t] = o[t] | e.charCodeAt(d) << r;
                d++
            }
            t = (d - d % 4) / 4;
            r = d % 4 * 8;
            o[t] = o[t] | 128 << r;
            o[n - 2] = i << 3;
            o[n - 1] = i >>> 29;
            return o
        }
        function p(e) {
            var t = "",
            i = "",
            a, s;
            for (s = 0; s <= 3; s++) {
                a = e >>> s * 8 & 255;
                i = "0" + a.toString(16);
                t = t + i.substr(i.length - 2, 2)
            }
            return t
        }
        function f(e) {
            e = e.replace(/\r\n/g, "\n");
            var t = "";
            for (var i = 0; i < e.length; i++) {
                var a = e.charCodeAt(i);
                if (a < 128) {
                    t += String.fromCharCode(a)
                } else if (a > 127 && a < 2048) {
                    t += String.fromCharCode(a >> 6 | 192);
                    t += String.fromCharCode(a & 63 | 128)
                } else {
                    t += String.fromCharCode(a >> 12 | 224);
                    t += String.fromCharCode(a >> 6 & 63 | 128);
                    t += String.fromCharCode(a & 63 | 128)
                }
            }
            return t
        }
        var u = Array();
        var v, g, b, m, _, y, T, x, k;
        var w = 7,
        E = 12,
        P = 17,
        A = 22;
        var C = 5,
        S = 9,
        D = 14,
        L = 20;
        var I = 4,
        V = 11,
        O = 16,
        B = 23;
        var j = 6,
        M = 10,
        R = 15,
        U = 21;
        e = f(e);
        u = h(e);
        y = 1732584193;
        T = 4023233417;
        x = 2562383102;
        k = 271733878;
        for (v = 0; v < u.length; v += 16) {
            g = y;
            b = T;
            m = x;
            _ = k;
            y = r(y, T, x, k, u[v + 0], w, 3614090360);
            k = r(k, y, T, x, u[v + 1], E, 3905402710);
            x = r(x, k, y, T, u[v + 2], P, 606105819);
            T = r(T, x, k, y, u[v + 3], A, 3250441966);
            y = r(y, T, x, k, u[v + 4], w, 4118548399);
            k = r(k, y, T, x, u[v + 5], E, 1200080426);
            x = r(x, k, y, T, u[v + 6], P, 2821735955);
            T = r(T, x, k, y, u[v + 7], A, 4249261313);
            y = r(y, T, x, k, u[v + 8], w, 1770035416);
            k = r(k, y, T, x, u[v + 9], E, 2336552879);
            x = r(x, k, y, T, u[v + 10], P, 4294925233);
            T = r(T, x, k, y, u[v + 11], A, 2304563134);
            y = r(y, T, x, k, u[v + 12], w, 1804603682);
            k = r(k, y, T, x, u[v + 13], E, 4254626195);
            x = r(x, k, y, T, u[v + 14], P, 2792965006);
            T = r(T, x, k, y, u[v + 15], A, 1236535329);
            y = d(y, T, x, k, u[v + 1], C, 4129170786);
            k = d(k, y, T, x, u[v + 6], S, 3225465664);
            x = d(x, k, y, T, u[v + 11], D, 643717713);
            T = d(T, x, k, y, u[v + 0], L, 3921069994);
            y = d(y, T, x, k, u[v + 5], C, 3593408605);
            k = d(k, y, T, x, u[v + 10], S, 38016083);
            x = d(x, k, y, T, u[v + 15], D, 3634488961);
            T = d(T, x, k, y, u[v + 4], L, 3889429448);
            y = d(y, T, x, k, u[v + 9], C, 568446438);
            k = d(k, y, T, x, u[v + 14], S, 3275163606);
            x = d(x, k, y, T, u[v + 3], D, 4107603335);
            T = d(T, x, k, y, u[v + 8], L, 1163531501);
            y = d(y, T, x, k, u[v + 13], C, 2850285829);
            k = d(k, y, T, x, u[v + 2], S, 4243563512);
            x = d(x, k, y, T, u[v + 7], D, 1735328473);
            T = d(T, x, k, y, u[v + 12], L, 2368359562);
            y = l(y, T, x, k, u[v + 5], I, 4294588738);
            k = l(k, y, T, x, u[v + 8], V, 2272392833);
            x = l(x, k, y, T, u[v + 11], O, 1839030562);
            T = l(T, x, k, y, u[v + 14], B, 4259657740);
            y = l(y, T, x, k, u[v + 1], I, 2763975236);
            k = l(k, y, T, x, u[v + 4], V, 1272893353);
            x = l(x, k, y, T, u[v + 7], O, 4139469664);
            T = l(T, x, k, y, u[v + 10], B, 3200236656);
            y = l(y, T, x, k, u[v + 13], I, 681279174);
            k = l(k, y, T, x, u[v + 0], V, 3936430074);
            x = l(x, k, y, T, u[v + 3], O, 3572445317);
            T = l(T, x, k, y, u[v + 6], B, 76029189);
            y = l(y, T, x, k, u[v + 9], I, 3654602809);
            k = l(k, y, T, x, u[v + 12], V, 3873151461);
            x = l(x, k, y, T, u[v + 15], O, 530742520);
            T = l(T, x, k, y, u[v + 2], B, 3299628645);
            y = c(y, T, x, k, u[v + 0], j, 4096336452);
            k = c(k, y, T, x, u[v + 7], M, 1126891415);
            x = c(x, k, y, T, u[v + 14], R, 2878612391);
            T = c(T, x, k, y, u[v + 5], U, 4237533241);
            y = c(y, T, x, k, u[v + 12], j, 1700485571);
            k = c(k, y, T, x, u[v + 3], M, 2399980690);
            x = c(x, k, y, T, u[v + 10], R, 4293915773);
            T = c(T, x, k, y, u[v + 1], U, 2240044497);
            y = c(y, T, x, k, u[v + 8], j, 1873313359);
            k = c(k, y, T, x, u[v + 15], M, 4264355552);
            x = c(x, k, y, T, u[v + 6], R, 2734768916);
            T = c(T, x, k, y, u[v + 13], U, 1309151649);
            y = c(y, T, x, k, u[v + 4], j, 4149444226);
            k = c(k, y, T, x, u[v + 11], M, 3174756917);
            x = c(x, k, y, T, u[v + 2], R, 718787259);
            T = c(T, x, k, y, u[v + 9], U, 3951481745);
            y = i(y, g);
            T = i(T, b);
            x = i(x, m);
            k = i(k, _)
        }
        var N = p(y) + p(T) + p(x) + p(k);
        return N.toLowerCase()
    }
});
define("extend.fullscreen",
function(e, t, i) {
    var a = function(e) {
        var i = ["webkit", "moz"];
        var a, s, n, o;
        for (var r = 0,
        d = i.length; r < d; r++) {
            var l = i[r] + "RequestFullScreen",
            c = i[r] + "CancelFullScreen";
            if (typeof e[l] == "function") {
                a = l;
                n = e
            }
            if (typeof document[c] == "function") {
                s = c;
                o = document
            }
        }
        if (!a && typeof e["webkitEnterFullScreen"] == "function") {
            a = "webkitEnterFullScreen";
            n = e
        }
        if (!s && typeof e["webkitExitFullScreen"] == "function") {
            s = "webkitExitFullScreen";
            o = e
        }
        t.requestFn = a;
        t.requestEl = n;
        t.cancelFn = s;
        t.cancelEl = o
    };
    t.checkFullScreenFn = a
});
define("extend.touchable",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("core.event");
    var n = function(e, t) {
        this.node = e;
        this.inDoubleTap = false;
        this.isOneFingerGesture = false;
        this.doubleTapTimer = null;
        this.longTapTimer = null;
        t = t || {};
        this.startTouch = {
            x: 0,
            y: 0
        };
        this.currentTouch = {
            x: 0,
            y: 0
        };
        this.previousTouch = {
            x: 0,
            y: 0
        };
        this.currentDelta = {
            x: 0,
            y: 0
        };
        this.currentStartDelta = {
            x: 0,
            y: 0
        };
        this.eventNode = t.isTargetNode ? this.node: document;
        this.touchStartFn = a.bind(this.touchStart, this);
        this.touchMoveFn = a.bind(this.touchMove, this);
        this.touchEndFn = a.bind(this.touchEnd, this);
        if (vjs.isPC) {
            this.node.addEventListener("mousedown", this.touchStartFn, false)
        } else {
            this.node.addEventListener("touchstart", this.touchStartFn, false)
        }
    };
    n.prototype = {
        touchStart: function(e) {
            var t = this;
            this.reset();
            if (e.touches) {
                if (!e.touches.length || this.isCurrentlyTouching) {
                    return false
                }
                this.isCurrentlyTouching = true;
                this.isOneFingerGesture = e.touches.length == 1;
                if (e.touches.length == 1) {
                    this.startTouch.x = this.currentTouch.x = e.touches[0].clientX;
                    this.startTouch.y = this.currentTouch.y = e.touches[0].clientY
                } else if (e.touches.length > 1) {
                    var i = [];
                    for (var a = 0,
                    s = e.touches.length; a < s; a++) {
                        i.push(e.touches[a])
                    }
                    i.sort(o);
                    var s = i.length - 1;
                    this.startTouch.x = this.currentTouch.x = i[s].clientX;
                    this.startTouch.y = this.currentTouch.y = i[s].clientY
                }
                this.eventNode.addEventListener("touchmove", this.touchMoveFn, false);
                this.eventNode.addEventListener("touchend", this.touchEndFn, false)
            } else {
                this.startTouch.x = this.currentTouch.x = e.pageX;
                this.startTouch.y = this.currentTouch.y = e.pageY;
                this.eventNode.addEventListener("mousemove", this.touchMoveFn, false);
                this.eventNode.addEventListener("mouseup", this.touchEndFn, false)
            }
            this.target = e.target;
            this.currentTarget = e.currentTarget;
            this.hitTarget = document.elementFromPoint ? document.elementFromPoint(this.startTouch.x, this.startTouch.y) : null;
            if (!this.inDoubleTap) {
                this.inDoubleTap = true;
                this.doubleTapTimer = setTimeout(function() {
                    t.inDoubleTap = false
                },
                500)
            } else {
                this.trigger("doubleTouch", this);
                clearTimeout(t.doubleTapTimer);
                this.inDoubleTap = false
            }
            this.longTapTimer = setTimeout(function() {
                t.trigger("longTouch", t)
            },
            1e3);
            this.trigger("touchstart", this, e)
        },
        touchMove: function(e) {
            this.previousTouch.x = this.currentTouch.x;
            this.previousTouch.y = this.currentTouch.y;
            if (e.touches) {
                if (!e.touches.length || !this.isOneFingerGesture) return;
                if (e.touches.length > 1) {
                    this.isOneFingerGesture = false;
                    return
                }
                this.currentTouch.x = e.touches[0].clientX;
                this.currentTouch.y = e.touches[0].clientY
            } else {
                this.currentTouch.x = e.pageX;
                this.currentTouch.y = e.pageY
            }
            this.currentDelta.x = this.currentTouch.x - this.previousTouch.x;
            this.currentDelta.y = this.currentTouch.y - this.previousTouch.y;
            this.currentStartDelta.x = this.currentTouch.x - this.startTouch.x;
            this.currentStartDelta.y = this.currentTouch.y - this.startTouch.y;
            this.target = e.target;
            this.currentTarget = e.currentTarget;
            this.trigger("touchmove", this, e);
            if (this.longTapTimer) clearTimeout(this.longTapTimer)
        },
        touchEnd: function(e) {
            if (e.touches) {
                if (e.targetTouches.length) return;
                this.eventNode.removeEventListener("touchmove", this.touchMoveFn, false);
                this.eventNode.removeEventListener("touchend", this.touchEndFn, false)
            } else {
                this.eventNode.removeEventListener("mousemove", this.touchMoveFn, false);
                this.eventNode.removeEventListener("mouseup", this.touchEndFn, false)
            }
            this.isCurrentlyTouching = false;
            if (this.longTapTimer) clearTimeout(this.longTapTimer);
            this.trigger("touchend", this, e)
        },
        reset: function() {
            this.startTouch = {
                x: 0,
                y: 0
            };
            this.currentTouch = {
                x: 0,
                y: 0
            };
            this.previousTouch = {
                x: 0,
                y: 0
            };
            this.currentDelta = {
                x: 0,
                y: 0
            };
            this.currentStartDelta = {
                x: 0,
                y: 0
            }
        }
    };
    a.merge(n.prototype, s);
    function o(e, t) {
        return e.clientY - t.clientY
    }
    i.exports = n
});
define("extend.storage",
function(e, t, i) {
    var a, s = Object.toJSON || window.JSON && (JSON.encode || JSON.stringify),
    n = window.JSON && (JSON.decode || JSON.parse) ||
    function(e) {
        return String(e).evalJSON()
    };
    try {
        if ("localStorage" in window) a = window.localStorage;
        else if ("globalStorage" in window) a = window.globalStorage[window.location.hostname]
    } catch(o) {}
    var r = function(e, t) {
        try {
            a.removeItem(e);
            var i = s(t);
            a.setItem(e, i)
        } catch(n) {
            a[e] = s(t)
        }
    };
    var d = function(e, t) {
        if (e in a) {
            try {
                return n(a.getItem(e))
            } catch(i) {
                return n(a[e])
            }
        }
        return typeof t == "undefined" ? null: t
    };
    i.exports = {
        set: r,
        get: d
    }
});
define("module.h5player",
function(e, t, i) {
    var a = e("core.vjs"),
    s = e("./h5model"),
    n = e("extend.lib"),
    o = e("extend.detect"),
    r = e("core.event"),
    d = e("view.tpl"),
    l = e("./user"),
    c = e("./controller"),
    h = e("proxy.pingback").instances,
    p = e("proxy.history").instances;
    var f = {};
    function u(e) {
        f[e.cont] = this;
        this.options = e;
        this.init(e)
    }
    u.prototype = {
        init: function(e) {
            this.model = new s.H5Model(e);
            this.loadCss();
            this.controller = new c(this.model);
            this.controller.callback = n.bind(this.callback, this);
            var t = this.model.option;
            if (t.flashvar && t.flashvar.callbackJs) {
                var i = t.flashvar.callbackJs;
                this.IPlayer = new Function("status", "data", i + "(status,data)")
            }
            this.pingback = h[t.cont];
            this.history = p[t.cont];
            this.pingback.sendEnv();
            this.evt = this.model.events;
            this.evt.on("setVideoEnable TO_PlayNext Player_Callback", this.listNotification, this);
            this.callback("PLAYER_INIT", {
                id: this.model.vinfo.vid
            });
            this.controller.playMovie()
        },
        listNotification: function(e) {
            switch (e.type) {
            case "setVideoEnable":
                this.enabled = e.args[0];
                if (this.enabled) this.enable();
                else this.disable();
                break;
            case "TO_PlayNext":
                this.playNext();
                break;
            case "Player_Callback":
                var t = e.args[0],
                i = e.args.slice(1);
                if (i && i.length == 1) i = i[0];
                this.callback(t, i);
                break
            }
        },
        enable: function() {
            this.evt.on("error playing ended pause durationchange", this.onVideoEvent, this)
        },
        disable: function() {
            this.evt.off("error playing ended pause durationchange", this.onVideoEvent, this)
        },
        callback: function(e, t) {
            if (!t) t = {};
            if (this.IPlayer) {
                try {
                    this.IPlayer(e, t)
                } catch(i) {}
            }
            if (this.controller.ad) {
                try {
                    this.controller.ad.changeStatus(e, t)
                } catch(i) {}
            }
        },
        onVideoEvent: function(e) {
            switch (e.type) {
            case "error":
                this.callback("PLAYER_VIDEO_PAUSE");
                break;
            case "playing":
                this.pingback.startRecord();
                this.callback("PLAYER_VIDEO_RESUME");
                break;
            case "ended":
                this.history.stopRecord();
                this.history.flush( - 1);
                this.pingback.stopRecord();
                this.pingback.flush();
                if (this.model.option.isTrylook) {
                    return
                }
                this.pingback.sendPlayAction("end", "err=0&pt=-&ut=-&ry=0&vt=" + this.model.vinfo.vtype);
                var t = !!this.model.vinfo.nextvid ? {
                    continuePlay: true,
                    nextvid: this.model.vinfo.nextvid
                }: {};
                this.callback("PLAYER_VIDEO_COMPLETE", t);
                break;
            case "onPause":
                this.pingback.stopRecord();
                this.callback("PLAYER_VIDEO_PAUSE");
                break
            }
        },
        playNext: function() {
            if (typeof window.nextVideoSrc != "undefined" && window.nextVideoSrc.length > 1) {
                window.location.href = window.nextVideoSrc
            } else {
                var e = this.model.vinfo;
                if (e.nextvid > 0 && e.nextvid != e.vid && this.model.option.pname != "MPlayer") window.location.href = "http://www.letv.com/ptv/vplay/" + e.nextvid + ".html"
            }
            this.callback("PLAYER_VIDEO_COMPLETE")
        },
        playMovie: function(t) {
            logger.log("playMovie:" + t);
            this.callback("PLAYER_INIT", {
                id: t.vid
            });
            this.callback("PLAY_NEW_ID");
            this.evt.trigger("PLAY_NEW_ID");
            if (!t) {
                this.evt.trigger("changeFullscreen", false);
                return
            }
            this.evt.trigger("refreshPlayer");
            e("./stat").uuid = false;
            this.evt.trigger("TO_Pause");
            this.disable();
            this.sended = false;
            t.up = 1;
            n.merge(this.model.vinfo, t);
            this.controller.playMovie()
        },
        seek: function(e) {
            this.evt.trigger("TO_Seek", e)
        },
        pause: function() {
            this.evt.trigger("TO_Pause")
        },
        play: function() {
            this.evt.trigger("TO_Play")
        },
        destroy: function() {
            this.evt.trigger("TO_Stop")
        },
        resize: function() {
            this.evt.trigger("TO_Resize")
        },
        getCurrTime: function() {
            return this.controller.getCurrentTime()
        },
        changeDefi: function(e) {
            this.model.option.defaultDefi = e;
            this.evt.trigger("TO_RateChanged", e, true)
        },
        changeFullScreen: function(e) {
            if (o.iPhone) {
                this.evt.trigger("changeVideoFullScreen", e)
            } else {
                this.evt.trigger("changeFullscreen", e)
            }
        },
        loadCss: function() {
            var e = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            t = document.createElement("style");
            t.setAttribute("type", "text/css");
            t.innerHTML = d.getCss(this.model.tplType);
            e.appendChild(t)
        }
    };
    window.h5player = {
        playMovie: function(e) {
            a.each.call(u, f,
            function(t, i) {
                i.playMovie(e)
            })
        },
        pause: function() {
            a.each.call(u, f,
            function(e, t) {
                t.pause()
            })
        },
        play: function() {
            a.each.call(u, f,
            function(e, t) {
                t.play()
            })
        },
        seek: function(e) {
            a.each.call(u, f,
            function(t, i) {
                i.seek(e)
            })
        },
        resize: function() {
            a.each.call(u, f,
            function(e, t) {
                t.resize()
            })
        },
        getCurrTime: function() {
            for (var e in f) {
                return f[e].getCurrTime()
            }
        },
        changeDefi: function(e) {
            a.each.call(u, f,
            function(t, i) {
                i.changeDefi(e)
            })
        },
        changeFullscreen: function(e) {
            var t = 1;
            a.each.call(u, f,
            function(i, a) {
                if (t++>1) return;
                a.changeFullScreen(e)
            })
        },
        destroy: function() {
            a.each.call(u, f,
            function(e, t) {
                t.destroy()
            })
        }
    };
    i.exports = u
});
define("module.h5model",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("extend.detect"),
    n = e("core.event"),
    o = {},
    r;
    function d(e) {
        a.merge(e, h);
        a.merge(e, e.extInfo);
        var t = e.flashvar = c(e.flashvar);
        e.searchInfo = c(location.search);
        var i = {};
        if (typeof __INFO__ != "undefined" && __INFO__ && __INFO__.video) {
            a.merge(i, __INFO__.video)
        }
        if (typeof e.isMember == "undefined") e.isMember = i.trylook == 10 ? 1 : 0;
        e.pid = i.pid;
        i.vid = i.vid || t.id || t.vid || "";
        i.mmsid = i.mmsid || t.mmsid || "";
        i.cid = i.cid || t.cid || "";
        i.ark = i.ark || t.ark || "";
        i.zid = t.zid || "";
        if (t.callbackJs) {
            this.IPlayer = new Function("status", "data", t.callbackJs + "(status,data)")
        }
        e.isAutoPlay = t.isAutoPlay !== "0";
        e.isPreload = s.iPhone ? true: e.isAutoPlay;
        if (t.tg) {
            t.tg = "letv_" + t.tg
        }
        if (t.streamid) {
            e.isLive = true;
            e.pay = t.pay == 1;
            e.pname = e.pname || "live";
            i.streamid = t.streamid;
            t.liveid = t.screenings
        }
        if (t.picStartUrl) {
            i.poster = t.picStartUrl
        }
        if (t.isPC || s.mac && s.safari) {
            vjs.isPC = true
        }
        if (i.defi) e.defaultDefi = i.defi;
        else if (t.defi) e.defaultDefi = t.defi;
        else if (e.pname == "LePai") e.defaultDefi = "2";
        if (t.rate) {
            var d = {
                350 : 1,
                800 : 2
            };
            if (d[t.rate]) e.defaultDefi = d[t.rate];
            else e.defaultDefi = t.rate
        }
        if (s.iPhone && !s.weixin) {
            e.tplType = "IPhone"
        } else if (e.pname == "MPlayer") {
            if (!e.isLive) {
                e.tplType = "minBase"
            } else {
                e.tplType = "minLive"
            }
        } else {
            if (!e.isLive) {
                var l = vjs.getWinWH();
                e.tplType = Math.min(l.width, l.height) > 320 ? "base": "minBase"
            } else {
                e.tplType = "live"
            }
        }
        if (t.definition == 0 && e.tplType == "base") {
            e.tplType = "minBase"
        }
        switch (e.tplType) {
        case "live":
            e.children = {
                controlBar: "view.liveControlBar",
                playingPannel: "view.livePlayingPannel",
                popTip: "view.popTip",
                tip: "view.tip"
            };
            break;
        case "minLive":
            e.children = {
                controlBar: "view.minLiveControlBar",
                playingPannel: "view.livePlayingPannel",
                popTip: "view.popTip"
            };
            break;
        case "minBase":
            e.children = {
                controlBar: "view.minControlBar",
                playingPannel: "view.minPlayingPannel",
                popTip: "view.popTip"
            };
            break;
        case "IPhone":
            e.children = {
                playingPannel: "view.iphonePlayingPannel",
                popTip: "view.popTip"
            };
            break;
        case "base":
            e.children = {
                controlBar: "view.controlBar",
                playingPannel: "view.playingPannel",
                popTip: "view.popTip",
                tip: "view.tip"
            };
            break
        }
        var p = a.merge({},
        n);
        var f = {
            option: e,
            state: {
                isAd: false
            },
            vinfo: i,
            events: p
        };
        r = e.cont;
        o[r] = f;
        return f
    }
    var l = function(e) {
        if (typeof e === "undefined") {
            if (o && o[r]) return o[r]
        } else if (o && o[e]) {
            return o[e]
        }
        return null
    };
    var c = function(e) {
        if (!e) return {};
        var t = {},
        i, a = /(.+?)=(.+)/,
        s = e.replace(/^[?&]/, "").split("&");
        s.forEach(function(e) {
            i = e.match(a);
            if (i != null) t[i[1]] = unescape(i[2])
        });
        return t
    };
    var h = {
        version: "2.4.26",
        defaultDefi: "2"
    };
    i.exports = {
        H5Model: d,
        getModel: l,
        cont: r
    }
});
define("module.stat",
function(e, t, i) {
    var a = e("extend.lib");
    i.exports = {
        getUUID: function() {
            this.uuid = "1" + String((new Date).getTime()).slice(4) + String(Math.random()).slice( - 6);
            return this.uuid
        },
        getLC: function() {
            if (!this.lc) {
                if (typeof Stats != "undefined" && typeof Stats.getLC == "function") {
                    this.lc = Stats.getLC()
                } else {
                    var e = a.getCookie("tj_lc");
                    if (!e) {
                        var e = "",
                        t = 32;
                        while (t--) {
                            e += Math.floor(Math.random() * 16).toString(16)
                        }
                        var i = new Date;
                        i.setFullYear(i.getFullYear() + 20);
                        a.setCookie("tj_lc", e, {
                            expires: i,
                            domain: ".letv.com",
                            path: "/"
                        })
                    }
                    this.lc = e
                }
            }
            return this.lc
        },
        getWeid: function() {
            if (typeof Stats != "undefined" && typeof Stats.WEID != "undefined") {
                return Stats.WEID
            } else {
                return "5" + (new Date).getTime() + String(Math.random()).slice( - 10)
            }
        }
    }
});
define("module.user",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("extend.detect"),
    n = e("proxy.pingback").pingback,
    o = e("video.statusEnum").error;
    var r = {
        getUserInfo: function(e, t, i, s) {
            var n = a.getCookie("ssouid"),
            o = a.getCookie("m");
            if (!n || !o) {
                s();
                return
            }
            var r = "http://yuanxian.letv.com/letv/";
            if (t.isLive || !e.pid) {
                r += "vip.ldo?callback=?&type=vipInfo&userId=" + n
            } else {
                r += "getService.ldo?callback=?&from=player&termid=2&end=5&pid=" + e.pid + "&ssouid=" + n + "&uname=" + o
            }
            a.getJSON(r,
            function(e) {
                var t;
                if (!e.values) {
                    t = e
                } else {
                    if (e.code === 1 && typeof e.values.vipInfo !== "undefined") {
                        t = e.values.vipInfo;
                        var a = t.vipType;
                        t.vip = !a || a == 3 ? 0 : a
                    }
                }
                i(t)
            },
            function() {
                s()
            },
            2e3, 1)
        },
        getToken: function(t, i, s, n) {
            var o = a.getCookie("ssouid"),
            r = a.getCookie("m");
            if (!o || !r || !i) {
                s && s();
                return
            }
            var d = i + "37b335ab693a416082b59904fe542b57" + o + t;
            var l = e("extend.md5").call(this, d);
            var c = "http://yuanxian.letv.com/letv/getService.ldo?callback=?&from=token&pid=" + i + "&userid=" + o + "&uname=" + r + "&storepath=" + t + "&sign=" + l;
            a.getJSON(c,
            function(e) {
                if (e.code != 0) {
                    s && s()
                }
                s && s(e.values.token)
            },
            n, 2e3, 3)
        },
        getLiveValidate: function(t, i, n, o, r, d, l) {
            t = t || "";
            i = i || "";
            n = n || "";
            r = r || "";
            var c;
            if (s.isLetvTv()) {
                c = "1095"
            } else {
                c = o ? "1006": "1005"
            }
            var h = e("extend.md5").call(this, i + "f8da39f11dbdafc03efa1ad0250c9ae6" + r);
            var p = "http://yuanxian.letv.com/letv/liveValidate.ldo?callback=?&from=play&pid=" + t + "&liveid=" + i + "&streamId=" + n + "&splatId=" + c + "&userId=" + r + "&sign=" + h;
            a.getJSON(p,
            function(e) {
                if (e.error) {
                    l && l(e.error);
                    return
                }
                var t = e;
                t.vip = Number(t.isVip);
                d && d(t)
            },
            l, 2e3, 3)
        }
    };
    i.exports = r
});
define("module.controller",
function(e, t, i) {
    var a = e("core.vjs"),
    s = e("core.event"),
    n = e("extend.lib"),
    o = e("extend.detect"),
    r = e("./coreVideo"),
    d = e("view.component"),
    l = e("module.user"),
    c = e("proxy.pingback").pingback,
    h = e("video.statusEnum").error,
    p = e("proxy.history").history;
    function f(e) {
        this.model = e;
        this.init();
        this.initEvt()
    }
    f.prototype = {
        init: function() {
            this.evt = this.model.events;
            this.pingback = new c(this.model);
            this.history = new p(this.model);
            this.comp = new d(this.model);
            this.core = new r(this.model);
            this.comp.__proto__.core = this.core;
            this.history.core = this.core;
            this.videoEnable = false;
            this.evt.on("play canplay durationchange", this.sendVV, this);
            this.evt.on("refreshPlayer",
            function() {
                this.isSendVV = this.isSendCV = false;
                this.evt.off("play canplay durationchange progress", this.sendVV, this);
                this.evt.on("play canplay durationchange", this.sendVV, this);
                if (o.uc) this.evt.on("progress", this.sendVV, this)
            },
            this);
            if (o.uc) this.evt.on("progress", this.sendVV, this)
        },
        initEvt: function() {
            this.evt.on("movieSucc", this.onMovieSucc, this);
            this.evt.on("TO_RateChanged", this.onRateChanged, this);
            this.evt.on("TO_UseTicket", this.onUseTicket, this);
            this.evt.on("tryLookEnd", this.onTryLookEnd, this);
            this.evt.on("setVideoEnable", this.onVideoEnable, this)
        },
        playVideo: function() {
            this.model.state.isAd = false;
            this.evt.trigger("TO_Stop");
            if (!this.videoEnable) this.evt.trigger("setVideoEnable", true);
            this.evt.trigger("TO_RateChanged", this.defi, false);
            this.history.startRecord();
            this.pingback.startRecord()
        },
        playMovie: function() {
            if (this.videoEnable) this.evt.trigger("setVideoEnable", false);
            var e = this.model.option;
            if (e.isLive && e.pay) {
                var t = n.getCookie("ssouid");
                if (!t) {
                    this.userFail();
                    return
                }
                var i = e.flashvar.md5id,
                a = e.flashvar.liveid,
                s = this.model.vinfo.streamid.split(",")[0].split("|")[1],
                o = e.pname == "MPlayer";
                var r = function() {
                    this.pingback.sendError(h["LiveValidateTimeOut"]);
                    this.evt.trigger("showMessage", h["LiveValidateTimeOut"])
                };
                l.getLiveValidate(i, a, s, o, t, n.bind(this.userSucc, this), n.bind(r, this))
            } else {
                l.getUserInfo(this.model.vinfo, this.model.option, n.bind(this.userSucc, this), n.bind(this.userFail, this))
            }
        },
        onVideoEnable: function(e) {
            this.videoEnable = e.args[0]
        },
        sendVV: function(e) {
            if (!this.model.state.isAd && !this.isSendCV || e === true) {
                this.isSendCV = true;
                this.pingback.onVideoPlayStart();
                this.evt.trigger("Player_Callback", "PLAYER_VIDEO_PLAY");
                this.evt.off("play canplay durationchange progress", this.sendVV, this)
            }
        },
        userSucc: function(e) {
            this.userInfo = e;
            this.core.setUinfo(this.userInfo.uinfo);
            this.checkUserAuth()
        },
        userFail: function() {
            this.userInfo = undefined;
            this.checkUserAuth()
        },
        checkUserAuth: function() {
            var e = this.model.vinfo;
            if (e.authtype == 1) {
                this.evt.trigger("showMessage", "authBan");
                return
            } else if (e.liveAuthBan == 1) {
                this.evt.trigger("showMessage", "liveAuthBan");
                return
            }
            if (!this.model.option.isLive) {
                this.model.option.isTrylook = false;
                this.core.playTV(e.vid)
            } else {
                this.core.playLive(e.streamid)
            }
        },
        onMovieSucc: function(t) {
            var i = this.movieVO = t.args[0],
            a = t.args[1],
            s = this.model.vinfo;
            if (this.ad) {
                this.ad.destory()
            }
            if (this.checkVideoAuth(a)) return;
            var r = this.model.option;
            var d, l = n.getCookie("defi"),
            c = r.defaultDefi;
            if (l && i[l]) d = l;
            else if (c && i[c]) d = c;
            else if (i["2"]) d = "2";
            else if (i["1"]) d = "1";
            else if (i["7"]) d = "7";
            this.defi = d;
            s.vtype = i[d].vtype;
            s.isvip = this.userInfo && this.userInfo.vip ? this.userInfo.vip: 0;
            if (!this.isSendVV) {
                this.isSendVV = true;
                this.pingback.sendPlayAction("init", "err=0&pt=-&ut=-&ry=0&vt=" + s.vtype)
            }
            try {
                var h = e("module.ad");
                if (typeof h === "function") {
                    this.model.state.isAd = true;
                    if (!this.ad) {
                        this.ad = new h(this, this.model)
                    } else {
                        this.ad.refreshAd(this.model)
                    }
                } else this.playVideo()
            } catch(t) {
                this.playVideo()
            }
            if (!this.isSendCV && o.qq) this.sendVV(true)
        },
        checkVideoAuth: function(e) {
            var t = this.model.option;
            if (!t.isLive) {
                if (e.isFirstLook) {
                    this.pingback.sendError(h["FirstLookBan"]);
                    this.evt.trigger("showMessage", h["FirstLookBan"]);
                    this.evt.trigger("Player_Callback", "PLAYER_FIRSTLOOK", {
                        htime: 0,
                        isH5: true
                    });
                    return true
                } else if (t.isMember) {
                    if (typeof this.userInfo == "undefined" || this.userInfo.status !== 1) {
                        this.changeTrylook(true, "vip", 6);
                        this.evt.trigger("showTip", "trylook");
                        this.evt.trigger("Player_Callback", "TRYLOOK_TIP", this.userInfo)
                    }
                } else {
                    this.checkCutOff(e)
                }
            } else {
                if (t.pay && (typeof this.userInfo == "undefined" || this.userInfo.status != 1)) {
                    this.evt.trigger("showMessage", "liveVip");
                    this.callback("LIVE_PAY_INFO", this.userInfo || {
                        notlogin: 1
                    });
                    return true
                }
            }
        },
        checkCutOff: function(e) {
            var t = this.model.option.pname != "MPlayer" ? "304": "301",
            i = this.model.vinfo;
            if (! (i.appGuide === 1 || e.cutoff_p && e.cutoff_p.length > 0)) return;
            var a = (i.duration + "").split(":"),
            s = 0;
            if (a.length > 1) {
                for (var n = 0; n < a.length; n++) {
                    s = parseInt(a[n]) + s * 60
                }
            } else {
                s = i.duration
            }
            var o = 0;
            if (i.appGuide === 1) {
                o = i.appGuideTime
            } else {
                for (var n = 0,
                r = e.cutoff_p.length; n < r; n++) {
                    if (t == e.cutoff_p[n]) {
                        o = e.cutoff_t;
                        break
                    }
                }
            }
            if (s > o * 60 && o > 0) {
                this.changeTrylook(true, "appGuide", o);
                this.evt.trigger("showTip", "appGuide");
                this.evt.trigger("Player_Callback", "APP_GUIDE", {
                    vid: i.vid,
                    cutoffTime: o
                })
            }
        },
        onRateChanged: function(e) {
            var t = e.args[0],
            i = this.movieVO[t];
            if (!i) return;
            this.model.vinfo.vtype = i.vtype
        },
        reload: function(e) {
            if (e) n.merge(this.model.option, e);
            l.getUserInfo(this.model.vinfo, this.model.option, n.bind(this.userSucc, this), n.bind(this.userFail, this))
        },
        onUseTicket: function() {
            if (this.isClickTicket) return;
            this.isClickTicket = true;
            n.getJSON(this.userInfo.ticketurl + "&callback=?", n.bind(function(e) {
                this.isClickTicket = false;
                if (e.status == 1) {
                    if (typeof mainPlayer != "undefined") {
                        if (a(".js_video-info").length > 0) {
                            a(".js_play_con").removeClass("n-vip");
                            a(".js_video-info").setStyle("display", "none");
                            mainPlayer.reload({
                                width: 970
                            })
                        } else {
                            mainPlayer.reload()
                        }
                    } else {
                        this.reload()
                    }
                }
            },
            this))
        },
        getCurrentTime: function() {
            if (!this.model.option.isLive) {
                return this.core.getCurrentTime()
            } else if (this.liveBar) {
                return this.liveBar.currentTime * 1e3
            } else {
                this.liveBar = this.comp.getChildren("view.widget.liveProgressBar");
                return this.liveBar.currentTime * 1e3
            }
        },
        changeTrylook: function(e, t, i) {
            this.model.option.isTrylook = e;
            this.model.option.trylookType = t || "";
            this.model.option.cutoffTime = i;
            this.comp.setTrylook(e, i);
            this.core.setTrylook(e, t, i)
        },
        onTryLookEnd: function() {
            if (typeof this.userInfo == "undefined") {
                this.evt.trigger("showMessage", "loginMembre")
            } else if (this.userInfo["ticketsize"] > 0) {
                this.evt.trigger("showMessage", "useTicket", this.userInfo)
            } else {
                this.evt.trigger("showMessage", "openMembre")
            }
            this.evt.trigger("Player_Callback", "TRYLOOK_End", this.userInfo)
        }
    };
    i.exports = f
});
define("module.coreVideo",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("video.baseVideo"),
    n = e("proxy.pingback"),
    o = e("extend.detect"),
    r = e("proxy.history");
    function d(e) {
        this.model = e;
        this.evt = this.model.events;
        this.pingback = n.instances[e.option.cont];
        this.history = r.instances[e.option.cont];
        this.streamEvent = "progress gslbScheduler waiting seeked RealSeeked canplay playing timeupdate";
        this.listEvnts = "TO_RateChanged TO_Refresh TO_Play TO_Pause TO_Seek TO_Stop";
        this.initVideo();
        this.evt.on(this.listEvnts, this.listNotification, this);
        this.evt.on("setVideoEnable setDuration changeVideoFullScreen setAutoPlay", this.changeVideoStatus, this);
        this.baseVideo.on("Fault", this.onFault, this)
    }
    d.prototype = {
        initVideo: function() {
            var t = this.model;
            var i = {
                cont: t.option.cont,
                vid: t.vinfo.vid,
                pid: t.vinfo.pid,
                pname: t.option.pname,
                isMember: t.option.isMember,
                preload: t.option.preload,
                isAutoPlay: t.option.isAutoPlay,
                events: t.events,
                stime: t.vinfo.stime,
                pay: t.option.pay,
                md5id: t.option.flashvar.md5id || "",
                liveid: t.option.flashvar.liveid || "",
                uinfo: null
            };
            if (t.option.isLive) i.isLive = true;
            var a = this.model.dom;
            a.videoEl = a.parentEl.find("video");
            a.videoEl[0].setAttribute("preload", t.option.isPreload ? "auto": "none");
            if (o.iPhone && o.weixin) {
                a.videoEl[0].setAttribute("webkit-playsinline", "true")
            }
            if (o.isLetvTv()) {
                var n = e("video.letvVideo");
                i.letvVideo = new n(t)
            }
            this.baseVideo = new s(i);
            this.baseVideo.initialize(a.videoEl)
        },
        enable: function() {
            this.evt.on(this.streamEvent, this.onStreamEvent, this)
        },
        disable: function() {
            this.evt.off(this.streamEvent, this.onStreamEvent, this)
        },
        changeVideoStatus: function(e) {
            switch (e.type) {
            case "setVideoEnable":
                this.enabled = e.args[0];
                if (this.enabled) this.enable();
                else this.disable();
                break;
            case "changeVideoFullScreen":
                this.baseVideo.changeFull(e.args[0]);
                break;
            case "setDuration":
                this.model.vinfo.gdur = e.args[0];
                break;
            case "setAutoPlay":
                this.setAutoPlay(e.args[0]);
                break
            }
        },
        listNotification: function(e) {
            switch (e.type) {
            case "TO_Play":
                this.baseVideo.play();
                break;
            case "TO_Pause":
                this.baseVideo.pause();
                break;
            case "TO_Stop":
                this.history.flush(this.getCurrentTime());
                this.baseVideo.stop();
                break;
            case "TO_Seek":
                this.baseVideo.seek(e.args[0]);
                break;
            case "TO_Refresh":
                this.baseVideo.seek(1);
                this.baseVideo.play();
                break;
            case "TO_RateChanged":
                this.isRateChange = e.args[1];
                if (this.isRateChange) {
                    var t = this.getCurrentTime();
                    if (!isNaN(t) && t > 0) {
                        this.seekTime = t;
                        this.history.flush(t)
                    }
                } else {
                    var i = this.model.vinfo.gdur,
                    a = this.model.option.searchInfo;
                    if (a && a.htime > 0) {
                        this.seekTime = a.htime
                    } else {
                        var s = this.getHistory();
                        if (!isNaN(i) && s < i - 15) {
                            this.seekTime = s
                        }
                    }
                }
                this.evt.on("loadeddata loadedmetadata", this.onStartLoad, this);
                this.baseVideo.changeDefi(e.args[0], this.isRateChange);
                this.evt.trigger("onVideoRateChanged", e.args[0]);
                break
            }
        },
        playTV: function(e) {
            this.baseVideo.playMovie(e)
        },
        playLive: function(e) {
            this.baseVideo.playLive(e)
        },
        onFault: function() {
            var e = this.baseVideo.getErrorStatus();
            this.pingback.sendError(e);
            this.evt.trigger("showMessage", e)
        },
        onStartLoad: function() {
            if (!this.model.option.isLive) {
                this.baseVideo.seek(this.seekTime)
            }
            this.evt.off("loadeddata loadedmetadata", this.onStartLoad, this);
            this.pingback.sendPlayAction("cload", "err=0&pt=-&ut=-&ry=0&vt=" + this.model.vinfo.vtype)
        },
        onStreamEvent: function(e) {
            switch (e.type) {
            case "progress":
                if (o.iPhone) {
                    this.evt.trigger("videoReady")
                }
                this.evt.off("progress", this.onStreamEvent, this);
                break;
            case "canplay":
            case "timeupdate":
                if (/iPhone OS 8_/.test(navigator.userAgent)) {
                    this.evt.trigger("videoReady")
                }
                this.evt.off("canplay", this.onStreamEvent, this);
                this.evt.off("timeupdate", this.onStreamEvent, this);
                break;
            case "realSeeked":
                this.seekTime = -1;
                break;
            case "gslbScheduler":
                var t = e.args[0];
                this.pingback.sendPlayAction("gslb", "err=0&pt=-&ut=" + t.responseTime + "&ry=" + t.retryCount + "&vt=" + this.model.vinfo.vtype, {
                    isRateChange: this.isRateChange
                });
                break;
            case "waiting":
                this.wt = a.now();
                break;
            case "playing":
                if (this.wt) {
                    var i = a.now() - this.wt;
                    this.pingback.sendPlayAction("block", "err=0&pt=0&ut=" + i + "&ry=0&vt=" + this.model.vinfo.vtype);
                    this.wt = null
                }
                break;
            case "seeked":
                var s = this.getCurrentTime();
                if (!isNaN(s) && s > 0 && s !== this.lastTime) {
                    this.lastTime = s;
                    this.history.flush(s)
                }
                break
            }
        },
        getHistory: function() {
            var e = this.history.getRecords(),
            t = this.model.vinfo.vid;
            if (e && e.length > 0 && t > 0) {
                for (var i = 0; i < e.length; i++) {
                    if (e[i].vid == t) {
                        return e[i].htime
                    }
                }
            }
            if (e && e.htime) {
                return e.htime
            }
            return - 1
        },
        getCurrentTime: function() {
            return this.baseVideo.getCurrentTime()
        },
        setCurrentTime: function(e) {
            if (!isNaN(e) && e > 0) {
                this.baseVideo.setCurrentTime(e)
            }
        },
        getBuffered: function() {
            var e = this.baseVideo.getBuffered(),
            t = e.length;
            var i = 0,
            a = [];
            while (i < t) {
                a.push({
                    start: e.start(i),
                    end: e.end(i)
                });
                i++
            }
            return a
        },
        setTrylook: function(e, t, i) {
            if (typeof this.baseVideo === "undefined") return;
            this.baseVideo.option.isTrylook = e;
            this.baseVideo.option.trylookType = t;
            this.baseVideo.option.cutoffTime = i
        },
        setAutoPlay: function(e) {
            this.model.option.isAutoPlay = e;
            if (typeof this.baseVideo === "undefined") return;
            this.baseVideo.option.isAutoPlay = e
        },
        setUinfo: function(e) {
            if (typeof this.baseVideo === "undefined") return;
            this.baseVideo.option.uinfo = e
        }
    };
    i.exports = d
});
define("module.ad",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("extend.detect"),
    n = e("module.stat"),
    o = e("proxy.pingback").instances,
    r = e("module.adPlayer"),
    d = e("module.user"),
    l = e("extend.detect"),
    c = e("video.statusEnum").error,
    h;
    var p = function(e, t) {
        h = this;
        this.ctr = e;
        this.model = t;
        this.evt = t.events;
        this.video_ = t.dom.videoEl;
        this.video = this.video_[0];
        this.pingback = o[t.option.cont];
        this.events = ["progress", "error", "play", "playing", "ended", "pause"];
        this.adInfo = {};
        this.initParam(t);
        this.bigPlay = t.dom.parentEl.find(".hv_ico_pasued");
        this.poster = t.dom.parentEl.find(".hv_play_poster");
        this.isADStarted = false;
        this.onADLoaded()
    };
    p.prototype = {
        initParam: function(e) {
            var t = e.vinfo,
            i = e.option;
            var s = {
                pname: i.pname,
                cont: i.cont,
                ch: i.flashvar["tg"] || "letv",
                uname: d.uname,
                uid: d.ssouid,
                isvip: t.isvip || (e.option.pay ? 1 : 0),
                up: t.up == 1 ? 1 : 0,
                isTrylook: i.isTrylook,
                ver: i.version,
                uuid: this.pingback.uuid,
                lc: n.getLC(),
                islive: i.isLive ? true: false,
                p1: "0",
                p2: i.pname == "MPlayer" ? "04": "06",
                p3: ""
            };
            if (i.isLive) s.streamid = t.streamid;
            this.adInfo = a.merge(s, t, true)
        },
        installListener: function() {
            this.enabled = true;
            vjs.each.call(this, this.events,
            function(e, t) {
                this.video_.on(t, this.onVideoEvent, this)
            });
            if (window.letv_login_cb && window["Spirit"].Event) {
                this.lsHandle = window["Spirit"].Event.addEvent("loginSuccess",
                function() {
                    if (!h.isAdCallLogin) return;
                    var e = window["Spirit"]["UserValidate"].getUserInfo();
                    h.callAD("loginCb", {
                        level: e.userlevel
                    });
                    h.isAdCallLogin = false
                });
                window.letv_login_cb.on("close", "loginClose",
                function() {
                    if (!h.isAdCallLogin) return;
                    h.callAD("loginCb", {
                        level: null
                    });
                    h.isAdCallLogin = false
                })
            }
        },
        removeListener: function() {
            if (!this.enabled) return;
            this.enabled = false;
            vjs.each.call(this, this.events,
            function(e, t) {
                this.video_.off(t, this.onVideoEvent, this)
            });
            if (window.letv_login_cb && window["Spirit"].Event) {
                window["Spirit"].Event.removeEvent("loginSuccess", this.lsHandle);
                window.letv_login_cb.off("close", "loginClose")
            }
        },
        onADLoaded: function() {
            if (typeof r != "undefined" && typeof r.initAD == "function") {
                this.iAd = r.sendEvent;
                this.installListener();
                this.isAdInit = false;
                r.initAD(this.adInfo, this.callback)
            }
        },
        playAD: function(e) {
            this.curIdx = e;
            if (this.urls && this.urls.length > e && this.urls[e]) {
                this.isADStarted = false;
                if (!l.iPhone) {
                    this.evt.trigger("videoReady")
                }
                this.curAD = this.urls[e];
                this.setVideoSrc(this.curAD.url);
                if (this.model.option.isAutoPlay) {
                    setTimeout(function() {
                        h.video.play()
                    },
                    2e3);
                    this.video.play()
                } else {
                    this.evt.trigger("setAutoPlay", true)
                }
            } else {
                this.playVideo()
            }
        },
        setVideoSrc: function(e) {
            try {
                this.video.removeAttribute("src")
            } catch(t) {}
            try {
                this.video.src = e
            } catch(t) {
                this.video.setAttribute("src", e)
            }
        },
        playVideo: function() {
            this.removeListener();
            this.video.removeAttribute("src");
            this.ctr.playVideo()
        },
        onVideoEvent: function(e) {
            switch (e.type) {
            case "progress":
                if (l.iPhone) {
                    this.evt.trigger("videoReady")
                }
                this.video_.off("progress", this.onVideoEvent, this);
                break;
            case "play":
            case "playing":
                this.callAD("AD_PLAY");
                break;
            case "pause":
                if (this.playID) clearTimeout(this.playID);
                h.callAD("AD_PAUSE");
                break;
            case "ended":
                this.callAD("AD_ENDED");
                this.playAD(++this.curIdx);
                break;
            case "error":
                this.callAD("AD_ERROR", {
                    error: this.video.error
                });
                this.pingback.sendError(c["ADURLNotSupport"]);
                this.playAD(++this.curIdx);
                break
            }
        },
        callAD: function(e, t) {
            try {
                if (!t) t = {};
                a.merge(t, {
                    curAD: this.curAD,
                    curIndex: this.curIdx
                });
                this.iAd(e, t);
                if (typeof this.ctr.callback == "function") this.ctr.callback(e)
            } catch(i) {}
        },
        delaySendCV: function() {
            if (!s.qq || this.delaySendCVID) return;
            var e = 0,
            t = this.urls;
            for (var i = 0; i < t.length; i++) {
                e += t[i].duration
            }
            this.delaySendCVID = setTimeout(function() {
                h.ctr.sendVV(true)
            },
            e * 1e3)
        },
        destory: function() {
            this.removeListener();
            this.video.removeAttribute("src");
            r.destory()
        },
        refreshAd: function(e) {
            this.initParam(e);
            this.onADLoaded()
        }
    };
    a.merge(p.prototype, {
        callback: function(e, t) {
            if (h.enabled == false) return;
            try {
                switch (e) {
                case "login":
                    if (window.Spirit && Spirit.userLogin && Spirit.userLogin.openLetvLogin) {
                        Spirit.userLogin.openLetvLogin()
                    }
                    h.isAdCallLogin = true;
                    break;
                case "playAD":
                    h.urls = t;
                    h.playAD(0);
                    break;
                case "stopAD":
                    h.playVideo();
                    break;
                case "resumeAD":
                    h.video.play();
                    break;
                case "pauseAD":
                    h.video.pause();
                    break;
                case "getCurrTime":
                    return h.video.currentTime || 0;
                case "getVideoRect":
                    return {
                        w:
                        h.video_.getStyle("width"),
                        h: h.video_.getStyle("height")
                    }
                }
            } catch(i) {
                this.pingback.sendError(c["ADCallbackErr"]);
                r && r.collectError((i || {}).stack, 3);
                h.playVideo()
            }
        }
    });
    i.exports = p
});
define("module.adPlayer",
function(require, exports, module) {
    var lib = require("extend.lib"),
    br = require("extend.detect"),
    $js = require("core.vjs");
    var adTools = {
        param: function(e) {
            var t = new Array;
            if (typeof e == "object") {
                for (var i in e) {
                    if (e.hasOwnProperty(i)) {
                        if (e[i] === "-") {
                            continue
                        }
                        t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]))
                    }
                }
            }
            return t.join("&")
        },
        sendLogs: function(e, t) {
            if (adTools.getQuery("arkdebug")) {
                try {
                    var i = this.el("#arkDebugButton"),
                    a = H5AD.putinVars.uuid,
                    s = "http://ark.letv.com/apsdbg/?type=1&sid=" + a + "&time=" + t + "&msg=";
                    if (!adTools.existEl(i)) {
                        i = lib.createElement("div", {
                            id: "arkDebugButton",
                            className: "vdo_send_log"
                        });
                        i.innerText = "请查看" + a + "的日志";
                        H5AD.staticVars.countdownElem.appendChild(i)
                    } (new Image).src = s + encodeURIComponent("`" + e + "`")
                } catch(n) {}
            }
        },
        wsLog: function(e) {
            if (adTools.getQuery("arkdebug") == "2") {
                try {
                    if (!this.s) {
                        var t = H5AD.config,
                        i = new WS(t.WS_URL);
                        this.s = i
                    }
                    this.s.addLog(e)
                } catch(a) {
                    console.log(a)
                }
            }
        },
        debug: function(e, t, i) {
            i = i || " ";
            if (H5AD.config.DEBUG == true || adTools.getQuery("arkdebug")) {
                if (typeof e == "object") {
                    if (t) {
                        console.log("%c" + t, "color:#f0d");
                        this.wsLog(t)
                    }
                    this.wsLog(e);
                    console.dir(e)
                } else {
                    if (e == undefined) {
                        console.log("数据空" + i);
                        return
                    }
                    this.wsLog(e);
                    console.log(e + i)
                }
            }
        },
        json: function(data) {
            if (typeof data === "string") {
                if (JSON && JSON.parse) {
                    return JSON.parse(data)
                }
                return eval("(" + data + ")")
            }
            return JSON.stringify(data)
        },
        resoSid: function(e) {
            var t, i = "",
            a;
            if (typeof e === "string") {
                t = e.split(",")[0];
                a = t.split("|");
                if (a.length == 3) {
                    i = a[1]
                } else if (a.length > 1) {
                    i = a[1]
                } else {
                    i = a[0]
                }
            }
            t = a = null;
            return i
        },
        getQuery: function(e, t) {
            var i = t || location.search;
            if (i.length > 0 && i.indexOf("?") != -1) {
                var a = new RegExp(e + "=([^&]*)", "i"),
                s = i.match(a);
                return s && s.length > 0 ? unescape(s[1]) : null
            }
            return null
        },
        easyClone: function(e, t) {
            for (var i in t) {
                if (t.hasOwnProperty(i) && typeof t[i] !== "object") {
                    e[i] = t[i]
                }
            }
        },
        arkMapper: function(e) {
            if (typeof e == "string") {
                e = parseInt(e);
                if (isNaN(e)) {
                    return 132
                }
            }
            if (this.isMStation && (br.iPhone || br.iPod)) {
                var t = H5AD.config.M_ARK_MAPPER[e];
                if (t) {
                    return t
                }
            }
            return H5AD.config.ARK_Mapper[e] || (this.isMStation ? 132 : 147)
        },
        removeElem: function(e) {
            if (e) {
                if (e.remove) {
                    return e.remove()
                } else {
                    return e.parentNode && e.parentNode.removeChild && e.parentNode.removeChild(e)
                }
            }
        },
        el: function(e, t) {
            var i = t ? $js(e).find(t)[0] : $js(e)[0];
            if (!i) {
                i = {
                    setAttribute: function() {},
                    style: {},
                    isnull: true
                }
            }
            return i
        },
        existEl: function(e) {
            if (e) {
                if (e.isnull) {
                    return false
                } else if (e instanceof Array) {
                    return e.length > 0
                } else {
                    return true
                }
            }
            return false
        },
        getAslbUrl: function(e, t) {
            var i = this,
            a, s;
            t.result = t.result || [];
            if (e instanceof Array) {
                s = e.shift();
                if (!s) {
                    return t(t.result)
                } else {
                    if (s.url.indexOf(H5AD.config.ASLB_DOMAIN) >= 0) {
                        if (br.iPhone || br.iPod || br.iPad) {
                            a = s.url + "&tss=ios&format=1&jsonp=?"
                        } else {
                            a = s.url + "&format=1&jsonp=?"
                        }
                    } else {
                        t.result.push(s);
                        adTools.getAslbUrl(e, t)
                    }
                }
                if (a === undefined) {
                    return
                }
                lib.getJSON(a,
                function(i) {
                    if (/mp4|m3u8/.test(i.location) == false) {
                        s.ryCount = $js.retryCount;
                        s.costTime = $js.responseTime;
                        s.err = 474;
                        H5AD.sendEvent(H5AD.config.SEND_EVENT_TYPE.OnASLB, {
                            curAD: s,
                            curIndex: s.curIdx
                        });
                        H5AD.collectError("474,format error," + adTools.json(s), 3);
                        adTools.getAslbUrl(e, t)
                    } else {
                        s.rUrl = s.url;
                        s.url = i.location;
                        s.ryCount = $js.retryCount;
                        s.costTime = $js.responseTime;
                        t.result.push(s);
                        H5AD.sendEvent(H5AD.config.SEND_EVENT_TYPE.OnASLB, {
                            curAD: s,
                            curIndex: s.curIdx
                        });
                        adTools.getAslbUrl(e, t)
                    }
                },
                function(i) {
                    s.ryCount = $js.retryCount;
                    s.costTime = $js.responseTime;
                    s.err = 473;
                    t.result.push(s);
                    H5AD.sendEvent(H5AD.config.SEND_EVENT_TYPE.OnASLB, {
                        curAD: s,
                        curIndex: s.curIdx
                    });
                    H5AD.collectError("473,aslb error," + adTools.json(s), 3);
                    adTools.getAslbUrl(e, t)
                })
            } else {
                if (a.indexOf(H5AD.config.ASLB_DOMAIN) < 0) {
                    return t([])
                }
                a = e + "&format=1&jsonp=?";
                lib.getJSON(a,
                function(e) {
                    return t([e.location])
                },
                function(e) {
                    return t([])
                })
            }
        },
        loadCss: function(e) {
            var t = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            i = document.createElement("style");
            i.setAttribute("type", "text/css");
            i.innerHTML = e;
            t.appendChild(i)
        },
        getDeviceSize: function() {
            var e = screen;
            return {
                x: e.width > e.height ? e.width: e.height,
                y: e.width > e.height ? e.height: e.width
            }
        } (),
        canBeClicked: function() {
            if (br.iPhone || br.iPod || br.msie) {
                return false
            }
            return true
        } (),
        isUC: br.uc,
        isMStation: false
    };
    var H5AD = {
        dynamicVars: {
            retry: 0,
            adidQueue: [],
            isFirst: true,
            hasPlayed: false
        },
        staticVars: {
            arkId: 132,
            countdownElem: null
        },
        putinVars: {},
        config: {
            AD_STYLE: {
                pre_roll: "2",
                standard: "3",
                pause: "6"
            },
            SEND_EVENT_TYPE: {
                OnStart: "AD_PLAY",
                OnComplate: "AD_ENDED",
                OnClick: "AD_CLICK",
                OnAcComplate: "AC_COMPLATE",
                OnError: "AD_ERROR",
                OnPause: "AD_PAUSE",
                OnASLB: "AD_ASLB",
                OnLoginAc: "loginCb"
            },
            CALL_PLAYER_TYPE: {
                playAD: "playAD",
                stopAD: "stopAD",
                pauseAD: "pauseAD",
                resumeAD: "resumeAD",
                getRealTime: "getCurrTime",
                getPlayerSize: "getVideoRect",
                doLogin: "login",
                pingback: "pingback"
            },
            PROCESS_EVENT_TICKS: [{
                k: "firstQuartile",
                v: .25
            },
            {
                k: "midpoint",
                v: .5
            },
            {
                k: "thirdQuartile",
                v: .75
            }],
            crc_table: [61888, 62024, 21822, 44648, 51027, 25193, 39449, 32749, 45072, 19780, 27911, 40640, 22412, 47959, 2033, 15647, 26948, 7977, 333, 52810, 2229, 28457, 56115, 3222, 7819, 8261, 37040, 26479, 46017, 37654, 52255, 36436, 49642, 26018, 41611, 57969, 22529, 40087, 25454, 12785, 50531, 1739, 4421, 44187, 14573, 60124, 48843, 50551, 63571, 18928, 9702, 31935, 37924, 53689, 43138, 29106, 22299, 17913, 22765, 17733, 13233, 54102, 63095, 54790, 45315, 4283, 52320, 21487, 24719, 23499, 25688, 43296, 18522, 46226, 54051, 23750, 63855, 40050, 23830, 13909, 53473, 35269, 6541, 59749, 45495, 7225, 26512, 17657, 28777, 4159, 17208, 50565, 48334, 33575, 10897, 26141, 42425, 51911, 4632, 28267, 27030, 57778, 15356, 31158, 14774, 53522, 27342, 33231, 29241, 52365, 12102, 5400, 40637, 7989, 51774, 31639, 1064, 46043, 38691, 42315, 25171, 2606, 94, 25879, 50273, 48389, 61059, 63334, 38144, 34805, 17489, 9758, 21488, 31104, 40127, 47832, 19575, 8379, 62899, 64770, 6327, 15962, 35087, 34e3, 41978, 50244, 40758, 57390, 20080, 51537, 61759, 31722, 57084, 25726, 3693, 42772, 41971, 46086, 30626, 46885, 37383, 847, 38119, 23229, 59572, 58742, 40006, 20034, 62943, 57283, 50816, 54485, 36496, 28963, 5481, 23375, 51432, 3135, 18675, 20557, 968, 55963, 47914, 45119, 25284, 1646, 34994, 1493, 10573, 32670, 64131, 45013, 56896, 57534, 26361, 47505, 26941, 31536, 886, 43364, 32112, 18014, 13600, 60378, 12717, 60596, 9862, 56041, 44055, 39986, 37168, 28168, 55209, 30733, 5480, 6034, 17485, 56710, 63417, 33557, 9848, 39651, 64250, 14639, 63835, 38963, 7906, 39909, 7971, 10158, 40564, 25844, 3305, 50258, 28353, 42316, 44088, 44477, 1500, 42481, 45659, 44289, 10989, 54239, 19915, 42407, 19391, 1463, 50295, 60742, 8528, 50215, 445, 89, 39965, 42071],
            ARK_Mapper: {
                4 : "140",
                5 : "142",
                6 : "141",
                20 : "134",
                21 : "133",
                22 : "135",
                23 : "144",
                24 : "146",
                25 : "143",
                26 : "137",
                27 : "139",
                28 : "138",
                29 : "136",
                88 : "148",
                166 : "148",
                90 : "145",
                91 : "147",
                100 : "372",
                104 : "147",
                335 : "335",
                329 : "329",
                292 : "292",
                132 : "132",
                131 : "131",
                130 : "130",
                129 : "129",
                128 : "128",
                127 : "127",
                126 : "126",
                125 : "125",
                124 : "124",
                123 : "123",
                122 : "122",
                121 : "121",
                120 : "120",
                118 : "118",
                372 : "372",
                419 : "419"
            },
            M_ARK_MAPPER: {
                335 : "471",
                329 : "472",
                292 : "473",
                132 : "474",
                131 : "475",
                130 : "476",
                129 : "477",
                128 : "478",
                127 : "479",
                126 : "480",
                125 : "481",
                124 : "482",
                123 : "483",
                122 : "484",
                121 : "486",
                120 : "487",
                118 : "488"
            },
            H5_ADPLAYER_VER: "aps_h5_2.0.16",
            COUNTDOWN_IMG_URL: "http://i2.letvimg.com/img/201310/21/numbers.png",
            ARK_DOMAIN: "ark.letv.com",
            ASLB_DOMAIN: "g3.letv",
            ARK_SHOW_URL: "http://ark.letv.com/s?res=jsonp",
            ARK_PREVIEW_URL: "http://ark.letv.com/p?res=jsonp",
            DC_AD_URL: "http://dc.letv.com/va/?",
            SKIP_AD_CLICK: "http://dc.letv.com/s/?k=sumtmp;H5PADQad",
            SKIP_AD_SUCC: "http://dc.letv.com/s/?k=sumtmp;H5PADQadfc",
            REQ_ARK_TIMEOUT: 5e3,
            DOWNLOAD_URL_TIMEOUT: 1e4,
            WS_URL: "ws://10.58.88.69:8080",
            CSS_TEMPLATE: [".aps_countdown_cont{position:absolute;border-radius:10px 0;top:10px;right:10px;display:block;padding:5px 10px;background:rgba(49,37,37,0.8);z-index:12} .precdImg{float:left;width:12px;height:20px;overflow:hidden;}", ".vdo_post_time,.vdo_post_detail{position:absolute;height:40px;border:1px solid #262626;text-align:center;line-height:40px;font-size:16px;z-index:13;}.vdo_post_time{right:40px;top:20px;color:#ccc;}.vdo_post_rlt{position:relative;width:100%;height:40px}.vdo_time_bg,.vdo_detail_bg{position:absolute;width:100%;height:40px;left:0;top:0;background-color:#000;opacity:0.7}.vdo_time_info,.vdo_detail_info{padding:0 10px;position:relative}.vdo_detail_info{padding:0 20px}.vdo_time_info span{color:#09adfe;padding:9px 5px 0 0;float:left}.vdo_time_info a{color:#cccccc;margin-left:3px;}.vdo_post_detail{left:40px;bottom:20px}.vdo_post_detail a,.vdo_post_detail a:hover{color:#ccc;display:block;width:100%;height:40px}.vdo_post_detail i{background:url(http://i3.letvimg.com/img/201404/15/1052/rightLink.png) no-repeat left top;width:14px;height:24px;float:right;margin:8px 0 0 10px}.hv_box_mb .vdo_post_time,.hv_box_live_mb .vdo_post_time{right:10px;top:10px;}.hv_box_mb .vdo_post_detail,.hv_box_live_mb .vdo_post_detail{left:10px;bottom:10px}.hv_box_mb .vdo_post_time,.hv_box_mb .vdo_post_detail,.hv_box_live_mb .vdo_post_time,.hv_box_live_mb .vdo_post_detail{height:30px;line-height:30px;font-size:13px}.hv_box_mb .vdo_post_rlt,.hv_box_mb .vdo_time_bg,.hv_box_mb .vdo_detail_bg,.hv_box_mb .vdo_post_detail a,.hv_box_mb .vdo_post_detail,.hv_box_live_mb .vdo_post_rlt,.hv_box_live_mb .vdo_time_bg,.hv_box_live_mb .vdo_detail_bg,.hv_box_live_mb .vdo_post_detail a,.hv_box_live_mb .vdo_post_detail a:hover{height:30px}.hv_box_mb .vdo_detail_info,.hv_box_live_mb .vdo_detail_info{padding:0 10px}.hv_box_mb .vdo_post_detail i,.hv_box_live_mb .vdo_post_detail i{width:7px;height:12px;background-size:100%;margin:8px 0 0 5px}.hv_box_mb .vdo_time_info span,.hv_box_live_mb .vdo_time_info span{color:#09adfe;padding:4px 0px 0 0;float:left}", ".aps_mask_cont{position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;z-index: 12;}.aps_pop_poster{width:100%;height:100%;position:absolute;top:0;left:0;z-index:150;}", ".vdo_send_log{position:absolute;top:80px;height:100px;right:10px;font-size:30px;z-index:30}", ".hv_pop_poster{position:absolute;top:50%;left:50%;margin:-112px 0 0 -182px; width:365px;height:225px;overflow:hidden;background-color:#f1f1f1;}.hv_pop_poster p{text-align:center;margin-bottom:12px}.hv_pop_poster p.hv_p1{padding-top:48px}.hv_pop_poster a{display:inline-block;height:40px;width:224px;line-height:40px;background-color:#f7f7f7;font-size:15px;color:#7e7e7e;border:1px solid #d1d1d1}.hv_pop_poster a.blu{background-color:#00a0e9;color:#ffffff;border:1px solid #00a0e9}.hv_pop_poster a.close{width:20px;height:20px;display:block;position:absolute;top:10px;right:10px;border:none;background:none}.hv_pop_poster a.close i{display:block;width:18px;height:2px;position:absolute;top:6px;left:0;background:#737373;transform:rotate(-45deg);-ms-transform:rotate(-45deg);   -moz-transform:rotate(-45deg);  -webkit-transform:rotate(-45deg);-o-transform:rotate(-45deg)}.hv_pop_poster a.close i.i_1{transform:rotate(45deg);-ms-transform:rotate(45deg);  -moz-transform:rotate(45deg);   -webkit-transform:rotate(45deg);-o-transform:rotate(45deg)}.hv_pop_poster .hv_org{color:#fd6c01}"].join(""),
            DEBUG: false,
            ArkDebug: false
        },
        adQueue: [],
        loadCss: function() {
            adTools.loadCss(this.config.CSS_TEMPLATE)
        },
        prepareImages: function(e, t) {
            var i = new Image;
            i.src = e;
            if (typeof t != "undefined") {
                if (i.complete) {
                    t(i.width, i.height)
                } else {
                    i.onload = function() {
                        t(i.width, i.height);
                        i.onload = null
                    }
                }
            }
        },
        destory: function(e) {
            e = e || AdMaterial.curAd;
            if (!e) return;
            try {
                e.closeCountDown();
                this.callback2Player = null;
                this.putinVars = {};
                this.dynamicVars = {
                    retry: 0,
                    adidQueue: [],
                    isFirst: true,
                    hasPlayed: false
                };
                this.adQueue = [];
                this.playingMonitorCount = 0;
                if (this.playAdTimer && this.playAdTimer.length > 0) clearTimeout(this.playAdTimer[e.curIndex]);
                clearTimeout(this.downMaterialTimer);
                clearTimeout(this.arkTimer);
                clearTimeout(this.playingMonitor);
                clearInterval(e.processTimer);
                clearInterval(e.countdownTimer)
            } catch(t) {}
        },
        openApp: function(e, t) {
            var i = "letvclient://msiteAction?actionType=0&pid=" + encodeURIComponent(e) + "&vid=" + encodeURIComponent(t) + "&from=mletv";
            setTimeout(function() {
                var e = (new Date).valueOf();
                if (br.Android) {
                    var t = document.createElement("iframe");
                    t.style.cssText = "width:0px;height:0px;position:fixed;top:0;left:0;";
                    t.src = i;
                    document.body.appendChild(t)
                } else {
                    location.href = i
                }
                setTimeout(function() {},
                1500)
            },
            100)
        },
        initAD: function(e, t) {
            var i = this;
            if (AdMaterial.curAd) {
                i.destory(AdMaterial.curAd)
            }
            i.loadCss();
            i.prepareImages(i.config.COUNTDOWN_IMG_URL);
            adTools.debug(e, "传过来的值：");
            var a = i.config,
            s = a.SEND_EVENT_TYPE,
            n = a.CALL_PLAYER_TYPE,
            o;
            if (e && t) {
                i.callback2Player = function() {
                    try {
                        return t.apply(i, arguments)
                    } catch(e) {
                        i.collectError("497&err=" + (e || {}).stack, 3)
                    }
                };
                i.putinVars = e
            } else {
                e = i.putinVars;
                t = i.callback2Player
            }
            if (br.isLetv || br.weixin || br.weibo) {
                i.sendEvent(s.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: 10
                });
                i.callback2Player.call(i, n.stopAD);
                return
            }
            i.startTime = lib.now();
            if (e.isvip) {
                i.callback2Player.call(i, n.stopAD);
                i.sendEvent(s.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: e.isvip
                });
                if (e.pname != "MPlayer") {
                    i.sendEvent(s.OnAcComplate, {
                        atype: "3",
                        curAD: {},
                        curIndex: -1,
                        ia: e.isvip
                    })
                }
                i.tips("tips", "您正享受乐视会员去广告服务");
                return
            }
            if (e.isTrylook) {
                i.callback2Player.call(i, n.stopAD);
                i.sendEvent(s.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: 3
                });
                if (e.pname != "MPlayer") {
                    i.sendEvent(s.OnAcComplate, {
                        atype: "3",
                        curAD: {},
                        curIndex: -1,
                        ia: 3
                    })
                }
                i.tips("tips", "试看服务");
                return
            }
            if (adTools.getQuery("ref") == "baidullq" && navigator.userAgent.indexOf("baidubrowser") >= 0) {
                i.callback2Player.call(i, n.stopAD);
                i.sendEvent(s.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: 10
                });
                i.tips("tips", "百度渠道禁播");
                return
            }
            if (e.pname == "MPlayer") {
                adTools.isMStation = true;
                a.DC_AD_URL = "http://apple.www.letv.com/va/?",
                a.SKIP_AD_CLICK = "http://apple.www.letv.com/s/?k=sumtmp;H5PADQad",
                a.SKIP_AD_SUCC = "http://apple.www.letv.com/s/?k=sumtmp;H5PADQadfc",
                i.adStyle = e.style || a.AD_STYLE.pre_roll
            } else {
                i.adStyle = e.style || [a.AD_STYLE.pre_roll, a.AD_STYLE.standard]
            }
            try {
                i.staticVars.countdownElem = adTools.el("#" + i.putinVars.cont, "div")
            } catch(r) {
                H5AD.callback2Player.call(i, n.stopAD, []);
                i.sendEvent(s.OnAcComplate, {
                    error: {
                        code: 22
                    }
                });
                return
            }
            if (i.putinVars.ark) {
                o = i.putinVars.ark
            } else if ("__ADINFO__" in window && __ADINFO__.arkId) {
                o = __ADINFO__.arkId
            } else if (i.putinVars.streamid) {
                o = "!"
            } else {
                H5AD.callback2Player.call(i, n.stopAD, []);
                i.sendEvent(s.OnAcComplate, {
                    error: {
                        code: 21
                    }
                });
                return
            }
            i.staticVars.arkId = adTools.arkMapper(o);
            i.arkTimer = setTimeout(function() {
                adTools.debug("请求ark超时,播放正片");
                i.sendEvent(s.OnAcComplate, {
                    error: {
                        code: 451
                    }
                });
                H5AD.callback2Player.call(H5AD, a.CALL_PLAYER_TYPE.stopAD, [])
            },
            a.REQ_ARK_TIMEOUT);
            i.getArkData(i.adStyle, i.staticVars.arkId, i.putinVars.vid, i.putinVars.streamid)
        },
        getArkData: function(e, t, i, a) {
            var s = this,
            n = s.config,
            o = n.SEND_EVENT_TYPE,
            r = s.dynamicVars,
            d;
            if (e instanceof Array) {
                e = e.join(",")
            }
            var l = {
                ark: t,
                n: r.isFirst ? 1 : 0,
                ct: e,
                vid: i || 0
            };
            if (typeof a != "undefined") {
                a = adTools.resoSid(a);
                if (adTools.isMStation) {
                    if (br.iPhone || br.iPod) {
                        d = "471"
                    } else {
                        d = "335"
                    }
                } else {
                    d = "148"
                }
                adTools.easyClone(l, {
                    sid: a,
                    vid: "19999999",
                    b: "2",
                    ark: d
                });
                s.staticVars.arkId = d
            }
            var c = adTools.getQuery("q2"),
            h = {
                coop_yinliu: 393,
                coop_yinliu1: 394,
                coop_yinliu2: 395,
                coop_yinliu3: 396
            },
            p = h[c];
            if (p) {
                l.ark = s.staticVars.arkId = p
            }
            var f = [this.config.ARK_SHOW_URL, adTools.param(l), "j=?"].join("&");
            var u = {
                r: adTools.getQuery("r"),
                o: adTools.getQuery("o"),
                d: adTools.getQuery("d"),
                w: adTools.getQuery("w"),
                x: adTools.getQuery("x"),
                y: adTools.getQuery("y"),
                z: adTools.getQuery("z")
            };
            r.isFirst = false;
            if (u.w && u.x && u.y && u.z) {
                f = [this.config.ARK_PREVIEW_URL, adTools.param(l), adTools.param(u), "j=?"].join("&")
            }
            u = null;
            adTools.debug("请求ARK地址:" + f);
            lib.getJSON(f,
            function(i) {
                try {
                    s._resolveData.call(s, i, e, f, t)
                } catch(a) {
                    s.callback2Player(n.CALL_PLAYER_TYPE.playAD, []);
                    s.sendEvent(o.OnAcComplate, {
                        error: {
                            code: 453
                        }
                    });
                    adTools.debug(a, "解析异常：")
                }
                clearTimeout(s.arkTimer)
            },
            function(e) {
                s.sendEvent(o.OnAcComplate, {
                    error: {
                        code: 450
                    }
                });
                s.callback2Player(n.CALL_PLAYER_TYPE.stopAD, []);
                clearTimeout(s.arkTimer)
            },
            n.REQ_ARK_TIMEOUT)
        },
        tips: function(e, t, i) {
            switch (e) {
            case "tips":
                adTools.debug(t);
                break
            }
        },
        _resolveData: function(e, t, i, a) {
            var s = this,
            n = s.config,
            o, r, d = "-",
            l = 0;
            if (e && e.vast) {
                r = e.vast;
                o = r.Ad.length;
                adTools.easyClone(s.staticVars, r);
                s.dynamicVars["preAdCount"] = 0;
                s.dynamicVars["staAdCount"] = 0;
                adTools.debug("返回广告数：" + o);
                s.adQueue = [];
                s.dynamicVars["dur_total"] = 0;
                s.dynamicVars["dur"] = [];
                for (var c = 0; c < o; c++) {
                    var h = r.Ad[c],
                    p = h.InLine,
                    f = h["cuepoint_type"],
                    u = p.Creatives.Creative[0],
                    v = {};
                    if (o === 1 && this.adStyle instanceof Array) {
                        if (f == n.AD_STYLE.pre_roll) {
                            this.adStyle.pop()
                        } else if (f == n.AD_STYLE.standard) {
                            this.adStyle.shift()
                        }
                    }
                    adTools.easyClone(v, h);
                    var g = new AdMaterial(u.Linear.AdParameters, u.Linear.VideoClicks.ClickThrough, u.Linear.VideoClicks.ClickTracking, u.Linear.TrackingEvents.Tracking, p.Impression, v["order_item_id"], v["order_id"], u.Linear["Duration"], f, u.Linear["adzone_id"], c, h.lc);
                    if (g.hasMZ) {++l
                    }
                    s.adQueue.push(g);
                    v.duration = g.duration;
                    if (f == n.AD_STYLE.pre_roll) {
                        s.dynamicVars["dur"].push(v.duration);
                        s.dynamicVars["dur_total"] += v.duration;
                        s.dynamicVars["preAdCount"]++;
                        s.dynamicVars["adidQueue"].push(v["order_item_id"])
                    } else if (f == n.AD_STYLE.standard) {
                        s.dynamicVars["staAdCount"]++;
                        s.dynamicVars["stadur"] = v["duration"];
                        d = v["order_item_id"]
                    }
                }
                var b = function() {
                    adTools.getAslbUrl(s.adQueue,
                    function(e) {
                        adTools.debug(e, "返回ASLB—Data:");
                        s.callback2Player.call(s, n.CALL_PLAYER_TYPE.playAD, e);
                        s.downMaterialTimer = lib.now()
                    })
                };
                if (l > 0) {
                    for (var m = 0; m < s.adQueue.length; m++) {
                        var _ = s.adQueue[m];
                        if (_.hasMZ) {
                            s._reqThirdParty(_,
                            function(e, t) {--l;
                                if (e) {
                                    b();
                                    return
                                }
                                s.adQueue[t.curIdx] = t;
                                if (l === 0) b()
                            })
                        }
                    }
                } else {
                    b()
                }
                s.sendEvent(n.SEND_EVENT_TYPE.OnAcComplate, {
                    atype: "2",
                    ct: s.dynamicVars["preAdCount"]
                });
                if (adTools.isMStation === false) {
                    s.sendEvent(n.SEND_EVENT_TYPE.OnAcComplate, {
                        atype: "3",
                        ct: s.dynamicVars["staAdCount"],
                        dur: s.dynamicVars["stadur"] || "0",
                        oiid: d
                    })
                }
            } else {
                s.callback2Player.call(s, n.CALL_PLAYER_TYPE.playAD, []);
                s.sendEvent(n.EVENT_TYPE.OnAcComplate, {
                    error: {
                        code: 453
                    }
                })
            }
        },
        _reqThirdParty: function(e, t) {
            var i = this,
            a = i.config,
            s;
            if (e) {
                if (e.hasMZ === true) {
                    s = e.url;
                    var n = adTools.getQuery("v", s);
                    if (!n) {
                        s += "v=2&c=?"
                    } else {
                        s = s.replace(new RegExp("v=" + n), "v=2&c=?")
                    }
                    lib.getJSON(s,
                    function(i) {
                        try {
                            if (!i) {
                                return t(null, null)
                            }
                            e.url = i.src || "";
                            if (!e.clickUrl) {
                                e.clickUrl = i.ldp || ""
                            }
                            if (e.tracking.constructor == Array) {
                                e.tracking.concat(i.cm || [])
                            }
                            if (i.pm) {
                                for (var a in i.pm) {
                                    if (i.pm.hasOwnProperty(a)) {
                                        if (a == "0") {
                                            e.impression.concat(i.pm[a])
                                        } else {
                                            if (i.pm[a].constructor == Array) {
                                                for (var s = 0; s < i.pm[a].length; s++) {
                                                    var n = i.pm[a][s];
                                                    if (n != "") {
                                                        e.event.push({
                                                            event: "progress",
                                                            offset: a,
                                                            cdata: n
                                                        });
                                                        e.progressTicks.push(a)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            t(null, e)
                        } catch(o) {}
                    },
                    function(e) {
                        t(e, null)
                    },
                    a.REQ_ARK_TIMEOUT)
                }
            }
            return e
        },
        retry: function(e) {
            return;
            adTools.debug("发起重试" + e);
            e = e || this.dynamicVars.curIdx;
            if (this.dynamicVars.retry > 2 || e > this.adQueue.length - 1) {
                this.sendEvent(this.config.EVENT_TYPE.OnError, {});
                return
            }++this.dynamicVars.retry;
            var t = this.adQueue.splice(e);
            this.callback2Player.call(this, this.config.CALL_PLAYER_TYPE.playAD, t)
        },
        _getUniqueId: function() {
            var e = Math;
            return "ad_" + Array.prototype.join.call(arguments, "_") + String(e.ceil(e.random() * 1e4))
        },
        sendEvent: function(e, t) {
            var i = H5AD;
            try {
                var a = i.config,
                s = a.SEND_EVENT_TYPE,
                n = t.curAD;
                if (!n && e != s.OnAcComplate) {
                    i.collectError("1827&err=itemIsNull&type=" + e + "&lc=" + i.putinVars.lc, 3);
                    return
                }
                switch (e) {
                case s.OnAcComplate:
                    {
                        i._sendUserLog(0, t);
                        adTools.debug("AC结束");
                        break
                    }
                case s.OnStart:
                    {
                        if (i.dynamicVars["dur_total"] == "0") {
                            return
                        }
                        if (i.dynamicVars.hasPlayed === false) {
                            i._sendUserLog(1, t);
                            i._sendArkTracking(1, t);
                            n.sendEvent("start", i._sendArkTracking)
                        }
                        var o = i.callback2Player.call(i, a.CALL_PLAYER_TYPE.getRealTime);
                        if (o == 0) {
                            i.playingMonitorCount = i.playingMonitorCount || 0;
                            if (i.playingMonitor) clearTimeout(i.playingMonitor);
                            i.playingMonitor = setTimeout(function() {++i.playingMonitorCount;
                                if (i.playingMonitorCount > 5) {
                                    i.playingMonitorCount = null;
                                    return
                                }
                                var e = i.callback2Player.call(i, a.CALL_PLAYER_TYPE.getRealTime);
                                if (e == 0) {
                                    i.callback2Player.call(i, a.CALL_PLAYER_TYPE.resumeAD)
                                }
                            },
                            2e3)
                        }
                        i.dynamicVars.hasPlayed = true;
                        if (n.adType == a.AD_STYLE.pre_roll) {
                            n.seeDetail();
                            n.closeBigPlay();
                            n.renderRealCd(i.dynamicVars["dur_total"], t, i.dynamicVars["dur"]);
                            i.playAdTimer = i.playAdTimer || [];
                            clearTimeout(i.playAdTimer[t.curIndex]);
                            i.playAdTimer[t.curIndex] = setTimeout(function() {
                                adTools.debug(t.curIndex + " 广告播放超时");
                                lib.merge(t, {
                                    error: {
                                        code: 461
                                    }
                                });
                                i._sendUserLog(1, t);
                                i.callback2Player.call(i, a.CALL_PLAYER_TYPE.stopAD);
                                n.closeCountDown()
                            },
                            n.duration * 1e3 + a.DOWNLOAD_URL_TIMEOUT)
                        } else if (n.adType == a.AD_STYLE.standard) {
                            n.seeDetail();
                            n.closeBigPlay();
                            i.playAdTimer = i.playAdTimer || [];
                            clearTimeout(i.playAdTimer[t.curIndex]);
                            i.playAdTimer[t.curIndex] = setTimeout(function() {
                                adTools.debug(t.curIndex + " 广告播放超时");
                                lib.merge(t, {
                                    error: {
                                        code: 461
                                    }
                                });
                                i._sendUserLog(1, t);
                                i.callback2Player.call(i, a.CALL_PLAYER_TYPE.stopAD);
                                n.closeSeeDetail()
                            },
                            n.duration * 1e3 + a.DOWNLOAD_URL_TIMEOUT)
                        }
                        adTools.debug(t.curIndex + " 开始播放广告");
                        break
                    }
                case s.OnComplate:
                    {
                        if (n.adType == a.AD_STYLE.pre_roll) {
                            n.closeSeeDetail();
                            n.closeBigPlay(t);
                            if (t.curIndex + 1 == i.dynamicVars["preAdCount"]) {
                                n.closeCountDown()
                            } else {
                                n.pauseCountDown()
                            }
                        } else if (n.adType == a.AD_STYLE.standard) {
                            n.closeCountDown()
                        }
                        clearTimeout(i.playAdTimer[t.curIndex]);
                        i._sendUserLog(3, t);
                        n.sendEvent("complete", i._sendArkTracking);
                        adTools.debug(t.curIndex + "段广告播放完成");
                        i.dynamicVars.hasPlayed = false;
                        break
                    }
                case s.OnClick:
                    {
                        break
                    }
                case s.OnPause:
                    {
                        if (i.playingMonitor) clearTimeout(i.playingMonitor);
                        if (H5AD.playAdTimer && H5AD.playAdTimer.length > 0) {
                            clearTimeout(H5AD.playAdTimer[t.curIndex])
                        }
                        n.pauseCountDown();
                        n.renderBigPlay(t);
                        adTools.debug(t.curIndex + " 暂停");
                        break
                    }
                case s.OnError:
                    {
                        i._sendUserLog(1, t);
                        if (n.adType == a.AD_STYLE.pre_roll) {
                            clearTimeout(i.playAdTimer[t.curIndex]);
                            var r = i.dynamicVars["dur_total"];
                            for (var d = 0; d < t.curIndex; d++) {
                                r -= i.dynamicVars["dur"][d]
                            }
                            n.closeCountDown()
                        }
                        adTools.debug(t.error, t.curIndex + " 播放器遇到错误，回调");
                        i.dynamicVars.hasPlayed = false;
                        break
                    }
                case s.OnASLB:
                    {
                        i._sendUserLog(5, t);
                        break
                    }
                case s.OnLoginAc:
                    {
                        n.loginAc(t.level);
                        break
                    }
                default:
                    break
                }
            } catch(l) {
                i.collectError("974," + (l || {}).stack, 3)
            }
        },
        _sendUserLog: function(e, t) {
            t = t || {};
            var i = H5AD,
            a = i.config,
            s = i.putinVars,
            n = i.dynamicVars,
            o = Math;
            if (!n.dur) {
                lib.merge(n, {
                    dur: ["-"],
                    dur_total: "-",
                    adCount: 0
                })
            }
            _adItem = t.curAD || {};
            var r = {
                act: "event",
                atype: t.atype || _adItem.adType,
                id: "-",
                ia: 0,
                err: 0,
                lc: s.lc || "-",
                ver: "2.0",
                aps: a.H5_ADPLAYER_VER,
                ch: s.ch,
                cid: s.cid || "-",
                ct: t.ct || 0,
                dur: t.dur || n.dur.join("_") || "0",
                dur_total: t.dur || n.dur_total || "0",
                mmsid: s.mmsid || "-",
                pid: s.pid || "-",
                r: o.ceil(o.random() * lib.now()),
                cur_url: encodeURIComponent(location.href),
                ry: n["retry"] || 0,
                ref: encodeURIComponent(document.referrer) || "-",
                sys: 1,
                uname: s.uname || "-",
                uid: s.uid || "-",
                py: s.up,
                uuid: s.uuid,
                pv: s.ver,
                vid: s.vid || "-",
                vlen: s.gdur || "-",
                p1: s.p1,
                p2: s.p2,
                ontime: "-",
                p3: s.p3 == s.p3 ? "-": s.p3,
                ty: s.islive ? 1 : 0
            };
            switch (e) {
            case 0:
                {
                    r.act = "ac";
                    r.ry = $js.retryCount;
                    r.ia = t.ia || "0";
                    if (s.isvip) {
                        r.ia = t.isvip || "1";
                        r.ry = "0"
                    }
                    if (t.error) {
                        r.err = t.error.code
                    }
                    r.ut = $js.responseTime;
                    if (r.atype == "3") {
                        r.atype = "13"
                    }
                    r.oiid = t.oiid || i.dynamicVars["adidQueue"].join("_") || "-";
                    i._sendData(i.config.DC_AD_URL + adTools.param(r));
                    break
                }
            case 1:
                {
                    r.ut = lib.now() - i.downMaterialTimer;
                    i.lastCostTime = r.ut;
                    if (t.error) {
                        switch (t.error.code) {
                        case 1:
                            r.err = 460;
                            break;
                        case 2:
                            r.err = 461;
                            break;
                        case 3:
                            r.err = 463;
                            break;
                        case 4:
                            r.err = 469;
                            break;
                        default:
                            r.err = t.error.code || 0;
                            break
                        }
                        r.loc = encodeURIComponent(_adItem.url)
                    }
                    r.dur = _adItem.duration;
                    r.ftype = "video";
                    r.id = e;
                    r.ry = 1;
                    r.atype = _adItem.adType;
                    r.ord = (parseInt(_adItem.curIdx) || 0) + 1;
                    if (r.ct > 0 && r.ord > r.ct) {
                        r.ord = 1;
                        i.collectError("1129&data=" + r.ord + "&idx=" + _adItem.curIndex + "&lc=" + i.putinVars.lc, 3)
                    }
                    if (r.atype == a.AD_STYLE.standard) {
                        r.dur_total = r.dur;
                        r.ord = 1;
                        r.ct = i.dynamicVars["staAdCount"]
                    } else {
                        r.ct = i.dynamicVars["preAdCount"]
                    }
                    if (r.atype == "3") {
                        r.atype = "13"
                    }
                    r.oiid = _adItem.oid || i.dynamicVars["adidQueue"][t.curIndex];
                    i._sendData(i.config.DC_AD_URL + adTools.param(r));
                    break
                }
            case 2:
            case 3:
                {
                    r.dur = _adItem.duration;
                    r.ut = lib.now() - i.downMaterialTimer - i.lastCostTime;
                    r.ftype = "video";
                    r.id = e;
                    r.atype = _adItem.adType;
                    r.ord = (parseInt(_adItem.curIdx) || 0) + 1;
                    if (r.ct > 0 && r.ord > r.ct) {
                        r.ord = 1;
                        i.collectError("1129&data=" + r.ord + "&idx=" + _adItem.curIndex + "&lc=" + i.putinVars.lc, 3)
                    }
                    if (r.atype == a.AD_STYLE.standard) {
                        r.dur_total = r.dur;
                        r.ord = 1;
                        r.ct = i.dynamicVars["staAdCount"]
                    } else {
                        r.ct = i.dynamicVars["preAdCount"]
                    }
                    if (r.atype == "3") {
                        r.atype = "13"
                    }
                    r.oiid = _adItem.oid || i.dynamicVars["adidQueue"][_adItem.curIdx];
                    i._sendData(i.config.DC_AD_URL + adTools.param(r));
                    if (e == 3) {
                        i.downMaterialTimer = lib.now()
                    }
                    break
                }
            case 5:
                {
                    adTools.debug("ASLB结束");
                    if (_adItem.err) {
                        r.loc = encodeURIComponent(_adItem.url);
                        r.err = _adItem.err
                    }
                    r.act = "aslb";
                    r.ut = _adItem.costTime;
                    r.ry = _adItem.ryCount;
                    r.atype = _adItem.adType;
                    r.ord = (parseInt(_adItem.curIdx) || 0) + 1;
                    if (r.ct > 0 && r.ord > r.ct) {
                        r.ord = 1
                    }
                    if (r.atype == a.AD_STYLE.standard) {
                        r.ord = 1;
                        i.collectError("1129&data=" + r.ord + "&idx=" + _adItem.curIndex + "&lc=" + i.putinVars.lc, 3)
                    }
                    r.oiid = _adItem.oid || i.dynamicVars["adidQueue"][_adItem.curIdx];
                    delete r.ct;
                    delete r.dur;
                    delete r.dur_total;
                    delete r.ia;
                    if (r.atype == "3") {
                        r.atype = "13"
                    }
                    i._sendData(i.config.DC_AD_URL + adTools.param(r));
                    break
                }
            default:
                break
            }
        },
        _getCtUrl: function(e, t) {
            t = t || 2;
            return this._getAttachParam(e.clickUrl, e.aduid, t, 1, e)
        },
        _getAdStyle: function(e) {
            if (!this.adStyle) {
                return null
            }
            if (this.adStyle instanceof Array && this.adStyle.length - 1 >= e) {
                return this.adStyle[e]
            }
            return this.adStyle
        },
        _sendArkTracking: function(e, t) {
            var i = this,
            a = [],
            s,
            n = t ? t.curAD: {};
            switch (e) {
            case 1:
                a = n.impression;
                for (s = 0; s < a.length; s++) {
                    var o = "";
                    if (typeof a[s] == "object") {
                        if (a[s].cdata && a[s].cdata.length > 0) {
                            o = a[s].cdata
                        }
                    } else {
                        o = a[s]
                    }
                    i._sendData(i._getAttachParam, o, n.aduid, e, 1, n)
                }
                break;
            case 2:
                a = n.tracking;
                for (s = 0; s < a.length; s++) {
                    var o = "";
                    if (typeof a[s] == "object") {
                        if (a[s].cdata && a[s].cdata.length > 0) {
                            o = a[s].cdata
                        }
                    } else {
                        o = a[s]
                    }
                    i._sendData(i._getAttachParam, o, n.aduid, 3, 1, n)
                }
                break;
            case 4:
                a = t;
                var n = arguments[2];
                if (a && a.length > 0) {
                    for (s = 0; s < a.length; s++) {
                        i._sendData(i._getAttachParam, a[s], n.aduid, e, 1, n)
                    }
                }
                break
            }
        },
        _getAttachParam: function(e, t, i, a, s) {
            var n = H5AD,
            o = n.config;
            if (!e || e === "javascript:void(0)") return "javascript:void(0)";
            if (e.indexOf(o.ARK_DOMAIN) > -1) {
                var r = (new Date).getTime(),
                d = n.staticVars,
                l = n.putinVars;
                var c = {
                    rt: i,
                    oid: s.oid,
                    im: a === undefined ? 1 : a,
                    t: d["stime"] + Math.ceil((r - n.startTime) / 1e3),
                    data: [t, d["area_id"], d.arkId || 0, l.uuid, s.orderid, l.vid || "", l.pid || "", l.cid || "", s.lc || "1", s.adType || "2", n.putinVars.ch || "letv", adTools.resoSid(n.putinVars.streamid) || "", s.curIdx + 1 || 0].join(",")
                };
                c.s = n._getSecurityKey(c);
                if (i == 2) {
                    if (e.indexOf("[randnum]") > -1) {
                        e = e.replace("[randnum]", (new Date).getTime())
                    }
                    if (e.indexOf("[M_IESID]") > -1) {
                        e = e.replace("[M_IESID]", "LETV_" + t)
                    }
                    if (e.indexOf("[M_ADIP]") > -1) {
                        e = e.replace("[M_ADIP]", n.staticVars["ip"])
                    }
                    if (e.indexOf("[A_ADIP]") > -1) {
                        e = e.replace("[A_ADIP]", n.staticVars["ip"])
                    }
                    var h = e.split("&u=");
                    e = [h[0], adTools.param(c), "u=" + h[1]].join("&")
                } else {
                    e += "&" + adTools.param(c)
                }
            } else {
                if (e.indexOf("[randnum]") > -1) {
                    e = e.replace("[randnum]", (new Date).getTime())
                }
                if (e.indexOf("[M_IESID]") > -1) {
                    e = e.replace("[M_IESID]", "LETV_" + t)
                }
                if (e.indexOf("[M_ADIP]") > -1) {
                    e = e.replace("[M_ADIP]", n.staticVars["ip"])
                }
                if (e.indexOf("http://v.admaster.com.cn") > -1) {
                    e = e + ",f" + n.staticVars["ip"]
                }
            }
            return e
        },
        _getSecurityKey: function(e) {
            var t = this.config.crc_table;
            var i = 0,
            a = 0,
            s = 0,
            n = "",
            o = "";
            for (var r in e) {
                o += e[r]
            }
            n = o.length;
            for (i = 0; i < n; i++) {
                var d = o.charCodeAt(i);
                var l = a & 15 | (d & 15) << 4;
                s = t[l];
                a = a >> 4 ^ s;
                s = t[a & 15 | d & 240];
                a = a >> 4 ^ s
            }
            return a.toString(16)
        },
        _sendData: function(e) {
            var t = e;
            if (typeof arguments[0] == "function") {
                t = arguments[0].apply(this, [].slice.call(arguments, 1))
            }
            if (!t || t == "") {
                return
            }
            var i = lib.createElement("img", {
                src: t
            });
            adTools.debug("发起url : " + t);
            $js(i).on("load",
            function() {
                i = null
            })
        },
        collectError: function(e, t) {
            t = t || 2;
            if (Math.floor(Math.random() * 100) % t != 0) {
                return
            }
            if (e && typeof e == "object") { (new Image).src = "http://ark.letv.com/apsdbg/?msg=" + encodeURI(e.stack);
                return
            } (new Image).src = "http://ark.letv.com/apsdbg/?msg=" + encodeURI(e)
        }
    };
    function AdMaterial(e, t, i, a, s, n, o, r, d, l, c, h) {
        this.duration = parseInt(r) || 0;
        this.impression = s;
        this.clickUrl = t;
        this.tracking = i;
        this.event = a;
        this.oid = n;
        this.orderid = o;
        this.curIdx = c;
        this.resolveAdParam(e);
        this.adType = d + "";
        this.aduid = l;
        this.lc = h;
        this.initEvent()
    }
    AdMaterial.prototype = {
        resolveAdParam: function(e) {
            var t = adTools.json(e);
            if (t.hdurl && t.hdurl.length > 0 && adTools.getDeviceSize.x > 960 && adTools.getDeviceSize.y > 640) {
                this.url = t.hdurl
            } else if (t.hpg_url && t.hpg_url.length > 0) {
                this.url = t.hpg_url;
                this.hasMZ = true
            } else {
                this.url = t.url
            }
            if (t.sg === "1" || t.sg === undefined || adTools.isMStation === false) {
                this.renderCd = true
            }
            if (t.duration) {
                this.duration = parseInt(t.duration)
            }
            this.pid = t.pid || 0;
            this.vid = t.vid || 0
        },
        initEvent: function() {
            var e = H5AD.config.PROCESS_EVENT_TICKS,
            t, i, a;
            this.progressTicks = [];
            if (this.event && this.event.length > 0) {
                for (i = 0; i < this.event.length; i++) {
                    t = this.event[i];
                    if (t.offset != undefined) {
                        this.progressTicks.push(t.offset)
                    } else {
                        for (a = 0; a < e.length; a++) {
                            if (t.event == e[a].k) {
                                this.event[i].event = "progress";
                                this.event[i].offset = this.duration * e[a].v || 0;
                                this.progressTicks.push(this.event[i].offset)
                            }
                        }
                    }
                }
            }
            AdMaterial.curAd = this
        },
        sendEvent: function(e, t, i) {
            try {
                var a = this.getTrackArr(e, i);
                t.call(H5AD, 4, a, this)
            } catch(s) {
                adTools.debug("进度监测出错" + s.stack)
            }
        },
        getTrackArr: function(e, t) {
            var i, a = [];
            if (this.event && this.event.length > 0) {
                for (var i = 0; i < this.event.length; i++) {
                    if (this.event[i]["event"] == e) {
                        if (t != undefined) {
                            if (t == this.event[i]["offset"]) {
                                a.push(this.event[i].cdata);
                                this.event[i]["event"] = "hadSent"
                            }
                        } else {
                            a.push(this.event[i].cdata);
                            this.event[i]["event"] = "hadSent"
                        }
                    }
                }
            }
            return a
        },
        renderRealCd: function(e, t, i) {
            var a = this,
            s, n, o = 0,
            r = 0,
            d = Math,
            l = H5AD,
            c = adTools.el("#div_cdown"),
            h,
            p = e,
            f;
            if (a.progressTicks.length > 0) {
                clearInterval(a.processTimer);
                a.processTimer = setInterval(function() {
                    f = l.callback2Player(l.config.CALL_PLAYER_TYPE.getRealTime) || 0;
                    for (var e = 0; e < a.progressTicks.length; e++) {
                        if (d.abs(a.progressTicks[e] - f) <= 1) {
                            adTools.debug("进度监测：offset:" + a.progressTicks[e] + ",curTime:" + f + "," + e);
                            a.sendEvent("progress", l._sendArkTracking, a.progressTicks[e]);
                            a.progressTicks.splice(e, 1);
                            if (a.progressTicks.length == 0) {
                                clearInterval(a.processTimer)
                            }
                            break
                        }
                    }
                },
                1e3)
            } else {
                clearInterval(a.processTimer)
            }
            if (!adTools.canBeClicked) {
                return
            }
            if (a.renderCd != true) {
                adTools.removeElem(adTools.el("#vdo_post_time"));
                return
            }
            for (s = a.curIdx; s >= 0; s--) {
                p -= i[s]
            }
            var u = function(e, t, i) {
                var n = e;
                for (s = 0; s < a.curIdx; s++) {
                    n -= i[s]
                }
                o = l.callback2Player(l.config.CALL_PLAYER_TYPE.getRealTime) || 0;
                n -= d.ceil(o);
                return n
            };
            n = u.apply(this, arguments);
            var v = function(e) {
                var t = e.toString(),
                i = "",
                a,
                s;
                for (a = 0; a < t.length; a++) {
                    i += '<em id="cd_' + String(a) + '" class="precdImg" style="' + (t.length < 2 ? "float:right;": "") + "background-image:url(" + H5AD.config.COUNTDOWN_IMG_URL + ");background-position:0 " + -parseInt(t.charAt(a)) * 20 + 'px;background-repeat: no-repeat;"></em>'
                }
                return i
            };
            if (adTools.existEl(c)) {
                h = adTools.el("#div_cdown")
            } else {
                h = lib.createElement("div", {
                    className: "vdo_post_time",
                    id: "vdo_post_time"
                });
                var g = '<a href="javascript:;" id="vdo_skip_pre">跳过广告</a>';
                if (adTools.isMStation) {
                    g = ""
                }
                h.innerHTML = ['<div class="vdo_post_rlt">', '<div class="vdo_time_bg"></div>', '<div class="vdo_time_info"><span id="div_cdown"></span>' + g + "</div>", "</div>"].join("");
                l.staticVars.countdownElem.appendChild(h);
                $js("#vdo_skip_pre").on("click",
                function() {
                    a.skipAd()
                });
                $js("#div_cdown")[0].innerHTML = v(n)
            }
            clearInterval(a.countdownTimer);
            a.countdownTimer = setInterval(function() {
                var n = u(e, t, i);
                if (n < 0) {
                    a.closeCountDown();
                    return
                }
                if (n < p) {
                    a.pauseCountDown();
                    return
                }
                var o = n.toString();
                var r = e.toString().length - o.length;
                s = 0;
                if (r > 0) {
                    for (s = 0; s < r; s++) {
                        adTools.el("#cd_" + String(s)).style.backgroundPosition = "0 -200px"
                    }
                }
                for (j = o.length - 1; j >= 0; j--) {
                    var d = parseInt(o.charAt(j)) * 20,
                    l = adTools.el("#cd_" + String(j + s));
                    if (adTools.existEl(l)) {
                        l.style.backgroundPosition = "0 " + -d + "px"
                    } else {
                        clearInterval(a.countdownTimer);
                        clearInterval(a.processTimer);
                        return
                    }
                }
            },
            500)
        },
        renderBigPlay: function(e) {
            if (!adTools.canBeClicked) {
                return
            }
            var t = this;
            var i = H5AD.staticVars.countdownElem;
            var a = adTools.el("#btn_a_resume");
            if (adTools.existEl(a)) {
                adTools.removeElem(a)
            }
            a = lib.createElement("div", {
                id: "btn_a_resume",
                className: "hv_ico_pasued"
            });
            a.style.display = "block";
            i.appendChild(a);
            $js(a).on("click",
            function(i) {
                i.stopPropagation();
                i.cancelBubble = true;
                t.closeBigPlay(e);
                H5AD.callback2Player(H5AD.config.CALL_PLAYER_TYPE.resumeAD)
            })
        },
        seeDetail: function() {
            if (!adTools.canBeClicked) {
                return
            }
            var e = this,
            t = adTools.el("#a_see_detail"),
            i = adTools.el("#a_see_more"),
            a = H5AD.staticVars.countdownElem,
            s = adTools.el(".hv_ico_pasued"),
            n = H5AD._getCtUrl(e, 2);
            if (adTools.existEl(i)) {
                adTools.el("#a_see_detail").setAttribute("href", n);
                adTools.el("#a_see_more").setAttribute("href", n)
            } else {
                t = lib.createElement("a", {
                    target: "_blank",
                    href: n,
                    id: "a_see_detail",
                    className: "aps_mask_cont"
                });
                i = lib.createElement("div", {
                    className: "vdo_post_detail"
                });
                i.innerHTML = ['<div class="vdo_post_rlt">', ' <div class="vdo_detail_bg"></div>', '<div class="vdo_detail_info"><a id="a_see_more" href="' + n + '" target="_blank">了解详情<i></i></a></div>', "</div>"].join("");
                if (adTools.existEl(s)) {
                    if (!adTools.isUC) {
                        a.insertBefore(t, s)
                    }
                    a.insertBefore(i, s)
                } else {
                    if (!adTools.isUC) {
                        a.appendChild(t)
                    }
                    a.appendChild(i)
                }
                var o = function(t) {
                    t.stopPropagation();
                    t.cancelBubble = true;
                    if (H5AD.dynamicVars.hasPlayed === false) {
                        return
                    }
                    n = H5AD._getCtUrl(e, 2);
                    adTools.el("#a_see_detail").setAttribute("href", n);
                    adTools.el("#a_see_more").setAttribute("href", n);
                    H5AD.callback2Player(H5AD.config.CALL_PLAYER_TYPE.pauseAD);
                    H5AD._sendUserLog(2, {
                        curAD: e,
                        curIndex: 0
                    });
                    H5AD._sendArkTracking(2, {
                        curAD: e,
                        curIndex: 0
                    });
                    if (e.pid && e.vid) {
                        e.openInApp(e.pid, e.vid)
                    }
                };
                $js(t).on("click", o);
                $js(i).on("click", o)
            }
        },
        openInApp: function(e, t, i) {
            var a = "letvclient://msiteAction?actionType=0&pid=" + encodeURIComponent(e) + "&vid=" + encodeURIComponent(t) + "&from=mletv";
            if (br.Android) {
                var s = document.createElement("iframe");
                s.style.cssText = "width:0px;height:0px;position:fixed;top:0;left:0;";
                s.src = a;
                document.body.appendChild(s)
            } else {
                location.href = a
            }
        },
        closeSeeDetail: function() {
            if (!adTools.canBeClicked) {
                return
            }
            var e = adTools.el("#a_see_detail"),
            t = adTools.el(".vdo_post_detail");
            if (adTools.existEl(e)) {
                adTools.removeElem(e)
            }
            if (adTools.existEl(t)) {
                adTools.removeElem(t)
            }
        },
        closeBigPlay: function(e) {
            if (!adTools.canBeClicked) {
                return
            }
            var t = H5AD;
            var i = adTools.el("#btn_a_resume");
            if (adTools.existEl(i)) {
                adTools.removeElem(i)
            }
        },
        closeCountDown: function() {
            if (!adTools.canBeClicked) {
                return
            }
            clearInterval(this.countdownTimer);
            clearInterval(this.processTimer);
            var e = adTools.el("#vdo_post_time");
            if (adTools.existEl(e)) {
                this.pauseCountDown();
                adTools.removeElem(e)
            }
            this.closeBigPlay();
            this.closeSeeDetail()
        },
        pauseCountDown: function() {
            if (!adTools.canBeClicked) {
                return
            }
            clearInterval(this.countdownTimer);
            clearInterval(this.processTimer)
        },
        skipAd: function() {
            var e = H5AD,
            t = e.config,
            i = t.CALL_PLAYER_TYPE,
            a = e.callback2Player,
            s = e.staticVars.countdownElem,
            n;
            n = adTools.el(".aps_pop_poster");
            a.call(e, i.pauseAD);
            if (!adTools.existEl(n)) {
                n = lib.createElement("div", {
                    className: "aps_pop_poster",
                    id: "aps_login"
                });
                n.innerHTML = ['<div class="hv_pop_poster">', '<p class="hv_p1">如果您已是会员，请登录</p>', '<p><a href="javascript:;" id="aps_login_button">登录</a></p>', '<p>看大片无广告，<span class="hv_org">7天</span>会员免费体验</p>', '<p><a href="http://yuanxian.letv.com/zt2014/7days/index.shtml?ref=H5PADQad" target="_blank" class="blu">立即领取</a></p>', '<a href="javascript:;" id="aps_login_close" class="close"><i></i><i class="i_1"></i></a></div>'].join("");
                s.appendChild(n);
                e._sendData(t.SKIP_AD_CLICK);
                $js("#aps_login_button").on("click",
                function(e) {
                    a(i.doLogin)
                });
                $js("#aps_login_close").on("click",
                function(t) {
                    a.call(e, i.resumeAD);
                    adTools.removeElem(adTools.el("#aps_login"))
                })
            }
            adTools.debug("点击跳过广告")
        },
        loginAc: function(e) {
            var t = H5AD,
            i = t.config,
            a = i.CALL_PLAYER_TYPE,
            s = t.callback2Player;
            if (e) {
                s(a.stopAD);
                this.closeCountDown();
                t._sendData(i.SKIP_AD_SUCC)
            } else {
                s(a.resumeAD)
            }
            adTools.debug("登录完成，返回level：" + e);
            adTools.removeElem($js(".aps_pop_poster")[0])
        }
    };
    function WS(e) {
        var t = this,
        i;
        t.support = "WebSocket" in window;
        t.ready = false;
        t.target = e;
        t.mq = [];
        t.open()
    }
    WS.prototype = {
        open: function() {
            var e = this;
            if (e.support) {
                ws = new WebSocket(e.target);
                ws.onopen = function(t) {
                    e.onopen.apply(e, arguments)
                };
                ws.onmessage = function(t) {
                    e.onmessage.apply(e, arguments)
                };
                ws.onerror = function(t) {
                    e.onerror.apply(e, arguments)
                };
                ws.onclose = function() {
                    e.onclose.apply(e, arguments)
                };
                e.socket = ws
            } else {
                alert("your br not support ws")
            }
            e.soldier()
        },
        addLog: function(e) {
            this.mq.push({
                time: +new Date,
                data: e
            })
        },
        send: function(e, t) {
            this.socket.send("[" + t + "]," + e)
        },
        sendHttp: function(e, t) {
            adTools.sendLogs(e, t)
        },
        close: function() {
            if (this.support) {
                this.socket.close()
            }
        },
        onopen: function(e) {
            this.ready = true;
            console.log("onopen:");
            console.log(arguments)
        },
        onmessage: function(e) {
            var t = "",
            i = AdMaterial.curAd,
            a = H5AD.callback2Player,
            s = H5AD.config.CALL_PLAYER_TYPE;
            if (e.data) {
                t = e.data.split(":")[1].replace("\r", "").replace("\n", "");
                switch (t) {
                case "connect":
                case "connected":
                    break;
                case "closecd":
                    i.closeCountDown();
                    break;
                case "closedetail":
                    i.closeSeeDetail();
                    break;
                case "requestad":
                    H5AD.initAD();
                    break;
                case "refresh":
                    location.reload();
                    break;
                case "stopad":
                    i.closeCountDown();
                    a(s.stopAD);
                    break;
                case "resumead":
                    a(s.resumeAD);
                    break;
                case "pausead":
                    a(s.pauseAD);
                    break;
                default:
                    this.send("error command!");
                    break
                }
            }
        },
        onerror: function() {
            alert("ws:error:");
            this.ready = false
        },
        onclose: function() {
            alert("ws:close:");
            this.ready = false
        },
        soldier: function() {
            var e = this,
            t = 0,
            i = 16,
            a;
            e.mqTimer = setInterval(function() {
                var s = 0,
                n, o;
                if (e.support && e.ready && e.socket) {
                    a = e.send
                } else {
                    a = e.sendHttp
                }
                while (n = e.mq.shift()) {
                    o = n.data;
                    if (typeof o !== "string") {
                        o = adTools.json(o)
                    }
                    a.call(e, o, n.time)
                }
                if (++t > i && e.mq.length == 0) {
                    adTools.debug("ws: soldier time out!");
                    clearInterval(e.mqTimer)
                }
            },
            2e3)
        }
    };
    module.exports = H5AD
});
define("proxy.pingback",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("extend.detect"),
    n = e("module.stat"),
    o = {};
    var r = function(e) {
        this.model = e;
        this.option = e.option;
        this.vinfo = e.vinfo;
        this.evt = e.events;
        o[e.option.cont] = this;
        var t = e.option.pname === "MPlayer" ? "http://apple.www.letv.com": "http://dc.letv.com";
        this.config = {
            EnvUrl: t + "/env/?",
            ActionUrl: t + "/pl/?",
            CNTVUrl: t + "/w/?",
            PlayCountUrl: "http://stat.letv.com/vplay/VideoViewSubmit.php?",
            ErrorUrl: "http://stat.letv.com/flverr?",
            ComScore: "http://b.scorecardresearch.com/b?",
            browser: [["qq", "(tencenttraveler)\\s([0-9].[0-9])"], ["ff", "(firefox)\\/([0-9])"], ["ff", "(minefield)\\/([0-9])"], ["ff", "(shiretoko)\\/([0-9])"], ["opera", "(opera)\\/([0-9])"], ["ie", "(msie)\\s([0-9].[0-9])"], ["chrome", "(chrome)\\/([0-9])"], ["qq", "(QQBrowser)\\/([0-9])"], ["UC", "(UCBrowser)\\/([0-9])"], ["safa", "(safari)\\/([0-9])"]],
            system: [["winxp", "(windows nt 5.1)"], ["win vista", "(windows nt 6.0)"], ["windows 7", "(windows nt 6.1)"], ["windows me", "(windows me)"], ["macintosh", "(macintosh)"], ["WPhone", "(Windows Phone)"], ["Android", "(Android)"], ["ipad", "(iPad)"], ["iPhone", "(iPhone)"], ["Symbian", "(SymbianOS)"], ["linux", "(linux)"]]
        };
        this.errorStatus = -1;
        this.responseTime = 0;
        this.retryCount = 0;
        this.init()
    };
    r.prototype = {
        init: function() {
            var e = s.iPad ? "iPad": s.Android ? "Android": s.iPhone ? "iPhone": s.iPod ? "iPod": "unk",
            t = /(Android \d.\d.\d)|(OS \d_\d)/.exec(navigator.userAgent),
            i = t != null ? t[0].replace(" ", "_") : "unk";
            this.ch = ["html5", e, i, this.option.version].join("-");
            var o = this.option.flashvar;
            var r = this.option.isLive;
            var d = {
                ver: "2.0",
                p1: "0",
                p2: this.option.pname == "MPlayer" ? "04": "06",
                lc: n.getLC(),
                uuid: n.getUUID(),
                weid: n.getWeid(),
                os: this.getOS(),
                br: this.getBrowser(),
                ro: screen.width + "_" + screen.height,
                ref: this.option.searchInfo.ref || a.getCookie("tj_ref") || (document.referrer ? encodeURIComponent(document.referrer) : this.vinfo.fcode || "-"),
                app: this.option.version,
                ch: o["tg"] || o["ch"] || o["typeFrom"] || (r ? "letv_live": "letv"),
                ty: o["ty"] || (r ? "1": "0"),
                xh: s.isLetv ? "tv": s.iPad || s.AndroidPad ? "pad": "phone",
                lid: o["md5id"]
            };
            a.merge(this, d);
            this.evt.on("refreshPlayer", this.refresh, this)
        },
        refresh: function() {
            this.uuid = n.getUUID()
        },
        appendMovie: function(e) {
            a.merge(this.vinfo, e)
        },
        getSystem: function() {
            try {
                if (this.system) return this.system;
                var e = this.config.system,
                t = e.length,
                i = navigator.userAgent,
                a;
                for (var s = 0; s < t; s++) {
                    var n = e[s];
                    var o = new RegExp(n[1], "i");
                    var r = o.exec(i);
                    if (r != null) {
                        a = n[0];
                        break
                    }
                }
                if (!a) a = "Unk";
                this.system = a;
                return a
            } catch(d) {}
        },
        getBrowser: function() {
            if (this.brower) return this.brower;
            var e, t, i, a = navigator.userAgent,
            s = this.config.browser;
            for (var n = 0; n < s.length; n++) {
                t = new RegExp(s[n][1], "i");
                if (t.test(a)) {
                    i = s[n][0];
                    if (i == "ie") {
                        var o = a.match(/(msie) ([\w]+)/i);
                        if (o != null) i += o[2]
                    }
                    break
                }
            }
            return this.brower = i || "other"
        },
        getOS: function() {
            if (this.os) return this.os;
            return this.os = s.Android ? "android": s.iPhone || s.iPad || s.iPod ? "ios": s.wph ? "wince": /symbian/i.test(navigator.userAgent) ? "symbian": "-"
        },
        getTerminal: function() {
            var e = this.getSystem();
            if (/WPhone|iPhone|Symbian/i.test(e)) {
                return "phone"
            } else if (/ipad/i.test(e)) {
                return "pad"
            } else if (/(Android 3)\./.test(navigator.userAgent)) {
                return "pad"
            } else if (/Android/i.test(e)) {
                return "phone"
            } else if (/QtEmbedded|30KT/i.test(navigator.userAgent)) {
                return "tv"
            } else {
                return "pc"
            }
        },
        getCid: function() {
            try {
                return this.vinfo.cid
            } catch(e) {}
            return ""
        },
        getUid: function() {
            var e = a.getCookie("ssouid");
            return e && e.length > 0 && e.length <= 10 ? e: "-"
        },
        isLogin: function() {
            var e = a.getCookie("ssouid");
            return e && e.length > 0 ? "0": "1"
        },
        getvinfo: function() {
            var e = [],
            t = this.vinfo;
            e[0] = t.pid ? t.pid: "";
            e[1] = t.vid ? t.vid: "";
            e[2] = t.mmsid ? t.mmsid: "";
            return e.join("_")
        },
        playURL: function() {
            return encodeURIComponent(location.href)
        },
        send: function(e) {
            var t = new Image(1, 1);
            t.onload = t.onerror = t.onabort = function() {
                t.onload = t.onerror = t.onabort = null;
                t = null
            };
            t.src = e
        },
        onVideoPlayStart: function() {
            logger.log("发送CV");
            var e = "err=0&pt=-&ut=-&ry=0&vt=" + this.vinfo.vtype;
            this.sendPlayAction("play", e);
            this.sendComStore();
            if (Math.floor(Math.random() * 100) == 0) {
                var t = this.vinfo,
                i;
                i = ["ac=", "play", "&ver=", this.ver, "&p1=", this.p1, "&p2=", this.p2, "&", e, "&ty=", this.ty, "&uid=", this.getUid(), "&lc=", this.lc, "&auid=", "-", "&uuid=", this.uuid, "&cid=", t.ptvcid || t.cid, "&pid=", t.pid, "&vid=", t.vid, "&vlen=", t.gdur, "&ch=", this.ch, "&url=", encodeURIComponent(location.href), "&weid=", this.weid, t.zid && "&zid=" + t.zid, this.lid && "&lid=" + this.lid, "&ref=", this.ref, "&pv=", this.app, "&ilu=", this.isLogin(), "&r=", Math.random()].join("");
                this.send("http://m.letv.com/dc.gif?code=700&" + i)
            }
        },
        sendViewVideo: function() {
            var e = this.vinfo,
            t;
            t = ["platform=", "101", "&vid=", e.vid, "&pid=", e.pid, "&mid=", e.mmsid, "&cid=", e.ptvcid || e.cid].join("");
            t = this.config.PlayCountUrl + t;
            this.send(t)
        },
        sendComStore: function() {
            var e = this.vinfo,
            t;
            t = ["c1=", "1", "&c2=", "8640631", "&c3=", e.vid, "&c4=", e.mmsid, "&c5=", e.pid, "&c6=", e.cid].join("");
            t = this.config.ComScore + t;
            this.send(t)
        },
        sendError: function(e) {
            if (e.length == 2) e = e + this.errorStatus;
            var t = this.vinfo,
            i;
            i = ["errno=", e, "&url=", this.playURL(), "&vid=", t.vid, "&mid=", t.mmsid, "&ch=", this.ch, "&ver=", this.option.version].join("");
            this.send(this.config.ErrorUrl + i)
        },
        sendEnv: function() {
            var e = ["p1=", this.p1, "&p2=", this.p2, "&lc=", this.lc, "&uuid=", this.uuid, "&ip=-&mac=-&nt=-&os=", this.getOS(), "&src=pl", "&xh=", this.xh, "&br=", this.getBrowser(), "&ro=", this.ro, "&app=", this.app, "&r=", Math.random()].join("");
            this.send(this.config.EnvUrl + e)
        },
        sendPlayAction: function(e, t, i) {
            var a = this.vinfo,
            s;
            s = ["ac=", e, "&ver=", this.ver, "&p1=", this.p1, "&p2=", this.p2, "&", t, "&ty=", this.ty, "&uid=", this.getUid(), "&lc=", this.lc, "&auid=", "-", "&uuid=", this.uuid, "&cid=", a.ptvcid || a.cid, "&pid=", a.pid, "&vid=", a.vid, "&vlen=", a.gdur, "&ch=", this.ch, "&url=", encodeURIComponent(location.href), "&weid=", this.weid, a.zid && "&zid=" + a.zid, this.lid && "&lid=" + this.lid, "&ref=", this.ref, "&pv=", this.app, "&ilu=", this.isLogin(), "&r=", Math.random()].join("");
            this.send(this.config.ActionUrl + s)
        },
        sendCNTVLive: function(e, t) {
            var i = ["ac=", e, "&err=0", "&lc=", this.lc, "&", t, "&r=", Math.random()].join("");
            this.send(this.config.CNTVUrl + i)
        },
        sendMDC: function(e) {
            this.send("http://m.letv.com/dc.gif?" + e + "&t=" + Math.random())
        }
    };
    a.merge(r.prototype, {
        flush: function() {
            this.sendPlayAction("time", "err=0&pt=" + (this.countTimer.repeatCount() + 1) * 5 + "&ut=-&ry=0&vt=" + this.model.vinfo.vtype);
            if (this.option["CNTVLive"]) this.sendCNTVLive("time", "pt=" + (this.countTimer.repeatCount() + 1) * 5);
            this.countTimer.reset()
        },
        startRecord: function() {
            var e = this;
            if (!this.countTimer) this.countTimer = new a.timer(5e3);
            this.countTimer.start();
            if (!this.sendTimer) this.sendTimer = new a.timer(12e4,
            function() {
                e.flush()
            });
            this.sendTimer.start()
        },
        stopRecord: function() {
            if (this.countTimer) this.countTimer.stop();
            if (this.sendTimer) this.sendTimer.stop()
        }
    });
    i.exports = {
        pingback: r,
        instances: o
    }
});
define("proxy.history",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("extend.storage"),
    n = e("extend.detect");
    var o = null,
    r = n.isLetv ? 4 : n.iPad ? 3 : n.Android || n.iPhone || n.iPod || n.wph || n.ps ? 2 : 1,
    d = {};
    var l = function(e, t) {
        this.vinfo = e;
        this.reader = t
    };
    l.prototype = {
        flushRemote: function(e) {
            if (e == this.lastTime) return;
            this.lastTime = e;
            var t = this.vinfo;
            var i = "http://api.my.letv.com/vcs/set?htime=" + e + "&cid=" + t.cid + "&pid=" + t.pid + "&vid=" + t.vid + "&nvid=" + t.nextvid + "&vtype=" + (t.trylook > 0 ? 1 : 2) + "&from=" + r;
            p.send(i)
        },
        flushLocal: function(e) {
            if (!this.vinfo) return;
            if (e == this.lastTime) return;
            var t, i = this.reader.records;
            if (i && i.length > 0) {
                t = i[0]
            }
            if (t && (t.vid == this.vinfo.vid || t.mmsid == this.vinfo.mmsid)) {
                t.htime = e;
                t.utime = +new Date;
                this.push(i)
            } else {
                if (i && i.length > 0) {
                    for (var a = i.length - 1; a >= 0; a--) {
                        if (i[a].vid == this.vinfo.vid || i[a].mmsid == this.vinfo.mmsid || i[a].pid == this.vinfo.pid) {
                            i.splice(a, 1)
                        }
                    }
                }
                var s = {
                    vid: this.vinfo.vid,
                    mmsid: this.vinfo.mmsid,
                    pid: this.vinfo.pid,
                    cid: this.vinfo.cid,
                    nvid: this.vinfo.nextvid,
                    title: this.vinfo.title,
                    htime: e,
                    vtime: parseInt(this.vinfo.gdur),
                    utime: +new Date
                };
                if (i == null) i = [];
                i.unshift(s);
                this.push(i)
            }
        },
        push: function(e) {
            try {
                var t;
                if (e.length > 0) {
                    t = e
                } else {
                    t = s.get("history");
                    if (t == null) {
                        t = []
                    }
                    t.unshift(e)
                }
                while (t.length > 10) {
                    t.pop()
                }
                this.reader.records = t;
                s.set("history", t)
            } catch(i) {}
        },
        flush: function(e) {
            if (isNaN(e)) return;
            if (!o) {
                this.flushLocal(e)
            } else {
                this.flushRemote(e)
            }
        }
    };
    var c = function(e) {
        this.vinfo = e
    };
    c.prototype = {
        refreshRemote: function() {
            var e = "http://api.my.letv.com/vcs/get?callback=?&vid=" + this.vinfo.vid + "&tn=" + Math.random();
            a.getJSON(e, a.bind(function(e) {
                if (e.code == 200) {
                    this.records = e.data
                }
            },
            this))
        },
        refreshLocal: function() {
            try {
                return this.records = s.get("history")
            } catch(e) {}
            return null
        }
    };
    var h = function(e) {
        this.model = e;
        this.option = e.option;
        this.vinfo = e.vinfo;
        d[e.option.cont] = this;
        this.reader = new c(this.vinfo);
        this.saver = new l(this.vinfo, this.reader);
        this.init()
    };
    h.prototype = {
        init: function() {
            if (this.vinfo.nextvid == "undefined" && flashver) {
                this.vinfo.nextvid = "";
                var e = new RegExp("(^|&)v_code=([^&]*)(&|$)", "i");
                var t = flashver.match(e);
                if (t != null) {
                    var i = LETV.Base64.decode(t[2]),
                    s = i.indexOf("nextvid");
                    if (s > 0) {
                        this.vinfo.nextvid = i.substring(s + 10, i.indexOf('"', s + 10))
                    }
                }
            }
            var n = a.getCookie("ssouid");
            if (n) {
                o = {
                    sso: n
                };
                if (this.vinfo.gdur > 600 || typeof this.vinfo.gdur == "undefined") this.reader.refreshRemote()
            } else {
                o = null;
                this.reader.refreshLocal()
            }
            var r = window.letv_login_cb;
            if (r) {
                r.on("loginSuccess",
                function() {
                    var e = window["Spirit"]["UserValidate"].getUserInfo();
                    o = {
                        sso: e.sso
                    }
                });
                r.on("logoutSuccess",
                function() {
                    o = null
                })
            }
        },
        flush: function(e) {
            if (isNaN(e) || this.vinfo.gdur < 600) return;
            this.saver.flush(e)
        },
        getRecords: function() {
            return this.reader.records
        },
        startRecord: function() {
            if (this.timerID) clearInterval(this.timerID);
            var e = a.bind(function() {
                this.saver.flush(parseInt(this.core.getCurrentTime()))
            },
            this);
            this.timerID = setInterval(e, 12e4)
        },
        stopRecord: function() {
            if (this.timerID) clearInterval(this.timerID)
        }
    };
    var p = {
        send: function(e) {
            var t = new Image;
            t.onload = function() {
                t = null
            };
            t.src = e
        }
    };
    i.exports = {
        history: h,
        instances: d
    }
});
define("video.baseVideo",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("core.event"),
    n = e("extend.fullscreen"),
    o;
    var r = vjs.extend({
        init: function(t) {
            this.__proto__.option = t;
            this.__proto__.evt = t.events;
            o = this;
            var i = e.async("./movie");
            this.movie = new i
        },
        initialize: function(t) {
            this.__proto__.video = t[0];
            n.checkFullScreenFn(t[0]);
            var i = e.async("./stream");
            this.__proto__.stream = new i
        },
        playMovie: function(e) {
            logger.log("开始播放视频:" + e);
            this.option.vid = e;
            this.movie.getMMS()
        },
        playLive: function(e) {
            this.movie.parseLiveMovieVO(e)
        },
        playVideo: function() {
            this.evt.trigger("movieSucc", this.movieVO)
        },
        play: function() {
            try {
                this.video.play()
            } catch(e) {}
        },
        pause: function() {
            try {
                this.video.pause();
                this.stream.stopForcePlay()
            } catch(e) {}
        },
        stop: function() {
            try {
                this.video.pause();
                this.stream.stopForcePlay()
            } catch(e) {}
        },
        seek: function(e) {
            this.stream.seek(e)
        },
        changeDefi: function(e, t) {
            this.movie.changeDefi(e, t)
        },
        getCurrentTime: function() {
            try {
                return this.video.currentTime
            } catch(e) {
                return 0
            }
        },
        setCurrentTime: function(e) {
            this.video.currentTime = e;
            this.stream.stopForcePlay()
        },
        getBuffered: function() {
            return this.video.buffered
        },
        getStatus: function() {
            return this.movie.status
        },
        getErrorStatus: function() {
            return this.errorStatus
        },
        changeFull: function(e) {
            try {
                if (e) {
                    n.requestEl[n.requestFn]()
                } else {
                    n.cancelEl[n.cancelFn]()
                }
            } catch(t) {}
        },
        setVisiable: function(e) {
            this.video.style.display = e ? "block": "none"
        },
        setStatus: function(e) {
            o.status = e;
            o.trigger("StatusChanged")
        },
        setErrStatus: function(e) {
            o.errorStatus = e;
            o.trigger("Fault")
        }
    });
    a.merge(r.prototype, s);
    i.exports = r
});
define("video.movie",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("./auth"),
    n = e("module.user"),
    o = e("./gslb"),
    r = e("core.event"),
    d = e("./timerProxy"),
    l = e("./statusEnum").error,
    c = e("./statusEnum").video,
    h = e("./baseVideo");
    var p = h.extend({
        init: function() {
            this.videoTypeSupport = false;
            this.gslbErrCount = 0;
            this.sendedErr = false;
            this.gslb = new o(this.option);
            this.gslb.on("success fail liveSuccess liveFail", this.onGslb, this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.evt.on("error canplay play playing", this.onVideoEvent, this)
                } else {
                    this.evt.off("error canplay play playing", this.onVideoEvent, this)
                }
            },
            this);
            this.setStatus(c.Idea)
        },
        getMMS: function() {
            this.authCount = 0;
            this.onGetTimeSucc(a.now() / 1e3, false)
        },
        onGetTimeSucc: function(e, t) {
            logger.log("onGetTimeSucc:" + e + ":" + t);
            this.isRemote = t;
            var i = new s(this.option);
            i.on("success", this.onAuthSucc, this);
            i.on("fail", this.onAuthFail, this);
            i.getURL(e)
        },
        onAuthSucc: function(e) {
            var t = e.args[0];
            logger.log("获取媒资数据成功:" + t.statusCode + ":" + t.playStatus);
            if (t.statusCode == 1003) {
                if (this.isRemote != true) {
                    if (++this.authCount == 3) {
                        d.update(a.bind(this.onGetTimeSucc, this), 2e3, "http://117.121.54.104/time");
                        return
                    }
                    if (this.authCount == 4) {
                        this.setErrStatus(l["TimerServerTimeOut"]);
                        return
                    }
                    this.onGetTimeSucc(t.stime, true)
                } else {
                    this.setErrStatus(l["AuthArgsErr"])
                }
            }
            if (t.flag >= 0) {
                if (t.flag == 0 || t.flag == 2 || t.flag == 5) {
                    this.setErrStatus(l["CopyritghtBan"])
                } else if (t.flag == 1) {
                    this.setErrStatus(l["OutSea"])
                }
            } else {
                if (t.playStatus == 0) {
                    if (t.data.length > 0) {
                        this.parseMovieVO(t)
                    } else {
                        this.setErrStatus(l["AuthDataEmpty"])
                    }
                } else if (t.playStatus == 1) {
                    if (t.country === "CN") {
                        this.setErrStatus(l["CNBan"])
                    } else {
                        this.setErrStatus(l["OutSea"])
                    }
                } else if (t.playStatus == 2) {
                    this.setErrStatus(l["CopyritghtBan"])
                }
            }
        },
        onVideoEvent: function(e) {
            switch (e.type) {
            case "error":
                this.changeGslbURL();
                break;
            case "canplay":
            case "playing":
                this.videoTypeSupport = true;
                break
            }
        },
        parseMovieVO: function(e) {
            var t = this.movieVO = {},
            i, a, s;
            for (var n = 0; n < e.data.length; n++) {
                i = e.data[n].infos;
                for (var o = 0,
                r = i.length; o < r; o++) {
                    a = i[o].vtype;
                    s = i[o];
                    if (a == 21 || a == 9 && !t["1"]) {
                        t["1"] = s
                    } else if (a == 13 && !t["2"]) {
                        t["2"] = s
                    } else if (a == 22) {
                        t["3"] = s
                    }
                }
            }
            var d = e.data[0].infos,
            l = 0;
            for (var n = 0; n < d.length; n++) {
                if (d[n].gdur > 0) {
                    l = d[n].gdur;
                    if (!isNaN(l) && l > 1) {
                        this.stream.gdur = l;
                        this.evt.trigger("setDuration", l);
                        break
                    }
                }
            }
            var c = "mainUrl,backUrl0,backUrl1,backUrl2".split(",");
            for (var h in t) {
                var p = t[h];
                p.urls = [];
                for (var n = 0; n < c.length; n++) {
                    if (p[c[n]]) p.urls.push(p[c[n]])
                }
            }
            if (e.data.length > 0 && e.data[0].imgprefix && typeof this.video.poster != "undefined") {
                this.evt.trigger("setPoster", e.data[0].imgprefix + "/thumb/2_400_300.jpg")
            }
            var f = {
                isFirstLook: e.firstLook == 1,
                cutoff_p: e.cutoff_p,
                cutoff_t: e.cutoff_t
            };
            this.onMovieSucc(f)
        },
        parseLiveMovieVO: function(e) {
            var t = e.split(","),
            i,
            a,
            s = this.movieVO = {},
            n = "",
            o = "http://live.gslb.letv.com/gslb?tag=live&ext=m3u8&stream_id={streamid}";
            var r = {
                350 : 1,
                800 : 2,
                1e3: 2,
                1300 : 3,
                1800 : 4,
                1 : 1,
                2 : 2,
                3 : 3,
                4 : 4
            };
            if (t.length > 1) {
                for (var d = 0,
                c = t.length; d < c; d++) {
                    i = t[d].split("|");
                    a = parseInt(i[0]);
                    if (r[a]) {
                        a = r[a];
                        s[a] = {
                            urls: [o.replace("{streamid}", i[1])]
                        };
                        if (d == 0 || d != 0 && !n) {
                            n = i[1]
                        }
                    }
                }
            } else {
                i = t[0].split("|");
                if (i.length == 1) {
                    n = i[0];
                    s["1"] = {
                        urls: [o.replace("{streamid}", t)]
                    }
                } else {
                    a = i[0];
                    if (a == 3e3 || a == 6e3 || a == 5) {
                        this.setErrStatus(l["NotSupport1080P"]);
                        return
                    }
                    n = i[1];
                    s["1"] = {
                        urls: [o.replace("{streamid}", n)]
                    }
                }
            }
            this.movieVO = s;
            this.onMovieSucc()
        },
        onStreamBlock: function(e) {
            if (e.statusCode == 1001) {
                if (e.playStatus == 0) {
                    this.onMovieSucc()
                } else {
                    this.setErrStatus(l["OutSea"])
                }
            }
        },
        onAuthFail: function() {
            this.setErrStatus(l["AuthTimeOut"])
        },
        onMovieSucc: function(e) {
            this.setStatus(c.Ready);
            this.evt.trigger("movieSucc", this.movieVO, e)
        },
        onMovieFail: function(e) {
            this.__proto__.errorStatus = e.args[0];
            this.trigger("Fault")
        },
        onTokenSucc: function(e) {
            this.gslb.movieVO = this.movieVO;
            this.gslb.defi = this.defi;
            this.gslb.isUserChangeRate = this.isUserChangeRate;
            this.gslb.getGslb(this.urls, e)
        },
        onTokenFail: function() {
            this.setErrStatus(l["TokenTimeOut"])
        },
        onLiveValidateSucc: function(e) {
            this.gslb.getLiveGslb(this.urls, e.token)
        },
        onLiveValidateFail: function(e) {
            this.setErrStatus(l["LiveValidateTimeOut"])
        },
        changeDefi: function(e, t) {
            this.defi = e;
            this.isUserChangeRate = t;
            if (!this.movieVO || !this.movieVO[e]) return;
            var i = this.movieVO[e];
            this.urls = i.urls;
            this.stream.onchangeDefi();
            this.gslb.movieVO = this.movieVO;
            this.gslb.defi = e;
            this.gslb.isUserChangeRate = t;
            if (this.option.isLive) {
                if (this.option.pay) {
                    var s = this.option.md5id,
                    o = this.option.liveid,
                    r = this.option.pname == "MPlayer",
                    d = a.getParamVal(this.urls[0], "stream_id"),
                    l = a.getCookie("ssouid");
                    n.getLiveValidate(s, o, d, r, l, a.bind(this.onLiveValidateSucc, this), a.bind(this.onLiveValidateFail, this))
                } else {
                    this.gslb.getLiveGslb(this.urls)
                }
            } else {
                if (this.option.isMember && !this.option.isTrylook) {
                    n.getToken(i.storePath, this.option.pid, a.bind(this.onTokenSucc, this), a.bind(this.onTokenFail, this))
                } else {
                    this.gslb.getGslb(this.urls)
                }
            }
        },
        onGslb: function(t) {
            switch (t.type) {
            case "success":
                this.gslbErrCount = 0;
                this.gslbUrls = t.args[0];
                this.currIdx = -1;
                this.totalChanged = -1;
                this.changeGslbURL();
                if (this.option.isAutoPlay) {
                    this.stream.playVideo()
                } else {
                    this.option.isAutoPlay = true
                }
                break;
            case "fail":
                if (++this.gslbErrCount > 1) {
                    this.setErrStatus(l["GslbTimeOut"])
                } else {
                    this.getMMS()
                }
                break;
            case "liveSuccess":
                this.gslbUrls = t.args[0];
                this.currIdx = -1;
                this.totalChanged = -1;
                var i = e("extend.detect");
                if ((i.iPhone || i.iPod) && !/\s+QQ/.test(navigator.userAgent)) {
                    if (this.gslbUrls && this.gslbUrls.length > 0) {
                        location.href = this.gslbUrls[0];
                        return
                    }
                }
                this.changeGslbURL();
                this.stream.playVideo();
                break;
            case "liveFail":
                var a = t.args[0];
                if (a === 414) {
                    this.setErrStatus(l["OutSea"])
                }
                break
            }
        },
        changeGslbURL: function() {
            if (!this.sendedErr && this.currIdx != -1 && !this.videoTypeSupport) {
                this.setErrStatus(l["URLNotSupport"]);
                this.sendedErr = true;
                return
            }
            if (++this.totalChanged > 10) {
                if (!this.option.isLive) {
                    this.getMMS()
                } else {
                    this.gslb.getLiveGslb(this.urls)
                }
                return
            }
            if (++this.currIdx >= this.gslbUrls.length) this.currIdx = 0;
            var e = this.gslbUrls[this.currIdx];
            this.stream.src(e)
        }
    });
    i.exports = p
});
define("video.auth",
function(require, exports, module) {
    eval(eval(function(U8, S0, t2) {
        return eval("(" + U8 + ')("' + S0 + '","' + t2 + '")')
    } ("function(s,t){for(var i=0,k='',f=function(j){return parseInt(t.substr(j%(t.length),2),16)/2;};i<s.length;i+=2){var d=parseInt(s.substr(i,2),16);k+=String.fromCharCode(d-f(i));}return k;}", "ded5df8ca498e1a29cdca3d1d2e1d1e3db945edae2c6e696a199ac9598ec9ecf618fe496d59f6aa097a0a0a2a09f67a49d91a4ee618cae959cac9b9d6ca49e91a5ad5c9bb49f91ae959cad959e91aaa657a1979de0a5a39868939a99acaa739498ac98ec9fa46f8fe498d5b45693e7d394aba59a698fa4aaa69f6d8ba7a296a0a4a26397b1969db05693e79fa1a09ea06390b190a49f6ca0979de0d799a1688da195a8bb599498ac90a5a09865d79e9c9db05edba0d1ced5a3a19795a4cbdaa65abb9faa90dae2da98d3d5d4e29e94949bd59e9de8e296d18cbaa9b350859bc09cb1959cad919e91a5a65c95a8b29a9da9a96d95ab9ea7a4688ba39d96a09ea36390a19db9a757a1ac9f9da2a09f7a90ab98aaa4659aa0b299ae95a56e8da295a8bb618f9fe59ca896aa72879f99a0a6a698d596a7a7a69a6e92b197ae9e5f999d99ced5d9df9a88a7ceda9e94949dd9cde2d4e09d9d949ba5a460a8a19999a296aa72879cdda5d75a95a49b9ab99e9574879d97a2ab73959ba29ca2a69e6ca49e8eae9e5edba0d194a796aa5d959d93adad73939b9de0a9a2957487a29ba0ad6691a1b29a9da7946d919a96b9a75a93e79e999dab946a919a97a5af73949b9f99a296ab5d8fe49ba7a25edba3d291ae95a4688da19aa6bb618f9fe59ba596aa5d959a9da7a773959ba19aa2a5a267a49d8eb3a76291a99598eca09e618fe4c89d9f94d2e195ded5df8ca293a98daaa95c9ba0b293a4999cad93cf8eb09e5edba4d294a4e59e9888ab97a8a46696a5b299ae9fa363919d96b9a86c9aa29ba1a9a6b16092ab8dabac5c8fa4a6969da7946b979a95adbb608f9fe59cd796a87287a39aa0a6a695a296a79c9de469939895eca8678ca995a1a4999d6a8da0aaa59f6aa0979fa1a299a56a8d95a49ca6a698d3999fac9b9e7a92959f9cab6791a8a3ada799a4688da1aa9fa9579f97a19ca0a2a4638fa396b9a757a2979de0a5d39865d7a28eaea6a6c7aada9cb29ea75eb4a190b19e8197acc09cb3959e6c8d9895eca95e8cadaa9fa99b9f7a8fab8dacac5c9ab49e94a79e9a6695b1959db05695a79b9fa5b29d618fe49aa59f6ca0979de0a5a39865d7a19a9db563989da0ada7a79cad93cfa3b19e63939da29ba7b29f6198a193a6ad61a89f96a7aaa69a6d939faaa6b05693e7a1c9a09de46b9295a19cab5c8fa6a591b3959cad8f989da4a460a8a196a29c9fa3638ba293a8bb618cad959da79b9f66a49d91a4ee5f9898ac90a4e5a1968bd2c6e0e9938ca9a39ba29d9d6ba49da3b19e5edba0a194a99ba36aa49c8eb39e5f919b9de0a696a65d8fe496aaa2629c9da6a1b99d95719c9cdda6ac6d8ba4a596a7b29e618fe4969db0679c9da29ab99fa65d8fe4c9a0ab6691a09d9fb9a095719c9f95a2ac6295b49ea79c9fa4638b9d9ca2ab629bb4a091ae959cad91989aa2ae738ea196a6b1959f698d9c97aabb608fa0a496ad9eb1609195a49ca6a694a39998ec9fa05e99949da5a462a8a1999ea89b95739ca49aa2b55695a19ba1b99d9865d7ce8eae9e5f959b9de0a8cf957187a49cb9a65a93e7a1a19dac9cadc1a68da4ee628f9fe59aa896aa65d7a4a49ca96291a49d9ab99d98a9d1e1ca9db06298abaaa1a69ba368a49ea4a4ee62c5a99598eca0a161989d93acae73939896a7da9e9a98c7cdd7b5ea56d0a396a296ad915ec4d5d9db9f56d7b3e4d6969bcf9dc0dea6e89e9b979c9a91afdfd1a9d4ded394de64a0acaad6e9d9d874c4e2c6e09e839898a7d0aacbd266dc958d96d5678bdcc1cda296d1967fd18d96a25698a69b9aa6b29e618fe499a99f6aa0979de0a7a69865d79e9a9db55edba49ea29c9e9e6393a3aaa5a26491a2a6ada696a87287a091a4ee639998ac90a4e5a0698ba19aa2a7609ab49e91ae959d678d9f9ea6bb5e8f9fe5a19dab9cad91a1a49ca6a6949ba39ea2a5a27a90959faaa95c95b49da6b195a2678da0aa9fa95a9ba79b9daab29d5e9e949db9a1618fa1a0969da7946a949a91a4ee618cabaa90a6a69865d79dc99db55696a799d6e9d9d85e999cdda7d8579ee1d2dce9dfdab0cca59fdaeb9cc6e3d6d7e295c36588e7dbd5e84ed3a299bdabaa9cad91d1a3b1ad63919f9eada4ac946b90989ba5a46195b4a091ae959cad93a491adae5c8cabaa90a4e59d998b9f9ba29f6d93e7a0a1aea19f7a90aaa29ca6a697d5999ea69ba16da49d8eb39e64969da09dacb29e618fe496ab9f688b9fe599d5999d688d95a3a4ee6097ae9de0a8a794688f989ea4a46098b49e91b2aa9cad92cea49ca6a696d49998ec9d956f8fe49aa9b26b8ba69f96aca0b1668ba39aa2ab66a8a296a79ca0a161939a8eaea6a697a6ab90a99b9f68a49f91a6a75c97a6a3ada696ab5d8f9a9aadbb5f8f9fe599ab96a65d8fe499aaa2649a9899adaaaadf6b9dc495a0c6669ed5dcda9ca8c16c9bc395a2e293d1d6e1d0af96e78597a98de4d7a0d6d4b6d6e895c3658dcfcdd5e86fd797c29f9d99946c97989cada457a1979fa0a2a59f7a909895ecac5f8cae959ca5999cad959f8eae9e5f9a9b9e96aaa29e7a8a9e8eb29e5f959da2ad9f9e9866919a98b9a1608cae959ba6b29e618fe4959db05693e7a29aa09de4679395a3b19e5edba0d194a4e5a06588ab8da4ee619c9ba69ba2a19e7a8f959fa5ab5c9bb49fa69ca19e6392a19bb9a15e8fa69f96a9a0a47a9295a49caf5f8fa0a0969da79465d79d9aa0ab6091a6a69ab99f95739c9495eca7648fa0a691b39de4668fa69ca8b25694a59b9badb29f618fe498a49f6d959d9e9ea8b29d6f97a193a9a87396989696e8dcbfa9d1d5d3db9e5693e79e9ea09de4679495a1a7ac6d8b9fe59ada99a26393b1989db060989da5ada6a9a95d8fe49aa5a25edba3cf91b395a36a8da0aaa5a26291a8a5ada496a65d8fe4cba0a86491a7a49cb9989d5e9ba29cb39e5edba0a594a4e5a06d88a69caba46693a7b298b0959cad93d091abab5c96a1b29a9dac946c919a91a4ee608ca995a1ab9ba57a919895eca7948cabaa9fb395a5678b9cdda9a7579da39f96aaa1b1689da995eca766a29fe59bae959e688b9cdda99f579edfa0a5c9a497609ca98da4ee639c9b9dada696aa7292a393abbb5996aea49aae95a1668b9e9aa2ab739498a9a59c9de46b8f9895eca7648cae9de0a6cfa665d79f97b09e5edba2a194a4e59d9688ab8daca467a8a1999aa796a65d8fe497a6a2668cabaa9ea99bab5d959d91a4ee5e8ca99598ec9fcd618fe49ad99f6c8ba4a396ada4b1688b9f93a9a664a89a9f91b3959cad94a491a4ee63c498a790a4e59d658ba19ca2a667a89f96a7c4a59a98c7cdd7b5ea56b3a79bd4d9dbd3a9c7998da7af5c9aa1b293a5999e698da09ab9a15e8cab959da49b986e949a97a6bb599698ac90ac9b9865d79d8eaea6a695a6ab98ecd3ab5d97a193a0aa6191a8b29b9da79cad94cfa39ca6a697a59998ecd09574879cdda8d85a98a49b91ae9de466c5a88da4ee60959b9e9fa29f9e7a9095a49ca6a6c89ba19ea2a49f7a8a9e8eaea85f919fa2ada696a6a592cab5aca491cbd0dfa9e895bc6d8dd8cae2dda2cb9c95a1a9b29e618fe499aa9f6c8ba1a696a89eb1668ba09aa2a96799b49e91b3959cad909c91a6a75c9ca3a3ada796a665d79fc7b0b35edba1a1a79c9ea563949eaaa5a25edba4a691ae9de46796aa8da4ee60959ba69ea2a29f6ca49d8eb39e639b9d9eada5999cad93a18eaea6a694a1a9a59c9de46896989da4a457a29fe599ae95a56c8d9faaa5a25edba3d2919deade9ad3e1d7e2969e96ae8eadaaa7b16bdce9e29d9e579ee5ceda94cc9d7281d1dde8db9cc79dd9d1d68f989491a987d9eea2c8ddd196d8d2e09ac2e087a0d561a091d0d7e6d29a9ad5d1d3e8985ac2a3aad7ade29aa2989487a5a8508cae8fd8e6dce0a4d3e5d5d9986885d0e2dcdcc0e198c28e91d3ab6bd2a8e296e1a69457909c98a99857a291d4cde8b9d5abc4b7caed986885dfdbc9e1d28e61bea2a2e3afa391dca69096a4a55788ab87e1dba0cad48fa296e78e61bea3a2e3afa391dca69096a3a05788ab87d9ee9ed2e1e1db96a78e9ecedf87afec8fd58fcf9ae7aae77699d2dae2d9a2ccdedb90e799b55edadecae8eba0d18fe095bdea98ab99d2dae2d9a2ccdedb90e799b55edadecae8eba0d18fe0a4b0b6e961c9a6cbe9e491d7d8dcd69ce0987e88e7d7d9eaa3d5dd8ddb95aab5b28bda9fdaeb9cc6e3d6d7e295df61a895e0e6dba2d8e1db88e7abb5b28bd29fdaeb9cc6e3d6d7e295df61a895e0e6dba2d8e1db88e7e9b5b28bc59fdaeb9cc6e3d6d7e295df61a895e0e6dba2d8e1db88e7a9b5b28bd09fdaeb9cc6e3d6d7e295df61a895e0e6dba2d8e1db88e793b5b28bcf9fdaeb9cc6e3d6d7e295df61a895e0e6dba2d8e1db88e7cbb5b28bdf9fdaeb9cc6e3d6d7e295df61a895e0e6dba2d8e1db88e7abaa7edc98deaedca3d1d2e1d1e3db94a88bb58eefe893d7e4dfd694e0a9729cb5e2a0f068c9e4dbcbe8d6dba387df91bd9fa9d5d4e1dde6db8ca884b5e2a0dd68c9e4dbcbe8d6dba387df91bd9fa9d5d4e1dde6db8ca89ca9aef1a2789dd5e2d6d7e1d5a4cd94d8a0bf57dee1d2dce9dfda55d28da2b1bfabe0aad3dde2d0e09eceda85b5eba2cb97e191efe3cda77fcb96b1e567d89ddaa19c8fa36e8195a496e59ed7d8dcd696a78ea4cfe0cee3e4509ee3d5d1e7c8cb66bca9d9f1ec8fd58fd9d1d6aade9ad0e1cee6db56c2a09694d6dfa9a7c4dddadde8938bce9f91a0d2e2a99cdecae5eb97d5d495c7a796a776d4e0cdcfd562c0ace8cfd9e1c187aba6cbe9e491d7d8dcd69ce195b0d5cdd794d55fa091e1d3d9e68e61be9ea296dd93d7bad2e19699cb689c8eccd9ea80c8e0e2cde7e18e61bea0a2969ca2ced4e6a59699cb6a9cdb9ee9a49b9c978fe0c6a2a25788ab87dbdba2adc2bcb696a78e9c8198c4aab350c5d8dbcc9699cb6c9c8ec6e9ea96b6e4d0cb9699cb6d9c8ec6e9ea96a9d8dfdbe8b3cd9ecb8ea0e8de97d6cacc99d1aae09dc8dfc0d3a88b8be396a3eacede55c8a9d9dcdfa1becea0c59c8e9c5e8acb999fea96cce2c8c7a5caa7a1c8cec0d3ab8b8bd899d4ddcfc79495c98de8de97d6cacc9fd199e09dc8df8ea0e297c5cacc9ed195e09dc8dfc0d3ae8b8fe3d5d1e796986ac49f91a69fab8fd0e2dcdcc0e198c2a6cbe9e491d7d8dcd69ce195b0d5cdd794d55fa091e1daddd4d39ad18e91d3a86b85e2e2cbd7d2dfa881a7d9dcdfa1bece9ec59ccc9e61d395e2a0d7a3d7d7b3d1e6e0e07bc0d5d1aedca3d1d2e1d1e3db945edae2c6e6968d94ac8fcfd9e1be9ad0e1cae7ea508fce9fa59693e0a0c4e5a296a28d96ac8fdcdfd2e5578bcb99b19895c8e3b7bbc3bb8e61bea1a2e3afa391dca690969f9f5788ab87d6df9cc791a78adedcd5a38198c4aab350c4e4e1d0c7e2cf988198c4abb350c4e4e1d0baced5a181a7dbd5e84ed7ace1d0dde0c79490c98d95a7578ece9f93e8d5d5a8bacb98d1b19accd1c8c7a8ca94a98bd8ced6d18d98cc95dcdcd6df90bea2c2a0ea96cce29694e0d6ce90bea1c29cea96cce2c8c7abca98a9c7d5d89da263c8a299999dea9896d4e0cdbad797cfa9d3dde2d0e09eceda8d9df1a4c4e18dc7a5aa8ea9d1d5ccdbdba0859bcc9ab18fd296c8d887afea96cce2c8c7a5ca94949195e2a0dd93d7c1d2d9e9d2dfa999d2dae2d9a2ccdedb90e896e7abc0de85d3a862a091a098a58f9894919fa296a95e979199c7a5aadb6ed49ad2ad9e50989fa68a9dac8ea4cfe0cee3e4509d91cfd1e2d18e61be9ea296df7ec4d38f94d3a0a9a498e193e1af5685d3c4ca9696ab57c8bccde3e49385a98fd5d9dfd39a8198c4a8b39d9ce49bd5ad958e65c08e8eb39897b3ded18aae8fd6a4c8da87a0d563a0dea6dda2daa55d81a495ac9857a291d6d7e78fa657c7dbd8e8985ac2a5aa8ae2dc8e61bea3a296af5a94a2999aa5999e678b9d97a8a25f95a49999a6a38e61bea4a296985ac2a8aa8aed8f9894909ca2e3afa391dca69096a39d5788ab87dce5a1d791a78ae8dfd59cc6d1d796a28d94a0aa8aa28f9894909ea296da9dd0d0d6d69699cb6692a987db985ac2a0a1a596b9d185c0d587a0d55f98acdca1e99bd96e878e96cd9857a291ddd6d5dad157998ed9dfdba7859bcc99aaaa8e6191a487a0d55f9aac8fd0e8e1dc6f8e9b87a0d55f9bac8fc9e4d69aa1c4e0dba2d99dd09199c7a5a6a957909d9ca2a760949da29ca29e9c698198c4a6a66b859edad5e79cdbaad39bc8e3e39bd2dd9ccfd9e1e1a7cbabd5e0d7a2ccd3aa9b9ae0dca1c0e0ced8b3508fce9f99b18fd6578bcb97a6b350b0bfd9c9edd2de578bcb97a9b35089d2ced4e0cfcd98caa9a49ae69ac4e8d6ccb19d92abd3e5d5d9b3508fce9f9eb18f92abc4ded8dde59ca0a19b989ae1dfa89c8e91d3a865a09193deddd1a9578bcb97acb39d9ce49bd5ad958ea0d38e8eb398a4ccd38fa296d78e61be9e9eb19854c7dedac9dddba9578bcb98a4b350cdded6d696a8e296d18cceb1ea96cce2c8c7a5ca989a9cced7cfd560c0ebe9cae6c8cb68bce8e1d6e889c2a3caa7d3a2a6949598d7b1d5658fddaac7aca8d59b87ce97e7d18d9ccc95d8d5dfd1a3d398dcdde492d2e69691e8dfe5b0cda9d1e3d98fd7d8dcd6cfcc9d65bce9c8d5ea91cb97ce91efdba994909d90d8e591d8dcd2d6e8c8cb6691c9e2d6a8a1bece9e9bd195cb669398cecfd55f98cc968e9a95de609ccb96aa9f69d9d0df88e3aac79490a391e8b58d94a7a7c7a5a69894919c91d6a8a1bece9f99d195cb679198cecfd55f98cc96a7d39f9f6fbe9e99a0d560989bdf94d39fa261c498c4a6ad5acccacc9aacca989491a591e2d389c2a29dc59ccca45e9adecae8eba0d18fdce5a0d4d1a9aad1deaedca3d1d2e1d1e3db94a988e7dbd5e84ec2a0aa8aee8f989491a987e6e5a2c4e3d2baddd4d4a98198c4a7b350c691a8ded5df8c9e9ca19ca2a97393adaa90aba49a6d91a4aaa6a26491a7b29b9dac9465d7a09aa0ae5c8ca9959aad9b9f6ba49d91aaab5c8cab9de0a79eab65d7a295ae9e6391a1b299a0a3a36398b1969db46b8b9fe59cd7999cad939c8eb39e5edb9f9998eccf9c6c939f96ad9f688ba8a696a5b29e618fe496d79f6a8ba3a296acb297658ba0959db55693e79f9da09de46896959f9cad648fa09f91b295a46a8da59bb9a85a93e7a09b9dac9466929a96b9a65a8595e3d1d8aa8e5e999cdda7a66aa0a4a096a5b297669e9487d7985a939da699a9b29e5e999495eca9678f9fe59cd696aa72879cdda5d85a93e7a1ca9dac9457abd1b5d5df508f9fe59ca596a65d949f93a9bb59959b9de0d896aa66909a98b9a76d8b9fe59cd599a2678da195acbb608ca9a39aa2a3a169a49da3b19e5edbd1999cab9b9e7a9195a4a6af5c98a5a1ada6a7946d909a98b9a85a99a69ba1aab29e5e8bd1a2d6a8a1bece9ec59cd69866969591e6b3a29ee1aadcdcd6df90be9ec29ce85ac898a8ded5df8ca39cce97e7d18d96cc95daa0d69570d1d1d9e9e89c83ddea94e6dce096d3d1b7dddd96d7a9d3dde2d0e09eceda8de8a2978ceae3c9e68dcb669cdb9ee9a49b9c978faca4c78e5e9e8ed396b050c4e4e1d0c7e2cf988198c4a6b350c791a8cee3df94abc0de85d9a2a0a09fa8caa6e0c79490c98ddda2a08caadf939f96d172c19ed8cfd560c0979e94e89698a99daaa2a5a2939fabaa9ba599e0609cd1a0e6dba2d8e1db88e8eae961a0e1d9dcd18d98ccaacee9dbcfa9c8dbd39cea5acc98e8ded5df8c9490a987dadb92c4a7d1ccaad29c6691a3c9d5ae66c9a2a1a0abcea26995d2caacd764c59199c7a6aa8e9fced5d396a28d96ac8f949699cb699c8ecaecea93d1d39bd5d8a28e61bea1a296d98fcfdb8fa3eacede55c4a9c0e8a2978fce9ec5cfcc9e9287cb989da2a0a0e1d2d9e9d6de9a87cb999db1a0c8e3e2dae28dde90bea1c29cea96cce299cd9dea98a1c8cec0d3ac8b8bb0e2dcdcc8cb69bc98caeaea578fdcdccce9d9d190bea3c2b1b7a3d7d7a8", "d0e8dad86abed8cae8ec5cc6deda")))
});
define("video.statusEnum",
function(e, t, i) {
    var a = {
        AuthTimeOut: "601",
        AuthArgsErr: "603",
        AuthDataEmpty: "604",
        TimerServerTimeOut: "611",
        GslbTimeOut: "621",
        TokenTimeOut: "623",
        LiveValidateTimeOut: "631",
        URLNotSupport: "641",
        MetaCannotUse: "642",
        OutSea: "643",
        VideoNotSupport: "644",
        ADCallbackErr: "645",
        ADURLNotSupport: "646",
        CopyritghtBan: "647",
        ExceedPlayMaxCount: "648",
        NotSupport1080P: "649",
        CNBan: "650",
        FirstLookBan: "651"
    };
    var s = {
        Idea: "Idea",
        Ready: "Ready",
        Start: "Start",
        Ended: "Ended",
        Playing: "Playing",
        Paused: "Paused",
        Seeking: "Seeking"
    };
    i.exports = {
        error: a,
        video: s
    }
});
define("video.timerProxy",
function(e, t, i) {
    var a = e("extend.lib");
    var s = {
        get: function(e, t) {
            var i = a.getCookie("le_time");
            if (i) {
                var s = Math.floor((new Date).getTime() / 1e3) + parseInt(i);
                e(s, false)
            } else {
                var n = Math.round(Math.random());
                if (n == 1) {
                    this.update(e, t)
                } else {
                    e(Math.floor((new Date).getTime() / 1e3), false)
                }
            }
        },
        update: function(e, t, i) {
            var s = 0;
            if (!t) t = 2e3;
            if (!i) i = "http://api.letv.com/time";
            var n = function(t) {
                if (t) {
                    var i = t.stime - Math.floor((new Date).getTime() / 1e3);
                    a.setCookie("le_time", i, {
                        expires: 1,
                        domain: ".letv.com",
                        path: "/"
                    });
                    e(t.stime, true)
                }
            },
            o = function() {
                e(Math.floor((new Date).getTime() / 1e3), false)
            };
            a.getJSON(i + "?callback=?", a.bind(n, this), a.bind(o, this), t, 1)
        }
    };
    t.get = s.get;
    t.update = s.update
});
define("video.stream",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("./baseVideo"),
    n = e("extend.detect"),
    o = e("./statusEnum").error;
    var r = s.extend({
        init: function() {
            this.video_ = vjs(this.video);
            this.changeVideoEnable()
        },
        src: function(e) {
            if (!n.iPhone) {
                this.evt.trigger("videoReady")
            }
            logger.log("播放视频：" + e);
            try {
                this.video.removeAttribute("src")
            } catch(t) {}
            try {
                this.video.src = e
            } catch(t) {
                this.video.setAttribute("src", e)
            }
            if (this.video && typeof this.video.load === "function") {
                this.video.load()
            }
        },
        playVideo: function() {
            this.play();
            this.forcePlay();
            this.fakeClick()
        },
        forcePlay: function() {
            var e = 0,
            t = false;
            var i = a.bind(function() {
                t = true;
                if (++e < 5) return;
                clearInterval(this.forceId);
                this.video_.off("timeupdate", i, this)
            },
            this);
            this.video_.on("timeupdate", i, this);
            var s = a.bind(function() {
                this.play();
                if (++e < 10) return;
                clearInterval(this.forceId);
                this.evt.off("timeupdate", i, this)
            },
            this);
            if (this.forceId) clearInterval(this.forceId);
            this.forceId = setInterval(s, 2e3)
        },
        fakeClick: function() {
            var e = document.createElement("a");
            e.setAttribute("id", "fakeClick");
            e.setAttribute("href", "#");
            vjs(e).on("click",
            function(e) {
                e.preventDefault()
            });
            var t, i = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            i.insertBefore(e, i.firstChild);
            if (document.createEvent) {
                t = document.createEvent("MouseEvents");
                if (t.initMouseEvent) {
                    t.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    var a = vjs("#fakeClick")[0];
                    a.dispatchEvent(t)
                }
            }
            i.removeChild(e)
        },
        seekTo: function(e) {
            try {
                this.video.currentTime = e
            } catch(t) {
                this.video_.one("canplay",
                function() {
                    this.video.currentTime = e
                },
                this)
            }
        },
        seek: function(e) {
            if (isNaN(e)) return;
            e = Math.max(e, 1);
            e = Math.min(e, this.gdur - 5);
            this.seekId && clearTimeout(this.seekId);
            var t = this,
            i = this.video.seekable;
            if (i) {
                if (i.length === 1 && i.end(0) > e) {
                    this.seekTo(e)
                } else {
                    this.seekId = setTimeout(function() {
                        t.seek(e)
                    },
                    1e3)
                }
            }
        },
        onchangeDefi: function() {
            this.evt.trigger("vjs_changeDefi")
        },
        currentTime: function(e) {
            if (typeof e === "undefined") {
                return this.video.currentTime
            } else {
                this.video.currentTime = e
            }
        },
        changeVideoEnable: function(e) {
            var t = "canplaythrough stalled seeking progress error canplay  ended  durationchange  seeked  loadeddata loadedmetadata timeupdate waiting playing play pause".split(/\s+/),
            i = "webkitendfullscreen stalled durationchange setDuration".split(/\s+/);
            vjs.each.call(this, t,
            function(e, t) {
                this.video_.on.call(this.video_, t, this.globeEventHandler, this)
            });
            vjs.each.call(this, i,
            function(e, t) {
                this.video_.on.call(this.video_, t, this.privateEventHandler, this)
            })
        },
        globeEventHandler: function(e) {
            if (e.type !== "timeupdate") {
                logger.log("globe:" + e.type)
            }
            this.evt.trigger(e.type)
        },
        privateEventHandler: function(e) {
            switch (e.type) {
            case "stalled":
                this.onStalled();
                break;
            case "durationchange":
                try {
                    var t = this.video.duration
                } catch(e) {}
                if (!isNaN(t) && t > 1 && isFinite(t)) {
                    this.evt.trigger("setDuration", t)
                }
                break;
            case "webkitendfullscreen":
                clearInterval(this.stalledId);
                clearInterval(this.forceId);
                break;
            case "setDuration":
                this.gdur = e.args[0];
                break
            }
        },
        onStalled: function(e) {
            if (this.video.paused) return;
            var t = 0,
            i = false;
            var s = a.bind(function() {
                i = true;
                if (++t < 10) return;
                clearInterval(this.stalledId);
                this.video_.off("timeupdate", s, this)
            },
            this);
            this.video_.on("timeupdate", s, this);
            var n = a.bind(function() {
                this.play();
                if (++t < 20) return;
                clearInterval(this.stalledId);
                this.video_.off("timeupdate", s, this);
                if (!i) this.setErrStatus(o["MetaCannotUse"])
            },
            this);
            if (this.stalledId) clearInterval(this.stalledId);
            this.stalledId = setInterval(n, 2e3)
        },
        play: function() {
            if (this.video && typeof this.video.play === "function") {
                this.video.play()
            }
        },
        stopForcePlay: function() {
            if (this.forceId) clearInterval(this.forceId)
        },
        sendDC: function() {}
    });
    i.exports = r
});
define("video.gslb",
function(e, t, i) {
    var a = e("extend.detect"),
    s = e("extend.lib"),
    n = e("core.event"),
    o = e("proxy.pingback");
    function r(e) {
        this.option = e;
        this.evt = e.events || n;
        this.isGslbSucc = 0;
        this.pingback = o.instances[this.option.cont];
        var t = navigator.userAgent;
        this.param = ["&expect=" + 3, "p1=0&p2=" + (this.option.pname == "MPlayer" ? "04": "06"), "termid=" + (a.isLetv ? 4 : 2), "ostype=" + (a.Android && "android" || /Mac OS/i.test(t) && "macos" || /Windows/.test(t) && "windows" || /linux/.test(t) && "linux" || "un"), "hwtype=" + (a.iPhone && "iphone" || a.iPad && "ipad" || /LETVX60/.test(t) && "X60" || /LETVX40/.test(t) && "X40" || "un")].join("&")
    }
    r.prototype = {
        getGslb: function(e, t) {
            if (e.length <= 0) {
                this.trigger("fail");
                return
            }
            this.urls = e;
            this.token = t;
            this.currIdx = -1;
            if ((this.isGslbSucc == 0 || this.isGslbSucc == 1) && this.isUserChangeRate) {
                this.adJustUUID()
            }
            this.changeGslbURL()
        },
        getLiveGslb: function(t, i) {
            if (t.length <= 0) {
                this.trigger("fail");
                return
            }
            if (this.option.letvVideo) {
                this.option.letvVideo.play(t, {
                    token: i
                });
                return
            }
            this.urls = t;
            this.token = i;
            this.streamid = s.getParamVal(t[0], "stream_id");
            if ((this.isGslbSucc == 0 || this.isGslbSucc == 1) && this.isUserChangeRate) {
                this.adJustUUID()
            }
            var a = e("./timerProxy");
            a.get(s.bind(this.onGetTimeSucc, this))
        },
        onGetTimeSucc: function(t, i) {
            t += 600;
            var a = e("./auth").getLiveKey(this.streamid, t);
            var n = [this.urls[0], this.param, "&sign=live_phone&format=1&jsonp=?&platid=10&playid=1&splatid=", this.option.pname == "MPlayer" ? "1006": "1005", "&tm=", t, "&key=", a].join("");
            if (this.token) {
                n += "&token=" + this.token + "&uid=" + s.getCookie("ssouid");
                this.token = null
            }
            n += "&uuid=" + this.pingback.uuid;
            s.getJSON(n, s.bind(this.onLiveGslbSucc, this), s.bind(this.onLiveGslbFail, this), 5e3, 3)
        },
        onLiveGslbSucc: function(e, t) {
            if (!e) return;
            if (e.ercode === 414) {
                this.trigger("liveFail", e.ercode);
                return
            }
            if (e.nodelist && e.nodelist.length > 0) {
                var i = [],
                a = e.nodelist;
                for (var s = 0,
                n = a.length; s < n; s++) {
                    if (a[s].location) i.push(a[s].location)
                }
                this.evt.trigger("ToSetTime", e && e.curtime ? e.curtime: Math.floor((new Date).getTime() / 1e3));
                this.trigger("liveSuccess", i);
                this.isGslbSucc = 1;
                this.evt.trigger("gslbScheduler", t)
            } else {
                this.trigger("liveFail")
            }
        },
        onLiveGslbFail: function() {
            this.isGslbSucc = 2;
            this.trigger("liveFail")
        },
        changeGslbURL: function() {
            if (++this.currIdx >= this.urls.length) {
                this.trigger("fail");
                return
            }
            var e = "";
            if (this.token) {
                e = "&token=" + this.token + "&uid=" + s.getCookie("ssouid")
            }
            if (this.option.uinfo) {
                e += "&uinfo=" + this.option.uinfo
            }
            if (this.option.isTrylook && this.option.trylookType == "appGuide" && this.option.cutoffTime) {
                e += "&cutoff=" + this.getCutoffOffset(this.option.cutoffTime)
            }
            var t = this.urls[this.currIdx] + "&format=1&jsonp=?" + e + this.param;
            t += "&uuid=" + this.pingback.uuid;
            if (this.option.isTrylook && this.option.trylookType == "vip") t += "&stop=600";
            s.getJSON(t, s.bind(this.onGslbSucc, this), s.bind(this.onGslbFail, this), 5e3, 1)
        },
        getCutoffOffset: function(e) {
            var t = [5, 10, 15, 20, 30];
            for (var i = 0; i < t.length; i++) {
                if (t[i] >= e) return t[i]
            }
            return 10
        },
        onGslbSucc: function(e, t) {
            if (e.playlevel >= 3 && !this.isUserChangeRate) {
                var i, a = this.movieVO;
                if (a["1"]) i = "1";
                else if (a["2"]) i = "2";
                else if (a["3"]) i = "3";
                if (i && this.defi != i) {
                    this.evt.trigger("TO_RateChanged", i);
                    return
                }
            }
            if (e && e.nodelist && e.nodelist.length > 0) {
                var s = [],
                n = e.nodelist;
                for (var o = 0,
                r = n.length; o < r; o++) {
                    if (n[o].location) s.push(n[o].location)
                }
                this.trigger("success", s);
                this.isGslbSucc = 1;
                this.evt.trigger("gslbScheduler", t)
            } else if (e && e.status) {
                this.trigger("fail")
            } else {
                this.changeGslbURL()
            }
        },
        onGslbFail: function() {
            this.isGslbSucc = 2;
            this.changeGslbURL()
        },
        adJustUUID: function() {
            var e = this.pingback.uuid;
            var t = e.match(/_(\d+)/);
            if (t == null) {
                e += "_1"
            } else {
                e = e.replace(t[0], "_" + (Number(t[1]) + 1))
            }
            this.pingback.uuid = e
        }
    };
    s.merge(r.prototype, n);
    i.exports = r
});
define("video.letvVideo",
function(e, t, i) {
    var a = e("extend.base64"),
    s = e("extend.lib");
    var n = "http://127.0.0.1:6990/play?enc=base64&url=";
    var o = function(e) {
        this.model = e;
        this.video = e.dom.videoEl[0]
    };
    o.prototype = {
        play: function(e, t) {
            var i = e[0];
            if (this.model.option.isLive) {
                i += "&platid=10&splatid=1095"
            } else {
                i += "&platid=3&splatid=1095"
            }
            if (t.token) i += "&token=" + t.token;
            var o = s.getCookie("ssouid");
            if (o && o.length) i += "&uid=" + o;
            i = n + a.encode(i);
            this.video.src = i
        }
    };
    i.exports = o
});
define("view.tpl",
function(e, t, i) {
    var a = function(e, t) {
        var i;
        switch (e) {
        case "minLive":
            i = ['<div class="hv_box hv_box_hide hv_box_live hv_box_live_mb" style="margin-top: 0">', '<div class="hv_play" style="background: none;"><video x-webkit-airplay="allow" style="width:100%;height:100%;"></video></div>', '<div class="hv_play_bg js-pannel" style="display:block;"></div>', '<div class="hv_play_poster" style="display: none"></div>', '<div class="hv_botbar">', '<div class="hv_botbar_bg"></div>', '<div class="hv_botbar_cnt">', '<div class="hv_start">', '<span class="hv_ico_stop"  style="display: block"><i></i></span>', "</div>", '<div class="hv_scroll">', '<div class="hv_scroll_cnt"><div class="live_bar">正在直播 <span>00:00:00</span></div></div>', "</div>", '<div class="hv_botbar_btn">', '<div class="hv_ico_screen"></div>', "</div>", "</div>", "</div>", '<div class="hv_ico_pasued" style="display:none;z-index: 19"></div>', '<div class="hv_ico_loading" style="display: none;z-index: 19"><div class="hv_loading"></div></div>', '<div class="hv_pop js-poptip" style="display:none;z-index: 11"></div>', '<div class="hv_play_bg js-bg" style="display:block;z-index: 10"></div>', "</div>"].join("");
            break;
        case "live":
            i = ['<div class="hv_box hv_box_hide hv_box_live" style="margin-top: 0">', '<div class="hv_play" style="background: none;"><video x-webkit-airplay="allow" style="width:100%;height:100%;"></video></div>', '<div class="hv_play_bg js-pannel" style="display:block;"></div>', '<div class="hv_play_poster" style="display: none"></div>', '<div class="hv_tip js-tip" style="display: none;"><span class="js-tip-msg"></span><span>|</span><div class="hv_tip_close">关闭</div></div>', '<div class="hv_botbar">', '<div class="hv_botbar_bg"></div>', '<div class="hv_botbar_cnt">', '<div class="hv_start">', '<span class="hv_ico_stop"  style="display: block"><i></i></span>', "</div>", '<div class="hv_scroll">', '<div class="hv_scroll_cnt"><div class="live_bar">正在直播 <span>00:00:00</span></div></div>', "</div>", '<div class="hv_botbar_btn">', '<div class="hv_ico_clear">', '<span class="hv_ico_sub hv_ico_clarity">流畅</span>', '<ul class="clear_ul"></ul>', "</div>", '<div class="hv_ico_screen"></div>', "</div>", "</div>", "</div>", '<div class="hv_ico_pasued" style="display:none;z-index: 19"></div>', '<div class="hv_ico_loading" style="display: none;z-index: 19"><div class="hv_loading"></div></div>', '<div class="hv_pop js-poptip" style="display:none;z-index: 11"></div>', '<div class="hv_play_bg js-bg" style="display:block;z-index: 10"></div>', "</div>"].join("");
            break;
        case "minBase":
            i = ['<div class="hv_box hv_box_hide hv_box_mb" style="margin-top: 0">', '<div class="hv_play" style="background: none;"><video x-webkit-airplay="allow" style="width:100%;height:100%;"></video></div>', '<div class="hv_play_bg js-pannel" style="display:block;"></div>', '<div class="hv_play_poster" style="display: none"></div>', '<div class="hv_botbar">', '<div class="hv_botbar_bg"></div>', '<div class="hv_botbar_cnt">', '<div class="hv_start">', '<span class="hv_ico_stop"  style="display: block"><i></i></span>', "</div>", '<div class="hv_scroll">', '<div class="hv_scroll_cnt">', '<div class="progress_bar">', '<span class="time_cur" style="left:0px;margin-left:35px;">00:00</span>', '<span class="time_total"></span>', "</div>", '<div class="progress_download" style="width:0px;"></div>', '<div class="porgress_playback" style="width:0px;"></div>', '<div class="hv_ico_playing" style="left:0px;"><span></span><span></span><span></span></div>', "</div>", "</div>", '<div class="hv_botbar_btn">', '<div class="hv_ico_screen"', t.isShowFullScreenBtn == 0 ? 'style="display:none"': "", "></div>", "</div>", "</div>", "</div>", '<div class="hv_ico_pasued" style="display:none;z-index: 19"></div>', '<div class="hv_ico_loading" style="z-index: 19"><div class="hv_loading"></div></div>', '<div class="hv_pop js-poptip" style="display:none;z-index: 11"></div>', '<div class="hv_play_bg js-bg" style="display:block;z-index: 10"></div>', "</div>"].join("");
            break;
        case "IPhone":
            i = ['<div class="hv_box hv_box_hide hv_box_mb" style="margin-top: 0">', '<div class="hv_play" style="background: none;"><video x-webkit-airplay="allow" style="width:100%;height:100%;"></video></div>', '<div class="hv_play_poster" style="display: none"></div>', '<div class="hv_ico_loading" ><div class="hv_loading"></div></div>', '<div class="hv_ico_pasued" style="display:none;z-index: 19"></div>', '<div class="hv_pop js-poptip" style="display:none;z-index: 11"></div>', '<div class="hv_play_bg js-bg" style="display:none;z-index: 10"></div>', "</div>"].join("");
            break;
        case "base":
        default:
            i = ['<div class="hv_box hv_box_hide" style="margin-top: 0">', '<div class="hv_play" style="background: none;"><video x-webkit-airplay="allow" style="width:100%;height:100%;"></video></div>', '<div class="hv_play_bg js-pannel" style="display:block;"></div>', '<div class="hv_play_poster" style="display: none"></div>', '<div class="hv_topbar">', '<div class="hv_topbar_bg"></div>', '<div class="hv_topbar_cnt"><span class="hv_ico_back"></span><span class="hv_tit"></span><span class="hv_ico_sub hv_ico_move" style="display: none;">推送</span></div>', "</div>", '<div class="hv_tip" style="display: none"><span>01:32</span><span>已开启跳过片头/片尾</span><span>|</span><a href="#">关闭</a></div>', '<div class="hv_tip js-tip" style="display: none;"><span class="js-tip-msg"></span><span>|</span><div class="hv_tip_close">关闭</div></div>', '<div class="hv_app_play" style="display: none;z-index:11"><span><i></i><a href="javascript:void(0);" title="">用乐视APP超清观看</a></span></div>', '<div class="hv_botbar">', '<div class="hv_botbar_bg"></div>', '<div class="hv_botbar_cnt">', '<div class="hv_start">', '<span class="hv_ico_stop"  style="display: block"><i></i></span>', "</div>", '<div class="hv_scroll">', '<div class="hv_scroll_cnt">', '<div class="progress_bar">', '<span class="time_cur" style="left:0px;margin-left:35px;">00:00</span>', '<span class="time_total"></span>', "</div>", '<div class="progress_download" style="width:0px;"></div>', '<div class="porgress_playback" style="width:0px;"></div>', '<div class="hv_ico_playing" style="left:0px;"><span></span><span></span><span></span></div>', "</div>", "</div>", '<div class="hv_botbar_btn">', '<div class="hv_ico_next"></div>', '<div class="hv_ico_clear">', '<span class="hv_ico_sub hv_ico_clarity">流畅</span>', '<ul class="clear_ul"></ul>', "</div>", '<div class="hv_ico_screen"', t.isShowFullScreenBtn == 0 ? 'style="display:none"': "", "></div>", "</div>", "</div>", "</div>", '<div class="hv_ico_pasued" style="display:none;"></div>', '<div class="hv_ico_loading" ><div class="hv_loading"></div></div>', '<div class="hv_pop js-poptip" style="display:none;z-index:11"></div>', '<div class="hv_rigbar" style="display:none">', '<ul class="hv_tuisong">', '<li class="p0"></li>', '<li class="p1">推送视频到其他设备，享受大屏观看体验</li>', '<li class="hv_ico_sub hv_ico_supertv">推送超级电视</li>', '<li class="hv_ico_sub hv_ico_airplay">通过AirPlay推送</li>', "</ul>", "</div>", '<div class="hv_pop hv_fastslide" style="display:none;">', '<div class="hv_fastslide_bar"></div>', '<div class="hv_ico_fastslide"></div>', '<div class="hv_fashslide_time"><span class="js-seek-curtime">00:00</span>/<span class="js-seek-tottime">50:23</span></div>', "</div>", '<div class="hv_play_bg js-bg" style="display:block;z-index: 10"></div>', "</div>"].join("");
            break
        }
        return i
    };
    var s = function(e) {
        var t;
        switch (e) {
        case "live":
        case "base":
        case "minBase":
        default:
            t = 'body,p,dl,dt,dd,ul,ol,li{margin:0;padding:0}html,body,form,fieldset,p,div,h1,h2,h3,h4,h5,h6{-webkit-text-size-adjust:none}.hv_box{font:12px/1.5 "寰蒋闆呴粦",arial;*line-height:1.5}.hv_box div,.hv_box ul,.hv_box dl{zoom:1}.hv_box ul,.hv_box ol{list-style:none;margin:0;padding:0}.hv_box img{border:0}div:after,ul:after,dl:after,.clearfix:after{content:"";display:block;clear:both;height:0;visibility:hidden}abbr,article,aside,audio,canvas,datalist,details,figure,footer,header,hgroup,menu,nav,output,progress,section,video{display:block;margin:0;padding:0}.hv_box a{text-decoration:none}.clearfix{clear:both;zoom:1}.hv_ico_star,.hv_ico_stop,.hv_ico_refresh,.hv_ico_next,.hv_ico_back,.hv_ico_screen,.hv_ico_allscreen,.hv_ico_pasued,.hv_ico_fastslide,.hv_pop .hv_pop_close span,.hv_tip .hv_tip_close,.hv_ico_loading,.hv_loading{background:url(http://i3.letvimg.com/img/201403/24/hv_ico.png) no-repeat -10000px}.hv_ico_sub{text-align:center;border:2px solid #cdcdcd;color:#ffffff;border-radius:3px;font-size:13px}.hv_box{position:relative;background:#000000;height:100%;overflow:hidden;clear:both;text-align:left;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.hv_fullscreen{position:absolute;width:100%;height:100.5%;top:0;left:0;z-index:1000}.hv_topbar,.hv_botbar,.hv_rigbar,.hv_tip{}.hv_box_hide .hv_topbar{transform:translate(0,-40px);-webkit-transform:translate(0,-40px);-moz-transform:translate(0,-40px);-o-transform:translate(0,-40px);-ms-transform:translate(0,-40px)}.hv_box_hide .hv_botbar{transform:translate(0,41px);-webkit-transform:translate(0,41px);-moz-transform:translate(0,41px);-o-transform:translate(0,41px);-ms-transform:translate(0,41px)}.hv_box_hide .hv_rigbar{transform:translate(300px,0);-webkit-transform:translate(300px,0);-moz-transform:translate(300px,0);-o-transform:translate(300px,0);-ms-transform:translate(300px,0)}.hv_box_hide .hv_tip{transform:translate(0,70px);-webkit-transform:translate(0,70px);-moz-transform:translate(0,70px);-o-transform:translate(0,70px);-ms-transform:translate(0,70px)}.hv_box_hide .hv_app_play{transform:translate(0,43px);-webkit-transform:translate(0,43px);-moz-transform:translate(0,43px);-o-transform:translate(0,43px);-ms-transform:translate(0,43px)}.hv_box_hide .clear_ul.hover{display:none}.hv_topbar,.hv_topbar_bg,.hv_topbar_cnt{position:absolute;left:0;top:-1px;width:100%;height:40px}.hv_topbar{}.hv_topbar_bg{background:#000000;opacity:0.5}.hv_topbar_cnt{color:#ffffff;opacity:0.6}.hv_topbar_cnt .hv_ico_back{float:left;background-position:0 -266px;width:17px;height:27px;margin:9px 20px 0;display:none}.hv_fullscreen .hv_ico_back{display:block}.hv_topbar_cnt .hv_tit{float:left;font-size:17px;line-height:38px;margin:0 20px}.hv_fullscreen .hv_tit{margin:0}.hv_topbar_cnt .hv_ico_move{float:right;padding:0 8px;height:24px;line-height:22px;border-radius:4px;margin-right:20px;margin-top:6px}.hv_play{width:100%;height:100%}.hv_play_bg,.hv_play_poster{height:100%;position:absolute;top:0;left:0;width:100%}.hv_play_poster{background-size:cover}.hv_botbar,.hv_botbar_bg,.hv_botbar_cnt{position:absolute;left:0;bottom:0;width:100%;height:40px}.hv_botbar{}.hv_botbar_bg{border-top:1px solid #171717;background:#000000;opacity:0.5}.hv_botbar_cnt{}.hv_app_play{bottom:45px;right:3px;position:absolute;border:2px solid #fff;border-radius:5px;text-align:center;width:150px;height:30px;line-height:28px}.hv_app_play a,.hv_app_play a:hover{color:#fff;display:block;font-size:14px;position:absolute;left:0;top:0;width:100%;height:30px}.hv_app_play span{position:relative;width:100%;height:30px;display:block}.hv_app_play span i{position:absolute;left:0;top:0;background-color:#000;opacity:0.6;display:block;width:100%;height:30px;border-radius:3px}.hv_start{width:50px;height:40px;float:left;position:relative;z-index:1}.hv_ico_star,.hv_ico_stop,.hv_ico_refresh{display:block;width:50px;height:40px}.hv_ico_star{background:none;display:none;padding-top:6px;height:34px}.hv_ico_star i{display:block;margin:0 auto;width:10px;height:28px;border-left:1px solid #FFFFFF;border-right:1px solid #FFFFFF}.hv_ico_stop{background-position:12px -64px;display:none}.hv_ico_refresh{background-position:8px -135px}.hv_ico_big .hv_ico_refresh{background-position:-44px -135px}.hv_scroll,.hv_scroll_cnt{height:40px}.hv_scroll{float:left;width:100%;margin-left:-50px;margin-right:-152px}.hv_scroll_cnt{position:relative;margin-left:50px;margin-right:152px}.progress_bar{border-bottom:1px solid #262626;height:20px;position:relative}.progress_bar span{font-size:12px}.porgress_breakpoint{position:absolute;top:19px;width:3px;height:3px;background:#ffffff}.progress_download{position:absolute;top:0;height:40px;background:#067ac7;opacity:0.2}.porgress_playback{position:absolute;top:0;height:40px;background:#067ac7;opacity:0.6}.time_total,.time_cur{position:absolute;bottom:-20px;right:0;color:#ffffff}.hv_ico_playing{width:20px;height:38px;position:absolute;top:0;background:#30bafe;border:1px solid;border-color:#28c6f8 #1ba7f4 #038ee1 #4be1ff;line-height:40px;text-align:center}.hv_ico_playing span{display:inline-block;width:1px;height:8px;margin-right:1px;line-height:0px;background:#8ed4f7;border-top:1px solid #2497d0;font-size:0;margin-top:16px}.hv_botbar_btn{float:right;margin-top:11px;width:152px}.hv_ico_next,.hv_ico_clear,.hv_ico_screen{float:left;margin:0 10px}.hv_ico_next{background-position:0 -213px;width:20px;height:24px}.hv_ico_next.gray{background-position:0 -497px}.hv_ico_clear{position:relative}.hv_ico_clarity{display:block;cursor:default;padding:0 5px;height:18px;line-height:17px}.clear_ul:before,.hv_tip:before{content:"";height:10px;width:10px;z-index:2;position:absolute;left:50%;margin-left:-5px;bottom:-5px;-webkit-transform-origin:5px 5px;-moz-transform-origin:5px 5px;-o-transform-origin:5px 5px;-moz-transform:rotate(45deg);-o-transform:rotate(45deg);-webkit-transform:rotate(45deg);background:-moz-linear-gradient(-45deg,transparent,transparent 49%,rgba(0,0,0,1) 50%,rgba(0,0,0,1));background:-webkit-gradient(linear,left top,right bottom,from(transparent),color-stop(49%,transparent),color-stop(50%,rgba(0,0,0,1)),to(rgba(0,0,0,1)));background:-o-linear-gradient(left top,transparent,transparent 49%,rgba(0,0,0,1) 50%,rgba(0,0,0,1))}.clear_ul{position:absolute;bottom:42px;left:-14px;width:64px;background:#050505;color:#ffffff;text-align:center;display:none;cursor:default}.clear_ul li{height:30px;line-height:30px;overflow:hidden;margin-bottom:4px;font-size:13px}.clear_ul li.hover{background:#00a0e9}.clear_ul.hover{display:block}*:focus{outline:none}.hv_ico_screen{background-position:0 -319px;width:24px;height:24px;outline:none}.hv_ico_allscreen{background-position:0 -372px;width:24px;height:24px;outline:none}.hv_tip{position:absolute;bottom:46px;left:40px;background:#000000;border:1px solid #262626;height:21px;line-height:21px;padding:0 10px;opacity:0.6;color:#ffffff}.hv_tip:before{bottom:-3px;left:24px}.hv_tip span{margin:0 4px}.hv_tip a{margin:0 4px;color:#ffffff}.hv_tip .hv_tip_close{float:right;position:relative;background-position:0 -460px;width:13px;height:13px;text-indent:-999px;margin-top:4px;margin-left:4px}.hv_ico_pasued,.hv_ico_loading{position:absolute;top:50%;left:50%;margin:-55px 0 0 -55px;width:110px;height:110px;overflow:hidden;z-index:100}.hv_ico_pasued{background-position:-140px 0}.hv_ico_loading,.hv_loading{width:107px;height:107px}.hv_ico_loading{background-position:-106px -443px}.hv_loading{background-position:-230px -443px;animation:disqus-embed-spinner .7s infinite linear;-webkit-animation:disqus-embed-spinner .7s infinite linear}@keyframes disqus-embed-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-webkit-keyframes disqus-embed-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}.hv_rigbar{position:absolute;top:0;right:0;width:300px;height:100%;background:#000000;opacity:0.6}.hv_tuisong{padding:0 42px}.hv_tuisong li{margin-bottom:20px}.hv_tuisong .p0{background:url(http://i3.letvimg.com/img/201403/10/1420/hv_ico_tui.png) no-repeat center top;height:128px;margin-top:100px}.hv_tuisong .p1{color:#ffffff;font-size:16px}.hv_ico_supertv,.hv_ico_airplay{border-radius:4px;height:40px;line-height:38px}.hv_juji{width:302px;opacity:0.6}.hv_juji li{float:left;width:99px;height:69px;line-height:69px;font-size:24px;font-family:Arial;color:#ffffff;text-align:center;border-right:1px solid #ffffff;border-bottom:1px solid #ffffff}.hv_charlist{opacity:0.8}.hv_charlist li{height:67px;color:#cccccc;font-size:16px;padding:0 18px;padding-top:18px;border-bottom:1px solid #cccccc;vertical-align:middle}.hv_charlist li.hover{background:#00a0e9;color:#ffffff}.hv_pop_bg{display:none;background:#000000;opacity:0.2;overflow:hidden;width:100%;height:100%;position:absolute;top:0px;left:0px}.hv_pop{display:none;position:absolute;top:50%;left:50%;width:270px;height:128px;padding:50px 30px 20px 30px;margin:-104px 0 0 -165px;background:#000000;border:1px solid #262626;color:#ffffff;text-align:center;vertical-align:middle;opacity:0.6}.hv_pop .hv_pop_close{position:absolute;top:-10px;right:-10px;width:16px;height:16px;border:2px solid #000000;border-radius:16px;background:#000000}.hv_pop .hv_pop_close span{display:block;width:12px;height:12px;border:2px solid #ffffff;border-radius:12px;background-position:2px -423px}.hv_pop .hv_blu{color:#00a0e9}.hv_pop .hv_font16{font-size:16px}.hv_pop .hv_font14{font-size:14px;margin-top:14px}.hv_pop .hv_font14 .hv_ico_sub{font-size:14px;padding:0 10px}.hv_otherpop{padding:0;width:330px;height:200px}.hv_otherpop .hv_font16{border-bottom:1px solid #272727;height:50px;line-height:50px}.hv_otherpop .hv_font14{border-bottom:1px solid #505050;height:50px;margin-top:0;line-height:50px}.hv_pop_change{padding:0;width:329px;height:200px}.hv_pop_change .hv_font16{margin-top:12px}.hv_pop_change .hv_font141{font-size:14px;text-align:left;padding:0 16px;margin-top:10px}.hv_pop_change .hv_font141 .hv_ico_sub{margin-left:20px;padding:0 10px}.hv_pop_change .hv_pop_ico{position:absolute;bottom:0;left:-1px}.hv_pop_change .hv_pop_ico .hv_ico1{display:inline-block;height:48px;width:109px;line-height:48px;text-align:center;border-top:1px solid #373737;border-left:1px solid #373737}.hv_pop_change .hv_font14{margin-top:4px}.hv_pop_change .hv_ico_tui1{margin-top:8px;background:url(http://i3.letvimg.com/img/201403/18/hv_ico_tui1.png) no-repeat center center;height:47px}.hv_pop_change1 .hv_font16{margin-top:50px}.hv_pop_change1 .hv_pop_ico .hv_ico1{width:164px}.hv_fastslide{width:145px;height:110px;background:#000000;top:50%;left:50%;margin:-55px 0 0 -72px;padding:0}.hv_fastslide_bar{background:#00a0e9;width:20px;height:5px;overflow:hidden}.hv_ico_fastslide{background-position:-160px -133px;height:86px;width:72px;margin:0 auto}.hv_ico_fastslide_left{-moz-transform:rotate(180deg);-o-transform:rotate(180deg);-webkit-transform:rotate(180deg)}.hv_fashslide_time{text-align:center;color:#999999}.hv_fashslide_time span{color:#ffffff}.hv_box_mb{}.hv_box_mb .hv_topbar{display:none}.hv_box_mb .hv_scroll{margin-right:-40px}.hv_box_mb .hv_scroll_cnt{margin-right:40px}.hv_box_mb .hv_botbar_btn{width:40px}.hv_box_mb .hv_ico_pasued,.hv_box_mb .hv_ico_loading{margin:-35px 0 0 -35px}.hv_box_mb .hv_ico_loading,.hv_box_mb .hv_loading,.hv_box_mb .hv_ico_pasued{width:70px;height:70px}.hv_box_mb .hv_ico_loading{background-position:-124px -354px}.hv_box_mb .hv_loading{background-position:-213px -354px}.hv_box_mb .hv_ico_pasued{background-position:-266px 0}.hv_box_sys_hide{}.hv_box_sys_hide .hv_topbar,.hv_box_sys_hide .hv_botbar,.hv_box_sys_hide .hv_rigbar,.hv_box_sys_hide .hv_tip,.hv_box_sys_hide .hv_fastslide,.hv_box_sys_hide .hv_ico_loading{display:none}.hv_box_mb.hv_fullscreen .hv_play_poster{background-color:#000;background-position:center center;background-repeat:no-repeat;background-size:auto}.hv_box_live{}.hv_box_live .hv_scroll{margin-right:-120px}.hv_box_live .hv_scroll_cnt{margin-right:120px}.hv_box_live .hv_botbar_btn{width:120px}.hv_box_live .live_bar{color:#ffffff;line-height:42px;padding-left:30px;font-size:12px}.hv_box_live .live_bar span{font-size:12px}.hv_box_live .hv_topbar,.hv_box_live .hv_fastslide{display:none}.hv_box_live_mb .hv_scroll{margin-right:-40px}.hv_box_live_mb .hv_scroll_cnt{margin-right:40px}.hv_box_live_mb .hv_botbar_btn{width:40px}.hv_box_live_mb .live_bar{padding-left:10px}.hv_box_live_mb .hv_ico_pasued,.hv_box_live_mb .hv_ico_loading{margin:-35px 0 0 -35px}.hv_box_live_mb .hv_ico_loading,.hv_box_live_mb .hv_loading,.hv_box_live_mb .hv_ico_pasued{width:70px;height:70px}.hv_box_live_mb .hv_ico_loading{background-position:-124px -354px}.hv_box_live_mb .hv_loading{background-position:-213px -354px}.hv_box_live_mb .hv_ico_pasued{background-position:-266px 0}.hv_kt_vip{border:0;height:144px;margin-top:-107px;opacity:0.8}.hv_kt_vip img{width:88%;height:auto;margin:0 auto;border-radius:2px}.hv_kt_vip,.hv_sk_vip{line-height:28px}.hv_kt_vip a,.hv_sk_vip a{display:inline-block;width:40%;border-radius:5px;margin:0 10px;height:30px;line-height:30px}.hv_kt_vip .a1,.hv_sk_vip .a1{color:#fff;background-color:#f68703}.hv_sk_vip .a1{width:33%;margin:0 5px}.hv_sk_vip i{font-style:normal;color:#F68703;padding:0 2px}.hv_kt_vip .a2{color:#0f93de;border:1px solid #0f93de}.hv_sk_vip .hv_font12{font-size:15px;margin-bottom:12px}.hv_btn20{padding:20px 0}.hv_three .hv_font12{margin-bottom:0}.hv_pop_poster{position:absolute;top:50%;left:50%;margin:-112px 0 0 -182px;width:365px;height:225px;overflow:hidden;background-color:#f1f1f1}.hv_pop_poster p{text-align:center;margin-bottom:12px}.hv_pop_poster p.hv_p1{padding-top:48px}.hv_pop_poster a{display:inline-block;height:40px;width:224px;line-height:40px;background-color:#f7f7f7;font-size:15px;color:#7e7e7e;border:1px solid #d1d1d1}.hv_pop_poster a.blu{background-color:#00a0e9;color:#ffffff;border:1px solid #00a0e9}.hv_pop_poster a.close{width:20px;height:20px;display:block;position:absolute;top:10px;right:10px;border:none;background:none}.hv_pop_poster a.close i{display:block;width:18px;height:2px;position:absolute;top:6px;left:0;background:#737373;transform:rotate(-45deg);-ms-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-webkit-transform:rotate(-45deg);-o-transform:rotate(-45deg)}.hv_pop_poster a.close i.i_1{transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg)}.hv_pop_poster .hv_org{color:#fd6c01}'
        }
        return t
    };
    i.exports = {
        getTpl: a,
        getCss: s
    }
});
define("view.component",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("extend.detect"),
    n = e("core.event");
    var o = vjs.extend({
        init: function(e) {
            this.option = e.option;
            this.cutoffTime = 0;
            this.__proto__.model = e;
            this.__proto__.evt = e.events;
            this.__proto__.state = {
                videoState: "init",
                isDrag: false,
                isSeeking: false
            };
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this);
            this.render(this.model.option["cont"]);
            this.evt.on("setPoster",
            function(e) {
                if (!this.model.vinfo.poster || this.model.vinfo.up == 1) {
                    this.initPoster(e.args[0])
                }
            },
            this);
            this.__proto__.parentEl = this.model.dom.parentEl;
            this.initChildren()
        },
        addEvent: function() {
            this.evt.on("play", this.stateChange, this);
            this.evt.on("pause", this.stateChange, this);
            this.evt.on("ended", this.stateChange, this);
            this.evt.on("vjs_changeDefi", this.stateChange, this);
            this.evt.on("seeking", this.stateChange, this);
            this.evt.on("loadedmetadata", this.stateChange, this);
            this.evt.on("seeked", this.stateChange, this);
            this.evt.on("canplaythrough", this.stateChange, this)
        },
        removeEvent: function() {
            this.evt.off("play", this.stateChange, this);
            this.evt.off("pause", this.stateChange, this);
            this.evt.off("ended", this.stateChange, this);
            this.evt.off("vjs_changeDefi", this.stateChange, this);
            this.evt.off("seeking", this.stateChange, this);
            this.evt.off("loadedmetadata", this.stateChange, this);
            this.evt.off("seeked", this.stateChange, this);
            this.evt.off("canplaythrough", this.stateChange, this)
        },
        stateChange: function(e) {
            var t = e.type;
            var i = "";
            switch (t) {
            case "play":
                i = "play";
                break;
            case "pause":
                i = "pause";
                break;
            case "ended":
                i = "ended";
                break;
            case "seeking":
            case "vjs_changeDefi":
                this.state.isSeeking = true;
                break;
            case "loadedmetadata":
                this.state.isSeeking = false;
                break;
            case "seeked":
            case "canplaythrough":
                if (t == "seeked" && (s.iPhone || s.iPad)) return;
                this.state.isSeeking = false;
                break
            }
            if (i) {
                this.state.videoState = i
            }
        },
        setTrylook: function(e, t) {
            this.cutoffTime = t * 60;
            if (e) {
                this.evt.on("timeupdate", this.checkTryLook, this);
                this.evt.on("ended",
                function() {
                    this.checkTryLook(this.cutoffTime)
                },
                this)
            } else {
                this.evt.off("timeupdate", this.checkTryLook, this)
            }
        },
        checkTryLook: function(e) {
            if (isNaN(e)) e = this.core.getCurrentTime();
            var t = this.model.option;
            if ((t.trylookType == "vip" || t.trylookType == "appGuide") && e >= t.cutoffTime * 60) {
                this.evt.trigger("TO_Pause");
                this.evt.trigger("changeFullscreen", false);
                this.evt.trigger("TO_Seek", 1);
                if (t.trylookType == "vip") {
                    this.evt.trigger("showTip", "tryLookEnd");
                    this.evt.trigger("tryLookEnd")
                } else {
                    this.evt.trigger("showMessage", "appGuideEnd");
                    this.evt.trigger("appGuideEnd")
                }
                this.evt.trigger("TO_Stop");
                return 1
            }
            return 0
        },
        render: function(t) {
            var i;
            if (!/^#/.test(t)) t = "#" + t;
            i = vjs(t);
            if (!i || !i.length || !i[0].nodeName) {
                throw new TypeError("The element or ID supplied is not valid.")
            }
            var a = e("view.tpl").getTpl(this.option.tplType, this.model.option.flashvar);
            a = a.replace(/{cont}/g, t);
            i[0].innerHTML = a;
            i[0].style.width = this.option.width + "px";
            i[0].style.height = this.option.height + "px";
            this.model.dom = {
                tag: i,
                parentEl: i.find(".hv_box")
            };
            if (this.model.vinfo.poster) {
                this.initPoster(this.model.vinfo.poster)
            }
            return i[0]
        },
        initPoster: function(e) {
            var t = this.model.dom.parentEl.find(".hv_play_poster")[0];
            t.style.backgroundImage = "url(" + e + ")";
            t.style.display = "block"
        },
        initChildren: function() {
            var t = this.option,
            i = this.childrens = {};
            if (t && t.children) {
                vjs.each.call(this, t.children,
                function(t, a) {
                    var s = e(a),
                    n = new s(this);
                    i[a] = n
                })
            }
        },
        getChildren: function(e) {
            var t = function(i) {
                for (var a in i) {
                    if (a === e) return i[a];
                    if (i[a].childrens) {
                        return t(i[a].childrens)
                    }
                }
                return null
            };
            return t(this.childrens)
        },
        show: function() {},
        hide: function() {},
        enable: function() {},
        disable: function() {}
    });
    a.merge(o.prototype, n);
    i.exports = o
});
define("view.controlBar",
function(e, t, i) {
    var a = e("./component");
    var s = a.extend({
        init: function() {
            this.initChildren()
        }
    });
    s.prototype.option = {
        children: {
            playBtn: "view.widget.playBtn",
            fullBtn: "view.widget.fullBtn",
            defiBtn: "view.widget.defiBtn",
            porgressbar: "view.widget.progressBar",
            nextVideoBtn: "view.widget.nextVideoBtn"
        }
    };
    i.exports = s
});
define("view.playingPannel",
function(e, t, i) {
    var a = e("./component"),
    s = e("extend.lib"),
    n = e("extend.detect"),
    o = e("extend.touchable");
    var r = a.extend({
        init: function() {
            this.nodes = {
                pannel: this.parentEl.find(".js-pannel"),
                poster: this.parentEl.find(".hv_play_poster"),
                loading: this.parentEl.find(".hv_ico_loading"),
                title: this.parentEl.find(".hv_tit"),
                seekTip: this.parentEl.find(".hv_fastslide"),
                seekTipImg: this.parentEl.find(".hv_ico_fastslide"),
                seekTipCurrentTime: this.parentEl.find(".js-seek-curtime"),
                seekTipTotalTime: this.parentEl.find(".js-seek-tottime"),
                seekTipBar: this.parentEl.find(".hv_fastslide_bar"),
                optDefi: this.parentEl.find(".clear_ul"),
                bigPlayBtn: this.parentEl.find(".hv_ico_pasued"),
                playBtn: this.parentEl.find(".hv_start span"),
                shadow: this.parentEl.find(".js-bg"),
                currentTimeTip: this.parentEl.find(".time_cur"),
                appPlay: this.parentEl.find(".hv_app_play"),
                controlBar: this.parentEl.find(".hv_botbar")
            };
            this.nodes.title[0].innerHTML = this.model.vinfo.title || "";
            this.onResize();
            this.seekTotalTime = 60 * 3;
            this.startSeekTime = null;
            this.seekTime = 0;
            this.seekDir = "";
            this.duration = 0;
            this.prepareSeekTime = null;
            this.autoHideTime = null;
            this.delayTime = null;
            this.isMove = false;
            this.pannelTouchable = new o(this.nodes.pannel[0], {
                isTargetNode: true
            });
            this.evt.on("setDuration", this.onSetDuration, this);
            this.evt.on("videoReady", this.onVideoSucc, this);
            this.evt.on("tryLookEnd appGuideEnd", this.onTrylookEnd, this);
            this.evt.on("TO_Resize", this.onResize, this);
            this.evt.on("PLAY_NEW_ID", this.onPlayNewId, this);
            this.evt.on("play", this.onFirstPlay, this);
            this.evt.on("refreshPlayer",
            function() {
                this.evt.off("play", this.onFirstPlay, this)
            },
            this);
            this.nodes.bigPlayBtn.on("click", this.toPlay, this);
            this.nodes.appPlay.on("touchend",
            function() {
                this.evt.trigger("Player_Callback", "OPEN_APP", {
                    vid: this.model.vinfo.vid
                })
            },
            this);
            this.evt.on("timeupdate pause", this.hide, this);
            this.evt.on("seeking waiting error stalled", this.show, this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent();
                    if (n.iPad) {
                        this.nodes.appPlay[0].style.display = "block"
                    }
                } else {
                    this.removeEvent();
                    if (n.iPad) {
                        this.nodes.appPlay[0].style.display = "none"
                    }
                }
            },
            this)
        },
        addEvent: function() {
            if (!n.Android && !vjs.isPC) {
                this.pannelTouchable.on("touchstart", this.onPannelTouchStart, this);
                this.pannelTouchable.on("touchmove", this.onPannelTouchMove, this);
                this.pannelTouchable.on("touchend", this.onPannelTouchEnd, this)
            }
            if (vjs.isPC) {
                this.nodes.pannel.on("click", this.switchPlayStatus, this);
                this.nodes.pannel.on("mousemove", this.showPannel, this);
                this.nodes.shadow.on("click", this.stopPropagation);
                this.evt.on("play", this.onPlay, this);
                this.evt.on("pause", this.onPause, this);
                this.evt.on("showMessage", this.disable, this)
            } else {
                this.nodes.pannel.on("touchend", this.togglePannel, this);
                this.nodes.shadow.on("touchend", this.stopPropagation);
                this.nodes.controlBar.on("touchend", this.showPannel, this)
            }
            this.evt.on("ended", this.onEnded, this);
            this.evt.on("showTip TO_Seek", this.showPannel, this)
        },
        removeEvent: function() {
            if (!n.Android && !vjs.isPC) {
                this.pannelTouchable.off("touchstart", this.onPannelTouchStart, this);
                this.pannelTouchable.off("touchmove", this.onPannelTouchMove, this);
                this.pannelTouchable.off("touchend", this.onPannelTouchEnd, this)
            }
            if (vjs.isPC) {
                this.nodes.pannel.off("click", this.switchPlayStatus, this);
                this.nodes.pannel.off("mousemove", this.showPannel, this);
                this.nodes.shadow.off("click", this.stopPropagation);
                this.evt.off("play", this.onPlay, this);
                this.evt.off("pause", this.onPause, this)
            } else {
                this.nodes.pannel.off("touchend", this.togglePannel, this);
                this.nodes.shadow.off("touchend", this.stopPropagation);
                this.nodes.controlBar.off("touchend", this.showPannel, this)
            }
            this.evt.off("ended", this.onEnded, this);
            this.evt.off("showTip", this.showPannel, this)
        },
        onSetDuration: function(e) {
            this.duration = e.args[0];
            this.nodes.seekTipTotalTime[0].innerHTML = s.formatTime(this.duration)
        },
        onVideoSucc: function() {
            this.nodes.loading[0].style.display = "none";
            this.nodes.bigPlayBtn[0].style.display = "block";
            this.evt.off("videoReady")
        },
        onPlayNewId: function() {
            clearTimeout(this.autoHideTime);
            this.parentEl.addClass("hv_box_hide");
            this.nodes.optDefi.removeClass("hover")
        },
        toPlay: function() {
            this.nodes.bigPlayBtn[0].style.display = "none";
            this.nodes.poster[0].style.display = "none";
            this.nodes.shadow[0].style.display = "none";
            this.evt.trigger("TO_Play")
        },
        onPannelTouchStart: function() {
            this.isMove = false;
            clearTimeout(this.prepareSeekTime);
            var e = this.nodes.currentTimeTip[0].currentTime;
            this.startSeekTime = typeof e == "undefined" ? 0 : e
        },
        onPannelTouchMove: function(e) {
            if (this.state.videoState == "init") return;
            this.isMove = true;
            var t = this.pannelTouchable.currentStartDelta.x / this.pannelWidth;
            if (Math.abs(t) >= .15 && !this.state.isDrag) {
                this.state.isDrag = true;
                this.nodes.seekTip[0].style.display = "block";
                this.nodes.loading[0].style.display = "none";
                this.evt.trigger("TO_Pause")
            }
            if (this.state.isDrag) {
                var i = e.args[1];
                i.preventDefault();
                var a = this.pannelTouchable.currentDelta.x;
                if (Math.abs(a) < 2) return;
                if (!this.seekDir || this.seekDir == "right" && a <= 0 || this.seekDir == "left" && a > 0) {
                    if (a > 0) {
                        this.nodes.seekTipImg.removeClass("hv_ico_fastslide_left");
                        this.seekDir = "right"
                    } else {
                        this.nodes.seekTipImg.addClass("hv_ico_fastslide_left");
                        this.seekDir = "left"
                    }
                }
                this.seekTime = this.startSeekTime + t * this.seekTotalTime;
                this.seekTime = Math.max(0, this.seekTime);
                this.seekTime = Math.min(this.seekTime, this.duration);
                this.nodes.seekTipBar.setStyle("width", this.seekTime / this.duration * 100 + "%");
                this.nodes.seekTipCurrentTime[0].innerHTML = s.formatTime(this.seekTime);
                this.evt.trigger("updateSeekTime", this.seekTime)
            }
        },
        onPannelTouchEnd: function(e) {
            if (this.state.isDrag) {
                var t = e.args[1];
                t.stopPropagation();
                this.prepareSeekTime = setTimeout(s.bind(function() {
                    this.nodes.seekTip[0].style.display = "none";
                    this.state.isDrag = false;
                    this.evt.trigger("TO_Seek", this.seekTime);
                    if (!this.state.isUserPause) {
                        this.evt.trigger("TO_Play")
                    }
                    this.startSeekTime = null;
                    this.seekTime = 0
                },
                this), 500)
            }
        },
        onFirstPlay: function() {
            this.nodes.poster[0].style.display = "none";
            this.nodes.bigPlayBtn[0].style.display = "none";
            this.nodes.shadow[0].style.display = "none";
            if (!this.model.state.isAd) {
                this.parentEl.removeClass("hv_box_hide");
                this.autoHidePannel()
            }
            this.evt.off("playing", this.onFirstPlay, this)
        },
        onEnded: function() {
            this.nodes.poster[0].style.display = "block";
            this.nodes.bigPlayBtn[0].style.display = "block";
            this.parentEl.addClass("hv_box_hide");
            this.nodes.optDefi.removeClass("hover");
            this.evt.on("playing", this.onFirstPlay, this)
        },
        onPlay: function() {
            this.nodes.loading[0].style.display = "none"
        },
        onPause: function() {
            this.nodes.bigPlayBtn[0].style.display = "block"
        },
        show: function() {
            if (this.state.videoState != "play") return;
            this.nodes.loading[0].style.display = "block"
        },
        hide: function(e) {
            if (e.type != "pause" && this.state.isSeeking) return;
            this.nodes.loading[0].style.display = "none"
        },
        toSeek: function(e) {
            this.startSeekTime = e.args[0]
        },
        autoHidePannel: function() {
            clearTimeout(this.autoHideTime);
            this.autoHideTime = setTimeout(s.bind(function() {
                if (!this.state.isDrag) {
                    this.parentEl.addClass("hv_box_hide");
                    this.nodes.optDefi.removeClass("hover")
                }
            },
            this), 5e3)
        },
        togglePannel: function(e) {
            if (e && e.target === this.nodes.pannel[0] && !this.isMove) {
                if (this.delayTime) {
                    clearTimeout(this.delayTime);
                    this.delayTime = null
                } else {
                    this.delayTime = setTimeout(s.bind(function() {
                        if (this.parentEl.hasClass("hv_box_hide")) {
                            this.parentEl.removeClass("hv_box_hide")
                        } else {
                            this.parentEl.addClass("hv_box_hide");
                            this.nodes.optDefi.removeClass("hover")
                        }
                        this.autoHidePannel();
                        this.delayTime = null
                    },
                    this), 200)
                }
            }
        },
        showPannel: function() {
            this.parentEl.removeClass("hv_box_hide");
            this.autoHidePannel()
        },
        onResize: function() {
            this.pannelWidth = this.nodes.pannel.width()
        },
        onTrylookEnd: function() {
            this.nodes.loading[0].style.display = "none";
            this.parentEl.addClass("hv_box_hide")
        },
        switchPlayStatus: function(e) {
            if (e.target != this.nodes.pannel[0]) return;
            if (this.nodes.playBtn.hasClass("hv_ico_stop")) {
                this.evt.trigger("TO_Play")
            } else {
                this.nodes.loading[0].style.display = "none";
                this.evt.trigger("TO_Pause")
            }
        },
        stopPropagation: function(e) {
            e.stopPropagation()
        },
        disable: function() {
            this.removeEvent();
            this.parentEl.addClass("hv_box_hide")
        },
        enable: function() {
            this.addEvent()
        }
    });
    i.exports = r
});
define("view.pushing",
function(e, t, i) {
    var a = e("./component"),
    s = e("module.user"),
    n = e("extend.lib");
    var o = a.extend({
        init: function() {
            this.nodes = {
                pushingBtn: this.model.dom.parentEl.find(". hv_ico_move"),
                startPushingBtn: this.model.dom.parentEl.find(".hv_ico_supertv")
            };
            this.addEvent()
        },
        addEvent: function() {
            this.nodes.pushingBtn.on("click",
            function() {
                this.startPushingBtn[0].show()
            },
            this);
            this.nodes.startPushingBtn.on("click",
            function() {
                var e = n.getCookie("userid");
                var t = "http://duoping.go.letv.com/?act=push&toDeviceId=117.121.58.84110_-378262597&seq=23&userId=letv_529dde039041853&videoId=20009705&time=33041&title=fengzw&deviceType=0";
                n.getJSON()
            })
        }
    });
    i.exports = o
});
define("view.popTip",
function(e, t, i) {
    var a = e("./component"),
    s = e("extend.detect"),
    n = e("video.statusEnum").error;
    var o = a.extend({
        init: function() {
            this.nodes = {
                popTip: this.parentEl.find(".js-poptip"),
                shadow: this.parentEl.find(".js-bg"),
                bigPlay: this.parentEl.find(".hv_ico_pasued"),
                loading: this.parentEl.find(".hv_ico_loading"),
                videoCon: this.parentEl.find(".hv_play")
            };
            if (!vjs.isPC) {
                this.nodes.popTip.on("touchend", this.onTipClick, this)
            } else {
                this.nodes.popTip.on("click", this.onTipClick, this)
            }
            this.evt.on("showMessage",
            function(e) {
                if (e.args[0]) {
                    this.show(e.args[0], e.args[1]);
                    this.nodes.videoCon[0].style.display = "none"
                } else {
                    this.hide();
                    this.nodes.videoCon[0].style.display = "block"
                }
            },
            this);
            this.evt.on("refreshPlayer",
            function() {
                this.evt.trigger("showMessage")
            },
            this)
        },
        onTipClick: function(e) {
            var t = vjs(e.target).getAttr("type");
            switch (t) {
            case "login":
                if (window.Spirit && Spirit.userLogin && Spirit.userLogin.openLetvLogin) {
                    Spirit.userLogin.openLetvLogin()
                } else if (this.model.option.pname == "MPlayer") {
                    location.href = "http://sso.letv.com/user/mloginHome?next_action=" + encodeURIComponent(location.href)
                }
                break;
            case "back-home":
                location.href = "http://www.letv.com";
                break;
            case "refresh":
                location.reload();
                break;
            case "costTicket":
                this.evt.trigger("TO_UseTicket");
                break;
            case "close":
                this.hide();
                break;
            case "tv":
                location.href = "http://shop.letv.com/zt/mobile.html?cps_id=Le_ydm007";
                break;
            case "zhifu":
                if (this.model.option.pname == "MPlayer") {
                    location.href = "http://zhifu.letv.com/mz/tobuy/regular?fronturl=" + encodeURIComponent(location.href)
                } else {
                    location.href = "http://zhifu.letv.com/tobuy/regular?ref=pfuceng&from=H5PAD&fronturl=" + encodeURIComponent(location.href)
                }
                break;
            case "download":
                if (this.model.option.pname == "MPlayer") {
                    this.evt.trigger("Player_Callback", "OPEN_APP", {
                        vid: this.model.vinfo.vid,
                        openType: "auth-ban"
                    })
                } else {
                    location.href = "http://down.m.letv.com/download.php?ref=2068"
                }
                break;
            case "play":
                if (this.model.option.tplType == "IPhone") {
                    this.nodes.videoCon[0].style.display = "block"
                }
                this.hide();
                this.evt.trigger("TO_Play");
                break;
            case "open-app":
                var i = vjs(e.target).getAttr("open-type") || "";
                this.evt.trigger("Player_Callback", "OPEN_APP", {
                    vid: this.model.vinfo.vid,
                    openType: i
                });
                break
            }
        },
        show: function(e, t) {
            this.hide();
            this.nodes.popTip.className = "hv_pop js-poptip";
            this.nodes.bigPlay[0].style.display = "none";
            if (this.nodes.loading[0]) this.nodes.loading[0].style.display = "none";
            var i = "";
            t = t || {};
            switch (e) {
            case "vip1":
                i = ['<p class="hv_font16">此视频为会员影片，请使用电脑登录乐视网，加入乐视VIP会员。</p>', '<p class="hv_font14">如您已是会员，请<a type="login" href="javascript:void(0);" class="hv_blu">登录</a></p>'].join("");
                break;
            case "vip2":
                i = ['<p class="hv_font16">此视频为会员影片，请使用电脑登录乐视网，加入乐视VIP会员。</p>', '<p class="hv_font14">或请用会员身份登录。</p>'].join("");
                break;
            case "tvVip1":
                i = ['<p class="hv_font16">此视频为会员影片，请进入TV版加入乐视VIP会员。</p>', '<p class="hv_font14">如您已是会员，请<a type="login" href="javascript:void(0);" class="hv_blu">登录</a></p>'].join("");
                break;
            case "tvVip2":
                i = ['<p class="hv_font16">此视频为会员影片，请进入TV版加入乐视VIP会员。</p>', '<p class="hv_font14">或请用会员身份登录。</p>'].join("");
                break;
            case "liveVip":
                i = ['<p class="hv_font16">当前节目为付费直播内容，请付费后观看</p>'].join("");
                break;
            case n.CopyritghtBan:
                i = ['<p class="hv_font16">由于版权方的要求，该视频暂不支持在该平台播放</p>', '<p class="hv_font14">回乐视网观看，<a type="back-home" href="javascript:void(0);" class="hv_blu">立即前往！</a></p>'].join("");
                break;
            case n.OutSea:
                i = '<p class="hv_font16">因版权方要求，此视频只允许在中国大陆播放,若您所在区域为中国大陆，请联系客服: 400-6300-104处理</p>';
                break;
            case n.CNBan:
                i = '<p class="hv_font16"><br/>因政策原因，该内容无法提供观看</p>';
                break;
            case n.FirstLookBan:
                this.nodes.popTip.addClass("hv_kt_vip");
                i = '<p class="hv_font16">当前视频抢先更新<br/>只在乐视手机客户端</p>';
                if (this.model.option.pname == "MPlayer") {
                    i += '<p class="hv_font14"><a type="open-app" href="javascript:void(0);" open-type="firstlook" class="a2">前往观看</a></p>'
                }
                break;
            case "transcode":
                i = '<p class="hv_font16">很抱歉，您想看的视频正在转码中，请稍后再试。</p>';
                break;
            case "offline":
                i = ['<p class="hv_font16">很抱歉，您想看的视频已下线</p>', '<p class="hv_font14">去<a type="back-home" href="javascript:void(0);" class="hv_blu">首页看看其他内容。</a></p>'].join("");
                break;
            case n.TimerServerTimeOut:
            case n.AuthTimeOut:
            case n.GslbTimeOut:
                i = ['<p class="hv_font16">很抱歉，运营商网络服务故障</p>', '<p class="hv_font14">请<a type="refresh" href="javascript:void(0);" class="hv_blu">刷新重试。</a></p>'].join("");
                break;
            case "err":
            case n.AuthDataEmpty:
            case n.LiveValidateTimeOut:
                i = ['<p class="hv_font16">很抱歉，该视频无法播放</p>', '<p class="hv_font14">请<a type="refresh" href="javascript:void(0);" class="hv_blu">刷新重试</a>，或者换个浏览器试试。</p>'].join("");
                break;
            case "ticket":
                i = ['<p class="hv_font16">继续欣赏请使用观影券。</p>', '<p class="hv_font14">您有观影券：<span class="hv_blu">' + t.ticketNum + "</span> 张</p>", '<p class="hv_font14">免费观看需消耗<span class="hv_blu">' + t.costNum + "</span> 张</p>", '<p class="hv_font14"><span class="hv_ico_sub" type="costTicket">确认使用</span></p>'].join("");
                break;
            case "needTicket":
                i = '<p class="hv_font16">您本月的观影券已用完，请使用电脑登录乐视网购买本影片。会员享受半价优惠</p>';
                break;
            case n.NotSupport1080P:
                i = '<p class="hv_font16">本平台不支持1080P码流视频播放<br/>还请谅解！</p>';
                break;
            case "authBan":
                i = ['<p class="hv_font16">当前视频需要使用<br>乐视视频APP观看，高清更流畅。<br/><br/></p>', '<p class="hv_font16">', '<a type="download" style="border-radius:5px;width:120px;margin:0 auto;display:block;line-height: 30px;padding:0 2px;border:1px solid #0f93de; color:#0f93de;" href="javascript:void(0);">立即观看</a>', "</p>"].join("");
                break;
            case "loginMembre":
                this.nodes.popTip.addClass("hv_kt_vip");
                i = ['<p class="hv_font12">试看已结束，继续观看请开通会员</p>', '<p class="hv_btn20"><a href="javascript:void(0);" type="zhifu" k-name="send-sum-stat" data-sum-stat="sumtmp;MZPVIP" class="a1">立即开通会员</a><a href="javascript:void(0);" type="login" class="a2">会员请登录</a></p>', '<p><img src="http://i1.letvimg.com/img/201406/30/1553/tips.png" alt=""></p>'].join("");
                break;
            case "openMembre":
                this.nodes.popTip.addClass("hv_kt_vip");
                i = ['<p class="hv_font12">试看已结束，继续观看请开通会员</p>', '<p class="hv_font16">开通会员每月增20张观影券</p>', '<p class="hv_btn20"><a href="javascript:void(0);" type="zhifu" class="a1">立即开通会员</a></p>'].join("");
                break;
            case "useTicket":
                this.nodes.popTip.addClass("hv_sk_vip");
                i = ['<p class="hv_font12">试看已结束</p>', '<p class="hv_font16"><a href="javascript:void(0);" type="costTicket" class="a1">使用观影券</a>继续观看，您还有<i>', t.ticketsize, "张</i></p>", '<p class="hv_font14">48小时内可重复观看当前影片</p>'].join("");
                break;
            case "appGuideEnd":
                this.nodes.popTip.addClass("hv_sk_vip hv_three");
                i = ['<p class="hv_font12">', this.model.option.cutoffTime, '分钟试看已结束，<br>安装乐视视频移动客户端观看完整版</p><p class="hv_btn20"><a href="javascript:void(0);" type="open-app" open-type="app-guide" title="" class="a1">观看完整版</a></p>'].join("");
                break;
            case "liveAuthBan":
                this.nodes.popTip.addClass("hv_sk_vip hv_three");
                i = ['<p class="hv_font12">直播已经开始了，<br>请前往乐视视频移动客户端观看！</p><p class="hv_btn20"><a href="javascript:void(0);" type="open-app" open-type="live" title="" class="a1">前往观看</a></p>'].join("");
                break
            }
            if (i) {
                this.nodes.popTip[0].innerHTML = i;
                this.nodes.popTip[0].style.display = "block";
                this.nodes.shadow[0].style.display = "block";
                this.evt.trigger("Player_Callback", "SHOW_MESSAGE", {
                    type: e
                })
            }
        },
        hide: function() {
            this.nodes.bigPlay[0].style.display = "block";
            this.nodes.popTip[0].style.display = "none";
            this.nodes.shadow[0].style.display = "none"
        }
    });
    i.exports = o
});
define("view.tip",
function(e, t, i) {
    var a = e("./component"),
    s = e("extend.lib");
    var n = a.extend({
        init: function() {
            this.nodes = {
                container: this.parentEl.find(".js-tip"),
                msg: this.parentEl.find(".js-tip-msg"),
                closeBtn: this.parentEl.find(".hv_tip_close")
            };
            this.addEvent();
            this.autoTime
        },
        addEvent: function() {
            this.nodes.closeBtn.on("click", this.hide, this);
            this.evt.on("showTip",
            function(e) {
                this.show(e.args[0])
            },
            this)
        },
        show: function(e) {
            var t = "";
            var i = false;
            switch (e) {
            case "slow1":
                t = "很抱歉，您使用的网络运营商服务暂不稳定。请选择更低的清晰度观看。";
                break;
            case "slow2":
                t = "很抱歉，您使用的网络运营商服务暂不稳定。您可暂停视频，多缓冲一会儿。";
                break;
            case "changeDefi":
                t = "正在为您切换清晰度...";
                i = true;
                break;
            case "trylook":
                t = "会员影片可试看6分钟";
                i = true;
                break;
            case "tryLookEnd":
                t = "试看已结束，继续欣赏请开通VIP会员，免费观看";
                i = true;
                break;
            case "appGuide":
                t = "影片可试看" + this.model.option.cutoffTime + "分钟";
                i = true;
                break
            }
            this.nodes.msg[0].innerHTML = t;
            this.nodes.container[0].style.display = "";
            if (i) {
                clearTimeout(this.autoTime);
                this.autoTime = setTimeout(s.bind(this.hide, this), 5e3)
            }
        },
        hide: function() {
            this.nodes.container[0].style.display = "none"
        }
    });
    i.exports = n
});
define("view.widget.progressBar",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("view.controlBar"),
    n = e("extend.detect"),
    o = e("extend.touchable");
    var r = s.extend({
        init: function() {
            this.nodes = {
                progressBar: this.parentEl.find(".progress_bar"),
                sliderBtn: this.parentEl.find(".hv_ico_playing"),
                currentBar: this.parentEl.find(".porgress_playback"),
                bufferBar: this.parentEl.find(".progress_download"),
                totalTimeTip: this.parentEl.find(".time_total"),
                currentTimeTip: this.parentEl.find(".time_cur"),
                barBg: this.parentEl.find(".hv_scroll_cnt")
            };
            this.onResize();
            this.hideTotalTimeTipPercent = 0;
            this.totalTimeTipWidth = 0;
            this.isTotalTimeTipHide = false;
            this.currentTimeTipPosition = "right";
            this.seekTime = 0;
            this.duration = 0;
            this.isDrag = false;
            this.evt.on("setDuration", this.onSetDuration, this);
            this.evt.on("TO_Resize", this.onResize, this);
            this.silderTouchable = new o(this.nodes.sliderBtn[0]);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            this.silderTouchable.on("touchstart", this.onSliderTouchStart, this);
            this.silderTouchable.on("touchmove", this.onSliderTouchMove, this);
            this.silderTouchable.on("touchend", this.onSliderTouchEnd, this);
            this.evt.on("timeupdate", this.onTimeUpdate, this);
            this.evt.on("updateSeekTime", this.onUpdateSeekTime, this);
            this.evt.on("TO_Stop", this.onStop, this);
            this.evt.on("refreshPlayer", this.onChangeVideo, this);
            if (vjs.isPC) {
                this.nodes.barBg.on("click", this.onPrograssBarClick, this);
                vjs(document).on("keydown", this.onKeyDown, this);
                vjs(document).on("keyup", this.onKeyUp, this)
            }
        },
        removeEvent: function() {
            this.silderTouchable.off("touchstart", this.onSliderTouchStart, this);
            this.silderTouchable.off("touchmove", this.onSliderTouchMove, this);
            this.silderTouchable.off("touchend", this.onSliderTouchEnd, this);
            this.evt.off("timeupdate", this.onTimeUpdate, this);
            this.evt.off("updateSeekTime", this.onUpdateSeekTime, this);
            this.evt.off("TO_Stop", this.onStop, this);
            this.evt.off("refreshPlayer", this.onChangeVideo, this)
        },
        onResize: function() {
            this.sliderBtnWidth = this.nodes.sliderBtn.width();
            this.progressBarWidth = this.nodes.progressBar.width();
            this.progressBarOffset = this.nodes.progressBar.offset().left;
            this.maxProgressPercent = (this.progressBarWidth - this.sliderBtnWidth) / this.progressBarWidth;
            this.hideTotalTimeTipPercent = (this.progressBarWidth - (this.totalTimeTipWidth || 0) - this.sliderBtnWidth) / this.progressBarWidth;
            this.toggleTotalTimeTip();
            this.switchCurrentTimePosition()
        },
        onSetDuration: function(e) {
            this.duration = e.args[0] || 0;
            this.nodes.totalTimeTip[0].innerHTML = a.formatTime(this.duration);
            this.nodes.totalTimeTip[0].style.display = "";
            this.isTotalTimeTipHide = false;
            this.totalTimeTipWidth = this.nodes.totalTimeTip.width();
            this.hideTotalTimeTipPercent = (this.progressBarWidth - this.totalTimeTipWidth - this.sliderBtnWidth) / this.progressBarWidth;
            this.toggleTotalTimeTip()
        },
        onSliderTouchStart: function(e) {
            var t = e.args[1];
            t.preventDefault();
            this.seekTime = 0;
            this.diffX = e.args[0].startTouch.x - this.nodes.sliderBtn.offset().left;
            this.evt.trigger("TO_Pause");
            document.body.focus();
            document.onselectstart = function() {
                return false
            }
        },
        onSliderTouchMove: function(e) {
            this.state.isDrag = true;
            var t = e.args[0].currentTouch.x - this.progressBarOffset - this.diffX;
            var i = t / this.progressBarWidth;
            this.setProgress(i, "percent")
        },
        onSliderTouchEnd: function() {
            this.state.isDrag = false;
            var e = parseFloat(this.nodes.sliderBtn.getStyle("left")) / 100 * this.duration;
            if (this.checkTryLook(e)) return;
            this.evt.trigger("TO_Seek", e);
            if (this.state.videoState == "ended") {
                this.evt.trigger("TO_Play", e)
            }
            this.evt.trigger("TO_Play");
            document.onselectstart = null
        },
        onChangeVideo: function() {
            this.setProgress(0)
        },
        onPrograssBarClick: function(e) {
            var t = (e.clientX - this.progressBarOffset - this.sliderBtnWidth / 2) / this.progressBarWidth;
            this.setProgress(t, "percent");
            var i = parseFloat(this.nodes.sliderBtn.getStyle("left")) / 100 * this.duration;
            this.evt.trigger("TO_Seek", i)
        },
        onKeyDown: function(e) {
            if (e.keyCode !== 37 && e.keyCode !== 39) return;
            var t = this,
            i = parseFloat(this.nodes.sliderBtn.getStyle("left")) / 100 * this.duration;
            if (i < 15) i = 15;
            if (i > this.duration - 15) i = this.duration - 15;
            var a = e.keyCode == 37 ? i - 15 : i + 15;
            this.state.isDrag = true;
            this.setProgress(a / this.duration, "percent");
            this.seekId && clearTimeout(this.seekId);
            this.seekId = setTimeout(function() {
                t.evt.trigger("TO_Seek", a)
            },
            100)
        },
        onKeyUp: function(e) {
            if (e.keyCode !== 37 && e.keyCode !== 39) return;
            var t = this;
            this.evt.on("seeked",
            function() {
                t.state.isDrag = false
            })
        },
        onTimeUpdate: function() {
            if (this.state.isDrag || this.state.isSeeking) return;
            this.setProgress()
        },
        onUpdateSeekTime: function(e) {
            this.setProgress(e.args[0])
        },
        onStop: function() {
            this.nodes.totalTimeTip[0].style.display = "none";
            this.nodes.bufferBar.setStyle("width", 0);
            this.setProgress(0)
        },
        toggleTotalTimeTip: function(e) {
            e = e || parseFloat(this.nodes.sliderBtn[0].style.left) / 100;
            if (e >= this.hideTotalTimeTipPercent) {
                if (!this.isTotalTimeTipHide) {
                    this.nodes.totalTimeTip[0].style.display = "none";
                    this.isTotalTimeTipHide = true
                }
            } else {
                if (this.isTotalTimeTipHide) {
                    this.nodes.totalTimeTip[0].style.display = "";
                    this.isTotalTimeTipHide = false
                }
            }
        },
        switchCurrentTimePosition: function(e) {
            e = typeof e != "undefined" ? e: parseFloat(this.nodes.sliderBtn[0].style.left) / 100;
            if (e * this.progressBarWidth > 45) {
                if (this.currentTimeTipPosition != "left") {
                    this.nodes.currentTimeTip.setStyle("marginLeft", "-45px");
                    this.currentTimeTipPosition = "left"
                }
            } else {
                if (this.currentTimeTipPosition != "right") {
                    this.nodes.currentTimeTip.setStyle("marginLeft", "32px");
                    this.currentTimeTipPosition = "right"
                }
            }
        },
        setProgress: function(e, t) {
            var i, s;
            if (t == "percent") {
                i = e
            } else {
                s = parseInt(typeof e != "undefined" ? e: this.core.getCurrentTime());
                if (s == this.currentTime) return;
                this.currentTime = s;
                i = s / this.duration
            }
            i = Math.max(0, i);
            i = Math.min(i, this.maxProgressPercent);
            s = s || i * this.duration;
            this.nodes.currentTimeTip[0].innerHTML = a.formatTime(s);
            this.nodes.currentTimeTip[0].currentTime = s;
            this.toggleTotalTimeTip(i);
            this.switchCurrentTimePosition(i);
            i = i * 100 + "%";
            this.nodes.sliderBtn[0].style.left = i;
            this.nodes.currentBar[0].style.width = i;
            this.nodes.currentTimeTip[0].style.left = i;
            if (typeof e == "undefined") {
                var n = this.core.getBuffered();
                var o;
                for (var r = 0,
                d = n.length; r < d; r++) {
                    if (n[r].end - s >= 0) {
                        o = n[r].end / this.duration * 100 + "%";
                        break
                    }
                }
                o = o && o > i ? o: i;
                this.nodes.bufferBar.setStyle("width", o)
            }
        }
    });
    i.exports = r
});
define("view.widget.playBtn",
function(e, t, i) {
    var a = e("view.controlBar");
    var s = a.extend({
        init: function() {
            this.nodes = {
                playBtn: this.parentEl.find(".hv_start span")
            };
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            if (vjs.isPC) {
                this.nodes.playBtn.on("click", this.onBtnPlay, this)
            } else {
                this.nodes.playBtn.on("touchend", this.onBtnPlay, this)
            }
            this.evt.on("play", this.onPlay, this);
            this.evt.on("pause", this.onPause, this);
            this.evt.on("ended", this.onEnded, this)
        },
        removeEvent: function() {
            if (vjs.isPC) {
                this.nodes.playBtn.off("click", this.onBtnPlay, this)
            } else {
                this.nodes.playBtn.off("touchend", this.onBtnPlay, this)
            }
            this.evt.off("play", this.onPlay, this);
            this.evt.off("pause", this.onPause, this);
            this.evt.off("ended", this.onEnded, this)
        },
        onBtnPlay: function() {
            switch (this.nodes.playBtn[0].className) {
            case "hv_ico_star":
                this.evt.trigger("TO_Pause");
                this.state.isUserPause = true;
                break;
            case "hv_ico_stop":
                this.evt.trigger("TO_Play");
                this.state.isUserPause = false;
                break;
            case "hv_ico_refresh":
                this.evt.trigger("TO_Refresh");
                this.state.isUserPause = false;
                break
            }
        },
        onPlay: function() {
            this.nodes.playBtn[0].className = "hv_ico_star";
            this.state.isUserPause = false
        },
        onPause: function() {
            this.nodes.playBtn[0].className = "hv_ico_stop"
        },
        onEnded: function() {
            this.nodes.playBtn[0].className = "hv_ico_refresh";
            this.state.isUserPause = false
        }
    });
    i.exports = s
});
define("view.widget.fullBtn",
function(e, t, i) {
    var a = e("view.controlBar"),
    s = e("extend.lib"),
    n = e("extend.detect");
    var o = a.extend({
        status: 1,
        autoTime: null,
        init: function() {
            this.nodes = {
                fullBtn: this.parentEl.find(".hv_ico_screen"),
                pannel: this.parentEl.find(".js-pannel")
            };
            this.nodes.fullBtn.on("click", this.onFullBtnClick, this);
            this.evt.on("changeFullscreen", this.onChangeFullscreen, this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            if (this.model.option.pname != "MPlayer") {
                this.nodes.pannel.on("gesturestart", this.preventDefault, this);
                this.nodes.pannel.on("gestureend", this.onGetsure, this)
            }
        },
        removeEvent: function() {
            if (this.model.option.pname != "MPlayer") {
                this.nodes.pannel.off("gesturestart", this.preventDefault, this);
                this.nodes.pannel.off("gestureend", this.onGetsure, this)
            }
        },
        onFullBtnClick: function(e) {
            if (vjs.isPC || this.model.option.pname == "lepai" && n.iPad) {
                if (this.status == 2) {
                    this.status = 1;
                    this.evt.trigger("changeVideoFullScreen", false)
                } else if (this.status == 1) {
                    this.status = 2;
                    this.evt.trigger("changeVideoFullScreen", true)
                }
                return
            }
            var t = typeof e != "undefined" && !(e instanceof Event);
            if (t ? e == 1 : this.status == 1) {
                this.status = 2;
                this.nodes.fullBtn.addClass("hv_ico_allscreen");
                this.parentEl.addClass("hv_fullscreen");
                var i = this.parentEl[0].parentNode;
                while (i.tagName.toLowerCase() != "body") {
                    var a = i.style.position;
                    if (a && a != "static") {
                        i.defaultPosition = a;
                        i.style.position = "static"
                    } else {
                        var s = document.defaultView.getComputedStyle(i);
                        if (s.position != "static") {
                            i.style.position = "static"
                        }
                    }
                    i = i.parentNode
                }
                this.onWindowResize();
                window.addEventListener("resize", this.onWindowResize, false);
                document.addEventListener("touchstart", this.preventDefault, false)
            } else if (t ? e == 0 : this.status == 2) {
                this.status = 1;
                this.nodes.fullBtn.removeClass("hv_ico_allscreen");
                this.parentEl.removeClass("hv_fullscreen");
                var i = this.parentEl[0].parentNode;
                while (i.tagName.toLowerCase() != "body") {
                    i.style.position = i.defaultPosition || "";
                    i = i.parentNode
                }
                this.parentEl[0].style.height = "";
                window.removeEventListener("resize", this.onWindowResize, false);
                document.removeEventListener("touchstart", this.preventDefault, false)
            }
            setTimeout(function() {
                if (document.body.scrollTop != 0) {
                    window.scrollTo(0, 0);
                    setTimeout(arguments.callee, 300)
                }
            },
            0);
            this.evt.trigger("TO_Resize")
        },
        onGetsure: function(e) {
            e.preventDefault();
            if (e.scale > 1) {
                if (this.status == 1) {
                    this.onFullBtnClick()
                } else if (this.status == 2) {
                    this.evt.trigger("changeVideoFullScreen", true)
                }
            } else {
                if (this.status == 2) {
                    this.onFullBtnClick()
                }
            }
        },
        onWindowResize: function() {
            var e = 0;
            var t;
            setTimeout(function() {
                var i = window.innerHeight;
                if (t != ++i) {
                    t = i;
                    e = 0;
                    vjs(".hv_box").height(i);
                    setTimeout(arguments.callee, 300)
                } else {
                    if (++e < 2) {
                        setTimeout(arguments.callee, 300)
                    }
                }
            },
            300)
        },
        onChangeFullscreen: function(e) {
            var t = e.args[0];
            if (t) {
                this.onFullBtnClick(1)
            } else {
                this.evt.trigger("changeVideoFullScreen", false);
                this.onFullBtnClick(0)
            }
        },
        preventDefault: function(e) {
            if (!vjs(e.target).hasClass("hv_ico_screen")) {
                e.preventDefault()
            }
        }
    });
    i.exports = o
});
define("view.widget.defiBtn",
function(e, t, i) {
    var a = e("view.controlBar"),
    s = e("extend.detect"),
    n = e("extend.lib");
    var o = a.extend({
        init: function() {
            this.nodes = {
                optDefi: this.parentEl.find(".clear_ul"),
                btnDefi: this.parentEl.find(".hv_ico_clarity"),
                appPlay: this.parentEl.find(".hv_app_play")
            };
            this.defiEnum = {
                1 : "流畅",
                2 : "高清",
                3 : "超清",
                4 : "720P",
                5 : "1080P",
                6 : "原画",
                7 : "极速"
            };
            this.defiEnumOrder = [7, 1, 2, 3, 4, 5, 6];
            this.evt.on("movieSucc", this.onMovieSucc, this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            this.evt.on("onVideoRateChanged", this.onVideoRateChanged, this);
            if (vjs.isPC) {
                this.nodes.btnDefi.on("click", this.onBtnDefi, this);
                this.nodes.optDefi.on("click", this.onOptDefi, this)
            } else {
                this.nodes.btnDefi.on("touchend", this.onBtnDefi, this);
                this.nodes.optDefi.on("touchend", this.onOptDefi, this)
            }
        },
        removeEvent: function() {
            this.evt.off("onVideoRateChanged", this.onVideoRateChanged, this);
            if (vjs.isPC) {
                this.nodes.btnDefi.off("click", this.onBtnDefi, this);
                this.nodes.optDefi.off("click", this.onOptDefi, this)
            } else {
                this.nodes.btnDefi.off("touchend", this.onBtnDefi, this);
                this.nodes.optDefi.off("touchend", this.onOptDefi, this)
            }
        },
        onMovieSucc: function(e) {
            var t = this.movieVO = e.args[0];
            if (t) {
                this.initDefi()
            }
        },
        onOptDefi: function(e) {
            var t = e.target;
            if (t.tagName.toLowerCase() == "li") {
                var i = vjs(t).getAttr("value");
                n.setCookie("defi", i, {
                    path: "/",
                    domain: "letv.com",
                    expires: new Date(2099, 12, 30, 23, 59, 59)
                });
                this.evt.trigger("showTip", "changeDefi");
                this.evt.trigger("TO_RateChanged", i, true)
            }
            this.nodes.optDefi.removeClass("hover")
        },
        onBtnDefi: function(e) {
            var t = this.nodes.optDefi;
            if (t.hasClass("hover")) {
                t.removeClass("hover");
                if (s.iPad) {
                    this.nodes.appPlay[0].style.display = "block"
                }
            } else {
                t.addClass("hover");
                if (s.iPad) {
                    this.nodes.appPlay[0].style.display = "none"
                }
            }
        },
        onVideoRateChanged: function(e) {
            this.defi = e.args[0];
            var t = this.nodes.optDefi[0];
            for (var i = 0,
            a = t.children.length; i < a; i++) {
                var s = t.children[i];
                if (s.getAttribute("value") == this.defi) {
                    vjs(s).addClass("hover")
                } else {
                    vjs(s).removeClass("hover")
                }
            }
            this.nodes.btnDefi[0].innerHTML = this.defiEnum[parseInt(this.defi)]
        },
        initDefi: function() {
            var e = this.movieVO,
            t = this.nodes.optDefi[0],
            i = this.defiEnumOrder;
            var a = [];
            for (var s = 0,
            n = i.length; s < n; s++) {
                if (e[i[s]]) {
                    a.push('<li value="' + i[s] + '">' + this.defiEnum[parseInt(i[s])] + "</li>")
                }
            }
            t.innerHTML = a.join("")
        }
    });
    i.exports = o
});
define("view.widget.nextVideoBtn",
function(e, t, i) {
    var a = e("view.controlBar"),
    s = e("extend.lib");
    var n = a.extend({
        init: function() {
            this.nodes = {
                nextVideoBtn: this.parentEl.find(".hv_ico_next")
            };
            var e = this.model.vinfo;
            if (!window.nextVideoSrc || e.nextvid <= 0 || e.nextvid == e.vid || this.model.option.pname == "MPlayer") {
                this.nodes.nextVideoBtn.addClass("gray")
            } else {
                this.evt.on("setVideoEnable",
                function(e) {
                    if (e.args[0]) {
                        this.addEvent()
                    } else {
                        this.removeEvent()
                    }
                },
                this)
            }
        },
        addEvent: function() {
            if (vjs.isPC) {
                this.nodes.nextVideoBtn.on("click", this.onNextVideoBtnClick, this)
            } else {
                this.nodes.nextVideoBtn.on("touchend", this.onNextVideoBtnClick, this)
            }
        },
        removeEvent: function() {
            if (vjs.isPC) {
                this.nodes.nextVideoBtn.off("click", this.onNextVideoBtnClick, this)
            } else {
                this.nodes.nextVideoBtn.off("touchend", this.onNextVideoBtnClick, this)
            }
        },
        onNextVideoBtnClick: function() {
            if (!this.nodes.nextVideoBtn.hasClass("gray")) {
                this.evt.trigger("TO_PlayNext")
            }
        }
    });
    i.exports = n
});
define("view.minControlBar",
function(e, t, i) {
    var a = e("./component");
    var s = a.extend({
        init: function() {
            this.initChildren()
        }
    });
    s.prototype.option = {
        children: {
            playBtn: "view.widget.playBtn",
            fullBtn: "view.widget.fullBtn",
            porgressbar: "view.widget.progressBar"
        }
    };
    i.exports = s
});
define("view.minPlayingPannel",
function(e, t, i) {
    var a = e("./component"),
    s = e("extend.lib"),
    n = e("extend.detect");
    var o = a.extend({
        init: function() {
            this.nodes = {
                pannel: this.parentEl.find(".js-pannel"),
                poster: this.parentEl.find(".hv_play_poster"),
                loading: this.parentEl.find(".hv_ico_loading"),
                bigPlayBtn: this.parentEl.find(".hv_ico_pasued"),
                playBtn: this.parentEl.find(".hv_start span"),
                shadow: this.parentEl.find(".js-bg"),
                controlBar: this.parentEl.find(".hv_botbar")
            };
            this.autoHideTime = null;
            this.isMove = false;
            this.evt.on("videoReady", this.onVideoSucc, this);
            this.evt.on("tryLookEnd appGuideEnd", this.onTrylookEnd, this);
            this.evt.on("PLAY_NEW_ID", this.onPlayNewId, this);
            this.evt.on("playing", this.onFirstPlay, this);
            this.evt.on("play", this.onPlay, this);
            this.evt.on("refreshPlayer",
            function() {
                this.evt.off("playing", this.onFirstPlay, this);
                this.evt.on("playing", this.onFirstPlay, this)
            },
            this);
            this.nodes.bigPlayBtn.on("click", this.toPlay, this);
            this.nodes.bigPlayBtn.on("touchstart", this.stopPropagation, this);
            this.evt.on("timeupdate pause", this.hide, this);
            this.evt.on("seeking waiting error stalled", this.show, this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            if (vjs.isPC) {
                this.nodes.pannel.on("click", this.switchPlayStatus, this);
                this.nodes.pannel.on("mousemove", this.showPannel, this);
                this.nodes.shadow.on("click", this.stopPropagation)
            } else {
                this.nodes.pannel.on("touchend", this.togglePannel, this);
                this.nodes.shadow.on("touchend", this.stopPropagation);
                this.nodes.controlBar.on("touchend", this.showPannel, this)
            }
            this.evt.on("ended", this.onEnded, this);
            this.evt.on("showTip", this.showPannel, this);
            this.evt.on("showMessage", this.disable, this)
        },
        removeEvent: function() {
            if (vjs.isPC) {
                this.nodes.pannel.off("click", this.switchPlayStatus, this);
                this.nodes.pannel.off("mousemove", this.showPannel, this);
                this.nodes.shadow.off("click", this.stopPropagation)
            } else {
                this.nodes.pannel.off("touchend", this.togglePannel, this);
                this.nodes.shadow.off("touchend", this.stopPropagation);
                this.nodes.controlBar.off("touchend", this.showPannel, this)
            }
            this.evt.off("ended", this.onEnded, this);
            this.evt.off("showTip", this.showPannel, this);
            this.evt.off("showMessage", this.disable, this)
        },
        onVideoSucc: function() {
            if (!n.weixin || n.Android || /iPhone OS 8_/.test(navigator.userAgent)) {
                this.nodes.bigPlayBtn[0].style.display = "block"
            }
            this.nodes.loading[0].style.display = "none";
            this.evt.off("videoReady")
        },
        onPlayNewId: function() {
            clearTimeout(this.autoHideTime);
            this.parentEl.addClass("hv_box_hide")
        },
        toPlay: function() {
            this.nodes.bigPlayBtn[0].style.display = "none";
            this.nodes.poster[0].style.display = "none";
            this.nodes.shadow[0].style.display = "none";
            this.evt.trigger("TO_Play")
        },
        onFirstPlay: function() {
            this.nodes.poster[0].style.display = "none";
            this.nodes.bigPlayBtn[0].style.display = "none";
            this.nodes.shadow[0].style.display = "none";
            if (!this.model.state.isAd) {
                this.parentEl.removeClass("hv_box_hide");
                this.autoHidePannel()
            }
            this.evt.off("play", this.onFirstPlay, this)
        },
        onPlay: function() {
            this.nodes.loading[0].style.display = "block"
        },
        onEnded: function() {
            this.nodes.poster[0].style.display = "block";
            this.nodes.bigPlayBtn[0].style.display = "block";
            this.parentEl.addClass("hv_box_hide");
            this.evt.on("playing", this.onFirstPlay, this)
        },
        show: function(e) {
            if (this.state.videoState != "play") return;
            this.nodes.loading[0].style.display = "block"
        },
        hide: function(e) {
            if (e.type != "pause" && this.state.isSeeking) return;
            this.nodes.loading[0].style.display = "none"
        },
        autoHidePannel: function() {
            clearTimeout(this.autoHideTime);
            this.autoHideTime = setTimeout(s.bind(function() {
                if (!this.state.isDrag) {
                    this.parentEl.addClass("hv_box_hide")
                }
            },
            this), 5e3)
        },
        togglePannel: function(e) {
            if (e && e.target === this.nodes.pannel[0] && !this.isMove) {
                if (this.parentEl.hasClass("hv_box_hide")) {
                    this.parentEl.removeClass("hv_box_hide")
                } else {
                    this.parentEl.addClass("hv_box_hide")
                }
            }
            this.autoHidePannel()
        },
        showPannel: function() {
            this.parentEl.removeClass("hv_box_hide");
            this.autoHidePannel()
        },
        onTrylookEnd: function() {
            this.nodes.loading[0].style.display = "none";
            this.parentEl.addClass("hv_box_hide")
        },
        switchPlayStatus: function(e) {
            if (e.target != this.nodes.pannel[0]) return;
            if (this.nodes.playBtn.hasClass("hv_ico_stop")) {
                this.evt.trigger("TO_Play")
            } else {
                this.evt.trigger("TO_Pause")
            }
        },
        stopPropagation: function(e) {
            e.stopPropagation()
        },
        disable: function() {
            this.removeEvent();
            this.parentEl.addClass("hv_box_hide")
        },
        enable: function() {
            this.addEvent()
        }
    });
    i.exports = o
});
define("view.iphonePlayingPannel",
function(e, t, i) {
    var a = e("./component"),
    s = e("extend.lib"),
    n = e("extend.detect");
    var o = a.extend({
        init: function() {
            this.nodes = {
                bigPlayBtn: this.parentEl.find(".hv_ico_pasued"),
                loading: this.parentEl.find(".hv_ico_loading"),
                shadow: this.parentEl.find(".js-bg")
            };
            this.evt.on("videoReady", this.onVideoSucc, this);
            this.nodes.bigPlayBtn.on("click",
            function() {
                this.evt.trigger("TO_Play")
            },
            this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            if (vjs.isPC) {
                this.nodes.shadow.on("click", this.stopPropagation)
            } else {
                this.nodes.shadow.on("touchend", this.stopPropagation)
            }
            this.evt.on("changeFullscreen", this.onChangeFullscreen, this)
        },
        removeEvent: function() {
            if (vjs.isPC) {
                this.nodes.shadow.off("click", this.stopPropagation)
            } else {
                this.nodes.shadow.off("touchend", this.stopPropagation)
            }
            this.evt.off("changeFullscreen", this.onChangeFullscreen, this)
        },
        onVideoSucc: function() {
            this.nodes.loading[0].style.display = "none";
            this.nodes.bigPlayBtn[0].style.display = "block";
            this.evt.off("videoReady")
        },
        onChangeFullscreen: function(e) {
            this.evt.trigger("changeVideoFullScreen", e.args[0])
        },
        stopPropagation: function(e) {
            e.stopPropagation()
        }
    });
    i.exports = o
});
define("view.liveControlBar",
function(e, t, i) {
    var a = e("./component");
    var s = a.extend({
        init: function() {
            this.initChildren()
        }
    });
    s.prototype.option = {
        children: {
            playBtn: "view.widget.playBtn",
            fullBtn: "view.widget.fullBtn",
            defiBtn: "view.widget.defiBtn",
            porgressbar: "view.widget.liveProgressBar"
        }
    };
    i.exports = s
});
define("view.minLiveControlBar",
function(e, t, i) {
    var a = e("./component");
    var s = a.extend({
        init: function() {
            this.initChildren()
        }
    });
    s.prototype.option = {
        children: {
            playBtn: "view.widget.playBtn",
            fullBtn: "view.widget.fullBtn",
            porgressbar: "view.widget.liveProgressBar"
        }
    };
    i.exports = s
});
define("view.widget.liveProgressBar",
function(e, t, i) {
    var a = e("extend.lib"),
    s = e("view.controlBar");
    var n = s.extend({
        init: function() {
            this.nodes = {
                currentTime: this.parentEl.find(".live_bar span")
            };
            this.currentTime = 0;
            this.autoTime = null;
            this.evt.on("ToSetTime", this.onSetCurrentTime, this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            this.evt.on("play playing", this.startUpdateTime, this);
            this.evt.on("pause ended waiting onVideoRateChanged", this.stopUpdateTime, this)
        },
        removeEvent: function() {
            this.evt.on("play playing", this.startUpdateTime, this);
            this.evt.on("pause ended waiting onVideoRateChanged", this.stopUpdateTime, this)
        },
        onSetCurrentTime: function(e) {
            this.currentTime = e.args[0];
            this.updateTime();
            this.startUpdateTime()
        },
        updateTime: function() {
            var e = new Date(++this.currentTime * 1e3);
            var t = e.getHours(),
            i = e.getMinutes(),
            a = e.getSeconds();
            if (t < 10) t = "0" + t;
            if (i < 10) i = "0" + i;
            if (a < 10) a = "0" + a;
            this.nodes.currentTime[0].innerHTML = t + ":" + i + ":" + a
        },
        startUpdateTime: function() {
            clearInterval(this.autoTime);
            this.autoTime = setInterval(a.bind(this.updateTime, this), 1e3)
        },
        stopUpdateTime: function() {
            clearInterval(this.autoTime)
        }
    });
    i.exports = n
});
define("view.livePlayingPannel",
function(e, t, i) {
    var a = e("./component"),
    s = e("extend.lib"),
    n = e("extend.detect");
    var o = a.extend({
        init: function() {
            this.nodes = {
                pannel: this.parentEl.find(".js-pannel"),
                poster: this.parentEl.find(".hv_play_poster"),
                loading: this.parentEl.find(".hv_ico_loading"),
                bigPlayBtn: this.parentEl.find(".hv_ico_pasued"),
                shadow: this.parentEl.find(".js-bg"),
                optDefi: this.parentEl.find(".clear_ul")
            };
            this.autoHideTime = null;
            this.evt.on("movieSucc", this.onMovieSucc, this);
            this.evt.on("play", this.onPlay, this);
            this.nodes.bigPlayBtn.on("click", this.toPlay, this);
            this.evt.on("refreshPlayer",
            function() {
                this.evt.off("play", this.onPlay, this);
                this.evt.on("play", this.onPlay, this)
            },
            this);
            this.evt.on("setVideoEnable",
            function(e) {
                if (e.args[0]) {
                    this.addEvent()
                } else {
                    this.removeEvent()
                }
            },
            this)
        },
        addEvent: function() {
            if (vjs.isPC) {
                this.parentEl.on("mouseup", this.togglePannel, this);
                this.nodes.shadow.on("click", this.stopPropagation)
            } else {
                this.parentEl.on("touchend", this.togglePannel, this);
                this.nodes.shadow.on("touchend", this.stopPropagation)
            }
            this.evt.on("canplay canplaythrough play playing seeked paused ended", this.hide, this);
            this.evt.on("seeking waiting error", this.show, this);
            this.evt.on("showTip", this.showPannel, this)
        },
        removeEvent: function() {
            if (vjs.isPC) {
                this.parentEl.off("mouseup", this.togglePannel, this);
                this.nodes.shadow.off("click", this.stopPropagation)
            } else {
                this.parentEl.off("touchend", this.togglePannel, this);
                this.nodes.shadow.off("touchend", this.stopPropagation)
            }
            this.evt.off("canplay canplaythrough play playing seeked paused ended", this.hide, this);
            this.evt.off("seeking waiting error", this.show, this);
            this.evt.off("showTip", this.showPannel, this)
        },
        onMovieSucc: function() {
            this.nodes.bigPlayBtn[0].style.display = "block"
        },
        toPlay: function() {
            this.nodes.bigPlayBtn[0].style.display = "none";
            this.nodes.shadow[0].style.display = "none";
            this.evt.trigger("TO_Play")
        },
        onPlay: function() {
            this.nodes.poster[0].style.display = "none";
            this.nodes.bigPlayBtn[0].style.display = "none";
            this.nodes.shadow[0].style.display = "none";
            if (!this.model.state.isAd) {
                this.parentEl.removeClass("hv_box_hide");
                this.autoHidePannel()
            }
            this.autoHidePannel();
            this.evt.off("play", this.onPlay, this)
        },
        show: function() {
            this.nodes.loading[0].style.display = "block"
        },
        hide: function() {
            this.nodes.loading[0].style.display = "none"
        },
        autoHidePannel: function() {
            clearTimeout(this.autoHideTime);
            this.autoHideTime = setTimeout(s.bind(function() {
                if (!this.state.isDrag) {
                    this.parentEl.addClass("hv_box_hide");
                    this.nodes.optDefi.removeClass("hover")
                }
            },
            this), 5e3)
        },
        togglePannel: function(e) {
            if (e && e.target === this.nodes.pannel[0]) {
                if (this.parentEl.hasClass("hv_box_hide")) {
                    this.parentEl.removeClass("hv_box_hide")
                } else {
                    this.parentEl.addClass("hv_box_hide");
                    this.nodes.optDefi.removeClass("hover")
                }
            }
            this.autoHidePannel()
        },
        showPannel: function() {
            this.parentEl.removeClass("hv_box_hide");
            this.autoHidePannel()
        },
        stopPropagation: function(e) {
            e.stopPropagation()
        }
    });
    i.exports = o
});
define("player",
function(e, t, i) {
    if (typeof LETV !== "undefined" && typeof LETV.using == "function") {
        window.Config = LETV.using.call(window, "__INFO__.video")
    } else {
        window.Config = {}
    }
    var a = window.LELib = function() {};
    var s = a.Revive = {};
    var n = a.FlashVars;
    var o = e("extend.detect"),
    r = e("extend.lib"),
    d = e("core.vjs");
    var l = /(?:\?|\&)(q2(?:=\w*)?)/.exec(window.location.href);
    if (l && l[1]) {
        r.setCookie("tj_tg", l[1])
    }
    var c, h = {},
    p = o.Android || o.iPad || o.iPod || o.iPhone || o.mac && o.safari || o.wph || o.ps;
    s.Player = function(t, i, a, n, o, r) {
        r = r || {};
        var l = function(a) {
            var l = f(t, n);
            var u = {
                cont: t,
                width: i.w,
                height: i.h,
                flashvar: l,
                extInfo: r
            };
            if (p || typeof r != "undefined" && r.forceH5) {
                if (Config.trylook != 10 || a) {
                    var v = e("module.h5player");
                    c = h[t] = new v(u)
                }
            } else {
                i.wmode = "direct";
                if (typeof $ !== "undefined" && $.browser && $.browser.safari && !$.browser.chrome) {
                    i.wmode = "opaque"
                }
                if (i.newwmode) i.wmode = i.newwmode;
                try {
                    if (i.w >= 970) {
                        d(".js_play_con")[0].style.height = "590px";
                        d(".video-play")[0].style.height = "546px";
                        i.h += 66
                    } else {
                        d(".js_play_con")[0].style.height = "";
                        d(".video-play")[0].style.height = ""
                    }
                } catch(g) {}
                c = h[t] = s.flashPlayer(t, i, l, o instanceof Array ? o[3] : o, [10, 0, 0])
            }
        };
        var u = function(e) {
            if (e) {
                i.w = e.width || i.w;
                i.h = e.height || i.h
            }
            l(true)
        };
        l(false);
        return {
            player: c,
            reload: u
        }
    };
    s.LivePlayer = function(t, i, a, n, o, r) {
        r = r || {};
        var d = function() {
            n = f(t, n);
            var d = {
                cont: t,
                width: i.w,
                height: i.h,
                urlList: a,
                flashvar: n,
                extInfo: r
            };
            if (p || r.forceH5) {
                var l = e("module.h5player");
                c = h[t] = new l(d)
            } else {
                i.wmode = "direct";
                if ($.browser.safari && !$.browser.chrome) {
                    i.wmode = "opaque"
                }
                if (i.newwmode) i.wmode = i.newwmode;
                c = h[t] = s.flashPlayer(t, i, n, o instanceof Array ? o[3] : o, [10, 2, 0])
            }
        };
        var l = function(e) {
            if (e) {
                i.w = e.width || i.w;
                i.h = e.height || i.h
            }
            d()
        };
        d();
        return {
            player: c,
            reload: l
        }
    };
    window.__PLAYER__ = {
        playMovie: function(e) {
            e = typeof e == "object" ? e: {
                vid: e
            };
            d.each(h,
            function(t, i) {
                if (typeof i.pause === "function") {
                    i.playMovie(e)
                } else {
                    try {
                        var a = document.getElementsByName("www_player")[0];
                        a.playNewId(e.vid)
                    } catch(s) {}
                }
            })
        },
        pause: function() {
            d.each(h,
            function(e, t) {
                if (typeof t.pause === "function") {
                    t.pause()
                } else {
                    try {
                        var i = document.getElementsByName("www_player")[0];
                        i.pauseVideo()
                    } catch(a) {}
                }
            })
        },
        play: function() {
            d.each(h,
            function(e, t) {
                if (typeof t.play === "function") {
                    t.play()
                } else {
                    try {
                        var i = document.getElementsByName("www_player")[0];
                        i.resumeVideo()
                    } catch(a) {}
                }
            })
        },
        seek: function(e) {
            d.each(h,
            function(t, i) {
                if (typeof i.play === "function") {
                    i.seek(e)
                } else {
                    try {
                        var a = document.getElementsByName("www_player")[0];
                        a.seekTo(e)
                    } catch(s) {}
                }
            })
        }
    };
    s.Video = function(e, t, i) {
        this.video;
        this.videoBox = e;
        this.urlList = i.v || ["undefind"];
        this.initpic = i.p || "";
        this.timer = null;
        this.duration = 0;
        this.option = t || {
            w: 540,
            h: 450
        };
        this.config = {
            height: this.option.h,
            width: this.option.w,
            controls: "controls",
            preload: "preload",
            poster: this.initpic,
            autoplay: ""
        };
        this.getcurrent = function() {
            var e = this.video.currentTime;
            return e
        };
        this.initVideo = function() {
            var e = this;
            var t = LETV.Base64.decode(this.urlList[0]);
            var i = 0;
            var a = function(t) {
                $("#" + e.videoBox).html("<div style='background:#111;color:#fff;line-height:" + e.option.h + "px;height:" + e.option.h + "px'>" + t + "</div>")
            };
            if (this.urlList[0] == "(none)" || this.urlList[0] == "undefind" || this.urlList[0] == "") {
                a("您观看的视频不支持此设备播放!");
                return false
            }
            var s = function() {
                i++;
                var n = $("<video>").attr(e.config).css({
                    background: "#000"
                });
                $("#" + e.videoBox).html(n);
                var o = n.get(0);
                o.src = t + "&_rand=" + Math.random();
                o.onerror = function() {
                    if (i > 9) {
                        a("视频加载失败，请重试。");
                        return
                    }
                    s()
                };
                o.load();
                e.video = o
            };
            s()
        };
        this.initVideo()
    };
    s.SimplePlayer = function(e, t, i, a) {
        var s = this;
        this.videoBox = e;
        this.urlList = i.v || ["undefind"];
        this.initpic = i.p || "";
        this.option = t || {
            w: 540,
            h: 450
        };
        this.config = {
            height: this.option.h,
            width: this.option.w
        };
        this.initVideo = function() {
            var e = $("#" + this.videoBox);
            var i = parseInt(this.config.width) / 2 - 100;
            var n = this.urlList[0];
            var o;
            var r = "";
            if (t.autoplay == 1) {
                r = 'autoplay="autoplay" '
            }
            var d = "";
            if (t.poster) {
                d = 'poster="' + t.poster + '" '
            }
            if (n) {
                var l = [];
                var c = $('<div style="position:relative; width:' + this.config.width + "px; height=" + this.config.height + 'px;"><a id="html5_play_button_' + this.videoBox + '" href="javascript:$(\'#videoHTML5_' + this.videoBox + "')[0].play();\" style=\"width:100px; height:100px; display:block; background:url('http://i1.letvimg.com/img/201304/08/html5_play_button.png') no-repeat 0 0; position:absolute; top:" + (this.config.height / 2 - 50) + "px; left:" + (this.config.width / 2 - 50) + 'px; text-indent:-3000px; z-index:100;">播放</a><video id="videoHTML5_' + this.videoBox + '" type="video/mp4" width="' + this.config.width + 'px" height="' + this.config.height + 'px" controls="controls" ' + r + d + ' style="background-color:#000;"></video></div>');
                c.appendTo(e);
                var h = $("#videoHTML5_" + this.videoBox),
                p = $("#html5_play_button_" + this.videoBox);
                h.on({
                    play: function() {
                        try {
                            h.removeAttr("poster");
                            window[t.callback].PLAYER_VIDEO_PLAY()
                        } catch(e) {}
                        p.css("display", "none");
                        if (!o) {
                            o = true;
                            var i = new Image;
                            i.onload = function() {
                                i = null
                            };
                            var s = LETV.using("App.Stat.html5VV").getData();
                            a = a ? a: {};
                            for (var n in a) {
                                s[n] = a[a]
                            }
                            i.src = "http://dc.letv.com/mhtml5/p?" + s.statver + "&" + s.cid + "&" + s.vinfo + "&" + s.playurl + "&" + s.rate + "&" + s.vlen + "&" + s.os + "&" + s.terminal + "&" + s.ref + "&" + s.ptype
                        }
                    },
                    pause: function() {
                        try {
                            window[t.callback].PLAYER_VIDEO_PAUSE()
                        } catch(e) {}
                        p.css("display", "block")
                    }
                }).attr("src", n);
                try {
                    h.play()
                } catch(f) {}
                s.call = function(e) {
                    try {
                        h[0][e]()
                    } catch(t) {
                        console.log(t)
                    }
                }
            }
        };
        this.initVideo();
        return this
    };
    s.chainBroadcast = function(e) {
        var t = $("#j_jujiarea_down");
        var i = t.find("a[data-vid=" + e.vid + "]");
        var a = $(i).attr("data-key");
        window.location.hash = a;
        LETV.Plugin.JuList()
    };
    s.mainChainBroadcast = function(e) {
        if (e.index > 0) {
            var t = window.__INFO__.playlist;
            t.curno = e.index;
            $(".crumbs-info").find("h1").html(e.title);
            $(document).attr("title", e.title + " - 在线观看 - 乐视网");
            var i = window.__INFO__.video.cid;
            if (i != 2 && i != 5) {
                $(".crumbs-info").find("font").html(e.title)
            }
            LETV.App.Play.PlayList($.extend({
                cont: ".J-List"
            },
            t))
        }
    };
    s.getNextKey = function(e) {
        if (e < window.__INFO__.playlist.total) {
            return parseInt(e) + 1
        } else {
            return - 1
        }
    };
    function f(t, i) {
        var a = /[?#&]*callbackJs=([\w+\.]+)/i.exec(i);
        var s = "callback_" + String(Math.random()).slice( - 6),
        n,
        o;
        if (typeof window.interfaces == "undefined") window.interfaces = [];
        var r = window.interfaces;
        try {
            var d = e("module.Flash.interface");
            var l = new d;
            l.cont = t
        } catch(c) {}
        if (a !== null && a[1] !== "LETV.Plugin.Video.refreshState") {
            n = new Function("status", "data", "return " + a[1] + "(status,data)");
            r.push(n)
        }
        var h = function(e, t) {
            for (var i = 0,
            a = r.length; i < a; i++) {
                o = r[i](e, t);
                if (o) return o
            }
            try {
                if (e.indexOf("adHeadPlay") > -1) {
                    LETV.Plugin.AD.on(e)
                }
            } catch(s) {}
            return l && l[e] && typeof l[e] === "function" && l[e](t)
        };
        window[s] = h;
        return a !== null ? i.replace("callbackJs=" + a[1], "callbackJs=" + s) : i + "&callbackJs=" + s
    }
});
LTK.use("player");
define("modules.app_guide",
function(e, t, i) {
    var a = {
        isInit: false,
        init: function(e, t) {
            if (this.isInit) return;
            this.isInit = true;
            var i = document.getElementById("app-guide");
            if (i) return;
            i = document.createElement("div");
            i.id = "app-guide";
            i.className = "app-top-down";
            i.innerHTML = "<p><span>您可以试看" + t + '分钟,安装乐视视频app</span><em class="cls"><a id="app-guide-close" href="javascript:void(0);"><i class="i-1"></i><i class="i-2"></i></a></em> <a id="app-guide-openapp" href="javascript:void(0);" class="top-down">观看完整版</a></p>';
            var a = document.getElementById("j-smart");
            if (a) a.style.display = "none";
            var s = document.getElementById("j-player");
            document.body.insertBefore(i, s);
            this._sendStat();
            vjs("#app-guide-close").on("click",
            function() {
                i.style.display = "none"
            });
            vjs("#app-guide-openapp").on("click",
            function() {
                Stats.sendAction({
                    ap: "fl=di&dp=msite_player_appguide_1"
                });
                __playerOpenApp = __playerOpenApp || {};
                __playerOpenApp.appTryLook = __playerOpenApp.appTryLook || {};
                __openApp._bindDefaultAppEvent({
                    app: "letv",
                    vid: e,
                    type: "play",
                    url: __playerOpenApp.appTryLook.url || "",
                    wxShortUrl: __playerOpenApp.appTryLook.wxShortUrl || ""
                })
            })
        },
        _sendStat: function() {
            if (typeof Stats === "undefined") {
                this._timer = setTimeout(arguments.callee, 200);
                return
            }
            clearTimeout(this._timer);
            Stats.sendAction({
                acode: "19",
                ap: info.shareAgent ? "fl=di&dp=msite_player_weixin_appguide_1_exposure": "fl=di&dp=msite_player_appguide_1_exposure"
            })
        },
        destroy: function() {
            this.isInit = false;
            var e = document.getElementById("app-guide"),
            t = document.getElementById("j-smart");
            if (e) e.parentNode.removeChild(e);
            if (t) t.style.display = "block"
        }
    };
    i.exports = a
});
define("modules.trylook",
function(e, t, i) {
    var a = {
        init: function(e) {
            this.showTip = true;
            this.userInfo = e;
            this._initDom()
        },
        _initDom: function() {
            var e = document.getElementById("j-player"),
            t = document.getElementById("j-tryLook") || "";
            if (!t) {
                t = document.createElement("div");
                t.id = "j-tryLook";
                t.className = "open-vip";
                document.body.insertBefore(t, e)
            }
            var i = document.getElementById("j-smart") || "";
            if (i) i.style.display = "none";
            var a = '<a k-name="send-sum-stat" data-sum-stat="sumtmp;MZPVIP" href="' + "http://zhifu.letv.com/mz/tobuy/regular?fronturl=" + encodeURIComponent(location.href) + '" title=""><img src="http://i2.letvimg.com/css/201406/30/1416/open-vip.jpg" alt=""></a>';
            t.innerHTML = a
        },
        destroy: function() {
            var e = document.getElementById("j-tryLook");
            if (e) {
                e.parentNode.removeChild(e)
            }
        }
    };
    i.exports = a
});
if (!window.__openApp) {
    window.__openApp = {
        param: {},
        checkUA: function() {
            var e = navigator.userAgent;
            this.isandroid = e.match(/Android/i) != null;
            this.isWeiXin = e.match(/MicroMessenger/i) != null
        },
        initParam: function(e) {
            this.options = e;
            if (e.app) {
                this.param.vid = e.vid || typeof info != "undefined" && info.vid || "";
                this.param.pid = e.pid || typeof info != "undefined" && info.pid || "";
                this.param.cid = e.cid || typeof info != "undefined" && info.cid || "";
                this.param.weburl = e.weburl || typeof info != "undefined" && info.weburl || "";
                this.param.streamid = e.streamid || typeof info != "undefined" && info.weburl || "";
                this.param.type = e.type || ""
            }
        },
        _bindDefaultAppEvent: function(e) {
            var t = this;
            e = e || {};
            this.initParam(e);
            this.checkUA();
            if (typeof t.options.isOnlyOpen === "undefined" || !t.options.isOnlyOpen) {
                var i = t._getDownloadAppUrl(),
                a = true
            }
            if (t.options.app) {
                var s = this._getOpenAppUrl();
                if (__openApp.isandroid) {
                    setTimeout(function() {
                        var e = (new Date).valueOf();
                        var t = document.createElement("iframe");
                        t.style.cssText = "width:0px;height:0px;position:fixed;top:0;left:0;";
                        t.src = s;
                        document.body.appendChild(t);
                        e = (new Date).valueOf();
                        if (a) {
                            setTimeout(function() {
                                var t = (new Date).valueOf();
                                if (1550 > t - e) {
                                    location.href = i
                                }
                            },
                            1500)
                        }
                    },
                    100)
                } else {
                    var n = document.createElement("iframe");
                    n.style.display = "none";
                    var o, r = document.body,
                    d = function(e, t) {
                        if (a && t) {
                            location.href = i
                        }
                        window.removeEventListener("pagehide", l, !0);
                        window.removeEventListener("pageshow", l, !0);
                        n && (n.onload = null, r.removeChild(n), n = null)
                    },
                    l = function(e) {
                        clearTimeout(o);
                        d(e, !1)
                    };
                    window.addEventListener("pagehide", l, !0);
                    window.addEventListener("pageshow", l, !0);
                    n.onload = d;
                    n.src = s;
                    r.appendChild(n);
                    var c = +new Date;
                    o = setTimeout(function() {
                        o = setTimeout(function() {
                            var e = +new Date;
                            c - e > 1300 ? d(null, !1) : d(null, !0)
                        },
                        1200)
                    },
                    60)
                }
            } else {
                location.href = i
            }
        },
        _getOpenAppUrl: function() {
            var e = this.options;
            switch (this.trim(e.app.toLowerCase())) {
            case "letv":
                var t = "",
                i = "";
                switch (this.param.type) {
                case "pay":
                    i = 1;
                    break;
                case "play":
                    i = 0;
                    break;
                case "webview":
                    i = 4;
                    break;
                case "browser":
                    i = 9;
                    break;
                default:
                }
                t = "letvclient://msiteAction?actionType=" + encodeURIComponent(i) + "&pid=" + encodeURIComponent(this.param.pid) + "&vid=" + encodeURIComponent(this.param.vid) + "&cid=" + encodeURIComponent(this.param.cid) + "&weburl=" + encodeURIComponent(this.param.weburl) + "&streamid=" + encodeURIComponent(this.param.streamid) + "&from=mletv&utype=" + (e.autoOpen ? "1": "2");
                return t;
                break;
            case "kanqiu":
                break;
            default:
                return
            }
        },
        _getDownloadAppUrl: function() {
            var e = "";
            if (this.isWeiXin) {
                if (this.options.wxUrl) {
                    e = this.trim(this.options.wxUrl)
                } else {
                    e = "http://ti.3g.qq.com/open/s?aid=clientjump&url=" + encodeURIComponent("http://url.cn/" + (this.options.wxShortUrl ? this.trim(this.options.wxShortUrl) : "IjrlGs"))
                }
            } else {
                e = this.options.url ? encodeURI(this.trim(this.options.url)) : encodeURI("http://app.m.letv.com/download.php")
            }
            return e
        },
        trim: function(e) {
            return e.replace(/^\s+|\s+$/g, "")
        }
    }
}
window.le = window.le || {};
le._cb_ = le._cb_ || {};
window.__player = {
    init: function() {
        var e = navigator.userAgent.toLowerCase(),
        t = this._getUrlParam();
        var i = window.innerWidth,
        a = 181 / 320 * i,
        s = LTK.require("extend.lib"),
        n = {
            mmsid: info.mmsid,
            callbackJs: "le._cb_._player",
            isPlayerAd: "0",
            zid: info.zid || "",
            tg: s.getCookie("tj_tg"),
            defi: "2",
            isAutoPlay: /weibo/i.test(e) || t.site == "toutiao" || typeof info.openapp !== "undefined" && info.openapp ? 0 : 1
        };
        if (info.site) {
            n.typeFrom = info.site;
            n.sysFullScreen = true
        }
        window.__INFO__ = {
            video: info
        };
        this._params = ["j-player", {
            w: i,
            h: a
        },
        {},
        this._getParams(n), "", {
            pname: "MPlayer",
            forceH5: true
        }];
        setTimeout(function() {
            if (window.innerWidth !== i && window.innerWidth > 0) {
                var e = vjs("#" + __player._params[0]);
                if (e && e.length > 0) {
                    var t = window.innerWidth,
                    a = 181 / 320 * t;
                    e.width(t);
                    e.height(a);
                    h5player.resize()
                }
            }
        },
        100);
        le._cb_._player = this._callback;
        this._initPlayer()
    },
    _initPlayer: function() {
        window.mainPlayer = LELib.Revive.Player.apply(LELib.Revive, this._params)
    },
    _callback: function(e, t) {
        if (e == "PLAY_NEW_ID") {
            le.evt.pageEvent.fire({
                type: "playNewId"
            });
            if (this.trylook) {
                this.trylook.destroy();
                this.trylook = null
            }
            if (this.app_guide) {
                this.app_guide.destroy();
                this.app_guide = null
            }
        } else if (e == "PLAYER_VIDEO_COMPLETE") {
            le.evt.pageEvent.fire({
                type: "nextVideo"
            })
        } else if (e == "TRYLOOK_TIP") {} else if (e == "TRYLOOK_End") {} else if (e == "APP_GUIDE") {
            if (!this.app_guide) {
                this.app_guide = LTK.require("modules.app_guide")
            }
            this.app_guide.init(t.vid, t.cutoffTime)
        } else if (e == "OPEN_APP") {
            var i = t.openType;
            window.__playerOpenApp = __playerOpenApp || {};
            var a;
            switch (i) {
            case "auth-ban":
                a = "authBan";
                break;
            case "app-guide":
                Stats.sendAction({
                    ap:
                    info.shareAgent ? "fl=di&dp=msite_player_weixin_appguide_2": "fl=di&dp=msite_player_appguide_2"
                });
                a = "appTryLook";
                break;
            case "firstlook":
                a = "firstlook";
                break;
            default:
                a = "playEnd"
            }
            window.__playerOpenApp[a] = __playerOpenApp[a] || {};
            __openApp._bindDefaultAppEvent({
                app: "letv",
                vid: t.vid,
                type: "play",
                url: window.__playerOpenApp[a].url || "",
                wxUrl: window.__playerOpenApp[a].wxUrl || "",
                wxShortUrl: window.__playerOpenApp[a].wxShortUrl || ""
            })
        } else if (e == "SHOW_MESSAGE") {
            switch (t.type) {
            case "appGuideEnd":
                Stats.sendAction({
                    acode:
                    "19",
                    ap: info.shareAgent ? "fl=di&dp=msite_player_weixin_appguide_2_exposure": "fl=di&dp=msite_player_appguide_2_exposure"
                });
                break
            }
        }
    },
    _getParams: function(e) {
        var t = [];
        for (var i in e) {
            t.push(i + "=" + e[i])
        }
        return t.join("&")
    },
    _getUrlParam: function() {
        var e = decodeURIComponent(location.href),
        t = e.indexOf("?");
        var i = {};
        var a, s, n, o, r;
        if (t != -1) {
            a = e.substring(t + 1);
            s = a.split("&");
            for (n = 0, o = s.length; n < o; n++) {
                r = s[n].split("=");
                i[r[0]] = r[1]
            }
        }
        return i
    }
};
