function imageSprite(t, e, i, o) {
  return o && (t += " " + o), IMG({
    src: "https://d3ptyyxy2at9ui.cloudfront.net/76084e29cb2cf72b320e888edc583dfb.gif",
    width: e,
    height: i,
    c: t
  })
}

function imageSpriteMO(t, e, i, o, n) {
  n = n ? " " + n : "", t += n, e += n;
  var s = imageSprite(t, i, o);
  return $AEV(s, "mouseover", function() {
    $addClass(s, e), $removeClass(s, t)
  }), $AEV(s, "mouseout", function() {
    $hasClass(s, "frozen") || ($removeClass(s, e), $addClass(s, t))
  }), s
}! function(t, e) {
  "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e : t.fluidvids = e()
}(this, function() {
  "use strict";

  function t(t) {
    return new RegExp("^(https?:)?//(?:" + n.players.join("|") + ").*$", "i").test(t)
  }

  function e(t, e) {
    return parseInt(t, 10) / parseInt(e, 10) * 100 + "%"
  }

  function i(i) {
    if ((t(i.src) || t(i.data)) && !i.getAttribute("data-fluidvids")) {
      var o = document.createElement("div");
      i.parentNode.insertBefore(o, i), i.className += (i.className ? " " : "") + "fluidvids-item", i.setAttribute("data-fluidvids", "loaded"), o.className += "fluidvids", o.style.paddingTop = e(i.height, i.width), o.appendChild(i)
    }
  }

  function o() {
    var t = document.createElement("div");
    t.innerHTML = "<p>x</p><style>" + s + "</style>", r.appendChild(t.childNodes[1])
  }
  var n = {
      selector: ["iframe", "object"],
      players: ["www.youtube.com", "player.vimeo.com"]
    },
    s = [".fluidvids {", "width: 100%; max-width: 100%; position: relative;", "}", ".fluidvids-item {", "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;", "}"].join(""),
    r = document.head || document.getElementsByTagName("head")[0];
  return n.render = function() {
    for (var t = document.querySelectorAll(n.selector.join()), e = t.length; e--;) i(t[e])
  }, n.init = function(t) {
    for (var e in t) n[e] = t[e];
    n.render(), o()
  }, n
}), window.GB_CURRENT = [], window.RELOAD_GB_ON_CLOSE = !1, window.GB_SRC_LOADER = "/greyBoxLoaderFrame", GB_hide = function(t, e) {
    if (0 == GB_CURRENT.length) return !1;
    var i = GB_getLast();
    if (0 != e && i.close_validator_fn && !i.close_validator_fn()) return !1;
    var o = GB_CURRENT.pop();
    if (o) {
      window.LocationManager && window.LocationManager.updateLocation && o.old_hash != window.location.hash && LocationManager.updateLocation(o.old_hash.replace("#", "")), o.hide(t);
      var i = GB_getLast();
      return i && (i.overlay.style.zIndex = i.cur_zindex - 5), window.AmiTooltip && window.AmiTooltip.hide(!0), _GB_setOverlayDimension(), !1
    }
  }, GB_getLast = function() {
    return $last(GB_CURRENT)
  }, GreyBox = new Class({
    init: function(t) {
      window.LocationManager ? this.old_hash = window.LocationManager.getHash() : this.old_hash = window.location.hash, this.type = "page", this.overlay_click_close = !1, this.salt = 0, this.callback_fns = [], this.cur_zindex = 1e4, this.customLeft_fn = t.customLeft_fn, this.customTop_fn = t.customTop_fn, this.src_loader = GB_SRC_LOADER, this.show_overlay = !0, this.overlay_transparent = !1, this.no_padding = !1, this.show_shadow = !0, this.full_screen = t.full_screen | !1;
      var e = window.location.hostname.indexOf("www"),
        i = this.src_loader.indexOf("www");
      e != -1 && i == -1 && (this.src_loader = this.src_loader.replace("://", "://www.")), e == -1 && i != -1 && (this.src_loader = this.src_loader.replace("://www.", "://")), this.show_loading = !0, $update(this, t)
    },
    addCallback: function(t) {
      t && this.callback_fns.push(t)
    },
    show: function(t) {
      return window.AmiTooltip && window.AmiTooltip.hide(), window.AmiComplete && window.AmiComplete.hide(), $map($all("video"), function(t) {
        try {
          t.pause()
        } catch (t) {}
      }), this.url = t, GB_getLast() && (this.cur_zindex = GB_getLast().cur_zindex + 500), this.createElements(), GB_CURRENT.push(this), fluidvids.init(), !1
    },
    hide: function(t) {
      var e = this;
      setTimeout(function() {
        var i = e.callback_fns;
        i != [] && $map(i, function(t) {
          $b(t, e)()
        }), e.onHide(), $remove(e.g_window), $remove(e.overlay), null == GB_getLast() && $map($all("video"), function(t) {
          try {
            t.play()
          } catch (t) {}
        }), e.removeFrame(), e.full_screen && $removeClass(document.documentElement, "GB_fullscreen_enable"), $REV(window, "scroll", _GB_setOverlayDimension), $REV(window, "resize", _GB_update), window.GB_UPDATE_LOCATION && 0 == GB_CURRENT.length && (window.location = GB_UPDATE_LOCATION), window.RELOAD_GB_ON_CLOSE && 0 == GB_CURRENT.length && window.location.reload(), $isFunction(t) && t()
      }, 10)
    },
    update: function() {
      if (this.setOverlayDimension(), this.setFrameSize(), this.setWindowPosition(), !(this.full_screen || this.width < 350)) {
        var t = $winSize();
        this.width + 50 > t.w || t.w < 475 || !this.tooltip_window && t.w < 750 && t.h < 800 ? $addClass(this.g_window, "full_width") : $removeClass(this.g_window, "full_width")
      }
    },
    createElements: function() {
      this.initOverlay();
      var t = "";
      this.show_shadow && (t += " shadow"), this.g_window = DIV({
        id: "GB_window",
        s: "z-index: " + this.cur_zindex,
        c: t
      }), this.no_side_padding && $addClass(this.g_window, "no_side_padding"), $hide(this.g_window), $add($body(), this.g_window), this.initFrame(), this.initHook(), this.update();
      "0.8" != this.overlay.style.opacity && (this.show_overlay ? $setOpacity(this.overlay, .8) : $setOpacity(this.overlay, 0)), this.full_screen && ($addClass(this.g_window, "GB_window_full"), $addClass(document.documentElement, "GB_fullscreen_enable")), $show(this.g_window), this.onShow(), this.startLoading(), $AEV(window, "scroll", _GB_setOverlayDimension), $AEV(window, "resize", _GB_update)
    },
    removeFrame: function() {
      try {
        $remove(this.iframe)
      } catch (t) {}
      this.iframe = null
    },
    startLoading: function() {
      this.iframe && (this.iframe.src = this.src_loader + "?s=" + this.salt++, $show(this.iframe))
    },
    setOverlayDimension: function() {
      var t = $winSize();
      $isIe() ? $setWidth(this.overlay, t.w) : $setWidth(this.overlay, "100%");
      var e = Math.max($scrollTop() + t.h, $scrollTop() + this.height);
      e < $scrollTop() ? $setHeight(this.overlay, e) : $setHeight(this.overlay, $scrollTop() + t.h)
    },
    setZindex: function(t) {
      this.cur_zindex = t, this.g_window.style.zIndex = t
    },
    initOverlay: function() {
      this.overlay = DIV({
        c: "GB_overlay"
      }), this.overlay_transparent && $addClass(this.overlay, "overlay_transparent"), this.overlay.style.zIndex = this.cur_zindex - 5, this.overlay_click_close && (this.overlay.onclick = GB_hide), $setOpacity(this.overlay, 0), $body().insertBefore(this.overlay, $body().firstChild)
    },
    initFrame: function() {
      if (!this.iframe) {
        var t = {
          name: "GB_frame",
          class: "GB_frame",
          frameBorder: 0
        };
        $isIe() && (t.src = 'javascript:false;document.write("");'), this.iframe = IFRAME(t), this.middle_cnt = DIV({
          class: "content"
        }, this.iframe), this.top_cnt = DIV(), this.bottom_cnt = DIV();
        var e = DIV({
          c: "GB_Window_holder"
        });
        $add(e, this.top_cnt, this.middle_cnt, this.bottom_cnt), $add(this.g_window, e)
      }
    },
    onHide: function() {},
    onShow: function() {},
    setFrameSize: function() {},
    setWindowPosition: function() {},
    initHook: function() {}
  }), _GB_update = function() {
    GB_getLast() && GB_getLast().update()
  }, _GB_setOverlayDimension = function() {
    GB_getLast() && GB_getLast().setOverlayDimension()
  }, GB_showImage = function(t, e, i) {
    var o = {
        width: 300,
        height: 300,
        type: "image",
        center_win: !0,
        caption: t,
        callback_fn: i
      },
      n = new GB_Gallery(o);
    return n.show(e)
  }, GB_Gallery = GreyBox.extend({
    init: function(t) {
      this.parent({
        overlay_click_close: !0
      }), $update(this, t), this.show_shadow = !1, this.addCallback(this.callback_fn)
    },
    initHook: function() {
      $addClass(this.g_window, "GB_Gallery");
      var t = DIV({
        class: "inner"
      });
      this.header = DIV({
        class: "GB_header"
      }, t);
      var e = TD({
          id: "GB_caption",
          class: "caption",
          width: "40%"
        }, this.caption),
        i = TD({
          id: "GB_middle",
          class: "middle",
          width: "20%"
        }),
        o = imageSprite("cmp_small_close", 16, 16);
      $AEV(o, "click", GB_hide);
      var n = TD({
          class: "close",
          width: "40%"
        }, o),
        s = TBODY(TR(e, i, n)),
        r = TABLE({
          cellspacing: "0",
          cellpadding: 0,
          border: 0
        }, s);
      $add(t, r), $AEV(window, "scroll", $b(this._setHeaderPos, this))
    },
    setFrameSize: function() {
      $setWidth(this.iframe, this.width), $setHeight(this.iframe, this.height)
    },
    _setHeaderPos: function() {
      $setTop(this.header, $scrollTop() + 10)
    },
    setWindowPosition: function() {
      var t = this.overlay.offsetWidth,
        e = $winSize();
      $setLeft(this.g_window, (t - 50 - this.width) / 2);
      var i = $scrollTop() + 15;
      if (this.center_win) {
        var o = (e.h - this.height) / 2 + 20 + $scrollTop();
        o < 0 && (o = 0), i > o && (o = i), $setTop(this.g_window, o)
      } else $setTop(this.g_window, i);
      this._setHeaderPos()
    },
    onHide: function() {
      $remove(this.header), $removeClass(this.g_window, "GB_Gallery")
    },
    onShow: function() {
      $setOpacity(this.header, 1)
    }
  }), GB_Window = GreyBox.extend({
    init: function(t) {
      this.parent({}), this.show_close_img = !0, this.show_custom_img = null, this.show_custom_text = null, this.show_custom_fn = null, $update(this, t), this.addCallback(this.callback_fn)
    },
    initHook: function() {
      $addClass(this.g_window, "GB_Window"), this.header = TABLE({
        class: "g_header"
      });
      var t = TD({
          class: "caption"
        }, this.caption),
        e = TD({
          class: "close"
        });
      if (this.show_close_img && (this.show_custom_img = "cmp_small_close", this.show_custom_fn = $p(GB_hide, null)), (this.show_custom_img || this.show_custom_text) && this.show_custom_fn) {
        if (this.show_custom_img) var i = imageSprite(this.show_custom_img, 16, 16);
        else var i = this.show_custom_text;
        var o = SPAN(i),
          n = DIV(o);
        $AEV(n, "mouseover", function() {
          $addClass(o, "on")
        }), $AEV(n, "mouseout", function() {
          $removeClass(o, "on")
        }), $AEV(n, "mousedown", function() {
          $addClass(o, "click")
        }), $AEV(n, "mouseup", function() {
          $removeClass(o, "click")
        }), $AEV(n, "click", this.show_custom_fn), $add(e, n)
      }
      tbody_header = TBODY(), $add(tbody_header, TR(t, e)), $add(this.header, tbody_header), $add(this.top_cnt, this.header)
    },
    setFrameSize: function() {
      return !this.full_screen && ($setWidth(this.iframe, this.width), void $setHeight(this.iframe, this.height))
    },
    setWindowPosition: function() {
      this.full_screen && ($setLeft(this.g_window, 0), $setTop(this.g_window, 0));
      var t = $winSize();
      if (this.customLeft_fn ? this.customLeft_fn(this.g_window, this) : $setLeft(this.g_window, (t.w - this.width) / 2 - 13), this.customTop_fn) this.customTop_fn(this.g_window, this);
      else if (this.center_win) {
        var e = (t.h - this.height) / 2 - 20 + $scrollTop();
        e < 0 && (e = 0), $setTop(this.g_window, e)
      } else $setTop(this.g_window, $scrollTop())
    }
  }), $AEV(window, "message", function(t) {
    function e(e) {
      if (t && t.data && $isString(t.data) && t.data.indexOf(e) != -1) {
        var i = parseInt(t.data.split(".")[1]);
        return i
      }
      return null
    }
    var i = GB_getLast(),
      o = e("greybox_change_height");
    i && o && (i.height = o, i.setFrameSize(), i.setWindowPosition());
    var n = e("greybox_change_width");
    i && n && (i.width = n, i.setFrameSize(), i.setWindowPosition())
  }), GB_show = window.old_GB_show = function(t, e, i, o, n) {
    var s = {
        caption: t,
        height: i || 500,
        width: o || 500,
        fullscreen: !1,
        callback_fn: n,
        use_fx: !0,
        overlay_click_close: !0,
        show_loading: !0
      },
      r = new GB_Window(s);
    return r.show(e)
  }, GB_showFullScreen = function(t, e, i) {
    var o = {
        caption: t,
        fullscreen: !0,
        use_fx: !0,
        callback_fn: i
      },
      n = new GB_Window(o);
    return n.show(e)
  }, GB_HTMLWindow = GB_Window.extend({
    init: function(t, e) {
      this.elm = t, this.parent(e)
    },
    initFrame: function() {
      if (!this.iframe) {
        this.iframe = ICE.DIV(this.elm), $addClass(this.elm, "gb_iframe_html"), this.middle_cnt = ICE.DIV({
          class: "content"
        }, DIV({
          c: "iframe_holder"
        }, this.iframe)), this.top_cnt = ICE.DIV(), this.bottom_cnt = ICE.DIV();
        var t = ICE.DIV({
          c: "GB_Window_holder shadow"
        });
        $add(t, this.top_cnt, this.middle_cnt, this.bottom_cnt), $setWidth(t, this.width + 10), $add(this.g_window, t)
      }
    },
    initOverlay: function() {
      this.parent()
    },
    setFrameSize: function() {
      var t = this.width;
      t += window.FLUID_MINI ? 30 : 12
    }
  }), GB_showYouTube = function(t, e, i, o, n) {
    i || (i = 480), o || (o = 853), e = e.replace("/watch?v=", "/embed/"), e += e.indexOf("?") == -1 ? "?autoplay=1&vq=hd720&showinfo=0&rel=0&theme=light" : "&autoplay=1&vq=hd720&showinfo=0&rel=0&theme=light";
    var s = DIV();
    $add(s, IFRAME({
      width: o,
      height: i,
      src: e,
      frameborder: 0,
      allowfullscreen: "allowfullscreen",
      border: 0
    }));
    var r = GB_showHTML(t, s, i, o, n);
    return $addClass(r.g_window, "GB_video_player"), r
  }, GB_showViemo = function(t, e, i, o, n) {
    i || (i = 450), o || (o = 800);
    var s = $setHTML(DIV(), '<iframe src="' + e + '?portrait=0&amp;badge=0&amp;color=ffffff&amp;autoplay=1" width="' + o + '" height="' + i + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'),
      r = GB_showHTML(t, s, i, o, n);
    return $addClass(r.g_window, "GB_video_player"), !1
  }, window.old_GB_showHTML = GB_showHTML = function(t, e, i, o, n) {
    $winSize().w < 450 && (o = Math.min(o, 450));
    var s = {
      caption: t,
      height: i || 500,
      width: o || 500,
      overlay_click_close: !0,
      fullscreen: !1,
      use_fx: !0
    };
    n && $update(s, n);
    var r = new GB_HTMLWindow(e, s);
    return r.show(), r
  }, GB_hideIfNeeded = function(t) {
    return GB_CURRENT.length > 0 ? GB_hide(t) : t(), !1
  },
  function() {
    function t(t) {
      var o = new Date,
        n = e && o.getTime() - e.getTime() < 1e3;
      return 27 == t.keyAscii && (i || n)
    }
    var e, i;
    $AEV(document, "compositionend", function(t) {
      e = new Date, i = !1
    }), $AEV(document, "compositionstart", function(t) {
      i = !0
    }), $AEV(document, "keyup", function(e) {
      var i = GB_CURRENT;
      if (t(e)) return !1;
      if (27 == e.keyAscii && i.length > 0) {
        if (AmiComplete.shown()) return AmiComplete.hide(), !1;
        if (MiniCal.shown()) return MiniCal.remove(), !1;
        var o = $eventElm(e);
        return o && o.cancelInput && o.cancelInput(e) ? ($preventDefault(e), !1) : (GB_hide(), !1)
      }
      return !0
    })
  }();
var new_show = function(t, e, i, o) {
  var n = $winSize().w + 50;
  if (n < 450 && n < o) {
    var s = window.open(e, "", "height=" + i + ",width=" + o + ",scrollbars=yes");
    s.opener || (s.opener = self)
  } else window.old_GB_show(t, e, i, o);
  return !1
};
window.GB_show = new_show;
var GTooptipWin, __bind = function(t, e) {
  return function() {
    return t.apply(e, arguments)
  }
};
GTooptipWin = function() {
  function t() {
    this.show = __bind(this.show, this)
  }
  return t.prototype.show = function(t, e, i, o, n) {
    var s, r, a, l, h, d, c, u;
    return null == n && (n = null), n || (n = {}), u = {}, s = DIV({
      c: "GB_top_arrow"
    }, imageSprite("cmp_top_arrow", 16, 6)), u.callback_fn = function() {
      var t;
      $remove(s), n.fn_on_hide && (t = n.fn_on_hide())
    }, n.close_validator_fn && (u.close_validator_fn = n.close_validator_fn), r = function() {
      if (n.fn_arrow_right && $setRight(s, n.fn_arrow_right()), n.fn_arrow_left) return $setLeft(s, n.fn_arrow_left())
    }, h = function() {
      var t;
      return n.fn_on_show && n.fn_on_show(), r(), t = function() {
        return $add($body(), s)
      }, setTimeout(t, 20)
    }, l = function(t, e) {
      return n.fn_left_offset && $setLeft(t, n.fn_left_offset(t, e)), r()
    }, u.customLeft_fn = l, n.fn_top_offset && (d = function(t, e) {
      var i;
      return i = n.fn_top_offset(t, e), $setTop(t, i), $setTop(s, i - 14)
    }, u.customTop_fn = d), u.overlay_transparent = !0, n.no_side_padding && (u.no_side_padding = !0), u.tooltip_window = !0, n.show_close_img === !1 && (u.show_close_img = !1), n.show_custom_img && (u.show_custom_img = n.show_custom_img), n.show_custom_text && (u.show_custom_text = n.show_custom_text), n.show_custom_fn && (u.show_custom_fn = n.show_custom_fn), c = GB_showHTML(t, e, i, o, u), a = GB_getLast(), $addClass(a.g_window, "GB_tooltip_win"), s.style.zIndex = (a.cur_zindex || 5e4) + 2, n.fixed_pos && ($addClass(a.g_window, "GB_fixed_pos"), $addClass(s, "GB_top_arrow_fixed")), h(), a
  }, t
}(), window.TooptipWin = new GTooptipWin, AmiButton = {
  disable: function(t) {
    t && (t.disabled = !0, $addClass(t, "amibutton_disabled"))
  },
  enable: function(t) {
    t && (t.disabled = !1, $removeClass(t, "amibutton_disabled"))
  },
  createButton: function(t, e, i) {
    e || (e = null), t && (t = SPAN(t));
    var o = A({
      href: "#",
      c: "amibutton"
    }, e, t);
    return i && $addClass(o, "amibutton_" + i), $AEV(o, "mousedown", function(t) {
      return !o.disabled && ($addClass(o, "amibutton_mousedown"), !1)
    }), $AEV(o, ["mouseup", "mouseout", "click"], function(t) {
      return !o.disabled && void $removeClass(o, "amibutton_mousedown")
    }), o
  },
  createMiniButton: function(t, e) {
    var i = AmiButton.createButton(null, t, e);
    return $addClass(i, "amibutton_mini"), i
  },
  createBigButton: function(t, e, i) {
    var o = AmiButton.createButton(t, e, i);
    return $addClass(o, "amibutton_big"), o
  }
}, window.FocusElm = {
  focus: function(t, e, i, o) {
    void 0 === o && (o = !0), parseInt(i) || (i = 35);
    var n = $winSize().h + $scrollTop(),
      s = $position(t).y + t.offsetHeight;
    s > n && (o ? $fx.scrollToPos(s - $winSize().h + i) : window.scrollTo(0, s - $winSize().h + i)), $isFunction(e) && e()
  }
}, ArrowTop = {
  generate: function(t, e, i) {
    t || (t = "left");
    var o = {
      c: "arrow_top",
      style: "text-align: " + t
    };
    return "black" == e ? 1 == i ? DIV(o, imageSprite("cmp_23_arrow_down", 25, 6)) : DIV(o, imageSprite("cmp_19_arrow_up", 25, 6)) : 1 == i ? DIV(o, imageSprite("cmp_22_arrow_down", 25, 6)) : DIV(o, imageSprite("cmp_11_arrow_up", 25, 6))
  }
};
var GAmiTooltip = Class({
  holder: null,
  cur_elm: null,
  shown: !1,
  init: function() {
    !this.holder && $body() && (this.holder = DIV({
      c: "AmiTT_main"
    }), this.updateAlignment(), $hide(this.holder), $add($body(), this.holder), this._onScroll = $b(this._onScroll, this), $AEV(window, "scroll", this._onScroll))
  },
  setAlignment: function(t) {
    this.alignment = t, this.updateAlignment()
  },
  showSimpleText: function(t, e, i, o, n, s) {
    var r = this,
      a = function(a) {
        return !($isFunction(i) && !i(a)) && ($isFunction(e) && (e = e(a)), void r.show(t, DIV({
          c: "tooltip_cnt"
        }, e), a, o, n, s))
      };
    $AEV(t, "mouseover", a), $AEV(t, "mouseout", $b(this.hide, this))
  },
  showTooltip: function(t, e, i, o, n, s) {
    var r = this;
    $AEV(t, "mouseover", function(a) {
      var l = e;
      return $isFunction(e) && (l = e(a)), l = $isString(l) ? $setHTML(DIV({
        c: "tooltip_cnt"
      }), l) : DIV({
        c: "tooltip_cnt"
      }, l), r.show(t, l, a, i, o, n, s)
    }), $AEV(t, "mouseout", $b(this.hide, this))
  },
  show: function(t, e, i, o, n, s, r) {
    return 1 != s && (s = !1), this.flip = r, this.cur_elm = t, $setVisibility(e, !1), this.shown = !0, $replace(this.holder, e), this.top_offset = o, this.left_offset = n, this.include_scroll_top = s, $show(this.holder), this.updateAlignment(), $setVisibility(e, !0), this.locate(i), !1
  },
  hide: function(t) {
    var e = this;
    if (e.holder) {
      this.shown = !1;
      var i = function() {
        e.shown || ($hide(e.holder), e.cur_elm = null, e.top_offset = 0, e.left_offset = 0)
      };
      return $replace(e.holder, null), 1 == t ? i() : setTimeout(i, 100), !1
    }
  },
  destory: function() {
    $remove($all("div", "AmiTT_arrow_top", this.holder)), $remove(this.holder), $REV(window, "scroll", this._onScroll), this.holder = null, this._onScroll = null
  },
  updateAlignment: function() {
    $remove($all("div", "AmiTT_arrow_top", this.holder)), this.alignment && (arrow = ArrowTop.generate(this.alignment, "black", this.flip), this.flip ? $add(this.holder, DIV({
      c: "AmiTT_arrow_top"
    }, arrow)) : $addToTop(this.holder, DIV({
      c: "AmiTT_arrow_top"
    }, arrow)))
  },
  locate: function(t) {
    var e = this.cur_elm;
    if (e) {
      var i = $position(e),
        o = i.x - 5,
        n = this.holder.offsetWidth,
        s = $winSize().w;
      $hasClass(e, "AmiTT_force_right") ? this.setAlignment("right") : $hasClass(e, "AmiTT_force_left") ? this.setAlignment("left") : o + n + 10 > s ? (o -= n - 10 - e.offsetWidth, this.setAlignment("right")) : this.setAlignment("left"), $isNumber(this.top_offset) ? i.y += this.top_offset : $isFunction(this.top_offset) && (i.y += this.top_offset());
      var r = null;
      if ($isNumber(this.left_offset) ? r = this.left_offset : $isFunction(this.left_offset) && (r = this.left_offset()), null != r && ("right" == this.alignment && (r = -r), o += r), 1 == this.flip) var a = i.y - this.holder.offsetHeight;
      else var a = i.y + e.offsetHeight + 2;
      if ($hasClass(e, "fixed_pos") && (a += $scrollTop()), this.include_scroll_top && (a += $scrollTop()), e.on_amitooltip_locate) {
        var l = e.on_amitooltip_locate(a, o);
        a = l[0], o = l[1]
      }
      $setTop(this.holder, a), $setLeft(this.holder, o)
    }
  },
  _onScroll: function() {
    this.locate()
  }
});
AmiTooltip = new GAmiTooltip, $AEV(window, "load", $b(AmiTooltip.init, AmiTooltip)),
  function t(e, i, o) {
    function n(r, a) {
      if (!i[r]) {
        if (!e[r]) {
          var l = "function" == typeof require && require;
          if (!a && l) return l(r, !0);
          if (s) return s(r, !0);
          var h = new Error("Cannot find module '" + r + "'");
          throw h.code = "MODULE_NOT_FOUND", h
        }
        var d = i[r] = {
          exports: {}
        };
        e[r][0].call(d.exports, function(t) {
          var i = e[r][1][t];
          return n(i ? i : t)
        }, d, d.exports, t, e, i, o)
      }
      return i[r].exports
    }
    for (var s = "function" == typeof require && require, r = 0; r < o.length; r++) n(o[r]);
    return n
  }({
    1: [function(t, e, i) {
      "use strict";
      var o = t("./.coffee.Hamburger.js"),
        n = t("./.coffee.LoginSignup.js"),
        s = t("./.coffee.ExternalApps.js"),
        r = t("./.coffee.Helpers.js"),
        a = t("./.coffee.Platforms.js"),
        l = t("./Users.js"),
        h = t("./.coffee.Footer.js");
      window.showSignUp = n.showSignUp, window.showLogin = n.showLogin, window.showGetAndroidApp = s.showGetAndroidApp, window.showGetIosApp = s.showGetIosApp, window.showGetWindowsApp = s.showGetWindowsApp, window.tryToInstallChromePlugin = s.tryToInstallChromePlugin, window.playYoutube = r.playYoutube, window.Hamburger = new o, window.Platforms = new a, $AEV(window, "load", window.Platforms.init), $AEV(window, "load", l.init), $AEV(window, "load", h.init), $AEV(window, "message", function(t) {
        var e = t.data;
        e && e.indexOf("CHANGE_LOCATION:") != -1 && (window.location = e.replace("CHANGE_LOCATION:", ""))
      }), $AEV(window, "load", function() {
        $AEV($$("video.js-video-hide-controls"), "play", function() {
          this.removeAttribute("controls")
        })
      })
    }, {
      "./.coffee.ExternalApps.js": 2,
      "./.coffee.Footer.js": 3,
      "./.coffee.Hamburger.js": 4,
      "./.coffee.Helpers.js": 5,
      "./.coffee.LoginSignup.js": 6,
      "./.coffee.Platforms.js": 7,
      "./Users.js": 8
    }],
    2: [function(t, e, i) {
      var o;
      o = window.GB_show, i.showGetAndroidApp = function() {
        var t;
        return t = "/getAndroidApp", o(_("Get the App - It's Free"), t, 400, 400)
      }, i.showGetIosApp = function() {
        var t;
        return t = "/getIphoneApp", o(_("Get the App - It's Free"), t, 400, 400)
      }, i.showGetWindowsApp = function() {
        var t;
        return t = "/getWindowsApp", o(_("Get the App - It's Free"), t, 400, 400)
      }, i.tryToInstallChromePlugin = function() {
        var t;
        return !(window.chrome && window.chrome.webstore && window.chrome.webstore.install) || (t = function() {
          return alert(_("Plugin successfully installed. Enjoy!"))
        }, window.chrome.webstore.install(void 0, t), !1)
      }
    }, {}],
    3: [function(t, e, i) {
      i.init = function() {
        return $AEV($$(".js-platform-selector"), "change", function() {
          return window.location.href = this.options[this.selectedIndex].value
        }), $AEV($$(".js-language-selector"), "change", function(t) {
          var e, i, o, n;
          return e = $eventElm(t), i = this.options[this.selectedIndex].value, n = i + window.location.pathname, e && $hasClass(e, "js-has-session-user") && (o = i.split(".")[0].replace("https://", ""), n = "/i18n/setLanguage?" + $encode({
            lang: o,
            callback: n
          })), window.location.href = n
        })
      }
    }, {}],
    4: [function(t, e, i) {
      var o;
      o = function() {
        function t() {}
        return t.prototype.toggle = function(t) {
          var e;
          return e = $$("nav.platforms--mobile")[0], $hasClass(t, "open") ? ($removeClass($body(), "hamburger_shown"), $removeClass(t, "open"), $removeClass(e, "platforms--mobile--shown")) : (setTimeout(function() {
            return $addClass($body(), "hamburger_shown")
          }, 500), $addClass(t, "open"), $addClass(e, "platforms--mobile--shown")), !1
        }, t
      }(), e.exports = o
    }, {}],
    5: [function(t, e, i) {
      var o;
      o = window.GB_showYouTube, i.playYoutube = function(t, e) {
        return o(t, e, 480, 853), !1
      }
    }, {}],
    6: [function(t, e, i) {
      var o, n, s, r;
      o = window.GB_hide, n = window.GB_show, r = i.showSignUp = function(t) {
        return null == t && (t = "/Users/showRegister"), o(), n(_("Sign up in seconds"), t, 400, 350, function() {
          return top.location.reload()
        })
      }, s = i.showLogin = function(t) {
        return null == t && (t = "/Users/showLogin?mini=1"), n(_("Log in"), t, 400, 350)
      }, window.triggerLoginSignup = i.triggerLoginSignup = function(t) {
        var e, i, o, n, a;
        return null == t && (t = "/premium"), o = "/Users/showLogin?success_page=" + t, a = "/Users/showRegister?success_page=" + t, e = DIV({
          c: "proceed_window"
        }, _("You need to log in or sign up to proceed"), BR(), BR(), i = A({
          href: o
        }, _("Log in")), SPAN({
          c: "sepa"
        }), n = A({
          href: a
        }, _("Sign up"))), $AEV(i, "click", $p(s, o)), $AEV(n, "click", $p(r, a)), window.GB_showHTML(" ", e, 210, 400), !1
      }
    }, {}],
    7: [function(t, e, i) {
      var o, n, s = function(t, e) {
        return function() {
          return t.apply(e, arguments)
        }
      };
      o = window.FocusElm, n = function() {
        function t() {
          this.toggle = s(this.toggle, this), this.clear = s(this.clear, this), this.init = s(this.init, this)
        }
        return t.prototype.classNames = {
          dropdown: "platforms-item--dropdown",
          isOpen: "is-open"
        }, t.prototype.init = function() {
          return $AEV(document, "click", this.clear), $AEV($$("." + this.classNames.dropdown), "click", this.toggle)
        }, t.prototype.clear = function() {
          var t, e, i, o, n;
          for (o = $$("." + this.classNames.dropdown), n = [], e = 0, i = o.length; e < i; e++) t = o[e], n.push($removeClass(t, this.classNames.isOpen));
          return n
        }, t.prototype.toggle = function(t) {
          var e, i, n;
          return $stopPropagation(t), e = $gp($eventElm(t), "li"), i = $hasClass(e, this.classNames.isOpen), this.clear(), i ? $removeClass(e, this.classNames.isOpen) : $addClass(e, this.classNames.isOpen), n = $gc(e, "ul", "platforms-items"), o.focus(n)
        }, t
      }(), e.exports = n
    }, {}],
    8: [function(t, e, i) {
      i.init = function() {
        function t() {
          for (var t = 0; t <= s - 1 && "current" != n[t].className; t++);
          return t
        }
        var e = $("section-users");
        if (e) {
          var i = document.createElement("button"),
            o = document.createElement("button");
          i.innerHTML = "PREV", o.innerHTML = "NEXT", e.getElementsByTagName("ul")[0].parentNode.appendChild(i), e.getElementsByTagName("ul")[0].parentNode.appendChild(o);
          var n = e.getElementsByTagName("li"),
            s = n.length;
          n[0].className = "current", o.onclick = function() {
            var e, i = t(),
              o = n[i];
            e = i == s - 1 ? n[0] : n[i + 1], e.style.transition = "none", e.className = "right", o.className = "left", window.setTimeout(function() {
              e.style.transition = "", e.className = "current"
            }, 100)
          }, i.onclick = function() {
            var e, i = t(),
              o = n[i];
            e = 0 === i ? n[s - 1] : n[i - 1], e.style.transition = "none", e.className = "left", o.className = "right", window.setTimeout(function() {
              e.style.transition = "", e.className = "current"
            }, 100)
          }
        }
      }
    }, {}]
  }, {}, [1]);