import {ai as e, d as t, r as a, w as n, aj as l, ak as o, L as i, M as r, x as s, c as u, al as c, _ as d, o as v, b as p, e as m, F as f, v as h, q as g, t as y, g as b, G as k, m as _, u as A, p as x, C as w, D as S, a as E, am as I, P as T, a0 as C, an as O, H as j, j as B, N as M, y as z, ao as H, ap as F, aq as L, ar as R, a7 as P, as as q, ad as U, at as N, au as V, av as D, aw as K, ax as W, ay as Y, az as Q, aA as G, a8 as J, S as X, T as Z, aB as $, O as ee, aC as te, aD as ae, aE as ne} from "./index-DCHKkgCL.js";
import {_ as le} from "./icon_search_48-CnXB-U07.js";
import {C as oe} from "./index-0YbPhH0j.js";
import {C as ie} from "./CollapseTransition-DwB9nFpZ.js";
import {a as re, d as se, v as ue, E as ce, h as de, f as ve, o as pe, H as me, B as fe, O as he, u as ge, W as ye} from "./Ordered-BeWRVcDV.js";
import {_ as be} from "./icon_video_player-BREdkUZz.js";
import {i as ke} from "./image-f9cQNYOc.js";
import _e from "./VideoPlayer-CmZ9HLYd.js";
import {_ as Ae} from "./icon_close_black-B5TowSlI.js";
import {_ as xe} from "./icon_close_black-CxvcyxUd.js";
import {b as we} from "./project-bDv6RYpM.js";
import {M as Se} from "./modal-Du6iPYff.js";
import {E as Ee} from "./event-Bnt3L1xQ.js";
import {F as Ie, _ as Te} from "./DescEvent-AEQ9PU1l.js";
import {R as Ce} from "./ResizeTextarea-kDjIXnll.js";
import "./index-BrdufUtZ.js";
import "./throttle-by-raf-pvoqNjrQ.js";
import "./index-B1K_6Fnz.js";
import "./mount-component-C0nBeTSc.js";
import "./index-DfGwKzsv.js";
import "./index-CqqGI_Qp.js";
import "./index.es-u0XirVww.js";
import "./icon_close-iTeREOwP.js";
import "./SameActivityGuideRule-ChumfHUf.js";
alert();
var Oe = {}
  , je = {}
  , Be = {
    hashU32: function(e) {
        return -1252372727 ^ (e = (e = (e = (e = -949894596 ^ (e = (e |= 0) + 2127912214 + (e << 12) | 0) ^ e >>> 19) + 374761393 + (e << 5) | 0) + -744332180 ^ e << 9) + -42973499 + (e << 3) | 0) ^ e >>> 16
    },
    readU64: function(e, t) {
        var a = 0;
        return a |= e[t++] | 0,
        a |= e[t++] << 8,
        a |= e[t++] << 16,
        a |= e[t++] << 24,
        a |= e[t++] << 32,
        a |= e[t++] << 40,
        a |= e[t++] << 48,
        a |= e[t++] << 56
    },
    readU32: function(e, t) {
        var a = 0;
        return a |= e[t++] | 0,
        a |= e[t++] << 8,
        a |= e[t++] << 16,
        a |= e[t++] << 24
    },
    writeU32: function(e, t, a) {
        e[t++] = 255 & a,
        e[t++] = a >> 8 & 255,
        e[t++] = a >> 16 & 255,
        e[t++] = a >> 24 & 255
    },
    imul: function(e, t) {
        var a = 65535 & e
          , n = 65535 & t;
        return a * n + ((e >>> 16) * n + a * (t >>> 16) << 16) | 0
    }
}
  , Me = Be
  , ze = 2654435761
  , He = 2246822519
  , Fe = 3266489917
  , Le = 374761393;
