


(function(e) {

    if (jQuery(window).width() > 1024) {

    e.fn.appear = function(t) {
        var r = {
            zero: 0,
            ten: 10,
            twenty: 20,
            thirty: 30,
            fourty: 40,
            fifty: 50,
            sixty: 60,
            seventy: 70,
            eighty: 80,
            ninety: 90,
            hundred: 100
        };
        var i = e.extend({
            data: undefined,
            once: false,
            percentage: 50,
            forEachVisible: function(e, t) {},
            appear: function() {},
            disappear: function() {},
            initialized: false
        }, t);
        return this.each(function(t, s) {
            var o = e(this),
                u = i.percentage;
            for (n in r) {
                if (o.hasClass(n)) {
                    u = r[n];
                    break
                }
            }
            e(window).load(function() {
                o.appeared = false;
                var n = e(window);
                var r = function() {
                    if (!o.is(":visible")) {
                        o.appeared = false;
                        return
                    }
                    var e = n.scrollLeft();
                    var r = n.scrollTop();
                    var s = e + n.width();
                    var a = r + n.height();
                    var f = o.offset();
                    var l = f.left;
                    var c = l + o.width();
                    var h = f.top;
                    var p = h + o.height();
                    var d = r > h && r < p ? r - h : 0;
                    var v = a < p && a > h ? p - a : 0;
                    var m = d + v;
                    var g = Math.round((o.height() - m) / o.height() * 100);
                    if (g >= u && p >= r && h <= a && c >= e && l <= s) {
                        if (!o.appeared) {
                            if (!i.initialized) i.forEachVisible(t, o);
                            o.trigger("appear", i.data)
                        }
                    } else {
                        if (o.appeared) o.trigger("disappear", i.data);
                        o.appeared = false
                    }
                };
                var s = function() {
                    o.appeared = true;
                    if (i.once) {
                        n.unbind("scroll", r);
                        n.unbind("resize", r);
                        var t = e.inArray(r, e.fn.appear.checks);
                        if (t >= 0) e.fn.appear.checks.splice(t, 1)
                    }
                    i.appear.apply(this, arguments)
                };
                var a = function() {
                    o.appeared = false;
                    i.disappear.apply(this, arguments)
                };
                if (i.once) o.one("appear", i.data, s);
                else {
                    o.bind("appear", i.data, s);
                    o.bind("disappear", i.data, a)
                }
                n.scroll(r);
                n.resize(r);
                e.fn.appear.checks.push(r);
                r()
            })
        })
    };
    e.extend(e.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var t = e.fn.appear.checks.length;
            if (t > 0)
                while (t--) e.fn.appear.checks[t]()
        },
        run: function() {
            if (e.fn.appear.timeout) clearTimeout(e.fn.appear.timeout);
            e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
        }
    });
    e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(t, n) {
        var r = e.fn[n];
        if (r) {
            e.fn[n] = function() {
                var t = r.apply(this, arguments);
                e.fn.appear.run();
                return t
            }
        }
    })

    }
})(jQuery);