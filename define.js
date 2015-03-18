(function (e) {
	var t = e.TT = {version:"1.0.0"}
	var i = t.mods = {};
	var a = t.data = {};
	var c = /^\-([\w\.\/\-]*)$/;

	function s(e) {
        return function(t) {
            return {}.toString.call(t) === "[object " + e + "]"
        }
    }

	var o = s("Function");
	var n = Array.isArray || s("Array");

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

	function g (e) {
		if(e.exports !== null) return e.exports;
		for(var t in e.deps){
			g(i[e.deps[t].id])
		}
		function a (t) {
			t = v(t, e.id);
			if(!i[t]) throw new Error(t + " Not Found");
			return g(i[t]);
		}
		a.async = a;
		var s = e.factory;
		var n = o(s) ? s(a, e.exports = {}, e) : s;
		if(n === undefined){
			n = e.exports;
		}

		e.exports = n;
		delete e.factory;
		return n;
	}

	t.define = function(e, a, s){
		var n = arguments.length;

		if(n === 1){
			throw "module must has a id and factory";
		} else if(n === 2){
			s = a;
			a = [];
		}
		if(c.test(e)) e = RegExp.$1;
		var o = {
			id : e,
			deps : a,
			factory : s,
			exports : null
		};
		i[e] = o;
		RegExp.$1 == e && t.exec(e, true);
	};

	t.exec = function(e){
		return g(i[e]);
	}

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

	e.define = t.define;

})(window);


define("extend.detect", function(e, t, i){
	i.exports = {a:1,b:2};
})

define("extend.test", function(e, t, i){
	var s = e("extend.detect");
	console.log(s);
})

define("extend.detect",
function(e, t, i) {
	e("extend.test");
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

TT.use("extend.test");
