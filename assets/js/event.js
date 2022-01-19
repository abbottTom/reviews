function TBtimeConverter(e) {
    var t = new Date(1e3 * e),
        r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        a = t.getFullYear(),
        n = r[t.getMonth()],
        i = t.getDate(),
        s = (t.getHours(),
            t.getMinutes(),
        n + " " + i + ", " + a);
    return s
}

// (window, document, tbConfig);
!function (e, t, tbConfig, a) {
    "use strict";
    e.tbEvents = {},
        tbEvents.init = function () {
            tbEvents.setTbSessionId(),
                tbEvents.eventsTracking()
        };
    var n = tbConfig.pageUrl || null,
        i = "v1";
    tbEvents.apiUrl = tbConfig.apiPath + "/api/" + i,
        tbEvents.webhookUrl = tbEvents.apiUrl + "/webhooks/";
    var s = "/magento/";
    tbEvents.publicUrl = tbEvents.apiUrl + s;
    var o;
    if (tbConfig.publicKey !== a)
        o = tbConfig.publicKey;
    else {
        var l = "_a=" + tbConfig.apiToken + "&_i=" + tbConfig.apiKey;
        o = e.btoa(l)
    }
    tbEvents.pubKey = "_t=" + o;
    var d = tbEvents.publicUrl + "new-point?_t=" + o;
    // platform: 'wc'
    "wc" === tbConfig.platform ? s = "/woo/" : "uc" === tbConfig.platform && (s = "/ubercart/"),
        tbEvents.publicUrl = tbEvents.apiUrl + s;
    var g;
    g = tbConfig.pageUrl.indexOf("targetbay.com") !== -1 ? tbConfig.pageUrl : tbEvents.publicUrl + tbConfig.pageUrl + "?_t=" + o;
    var b = tbConfig.pageData || null;
    if (null === b) {
        tbConfig.pageVisiturl = t.title;
        var m = "",
            c = "",
            u = "",
            y = "";
        "" !== tbConfig.productUrl && null !== tbConfig.productUrl || (tbConfig.productUrl = e.location.href),
        tbConfig.utmSources !== a && (m = tbConfig.utmSources),
        tbConfig.utmToken !== a && (c = tbConfig.utmToken),
        tbConfig.category !== a && (tbConfig.category.id !== a && (u = tbConfig.category.id),
        tbConfig.category.name !== a && (y = tbConfig.category.name)),
            b = JSON.stringify({
                user_name: tbConfig.userName,
                user_mail: tbConfig.userMail,
                session_id: tbConfig.userId,
                user_id: tbConfig.userId,
                product_id: tbConfig.productId,
                product_name: tbConfig.productName,
                page_url: tbConfig.productUrl,
                productimg: tbConfig.productImageUrl,
                page_title: tbConfig.pageVisiturl,
                category: "",
                category_id: u,
                category_name: y,
                utm_sources: m,
                utm_token: c,
                user_agent: e.navigator.userAgent
            })
    } else {
        var p = JSON.parse(tbConfig.pageData);
        "" != p && ("" !== p.page_title && null !== p.page_title && p.page_title != a || (p.page_title = t.title,
            b = JSON.stringify(p)))
    }
    var v = tbConfig.trackingType;
    if (tbConfig.tbMessage || tbConfig.tbRecommendations !== a && tbConfig.tbRecommendations) {
        var _, f = 6e4,
            E = 0,
            w = function () {
                E++,
                    tbEvents.sessionTracking(),
                    clearInterval(_),
                    4 === E ? f *= 2 : 8 === E ? f *= 1.5 : 12 === E && (f = 0,
                        clearInterval(w)),
                f > 0 && (_ = setInterval(w, f))
            };
        _ = setInterval(w, f)
    }
    tbEvents.getDt = function () {
        var e = new Date;
        return "&_tb=" + e.getTime()
    },
        tbEvents.sessionTracking = function () {
            var e = tbEvents.getCookie("user_loggedin"),
                t = tbEvents.getCookie("tb_fetch_points");
            t !== a && null !== t && "" !== t && "" === e && (e = tbEvents.getCookieDecode("tb_fetch_points", "_ulogin"));
            var r, n;
            "1" === v ? "1" == e ? (r = tbEvents.getCookie("trackingid"),
            t !== a && null !== t && "" !== t && "" === r && (r = tbEvents.getCookieDecode("tb_fetch_points", "_utid")),
                n = tbEvents.getCookie("afterlogin_session_id"),
            t !== a && null !== t && "" !== t && "" === n && (n = tbEvents.getCookieDecode("tb_fetch_points", "_uasid"))) : (r = tbEvents.getCookie("targetbay_session_id"),
            t !== a && null !== t && "" !== t && "" === r && (r = tbEvents.getCookieDecode("tb_fetch_points", "_usid")),
                n = tbEvents.getCookie("targetbay_session_id"),
            t !== a && null !== t && "" !== t && "" === n && (n = tbEvents.getCookieDecode("tb_fetch_points", "_usid"))) : (r = tbEvents.getCookie("trackingid"),
            t !== a && null !== t && "" !== t && "" === r && (r = tbEvents.getCookieDecode("tb_fetch_points", "_utid")),
                "1" == e ? (n = tbEvents.getCookie("afterlogin_session_id"),
                t !== a && null !== t && "" !== t && "" === n && (n = tbEvents.getCookieDecode("tb_fetch_points", "_uasid"))) : (n = tbEvents.getCookie("trackingsession"),
                t !== a && null !== t && "" !== t && "" === n && (n = tbEvents.getCookieDecode("tb_fetch_points", "_usid"))));
            var i = tbEvents.getBrowserWidth(),
                s = {
                    user_id: r,
                    device: i,
                    session_id: n
                },
                o = new XMLHttpRequest;
            o.open("POST", d + tbEvents.getDt()),
                o.setRequestHeader("Content-Type", "application/json"),
                o.onreadystatechange = function () {
                    4 === o.readyState && 200 === o.status && console.log("Data saved.")
                },
                o.send(JSON.stringify(s))
        },
        tbEvents.eventsTracking = function () {
            if ("1" === v && null !== b && null !== n) {
                var t = JSON.parse(b),
                    i = tbEvents.getCookie("user_loggedin"),
                    s = tbEvents.getCookie("tb_fetch_points");
                if (s !== a && null !== s && "" !== s && "" === i && (i = tbEvents.getCookieDecode("tb_fetch_points", "_ulogin")),
                t.user_agent !== a && null !== t.user_agent && (t.user_agent = e.navigator.userAgent),
                "1" == i)
                    t.user_id = tbEvents.getCookie("trackingid"),
                    s !== a && null !== s && "" !== s && "" === t.user_id && (t.user_id = tbEvents.getCookieDecode("tb_fetch_points", "_utid")),
                        t.user_name = tbEvents.getCookie("trackingname"),
                    s !== a && null !== s && "" !== s && "" === t.user_name && (t.user_name = tbEvents.getCookieDecode("tb_fetch_points", "_un")),
                        t.session_id = tbEvents.getCookie("afterlogin_session_id"),
                    s !== a && null !== s && "" !== s && "" === t.session_id && (t.session_id = tbEvents.getCookieDecode("tb_fetch_points", "_uasid"));
                else {
                    var o = tbEvents.getCookie("targetbay_session_id");
                    s !== a && null !== s && "" !== s && "" === o && (o = tbEvents.getCookieDecode("tb_fetch_points", "_usid")),
                        t.user_id = o,
                        t.session_id = o
                }
                var l = I();
                if ("" !== l) {
                    var d, m, c;
                    h() ? (localStorage.setItem("targetbay_utm_source", l.utm_source),
                        localStorage.setItem("targetbay_utm_token", l.utm_token),
                        localStorage.setItem("targetbay_utm_medium", l.utm_medium),
                        d = localStorage.getItem("targetbay_utm_source"),
                        m = localStorage.getItem("targetbay_utm_token"),
                        c = localStorage.getItem("targetbay_utm_medium")) : (tbEvents.setCookie("targetbay_utm_source", l.utm_source),
                        tbEvents.setCookie("targetbay_utm_token", l.utm_token),
                        tbEvents.setCookie("targetbay_utm_medium", l.utm_medium),
                        d = tbEvents.getCookie("targetbay_utm_source"),
                        m = tbEvents.getCookie("targetbay_utm_token"),
                        c = tbEvents.getCookie("targetbay_utm_medium")),
                        tbEvents.setCookie("utm_source", d),
                        tbEvents.setCookie("utm_token", m),
                        tbEvents.setCookie("utm_medium", c)
                }
                if (t.utm_sources = tbEvents.getCookie("utm_source"),
                    t.utm_token = tbEvents.getCookie("utm_token"),
                    t.utm_medium = tbEvents.getCookie("utm_medium"),
                tbConfig.tbMessage || tbConfig.tbRecommendations !== a && tbConfig.tbRecommendations) {
                    var u = new XMLHttpRequest;
                    u.open("POST", g + tbEvents.getDt()),
                        u.setRequestHeader("Content-Type", "application/json"),
                        u.onreadystatechange = function () {
                            4 === u.readyState && 200 === u.status && (tbEvents.updateFetchData("_uc", 1),
                                tbEvents.setCookie("userdata_created", 1),
                                console.log("Data saved."))
                        },
                        u.send(JSON.stringify(t))
                }
            } else
                "1" === v && null === n && (tbEvents.setCookie("userdata_created", 1),
                    tbEvents.updateFetchData("_uc", 1))
        },
        tbEvents.getBrowserWidth = function () {
            return e.innerWidth < 768 ? "Mobile" : e.innerWidth < 991 ? "Tablet" : (e.innerWidth < 1199,
                "Desktop")
        },
        tbEvents.getCookie = function (e) {
            for (var r = e + "=", a = t.cookie.split(";"), n = 0; n < a.length; n++) {
                for (var i = a[n];
                     " " === i.charAt(0);)
                    i = i.substring(1);
                if (0 === i.indexOf(r))
                    return i.substring(r.length, i.length)
            }
            return ""
        },
        tbEvents.setTbSessionId = function () {
            var e = tbEvents.getCookie("targetbay_session_id"),
                t = tbEvents.getCookie("tb_fetch_points");
            if (t !== a && null !== t && "" !== t && "" === e && (e = tbEvents.getCookieDecode("tb_fetch_points", "_usid")),
            "1" === v && ("" === e || e === a)) {
                var r, n;
                h() ? null === localStorage.getItem("targetbay_session_id") || "" === localStorage.getItem("targetbay_session_id") || "undefined" == typeof localStorage.getItem("targetbay_session_id") ? (n = Math.floor(9999999999 * Math.random() + 1),
                    localStorage.setItem("targetbay_session_id", n),
                    r = localStorage.getItem("targetbay_session_id"),
                    tbEvents.setCookie("targetbay_session_id", r),
                    tbEvents.insertFetchData(r)) : (r = localStorage.getItem("targetbay_session_id"),
                    tbEvents.setCookie("targetbay_session_id", r),
                    tbEvents.insertFetchData(r)) : null === e || "" === e ? (n = Math.floor(9999999999 * Math.random() + 1),
                    tbEvents.setCookie("targetbay_session_id", n),
                    tbEvents.insertFetchData(n)) : (r = tbEvents.getCookie("targetbay_session_id"),
                    tbEvents.setCookie("targetbay_session_id", r),
                    r = tbEvents.getCookieDecode("tb_fetch_points", "_usid"),
                    tbEvents.insertFetchData(r))
            }
        },
        tbEvents.setCookie = function (r, a) {
            var n = new Date,
                i = n.getTime();
            i += 2592e6,
                n.setTime(i),
                t.cookie = r + "=" + a + "; expires=" + n.toUTCString() + "; domain=." + e.location.hostname + ";path=/"
        },
        tbEvents.insertFetchData = function (e) {
            var t = "_uid=" + e + "&_utid=" + e + "&_usid=" + e + "&_un=" + tbConfig.userName + "&_uem=" + tbConfig.userMail + "&_ulogin=" + tbEvents.getCookieDecode("tb_fetch_points", "_ulogin") + "&_uc=1",
                a = tbEvents.b64EncodeUnicode(t);
            tbEvents.setCookie("tb_fetch_points", a)
        },
        tbEvents.updateFetchData = function (e, t) {
            var r = tbEvents.getCookie("tb_fetch_points");
            if (r !== a && null !== r && "" !== r) {
                var n = "_uid=" + tbEvents.getCookieDecode("tb_fetch_points", "_uid") + "&_un=" + tbEvents.getCookieDecode("tb_fetch_points", "_un") + "&_uem=" + tbEvents.getCookieDecode("tb_fetch_points", "_uem") + "&_utid=" + tbEvents.getCookieDecode("tb_fetch_points", "_utid") + "&_usid=" + tbEvents.getCookieDecode("tb_fetch_points", "_usid") + "&_uoid=" + tbEvents.getCookieDecode("tb_fetch_points", "_uoid") + "&_ulogin=" + tbEvents.getCookieDecode("tb_fetch_points", "_ulogin") + "&_uasid=" + tbEvents.getCookieDecode("tb_fetch_points", "_uasid") + "&_uc=1",
                    i = tbEvents.b64EncodeUnicode(n);
                tbEvents.setCookie("tb_fetch_points", i)
            }
        },
        tbEvents.getCookieDecode = function (e, r) {
            for (var n = e + "=", i = t.cookie.split(";"), s = 0; s < i.length; s++) {
                for (var o = i[s];
                     " " === o.charAt(0);)
                    o = o.substring(1);
                if (0 === o.indexOf(n))
                    for (var l = o.substring(n.length, o.length), d = tbEvents.b64DecodeUnicode(l), g = d.split("&"), b = 0; b < g.length; b++) {
                        var m = g[b].split("=");
                        if ("" !== m[0] && m[0] !== a && m[0] === r)
                            return m[1]
                    }
            }
            return ""
        },
        tbEvents.b64EncodeUnicode = function (e) {
            return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
                return String.fromCharCode("0x" + t)
            }))
        },
        tbEvents.b64DecodeUnicode = function (e) {
            var t = e.replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&"),
                r = decodeURIComponent(atob(t).split("").map(function (e) {
                    return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                }).join(""));
            return r
        };
    var I = function () {
            var e = {},
                t = function (e) {
                    return decodeURIComponent(e.replace(/\+/g, " "))
                },
                r = location.search.substring(1);
            if ("" !== r) {
                var a = r.split("&");
                for (var n in a)
                    if ("string" == typeof a[n] || a[n] instanceof String) {
                        var i = a[n].split("=");
                        i.length > 1 && (e[t(i[0])] = t(i[1]))
                    }
                return e
            }
            return ""
        },
        h = function () {
            var t = "local_storage_available",
                r = e.localStorage;
            try {
                return r.setItem(t, "1"),
                    r.removeItem(t),
                    !0
            } catch (a) {
                return !1
            }
        };
    (tbConfig.tbTrack === a || tbConfig.tbTrack) && tbEvents.init()
}(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e._tbC = {},
            _tbC.init = function () {
                _tbC.getuserdata()
            },
            _tbC.$ = function (e, r) {
                return (r || t).querySelectorAll(e)
            },
            _tbC.$1 = function (e, r) {
                return (r || t).querySelector(e)
            },
            _tbC.hide = function (e) {
                e.style.display = "none"
            },
            _tbC.show = function (e, t) {
                e.style.display = t
            },
            _tbC.gc = function (e) {
                var r = t.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");
                return r ? r[2] : null
            },
            _tbC.sc = function (e, r, a) {
                var n = new Date;
                n.setTime(n.getTime() + 864e5 * a),
                    t.cookie = e + "=" + r + ";path=/;expires=" + n.toGMTString()
            },
            _tbC.dc = function (e) {
                _tbC.sc(e, "", -1)
            },
            _tbC.getCookie = function (e) {
                for (var r = e + "=", a = t.cookie.split(";"), n = 0; n < a.length; n++) {
                    for (var i = a[n];
                         " " === i.charAt(0);)
                        i = i.substring(1);
                    if (0 === i.indexOf(r))
                        return i.substring(r.length, i.length)
                }
                return ""
            },
            _tbC.setCookie = function (r, a, n) {
                var i = new Date,
                    s = i.getTime();
                s += n,
                    i.setTime(s),
                    t.cookie = r + "=" + a + "; expires=" + i.toUTCString() + "; domain=." + e.location.hostname + ";path=/"
            },
            _tbC.getAjax = function (t, r) {
                var a = e.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                return a.open("GET", t),
                    a.onreadystatechange = function () {
                        a.readyState > 3 && 200 === a.status && r(a.responseText)
                    },
                    a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    a.send(),
                    a
            },
            _tbC.postAjax = function (t, r, a) {
                var n = "string" == typeof r ? r : Object.keys(r).map(function (e) {
                        return encodeURIComponent(e) + "=" + encodeURIComponent(r[e])
                    }).join("&"),
                    i = e.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                return i.open("POST", t),
                    i.onreadystatechange = function () {
                        i.readyState > 3 && 200 === i.status && a(i.responseText)
                    },
                    i.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    i.send(n),
                    i
            },
            _tbC.validateEmail = function (e) {
                var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t.test(e)
            };
        var n = !0;
        r.fontAwesome === a || null === r.fontAwesome || r.fontAwesome || (n = !1),
        n && (_tbC.loadFontAwesome = function () {
            var e = t,
                r = e.createElement("script");
            r.src = "https://use.fontawesome.com/6f6f19e46b.js",
                r.setAttribute("data-timestamp", +new Date),
                (e.head || e.body).appendChild(r)
        }),
            _tbC.getuserdata = function () {
                var e = _tbC.getCookie("tb_fetch_points");
                "1" === r.trackingType ? (_tbC.userLoggedIn = _tbC.getCookie("user_loggedin"),
                e !== a && null !== e && "" !== e && "" === _tbC.userLoggedIn && (_tbC.userLoggedIn = _tbC.getCookieDecode("tb_fetch_points", "_ulogin")),
                    "1" == _tbC.userLoggedIn ? (_tbC.tbUserId = _tbC.getCookie("trackingid"),
                    e !== a && null !== e && "" !== e && "" === _tbC.tbUserId && (_tbC.tbUserId = _tbC.getCookieDecode("tb_fetch_points", "_utid"))) : (_tbC.tbUserId = _tbC.getCookie("targetbay_session_id"),
                    e !== a && null !== e && "" !== e && "" === _tbC.tbUserId && (_tbC.tbUserId = _tbC.getCookieDecode("tb_fetch_points", "_usid")))) : (_tbC.tbUserId = _tbC.getCookie("trackingid"),
                e !== a && null !== e && "" !== e && "" === _tbC.tbUserId && (_tbC.tbUserId = _tbC.getCookieDecode("tb_fetch_points", "_utid")))
            },
            _tbC.getCookieDecode = function (e, r) {
                for (var n = e + "=", i = t.cookie.split(";"), s = 0; s < i.length; s++) {
                    for (var o = i[s];
                         " " === o.charAt(0);)
                        o = o.substring(1);
                    if (0 === o.indexOf(n))
                        for (var l = o.substring(n.length, o.length), d = tbEvents.b64DecodeUnicode(l), g = d.split("&"), b = 0; b < g.length; b++) {
                            var m = g[b].split("=");
                            if ("" !== m[0] && m[0] !== a && m[0] === r)
                                return m[1]
                        }
                }
                return ""
            },
            _tbC.saveSubscriptionEmail = function () {
                var e = t.getElementById("tb_subscription_email").value,
                    r = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,
                    n = "";
                t.getElementById("tb_subscription_fname") !== a && null !== t.getElementById("tb_subscription_fname") && (n = t.getElementById("tb_subscription_fname").value);
                var i = "";
                t.getElementById("tb_subscription_lname") !== a && null !== t.getElementById("tb_subscription_lname") && (i = t.getElementById("tb_subscription_lname").value);
                var s = "";
                t.getElementById("tb_subscription_state") !== a && null !== t.getElementById("tb_subscription_state") && (s = t.getElementById("tb_subscription_state").value);
                var o = "";
                t.getElementById("tb_subscription_dob") !== a && null !== t.getElementById("tb_subscription_dob") && (o = t.getElementById("tb_subscription_dob").value);
                var l = null;
                if (t.getElementById("tb_subscription_page_name") !== a && null !== t.getElementById("tb_subscription_page_name") && (l = t.getElementById("tb_subscription_page_name").value),
                    t.getElementById("tb_validation_msg").innerHTML = "",
                    !_tbC.validateEmail(e))
                    return t.getElementById("tb_validation_msg").innerHTML = "Please enter an valid email.",
                        !1;
                if ("" !== o && 0 == r.test(o))
                    return t.getElementById("tb_validation_msg").innerHTML = "Please enter DOB in MM/DD/YYYY format.",
                        !1;
                _tbC.saveSubscriptionUrl = tbEvents.webhookUrl + "email?" + tbEvents.pubKey;
                var d = function (e) {
                        t.getElementById("tb_subscription_email").value = "",
                        t.getElementById("tb_subscription_fname") !== a && null !== t.getElementById("tb_subscription_fname") && (t.getElementById("tb_subscription_fname").value = ""),
                        t.getElementById("tb_subscription_lname") !== a && null !== t.getElementById("tb_subscription_lname") && (t.getElementById("tb_subscription_lname").value = ""),
                        t.getElementById("tb_subscription_state") !== a && null !== t.getElementById("tb_subscription_state") && (t.getElementById("tb_subscription_state").selectedIndex = "0"),
                        t.getElementById("tb_subscription_dob") !== a && null !== t.getElementById("tb_subscription_dob") && (t.getElementById("tb_subscription_dob").value = "");
                        var r = JSON.parse(e);
                        if (r.success !== a && "" !== r.success) {
                            var n = r.success;
                            return t.getElementById("tb_validation_msg").innerHTML = n,
                                setTimeout(function () {
                                    t.getElementById("tb_validation_msg").innerHTML = ""
                                }, 5e3),
                                !0
                        }
                        return console.log("Subscription email submission error!"),
                            !1
                    },
                    g = {
                        user_id: _tbC.tbUserId,
                        user_mail: e,
                        first_name: n,
                        last_name: i,
                        state: s
                    };
                l !== a && null !== l && (g.page_token = l),
                "" !== o && (g.dateofbirth = o),
                    _tbC.postAjax(_tbC.saveSubscriptionUrl, g, d)
            },
            _tbC.deleteCookie = function (e) {
                t.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
            },
            _tbC.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e.tbMessages = {},
            tbMessages.apiData = {},
            tbMessages.tbData = "",
            tbMessages.tbStickyData = "",
            tbMessages.token = "?api_token=" + r.apiToken,
            tbMessages.sessionView = "",
            tbMessages.init = function () {
                tbMessages.userAgentInfo();
                var n = tbMessages.getCookie("tbMessageView");
                "" === n && tbMessages.setCookie("tbMessageView", 1);
                var i = tbMessages.getCookie("message_frequency");
                "" === i && tbMessages.setCookie("message_frequency", 1);
                var s = e.location.href;
                s.indexOf("shiverandduke") !== -1 && tbMessages.getSubscribeTemplate(),
                s.indexOf("htmia") !== -1 && tbMessages.getSubscribeTemplate();
                var o = 3e3;
                if (r.platform === a || null === r.platform || "bc" !== r.platform && "sf" !== r.platform || (o = 5e3),
                "1" === r.trackingType)
                    var l = e.setInterval(function () {
                        var t = tbMessages.getCookie("userdata_created"),
                            r = tbMessages.getCookie("tb_fetch_points");
                        r !== a && null !== r && "" !== r && "" === t && (t = tbMessages.getCookieDecode("tb_fetch_points", "_uc")),
                        1 == t && (clearInterval(l),
                            e.setTimeout(function () {
                                tbMessages.getTb()
                            }, o))
                    }, 1e3);
                else
                    tbMessages.getTb();
                if (tbMessages.getStickyTemplate(),
                r.orderId !== a && "" !== r.orderId) {
                    t.cookie = "tbCode=;path=/",
                        t.cookie = "topBarDesign=;path=/";
                    var d = t.getElementById("tbtop-bar");
                    d !== a && null !== d && d.remove()
                }
                if ("" !== tbMessages.getCookie("tbCode")) {
                    var g = e.atob(tbMessages.getCookie("tbCode"));
                    "" !== g && (null !== t.getElementById("coupon_code") ? t.getElementById("coupon_code").value = g : null !== t.getElementById("coupon-code") && (t.getElementById("coupon-code").value = g));
                    var b = new XMLHttpRequest;
                    b.open("GET", tbEvents.webhookUrl + "top-bar-template?&api_token=" + r.apiToken + "&index_name=" + r.apiKey),
                        b.setRequestHeader("Content-Type", "application/json"),
                        b.onreadystatechange = function () {
                            var r;
                            if (4 === b.readyState && 200 === b.status) {
                                if (r = JSON.parse(b.responseText),
                                r.msg === a)
                                    return void console.log("TB: Message not yet configured!");
                                var n = t.body,
                                    i = t.createElement("div");
                                i.id = "tb-top-bar";
                                var s = r.msg;
                                if ("" !== s) {
                                    for (i.innerHTML = s; i.children.length > 0;)
                                        i.children[0].style.cssText = "display:none;",
                                            n.appendChild(i.children[0]);
                                    var o = e.atob(tbMessages.getCookie("topBarDesign"));
                                    "" !== g && (t.getElementById("tbtop-bar").getElementsByClassName("tb-timer-min")[0].setAttribute("style", o),
                                        t.getElementById("tbtop-bar").getElementsByClassName("tb-timer-sec")[0].setAttribute("style", o),
                                        t.getElementById("tb-coupon").setAttribute("style", o),
                                        t.getElementById("tb-coupon").innerHTML = g,
                                        t.getElementById("tbtop-bar").style.cssText = "display:inline;",
                                        tbMessages.getTimeAndInitiateTimer(""))
                                }
                            } else
                                4 === b.readyState && 422 === b.status && (r = JSON.parse(b.responseText),
                                    console.log(r))
                        },
                        b.send()
                }
            },
            tbMessages.getStickyTemplate = function () {
                if ("" !== tbMessages.getCookie("tbStickyWorkflow")) {
                    var n, i = tbMessages.getCookie("tbStickyWorkflow"),
                        s = tbMessages.getCookie("tb_fetch_points");
                    if ("1" === r.trackingType) {
                        var o = tbMessages.getCookie("user_loggedin");
                        s !== a && null !== s && "" !== s && "" === o && (o = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                            "1" == o ? (n = tbMessages.getCookie("trackingid"),
                            s !== a && null !== s && "" !== s && "" === n && (n = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (n = tbMessages.getCookie("targetbay_session_id"),
                            s !== a && null !== s && "" !== s && "" === n && (n = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                    } else
                        n = tbMessages.getCookie("trackingid"),
                        s !== a && null !== s && "" !== s && "" === n && (n = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                    var l = new XMLHttpRequest;
                    l.open("GET", tbEvents.webhookUrl + "sticky-message-template?api_token=" + r.apiToken + "&index_name=" + r.apiKey + "&workflow_id=" + i + "&tid=" + n),
                        l.setRequestHeader("Content-Type", "application/json"),
                        l.onreadystatechange = function () {
                            var r;
                            if (4 === l.readyState && 200 === l.status) {
                                if (r = JSON.parse(l.responseText),
                                r.content === a || r.show_sticky !== a && "0" === r.show_sticky)
                                    return tbMessages.setCookie("tbStickyWorkflow", ""),
                                        void console.log("TB: Message not yet configured!");
                                if ((new Image).src = r.bg_image,
                                    tbMessages.preLoadImage(r.bg_image),
                                r.sticky !== a && 0 === t.getElementsByClassName("tbStickyButtonDiv").length && t.body.insertAdjacentHTML("beforeend", r.sticky),
                                "Top" !== r.popup_type) {
                                    var n = t.getElementById("targetbay_message");
                                    n.insertAdjacentHTML("afterend", '<div id="sticky_tb_message"></div>'),
                                        t.getElementById("sticky_tb_message").innerHTML = r.content
                                } else {
                                    var i = t.body;
                                    i.insertAdjacentHTML("afterbegin", '<div id="sticky_tb_message"></div>'),
                                        t.getElementById("sticky_tb_message").innerHTML = r.content,
                                        tbMessages.setCookie("popup_type", r.popup_type)
                                }
                                var s = t.getElementById("sticky_tb_message"),
                                    o = "bgimage";
                                if ("Full Page" === r.popup_type && (o = "targetbay_modal"),
                                null !== s.querySelector("#bg_gradient_status") && null !== s.querySelector("#form_bg_color_1") && null !== s.querySelector("#form_bg_color_2") && "" === r.bg_image) {
                                    var d = s.querySelector("#form_bg_color_1").value,
                                        g = s.querySelector("#form_bg_color_2").value;
                                    s.querySelector("#bg_gradient_status").value > 0 ? s.querySelector("#" + o).style.cssText = "background:linear-gradient(to bottom, " + d + " 0%," + g + " 100%) !important; background:-moz-linear-gradient(top,  " + d + " 0%," + g + " 100%); background:-webkit-linear-gradient(top,  " + d + " 0%," + g + " 100%);" : s.querySelector("#" + o).style.cssText = "background:linear-gradient(to bottom, " + d + " 0%," + d + " 100%) !important; background:-moz-linear-gradient(top,  " + d + " 0%," + d + " 100%); background:-webkit-linear-gradient(top,  " + d + " 0%," + d + " 100%);"
                                }
                                if (s.querySelector("#bgimage").style.width = r.width + "px",
                                    s.querySelector("#bgimage").style.height = r.height + "px",
                                    s.querySelector("#bgimage").style.overflow = "hidden",
                                r.rounded_corner && (s.querySelector("#bgimage").style.borderRadius = "5px"),
                                    t.body.classList.add("tb_popup_open"),
                                null !== t.getElementById("tbStickyMessage")) {
                                    t.getElementById("tbStickyMessage").style.cssText = "display:inline;",
                                    null !== t.getElementById("tb_submit") && t.getElementById("tb_submit").addEventListener("click", function (e) {
                                        tbMessages.tbCustomSubmit()
                                    }),
                                        t.onkeydown = function (r) {
                                            r = r || e.event,
                                            27 == r.keyCode && tbMessages.tbCancel(),
                                            null !== t.getElementById("targetbay_email") && 13 == r.keyCode && tbMessages.tbSubmit(),
                                            null !== t.getElementById("tb_email") && 13 == r.keyCode && tbMessages.tbCustomSubmit()
                                        };
                                    var b = t.getElementById("targetbay_message");
                                    null !== b && b !== a && b.addEventListener("click", function (e) {
                                        null != t.getElementById("targetbay_modal") && t.getElementById("targetbay_modal") != a && null != t.getElementById("targetbay_modal_mobile") && t.getElementById("targetbay_modal_mobile") != a && (t.getElementById("targetbay_modal").contains(e.target) || t.getElementById("targetbay_modal_mobile").contains(e.target) || tbMessages.tbCancel())
                                    });
                                    var m = t.getElementById("sticky_tb_message");
                                    null !== m && m !== a && m.addEventListener("click", function (e) {
                                        null != t.getElementById("targetbay_modal") && t.getElementById("targetbay_modal") != a && null != t.getElementById("targetbay_modal_mobile") && t.getElementById("targetbay_modal_mobile") != a && (t.getElementById("targetbay_modal").contains(e.target) || t.getElementById("targetbay_modal_mobile").contains(e.target) || tbMessages.tbCancel())
                                    })
                                }
                                tbMessages.getTimeAndInitiateTimer("")
                            } else
                                4 === l.readyState && 422 === l.status && (r = JSON.parse(l.responseText),
                                    console.log(r))
                        },
                        l.send()
                }
            },
            tbMessages.checkNumberLength = function () {
                var e = t.getElementById("targetbay_number");
                e.addEventListener("keyup", function () {
                    e.value = e.value.replace(/[^\d]/g, ""),
                        e.value.length > 9 ? (e.value.length > 10 && (e.value = e.value.slice(0, 10)),
                            e.value = e.value.replace(/^(\d{3})(\d{3})(\d+)$/, "($1) $2-$3")) : e.value = e.value.replace(/^(\d{3})(\d{3})(\d+)$/, "($1) $2-$3")
                })
            },
            tbMessages.userAgentInfo = function () {
                var a, n = navigator.userAgent,
                    i = n.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(i[1]))
                    return a = /\brv[ :]+(\d+)/g.exec(n) || [], {
                        name: "IE",
                        version: a[1] || ""
                    };
                if ("Chrome" === i[1] && (a = n.match(/\bOPR\/(\d+)/),
                null !== a))
                    return {
                        name: "Opera",
                        version: a[1]
                    };
                i = i[2] ? [i[1], i[2]] : [navigator.appName, navigator.appVersion, "-?"],
                null !== (a = n.match(/version\/(\d+)/i)) && i.splice(1, 1, a[1]);
                var s = "Unknown OS";
                navigator.appVersion.indexOf("Win") !== -1 && (s = "Windows"),
                navigator.appVersion.indexOf("Mac") !== -1 && (s = "MacOS"),
                navigator.appVersion.indexOf("X11") !== -1 && (s = "UNIX"),
                navigator.appVersion.indexOf("Linux") !== -1 && (s = "Linux"),
                    tbMessages.apiData = {
                        browser: i[0],
                        version: i[1],
                        os: s,
                        url: e.location.href
                    };
                for (var o = t.cookie.split(";"), l = 0; l < o.length; l++) {
                    var d = o[l].split("=");
                    tbMessages.apiData[d[0].trim()] = unescape(d[1])
                }
                tbMessages.apiData.index_name = r.apiKey
            };
        var n = 0;
        tbMessages.getTb = function () {
            var i, s = tbMessages.getCookie("tb_fetch_points");
            if ("1" === r.trackingType) {
                var o = tbMessages.getCookie("user_loggedin");
                s !== a && null !== s && "" !== s && "" === o && (o = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                    "1" == o ? (i = tbMessages.getCookie("trackingid"),
                    s !== a && null !== s && "" !== s && "" === i && (i = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (i = tbMessages.getCookie("targetbay_session_id"),
                    s !== a && null !== s && "" !== s && "" === i && (i = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
            } else
                i = tbMessages.getCookie("trackingid"),
                s !== a && null !== s && "" !== s && "" === i && (i = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
            var l = "_a=" + r.apiToken + "&_i=" + r.apiKey,
                d = "_t=" + e.btoa(l),
                g = e.location.href,
                b = e.btoa(tbMessages.cleanUrl(g)),
                m = /iPhone|Android/i.test(navigator.userAgent);
            d += "&uid=" + b,
                d += "&tid=" + i + "&is_device=" + m;
            var c = tbMessages.getCookie("workflow_id");
            "" !== c && (d += "&wid=" + c);
            var u = new XMLHttpRequest;
            u.open("GET", tbEvents.webhookUrl + "message/display?" + d),
                u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                u.onreadystatechange = function () {
                    if (null !== t.getElementById("targetbay_message") && t.getElementById("targetbay_message") !== a) {
                        t.getElementById("targetbay_message").innerHTML = "";
                        var r;
                        if (4 === u.readyState && 200 === u.status) {
                            if (r = JSON.parse(u.responseText),
                            r.sticky !== a && 0 === t.getElementsByClassName("tbStickyButtonDiv").length && r.show_sticky !== a && "0" !== r.show_sticky && t.body.insertAdjacentHTML("beforeend", r.sticky),
                            r.show_sticky !== a && (tbMessages.setCookie("tbStickyStatus", r.show_sticky),
                                tbMessages.tbStickyData = r.sticky),
                            r.msg !== a) {
                                if ("no_template_found" === r.msg) {
                                    var s = tbMessages.getCookie("workflow_id");
                                    if ("" !== s)
                                        s.indexOf(r.workflow_id) < 0 && (s = s + "," + r.workflow_id,
                                            tbMessages.setCookie("workflow_id", s));
                                    else {
                                        var o = [];
                                        o[0] = r.workflow_id,
                                            tbMessages.setCookie("workflow_id", o)
                                    }
                                }
                                return void console.log("TB: Message not yet configured!")
                            }
                            var l = tbMessages.getCookie("message_frequency"),
                                d = parseInt(r.message_frequency);
                            if (l <= d || 0 === d) {
                                (new Image).src = r.bg_image;
                                var g = tbMessages.preLoadImage(r.bg_image);
                                if ("Top" !== r.popup_type)
                                    t.getElementById("targetbay_message").innerHTML = r.content;
                                else {
                                    var b = t.body;
                                    t.getElementById("targetbay_message").remove(),
                                        b.insertAdjacentHTML("afterbegin", '<div id="targetbay_message"></div>'),
                                        t.getElementById("targetbay_message").innerHTML = r.content,
                                        tbMessages.setCookie("popup_type", r.popup_type)
                                }
                                var m = "bgimage";
                                if ("Full Page" === r.popup_type && (m = "targetbay_modal"),
                                null !== t.getElementById("bg_gradient_status") && null !== t.getElementById("form_bg_color_1") && null !== t.getElementById("form_bg_color_2") && "" === r.bg_image) {
                                    var c = t.getElementById("form_bg_color_1").value,
                                        y = t.getElementById("form_bg_color_2").value;
                                    t.getElementById("bg_gradient_status").value > 0 ? t.getElementById(m).style.cssText = "background:linear-gradient(to bottom, " + c + " 0%," + y + " 100%) !important; background:-moz-linear-gradient(top,  " + c + " 0%," + y + " 100%); background:-webkit-linear-gradient(top,  " + c + " 0%," + y + " 100%);" : t.getElementById(m).style.cssText = "background:linear-gradient(to bottom, " + c + " 0%," + c + " 100%) !important; background:-moz-linear-gradient(top,  " + c + " 0%," + c + " 100%); background:-webkit-linear-gradient(top,  " + c + " 0%," + c + " 100%);"
                                }
                                t.getElementById("bgimage").style.width = r.width + "px",
                                    t.getElementById("bgimage").style.height = r.height + "px",
                                    t.getElementById("bgimage").style.overflow = "hidden",
                                r.rounded_corner && (t.getElementById("bgimage").style.borderRadius = "5px"),
                                    t.body.classList.add("tb_popup_open");
                                var p = e.location.href,
                                    v = p.split("/")[2];
                                tbMessages.setCookie("tb_client_name", v);
                                var _ = r.segment_type,
                                    f = r.popup_session;
                                tbMessages.setCookie("tb_segment_type", _),
                                    tbMessages.setCookie("tb_popup_session", f);
                                var E = v + "_" + _ + "_" + r.workflow_id,
                                    w = v + "_" + f + "_" + r.workflow_id,
                                    I = "",
                                    h = "";
                                "3" == _ && (I = tbMessages.getCookie(E)),
                                "once_per_user" === f && (h = tbMessages.getCookie(w)),
                                    tbMessages.setCookie("current_workflow_id", r.workflow_id);
                                var B = tbMessages.getCookie("workflow_id");
                                if ("" !== B && B.indexOf(r.workflow_id) < 0 && tbMessages.setCookie("tbMessageView", 1),
                                "3" == _ && "" !== I || "once_per_user" === f && "" !== h) {
                                    var C = tbMessages.getCookie("current_workflow_id");
                                    if ("" !== B)
                                        B.indexOf(C) < 0 && (B = B + "," + C,
                                            tbMessages.setCookie("workflow_id", B));
                                    else {
                                        var k = [];
                                        k[0] = C,
                                            tbMessages.setCookie("workflow_id", k)
                                    }
                                }
                                tbMessages.setCookie("tb_popup_timer", r.popup_timer),
                                "multiple" === r.popup_session && (tbMessages.sessionView = "1",
                                    tbMessages.setCookie("tbMessageView", 1),
                                    tbMessages.setCookie("popup_session", r.popup_session));
                                var R = Math.floor(Date.now()),
                                    M = new Date(R + 31536e6);
                                if ("once_show_again" === r.popup_session) {
                                    tbMessages.setCookie("tbMessageView", 1);
                                    var F = new Date,
                                        S = new Date;
                                    if (0 != r.popup_showagain_days || "" !== r.popup_showagain_days) {
                                        S.setTime(S.getTime() + 24 * r.popup_showagain_days * 60 * 60 * 1e3);
                                        var T = "expires=" + M.toUTCString(),
                                            P = tbMessages.getCookie("tbShowAgainDays");
                                        if ("" === P && (t.cookie = "tbShowAgainDays=" + S + ";" + T + ";path=/"),
                                        "" !== P)
                                            var x = tbMessages.datediff(P, F)
                                    }
                                }
                                var N = tbMessages.getCookie("tbMessageView");
                                if (1 == r.leave_intent && 1 == N && ("3" == _ && "" === I || "once_per_user" === f && "" === h || "1" == _ && "once_per_user" !== f && "once_show_again" !== f || "2" == _ && "once_per_user" !== f && "once_show_again" !== f || "once_show_again" === f && "" === P || "once_show_again" === f && 0 == x)) {
                                    var L;
                                    if (L = !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))) {
                                        e.history.pushState({
                                            page: 1
                                        }, "", ""),
                                            "leave-intent" == r.mobile_intent ? (e.addEventListener("popstate", function (r) {
                                                setTimeout("preventBack()", 0),
                                                    e.onunload = function () {
                                                    },
                                                    t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0
                                            }),
                                                t.addEventListener("visibilitychange", function () {
                                                    t.hidden && (t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0)
                                                })) : t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0,
                                            tbMessages.getTimeAndInitiateTimer(""),
                                            tbMessages.disableAnimation();
                                        var A = tbMessages.getCookie("current_workflow_id");
                                        if (tbMessages.saveMessageReport(i, A),
                                        1 != tbMessages.sessionView)
                                            if ("" !== B)
                                                B.indexOf(A) < 0 && (B = B + "," + A,
                                                    tbMessages.setCookie("workflow_id", B));
                                            else {
                                                var o = [];
                                                o[0] = A,
                                                    tbMessages.setCookie("workflow_id", o)
                                            }
                                        tbMessages.setCookie("tbStickyWorkflow", ""),
                                        null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                                        null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove()
                                    } else
                                        tbMessages.addEvent(t, "mouseout", tbMessages.mouseOutEvent);
                                    "once_show_again" === f && 0 == x && (F.setTime(F.getTime() + 24 * r.popup_showagain_days * 60 * 60 * 1e3),
                                        t.cookie = "tbShowAgainDays=" + F + ";" + T + ";path=/")
                                }
                                if (1 != N)
                                    return;
                                if ("3" == _ && "" === I || "once_per_user" === f && "" === h || "1" == _ && "once_per_user" !== f && "once_show_again" !== f || "2" == _ && "once_per_user" !== f && "once_show_again" !== f || "once_show_again" === f && "" === P || "once_show_again" === f && 0 == x || "multiple" === f && "3" == _) {
                                    if ("" !== r.time_delay && g) {
                                        var q = parseInt(r.time_delay) * parseInt(1e3);
                                        if ("on-idle" == r.popup_on_load)
                                            var U = setInterval(function () {
                                                n += 1,
                                                n > parseInt(r.time_delay) && (tbMessages.onLoadPopup(s, i, _, f, v, M),
                                                    clearInterval(U))
                                            }, 1e3);
                                        else
                                            e.setTimeout(function () {
                                                tbMessages.onLoadPopup(s, i, _, f, v, M)
                                            }, q)
                                    }
                                    if ("" !== r.scroll) {
                                        var D = parseInt(r.scroll);
                                        e.addEventListener("scroll", function () {
                                            var e = tbMessages.amountScrolled();
                                            if (e === D) {
                                                var a = tbMessages.getCookie("workflow_id"),
                                                    n = tbMessages.getCookie("current_workflow_id"),
                                                    s = a.split(",").includes(n);
                                                if (0 == s) {
                                                    if (t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0,
                                                        tbMessages.getTimeAndInitiateTimer(""),
                                                        tbMessages.disableAnimation(),
                                                    1 != tbMessages.sessionView)
                                                        if ("" !== a)
                                                            a.indexOf(n) < 0 && (tbMessages.setCookie("tbMessageView", 1),
                                                                a = a + "," + n,
                                                                tbMessages.setCookie("workflow_id", a));
                                                        else {
                                                            var o = [];
                                                            o[0] = n,
                                                                tbMessages.setCookie("workflow_id", o)
                                                        }
                                                    tbMessages.saveMessageReport(i, r.workflow_id),
                                                    "3" == _ && tbMessages.setExpirationCookie(v + "_" + _ + "_" + r.workflow_id, "TargetBay Message Displayed", M),
                                                    "once_per_user" === f && tbMessages.setExpirationCookie(v + "_" + f + "_" + r.workflow_id, "TargetBay Message Displayed", M),
                                                        tbMessages.setCookie("tbStickyWorkflow", ""),
                                                    null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                                                    null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove()
                                                }
                                            }
                                        }, !1)
                                    }
                                    var O = parseInt(l) + parseInt(1);
                                    tbMessages.setCookie("message_frequency", O),
                                    "once_show_again" === f && 0 == x && (F.setTime(F.getTime() + 24 * r.popup_showagain_days * 60 * 60 * 1e3),
                                        t.cookie = "tbShowAgainDays=" + F + ";" + T + ";path=/")
                                }
                                null !== t.getElementById("tb_submit") && t.getElementById("tb_submit").addEventListener("click", function (e) {
                                    tbMessages.tbCustomSubmit()
                                });
                                var V = t.getElementById("targetbay_mview_phone_status");
                                if (V != a && null !== V.value) {
                                    var H = V.value;
                                    if (1 == H) {
                                        var W = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                                        if (W)
                                            t.getElementById("targetbay_email").style.display = "none",
                                                t.getElementById("targetbay_email_error").style.display = "none",
                                                t.getElementById("targetbay_number_error").style.display = "none",
                                                t.getElementById("targetbay_subscribe_label").style.display = "block",
                                                t.getElementById("targetbay_subscribe_error").style.display = "none";
                                        else if (null !== t.getElementById("targetbay_email_status") && 0 == t.getElementById("targetbay_email_status").value)
                                            t.getElementById("targetbay_email").style.display = "none",
                                                t.getElementById("targetbay_email_error").style.display = "none",
                                                t.getElementById("targetbay_number_section").style.display = "block !important",
                                                t.getElementById("targetbay_number_error").style.display = "block !important";
                                        else {
                                            t.getElementById("targetbay_number_section").style.display = "none";
                                            var $ = t.getElementsByClassName("tb-phone-field")[0];
                                            null != $ && $ != a && $.setAttribute("style", "display: none !important"),
                                                t.getElementById("targetbay_number_error").style.display = "none",
                                                t.getElementById("targetbay_subscribe_label").style.display = "none",
                                                t.getElementById("targetbay_subscribe_error").style.display = "none"
                                        }
                                    }
                                }
                                var G = t.getElementById("targetbay_number_optional");
                                G != a && null != G && "1" == G.value && (t.getElementById("targetbay_number_section").style.display = "flex",
                                    t.getElementById("targetbay_email").style.display = "block",
                                    t.getElementById("targetbay_number_error").style.display = "none",
                                    t.getElementById("targetbay_subscribe_label").style.display = "block",
                                    t.getElementById("targetbay_subscribe_error").style.display = "none"),
                                    t.onkeydown = function (r) {
                                        r = r || e.event,
                                        27 == r.keyCode && tbMessages.tbCancel(),
                                        null !== t.getElementById("targetbay_email") && 13 == r.keyCode && tbMessages.tbSubmit(),
                                        null !== t.getElementById("tb_email") && 13 == r.keyCode && tbMessages.tbCustomSubmit()
                                    };
                                var j = t.getElementById("targetbay_message");
                                null !== j && j !== a && j.addEventListener("click", function (e) {
                                    null != t.getElementById("targetbay_modal") && t.getElementById("targetbay_modal") != a && null != t.getElementById("targetbay_modal_mobile") && t.getElementById("targetbay_modal_mobile") != a && (t.getElementById("targetbay_modal").contains(e.target) || t.getElementById("targetbay_modal_mobile").contains(e.target) || tbMessages.tbCancel())
                                }),
                                r.popup_session !== a && null !== r.popup_session && "multiple" === r.popup_session && _tbC.deleteCookie("workflow_id"),
                                t.getElementById("targetbay_number") != a && tbMessages.checkNumberLength()
                            }
                        } else
                            4 === u.readyState && 422 === u.status && (r = JSON.parse(u.responseText),
                                console.log(r))
                    }
                },
                u.send()
        },
            tbMessages.onLoadPopup = function (e, r, a, n, i, s) {
                t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0,
                    tbMessages.getTimeAndInitiateTimer(""),
                    tbMessages.disableAnimation();
                var o = tbMessages.getCookie("current_workflow_id"),
                    l = tbMessages.getCookie("workflow_id");
                if (1 != tbMessages.sessionView)
                    if ("" !== l)
                        l.indexOf(o) < 0 && (tbMessages.setCookie("tbMessageView", 1),
                            l = l + "," + o,
                            tbMessages.setCookie("workflow_id", l));
                    else {
                        var d = [];
                        d[0] = e,
                            tbMessages.setCookie("workflow_id", d)
                    }
                tbMessages.saveMessageReport(r, o),
                "3" == a && tbMessages.setExpirationCookie(i + "_" + a + "_" + e, "TargetBay Message Displayed", s),
                "once_per_user" === n && tbMessages.setExpirationCookie(i + "_" + n + "_" + e, "TargetBay Message Displayed", s),
                    tbMessages.setCookie("tbStickyWorkflow", ""),
                null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove()
            },
            t.onmousemove = function (e) {
                n = 0
            },
            t.onmousedown = function (e) {
                n = 0
            },
            t.onclick = function (e) {
                n = 0
            },
            t.ontouchstart = function (e) {
                n = 0
            },
            t.keypress = function (e) {
                n = 0
            },
            tbMessages.preLoadImage = function (e) {
                if (console.log("Loading assets..."),
                    t.images) {
                    var r = new Image;
                    return r.src = e,
                        r
                }
            },
            tbMessages.tbMessageClick = function (e) {
                var t, n = tbMessages.getCookie("tb_fetch_points");
                if ("1" === r.trackingType) {
                    var i = tbMessages.getCookie("user_loggedin");
                    n !== a && null !== n && "" !== n && "" === i && (i = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                        "1" == i ? (t = tbMessages.getCookie("trackingid"),
                        n !== a && null !== n && "" !== n && "" === t && (t = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (t = tbMessages.getCookie("targetbay_session_id"),
                        n !== a && null !== n && "" !== n && "" === t && (t = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                } else
                    t = tbMessages.getCookie("trackingid"),
                    n !== a && null !== n && "" !== n && "" === t && (t = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                var s = {
                        user_id: t,
                        workflow_id: e,
                        index_name: r.apiKey
                    },
                    o = new XMLHttpRequest;
                o.open("POST", tbEvents.webhookUrl + "update-message-reports" + tbMessages.token),
                    o.setRequestHeader("Content-Type", "application/json"),
                    o.onreadystatechange = function () {
                        4 === o.readyState && 200 === o.status && console.log("Click saved.")
                    },
                    o.send(JSON.stringify(s))
            },
            tbMessages.saveMessageReport = function (e, t) {
                var a = {
                        user_id: e,
                        workflow_id: t,
                        index_name: r.apiKey
                    },
                    n = new XMLHttpRequest;
                n.open("POST", tbEvents.webhookUrl + "save-message-reports" + tbMessages.token),
                    n.setRequestHeader("Content-Type", "application/json"),
                    n.onreadystatechange = function () {
                        4 === n.readyState && 200 === n.status
                    },
                    n.send(JSON.stringify(a))
            },
            tbMessages.saveTriggerReport = function (e, t) {
                var a = {
                        user_id: e,
                        workflow_id: t,
                        index_name: r.apiKey
                    },
                    n = new XMLHttpRequest;
                n.open("POST", tbEvents.webhookUrl + "message-shown-reports" + tbMessages.token),
                    n.setRequestHeader("Content-Type", "application/json"),
                    n.onreadystatechange = function () {
                        4 === n.readyState && 200 === n.status && console.log("Report status saved.")
                    },
                    n.send(JSON.stringify(a))
            },
            tbMessages.getDocHeight = function () {
                var e = t;
                return Math.max(e.body.scrollHeight, e.documentElement.scrollHeight, e.body.offsetHeight, e.documentElement.offsetHeight, e.body.clientHeight, e.documentElement.clientHeight)
            },
            tbMessages.amountScrolled = function () {
                var r = e.innerHeight || (t.documentElement || t.body).clientHeight,
                    a = tbMessages.getDocHeight(),
                    n = e.pageYOffset || (t.documentElement || t.body.parentNode || t.body).scrollTop,
                    i = a - r;
                return Math.floor(n / i * 100)
            },
            tbMessages.addEvent = function (e, t, r) {
                e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on" + t, r)
            },
            tbMessages.mouseOutEvent = function (n) {
                if ("input" != n.target.tagName.toLowerCase()) {
                    var i = Math.max(t.documentElement.clientWidth, e.innerWidth || 0),
                        s = Math.max(t.documentElement.clientHeight, e.innerHeight || 0),
                        o = n.relatedTarget || n.toElement;
                    if (!o && (n.clientX < 0 || n.clientY < 0 || n.clientX > i || n.clientY > s) && 0 == t.getElementById("modal-1").checked) {
                        var l = tbMessages.getCookie("workflow_id"),
                            d = tbMessages.getCookie("current_workflow_id"),
                            g = l.split(",").includes(d);
                        if (0 == g) {
                            t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0,
                                tbMessages.setCookie("tbStickyWorkflow", ""),
                            null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                            null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove(),
                                tbMessages.getTimeAndInitiateTimer(""),
                                tbMessages.disableAnimation();
                            var b, m = tbMessages.getCookie("tb_fetch_points");
                            if ("1" === r.trackingType) {
                                var c = tbMessages.getCookie("user_loggedin");
                                m !== a && null !== m && "" !== m && "" === c && (c = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                                    "1" == c ? (b = tbMessages.getCookie("trackingid"),
                                    m !== a && null !== m && "" !== m && "" === b && (b = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (b = tbMessages.getCookie("targetbay_session_id"),
                                    m !== a && null !== m && "" !== m && "" === b && (b = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                            } else
                                b = tbMessages.getCookie("trackingid"),
                                m !== a && null !== m && "" !== m && "" === b && (b = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                            if (tbMessages.saveMessageReport(b, d),
                            1 != tbMessages.sessionView)
                                if ("" !== l)
                                    l.indexOf(d) < 0 && (l = l + "," + d,
                                        tbMessages.setCookie("workflow_id", l));
                                else {
                                    var u = [];
                                    u[0] = d,
                                        tbMessages.setCookie("workflow_id", u)
                                }
                            var y = tbMessages.getCookie("tb_segment_type"),
                                p = tbMessages.getCookie("tb_popup_session"),
                                v = tbMessages.getCookie("tb_client_name"),
                                _ = Math.floor(Date.now()),
                                f = new Date(_ + 31536e6);
                            "3" == y && tbMessages.setExpirationCookie(v + "_" + y + "_" + d, "TargetBay Message Displayed", f),
                            "once_per_user" === p && tbMessages.setExpirationCookie(v + "_" + p + "_" + d, "TargetBay Message Displayed", f)
                        }
                    }
                }
            },
            tbMessages.removeEvent = function (e, t, r) {
                e.removeEventListener ? e.removeEventListener(t, r) : e.detachEvent && e.detachEvent("on" + t, r)
            },
            tbMessages.tbSubmit = function () {
                var n = t.getElementById("targetbay_name").value,
                    i = "",
                    s = t.getElementById("targetbay_email").value,
                    o = "",
                    l = "",
                    d = (s.indexOf("@"),
                        s.lastIndexOf("."),
                        t.getElementById("targetbay_name_status").value),
                    g = t.getElementById("targetbay_email_status").value,
                    b = t.getElementById("targetbay_workflow_id").value,
                    m = t.getElementById("targetbay_subscribe_status").value,
                    c = t.getElementById("targetbay_mview_phone_status").value,
                    u = t.getElementById("targetbay_subscribe"),
                    y = 0;
                t.getElementById("targetbay_number_optional") != a && null != t.getElementById("targetbay_number_optional") && (y = t.getElementById("targetbay_number_optional").value);
                var p = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if ((p || 1 != g) && 1 == c && "" != v)
                    return tbMessages.tbMobileSubmit(),
                        !1;
                if (1 == d && "" === n)
                    return t.getElementById("targetbay_name_error").style.display = "inline",
                        t.getElementById("targetbay_name_error").style.color = "red",
                        !1;
                if (t.getElementById("targetbay_name_error").style.display = "none",
                1 == g && !tbMessages.validateEmail(s))
                    return t.getElementById("targetbay_email_error").style.display = "inline",
                        t.getElementById("targetbay_email_error").style.color = "red",
                        !1;
                if (t.getElementById("targetbay_email_error").style.display = "none",
                null !== t.getElementById("targetbay_number") && null !== t.getElementById("targetbay_number_status") && (0 == c || 1 == y)) {
                    o = t.getElementById("targetbay_number").value;
                    var v = o.replace(/[^A-Z0-9]+/gi, "");
                    if ("" != v) {
                        if (!tbMessages.validatePhone(v))
                            return t.getElementById("targetbay_number_error").style.display = "inline",
                                t.getElementById("targetbay_number_error").style.color = "red",
                                t.getElementById("targetbay_number_error").style.textAlign = "center",
                                t.getElementById("targetbay_number_error").innerHTML = "Please enter valid phone number",
                                !1;
                        t.getElementById("targetbay_number_error").style.display = "none"
                    }
                }
                if (null !== t.getElementById("targetbay_subscribe_error") && t.getElementById("targetbay_subscribe_error") !== a) {
                    if (1 == m && 0 == u.checked && 1 == y && null !== t.getElementById("targetbay_number") && null !== t.getElementById("targetbay_number").value && "" !== t.getElementById("targetbay_number").value)
                        return t.getElementById("targetbay_subscribe_error").style.display = "inline",
                            t.getElementById("targetbay_subscribe_error").style.color = "red",
                            t.getElementById("targetbay_subscribe_error").style.textAlign = "center",
                            !1;
                    t.getElementById("targetbay_subscribe_error").style.display = "none"
                }
                if (null !== t.getElementById("targetbay_dob") && t.getElementById("targetbay_dob") !== a) {
                    var _ = t.getElementById("targetbay_dob_status").value;
                    if (l = t.getElementById("targetbay_dob").value,
                    1 == _ && "" != l) {
                        var f = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
                        if (0 == f.test(l))
                            return t.getElementById("targetbay_dob_error").style.display = "inline",
                                t.getElementById("targetbay_dob_error").style.color = "red",
                                t.getElementById("targetbay_dob_error").innerHTML = "Please enter valid date",
                                !1;
                        t.getElementById("targetbay_dob_error").style.display = "none"
                    } else {
                        if (1 == _ && "" == l)
                            return t.getElementById("targetbay_dob_error").style.display = "inline",
                                t.getElementById("targetbay_dob_error").style.color = "red",
                                !1;
                        t.getElementById("targetbay_dob_error").style.display = "none"
                    }
                }
                if (null !== t.getElementById("targetbay_friend_name") && t.getElementById("targetbay_friend_name") !== a) {
                    var E = t.getElementById("targetbay_friend_name_status").value;
                    if (i = t.getElementById("targetbay_friend_name").value,
                    1 == E && "" === i)
                        return t.getElementById("targetbay_friend_name_error").style.display = "inline",
                            t.getElementById("targetbay_friend_name_error").style.color = "red",
                            !1;
                    t.getElementById("targetbay_friend_name_error").style.display = "none"
                }
                var w, I = tbMessages.getCookie("tb_fetch_points");
                if ("1" === r.trackingType) {
                    var h = tbMessages.getCookie("user_loggedin");
                    I !== a && null !== I && "" !== I && "" === h && (h = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                        "1" == h ? (w = tbMessages.getCookie("trackingid"),
                        I !== a && null !== I && "" !== I && "" === w && (w = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (w = tbMessages.getCookie("targetbay_session_id"),
                        I !== a && null !== I && "" !== I && "" === w && (w = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                } else
                    w = tbMessages.getCookie("trackingid"),
                    I !== a && null !== I && "" !== I && "" === w && (w = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                var B = {
                    email: s,
                    name: n,
                    number: v,
                    dob: l,
                    user_id: w,
                    workflow_id: b,
                    index_name: r.apiKey,
                    friend_name: i,
                    phone_optional: y
                };
                if (1 == m) {
                    var C = t.getElementById("targetbay_subscribe").checked;
                    C ? B.subscribe = "active" : (B.subscribe = "unsub",
                    1 == c && (B.subscribe = "active"))
                }
                var k = t.getElementById("targetbay_loading").innerHTML,
                    R = t.getElementById("bgimage"),
                    M = R.rows[0];
                M.style.display = "none";
                var F = R.insertRow(1),
                    S = F.insertCell(0);
                S.innerHTML = k;
                var T = new XMLHttpRequest;
                T.open("POST", tbEvents.webhookUrl + "save-message-email" + tbMessages.token),
                    T.setRequestHeader("Content-Type", "application/json"),
                    T.onreadystatechange = function () {
                        if (4 === T.readyState && 200 === T.status) {
                            var r = JSON.parse(T.responseText);
                            if (tbMessages.setCookie("tbStickyWorkflow", ""),
                            null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                            null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove(),
                            r.msg === a)
                                return void console.log("TB: save message email not configured!");
                            if (tbMessages.sessionView = "",
                                tbMessages.setCookie("tbStickyStatus", 0),
                            "no_message" === r.msg || "no_template_found" === r.msg)
                                tbMessages.tbCancel(1);
                            else {
                                t.getElementById("targetbay_message").innerHTML = "",
                                    t.getElementById("targetbay_message").innerHTML = r.msg;
                                var n = "bgimage";
                                if ("undefined" != typeof r.popup_type && "" !== r.popup_type && "Full Page" === r.popup_type && (n = "targetbay_modal"),
                                null !== t.getElementById("bg_gradient_status") && null !== t.getElementById("form_bg_color_1") && null !== t.getElementById("form_bg_color_2") && "" === r.bg_image) {
                                    var i = t.getElementById("form_bg_color_1").value,
                                        s = t.getElementById("form_bg_color_2").value,
                                        o = t.getElementById("bgimage").style.height,
                                        l = t.getElementById("bgimage").style.width;
                                    t.getElementById("bg_gradient_status").value > 0 ? t.getElementById(n).style.cssText = "background:linear-gradient(to bottom, " + i + " 0%," + s + " 100%) !important; background:-moz-linear-gradient(top,  " + i + " 0%," + s + " 100%); background:-webkit-linear-gradient(top,  " + i + " 0%," + s + " 100%)" : t.getElementById(n).style.cssText = "background:linear-gradient(to bottom, " + i + " 0%," + i + " 100%) !important; background:-moz-linear-gradient(top,  " + i + " 0%," + i + " 100%); background:-webkit-linear-gradient(top,  " + i + " 0%," + i + " 100%)",
                                        t.getElementById("bgimage").style.width = l,
                                        t.getElementById("bgimage").style.height = o
                                }
                                t.body.classList.add("tb_popup_open"),
                                    t.getElementById("modal-1").checked = !0,
                                    tbMessages.disableAnimation()
                            }
                            if ("undefined" != typeof r.coupon_code && "" !== r.coupon_code && "undefined" != typeof r.top_bar && "" !== r.top_bar && "undefined" != typeof r.show_notification && r.show_notification > 0) {
                                var d = t.body,
                                    g = t.createElement("div");
                                for (g.id = "tb-top-bar",
                                         g.innerHTML = r.top_bar; g.children.length > 0;)
                                    g.children[0].style.cssText = "display:none;",
                                        d.appendChild(g.children[0]);
                                var b = e.atob(tbMessages.getCookie("topBarDesign"));
                                t.getElementById("tbtop-bar").getElementsByClassName("tb-timer-min")[0].setAttribute("style", b),
                                    t.getElementById("tbtop-bar").getElementsByClassName("tb-timer-sec")[0].setAttribute("style", b),
                                    t.getElementById("tb-coupon").setAttribute("style", b),
                                    t.getElementById("tbtop-bar").style.cssText = "display:inline;",
                                    tbMessages.getTimeAndInitiateTimer(r),
                                    t.body.classList.add("tb_popup_open"),
                                null !== t.getElementById("coupon_code") && (t.getElementById("coupon_code").value = r.coupon_code)
                            }
                        } else if (4 === T.readyState && 422 === T.status) {
                            var r = JSON.parse(T.responseText);
                            if (t.getElementById("targetbay_number_error") !== a && "phone" === r.type)
                                t.getElementById("targetbay_number_error").style.display = "inline",
                                    t.getElementById("targetbay_number_error").style.color = "red",
                                    t.getElementById("targetbay_number_error").style.textAlign = "center",
                                    t.getElementById("targetbay_number_error").innerHTML = "This contact is already registered";
                            else {
                                var m = "This e-mail address is already registered",
                                    c = e.location.href;
                                c.indexOf("delosilabs") !== -1 && (m = "This email is already registered. Please try another."),
                                    t.getElementById("targetbay_email_error").style.display = "inline",
                                    t.getElementById("targetbay_email_error").style.color = "red",
                                    t.getElementById("targetbay_email_error").innerHTML = m
                            }
                            M.style.display = "",
                                F.style.display = "none"
                        }
                    },
                    T.send(JSON.stringify(B))
            },
            tbMessages.tbMobileSubmit = function () {
                var e = t.getElementById("targetbay_mview_phone_status").value,
                    n = t.getElementById("targetbay_workflow_id").value,
                    i = t.getElementById("targetbay_subscribe_status").value,
                    s = t.getElementById("targetbay_subscribe"),
                    o = 1,
                    l = 0,
                    d = "";
                if (t.getElementById("targetbay_number_optional") != a && null != t.getElementById("targetbay_number_optional") && (l = t.getElementById("targetbay_number_optional").value,
                    d = t.getElementById("targetbay_email").value),
                0 == e) {
                    var g = "guest",
                        b = "empty",
                        m = t.getElementById("targetbay_mview_email_status").value,
                        d = t.getElementById("targetbay_mview_email").value;
                    d.indexOf("@"),
                        d.lastIndexOf(".");
                    if (1 == m && !tbMessages.validateEmail(d))
                        return t.getElementById("targetbay_mview_email_error").style.display = "inline",
                            t.getElementById("targetbay_mview_email_error").style.color = "red",
                            t.getElementById("targetbay_mview_email_error").innerHTML = "Invalid Email",
                            !1;
                    t.getElementById("targetbay_mview_email_error").style.display = "none"
                } else {
                    var c = t.getElementById("targetbay_mview_phone").value,
                        b = t.getElementById("targetbay_number").value,
                        u = b.replace(/[^A-Z0-9]+/gi, "");
                    if ("" == c && (c = u),
                    1 == l && !tbMessages.validateEmail(d))
                        return t.getElementById("targetbay_email_error").style.display = "inline",
                            t.getElementById("targetbay_email_error").style.color = "red",
                            !1;
                    if (t.getElementById("targetbay_email_error").style.display = "none",
                        tbMessages.validatePhone(c))
                        t.getElementById("targetbay_number_error").style.display = "none";
                    else if (0 == l || "" != c)
                        return t.getElementById("targetbay_number_error").style.display = "inline",
                            t.getElementById("targetbay_number_error").style.color = "red",
                            t.getElementById("targetbay_number_error").style.textAlign = "center",
                            t.getElementById("targetbay_number_error").innerHTML = "Please enter valid phone number",
                            !1;
                    if (null !== t.getElementById("targetbay_subscribe_error") && t.getElementById("targetbay_subscribe_error") !== a) {
                        if (0 == s.checked && ("" != c || 0 == l))
                            return t.getElementById("targetbay_subscribe_error").style.display = "inline",
                                t.getElementById("targetbay_subscribe_error").style.color = "red",
                                t.getElementById("targetbay_subscribe_error").style.textAlign = "center",
                                !1;
                        t.getElementById("targetbay_subscribe_error").style.display = "none"
                    }
                }
                var y, p = tbMessages.getCookie("tb_fetch_points");
                if ("1" === r.trackingType) {
                    var v = tbMessages.getCookie("user_loggedin");
                    p !== a && null !== p && "" !== p && "" === v && (v = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                        "1" == v ? (y = tbMessages.getCookie("trackingid"),
                        p !== a && null !== p && "" !== p && "" === y && (y = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (y = tbMessages.getCookie("targetbay_session_id"),
                        p !== a && null !== p && "" !== p && "" === y && (y = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                } else
                    y = tbMessages.getCookie("trackingid"),
                    p !== a && null !== p && "" !== p && "" === y && (y = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                var _ = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                t.getElementById("targetbay_email_status") != a && null != t.getElementById("targetbay_email_status") && (o = t.getElementById("targetbay_email_status").value);
                var f = {
                    email: d,
                    name: g,
                    number: c,
                    dob: "",
                    user_id: y,
                    workflow_id: n,
                    index_name: r.apiKey,
                    is_mobile_device: _,
                    tb_email_status: o,
                    phone_optional: l
                };
                if (1 == i) {
                    var E = t.getElementById("targetbay_subscribe").checked;
                    E ? f.subscribe = "active" : f.subscribe = "unsub"
                }
                var w = t.getElementById("targetbay_loading").innerHTML,
                    I = t.getElementById("bgimage"),
                    h = I.rows[0];
                h.style.display = "none";
                var B = I.insertRow(1),
                    C = B.insertCell(0);
                C.innerHTML = w,
                    t.getElementById("targetbay_mview_loading").style.display = "block";
                var k = new XMLHttpRequest;
                k.open("POST", tbEvents.webhookUrl + "save-message-email" + tbMessages.token),
                    k.setRequestHeader("Content-Type", "application/json"),
                    k.onreadystatechange = function () {
                        if (4 === k.readyState && 200 === k.status) {
                            var e = JSON.parse(k.responseText);
                            tbMessages.setCookie("tbStickyWorkflow", ""),
                            null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                            null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove(),
                                tbMessages.sessionView = "",
                                tbMessages.setCookie("tbStickyStatus", 0),
                                "no_message" === e.msg || "no_template_found" === e.msg ? tbMessages.tbCancel(1) : (t.getElementById("targetbay_message").innerHTML = "",
                                    t.getElementById("targetbay_message").innerHTML = e.msg,
                                    t.getElementById("modal-1").checked = !0,
                                    tbMessages.disableAnimation(),
                                    t.body.classList.add("tb_popup_open"))
                        } else if (4 === k.readyState && 422 === k.status) {
                            var e = JSON.parse(k.responseText);
                            t.getElementById("targetbay_number_error") !== a && "phone" === e.type ? (t.getElementById("targetbay_number_error").style.display = "inline",
                                t.getElementById("targetbay_number_error").style.color = "red",
                                t.getElementById("targetbay_number_error").style.textAlign = "center",
                                t.getElementById("targetbay_number_error").innerHTML = "This contact is already registered") : (null != t.getElementById("targetbay_email_error") && t.getElementById("targetbay_email_error") != a && (t.getElementById("targetbay_email_error").style.display = "inline",
                                t.getElementById("targetbay_email_error").style.color = "red",
                                t.getElementById("targetbay_email_error").innerHTML = "This e-mail address is already registered"),
                            null != t.getElementById("targetbay_mview_email_error") && t.getElementById("targetbay_mview_email_error") != a && (t.getElementById("targetbay_mview_email_error").style.display = "inline",
                                t.getElementById("targetbay_mview_email_error").style.color = "red",
                                t.getElementById("targetbay_mview_email_error").innerHTML = "This e-mail address is already registered")),
                                h.style.display = "inline",
                                B.style.display = "none",
                                t.getElementById("targetbay_mview_loading").style.display = "none"
                        }
                    },
                    k.send(JSON.stringify(f))
            },
            tbMessages.tbCustomSubmit = function () {
                for (var e = t.getElementsByClassName("tb_error"); e.length > 0;)
                    e[0].parentNode.removeChild(e[0]);
                var n = "guest",
                    i = "",
                    s = 0,
                    o = 0,
                    l = "anonymous",
                    d = 0,
                    g = "",
                    b = "",
                    m = "";
                if (null !== t.getElementById("tb_name") && (n = t.getElementById("tb_name").value,
                    o = 1),
                null !== t.getElementById("tb_friend_name") && (i = t.getElementById("tb_friend_name").value,
                    s = 1),
                null !== t.getElementById("tb_email")) {
                    l = t.getElementById("tb_email").value;
                    l.indexOf("@"),
                        l.lastIndexOf(".");
                    d = 1
                }
                var c = t.getElementById("targetbay_workflow_id").value;
                if (1 == o && "" === n)
                    return m = "Please enter name",
                        tbMessages.insertAfter("tb_name", m),
                        !1;
                if (1 == d && !tbMessages.validateEmail(l))
                    return m = "Invalid Email",
                        tbMessages.insertAfter("tb_email", m),
                        !1;
                if (null !== t.getElementById("tb_number") && (g = t.getElementById("tb_number").value,
                "" === g || g.length < 7 || isNaN(g)))
                    return m = "Invalid Phone Number",
                        tbMessages.insertAfter("tb_number", m),
                        !1;
                if (null !== t.getElementById("tb_dob")) {
                    var u = t.getElementById("targetbay_dob_status").value;
                    if (b = t.getElementById("tb_dob").value,
                    1 == u || "" === b) {
                        var y = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
                        if (0 == y.test(b))
                            return m = "Invalid DOB",
                                tbMessages.insertAfter("tb_dob", m),
                                !1
                    }
                }
                var p, v = tbMessages.getCookie("tb_fetch_points");
                if ("1" === r.trackingType) {
                    var _ = tbMessages.getCookie("user_loggedin");
                    v !== a && null !== v && "" !== v && "" === _ && (_ = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                        "1" == _ ? (p = tbMessages.getCookie("trackingid"),
                        v !== a && null !== v && "" !== v && "" === p && (p = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (p = tbMessages.getCookie("targetbay_session_id"),
                        v !== a && null !== v && "" !== v && "" === p && (p = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                } else
                    p = tbMessages.getCookie("trackingid"),
                    v !== a && null !== v && "" !== v && "" === p && (p = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                var f = {
                        email: l,
                        name: n,
                        number: g,
                        dob: b,
                        user_id: p,
                        workflow_id: c,
                        index_name: r.apiKey,
                        friend_name: i
                    },
                    E = t.getElementById("targetbay_loading").innerHTML,
                    w = t.getElementById("bgimage"),
                    I = (w.rows[0],
                        w.insertRow(1)),
                    h = I.insertCell(0);
                h.innerHTML = E;
                var B = new XMLHttpRequest;
                B.open("POST", tbEvents.webhookUrl + "save-message-email" + tbMessages.token),
                    B.setRequestHeader("Content-Type", "application/json"),
                    B.onreadystatechange = function () {
                        if (4 === B.readyState && 200 === B.status) {
                            var e = JSON.parse(B.responseText);
                            if (tbMessages.setCookie("tbStickyWorkflow", ""),
                            null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                            null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove(),
                                tbMessages.sessionView = "",
                                tbMessages.setCookie("tbStickyStatus", 0),
                            "no_message" === e.msg || "no_template_found" === e.msg)
                                tbMessages.tbCancel(1);
                            else {
                                t.getElementById("targetbay_message").innerHTML = "",
                                    t.getElementById("targetbay_message").innerHTML = e.msg;
                                var r = "bgimage";
                                if ("undefined" != typeof e.popup_type && "" !== e.popup_type && "Full Page" === e.popup_type && (r = "targetbay_modal"),
                                null !== t.getElementById("bg_gradient_status") && null !== t.getElementById("form_bg_color_1") && null !== t.getElementById("form_bg_color_2") && "" === e.bg_image) {
                                    var a = t.getElementById("form_bg_color_1").value,
                                        n = t.getElementById("form_bg_color_2").value,
                                        i = t.getElementById("bgimage").style.height,
                                        s = t.getElementById("bgimage").style.width;
                                    t.getElementById("bg_gradient_status").value > 0 ? t.getElementById(r).style.cssText = "background:linear-gradient(to bottom, " + a + " 0%," + n + " 100%) !important; background:-moz-linear-gradient(top,  " + a + " 0%," + n + " 100%); background:-webkit-linear-gradient(top,  " + a + " 0%," + n + " 100%)" : t.getElementById(r).style.cssText = "background:linear-gradient(to bottom, " + a + " 0%," + a + " 100%) !important; background:-moz-linear-gradient(top,  " + a + " 0%," + a + " 100%); background:-webkit-linear-gradient(top,  " + a + " 0%," + a + " 100%)",
                                        t.getElementById("bgimage").style.width = s,
                                        t.getElementById("bgimage").style.height = i
                                }
                                t.body.classList.add("tb_popup_open"),
                                    t.getElementById("modal-1").checked = !0,
                                    tbMessages.disableAnimation()
                            }
                        } else
                            4 === B.readyState && 422 === B.status && (m = "This e-mail address is already registered",
                                tbMessages.insertAfter("tb_email", m),
                                I.style.display = "none")
                    },
                    B.send(JSON.stringify(f))
            },
            tbMessages.validateEmail = function (e) {
                var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t.test(e)
            },
            tbMessages.validatePhone = function (e) {
                var t = /^\d{10}$/;
                return t.test(e)
            },
            tbMessages.getTimeAndInitiateTimer = function (r) {
                var n = t.getElementById("tb-counter");
                if (n !== a && null !== n) {
                    var i = "",
                        s = tbMessages.getCookie("tbTimer");
                    if ("" !== s)
                        i = s;
                    else {
                        var o = tbMessages.getCookie("tb_popup_timer"),
                            l = 60;
                        0 != o && (l = o);
                        var d = Math.floor(Date.now());
                        i = new Date(d + 60 * l * 1e3),
                            tbMessages.setCookie("tbTimer", i)
                    }
                    var g = t.getElementsByClassName("tb-timer-min");
                    if (g !== a && g.length > 0 && "" === r) {
                        for (var b = 0; b < g.length; b++)
                             var m = e.btoa(g[b].style.cssText);
                        tbMessages.setCookie("topBarDesign", m)
                    }
                    if ("undefined" != typeof r.coupon_code && "" !== r.coupon_code) {
                        var c = e.btoa(r.coupon_code);
                        tbMessages.setCookie("tbCode", c)
                    }
                    tbMessages.initializeClock(n, i)
                }
            },
            tbMessages.getTimeRemaining = function (e) {
                var t = Date.parse(e) - Date.parse(new Date),
                    r = Math.floor(t / 1e3 % 60),
                    a = Math.floor(t / 1e3 / 60 % 60),
                    n = Math.floor(t / 36e5 % 24),
                    i = Math.floor(t / 864e5);
                return {
                    total: t,
                    days: i,
                    hours: n,
                    minutes: a,
                    seconds: r
                }
            },
            tbMessages.initializeClock = function (e, r) {
                tbMessages.updateClock = function () {
                    for (var e = tbMessages.getTimeRemaining(r), i = 0; i < t.getElementsByClassName("tb-timer-min").length; i++) {
                        var s = t.getElementsByClassName("tb-timer-min")[i],
                            o = t.getElementsByClassName("tb-timer-sec")[i];
                        s.innerHTML = ("0" + e.minutes).slice(-2),
                            o.innerHTML = ("0" + e.seconds).slice(-2)
                    }
                    if (e.total <= 0) {
                        clearInterval(n),
                            t.cookie = "tbCode=;path=/",
                            t.cookie = "topBarDesign=;path=/";
                        var l = t.getElementById("tbtop-bar");
                        l !== a && null !== l && l.remove();
                        var d = t.getElementById("modal-1");
                        d !== a && null !== d && (tbMessages.tbCancel(1),
                            tbMessages.tbCloseTopBar())
                    }
                },
                    tbMessages.updateClock();
                var n = setInterval(tbMessages.updateClock, 1e3);
                e.style.display = "table"
            },
            tbMessages.tbTopBarCancel = function () {
                t.cookie = "tbCode=;path=/",
                    t.cookie = "topBarDesign=;path=/",
                    t.getElementById("tbtop-bar").style.display = "none",
                    t.body.classList.remove("tb_popup_open")
            },
            tbMessages.tbCopyText = function () {
                var r = e.atob(tbMessages.getCookie("tbCode"));
                t.getElementById("tb-coupon").innerHTML = r;
                var a = t.getElementById("tb-coupon"),
                    n = t.createRange();
                n.selectNode(a),
                    e.getSelection().removeAllRanges(),
                    e.getSelection().addRange(n);
                try {
                    t.execCommand("copy"),
                        setTimeout(function () {
                            t.getElementById("tb-coupon").innerHTML = "Copied!",
                                setTimeout(function () {
                                    t.getElementById("tb-coupon").innerHTML = r
                                }, 1e3)
                        }, 0)
                } catch (i) {
                }
                e.getSelection().removeAllRanges()
            },
            tbMessages.tbCancel = function (r) {
                var n = tbMessages.getCookie("tbStickyWorkflow"),
                    i = tbMessages.getCookie("tbStickyStatus");
                if (null !== t.getElementById("sticky_tb_message") && "" !== n ? t.getElementById("sticky_tb_message").querySelector("#modal-1").checked = !1 : t.getElementById("targetbay_message").querySelector("#modal-1").checked = !1,
                "" === tbMessages.sessionView && "0" === i && (t.getElementById("targetbay_message").innerHTML = ""),
                "" === tbMessages.sessionView && "" === n && (tbMessages.setCookie("tbMessageView", 0),
                    tbMessages.removeEvent(t, "mouseout", tbMessages.mouseOutEvent),
                    e.removeEventListener("scroll", function () {
                        var e = tbMessages.amountScrolled();
                        e == scroll && (t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0,
                            tbMessages.disableAnimation())
                    }, !1)),
                "" === n && tbMessages.tbCloseTopBar(),
                    t.body.classList.remove("tb_popup_open"),
                null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.cssText = "display:none;"),
                i > 0 && r === a && (null !== t.getElementById("targetbay_email") || null !== t.getElementById("tb_email") || null !== t.getElementById("targetbay_mview_email"))) {
                    "" !== tbMessages.tbStickyData && 1 === t.getElementsByClassName("tbStickyButtonDiv").length && (t.getElementsByClassName("tbStickyButtonDiv")[0].remove(),
                        t.body.insertAdjacentHTML("beforeend", tbMessages.tbStickyData),
                        tbMessages.tbStickyData = ""),
                    "" === n && (null !== t.getElementById("tbStickyMessage") && (t.getElementById("tbStickyMessage").style.display = "none"),
                    null !== t.getElementById("sticky_tb_message") && t.getElementById("sticky_tb_message").remove()),
                        t.getElementById("tbStickyMessage").style.cssText = "display:inline;",
                        tbMessages.setCookie("tbMinimized", 1);
                    var s = tbMessages.getCookie("current_workflow_id");
                    "" !== n && s === n || tbMessages.setCookie("tbStickyWorkflow", s)
                }
                return !0
            },
            tbMessages.tbShowMessages = function () {
                null !== t.getElementById("sticky_tb_message") ? t.getElementById("sticky_tb_message").querySelector("#modal-1").checked = !0 : t.getElementById("targetbay_message").querySelector("#modal-1").checked = !0,
                    t.getElementById("tbStickyMessage").style.display = "none"
            },
            tbMessages.tbCloseTopBar = function () {
                var e = tbMessages.getCookie("workflow_id"),
                    t = tbMessages.getCookie("current_workflow_id");
                if (1 != tbMessages.sessionView)
                    if ("" !== e)
                        e.indexOf(t) < 0 && (e = e + "," + t,
                            tbMessages.setCookie("workflow_id", e));
                    else {
                        var r = [];
                        r[0] = t,
                            tbMessages.setCookie("workflow_id", r)
                    }
            },
            tbMessages.setCookie = function (e, r) {
                t.cookie = e + "=" + r + "; path=/"
            },
            tbMessages.setExpirationCookie = function (e, r, a) {
                t.cookie = e + "=" + r + "; path=/; expires=" + a.toUTCString()
            },
            tbMessages.datediff = function (e, t) {
                return t >= e ? 0 : 1
            },
            tbMessages.getCookie = function (e) {
                for (var r = e + "=", a = t.cookie.split(";"), n = 0; n < a.length; n++) {
                    for (var i = a[n];
                         " " === i.charAt(0);)
                        i = i.substring(1);
                    if (0 === i.indexOf(r))
                        return i.substring(r.length, i.length)
                }
                return ""
            },
            tbMessages.getCookieDecode = function (e, r) {
                for (var n = e + "=", i = t.cookie.split(";"), s = 0; s < i.length; s++) {
                    for (var o = i[s];
                         " " === o.charAt(0);)
                        o = o.substring(1);
                    if (0 === o.indexOf(n))
                        for (var l = o.substring(n.length, o.length), d = tbMessages.b64DecodeUnicode(l), g = d.split("&"), b = 0; b < g.length; b++) {
                            var m = g[b].split("=");
                            if ("" !== m[0] && m[0] !== a && m[0] === r)
                                return m[1]
                        }
                }
                return ""
            },
            tbMessages.b64DecodeUnicode = function (e) {
                var t = e.replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&"),
                    r = decodeURIComponent(atob(t).split("").map(function (e) {
                        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                    }).join(""));
                return r
            },
            tbMessages.getSubscribeTemplate = function () {
                null !== t.querySelector(".open-modal") && t.querySelector(".open-modal").addEventListener("click", function (e) {
                    tbMessages.getSubscribe()
                }),
                null !== t.querySelector(".tb-special-offers") && t.querySelector(".tb-special-offers").addEventListener("click", function (e) {
                    tbMessages.getSubscribe()
                })
            },
            tbMessages.getSubscribe = function () {
                var n, i = tbMessages.getCookie("tb_fetch_points");
                if ("1" === r.trackingType) {
                    var s = tbMessages.getCookie("user_loggedin");
                    i !== a && null !== i && "" !== i && "" === s && (s = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                        "1" == s ? (n = tbMessages.getCookie("trackingid"),
                        i !== a && null !== i && "" !== i && "" === n && (n = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (n = tbMessages.getCookie("targetbay_session_id"),
                        i !== a && null !== i && "" !== i && "" === n && (n = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                } else
                    n = tbMessages.getCookie("trackingid"),
                    i !== a && null !== i && "" !== i && "" === n && (n = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                tbMessages.tbData = "&index_name=" + r.apiKey + "&trackingid=" + n + "&url=" + e.location.href;
                var o = tbMessages.getCookie("workflow_id");
                "" !== o && (tbMessages.tbData += "&workflow_id=" + o);
                var l = new XMLHttpRequest;
                l.open("GET", tbEvents.webhookUrl + "subscribe-message-template?&api_token=" + r.apiToken + tbMessages.tbData),
                    l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    l.onreadystatechange = function () {
                        t.getElementById("targetbay_message").innerHTML = "";
                        var e;
                        if (4 === l.readyState && 200 === l.status)
                            if (e = JSON.parse(l.responseText),
                            "template_found" === e.msg) {
                                (new Image).src = e.bg_image;
                                tbMessages.preLoadImage(e.bg_image);
                                t.getElementById("targetbay_message").innerHTML = e.content,
                                    t.getElementById("bgimage").style.height = e.height + "px",
                                    t.getElementById("bgimage").style.overflow = "hidden",
                                e.rounded_corner && (t.getElementById("bgimage").style.borderRadius = "5px"),
                                    t.getElementById("modal-1").checked = !0,
                                    tbMessages.disableAnimation()
                            } else
                                "template_not_found" === e.msg && console.log(e);
                        else
                            4 === l.readyState && 422 === l.status && (e = JSON.parse(l.responseText),
                                console.log(e))
                    },
                    l.send()
            },
            tbMessages.disableAnimation = function () {
                e.setTimeout(function () {
                    null != t.getElementById("targetbay_modal") && t.getElementById("targetbay_modal") != a && t.getElementById("targetbay_modal").classList.remove("targetbay_modal__inner")
                }, 2e3)
            },
            tbMessages.insertAfter = function (e, r) {
                var a = t.createElement("span");
                a.innerHTML = r,
                    a.className = "tb_error",
                    a.style.width = "100%",
                    a.style["float"] = "left",
                    a.style.color = "red";
                var n = t.getElementById(e);
                n.parentNode.insertBefore(a, n.nextSibling)
            },
            tbMessages.cleanUrl = function (e) {
                return e.split(/[?#]/)[0]
            },
            tbMessages.getAjax = function (t, r) {
                var a = e.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                return a.open("GET", t),
                    a.onreadystatechange = function () {
                        a.readyState > 3 && 200 === a.status && r(a.responseText)
                    },
                    a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    a.send(),
                    a
            },
        (r.tbMessage === a || r.tbMessage) && tbMessages.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e.tbrForm = {},
            tbrForm.rpTitle = t.title.replace(/ /g, "_"),
            tbrForm.init = function () {
                tbrForm.bulkReviewsLoaded = "";
                var t = tbrForm.getCookie("tb_fetch_points");
                "1" === r.trackingType ? (tbrForm.userLoggedIn = tbrForm.getCookie("user_loggedin"),
                t !== a && null !== t && "" !== t && "" === tbrForm.userLoggedIn && (tbrForm.userLoggedIn = tbrForm.getCookieDecode("tb_fetch_points", "_ulogin")),
                    "1" == tbrForm.userLoggedIn ? (tbrForm.tbUserId = tbrForm.getCookie("trackingid"),
                    t !== a && null !== t && "" !== t && "" === tbrForm.tbUserId && (tbrForm.tbUserId = tbrForm.getCookieDecode("tb_fetch_points", "_utid"))) : (tbrForm.tbUserId = tbrForm.getCookie("targetbay_session_id"),
                    t !== a && null !== t && "" !== t && "" === tbrForm.tbUserId && (tbrForm.tbUserId = tbrForm.getCookieDecode("tb_fetch_points", "_usid")))) : (tbrForm.tbUserId = tbrForm.getCookie("trackingid"),
                t !== a && null !== t && "" !== t && "" === tbrForm.tbUserId && (tbrForm.tbUserId = tbrForm.getCookieDecode("tb_fetch_points", "_utid"))),
                    tbrForm.tbClientUrl = e.location.href,
                    tbrForm.tbkey = r.apiKey,
                "" !== r.productId && r.productId !== a && (tbrForm.tbUsername = r.userName || "",
                    tbrForm.tbEmail = r.userMail || "",
                "1" == tbrForm.userLoggedIn && r.platform !== a && "mg2" === r.platform && t !== a && null !== t && "" !== t && "" === tbrForm.tbEmail && (tbrForm.tbUsername = tbrForm.getCookieDecode("tb_fetch_points", "_un"),
                    tbrForm.tbEmail = tbrForm.getCookieDecode("tb_fetch_points", "_uem")),
                    tbrForm.tbProductName = tbrForm.html_entity_decode(r.productName) || "",
                    tbrForm.tbProductId = r.productId || "",
                    tbrForm.tbProductImageUrl = r.productImageUrl || "",
                    tbrForm.tbProductUrl = r.productUrl || "",
                    tbrForm.tbAvatar = r.userAvatar || "",
                    tbrForm.reviewUrl = tbEvents.webhookUrl + "save-review?api_token=" + r.apiToken,
                    tbrForm.reviewWidgetUrl = tbEvents.webhookUrl + "review-widget?api_token=" + r.apiToken,
                    tbrForm.bulkReviewUrl = tbEvents.webhookUrl + "bulk-reviews?api_token=" + r.apiToken,
                    tbrForm.reviewVoteUrl = tbEvents.webhookUrl + "review-vote?api_token=" + r.apiToken,
                    tbrForm.qaVoteUrl = tbEvents.webhookUrl + "qa-vote?api_token=" + r.apiToken,
                    tbrForm.reviewError = "",
                    tbrForm.triggercount = 0,
                    tbrForm.qaDisplay = 1),
                r.tbReview !== a && (tbrForm.qaDisplay = 0,
                r.tbReview.tbQa && (tbrForm.qaDisplay = 1));
                var n;
                if (n = r.publicKey !== a && null !== r.publicKey ? r.publicKey : tbrForm.b64EncodeUnicode("_a=" + r.apiToken + "&_i=" + r.apiKey),
                    tbrForm.reviewPopupWidgetUrl = tbEvents.webhookUrl + "get-review-popup-widget-data?_t=" + n,
                tbConfig.tbReview.tbReviewPopup !== a && null !== tbConfig.tbReview.tbReviewPopup && tbConfig.tbReview.tbReviewPopup) {
                    var i = 0,
                        s = 25;
                    screen.width >= 720 && tbrForm.reviewWidgetPopupData(i, s, "page_load")
                }
                tbrForm.reviewpage = 1,
                    tbrForm.qapage = 1;
                var o = !0;
                r.fontAwesome === a || null === r.fontAwesome || r.fontAwesome || (o = !1),
                    "" !== r.productId && r.productId !== a ? (o && tbrForm.loadFontAwesome(),
                        tbrForm.productRatings()) : r.tbReview.tbBulkReview && tbrForm.bulkRatings()
            },
            tbrForm.reviewWidgetPopupData = function (e, t, n) {
                var i = tbrForm.getCurrentPage();
                "page_load" === n && (e = tbrForm.getLimitForPageLoad()),
                ("" === e || null === e || isNaN(e) || e === a) && (e = 0,
                    t = 25);
                var s = tbrForm.reviewPopupWidgetUrl + "&product_id=" + r.productId + "&product_name=" + r.productName + "&user_id=" + tbrForm.tbUserId + "&user_name=" + tbrForm.tbUsername + "&user_email=" + tbrForm.tbEmail + "&category_id=" + r.category_id + "&current_page=" + i + "&from=" + e + "&limit=" + t;
                tbrForm.callReviewPopupUrl(s, e, t, n)
            },
            tbrForm.getLimitForPageLoad = function () {
                var e = tbrForm.getCurrentPage(),
                    t = "",
                    n = "",
                    i = 0;
                (r.productId !== a && "" !== r.productId || "product_pages" === e) && (r.productId !== a && null !== r.productId || (r.productId = ""),
                    t = "tb_product_" + r.productId + "_current_review_" + tbrForm.rpTitle,
                    n = "tb_product_" + r.productId + "_total_reviews_count_" + tbrForm.rpTitle),
                (r.category_id !== a && "" !== r.category_id || "category_pages" === e) && (r.category_id !== a && null !== r.category_id || (r.category_id = ""),
                    t = "tb_category_" + r.category_id + "_current_review_" + tbrForm.rpTitle,
                    n = "tb_category_" + r.category_id + "_total_reviews_count_" + tbrForm.rpTitle),
                e !== a && "home_page" === e && (t = "tb_home_current_review_" + tbrForm.rpTitle,
                    n = "tb_home_total_reviews_count_" + tbrForm.rpTitle),
                e !== a && "cart_page" === e && (t = "tb_cart_current_review_" + tbrForm.rpTitle,
                    n = "tb_cart_total_reviews_count_" + tbrForm.rpTitle);
                var s = tbrForm.getCookie(t);
                if (s !== a && "" !== s && null !== s) {
                    i = parseInt(s);
                    var o = tbrForm.getCookie(n);
                    o !== a && "" !== o && null !== o && i >= parseInt(o) && (i = 0)
                }
                return i
            },
            tbrForm.callReviewPopupUrl = function (r, n, i, s) {
                if ("" !== r) {
                    var o = new XMLHttpRequest;
                    o.open("POST", r),
                        o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                        o.onreadystatechange = function () {
                            if (4 === o.readyState && 200 === o.status) {
                                var r = JSON.parse(o.responseText);
                                if (typeof r.selected_page_availability !== a && r.selected_page_availability > 0 && typeof r.widget_enabled_status !== a && r.widget_enabled_status > 0)
                                    if (typeof r.limit_total_reviews_count !== a && r.limit_total_reviews_count > 0)
                                        if (typeof r.settings !== a)
                                            if (r.settings["enable-popup-widget"] !== a && 1 == r.settings["enable-popup-widget"]) {
                                                if (t.getElementById("tb_review_popup_widget") === a || null === t.getElementById("tb_review_popup_widget")) {
                                                    var s = t.createElement("div");
                                                    s.setAttribute("id", "tb_review_popup_widget"),
                                                        t.body.appendChild(s)
                                                }
                                                if (t.getElementById("tb_review_popup_widget") !== a && null !== t.getElementById("tb_review_popup_widget")) {
                                                    if (t.getElementById("showTBReviewPopup") !== a && null !== t.getElementById("showTBReviewPopup") && t.getElementById("showTBReviewPopup").length > 0 && t.getElementById("showTBReviewPopup").each(function (e, r) {
                                                        var a = parseInt(e) + 1;
                                                        a <= parseInt(i) && t.getElementById("showTBReviewPopup" + a).remove()
                                                    }),
                                                        t.getElementById("tb_review_popup_widget").innerHTML = r.view,
                                                    t.getElementById("hidden_popup_check") === a || null === t.getElementById("hidden_popup_check")) {
                                                        var l = t.createElement("input");
                                                        l.setAttribute("type", "hidden"),
                                                            l.setAttribute("name", "hidden_popup_check_name"),
                                                            l.setAttribute("value", "popup_invisible"),
                                                            l.setAttribute("id", "hidden_popup_check"),
                                                            t.getElementById("tb_review_popup_widget").appendChild(l)
                                                    }
                                                    var d = e.setInterval(function () {
                                                        t.getElementsByClassName("TbReviewModal").length > 0 && (tbrForm.initiateReviewPopupWidget(r, n, i),
                                                            clearInterval(d))
                                                    }, 1e3)
                                                }
                                            } else
                                                console.log("popup widget not enabled");
                                        else
                                            console.log("settings undefined");
                                    else {
                                        console.log("no reviews");
                                        var g = 0;
                                        typeof r.total_reviews_count !== a && r.total_reviews_count > 0 && (g = r.total_reviews_count);
                                        var b = parseInt(n) + 25;
                                        n = b >= g ? 0 : b,
                                            setTimeout(function () {
                                                return tbrForm.reviewWidgetPopupData(n, i, "ajax_call"),
                                                    !0
                                            }, 15e3)
                                    }
                            }
                        },
                        o.send()
                } else
                    console.log("url empty")
            },
            tbrForm.validateEmail = function (e) {
                var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t.test(e)
            },
            tbrForm.validateName = function (e) {
                var t = /^[a-zA-Z0-9 ]*$/;
                return t.test(e)
            },
            tbrForm.loadFontAwesome = function () {
                var e = t,
                    r = e.createElement("script");
                r.src = "https://use.fontawesome.com/6f6f19e46b.js",
                    r.setAttribute("data-timestamp", +new Date),
                    (e.head || e.body).appendChild(r)
            },
            tbrForm.bulkRatings = function () {
                var n, i = !1,
                    s = t.getElementsByClassName("page-products"),
                    o = t.getElementsByClassName("cms-index-index"),
                    l = t.getElementsByClassName("catalog-category-view"),
                    d = t.getElementsByClassName("catalogsearch-result-index"),
                    g = t.getElementsByClassName("awshopbybrand-index-brandpageview"),
                    b = t.getElementsByClassName("cms-new-landing"),
                    m = t.getElementsByClassName("solrsearch-index-index"),
                    c = t.getElementsByClassName("newarrivalproduct-index-index"),
                    u = t.getElementsByClassName("template-product"),
                    y = t.getElementsByClassName("page-products-grid"),
                    p = t.getElementsByClassName("page-products"),
                    v = t.getElementsByClassName("node-type-page"),
                    _ = t.getElementsByClassName("tagalys-mpage-index-index"),
                    f = t.getElementsByClassName("contentmanager-index-view"),
                    E = t.getElementsByClassName("cms-page-view");
                n = t.getElementsByClassName("collection"),
                (n === a || null === n || n.length <= 0) && (n = t.getElementsByClassName("template-collection"));
                var w;
                w = t.getElementsByClassName("search"),
                (w === a || null === w || w.length <= 0) && (w = t.getElementsByClassName("template-search"));
                var I;
                I = t.getElementsByClassName("index"),
                (I === a || null === I || I.length <= 0) && (I = t.getElementsByClassName("template-index"));
                var h = t.getElementsByClassName("shopify-product-reviews-badge"),
                    B = !1;
                r.tbWooBulkReview !== a && r.tbWooBulkReview && (B = !0);
                var C = r.apiVersion,
                    k = r.platform;
                if ((1 === s.length && "BODY" === s[0].tagName || 1 === o.length && "BODY" === o[0].tagName || 1 === l.length && "BODY" === l[0].tagName || 1 === d.length && "BODY" === d[0].tagName || 1 === g.length && "BODY" === g[0].tagName || 1 === b.length && "BODY" === b[0].tagName || 1 === m.length && "BODY" === m[0].tagName || 1 === c.length && "BODY" === c[0].tagName || n.length > 0 && "BODY" === n[0].tagName || w.length > 0 && "BODY" === w[0].tagName || I.length > 0 && "BODY" === I[0].tagName || u.length > 0 && "BODY" === u[0].tagName || y.length > 0 && "BODY" === y[0].tagName || p.length > 0 && "BODY" === p[0].tagName || v.length > 0 && "BODY" === v[0].tagName || 1 === _.length && "BODY" === _[0].tagName || 1 === f.length && "BODY" === f[0].tagName || 1 === E.length && "BODY" === E[0].tagName || h.length > 0 || B) && (i = !0),
                    i) {
                    var R, M = "";
                    if ("v2" === C || k !== a && "mg2" === k && !B)
                        if (tbrForm.tbClientUrl.indexOf("ironwear") !== -1)
                            R = t.querySelectorAll(".targetbay_star_container"),
                                M = tbrForm.customBulkReviews();
                        else {
                            if (R = t.querySelectorAll("div[data-product-id]"),
                            0 === R.length)
                                return;
                            for (var F in R)
                                R.hasOwnProperty(F) && (M += R[F].getAttribute("data-product-id") + ",")
                        }
                    else if ("v1" === C) {
                        var S = "",
                            T = "";
                        if (tbrForm.tbClientUrl.indexOf("rokhardware") !== -1)
                            R = t.querySelectorAll(".tb-bulk-rating"),
                                M += tbrForm.customBulkReviews();
                        else if (tbrForm.tbClientUrl.indexOf("impactbattery") !== -1)
                            R = t.querySelectorAll(".star_container"),
                                M += tbrForm.customBulkReviews();
                        else if (tbrForm.tbClientUrl.indexOf("badassglass") !== -1 || tbrForm.tbClientUrl.indexOf("fontanaforniusa") !== -1 || tbrForm.tbClientUrl.indexOf("pfiwestern") !== -1 || tbrForm.tbClientUrl.indexOf("luxproflashlights") !== -1 || tbrForm.tbClientUrl.indexOf("babycubby") !== -1 || tbrForm.tbClientUrl.indexOf("box") !== -1 || tbrForm.tbClientUrl.indexOf("performance-cpr") !== -1 || tbrForm.tbClientUrl.indexOf("simplecpr") !== -1 || tbrForm.tbClientUrl.indexOf("candere") !== -1 || tbrForm.tbClientUrl.indexOf("chuao") !== -1 || tbrForm.tbClientUrl.indexOf("healthaidamerica") !== -1 || tbrForm.tbClientUrl.indexOf("ecompressedair") !== -1 || B)
                            R = t.querySelectorAll(".targetbay_star_container"),
                                M += tbrForm.customBulkReviews();
                        else {
                            if (R = t.querySelectorAll(".regular-price"),
                            0 !== R.length)
                                for (var F in R) {
                                    if (R.hasOwnProperty(F) && null !== R[F].getAttribute("id") && R[F].getAttribute("id") !== a) {
                                        var P = R[F].getAttribute("id").split("-")[2],
                                            x = P.split("_");
                                        x = x.length > 1 ? x[0] : P,
                                        isNaN(x) || (M += x + ",")
                                    }
                                    if (F === R.length - 1)
                                        break
                                }
                            if (S = t.querySelectorAll(".minimal-price .price"),
                            0 !== S.length)
                                for (var N in S) {
                                    if (S.hasOwnProperty(N) && null !== S[N].getAttribute("id") && S[N].getAttribute("id") !== a) {
                                        var L = S[N].getAttribute("id").split("-")[3],
                                            A = L.split("_");
                                        A = A.length > 1 ? A[0] : L,
                                        isNaN(A) || (M += A + ",")
                                    }
                                    if (N === S.length - 1)
                                        break
                                }
                            if (T = t.querySelectorAll(".special-price .price"),
                            0 !== T.length)
                                for (var q in T) {
                                    if (T.hasOwnProperty(q) && null !== T[q].getAttribute("id") && T[q].getAttribute("id") !== a) {
                                        var U = T[q].getAttribute("id").split("-")[2],
                                            D = U.split("_");
                                        D = D.length > 1 ? D[0] : U,
                                        isNaN(D) || (M += D + ",")
                                    }
                                    if (q === T.length - 1)
                                        break
                                }
                        }
                    } else if ("shopify-v1" === C || "v1" === C) {
                        if (R = t.getElementsByClassName("shopify-product-reviews-badge"),
                        R.length > 0)
                            for (var F in R)
                                if (R.hasOwnProperty(F)) {
                                    var O = R[F].getAttribute("data-id").split("-");
                                    M += O[O.length - 1] + ","
                                }
                    } else if ("bigcommerce-v2" === C && (R = t.getElementsByClassName("tb-product-bulk-reviews"),
                    R.length > 0))
                        for (var F in R)
                            if (R.hasOwnProperty(F)) {
                                var O = R[F].getAttribute("data-id").split("-");
                                M += O[O.length - 1] + ","
                            }
                    if ("" === M)
                        return;
                    if (M = M.slice(0, -1),
                    "" === tbrForm.bulkReviewsLoaded)
                        tbrForm.bulkReviewsLoaded = M;
                    else {
                        if (M === tbrForm.bulkReviewsLoaded)
                            return;
                        tbrForm.bulkReviewsLoaded = M
                    }
                    var V = {
                            ids: M
                        },
                        H = tbEvents.webhookUrl + "bulk-reviews?api_token=" + r.apiToken + "&index_name=" + tbrForm.tbkey,
                        W = new XMLHttpRequest;
                    W.open("POST", H),
                        W.setRequestHeader("Content-Type", "application/json"),
                        W.onreadystatechange = function () {
                            if (4 === W.readyState && 200 === W.status) {
                                var n = JSON.parse(W.responseText);
                                tbrForm.setCookie("tb_bulk_review", "");
                                for (var i in R)
                                    R.hasOwnProperty(i) && [].forEach.call(n, function (e) {
                                        var t, n = !0;
                                        if (r.tbWooBulkReview !== a && r.tbWooBulkReview && (n = !1),
                                        "v2" === C || k !== a && "mg2" === k && n)
                                            tbrForm.tbClientUrl.indexOf("ironwear") !== -1 ? e.pId === R[i].getAttribute("id") && (t = R[i].getElementsByClassName("targetbay-reviews-count-field").length,
                                            0 == t && (R[i].innerHTML += e.ratings)) : e.pId === R[i].getAttribute("data-product-id") && (t = R[i].getElementsByClassName("targetbay-reviews-count-field").length,
                                            0 == t && (R[i].innerHTML += e.ratings));
                                        else if ("v1" === C) {
                                            var s = !1;
                                            if (r.tbWooBulkReview !== a && r.tbWooBulkReview && (s = !0),
                                            null !== R[i].getAttribute("id") && R[i].getAttribute("id") !== a) {
                                                var o;
                                                o = tbrForm.tbClientUrl.indexOf("rokhardware") !== -1 || tbrForm.tbClientUrl.indexOf("impactbattery") !== -1 || tbrForm.tbClientUrl.indexOf("badassglass") !== -1 || tbrForm.tbClientUrl.indexOf("fontanaforniusa") !== -1 || tbrForm.tbClientUrl.indexOf("pfiwestern") !== -1 || tbrForm.tbClientUrl.indexOf("luxproflashlights") !== -1 || tbrForm.tbClientUrl.indexOf("babycubby") !== -1 || tbrForm.tbClientUrl.indexOf("box") !== -1 || tbrForm.tbClientUrl.indexOf("performance-cpr") !== -1 || tbrForm.tbClientUrl.indexOf("simplecpr") !== -1 || tbrForm.tbClientUrl.indexOf("candere") !== -1 || tbrForm.tbClientUrl.indexOf("chuao") !== -1 || tbrForm.tbClientUrl.indexOf("healthaidamerica") !== -1 || tbrForm.tbClientUrl.indexOf("ecompressedair") !== -1 || s ? R[i].getAttribute("id") : R[i].getAttribute("id").split("-")[2];
                                                var l = o.split("_"),
                                                    d = o;
                                                l.length > 1 && (d = l[0]),
                                                e.pId === d && (t = R[i].getElementsByClassName("targetbay-reviews-count-field").length,
                                                0 == t && (R[i].innerHTML += e.ratings))
                                            }
                                        } else if (("shopify-v1" === C || "bigcommerce-v2" === C || "v1" === C) && null !== R[i].getAttribute("data-id") && R[i].getAttribute("data-id") !== a) {
                                            var g = R[i].getAttribute("data-id").split("-");
                                            e.pId === g[g.length - 1] && (t = R[i].getElementsByClassName("targetbay-reviews-count-field").length,
                                            0 == t && (R[i].innerHTML += e.ratings))
                                        }
                                    });
                                if ("v1" === C) {
                                    for (var s in S)
                                        S.hasOwnProperty(s) && [].forEach.call(n, function (e) {
                                            if (null !== S[s].getAttribute("id") && S[s].getAttribute("id") !== a && e.pId === S[s].getAttribute("id").split("-")[3]) {
                                                var t = S[s].getElementsByClassName("targetbay-reviews-count-field").length;
                                                0 == t && (S[s].innerHTML += e.ratings)
                                            }
                                        });
                                    for (var o in T)
                                        T.hasOwnProperty(o) && [].forEach.call(n, function (e) {
                                            if (null !== T[o].getAttribute("id") && T[o].getAttribute("id") !== a) {
                                                if (tbrForm.tbClientUrl.indexOf("impactbattery") !== -1)
                                                    var t = T[o].getAttribute("id");
                                                else
                                                    var t = T[o].getAttribute("id").split("-")[2];
                                                var r = t.split("_"),
                                                    n = t;
                                                if (r.length > 1 && (n = r[0]),
                                                e.pId === n) {
                                                    var i = T[o].getElementsByClassName("targetbay-reviews-count-field").length;
                                                    0 == i && (T[o].innerHTML += e.ratings)
                                                }
                                            }
                                        });
                                    tbrForm.bulkReviewsCC()
                                }
                                var l = e.location.href;
                                if ("v2" === C || k !== a && "mg2" === k) {
                                    if (t.getElementsByClassName("qs-loading-wrap")[0] !== a && null !== t.getElementsByClassName("qs-loading-wrap")[0]) {
                                        MutationObserver = e.MutationObserver || e.WebKitMutationObserver;
                                        var d = new MutationObserver(function (e, t) {
                                            tbrForm.triggercount += 1,
                                                console.log("trigger count - " + tbrForm.triggercount),
                                            tbrForm.triggercount % 2 == 0 && (console.log("dom content changed"),
                                                tbrForm.popupRating())
                                        });
                                        d.observe(t.getElementsByClassName("qs-loading-wrap")[0], {
                                            subtree: !0,
                                            attributes: !0
                                        })
                                    }
                                } else if ("v1" === C)
                                    if (l.indexOf("diveshop-dev") !== -1 || l.indexOf("divers-supply") !== -1)
                                        var g = e.setInterval(function () {
                                            if (null !== t.getElementById("ajaxpro-scrolling-button")) {
                                                clearInterval(g);
                                                var r = t.querySelectorAll(".pages .current").length / 2;
                                                t.getElementById("ajaxpro-scrolling-button").addEventListener("click", function () {
                                                    MutationObserver = e.MutationObserver || e.WebKitMutationObserver;
                                                    var a = new MutationObserver(function (e, a) {
                                                        var n = t.querySelectorAll(".pages .current").length / 2;
                                                        n > r && (r = n,
                                                            console.log("dom content changed"),
                                                            tbrForm.bulkRatings())
                                                    });
                                                    a.observe(t.getElementsByClassName("pages")[0], {
                                                        subtree: !0,
                                                        attributes: !0
                                                    })
                                                })
                                            }
                                        }, 1e3);
                                    else if (l.indexOf("bikewagon") !== -1) {
                                        MutationObserver = e.MutationObserver || e.WebKitMutationObserver;
                                        var d = new MutationObserver(function (e, t) {
                                            tbrForm.bulkRatings()
                                        });
                                        d.observe(t.getElementsByClassName("amshopby-page-container")[0], {
                                            subtree: !0,
                                            attributes: !0
                                        })
                                    } else if (l.indexOf("levelnine") !== -1) {
                                        MutationObserver = e.MutationObserver || e.WebKitMutationObserver;
                                        var d = new MutationObserver(function (e, t) {
                                            var r = tbrForm.getCookie("tb_bulk_review");
                                            "" === r && (tbrForm.setCookie("tb_bulk_review", "tb_bulk_review"),
                                                setTimeout(function () {
                                                    tbrForm.bulkRatings()
                                                }, 2e3))
                                        });
                                        d.observe(t.getElementsByClassName("mb-category-products")[0], {
                                            subtree: !0,
                                            attributes: !0
                                        })
                                    } else if (l.indexOf("pedors") !== -1) {
                                        MutationObserver = e.MutationObserver || e.WebKitMutationObserver;
                                        var d = new MutationObserver(function (e, r) {
                                            var a = t.getElementsByClassName("targetbay-reviews-count-field");
                                            0 == a.length && setTimeout(function () {
                                                tbrForm.bulkRatings()
                                            }, 2e3)
                                        });
                                        d.observe(t.getElementById("product-listing-container"), {
                                            subtree: !0,
                                            attributes: !0
                                        })
                                    } else if (l.indexOf("turtlefur") !== -1) {
                                        MutationObserver = e.MutationObserver || e.WebKitMutationObserver;
                                        var b = e.location.href,
                                            m = !1,
                                            d = new MutationObserver(function (r, a) {
                                                b !== e.location.href && (m = !0),
                                                m && ([].forEach.call(t.getElementsByClassName("targetbay_star_container"), function (e) {
                                                    e.innerHTML = ""
                                                }),
                                                    setTimeout(function () {
                                                        tbrForm.bulkRatings()
                                                    }, 2e3),
                                                    m = !1,
                                                    b = e.location.href)
                                            });
                                        d.observe(t.getElementById("collection-grid"), {
                                            subtree: !0,
                                            attributes: !0
                                        })
                                    }
                            }
                        },
                        W.send(JSON.stringify(V))
                }
            },
            tbrForm.bulkReviewsCC = function () {
                var r = e.location.href;
                if (r.indexOf("clevercycles") !== -1 || r.indexOf("clevercycles") !== -1) {
                    MutationObserver = e.MutationObserver || e.WebKitMutationObserver;
                    var a = new MutationObserver(function (e, t) {
                        tbrForm.triggercount += 1,
                        tbrForm.triggercount % 2 === 0 && tbrForm.bulkRatings()
                    });
                    a.observe(t.getElementsByClassName("products-grid")[0], {
                        subtree: !0,
                        attributes: !0
                    })
                }
            },
            tbrForm.customBulkReviews = function () {
                var e = "",
                    n = "",
                    i = !1;
                if (r.tbWooBulkReview !== a && r.tbWooBulkReview && (i = !0),
                    tbrForm.tbClientUrl.indexOf("rokhardware") !== -1 ? e = t.querySelectorAll(".tb-bulk-rating") : tbrForm.tbClientUrl.indexOf("impactbattery") !== -1 ? e = t.querySelectorAll(".star_container") : (tbrForm.tbClientUrl.indexOf("badassglass") !== -1 || tbrForm.tbClientUrl.indexOf("fontanaforniusa") !== -1 || tbrForm.tbClientUrl.indexOf("pfiwestern") !== -1 || tbrForm.tbClientUrl.indexOf("luxproflashlights") !== -1 || tbrForm.tbClientUrl.indexOf("-street") !== -1 || tbrForm.tbClientUrl.indexOf("babycubby") !== -1 || tbrForm.tbClientUrl.indexOf("box") !== -1 || tbrForm.tbClientUrl.indexOf("performance-cpr") !== -1 || tbrForm.tbClientUrl.indexOf("simplecpr") !== -1 || tbrForm.tbClientUrl.indexOf("levelnine") !== -1 || tbrForm.tbClientUrl.indexOf("candere") !== -1 || tbrForm.tbClientUrl.indexOf("chuao") !== -1 || tbrForm.tbClientUrl.indexOf("healthaidamerica") !== -1 || tbrForm.tbClientUrl.indexOf("ironwear") !== -1 || tbrForm.tbClientUrl.indexOf("ecompressedair") !== -1 || i) && (e = t.querySelectorAll(".targetbay_star_container")),
                0 !== e.length)
                    for (var s in e) {
                        if (e.hasOwnProperty(s) && null !== e[s].getAttribute("id") && e[s].getAttribute("id") !== a) {
                            var o = e[s].getAttribute("id");
                            isNaN(o) || "" === o || null === o || (n += o + ",")
                        }
                        if (s === e.length - 1)
                            break
                    }
                return n
            },
            tbrForm.popupRating = function () {
                var a = t.querySelectorAll("div[data-product-id]");
                if (0 !== a.length) {
                    var n, i, s = e.location.href,
                        o = t.querySelectorAll(".price-box.price-final_price").length;
                    if (s.indexOf("beautyencounter") !== -1) {
                        var l, d = t.getElementsByClassName("product-items").length;
                        if (0 === d)
                            n = t.querySelectorAll(".price-box.price-final_price")[o - 1].getAttribute("data-product-id"),
                                i = o;
                        else if (1 === d) {
                            var g = t.getElementsByClassName("page-products"),
                                b = t.getElementsByClassName("cms-home");
                            1 === g.length && "BODY" === g[0].tagName && (i = o,
                                n = t.querySelectorAll(".price-box.price-final_price")[i - 1].getAttribute("data-product-id")),
                            1 === b.length && "BODY" === b[0].tagName && (l = t.getElementsByClassName("product-items")[0].getElementsByTagName("li").length,
                                i = o - l,
                                n = t.querySelectorAll(".price-box.price-final_price")[i - 1].getAttribute("data-product-id"))
                        } else
                            2 === d && (l = t.getElementsByClassName("product-items")[1].getElementsByTagName("li").length,
                                i = o - l,
                                n = t.querySelectorAll(".price-box.price-final_price")[i - 1].getAttribute("data-product-id"));
                        console.log("Related Products - " + d),
                            console.log("product id index- " + i),
                            console.log("product id - " + n)
                    } else
                        s.indexOf("trajaani") !== -1 && (n = t.querySelectorAll(".price-box.price-final_price")[o - 1].getAttribute("data-product-id"),
                            i = o);
                    var m = {
                            ids: n
                        },
                        c = tbEvents.webhookUrl + "bulk-reviews?api_token=" + r.apiToken + "&index_name=" + tbrForm.tbkey,
                        u = new XMLHttpRequest;
                    u.open("POST", c),
                        u.setRequestHeader("Content-Type", "application/json"),
                        u.onreadystatechange = function () {
                            if (4 === u.readyState && 200 === u.status) {
                                var e = JSON.parse(u.responseText);
                                console.log("pid index - " + i),
                                    [].forEach.call(e, function (e) {
                                        t.querySelectorAll(".price-box.price-final_price")[i - 1].innerHTML += e.ratings
                                    })
                            }
                        },
                        u.send(JSON.stringify(m))
                }
            },
            tbrForm.productRatings = function () {
                var n = "recent",
                    i = "recent",
                    s = "";
                null !== t.getElementById("tb-sort-reviews") && null !== t.getElementById("tb-sort-reviews").value && t.getElementById("tb-sort-reviews").value !== a && (n = t.getElementById("tb-sort-reviews").value),
                null !== t.getElementById("tb-sort-qa") && null !== t.getElementById("tb-sort-qa").value && t.getElementById("tb-sort-qa").value !== a && (i = t.getElementById("tb-sort-qa").value),
                null !== t.getElementById("tb-sort-for") && null !== t.getElementById("tb-sort-for").value && t.getElementById("tb-sort-for").value !== a && (s = t.getElementById("tb-sort-for").value);
                var o = "",
                    l = "",
                    d = "",
                    g = "",
                    b = "",
                    m = "",
                    c = "",
                    u = "";
                t.getElementById("tb-product-availability") !== a && null !== t.getElementById("tb-product-availability") && (o = t.getElementById("tb-product-availability").value),
                t.getElementById("tb-product-validuntil") !== a && null !== t.getElementById("tb-product-validuntil") && (l = t.getElementById("tb-product-validuntil").value),
                t.getElementById("tb-product-brand") !== a && null !== t.getElementById("tb-product-brand") && (d = t.getElementById("tb-product-brand").value),
                t.getElementById("tb-product-price") !== a && null !== t.getElementById("tb-product-price") && (g = t.getElementById("tb-product-price").value),
                t.getElementById("tb-product-mpn") !== a && null !== t.getElementById("tb-product-mpn") && (b = t.getElementById("tb-product-mpn").value);
                var y = "&index_name=" + tbrForm.tbkey + "&product_id=" + tbrForm.tbProductId + "&product_name=" + encodeURIComponent(tbrForm.tbProductName) + "&user_id=" + tbrForm.tbUserId + "&user_name=" + tbrForm.tbUsername + "&user_email=" + tbrForm.tbEmail + "&qaDisplay=" + tbrForm.qaDisplay + "&product_url=" + r.productUrl + "&product_image_url=" + r.productImageUrl + "&review_sort_by=" + n + "&qa_sort_by=" + i + "&pr_availability=" + o + "&pr_validuntil=" + l + "&pr_brand=" + d + "&pr_price=" + g + "&pr_mpn=" + b;
                t.getElementById("tb-product-low-price") !== a && null !== t.getElementById("tb-product-low-price") && (m = t.getElementById("tb-product-low-price").value,
                    y += "&pr_product_low_price=" + m),
                t.getElementById("tb-product-high-price") !== a && null !== t.getElementById("tb-product-high-price") && (c = t.getElementById("tb-product-high-price").value,
                    y += "&pr_product_high_price=" + c),
                t.getElementById("tb-product-offer-count") !== a && null !== t.getElementById("tb-product-offer-count") && (u = t.getElementById("tb-product-offer-count").value,
                    y += "&pr_product_offer_count=" + u);
                y += "&api_url=" + tbConfig.apiPath;
                var p = new XMLHttpRequest;
                p.open("GET", tbrForm.reviewWidgetUrl + y),
                    p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    p.onreadystatechange = function () {
                        if (4 === p.readyState && 200 === p.status) {
                            var r = JSON.parse(p.responseText);
                            if (null !== t.getElementById("targetbay_reviews") && t.getElementById("targetbay_reviews") !== a && r.content) {
                                if (t.getElementById("targetbay_reviews_header") !== a && null !== t.getElementById("targetbay_reviews_header") ? t.getElementById("targetbay_reviews_header").innerHTML = r.content : t.getElementById("targetbay_reviews").innerHTML = r.content,
                                    t.getElementById("targetbay_reviews").classList.add("tbProductReviewresIe"),
                                tbrForm.tbClientUrl.indexOf("targetbay_reviews") !== -1 && tbrForm.tbTabClick("tbReviewSection", "scroll", 0),
                                r.product_schema !== a && "" !== r.product_schema) {
                                    var n = t.createElement("script");
                                    n.setAttribute("type", "application/ld+json"),
                                        n.setAttribute("id", "tbProductReviewProductSnippet"),
                                        n.appendChild(t.createTextNode(JSON.stringify(r.product_schema))),
                                        t.getElementsByTagName("head")[0].appendChild(n)
                                }
                                if (r.schema !== a && "" !== r.schema) {
                                    var i = t.createElement("script");
                                    i.setAttribute("type", "application/ld+json"),
                                        i.setAttribute("id", "tbProductReviewSnippet"),
                                        i.appendChild(t.createTextNode(JSON.stringify(r.schema))),
                                        t.getElementsByTagName("head")[0].appendChild(i)
                                }
                                if (r.qa_schema !== a && "" !== r.qa_schema) {
                                    var s = t.createElement("script");
                                    s.setAttribute("type", "application/ld+json"),
                                        s.setAttribute("id", "tbProductReviewSnippet"),
                                        s.appendChild(t.createTextNode(JSON.stringify(r.qa_schema))),
                                        t.getElementsByTagName("head")[0].appendChild(s)
                                }
                                if (e.setTimeout(function () {
                                    for (var e = t.getElementsByClassName("targetbay_full").length, r = 0; r < e; r++)
                                        t.getElementsByClassName("targetbay_full")[r].style.display = "block";
                                    for (var a = t.querySelectorAll("#tbRatingStar .custom-label").length, r = 0; r < a; r++)
                                        t.querySelectorAll("#tbRatingStar .custom-label")[r].style.display = "none";
                                    for (var n = t.querySelectorAll("#tbRatingStar .infoprice").length, r = 0; r < n; r++)
                                        t.querySelectorAll("#tbRatingStar .infoprice")[r].style.display = "none";
                                    for (var i = t.querySelectorAll("#tbRatingStar .infoweight").length, r = 0; r < i; r++)
                                        t.querySelectorAll("#tbRatingStar .infoweight")[r].style.display = "none"
                                }, 3e3),
                                tbrForm.tbClientUrl.indexOf("ruggedmade") !== -1)
                                    for (var o = t.querySelectorAll(".tabinglinks a"), l = 0; l < o.length; l++)
                                        "#tracking-product-review" == o[l].getAttribute("href") && o[l].setAttribute("onclick", "tbrForm.tbTabClick('tbReviewSection','scroll',0)"),
                                        "#questionstab" == o[l].getAttribute("href") && o[l].setAttribute("onclick", "tbrForm.tbTabClick('tbQuestionSection','scroll',0)");
                                var d = !!t.documentMode;
                                d === !0 && t.getElementById("targetbay_reviews").classList.remove("tbProductReviewresIe");
                                var g = t.querySelector(".tb_product_reviews_pagination");
                                g && g.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    var t = e.target;
                                    if (t.getAttribute("href")) {
                                        var r = t.getAttribute("href").split("page=")[1];
                                        tbrForm.reviewpage = r.split("#")[0],
                                            tbrForm.getReviews(tbrForm.reviewpage)
                                    }
                                }, !1);
                                var b = t.querySelector(".tb_qa_pagination");
                                b && b.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    var t = e.target;
                                    if (t.getAttribute("href")) {
                                        var r = t.getAttribute("href").split("page=")[1];
                                        tbrForm.qapage = r.split("#")[0],
                                            tbrForm.getQA(tbrForm.qapage)
                                    }
                                }, !1);
                                var m = t.querySelectorAll(".targetbay-review-voting"),
                                    l = 0,
                                    c = m.length;
                                for (l; l < c; l++)
                                    t.addEventListener && m[l].addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val");
                                        null != t && tbrForm.voteReview(t, r)
                                    });
                                var u = t.querySelectorAll(".targetbay-question-voting"),
                                    l = 0,
                                    c = u.length;
                                for (l; l < c; l++)
                                    t.addEventListener && u[l].addEventListener("click", function (e) {
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val"),
                                            a = this.getAttribute("data-index");
                                        null != t && tbrForm.voteQA(t, r, a)
                                    });
                                var y = t.getElementById("tb-sort-reviews"),
                                    v = t.getElementById("tb-sort-qa");
                                null !== y && y !== a && null !== v && v !== a && (y.addEventListener("change", function (e) {
                                    tbrForm.getReviews("sorting")
                                }),
                                    v.addEventListener("change", function (e) {
                                        tbrForm.getQA("sorting")
                                    }));
                                var _ = t.getElementById("targetbayReviewUpload");
                                null !== _ && _.addEventListener("change", function (e) {
                                    t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "none",
                                        t.getElementById("tbProductReviews-reviewForm").className = "tbProductReviews-tbReviewForm",
                                        t.getElementById("targetbay_review_upload_filetype_error").style.display = "none",
                                        t.getElementById("targetbay_review_upload_error").style.display = "none";
                                    var r = _.files,
                                        a = t.getElementsByClassName("tbSiteReviews-clientUploadImage")[0];
                                    a.innerHTML = "";
                                    for (var n = 0; n < r.length; n++) {
                                        if (!r[n].type.match("image.*"))
                                            return t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "block",
                                                t.getElementById("tbProductReviews-reviewForm").className += " tbSiteReviews-tbReviewFormError",
                                                t.getElementById("tbProductReviews-reviewForm").scrollIntoView(),
                                                t.getElementById("targetbay_review_upload_filetype_error").style.display = "block",
                                                t.getElementById("targetbayReviewUpload").value = "",
                                                !1;
                                        if (r[n].size > 5242880)
                                            return t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "block",
                                                t.getElementById("tbProductReviews-reviewForm").className += " tbSiteReviews-tbReviewFormError",
                                                t.getElementById("tbProductReviews-reviewForm").scrollIntoView(),
                                                t.getElementById("targetbay_review_upload_error").style.display = "block",
                                                t.getElementById("targetbayReviewUpload").value = "",
                                                !1
                                    }
                                    for (var n = 0; n < r.length; n++) {
                                        var i = new FileReader;
                                        i.readAsDataURL(r[n]),
                                            i.onload = tbrForm.addImg
                                    }
                                    tbrForm.clearErrorDisplay()
                                });
                                var f, E, w, I = e.location.href;
                                if (I.indexOf("beautyencounter") !== -1)
                                    f = t.querySelector("div.available"),
                                        tbrForm.insertAfter(r.productStarContent, f);
                                else if (I.indexOf("rokhardware") !== -1)
                                    f = t.getElementsByClassName("page-title-wrapper")[0],
                                    f !== a && null !== f && (f.innerHTML += r.productStarContent);
                                else if (I.indexOf("lilypersonalcare") !== -1)
                                    f = t.getElementsByClassName("product-name")[0],
                                    f !== a && null !== f && tbrForm.insertAfter(r.productStarContent, f);
                                else if (I.indexOf("qc-dealsallyear") !== -1) {
                                    var E = t.querySelector("div.page-title-wrapper");
                                    E !== a && null !== E && (E.innerHTML += r.productStarContent)
                                } else if (I.indexOf("dealsallyear") !== -1)
                                    E = t.getElementsByClassName("short-description")[0],
                                    E !== a && null !== E && tbrForm.insertAfter(r.productStarContent, E);
                                else if (I.indexOf("chevaliercollection") !== -1)
                                    E = t.getElementsByClassName("description")[0],
                                    E !== a && null !== E && (E.innerHTML += r.productStarContent);
                                else if (I.indexOf("thesweeper") !== -1)
                                    E = t.getElementsByClassName("product-name")[0],
                                    E !== a && null !== E && E.insertAdjacentHTML("beforebegin", r.productStarContent);
                                else if (I.indexOf("finehomelamps") !== -1)
                                    E = t.getElementsByClassName("product_name")[0],
                                    E !== a && null !== E && E.insertAdjacentHTML("afterEnd", r.productStarContent);
                                else if (I.indexOf("vietri") !== -1) {
                                    var h = t.getElementsByClassName("mobile-product-price");
                                    h.length > 0 ? (E = h[0],
                                    E !== a && null !== E && (E.innerHTML += r.productStarContent)) : (E = t.getElementsByClassName("tb_reviews_average")[0],
                                    E !== a && null !== E && (E.innerHTML += r.productStarContent))
                                } else if (I.indexOf("candere") !== -1) {
                                    if (f = t.querySelector("h1.title"),
                                        w = t.querySelectorAll("h1.title"),
                                    f !== a && null !== f)
                                        for (var B = 0; B < w.length; B++)
                                            tbrForm.insertAfter(r.productStarContent, w[B])
                                } else if (I.indexOf("tnvitamins") !== -1)
                                    f = t.getElementsByClassName("page-title")[0],
                                    f !== a && null !== f && f.insertAdjacentHTML("afterend", r.productStarContent);
                                else if (I.indexOf("cabinfield") !== -1)
                                    f = t.getElementsByClassName("prnmtitl")[0],
                                    f !== a && null !== f && tbrForm.insertAfter(r.productStarContent, f);
                                else if (f = t.getElementsByClassName("product_name")[0],
                                f !== a && null !== f)
                                    tbrForm.insertAfter(r.productStarContent, f);
                                else if (f = t.querySelector("div.product-name"),
                                    w = t.querySelectorAll("div.product-name"),
                                f !== a && null !== f)
                                    for (var B = 0; B < w.length; B++)
                                        w[B].innerHTML += r.productStarContent;
                                else {
                                    var C = t.querySelectorAll("div.page-title-wrapper");
                                    if (C !== a && null !== C && C.length > 0)
                                        for (var B = 0; B < C.length; B++)
                                            C[B].innerHTML += r.productStarContent;
                                    else
                                        f = t.getElementsByClassName("product-name")[0],
                                        f !== a && null !== f && tbrForm.insertAfter(r.productStarContent, f)
                                }
                            }
                        }
                    },
                    p.send()
            },
            tbrForm.html_entity_decode = function (e) {
                var r = t.createElement("textarea");
                r.innerHTML = e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                var a = r.value;
                return r = null,
                    a
            },
            tbrForm.reviewTwo = function (e, r) {
                t.getElementById("tb-sort-reviews").value = e,
                    t.getElementById("tb-sort-reviews").value,
                    t.getElementById("tbactive").value = e,
                    t.getElementById("tbactive").innerHTML = r,
                    t.getElementById("tbactive_div").style.display = "none",
                    tbrForm.getReviews()
            },
            tbrForm.reviewSearch = function (e) {
                return "" != e && (t.getElementById("review_search_text").value = e,
                    void tbrForm.getReviews("searching"))
            },
            tbrForm.clearReviewSearch = function () {
                t.getElementById("review_search_text").value = "",
                    tbrForm.getReviews("searching")
            },
            tbrForm.openOptions = function (e) {
                var r;
                r = "review" === e ? t.getElementById("tbactive_div") : t.getElementById("tbactive-div-qa"),
                    "none" === r.style.display ? r.style.display = "block" : r.style.display = "none"
            },
            tbrForm.getReviews = function (e) {
                var r = "recent",
                    n = "recent",
                    i = "tb_reviews",
                    s = "",
                    o = "";
                null !== t.getElementById("tb-sort-reviews") && null !== t.getElementById("tb-sort-reviews").value && t.getElementById("tb-sort-reviews").value !== a && (r = t.getElementById("tb-sort-reviews").value);
                var l = "Newest";
                null !== t.getElementById("tbactive") && t.getElementById("tbactive") !== a && (l = t.getElementById("tbactive").innerHTML),
                null !== t.getElementById("tb-sort-qa") && null !== t.getElementById("tb-sort-qa").value && t.getElementById("tb-sort-qa").value !== a && (n = t.getElementById("tb-sort-qa").value),
                null !== t.getElementById("tb-sort-for") && null !== t.getElementById("tb-sort-for").value && t.getElementById("tb-sort-for").value !== a && (i = t.getElementById("tb-sort-for").value),
                null !== t.getElementById("review_search_text") && null !== t.getElementById("review_search_text").value && t.getElementById("review_search_text").value !== a && (s = t.getElementById("review_search_text").value),
                null !== t.getElementById("qa_search_text") && null !== t.getElementById("qa_search_text").value && t.getElementById("qa_search_text").value !== a && (o = t.getElementById("qa_search_text").value),
                "sorting" === e && (tbrForm.reviewpage = 1,
                    tbrForm.qapage = 1),
                "searching" === e && (tbrForm.reviewpage = 1);
                var d = "&index_name=" + tbrForm.tbkey + "&product_id=" + tbrForm.tbProductId + "&product_name=" + encodeURIComponent(tbrForm.tbProductName) + "&user_id=" + tbrForm.tbUserId + "&user_name=" + tbrForm.tbUsername + "&user_email=" + tbrForm.tbEmail + "&qaDisplay=" + tbrForm.qaDisplay + "&reviewpage=" + tbrForm.reviewpage + "&qapage=" + tbrForm.qapage + "&review_sort_by=" + r + "&qa_sort_by=" + n + "&review_search_text=" + s + "&qa_search_text=" + o,
                    g = new XMLHttpRequest;
                g.open("GET", tbrForm.reviewWidgetUrl + d),
                    g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    g.onreadystatechange = function () {
                        if (4 === g.readyState && 200 === g.status) {
                            var e = JSON.parse(g.responseText);
                            if (null !== t.getElementById("targetbay_reviews") && t.getElementById("targetbay_reviews") !== a) {
                                if (t.getElementById("targetbay_reviews").innerHTML = e.content,
                                    tbrForm.tbTabClick("tbReviewSection", "noscroll"),
                                    t.getElementsByClassName("tbProductReviews-tbTabNavBar")[0].scrollIntoView(),
                                null !== t.getElementById("tb-sort-reviews") && t.getElementById("tb-sort-reviews") !== a && null !== t.getElementById("tb-sort-qa") && t.getElementById("tb-sort-qa") !== a) {
                                    if (null !== t.getElementById("tbactive") && t.getElementById("tbactive") !== a && (t.getElementById("tbactive").value = r,
                                        t.getElementById("tbactive").innerHTML = l,
                                    null !== t.getElementById("page-number-star") && t.getElementById("page-number-star") !== a)) {
                                        var n = t.getElementById("limit_count_product_review").innerHTML;
                                        t.getElementById("page-number-star").innerHTML = tbrForm.reviewpage * n + 1 - n;
                                        var s = t.getElementById("page-number-total").innerHTML;
                                        if (tbrForm.reviewpage * n > s)
                                            var o = s;
                                        else {
                                            console.log(tbrForm.reviewpage * n);
                                            var o = tbrForm.reviewpage * n
                                        }
                                        t.getElementById("page-number-limit").innerHTML = o
                                    }
                                    "tb_reviews" === i ? tbrForm.tbTabClick("tbReviewSection", "scroll", 0) : "tb_qa" === i && tbrForm.tbTabClick("tbQuestionSection", "scroll", 0)
                                }
                                tbwTrack.reviewUserTrack("review");
                                var d = t.querySelector(".tb_product_reviews_pagination");
                                d && d.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    var t = e.target;
                                    if (t.getAttribute("href")) {
                                        var r = t.getAttribute("href").split("page=")[1];
                                        tbrForm.reviewpage = r.split("#")[0],
                                            tbrForm.getReviews(tbrForm.reviewpage)
                                    }
                                }, !1);
                                var b = t.querySelector(".tb_qa_pagination");
                                b && b.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    var t = e.target;
                                    if (t.getAttribute("href")) {
                                        var r = t.getAttribute("href").split("page=")[1];
                                        tbrForm.qapage = r.split("#")[0],
                                            tbrForm.getQA(tbrForm.qapage)
                                    }
                                }, !1);
                                var m = t.querySelectorAll(".targetbay-review-voting"),
                                    c = 0,
                                    u = m.length;
                                for (c; c < u; c++)
                                    t.addEventListener && m[c].addEventListener("click", function (e) {
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val");
                                        null != t && tbrForm.voteReview(t, r)
                                    });
                                var y = t.querySelectorAll(".targetbay-question-voting"),
                                    c = 0,
                                    u = y.length;
                                for (c; c < u; c++)
                                    t.addEventListener && y[c].addEventListener("click", function (e) {
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val"),
                                            a = this.getAttribute("data-index");
                                        null != t && tbrForm.voteQA(t, r, a)
                                    });
                                var p = t.getElementById("tb-sort-reviews"),
                                    v = t.getElementById("tb-sort-qa");
                                null !== p && p !== a && null !== v && v !== a && (p.addEventListener("change", function (e) {
                                    tbrForm.getReviews("sorting")
                                }),
                                    v.addEventListener("change", function (e) {
                                        tbrForm.getQA("sorting")
                                    }));
                                var _ = t.getElementById("targetbayReviewUpload");
                                null !== _ && _.addEventListener("change", function (e) {
                                    t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "none",
                                        t.getElementById("tbProductReviews-reviewForm").className = "tbProductReviews-tbReviewForm",
                                        t.getElementById("targetbay_review_upload_filetype_error").style.display = "none",
                                        t.getElementById("targetbay_review_upload_error").style.display = "none";
                                    var r = _.files,
                                        a = t.getElementsByClassName("tbSiteReviews-clientUploadImage")[0];
                                    a.innerHTML = "";
                                    for (var n = 0; n < r.length; n++) {
                                        if (!r[n].type.match("image.*"))
                                            return t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "block",
                                                t.getElementById("tbProductReviews-reviewForm").className += " tbSiteReviews-tbReviewFormError",
                                                t.getElementById("tbProductReviews-reviewForm").scrollIntoView(),
                                                t.getElementById("targetbay_review_upload_filetype_error").style.display = "block",
                                                t.getElementById("targetbayReviewUpload").value = "",
                                                !1;
                                        if (r[n].size > 5242880)
                                            return t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "block",
                                                t.getElementById("tbProductReviews-reviewForm").className += " tbSiteReviews-tbReviewFormError",
                                                t.getElementById("tbProductReviews-reviewForm").scrollIntoView(),
                                                t.getElementById("targetbay_review_upload_error").style.display = "block",
                                                t.getElementById("targetbayReviewUpload").value = "",
                                                !1
                                    }
                                    for (var n = 0; n < r.length; n++) {
                                        var i = new FileReader;
                                        i.readAsDataURL(r[n]),
                                            i.onload = tbrForm.addImg
                                    }
                                    tbrForm.clearErrorDisplay()
                                })
                            }
                        }
                    },
                    g.send()
            },
            tbrForm.qaTwo = function (e, r) {
                t.getElementById("tb-sort-qa").value = e;
                t.getElementById("tb-sort-qa").value;
                t.getElementById("tbactive-qa").value = e,
                    t.getElementById("tbactive-qa").innerHTML = r;
                t.getElementById("tbactive-div-qa").style.display = "none";
                tbrForm.getQA()
            },
            tbrForm.qaSearch = function (e) {
                return "" != e && (t.getElementById("qa_search_text").value = e,
                    void tbrForm.getQA("searching"))
            },
            tbrForm.clearQaSearch = function () {
                t.getElementById("qa_search_text").value = "",
                    tbrForm.getQA("searching")
            },
            tbrForm.getQA = function (e) {
                var r = "recent",
                    n = "recent",
                    i = "tb_reviews",
                    s = "",
                    o = "";
                null !== t.getElementById("tb-sort-reviews") && null !== t.getElementById("tb-sort-reviews").value && t.getElementById("tb-sort-reviews").value !== a && (r = t.getElementById("tb-sort-reviews").value),
                null !== t.getElementById("tb-sort-qa") && null !== t.getElementById("tb-sort-qa").value && t.getElementById("tb-sort-qa").value !== a && (n = t.getElementById("tb-sort-qa").value),
                null !== t.getElementById("review_search_text") && null !== t.getElementById("review_search_text").value && t.getElementById("review_search_text").value !== a && (s = t.getElementById("review_search_text").value),
                null !== t.getElementById("qa_search_text") && null !== t.getElementById("qa_search_text").value && t.getElementById("qa_search_text").value !== a && (o = t.getElementById("qa_search_text").value);
                var l = "Newest";
                null !== t.getElementById("tbactive-qa") && t.getElementById("tbactive-qa") !== a && (l = t.getElementById("tbactive-qa").innerHTML),
                null !== t.getElementById("tb-sort-for") && null !== t.getElementById("tb-sort-for").value && t.getElementById("tb-sort-for").value !== a && (i = t.getElementById("tb-sort-for").value),
                "sorting" === e && (tbrForm.reviewpage = 1,
                    tbrForm.qapage = 1),
                "searching" === e && (tbrForm.qapage = 1);
                var d = "&index_name=" + tbrForm.tbkey + "&product_id=" + tbrForm.tbProductId + "&product_name=" + encodeURIComponent(tbrForm.tbProductName) + "&user_id=" + tbrForm.tbUserId + "&user_name=" + tbrForm.tbUsername + "&user_email=" + tbrForm.tbEmail + "&qaDisplay=" + tbrForm.qaDisplay + "&reviewpage=" + tbrForm.reviewpage + "&qapage=" + tbrForm.qapage + "&review_sort_by=" + r + "&qa_sort_by=" + n + "&review_search_text=" + s + "&qa_search_text=" + o,
                    g = new XMLHttpRequest;
                g.open("GET", tbrForm.reviewWidgetUrl + d),
                    g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    g.onreadystatechange = function () {
                        if (4 === g.readyState && 200 === g.status) {
                            var e = JSON.parse(g.responseText);
                            if (null !== t.getElementById("targetbay_reviews") && t.getElementById("targetbay_reviews") !== a) {
                                if (t.getElementById("targetbay_reviews").innerHTML = e.content,
                                    tbrForm.tbTabClick("tbQuestionSection", "noscroll"),
                                    t.getElementsByClassName("tbProductReviews-tbTabNavBar")[0].scrollIntoView(),
                                null !== t.getElementById("tb-sort-reviews") && t.getElementById("tb-sort-reviews") !== a && null !== t.getElementById("tb-sort-qa") && t.getElementById("tb-sort-qa") !== a) {
                                    if (null !== t.getElementById("tbactive-qa") && t.getElementById("tbactive-qa") !== a && (t.getElementById("tbactive-qa").value = n,
                                        t.getElementById("tbactive-qa").innerHTML = l,
                                    null !== t.getElementById("page-number-star-qa") && t.getElementById("page-number-star-qa") !== a)) {
                                        var r = t.getElementById("limit_count_qa").innerHTML;
                                        t.getElementById("page-number-star-qa").innerHTML = tbrForm.qapage * r + 1 - r;
                                        var s = t.getElementById("page-number-total-qa").innerHTML;
                                        if (tbrForm.qapage * r > s)
                                            var o = s;
                                        else {
                                            console.log(tbrForm.qapage * r);
                                            var o = tbrForm.qapage * r
                                        }
                                        t.getElementById("page-number-limit-qa").innerHTML = o
                                    }
                                    "tb_reviews" === i ? tbrForm.tbTabClick("tbReviewSection", "scroll", 0) : "tb_qa" === i && tbrForm.tbTabClick("tbQuestionSection", "scroll", 0)
                                }
                                tbwTrack.reviewUserTrack("qa");
                                var d = t.querySelector(".tb_product_reviews_pagination");
                                d && d.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    var t = e.target;
                                    if (t.getAttribute("href")) {
                                        var r = t.getAttribute("href").split("page=")[1];
                                        tbrForm.reviewpage = r.split("#")[0],
                                            tbrForm.getReviews(tbrForm.reviewpage)
                                    }
                                }, !1);
                                var b = t.querySelector(".tb_qa_pagination");
                                b && b.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    var t = e.target;
                                    if (t.getAttribute("href")) {
                                        var r = t.getAttribute("href").split("page=")[1];
                                        tbrForm.qapage = r.split("#")[0],
                                            tbrForm.getQA(tbrForm.qapage)
                                    }
                                }, !1);
                                var m = t.querySelectorAll(".targetbay-review-voting"),
                                    c = 0,
                                    u = m.length;
                                for (c; c < u; c++)
                                    t.addEventListener && m[c].addEventListener("click", function (e) {
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val");
                                        null != t && tbrForm.voteReview(t, r)
                                    });
                                var y = t.querySelectorAll(".targetbay-question-voting"),
                                    c = 0,
                                    u = y.length;
                                for (c; c < u; c++)
                                    t.addEventListener && y[c].addEventListener("click", function (e) {
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val"),
                                            a = this.getAttribute("data-index");
                                        null != t && tbrForm.voteQA(t, r, a)
                                    });
                                var p = t.getElementById("tb-sort-reviews"),
                                    v = t.getElementById("tb-sort-qa");
                                null !== p && p !== a && null !== v && v !== a && (p.addEventListener("change", function (e) {
                                    tbrForm.getReviews("sorting")
                                }),
                                    v.addEventListener("change", function (e) {
                                        tbrForm.getQA("sorting")
                                    }));
                                var _ = t.getElementById("targetbayReviewUpload");
                                null !== _ && _.addEventListener("change", function (e) {
                                    t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "none",
                                        t.getElementById("tbProductReviews-reviewForm").className = "tbProductReviews-tbReviewForm",
                                        t.getElementById("targetbay_review_upload_filetype_error").style.display = "none",
                                        t.getElementById("targetbay_review_upload_error").style.display = "none";
                                    var r = _.files,
                                        a = t.getElementsByClassName("tbSiteReviews-clientUploadImage")[0];
                                    a.innerHTML = "";
                                    for (var n = 0; n < r.length; n++) {
                                        if (!r[n].type.match("image.*"))
                                            return t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "block",
                                                t.getElementById("tbProductReviews-reviewForm").className += " tbSiteReviews-tbReviewFormError",
                                                t.getElementById("tbProductReviews-reviewForm").scrollIntoView(),
                                                t.getElementById("targetbay_review_upload_filetype_error").style.display = "block",
                                                t.getElementById("targetbayReviewUpload").value = "",
                                                !1;
                                        if (r[n].size > 5242880)
                                            return t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "block",
                                                t.getElementById("tbProductReviews-reviewForm").className += " tbSiteReviews-tbReviewFormError",
                                                t.getElementById("tbProductReviews-reviewForm").scrollIntoView(),
                                                t.getElementById("targetbay_review_upload_error").style.display = "block",
                                                t.getElementById("targetbayReviewUpload").value = "",
                                                !1
                                    }
                                    for (var n = 0; n < r.length; n++) {
                                        var i = new FileReader;
                                        i.readAsDataURL(r[n]),
                                            i.onload = tbrForm.addImg
                                    }
                                    tbrForm.clearErrorDisplay()
                                })
                            }
                        }
                    },
                    g.send()
            },
            tbrForm.sortByReviews = function (e) {
                var a = t.getElementById("sortByList").value,
                    n = "&index_name=" + tbrForm.tbkey + "&product_id=" + tbrForm.tbProductId + "&user_id=" + tbrForm.tbUserId + "&user_name=" + tbrForm.tbUsername + "&user_email=" + tbrForm.tbEmail + "&review_sort_type=" + a + "&review_sort=" + e,
                    i = new XMLHttpRequest;
                i.open("GET", tbEvents.webhookUrl + "review-list-widget?api_token=" + r.apiToken + n),
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    i.onreadystatechange = function () {
                        if (4 === i.readyState && 200 === i.status) {
                            var e = JSON.parse(i.responseText);
                            t.getElementById("targetbay_reviews").innerHTML += e.content
                        }
                    },
                    i.send()
            },
            tbrForm.tbReviewClick = function () {
                var n, i = 0,
                    s = "",
                    o = "",
                    l = t.getElementById("targetbayTemplateType").value,
                    d = tbrForm.getCookie("user_loggedin"),
                    g = tbrForm.getCookie("tb_fetch_points");
                if (g !== a && null !== g && "" !== g && "" === d && (d = tbrForm.getCookieDecode("tb_fetch_points", "_ulogin")),
                "review" === l) {
                    for (var b = t.getElementsByName("targetbayRating"), m = 0; m < b.length; m++)
                        b[m].checked && (s = b[m].value);
                    o = t.getElementById("targetbayReviewTitle").value,
                        n = t.getElementById("targetbayReview").value,
                    "" === d && t.getElementById("targetbayReviewUsername") && t.getElementById("targetbayReviewEmail") && (tbrForm.tbUsername = t.getElementById("targetbayReviewUsername").value,
                        tbrForm.tbEmail = t.getElementById("targetbayReviewEmail").value)
                } else
                    n = t.getElementById("targetbayQuestion").value,
                    "" === d && t.getElementById("targetbayQuestionUsername") && t.getElementById("targetbayQuestionEmail") && (tbrForm.tbUsername = t.getElementById("targetbayQuestionUsername").value,
                        tbrForm.tbEmail = t.getElementById("targetbayQuestionEmail").value);
                if ("review" === l) {
                    var c = t.getElementById("title_validator").value;
                    "" === s ? (t.getElementById("targetbay_rating_error").style.display = "block",
                        i = 1) : t.getElementById("targetbay_rating_error").style.display = "none",
                        "" === o && "yes" === c ? (t.getElementById("targetbay_review_title_error").style.display = "block",
                            i = 1) : t.getElementById("targetbay_review_title_error").style.display = "none",
                        "" === n ? (t.getElementById("targetbay_review_error").style.display = "block",
                            i = 1) : t.getElementById("targetbay_review_error").style.display = "none",
                    "" === d && (t.getElementById("targetbay_review_name_invalid") && t.getElementById("targetbay_review_name_error") && ("" === tbrForm.tbUsername ? (t.getElementById("targetbay_review_name_invalid").style.display = "none",
                        t.getElementById("targetbay_review_name_error").style.display = "block",
                        i = 1) : tbrForm.validateName(tbrForm.tbUsername) ? (t.getElementById("targetbay_review_name_error").style.display = "none",
                        t.getElementById("targetbay_review_name_invalid").style.display = "none") : (t.getElementById("targetbay_review_name_error").style.display = "none",
                        t.getElementById("targetbay_review_name_invalid").style.display = "block",
                        i = 1)),
                    t.getElementById("targetbay_review_email_invalid") && t.getElementById("targetbay_review_email_error") && ("" === tbrForm.tbEmail ? (t.getElementById("targetbay_review_email_invalid").style.display = "none",
                        t.getElementById("targetbay_review_email_error").style.display = "block",
                        i = 1) : tbrForm.validateEmail(tbrForm.tbEmail) ? (t.getElementById("targetbay_review_email_error").style.display = "none",
                        t.getElementById("targetbay_review_email_invalid").style.display = "none") : (t.getElementById("targetbay_review_email_error").style.display = "none",
                        t.getElementById("targetbay_review_email_invalid").style.display = "block",
                        i = 1)))
                } else
                    "" === n ? (t.getElementById("targetbay_question_error").style.display = "block",
                        i = 1) : t.getElementById("targetbay_question_error").style.display = "none",
                    "" === d && (t.getElementById("targetbay_question_name_error") && ("" === tbrForm.tbUsername ? (t.getElementById("targetbay_question_name_error").style.display = "block",
                        i = 1) : t.getElementById("targetbay_question_name_error").style.display = "none"),
                    t.getElementById("targetbay_question_email_invalid") && t.getElementById("targetbay_question_email_error") && ("" === tbrForm.tbEmail ? (t.getElementById("targetbay_question_email_invalid").style.display = "none",
                        t.getElementById("targetbay_question_email_error").style.display = "block",
                        i = 1) : tbrForm.validateEmail(tbrForm.tbEmail) ? (t.getElementById("targetbay_question_email_error").style.display = "none",
                        t.getElementById("targetbay_question_email_invalid").style.display = "none") : (t.getElementById("targetbay_question_email_error").style.display = "none",
                        t.getElementById("targetbay_question_email_invalid").style.display = "block",
                        i = 1)));
                if (1 == i && ("review" === l ? (t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "block",
                    t.getElementById("tbProductReviews-reviewForm").className += " tbSiteReviews-tbReviewFormError",
                    t.getElementById("tbProductReviews-reviewForm").scrollIntoView()) : (t.getElementsByClassName("tbProductReviews-formErrorLabel")[1].style.display = "block",
                    t.getElementById("tbProductReviews-questionForm").className += " tbSiteReviews-tbReviewFormError",
                    t.getElementById("tbProductReviews-questionForm").scrollIntoView())),
                0 === i) {
                    var u = new FormData,
                        y = t.getElementById("targetbayReviewUpload");
                    if (null !== y)
                        for (var p = y.files, m = 0; m < p.length; m++) {
                            p[m];
                            u.append("reviewupload[]", p[m])
                        }
                    if (r.userName = "" !== r.userName && null !== r.userName ? r.userName : "anonymous",
                        u.append("index_name", tbrForm.tbkey),
                        u.append("product_id", tbrForm.tbProductId),
                        u.append("product_name", tbrForm.tbProductName),
                        u.append("user_id", tbrForm.tbUserId),
                        u.append("user_name", tbrForm.tbUsername),
                        u.append("user_email", tbrForm.tbEmail),
                        u.append("user_avatar", tbrForm.tbAvatar),
                        u.append("review_rating", s),
                        u.append("review_title", o),
                        u.append("review", n),
                        u.append("template_type", l),
                        u.append("product_image_url", tbrForm.tbProductImageUrl),
                        u.append("product_page_url", tbrForm.tbProductUrl),
                        u.append("user_type", r.userName),
                        u.append("title_validator", c),
                    "review" === l) {
                        t.getElementsByClassName("tbProductReviews-formErrorLabel")[0].style.display = "none",
                            t.getElementById("tbProductReviews-reviewForm").className = "tbProductReviews-tbReviewForm";
                        for (var m = 0; m < b.length; m++)
                            b[m].checked && (b[m].checked = !1);
                        t.getElementById("targetbayReviewTitle").value = "",
                            t.getElementById("targetbayReview").value = "",
                        null !== y && (t.getElementById("targetbayReviewUpload").value = "",
                            t.getElementById("targetbay_review_upload_error").style.display = "none",
                            t.getElementById("targetbay_review_upload_filetype_error").style.display = "none",
                            t.getElementsByClassName("tbSiteReviews-clientUploadImage")[0].innerHTML = ""),
                        "" === d && t.getElementById("targetbayReviewUsername") && t.getElementById("targetbayReviewEmail") && (t.getElementById("targetbayReviewUsername").value = "",
                            t.getElementById("targetbayReviewEmail").value = ""),
                            t.getElementsByClassName("c-loader")[0].style.display = "block"
                    } else
                        t.getElementsByClassName("tbProductReviews-formErrorLabel")[1].style.display = "none",
                            t.getElementById("tbProductReviews-questionForm").className = "tbProductReviews-tbReviewForm",
                            t.getElementById("targetbayQuestion").value = "",
                        "" === d && t.getElementById("targetbayQuestionUsername") && t.getElementById("targetbayQuestionEmail") && (t.getElementById("targetbayQuestionUsername").value = "",
                            t.getElementById("targetbayQuestionEmail").value = ""),
                            t.getElementsByClassName("c-loader")[1].style.display = "block";
                    var v = new XMLHttpRequest;
                    v.open("POST", tbrForm.reviewUrl),
                        v.onreadystatechange = function () {
                            if (4 === v.readyState && 200 === v.status) {
                                var r = JSON.parse(v.responseText);
                                "success" === r.msg && "review" === l ? (t.getElementsByClassName("c-loader")[0].style.display = "none",
                                    t.getElementById("tbProductReviews-reviewForm").style.display = "none",
                                    t.getElementById("targetbay_review_success").style.display = "block",
                                    t.getElementById("targetbay_question_success").style.display = "none",
                                    t.getElementById("targetbay_review_success").scrollIntoView(),
                                    e.setTimeout(function () {
                                        t.getElementById("targetbay_review_success").style.display = "none",
                                            t.getElementById("tbProductReviews").scrollIntoView()
                                    }, 3e3)) : "success" === r.msg && "qa" === l ? (t.getElementsByClassName("c-loader")[1].style.display = "none",
                                    t.getElementById("tbProductReviews-questionForm").style.display = "none",
                                    t.getElementById("targetbay_review_success").style.display = "none",
                                    t.getElementById("targetbay_question_success").style.display = "block",
                                    t.getElementById("targetbay_question_success").scrollIntoView(),
                                    e.setTimeout(function () {
                                        t.getElementById("targetbay_question_success").style.display = "none",
                                            t.getElementById("tbProductReviews").scrollIntoView()
                                    }, 3e3)) : "error" === r.msg && (t.getElementsByClassName("c-loader")[0].style.display = "none",
                                    t.getElementById("tbProductReviews-reviewForm").style.display = "block",
                                    t.getElementById("targetbay_review_error").style.display = "block",
                                    t.getElementById("targetbay_question_success").style.display = "none",
                                    t.getElementById("targetbay_review_error").innerHTML = r.content,
                                    t.getElementById("targetbay_review_error").scrollIntoView(),
                                    e.setTimeout(function () {
                                        t.getElementById("targetbay_review_error").style.display = "block",
                                            t.getElementById("tbProductReviews").scrollIntoView()
                                    }, 3e3))
                            }
                        },
                        v.send(u)
                }
            },
            tbrForm.tbTabClick = function (n, i, s) {
                if ("v2" == r.apiVersion || r.platform !== a && "mg2" === r.platform) {
                    var o = t.getElementById("tab-label-tracking-product-review");
                    o && (o.className = "data item title active",
                        t.getElementById("tracking-product-review").style.display = "block");
                    var l = t.getElementById("tab-label-product.info.description");
                    l && (l.className = "data item title",
                        t.getElementById("product.info.description").style.display = "none");
                    var d = t.getElementById("tab-label-product.info.how.to.use");
                    d && (d.className = "data item title",
                        t.getElementById("product.info.how.to.use").style.display = "none");
                    var g = t.getElementById("tab-label-product.info.shipping.returns");
                    g && (g.className = "data item title",
                        t.getElementById("product.info.shipping.returns").style.display = "none");
                    var b = t.getElementById("tab-label-product.info.review.form");
                    b !== a && null !== b && (b.className = "data item title allow active",
                        t.getElementById("product.info.review.form").style.display = "block");
                    var m = t.getElementById("tab-label-description");
                    m !== a && null !== m && (m.className = "data item title",
                        t.getElementById("description").style.display = "none");
                    var c = t.getElementById("tab-label-product.info.features.tab");
                    c !== a && null !== c && (c.className = "data item title",
                        t.getElementById("product.info.features.tab").style.display = "none");
                    var u = t.getElementById("tab-label-product.info.specifications.tab");
                    u !== a && null !== u && (u.className = "data item title",
                        t.getElementById("product.info.specifications.tab").style.display = "none");
                    var y = t.getElementById("tab-label-attachment.tab.new");
                    y !== a && null !== y && (y.className = "data item title",
                        t.getElementById("attachment.tab.new").style.display = "none");
                    var p = t.getElementById("tab-label-product.info.prop65.tab");
                    p !== a && null !== p && (p.className = "data item title",
                        t.getElementById("product.info.prop65.tab").style.display = "none")
                }
                var v = e.location.href;
                if (v.indexOf("htmia") !== -1) {
                    var _ = t.getElementById("Description_tab");
                    _ && (_.classList.remove("active"),
                        t.getElementById("Description").style.display = "none");
                    var f = t.getElementById("Specifications_tab");
                    f && (f.classList.remove("active"),
                        t.getElementById("Specifications").style.display = "none");
                    var E = t.getElementById("Reviews_tab");
                    E && ("DIV" === E.tagName ? E.className = "tab mob-custom active" : "BUTTON" === E.tagName && (E.className = "tablinks active"),
                        t.getElementById("Reviews").style.display = "block");
                    var w = t.getElementById("Warranty_tab");
                    w && (w.classList.remove("active"),
                        t.getElementById("Warranty").style.display = "none");
                    var I = t.getElementsByClassName("Cusomize-buy");
                    if (I.length) {
                        for (var h = 0; h < I.length; h++)
                            I[h].className = "tablinks Cusomize-buy";
                        t.getElementById("Cusomize-buy").style.display = "none"
                    }
                }
                if (v.indexOf("impactbattery") !== -1) {
                    var _ = t.getElementById("product_tabs_description_tabbed");
                    _ && (_.className = "first");
                    var B = t.getElementById("product_tabs_additional_tabbed");
                    B && (B.className = "");
                    var C = t.getElementById("product_tabs_upsell_products_tabbed");
                    C && (C.className = "");
                    var k = t.getElementById("product_tabs_cms");
                    k && (k.className = "");
                    var E = t.getElementById("product_tabs_review_tabbed");
                    E && (E.className = "active");
                    for (var R = t.querySelectorAll("button.accordions"), M = t.querySelectorAll("#product_review_tab .block-content"), F = t.getElementById("product_review_btn"), S = t.getElementById("product_review_tab"), T = "", P = 0; P < R.length; P++)
                        R[P].classname = "accordion";
                    for (var x = 0; x < M.length; x++)
                        T = M[x].clientHeight;
                    F && (F.className += " active"),
                    S && (S.style.maxHeight = T + "px")
                }
                if (v.indexOf("dealsallyear") !== -1) {
                    var N = t.getElementById("product_tabs_accessories");
                    N && (N.className = "",
                        t.getElementById("product_tabs_accessories_contents").style.display = "none");
                    var L = t.getElementById("product_tabs_in_box");
                    L && (L.className = "first",
                        t.getElementById("product_tabs_in_box_contents").style.display = "none");
                    var A = t.getElementById("product_tabs_description");
                    A && (A.className = "",
                        t.getElementById("product_tabs_description_contents").style.display = "none");
                    var q = t.getElementById("product_tabs_specifications");
                    q && (q.className = "",
                        t.getElementById("product_tabs_specifications_contents").style.display = "none");
                    var U = t.getElementById("product_tabs_review");
                    U && (U.className = "active",
                        t.getElementById("product_tabs_reviews_contents").style.display = "block")
                }
                if (v.indexOf("hdbuttercup") !== -1) {
                    var D = t.getElementById("targetbay_reviews");
                    D !== a && null !== D && (D.style.display = "block")
                }
                if (v.indexOf("directcolors") !== -1) {
                    var A = t.getElementById("tab-title-description");
                    A && (A.classList.remove("active"),
                        t.getElementById("tab-description").style.display = "none");
                    var O = t.getElementById("tab-title-additional_information");
                    O && (O.classList.remove("active"),
                        t.getElementById("tab-additional_information").style.display = "none");
                    var V = t.getElementById("tab-title-tab-concrete-acid-stain-color-chart");
                    V && (V.classList.remove("active"),
                        t.getElementById("tab-tab-concrete-acid-stain-color-chart").style.display = "none");
                    var U = t.getElementById("tab-title-reviews");
                    U && (U.classList.add("active"),
                        t.getElementById("tab-reviews").style.display = "block")
                }
                if ("tbQuestionSection" === n)
                    "scroll" === i && (console.log("scroll in"),
                        t.getElementsByClassName("tbProductReviews-tbTabNavBar")[0].scrollIntoView()),
                        t.getElementById("tbReviewSection").style.display = "none",
                        t.getElementById("tbQuestionSection").style.display = "block",
                        t.getElementsByClassName("tb_tablinks")[0].classList.remove("active"),
                    t.getElementsByClassName("tb_tablinks")[1] !== a && t.getElementsByClassName("tb_tablinks")[1].classList.add("active"),
                    null !== t.getElementById("tb-sort-reviews") && t.getElementById("tb-sort-reviews") !== a && (t.getElementById("tb-sort-qa").style.display = null,
                        t.getElementById("tb-sort-reviews").style.display = "none",
                        t.getElementById("tb-sort-for").value = "tb_qa");
                else if ("tbReviewSection" === n) {
                    var v = e.location.href;
                    "scroll" === i && (console.log("scroll in"),
                        t.getElementsByClassName("tbProductReviews-tbTabNavBar")[0].scrollIntoView()),
                        t.getElementById("tbQuestionSection").style.display = "none",
                        t.getElementById("tbReviewSection").style.display = "block",
                    t.getElementsByClassName("tb_tablinks")[1] !== a && t.getElementsByClassName("tb_tablinks")[1].classList.remove("active"),
                        t.getElementsByClassName("tb_tablinks")[0].classList.add("active"),
                    null !== t.getElementById("tb-sort-reviews") && t.getElementById("tb-sort-reviews") !== a && (t.getElementById("tb-sort-reviews").style.display = null,
                        t.getElementById("tb-sort-qa").style.display = "none",
                        t.getElementById("tb-sort-for").value = "tb_reviews")
                }
                var H;
                if (H = !!(navigator.userAgent.match(/Android/i) || navigator.vendor.indexOf("Apple") > -1 || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)),
                s && !H) {
                    var W = 200,
                        v = e.location.href;
                    v.indexOf("jafgifts") !== -1 && (W = 300);
                    var $ = e.scrollY;
                    $ && W && e.scroll(0, $ - W)
                }
                var G;
                "tbReviewSection" == n ? G = "review" : "tbQuestionSection" == n && (G = "qa"),
                    tbwTrack.reviewUserTrack(G)
            },
            tbrForm.tbCommentToggle = function (e) {
                var r = t.getElementById("comment-toggl-list-" + e);
                "block" === r.style.display || "" === r.style.display ? r.style.display = "none" : r.style.display = "block"
            },
            tbrForm.tbReviewShow = function (n, i, s) {
                if ("v2" === r.apiVersion || r.platform !== a && "mg2" === r.platform) {
                    var o = t.getElementById("tab-label-tracking-product-review");
                    o && (o.className = "data item title active",
                        t.getElementById("tracking-product-review").style.display = "block");
                    var l = t.getElementById("tab-label-product.info.description");
                    l && (l.className = "data item title",
                        t.getElementById("product.info.description").style.display = "none");
                    var d = t.getElementById("tab-label-product.info.how.to.use");
                    d && (d.className = "data item title",
                        t.getElementById("product.info.how.to.use").style.display = "none");
                    var g = t.getElementById("tab-label-product.info.shipping.returns");
                    g && (g.className = "data item title",
                        t.getElementById("product.info.shipping.returns").style.display = "none");
                    var b = t.getElementById("tab-label-product.info.review.form");
                    b !== a && null !== b && (b.className = "data item title allow active",
                        t.getElementById("product.info.review.form").style.display = "block");
                    var m = t.getElementById("tab-label-description");
                    m !== a && null !== m && (m.className = "data item title",
                        t.getElementById("description").style.display = "none");
                    var c = t.getElementById("tab-label-product.info.features.tab");
                    c !== a && null !== c && (c.className = "data item title",
                        t.getElementById("product.info.features.tab").style.display = "none");
                    var u = t.getElementById("tab-label-product.info.specifications.tab");
                    u !== a && null !== u && (u.className = "data item title",
                        t.getElementById("product.info.specifications.tab").style.display = "none");
                    var y = t.getElementById("tab-label-attachment.tab.new");
                    y !== a && null !== y && (y.className = "data item title",
                        t.getElementById("attachment.tab.new").style.display = "none");
                    var p = t.getElementById("tab-label-product.info.prop65.tab");
                    p !== a && null !== p && (p.className = "data item title",
                        t.getElementById("product.info.prop65.tab").style.display = "none")
                }
                var v = e.location.href;
                if (v.indexOf("htmia") !== -1) {
                    var _ = t.getElementById("Description_tab");
                    _ && (_.classList.remove("active"),
                        t.getElementById("Description").style.display = "none");
                    var f = t.getElementById("Specifications_tab");
                    f && (f.classList.remove("active"),
                        t.getElementById("Specifications").style.display = "none");
                    var E = t.getElementById("Reviews_tab");
                    E && ("DIV" === E.tagName ? E.className = "tab mob-custom active" : "BUTTON" === E.tagName && (E.className = "tablinks active"),
                        t.getElementById("Reviews").style.display = "block");
                    var w = t.getElementById("Warranty_tab");
                    w && (w.classList.remove("active"),
                        t.getElementById("Warranty").style.display = "none");
                    var I = t.getElementsByClassName("Cusomize-buy");
                    if (I.length) {
                        for (var h = 0; h < I.length; h++)
                            I[h].className = "tablinks Cusomize-buy";
                        t.getElementById("Cusomize-buy").style.display = "none"
                    }
                }
                if (v.indexOf("impactbattery") !== -1) {
                    var _ = t.getElementById("product_tabs_description_tabbed");
                    _ && (_.className = "first");
                    var B = t.getElementById("product_tabs_additional_tabbed");
                    B && (B.className = "");
                    var C = t.getElementById("product_tabs_upsell_products_tabbed");
                    C && (C.className = "");
                    var k = t.getElementById("product_tabs_cms");
                    k && (k.className = "");
                    var E = t.getElementById("product_tabs_review_tabbed");
                    E && (E.className = "active");
                    for (var R = t.querySelectorAll("button.accordions"), M = t.querySelectorAll("#product_review_tab .block-content"), F = t.getElementById("product_review_btn"), S = t.getElementById("product_review_tab"), T = "", P = 0; P < R.length; P++)
                        R[P].classname = "accordion";
                    for (var x = 0; x < M.length; x++)
                        T = M[x].clientHeight;
                    F && (F.className += " active"),
                    S && (S.style.maxHeight = T + "px")
                }
                if (v.indexOf("dealsallyear") !== -1) {
                    var N = t.getElementById("product_tabs_accessories");
                    N && (N.className = "",
                        t.getElementById("product_tabs_accessories_contents").style.display = "none");
                    var L = t.getElementById("product_tabs_in_box");
                    L && (L.className = "",
                        t.getElementById("product_tabs_in_box_contents").style.display = "none");
                    var A = t.getElementById("product_tabs_description");
                    A && (A.className = "",
                        t.getElementById("product_tabs_description_contents").style.display = "none");
                    var q = t.getElementById("product_tabs_specifications");
                    q && (q.className = "",
                        t.getElementById("product_tabs_specifications_contents").style.display = "none");
                    var U = t.getElementById("product_tabs_review");
                    U && (U.className = "active",
                        t.getElementById("product_tabs_reviews_contents").style.display = "block")
                }
                if (v.indexOf("hdbuttercup") !== -1) {
                    var D = t.getElementById("targetbay_reviews");
                    D !== a && null !== D && (D.style.display = "block")
                }
                if (v.indexOf("directcolors") !== -1) {
                    var A = t.getElementById("tab-title-description");
                    A && (A.classList.remove("active"),
                        t.getElementById("tab-description").style.display = "none");
                    var O = t.getElementById("tab-title-additional_information");
                    O && (O.classList.remove("active"),
                        t.getElementById("tab-additional_information").style.display = "none");
                    var V = t.getElementById("tab-title-tab-concrete-acid-stain-color-chart");
                    V && (V.classList.remove("active"),
                        t.getElementById("tab-tab-concrete-acid-stain-color-chart").style.display = "none");
                    var U = t.getElementById("tab-title-reviews");
                    U && (U.classList.add("active"),
                        t.getElementById("tab-reviews").style.display = "block")
                }
                for (var x = 0; x < t.getElementsByClassName("targetbayProductReviewsError").length; x++)
                    t.getElementsByClassName("targetbayProductReviewsError")[x].style.display = "none";
                if ("review" === n ? (t.getElementsByClassName("c-loader")[0].style.display = "block",
                    e.setTimeout(function () {
                        t.getElementsByClassName("c-loader")[0].style.display = "none"
                    }, 1e3),
                    t.getElementById("tbProductReviews-reviewForm").className = "tbProductReviews-tbReviewForm",
                    t.getElementById("tbProductReviews-reviewForm").style.display = "block",
                    t.getElementById("tbProductReviews-questionForm").style.display = "none",
                    t.getElementById("targetbayTemplateType").value = n,
                    t.getElementById("tbReviewSection").style.display = "block",
                    t.getElementById("tbQuestionSection").style.display = "none",
                t.getElementsByClassName("tb_tablinks")[1] !== a && (t.getElementsByClassName("tb_tablinks")[1].className = "tb_tablinks"),
                    t.getElementsByClassName("tb_tablinks")[0].classList.add("active"),
                    tbrForm.tbTabClick("tbReviewSection", "noscroll", 0)) : (t.getElementsByClassName("c-loader")[1].style.display = "block",
                    e.setTimeout(function () {
                        t.getElementsByClassName("c-loader")[1].style.display = "none"
                    }, 1e3),
                    t.getElementById("tbProductReviews-questionForm").className = "tbProductReviews-tbReviewForm",
                    t.getElementById("tbProductReviews-reviewForm").style.display = "none",
                    t.getElementById("tbProductReviews-questionForm").style.display = "block",
                    t.getElementById("targetbayTemplateType").value = n,
                    t.getElementById("tbReviewSection").style.display = "none",
                    t.getElementById("tbQuestionSection").style.display = "block",
                    t.getElementsByClassName("tb_tablinks")[0].className = "tb_tablinks",
                t.getElementsByClassName("tb_tablinks")[1] !== a && t.getElementsByClassName("tb_tablinks")[1].classList.add("active"),
                    tbrForm.tbTabClick("tbQuestionSection", "noscroll", 0)),
                "scroll" === i) {
                    "review" === n ? t.getElementById("tbProductReviews-reviewForm").scrollIntoView() : t.getElementById("tbProductReviews-questionForm").scrollIntoView(),
                        console.log("fixed header - " + t.querySelectorAll(".navbar-fixed-top").length);
                    var H;
                    if (H = !!(navigator.userAgent.match(/Android/i) || navigator.vendor.indexOf("Apple") > -1 || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)),
                    s && !H) {
                        var W = 200,
                            $ = e.scrollY;
                        $ && W && e.scroll(0, $ - W)
                    }
                }
            },
            tbrForm.tbCloseForm = function (e) {
                "review" === e ? t.getElementById("tbProductReviews-reviewForm").style.display = "none" : "qa" === e && (t.getElementById("tbProductReviews-questionForm").style.display = "none"),
                    t.getElementById("tbProductReviews").scrollIntoView()
            },
            tbrForm.tbQaAnswersToggle = function (e) {
                var r = t.getElementById("qa-answers-toggl-list-" + e);
                "block" === r.style.display || "" === r.style.display ? r.style.display = "none" : r.style.display = "block"
            },
            tbrForm.tbWriteReview = function () {
                t.getElementById("targetbay_reviews").scrollIntoView(!1)
            },
            tbrForm.insertAfter = function (e, r) {
                var a = r.nextSibling,
                    n = r.parentNode,
                    i = t.createElement("div");
                i.innerHTML = e;
                var s = i.firstChild;
                return a ? n.insertBefore(s, a) : n.appendChild(s)
            },
            tbrForm.setCookie = function (e, r) {
                t.cookie = e + "=" + r + "; path=/"
            },
            tbrForm.getCookie = function (e) {
                for (var r = e + "=", a = t.cookie.split(";"), n = 0; n < a.length; n++) {
                    for (var i = a[n];
                         " " === i.charAt(0);)
                        i = i.substring(1);
                    if (0 === i.indexOf(r))
                        return i.substring(r.length, i.length)
                }
                return ""
            },
            tbrForm.getCookieDecode = function (e, r) {
                for (var n = e + "=", i = t.cookie.split(";"), s = 0; s < i.length; s++) {
                    for (var o = i[s];
                         " " === o.charAt(0);)
                        o = o.substring(1);
                    if (0 === o.indexOf(n))
                        for (var l = o.substring(n.length, o.length), d = tbrForm.b64DecodeUnicode(l), g = d.split("&"), b = 0; b < g.length; b++) {
                            var m = g[b].split("=");
                            if ("" !== m[0] && m[0] !== a && m[0] === r)
                                return m[1]
                        }
                }
                return ""
            },
            tbrForm.b64DecodeUnicode = function (e) {
                var t = e.replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&"),
                    r = decodeURIComponent(atob(t).split("").map(function (e) {
                        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                    }).join(""));
                return r
            },
            tbrForm.voteReview = function (e, r) {
                var n = "&index_name=" + tbrForm.tbkey + "&review_id=" + r + "&vote=" + e + "&user_id=" + tbrForm.tbUserId,
                    i = new XMLHttpRequest;
                i.open("GET", tbrForm.reviewVoteUrl + n),
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    i.onreadystatechange = function () {
                        if (4 === i.readyState && 200 === i.status) {
                            var e = JSON.parse(i.responseText),
                                n = "person";
                            e.yes_count > 1 && (n = "people");
                            var s = t.getElementsByClassName("tb-product-review-vote-" + r).length,
                                o = "block";
                            if (0 == e.yes_count && (o = "none"),
                            s > 0)
                                for (var l = 0; l < s; l++)
                                    t.getElementsByClassName("tb-product-review-vote-" + r)[l].style.display = o;
                            var d = t.getElementById("targetbay-review-yes-count-" + r);
                            if (d && (t.getElementById("targetbay-review-yes-count-" + r).innerHTML = e.yes_count + " " + n + " found this helpful"),
                                d = t.getElementsByClassName("targetbay-product-review-yes-count-" + r).length,
                            d > 0)
                                for (var g = 0; g < d; g++)
                                    t.getElementsByClassName("targetbay-product-review-yes-count-" + r)[g].innerHTML = e.yes_count + " " + n + " found this helpful";
                            if (d = t.getElementsByClassName("targetbay-popup-review-yes-count-" + r).length,
                            d > 0)
                                for (var g = 0; g < d; g++)
                                    t.getElementsByClassName("targetbay-popup-review-yes-count-" + r)[g].innerHTML = e.yes_count + " " + n + " found this helpful";
                            if (null !== t.getElementById("tb-review-yes-count-" + r) && t.getElementById("tb-review-yes-count-" + r) !== a && null !== t.getElementById("tb-review-all-count-" + r) && t.getElementById("tb-review-all-count-" + r) !== a) {
                                var b = parseInt(e.yes_count) + parseInt(e.no_count);
                                t.getElementById("tb-review-yes-count-" + r).innerHTML = e.yes_count,
                                    t.getElementById("tb-review-all-count-" + r).innerHTML = b
                            }
                            tbwTrack.reviewUserTrack("review")
                        }
                    },
                    i.send()
            },
            tbrForm.voteQA = function (e, r, a) {
                var n = "&index_name=" + tbrForm.tbkey + "&qa_id=" + r + "&vote=" + e + "&qa_index=" + a + "&user_id=" + tbrForm.tbUserId,
                    i = new XMLHttpRequest;
                i.open("GET", tbrForm.qaVoteUrl + n),
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    i.onreadystatechange = function () {
                        if (4 === i.readyState && 200 === i.status) {
                            var e = JSON.parse(i.responseText),
                                n = "person";
                            e.yes_count > 1 && (n = "people");
                            var s = t.getElementsByClassName("tb-product-qa-vote-" + a + "-" + r).length,
                                o = "block";
                            if (0 == e.yes_count && (o = "none"),
                            s > 0)
                                for (var l = 0; l < s; l++)
                                    t.getElementsByClassName("tb-product-qa-vote-" + a + "-" + r)[l].style.display = o;
                            t.getElementById("targetbay-question-yes-count-" + a + "-" + r).innerHTML = e.yes_count + " " + n + " found this helpful",
                                t.getElementById("targetbay-question-no-count-" + a + "-" + r).innerHTML = e.no_count,
                                tbwTrack.reviewUserTrack("qa")
                        }
                    },
                    i.send()
            },
            tbrForm.addImg = function (e) {
                var r = t.createElement("img");
                r.setAttribute("src", e.target.result),
                    r.setAttribute("title", "Client uploaded image"),
                    r.setAttribute("class", "tbImageResponsive");
                var a = t.createElement("div");
                a.setAttribute("class", "tbImageuploadsec"),
                    a.appendChild(r),
                    t.getElementsByClassName("tbSiteReviews-clientUploadImage")[0].appendChild(a)
            },
            tbrForm.showReviewImagePopup = function (r, n) {
                t.getElementById("user-image-" + r + "-" + n).style.display = "block",
                null !== t.getElementById("tb-review-popup-admincomment-button-" + r + "-" + n) && t.getElementById("tb-review-popup-admincomment-button-" + r + "-" + n) !== a && (t.getElementById("tb-review-popup-admincomment-button-" + r + "-" + n).style.display = "block",
                    t.getElementById("tb-more-comments-" + r + "-" + n).style.display = "none"),
                    t.onkeydown = function (a) {
                        a = a || e.event,
                        27 == a.keyCode && (t.getElementById("user-image-" + r + "-" + n).style.display = "none")
                    }
            },
            tbrForm.closeReviewImagePopup = function (e, r) {
                t.getElementById("user-image-" + e + "-" + r).style.display = "none",
                null !== t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) && t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) !== a && (t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r).style.display = "block",
                    t.getElementById("tb-more-comments-" + e + "-" + r).style.display = "none")
            },
            tbrForm.showComments = function (e, r) {
                null !== t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) && t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) !== a && (t.getElementById("tb-more-comments-" + e + "-" + r).style.display = "block",
                    t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r).style.display = "none")
            },
            tbrForm.clearErrorDisplay = function () {
                var e = tbrForm.getCookie("user_loggedin"),
                    r = tbrForm.getCookie("tb_fetch_points");
                r !== a && null !== r && "" !== r && "" === e && (e = tbrForm.getCookieDecode("tb_fetch_points", "_ulogin")),
                "" === e && t.getElementById("targetbay_review_name_error") && t.getElementById("targetbay_review_email_error") && (t.getElementById("targetbay_review_name_error").style.display = "none",
                    t.getElementById("targetbay_review_email_error").style.display = "none"),
                t.getElementById("targetbay_rating_error") && (t.getElementById("targetbay_rating_error").style.display = "none"),
                t.getElementById("targetbay_review_email_invalid") && (t.getElementById("targetbay_review_email_invalid").style.display = "none"),
                t.getElementById("targetbay_review_name_invalid") && (t.getElementById("targetbay_review_name_invalid").style.display = "none"),
                t.getElementById("targetbay_review_title_error") && (t.getElementById("targetbay_review_title_error").style.display = "none"),
                t.getElementById("targetbay_review_error") && (t.getElementById("targetbay_review_error").style.display = "none")
            },
            tbrForm.setReviewCookie = function (e, r) {
                var a = new Date,
                    n = a.getTime();
                n += 36e6,
                    a.setTime(n),
                    t.cookie = e + "=" + r + "; expires=" + a.toUTCString() + ";path=/"
            },
            tbrForm.PopUpShow = function (e) {
                tbwTrack.reviewUserTrack("review");
                var r = t.getElementById("TbReviewSection" + e);
                r.style.display = "block",
                    r.className += " inn",
                    t.getElementById("hidden_popup_check").value = "popup_visible"
            },
            tbrForm.PopUpClose = function (e) {
                var r = t.getElementById("TbReviewSection" + e);
                r.classList.remove("inn"),
                    setTimeout(function () {
                        r.style.display = "none"
                    }, 500),
                    t.getElementById("hidden_popup_check").value = "popup_invisible",
                    tbrForm.displayNextReview()
            },
            tbrForm.imgClose = function (e) {
                t.getElementById("showTBReviewPopup" + e).classList.add("tb-rev-hidden"),
                    setTimeout(function () {
                        t.getElementById("showTBReviewPopup" + e).style.display = "none"
                    }, 1e3)
            },
            tbrForm.initiateReviewPopupWidget = function (e, t, r) {
                var n = tbrForm.getCurrentPage();
                (e.product_id !== a && "" !== e.product_id || "product_pages" === n) && e.settings["page-type"].includes("product_pages") && (e.currentPageCookieReviewId = "tb_product_" + e.product_id + "_current_review_" + tbrForm.rpTitle,
                    e.cookieTotalReviewsCountName = "tb_product_" + e.product_id + "_total_reviews_count_" + tbrForm.rpTitle,
                    tbrForm.loadReviewPopupWidget(e, t, r)),
                (e.category_id !== a && "" !== e.category_id || "category_pages" === n) && e.settings["page-type"].includes("category_pages") && (e.currentPageCookieReviewId = "tb_category_" + e.category_id + "_current_review_" + tbrForm.rpTitle,
                    e.cookieTotalReviewsCountName = "tb_category_" + e.category_id + "_total_reviews_count_" + tbrForm.rpTitle,
                    tbrForm.loadReviewPopupWidget(e, t, r)),
                n !== a && "home_page" === n && e.settings["page-type"].includes("home_page") && (e.currentPageCookieReviewId = "tb_home_current_review_" + tbrForm.rpTitle,
                    e.cookieTotalReviewsCountName = "tb_home_total_reviews_count_" + tbrForm.rpTitle,
                    tbrForm.loadReviewPopupWidget(e, t, r)),
                n !== a && "cart_page" === n && e.settings["page-type"].includes("cart_page") && (e.currentPageCookieReviewId = "tb_cart_current_review_" + tbrForm.rpTitle,
                    e.cookieTotalReviewsCountName = "tb_cart_total_reviews_count_" + tbrForm.rpTitle,
                    tbrForm.loadReviewPopupWidget(e, t, r)),
                    tbrForm.setReviewCookie(e.currentPageCookieReviewId, parseInt(t) + 1)
            },
            tbrForm.getCurrentPage = function () {
                var e = "";
                return tbConfig.productId !== a && "" !== tbConfig.productId && (e = "product_pages"),
                tbConfig.categoryId !== a && "" !== tbConfig.categoryId && (e = "category_pages"),
                "" === e && (e = tbrForm.getCurrentPageFromUrl()),
                    e
            },
            tbrForm.getCurrentPageFromUrl = function () {
                var t = e.location.pathname,
                    r = "home_page";
                return "/" === t && (r = "home_page"),
                t.indexOf("category") === -1 && t.indexOf("collections") === -1 || (r = "category_pages"),
                t.indexOf("products") !== -1 && (r = "product_pages"),
                t.indexOf("cart") === -1 && t.indexOf("checkout") === -1 || (r = "cart_page"),
                    r
            },
            tbrForm.loadReviewPopupWidget = function (r, n, i) {
                var s = r.total_reviews_count,
                    o = r.limit_total_reviews_count;
                r.rpFrom = n,
                    tbrForm.setReviewCookie(r.cookieTotalReviewsCountName, parseInt(s));
                var l = parseInt(n) + 1,
                    d = 1e3 * r.settings["first-display"],
                    g = 1e3 * r.settings["display-period"],
                    b = 1e3 * r.settings["time-gap"];
                n >= 25 && (d = b);
                var m = r.settings["popup-position"];
                tbrForm.setReviewCookie(r.currentPageCookieReviewId, Number(l));
                var c = e.setInterval(function () {
                    tbrForm.viewImage(),
                        clearInterval(c),
                        tbrForm.displayImageInterval()
                }, d);
                tbrForm.displayImageInterval = function () {
                    var n = tbrForm.getCookie(r.currentPageCookieReviewId),
                        i = e.setInterval(function () {
                            if (tbrForm.hideImage(n),
                                clearInterval(i),
                                tbrForm.setReviewCookie(r.currentPageCookieReviewId, n),
                            "popup_invisible" === t.getElementById("hidden_popup_check").value) {
                                if (parseInt(n) >= parseInt(s))
                                    return console.log("case1"),
                                        tbrForm.reviewWidgetPopupData(0, 25, "ajax_call"),
                                        !0;
                                if (parseInt(s) <= 25) {
                                    if (parseInt(n) == parseInt(o))
                                        return console.log("case2"),
                                            tbrForm.reviewWidgetPopupData(0, 25, "ajax_call"),
                                            !0
                                } else {
                                    var e = parseInt(r.rpFrom) + parseInt(o);
                                    if (parseInt(n) == parseInt(e)) {
                                        var l = 0;
                                        typeof r.total_reviews_count !== a && r.total_reviews_count > 0 && (l = r.total_reviews_count);
                                        var d = parseInt(r.rpFrom) + 25;
                                        b = d >= l ? 0 : d;
                                        var g = 25;
                                        return tbrForm.setReviewCookie(r.currentPageCookieReviewId, b + 1),
                                            console.log("case3"),
                                            tbrForm.reviewWidgetPopupData(b, g, "ajax_call"),
                                            !0
                                    }
                                }
                                if (parseInt(n) % 25 === 0) {
                                    var b = parseInt(n),
                                        g = 25;
                                    return tbrForm.setReviewCookie(r.currentPageCookieReviewId, b + 1),
                                        console.log("case4"),
                                        tbrForm.reviewWidgetPopupData(b, g, "ajax_call"),
                                        !0
                                }
                                tbrForm.setReviewCookie(r.currentPageCookieReviewId, Number(n) + 1),
                                    tbrForm.displayNextReview()
                            } else
                                tbrForm.setReviewCookie(r.currentPageCookieReviewId, Number(n) + 1)
                        }, g)
                },
                    tbrForm.displayNextReview = function () {
                        var t = e.setInterval(function () {
                            clearInterval(t),
                                tbrForm.viewImage(),
                                tbrForm.displayImageInterval()
                        }, b)
                    },
                    tbrForm.viewImage = function () {
                        var e = tbrForm.getCookie(r.currentPageCookieReviewId),
                            n = t.getElementById("showTBReviewPopup" + e);
                        typeof n !== a && null !== n ? (t.getElementById("showTBReviewPopup" + e).classList.remove("tb-rev-hidden"),
                            t.getElementById("showTBReviewPopup" + e).className = "tb-rev-pop-wid " + m) : tbrForm.setReviewCookie(r.currentPageCookieReviewId, Number(e) + 1)
                    },
                    tbrForm.hideImage = function (e) {
                        typeof t.getElementById("showTBReviewPopup" + e) !== a && null !== t.getElementById("showTBReviewPopup" + e) && (t.getElementById("showTBReviewPopup" + e).className = "tb-rev-pop-wid " + m + " tb-rev-hidden")
                    }
            },
            tbrForm.b64EncodeUnicode = function (e) {
                return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
                    return String.fromCharCode("0x" + t)
                }))
            },
        (r.tbReview === a || r.tbReview.tbProductReview) && tbrForm.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e.tbsForm = {},
            tbsForm.apiData = {},
            tbsForm.init = function () {
                var t = tbsForm.getCookie("tb_fetch_points");
                "1" == r.trackingType ? (tbsForm.userLoggedIn = tbsForm.getCookie("user_loggedin"),
                t !== a && null !== t && "" !== t && null !== tbsForm.userLoggedIn && (tbsForm.userLoggedIn = tbsForm.getCookieDecode("tb_fetch_points", "_ulogin")),
                    "1" == tbsForm.userLoggedIn ? (tbsForm.tbUserId = tbsForm.getCookie("trackingid"),
                    t !== a && null !== t && "" !== t && null !== tbsForm.tbUserId && (tbsForm.tbUserId = tbsForm.getCookieDecode("tb_fetch_points", "_utid"))) : (tbsForm.tbUserId = tbsForm.getCookie("targetbay_session_id"),
                    t !== a && null !== t && "" !== t && null !== tbsForm.tbUserId && (tbsForm.tbUserId = tbsForm.getCookieDecode("tb_fetch_points", "_usid")))) : (tbsForm.tbUserId = tbsForm.getCookie("trackingid"),
                t !== a && null !== t && "" !== t && null !== tbsForm.tbUserId && (tbsForm.tbUserId = tbsForm.getCookieDecode("tb_fetch_points", "_utid")));
                e.location.pathname;
                tbsForm.siteSnippets = !0,
                "" !== r.productId && r.productId !== a && (tbsForm.siteSnippets = !1),
                    tbsForm.tbClienturl = e.location.href,
                    tbsForm.tbkey = r.apiKey,
                    tbsForm.tbUsername = r.userName || "",
                    tbsForm.tbEmail = r.userMail || "",
                "1" == tbsForm.userLoggedIn && r.platform !== a && "mg2" === r.platform && t !== a && null !== t && "" !== t && "" === tbsForm.tbEmail && (tbsForm.tbUsername = tbsForm.getCookieDecode("tb_fetch_points", "_un"),
                    tbsForm.tbEmail = tbsForm.getCookieDecode("tb_fetch_points", "_uem")),
                    tbsForm.tbAvatar = r.userAvatar || "",
                    tbsForm.siteReviewUrl = tbEvents.webhookUrl + "save-site-review?api_token=" + r.apiToken,
                    tbsForm.siteReviewWidgetUrl = tbEvents.webhookUrl + "site-review-widget?api_token=" + r.apiToken,
                    tbsForm.siteReviewVoteUrl = tbEvents.webhookUrl + "site-review-vote?api_token=" + r.apiToken,
                    tbsForm.productVoteUrl = tbEvents.webhookUrl + "review-vote?api_token=" + r.apiToken,
                    tbsForm.reviewBadgeUrl = tbEvents.webhookUrl + "review-badge?api_token=" + r.apiToken,
                    tbsForm.orderCommentWidgetUrl = tbEvents.webhookUrl + "order-comment-widget?api_token=" + r.apiToken,
                    tbsForm.reviewUrl = tbEvents.webhookUrl + "save-review?api_token=" + r.apiToken,
                    tbsForm.saveorderCommentUrl = tbEvents.webhookUrl + "save-order-comment?api_token=" + r.apiToken,
                    tbsForm.rderCommentProductUrl = tbEvents.webhookUrl + "order-comment-product-details?api_token=" + r.apiToken,
                (r.tbReview === a || r.tbReview.tbSiteReview) && (tbsForm.siteReviewpage = 1,
                    tbsForm.productReviewpage = 1,
                    tbsForm.siteRatings()),
                (r.tbReview === a || r.tbReview.tbSiteReview || r.tbReview.tbProductReview) && r.orderId && (tbsForm.tbClienturl.indexOf("heavyglare") !== -1 || tbsForm.tbClienturl.indexOf("hpotter") !== -1 || tbsForm.tbClienturl.indexOf("grandnewflag") !== -1 || tbsForm.tbClienturl.indexOf("northwoodshumidors") !== -1 ? e.setTimeout(function () {
                    tbsForm.orderComments()
                }, 2e3) : tbsForm.tbClienturl.indexOf("impactbattery") !== -1 || tbsForm.tbClienturl.indexOf("bseid") !== -1 ? e.setTimeout(function () {
                    tbsForm.orderComments()
                }, 1e3) : tbsForm.tbClienturl.indexOf("321kiteboarding") !== -1 ? e.setTimeout(function () {
                    tbsForm.orderComments()
                }, 7e3) : tbsForm.tbClienturl.indexOf("fontanaforniusa") !== -1 ? e.setTimeout(function () {
                    tbsForm.orderComments()
                }, 3e3) : tbsForm.tbClienturl.indexOf("targetbay.mybigcommerce") !== -1 || tbsForm.tbClienturl.indexOf("foodhealing") !== -1 ? e.setTimeout(function () {
                    tbsForm.orderComments()
                }, 2e3) : e.setTimeout(function () {
                    tbsForm.orderComments()
                }, 5e3));
                var n = !0;
                r.fontAwesome === a || null === r.fontAwesome || r.fontAwesome || (n = !1),
                n && tbsForm.loadFontAwesome(),
                (r.tbReview.tbReviewBadge === a || r.tbReview.tbReviewBadge) && tbsForm.reviewBadge()
            },
            tbsForm.validateEmail = function (e) {
                var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t.test(e)
            },
            tbsForm.validateName = function (e) {
                var t = /^[a-zA-Z0-9 ]*$/;
                return t.test(e)
            },
            tbsForm.reviewBadge = function () {
                var e = "&index_name=" + tbsForm.tbkey,
                    r = new XMLHttpRequest;
                r.open("GET", tbsForm.reviewBadgeUrl + e),
                    r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    r.onreadystatechange = function () {
                        if (4 === r.readyState && 200 === r.status) {
                            var e = JSON.parse(r.responseText);
                            null !== t.getElementById("targetbay-review-badges") && t.getElementById("targetbay-review-badges") !== a && e.content && (t.getElementById("targetbay-review-badges").innerHTML = e.content)
                        }
                    },
                    r.send()
            },
            tbsForm.loadFontAwesome = function () {
                var e = t,
                    r = e.createElement("script");
                r.src = "https://use.fontawesome.com/6f6f19e46b.js",
                    r.setAttribute("data-timestamp", +new Date),
                    (e.head || e.body).appendChild(r)
            },
            tbsForm.siteRatings = function () {
                var r = tbsForm.getCookie("user_loggedin"),
                    n = tbsForm.getCookie("tb_fetch_points");
                n !== a && null !== n && "" !== n && (r = tbsForm.getCookieDecode("tb_fetch_points", "_ulogin"));
                var i = "widget";
                null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a && (i = "page");
                var s = "recent";
                null !== t.getElementById("tb-sort-site-reviews") && t.getElementById("tb-sort-site-reviews") !== a && (s = t.getElementById("tb-sort-site-reviews").value),
                "" !== tbsForm.tbEmail && null !== tbsForm.tbEmail && "" !== tbsForm.tbUsername && null !== tbsForm.tbUsername && (r = "1");
                var o = "&index_name=" + tbsForm.tbkey + "&user_id=" + tbsForm.tbUserId + "&user_name=" + tbsForm.tbUsername + "&user_email=" + tbsForm.tbEmail + "&user_loggedin=" + r + "&page_url=" + e.location.href + "&page_type=" + i + "&sort_by=" + s + "&snippets_status=" + tbsForm.siteSnippets,
                    l = new XMLHttpRequest;
                l.open("GET", tbsForm.siteReviewWidgetUrl + o),
                    l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    l.onreadystatechange = function () {
                        if (4 === l.readyState && 200 === l.status) {
                            var r = JSON.parse(l.responseText);
                            if (null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a && r.content) {
                                t.getElementById("targetbay_reviews_landing").innerHTML = r.content,
                                    t.getElementById("tbSiteReviews").className = "tbSiteReview_popup",
                                    t.getElementById("tbSiteReviews").style.height = "auto",
                                    t.getElementById("tbSiteReviews").style.width = "100%",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.height = "auto",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.overflow = "auto";
                                for (var n = t.getElementsByClassName("tbSiteReviews-closeButton").length, i = 0; i < n; i++)
                                    t.getElementsByClassName("tbSiteReviews-closeButton")[i].style.display = "none";
                                if (r.schema !== a && tbsForm.siteSnippets) {
                                    var s = t.createElement("script");
                                    s.setAttribute("type", "application/ld+json"),
                                        s.setAttribute("id", "tbSiteReviewSnippet"),
                                        s.appendChild(t.createTextNode(JSON.stringify(r.schema))),
                                        t.getElementsByTagName("head")[0].appendChild(s)
                                }
                            } else if (null !== t.getElementById("targetbay_site_reviews") && t.getElementById("targetbay_site_reviews") !== a && r.content) {
                                t.getElementById("targetbay_site_reviews").innerHTML = r.content,
                                    tbsForm.setHeightOnLoad();
                                var o = v - _;
                                if (t.getElementById("tbSiteReviews").style.height = v + "px",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.height = o + "px",
                                r.schema !== a && tbsForm.siteSnippets) {
                                    var s = t.createElement("script");
                                    s.setAttribute("type", "application/ld+json"),
                                        s.setAttribute("id", "tbSiteReviewSnippet"),
                                        s.appendChild(t.createTextNode(JSON.stringify(r.schema))),
                                        t.getElementsByTagName("head")[0].appendChild(s)
                                }
                                e.addEventListener("resize", function (r) {
                                    var n = tbsForm.isMobile(),
                                        i = e.innerHeight - 150,
                                        s = t.getElementsByClassName("tbSiteReviews-Header")[0].offsetHeight;
                                    null !== t.getElementsByClassName("tb-SiteReviews-tab")[0] && t.getElementsByClassName("tb-SiteReviews-tab")[0] !== a && (s += t.getElementsByClassName("tb-SiteReviews-tab")[0].offsetHeight),
                                    n && (t.getElementById("targetbay_site_reviews").style.display = "none");
                                    var o = i - s;
                                    t.getElementById("tbSiteReviews").style.height = i + "px",
                                        t.getElementById("tbSiteReviews-reviewContainer").style.height = o + "px"
                                })
                            }
                            if (null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a || null !== t.getElementById("targetbay_site_reviews") && t.getElementById("targetbay_site_reviews") !== a) {
                                var d = !!t.documentMode;
                                if (d && t.getElementById("tbSiteReviews").classList.remove("tbSiteReviewresIe"),
                                null !== t.getElementById("tbSiteReviews") && t.getElementById("tbSiteReviews") !== a) {
                                    t.querySelector(".tb_site_reviews_pagination").addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = e.target;
                                        if (t.getAttribute("href")) {
                                            var r = t.getAttribute("href").split("page=")[1];
                                            tbsForm.siteReviewpage = r.split("#")[0],
                                                tbsForm.getSiteReviews(tbsForm.siteReviewpage)
                                        }
                                    }),
                                        t.querySelector(".tb_site_product_reviews_pagination").addEventListener("click", function (e) {
                                            e.preventDefault();
                                            var t = e.target;
                                            if (t.getAttribute("href")) {
                                                var r = t.getAttribute("href").split("page=")[1];
                                                tbsForm.productReviewpage = r.split("#")[0],
                                                    tbsForm.getProductReviews(tbsForm.productReviewpage)
                                            }
                                        });
                                    for (var g = t.querySelectorAll(".targetbay-site-voting"), b = 0, m = g.length; b < m; b++)
                                        t.addEventListener && g[b].addEventListener("click", function (e) {
                                            e.preventDefault();
                                            var t = (e.target,
                                                    this.getAttribute("data")),
                                                r = this.getAttribute("data-val");
                                            null != t && tbsForm.voteSiteReview(t, r)
                                        });
                                    for (var c = t.querySelectorAll(".targetbay-product-voting"), b = 0, u = c.length; b < u; b++)
                                        t.addEventListener && c[b].addEventListener("click", function (e) {
                                            e.preventDefault();
                                            var t = (e.target,
                                                    this.getAttribute("data")),
                                                r = this.getAttribute("data-val");
                                            null != t && tbsForm.voteProductReview(t, r)
                                        });
                                    var y = t.getElementById("tb-sort-site-reviews");
                                    null !== y && y !== a && y.addEventListener("change", function (e) {
                                        tbsForm.sortReviews()
                                    }),
                                    null !== t.getElementById("targetbay_site_reviews") && t.getElementById("targetbay_site_reviews") !== a && (t.onkeydown = function (t) {
                                        t = t || e.event,
                                        27 == t.keyCode && tbsForm.tbSiteReviewClosePopup()
                                    });
                                    var p = tbsForm.isMobile(),
                                        v = e.innerHeight - 150,
                                        _ = t.getElementsByClassName("tbSiteReviews-Header")[0].offsetHeight;
                                    null !== t.getElementsByClassName("tb-SiteReviews-tab")[0] && t.getElementsByClassName("tb-SiteReviews-tab")[0] !== a && (_ += t.getElementsByClassName("tb-SiteReviews-tab")[0].offsetHeight),
                                        console.log(_),
                                    p && (t.getElementById("targetbay_site_reviews").style.display = "none")
                                }
                            }
                        }
                    },
                    l.send()
            },
            tbsForm.getSiteReviews = function (r) {
                var n = tbsForm.getCookie("user_loggedin"),
                    i = tbsForm.getCookie("tb_fetch_points");
                i !== a && null !== i && "" !== i && (n = tbsForm.getCookieDecode("tb_fetch_points", "_ulogin")),
                "" !== tbsForm.tbEmail && null !== tbsForm.tbEmail && "" !== tbsForm.tbUsername && null !== tbsForm.tbUsername && (n = "1");
                var s = "widget";
                null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a && (s = "page");
                var o = "recent";
                null !== t.getElementById("tb-sort-site-reviews") && t.getElementById("tb-sort-site-reviews") !== a && (o = t.getElementById("tb-sort-site-reviews").value,
                    t.getElementById("tb-sort-site-reviews").value = o);
                var l = "Newest";
                null !== t.getElementById("tbactive-site") && t.getElementById("tbactive-site") !== a && (l = t.getElementById("tbactive-site").innerHTML),
                "sorting" === r && (tbsForm.siteReviewpage = 1,
                    tbsForm.productReviewpage = 1);
                var d = "&index_name=" + tbsForm.tbkey + "&user_id=" + tbsForm.tbUserId + "&user_name=" + tbsForm.tbUsername + "&user_email=" + tbsForm.tbEmail + "&sitereviewpage=" + tbsForm.siteReviewpage + "&productreviewpage=" + tbsForm.productReviewpage + "&user_loggedin=" + n + "&page_type=" + s + "&sort_by=" + o + "&snippets_status=" + tbsForm.siteSnippets,
                    g = new XMLHttpRequest;
                g.open("GET", tbsForm.siteReviewWidgetUrl + d),
                    g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    g.onreadystatechange = function () {
                        if (4 === g.readyState && 200 === g.status) {
                            var r = JSON.parse(g.responseText);
                            if (null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a && r.content) {
                                t.getElementById("targetbay_reviews_landing").innerHTML = r.content,
                                    t.getElementById("tbSiteReviews").className = "tbSiteReview_popup",
                                    t.getElementById("tbSiteReviews").style.height = "auto",
                                    t.getElementById("tbSiteReviews").style.width = "100%",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.height = "auto",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.overflow = "auto";
                                for (var n = t.getElementsByClassName("tbSiteReviews-closeButton").length, i = 0; i < n; i++)
                                    t.getElementsByClassName("tbSiteReviews-closeButton")[i].style.display = "none";
                                e.scrollTo(0, 0)
                            } else if (null !== t.getElementById("targetbay_site_reviews") && t.getElementById("targetbay_site_reviews") !== a) {
                                t.getElementById("targetbay_site_reviews").innerHTML = r.content;
                                var s = tbsForm.isMobile(),
                                    d = e.innerHeight - 150,
                                    b = t.getElementsByClassName("tbSiteReviews-Header")[0].offsetHeight;
                                null !== t.getElementsByClassName("tb-SiteReviews-tab")[0] && t.getElementsByClassName("tb-SiteReviews-tab")[0] !== a && (b += t.getElementsByClassName("tb-SiteReviews-tab")[0].offsetHeight),
                                s && (t.getElementById("targetbay_site_reviews").style.display = "none");
                                var m = d - b;
                                t.getElementById("tbSiteReviews").style.height = d + "px",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.height = m + "px"
                            }
                            if (null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a || null !== t.getElementById("targetbay_site_reviews") && t.getElementById("targetbay_site_reviews") !== a) {
                                if (null !== t.getElementById("tbactive-site") && t.getElementById("tbactive-site") !== a && (t.getElementById("tbactive-site").value = o,
                                    t.getElementById("tbactive-site").innerHTML = l,
                                null !== t.getElementById("page-number-star-site") && t.getElementById("page-number-star-site") !== a)) {
                                    var c = t.getElementById("limit_count_site").innerHTML;
                                    t.getElementById("page-number-star-site").innerHTML = tbsForm.siteReviewpage * c + 1 - c;
                                    var u, y = t.getElementById("page-number-total-site").innerHTML;
                                    u = tbsForm.siteReviewpage * c > y ? y : tbsForm.siteReviewpage * c,
                                        t.getElementById("page-number-limit-site").innerHTML = u
                                }
                                var p = !!t.documentMode;
                                p && t.getElementById("tbSiteReviews").classList.remove("tbSiteReviewresIe"),
                                    t.getElementById("tbSiteReviews").className += " tbSiteReview_popup",
                                    t.getElementById("targetbay-site-reviews").style.display = "block",
                                    t.getElementById("targetbay-product-reviews").style.display = "none",
                                    t.getElementById("tbSiteReviews-FormButton").style.display = "block",
                                null !== t.getElementById("targetbay-site-reviews-average-star") && t.getElementById("targetbay-site-reviews-average-star") !== a && t.getElementById("targetbay-product-reviews-average-star") !== a && null !== t.getElementById("targetbay-product-reviews-average-star") && (t.getElementById("targetbay-site-reviews-average-star").style.display = "block",
                                    t.getElementById("targetbay-product-reviews-average-star").style.display = "none"),
                                null !== t.getElementById("targetbay-header-site-reviews-average-star") && t.getElementById("targetbay-header-site-reviews-average-star") !== a && t.getElementById("targetbay-header-product-reviews-average-star") !== a && null !== t.getElementById("targetbay-header-product-reviews-average-star") && (t.getElementById("targetbay-header-site-reviews-average-star").style.display = "block",
                                    t.getElementById("targetbay-header-product-reviews-average-star").style.display = "none",
                                    t.getElementById("tb-header-site-review-count").style.display = "block",
                                    t.getElementById("tb-header-product-review-count").style.display = "none"),
                                t.getElementsByClassName("site-reviews-tablinks").length > 0 && (t.getElementsByClassName("site-reviews-tablinks")[0].classList.add("tab-current"),
                                    t.getElementsByClassName("site-reviews-tablinks")[1].classList.remove("tab-current")),
                                    tbwTrack.reviewUserTrack("site_review"),
                                    t.querySelector(".tb_site_reviews_pagination").addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = e.target;
                                        if (t.getAttribute("href")) {
                                            var r = t.getAttribute("href").split("page=")[1];
                                            tbsForm.siteReviewpage = r.split("#")[0],
                                                tbsForm.getSiteReviews(tbsForm.siteReviewpage)
                                        }
                                    }),
                                    t.querySelector(".tb_site_product_reviews_pagination").addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = e.target;
                                        if (t.getAttribute("href")) {
                                            var r = t.getAttribute("href").split("page=")[1];
                                            tbsForm.productReviewpage = r.split("#")[0],
                                                tbsForm.getProductReviews(tbsForm.productReviewpage)
                                        }
                                    });
                                for (var v = t.querySelectorAll(".targetbay-site-voting"), _ = 0, f = v.length; _ < f; _++)
                                    t.addEventListener && v[_].addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val");
                                        null != t && tbsForm.voteSiteReview(t, r)
                                    });
                                for (var E = t.querySelectorAll(".targetbay-product-voting"), _ = 0, w = E.length; _ < w; _++)
                                    t.addEventListener && E[_].addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val");
                                        null != t && tbsForm.voteProductReview(t, r)
                                    });
                                var I = t.getElementById("tb-sort-site-reviews");
                                null !== I && I !== a && I.addEventListener("change", function (e) {
                                    tbsForm.sortReviews()
                                })
                            }
                        }
                    },
                    g.send()
            },
            tbsForm.getProductReviews = function (r) {
                var n = tbsForm.getCookie("user_loggedin"),
                    i = tbsForm.getCookie("tb_fetch_points");
                i !== a && null !== i && "" !== i && (n = tbsForm.getCookieDecode("tb_fetch_points", "_ulogin")),
                "" !== tbsForm.tbEmail && null !== tbsForm.tbEmail && "" !== tbsForm.tbUsername && null !== tbsForm.tbUsername && (n = "1");
                var s = "widget";
                null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a && (s = "page");
                var o = "recent";
                null !== t.getElementById("tb-sort-site-reviews") && t.getElementById("tb-sort-site-reviews") !== a && (o = t.getElementById("tb-sort-site-reviews").value);
                var l = "Newest";
                null !== t.getElementById("tbactive-site") && t.getElementById("tbactive-site") !== a && (l = t.getElementById("tbactive-site").innerHTML),
                "sorting" === r && (tbsForm.siteReviewpage = 1,
                    tbsForm.productReviewpage = 1);
                var d = "&index_name=" + tbsForm.tbkey + "&user_id=" + tbsForm.tbUserId + "&user_name=" + tbsForm.tbUsername + "&user_email=" + tbsForm.tbEmail + "&sitereviewpage=" + tbsForm.siteReviewpage + "&productreviewpage=" + tbsForm.productReviewpage + "&user_loggedin=" + n + "&page_type=" + s + "&sort_by=" + o + "&snippets_status=" + tbsForm.siteSnippets,
                    g = new XMLHttpRequest;
                g.open("GET", tbsForm.siteReviewWidgetUrl + d),
                    g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    g.onreadystatechange = function () {
                        if (4 === g.readyState && 200 === g.status) {
                            var r = JSON.parse(g.responseText);
                            if (null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a) {
                                t.getElementById("targetbay_reviews_landing").innerHTML = r.content,
                                    t.getElementById("tbSiteReviews").className = "tbSiteReview_popup",
                                    t.getElementById("tbSiteReviews").style.height = "auto",
                                    t.getElementById("tbSiteReviews").style.width = "100%",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.height = "auto",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.overflow = "auto";
                                for (var n = t.getElementsByClassName("tbSiteReviews-closeButton").length, i = 0; i < n; i++)
                                    t.getElementsByClassName("tbSiteReviews-closeButton")[i].style.display = "none";
                                e.scrollTo(0, 0)
                            } else if (null !== t.getElementById("targetbay_site_reviews") && t.getElementById("targetbay_site_reviews") !== a) {
                                t.getElementById("targetbay_site_reviews").innerHTML = r.content;
                                var s = tbsForm.isMobile(),
                                    d = e.innerHeight - 150,
                                    b = t.getElementsByClassName("tbSiteReviews-Header")[0].offsetHeight;
                                null !== t.getElementsByClassName("tb-SiteReviews-tab")[0] && t.getElementsByClassName("tb-SiteReviews-tab")[0] !== a && (b += t.getElementsByClassName("tb-SiteReviews-tab")[0].offsetHeight),
                                s && (t.getElementById("targetbay_site_reviews").style.display = "none");
                                var m = d - b;
                                t.getElementById("tbSiteReviews").style.height = d + "px",
                                    t.getElementById("tbSiteReviews-reviewContainer").style.height = m + "px"
                            }
                            if (null !== t.getElementById("targetbay_reviews_landing") && t.getElementById("targetbay_reviews_landing") !== a || null !== t.getElementById("targetbay_site_reviews") && t.getElementById("targetbay_site_reviews") !== a) {
                                if (null !== t.getElementById("tbactive-site") && t.getElementById("tbactive-site") !== a && (t.getElementById("tbactive-site").value = o,
                                    t.getElementById("tbactive-site").innerHTML = l,
                                null !== t.getElementById("page-number-star-pro") && t.getElementById("page-number-star-pro") !== a)) {
                                    var c = t.getElementById("limit_count_product").innerHTML;
                                    t.getElementById("page-number-star-pro").innerHTML = tbsForm.productReviewpage * c + 1 - c;
                                    var u = t.getElementById("page-number-total-pro").innerHTML;
                                    if (tbsForm.productReviewpage * c > u)
                                        var y = u;
                                    else
                                        var y = tbsForm.productReviewpage * c;
                                    t.getElementById("page-number-limit-pro").innerHTML = y
                                }
                                var p = !!t.documentMode;
                                p && t.getElementById("tbSiteReviews").classList.remove("tbSiteReviewresIe"),
                                    t.getElementById("tbSiteReviews").className += " tbSiteReview_popup",
                                    t.getElementById("targetbay-site-reviews").style.display = "none",
                                    t.getElementById("targetbay-product-reviews").style.display = "block",
                                    t.getElementById("tbSiteReviews-FormButton").style.display = "none",
                                null !== t.getElementById("targetbay-site-reviews-average-star") && t.getElementById("targetbay-site-reviews-average-star") !== a && t.getElementById("targetbay-product-reviews-average-star") !== a && null !== t.getElementById("targetbay-product-reviews-average-star") && (t.getElementById("targetbay-site-reviews-average-star").style.display = "none",
                                    t.getElementById("targetbay-product-reviews-average-star").style.display = "block"),
                                null !== t.getElementById("targetbay-header-site-reviews-average-star") && t.getElementById("targetbay-header-site-reviews-average-star") !== a && t.getElementById("targetbay-header-product-reviews-average-star") !== a && null !== t.getElementById("targetbay-header-product-reviews-average-star") && (t.getElementById("targetbay-header-site-reviews-average-star").style.display = "none",
                                    t.getElementById("targetbay-header-product-reviews-average-star").style.display = "block",
                                    t.getElementById("tb-header-site-review-count").style.display = "none",
                                    t.getElementById("tb-header-product-review-count").style.display = "block"),
                                t.getElementsByClassName("site-reviews-tablinks").length > 0 && (t.getElementsByClassName("site-reviews-tablinks")[0].classList.remove("tab-current"),
                                    t.getElementsByClassName("site-reviews-tablinks")[1].classList.add("tab-current")),
                                    tbwTrack.reviewUserTrack("site_review"),
                                    t.querySelector(".tb_site_reviews_pagination").addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = e.target;
                                        if (t.getAttribute("href")) {
                                            var r = t.getAttribute("href").split("page=")[1];
                                            tbsForm.siteReviewpage = r.split("#")[0],
                                                tbsForm.getSiteReviews(tbsForm.siteReviewpage)
                                        }
                                    }),
                                    t.querySelector(".tb_site_product_reviews_pagination").addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = e.target;
                                        if (t.getAttribute("href")) {
                                            var r = t.getAttribute("href").split("page=")[1];
                                            tbsForm.productReviewpage = r.split("#")[0],
                                                tbsForm.getProductReviews(tbsForm.productReviewpage)
                                        }
                                    });
                                for (var v = t.querySelectorAll(".targetbay-site-voting"), _ = 0, f = v.length; _ < f; _++)
                                    t.addEventListener && v[_].addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val");
                                        null != t && tbsForm.voteSiteReview(t, r)
                                    });
                                for (var E = t.querySelectorAll(".targetbay-product-voting"), _ = 0, w = E.length; _ < w; _++)
                                    t.addEventListener && E[_].addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var t = (e.target,
                                                this.getAttribute("data")),
                                            r = this.getAttribute("data-val");
                                        null != t && tbsForm.voteProductReview(t, r)
                                    });
                                var I = t.getElementById("tb-sort-site-reviews");
                                null !== I && I !== a && I.addEventListener("change", function (e) {
                                    tbsForm.sortReviews()
                                })
                            }
                        }
                    },
                    g.send()
            },
            tbsForm.tbTabClick = function (e) {
                var r = t.getElementById("targetbay-header-site-reviews-average-star"),
                    n = t.getElementById("targetbay-header-product-reviews-average-star"),
                    i = t.getElementById("tb-header-site-review-count"),
                    s = t.getElementById("tb-header-product-review-count");
                "tbSiteReviews" === e ? (t.getElementsByClassName("site-reviews-tablinks")[0].classList.add("tab-current"),
                    t.getElementsByClassName("site-reviews-tablinks")[1].classList.remove("tab-current"),
                null !== t.getElementById("targetbay-site-reviews-average-star") && t.getElementById("targetbay-site-reviews-average-star") !== a && t.getElementById("targetbay-product-reviews-average-star") !== a && null !== t.getElementById("targetbay-product-reviews-average-star") && (t.getElementById("targetbay-site-reviews-average-star").style.display = "block",
                    t.getElementById("targetbay-product-reviews-average-star").style.display = "none"),
                    t.getElementById("tbSiteReviews-FormButton").style.display = "block",
                    t.getElementById("targetbay-site-reviews").style.display = "block",
                    t.getElementById("targetbay-product-reviews").style.display = "none",
                null !== r && r !== a && null !== n && n !== a && (r.style.display = "block",
                    n.style.display = "none"),
                i !== a && null !== i && s !== a && null !== s && (i.style.display = "block",
                    s.style.display = "none")) : "tbProductReviews" === e && (t.getElementsByClassName("site-reviews-tablinks")[0].classList.remove("tab-current"),
                    t.getElementsByClassName("site-reviews-tablinks")[1].classList.add("tab-current"),
                null !== t.getElementById("targetbay-site-reviews-average-star") && t.getElementById("targetbay-site-reviews-average-star") !== a && t.getElementById("targetbay-product-reviews-average-star") !== a && null !== t.getElementById("targetbay-product-reviews-average-star") && (t.getElementById("targetbay-site-reviews-average-star").style.display = "none",
                    t.getElementById("targetbay-product-reviews-average-star").style.display = "block"),
                    t.getElementById("tbSiteReviews-FormButton").style.display = "none",
                    t.getElementById("targetbay-site-reviews").style.display = "none",
                    t.getElementById("targetbay-product-reviews").style.display = "block",
                    t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0].style.display = "none",
                null !== r && r !== a && null !== n && n !== a && (r.style.display = "none",
                    n.style.display = "block"),
                i !== a && null !== i && s !== a && null !== s && (i.style.display = "none",
                    s.style.display = "block")),
                    tbwTrack.reviewUserTrack("site_review")
            },
            tbsForm.tbSiteReviewClick = function () {
                for (var n = 0, i = t.getElementsByName("targetbaySiteRating"), s = "", o = 0, l = i.length; o < l; o++)
                    i[o].checked && (s = i[o].value);
                var d = t.getElementById("targetbaySiteTitle").value,
                    g = t.getElementById("targetbaySiteReview").value,
                    b = t.getElementById("title_validator_review").value,
                    m = tbsForm.getCookie("user_loggedin"),
                    c = tbsForm.getCookie("tb_fetch_points");
                c !== a && null !== c && "" !== c && (m = tbsForm.getCookieDecode("tb_fetch_points", "_ulogin")),
                "" !== tbsForm.tbEmail && null !== tbsForm.tbEmail && "" !== tbsForm.tbUsername && null !== tbsForm.tbUsername && (m = "1"),
                1 != m && (tbsForm.tbUsername = t.getElementById("targetbaySiteUsername").value,
                    tbsForm.tbEmail = t.getElementById("targetbaySiteEmail").value),
                    "" === s ? (t.getElementById("targetbay_site_rating_error").style.display = "block",
                        n = 1) : t.getElementById("targetbay_site_rating_error").style.display = "none",
                    "" === d && "yes" === b ? (t.getElementById("targetbay_site_title_error").style.display = "block",
                        n = 1) : t.getElementById("targetbay_site_title_error").style.display = "none",
                    "" === g ? (t.getElementById("targetbay_site_review_error").style.display = "block",
                        n = 1) : t.getElementById("targetbay_site_review_error").style.display = "none",
                1 != m && ("" === tbsForm.tbUsername ? (t.getElementById("targetbay_site_name_invalid").style.display = "none",
                    t.getElementById("targetbay_site_review_name_error").style.display = "block",
                    n = 1) : tbsForm.validateName(tbsForm.tbUsername) ? (t.getElementById("targetbay_site_review_name_error").style.display = "none",
                    t.getElementById("targetbay_site_name_invalid").style.display = "none") : (t.getElementById("targetbay_site_review_name_error").style.display = "none",
                    t.getElementById("targetbay_site_name_invalid").style.display = "block",
                    n = 1),
                    "" === tbsForm.tbEmail ? (t.getElementById("targetbay_site_email_invalid").style.display = "none",
                        t.getElementById("targetbay_site_review_email_error").style.display = "block",
                        n = 1) : tbsForm.validateEmail(tbsForm.tbEmail) ? (t.getElementById("targetbay_site_review_email_error").style.display = "none",
                        t.getElementById("targetbay_site_email_invalid").style.display = "none") : (t.getElementById("targetbay_site_review_email_error").style.display = "none",
                        t.getElementById("targetbay_site_email_invalid").style.display = "block",
                        n = 1)),
                1 == n && (t.getElementsByClassName("tbSiteReviews-formErrorLabel")[0].style.display = "block",
                    t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0].className += " tbSiteReviews-tbReviewFormError",
                    t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0].scrollIntoView(),
                    t.getElementsByClassName("tbSiteReviews-mainContainer")[0].scrollIntoView());
                var u = {
                    index_name: tbsForm.tbkey,
                    user_id: tbsForm.tbUserId,
                    user_name: tbsForm.tbUsername,
                    user_email: tbsForm.tbEmail,
                    user_avatar: tbsForm.tbAvatar,
                    review_rating: s,
                    review_title: d,
                    review: g,
                    user_type: r.userName,
                    title_validator_review: b
                };
                if (0 === n) {
                    t.getElementsByClassName("tbSiteReviews-formErrorLabel")[0].style.display = "none",
                        t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0].className = "tbSiteReviews-tbReviewForm",
                        t.getElementsByClassName("sitereviews-c-loader")[0].style.display = "block",
                        t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0].scrollIntoView(),
                        t.getElementsByClassName("tbSiteReviews-mainContainer")[0].scrollIntoView();
                    for (var o = 0, l = i.length; o < l; o++)
                        i[o].checked && (i[o].checked = !1);
                    t.getElementById("targetbaySiteTitle").value = "",
                        t.getElementById("targetbaySiteReview").value = "",
                    1 != m && (t.getElementById("targetbaySiteUsername").value = "",
                        t.getElementById("targetbaySiteEmail").value = "");
                    var y = new XMLHttpRequest;
                    y.open("POST", tbsForm.siteReviewUrl),
                        y.setRequestHeader("Content-Type", "application/json"),
                        y.onreadystatechange = function () {
                            if (4 === y.readyState && 200 === y.status) {
                                var r = JSON.parse(y.responseText);
                                "success" === r.msg && (t.getElementsByClassName("sitereviews-c-loader")[0].style.display = "none",
                                    t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0].style.display = "none",
                                    t.getElementById("targetbay_site_review_success").style.display = "block",
                                    t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0].scrollIntoView(),
                                    t.getElementsByClassName("tbSiteReviews-mainContainer")[0].scrollIntoView(),
                                    e.setTimeout(function () {
                                        t.getElementById("targetbay_site_review_success").style.display = "none"
                                    }, 2e3))
                            }
                        },
                        y.send(JSON.stringify(u))
                }
            },
            tbsForm.tbCommentToggle = function (e) {
                var r = t.getElementById("site-review-comment-toggl-list-" + e);
                "block" === r.style.display || "" === r.style.display ? r.style.display = "none" : r.style.display = "block"
            },
            tbsForm.tbSiteReviewFormToggle = function () {
                var r = t.getElementsByClassName("tbSiteReviews-tbReviewForm")[0];
                if ("block" === r.style.display || "" === r.style.display)
                    r.style.display = "none",
                        t.getElementsByClassName("tbSiteReviews-mainContainer")[0].scrollIntoView();
                else {
                    r.style.display = "block",
                        r.scrollIntoView(),
                        t.getElementsByClassName("tbSiteReviews-mainContainer")[0].scrollIntoView();
                    for (var a = t.getElementsByClassName("targetbayerror"), n = 0, i = a.length; n < i; n++)
                        a[n].style.display = "none";
                    r.className = "tbSiteReviews-tbReviewForm",
                        t.getElementsByClassName("sitereviews-c-loader")[0].style.display = "block",
                        e.setTimeout(function () {
                            t.getElementsByClassName("sitereviews-c-loader")[0].style.display = "none"
                        }, 1e3)
                }
                tbwTrack.reviewUserTrack("site_review")
            },
            tbsForm.tbSiteReviewShowPopup = function (r) {
                var n = !!t.documentMode;
                n && t.getElementById("tbSiteReviews").classList.remove("tbSiteReviewresIe"),
                r && (t.body.className += " tbSiteReviews-tbactive"),
                    t.getElementById("tbSiteReviews").className += " tbSiteReview_popup";
                var i = tbsForm.isMobile(),
                    s = e.innerHeight - 150,
                    o = t.getElementsByClassName("tbSiteReviews-Header")[0].offsetHeight;
                null !== t.getElementsByClassName("tb-SiteReviews-tab")[0] && t.getElementsByClassName("tb-SiteReviews-tab")[0] !== a && (o += t.getElementsByClassName("tb-SiteReviews-tab")[0].offsetHeight),
                i && (t.getElementById("targetbay_site_reviews").style.display = "none");
                var l = s - o;
                t.getElementById("tbSiteReviews").style.height = s + "px",
                    t.getElementById("tbSiteReviews-reviewContainer").style.height = l + "px",
                    tbwTrack.reviewUserTrack("site_review")
            },
            tbsForm.setHeightOnLoad = function () {
                var r = tbsForm.isMobile(),
                    n = e.innerHeight - 150,
                    i = t.getElementsByClassName("tbSiteReviews-Header")[0].offsetHeight;
                null !== t.getElementsByClassName("tb-SiteReviews-tab")[0] && t.getElementsByClassName("tb-SiteReviews-tab")[0] !== a && (i += t.getElementsByClassName("tb-SiteReviews-tab")[0].offsetHeight),
                r && (t.getElementById("targetbay_site_reviews").style.display = "none");
                var s = n - i;
                t.getElementById("tbSiteReviews").style.height = n + "px",
                    t.getElementById("tbSiteReviews-reviewContainer").style.height = s + "px"
            },
            tbsForm.tbSiteReviewClosePopup = function () {
                t.body.classList.remove("tbSiteReviews-tbactive"),
                    t.getElementById("tbSiteReviews").classList.remove("tbSiteReview_popup"),
                    tbwTrack.reviewUserTrack("site_review")
            },
            tbsForm.isMobile = function () {
                var e;
                return e = !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)),
                    !1
            },
            tbsForm.getCookie = function (e) {
                for (var r = e + "=", a = t.cookie.split(";"), n = 0, i = a.length; n < i; n++) {
                    for (var s = a[n];
                         " " === s.charAt(0);)
                        s = s.substring(1);
                    if (0 === s.indexOf(r))
                        return s.substring(r.length, s.length)
                }
                return ""
            },
            tbsForm.voteSiteReview = function (e, r) {
                var a = "&index_name=" + tbsForm.tbkey + "&review_id=" + r + "&vote=" + e + "&user_id=" + tbsForm.tbUserId,
                    n = new XMLHttpRequest;
                n.open("GET", tbsForm.siteReviewVoteUrl + a),
                    n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    n.onreadystatechange = function () {
                        if (4 === n.readyState && 200 === n.status) {
                            var e = JSON.parse(n.responseText),
                                a = "person";
                            e.yes_count > 1 && (a = "people");
                            var i = t.getElementsByClassName("tb-site-review-vote-" + r).length,
                                s = "block";
                            if (0 == e.yes_count && (s = "none"),
                            i > 0)
                                for (var o = 0; o < i; o++)
                                    t.getElementsByClassName("tb-site-review-vote-" + r)[o].style.display = s;
                            t.getElementById("targetbay-site-review-yes-count-" + r).innerHTML = e.yes_count + " " + a + " found this helpful",
                                t.getElementById("targetbay-site-review-no-count-" + r).innerHTML = e.no_count,
                                tbwTrack.reviewUserTrack("site_review")
                        }
                    },
                    n.send()
            },
            tbsForm.voteProductReview = function (e, r) {
                var a = "&index_name=" + tbsForm.tbkey + "&review_id=" + r + "&vote=" + e + "&user_id=" + tbsForm.tbUserId,
                    n = new XMLHttpRequest;
                n.open("GET", tbsForm.productVoteUrl + a),
                    n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    n.onreadystatechange = function () {
                        if (4 === n.readyState && 200 === n.status) {
                            var e = JSON.parse(n.responseText),
                                a = "person";
                            e.yes_count > 1 && (a = "people");
                            var i = t.getElementsByClassName("tb-product-review-vote-" + r).length,
                                s = "block";
                            if (0 == e.yes_count && (s = "none"),
                            i > 0)
                                for (var o = 0; o < i; o++)
                                    t.getElementsByClassName("tb-product-review-vote-" + r)[o].style.display = s;
                            var l = t.getElementById("targetbay-review-yes-count-" + r);
                            if (console.log("popup vote: " + l),
                            l && (t.getElementById("targetbay-review-yes-count-" + r).innerHTML = e.yes_count + " " + a + " found this helpful"),
                                l = t.getElementsByClassName("targetbay-product-review-yes-count-" + r).length,
                                console.log("popup vote: " + l),
                            l > 0)
                                for (var d = 0; d < l; d++)
                                    t.getElementsByClassName("targetbay-product-review-yes-count-" + r)[d].innerHTML = e.yes_count + " " + a + " found this helpful";
                            if (l = t.getElementsByClassName("targetbay-popup-review-yes-count-" + r).length,
                                console.log("popup vote: " + l),
                            l > 0)
                                for (var d = 0; d < l; d++)
                                    t.getElementsByClassName("targetbay-popup-review-yes-count-" + r)[d].innerHTML = e.yes_count + " " + a + " found this helpful";
                            tbwTrack.reviewUserTrack("site_review")
                        }
                    },
                    n.send()
            },
            tbsForm.orderComments = function () {
                var n = "&index_name=" + tbsForm.tbkey + "&user_id=" + tbsForm.tbUserId + "&order_id=" + r.orderId + "&user_name=" + tbsForm.tbUsername + "&user_email=" + encodeURIComponent(tbsForm.tbEmail) + "&site_review_status=" + r.tbReview.tbSiteReview + "&product_review_status=" + r.tbReview.tbProductReview,
                    i = new XMLHttpRequest;
                i.open("GET", tbsForm.orderCommentWidgetUrl + n),
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    i.onreadystatechange = function () {
                        if (4 === i.readyState && 200 === i.status) {
                            var n = JSON.parse(i.responseText);
                            if (null !== t.getElementById("targetbay_order_reviews") && t.getElementById("targetbay_order_reviews") !== a && n.content) {
                                t.getElementById("targetbay_order_reviews").innerHTML = n.content,
                                    t.onkeydown = function (t) {
                                        t = t || e.event,
                                        27 == t.keyCode && (tbsForm.tbSiteReviewClosePopup(),
                                            tbsForm.tbOrderCommentClosePopup())
                                    };
                                var s = t.getElementById("targetbay_order_comments");
                                e.onclick = function (e) {
                                    e.target == s && (s.style.display = "none")
                                };
                                var o = n.comment_type;
                                if ("product_review" === o) {
                                    null !== t.getElementById("tb_order_product_image") && (t.getElementById("tb_order_product_image").style.display = "block");
                                    var l = "&index_name=" + tbsForm.tbkey + "&order_id=" + r.orderId;
                                    tbsForm.tbOrderCommentProductDetails(l)
                                } else
                                    t.getElementById("tb_order_product_image").style.display = "none"
                            }
                        }
                    },
                    i.send()
            },
            tbsForm.tbOrderCommentClick = function () {
                for (var a = 0, n = t.getElementsByName("targetbayOrderSiteRating"), i = "", s = 0, o = n.length; s < o; s++)
                    n[s].checked && (i = n[s].value);
                var l = t.getElementById("targetbayOrderSiteTitle").value,
                    d = t.getElementById("targetbayOrderSiteReview").value,
                    g = t.getElementById("title_validator_review_new").value;
                "" === i ? (t.getElementById("targetbay_order_site_rating_error").style.display = "block",
                    a = 1) : t.getElementById("targetbay_order_site_rating_error").style.display = "none",
                    "" === l && "yes" === g ? (t.getElementById("targetbay_order_site_title_error").style.display = "block",
                        a = 1) : t.getElementById("targetbay_order_site_title_error").style.display = "none",
                    "" === d ? (t.getElementById("targetbay_order_site_review_error").style.display = "block",
                        a = 1) : t.getElementById("targetbay_order_site_review_error").style.display = "none";
                var b = t.getElementById("template_type").value;
                if ("site_review" === b)
                    ;
                else
                    ;
                var m = {
                    index_name: tbsForm.tbkey,
                    user_id: tbsForm.tbUserId,
                    user_name: tbsForm.tbUsername,
                    user_email: tbsForm.tbEmail,
                    user_avatar: tbsForm.tbAvatar,
                    review_rating: i,
                    review_title: l,
                    review: d,
                    user_type: r.userName,
                    type_temp: g,
                    template_type: "review",
                    order_id: r.orderId
                };
                if (0 === a) {
                    for (var s = 0, o = n.length; s < o; s++)
                        n[s].checked && (n[s].checked = !1);
                    t.getElementById("targetbayOrderSiteTitle").value = "",
                        t.getElementById("targetbayOrderSiteReview").value = "",
                        t.getElementsByClassName("targetbay_order_comment_modal-body")[0].style.display = "none",
                        t.getElementById("targetbay_order_comments").style.display = "none";
                    var c = new XMLHttpRequest;
                    c.open("POST", tbsForm.saveorderCommentUrl),
                        c.setRequestHeader("Content-Type", "application/json"),
                        c.onreadystatechange = function () {
                            if (4 === c.readyState && 200 === c.status) {
                                var r = JSON.parse(c.responseText);
                                "success" === r.msg && (1 == r.thanksMsg && (t.getElementById("targetbay_order_comments").style.display = "flex",
                                    t.getElementById("tb_thanks_message").style.display = "block",
                                    e.setTimeout(function () {
                                        t.getElementById("tb_thanks_message").style.display = "none",
                                            tbsForm.tbOrderCommentClosePopup()
                                    }, 5e3)),
                                    console.log(r.msg))
                            }
                        },
                        c.send(JSON.stringify(m))
                }
            },
            tbsForm.tbOrderCommentClosePopup = function () {
                t.getElementById("targetbay_order_comments").style.display = "none"
            },
            tbsForm.tbOrderCommentProductDetails = function (e) {
                var r = new XMLHttpRequest;
                r.open("GET", tbsForm.rderCommentProductUrl + e),
                    r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    r.onreadystatechange = function () {
                        if (4 === r.readyState && 200 === r.status) {
                            var n = JSON.parse(r.responseText);
                            if (n.product_image !== a && null !== n.product_image && "" !== n.product_title && "" !== n.product_image) {
                                var i = t.getElementById("order_product_image");
                                i.src = n.product_image,
                                    t.getElementById("tb_product_title").innerHTML = n.product_title
                            } else
                                tbsForm.tbOrderCommentProductDetails(e)
                        }
                    },
                    r.send()
            },
            tbsForm.getCookieDecode = function (e, r) {
                for (var n = e + "=", i = t.cookie.split(";"), s = 0, o = i.length; s < o; s++) {
                    for (var l = i[s];
                         " " === l.charAt(0);)
                        l = l.substring(1);
                    if (0 === l.indexOf(n))
                        for (var d = l.substring(n.length, l.length), g = tbsForm.b64DecodeUnicode(d), b = g.split("&"), m = 0, c = b.length; m < c; m++) {
                            var u = b[m].split("=");
                            if ("" !== u[0] && u[0] !== a && u[0] === r)
                                return u[1]
                        }
                }
                return ""
            },
            tbsForm.b64DecodeUnicode = function (e) {
                var t = e.replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&"),
                    r = decodeURIComponent(atob(t).split("").map(function (e) {
                        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                    }).join(""));
                return r
            },
            tbsForm.showReviewImagePopup = function (r, n) {
                t.getElementById("user-image-" + r + "-" + n).style.display = "block",
                null !== t.getElementById("tb-review-popup-admincomment-button-" + r + "-" + n) && t.getElementById("tb-review-popup-admincomment-button-" + r + "-" + n) !== a && (t.getElementById("tb-review-popup-admincomment-button-" + r + "-" + n).style.display = "block",
                    t.getElementById("tb-more-comments-" + r + "-" + n).style.display = "none"),
                    t.onkeydown = function (a) {
                        a = a || e.event,
                        27 == a.keyCode && (t.getElementById("user-image-" + r + "-" + n).style.display = "none")
                    }
            },
            tbsForm.closeReviewImagePopup = function (e, r) {
                t.getElementById("user-image-" + e + "-" + r).style.display = "none",
                null !== t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) && t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) !== a && (t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r).style.display = "block",
                    t.getElementById("tb-more-comments-" + e + "-" + r).style.display = "none")
            },
            tbsForm.showComments = function (e, r) {
                null !== t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) && t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r) !== a && (t.getElementById("tb-more-comments-" + e + "-" + r).style.display = "block",
                    t.getElementById("tb-review-popup-admincomment-button-" + e + "-" + r).style.display = "none")
            },
            tbrForm.openSiteOptions = function () {
                var e = t.getElementById("tbactive-site-div");
                "none" === e.style.display ? e.style.display = "block" : e.style.display = "none"
            },
            tbrForm.reviewTwoSite = function (e, r) {
                t.getElementById("tb-sort-site-reviews").value = e;
                t.getElementById("tb-sort-site-reviews").value;
                t.getElementById("tbactive-site").value = e,
                    t.getElementById("tbactive-site").innerHTML = r;
                t.getElementById("tbactive-site-div").style.display = "none";
                tbsForm.sortReviews()
            },
            tbsForm.sortReviews = function () {
                "block" === t.getElementById("targetbay-site-reviews").style.display || "" === t.getElementById("targetbay-site-reviews").style.display ? tbsForm.getSiteReviews("sorting") : "block" === t.getElementById("targetbay-product-reviews").style.display || "" === t.getElementById("targetbay-product-reviews").style.display ? tbsForm.getProductReviews("sorting") : tbsForm.getSiteReviews("sorting")
            },
            tbsForm.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        e.tbRecommend = {},
            tbRecommend.init = function () {
                var n = t.querySelectorAll("div.tb_recommend");
                [].forEach.call(n, function (n) {
                    var i = n.getAttribute("data-tb"),
                        s = "_a=" + r.apiToken + "&_i=" + r.apiKey,
                        o = "_t=" + e.btoa(s);
                    o += "&wid=" + i,
                    "" !== r.productId && (o += "&pid=" + r.productId);
                    var l, d = tbMessages.getCookie("tb_fetch_points");
                    if ("1" === r.trackingType) {
                        var g = tbMessages.getCookie("user_loggedin");
                        d !== a && null !== d && "" !== d && "" === g && (g = tbMessages.getCookieDecode("tb_fetch_points", "_ulogin")),
                            "1" == g ? (l = tbMessages.getCookie("trackingid"),
                            d !== a && null !== d && "" !== d && "" === l && (l = tbMessages.getCookieDecode("tb_fetch_points", "_utid"))) : (l = tbMessages.getCookie("targetbay_session_id"),
                            d !== a && null !== d && "" !== d && "" === l && (l = tbMessages.getCookieDecode("tb_fetch_points", "_usid")))
                    } else
                        l = tbMessages.getCookie("trackingid"),
                        d !== a && null !== d && "" !== d && "" === l && (l = tbMessages.getCookieDecode("tb_fetch_points", "_utid"));
                    o += "&uid=" + l,
                        tbRecommend.getAjax(tbEvents.webhookUrl + "product-recommend?" + o, function (r) {
                            var i = JSON.parse(r);
                            if (i.content !== a) {
                                n.innerHTML = i.content,
                                    tbRecommend.widthReset(1, 1);
                                var s = e.location.href;
                                if (s.indexOf("teststore") !== -1 || s.indexOf("utzy") !== -1) {
                                    var o = t.getElementsByClassName("tb_recommendation_buy"),
                                        l = 0,
                                        d = o.length;
                                    for (l; l < d; l++)
                                        t.addEventListener && o[l].addEventListener("click", function (e) {
                                            e.preventDefault();
                                            var r = (e.target,
                                                    this.getAttribute("id")),
                                                n = t.getElementById("custom_display_utzy");
                                            n !== a && null !== n && n.remove();
                                            var i = t.querySelector('h1[itemprop="name"]');
                                            null !== i && i !== a && (i.className += " product-name"),
                                                t.getElementById("tb-recom-carousel").insertAdjacentHTML("beforebegin", '<div id="custom_display_utzy" style="display:block;"></div>'),
                                                t.getElementById("custom_display_utzy").innerHTML = t.getElementById("tb_product_recomm_" + r).innerHTML;
                                            var s = t.querySelector("#custom_display_utzy .tb_recommendation_close");
                                            s.setAttribute("onclick", "tbRecommend.customPopupClose();")
                                        })
                                }
                            }
                        })
                }),
                r.tbReview !== a && (r.tbReview.tbSiteReview || r.tbReview.tbProductReview) || tbRecommend.loadFontAwesome()
            },
            tbRecommend.customPopupClose = function () {
                var e = t.getElementById("custom_display_utzy");
                e !== a && null !== e && e.remove()
            },
            tbRecommend.loadFontAwesome = function () {
                var e = t,
                    r = e.createElement("script");
                r.src = "https://use.fontawesome.com/6f6f19e46b.js",
                    r.setAttribute("data-timestamp", +new Date),
                    (e.head || e.body).appendChild(r)
            },
            tbRecommend.caroselleft = function (e) {
                var r = t.querySelector(".widget-" + e).parentElement.getAttribute("data-tb");
                r = '"' + r.replace(/^"*|"*$/g, "") + '"';
                var a, n, i = t.querySelector("[data-tb=" + r + "]").clientWidth;
                if (i >= 0 && i <= 576 ? (a = i / 1,
                    n = 1) : i >= 577 && i <= 768 ? (a = i / 3,
                    n = 3) : i >= 769 && i <= 992 ? (a = i / 4,
                    n = 4) : i > 992 && (a = t.querySelector(".widget-" + e).getAttribute("data-width"),
                    n = t.querySelector(".widget-" + e).getAttribute("data-product")),
                1 != parseInt(t.querySelector(".widget-" + e).getAttribute("data-id"))) {
                    var s = parseInt(t.querySelector(".widget-" + e).getAttribute("data-id")) - 1;
                    t.querySelector(".widget-" + e).setAttribute("data-id", s);
                    var o = parseInt(t.querySelector(".slider-group-widgets-" + e).style.left.replace(/[^-\d\.]/g, "").replace("-", "")),
                        l = a * n,
                        d = o - l;
                    t.querySelector(".slider-group-widgets-" + e).style.left = -d + "px"
                }
            },
            tbRecommend.caroselright = function (e, r) {
                var a = t.querySelector(".widget-" + e).parentElement.getAttribute("data-tb");
                a = '"' + a.replace(/^"*|"*$/g, "") + '"';
                var n, i, s = t.querySelector("[data-tb=" + a + "]").clientWidth;
                s >= 0 && s <= 576 ? (n = s / 1,
                    i = 1) : s >= 577 && s <= 768 ? (n = s / 3,
                    i = 3) : s >= 769 && s <= 992 ? (n = s / 4,
                    i = 4) : s > 992 && (n = t.querySelector(".widget-" + e).getAttribute("data-width"),
                    i = t.querySelector(".widget-" + e).getAttribute("data-product"));
                var o = Math.ceil(r / i);
                if (parseInt(t.querySelector(".widget-" + e).getAttribute("data-id")) != o) {
                    var l = parseInt(t.querySelector(".widget-" + e).getAttribute("data-id")) + 1;
                    t.querySelector(".widget-" + e).setAttribute("data-id", l);
                    var d = parseInt(t.querySelector(".slider-group-widgets-" + e).style.left.replace(/[^-\d\.]/g, "").replace("-", "")),
                        g = n * i,
                        b = d + g;
                    t.querySelector(".slider-group-widgets-" + e).style.left = -b + "px"
                }
            },
            tbRecommend.sendAction = function (e, t) {
                var r = tbRecommend.extend(t, n);
                "buy" !== e && "view" !== e && "rate" !== e && (r.actionType = e,
                    e = "sendaction"),
                    tbRecommend.includeJavascript(easyrecApiUrl + e + "?tenantid=" + tenantId + "&apikey=" + apiKey + (r.userId ? "&userid=" + r.userId : "") + "&itemid=" + r.itemId + "&sessionid=" + r.sessionId + "&itemurl=" + encodeURIComponent(r.itemUrl) + "&itemdescription=" + encodeURIComponent(r.itemDescription) + "&itemimageurl=" + encodeURIComponent(r.itemImageUrl) + "&ratingvalue=" + r.ratingValue + "&callback=" + r.actionCallback + "&itemtype=" + r.itemType + (r.actionType ? "&actiontype=" + r.actionType : "") + (r.actionValue ? "&actionvalue=" + r.actionValue : "") + (r.actionTime ? "&actiontime=" + r.actionTime : ""))
            },
            tbRecommend.buy = function (e) {
                tbRecommend.sendAction("buy", e)
            },
            tbRecommend.view = function (e) {
                tbRecommend.sendAction("view", e)
            },
            tbRecommend.rate = function (e) {
                tbRecommend.sendAction("rate", e)
            },
            tbRecommend.getRecommendations = function (e, t) {
                var r = tbRecommend.extend(t, n);
                tbRecommend.includeJavascript(easyrecApiUrl + e + "?tenantid=" + tenantId + "&apikey=" + apiKey + (r.userId ? "&userid=" + r.userId : "") + "&itemid=" + r.itemId + "&itemtype=" + r.itemType + "&requesteditemtype=" + r.requestedItemType + "&actiontype=" + r.basedOnActionType + "&callback=" + r.drawingCallback + "&numberOfResults=" + r.numberOfResults + (r.assocType ? "&assoctype=" + r.assocType : ""))
            },
            tbRecommend.otherUsersAlsoViewed = function (e) {
                tbRecommend.getRecommendations("otherusersalsoviewed", e)
            },
            tbRecommend.otherUsersAlsoBought = function (e) {
                tbRecommend.getRecommendations("otherusersalsobought", e)
            },
            tbRecommend.itemsRatedGoodByOtherUsers = function (e) {
                tbRecommend.getRecommendations("itemsratedgoodbyotherusers", e)
            },
            tbRecommend.recommendationsForUser = function (e) {
                tbRecommend.getRecommendations("recommendationsforuser", e)
            },
            tbRecommend.relatedItems = function (e) {
                tbRecommend.getRecommendations("relateditems", e)
            },
            tbRecommend.relatedItems = function (e) {
                tbRecommend.getRecommendations("actionhistoryforuser", e)
            },
            tbRecommend.getRankings = function (e, t) {
                var r = tbRecommend.extend(t, n);
                tbRecommend.includeJavascript(easyrecApiUrl + e + "?tenantid=" + tenantId + "&apikey=" + apiKey + "&timeRange=" + r.timeRange + "&numberOfResults=" + r.numberOfResults + "&requesteditemtype=" + r.requestedItemType + "&callback=" + r.drawingCallback)
            },
            tbRecommend.mostViewedItems = function (e) {
                tbRecommend.getRankings("mostvieweditems", e)
            },
            tbRecommend.mostBoughtItems = function (e) {
                tbRecommend.getRankings("mostboughtitems", e)
            },
            tbRecommend.mostRatedItems = function (e) {
                tbRecommend.getRankings("mostrateditems", e)
            },
            tbRecommend.bestRatedItems = function (e) {
                tbRecommend.getRankings("bestrateditems", e)
            },
            tbRecommend.worstRatedItems = function (e) {
                tbRecommend.getRankings("worstrateditems", e)
            },
            tbRecommend.itemsInCluster = function (e) {
                var t = tbRecommend.extend(e, n);
                tbRecommend.includeJavascript(easyrecApiUrl + "itemsincluster?tenantId=" + tenantId + "&apikey=" + apiKey + "&clusterId=" + t.clusterId + "&strategy=" + t.strategy + "&useFallback=" + t.useFallback + "&numberOfResults=" + t.numberOfResults + "&requesteditemtype=" + t.requestedItemType + "&callback" + t.drawingCallback)
            },
            tbRecommend.cluster = function (e) {
                var t = tbRecommend.extend(e, n);
                tbRecommend.includeJavascript(easyrecApiUrl + "clusters?tenantId=" + tenantId + "&apikey=" + apiKey + "&callback" + t.drawingCallback)
            },
            tbRecommend.itemtypes = function (e) {
                var t = tbRecommend.extend(e, n);
                tbRecommend.includeJavascript(easyrecApiUrl + "itemtypes?tenantId=" + tenantId + "&apikey=" + apiKey + "&callback" + t.drawingCallback)
            },
            tbRecommend.drawRecommendationList = function (e) {
                console.log(typeof e.recommendedItems),
                    tbRecommend.drawRecommendationListToDiv(e, "messages_product_view")
            },
            tbRecommend.drawRecommendationListToDiv = function (e, r) {
                if ("undefined" == typeof e.error) {
                    try {
                        var a = e.recommendedItems
                    } catch (n) {
                        return
                    }
                    if ("undefined" != typeof e.recommendedItems && ("undefined" == typeof a.length && (a = new Array(a)),
                    a.length > 0)) {
                        for (listString = "<ul>",
                                 x = 0; x < a.length; x++)
                            listString += '<li><a href="' + a[x].url + '">' + a[x].description + "</a></li>";
                        t.getElementById(r).innerHTML += listString + "</ul>"
                    }
                }
            },
            tbRecommend.drawRecommendationListWithPictures = function (e) {
                tbRecommend.drawRecommendationListWithPicturesToDiv(e, "recommenderDiv")
            },
            tbRecommend.drawRecommendationListWithPicturesToDiv = function (e, r) {
                if ("undefined" == typeof e.error) {
                    try {
                        var a = e.recommendedItems
                    } catch (n) {
                        return
                    }
                    if ("undefined" == typeof a.length && (a = new Array(a)),
                    a.length > 0)
                        for (x = 0; x < a.length; x++)
                            t.getElementById(r).innerHTML += '<div style="width:170px;padding:5px;float:left;text-align:center;"><a href="' + a[x].url + '"><img style="width:150px;border:0px;" alt="' + a[x].description + '" src="' + a[x].imageUrl + '"/><br/>' + a[x].description + "</a></div>"
                }
            },
            tbRecommend.includeJavascript = function (e) {
                var r = t.createElement("script");
                r.type = "text/javascript",
                    r.src = e,
                    t.getElementsByTagName("head")[0].appendChild(r)
            },
            tbRecommend.extend = function (e, t) {
                var r = e;
                for (var n in t)
                    src = r[n],
                        copy = t[n],
                    null === src && copy !== a && (r[n] = copy);
                return r
            },
            tbRecommend.createSessionId = function () {
                var e = "sessionVar",
                    r = tbRecommend.generateSessionId(15);
                return String((new Date).getTime()).replace(/\D/gi, ""),
                    t.cookie = e + "=" + r + "; path=/",
                    r
            },
            tbRecommend.generateSessionId = function (e) {
                for (chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
                         returnValue = "",
                         x = 0; x < e; x++)
                    i = Math.floor(62 * Math.random()),
                        returnValue += chars.charAt(i);
                return "JS_" + returnValue
            },
            tbRecommend.getSessionId = function () {
                for (var e = "sessionVar=", r = t.cookie.split(";"), a = 0; a < r.length; a++) {
                    for (var n = r[a];
                         " " == n.charAt(0);)
                        n = n.substring(1, n.length);
                    if (0 == n.indexOf(e))
                        return n.substring(e.length, n.length)
                }
                return tbRecommend.createSessionId()
            };
        var n = {
            drawingCallback: "drawRecommendationList",
            actionCallback: "void",
            userId: null,
            itemId: "-1",
            sessionId: tbRecommend.getSessionId(),
            itemUrl: "",
            itemDescription: "",
            itemImageUrl: "",
            timeRange: "ALL",
            numberOfResults: 10,
            actionTime: null,
            strategy: "NEWEST",
            useFallback: !1,
            itemType: "ITEM",
            requestedItemType: "ITEM",
            clusterId: null,
            basedOnActionType: "VIEW"
        };
        tbRecommend.tbExtend = function (e, t) {
            for (var r in t)
                t.hasOwnProperty(r) && (e[r] = t[r]);
            return e
        },
            tbRecommend.getAjax = function (t, r) {
                var a = e.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                return a.open("GET", t),
                    a.onreadystatechange = function () {
                        a.readyState > 3 && 200 === a.status && r(a.responseText)
                    },
                    a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    a.send(),
                    a
            },
            tbRecommend.widthReset = function (e, r) {
                var n = t.querySelectorAll("div.tb_recommend");
                [].forEach.call(n, function (t) {
                    var n = t.getAttribute("data-tb");
                    if (n !== a && null !== n) {
                        var i, s = t.clientWidth,
                            o = t.querySelectorAll(".tb-recom-product-container");
                        if (null !== t.querySelector("#tb-recommendation") && null !== t.querySelector("#tb-slider-group") && null !== t.querySelector("#tb-recom-carousel")) {
                            for (t.querySelector("#tb-recommendation").setAttribute("data-id", "1"),
                                     t.querySelector("#tb-slider-group").style.left = "0px",
                                     i = 0; i < o.length; ++i) {
                                var l = s;
                                if (e) {
                                    var d;
                                    s >= 0 && s <= 576 ? (l = s / 1,
                                        d = 1) : s >= 577 && s <= 768 ? (l = s / 3,
                                        d = 3) : s >= 769 && s <= 992 ? (l = s / 4,
                                        d = 4) : s > 992 && (l = t.querySelector("#tb-recommendation").getAttribute("data-width"),
                                        d = t.querySelector("#tb-recommendation").getAttribute("data-product"))
                                }
                                o[i].style.width = l + "px";
                                var g = l * o.length;
                                t.querySelector("#tb-slider-group").style.width = g + "px"
                            }
                            if (r) {
                                var b = 0;
                                setTimeout(function () {
                                    b = t.querySelector("#tb-slider-group").clientHeight,
                                        t.querySelector("#tb-recom-carousel").setAttribute("style", "height:" + b + "px")
                                }, 1200)
                            }
                        }
                    }
                })
            },
            tbRecommend.onSwiping = function (e, t) {
                var r, a, n, i, s, o, l, d = e,
                    g = 150,
                    b = 100,
                    m = 500,
                    c = t || function (e, t, r, a, n) {
                    };
                d.addEventListener("touchstart", function (e) {
                    var t = e.changedTouches[0];
                    r = "none",
                        a = "none",
                        dist = 0,
                        n = t.pageX,
                        i = t.pageY,
                        l = (new Date).getTime(),
                        c(e, "none", "start", a, 0),
                        e.preventDefault()
                }, !1),
                    d.addEventListener("touchmove", function (e) {
                        var t = e.changedTouches[0],
                            s = t.pageX - n,
                            o = t.pageY - i;
                        Math.abs(s) > Math.abs(o) ? (r = s < 0 ? "left" : "right",
                            c(e, r, "move", a, s)) : (r = o < 0 ? "up" : "down",
                            c(e, r, "move", a, o)),
                            e.preventDefault()
                    }, !1),
                    d.addEventListener("touchend", function (e) {
                        var t = (e.changedTouches[0],
                        (new Date).getTime() - l);
                        t <= m && (Math.abs(s) >= g && Math.abs(o) <= b ? a = r : Math.abs(o) >= g && Math.abs(s) <= b && (a = r)),
                            c(e, r, "end", a, "left" == r || "right" == r ? s : o),
                            e.preventDefault()
                    }, !1)
            },
        (r.tbRecommendations === a || r.tbRecommendations) && (tbRecommend.init(),
            e.addEventListener("orientationchange", function () {
                console.log(screen.orientation),
                    tbRecommend.widthReset(0, 1)
            }, !1))
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        if (e.tbinstagramform = {},
            tbinstagramform.formcolageTemplate = function (e, t, r, a, n) {
                for (var i = e + 1, s = [], o = i; o < t; o++) {
                    var l = n[o].s3_image_url ? n[o].s3_image_url : n[o].media_url,
                        d = n[o].s3_fullimage_url ? n[o].s3_fullimage_url : n[o].media_url,
                        g = r;
                    g = g.replace(new RegExp("#id", "g"), i),
                        g = g.replace(new RegExp("#username", "g"), n[o].username),
                        g = g.replace(new RegExp("#mediacontent", "g"), n[o].media_content),
                        g = g.replace(new RegExp("#mediaurl", "g"), l),
                        g = g.replace(new RegExp("#mediafullurl", "g"), d),
                        g = g.replace(new RegExp("#likecount", "g"), n[o].like_count),
                        g = g.replace("#productname", n[o].product_details.name),
                        g = g.replace("#productimage", n[o].product_details.image),
                        g = g.replace("#producturl", n[o].product_details.product_url),
                        s.push(g),
                        i++
                }
                var b = a,
                    m = n[e].s3_image_url ? n[e].s3_image_url : n[e].media_url;
                return b = b.replace(new RegExp("#id", "g"), e),
                    b = b.replace("#username", n[e].username),
                    b = b.replace("#mediacontent", n[e].media_content),
                    b = b.replace(new RegExp("#mediaurl", "g"), m),
                    b = b.replace("#likecount", n[e].like_count),
                    b = b.replace("#productname", n[e].product_details.name),
                    b = b.replace("#productimage", n[e].product_details.image),
                    b = b.replace("#producturl", n[e].product_details.product_url), {
                    bodyImage: s.join(""),
                    headerImage: b
                }
            },
            tbinstagramform.formColageImages = function (e) {
                var t = {};
                return 5 === e.productCount && (t = tbinstagramform.formcolageTemplate(0, 5, e.content.body, e.content.header, e.data),
                    e.layout = e.layout.replace("#header1", t.headerImage),
                    e.layout = e.layout.replace("#content1", t.bodyImage)),
                10 === e.productCount && (t = tbinstagramform.formcolageTemplate(0, 5, e.content.body, e.content.header, e.data),
                    e.layout = e.layout.replace("#header1", t.headerImage),
                    e.layout = e.layout.replace("#content1", t.bodyImage),
                    t = tbinstagramform.formcolageTemplate(5, 10, e.content.body, e.content.header, e.data),
                    e.layout = e.layout.replace("#header2", t.headerImage),
                    e.layout = e.layout.replace("#content2", t.bodyImage)),
                    e.layout
            },
            tbinstagramform.formGalleryImages = function (e) {
                var t = [],
                    r = 1;
                return e.data.length > 0 && e.data.forEach(function (a) {
                    var n = a.s3_image_url ? a.s3_image_url : a.media_url,
                        i = a.s3_fullimage_url ? a.s3_fullimage_url : a.media_url,
                        s = e.content;
                    s = s.replace(new RegExp("#id", "g"), r),
                        s = s.replace(new RegExp("#username", "g"), a.username),
                        s = s.replace(new RegExp("#mediacontent", "g"), a.media_content),
                        s = s.replace(new RegExp("#mediaurl", "g"), n),
                        s = s.replace(new RegExp("#mediafullurl", "g"), i),
                        s = s.replace(new RegExp("#likecount", "g"), a.like_count),
                        s = s.replace("#productname", a.product_details.name),
                        s = s.replace("#productimage", a.product_details.image),
                        s = s.replace("#producturl", a.product_details.product_url),
                        t.push(s),
                        r++
                }),
                    e.layout = e.layout.replace("#IMAGES", t.join("")),
                    e.layout
            },
            tbinstagramform.productPageImages = function (e) {
                tbinstagramform.ajax(e + "/products/" + r.productId + "?_t=" + r.publicKey)
            },
            tbinstagramform.homePageImages = function (e) {
                tbinstagramform.ajax(e + "/home?_t=" + r.publicKey)
            },
            tbinstagramform.parseResponse = function (r) {
                var n = JSON.parse(r);
                if (0 === n.errors) {
                    if (0 === n.productCount)
                        return !1;
                    var i = t.getElementById("targetbay_instagram_images"),
                        s = t.querySelector("body");
                    if (null !== i) {
                        if (n.productCount > 2 && 5 !== n.productCount && 10 !== n.productCount) {
                            var o = tbinstagramform.formGalleryImages(n);
                            i.insertAdjacentHTML("afterbegin", o)
                        } else if (5 === n.productCount || 10 === n.productCount) {
                            var l = tbinstagramform.formColageImages(n);
                            i.insertAdjacentHTML("afterbegin", l)
                        } else
                            i.insertAdjacentHTML("afterbegin", n.content);
                        "" !== n.modal && s.insertAdjacentHTML("beforeend", n.modal)
                    }
                    for (var d = t.getElementById("tbg_open_insta_popup_modal"), g = t.getElementsByClassName("tbg_single_cont"), b = t.getElementsByClassName("tbg_modal_close")[0], m = 0, c = function () {
                        d.style.display = "block",
                            m = this.getAttribute("data-id");
                        var e = this.getAttribute("data-content"),
                            r = (this.getAttribute("data-image"),
                                this.getAttribute("data-fullimage")),
                            n = this.getAttribute("data-username"),
                            i = (this.getAttribute("data-likes"),
                                this.getAttribute("data-productimage")),
                            s = this.getAttribute("data-productname"),
                            o = this.getAttribute("data-producturl");
                        if (this.getAttribute("data-productname") !== a && "undefined" !== this.getAttribute("data-productname") && "" !== this.getAttribute("data-productname")) {
                            t.getElementsByClassName("tbg_modal_header")[0].style.display = "block";
                            var l = t.getElementById("product-image");
                            l.setAttribute("src", i);
                            var g = t.getElementById("product-url");
                            g.setAttribute("href", o);
                            var b = t.getElementById("tbg_modal_prodname");
                            b.innerHTML = "";
                            var c = t.createTextNode(s);
                            b.appendChild(c)
                        } else
                            t.getElementsByClassName("tbg_modal_header")[0].style.display = "none";
                        t.getElementById("main-insta-image").setAttribute("src", r),
                            t.getElementById("insta-content").innerHTML = e;
                        var u = t.getElementById("user_follow_link"),
                            y = t.getElementById("tbg_insta_posted_usertag");
                        u.setAttribute("href", "https://www.instagram.com/" + n),
                            y.innerText = "@" + n;
                        var p = t.getElementsByClassName("tbg_insta_mainimg_cnt")[0].offsetHeight;
                        p > 100 && (t.getElementsByClassName("tbg_insta_mainimg_cnt")[0].className += " tbg_insta_mainimg_cntext")
                    }, u = 0; u < g.length; u++)
                        g[u].addEventListener("click", c, !1);
                    b.onclick = function () {
                        d.style.display = "none";
                        var e = t.getElementsByClassName("tbg_insta_mainimg_cnt")[0];
                        e.classList.contains("tbg_insta_mainimg_cntext") && e.classList.remove("tbg_insta_mainimg_cntext")
                    };
                    var y = function () {
                            var e = "";
                            m = parseInt(m) - 1,
                                e = t.getElementById("tbg-" + m),
                            null !== e && 0 !== m || (m = 1),
                                e = t.getElementById("tbg-" + m),
                                e.click()
                        },
                        p = function () {
                            var e = "";
                            m = parseInt(m) + 1,
                                e = t.getElementById("tbg-" + m),
                            null !== e && 0 !== m || (m = 1),
                                e = t.getElementById("tbg-" + m),
                                e.click()
                        },
                        v = t.getElementsByClassName("left-arrow");
                    v[0].addEventListener("click", y, !1);
                    var _ = t.getElementsByClassName("right-arrow");
                    _[0].addEventListener("click", p, !1),
                        t.onkeyup = function (r) {
                            var a = t.getElementById("tbg_open_insta_popup_modal");
                            r = r || e.event,
                            37 === r.keyCode && "block" === a.style.display && y(),
                            39 === r.keyCode && "block" === a.style.display && p()
                        },
                        e.onclick = function (e) {
                            if (e.target == d) {
                                d.style.display = "none";
                                var r = t.getElementsByClassName("tbg_insta_mainimg_cnt")[0];
                                r.classList.contains("tbg_insta_mainimg_cntext") && r.classList.remove("tbg_insta_mainimg_cntext")
                            }
                        }
                }
            },
            tbinstagramform.ajax = function (e) {
                _tbC.getAjax(e, tbinstagramform.parseResponse)
            },
        r.tbInstagram !== a && r.tbInstagram === !0) {
            var n = "https://" + r.apiStatus + ".targetbay.com/api/v1/instagram";
            r.productId !== a && "" !== r.productId && tbinstagramform.productPageImages(n);
            var i = e.location.pathname;
            "/" === i && tbinstagramform.homePageImages(n)
        }
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e.tbBISData = {},
            tbBISData.init = function () {
                1 == r.productStockStatus && tbBISData.backInStock()
            };
        var n = t.getElementById("tb-backinstock");
        n !== a && null !== n || (n = t.getElementById("backinstock"));
        var i = e.location.href;
        null !== n && n !== a && n.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("backinstock_notify_link"))
                if (r.childProduct !== a) {
                    var n = JSON.parse(r.childProduct);
                    console.log(n.child_product_id),
                        n.child_product_id == a ? (t.getElementById("targetbay_backinstock_products").style.display = "block",
                            s()) : o()
                } else
                    o()
        });
        var s = function () {
                t.getElementById("tb-success-backinstock") && (t.getElementById("tb-backinstock-content").style.display = "block",
                    t.getElementById("tb-success-backinstock").style.display = "none")
            },
            o = function () {
                "" === r.userMail ? (t.getElementById("targetbay_backinstock_products").style.display = "block",
                    s()) : l()
            };
        tbBISData.backInStock = function () {
            var s;
            if (r.publicKey !== a)
                s = r.publicKey;
            else {
                var o = "_a=" + r.apiToken + "&_i=" + r.apiKey;
                s = e.btoa(o)
            }
            var l = tbEvents.webhookUrl + "show-back-in-stock-widget?_t=" + s,
                d = {
                    products: r.childProduct,
                    product_name: r.productName
                },
                g = new XMLHttpRequest;
            g.open("POST", l),
                g.setRequestHeader("Content-Type", "application/json"),
                g.onreadystatechange = function () {
                    if (4 === g.readyState && 200 === g.status) {
                        var e = JSON.parse(g.responseText);
                        "" !== e && "" !== e.content && (n.innerHTML = e.content,
                        t.getElementsByClassName("backinstock_notify_link")[0] !== a && null !== t.getElementsByClassName("backinstock_notify_link")[0] && (i.indexOf("g-loves") !== -1 ? t.querySelector(".backinstock_notify_link").style.display = "none" : t.querySelector(".backinstock_notify_link").style.display = "inline-block"),
                        "" !== e.content && t.getElementsByClassName("tb-bis-email")[0] !== a && null !== t.getElementsByClassName("tb-bis-email")[0] && ("" === r.userMail ? t.getElementsByClassName("tb-bis-email")[0].style.display = "block" : t.getElementsByClassName("tb-bis-email")[0].style.display = "none"))
                    }
                },
                g.send(JSON.stringify(d))
        },
        null !== n && n !== a && n.addEventListener("click", function (e) {
            e.target && e.target.classList.contains("tb_widget_container") && l()
        }),
        i.indexOf("g-loves") !== -1 && t.addEventListener("click", function (e) {
            e.target && e.target.classList.contains("amconf-image-outofstock") ? t.querySelector(".backinstock_notify_link").style.display = "inline-block" : !e.target.classList.contains("amconf-image-outofstock") && e.target.classList.contains("amconf-image") && (t.querySelector(".backinstock_notify_link").style.display = "none")
        });
        var l = function () {
            var n = 0,
                i = "";
            if (i = "" === r.userMail ? t.getElementsByName("tbBackInstockEmail")[0].value : r.userMail,
            r.childProduct !== a && null !== r.childProduct) {
                var s = JSON.parse(r.childProduct);
                if (console.log(s.child_product_id),
                s.child_product_id == a) {
                    for (var o = [], l = t.getElementsByClassName("tb-bisChildproduct"), d = 0; l[d]; ++d)
                        l[d].checked && o.push(l[d].value);
                    0 == o.length ? (t.querySelector(".tb-bsproduct-error").style.display = "block",
                        n = 1) : t.querySelector(".tb-bsproduct-error").style.display = "none"
                }
            }
            if ("" === i ? (t.querySelector(".tb-info").style.display = "block",
                n = 1) : t.querySelector(".tb-info").style.display = "none",
            0 == n) {
                var g = tbBISData.getCookie("tb_fetch_points");
                "1" == r.trackingType ? (tbBISData.userLoggedIn = tbBISData.getCookie("user_loggedin"),
                g !== a && null !== g && "" !== g && null !== tbBISData.userLoggedIn && (tbBISData.userLoggedIn = tbBISData.getCookieDecode("tb_fetch_points", "_ulogin")),
                    "1" == tbBISData.userLoggedIn ? (tbBISData.tbUserId = tbBISData.getCookie("trackingid"),
                    g !== a && null !== g && "" !== g && null !== tbBISData.tbUserId && (tbBISData.tbUserId = tbBISData.getCookieDecode("tb_fetch_points", "_utid"))) : (tbBISData.tbUserId = tbBISData.getCookie("targetbay_session_id"),
                    g !== a && null !== g && "" !== g && null !== tbBISData.tbUserId && (tbBISData.tbUserId = tbBISData.getCookieDecode("tb_fetch_points", "_usid")))) : (tbBISData.tbUserId = tbBISData.getCookie("trackingid"),
                g !== a && null !== g && "" !== g && null !== tbBISData.tbUserId && (tbBISData.tbUserId = tbBISData.getCookieDecode("tb_fetch_points", "_utid")));
                var b, m = {
                    index_name: r.apiKey,
                    user_id: tbBISData.tbUserId,
                    user_email: i,
                    product_id: r.productId,
                    product_name: r.productName,
                    child_product: o
                };
                if (r.publicKey !== a)
                    b = r.publicKey;
                else {
                    var c = "_a=" + r.apiToken + "&_i=" + r.apiKey;
                    b = e.btoa(c)
                }
                var u = tbEvents.webhookUrl + "process-back-in-stock-request?_t=" + b,
                    y = new XMLHttpRequest;
                y.open("POST", u),
                    y.setRequestHeader("Content-Type", "application/json"),
                    y.onreadystatechange = function () {
                        if (4 === y.readyState && 200 === y.status) {
                            var e = JSON.parse(y.responseText);
                            "Success" === e.msg && (t.getElementById("targetbay_backinstock_products").style.display = "block",
                                t.getElementById("tb-backinstock-content").style.display = "none",
                                t.getElementById("tb-success-backinstock").style.display = "block")
                        }
                    },
                    y.send(JSON.stringify(m))
            }
        };
        tbBISData.tbBackInStockClosePopup = function () {
            t.getElementById("targetbay_backinstock_products").style.display = "none"
        },
            tbBISData.getCookie = function (e) {
                for (var r = e + "=", a = t.cookie.split(";"), n = 0; n < a.length; n++) {
                    for (var i = a[n];
                         " " === i.charAt(0);)
                        i = i.substring(1);
                    if (0 === i.indexOf(r))
                        return i.substring(r.length, i.length)
                }
                return ""
            },
            tbBISData.getCookieDecode = function (e, r) {
                for (var n = e + "=", i = t.cookie.split(";"), s = 0, o = i.length; s < o; s++) {
                    for (var l = i[s];
                         " " === l.charAt(0);)
                        l = l.substring(1);
                    if (0 === l.indexOf(n))
                        for (var d = l.substring(n.length, l.length), g = tbBISData.b64DecodeUnicode(d), b = g.split("&"), m = 0, c = b.length; m < c; m++) {
                            var u = b[m].split("=");
                            if ("" !== u[0] && u[0] !== a && u[0] === r)
                                return u[1]
                        }
                }
                return ""
            },
            tbBISData.b64DecodeUnicode = function (e) {
                var t = e.replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&"),
                    r = decodeURIComponent(atob(t).split("").map(function (e) {
                        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                    }).join(""));
                return r
            },
            tbBISData.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e.tbwTrack = {},
            tbwTrack.init = function () {
                tbwTrack.reviewTrackUrl = tbEvents.webhookUrl + "update-people-insights?api_token=" + r.apiToken
            },
            tbwTrack.reviewUserTrack = function (t) {
                var n = 2592e6,
                    i = _tbC.getCookie("utm_token"),
                    s = 0;
                if (i === a || null === i || "" === i || "undefined" === i) {
                    var o = (new Date).getTime(),
                        i = o + "-" + _tbC.tbUserId;
                    s = 1,
                        _tbC.setCookie("utm_token", i, n)
                } else {
                    var l = i.split("-");
                    console.log(l),
                    l[1] !== a && null !== l[1] && "" !== l[1] && (i = l[0] + "-" + _tbC.tbUserId,
                        s = 1,
                        _tbC.setCookie("utm_token", i, n))
                }
                var d = "&index_name=" + r.apiKey + "&type=" + t + "&user_id=" + _tbC.tbUserId + "&user_token=" + i + "&product_name=" + encodeURIComponent(r.productName) + "&product_url=" + e.location.href + "&review_flag=" + s,
                    g = new XMLHttpRequest;
                g.open("GET", tbwTrack.reviewTrackUrl + d),
                    g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                    g.onreadystatechange = function () {
                        4 === g.readyState && 200 === g.status && console.log("Review widget user tracked.")
                    },
                    g.send()
            },
            tbwTrack.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e._tbCr = {},
            _tbCr.slideMarginLeft = _tbCr.slideMarginRight = _tbCr.click = _tbCr.page = _tbCr.clickVertical = _tbCr.slideMarginBottom = _tbCr.slideMarginTop = 0,
            _tbCr.count = 10,
            _tbCr.timer = null,
            _tbCr.init = function () {
                _tbC.$("[class=tb_review_carousel]").length > 0 && _tbCr.initReviewCarouselWidget()
            },
            _tbCr.initReviewCarouselWidget = function () {
                _tbCr.apiUrl = "https://" + r.apiStatus + ".targetbay.com",
                    _tbCr.publicUrl = _tbCr.apiUrl + "/api/v1/webhooks/",
                    _tbCr.reviewWidgetUrl = _tbCr.publicUrl + "reviews/carousel?api_token=" + r.apiToken;
                for (var e = _tbC.$("[class=tb_review_carousel]"), t = [], n = 0; n <= e.length - 1; n++)
                    "" !== e[n].getAttribute("data-review-id") && e[n].getAttribute("data-review-id") !== a && t.push(e[n].getAttribute("data-review-id"));
                var i = {
                        index_name: r.apiKey,
                        carousel: t
                    },
                    s = new XMLHttpRequest;
                s.open("post", _tbCr.reviewWidgetUrl),
                    s.setRequestHeader("Content-Type", "application/json"),
                    s.onreadystatechange = function () {
                        if (4 === s.readyState && 200 === s.status) {
                            var e = JSON.parse(s.responseText);
                            if ("" != e[0].status && "error" !== e[0].status) {
                                e.forEach(function (e, t, r) {
                                    if ("success" === e.status) {
                                        var a = _tbC.$1("[data-review-id=" + e.layout_class + "]");
                                        a.innerHTML = e.content,
                                            _tbCr.limit = e.settings.limit,
                                            _tbCr.productType = e.settings.productType,
                                            _tbCr.reviewType = e.settings.reviewType,
                                            _tbCr.layout = e.settings.layout,
                                            _tbCr.avgStar = e.settings.avgStar,
                                            _tbCr.limitCl = _tbCr.limit
                                    }
                                });
                                var t = parseInt(_tbC.$("[class=tb-singleslide]").length);
                                "tb-recar-horizontal" === _tbCr.layout ? (_tbCr.manageDivParts(),
                                    _tbCr.addEventListenerHorizontal(),
                                    _tbCr.startSetInterval(),
                                0 === _tbCr.click && _tbCr.disableDiv(["tb-revcarousel-slinavleft-nav", "tb-revcarousel-slinavleft"]),
                                t <= _tbCr.limit && (_tbCr.disableDiv(["tb-revcarousel-slinavright-nav", "tb-revcarousel-slinavright"]),
                                    clearInterval(_tbCr.timer))) : "tb-recar-vertical" === _tbCr.layout && (_tbCr.manageVerticalDivParts(),
                                    _tbCr.addEventListenerVertical(),
                                    _tbCr.startSetInterval(),
                                0 === _tbCr.clickVertical && _tbCr.disableDiv(["tb-revcarousel-slinavtop-nav", "tb-revcarousel-slinavtop"]),
                                t <= _tbCr.limit && (_tbCr.disableDiv(["tb-revcarousel-slinavbottom-nav", "tb-revcarousel-slinavbottom"]),
                                    clearInterval(_tbCr.timer))),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("mouseover", function (e) {
                                        clearInterval(_tbCr.timer),
                                            delete _tbCr.timer
                                    }),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("touchstart", function (e) {
                                        clearInterval(_tbCr.timer),
                                            delete _tbCr.timer
                                    }),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("touchend", function (e) {
                                        _tbCr.startSetInterval()
                                    }),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("mouseleave", function (e) {
                                        _tbCr.startSetInterval()
                                    })
                            }
                        }
                    },
                    s.send(JSON.stringify(i))
            },
            _tbCr.manageDivParts = function () {
                var e = parseInt(_tbC.$("[class=tb-singleslide]").length);
                _tbCr.divWidth = parseInt(_tbC.$1("[class=tb-revcarousel-carousel-inn]").clientWidth) / _tbCr.limit,
                    _tbCr.checkWidgetLimit();
                var t = _tbCr.divWidth * e;
                _tbC.$1("[class=tb-revcarousel-carslide]").style.setProperty("width", t + "px", "important");
                for (var r = 0; r < e; r++)
                    _tbC.$("[class=tb-singleslide]")[r].setAttribute("style", "width : " + _tbCr.divWidth + "px !important")
            },
            _tbCr.manageVerticalDivParts = function () {
                var e = parseInt(_tbC.$("[class=tb-singleslide]").length);
                _tbCr.carouselHeight = _tbCr.maxHeight(_tbC.$("[class=tb-singleslide]")),
                    _tbCr.divHeight = _tbCr.carouselHeight * parseInt(_tbCr.limit),
                    _tbCr.totalDivHeight = _tbCr.divHeight * _tbCr.reviewTotal,
                    _tbC.$1("[class=tb-revcarousel-carousel-inn]").style.setProperty("height", _tbCr.divHeight + "px", "important"),
                    _tbC.$1("[class=tb-revcarousel-carslide]").style.setProperty("height", _tbCr.totalDivHeight + "px", "important");
                for (var t = 0; t < e; t++)
                    _tbC.$("[class=tb-singleslide]")[t].setAttribute("style", "height : " + _tbCr.carouselHeight + "px !important")
            },
            _tbCr.horizonatalRight = function () {
                _tbCr.slideMarginLeft = _tbCr.slideMarginLeft + 1,
                    _tbCr.moveHorizontal()
            },
            _tbCr.horizonatalLeft = function () {
                _tbCr.slideMarginRight = _tbCr.slideMarginRight + 1,
                    _tbCr.moveHorizontal()
            },
            _tbCr.verticalBottom = function () {
                _tbCr.slideMarginBottom = _tbCr.slideMarginBottom + 1,
                    _tbCr.moveVertical()
            },
            _tbCr.verticalTop = function () {
                _tbCr.slideMarginTop = _tbCr.slideMarginTop + 1,
                    _tbCr.moveVertical()
            },
            _tbCr.ajaxCallBack = function (e) {
                if (4 === e.readyState && 200 === e.status) {
                    var t = JSON.parse(e.responseText),
                        r = _tbC.$("[class=tb-singleslide]")[_tbC.$("[class=tb-singleslide]").length - 1];
                    r.insertAdjacentHTML("afterend", t.content),
                        "tb-recar-horizontal" === _tbCr.layout ? _tbCr.manageDivParts() : "tb-recar-vertical" === _tbCr.layout && _tbCr.manageVerticalDivParts()
                }
            },
            _tbCr.moveHorizontal = function () {
                _tbCr.click = _tbCr.slideMarginLeft - _tbCr.slideMarginRight;
                var e = -(_tbCr.divWidth * _tbCr.click);
                _tbC.$1("[class=tb-revcarousel-carslide]").style.setProperty("margin-left", e + "px", "important");
                var t = parseInt(_tbC.$("[class=tb-singleslide]").length);
                if (_tbCr.click === t - _tbCr.limit ? (_tbCr.disableDiv(["tb-revcarousel-slinavright-nav", "tb-revcarousel-slinavright"]),
                    clearInterval(_tbCr.timer)) : _tbCr.enableDiv(["tb-revcarousel-slinavright-nav", "tb-revcarousel-slinavright"]),
                _tbCr.click > 0 && _tbCr.enableDiv(["tb-revcarousel-slinavleft-nav", "tb-revcarousel-slinavleft"]),
                0 === _tbCr.click && (_tbCr.slideMarginRight = 0,
                    _tbCr.slideMarginLeft = 0,
                    _tbCr.disableDiv(["tb-revcarousel-slinavleft-nav", "tb-revcarousel-slinavleft"])),
                _tbCr.click === _tbCr.count) {
                    _tbCr.count = _tbCr.count + 10,
                        _tbCr.page = _tbCr.page + 1;
                    var a = _tbC.$1("[class=carousel-id]"),
                        n = a.textContent,
                        i = {
                            productType: _tbCr.productType,
                            reviewType: _tbCr.reviewType,
                            page: _tbCr.page,
                            index_name: r.apiKey,
                            id: n
                        },
                        s = _tbCr.publicUrl + "reviews/carousel/search/?api_token=" + r.apiToken,
                        o = "POST";
                    _tbCr.ajaxFunction(s, o, i)
                }
            },
            _tbCr.moveVertical = function () {
                _tbCr.clickVertical = _tbCr.slideMarginBottom - _tbCr.slideMarginTop,
                    _tbCr.widgetTop = -(_tbCr.divHeight * _tbCr.clickVertical) / _tbCr.limit,
                    _tbC.$1("[class=tb-revcarousel-carslide]").style.setProperty("margin-top", _tbCr.widgetTop + "px", "important");
                var e = parseInt(_tbC.$("[class=tb-singleslide]").length);
                if (_tbCr.clickVertical === e - _tbCr.limit ? (_tbCr.disableDiv(["tb-revcarousel-slinavbottom-nav", "tb-revcarousel-slinavbottom"]),
                    clearInterval(_tbCr.timer)) : _tbCr.enableDiv(["tb-revcarousel-slinavbottom-nav", "tb-revcarousel-slinavbottom"]),
                _tbCr.clickVertical > 0 && _tbCr.enableDiv(["tb-revcarousel-slinavtop-nav", "tb-revcarousel-slinavtop"]),
                0 === _tbCr.clickVertical && (_tbCr.slideMarginRight = 0,
                    _tbCr.slideMarginLeft = 0,
                    _tbCr.disableDiv(["tb-revcarousel-slinavtop-nav", "tb-revcarousel-slinavtop"])),
                _tbCr.clickVertical === _tbCr.count) {
                    _tbCr.count = _tbCr.count + 10,
                        _tbCr.page = _tbCr.page + 1;
                    var t = _tbC.$1("[class=carousel-id]"),
                        a = t.textContent,
                        n = {
                            productType: _tbCr.productType,
                            reviewType: _tbCr.reviewType,
                            page: _tbCr.page,
                            index_name: r.apiKey,
                            id: a
                        },
                        i = _tbCr.publicUrl + "reviews-carousel/search/?api_token=" + r.apiToken,
                        s = "POST";
                    _tbCr.ajaxFunction(i, s, n)
                }
            },
            _tbCr.addEventListenerHorizontal = function () {
                _tbCr.addEventListener(["tb-revcarousel-slinavright-nav", "tb-revcarousel-slinavright"], "horizonatalRight"),
                    _tbCr.addEventListener(["tb-revcarousel-slinavleft-nav", "tb-revcarousel-slinavleft"], "horizonatalLeft")
            },
            _tbCr.addEventListenerVertical = function () {
                _tbCr.addEventListener(["tb-revcarousel-slinavbottom-nav", "tb-revcarousel-slinavbottom"], "verticalBottom"),
                    _tbCr.addEventListener(["tb-revcarousel-slinavtop-nav", "tb-revcarousel-slinavtop"], "verticalTop")
            },
            _tbCr.startSetInterval = function () {
                var e = parseInt(_tbC.$("[class=tb-singleslide]").length);
                !_tbCr.timer && e > _tbCr.limit && _tbCr.click != e - _tbCr.limit && _tbCr.clickVertical != e - _tbCr.limit && (_tbCr.timer = setInterval(function () {
                    _tbC.$1("[id=tb-revcarousel-slinavright-nav]") && _tbCr.horizonatalRight(),
                    _tbC.$1("[id=tb-revcarousel-slinavbottom-nav]") && _tbCr.verticalBottom()
                }, 3e3))
            },
            _tbCr.ajaxFunction = function (e, t, r) {
                if ("" === e || e === a)
                    return "Url is empty";
                var n = new XMLHttpRequest;
                n.open(t, e),
                    n.setRequestHeader("Content-Type", "application/json"),
                    n.onreadystatechange = function () {
                        if (4 === n.readyState && 200 === n.status) {
                            var e = JSON.parse(n.responseText),
                                t = _tbC.$("[class=tb-singleslide]")[_tbC.$("[class=tb-singleslide]").length - 1];
                            t.insertAdjacentHTML("afterend", e.content),
                                "tb-recar-horizontal" === _tbCr.layout ? _tbCr.manageDivParts() : "tb-recar-vertical" === _tbCr.layout && _tbCr.manageVerticalDivParts()
                        }
                    },
                    n.send(JSON.stringify(r))
            },
            _tbCr.disableDiv = function (e) {
                e && e.forEach(function (e, t, r) {
                    _tbC.$1("[id=" + e + "]") && _tbC.$1("[id=" + e + "]").classList.add("tb-revcarousel-slinav-inact")
                })
            },
            _tbCr.enableDiv = function (e) {
                e && e.forEach(function (e, t, r) {
                    _tbC.$1("[id=" + e + "]") && _tbC.$1("[id=" + e + "]").classList.remove("tb-revcarousel-slinav-inact")
                })
            },
            _tbCr.addEventListener = function (e, t) {
                e && e.forEach(function (e, r, a) {
                    _tbC.$1("[id=" + e + "]") && _tbC.$1("[id=" + e + "]").addEventListener("click", function (e) {
                        "horizonatalRight" === t ? _tbCr.horizonatalRight() : "horizonatalLeft" === t ? _tbCr.horizonatalLeft() : "verticalBottom" === t ? _tbCr.verticalBottom() : "verticalTop" === t && _tbCr.verticalTop()
                    })
                })
            },
            _tbCr.maxHeight = function (e) {
                for (var t = 0, r = 0; r <= e.length - 1; r++)
                    t < e[r].clientHeight && (t = e[r].clientHeight);
                return t
            },
            _tbCr.checkWidgetLimit = function () {
                var e = t.body.clientWidth;
                if (e <= 1200 && e >= 900)
                    _tbCr.limit = 2;
                else if (e <= 900 && e >= 765) {
                    var r = parseInt(_tbC.$1("[class=tb-revcarousel-container]").clientWidth);
                    "on" === _tbCr.avgStar ? (_tbCr.limit = 1,
                        r /= 2) : "off" === _tbCr.avgStar && (_tbCr.limit = 2),
                        _tbCr.limit = 1,
                        _tbCr.divWidth = r / _tbCr.limit
                } else
                    e <= 765 && e >= 0 ? (_tbCr.limit = 1,
                        _tbCr.divWidth = parseInt(_tbC.$1("[class=tb-revcarousel-container]").clientWidth) / _tbCr.limit) : _tbCr.limit = _tbCr.limitCl
            },
            e.addEventListener("resize", function () {
                _tbC.$("[class=tb_review_carousel]").length > 0 && ("tb-recar-horizontal" === _tbCr.layout ? _tbCr.manageDivParts() : "tb-recar-vertical" === _tbCr.layout && _tbCr.manageVerticalDivParts())
            }, !0),
        (r.tbReview === a || r.tbReview.tbProductReview) && _tbCr.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e._tbVgPhGal = {};
        var n = 0;
        _tbVgPhGal.init = function () {
            _tbC.$("[class=tb_review_customer_photo_gallery]").length > 0 && _tbVgPhGal.initReviewCustomerGalleryWidget()
        },
            _tbVgPhGal.initReviewCustomerGalleryWidget = function () {
                _tbVgPhGal.apiUrl = "https://" + r.apiStatus + ".targetbay.com",
                    _tbVgPhGal.publicUrl = _tbVgPhGal.apiUrl + "/api/v1/webhooks/",
                    _tbVgPhGal.reviewWidgetUrl = _tbVgPhGal.publicUrl + "reviews/customer-photo-gallery?api_token=" + r.apiToken;
                for (var i = _tbC.$("[class=tb_review_customer_photo_gallery]"), s = [], o = 0; o <= i.length - 1; o++)
                    "" !== i[o].getAttribute("data-review-id") && i[o].getAttribute("data-review-id") !== a && s.push(i[o].getAttribute("data-review-id"));
                var l = {
                        index_name: r.apiKey,
                        vgallery: s,
                        page: n
                    },
                    d = new XMLHttpRequest;
                d.open("post", _tbVgPhGal.reviewWidgetUrl),
                    d.setRequestHeader("Content-Type", "application/json"),
                    d.onreadystatechange = function () {
                        if (4 === d.readyState && 200 === d.status) {
                            var r = JSON.parse(d.responseText);
                            if ("" != r.status && "error" !== r.status && "success" === r.status) {
                                var a = _tbC.$1("[data-review-id=" + r.layout_class + "]");
                                a.innerHTML = r.content,
                                "" == r.content && (t.getElementById("tbVgLoadMore").innerHTML = "<hr/>",
                                    t.getElementById("tbVgLoadMore").style.width = "100%",
                                    t.getElementById("tbVgLoadMore").style.height = "100%"),
                                    t.onkeydown = function (t) {
                                        t = t || e.event,
                                        27 == t.keyCode && _tbVgPhGal.tbVgModelClose()
                                    }
                            }
                        }
                    },
                    d.send(JSON.stringify(l))
            },
            _tbVgPhGal.customerPhotoGallery = function () {
                t.body.classList.remove("tbClr"),
                    t.getElementById("tbVgImgLoader").style.display = "block",
                    t.getElementById("tbVgLoadMore").style.display = "block",
                    _tbVgPhGal.apiUrl = "https://" + r.apiStatus + ".targetbay.com",
                    _tbVgPhGal.publicUrl = _tbVgPhGal.apiUrl + "/api/v1/webhooks/",
                    _tbVgPhGal.reviewWidgetUrl = _tbVgPhGal.publicUrl + "reviews/customer-photo-gallery/search/?api_token=" + r.apiToken;
                for (var i = _tbC.$("[class=tb_review_customer_photo_gallery]"), s = [], o = 0; o <= i.length - 1; o++)
                    "" !== i[o].getAttribute("data-review-id") && i[o].getAttribute("data-review-id") !== a && s.push(i[o].getAttribute("data-review-id"));
                n++;
                var l = {
                        index_name: r.apiKey,
                        id: s,
                        page: n
                    },
                    d = new XMLHttpRequest;
                d.open("post", _tbVgPhGal.reviewWidgetUrl),
                    d.setRequestHeader("Content-Type", "application/json"),
                    d.onreadystatechange = function () {
                        if (4 === d.readyState && 200 === d.status) {
                            var r = JSON.parse(d.responseText);
                            if ("" != r.status && "error" !== r.status) {
                                var a = t.getElementById("tbVgLoadMore");
                                null !== a && (a.style.display = "block",
                                    t.getElementById("tbVgclrBoth").style.display = "block",
                                    t.getElementById("tbVgImgLoader").style.display = "none");
                                var n = _tbC.$1("[class=TBVgImgGallery");
                                n.innerHTML += r.content,
                                "" == r.content && (t.getElementById("tbVgLoadMore").innerHTML = "<hr/>",
                                    t.getElementById("tbVgLoadMore").style.width = "100%",
                                    t.getElementById("tbVgLoadMore").style.height = "100%"),
                                    t.onkeydown = function (t) {
                                        t = t || e.event,
                                        27 == t.keyCode && _tbVgPhGal.tbVgModelClose()
                                    }
                            }
                        }
                    },
                    d.send(JSON.stringify(l))
            },
            _tbVgPhGal.tbVgModelOpen = function (e) {
                t.getElementById("tbVgPhGalprevArrow").style.display = "block",
                    t.getElementById("tbVgPhGalnextArrow").style.display = "block";
                var r = t.getElementById("PageContainer");
                null !== r && (r.style.transform = "none",
                    t.getElementsByTagName("header")[0].style.zIndex = "1");
                var n = t.querySelector("ul.TBVgImgGallery li:first-child"),
                    i = t.querySelector("ul.TBVgImgGallery li:last-child");
                typeof n !== a && n.id === e.id && (t.getElementById("tbVgPhGalprevArrow").style.display = "none"),
                typeof n !== a && i.id === e.id && (t.getElementById("tbVgPhGalnextArrow").style.display = "none"),
                    t.getElementById("tbVgPhGalRatingImg").style.display = "block",
                    t.getElementById("tbVgPhGalReviewTitle").innerHTML = e.getAttribute("data-reviewtitle"),
                    t.getElementById("tbVgPhGalProductname").innerHTML = e.getAttribute("data-productname"),
                    t.getElementById("tbVgPhGalCustomerImage").src = e.getAttribute("data-customerimage"),
                    t.getElementById("tbVgPhGalLoader").style.display = "none",
                    t.getElementById("tbVgPhGalCustomerImage").style.display = "block";
                var s = t.getElementById("tbVgPhGalGalleryid");
                if (null !== s) {
                    var o = s.value;
                    if ("" !== o) {
                        var l = t.getElementById("tbVgPhGalCustomLink").value;
                        "" == l && (l = e.getAttribute("data-producturl") + "?utm_source=targetbay&utm_medium=review_customer_gallery&utm_token=" + o),
                            t.getElementById("tbVgPhGalModalBuyNow").href = l
                    }
                }
                t.getElementById("tbVgPhGalUsername").innerHTML = e.getAttribute("data-username"),
                    t.getElementById("tbVgPhGalVerifiedBuyer").style.display = 1 == e.getAttribute("data-verified") ? "block" : "none",
                    t.getElementById("tbVgPhGalDate").innerHTML = TBtimeConverter(e.getAttribute("data-timestamp")),
                    t.getElementById("tbVgPhGalRatingImg").src = e.getAttribute("data-ratingimg"),
                    t.getElementById("tbVgPhGalProductImage").src = e.getAttribute("data-productimage"),
                null == e.getAttribute("data-ratingimg") && (t.getElementById("tbVgPhGalRatingImg").style.display = "none"),
                    t.getElementById("tbVgPhGalReviewContent").innerHTML = e.getAttribute("data-review"),
                    t.getElementById("tbVgPhGalCurrentPopupElementId").value = e.id,
                    t.getElementById("tbVgPhGalCustImgRound").innerHTML = e.getAttribute("data-username").charAt(0).toUpperCase(),
                    t.getElementById("tbVgPhGalModalPopup").style.display = "block"
            },
            _tbVgPhGal.tbVgModelClose = function (e) {
                t.getElementById("tbVgPhGalModalPopup").style.display = "none"
            },
            _tbVgPhGal.rightArrowNavigate = function () {
                t.getElementById("tbVgPhGalprevArrow").style.display = "block",
                    t.getElementById("tbVgPhGalnextArrow").style.display = "block";
                var e = t.getElementById("tbVgPhGalCurrentPopupElementId").value,
                    r = t.getElementById(e).nextElementSibling;
                null !== r ? _tbVgPhGal.tbVgModelOpen(r) : t.getElementById("tbVgPhGalnextArrow").style.display = "none"
            },
            _tbVgPhGal.leftArrowNavigate = function () {
                t.getElementById("tbVgPhGalprevArrow").style.display = "block",
                    t.getElementById("tbVgPhGalnextArrow").style.display = "block";
                var e = t.getElementById("tbVgPhGalCurrentPopupElementId").value,
                    r = t.getElementById(e).previousElementSibling;
                null !== r ? _tbVgPhGal.tbVgModelOpen(r) : t.getElementById("tbVgPhGalprevArrow").style.display = "none"
            },
        (r.tbReview === a || r.tbReview.tbProductReview) && _tbVgPhGal.init()
    }(window, document, tbConfig),
    function (e, t, r, a) {
        "use strict";
        e._tbVgPhCr = {},
            _tbVgPhCr.slideMarginLeft = _tbVgPhCr.slideMarginRight = _tbVgPhCr.click = _tbVgPhCr.page = _tbVgPhCr.clickVertical = _tbVgPhCr.slideMarginBottom = _tbVgPhCr.slideMarginTop = 0,
            _tbVgPhCr.count = 10,
            _tbVgPhCr.timer = null,
            _tbVgPhCr.init = function () {
                _tbC.$("[class=tb_review_customer_photo_carousel]").length > 0 && _tbVgPhCr.initCustomerReviewCarouselWidget()
            },
            _tbVgPhCr.initCustomerReviewCarouselWidget = function () {
                _tbVgPhCr.apiUrl = "https://" + r.apiStatus + ".targetbay.com",
                    _tbVgPhCr.publicUrl = _tbVgPhCr.apiUrl + "/api/v1/webhooks/",
                    _tbVgPhCr.reviewWidgetUrl = _tbVgPhCr.publicUrl + "reviews/customer-photo-gallery?api_token=" + r.apiToken;
                for (var n = _tbC.$("[class=tb_review_customer_photo_carousel]"), i = [], s = 0; s <= n.length - 1; s++)
                    "" !== n[s].getAttribute("data-review-id") && n[s].getAttribute("data-review-id") !== a && i.push(n[s].getAttribute("data-review-id"));
                var o = {
                        index_name: r.apiKey,
                        vgallery: i,
                        productId: r.productId !== a ? r.productId : ""
                    },
                    l = new XMLHttpRequest;
                l.open("post", _tbVgPhCr.reviewWidgetUrl),
                    l.setRequestHeader("Content-Type", "application/json"),
                    l.onreadystatechange = function () {
                        if (4 === l.readyState && 200 === l.status) {
                            var r = JSON.parse(l.responseText);
                            if ("" != r.status && "error" !== r.status) {
                                if ("success" === r.status) {
                                    var a = _tbC.$1("[data-review-id=" + r.layout_class + "]");
                                    a.innerHTML = r.content,
                                        _tbVgPhCr.limit = 5,
                                        _tbVgPhCr.limitCl = 5,
                                        t.onkeydown = function (t) {
                                            t = t || e.event,
                                            27 == t.keyCode && _tbVgPhCr.tbVgModelClose()
                                        }
                                }
                                var n = parseInt(_tbC.$("[class=tb-phsingleslide]").length);
                                _tbVgPhCr.manageDivParts(),
                                    _tbVgPhCr.addEventListenerHorizontal(),
                                    _tbVgPhCr.startSetInterval(),
                                0 === _tbVgPhCr.click && _tbVgPhCr.disableDiv(["tb-revphcarousel-slinavleft-nav", "tb-revphcarousel-slinavleft"]),
                                n <= _tbVgPhCr.limit && (_tbVgPhCr.disableDiv(["tb-revphcarousel-slinavright-nav", "tb-revphcarousel-slinavright"]),
                                    clearInterval(_tbVgPhCr.timer)),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("mouseover", function (e) {
                                        clearInterval(_tbVgPhCr.timer),
                                            delete _tbVgPhCr.timer
                                    }),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("touchstart", function (e) {
                                        clearInterval(_tbVgPhCr.timer),
                                            delete _tbVgPhCr.timer
                                    }),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("touchend", function (e) {
                                        _tbVgPhCr.startSetInterval()
                                    }),
                                    _tbC.$1("[id=targetbay_review_carousel]").addEventListener("mouseleave", function (e) {
                                        _tbVgPhCr.startSetInterval()
                                    })
                            }
                        }
                    },
                    l.send(JSON.stringify(o))
            },
            _tbVgPhCr.manageDivParts = function () {
                var e = parseInt(_tbC.$("[class=tb-phsingleslide]").length);
                e <= 5 && (_tbVgPhCr.disableDiv(["tb-revphcarousel-slinavleft-nav", "tb-revphcarousel-slinavleft"]),
                    _tbVgPhCr.disableDiv(["tb-revphcarousel-slinavright-nav", "tb-revphcarousel-slinavright"])),
                    _tbVgPhCr.divWidth = parseInt(_tbC.$1("[class=tb-revphcarousel-carousel-inn]").clientWidth) / _tbVgPhCr.limit,
                    _tbVgPhCr.checkWidgetLimit();
                var t = _tbVgPhCr.divWidth * e;
                _tbC.$1("[class=tb-revphcarousel-carslide]").style.setProperty("width", t + "px", "important");
                for (var r = 0; r < e; r++)
                    _tbC.$("[class=tb-phsingleslide]")[r].setAttribute("style", "width : " + _tbVgPhCr.divWidth + "px !important")
            },
            _tbVgPhCr.horizonatalRight = function () {
                _tbVgPhCr.slideMarginLeft = _tbVgPhCr.slideMarginLeft + 1,
                    _tbVgPhCr.moveHorizontal()
            },
            _tbVgPhCr.horizonatalLeft = function () {
                _tbVgPhCr.slideMarginRight = _tbVgPhCr.slideMarginRight + 1,
                    _tbVgPhCr.moveHorizontal()
            },
            _tbVgPhCr.ajaxCallBack = function (e) {
                if (4 === e.readyState && 200 === e.status) {
                    var t = JSON.parse(e.responseText),
                        r = _tbC.$("[class=tb-phsingleslide]")[_tbC.$("[class=tb-phsingleslide]").length - 1];
                    r.insertAdjacentHTML("afterend", t.content),
                        _tbVgPhCr.manageDivParts()
                }
            },
            _tbVgPhCr.moveHorizontal = function () {
                _tbVgPhCr.click = _tbVgPhCr.slideMarginLeft - _tbVgPhCr.slideMarginRight;
                var e = -(_tbVgPhCr.divWidth * _tbVgPhCr.click);
                _tbC.$1("[class=tb-revphcarousel-carslide]").style.setProperty("margin-left", e + "px", "important");
                var t = parseInt(_tbC.$("[class=tb-phsingleslide]").length);
                if (_tbVgPhCr.click === t - _tbVgPhCr.limit ? (_tbVgPhCr.disableDiv(["tb-revphcarousel-slinavright-nav", "tb-revphcarousel-slinavright"]),
                    clearInterval(_tbVgPhCr.timer)) : _tbVgPhCr.enableDiv(["tb-revphcarousel-slinavright-nav", "tb-revphcarousel-slinavright"]),
                _tbVgPhCr.click > 0 && _tbVgPhCr.enableDiv(["tb-revphcarousel-slinavleft-nav", "tb-revphcarousel-slinavleft"]),
                0 === _tbVgPhCr.click && (_tbVgPhCr.slideMarginRight = 0,
                    _tbVgPhCr.slideMarginLeft = 0,
                    _tbVgPhCr.disableDiv(["tb-revphcarousel-slinavleft-nav", "tb-revphcarousel-slinavleft"])),
                _tbVgPhCr.click === _tbVgPhCr.count) {
                    _tbVgPhCr.count = _tbVgPhCr.count + 10,
                        _tbVgPhCr.page = _tbVgPhCr.page + 1;
                    var n = _tbC.$1("[class=carousel-id]"),
                        i = n.textContent,
                        s = {
                            productType: _tbVgPhCr.productType,
                            reviewType: _tbVgPhCr.reviewType,
                            page: _tbVgPhCr.page,
                            index_name: r.apiKey,
                            id: i,
                            productId: r.productId !== a ? r.productId : null
                        },
                        o = _tbVgPhCr.publicUrl + "reviews/customer-photo-gallery/search/?api_token=" + r.apiToken,
                        l = "POST";
                    _tbVgPhCr.ajaxFunction(o, l, s)
                }
            },
            _tbVgPhCr.addEventListenerHorizontal = function () {
                _tbVgPhCr.addEventListener(["tb-revphcarousel-slinavright-nav", "tb-revphcarousel-slinavright"], "horizonatalRight"),
                    _tbVgPhCr.addEventListener(["tb-revphcarousel-slinavleft-nav", "tb-revphcarousel-slinavleft"], "horizonatalLeft")
            },
            _tbVgPhCr.startSetInterval = function () {
                var e = parseInt(_tbC.$("[class=tb-phsingleslide]").length);
                !_tbVgPhCr.timer && e > _tbVgPhCr.limit && _tbVgPhCr.click != e - _tbVgPhCr.limit && _tbVgPhCr.clickVertical != e - _tbVgPhCr.limit && (_tbVgPhCr.timer = setInterval(function () {
                    _tbC.$1("[id=tb-revphcarousel-slinavright-nav]") && _tbVgPhCr.horizonatalRight(),
                    _tbC.$1("[id=tb-revphcarousel-slinavbottom-nav]") && _tbVgPhCr.verticalBottom()
                }, 3e3))
            },
            _tbVgPhCr.tbVgCarouselModelOpen = function (e) {
                t.getElementById("tbVgPhCrprevArrow").style.display = "block",
                    t.getElementById("tbVgPhCrnextArrow").style.display = "block";
                var r = t.getElementById("PageContainer");
                null !== r && (r.style.transform = "none",
                    t.getElementsByTagName("header")[0].style.zIndex = "1");
                var n = t.querySelector("ul.tb-revphcarousel-carslide li:first-child"),
                    i = t.querySelector("ul.tb-revphcarousel-carslide li:last-child");
                typeof n !== a && n.id === e.id && (t.getElementById("tbVgPhCrprevArrow").style.display = "none"),
                typeof n !== a && i.id === e.id && (t.getElementById("tbVgPhCrnextArrow").style.display = "none"),
                    t.getElementById("tbVgPhCrRatingImg").style.display = "block",
                    t.getElementById("tbVgPhCrReviewTitle").innerHTML = e.getAttribute("data-reviewtitle"),
                    t.getElementById("tbVgPhCrProductname").innerHTML = e.getAttribute("data-productname"),
                    t.getElementById("tbVgPhCrCustomerImage").src = e.getAttribute("data-customerimage"),
                    t.getElementById("tbVgPhCrLoader").style.display = "none",
                    t.getElementById("tbVgPhCrCustomerImage").style.display = "block";
                var s = t.getElementById("tbVgPhCrGalleryid");
                if (null !== s) {
                    var o = s.value;
                    if ("" !== o) {
                        var l = "?utm_source=targetbay&utm_medium=review_customer_gallery&utm_token=" + o,
                            d = t.getElementById("tbVgPhCrCustomLink").value;
                        "" == d && (d = e.getAttribute("data-producturl")),
                            t.getElementById("tbVgPhCrModalBuyNow").href = d + l,
                            t.getElementById("tbVgPhCrModalBuyNow").innerHTML = t.getElementById("tbVgPhCrBuynowText").value
                    }
                }
                t.getElementById("tbVgPhCrUsername").innerHTML = e.getAttribute("data-username"),
                    t.getElementById("tbVgPhCrVerifiedBuyer").style.display = 1 == e.getAttribute("data-verified") ? "block" : "none",
                    t.getElementById("tbVgPhCrDate").innerHTML = TBtimeConverter(e.getAttribute("data-timestamp")),
                    t.getElementById("tbVgPhCrRatingImg").src = e.getAttribute("data-ratingimg"),
                    t.getElementById("tbVgPhCrProductImage").src = e.getAttribute("data-productimage"),
                null == e.getAttribute("data-ratingimg") && (t.getElementById("tbVgPhCrRatingImg").style.display = "none"),
                    t.getElementById("tbVgPhCrReviewContent").innerHTML = e.getAttribute("data-review"),
                    t.getElementById("tbVgPhCrCurrentPopupElementId").value = e.id,
                    t.getElementById("tbVgPhCrCustImgRound").innerHTML = e.getAttribute("data-username").charAt(0).toUpperCase(),
                    t.getElementById("tbVgPhCrModalPopup").style.display = "block"
            },
            _tbVgPhCr.rightArrowNavigate = function () {
                t.getElementById("tbVgPhCrprevArrow").style.display = "block",
                    t.getElementById("tbVgPhCrnextArrow").style.display = "block";
                var e = t.getElementById("tbVgPhCrCurrentPopupElementId").value,
                    r = t.getElementById(e).nextElementSibling;
                null !== r ? _tbVgPhCr.tbVgCarouselModelOpen(r) : t.getElementById("tbVgPhCrnextArrow").style.display = "none"
            },
            _tbVgPhCr.leftArrowNavigate = function () {
                t.getElementById("tbVgPhCrprevArrow").style.display = "block",
                    t.getElementById("tbVgPhCrnextArrow").style.display = "block";
                var e = t.getElementById("tbVgPhCrCurrentPopupElementId").value,
                    r = t.getElementById(e).previousElementSibling;
                null !== r ? _tbVgPhCr.tbVgCarouselModelOpen(r) : t.getElementById("tbVgPhCrprevArrow").style.display = "none"
            },
            _tbVgPhCr.tbVgModelClose = function (e) {
                t.getElementById("tbVgPhCrModalPopup").style.display = "none"
            },
            _tbVgPhCr.ajaxFunction = function (r, n, i) {
                if ("" === r || r === a)
                    return "Url is empty";
                var s = new XMLHttpRequest;
                s.open(n, r),
                    s.setRequestHeader("Content-Type", "application/json"),
                    s.onreadystatechange = function () {
                        if (4 === s.readyState && 200 === s.status) {
                            var r = JSON.parse(s.responseText),
                                a = _tbC.$("[class=tb-phsingleslide]")[_tbC.$("[class=tb-phsingleslide]").length - 1];
                            "" !== r.content ? (a.insertAdjacentHTML("afterend", r.content),
                                    _tbVgPhCr.limit = 5,
                                    _tbVgPhCr.manageDivParts(),
                                    t.onkeydown = function (t) {
                                        t = t || e.event,
                                        27 == t.keyCode && _tbVgPhCr.tbVgModelClose()
                                    }
                            ) : _tbVgPhCr.disableDiv(["tb-revphcarousel-slinavright-nav", "tb-revphcarousel-slinavright"])
                        }
                    },
                    s.send(JSON.stringify(i))
            },
            _tbVgPhCr.disableDiv = function (e) {
                e && e.forEach(function (e, t, r) {
                    _tbC.$1("[id=" + e + "]") && _tbC.$1("[id=" + e + "]").classList.add("tb-revphcarousel-slinav-inact")
                })
            },
            _tbVgPhCr.enableDiv = function (e) {
                e && e.forEach(function (e, t, r) {
                    _tbC.$1("[id=" + e + "]") && _tbC.$1("[id=" + e + "]").classList.remove("tb-revphcarousel-slinav-inact")
                })
            },
            _tbVgPhCr.addEventListener = function (e, t) {
                e && e.forEach(function (e, r, a) {
                    _tbC.$1("[id=" + e + "]") && _tbC.$1("[id=" + e + "]").addEventListener("click", function (e) {
                        "horizonatalRight" === t ? _tbVgPhCr.horizonatalRight() : "horizonatalLeft" === t && _tbVgPhCr.horizonatalLeft()
                    })
                })
            },
            _tbVgPhCr.maxHeight = function (e) {
                for (var t = 0, r = 0; r <= e.length - 1; r++)
                    t < e[r].clientHeight && (t = e[r].clientHeight);
                return t
            },
            _tbVgPhCr.checkWidgetLimit = function () {
                var e = t.body.clientWidth;
                if (e <= 1200 && e >= 900)
                    _tbVgPhCr.limit = 2;
                else if (e <= 900 && e >= 765) {
                    var r = parseInt(_tbC.$1("[class=tb-revphcarousel-container]").clientWidth);
                    _tbVgPhCr.limit = 1,
                        _tbVgPhCr.divWidth = r / _tbVgPhCr.limit
                } else
                    e <= 765 && e >= 0 ? (_tbVgPhCr.limit = 1,
                        _tbVgPhCr.divWidth = parseInt(_tbC.$1("[class=tb-revphcarousel-container]").clientWidth) / _tbVgPhCr.limit) : _tbVgPhCr.limit = _tbVgPhCr.limitCl
            },
        (r.tbReview === a || r.tbReview.tbProductReview) && _tbVgPhCr.init()
    }(window, document, tbConfig);