function Re(e, t) {
    return (e |= 0) >>> (32 - (t |= 0) | 0) | e << t
}
function Pe(e, t, a) {
    return e |= 0,
    t |= 0,
    a |= 0,
    0 | Me.imul(e >>> (32 - t | 0) | e << t, a)
}
function qe(e, t) {
    return (e |= 0) >>> (t |= 0) ^ e
}
function Ue(e, t, a, n, l) {
    return Pe(Me.imul(t, a) + e, n, l)
}
function Ne(e, t, a) {
    return Pe(e + Me.imul(t[a], Le), 11, ze)
}
function Ve(e, t, a) {
    return Ue(e, Me.readU32(t, a), Fe, 17, 668265263)
}
function De(e, t, a) {
    return [Ue(e[0], Me.readU32(t, a + 0), He, 13, ze), Ue(e[1], Me.readU32(t, a + 4), He, 13, ze), Ue(e[2], Me.readU32(t, a + 8), He, 13, ze), Ue(e[3], Me.readU32(t, a + 12), He, 13, ze)]
}
je.hash = function(e, t, a, n) {
    var l, o;
    if (o = n,
    n >= 16) {
        for (l = [e + ze + He, e + He, e, e - ze]; n >= 16; )
            l = De(l, t, a),
            a += 16,
            n -= 16;
        l = Re(l[0], 1) + Re(l[1], 7) + Re(l[2], 12) + Re(l[3], 18) + o
    } else
        l = e + Le + n >>> 0;
    for (; n >= 4; )
        l = Ve(l, t, a),
        a += 4,
        n -= 4;
    for (; n > 0; )
        l = Ne(l, t, a),
        a++,
        n--;
    return (l = qe(Me.imul(qe(Me.imul(qe(l, 15), He), 13), Fe), 16)) >>> 0
}
,
function(e) {
    var t = je
      , a = Be
      , n = 65536
      , l = 15
      , o = c(5 << 20)
      , i = function() {
        try {
            return new Uint32Array(n)
        } catch (a) {
            for (var e = new Array(n), t = 0; t < n; t++)
                e[t] = 0;
            return e
        }
    }()
      , r = 407708164
      , s = 2147483648
      , u = {
        4: 65536,
        5: 262144,
        6: 1048576,
        7: 4194304
    };
    function c(e) {
        try {
            return new Uint8Array(e)
        } catch (n) {
            for (var t = new Array(e), a = 0; a < e; a++)
                t[a] = 0;
            return t
        }
    }
    function d(e, t, a) {
        if (void 0 !== typeof e.buffer) {
            if (Uint8Array.prototype.slice)
                return e.slice(t, a);
            var n = e.length;
            t = (t |= 0) < 0 ? Math.max(n + t, 0) : Math.min(t, n),
            a = (a = void 0 === a ? n : 0 | a) < 0 ? Math.max(n + a, 0) : Math.min(a, n);
            for (var l = new Uint8Array(a - t), o = t, i = 0; o < a; )
                l[i++] = e[o++];
            return l
        }
        return e.slice(t, a)
    }
    e.compressBound = function(e) {
        return e + e / 255 + 16 | 0
    }
    ,
    e.decompressBound = function(e) {
        var t = 0;
        if (a.readU32(e, t) !== r)
            throw new Error("invalid magic number");
        t += 4;
        var n = e[t++];
        if (64 != (192 & n))
            throw new Error("incompatible descriptor version " + (192 & n));
        var l = !!(16 & n)
          , o = !!(8 & n)
          , i = e[t++] >> 4 & 7;
        if (void 0 === u[i])
            throw new Error("invalid block size " + i);
        var c = u[i];
        if (o)
            return a.readU64(e, t);
        t++;
        for (var d = 0; ; ) {
            var v = a.readU32(e, t);
            if (t += 4,
            d += v & s ? v &= 2147483647 : c,
            0 === v)
                return d;
            l && (t += 4),
            t += v
        }
    }
    ,
    e.makeBuffer = c,
    e.decompressBlock = function(e, t, a, n, l) {
        var o, i, r, s, u;
        for (r = a + n; a < r; ) {
            var c = e[a++]
              , d = c >> 4;
            if (d > 0) {
                if (15 === d)
                    for (; d += e[a],
                    255 === e[a++]; )
                        ;
                for (s = a + d; a < s; )
                    t[l++] = e[a++]
            }
            if (a >= r)
                break;
            if (o = 15 & c,
            i = e[a++] | e[a++] << 8,
            15 === o)
                for (; o += e[a],
                255 === e[a++]; )
                    ;
            for (s = (u = l - i) + (o += 4); u < s; )
                t[l++] = 0 | t[u++]
        }
        return l
    }
    ,
    e.compressBlock = function(e, t, n, o, i) {
        var r, s, u, c, d, v, p, m;
        if (v = 0,
        p = o + n,
        s = n,
        o >= 13)
            for (var f = 67; n + 4 < p - 5; ) {
                var h = a.readU32(e, n)
                  , g = a.hashU32(h) >>> 0;
                if (r = i[g = (g >> 16 ^ g) >>> 0 & 65535] - 1,
                i[g] = n + 1,
                r < 0 || n - r >>> 16 > 0 || a.readU32(e, r) !== h)
                    n += f++ >> 6;
                else {
                    for (f = 67,
                    d = n - s,
                    c = n - r,
                    r += 4,
                    u = n += 4; n < p - 5 && e[n] === e[r]; )
                        n++,
                        r++;
                    var y = (u = n - u) < 15 ? u : 15;
                    if (d >= l) {
                        for (t[v++] = 240 + y,
                        m = d - l; m >= 255; m -= 255)
                            t[v++] = 255;
                        t[v++] = m
                    } else
                        t[v++] = (d << 4) + y;
                    for (var b = 0; b < d; b++)
                        t[v++] = e[s + b];
                    if (t[v++] = c,
                    t[v++] = c >> 8,
                    u >= 15) {
                        for (m = u - 15; m >= 255; m -= 255)
                            t[v++] = 255;
                        t[v++] = m
                    }
                    s = n
                }
            }
        if (0 === s)
            return 0;
        if ((d = p - s) >= l) {
            for (t[v++] = 240,
            m = d - l; m >= 255; m -= 255)
                t[v++] = 255;
            t[v++] = m
        } else
            t[v++] = d << 4;
        for (n = s; n < p; )
            t[v++] = e[n++];
        return v
    }
    ,
    e.decompressFrame = function(t, n) {
        var l, o, i, c, d = 0, v = 0;
        if (a.readU32(t, d) !== r)
            throw new Error("invalid magic number");
        if (d += 4,
        64 != (192 & (c = t[d++])))
            throw new Error("incompatible descriptor version");
        l = !!(16 & c),
        o = !!(4 & c),
        i = !!(8 & c);
        var p = t[d++] >> 4 & 7;
        if (void 0 === u[p])
            throw new Error("invalid block size");
        for (i && (d += 8),
        d++; ; ) {
            var m;
            if (m = a.readU32(t, d),
            d += 4,
            0 === m)
                break;
            if (l && (d += 4),
            m & s) {
                m &= 2147483647;
                for (var f = 0; f < m; f++)
                    n[v++] = t[d++]
            } else
                v = e.decompressBlock(t, n, d, m, v),
                d += m
        }
        return o && (d += 4),
        v
    }
    ,
    e.compressFrame = function(l, s) {
        var c = 0;
        a.writeU32(s, c, r),
        c += 4,
        s[c++] = 64,
        s[c++] = 112,
        s[c] = t.hash(0, s, 4, c - 4) >> 8,
        c++;
        var d = u[7]
          , v = l.length
          , p = 0;
        for (!function() {
            for (var e = 0; e < n; e++)
                i[e] = 0
        }(); v > 0; ) {
            var m, f = v > d ? d : v;
            if ((m = e.compressBlock(l, o, p, f, i)) > f || 0 === m) {
                a.writeU32(s, c, 2147483648 | f),
                c += 4;
                for (var h = p + f; p < h; )
                    s[c++] = l[p++];
                v -= f
            } else {
                a.writeU32(s, c, m),
                c += 4;
                for (var g = 0; g < m; )
                    s[c++] = o[g++];
                p += f,
                v -= f
            }
        }
        return a.writeU32(s, c, 0),
        c += 4
    }
    ,
    e.decompress = function(t, a) {
        var n, l;
        return void 0 === a && (a = e.decompressBound(t)),
        n = e.makeBuffer(a),
        (l = e.decompressFrame(t, n)) !== a && (n = d(n, 0, l)),
        n
    }
    ,
    e.compress = function(t, a) {
        var n, l;
        return void 0 === a && (a = e.compressBound(t.length)),
        n = e.makeBuffer(a),
        (l = e.compressFrame(t, n)) !== a && (n = d(n, 0, l)),
        n
    }
}(Oe);
const Ke = e(Oe);
function We(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var a = 0, n = Array(t); a < t; a++)
        n[a] = e[a];
    return n
}
function Ye(e, t, a) {
    return t && function(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, Ze(n.key), n)
        }
    }(e.prototype, t),
    Object.defineProperty(e, "prototype", {
        writable: !1
    }),
    e
}
function Qe(e, t, a) {
    return (t = Ze(t))in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a,
    e
}
function Ge(e, t) {
    var a = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }
        ))),
        a.push.apply(a, n)
    }
    return a
}
function Je(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Ge(Object(a), !0).forEach((function(t) {
            Qe(e, t, a[t])
        }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : Ge(Object(a)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t))
        }
        ))
    }
    return e
}
function Xe(e) {
    return function(e) {
        if (Array.isArray(e))
            return We(e)
    }(e) || function(e) {
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
            return Array.from(e)
    }(e) || function(e, t) {
        if (e) {
            if ("string" == typeof e)
                return We(e, t);
            var a = {}.toString.call(e).slice(8, -1);
            return "Object" === a && e.constructor && (a = e.constructor.name),
            "Map" === a || "Set" === a ? Array.from(e) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? We(e, t) : void 0
        }
    }(e) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
}
function Ze(e) {
    var t = function(e, t) {
        if ("object" != typeof e || !e)
            return e;
        var a = e[Symbol.toPrimitive];
        if (void 0 !== a) {
            var n = a.call(e, t || "default");
            if ("object" != typeof n)
                return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === t ? String : Number)(e)
    }(e, "string");
    return "symbol" == typeof t ? t : t + ""
}
var $e = "FRONT"
  , et = "BEHIND"
  , tt = "INIT"
  , at = "FIXED"
  , nt = "DYNAMIC"
  , lt = function() {
    return Ye((function e(t, a) {
        !function(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }(this, e),
        this.init(t, a)
    }
    ), [{
        key: "init",
        value: function(e, t) {
            this.param = e,
            this.callUpdate = t,
            this.sizes = new Map,
            this.firstRangeTotalSize = 0,
            this.firstRangeAverageSize = 0,
            this.lastCalcIndex = 0,
            this.fixedSizeValue = 0,
            this.calcType = tt,
            this.offset = 0,
            this.direction = "",
            this.range = Object.create(null),
            e && this.checkRange(0, e.keeps - 1)
        }
    }, {
        key: "destroy",
        value: function() {
            this.init(null, null)
        }
    }, {
        key: "getRange",
        value: function() {
            var e = Object.create(null);
            return e.start = this.range.start,
            e.end = this.range.end,
            e.padFront = this.range.padFront,
            e.padBehind = this.range.padBehind,
            e
        }
    }, {
        key: "isBehind",
        value: function() {
            return this.direction === et
        }
    }, {
        key: "isFront",
        value: function() {
            return this.direction === $e
        }
    }, {
        key: "getOffset",
        value: function(e) {
            return (e < 1 ? 0 : this.getIndexOffset(e)) + this.param.slotHeaderSize
        }
    }, {
        key: "updateParam",
        value: function(e, t) {
            var a = this;
            this.param && e in this.param && ("uniqueIds" === e && this.sizes.forEach((function(e, n) {
                t.includes(n) || a.sizes.delete(n)
            }
            )),
            this.param[e] = t)
        }
    }, {
        key: "saveSize",
        value: function(e, t) {
            (this.sizes.get(e) || 0) < t && this.sizes.set(e, t),
            this.calcType === tt ? (this.fixedSizeValue = t,
            this.calcType = at) : this.calcType === at && this.fixedSizeValue !== t && (this.calcType = nt,
            delete this.fixedSizeValue),
            this.calcType !== at && void 0 !== this.firstRangeTotalSize && (this.sizes.size < Math.min(this.param.keeps, this.param.uniqueIds.length) ? (this.firstRangeTotalSize = Xe(this.sizes.values()).reduce((function(e, t) {
                return e + t
            }
            ), 0),
            this.firstRangeAverageSize = Math.round(this.firstRangeTotalSize / this.sizes.size)) : delete this.firstRangeTotalSize)
        }
    }, {
        key: "handleDataSourcesChange",
        value: function() {
            var e = this.range.start;
            this.isFront() ? e -= 2 : this.isBehind() && (e += 2),
            e = Math.max(e, 0),
            this.updateRange(this.range.start, this.getEndByStart(e))
        }
    }, {
        key: "handleSlotSizeChange",
        value: function() {
            this.handleDataSourcesChange()
        }
    }, {
        key: "handleScroll",
        value: function(e) {
            this.direction = e < this.offset ? $e : et,
            this.offset = e,
            this.param && (this.direction === $e ? this.handleFront() : this.direction === et && this.handleBehind())
        }
    }, {
        key: "handleFront",
        value: function() {
            var e = this.getScrollOvers();
            if (!(e > this.range.start)) {
                var t = Math.max(e - this.param.buffer, 0);
                this.checkRange(t, this.getEndByStart(t))
            }
        }
    }, {
        key: "handleBehind",
        value: function() {
            var e = this.getScrollOvers();
            e < this.range.start + this.param.buffer || this.checkRange(e, this.getEndByStart(e))
        }
    }, {
        key: "getScrollOvers",
        value: function() {
            var e = this.offset - this.param.slotHeaderSize;
            if (e <= 0)
                return 0;
            if (this.isFixedType())
                return Math.floor(e / this.fixedSizeValue);
            for (var t = 0, a = 0, n = 0, l = this.param.uniqueIds.length; t <= l; ) {
                if (a = t + Math.floor((l - t) / 2),
                (n = this.getIndexOffset(a)) === e)
                    return a;
                n < e ? t = a + 1 : n > e && (l = a - 1)
            }
            return t > 0 ? --t : 0
        }
    }, {
        key: "getIndexOffset",
        value: function(e) {
            if (!e)
                return 0;
            for (var t = 0, a = 0, n = 0; n < e; n++)
                t += "number" == typeof (a = this.sizes.get(this.param.uniqueIds[n])) ? a : this.getEstimateSize();
            return this.lastCalcIndex = Math.max(this.lastCalcIndex, e - 1),
            this.lastCalcIndex = Math.min(this.lastCalcIndex, this.getLastIndex()),
            t
        }
    }, {
        key: "isFixedType",
        value: function() {
            return this.calcType === at
        }
    }, {
        key: "getLastIndex",
        value: function() {
            return this.param.uniqueIds.length - 1
        }
    }, {
        key: "checkRange",
        value: function(e, t) {
            var a = this.param.keeps;
            this.param.uniqueIds.length <= a ? (e = 0,
            t = this.getLastIndex()) : t - e < a - 1 && (e = t - a + 1),
            this.range.start !== e && this.updateRange(e, t)
        }
    }, {
        key: "updateRange",
        value: function(e, t) {
            this.range.start = e,
            this.range.end = t,
            this.range.padFront = this.getPadFront(),
            this.range.padBehind = this.getPadBehind(),
            this.callUpdate(this.getRange())
        }
    }, {
        key: "getEndByStart",
        value: function(e) {
            var t = e + this.param.keeps - 1;
            return Math.min(t, this.getLastIndex())
        }
    }, {
        key: "getPadFront",
        value: function() {
            return this.isFixedType() ? this.fixedSizeValue * this.range.start : this.getIndexOffset(this.range.start)
        }
    }, {
        key: "getPadBehind",
        value: function() {
            var e = this.range.end
              , t = this.getLastIndex();
            return this.isFixedType() ? (t - e) * this.fixedSizeValue : this.lastCalcIndex === t ? this.getIndexOffset(t) - this.getIndexOffset(e) : (t - e) * this.getEstimateSize()
        }
    }, {
        key: "getEstimateSize",
        value: function() {
            return this.isFixedType() ? this.fixedSizeValue : this.firstRangeAverageSize || this.param.estimateSize
        }
    }])
}()
  , ot = {
    dataKey: {
        type: [String, Function],
        required: !0
    },
    dataSources: {
        type: Array,
        required: !0,
        default: function() {
            return []
        }
    },
    dataComponent: {
        type: [Object, Function],
        required: !0
    },
    keeps: {
        type: Number,
        default: 30
    },
    extraProps: {
        type: Object
    },
    estimateSize: {
        type: Number,
        default: 50
    },
    calcSize: {
        type: Function
    },
    direction: {
        type: String,
        default: "vertical"
    },
    start: {
        type: Number,
        default: 0
    },
    offset: {
        type: Number,
        default: 0
    },
    topThreshold: {
        type: Number,
        default: 0
    },
    bottomThreshold: {
        type: Number,
        default: 0
    },
    pageMode: {
        type: Boolean,
        default: !1
    },
    rootTag: {
        type: String,
        default: "div"
    },
    wrapTag: {
        type: String,
        default: "div"
    },
    wrapClass: {
        type: String,
        default: "wrap"
    },
    wrapStyle: {
        type: Object
    },
    itemTag: {
        type: String,
        default: "div"
    },
    itemClass: {
        type: String,
        default: ""
    },
    itemClassAdd: {
        type: Function
    },
    itemStyle: {
        type: Object
    },
    headerTag: {
        type: String,
        default: "div"
    },
    headerClass: {
        type: String,
        default: ""
    },
    headerStyle: {
        type: Object
    },
    footerTag: {
        type: String,
        default: "div"
    },
    footerClass: {
        type: String,
        default: ""
    },
    footerStyle: {
        type: Object
    },
    itemScopedSlots: {
        type: Object
    }
}
  , it = {
    index: {
        type: Number
    },
    event: {
        type: String
    },
    tag: {
        type: String
    },
    horizontal: {
        type: Boolean
    },
    source: {
        type: Object
    },
    component: {
        type: [Object, Function]
    },
    uniqueKey: {
        type: [String, Number]
    },
    extraProps: {
        type: Object
    },
    scopedSlots: {
        type: Object
    }
}
  , rt = {
    event: {
        type: String
    },
    uniqueKey: {
        type: String
    },
    tag: {
        type: String
    },
    horizontal: {
        type: Boolean
    }
}
  , st = function(e, t, a) {
    var n = null
      , l = u((function() {
        return e.horizontal ? "offsetWidth" : "offsetHeight"
    }
    ))
      , o = function() {
        var n = e.event
          , o = e.uniqueKey
          , i = e.hasInitial;
        a(n, o, t.value ? t.value[l.value] : 0, i)
    };
    i((function() {
        "undefined" != typeof ResizeObserver && (n = new ResizeObserver((function() {
            o()
        }
        )),
        t.value && n.observe(t.value))
    }
    )),
    c((function() {
        o()
    }
    )),
    r((function() {
        n && (n.disconnect(),
        n = null)
    }
    ))
}
  , ut = t({
    name: "VirtualListItem",
    props: it,
    emits: ["itemResize"],
    setup: function(e, t) {
        var n = t.emit
          , l = a(null);
        return st(e, l, n),
        function() {
            var t = e.tag
              , a = e.component
              , n = e.extraProps
              , o = void 0 === n ? {} : n
              , i = e.index
              , r = e.source
              , u = e.scopedSlots
              , c = void 0 === u ? {} : u
              , d = e.uniqueKey
              , v = Je(Je({}, o), {}, {
                source: r,
                index: i
            });
            return s(t, {
                key: d,
                ref: l
            }, {
                default: function() {
                    return [s(a, Je(Je({}, v), {}, {
                        scopedSlots: c
                    }), null)]
                }
            })
        }
    }
})
  , ct = t({
    name: "VirtualListSlot",
    props: rt,
    emits: ["slotResize"],
    setup: function(e, t) {
        var n = t.slots
          , l = t.emit
          , o = a(null);
        return st(e, o, l),
        function() {
            var t, a = e.tag, l = e.uniqueKey;
            return s(a, {
                ref: o,
                key: l
            }, {
                default: function() {
                    return [null === (t = n.default) || void 0 === t ? void 0 : t.call(n)]
                }
            })
        }
    }
})
  , dt = function(e) {
    return e.ITEM = "itemResize",
    e.SLOT = "slotResize",
    e
}(dt || {})
  , vt = function(e) {
    return e.HEADER = "thead",
    e.FOOTER = "tfoot",
    e
}(vt || {})
  , pt = t({
    name: "VirtualList",
    props: ot,
    setup: function(e, t) {
        var u, c = t.emit, d = t.slots, v = t.expose, p = "horizontal" === e.direction, m = p ? "scrollLeft" : "scrollTop", f = a(null), h = a(), g = a(null);
        n((function() {
            return e.dataSources.length
        }
        ), (function() {
            u.updateParam("uniqueIds", A()),
            u.handleDataSourcesChange()
        }
        )),
        n((function() {
            return e.keeps
        }
        ), (function(e) {
            u.updateParam("keeps", e),
            u.handleSlotSizeChange()
        }
        )),
        n((function() {
            return e.start
        }
        ), (function(e) {
            w(e)
        }
        )),
        n((function() {
            return e.offset
        }
        ), (function(e) {
            return S(e)
        }
        ));
        var y = function() {
            return e.pageMode ? document.documentElement[m] || document.body[m] : h.value ? Math.ceil(h.value[m]) : 0
        }
          , b = function() {
            var t = p ? "clientWidth" : "clientHeight";
            return e.pageMode ? document.documentElement[t] || document.body[t] : h.value ? Math.ceil(h.value[t]) : 0
        }
          , k = function() {
            var t = p ? "scrollWidth" : "scrollHeight";
            return e.pageMode ? document.documentElement[t] || document.body[t] : h.value ? Math.ceil(h.value[t]) : 0
        }
          , _ = function(t) {
            requestAnimationFrame((function() {
                var a = y()
                  , n = b()
                  , l = k();
                a < 0 || a + n > l + 1 || !l || (u.handleScroll(a),
                function(t, a, n, l) {
                    c("scroll", l, u.getRange()),
                    u.isFront() && e.dataSources.length && t - e.topThreshold <= 0 ? c("totop") : u.isBehind() && t + a + e.bottomThreshold >= n && c("tobottom")
                }(a, n, l, t))
            }
            ))
        }
          , A = function() {
            var t = e.dataKey
              , a = e.dataSources;
            return (void 0 === a ? [] : a).map((function(e) {
                return "function" == typeof t ? t(e) : e[t]
            }
            ))
        }
          , x = function(e) {
            f.value = e
        }
          , w = function(t) {
            if (t >= e.dataSources.length - 1)
                C();
            else {
                var a = u.getOffset(t);
                S(a)
            }
        }
          , S = function(t) {
            e.pageMode ? (document.body[m] = t,
            document.documentElement[m] = t) : h.value && (h.value[m] = t)
        }
          , E = function() {
            for (var t = [], a = f.value, n = a.start, l = a.end, o = e.dataSources, i = e.dataKey, r = e.itemClass, c = e.itemTag, d = e.extraProps, v = e.dataComponent, m = e.itemScopedSlots, h = n; h <= l; h++) {
                var g = o[h];
                if (g) {
                    var y = "function" == typeof i ? i(g) : g[i]
                      , b = u.sizes.get(y) || 0
                      , k = Object.assign({}, e.itemStyle, {
                        minHeight: "".concat(b, "px")
                    });
                    "string" == typeof y || "number" == typeof y ? t.push(s(ut, {
                        key: y,
                        index: h,
                        tag: c,
                        event: dt.ITEM,
                        horizontal: p,
                        uniqueKey: y,
                        source: g,
                        extraProps: d,
                        component: v,
                        scopedSlots: m,
                        style: k,
                        class: "".concat(r).concat(e.itemClassAdd ? " " + e.itemClassAdd(h) : ""),
                        onItemResize: I
                    }, null)) : console.warn("Cannot get the data-key '".concat(i, "' from data-sources."))
                } else
                    console.warn("Cannot get the index '".concat(h, "' from data-sources."))
            }
            return t
        }
          , I = function(e, t) {
            u.saveSize(e, t)
        }
          , T = function(e, t, a) {
            e === vt.HEADER ? u.updateParam("slotHeaderSize", t) : e === vt.FOOTER && u.updateParam("slotFooterSize", t),
            a && u.handleSlotSizeChange()
        }
          , C = function() {
            if (g.value) {
                var e = g.value[p ? "offsetLeft" : "offsetTop"];
                S(e),
                setTimeout((function() {
                    y() + b() < k() && C()
                }
                ), 3)
            }
        };
        l((function() {
            u = new lt({
                slotHeaderSize: 0,
                slotFooterSize: 0,
                keeps: e.keeps,
                estimateSize: e.estimateSize,
                buffer: Math.ceil(e.keeps / 10),
                uniqueIds: A()
            },x),
            f.value = u.getRange()
        }
        )),
        o((function() {
            S(u.offset)
        }
        )),
        i((function() {
            e.start ? w(e.start) : e.offset && S(e.offset),
            e.pageMode && (!function() {
                if (h.value) {
                    var e = h.value.getBoundingClientRect()
                      , t = h.value.ownerDocument.defaultView
                      , a = p ? e.left + t.pageXOffset : e.top + t.pageYOffset;
                    u.updateParam("slotHeaderSize", a)
                }
            }(),
            document.addEventListener("scroll", _, {
                passive: !1
            })),
            e.calcSize && e.calcSize()
        }
        ));
        return r((function() {
            u.destroy(),
            e.pageMode && document.removeEventListener("scroll", _)
        }
        )),
        v({
            scrollToBottom: C,
            getSizes: function() {
                return u.sizes.size
            },
            getSize: function(e) {
                return u.sizes.get(e)
            },
            getOffset: y,
            getOffsetIndex: function(e) {
                return u.getOffset(e)
            },
            getScrollSize: k,
            getClientSize: b,
            scrollToOffset: S,
            scrollToIndex: w,
            getVirtual: function() {
                return u
            }
        }),
        function() {
            var t = e.pageMode
              , a = e.rootTag
              , n = e.wrapTag
              , l = e.wrapClass
              , o = e.wrapStyle
              , i = e.headerTag
              , r = e.headerClass
              , u = e.headerStyle
              , c = e.footerTag
              , v = e.footerClass
              , m = e.footerStyle
              , y = f.value
              , b = y.padFront
              , k = y.padBehind
              , A = {
                padding: p ? "0px ".concat(k, "px 0px ").concat(b, "px") : "".concat(b, "px 0px ").concat(k, "px")
            }
              , x = o ? Object.assign({}, o, A) : A
              , w = d.header
              , S = d.footer;
            return s(a, {
                ref: h,
                onScroll: !t && _
            }, {
                default: function() {
                    return [w && s(ct, {
                        class: r,
                        style: u,
                        tag: i,
                        event: dt.SLOT,
                        uniqueKey: vt.HEADER,
                        onSlotResize: T
                    }, {
                        default: function() {
                            return [w()]
                        }
                    }), s(n, {
                        class: l,
                        style: x
                    }, {
                        default: function() {
                            return [E()]
                        }
                    }), S && s(ct, {
                        class: v,
                        style: m,
                        tag: c,
                        event: dt.SLOT,
                        uniqueKey: vt.FOOTER,
                        onSlotResize: T
                    }, {
                        default: function() {
                            return [S()]
                        }
                    }), s("div", {
                        ref: g,
                        style: {
                            width: p ? "0px" : "100%",
                            height: p ? "100%" : "0px"
                        }
                    }, null)]
                }
            })
        }
    }
});
const mt = {
    class: "tabs"
}
  , ft = {
    class: "container"
}
  , ht = ["onClick"]
  , gt = d({
    __name: "TabSelect",
    props: ["tabs", "tabIndex"],
    emits: ["update:tabIndex"],
    setup(e, {emit: t}) {
        const a = t;
        return (t, n) => (v(),
        p("div", mt, [m("div", ft, [(v(!0),
        p(f, null, h(e.tabs, ( (t, n) => (v(),
        p("div", {
            class: g(["item", e.tabIndex == n ? "active" : ""]),
            key: n,
            onClick: e => ( (e, t) => {
                a("update:tabIndex", t)
            }
            )(0, n)
        }, [m("span", null, y(t), 1)], 10, ht)))), 128))])]))
    }
}, [["__scopeId", "data-v-4c3a4b13"]])
  , yt = {
    class: "s_collectAllIcons"
}
  , bt = {
    key: 0,
    class: g(["catalogue__list"])
}
  , kt = ["id"]
  , _t = ["onClick"]
  , At = {
    key: 0,
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none"
}
  , xt = {
    key: 1,
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none"
}
  , wt = ["onClick"]
  , St = d({
    __name: "Catalog",
    props: ["header"],
    emits: ["goArticle", "toggleExpandHandle"],
    setup(e, {emit: t}) {
        const n = e
          , l = t
          , o = a(!0)
          , i = a(!1)
          , r = e => 1 === e[e.heading].elements.length && "" === e[e.heading].elements[0].text_run.content ? "blank" : ""
          , s = u(( () => d([...n.header])))
          , c = e => parseInt(e.replace("heading", ""))
          , d = e => (e.forEach(( (t, a) => {
            var n;
            const l = c(t.heading);
            let o = !1;
            for (let i = a + 1; i < e.length; i++) {
                const t = c(e[i].heading);
                if (t > l) {
                    o = !0;
                    break
                }
                if (t <= l)
                    break
            }
            t.hasChildren = o,
            t.isExpanded = null == (n = t.isExpanded) || n
        }
        )),
        e)
          , _ = e => {
            const t = s.value[e];
            let a = c(t.heading);
            for (let n = e - 1; n >= 0; n--) {
                const e = s.value[n]
                  , t = c(e.heading);
                if (t < a) {
                    if (!e.isExpanded)
                        return !1;
                    a = t
                }
            }
            return !0
        }
          , A = e => {
            e.stopPropagation(),
            e.preventDefault(),
            i.value = !0
        }
          , x = e => {
            e.stopPropagation(),
            e.preventDefault(),
            i.value = !1
        }
        ;
        return (e, t) => (v(),
        p(f, null, [o.value ? b("", !0) : (v(),
        p("i", {
            key: 0,
            onClick: t[0] || (t[0] = e => o.value = !o.value),
            class: "iconfont icon-unfold expand_icon"
        })), m("div", yt, [o.value ? (v(),
        p("i", {
            key: 0,
            onClick: t[1] || (t[1] = e => o.value = !o.value),
            class: "iconfont icon-fold put_away_icon"
        })) : b("", !0)]), m("div", {
            onMouseleave: x,
            onMouseenter: A,
            class: g(["scrollbar-container", i.value ? "" : "v-no-scrollbar"])
        }, [o.value ? (v(),
        p("ul", bt, [(v(!0),
        p(f, null, h(s.value, ( (e, a) => (v(),
        p("li", {
            id: "header_" + e.block_id,
            class: g(["catalogue__list-item", e.heading]),
            key: e.block_id
        }, [_(a) ? (v(),
        p("div", {
            key: 0,
            class: g(["vc-block-hearder", r(e), e.hasChildren ? "icon_title_box" : ""])
        }, [e.hasChildren ? (v(),
        p("span", {
            key: 0,
            class: "toggle-icon",
            onClick: k((t => (e => {
                e.isExpanded = !e.isExpanded,
                l("toggleExpandHandle", e)
            }
            )(e)), ["stop"])
        }, [e.isExpanded ? (v(),
        p("svg", At, t[2] || (t[2] = [m("path", {
            d: "M12 6.33325L8 10.3333L4 6.33325H12Z",
            fill: "#8F959E",
            stroke: "#8F959E",
            "stroke-width": "1.33333",
            "stroke-linejoin": "round"
        }, null, -1)]))) : b("", !0), e.isExpanded ? b("", !0) : (v(),
        p("svg", xt, t[3] || (t[3] = [m("path", {
            d: "M6.33325 4L10.3333 8L6.33325 12L6.33325 4Z",
            fill: "#8F959E",
            stroke: "#8F959E",
            "stroke-width": "1.33333",
            "stroke-linejoin": "round"
        }, null, -1)])))], 8, _t)) : b("", !0), (v(!0),
        p(f, null, h(e[e.heading].elements, ( (t, a) => {
            var n;
            return v(),
            p("span", {
                key: a
            }, [m("span", {
                onClick: t => {
                    return a = null == e ? void 0 : e.block_id,
                    void l("goArticle", {
                        position: a
                    });
                    var a
                }
                ,
                class: g([e.curr ? "curr" : "", "title_text"])
            }, y(null == (n = t.text_run) ? void 0 : n.content), 11, wt)])
        }
        )), 128))], 2)) : b("", !0)], 10, kt)))), 128))])) : b("", !0)], 34)], 64))
    }
}, [["__scopeId", "data-v-c3d5c781"]])
  , Et = {
    class: g(["scrollbar-container", "v-no-scrollbar"])
}
  , It = {
    key: 0,
    class: g(["catalogue__list"])
}
  , Tt = ["id"]
  , Ct = ["onClick"]
  , Ot = {
    key: 0,
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none"
}
  , jt = {
    key: 1,
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none"
}
  , Bt = ["onClick"]
  , Mt = d({
    __name: "CatalogMobile",
    props: ["header"],
    emits: ["goArticle", "toggleExpandHandle", "closeShowListMoblie"],
    setup(e, {emit: t}) {
        const n = e
          , l = t
          , o = a(!0)
          , i = e => 1 === e[e.heading].elements.length && "" === e[e.heading].elements[0].text_run.content ? "blank" : ""
          , r = () => {
            l("closeShowListMoblie")
        }
          , s = u(( () => d([...n.header])))
          , c = e => parseInt(e.replace("heading", ""))
          , d = e => (e.forEach(( (t, a) => {
            var n;
            if (0 === a)
                return t.hasChildren = !1,
                void (t.isExpanded = !0);
            const l = c(t.heading);
            let o = !1;
            for (let i = a + 1; i < e.length; i++) {
                const t = c(e[i].heading);
                if (t > l) {
                    o = !0;
                    break
                }
                if (t <= l)
                    break
            }
            t.hasChildren = o,
            t.isExpanded = null == (n = t.isExpanded) || n
        }
        )),
        e)
          , _ = e => {
            const t = s.value[e];
            let a = c(t.heading);
            for (let n = e - 1; n >= 0; n--) {
                const e = s.value[n]
                  , t = c(e.heading);
                if (t < a) {
                    if (!e.isExpanded)
                        return !1;
                    if (a = t,
                    2 === a)
                        break
                }
            }
            return !0
        }
        ;
        return (e, t) => (v(),
        p("div", Et, [m("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAM1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACjBUbJAAAAEXRSTlMA2Ru+UbANyymjlYhfemxENvlzAAEAAACSSURBVEjH7ZQ5DsAgDARtcpqc/39tIqXYAiNWQanC1jMSBrzS8sOsvXgJ0YJ42VQXj+9UoyuYPkbKq7lCr3eG0eG7IKQBnjPAk8YMnjLmCXzJoHkY4EkDPGmQPIYFTxngPxHO9Ej1Q5evtf7hyl+j/vOBf7UOqVG/okehBPyaAQ8j10t7vsgsM8PqV6XFIC2/ywVOHAQB78ErOgAAAABJRU5ErkJggg==",
            alt: "",
            onClick: r,
            class: "close_icon"
        }), o.value ? (v(),
        p("ul", It, [(v(!0),
        p(f, null, h(s.value, ( (e, a) => (v(),
        p("li", {
            id: "header_" + e.block_id,
            class: g(["catalogue__list-item", e.heading]),
            key: e.block_id
        }, [_(a) ? (v(),
        p("div", {
            key: 0,
            class: g(["vc-block-hearder", i(e), e.hasChildren ? "icon_title_box" : ""])
        }, [e.hasChildren ? (v(),
        p("span", {
            key: 0,
            class: "toggle-icon",
            onClick: k((t => (e => {
                e.isExpanded = !e.isExpanded,
                l("toggleExpandHandle", e)
            }
            )(e)), ["stop"])
        }, [e.isExpanded ? (v(),
        p("svg", Ot, t[0] || (t[0] = [m("path", {
            d: "M12 6.33325L8 10.3333L4 6.33325H12Z",
            fill: "#8F959E",
            stroke: "#8F959E",
            "stroke-width": "1.33333",
            "stroke-linejoin": "round"
        }, null, -1)]))) : b("", !0), e.isExpanded ? b("", !0) : (v(),
        p("svg", jt, t[1] || (t[1] = [m("path", {
            d: "M6.33325 4L10.3333 8L6.33325 12L6.33325 4Z",
            fill: "#8F959E",
            stroke: "#8F959E",
            "stroke-width": "1.33333",
            "stroke-linejoin": "round"
        }, null, -1)])))], 8, Ct)) : b("", !0), (v(!0),
        p(f, null, h(e[e.heading].elements, ( (t, a) => {
            var n;
            return v(),
            p("span", {
                key: a
            }, [m("span", {
                onClick: t => {
                    return a = null == e ? void 0 : e.block_id,
                    void l("goArticle", {
                        position: a
                    });
                    var a
                }
                ,
                class: g([e.curr ? "curr" : "", "title_text"])
            }, y(null == (n = t.text_run) ? void 0 : n.content), 11, Bt)])
        }
        )), 128))], 2)) : b("", !0)], 10, Tt)))), 128))])) : b("", !0)]))
    }
}, [["__scopeId", "data-v-a77e60b8"]])
  , zt = {
    key: 0,
    class: "block-file video"
}
  , Ht = {
    class: "title"
}
  , Ft = ["src", "alt"]
  , Lt = ["innerHTML"]
  , Rt = {
    key: 1,
    class: "layout"
}
  , Pt = {
    class: "name"
}
  , qt = {
    class: "title"
}
  , Ut = ["src", "alt"]
  , Nt = ["innerHTML"]
  , Vt = d({
    __name: "File",
    props: ["item"],
    setup(e) {
        var t, n, l, o;
        const i = e
          , r = ( () => {
            const e = i.item.file.name;
            return e.endsWith("pdf") ? "pdf" : e.endsWith("doc") || e.endsWith("docx") ? "docx" : e.endsWith("xls") || e.endsWith("xlsx") ? "xlsx" : "link"
        }
        )()
          , s = u(( () => {
            let e = "";
            const t = (i.item.file.name || "").toLowerCase();
            return e = t.endsWith("mp4") || t.endsWith("mov") ? "video" : !_ && t.endsWith("mp3") ? "music" : "",
            e
        }
        ))
          , c = "https://search01.shengcaiyoushu.com/upload/doc/".concat(re.value, "/").concat(se.value[i.item.file.token] ? se.value[i.item.file.token] : i.item.file.token)
          , d = null == (o = null == (t = i.item.file) ? void 0 : t.name) ? void 0 : o.substring(null == (l = null == (n = i.item.file) ? void 0 : n.name) ? void 0 : l.lastIndexOf("."))
          , f = u(( () => ue.value > 1694102400 ? c + d : c))
          , h = u(( () => ue.value > 1694102400 ? "https://search01.shengcaiyoushu.com/upload/video/upload/doc/".concat(re.value, "/").concat(i.item.file.token, ".m3u8") : c))
          , g = a({
            playing: !1,
            currentTime: 0,
            maxTime: 0,
            minTime: 0,
            step: .1
        })
          , b = a(null)
          , k = a(!1)
          , w = a("")
          , S = () => {
            b.value.play()
        }
          , E = () => {
            g.value.playing = !1,
            b.value.pause();
            let e = parseInt(g.value.currentTime);
            k.value = !1,
            e == g.value.maxTime && (w.value = 0,
            g.value.currentTime = "00:00")
        }
          , I = e => {
            g.value.currentTime = e.target.currentTime,
            w.value = parseInt(g.value.currentTime / g.value.maxTime * 100)
        }
          , T = e => {
            g.value.maxTime = parseInt(e.target.duration)
        }
        ;
        return (t, a) => "video" === s.value ? (v(),
        p("div", zt, [m("div", Ht, [m("img", {
            class: "icon",
            src: "/images/docx/" + A(r) + ".png",
            alt: A(r)
        }, null, 8, Ft), m("span", {
            innerHTML: e.item.file.name + "【在线播放】"
        }, null, 8, Lt)]), m("div", {
            class: "player",
            onClick: a[0] || (a[0] = e => {
                ce.emit("previewVideo", {
                    url: h.value,
                    poster: "".concat(f.value, "?x-oss-process=video/snapshot,t_40001,m_fast")
                })
            }
            ),
            style: x({
                backgroundImage: "url(".concat(f.value, "?x-oss-process=video/snapshot,t_40001,m_fast)")
            })
        }, a[2] || (a[2] = [m("img", {
            class: "btn",
            src: be,
            alt: ""
        }, null, -1)]), 4)])) : "music" === s.value ? (v(),
        p("div", Rt, [m("div", Pt, [m("span", null, y(e.item.file.name), 1)]), m("audio", {
            ref_key: "audioMedia",
            ref: b,
            id: "audio",
            src: c,
            onPause: E,
            onPlay: S,
            onTimeupdate: I,
            onCanplay: T,
            controls: ""
        }, null, 544)])) : (v(),
        p("div", {
            key: 2,
            class: "block-file",
            onClick: a[1] || (a[1] = t => (e => {
                if (i.item.file.name.endsWith("pdf")) {
                    let t = e.file.token;
                    se.value[t] && (se.value[t],
                    t = se.value[t]),
                    window.open("https://search01.shengcaiyoushu.com/upload/doc/".concat(re, "/").concat(t), "_blank")
                } else
                    window.open(c, "_blank")
            }
            )(e.item))
        }, [m("div", qt, [m("img", {
            class: "icon",
            src: "/images/docx/" + A(r) + ".png",
            alt: A(r)
        }, null, 8, Ut), m("span", {
            innerHTML: e.item.file.name
        }, null, 8, Nt)])]))
    }
}, [["__scopeId", "data-v-e5efc728"]])
  , Dt = {
    class: "common-docx"
}
  , Kt = {
    key: 0,
    class: "head-image-mobile v-row"
}
  , Wt = {
    class: "docx-head-title-mobile"
}
  , Yt = {
    key: 1,
    class: "vc-pc"
}
  , Qt = {
    class: "head-image v-row"
}
  , Gt = {
    class: "docx-head-title"
}
  , Jt = d({
    __name: "HeadBg",
    props: ["headBg"],
    setup: e => (t, a) => (v(),
    p("div", Dt, [A(_) ? (v(),
    p("div", Kt, [a[0] || (a[0] = m("img", {
        src: "https://search01.shengcaiyoushu.com/test/assets/img_bg_head_mobile-By3S2fYL.png",
        alt: "",
        class: "docx-head-mobile"
    }, null, -1)), m("div", Wt, y(e.headBg.header_title), 1)])) : (v(),
    p("div", Yt, [m("div", Qt, [a[1] || (a[1] = m("img", {
        src: "https://search01.shengcaiyoushu.com/test/assets/img_bg_head_pc-BHxowOoL.png",
        alt: "",
        class: "docx-head"
    }, null, -1)), m("div", Gt, y(e.headBg.header_title), 1)])]))]))
}, [["__scopeId", "data-v-713e0622"]])
  , Xt = {
    key: 0,
    class: "HeadBg"
}
  , Zt = ["innerHTML"]
  , $t = ["innerHTML", "onClick"]
  , ea = ["innerHTML", "onClick"]
  , ta = ["innerHTML"]
  , aa = ["onClick"]
  , na = ["src"]
  , la = ["innerHTML"]
  , oa = ["innerHTML", "onClick"]
  , ia = {
    key: 6,
    class: "block-code"
}
  , ra = {
    key: 7,
    class: "block-icon"
}
  , sa = {
    contenteditable: "false",
    class: "callout-emoji-container emoji-for-text"
}
  , ua = {
    class: "callout-block-emoji"
}
  , ca = {
    class: "emoji-mart-emoji emoji-mart-emoji-native"
}
  , da = {
    style: {
        "font-size": "20px",
        "line-height": "32px"
    }
}
  , va = {
    key: 8,
    class: "block-driver"
}
  , pa = {
    key: 10,
    class: "block-image"
}
  , ma = ["src", "onClick"]
  , fa = {
    __name: "DocItem",
    props: ["source"],
    setup(e) {
        const t = e
          , a = e => {
            const t = {};
            return void 0 !== e.page && (t.page = !0),
            void 0 !== e.callout && (t.callout = !0,
            e.callout.background_color && (t["border_color_".concat(e.callout.background_color)] = !0,
            t["background_color_".concat(e.callout.background_color)] = !0)),
            void 0 !== e.quote_container && (t.quote_container = !0,
            t["vc-quote_container"] = !0),
            void 0 !== e.bullet && (t.bullet_container = !0,
            t.uncircle = !0),
            void 0 !== e.table && (t.table = !0,
            t["table_".concat(e.table.property.column_size)] = !0),
            32 === e.block_type && (t.table_cell = !0),
            void 0 !== e.grid && (t.grid = !0),
            void 0 !== e.grid_column && (t.grid_column = !0),
            24 === e.parent_block_type && e.block_type > 2 && (t.grid_item = !0),
            t
        }
          , n = e => {
            const t = {};
            return 32 === e.block_type && (t.border = "1px solid #dee0e3"),
            void 0 !== e.grid_column && (t["flex-basis"] = "".concat(e.grid_column.width_ratio, "%")),
            e.text && 2 === e.text.style.align && (t["text-align"] = "center"),
            t
        }
          , l = e => {
            const t = {};
            if (24 === e.block_type && _ && (t["flex-direction"] = "column"),
            void 0 !== e.table) {
                const a = [];
                e.table.property.column_width.forEach(( (t, n) => {
                    n === e.table.property.column_width.length - 1 ? a.push(_ ? "".concat(t, "px") : "auto") : a.push("".concat(t, "px"))
                }
                )),
                t["grid-template-columns"] = a.join(" ")
            }
            return t
        }
          , o = e => {
            switch (e.callout.emoji_id) {
            case "pushpin":
                return "📌";
            case "rocket":
                return "🚀";
            case "clock3":
                return "🕒";
            case "clock12":
                return "🕛";
            case "clock6":
                return "🕕";
            case "clock9":
                return "🕘";
            default:
                return "💡"
            }
        }
        ;
        var i = 0
          , r = "";
        const u = e => {
            const t = ge.value.findIndex((t => parseInt(t.group_number) === parseInt(e.number)));
            return t >= 0 ? {
                name: ge.value[t].name,
                avatar: ge.value[t].avatar + "_132"
            } : {
                name: (null == e ? void 0 : e.name) || "",
                avatar: "",
                link: ""
            }
        }
          , c = e => {
            let t = e.image.token;
            return se.value[t] && (t = se.value[t]),
            "https://search01.shengcaiyoushu.com/upload/doc/".concat(re.value, "/").concat(t, "_jpeg?_=").concat(ue.value)
        }
          , d = e => {
            let t = e.image.width + "px";
            return e.image.width < e.image.height && (t = e.image.width / 2.4 + "px"),
            {
                width: t
            }
        }
          , C = e => e.text.elements.findIndex((e => null != e.mention_user)) >= 0
          , O = e => e.code.elements.filter((e => e.text_run && e.text_run.content)).map((e => e.text_run.content)).join("");
        return (j, B) => {
            var M, z;
            const H = w("DocItem", !0);
            return B[0] || (S(-1),
            (B[0] = m("div", {
                ref: "block",
                class: "block-wrapper",
                id: e.source.block_id,
                style: x(n(e.source))
            }, [(v(),
            p("div", {
                key: e.source.block_id,
                class: g(a(e.source))
            }, [e.source.type && e.source.header_title ? (v(),
            p("div", Xt, [s(Jt, {
                headBg: A(de)
            }, null, 8, ["headBg"])])) : b("", !0), 1 === e.source.block_type ? (v(),
            p("div", {
                key: 1,
                class: g(["block-header", (L = e.source,
                L.page.elements.findIndex((e => "" != e.text_run.content)) >= 0 ? "hasSpace" : "")])
            }, [(v(!0),
            p(f, null, h(null == (M = e.source.page) ? void 0 : M.elements, ( (e, t) => (v(),
            p("span", {
                key: t,
                innerHTML: e.text_run.content
            }, null, 8, Zt)))), 128))], 2)) : b("", !0), 2 === e.source.block_type ? (v(),
            p("div", {
                key: 2,
                class: g(["block-text", C(e.source) ? "headFlex" : ""])
            }, [(v(!0),
            p(f, null, h(null == (z = e.source.text) ? void 0 : z.elements, ( (e, t) => {
                var a, n, l, o;
                return v(),
                p(f, {
                    key: t
                }, [e.mention_doc ? (v(),
                p("a", {
                    key: 0,
                    class: g([A(ve)(e), "aHref"]),
                    innerHTML: e.mention_doc.title,
                    onClick: t => A(pe)(e.mention_doc.url, e)
                }, null, 10, $t)) : e.text_run && 0 === e.text_run.content.length ? (v(),
                p("span", {
                    key: 1,
                    class: g([A(ve)(e), "blank"])
                }, null, 2)) : e.text_run && e.text_run.content.startsWith("http") ? (v(),
                p("a", {
                    key: 2,
                    class: g([A(ve)(e), "aHref"]),
                    innerHTML: e.text_run.content,
                    onClick: t => A(pe)(e.text_run.content, e)
                }, null, 10, ea)) : e.text_run && void 0 === e.text_run.text_element_style.link ? (v(),
                p("span", {
                    key: 3,
                    class: g(A(ve)(e)),
                    innerHTML: e.text_run.content
                }, null, 10, ta)) : e.mention_user ? (v(),
                p("div", {
                    key: 4,
                    class: g([A(_) ? "headMobile" : "headPc"]),
                    onClick: k((t => (e => {
                        const t = ge.value.findIndex((t => parseInt(t.group_number) === parseInt(e.number)));
                        t >= 0 ? _ ? window.open("".concat(I, "/mobile/mine/user?userId=").concat(ge.value[t].user_id, "&number=").concat(ge.value[t].group_number)) : window.open("".concat(I, "/personal/").concat(ge.value[t].user_id, "?number=").concat(ge.value[t].group_number)) : T.showToast({
                            title: "非星球用户",
                            duration: 1e3
                        })
                    }
                    )(e.mention_user)), ["stop"])
                }, [m("img", {
                    src: (null == (a = u(e.mention_user)) ? void 0 : a.avatar) ? null == (n = u(e.mention_user)) ? void 0 : n.avatar : "/images/pic_avatar.png",
                    alt: "",
                    class: "head_img"
                }, null, 8, na), m("a", {
                    class: g([A(ve)(e), "aHref"]),
                    innerHTML: null == (l = u(e.mention_user)) ? void 0 : l.name
                }, null, 10, la)], 10, aa)) : (v(),
                p("a", {
                    key: 5,
                    class: g([A(ve)(e), "aHref"]),
                    innerHTML: null == (o = e.text_run) ? void 0 : o.content,
                    onClick: t => A(pe)(e.text_run.text_element_style.link.url, e)
                }, null, 10, oa))], 64)
            }
            )), 128))], 2)) : b("", !0), e.source.block_type >= 3 && e.source.block_type <= 11 ? (v(),
            E(me, {
                key: 3,
                item: (F = e.source,
                {
                    ...F[F.heading],
                    block: "block".concat(F.block_type),
                    id: F.block_id
                })
            }, null, 8, ["item"])) : b("", !0), 12 === e.source.block_type ? (v(),
            E(fe, {
                key: 4,
                item: e.source
            }, null, 8, ["item"])) : b("", !0), 13 === e.source.block_type ? (v(),
            E(he, {
                key: 5,
                item: e.source
            }, null, 8, ["item"])) : b("", !0), 14 === e.source.block_type ? (v(),
            p("div", ia, [m("pre", null, [m("code", null, y(O(e.source)), 1)])])) : b("", !0), 19 === e.source.block_type ? (v(),
            p("div", ra, [m("div", sa, [m("div", ua, [m("span", ca, [m("span", da, y(o(e.source)), 1)])])])])) : b("", !0), 22 === e.source.block_type ? (v(),
            p("div", va)) : b("", !0), 23 === e.source.block_type ? (v(),
            E(Vt, {
                key: 9,
                item: e.source
            }, null, 8, ["item"])) : b("", !0), 27 === e.source.block_type ? (v(),
            p("div", pa, [m("img", {
                src: c(e.source),
                style: x(d(e.source)),
                alt: "",
                onClick: t => (e => {
                    ke({
                        urls: [c(e)]
                    })
                }
                )(e.source)
            }, null, 12, ma)])) : b("", !0), e.source.node && (e.source.block_type <= 27 || [31, 32, 33, 34].includes(e.source.block_type)) ? (v(),
            p("div", {
                key: 11,
                style: x(l(e.source))
            }, [(v(!0),
            p(f, null, h((e.source.node,
            t.source.node.forEach((e => {
                if (e.block_type >= 3 && e.block_type <= 11)
                    return r = "",
                    void (i = 0);
                if (13 === e.block_type) {
                    const t = e.ordered.elements[0];
                    if (t && t.text_run) {
                        const a = t.text_run.text_element_style
                          , n = "".concat(a.bold).concat(a.bulletlist);
                        r === n ? i += 1 : i = 1,
                        r = n,
                        e.index = i
                    }
                }
            }
            )),
            t.source.node), ( (e, t) => (v(),
            E(H, {
                source: e,
                index: t,
                key: e.block_id
            }, null, 8, ["source", "index"])))), 128))], 4)) : b("", !0)], 2))], 12, ["id"])).cacheIndex = 0,
            S(1),
            B[0]);
            var F, L
        }
    }
}
  , ha = {
    class: "title-bar"
}
  , ga = {
    class: "header"
}
  , ya = {
    class: "header-top"
}
  , ba = {
    class: "title"
}
  , ka = ["innerHTML"]
  , _a = d({
    __name: "TitleBarNps",
    props: ["item"],
    setup(e) {
        const t = e
          , a = u(( () => {
            let e = [];
            return t.item.description && t.item.description.split("\n\n").forEach((t => {
                t.startsWith("# ") ? e.push("<span class='h1'>".concat(t.slice(2), "</span>")) : t.indexOf("https") >= 0 ? e.push("<span class='h2'>".concat(t, "</span>")) : e.push("<div>".concat(t, "</div>"))
            }
            )),
            e.join("")
        }
        ));
        return (t, n) => (v(),
        p(f, null, [e.item.options ? (v(),
        p("div", {
            key: 0,
            class: "images-head",
            style: x({
                backgroundImage: "url(".concat(e.item.options, ")")
            })
        }, null, 4)) : b("", !0), m("div", ha, [m("div", ga, [m("div", ya, [m("div", ba, y(e.item.title), 1)]), a.value ? (v(),
        p("div", {
            key: 0,
            class: "header-bottom description desc",
            innerHTML: a.value
        }, null, 8, ka)) : b("", !0)])])], 64))
    }
}, [["__scopeId", "data-v-f5494624"]])
  , Aa = ["id"]
  , xa = {
    class: "content"
}
  , wa = {
    key: 0,
    class: "hint"
}
  , Sa = {
    __name: "ItemNps",
    props: ["item"],
    setup: e => (t, a) => (v(),
    p("div", {
        class: "input-box",
        id: "field_" + e.item.id
    }, [m("div", xa, [C(t.$slots, "content")]), e.item.errorHint ? (v(),
    p("div", wa, y(e.item.errorHint), 1)) : b("", !0)], 8, Aa))
}
  , Ea = {
    class: "desc-score"
}
  , Ia = {
    class: "desc-text v-row"
}
  , Ta = {
    class: "content-score"
}
  , Ca = ["onClick"]
  , Oa = {
    __name: "ScoreNps",
    props: ["item"],
    setup(e) {
        const t = e
          , n = O(t.item, "value")
          , l = a([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          , o = a(-1)
          , r = e => {
            o.value = e,
            n.value = o.value.toString(),
            Ee.emit("onBlur", t.item)
        }
        ;
        return i(( () => {
            t.item.value && (o.value = parseInt(t.item.value))
        }
        )),
        (t, a) => (v(),
        E(Sa, {
            class: "score",
            item: e.item
        }, {
            content: j(( () => {
                var t;
                return [m("div", Ea, [m("div", Ia, y(null == (t = e.item) ? void 0 : t.description), 1), a[0] || (a[0] = m("div", {
                    class: "desc-compare"
                }, [m("div", {
                    class: "left v-row"
                }, [m("img", {
                    src: "https://search01.shengcaiyoushu.com/test/images/icon_emotion_unhappy.png",
                    alt: ""
                }), m("span", null, "不可能")]), m("div", {
                    class: "right v-row"
                }, [m("span", null, "极有可能"), m("img", {
                    src: "https://search01.shengcaiyoushu.com/test/images/icon_emotion_happy.png",
                    alt: ""
                })])], -1))]), m("div", Ta, [(v(!0),
                p(f, null, h(l.value, ( (e, t) => (v(),
                p("div", {
                    onClick: e => r(t),
                    key: t,
                    class: g(["item", o.value >= t ? "active" : ""])
                }, [m("span", null, y(e), 1)], 10, Ca)))), 128))])]
            }
            )),
            _: 1
        }, 8, ["item"]))
    }
}
  , ja = {
    key: 0,
    class: "limitText"
}
  , Ba = {
    __name: "TextNps",
    props: ["item"],
    setup(e) {
        B();
        const t = a(null)
          , n = () => {
            Ee.emit("onBlur", l.item)
        }
          , l = e
          , o = O(l.item, "value")
          , i = u(( () => l.item.disabled && !o.value ? "border warning bgStyle" : l.item.errorHint && l.item.required ? "border error bgStyle" : "" === l.item.value ? "border bgStyle" : "border success"))
          , r = M(( () => {
            var e, a;
            n(),
            (null == (a = null == (e = l.item) ? void 0 : e.errorHint) ? void 0 : a.length) > 0 || !l.item.required ? t.value = "当前".concat(o.value.length, "字") : t.value = ""
        }
        ), 90);
        return (a, l) => (v(),
        E(Sa, {
            class: "text",
            item: e.item
        }, {
            content: j(( () => [s(Ce, {
                class: g(["textarea", i.value]),
                style: {
                    overflow: ""
                },
                rows: 3,
                minHeight: 18,
                placeholder: "更多反馈意见...",
                modelValue: o.value,
                "onUpdate:modelValue": l[0] || (l[0] = e => o.value = e),
                onBlur: n,
                onInput: l[1] || (l[1] = e => (o.value,
                r())),
                disabled: e.item.disabled
            }, null, 8, ["class", "modelValue", "disabled"]), e.item.limitText ? (v(),
            p("div", ja, [m("span", null, y(t.value), 1)])) : b("", !0)])),
            _: 1
        }, 8, ["item"]))
    }
}
  , Ma = {
    key: 0,
    class: "hint"
}
  , za = ["onClick"]
  , Ha = {
    class: "option-text"
}
  , Fa = {
    __name: "SelectNps",
    props: ["item"],
    setup(e) {
        const t = () => {
            Ee.emit("onBlur", n.item)
        }
          , n = e
          , l = O(n.item, "value")
          , o = O(n.item, "extra")
          , r = a(n.item.value.split(","))
          , c = u(( () => "单选2" === n.item.typ))
          , d = u(( () => n.item.options_list || []))
          , _ = u(( () => r.value.find((e => "其他" === e))))
          , A = M(( () => {
            t()
        }
        ), 90)
          , x = () => {
            void 0 === o.value && (o.value = ""),
            Ee.emit("onBlur", n.item)
        }
          , w = e => {
            r.value = S(r.value),
            l.value = r.value.join(","),
            "其他" === e.label && (o.value = void 0,
            z(( () => {
                var e;
                null == (e = document.getElementById("extra_" + n.item.id)) || e.focus()
            }
            ))),
            Ee.emit("onHidden"),
            t()
        }
          , S = e => e ? e.filter((e => "" !== e.value && d.value.find((t => t.value === e)))) : []
          , I = e => r.value.indexOf(e.value) >= 0;
        return i(( () => {
            r.value = S(r.value)
        }
        )),
        (t, a) => (v(),
        E(Sa, {
            class: "sform-select select2",
            item: e.item
        }, {
            content: j(( () => {
                return [0 === d.value.length ? (v(),
                p("div", Ma, "暂时可用选项")) : (v(),
                p(f, {
                    key: 1
                }, [(v(!0),
                p(f, null, h(d.value, ( (e, t) => {
                    return v(),
                    p("div", {
                        class: g(["option", (a = e,
                        "其他" === a.label ? _.value ? "border success" : "border bgStyle" : r.value.find((e => e === a.value)) ? "border success" : "border bgStyle"), "v-row", I(e) ? "selected" : ""]),
                        key: t,
                        onClick: t => (e => {
                            const t = r.value.indexOf(e.value);
                            if (t >= 0) {
                                if (c.value)
                                    return;
                                return r.value.splice(t, 1),
                                void w(e)
                            }
                            c.value ? r.value = [e.value] : r.value = [...r.value, e.value],
                            w(e)
                        }
                        )(e)
                    }, [m("div", Ha, y(e.label), 1)], 10, za);
                    var a
                }
                )), 128)), e.item.hasExtra && _.value ? (v(),
                p("div", {
                    key: 0,
                    class: "textareaEl",
                    onClick: a[2] || (a[2] = k(( () => {}
                    ), ["stop"]))
                }, [s(Ce, {
                    id: "extra_" + e.item.id,
                    class: g(["textarea", (null == (t = o.value) ? void 0 : t.length) > 0 ? "border success" : 0 === (null == (n = o.value) ? void 0 : n.length) ? "border error bgStyle" : "border bgStyle"]),
                    rows: 3,
                    minHeight: 18,
                    modelValue: o.value,
                    "onUpdate:modelValue": a[0] || (a[0] = e => o.value = e),
                    placeholder: "请输入其他信息...",
                    onBlur: x,
                    onInput: a[1] || (a[1] = e => (l.value,
                    A()))
                }, null, 8, ["id", "class", "modelValue"])])) : b("", !0)], 64))];
                var t, n
            }
            )),
            _: 1
        }, 8, ["item"]))
    }
}
  , La = {
    class: "form-list"
}
  , Ra = {
    class: "submit-wrapper"
}
  , Pa = ["template"]
  , qa = {
    class: "subscribe-btn",
    id: "subscribe-btn",
    style: {
        display: "flex",
        "justify-content": "center",
        position: "relative",
        "align-items": "center",
        "background-color": "#36a590",
        border: "none",
        padding: "0",
        color: "white",
        "line-height": "18px",
        "font-size": "16px",
        "font-weight": "500"
    }
}
  , Ua = {
    class: "submit-wrapper"
}
  , Na = {
    key: 1,
    class: "submit disabled"
}
  , Va = {
    __name: "nps",
    props: {
        menu: Array,
        data: Object,
        submitText: String,
        draft: String,
        navbar: Boolean,
        hasScroll: Boolean,
        options: Object,
        disabled: Boolean,
        type: String,
        notLimit: Boolean,
        templateId: String,
        from: Object
    },
    emits: ["submit"],
    setup(e, {expose: t, emit: l}) {
        const o = e
          , c = l
          , d = a(!1)
          , x = u(( () => H.value && o.templateId && F))
          , w = a(!1);
        n(H, ( () => {
            V()
        }
        ));
        const S = a();
        let I, C = a(o.data), O = L + o.draft;
        try {
            C.value || (C.value = JSON.parse(R.getItem(O)))
        } catch (D) {}
        const B = new Ie(o.menu || [],C.value,o.options);
        B.hiddenField(),
        Ee.on("onHidden", ( () => {
            B.hiddenField()
        }
        )),
        Ee.on("onBlur", (e => {
            var t;
            "评分" === e.typ ? w.value = (null == (t = e.value) ? void 0 : t.length) > 0 : w.value = !0,
            B.validate(e)
        }
        )),
        Ee.on("onPicker", (e => {
            d.value = e
        }
        ));
        const M = () => {
            T.showToast({
                title: o.disabled
            })
        }
          , z = () => {
            var e, t, a, n, l, o;
            let i;
            try {
                i = B.submitForm(!1)
            } catch (D) {
                N.logReport({
                    name: "error_field_validate",
                    dataset: {
                        from: "data",
                        value: String(D)
                    }
                }),
                (null == (e = D.cause) ? void 0 : e.title) ? T.showToast({
                    title: "请校验: ".concat((null == (a = null == (t = D.cause) ? void 0 : t.title) ? void 0 : a.length) >= 16 ? (null == (n = D.cause) ? void 0 : n.title.slice(0, 16)) + "..." : null == (l = D.cause) ? void 0 : l.title)
                }) : T.showToast({
                    title: "发生错误 ".concat(D)
                });
                const r = document.getElementById("field_".concat(null == (o = D.cause) ? void 0 : o.id));
                return void (r && r.scrollIntoView())
            }
            try {
                c("submit", i),
                N.logReport({
                    name: "submit_activity_project",
                    dataset: i
                }),
                R.removeItem(O)
            } catch (D) {
                N.logReport({
                    name: "error_field_validate",
                    dataset: {
                        from: "emits",
                        value: String(D)
                    }
                }),
                T.showToast({
                    title: "发生错误 ".concat(D)
                })
            }
        }
          , V = () => {
            if (H.value,
            H.value && o.templateId && F) {
                const e = document.getElementById("subscribeBtn")
                  , t = document.getElementById("subscribe-btn")
                  , a = window.innerWidth / 1.119433
                  , n = a / 6.98;
                e.style.borderRadius = t.style.borderRadius = "0.35333rem",
                e.style.width = t.style.width = "".concat(a, "px"),
                e.style.height = t.style.height = "".concat(n, "px"),
                e.addEventListener("success", (function(e) {
                    e.detail,
                    z()
                }
                )),
                e.addEventListener("error", (function(e) {
                    e.detail,
                    z()
                }
                ))
            }
        }
        ;
        return t({
            getData: () => B.submitForm(!1),
            setRule: (e, t) => {
                S.value.setRule(e, t)
            }
        }),
        i(( () => {
            setTimeout(( () => {
                const e = Array.from(document.querySelectorAll(".s-form .desc span[data-event]") || []);
                for (let a of e)
                    a.onclick = () => {
                        S.value.togglePicker(!0, a.dataset.event)
                    }
                    ;
                const t = Array.from(document.querySelectorAll(".s-form .desc span[data-href]") || []);
                if (t)
                    for (let a of t)
                        a.onclick = () => {
                            S.value.togglePicker(!0, a.dataset.href, !0)
                        }
            }
            ), 100),
            o.draft && (I = setInterval(( () => {
                R.setItem(O, JSON.stringify(B.submitForm(!1)))
            }
            ), 2e3)),
            V()
        }
        )),
        r(( () => {
            clearInterval(I)
        }
        )),
        (t, a) => (v(),
        p("div", {
            class: g(["s-form", "v-no-scrollbar", A(_) ? "mobile" : "vc-pc", e.navbar ? "navbar" : "", e.hasScroll ? "hasScroll" : "", d.value ? "disableScroll" : ""])
        }, [m("div", La, [(v(!0),
        p(f, null, h(A(B).list.value, (e => (v(),
        p(f, {
            key: e.id
        }, [e.shouldHidden || e.hidden ? (v(),
        p(f, {
            key: 0
        }, [], 64)) : "标题栏" === e.typ ? (v(),
        E(_a, {
            key: 1,
            item: e
        }, null, 8, ["item"])) : "评分" === e.typ ? (v(),
        E(Oa, {
            key: 2,
            item: e
        }, null, 8, ["item"])) : "文本" === e.typ || "手机号" === e.typ ? (v(),
        E(Ba, {
            key: 3,
            item: e
        }, null, 8, ["item"])) : ["单选", "多选", "单选2", "多选2"].includes(e.typ) ? (v(),
        E(Fa, {
            key: 4,
            item: e
        }, null, 8, ["item"])) : b("", !0)], 64)))), 128)), e.disabled ? (v(),
        p("div", {
            key: 0,
            class: "disabled-wrapper",
            onClick: k(M, ["stop"])
        })) : b("", !0)]), P(m("div", Ra, [m("wx-open-subscribe", {
            template: e.templateId,
            id: "subscribeBtn"
        }, [(v(),
        E(U("script"), {
            type: "text/wxtag-template"
        }, {
            default: j(( () => [m("button", qa, y(e.submitText || "提交表单"), 1)])),
            _: 1
        }))], 8, Pa)], 512), [[q, !e.disabled && x.value]]), P(m("div", Ua, [w.value ? (v(),
        p("div", {
            key: 0,
            class: "submit undisabled",
            onClick: z
        }, y(e.submitText || "提交表单"), 1)) : (v(),
        p("div", Na, y(e.submitText || "提交表单"), 1))], 512), [[q, !e.disabled && !x.value]]), s(Te, {
            ref_key: "eventEL",
            ref: S
        }, null, 512)], 2))
    }
}
  , Da = {
    key: 0,
    class: "modalOut"
}
  , Ka = {
    class: "modalIner"
}
  , Wa = {
    class: "header"
}
  , Ya = {
    class: "container form-box"
}
  , Qa = {
    key: 0,
    class: "vc-pc v-column-center"
}
  , Ga = {
    class: "box-wrapper"
}
  , Ja = {
    class: "header"
}
  , Xa = d({
    __name: "index",
    props: ["showNps", "dataSet", "formID"],
    emits: ["togglePicker", "submitNpsForm"],
    setup(e, {emit: t}) {
        const l = a("")
          , o = a()
          , i = a([])
          , r = a([])
          , u = e
          , c = t;
        V.get("/form/".concat(u.formID)).then((e => {
            var t, a, n, o, r;
            l.value = null != (t = null == e ? void 0 : e.data) ? t : {},
            (null == (n = null == (a = e.form) ? void 0 : a.setting) ? void 0 : n.items) && (i.value = (null == (r = null == (o = e.form) ? void 0 : o.setting) ? void 0 : r.items) || [])
        }
        ));
        const d = async e => {
            N.logReport({
                name: "btn_nps_submit",
                dataset: e
            }),
            u.dataSet && Object.values(u.dataSet).forEach(( (t, a) => {
                t && (e["from".concat(a)] = t)
            }
            ));
            try {
                await we.submitSetting(e, u.formID),
                h(!1),
                T.showToast({
                    title: "提交成功",
                    duration: 700
                })
            } catch (t) {
                if (-313 === t.status)
                    return void T.showErrorToast({
                        title: t.message
                    });
                Se.show({
                    title: "提交表单出错",
                    content: t.message,
                    contentArray: [{
                        title: t.message
                    }]
                })
            }
        }
        ;
        n(( () => u.showNps), ( () => {
            u.showNps && V.post("/log/put", {
                event: "nps_show",
                event_key: u.formID
            })
        }
        ));
        const h = e => c("togglePicker", e);
        return (t, a) => {
            var n, l;
            return v(),
            p("div", null, [A(_) ? (v(),
            p(f, {
                key: 0
            }, [(null == (n = i.value) ? void 0 : n.length) > 0 ? (v(),
            p("div", Da, [a[2] || (a[2] = m("div", {
                class: "maskOut"
            }, null, -1)), m("div", Ka, [m("div", Wa, [m("img", {
                src: Ae,
                alt: "",
                onClick: a[0] || (a[0] = e => h(!1))
            })]), m("div", Ya, [s(Va, {
                ref_key: "formEL",
                ref: o,
                menu: i.value,
                submitText: "确认提交",
                data: r.value,
                from: e.dataSet,
                onSubmit: d
            }, null, 8, ["menu", "data", "from"])])])])) : b("", !0)], 64)) : (v(),
            p(f, {
                key: 1
            }, [(null == (l = i.value) ? void 0 : l.length) > 0 ? (v(),
            p("div", Qa, [m("div", Ga, [m("div", Ja, [m("img", {
                src: xe,
                alt: "",
                onClick: a[1] || (a[1] = e => h(!1))
            })]), s(Va, {
                ref_key: "formEL",
                ref: o,
                menu: i.value,
                submitText: "确认提交",
                data: r.value,
                from: e.dataSet,
                onSubmit: d
            }, null, 8, ["menu", "data", "from"])])])) : b("", !0)], 64))])
        }
    }
}, [["__scopeId", "data-v-fbef9f4a"]]);
const Za = {
    class: "container"
}
  , $a = {
    key: 0,
    class: "vc-warning"
}
  , en = {
    key: 1
}
  , tn = {
    key: 0,
    class: "container-catalogue"
}
  , an = {
    key: 1,
    class: "title-Head-wrapper"
}
  , nn = {
    class: "box-wrapper"
}
  , ln = {
    class: "search"
}
  , on = ["placeholder"]
  , rn = {
    class: "word"
}
  , sn = {
    key: 0
}
  , un = {
    key: 1
}
  , cn = {
    class: "container-sidber mobile"
}
  , dn = {
    __name: "index",
    setup(e) {
        const t = ee();
        let l = D({
            node: []
        });
        const o = a("");
        let i = a([]);
        const c = a([]);
        let d = a("")
          , f = a("");
        const h = a(!1)
          , k = u(( () => !_))
          , x = oe.enc.Utf8.parse("LJg0DdPiCGYyq9h4")
          , w = a("");
        re.value = t.params.id || t.query.token;
        V.get("/docx/".concat(re.value, "/info")).then((e => {
            K.get("https://search01.shengcaiyoushu.com/upload/doc/".concat(re.value, "/").concat(re.value, ".json?v=").concat(e.version)).then((async a => {
                let n = oe.AES.decrypt(a.data, x, {
                    iv: x,
                    mode: oe.mode.CBC,
                    padding: oe.pad.Pkcs7
                })
                  , o = W(n)
                  , r = Ke.decompress(o)
                  , s = Y(r)
                  , u = JSON.parse(s);
                setTimeout(( () => {
                    Q.setShareSettings({
                        title: u.title,
                        desc: "生财有术，一个谈钱不伤感情的社群"
                    })
                }
                ), 1e3);
                var c = 0
                  , d = "";
                if (u.page.node.forEach((e => {
                    if (e.block_type >= 3 && e.block_type <= 11)
                        return d = "",
                        void (c = 0);
                    if (13 === e.block_type) {
                        const t = e.ordered.elements[0];
                        if (t && t.text_run) {
                            const a = t.text_run.text_element_style
                              , n = "".concat(a.bold).concat(a.bulletlist);
                            d === n ? c += 1 : c = 1,
                            d = n,
                            e.index = c
                        }
                    }
                }
                )),
                l.value = u.page,
                l.value.node,
                i.value = (e => (e.forEach(( (t, a) => {
                    if (t.block_type >= 3 && t.block_type <= 11)
                        for (let n = a - 1; n >= 0; n--)
                            if (e[n].block_type < t.block_type) {
                                t.parent_id = e[n].block_id;
                                break
                            }
                }
                )),
                e))(u.header) || [],
                w.value = (null == u ? void 0 : u.type) || "",
                "航海手册" === w.value && Fe(),
                se.value = u.dup_block || [],
                ue.value = u.version,
                ge.value = u.user || [],
                de.value.type = (null == u ? void 0 : u.type) || "",
                de.value.header_title = (null == u ? void 0 : u.header_title) || "",
                document.title = (null == u ? void 0 : u.title) || "",
                (null == u ? void 0 : u.type) && (null == u ? void 0 : u.header_title) && (l.value.node = [{
                    type: null == u ? void 0 : u.type,
                    header_title: null == u ? void 0 : u.header_title,
                    block_id: "".concat(l.value.block_id, "_docx")
                }, ...l.value.node]),
                i.value.length > 0 && (i.value[0].curr = !0),
                null == e ? void 0 : e.user) {
                    const {name: a, xq_group_number: n, union_user_id: l} = e.user;
                    ye.setWaterMark({
                        w_texts: [n ? "生财有术会员" : "生财有术微信用户", "".concat(a, " ").concat(n || l)],
                        w_options: {
                            w_width: 360,
                            w_rotateDeg: 25,
                            w_font: "16px Vedana",
                            w_color: "#666",
                            w_opacity: "0.1",
                            w_zIndex: "100000"
                        }
                    }),
                    N.logReport({
                        name: "page_show",
                        dataset: {
                            userInfo: {
                                ...e.user,
                                number: n
                            },
                            value: t.path,
                            query: t.query
                        }
                    }),
                    new G("timing_docx",re.value,( () => (i.value.findIndex((e => e.curr)) / i.value.length * 100).toFixed(2)),{
                        ...e.user,
                        number: n
                    })
                }
                z((async () => {
                    if (window.location.hash.length > 0) {
                        const e = window.location.hash.split("#")[1];
                        B({
                            position: e
                        })
                    }
                }
                ))
            }
            ))
        }
        )).catch((e => {
            o.value = e.message
        }
        ));
        const S = a(null)
          , I = a(20);
        window.innerHeight / 60 > 10 && (I.value = Math.floor(window.innerHeight / 60 * 2.5));
        const C = () => {
            var e;
            const t = document.querySelector(".wrap").offsetWidth
              , a = document.createElement("div");
            a.style.position = "absolute",
            a.style.visibility = "hidden",
            a.style.width = "0",
            a.style.height = "0",
            document.body.appendChild(a);
            for (const n of l.value.node) {
                let l = 0;
                if (27 === n.block_type) {
                    const {width: e, height: a} = n.image
                      , o = parseInt(e) < parseInt(a) ? e / 2.4 : t;
                    l = Math.round(a / e * o)
                } else if (24 === n.block_type)
                    n.node.forEach((e => {
                        const a = t * e.grid_column.width_ratio / 100;
                        e.node.forEach((e => {
                            if (e.image) {
                                const {width: t, height: n} = e.image
                                  , o = Math.round(n / t * a);
                                l = Math.max(l, o)
                            }
                        }
                        ))
                    }
                    ));
                else {
                    a.innerHTML = "";
                    const o = document.createElement("div");
                    o.style.width = "".concat(t, "px"),
                    a.appendChild(o),
                    te(ae(fa, {
                        source: n
                    }), o),
                    l = (null == (e = o.firstChild) ? void 0 : e.offsetHeight) || 0
                }
                l && S.value.getVirtual().saveSize(n.block_id, l)
            }
        }
          , O = e => {
            c.value = e.isExpanded ? c.value.filter((t => t !== e.block_id)) : [...c.value, e.block_id];
            const t = (e => {
                const t = i.value.findIndex((t => t.block_id === e));
                if (-1 === t)
                    return null;
                for (let a = t - 1; a >= 0; a--)
                    if (i.value[a].block_id === i.value[t].parent_id)
                        return i.value[a];
                return null
            }
            )(f.value);
            e.block_id === (null == t ? void 0 : t.parent_id) && i.value.forEach((t => {
                t.curr = t.block_id === e.block_id
            }
            )),
            t && e.block_id === t.block_id && i.value.forEach((e => {
                e.curr = e.block_id === t.block_id
            }
            )),
            e.isExpanded && i.value.forEach((e => {
                e.curr = e.block_id === f.value
            }
            ))
        }
          , B = ({position: e, id: t}) => {
            let a = l.value.children.findIndex((t => t === e));
            if (d.value = e,
            l.value.block_id === e && (a = 0),
            !(a < 0)) {
                if (t) {
                    let e = document.querySelector("em.curr");
                    e && (e.className = "",
                    e.style.backgroundColor = "#f8e6ab");
                    const a = document.getElementById(t);
                    a && (a.className = "curr",
                    a.style.backgroundColor = "rgba(245,74,69,0.5)")
                }
                window.location.hash = e,
                H(a),
                h.value = !1
            }
        }
          , H = e => {
            let t = 0;
            const a = setInterval((async () => {
                S.value.scrollToIndex(e),
                t++,
                await z();
                const n = S.value.getOffset()
                  , l = document.querySelector('[index="'.concat(e, '"]'));
                if (l) {
                    const e = l.offsetTop
                      , o = 50;
                    (Math.abs(n - e) <= o || t >= 10) && clearInterval(a)
                } else
                    t >= 10 && clearInterval(a)
            }
            ), 100)
        }
        ;
        ce.on("goArticle", B);
        let F = ["查找"];
        const L = a(0)
          , R = a("")
          , U = a("")
          , ve = a([])
          , pe = a(1)
          , me = a("在文档内查找")
          , fe = e => {
            void 0 === e && (e = R.value),
            e === U.value || (R.value = e,
            ke({
                data: l.value,
                restore: !0
            }),
            ve.value = ke({
                data: l.value
            }),
            pe.value = 1,
            U.value = e),
            z(( () => {
                const e = ve.value[pe.value - 1];
                e && B(e)
            }
            ))
        }
          , he = () => {
            0 !== R.value.length && (pe.value > ve.value.length - 1 || (pe.value += 1,
            fe()))
        }
          , be = () => {
            0 !== R.value.length && 1 !== pe.value && (pe.value -= 1,
            B(ve.value[pe.value - 1]))
        }
          , ke = ({data: e, parent: t, restore: a}) => {
            var n, l;
            let o = []
              , i = R.value.toLowerCase();
            if (a && (i = U.value.toLowerCase()),
            0 === i.length)
                return [];
            if (e.node)
                return null == (n = null == e ? void 0 : e.node) || n.forEach((n => {
                    let l = t || e.block_id;
                    e.page && (l = void 0),
                    o.push(...ke({
                        data: n,
                        parent: l,
                        restore: a
                    }))
                }
                )),
                o;
            let r = (e.page || e.text || e.ordered || e.bullet || e[e.heading] || {}).elements;
            if (!r)
                return [];
            for (let s of r) {
                let n = null == (l = null == s ? void 0 : s.text_run) ? void 0 : l.content;
                n && (n.toLowerCase().includes(i) && (a ? s.text_run.content = s.text_run.raw : (s.text_run.raw || (s.text_run.raw = s.text_run.content),
                s.text_run.content = n.toLowerCase().replaceAll(i, ( (a, l) => (o.push({
                    position: t || e.block_id,
                    id: "".concat(e.block_id, "_").concat(l)
                }),
                '<em id="'.concat(e.block_id, "_").concat(l, '">').concat(n.slice(l, l + i.length), "</em>")))))))
            }
            return o
        }
          , Ae = M(fe, 300);
        n(R, (e => {
            Ae(e)
        }
        ));
        const xe = a(null)
          , we = a(!1)
          , Se = () => we.value = !0
          , Ee = e => {
            we.value = e,
            e ? z(( () => {
                xe.value.focus()
            }
            )) : fe("")
        }
        ;
        document.addEventListener("keydown", (e => {
            const t = e.keyCode || e.which || e.charCode;
            70 === t && (e.metaKey || e.ctrlKey) && (Ee(!0),
            e.preventDefault()),
            27 === t && (Ee(!1),
            e.preventDefault())
        }
        )),
        document.oncontextmenu = function() {
            return !1
        }
        ,
        document.oncopy = function() {
            return T.showToast({
                title: "管理员已禁止复制"
            }),
            !1
        }
        ,
        document.oncut = function() {
            return T.showToast({
                title: "管理员已禁止复制"
            }),
            !1
        }
        ;
        const Ie = ne(( () => {
            if (!S.value && 0 === i.value.length)
                return;
            let e, t = S.value.getOffset(), a = [];
            for (a = k.value ? Array.from(document.querySelectorAll(".docx-page  > .wrap > div > .block-wrapper")) : Array.from(document.querySelectorAll(".docx-mobile  > .wrap > div > .block-wrapper")),
            e = 0; e < a.length; e++) {
                const n = a[e];
                if (n.offsetTop + n.clientHeight - t >= 0)
                    break
            }
            e > 0 && (e -= 1);
            let n = i.value[0].block_id;
            for (let i = l.value.children.findIndex((t => {
                var n;
                return t === (null == (n = a[e]) ? void 0 : n.id)
            }
            )); i >= 0; i--) {
                const e = l.value.node[i];
                if (e.block_type >= 3 && e.block_type <= 11) {
                    n = e.block_id;
                    break
                }
            }
            d.value && (n = d.value);
            const o = i.value.find((e => e.block_id === n));
            if (c.value.length > 0 && o) {
                const e = i.value.filter((e => c.value.includes(e.block_id)));
                let t = o;
                for (; t; )
                    e.some((e => t.parent_id === e.block_id)) && (n = t.parent_id),
                    t = i.value.find((e => e.block_id === t.parent_id))
            }
            let r;
            if (i.value.forEach((e => {
                e.curr && (r = e.block_id !== n),
                e.curr = e.block_id === n
            }
            )),
            f.value = n,
            r) {
                const e = document.querySelector(".scrollbar-container")
                  , t = document.getElementById("header_".concat(n));
                e && t && e.scrollTo({
                    top: t.offsetTop - 120,
                    behavior: "smooth"
                }),
                d.value = ""
            }
        }
        ), 300)
          , Te = () => h.value = !1
          , Ce = () => {
            h.value = !0,
            we.value = !1,
            setTimeout(( () => {
                const e = document.getElementById("header_".concat(f.value))
                  , t = document.querySelector(".scrollbar-container");
                _ && e && t && z(( () => {
                    t.scrollTo({
                        top: e.offsetTop - 120,
                        behavior: "smooth"
                    })
                }
                ))
            }
            ), 300)
        }
          , Oe = a(!1)
          , je = a(!1)
          , Be = a("")
          , Me = a("")
          , ze = e => Oe.value = e;
        ce.on("previewVideo", ( ({url: e, poster: t}) => {
            Oe.value = !0,
            je.value,
            ue.value,
            je.value = e.indexOf("upload/video") > 0,
            Be.value = e,
            Me.value = t
        }
        ));
        const {showNps: He, checkNPS: Fe, modalRightNowCloseIntervalTime: Le, modalSubmitFormIntervalTime: Re} = function(e, t, n, l) {
            const o = a(!1)
              , i = a(null)
              , s = a()
              , u = "nps_read_time_".concat(e)
              , c = 6e4 * t
              , d = () => {
                var e;
                const t = null != (e = localStorage.getItem(u)) ? e : "{}";
                return JSON.parse(t)
            }
              , v = a(d());
            return r(( () => {
                clearInterval(s.value),
                s.value = ""
            }
            )),
            {
                checkNPS: () => {
                    V.post("/log/check", {
                        type: "nps",
                        id: e
                    }).then((e => {
                        e && (e.is_limit || (s.value = setTimeout(( () => {
                            o.value = !e.is_limit
                        }
                        ), c)))
                    }
                    ))
                }
                ,
                showNps: o,
                modalSubmitFormIntervalTime: e => {
                    if (e) {
                        i.value = l;
                        const e = d();
                        e.time = (new Date).getTime() + 86400 * i.value,
                        localStorage.setItem(u, JSON.stringify(e)),
                        v.value = e
                    }
                }
                ,
                modalRightNowCloseIntervalTime: e => {
                    e || (o.value = e)
                }
            }
        }("Fe2VFe6e", 5, 0, 30);
        return (e, t) => (v(),
        p("div", Za, [o.value ? (v(),
        p("div", $a, [t[4] || (t[4] = m("img", {
            src: "https://search01.shengcaiyoushu.com/test/assets/401-CkydlSwN.png",
            alt: "401"
        }, null, -1)), m("div", null, y(o.value), 1)])) : (v(),
        p("div", en, [m("div", {
            class: g(["contentMain", A(_) ? "v-column-center" : ""])
        }, [k.value & A(i).length > 0 ? (v(),
        p("div", tn, [s(St, {
            header: A(i),
            onGoArticle: B,
            onToggleExpandHandle: O
        }, null, 8, ["header"])])) : b("", !0), k.value || o.value ? b("", !0) : (v(),
        p("div", an, [s(ie, null, {
            default: j(( () => [m("div", {
                class: "title-Head"
            }, [m("div", {
                class: "tab-Heads"
            }, [t[5] || (t[5] = m("div", {
                class: "tr"
            }, null, -1)), t[6] || (t[6] = m("div", {
                class: "v-spacer"
            }, null, -1)), m("img", {
                class: "nav-search",
                onClick: Se,
                src: le,
                alt: ""
            }), m("img", {
                src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAAC3RSTlMA2aOVDV8oG21sDgwMOKYAAABJSURBVEjHYxgFo4AUwNKshBWoOiApYhbEARSQFCXiUiSOpKgQlyIxJEVMuBQZICniCsLucEsHhlEwHMBoyhwFgxOMpsxRMMIBAAbHLeh6zQ22AAAAAElFTkSuQmCC",
                alt: "",
                onClick: Ce,
                class: "banner"
            })])])])),
            _: 1
        })])), A(l).node.length > 0 ? (v(),
        E(A(pt), {
            key: 2,
            ref_key: "scroller",
            ref: S,
            "calc-size": C,
            class: g([k.value ? "docx-page" : "docx-mobile v-no-scrollbar"]),
            "data-key": "block_id",
            "data-sources": A(l).node,
            "data-component": fa,
            "estimate-size": 44,
            keeps: I.value,
            onScroll: A(Ie)
        }, null, 8, ["class", "data-sources", "keeps", "onScroll"])) : b("", !0), (v(),
        E(Z, {
            to: "#app"
        }, [s(ie, null, {
            default: j(( () => {
                var e, a, n;
                return [we.value ? (v(),
                p("div", {
                    key: 0,
                    class: g([k.value ? "draggable-wrapper" : "draggable-wrapper-mobile"])
                }, [m("div", nn, [s(gt, {
                    tabs: A(F),
                    tabIndex: L.value,
                    "onUpdate:tabIndex": t[0] || (t[0] = e => L.value = e)
                }, null, 8, ["tabs", "tabIndex"]), m("div", ln, [P(m("input", {
                    ref_key: "searchInput",
                    ref: xe,
                    placeholder: me.value,
                    "onUpdate:modelValue": t[1] || (t[1] = e => R.value = e),
                    onKeyup: X(he, ["enter"])
                }, null, 40, on), [[J, R.value]]), m("div", rn, [(null == (e = R.value) ? void 0 : e.length) > 0 ? (v(),
                p("span", sn, y(pe.value), 1)) : (v(),
                p("span", un, "0")), t[7] || (t[7] = m("span", null, "/", -1)), m("span", null, y(ve.value.length), 1)])]), m("div", {
                    class: g(["button", {
                        disable: 0 === (null == (a = R.value) ? void 0 : a.length)
                    }])
                }, [m("div", {
                    class: g(["previous", {
                        disable: pe.value <= 1
                    }]),
                    onClick: be
                }, t[8] || (t[8] = [m("span", null, "上一处", -1)]), 2), m("div", {
                    class: g(["next", {
                        disable: pe.value >= (null == (n = ve.value) ? void 0 : n.length)
                    }]),
                    onClick: he
                }, t[9] || (t[9] = [m("span", null, "下一处", -1)]), 2)], 2), m("img", {
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4BAMAAABaqCYtAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMAQBgoEiDWPGfrAAAAhklEQVQ4y+3TsQ2AMAwEwAiJARygDyMgsQBiAdh/GSrz1rv4NkVcITtHwHHKiI5jPvF8Nyru9mcm26h4WMW6hYqXWXNoK/Keqg6N9kQOq4gSJEqQKWCmAWYaYKYBZgqYKaAoqtfqD9K/gibo9unG6yPjw9ZjogdMj+Ybh7rynvE6PGVEv/EBEqEP8cEGcjkAAAAASUVORK5CYII=",
                    alt: "",
                    class: "delete",
                    onClick: t[2] || (t[2] = e => Ee(!1))
                })])], 2)) : b("", !0)]
            }
            )),
            _: 1
        })]))], 2)])), !k.value && h.value ? (v(),
        p("div", {
            key: 2,
            class: "bg-sidber",
            onClick: Te
        })) : b("", !0), P(m("div", cn, [s(Mt, {
            header: A(i),
            onGoArticle: B,
            onToggleExpandHandle: O,
            onCloseShowListMoblie: Te
        }, null, 8, ["header"])], 512), [[q, !k.value && h.value]]), Oe.value ? (v(),
        E(_e, {
            key: 3,
            url: Be.value,
            m3u8: je.value,
            poster: Me.value,
            onOnClose: ze
        }, null, 8, ["url", "m3u8", "poster"])) : b("", !0), "航海手册" === w.value ? P((v(),
        E(Xa, {
            key: 4,
            showNps: A(He),
            "onUpdate:showNps": t[3] || (t[3] = e => $(He) ? He.value = e : null),
            formID: "Fe2VFe6e",
            dataSet: {
                from0: A(l).block_id
            },
            onTogglePicker: A(Le),
            onSubmitNpsForm: A(Re)
        }, null, 8, ["showNps", "dataSet", "onTogglePicker", "onSubmitNpsForm"])), [[q, A(He)]]) : b("", !0)]))
    }
};
export {dn as default};
