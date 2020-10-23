function AMapWX(t) {
    this.key = t.key, this.requestConfig = {
        key: t.key,
        s: "rsx",
        platform: "WXJS",
        appname: t.key,
        sdkversion: "1.2.0",
        logversion: "2.0"
    };
}

AMapWX.prototype.getWxLocation = function(e, a) {
    wx.getLocation({
        type: "gcj02",
        success: function(t) {
            var e = t.longitude + "," + t.latitude;
            wx.setStorage({
                key: "userLocation",
                data: e
            }), a(e);
        },
        fail: function(t) {
            wx.getStorage({
                key: "userLocation",
                success: function(t) {
                    t.data && a(t.data);
                }
            }), e.fail({
                errCode: "0",
                errMsg: t.errMsg || ""
            });
        }
    });
}, AMapWX.prototype.getRegeo = function(u) {
    function e(d) {
        var t = a.requestConfig;
        wx.request({
            url: "https://restapi.amap.com/v3/geocode/regeo",
            data: {
                key: a.key,
                location: d,
                extensions: "all",
                s: t.s,
                platform: t.platform,
                appname: a.key,
                sdkversion: t.sdkversion,
                logversion: t.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e, a, s, o, i, r, n, p, c;
                t.data.status && "1" == t.data.status ? (a = (e = t.data.regeocode).addressComponent, 
                s = [], o = "", e && e.roads[0] && e.roads[0].name && (o = e.roads[0].name + "附近"), 
                i = d.split(",")[0], r = d.split(",")[1], e.pois && e.pois[0] && (o = e.pois[0].name + "附近", 
                (n = e.pois[0].location) && (i = parseFloat(n.split(",")[0]), r = parseFloat(n.split(",")[1]))), 
                a.provice && s.push(a.provice), a.city && s.push(a.city), a.district && s.push(a.district), 
                a.streetNumber && a.streetNumber.street && a.streetNumber.number ? (s.push(a.streetNumber.street), 
                s.push(a.streetNumber.number)) : (p = "", e && e.roads[0] && e.roads[0].name && (p = e.roads[0].name), 
                s.push(p)), s = s.join(""), c = [ {
                    iconPath: u.iconPath,
                    width: u.iconWidth,
                    height: u.iconHeight,
                    name: s,
                    desc: o,
                    longitude: i,
                    latitude: r,
                    id: 0,
                    regeocodeData: e
                } ], u.success(c)) : u.fail({
                    errCode: t.data.infocode,
                    errMsg: t.data.info
                });
            },
            fail: function(t) {
                u.fail({
                    errCode: "0",
                    errMsg: t.errMsg || ""
                });
            }
        });
    }
    var a = this;
    u.location ? e(u.location) : a.getWxLocation(u, function(t) {
        e(t);
    });
}, AMapWX.prototype.getWeather = function(o) {
    function s(t) {
        var e = "base";
        o.type && "forecast" == o.type && (e = "all"), wx.request({
            url: "https://restapi.amap.com/v3/weather/weatherInfo",
            data: {
                key: a.key,
                city: t,
                extensions: e,
                s: i.s,
                platform: i.platform,
                appname: a.key,
                sdkversion: i.sdkversion,
                logversion: i.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e, a, s;
                t.data.status && "1" == t.data.status ? t.data.lives ? (e = t.data.lives) && 0 < e.length && (e = e[0], 
                (a = {
                    city: {
                        text: "城市",
                        data: (s = e).city
                    },
                    weather: {
                        text: "天气",
                        data: s.weather
                    },
                    temperature: {
                        text: "温度",
                        data: s.temperature
                    },
                    winddirection: {
                        text: "风向",
                        data: s.winddirection + "风"
                    },
                    windpower: {
                        text: "风力",
                        data: s.windpower + "级"
                    },
                    humidity: {
                        text: "湿度",
                        data: s.humidity + "%"
                    }
                }).liveData = e, o.success(a)) : t.data.forecasts && t.data.forecasts[0] && o.success({
                    forecast: t.data.forecasts[0]
                }) : o.fail({
                    errCode: t.data.infocode,
                    errMsg: t.data.info
                });
            },
            fail: function(t) {
                o.fail({
                    errCode: "0",
                    errMsg: t.errMsg || ""
                });
            }
        });
    }
    var a = this, i = a.requestConfig;
    o.city ? s(o.city) : a.getWxLocation(o, function(t) {
        var e;
        e = t, wx.request({
            url: "https://restapi.amap.com/v3/geocode/regeo",
            data: {
                key: a.key,
                location: e,
                extensions: "all",
                s: i.s,
                platform: i.platform,
                appname: a.key,
                sdkversion: i.sdkversion,
                logversion: i.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e, a;
                t.data.status && "1" == t.data.status ? ((a = t.data.regeocode).addressComponent ? e = a.addressComponent.adcode : a.aois && 0 < a.aois.length && (e = a.aois[0].adcode), 
                s(e)) : o.fail({
                    errCode: t.data.infocode,
                    errMsg: t.data.info
                });
            },
            fail: function(t) {
                o.fail({
                    errCode: "0",
                    errMsg: t.errMsg || ""
                });
            }
        });
    });
}, AMapWX.prototype.getPoiAround = function(i) {
    function e(t) {
        var e = {
            key: a.key,
            location: t,
            s: s.s,
            platform: s.platform,
            appname: a.key,
            sdkversion: s.sdkversion,
            logversion: s.logversion
        };
        i.querytypes && (e.types = i.querytypes), i.querykeywords && (e.keywords = i.querykeywords), 
        wx.request({
            url: "https://restapi.amap.com/v3/place/around",
            data: e,
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e, a, s, o;
                if (t.data.status && "1" == t.data.status) {
                    if ((t = t.data) && t.pois) {
                        for (e = [], a = 0; a < t.pois.length; a++) s = 0 == a ? i.iconPathSelected : i.iconPath, 
                        e.push({
                            latitude: parseFloat(t.pois[a].location.split(",")[1]),
                            longitude: parseFloat(t.pois[a].location.split(",")[0]),
                            iconPath: s,
                            width: 22,
                            height: 32,
                            id: a,
                            name: t.pois[a].name,
                            address: t.pois[a].address
                        });
                        o = {
                            markers: e,
                            poisData: t.pois
                        }, i.success(o);
                    }
                } else i.fail({
                    errCode: t.data.infocode,
                    errMsg: t.data.info
                });
            },
            fail: function(t) {
                i.fail({
                    errCode: "0",
                    errMsg: t.errMsg || ""
                });
            }
        });
    }
    var a = this, s = a.requestConfig;
    i.location ? e(i.location) : a.getWxLocation(i, function(t) {
        e(t);
    });
}, AMapWX.prototype.getStaticmap = function(a) {
    function e(t) {
        s.push("location=" + t), a.zoom && s.push("zoom=" + a.zoom), a.size && s.push("size=" + a.size), 
        a.scale && s.push("scale=" + a.scale), a.markers && s.push("markers=" + a.markers), 
        a.labels && s.push("labels=" + a.labels), a.paths && s.push("paths=" + a.paths), 
        a.traffic && s.push("traffic=" + a.traffic);
        var e = o + s.join("&");
        a.success({
            url: e
        });
    }
    var t, s = [], o = "https://restapi.amap.com/v3/staticmap?";
    s.push("key=" + this.key), t = this.requestConfig, s.push("s=" + t.s), s.push("platform=" + t.platform), 
    s.push("appname=" + t.appname), s.push("sdkversion=" + t.sdkversion), s.push("logversion=" + t.logversion), 
    a.location ? e(a.location) : this.getWxLocation(a, function(t) {
        e(t);
    });
}, AMapWX.prototype.getInputtips = function(e) {
    var t = this.requestConfig, a = {
        key: this.key,
        s: t.s,
        platform: t.platform,
        appname: this.key,
        sdkversion: t.sdkversion,
        logversion: t.logversion
    };
    e.location && (a.location = e.location), e.keywords && (a.keywords = e.keywords), 
    e.type && (a.type = e.type), e.city && (a.city = e.city), e.citylimit && (a.citylimit = e.citylimit), 
    wx.request({
        url: "https://restapi.amap.com/v3/assistant/inputtips",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            t && t.data && t.data.tips && e.success({
                tips: t.data.tips
            });
        },
        fail: function(t) {
            e.fail({
                errCode: "0",
                errMsg: t.errMsg || ""
            });
        }
    });
}, AMapWX.prototype.getDrivingRoute = function(e) {
    var t = this.requestConfig, a = {
        key: this.key,
        s: t.s,
        platform: t.platform,
        appname: this.key,
        sdkversion: t.sdkversion,
        logversion: t.logversion
    };
    e.origin && (a.origin = e.origin), e.destination && (a.destination = e.destination), 
    e.strategy && (a.strategy = e.strategy), e.waypoints && (a.waypoints = e.waypoints), 
    e.avoidpolygons && (a.avoidpolygons = e.avoidpolygons), e.avoidroad && (a.avoidroad = e.avoidroad), 
    wx.request({
        url: "https://restapi.amap.com/v3/direction/driving",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            t && t.data && t.data.route && e.success({
                paths: t.data.route.paths,
                taxi_cost: t.data.route.taxi_cost || ""
            });
        },
        fail: function(t) {
            e.fail({
                errCode: "0",
                errMsg: t.errMsg || ""
            });
        }
    });
}, AMapWX.prototype.getWalkingRoute = function(e) {
    var t = this.requestConfig, a = {
        key: this.key,
        s: t.s,
        platform: t.platform,
        appname: this.key,
        sdkversion: t.sdkversion,
        logversion: t.logversion
    };
    e.origin && (a.origin = e.origin), e.destination && (a.destination = e.destination), 
    wx.request({
        url: "https://restapi.amap.com/v3/direction/walking",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            t && t.data && t.data.route && e.success({
                paths: t.data.route.paths
            });
        },
        fail: function(t) {
            e.fail({
                errCode: "0",
                errMsg: t.errMsg || ""
            });
        }
    });
}, AMapWX.prototype.getTransitRoute = function(a) {
    var t = this.requestConfig, e = {
        key: this.key,
        s: t.s,
        platform: t.platform,
        appname: this.key,
        sdkversion: t.sdkversion,
        logversion: t.logversion
    };
    a.origin && (e.origin = a.origin), a.destination && (e.destination = a.destination), 
    a.strategy && (e.strategy = a.strategy), a.city && (e.city = a.city), a.cityd && (e.cityd = a.cityd), 
    wx.request({
        url: "https://restapi.amap.com/v3/direction/transit/integrated",
        data: e,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            if (t && t.data && t.data.route) {
                var e = t.data.route;
                a.success({
                    distance: e.distance || "",
                    taxi_cost: e.taxi_cost || "",
                    transits: e.transits
                });
            }
        },
        fail: function(t) {
            a.fail({
                errCode: "0",
                errMsg: t.errMsg || ""
            });
        }
    });
}, AMapWX.prototype.getRidingRoute = function(e) {
    var t = this.requestConfig, a = {
        key: this.key,
        s: t.s,
        platform: t.platform,
        appname: this.key,
        sdkversion: t.sdkversion,
        logversion: t.logversion
    };
    e.origin && (a.origin = e.origin), e.destination && (a.destination = e.destination), 
    wx.request({
        url: "https://restapi.amap.com/v4/direction/bicycling",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            t && t.data && t.data.data && e.success({
                paths: t.data.data.paths
            });
        },
        fail: function(t) {
            e.fail({
                errCode: "0",
                errMsg: t.errMsg || ""
            });
        }
    });
}, module.exports.AMapWX = AMapWX;