/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(N, f, W) {
    "use strict";
    f.module("ngAnimate", [ "ng" ]).directive("ngAnimateChildren", function() {
        return function(X, C, g) {
            g = g.ngAnimateChildren;
            f.isString(g) && 0 === g.length ? C.data("$$ngAnimateChildren", !0) : X.$watch(g, function(f) {
                C.data("$$ngAnimateChildren", !!f);
            });
        };
    }).factory("$$animateReflow", [ "$$rAF", "$document", function(f, C) {
        return function(g) {
            return f(function() {
                g();
            });
        };
    } ]).config([ "$provide", "$animateProvider", function(X, C) {
        function g(f) {
            for (var n = 0; n < f.length; n++) {
                var g = f[n];
                if (1 == g.nodeType) return g;
            }
        }
        function ba(f, n) {
            return g(f) == g(n);
        }
        var t = f.noop, n = f.forEach, da = C.$$selectors, aa = f.isArray, ea = f.isString, ga = f.isObject, r = {
            running: !0
        }, u;
        X.decorator("$animate", [ "$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", "$$jqLite", function(O, N, M, Y, y, H, P, W, Z, Q) {
            function R(a, c) {
                var b = a.data("$$ngAnimateState") || {};
                c && (b.running = !0, b.structural = !0, a.data("$$ngAnimateState", b));
                return b.disabled || b.running && b.structural;
            }
            function D(a) {
                var c, b = N.defer();
                b.promise.$$cancelFn = function() {
                    c && c();
                };
                P.$$postDigest(function() {
                    c = a(function() {
                        b.resolve();
                    });
                });
                return b.promise;
            }
            function I(a) {
                if (ga(a)) return a.tempClasses && ea(a.tempClasses) && (a.tempClasses = a.tempClasses.split(/\s+/)), 
                a;
            }
            function S(a, c, b) {
                b = b || {};
                var d = {};
                n(b, function(e, a) {
                    n(a.split(" "), function(a) {
                        d[a] = e;
                    });
                });
                var h = Object.create(null);
                n((a.attr("class") || "").split(/\s+/), function(e) {
                    h[e] = !0;
                });
                var f = [], l = [];
                n(c && c.classes || [], function(e, a) {
                    var b = h[a], c = d[a] || {};
                    !1 === e ? (b || "addClass" == c.event) && l.push(a) : !0 === e && (b && "removeClass" != c.event || f.push(a));
                });
                return 0 < f.length + l.length && [ f.join(" "), l.join(" ") ];
            }
            function T(a) {
                if (a) {
                    var c = [], b = {};
                    a = a.substr(1).split(".");
                    (Y.transitions || Y.animations) && c.push(M.get(da[""]));
                    for (var d = 0; d < a.length; d++) {
                        var f = a[d], k = da[f];
                        k && !b[f] && (c.push(M.get(k)), b[f] = !0);
                    }
                    return c;
                }
            }
            function U(a, c, b, d) {
                function h(e, a) {
                    var b = e[a], c = e["before" + a.charAt(0).toUpperCase() + a.substr(1)];
                    if (b || c) return "leave" == a && (c = b, b = null), u.push({
                        event: a,
                        fn: b
                    }), J.push({
                        event: a,
                        fn: c
                    }), !0;
                }
                function k(c, l, w) {
                    var E = [];
                    n(c, function(a) {
                        a.fn && E.push(a);
                    });
                    var m = 0;
                    n(E, function(c, f) {
                        var p = function() {
                            a: {
                                if (l) {
                                    (l[f] || t)();
                                    if (++m < E.length) break a;
                                    l = null;
                                }
                                w();
                            }
                        };
                        switch (c.event) {
                          case "setClass":
                            l.push(c.fn(a, e, A, p, d));
                            break;

                          case "animate":
                            l.push(c.fn(a, b, d.from, d.to, p));
                            break;

                          case "addClass":
                            l.push(c.fn(a, e || b, p, d));
                            break;

                          case "removeClass":
                            l.push(c.fn(a, A || b, p, d));
                            break;

                          default:
                            l.push(c.fn(a, p, d));
                        }
                    });
                    l && 0 === l.length && w();
                }
                var l = a[0];
                if (l) {
                    d && (d.to = d.to || {}, d.from = d.from || {});
                    var e, A;
                    aa(b) && (e = b[0], A = b[1], e ? A ? b = e + " " + A : (b = e, c = "addClass") : (b = A, 
                    c = "removeClass"));
                    var w = "setClass" == c, E = w || "addClass" == c || "removeClass" == c || "animate" == c, p = a.attr("class") + " " + b;
                    if (x(p)) {
                        var ca = t, m = [], J = [], g = t, s = [], u = [], p = (" " + p).replace(/\s+/g, ".");
                        n(T(p), function(a) {
                            !h(a, c) && w && (h(a, "addClass"), h(a, "removeClass"));
                        });
                        return {
                            node: l,
                            event: c,
                            className: b,
                            isClassBased: E,
                            isSetClassOperation: w,
                            applyStyles: function() {
                                d && a.css(f.extend(d.from || {}, d.to || {}));
                            },
                            before: function(a) {
                                ca = a;
                                k(J, m, function() {
                                    ca = t;
                                    a();
                                });
                            },
                            after: function(a) {
                                g = a;
                                k(u, s, function() {
                                    g = t;
                                    a();
                                });
                            },
                            cancel: function() {
                                m && (n(m, function(a) {
                                    (a || t)(!0);
                                }), ca(!0));
                                s && (n(s, function(a) {
                                    (a || t)(!0);
                                }), g(!0));
                            }
                        };
                    }
                }
            }
            function G(a, c, b, d, h, k, l, e) {
                function A(e) {
                    var l = "$animate:" + e;
                    J && J[l] && 0 < J[l].length && H(function() {
                        b.triggerHandler(l, {
                            event: a,
                            className: c
                        });
                    });
                }
                function w() {
                    A("before");
                }
                function E() {
                    A("after");
                }
                function p() {
                    p.hasBeenRun || (p.hasBeenRun = !0, k());
                }
                function g() {
                    if (!g.hasBeenRun) {
                        m && m.applyStyles();
                        g.hasBeenRun = !0;
                        l && l.tempClasses && n(l.tempClasses, function(a) {
                            u.removeClass(b, a);
                        });
                        var w = b.data("$$ngAnimateState");
                        w && (m && m.isClassBased ? B(b, c) : (H(function() {
                            var e = b.data("$$ngAnimateState") || {};
                            fa == e.index && B(b, c, a);
                        }), b.data("$$ngAnimateState", w)));
                        A("close");
                        e();
                    }
                }
                var m = U(b, a, c, l);
                if (!m) return p(), w(), E(), g(), t;
                a = m.event;
                c = m.className;
                var J = f.element._data(m.node), J = J && J.events;
                d || (d = h ? h.parent() : b.parent());
                if (z(b, d)) return p(), w(), E(), g(), t;
                d = b.data("$$ngAnimateState") || {};
                var L = d.active || {}, s = d.totalActive || 0, q = d.last;
                h = !1;
                if (0 < s) {
                    s = [];
                    if (m.isClassBased) "setClass" == q.event ? (s.push(q), B(b, c)) : L[c] && (v = L[c], 
                    v.event == a ? h = !0 : (s.push(v), B(b, c))); else if ("leave" == a && L["ng-leave"]) h = !0; else {
                        for (var v in L) s.push(L[v]);
                        d = {};
                        B(b, !0);
                    }
                    0 < s.length && n(s, function(a) {
                        a.cancel();
                    });
                }
                !m.isClassBased || m.isSetClassOperation || "animate" == a || h || (h = "addClass" == a == b.hasClass(c));
                if (h) return p(), w(), E(), A("close"), e(), t;
                L = d.active || {};
                s = d.totalActive || 0;
                if ("leave" == a) b.one("$destroy", function(a) {
                    a = f.element(this);
                    var e = a.data("$$ngAnimateState");
                    e && (e = e.active["ng-leave"]) && (e.cancel(), B(a, "ng-leave"));
                });
                u.addClass(b, "ng-animate");
                l && l.tempClasses && n(l.tempClasses, function(a) {
                    u.addClass(b, a);
                });
                var fa = K++;
                s++;
                L[c] = m;
                b.data("$$ngAnimateState", {
                    last: m,
                    active: L,
                    index: fa,
                    totalActive: s
                });
                w();
                m.before(function(e) {
                    var l = b.data("$$ngAnimateState");
                    e = e || !l || !l.active[c] || m.isClassBased && l.active[c].event != a;
                    p();
                    !0 === e ? g() : (E(), m.after(g));
                });
                return m.cancel;
            }
            function q(a) {
                if (a = g(a)) a = f.isFunction(a.getElementsByClassName) ? a.getElementsByClassName("ng-animate") : a.querySelectorAll(".ng-animate"), 
                n(a, function(a) {
                    a = f.element(a);
                    (a = a.data("$$ngAnimateState")) && a.active && n(a.active, function(a) {
                        a.cancel();
                    });
                });
            }
            function B(a, c) {
                if (ba(a, y)) r.disabled || (r.running = !1, r.structural = !1); else if (c) {
                    var b = a.data("$$ngAnimateState") || {}, d = !0 === c;
                    !d && b.active && b.active[c] && (b.totalActive--, delete b.active[c]);
                    if (d || !b.totalActive) u.removeClass(a, "ng-animate"), a.removeData("$$ngAnimateState");
                }
            }
            function z(a, c) {
                if (r.disabled) return !0;
                if (ba(a, y)) return r.running;
                var b, d, g;
                do {
                    if (0 === c.length) break;
                    var k = ba(c, y), l = k ? r : c.data("$$ngAnimateState") || {};
                    if (l.disabled) return !0;
                    k && (g = !0);
                    !1 !== b && (k = c.data("$$ngAnimateChildren"), f.isDefined(k) && (b = k));
                    d = d || l.running || l.last && !l.last.isClassBased;
                } while (c = c.parent());
                return !g || !b && d;
            }
            u = Q;
            y.data("$$ngAnimateState", r);
            var $ = P.$watch(function() {
                return Z.totalPendingRequests;
            }, function(a, c) {
                0 === a && ($(), P.$$postDigest(function() {
                    P.$$postDigest(function() {
                        r.running = !1;
                    });
                }));
            }), K = 0, V = C.classNameFilter(), x = V ? function(a) {
                return V.test(a);
            } : function() {
                return !0;
            };
            return {
                animate: function(a, c, b, d, h) {
                    d = d || "ng-inline-animate";
                    h = I(h) || {};
                    h.from = b ? c : null;
                    h.to = b ? b : c;
                    return D(function(b) {
                        return G("animate", d, f.element(g(a)), null, null, t, h, b);
                    });
                },
                enter: function(a, c, b, d) {
                    d = I(d);
                    a = f.element(a);
                    c = c && f.element(c);
                    b = b && f.element(b);
                    R(a, !0);
                    O.enter(a, c, b);
                    return D(function(h) {
                        return G("enter", "ng-enter", f.element(g(a)), c, b, t, d, h);
                    });
                },
                leave: function(a, c) {
                    c = I(c);
                    a = f.element(a);
                    q(a);
                    R(a, !0);
                    return D(function(b) {
                        return G("leave", "ng-leave", f.element(g(a)), null, null, function() {
                            O.leave(a);
                        }, c, b);
                    });
                },
                move: function(a, c, b, d) {
                    d = I(d);
                    a = f.element(a);
                    c = c && f.element(c);
                    b = b && f.element(b);
                    q(a);
                    R(a, !0);
                    O.move(a, c, b);
                    return D(function(h) {
                        return G("move", "ng-move", f.element(g(a)), c, b, t, d, h);
                    });
                },
                addClass: function(a, c, b) {
                    return this.setClass(a, c, [], b);
                },
                removeClass: function(a, c, b) {
                    return this.setClass(a, [], c, b);
                },
                setClass: function(a, c, b, d) {
                    d = I(d);
                    a = f.element(a);
                    a = f.element(g(a));
                    if (R(a)) return O.$$setClassImmediately(a, c, b, d);
                    var h, k = a.data("$$animateClasses"), l = !!k;
                    k || (k = {
                        classes: {}
                    });
                    h = k.classes;
                    c = aa(c) ? c : c.split(" ");
                    n(c, function(a) {
                        a && a.length && (h[a] = !0);
                    });
                    b = aa(b) ? b : b.split(" ");
                    n(b, function(a) {
                        a && a.length && (h[a] = !1);
                    });
                    if (l) return d && k.options && (k.options = f.extend(k.options || {}, d)), k.promise;
                    a.data("$$animateClasses", k = {
                        classes: h,
                        options: d
                    });
                    return k.promise = D(function(e) {
                        var l = a.parent(), b = g(a), c = b.parentNode;
                        if (!c || c.$$NG_REMOVED || b.$$NG_REMOVED) e(); else {
                            b = a.data("$$animateClasses");
                            a.removeData("$$animateClasses");
                            var c = a.data("$$ngAnimateState") || {}, d = S(a, b, c.active);
                            return d ? G("setClass", d, a, l, null, function() {
                                d[0] && O.$$addClassImmediately(a, d[0]);
                                d[1] && O.$$removeClassImmediately(a, d[1]);
                            }, b.options, e) : e();
                        }
                    });
                },
                cancel: function(a) {
                    a.$$cancelFn();
                },
                enabled: function(a, c) {
                    switch (arguments.length) {
                      case 2:
                        if (a) B(c); else {
                            var b = c.data("$$ngAnimateState") || {};
                            b.disabled = !0;
                            c.data("$$ngAnimateState", b);
                        }
                        break;

                      case 1:
                        r.disabled = !a;
                        break;

                      default:
                        a = !r.disabled;
                    }
                    return !!a;
                }
            };
        } ]);
        C.register("", [ "$window", "$sniffer", "$timeout", "$$animateReflow", function(r, C, M, Y) {
            function y() {
                b || (b = Y(function() {
                    c = [];
                    b = null;
                    x = {};
                }));
            }
            function H(a, e) {
                b && b();
                c.push(e);
                b = Y(function() {
                    n(c, function(a) {
                        a();
                    });
                    c = [];
                    b = null;
                    x = {};
                });
            }
            function P(a, e) {
                var b = g(a);
                a = f.element(b);
                k.push(a);
                b = Date.now() + e;
                b <= h || (M.cancel(d), h = b, d = M(function() {
                    X(k);
                    k = [];
                }, e, !1));
            }
            function X(a) {
                n(a, function(a) {
                    (a = a.data("$$ngAnimateCSS3Data")) && n(a.closeAnimationFns, function(a) {
                        a();
                    });
                });
            }
            function Z(a, e) {
                var b = e ? x[e] : null;
                if (!b) {
                    var c = 0, d = 0, f = 0, g = 0;
                    n(a, function(a) {
                        if (1 == a.nodeType) {
                            a = r.getComputedStyle(a) || {};
                            c = Math.max(Q(a[z + "Duration"]), c);
                            d = Math.max(Q(a[z + "Delay"]), d);
                            g = Math.max(Q(a[K + "Delay"]), g);
                            var e = Q(a[K + "Duration"]);
                            0 < e && (e *= parseInt(a[K + "IterationCount"], 10) || 1);
                            f = Math.max(e, f);
                        }
                    });
                    b = {
                        total: 0,
                        transitionDelay: d,
                        transitionDuration: c,
                        animationDelay: g,
                        animationDuration: f
                    };
                    e && (x[e] = b);
                }
                return b;
            }
            function Q(a) {
                var e = 0;
                a = ea(a) ? a.split(/\s*,\s*/) : [];
                n(a, function(a) {
                    e = Math.max(parseFloat(a) || 0, e);
                });
                return e;
            }
            function R(b, e, c, d) {
                b = 0 <= [ "ng-enter", "ng-leave", "ng-move" ].indexOf(c);
                var f, p = e.parent(), h = p.data("$$ngAnimateKey");
                h || (p.data("$$ngAnimateKey", ++a), h = a);
                f = h + "-" + g(e).getAttribute("class");
                var p = f + " " + c, h = x[p] ? ++x[p].total : 0, m = {};
                if (0 < h) {
                    var n = c + "-stagger", m = f + " " + n;
                    (f = !x[m]) && u.addClass(e, n);
                    m = Z(e, m);
                    f && u.removeClass(e, n);
                }
                u.addClass(e, c);
                var n = e.data("$$ngAnimateCSS3Data") || {}, k = Z(e, p);
                f = k.transitionDuration;
                k = k.animationDuration;
                if (b && 0 === f && 0 === k) return u.removeClass(e, c), !1;
                c = d || b && 0 < f;
                b = 0 < k && 0 < m.animationDelay && 0 === m.animationDuration;
                e.data("$$ngAnimateCSS3Data", {
                    stagger: m,
                    cacheKey: p,
                    running: n.running || 0,
                    itemIndex: h,
                    blockTransition: c,
                    closeAnimationFns: n.closeAnimationFns || []
                });
                p = g(e);
                c && (I(p, !0), d && e.css(d));
                b && (p.style[K + "PlayState"] = "paused");
                return !0;
            }
            function D(a, e, b, c, d) {
                function f() {
                    e.off(D, h);
                    u.removeClass(e, k);
                    u.removeClass(e, t);
                    z && M.cancel(z);
                    G(e, b);
                    var a = g(e), c;
                    for (c in s) a.style.removeProperty(s[c]);
                }
                function h(a) {
                    a.stopPropagation();
                    var b = a.originalEvent || a;
                    a = b.$manualTimeStamp || b.timeStamp || Date.now();
                    b = parseFloat(b.elapsedTime.toFixed(3));
                    Math.max(a - H, 0) >= C && b >= x && c();
                }
                var m = g(e);
                a = e.data("$$ngAnimateCSS3Data");
                if (-1 != m.getAttribute("class").indexOf(b) && a) {
                    var k = "", t = "";
                    n(b.split(" "), function(a, b) {
                        var e = (0 < b ? " " : "") + a;
                        k += e + "-active";
                        t += e + "-pending";
                    });
                    var s = [], q = a.itemIndex, v = a.stagger, r = 0;
                    if (0 < q) {
                        r = 0;
                        0 < v.transitionDelay && 0 === v.transitionDuration && (r = v.transitionDelay * q);
                        var y = 0;
                        0 < v.animationDelay && 0 === v.animationDuration && (y = v.animationDelay * q, 
                        s.push(B + "animation-play-state"));
                        r = Math.round(100 * Math.max(r, y)) / 100;
                    }
                    r || (u.addClass(e, k), a.blockTransition && I(m, !1));
                    var F = Z(e, a.cacheKey + " " + k), x = Math.max(F.transitionDuration, F.animationDuration);
                    if (0 === x) u.removeClass(e, k), G(e, b), c(); else {
                        !r && d && 0 < Object.keys(d).length && (F.transitionDuration || (e.css("transition", F.animationDuration + "s linear all"), 
                        s.push("transition")), e.css(d));
                        var q = Math.max(F.transitionDelay, F.animationDelay), C = 1e3 * q;
                        0 < s.length && (v = m.getAttribute("style") || "", ";" !== v.charAt(v.length - 1) && (v += ";"), 
                        m.setAttribute("style", v + " "));
                        var H = Date.now(), D = V + " " + $, q = 1e3 * (r + 1.5 * (q + x)), z;
                        0 < r && (u.addClass(e, t), z = M(function() {
                            z = null;
                            0 < F.transitionDuration && I(m, !1);
                            0 < F.animationDuration && (m.style[K + "PlayState"] = "");
                            u.addClass(e, k);
                            u.removeClass(e, t);
                            d && (0 === F.transitionDuration && e.css("transition", F.animationDuration + "s linear all"), 
                            e.css(d), s.push("transition"));
                        }, 1e3 * r, !1));
                        e.on(D, h);
                        a.closeAnimationFns.push(function() {
                            f();
                            c();
                        });
                        a.running++;
                        P(e, q);
                        return f;
                    }
                } else c();
            }
            function I(a, b) {
                a.style[z + "Property"] = b ? "none" : "";
            }
            function S(a, b, c, d) {
                if (R(a, b, c, d)) return function(a) {
                    a && G(b, c);
                };
            }
            function T(a, b, c, d, f) {
                if (b.data("$$ngAnimateCSS3Data")) return D(a, b, c, d, f);
                G(b, c);
                d();
            }
            function U(a, b, c, d, f) {
                var g = S(a, b, c, f.from);
                if (g) {
                    var h = g;
                    H(b, function() {
                        h = T(a, b, c, d, f.to);
                    });
                    return function(a) {
                        (h || t)(a);
                    };
                }
                y();
                d();
            }
            function G(a, b) {
                u.removeClass(a, b);
                var c = a.data("$$ngAnimateCSS3Data");
                c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData("$$ngAnimateCSS3Data"));
            }
            function q(a, b) {
                var c = "";
                a = aa(a) ? a : a.split(/\s+/);
                n(a, function(a, d) {
                    a && 0 < a.length && (c += (0 < d ? " " : "") + a + b);
                });
                return c;
            }
            var B = "", z, $, K, V;
            N.ontransitionend === W && N.onwebkittransitionend !== W ? (B = "-webkit-", z = "WebkitTransition", 
            $ = "webkitTransitionEnd transitionend") : (z = "transition", $ = "transitionend");
            N.onanimationend === W && N.onwebkitanimationend !== W ? (B = "-webkit-", K = "WebkitAnimation", 
            V = "webkitAnimationEnd animationend") : (K = "animation", V = "animationend");
            var x = {}, a = 0, c = [], b, d = null, h = 0, k = [];
            return {
                animate: function(a, b, c, d, f, g) {
                    g = g || {};
                    g.from = c;
                    g.to = d;
                    return U("animate", a, b, f, g);
                },
                enter: function(a, b, c) {
                    c = c || {};
                    return U("enter", a, "ng-enter", b, c);
                },
                leave: function(a, b, c) {
                    c = c || {};
                    return U("leave", a, "ng-leave", b, c);
                },
                move: function(a, b, c) {
                    c = c || {};
                    return U("move", a, "ng-move", b, c);
                },
                beforeSetClass: function(a, b, c, d, f) {
                    f = f || {};
                    b = q(c, "-remove") + " " + q(b, "-add");
                    if (f = S("setClass", a, b, f.from)) return H(a, d), f;
                    y();
                    d();
                },
                beforeAddClass: function(a, b, c, d) {
                    d = d || {};
                    if (b = S("addClass", a, q(b, "-add"), d.from)) return H(a, c), b;
                    y();
                    c();
                },
                beforeRemoveClass: function(a, b, c, d) {
                    d = d || {};
                    if (b = S("removeClass", a, q(b, "-remove"), d.from)) return H(a, c), b;
                    y();
                    c();
                },
                setClass: function(a, b, c, d, f) {
                    f = f || {};
                    c = q(c, "-remove");
                    b = q(b, "-add");
                    return T("setClass", a, c + " " + b, d, f.to);
                },
                addClass: function(a, b, c, d) {
                    d = d || {};
                    return T("addClass", a, q(b, "-add"), c, d.to);
                },
                removeClass: function(a, b, c, d) {
                    d = d || {};
                    return T("removeClass", a, q(b, "-remove"), c, d.to);
                }
            };
        } ]);
    } ]);
})(window, window.angular);

/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p, d, C) {
    "use strict";
    function v(r, h, g) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(a, c, b, f, y) {
                function z() {
                    k && (g.cancel(k), k = null);
                    l && (l.$destroy(), l = null);
                    m && (k = g.leave(m), k.then(function() {
                        k = null;
                    }), m = null);
                }
                function x() {
                    var b = r.current && r.current.locals;
                    if (d.isDefined(b && b.$template)) {
                        var b = a.$new(), f = r.current;
                        m = y(b, function(b) {
                            g.enter(b, null, m || c).then(function() {
                                !d.isDefined(t) || t && !a.$eval(t) || h();
                            });
                            z();
                        });
                        l = f.scope = b;
                        l.$emit("$viewContentLoaded");
                        l.$eval(w);
                    } else z();
                }
                var l, m, k, t = b.autoscroll, w = b.onload || "";
                a.$on("$routeChangeSuccess", x);
                x();
            }
        };
    }
    function A(d, h, g) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(a, c) {
                var b = g.current, f = b.locals;
                c.html(f.$template);
                var y = d(c.contents());
                b.controller && (f.$scope = a, f = h(b.controller, f), b.controllerAs && (a[b.controllerAs] = f), 
                c.data("$ngControllerController", f), c.children().data("$ngControllerController", f));
                y(a);
            }
        };
    }
    p = d.module("ngRoute", [ "ng" ]).provider("$route", function() {
        function r(a, c) {
            return d.extend(Object.create(a), c);
        }
        function h(a, d) {
            var b = d.caseInsensitiveMatch, f = {
                originalPath: a,
                regexp: a
            }, g = f.keys = [];
            a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, d, b, c) {
                a = "?" === c ? c : null;
                c = "*" === c ? c : null;
                g.push({
                    name: b,
                    optional: !!a
                });
                d = d || "";
                return "" + (a ? "" : d) + "(?:" + (a ? d : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "");
            }).replace(/([\/$\*])/g, "\\$1");
            f.regexp = new RegExp("^" + a + "$", b ? "i" : "");
            return f;
        }
        var g = {};
        this.when = function(a, c) {
            var b = d.copy(c);
            d.isUndefined(b.reloadOnSearch) && (b.reloadOnSearch = !0);
            d.isUndefined(b.caseInsensitiveMatch) && (b.caseInsensitiveMatch = this.caseInsensitiveMatch);
            g[a] = d.extend(b, a && h(a, b));
            if (a) {
                var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                g[f] = d.extend({
                    redirectTo: a
                }, h(f, b));
            }
            return this;
        };
        this.caseInsensitiveMatch = !1;
        this.otherwise = function(a) {
            "string" === typeof a && (a = {
                redirectTo: a
            });
            this.when(null, a);
            return this;
        };
        this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(a, c, b, f, h, p, x) {
            function l(b) {
                var e = s.current;
                (v = (n = k()) && e && n.$$route === e.$$route && d.equals(n.pathParams, e.pathParams) && !n.reloadOnSearch && !w) || !e && !n || a.$broadcast("$routeChangeStart", n, e).defaultPrevented && b && b.preventDefault();
            }
            function m() {
                var u = s.current, e = n;
                if (v) u.params = e.params, d.copy(u.params, b), a.$broadcast("$routeUpdate", u); else if (e || u) w = !1, 
                (s.current = e) && e.redirectTo && (d.isString(e.redirectTo) ? c.path(t(e.redirectTo, e.params)).search(e.params).replace() : c.url(e.redirectTo(e.pathParams, c.path(), c.search())).replace()), 
                f.when(e).then(function() {
                    if (e) {
                        var a = d.extend({}, e.resolve), b, c;
                        d.forEach(a, function(b, e) {
                            a[e] = d.isString(b) ? h.get(b) : h.invoke(b, null, null, e);
                        });
                        d.isDefined(b = e.template) ? d.isFunction(b) && (b = b(e.params)) : d.isDefined(c = e.templateUrl) && (d.isFunction(c) && (c = c(e.params)), 
                        c = x.getTrustedResourceUrl(c), d.isDefined(c) && (e.loadedTemplateUrl = c, b = p(c)));
                        d.isDefined(b) && (a.$template = b);
                        return f.all(a);
                    }
                }).then(function(c) {
                    e == s.current && (e && (e.locals = c, d.copy(e.params, b)), a.$broadcast("$routeChangeSuccess", e, u));
                }, function(b) {
                    e == s.current && a.$broadcast("$routeChangeError", e, u, b);
                });
            }
            function k() {
                var a, b;
                d.forEach(g, function(f, g) {
                    var q;
                    if (q = !b) {
                        var h = c.path();
                        q = f.keys;
                        var l = {};
                        if (f.regexp) if (h = f.regexp.exec(h)) {
                            for (var k = 1, m = h.length; k < m; ++k) {
                                var n = q[k - 1], p = h[k];
                                n && p && (l[n.name] = p);
                            }
                            q = l;
                        } else q = null; else q = null;
                        q = a = q;
                    }
                    q && (b = r(f, {
                        params: d.extend({}, c.search(), a),
                        pathParams: a
                    }), b.$$route = f);
                });
                return b || g[null] && r(g[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function t(a, b) {
                var c = [];
                d.forEach((a || "").split(":"), function(a, d) {
                    if (0 === d) c.push(a); else {
                        var f = a.match(/(\w+)(?:[?*])?(.*)/), g = f[1];
                        c.push(b[g]);
                        c.push(f[2] || "");
                        delete b[g];
                    }
                });
                return c.join("");
            }
            var w = !1, n, v, s = {
                routes: g,
                reload: function() {
                    w = !0;
                    a.$evalAsync(function() {
                        l();
                        m();
                    });
                },
                updateParams: function(a) {
                    if (this.current && this.current.$$route) {
                        var b = {}, f = this;
                        d.forEach(Object.keys(a), function(c) {
                            f.current.pathParams[c] || (b[c] = a[c]);
                        });
                        a = d.extend({}, this.current.params, a);
                        c.path(t(this.current.$$route.originalPath, a));
                        c.search(d.extend({}, c.search(), b));
                    } else throw B("norout");
                }
            };
            a.$on("$locationChangeStart", l);
            a.$on("$locationChangeSuccess", m);
            return s;
        } ];
    });
    var B = d.$$minErr("ngRoute");
    p.provider("$routeParams", function() {
        this.$get = function() {
            return {};
        };
    });
    p.directive("ngView", v);
    p.directive("ngView", A);
    v.$inject = [ "$route", "$anchorScroll", "$animate" ];
    A.$inject = [ "$compile", "$controller", "$route" ];
})(window, window.angular);

/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(M, Y, t) {
    "use strict";
    function T(b) {
        return function() {
            var a = arguments[0], c;
            c = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.3.11/" + (b ? b + "/" : "") + a;
            for (a = 1; a < arguments.length; a++) {
                c = c + (1 == a ? "?" : "&") + "p" + (a - 1) + "=";
                var d = encodeURIComponent, e;
                e = arguments[a];
                e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e;
                c += d(e);
            }
            return Error(c);
        };
    }
    function Ta(b) {
        if (null == b || Ua(b)) return !1;
        var a = b.length;
        return b.nodeType === oa && a ? !0 : F(b) || D(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b;
    }
    function s(b, a, c) {
        var d, e;
        if (b) if (G(b)) for (d in b) "prototype" == d || "length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d) || a.call(c, b[d], d, b); else if (D(b) || Ta(b)) {
            var f = "object" !== typeof b;
            d = 0;
            for (e = b.length; d < e; d++) (f || d in b) && a.call(c, b[d], d, b);
        } else if (b.forEach && b.forEach !== s) b.forEach(a, c, b); else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d, b);
        return b;
    }
    function Ed(b, a, c) {
        for (var d = Object.keys(b).sort(), e = 0; e < d.length; e++) a.call(c, b[d[e]], d[e]);
        return d;
    }
    function kc(b) {
        return function(a, c) {
            b(c, a);
        };
    }
    function Fd() {
        return ++nb;
    }
    function lc(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey;
    }
    function z(b) {
        for (var a = b.$$hashKey, c = 1, d = arguments.length; c < d; c++) {
            var e = arguments[c];
            if (e) for (var f = Object.keys(e), g = 0, h = f.length; g < h; g++) {
                var l = f[g];
                b[l] = e[l];
            }
        }
        lc(b, a);
        return b;
    }
    function ba(b) {
        return parseInt(b, 10);
    }
    function H() {}
    function pa(b) {
        return b;
    }
    function da(b) {
        return function() {
            return b;
        };
    }
    function A(b) {
        return "undefined" === typeof b;
    }
    function y(b) {
        return "undefined" !== typeof b;
    }
    function I(b) {
        return null !== b && "object" === typeof b;
    }
    function F(b) {
        return "string" === typeof b;
    }
    function V(b) {
        return "number" === typeof b;
    }
    function qa(b) {
        return "[object Date]" === Da.call(b);
    }
    function G(b) {
        return "function" === typeof b;
    }
    function ob(b) {
        return "[object RegExp]" === Da.call(b);
    }
    function Ua(b) {
        return b && b.window === b;
    }
    function Va(b) {
        return b && b.$evalAsync && b.$watch;
    }
    function Wa(b) {
        return "boolean" === typeof b;
    }
    function mc(b) {
        return !(!b || !(b.nodeName || b.prop && b.attr && b.find));
    }
    function Gd(b) {
        var a = {};
        b = b.split(",");
        var c;
        for (c = 0; c < b.length; c++) a[b[c]] = !0;
        return a;
    }
    function ua(b) {
        return Q(b.nodeName || b[0] && b[0].nodeName);
    }
    function Xa(b, a) {
        var c = b.indexOf(a);
        0 <= c && b.splice(c, 1);
        return a;
    }
    function Ea(b, a, c, d) {
        if (Ua(b) || Va(b)) throw Ka("cpws");
        if (a) {
            if (b === a) throw Ka("cpi");
            c = c || [];
            d = d || [];
            if (I(b)) {
                var e = c.indexOf(b);
                if (-1 !== e) return d[e];
                c.push(b);
                d.push(a);
            }
            if (D(b)) for (var f = a.length = 0; f < b.length; f++) e = Ea(b[f], null, c, d), 
            I(b[f]) && (c.push(b[f]), d.push(e)), a.push(e); else {
                var g = a.$$hashKey;
                D(a) ? a.length = 0 : s(a, function(b, c) {
                    delete a[c];
                });
                for (f in b) b.hasOwnProperty(f) && (e = Ea(b[f], null, c, d), I(b[f]) && (c.push(b[f]), 
                d.push(e)), a[f] = e);
                lc(a, g);
            }
        } else if (a = b) D(b) ? a = Ea(b, [], c, d) : qa(b) ? a = new Date(b.getTime()) : ob(b) ? (a = new RegExp(b.source, b.toString().match(/[^\/]*$/)[0]), 
        a.lastIndex = b.lastIndex) : I(b) && (e = Object.create(Object.getPrototypeOf(b)), 
        a = Ea(b, e, c, d));
        return a;
    }
    function ra(b, a) {
        if (D(b)) {
            a = a || [];
            for (var c = 0, d = b.length; c < d; c++) a[c] = b[c];
        } else if (I(b)) for (c in a = a || {}, b) if ("$" !== c.charAt(0) || "$" !== c.charAt(1)) a[c] = b[c];
        return a || b;
    }
    function fa(b, a) {
        if (b === a) return !0;
        if (null === b || null === a) return !1;
        if (b !== b && a !== a) return !0;
        var c = typeof b, d;
        if (c == typeof a && "object" == c) if (D(b)) {
            if (!D(a)) return !1;
            if ((c = b.length) == a.length) {
                for (d = 0; d < c; d++) if (!fa(b[d], a[d])) return !1;
                return !0;
            }
        } else {
            if (qa(b)) return qa(a) ? fa(b.getTime(), a.getTime()) : !1;
            if (ob(b) && ob(a)) return b.toString() == a.toString();
            if (Va(b) || Va(a) || Ua(b) || Ua(a) || D(a)) return !1;
            c = {};
            for (d in b) if ("$" !== d.charAt(0) && !G(b[d])) {
                if (!fa(b[d], a[d])) return !1;
                c[d] = !0;
            }
            for (d in a) if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== t && !G(a[d])) return !1;
            return !0;
        }
        return !1;
    }
    function Ya(b, a, c) {
        return b.concat(Za.call(a, c));
    }
    function nc(b, a) {
        var c = 2 < arguments.length ? Za.call(arguments, 2) : [];
        return !G(a) || a instanceof RegExp ? a : c.length ? function() {
            return arguments.length ? a.apply(b, Ya(c, arguments, 0)) : a.apply(b, c);
        } : function() {
            return arguments.length ? a.apply(b, arguments) : a.call(b);
        };
    }
    function Hd(b, a) {
        var c = a;
        "string" === typeof b && "$" === b.charAt(0) && "$" === b.charAt(1) ? c = t : Ua(a) ? c = "$WINDOW" : a && Y === a ? c = "$DOCUMENT" : Va(a) && (c = "$SCOPE");
        return c;
    }
    function $a(b, a) {
        if ("undefined" === typeof b) return t;
        V(a) || (a = a ? 2 : null);
        return JSON.stringify(b, Hd, a);
    }
    function oc(b) {
        return F(b) ? JSON.parse(b) : b;
    }
    function va(b) {
        b = B(b).clone();
        try {
            b.empty();
        } catch (a) {}
        var c = B("<div>").append(b).html();
        try {
            return b[0].nodeType === pb ? Q(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + Q(b);
            });
        } catch (d) {
            return Q(c);
        }
    }
    function pc(b) {
        try {
            return decodeURIComponent(b);
        } catch (a) {}
    }
    function qc(b) {
        var a = {}, c, d;
        s((b || "").split("&"), function(b) {
            b && (c = b.replace(/\+/g, "%20").split("="), d = pc(c[0]), y(d) && (b = y(c[1]) ? pc(c[1]) : !0, 
            rc.call(a, d) ? D(a[d]) ? a[d].push(b) : a[d] = [ a[d], b ] : a[d] = b));
        });
        return a;
    }
    function Nb(b) {
        var a = [];
        s(b, function(b, d) {
            D(b) ? s(b, function(b) {
                a.push(Fa(d, !0) + (!0 === b ? "" : "=" + Fa(b, !0)));
            }) : a.push(Fa(d, !0) + (!0 === b ? "" : "=" + Fa(b, !0)));
        });
        return a.length ? a.join("&") : "";
    }
    function qb(b) {
        return Fa(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function Fa(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, a ? "%20" : "+");
    }
    function Id(b, a) {
        var c, d, e = rb.length;
        b = B(b);
        for (d = 0; d < e; ++d) if (c = rb[d] + a, F(c = b.attr(c))) return c;
        return null;
    }
    function Jd(b, a) {
        var c, d, e = {};
        s(rb, function(a) {
            a += "app";
            !c && b.hasAttribute && b.hasAttribute(a) && (c = b, d = b.getAttribute(a));
        });
        s(rb, function(a) {
            a += "app";
            var e;
            !c && (e = b.querySelector("[" + a.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(a));
        });
        c && (e.strictDi = null !== Id(c, "strict-di"), a(c, d ? [ d ] : [], e));
    }
    function sc(b, a, c) {
        I(c) || (c = {});
        c = z({
            strictDi: !1
        }, c);
        var d = function() {
            b = B(b);
            if (b.injector()) {
                var d = b[0] === Y ? "document" : va(b);
                throw Ka("btstrpd", d.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            a = a || [];
            a.unshift([ "$provide", function(a) {
                a.value("$rootElement", b);
            } ]);
            c.debugInfoEnabled && a.push([ "$compileProvider", function(a) {
                a.debugInfoEnabled(!0);
            } ]);
            a.unshift("ng");
            d = Ob(a, c.strictDi);
            d.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
                a.$apply(function() {
                    b.data("$injector", d);
                    c(b)(a);
                });
            } ]);
            return d;
        }, e = /^NG_ENABLE_DEBUG_INFO!/, f = /^NG_DEFER_BOOTSTRAP!/;
        M && e.test(M.name) && (c.debugInfoEnabled = !0, M.name = M.name.replace(e, ""));
        if (M && !f.test(M.name)) return d();
        M.name = M.name.replace(f, "");
        ga.resumeBootstrap = function(b) {
            s(b, function(b) {
                a.push(b);
            });
            d();
        };
    }
    function Kd() {
        M.name = "NG_ENABLE_DEBUG_INFO!" + M.name;
        M.location.reload();
    }
    function Ld(b) {
        b = ga.element(b).injector();
        if (!b) throw Ka("test");
        return b.get("$$testability");
    }
    function tc(b, a) {
        a = a || "_";
        return b.replace(Md, function(b, d) {
            return (d ? a : "") + b.toLowerCase();
        });
    }
    function Nd() {
        var b;
        uc || ((sa = M.jQuery) && sa.fn.on ? (B = sa, z(sa.fn, {
            scope: La.scope,
            isolateScope: La.isolateScope,
            controller: La.controller,
            injector: La.injector,
            inheritedData: La.inheritedData
        }), b = sa.cleanData, sa.cleanData = function(a) {
            var c;
            if (Pb) Pb = !1; else for (var d = 0, e; null != (e = a[d]); d++) (c = sa._data(e, "events")) && c.$destroy && sa(e).triggerHandler("$destroy");
            b(a);
        }) : B = R, ga.element = B, uc = !0);
    }
    function Qb(b, a, c) {
        if (!b) throw Ka("areq", a || "?", c || "required");
        return b;
    }
    function sb(b, a, c) {
        c && D(b) && (b = b[b.length - 1]);
        Qb(G(b), a, "not a function, got " + (b && "object" === typeof b ? b.constructor.name || "Object" : typeof b));
        return b;
    }
    function Ma(b, a) {
        if ("hasOwnProperty" === b) throw Ka("badname", a);
    }
    function vc(b, a, c) {
        if (!a) return b;
        a = a.split(".");
        for (var d, e = b, f = a.length, g = 0; g < f; g++) d = a[g], b && (b = (e = b)[d]);
        return !c && G(b) ? nc(e, b) : b;
    }
    function tb(b) {
        var a = b[0];
        b = b[b.length - 1];
        var c = [ a ];
        do {
            a = a.nextSibling;
            if (!a) break;
            c.push(a);
        } while (a !== b);
        return B(c);
    }
    function ha() {
        return Object.create(null);
    }
    function Od(b) {
        function a(a, b, c) {
            return a[b] || (a[b] = c());
        }
        var c = T("$injector"), d = T("ng");
        b = a(b, "angular", Object);
        b.$$minErr = b.$$minErr || T;
        return a(b, "module", function() {
            var b = {};
            return function(f, g, h) {
                if ("hasOwnProperty" === f) throw d("badname", "module");
                g && b.hasOwnProperty(f) && (b[f] = null);
                return a(b, f, function() {
                    function a(c, d, e, f) {
                        f || (f = b);
                        return function() {
                            f[e || "push"]([ c, d, arguments ]);
                            return u;
                        };
                    }
                    if (!g) throw c("nomod", f);
                    var b = [], d = [], e = [], q = a("$injector", "invoke", "push", d), u = {
                        _invokeQueue: b,
                        _configBlocks: d,
                        _runBlocks: e,
                        requires: g,
                        name: f,
                        provider: a("$provide", "provider"),
                        factory: a("$provide", "factory"),
                        service: a("$provide", "service"),
                        value: a("$provide", "value"),
                        constant: a("$provide", "constant", "unshift"),
                        animation: a("$animateProvider", "register"),
                        filter: a("$filterProvider", "register"),
                        controller: a("$controllerProvider", "register"),
                        directive: a("$compileProvider", "directive"),
                        config: q,
                        run: function(a) {
                            e.push(a);
                            return this;
                        }
                    };
                    h && q(h);
                    return u;
                });
            };
        });
    }
    function Pd(b) {
        z(b, {
            bootstrap: sc,
            copy: Ea,
            extend: z,
            equals: fa,
            element: B,
            forEach: s,
            injector: Ob,
            noop: H,
            bind: nc,
            toJson: $a,
            fromJson: oc,
            identity: pa,
            isUndefined: A,
            isDefined: y,
            isString: F,
            isFunction: G,
            isObject: I,
            isNumber: V,
            isElement: mc,
            isArray: D,
            version: Qd,
            isDate: qa,
            lowercase: Q,
            uppercase: ub,
            callbacks: {
                counter: 0
            },
            getTestability: Ld,
            $$minErr: T,
            $$csp: ab,
            reloadWithDebugInfo: Kd
        });
        bb = Od(M);
        try {
            bb("ngLocale");
        } catch (a) {
            bb("ngLocale", []).provider("$locale", Rd);
        }
        bb("ng", [ "ngLocale" ], [ "$provide", function(a) {
            a.provider({
                $$sanitizeUri: Sd
            });
            a.provider("$compile", wc).directive({
                a: Td,
                input: xc,
                textarea: xc,
                form: Ud,
                script: Vd,
                select: Wd,
                style: Xd,
                option: Yd,
                ngBind: Zd,
                ngBindHtml: $d,
                ngBindTemplate: ae,
                ngClass: be,
                ngClassEven: ce,
                ngClassOdd: de,
                ngCloak: ee,
                ngController: fe,
                ngForm: ge,
                ngHide: he,
                ngIf: ie,
                ngInclude: je,
                ngInit: ke,
                ngNonBindable: le,
                ngPluralize: me,
                ngRepeat: ne,
                ngShow: oe,
                ngStyle: pe,
                ngSwitch: qe,
                ngSwitchWhen: re,
                ngSwitchDefault: se,
                ngOptions: te,
                ngTransclude: ue,
                ngModel: ve,
                ngList: we,
                ngChange: xe,
                pattern: yc,
                ngPattern: yc,
                required: zc,
                ngRequired: zc,
                minlength: Ac,
                ngMinlength: Ac,
                maxlength: Bc,
                ngMaxlength: Bc,
                ngValue: ye,
                ngModelOptions: ze
            }).directive({
                ngInclude: Ae
            }).directive(vb).directive(Cc);
            a.provider({
                $anchorScroll: Be,
                $animate: Ce,
                $browser: De,
                $cacheFactory: Ee,
                $controller: Fe,
                $document: Ge,
                $exceptionHandler: He,
                $filter: Dc,
                $interpolate: Ie,
                $interval: Je,
                $http: Ke,
                $httpBackend: Le,
                $location: Me,
                $log: Ne,
                $parse: Oe,
                $rootScope: Pe,
                $q: Qe,
                $$q: Re,
                $sce: Se,
                $sceDelegate: Te,
                $sniffer: Ue,
                $templateCache: Ve,
                $templateRequest: We,
                $$testability: Xe,
                $timeout: Ye,
                $window: Ze,
                $$rAF: $e,
                $$asyncCallback: af,
                $$jqLite: bf
            });
        } ]);
    }
    function cb(b) {
        return b.replace(cf, function(a, b, d, e) {
            return e ? d.toUpperCase() : d;
        }).replace(df, "Moz$1");
    }
    function Ec(b) {
        b = b.nodeType;
        return b === oa || !b || 9 === b;
    }
    function Fc(b, a) {
        var c, d, e = a.createDocumentFragment(), f = [];
        if (Rb.test(b)) {
            c = c || e.appendChild(a.createElement("div"));
            d = (ef.exec(b) || [ "", "" ])[1].toLowerCase();
            d = ia[d] || ia._default;
            c.innerHTML = d[1] + b.replace(ff, "<$1></$2>") + d[2];
            for (d = d[0]; d--; ) c = c.lastChild;
            f = Ya(f, c.childNodes);
            c = e.firstChild;
            c.textContent = "";
        } else f.push(a.createTextNode(b));
        e.textContent = "";
        e.innerHTML = "";
        s(f, function(a) {
            e.appendChild(a);
        });
        return e;
    }
    function R(b) {
        if (b instanceof R) return b;
        var a;
        F(b) && (b = U(b), a = !0);
        if (!(this instanceof R)) {
            if (a && "<" != b.charAt(0)) throw Sb("nosel");
            return new R(b);
        }
        if (a) {
            a = Y;
            var c;
            b = (c = gf.exec(b)) ? [ a.createElement(c[1]) ] : (c = Fc(b, a)) ? c.childNodes : [];
        }
        Gc(this, b);
    }
    function Tb(b) {
        return b.cloneNode(!0);
    }
    function wb(b, a) {
        a || xb(b);
        if (b.querySelectorAll) for (var c = b.querySelectorAll("*"), d = 0, e = c.length; d < e; d++) xb(c[d]);
    }
    function Hc(b, a, c, d) {
        if (y(d)) throw Sb("offargs");
        var e = (d = yb(b)) && d.events, f = d && d.handle;
        if (f) if (a) s(a.split(" "), function(a) {
            if (y(c)) {
                var d = e[a];
                Xa(d || [], c);
                if (d && 0 < d.length) return;
            }
            b.removeEventListener(a, f, !1);
            delete e[a];
        }); else for (a in e) "$destroy" !== a && b.removeEventListener(a, f, !1), delete e[a];
    }
    function xb(b, a) {
        var c = b.ng339, d = c && zb[c];
        d && (a ? delete d.data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), 
        Hc(b)), delete zb[c], b.ng339 = t));
    }
    function yb(b, a) {
        var c = b.ng339, c = c && zb[c];
        a && !c && (b.ng339 = c = ++hf, c = zb[c] = {
            events: {},
            data: {},
            handle: t
        });
        return c;
    }
    function Ub(b, a, c) {
        if (Ec(b)) {
            var d = y(c), e = !d && a && !I(a), f = !a;
            b = (b = yb(b, !e)) && b.data;
            if (d) b[a] = c; else {
                if (f) return b;
                if (e) return b && b[a];
                z(b, a);
            }
        }
    }
    function Ab(b, a) {
        return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1;
    }
    function Bb(b, a) {
        a && b.setAttribute && s(a.split(" "), function(a) {
            b.setAttribute("class", U((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + U(a) + " ", " ")));
        });
    }
    function Cb(b, a) {
        if (a && b.setAttribute) {
            var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            s(a.split(" "), function(a) {
                a = U(a);
                -1 === c.indexOf(" " + a + " ") && (c += a + " ");
            });
            b.setAttribute("class", U(c));
        }
    }
    function Gc(b, a) {
        if (a) if (a.nodeType) b[b.length++] = a; else {
            var c = a.length;
            if ("number" === typeof c && a.window !== a) {
                if (c) for (var d = 0; d < c; d++) b[b.length++] = a[d];
            } else b[b.length++] = a;
        }
    }
    function Ic(b, a) {
        return Db(b, "$" + (a || "ngController") + "Controller");
    }
    function Db(b, a, c) {
        9 == b.nodeType && (b = b.documentElement);
        for (a = D(a) ? a : [ a ]; b; ) {
            for (var d = 0, e = a.length; d < e; d++) if ((c = B.data(b, a[d])) !== t) return c;
            b = b.parentNode || 11 === b.nodeType && b.host;
        }
    }
    function Jc(b) {
        for (wb(b, !0); b.firstChild; ) b.removeChild(b.firstChild);
    }
    function Kc(b, a) {
        a || wb(b);
        var c = b.parentNode;
        c && c.removeChild(b);
    }
    function jf(b, a) {
        a = a || M;
        if ("complete" === a.document.readyState) a.setTimeout(b); else B(a).on("load", b);
    }
    function Lc(b, a) {
        var c = Eb[a.toLowerCase()];
        return c && Mc[ua(b)] && c;
    }
    function kf(b, a) {
        var c = b.nodeName;
        return ("INPUT" === c || "TEXTAREA" === c) && Nc[a];
    }
    function lf(b, a) {
        var c = function(c, e) {
            c.isDefaultPrevented = function() {
                return c.defaultPrevented;
            };
            var f = a[e || c.type], g = f ? f.length : 0;
            if (g) {
                if (A(c.immediatePropagationStopped)) {
                    var h = c.stopImmediatePropagation;
                    c.stopImmediatePropagation = function() {
                        c.immediatePropagationStopped = !0;
                        c.stopPropagation && c.stopPropagation();
                        h && h.call(c);
                    };
                }
                c.isImmediatePropagationStopped = function() {
                    return !0 === c.immediatePropagationStopped;
                };
                1 < g && (f = ra(f));
                for (var l = 0; l < g; l++) c.isImmediatePropagationStopped() || f[l].call(b, c);
            }
        };
        c.elem = b;
        return c;
    }
    function bf() {
        this.$get = function() {
            return z(R, {
                hasClass: function(b, a) {
                    b.attr && (b = b[0]);
                    return Ab(b, a);
                },
                addClass: function(b, a) {
                    b.attr && (b = b[0]);
                    return Cb(b, a);
                },
                removeClass: function(b, a) {
                    b.attr && (b = b[0]);
                    return Bb(b, a);
                }
            });
        };
    }
    function Na(b, a) {
        var c = b && b.$$hashKey;
        if (c) return "function" === typeof c && (c = b.$$hashKey()), c;
        c = typeof b;
        return c = "function" == c || "object" == c && null !== b ? b.$$hashKey = c + ":" + (a || Fd)() : c + ":" + b;
    }
    function db(b, a) {
        if (a) {
            var c = 0;
            this.nextUid = function() {
                return ++c;
            };
        }
        s(b, this.put, this);
    }
    function mf(b) {
        return (b = b.toString().replace(Oc, "").match(Pc)) ? "function(" + (b[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
    }
    function Vb(b, a, c) {
        var d;
        if ("function" === typeof b) {
            if (!(d = b.$inject)) {
                d = [];
                if (b.length) {
                    if (a) throw F(c) && c || (c = b.name || mf(b)), Ga("strictdi", c);
                    a = b.toString().replace(Oc, "");
                    a = a.match(Pc);
                    s(a[1].split(nf), function(a) {
                        a.replace(of, function(a, b, c) {
                            d.push(c);
                        });
                    });
                }
                b.$inject = d;
            }
        } else D(b) ? (a = b.length - 1, sb(b[a], "fn"), d = b.slice(0, a)) : sb(b, "fn", !0);
        return d;
    }
    function Ob(b, a) {
        function c(a) {
            return function(b, c) {
                if (I(b)) s(b, kc(a)); else return a(b, c);
            };
        }
        function d(a, b) {
            Ma(a, "service");
            if (G(b) || D(b)) b = q.instantiate(b);
            if (!b.$get) throw Ga("pget", a);
            return n[a + "Provider"] = b;
        }
        function e(a, b) {
            return function() {
                var c = r.invoke(b, this);
                if (A(c)) throw Ga("undef", a);
                return c;
            };
        }
        function f(a, b, c) {
            return d(a, {
                $get: !1 !== c ? e(a, b) : b
            });
        }
        function g(a) {
            var b = [], c;
            s(a, function(a) {
                function d(a) {
                    var b, c;
                    b = 0;
                    for (c = a.length; b < c; b++) {
                        var e = a[b], f = q.get(e[0]);
                        f[e[1]].apply(f, e[2]);
                    }
                }
                if (!m.get(a)) {
                    m.put(a, !0);
                    try {
                        F(a) ? (c = bb(a), b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), 
                        d(c._configBlocks)) : G(a) ? b.push(q.invoke(a)) : D(a) ? b.push(q.invoke(a)) : sb(a, "module");
                    } catch (e) {
                        throw D(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), 
                        Ga("modulerr", a, e.stack || e.message || e);
                    }
                }
            });
            return b;
        }
        function h(b, c) {
            function d(a, e) {
                if (b.hasOwnProperty(a)) {
                    if (b[a] === l) throw Ga("cdep", a + " <- " + k.join(" <- "));
                    return b[a];
                }
                try {
                    return k.unshift(a), b[a] = l, b[a] = c(a, e);
                } catch (f) {
                    throw b[a] === l && delete b[a], f;
                } finally {
                    k.shift();
                }
            }
            function e(b, c, f, g) {
                "string" === typeof f && (g = f, f = null);
                var h = [], k = Vb(b, a, g), l, q, n;
                q = 0;
                for (l = k.length; q < l; q++) {
                    n = k[q];
                    if ("string" !== typeof n) throw Ga("itkn", n);
                    h.push(f && f.hasOwnProperty(n) ? f[n] : d(n, g));
                }
                D(b) && (b = b[l]);
                return b.apply(c, h);
            }
            return {
                invoke: e,
                instantiate: function(a, b, c) {
                    var d = Object.create((D(a) ? a[a.length - 1] : a).prototype || null);
                    a = e(a, d, b, c);
                    return I(a) || G(a) ? a : d;
                },
                get: d,
                annotate: Vb,
                has: function(a) {
                    return n.hasOwnProperty(a + "Provider") || b.hasOwnProperty(a);
                }
            };
        }
        a = !0 === a;
        var l = {}, k = [], m = new db([], !0), n = {
            $provide: {
                provider: c(d),
                factory: c(f),
                service: c(function(a, b) {
                    return f(a, [ "$injector", function(a) {
                        return a.instantiate(b);
                    } ]);
                }),
                value: c(function(a, b) {
                    return f(a, da(b), !1);
                }),
                constant: c(function(a, b) {
                    Ma(a, "constant");
                    n[a] = b;
                    u[a] = b;
                }),
                decorator: function(a, b) {
                    var c = q.get(a + "Provider"), d = c.$get;
                    c.$get = function() {
                        var a = r.invoke(d, c);
                        return r.invoke(b, null, {
                            $delegate: a
                        });
                    };
                }
            }
        }, q = n.$injector = h(n, function(a, b) {
            ga.isString(b) && k.push(b);
            throw Ga("unpr", k.join(" <- "));
        }), u = {}, r = u.$injector = h(u, function(a, b) {
            var c = q.get(a + "Provider", b);
            return r.invoke(c.$get, c, t, a);
        });
        s(g(b), function(a) {
            r.invoke(a || H);
        });
        return r;
    }
    function Be() {
        var b = !0;
        this.disableAutoScrolling = function() {
            b = !1;
        };
        this.$get = [ "$window", "$location", "$rootScope", function(a, c, d) {
            function e(a) {
                var b = null;
                Array.prototype.some.call(a, function(a) {
                    if ("a" === ua(a)) return b = a, !0;
                });
                return b;
            }
            function f(b) {
                if (b) {
                    b.scrollIntoView();
                    var c;
                    c = g.yOffset;
                    G(c) ? c = c() : mc(c) ? (c = c[0], c = "fixed" !== a.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : V(c) || (c = 0);
                    c && (b = b.getBoundingClientRect().top, a.scrollBy(0, b - c));
                } else a.scrollTo(0, 0);
            }
            function g() {
                var a = c.hash(), b;
                a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null);
            }
            var h = a.document;
            b && d.$watch(function() {
                return c.hash();
            }, function(a, b) {
                a === b && "" === a || jf(function() {
                    d.$evalAsync(g);
                });
            });
            return g;
        } ];
    }
    function af() {
        this.$get = [ "$$rAF", "$timeout", function(b, a) {
            return b.supported ? function(a) {
                return b(a);
            } : function(b) {
                return a(b, 0, !1);
            };
        } ];
    }
    function pf(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, Za.call(arguments, 1));
            } finally {
                if (v--, 0 === v) for (;w.length; ) try {
                    w.pop()();
                } catch (b) {
                    c.error(b);
                }
            }
        }
        function f(a, b) {
            (function N() {
                s(L, function(a) {
                    a();
                });
                C = b(N, a);
            })();
        }
        function g() {
            h();
            l();
        }
        function h() {
            x = b.history.state;
            x = A(x) ? null : x;
            fa(x, J) && (x = J);
            J = x;
        }
        function l() {
            if (E !== m.url() || P !== x) E = m.url(), P = x, s(W, function(a) {
                a(m.url(), x);
            });
        }
        function k(a) {
            try {
                return decodeURIComponent(a);
            } catch (b) {
                return a;
            }
        }
        var m = this, n = a[0], q = b.location, u = b.history, r = b.setTimeout, O = b.clearTimeout, p = {};
        m.isMock = !1;
        var v = 0, w = [];
        m.$$completeOutstandingRequest = e;
        m.$$incOutstandingRequestCount = function() {
            v++;
        };
        m.notifyWhenNoOutstandingRequests = function(a) {
            s(L, function(a) {
                a();
            });
            0 === v ? a() : w.push(a);
        };
        var L = [], C;
        m.addPollFn = function(a) {
            A(C) && f(100, r);
            L.push(a);
            return a;
        };
        var x, P, E = q.href, S = a.find("base"), X = null;
        h();
        P = x;
        m.url = function(a, c, e) {
            A(e) && (e = null);
            q !== b.location && (q = b.location);
            u !== b.history && (u = b.history);
            if (a) {
                var f = P === e;
                if (E === a && (!d.history || f)) return m;
                var g = E && Ha(E) === Ha(a);
                E = a;
                P = e;
                !d.history || g && f ? (g || (X = a), c ? q.replace(a) : g ? (c = q, e = a.indexOf("#"), 
                a = -1 === e ? "" : a.substr(e + 1), c.hash = a) : q.href = a) : (u[c ? "replaceState" : "pushState"](e, "", a), 
                h(), P = x);
                return m;
            }
            return X || q.href.replace(/%27/g, "'");
        };
        m.state = function() {
            return x;
        };
        var W = [], wa = !1, J = null;
        m.onUrlChange = function(a) {
            if (!wa) {
                if (d.history) B(b).on("popstate", g);
                B(b).on("hashchange", g);
                wa = !0;
            }
            W.push(a);
            return a;
        };
        m.$$checkUrlChange = l;
        m.baseHref = function() {
            var a = S.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        };
        var ea = {}, y = "", ca = m.baseHref();
        m.cookies = function(a, b) {
            var d, e, f, g;
            if (a) b === t ? n.cookie = encodeURIComponent(a) + "=;path=" + ca + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : F(b) && (d = (n.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + ";path=" + ca).length + 1, 
            4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!")); else {
                if (n.cookie !== y) for (y = n.cookie, d = y.split("; "), ea = {}, f = 0; f < d.length; f++) e = d[f], 
                g = e.indexOf("="), 0 < g && (a = k(e.substring(0, g)), ea[a] === t && (ea[a] = k(e.substring(g + 1))));
                return ea;
            }
        };
        m.defer = function(a, b) {
            var c;
            v++;
            c = r(function() {
                delete p[c];
                e(a);
            }, b || 0);
            p[c] = !0;
            return c;
        };
        m.defer.cancel = function(a) {
            return p[a] ? (delete p[a], O(a), e(H), !0) : !1;
        };
    }
    function De() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
            return new pf(b, d, a, c);
        } ];
    }
    function Ee() {
        this.$get = function() {
            function b(b, d) {
                function e(a) {
                    a != n && (q ? q == a && (q = a.n) : q = a, f(a.n, a.p), f(a, n), n = a, n.n = null);
                }
                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a));
                }
                if (b in a) throw T("$cacheFactory")("iid", b);
                var g = 0, h = z({}, d, {
                    id: b
                }), l = {}, k = d && d.capacity || Number.MAX_VALUE, m = {}, n = null, q = null;
                return a[b] = {
                    put: function(a, b) {
                        if (k < Number.MAX_VALUE) {
                            var c = m[a] || (m[a] = {
                                key: a
                            });
                            e(c);
                        }
                        if (!A(b)) return a in l || g++, l[a] = b, g > k && this.remove(q.key), b;
                    },
                    get: function(a) {
                        if (k < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            e(b);
                        }
                        return l[a];
                    },
                    remove: function(a) {
                        if (k < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            b == n && (n = b.p);
                            b == q && (q = b.n);
                            f(b.n, b.p);
                            delete m[a];
                        }
                        delete l[a];
                        g--;
                    },
                    removeAll: function() {
                        l = {};
                        g = 0;
                        m = {};
                        n = q = null;
                    },
                    destroy: function() {
                        m = h = l = null;
                        delete a[b];
                    },
                    info: function() {
                        return z({}, h, {
                            size: g
                        });
                    }
                };
            }
            var a = {};
            b.info = function() {
                var b = {};
                s(a, function(a, e) {
                    b[e] = a.info();
                });
                return b;
            };
            b.get = function(b) {
                return a[b];
            };
            return b;
        };
    }
    function Ve() {
        this.$get = [ "$cacheFactory", function(b) {
            return b("templates");
        } ];
    }
    function wc(b, a) {
        function c(a, b) {
            var c = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, d = {};
            s(a, function(a, e) {
                var f = a.match(c);
                if (!f) throw ja("iscp", b, e, a);
                d[e] = {
                    mode: f[1][0],
                    collection: "*" === f[2],
                    optional: "?" === f[3],
                    attrName: f[4] || e
                };
            });
            return d;
        }
        var d = {}, e = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, f = /(([\w\-]+)(?:\:([^;]+))?;?)/, g = Gd("ngSrc,ngSrcset,src,srcset"), h = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, l = /^(on[a-z]+|formaction)$/;
        this.directive = function n(a, e) {
            Ma(a, "directive");
            F(a) ? (Qb(e, "directiveFactory"), d.hasOwnProperty(a) || (d[a] = [], b.factory(a + "Directive", [ "$injector", "$exceptionHandler", function(b, e) {
                var f = [];
                s(d[a], function(d, g) {
                    try {
                        var h = b.invoke(d);
                        G(h) ? h = {
                            compile: da(h)
                        } : !h.compile && h.link && (h.compile = da(h.link));
                        h.priority = h.priority || 0;
                        h.index = g;
                        h.name = h.name || a;
                        h.require = h.require || h.controller && h.name;
                        h.restrict = h.restrict || "EA";
                        I(h.scope) && (h.$$isolateBindings = c(h.scope, h.name));
                        f.push(h);
                    } catch (l) {
                        e(l);
                    }
                });
                return f;
            } ])), d[a].push(e)) : s(a, kc(n));
            return this;
        };
        this.aHrefSanitizationWhitelist = function(b) {
            return y(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist();
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return y(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist();
        };
        var k = !0;
        this.debugInfoEnabled = function(a) {
            return y(a) ? (k = a, this) : k;
        };
        this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, b, c, r, O, p, v, w, L, C, x) {
            function P(a, b) {
                try {
                    a.addClass(b);
                } catch (c) {}
            }
            function E(a, b, c, d, e) {
                a instanceof B || (a = B(a));
                s(a, function(b, c) {
                    b.nodeType == pb && b.nodeValue.match(/\S+/) && (a[c] = B(b).wrap("<span></span>").parent()[0]);
                });
                var f = S(a, b, a, c, d, e);
                E.$$addScopeClass(a);
                var g = null;
                return function(b, c, d) {
                    Qb(b, "scope");
                    d = d || {};
                    var e = d.parentBoundTranscludeFn, h = d.transcludeControllers;
                    d = d.futureParentElement;
                    e && e.$$boundTransclude && (e = e.$$boundTransclude);
                    g || (g = (d = d && d[0]) ? "foreignobject" !== ua(d) && d.toString().match(/SVG/) ? "svg" : "html" : "html");
                    d = "html" !== g ? B(Wb(g, B("<div>").append(a).html())) : c ? La.clone.call(a) : a;
                    if (h) for (var l in h) d.data("$" + l + "Controller", h[l].instance);
                    E.$$addScopeInfo(d, b);
                    c && c(d, b);
                    f && f(b, d, d, e);
                    return d;
                };
            }
            function S(a, b, c, d, e, f) {
                function g(a, c, d, e) {
                    var f, l, k, q, n, p, w;
                    if (r) for (w = Array(c.length), q = 0; q < h.length; q += 3) f = h[q], w[f] = c[f]; else w = c;
                    q = 0;
                    for (n = h.length; q < n; ) l = w[h[q++]], c = h[q++], f = h[q++], c ? (c.scope ? (k = a.$new(), 
                    E.$$addScopeInfo(B(l), k)) : k = a, p = c.transcludeOnThisElement ? X(a, c.transclude, e, c.elementTranscludeOnThisElement) : !c.templateOnThisElement && e ? e : !e && b ? X(a, b) : null, 
                    c(f, k, l, d, p)) : f && f(a, l.childNodes, t, e);
                }
                for (var h = [], l, k, q, n, r, p = 0; p < a.length; p++) {
                    l = new Xb();
                    k = W(a[p], [], l, 0 === p ? d : t, e);
                    (f = k.length ? ea(k, a[p], l, b, c, null, [], [], f) : null) && f.scope && E.$$addScopeClass(l.$$element);
                    l = f && f.terminal || !(q = a[p].childNodes) || !q.length ? null : S(q, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b);
                    if (f || l) h.push(p, f, l), n = !0, r = r || f;
                    f = null;
                }
                return n ? g : null;
            }
            function X(a, b, c, d) {
                return function(d, e, f, g, h) {
                    d || (d = a.$new(!1, h), d.$$transcluded = !0);
                    return b(d, e, {
                        parentBoundTranscludeFn: c,
                        transcludeControllers: f,
                        futureParentElement: g
                    });
                };
            }
            function W(a, b, c, d, g) {
                var h = c.$attr, l;
                switch (a.nodeType) {
                  case oa:
                    ca(b, ya(ua(a)), "E", d, g);
                    for (var k, q, n, r = a.attributes, p = 0, w = r && r.length; p < w; p++) {
                        var O = !1, L = !1;
                        k = r[p];
                        l = k.name;
                        q = U(k.value);
                        k = ya(l);
                        if (n = fb.test(k)) l = l.replace(Rc, "").substr(8).replace(/_(.)/g, function(a, b) {
                            return b.toUpperCase();
                        });
                        var u = k.replace(/(Start|End)$/, "");
                        A(u) && k === u + "Start" && (O = l, L = l.substr(0, l.length - 5) + "end", l = l.substr(0, l.length - 6));
                        k = ya(l.toLowerCase());
                        h[k] = l;
                        if (n || !c.hasOwnProperty(k)) c[k] = q, Lc(a, k) && (c[k] = !0);
                        Pa(a, b, q, k, n);
                        ca(b, k, "A", d, g, O, L);
                    }
                    a = a.className;
                    I(a) && (a = a.animVal);
                    if (F(a) && "" !== a) for (;l = f.exec(a); ) k = ya(l[2]), ca(b, k, "C", d, g) && (c[k] = U(l[3])), 
                    a = a.substr(l.index + l[0].length);
                    break;

                  case pb:
                    M(b, a.nodeValue);
                    break;

                  case 8:
                    try {
                        if (l = e.exec(a.nodeValue)) k = ya(l[1]), ca(b, k, "M", d, g) && (c[k] = U(l[2]));
                    } catch (v) {}
                }
                b.sort(N);
                return b;
            }
            function wa(a, b, c) {
                var d = [], e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw ja("uterdir", b, c);
                        a.nodeType == oa && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
                        d.push(a);
                        a = a.nextSibling;
                    } while (0 < e);
                } else d.push(a);
                return B(d);
            }
            function J(a, b, c) {
                return function(d, e, f, g, h) {
                    e = wa(e[0], b, c);
                    return a(d, e, f, g, h);
                };
            }
            function ea(a, d, e, f, g, l, k, n, r) {
                function w(a, b, c, d) {
                    if (a) {
                        c && (a = J(a, c, d));
                        a.require = K.require;
                        a.directiveName = z;
                        if (S === K || K.$$isolateScope) a = Z(a, {
                            isolateScope: !0
                        });
                        k.push(a);
                    }
                    if (b) {
                        c && (b = J(b, c, d));
                        b.require = K.require;
                        b.directiveName = z;
                        if (S === K || K.$$isolateScope) b = Z(b, {
                            isolateScope: !0
                        });
                        n.push(b);
                    }
                }
                function L(a, b, c, d) {
                    var e, f = "data", g = !1, l = c, k;
                    if (F(b)) {
                        k = b.match(h);
                        b = b.substring(k[0].length);
                        k[3] && (k[1] ? k[3] = null : k[1] = k[3]);
                        "^" === k[1] ? f = "inheritedData" : "^^" === k[1] && (f = "inheritedData", l = c.parent());
                        "?" === k[2] && (g = !0);
                        e = null;
                        d && "data" === f && (e = d[b]) && (e = e.instance);
                        e = e || l[f]("$" + b + "Controller");
                        if (!e && !g) throw ja("ctreq", b, a);
                        return e || null;
                    }
                    D(b) && (e = [], s(b, function(b) {
                        e.push(L(a, b, c, d));
                    }));
                    return e;
                }
                function v(a, c, f, g, h) {
                    function l(a, b, c) {
                        var d;
                        Va(a) || (c = b, b = a, a = t);
                        H && (d = P);
                        c || (c = H ? W.parent() : W);
                        return h(a, b, d, c, wa);
                    }
                    var r, w, u, x, P, eb, W, J;
                    d === f ? (J = e, W = e.$$element) : (W = B(f), J = new Xb(W, e));
                    S && (x = c.$new(!0));
                    h && (eb = l, eb.$$boundTransclude = h);
                    C && (X = {}, P = {}, s(C, function(a) {
                        var b = {
                            $scope: a === S || a.$$isolateScope ? x : c,
                            $element: W,
                            $attrs: J,
                            $transclude: eb
                        };
                        u = a.controller;
                        "@" == u && (u = J[a.name]);
                        b = p(u, b, !0, a.controllerAs);
                        P[a.name] = b;
                        H || W.data("$" + a.name + "Controller", b.instance);
                        X[a.name] = b;
                    }));
                    if (S) {
                        E.$$addScopeInfo(W, x, !0, !(ka && (ka === S || ka === S.$$originalDirective)));
                        E.$$addScopeClass(W, !0);
                        g = X && X[S.name];
                        var xa = x;
                        g && g.identifier && !0 === S.bindToController && (xa = g.instance);
                        s(x.$$isolateBindings = S.$$isolateBindings, function(a, d) {
                            var e = a.attrName, f = a.optional, g, h, l, k;
                            switch (a.mode) {
                              case "@":
                                J.$observe(e, function(a) {
                                    xa[d] = a;
                                });
                                J.$$observers[e].$$scope = c;
                                J[e] && (xa[d] = b(J[e])(c));
                                break;

                              case "=":
                                if (f && !J[e]) break;
                                h = O(J[e]);
                                k = h.literal ? fa : function(a, b) {
                                    return a === b || a !== a && b !== b;
                                };
                                l = h.assign || function() {
                                    g = xa[d] = h(c);
                                    throw ja("nonassign", J[e], S.name);
                                };
                                g = xa[d] = h(c);
                                f = function(a) {
                                    k(a, xa[d]) || (k(a, g) ? l(c, a = xa[d]) : xa[d] = a);
                                    return g = a;
                                };
                                f.$stateful = !0;
                                f = a.collection ? c.$watchCollection(J[e], f) : c.$watch(O(J[e], f), null, h.literal);
                                x.$on("$destroy", f);
                                break;

                              case "&":
                                h = O(J[e]), xa[d] = function(a) {
                                    return h(c, a);
                                };
                            }
                        });
                    }
                    X && (s(X, function(a) {
                        a();
                    }), X = null);
                    g = 0;
                    for (r = k.length; g < r; g++) w = k[g], $(w, w.isolateScope ? x : c, W, J, w.require && L(w.directiveName, w.require, W, P), eb);
                    var wa = c;
                    S && (S.template || null === S.templateUrl) && (wa = x);
                    a && a(wa, f.childNodes, t, h);
                    for (g = n.length - 1; 0 <= g; g--) w = n[g], $(w, w.isolateScope ? x : c, W, J, w.require && L(w.directiveName, w.require, W, P), eb);
                }
                r = r || {};
                for (var x = -Number.MAX_VALUE, P, C = r.controllerDirectives, X, S = r.newIsolateScopeDirective, ka = r.templateDirective, ea = r.nonTlbTranscludeDirective, ca = !1, A = !1, H = r.hasElementTranscludeDirective, aa = e.$$element = B(d), K, z, N, Aa = f, Q, M = 0, R = a.length; M < R; M++) {
                    K = a[M];
                    var Pa = K.$$start, fb = K.$$end;
                    Pa && (aa = wa(d, Pa, fb));
                    N = t;
                    if (x > K.priority) break;
                    if (N = K.scope) K.templateUrl || (I(N) ? (Oa("new/isolated scope", S || P, K, aa), 
                    S = K) : Oa("new/isolated scope", S, K, aa)), P = P || K;
                    z = K.name;
                    !K.templateUrl && K.controller && (N = K.controller, C = C || {}, Oa("'" + z + "' controller", C[z], K, aa), 
                    C[z] = K);
                    if (N = K.transclude) ca = !0, K.$$tlb || (Oa("transclusion", ea, K, aa), ea = K), 
                    "element" == N ? (H = !0, x = K.priority, N = aa, aa = e.$$element = B(Y.createComment(" " + z + ": " + e[z] + " ")), 
                    d = aa[0], V(g, Za.call(N, 0), d), Aa = E(N, f, x, l && l.name, {
                        nonTlbTranscludeDirective: ea
                    })) : (N = B(Tb(d)).contents(), aa.empty(), Aa = E(N, f));
                    if (K.template) if (A = !0, Oa("template", ka, K, aa), ka = K, N = G(K.template) ? K.template(aa, e) : K.template, 
                    N = Sc(N), K.replace) {
                        l = K;
                        N = Rb.test(N) ? Tc(Wb(K.templateNamespace, U(N))) : [];
                        d = N[0];
                        if (1 != N.length || d.nodeType !== oa) throw ja("tplrt", z, "");
                        V(g, aa, d);
                        R = {
                            $attr: {}
                        };
                        N = W(d, [], R);
                        var ba = a.splice(M + 1, a.length - (M + 1));
                        S && y(N);
                        a = a.concat(N).concat(ba);
                        Qc(e, R);
                        R = a.length;
                    } else aa.html(N);
                    if (K.templateUrl) A = !0, Oa("template", ka, K, aa), ka = K, K.replace && (l = K), 
                    v = T(a.splice(M, a.length - M), aa, e, g, ca && Aa, k, n, {
                        controllerDirectives: C,
                        newIsolateScopeDirective: S,
                        templateDirective: ka,
                        nonTlbTranscludeDirective: ea
                    }), R = a.length; else if (K.compile) try {
                        Q = K.compile(aa, e, Aa), G(Q) ? w(null, Q, Pa, fb) : Q && w(Q.pre, Q.post, Pa, fb);
                    } catch (qf) {
                        c(qf, va(aa));
                    }
                    K.terminal && (v.terminal = !0, x = Math.max(x, K.priority));
                }
                v.scope = P && !0 === P.scope;
                v.transcludeOnThisElement = ca;
                v.elementTranscludeOnThisElement = H;
                v.templateOnThisElement = A;
                v.transclude = Aa;
                r.hasElementTranscludeDirective = H;
                return v;
            }
            function y(a) {
                for (var b = 0, c = a.length; b < c; b++) {
                    var d = b, e;
                    e = z(Object.create(a[b]), {
                        $$isolateScope: !0
                    });
                    a[d] = e;
                }
            }
            function ca(b, e, f, g, h, l, k) {
                if (e === h) return null;
                h = null;
                if (d.hasOwnProperty(e)) {
                    var q;
                    e = a.get(e + "Directive");
                    for (var r = 0, p = e.length; r < p; r++) try {
                        if (q = e[r], (g === t || g > q.priority) && -1 != q.restrict.indexOf(f)) {
                            if (l) {
                                var w = {
                                    $$start: l,
                                    $$end: k
                                };
                                q = z(Object.create(q), w);
                            }
                            b.push(q);
                            h = q;
                        }
                    } catch (O) {
                        c(O);
                    }
                }
                return h;
            }
            function A(b) {
                if (d.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), e = 0, f = c.length; e < f; e++) if (b = c[e], 
                b.multiElement) return !0;
                return !1;
            }
            function Qc(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                s(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), 
                    a.$set(e, d, !0, c[e]));
                });
                s(b, function(b, f) {
                    "class" == f ? (P(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), 
                    a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, 
                    d[f] = c[f]);
                });
            }
            function T(a, b, c, d, e, f, g, h) {
                var l = [], k, q, n = b[0], p = a.shift(), w = z({}, p, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: p
                }), O = G(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl, u = p.templateNamespace;
                b.empty();
                r(L.getTrustedResourceUrl(O)).then(function(r) {
                    var L, v;
                    r = Sc(r);
                    if (p.replace) {
                        r = Rb.test(r) ? Tc(Wb(u, U(r))) : [];
                        L = r[0];
                        if (1 != r.length || L.nodeType !== oa) throw ja("tplrt", p.name, O);
                        r = {
                            $attr: {}
                        };
                        V(d, b, L);
                        var x = W(L, [], r);
                        I(p.scope) && y(x);
                        a = x.concat(a);
                        Qc(c, r);
                    } else L = n, b.html(r);
                    a.unshift(w);
                    k = ea(a, L, c, e, b, p, f, g, h);
                    s(d, function(a, c) {
                        a == L && (d[c] = b[0]);
                    });
                    for (q = S(b[0].childNodes, e); l.length; ) {
                        r = l.shift();
                        v = l.shift();
                        var C = l.shift(), E = l.shift(), x = b[0];
                        if (!r.$$destroyed) {
                            if (v !== n) {
                                var J = v.className;
                                h.hasElementTranscludeDirective && p.replace || (x = Tb(L));
                                V(C, B(v), x);
                                P(B(x), J);
                            }
                            v = k.transcludeOnThisElement ? X(r, k.transclude, E) : E;
                            k(q, r, x, d, v);
                        }
                    }
                    l = null;
                });
                return function(a, b, c, d, e) {
                    a = e;
                    b.$$destroyed || (l ? l.push(b, c, d, a) : (k.transcludeOnThisElement && (a = X(b, k.transclude, e)), 
                    k(q, b, c, d, a)));
                };
            }
            function N(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function Oa(a, b, c, d) {
                if (b) throw ja("multidir", b.name, c.name, a, va(d));
            }
            function M(a, c) {
                var d = b(c, !0);
                d && a.push({
                    priority: 0,
                    compile: function(a) {
                        a = a.parent();
                        var b = !!a.length;
                        b && E.$$addBindingClass(a);
                        return function(a, c) {
                            var e = c.parent();
                            b || E.$$addBindingClass(e);
                            E.$$addBindingInfo(e, d.expressions);
                            a.$watch(d, function(a) {
                                c[0].nodeValue = a;
                            });
                        };
                    }
                });
            }
            function Wb(a, b) {
                a = Q(a || "html");
                switch (a) {
                  case "svg":
                  case "math":
                    var c = Y.createElement("div");
                    c.innerHTML = "<" + a + ">" + b + "</" + a + ">";
                    return c.childNodes[0].childNodes;

                  default:
                    return b;
                }
            }
            function R(a, b) {
                if ("srcdoc" == b) return L.HTML;
                var c = ua(a);
                if ("xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b)) return L.RESOURCE_URL;
            }
            function Pa(a, c, d, e, f) {
                var h = R(a, e);
                f = g[e] || f;
                var k = b(d, !0, h, f);
                if (k) {
                    if ("multiple" === e && "select" === ua(a)) throw ja("selmulti", va(a));
                    c.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(a, c, g) {
                                    c = g.$$observers || (g.$$observers = {});
                                    if (l.test(e)) throw ja("nodomevents");
                                    var n = g[e];
                                    n !== d && (k = n && b(n, !0, h, f), d = n);
                                    k && (g[e] = k(a), (c[e] || (c[e] = [])).$$inter = !0, (g.$$observers && g.$$observers[e].$$scope || a).$watch(k, function(a, b) {
                                        "class" === e && a != b ? g.$updateClass(a, b) : g.$set(e, a);
                                    }));
                                }
                            };
                        }
                    });
                }
            }
            function V(a, b, c) {
                var d = b[0], e = b.length, f = d.parentNode, g, h;
                if (a) for (g = 0, h = a.length; g < h; g++) if (a[g] == d) {
                    a[g++] = c;
                    h = g + e - 1;
                    for (var l = a.length; g < l; g++, h++) h < l ? a[g] = a[h] : delete a[g];
                    a.length -= e - 1;
                    a.context === d && (a.context = c);
                    break;
                }
                f && f.replaceChild(c, d);
                a = Y.createDocumentFragment();
                a.appendChild(d);
                B(c).data(B(d).data());
                sa ? (Pb = !0, sa.cleanData([ d ])) : delete B.cache[d[B.expando]];
                d = 1;
                for (e = b.length; d < e; d++) f = b[d], B(f).remove(), a.appendChild(f), delete b[d];
                b[0] = c;
                b.length = 1;
            }
            function Z(a, b) {
                return z(function() {
                    return a.apply(null, arguments);
                }, a, b);
            }
            function $(a, b, d, e, f, g) {
                try {
                    a(b, d, e, f, g);
                } catch (h) {
                    c(h, va(d));
                }
            }
            var Xb = function(a, b) {
                if (b) {
                    var c = Object.keys(b), d, e, f;
                    d = 0;
                    for (e = c.length; d < e; d++) f = c[d], this[f] = b[f];
                } else this.$attr = {};
                this.$$element = a;
            };
            Xb.prototype = {
                $normalize: ya,
                $addClass: function(a) {
                    a && 0 < a.length && C.addClass(this.$$element, a);
                },
                $removeClass: function(a) {
                    a && 0 < a.length && C.removeClass(this.$$element, a);
                },
                $updateClass: function(a, b) {
                    var c = Uc(a, b);
                    c && c.length && C.addClass(this.$$element, c);
                    (c = Uc(b, a)) && c.length && C.removeClass(this.$$element, c);
                },
                $set: function(a, b, d, e) {
                    var f = this.$$element[0], g = Lc(f, a), h = kf(f, a), f = a;
                    g ? (this.$$element.prop(a, b), e = g) : h && (this[h] = b, f = h);
                    this[a] = b;
                    e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = tc(a, "-"));
                    g = ua(this.$$element);
                    if ("a" === g && "href" === a || "img" === g && "src" === a) this[a] = b = x(b, "src" === a); else if ("img" === g && "srcset" === a) {
                        for (var g = "", h = U(b), l = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, l = /\s/.test(h) ? l : /(,)/, h = h.split(l), l = Math.floor(h.length / 2), k = 0; k < l; k++) var q = 2 * k, g = g + x(U(h[q]), !0), g = g + (" " + U(h[q + 1]));
                        h = U(h[2 * k]).split(/\s/);
                        g += x(U(h[0]), !0);
                        2 === h.length && (g += " " + U(h[1]));
                        this[a] = b = g;
                    }
                    !1 !== d && (null === b || b === t ? this.$$element.removeAttr(e) : this.$$element.attr(e, b));
                    (a = this.$$observers) && s(a[f], function(a) {
                        try {
                            a(b);
                        } catch (d) {
                            c(d);
                        }
                    });
                },
                $observe: function(a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = ha()), e = d[a] || (d[a] = []);
                    e.push(b);
                    v.$evalAsync(function() {
                        !e.$$inter && c.hasOwnProperty(a) && b(c[a]);
                    });
                    return function() {
                        Xa(e, b);
                    };
                }
            };
            var Aa = b.startSymbol(), ka = b.endSymbol(), Sc = "{{" == Aa || "}}" == ka ? pa : function(a) {
                return a.replace(/\{\{/g, Aa).replace(/}}/g, ka);
            }, fb = /^ngAttr[A-Z]/;
            E.$$addBindingInfo = k ? function(a, b) {
                var c = a.data("$binding") || [];
                D(b) ? c = c.concat(b) : c.push(b);
                a.data("$binding", c);
            } : H;
            E.$$addBindingClass = k ? function(a) {
                P(a, "ng-binding");
            } : H;
            E.$$addScopeInfo = k ? function(a, b, c, d) {
                a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b);
            } : H;
            E.$$addScopeClass = k ? function(a, b) {
                P(a, b ? "ng-isolate-scope" : "ng-scope");
            } : H;
            return E;
        } ];
    }
    function ya(b) {
        return cb(b.replace(Rc, ""));
    }
    function Uc(b, a) {
        var c = "", d = b.split(/\s+/), e = a.split(/\s+/), f = 0;
        a: for (;f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++) if (g == e[h]) continue a;
            c += (0 < c.length ? " " : "") + g;
        }
        return c;
    }
    function Tc(b) {
        b = B(b);
        var a = b.length;
        if (1 >= a) return b;
        for (;a--; ) 8 === b[a].nodeType && rf.call(b, a, 1);
        return b;
    }
    function Fe() {
        var b = {}, a = !1, c = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(a, c) {
            Ma(a, "controller");
            I(a) ? z(b, a) : b[a] = c;
        };
        this.allowGlobals = function() {
            a = !0;
        };
        this.$get = [ "$injector", "$window", function(d, e) {
            function f(a, b, c, d) {
                if (!a || !I(a.$scope)) throw T("$controller")("noscp", d, b);
                a.$scope[b] = c;
            }
            return function(g, h, l, k) {
                var m, n, q;
                l = !0 === l;
                k && F(k) && (q = k);
                F(g) && (k = g.match(c), n = k[1], q = q || k[3], g = b.hasOwnProperty(n) ? b[n] : vc(h.$scope, n, !0) || (a ? vc(e, n, !0) : t), 
                sb(g, n, !0));
                if (l) return l = (D(g) ? g[g.length - 1] : g).prototype, m = Object.create(l || null), 
                q && f(h, q, m, n || g.name), z(function() {
                    d.invoke(g, m, h, n);
                    return m;
                }, {
                    instance: m,
                    identifier: q
                });
                m = d.instantiate(g, h, n);
                q && f(h, q, m, n || g.name);
                return m;
            };
        } ];
    }
    function Ge() {
        this.$get = [ "$window", function(b) {
            return B(b.document);
        } ];
    }
    function He() {
        this.$get = [ "$log", function(b) {
            return function(a, c) {
                b.error.apply(b, arguments);
            };
        } ];
    }
    function Yb(b, a) {
        if (F(b)) {
            var c = b.replace(sf, "").trim();
            if (c) {
                var d = a("Content-Type");
                (d = d && 0 === d.indexOf(Vc)) || (d = (d = c.match(tf)) && uf[d[0]].test(c));
                d && (b = oc(c));
            }
        }
        return b;
    }
    function Wc(b) {
        var a = ha(), c, d, e;
        if (!b) return a;
        s(b.split("\n"), function(b) {
            e = b.indexOf(":");
            c = Q(U(b.substr(0, e)));
            d = U(b.substr(e + 1));
            c && (a[c] = a[c] ? a[c] + ", " + d : d);
        });
        return a;
    }
    function Xc(b) {
        var a = I(b) ? b : t;
        return function(c) {
            a || (a = Wc(b));
            return c ? (c = a[Q(c)], void 0 === c && (c = null), c) : a;
        };
    }
    function Yc(b, a, c, d) {
        if (G(d)) return d(b, a, c);
        s(d, function(d) {
            b = d(b, a, c);
        });
        return b;
    }
    function Ke() {
        var b = this.defaults = {
            transformResponse: [ Yb ],
            transformRequest: [ function(a) {
                return I(a) && "[object File]" !== Da.call(a) && "[object Blob]" !== Da.call(a) && "[object FormData]" !== Da.call(a) ? $a(a) : a;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: ra(Zb),
                put: ra(Zb),
                patch: ra(Zb)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, a = !1;
        this.useApplyAsync = function(b) {
            return y(b) ? (a = !!b, this) : a;
        };
        var c = this.interceptors = [];
        this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(d, e, f, g, h, l) {
            function k(a) {
                function c(a) {
                    var b = z({}, a);
                    b.data = a.data ? Yc(a.data, a.headers, a.status, e.transformResponse) : a.data;
                    a = a.status;
                    return 200 <= a && 300 > a ? b : h.reject(b);
                }
                function d(a) {
                    var b, c = {};
                    s(a, function(a, d) {
                        G(a) ? (b = a(), null != b && (c[d] = b)) : c[d] = a;
                    });
                    return c;
                }
                if (!ga.isObject(a)) throw T("$http")("badreq", a);
                var e = z({
                    method: "get",
                    transformRequest: b.transformRequest,
                    transformResponse: b.transformResponse
                }, a);
                e.headers = function(a) {
                    var c = b.headers, e = z({}, a.headers), f, g, c = z({}, c.common, c[Q(a.method)]);
                    a: for (f in c) {
                        a = Q(f);
                        for (g in e) if (Q(g) === a) continue a;
                        e[f] = c[f];
                    }
                    return d(e);
                }(a);
                e.method = ub(e.method);
                var f = [ function(a) {
                    var d = a.headers, e = Yc(a.data, Xc(d), t, a.transformRequest);
                    A(e) && s(d, function(a, b) {
                        "content-type" === Q(b) && delete d[b];
                    });
                    A(a.withCredentials) && !A(b.withCredentials) && (a.withCredentials = b.withCredentials);
                    return m(a, e).then(c, c);
                }, t ], g = h.when(e);
                for (s(u, function(a) {
                    (a.request || a.requestError) && f.unshift(a.request, a.requestError);
                    (a.response || a.responseError) && f.push(a.response, a.responseError);
                }); f.length; ) {
                    a = f.shift();
                    var l = f.shift(), g = g.then(a, l);
                }
                g.success = function(a) {
                    g.then(function(b) {
                        a(b.data, b.status, b.headers, e);
                    });
                    return g;
                };
                g.error = function(a) {
                    g.then(null, function(b) {
                        a(b.data, b.status, b.headers, e);
                    });
                    return g;
                };
                return g;
            }
            function m(c, f) {
                function l(b, c, d, e) {
                    function f() {
                        m(c, b, d, e);
                    }
                    P && (200 <= b && 300 > b ? P.put(X, [ b, c, Wc(d), e ]) : P.remove(X));
                    a ? g.$applyAsync(f) : (f(), g.$$phase || g.$apply());
                }
                function m(a, b, d, e) {
                    b = Math.max(b, 0);
                    (200 <= b && 300 > b ? C.resolve : C.reject)({
                        data: a,
                        status: b,
                        headers: Xc(d),
                        config: c,
                        statusText: e
                    });
                }
                function w(a) {
                    m(a.data, a.status, ra(a.headers()), a.statusText);
                }
                function u() {
                    var a = k.pendingRequests.indexOf(c);
                    -1 !== a && k.pendingRequests.splice(a, 1);
                }
                var C = h.defer(), x = C.promise, P, E, s = c.headers, X = n(c.url, c.params);
                k.pendingRequests.push(c);
                x.then(u, u);
                !c.cache && !b.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (P = I(c.cache) ? c.cache : I(b.cache) ? b.cache : q);
                P && (E = P.get(X), y(E) ? E && G(E.then) ? E.then(w, w) : D(E) ? m(E[1], E[0], ra(E[2]), E[3]) : m(E, 200, {}, "OK") : P.put(X, x));
                A(E) && ((E = Zc(c.url) ? e.cookies()[c.xsrfCookieName || b.xsrfCookieName] : t) && (s[c.xsrfHeaderName || b.xsrfHeaderName] = E), 
                d(c.method, X, f, l, s, c.timeout, c.withCredentials, c.responseType));
                return x;
            }
            function n(a, b) {
                if (!b) return a;
                var c = [];
                Ed(b, function(a, b) {
                    null === a || A(a) || (D(a) || (a = [ a ]), s(a, function(a) {
                        I(a) && (a = qa(a) ? a.toISOString() : $a(a));
                        c.push(Fa(b) + "=" + Fa(a));
                    }));
                });
                0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&"));
                return a;
            }
            var q = f("$http"), u = [];
            s(c, function(a) {
                u.unshift(F(a) ? l.get(a) : l.invoke(a));
            });
            k.pendingRequests = [];
            (function(a) {
                s(arguments, function(a) {
                    k[a] = function(b, c) {
                        return k(z(c || {}, {
                            method: a,
                            url: b
                        }));
                    };
                });
            })("get", "delete", "head", "jsonp");
            (function(a) {
                s(arguments, function(a) {
                    k[a] = function(b, c, d) {
                        return k(z(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }));
                    };
                });
            })("post", "put", "patch");
            k.defaults = b;
            return k;
        } ];
    }
    function vf() {
        return new M.XMLHttpRequest();
    }
    function Le() {
        this.$get = [ "$browser", "$window", "$document", function(b, a, c) {
            return wf(b, vf, b.defer, a.angular.callbacks, c[0]);
        } ];
    }
    function wf(b, a, c, d, e) {
        function f(a, b, c) {
            var f = e.createElement("script"), m = null;
            f.type = "text/javascript";
            f.src = a;
            f.async = !0;
            m = function(a) {
                f.removeEventListener("load", m, !1);
                f.removeEventListener("error", m, !1);
                e.body.removeChild(f);
                f = null;
                var g = -1, u = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {
                    type: "error"
                }), u = a.type, g = "error" === a.type ? 404 : 200);
                c && c(g, u);
            };
            f.addEventListener("load", m, !1);
            f.addEventListener("error", m, !1);
            e.body.appendChild(f);
            return m;
        }
        return function(e, h, l, k, m, n, q, u) {
            function r() {
                v && v();
                w && w.abort();
            }
            function O(a, d, e, f, g) {
                C !== t && c.cancel(C);
                v = w = null;
                a(d, e, f, g);
                b.$$completeOutstandingRequest(H);
            }
            b.$$incOutstandingRequestCount();
            h = h || b.url();
            if ("jsonp" == Q(e)) {
                var p = "_" + (d.counter++).toString(36);
                d[p] = function(a) {
                    d[p].data = a;
                    d[p].called = !0;
                };
                var v = f(h.replace("JSON_CALLBACK", "angular.callbacks." + p), p, function(a, b) {
                    O(k, a, d[p].data, "", b);
                    d[p] = H;
                });
            } else {
                var w = a();
                w.open(e, h, !0);
                s(m, function(a, b) {
                    y(a) && w.setRequestHeader(b, a);
                });
                w.onload = function() {
                    var a = w.statusText || "", b = "response" in w ? w.response : w.responseText, c = 1223 === w.status ? 204 : w.status;
                    0 === c && (c = b ? 200 : "file" == Ba(h).protocol ? 404 : 0);
                    O(k, c, b, w.getAllResponseHeaders(), a);
                };
                e = function() {
                    O(k, -1, null, null, "");
                };
                w.onerror = e;
                w.onabort = e;
                q && (w.withCredentials = !0);
                if (u) try {
                    w.responseType = u;
                } catch (L) {
                    if ("json" !== u) throw L;
                }
                w.send(l || null);
            }
            if (0 < n) var C = c(r, n); else n && G(n.then) && n.then(r);
        };
    }
    function Ie() {
        var b = "{{", a = "}}";
        this.startSymbol = function(a) {
            return a ? (b = a, this) : b;
        };
        this.endSymbol = function(b) {
            return b ? (a = b, this) : a;
        };
        this.$get = [ "$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(a) {
                return "\\\\\\" + a;
            }
            function g(f, g, u, r) {
                function O(c) {
                    return c.replace(k, b).replace(m, a);
                }
                function p(a) {
                    try {
                        var b = a;
                        a = u ? e.getTrusted(u, b) : e.valueOf(b);
                        var c;
                        if (r && !y(a)) c = a; else if (null == a) c = ""; else {
                            switch (typeof a) {
                              case "string":
                                break;

                              case "number":
                                a = "" + a;
                                break;

                              default:
                                a = $a(a);
                            }
                            c = a;
                        }
                        return c;
                    } catch (g) {
                        c = $b("interr", f, g.toString()), d(c);
                    }
                }
                r = !!r;
                for (var v, w, L = 0, C = [], x = [], P = f.length, E = [], s = []; L < P; ) if (-1 != (v = f.indexOf(b, L)) && -1 != (w = f.indexOf(a, v + h))) L !== v && E.push(O(f.substring(L, v))), 
                L = f.substring(v + h, w), C.push(L), x.push(c(L, p)), L = w + l, s.push(E.length), 
                E.push(""); else {
                    L !== P && E.push(O(f.substring(L)));
                    break;
                }
                if (u && 1 < E.length) throw $b("noconcat", f);
                if (!g || C.length) {
                    var X = function(a) {
                        for (var b = 0, c = C.length; b < c; b++) {
                            if (r && A(a[b])) return;
                            E[s[b]] = a[b];
                        }
                        return E.join("");
                    };
                    return z(function(a) {
                        var b = 0, c = C.length, e = Array(c);
                        try {
                            for (;b < c; b++) e[b] = x[b](a);
                            return X(e);
                        } catch (g) {
                            a = $b("interr", f, g.toString()), d(a);
                        }
                    }, {
                        exp: f,
                        expressions: C,
                        $$watchDelegate: function(a, b, c) {
                            var d;
                            return a.$watchGroup(x, function(c, e) {
                                var f = X(c);
                                G(b) && b.call(this, f, c !== e ? d : f, a);
                                d = f;
                            }, c);
                        }
                    });
                }
            }
            var h = b.length, l = a.length, k = new RegExp(b.replace(/./g, f), "g"), m = new RegExp(a.replace(/./g, f), "g");
            g.startSymbol = function() {
                return b;
            };
            g.endSymbol = function() {
                return a;
            };
            return g;
        } ];
    }
    function Je() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function(b, a, c, d) {
            function e(e, h, l, k) {
                var m = a.setInterval, n = a.clearInterval, q = 0, u = y(k) && !k, r = (u ? d : c).defer(), O = r.promise;
                l = y(l) ? l : 0;
                O.then(null, null, e);
                O.$$intervalId = m(function() {
                    r.notify(q++);
                    0 < l && q >= l && (r.resolve(q), n(O.$$intervalId), delete f[O.$$intervalId]);
                    u || b.$apply();
                }, h);
                f[O.$$intervalId] = r;
                return O;
            }
            var f = {};
            e.cancel = function(b) {
                return b && b.$$intervalId in f ? (f[b.$$intervalId].reject("canceled"), a.clearInterval(b.$$intervalId), 
                delete f[b.$$intervalId], !0) : !1;
            };
            return e;
        } ];
    }
    function Rd() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [ {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    } ],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: [ "AM", "PM" ],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(b) {
                    return 1 === b ? "one" : "other";
                }
            };
        };
    }
    function ac(b) {
        b = b.split("/");
        for (var a = b.length; a--; ) b[a] = qb(b[a]);
        return b.join("/");
    }
    function $c(b, a) {
        var c = Ba(b);
        a.$$protocol = c.protocol;
        a.$$host = c.hostname;
        a.$$port = ba(c.port) || xf[c.protocol] || null;
    }
    function ad(b, a) {
        var c = "/" !== b.charAt(0);
        c && (b = "/" + b);
        var d = Ba(b);
        a.$$path = decodeURIComponent(c && "/" === d.pathname.charAt(0) ? d.pathname.substring(1) : d.pathname);
        a.$$search = qc(d.search);
        a.$$hash = decodeURIComponent(d.hash);
        a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path);
    }
    function za(b, a) {
        if (0 === a.indexOf(b)) return a.substr(b.length);
    }
    function Ha(b) {
        var a = b.indexOf("#");
        return -1 == a ? b : b.substr(0, a);
    }
    function bd(b) {
        return b.replace(/(#.+)|#$/, "$1");
    }
    function bc(b) {
        return b.substr(0, Ha(b).lastIndexOf("/") + 1);
    }
    function cc(b, a) {
        this.$$html5 = !0;
        a = a || "";
        var c = bc(b);
        $c(b, this);
        this.$$parse = function(a) {
            var b = za(c, a);
            if (!F(b)) throw Fb("ipthprfx", a, c);
            ad(b, this);
            this.$$path || (this.$$path = "/");
            this.$$compose();
        };
        this.$$compose = function() {
            var a = Nb(this.$$search), b = this.$$hash ? "#" + qb(this.$$hash) : "";
            this.$$url = ac(this.$$path) + (a ? "?" + a : "") + b;
            this.$$absUrl = c + this.$$url.substr(1);
        };
        this.$$parseLinkUrl = function(d, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            (f = za(b, d)) !== t ? (g = f, g = (f = za(a, f)) !== t ? c + (za("/", f) || f) : b + g) : (f = za(c, d)) !== t ? g = c + f : c == d + "/" && (g = c);
            g && this.$$parse(g);
            return !!g;
        };
    }
    function dc(b, a) {
        var c = bc(b);
        $c(b, this);
        this.$$parse = function(d) {
            d = za(b, d) || za(c, d);
            var e;
            "#" === d.charAt(0) ? (e = za(a, d), A(e) && (e = d)) : e = this.$$html5 ? d : "";
            ad(e, this);
            d = this.$$path;
            var f = /^\/[A-Z]:(\/.*)/;
            0 === e.indexOf(b) && (e = e.replace(b, ""));
            f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d);
            this.$$path = d;
            this.$$compose();
        };
        this.$$compose = function() {
            var c = Nb(this.$$search), e = this.$$hash ? "#" + qb(this.$$hash) : "";
            this.$$url = ac(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + (this.$$url ? a + this.$$url : "");
        };
        this.$$parseLinkUrl = function(a, c) {
            return Ha(b) == Ha(a) ? (this.$$parse(a), !0) : !1;
        };
    }
    function cd(b, a) {
        this.$$html5 = !0;
        dc.apply(this, arguments);
        var c = bc(b);
        this.$$parseLinkUrl = function(d, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            b == Ha(d) ? f = d : (g = za(c, d)) ? f = b + a + g : c === d + "/" && (f = c);
            f && this.$$parse(f);
            return !!f;
        };
        this.$$compose = function() {
            var c = Nb(this.$$search), e = this.$$hash ? "#" + qb(this.$$hash) : "";
            this.$$url = ac(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + a + this.$$url;
        };
    }
    function Gb(b) {
        return function() {
            return this[b];
        };
    }
    function dd(b, a) {
        return function(c) {
            if (A(c)) return this[b];
            this[b] = a(c);
            this.$$compose();
            return this;
        };
    }
    function Me() {
        var b = "", a = {
            enabled: !1,
            requireBase: !0,
            rewriteLinks: !0
        };
        this.hashPrefix = function(a) {
            return y(a) ? (b = a, this) : b;
        };
        this.html5Mode = function(b) {
            return Wa(b) ? (a.enabled = b, this) : I(b) ? (Wa(b.enabled) && (a.enabled = b.enabled), 
            Wa(b.requireBase) && (a.requireBase = b.requireBase), Wa(b.rewriteLinks) && (a.rewriteLinks = b.rewriteLinks), 
            this) : a;
        };
        this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(c, d, e, f, g) {
            function h(a, b, c) {
                var e = k.url(), f = k.$$state;
                try {
                    d.url(a, b, c), k.$$state = d.state();
                } catch (g) {
                    throw k.url(e), k.$$state = f, g;
                }
            }
            function l(a, b) {
                c.$broadcast("$locationChangeSuccess", k.absUrl(), a, k.$$state, b);
            }
            var k, m;
            m = d.baseHref();
            var n = d.url(), q;
            if (a.enabled) {
                if (!m && a.requireBase) throw Fb("nobase");
                q = n.substring(0, n.indexOf("/", n.indexOf("//") + 2)) + (m || "/");
                m = e.history ? cc : cd;
            } else q = Ha(n), m = dc;
            k = new m(q, "#" + b);
            k.$$parseLinkUrl(n, n);
            k.$$state = d.state();
            var u = /^\s*(javascript|mailto):/i;
            f.on("click", function(b) {
                if (a.rewriteLinks && !b.ctrlKey && !b.metaKey && !b.shiftKey && 2 != b.which && 2 != b.button) {
                    for (var e = B(b.target); "a" !== ua(e[0]); ) if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var h = e.prop("href"), l = e.attr("href") || e.attr("xlink:href");
                    I(h) && "[object SVGAnimatedString]" === h.toString() && (h = Ba(h.animVal).href);
                    u.test(h) || !h || e.attr("target") || b.isDefaultPrevented() || !k.$$parseLinkUrl(h, l) || (b.preventDefault(), 
                    k.absUrl() != d.url() && (c.$apply(), g.angular["ff-684208-preventDefault"] = !0));
                }
            });
            k.absUrl() != n && d.url(k.absUrl(), !0);
            var r = !0;
            d.onUrlChange(function(a, b) {
                c.$evalAsync(function() {
                    var d = k.absUrl(), e = k.$$state, f;
                    k.$$parse(a);
                    k.$$state = b;
                    f = c.$broadcast("$locationChangeStart", a, d, b, e).defaultPrevented;
                    k.absUrl() === a && (f ? (k.$$parse(d), k.$$state = e, h(d, !1, e)) : (r = !1, l(d, e)));
                });
                c.$$phase || c.$digest();
            });
            c.$watch(function() {
                var a = bd(d.url()), b = bd(k.absUrl()), f = d.state(), g = k.$$replace, q = a !== b || k.$$html5 && e.history && f !== k.$$state;
                if (r || q) r = !1, c.$evalAsync(function() {
                    var b = k.absUrl(), d = c.$broadcast("$locationChangeStart", b, a, k.$$state, f).defaultPrevented;
                    k.absUrl() === b && (d ? (k.$$parse(a), k.$$state = f) : (q && h(b, g, f === k.$$state ? null : k.$$state), 
                    l(a, f)));
                });
                k.$$replace = !1;
            });
            return k;
        } ];
    }
    function Ne() {
        var b = !0, a = this;
        this.debugEnabled = function(a) {
            return y(a) ? (b = a, this) : b;
        };
        this.$get = [ "$window", function(c) {
            function d(a) {
                a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));
                return a;
            }
            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || H;
                a = !1;
                try {
                    a = !!e.apply;
                } catch (l) {}
                return a ? function() {
                    var a = [];
                    s(arguments, function(b) {
                        a.push(d(b));
                    });
                    return e.apply(b, a);
                } : function(a, b) {
                    e(a, null == b ? "" : b);
                };
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        b && c.apply(a, arguments);
                    };
                }()
            };
        } ];
    }
    function ta(b, a) {
        if ("__defineGetter__" === b || "__defineSetter__" === b || "__lookupGetter__" === b || "__lookupSetter__" === b || "__proto__" === b) throw la("isecfld", a);
        return b;
    }
    function ma(b, a) {
        if (b) {
            if (b.constructor === b) throw la("isecfn", a);
            if (b.window === b) throw la("isecwindow", a);
            if (b.children && (b.nodeName || b.prop && b.attr && b.find)) throw la("isecdom", a);
            if (b === Object) throw la("isecobj", a);
        }
        return b;
    }
    function ec(b) {
        return b.constant;
    }
    function gb(b, a, c, d, e) {
        ma(b, e);
        ma(a, e);
        c = c.split(".");
        for (var f, g = 0; 1 < c.length; g++) {
            f = ta(c.shift(), e);
            var h = 0 === g && a && a[f] || b[f];
            h || (h = {}, b[f] = h);
            b = ma(h, e);
        }
        f = ta(c.shift(), e);
        ma(b[f], e);
        return b[f] = d;
    }
    function Qa(b) {
        return "constructor" == b;
    }
    function ed(b, a, c, d, e, f, g) {
        ta(b, f);
        ta(a, f);
        ta(c, f);
        ta(d, f);
        ta(e, f);
        var h = function(a) {
            return ma(a, f);
        }, l = g || Qa(b) ? h : pa, k = g || Qa(a) ? h : pa, m = g || Qa(c) ? h : pa, n = g || Qa(d) ? h : pa, q = g || Qa(e) ? h : pa;
        return function(f, g) {
            var h = g && g.hasOwnProperty(b) ? g : f;
            if (null == h) return h;
            h = l(h[b]);
            if (!a) return h;
            if (null == h) return t;
            h = k(h[a]);
            if (!c) return h;
            if (null == h) return t;
            h = m(h[c]);
            if (!d) return h;
            if (null == h) return t;
            h = n(h[d]);
            return e ? null == h ? t : h = q(h[e]) : h;
        };
    }
    function yf(b, a) {
        return function(c, d) {
            return b(c, d, ma, a);
        };
    }
    function zf(b, a, c) {
        var d = a.expensiveChecks, e = d ? Af : Bf, f = e[b];
        if (f) return f;
        var g = b.split("."), h = g.length;
        if (a.csp) f = 6 > h ? ed(g[0], g[1], g[2], g[3], g[4], c, d) : function(a, b) {
            var e = 0, f;
            do f = ed(g[e++], g[e++], g[e++], g[e++], g[e++], c, d)(a, b), b = t, a = f; while (e < h);
            return f;
        }; else {
            var l = "";
            d && (l += "s = eso(s, fe);\nl = eso(l, fe);\n");
            var k = d;
            s(g, function(a, b) {
                ta(a, c);
                var e = (b ? "s" : '((l&&l.hasOwnProperty("' + a + '"))?l:s)') + "." + a;
                if (d || Qa(a)) e = "eso(" + e + ", fe)", k = !0;
                l += "if(s == null) return undefined;\ns=" + e + ";\n";
            });
            l += "return s;";
            a = new Function("s", "l", "eso", "fe", l);
            a.toString = da(l);
            k && (a = yf(a, c));
            f = a;
        }
        f.sharedGetter = !0;
        f.assign = function(a, c, d) {
            return gb(a, d, b, c, b);
        };
        return e[b] = f;
    }
    function fc(b) {
        return G(b.valueOf) ? b.valueOf() : Cf.call(b);
    }
    function Oe() {
        var b = ha(), a = ha();
        this.$get = [ "$filter", "$sniffer", function(c, d) {
            function e(a) {
                var b = a;
                a.sharedGetter && (b = function(b, c) {
                    return a(b, c);
                }, b.literal = a.literal, b.constant = a.constant, b.assign = a.assign);
                return b;
            }
            function f(a, b) {
                for (var c = 0, d = a.length; c < d; c++) {
                    var e = a[c];
                    e.constant || (e.inputs ? f(e.inputs, b) : -1 === b.indexOf(e) && b.push(e));
                }
                return b;
            }
            function g(a, b) {
                return null == a || null == b ? a === b : "object" === typeof a && (a = fc(a), "object" === typeof a) ? !1 : a === b || a !== a && b !== b;
            }
            function h(a, b, c, d) {
                var e = d.$$inputs || (d.$$inputs = f(d.inputs, [])), h;
                if (1 === e.length) {
                    var l = g, e = e[0];
                    return a.$watch(function(a) {
                        var b = e(a);
                        g(b, l) || (h = d(a), l = b && fc(b));
                        return h;
                    }, b, c);
                }
                for (var k = [], q = 0, n = e.length; q < n; q++) k[q] = g;
                return a.$watch(function(a) {
                    for (var b = !1, c = 0, f = e.length; c < f; c++) {
                        var l = e[c](a);
                        if (b || (b = !g(l, k[c]))) k[c] = l && fc(l);
                    }
                    b && (h = d(a));
                    return h;
                }, b, c);
            }
            function l(a, b, c, d) {
                var e, f;
                return e = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    f = a;
                    G(b) && b.apply(this, arguments);
                    y(a) && d.$$postDigest(function() {
                        y(f) && e();
                    });
                }, c);
            }
            function k(a, b, c, d) {
                function e(a) {
                    var b = !0;
                    s(a, function(a) {
                        y(a) || (b = !1);
                    });
                    return b;
                }
                var f, g;
                return f = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    g = a;
                    G(b) && b.call(this, a, c, d);
                    e(a) && d.$$postDigest(function() {
                        e(g) && f();
                    });
                }, c);
            }
            function m(a, b, c, d) {
                var e;
                return e = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    G(b) && b.apply(this, arguments);
                    e();
                }, c);
            }
            function n(a, b) {
                if (!b) return a;
                var c = a.$$watchDelegate, c = c !== k && c !== l ? function(c, d) {
                    var e = a(c, d);
                    return b(e, c, d);
                } : function(c, d) {
                    var e = a(c, d), f = b(e, c, d);
                    return y(e) ? f : e;
                };
                a.$$watchDelegate && a.$$watchDelegate !== h ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = h, 
                c.inputs = [ a ]);
                return c;
            }
            var q = {
                csp: d.csp,
                expensiveChecks: !1
            }, u = {
                csp: d.csp,
                expensiveChecks: !0
            };
            return function(d, f, g) {
                var v, w, L;
                switch (typeof d) {
                  case "string":
                    L = d = d.trim();
                    var C = g ? a : b;
                    v = C[L];
                    v || (":" === d.charAt(0) && ":" === d.charAt(1) && (w = !0, d = d.substring(2)), 
                    g = g ? u : q, v = new gc(g), v = new hb(v, c, g).parse(d), v.constant ? v.$$watchDelegate = m : w ? (v = e(v), 
                    v.$$watchDelegate = v.literal ? k : l) : v.inputs && (v.$$watchDelegate = h), C[L] = v);
                    return n(v, f);

                  case "function":
                    return n(d, f);

                  default:
                    return n(H, f);
                }
            };
        } ];
    }
    function Qe() {
        this.$get = [ "$rootScope", "$exceptionHandler", function(b, a) {
            return fd(function(a) {
                b.$evalAsync(a);
            }, a);
        } ];
    }
    function Re() {
        this.$get = [ "$browser", "$exceptionHandler", function(b, a) {
            return fd(function(a) {
                b.defer(a);
            }, a);
        } ];
    }
    function fd(b, a) {
        function c(a, b, c) {
            function d(b) {
                return function(c) {
                    e || (e = !0, b.call(a, c));
                };
            }
            var e = !1;
            return [ d(b), d(c) ];
        }
        function d() {
            this.$$state = {
                status: 0
            };
        }
        function e(a, b) {
            return function(c) {
                b.call(a, c);
            };
        }
        function f(c) {
            !c.processScheduled && c.pending && (c.processScheduled = !0, b(function() {
                var b, d, e;
                e = c.pending;
                c.processScheduled = !1;
                c.pending = t;
                for (var f = 0, g = e.length; f < g; ++f) {
                    d = e[f][0];
                    b = e[f][c.status];
                    try {
                        G(b) ? d.resolve(b(c.value)) : 1 === c.status ? d.resolve(c.value) : d.reject(c.value);
                    } catch (h) {
                        d.reject(h), a(h);
                    }
                }
            }));
        }
        function g() {
            this.promise = new d();
            this.resolve = e(this, this.resolve);
            this.reject = e(this, this.reject);
            this.notify = e(this, this.notify);
        }
        var h = T("$q", TypeError);
        d.prototype = {
            then: function(a, b, c) {
                var d = new g();
                this.$$state.pending = this.$$state.pending || [];
                this.$$state.pending.push([ d, a, b, c ]);
                0 < this.$$state.status && f(this.$$state);
                return d.promise;
            },
            "catch": function(a) {
                return this.then(null, a);
            },
            "finally": function(a, b) {
                return this.then(function(b) {
                    return k(b, !0, a);
                }, function(b) {
                    return k(b, !1, a);
                }, b);
            }
        };
        g.prototype = {
            resolve: function(a) {
                this.promise.$$state.status || (a === this.promise ? this.$$reject(h("qcycle", a)) : this.$$resolve(a));
            },
            $$resolve: function(b) {
                var d, e;
                e = c(this, this.$$resolve, this.$$reject);
                try {
                    if (I(b) || G(b)) d = b && b.then;
                    G(d) ? (this.promise.$$state.status = -1, d.call(b, e[0], e[1], this.notify)) : (this.promise.$$state.value = b, 
                    this.promise.$$state.status = 1, f(this.promise.$$state));
                } catch (g) {
                    e[1](g), a(g);
                }
            },
            reject: function(a) {
                this.promise.$$state.status || this.$$reject(a);
            },
            $$reject: function(a) {
                this.promise.$$state.value = a;
                this.promise.$$state.status = 2;
                f(this.promise.$$state);
            },
            notify: function(c) {
                var d = this.promise.$$state.pending;
                0 >= this.promise.$$state.status && d && d.length && b(function() {
                    for (var b, e, f = 0, g = d.length; f < g; f++) {
                        e = d[f][0];
                        b = d[f][3];
                        try {
                            e.notify(G(b) ? b(c) : c);
                        } catch (h) {
                            a(h);
                        }
                    }
                });
            }
        };
        var l = function(a, b) {
            var c = new g();
            b ? c.resolve(a) : c.reject(a);
            return c.promise;
        }, k = function(a, b, c) {
            var d = null;
            try {
                G(c) && (d = c());
            } catch (e) {
                return l(e, !1);
            }
            return d && G(d.then) ? d.then(function() {
                return l(a, b);
            }, function(a) {
                return l(a, !1);
            }) : l(a, b);
        }, m = function(a, b, c, d) {
            var e = new g();
            e.resolve(a);
            return e.promise.then(b, c, d);
        }, n = function u(a) {
            if (!G(a)) throw h("norslvr", a);
            if (!(this instanceof u)) return new u(a);
            var b = new g();
            a(function(a) {
                b.resolve(a);
            }, function(a) {
                b.reject(a);
            });
            return b.promise;
        };
        n.defer = function() {
            return new g();
        };
        n.reject = function(a) {
            var b = new g();
            b.reject(a);
            return b.promise;
        };
        n.when = m;
        n.all = function(a) {
            var b = new g(), c = 0, d = D(a) ? [] : {};
            s(a, function(a, e) {
                c++;
                m(a).then(function(a) {
                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
                }, function(a) {
                    d.hasOwnProperty(e) || b.reject(a);
                });
            });
            0 === c && b.resolve(d);
            return b.promise;
        };
        return n;
    }
    function $e() {
        this.$get = [ "$window", "$timeout", function(b, a) {
            var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame, d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function(a) {
                var b = c(a);
                return function() {
                    d(b);
                };
            } : function(b) {
                var c = a(b, 16.66, !1);
                return function() {
                    a.cancel(c);
                };
            };
            f.supported = e;
            return f;
        } ];
    }
    function Pe() {
        var b = 10, a = T("$rootScope"), c = null, d = null;
        this.digestTtl = function(a) {
            arguments.length && (b = a);
            return b;
        };
        this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(e, f, g, h) {
            function l() {
                this.$id = ++nb;
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this.$root = this;
                this.$$destroyed = !1;
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$isolateBindings = null;
            }
            function k(b) {
                if (r.$$phase) throw a("inprog", r.$$phase);
                r.$$phase = b;
            }
            function m(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent);
            }
            function n() {}
            function q() {
                for (;v.length; ) try {
                    v.shift()();
                } catch (a) {
                    f(a);
                }
                d = null;
            }
            function u() {
                null === d && (d = h.defer(function() {
                    r.$apply(q);
                }));
            }
            l.prototype = {
                constructor: l,
                $new: function(a, b) {
                    function c() {
                        d.$$destroyed = !0;
                    }
                    var d;
                    b = b || this;
                    a ? (d = new l(), d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                        this.$$listeners = {};
                        this.$$listenerCount = {};
                        this.$id = ++nb;
                        this.$$ChildScope = null;
                    }, this.$$ChildScope.prototype = this), d = new this.$$ChildScope());
                    d.$parent = b;
                    d.$$prevSibling = b.$$childTail;
                    b.$$childHead ? (b.$$childTail.$$nextSibling = d, b.$$childTail = d) : b.$$childHead = b.$$childTail = d;
                    (a || b != this) && d.$on("$destroy", c);
                    return d;
                },
                $watch: function(a, b, d) {
                    var e = g(a);
                    if (e.$$watchDelegate) return e.$$watchDelegate(this, b, d, e);
                    var f = this.$$watchers, h = {
                        fn: b,
                        last: n,
                        get: e,
                        exp: a,
                        eq: !!d
                    };
                    c = null;
                    G(b) || (h.fn = H);
                    f || (f = this.$$watchers = []);
                    f.unshift(h);
                    return function() {
                        Xa(f, h);
                        c = null;
                    };
                },
                $watchGroup: function(a, b) {
                    function c() {
                        h = !1;
                        l ? (l = !1, b(e, e, g)) : b(e, d, g);
                    }
                    var d = Array(a.length), e = Array(a.length), f = [], g = this, h = !1, l = !0;
                    if (!a.length) {
                        var k = !0;
                        g.$evalAsync(function() {
                            k && b(e, e, g);
                        });
                        return function() {
                            k = !1;
                        };
                    }
                    if (1 === a.length) return this.$watch(a[0], function(a, c, f) {
                        e[0] = a;
                        d[0] = c;
                        b(e, a === c ? e : d, f);
                    });
                    s(a, function(a, b) {
                        var l = g.$watch(a, function(a, f) {
                            e[b] = a;
                            d[b] = f;
                            h || (h = !0, g.$evalAsync(c));
                        });
                        f.push(l);
                    });
                    return function() {
                        for (;f.length; ) f.shift()();
                    };
                },
                $watchCollection: function(a, b) {
                    function c(a) {
                        e = a;
                        var b, d, g, h;
                        if (!A(e)) {
                            if (I(e)) if (Ta(e)) for (f !== q && (f = q, u = f.length = 0, k++), a = e.length, 
                            u !== a && (k++, f.length = u = a), b = 0; b < a; b++) h = f[b], g = e[b], d = h !== h && g !== g, 
                            d || h === g || (k++, f[b] = g); else {
                                f !== m && (f = m = {}, u = 0, k++);
                                a = 0;
                                for (b in e) e.hasOwnProperty(b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, 
                                d || h === g || (k++, f[b] = g)) : (u++, f[b] = g, k++));
                                if (u > a) for (b in k++, f) e.hasOwnProperty(b) || (u--, delete f[b]);
                            } else f !== e && (f = e, k++);
                            return k;
                        }
                    }
                    c.$stateful = !0;
                    var d = this, e, f, h, l = 1 < b.length, k = 0, n = g(a, c), q = [], m = {}, p = !0, u = 0;
                    return this.$watch(n, function() {
                        p ? (p = !1, b(e, e, d)) : b(e, h, d);
                        if (l) if (I(e)) if (Ta(e)) {
                            h = Array(e.length);
                            for (var a = 0; a < e.length; a++) h[a] = e[a];
                        } else for (a in h = {}, e) rc.call(e, a) && (h[a] = e[a]); else h = e;
                    });
                },
                $digest: function() {
                    var e, g, l, m, u, v, s = b, t, W = [], y, J;
                    k("$digest");
                    h.$$checkUrlChange();
                    this === r && null !== d && (h.defer.cancel(d), q());
                    c = null;
                    do {
                        v = !1;
                        for (t = this; O.length; ) {
                            try {
                                J = O.shift(), J.scope.$eval(J.expression, J.locals);
                            } catch (B) {
                                f(B);
                            }
                            c = null;
                        }
                        a: do {
                            if (m = t.$$watchers) for (u = m.length; u--; ) try {
                                if (e = m[u]) if ((g = e.get(t)) !== (l = e.last) && !(e.eq ? fa(g, l) : "number" === typeof g && "number" === typeof l && isNaN(g) && isNaN(l))) v = !0, 
                                c = e, e.last = e.eq ? Ea(g, null) : g, e.fn(g, l === n ? g : l, t), 5 > s && (y = 4 - s, 
                                W[y] || (W[y] = []), W[y].push({
                                    msg: G(e.exp) ? "fn: " + (e.exp.name || e.exp.toString()) : e.exp,
                                    newVal: g,
                                    oldVal: l
                                })); else if (e === c) {
                                    v = !1;
                                    break a;
                                }
                            } catch (A) {
                                f(A);
                            }
                            if (!(m = t.$$childHead || t !== this && t.$$nextSibling)) for (;t !== this && !(m = t.$$nextSibling); ) t = t.$parent;
                        } while (t = m);
                        if ((v || O.length) && !s--) throw r.$$phase = null, a("infdig", b, W);
                    } while (v || O.length);
                    for (r.$$phase = null; p.length; ) try {
                        p.shift()();
                    } catch (ca) {
                        f(ca);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy");
                        this.$$destroyed = !0;
                        if (this !== r) {
                            for (var b in this.$$listenerCount) m(this, this.$$listenerCount[b], b);
                            a.$$childHead == this && (a.$$childHead = this.$$nextSibling);
                            a.$$childTail == this && (a.$$childTail = this.$$prevSibling);
                            this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling);
                            this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling);
                            this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = H;
                            this.$on = this.$watch = this.$watchGroup = function() {
                                return H;
                            };
                            this.$$listeners = {};
                            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
                        }
                    }
                },
                $eval: function(a, b) {
                    return g(a)(this, b);
                },
                $evalAsync: function(a, b) {
                    r.$$phase || O.length || h.defer(function() {
                        O.length && r.$digest();
                    });
                    O.push({
                        scope: this,
                        expression: a,
                        locals: b
                    });
                },
                $$postDigest: function(a) {
                    p.push(a);
                },
                $apply: function(a) {
                    try {
                        return k("$apply"), this.$eval(a);
                    } catch (b) {
                        f(b);
                    } finally {
                        r.$$phase = null;
                        try {
                            r.$digest();
                        } catch (c) {
                            throw f(c), c;
                        }
                    }
                },
                $applyAsync: function(a) {
                    function b() {
                        c.$eval(a);
                    }
                    var c = this;
                    a && v.push(b);
                    u();
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []);
                    c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        var d = c.indexOf(b);
                        -1 !== d && (c[d] = null, m(e, 1, a));
                    };
                },
                $emit: function(a, b) {
                    var c = [], d, e = this, g = !1, h = {
                        name: a,
                        targetScope: e,
                        stopPropagation: function() {
                            g = !0;
                        },
                        preventDefault: function() {
                            h.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, l = Ya([ h ], arguments, 1), k, m;
                    do {
                        d = e.$$listeners[a] || c;
                        h.currentScope = e;
                        k = 0;
                        for (m = d.length; k < m; k++) if (d[k]) try {
                            d[k].apply(null, l);
                        } catch (n) {
                            f(n);
                        } else d.splice(k, 1), k--, m--;
                        if (g) return h.currentScope = null, h;
                        e = e.$parent;
                    } while (e);
                    h.currentScope = null;
                    return h;
                },
                $broadcast: function(a, b) {
                    var c = this, d = this, e = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            e.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    };
                    if (!this.$$listenerCount[a]) return e;
                    for (var g = Ya([ e ], arguments, 1), h, l; c = d; ) {
                        e.currentScope = c;
                        d = c.$$listeners[a] || [];
                        h = 0;
                        for (l = d.length; h < l; h++) if (d[h]) try {
                            d[h].apply(null, g);
                        } catch (k) {
                            f(k);
                        } else d.splice(h, 1), h--, l--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (;c !== this && !(d = c.$$nextSibling); ) c = c.$parent;
                    }
                    e.currentScope = null;
                    return e;
                }
            };
            var r = new l(), O = r.$$asyncQueue = [], p = r.$$postDigestQueue = [], v = r.$$applyAsyncQueue = [];
            return r;
        } ];
    }
    function Sd() {
        var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(a) {
            return y(a) ? (b = a, this) : b;
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return y(b) ? (a = b, this) : a;
        };
        this.$get = function() {
            return function(c, d) {
                var e = d ? a : b, f;
                f = Ba(c).href;
                return "" === f || f.match(e) ? c : "unsafe:" + f;
            };
        };
    }
    function Df(b) {
        if ("self" === b) return b;
        if (F(b)) {
            if (-1 < b.indexOf("***")) throw Ca("iwcard", b);
            b = gd(b).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
            return new RegExp("^" + b + "$");
        }
        if (ob(b)) return new RegExp("^" + b.source + "$");
        throw Ca("imatcher");
    }
    function hd(b) {
        var a = [];
        y(b) && s(b, function(b) {
            a.push(Df(b));
        });
        return a;
    }
    function Te() {
        this.SCE_CONTEXTS = na;
        var b = [ "self" ], a = [];
        this.resourceUrlWhitelist = function(a) {
            arguments.length && (b = hd(a));
            return b;
        };
        this.resourceUrlBlacklist = function(b) {
            arguments.length && (a = hd(b));
            return a;
        };
        this.$get = [ "$injector", function(c) {
            function d(a, b) {
                return "self" === a ? Zc(b) : !!a.exec(b.href);
            }
            function e(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a;
                    };
                };
                a && (b.prototype = new a());
                b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                };
                b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                };
                return b;
            }
            var f = function(a) {
                throw Ca("unsafe");
            };
            c.has("$sanitize") && (f = c.get("$sanitize"));
            var g = e(), h = {};
            h[na.HTML] = e(g);
            h[na.CSS] = e(g);
            h[na.URL] = e(g);
            h[na.JS] = e(g);
            h[na.RESOURCE_URL] = e(h[na.URL]);
            return {
                trustAs: function(a, b) {
                    var c = h.hasOwnProperty(a) ? h[a] : null;
                    if (!c) throw Ca("icontext", a, b);
                    if (null === b || b === t || "" === b) return b;
                    if ("string" !== typeof b) throw Ca("itype", a);
                    return new c(b);
                },
                getTrusted: function(c, e) {
                    if (null === e || e === t || "" === e) return e;
                    var g = h.hasOwnProperty(c) ? h[c] : null;
                    if (g && e instanceof g) return e.$$unwrapTrustedValue();
                    if (c === na.RESOURCE_URL) {
                        var g = Ba(e.toString()), n, q, u = !1;
                        n = 0;
                        for (q = b.length; n < q; n++) if (d(b[n], g)) {
                            u = !0;
                            break;
                        }
                        if (u) for (n = 0, q = a.length; n < q; n++) if (d(a[n], g)) {
                            u = !1;
                            break;
                        }
                        if (u) return e;
                        throw Ca("insecurl", e.toString());
                    }
                    if (c === na.HTML) return f(e);
                    throw Ca("unsafe");
                },
                valueOf: function(a) {
                    return a instanceof g ? a.$$unwrapTrustedValue() : a;
                }
            };
        } ];
    }
    function Se() {
        var b = !0;
        this.enabled = function(a) {
            arguments.length && (b = !!a);
            return b;
        };
        this.$get = [ "$parse", "$sceDelegate", function(a, c) {
            if (b && 8 > Ra) throw Ca("iequirks");
            var d = ra(na);
            d.isEnabled = function() {
                return b;
            };
            d.trustAs = c.trustAs;
            d.getTrusted = c.getTrusted;
            d.valueOf = c.valueOf;
            b || (d.trustAs = d.getTrusted = function(a, b) {
                return b;
            }, d.valueOf = pa);
            d.parseAs = function(b, c) {
                var e = a(c);
                return e.literal && e.constant ? e : a(c, function(a) {
                    return d.getTrusted(b, a);
                });
            };
            var e = d.parseAs, f = d.getTrusted, g = d.trustAs;
            s(na, function(a, b) {
                var c = Q(b);
                d[cb("parse_as_" + c)] = function(b) {
                    return e(a, b);
                };
                d[cb("get_trusted_" + c)] = function(b) {
                    return f(a, b);
                };
                d[cb("trust_as_" + c)] = function(b) {
                    return g(a, b);
                };
            });
            return d;
        } ];
    }
    function Ue() {
        this.$get = [ "$window", "$document", function(b, a) {
            var c = {}, d = ba((/android (\d+)/.exec(Q((b.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator || {}).userAgent), f = a[0] || {}, g, h = /^(Moz|webkit|ms)(?=[A-Z])/, l = f.body && f.body.style, k = !1, m = !1;
            if (l) {
                for (var n in l) if (k = h.exec(n)) {
                    g = k[0];
                    g = g.substr(0, 1).toUpperCase() + g.substr(1);
                    break;
                }
                g || (g = "WebkitOpacity" in l && "webkit");
                k = !!("transition" in l || g + "Transition" in l);
                m = !!("animation" in l || g + "Animation" in l);
                !d || k && m || (k = F(f.body.style.webkitTransition), m = F(f.body.style.webkitAnimation));
            }
            return {
                history: !(!b.history || !b.history.pushState || 4 > d || e),
                hasEvent: function(a) {
                    if ("input" === a && 11 >= Ra) return !1;
                    if (A(c[a])) {
                        var b = f.createElement("div");
                        c[a] = "on" + a in b;
                    }
                    return c[a];
                },
                csp: ab(),
                vendorPrefix: g,
                transitions: k,
                animations: m,
                android: d
            };
        } ];
    }
    function We() {
        this.$get = [ "$templateCache", "$http", "$q", function(b, a, c) {
            function d(e, f) {
                d.totalPendingRequests++;
                var g = a.defaults && a.defaults.transformResponse;
                D(g) ? g = g.filter(function(a) {
                    return a !== Yb;
                }) : g === Yb && (g = null);
                return a.get(e, {
                    cache: b,
                    transformResponse: g
                }).finally(function() {
                    d.totalPendingRequests--;
                }).then(function(a) {
                    return a.data;
                }, function(a) {
                    if (!f) throw ja("tpload", e);
                    return c.reject(a);
                });
            }
            d.totalPendingRequests = 0;
            return d;
        } ];
    }
    function Xe() {
        this.$get = [ "$rootScope", "$browser", "$location", function(b, a, c) {
            return {
                findBindings: function(a, b, c) {
                    a = a.getElementsByClassName("ng-binding");
                    var g = [];
                    s(a, function(a) {
                        var d = ga.element(a).data("$binding");
                        d && s(d, function(d) {
                            c ? new RegExp("(^|\\s)" + gd(b) + "(\\s|\\||$)").test(d) && g.push(a) : -1 != d.indexOf(b) && g.push(a);
                        });
                    });
                    return g;
                },
                findModels: function(a, b, c) {
                    for (var g = [ "ng-", "data-ng-", "ng\\:" ], h = 0; h < g.length; ++h) {
                        var l = a.querySelectorAll("[" + g[h] + "model" + (c ? "=" : "*=") + '"' + b + '"]');
                        if (l.length) return l;
                    }
                },
                getLocation: function() {
                    return c.url();
                },
                setLocation: function(a) {
                    a !== c.url() && (c.url(a), b.$digest());
                },
                whenStable: function(b) {
                    a.notifyWhenNoOutstandingRequests(b);
                }
            };
        } ];
    }
    function Ye() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(b, a, c, d, e) {
            function f(f, l, k) {
                var m = y(k) && !k, n = (m ? d : c).defer(), q = n.promise;
                l = a.defer(function() {
                    try {
                        n.resolve(f());
                    } catch (a) {
                        n.reject(a), e(a);
                    } finally {
                        delete g[q.$$timeoutId];
                    }
                    m || b.$apply();
                }, l);
                q.$$timeoutId = l;
                g[l] = n;
                return q;
            }
            var g = {};
            f.cancel = function(b) {
                return b && b.$$timeoutId in g ? (g[b.$$timeoutId].reject("canceled"), delete g[b.$$timeoutId], 
                a.defer.cancel(b.$$timeoutId)) : !1;
            };
            return f;
        } ];
    }
    function Ba(b) {
        Ra && (Z.setAttribute("href", b), b = Z.href);
        Z.setAttribute("href", b);
        return {
            href: Z.href,
            protocol: Z.protocol ? Z.protocol.replace(/:$/, "") : "",
            host: Z.host,
            search: Z.search ? Z.search.replace(/^\?/, "") : "",
            hash: Z.hash ? Z.hash.replace(/^#/, "") : "",
            hostname: Z.hostname,
            port: Z.port,
            pathname: "/" === Z.pathname.charAt(0) ? Z.pathname : "/" + Z.pathname
        };
    }
    function Zc(b) {
        b = F(b) ? Ba(b) : b;
        return b.protocol === id.protocol && b.host === id.host;
    }
    function Ze() {
        this.$get = da(M);
    }
    function Dc(b) {
        function a(c, d) {
            if (I(c)) {
                var e = {};
                s(c, function(b, c) {
                    e[c] = a(c, b);
                });
                return e;
            }
            return b.factory(c + "Filter", d);
        }
        this.register = a;
        this.$get = [ "$injector", function(a) {
            return function(b) {
                return a.get(b + "Filter");
            };
        } ];
        a("currency", jd);
        a("date", kd);
        a("filter", Ef);
        a("json", Ff);
        a("limitTo", Gf);
        a("lowercase", Hf);
        a("number", ld);
        a("orderBy", md);
        a("uppercase", If);
    }
    function Ef() {
        return function(b, a, c) {
            if (!D(b)) return b;
            var d;
            switch (typeof a) {
              case "function":
                break;

              case "boolean":
              case "number":
              case "string":
                d = !0;

              case "object":
                a = Jf(a, c, d);
                break;

              default:
                return b;
            }
            return b.filter(a);
        };
    }
    function Jf(b, a, c) {
        var d = I(b) && "$" in b;
        !0 === a ? a = fa : G(a) || (a = function(a, b) {
            if (I(a) || I(b)) return !1;
            a = Q("" + a);
            b = Q("" + b);
            return -1 !== a.indexOf(b);
        });
        return function(e) {
            return d && !I(e) ? Ia(e, b.$, a, !1) : Ia(e, b, a, c);
        };
    }
    function Ia(b, a, c, d, e) {
        var f = typeof b, g = typeof a;
        if ("string" === g && "!" === a.charAt(0)) return !Ia(b, a.substring(1), c, d);
        if (D(b)) return b.some(function(b) {
            return Ia(b, a, c, d);
        });
        switch (f) {
          case "object":
            var h;
            if (d) {
                for (h in b) if ("$" !== h.charAt(0) && Ia(b[h], a, c, !0)) return !0;
                return e ? !1 : Ia(b, a, c, !1);
            }
            if ("object" === g) {
                for (h in a) if (e = a[h], !G(e) && (f = "$" === h, !Ia(f ? b : b[h], e, c, f, f))) return !1;
                return !0;
            }
            return c(b, a);

          case "function":
            return !1;

          default:
            return c(b, a);
        }
    }
    function jd(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d, e) {
            A(d) && (d = a.CURRENCY_SYM);
            A(e) && (e = a.PATTERNS[1].maxFrac);
            return null == b ? b : nd(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, e).replace(/\u00A4/g, d);
        };
    }
    function ld(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            return null == b ? b : nd(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
        };
    }
    function nd(b, a, c, d, e) {
        if (!isFinite(b) || I(b)) return "";
        var f = 0 > b;
        b = Math.abs(b);
        var g = b + "", h = "", l = [], k = !1;
        if (-1 !== g.indexOf("e")) {
            var m = g.match(/([\d\.]+)e(-?)(\d+)/);
            m && "-" == m[2] && m[3] > e + 1 ? b = 0 : (h = g, k = !0);
        }
        if (k) 0 < e && 1 > b && (h = b.toFixed(e), b = parseFloat(h)); else {
            g = (g.split(od)[1] || "").length;
            A(e) && (e = Math.min(Math.max(a.minFrac, g), a.maxFrac));
            b = +(Math.round(+(b.toString() + "e" + e)).toString() + "e" + -e);
            var g = ("" + b).split(od), k = g[0], g = g[1] || "", n = 0, q = a.lgSize, u = a.gSize;
            if (k.length >= q + u) for (n = k.length - q, m = 0; m < n; m++) 0 === (n - m) % u && 0 !== m && (h += c), 
            h += k.charAt(m);
            for (m = n; m < k.length; m++) 0 === (k.length - m) % q && 0 !== m && (h += c), 
            h += k.charAt(m);
            for (;g.length < e; ) g += "0";
            e && "0" !== e && (h += d + g.substr(0, e));
        }
        0 === b && (f = !1);
        l.push(f ? a.negPre : a.posPre, h, f ? a.negSuf : a.posSuf);
        return l.join("");
    }
    function Hb(b, a, c) {
        var d = "";
        0 > b && (d = "-", b = -b);
        for (b = "" + b; b.length < a; ) b = "0" + b;
        c && (b = b.substr(b.length - a));
        return d + b;
    }
    function $(b, a, c, d) {
        c = c || 0;
        return function(e) {
            e = e["get" + b]();
            if (0 < c || e > -c) e += c;
            0 === e && -12 == c && (e = 12);
            return Hb(e, a, d);
        };
    }
    function Ib(b, a) {
        return function(c, d) {
            var e = c["get" + b](), f = ub(a ? "SHORT" + b : b);
            return d[f][e];
        };
    }
    function pd(b) {
        var a = new Date(b, 0, 1).getDay();
        return new Date(b, 0, (4 >= a ? 5 : 12) - a);
    }
    function qd(b) {
        return function(a) {
            var c = pd(a.getFullYear());
            a = +new Date(a.getFullYear(), a.getMonth(), a.getDate() + (4 - a.getDay())) - +c;
            a = 1 + Math.round(a / 6048e5);
            return Hb(a, b);
        };
    }
    function kd(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var f = 0, g = 0, h = b[8] ? a.setUTCFullYear : a.setFullYear, l = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (f = ba(b[9] + b[10]), g = ba(b[9] + b[11]));
                h.call(a, ba(b[1]), ba(b[2]) - 1, ba(b[3]));
                f = ba(b[4] || 0) - f;
                g = ba(b[5] || 0) - g;
                h = ba(b[6] || 0);
                b = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                l.call(a, f, g, h, b);
            }
            return a;
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, e, f) {
            var g = "", h = [], l, k;
            e = e || "mediumDate";
            e = b.DATETIME_FORMATS[e] || e;
            F(c) && (c = Kf.test(c) ? ba(c) : a(c));
            V(c) && (c = new Date(c));
            if (!qa(c)) return c;
            for (;e; ) (k = Lf.exec(e)) ? (h = Ya(h, k, 1), e = h.pop()) : (h.push(e), e = null);
            f && "UTC" === f && (c = new Date(c.getTime()), c.setMinutes(c.getMinutes() + c.getTimezoneOffset()));
            s(h, function(a) {
                l = Mf[a];
                g += l ? l(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            });
            return g;
        };
    }
    function Ff() {
        return function(b, a) {
            A(a) && (a = 2);
            return $a(b, a);
        };
    }
    function Gf() {
        return function(b, a) {
            V(b) && (b = b.toString());
            return D(b) || F(b) ? (a = Infinity === Math.abs(Number(a)) ? Number(a) : ba(a)) ? 0 < a ? b.slice(0, a) : b.slice(a) : F(b) ? "" : [] : b;
        };
    }
    function md(b) {
        return function(a, c, d) {
            function e(a, b) {
                return b ? function(b, c) {
                    return a(c, b);
                } : a;
            }
            function f(a) {
                switch (typeof a) {
                  case "number":
                  case "boolean":
                  case "string":
                    return !0;

                  default:
                    return !1;
                }
            }
            function g(a) {
                return null === a ? "null" : "function" === typeof a.valueOf && (a = a.valueOf(), 
                f(a)) || "function" === typeof a.toString && (a = a.toString(), f(a)) ? a : "";
            }
            function h(a, b) {
                var c = typeof a, d = typeof b;
                c === d && "object" === c && (a = g(a), b = g(b));
                return c === d ? ("string" === c && (a = a.toLowerCase(), b = b.toLowerCase()), 
                a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1;
            }
            if (!Ta(a)) return a;
            c = D(c) ? c : [ c ];
            0 === c.length && (c = [ "+" ]);
            c = c.map(function(a) {
                var c = !1, d = a || pa;
                if (F(a)) {
                    if ("+" == a.charAt(0) || "-" == a.charAt(0)) c = "-" == a.charAt(0), a = a.substring(1);
                    if ("" === a) return e(h, c);
                    d = b(a);
                    if (d.constant) {
                        var f = d();
                        return e(function(a, b) {
                            return h(a[f], b[f]);
                        }, c);
                    }
                }
                return e(function(a, b) {
                    return h(d(a), d(b));
                }, c);
            });
            return Za.call(a).sort(e(function(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e;
                }
                return 0;
            }, d));
        };
    }
    function Ja(b) {
        G(b) && (b = {
            link: b
        });
        b.restrict = b.restrict || "AC";
        return da(b);
    }
    function rd(b, a, c, d, e) {
        var f = this, g = [], h = f.$$parentForm = b.parent().controller("form") || Jb;
        f.$error = {};
        f.$$success = {};
        f.$pending = t;
        f.$name = e(a.name || a.ngForm || "")(c);
        f.$dirty = !1;
        f.$pristine = !0;
        f.$valid = !0;
        f.$invalid = !1;
        f.$submitted = !1;
        h.$addControl(f);
        f.$rollbackViewValue = function() {
            s(g, function(a) {
                a.$rollbackViewValue();
            });
        };
        f.$commitViewValue = function() {
            s(g, function(a) {
                a.$commitViewValue();
            });
        };
        f.$addControl = function(a) {
            Ma(a.$name, "input");
            g.push(a);
            a.$name && (f[a.$name] = a);
        };
        f.$$renameControl = function(a, b) {
            var c = a.$name;
            f[c] === a && delete f[c];
            f[b] = a;
            a.$name = b;
        };
        f.$removeControl = function(a) {
            a.$name && f[a.$name] === a && delete f[a.$name];
            s(f.$pending, function(b, c) {
                f.$setValidity(c, null, a);
            });
            s(f.$error, function(b, c) {
                f.$setValidity(c, null, a);
            });
            s(f.$$success, function(b, c) {
                f.$setValidity(c, null, a);
            });
            Xa(g, a);
        };
        sd({
            ctrl: this,
            $element: b,
            set: function(a, b, c) {
                var d = a[b];
                d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [ c ];
            },
            unset: function(a, b, c) {
                var d = a[b];
                d && (Xa(d, c), 0 === d.length && delete a[b]);
            },
            parentForm: h,
            $animate: d
        });
        f.$setDirty = function() {
            d.removeClass(b, Sa);
            d.addClass(b, Kb);
            f.$dirty = !0;
            f.$pristine = !1;
            h.$setDirty();
        };
        f.$setPristine = function() {
            d.setClass(b, Sa, Kb + " ng-submitted");
            f.$dirty = !1;
            f.$pristine = !0;
            f.$submitted = !1;
            s(g, function(a) {
                a.$setPristine();
            });
        };
        f.$setUntouched = function() {
            s(g, function(a) {
                a.$setUntouched();
            });
        };
        f.$setSubmitted = function() {
            d.addClass(b, "ng-submitted");
            f.$submitted = !0;
            h.$setSubmitted();
        };
    }
    function hc(b) {
        b.$formatters.push(function(a) {
            return b.$isEmpty(a) ? a : a.toString();
        });
    }
    function ib(b, a, c, d, e, f) {
        var g = Q(a[0].type);
        if (!e.android) {
            var h = !1;
            a.on("compositionstart", function(a) {
                h = !0;
            });
            a.on("compositionend", function() {
                h = !1;
                l();
            });
        }
        var l = function(b) {
            k && (f.defer.cancel(k), k = null);
            if (!h) {
                var e = a.val();
                b = b && b.type;
                "password" === g || c.ngTrim && "false" === c.ngTrim || (e = U(e));
                (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, b);
            }
        };
        if (e.hasEvent("input")) a.on("input", l); else {
            var k, m = function(a, b, c) {
                k || (k = f.defer(function() {
                    k = null;
                    b && b.value === c || l(a);
                }));
            };
            a.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b || m(a, this, this.value);
            });
            if (e.hasEvent("paste")) a.on("paste cut", m);
        }
        a.on("change", l);
        d.$render = function() {
            a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue);
        };
    }
    function Lb(b, a) {
        return function(c, d) {
            var e, f;
            if (qa(c)) return c;
            if (F(c)) {
                '"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1));
                if (Nf.test(c)) return new Date(c);
                b.lastIndex = 0;
                if (e = b.exec(c)) return e.shift(), f = d ? {
                    yyyy: d.getFullYear(),
                    MM: d.getMonth() + 1,
                    dd: d.getDate(),
                    HH: d.getHours(),
                    mm: d.getMinutes(),
                    ss: d.getSeconds(),
                    sss: d.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, s(e, function(b, c) {
                    c < a.length && (f[a[c]] = +b);
                }), new Date(f.yyyy, f.MM - 1, f.dd, f.HH, f.mm, f.ss || 0, 1e3 * f.sss || 0);
            }
            return NaN;
        };
    }
    function jb(b, a, c, d) {
        return function(e, f, g, h, l, k, m) {
            function n(a) {
                return a && !(a.getTime && a.getTime() !== a.getTime());
            }
            function q(a) {
                return y(a) ? qa(a) ? a : c(a) : t;
            }
            td(e, f, g, h);
            ib(e, f, g, h, l, k);
            var u = h && h.$options && h.$options.timezone, r;
            h.$$parserName = b;
            h.$parsers.push(function(b) {
                return h.$isEmpty(b) ? null : a.test(b) ? (b = c(b, r), "UTC" === u && b.setMinutes(b.getMinutes() - b.getTimezoneOffset()), 
                b) : t;
            });
            h.$formatters.push(function(a) {
                if (a && !qa(a)) throw Mb("datefmt", a);
                if (n(a)) {
                    if ((r = a) && "UTC" === u) {
                        var b = 6e4 * r.getTimezoneOffset();
                        r = new Date(r.getTime() + b);
                    }
                    return m("date")(a, d, u);
                }
                r = null;
                return "";
            });
            if (y(g.min) || g.ngMin) {
                var s;
                h.$validators.min = function(a) {
                    return !n(a) || A(s) || c(a) >= s;
                };
                g.$observe("min", function(a) {
                    s = q(a);
                    h.$validate();
                });
            }
            if (y(g.max) || g.ngMax) {
                var p;
                h.$validators.max = function(a) {
                    return !n(a) || A(p) || c(a) <= p;
                };
                g.$observe("max", function(a) {
                    p = q(a);
                    h.$validate();
                });
            }
        };
    }
    function td(b, a, c, d) {
        (d.$$hasNativeValidators = I(a[0].validity)) && d.$parsers.push(function(b) {
            var c = a.prop("validity") || {};
            return c.badInput && !c.typeMismatch ? t : b;
        });
    }
    function ud(b, a, c, d, e) {
        if (y(d)) {
            b = b(d);
            if (!b.constant) throw T("ngModel")("constexpr", c, d);
            return b(a);
        }
        return e;
    }
    function ic(b, a) {
        b = "ngClass" + b;
        return [ "$animate", function(c) {
            function d(a, b) {
                var c = [], d = 0;
                a: for (;d < a.length; d++) {
                    for (var e = a[d], m = 0; m < b.length; m++) if (e == b[m]) continue a;
                    c.push(e);
                }
                return c;
            }
            function e(a) {
                if (!D(a)) {
                    if (F(a)) return a.split(" ");
                    if (I(a)) {
                        var b = [];
                        s(a, function(a, c) {
                            a && (b = b.concat(c.split(" ")));
                        });
                        return b;
                    }
                }
                return a;
            }
            return {
                restrict: "AC",
                link: function(f, g, h) {
                    function l(a, b) {
                        var c = g.data("$classCounts") || {}, d = [];
                        s(a, function(a) {
                            if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
                        });
                        g.data("$classCounts", c);
                        return d.join(" ");
                    }
                    function k(b) {
                        if (!0 === a || f.$index % 2 === a) {
                            var k = e(b || []);
                            if (!m) {
                                var u = l(k, 1);
                                h.$addClass(u);
                            } else if (!fa(b, m)) {
                                var r = e(m), u = d(k, r), k = d(r, k), u = l(u, 1), k = l(k, -1);
                                u && u.length && c.addClass(g, u);
                                k && k.length && c.removeClass(g, k);
                            }
                        }
                        m = ra(b);
                    }
                    var m;
                    f.$watch(h[b], k, !0);
                    h.$observe("class", function(a) {
                        k(f.$eval(h[b]));
                    });
                    "ngClass" !== b && f.$watch("$index", function(c, d) {
                        var g = c & 1;
                        if (g !== (d & 1)) {
                            var k = e(f.$eval(h[b]));
                            g === a ? (g = l(k, 1), h.$addClass(g)) : (g = l(k, -1), h.$removeClass(g));
                        }
                    });
                }
            };
        } ];
    }
    function sd(b) {
        function a(a, b) {
            b && !f[a] ? (k.addClass(e, a), f[a] = !0) : !b && f[a] && (k.removeClass(e, a), 
            f[a] = !1);
        }
        function c(b, c) {
            b = b ? "-" + tc(b, "-") : "";
            a(kb + b, !0 === c);
            a(vd + b, !1 === c);
        }
        var d = b.ctrl, e = b.$element, f = {}, g = b.set, h = b.unset, l = b.parentForm, k = b.$animate;
        f[vd] = !(f[kb] = e.hasClass(kb));
        d.$setValidity = function(b, e, f) {
            e === t ? (d.$pending || (d.$pending = {}), g(d.$pending, b, f)) : (d.$pending && h(d.$pending, b, f), 
            wd(d.$pending) && (d.$pending = t));
            Wa(e) ? e ? (h(d.$error, b, f), g(d.$$success, b, f)) : (g(d.$error, b, f), h(d.$$success, b, f)) : (h(d.$error, b, f), 
            h(d.$$success, b, f));
            d.$pending ? (a(xd, !0), d.$valid = d.$invalid = t, c("", null)) : (a(xd, !1), d.$valid = wd(d.$error), 
            d.$invalid = !d.$valid, c("", d.$valid));
            e = d.$pending && d.$pending[b] ? t : d.$error[b] ? !1 : d.$$success[b] ? !0 : null;
            c(b, e);
            l.$setValidity(b, e, d);
        };
    }
    function wd(b) {
        if (b) for (var a in b) return !1;
        return !0;
    }
    var Of = /^\/(.+)\/([a-z]*)$/, Q = function(b) {
        return F(b) ? b.toLowerCase() : b;
    }, rc = Object.prototype.hasOwnProperty, ub = function(b) {
        return F(b) ? b.toUpperCase() : b;
    }, Ra, B, sa, Za = [].slice, rf = [].splice, Pf = [].push, Da = Object.prototype.toString, Ka = T("ng"), ga = M.angular || (M.angular = {}), bb, nb = 0;
    Ra = Y.documentMode;
    H.$inject = [];
    pa.$inject = [];
    var D = Array.isArray, U = function(b) {
        return F(b) ? b.trim() : b;
    }, gd = function(b) {
        return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    }, ab = function() {
        if (y(ab.isActive_)) return ab.isActive_;
        var b = !(!Y.querySelector("[ng-csp]") && !Y.querySelector("[data-ng-csp]"));
        if (!b) try {
            new Function("");
        } catch (a) {
            b = !0;
        }
        return ab.isActive_ = b;
    }, rb = [ "ng-", "data-ng-", "ng:", "x-ng-" ], Md = /[A-Z]/g, uc = !1, Pb, oa = 1, pb = 3, Qd = {
        full: "1.3.11",
        major: 1,
        minor: 3,
        dot: 11,
        codeName: "spiffy-manatee"
    };
    R.expando = "ng339";
    var zb = R.cache = {}, hf = 1;
    R._data = function(b) {
        return this.cache[b[this.expando]] || {};
    };
    var cf = /([\:\-\_]+(.))/g, df = /^moz([A-Z])/, Qf = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, Sb = T("jqLite"), gf = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Rb = /<|&#?\w+;/, ef = /<([\w:]+)/, ff = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ia = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    ia.optgroup = ia.option;
    ia.tbody = ia.tfoot = ia.colgroup = ia.caption = ia.thead;
    ia.th = ia.td;
    var La = R.prototype = {
        ready: function(b) {
            function a() {
                c || (c = !0, b());
            }
            var c = !1;
            "complete" === Y.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), R(M).on("load", a));
        },
        toString: function() {
            var b = [];
            s(this, function(a) {
                b.push("" + a);
            });
            return "[" + b.join(", ") + "]";
        },
        eq: function(b) {
            return 0 <= b ? B(this[b]) : B(this[this.length + b]);
        },
        length: 0,
        push: Pf,
        sort: [].sort,
        splice: [].splice
    }, Eb = {};
    s("multiple selected checked disabled readOnly required open".split(" "), function(b) {
        Eb[Q(b)] = b;
    });
    var Mc = {};
    s("input select option textarea button form details".split(" "), function(b) {
        Mc[b] = !0;
    });
    var Nc = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    s({
        data: Ub,
        removeData: xb
    }, function(b, a) {
        R[a] = b;
    });
    s({
        data: Ub,
        inheritedData: Db,
        scope: function(b) {
            return B.data(b, "$scope") || Db(b.parentNode || b, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(b) {
            return B.data(b, "$isolateScope") || B.data(b, "$isolateScopeNoTemplate");
        },
        controller: Ic,
        injector: function(b) {
            return Db(b, "$injector");
        },
        removeAttr: function(b, a) {
            b.removeAttribute(a);
        },
        hasClass: Ab,
        css: function(b, a, c) {
            a = cb(a);
            if (y(c)) b.style[a] = c; else return b.style[a];
        },
        attr: function(b, a, c) {
            var d = Q(a);
            if (Eb[d]) if (y(c)) c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d)); else return b[a] || (b.attributes.getNamedItem(a) || H).specified ? d : t; else if (y(c)) b.setAttribute(a, c); else if (b.getAttribute) return b = b.getAttribute(a, 2), 
            null === b ? t : b;
        },
        prop: function(b, a, c) {
            if (y(c)) b[a] = c; else return b[a];
        },
        text: function() {
            function b(a, b) {
                if (A(b)) {
                    var d = a.nodeType;
                    return d === oa || d === pb ? a.textContent : "";
                }
                a.textContent = b;
            }
            b.$dv = "";
            return b;
        }(),
        val: function(b, a) {
            if (A(a)) {
                if (b.multiple && "select" === ua(b)) {
                    var c = [];
                    s(b.options, function(a) {
                        a.selected && c.push(a.value || a.text);
                    });
                    return 0 === c.length ? null : c;
                }
                return b.value;
            }
            b.value = a;
        },
        html: function(b, a) {
            if (A(a)) return b.innerHTML;
            wb(b, !0);
            b.innerHTML = a;
        },
        empty: Jc
    }, function(b, a) {
        R.prototype[a] = function(a, d) {
            var e, f, g = this.length;
            if (b !== Jc && (2 == b.length && b !== Ab && b !== Ic ? a : d) === t) {
                if (I(a)) {
                    for (e = 0; e < g; e++) if (b === Ub) b(this[e], a); else for (f in a) b(this[e], f, a[f]);
                    return this;
                }
                e = b.$dv;
                g = e === t ? Math.min(g, 1) : g;
                for (f = 0; f < g; f++) {
                    var h = b(this[f], a, d);
                    e = e ? e + h : h;
                }
                return e;
            }
            for (e = 0; e < g; e++) b(this[e], a, d);
            return this;
        };
    });
    s({
        removeData: xb,
        on: function a(c, d, e, f) {
            if (y(f)) throw Sb("onargs");
            if (Ec(c)) {
                var g = yb(c, !0);
                f = g.events;
                var h = g.handle;
                h || (h = g.handle = lf(c, f));
                for (var g = 0 <= d.indexOf(" ") ? d.split(" ") : [ d ], l = g.length; l--; ) {
                    d = g[l];
                    var k = f[d];
                    k || (f[d] = [], "mouseenter" === d || "mouseleave" === d ? a(c, Qf[d], function(a) {
                        var c = a.relatedTarget;
                        c && (c === this || this.contains(c)) || h(a, d);
                    }) : "$destroy" !== d && c.addEventListener(d, h, !1), k = f[d]);
                    k.push(e);
                }
            }
        },
        off: Hc,
        one: function(a, c, d) {
            a = B(a);
            a.on(c, function f() {
                a.off(c, d);
                a.off(c, f);
            });
            a.on(c, d);
        },
        replaceWith: function(a, c) {
            var d, e = a.parentNode;
            wb(a);
            s(new R(c), function(c) {
                d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
                d = c;
            });
        },
        children: function(a) {
            var c = [];
            s(a.childNodes, function(a) {
                a.nodeType === oa && c.push(a);
            });
            return c;
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || [];
        },
        append: function(a, c) {
            var d = a.nodeType;
            if (d === oa || 11 === d) {
                c = new R(c);
                for (var d = 0, e = c.length; d < e; d++) a.appendChild(c[d]);
            }
        },
        prepend: function(a, c) {
            if (a.nodeType === oa) {
                var d = a.firstChild;
                s(new R(c), function(c) {
                    a.insertBefore(c, d);
                });
            }
        },
        wrap: function(a, c) {
            c = B(c).eq(0).clone()[0];
            var d = a.parentNode;
            d && d.replaceChild(c, a);
            c.appendChild(a);
        },
        remove: Kc,
        detach: function(a) {
            Kc(a, !0);
        },
        after: function(a, c) {
            var d = a, e = a.parentNode;
            c = new R(c);
            for (var f = 0, g = c.length; f < g; f++) {
                var h = c[f];
                e.insertBefore(h, d.nextSibling);
                d = h;
            }
        },
        addClass: Cb,
        removeClass: Bb,
        toggleClass: function(a, c, d) {
            c && s(c.split(" "), function(c) {
                var f = d;
                A(f) && (f = !Ab(a, c));
                (f ? Cb : Bb)(a, c);
            });
        },
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
        },
        next: function(a) {
            return a.nextElementSibling;
        },
        find: function(a, c) {
            return a.getElementsByTagName ? a.getElementsByTagName(c) : [];
        },
        clone: Tb,
        triggerHandler: function(a, c, d) {
            var e, f, g = c.type || c, h = yb(a);
            if (h = (h = h && h.events) && h[g]) e = {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                },
                isDefaultPrevented: function() {
                    return !0 === this.defaultPrevented;
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0;
                },
                isImmediatePropagationStopped: function() {
                    return !0 === this.immediatePropagationStopped;
                },
                stopPropagation: H,
                type: g,
                target: a
            }, c.type && (e = z(e, c)), c = ra(h), f = d ? [ e ].concat(d) : [ e ], s(c, function(c) {
                e.isImmediatePropagationStopped() || c.apply(a, f);
            });
        }
    }, function(a, c) {
        R.prototype[c] = function(c, e, f) {
            for (var g, h = 0, l = this.length; h < l; h++) A(g) ? (g = a(this[h], c, e, f), 
            y(g) && (g = B(g))) : Gc(g, a(this[h], c, e, f));
            return y(g) ? g : this;
        };
        R.prototype.bind = R.prototype.on;
        R.prototype.unbind = R.prototype.off;
    });
    db.prototype = {
        put: function(a, c) {
            this[Na(a, this.nextUid)] = c;
        },
        get: function(a) {
            return this[Na(a, this.nextUid)];
        },
        remove: function(a) {
            var c = this[a = Na(a, this.nextUid)];
            delete this[a];
            return c;
        }
    };
    var Pc = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, nf = /,/, of = /^\s*(_?)(\S+?)\1\s*$/, Oc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Ga = T("$injector");
    Ob.$$annotate = Vb;
    var Rf = T("$animate"), Ce = [ "$provide", function(a) {
        this.$$selectors = {};
        this.register = function(c, d) {
            var e = c + "-animation";
            if (c && "." != c.charAt(0)) throw Rf("notcsel", c);
            this.$$selectors[c.substr(1)] = e;
            a.factory(e, d);
        };
        this.classNameFilter = function(a) {
            1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null);
            return this.$$classNameFilter;
        };
        this.$get = [ "$$q", "$$asyncCallback", "$rootScope", function(a, d, e) {
            function f(d) {
                var f, g = a.defer();
                g.promise.$$cancelFn = function() {
                    f && f();
                };
                e.$$postDigest(function() {
                    f = d(function() {
                        g.resolve();
                    });
                });
                return g.promise;
            }
            function g(a, c) {
                var d = [], e = [], f = ha();
                s((a.attr("class") || "").split(/\s+/), function(a) {
                    f[a] = !0;
                });
                s(c, function(a, c) {
                    var g = f[c];
                    !1 === a && g ? e.push(c) : !0 !== a || g || d.push(c);
                });
                return 0 < d.length + e.length && [ d.length ? d : null, e.length ? e : null ];
            }
            function h(a, c, d) {
                for (var e = 0, f = c.length; e < f; ++e) a[c[e]] = d;
            }
            function l() {
                m || (m = a.defer(), d(function() {
                    m.resolve();
                    m = null;
                }));
                return m.promise;
            }
            function k(a, c) {
                if (ga.isObject(c)) {
                    var d = z(c.from || {}, c.to || {});
                    a.css(d);
                }
            }
            var m;
            return {
                animate: function(a, c, d) {
                    k(a, {
                        from: c,
                        to: d
                    });
                    return l();
                },
                enter: function(a, c, d, e) {
                    k(a, e);
                    d ? d.after(a) : c.prepend(a);
                    return l();
                },
                leave: function(a, c) {
                    a.remove();
                    return l();
                },
                move: function(a, c, d, e) {
                    return this.enter(a, c, d, e);
                },
                addClass: function(a, c, d) {
                    return this.setClass(a, c, [], d);
                },
                $$addClassImmediately: function(a, c, d) {
                    a = B(a);
                    c = F(c) ? c : D(c) ? c.join(" ") : "";
                    s(a, function(a) {
                        Cb(a, c);
                    });
                    k(a, d);
                    return l();
                },
                removeClass: function(a, c, d) {
                    return this.setClass(a, [], c, d);
                },
                $$removeClassImmediately: function(a, c, d) {
                    a = B(a);
                    c = F(c) ? c : D(c) ? c.join(" ") : "";
                    s(a, function(a) {
                        Bb(a, c);
                    });
                    k(a, d);
                    return l();
                },
                setClass: function(a, c, d, e) {
                    var k = this, l = !1;
                    a = B(a);
                    var m = a.data("$$animateClasses");
                    m ? e && m.options && (m.options = ga.extend(m.options || {}, e)) : (m = {
                        classes: {},
                        options: e
                    }, l = !0);
                    e = m.classes;
                    c = D(c) ? c : c.split(" ");
                    d = D(d) ? d : d.split(" ");
                    h(e, c, !0);
                    h(e, d, !1);
                    l && (m.promise = f(function(c) {
                        var d = a.data("$$animateClasses");
                        a.removeData("$$animateClasses");
                        if (d) {
                            var e = g(a, d.classes);
                            e && k.$$setClassImmediately(a, e[0], e[1], d.options);
                        }
                        c();
                    }), a.data("$$animateClasses", m));
                    return m.promise;
                },
                $$setClassImmediately: function(a, c, d, e) {
                    c && this.$$addClassImmediately(a, c);
                    d && this.$$removeClassImmediately(a, d);
                    k(a, e);
                    return l();
                },
                enabled: H,
                cancel: H
            };
        } ];
    } ], ja = T("$compile");
    wc.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var Rc = /^((?:x|data)[\:\-_])/i, Vc = "application/json", Zb = {
        "Content-Type": Vc + ";charset=utf-8"
    }, tf = /^\[|^\{(?!\{)/, uf = {
        "[": /]$/,
        "{": /}$/
    }, sf = /^\)\]\}',?\n/, $b = T("$interpolate"), Sf = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, xf = {
        http: 80,
        https: 443,
        ftp: 21
    }, Fb = T("$location"), Tf = {
        $$html5: !1,
        $$replace: !1,
        absUrl: Gb("$$absUrl"),
        url: function(a) {
            if (A(a)) return this.$$url;
            var c = Sf.exec(a);
            (c[1] || "" === a) && this.path(decodeURIComponent(c[1]));
            (c[2] || c[1] || "" === a) && this.search(c[3] || "");
            this.hash(c[5] || "");
            return this;
        },
        protocol: Gb("$$protocol"),
        host: Gb("$$host"),
        port: Gb("$$port"),
        path: dd("$$path", function(a) {
            a = null !== a ? a.toString() : "";
            return "/" == a.charAt(0) ? a : "/" + a;
        }),
        search: function(a, c) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (F(a) || V(a)) a = a.toString(), this.$$search = qc(a); else if (I(a)) a = Ea(a, {}), 
                s(a, function(c, e) {
                    null == c && delete a[e];
                }), this.$$search = a; else throw Fb("isrcharg");
                break;

              default:
                A(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c;
            }
            this.$$compose();
            return this;
        },
        hash: dd("$$hash", function(a) {
            return null !== a ? a.toString() : "";
        }),
        replace: function() {
            this.$$replace = !0;
            return this;
        }
    };
    s([ cd, dc, cc ], function(a) {
        a.prototype = Object.create(Tf);
        a.prototype.state = function(c) {
            if (!arguments.length) return this.$$state;
            if (a !== cc || !this.$$html5) throw Fb("nostate");
            this.$$state = A(c) ? null : c;
            return this;
        };
    });
    var la = T("$parse"), Uf = Function.prototype.call, Vf = Function.prototype.apply, Wf = Function.prototype.bind, lb = ha();
    s({
        "null": function() {
            return null;
        },
        "true": function() {
            return !0;
        },
        "false": function() {
            return !1;
        },
        undefined: function() {}
    }, function(a, c) {
        a.constant = a.literal = a.sharedGetter = !0;
        lb[c] = a;
    });
    lb["this"] = function(a) {
        return a;
    };
    lb["this"].sharedGetter = !0;
    var mb = z(ha(), {
        "+": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return y(d) ? y(e) ? d + e : d : y(e) ? e : t;
        },
        "-": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return (y(d) ? d : 0) - (y(e) ? e : 0);
        },
        "*": function(a, c, d, e) {
            return d(a, c) * e(a, c);
        },
        "/": function(a, c, d, e) {
            return d(a, c) / e(a, c);
        },
        "%": function(a, c, d, e) {
            return d(a, c) % e(a, c);
        },
        "===": function(a, c, d, e) {
            return d(a, c) === e(a, c);
        },
        "!==": function(a, c, d, e) {
            return d(a, c) !== e(a, c);
        },
        "==": function(a, c, d, e) {
            return d(a, c) == e(a, c);
        },
        "!=": function(a, c, d, e) {
            return d(a, c) != e(a, c);
        },
        "<": function(a, c, d, e) {
            return d(a, c) < e(a, c);
        },
        ">": function(a, c, d, e) {
            return d(a, c) > e(a, c);
        },
        "<=": function(a, c, d, e) {
            return d(a, c) <= e(a, c);
        },
        ">=": function(a, c, d, e) {
            return d(a, c) >= e(a, c);
        },
        "&&": function(a, c, d, e) {
            return d(a, c) && e(a, c);
        },
        "||": function(a, c, d, e) {
            return d(a, c) || e(a, c);
        },
        "!": function(a, c, d) {
            return !d(a, c);
        },
        "=": !0,
        "|": !0
    }), Xf = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, gc = function(a) {
        this.options = a;
    };
    gc.prototype = {
        constructor: gc,
        lex: function(a) {
            this.text = a;
            this.index = 0;
            for (this.tokens = []; this.index < this.text.length; ) if (a = this.text.charAt(this.index), 
            '"' === a || "'" === a) this.readString(a); else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(a)) this.readIdent(); else if (this.is(a, "(){}[].,;:?")) this.tokens.push({
                index: this.index,
                text: a
            }), this.index++; else if (this.isWhitespace(a)) this.index++; else {
                var c = a + this.peek(), d = c + this.peek(2), e = mb[c], f = mb[d];
                mb[a] || e || f ? (a = f ? d : e ? c : a, this.tokens.push({
                    index: this.index,
                    text: a,
                    operator: !0
                }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1);
            }
            return this.tokens;
        },
        is: function(a, c) {
            return -1 !== c.indexOf(a);
        },
        peek: function(a) {
            a = a || 1;
            return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
        },
        isNumber: function(a) {
            return "0" <= a && "9" >= a && "string" === typeof a;
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a;
        },
        isIdent: function(a) {
            return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a);
        },
        throwError: function(a, c, d) {
            d = d || this.index;
            c = y(c) ? "s " + c + "-" + this.index + " [" + this.text.substring(c, d) + "]" : " " + d;
            throw la("lexerr", a, c, this.text);
        },
        readNumber: function() {
            for (var a = "", c = this.index; this.index < this.text.length; ) {
                var d = Q(this.text.charAt(this.index));
                if ("." == d || this.isNumber(d)) a += d; else {
                    var e = this.peek();
                    if ("e" == d && this.isExpOperator(e)) a += d; else if (this.isExpOperator(d) && e && this.isNumber(e) && "e" == a.charAt(a.length - 1)) a += d; else if (!this.isExpOperator(d) || e && this.isNumber(e) || "e" != a.charAt(a.length - 1)) break; else this.throwError("Invalid exponent");
                }
                this.index++;
            }
            this.tokens.push({
                index: c,
                text: a,
                constant: !0,
                value: Number(a)
            });
        },
        readIdent: function() {
            for (var a = this.index; this.index < this.text.length; ) {
                var c = this.text.charAt(this.index);
                if (!this.isIdent(c) && !this.isNumber(c)) break;
                this.index++;
            }
            this.tokens.push({
                index: a,
                text: this.text.slice(a, this.index),
                identifier: !0
            });
        },
        readString: function(a) {
            var c = this.index;
            this.index++;
            for (var d = "", e = a, f = !1; this.index < this.text.length; ) {
                var g = this.text.charAt(this.index), e = e + g;
                if (f) "u" === g ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + f + "]"), 
                this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += Xf[g] || g, f = !1; else if ("\\" === g) f = !0; else {
                    if (g === a) {
                        this.index++;
                        this.tokens.push({
                            index: c,
                            text: e,
                            constant: !0,
                            value: d
                        });
                        return;
                    }
                    d += g;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", c);
        }
    };
    var hb = function(a, c, d) {
        this.lexer = a;
        this.$filter = c;
        this.options = d;
    };
    hb.ZERO = z(function() {
        return 0;
    }, {
        sharedGetter: !0,
        constant: !0
    });
    hb.prototype = {
        constructor: hb,
        parse: function(a) {
            this.text = a;
            this.tokens = this.lexer.lex(a);
            a = this.statements();
            0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);
            a.literal = !!a.literal;
            a.constant = !!a.constant;
            return a;
        },
        primary: function() {
            var a;
            this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.peek().identifier && this.peek().text in lb ? a = lb[this.consume().text] : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var c, d; c = this.expect("(", "[", "."); ) "(" === c.text ? (a = this.functionCall(a, d), 
            d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, 
            a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a;
        },
        throwError: function(a, c) {
            throw la("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index));
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw la("ueoe", this.text);
            return this.tokens[0];
        },
        peek: function(a, c, d, e) {
            return this.peekAhead(0, a, c, d, e);
        },
        peekAhead: function(a, c, d, e, f) {
            if (this.tokens.length > a) {
                a = this.tokens[a];
                var g = a.text;
                if (g === c || g === d || g === e || g === f || !(c || d || e || f)) return a;
            }
            return !1;
        },
        expect: function(a, c, d, e) {
            return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1;
        },
        consume: function(a) {
            if (0 === this.tokens.length) throw la("ueoe", this.text);
            var c = this.expect(a);
            c || this.throwError("is unexpected, expecting [" + a + "]", this.peek());
            return c;
        },
        unaryFn: function(a, c) {
            var d = mb[a];
            return z(function(a, f) {
                return d(a, f, c);
            }, {
                constant: c.constant,
                inputs: [ c ]
            });
        },
        binaryFn: function(a, c, d, e) {
            var f = mb[c];
            return z(function(c, e) {
                return f(c, e, a, d);
            }, {
                constant: a.constant && d.constant,
                inputs: !e && [ a, d ]
            });
        },
        identifier: function() {
            for (var a = this.consume().text; this.peek(".") && this.peekAhead(1).identifier && !this.peekAhead(2, "("); ) a += this.consume().text + this.consume().text;
            return zf(a, this.options, this.text);
        },
        constant: function() {
            var a = this.consume().value;
            return z(function() {
                return a;
            }, {
                constant: !0,
                literal: !0
            });
        },
        statements: function() {
            for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), 
            !this.expect(";")) return 1 === a.length ? a[0] : function(c, d) {
                for (var e, f = 0, g = a.length; f < g; f++) e = a[f](c, d);
                return e;
            };
        },
        filterChain: function() {
            for (var a = this.expression(); this.expect("|"); ) a = this.filter(a);
            return a;
        },
        filter: function(a) {
            var c = this.$filter(this.consume().text), d, e;
            if (this.peek(":")) for (d = [], e = []; this.expect(":"); ) d.push(this.expression());
            var f = [ a ].concat(d || []);
            return z(function(f, h) {
                var l = a(f, h);
                if (e) {
                    e[0] = l;
                    for (l = d.length; l--; ) e[l + 1] = d[l](f, h);
                    return c.apply(t, e);
                }
                return c(l);
            }, {
                constant: !c.$stateful && f.every(ec),
                inputs: !c.$stateful && f
            });
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var a = this.ternary(), c, d;
            return (d = this.expect("=")) ? (a.assign || this.throwError("implies assignment but [" + this.text.substring(0, d.index) + "] can not be assigned to", d), 
            c = this.ternary(), z(function(d, f) {
                return a.assign(d, c(d, f), f);
            }, {
                inputs: [ a, c ]
            })) : a;
        },
        ternary: function() {
            var a = this.logicalOR(), c;
            if (this.expect("?") && (c = this.assignment(), this.consume(":"))) {
                var d = this.assignment();
                return z(function(e, f) {
                    return a(e, f) ? c(e, f) : d(e, f);
                }, {
                    constant: a.constant && c.constant && d.constant
                });
            }
            return a;
        },
        logicalOR: function() {
            for (var a = this.logicalAND(), c; c = this.expect("||"); ) a = this.binaryFn(a, c.text, this.logicalAND(), !0);
            return a;
        },
        logicalAND: function() {
            for (var a = this.equality(), c; c = this.expect("&&"); ) a = this.binaryFn(a, c.text, this.equality(), !0);
            return a;
        },
        equality: function() {
            for (var a = this.relational(), c; c = this.expect("==", "!=", "===", "!=="); ) a = this.binaryFn(a, c.text, this.relational());
            return a;
        },
        relational: function() {
            for (var a = this.additive(), c; c = this.expect("<", ">", "<=", ">="); ) a = this.binaryFn(a, c.text, this.additive());
            return a;
        },
        additive: function() {
            for (var a = this.multiplicative(), c; c = this.expect("+", "-"); ) a = this.binaryFn(a, c.text, this.multiplicative());
            return a;
        },
        multiplicative: function() {
            for (var a = this.unary(), c; c = this.expect("*", "/", "%"); ) a = this.binaryFn(a, c.text, this.unary());
            return a;
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(hb.ZERO, a.text, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.text, this.unary()) : this.primary();
        },
        fieldAccess: function(a) {
            var c = this.identifier();
            return z(function(d, e, f) {
                d = f || a(d, e);
                return null == d ? t : c(d);
            }, {
                assign: function(d, e, f) {
                    var g = a(d, f);
                    g || a.assign(d, g = {}, f);
                    return c.assign(g, e);
                }
            });
        },
        objectIndex: function(a) {
            var c = this.text, d = this.expression();
            this.consume("]");
            return z(function(e, f) {
                var g = a(e, f), h = d(e, f);
                ta(h, c);
                return g ? ma(g[h], c) : t;
            }, {
                assign: function(e, f, g) {
                    var h = ta(d(e, g), c), l = ma(a(e, g), c);
                    l || a.assign(e, l = {}, g);
                    return l[h] = f;
                }
            });
        },
        functionCall: function(a, c) {
            var d = [];
            if (")" !== this.peekToken().text) {
                do d.push(this.expression()); while (this.expect(","));
            }
            this.consume(")");
            var e = this.text, f = d.length ? [] : null;
            return function(g, h) {
                var l = c ? c(g, h) : y(c) ? t : g, k = a(g, h, l) || H;
                if (f) for (var m = d.length; m--; ) f[m] = ma(d[m](g, h), e);
                ma(l, e);
                if (k) {
                    if (k.constructor === k) throw la("isecfn", e);
                    if (k === Uf || k === Vf || k === Wf) throw la("isecff", e);
                }
                l = k.apply ? k.apply(l, f) : k(f[0], f[1], f[2], f[3], f[4]);
                return ma(l, e);
            };
        },
        arrayDeclaration: function() {
            var a = [];
            if ("]" !== this.peekToken().text) {
                do {
                    if (this.peek("]")) break;
                    a.push(this.expression());
                } while (this.expect(","));
            }
            this.consume("]");
            return z(function(c, d) {
                for (var e = [], f = 0, g = a.length; f < g; f++) e.push(a[f](c, d));
                return e;
            }, {
                literal: !0,
                constant: a.every(ec),
                inputs: a
            });
        },
        object: function() {
            var a = [], c = [];
            if ("}" !== this.peekToken().text) {
                do {
                    if (this.peek("}")) break;
                    var d = this.consume();
                    d.constant ? a.push(d.value) : d.identifier ? a.push(d.text) : this.throwError("invalid key", d);
                    this.consume(":");
                    c.push(this.expression());
                } while (this.expect(","));
            }
            this.consume("}");
            return z(function(d, f) {
                for (var g = {}, h = 0, l = c.length; h < l; h++) g[a[h]] = c[h](d, f);
                return g;
            }, {
                literal: !0,
                constant: c.every(ec),
                inputs: c
            });
        }
    };
    var Bf = ha(), Af = ha(), Cf = Object.prototype.valueOf, Ca = T("$sce"), na = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, ja = T("$compile"), Z = Y.createElement("a"), id = Ba(M.location.href);
    Dc.$inject = [ "$provide" ];
    jd.$inject = [ "$locale" ];
    ld.$inject = [ "$locale" ];
    var od = ".", Mf = {
        yyyy: $("FullYear", 4),
        yy: $("FullYear", 2, 0, !0),
        y: $("FullYear", 1),
        MMMM: Ib("Month"),
        MMM: Ib("Month", !0),
        MM: $("Month", 2, 1),
        M: $("Month", 1, 1),
        dd: $("Date", 2),
        d: $("Date", 1),
        HH: $("Hours", 2),
        H: $("Hours", 1),
        hh: $("Hours", 2, -12),
        h: $("Hours", 1, -12),
        mm: $("Minutes", 2),
        m: $("Minutes", 1),
        ss: $("Seconds", 2),
        s: $("Seconds", 1),
        sss: $("Milliseconds", 3),
        EEEE: Ib("Day"),
        EEE: Ib("Day", !0),
        a: function(a, c) {
            return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
        },
        Z: function(a) {
            a = -1 * a.getTimezoneOffset();
            return a = (0 <= a ? "+" : "") + (Hb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Hb(Math.abs(a % 60), 2));
        },
        ww: qd(2),
        w: qd(1)
    }, Lf = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/, Kf = /^\-?\d+$/;
    kd.$inject = [ "$locale" ];
    var Hf = da(Q), If = da(ub);
    md.$inject = [ "$parse" ];
    var Td = da({
        restrict: "E",
        compile: function(a, c) {
            if (!c.href && !c.xlinkHref && !c.name) return function(a, c) {
                if ("a" === c[0].nodeName.toLowerCase()) {
                    var f = "[object SVGAnimatedString]" === Da.call(c.prop("href")) ? "xlink:href" : "href";
                    c.on("click", function(a) {
                        c.attr(f) || a.preventDefault();
                    });
                }
            };
        }
    }), vb = {};
    s(Eb, function(a, c) {
        if ("multiple" != a) {
            var d = ya("ng-" + c);
            vb[d] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: function(a, f, g) {
                        a.$watch(g[d], function(a) {
                            g.$set(c, !!a);
                        });
                    }
                };
            };
        }
    });
    s(Nc, function(a, c) {
        vb[c] = function() {
            return {
                priority: 100,
                link: function(a, e, f) {
                    if ("ngPattern" === c && "/" == f.ngPattern.charAt(0) && (e = f.ngPattern.match(Of))) {
                        f.$set("ngPattern", new RegExp(e[1], e[2]));
                        return;
                    }
                    a.$watch(f[c], function(a) {
                        f.$set(c, a);
                    });
                }
            };
        };
    });
    s([ "src", "srcset", "href" ], function(a) {
        var c = ya("ng-" + a);
        vb[c] = function() {
            return {
                priority: 99,
                link: function(d, e, f) {
                    var g = a, h = a;
                    "href" === a && "[object SVGAnimatedString]" === Da.call(e.prop("href")) && (h = "xlinkHref", 
                    f.$attr[h] = "xlink:href", g = null);
                    f.$observe(c, function(c) {
                        c ? (f.$set(h, c), Ra && g && e.prop(g, f[h])) : "href" === a && f.$set(h, null);
                    });
                }
            };
        };
    });
    var Jb = {
        $addControl: H,
        $$renameControl: function(a, c) {
            a.$name = c;
        },
        $removeControl: H,
        $setValidity: H,
        $setDirty: H,
        $setPristine: H,
        $setSubmitted: H
    };
    rd.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
    var yd = function(a) {
        return [ "$timeout", function(c) {
            return {
                name: "form",
                restrict: a ? "EAC" : "E",
                controller: rd,
                compile: function(a) {
                    a.addClass(Sa).addClass(kb);
                    return {
                        pre: function(a, d, g, h) {
                            if (!("action" in g)) {
                                var l = function(c) {
                                    a.$apply(function() {
                                        h.$commitViewValue();
                                        h.$setSubmitted();
                                    });
                                    c.preventDefault();
                                };
                                d[0].addEventListener("submit", l, !1);
                                d.on("$destroy", function() {
                                    c(function() {
                                        d[0].removeEventListener("submit", l, !1);
                                    }, 0, !1);
                                });
                            }
                            var k = h.$$parentForm, m = h.$name;
                            m && (gb(a, null, m, h, m), g.$observe(g.name ? "name" : "ngForm", function(c) {
                                m !== c && (gb(a, null, m, t, m), m = c, gb(a, null, m, h, m), k.$$renameControl(h, m));
                            }));
                            d.on("$destroy", function() {
                                k.$removeControl(h);
                                m && gb(a, null, m, t, m);
                                z(h, Jb);
                            });
                        }
                    };
                }
            };
        } ];
    }, Ud = yd(), ge = yd(!0), Nf = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, Yf = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Zf = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, $f = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, zd = /^(\d{4})-(\d{2})-(\d{2})$/, Ad = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, jc = /^(\d{4})-W(\d\d)$/, Bd = /^(\d{4})-(\d\d)$/, Cd = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Dd = {
        text: function(a, c, d, e, f, g) {
            ib(a, c, d, e, f, g);
            hc(e);
        },
        date: jb("date", zd, Lb(zd, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": jb("datetimelocal", Ad, Lb(Ad, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: jb("time", Cd, Lb(Cd, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: jb("week", jc, function(a, c) {
            if (qa(a)) return a;
            if (F(a)) {
                jc.lastIndex = 0;
                var d = jc.exec(a);
                if (d) {
                    var e = +d[1], f = +d[2], g = d = 0, h = 0, l = 0, k = pd(e), f = 7 * (f - 1);
                    c && (d = c.getHours(), g = c.getMinutes(), h = c.getSeconds(), l = c.getMilliseconds());
                    return new Date(e, 0, k.getDate() + f, d, g, h, l);
                }
            }
            return NaN;
        }, "yyyy-Www"),
        month: jb("month", Bd, Lb(Bd, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: function(a, c, d, e, f, g) {
            td(a, c, d, e);
            ib(a, c, d, e, f, g);
            e.$$parserName = "number";
            e.$parsers.push(function(a) {
                return e.$isEmpty(a) ? null : $f.test(a) ? parseFloat(a) : t;
            });
            e.$formatters.push(function(a) {
                if (!e.$isEmpty(a)) {
                    if (!V(a)) throw Mb("numfmt", a);
                    a = a.toString();
                }
                return a;
            });
            if (d.min || d.ngMin) {
                var h;
                e.$validators.min = function(a) {
                    return e.$isEmpty(a) || A(h) || a >= h;
                };
                d.$observe("min", function(a) {
                    y(a) && !V(a) && (a = parseFloat(a, 10));
                    h = V(a) && !isNaN(a) ? a : t;
                    e.$validate();
                });
            }
            if (d.max || d.ngMax) {
                var l;
                e.$validators.max = function(a) {
                    return e.$isEmpty(a) || A(l) || a <= l;
                };
                d.$observe("max", function(a) {
                    y(a) && !V(a) && (a = parseFloat(a, 10));
                    l = V(a) && !isNaN(a) ? a : t;
                    e.$validate();
                });
            }
        },
        url: function(a, c, d, e, f, g) {
            ib(a, c, d, e, f, g);
            hc(e);
            e.$$parserName = "url";
            e.$validators.url = function(a, c) {
                var d = a || c;
                return e.$isEmpty(d) || Yf.test(d);
            };
        },
        email: function(a, c, d, e, f, g) {
            ib(a, c, d, e, f, g);
            hc(e);
            e.$$parserName = "email";
            e.$validators.email = function(a, c) {
                var d = a || c;
                return e.$isEmpty(d) || Zf.test(d);
            };
        },
        radio: function(a, c, d, e) {
            A(d.name) && c.attr("name", ++nb);
            c.on("click", function(a) {
                c[0].checked && e.$setViewValue(d.value, a && a.type);
            });
            e.$render = function() {
                c[0].checked = d.value == e.$viewValue;
            };
            d.$observe("value", e.$render);
        },
        checkbox: function(a, c, d, e, f, g, h, l) {
            var k = ud(l, a, "ngTrueValue", d.ngTrueValue, !0), m = ud(l, a, "ngFalseValue", d.ngFalseValue, !1);
            c.on("click", function(a) {
                e.$setViewValue(c[0].checked, a && a.type);
            });
            e.$render = function() {
                c[0].checked = e.$viewValue;
            };
            e.$isEmpty = function(a) {
                return !1 === a;
            };
            e.$formatters.push(function(a) {
                return fa(a, k);
            });
            e.$parsers.push(function(a) {
                return a ? k : m;
            });
        },
        hidden: H,
        button: H,
        submit: H,
        reset: H,
        file: H
    }, xc = [ "$browser", "$sniffer", "$filter", "$parse", function(a, c, d, e) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(f, g, h, l) {
                    l[0] && (Dd[Q(h.type)] || Dd.text)(f, g, h, l[0], c, a, d, e);
                }
            }
        };
    } ], ag = /^(true|false|\d+)$/, ye = function() {
        return {
            restrict: "A",
            priority: 100,
            compile: function(a, c) {
                return ag.test(c.ngValue) ? function(a, c, f) {
                    f.$set("value", a.$eval(f.ngValue));
                } : function(a, c, f) {
                    a.$watch(f.ngValue, function(a) {
                        f.$set("value", a);
                    });
                };
            }
        };
    }, Zd = [ "$compile", function(a) {
        return {
            restrict: "AC",
            compile: function(c) {
                a.$$addBindingClass(c);
                return function(c, e, f) {
                    a.$$addBindingInfo(e, f.ngBind);
                    e = e[0];
                    c.$watch(f.ngBind, function(a) {
                        e.textContent = a === t ? "" : a;
                    });
                };
            }
        };
    } ], ae = [ "$interpolate", "$compile", function(a, c) {
        return {
            compile: function(d) {
                c.$$addBindingClass(d);
                return function(d, f, g) {
                    d = a(f.attr(g.$attr.ngBindTemplate));
                    c.$$addBindingInfo(f, d.expressions);
                    f = f[0];
                    g.$observe("ngBindTemplate", function(a) {
                        f.textContent = a === t ? "" : a;
                    });
                };
            }
        };
    } ], $d = [ "$sce", "$parse", "$compile", function(a, c, d) {
        return {
            restrict: "A",
            compile: function(e, f) {
                var g = c(f.ngBindHtml), h = c(f.ngBindHtml, function(a) {
                    return (a || "").toString();
                });
                d.$$addBindingClass(e);
                return function(c, e, f) {
                    d.$$addBindingInfo(e, f.ngBindHtml);
                    c.$watch(h, function() {
                        e.html(a.getTrustedHtml(g(c)) || "");
                    });
                };
            }
        };
    } ], xe = da({
        restrict: "A",
        require: "ngModel",
        link: function(a, c, d, e) {
            e.$viewChangeListeners.push(function() {
                a.$eval(d.ngChange);
            });
        }
    }), be = ic("", !0), de = ic("Odd", 0), ce = ic("Even", 1), ee = Ja({
        compile: function(a, c) {
            c.$set("ngCloak", t);
            a.removeClass("ng-cloak");
        }
    }), fe = [ function() {
        return {
            restrict: "A",
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], Cc = {}, bg = {
        blur: !0,
        focus: !0
    };
    s("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var c = ya("ng-" + a);
        Cc[c] = [ "$parse", "$rootScope", function(d, e) {
            return {
                restrict: "A",
                compile: function(f, g) {
                    var h = d(g[c], null, !0);
                    return function(c, d) {
                        d.on(a, function(d) {
                            var f = function() {
                                h(c, {
                                    $event: d
                                });
                            };
                            bg[a] && e.$$phase ? c.$evalAsync(f) : c.$apply(f);
                        });
                    };
                }
            };
        } ];
    });
    var ie = [ "$animate", function(a) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(c, d, e, f, g) {
                var h, l, k;
                c.$watch(e.ngIf, function(c) {
                    c ? l || g(function(c, f) {
                        l = f;
                        c[c.length++] = Y.createComment(" end ngIf: " + e.ngIf + " ");
                        h = {
                            clone: c
                        };
                        a.enter(c, d.parent(), d);
                    }) : (k && (k.remove(), k = null), l && (l.$destroy(), l = null), h && (k = tb(h.clone), 
                    a.leave(k).then(function() {
                        k = null;
                    }), h = null));
                });
            }
        };
    } ], je = [ "$templateRequest", "$anchorScroll", "$animate", "$sce", function(a, c, d, e) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: ga.noop,
            compile: function(f, g) {
                var h = g.ngInclude || g.src, l = g.onload || "", k = g.autoscroll;
                return function(f, g, q, s, r) {
                    var t = 0, p, v, w, L = function() {
                        v && (v.remove(), v = null);
                        p && (p.$destroy(), p = null);
                        w && (d.leave(w).then(function() {
                            v = null;
                        }), v = w, w = null);
                    };
                    f.$watch(e.parseAsResourceUrl(h), function(e) {
                        var h = function() {
                            !y(k) || k && !f.$eval(k) || c();
                        }, q = ++t;
                        e ? (a(e, !0).then(function(a) {
                            if (q === t) {
                                var c = f.$new();
                                s.template = a;
                                a = r(c, function(a) {
                                    L();
                                    d.enter(a, null, g).then(h);
                                });
                                p = c;
                                w = a;
                                p.$emit("$includeContentLoaded", e);
                                f.$eval(l);
                            }
                        }, function() {
                            q === t && (L(), f.$emit("$includeContentError", e));
                        }), f.$emit("$includeContentRequested", e)) : (L(), s.template = null);
                    });
                };
            }
        };
    } ], Ae = [ "$compile", function(a) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(c, d, e, f) {
                /SVG/.test(d[0].toString()) ? (d.empty(), a(Fc(f.template, Y).childNodes)(c, function(a) {
                    d.append(a);
                }, {
                    futureParentElement: d
                })) : (d.html(f.template), a(d.contents())(c));
            }
        };
    } ], ke = Ja({
        priority: 450,
        compile: function() {
            return {
                pre: function(a, c, d) {
                    a.$eval(d.ngInit);
                }
            };
        }
    }), we = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(a, c, d, e) {
                var f = c.attr(d.$attr.ngList) || ", ", g = "false" !== d.ngTrim, h = g ? U(f) : f;
                e.$parsers.push(function(a) {
                    if (!A(a)) {
                        var c = [];
                        a && s(a.split(h), function(a) {
                            a && c.push(g ? U(a) : a);
                        });
                        return c;
                    }
                });
                e.$formatters.push(function(a) {
                    return D(a) ? a.join(f) : t;
                });
                e.$isEmpty = function(a) {
                    return !a || !a.length;
                };
            }
        };
    }, kb = "ng-valid", vd = "ng-invalid", Sa = "ng-pristine", Kb = "ng-dirty", xd = "ng-pending", Mb = new T("ngModel"), cg = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, c, d, e, f, g, h, l, k, m) {
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$$rawModelValue = t;
        this.$validators = {};
        this.$asyncValidators = {};
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$untouched = !0;
        this.$touched = !1;
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$error = {};
        this.$$success = {};
        this.$pending = t;
        this.$name = m(d.name || "", !1)(a);
        var n = f(d.ngModel), q = n.assign, u = n, r = q, O = null, p = this;
        this.$$setOptions = function(a) {
            if ((p.$options = a) && a.getterSetter) {
                var c = f(d.ngModel + "()"), g = f(d.ngModel + "($$$p)");
                u = function(a) {
                    var d = n(a);
                    G(d) && (d = c(a));
                    return d;
                };
                r = function(a, c) {
                    G(n(a)) ? g(a, {
                        $$$p: p.$modelValue
                    }) : q(a, p.$modelValue);
                };
            } else if (!n.assign) throw Mb("nonassign", d.ngModel, va(e));
        };
        this.$render = H;
        this.$isEmpty = function(a) {
            return A(a) || "" === a || null === a || a !== a;
        };
        var v = e.inheritedData("$formController") || Jb, w = 0;
        sd({
            ctrl: this,
            $element: e,
            set: function(a, c) {
                a[c] = !0;
            },
            unset: function(a, c) {
                delete a[c];
            },
            parentForm: v,
            $animate: g
        });
        this.$setPristine = function() {
            p.$dirty = !1;
            p.$pristine = !0;
            g.removeClass(e, Kb);
            g.addClass(e, Sa);
        };
        this.$setDirty = function() {
            p.$dirty = !0;
            p.$pristine = !1;
            g.removeClass(e, Sa);
            g.addClass(e, Kb);
            v.$setDirty();
        };
        this.$setUntouched = function() {
            p.$touched = !1;
            p.$untouched = !0;
            g.setClass(e, "ng-untouched", "ng-touched");
        };
        this.$setTouched = function() {
            p.$touched = !0;
            p.$untouched = !1;
            g.setClass(e, "ng-touched", "ng-untouched");
        };
        this.$rollbackViewValue = function() {
            h.cancel(O);
            p.$viewValue = p.$$lastCommittedViewValue;
            p.$render();
        };
        this.$validate = function() {
            if (!V(p.$modelValue) || !isNaN(p.$modelValue)) {
                var a = p.$$rawModelValue, c = p.$valid, d = p.$modelValue, e = p.$options && p.$options.allowInvalid;
                p.$$runValidators(p.$error[p.$$parserName || "parse"] ? !1 : t, a, p.$$lastCommittedViewValue, function(f) {
                    e || c === f || (p.$modelValue = f ? a : t, p.$modelValue !== d && p.$$writeModelToScope());
                });
            }
        };
        this.$$runValidators = function(a, c, d, e) {
            function f() {
                var a = !0;
                s(p.$validators, function(e, f) {
                    var g = e(c, d);
                    a = a && g;
                    h(f, g);
                });
                return a ? !0 : (s(p.$asyncValidators, function(a, c) {
                    h(c, null);
                }), !1);
            }
            function g() {
                var a = [], e = !0;
                s(p.$asyncValidators, function(f, g) {
                    var l = f(c, d);
                    if (!l || !G(l.then)) throw Mb("$asyncValidators", l);
                    h(g, t);
                    a.push(l.then(function() {
                        h(g, !0);
                    }, function(a) {
                        e = !1;
                        h(g, !1);
                    }));
                });
                a.length ? k.all(a).then(function() {
                    l(e);
                }, H) : l(!0);
            }
            function h(a, c) {
                m === w && p.$setValidity(a, c);
            }
            function l(a) {
                m === w && e(a);
            }
            w++;
            var m = w;
            (function(a) {
                var c = p.$$parserName || "parse";
                if (a === t) h(c, null); else if (h(c, a), !a) return s(p.$validators, function(a, c) {
                    h(c, null);
                }), s(p.$asyncValidators, function(a, c) {
                    h(c, null);
                }), !1;
                return !0;
            })(a) ? f() ? g() : l(!1) : l(!1);
        };
        this.$commitViewValue = function() {
            var a = p.$viewValue;
            h.cancel(O);
            if (p.$$lastCommittedViewValue !== a || "" === a && p.$$hasNativeValidators) p.$$lastCommittedViewValue = a, 
            p.$pristine && this.$setDirty(), this.$$parseAndValidate();
        };
        this.$$parseAndValidate = function() {
            var c = p.$$lastCommittedViewValue, d = A(c) ? t : !0;
            if (d) for (var e = 0; e < p.$parsers.length; e++) if (c = p.$parsers[e](c), A(c)) {
                d = !1;
                break;
            }
            V(p.$modelValue) && isNaN(p.$modelValue) && (p.$modelValue = u(a));
            var f = p.$modelValue, g = p.$options && p.$options.allowInvalid;
            p.$$rawModelValue = c;
            g && (p.$modelValue = c, p.$modelValue !== f && p.$$writeModelToScope());
            p.$$runValidators(d, c, p.$$lastCommittedViewValue, function(a) {
                g || (p.$modelValue = a ? c : t, p.$modelValue !== f && p.$$writeModelToScope());
            });
        };
        this.$$writeModelToScope = function() {
            r(a, p.$modelValue);
            s(p.$viewChangeListeners, function(a) {
                try {
                    a();
                } catch (d) {
                    c(d);
                }
            });
        };
        this.$setViewValue = function(a, c) {
            p.$viewValue = a;
            p.$options && !p.$options.updateOnDefault || p.$$debounceViewValueCommit(c);
        };
        this.$$debounceViewValueCommit = function(c) {
            var d = 0, e = p.$options;
            e && y(e.debounce) && (e = e.debounce, V(e) ? d = e : V(e[c]) ? d = e[c] : V(e["default"]) && (d = e["default"]));
            h.cancel(O);
            d ? O = h(function() {
                p.$commitViewValue();
            }, d) : l.$$phase ? p.$commitViewValue() : a.$apply(function() {
                p.$commitViewValue();
            });
        };
        a.$watch(function() {
            var c = u(a);
            if (c !== p.$modelValue) {
                p.$modelValue = p.$$rawModelValue = c;
                for (var d = p.$formatters, e = d.length, f = c; e--; ) f = d[e](f);
                p.$viewValue !== f && (p.$viewValue = p.$$lastCommittedViewValue = f, p.$render(), 
                p.$$runValidators(t, c, f, H));
            }
            return c;
        });
    } ], ve = [ "$rootScope", function(a) {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: cg,
            priority: 1,
            compile: function(c) {
                c.addClass(Sa).addClass("ng-untouched").addClass(kb);
                return {
                    pre: function(a, c, f, g) {
                        var h = g[0], l = g[1] || Jb;
                        h.$$setOptions(g[2] && g[2].$options);
                        l.$addControl(h);
                        f.$observe("name", function(a) {
                            h.$name !== a && l.$$renameControl(h, a);
                        });
                        a.$on("$destroy", function() {
                            l.$removeControl(h);
                        });
                    },
                    post: function(c, e, f, g) {
                        var h = g[0];
                        if (h.$options && h.$options.updateOn) e.on(h.$options.updateOn, function(a) {
                            h.$$debounceViewValueCommit(a && a.type);
                        });
                        e.on("blur", function(e) {
                            h.$touched || (a.$$phase ? c.$evalAsync(h.$setTouched) : c.$apply(h.$setTouched));
                        });
                    }
                };
            }
        };
    } ], dg = /(\s+|^)default(\s+|$)/, ze = function() {
        return {
            restrict: "A",
            controller: [ "$scope", "$attrs", function(a, c) {
                var d = this;
                this.$options = a.$eval(c.ngModelOptions);
                this.$options.updateOn !== t ? (this.$options.updateOnDefault = !1, this.$options.updateOn = U(this.$options.updateOn.replace(dg, function() {
                    d.$options.updateOnDefault = !0;
                    return " ";
                }))) : this.$options.updateOnDefault = !0;
            } ]
        };
    }, le = Ja({
        terminal: !0,
        priority: 1e3
    }), me = [ "$locale", "$interpolate", function(a, c) {
        var d = /{}/g, e = /^when(Minus)?(.+)$/;
        return {
            restrict: "EA",
            link: function(f, g, h) {
                function l(a) {
                    g.text(a || "");
                }
                var k = h.count, m = h.$attr.when && g.attr(h.$attr.when), n = h.offset || 0, q = f.$eval(m) || {}, u = {}, m = c.startSymbol(), r = c.endSymbol(), t = m + k + "-" + n + r, p = ga.noop, v;
                s(h, function(a, c) {
                    var d = e.exec(c);
                    d && (d = (d[1] ? "-" : "") + Q(d[2]), q[d] = g.attr(h.$attr[c]));
                });
                s(q, function(a, e) {
                    u[e] = c(a.replace(d, t));
                });
                f.$watch(k, function(c) {
                    c = parseFloat(c);
                    var d = isNaN(c);
                    d || c in q || (c = a.pluralCat(c - n));
                    c === v || d && isNaN(v) || (p(), p = f.$watch(u[c], l), v = c);
                });
            }
        };
    } ], ne = [ "$parse", "$animate", function(a, c) {
        var d = T("ngRepeat"), e = function(a, c, d, e, k, m, n) {
            a[d] = e;
            k && (a[k] = m);
            a.$index = c;
            a.$first = 0 === c;
            a.$last = c === n - 1;
            a.$middle = !(a.$first || a.$last);
            a.$odd = !(a.$even = 0 === (c & 1));
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function(f, g) {
                var h = g.ngRepeat, l = Y.createComment(" end ngRepeat: " + h + " "), k = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!k) throw d("iexp", h);
                var m = k[1], n = k[2], q = k[3], u = k[4], k = m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
                if (!k) throw d("iidexp", m);
                var r = k[3] || k[1], y = k[2];
                if (q && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(q))) throw d("badident", q);
                var p, v, w, A, z = {
                    $id: Na
                };
                u ? p = a(u) : (w = function(a, c) {
                    return Na(c);
                }, A = function(a) {
                    return a;
                });
                return function(a, f, g, k, m) {
                    p && (v = function(c, d, e) {
                        y && (z[y] = c);
                        z[r] = d;
                        z.$index = e;
                        return p(a, z);
                    });
                    var u = ha();
                    a.$watchCollection(n, function(g) {
                        var k, p, n = f[0], E, z = ha(), H, S, N, D, G, C, I;
                        q && (a[q] = g);
                        if (Ta(g)) G = g, p = v || w; else {
                            p = v || A;
                            G = [];
                            for (I in g) g.hasOwnProperty(I) && "$" != I.charAt(0) && G.push(I);
                            G.sort();
                        }
                        H = G.length;
                        I = Array(H);
                        for (k = 0; k < H; k++) if (S = g === G ? k : G[k], N = g[S], D = p(S, N, k), u[D]) C = u[D], 
                        delete u[D], z[D] = C, I[k] = C; else {
                            if (z[D]) throw s(I, function(a) {
                                a && a.scope && (u[a.id] = a);
                            }), d("dupes", h, D, N);
                            I[k] = {
                                id: D,
                                scope: t,
                                clone: t
                            };
                            z[D] = !0;
                        }
                        for (E in u) {
                            C = u[E];
                            D = tb(C.clone);
                            c.leave(D);
                            if (D[0].parentNode) for (k = 0, p = D.length; k < p; k++) D[k].$$NG_REMOVED = !0;
                            C.scope.$destroy();
                        }
                        for (k = 0; k < H; k++) if (S = g === G ? k : G[k], N = g[S], C = I[k], C.scope) {
                            E = n;
                            do E = E.nextSibling; while (E && E.$$NG_REMOVED);
                            C.clone[0] != E && c.move(tb(C.clone), null, B(n));
                            n = C.clone[C.clone.length - 1];
                            e(C.scope, k, r, N, y, S, H);
                        } else m(function(a, d) {
                            C.scope = d;
                            var f = l.cloneNode(!1);
                            a[a.length++] = f;
                            c.enter(a, null, B(n));
                            n = f;
                            C.clone = a;
                            z[C.id] = C;
                            e(C.scope, k, r, N, y, S, H);
                        });
                        u = z;
                    });
                };
            }
        };
    } ], oe = [ "$animate", function(a) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(c, d, e) {
                c.$watch(e.ngShow, function(c) {
                    a[c ? "removeClass" : "addClass"](d, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], he = [ "$animate", function(a) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(c, d, e) {
                c.$watch(e.ngHide, function(c) {
                    a[c ? "addClass" : "removeClass"](d, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], pe = Ja(function(a, c, d) {
        a.$watchCollection(d.ngStyle, function(a, d) {
            d && a !== d && s(d, function(a, d) {
                c.css(d, "");
            });
            a && c.css(a);
        });
    }), qe = [ "$animate", function(a) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(c, d, e, f) {
                var g = [], h = [], l = [], k = [], m = function(a, c) {
                    return function() {
                        a.splice(c, 1);
                    };
                };
                c.$watch(e.ngSwitch || e.on, function(c) {
                    var d, e;
                    d = 0;
                    for (e = l.length; d < e; ++d) a.cancel(l[d]);
                    d = l.length = 0;
                    for (e = k.length; d < e; ++d) {
                        var r = tb(h[d].clone);
                        k[d].$destroy();
                        (l[d] = a.leave(r)).then(m(l, d));
                    }
                    h.length = 0;
                    k.length = 0;
                    (g = f.cases["!" + c] || f.cases["?"]) && s(g, function(c) {
                        c.transclude(function(d, e) {
                            k.push(e);
                            var f = c.element;
                            d[d.length++] = Y.createComment(" end ngSwitchWhen: ");
                            h.push({
                                clone: d
                            });
                            a.enter(d, f.parent(), f);
                        });
                    });
                });
            }
        };
    } ], re = Ja({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, c, d, e, f) {
            e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [];
            e.cases["!" + d.ngSwitchWhen].push({
                transclude: f,
                element: c
            });
        }
    }), se = Ja({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, c, d, e, f) {
            e.cases["?"] = e.cases["?"] || [];
            e.cases["?"].push({
                transclude: f,
                element: c
            });
        }
    }), ue = Ja({
        restrict: "EAC",
        link: function(a, c, d, e, f) {
            if (!f) throw T("ngTransclude")("orphan", va(c));
            f(function(a) {
                c.empty();
                c.append(a);
            });
        }
    }), Vd = [ "$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(c, d) {
                "text/ng-template" == d.type && a.put(d.id, c[0].text);
            }
        };
    } ], eg = T("ngOptions"), te = da({
        restrict: "A",
        terminal: !0
    }), Wd = [ "$compile", "$parse", function(a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = {
            $setViewValue: H
        };
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: [ "$element", "$scope", "$attrs", function(a, c, d) {
                var l = this, k = {}, m = e, n;
                l.databound = d.ngModel;
                l.init = function(a, c, d) {
                    m = a;
                    n = d;
                };
                l.addOption = function(c, d) {
                    Ma(c, '"option value"');
                    k[c] = !0;
                    m.$viewValue == c && (a.val(c), n.parent() && n.remove());
                    d && d[0].hasAttribute("selected") && (d[0].selected = !0);
                };
                l.removeOption = function(a) {
                    this.hasOption(a) && (delete k[a], m.$viewValue === a && this.renderUnknownOption(a));
                };
                l.renderUnknownOption = function(c) {
                    c = "? " + Na(c) + " ?";
                    n.val(c);
                    a.prepend(n);
                    a.val(c);
                    n.prop("selected", !0);
                };
                l.hasOption = function(a) {
                    return k.hasOwnProperty(a);
                };
                c.$on("$destroy", function() {
                    l.renderUnknownOption = H;
                });
            } ],
            link: function(e, g, h, l) {
                function k(a, c, d, e) {
                    d.$render = function() {
                        var a = d.$viewValue;
                        e.hasOption(a) ? (C.parent() && C.remove(), c.val(a), "" === a && p.prop("selected", !0)) : A(a) && p ? c.val("") : e.renderUnknownOption(a);
                    };
                    c.on("change", function() {
                        a.$apply(function() {
                            C.parent() && C.remove();
                            d.$setViewValue(c.val());
                        });
                    });
                }
                function m(a, c, d) {
                    var e;
                    d.$render = function() {
                        var a = new db(d.$viewValue);
                        s(c.find("option"), function(c) {
                            c.selected = y(a.get(c.value));
                        });
                    };
                    a.$watch(function() {
                        fa(e, d.$viewValue) || (e = ra(d.$viewValue), d.$render());
                    });
                    c.on("change", function() {
                        a.$apply(function() {
                            var a = [];
                            s(c.find("option"), function(c) {
                                c.selected && a.push(c.value);
                            });
                            d.$setViewValue(a);
                        });
                    });
                }
                function n(e, f, g) {
                    function h(a, c, d) {
                        T[x] = d;
                        G && (T[G] = c);
                        return a(e, T);
                    }
                    function k(a) {
                        var c;
                        if (u) if (M && D(a)) {
                            c = new db([]);
                            for (var d = 0; d < a.length; d++) c.put(h(M, null, a[d]), !0);
                        } else c = new db(a); else M && (a = h(M, null, a));
                        return function(d, e) {
                            var f;
                            f = M ? M : B ? B : F;
                            return u ? y(c.remove(h(f, d, e))) : a === h(f, d, e);
                        };
                    }
                    function l() {
                        v || (e.$$postDigest(p), v = !0);
                    }
                    function m(a, c, d) {
                        a[c] = a[c] || 0;
                        a[c] += d ? 1 : -1;
                    }
                    function p() {
                        v = !1;
                        var a = {
                            "": []
                        }, c = [ "" ], d, l, n, r, t;
                        n = g.$viewValue;
                        r = P(e) || [];
                        var B = G ? Object.keys(r).sort() : r, x, A, D, F, N = {};
                        t = k(n);
                        var J = !1, U, V;
                        Q = {};
                        for (F = 0; D = B.length, F < D; F++) {
                            x = F;
                            if (G && (x = B[F], "$" === x.charAt(0))) continue;
                            A = r[x];
                            d = h(I, x, A) || "";
                            (l = a[d]) || (l = a[d] = [], c.push(d));
                            d = t(x, A);
                            J = J || d;
                            A = h(C, x, A);
                            A = y(A) ? A : "";
                            V = M ? M(e, T) : G ? B[F] : F;
                            M && (Q[V] = x);
                            l.push({
                                id: V,
                                label: A,
                                selected: d
                            });
                        }
                        u || (z || null === n ? a[""].unshift({
                            id: "",
                            label: "",
                            selected: !J
                        }) : J || a[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        }));
                        x = 0;
                        for (B = c.length; x < B; x++) {
                            d = c[x];
                            l = a[d];
                            R.length <= x ? (n = {
                                element: H.clone().attr("label", d),
                                label: l.label
                            }, r = [ n ], R.push(r), f.append(n.element)) : (r = R[x], n = r[0], n.label != d && n.element.attr("label", n.label = d));
                            J = null;
                            F = 0;
                            for (D = l.length; F < D; F++) d = l[F], (t = r[F + 1]) ? (J = t.element, t.label !== d.label && (m(N, t.label, !1), 
                            m(N, d.label, !0), J.text(t.label = d.label), J.prop("label", t.label)), t.id !== d.id && J.val(t.id = d.id), 
                            J[0].selected !== d.selected && (J.prop("selected", t.selected = d.selected), Ra && J.prop("selected", t.selected))) : ("" === d.id && z ? U = z : (U = w.clone()).val(d.id).prop("selected", d.selected).attr("selected", d.selected).prop("label", d.label).text(d.label), 
                            r.push(t = {
                                element: U,
                                label: d.label,
                                id: d.id,
                                selected: d.selected
                            }), m(N, d.label, !0), J ? J.after(U) : n.element.append(U), J = U);
                            for (F++; r.length > F; ) d = r.pop(), m(N, d.label, !1), d.element.remove();
                        }
                        for (;R.length > x; ) {
                            l = R.pop();
                            for (F = 1; F < l.length; ++F) m(N, l[F].label, !1);
                            l[0].element.remove();
                        }
                        s(N, function(a, c) {
                            0 < a ? q.addOption(c) : 0 > a && q.removeOption(c);
                        });
                    }
                    var n;
                    if (!(n = r.match(d))) throw eg("iexp", r, va(f));
                    var C = c(n[2] || n[1]), x = n[4] || n[6], A = / as /.test(n[0]) && n[1], B = A ? c(A) : null, G = n[5], I = c(n[3] || ""), F = c(n[2] ? n[1] : x), P = c(n[7]), M = n[8] ? c(n[8]) : null, Q = {}, R = [ [ {
                        element: f,
                        label: ""
                    } ] ], T = {};
                    z && (a(z)(e), z.removeClass("ng-scope"), z.remove());
                    f.empty();
                    f.on("change", function() {
                        e.$apply(function() {
                            var a = P(e) || [], c;
                            if (u) c = [], s(f.val(), function(d) {
                                d = M ? Q[d] : d;
                                c.push("?" === d ? t : "" === d ? null : h(B ? B : F, d, a[d]));
                            }); else {
                                var d = M ? Q[f.val()] : f.val();
                                c = "?" === d ? t : "" === d ? null : h(B ? B : F, d, a[d]);
                            }
                            g.$setViewValue(c);
                            p();
                        });
                    });
                    g.$render = p;
                    e.$watchCollection(P, l);
                    e.$watchCollection(function() {
                        var a = P(e), c;
                        if (a && D(a)) {
                            c = Array(a.length);
                            for (var d = 0, f = a.length; d < f; d++) c[d] = h(C, d, a[d]);
                        } else if (a) for (d in c = {}, a) a.hasOwnProperty(d) && (c[d] = h(C, d, a[d]));
                        return c;
                    }, l);
                    u && e.$watchCollection(function() {
                        return g.$modelValue;
                    }, l);
                }
                if (l[1]) {
                    var q = l[0];
                    l = l[1];
                    var u = h.multiple, r = h.ngOptions, z = !1, p, v = !1, w = B(Y.createElement("option")), H = B(Y.createElement("optgroup")), C = w.clone();
                    h = 0;
                    for (var x = g.children(), G = x.length; h < G; h++) if ("" === x[h].value) {
                        p = z = x.eq(h);
                        break;
                    }
                    q.init(l, z, C);
                    u && (l.$isEmpty = function(a) {
                        return !a || 0 === a.length;
                    });
                    r ? n(e, g, l) : u ? m(e, g, l) : k(e, g, l, q);
                }
            }
        };
    } ], Yd = [ "$interpolate", function(a) {
        var c = {
            addOption: H,
            removeOption: H
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(d, e) {
                if (A(e.value)) {
                    var f = a(d.text(), !0);
                    f || e.$set("value", d.text());
                }
                return function(a, d, e) {
                    var k = d.parent(), m = k.data("$selectController") || k.parent().data("$selectController");
                    m && m.databound || (m = c);
                    f ? a.$watch(f, function(a, c) {
                        e.$set("value", a);
                        c !== a && m.removeOption(c);
                        m.addOption(a, d);
                    }) : m.addOption(e.value, d);
                    d.on("$destroy", function() {
                        m.removeOption(e.value);
                    });
                };
            }
        };
    } ], Xd = da({
        restrict: "E",
        terminal: !1
    }), zc = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, c, d, e) {
                e && (d.required = !0, e.$validators.required = function(a, c) {
                    return !d.required || !e.$isEmpty(c);
                }, d.$observe("required", function() {
                    e.$validate();
                }));
            }
        };
    }, yc = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    var f, g = d.ngPattern || d.pattern;
                    d.$observe("pattern", function(a) {
                        F(a) && 0 < a.length && (a = new RegExp("^" + a + "$"));
                        if (a && !a.test) throw T("ngPattern")("noregexp", g, a, va(c));
                        f = a || t;
                        e.$validate();
                    });
                    e.$validators.pattern = function(a) {
                        return e.$isEmpty(a) || A(f) || f.test(a);
                    };
                }
            }
        };
    }, Bc = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    var f = -1;
                    d.$observe("maxlength", function(a) {
                        a = ba(a);
                        f = isNaN(a) ? -1 : a;
                        e.$validate();
                    });
                    e.$validators.maxlength = function(a, c) {
                        return 0 > f || e.$isEmpty(a) || c.length <= f;
                    };
                }
            }
        };
    }, Ac = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    var f = 0;
                    d.$observe("minlength", function(a) {
                        f = ba(a) || 0;
                        e.$validate();
                    });
                    e.$validators.minlength = function(a, c) {
                        return e.$isEmpty(c) || c.length >= f;
                    };
                }
            }
        };
    };
    M.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : (Nd(), 
    Pd(ga), B(Y).ready(function() {
        Jd(Y, sc);
    }));
})(window, document);

!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');

/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
(function($, window, document, undefined) {
    "use strict";
    var header_helpers = function(class_array) {
        var i = class_array.length;
        var head = $("head");
        while (i--) {
            if (head.has("." + class_array[i]).length === 0) {
                head.append('<meta class="' + class_array[i] + '" />');
            }
        }
    };
    header_helpers([ "foundation-mq-small", "foundation-mq-small-only", "foundation-mq-medium", "foundation-mq-medium-only", "foundation-mq-large", "foundation-mq-large-only", "foundation-mq-xlarge", "foundation-mq-xlarge-only", "foundation-mq-xxlarge", "foundation-data-attribute-namespace" ]);
    // Enable FastClick if present
    $(function() {
        if (typeof FastClick !== "undefined") {
            // Don't attach to body if undefined
            if (typeof document.body !== "undefined") {
                FastClick.attach(document.body);
            }
        }
    });
    // private Fast Selector wrapper,
    // returns jQuery object. Only use where
    // getElementById is not available.
    var S = function(selector, context) {
        if (typeof selector === "string") {
            if (context) {
                var cont;
                if (context.jquery) {
                    cont = context[0];
                    if (!cont) return context;
                } else {
                    cont = context;
                }
                return $(cont.querySelectorAll(selector));
            }
            return $(document.querySelectorAll(selector));
        }
        return $(selector, context);
    };
    // Namespace functions.
    var attr_name = function(init) {
        var arr = [];
        if (!init) arr.push("data");
        if (this.namespace.length > 0) arr.push(this.namespace);
        arr.push(this.name);
        return arr.join("-");
    };
    var add_namespace = function(str) {
        var parts = str.split("-"), i = parts.length, arr = [];
        while (i--) {
            if (i !== 0) {
                arr.push(parts[i]);
            } else {
                if (this.namespace.length > 0) {
                    arr.push(this.namespace, parts[i]);
                } else {
                    arr.push(parts[i]);
                }
            }
        }
        return arr.reverse().join("-");
    };
    // Event binding and data-options updating.
    var bindings = function(method, options) {
        var self = this, should_bind_events = !S(this).data(this.attr_name(true));
        if (S(this.scope).is("[" + this.attr_name() + "]")) {
            S(this.scope).data(this.attr_name(true) + "-init", $.extend({}, this.settings, options || method, this.data_options(S(this.scope))));
            if (should_bind_events) {
                this.events(this.scope);
            }
        } else {
            S("[" + this.attr_name() + "]", this.scope).each(function() {
                var should_bind_events = !S(this).data(self.attr_name(true) + "-init");
                S(this).data(self.attr_name(true) + "-init", $.extend({}, self.settings, options || method, self.data_options(S(this))));
                if (should_bind_events) {
                    self.events(this);
                }
            });
        }
        // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
        if (typeof method === "string") {
            return this[method].call(this, options);
        }
    };
    var single_image_loaded = function(image, callback) {
        function loaded() {
            callback(image[0]);
        }
        function bindLoad() {
            this.one("load", loaded);
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var src = this.attr("src"), param = src.match(/\?/) ? "&" : "?";
                param += "random=" + new Date().getTime();
                this.attr("src", src + param);
            }
        }
        if (!image.attr("src")) {
            loaded();
            return;
        }
        if (image[0].complete || image[0].readyState === 4) {
            loaded();
        } else {
            bindLoad.call(image);
        }
    };
    /*
    https://github.com/paulirish/matchMedia.js
  */
    window.matchMedia = window.matchMedia || function(doc) {
        "use strict";
        var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild, // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement("body"), div = doc.createElement("div");
        div.id = "mq-test-1";
        div.style.cssText = "position:absolute;top:-100em";
        fakeBody.style.background = "none";
        fakeBody.appendChild(div);
        return function(q) {
            div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
            docElem.insertBefore(fakeBody, refNode);
            bool = div.offsetWidth === 42;
            docElem.removeChild(fakeBody);
            return {
                matches: bool,
                media: q
            };
        };
    }(document);
    /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */
    (function($) {
        // requestAnimationFrame polyfill adapted from Erik Möller
        // fixes from Paul Irish and Tino Zijdel
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
        var animating, lastTime = 0, vendors = [ "webkit", "moz" ], requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, jqueryFxAvailable = "undefined" !== typeof jQuery.fx;
        for (;lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
            requestAnimationFrame = window[vendors[lastTime] + "RequestAnimationFrame"];
            cancelAnimationFrame = cancelAnimationFrame || window[vendors[lastTime] + "CancelAnimationFrame"] || window[vendors[lastTime] + "CancelRequestAnimationFrame"];
        }
        function raf() {
            if (animating) {
                requestAnimationFrame(raf);
                if (jqueryFxAvailable) {
                    jQuery.fx.tick();
                }
            }
        }
        if (requestAnimationFrame) {
            // use rAF
            window.requestAnimationFrame = requestAnimationFrame;
            window.cancelAnimationFrame = cancelAnimationFrame;
            if (jqueryFxAvailable) {
                jQuery.fx.timer = function(timer) {
                    if (timer() && jQuery.timers.push(timer) && !animating) {
                        animating = true;
                        raf();
                    }
                };
                jQuery.fx.stop = function() {
                    animating = false;
                };
            }
        } else {
            // polyfill
            window.requestAnimationFrame = function(callback) {
                var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    })(jQuery);
    function removeQuotes(string) {
        if (typeof string === "string" || string instanceof String) {
            string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "");
        }
        return string;
    }
    window.Foundation = {
        name: "Foundation",
        version: "5.5.0",
        media_queries: {
            small: S(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "small-only": S(".foundation-mq-small-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            medium: S(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "medium-only": S(".foundation-mq-medium-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            large: S(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "large-only": S(".foundation-mq-large-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xlarge: S(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "xlarge-only": S(".foundation-mq-xlarge-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xxlarge: S(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "")
        },
        stylesheet: $("<style></style>").appendTo("head")[0].sheet,
        global: {
            namespace: undefined
        },
        init: function(scope, libraries, method, options, response) {
            var args = [ scope, method, options, response ], responses = [];
            // check RTL
            this.rtl = /rtl/i.test(S("html").attr("dir"));
            // set foundation global scope
            this.scope = scope || this.scope;
            this.set_namespace();
            if (libraries && typeof libraries === "string" && !/reflow/i.test(libraries)) {
                if (this.libs.hasOwnProperty(libraries)) {
                    responses.push(this.init_lib(libraries, args));
                }
            } else {
                for (var lib in this.libs) {
                    responses.push(this.init_lib(lib, libraries));
                }
            }
            S(window).load(function() {
                S(window).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider");
            });
            return scope;
        },
        init_lib: function(lib, args) {
            if (this.libs.hasOwnProperty(lib)) {
                this.patch(this.libs[lib]);
                if (args && args.hasOwnProperty(lib)) {
                    if (typeof this.libs[lib].settings !== "undefined") {
                        $.extend(true, this.libs[lib].settings, args[lib]);
                    } else if (typeof this.libs[lib].defaults !== "undefined") {
                        $.extend(true, this.libs[lib].defaults, args[lib]);
                    }
                    return this.libs[lib].init.apply(this.libs[lib], [ this.scope, args[lib] ]);
                }
                args = args instanceof Array ? args : new Array(args);
                return this.libs[lib].init.apply(this.libs[lib], args);
            }
            return function() {};
        },
        patch: function(lib) {
            lib.scope = this.scope;
            lib.namespace = this.global.namespace;
            lib.rtl = this.rtl;
            lib["data_options"] = this.utils.data_options;
            lib["attr_name"] = attr_name;
            lib["add_namespace"] = add_namespace;
            lib["bindings"] = bindings;
            lib["S"] = this.utils.S;
        },
        inherit: function(scope, methods) {
            var methods_arr = methods.split(" "), i = methods_arr.length;
            while (i--) {
                if (this.utils.hasOwnProperty(methods_arr[i])) {
                    scope[methods_arr[i]] = this.utils[methods_arr[i]];
                }
            }
        },
        set_namespace: function() {
            // Description:
            //    Don't bother reading the namespace out of the meta tag
            //    if the namespace has been set globally in javascript
            //
            // Example:
            //    Foundation.global.namespace = 'my-namespace';
            // or make it an empty string:
            //    Foundation.global.namespace = '';
            //
            //
            // If the namespace has not been set (is undefined), try to read it out of the meta element.
            // Otherwise use the globally defined namespace, even if it's empty ('')
            var namespace = this.global.namespace === undefined ? $(".foundation-data-attribute-namespace").css("font-family") : this.global.namespace;
            // Finally, if the namsepace is either undefined or false, set it to an empty string.
            // Otherwise use the namespace value.
            this.global.namespace = namespace === undefined || /false/i.test(namespace) ? "" : namespace;
        },
        libs: {},
        // methods that can be inherited in libraries
        utils: {
            // Description:
            //    Fast Selector wrapper returns jQuery object. Only use where getElementById
            //    is not available.
            //
            // Arguments:
            //    Selector (String): CSS selector describing the element(s) to be
            //    returned as a jQuery object.
            //
            //    Scope (String): CSS selector describing the area to be searched. Default
            //    is document.
            //
            // Returns:
            //    Element (jQuery Object): jQuery object containing elements matching the
            //    selector within the scope.
            S: S,
            // Description:
            //    Executes a function a max of once every n milliseconds
            //
            // Arguments:
            //    Func (Function): Function to be throttled.
            //
            //    Delay (Integer): Function execution threshold in milliseconds.
            //
            // Returns:
            //    Lazy_function (Function): Function with throttling applied.
            throttle: function(func, delay) {
                var timer = null;
                return function() {
                    var context = this, args = arguments;
                    if (timer == null) {
                        timer = setTimeout(function() {
                            func.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                };
            },
            // Description:
            //    Executes a function when it stops being invoked for n seconds
            //    Modified version of _.debounce() http://underscorejs.org
            //
            // Arguments:
            //    Func (Function): Function to be debounced.
            //
            //    Delay (Integer): Function execution threshold in milliseconds.
            //
            //    Immediate (Bool): Whether the function should be called at the beginning
            //    of the delay instead of the end. Default is false.
            //
            // Returns:
            //    Lazy_function (Function): Function with debouncing applied.
            debounce: function(func, delay, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) result = func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, delay);
                    if (callNow) result = func.apply(context, args);
                    return result;
                };
            },
            // Description:
            //    Parses data-options attribute
            //
            // Arguments:
            //    El (jQuery Object): Element to be parsed.
            //
            // Returns:
            //    Options (Javascript Object): Contents of the element's data-options
            //    attribute.
            data_options: function(el, data_attr_name) {
                data_attr_name = data_attr_name || "options";
                var opts = {}, ii, p, opts_arr, data_options = function(el) {
                    var namespace = Foundation.global.namespace;
                    if (namespace.length > 0) {
                        return el.data(namespace + "-" + data_attr_name);
                    }
                    return el.data(data_attr_name);
                };
                var cached_options = data_options(el);
                if (typeof cached_options === "object") {
                    return cached_options;
                }
                opts_arr = (cached_options || ":").split(";");
                ii = opts_arr.length;
                function isNumber(o) {
                    return !isNaN(o - 0) && o !== null && o !== "" && o !== false && o !== true;
                }
                function trim(str) {
                    if (typeof str === "string") return $.trim(str);
                    return str;
                }
                while (ii--) {
                    p = opts_arr[ii].split(":");
                    p = [ p[0], p.slice(1).join(":") ];
                    if (/true/i.test(p[1])) p[1] = true;
                    if (/false/i.test(p[1])) p[1] = false;
                    if (isNumber(p[1])) {
                        if (p[1].indexOf(".") === -1) {
                            p[1] = parseInt(p[1], 10);
                        } else {
                            p[1] = parseFloat(p[1]);
                        }
                    }
                    if (p.length === 2 && p[0].length > 0) {
                        opts[trim(p[0])] = trim(p[1]);
                    }
                }
                return opts;
            },
            // Description:
            //    Adds JS-recognizable media queries
            //
            // Arguments:
            //    Media (String): Key string for the media query to be stored as in
            //    Foundation.media_queries
            //
            //    Class (String): Class name for the generated <meta> tag
            register_media: function(media, media_class) {
                if (Foundation.media_queries[media] === undefined) {
                    $("head").append('<meta class="' + media_class + '"/>');
                    Foundation.media_queries[media] = removeQuotes($("." + media_class).css("font-family"));
                }
            },
            // Description:
            //    Add custom CSS within a JS-defined media query
            //
            // Arguments:
            //    Rule (String): CSS rule to be appended to the document.
            //
            //    Media (String): Optional media query string for the CSS rule to be
            //    nested under.
            add_custom_rule: function(rule, media) {
                if (media === undefined && Foundation.stylesheet) {
                    Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
                } else {
                    var query = Foundation.media_queries[media];
                    if (query !== undefined) {
                        Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[media] + "{ " + rule + " }");
                    }
                }
            },
            // Description:
            //    Performs a callback function when an image is fully loaded
            //
            // Arguments:
            //    Image (jQuery Object): Image(s) to check if loaded.
            //
            //    Callback (Function): Function to execute when image is fully loaded.
            image_loaded: function(images, callback) {
                var self = this, unloaded = images.length;
                if (unloaded === 0) {
                    callback(images);
                }
                images.each(function() {
                    single_image_loaded(self.S(this), function() {
                        unloaded -= 1;
                        if (unloaded === 0) {
                            callback(images);
                        }
                    });
                });
            },
            // Description:
            //    Returns a random, alphanumeric string
            //
            // Arguments:
            //    Length (Integer): Length of string to be generated. Defaults to random
            //    integer.
            //
            // Returns:
            //    Rand (String): Pseudo-random, alphanumeric string.
            random_str: function() {
                if (!this.fidx) this.fidx = 0;
                this.prefix = this.prefix || [ this.name || "F", (+new Date()).toString(36) ].join("-");
                return this.prefix + (this.fidx++).toString(36);
            },
            // Description:
            //    Helper for window.matchMedia
            //
            // Arguments:
            //    mq (String): Media query
            //
            // Returns:
            //    (Boolean): Whether the media query passes or not
            match: function(mq) {
                return window.matchMedia(mq).matches;
            },
            // Description:
            //    Helpers for checking Foundation default media queries with JS
            //
            // Returns:
            //    (Boolean): Whether the media query passes or not
            is_small_up: function() {
                return this.match(Foundation.media_queries.small);
            },
            is_medium_up: function() {
                return this.match(Foundation.media_queries.medium);
            },
            is_large_up: function() {
                return this.match(Foundation.media_queries.large);
            },
            is_xlarge_up: function() {
                return this.match(Foundation.media_queries.xlarge);
            },
            is_xxlarge_up: function() {
                return this.match(Foundation.media_queries.xxlarge);
            },
            is_small_only: function() {
                return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },
            is_medium_only: function() {
                return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },
            is_large_only: function() {
                return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },
            is_xlarge_only: function() {
                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
            },
            is_xxlarge_only: function() {
                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
            }
        }
    };
    $.fn.foundation = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            Foundation.init.apply(Foundation, [ this ].concat(args));
            return this;
        });
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.slider = {
        name: "slider",
        version: "5.5.0",
        settings: {
            start: 0,
            end: 100,
            step: 1,
            precision: null,
            initial: null,
            display_selector: "",
            vertical: false,
            trigger_input_change: false,
            on_change: function() {}
        },
        cache: {},
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle");
            this.bindings(method, options);
            this.reflow();
        },
        events: function() {
            var self = this;
            $(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider", "[" + self.attr_name() + "]:not(.disabled, [disabled]) .range-slider-handle", function(e) {
                if (!self.cache.active) {
                    e.preventDefault();
                    self.set_active_slider($(e.target));
                }
            }).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider", function(e) {
                if (!!self.cache.active) {
                    e.preventDefault();
                    if ($.data(self.cache.active[0], "settings").vertical) {
                        var scroll_offset = 0;
                        if (!e.pageY) {
                            scroll_offset = window.scrollY;
                        }
                        self.calculate_position(self.cache.active, self.get_cursor_position(e, "y") + scroll_offset);
                    } else {
                        self.calculate_position(self.cache.active, self.get_cursor_position(e, "x"));
                    }
                }
            }).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider", function(e) {
                self.remove_active_slider();
            }).on("change.fndtn.slider", function(e) {
                self.settings.on_change();
            });
            self.S(window).on("resize.fndtn.slider", self.throttle(function(e) {
                self.reflow();
            }, 300));
        },
        get_cursor_position: function(e, xy) {
            var pageXY = "page" + xy.toUpperCase(), clientXY = "client" + xy.toUpperCase(), position;
            if (typeof e[pageXY] !== "undefined") {
                position = e[pageXY];
            } else if (typeof e.originalEvent[clientXY] !== "undefined") {
                position = e.originalEvent[clientXY];
            } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0][clientXY] !== "undefined") {
                position = e.originalEvent.touches[0][clientXY];
            } else if (e.currentPoint && typeof e.currentPoint[xy] !== "undefined") {
                position = e.currentPoint[xy];
            }
            return position;
        },
        set_active_slider: function($handle) {
            this.cache.active = $handle;
        },
        remove_active_slider: function() {
            this.cache.active = null;
        },
        calculate_position: function($handle, cursor_x) {
            var self = this, settings = $.data($handle[0], "settings"), handle_l = $.data($handle[0], "handle_l"), handle_o = $.data($handle[0], "handle_o"), bar_l = $.data($handle[0], "bar_l"), bar_o = $.data($handle[0], "bar_o");
            requestAnimationFrame(function() {
                var pct;
                if (Foundation.rtl && !settings.vertical) {
                    pct = self.limit_to((bar_o + bar_l - cursor_x) / bar_l, 0, 1);
                } else {
                    pct = self.limit_to((cursor_x - bar_o) / bar_l, 0, 1);
                }
                pct = settings.vertical ? 1 - pct : pct;
                var norm = self.normalized_value(pct, settings.start, settings.end, settings.step, settings.precision);
                self.set_ui($handle, norm);
            });
        },
        set_ui: function($handle, value) {
            var settings = $.data($handle[0], "settings"), handle_l = $.data($handle[0], "handle_l"), bar_l = $.data($handle[0], "bar_l"), norm_pct = this.normalized_percentage(value, settings.start, settings.end), handle_offset = norm_pct * (bar_l - handle_l) - 1, progress_bar_length = norm_pct * 100, $handle_parent = $handle.parent(), $hidden_inputs = $handle.parent().children("input[type=hidden]");
            if (Foundation.rtl && !settings.vertical) {
                handle_offset = -handle_offset;
            }
            handle_offset = settings.vertical ? -handle_offset + bar_l - handle_l + 1 : handle_offset;
            this.set_translate($handle, handle_offset, settings.vertical);
            if (settings.vertical) {
                $handle.siblings(".range-slider-active-segment").css("height", progress_bar_length + "%");
            } else {
                $handle.siblings(".range-slider-active-segment").css("width", progress_bar_length + "%");
            }
            $handle_parent.attr(this.attr_name(), value).trigger("change").trigger("change.fndtn.slider");
            $hidden_inputs.val(value);
            if (settings.trigger_input_change) {
                $hidden_inputs.trigger("change");
            }
            if (!$handle[0].hasAttribute("aria-valuemin")) {
                $handle.attr({
                    "aria-valuemin": settings.start,
                    "aria-valuemax": settings.end
                });
            }
            $handle.attr("aria-valuenow", value);
            if (settings.display_selector != "") {
                $(settings.display_selector).each(function() {
                    if (this.hasOwnProperty("value")) {
                        $(this).val(value);
                    } else {
                        $(this).text(value);
                    }
                });
            }
        },
        normalized_percentage: function(val, start, end) {
            return Math.min(1, (val - start) / (end - start));
        },
        normalized_value: function(val, start, end, step, precision) {
            var range = end - start, point = val * range, mod = (point - point % step) / step, rem = point % step, round = rem >= step * .5 ? step : 0;
            return (mod * step + round + start).toFixed(precision);
        },
        set_translate: function(ele, offset, vertical) {
            if (vertical) {
                $(ele).css("-webkit-transform", "translateY(" + offset + "px)").css("-moz-transform", "translateY(" + offset + "px)").css("-ms-transform", "translateY(" + offset + "px)").css("-o-transform", "translateY(" + offset + "px)").css("transform", "translateY(" + offset + "px)");
            } else {
                $(ele).css("-webkit-transform", "translateX(" + offset + "px)").css("-moz-transform", "translateX(" + offset + "px)").css("-ms-transform", "translateX(" + offset + "px)").css("-o-transform", "translateX(" + offset + "px)").css("transform", "translateX(" + offset + "px)");
            }
        },
        limit_to: function(val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
        initialize_settings: function(handle) {
            var settings = $.extend({}, this.settings, this.data_options($(handle).parent())), decimal_places_match_result;
            if (settings.precision === null) {
                decimal_places_match_result = ("" + settings.step).match(/\.([\d]*)/);
                settings.precision = decimal_places_match_result && decimal_places_match_result[1] ? decimal_places_match_result[1].length : 0;
            }
            if (settings.vertical) {
                $.data(handle, "bar_o", $(handle).parent().offset().top);
                $.data(handle, "bar_l", $(handle).parent().outerHeight());
                $.data(handle, "handle_o", $(handle).offset().top);
                $.data(handle, "handle_l", $(handle).outerHeight());
            } else {
                $.data(handle, "bar_o", $(handle).parent().offset().left);
                $.data(handle, "bar_l", $(handle).parent().outerWidth());
                $.data(handle, "handle_o", $(handle).offset().left);
                $.data(handle, "handle_l", $(handle).outerWidth());
            }
            $.data(handle, "bar", $(handle).parent());
            $.data(handle, "settings", settings);
        },
        set_initial_position: function($ele) {
            var settings = $.data($ele.children(".range-slider-handle")[0], "settings"), initial = typeof settings.initial == "number" && !isNaN(settings.initial) ? settings.initial : Math.floor((settings.end - settings.start) * .5 / settings.step) * settings.step + settings.start, $handle = $ele.children(".range-slider-handle");
            this.set_ui($handle, initial);
        },
        set_value: function(value) {
            var self = this;
            $("[" + self.attr_name() + "]", this.scope).each(function() {
                $(this).attr(self.attr_name(), value);
            });
            if (!!$(this.scope).attr(self.attr_name())) {
                $(this.scope).attr(self.attr_name(), value);
            }
            self.reflow();
        },
        reflow: function() {
            var self = this;
            self.S("[" + this.attr_name() + "]").each(function() {
                var handle = $(this).children(".range-slider-handle")[0], val = $(this).attr(self.attr_name());
                self.initialize_settings(handle);
                if (val) {
                    self.set_ui($(handle), parseFloat(val));
                } else {
                    self.set_initial_position($(this));
                }
            });
        }
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    var Modernizr = Modernizr || false;
    Foundation.libs.joyride = {
        name: "joyride",
        version: "5.5.0",
        defaults: {
            expose: false,
            // turn on or off the expose feature
            modal: true,
            // Whether to cover page with modal during the tour
            keyboard: true,
            // enable left, right and esc keystrokes
            tip_location: "bottom",
            // 'top' or 'bottom' in relation to parent
            nub_position: "auto",
            // override on a per tooltip bases
            scroll_speed: 1500,
            // Page scrolling speed in milliseconds, 0 = no scroll animation
            scroll_animation: "linear",
            // supports 'swing' and 'linear', extend with jQuery UI.
            timer: 0,
            // 0 = no timer , all other numbers = timer in milliseconds
            start_timer_on_click: true,
            // true or false - true requires clicking the first button start the timer
            start_offset: 0,
            // the index of the tooltip you want to start on (index of the li)
            next_button: true,
            // true or false to control whether a next button is used
            prev_button: true,
            // true or false to control whether a prev button is used
            tip_animation: "fade",
            // 'pop' or 'fade' in each tip
            pause_after: [],
            // array of indexes where to pause the tour after
            exposed: [],
            // array of expose elements
            tip_animation_fade_speed: 300,
            // when tipAnimation = 'fade' this is speed in milliseconds for the transition
            cookie_monster: false,
            // true or false to control whether cookies are used
            cookie_name: "joyride",
            // Name the cookie you'll use
            cookie_domain: false,
            // Will this cookie be attached to a domain, ie. '.notableapp.com'
            cookie_expires: 365,
            // set when you would like the cookie to expire.
            tip_container: "body",
            // Where will the tip be attached
            abort_on_close: true,
            // When true, the close event will not fire any callback
            tip_location_patterns: {
                top: [ "bottom" ],
                bottom: [],
                // bottom should not need to be repositioned
                left: [ "right", "top", "bottom" ],
                right: [ "left", "top", "bottom" ]
            },
            post_ride_callback: function() {},
            // A method to call once the tour closes (canceled or complete)
            post_step_callback: function() {},
            // A method to call after each step
            pre_step_callback: function() {},
            // A method to call before each step
            pre_ride_callback: function() {},
            // A method to call before the tour starts (passed index, tip, and cloned exposed element)
            post_expose_callback: function() {},
            // A method to call after an element has been exposed
            template: {
                // HTML segments for tip layout
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>',
                prev_button: '<a href="#" class="small button joyride-prev-tip"></a>',
                modal: '<div class="joyride-modal-bg"></div>',
                expose: '<div class="joyride-expose-wrapper"></div>',
                expose_cover: '<div class="joyride-expose-cover"></div>'
            },
            expose_add_class: ""
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle random_str");
            this.settings = this.settings || $.extend({}, this.defaults, options || method);
            this.bindings(method, options);
        },
        go_next: function() {
            if (this.settings.$li.next().length < 1) {
                this.end();
            } else if (this.settings.timer > 0) {
                clearTimeout(this.settings.automate);
                this.hide();
                this.show();
                this.startTimer();
            } else {
                this.hide();
                this.show();
            }
        },
        go_prev: function() {
            if (this.settings.$li.prev().length < 1) {} else if (this.settings.timer > 0) {
                clearTimeout(this.settings.automate);
                this.hide();
                this.show(null, true);
                this.startTimer();
            } else {
                this.hide();
                this.show(null, true);
            }
        },
        events: function() {
            var self = this;
            $(this.scope).off(".joyride").on("click.fndtn.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
                e.preventDefault();
                this.go_next();
            }.bind(this)).on("click.fndtn.joyride", ".joyride-prev-tip", function(e) {
                e.preventDefault();
                this.go_prev();
            }.bind(this)).on("click.fndtn.joyride", ".joyride-close-tip", function(e) {
                e.preventDefault();
                this.end(this.settings.abort_on_close);
            }.bind(this)).on("keyup.fndtn.joyride", function(e) {
                // Don't do anything if keystrokes are disabled
                // or if the joyride is not being shown
                if (!this.settings.keyboard || !this.settings.riding) return;
                switch (e.which) {
                  case 39:
                    // right arrow
                    e.preventDefault();
                    this.go_next();
                    break;

                  case 37:
                    // left arrow
                    e.preventDefault();
                    this.go_prev();
                    break;

                  case 27:
                    // escape
                    e.preventDefault();
                    this.end(this.settings.abort_on_close);
                }
            }.bind(this));
            $(window).off(".joyride").on("resize.fndtn.joyride", self.throttle(function() {
                if ($("[" + self.attr_name() + "]").length > 0 && self.settings.$next_tip && self.settings.riding) {
                    if (self.settings.exposed.length > 0) {
                        var $els = $(self.settings.exposed);
                        $els.each(function() {
                            var $this = $(this);
                            self.un_expose($this);
                            self.expose($this);
                        });
                    }
                    if (self.is_phone()) {
                        self.pos_phone();
                    } else {
                        self.pos_default(false);
                    }
                }
            }, 100));
        },
        start: function() {
            var self = this, $this = $("[" + this.attr_name() + "]", this.scope), integer_settings = [ "timer", "scrollSpeed", "startOffset", "tipAnimationFadeSpeed", "cookieExpires" ], int_settings_count = integer_settings.length;
            if (!$this.length > 0) return;
            if (!this.settings.init) this.events();
            this.settings = $this.data(this.attr_name(true) + "-init");
            // non configureable settings
            this.settings.$content_el = $this;
            this.settings.$body = $(this.settings.tip_container);
            this.settings.body_offset = $(this.settings.tip_container).position();
            this.settings.$tip_content = this.settings.$content_el.find("> li");
            this.settings.paused = false;
            this.settings.attempts = 0;
            this.settings.riding = true;
            // can we create cookies?
            if (typeof $.cookie !== "function") {
                this.settings.cookie_monster = false;
            }
            // generate the tips and insert into dom.
            if (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) {
                this.settings.$tip_content.each(function(index) {
                    var $this = $(this);
                    this.settings = $.extend({}, self.defaults, self.data_options($this));
                    // Make sure that settings parsed from data_options are integers where necessary
                    var i = int_settings_count;
                    while (i--) {
                        self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
                    }
                    self.create({
                        $li: $this,
                        index: index
                    });
                });
                // show first tip
                if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
                    this.show("init");
                    this.startTimer();
                } else {
                    this.show("init");
                }
            }
        },
        resume: function() {
            this.set_li();
            this.show();
        },
        tip_template: function(opts) {
            var $blank, content;
            opts.tip_class = opts.tip_class || "";
            $blank = $(this.settings.template.tip).addClass(opts.tip_class);
            content = $.trim($(opts.li).html()) + this.prev_button_text(opts.prev_button_text, opts.index) + this.button_text(opts.button_text) + this.settings.template.link + this.timer_instance(opts.index);
            $blank.append($(this.settings.template.wrapper));
            $blank.first().attr(this.add_namespace("data-index"), opts.index);
            $(".joyride-content-wrapper", $blank).append(content);
            return $blank[0];
        },
        timer_instance: function(index) {
            var txt;
            if (index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0 || this.settings.timer === 0) {
                txt = "";
            } else {
                txt = $(this.settings.template.timer)[0].outerHTML;
            }
            return txt;
        },
        button_text: function(txt) {
            if (this.settings.tip_settings.next_button) {
                txt = $.trim(txt) || "Next";
                txt = $(this.settings.template.button).append(txt)[0].outerHTML;
            } else {
                txt = "";
            }
            return txt;
        },
        prev_button_text: function(txt, idx) {
            if (this.settings.tip_settings.prev_button) {
                txt = $.trim(txt) || "Previous";
                // Add the disabled class to the button if it's the first element
                if (idx == 0) txt = $(this.settings.template.prev_button).append(txt).addClass("disabled")[0].outerHTML; else txt = $(this.settings.template.prev_button).append(txt)[0].outerHTML;
            } else {
                txt = "";
            }
            return txt;
        },
        create: function(opts) {
            this.settings.tip_settings = $.extend({}, this.settings, this.data_options(opts.$li));
            var buttonText = opts.$li.attr(this.add_namespace("data-button")) || opts.$li.attr(this.add_namespace("data-text")), prevButtonText = opts.$li.attr(this.add_namespace("data-button-prev")) || opts.$li.attr(this.add_namespace("data-prev-text")), tipClass = opts.$li.attr("class"), $tip_content = $(this.tip_template({
                tip_class: tipClass,
                index: opts.index,
                button_text: buttonText,
                prev_button_text: prevButtonText,
                li: opts.$li
            }));
            $(this.settings.tip_container).append($tip_content);
        },
        show: function(init, is_prev) {
            var $timer = null;
            // are we paused?
            if (this.settings.$li === undefined || $.inArray(this.settings.$li.index(), this.settings.pause_after) === -1) {
                // don't go to the next li if the tour was paused
                if (this.settings.paused) {
                    this.settings.paused = false;
                } else {
                    this.set_li(init, is_prev);
                }
                this.settings.attempts = 0;
                if (this.settings.$li.length && this.settings.$target.length > 0) {
                    if (init) {
                        //run when we first start
                        this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);
                        if (this.settings.modal) {
                            this.show_modal();
                        }
                    }
                    this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);
                    if (this.settings.modal && this.settings.expose) {
                        this.expose();
                    }
                    this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li));
                    this.settings.timer = parseInt(this.settings.timer, 10);
                    this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];
                    // scroll and hide bg if not modal
                    if (!/body/i.test(this.settings.$target.selector)) {
                        var joyridemodalbg = $(".joyride-modal-bg");
                        if (/pop/i.test(this.settings.tipAnimation)) {
                            joyridemodalbg.hide();
                        } else {
                            joyridemodalbg.fadeOut(this.settings.tipAnimationFadeSpeed);
                        }
                        this.scroll_to();
                    }
                    if (this.is_phone()) {
                        this.pos_phone(true);
                    } else {
                        this.pos_default(true);
                    }
                    $timer = this.settings.$next_tip.find(".joyride-timer-indicator");
                    if (/pop/i.test(this.settings.tip_animation)) {
                        $timer.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.show();
                            setTimeout(function() {
                                $timer.animate({
                                    width: $timer.parent().width()
                                }, this.settings.timer, "linear");
                            }.bind(this), this.settings.tip_animation_fade_speed);
                        } else {
                            this.settings.$next_tip.show();
                        }
                    } else if (/fade/i.test(this.settings.tip_animation)) {
                        $timer.width(0);
                        if (this.settings.timer > 0) {
                            this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show();
                            setTimeout(function() {
                                $timer.animate({
                                    width: $timer.parent().width()
                                }, this.settings.timer, "linear");
                            }.bind(this), this.settings.tip_animation_fade_speed);
                        } else {
                            this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);
                        }
                    }
                    this.settings.$current_tip = this.settings.$next_tip;
                } else if (this.settings.$li && this.settings.$target.length < 1) {
                    this.show(init, is_prev);
                } else {
                    this.end();
                }
            } else {
                this.settings.paused = true;
            }
        },
        is_phone: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        hide: function() {
            if (this.settings.modal && this.settings.expose) {
                this.un_expose();
            }
            if (!this.settings.modal) {
                $(".joyride-modal-bg").hide();
            }
            // Prevent scroll bouncing...wait to remove from layout
            this.settings.$current_tip.css("visibility", "hidden");
            setTimeout($.proxy(function() {
                this.hide();
                this.css("visibility", "visible");
            }, this.settings.$current_tip), 0);
            this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
        },
        set_li: function(init, is_prev) {
            if (init) {
                this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
                this.set_next_tip();
                this.settings.$current_tip = this.settings.$next_tip;
            } else {
                if (is_prev) this.settings.$li = this.settings.$li.prev(); else this.settings.$li = this.settings.$li.next();
                this.set_next_tip();
            }
            this.set_target();
        },
        set_next_tip: function() {
            this.settings.$next_tip = $(".joyride-tip-guide").eq(this.settings.$li.index());
            this.settings.$next_tip.data("closed", "");
        },
        set_target: function() {
            var cl = this.settings.$li.attr(this.add_namespace("data-class")), id = this.settings.$li.attr(this.add_namespace("data-id")), $sel = function() {
                if (id) {
                    return $(document.getElementById(id));
                } else if (cl) {
                    return $("." + cl).first();
                } else {
                    return $("body");
                }
            };
            this.settings.$target = $sel();
        },
        scroll_to: function() {
            var window_half, tipOffset;
            window_half = $(window).height() / 2;
            tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight());
            if (tipOffset != 0) {
                $("html, body").stop().animate({
                    scrollTop: tipOffset
                }, this.settings.scroll_speed, "swing");
            }
        },
        paused: function() {
            return $.inArray(this.settings.$li.index() + 1, this.settings.pause_after) === -1;
        },
        restart: function() {
            this.hide();
            this.settings.$li = undefined;
            this.show("init");
        },
        pos_default: function(init) {
            var $nub = this.settings.$next_tip.find(".joyride-nub"), nub_width = Math.ceil($nub.outerWidth() / 2), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || false;
            // tip must not be "display: none" to calculate position
            if (toggle) {
                this.settings.$next_tip.css("visibility", "hidden");
                this.settings.$next_tip.show();
            }
            if (!/body/i.test(this.settings.$target.selector)) {
                var topAdjustment = this.settings.tip_settings.tipAdjustmentY ? parseInt(this.settings.tip_settings.tipAdjustmentY) : 0, leftAdjustment = this.settings.tip_settings.tipAdjustmentX ? parseInt(this.settings.tip_settings.tipAdjustmentX) : 0;
                if (this.bottom()) {
                    if (this.rtl) {
                        this.settings.$next_tip.css({
                            top: this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment,
                            left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth() + leftAdjustment
                        });
                    } else {
                        this.settings.$next_tip.css({
                            top: this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment,
                            left: this.settings.$target.offset().left + leftAdjustment
                        });
                    }
                    this.nub_position($nub, this.settings.tip_settings.nub_position, "top");
                } else if (this.top()) {
                    if (this.rtl) {
                        this.settings.$next_tip.css({
                            top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment,
                            left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()
                        });
                    } else {
                        this.settings.$next_tip.css({
                            top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment,
                            left: this.settings.$target.offset().left + leftAdjustment
                        });
                    }
                    this.nub_position($nub, this.settings.tip_settings.nub_position, "bottom");
                } else if (this.right()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top + topAdjustment,
                        left: this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width + leftAdjustment
                    });
                    this.nub_position($nub, this.settings.tip_settings.nub_position, "left");
                } else if (this.left()) {
                    this.settings.$next_tip.css({
                        top: this.settings.$target.offset().top + topAdjustment,
                        left: this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width + leftAdjustment
                    });
                    this.nub_position($nub, this.settings.tip_settings.nub_position, "right");
                }
                if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {
                    $nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");
                    this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];
                    this.settings.attempts++;
                    this.pos_default();
                }
            } else if (this.settings.$li.length) {
                this.pos_modal($nub);
            }
            if (toggle) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css("visibility", "visible");
            }
        },
        pos_phone: function(init) {
            var tip_height = this.settings.$next_tip.outerHeight(), tip_offset = this.settings.$next_tip.offset(), target_height = this.settings.$target.outerHeight(), $nub = $(".joyride-nub", this.settings.$next_tip), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || false;
            $nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");
            if (toggle) {
                this.settings.$next_tip.css("visibility", "hidden");
                this.settings.$next_tip.show();
            }
            if (!/body/i.test(this.settings.$target.selector)) {
                if (this.top()) {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top - tip_height - nub_height
                    });
                    $nub.addClass("bottom");
                } else {
                    this.settings.$next_tip.offset({
                        top: this.settings.$target.offset().top + target_height + nub_height
                    });
                    $nub.addClass("top");
                }
            } else if (this.settings.$li.length) {
                this.pos_modal($nub);
            }
            if (toggle) {
                this.settings.$next_tip.hide();
                this.settings.$next_tip.css("visibility", "visible");
            }
        },
        pos_modal: function($nub) {
            this.center();
            $nub.hide();
            this.show_modal();
        },
        show_modal: function() {
            if (!this.settings.$next_tip.data("closed")) {
                var joyridemodalbg = $(".joyride-modal-bg");
                if (joyridemodalbg.length < 1) {
                    var joyridemodalbg = $(this.settings.template.modal);
                    joyridemodalbg.appendTo("body");
                }
                if (/pop/i.test(this.settings.tip_animation)) {
                    joyridemodalbg.show();
                } else {
                    joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);
                }
            }
        },
        expose: function() {
            var expose, exposeCover, el, origCSS, origClasses, randId = "expose-" + this.random_str(6);
            if (arguments.length > 0 && arguments[0] instanceof $) {
                el = arguments[0];
            } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
                el = this.settings.$target;
            } else {
                return false;
            }
            if (el.length < 1) {
                if (window.console) {
                    console.error("element not valid", el);
                }
                return false;
            }
            expose = $(this.settings.template.expose);
            this.settings.$body.append(expose);
            expose.css({
                top: el.offset().top,
                left: el.offset().left,
                width: el.outerWidth(true),
                height: el.outerHeight(true)
            });
            exposeCover = $(this.settings.template.expose_cover);
            origCSS = {
                zIndex: el.css("z-index"),
                position: el.css("position")
            };
            origClasses = el.attr("class") == null ? "" : el.attr("class");
            el.css("z-index", parseInt(expose.css("z-index")) + 1);
            if (origCSS.position == "static") {
                el.css("position", "relative");
            }
            el.data("expose-css", origCSS);
            el.data("orig-class", origClasses);
            el.attr("class", origClasses + " " + this.settings.expose_add_class);
            exposeCover.css({
                top: el.offset().top,
                left: el.offset().left,
                width: el.outerWidth(true),
                height: el.outerHeight(true)
            });
            if (this.settings.modal) this.show_modal();
            this.settings.$body.append(exposeCover);
            expose.addClass(randId);
            exposeCover.addClass(randId);
            el.data("expose", randId);
            this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el);
            this.add_exposed(el);
        },
        un_expose: function() {
            var exposeId, el, expose, origCSS, origClasses, clearAll = false;
            if (arguments.length > 0 && arguments[0] instanceof $) {
                el = arguments[0];
            } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
                el = this.settings.$target;
            } else {
                return false;
            }
            if (el.length < 1) {
                if (window.console) {
                    console.error("element not valid", el);
                }
                return false;
            }
            exposeId = el.data("expose");
            expose = $("." + exposeId);
            if (arguments.length > 1) {
                clearAll = arguments[1];
            }
            if (clearAll === true) {
                $(".joyride-expose-wrapper,.joyride-expose-cover").remove();
            } else {
                expose.remove();
            }
            origCSS = el.data("expose-css");
            if (origCSS.zIndex == "auto") {
                el.css("z-index", "");
            } else {
                el.css("z-index", origCSS.zIndex);
            }
            if (origCSS.position != el.css("position")) {
                if (origCSS.position == "static") {
                    // this is default, no need to set it.
                    el.css("position", "");
                } else {
                    el.css("position", origCSS.position);
                }
            }
            origClasses = el.data("orig-class");
            el.attr("class", origClasses);
            el.removeData("orig-classes");
            el.removeData("expose");
            el.removeData("expose-z-index");
            this.remove_exposed(el);
        },
        add_exposed: function(el) {
            this.settings.exposed = this.settings.exposed || [];
            if (el instanceof $ || typeof el === "object") {
                this.settings.exposed.push(el[0]);
            } else if (typeof el == "string") {
                this.settings.exposed.push(el);
            }
        },
        remove_exposed: function(el) {
            var search, i;
            if (el instanceof $) {
                search = el[0];
            } else if (typeof el == "string") {
                search = el;
            }
            this.settings.exposed = this.settings.exposed || [];
            i = this.settings.exposed.length;
            while (i--) {
                if (this.settings.exposed[i] == search) {
                    this.settings.exposed.splice(i, 1);
                    return;
                }
            }
        },
        center: function() {
            var $w = $(window);
            this.settings.$next_tip.css({
                top: ($w.height() - this.settings.$next_tip.outerHeight()) / 2 + $w.scrollTop(),
                left: ($w.width() - this.settings.$next_tip.outerWidth()) / 2 + $w.scrollLeft()
            });
            return true;
        },
        bottom: function() {
            return /bottom/i.test(this.settings.tip_settings.tip_location);
        },
        top: function() {
            return /top/i.test(this.settings.tip_settings.tip_location);
        },
        right: function() {
            return /right/i.test(this.settings.tip_settings.tip_location);
        },
        left: function() {
            return /left/i.test(this.settings.tip_settings.tip_location);
        },
        corners: function(el) {
            var w = $(window), window_half = w.height() / 2, //using this to calculate since scroll may not have finished yet.
            tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()), right = w.width() + w.scrollLeft(), offsetBottom = w.height() + tipOffset, bottom = w.height() + w.scrollTop(), top = w.scrollTop();
            if (tipOffset < top) {
                if (tipOffset < 0) {
                    top = 0;
                } else {
                    top = tipOffset;
                }
            }
            if (offsetBottom > bottom) {
                bottom = offsetBottom;
            }
            return [ el.offset().top < top, right < el.offset().left + el.outerWidth(), bottom < el.offset().top + el.outerHeight(), w.scrollLeft() > el.offset().left ];
        },
        visible: function(hidden_corners) {
            var i = hidden_corners.length;
            while (i--) {
                if (hidden_corners[i]) return false;
            }
            return true;
        },
        nub_position: function(nub, pos, def) {
            if (pos === "auto") {
                nub.addClass(def);
            } else {
                nub.addClass(pos);
            }
        },
        startTimer: function() {
            if (this.settings.$li.length) {
                this.settings.automate = setTimeout(function() {
                    this.hide();
                    this.show();
                    this.startTimer();
                }.bind(this), this.settings.timer);
            } else {
                clearTimeout(this.settings.automate);
            }
        },
        end: function(abort) {
            if (this.settings.cookie_monster) {
                $.cookie(this.settings.cookie_name, "ridden", {
                    expires: this.settings.cookie_expires,
                    domain: this.settings.cookie_domain
                });
            }
            if (this.settings.timer > 0) {
                clearTimeout(this.settings.automate);
            }
            if (this.settings.modal && this.settings.expose) {
                this.un_expose();
            }
            // Unplug keystrokes listener
            $(this.scope).off("keyup.joyride");
            this.settings.$next_tip.data("closed", true);
            this.settings.riding = false;
            $(".joyride-modal-bg").hide();
            this.settings.$current_tip.hide();
            if (typeof abort === "undefined" || abort === false) {
                this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
                this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip);
            }
            $(".joyride-tip-guide").remove();
        },
        off: function() {
            $(this.scope).off(".joyride");
            $(window).off(".joyride");
            $(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride");
            $(".joyride-tip-guide, .joyride-modal-bg").remove();
            clearTimeout(this.settings.automate);
            this.settings = {};
        },
        reflow: function() {}
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.equalizer = {
        name: "equalizer",
        version: "5.5.0",
        settings: {
            use_tallest: true,
            before_height_change: $.noop,
            after_height_change: $.noop,
            equalize_on_stack: false
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "image_loaded");
            this.bindings(method, options);
            this.reflow();
        },
        events: function() {
            this.S(window).off(".equalizer").on("resize.fndtn.equalizer", function(e) {
                this.reflow();
            }.bind(this));
        },
        equalize: function(equalizer) {
            var isStacked = false, vals = equalizer.find("[" + this.attr_name() + "-watch]:visible"), settings = equalizer.data(this.attr_name(true) + "-init");
            if (vals.length === 0) return;
            var firstTopOffset = vals.first().offset().top;
            settings.before_height_change();
            equalizer.trigger("before-height-change").trigger("before-height-change.fndth.equalizer");
            vals.height("inherit");
            vals.each(function() {
                var el = $(this);
                if (el.offset().top !== firstTopOffset) {
                    isStacked = true;
                }
            });
            if (settings.equalize_on_stack === false) {
                if (isStacked) return;
            }
            var heights = vals.map(function() {
                return $(this).outerHeight(false);
            }).get();
            if (settings.use_tallest) {
                var max = Math.max.apply(null, heights);
                vals.css("height", max);
            } else {
                var min = Math.min.apply(null, heights);
                vals.css("height", min);
            }
            settings.after_height_change();
            equalizer.trigger("after-height-change").trigger("after-height-change.fndtn.equalizer");
        },
        reflow: function() {
            var self = this;
            this.S("[" + this.attr_name() + "]", this.scope).each(function() {
                var $eq_target = $(this);
                self.image_loaded(self.S("img", this), function() {
                    self.equalize($eq_target);
                });
            });
        }
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.dropdown = {
        name: "dropdown",
        version: "5.5.0",
        settings: {
            active_class: "open",
            disabled_class: "disabled",
            mega_class: "mega",
            align: "bottom",
            is_hover: false,
            hover_timeout: 150,
            opened: function() {},
            closed: function() {}
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle");
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
        },
        events: function(scope) {
            var self = this, S = self.S;
            S(this.scope).off(".dropdown").on("click.fndtn.dropdown", "[" + this.attr_name() + "]", function(e) {
                var settings = S(this).data(self.attr_name(true) + "-init") || self.settings;
                if (!settings.is_hover || Modernizr.touch) {
                    e.preventDefault();
                    if (S(this).parent("[data-reveal-id]")) {
                        e.stopPropagation();
                    }
                    self.toggle($(this));
                }
            }).on("mouseenter.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(e) {
                var $this = S(this), dropdown, target;
                clearTimeout(self.timeout);
                if ($this.data(self.data_attr())) {
                    dropdown = S("#" + $this.data(self.data_attr()));
                    target = $this;
                } else {
                    dropdown = $this;
                    target = S("[" + self.attr_name() + '="' + dropdown.attr("id") + '"]');
                }
                var settings = target.data(self.attr_name(true) + "-init") || self.settings;
                if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) {
                    self.closeall.call(self);
                }
                if (settings.is_hover) self.open.apply(self, [ dropdown, target ]);
            }).on("mouseleave.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(e) {
                var $this = S(this);
                var settings;
                if ($this.data(self.data_attr())) {
                    settings = $this.data(self.data_attr(true) + "-init") || self.settings;
                } else {
                    var target = S("[" + self.attr_name() + '="' + S(this).attr("id") + '"]'), settings = target.data(self.attr_name(true) + "-init") || self.settings;
                }
                self.timeout = setTimeout(function() {
                    if ($this.data(self.data_attr())) {
                        if (settings.is_hover) self.close.call(self, S("#" + $this.data(self.data_attr())));
                    } else {
                        if (settings.is_hover) self.close.call(self, $this);
                    }
                }.bind(this), settings.hover_timeout);
            }).on("click.fndtn.dropdown", function(e) {
                var parent = S(e.target).closest("[" + self.attr_name() + "-content]");
                var links = parent.find("a");
                if (links.length > 0 && parent.attr("aria-autoclose") !== "false") {
                    self.close.call(self, S("[" + self.attr_name() + "-content]"));
                }
                if (S(e.target).closest("[" + self.attr_name() + "]").length > 0) {
                    return;
                }
                if (!S(e.target).data("revealId") && (parent.length > 0 && (S(e.target).is("[" + self.attr_name() + "-content]") || $.contains(parent.first()[0], e.target)))) {
                    e.stopPropagation();
                    return;
                }
                self.close.call(self, S("[" + self.attr_name() + "-content]"));
            }).on("opened.fndtn.dropdown", "[" + self.attr_name() + "-content]", function() {
                self.settings.opened.call(this);
            }).on("closed.fndtn.dropdown", "[" + self.attr_name() + "-content]", function() {
                self.settings.closed.call(this);
            });
            S(window).off(".dropdown").on("resize.fndtn.dropdown", self.throttle(function() {
                self.resize.call(self);
            }, 50));
            this.resize();
        },
        close: function(dropdown) {
            var self = this;
            dropdown.each(function() {
                var original_target = $("[" + self.attr_name() + "=" + dropdown[0].id + "]") || $("aria-controls=" + dropdown[0].id + "]");
                original_target.attr("aria-expanded", "false");
                if (self.S(this).hasClass(self.settings.active_class)) {
                    self.S(this).css(Foundation.rtl ? "right" : "left", "-99999px").attr("aria-hidden", "true").removeClass(self.settings.active_class).prev("[" + self.attr_name() + "]").removeClass(self.settings.active_class).removeData("target");
                    self.S(this).trigger("closed").trigger("closed.fndtn.dropdown", [ dropdown ]);
                }
            });
            dropdown.removeClass("f-open-" + this.attr_name(true));
        },
        closeall: function() {
            var self = this;
            $.each(self.S(".f-open-" + this.attr_name(true)), function() {
                self.close.call(self, self.S(this));
            });
        },
        open: function(dropdown, target) {
            this.css(dropdown.addClass(this.settings.active_class), target);
            dropdown.prev("[" + this.attr_name() + "]").addClass(this.settings.active_class);
            dropdown.data("target", target.get(0)).trigger("opened").trigger("opened.fndtn.dropdown", [ dropdown, target ]);
            dropdown.attr("aria-hidden", "false");
            target.attr("aria-expanded", "true");
            dropdown.focus();
            dropdown.addClass("f-open-" + this.attr_name(true));
        },
        data_attr: function() {
            if (this.namespace.length > 0) {
                return this.namespace + "-" + this.name;
            }
            return this.name;
        },
        toggle: function(target) {
            if (target.hasClass(this.settings.disabled_class)) {
                return;
            }
            var dropdown = this.S("#" + target.data(this.data_attr()));
            if (dropdown.length === 0) {
                // No dropdown found, not continuing
                return;
            }
            this.close.call(this, this.S("[" + this.attr_name() + "-content]").not(dropdown));
            if (dropdown.hasClass(this.settings.active_class)) {
                this.close.call(this, dropdown);
                if (dropdown.data("target") !== target.get(0)) this.open.call(this, dropdown, target);
            } else {
                this.open.call(this, dropdown, target);
            }
        },
        resize: function() {
            var dropdown = this.S("[" + this.attr_name() + "-content].open"), target = this.S("[" + this.attr_name() + '="' + dropdown.attr("id") + '"]');
            if (dropdown.length && target.length) {
                this.css(dropdown, target);
            }
        },
        css: function(dropdown, target) {
            var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8), settings = target.data(this.attr_name(true) + "-init") || this.settings;
            this.clear_idx();
            if (this.small()) {
                var p = this.dirs.bottom.call(dropdown, target, settings);
                dropdown.attr("style", "").removeClass("drop-left drop-right drop-top").css({
                    position: "absolute",
                    width: "95%",
                    "max-width": "none",
                    top: p.top
                });
                dropdown.css(Foundation.rtl ? "right" : "left", left_offset);
            } else {
                this.style(dropdown, target, settings);
            }
            return dropdown;
        },
        style: function(dropdown, target, settings) {
            var css = $.extend({
                position: "absolute"
            }, this.dirs[settings.align].call(dropdown, target, settings));
            dropdown.attr("style", "").css(css);
        },
        // return CSS property object
        // `this` is the dropdown
        dirs: {
            // Calculate target offset
            _base: function(t) {
                var o_p = this.offsetParent(), o = o_p.offset(), p = t.offset();
                p.top -= o.top;
                p.left -= o.left;
                //set some flags on the p object to pass along
                p.missRight = false;
                p.missTop = false;
                p.missLeft = false;
                p.leftRightFlag = false;
                //lets see if the panel will be off the screen
                //get the actual width of the page and store it
                var actualBodyWidth;
                if (document.getElementsByClassName("row")[0]) {
                    actualBodyWidth = document.getElementsByClassName("row")[0].clientWidth;
                } else {
                    actualBodyWidth = window.outerWidth;
                }
                var actualMarginWidth = (window.outerWidth - actualBodyWidth) / 2;
                var actualBoundary = actualBodyWidth;
                if (!this.hasClass("mega")) {
                    //miss top
                    if (t.offset().top <= this.outerHeight()) {
                        p.missTop = true;
                        actualBoundary = window.outerWidth - actualMarginWidth;
                        p.leftRightFlag = true;
                    }
                    //miss right
                    if (t.offset().left + this.outerWidth() > t.offset().left + actualMarginWidth && t.offset().left - actualMarginWidth > this.outerWidth()) {
                        p.missRight = true;
                        p.missLeft = false;
                    }
                    //miss left
                    if (t.offset().left - this.outerWidth() <= 0) {
                        p.missLeft = true;
                        p.missRight = false;
                    }
                }
                return p;
            },
            top: function(t, s) {
                var self = Foundation.libs.dropdown, p = self.dirs._base.call(this, t);
                this.addClass("drop-top");
                if (p.missTop == true) {
                    p.top = p.top + t.outerHeight() + this.outerHeight();
                    this.removeClass("drop-top");
                }
                if (p.missRight == true) {
                    p.left = p.left - this.outerWidth() + t.outerWidth();
                }
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }
                if (Foundation.rtl) {
                    return {
                        left: p.left - this.outerWidth() + t.outerWidth(),
                        top: p.top - this.outerHeight()
                    };
                }
                return {
                    left: p.left,
                    top: p.top - this.outerHeight()
                };
            },
            bottom: function(t, s) {
                var self = Foundation.libs.dropdown, p = self.dirs._base.call(this, t);
                if (p.missRight == true) {
                    p.left = p.left - this.outerWidth() + t.outerWidth();
                }
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }
                if (self.rtl) {
                    return {
                        left: p.left - this.outerWidth() + t.outerWidth(),
                        top: p.top + t.outerHeight()
                    };
                }
                return {
                    left: p.left,
                    top: p.top + t.outerHeight()
                };
            },
            left: function(t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t);
                this.addClass("drop-left");
                if (p.missLeft == true) {
                    p.left = p.left + this.outerWidth();
                    p.top = p.top + t.outerHeight();
                    this.removeClass("drop-left");
                }
                return {
                    left: p.left - this.outerWidth(),
                    top: p.top
                };
            },
            right: function(t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t);
                this.addClass("drop-right");
                if (p.missRight == true) {
                    p.left = p.left - this.outerWidth();
                    p.top = p.top + t.outerHeight();
                    this.removeClass("drop-right");
                } else {
                    p.triggeredRight = true;
                }
                var self = Foundation.libs.dropdown;
                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }
                return {
                    left: p.left + t.outerWidth(),
                    top: p.top
                };
            }
        },
        // Insert rule to style psuedo elements
        adjust_pip: function(dropdown, target, settings, position) {
            var sheet = Foundation.stylesheet, pip_offset_base = 8;
            if (dropdown.hasClass(settings.mega_class)) {
                pip_offset_base = position.left + target.outerWidth() / 2 - 8;
            } else if (this.small()) {
                pip_offset_base += position.left - 8;
            }
            this.rule_idx = sheet.cssRules.length;
            //default
            var sel_before = ".f-dropdown.open:before", sel_after = ".f-dropdown.open:after", css_before = "left: " + pip_offset_base + "px;", css_after = "left: " + (pip_offset_base - 1) + "px;";
            if (position.missRight == true) {
                pip_offset_base = dropdown.outerWidth() - 23;
                sel_before = ".f-dropdown.open:before", sel_after = ".f-dropdown.open:after", css_before = "left: " + pip_offset_base + "px;", 
                css_after = "left: " + (pip_offset_base - 1) + "px;";
            }
            //just a case where right is fired, but its not missing right
            if (position.triggeredRight == true) {
                sel_before = ".f-dropdown.open:before", sel_after = ".f-dropdown.open:after", css_before = "left:-12px;", 
                css_after = "left:-14px;";
            }
            if (sheet.insertRule) {
                sheet.insertRule([ sel_before, "{", css_before, "}" ].join(" "), this.rule_idx);
                sheet.insertRule([ sel_after, "{", css_after, "}" ].join(" "), this.rule_idx + 1);
            } else {
                sheet.addRule(sel_before, css_before, this.rule_idx);
                sheet.addRule(sel_after, css_after, this.rule_idx + 1);
            }
        },
        // Remove old dropdown rule index
        clear_idx: function() {
            var sheet = Foundation.stylesheet;
            if (typeof this.rule_idx !== "undefined") {
                sheet.deleteRule(this.rule_idx);
                sheet.deleteRule(this.rule_idx);
                delete this.rule_idx;
            }
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        off: function() {
            this.S(this.scope).off(".fndtn.dropdown");
            this.S("html, body").off(".fndtn.dropdown");
            this.S(window).off(".fndtn.dropdown");
            this.S("[data-dropdown-content]").off(".fndtn.dropdown");
        },
        reflow: function() {}
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.clearing = {
        name: "clearing",
        version: "5.5.0",
        settings: {
            templates: {
                viewing: '<a href="#" class="clearing-close">&times;</a>' + '<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' + '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' + '<a href="#" class="clearing-main-next"><span></span></a></div>'
            },
            // comma delimited list of selectors that, on click, will close clearing,
            // add 'div.clearing-blackout, div.visible-img' to close on background click
            close_selectors: ".clearing-close, div.clearing-blackout",
            // Default to the entire li element.
            open_selectors: "",
            // Image will be skipped in carousel.
            skip_selector: "",
            touch_label: "",
            // event initializers and locks
            init: false,
            locked: false
        },
        init: function(scope, method, options) {
            var self = this;
            Foundation.inherit(this, "throttle image_loaded");
            this.bindings(method, options);
            if (self.S(this.scope).is("[" + this.attr_name() + "]")) {
                this.assemble(self.S("li", this.scope));
            } else {
                self.S("[" + this.attr_name() + "]", this.scope).each(function() {
                    self.assemble(self.S("li", this));
                });
            }
        },
        events: function(scope) {
            var self = this, S = self.S, $scroll_container = $(".scroll-container");
            if ($scroll_container.length > 0) {
                this.scope = $scroll_container;
            }
            S(this.scope).off(".clearing").on("click.fndtn.clearing", "ul[" + this.attr_name() + "] li " + this.settings.open_selectors, function(e, current, target) {
                var current = current || S(this), target = target || current, next = current.next("li"), settings = current.closest("[" + self.attr_name() + "]").data(self.attr_name(true) + "-init"), image = S(e.target);
                e.preventDefault();
                if (!settings) {
                    self.init();
                    settings = current.closest("[" + self.attr_name() + "]").data(self.attr_name(true) + "-init");
                }
                // if clearing is open and the current image is
                // clicked, go to the next image in sequence
                if (target.hasClass("visible") && current[0] === target[0] && next.length > 0 && self.is_open(current)) {
                    target = next;
                    image = S("img", target);
                }
                // set current and target to the clicked li if not otherwise defined.
                self.open(image, current, target);
                self.update_paddles(target);
            }).on("click.fndtn.clearing", ".clearing-main-next", function(e) {
                self.nav(e, "next");
            }).on("click.fndtn.clearing", ".clearing-main-prev", function(e) {
                self.nav(e, "prev");
            }).on("click.fndtn.clearing", this.settings.close_selectors, function(e) {
                Foundation.libs.clearing.close(e, this);
            });
            $(document).on("keydown.fndtn.clearing", function(e) {
                self.keydown(e);
            });
            S(window).off(".clearing").on("resize.fndtn.clearing", function() {
                self.resize();
            });
            this.swipe_events(scope);
        },
        swipe_events: function(scope) {
            var self = this, S = self.S;
            S(this.scope).on("touchstart.fndtn.clearing", ".visible-img", function(e) {
                if (!e.touches) {
                    e = e.originalEvent;
                }
                var data = {
                    start_page_x: e.touches[0].pageX,
                    start_page_y: e.touches[0].pageY,
                    start_time: new Date().getTime(),
                    delta_x: 0,
                    is_scrolling: undefined
                };
                S(this).data("swipe-transition", data);
                e.stopPropagation();
            }).on("touchmove.fndtn.clearing", ".visible-img", function(e) {
                if (!e.touches) {
                    e = e.originalEvent;
                }
                // Ignore pinch/zoom events
                if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
                var data = S(this).data("swipe-transition");
                if (typeof data === "undefined") {
                    data = {};
                }
                data.delta_x = e.touches[0].pageX - data.start_page_x;
                if (Foundation.rtl) {
                    data.delta_x = -data.delta_x;
                }
                if (typeof data.is_scrolling === "undefined") {
                    data.is_scrolling = !!(data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y));
                }
                if (!data.is_scrolling && !data.active) {
                    e.preventDefault();
                    var direction = data.delta_x < 0 ? "next" : "prev";
                    data.active = true;
                    self.nav(e, direction);
                }
            }).on("touchend.fndtn.clearing", ".visible-img", function(e) {
                S(this).data("swipe-transition", {});
                e.stopPropagation();
            });
        },
        assemble: function($li) {
            var $el = $li.parent();
            if ($el.parent().hasClass("carousel")) {
                return;
            }
            $el.after('<div id="foundationClearingHolder"></div>');
            var grid = $el.detach(), grid_outerHTML = "";
            if (grid[0] == null) {
                return;
            } else {
                grid_outerHTML = grid[0].outerHTML;
            }
            var holder = this.S("#foundationClearingHolder"), settings = $el.data(this.attr_name(true) + "-init"), data = {
                grid: '<div class="carousel">' + grid_outerHTML + "</div>",
                viewing: settings.templates.viewing
            }, wrapper = '<div class="clearing-assembled"><div>' + data.viewing + data.grid + "</div></div>", touch_label = this.settings.touch_label;
            if (Modernizr.touch) {
                wrapper = $(wrapper).find(".clearing-touch-label").html(touch_label).end();
            }
            holder.after(wrapper).remove();
        },
        open: function($image, current, target) {
            var self = this, body = $(document.body), root = target.closest(".clearing-assembled"), container = self.S("div", root).first(), visible_image = self.S(".visible-img", container), image = self.S("img", visible_image).not($image), label = self.S(".clearing-touch-label", container), error = false;
            // Event to disable scrolling on touch devices when Clearing is activated
            $("body").on("touchmove", function(e) {
                e.preventDefault();
            });
            image.error(function() {
                error = true;
            });
            function startLoad() {
                setTimeout(function() {
                    this.image_loaded(image, function() {
                        if (image.outerWidth() === 1 && !error) {
                            startLoad.call(this);
                        } else {
                            cb.call(this, image);
                        }
                    }.bind(this));
                }.bind(this), 100);
            }
            function cb(image) {
                var $image = $(image);
                $image.css("visibility", "visible");
                // toggle the gallery
                body.css("overflow", "hidden");
                root.addClass("clearing-blackout");
                container.addClass("clearing-container");
                visible_image.show();
                this.fix_height(target).caption(self.S(".clearing-caption", visible_image), self.S("img", target)).center_and_label(image, label).shift(current, target, function() {
                    target.closest("li").siblings().removeClass("visible");
                    target.closest("li").addClass("visible");
                });
                visible_image.trigger("opened.fndtn.clearing");
            }
            if (!this.locked()) {
                visible_image.trigger("open.fndtn.clearing");
                // set the image to the selected thumbnail
                image.attr("src", this.load($image)).css("visibility", "hidden");
                startLoad.call(this);
            }
        },
        close: function(e, el) {
            e.preventDefault();
            var root = function(target) {
                if (/blackout/.test(target.selector)) {
                    return target;
                } else {
                    return target.closest(".clearing-blackout");
                }
            }($(el)), body = $(document.body), container, visible_image;
            if (el === e.target && root) {
                body.css("overflow", "");
                container = $("div", root).first();
                visible_image = $(".visible-img", container);
                visible_image.trigger("close.fndtn.clearing");
                this.settings.prev_index = 0;
                $("ul[" + this.attr_name() + "]", root).attr("style", "").closest(".clearing-blackout").removeClass("clearing-blackout");
                container.removeClass("clearing-container");
                visible_image.hide();
                visible_image.trigger("closed.fndtn.clearing");
            }
            // Event to re-enable scrolling on touch devices
            $("body").off("touchmove");
            return false;
        },
        is_open: function(current) {
            return current.parent().prop("style").length > 0;
        },
        keydown: function(e) {
            var clearing = $(".clearing-blackout ul[" + this.attr_name() + "]"), NEXT_KEY = this.rtl ? 37 : 39, PREV_KEY = this.rtl ? 39 : 37, ESC_KEY = 27;
            if (e.which === NEXT_KEY) this.go(clearing, "next");
            if (e.which === PREV_KEY) this.go(clearing, "prev");
            if (e.which === ESC_KEY) this.S("a.clearing-close").trigger("click").trigger("click.fndtn.clearing");
        },
        nav: function(e, direction) {
            var clearing = $("ul[" + this.attr_name() + "]", ".clearing-blackout");
            e.preventDefault();
            this.go(clearing, direction);
        },
        resize: function() {
            var image = $("img", ".clearing-blackout .visible-img"), label = $(".clearing-touch-label", ".clearing-blackout");
            if (image.length) {
                this.center_and_label(image, label);
                image.trigger("resized.fndtn.clearing");
            }
        },
        // visual adjustments
        fix_height: function(target) {
            var lis = target.parent().children(), self = this;
            lis.each(function() {
                var li = self.S(this), image = li.find("img");
                if (li.height() > image.outerHeight()) {
                    li.addClass("fix-height");
                }
            }).closest("ul").width(lis.length * 100 + "%");
            return this;
        },
        update_paddles: function(target) {
            target = target.closest("li");
            var visible_image = target.closest(".carousel").siblings(".visible-img");
            if (target.next().length > 0) {
                this.S(".clearing-main-next", visible_image).removeClass("disabled");
            } else {
                this.S(".clearing-main-next", visible_image).addClass("disabled");
            }
            if (target.prev().length > 0) {
                this.S(".clearing-main-prev", visible_image).removeClass("disabled");
            } else {
                this.S(".clearing-main-prev", visible_image).addClass("disabled");
            }
        },
        center_and_label: function(target, label) {
            if (!this.rtl) {
                target.css({
                    marginLeft: -(target.outerWidth() / 2),
                    marginTop: -(target.outerHeight() / 2)
                });
                if (label.length > 0) {
                    label.css({
                        marginLeft: -(label.outerWidth() / 2),
                        marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10
                    });
                }
            } else {
                target.css({
                    marginRight: -(target.outerWidth() / 2),
                    marginTop: -(target.outerHeight() / 2),
                    left: "auto",
                    right: "50%"
                });
                if (label.length > 0) {
                    label.css({
                        marginRight: -(label.outerWidth() / 2),
                        marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10,
                        left: "auto",
                        right: "50%"
                    });
                }
            }
            return this;
        },
        // image loading and preloading
        load: function($image) {
            var href;
            if ($image[0].nodeName === "A") {
                href = $image.attr("href");
            } else {
                href = $image.closest("a").attr("href");
            }
            this.preload($image);
            if (href) return href;
            return $image.attr("src");
        },
        preload: function($image) {
            this.img($image.closest("li").next()).img($image.closest("li").prev());
        },
        img: function(img) {
            if (img.length) {
                var new_img = new Image(), new_a = this.S("a", img);
                if (new_a.length) {
                    new_img.src = new_a.attr("href");
                } else {
                    new_img.src = this.S("img", img).attr("src");
                }
            }
            return this;
        },
        // image caption
        caption: function(container, $image) {
            var caption = $image.attr("data-caption");
            if (caption) {
                container.html(caption).show();
            } else {
                container.text("").hide();
            }
            return this;
        },
        // directional methods
        go: function($ul, direction) {
            var current = this.S(".visible", $ul), target = current[direction]();
            // Check for skip selector.
            if (this.settings.skip_selector && target.find(this.settings.skip_selector).length != 0) {
                target = target[direction]();
            }
            if (target.length) {
                this.S("img", target).trigger("click", [ current, target ]).trigger("click.fndtn.clearing", [ current, target ]).trigger("change.fndtn.clearing");
            }
        },
        shift: function(current, target, callback) {
            var clearing = target.parent(), old_index = this.settings.prev_index || target.index(), direction = this.direction(clearing, current, target), dir = this.rtl ? "right" : "left", left = parseInt(clearing.css("left"), 10), width = target.outerWidth(), skip_shift;
            var dir_obj = {};
            // we use jQuery animate instead of CSS transitions because we
            // need a callback to unlock the next animation
            // needs support for RTL **
            if (target.index() !== old_index && !/skip/.test(direction)) {
                if (/left/.test(direction)) {
                    this.lock();
                    dir_obj[dir] = left + width;
                    clearing.animate(dir_obj, 300, this.unlock());
                } else if (/right/.test(direction)) {
                    this.lock();
                    dir_obj[dir] = left - width;
                    clearing.animate(dir_obj, 300, this.unlock());
                }
            } else if (/skip/.test(direction)) {
                // the target image is not adjacent to the current image, so
                // do we scroll right or not
                skip_shift = target.index() - this.settings.up_count;
                this.lock();
                if (skip_shift > 0) {
                    dir_obj[dir] = -(skip_shift * width);
                    clearing.animate(dir_obj, 300, this.unlock());
                } else {
                    dir_obj[dir] = 0;
                    clearing.animate(dir_obj, 300, this.unlock());
                }
            }
            callback();
        },
        direction: function($el, current, target) {
            var lis = this.S("li", $el), li_width = lis.outerWidth() + lis.outerWidth() / 4, up_count = Math.floor(this.S(".clearing-container").outerWidth() / li_width) - 1, target_index = lis.index(target), response;
            this.settings.up_count = up_count;
            if (this.adjacent(this.settings.prev_index, target_index)) {
                if (target_index > up_count && target_index > this.settings.prev_index) {
                    response = "right";
                } else if (target_index > up_count - 1 && target_index <= this.settings.prev_index) {
                    response = "left";
                } else {
                    response = false;
                }
            } else {
                response = "skip";
            }
            this.settings.prev_index = target_index;
            return response;
        },
        adjacent: function(current_index, target_index) {
            for (var i = target_index + 1; i >= target_index - 1; i--) {
                if (i === current_index) return true;
            }
            return false;
        },
        // lock management
        lock: function() {
            this.settings.locked = true;
        },
        unlock: function() {
            this.settings.locked = false;
        },
        locked: function() {
            return this.settings.locked;
        },
        off: function() {
            this.S(this.scope).off(".fndtn.clearing");
            this.S(window).off(".fndtn.clearing");
        },
        reflow: function() {
            this.init();
        }
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    var noop = function() {};
    var Orbit = function(el, settings) {
        // Don't reinitialize plugin
        if (el.hasClass(settings.slides_container_class)) {
            return this;
        }
        var self = this, container, slides_container = el, number_container, bullets_container, timer_container, idx = 0, animate, timer, locked = false, adjust_height_after = false;
        self.slides = function() {
            return slides_container.children(settings.slide_selector);
        };
        self.slides().first().addClass(settings.active_slide_class);
        self.update_slide_number = function(index) {
            if (settings.slide_number) {
                number_container.find("span:first").text(parseInt(index) + 1);
                number_container.find("span:last").text(self.slides().length);
            }
            if (settings.bullets) {
                bullets_container.children().removeClass(settings.bullets_active_class);
                $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
            }
        };
        self.update_active_link = function(index) {
            var link = $('[data-orbit-link="' + self.slides().eq(index).attr("data-orbit-slide") + '"]');
            link.siblings().removeClass(settings.bullets_active_class);
            link.addClass(settings.bullets_active_class);
        };
        self.build_markup = function() {
            slides_container.wrap('<div class="' + settings.container_class + '"></div>');
            container = slides_container.parent();
            slides_container.addClass(settings.slides_container_class);
            if (settings.stack_on_small) {
                container.addClass(settings.stack_on_small_class);
            }
            if (settings.navigation_arrows) {
                container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
                container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
            }
            if (settings.timer) {
                timer_container = $("<div>").addClass(settings.timer_container_class);
                timer_container.append("<span>");
                timer_container.append($("<div>").addClass(settings.timer_progress_class));
                timer_container.addClass(settings.timer_paused_class);
                container.append(timer_container);
            }
            if (settings.slide_number) {
                number_container = $("<div>").addClass(settings.slide_number_class);
                number_container.append("<span></span> " + settings.slide_number_text + " <span></span>");
                container.append(number_container);
            }
            if (settings.bullets) {
                bullets_container = $("<ol>").addClass(settings.bullets_container_class);
                container.append(bullets_container);
                bullets_container.wrap('<div class="orbit-bullets-container"></div>');
                self.slides().each(function(idx, el) {
                    var bullet = $("<li>").attr("data-orbit-slide", idx).on("click", self.link_bullet);
                    bullets_container.append(bullet);
                });
            }
        };
        self._goto = function(next_idx, start_timer) {
            // if (locked) {return false;}
            if (next_idx === idx) {
                return false;
            }
            if (typeof timer === "object") {
                timer.restart();
            }
            var slides = self.slides();
            var dir = "next";
            locked = true;
            if (next_idx < idx) {
                dir = "prev";
            }
            if (next_idx >= slides.length) {
                if (!settings.circular) return false;
                next_idx = 0;
            } else if (next_idx < 0) {
                if (!settings.circular) return false;
                next_idx = slides.length - 1;
            }
            var current = $(slides.get(idx));
            var next = $(slides.get(next_idx));
            current.css("zIndex", 2);
            current.removeClass(settings.active_slide_class);
            next.css("zIndex", 4).addClass(settings.active_slide_class);
            slides_container.trigger("before-slide-change.fndtn.orbit");
            settings.before_slide_change();
            self.update_active_link(next_idx);
            var callback = function() {
                var unlock = function() {
                    idx = next_idx;
                    locked = false;
                    if (start_timer === true) {
                        timer = self.create_timer();
                        timer.start();
                    }
                    self.update_slide_number(idx);
                    slides_container.trigger("after-slide-change.fndtn.orbit", [ {
                        slide_number: idx,
                        total_slides: slides.length
                    } ]);
                    settings.after_slide_change(idx, slides.length);
                };
                if (slides_container.height() != next.height() && settings.variable_height) {
                    slides_container.animate({
                        height: next.height()
                    }, 250, "linear", unlock);
                } else {
                    unlock();
                }
            };
            if (slides.length === 1) {
                callback();
                return false;
            }
            var start_animation = function() {
                if (dir === "next") {
                    animate.next(current, next, callback);
                }
                if (dir === "prev") {
                    animate.prev(current, next, callback);
                }
            };
            if (next.height() > slides_container.height() && settings.variable_height) {
                slides_container.animate({
                    height: next.height()
                }, 250, "linear", start_animation);
            } else {
                start_animation();
            }
        };
        self.next = function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            self._goto(idx + 1);
        };
        self.prev = function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            self._goto(idx - 1);
        };
        self.link_custom = function(e) {
            e.preventDefault();
            var link = $(this).attr("data-orbit-link");
            if (typeof link === "string" && (link = $.trim(link)) != "") {
                var slide = container.find("[data-orbit-slide=" + link + "]");
                if (slide.index() != -1) {
                    self._goto(slide.index());
                }
            }
        };
        self.link_bullet = function(e) {
            var index = $(this).attr("data-orbit-slide");
            if (typeof index === "string" && (index = $.trim(index)) != "") {
                if (isNaN(parseInt(index))) {
                    var slide = container.find("[data-orbit-slide=" + index + "]");
                    if (slide.index() != -1) {
                        self._goto(slide.index() + 1);
                    }
                } else {
                    self._goto(parseInt(index));
                }
            }
        };
        self.timer_callback = function() {
            self._goto(idx + 1, true);
        };
        self.compute_dimensions = function() {
            var current = $(self.slides().get(idx));
            var h = current.height();
            if (!settings.variable_height) {
                self.slides().each(function() {
                    if ($(this).height() > h) {
                        h = $(this).height();
                    }
                });
            }
            slides_container.height(h);
        };
        self.create_timer = function() {
            var t = new Timer(container.find("." + settings.timer_container_class), settings, self.timer_callback);
            return t;
        };
        self.stop_timer = function() {
            if (typeof timer === "object") timer.stop();
        };
        self.toggle_timer = function() {
            var t = container.find("." + settings.timer_container_class);
            if (t.hasClass(settings.timer_paused_class)) {
                if (typeof timer === "undefined") {
                    timer = self.create_timer();
                }
                timer.start();
            } else {
                if (typeof timer === "object") {
                    timer.stop();
                }
            }
        };
        self.init = function() {
            self.build_markup();
            if (settings.timer) {
                timer = self.create_timer();
                Foundation.utils.image_loaded(this.slides().children("img"), timer.start);
            }
            animate = new FadeAnimation(settings, slides_container);
            if (settings.animation === "slide") animate = new SlideAnimation(settings, slides_container);
            container.on("click", "." + settings.next_class, self.next);
            container.on("click", "." + settings.prev_class, self.prev);
            if (settings.next_on_click) {
                container.on("click", "." + settings.slides_container_class + " [data-orbit-slide]", self.link_bullet);
            }
            container.on("click", self.toggle_timer);
            if (settings.swipe) {
                container.on("touchstart.fndtn.orbit", function(e) {
                    if (!e.touches) {
                        e = e.originalEvent;
                    }
                    var data = {
                        start_page_x: e.touches[0].pageX,
                        start_page_y: e.touches[0].pageY,
                        start_time: new Date().getTime(),
                        delta_x: 0,
                        is_scrolling: undefined
                    };
                    container.data("swipe-transition", data);
                    e.stopPropagation();
                }).on("touchmove.fndtn.orbit", function(e) {
                    if (!e.touches) {
                        e = e.originalEvent;
                    }
                    // Ignore pinch/zoom events
                    if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
                    var data = container.data("swipe-transition");
                    if (typeof data === "undefined") {
                        data = {};
                    }
                    data.delta_x = e.touches[0].pageX - data.start_page_x;
                    if (typeof data.is_scrolling === "undefined") {
                        data.is_scrolling = !!(data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y));
                    }
                    if (!data.is_scrolling && !data.active) {
                        e.preventDefault();
                        var direction = data.delta_x < 0 ? idx + 1 : idx - 1;
                        data.active = true;
                        self._goto(direction);
                    }
                }).on("touchend.fndtn.orbit", function(e) {
                    container.data("swipe-transition", {});
                    e.stopPropagation();
                });
            }
            container.on("mouseenter.fndtn.orbit", function(e) {
                if (settings.timer && settings.pause_on_hover) {
                    self.stop_timer();
                }
            }).on("mouseleave.fndtn.orbit", function(e) {
                if (settings.timer && settings.resume_on_mouseout) {
                    timer.start();
                }
            });
            $(document).on("click", "[data-orbit-link]", self.link_custom);
            $(window).on("load resize", self.compute_dimensions);
            Foundation.utils.image_loaded(this.slides().children("img"), self.compute_dimensions);
            Foundation.utils.image_loaded(this.slides().children("img"), function() {
                container.prev("." + settings.preloader_class).css("display", "none");
                self.update_slide_number(0);
                self.update_active_link(0);
                slides_container.trigger("ready.fndtn.orbit");
            });
        };
        self.init();
    };
    var Timer = function(el, settings, callback) {
        var self = this, duration = settings.timer_speed, progress = el.find("." + settings.timer_progress_class), start, timeout, left = -1;
        this.update_progress = function(w) {
            var new_progress = progress.clone();
            new_progress.attr("style", "");
            new_progress.css("width", w + "%");
            progress.replaceWith(new_progress);
            progress = new_progress;
        };
        this.restart = function() {
            clearTimeout(timeout);
            el.addClass(settings.timer_paused_class);
            left = -1;
            self.update_progress(0);
        };
        this.start = function() {
            if (!el.hasClass(settings.timer_paused_class)) {
                return true;
            }
            left = left === -1 ? duration : left;
            el.removeClass(settings.timer_paused_class);
            start = new Date().getTime();
            progress.animate({
                width: "100%"
            }, left, "linear");
            timeout = setTimeout(function() {
                self.restart();
                callback();
            }, left);
            el.trigger("timer-started.fndtn.orbit");
        };
        this.stop = function() {
            if (el.hasClass(settings.timer_paused_class)) {
                return true;
            }
            clearTimeout(timeout);
            el.addClass(settings.timer_paused_class);
            var end = new Date().getTime();
            left = left - (end - start);
            var w = 100 - left / duration * 100;
            self.update_progress(w);
            el.trigger("timer-stopped.fndtn.orbit");
        };
    };
    var SlideAnimation = function(settings, container) {
        var duration = settings.animation_speed;
        var is_rtl = $("html[dir=rtl]").length === 1;
        var margin = is_rtl ? "marginRight" : "marginLeft";
        var animMargin = {};
        animMargin[margin] = "0%";
        this.next = function(current, next, callback) {
            current.animate({
                marginLeft: "-100%"
            }, duration);
            next.animate(animMargin, duration, function() {
                current.css(margin, "100%");
                callback();
            });
        };
        this.prev = function(current, prev, callback) {
            current.animate({
                marginLeft: "100%"
            }, duration);
            prev.css(margin, "-100%");
            prev.animate(animMargin, duration, function() {
                current.css(margin, "100%");
                callback();
            });
        };
    };
    var FadeAnimation = function(settings, container) {
        var duration = settings.animation_speed;
        var is_rtl = $("html[dir=rtl]").length === 1;
        var margin = is_rtl ? "marginRight" : "marginLeft";
        this.next = function(current, next, callback) {
            next.css({
                margin: "0%",
                opacity: "0.01"
            });
            next.animate({
                opacity: "1"
            }, duration, "linear", function() {
                current.css("margin", "100%");
                callback();
            });
        };
        this.prev = function(current, prev, callback) {
            prev.css({
                margin: "0%",
                opacity: "0.01"
            });
            prev.animate({
                opacity: "1"
            }, duration, "linear", function() {
                current.css("margin", "100%");
                callback();
            });
        };
    };
    Foundation.libs = Foundation.libs || {};
    Foundation.libs.orbit = {
        name: "orbit",
        version: "5.5.0",
        settings: {
            animation: "slide",
            timer_speed: 1e4,
            pause_on_hover: true,
            resume_on_mouseout: false,
            next_on_click: true,
            animation_speed: 500,
            stack_on_small: false,
            navigation_arrows: true,
            slide_number: true,
            slide_number_text: "of",
            container_class: "orbit-container",
            stack_on_small_class: "orbit-stack-on-small",
            next_class: "orbit-next",
            prev_class: "orbit-prev",
            timer_container_class: "orbit-timer",
            timer_paused_class: "paused",
            timer_progress_class: "orbit-progress",
            slides_container_class: "orbit-slides-container",
            preloader_class: "preloader",
            slide_selector: "*",
            bullets_container_class: "orbit-bullets",
            bullets_active_class: "active",
            slide_number_class: "orbit-slide-number",
            caption_class: "orbit-caption",
            active_slide_class: "active",
            orbit_transition_class: "orbit-transitioning",
            bullets: true,
            circular: true,
            timer: true,
            variable_height: false,
            swipe: true,
            before_slide_change: noop,
            after_slide_change: noop
        },
        init: function(scope, method, options) {
            var self = this;
            this.bindings(method, options);
        },
        events: function(instance) {
            var orbit_instance = new Orbit(this.S(instance), this.S(instance).data("orbit-init"));
            this.S(instance).data(this.name + "-instance", orbit_instance);
        },
        reflow: function() {
            var self = this;
            if (self.S(self.scope).is("[data-orbit]")) {
                var $el = self.S(self.scope);
                var instance = $el.data(self.name + "-instance");
                instance.compute_dimensions();
            } else {
                self.S("[data-orbit]", self.scope).each(function(idx, el) {
                    var $el = self.S(el);
                    var opts = self.data_options($el);
                    var instance = $el.data(self.name + "-instance");
                    instance.compute_dimensions();
                });
            }
        }
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.offcanvas = {
        name: "offcanvas",
        version: "5.5.0",
        settings: {
            open_method: "move",
            close_on_click: false
        },
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, S = self.S, move_class = "", right_postfix = "", left_postfix = "";
            if (this.settings.open_method === "move") {
                move_class = "move-";
                right_postfix = "right";
                left_postfix = "left";
            } else if (this.settings.open_method === "overlap_single") {
                move_class = "offcanvas-overlap-";
                right_postfix = "right";
                left_postfix = "left";
            } else if (this.settings.open_method === "overlap") {
                move_class = "offcanvas-overlap";
            }
            S(this.scope).off(".offcanvas").on("click.fndtn.offcanvas", ".left-off-canvas-toggle", function(e) {
                self.click_toggle_class(e, move_class + right_postfix);
                if (self.settings.open_method !== "overlap") {
                    S(".left-submenu").removeClass(move_class + right_postfix);
                }
                $(".left-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".left-off-canvas-menu a", function(e) {
                var settings = self.get_settings(e);
                var parent = S(this).parent();
                if (settings.close_on_click && !parent.hasClass("has-submenu") && !parent.hasClass("back")) {
                    self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
                    parent.parent().removeClass(move_class + right_postfix);
                } else if (S(this).parent().hasClass("has-submenu")) {
                    e.preventDefault();
                    S(this).siblings(".left-submenu").toggleClass(move_class + right_postfix);
                } else if (parent.hasClass("back")) {
                    e.preventDefault();
                    parent.parent().removeClass(move_class + right_postfix);
                }
                $(".left-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".right-off-canvas-toggle", function(e) {
                self.click_toggle_class(e, move_class + left_postfix);
                if (self.settings.open_method !== "overlap") {
                    S(".right-submenu").removeClass(move_class + left_postfix);
                }
                $(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".right-off-canvas-menu a", function(e) {
                var settings = self.get_settings(e);
                var parent = S(this).parent();
                if (settings.close_on_click && !parent.hasClass("has-submenu") && !parent.hasClass("back")) {
                    self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
                    parent.parent().removeClass(move_class + left_postfix);
                } else if (S(this).parent().hasClass("has-submenu")) {
                    e.preventDefault();
                    S(this).siblings(".right-submenu").toggleClass(move_class + left_postfix);
                } else if (parent.hasClass("back")) {
                    e.preventDefault();
                    parent.parent().removeClass(move_class + left_postfix);
                }
                $(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
                self.click_remove_class(e, move_class + left_postfix);
                S(".right-submenu").removeClass(move_class + left_postfix);
                if (right_postfix) {
                    self.click_remove_class(e, move_class + right_postfix);
                    S(".left-submenu").removeClass(move_class + left_postfix);
                }
                $(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
                self.click_remove_class(e, move_class + left_postfix);
                $(".left-off-canvas-toggle").attr("aria-expanded", "false");
                if (right_postfix) {
                    self.click_remove_class(e, move_class + right_postfix);
                    $(".right-off-canvas-toggle").attr("aria-expanded", "false");
                }
            });
        },
        toggle: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper();
            if ($off_canvas.is("." + class_name)) {
                this.hide(class_name, $off_canvas);
            } else {
                this.show(class_name, $off_canvas);
            }
        },
        show: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper();
            $off_canvas.trigger("open").trigger("open.fndtn.offcanvas");
            $off_canvas.addClass(class_name);
        },
        hide: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper();
            $off_canvas.trigger("close").trigger("close.fndtn.offcanvas");
            $off_canvas.removeClass(class_name);
        },
        click_toggle_class: function(e, class_name) {
            e.preventDefault();
            var $off_canvas = this.get_wrapper(e);
            this.toggle(class_name, $off_canvas);
        },
        click_remove_class: function(e, class_name) {
            e.preventDefault();
            var $off_canvas = this.get_wrapper(e);
            this.hide(class_name, $off_canvas);
        },
        get_settings: function(e) {
            var offcanvas = this.S(e.target).closest("[" + this.attr_name() + "]");
            return offcanvas.data(this.attr_name(true) + "-init") || this.settings;
        },
        get_wrapper: function(e) {
            var $off_canvas = this.S(e ? e.target : this.scope).closest(".off-canvas-wrap");
            if ($off_canvas.length === 0) {
                $off_canvas = this.S(".off-canvas-wrap");
            }
            return $off_canvas;
        },
        reflow: function() {}
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.alert = {
        name: "alert",
        version: "5.5.0",
        settings: {
            callback: function() {}
        },
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, S = this.S;
            $(this.scope).off(".alert").on("click.fndtn.alert", "[" + this.attr_name() + "] .close", function(e) {
                var alertBox = S(this).closest("[" + self.attr_name() + "]"), settings = alertBox.data(self.attr_name(true) + "-init") || self.settings;
                e.preventDefault();
                if (Modernizr.csstransitions) {
                    alertBox.addClass("alert-close");
                    alertBox.on("transitionend webkitTransitionEnd oTransitionEnd", function(e) {
                        S(this).trigger("close").trigger("close.fndtn.alert").remove();
                        settings.callback();
                    });
                } else {
                    alertBox.fadeOut(300, function() {
                        S(this).trigger("close").trigger("close.fndtn.alert").remove();
                        settings.callback();
                    });
                }
            });
        },
        reflow: function() {}
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.reveal = {
        name: "reveal",
        version: "5.5.0",
        locked: false,
        settings: {
            animation: "fadeAndPop",
            animation_speed: 250,
            close_on_background_click: true,
            close_on_esc: true,
            dismiss_modal_class: "close-reveal-modal",
            bg_class: "reveal-modal-bg",
            bg_root_element: "body",
            root_element: "body",
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            bg: $(".reveal-modal-bg"),
            css: {
                open: {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                },
                close: {
                    opacity: 1,
                    visibility: "hidden",
                    display: "none"
                }
            }
        },
        init: function(scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
        },
        events: function(scope) {
            var self = this, S = self.S;
            S(this.scope).off(".reveal").on("click.fndtn.reveal", "[" + this.add_namespace("data-reveal-id") + "]:not([disabled])", function(e) {
                e.preventDefault();
                if (!self.locked) {
                    var element = S(this), ajax = element.data(self.data_attr("reveal-ajax"));
                    self.locked = true;
                    if (typeof ajax === "undefined") {
                        self.open.call(self, element);
                    } else {
                        var url = ajax === true ? element.attr("href") : ajax;
                        self.open.call(self, element, {
                            url: url
                        });
                    }
                }
            });
            S(document).on("click.fndtn.reveal", this.close_targets(), function(e) {
                e.preventDefault();
                if (!self.locked) {
                    var settings = S("[" + self.attr_name() + "].open").data(self.attr_name(true) + "-init") || self.settings, bg_clicked = S(e.target)[0] === S("." + settings.bg_class)[0];
                    if (bg_clicked) {
                        if (settings.close_on_background_click) {
                            e.stopPropagation();
                        } else {
                            return;
                        }
                    }
                    self.locked = true;
                    self.close.call(self, bg_clicked ? S("[" + self.attr_name() + "].open") : S(this).closest("[" + self.attr_name() + "]"));
                }
            });
            if (S("[" + self.attr_name() + "]", this.scope).length > 0) {
                S(this.scope).on("open.fndtn.reveal", this.settings.open).on("opened.fndtn.reveal", this.settings.opened).on("opened.fndtn.reveal", this.open_video).on("close.fndtn.reveal", this.settings.close).on("closed.fndtn.reveal", this.settings.closed).on("closed.fndtn.reveal", this.close_video);
            } else {
                S(this.scope).on("open.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.open).on("opened.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.opened).on("opened.fndtn.reveal", "[" + self.attr_name() + "]", this.open_video).on("close.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.close).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.closed).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.close_video);
            }
            return true;
        },
        // PATCH #3: turning on key up capture only when a reveal window is open
        key_up_on: function(scope) {
            var self = this;
            // PATCH #1: fixing multiple keyup event trigger from single key press
            self.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal", function(event) {
                var open_modal = self.S("[" + self.attr_name() + "].open"), settings = open_modal.data(self.attr_name(true) + "-init") || self.settings;
                // PATCH #2: making sure that the close event can be called only while unlocked,
                //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
                if (settings && event.which === 27 && settings.close_on_esc && !self.locked) {
                    // 27 is the keycode for the Escape key
                    self.close.call(self, open_modal);
                }
            });
            return true;
        },
        // PATCH #3: turning on key up capture only when a reveal window is open
        key_up_off: function(scope) {
            this.S("body").off("keyup.fndtn.reveal");
            return true;
        },
        open: function(target, ajax_settings) {
            var self = this, modal;
            if (target) {
                if (typeof target.selector !== "undefined") {
                    // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
                    modal = self.S("#" + target.data(self.data_attr("reveal-id"))).first();
                } else {
                    modal = self.S(this.scope);
                    ajax_settings = target;
                }
            } else {
                modal = self.S(this.scope);
            }
            var settings = modal.data(self.attr_name(true) + "-init");
            settings = settings || this.settings;
            if (modal.hasClass("open") && target.attr("data-reveal-id") == modal.attr("id")) {
                return self.close(modal);
            }
            if (!modal.hasClass("open")) {
                var open_modal = self.S("[" + self.attr_name() + "].open");
                if (typeof modal.data("css-top") === "undefined") {
                    modal.data("css-top", parseInt(modal.css("top"), 10)).data("offset", this.cache_offset(modal));
                }
                this.key_up_on(modal);
                // PATCH #3: turning on key up capture only when a reveal window is open
                modal.trigger("open").trigger("open.fndtn.reveal");
                if (open_modal.length < 1) {
                    this.toggle_bg(modal, true);
                }
                if (typeof ajax_settings === "string") {
                    ajax_settings = {
                        url: ajax_settings
                    };
                }
                if (typeof ajax_settings === "undefined" || !ajax_settings.url) {
                    if (open_modal.length > 0) {
                        this.hide(open_modal, settings.css.close);
                    }
                    this.show(modal, settings.css.open);
                } else {
                    var old_success = typeof ajax_settings.success !== "undefined" ? ajax_settings.success : null;
                    $.extend(ajax_settings, {
                        success: function(data, textStatus, jqXHR) {
                            if ($.isFunction(old_success)) {
                                var result = old_success(data, textStatus, jqXHR);
                                if (typeof result == "string") data = result;
                            }
                            modal.html(data);
                            self.S(modal).foundation("section", "reflow");
                            self.S(modal).children().foundation();
                            if (open_modal.length > 0) {
                                self.hide(open_modal, settings.css.close);
                            }
                            self.show(modal, settings.css.open);
                        }
                    });
                    $.ajax(ajax_settings);
                }
            }
            self.S(window).trigger("resize");
        },
        close: function(modal) {
            var modal = modal && modal.length ? modal : this.S(this.scope), open_modals = this.S("[" + this.attr_name() + "].open"), settings = modal.data(this.attr_name(true) + "-init") || this.settings;
            if (open_modals.length > 0) {
                this.locked = true;
                this.key_up_off(modal);
                // PATCH #3: turning on key up capture only when a reveal window is open
                modal.trigger("close").trigger("close.fndtn.reveal");
                this.toggle_bg(modal, false);
                this.hide(open_modals, settings.css.close, settings);
            }
        },
        close_targets: function() {
            var base = "." + this.settings.dismiss_modal_class;
            if (this.settings.close_on_background_click) {
                return base + ", ." + this.settings.bg_class;
            }
            return base;
        },
        toggle_bg: function(el, modal, state) {
            var settings = el.data(this.attr_name(true) + "-init") || this.settings, bg_root_element = settings.bg_root_element;
            // Adding option to specify the background root element fixes scrolling issue
            if (this.S("." + this.settings.bg_class).length === 0) {
                this.settings.bg = $("<div />", {
                    "class": this.settings.bg_class
                }).appendTo(bg_root_element).hide();
            }
            var visible = this.settings.bg.filter(":visible").length > 0;
            if (state != visible) {
                if (state == undefined ? visible : !state) {
                    this.hide(this.settings.bg);
                } else {
                    this.show(this.settings.bg);
                }
            }
        },
        show: function(el, css) {
            // is modal
            if (css) {
                var settings = el.data(this.attr_name(true) + "-init") || this.settings, root_element = settings.root_element;
                if (el.parent(root_element).length === 0) {
                    var placeholder = el.wrap('<div style="display: none;" />').parent();
                    el.on("closed.fndtn.reveal.wrapped", function() {
                        el.detach().appendTo(placeholder);
                        el.unwrap().unbind("closed.fndtn.reveal.wrapped");
                    });
                    el.detach().appendTo(root_element);
                }
                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    css.top = $(root_element).scrollTop() - el.data("offset") + "px";
                    //adding root_element instead of window for scrolling offset if modal trigger is below the fold
                    var end_css = {
                        top: $(root_element).scrollTop() + el.data("css-top") + "px",
                        //adding root_element instead of window for scrolling offset if modal trigger is below the fold
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = false;
                            el.trigger("opened").trigger("opened.fndtn.reveal");
                        }.bind(this)).addClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                if (animData.fade) {
                    css.top = $(root_element).scrollTop() + el.data("css-top") + "px";
                    //adding root_element instead of window for scrolling offset if modal trigger is below the fold
                    var end_css = {
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = false;
                            el.trigger("opened").trigger("opened.fndtn.reveal");
                        }.bind(this)).addClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.css(css).show().css({
                    opacity: 1
                }).addClass("open").trigger("opened").trigger("opened.fndtn.reveal");
            }
            var settings = this.settings;
            // should we animate the background?
            if (getAnimationData(settings.animation).fade) {
                return el.fadeIn(settings.animation_speed / 2);
            }
            this.locked = false;
            return el.show();
        },
        hide: function(el, css) {
            // is modal
            if (css) {
                var settings = el.data(this.attr_name(true) + "-init") || this.settings, root_element = settings.root_element;
                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    var end_css = {
                        top: -$(root_element).scrollTop() - el.data("offset") + "px",
                        //adding root_element instead of window for scrolling offset if modal trigger is below the fold
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = false;
                            el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
                        }.bind(this)).removeClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                if (animData.fade) {
                    var end_css = {
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = false;
                            el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
                        }.bind(this)).removeClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.hide().css(css).removeClass("open").trigger("closed").trigger("closed.fndtn.reveal");
            }
            var settings = this.settings;
            // should we animate the background?
            if (getAnimationData(settings.animation).fade) {
                return el.fadeOut(settings.animation_speed / 2);
            }
            return el.hide();
        },
        close_video: function(e) {
            var video = $(".flex-video", e.target), iframe = $("iframe", video);
            if (iframe.length > 0) {
                iframe.attr("data-src", iframe[0].src);
                iframe.attr("src", iframe.attr("src"));
                video.hide();
            }
        },
        open_video: function(e) {
            var video = $(".flex-video", e.target), iframe = video.find("iframe");
            if (iframe.length > 0) {
                var data_src = iframe.attr("data-src");
                if (typeof data_src === "string") {
                    iframe[0].src = iframe.attr("data-src");
                } else {
                    var src = iframe[0].src;
                    iframe[0].src = undefined;
                    iframe[0].src = src;
                }
                video.show();
            }
        },
        data_attr: function(str) {
            if (this.namespace.length > 0) {
                return this.namespace + "-" + str;
            }
            return str;
        },
        cache_offset: function(modal) {
            var offset = modal.show().height() + parseInt(modal.css("top"), 10);
            modal.hide();
            return offset;
        },
        off: function() {
            $(this.scope).off(".fndtn.reveal");
        },
        reflow: function() {}
    };
    /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */
    function getAnimationData(str) {
        var fade = /fade/i.test(str);
        var pop = /pop/i.test(str);
        return {
            animate: fade || pop,
            pop: pop,
            fade: fade
        };
    }
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.interchange = {
        name: "interchange",
        version: "5.5.0",
        cache: {},
        images_loaded: false,
        nodes_loaded: false,
        settings: {
            load_attr: "interchange",
            named_queries: {
                "default": "only screen",
                small: Foundation.media_queries["small"],
                "small-only": Foundation.media_queries["small-only"],
                medium: Foundation.media_queries["medium"],
                "medium-only": Foundation.media_queries["medium-only"],
                large: Foundation.media_queries["large"],
                "large-only": Foundation.media_queries["large-only"],
                xlarge: Foundation.media_queries["xlarge"],
                "xlarge-only": Foundation.media_queries["xlarge-only"],
                xxlarge: Foundation.media_queries["xxlarge"],
                landscape: "only screen and (orientation: landscape)",
                portrait: "only screen and (orientation: portrait)",
                retina: "only screen and (-webkit-min-device-pixel-ratio: 2)," + "only screen and (min--moz-device-pixel-ratio: 2)," + "only screen and (-o-min-device-pixel-ratio: 2/1)," + "only screen and (min-device-pixel-ratio: 2)," + "only screen and (min-resolution: 192dpi)," + "only screen and (min-resolution: 2dppx)"
            },
            directives: {
                replace: function(el, path, trigger) {
                    // The trigger argument, if called within the directive, fires
                    // an event named after the directive on the element, passing
                    // any parameters along to the event that you pass to trigger.
                    //
                    // ex. trigger(), trigger([a, b, c]), or trigger(a, b, c)
                    //
                    // This allows you to bind a callback like so:
                    // $('#interchangeContainer').on('replace', function (e, a, b, c) {
                    //   console.log($(this).html(), a, b, c);
                    // });
                    if (/IMG/.test(el[0].nodeName)) {
                        var orig_path = el[0].src;
                        if (new RegExp(path, "i").test(orig_path)) return;
                        el[0].src = path;
                        return trigger(el[0].src);
                    }
                    var last_path = el.data(this.data_attr + "-last-path"), self = this;
                    if (last_path == path) return;
                    if (/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(path)) {
                        $(el).css("background-image", "url(" + path + ")");
                        el.data("interchange-last-path", path);
                        return trigger(path);
                    }
                    return $.get(path, function(response) {
                        el.html(response);
                        el.data(self.data_attr + "-last-path", path);
                        trigger();
                    });
                }
            }
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle random_str");
            this.data_attr = this.set_data_attr();
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
            this.load("images");
            this.load("nodes");
        },
        get_media_hash: function() {
            var mediaHash = "";
            for (var queryName in this.settings.named_queries) {
                mediaHash += matchMedia(this.settings.named_queries[queryName]).matches.toString();
            }
            return mediaHash;
        },
        events: function() {
            var self = this, prevMediaHash;
            $(window).off(".interchange").on("resize.fndtn.interchange", self.throttle(function() {
                var currMediaHash = self.get_media_hash();
                if (currMediaHash !== prevMediaHash) {
                    self.resize();
                }
                prevMediaHash = currMediaHash;
            }, 50));
            return this;
        },
        resize: function() {
            var cache = this.cache;
            if (!this.images_loaded || !this.nodes_loaded) {
                setTimeout($.proxy(this.resize, this), 50);
                return;
            }
            for (var uuid in cache) {
                if (cache.hasOwnProperty(uuid)) {
                    var passed = this.results(uuid, cache[uuid]);
                    if (passed) {
                        this.settings.directives[passed.scenario[1]].call(this, passed.el, passed.scenario[0], function() {
                            if (arguments[0] instanceof Array) {
                                var args = arguments[0];
                            } else {
                                var args = Array.prototype.slice.call(arguments, 0);
                            }
                            passed.el.trigger(passed.scenario[1], args);
                        });
                    }
                }
            }
        },
        results: function(uuid, scenarios) {
            var count = scenarios.length;
            if (count > 0) {
                var el = this.S("[" + this.add_namespace("data-uuid") + '="' + uuid + '"]');
                while (count--) {
                    var mq, rule = scenarios[count][2];
                    if (this.settings.named_queries.hasOwnProperty(rule)) {
                        mq = matchMedia(this.settings.named_queries[rule]);
                    } else {
                        mq = matchMedia(rule);
                    }
                    if (mq.matches) {
                        return {
                            el: el,
                            scenario: scenarios[count]
                        };
                    }
                }
            }
            return false;
        },
        load: function(type, force_update) {
            if (typeof this["cached_" + type] === "undefined" || force_update) {
                this["update_" + type]();
            }
            return this["cached_" + type];
        },
        update_images: function() {
            var images = this.S("img[" + this.data_attr + "]"), count = images.length, i = count, loaded_count = 0, data_attr = this.data_attr;
            this.cache = {};
            this.cached_images = [];
            this.images_loaded = count === 0;
            while (i--) {
                loaded_count++;
                if (images[i]) {
                    var str = images[i].getAttribute(data_attr) || "";
                    if (str.length > 0) {
                        this.cached_images.push(images[i]);
                    }
                }
                if (loaded_count === count) {
                    this.images_loaded = true;
                    this.enhance("images");
                }
            }
            return this;
        },
        update_nodes: function() {
            var nodes = this.S("[" + this.data_attr + "]").not("img"), count = nodes.length, i = count, loaded_count = 0, data_attr = this.data_attr;
            this.cached_nodes = [];
            this.nodes_loaded = count === 0;
            while (i--) {
                loaded_count++;
                var str = nodes[i].getAttribute(data_attr) || "";
                if (str.length > 0) {
                    this.cached_nodes.push(nodes[i]);
                }
                if (loaded_count === count) {
                    this.nodes_loaded = true;
                    this.enhance("nodes");
                }
            }
            return this;
        },
        enhance: function(type) {
            var i = this["cached_" + type].length;
            while (i--) {
                this.object($(this["cached_" + type][i]));
            }
            return $(window).trigger("resize").trigger("resize.fndtn.interchange");
        },
        convert_directive: function(directive) {
            var trimmed = this.trim(directive);
            if (trimmed.length > 0) {
                return trimmed;
            }
            return "replace";
        },
        parse_scenario: function(scenario) {
            // This logic had to be made more complex since some users were using commas in the url path
            // So we cannot simply just split on a comma
            var directive_match = scenario[0].match(/(.+),\s*(\w+)\s*$/), media_query = scenario[1];
            if (directive_match) {
                var path = directive_match[1], directive = directive_match[2];
            } else {
                var cached_split = scenario[0].split(/,\s*$/), path = cached_split[0], directive = "";
            }
            return [ this.trim(path), this.convert_directive(directive), this.trim(media_query) ];
        },
        object: function(el) {
            var raw_arr = this.parse_data_attr(el), scenarios = [], i = raw_arr.length;
            if (i > 0) {
                while (i--) {
                    var split = raw_arr[i].split(/\((.*?)(\))$/);
                    if (split.length > 1) {
                        var params = this.parse_scenario(split);
                        scenarios.push(params);
                    }
                }
            }
            return this.store(el, scenarios);
        },
        store: function(el, scenarios) {
            var uuid = this.random_str(), current_uuid = el.data(this.add_namespace("uuid", true));
            if (this.cache[current_uuid]) return this.cache[current_uuid];
            el.attr(this.add_namespace("data-uuid"), uuid);
            return this.cache[uuid] = scenarios;
        },
        trim: function(str) {
            if (typeof str === "string") {
                return $.trim(str);
            }
            return str;
        },
        set_data_attr: function(init) {
            if (init) {
                if (this.namespace.length > 0) {
                    return this.namespace + "-" + this.settings.load_attr;
                }
                return this.settings.load_attr;
            }
            if (this.namespace.length > 0) {
                return "data-" + this.namespace + "-" + this.settings.load_attr;
            }
            return "data-" + this.settings.load_attr;
        },
        parse_data_attr: function(el) {
            var raw = el.attr(this.attr_name()).split(/\[(.*?)\]/), i = raw.length, output = [];
            while (i--) {
                if (raw[i].replace(/[\W\d]+/, "").length > 4) {
                    output.push(raw[i]);
                }
            }
            return output;
        },
        reflow: function() {
            this.load("images", true);
            this.load("nodes", true);
        }
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs["magellan-expedition"] = {
        name: "magellan-expedition",
        version: "5.5.0",
        settings: {
            active_class: "active",
            threshold: 0,
            // pixels from the top of the expedition for it to become fixes
            destination_threshold: 20,
            // pixels from the top of destination for it to be considered active
            throttle_delay: 30,
            // calculation throttling to increase framerate
            fixed_top: 0,
            // top distance in pixels assigend to the fixed element on scroll
            offset_by_height: true,
            // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
            duration: 700,
            // animation duration time 
            easing: "swing"
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle");
            this.bindings(method, options);
        },
        events: function() {
            var self = this, S = self.S, settings = self.settings;
            // initialize expedition offset
            self.set_expedition_position();
            S(self.scope).off(".magellan").on("click.fndtn.magellan", "[" + self.add_namespace("data-magellan-arrival") + '] a[href^="#"]', function(e) {
                e.preventDefault();
                var expedition = $(this).closest("[" + self.attr_name() + "]"), settings = expedition.data("magellan-expedition-init"), hash = this.hash.split("#").join(""), target = $('a[name="' + hash + '"]');
                if (target.length === 0) {
                    target = $("#" + hash);
                }
                // Account for expedition height if fixed position
                var scroll_top = target.offset().top - settings.destination_threshold + 1;
                if (settings.offset_by_height) {
                    scroll_top = scroll_top - expedition.outerHeight();
                }
                $("html, body").stop().animate({
                    scrollTop: scroll_top
                }, settings.duration, settings.easing, function() {
                    if (history.pushState) {
                        history.pushState(null, null, "#" + hash);
                    } else {
                        location.hash = "#" + hash;
                    }
                });
            }).on("scroll.fndtn.magellan", self.throttle(this.check_for_arrivals.bind(this), settings.throttle_delay));
            $(window).on("resize.fndtn.magellan", self.throttle(this.set_expedition_position.bind(this), settings.throttle_delay));
        },
        check_for_arrivals: function() {
            var self = this;
            self.update_arrivals();
            self.update_expedition_positions();
        },
        set_expedition_position: function() {
            var self = this;
            $("[" + this.attr_name() + "=fixed]", self.scope).each(function(idx, el) {
                var expedition = $(this), settings = expedition.data("magellan-expedition-init"), styles = expedition.attr("styles"), // save styles
                top_offset, fixed_top;
                expedition.attr("style", "");
                top_offset = expedition.offset().top + settings.threshold;
                //set fixed-top by attribute
                fixed_top = parseInt(expedition.data("magellan-fixed-top"));
                if (!isNaN(fixed_top)) self.settings.fixed_top = fixed_top;
                expedition.data(self.data_attr("magellan-top-offset"), top_offset);
                expedition.attr("style", styles);
            });
        },
        update_expedition_positions: function() {
            var self = this, window_top_offset = $(window).scrollTop();
            $("[" + this.attr_name() + "=fixed]", self.scope).each(function() {
                var expedition = $(this), settings = expedition.data("magellan-expedition-init"), styles = expedition.attr("style"), // save styles
                top_offset = expedition.data("magellan-top-offset");
                //scroll to the top distance
                if (window_top_offset + self.settings.fixed_top >= top_offset) {
                    // Placeholder allows height calculations to be consistent even when
                    // appearing to switch between fixed/non-fixed placement
                    var placeholder = expedition.prev("[" + self.add_namespace("data-magellan-expedition-clone") + "]");
                    if (placeholder.length === 0) {
                        placeholder = expedition.clone();
                        placeholder.removeAttr(self.attr_name());
                        placeholder.attr(self.add_namespace("data-magellan-expedition-clone"), "");
                        expedition.before(placeholder);
                    }
                    expedition.css({
                        position: "fixed",
                        top: settings.fixed_top
                    }).addClass("fixed");
                } else {
                    expedition.prev("[" + self.add_namespace("data-magellan-expedition-clone") + "]").remove();
                    expedition.attr("style", styles).css("position", "").css("top", "").removeClass("fixed");
                }
            });
        },
        update_arrivals: function() {
            var self = this, window_top_offset = $(window).scrollTop();
            $("[" + this.attr_name() + "]", self.scope).each(function() {
                var expedition = $(this), settings = expedition.data(self.attr_name(true) + "-init"), offsets = self.offsets(expedition, window_top_offset), arrivals = expedition.find("[" + self.add_namespace("data-magellan-arrival") + "]"), active_item = false;
                offsets.each(function(idx, item) {
                    if (item.viewport_offset >= item.top_offset) {
                        var arrivals = expedition.find("[" + self.add_namespace("data-magellan-arrival") + "]");
                        arrivals.not(item.arrival).removeClass(settings.active_class);
                        item.arrival.addClass(settings.active_class);
                        active_item = true;
                        return true;
                    }
                });
                if (!active_item) arrivals.removeClass(settings.active_class);
            });
        },
        offsets: function(expedition, window_offset) {
            var self = this, settings = expedition.data(self.attr_name(true) + "-init"), viewport_offset = window_offset;
            return expedition.find("[" + self.add_namespace("data-magellan-arrival") + "]").map(function(idx, el) {
                var name = $(this).data(self.data_attr("magellan-arrival")), dest = $("[" + self.add_namespace("data-magellan-destination") + "=" + name + "]");
                if (dest.length > 0) {
                    var top_offset = dest.offset().top - settings.destination_threshold;
                    if (settings.offset_by_height) {
                        top_offset = top_offset - expedition.outerHeight();
                    }
                    top_offset = Math.floor(top_offset);
                    return {
                        destination: dest,
                        arrival: $(this),
                        top_offset: top_offset,
                        viewport_offset: viewport_offset
                    };
                }
            }).sort(function(a, b) {
                if (a.top_offset < b.top_offset) return -1;
                if (a.top_offset > b.top_offset) return 1;
                return 0;
            });
        },
        data_attr: function(str) {
            if (this.namespace.length > 0) {
                return this.namespace + "-" + str;
            }
            return str;
        },
        off: function() {
            this.S(this.scope).off(".magellan");
            this.S(window).off(".magellan");
        },
        reflow: function() {
            var self = this;
            // remove placeholder expeditions used for height calculation purposes
            $("[" + self.add_namespace("data-magellan-expedition-clone") + "]", self.scope).remove();
        }
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.accordion = {
        name: "accordion",
        version: "5.5.0",
        settings: {
            content_class: "content",
            active_class: "active",
            multi_expand: false,
            toggleable: true,
            callback: function() {}
        },
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this;
            var S = this.S;
            S(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion", "[" + this.attr_name() + "] > .accordion-navigation > a", function(e) {
                var accordion = S(this).closest("[" + self.attr_name() + "]"), groupSelector = self.attr_name() + "=" + accordion.attr(self.attr_name()), settings = accordion.data(self.attr_name(true) + "-init") || self.settings, target = S("#" + this.href.split("#")[1]), aunts = $("> .accordion-navigation", accordion), siblings = aunts.children("." + settings.content_class), active_content = siblings.filter("." + settings.active_class);
                e.preventDefault();
                if (accordion.attr(self.attr_name())) {
                    siblings = siblings.add("[" + groupSelector + "] dd > " + "." + settings.content_class);
                    aunts = aunts.add("[" + groupSelector + "] .accordion-navigation");
                }
                if (settings.toggleable && target.is(active_content)) {
                    target.parent(".accordion-navigation").toggleClass(settings.active_class, false);
                    target.toggleClass(settings.active_class, false);
                    settings.callback(target);
                    target.triggerHandler("toggled", [ accordion ]);
                    accordion.triggerHandler("toggled", [ target ]);
                    return;
                }
                if (!settings.multi_expand) {
                    siblings.removeClass(settings.active_class);
                    aunts.removeClass(settings.active_class);
                }
                target.addClass(settings.active_class).parent().addClass(settings.active_class);
                settings.callback(target);
                target.triggerHandler("toggled", [ accordion ]);
                accordion.triggerHandler("toggled", [ target ]);
            });
        },
        off: function() {},
        reflow: function() {}
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.topbar = {
        name: "topbar",
        version: "5.5.0",
        settings: {
            index: 0,
            sticky_class: "sticky",
            custom_back_text: true,
            back_text: "Back",
            mobile_show_parent_link: true,
            is_hover: true,
            scrolltop: true,
            // jump to top when sticky nav menu toggle is clicked
            sticky_on: "all"
        },
        init: function(section, method, options) {
            Foundation.inherit(this, "add_custom_rule register_media throttle");
            var self = this;
            self.register_media("topbar", "foundation-mq-topbar");
            this.bindings(method, options);
            self.S("[" + this.attr_name() + "]", this.scope).each(function() {
                var topbar = $(this), settings = topbar.data(self.attr_name(true) + "-init"), section = self.S("section, .top-bar-section", this);
                topbar.data("index", 0);
                var topbarContainer = topbar.parent();
                if (topbarContainer.hasClass("fixed") || self.is_sticky(topbar, topbarContainer, settings)) {
                    self.settings.sticky_class = settings.sticky_class;
                    self.settings.sticky_topbar = topbar;
                    topbar.data("height", topbarContainer.outerHeight());
                    topbar.data("stickyoffset", topbarContainer.offset().top);
                } else {
                    topbar.data("height", topbar.outerHeight());
                }
                if (!settings.assembled) {
                    self.assemble(topbar);
                }
                if (settings.is_hover) {
                    self.S(".has-dropdown", topbar).addClass("not-click");
                } else {
                    self.S(".has-dropdown", topbar).removeClass("not-click");
                }
                // Pad body when sticky (scrolled) or fixed.
                self.add_custom_rule(".f-topbar-fixed { padding-top: " + topbar.data("height") + "px }");
                if (topbarContainer.hasClass("fixed")) {
                    self.S("body").addClass("f-topbar-fixed");
                }
            });
        },
        is_sticky: function(topbar, topbarContainer, settings) {
            var sticky = topbarContainer.hasClass(settings.sticky_class);
            if (sticky && settings.sticky_on === "all") {
                return true;
            } else if (sticky && this.small() && settings.sticky_on === "small") {
                return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches && !matchMedia(Foundation.media_queries.large).matches;
            } else if (sticky && this.medium() && settings.sticky_on === "medium") {
                return matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches && !matchMedia(Foundation.media_queries.large).matches;
            } else if (sticky && this.large() && settings.sticky_on === "large") {
                return matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches && matchMedia(Foundation.media_queries.large).matches;
            }
            return false;
        },
        toggle: function(toggleEl) {
            var self = this, topbar;
            if (toggleEl) {
                topbar = self.S(toggleEl).closest("[" + this.attr_name() + "]");
            } else {
                topbar = self.S("[" + this.attr_name() + "]");
            }
            var settings = topbar.data(this.attr_name(true) + "-init");
            var section = self.S("section, .top-bar-section", topbar);
            if (self.breakpoint()) {
                if (!self.rtl) {
                    section.css({
                        left: "0%"
                    });
                    $(">.name", section).css({
                        left: "100%"
                    });
                } else {
                    section.css({
                        right: "0%"
                    });
                    $(">.name", section).css({
                        right: "100%"
                    });
                }
                self.S("li.moved", section).removeClass("moved");
                topbar.data("index", 0);
                topbar.toggleClass("expanded").css("height", "");
            }
            if (settings.scrolltop) {
                if (!topbar.hasClass("expanded")) {
                    if (topbar.hasClass("fixed")) {
                        topbar.parent().addClass("fixed");
                        topbar.removeClass("fixed");
                        self.S("body").addClass("f-topbar-fixed");
                    }
                } else if (topbar.parent().hasClass("fixed")) {
                    if (settings.scrolltop) {
                        topbar.parent().removeClass("fixed");
                        topbar.addClass("fixed");
                        self.S("body").removeClass("f-topbar-fixed");
                        window.scrollTo(0, 0);
                    } else {
                        topbar.parent().removeClass("expanded");
                    }
                }
            } else {
                if (self.is_sticky(topbar, topbar.parent(), settings)) {
                    topbar.parent().addClass("fixed");
                }
                if (topbar.parent().hasClass("fixed")) {
                    if (!topbar.hasClass("expanded")) {
                        topbar.removeClass("fixed");
                        topbar.parent().removeClass("expanded");
                        self.update_sticky_positioning();
                    } else {
                        topbar.addClass("fixed");
                        topbar.parent().addClass("expanded");
                        self.S("body").addClass("f-topbar-fixed");
                    }
                }
            }
        },
        timer: null,
        events: function(bar) {
            var self = this, S = this.S;
            S(this.scope).off(".topbar").on("click.fndtn.topbar", "[" + this.attr_name() + "] .toggle-topbar", function(e) {
                e.preventDefault();
                self.toggle(this);
            }).on("click.fndtn.topbar", '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function(e) {
                var li = $(this).closest("li");
                if (self.breakpoint() && !li.hasClass("back") && !li.hasClass("has-dropdown")) {
                    self.toggle();
                }
            }).on("click.fndtn.topbar", "[" + this.attr_name() + "] li.has-dropdown", function(e) {
                var li = S(this), target = S(e.target), topbar = li.closest("[" + self.attr_name() + "]"), settings = topbar.data(self.attr_name(true) + "-init");
                if (target.data("revealId")) {
                    self.toggle();
                    return;
                }
                if (self.breakpoint()) return;
                if (settings.is_hover && !Modernizr.touch) return;
                e.stopImmediatePropagation();
                if (li.hasClass("hover")) {
                    li.removeClass("hover").find("li").removeClass("hover");
                    li.parents("li.hover").removeClass("hover");
                } else {
                    li.addClass("hover");
                    $(li).siblings().removeClass("hover");
                    if (target[0].nodeName === "A" && target.parent().hasClass("has-dropdown")) {
                        e.preventDefault();
                    }
                }
            }).on("click.fndtn.topbar", "[" + this.attr_name() + "] .has-dropdown>a", function(e) {
                if (self.breakpoint()) {
                    e.preventDefault();
                    var $this = S(this), topbar = $this.closest("[" + self.attr_name() + "]"), section = topbar.find("section, .top-bar-section"), dropdownHeight = $this.next(".dropdown").outerHeight(), $selectedLi = $this.closest("li");
                    topbar.data("index", topbar.data("index") + 1);
                    $selectedLi.addClass("moved");
                    if (!self.rtl) {
                        section.css({
                            left: -(100 * topbar.data("index")) + "%"
                        });
                        section.find(">.name").css({
                            left: 100 * topbar.data("index") + "%"
                        });
                    } else {
                        section.css({
                            right: -(100 * topbar.data("index")) + "%"
                        });
                        section.find(">.name").css({
                            right: 100 * topbar.data("index") + "%"
                        });
                    }
                    topbar.css("height", $this.siblings("ul").outerHeight(true) + topbar.data("height"));
                }
            });
            S(window).off(".topbar").on("resize.fndtn.topbar", self.throttle(function() {
                self.resize.call(self);
            }, 50)).trigger("resize").trigger("resize.fndtn.topbar").load(function() {
                // Ensure that the offset is calculated after all of the pages resources have loaded
                S(this).trigger("resize.fndtn.topbar");
            });
            S("body").off(".topbar").on("click.fndtn.topbar", function(e) {
                var parent = S(e.target).closest("li").closest("li.hover");
                if (parent.length > 0) {
                    return;
                }
                S("[" + self.attr_name() + "] li.hover").removeClass("hover");
            });
            // Go up a level on Click
            S(this.scope).on("click.fndtn.topbar", "[" + this.attr_name() + "] .has-dropdown .back", function(e) {
                e.preventDefault();
                var $this = S(this), topbar = $this.closest("[" + self.attr_name() + "]"), section = topbar.find("section, .top-bar-section"), settings = topbar.data(self.attr_name(true) + "-init"), $movedLi = $this.closest("li.moved"), $previousLevelUl = $movedLi.parent();
                topbar.data("index", topbar.data("index") - 1);
                if (!self.rtl) {
                    section.css({
                        left: -(100 * topbar.data("index")) + "%"
                    });
                    section.find(">.name").css({
                        left: 100 * topbar.data("index") + "%"
                    });
                } else {
                    section.css({
                        right: -(100 * topbar.data("index")) + "%"
                    });
                    section.find(">.name").css({
                        right: 100 * topbar.data("index") + "%"
                    });
                }
                if (topbar.data("index") === 0) {
                    topbar.css("height", "");
                } else {
                    topbar.css("height", $previousLevelUl.outerHeight(true) + topbar.data("height"));
                }
                setTimeout(function() {
                    $movedLi.removeClass("moved");
                }, 300);
            });
            // Show dropdown menus when their items are focused
            S(this.scope).find(".dropdown a").focus(function() {
                $(this).parents(".has-dropdown").addClass("hover");
            }).blur(function() {
                $(this).parents(".has-dropdown").removeClass("hover");
            });
        },
        resize: function() {
            var self = this;
            self.S("[" + this.attr_name() + "]").each(function() {
                var topbar = self.S(this), settings = topbar.data(self.attr_name(true) + "-init");
                var stickyContainer = topbar.parent("." + self.settings.sticky_class);
                var stickyOffset;
                if (!self.breakpoint()) {
                    var doToggle = topbar.hasClass("expanded");
                    topbar.css("height", "").removeClass("expanded").find("li").removeClass("hover");
                    if (doToggle) {
                        self.toggle(topbar);
                    }
                }
                if (self.is_sticky(topbar, stickyContainer, settings)) {
                    if (stickyContainer.hasClass("fixed")) {
                        // Remove the fixed to allow for correct calculation of the offset.
                        stickyContainer.removeClass("fixed");
                        stickyOffset = stickyContainer.offset().top;
                        if (self.S(document.body).hasClass("f-topbar-fixed")) {
                            stickyOffset -= topbar.data("height");
                        }
                        topbar.data("stickyoffset", stickyOffset);
                        stickyContainer.addClass("fixed");
                    } else {
                        stickyOffset = stickyContainer.offset().top;
                        topbar.data("stickyoffset", stickyOffset);
                    }
                }
            });
        },
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries["topbar"]).matches;
        },
        small: function() {
            return matchMedia(Foundation.media_queries["small"]).matches;
        },
        medium: function() {
            return matchMedia(Foundation.media_queries["medium"]).matches;
        },
        large: function() {
            return matchMedia(Foundation.media_queries["large"]).matches;
        },
        assemble: function(topbar) {
            var self = this, settings = topbar.data(this.attr_name(true) + "-init"), section = self.S("section, .top-bar-section", topbar);
            // Pull element out of the DOM for manipulation
            section.detach();
            self.S(".has-dropdown>a", section).each(function() {
                var $link = self.S(this), $dropdown = $link.siblings(".dropdown"), url = $link.attr("href"), $titleLi;
                if (!$dropdown.find(".title.back").length) {
                    if (settings.mobile_show_parent_link == true && url) {
                        $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link show-for-small-only"><a class="parent-link js-generated" href="' + url + '">' + $link.html() + "</a></li>");
                    } else {
                        $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');
                    }
                    // Copy link to subnav
                    if (settings.custom_back_text == true) {
                        $("h5>a", $titleLi).html(settings.back_text);
                    } else {
                        $("h5>a", $titleLi).html("&laquo; " + $link.html());
                    }
                    $dropdown.prepend($titleLi);
                }
            });
            // Put element back in the DOM
            section.appendTo(topbar);
            // check for sticky
            this.sticky();
            this.assembled(topbar);
        },
        assembled: function(topbar) {
            topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {
                assembled: true
            }));
        },
        height: function(ul) {
            var total = 0, self = this;
            $("> li", ul).each(function() {
                total += self.S(this).outerHeight(true);
            });
            return total;
        },
        sticky: function() {
            var self = this;
            this.S(window).on("scroll", function() {
                self.update_sticky_positioning();
            });
        },
        update_sticky_positioning: function() {
            var klass = "." + this.settings.sticky_class, $window = this.S(window), self = this;
            if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar, this.settings.sticky_topbar.parent(), this.settings)) {
                var distance = this.settings.sticky_topbar.data("stickyoffset");
                if (!self.S(klass).hasClass("expanded")) {
                    if ($window.scrollTop() > distance) {
                        if (!self.S(klass).hasClass("fixed")) {
                            self.S(klass).addClass("fixed");
                            self.S("body").addClass("f-topbar-fixed");
                        }
                    } else if ($window.scrollTop() <= distance) {
                        if (self.S(klass).hasClass("fixed")) {
                            self.S(klass).removeClass("fixed");
                            self.S("body").removeClass("f-topbar-fixed");
                        }
                    }
                }
            }
        },
        off: function() {
            this.S(this.scope).off(".fndtn.topbar");
            this.S(window).off(".fndtn.topbar");
        },
        reflow: function() {}
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.tab = {
        name: "tab",
        version: "5.5.0",
        settings: {
            active_class: "active",
            callback: function() {},
            deep_linking: false,
            scroll_to_content: true,
            is_hover: false
        },
        default_tab_hashes: [],
        init: function(scope, method, options) {
            var self = this, S = this.S;
            this.bindings(method, options);
            this.handle_location_hash_change();
            // Store the default active tabs which will be referenced when the
            // location hash is absent, as in the case of navigating the tabs and
            // returning to the first viewing via the browser Back button.
            S("[" + this.attr_name() + "] > .active > a", this.scope).each(function() {
                self.default_tab_hashes.push(this.hash);
            });
        },
        events: function() {
            var self = this, S = this.S;
            var usual_tab_behavior = function(e) {
                var settings = S(this).closest("[" + self.attr_name() + "]").data(self.attr_name(true) + "-init");
                if (!settings.is_hover || Modernizr.touch) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.toggle_active_tab(S(this).parent());
                }
            };
            S(this.scope).off(".tab").on("focus.fndtn.tab", "[" + this.attr_name() + "] > * > a", usual_tab_behavior).on("click.fndtn.tab", "[" + this.attr_name() + "] > * > a", usual_tab_behavior).on("mouseenter.fndtn.tab", "[" + this.attr_name() + "] > * > a", function(e) {
                var settings = S(this).closest("[" + self.attr_name() + "]").data(self.attr_name(true) + "-init");
                if (settings.is_hover) self.toggle_active_tab(S(this).parent());
            });
            // Location hash change event
            S(window).on("hashchange.fndtn.tab", function(e) {
                e.preventDefault();
                self.handle_location_hash_change();
            });
        },
        handle_location_hash_change: function() {
            var self = this, S = this.S;
            S("[" + this.attr_name() + "]", this.scope).each(function() {
                var settings = S(this).data(self.attr_name(true) + "-init");
                if (settings.deep_linking) {
                    // Match the location hash to a label
                    var hash;
                    if (settings.scroll_to_content) {
                        hash = self.scope.location.hash;
                    } else {
                        // prefix the hash to prevent anchor scrolling
                        hash = self.scope.location.hash.replace("fndtn-", "");
                    }
                    if (hash != "") {
                        // Check whether the location hash references a tab content div or
                        // another element on the page (inside or outside the tab content div)
                        var hash_element = S(hash);
                        if (hash_element.hasClass("content") && hash_element.parent().hasClass("tabs-content")) {
                            // Tab content div
                            self.toggle_active_tab($("[" + self.attr_name() + "] > * > a[href=" + hash + "]").parent());
                        } else {
                            // Not the tab content div. If inside the tab content, find the
                            // containing tab and toggle it as active.
                            var hash_tab_container_id = hash_element.closest(".content").attr("id");
                            if (hash_tab_container_id != undefined) {
                                self.toggle_active_tab($("[" + self.attr_name() + "] > * > a[href=#" + hash_tab_container_id + "]").parent(), hash);
                            }
                        }
                    } else {
                        // Reference the default tab hashes which were initialized in the init function
                        for (var ind = 0; ind < self.default_tab_hashes.length; ind++) {
                            self.toggle_active_tab($("[" + self.attr_name() + "] > * > a[href=" + self.default_tab_hashes[ind] + "]").parent());
                        }
                    }
                }
            });
        },
        toggle_active_tab: function(tab, location_hash) {
            var S = this.S, tabs = tab.closest("[" + this.attr_name() + "]"), tab_link = tab.find("a"), anchor = tab.children("a").first(), target_hash = "#" + anchor.attr("href").split("#")[1], target = S(target_hash), siblings = tab.siblings(), settings = tabs.data(this.attr_name(true) + "-init"), interpret_keyup_action = function(e) {
                // Light modification of Heydon Pickering's Practical ARIA Examples: http://heydonworks.com/practical_aria_examples/js/a11y.js
                // define current, previous and next (possible) tabs
                var $original = $(this);
                var $prev = $(this).parents("li").prev().children('[role="tab"]');
                var $next = $(this).parents("li").next().children('[role="tab"]');
                var $target;
                // find the direction (prev or next)
                switch (e.keyCode) {
                  case 37:
                    $target = $prev;
                    break;

                  case 39:
                    $target = $next;
                    break;

                  default:
                    $target = false;
                    break;
                }
                if ($target.length) {
                    $original.attr({
                        tabindex: "-1",
                        "aria-selected": null
                    });
                    $target.attr({
                        tabindex: "0",
                        "aria-selected": true
                    }).focus();
                }
                // Hide panels
                $('[role="tabpanel"]').attr("aria-hidden", "true");
                // Show panel which corresponds to target
                $("#" + $(document.activeElement).attr("href").substring(1)).attr("aria-hidden", null);
            };
            // allow usage of data-tab-content attribute instead of href
            if (S(this).data(this.data_attr("tab-content"))) {
                target_hash = "#" + S(this).data(this.data_attr("tab-content")).split("#")[1];
                target = S(target_hash);
            }
            if (settings.deep_linking) {
                if (settings.scroll_to_content) {
                    // retain current hash to scroll to content
                    window.location.hash = location_hash || target_hash;
                    if (location_hash == undefined || location_hash == target_hash) {
                        tab.parent()[0].scrollIntoView();
                    } else {
                        S(target_hash)[0].scrollIntoView();
                    }
                } else {
                    // prefix the hashes so that the browser doesn't scroll down
                    if (location_hash != undefined) {
                        window.location.hash = "fndtn-" + location_hash.replace("#", "");
                    } else {
                        window.location.hash = "fndtn-" + target_hash.replace("#", "");
                    }
                }
            }
            // WARNING: The activation and deactivation of the tab content must
            // occur after the deep linking in order to properly refresh the browser
            // window (notably in Chrome).
            // Clean up multiple attr instances to done once
            tab.addClass(settings.active_class).triggerHandler("opened");
            tab_link.attr({
                "aria-selected": "true",
                tabindex: 0
            });
            siblings.removeClass(settings.active_class);
            siblings.find("a").attr({
                "aria-selected": "false",
                tabindex: -1
            });
            target.siblings().removeClass(settings.active_class).attr({
                "aria-hidden": "true",
                tabindex: -1
            });
            target.addClass(settings.active_class).attr("aria-hidden", "false").removeAttr("tabindex");
            settings.callback(tab);
            target.triggerHandler("toggled", [ tab ]);
            tabs.triggerHandler("toggled", [ target ]);
            tab_link.off("keydown").on("keydown", interpret_keyup_action);
        },
        data_attr: function(str) {
            if (this.namespace.length > 0) {
                return this.namespace + "-" + str;
            }
            return str;
        },
        off: function() {},
        reflow: function() {}
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.abide = {
        name: "abide",
        version: "5.5.0",
        settings: {
            live_validate: true,
            validate_on_blur: true,
            focus_on_invalid: true,
            error_labels: true,
            // labels with a for="inputId" will recieve an `error` class
            error_class: "error",
            timeout: 1e3,
            patterns: {
                alpha: /^[a-zA-Z]+$/,
                alpha_numeric: /^[a-zA-Z0-9]+$/,
                integer: /^[-+]?\d+$/,
                number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
                // amex, visa, diners
                card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
                cvv: /^([0-9]){3,4}$/,
                // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
                email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
                url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
                // abc.de
                domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
                datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
                // YYYY-MM-DD
                date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
                // HH:MM:SS
                time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
                dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
                // MM/DD/YYYY
                month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
                // DD/MM/YYYY
                day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
                // #FFF or #FFFFFF
                color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
            },
            validators: {
                equalTo: function(el, required, parent) {
                    var from = document.getElementById(el.getAttribute(this.add_namespace("data-equalto"))).value, to = el.value, valid = from === to;
                    return valid;
                }
            }
        },
        timer: null,
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function(scope) {
            var self = this, form = self.S(scope).attr("novalidate", "novalidate"), settings = form.data(this.attr_name(true) + "-init") || {};
            this.invalid_attr = this.add_namespace("data-invalid");
            form.off(".abide").on("submit.fndtn.abide validate.fndtn.abide", function(e) {
                var is_ajax = /ajax/i.test(self.S(this).attr(self.attr_name()));
                return self.validate(self.S(this).find("input, textarea, select").get(), e, is_ajax);
            }).on("reset", function() {
                return self.reset($(this));
            }).find("input, textarea, select").off(".abide").on("blur.fndtn.abide change.fndtn.abide", function(e) {
                if (settings.validate_on_blur === true) {
                    self.validate([ this ], e);
                }
            }).on("keydown.fndtn.abide", function(e) {
                if (settings.live_validate === true && e.which != 9) {
                    clearTimeout(self.timer);
                    self.timer = setTimeout(function() {
                        self.validate([ this ], e);
                    }.bind(this), settings.timeout);
                }
            });
        },
        reset: function(form) {
            form.removeAttr(this.invalid_attr);
            $(this.invalid_attr, form).removeAttr(this.invalid_attr);
            $("." + this.settings.error_class, form).not("small").removeClass(this.settings.error_class);
        },
        validate: function(els, e, is_ajax) {
            var validations = this.parse_patterns(els), validation_count = validations.length, form = this.S(els[0]).closest("form"), submit_event = /submit/.test(e.type);
            // Has to count up to make sure the focus gets applied to the top error
            for (var i = 0; i < validation_count; i++) {
                if (!validations[i] && (submit_event || is_ajax)) {
                    if (this.settings.focus_on_invalid) els[i].focus();
                    form.trigger("invalid").trigger("invalid.fndtn.abide");
                    this.S(els[i]).closest("form").attr(this.invalid_attr, "");
                    return false;
                }
            }
            if (submit_event || is_ajax) {
                form.trigger("valid").trigger("valid.fndtn.abide");
            }
            form.removeAttr(this.invalid_attr);
            if (is_ajax) return false;
            return true;
        },
        parse_patterns: function(els) {
            var i = els.length, el_patterns = [];
            while (i--) {
                el_patterns.push(this.pattern(els[i]));
            }
            return this.check_validation_and_apply_styles(el_patterns);
        },
        pattern: function(el) {
            var type = el.getAttribute("type"), required = typeof el.getAttribute("required") === "string";
            var pattern = el.getAttribute("pattern") || "";
            if (this.settings.patterns.hasOwnProperty(pattern) && pattern.length > 0) {
                return [ el, this.settings.patterns[pattern], required ];
            } else if (pattern.length > 0) {
                return [ el, new RegExp(pattern), required ];
            }
            if (this.settings.patterns.hasOwnProperty(type)) {
                return [ el, this.settings.patterns[type], required ];
            }
            pattern = /.*/;
            return [ el, pattern, required ];
        },
        // TODO: Break this up into smaller methods, getting hard to read.
        check_validation_and_apply_styles: function(el_patterns) {
            var i = el_patterns.length, validations = [], form = this.S(el_patterns[0][0]).closest("[data-" + this.attr_name(true) + "]"), settings = form.data(this.attr_name(true) + "-init") || {};
            while (i--) {
                var el = el_patterns[i][0], required = el_patterns[i][2], value = el.value.trim(), direct_parent = this.S(el).parent(), validator = el.getAttribute(this.add_namespace("data-abide-validator")), is_radio = el.type === "radio", is_checkbox = el.type === "checkbox", label = this.S('label[for="' + el.getAttribute("id") + '"]'), valid_length = required ? el.value.length > 0 : true, el_validations = [];
                var parent, valid;
                // support old way to do equalTo validations
                if (el.getAttribute(this.add_namespace("data-equalto"))) {
                    validator = "equalTo";
                }
                if (!direct_parent.is("label")) {
                    parent = direct_parent;
                } else {
                    parent = direct_parent.parent();
                }
                if (validator) {
                    valid = this.settings.validators[validator].apply(this, [ el, required, parent ]);
                    el_validations.push(valid);
                }
                if (is_radio && required) {
                    el_validations.push(this.valid_radio(el, required));
                } else if (is_checkbox && required) {
                    el_validations.push(this.valid_checkbox(el, required));
                } else {
                    if (el_patterns[i][1].test(value) && valid_length || !required && el.value.length < 1 || $(el).attr("disabled")) {
                        el_validations.push(true);
                    } else {
                        el_validations.push(false);
                    }
                    el_validations = [ el_validations.every(function(valid) {
                        return valid;
                    }) ];
                    if (el_validations[0]) {
                        this.S(el).removeAttr(this.invalid_attr);
                        el.setAttribute("aria-invalid", "false");
                        el.removeAttribute("aria-describedby");
                        parent.removeClass(this.settings.error_class);
                        if (label.length > 0 && this.settings.error_labels) {
                            label.removeClass(this.settings.error_class).removeAttr("role");
                        }
                        $(el).triggerHandler("valid");
                    } else {
                        this.S(el).attr(this.invalid_attr, "");
                        el.setAttribute("aria-invalid", "true");
                        // Try to find the error associated with the input
                        var errorElem = parent.find("small." + this.settings.error_class, "span." + this.settings.error_class);
                        var errorID = errorElem.length > 0 ? errorElem[0].id : "";
                        if (errorID.length > 0) el.setAttribute("aria-describedby", errorID);
                        // el.setAttribute('aria-describedby', $(el).find('.error')[0].id);
                        parent.addClass(this.settings.error_class);
                        if (label.length > 0 && this.settings.error_labels) {
                            label.addClass(this.settings.error_class).attr("role", "alert");
                        }
                        $(el).triggerHandler("invalid");
                    }
                }
                validations.push(el_validations[0]);
            }
            validations = [ validations.every(function(valid) {
                return valid;
            }) ];
            return validations;
        },
        valid_checkbox: function(el, required) {
            var el = this.S(el), valid = el.is(":checked") || !required;
            if (valid) {
                el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
            } else {
                el.attr(this.invalid_attr, "").parent().addClass(this.settings.error_class);
            }
            return valid;
        },
        valid_radio: function(el, required) {
            var name = el.getAttribute("name"), group = this.S(el).closest("[data-" + this.attr_name(true) + "]").find("[name='" + name + "']"), count = group.length, valid = false;
            // Has to count up to make sure the focus gets applied to the top error
            for (var i = 0; i < count; i++) {
                if (group[i].checked) valid = true;
            }
            // Has to count up to make sure the focus gets applied to the top error
            for (var i = 0; i < count; i++) {
                if (valid) {
                    this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
                } else {
                    this.S(group[i]).attr(this.invalid_attr, "").parent().addClass(this.settings.error_class);
                }
            }
            return valid;
        },
        valid_equal: function(el, required, parent) {
            var from = document.getElementById(el.getAttribute(this.add_namespace("data-equalto"))).value, to = el.value, valid = from === to;
            if (valid) {
                this.S(el).removeAttr(this.invalid_attr);
                parent.removeClass(this.settings.error_class);
                if (label.length > 0 && settings.error_labels) label.removeClass(this.settings.error_class);
            } else {
                this.S(el).attr(this.invalid_attr, "");
                parent.addClass(this.settings.error_class);
                if (label.length > 0 && settings.error_labels) label.addClass(this.settings.error_class);
            }
            return valid;
        },
        valid_oneof: function(el, required, parent, doNotValidateOthers) {
            var el = this.S(el), others = this.S("[" + this.add_namespace("data-oneof") + "]"), valid = others.filter(":checked").length > 0;
            if (valid) {
                el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
            } else {
                el.attr(this.invalid_attr, "").parent().addClass(this.settings.error_class);
            }
            if (!doNotValidateOthers) {
                var _this = this;
                others.each(function() {
                    _this.valid_oneof.call(_this, this, null, null, true);
                });
            }
            return valid;
        }
    };
})(jQuery, window, window.document);

(function($, window, document, undefined) {
    "use strict";
    Foundation.libs.tooltip = {
        name: "tooltip",
        version: "5.5.0",
        settings: {
            additional_inheritable_classes: [],
            tooltip_class: ".tooltip",
            append_to: "body",
            touch_close_text: "Tap To Close",
            disable_for_touch: false,
            hover_delay: 200,
            show_on: "all",
            tip_template: function(selector, content) {
                return '<span data-selector="' + selector + '" id="' + selector + '" class="' + Foundation.libs.tooltip.settings.tooltip_class.substring(1) + '" role="tooltip">' + content + '<span class="nub"></span></span>';
            }
        },
        cache: {},
        init: function(scope, method, options) {
            Foundation.inherit(this, "random_str");
            this.bindings(method, options);
        },
        should_show: function(target, tip) {
            var settings = $.extend({}, this.settings, this.data_options(target));
            if (settings.show_on === "all") {
                return true;
            } else if (this.small() && settings.show_on === "small") {
                return true;
            } else if (this.medium() && settings.show_on === "medium") {
                return true;
            } else if (this.large() && settings.show_on === "large") {
                return true;
            }
            return false;
        },
        medium: function() {
            return matchMedia(Foundation.media_queries["medium"]).matches;
        },
        large: function() {
            return matchMedia(Foundation.media_queries["large"]).matches;
        },
        events: function(instance) {
            var self = this, S = self.S;
            self.create(this.S(instance));
            $(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "]", function(e) {
                var $this = S(this), settings = $.extend({}, self.settings, self.data_options($this)), is_touch = false;
                if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && S(e.target).is("a")) {
                    return false;
                }
                if (/mouse/i.test(e.type) && self.ie_touch(e)) return false;
                if ($this.hasClass("open")) {
                    if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) e.preventDefault();
                    self.hide($this);
                } else {
                    if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
                        return;
                    } else if (!settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
                        e.preventDefault();
                        S(settings.tooltip_class + ".open").hide();
                        is_touch = true;
                    }
                    if (/enter|over/i.test(e.type)) {
                        this.timer = setTimeout(function() {
                            var tip = self.showTip($this);
                        }.bind(this), self.settings.hover_delay);
                    } else if (e.type === "mouseout" || e.type === "mouseleave") {
                        clearTimeout(this.timer);
                        self.hide($this);
                    } else {
                        self.showTip($this);
                    }
                }
            }).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "].open", function(e) {
                if (/mouse/i.test(e.type) && self.ie_touch(e)) return false;
                if ($(this).data("tooltip-open-event-type") == "touch" && e.type == "mouseleave") {
                    return;
                } else if ($(this).data("tooltip-open-event-type") == "mouse" && /MSPointerDown|touchstart/i.test(e.type)) {
                    self.convert_to_touch($(this));
                } else {
                    self.hide($(this));
                }
            }).on("DOMNodeRemoved DOMAttrModified", "[" + this.attr_name() + "]:not(a)", function(e) {
                self.hide(S(this));
            });
        },
        ie_touch: function(e) {
            // How do I distinguish between IE11 and Windows Phone 8?????
            return false;
        },
        showTip: function($target) {
            var $tip = this.getTip($target);
            if (this.should_show($target, $tip)) {
                return this.show($target);
            }
            return;
        },
        getTip: function($target) {
            var selector = this.selector($target), settings = $.extend({}, this.settings, this.data_options($target)), tip = null;
            if (selector) {
                tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class);
            }
            return typeof tip === "object" ? tip : false;
        },
        selector: function($target) {
            var id = $target.attr("id"), dataSelector = $target.attr(this.attr_name()) || $target.attr("data-selector");
            if ((id && id.length < 1 || !id) && typeof dataSelector != "string") {
                dataSelector = this.random_str(6);
                $target.attr("data-selector", dataSelector).attr("aria-describedby", dataSelector);
            }
            return id && id.length > 0 ? id : dataSelector;
        },
        create: function($target) {
            var self = this, settings = $.extend({}, this.settings, this.data_options($target)), tip_template = this.settings.tip_template;
            if (typeof settings.tip_template === "string" && window.hasOwnProperty(settings.tip_template)) {
                tip_template = window[settings.tip_template];
            }
            var $tip = $(tip_template(this.selector($target), $("<div></div>").html($target.attr("title")).html())), classes = this.inheritable_classes($target);
            $tip.addClass(classes).appendTo(settings.append_to);
            if (Modernizr.touch) {
                $tip.append('<span class="tap-to-close">' + settings.touch_close_text + "</span>");
                $tip.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", function(e) {
                    self.hide($target);
                });
            }
            $target.removeAttr("title").attr("title", "");
        },
        reposition: function(target, tip, classes) {
            var width, nub, nubHeight, nubWidth, column, objPos;
            tip.css("visibility", "hidden").show();
            width = target.data("width");
            nub = tip.children(".nub");
            nubHeight = nub.outerHeight();
            nubWidth = nub.outerHeight();
            if (this.small()) {
                tip.css({
                    width: "100%"
                });
            } else {
                tip.css({
                    width: width ? width : "auto"
                });
            }
            objPos = function(obj, top, right, bottom, left, width) {
                return obj.css({
                    top: top ? top : "auto",
                    bottom: bottom ? bottom : "auto",
                    left: left ? left : "auto",
                    right: right ? right : "auto"
                }).end();
            };
            objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", target.offset().left);
            if (this.small()) {
                objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", 12.5, $(this.scope).width());
                tip.addClass("tip-override");
                objPos(nub, -nubHeight, "auto", "auto", target.offset().left);
            } else {
                var left = target.offset().left;
                if (Foundation.rtl) {
                    nub.addClass("rtl");
                    left = target.offset().left + target.outerWidth() - tip.outerWidth();
                }
                objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", left);
                tip.removeClass("tip-override");
                if (classes && classes.indexOf("tip-top") > -1) {
                    if (Foundation.rtl) nub.addClass("rtl");
                    objPos(tip, target.offset().top - tip.outerHeight(), "auto", "auto", left).removeClass("tip-override");
                } else if (classes && classes.indexOf("tip-left") > -1) {
                    objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left - tip.outerWidth() - nubHeight).removeClass("tip-override");
                    nub.removeClass("rtl");
                } else if (classes && classes.indexOf("tip-right") > -1) {
                    objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left + target.outerWidth() + nubHeight).removeClass("tip-override");
                    nub.removeClass("rtl");
                }
            }
            tip.css("visibility", "visible").hide();
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        inheritable_classes: function($target) {
            var settings = $.extend({}, this.settings, this.data_options($target)), inheritables = [ "tip-top", "tip-left", "tip-bottom", "tip-right", "radius", "round" ].concat(settings.additional_inheritable_classes), classes = $target.attr("class"), filtered = classes ? $.map(classes.split(" "), function(el, i) {
                if ($.inArray(el, inheritables) !== -1) {
                    return el;
                }
            }).join(" ") : "";
            return $.trim(filtered);
        },
        convert_to_touch: function($target) {
            var self = this, $tip = self.getTip($target), settings = $.extend({}, self.settings, self.data_options($target));
            if ($tip.find(".tap-to-close").length === 0) {
                $tip.append('<span class="tap-to-close">' + settings.touch_close_text + "</span>");
                $tip.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose", function(e) {
                    self.hide($target);
                });
            }
            $target.data("tooltip-open-event-type", "touch");
        },
        show: function($target) {
            var $tip = this.getTip($target);
            if ($target.data("tooltip-open-event-type") == "touch") {
                this.convert_to_touch($target);
            }
            this.reposition($target, $tip, $target.attr("class"));
            $target.addClass("open");
            $tip.fadeIn(150);
        },
        hide: function($target) {
            var $tip = this.getTip($target);
            $tip.fadeOut(150, function() {
                $tip.find(".tap-to-close").remove();
                $tip.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose");
                $target.removeClass("open");
            });
        },
        off: function() {
            var self = this;
            this.S(this.scope).off(".fndtn.tooltip");
            this.S(this.settings.tooltip_class).each(function(i) {
                $("[" + self.attr_name() + "]").eq(i).attr("title", $(this).text());
            }).remove();
        },
        reflow: function() {}
    };
})(jQuery, window, window.document);