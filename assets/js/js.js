! function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t()
}(this, function() {
  "use strict";
  const n = new Map,
      P = {
          set(e, t, i) {
              n.has(e) || n.set(e, new Map);
              e = n.get(e);
              e.has(t) || 0 === e.size ? e.set(t, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(e.keys())[0]}.`)
          },
          get(e, t) {
              return n.has(e) && n.get(e).get(t) || null
          },
          remove(e, t) {
              var i;
              n.has(e) && ((i = n.get(e)).delete(t), 0 === i.size) && n.delete(e)
          }
      },
      j = 1e3,
      R = "transitionend",
      z = e => e = e && window.CSS && window.CSS.escape ? e.replace(/#([^\s"#']+)/g, (e, t) => "#" + CSS.escape(t)) : e,
      B = e => {
          e.dispatchEvent(new Event(R))
      },
      a = e => !(!e || "object" != typeof e) && void 0 !== (e = void 0 !== e.jquery ? e[0] : e).nodeType,
      s = e => a(e) ? e.jquery ? e[0] : e : "string" == typeof e && 0 < e.length ? document.querySelector(z(e)) : null,
      r = e => {
          if (!a(e) || 0 === e.getClientRects().length) return !1;
          var t = "visible" === getComputedStyle(e).getPropertyValue("visibility"),
              i = e.closest("details:not([open])");
          if (i && i !== e) {
              e = e.closest("summary");
              if (e && e.parentNode !== i) return !1;
              if (null === e) return !1
          }
          return t
      },
      o = e => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
      F = e => {
          var t;
          return document.documentElement.attachShadow ? "function" == typeof e.getRootNode ? (t = e.getRootNode()) instanceof ShadowRoot ? t : null : e instanceof ShadowRoot ? e : e.parentNode ? F(e.parentNode) : null : null
      },
      H = () => {},
      q = e => {
          e.offsetHeight
      },
      Y = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
      W = [],
      l = () => "rtl" === document.documentElement.dir;
  var e = n => {
      var e;
      e = () => {
          const e = Y();
          if (e) {
              const t = n.NAME,
                  i = e.fn[t];
              e.fn[t] = n.jQueryInterface, e.fn[t].Constructor = n, e.fn[t].noConflict = () => (e.fn[t] = i, n.jQueryInterface)
          }
      }, "loading" === document.readyState ? (W.length || document.addEventListener("DOMContentLoaded", () => {
          for (const e of W) e()
      }), W.push(e)) : e()
  };
  const c = (e, t = [], i = e) => "function" == typeof e ? e(...t) : i,
      U = (i, n, e = !0) => {
          if (e) {
              e = (e => {
                  if (!e) return 0;
                  let {
                      transitionDuration: t,
                      transitionDelay: i
                  } = window.getComputedStyle(e);
                  var e = Number.parseFloat(t),
                      n = Number.parseFloat(i);
                  return e || n ? (t = t.split(",")[0], i = i.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(i)) * j) : 0
              })(n) + 5;
              let t = !1;
              const s = ({
                  target: e
              }) => {
                  e === n && (t = !0, n.removeEventListener(R, s), c(i))
              };
              n.addEventListener(R, s), setTimeout(() => {
                  t || B(n)
              }, e)
          } else c(i)
      },
      V = (e, t, i, n) => {
          var s = e.length;
          let a = e.indexOf(t);
          return -1 === a ? !i && n ? e[s - 1] : e[0] : (a += i ? 1 : -1, n && (a = (a + s) % s), e[Math.max(0, Math.min(a, s - 1))])
      },
      X = /[^.]*(?=\..*)\.|.*/,
      G = /\..*/,
      K = /::\d+$/,
      Z = {};
  let Q = 1;
  const J = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
      },
      ee = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

  function te(e, t) {
      return t && t + "::" + Q++ || e.uidEvent || Q++
  }

  function ie(e) {
      var t = te(e);
      return e.uidEvent = t, Z[t] = Z[t] || {}, Z[t]
  }

  function ne(e, t, i = null) {
      return Object.values(e).find(e => e.callable === t && e.delegationSelector === i)
  }

  function se(e, t, i) {
      var n = "string" == typeof t,
          t = !n && t || i;
      let s = oe(e);
      return [n, t, s = ee.has(s) ? s : e]
  }

  function ae(n, s, a, r, o) {
      if ("string" == typeof s && n) {
          let [e, t, i] = se(s, a, r);
          s in J && (t = (l = t, function(e) {
              if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return l.call(this, e)
          }));
          var l, c, d, u, h, p, r = ie(n),
              r = r[i] || (r[i] = {}),
              m = ne(r, t, e ? a : null);
          m ? m.oneOff = m.oneOff && o : (m = te(t, s.replace(X, "")), (s = e ? (u = n, h = a, p = t, function t(i) {
              var n = u.querySelectorAll(h);
              for (let e = i["target"]; e && e !== this; e = e.parentNode)
                  for (const s of n)
                      if (s === e) return le(i, {
                          delegateTarget: e
                      }), t.oneOff && g.off(u, i.type, h, p), p.apply(e, [i])
          }) : (c = n, d = t, function e(t) {
              return le(t, {
                  delegateTarget: c
              }), e.oneOff && g.off(c, t.type, d), d.apply(c, [t])
          })).delegationSelector = e ? a : null, s.callable = t, s.oneOff = o, r[s.uidEvent = m] = s, n.addEventListener(i, s, e))
      }
  }

  function re(e, t, i, n, s) {
      n = ne(t[i], n, s);
      n && (e.removeEventListener(i, n, Boolean(s)), delete t[i][n.uidEvent])
  }

  function oe(e) {
      return e = e.replace(G, ""), J[e] || e
  }
  const g = {
      on(e, t, i, n) {
          ae(e, t, i, n, !1)
      },
      one(e, t, i, n) {
          ae(e, t, i, n, !0)
      },
      off(e, t, i, n) {
          if ("string" == typeof t && e) {
              var s, a, [n, r, o] = se(t, i, n),
                  l = o !== t,
                  c = ie(e),
                  d = c[o] || {},
                  u = t.startsWith(".");
              if (void 0 !== r) return Object.keys(d).length ? void re(e, c, o, r, n ? i : null) : void 0;
              if (u)
                  for (const w of Object.keys(c)) {
                      p = h = v = b = f = g = m = void 0;
                      var h, p, m = e,
                          g = c,
                          f = w,
                          b = t.slice(1),
                          v = g[f] || {};
                      for ([h, p] of Object.entries(v)) h.includes(b) && re(m, g, f, p.callable, p.delegationSelector)
                  }
              for ([s, a] of Object.entries(d)) {
                  var y = s.replace(K, "");
                  l && !t.includes(y) || re(e, c, o, a.callable, a.delegationSelector)
              }
          }
      },
      trigger(e, t, i) {
          if ("string" != typeof t || !e) return null;
          var n = Y();
          let s = null,
              a = !0,
              r = !0,
              o = !1;
          t !== oe(t) && n && (s = n.Event(t, i), n(e).trigger(s), a = !s.isPropagationStopped(), r = !s.isImmediatePropagationStopped(), o = s.isDefaultPrevented());
          n = le(new Event(t, {
              bubbles: a,
              cancelable: !0
          }), i);
          return o && n.preventDefault(), r && e.dispatchEvent(n), n.defaultPrevented && s && s.preventDefault(), n
      }
  };

  function le(t, e = {}) {
      for (const [i, n] of Object.entries(e)) try {
          t[i] = n
      } catch (e) {
          Object.defineProperty(t, i, {
              configurable: !0,
              get() {
                  return n
              }
          })
      }
      return t
  }

  function ce(t) {
      if ("true" === t) return !0;
      if ("false" === t) return !1;
      if (t === Number(t).toString()) return Number(t);
      if ("" === t || "null" === t) return null;
      if ("string" != typeof t) return t;
      try {
          return JSON.parse(decodeURIComponent(t))
      } catch (e) {
          return t
      }
  }

  function de(e) {
      return e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())
  }
  const d = {
      setDataAttribute(e, t, i) {
          e.setAttribute("data-bs-" + de(t), i)
      },
      removeDataAttribute(e, t) {
          e.removeAttribute("data-bs-" + de(t))
      },
      getDataAttributes(t) {
          if (!t) return {};
          var i = {};
          for (const n of Object.keys(t.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"))) {
              let e = n.replace(/^bs/, "");
              i[e = e.charAt(0).toLowerCase() + e.slice(1, e.length)] = ce(t.dataset[n])
          }
          return i
      },
      getDataAttribute(e, t) {
          return ce(e.getAttribute("data-bs-" + de(t)))
      }
  };
  class ue {
      static get Default() {
          return {}
      }
      static get DefaultType() {
          return {}
      }
      static get NAME() {
          throw new Error('You have to implement the static method "NAME", for each component!')
      }
      _getConfig(e) {
          return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
      }
      _configAfterMerge(e) {
          return e
      }
      _mergeConfigObj(e, t) {
          var i = a(t) ? d.getDataAttribute(t, "config") : {};
          return { ...this.constructor.Default,
              ..."object" == typeof i ? i : {},
              ...a(t) ? d.getDataAttributes(t) : {},
              ..."object" == typeof e ? e : {}
          }
      }
      _typeCheckConfig(e, t = this.constructor.DefaultType) {
          for (var [i, n] of Object.entries(t)) {
              var s = e[i],
                  s = a(s) ? "element" : null == (s = s) ? "" + s : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
              if (!new RegExp(n).test(s)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${s}" but expected type "${n}".`)
          }
      }
  }
  class t extends ue {
      constructor(e, t) {
          super(), (e = s(e)) && (this._element = e, this._config = this._getConfig(t), P.set(this._element, this.constructor.DATA_KEY, this))
      }
      dispose() {
          P.remove(this._element, this.constructor.DATA_KEY), g.off(this._element, this.constructor.EVENT_KEY);
          for (const e of Object.getOwnPropertyNames(this)) this[e] = null
      }
      _queueCallback(e, t, i = !0) {
          U(e, t, i)
      }
      _getConfig(e) {
          return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
      }
      static getInstance(e) {
          return P.get(s(e), this.DATA_KEY)
      }
      static getOrCreateInstance(e, t = {}) {
          return this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
      }
      static get VERSION() {
          return "5.3.0-alpha2"
      }
      static get DATA_KEY() {
          return "bs." + this.NAME
      }
      static get EVENT_KEY() {
          return "." + this.DATA_KEY
      }
      static eventName(e) {
          return "" + e + this.EVENT_KEY
      }
  }
  const he = t => {
          let i = t.getAttribute("data-bs-target");
          if (!i || "#" === i) {
              let e = t.getAttribute("href");
              if (!e || !e.includes("#") && !e.startsWith(".")) return null;
              e.includes("#") && !e.startsWith("#") && (e = "#" + e.split("#")[1]), i = e && "#" !== e ? e.trim() : null
          }
          return z(i)
      },
      u = {
          find(e, t = document.documentElement) {
              return [].concat(...Element.prototype.querySelectorAll.call(t, e))
          },
          findOne(e, t = document.documentElement) {
              return Element.prototype.querySelector.call(t, e)
          },
          children(e, t) {
              return [].concat(...e.children).filter(e => e.matches(t))
          },
          parents(e, t) {
              var i = [];
              let n = e.parentNode.closest(t);
              for (; n;) i.push(n), n = n.parentNode.closest(t);
              return i
          },
          prev(e, t) {
              let i = e.previousElementSibling;
              for (; i;) {
                  if (i.matches(t)) return [i];
                  i = i.previousElementSibling
              }
              return []
          },
          next(e, t) {
              let i = e.nextElementSibling;
              for (; i;) {
                  if (i.matches(t)) return [i];
                  i = i.nextElementSibling
              }
              return []
          },
          focusableChildren(e) {
              var t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => e + ':not([tabindex^="-"])').join(",");
              return this.find(t, e).filter(e => !o(e) && r(e))
          },
          getSelectorFromElement(e) {
              e = he(e);
              return e && u.findOne(e) ? e : null
          },
          getElementFromSelector(e) {
              e = he(e);
              return e ? u.findOne(e) : null
          },
          getMultipleElementsFromSelector(e) {
              e = he(e);
              return e ? u.find(e) : []
          }
      };
  var pe = (t, i = "hide") => {
      var e = "click.dismiss" + t.EVENT_KEY;
      const n = t.NAME;
      g.on(document, e, `[data-bs-dismiss="${n}"]`, function(e) {
          ["A", "AREA"].includes(this.tagName) && e.preventDefault(), o(this) || (e = u.getElementFromSelector(this) || this.closest("." + n), t.getOrCreateInstance(e)[i]())
      })
  };
  class me extends t {
      static get NAME() {
          return "alert"
      }
      close() {
          var e;
          g.trigger(this._element, "close.bs.alert").defaultPrevented || (this._element.classList.remove("show"), e = this._element.classList.contains("fade"), this._queueCallback(() => this._destroyElement(), this._element, e))
      }
      _destroyElement() {
          this._element.remove(), g.trigger(this._element, "closed.bs.alert"), this.dispose()
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = me.getOrCreateInstance(this);
              if ("string" == typeof t) {
                  if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                  e[t](this)
              }
          })
      }
  }
  pe(me, "close"), e(me);
  const ge = '[data-bs-toggle="button"]';
  class fe extends t {
      static get NAME() {
          return "button"
      }
      toggle() {
          this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = fe.getOrCreateInstance(this);
              "toggle" === t && e[t]()
          })
      }
  }
  g.on(document, "click.bs.button.data-api", ge, e => {
      e.preventDefault();
      e = e.target.closest(ge);
      fe.getOrCreateInstance(e).toggle()
  }), e(fe);
  const i = ".bs.swipe",
      be = (i, i, i, i, i, {
          endCallback: null,
          leftCallback: null,
          rightCallback: null
      }),
      ve = {
          endCallback: "(function|null)",
          leftCallback: "(function|null)",
          rightCallback: "(function|null)"
      };
  class ye extends ue {
      constructor(e, t) {
          super(), (this._element = e) && ye.isSupported() && (this._config = this._getConfig(t), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
      }
      static get Default() {
          return be
      }
      static get DefaultType() {
          return ve
      }
      static get NAME() {
          return "swipe"
      }
      dispose() {
          g.off(this._element, i)
      }
      _start(e) {
          this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : this._deltaX = e.touches[0].clientX
      }
      _end(e) {
          this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), c(this._config.endCallback)
      }
      _move(e) {
          this._deltaX = e.touches && 1 < e.touches.length ? 0 : e.touches[0].clientX - this._deltaX
      }
      _handleSwipe() {
          var e = Math.abs(this._deltaX);
          e <= 40 || (e = e / this._deltaX, this._deltaX = 0, e && c(0 < e ? this._config.rightCallback : this._config.leftCallback))
      }
      _initEvents() {
          this._supportPointerEvents ? (g.on(this._element, "pointerdown.bs.swipe", e => this._start(e)), g.on(this._element, "pointerup.bs.swipe", e => this._end(e)), this._element.classList.add("pointer-event")) : (g.on(this._element, "touchstart.bs.swipe", e => this._start(e)), g.on(this._element, "touchmove.bs.swipe", e => this._move(e)), g.on(this._element, "touchend.bs.swipe", e => this._end(e)))
      }
      _eventIsPointerPenTouch(e) {
          return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType)
      }
      static isSupported() {
          return "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints
      }
  }
  var h = ".bs.carousel";
  const we = "next",
      p = "prev",
      m = "left",
      _e = "right",
      Ee = "slid" + h;
  const xe = "carousel",
      Ce = "active",
      Te = ".active",
      Se = ".carousel-item";
  Te, Se;
  const ke = {
          ArrowLeft: _e,
          ArrowRight: m
      },
      Me = {
          interval: 5e3,
          keyboard: !0,
          pause: "hover",
          ride: !1,
          touch: !0,
          wrap: !0
      },
      Ae = {
          interval: "(number|boolean)",
          keyboard: "boolean",
          pause: "(string|boolean)",
          ride: "(boolean|string)",
          touch: "boolean",
          wrap: "boolean"
      };
  class Ne extends t {
      constructor(e, t) {
          super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = u.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === xe && this.cycle()
      }
      static get Default() {
          return Me
      }
      static get DefaultType() {
          return Ae
      }
      static get NAME() {
          return "carousel"
      }
      next() {
          this._slide(we)
      }
      nextWhenVisible() {
          !document.hidden && r(this._element) && this.next()
      }
      prev() {
          this._slide(p)
      }
      pause() {
          this._isSliding && B(this._element), this._clearInterval()
      }
      cycle() {
          this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
      }
      _maybeEnableCycle() {
          this._config.ride && (this._isSliding ? g.one(this._element, Ee, () => this.cycle()) : this.cycle())
      }
      to(e) {
          var t, i = this._getItems();
          e > i.length - 1 || e < 0 || (this._isSliding ? g.one(this._element, Ee, () => this.to(e)) : (t = this._getItemIndex(this._getActive())) !== e && (t = t < e ? we : p, this._slide(t, i[e])))
      }
      dispose() {
          this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
      }
      _configAfterMerge(e) {
          return e.defaultInterval = e.interval, e
      }
      _addEventListeners() {
          this._config.keyboard && g.on(this._element, "keydown.bs.carousel", e => this._keydown(e)), "hover" === this._config.pause && (g.on(this._element, "mouseenter.bs.carousel", () => this.pause()), g.on(this._element, "mouseleave.bs.carousel", () => this._maybeEnableCycle())), this._config.touch && ye.isSupported() && this._addTouchEventListeners()
      }
      _addTouchEventListeners() {
          for (const t of u.find(".carousel-item img", this._element)) g.on(t, "dragstart.bs.carousel", e => e.preventDefault());
          var e = {
              leftCallback: () => this._slide(this._directionToOrder(m)),
              rightCallback: () => this._slide(this._directionToOrder(_e)),
              endCallback: () => {
                  "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval))
              }
          };
          this._swipeHelper = new ye(this._element, e)
      }
      _keydown(e) {
          var t;
          /input|textarea/i.test(e.target.tagName) || (t = ke[e.key]) && (e.preventDefault(), this._slide(this._directionToOrder(t)))
      }
      _getItemIndex(e) {
          return this._getItems().indexOf(e)
      }
      _setActiveIndicatorElement(e) {
          var t;
          this._indicatorsElement && ((t = u.findOne(Te, this._indicatorsElement)).classList.remove(Ce), t.removeAttribute("aria-current"), t = u.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement)) && (t.classList.add(Ce), t.setAttribute("aria-current", "true"))
      }
      _updateInterval() {
          var e = this._activeElement || this._getActive();
          e && (e = Number.parseInt(e.getAttribute("data-bs-interval"), 10), this._config.interval = e || this._config.defaultInterval)
      }
      _slide(t, e = null) {
          if (!this._isSliding) {
              const n = this._getActive();
              var i = t === we;
              const s = e || V(this._getItems(), n, i, this._config.wrap);
              if (s !== n) {
                  const a = this._getItemIndex(s),
                      r = e => g.trigger(this._element, e, {
                          relatedTarget: s,
                          direction: this._orderToDirection(t),
                          from: this._getItemIndex(n),
                          to: a
                      });
                  e = r("slide.bs.carousel");
                  if (!e.defaultPrevented && n && s) {
                      e = Boolean(this._interval);
                      this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = s;
                      const o = i ? "carousel-item-start" : "carousel-item-end",
                          l = i ? "carousel-item-next" : "carousel-item-prev";
                      s.classList.add(l), q(s), n.classList.add(o), s.classList.add(o);
                      this._queueCallback(() => {
                          s.classList.remove(o, l), s.classList.add(Ce), n.classList.remove(Ce, l, o), this._isSliding = !1, r(Ee)
                      }, n, this._isAnimated()), e && this.cycle()
                  }
              }
          }
      }
      _isAnimated() {
          return this._element.classList.contains("slide")
      }
      _getActive() {
          return u.findOne(".active.carousel-item", this._element)
      }
      _getItems() {
          return u.find(Se, this._element)
      }
      _clearInterval() {
          this._interval && (clearInterval(this._interval), this._interval = null)
      }
      _directionToOrder(e) {
          return l() ? e === m ? p : we : e === m ? we : p
      }
      _orderToDirection(e) {
          return l() ? e === p ? m : _e : e === p ? _e : m
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = Ne.getOrCreateInstance(this, t);
              if ("number" == typeof t) e.to(t);
              else if ("string" == typeof t) {
                  if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                  e[t]()
              }
          })
      }
  }
  g.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", function(e) {
      var t = u.getElementFromSelector(this);
      t && t.classList.contains(xe) && (e.preventDefault(), e = Ne.getOrCreateInstance(t), (t = this.getAttribute("data-bs-slide-to")) ? e.to(t) : "next" === d.getDataAttribute(this, "slide") ? e.next() : e.prev(), e._maybeEnableCycle())
  }), g.on(window, "load.bs.carousel.data-api", () => {
      for (const e of u.find('[data-bs-ride="carousel"]')) Ne.getOrCreateInstance(e)
  }), e(Ne);
  const Oe = "show",
      f = "collapse",
      De = "collapsing",
      Ie = (f, f, '[data-bs-toggle="collapse"]'),
      Le = {
          parent: null,
          toggle: !0
      },
      $e = {
          parent: "(null|element)",
          toggle: "boolean"
      };
  class Pe extends t {
      constructor(e, t) {
          super(e, t), this._isTransitioning = !1, this._triggerArray = [];
          for (const s of u.find(Ie)) {
              var i = u.getSelectorFromElement(s),
                  n = u.find(i).filter(e => e === this._element);
              null !== i && n.length && this._triggerArray.push(s)
          }
          this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
      }
      static get Default() {
          return Le
      }
      static get DefaultType() {
          return $e
      }
      static get NAME() {
          return "collapse"
      }
      toggle() {
          this._isShown() ? this.hide() : this.show()
      }
      show() {
          if (!this._isTransitioning && !this._isShown()) {
              let e = [];
              if (!(e = this._config.parent ? this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => Pe.getOrCreateInstance(e, {
                      toggle: !1
                  })) : e).length || !e[0]._isTransitioning) {
                  var t = g.trigger(this._element, "show.bs.collapse");
                  if (!t.defaultPrevented) {
                      for (const n of e) n.hide();
                      const i = this._getDimension();
                      this._element.classList.remove(f), this._element.classList.add(De), this._element.style[i] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
                      t = "scroll" + (i[0].toUpperCase() + i.slice(1));
                      this._queueCallback(() => {
                          this._isTransitioning = !1, this._element.classList.remove(De), this._element.classList.add(f, Oe), this._element.style[i] = "", g.trigger(this._element, "shown.bs.collapse")
                      }, this._element, !0), this._element.style[i] = this._element[t] + "px"
                  }
              }
          }
      }
      hide() {
          if (!this._isTransitioning && this._isShown()) {
              var e = g.trigger(this._element, "hide.bs.collapse");
              if (!e.defaultPrevented) {
                  e = this._getDimension();
                  this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", q(this._element), this._element.classList.add(De), this._element.classList.remove(f, Oe);
                  for (const i of this._triggerArray) {
                      var t = u.getElementFromSelector(i);
                      t && !this._isShown(t) && this._addAriaAndCollapsedClass([i], !1)
                  }
                  this._isTransitioning = !0;
                  this._element.style[e] = "", this._queueCallback(() => {
                      this._isTransitioning = !1, this._element.classList.remove(De), this._element.classList.add(f), g.trigger(this._element, "hidden.bs.collapse")
                  }, this._element, !0)
              }
          }
      }
      _isShown(e = this._element) {
          return e.classList.contains(Oe)
      }
      _configAfterMerge(e) {
          return e.toggle = Boolean(e.toggle), e.parent = s(e.parent), e
      }
      _getDimension() {
          return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
      }
      _initializeChildren() {
          if (this._config.parent)
              for (const t of this._getFirstLevelChildren(Ie)) {
                  var e = u.getElementFromSelector(t);
                  e && this._addAriaAndCollapsedClass([t], this._isShown(e))
              }
      }
      _getFirstLevelChildren(e) {
          const t = u.find(":scope .collapse .collapse", this._config.parent);
          return u.find(e, this._config.parent).filter(e => !t.includes(e))
      }
      _addAriaAndCollapsedClass(e, t) {
          if (e.length)
              for (const i of e) i.classList.toggle("collapsed", !t), i.setAttribute("aria-expanded", t)
      }
      static jQueryInterface(t) {
          const i = {};
          return "string" == typeof t && /show|hide/.test(t) && (i.toggle = !1), this.each(function() {
              var e = Pe.getOrCreateInstance(this, i);
              if ("string" == typeof t) {
                  if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                  e[t]()
              }
          })
      }
  }
  g.on(document, "click.bs.collapse.data-api", Ie, function(e) {
      ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
      for (const t of u.getMultipleElementsFromSelector(this)) Pe.getOrCreateInstance(t, {
          toggle: !1
      }).toggle()
  }), e(Pe);
  var k = "top",
      M = "bottom",
      A = "right",
      N = "left",
      je = "auto",
      O = [k, M, A, N],
      D = "start",
      Re = "end",
      ze = "clippingParents",
      Be = "viewport",
      Fe = "popper",
      He = "reference",
      qe = O.reduce(function(e, t) {
          return e.concat([t + "-" + D, t + "-" + Re])
      }, []),
      Ye = [].concat(O, [je]).reduce(function(e, t) {
          return e.concat([t, t + "-" + D, t + "-" + Re])
      }, []),
      h = "beforeRead",
      We = "afterRead",
      Ue = "beforeMain",
      Ve = "afterMain",
      Xe = "beforeWrite",
      Ge = "afterWrite",
      Ke = [h, "read", We, Ue, "main", Ve, Xe, "write", Ge];

  function b(e) {
      return e ? (e.nodeName || "").toLowerCase() : null
  }

  function y(e) {
      var t;
      return null == e ? window : "[object Window]" !== e.toString() ? (t = e.ownerDocument) && t.defaultView || window : e
  }

  function v(e) {
      return e instanceof y(e).Element || e instanceof Element
  }

  function w(e) {
      return e instanceof y(e).HTMLElement || e instanceof HTMLElement
  }

  function Ze(e) {
      return "undefined" != typeof ShadowRoot && (e instanceof y(e).ShadowRoot || e instanceof ShadowRoot)
  }
  var Qe = {
      name: "applyStyles",
      enabled: !0,
      phase: "write",
      fn: function(e) {
          var s = e.state;
          Object.keys(s.elements).forEach(function(e) {
              var t = s.styles[e] || {},
                  i = s.attributes[e] || {},
                  n = s.elements[e];
              w(n) && b(n) && (Object.assign(n.style, t), Object.keys(i).forEach(function(e) {
                  var t = i[e];
                  !1 === t ? n.removeAttribute(e) : n.setAttribute(e, !0 === t ? "" : t)
              }))
          })
      },
      effect: function(e) {
          var n = e.state,
              s = {
                  popper: {
                      position: n.options.strategy,
                      left: "0",
                      top: "0",
                      margin: "0"
                  },
                  arrow: {
                      position: "absolute"
                  },
                  reference: {}
              };
          return Object.assign(n.elements.popper.style, s.popper), n.styles = s, n.elements.arrow && Object.assign(n.elements.arrow.style, s.arrow),
              function() {
                  Object.keys(n.elements).forEach(function(e) {
                      var t = n.elements[e],
                          i = n.attributes[e] || {},
                          e = Object.keys((n.styles.hasOwnProperty(e) ? n.styles : s)[e]).reduce(function(e, t) {
                              return e[t] = "", e
                          }, {});
                      w(t) && b(t) && (Object.assign(t.style, e), Object.keys(i).forEach(function(e) {
                          t.removeAttribute(e)
                      }))
                  })
              }
      },
      requires: ["computeStyles"]
  };

  function I(e) {
      return e.split("-")[0]
  }
  var S = Math.max,
      Je = Math.min,
      et = Math.round;

  function tt() {
      var e = navigator.userAgentData;
      return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
          return e.brand + "/" + e.version
      }).join(" ") : navigator.userAgent
  }

  function it() {
      return !/^((?!chrome|android).)*safari/i.test(tt())
  }

  function nt(e, t, i) {
      void 0 === t && (t = !1), void 0 === i && (i = !1);
      var n = e.getBoundingClientRect(),
          s = 1,
          a = 1;
      t && w(e) && (s = 0 < e.offsetWidth && et(n.width) / e.offsetWidth || 1, a = 0 < e.offsetHeight && et(n.height) / e.offsetHeight || 1);
      t = (v(e) ? y(e) : window).visualViewport, e = !it() && i, i = (n.left + (e && t ? t.offsetLeft : 0)) / s, e = (n.top + (e && t ? t.offsetTop : 0)) / a, t = n.width / s, s = n.height / a;
      return {
          width: t,
          height: s,
          top: e,
          right: i + t,
          bottom: e + s,
          left: i,
          x: i,
          y: e
      }
  }

  function st(e) {
      var t = nt(e),
          i = e.offsetWidth,
          n = e.offsetHeight;
      return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
          x: e.offsetLeft,
          y: e.offsetTop,
          width: i,
          height: n
      }
  }

  function at(e, t) {
      var i = t.getRootNode && t.getRootNode();
      if (e.contains(t)) return !0;
      if (i && Ze(i)) {
          var n = t;
          do {
              if (n && e.isSameNode(n)) return !0
          } while (n = n.parentNode || n.host)
      }
      return !1
  }

  function _(e) {
      return y(e).getComputedStyle(e)
  }

  function E(e) {
      return ((v(e) ? e.ownerDocument : e.document) || window.document).documentElement
  }

  function rt(e) {
      return "html" === b(e) ? e : e.assignedSlot || e.parentNode || (Ze(e) ? e.host : null) || E(e)
  }

  function ot(e) {
      return w(e) && "fixed" !== _(e).position ? e.offsetParent : null
  }

  function lt(e) {
      for (var t, i = y(e), n = ot(e); n && (t = n, 0 <= ["table", "td", "th"].indexOf(b(t))) && "static" === _(n).position;) n = ot(n);
      return (!n || "html" !== b(n) && ("body" !== b(n) || "static" !== _(n).position)) && (n || function(e) {
          var t = /firefox/i.test(tt()),
              i = /Trident/i.test(tt());
          if (!i || !w(e) || "fixed" !== _(e).position) {
              var n = rt(e);
              for (Ze(n) && (n = n.host); w(n) && ["html", "body"].indexOf(b(n)) < 0;) {
                  var s = _(n);
                  if ("none" !== s.transform || "none" !== s.perspective || "paint" === s.contain || -1 !== ["transform", "perspective"].indexOf(s.willChange) || t && "filter" === s.willChange || t && s.filter && "none" !== s.filter) return n;
                  n = n.parentNode
              }
          }
          return null
      }(e)) || i
  }

  function ct(e) {
      return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
  }

  function dt(e, t, i) {
      return S(e, Je(t, i))
  }

  function ut() {
      return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
      }
  }

  function ht(e) {
      return Object.assign({}, ut(), e)
  }

  function pt(i, e) {
      return e.reduce(function(e, t) {
          return e[t] = i, e
      }, {})
  }
  var mt = {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function(e) {
          var t, i, n, s, a = e.state,
              r = e.name,
              e = e.options,
              o = a.elements.arrow,
              l = a.modifiersData.popperOffsets,
              c = ct(d = I(a.placement)),
              d = 0 <= [N, A].indexOf(d) ? "height" : "width";
          o && l && (e = e.padding, i = a, i = ht("number" != typeof(e = "function" == typeof e ? e(Object.assign({}, i.rects, {
              placement: i.placement
          })) : e) ? e : pt(e, O)), e = st(o), s = "y" === c ? k : N, n = "y" === c ? M : A, t = a.rects.reference[d] + a.rects.reference[c] - l[c] - a.rects.popper[d], l = l[c] - a.rects.reference[c], o = (o = lt(o)) ? "y" === c ? o.clientHeight || 0 : o.clientWidth || 0 : 0, s = i[s], i = o - e[d] - i[n], s = dt(s, n = o / 2 - e[d] / 2 + (t / 2 - l / 2), i), a.modifiersData[r] = ((o = {})[c] = s, o.centerOffset = s - n, o))
      },
      effect: function(e) {
          var t = e.state;
          null != (e = void 0 === (e = e.options.element) ? "[data-popper-arrow]" : e) && ("string" != typeof e || (e = t.elements.popper.querySelector(e))) && at(t.elements.popper, e) && (t.elements.arrow = e)
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
  };

  function gt(e) {
      return e.split("-")[1]
  }
  var ft = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
  };

  function bt(e) {
      var t, i = e.popper,
          n = e.popperRect,
          s = e.placement,
          a = e.variation,
          r = e.offsets,
          o = e.position,
          l = e.gpuAcceleration,
          c = e.adaptive,
          d = e.roundOffsets,
          e = e.isFixed,
          u = r.x,
          u = void 0 === u ? 0 : u,
          h = r.y,
          h = void 0 === h ? 0 : h,
          p = "function" == typeof d ? d({
              x: u,
              y: h
          }) : {
              x: u,
              y: h
          },
          p = (u = p.x, h = p.y, r.hasOwnProperty("x")),
          r = r.hasOwnProperty("y"),
          m = N,
          g = k,
          f = window,
          b = (c && (b = "clientHeight", t = "clientWidth", (v = lt(i)) === y(i) && "static" !== _(v = E(i)).position && "absolute" === o && (b = "scrollHeight", t = "scrollWidth"), s !== k && (s !== N && s !== A || a !== Re) || (g = M, h = (h - ((e && v === f && f.visualViewport ? f.visualViewport.height : v[b]) - n.height)) * (l ? 1 : -1)), s !== N && (s !== k && s !== M || a !== Re) || (m = A, u = (u - ((e && v === f && f.visualViewport ? f.visualViewport.width : v[t]) - n.width)) * (l ? 1 : -1))), Object.assign({
              position: o
          }, c && ft)),
          v = !0 === d ? (s = {
              x: u,
              y: h
          }, a = y(i), e = s.x, s = s.y, a = a.devicePixelRatio || 1, {
              x: et(e * a) / a || 0,
              y: et(s * a) / a || 0
          }) : {
              x: u,
              y: h
          };
      return u = v.x, h = v.y, l ? Object.assign({}, b, ((t = {})[g] = r ? "0" : "", t[m] = p ? "0" : "", t.transform = (f.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + h + "px)" : "translate3d(" + u + "px, " + h + "px, 0)", t)) : Object.assign({}, b, ((n = {})[g] = r ? h + "px" : "", n[m] = p ? u + "px" : "", n.transform = "", n))
  }
  var vt = {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function(e) {
              var t = e.state,
                  e = e.options,
                  i = void 0 === (i = e.gpuAcceleration) || i,
                  n = void 0 === (n = e.adaptive) || n,
                  e = void 0 === (e = e.roundOffsets) || e,
                  i = {
                      placement: I(t.placement),
                      variation: gt(t.placement),
                      popper: t.elements.popper,
                      popperRect: t.rects.popper,
                      gpuAcceleration: i,
                      isFixed: "fixed" === t.options.strategy
                  };
              null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, bt(Object.assign({}, i, {
                  offsets: t.modifiersData.popperOffsets,
                  position: t.options.strategy,
                  adaptive: n,
                  roundOffsets: e
              })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, bt(Object.assign({}, i, {
                  offsets: t.modifiersData.arrow,
                  position: "absolute",
                  adaptive: !1,
                  roundOffsets: e
              })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                  "data-popper-placement": t.placement
              })
          },
          data: {}
      },
      yt = {
          passive: !0
      };
  var wt = {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function() {},
          effect: function(e) {
              var t = e.state,
                  i = e.instance,
                  n = (e = e.options).scroll,
                  s = void 0 === n || n,
                  a = void 0 === (n = e.resize) || n,
                  r = y(t.elements.popper),
                  o = [].concat(t.scrollParents.reference, t.scrollParents.popper);
              return s && o.forEach(function(e) {
                      e.addEventListener("scroll", i.update, yt)
                  }), a && r.addEventListener("resize", i.update, yt),
                  function() {
                      s && o.forEach(function(e) {
                          e.removeEventListener("scroll", i.update, yt)
                      }), a && r.removeEventListener("resize", i.update, yt)
                  }
          },
          data: {}
      },
      _t = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom"
      };

  function Et(e) {
      return e.replace(/left|right|bottom|top/g, function(e) {
          return _t[e]
      })
  }
  var xt = {
      start: "end",
      end: "start"
  };

  function Ct(e) {
      return e.replace(/start|end/g, function(e) {
          return xt[e]
      })
  }

  function Tt(e) {
      e = y(e);
      return {
          scrollLeft: e.pageXOffset,
          scrollTop: e.pageYOffset
      }
  }

  function St(e) {
      return nt(E(e)).left + Tt(e).scrollLeft
  }

  function kt(e) {
      var e = _(e),
          t = e.overflow,
          i = e.overflowX,
          e = e.overflowY;
      return /auto|scroll|overlay|hidden/.test(t + e + i)
  }

  function Mt(e, t) {
      void 0 === t && (t = []);
      var i = function e(t) {
              return 0 <= ["html", "body", "#document"].indexOf(b(t)) ? t.ownerDocument.body : w(t) && kt(t) ? t : e(rt(t))
          }(e),
          e = i === (null == (e = e.ownerDocument) ? void 0 : e.body),
          n = y(i),
          n = e ? [n].concat(n.visualViewport || [], kt(i) ? i : []) : i,
          i = t.concat(n);
      return e ? i : i.concat(Mt(rt(n)))
  }

  function At(e) {
      return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height
      })
  }

  function Nt(e, t, i) {
      return t === Be ? At((s = i, r = y(n = e), o = E(n), r = r.visualViewport, l = o.clientWidth, o = o.clientHeight, d = c = 0, r && (l = r.width, o = r.height, (a = it()) || !a && "fixed" === s) && (c = r.offsetLeft, d = r.offsetTop), {
          width: l,
          height: o,
          x: c + St(n),
          y: d
      })) : v(t) ? ((s = nt(a = t, !1, "fixed" === (s = i))).top = s.top + a.clientTop, s.left = s.left + a.clientLeft, s.bottom = s.top + a.clientHeight, s.right = s.left + a.clientWidth, s.width = a.clientWidth, s.height = a.clientHeight, s.x = s.left, s.y = s.top, s) : At((r = E(e), l = E(r), o = Tt(r), c = null == (c = r.ownerDocument) ? void 0 : c.body, n = S(l.scrollWidth, l.clientWidth, c ? c.scrollWidth : 0, c ? c.clientWidth : 0), d = S(l.scrollHeight, l.clientHeight, c ? c.scrollHeight : 0, c ? c.clientHeight : 0), r = -o.scrollLeft + St(r), o = -o.scrollTop, "rtl" === _(c || l).direction && (r += S(l.clientWidth, c ? c.clientWidth : 0) - n), {
          width: n,
          height: d,
          x: r,
          y: o
      }));
      var n, s, a, r, o, l, c, d
  }

  function Ot(i, e, t, n) {
      var s, a = "clippingParents" === e ? (r = Mt(rt(a = i)), v(s = 0 <= ["absolute", "fixed"].indexOf(_(a).position) && w(a) ? lt(a) : a) ? r.filter(function(e) {
              return v(e) && at(e, s) && "body" !== b(e)
          }) : []) : [].concat(e),
          r = [].concat(a, [t]),
          e = r[0],
          t = r.reduce(function(e, t) {
              t = Nt(i, t, n);
              return e.top = S(t.top, e.top), e.right = Je(t.right, e.right), e.bottom = Je(t.bottom, e.bottom), e.left = S(t.left, e.left), e
          }, Nt(i, e, n));
      return t.width = t.right - t.left, t.height = t.bottom - t.top, t.x = t.left, t.y = t.top, t
  }

  function Dt(e) {
      var t, i = e.reference,
          n = e.element,
          e = e.placement,
          s = e ? I(e) : null,
          e = e ? gt(e) : null,
          a = i.x + i.width / 2 - n.width / 2,
          r = i.y + i.height / 2 - n.height / 2;
      switch (s) {
          case k:
              t = {
                  x: a,
                  y: i.y - n.height
              };
              break;
          case M:
              t = {
                  x: a,
                  y: i.y + i.height
              };
              break;
          case A:
              t = {
                  x: i.x + i.width,
                  y: r
              };
              break;
          case N:
              t = {
                  x: i.x - n.width,
                  y: r
              };
              break;
          default:
              t = {
                  x: i.x,
                  y: i.y
              }
      }
      var o = s ? ct(s) : null;
      if (null != o) {
          var l = "y" === o ? "height" : "width";
          switch (e) {
              case D:
                  t[o] = t[o] - (i[l] / 2 - n[l] / 2);
                  break;
              case Re:
                  t[o] = t[o] + (i[l] / 2 - n[l] / 2)
          }
      }
      return t
  }

  function It(e, t) {
      var n, t = t = void 0 === t ? {} : t,
          i = t.placement,
          i = void 0 === i ? e.placement : i,
          s = t.strategy,
          s = void 0 === s ? e.strategy : s,
          a = t.boundary,
          a = void 0 === a ? ze : a,
          r = t.rootBoundary,
          r = void 0 === r ? Be : r,
          o = t.elementContext,
          o = void 0 === o ? Fe : o,
          l = t.altBoundary,
          l = void 0 !== l && l,
          t = t.padding,
          t = void 0 === t ? 0 : t,
          t = ht("number" != typeof t ? t : pt(t, O)),
          c = e.rects.popper,
          l = e.elements[l ? o === Fe ? He : Fe : o],
          l = Ot(v(l) ? l : l.contextElement || E(e.elements.popper), a, r, s),
          a = nt(e.elements.reference),
          r = Dt({
              reference: a,
              element: c,
              strategy: "absolute",
              placement: i
          }),
          s = At(Object.assign({}, c, r)),
          c = o === Fe ? s : a,
          d = {
              top: l.top - c.top + t.top,
              bottom: c.bottom - l.bottom + t.bottom,
              left: l.left - c.left + t.left,
              right: c.right - l.right + t.right
          },
          r = e.modifiersData.offset;
      return o === Fe && r && (n = r[i], Object.keys(d).forEach(function(e) {
          var t = 0 <= [A, M].indexOf(e) ? 1 : -1,
              i = 0 <= [k, M].indexOf(e) ? "y" : "x";
          d[e] += n[i] * t
      })), d
  }
  var Lt = {
      name: "flip",
      enabled: !0,
      phase: "main",
      fn: function(e) {
          var u = e.state,
              t = e.options,
              e = e.name;
          if (!u.modifiersData[e]._skip) {
              for (var i = t.mainAxis, n = void 0 === i || i, i = t.altAxis, s = void 0 === i || i, i = t.fallbackPlacements, h = t.padding, p = t.boundary, m = t.rootBoundary, a = t.altBoundary, r = t.flipVariations, g = void 0 === r || r, f = t.allowedAutoPlacements, r = u.options.placement, t = I(r), i = i || (t === r || !g ? [Et(r)] : I(i = r) === je ? [] : (t = Et(i), [Ct(i), t, Ct(t)])), o = [r].concat(i).reduce(function(e, t) {
                      return e.concat(I(t) === je ? (i = u, n = (e = e = void 0 === (e = {
                          placement: t,
                          boundary: p,
                          rootBoundary: m,
                          padding: h,
                          flipVariations: g,
                          allowedAutoPlacements: f
                      }) ? {} : e).placement, s = e.boundary, a = e.rootBoundary, r = e.padding, o = e.flipVariations, l = void 0 === (e = e.allowedAutoPlacements) ? Ye : e, c = gt(n), e = c ? o ? qe : qe.filter(function(e) {
                          return gt(e) === c
                      }) : O, d = (n = 0 === (n = e.filter(function(e) {
                          return 0 <= l.indexOf(e)
                      })).length ? e : n).reduce(function(e, t) {
                          return e[t] = It(i, {
                              placement: t,
                              boundary: s,
                              rootBoundary: a,
                              padding: r
                          })[I(t)], e
                      }, {}), Object.keys(d).sort(function(e, t) {
                          return d[e] - d[t]
                      })) : t);
                      var i, n, s, a, r, o, l, c, d
                  }, []), l = u.rects.reference, c = u.rects.popper, d = new Map, b = !0, v = o[0], y = 0; y < o.length; y++) {
                  var w = o[y],
                      _ = I(w),
                      E = gt(w) === D,
                      x = 0 <= [k, M].indexOf(_),
                      C = x ? "width" : "height",
                      T = It(u, {
                          placement: w,
                          boundary: p,
                          rootBoundary: m,
                          altBoundary: a,
                          padding: h
                      }),
                      x = x ? E ? A : N : E ? M : k,
                      E = (l[C] > c[C] && (x = Et(x)), Et(x)),
                      C = [];
                  if (n && C.push(T[_] <= 0), s && C.push(T[x] <= 0, T[E] <= 0), C.every(function(e) {
                          return e
                      })) {
                      v = w, b = !1;
                      break
                  }
                  d.set(w, C)
              }
              if (b)
                  for (var S = g ? 3 : 1; 0 < S; S--)
                      if ("break" === function(t) {
                              var e = o.find(function(e) {
                                  e = d.get(e);
                                  if (e) return e.slice(0, t).every(function(e) {
                                      return e
                                  })
                              });
                              if (e) return v = e, "break"
                          }(S)) break;
              u.placement !== v && (u.modifiersData[e]._skip = !0, u.placement = v, u.reset = !0)
          }
      },
      requiresIfExists: ["offset"],
      data: {
          _skip: !1
      }
  };

  function $t(e, t, i) {
      return {
          top: e.top - t.height - (i = void 0 === i ? {
              x: 0,
              y: 0
          } : i).y,
          right: e.right - t.width + i.x,
          bottom: e.bottom - t.height + i.y,
          left: e.left - t.width - i.x
      }
  }

  function Pt(t) {
      return [k, A, M, N].some(function(e) {
          return 0 <= t[e]
      })
  }
  var jt = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function(e) {
          var t = e.state,
              e = e.name,
              i = t.rects.reference,
              n = t.rects.popper,
              s = t.modifiersData.preventOverflow,
              a = It(t, {
                  elementContext: "reference"
              }),
              r = It(t, {
                  altBoundary: !0
              }),
              a = $t(a, i),
              i = $t(r, n, s),
              r = Pt(a),
              n = Pt(i);
          t.modifiersData[e] = {
              referenceClippingOffsets: a,
              popperEscapeOffsets: i,
              isReferenceHidden: r,
              hasPopperEscaped: n
          }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
              "data-popper-reference-hidden": r,
              "data-popper-escaped": n
          })
      }
  };
  var Rt = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function(e) {
          var r = e.state,
              t = e.options,
              e = e.name,
              o = void 0 === (t = t.offset) ? [0, 0] : t,
              t = Ye.reduce(function(e, t) {
                  var i, n, s, a;
                  return e[t] = (t = t, i = r.rects, n = o, s = I(t), a = 0 <= [N, k].indexOf(s) ? -1 : 1, t = (i = "function" == typeof n ? n(Object.assign({}, i, {
                      placement: t
                  })) : n)[0] || 0, n = (i[1] || 0) * a, 0 <= [N, A].indexOf(s) ? {
                      x: n,
                      y: t
                  } : {
                      x: t,
                      y: n
                  }), e
              }, {}),
              i = (n = t[r.placement]).x,
              n = n.y;
          null != r.modifiersData.popperOffsets && (r.modifiersData.popperOffsets.x += i, r.modifiersData.popperOffsets.y += n), r.modifiersData[e] = t
      }
  };
  var zt = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function(e) {
          var t = e.state,
              e = e.name;
          t.modifiersData[e] = Dt({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement
          })
      },
      data: {}
  };
  var Bt = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function(e) {
          var t, i, n, s, a, r, o, l, c, d = e.state,
              u = e.options,
              e = e.name,
              h = void 0 === (h = u.mainAxis) || h,
              p = void 0 !== (p = u.altAxis) && p,
              m = u.boundary,
              g = u.rootBoundary,
              f = u.altBoundary,
              b = u.padding,
              v = void 0 === (v = u.tether) || v,
              u = void 0 === (u = u.tetherOffset) ? 0 : u,
              m = It(d, {
                  boundary: m,
                  rootBoundary: g,
                  padding: b,
                  altBoundary: f
              }),
              g = I(d.placement),
              f = !(b = gt(d.placement)),
              y = ct(g),
              w = "x" === y ? "y" : "x",
              _ = d.modifiersData.popperOffsets,
              E = d.rects.reference,
              x = d.rects.popper,
              u = "number" == typeof(u = "function" == typeof u ? u(Object.assign({}, d.rects, {
                  placement: d.placement
              })) : u) ? {
                  mainAxis: u,
                  altAxis: u
              } : Object.assign({
                  mainAxis: 0,
                  altAxis: 0
              }, u),
              C = d.modifiersData.offset ? d.modifiersData.offset[d.placement] : null,
              T = {
                  x: 0,
                  y: 0
              };
          _ && (h && (h = "y" === y ? "height" : "width", r = (o = _[y]) + m[i = "y" === y ? k : N], l = o - m[c = "y" === y ? M : A], t = v ? -x[h] / 2 : 0, s = (b === D ? E : x)[h], b = b === D ? -x[h] : -E[h], a = d.elements.arrow, a = v && a ? st(a) : {
              width: 0,
              height: 0
          }, i = (n = d.modifiersData["arrow#persistent"] ? d.modifiersData["arrow#persistent"].padding : ut())[i], n = n[c], c = dt(0, E[h], a[h]), a = f ? E[h] / 2 - t - c - i - u.mainAxis : s - c - i - u.mainAxis, s = f ? -E[h] / 2 + t + c + n + u.mainAxis : b + c + n + u.mainAxis, f = (i = d.elements.arrow && lt(d.elements.arrow)) ? "y" === y ? i.clientTop || 0 : i.clientLeft || 0 : 0, b = o + s - (t = null != (h = null == C ? void 0 : C[y]) ? h : 0), c = dt(v ? Je(r, o + a - t - f) : r, o, v ? S(l, b) : l), _[y] = c, T[y] = c - o), p && (n = "y" == w ? "height" : "width", s = (i = _[w]) + m["x" === y ? k : N], h = i - m["x" === y ? M : A], a = -1 !== [k, N].indexOf(g), f = null != (t = null == C ? void 0 : C[w]) ? t : 0, r = a ? s : i - E[n] - x[n] - f + u.altAxis, b = a ? i + E[n] + x[n] - f - u.altAxis : h, o = v && a ? (l = dt(l = r, i, c = b), c < l ? c : l) : dt(v ? r : s, i, v ? b : h), _[w] = o, T[w] = o - i), d.modifiersData[e] = T)
      },
      requiresIfExists: ["offset"]
  };

  function Ft(e, t, i) {
      void 0 === i && (i = !1);
      var n = w(t),
          s = w(t) && (r = (s = t).getBoundingClientRect(), a = et(r.width) / s.offsetWidth || 1, r = et(r.height) / s.offsetHeight || 1, 1 !== a || 1 !== r),
          a = E(t),
          r = nt(e, s, i),
          e = {
              scrollLeft: 0,
              scrollTop: 0
          },
          o = {
              x: 0,
              y: 0
          };
      return !n && i || ("body" === b(t) && !kt(a) || (e = (n = t) !== y(n) && w(n) ? {
          scrollLeft: n.scrollLeft,
          scrollTop: n.scrollTop
      } : Tt(n)), w(t) ? ((o = nt(t, !0)).x += t.clientLeft, o.y += t.clientTop) : a && (o.x = St(a))), {
          x: r.left + e.scrollLeft - o.x,
          y: r.top + e.scrollTop - o.y,
          width: r.width,
          height: r.height
      }
  }

  function Ht(e) {
      var i = new Map,
          n = new Set,
          s = [];
      return e.forEach(function(e) {
          i.set(e.name, e)
      }), e.forEach(function(e) {
          n.has(e.name) || ! function t(e) {
              n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
                  n.has(e) || (e = i.get(e)) && t(e)
              }), s.push(e)
          }(e)
      }), s
  }
  var qt = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
  };

  function Yt() {
      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
      return !t.some(function(e) {
          return !(e && "function" == typeof e.getBoundingClientRect)
      })
  }

  function Wt(e) {
      var e = e = void 0 === e ? {} : e,
          t = e.defaultModifiers,
          u = void 0 === t ? [] : t,
          t = e.defaultOptions,
          h = void 0 === t ? qt : t;
      return function(n, s, t) {
          void 0 === t && (t = h);
          var i, a, r = {
                  placement: "bottom",
                  orderedModifiers: [],
                  options: Object.assign({}, qt, h),
                  modifiersData: {},
                  elements: {
                      reference: n,
                      popper: s
                  },
                  attributes: {},
                  styles: {}
              },
              o = [],
              l = !1,
              c = {
                  state: r,
                  setOptions: function(e) {
                      var i, t, e = "function" == typeof e ? e(r.options) : e,
                          e = (d(), r.options = Object.assign({}, h, r.options, e), r.scrollParents = {
                              reference: v(n) ? Mt(n) : n.contextElement ? Mt(n.contextElement) : [],
                              popper: Mt(s)
                          }, e = [].concat(u, r.options.modifiers), t = e.reduce(function(e, t) {
                              var i = e[t.name];
                              return e[t.name] = i ? Object.assign({}, i, t, {
                                  options: Object.assign({}, i.options, t.options),
                                  data: Object.assign({}, i.data, t.data)
                              }) : t, e
                          }, {}), e = Object.keys(t).map(function(e) {
                              return t[e]
                          }), i = Ht(e), Ke.reduce(function(e, t) {
                              return e.concat(i.filter(function(e) {
                                  return e.phase === t
                              }))
                          }, []));
                      return r.orderedModifiers = e.filter(function(e) {
                          return e.enabled
                      }), r.orderedModifiers.forEach(function(e) {
                          var t = e.name,
                              i = e.options,
                              e = e.effect;
                          "function" == typeof e && (e = e({
                              state: r,
                              name: t,
                              instance: c,
                              options: void 0 === i ? {} : i
                          }), o.push(e || function() {}))
                      }), c.update()
                  },
                  forceUpdate: function() {
                      if (!l) {
                          var e = r.elements,
                              t = e.reference,
                              e = e.popper;
                          if (Yt(t, e)) {
                              r.rects = {
                                  reference: Ft(t, lt(e), "fixed" === r.options.strategy),
                                  popper: st(e)
                              }, r.reset = !1, r.placement = r.options.placement, r.orderedModifiers.forEach(function(e) {
                                  return r.modifiersData[e.name] = Object.assign({}, e.data)
                              });
                              for (var i, n, s, a = 0; a < r.orderedModifiers.length; a++) !0 === r.reset ? (r.reset = !1, a = -1) : (i = (s = r.orderedModifiers[a]).fn, n = s.options, s = s.name, "function" == typeof i && (r = i({
                                  state: r,
                                  options: void 0 === n ? {} : n,
                                  name: s,
                                  instance: c
                              }) || r))
                          }
                      }
                  },
                  update: (i = function() {
                      return new Promise(function(e) {
                          c.forceUpdate(), e(r)
                      })
                  }, function() {
                      return a = a || new Promise(function(e) {
                          Promise.resolve().then(function() {
                              a = void 0, e(i())
                          })
                      })
                  }),
                  destroy: function() {
                      d(), l = !0
                  }
              };
          return Yt(n, s) && c.setOptions(t).then(function(e) {
              !l && t.onFirstUpdate && t.onFirstUpdate(e)
          }), c;

          function d() {
              o.forEach(function(e) {
                  return e()
              }), o = []
          }
      }
  }
  var Ut = Wt({
      defaultModifiers: [wt, zt, vt, Qe, Rt, Lt, Bt, mt, jt]
  });
  const Vt = Object.freeze(Object.defineProperty({
          __proto__: null,
          afterMain: Ve,
          afterRead: We,
          afterWrite: Ge,
          applyStyles: Qe,
          arrow: mt,
          auto: je,
          basePlacements: O,
          beforeMain: Ue,
          beforeRead: h,
          beforeWrite: Xe,
          bottom: M,
          clippingParents: ze,
          computeStyles: vt,
          createPopper: Ut,
          createPopperBase: Wt(),
          createPopperLite: Wt({
              defaultModifiers: [wt, zt, vt, Qe]
          }),
          detectOverflow: It,
          end: Re,
          eventListeners: wt,
          flip: Lt,
          hide: jt,
          left: N,
          main: "main",
          modifierPhases: Ke,
          offset: Rt,
          placements: Ye,
          popper: Fe,
          popperGenerator: Wt,
          popperOffsets: zt,
          preventOverflow: Bt,
          read: "read",
          reference: He,
          right: A,
          start: D,
          top: k,
          variationPlacements: qe,
          viewport: Be,
          write: "write"
      }, Symbol.toStringTag, {
          value: "Module"
      })),
      Xt = "dropdown";
  Ve = ".bs.dropdown", We = ".data-api";
  const Gt = "ArrowDown";
  Ge = "click" + Ve + We, mt = "keydown" + Ve + We;
  const Kt = "show",
      x = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
      Zt = (x, ".dropdown-menu"),
      Qt = l() ? "top-end" : "top-start",
      Jt = l() ? "top-start" : "top-end",
      ei = l() ? "bottom-end" : "bottom-start",
      ti = l() ? "bottom-start" : "bottom-end",
      ii = l() ? "left-start" : "right-start",
      ni = l() ? "right-start" : "left-start",
      si = {
          autoClose: !0,
          boundary: "clippingParents",
          display: "dynamic",
          offset: [0, 2],
          popperConfig: null,
          reference: "toggle"
      },
      ai = {
          autoClose: "(boolean|string)",
          boundary: "(string|element)",
          display: "string",
          offset: "(array|string|function)",
          popperConfig: "(null|object|function)",
          reference: "(string|element|object)"
      };
  class C extends t {
      constructor(e, t) {
          super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = u.next(this._element, Zt)[0] || u.prev(this._element, Zt)[0] || u.findOne(Zt, this._parent), this._inNavbar = this._detectNavbar()
      }
      static get Default() {
          return si
      }
      static get DefaultType() {
          return ai
      }
      static get NAME() {
          return Xt
      }
      toggle() {
          return this._isShown() ? this.hide() : this.show()
      }
      show() {
          if (!o(this._element) && !this._isShown()) {
              var e = {
                      relatedTarget: this._element
                  },
                  t = g.trigger(this._element, "show.bs.dropdown", e);
              if (!t.defaultPrevented) {
                  if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                      for (const i of [].concat(...document.body.children)) g.on(i, "mouseover", H);
                  this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Kt), this._element.classList.add(Kt), g.trigger(this._element, "shown.bs.dropdown", e)
              }
          }
      }
      hide() {
          var e;
          !o(this._element) && this._isShown() && (e = {
              relatedTarget: this._element
          }, this._completeHide(e))
      }
      dispose() {
          this._popper && this._popper.destroy(), super.dispose()
      }
      update() {
          this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
      }
      _completeHide(e) {
          var t = g.trigger(this._element, "hide.bs.dropdown", e);
          if (!t.defaultPrevented) {
              if ("ontouchstart" in document.documentElement)
                  for (const i of [].concat(...document.body.children)) g.off(i, "mouseover", H);
              this._popper && this._popper.destroy(), this._menu.classList.remove(Kt), this._element.classList.remove(Kt), this._element.setAttribute("aria-expanded", "false"), d.removeDataAttribute(this._menu, "popper"), g.trigger(this._element, "hidden.bs.dropdown", e)
          }
      }
      _getConfig(e) {
          if ("object" != typeof(e = super._getConfig(e)).reference || a(e.reference) || "function" == typeof e.reference.getBoundingClientRect) return e;
          throw new TypeError(Xt.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.')
      }
      _createPopper() {
          if (void 0 === Vt) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
          let e = this._element;
          "parent" === this._config.reference ? e = this._parent : a(this._config.reference) ? e = s(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
          var t = this._getPopperConfig();
          this._popper = Ut(e, this._menu, t)
      }
      _isShown() {
          return this._menu.classList.contains(Kt)
      }
      _getPlacement() {
          var e, t = this._parent;
          return t.classList.contains("dropend") ? ii : t.classList.contains("dropstart") ? ni : t.classList.contains("dropup-center") ? "top" : t.classList.contains("dropdown-center") ? "bottom" : (e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim(), t.classList.contains("dropup") ? e ? Jt : Qt : e ? ti : ei)
      }
      _detectNavbar() {
          return null !== this._element.closest(".navbar")
      }
      _getOffset() {
          const t = this._config["offset"];
          return "string" == typeof t ? t.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof t ? e => t(e, this._element) : t
      }
      _getPopperConfig() {
          var e = {
              placement: this._getPlacement(),
              modifiers: [{
                  name: "preventOverflow",
                  options: {
                      boundary: this._config.boundary
                  }
              }, {
                  name: "offset",
                  options: {
                      offset: this._getOffset()
                  }
              }]
          };
          return !this._inNavbar && "static" !== this._config.display || (d.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
              name: "applyStyles",
              enabled: !1
          }]), { ...e,
              ...c(this._config.popperConfig, [e])
          }
      }
      _selectMenuItem({
          key: e,
          target: t
      }) {
          var i = u.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(e => r(e));
          i.length && V(i, t, e === Gt, !i.includes(t)).focus()
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = C.getOrCreateInstance(this, t);
              if ("string" == typeof t) {
                  if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                  e[t]()
              }
          })
      }
      static clearMenus(e) {
          if (2 !== e.button && ("keyup" !== e.type || "Tab" === e.key))
              for (const s of u.find('[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled).show')) {
                  var t, i, n = C.getInstance(s);
                  n && !1 !== n._config.autoClose && (t = (i = e.composedPath()).includes(n._menu), i.includes(n._element) || "inside" === n._config.autoClose && !t || "outside" === n._config.autoClose && t || n._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName)) || (i = {
                      relatedTarget: n._element
                  }, "click" === e.type && (i.clickEvent = e), n._completeHide(i)))
              }
      }
      static dataApiKeydownHandler(e) {
          var t = /input|textarea/i.test(e.target.tagName),
              i = "Escape" === e.key,
              n = ["ArrowUp", Gt].includes(e.key);
          !n && !i || t && !i || (e.preventDefault(), t = this.matches(x) ? this : u.prev(this, x)[0] || u.next(this, x)[0] || u.findOne(x, e.delegateTarget.parentNode), i = C.getOrCreateInstance(t), n ? (e.stopPropagation(), i.show(), i._selectMenuItem(e)) : i._isShown() && (e.stopPropagation(), i.hide(), t.focus()))
      }
  }
  g.on(document, mt, x, C.dataApiKeydownHandler), g.on(document, mt, Zt, C.dataApiKeydownHandler), g.on(document, Ge, C.clearMenus), g.on(document, "keyup.bs.dropdown.data-api", C.clearMenus), g.on(document, Ge, x, function(e) {
      e.preventDefault(), C.getOrCreateInstance(this).toggle()
  }), e(C);
  const ri = "backdrop",
      oi = "mousedown.bs." + ri,
      li = {
          className: "modal-backdrop",
          clickCallback: null,
          isAnimated: !1,
          isVisible: !0,
          rootElement: "body"
      },
      ci = {
          className: "string",
          clickCallback: "(function|null)",
          isAnimated: "boolean",
          isVisible: "boolean",
          rootElement: "(element|string)"
      };
  class di extends ue {
      constructor(e) {
          super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null
      }
      static get Default() {
          return li
      }
      static get DefaultType() {
          return ci
      }
      static get NAME() {
          return ri
      }
      show(e) {
          var t;
          this._config.isVisible ? (this._append(), t = this._getElement(), this._config.isAnimated && q(t), t.classList.add("show"), this._emulateAnimation(() => {
              c(e)
          })) : c(e)
      }
      hide(e) {
          this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
              this.dispose(), c(e)
          })) : c(e)
      }
      dispose() {
          this._isAppended && (g.off(this._element, oi), this._element.remove(), this._isAppended = !1)
      }
      _getElement() {
          var e;
          return this._element || ((e = document.createElement("div")).className = this._config.className, this._config.isAnimated && e.classList.add("fade"), this._element = e), this._element
      }
      _configAfterMerge(e) {
          return e.rootElement = s(e.rootElement), e
      }
      _append() {
          var e;
          this._isAppended || (e = this._getElement(), this._config.rootElement.append(e), g.on(e, oi, () => {
              c(this._config.clickCallback)
          }), this._isAppended = !0)
      }
      _emulateAnimation(e) {
          U(e, this._getElement(), this._config.isAnimated)
      }
  }
  const ui = ".bs.focustrap",
      hi = (ui, ui, "backward"),
      pi = {
          autofocus: !0,
          trapElement: null
      },
      mi = {
          autofocus: "boolean",
          trapElement: "element"
      };
  class gi extends ue {
      constructor(e) {
          super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null
      }
      static get Default() {
          return pi
      }
      static get DefaultType() {
          return mi
      }
      static get NAME() {
          return "focustrap"
      }
      activate() {
          this._isActive || (this._config.autofocus && this._config.trapElement.focus(), g.off(document, ui), g.on(document, "focusin.bs.focustrap", e => this._handleFocusin(e)), g.on(document, "keydown.tab.bs.focustrap", e => this._handleKeydown(e)), this._isActive = !0)
      }
      deactivate() {
          this._isActive && (this._isActive = !1, g.off(document, ui))
      }
      _handleFocusin(e) {
          var t = this._config["trapElement"];
          e.target === document || e.target === t || t.contains(e.target) || (0 === (e = u.focusableChildren(t)).length ? t : this._lastTabNavDirection === hi ? e[e.length - 1] : e[0]).focus()
      }
      _handleKeydown(e) {
          "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? hi : "forward")
      }
  }
  const fi = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      bi = ".sticky-top",
      vi = "padding-right",
      yi = "margin-right";
  class wi {
      constructor() {
          this._element = document.body
      }
      getWidth() {
          var e = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - e)
      }
      hide() {
          const t = this.getWidth();
          this._disableOverFlow(), this._setElementAttributes(this._element, vi, e => e + t), this._setElementAttributes(fi, vi, e => e + t), this._setElementAttributes(bi, yi, e => e - t)
      }
      reset() {
          this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, vi), this._resetElementAttributes(fi, vi), this._resetElementAttributes(bi, yi)
      }
      isOverflowing() {
          return 0 < this.getWidth()
      }
      _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
      }
      _setElementAttributes(e, i, n) {
          const s = this.getWidth();
          this._applyManipulationCallback(e, e => {
              var t;
              e !== this._element && window.innerWidth > e.clientWidth + s || (this._saveInitialAttribute(e, i), t = window.getComputedStyle(e).getPropertyValue(i), e.style.setProperty(i, n(Number.parseFloat(t)) + "px"))
          })
      }
      _saveInitialAttribute(e, t) {
          var i = e.style.getPropertyValue(t);
          i && d.setDataAttribute(e, t, i)
      }
      _resetElementAttributes(e, i) {
          this._applyManipulationCallback(e, e => {
              var t = d.getDataAttribute(e, i);
              null === t ? e.style.removeProperty(i) : (d.removeDataAttribute(e, i), e.style.setProperty(i, t))
          })
      }
      _applyManipulationCallback(e, t) {
          if (a(e)) t(e);
          else
              for (const i of u.find(e, this._element)) t(i)
      }
  }
  const T = ".bs.modal";
  T, T;
  const _i = "hidden" + T,
      Ei = "show" + T;
  T, T, T, T, T;
  T;
  const xi = "modal-open",
      Ci = "modal-static";
  const Ti = {
          backdrop: !0,
          focus: !0,
          keyboard: !0
      },
      Si = {
          backdrop: "(boolean|string)",
          focus: "boolean",
          keyboard: "boolean"
      };
  class ki extends t {
      constructor(e, t) {
          super(e, t), this._dialog = u.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new wi, this._addEventListeners()
      }
      static get Default() {
          return Ti
      }
      static get DefaultType() {
          return Si
      }
      static get NAME() {
          return "modal"
      }
      toggle(e) {
          return this._isShown ? this.hide() : this.show(e)
      }
      show(e) {
          this._isShown || this._isTransitioning || g.trigger(this._element, Ei, {
              relatedTarget: e
          }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(xi), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)))
      }
      hide() {
          !this._isShown || this._isTransitioning || g.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove("show"), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))
      }
      dispose() {
          g.off(window, T), g.off(this._dialog, T), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
      }
      handleUpdate() {
          this._adjustDialog()
      }
      _initializeBackDrop() {
          return new di({
              isVisible: Boolean(this._config.backdrop),
              isAnimated: this._isAnimated()
          })
      }
      _initializeFocusTrap() {
          return new gi({
              trapElement: this._element
          })
      }
      _showElement(e) {
          document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
          var t = u.findOne(".modal-body", this._dialog);
          t && (t.scrollTop = 0), q(this._element), this._element.classList.add("show");
          this._queueCallback(() => {
              this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, g.trigger(this._element, "shown.bs.modal", {
                  relatedTarget: e
              })
          }, this._dialog, this._isAnimated())
      }
      _addEventListeners() {
          g.on(this._element, "keydown.dismiss.bs.modal", e => {
              "Escape" === e.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition())
          }), g.on(window, "resize.bs.modal", () => {
              this._isShown && !this._isTransitioning && this._adjustDialog()
          }), g.on(this._element, "mousedown.dismiss.bs.modal", t => {
              g.one(this._element, "click.dismiss.bs.modal", e => {
                  this._element === t.target && this._element === e.target && ("static" === this._config.backdrop ? this._triggerBackdropTransition() : this._config.backdrop && this.hide())
              })
          })
      }
      _hideModal() {
          this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
              document.body.classList.remove(xi), this._resetAdjustments(), this._scrollBar.reset(), g.trigger(this._element, _i)
          })
      }
      _isAnimated() {
          return this._element.classList.contains("fade")
      }
      _triggerBackdropTransition() {
          var e = g.trigger(this._element, "hidePrevented.bs.modal");
          if (!e.defaultPrevented) {
              e = this._element.scrollHeight > document.documentElement.clientHeight;
              const t = this._element.style.overflowY;
              "hidden" === t || this._element.classList.contains(Ci) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Ci), this._queueCallback(() => {
                  this._element.classList.remove(Ci), this._queueCallback(() => {
                      this._element.style.overflowY = t
                  }, this._dialog)
              }, this._dialog), this._element.focus())
          }
      }
      _adjustDialog() {
          var e, t = this._element.scrollHeight > document.documentElement.clientHeight,
              i = this._scrollBar.getWidth(),
              n = 0 < i;
          n && !t && (e = l() ? "paddingLeft" : "paddingRight", this._element.style[e] = i + "px"), !n && t && (e = l() ? "paddingRight" : "paddingLeft", this._element.style[e] = i + "px")
      }
      _resetAdjustments() {
          this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
      }
      static jQueryInterface(t, i) {
          return this.each(function() {
              var e = ki.getOrCreateInstance(this, t);
              if ("string" == typeof t) {
                  if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                  e[t](i)
              }
          })
      }
  }
  g.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', function(e) {
      const t = u.getElementFromSelector(this);
      ["A", "AREA"].includes(this.tagName) && e.preventDefault(), g.one(t, Ei, e => {
          e.defaultPrevented || g.one(t, _i, () => {
              r(this) && this.focus()
          })
      });
      e = u.findOne(".modal.show");
      e && ki.getInstance(e).hide(), ki.getOrCreateInstance(t).toggle(this)
  }), pe(ki), e(ki);
  Ue = ".bs.offcanvas";
  const Mi = "showing",
      Ai = ".offcanvas.show",
      Ni = "hidePrevented" + Ue,
      Oi = "hidden" + Ue;
  const Di = {
          backdrop: !0,
          keyboard: !0,
          scroll: !1
      },
      Ii = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          scroll: "boolean"
      };
  class L extends t {
      constructor(e, t) {
          super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
      }
      static get Default() {
          return Di
      }
      static get DefaultType() {
          return Ii
      }
      static get NAME() {
          return "offcanvas"
      }
      toggle(e) {
          return this._isShown ? this.hide() : this.show(e)
      }
      show(e) {
          this._isShown || g.trigger(this._element, "show.bs.offcanvas", {
              relatedTarget: e
          }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new wi).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Mi), this._queueCallback(() => {
              this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add("show"), this._element.classList.remove(Mi), g.trigger(this._element, "shown.bs.offcanvas", {
                  relatedTarget: e
              })
          }, this._element, !0))
      }
      hide() {
          this._isShown && !g.trigger(this._element, "hide.bs.offcanvas").defaultPrevented && (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add("hiding"), this._backdrop.hide(), this._queueCallback(() => {
              this._element.classList.remove("show", "hiding"), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new wi).reset(), g.trigger(this._element, Oi)
          }, this._element, !0))
      }
      dispose() {
          this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
      }
      _initializeBackDrop() {
          var e = Boolean(this._config.backdrop);
          return new di({
              className: "offcanvas-backdrop",
              isVisible: e,
              isAnimated: !0,
              rootElement: this._element.parentNode,
              clickCallback: e ? () => {
                  "static" === this._config.backdrop ? g.trigger(this._element, Ni) : this.hide()
              } : null
          })
      }
      _initializeFocusTrap() {
          return new gi({
              trapElement: this._element
          })
      }
      _addEventListeners() {
          g.on(this._element, "keydown.dismiss.bs.offcanvas", e => {
              "Escape" === e.key && (this._config.keyboard ? this.hide() : g.trigger(this._element, Ni))
          })
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = L.getOrCreateInstance(this, t);
              if ("string" == typeof t) {
                  if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                  e[t](this)
              }
          })
      }
  }
  g.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', function(e) {
      var t = u.getElementFromSelector(this);
      ["A", "AREA"].includes(this.tagName) && e.preventDefault(), o(this) || (g.one(t, Oi, () => {
          r(this) && this.focus()
      }), (e = u.findOne(Ai)) && e !== t && L.getInstance(e).hide(), L.getOrCreateInstance(t).toggle(this))
  }), g.on(window, "load.bs.offcanvas.data-api", () => {
      for (const e of u.find(Ai)) L.getOrCreateInstance(e).show()
  }), g.on(window, "resize.bs.offcanvas", () => {
      for (const e of u.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(e).position && L.getOrCreateInstance(e).hide()
  }), pe(L), e(L);
  const Li = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
      $i = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
      Pi = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  h = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
  };

  function ji(e, t, i) {
      if (!e.length) return e;
      if (i && "function" == typeof i) return i(e);
      i = (new window.DOMParser).parseFromString(e, "text/html");
      for (const r of [].concat(...i.body.querySelectorAll("*"))) {
          var n = r.nodeName.toLowerCase();
          if (Object.keys(t).includes(n)) {
              var s = [].concat(...r.attributes),
                  a = [].concat(t["*"] || [], t[n] || []);
              for (const o of s)((e, t) => {
                  const i = e.nodeName.toLowerCase();
                  return t.includes(i) ? !Li.has(i) || Boolean($i.test(e.nodeValue) || Pi.test(e.nodeValue)) : t.filter(e => e instanceof RegExp).some(e => e.test(i))
              })(o, a) || r.removeAttribute(o.nodeName)
          } else r.remove()
      }
      return i.body.innerHTML
  }
  const Ri = {
          allowList: h,
          content: {},
          extraClass: "",
          html: !1,
          sanitize: !0,
          sanitizeFn: null,
          template: "<div></div>"
      },
      zi = {
          allowList: "object",
          content: "object",
          extraClass: "(string|function)",
          html: "boolean",
          sanitize: "boolean",
          sanitizeFn: "(null|function)",
          template: "string"
      },
      Bi = {
          entry: "(string|element|function|null)",
          selector: "(string|element)"
      };
  class Fi extends ue {
      constructor(e) {
          super(), this._config = this._getConfig(e)
      }
      static get Default() {
          return Ri
      }
      static get DefaultType() {
          return zi
      }
      static get NAME() {
          return "TemplateFactory"
      }
      getContent() {
          return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean)
      }
      hasContent() {
          return 0 < this.getContent().length
      }
      changeContent(e) {
          return this._checkContent(e), this._config.content = { ...this._config.content,
              ...e
          }, this
      }
      toHtml() {
          var e, t, i = document.createElement("div");
          i.innerHTML = this._maybeSanitize(this._config.template);
          for ([e, t] of Object.entries(this._config.content)) this._setContent(i, t, e);
          var n = i.children[0],
              s = this._resolvePossibleFunction(this._config.extraClass);
          return s && n.classList.add(...s.split(" ")), n
      }
      _typeCheckConfig(e) {
          super._typeCheckConfig(e), this._checkContent(e.content)
      }
      _checkContent(e) {
          for (var [t, i] of Object.entries(e)) super._typeCheckConfig({
              selector: t,
              entry: i
          }, Bi)
      }
      _setContent(e, t, i) {
          i = u.findOne(i, e);
          i && ((t = this._resolvePossibleFunction(t)) ? a(t) ? this._putElementInTemplate(s(t), i) : this._config.html ? i.innerHTML = this._maybeSanitize(t) : i.textContent = t : i.remove())
      }
      _maybeSanitize(e) {
          return this._config.sanitize ? ji(e, this._config.allowList, this._config.sanitizeFn) : e
      }
      _resolvePossibleFunction(e) {
          return c(e, [this])
      }
      _putElementInTemplate(e, t) {
          this._config.html ? (t.innerHTML = "", t.append(e)) : t.textContent = e.textContent
      }
  }
  const Hi = new Set(["sanitize", "allowList", "sanitizeFn"]),
      qi = "fade";
  const Yi = "show",
      Wi = "hide.bs.modal",
      Ui = "hover",
      Vi = "focus",
      Xi = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: l() ? "left" : "right",
          BOTTOM: "bottom",
          LEFT: l() ? "right" : "left"
      },
      Gi = {
          allowList: h,
          animation: !0,
          boundary: "clippingParents",
          container: !1,
          customClass: "",
          delay: 0,
          fallbackPlacements: ["top", "right", "bottom", "left"],
          html: !1,
          offset: [0, 6],
          placement: "top",
          popperConfig: null,
          sanitize: !0,
          sanitizeFn: null,
          selector: !1,
          template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
          title: "",
          trigger: "hover focus"
      },
      Ki = {
          allowList: "object",
          animation: "boolean",
          boundary: "(string|element)",
          container: "(string|element|boolean)",
          customClass: "(string|function)",
          delay: "(number|object)",
          fallbackPlacements: "array",
          html: "boolean",
          offset: "(array|string|function)",
          placement: "(string|function)",
          popperConfig: "(null|object|function)",
          sanitize: "boolean",
          sanitizeFn: "(null|function)",
          selector: "(string|boolean)",
          template: "string",
          title: "(string|element|function)",
          trigger: "string"
      };
  class Zi extends t {
      constructor(e, t) {
          if (void 0 === Vt) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
          super(e, t), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
      }
      static get Default() {
          return Gi
      }
      static get DefaultType() {
          return Ki
      }
      static get NAME() {
          return "tooltip"
      }
      enable() {
          this._isEnabled = !0
      }
      disable() {
          this._isEnabled = !1
      }
      toggleEnabled() {
          this._isEnabled = !this._isEnabled
      }
      toggle() {
          this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
      }
      dispose() {
          clearTimeout(this._timeout), g.off(this._element.closest(".modal"), Wi, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
      }
      show() {
          if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
          if (this._isWithContent() && this._isEnabled) {
              var e = g.trigger(this._element, this.constructor.eventName("show")),
                  t = (F(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
              if (!e.defaultPrevented && t) {
                  this._disposePopper();
                  e = this._getTipElement(), t = (this._element.setAttribute("aria-describedby", e.getAttribute("id")), this._config)["container"];
                  if (this._element.ownerDocument.documentElement.contains(this.tip) || (t.append(e), g.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(e), e.classList.add(Yi), "ontouchstart" in document.documentElement)
                      for (const i of [].concat(...document.body.children)) g.on(i, "mouseover", H);
                  this._queueCallback(() => {
                      g.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
                  }, this.tip, this._isAnimated())
              }
          }
      }
      hide() {
          if (this._isShown()) {
              var e = g.trigger(this._element, this.constructor.eventName("hide"));
              if (!e.defaultPrevented) {
                  if (this._getTipElement().classList.remove(Yi), "ontouchstart" in document.documentElement)
                      for (const t of [].concat(...document.body.children)) g.off(t, "mouseover", H);
                  this._activeTrigger.click = !1, this._activeTrigger[Vi] = !1, this._activeTrigger[Ui] = !1, this._isHovered = null;
                  this._queueCallback(() => {
                      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), g.trigger(this._element, this.constructor.eventName("hidden")))
                  }, this.tip, this._isAnimated())
              }
          }
      }
      update() {
          this._popper && this._popper.update()
      }
      _isWithContent() {
          return Boolean(this._getTitle())
      }
      _getTipElement() {
          return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
      }
      _createTipElement(e) {
          e = this._getTemplateFactory(e).toHtml();
          if (!e) return null;
          e.classList.remove(qi, Yi), e.classList.add(`bs-${this.constructor.NAME}-auto`);
          var t = (e => {
              for (; e += Math.floor(1e6 * Math.random()), document.getElementById(e););
              return e
          })(this.constructor.NAME).toString();
          return e.setAttribute("id", t), this._isAnimated() && e.classList.add(qi), e
      }
      setContent(e) {
          this._newContent = e, this._isShown() && (this._disposePopper(), this.show())
      }
      _getTemplateFactory(e) {
          return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new Fi({ ...this._config,
              content: e,
              extraClass: this._resolvePossibleFunction(this._config.customClass)
          }), this._templateFactory
      }
      _getContentForTemplate() {
          return {
              ".tooltip-inner": this._getTitle()
          }
      }
      _getTitle() {
          return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
      }
      _initializeOnDelegatedTarget(e) {
          return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
      }
      _isAnimated() {
          return this._config.animation || this.tip && this.tip.classList.contains(qi)
      }
      _isShown() {
          return this.tip && this.tip.classList.contains(Yi)
      }
      _createPopper(e) {
          var t = c(this._config.placement, [this, e, this._element]),
              t = Xi[t.toUpperCase()];
          return Ut(this._element, e, this._getPopperConfig(t))
      }
      _getOffset() {
          const t = this._config["offset"];
          return "string" == typeof t ? t.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof t ? e => t(e, this._element) : t
      }
      _resolvePossibleFunction(e) {
          return c(e, [this._element])
      }
      _getPopperConfig(e) {
          e = {
              placement: e,
              modifiers: [{
                  name: "flip",
                  options: {
                      fallbackPlacements: this._config.fallbackPlacements
                  }
              }, {
                  name: "offset",
                  options: {
                      offset: this._getOffset()
                  }
              }, {
                  name: "preventOverflow",
                  options: {
                      boundary: this._config.boundary
                  }
              }, {
                  name: "arrow",
                  options: {
                      element: `.${this.constructor.NAME}-arrow`
                  }
              }, {
                  name: "preSetPlacement",
                  enabled: !0,
                  phase: "beforeMain",
                  fn: e => {
                      this._getTipElement().setAttribute("data-popper-placement", e.state.placement)
                  }
              }]
          };
          return { ...e,
              ...c(this._config.popperConfig, [e])
          }
      }
      _setListeners() {
          var e, t;
          for (const i of this._config.trigger.split(" ")) "click" === i ? g.on(this._element, this.constructor.eventName("click"), this._config.selector, e => {
              this._initializeOnDelegatedTarget(e).toggle()
          }) : "manual" !== i && (e = i === Ui ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"), t = i === Ui ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout"), g.on(this._element, e, this._config.selector, e => {
              var t = this._initializeOnDelegatedTarget(e);
              t._activeTrigger["focusin" === e.type ? Vi : Ui] = !0, t._enter()
          }), g.on(this._element, t, this._config.selector, e => {
              var t = this._initializeOnDelegatedTarget(e);
              t._activeTrigger["focusout" === e.type ? Vi : Ui] = t._element.contains(e.relatedTarget), t._leave()
          }));
          this._hideModalHandler = () => {
              this._element && this.hide()
          }, g.on(this._element.closest(".modal"), Wi, this._hideModalHandler)
      }
      _fixTitle() {
          var e = this._element.getAttribute("title");
          e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"))
      }
      _enter() {
          this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(() => {
              this._isHovered && this.show()
          }, this._config.delay.show))
      }
      _leave() {
          this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
              this._isHovered || this.hide()
          }, this._config.delay.hide))
      }
      _setTimeout(e, t) {
          clearTimeout(this._timeout), this._timeout = setTimeout(e, t)
      }
      _isWithActiveTrigger() {
          return Object.values(this._activeTrigger).includes(!0)
      }
      _getConfig(e) {
          var t = d.getDataAttributes(this._element);
          for (const i of Object.keys(t)) Hi.has(i) && delete t[i];
          return e = { ...t,
              ..."object" == typeof e && e ? e : {}
          }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
      }
      _configAfterMerge(e) {
          return e.container = !1 === e.container ? document.body : s(e.container), "number" == typeof e.delay && (e.delay = {
              show: e.delay,
              hide: e.delay
          }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), e
      }
      _getDelegateConfig() {
          var e, t, i = {};
          for ([e, t] of Object.entries(this._config)) this.constructor.Default[e] !== t && (i[e] = t);
          return i.selector = !1, i.trigger = "manual", i
      }
      _disposePopper() {
          this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = Zi.getOrCreateInstance(this, t);
              if ("string" == typeof t) {
                  if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                  e[t]()
              }
          })
      }
  }
  e(Zi);
  const Qi = { ...Zi.Default,
          content: "",
          offset: [0, 8],
          placement: "right",
          template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
          trigger: "click"
      },
      Ji = { ...Zi.DefaultType,
          content: "(null|string|element|function)"
      };
  class en extends Zi {
      static get Default() {
          return Qi
      }
      static get DefaultType() {
          return Ji
      }
      static get NAME() {
          return "popover"
      }
      _isWithContent() {
          return this._getTitle() || this._getContent()
      }
      _getContentForTemplate() {
          return {
              ".popover-header": this._getTitle(),
              ".popover-body": this._getContent()
          }
      }
      _getContent() {
          return this._resolvePossibleFunction(this._config.content)
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = en.getOrCreateInstance(this, t);
              if ("string" == typeof t) {
                  if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                  e[t]()
              }
          })
      }
  }
  e(en);
  Xe = ".bs.scrollspy";
  const tn = "click" + Xe;
  const nn = "active",
      sn = "[href]";
  const an = {
          offset: null,
          rootMargin: "0px 0px -25%",
          smoothScroll: !1,
          target: null,
          threshold: [.1, .5, 1]
      },
      rn = {
          offset: "(number|null)",
          rootMargin: "string",
          smoothScroll: "boolean",
          target: "element",
          threshold: "array"
      };
  class on extends t {
      constructor(e, t) {
          super(e, t), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
              visibleEntryTop: 0,
              parentScrollTop: 0
          }, this.refresh()
      }
      static get Default() {
          return an
      }
      static get DefaultType() {
          return rn
      }
      static get NAME() {
          return "scrollspy"
      }
      refresh() {
          this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
          for (const e of this._observableSections.values()) this._observer.observe(e)
      }
      dispose() {
          this._observer.disconnect(), super.dispose()
      }
      _configAfterMerge(e) {
          return e.target = s(e.target) || document.body, e.rootMargin = e.offset ? e.offset + "px 0px -30%" : e.rootMargin, "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))), e
      }
      _maybeEnableSmoothScroll() {
          this._config.smoothScroll && (g.off(this._config.target, tn), g.on(this._config.target, tn, sn, e => {
              var t = this._observableSections.get(e.target.hash);
              t && (e.preventDefault(), e = this._rootElement || window, t = t.offsetTop - this._element.offsetTop, e.scrollTo ? e.scrollTo({
                  top: t,
                  behavior: "smooth"
              }) : e.scrollTop = t)
          }))
      }
      _getNewObserver() {
          var e = {
              root: this._rootElement,
              threshold: this._config.threshold,
              rootMargin: this._config.rootMargin
          };
          return new IntersectionObserver(e => this._observerCallback(e), e)
      }
      _observerCallback(e) {
          const t = e => this._targetLinks.get("#" + e.target.id);
          var i = e => {
                  this._previousScrollData.visibleEntryTop = e.target.offsetTop, this._process(t(e))
              },
              n = (this._rootElement || document.documentElement).scrollTop,
              s = n >= this._previousScrollData.parentScrollTop;
          this._previousScrollData.parentScrollTop = n;
          for (const r of e)
              if (r.isIntersecting) {
                  var a = r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                  if (s && a) {
                      if (i(r), n) continue;
                      return
                  }
                  s || a || i(r)
              } else this._activeTarget = null, this._clearActiveClass(t(r))
      }
      _initializeTargetsAndObservables() {
          var e;
          this._targetLinks = new Map, this._observableSections = new Map;
          for (const t of u.find(sn, this._config.target)) t.hash && !o(t) && (e = u.findOne(t.hash, this._element), r(e)) && (this._targetLinks.set(t.hash, t), this._observableSections.set(t.hash, e))
      }
      _process(e) {
          this._activeTarget !== e && (this._clearActiveClass(this._config.target), (this._activeTarget = e).classList.add(nn), this._activateParents(e), g.trigger(this._element, "activate.bs.scrollspy", {
              relatedTarget: e
          }))
      }
      _activateParents(e) {
          if (e.classList.contains("dropdown-item")) u.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(nn);
          else
              for (const t of u.parents(e, ".nav, .list-group"))
                  for (const i of u.prev(t, ".nav-link, .nav-item > .nav-link, .list-group-item")) i.classList.add(nn)
      }
      _clearActiveClass(e) {
          e.classList.remove(nn);
          for (const t of u.find(sn + "." + nn, e)) t.classList.remove(nn)
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = on.getOrCreateInstance(this, t);
              if ("string" == typeof t) {
                  if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                  e[t]()
              }
          })
      }
  }
  g.on(window, "load.bs.scrollspy.data-api", () => {
      for (const e of u.find('[data-bs-spy="scroll"]')) on.getOrCreateInstance(e)
  }), e(on);
  const ln = "ArrowRight",
      cn = "ArrowDown",
      $ = "active",
      dn = "show";
  vt = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  const un = '.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ' + vt;
  $, $, $;
  class hn extends t {
      constructor(e) {
          super(e), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), g.on(this._element, "keydown.bs.tab", e => this._keydown(e)))
      }
      static get NAME() {
          return "tab"
      }
      show() {
          var e, t, i = this._element;
          this._elemIsActive(i) || (t = (e = this._getActiveElem()) ? g.trigger(e, "hide.bs.tab", {
              relatedTarget: i
          }) : null, g.trigger(i, "show.bs.tab", {
              relatedTarget: e
          }).defaultPrevented) || t && t.defaultPrevented || (this._deactivate(e, i), this._activate(i, e))
      }
      _activate(e, t) {
          e && (e.classList.add($), this._activate(u.getElementFromSelector(e)), this._queueCallback(() => {
              "tab" !== e.getAttribute("role") ? e.classList.add(dn) : (e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), g.trigger(e, "shown.bs.tab", {
                  relatedTarget: t
              }))
          }, e, e.classList.contains("fade")))
      }
      _deactivate(e, t) {
          e && (e.classList.remove($), e.blur(), this._deactivate(u.getElementFromSelector(e)), this._queueCallback(() => {
              "tab" !== e.getAttribute("role") ? e.classList.remove(dn) : (e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), g.trigger(e, "hidden.bs.tab", {
                  relatedTarget: t
              }))
          }, e, e.classList.contains("fade")))
      }
      _keydown(e) {
          var t;
          ["ArrowLeft", ln, "ArrowUp", cn].includes(e.key) && (e.stopPropagation(), e.preventDefault(), t = [ln, cn].includes(e.key), e = V(this._getChildren().filter(e => !o(e)), e.target, t, !0)) && (e.focus({
              preventScroll: !0
          }), hn.getOrCreateInstance(e).show())
      }
      _getChildren() {
          return u.find(un, this._parent)
      }
      _getActiveElem() {
          return this._getChildren().find(e => this._elemIsActive(e)) || null
      }
      _setInitialAttributes(e, t) {
          this._setAttributeIfNotExists(e, "role", "tablist");
          for (const i of t) this._setInitialAttributesOnChild(i)
      }
      _setInitialAttributesOnChild(e) {
          e = this._getInnerElement(e);
          var t = this._elemIsActive(e),
              i = this._getOuterElement(e);
          e.setAttribute("aria-selected", t), i !== e && this._setAttributeIfNotExists(i, "role", "presentation"), t || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e)
      }
      _setInitialAttributesOnTargetPanel(e) {
          var t = u.getElementFromSelector(e);
          t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id) && this._setAttributeIfNotExists(t, "aria-labelledby", "" + e.id)
      }
      _toggleDropDown(e, i) {
          const n = this._getOuterElement(e);
          n.classList.contains("dropdown") && ((e = (e, t) => {
              e = u.findOne(e, n);
              e && e.classList.toggle(t, i)
          })(".dropdown-toggle", $), e(".dropdown-menu", dn), n.setAttribute("aria-expanded", i))
      }
      _setAttributeIfNotExists(e, t, i) {
          e.hasAttribute(t) || e.setAttribute(t, i)
      }
      _elemIsActive(e) {
          return e.classList.contains($)
      }
      _getInnerElement(e) {
          return e.matches(un) ? e : u.findOne(un, e)
      }
      _getOuterElement(e) {
          return e.closest(".nav-item, .list-group-item") || e
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = hn.getOrCreateInstance(this);
              if ("string" == typeof t) {
                  if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                  e[t]()
              }
          })
      }
  }
  g.on(document, "click.bs.tab", vt, function(e) {
      ["A", "AREA"].includes(this.tagName) && e.preventDefault(), o(this) || hn.getOrCreateInstance(this).show()
  }), g.on(window, "load.bs.tab", () => {
      for (const e of u.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')) hn.getOrCreateInstance(e)
  }), e(hn);
  const pn = "show",
      mn = "showing",
      gn = {
          animation: "boolean",
          autohide: "boolean",
          delay: "number"
      },
      fn = {
          animation: !0,
          autohide: !0,
          delay: 5e3
      };
  class bn extends t {
      constructor(e, t) {
          super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
      }
      static get Default() {
          return fn
      }
      static get DefaultType() {
          return gn
      }
      static get NAME() {
          return "toast"
      }
      show() {
          g.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), q(this._element), this._element.classList.add(pn, mn), this._queueCallback(() => {
              this._element.classList.remove(mn), g.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
          }, this._element, this._config.animation))
      }
      hide() {
          this.isShown() && !g.trigger(this._element, "hide.bs.toast").defaultPrevented && (this._element.classList.add(mn), this._queueCallback(() => {
              this._element.classList.add("hide"), this._element.classList.remove(mn, pn), g.trigger(this._element, "hidden.bs.toast")
          }, this._element, this._config.animation))
      }
      dispose() {
          this._clearTimeout(), this.isShown() && this._element.classList.remove(pn), super.dispose()
      }
      isShown() {
          return this._element.classList.contains(pn)
      }
      _maybeScheduleHide() {
          !this._config.autohide || this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
              this.hide()
          }, this._config.delay))
      }
      _onInteraction(e, t) {
          switch (e.type) {
              case "mouseover":
              case "mouseout":
                  this._hasMouseInteraction = t;
                  break;
              case "focusin":
              case "focusout":
                  this._hasKeyboardInteraction = t
          }
          t ? this._clearTimeout() : (e = e.relatedTarget, this._element === e || this._element.contains(e) || this._maybeScheduleHide())
      }
      _setListeners() {
          g.on(this._element, "mouseover.bs.toast", e => this._onInteraction(e, !0)), g.on(this._element, "mouseout.bs.toast", e => this._onInteraction(e, !1)), g.on(this._element, "focusin.bs.toast", e => this._onInteraction(e, !0)), g.on(this._element, "focusout.bs.toast", e => this._onInteraction(e, !1))
      }
      _clearTimeout() {
          clearTimeout(this._timeout), this._timeout = null
      }
      static jQueryInterface(t) {
          return this.each(function() {
              var e = bn.getOrCreateInstance(this, t);
              if ("string" == typeof t) {
                  if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                  e[t](this)
              }
          })
      }
  }
  return pe(bn), e(bn), {
      Alert: me,
      Button: fe,
      Carousel: Ne,
      Collapse: Pe,
      Dropdown: C,
      Modal: ki,
      Offcanvas: L,
      Popover: en,
      ScrollSpy: on,
      Tab: hn,
      Toast: bn,
      Tooltip: Zi
  }
}),
function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ClipboardJS = t() : e.ClipboardJS = t()
}(this, function() {
  return i = {
      686: function(e, t, i) {
          "use strict";
          i.d(t, {
              default: function() {
                  return n
              }
          });
          var t = i(279),
              r = i.n(t),
              t = i(370),
              o = i.n(t),
              t = i(817),
              l = i.n(t);

          function c(e) {
              try {
                  document.execCommand(e)
              } catch (e) {}
          }

          function d(e) {
              return e = l()(e), c("cut"), e
          }

          function u(e) {
              var t, i, n, s = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {
                      container: document.body
                  },
                  a = "";
              return "string" == typeof e ? (t = e, i = "rtl" === document.documentElement.getAttribute("dir"), (n = document.createElement("textarea")).style.fontSize = "12pt", n.style.border = "0", n.style.padding = "0", n.style.margin = "0", n.style.position = "absolute", n.style[i ? "right" : "left"] = "-9999px", i = window.pageYOffset || document.documentElement.scrollTop, n.style.top = "".concat(i, "px"), n.setAttribute("readonly", ""), n.value = t, s.container.appendChild(n), a = l()(n), c("copy"), n.remove()) : (a = l()(e), c("copy")), a
          }

          function h(e) {
              return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              })(e)
          }

          function p(e) {
              return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              })(e)
          }

          function m(e, t) {
              for (var i = 0; i < t.length; i++) {
                  var n = t[i];
                  n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
              }
          }

          function g(e, t) {
              return (g = Object.setPrototypeOf || function(e, t) {
                  return e.__proto__ = t, e
              })(e, t)
          }

          function f(e) {
              return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
              })(e)
          }

          function b(e, t) {
              if (e = "data-clipboard-".concat(e), t.hasAttribute(e)) return t.getAttribute(e)
          }
          var n = function() {
              var e = a,
                  t = r();
              if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      writable: !0,
                      configurable: !0
                  }
              }), t && g(e, t);
              i = a, n = function() {
                  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                      return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                  } catch (e) {
                      return !1
                  }
              }();
              var i, n, s = function() {
                  var e = f(i),
                      t = n ? (t = f(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments),
                      e = this;
                  if (!t || "object" !== p(t) && "function" != typeof t) {
                      if (void 0 !== e) return e;
                      throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                  }
                  return t
              };

              function a(e, t) {
                  var i;
                  if (this instanceof a) return (i = s.call(this)).resolveOptions(t), i.listenClick(e), i;
                  throw new TypeError("Cannot call a class as a function")
              }
              return e = [{
                  key: "copy",
                  value: function(e) {
                      var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {
                          container: document.body
                      };
                      return u(e, t)
                  }
              }, {
                  key: "cut",
                  value: d
              }, {
                  key: "isSupported",
                  value: function() {
                      var e = "string" == typeof(e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"]) ? [e] : e,
                          t = !!document.queryCommandSupported;
                      return e.forEach(function(e) {
                          t = t && !!document.queryCommandSupported(e)
                      }), t
                  }
              }], m((t = a).prototype, [{
                  key: "resolveOptions",
                  value: function() {
                      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                      this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === p(e.container) ? e.container : document.body
                  }
              }, {
                  key: "listenClick",
                  value: function(e) {
                      var t = this;
                      this.listener = o()(e, "click", function(e) {
                          return t.onClick(e)
                      })
                  }
              }, {
                  key: "onClick",
                  value: function(e) {
                      var t = e.delegateTarget || e.currentTarget,
                          e = function() {
                              var e = void 0 === (i = (n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).action) ? "copy" : i,
                                  t = n.container,
                                  i = n.target,
                                  n = n.text;
                              if ("copy" !== e && "cut" !== e) throw new Error('Invalid "action" value, use either "copy" or "cut"');
                              if (void 0 !== i) {
                                  if (!i || "object" !== h(i) || 1 !== i.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                  if ("copy" === e && i.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                  if ("cut" === e && (i.hasAttribute("readonly") || i.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')
                              }
                              return n ? u(n, {
                                  container: t
                              }) : i ? "cut" === e ? d(i) : u(i, {
                                  container: t
                              }) : void 0
                          }({
                              action: this.action(t),
                              container: this.container,
                              target: this.target(t),
                              text: this.text(t)
                          });
                      this.emit(e ? "success" : "error", {
                          action: this.action,
                          text: e,
                          trigger: t,
                          clearSelection: function() {
                              t && t.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges()
                          }
                      })
                  }
              }, {
                  key: "defaultAction",
                  value: function(e) {
                      return b("action", e)
                  }
              }, {
                  key: "defaultTarget",
                  value: function(e) {
                      if (e = b("target", e)) return document.querySelector(e)
                  }
              }, {
                  key: "defaultText",
                  value: function(e) {
                      return b("text", e)
                  }
              }, {
                  key: "destroy",
                  value: function() {
                      this.listener.destroy()
                  }
              }]), m(t, e), a
          }()
      },
      828: function(e) {
          var t;
          "undefined" == typeof Element || Element.prototype.matches || ((t = Element.prototype).matches = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector), e.exports = function(e, t) {
              for (; e && 9 !== e.nodeType;) {
                  if ("function" == typeof e.matches && e.matches(t)) return e;
                  e = e.parentNode
              }
          }
      },
      438: function(e, t, i) {
          var r = i(828);

          function a(e, t, i, n, s) {
              var a = function(t, i, e, n) {
                  return function(e) {
                      e.delegateTarget = r(e.target, i), e.delegateTarget && n.call(t, e)
                  }
              }.apply(this, arguments);
              return e.addEventListener(i, a, s), {
                  destroy: function() {
                      e.removeEventListener(i, a, s)
                  }
              }
          }
          e.exports = function(e, t, i, n, s) {
              return "function" == typeof e.addEventListener ? a.apply(null, arguments) : "function" == typeof i ? a.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)), Array.prototype.map.call(e, function(e) {
                  return a(e, t, i, n, s)
              }))
          }
      },
      879: function(e, i) {
          i.node = function(e) {
              return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
          }, i.nodeList = function(e) {
              var t = Object.prototype.toString.call(e);
              return void 0 !== e && ("[object NodeList]" === t || "[object HTMLCollection]" === t) && "length" in e && (0 === e.length || i.node(e[0]))
          }, i.string = function(e) {
              return "string" == typeof e || e instanceof String
          }, i.fn = function(e) {
              return "[object Function]" === Object.prototype.toString.call(e)
          }
      },
      370: function(e, t, i) {
          var c = i(879),
              d = i(438);
          e.exports = function(e, t, i) {
              if (!e && !t && !i) throw new Error("Missing required arguments");
              if (!c.string(t)) throw new TypeError("Second argument must be a String");
              if (!c.fn(i)) throw new TypeError("Third argument must be a Function");
              if (c.node(e)) return (r = e).addEventListener(o = t, l = i), {
                  destroy: function() {
                      r.removeEventListener(o, l)
                  }
              };
              if (c.nodeList(e)) return n = e, s = t, a = i, Array.prototype.forEach.call(n, function(e) {
                  e.addEventListener(s, a)
              }), {
                  destroy: function() {
                      Array.prototype.forEach.call(n, function(e) {
                          e.removeEventListener(s, a)
                      })
                  }
              };
              if (c.string(e)) return d(document.body, e, t, i);
              throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
              var n, s, a, r, o, l
          }
      },
      817: function(e) {
          e.exports = function(e) {
              var t, i = "SELECT" === e.nodeName ? (e.focus(), e.value) : "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName ? ((t = e.hasAttribute("readonly")) || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), t || e.removeAttribute("readonly"), e.value) : (e.hasAttribute("contenteditable") && e.focus(), i = window.getSelection(), (t = document.createRange()).selectNodeContents(e), i.removeAllRanges(), i.addRange(t), i.toString());
              return i
          }
      },
      279: function(e) {
          function t() {}
          t.prototype = {
              on: function(e, t, i) {
                  var n = this.e || (this.e = {});
                  return (n[e] || (n[e] = [])).push({
                      fn: t,
                      ctx: i
                  }), this
              },
              once: function(e, t, i) {
                  var n = this;

                  function s() {
                      n.off(e, s), t.apply(i, arguments)
                  }
                  return s._ = t, this.on(e, s, i)
              },
              emit: function(e) {
                  for (var t = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, s = i.length; n < s; n++) i[n].fn.apply(i[n].ctx, t);
                  return this
              },
              off: function(e, t) {
                  var i = this.e || (this.e = {}),
                      n = i[e],
                      s = [];
                  if (n && t)
                      for (var a = 0, r = n.length; a < r; a++) n[a].fn !== t && n[a].fn._ !== t && s.push(n[a]);
                  return s.length ? i[e] = s : delete i[e], this
              }
          }, e.exports = t, e.exports.TinyEmitter = t
      }
  }, s = {}, n.n = function(e) {
      var t = e && e.__esModule ? function() {
          return e.default
      } : function() {
          return e
      };
      return n.d(t, {
          a: t
      }), t
  }, n.d = function(e, t) {
      for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, {
          enumerable: !0,
          get: t[i]
      })
  }, n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
  }, n(686).default;

  function n(e) {
      var t;
      return (s[e] || (t = s[e] = {
          exports: {}
      }, i[e](t, t.exports, n), t)).exports
  }
  var i, s
});
const $ = e => document.querySelector(e),
  countdown = function(t) {
      let e = $(t.target).getAttribute("data-date").split("-"),
          i = parseInt(e[0]),
          n = parseInt(e[1]),
          s = parseInt(e[2]),
          a = $(t.target).getAttribute("data-time"),
          r, o;
      null != a && (r = parseInt((a = a.split(":"))[0]), o = parseInt(a[1])), (new Date).getFullYear();
      var l = new Date;
      l.getDate(), l.getMonth(), l.getFullYear(), l.getHours(), l.getMinutes();
      let c = new Date(s, n - 1, i, r, o, 0, 0).getTime(),
          d = ($(t.target + " .day .word").innerHTML = t.dayWord, $(t.target + " .hour .word").innerHTML = t.hourWord, $(t.target + " .min .word").innerHTML = t.minWord, $(t.target + " .sec .word").innerHTML = t.secWord, () => {
              var e = (new Date).getTime(),
                  e = c - e;
              requestAnimationFrame(d), $(t.target + " .day .num").innerHTML = addZero(Math.floor(e / 864e5)), $(t.target + " .hour .num").innerHTML = addZero(Math.floor(e % 864e5 / 36e5)), $(t.target + " .min .num").innerHTML = addZero(Math.floor(e % 36e5 / 6e4)), $(t.target + " .sec .num").innerHTML = addZero(Math.floor(e % 6e4 / 1e3)), e < 0 && ($(".countdown").innerHTML = "")
          });
      d()
  },
  addZero = e => e < 10 && 0 <= e ? "0" + e : e;

function dselectUpdate(e, t, i) {
  let n = e.dataset.dselectValue,
      s = e.closest("." + t).previousElementSibling,
      a = s.nextElementSibling.getElementsByClassName(i)[0],
      r = s.nextElementSibling.querySelector("input");
  s.multiple ? Array.from(s.options).filter(e => e.value === n)[0].selected = !0 : s.value = n, s.multiple && a.click(), s.dispatchEvent(new Event("change")), a.focus(), r && (r.value = "")
}

function dselectRemoveTag(e, t, i) {
  let n = e.parentNode.dataset.dselectValue,
      s = e.closest("." + t).previousElementSibling,
      a = s.nextElementSibling.getElementsByClassName(i)[0],
      r = s.nextElementSibling.querySelector("input");
  Array.from(s.options).filter(e => e.value === n)[0].selected = !1, s.dispatchEvent(new Event("change")), a.click(), r && (r.value = "")
}

function dselectSearch(e, t, i, n, s) {
  var a, r = t.value.toLowerCase().trim(),
      o = t.nextElementSibling,
      l = o.querySelectorAll(".dropdown-header"),
      c = o.querySelectorAll(".dropdown-item"),
      d = o.nextElementSibling;
  for (a of (l.forEach(e => e.classList.add("d-none")), c))
      if (-1 < a.textContent.toLowerCase().indexOf(r)) {
          a.classList.remove("d-none");
          let e = a;
          for (; e = e.previousElementSibling;)
              if (e.classList.contains("dropdown-header")) {
                  e.classList.remove("d-none");
                  break
              }
      } else a.classList.add("d-none");
  Array.from(c).filter(e => !e.classList.contains("d-none") && !e.hasAttribute("hidden")).length < 1 ? (d.classList.remove("d-none"), o.classList.add("d-none"), s && (d.innerHTML = `Press Enter to add "<strong>${t.value}</strong>"`, "Enter" === e.key) && (c = (l = t.closest("." + i).previousElementSibling).nextElementSibling.getElementsByClassName(n)[0], l.insertAdjacentHTML("afterbegin", `<option value="${t.value}" selected>${t.value}</option>`), l.dispatchEvent(new Event("change")), t.value = "", t.dispatchEvent(new Event("keyup")), c.click(), c.focus())) : (d.classList.add("d-none"), o.classList.remove("d-none"))
}

function dselectClear(e, t) {
  e = e.closest("." + t).previousElementSibling;
  Array.from(e.options).forEach(e => e.selected = !1), e.dispatchEvent(new Event("change"))
}

function dselect(l, e = {}) {
  l.style.display = "none";
  let c = "dselect-wrapper",
      a = "dselect-placeholder",
      t = u("search") || e.search || !1,
      i = u("creatable") || e.creatable || !1,
      n = u("clearable") || e.clearable || !1,
      s = l.dataset.dselectMaxHeight || e.maxHeight || "360px",
      r = l.dataset.dselectSize || e.size || "",
      d = (b = "" !== (b = l.dataset.dselectPosition || "") ? b : "start", "form-select" + ("" !== r ? " form-select-" + r : "")),
      o = t ? `<input onkeydown="return event.key !== 'Enter'" onkeyup="dselectSearch(event, this, '${c}', '${d}', ${i})" type="text" class="form-control" placeholder="Search" autofocus>` : "";

  function u(e) {
      e = "data-dselect-" + e;
      return l.hasAttribute(e) ? "true" === l.getAttribute(e).toLowerCase() : null
  }

  function h(e) {
      return "" === e.getAttribute("value")
  }

  function p(e, t) {
      if (t) {
          var t = Array.from(e).filter(e => e.selected && !h(e)),
              i = Array.from(e).filter(e => h(e)),
              n = [];
          if (0 === t.length) {
              i = i.length ? i[0].textContent : "&nbsp;";
              n.push(`<span class="${a}">${i}</span>`)
          } else
              for (var s of t) n.push(`
          <div class="dselect-tag" data-dselect-value="${s.value}">
            ${s.text}
            <svg onclick="dselectRemoveTag(this, '${c}', '${d}')" class="dselect-tag-remove" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
          </div>
        `);
          return n.join("")
      }
      i = e[e.selectedIndex];
      return h(i) ? `<span class="${a}">${i.innerHTML}</span>` : i.innerHTML
  }

  function m(e) {
      e = e[e.selectedIndex];
      return h(e) ? "" : e.textContent
  }

  function g(e) {
      var t, i, n, s, a, r, o = [];
      for (t of e) "OPTGROUP" === t.tagName ? o.push(`<h6 class="dropdown-header">${t.getAttribute("label")}</h6>`) : (i = h(t) ? " hidden" : "", n = t.selected ? " active" : "", s = l.multiple && t.selected ? " disabled" : "", a = t.value, r = t.textContent, o.push(`<button${i} class="dropdown-item${n}" data-dselect-value="${a}" type="button" onclick="dselectUpdate(this, '${c}', '${d}')"${s}>${r}</button>`));
      return o.join("")
  }
  e = `
  <div class="dropdown ${c}">
    <button class="${d} ${Array.from(l.classList).filter(e => "form-select" !== e && "form-select-sm" !== e && "form-select-lg" !== e).join(" ")} ${!l.multiple && n ? "dselect-clearable" : ""}" data-dselect-text="${!l.multiple && m(l.options)}" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"${l.multiple ? ' data-bs-auto-close="outside"' : ""}>
      ${p(l.options, l.multiple)}
    </button>
    <div class="dropdown-menu animate slideIn dropdown-menu-${b}">
      <div class="d-flex flex-column">
        ${o}
        <div class="dselect-items" style="max-height:${s};overflow:auto">
          ${g(l.querySelectorAll("*"))}
        </div>
        <div class="dselect-no-results d-none">No results found</div>
      </div>
    </div>
    ${n && !l.multiple ? `
  <button type="button" class="btn dselect-clear" title="Clear selection" onclick="dselectClear(this, '${c}')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
      <path d="M13 1L0.999999 13" stroke-width="2" stroke="currentColor"></path>
      <path d="M1 1L13 13" stroke-width="2" stroke="currentColor"></path>
    </svg>
  </button>
  `: ""}
  </div> 
  `;
  l.nextElementSibling && l.nextElementSibling.classList && l.nextElementSibling.classList.contains(c) && l.nextElementSibling.remove(), l.insertAdjacentHTML("afterend", e), l.addEventListener("change", function() {
      var e = l.nextElementSibling,
          t = e.getElementsByClassName(d)[0],
          e = e.getElementsByClassName("dselect-items")[0];
      t.innerHTML = p(l.options, l.multiple), e.innerHTML = g(l.querySelectorAll("*")), l.multiple || (t.dataset.dselectText = m(l.options))
  })
}! function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).flatpickr = t()
}(this, function() {
  "use strict";
  var pe = function() {
      return (pe = Object.assign || function(e) {
          for (var t, i = 1, n = arguments.length; i < n; i++)
              for (var s in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
          return e
      }).apply(this, arguments)
  };

  function me() {
      for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
      for (var n = Array(e), s = 0, t = 0; t < i; t++)
          for (var a = arguments[t], r = 0, o = a.length; r < o; r++, s++) n[s] = a[r];
      return n
  }
  var ge = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"],
      fe = {
          _disable: [],
          allowInput: !1,
          allowInvalidPreload: !1,
          altFormat: "F j, Y",
          altInput: !1,
          altInputClass: "form-control input",
          animate: "object" == typeof window && -1 === window.navigator.userAgent.indexOf("MSIE"),
          ariaDateFormat: "F j, Y",
          autoFillDefaultTime: !0,
          clickOpens: !0,
          closeOnSelect: !0,
          conjunction: ", ",
          dateFormat: "Y-m-d",
          defaultHour: 12,
          defaultMinute: 0,
          defaultSeconds: 0,
          disable: [],
          disableMobile: !1,
          enableSeconds: !1,
          enableTime: !1,
          errorHandler: function(e) {
              return "undefined" != typeof console && console.warn(e)
          },
          getWeek: function(e) {
              var e = new Date(e.getTime()),
                  t = (e.setHours(0, 0, 0, 0), e.setDate(e.getDate() + 3 - (e.getDay() + 6) % 7), new Date(e.getFullYear(), 0, 4));
              return 1 + Math.round(((e.getTime() - t.getTime()) / 864e5 - 3 + (t.getDay() + 6) % 7) / 7)
          },
          hourIncrement: 1,
          ignoredFocusElements: [],
          inline: !1,
          locale: "default",
          minuteIncrement: 5,
          mode: "single",
          monthSelectorType: "dropdown",
          nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
          noCalendar: !1,
          now: new Date,
          onChange: [],
          onClose: [],
          onDayCreate: [],
          onDestroy: [],
          onKeyDown: [],
          onMonthChange: [],
          onOpen: [],
          onParseConfig: [],
          onReady: [],
          onValueUpdate: [],
          onYearChange: [],
          onPreCalendarPosition: [],
          plugins: [],
          position: "auto",
          positionElement: void 0,
          prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
          shorthandCurrentMonth: !1,
          showMonths: 1,
          static: !1,
          time_24hr: !1,
          weekNumbers: !1,
          wrap: !1
      },
      be = {
          weekdays: {
              shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          },
          months: {
              shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
          },
          daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          firstDayOfWeek: 0,
          ordinal: function(e) {
              e %= 100;
              if (3 < e && e < 21) return "th";
              switch (e % 10) {
                  case 1:
                      return "st";
                  case 2:
                      return "nd";
                  case 3:
                      return "rd";
                  default:
                      return "th"
              }
          },
          rangeSeparator: " to ",
          weekAbbreviation: "Wk",
          scrollTitle: "Scroll to increment",
          toggleTitle: "Click to toggle",
          amPM: ["AM", "PM"],
          yearAriaLabel: "Year",
          monthAriaLabel: "Month",
          hourAriaLabel: "Hour",
          minuteAriaLabel: "Minute",
          time_24hr: !1
      },
      ve = function(e, t) {
          return ("000" + e).slice(-1 * (t = void 0 === t ? 2 : t))
      },
      ye = function(e) {
          return !0 === e ? 1 : 0
      };

  function we(i, n) {
      var s;
      return function() {
          var e = this,
              t = arguments;
          clearTimeout(s), s = setTimeout(function() {
              return i.apply(e, t)
          }, n)
      }
  }
  var _e = function(e) {
      return e instanceof Array ? e : [e]
  };

  function Ee(e, t, i) {
      if (!0 === i) return e.classList.add(t);
      e.classList.remove(t)
  }

  function xe(e, t, i) {
      e = window.document.createElement(e);
      return i = i || "", e.className = t = t || "", void 0 !== i && (e.textContent = i), e
  }

  function Ce(e) {
      for (; e.firstChild;) e.removeChild(e.firstChild)
  }

  function Te(e, t) {
      var i = xe("div", "numInputWrapper"),
          n = xe("input", "numInput " + e),
          e = xe("span", "arrowUp"),
          s = xe("span", "arrowDown");
      if (-1 === navigator.userAgent.indexOf("MSIE 9.0") ? n.type = "number" : (n.type = "text", n.pattern = "\\d*"), void 0 !== t)
          for (var a in t) n.setAttribute(a, t[a]);
      return i.appendChild(n), i.appendChild(e), i.appendChild(s), i
  }

  function Se(t) {
      try {
          return "function" == typeof t.composedPath ? t.composedPath()[0] : t.target
      } catch (e) {
          return t.target
      }
  }

  function e() {}
  var ke = function(e, t, i) {
          return i.months[t ? "shorthand" : "longhand"][e]
      },
      b = {
          D: e,
          F: function(e, t, i) {
              e.setMonth(i.months.longhand.indexOf(t))
          },
          G: function(e, t) {
              e.setHours((12 <= e.getHours() ? 12 : 0) + parseFloat(t))
          },
          H: function(e, t) {
              e.setHours(parseFloat(t))
          },
          J: function(e, t) {
              e.setDate(parseFloat(t))
          },
          K: function(e, t, i) {
              e.setHours(e.getHours() % 12 + 12 * ye(new RegExp(i.amPM[1], "i").test(t)))
          },
          M: function(e, t, i) {
              e.setMonth(i.months.shorthand.indexOf(t))
          },
          S: function(e, t) {
              e.setSeconds(parseFloat(t))
          },
          U: function(e, t) {
              return new Date(1e3 * parseFloat(t))
          },
          W: function(e, t, i) {
              t = parseInt(t), e = new Date(e.getFullYear(), 0, 2 + 7 * (t - 1), 0, 0, 0, 0);
              return e.setDate(e.getDate() - e.getDay() + i.firstDayOfWeek), e
          },
          Y: function(e, t) {
              e.setFullYear(parseFloat(t))
          },
          Z: function(e, t) {
              return new Date(t)
          },
          d: function(e, t) {
              e.setDate(parseFloat(t))
          },
          h: function(e, t) {
              e.setHours((12 <= e.getHours() ? 12 : 0) + parseFloat(t))
          },
          i: function(e, t) {
              e.setMinutes(parseFloat(t))
          },
          j: function(e, t) {
              e.setDate(parseFloat(t))
          },
          l: e,
          m: function(e, t) {
              e.setMonth(parseFloat(t) - 1)
          },
          n: function(e, t) {
              e.setMonth(parseFloat(t) - 1)
          },
          s: function(e, t) {
              e.setSeconds(parseFloat(t))
          },
          u: function(e, t) {
              return new Date(parseFloat(t))
          },
          w: e,
          y: function(e, t) {
              e.setFullYear(2e3 + parseFloat(t))
          }
      },
      Me = {
          D: "",
          F: "",
          G: "(\\d\\d|\\d)",
          H: "(\\d\\d|\\d)",
          J: "(\\d\\d|\\d)\\w+",
          K: "",
          M: "",
          S: "(\\d\\d|\\d)",
          U: "(.+)",
          W: "(\\d\\d|\\d)",
          Y: "(\\d{4})",
          Z: "(.+)",
          d: "(\\d\\d|\\d)",
          h: "(\\d\\d|\\d)",
          i: "(\\d\\d|\\d)",
          j: "(\\d\\d|\\d)",
          l: "",
          m: "(\\d\\d|\\d)",
          n: "(\\d\\d|\\d)",
          s: "(\\d\\d|\\d)",
          u: "(.+)",
          w: "(\\d\\d|\\d)",
          y: "(\\d{2})"
      },
      o = {
          Z: function(e) {
              return e.toISOString()
          },
          D: function(e, t, i) {
              return t.weekdays.shorthand[o.w(e, t, i)]
          },
          F: function(e, t, i) {
              return ke(o.n(e, t, i) - 1, !1, t)
          },
          G: function(e, t, i) {
              return ve(o.h(e, t, i))
          },
          H: function(e) {
              return ve(e.getHours())
          },
          J: function(e, t) {
              return void 0 !== t.ordinal ? e.getDate() + t.ordinal(e.getDate()) : e.getDate()
          },
          K: function(e, t) {
              return t.amPM[ye(11 < e.getHours())]
          },
          M: function(e, t) {
              return ke(e.getMonth(), !0, t)
          },
          S: function(e) {
              return ve(e.getSeconds())
          },
          U: function(e) {
              return e.getTime() / 1e3
          },
          W: function(e, t, i) {
              return i.getWeek(e)
          },
          Y: function(e) {
              return ve(e.getFullYear(), 4)
          },
          d: function(e) {
              return ve(e.getDate())
          },
          h: function(e) {
              return e.getHours() % 12 ? e.getHours() % 12 : 12
          },
          i: function(e) {
              return ve(e.getMinutes())
          },
          j: function(e) {
              return e.getDate()
          },
          l: function(e, t) {
              return t.weekdays.longhand[e.getDay()]
          },
          m: function(e) {
              return ve(e.getMonth() + 1)
          },
          n: function(e) {
              return e.getMonth() + 1
          },
          s: function(e) {
              return e.getSeconds()
          },
          u: function(e) {
              return e.getTime()
          },
          w: function(e) {
              return e.getDay()
          },
          y: function(e) {
              return String(e.getFullYear()).substring(2)
          }
      },
      Ae = function(e) {
          var t = e.config,
              a = void 0 === t ? fe : t,
              t = e.l10n,
              i = void 0 === t ? be : t,
              t = e.isMobile,
              r = void 0 !== t && t;
          return function(n, e, t) {
              var s = t || i;
              return void 0 === a.formatDate || r ? e.split("").map(function(e, t, i) {
                  return o[e] && "\\" !== i[t - 1] ? o[e](n, s, a) : "\\" !== e ? e : ""
              }).join("") : a.formatDate(n, e, s)
          }
      },
      Ne = function(e) {
          var t = e.config,
              g = void 0 === t ? fe : t,
              t = e.l10n,
              f = void 0 === t ? be : t;
          return function(e, t, i, n) {
              if (0 === e || e) {
                  var s, a = n || f,
                      n = e;
                  if (e instanceof Date) s = new Date(e.getTime());
                  else if ("string" != typeof e && void 0 !== e.toFixed) s = new Date(e);
                  else if ("string" == typeof e) {
                      var r = t || (g || fe).dateFormat,
                          t = String(e).trim();
                      if ("today" === t) s = new Date, i = !0;
                      else if (g && g.parseDate) s = g.parseDate(e, r);
                      else if (/Z$/.test(t) || /GMT$/.test(t)) s = new Date(e);
                      else {
                          for (var o = void 0, l = [], c = 0, d = 0, u = ""; c < r.length; c++) {
                              var h = r[c],
                                  p = "\\" === h,
                                  m = "\\" === r[c - 1] || p;
                              Me[h] && !m ? (u += Me[h], (m = new RegExp(u).exec(e)) && (o = !0, l["Y" !== h ? "push" : "unshift"]({
                                  fn: b[h],
                                  val: m[++d]
                              }))) : p || (u += ".")
                          }
                          s = g && g.noCalendar ? new Date((new Date).setHours(0, 0, 0, 0)) : new Date((new Date).getFullYear(), 0, 1, 0, 0, 0, 0), l.forEach(function(e) {
                              var t = e.fn,
                                  e = e.val;
                              return s = t(s, e, a) || s
                          }), s = o ? s : void 0
                      }
                  }
                  if (s instanceof Date && !isNaN(s.getTime())) return !0 === i && s.setHours(0, 0, 0, 0), s;
                  g.errorHandler(new Error("Invalid date provided: " + n))
              }
          }
      };

  function Oe(e, t, i) {
      return !1 !== (i = void 0 === i ? !0 : i) ? new Date(e.getTime()).setHours(0, 0, 0, 0) - new Date(t.getTime()).setHours(0, 0, 0, 0) : e.getTime() - t.getTime()
  }
  var De = function(e, t, i) {
          return 3600 * e + 60 * t + i
      },
      Ie = 864e5;

  function Le(e) {
      var t, i, n, s = e.defaultHour,
          a = e.defaultMinute,
          r = e.defaultSeconds;
      return void 0 !== e.minDate && (i = e.minDate.getHours(), n = e.minDate.getMinutes(), t = e.minDate.getSeconds(), (s = s < i ? i : s) === i && a < n && (a = n), s === i) && a === n && r < t && (r = e.minDate.getSeconds()), void 0 !== e.maxDate && (i = e.maxDate.getHours(), n = e.maxDate.getMinutes(), (s = Math.min(s, i)) === i && (a = Math.min(n, a)), s === i) && a === n && (r = e.maxDate.getSeconds()), {
          hours: s,
          minutes: a,
          seconds: r
      }
  }

  function r(c, P) {
      var g = {
          config: pe(pe({}, fe), $e.defaultConfig),
          l10n: be
      };

      function j() {
          var e;
          return (null == (e = g.calendarContainer) ? void 0 : e.getRootNode()).activeElement || document.activeElement
      }

      function R(e) {
          return e.bind(g)
      }

      function z() {
          var t = g.config;
          !1 === t.weekNumbers && 1 === t.showMonths || !0 !== t.noCalendar && window.requestAnimationFrame(function() {
              var e;
              void 0 !== g.calendarContainer && (g.calendarContainer.style.visibility = "hidden", g.calendarContainer.style.display = "block"), void 0 !== g.daysContainer && (e = (g.days.offsetWidth + 1) * t.showMonths, g.daysContainer.style.width = e + "px", g.calendarContainer.style.width = e + (void 0 !== g.weekWrapper ? g.weekWrapper.offsetWidth : 0) + "px", g.calendarContainer.style.removeProperty("visibility"), g.calendarContainer.style.removeProperty("display"))
          })
      }

      function d(e) {
          0 === g.selectedDates.length && (n = void 0 === g.config.minDate || 0 <= Oe(new Date, g.config.minDate) ? new Date : new Date(g.config.minDate.getTime()), t = Le(g.config), n.setHours(t.hours, t.minutes, t.seconds, n.getMilliseconds()), g.selectedDates = [n], g.latestSelectedDateObj = n), void 0 !== e && "blur" !== e.type && ((t = e).preventDefault(), n = "keydown" === t.type, e = Se(t), s = e, void 0 !== g.amPM && e === g.amPM && (g.amPM.textContent = g.l10n.amPM[ye(g.amPM.textContent === g.l10n.amPM[0])]), e = parseFloat(s.getAttribute("min")), o = parseFloat(s.getAttribute("max")), a = parseFloat(s.getAttribute("step")), r = parseInt(s.value, 10), n = r + a * (t.delta || (n ? 38 === t.which ? 1 : -1 : 0)), void 0 !== s.value) && 2 === s.value.length && (t = s === g.hourElement, i = s === g.minuteElement, n < e ? (n = o + n + ye(!t) + (ye(t) && ye(!g.amPM)), i && h(void 0, -1, g.hourElement)) : o < n && (n = s === g.hourElement ? n - o - ye(!g.amPM) : e, i) && h(void 0, 1, g.hourElement), g.amPM && t && (1 === a ? n + r === 23 : Math.abs(n - r) > a) && (g.amPM.textContent = g.l10n.amPM[ye(g.amPM.textContent === g.l10n.amPM[0])]), s.value = ve(n));
          var t, i, n, s, a, r, o = g._input.value;
          u(), S(), g._input.value !== o && g._debouncedChange()
      }

      function u() {
          var e, t, i, n, s, a, r, o;
          void 0 !== g.hourElement && void 0 !== g.minuteElement && (i = (parseInt(g.hourElement.value.slice(-2), 10) || 0) % 24, n = (parseInt(g.minuteElement.value, 10) || 0) % 60, s = void 0 !== g.secondElement ? (parseInt(g.secondElement.value, 10) || 0) % 60 : 0, void 0 !== g.amPM && (e = i, t = g.amPM.textContent, i = e % 12 + 12 * ye(t === g.l10n.amPM[1])), e = void 0 !== g.config.minTime || g.config.minDate && g.minDateHasTime && g.latestSelectedDateObj && 0 === Oe(g.latestSelectedDateObj, g.config.minDate, !0), t = void 0 !== g.config.maxTime || g.config.maxDate && g.maxDateHasTime && g.latestSelectedDateObj && 0 === Oe(g.latestSelectedDateObj, g.config.maxDate, !0), void 0 !== g.config.maxTime && void 0 !== g.config.minTime && g.config.minTime > g.config.maxTime ? (r = De(g.config.minTime.getHours(), g.config.minTime.getMinutes(), g.config.minTime.getSeconds()), De(g.config.maxTime.getHours(), g.config.maxTime.getMinutes(), g.config.maxTime.getSeconds()) < (a = De(i, n, s)) && a < r && (a = r, i = (a = [r = Math.floor(a / 3600), o = (a - 3600 * r) / 60, a - 3600 * r - 60 * o])[0], n = a[1], s = a[2])) : (t && (r = void 0 !== g.config.maxTime ? g.config.maxTime : g.config.maxDate, (n = (i = Math.min(i, r.getHours())) === r.getHours() ? Math.min(n, r.getMinutes()) : n) === r.getMinutes()) && (s = Math.min(s, r.getSeconds())), e && (o = void 0 !== g.config.minTime ? g.config.minTime : g.config.minDate, (n = (i = Math.max(i, o.getHours())) === o.getHours() && n < o.getMinutes() ? o.getMinutes() : n) === o.getMinutes()) && (s = Math.max(s, o.getSeconds()))), l(i, n, s))
      }

      function n(e) {
          e = e || g.latestSelectedDateObj;
          e && e instanceof Date && l(e.getHours(), e.getMinutes(), e.getSeconds())
      }

      function l(e, t, i) {
          void 0 !== g.latestSelectedDateObj && g.latestSelectedDateObj.setHours(e % 24, t, i || 0, 0), g.hourElement && g.minuteElement && !g.isMobile && (g.hourElement.value = ve(g.config.time_24hr ? e : (12 + e) % 12 + 12 * ye(e % 12 == 0)), g.minuteElement.value = ve(t), void 0 !== g.amPM && (g.amPM.textContent = g.l10n.amPM[ye(12 <= e)]), void 0 !== g.secondElement) && (g.secondElement.value = ve(i))
      }

      function B(e) {
          var t = Se(e),
              t = parseInt(t.value) + (e.delta || 0);
          (1 < t / 1e3 || "Enter" === e.key && !/[^\d]/.test(t.toString())) && y(t)
      }

      function o(t, i, n, s) {
          return i instanceof Array ? i.forEach(function(e) {
              return o(t, e, n, s)
          }) : t instanceof Array ? t.forEach(function(e) {
              return o(e, i, n, s)
          }) : (t.addEventListener(i, n, s), void g._handlers.push({
              remove: function() {
                  return t.removeEventListener(i, n, s)
              }
          }))
      }

      function F() {
          C("onChange")
      }

      function s(e, t) {
          var i = void 0 !== e ? g.parseDate(e) : g.latestSelectedDateObj || (g.config.minDate && g.config.minDate > g.now ? g.config.minDate : g.config.maxDate && g.config.maxDate < g.now ? g.config.maxDate : g.now),
              n = g.currentYear,
              s = g.currentMonth;
          try {
              void 0 !== i && (g.currentYear = i.getFullYear(), g.currentMonth = i.getMonth())
          } catch (e) {
              e.message = "Invalid date supplied: " + i, g.config.errorHandler(e)
          }
          t && g.currentYear !== n && (C("onYearChange"), m()), !t || g.currentYear === n && g.currentMonth === s || C("onMonthChange"), g.redraw()
      }

      function H(e) {
          var t = Se(e);
          ~t.className.indexOf("arrow") && h(e, t.classList.contains("arrowUp") ? 1 : -1)
      }

      function h(e, t, i) {
          e = e && Se(e), i = i || e && e.parentNode && e.parentNode.firstChild, e = oe("increment");
          e.delta = t, i && i.dispatchEvent(e)
      }

      function p(e, t, i, n) {
          var s = w(t, !0),
              a = xe("span", e, t.getDate().toString());
          return a.dateObj = t, a.$i = n, a.setAttribute("aria-label", g.formatDate(t, g.config.ariaDateFormat)), -1 === e.indexOf("hidden") && 0 === Oe(t, g.now) && ((g.todayDateElem = a).classList.add("today"), a.setAttribute("aria-current", "date")), s ? (a.tabIndex = -1, le(t) && (a.classList.add("selected"), g.selectedDateElem = a, "range" === g.config.mode) && (Ee(a, "startRange", g.selectedDates[0] && 0 === Oe(t, g.selectedDates[0], !0)), Ee(a, "endRange", g.selectedDates[1] && 0 === Oe(t, g.selectedDates[1], !0)), "nextMonthDay" === e) && a.classList.add("inRange")) : a.classList.add("flatpickr-disabled"), "range" === g.config.mode && (s = t, !("range" !== g.config.mode || g.selectedDates.length < 2)) && 0 <= Oe(s, g.selectedDates[0]) && Oe(s, g.selectedDates[1]) <= 0 && !le(t) && a.classList.add("inRange"), g.weekNumbers && 1 === g.config.showMonths && "prevMonthDay" !== e && n % 7 == 6 && g.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + g.config.getWeek(t) + "</span>"), C("onDayCreate", a), a
      }

      function q(e) {
          e.focus(), "range" === g.config.mode && r(e)
      }

      function f(e) {
          for (var t = 0 < e ? 0 : g.config.showMonths - 1, i = 0 < e ? g.config.showMonths : -1, n = t; n != i; n += e)
              for (var s = g.daysContainer.children[n], a = 0 < e ? 0 : s.children.length - 1, r = 0 < e ? s.children.length : -1, o = a; o != r; o += e) {
                  var l = s.children[o];
                  if (-1 === l.className.indexOf("hidden") && w(l.dateObj)) return l
              }
      }

      function b(e, t) {
          var i = j(),
              n = _(i || document.body),
              e = void 0 !== e ? e : n ? i : void 0 !== g.selectedDateElem && _(g.selectedDateElem) ? g.selectedDateElem : void 0 !== g.todayDateElem && _(g.todayDateElem) ? g.todayDateElem : f(0 < t ? 1 : -1);
          if (void 0 === e) g._input.focus();
          else if (n) {
              for (var s = e, a = t, r = -1 === s.className.indexOf("Month") ? s.dateObj.getMonth() : g.currentMonth, o = 0 < a ? g.config.showMonths : -1, l = 0 < a ? 1 : -1, c = r - g.currentMonth; c != o; c += l)
                  for (var d = g.daysContainer.children[c], u = r - g.currentMonth === c ? s.$i + a : a < 0 ? d.children.length - 1 : 0, h = d.children.length, p = u; 0 <= p && p < h && p != (0 < a ? h : -1); p += l) {
                      var m = d.children[p];
                      if (-1 === m.className.indexOf("hidden") && w(m.dateObj) && Math.abs(s.$i - p) >= Math.abs(a)) return void q(m)
                  }
              g.changeMonth(l), b(f(l), 0)
          } else q(e)
      }

      function a() {
          if (void 0 !== g.daysContainer) {
              Ce(g.daysContainer), g.weekNumbers && Ce(g.weekNumbers);
              for (var e = document.createDocumentFragment(), t = 0; t < g.config.showMonths; t++) {
                  var i = new Date(g.currentYear, g.currentMonth, 1);
                  i.setMonth(g.currentMonth + t), e.appendChild(function(e, t) {
                      for (var i = (new Date(e, t, 1).getDay() - g.l10n.firstDayOfWeek + 7) % 7, n = g.utils.getDaysInMonth((t - 1 + 12) % 12, e), s = g.utils.getDaysInMonth(t, e), a = window.document.createDocumentFragment(), r = 1 < g.config.showMonths, o = r ? "prevMonthDay hidden" : "prevMonthDay", l = r ? "nextMonthDay hidden" : "nextMonthDay", c = n + 1 - i, d = 0; c <= n; c++, d++) a.appendChild(p("flatpickr-day " + o, new Date(e, t - 1, c), 0, d));
                      for (c = 1; c <= s; c++, d++) a.appendChild(p("flatpickr-day", new Date(e, t, c), 0, d));
                      for (var u = s + 1; u <= 42 - i && (1 === g.config.showMonths || d % 7 != 0); u++, d++) a.appendChild(p("flatpickr-day " + l, new Date(e, t + 1, u % s), 0, d));
                      return (r = xe("div", "dayContainer")).appendChild(a), r
                  }(i.getFullYear(), i.getMonth()))
              }
              g.daysContainer.appendChild(e), g.days = g.daysContainer.firstChild, "range" === g.config.mode && 1 === g.selectedDates.length && r()
          }
      }

      function m() {
          if (!(1 < g.config.showMonths || "dropdown" !== g.config.monthSelectorType)) {
              g.monthsDropdownContainer.tabIndex = -1, g.monthsDropdownContainer.innerHTML = "";
              for (var e = 0; e < 12; e++) t = e, void 0 !== g.config.minDate && g.currentYear === g.config.minDate.getFullYear() && t < g.config.minDate.getMonth() || void 0 !== g.config.maxDate && g.currentYear === g.config.maxDate.getFullYear() && t > g.config.maxDate.getMonth() || ((t = xe("option", "flatpickr-monthDropdown-month")).value = new Date(g.currentYear, e).getMonth().toString(), t.textContent = ke(e, g.config.shorthandCurrentMonth, g.l10n), t.tabIndex = -1, g.currentMonth === e && (t.selected = !0), g.monthsDropdownContainer.appendChild(t))
          }
          var t
      }

      function Y() {
          Ce(g.monthNav), g.monthNav.appendChild(g.prevMonthNav), g.config.showMonths && (g.yearElements = [], g.monthElements = []);
          for (var e, t, i, n, s, a = g.config.showMonths; a--;) {
              s = n = r = i = t = e = void 0, e = xe("div", "flatpickr-month"), t = window.document.createDocumentFragment(), i = 1 < g.config.showMonths || "static" === g.config.monthSelectorType ? xe("span", "cur-month") : (g.monthsDropdownContainer = xe("select", "flatpickr-monthDropdown-months"), g.monthsDropdownContainer.setAttribute("aria-label", g.l10n.monthAriaLabel), o(g.monthsDropdownContainer, "change", function(e) {
                  e = Se(e), e = parseInt(e.value, 10);
                  g.changeMonth(e - g.currentMonth), C("onMonthChange")
              }), m(), g.monthsDropdownContainer), r = Te("cur-year", {
                  tabindex: "-1"
              }), (n = r.getElementsByTagName("input")[0]).setAttribute("aria-label", g.l10n.yearAriaLabel), g.config.minDate && n.setAttribute("min", g.config.minDate.getFullYear().toString()), g.config.maxDate && (n.setAttribute("max", g.config.maxDate.getFullYear().toString()), n.disabled = !!g.config.minDate && g.config.minDate.getFullYear() === g.config.maxDate.getFullYear()), (s = xe("div", "flatpickr-current-month")).appendChild(i), s.appendChild(r), t.appendChild(s), e.appendChild(t);
              var r = {
                  container: e,
                  yearElement: n,
                  monthElement: i
              };
              g.yearElements.push(r.yearElement), g.monthElements.push(r.monthElement), g.monthNav.appendChild(r.container)
          }
          g.monthNav.appendChild(g.nextMonthNav)
      }

      function W() {
          g.weekdayContainer ? Ce(g.weekdayContainer) : g.weekdayContainer = xe("div", "flatpickr-weekdays");
          for (var e = g.config.showMonths; e--;) {
              var t = xe("div", "flatpickr-weekdaycontainer");
              g.weekdayContainer.appendChild(t)
          }
          return U(), g.weekdayContainer
      }

      function U() {
          if (g.weekdayContainer) {
              var e = g.l10n.firstDayOfWeek,
                  t = me(g.l10n.weekdays.shorthand);
              0 < e && e < t.length && (t = me(t.splice(e, t.length), t.splice(0, e)));
              for (var i = g.config.showMonths; i--;) g.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + t.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      "
          }
      }

      function V(e, t) {
          t = (t = void 0 === t ? !0 : t) ? e : e - g.currentMonth;
          t < 0 && !0 === g._hidePrevMonthArrow || 0 < t && !0 === g._hideNextMonthArrow || (g.currentMonth += t, (g.currentMonth < 0 || 11 < g.currentMonth) && (g.currentYear += 11 < g.currentMonth ? 1 : -1, g.currentMonth = (g.currentMonth + 12) % 12, C("onYearChange"), m()), a(), C("onMonthChange"), T())
      }

      function v(e) {
          return g.calendarContainer.contains(e)
      }

      function X(e) {
          var t, i;
          g.isOpen && !g.config.inline && (i = v(t = Se(e)), i = !(t === g.input || t === g.altInput || g.element.contains(t) || e.path && e.path.indexOf && (~e.path.indexOf(g.input) || ~e.path.indexOf(g.altInput)) || i || v(e.relatedTarget)), e = !g.config.ignoredFocusElements.some(function(e) {
              return e.contains(t)
          }), i) && e && (g.config.allowInput && g.setDate(g._input.value, !1, g.config.altInput ? g.config.altFormat : g.config.dateFormat), void 0 !== g.timeContainer && void 0 !== g.minuteElement && void 0 !== g.hourElement && "" !== g.input.value && void 0 !== g.input.value && d(), g.close(), g.config) && "range" === g.config.mode && 1 === g.selectedDates.length && g.clear(!1)
      }

      function y(e) {
          var t;
          !e || g.config.minDate && e < g.config.minDate.getFullYear() || g.config.maxDate && e > g.config.maxDate.getFullYear() || (t = g.currentYear !== e, g.currentYear = e || g.currentYear, g.config.maxDate && g.currentYear === g.config.maxDate.getFullYear() ? g.currentMonth = Math.min(g.config.maxDate.getMonth(), g.currentMonth) : g.config.minDate && g.currentYear === g.config.minDate.getFullYear() && (g.currentMonth = Math.max(g.config.minDate.getMonth(), g.currentMonth)), t && (g.redraw(), C("onYearChange"), m()))
      }

      function w(e, t) {
          var i = g.parseDate(e, void 0, t = void 0 === t ? !0 : t);
          if (g.config.minDate && i && Oe(i, g.config.minDate, void 0 !== t ? t : !g.minDateHasTime) < 0 || g.config.maxDate && i && 0 < Oe(i, g.config.maxDate, void 0 !== t ? t : !g.maxDateHasTime)) return !1;
          if (!g.config.enable && 0 === g.config.disable.length) return !0;
          if (void 0 === i) return !1;
          for (var n, s = !!g.config.enable, a = null != (e = g.config.enable) ? e : g.config.disable, r = 0, o = void 0; r < a.length; r++) {
              if ("function" == typeof(o = a[r]) && o(i)) return s;
              if (o instanceof Date && void 0 !== i && o.getTime() === i.getTime()) return s;
              if ("string" == typeof o) return (n = g.parseDate(o, void 0, !0)) && n.getTime() === i.getTime() ? s : !s;
              if ("object" == typeof o && void 0 !== i && o.from && o.to && i.getTime() >= o.from.getTime() && i.getTime() <= o.to.getTime()) return s
          }
          return !s
      }

      function _(e) {
          return void 0 !== g.daysContainer && -1 === e.className.indexOf("hidden") && -1 === e.className.indexOf("flatpickr-disabled") && g.daysContainer.contains(e)
      }

      function G(e) {
          var t = e.target === g._input,
              i = g._input.value.trimEnd() !== ce();
          !t || !i || e.relatedTarget && v(e.relatedTarget) || g.setDate(g._input.value, !0, e.target === g.altInput ? g.config.altFormat : g.config.dateFormat)
      }

      function K(e) {
          var t = Se(e),
              i = g.config.wrap ? c.contains(t) : t === g._input,
              n = g.config.allowInput,
              s = g.isOpen && (!n || !i),
              a = g.config.inline && i && !n;
          if (13 === e.keyCode && i) {
              if (n) return g.setDate(g._input.value, !0, t === g.altInput ? g.config.altFormat : g.config.dateFormat), g.close(), t.blur();
              g.open()
          } else if (v(t) || s || a) {
              var r, o = !!g.timeContainer && g.timeContainer.contains(t);
              switch (e.keyCode) {
                  case 13:
                      o ? (e.preventDefault(), d(), ie()) : ne(e);
                      break;
                  case 27:
                      e.preventDefault(), ie();
                      break;
                  case 8:
                  case 46:
                      i && !g.config.allowInput && (e.preventDefault(), g.clear());
                      break;
                  case 37:
                  case 39:
                      o || i ? g.hourElement && g.hourElement.focus() : (e.preventDefault(), l = j(), void 0 !== g.daysContainer && (!1 === n || l && _(l)) && (l = 39 === e.keyCode ? 1 : -1, e.ctrlKey ? (e.stopPropagation(), V(l), b(f(1), 0)) : b(void 0, l)));
                      break;
                  case 38:
                  case 40:
                      e.preventDefault();
                      var l = 40 === e.keyCode ? 1 : -1;
                      g.daysContainer && void 0 !== t.$i || t === g.input || t === g.altInput ? e.ctrlKey ? (e.stopPropagation(), y(g.currentYear - l), b(f(1), 0)) : o || b(void 0, 7 * l) : t === g.currentYearElement ? y(g.currentYear - l) : g.config.enableTime && (!o && g.hourElement && g.hourElement.focus(), d(e), g._debouncedChange());
                      break;
                  case 9:
                      o ? -1 !== (r = (l = [g.hourElement, g.minuteElement, g.secondElement, g.amPM].concat(g.pluginElements).filter(function(e) {
                          return e
                      })).indexOf(t)) && (l = l[r + (e.shiftKey ? -1 : 1)], e.preventDefault(), (l || g._input).focus()) : !g.config.noCalendar && g.daysContainer && g.daysContainer.contains(t) && e.shiftKey && (e.preventDefault(), g._input.focus())
              }
          }
          if (void 0 !== g.amPM && t === g.amPM) switch (e.key) {
              case g.l10n.amPM[0].charAt(0):
              case g.l10n.amPM[0].charAt(0).toLowerCase():
                  g.amPM.textContent = g.l10n.amPM[0], u(), S();
                  break;
              case g.l10n.amPM[1].charAt(0):
              case g.l10n.amPM[1].charAt(0).toLowerCase():
                  g.amPM.textContent = g.l10n.amPM[1], u(), S()
          }(i || v(t)) && C("onKeyDown", e)
      }

      function r(s, e) {
          if (void 0 === e && (e = "flatpickr-day"), 1 === g.selectedDates.length && (!s || s.classList.contains(e) && !s.classList.contains("flatpickr-disabled"))) {
              for (var a = (s || g.days.firstElementChild).dateObj.getTime(), r = g.parseDate(g.selectedDates[0], void 0, !0).getTime(), t = Math.min(a, g.selectedDates[0].getTime()), i = Math.max(a, g.selectedDates[0].getTime()), o = !1, l = 0, c = 0, n = t; n < i; n += Ie) w(new Date(n), !0) || (o = o || t < n && n < i, n < r && (!l || l < n) ? l = n : r < n && (!c || n < c) && (c = n));
              Array.from(g.rContainer.querySelectorAll("*:nth-child(-n+" + g.config.showMonths + ") > ." + e)).forEach(function(t) {
                  var e, i = t.dateObj.getTime(),
                      n = 0 < l && i < l || 0 < c && c < i;
                  n ? (t.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(e) {
                      t.classList.remove(e)
                  })) : o && !n || (["startRange", "inRange", "endRange", "notAllowed"].forEach(function(e) {
                      t.classList.remove(e)
                  }), void 0 !== s && (s.classList.add(a <= g.selectedDates[0].getTime() ? "startRange" : "endRange"), r < a && i === r ? t.classList.add("startRange") : a < r && i === r && t.classList.add("endRange"), l <= i) && (0 === c || i <= c) && (n = r, e = a, (i = i) > Math.min(n, e)) && i < Math.max(n, e) && t.classList.add("inRange"))
              })
          }
      }

      function Z() {
          !g.isOpen || g.config.static || g.config.inline || E()
      }

      function Q(i) {
          return function(e) {
              var e = g.config["_" + i + "Date"] = g.parseDate(e, g.config.dateFormat),
                  t = g.config["_" + ("min" === i ? "max" : "min") + "Date"];
              void 0 !== e && (g["min" === i ? "minDateHasTime" : "maxDateHasTime"] = 0 < e.getHours() || 0 < e.getMinutes() || 0 < e.getSeconds()), g.selectedDates && (g.selectedDates = g.selectedDates.filter(function(e) {
                  return w(e)
              }), g.selectedDates.length || "min" !== i || n(e), S()), g.daysContainer && (te(), void 0 !== e ? g.currentYearElement[i] = e.getFullYear().toString() : g.currentYearElement.removeAttribute(i), g.currentYearElement.disabled = !!t && void 0 !== e && t.getFullYear() === e.getFullYear())
          }
      }

      function J() {
          return g.config.wrap ? c.querySelector("[data-input]") : c
      }

      function ee() {
          "object" != typeof g.config.locale && void 0 === $e.l10ns[g.config.locale] && g.config.errorHandler(new Error("flatpickr: invalid locale " + g.config.locale)), g.l10n = pe(pe({}, $e.l10ns.default), "object" == typeof g.config.locale ? g.config.locale : "default" !== g.config.locale ? $e.l10ns[g.config.locale] : void 0), Me.D = "(" + g.l10n.weekdays.shorthand.join("|") + ")", Me.l = "(" + g.l10n.weekdays.longhand.join("|") + ")", Me.M = "(" + g.l10n.months.shorthand.join("|") + ")", Me.F = "(" + g.l10n.months.longhand.join("|") + ")", Me.K = "(" + g.l10n.amPM[0] + "|" + g.l10n.amPM[1] + "|" + g.l10n.amPM[0].toLowerCase() + "|" + g.l10n.amPM[1].toLowerCase() + ")", void 0 === pe(pe({}, P), JSON.parse(JSON.stringify(c.dataset || {}))).time_24hr && void 0 === $e.defaultConfig.time_24hr && (g.config.time_24hr = g.l10n.time_24hr), g.formatDate = Ae(g), g.parseDate = Ne({
              config: g.config,
              l10n: g.l10n
          })
      }

      function E(e) {
          var t, i, n, s, a, r, o;
          "function" != typeof g.config.position ? void 0 !== g.calendarContainer && (C("onPreCalendarPosition"), r = e || g._positionElement, i = Array.prototype.reduce.call(g.calendarContainer.children, function(e, t) {
              return e + t.offsetHeight
          }, 0), o = g.calendarContainer.offsetWidth, a = (n = g.config.position.split(" "))[0], n = 1 < n.length ? n[1] : null, t = r.getBoundingClientRect(), s = window.innerHeight - t.bottom, a = "above" === a || "below" !== a && s < i && t.top > i, s = window.pageYOffset + t.top + (a ? -i - 2 : r.offsetHeight + 2), Ee(g.calendarContainer, "arrowTop", !a), Ee(g.calendarContainer, "arrowBottom", a), g.config.inline || (i = window.pageXOffset + t.left, a = r = !1, "center" === n ? (i -= (o - t.width) / 2, r = !0) : "right" === n && (i -= o - t.width, a = !0), Ee(g.calendarContainer, "arrowLeft", !r && !a), Ee(g.calendarContainer, "arrowCenter", r), Ee(g.calendarContainer, "arrowRight", a), n = window.document.body.offsetWidth - (window.pageXOffset + t.right), r = i + o > window.document.body.offsetWidth, a = n + o > window.document.body.offsetWidth, Ee(g.calendarContainer, "rightMost", r), g.config.static) || (g.calendarContainer.style.top = s + "px", r ? a ? void 0 !== (s = function() {
              for (var e, t = null, i = 0; i < document.styleSheets.length; i++) {
                  var n = document.styleSheets[i];
                  if (n.cssRules) {
                      try {
                          n.cssRules
                      } catch (t) {
                          continue
                      }
                      t = n;
                      break
                  }
              }
              return null != t ? t : (e = document.createElement("style"), document.head.appendChild(e), e.sheet)
          }()) && (r = window.document.body.offsetWidth, a = Math.max(0, r / 2 - o / 2), r = s.cssRules.length, o = "{left:" + t.left + "px;right:auto;}", Ee(g.calendarContainer, "rightMost", !1), Ee(g.calendarContainer, "centerMost", !0), s.insertRule(".flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after" + o, r), g.calendarContainer.style.left = a + "px", g.calendarContainer.style.right = "auto") : (g.calendarContainer.style.left = "auto", g.calendarContainer.style.right = n + "px") : (g.calendarContainer.style.left = i + "px", g.calendarContainer.style.right = "auto"))) : g.config.position(g, e)
      }

      function te() {
          g.config.noCalendar || g.isMobile || (m(), T(), a())
      }

      function ie() {
          g._input.focus(), -1 !== window.navigator.userAgent.indexOf("MSIE") || void 0 !== navigator.msMaxTouchPoints ? setTimeout(g.close, 0) : g.close()
      }

      function ne(e) {
          e.preventDefault(), e.stopPropagation();
          var t, i, n, e = function e(t, i) {
              return i(t) ? t : t.parentNode ? e(t.parentNode, i) : void 0
          }(Se(e), function(e) {
              return e.classList && e.classList.contains("flatpickr-day") && !e.classList.contains("flatpickr-disabled") && !e.classList.contains("notAllowed")
          });
          void 0 !== e && (e = e, t = ((i = g.latestSelectedDateObj = new Date(e.dateObj.getTime())).getMonth() < g.currentMonth || i.getMonth() > g.currentMonth + g.config.showMonths - 1) && "range" !== g.config.mode, g.selectedDateElem = e, "single" === g.config.mode ? g.selectedDates = [i] : "multiple" === g.config.mode ? (n = le(i)) ? g.selectedDates.splice(parseInt(n), 1) : g.selectedDates.push(i) : "range" === g.config.mode && (2 === g.selectedDates.length && g.clear(!1, !1), g.latestSelectedDateObj = i, g.selectedDates.push(i), 0 !== Oe(i, g.selectedDates[0], !0)) && g.selectedDates.sort(function(e, t) {
              return e.getTime() - t.getTime()
          }), u(), t && (n = g.currentYear !== i.getFullYear(), g.currentYear = i.getFullYear(), g.currentMonth = i.getMonth(), n && (C("onYearChange"), m()), C("onMonthChange")), T(), a(), S(), t || "range" === g.config.mode || 1 !== g.config.showMonths ? void 0 !== g.selectedDateElem && void 0 === g.hourElement && g.selectedDateElem && g.selectedDateElem.focus() : q(e), void 0 !== g.hourElement && void 0 !== g.hourElement && g.hourElement.focus(), g.config.closeOnSelect && (i = "single" === g.config.mode && !g.config.enableTime, n = "range" === g.config.mode && 2 === g.selectedDates.length && !g.config.enableTime, i || n) && ie(), F())
      }
      g.parseDate = Ne({
          config: g.config,
          l10n: g.l10n
      }), g._handlers = [], g.pluginElements = [], g.loadedPlugins = [], g._bind = o, g._setHoursFromDate = n, g._positionCalendar = E, g.changeMonth = V, g.changeYear = y, g.clear = function(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0), g.input.value = "", void 0 !== g.altInput && (g.altInput.value = ""), void 0 !== g.mobileInput && (g.mobileInput.value = ""), g.selectedDates = [], !(g.latestSelectedDateObj = void 0) === t && (g.currentYear = g._initialDate.getFullYear(), g.currentMonth = g._initialDate.getMonth()), !0 === g.config.enableTime && l((t = Le(g.config)).hours, t.minutes, t.seconds), g.redraw(), e && C("onChange")
      }, g.close = function() {
          g.isOpen = !1, g.isMobile || (void 0 !== g.calendarContainer && g.calendarContainer.classList.remove("open"), void 0 !== g._input && g._input.classList.remove("active")), C("onClose")
      }, g.onMouseOver = r, g._createElement = xe, g.createDay = p, g.destroy = function() {
          void 0 !== g.config && C("onDestroy");
          for (var e = g._handlers.length; e--;) g._handlers[e].remove();
          if (g._handlers = [], g.mobileInput) g.mobileInput.parentNode && g.mobileInput.parentNode.removeChild(g.mobileInput), g.mobileInput = void 0;
          else if (g.calendarContainer && g.calendarContainer.parentNode)
              if (g.config.static && g.calendarContainer.parentNode) {
                  var t = g.calendarContainer.parentNode;
                  if (t.lastChild && t.removeChild(t.lastChild), t.parentNode) {
                      for (; t.firstChild;) t.parentNode.insertBefore(t.firstChild, t);
                      t.parentNode.removeChild(t)
                  }
              } else g.calendarContainer.parentNode.removeChild(g.calendarContainer);
          g.altInput && (g.input.type = "text", g.altInput.parentNode && g.altInput.parentNode.removeChild(g.altInput), delete g.altInput), g.input && (g.input.type = g.input._type, g.input.classList.remove("flatpickr-input"), g.input.removeAttribute("readonly")), ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function(e) {
              try {
                  delete g[e]
              } catch (e) {}
          })
      }, g.isEnabled = w, g.jumpToDate = s, g.updateValue = S, g.open = function(e, t) {
          var i;
          void 0 === t && (t = g._positionElement), !0 === g.isMobile ? (e && (e.preventDefault(), i = Se(e)) && i.blur(), void 0 !== g.mobileInput && (g.mobileInput.focus(), g.mobileInput.click()), C("onOpen")) : g._input.disabled || g.config.inline || (i = g.isOpen, g.isOpen = !0, i || (g.calendarContainer.classList.add("open"), g._input.classList.add("active"), C("onOpen"), E(t)), !0 !== g.config.enableTime) || !0 !== g.config.noCalendar || !1 !== g.config.allowInput || void 0 !== e && g.timeContainer.contains(e.relatedTarget) || setTimeout(function() {
              return g.hourElement.select()
          }, 50)
      }, g.redraw = te, g.set = function(e, t) {
          if (null !== e && "object" == typeof e)
              for (var i in Object.assign(g.config, e), e) void 0 !== x[i] && x[i].forEach(function(e) {
                  return e()
              });
          else g.config[e] = t, void 0 !== x[e] ? x[e].forEach(function(e) {
              return e()
          }) : -1 < ge.indexOf(e) && (g.config[e] = _e(t));
          g.redraw(), S(!0)
      }, g.setDate = function(e, t, i) {
          if (void 0 === t && (t = !1), void 0 === i && (i = g.config.dateFormat), 0 !== e && !e || e instanceof Array && 0 === e.length) return g.clear(t);
          se(e, i), g.latestSelectedDateObj = g.selectedDates[g.selectedDates.length - 1], g.redraw(), s(void 0, t), n(), 0 === g.selectedDates.length && g.clear(!1), S(t), t && C("onChange")
      }, g.toggle = function(e) {
          if (!0 === g.isOpen) return g.close();
          g.open(e)
      };
      var x = {
          locale: [ee, U],
          showMonths: [Y, z, W],
          minDate: [s],
          maxDate: [s],
          positionElement: [re],
          clickOpens: [function() {
              !0 === g.config.clickOpens ? (o(g._input, "focus", g.open), o(g._input, "click", g.open)) : (g._input.removeEventListener("focus", g.open), g._input.removeEventListener("click", g.open))
          }]
      };

      function se(e, t) {
          var i = [];
          if (e instanceof Array) i = e.map(function(e) {
              return g.parseDate(e, t)
          });
          else if (e instanceof Date || "number" == typeof e) i = [g.parseDate(e, t)];
          else if ("string" == typeof e) switch (g.config.mode) {
              case "single":
              case "time":
                  i = [g.parseDate(e, t)];
                  break;
              case "multiple":
                  i = e.split(g.config.conjunction).map(function(e) {
                      return g.parseDate(e, t)
                  });
                  break;
              case "range":
                  i = e.split(g.l10n.rangeSeparator).map(function(e) {
                      return g.parseDate(e, t)
                  })
          } else g.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(e)));
          g.selectedDates = g.config.allowInvalidPreload ? i : i.filter(function(e) {
              return e instanceof Date && w(e, !1)
          }), "range" === g.config.mode && g.selectedDates.sort(function(e, t) {
              return e.getTime() - t.getTime()
          })
      }

      function ae(e) {
          return e.slice().map(function(e) {
              return "string" == typeof e || "number" == typeof e || e instanceof Date ? g.parseDate(e, void 0, !0) : e && "object" == typeof e && e.from && e.to ? {
                  from: g.parseDate(e.from, void 0),
                  to: g.parseDate(e.to, void 0)
              } : e
          }).filter(function(e) {
              return e
          })
      }

      function re() {
          g._positionElement = g.config.positionElement || g._input
      }

      function C(e, t) {
          if (void 0 !== g.config) {
              var i = g.config[e];
              if (void 0 !== i && 0 < i.length)
                  for (var n = 0; i[n] && n < i.length; n++) i[n](g.selectedDates, g.input.value, g, t);
              "onChange" === e && (g.input.dispatchEvent(oe("change")), g.input.dispatchEvent(oe("input")))
          }
      }

      function oe(e) {
          var t = document.createEvent("Event");
          return t.initEvent(e, !0, !0), t
      }

      function le(e) {
          for (var t = 0; t < g.selectedDates.length; t++) {
              var i = g.selectedDates[t];
              if (i instanceof Date && 0 === Oe(i, e)) return "" + t
          }
          return !1
      }

      function T() {
          g.config.noCalendar || g.isMobile || !g.monthNav || (g.yearElements.forEach(function(e, t) {
              var i = new Date(g.currentYear, g.currentMonth, 1);
              i.setMonth(g.currentMonth + t), 1 < g.config.showMonths || "static" === g.config.monthSelectorType ? g.monthElements[t].textContent = ke(i.getMonth(), g.config.shorthandCurrentMonth, g.l10n) + " " : g.monthsDropdownContainer.value = i.getMonth().toString(), e.value = i.getFullYear().toString()
          }), g._hidePrevMonthArrow = void 0 !== g.config.minDate && (g.currentYear === g.config.minDate.getFullYear() ? g.currentMonth <= g.config.minDate.getMonth() : g.currentYear < g.config.minDate.getFullYear()), g._hideNextMonthArrow = void 0 !== g.config.maxDate && (g.currentYear === g.config.maxDate.getFullYear() ? g.currentMonth + 1 > g.config.maxDate.getMonth() : g.currentYear > g.config.maxDate.getFullYear()))
      }

      function ce(e) {
          var t = e || (g.config.altInput ? g.config.altFormat : g.config.dateFormat);
          return g.selectedDates.map(function(e) {
              return g.formatDate(e, t)
          }).filter(function(e, t, i) {
              return "range" !== g.config.mode || g.config.enableTime || i.indexOf(e) === t
          }).join("range" !== g.config.mode ? g.config.conjunction : g.l10n.rangeSeparator)
      }

      function S(e) {
          void 0 === e && (e = !0), void 0 !== g.mobileInput && g.mobileFormatStr && (g.mobileInput.value = void 0 !== g.latestSelectedDateObj ? g.formatDate(g.latestSelectedDateObj, g.mobileFormatStr) : ""), g.input.value = ce(g.config.dateFormat), void 0 !== g.altInput && (g.altInput.value = ce(g.config.altFormat)), !1 !== e && C("onValueUpdate")
      }

      function de(e) {
          var e = Se(e),
              t = g.prevMonthNav.contains(e),
              i = g.nextMonthNav.contains(e);
          t || i ? V(t ? -1 : 1) : 0 <= g.yearElements.indexOf(e) ? e.select() : e.classList.contains("arrowUp") ? g.changeYear(g.currentYear + 1) : e.classList.contains("arrowDown") && g.changeYear(g.currentYear - 1)
      }

      function ue(t) {
          return function(e) {
              g.config["min" === t ? "_minTime" : "_maxTime"] = g.parseDate(e, "H:i:S")
          }
      }
      g.element = g.input = c, g.isOpen = !1;
      var e = ["wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"],
          t = pe(pe({}, JSON.parse(JSON.stringify(c.dataset || {}))), P),
          i = {},
          k = (g.config.parseDate = t.parseDate, g.config.formatDate = t.formatDate, Object.defineProperty(g.config, "enable", {
              get: function() {
                  return g.config._enable
              },
              set: function(e) {
                  g.config._enable = ae(e)
              }
          }), Object.defineProperty(g.config, "disable", {
              get: function() {
                  return g.config._disable
              },
              set: function(e) {
                  g.config._disable = ae(e)
              }
          }), "time" === t.mode);
      t.dateFormat || !t.enableTime && !k || (L = $e.defaultConfig.dateFormat || fe.dateFormat, i.dateFormat = t.noCalendar || k ? "H:i" + (t.enableSeconds ? ":S" : "") : L + " H:i" + (t.enableSeconds ? ":S" : "")), t.altInput && (t.enableTime || k) && !t.altFormat && (L = $e.defaultConfig.altFormat || fe.altFormat, i.altFormat = t.noCalendar || k ? "h:i" + (t.enableSeconds ? ":S K" : " K") : L + " h:i" + (t.enableSeconds ? ":S" : "") + " K"), Object.defineProperty(g.config, "minDate", {
          get: function() {
              return g.config._minDate
          },
          set: Q("min")
      }), Object.defineProperty(g.config, "maxDate", {
          get: function() {
              return g.config._maxDate
          },
          set: Q("max")
      }), Object.defineProperty(g.config, "minTime", {
          get: function() {
              return g.config._minTime
          },
          set: ue("min")
      }), Object.defineProperty(g.config, "maxTime", {
          get: function() {
              return g.config._maxTime
          },
          set: ue("max")
      }), "time" === t.mode && (g.config.noCalendar = !0, g.config.enableTime = !0), Object.assign(g.config, i, t);
      for (var M = 0; M < e.length; M++) g.config[e[M]] = !0 === g.config[e[M]] || "true" === g.config[e[M]];
      for (ge.filter(function(e) {
              return void 0 !== g.config[e]
          }).forEach(function(e) {
              g.config[e] = _e(g.config[e] || []).map(R)
          }), g.isMobile = !g.config.disableMobile && !g.config.inline && "single" === g.config.mode && !g.config.disable.length && !g.config.enable && !g.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), M = 0; M < g.config.plugins.length; M++) {
          var A, he = g.config.plugins[M](g) || {};
          for (A in he) - 1 < ge.indexOf(A) ? g.config[A] = _e(he[A]).map(R).concat(g.config[A]) : void 0 === t[A] && (g.config[A] = he[A])
      }
      if (t.altInputClass || (g.config.altInputClass = J().className + " " + g.config.altInputClass), C("onParseConfig"), ee(), g.input = J(), g.input ? (g.input._type = g.input.type, g.input.type = "text", g.input.classList.add("flatpickr-input"), g._input = g.input, g.config.altInput && (g.altInput = xe(g.input.nodeName, g.config.altInputClass), g._input = g.altInput, g.altInput.placeholder = g.input.placeholder, g.altInput.disabled = g.input.disabled, g.altInput.required = g.input.required, g.altInput.tabIndex = g.input.tabIndex, g.altInput.type = "text", g.input.setAttribute("type", "hidden"), !g.config.static) && g.input.parentNode && g.input.parentNode.insertBefore(g.altInput, g.input.nextSibling), g.config.allowInput || g._input.setAttribute("readonly", "readonly"), re()) : g.config.errorHandler(new Error("Invalid input element specified")), g.selectedDates = [], g.now = g.parseDate(g.config.now) || new Date, (k = g.config.defaultDate || ("INPUT" !== g.input.nodeName && "TEXTAREA" !== g.input.nodeName || !g.input.placeholder || g.input.value !== g.input.placeholder ? g.input.value : null)) && se(k, g.config.dateFormat), g._initialDate = 0 < g.selectedDates.length ? g.selectedDates[0] : g.config.minDate && g.config.minDate.getTime() > g.now.getTime() ? g.config.minDate : g.config.maxDate && g.config.maxDate.getTime() < g.now.getTime() ? g.config.maxDate : g.now, g.currentYear = g._initialDate.getFullYear(), g.currentMonth = g._initialDate.getMonth(), 0 < g.selectedDates.length && (g.latestSelectedDateObj = g.selectedDates[0]), void 0 !== g.config.minTime && (g.config.minTime = g.parseDate(g.config.minTime, "H:i")), void 0 !== g.config.maxTime && (g.config.maxTime = g.parseDate(g.config.maxTime, "H:i")), g.minDateHasTime = !!g.config.minDate && (0 < g.config.minDate.getHours() || 0 < g.config.minDate.getMinutes() || 0 < g.config.minDate.getSeconds()), g.maxDateHasTime = !!g.config.maxDate && (0 < g.config.maxDate.getHours() || 0 < g.config.maxDate.getMinutes() || 0 < g.config.maxDate.getSeconds()), g.utils = {
              getDaysInMonth: function(e, t) {
                  return void 0 === e && (e = g.currentMonth), void 0 === t && (t = g.currentYear), 1 === e && (t % 4 == 0 && t % 100 != 0 || t % 400 == 0) ? 29 : g.l10n.daysInMonth[e]
              }
          }, g.isMobile || (L = window.document.createDocumentFragment(), g.calendarContainer = xe("div", "flatpickr-calendar"), g.calendarContainer.tabIndex = -1, g.config.noCalendar || (L.appendChild((g.monthNav = xe("div", "flatpickr-months"), g.yearElements = [], g.monthElements = [], g.prevMonthNav = xe("span", "flatpickr-prev-month"), g.prevMonthNav.innerHTML = g.config.prevArrow, g.nextMonthNav = xe("span", "flatpickr-next-month"), g.nextMonthNav.innerHTML = g.config.nextArrow, Y(), Object.defineProperty(g, "_hidePrevMonthArrow", {
              get: function() {
                  return g.__hidePrevMonthArrow
              },
              set: function(e) {
                  g.__hidePrevMonthArrow !== e && (Ee(g.prevMonthNav, "flatpickr-disabled", e), g.__hidePrevMonthArrow = e)
              }
          }), Object.defineProperty(g, "_hideNextMonthArrow", {
              get: function() {
                  return g.__hideNextMonthArrow
              },
              set: function(e) {
                  g.__hideNextMonthArrow !== e && (Ee(g.nextMonthNav, "flatpickr-disabled", e), g.__hideNextMonthArrow = e)
              }
          }), g.currentYearElement = g.yearElements[0], T(), g.monthNav)), g.innerContainer = xe("div", "flatpickr-innerContainer"), g.config.weekNumbers && (g.calendarContainer.classList.add("hasWeeks"), (D = xe("div", "flatpickr-weekwrapper")).appendChild(xe("span", "flatpickr-weekday", g.l10n.weekAbbreviation)), O = xe("div", "flatpickr-weeks"), D.appendChild(O), O = (D = {
              weekWrapper: D,
              weekNumbers: O
          }).weekNumbers, g.innerContainer.appendChild(D = D.weekWrapper), g.weekNumbers = O, g.weekWrapper = D), g.rContainer = xe("div", "flatpickr-rContainer"), g.rContainer.appendChild(W()), g.daysContainer || (g.daysContainer = xe("div", "flatpickr-days"), g.daysContainer.tabIndex = -1), a(), g.rContainer.appendChild(g.daysContainer), g.innerContainer.appendChild(g.rContainer), L.appendChild(g.innerContainer)), g.config.enableTime && L.appendChild((g.calendarContainer.classList.add("hasTime"), g.config.noCalendar && g.calendarContainer.classList.add("noCalendar"), O = Le(g.config), g.timeContainer = xe("div", "flatpickr-time"), g.timeContainer.tabIndex = -1, D = xe("span", "flatpickr-time-separator", ":"), I = Te("flatpickr-hour", {
              "aria-label": g.l10n.hourAriaLabel
          }), g.hourElement = I.getElementsByTagName("input")[0], $ = Te("flatpickr-minute", {
              "aria-label": g.l10n.minuteAriaLabel
          }), g.minuteElement = $.getElementsByTagName("input")[0], g.hourElement.tabIndex = g.minuteElement.tabIndex = -1, g.hourElement.value = ve(g.latestSelectedDateObj ? g.latestSelectedDateObj.getHours() : g.config.time_24hr ? O.hours : function(e) {
              switch (e % 24) {
                  case 0:
                  case 12:
                      return 12;
                  default:
                      return e % 12
              }
          }(O.hours)), g.minuteElement.value = ve(g.latestSelectedDateObj ? g.latestSelectedDateObj.getMinutes() : O.minutes), g.hourElement.setAttribute("step", g.config.hourIncrement.toString()), g.minuteElement.setAttribute("step", g.config.minuteIncrement.toString()), g.hourElement.setAttribute("min", g.config.time_24hr ? "0" : "1"), g.hourElement.setAttribute("max", g.config.time_24hr ? "23" : "12"), g.hourElement.setAttribute("maxlength", "2"), g.minuteElement.setAttribute("min", "0"), g.minuteElement.setAttribute("max", "59"), g.minuteElement.setAttribute("maxlength", "2"), g.timeContainer.appendChild(I), g.timeContainer.appendChild(D), g.timeContainer.appendChild($), g.config.time_24hr && g.timeContainer.classList.add("time24hr"), g.config.enableSeconds && (g.timeContainer.classList.add("hasSeconds"), I = Te("flatpickr-second"), g.secondElement = I.getElementsByTagName("input")[0], g.secondElement.value = ve(g.latestSelectedDateObj ? g.latestSelectedDateObj.getSeconds() : O.seconds), g.secondElement.setAttribute("step", g.minuteElement.getAttribute("step")), g.secondElement.setAttribute("min", "0"), g.secondElement.setAttribute("max", "59"), g.secondElement.setAttribute("maxlength", "2"), g.timeContainer.appendChild(xe("span", "flatpickr-time-separator", ":")), g.timeContainer.appendChild(I)), g.config.time_24hr || (g.amPM = xe("span", "flatpickr-am-pm", g.l10n.amPM[ye(11 < (g.latestSelectedDateObj ? g.hourElement.value : g.config.defaultHour))]), g.amPM.title = g.l10n.toggleTitle, g.amPM.tabIndex = -1, g.timeContainer.appendChild(g.amPM)), g.timeContainer)), Ee(g.calendarContainer, "rangeMode", "range" === g.config.mode), Ee(g.calendarContainer, "animate", !0 === g.config.animate), Ee(g.calendarContainer, "multiMonth", 1 < g.config.showMonths), g.calendarContainer.appendChild(L), $ = void 0 !== g.config.appendTo && void 0 !== g.config.appendTo.nodeType, (g.config.inline || g.config.static) && (g.calendarContainer.classList.add(g.config.inline ? "inline" : "static"), g.config.inline && (!$ && g.element.parentNode ? g.element.parentNode.insertBefore(g.calendarContainer, g._input.nextSibling) : void 0 !== g.config.appendTo && g.config.appendTo.appendChild(g.calendarContainer)), g.config.static) && (I = xe("div", "flatpickr-wrapper"), g.element.parentNode && g.element.parentNode.insertBefore(I, g.element), I.appendChild(g.element), g.altInput && I.appendChild(g.altInput), I.appendChild(g.calendarContainer)), g.config.static || g.config.inline || (void 0 !== g.config.appendTo ? g.config.appendTo : window.document.body).appendChild(g.calendarContainer)), g.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(t) {
              Array.prototype.forEach.call(g.element.querySelectorAll("[data-" + t + "]"), function(e) {
                  return o(e, "click", g[t])
              })
          }), g.isMobile) {
          var N = g.config.enableTime ? g.config.noCalendar ? "time" : "datetime-local" : "date";
          g.mobileInput = xe("input", g.input.className + " flatpickr-mobile"), g.mobileInput.tabIndex = 1, g.mobileInput.type = N, g.mobileInput.disabled = g.input.disabled, g.mobileInput.required = g.input.required, g.mobileInput.placeholder = g.input.placeholder, g.mobileFormatStr = "datetime-local" == N ? "Y-m-d\\TH:i:S" : "date" == N ? "Y-m-d" : "H:i:S", 0 < g.selectedDates.length && (g.mobileInput.defaultValue = g.mobileInput.value = g.formatDate(g.selectedDates[0], g.mobileFormatStr)), g.config.minDate && (g.mobileInput.min = g.formatDate(g.config.minDate, "Y-m-d")), g.config.maxDate && (g.mobileInput.max = g.formatDate(g.config.maxDate, "Y-m-d")), g.input.getAttribute("step") && (g.mobileInput.step = String(g.input.getAttribute("step"))), g.input.type = "hidden", void 0 !== g.altInput && (g.altInput.type = "hidden");
          try {
              g.input.parentNode && g.input.parentNode.insertBefore(g.mobileInput, g.input.nextSibling)
          } catch (N) {}
          o(g.mobileInput, "change", function(e) {
              g.setDate(Se(e).value, !1, g.mobileFormatStr), C("onChange"), C("onClose")
          })
      } else {
          i = we(Z, 50);
          g._debouncedChange = we(F, 300), g.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && o(g.daysContainer, "mouseover", function(e) {
              "range" === g.config.mode && r(Se(e))
          }), o(g._input, "keydown", K), void 0 !== g.calendarContainer && o(g.calendarContainer, "keydown", K), g.config.inline || g.config.static || o(window, "resize", i), void 0 !== window.ontouchstart ? o(window.document, "touchstart", X) : o(window.document, "mousedown", X), o(window.document, "focus", X, {
              capture: !0
          }), !0 === g.config.clickOpens && (o(g._input, "focus", g.open), o(g._input, "click", g.open)), void 0 !== g.daysContainer && (o(g.monthNav, "click", de), o(g.monthNav, ["keyup", "increment"], B), o(g.daysContainer, "click", ne)), void 0 !== g.timeContainer && void 0 !== g.minuteElement && void 0 !== g.hourElement && (o(g.timeContainer, ["increment"], d), o(g.timeContainer, "blur", d, {
              capture: !0
          }), o(g.timeContainer, "click", H), o([g.hourElement, g.minuteElement], ["focus", "click"], function(e) {
              return Se(e).select()
          }), void 0 !== g.secondElement && o(g.secondElement, "focus", function() {
              return g.secondElement && g.secondElement.select()
          }), void 0 !== g.amPM) && o(g.amPM, "click", function(e) {
              d(e)
          }), g.config.allowInput && o(g._input, "blur", G)
      }(g.selectedDates.length || g.config.noCalendar) && (g.config.enableTime && n(g.config.noCalendar ? g.latestSelectedDateObj : void 0), S(!1)), z();
      var O, D, I, L, $, k = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      return !g.isMobile && k && E(), C("onReady"), g
  }

  function i(e, t) {
      for (var i = Array.prototype.slice.call(e).filter(function(e) {
              return e instanceof HTMLElement
          }), n = [], s = 0; s < i.length; s++) {
          var a = i[s];
          try {
              null === a.getAttribute("data-fp-omit") && (void 0 !== a._flatpickr && (a._flatpickr.destroy(), a._flatpickr = void 0), a._flatpickr = r(a, t || {}), n.push(a._flatpickr))
          } catch (e) {
              console.error(e)
          }
      }
      return 1 === n.length ? n[0] : n
  }
  "function" != typeof Object.assign && (Object.assign = function(i) {
      for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
      if (!i) throw TypeError("Cannot convert undefined or null to object");
      for (var n = 0, s = e; n < s.length; n++) ! function(t) {
          t && Object.keys(t).forEach(function(e) {
              return i[e] = t[e]
          })
      }(s[n]);
      return i
  }), "undefined" != typeof HTMLElement && "undefined" != typeof HTMLCollection && "undefined" != typeof NodeList && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(e) {
      return i(this, e)
  }, HTMLElement.prototype.flatpickr = function(e) {
      return i([this], e)
  });
  var $e = function(e, t) {
      return "string" == typeof e ? i(window.document.querySelectorAll(e), t) : e instanceof Node ? i([e], t) : i(e, t)
  };
  return $e.defaultConfig = {}, $e.l10ns = {
      en: pe({}, be),
      default: pe({}, be)
  }, $e.localize = function(e) {
      $e.l10ns.default = pe(pe({}, $e.l10ns.default), e)
  }, $e.setDefaults = function(e) {
      $e.defaultConfig = pe(pe({}, $e.defaultConfig), e)
  }, $e.parseDate = Ne({}), $e.formatDate = Ae({}), $e.compareDates = Oe, "undefined" != typeof jQuery && void 0 !== jQuery.fn && (jQuery.fn.flatpickr = function(e) {
      return i(this, e)
  }), Date.prototype.fp_incr = function(e) {
      return new Date(this.getFullYear(), this.getMonth(), this.getDate() + ("string" == typeof e ? parseInt(e, 10) : e))
  }, "undefined" != typeof window && (window.flatpickr = $e), $e
}),
function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).GLightbox = t()
}(this, function() {
  "use strict";

  function t(e) {
      return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
  }

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function n(e, t) {
      for (var i = 0; i < t.length; i++) {
          var n = t[i];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
      }
  }

  function e(e, t, i) {
      t && n(e.prototype, t), i && n(e, i)
  }
  var o = Date.now();

  function c(e) {
      var t = {},
          i = !0,
          n = 0,
          s = arguments.length;
      "[object Boolean]" === Object.prototype.toString.call(e) && (i = e, n++);
      for (; n < s; n++) {
          a = void 0;
          var a, r = arguments[n];
          for (a in r) Object.prototype.hasOwnProperty.call(r, a) && (i && "[object Object]" === Object.prototype.toString.call(r[a]) ? t[a] = c(!0, t[a], r[a]) : t[a] = r[a])
      }
      return t
  }

  function h(e, t) {
      if (0 != A(e = M(e = !F(e) && e !== window && e !== document ? e : [e]) || d(e) ? e : [e]))
          if (M(e) && !d(e))
              for (var i = e.length, n = 0; n < i && !1 !== t.call(e[n], e[n], n, e); n++);
          else if (d(e))
          for (var s in e)
              if (w(e, s) && !1 === t.call(e[s], e[s], s, e)) break
  }

  function C(e, t, i) {
      var n = 1 < arguments.length && void 0 !== t ? t : null,
          s = 2 < arguments.length && void 0 !== i ? i : null,
          t = e[o] = e[o] || [],
          a = {
              all: t,
              evt: null,
              found: null
          };
      return n && s && 0 < A(t) && h(t, function(e, t) {
          if (e.eventName == n && e.fn.toString() == s.toString()) return a.found = !0, a.evt = t, !1
      }), a
  }

  function I(i, e, t) {
      var e = 1 < arguments.length && void 0 !== e ? e : {},
          n = e.onElement,
          s = e.withCallback,
          a = e.avoidDuplicate,
          r = void 0 === a || a,
          a = e.once,
          o = void 0 !== a && a,
          a = e.useCapture,
          l = void 0 !== a && a,
          c = 2 < arguments.length ? t : void 0,
          d = n || [];

      function u(e) {
          B(s) && s.call(c, e, this), o && u.destroy()
      }
      return y(d) && (d = document.querySelectorAll(d)), u.destroy = function() {
          h(d, function(e) {
              var t = C(e, i, u);
              t.found && t.all.splice(t.evt, 1), e.removeEventListener && e.removeEventListener(i, u, l)
          })
      }, h(d, function(e) {
          var t = C(e, i, u);
          (e.addEventListener && r && !t.found || !r) && (e.addEventListener(i, u, l), t.all.push({
              eventName: i,
              fn: u
          }))
      }), u
  }

  function L(t, e) {
      h(e.split(" "), function(e) {
          return t.classList.add(e)
      })
  }

  function $(t, e) {
      h(e.split(" "), function(e) {
          return t.classList.remove(e)
      })
  }

  function P(e, t) {
      return e.classList.contains(t)
  }

  function j(e, t) {
      for (; e !== document.body;) {
          if (!(e = e.parentElement)) return !1;
          if ("function" == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e
      }
  }

  function R(t, e, i) {
      var n, e = 1 < arguments.length && void 0 !== e ? e : "",
          s = 2 < arguments.length && void 0 !== i && i;
      if (t && "" !== e) return "none" === e ? B(s) && s() : (i = function() {
          var e, t = document.createElement("fakeelement"),
              i = {
                  animation: "animationend",
                  OAnimation: "oAnimationEnd",
                  MozAnimation: "animationend",
                  WebkitAnimation: "webkitAnimationEnd"
              };
          for (e in i)
              if (void 0 !== t.style[e]) return i[e]
      }(), h(n = e.split(" "), function(e) {
          L(t, "g" + e)
      }), void I(i, {
          onElement: t,
          avoidDuplicate: !1,
          once: !0,
          withCallback: function(e, t) {
              h(n, function(e) {
                  $(t, "g" + e)
              }), B(s) && s()
          }
      }))
  }

  function z(e, t) {
      t = 1 < arguments.length && void 0 !== t ? t : "";
      if ("" === t) return e.style.webkitTransform = "", e.style.MozTransform = "", e.style.msTransform = "", e.style.OTransform = "", e.style.transform = "", !1;
      e.style.webkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t, e.style.transform = t
  }

  function T(e) {
      e.style.display = "block"
  }

  function l(e) {
      e.style.display = "none"
  }

  function f(e) {
      var t = document.createDocumentFragment(),
          i = document.createElement("div");
      for (i.innerHTML = e; i.firstChild;) t.appendChild(i.firstChild);
      return t
  }

  function W() {
      return {
          width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
          height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      }
  }

  function b(e, t, i, n) {
      var s, a;
      e() ? t() : (i = i || 100, a = setInterval(function() {
          e() && (clearInterval(a), s && clearTimeout(s), t())
      }, i), n && (s = setTimeout(function() {
          clearInterval(a)
      }, n)))
  }

  function S(e, t, i) {
      if (H(e)) console.error("Inject assets error");
      else if (B(t) && (i = t, t = !1), y(t) && t in window) B(i) && i();
      else {
          var n, s, a;
          if (-1 !== e.indexOf(".css")) return (n = document.querySelectorAll('link[href="' + e + '"]')) && 0 < n.length || (r = (s = document.getElementsByTagName("head")[0]).querySelectorAll('link[rel="stylesheet"]'), (a = document.createElement("link")).rel = "stylesheet", a.type = "text/css", a.href = e, a.media = "all", r ? s.insertBefore(a, r[0]) : s.appendChild(a)), B(i) && i();
          if ((n = document.querySelectorAll('script[src="' + e + '"]')) && 0 < n.length) {
              if (B(i)) {
                  if (y(t)) return b(function() {
                      return void 0 !== window[t]
                  }, function() {
                      i()
                  });
                  i()
              }
          } else {
              var r = document.createElement("script");
              r.type = "text/javascript", r.src = e, r.onload = function() {
                  if (B(i)) {
                      if (y(t)) return b(function() {
                          return void 0 !== window[t]
                      }, function() {
                          i()
                      }), !1;
                      i()
                  }
              }, document.body.appendChild(r)
          }
      }
  }

  function v() {
      return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)
  }

  function B(e) {
      return "function" == typeof e
  }

  function y(e) {
      return "string" == typeof e
  }

  function F(e) {
      return e && e.nodeType && 1 == e.nodeType
  }

  function k(e) {
      return Array.isArray(e)
  }

  function M(e) {
      return e && e.length && isFinite(e.length)
  }

  function d(e) {
      return "object" === t(e) && null != e && !B(e) && !k(e)
  }

  function H(e) {
      return null == e
  }

  function w(e, t) {
      return null !== e && hasOwnProperty.call(e, t)
  }

  function A(e) {
      if (d(e)) {
          if (e.keys) return e.keys().length;
          var t, i = 0;
          for (t in e) w(e, t) && i++;
          return i
      }
      return e.length
  }

  function q(e) {
      return !isNaN(parseFloat(e)) && isFinite(e)
  }

  function U(e) {
      var e = 0 < arguments.length && void 0 !== e ? e : -1,
          t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
      if (!t.length) return !1;
      if (1 == t.length) return t[0];
      "string" == typeof e && (e = parseInt(e));
      var i = [],
          t = (h(t, function(e) {
              i.push(e.getAttribute("data-taborder"))
          }), Math.max.apply(Math, i.map(function(e) {
              return parseInt(e)
          }))),
          n = e < 0 ? 1 : e + 1;
      t < n && (n = "1");
      e = i.filter(function(e) {
          return e >= parseInt(n)
      }).sort()[0];
      return document.querySelector('.gbtn[data-taborder="'.concat(e, '"]'))
  }

  function p(e) {
      return Math.sqrt(e.x * e.x + e.y * e.y)
  }
  e(i, [{
      key: "add",
      value: function(e) {
          this.handlers.push(e)
      }
  }, {
      key: "del",
      value: function(e) {
          e || (this.handlers = []);
          for (var t = this.handlers.length; 0 <= t; t--) this.handlers[t] === e && this.handlers.splice(t, 1)
      }
  }, {
      key: "dispatch",
      value: function() {
          for (var e = 0, t = this.handlers.length; e < t; e++) {
              var i = this.handlers[e];
              "function" == typeof i && i.apply(this.el, arguments)
          }
      }
  }]);
  var N = i;

  function i(e) {
      r(this, i), this.handlers = [], this.el = e
  }

  function s(e, t) {
      e = new N(e);
      return e.add(t), e
  }
  e(a, [{
      key: "start",
      value: function(e) {
          var t, i;
          e.touches && (e.target && e.target.nodeName && 0 <= ["a", "button", "input"].indexOf(e.target.nodeName.toLowerCase()) ? console.log("ignore drag for this touched element", e.target.nodeName.toLowerCase()) : (this.now = Date.now(), this.x1 = e.touches[0].pageX, this.y1 = e.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = 0 < this.delta && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap) && clearTimeout(this.singleTapTimeout), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now, t = this.preV, 1 < e.touches.length && (this._cancelLongTap(), this._cancelSingleTap(), i = {
              x: e.touches[1].pageX - this.x1,
              y: e.touches[1].pageY - this.y1
          }, t.x = i.x, t.y = i.y, this.pinchStartLen = p(t), this.multipointStart.dispatch(e, this.element)), this._preventTap = !1, this.longTapTimeout = setTimeout(function() {
              this.longTap.dispatch(e, this.element), this._preventTap = !0
          }.bind(this), 750)))
      }
  }, {
      key: "move",
      value: function(e) {
          var t, i, n, s, a, r, o, l, c, d, u, h;
          e.touches && (t = this.preV, i = e.touches.length, n = e.touches[0].pageX, s = e.touches[0].pageY, this.isDoubleTap = !1, 1 < i ? (a = e.touches[1].pageX, r = e.touches[1].pageY, o = {
              x: e.touches[1].pageX - n,
              y: e.touches[1].pageY - s
          }, null !== t.x && (0 < this.pinchStartLen && (e.zoom = p(o) / this.pinchStartLen, this.pinch.dispatch(e, this.element)), e.angle = (h = c = t, h = 0 == (u = p(d = l = o) * p(h)) ? 0 : (1 < (d = (d.x * h.x + d.y * h.y) / u) && (d = 1), Math.acos(d)), 0 < l.x * c.y - c.x * l.y && (h *= -1), 180 * h / Math.PI), this.rotate.dispatch(e, this.element)), t.x = o.x, t.y = o.y, null !== this.x2 && null !== this.sx2 ? (e.deltaX = (n - this.x2 + a - this.sx2) / 2, e.deltaY = (s - this.y2 + r - this.sy2) / 2) : (e.deltaX = 0, e.deltaY = 0), this.twoFingerPressMove.dispatch(e, this.element), this.sx2 = a, this.sy2 = r) : (null !== this.x2 ? (e.deltaX = n - this.x2, e.deltaY = s - this.y2, u = Math.abs(this.x1 - this.x2), d = Math.abs(this.y1 - this.y2), (10 < u || 10 < d) && (this._preventTap = !0)) : (e.deltaX = 0, e.deltaY = 0), this.pressMove.dispatch(e, this.element)), this.touchMove.dispatch(e, this.element), this._cancelLongTap(), this.x2 = n, this.y2 = s, 1 < i) && e.preventDefault()
      }
  }, {
      key: "end",
      value: function(e) {
          var t;
          e.changedTouches && (this._cancelLongTap(), t = this, e.touches.length < 2 && (this.multipointEnd.dispatch(e, this.element), this.sx2 = this.sy2 = null), this.x2 && 30 < Math.abs(this.x1 - this.x2) || this.y2 && 30 < Math.abs(this.y1 - this.y2) ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function() {
              t.swipe.dispatch(e, t.element)
          }, 0)) : (this.tapTimeout = setTimeout(function() {
              t._preventTap || t.tap.dispatch(e, t.element), t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), t.isDoubleTap = !1)
          }, 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout(function() {
              t.singleTap.dispatch(e, t.element)
          }, 250))), this.touchEnd.dispatch(e, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null)
      }
  }, {
      key: "cancelAll",
      value: function() {
          this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout)
      }
  }, {
      key: "cancel",
      value: function(e) {
          this.cancelAll(), this.touchCancel.dispatch(e, this.element)
      }
  }, {
      key: "_cancelLongTap",
      value: function() {
          clearTimeout(this.longTapTimeout)
      }
  }, {
      key: "_cancelSingleTap",
      value: function() {
          clearTimeout(this.singleTapTimeout)
      }
  }, {
      key: "_swipeDirection",
      value: function(e, t, i, n) {
          return Math.abs(e - t) >= Math.abs(i - n) ? 0 < e - t ? "Left" : "Right" : 0 < i - n ? "Up" : "Down"
      }
  }, {
      key: "on",
      value: function(e, t) {
          this[e] && this[e].add(t)
      }
  }, {
      key: "off",
      value: function(e, t) {
          this[e] && this[e].del(t)
      }
  }, {
      key: "destroy",
      value: function() {
          return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null
      }
  }]);
  var V = a;

  function a(e, t) {
      r(this, a), this.element = "string" == typeof e ? document.querySelector(e) : e, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
          x: null,
          y: null
      }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;

      function i() {}
      this.rotate = s(this.element, t.rotate || i), this.touchStart = s(this.element, t.touchStart || i), this.multipointStart = s(this.element, t.multipointStart || i), this.multipointEnd = s(this.element, t.multipointEnd || i), this.pinch = s(this.element, t.pinch || i), this.swipe = s(this.element, t.swipe || i), this.tap = s(this.element, t.tap || i), this.doubleTap = s(this.element, t.doubleTap || i), this.longTap = s(this.element, t.longTap || i), this.singleTap = s(this.element, t.singleTap || i), this.pressMove = s(this.element, t.pressMove || i), this.twoFingerPressMove = s(this.element, t.twoFingerPressMove || i), this.touchMove = s(this.element, t.touchMove || i), this.touchEnd = s(this.element, t.touchEnd || i), this.touchCancel = s(this.element, t.touchCancel || i), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
          x: null,
          y: null
      }
  }

  function Y(e) {
      var t = function() {
              var e, t = document.createElement("fakeelement"),
                  i = {
                      transition: "transitionend",
                      OTransition: "oTransitionEnd",
                      MozTransition: "transitionend",
                      WebkitTransition: "webkitTransitionEnd"
                  };
              for (e in i)
                  if (void 0 !== t.style[e]) return i[e]
          }(),
          i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
          n = P(e, "gslide-media") ? e : e.querySelector(".gslide-media"),
          s = j(n, ".ginner-container"),
          e = e.querySelector(".gslide-description");
      L(n = 769 < i ? s : n, "greset"), z(n, "translate3d(0, 0, 0)"), I(t, {
          onElement: n,
          once: !0,
          withCallback: function(e, t) {
              $(n, "greset")
          }
      }), n.style.opacity = "", e && (e.style.opacity = "")
  }
  e(m, [{
      key: "zoomIn",
      value: function() {
          var e, t = this.widowWidth();
          this.zoomedIn || t <= 768 || ((e = this.img).setAttribute("data-style", e.getAttribute("style")), e.style.maxWidth = e.naturalWidth + "px", e.style.maxHeight = e.naturalHeight + "px", e.naturalWidth > t && (t = t / 2 - e.naturalWidth / 2, this.setTranslate(this.img.parentNode, t, 0)), this.slide.classList.add("zoomed"), this.zoomedIn = !0)
      }
  }, {
      key: "zoomOut",
      value: function() {
          this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose()
      }
  }, {
      key: "dragStart",
      value: function(e) {
          e.preventDefault(), this.zoomedIn ? ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), e.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1
      }
  }, {
      key: "dragEnd",
      value: function(e) {
          var t = this;
          e.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function() {
              t.dragging = !1, t.img.isDragging = !1, t.img.classList.remove("dragging")
          }, 100)
      }
  }, {
      key: "drag",
      value: function(e) {
          this.active && (e.preventDefault(), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY))
      }
  }, {
      key: "onMove",
      value: function(e) {
          var t;
          this.zoomedIn && (t = e.clientX - this.img.naturalWidth / 2, e = e.clientY - this.img.naturalHeight / 2, this.setTranslate(this.img, t, e))
      }
  }, {
      key: "setTranslate",
      value: function(e, t, i) {
          e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)"
      }
  }, {
      key: "widowWidth",
      value: function() {
          return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      }
  }]);
  var O = m,
      D = (e(u, [{
          key: "dragStart",
          value: function(e) {
              var t;
              this.slide.classList.contains("zoomed") || ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), t = e.target.nodeName.toLowerCase(), e.target.classList.contains("nodrag")) || j(e.target, ".nodrag") || -1 !== ["input", "select", "textarea", "button", "a"].indexOf(t) ? this.active = !1 : (e.preventDefault(), (e.target === this.el || "img" !== t && j(e.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = j(e.target, ".ginner-container")))
          }
      }, {
          key: "dragEnd",
          value: function(e) {
              var t = this;
              e && e.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, "right" == this.doSlideChange && this.instance.prevSlide(), "left" == this.doSlideChange) && this.instance.nextSlide(), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(function() {
                  t.instance.preventOutsideClick = !1, t.toleranceReached = !1, t.lastDirection = null, t.dragging = !1, t.el.isDragging = !1, t.el.classList.remove("dragging"), t.slide.classList.remove("dragging-nav"), t.dragContainer.style.transform = "", t.dragContainer.style.transition = ""
              }, 100)
          }
      }, {
          key: "drag",
          value: function(e) {
              if (this.active) {
                  e.preventDefault(), this.slide.classList.add("dragging-nav"), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
                  var e = Math.abs(this.currentX),
                      t = Math.abs(this.currentY);
                  if (0 < e && e >= Math.abs(this.currentY) && (!this.lastDirection || "x" == this.lastDirection)) {
                      this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
                      var i = this.shouldChange();
                      if (!this.instance.settings.dragAutoSnap && i && (this.doSlideChange = i), this.instance.settings.dragAutoSnap && i) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), "right" == i && this.instance.prevSlide(), void("left" == i && this.instance.nextSlide())
                  }
                  0 < this.toleranceY && 0 < t && e <= t && (!this.lastDirection || "y" == this.lastDirection) && (this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY), i = this.shouldClose(), !this.instance.settings.dragAutoSnap && i && (this.doSlideClose = !0), this.instance.settings.dragAutoSnap) && i && this.instance.close()
              }
          }
      }, {
          key: "shouldChange",
          value: function() {
              var e, t = !1;
              return t = Math.abs(this.currentX) >= this.toleranceX && ("left" == (e = 0 < this.currentX ? "right" : "left") && this.slide !== this.slide.parentNode.lastChild || "right" == e && this.slide !== this.slide.parentNode.firstChild) ? e : t
          }
      }, {
          key: "shouldClose",
          value: function() {
              var e = !1;
              return e = Math.abs(this.currentY) >= this.toleranceY ? !0 : e
          }
      }, {
          key: "setTranslate",
          value: function(e, t, i) {
              e.style.transition = 3 < arguments.length && void 0 !== arguments[3] && arguments[3] ? "all .2s ease" : "", e.style.transform = "translate3d(".concat(t, "px, ").concat(i, "px, 0)")
          }
      }]), u);

  function u() {
      var t = this,
          e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          i = (r(this, u), e.dragEl),
          n = e.toleranceX,
          n = void 0 === n ? 40 : n,
          s = e.toleranceY,
          s = void 0 === s ? 65 : s,
          a = e.slide,
          a = void 0 === a ? null : a,
          e = e.instance,
          e = void 0 === e ? null : e;
      this.el = i, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = n, this.toleranceY = s, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = a, this.instance = e, this.el.addEventListener("mousedown", function(e) {
          return t.dragStart(e)
      }, !1), this.el.addEventListener("mouseup", function(e) {
          return t.dragEnd(e)
      }, !1), this.el.addEventListener("mousemove", function(e) {
          return t.drag(e)
      }, !1)
  }

  function m(e, t) {
      var i = this,
          n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (r(this, m), this.img = e, this.slide = t, this.onclose = n, this.img.setZoomEvents) return !1;
      this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function(e) {
          return i.dragStart(e)
      }, !1), this.img.addEventListener("mouseup", function(e) {
          return i.dragEnd(e)
      }, !1), this.img.addEventListener("mousemove", function(e) {
          return i.drag(e)
      }, !1), this.img.addEventListener("click", function(e) {
          return i.slide.classList.contains("dragging-nav") ? (i.zoomOut(), !1) : i.zoomedIn ? void(i.zoomedIn && !i.dragging && i.zoomOut()) : i.zoomIn()
      }, !1), this.img.setZoomEvents = !0
  }

  function X(e) {
      var t = j(e.target, ".gslide-media");
      "enterfullscreen" === e.type && L(t, "fullscreen"), "exitfullscreen" === e.type && $(t, "fullscreen")
  }
  e(x, [{
      key: "sourceType",
      value: function(e) {
          var t = e;
          return null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) ? "image" : e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || null !== e.match(/\.(mp4|ogg|webm|mov)/) ? "video" : null !== e.match(/\.(mp3|wav|wma|aac|ogg)/) ? "audio" : -1 < e.indexOf("#") && "" !== t.split("#").pop().trim() ? "inline" : -1 < e.indexOf("goajax=true") ? "ajax" : "external"
      }
  }, {
      key: "parseConfig",
      value: function(n, s) {
          var a = this,
              r = c({
                  descPosition: s.descPosition
              }, this.defaults);
          if (d(n) && !F(n)) return w(n, "type") || (w(n, "content") && n.content ? n.type = "inline" : w(n, "href") && (n.type = this.sourceType(n.href))), t = c(r, n), this.setSize(t, s), t;
          var o, e, t = "",
              l = n.getAttribute("data-glightbox"),
              i = n.nodeName.toLowerCase();
          if ("a" === i && (t = n.href), "img" === i && (t = n.src, r.alt = n.alt), r.href = t, h(r, function(e, t) {
                  w(s, t) && "width" !== t && (r[t] = s[t]);
                  var i = n.dataset[t];
                  H(i) || (r[t] = a.sanitizeValue(i))
              }), r.content && (r.type = "inline"), !r.type && t && (r.type = this.sourceType(t)), H(l) ? (r.title || "a" != i || H(t = n.title) || "" === t || (r.title = t), r.title || "img" != i || H(t = n.alt) || "" === t || (r.title = t)) : (o = [], h(r, function(e, t) {
                  o.push(";\\s?" + t)
              }), o = o.join("\\s?:|"), "" !== l.trim() && h(r, function(e, t) {
                  var i = l,
                      n = new RegExp("s?" + t + "s?:s?(.*?)(" + o + "s?:|$)"),
                      i = i.match(n);
                  i && i.length && i[1] && (n = i[1].trim().replace(/;\s*$/, ""), r[t] = a.sanitizeValue(n))
              })), r.description && "." === r.description.substring(0, 1)) {
              try {
                  e = document.querySelector(r.description).innerHTML
              } catch (n) {
                  if (!(n instanceof DOMException)) throw n
              }
              e && (r.description = e)
          }
          return r.description || (i = n.querySelector(".glightbox-desc")) && (r.description = i.innerHTML), this.setSize(r, s, n), this.slideConfig = r
      }
  }, {
      key: "setSize",
      value: function(e, t) {
          var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
              n = "video" == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width),
              t = this.checkSize(t.height);
          return e.width = w(e, "width") && "" !== e.width ? this.checkSize(e.width) : n, e.height = w(e, "height") && "" !== e.height ? this.checkSize(e.height) : t, i && "image" == e.type && (e._hasCustomWidth = !!i.dataset.width, e._hasCustomHeight = !!i.dataset.height), e
      }
  }, {
      key: "checkSize",
      value: function(e) {
          return q(e) ? "".concat(e, "px") : e
      }
  }, {
      key: "sanitizeValue",
      value: function(e) {
          return "true" !== e && "false" !== e ? e : "true" === e
      }
  }]);
  var G = x,
      g = (e(E, [{
          key: "setContent",
          value: function() {
              var t = this,
                  i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
                  e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
              if (P(i, "loaded")) return !1;
              var n, s = this.instance.settings,
                  a = this.slideConfig,
                  r = v(),
                  o = (B(s.beforeSlideLoad) && s.beforeSlideLoad({
                      index: this.index,
                      slide: i,
                      player: !1
                  }), a.type),
                  l = a.descPosition,
                  c = i.querySelector(".gslide-media"),
                  d = i.querySelector(".gslide-title"),
                  u = i.querySelector(".gslide-desc"),
                  h = i.querySelector(".gdesc-inner"),
                  p = e,
                  m = "gSlideTitle_" + this.index,
                  g = "gSlideDesc_" + this.index;
              if (B(s.afterSlideLoad) && (p = function() {
                      B(e) && e(), s.afterSlideLoad({
                          index: t.index,
                          slide: i,
                          player: t.instance.getSlidePlayerInstance(t.index)
                      })
                  }), "" == a.title && "" == a.description ? h && h.parentNode.parentNode.removeChild(h.parentNode) : (d && "" !== a.title ? (d.id = m, d.innerHTML = a.title) : d.parentNode.removeChild(d), u && "" !== a.description ? (u.id = g, r && 0 < s.moreLength ? (a.smallDescription = this.slideShortDesc(a.description, s.moreLength, s.moreText), u.innerHTML = a.smallDescription, this.descriptionEvents(u, a)) : u.innerHTML = a.description) : u.parentNode.removeChild(u), L(c.parentNode, "desc-".concat(l)), L(h.parentNode, "description-".concat(l))), L(c, "gslide-".concat(o)), L(i, "loaded"), "video" !== o) {
                  if ("external" !== o) return "inline" === o ? (function(e, t, i, n) {
                      var s, a = this,
                          e = e.querySelector(".gslide-media"),
                          r = !(!w(t, "href") || !t.href) && t.href.split("#").pop().trim(),
                          o = !(!w(t, "content") || !t.content) && t.content;
                      if (o && (y(o) && (s = f('<div class="ginlined-content">'.concat(o, "</div>"))), F(o)) && ("none" == o.style.display && (o.style.display = "block"), (l = document.createElement("div")).className = "ginlined-content", l.appendChild(o), s = l), r) {
                          o = document.getElementById(r);
                          if (!o) return !1;
                          var l = o.cloneNode(!0);
                          l.style.height = t.height, l.style.maxWidth = t.width, L(l, "ginlined-content"), s = l
                      }
                      if (!s) return console.error("Unable to append inline slide content", t), !1;
                      e.style.height = t.height, e.style.width = t.width, e.appendChild(s), this.events["inlineclose" + r] = I("click", {
                          onElement: e.querySelectorAll(".gtrigger-close"),
                          withCallback: function(e) {
                              e.preventDefault(), a.close()
                          }
                      }), B(n) && n()
                  }.apply(this.instance, [i, a, this.index, p]), void(a.draggable && new D({
                      dragEl: i.querySelector(".gslide-inline"),
                      toleranceX: s.dragToleranceX,
                      toleranceY: s.dragToleranceY,
                      slide: i,
                      instance: this.instance
                  }))) : void("image" !== o ? B(p) && p() : (m = i, d = a, g = this.index, n = function() {
                      var e = i.querySelector("img");
                      a.draggable && new D({
                          dragEl: e,
                          toleranceX: s.dragToleranceX,
                          toleranceY: s.dragToleranceY,
                          slide: i,
                          instance: t.instance
                      }), a.zoomable && e.naturalWidth > e.offsetWidth && (L(e, "zoomable"), new O(e, i, function() {
                          t.instance.resize()
                      })), B(p) && p()
                  }, m = m.querySelector(".gslide-media"), r = new Image, u = "gSlideTitle_" + g, g = "gSlideDesc_" + g, r.addEventListener("load", function() {
                      B(n) && n()
                  }, !1), r.src = d.href, "" != d.sizes && "" != d.srcset && (r.sizes = d.sizes, r.srcset = d.srcset), r.alt = "", H(d.alt) || "" === d.alt || (r.alt = d.alt), "" !== d.title && r.setAttribute("aria-labelledby", u), "" !== d.description && r.setAttribute("aria-describedby", g), d.hasOwnProperty("_hasCustomWidth") && d._hasCustomWidth && (r.style.width = d.width), d.hasOwnProperty("_hasCustomHeight") && d._hasCustomHeight && (r.style.height = d.height), m.insertBefore(r, m.firstChild)));
                  ! function(e, t, i, n) {
                      var s, a, r, e = e.querySelector(".gslide-media"),
                          o = (n = {
                              url: t.href,
                              callback: n
                          }, o = n.url, s = n.allow, a = n.callback, n = n.appendTo, (r = document.createElement("iframe")).className = "vimeo-video gvideo", r.src = o, r.style.width = "100%", r.style.height = "100%", s && r.setAttribute("allow", s), r.onload = function() {
                              r.onload = null, L(r, "node-ready"), B(a) && a()
                          }, n && n.appendChild(r), r);
                      e.parentNode.style.maxWidth = t.width, e.parentNode.style.height = t.height, e.appendChild(o)
                  }.apply(this, [i, a, this.index, p])
              } else ! function(t, i, n, s) {
                  var a = this,
                      e = t.querySelector(".ginner-container"),
                      r = "gvideo" + n,
                      o = t.querySelector(".gslide-media"),
                      l = this.getAllPlayers(),
                      c = (L(e, "gvideo-container"), o.insertBefore(f('<div class="gvideo-wrapper"></div>'), o.firstChild), t.querySelector(".gvideo-wrapper")),
                      d = (S(this.settings.plyr.css, "Plyr"), i.href),
                      u = null == i ? void 0 : i.videoProvider,
                      h = !1;
                  o.style.maxWidth = i.width, S(this.settings.plyr.js, "Plyr", function() {
                      "local" !== (u = !(u = !u && d.match(/vimeo\.com\/([0-9]*)/) ? "vimeo" : u) && (d.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || d.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || d.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) ? "youtube" : u) && u || (u = "local", e = (e = (e = '<video id="' + r + '" ') + 'style="background:#000; max-width: '.concat(i.width, ';" ') + 'preload="metadata" x-webkit-airplay="allow" playsinline controls class="gvideo-local">') + '<source src="'.concat(d, '">'), h = f(e += "</video>"));
                      var e = h || f('<div id="'.concat(r, '" data-plyr-provider="').concat(u, '" data-plyr-embed-id="').concat(d, '"></div>')),
                          e = (L(c, "".concat(u, "-video gvideo")), c.appendChild(e), c.setAttribute("data-id", r), c.setAttribute("data-index", n), w(a.settings.plyr, "config") ? a.settings.plyr.config : {}),
                          e = new Plyr("#" + r, e);
                      e.on("ready", function(e) {
                          l[r] = e.detail.plyr, B(s) && s()
                      }), b(function() {
                          return t.querySelector("iframe") && "true" == t.querySelector("iframe").dataset.ready
                      }, function() {
                          a.resize(t)
                      }), e.on("enterfullscreen", X), e.on("exitfullscreen", X)
                  })
              }.apply(this.instance, [i, a, this.index, p])
          }
      }, {
          key: "slideShortDesc",
          value: function(e) {
              var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 50,
                  i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                  n = document.createElement("div");
              n.innerHTML = e;
              var s = i;
              return !((e = n.innerText.trim()).length <= t) && (e = e.substr(0, t - 1), s) ? (n = null, e + '... <a href="#" class="desc-more">' + i + "</a>") : e
          }
      }, {
          key: "descriptionEvents",
          value: function(e, a) {
              var r = this,
                  e = e.querySelector(".desc-more");
              if (!e) return !1;
              I("click", {
                  onElement: e,
                  withCallback: function(e, t) {
                      e.preventDefault();
                      var i = document.body,
                          n = j(t, ".gslide-desc");
                      if (!n) return !1;
                      n.innerHTML = a.description, L(i, "gdesc-open");
                      var s = I("click", {
                          onElement: [i, j(n, ".gslide-description")],
                          withCallback: function(e, t) {
                              "a" !== e.target.nodeName.toLowerCase() && ($(i, "gdesc-open"), L(i, "gdesc-closed"), n.innerHTML = a.smallDescription, r.descriptionEvents(n, a), setTimeout(function() {
                                  $(i, "gdesc-closed")
                              }, 400), s.destroy())
                          }
                      })
                  }
              })
          }
      }, {
          key: "create",
          value: function() {
              return f(this.instance.settings.slideHTML)
          }
      }, {
          key: "getConfig",
          value: function() {
              F(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
              var e = new G(this.instance.settings.slideExtraAttributes);
              return this.slideConfig = e.parseConfig(this.element, this.instance.settings), this.slideConfig
          }
      }]), E),
      K = v(),
      Z = null !== v() || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
      Q = document.getElementsByTagName("html")[0],
      J = {
          selector: ".glightbox",
          elements: null,
          skin: "clean",
          theme: "clean",
          closeButton: !0,
          startAt: null,
          autoplayVideos: !0,
          autofocusVideos: !0,
          descPosition: "bottom",
          width: "900px",
          height: "506px",
          videosWidth: "960px",
          beforeSlideChange: null,
          afterSlideChange: null,
          beforeSlideLoad: null,
          afterSlideLoad: null,
          slideInserted: null,
          slideRemoved: null,
          slideExtraAttributes: null,
          onOpen: null,
          onClose: null,
          loop: !1,
          zoomable: !0,
          draggable: !0,
          dragAutoSnap: !1,
          dragToleranceX: 40,
          dragToleranceY: 65,
          preload: !0,
          oneSlidePerOpen: !1,
          touchNavigation: !0,
          touchFollowAxis: !0,
          keyboardNavigation: !0,
          closeOnOutsideClick: !0,
          plugins: !1,
          plyr: {
              css: "https://cdn.plyr.io/3.6.12/plyr.css",
              js: "https://cdn.plyr.io/3.6.12/plyr.js",
              config: {
                  ratio: "16:9",
                  fullscreen: {
                      enabled: !0,
                      iosNative: !0
                  },
                  youtube: {
                      noCookie: !0,
                      rel: 0,
                      showinfo: 0,
                      iv_load_policy: 3
                  },
                  vimeo: {
                      byline: !1,
                      portrait: !1,
                      title: !1,
                      transparent: !1
                  }
              }
          },
          openEffect: "zoom",
          closeEffect: "zoom",
          slideEffect: "slide",
          moreText: "See more",
          moreLength: 60,
          cssEfects: {
              fade: { in: "fadeIn",
                  out: "fadeOut"
              },
              zoom: { in: "zoomIn",
                  out: "zoomOut"
              },
              slide: { in: "slideInRight",
                  out: "slideOutLeft"
              },
              slideBack: { in: "slideInLeft",
                  out: "slideOutRight"
              },
              none: { in: "none",
                  out: "none"
              }
          },
          svg: {
              close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
              next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
              prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
          },
          slideHTML: '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
          lightboxHTML: '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>'
      },
      ee = (e(_, [{
          key: "init",
          value: function() {
              var i = this,
                  e = this.getSelector();
              e && (this.baseEvents = I("click", {
                  onElement: e,
                  withCallback: function(e, t) {
                      e.preventDefault(), i.open(t)
                  }
              })), this.elements = this.getElements()
          }
      }, {
          key: "open",
          value: function() {
              var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
                  t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
              if (0 === this.elements.length) return !1;
              this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
              var i, a, n, s, r, o, l, c, d, u, h, p, m, g, f, b, v, y, w, _, E, x, C, T, S, k, M, A, N, O, t = q(t) ? t : this.settings.startAt,
                  D = (q(t = F(e) && ((D = e.getAttribute("data-gallery")) && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, D)), H(t)) && (t = this.getElementIndex(e)) < 0 ? 0 : t) || (t = 0), this.build(), R(this.overlay, "none" === this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in), document.body),
                  e = window.innerWidth - document.documentElement.clientWidth;
              0 < e && ((i = document.createElement("style")).type = "text/css", i.className = "gcss-styles", i.innerText = ".gscrollbar-fixer {margin-right: ".concat(e, "px}"), document.head.appendChild(i), L(D, "gscrollbar-fixer")), L(D, "glightbox-open"), L(Q, "glightbox-open"), K && (L(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(t, !0), (1 === this.elements.length ? (L(this.prevButton, "glightbox-button-hidden"), L) : ($(this.prevButton, "glightbox-button-hidden"), $))(this.nextButton, "glightbox-button-hidden"), this.lightboxOpen = !0, this.trigger("open"), B(this.settings.onOpen) && this.settings.onOpen(), Z && this.settings.touchNavigation && ((n = this).events.hasOwnProperty("touch") || (e = W(), l = e.width, c = e.height, m = d = !1, E = _ = w = y = p = h = u = null, S = T = v = b = !(f = g = 1), k = {}, M = {}, N = A = C = x = 0, e = document.getElementById("glightbox-slider"), O = document.querySelector(".goverlay"), e = new V(e, {
                  touchStart: function(e) {
                      d = !0, (P(e.targetTouches[0].target, "ginner-container") || j(e.targetTouches[0].target, ".gslide-desc") || "a" == e.targetTouches[0].target.nodeName.toLowerCase()) && (d = !1), (d = !(j(e.targetTouches[0].target, ".gslide-inline") && !P(e.targetTouches[0].target.parentNode, "gslide-inline")) && d) && (M = e.targetTouches[0], k.pageX = e.targetTouches[0].pageX, k.pageY = e.targetTouches[0].pageY, A = e.targetTouches[0].clientX, N = e.targetTouches[0].clientY, u = n.activeSlide, h = u.querySelector(".gslide-media"), o = u.querySelector(".gslide-inline"), p = null, P(h, "gslide-image") && (p = h.querySelector("img")), 769 < (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) && (h = u.querySelector(".ginner-container")), $(O, "greset"), 20 < e.pageX && e.pageX < window.innerWidth - 20 || e.preventDefault())
                  },
                  touchMove: function(e) {
                      if (d && (M = e.targetTouches[0], !b) && !v) {
                          if (o && o.offsetHeight > c) {
                              var t = k.pageX - M.pageX;
                              if (Math.abs(t) <= 13) return !1
                          }
                          m = !0;
                          var i, t = e.targetTouches[0].clientX,
                              e = e.targetTouches[0].clientY,
                              t = A - t,
                              e = N - e;
                          if (Math.abs(t) > Math.abs(e) ? S = !(T = !1) : T = !(S = !1), s = M.pageX - k.pageX, x = 100 * s / l, r = M.pageY - k.pageY, C = 100 * r / c, T && p && (i = 1 - Math.abs(r) / c, O.style.opacity = i, n.settings.touchFollowAxis) && (x = 0), S && (i = 1 - Math.abs(s) / l, h.style.opacity = i, n.settings.touchFollowAxis) && (C = 0), !p) return z(h, "translate3d(".concat(x, "%, 0, 0)"));
                          z(h, "translate3d(".concat(x, "%, ").concat(C, "%, 0)"))
                      }
                  },
                  touchEnd: function() {
                      if (d) {
                          var e, t;
                          if (m = !1, !v && !b) return e = Math.abs(parseInt(C)), t = Math.abs(parseInt(x)), 29 < e && p ? void n.close() : e < 29 && t < 25 ? (L(O, "greset"), O.style.opacity = 1, Y(h)) : void 0;
                          _ = y, E = w
                      }
                  },
                  multipointEnd: function() {
                      setTimeout(function() {
                          b = !1
                      }, 50)
                  },
                  multipointStart: function() {
                      b = !0, g = f || 1
                  },
                  pinch: function(e) {
                      if (!p || m) return !1;
                      b = !0, p.scaleX = p.scaleY = g * e.zoom;
                      e = g * e.zoom;
                      v = !0, e <= 1 ? (v = !1, e = 1, w = y = _ = E = null, p.setAttribute("style", "")) : (p.style.transform = "scale3d(".concat(e = 4.5 < e ? 4.5 : e, ", ").concat(e, ", 1)"), f = e)
                  },
                  pressMove: function(e) {
                      var t, i;
                      v && !b && (i = M.pageX - k.pageX, t = M.pageY - k.pageY, _ && (i += _), E && (t += E), y = i, w = t, i = "translate3d(".concat(i, "px, ").concat(t, "px, 0)"), f && (i += " scale3d(".concat(f, ", ").concat(f, ", 1)")), z(p, i))
                  },
                  swipe: function(e) {
                      if (!v)
                          if (b) b = !1;
                          else {
                              if ("Left" == e.direction) {
                                  if (n.index == n.elements.length - 1) return Y(h);
                                  n.nextSlide()
                              }
                              if ("Right" == e.direction) {
                                  if (0 == n.index) return Y(h);
                                  n.prevSlide()
                              }
                          }
                  }
              }), n.events.touch = e)), !this.settings.keyboardNavigation || (a = this).events.hasOwnProperty("keyboard") || (a.events.keyboard = I("keydown", {
                  onElement: window,
                  withCallback: function(e, t) {
                      var i = (e = e || window.event).keyCode;
                      if (9 == i) {
                          var n = document.querySelector(".gbtn.focused");
                          if (!n) {
                              var s = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
                              if ("input" == s || "textarea" == s || "button" == s) return
                          }
                          e.preventDefault();
                          s = document.querySelectorAll(".gbtn[data-taborder]");
                          if (!s || s.length <= 0) return;
                          if (!n) return void((e = U()) && (e.focus(), L(e, "focused")));
                          s = U(n.getAttribute("data-taborder"));
                          $(n, "focused"), s && (s.focus(), L(s, "focused"))
                      }
                      39 == i && a.nextSlide(), 37 == i && a.prevSlide(), 27 == i && a.close()
                  }
              }))
          }
      }, {
          key: "openAt",
          value: function() {
              this.open(null, 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0)
          }
      }, {
          key: "showSlide",
          value: function() {
              var e, t = this,
                  i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                  n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                  s = (T(this.loader), this.index = parseInt(i), this.slidesContainer.querySelector(".current")),
                  a = (s && $(s, "current"), this.slideAnimateOut(), this.slidesContainer.querySelectorAll(".gslide")[i]);
              P(a, "loaded") ? (this.slideAnimateIn(a, n), l(this.loader)) : (T(this.loader), s = this.elements[i], e = {
                  index: this.index,
                  slide: a,
                  slideNode: a,
                  slideConfig: s.slideConfig,
                  slideIndex: this.index,
                  trigger: s.node,
                  player: null
              }, this.trigger("slide_before_load", e), s.instance.setContent(a, function() {
                  l(t.loader), t.resize(), t.slideAnimateIn(a, n), t.trigger("slide_after_load", e)
              })), this.slideDescription = a.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && P(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(i + 1), this.preloadSlide(i - 1)), this.updateNavigationClasses(), this.activeSlide = a
          }
      }, {
          key: "preloadSlide",
          value: function(e) {
              var t, i, n, s, a = this;
              return !(e < 0 || e > this.elements.length - 1 || H(this.elements[e]) || P(t = this.slidesContainer.querySelectorAll(".gslide")[e], "loaded")) && (n = (i = this.elements[e]).type, s = {
                  index: e,
                  slide: t,
                  slideNode: t,
                  slideConfig: i.slideConfig,
                  slideIndex: e,
                  trigger: i.node,
                  player: null
              }, this.trigger("slide_before_load", s), void("video" === n || "external" === n ? setTimeout(function() {
                  i.instance.setContent(t, function() {
                      a.trigger("slide_after_load", s)
                  })
              }, 200) : i.instance.setContent(t, function() {
                  a.trigger("slide_after_load", s)
              })))
          }
      }, {
          key: "prevSlide",
          value: function() {
              this.goToSlide(this.index - 1)
          }
      }, {
          key: "nextSlide",
          value: function() {
              this.goToSlide(this.index + 1)
          }
      }, {
          key: "goToSlide",
          value: function() {
              var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
              if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e < 0 || e > this.elements.length - 1)) return !1;
              e < 0 ? e = this.elements.length - 1 : e >= this.elements.length && (e = 0), this.showSlide(e)
          }
      }, {
          key: "insertSlide",
          value: function() {
              var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                  t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : -1,
                  e = (t < 0 && (t = this.elements.length), new g(e, this, t)),
                  i = e.getConfig(),
                  n = c({}, i),
                  s = e.create(),
                  a = this.elements.length - 1,
                  e = (n.index = t, n.node = !1, n.instance = e, n.slideConfig = i, this.elements.splice(t, 0, n), null),
                  r = null;
              this.slidesContainer && (a < t ? this.slidesContainer.appendChild(s) : (a = this.slidesContainer.querySelectorAll(".gslide")[t], this.slidesContainer.insertBefore(s, a)), (this.settings.preload && 0 == this.index && 0 == t || this.index - 1 == t || this.index + 1 == t) && this.preloadSlide(t), 0 === this.index && 0 === t && (this.index = 1), this.updateNavigationClasses(), e = this.slidesContainer.querySelectorAll(".gslide")[t], r = this.getSlidePlayerInstance(t), n.slideNode = e), this.trigger("slide_inserted", {
                  index: t,
                  slide: e,
                  slideNode: e,
                  slideConfig: i,
                  slideIndex: t,
                  trigger: null,
                  player: r
              }), B(this.settings.slideInserted) && this.settings.slideInserted({
                  index: t,
                  slide: e,
                  player: r
              })
          }
      }, {
          key: "removeSlide",
          value: function() {
              var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : -1;
              if (e < 0 || e > this.elements.length - 1) return !1;
              var t = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e];
              t && (this.getActiveSlideIndex() == e && (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t.parentNode.removeChild(t)), this.elements.splice(e, 1), this.trigger("slide_removed", e), B(this.settings.slideRemoved) && this.settings.slideRemoved(e)
          }
      }, {
          key: "slideAnimateIn",
          value: function(e, t) {
              var i = this,
                  n = e.querySelector(".gslide-media"),
                  s = e.querySelector(".gslide-description"),
                  a = {
                      index: this.prevActiveSlideIndex,
                      slide: this.prevActiveSlide,
                      slideNode: this.prevActiveSlide,
                      slideIndex: this.prevActiveSlide,
                      slideConfig: H(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
                      trigger: H(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
                      player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                  },
                  r = {
                      index: this.index,
                      slide: this.activeSlide,
                      slideNode: this.activeSlide,
                      slideConfig: this.elements[this.index].slideConfig,
                      slideIndex: this.index,
                      trigger: this.elements[this.index].node,
                      player: this.getSlidePlayerInstance(this.index)
                  };
              0 < n.offsetWidth && s && (l(s), s.style.display = ""), $(e, this.effectsClasses), t ? R(e, this.settings.cssEfects[this.settings.openEffect].in, function() {
                  i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
                      prev: a,
                      current: r
                  }), B(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [a, r])
              }) : (s = "none" !== (n = this.settings.slideEffect) ? this.settings.cssEfects[n].in : n, this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (s = this.settings.cssEfects.slideBack.in), R(e, s, function() {
                  i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
                      prev: a,
                      current: r
                  }), B(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [a, r])
              })), setTimeout(function() {
                  i.resize(e)
              }, 100), L(e, "current")
          }
      }, {
          key: "slideAnimateOut",
          value: function() {
              if (!this.prevActiveSlide) return !1;
              var n = this.prevActiveSlide,
                  e = ($(n, this.effectsClasses), L(n, "prev"), this.settings.slideEffect),
                  e = "none" !== e ? this.settings.cssEfects[e].out : e;
              this.slidePlayerPause(n), this.trigger("slide_before_change", {
                  prev: {
                      index: this.prevActiveSlideIndex,
                      slide: this.prevActiveSlide,
                      slideNode: this.prevActiveSlide,
                      slideIndex: this.prevActiveSlideIndex,
                      slideConfig: H(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
                      trigger: H(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
                      player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                  },
                  current: {
                      index: this.index,
                      slide: this.activeSlide,
                      slideNode: this.activeSlide,
                      slideIndex: this.index,
                      slideConfig: this.elements[this.index].slideConfig,
                      trigger: this.elements[this.index].node,
                      player: this.getSlidePlayerInstance(this.index)
                  }
              }), B(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
                  index: this.prevActiveSlideIndex,
                  slide: this.prevActiveSlide,
                  player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
              }, {
                  index: this.index,
                  slide: this.activeSlide,
                  player: this.getSlidePlayerInstance(this.index)
              }]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (e = this.settings.cssEfects.slideBack.out), R(n, e, function() {
                  var e = n.querySelector(".ginner-container"),
                      t = n.querySelector(".gslide-media"),
                      i = n.querySelector(".gslide-description");
                  e.style.transform = "", t.style.transform = "", $(t, "greset"), t.style.opacity = "", i && (i.style.opacity = ""), $(n, "prev")
              })
          }
      }, {
          key: "getAllPlayers",
          value: function() {
              return this.videoPlayers
          }
      }, {
          key: "getSlidePlayerInstance",
          value: function(e) {
              var e = "gvideo" + e,
                  t = this.getAllPlayers();
              return !(!w(t, e) || !t[e]) && t[e]
          }
      }, {
          key: "stopSlideVideo",
          value: function(e) {
              F(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index")), console.log("stopSlideVideo is deprecated, use slidePlayerPause");
              var t = this.getSlidePlayerInstance(e);
              t && t.playing && t.pause()
          }
      }, {
          key: "slidePlayerPause",
          value: function(e) {
              F(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index"));
              var t = this.getSlidePlayerInstance(e);
              t && t.playing && t.pause()
          }
      }, {
          key: "playSlideVideo",
          value: function(e) {
              F(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index")), console.log("playSlideVideo is deprecated, use slidePlayerPlay");
              var t = this.getSlidePlayerInstance(e);
              t && !t.playing && t.play()
          }
      }, {
          key: "slidePlayerPlay",
          value: function(e) {
              var t;
              (!K || null != (t = this.settings.plyr.config) && t.muted) && (F(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index")), t = this.getSlidePlayerInstance(e)) && !t.playing && (t.play(), this.settings.autofocusVideos) && t.elements.container.focus()
          }
      }, {
          key: "setElements",
          value: function(e) {
              var s = this,
                  a = (this.settings.elements = !1, []);
              e && e.length && h(e, function(e, t) {
                  var e = new g(e, s, t),
                      i = e.getConfig(),
                      n = c({}, i);
                  n.slideConfig = i, n.instance = e, n.index = t, a.push(n)
              }), this.elements = a, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length) && (h(this.elements, function() {
                  var e = f(s.settings.slideHTML);
                  s.slidesContainer.appendChild(e)
              }), this.showSlide(0, !0))
          }
      }, {
          key: "getElementIndex",
          value: function(i) {
              var n = !1;
              return h(this.elements, function(e, t) {
                  if (w(e, "node") && e.node == i) return n = t, !0
              }), n
          }
      }, {
          key: "getElements",
          value: function() {
              var a = this,
                  r = [],
                  e = (this.elements = this.elements || [], !H(this.settings.elements) && k(this.settings.elements) && this.settings.elements.length && h(this.settings.elements, function(e, t) {
                      var e = new g(e, a, t),
                          i = e.getConfig(),
                          n = c({}, i);
                      n.node = !1, n.index = t, n.instance = e, n.slideConfig = i, r.push(n)
                  }), !1);
              return (e = this.getSelector() ? document.querySelectorAll(this.getSelector()) : e) && h(e, function(e, t) {
                  var i = new g(e, a, t),
                      n = i.getConfig(),
                      s = c({}, n);
                  s.node = e, s.index = t, s.instance = i, s.slideConfig = n, s.gallery = e.getAttribute("data-gallery"), r.push(s)
              }), r
          }
      }, {
          key: "getGalleryElements",
          value: function(e, t) {
              return e.filter(function(e) {
                  return e.gallery == t
              })
          }
      }, {
          key: "getSelector",
          value: function() {
              return !this.settings.elements && (this.settings.selector && "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector)
          }
      }, {
          key: "getActiveSlide",
          value: function() {
              return this.slidesContainer.querySelectorAll(".gslide")[this.index]
          }
      }, {
          key: "getActiveSlideIndex",
          value: function() {
              return this.index
          }
      }, {
          key: "getAnimationClasses",
          value: function() {
              var e, t, i = [];
              for (e in this.settings.cssEfects) this.settings.cssEfects.hasOwnProperty(e) && (t = this.settings.cssEfects[e], i.push("g".concat(t.in)), i.push("g".concat(t.out)));
              return i.join(" ")
          }
      }, {
          key: "build",
          value: function() {
              var i = this;
              if (this.built) return !1;
              var e = document.body.childNodes,
                  t = [],
                  e = (h(e, function(e) {
                      e.parentNode == document.body && "#" !== e.nodeName.charAt(0) && e.hasAttribute && !e.hasAttribute("aria-hidden") && (t.push(e), e.setAttribute("aria-hidden", "true"))
                  }), w(this.settings.svg, "next") ? this.settings.svg.next : ""),
                  n = w(this.settings.svg, "prev") ? this.settings.svg.prev : "",
                  s = w(this.settings.svg, "close") ? this.settings.svg.close : "",
                  a = f(a = (a = (a = (a = this.settings.lightboxHTML).replace(/{nextSVG}/g, e)).replace(/{prevSVG}/g, n)).replace(/{closeSVG}/g, s)),
                  e = (document.body.appendChild(a), document.getElementById("glightbox-body")),
                  n = (this.modal = e).querySelector(".gclose");
              this.prevButton = e.querySelector(".gprev"), this.nextButton = e.querySelector(".gnext"), this.overlay = e.querySelector(".goverlay"), this.loader = e.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = t, this.events = {}, L(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && n && (this.events.close = I("click", {
                  onElement: n,
                  withCallback: function(e, t) {
                      e.preventDefault(), i.close()
                  }
              })), n && !this.settings.closeButton && n.parentNode.removeChild(n), this.nextButton && (this.events.next = I("click", {
                  onElement: this.nextButton,
                  withCallback: function(e, t) {
                      e.preventDefault(), i.nextSlide()
                  }
              })), this.prevButton && (this.events.prev = I("click", {
                  onElement: this.prevButton,
                  withCallback: function(e, t) {
                      e.preventDefault(), i.prevSlide()
                  }
              })), this.settings.closeOnOutsideClick && (this.events.outClose = I("click", {
                  onElement: e,
                  withCallback: function(e, t) {
                      i.preventOutsideClick || P(document.body, "glightbox-mobile") || j(e.target, ".ginner-container") || j(e.target, ".gbtn") || P(e.target, "gnext") || P(e.target, "gprev") || i.close()
                  }
              })), h(this.elements, function(e, t) {
                  i.slidesContainer.appendChild(e.instance.create()), e.slideNode = i.slidesContainer.querySelectorAll(".gslide")[t]
              }), Z && L(document.body, "glightbox-touch"), this.events.resize = I("resize", {
                  onElement: window,
                  withCallback: function() {
                      i.resize()
                  }
              }), this.built = !0
          }
      }, {
          key: "resize",
          value: function() {
              var e, t, i, n, s, a, r, o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
              (o = o || this.activeSlide) && !P(o, "zoomed") && (i = W(), e = o.querySelector(".gvideo-wrapper"), o = o.querySelector(".gslide-image"), t = this.slideDescription, a = i.width, i = i.height, (a <= 768 ? L : $)(document.body, "glightbox-mobile"), e || o) && (n = !1, t && (P(t, "description-bottom") || P(t, "description-top")) && !P(t, "gabsolute") && (n = !0), o && (a <= 768 ? o.querySelector("img") : n && (s = t.offsetHeight, (o = o.querySelector("img")).setAttribute("style", "max-height: calc(100vh - ".concat(s, "px)")), t.setAttribute("style", "max-width: ".concat(o.offsetWidth, "px;")))), e) && ((s = w(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "") || (o = e.clientWidth, r = e.clientHeight, s = "".concat(o / (o = o / r), ":").concat(r / o)), r = s.split(":"), o = this.settings.videosWidth, s = this.settings.videosWidth, r = (s = q(o) || -1 !== o.indexOf("px") ? parseInt(o) : -1 !== o.indexOf("vw") ? a * parseInt(o) / 100 : -1 !== o.indexOf("vh") ? i * parseInt(o) / 100 : -1 !== o.indexOf("%") ? a * parseInt(o) / 100 : parseInt(e.clientWidth)) / (parseInt(r[0]) / parseInt(r[1])), r = Math.floor(r), n && (i -= t.offsetHeight), a < s || i < r || i < r && s < a ? (r = e.offsetWidth, s = e.offsetHeight, e.parentNode.setAttribute("style", "max-width: ".concat((r = {
                  width: r * (a = i / s),
                  height: s * a
              }).width, "px")), n && t.setAttribute("style", "max-width: ".concat(r.width, "px;"))) : (e.parentNode.style.maxWidth = "".concat(o), n && t.setAttribute("style", "max-width: ".concat(o, ";"))))
          }
      }, {
          key: "reload",
          value: function() {
              this.init()
          }
      }, {
          key: "updateNavigationClasses",
          value: function() {
              var e = this.loop();
              $(this.nextButton, "disabled"), $(this.prevButton, "disabled"), 0 == this.index && this.elements.length - 1 == 0 ? (L(this.prevButton, "disabled"), L(this.nextButton, "disabled")) : 0 !== this.index || e ? this.index !== this.elements.length - 1 || e || L(this.nextButton, "disabled") : L(this.prevButton, "disabled")
          }
      }, {
          key: "loop",
          value: function() {
              var e = w(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
              return w(this.settings, "loop") ? this.settings.loop : e
          }
      }, {
          key: "close",
          value: function() {
              var i = this;
              if (!this.lightboxOpen) {
                  if (this.events) {
                      for (var e in this.events) this.events.hasOwnProperty(e) && this.events[e].destroy();
                      this.events = null
                  }
                  return !1
              }
              if (this.closing) return !1;
              this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && h(this.bodyHiddenChildElms, function(e) {
                  e.removeAttribute("aria-hidden")
              }), L(this.modal, "glightbox-closing"), R(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), R(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function() {
                  if (i.activeSlide = null, i.prevActiveSlideIndex = null, i.prevActiveSlide = null, i.built = !1, i.events) {
                      for (var e in i.events) i.events.hasOwnProperty(e) && i.events[e].destroy();
                      i.events = null
                  }
                  var t = document.body,
                      t = ($(Q, "glightbox-open"), $(t, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), i.modal.parentNode.removeChild(i.modal), i.trigger("close"), B(i.settings.onClose) && i.settings.onClose(), document.querySelector(".gcss-styles"));
                  t && t.parentNode.removeChild(t), i.lightboxOpen = !1, i.closing = null
              })
          }
      }, {
          key: "destroy",
          value: function() {
              this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy()
          }
      }, {
          key: "on",
          value: function(e, t) {
              var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
              if (!e || !B(t)) throw new TypeError("Event name and callback must be defined");
              this.apiEvents.push({
                  evt: e,
                  once: i,
                  callback: t
              })
          }
      }, {
          key: "once",
          value: function(e, t) {
              this.on(e, t, !0)
          }
      }, {
          key: "trigger",
          value: function(s) {
              var t = this,
                  a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
                  r = [];
              h(this.apiEvents, function(e, t) {
                  var i = e.evt,
                      n = e.once,
                      e = e.callback;
                  i == s && (e(a), n) && r.push(t)
              }), r.length && h(r, function(e) {
                  return t.apiEvents.splice(e, 1)
              })
          }
      }, {
          key: "clearAllEvents",
          value: function() {
              this.apiEvents.splice(0, this.apiEvents.length)
          }
      }, {
          key: "version",
          value: function() {
              return "3.1.0"
          }
      }]), _);

  function _() {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      r(this, _), this.customOptions = e, this.settings = c(J, e), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1
  }

  function E(e, t, i) {
      r(this, E), this.element = e, this.instance = t, this.index = i
  }

  function x() {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      r(this, x), this.defaults = {
          href: "",
          sizes: "",
          srcset: "",
          title: "",
          type: "",
          videoProvider: "",
          description: "",
          alt: "",
          descPosition: "bottom",
          effect: "",
          width: "",
          height: "",
          content: !1,
          zoomable: !0,
          draggable: !0
      }, d(e) && (this.defaults = c(this.defaults, e))
  }
  return function() {
      var e = new ee(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {});
      return e.init(), e
  }
});
var hljs = function() {
      "use strict";
      var e = {
          exports: {}
      };

      function i(t) {
          return t instanceof Map ? t.clear = t.delete = t.set = () => {
              throw Error("map is read-only")
          } : t instanceof Set && (t.add = t.clear = t.delete = () => {
              throw Error("set is read-only")
          }), Object.freeze(t), Object.getOwnPropertyNames(t).forEach(e => {
              e = t[e];
              "object" != typeof e || Object.isFrozen(e) || i(e)
          }), t
      }
      e.exports = i, e.exports.default = i;
      var x = e.exports;
      class O {
          constructor(e) {
              void 0 === e.data && (e.data = {}), this.data = e.data, this.isMatchIgnored = !1
          }
          ignoreMatch() {
              this.isMatchIgnored = !0
          }
      }

      function t(e) {
          return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
      }

      function l(e, ...t) {
          const i = Object.create(null);
          for (const t in e) i[t] = e[t];
          return t.forEach(e => {
              for (const t in e) i[t] = e[t]
          }), i
      }
      const s = e => !!e.kind;
      class C {
          constructor(e, t) {
              this.buffer = "", this.classPrefix = t.classPrefix, e.walk(this)
          }
          addText(e) {
              this.buffer += t(e)
          }
          openNode(e) {
              var t, i, n;
              s(e) && (n = e.kind, n = e.sublanguage ? "language-" + n : ([e, t] = [n, {
                  prefix: this.classPrefix
              }["prefix"]], e.includes(".") ? ["" + t + (i = e.split(".")).shift(), ...i.map((e, t) => "" + e + "_".repeat(t + 1))].join(" ") : "" + t + e), this.span(n))
          }
          closeNode(e) {
              s(e) && (this.buffer += "</span>")
          }
          value() {
              return this.buffer
          }
          span(e) {
              this.buffer += `<span class="${e}">`
          }
      }
      class n {
          constructor() {
              this.rootNode = {
                  children: []
              }, this.stack = [this.rootNode]
          }
          get top() {
              return this.stack[this.stack.length - 1]
          }
          get root() {
              return this.rootNode
          }
          add(e) {
              this.top.children.push(e)
          }
          openNode(e) {
              e = {
                  kind: e,
                  children: []
              };
              this.add(e), this.stack.push(e)
          }
          closeNode() {
              if (1 < this.stack.length) return this.stack.pop()
          }
          closeAllNodes() {
              for (; this.closeNode(););
          }
          toJSON() {
              return JSON.stringify(this.rootNode, null, 4)
          }
          walk(e) {
              return this.constructor._walk(e, this.rootNode)
          }
          static _walk(t, e) {
              return "string" == typeof e ? t.addText(e) : e.children && (t.openNode(e), e.children.forEach(e => this._walk(t, e)), t.closeNode(e)), t
          }
          static _collapse(e) {
              "string" != typeof e && e.children && (e.children.every(e => "string" == typeof e) ? e.children = [e.children.join("")] : e.children.forEach(e => {
                  n._collapse(e)
              }))
          }
      }
      class H extends n {
          constructor(e) {
              super(), this.options = e
          }
          addKeyword(e, t) {
              "" !== e && (this.openNode(t), this.addText(e), this.closeNode())
          }
          addText(e) {
              "" !== e && this.add(e)
          }
          addSublanguage(e, t) {
              e = e.root;
              e.kind = t, e.sublanguage = !0, this.add(e)
          }
          toHTML() {
              return new C(this, this.options).value()
          }
          finalize() {
              return !0
          }
      }

      function c(e) {
          return e ? "string" == typeof e ? e : e.source : null
      }

      function D(e) {
          return I("(?=", e, ")")
      }

      function q(e) {
          return I("(?:", e, ")*")
      }

      function Y(e) {
          return I("(?:", e, ")?")
      }

      function I(...e) {
          return e.map(e => c(e)).join("")
      }

      function L(...e) {
          var t, i = "object" == typeof(t = (i = e)[i.length - 1]) && t.constructor === Object ? (i.splice(i.length - 1, 1), t) : {};
          return "(" + (i.capture ? "" : "?:") + e.map(e => c(e)).join("|") + ")"
      }

      function d(e) {
          return RegExp(e.toString() + "|").exec("").length - 1
      }
      const T = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

      function u(e, {
          joinWith: t
      }) {
          let s = 0;
          return e.map(e => {
              var t = s += 1;
              let i = c(e),
                  n = "";
              for (; 0 < i.length;) {
                  const e = T.exec(i);
                  if (!e) {
                      n += i;
                      break
                  }
                  n += i.substring(0, e.index), i = i.substring(e.index + e[0].length), "\\" === e[0][0] && e[1] ? n += "\\" + (Number(e[1]) + t) : (n += e[0], "(" === e[0] && s++)
              }
              return n
          }).map(e => `(${e})`).join(t)
      }
      var e = "[a-zA-Z]\\w*",
          k = "[a-zA-Z_]\\w*",
          M = "\\b\\d+(\\.\\d+)?",
          A = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
          W = "\\b(0b[01]+)",
          a = {
              begin: "\\\\[\\s\\S]",
              relevance: 0
          },
          r = {
              scope: "string",
              begin: "'",
              end: "'",
              illegal: "\\n",
              contains: [a]
          },
          o = {
              scope: "string",
              begin: '"',
              end: '"',
              illegal: "\\n",
              contains: [a]
          },
          h = (e, t, i = {}) => {
              e = l({
                  scope: "comment",
                  begin: e,
                  end: t,
                  contains: []
              }, i), e.contains.push({
                  scope: "doctag",
                  begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
                  end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
                  excludeBegin: !0,
                  relevance: 0
              }), t = L("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
              return e.contains.push({
                  begin: I(/[ ]+/, "(", t, /[.]?[:]?([.][ ]|[ ])/, "){3}")
              }), e
          },
          U = h("//", "$"),
          V = h("/\\*", "\\*/"),
          X = h("#", "$"),
          p = Object.freeze({
              __proto__: null,
              MATCH_NOTHING_RE: /\b\B/,
              IDENT_RE: e,
              UNDERSCORE_IDENT_RE: k,
              NUMBER_RE: M,
              C_NUMBER_RE: A,
              BINARY_NUMBER_RE: W,
              RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
              SHEBANG: (e = {}) => {
                  var t = /^#![ ]*\//;
                  return e.binary && (e.begin = I(t, /.*\b/, e.binary, /\b.*/)), l({
                      scope: "meta",
                      begin: t,
                      end: /$/,
                      relevance: 0,
                      "on:begin": (e, t) => {
                          0 !== e.index && t.ignoreMatch()
                      }
                  }, e)
              },
              BACKSLASH_ESCAPE: a,
              APOS_STRING_MODE: r,
              QUOTE_STRING_MODE: o,
              PHRASAL_WORDS_MODE: {
                  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
              },
              COMMENT: h,
              C_LINE_COMMENT_MODE: U,
              C_BLOCK_COMMENT_MODE: V,
              HASH_COMMENT_MODE: X,
              NUMBER_MODE: {
                  scope: "number",
                  begin: M,
                  relevance: 0
              },
              C_NUMBER_MODE: {
                  scope: "number",
                  begin: A,
                  relevance: 0
              },
              BINARY_NUMBER_MODE: {
                  scope: "number",
                  begin: W,
                  relevance: 0
              },
              REGEXP_MODE: {
                  begin: /(?=\/[^/\n]*\/)/,
                  contains: [{
                      scope: "regexp",
                      begin: /\//,
                      end: /\/[gimuy]*/,
                      illegal: /\n/,
                      contains: [a, {
                          begin: /\[/,
                          end: /\]/,
                          relevance: 0,
                          contains: [a]
                      }]
                  }]
              },
              TITLE_MODE: {
                  scope: "title",
                  begin: e,
                  relevance: 0
              },
              UNDERSCORE_TITLE_MODE: {
                  scope: "title",
                  begin: k,
                  relevance: 0
              },
              METHOD_GUARD: {
                  begin: "\\.\\s*[a-zA-Z_]\\w*",
                  relevance: 0
              },
              END_SAME_AS_BEGIN: e => Object.assign(e, {
                  "on:begin": (e, t) => {
                      t.data._beginMatch = e[1]
                  },
                  "on:end": (e, t) => {
                      t.data._beginMatch !== e[1] && t.ignoreMatch()
                  }
              })
          });

      function G(e, t) {
          "." === e.input[e.index - 1] && t.ignoreMatch()
      }
      const K = (t, e) => {
              if (t.beforeMatch) {
                  if (t.starts) throw Error("beforeMatch cannot be used with starts");
                  var i = Object.assign({}, t);
                  Object.keys(t).forEach(e => {
                      delete t[e]
                  }), t.keywords = i.keywords, t.begin = I(i.beforeMatch, D(i.begin)), t.starts = {
                      relevance: 0,
                      contains: [Object.assign(i, {
                          endsParent: !0
                      })]
                  }, t.relevance = 0, delete i.beforeMatch
              }
          },
          Z = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];

      function Q(t, n, e = "keyword") {
          const s = Object.create(null);
          return "string" == typeof t ? i(e, t.split(" ")) : Array.isArray(t) ? i(e, t) : Object.keys(t).forEach(e => {
              Object.assign(s, Q(t[e], n, e))
          }), s;

          function i(i, e) {
              (e = n ? e.map(e => e.toLowerCase()) : e).forEach(e => {
                  var t, e = e.split("|");
                  s[e[0]] = [i, (t = e[0], (e = e[1]) ? Number(e) : (e => Z.includes(e.toLowerCase()))(t) ? 0 : 1)]
              })
          }
      }
      const J = {},
          $ = e => {
              console.error(e)
          },
          ee = (e, ...t) => {
              console.log("WARN: " + e, ...t)
          },
          m = (e, t) => {
              J[e + "/" + t] || (console.log(`Deprecated as of ${e}. ` + t), J[e + "/" + t] = !0)
          },
          g = Error();

      function te(e, t, {
          key: i
      }) {
          let n = 0;
          var s = e[i],
              a = {},
              r = {};
          for (let e = 1; e <= t.length; e++) r[e + n] = s[e], a[e + n] = !0, n += d(t[e - 1]);
          e[i] = r, e[i]._emit = a, e[i]._multi = !0
      }

      function ie(a) {
          function r(e, t) {
              return RegExp(c(e), "m" + (a.case_insensitive ? "i" : "") + (a.unicodeRegex ? "u" : "") + (t ? "g" : ""))
          }
          class t {
              constructor() {
                  this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0
              }
              addRule(e, t) {
                  t.position = this.position++, this.matchIndexes[this.matchAt] = t, this.regexes.push([t, e]), this.matchAt += d(e) + 1
              }
              compile() {
                  0 === this.regexes.length && (this.exec = () => null);
                  var e = this.regexes.map(e => e[1]);
                  this.matcherRe = r(u(e, {
                      joinWith: "|"
                  }), !0), this.lastIndex = 0
              }
              exec(e) {
                  this.matcherRe.lastIndex = this.lastIndex;
                  var t, i, e = this.matcherRe.exec(e);
                  return e ? (t = e.findIndex((e, t) => 0 < t && void 0 !== e), i = this.matchIndexes[t], e.splice(0, t), Object.assign(e, i)) : null
              }
          }
          class o {
              constructor() {
                  this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0
              }
              getMatcher(e) {
                  if (this.multiRegexes[e]) return this.multiRegexes[e];
                  const i = new t;
                  return this.rules.slice(e).forEach(([e, t]) => i.addRule(e, t)), i.compile(), this.multiRegexes[e] = i
              }
              resumingScanAtSamePosition() {
                  return 0 !== this.regexIndex
              }
              considerAll() {
                  this.regexIndex = 0
              }
              addRule(e, t) {
                  this.rules.push([e, t]), "begin" === t.type && this.count++
              }
              exec(e) {
                  const t = this.getMatcher(this.regexIndex);
                  t.lastIndex = this.lastIndex;
                  let i = t.exec(e);
                  if (this.resumingScanAtSamePosition() && (!i || i.index !== this.lastIndex)) {
                      const t = this.getMatcher(0);
                      t.lastIndex = this.lastIndex + 1, i = t.exec(e)
                  }
                  return i && (this.regexIndex += i.position + 1, this.regexIndex === this.count) && this.considerAll(), i
              }
          }
          if (a.compilerExtensions || (a.compilerExtensions = []), a.contains && a.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
          return a.classNameAliases = l(a.classNameAliases || {}),
              function t(i, n) {
                  const s = i;
                  if (!i.isCompiled) {
                      [function(e, t) {
                          void 0 !== e.className && (e.scope = e.className, delete e.className)
                      }, function(e, t) {
                          if (e.match) {
                              if (e.begin || e.end) throw Error("begin & end are not supported with match");
                              e.begin = e.match, delete e.match
                          }
                      }, function(e) {
                          if ((t = e).scope && "object" == typeof t.scope && null !== t.scope && (t.beginScope = t.scope, delete t.scope), "string" == typeof e.beginScope && (e.beginScope = {
                                  _wrap: e.beginScope
                              }), "string" == typeof e.endScope && (e.endScope = {
                                  _wrap: e.endScope
                              }), t = e, Array.isArray(t.begin)) {
                              if (t.skip || t.excludeBegin || t.returnBegin) throw $("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), g;
                              if ("object" != typeof t.beginScope || null === t.beginScope) throw $("beginScope must be object"), g;
                              te(t, t.begin, {
                                  key: "beginScope"
                              }), t.begin = u(t.begin, {
                                  joinWith: ""
                              })
                          }
                          var t = e;
                          if (Array.isArray(t.end)) {
                              if (t.skip || t.excludeEnd || t.returnEnd) throw $("skip, excludeEnd, returnEnd not compatible with endScope: {}"), g;
                              if ("object" != typeof t.endScope || null === t.endScope) throw $("endScope must be object"), g;
                              te(t, t.end, {
                                  key: "endScope"
                              }), t.end = u(t.end, {
                                  joinWith: ""
                              })
                          }
                      }, K].forEach(e => e(i, n)), a.compilerExtensions.forEach(e => e(i, n)), i.__beforeBegin = null, [function(e, t) {
                          t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = G, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, void 0 === e.relevance) && (e.relevance = 0)
                      }, function(e, t) {
                          Array.isArray(e.illegal) && (e.illegal = L(...e.illegal))
                      }, function(e, t) {
                          void 0 === e.relevance && (e.relevance = 1)
                      }].forEach(e => e(i, n)), i.isCompiled = !0;
                      let e = null;
                      "object" == typeof i.keywords && i.keywords.$pattern && (i.keywords = Object.assign({}, i.keywords), e = i.keywords.$pattern, delete i.keywords.$pattern), e = e || /\w+/, i.keywords && (i.keywords = Q(i.keywords, a.case_insensitive)), s.keywordPatternRe = r(e, !0), n && (i.begin || (i.begin = /\B|\b/), s.beginRe = r(s.begin), i.end || i.endsWithParent || (i.end = /\B|\b/), i.end && (s.endRe = r(s.end)), s.terminatorEnd = c(s.end) || "", i.endsWithParent) && n.terminatorEnd && (s.terminatorEnd += (i.end ? "|" : "") + n.terminatorEnd), i.illegal && (s.illegalRe = r(i.illegal)), i.contains || (i.contains = []), i.contains = [].concat(...i.contains.map(e => {
                          return (t = "self" === e ? i : e).variants && !t.cachedVariants && (t.cachedVariants = t.variants.map(e => l(t, {
                              variants: null
                          }, e))), t.cachedVariants || (function e(t) {
                              return !!t && (t.endsWithParent || e(t.starts))
                          }(t) ? l(t, {
                              starts: t.starts ? l(t.starts) : null
                          }) : Object.isFrozen(t) ? l(t) : t);
                          var t
                      })), i.contains.forEach(e => {
                          t(e, s)
                      }), i.starts && t(i.starts, n), s.matcher = (e => {
                          const t = new o;
                          return e.contains.forEach(e => t.addRule(e.begin, {
                              rule: e,
                              type: "begin"
                          })), e.terminatorEnd && t.addRule(e.terminatorEnd, {
                              type: "end"
                          }), e.illegal && t.addRule(e.illegal, {
                              type: "illegal"
                          }), t
                      })(s)
                  }
                  return s
              }(a)
      }
      class ne extends Error {
          constructor(e, t) {
              super(e), this.name = "HTMLInjectionError", this.html = t
          }
      }
      const P = t,
          se = l,
          ae = Symbol("nomatch");
      r = (n => {
          const C = Object.create(null),
              r = Object.create(null),
              s = [];
          let T = !0;
          const S = "Could not find the language '{}', did you forget to load/include a language module?",
              a = {
                  disableAutodetect: !0,
                  name: "Plain text",
                  contains: []
              };
          let k = {
              ignoreUnescapedHTML: !1,
              throwUnescapedHTML: !1,
              noHighlightRe: /^(no-?highlight)$/i,
              languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
              classPrefix: "hljs-",
              cssSelector: "pre code",
              languages: null,
              __emitter: H
          };

          function o(e) {
              return k.noHighlightRe.test(e)
          }

          function l(e, t, i) {
              let n = "",
                  s = "";
              "object" == typeof t ? (n = e, i = t.ignoreIllegals, s = t.language) : (m("10.7.0", "highlight(lang, code, ...args) has been deprecated."), m("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"), s = e, n = t), void 0 === i && (i = !0);
              e = {
                  code: n,
                  language: s
              }, u("before:highlight", e), t = e.result || M(e.language, e.code, i);
              return t.code = e.code, u("after:highlight", t), t
          }

          function M(c, d, u, e) {
              const r = Object.create(null);

              function a() {
                  if (!f.keywords) return b.addText(y);
                  let e = 0,
                      t = (f.keywordPatternRe.lastIndex = 0, f.keywordPatternRe.exec(y)),
                      i = "";
                  for (; t;) {
                      i += y.substring(e, t.index);
                      var n = o.case_insensitive ? t[0].toLowerCase() : t[0],
                          s = (a = n, f.keywords[a]);
                      if (s) {
                          const [e, a] = s;
                          if (b.addText(i), i = "", r[n] = (r[n] || 0) + 1, r[n] <= 7 && (w += a), e.startsWith("_")) i += t[0];
                          else {
                              const i = o.classNameAliases[e] || e;
                              b.addKeyword(t[0], i)
                          }
                      } else i += t[0];
                      e = f.keywordPatternRe.lastIndex, t = f.keywordPatternRe.exec(y)
                  }
                  var a;
                  i += y.substr(e), b.addText(i)
              }

              function h() {
                  (null != f.subLanguage ? () => {
                      if ("" !== y) {
                          let e = null;
                          if ("string" == typeof f.subLanguage) {
                              if (!C[f.subLanguage]) return void b.addText(y);
                              e = M(f.subLanguage, y, !0, l[f.subLanguage]), l[f.subLanguage] = e._top
                          } else e = A(y, f.subLanguage.length ? f.subLanguage : null);
                          0 < f.relevance && (w += e.relevance), b.addSublanguage(e._emitter, e.language)
                      }
                  } : a)(), y = ""
              }

              function s(e, t) {
                  let i = 1;
                  for (; void 0 !== t[i];) {
                      var n, s;
                      e._emit[i] ? (n = o.classNameAliases[e[i]] || e[i], s = t[i], n ? b.addKeyword(s, n) : (y = s, a(), y = ""), i++) : i++
                  }
              }

              function p(e, t) {
                  e.scope && "string" == typeof e.scope && b.openNode(o.classNameAliases[e.scope] || e.scope), e.beginScope && (e.beginScope._wrap ? (b.addKeyword(y, o.classNameAliases[e.beginScope._wrap] || e.beginScope._wrap), y = "") : e.beginScope._multi && (s(e.beginScope, t), y = "")), f = Object.create(e, {
                      parent: {
                          value: f
                      }
                  })
              }

              function m(e) {
                  var t = e[0],
                      i = d.substr(e.index),
                      n = function e(t, i, n) {
                          let s = (e => (e = e && e.exec(n)) && 0 === e.index)(t.endRe);
                          if (s) {
                              if (t["on:end"]) {
                                  const n = new O(t);
                                  t["on:end"](i, n), n.isMatchIgnored && (s = !1)
                              }
                              if (s) {
                                  for (; t.endsParent && t.parent;) t = t.parent;
                                  return t
                              }
                          }
                          if (t.endsWithParent) return e(t.parent, i, n)
                      }(f, e, i);
                  if (!n) return ae;
                  i = f;
                  for (f.endScope && f.endScope._wrap ? (h(), b.addKeyword(t, f.endScope._wrap)) : f.endScope && f.endScope._multi ? (h(), s(f.endScope, e)) : i.skip ? y += t : (i.returnEnd || i.excludeEnd || (y += t), h(), i.excludeEnd && (y = t)); f.scope && b.closeNode(), f.skip || f.subLanguage || (w += f.relevance), (f = f.parent) !== n.parent;);
                  return n.starts && p(n.starts, e), i.returnEnd ? 0 : t.length
              }
              let g = {};

              function t(e, t) {
                  var i, n = t && t[0];
                  if (y += e, null == n) return h(), 0;
                  if ("begin" === g.type && "end" === t.type && g.index === t.index && "" === n) {
                      if (y += d.slice(t.index, t.index + 1), T) return 1; {
                          const e = Error(`0 width match regex (${c})`);
                          throw e.languageName = c, e.badRule = g.rule, e
                      }
                  }
                  if ("begin" === (g = t).type) {
                      var s = t;
                      const a = s[0],
                          r = s.rule,
                          o = new O(r),
                          l = [r.__beforeBegin, r["on:begin"]];
                      for (const r of l)
                          if (r && (r(s, o), o.isMatchIgnored)) return i = a, 0 === f.matcher.regexIndex ? (y += i[0], 1) : (x = !0, 0);
                      return r.skip ? y += a : (r.excludeBegin && (y += a), h(), r.returnBegin || r.excludeBegin || (y = a)), p(r, s), r.returnBegin ? 0 : a.length
                  }
                  if ("illegal" === t.type && !u) {
                      const c = Error('Illegal lexeme "' + n + '" for mode "' + (f.scope || "<unnamed>") + '"');
                      throw c.mode = f, c
                  }
                  if ("end" === t.type) {
                      const c = m(t);
                      if (c !== ae) return c
                  }
                  if ("illegal" === t.type && "" === n) return 1;
                  if (1e5 < E && E > 3 * t.index) throw Error("potential infinite loop, way more iterations than matches");
                  return y += n, n.length
              }
              const o = N(c);
              if (!o) throw $(S.replace("{}", c)), Error('Unknown language: "' + c + '"');
              var i = ie(o);
              let n = "",
                  f = e || i;
              const l = {},
                  b = new k.__emitter(k);
              var v = [];
              for (let e = f; e !== o; e = e.parent) e.scope && v.unshift(e.scope);
              v.forEach(e => b.openNode(e));
              let y = "",
                  w = 0,
                  _ = 0,
                  E = 0,
                  x = !1;
              try {
                  for (f.matcher.considerAll();;) {
                      E++, x ? x = !1 : f.matcher.considerAll(), f.matcher.lastIndex = _;
                      const c = f.matcher.exec(d);
                      if (!c) break;
                      const C = t(d.substring(_, c.index), c);
                      _ = c.index + C
                  }
                  return t(d.substr(_)), b.closeAllNodes(), b.finalize(), n = b.toHTML(), {
                      language: c,
                      value: n,
                      relevance: w,
                      illegal: !1,
                      _emitter: b,
                      _top: f
                  }
              } catch (e) {
                  if (e.message && e.message.includes("Illegal")) return {
                      language: c,
                      value: P(d),
                      illegal: !0,
                      relevance: 0,
                      _illegalBy: {
                          message: e.message,
                          index: _,
                          context: d.slice(_ - 100, _ + 100),
                          mode: e.mode,
                          resultSoFar: n
                      },
                      _emitter: b
                  };
                  if (T) return {
                      language: c,
                      value: P(d),
                      illegal: !1,
                      relevance: 0,
                      errorRaised: e,
                      _emitter: b,
                      _top: f
                  };
                  throw e
              }
          }

          function A(t, e) {
              e = e || k.languages || Object.keys(C);
              i = t, (n = {
                  value: P(i),
                  illegal: !1,
                  relevance: 0,
                  _top: a,
                  _emitter: new k.__emitter(k)
              })._emitter.addText(i);
              var i = n,
                  n = e.filter(N).filter(d).map(e => M(e, t, !1)),
                  e = (n.unshift(i), n.sort((e, t) => {
                      if (e.relevance !== t.relevance) return t.relevance - e.relevance;
                      if (e.language && t.language) {
                          if (N(e.language).supersetOf === t.language) return 1;
                          if (N(t.language).supersetOf === e.language) return -1
                      }
                      return 0
                  })),
                  [i, n] = e,
                  e = i;
              return e.secondBest = n, e
          }

          function t(e) {
              var t = (e => {
                  let t = e.className + " ";
                  t += e.parentNode ? e.parentNode.className : "";
                  var i = k.languageDetectRe.exec(t);
                  if (i) {
                      const t = N(i[1]);
                      return t || (ee(S.replace("{}", i[1])), ee("Falling back to no-highlight mode for this block.", e)), t ? i[1] : "no-highlight"
                  }
                  return t.split(/\s+/).find(e => o(e) || N(e))
              })(e);
              if (!o(t)) {
                  if (u("before:highlightElement", {
                          el: e,
                          language: t
                      }), 0 < e.children.length && (k.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/issues/2886"), console.warn(e)), k.throwUnescapedHTML)) throw new ne("One of your code blocks includes unescaped HTML.", e.innerHTML);
                  var i = e.textContent,
                      n = t ? l(i, {
                          language: t,
                          ignoreIllegals: !0
                      }) : A(i),
                      s = (e.innerHTML = n.value, e),
                      a = n.language;
                  t = t && r[t] || a, s.classList.add("hljs"), s.classList.add("language-" + t), e.result = {
                      language: n.language,
                      re: n.relevance,
                      relevance: n.relevance
                  }, n.secondBest && (e.secondBest = {
                      language: n.secondBest.language,
                      relevance: n.secondBest.relevance
                  }), u("after:highlightElement", {
                      el: e,
                      result: n,
                      text: i
                  })
              }
          }
          let e = !1;

          function i() {
              "loading" !== document.readyState ? document.querySelectorAll(k.cssSelector).forEach(t) : e = !0
          }

          function N(e) {
              return e = (e || "").toLowerCase(), C[e] || C[r[e]]
          }

          function c(e, {
              languageName: t
          }) {
              (e = "string" == typeof e ? [e] : e).forEach(e => {
                  r[e.toLowerCase()] = t
              })
          }

          function d(e) {
              e = N(e);
              return e && !e.disableAutodetect
          }

          function u(e, t) {
              const i = e;
              s.forEach(e => {
                  e[i] && e[i](t)
              })
          }
          "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", () => {
              e && i()
          }, !1), Object.assign(n, {
              highlight: l,
              highlightAuto: A,
              highlightAll: i,
              highlightElement: t,
              highlightBlock: e => (m("10.7.0", "highlightBlock will be removed entirely in v12.0"), m("10.7.0", "Please use highlightElement now."), t(e)),
              configure: e => {
                  k = se(k, e)
              },
              initHighlighting: () => {
                  i(), m("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.")
              },
              initHighlightingOnLoad: () => {
                  i(), m("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
              },
              registerLanguage: (t, e) => {
                  let i = null;
                  try {
                      i = e(n)
                  } catch (e) {
                      if ($("Language definition for '{}' could not be registered.".replace("{}", t)), !T) throw e;
                      $(e), i = a
                  }
                  i.name || (i.name = t), (C[t] = i).rawDefinition = e.bind(null, n), i.aliases && c(i.aliases, {
                      languageName: t
                  })
              },
              unregisterLanguage: e => {
                  delete C[e];
                  for (const C of Object.keys(r)) r[C] === e && delete r[C]
              },
              listLanguages: () => Object.keys(C),
              getLanguage: N,
              registerAliases: c,
              autoDetection: d,
              inherit: se,
              addPlugin: e => {
                  var t;
                  (t = e)["before:highlightBlock"] && !t["before:highlightElement"] && (t["before:highlightElement"] = e => {
                      t["before:highlightBlock"](Object.assign({
                          block: e.el
                      }, e))
                  }), t["after:highlightBlock"] && !t["after:highlightElement"] && (t["after:highlightElement"] = e => {
                      t["after:highlightBlock"](Object.assign({
                          block: e.el
                      }, e))
                  }), s.push(e)
              }
          }), n.debugMode = () => {
              T = !1
          }, n.safeMode = () => {
              T = !0
          }, n.versionString = "11.3.1", n.regex = {
              concat: I,
              lookahead: D,
              either: L,
              optional: Y,
              anyNumberOfTimes: q
          };
          for (const n in p) "object" == typeof p[n] && x(p[n]);
          return Object.assign(n, p), n
      })({});
      const f = e => ({
              IMPORTANT: {
                  scope: "meta",
                  begin: "!important"
              },
              BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
              HEXCOLOR: {
                  scope: "number",
                  begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
              },
              FUNCTION_DISPATCH: {
                  className: "built_in",
                  begin: /[\w-]+(?=\()/
              },
              ATTRIBUTE_SELECTOR_MODE: {
                  scope: "selector-attr",
                  begin: /\[/,
                  end: /\]/,
                  illegal: "$",
                  contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
              },
              CSS_NUMBER_MODE: {
                  scope: "number",
                  begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
                  relevance: 0
              },
              CSS_VARIABLE: {
                  className: "attr",
                  begin: /--[A-Za-z][A-Za-z0-9_-]*/
              }
          }),
          b = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"],
          v = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"],
          y = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"],
          w = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"],
          _ = ["align-content", "align-items", "align-self", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "isolation", "justify-content", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-height", "max-width", "min-height", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "rest", "rest-after", "rest-before", "right", "row-gap", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "shape-image-threshold", "shape-margin", "shape-outside", "speak", "speak-as", "src", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index"].reverse(),
          re = y.concat(w);
      var o = "\\.([0-9](_*[0-9])*)",
          h = "[0-9a-fA-F](_*[0-9a-fA-F])*",
          E = {
              className: "number",
              variants: [{
                  begin: `(\\b([0-9](_*[0-9])*)((${o})|\\.)?|(${o}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
              }, {
                  begin: `\\b([0-9](_*[0-9])*)((${o})[fFdD]?\\b|\\.([fFdD]\\b)?)`
              }, {
                  begin: `(${o})[fFdD]?\\b`
              }, {
                  begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b"
              }, {
                  begin: `\\b0[xX]((${h})\\.?|(${h})?\\.(${h}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
              }, {
                  begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
              }, {
                  begin: `\\b0[xX](${h})[lL]?\\b`
              }, {
                  begin: "\\b0(_*[0-7])*[lL]?\\b"
              }, {
                  begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
              }],
              relevance: 0
          };
      const S = "[A-Za-z$_][0-9A-Za-z$_]*",
          oe = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
          le = ["true", "false", "null", "undefined", "NaN", "Infinity"],
          ce = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"],
          de = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
          ue = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
          he = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
          pe = [].concat(ue, ce, de);

      function me(e) {
          const t = e.regex,
              i = S,
              n = /<[A-Za-z0-9\\._:-]+/,
              s = /\/[A-Za-z0-9\\._:-]+>|\/>/,
              a = (e, t) => {
                  var i, n, s = e[0].length + e.index,
                      a = e.input[s];
                  "<" !== a && "," !== a && (">" === a && ([a, i] = [e, s], n = "</" + a[0].slice(1), -1 === a.input.indexOf(n, i)) && t.ignoreMatch(), !(a = e.input.substr(s).match(/^\s+extends\s+/)) || 0 !== a.index) || t.ignoreMatch()
              },
              r = {
                  $pattern: S,
                  keyword: oe,
                  literal: le,
                  built_in: pe,
                  "variable.language": he
              },
              o = "\\.([0-9](_?[0-9])*)",
              l = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",
              c = {
                  className: "number",
                  variants: [{
                      begin: `(\\b(${l})((${o})|\\.)?|(${o}))[eE][+-]?([0-9](_?[0-9])*)\\b`
                  }, {
                      begin: `\\b(${l})\\b((${o})\\b|\\.)?|(${o})\\b`
                  }, {
                      begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
                  }, {
                      begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
                  }, {
                      begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
                  }, {
                      begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
                  }, {
                      begin: "\\b0[0-7]+n?\\b"
                  }],
                  relevance: 0
              },
              d = {
                  className: "subst",
                  begin: "\\$\\{",
                  end: "\\}",
                  keywords: r,
                  contains: []
              },
              u = {
                  begin: "html`",
                  end: "",
                  starts: {
                      end: "`",
                      returnEnd: !1,
                      contains: [e.BACKSLASH_ESCAPE, d],
                      subLanguage: "xml"
                  }
              },
              h = {
                  begin: "css`",
                  end: "",
                  starts: {
                      end: "`",
                      returnEnd: !1,
                      contains: [e.BACKSLASH_ESCAPE, d],
                      subLanguage: "css"
                  }
              },
              p = {
                  className: "string",
                  begin: "`",
                  end: "`",
                  contains: [e.BACKSLASH_ESCAPE, d]
              },
              m = {
                  className: "comment",
                  variants: [e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                      relevance: 0,
                      contains: [{
                          begin: "(?=@[A-Za-z]+)",
                          relevance: 0,
                          contains: [{
                              className: "doctag",
                              begin: "@[A-Za-z]+"
                          }, {
                              className: "type",
                              begin: "\\{",
                              end: "\\}",
                              excludeEnd: !0,
                              excludeBegin: !0,
                              relevance: 0
                          }, {
                              className: "variable",
                              begin: i + "(?=\\s*(-)|$)",
                              endsParent: !0,
                              relevance: 0
                          }, {
                              begin: /(?=[^\n])\s/,
                              relevance: 0
                          }]
                      }]
                  }), e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE]
              },
              g = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, u, h, p, c];
          d.contains = g.concat({
              begin: /\{/,
              end: /\}/,
              keywords: r,
              contains: ["self"].concat(g)
          });
          var f = [].concat(m, d.contains),
              f = f.concat([{
                  begin: /\(/,
                  end: /\)/,
                  keywords: r,
                  contains: ["self"].concat(f)
              }]),
              b = {
                  className: "params",
                  begin: /\(/,
                  end: /\)/,
                  excludeBegin: !0,
                  excludeEnd: !0,
                  keywords: r,
                  contains: f
              },
              v = {
                  variants: [{
                      match: [/class/, /\s+/, i, /\s+/, /extends/, /\s+/, t.concat(i, "(", t.concat(/\./, i), ")*")],
                      scope: {
                          1: "keyword",
                          3: "title.class",
                          5: "keyword",
                          7: "title.class.inherited"
                      }
                  }, {
                      match: [/class/, /\s+/, i],
                      scope: {
                          1: "keyword",
                          3: "title.class"
                      }
                  }]
              },
              y = {
                  relevance: 0,
                  match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]+|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+/),
                  className: "title.class",
                  keywords: {
                      _: [...ce, ...de]
                  }
              },
              w = {
                  variants: [{
                      match: [/function/, /\s+/, i, /(?=\s*\()/]
                  }, {
                      match: [/function/, /\s*(?=\()/]
                  }],
                  className: {
                      1: "keyword",
                      3: "title.function"
                  },
                  label: "func.def",
                  contains: [b],
                  illegal: /%/
              },
              _ = {
                  match: t.concat(/\b/, (_ = [...ue, "super"], t.concat("(?!", _.join("|"), ")")), i, t.lookahead(/\(/)),
                  className: "title.function",
                  relevance: 0
              },
              E = {
                  begin: t.concat(/\./, t.lookahead(t.concat(i, /(?![0-9A-Za-z$_(])/))),
                  end: i,
                  excludeBegin: !0,
                  keywords: "prototype",
                  className: "property",
                  relevance: 0
              },
              x = {
                  match: [/get|set/, /\s+/, i, /(?=\()/],
                  className: {
                      1: "keyword",
                      3: "title.function"
                  },
                  contains: [{
                      begin: /\(\)/
                  }, b]
              },
              C = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>",
              T = {
                  match: [/const|var|let/, /\s+/, i, /\s*/, /=\s*/, t.lookahead(C)],
                  className: {
                      1: "keyword",
                      3: "title.function"
                  },
                  contains: [b]
              };
          return {
              name: "Javascript",
              aliases: ["js", "jsx", "mjs", "cjs"],
              keywords: r,
              exports: {
                  PARAMS_CONTAINS: f,
                  CLASS_REFERENCE: y
              },
              illegal: /#(?![$_A-z])/,
              contains: [e.SHEBANG({
                  label: "shebang",
                  binary: "node",
                  relevance: 5
              }), {
                  label: "use_strict",
                  className: "meta",
                  relevance: 10,
                  begin: /^\s*['"]use (strict|asm)['"]/
              }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, u, h, p, m, c, y, {
                  className: "attr",
                  begin: i + t.lookahead(":"),
                  relevance: 0
              }, T, {
                  begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                  keywords: "return throw case",
                  relevance: 0,
                  contains: [m, e.REGEXP_MODE, {
                      className: "function",
                      begin: C,
                      returnBegin: !0,
                      end: "\\s*=>",
                      contains: [{
                          className: "params",
                          variants: [{
                              begin: e.UNDERSCORE_IDENT_RE,
                              relevance: 0
                          }, {
                              className: null,
                              begin: /\(\s*\)/,
                              skip: !0
                          }, {
                              begin: /\(/,
                              end: /\)/,
                              excludeBegin: !0,
                              excludeEnd: !0,
                              keywords: r,
                              contains: f
                          }]
                      }]
                  }, {
                      begin: /,/,
                      relevance: 0
                  }, {
                      match: /\s+/,
                      relevance: 0
                  }, {
                      variants: [{
                          begin: "<>",
                          end: "</>"
                      }, {
                          match: /<[A-Za-z0-9\\._:-]+\s*\/>/
                      }, {
                          begin: n,
                          "on:begin": a,
                          end: s
                      }],
                      subLanguage: "xml",
                      contains: [{
                          begin: n,
                          end: s,
                          skip: !0,
                          contains: ["self"]
                      }]
                  }]
              }, w, {
                  beginKeywords: "while if switch catch for"
              }, {
                  begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                  returnBegin: !0,
                  label: "func.def",
                  contains: [b, e.inherit(e.TITLE_MODE, {
                      begin: i,
                      className: "title.function"
                  })]
              }, {
                  match: /\.\.\./,
                  relevance: 0
              }, E, {
                  match: "\\$" + i,
                  relevance: 0
              }, {
                  match: [/\bconstructor(?=\s*\()/],
                  className: {
                      1: "title.function"
                  },
                  contains: [b]
              }, _, {
                  relevance: 0,
                  match: /\b[A-Z][A-Z_0-9]+\b/,
                  className: "variable.constant"
              }, v, x, {
                  match: /\$[(.]/
              }]
          }
      }
      const N = e => I(/\b/, e, /\w$/.test(e) ? /\b/ : /\B/),
          ge = ["Protocol", "Type"].map(N),
          fe = ["init", "self"].map(N),
          be = ["Any", "Self"],
          j = ["actor", "associatedtype", "async", "await", /as\?/, /as!/, "as", "break", "case", "catch", "class", "continue", "convenience", "default", "defer", "deinit", "didSet", "do", "dynamic", "else", "enum", "extension", "fallthrough", /fileprivate\(set\)/, "fileprivate", "final", "for", "func", "get", "guard", "if", "import", "indirect", "infix", /init\?/, /init!/, "inout", /internal\(set\)/, "internal", "in", "is", "isolated", "nonisolated", "lazy", "let", "mutating", "nonmutating", /open\(set\)/, "open", "operator", "optional", "override", "postfix", "precedencegroup", "prefix", /private\(set\)/, "private", "protocol", /public\(set\)/, "public", "repeat", "required", "rethrows", "return", "set", "some", "static", "struct", "subscript", "super", "switch", "throws", "throw", /try\?/, /try!/, "try", "typealias", /unowned\(safe\)/, /unowned\(unsafe\)/, "unowned", "var", "weak", "where", "while", "willSet"],
          ve = ["false", "nil", "true"],
          ye = ["assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right"],
          we = ["#colorLiteral", "#column", "#dsohandle", "#else", "#elseif", "#endif", "#error", "#file", "#fileID", "#fileLiteral", "#filePath", "#function", "#if", "#imageLiteral", "#keyPath", "#line", "#selector", "#sourceLocation", "#warn_unqualified_access", "#warning"],
          _e = ["abs", "all", "any", "assert", "assertionFailure", "debugPrint", "dump", "fatalError", "getVaList", "isKnownUniquelyReferenced", "max", "min", "numericCast", "pointwiseMax", "pointwiseMin", "precondition", "preconditionFailure", "print", "readLine", "repeatElement", "sequence", "stride", "swap", "swift_unboxFromSwiftValueWithType", "transcode", "type", "unsafeBitCast", "unsafeDowncast", "withExtendedLifetime", "withUnsafeMutablePointer", "withUnsafePointer", "withVaList", "withoutActuallyEscaping", "zip"],
          Ee = L(/[/=\-+!*%<>&|^~?]/, /[\u00A1-\u00A7]/, /[\u00A9\u00AB]/, /[\u00AC\u00AE]/, /[\u00B0\u00B1]/, /[\u00B6\u00BB\u00BF\u00D7\u00F7]/, /[\u2016-\u2017]/, /[\u2020-\u2027]/, /[\u2030-\u203E]/, /[\u2041-\u2053]/, /[\u2055-\u205E]/, /[\u2190-\u23FF]/, /[\u2500-\u2775]/, /[\u2794-\u2BFF]/, /[\u2E00-\u2E7F]/, /[\u3001-\u3003]/, /[\u3008-\u3020]/, /[\u3030]/),
          xe = L(Ee, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/),
          R = I(Ee, xe, "*"),
          Ce = L(/[a-zA-Z_]/, /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/, /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/, /[\u1E00-\u1FFF]/, /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/, /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/, /[\u2C00-\u2DFF\u2E80-\u2FFF]/, /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/, /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/, /[\uFE47-\uFEFE\uFF00-\uFFFD]/),
          z = L(Ce, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/),
          B = I(Ce, z, "*"),
          F = I(/[A-Z]/, z, "*"),
          Te = ["autoclosure", I(/convention\(/, L("swift", "block", "c"), /\)/), "discardableResult", "dynamicCallable", "dynamicMemberLookup", "escaping", "frozen", "GKInspectable", "IBAction", "IBDesignable", "IBInspectable", "IBOutlet", "IBSegueAction", "inlinable", "main", "nonobjc", "NSApplicationMain", "NSCopying", "NSManaged", I(/objc\(/, B, /\)/), "objc", "objcMembers", "propertyWrapper", "requires_stored_property_inits", "resultBuilder", "testable", "UIApplicationMain", "unknown", "usableFromInline"],
          Se = ["iOS", "iOSApplicationExtension", "macOS", "macOSApplicationExtension", "macCatalyst", "macCatalystApplicationExtension", "watchOS", "watchOSApplicationExtension", "tvOS", "tvOSApplicationExtension", "swift"];
      var ke = Object.freeze({
              __proto__: null,
              grmr_bash: e => {
                  var t = e.regex,
                      i = {},
                      n = {
                          begin: /\$\{/,
                          end: /\}/,
                          contains: ["self", {
                              begin: /:-/,
                              contains: [i]
                          }]
                      },
                      t = (Object.assign(i, {
                          className: "variable",
                          variants: [{
                              begin: t.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
                          }, n]
                      }), {
                          className: "subst",
                          begin: /\$\(/,
                          end: /\)/,
                          contains: [e.BACKSLASH_ESCAPE]
                      }),
                      n = {
                          begin: /<<-?\s*(?=\w+)/,
                          starts: {
                              contains: [e.END_SAME_AS_BEGIN({
                                  begin: /(\w+)/,
                                  end: /(\w+)/,
                                  className: "string"
                              })]
                          }
                      },
                      s = {
                          className: "string",
                          begin: /"/,
                          end: /"/,
                          contains: [e.BACKSLASH_ESCAPE, i, t]
                      },
                      t = (t.contains.push(s), {
                          begin: /\$\(\(/,
                          end: /\)\)/,
                          contains: [{
                              begin: /\d+#[0-9a-f]+/,
                              className: "number"
                          }, e.NUMBER_MODE, i]
                      }),
                      a = e.SHEBANG({
                          binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
                          relevance: 10
                      }),
                      r = {
                          className: "function",
                          begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                          returnBegin: !0,
                          contains: [e.inherit(e.TITLE_MODE, {
                              begin: /\w[\w\d_]*/
                          })],
                          relevance: 0
                      };
                  return {
                      name: "Bash",
                      aliases: ["sh"],
                      keywords: {
                          $pattern: /\b[a-z._-]+\b/,
                          keyword: ["if", "then", "else", "elif", "fi", "for", "while", "in", "do", "done", "case", "esac", "function"],
                          literal: ["true", "false"],
                          built_in: ["break", "cd", "continue", "eval", "exec", "exit", "export", "getopts", "hash", "pwd", "readonly", "return", "shift", "test", "times", "trap", "umask", "unset", "alias", "bind", "builtin", "caller", "command", "declare", "echo", "enable", "help", "let", "local", "logout", "mapfile", "printf", "read", "readarray", "source", "type", "typeset", "ulimit", "unalias", "set", "shopt", "autoload", "bg", "bindkey", "bye", "cap", "chdir", "clone", "comparguments", "compcall", "compctl", "compdescribe", "compfiles", "compgroups", "compquote", "comptags", "comptry", "compvalues", "dirs", "disable", "disown", "echotc", "echoti", "emulate", "fc", "fg", "float", "functions", "getcap", "getln", "history", "integer", "jobs", "kill", "limit", "log", "noglob", "popd", "print", "pushd", "pushln", "rehash", "sched", "setcap", "setopt", "stat", "suspend", "ttyctl", "unfunction", "unhash", "unlimit", "unsetopt", "vared", "wait", "whence", "where", "which", "zcompile", "zformat", "zftp", "zle", "zmodload", "zparseopts", "zprof", "zpty", "zregexparse", "zsocket", "zstyle", "ztcp", "chcon", "chgrp", "chown", "chmod", "cp", "dd", "df", "dir", "dircolors", "ln", "ls", "mkdir", "mkfifo", "mknod", "mktemp", "mv", "realpath", "rm", "rmdir", "shred", "sync", "touch", "truncate", "vdir", "b2sum", "base32", "base64", "cat", "cksum", "comm", "csplit", "cut", "expand", "fmt", "fold", "head", "join", "md5sum", "nl", "numfmt", "od", "paste", "ptx", "pr", "sha1sum", "sha224sum", "sha256sum", "sha384sum", "sha512sum", "shuf", "sort", "split", "sum", "tac", "tail", "tr", "tsort", "unexpand", "uniq", "wc", "arch", "basename", "chroot", "date", "dirname", "du", "echo", "env", "expr", "factor", "groups", "hostid", "id", "link", "logname", "nice", "nohup", "nproc", "pathchk", "pinky", "printenv", "printf", "pwd", "readlink", "runcon", "seq", "sleep", "stat", "stdbuf", "stty", "tee", "test", "timeout", "tty", "uname", "unlink", "uptime", "users", "who", "whoami", "yes"]
                      },
                      contains: [a, e.SHEBANG(), r, t, e.HASH_COMMENT_MODE, n, {
                          match: /(\/[a-z._-]+)+/
                      }, s, {
                          className: "",
                          begin: /\\"/
                      }, {
                          className: "string",
                          begin: /'/,
                          end: /'/
                      }, i]
                  }
              },
              grmr_c: e => {
                  var t = e.regex,
                      i = e.COMMENT("//", "$", {
                          contains: [{
                              begin: /\\\n/
                          }]
                      }),
                      n = "[a-zA-Z_]\\w*::",
                      s = "(decltype\\(auto\\)|" + t.optional(n) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")",
                      a = {
                          className: "type",
                          variants: [{
                              begin: "\\b[a-z\\d_]*_t\\b"
                          }, {
                              match: /\batomic_[a-z]{3,6}\b/
                          }]
                      },
                      r = {
                          className: "string",
                          variants: [{
                              begin: '(u8?|U|L)?"',
                              end: '"',
                              illegal: "\\n",
                              contains: [e.BACKSLASH_ESCAPE]
                          }, {
                              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                              end: "'",
                              illegal: "."
                          }, e.END_SAME_AS_BEGIN({
                              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                              end: /\)([^()\\ ]{0,16})"/
                          })]
                      },
                      o = {
                          className: "number",
                          variants: [{
                              begin: "\\b(0b[01']+)"
                          }, {
                              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
                          }, {
                              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                          }],
                          relevance: 0
                      },
                      l = {
                          className: "meta",
                          begin: /#\s*[a-z]+\b/,
                          end: /$/,
                          keywords: {
                              keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
                          },
                          contains: [{
                              begin: /\\\n/,
                              relevance: 0
                          }, e.inherit(r, {
                              className: "string"
                          }), {
                              className: "string",
                              begin: /<.*?>/
                          }, i, e.C_BLOCK_COMMENT_MODE]
                      },
                      c = {
                          className: "title",
                          begin: t.optional(n) + e.IDENT_RE,
                          relevance: 0
                      },
                      t = t.optional(n) + e.IDENT_RE + "\\s*\\(",
                      n = {
                          keyword: ["asm", "auto", "break", "case", "continue", "default", "do", "else", "enum", "extern", "for", "fortran", "goto", "if", "inline", "register", "restrict", "return", "sizeof", "struct", "switch", "typedef", "union", "volatile", "while", "_Alignas", "_Alignof", "_Atomic", "_Generic", "_Noreturn", "_Static_assert", "_Thread_local", "alignas", "alignof", "noreturn", "static_assert", "thread_local", "_Pragma"],
                          type: ["float", "double", "signed", "unsigned", "int", "short", "long", "char", "void", "_Bool", "_Complex", "_Imaginary", "_Decimal32", "_Decimal64", "_Decimal128", "const", "static", "complex", "bool", "imaginary"],
                          literal: "true false NULL",
                          built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
                      },
                      d = [l, a, i, e.C_BLOCK_COMMENT_MODE, o, r],
                      u = {
                          variants: [{
                              begin: /=/,
                              end: /;/
                          }, {
                              begin: /\(/,
                              end: /\)/
                          }, {
                              beginKeywords: "new throw return else",
                              end: /;/
                          }],
                          keywords: n,
                          contains: d.concat([{
                              begin: /\(/,
                              end: /\)/,
                              keywords: n,
                              contains: d.concat(["self"]),
                              relevance: 0
                          }]),
                          relevance: 0
                      },
                      s = {
                          begin: "(" + s + "[\\*&\\s]+)+" + t,
                          returnBegin: !0,
                          end: /[{;=]/,
                          excludeEnd: !0,
                          keywords: n,
                          illegal: /[^\w\s\*&:<>.]/,
                          contains: [{
                              begin: "decltype\\(auto\\)",
                              keywords: n,
                              relevance: 0
                          }, {
                              begin: t,
                              returnBegin: !0,
                              contains: [e.inherit(c, {
                                  className: "title.function"
                              })],
                              relevance: 0
                          }, {
                              relevance: 0,
                              match: /,/
                          }, {
                              className: "params",
                              begin: /\(/,
                              end: /\)/,
                              keywords: n,
                              relevance: 0,
                              contains: [i, e.C_BLOCK_COMMENT_MODE, r, o, a, {
                                  begin: /\(/,
                                  end: /\)/,
                                  keywords: n,
                                  relevance: 0,
                                  contains: ["self", i, e.C_BLOCK_COMMENT_MODE, r, o, a]
                              }]
                          }, a, i, e.C_BLOCK_COMMENT_MODE, l]
                      };
                  return {
                      name: "C",
                      aliases: ["h"],
                      keywords: n,
                      disableAutodetect: !0,
                      illegal: "</",
                      contains: [].concat(u, s, d, [l, {
                          begin: e.IDENT_RE + "::",
                          keywords: n
                      }, {
                          className: "class",
                          beginKeywords: "enum class struct union",
                          end: /[{;:<>=]/,
                          contains: [{
                              beginKeywords: "final class struct"
                          }, e.TITLE_MODE]
                      }]),
                      exports: {
                          preprocessor: l,
                          strings: r,
                          keywords: n
                      }
                  }
              },
              grmr_cpp: e => {
                  var t = e.regex,
                      i = e.COMMENT("//", "$", {
                          contains: [{
                              begin: /\\\n/
                          }]
                      }),
                      n = "[a-zA-Z_]\\w*::",
                      s = "(?!struct)(decltype\\(auto\\)|" + t.optional(n) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")",
                      a = {
                          className: "type",
                          begin: "\\b[a-z\\d_]*_t\\b"
                      },
                      r = {
                          className: "string",
                          variants: [{
                              begin: '(u8?|U|L)?"',
                              end: '"',
                              illegal: "\\n",
                              contains: [e.BACKSLASH_ESCAPE]
                          }, {
                              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                              end: "'",
                              illegal: "."
                          }, e.END_SAME_AS_BEGIN({
                              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                              end: /\)([^()\\ ]{0,16})"/
                          })]
                      },
                      o = {
                          className: "number",
                          variants: [{
                              begin: "\\b(0b[01']+)"
                          }, {
                              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
                          }, {
                              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                          }],
                          relevance: 0
                      },
                      l = {
                          className: "meta",
                          begin: /#\s*[a-z]+\b/,
                          end: /$/,
                          keywords: {
                              keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
                          },
                          contains: [{
                              begin: /\\\n/,
                              relevance: 0
                          }, e.inherit(r, {
                              className: "string"
                          }), {
                              className: "string",
                              begin: /<.*?>/
                          }, i, e.C_BLOCK_COMMENT_MODE]
                      },
                      c = {
                          className: "title",
                          begin: t.optional(n) + e.IDENT_RE,
                          relevance: 0
                      },
                      n = t.optional(n) + e.IDENT_RE + "\\s*\\(",
                      d = {
                          type: ["bool", "char", "char16_t", "char32_t", "char8_t", "double", "float", "int", "long", "short", "void", "wchar_t", "unsigned", "signed", "const", "static"],
                          keyword: ["alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "break", "case", "catch", "class", "co_await", "co_return", "co_yield", "compl", "concept", "const_cast|10", "consteval", "constexpr", "constinit", "continue", "decltype", "default", "delete", "do", "dynamic_cast|10", "else", "enum", "explicit", "export", "extern", "false", "final", "for", "friend", "goto", "if", "import", "inline", "module", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq", "override", "private", "protected", "public", "reflexpr", "register", "reinterpret_cast|10", "requires", "return", "sizeof", "static_assert", "static_cast|10", "struct", "switch", "synchronized", "template", "this", "thread_local", "throw", "transaction_safe", "transaction_safe_dynamic", "true", "try", "typedef", "typeid", "typename", "union", "using", "virtual", "volatile", "while", "xor", "xor_eq"],
                          literal: ["NULL", "false", "nullopt", "nullptr", "true"],
                          built_in: ["_Pragma"],
                          _type_hints: ["any", "auto_ptr", "barrier", "binary_semaphore", "bitset", "complex", "condition_variable", "condition_variable_any", "counting_semaphore", "deque", "false_type", "future", "imaginary", "initializer_list", "istringstream", "jthread", "latch", "lock_guard", "multimap", "multiset", "mutex", "optional", "ostringstream", "packaged_task", "pair", "promise", "priority_queue", "queue", "recursive_mutex", "recursive_timed_mutex", "scoped_lock", "set", "shared_future", "shared_lock", "shared_mutex", "shared_timed_mutex", "shared_ptr", "stack", "string_view", "stringstream", "timed_mutex", "thread", "true_type", "tuple", "unique_lock", "unique_ptr", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "variant", "vector", "weak_ptr", "wstring", "wstring_view"]
                      },
                      t = {
                          className: "function.dispatch",
                          relevance: 0,
                          keywords: {
                              _hint: ["abort", "abs", "acos", "apply", "as_const", "asin", "atan", "atan2", "calloc", "ceil", "cerr", "cin", "clog", "cos", "cosh", "cout", "declval", "endl", "exchange", "exit", "exp", "fabs", "floor", "fmod", "forward", "fprintf", "fputs", "free", "frexp", "fscanf", "future", "invoke", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "labs", "launder", "ldexp", "log", "log10", "make_pair", "make_shared", "make_shared_for_overwrite", "make_tuple", "make_unique", "malloc", "memchr", "memcmp", "memcpy", "memset", "modf", "move", "pow", "printf", "putchar", "puts", "realloc", "scanf", "sin", "sinh", "snprintf", "sprintf", "sqrt", "sscanf", "std", "stderr", "stdin", "stdout", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "swap", "tan", "tanh", "terminate", "to_underlying", "tolower", "toupper", "vfprintf", "visit", "vprintf", "vsprintf"]
                          },
                          begin: t.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e.IDENT_RE, t.lookahead(/(<[^<>]+>|)\s*\(/))
                      },
                      u = [t, l, a, i, e.C_BLOCK_COMMENT_MODE, o, r],
                      h = {
                          variants: [{
                              begin: /=/,
                              end: /;/
                          }, {
                              begin: /\(/,
                              end: /\)/
                          }, {
                              beginKeywords: "new throw return else",
                              end: /;/
                          }],
                          keywords: d,
                          contains: u.concat([{
                              begin: /\(/,
                              end: /\)/,
                              keywords: d,
                              contains: u.concat(["self"]),
                              relevance: 0
                          }]),
                          relevance: 0
                      },
                      s = {
                          className: "function",
                          begin: "(" + s + "[\\*&\\s]+)+" + n,
                          returnBegin: !0,
                          end: /[{;=]/,
                          excludeEnd: !0,
                          keywords: d,
                          illegal: /[^\w\s\*&:<>.]/,
                          contains: [{
                              begin: "decltype\\(auto\\)",
                              keywords: d,
                              relevance: 0
                          }, {
                              begin: n,
                              returnBegin: !0,
                              contains: [c],
                              relevance: 0
                          }, {
                              begin: /::/,
                              relevance: 0
                          }, {
                              begin: /:/,
                              endsWithParent: !0,
                              contains: [r, o]
                          }, {
                              relevance: 0,
                              match: /,/
                          }, {
                              className: "params",
                              begin: /\(/,
                              end: /\)/,
                              keywords: d,
                              relevance: 0,
                              contains: [i, e.C_BLOCK_COMMENT_MODE, r, o, a, {
                                  begin: /\(/,
                                  end: /\)/,
                                  keywords: d,
                                  relevance: 0,
                                  contains: ["self", i, e.C_BLOCK_COMMENT_MODE, r, o, a]
                              }]
                          }, a, i, e.C_BLOCK_COMMENT_MODE, l]
                      };
                  return {
                      name: "C++",
                      aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
                      keywords: d,
                      illegal: "</",
                      classNameAliases: {
                          "function.dispatch": "built_in"
                      },
                      contains: [].concat(h, s, t, u, [l, {
                          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<",
                          end: ">",
                          keywords: d,
                          contains: ["self", a]
                      }, {
                          begin: e.IDENT_RE + "::",
                          keywords: d
                      }, {
                          match: [/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/],
                          className: {
                              1: "keyword",
                              3: "title.class"
                          }
                      }])
                  }
              },
              grmr_csharp: e => {
                  var t = {
                          keyword: ["abstract", "as", "base", "break", "case", "catch", "class", "const", "continue", "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach", "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace", "new", "operator", "out", "override", "params", "private", "protected", "public", "readonly", "record", "ref", "return", "sealed", "sizeof", "stackalloc", "static", "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe", "using", "virtual", "void", "volatile", "while"].concat(["add", "alias", "and", "ascending", "async", "await", "by", "descending", "equals", "from", "get", "global", "group", "init", "into", "join", "let", "nameof", "not", "notnull", "on", "or", "orderby", "partial", "remove", "select", "set", "unmanaged", "value|0", "var", "when", "where", "with", "yield"]),
                          built_in: ["bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float", "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong", "uint", "ushort"],
                          literal: ["default", "false", "null", "true"]
                      },
                      i = e.inherit(e.TITLE_MODE, {
                          begin: "[a-zA-Z](\\.?\\w)*"
                      }),
                      n = {
                          className: "number",
                          variants: [{
                              begin: "\\b(0b[01']+)"
                          }, {
                              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
                          }, {
                              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                          }],
                          relevance: 0
                      },
                      s = {
                          className: "string",
                          begin: '@"',
                          end: '"',
                          contains: [{
                              begin: '""'
                          }]
                      },
                      a = e.inherit(s, {
                          illegal: /\n/
                      }),
                      r = {
                          className: "subst",
                          begin: /\{/,
                          end: /\}/,
                          keywords: t
                      },
                      o = e.inherit(r, {
                          illegal: /\n/
                      }),
                      l = {
                          className: "string",
                          begin: /\$"/,
                          end: '"',
                          illegal: /\n/,
                          contains: [{
                              begin: /\{\{/
                          }, {
                              begin: /\}\}/
                          }, e.BACKSLASH_ESCAPE, o]
                      },
                      c = {
                          className: "string",
                          begin: /\$@"/,
                          end: '"',
                          contains: [{
                              begin: /\{\{/
                          }, {
                              begin: /\}\}/
                          }, {
                              begin: '""'
                          }, r]
                      },
                      d = e.inherit(c, {
                          illegal: /\n/,
                          contains: [{
                              begin: /\{\{/
                          }, {
                              begin: /\}\}/
                          }, {
                              begin: '""'
                          }, o]
                      }),
                      r = (r.contains = [c, l, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, n, e.C_BLOCK_COMMENT_MODE], o.contains = [d, l, a, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, n, e.inherit(e.C_BLOCK_COMMENT_MODE, {
                          illegal: /\n/
                      })], {
                          variants: [c, l, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
                      }),
                      o = {
                          begin: "<",
                          end: ">",
                          contains: [{
                              beginKeywords: "in out"
                          }, i]
                      },
                      d = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?",
                      a = {
                          begin: "@" + e.IDENT_RE,
                          relevance: 0
                      };
                  return {
                      name: "C#",
                      aliases: ["cs", "c#"],
                      keywords: t,
                      illegal: /::/,
                      contains: [e.COMMENT("///", "$", {
                          returnBegin: !0,
                          contains: [{
                              className: "doctag",
                              variants: [{
                                  begin: "///",
                                  relevance: 0
                              }, {
                                  begin: "\x3c!--|--\x3e"
                              }, {
                                  begin: "</?",
                                  end: ">"
                              }]
                          }]
                      }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                          className: "meta",
                          begin: "#",
                          end: "$",
                          keywords: {
                              keyword: "if else elif endif define undef warning error line region endregion pragma checksum"
                          }
                      }, r, n, {
                          beginKeywords: "class interface",
                          relevance: 0,
                          end: /[{;=]/,
                          illegal: /[^\s:,]/,
                          contains: [{
                              beginKeywords: "where class"
                          }, i, o, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                      }, {
                          beginKeywords: "namespace",
                          relevance: 0,
                          end: /[{;=]/,
                          illegal: /[^\s:]/,
                          contains: [i, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                      }, {
                          beginKeywords: "record",
                          relevance: 0,
                          end: /[{;=]/,
                          illegal: /[^\s:]/,
                          contains: [i, o, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                      }, {
                          className: "meta",
                          begin: "^\\s*\\[(?=[\\w])",
                          excludeBegin: !0,
                          end: "\\]",
                          excludeEnd: !0,
                          contains: [{
                              className: "string",
                              begin: /"/,
                              end: /"/
                          }]
                      }, {
                          beginKeywords: "new return throw await else",
                          relevance: 0
                      }, {
                          className: "function",
                          begin: "(" + d + "\\s+)+" + e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
                          returnBegin: !0,
                          end: /\s*[{;=]/,
                          excludeEnd: !0,
                          keywords: t,
                          contains: [{
                              beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
                              relevance: 0
                          }, {
                              begin: e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
                              returnBegin: !0,
                              contains: [e.TITLE_MODE, o],
                              relevance: 0
                          }, {
                              match: /\(\)/
                          }, {
                              className: "params",
                              begin: /\(/,
                              end: /\)/,
                              excludeBegin: !0,
                              excludeEnd: !0,
                              keywords: t,
                              relevance: 0,
                              contains: [r, n, e.C_BLOCK_COMMENT_MODE]
                          }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                      }, a]
                  }
              },
              grmr_css: e => {
                  var t = e.regex,
                      i = f(e),
                      e = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE];
                  return {
                      name: "CSS",
                      case_insensitive: !0,
                      illegal: /[=|'\$]/,
                      keywords: {
                          keyframePosition: "from to"
                      },
                      classNameAliases: {
                          keyframePosition: "selector-tag"
                      },
                      contains: [i.BLOCK_COMMENT, {
                          begin: /-(webkit|moz|ms|o)-(?=[a-z])/
                      }, i.CSS_NUMBER_MODE, {
                          className: "selector-id",
                          begin: /#[A-Za-z0-9_-]+/,
                          relevance: 0
                      }, {
                          className: "selector-class",
                          begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
                          relevance: 0
                      }, i.ATTRIBUTE_SELECTOR_MODE, {
                          className: "selector-pseudo",
                          variants: [{
                              begin: ":(" + y.join("|") + ")"
                          }, {
                              begin: ":(:)?(" + w.join("|") + ")"
                          }]
                      }, i.CSS_VARIABLE, {
                          className: "attribute",
                          begin: "\\b(" + _.join("|") + ")\\b"
                      }, {
                          begin: /:/,
                          end: /[;}{]/,
                          contains: [i.BLOCK_COMMENT, i.HEXCOLOR, i.IMPORTANT, i.CSS_NUMBER_MODE, ...e, {
                              begin: /(url|data-uri)\(/,
                              end: /\)/,
                              relevance: 0,
                              keywords: {
                                  built_in: "url data-uri"
                              },
                              contains: [{
                                  className: "string",
                                  begin: /[^)]/,
                                  endsWithParent: !0,
                                  excludeEnd: !0
                              }]
                          }, i.FUNCTION_DISPATCH]
                      }, {
                          begin: t.lookahead(/@/),
                          end: "[{;]",
                          relevance: 0,
                          illegal: /:/,
                          contains: [{
                              className: "keyword",
                              begin: /@-?\w[\w]*(-\w+)*/
                          }, {
                              begin: /\s/,
                              endsWithParent: !0,
                              excludeEnd: !0,
                              relevance: 0,
                              keywords: {
                                  $pattern: /[a-z-]+/,
                                  keyword: "and or not only",
                                  attribute: v.join(" ")
                              },
                              contains: [{
                                  begin: /[a-z-]+(?=:)/,
                                  className: "attribute"
                              }, ...e, i.CSS_NUMBER_MODE]
                          }]
                      }, {
                          className: "selector-tag",
                          begin: "\\b(" + b.join("|") + ")\\b"
                      }]
                  }
              },
              grmr_diff: e => {
                  e = e.regex;
                  return {
                      name: "Diff",
                      aliases: ["patch"],
                      contains: [{
                          className: "meta",
                          relevance: 10,
                          match: e.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/, /^\*\*\* +\d+,\d+ +\*\*\*\*$/, /^--- +\d+,\d+ +----$/)
                      }, {
                          className: "comment",
                          variants: [{
                              begin: e.either(/Index: /, /^index/, /={3,}/, /^-{3}/, /^\*{3} /, /^\+{3}/, /^diff --git/),
                              end: /$/
                          }, {
                              match: /^\*{15}$/
                          }]
                      }, {
                          className: "addition",
                          begin: /^\+/,
                          end: /$/
                      }, {
                          className: "deletion",
                          begin: /^-/,
                          end: /$/
                      }, {
                          className: "addition",
                          begin: /^!/,
                          end: /$/
                      }]
                  }
              },
              grmr_go: e => {
                  var t = {
                      keyword: ["break", "case", "chan", "const", "continue", "default", "defer", "else", "fallthrough", "for", "func", "go", "goto", "if", "import", "interface", "map", "package", "range", "return", "select", "struct", "switch", "type", "var"],
                      type: ["bool", "byte", "complex64", "complex128", "error", "float32", "float64", "int8", "int16", "int32", "int64", "string", "uint8", "uint16", "uint32", "uint64", "int", "uint", "uintptr", "rune"],
                      literal: ["true", "false", "iota", "nil"],
                      built_in: ["append", "cap", "close", "complex", "copy", "imag", "len", "make", "new", "panic", "print", "println", "real", "recover", "delete"]
                  };
                  return {
                      name: "Go",
                      aliases: ["golang"],
                      keywords: t,
                      illegal: "</",
                      contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                          className: "string",
                          variants: [e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                              begin: "`",
                              end: "`"
                          }]
                      }, {
                          className: "number",
                          variants: [{
                              begin: e.C_NUMBER_RE + "[i]",
                              relevance: 1
                          }, e.C_NUMBER_MODE]
                      }, {
                          begin: /:=/
                      }, {
                          className: "function",
                          beginKeywords: "func",
                          end: "\\s*(\\{|$)",
                          excludeEnd: !0,
                          contains: [e.TITLE_MODE, {
                              className: "params",
                              begin: /\(/,
                              end: /\)/,
                              endsParent: !0,
                              keywords: t,
                              illegal: /["']/
                          }]
                      }]
                  }
              },
              grmr_ini: e => {
                  var t = e.regex,
                      i = {
                          className: "number",
                          relevance: 0,
                          variants: [{
                              begin: /([+-]+)?[\d]+_[\d_]+/
                          }, {
                              begin: e.NUMBER_RE
                          }]
                      },
                      n = e.COMMENT(),
                      s = (n.variants = [{
                          begin: /;/,
                          end: /$/
                      }, {
                          begin: /#/,
                          end: /$/
                      }], {
                          className: "variable",
                          variants: [{
                              begin: /\$[\w\d"][\w\d_]*/
                          }, {
                              begin: /\$\{(.*?)\}/
                          }]
                      }),
                      a = {
                          className: "literal",
                          begin: /\bon|off|true|false|yes|no\b/
                      },
                      e = {
                          className: "string",
                          contains: [e.BACKSLASH_ESCAPE],
                          variants: [{
                              begin: "'''",
                              end: "'''",
                              relevance: 10
                          }, {
                              begin: '"""',
                              end: '"""',
                              relevance: 10
                          }, {
                              begin: '"',
                              end: '"'
                          }, {
                              begin: "'",
                              end: "'"
                          }]
                      },
                      r = {
                          begin: /\[/,
                          end: /\]/,
                          contains: [n, a, s, e, i, "self"],
                          relevance: 0
                      },
                      o = t.either(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/);
                  return {
                      name: "TOML, also INI",
                      aliases: ["toml"],
                      case_insensitive: !0,
                      illegal: /\S/,
                      contains: [n, {
                          className: "section",
                          begin: /\[+/,
                          end: /\]+/
                      }, {
                          begin: t.concat(o, "(\\s*\\.\\s*", o, ")*", t.lookahead(/\s*=\s*[^#\s]/)),
                          className: "attr",
                          starts: {
                              end: /$/,
                              contains: [n, r, a, s, e, i]
                          }
                      }]
                  }
              },
              grmr_java: e => {
                  e.regex;
                  var t = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",
                      i = t + function t(i, n, s) {
                          return -1 === s ? "" : i.replace(n, e => t(i, n, s - 1))
                      }("(?:<" + t + "~~~(?:\\s*,\\s*" + t + "~~~)*>)?", /~~~/g, 2),
                      n = {
                          keyword: ["synchronized", "abstract", "private", "var", "static", "if", "const ", "for", "while", "strictfp", "finally", "protected", "import", "native", "final", "void", "enum", "else", "break", "transient", "catch", "instanceof", "volatile", "case", "assert", "package", "default", "public", "try", "switch", "continue", "throws", "protected", "public", "private", "module", "requires", "exports", "do"],
                          literal: ["false", "true", "null"],
                          type: ["char", "boolean", "long", "float", "int", "byte", "short", "double"],
                          built_in: ["super", "this"]
                      },
                      s = {
                          className: "meta",
                          begin: "@" + t,
                          contains: [{
                              begin: /\(/,
                              end: /\)/,
                              contains: ["self"]
                          }]
                      },
                      a = {
                          className: "params",
                          begin: /\(/,
                          end: /\)/,
                          keywords: n,
                          relevance: 0,
                          contains: [e.C_BLOCK_COMMENT_MODE],
                          endsParent: !0
                      };
                  return {
                      name: "Java",
                      aliases: ["jsp"],
                      keywords: n,
                      illegal: /<\/|#/,
                      contains: [e.COMMENT("/\\*\\*", "\\*/", {
                          relevance: 0,
                          contains: [{
                              begin: /\w+@/,
                              relevance: 0
                          }, {
                              className: "doctag",
                              begin: "@[A-Za-z]+"
                          }]
                      }), {
                          begin: /import java\.[a-z]+\./,
                          keywords: "import",
                          relevance: 2
                      }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                          begin: /"""/,
                          end: /"""/,
                          className: "string",
                          contains: [e.BACKSLASH_ESCAPE]
                      }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                          match: [/\b(?:class|interface|enum|extends|implements|new)/, /\s+/, t],
                          className: {
                              1: "keyword",
                              3: "title.class"
                          }
                      }, {
                          begin: [t, /\s+/, t, /\s+/, /=/],
                          className: {
                              1: "type",
                              3: "variable",
                              5: "operator"
                          }
                      }, {
                          begin: [/record/, /\s+/, t],
                          className: {
                              1: "keyword",
                              3: "title.class"
                          },
                          contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                      }, {
                          beginKeywords: "new throw return else",
                          relevance: 0
                      }, {
                          begin: ["(?:" + i + "\\s+)", e.UNDERSCORE_IDENT_RE, /\s*(?=\()/],
                          className: {
                              2: "title.function"
                          },
                          keywords: n,
                          contains: [{
                              className: "params",
                              begin: /\(/,
                              end: /\)/,
                              keywords: n,
                              relevance: 0,
                              contains: [s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, E, e.C_BLOCK_COMMENT_MODE]
                          }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                      }, E, s]
                  }
              },
              grmr_javascript: me,
              grmr_json: e => ({
                  name: "JSON",
                  contains: [{
                      className: "attr",
                      begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
                      relevance: 1.01
                  }, {
                      match: /[{}[\],:]/,
                      className: "punctuation",
                      relevance: 0
                  }, e.QUOTE_STRING_MODE, {
                      beginKeywords: "true false null"
                  }, e.C_NUMBER_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
                  illegal: "\\S"
              }),
              grmr_kotlin: e => {
                  var t = {
                          keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
                          built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
                          literal: "true false null"
                      },
                      i = {
                          className: "symbol",
                          begin: e.UNDERSCORE_IDENT_RE + "@"
                      },
                      n = {
                          className: "subst",
                          begin: /\$\{/,
                          end: /\}/,
                          contains: [e.C_NUMBER_MODE]
                      },
                      s = {
                          className: "variable",
                          begin: "\\$" + e.UNDERSCORE_IDENT_RE
                      },
                      s = {
                          className: "string",
                          variants: [{
                              begin: '"""',
                              end: '"""(?=[^"])',
                              contains: [s, n]
                          }, {
                              begin: "'",
                              end: "'",
                              illegal: /\n/,
                              contains: [e.BACKSLASH_ESCAPE]
                          }, {
                              begin: '"',
                              end: '"',
                              illegal: /\n/,
                              contains: [e.BACKSLASH_ESCAPE, s, n]
                          }]
                      },
                      n = (n.contains.push(s), {
                          className: "meta",
                          begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
                      }),
                      a = {
                          className: "meta",
                          begin: "@" + e.UNDERSCORE_IDENT_RE,
                          contains: [{
                              begin: /\(/,
                              end: /\)/,
                              contains: [e.inherit(s, {
                                  className: "string"
                              })]
                          }]
                      },
                      r = E,
                      o = e.COMMENT("/\\*", "\\*/", {
                          contains: [e.C_BLOCK_COMMENT_MODE]
                      }),
                      l = {
                          variants: [{
                              className: "type",
                              begin: e.UNDERSCORE_IDENT_RE
                          }, {
                              begin: /\(/,
                              end: /\)/,
                              contains: []
                          }]
                      },
                      c = l;
                  return c.variants[1].contains = [l], l.variants[1].contains = [c], {
                      name: "Kotlin",
                      aliases: ["kt", "kts"],
                      keywords: t,
                      contains: [e.COMMENT("/\\*\\*", "\\*/", {
                          relevance: 0,
                          contains: [{
                              className: "doctag",
                              begin: "@[A-Za-z]+"
                          }]
                      }), e.C_LINE_COMMENT_MODE, o, {
                          className: "keyword",
                          begin: /\b(break|continue|return|this)\b/,
                          starts: {
                              contains: [{
                                  className: "symbol",
                                  begin: /@\w+/
                              }]
                          }
                      }, i, n, a, {
                          className: "function",
                          beginKeywords: "fun",
                          end: "[(]|$",
                          returnBegin: !0,
                          excludeEnd: !0,
                          keywords: t,
                          relevance: 5,
                          contains: [{
                              begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                              returnBegin: !0,
                              relevance: 0,
                              contains: [e.UNDERSCORE_TITLE_MODE]
                          }, {
                              className: "type",
                              begin: /</,
                              end: />/,
                              keywords: "reified",
                              relevance: 0
                          }, {
                              className: "params",
                              begin: /\(/,
                              end: /\)/,
                              endsParent: !0,
                              keywords: t,
                              relevance: 0,
                              contains: [{
                                  begin: /:/,
                                  end: /[=,\/]/,
                                  endsWithParent: !0,
                                  contains: [l, e.C_LINE_COMMENT_MODE, o],
                                  relevance: 0
                              }, e.C_LINE_COMMENT_MODE, o, n, a, s, e.C_NUMBER_MODE]
                          }, o]
                      }, {
                          className: "class",
                          beginKeywords: "class interface trait",
                          end: /[:\{(]|$/,
                          excludeEnd: !0,
                          illegal: "extends implements",
                          contains: [{
                              beginKeywords: "public protected internal private constructor"
                          }, e.UNDERSCORE_TITLE_MODE, {
                              className: "type",
                              begin: /</,
                              end: />/,
                              excludeBegin: !0,
                              excludeEnd: !0,
                              relevance: 0
                          }, {
                              className: "type",
                              begin: /[,:]\s*/,
                              end: /[<\(,]|$/,
                              excludeBegin: !0,
                              returnEnd: !0
                          }, n, a]
                      }, s, {
                          className: "meta",
                          begin: "^#!/usr/bin/env",
                          end: "$",
                          illegal: "\n"
                      }, r]
                  }
              },
              grmr_less: e => {
                  var t = f(e),
                      i = re,
                      n = "([\\w-]+|@\\{[\\w-]+\\})",
                      s = [],
                      a = [],
                      r = e => ({
                          className: "string",
                          begin: "~?" + e + ".*?" + e
                      }),
                      o = (e, t, i) => ({
                          className: e,
                          begin: t,
                          relevance: i
                      }),
                      l = {
                          $pattern: /[a-z-]+/,
                          keyword: "and or not only",
                          attribute: v.join(" ")
                      },
                      r = (a.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r("'"), r('"'), t.CSS_NUMBER_MODE, {
                          begin: "(url|data-uri)\\(",
                          starts: {
                              className: "string",
                              end: "[\\)\\n]",
                              excludeEnd: !0
                          }
                      }, t.HEXCOLOR, {
                          begin: "\\(",
                          end: "\\)",
                          contains: a,
                          keywords: l,
                          relevance: 0
                      }, o("variable", "@@?[\\w-]+", 10), o("variable", "@\\{[\\w-]+\\}"), o("built_in", "~?`[^`]*?`"), {
                          className: "attribute",
                          begin: "[\\w-]+\\s*:",
                          end: ":",
                          returnBegin: !0,
                          excludeEnd: !0
                      }, t.IMPORTANT), a.concat({
                          begin: /\{/,
                          end: /\}/,
                          contains: s
                      })),
                      c = {
                          beginKeywords: "when",
                          endsWithParent: !0,
                          contains: [{
                              beginKeywords: "and not"
                          }].concat(a)
                      },
                      d = {
                          begin: n + "\\s*:",
                          returnBegin: !0,
                          end: /[;}]/,
                          relevance: 0,
                          contains: [{
                              begin: /-(webkit|moz|ms|o)-/
                          }, t.CSS_VARIABLE, {
                              className: "attribute",
                              begin: "\\b(" + _.join("|") + ")\\b",
                              end: /(?=:)/,
                              starts: {
                                  endsWithParent: !0,
                                  illegal: "[<=$]",
                                  relevance: 0,
                                  contains: a
                              }
                          }]
                      },
                      l = {
                          className: "keyword",
                          begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
                          starts: {
                              end: "[;{}]",
                              keywords: l,
                              returnEnd: !0,
                              contains: a,
                              relevance: 0
                          }
                      },
                      a = {
                          className: "variable",
                          variants: [{
                              begin: "@[\\w-]+\\s*:",
                              relevance: 15
                          }, {
                              begin: "@[\\w-]+"
                          }],
                          starts: {
                              end: "[;}]",
                              returnEnd: !0,
                              contains: r
                          }
                      },
                      c = {
                          variants: [{
                              begin: "[\\.#:&\\[>]",
                              end: "[;{}]"
                          }, {
                              begin: n,
                              end: /\{/
                          }],
                          returnBegin: !0,
                          returnEnd: !0,
                          illegal: "[<='$\"]",
                          relevance: 0,
                          contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, c, o("keyword", "all\\b"), o("variable", "@\\{[\\w-]+\\}"), {
                              begin: "\\b(" + b.join("|") + ")\\b",
                              className: "selector-tag"
                          }, t.CSS_NUMBER_MODE, o("selector-tag", n, 0), o("selector-id", "#" + n), o("selector-class", "\\." + n, 0), o("selector-tag", "&", 0), t.ATTRIBUTE_SELECTOR_MODE, {
                              className: "selector-pseudo",
                              begin: ":(" + y.join("|") + ")"
                          }, {
                              className: "selector-pseudo",
                              begin: ":(:)?(" + w.join("|") + ")"
                          }, {
                              begin: /\(/,
                              end: /\)/,
                              relevance: 0,
                              contains: r
                          }, {
                              begin: "!important"
                          }, t.FUNCTION_DISPATCH]
                      },
                      n = {
                          begin: `[\\w-]+:(:)?(${i.join("|")})`,
                          returnBegin: !0,
                          contains: [c]
                      };
                  return s.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, l, a, n, d, c), {
                      name: "Less",
                      case_insensitive: !0,
                      illegal: "[=>'/<($\"]",
                      contains: s
                  }
              },
              grmr_lua: e => {
                  var t = "\\]=*\\]",
                      i = {
                          begin: "\\[=*\\[",
                          end: t,
                          contains: ["self"]
                      },
                      n = [e.COMMENT("--(?!\\[=*\\[)", "$"), e.COMMENT("--\\[=*\\[", t, {
                          contains: [i],
                          relevance: 10
                      })];
                  return {
                      name: "Lua",
                      keywords: {
                          $pattern: e.UNDERSCORE_IDENT_RE,
                          literal: "true false nil",
                          keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
                          built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
                      },
                      contains: n.concat([{
                          className: "function",
                          beginKeywords: "function",
                          end: "\\)",
                          contains: [e.inherit(e.TITLE_MODE, {
                              begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
                          }), {
                              className: "params",
                              begin: "\\(",
                              endsWithParent: !0,
                              contains: n
                          }].concat(n)
                      }, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                          className: "string",
                          begin: "\\[=*\\[",
                          end: t,
                          contains: [i],
                          relevance: 5
                      }])
                  }
              },
              grmr_makefile: e => {
                  var t = {
                          className: "variable",
                          variants: [{
                              begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
                              contains: [e.BACKSLASH_ESCAPE]
                          }, {
                              begin: /\$[@%<?\^\+\*]/
                          }]
                      },
                      i = {
                          className: "string",
                          begin: /"/,
                          end: /"/,
                          contains: [e.BACKSLASH_ESCAPE, t]
                      },
                      n = {
                          begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
                      };
                  return {
                      name: "Makefile",
                      aliases: ["mk", "mak", "make"],
                      keywords: {
                          $pattern: /[\w-]+/,
                          keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
                      },
                      contains: [e.HASH_COMMENT_MODE, t, i, {
                          className: "variable",
                          begin: /\$\([\w-]+\s/,
                          end: /\)/,
                          keywords: {
                              built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
                          },
                          contains: [t]
                      }, n, {
                          className: "meta",
                          begin: /^\.PHONY:/,
                          end: /$/,
                          keywords: {
                              $pattern: /[\.\w]+/,
                              keyword: ".PHONY"
                          }
                      }, {
                          className: "section",
                          begin: /^[^\s]+:/,
                          end: /$/,
                          contains: [t]
                      }]
                  }
              },
              grmr_xml: e => {
                  var t = e.regex,
                      i = t.concat(/[A-Z_]/, t.optional(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/),
                      n = {
                          className: "symbol",
                          begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
                      },
                      s = {
                          begin: /\s/,
                          contains: [{
                              className: "keyword",
                              begin: /#?[a-z_][a-z1-9_-]+/,
                              illegal: /\n/
                          }]
                      },
                      a = e.inherit(s, {
                          begin: /\(/,
                          end: /\)/
                      }),
                      r = e.inherit(e.APOS_STRING_MODE, {
                          className: "string"
                      }),
                      o = e.inherit(e.QUOTE_STRING_MODE, {
                          className: "string"
                      }),
                      l = {
                          endsWithParent: !0,
                          illegal: /</,
                          relevance: 0,
                          contains: [{
                              className: "attr",
                              begin: /[A-Za-z0-9._:-]+/,
                              relevance: 0
                          }, {
                              begin: /=\s*/,
                              relevance: 0,
                              contains: [{
                                  className: "string",
                                  endsParent: !0,
                                  variants: [{
                                      begin: /"/,
                                      end: /"/,
                                      contains: [n]
                                  }, {
                                      begin: /'/,
                                      end: /'/,
                                      contains: [n]
                                  }, {
                                      begin: /[^\s"'=<>`]+/
                                  }]
                              }]
                          }]
                      };
                  return {
                      name: "HTML, XML",
                      aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
                      case_insensitive: !0,
                      contains: [{
                          className: "meta",
                          begin: /<![a-z]/,
                          end: />/,
                          relevance: 10,
                          contains: [s, o, r, a, {
                              begin: /\[/,
                              end: /\]/,
                              contains: [{
                                  className: "meta",
                                  begin: /<![a-z]/,
                                  end: />/,
                                  contains: [s, a, o, r]
                              }]
                          }]
                      }, e.COMMENT(/<!--/, /-->/, {
                          relevance: 10
                      }), {
                          begin: /<!\[CDATA\[/,
                          end: /\]\]>/,
                          relevance: 10
                      }, n, {
                          className: "meta",
                          begin: /<\?xml/,
                          end: /\?>/,
                          relevance: 10
                      }, {
                          className: "tag",
                          begin: /<style(?=\s|>)/,
                          end: />/,
                          keywords: {
                              name: "style"
                          },
                          contains: [l],
                          starts: {
                              end: /<\/style>/,
                              returnEnd: !0,
                              subLanguage: ["css", "xml"]
                          }
                      }, {
                          className: "tag",
                          begin: /<script(?=\s|>)/,
                          end: />/,
                          keywords: {
                              name: "script"
                          },
                          contains: [l],
                          starts: {
                              end: /<\/script>/,
                              returnEnd: !0,
                              subLanguage: ["javascript", "handlebars", "xml"]
                          }
                      }, {
                          className: "tag",
                          begin: /<>|<\/>/
                      }, {
                          className: "tag",
                          begin: t.concat(/</, t.lookahead(t.concat(i, t.either(/\/>/, />/, /\s/)))),
                          end: /\/?>/,
                          contains: [{
                              className: "name",
                              begin: i,
                              relevance: 0,
                              starts: l
                          }]
                      }, {
                          className: "tag",
                          begin: t.concat(/<\//, t.lookahead(t.concat(i, />/))),
                          contains: [{
                              className: "name",
                              begin: i,
                              relevance: 0
                          }, {
                              begin: />/,
                              relevance: 0,
                              endsParent: !0
                          }]
                      }]
                  }
              },
              grmr_markdown: e => {
                  var t = {
                          begin: /<\/?[A-Za-z_]/,
                          end: ">",
                          subLanguage: "xml",
                          relevance: 0
                      },
                      e = {
                          variants: [{
                              begin: /\[.+?\]\[.*?\]/,
                              relevance: 0
                          }, {
                              begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
                              relevance: 2
                          }, {
                              begin: e.regex.concat(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
                              relevance: 2
                          }, {
                              begin: /\[.+?\]\([./?&#].*?\)/,
                              relevance: 1
                          }, {
                              begin: /\[.*?\]\(.*?\)/,
                              relevance: 0
                          }],
                          returnBegin: !0,
                          contains: [{
                              match: /\[(?=\])/
                          }, {
                              className: "string",
                              relevance: 0,
                              begin: "\\[",
                              end: "\\]",
                              excludeBegin: !0,
                              returnEnd: !0
                          }, {
                              className: "link",
                              relevance: 0,
                              begin: "\\]\\(",
                              end: "\\)",
                              excludeBegin: !0,
                              excludeEnd: !0
                          }, {
                              className: "symbol",
                              relevance: 0,
                              begin: "\\]\\[",
                              end: "\\]",
                              excludeBegin: !0,
                              excludeEnd: !0
                          }]
                      },
                      i = {
                          className: "strong",
                          contains: [],
                          variants: [{
                              begin: /_{2}/,
                              end: /_{2}/
                          }, {
                              begin: /\*{2}/,
                              end: /\*{2}/
                          }]
                      },
                      n = {
                          className: "emphasis",
                          contains: [],
                          variants: [{
                              begin: /\*(?!\*)/,
                              end: /\*/
                          }, {
                              begin: /_(?!_)/,
                              end: /_/,
                              relevance: 0
                          }]
                      };
                  i.contains.push(n), n.contains.push(i);
                  let s = [t, e];
                  return i.contains = i.contains.concat(s), n.contains = n.contains.concat(s), {
                      name: "Markdown",
                      aliases: ["md", "mkdown", "mkd"],
                      contains: [{
                          className: "section",
                          variants: [{
                              begin: "^#{1,6}",
                              end: "$",
                              contains: s = s.concat(i, n)
                          }, {
                              begin: "(?=^.+?\\n[=-]{2,}$)",
                              contains: [{
                                  begin: "^[=-]*$"
                              }, {
                                  begin: "^",
                                  end: "\\n",
                                  contains: s
                              }]
                          }]
                      }, t, {
                          className: "bullet",
                          begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
                          end: "\\s+",
                          excludeEnd: !0
                      }, i, n, {
                          className: "quote",
                          begin: "^>\\s+",
                          contains: s,
                          end: "$"
                      }, {
                          className: "code",
                          variants: [{
                              begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
                          }, {
                              begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
                          }, {
                              begin: "```",
                              end: "```+[ ]*$"
                          }, {
                              begin: "~~~",
                              end: "~~~+[ ]*$"
                          }, {
                              begin: "`.+?`"
                          }, {
                              begin: "(?=^( {4}|\\t))",
                              contains: [{
                                  begin: "^( {4}|\\t)",
                                  end: "(\\n)$"
                              }],
                              relevance: 0
                          }]
                      }, {
                          begin: "^[-\\*]{3,}",
                          end: "$"
                      }, e, {
                          begin: /^\[[^\n]+\]:/,
                          returnBegin: !0,
                          contains: [{
                              className: "symbol",
                              begin: /\[/,
                              end: /\]/,
                              excludeBegin: !0,
                              excludeEnd: !0
                          }, {
                              className: "link",
                              begin: /:\s*/,
                              end: /$/,
                              excludeBegin: !0
                          }]
                      }]
                  }
              },
              grmr_objectivec: e => {
                  var t = /[a-zA-Z@][a-zA-Z0-9_]*/,
                      i = {
                          $pattern: t,
                          keyword: ["@interface", "@class", "@protocol", "@implementation"]
                      };
                  return {
                      name: "Objective-C",
                      aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
                      keywords: {
                          $pattern: t,
                          keyword: ["int", "float", "while", "char", "export", "sizeof", "typedef", "const", "struct", "for", "union", "unsigned", "long", "volatile", "static", "bool", "mutable", "if", "do", "return", "goto", "void", "enum", "else", "break", "extern", "asm", "case", "short", "default", "double", "register", "explicit", "signed", "typename", "this", "switch", "continue", "wchar_t", "inline", "readonly", "assign", "readwrite", "self", "@synchronized", "id", "typeof", "nonatomic", "super", "unichar", "IBOutlet", "IBAction", "strong", "weak", "copy", "in", "out", "inout", "bycopy", "byref", "oneway", "__strong", "__weak", "__block", "__autoreleasing", "@private", "@protected", "@public", "@try", "@property", "@end", "@throw", "@catch", "@finally", "@autoreleasepool", "@synthesize", "@dynamic", "@selector", "@optional", "@required", "@encode", "@package", "@import", "@defs", "@compatibility_alias", "__bridge", "__bridge_transfer", "__bridge_retained", "__bridge_retain", "__covariant", "__contravariant", "__kindof", "_Nonnull", "_Nullable", "_Null_unspecified", "__FUNCTION__", "__PRETTY_FUNCTION__", "__attribute__", "getter", "setter", "retain", "unsafe_unretained", "nonnull", "nullable", "null_unspecified", "null_resettable", "class", "instancetype", "NS_DESIGNATED_INITIALIZER", "NS_UNAVAILABLE", "NS_REQUIRES_SUPER", "NS_RETURNS_INNER_POINTER", "NS_INLINE", "NS_AVAILABLE", "NS_DEPRECATED", "NS_ENUM", "NS_OPTIONS", "NS_SWIFT_UNAVAILABLE", "NS_ASSUME_NONNULL_BEGIN", "NS_ASSUME_NONNULL_END", "NS_REFINED_FOR_SWIFT", "NS_SWIFT_NAME", "NS_SWIFT_NOTHROW", "NS_DURING", "NS_HANDLER", "NS_ENDHANDLER", "NS_VALUERETURN", "NS_VOIDRETURN"],
                          literal: ["false", "true", "FALSE", "TRUE", "nil", "YES", "NO", "NULL"],
                          built_in: ["BOOL", "dispatch_once_t", "dispatch_queue_t", "dispatch_sync", "dispatch_async", "dispatch_once"]
                      },
                      illegal: "</",
                      contains: [{
                          className: "built_in",
                          begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
                      }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                          className: "string",
                          variants: [{
                              begin: '@"',
                              end: '"',
                              illegal: "\\n",
                              contains: [e.BACKSLASH_ESCAPE]
                          }]
                      }, {
                          className: "meta",
                          begin: /#\s*[a-z]+\b/,
                          end: /$/,
                          keywords: {
                              keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include"
                          },
                          contains: [{
                              begin: /\\\n/,
                              relevance: 0
                          }, e.inherit(e.QUOTE_STRING_MODE, {
                              className: "string"
                          }), {
                              className: "string",
                              begin: /<.*?>/,
                              end: /$/,
                              illegal: "\\n"
                          }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
                      }, {
                          className: "class",
                          begin: "(" + i.keyword.join("|") + ")\\b",
                          end: /(\{|$)/,
                          excludeEnd: !0,
                          keywords: i,
                          contains: [e.UNDERSCORE_TITLE_MODE]
                      }, {
                          begin: "\\." + e.UNDERSCORE_IDENT_RE,
                          relevance: 0
                      }]
                  }
              },
              grmr_perl: e => {
                  const s = e.regex,
                      a = /[dualxmsipngr]{0,12}/,
                      t = {
                          $pattern: /[\w.]+/,
                          keyword: "abs accept alarm and atan2 bind binmode bless break caller chdir chmod chomp chop chown chr chroot close closedir connect continue cos crypt dbmclose dbmopen defined delete die do dump each else elsif endgrent endhostent endnetent endprotoent endpwent endservent eof eval exec exists exit exp fcntl fileno flock for foreach fork format formline getc getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr getnetbyname getnetent getpeername getpgrp getpriority getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid getservbyname getservbyport getservent getsockname getsockopt given glob gmtime goto grep gt hex if index int ioctl join keys kill last lc lcfirst length link listen local localtime log lstat lt ma map mkdir msgctl msgget msgrcv msgsnd my ne next no not oct open opendir or ord our pack package pipe pop pos print printf prototype push q|0 qq quotemeta qw qx rand read readdir readline readlink readpipe recv redo ref rename require reset return reverse rewinddir rindex rmdir say scalar seek seekdir select semctl semget semop send setgrent sethostent setnetent setpgrp setpriority setprotoent setpwent setservent setsockopt shift shmctl shmget shmread shmwrite shutdown sin sleep socket socketpair sort splice split sprintf sqrt srand stat state study sub substr symlink syscall sysopen sysread sysseek system syswrite tell telldir tie tied time times tr truncate uc ucfirst umask undef unless unlink unpack unshift untie until use utime values vec wait waitpid wantarray warn when while write x|0 xor y|0"
                      },
                      i = {
                          className: "subst",
                          begin: "[$@]\\{",
                          end: "\\}",
                          keywords: t
                      },
                      n = {
                          begin: /->\{/,
                          end: /\}/
                      },
                      r = {
                          variants: [{
                              begin: /\$\d/
                          }, {
                              begin: s.concat(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
                          }, {
                              begin: /[$%@][^\s\w{]/,
                              relevance: 0
                          }]
                      },
                      o = [e.BACKSLASH_ESCAPE, i, r],
                      l = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/],
                      c = (e, t, i = "\\1") => {
                          var n = "\\1" === i ? i : s.concat(i, t);
                          return s.concat(s.concat("(?:", e, ")"), t, /(?:\\.|[^\\\/])*?/, n, /(?:\\.|[^\\\/])*?/, i, a)
                      },
                      d = (e, t, i) => s.concat(s.concat("(?:", e, ")"), t, /(?:\\.|[^\\\/])*?/, i, a),
                      u = [r, e.HASH_COMMENT_MODE, e.COMMENT(/^=\w/, /=cut/, {
                          endsWithParent: !0
                      }), n, {
                          className: "string",
                          contains: o,
                          variants: [{
                              begin: "q[qwxr]?\\s*\\(",
                              end: "\\)",
                              relevance: 5
                          }, {
                              begin: "q[qwxr]?\\s*\\[",
                              end: "\\]",
                              relevance: 5
                          }, {
                              begin: "q[qwxr]?\\s*\\{",
                              end: "\\}",
                              relevance: 5
                          }, {
                              begin: "q[qwxr]?\\s*\\|",
                              end: "\\|",
                              relevance: 5
                          }, {
                              begin: "q[qwxr]?\\s*<",
                              end: ">",
                              relevance: 5
                          }, {
                              begin: "qw\\s+q",
                              end: "q",
                              relevance: 5
                          }, {
                              begin: "'",
                              end: "'",
                              contains: [e.BACKSLASH_ESCAPE]
                          }, {
                              begin: '"',
                              end: '"'
                          }, {
                              begin: "`",
                              end: "`",
                              contains: [e.BACKSLASH_ESCAPE]
                          }, {
                              begin: /\{\w+\}/,
                              relevance: 0
                          }, {
                              begin: "-?\\w+\\s*=>",
                              relevance: 0
                          }]
                      }, {
                          className: "number",
                          begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                          relevance: 0
                      }, {
                          begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                          keywords: "split return print reverse grep",
                          relevance: 0,
                          contains: [e.HASH_COMMENT_MODE, {
                              className: "regexp",
                              variants: [{
                                  begin: c("s|tr|y", s.either(...l, {
                                      capture: !0
                                  }))
                              }, {
                                  begin: c("s|tr|y", "\\(", "\\)")
                              }, {
                                  begin: c("s|tr|y", "\\[", "\\]")
                              }, {
                                  begin: c("s|tr|y", "\\{", "\\}")
                              }],
                              relevance: 2
                          }, {
                              className: "regexp",
                              variants: [{
                                  begin: /(m|qr)\/\//,
                                  relevance: 0
                              }, {
                                  begin: d("(?:m|qr)?", /\//, /\//)
                              }, {
                                  begin: d("m|qr", s.either(...l, {
                                      capture: !0
                                  }), /\1/)
                              }, {
                                  begin: d("m|qr", /\(/, /\)/)
                              }, {
                                  begin: d("m|qr", /\[/, /\]/)
                              }, {
                                  begin: d("m|qr", /\{/, /\}/)
                              }]
                          }]
                      }, {
                          className: "function",
                          beginKeywords: "sub",
                          end: "(\\s*\\(.*?\\))?[;{]",
                          excludeEnd: !0,
                          relevance: 5,
                          contains: [e.TITLE_MODE]
                      }, {
                          begin: "-\\w\\b",
                          relevance: 0
                      }, {
                          begin: "^__DATA__$",
                          end: "^__END__$",
                          subLanguage: "mojolicious",
                          contains: [{
                              begin: "^@@.*",
                              end: "$",
                              className: "comment"
                          }]
                      }];
                  return i.contains = u, {
                      name: "Perl",
                      aliases: ["pl", "pm"],
                      keywords: t,
                      contains: n.contains = u
                  }
              },
              grmr_php: e => {
                  var t = {
                          className: "variable",
                          begin: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*(?![A-Za-z0-9])(?![$])"
                      },
                      i = {
                          className: "meta",
                          variants: [{
                              begin: /<\?php/,
                              relevance: 10
                          }, {
                              begin: /<\?[=]?/
                          }, {
                              begin: /\?>/
                          }]
                      },
                      n = {
                          className: "subst",
                          variants: [{
                              begin: /\$\w+/
                          }, {
                              begin: /\{\$/,
                              end: /\}/
                          }]
                      },
                      s = e.inherit(e.APOS_STRING_MODE, {
                          illegal: null
                      }),
                      a = e.inherit(e.QUOTE_STRING_MODE, {
                          illegal: null,
                          contains: e.QUOTE_STRING_MODE.contains.concat(n)
                      }),
                      n = e.END_SAME_AS_BEGIN({
                          begin: /<<<[ \t]*(\w+)\n/,
                          end: /[ \t]*(\w+)\b/,
                          contains: e.QUOTE_STRING_MODE.contains.concat(n)
                      }),
                      a = {
                          className: "string",
                          contains: [e.BACKSLASH_ESCAPE, i],
                          variants: [e.inherit(s, {
                              begin: "b'",
                              end: "'"
                          }), e.inherit(a, {
                              begin: 'b"',
                              end: '"'
                          }), a, s, n]
                      },
                      s = {
                          className: "number",
                          variants: [{
                              begin: "\\b0b[01]+(?:_[01]+)*\\b"
                          }, {
                              begin: "\\b0o[0-7]+(?:_[0-7]+)*\\b"
                          }, {
                              begin: "\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b"
                          }, {
                              begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:e[+-]?\\d+)?"
                          }],
                          relevance: 0
                      },
                      n = {
                          keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 mixed new object or private protected public real return string switch throw trait try unset use var void while xor yield",
                          literal: "false null true",
                          built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
                      };
                  return {
                      case_insensitive: !0,
                      keywords: n,
                      contains: [e.HASH_COMMENT_MODE, e.COMMENT("//", "$", {
                          contains: [i]
                      }), e.COMMENT("/\\*", "\\*/", {
                          contains: [{
                              className: "doctag",
                              begin: "@[A-Za-z]+"
                          }]
                      }), e.COMMENT("__halt_compiler.+?;", !1, {
                          endsWithParent: !0,
                          keywords: "__halt_compiler"
                      }), i, {
                          className: "keyword",
                          begin: /\$this\b/
                      }, t, {
                          begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
                      }, {
                          className: "function",
                          relevance: 0,
                          beginKeywords: "fn function",
                          end: /[;{]/,
                          excludeEnd: !0,
                          illegal: "[$%\\[]",
                          contains: [{
                              beginKeywords: "use"
                          }, e.UNDERSCORE_TITLE_MODE, {
                              begin: "=>",
                              endsParent: !0
                          }, {
                              className: "params",
                              begin: "\\(",
                              end: "\\)",
                              excludeBegin: !0,
                              excludeEnd: !0,
                              keywords: n,
                              contains: ["self", t, e.C_BLOCK_COMMENT_MODE, a, s]
                          }]
                      }, {
                          className: "class",
                          variants: [{
                              beginKeywords: "enum",
                              illegal: /[($"]/
                          }, {
                              beginKeywords: "class interface trait",
                              illegal: /[:($"]/
                          }],
                          relevance: 0,
                          end: /\{/,
                          excludeEnd: !0,
                          contains: [{
                              beginKeywords: "extends implements"
                          }, e.UNDERSCORE_TITLE_MODE]
                      }, {
                          beginKeywords: "namespace",
                          relevance: 0,
                          end: ";",
                          illegal: /[.']/,
                          contains: [e.UNDERSCORE_TITLE_MODE]
                      }, {
                          beginKeywords: "use",
                          relevance: 0,
                          end: ";",
                          contains: [e.UNDERSCORE_TITLE_MODE]
                      }, a, s]
                  }
              },
              grmr_php_template: e => ({
                  name: "PHP template",
                  subLanguage: "xml",
                  contains: [{
                      begin: /<\?(php|=)?/,
                      end: /\?>/,
                      subLanguage: "php",
                      contains: [{
                          begin: "/\\*",
                          end: "\\*/",
                          skip: !0
                      }, {
                          begin: 'b"',
                          end: '"',
                          skip: !0
                      }, {
                          begin: "b'",
                          end: "'",
                          skip: !0
                      }, e.inherit(e.APOS_STRING_MODE, {
                          illegal: null,
                          className: null,
                          contains: null,
                          skip: !0
                      }), e.inherit(e.QUOTE_STRING_MODE, {
                          illegal: null,
                          className: null,
                          contains: null,
                          skip: !0
                      })]
                  }]
              }),
              grmr_plaintext: e => ({
                  name: "Plain text",
                  aliases: ["text", "txt"],
                  disableAutodetect: !0
              }),
              grmr_python: e => {
                  var t = e.regex,
                      i = /[\p{XID_Start}_]\p{XID_Continue}*/u,
                      n = {
                          $pattern: /[A-Za-z]\w+|__\w+__/,
                          keyword: ["and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"],
                          built_in: ["__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"],
                          literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
                          type: ["Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"]
                      },
                      s = {
                          className: "meta",
                          begin: /^(>>>|\.\.\.) /
                      },
                      a = {
                          className: "subst",
                          begin: /\{/,
                          end: /\}/,
                          keywords: n,
                          illegal: /#/
                      },
                      r = {
                          begin: /\{\{/,
                          relevance: 0
                      },
                      r = {
                          className: "string",
                          contains: [e.BACKSLASH_ESCAPE],
                          variants: [{
                              begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
                              end: /'''/,
                              contains: [e.BACKSLASH_ESCAPE, s],
                              relevance: 10
                          }, {
                              begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
                              end: /"""/,
                              contains: [e.BACKSLASH_ESCAPE, s],
                              relevance: 10
                          }, {
                              begin: /([fF][rR]|[rR][fF]|[fF])'''/,
                              end: /'''/,
                              contains: [e.BACKSLASH_ESCAPE, s, r, a]
                          }, {
                              begin: /([fF][rR]|[rR][fF]|[fF])"""/,
                              end: /"""/,
                              contains: [e.BACKSLASH_ESCAPE, s, r, a]
                          }, {
                              begin: /([uU]|[rR])'/,
                              end: /'/,
                              relevance: 10
                          }, {
                              begin: /([uU]|[rR])"/,
                              end: /"/,
                              relevance: 10
                          }, {
                              begin: /([bB]|[bB][rR]|[rR][bB])'/,
                              end: /'/
                          }, {
                              begin: /([bB]|[bB][rR]|[rR][bB])"/,
                              end: /"/
                          }, {
                              begin: /([fF][rR]|[rR][fF]|[fF])'/,
                              end: /'/,
                              contains: [e.BACKSLASH_ESCAPE, r, a]
                          }, {
                              begin: /([fF][rR]|[rR][fF]|[fF])"/,
                              end: /"/,
                              contains: [e.BACKSLASH_ESCAPE, r, a]
                          }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
                      },
                      o = "[0-9](_?[0-9])*",
                      l = `(\\b(${o}))?\\.(${o})|\\b(${o})\\.`,
                      l = {
                          className: "number",
                          relevance: 0,
                          variants: [{
                              begin: `(\\b(${o})|(${l}))[eE][+-]?(${o})[jJ]?\\b`
                          }, {
                              begin: `(${l})[jJ]?`
                          }, {
                              begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
                          }, {
                              begin: "\\b0[bB](_?[01])+[lL]?\\b"
                          }, {
                              begin: "\\b0[oO](_?[0-7])+[lL]?\\b"
                          }, {
                              begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
                          }, {
                              begin: `\\b(${o})[jJ]\\b`
                          }]
                      },
                      o = {
                          className: "comment",
                          begin: t.lookahead(/# type:/),
                          end: /$/,
                          keywords: n,
                          contains: [{
                              begin: /# type:/
                          }, {
                              begin: /#/,
                              end: /\b\B/,
                              endsWithParent: !0
                          }]
                      },
                      t = {
                          className: "params",
                          variants: [{
                              className: "",
                              begin: /\(\s*\)/,
                              skip: !0
                          }, {
                              begin: /\(/,
                              end: /\)/,
                              excludeBegin: !0,
                              excludeEnd: !0,
                              keywords: n,
                              contains: ["self", s, l, r, e.HASH_COMMENT_MODE]
                          }]
                      };
                  return a.contains = [r, l, s], {
                      name: "Python",
                      aliases: ["py", "gyp", "ipython"],
                      unicodeRegex: !0,
                      keywords: n,
                      illegal: /(<\/|->|\?)|=>/,
                      contains: [s, l, {
                          begin: /\bself\b/
                      }, {
                          beginKeywords: "if",
                          relevance: 0
                      }, r, o, e.HASH_COMMENT_MODE, {
                          match: [/def/, /\s+/, i],
                          scope: {
                              1: "keyword",
                              3: "title.function"
                          },
                          contains: [t]
                      }, {
                          variants: [{
                              match: [/class/, /\s+/, i, /\s*/, /\(\s*/, i, /\s*\)/]
                          }, {
                              match: [/class/, /\s+/, i]
                          }],
                          scope: {
                              1: "keyword",
                              3: "title.class",
                              6: "title.class.inherited"
                          }
                      }, {
                          className: "meta",
                          begin: /^[\t ]*@/,
                          end: /(?=#)|$/,
                          contains: [l, t, r]
                      }]
                  }
              },
              grmr_python_repl: e => ({
                  aliases: ["pycon"],
                  contains: [{
                      className: "meta",
                      starts: {
                          end: / |$/,
                          starts: {
                              end: "$",
                              subLanguage: "python"
                          }
                      },
                      variants: [{
                          begin: /^>>>(?=[ ]|$)/
                      }, {
                          begin: /^\.\.\.(?=[ ]|$)/
                      }]
                  }]
              }),
              grmr_r: e => {
                  var t = e.regex,
                      i = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/,
                      n = t.either(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/, /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/, /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/),
                      s = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/,
                      a = t.either(/[()]/, /[{}]/, /\[\[/, /[[\]]/, /\\/, /,/);
                  return {
                      name: "R",
                      keywords: {
                          $pattern: i,
                          keyword: "function if in break next repeat else for while",
                          literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
                          built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
                      },
                      contains: [e.COMMENT(/#'/, /$/, {
                          contains: [{
                              scope: "doctag",
                              match: /@examples/,
                              starts: {
                                  end: t.lookahead(t.either(/\n^#'\s*(?=@[a-zA-Z]+)/, /\n^(?!#')/)),
                                  endsParent: !0
                              }
                          }, {
                              scope: "doctag",
                              begin: "@param",
                              end: /$/,
                              contains: [{
                                  scope: "variable",
                                  variants: [{
                                      match: i
                                  }, {
                                      match: /`(?:\\.|[^`\\])+`/
                                  }],
                                  endsParent: !0
                              }]
                          }, {
                              scope: "doctag",
                              match: /@[a-zA-Z]+/
                          }, {
                              scope: "keyword",
                              match: /\\[a-zA-Z]+/
                          }]
                      }), e.HASH_COMMENT_MODE, {
                          scope: "string",
                          contains: [e.BACKSLASH_ESCAPE],
                          variants: [e.END_SAME_AS_BEGIN({
                              begin: /[rR]"(-*)\(/,
                              end: /\)(-*)"/
                          }), e.END_SAME_AS_BEGIN({
                              begin: /[rR]"(-*)\{/,
                              end: /\}(-*)"/
                          }), e.END_SAME_AS_BEGIN({
                              begin: /[rR]"(-*)\[/,
                              end: /\](-*)"/
                          }), e.END_SAME_AS_BEGIN({
                              begin: /[rR]'(-*)\(/,
                              end: /\)(-*)'/
                          }), e.END_SAME_AS_BEGIN({
                              begin: /[rR]'(-*)\{/,
                              end: /\}(-*)'/
                          }), e.END_SAME_AS_BEGIN({
                              begin: /[rR]'(-*)\[/,
                              end: /\](-*)'/
                          }), {
                              begin: '"',
                              end: '"',
                              relevance: 0
                          }, {
                              begin: "'",
                              end: "'",
                              relevance: 0
                          }]
                      }, {
                          relevance: 0,
                          variants: [{
                              scope: {
                                  1: "operator",
                                  2: "number"
                              },
                              match: [s, n]
                          }, {
                              scope: {
                                  1: "operator",
                                  2: "number"
                              },
                              match: [/%[^%]*%/, n]
                          }, {
                              scope: {
                                  1: "punctuation",
                                  2: "number"
                              },
                              match: [a, n]
                          }, {
                              scope: {
                                  2: "number"
                              },
                              match: [/[^a-zA-Z0-9._]|^/, n]
                          }]
                      }, {
                          scope: {
                              3: "operator"
                          },
                          match: [i, /\s+/, /<-/, /\s+/]
                      }, {
                          scope: "operator",
                          relevance: 0,
                          variants: [{
                              match: s
                          }, {
                              match: /%[^%]*%/
                          }]
                      }, {
                          scope: "punctuation",
                          relevance: 0,
                          match: a
                      }, {
                          begin: "`",
                          end: "`",
                          contains: [{
                              begin: /\\./
                          }]
                      }]
                  }
              },
              grmr_ruby: e => {
                  var t = e.regex,
                      i = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)",
                      n = {
                          keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
                          built_in: "proc lambda",
                          literal: "true false nil"
                      },
                      s = {
                          className: "doctag",
                          begin: "@[A-Za-z]+"
                      },
                      a = {
                          begin: "#<",
                          end: ">"
                      },
                      s = [e.COMMENT("#", "$", {
                          contains: [s]
                      }), e.COMMENT("^=begin", "^=end", {
                          contains: [s],
                          relevance: 10
                      }), e.COMMENT("^__END__", "\\n$")],
                      r = {
                          className: "subst",
                          begin: /#\{/,
                          end: /\}/,
                          keywords: n
                      },
                      o = {
                          className: "string",
                          contains: [e.BACKSLASH_ESCAPE, r],
                          variants: [{
                              begin: /'/,
                              end: /'/
                          }, {
                              begin: /"/,
                              end: /"/
                          }, {
                              begin: /`/,
                              end: /`/
                          }, {
                              begin: /%[qQwWx]?\(/,
                              end: /\)/
                          }, {
                              begin: /%[qQwWx]?\[/,
                              end: /\]/
                          }, {
                              begin: /%[qQwWx]?\{/,
                              end: /\}/
                          }, {
                              begin: /%[qQwWx]?</,
                              end: />/
                          }, {
                              begin: /%[qQwWx]?\//,
                              end: /\//
                          }, {
                              begin: /%[qQwWx]?%/,
                              end: /%/
                          }, {
                              begin: /%[qQwWx]?-/,
                              end: /-/
                          }, {
                              begin: /%[qQwWx]?\|/,
                              end: /\|/
                          }, {
                              begin: /\B\?(\\\d{1,3})/
                          }, {
                              begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
                          }, {
                              begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
                          }, {
                              begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
                          }, {
                              begin: /\B\?\\(c|C-)[\x20-\x7e]/
                          }, {
                              begin: /\B\?\\?\S/
                          }, {
                              begin: t.concat(/<<[-~]?'?/, t.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),
                              contains: [e.END_SAME_AS_BEGIN({
                                  begin: /(\w+)/,
                                  end: /(\w+)/,
                                  contains: [e.BACKSLASH_ESCAPE, r]
                              })]
                          }]
                      },
                      l = "[0-9](_?[0-9])*",
                      l = {
                          className: "number",
                          relevance: 0,
                          variants: [{
                              begin: `\\b([1-9](_?[0-9])*|0)(\\.(${l}))?([eE][+-]?(${l})|r)?i?\\b`
                          }, {
                              begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
                          }, {
                              begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
                          }, {
                              begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
                          }, {
                              begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
                          }, {
                              begin: "\\b0(_?[0-7])+r?i?\\b"
                          }]
                      },
                      c = {
                          className: "params",
                          begin: "\\(",
                          end: "\\)",
                          endsParent: !0,
                          keywords: n
                      },
                      t = [o, {
                          className: "class",
                          beginKeywords: "class module",
                          end: "$|;",
                          illegal: /=/,
                          contains: [e.inherit(e.TITLE_MODE, {
                              begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
                          }), {
                              begin: "<\\s*",
                              contains: [{
                                  begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE,
                                  relevance: 0
                              }]
                          }].concat(s)
                      }, {
                          className: "function",
                          begin: t.concat(/def\s+/, t.lookahead(i + "\\s*(\\(|;|$)")),
                          relevance: 0,
                          keywords: "def",
                          end: "$|;",
                          contains: [e.inherit(e.TITLE_MODE, {
                              begin: i
                          }), c].concat(s)
                      }, {
                          begin: e.IDENT_RE + "::"
                      }, {
                          className: "symbol",
                          begin: e.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
                          relevance: 0
                      }, {
                          className: "symbol",
                          begin: ":(?!\\s)",
                          contains: [o, {
                              begin: i
                          }],
                          relevance: 0
                      }, l, {
                          className: "variable",
                          begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
                      }, {
                          className: "params",
                          begin: /\|/,
                          end: /\|/,
                          relevance: 0,
                          keywords: n
                      }, {
                          begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
                          keywords: "unless",
                          contains: [{
                              className: "regexp",
                              contains: [e.BACKSLASH_ESCAPE, r],
                              illegal: /\n/,
                              variants: [{
                                  begin: "/",
                                  end: "/[a-z]*"
                              }, {
                                  begin: /%r\{/,
                                  end: /\}[a-z]*/
                              }, {
                                  begin: "%r\\(",
                                  end: "\\)[a-z]*"
                              }, {
                                  begin: "%r!",
                                  end: "![a-z]*"
                              }, {
                                  begin: "%r\\[",
                                  end: "\\][a-z]*"
                              }]
                          }].concat(a, s),
                          relevance: 0
                      }].concat(a, s),
                      o = (r.contains = t, [{
                          begin: /^\s*=>/,
                          starts: {
                              end: "$",
                              contains: c.contains = t
                          }
                      }, {
                          className: "meta",
                          begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
                          starts: {
                              end: "$",
                              contains: t
                          }
                      }]);
                  return s.unshift(a), {
                      name: "Ruby",
                      aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
                      keywords: n,
                      illegal: /\/\*/,
                      contains: [e.SHEBANG({
                          binary: "ruby"
                      })].concat(o).concat(s).concat(t)
                  }
              },
              grmr_rust: e => {
                  var t = e.regex,
                      t = {
                          className: "title.function.invoke",
                          relevance: 0,
                          begin: t.concat(/\b/, /(?!let\b)/, e.IDENT_RE, t.lookahead(/\s*\(/))
                      },
                      i = "([ui](8|16|32|64|128|size)|f(32|64))?",
                      n = ["drop ", "Copy", "Send", "Sized", "Sync", "Drop", "Fn", "FnMut", "FnOnce", "ToOwned", "Clone", "Debug", "PartialEq", "PartialOrd", "Eq", "Ord", "AsRef", "AsMut", "Into", "From", "Default", "Iterator", "Extend", "IntoIterator", "DoubleEndedIterator", "ExactSizeIterator", "SliceConcatExt", "ToString", "assert!", "assert_eq!", "bitflags!", "bytes!", "cfg!", "col!", "concat!", "concat_idents!", "debug_assert!", "debug_assert_eq!", "env!", "panic!", "file!", "format!", "format_args!", "include_bin!", "include_str!", "line!", "local_data_key!", "module_path!", "option_env!", "print!", "println!", "select!", "stringify!", "try!", "unimplemented!", "unreachable!", "vec!", "write!", "writeln!", "macro_rules!", "assert_ne!", "debug_assert_ne!"];
                  return {
                      name: "Rust",
                      aliases: ["rs"],
                      keywords: {
                          $pattern: e.IDENT_RE + "!?",
                          type: ["i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64", "u128", "usize", "f32", "f64", "str", "char", "bool", "Box", "Option", "Result", "String", "Vec"],
                          keyword: ["abstract", "as", "async", "await", "become", "box", "break", "const", "continue", "crate", "do", "dyn", "else", "enum", "extern", "false", "final", "fn", "for", "if", "impl", "in", "let", "loop", "macro", "match", "mod", "move", "mut", "override", "priv", "pub", "ref", "return", "self", "Self", "static", "struct", "super", "trait", "true", "try", "type", "typeof", "unsafe", "unsized", "use", "virtual", "where", "while", "yield"],
                          literal: ["true", "false", "Some", "None", "Ok", "Err"],
                          built_in: n
                      },
                      illegal: "</",
                      contains: [e.C_LINE_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", {
                          contains: ["self"]
                      }), e.inherit(e.QUOTE_STRING_MODE, {
                          begin: /b?"/,
                          illegal: null
                      }), {
                          className: "string",
                          variants: [{
                              begin: /b?r(#*)"(.|\n)*?"\1(?!#)/
                          }, {
                              begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
                          }]
                      }, {
                          className: "symbol",
                          begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
                      }, {
                          className: "number",
                          variants: [{
                              begin: "\\b0b([01_]+)" + i
                          }, {
                              begin: "\\b0o([0-7_]+)" + i
                          }, {
                              begin: "\\b0x([A-Fa-f0-9_]+)" + i
                          }, {
                              begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + i
                          }],
                          relevance: 0
                      }, {
                          begin: [/fn/, /\s+/, e.UNDERSCORE_IDENT_RE],
                          className: {
                              1: "keyword",
                              3: "title.function"
                          }
                      }, {
                          className: "meta",
                          begin: "#!?\\[",
                          end: "\\]",
                          contains: [{
                              className: "string",
                              begin: /"/,
                              end: /"/
                          }]
                      }, {
                          begin: [/let/, /\s+/, /(?:mut\s+)?/, e.UNDERSCORE_IDENT_RE],
                          className: {
                              1: "keyword",
                              3: "keyword",
                              4: "variable"
                          }
                      }, {
                          begin: [/for/, /\s+/, e.UNDERSCORE_IDENT_RE, /\s+/, /in/],
                          className: {
                              1: "keyword",
                              3: "variable",
                              5: "keyword"
                          }
                      }, {
                          begin: [/type/, /\s+/, e.UNDERSCORE_IDENT_RE],
                          className: {
                              1: "keyword",
                              3: "title.class"
                          }
                      }, {
                          begin: [/(?:trait|enum|struct|union|impl|for)/, /\s+/, e.UNDERSCORE_IDENT_RE],
                          className: {
                              1: "keyword",
                              3: "title.class"
                          }
                      }, {
                          begin: e.IDENT_RE + "::",
                          keywords: {
                              keyword: "Self",
                              built_in: n
                          }
                      }, {
                          className: "punctuation",
                          begin: "->"
                      }, t]
                  }
              },
              grmr_scss: e => {
                  var t = f(e),
                      i = w,
                      n = y,
                      s = {
                          className: "variable",
                          begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
                      };
                  return {
                      name: "SCSS",
                      case_insensitive: !0,
                      illegal: "[=/|']",
                      contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, t.CSS_NUMBER_MODE, {
                          className: "selector-id",
                          begin: "#[A-Za-z0-9_-]+",
                          relevance: 0
                      }, {
                          className: "selector-class",
                          begin: "\\.[A-Za-z0-9_-]+",
                          relevance: 0
                      }, t.ATTRIBUTE_SELECTOR_MODE, {
                          className: "selector-tag",
                          begin: "\\b(" + b.join("|") + ")\\b",
                          relevance: 0
                      }, {
                          className: "selector-pseudo",
                          begin: ":(" + n.join("|") + ")"
                      }, {
                          className: "selector-pseudo",
                          begin: ":(:)?(" + i.join("|") + ")"
                      }, s, {
                          begin: /\(/,
                          end: /\)/,
                          contains: [t.CSS_NUMBER_MODE]
                      }, t.CSS_VARIABLE, {
                          className: "attribute",
                          begin: "\\b(" + _.join("|") + ")\\b"
                      }, {
                          begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
                      }, {
                          begin: /:/,
                          end: /[;}{]/,
                          contains: [t.BLOCK_COMMENT, s, t.HEXCOLOR, t.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, t.IMPORTANT]
                      }, {
                          begin: "@(page|font-face)",
                          keywords: {
                              $pattern: "@[a-z-]+",
                              keyword: "@page @font-face"
                          }
                      }, {
                          begin: "@",
                          end: "[{;]",
                          returnBegin: !0,
                          keywords: {
                              $pattern: /[a-z-]+/,
                              keyword: "and or not only",
                              attribute: v.join(" ")
                          },
                          contains: [{
                              begin: "@[a-z-]+",
                              className: "keyword"
                          }, {
                              begin: /[a-z-]+(?=:)/,
                              className: "attribute"
                          }, s, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, t.HEXCOLOR, t.CSS_NUMBER_MODE]
                      }, t.FUNCTION_DISPATCH]
                  }
              },
              grmr_shell: e => ({
                  name: "Shell Session",
                  aliases: ["console", "shellsession"],
                  contains: [{
                      className: "meta",
                      begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
                      starts: {
                          end: /[^\\](?=\s*$)/,
                          subLanguage: "bash"
                      }
                  }]
              }),
              grmr_sql: e => {
                  const t = e.regex,
                      i = e.COMMENT("--", "$"),
                      n = ["true", "false", "unknown"],
                      s = ["bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary"],
                      a = ["abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"],
                      r = ["create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"],
                      o = a,
                      l = ["abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year", "add", "asc", "collation", "desc", "final", "first", "last", "view"].filter(e => !a.includes(e)),
                      c = {
                          begin: t.concat(/\b/, t.either(...o), /\s*\(/),
                          relevance: 0,
                          keywords: {
                              built_in: o
                          }
                      };
                  return {
                      name: "SQL",
                      case_insensitive: !0,
                      illegal: /[{}]|<\//,
                      keywords: {
                          $pattern: /\b[\w\.]+/,
                          keyword: (({
                              exceptions: t,
                              when: e
                          }) => {
                              const i = e;
                              return t = t || [], l.map(e => !e.match(/\|\d+$/) && !t.includes(e) && i(e) ? e + "|0" : e)
                          })({
                              when: e => e.length < 3
                          }),
                          literal: n,
                          type: s,
                          built_in: ["current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"]
                      },
                      contains: [{
                          begin: t.either(...r),
                          relevance: 0,
                          keywords: {
                              $pattern: /[\w\.]+/,
                              keyword: l.concat(r),
                              literal: n,
                              type: s
                          }
                      }, {
                          className: "type",
                          begin: t.either("double precision", "large object", "with timezone", "without timezone")
                      }, c, {
                          className: "variable",
                          begin: /@[a-z0-9]+/
                      }, {
                          className: "string",
                          variants: [{
                              begin: /'/,
                              end: /'/,
                              contains: [{
                                  begin: /''/
                              }]
                          }]
                      }, {
                          begin: /"/,
                          end: /"/,
                          contains: [{
                              begin: /""/
                          }]
                      }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, i, {
                          className: "operator",
                          begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
                          relevance: 0
                      }]
                  }
              },
              grmr_swift: e => {
                  const t = {
                          match: /\s+/,
                          relevance: 0
                      },
                      i = e.COMMENT("/\\*", "\\*/", {
                          contains: ["self"]
                      }),
                      n = [e.C_LINE_COMMENT_MODE, i],
                      s = {
                          match: [/\./, L(...ge, ...fe)],
                          className: {
                              2: "keyword"
                          }
                      },
                      a = {
                          match: I(/\./, L(...j)),
                          relevance: 0
                      },
                      r = j.filter(e => "string" == typeof e).concat(["_|0"]),
                      o = {
                          variants: [{
                              className: "keyword",
                              match: L(...j.filter(e => "string" != typeof e).concat(be).map(N), ...fe)
                          }]
                      },
                      l = {
                          $pattern: L(/\b\w+/, /#\w+/),
                          keyword: r.concat(we),
                          literal: ve
                      },
                      c = [s, a, o],
                      d = [{
                          match: I(/\./, L(..._e)),
                          relevance: 0
                      }, {
                          className: "built_in",
                          match: I(/\b/, L(..._e), /(?=\()/)
                      }],
                      u = {
                          match: /->/,
                          relevance: 0
                      },
                      h = [u, {
                          className: "operator",
                          relevance: 0,
                          variants: [{
                              match: R
                          }, {
                              match: `\\.(\\.|${xe})+`
                          }]
                      }],
                      p = "([0-9a-fA-F]_*)+",
                      m = {
                          className: "number",
                          relevance: 0,
                          variants: [{
                              match: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
                          }, {
                              match: `\\b0x(${p})(\\.(${p}))?([pP][+-]?(([0-9]_*)+))?\\b`
                          }, {
                              match: /\b0o([0-7]_*)+\b/
                          }, {
                              match: /\b0b([01]_*)+\b/
                          }]
                      },
                      g = (e = "") => ({
                          className: "subst",
                          variants: [{
                              match: I(/\\/, e, /[0\\tnr"']/)
                          }, {
                              match: I(/\\/, e, /u\{[0-9a-fA-F]{1,8}\}/)
                          }]
                      }),
                      f = (e = "") => ({
                          className: "subst",
                          label: "interpol",
                          begin: I(/\\/, e, /\(/),
                          end: /\)/
                      }),
                      b = (e = "") => {
                          return {
                              begin: I(e, /"""/),
                              end: I(/"""/, e),
                              contains: [g(e), ([t = ""] = [e], {
                                  className: "subst",
                                  match: I(/\\/, t, /[\t ]*(?:[\r\n]|\r\n)/)
                              }), f(e)]
                          };
                          var t
                      },
                      v = (e = "") => ({
                          begin: I(e, /"/),
                          end: I(/"/, e),
                          contains: [g(e), f(e)]
                      }),
                      y = {
                          className: "string",
                          variants: [b(), b("#"), b("##"), b("###"), v(), v("#"), v("##"), v("###")]
                      },
                      w = {
                          match: I(/`/, B, /`/)
                      },
                      _ = [w, {
                          className: "variable",
                          match: /\$\d+/
                      }, {
                          className: "variable",
                          match: `\\$${z}+`
                      }],
                      E = [{
                          match: /(@|#)available/,
                          className: "keyword",
                          starts: {
                              contains: [{
                                  begin: /\(/,
                                  end: /\)/,
                                  keywords: Se,
                                  contains: [...h, m, y]
                              }]
                          }
                      }, {
                          className: "keyword",
                          match: I(/@/, L(...Te))
                      }, {
                          className: "meta",
                          match: I(/@/, B)
                      }],
                      x = {
                          match: D(/\b[A-Z]/),
                          relevance: 0,
                          contains: [{
                              className: "type",
                              match: I(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, z, "+")
                          }, {
                              className: "type",
                              match: F,
                              relevance: 0
                          }, {
                              match: /[?!]+/,
                              relevance: 0
                          }, {
                              match: /\.\.\./,
                              relevance: 0
                          }, {
                              match: I(/\s+&\s+/, D(F)),
                              relevance: 0
                          }]
                      },
                      C = {
                          begin: /</,
                          end: />/,
                          keywords: l,
                          contains: [...n, ...c, ...E, u, x]
                      };
                  x.contains.push(C);
                  var T = {
                          begin: /\(/,
                          end: /\)/,
                          relevance: 0,
                          keywords: l,
                          contains: ["self", {
                              match: I(B, /\s*:/),
                              keywords: "_|0",
                              relevance: 0
                          }, ...n, ...c, ...d, ...h, m, y, ..._, ...E, x]
                      },
                      S = {
                          begin: /</,
                          end: />/,
                          contains: [...n, x]
                      },
                      k = {
                          begin: /\(/,
                          end: /\)/,
                          keywords: l,
                          contains: [{
                              begin: L(D(I(B, /\s*:/)), D(I(B, /\s+/, B, /\s*:/))),
                              end: /:/,
                              relevance: 0,
                              contains: [{
                                  className: "keyword",
                                  match: /\b_\b/
                              }, {
                                  className: "params",
                                  match: B
                              }]
                          }, ...n, ...c, ...h, m, y, ...E, x, T],
                          endsParent: !0,
                          illegal: /["']/
                      },
                      M = {
                          match: [/func/, /\s+/, L(w.match, B, R)],
                          className: {
                              1: "keyword",
                              3: "title.function"
                          },
                          contains: [S, k, t],
                          illegal: [/\[/, /%/]
                      },
                      S = {
                          match: [/\b(?:subscript|init[?!]?)/, /\s*(?=[<(])/],
                          className: {
                              1: "keyword"
                          },
                          contains: [S, k, t],
                          illegal: /\[|%/
                      },
                      k = {
                          match: [/operator/, /\s+/, R],
                          className: {
                              1: "keyword",
                              3: "title"
                          }
                      },
                      A = {
                          begin: [/precedencegroup/, /\s+/, F],
                          className: {
                              1: "keyword",
                              3: "title"
                          },
                          contains: [x],
                          keywords: [...ye, ...ve],
                          end: /}/
                      };
                  for (const e of y.variants) {
                      const t = e.contains.find(e => "interpol" === e.label),
                          i = (t.keywords = l, [...c, ...d, ...h, m, y, ..._]);
                      t.contains = [...i, {
                          begin: /\(/,
                          end: /\)/,
                          contains: ["self", ...i]
                      }]
                  }
                  return {
                      name: "Swift",
                      keywords: l,
                      contains: [...n, M, S, {
                          beginKeywords: "struct protocol class extension enum actor",
                          end: "\\{",
                          excludeEnd: !0,
                          keywords: l,
                          contains: [e.inherit(e.TITLE_MODE, {
                              className: "title.class",
                              begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
                          }), ...c]
                      }, k, A, {
                          beginKeywords: "import",
                          end: /$/,
                          contains: [...n],
                          relevance: 0
                      }, ...c, ...d, ...h, m, y, ..._, ...E, x, T]
                  }
              },
              grmr_typescript: e => {
                  var t = me(e),
                      i = ["any", "void", "number", "boolean", "string", "object", "never", "enum"],
                      n = {
                          beginKeywords: "namespace",
                          end: /\{/,
                          excludeEnd: !0,
                          contains: [t.exports.CLASS_REFERENCE]
                      },
                      s = {
                          beginKeywords: "interface",
                          end: /\{/,
                          excludeEnd: !0,
                          keywords: {
                              keyword: "interface extends",
                              built_in: i
                          },
                          contains: [t.exports.CLASS_REFERENCE]
                      },
                      i = {
                          $pattern: S,
                          keyword: oe.concat(["type", "namespace", "typedef", "interface", "public", "private", "protected", "implements", "declare", "abstract", "readonly"]),
                          literal: le,
                          built_in: pe.concat(i),
                          "variable.language": he
                      },
                      a = {
                          className: "meta",
                          begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
                      },
                      r = (e, t, i) => {
                          var n = e.contains.findIndex(e => e.label === t);
                          if (-1 === n) throw Error("can not find mode to replace");
                          e.contains.splice(n, 1, i)
                      };
                  return Object.assign(t.keywords, i), t.exports.PARAMS_CONTAINS.push(a), t.contains = t.contains.concat([a, n, s]), r(t, "shebang", e.SHEBANG()), r(t, "use_strict", {
                      className: "meta",
                      relevance: 10,
                      begin: /^\s*['"]use strict['"]/
                  }), t.contains.find(e => "func.def" === e.label).relevance = 0, Object.assign(t, {
                      name: "TypeScript",
                      aliases: ["ts", "tsx"]
                  }), t
              },
              grmr_vbnet: e => {
                  var t = e.regex,
                      i = /\d{1,2}\/\d{1,2}\/\d{4}/,
                      n = /\d{4}-\d{1,2}-\d{1,2}/,
                      s = /(\d|1[012])(:\d+){0,2} *(AM|PM)/,
                      a = /\d{1,2}(:\d{1,2}){1,2}/,
                      n = {
                          className: "literal",
                          variants: [{
                              begin: t.concat(/# */, t.either(n, i), / *#/)
                          }, {
                              begin: t.concat(/# */, a, / *#/)
                          }, {
                              begin: t.concat(/# */, s, / *#/)
                          }, {
                              begin: t.concat(/# */, t.either(n, i), / +/, t.either(s, a), / *#/)
                          }]
                      },
                      i = e.COMMENT(/'''/, /$/, {
                          contains: [{
                              className: "doctag",
                              begin: /<\/?/,
                              end: />/
                          }]
                      }),
                      t = e.COMMENT(null, /$/, {
                          variants: [{
                              begin: /'/
                          }, {
                              begin: /([\t ]|^)REM(?=\s)/
                          }]
                      });
                  return {
                      name: "Visual Basic .NET",
                      aliases: ["vb"],
                      case_insensitive: !0,
                      classNameAliases: {
                          label: "symbol"
                      },
                      keywords: {
                          keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
                          built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
                          type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
                          literal: "true false nothing"
                      },
                      illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
                      contains: [{
                          className: "string",
                          begin: /"(""|[^/n])"C\b/
                      }, {
                          className: "string",
                          begin: /"/,
                          end: /"/,
                          illegal: /\n/,
                          contains: [{
                              begin: /""/
                          }]
                      }, n, {
                          className: "number",
                          relevance: 0,
                          variants: [{
                              begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
                          }, {
                              begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
                          }, {
                              begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
                          }, {
                              begin: /&O[0-7_]+((U?[SIL])|[%&])?/
                          }, {
                              begin: /&B[01_]+((U?[SIL])|[%&])?/
                          }]
                      }, {
                          className: "label",
                          begin: /^\w+:/
                      }, i, t, {
                          className: "meta",
                          begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
                          end: /$/,
                          keywords: {
                              keyword: "const disable else elseif enable end externalsource if region then"
                          },
                          contains: [t]
                      }]
                  }
              },
              grmr_yaml: e => {
                  var t = "true false yes no null",
                      i = "[\\w#;/?:@&=+$,.~*'()[\\]]+",
                      n = {
                          className: "string",
                          relevance: 0,
                          variants: [{
                              begin: /'/,
                              end: /'/
                          }, {
                              begin: /"/,
                              end: /"/
                          }, {
                              begin: /\S+/
                          }],
                          contains: [e.BACKSLASH_ESCAPE, {
                              className: "template-variable",
                              variants: [{
                                  begin: /\{\{/,
                                  end: /\}\}/
                              }, {
                                  begin: /%\{/,
                                  end: /\}/
                              }]
                          }]
                      },
                      s = e.inherit(n, {
                          variants: [{
                              begin: /'/,
                              end: /'/
                          }, {
                              begin: /"/,
                              end: /"/
                          }, {
                              begin: /[^\s,{}[\]]+/
                          }]
                      }),
                      a = {
                          end: ",",
                          endsWithParent: !0,
                          excludeEnd: !0,
                          keywords: t,
                          relevance: 0
                      },
                      i = [{
                          className: "attr",
                          variants: [{
                              begin: "\\w[\\w :\\/.-]*:(?=[ \t]|$)"
                          }, {
                              begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)'
                          }, {
                              begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)"
                          }]
                      }, {
                          className: "meta",
                          begin: "^---\\s*$",
                          relevance: 10
                      }, {
                          className: "string",
                          begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
                      }, {
                          begin: "<%[%=-]?",
                          end: "[%-]?%>",
                          subLanguage: "ruby",
                          excludeBegin: !0,
                          excludeEnd: !0,
                          relevance: 0
                      }, {
                          className: "type",
                          begin: "!\\w+!" + i
                      }, {
                          className: "type",
                          begin: "!<" + i + ">"
                      }, {
                          className: "type",
                          begin: "!" + i
                      }, {
                          className: "type",
                          begin: "!!" + i
                      }, {
                          className: "meta",
                          begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
                      }, {
                          className: "meta",
                          begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
                      }, {
                          className: "bullet",
                          begin: "-(?=[ ]|$)",
                          relevance: 0
                      }, e.HASH_COMMENT_MODE, {
                          beginKeywords: t,
                          keywords: {
                              literal: t
                          }
                      }, {
                          className: "number",
                          begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
                      }, {
                          className: "number",
                          begin: e.C_NUMBER_RE + "\\b",
                          relevance: 0
                      }, {
                          begin: /\{/,
                          end: /\}/,
                          contains: [a],
                          illegal: "\\n",
                          relevance: 0
                      }, {
                          begin: "\\[",
                          end: "\\]",
                          contains: [a],
                          illegal: "\\n",
                          relevance: 0
                      }, n],
                      t = [...i];
                  return t.pop(), t.push(s), a.contains = t, {
                      name: "YAML",
                      case_insensitive: !0,
                      aliases: ["yml"],
                      contains: i
                  }
              }
          }),
          Me = r;
      for (const e of Object.keys(ke)) {
          const i = e.replace("grmr_", "").replace("_", "-");
          Me.registerLanguage(i, ke[e])
      }
      return Me
  }(),
  $jscomp = ("object" == typeof exports && "undefined" != typeof module && (module.exports = hljs), "object" == typeof navigator && function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Plyr = t()
  }(this, function() {
      "use strict";

      function r(e, t, i) {
          t in e ? Object.defineProperty(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0
          }) : e[t] = i
      }

      function e(e, t) {
          for (var i = 0; i < t.length; i++) {
              var n = t[i];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
          }
      }

      function t(t, e) {
          var i, n = Object.keys(t);
          return Object.getOwnPropertySymbols && (i = Object.getOwnPropertySymbols(t), e && (i = i.filter(function(e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable
          })), n.push.apply(n, i)), n
      }

      function R(n) {
          for (var e = 1; e < arguments.length; e++) {
              var s = null != arguments[e] ? arguments[e] : {};
              e % 2 ? t(Object(s), !0).forEach(function(e) {
                  var t, i;
                  t = n, i = s[e = e], e in t ? Object.defineProperty(t, e, {
                      value: i,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0
                  }) : t[e] = i
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(s)) : t(Object(s)).forEach(function(e) {
                  Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(s, e))
              })
          }
          return n
      }
      var z = {
          addCSS: !0,
          thumbWidth: 15,
          watch: !0
      };

      function B(e) {
          return null != e ? e.constructor : null
      }

      function F(e) {
          return Y(e, Element)
      }

      function H(e) {
          return Y(e, Event)
      }

      function q(e) {
          return W(e) || (V(e) || X(e) || G(e)) && !e.length || U(e) && !Object.keys(e).length
      }
      var Y = function(e, t) {
              return !!(e && t && e instanceof t)
          },
          W = function(e) {
              return null == e
          },
          U = function(e) {
              return B(e) === Object
          },
          V = function(e) {
              return B(e) === String
          },
          X = function(e) {
              return Array.isArray(e)
          },
          G = function(e) {
              return Y(e, NodeList)
          },
          K = V,
          Z = X,
          Q = G;
      Je = [{
          key: "setup",
          value: function(i) {
              var n, t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                  e = null;
              return q(i) || K(i) ? e = Array.from(document.querySelectorAll(K(i) ? i : 'input[type="range"]')) : F(i) ? e = [i] : Q(i) ? e = Array.from(i) : Z(i) && (e = i.filter(F)), q(e) ? null : (n = R({}, z, {}, t), K(i) && n.watch && new MutationObserver(function(e) {
                  Array.from(e).forEach(function(e) {
                      Array.from(e.addedNodes).forEach(function(e) {
                          var t;
                          F(e) && (t = i, function() {
                              return Array.from(document.querySelectorAll(t)).includes(this)
                          }.call(e, t)) && new o(e, n)
                      })
                  })
              }).observe(document.body, {
                  childList: !0,
                  subtree: !0
              }), e.map(function(e) {
                  return new o(e, t)
              }))
          }
      }, {
          key: "enabled",
          get: function() {
              return "ontouchstart" in document.documentElement
          }
      }], e((le = o).prototype, [{
          key: "init",
          value: function() {
              o.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this)
          }
      }, {
          key: "destroy",
          value: function() {
              o.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null)
          }
      }, {
          key: "listeners",
          value: function(e) {
              var t = this,
                  i = e ? "addEventListener" : "removeEventListener";
              ["touchstart", "touchmove", "touchend"].forEach(function(e) {
                  t.element[i](e, function(e) {
                      return t.set(e)
                  }, !1)
              })
          }
      }, {
          key: "get",
          value: function(e) {
              var t, i, n, s, a;
              return o.enabled && H(e) ? (s = e.target, e = e.changedTouches[0], t = parseFloat(s.getAttribute("min")) || 0, i = parseFloat(s.getAttribute("max")) || 100, n = parseFloat(s.getAttribute("step")) || 1, a = 100 / (s = s.getBoundingClientRect()).width * (this.config.thumbWidth / 2) / 100, (e = 100 / s.width * (e.clientX - s.left)) < 0 ? e = 0 : 100 < e && (e = 100), e < 50 ? e -= (100 - 2 * e) * a : 50 < e && (e += 2 * (e - 50) * a), t + (s = e / 100 * (i - t), (a = n) < 1 ? (e = (e = "".concat(a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)) ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0, parseFloat(s.toFixed(e))) : Math.round(s / a) * a)) : null
          }
      }, {
          key: "set",
          value: function(e) {
              var t;
              o.enabled && H(e) && !e.target.disabled && (e.preventDefault(), e.target.value = this.get(e), t = e.target, e = "touchend" === e.type ? "change" : "input", t) && e && (e = new Event(e, {
                  bubbles: !0
              }), t.dispatchEvent(e))
          }
      }]), e(le, Je);
      var J = o;

      function o(e, t) {
          if (!(this instanceof o)) throw new TypeError("Cannot call a class as a function");
          F(e) ? this.element = e : K(e) && (this.element = document.querySelector(e)), F(this.element) && q(this.element.rangeTouch) && (this.config = R({}, z, {}, t), this.init())
      }
      const ee = e => null != e ? e.constructor : null,
          i = (e, t) => Boolean(e && t && e instanceof t),
          te = e => null == e,
          ie = e => ee(e) === Object,
          ne = e => ee(e) === String,
          se = e => ee(e) === Function,
          ae = e => Array.isArray(e),
          re = e => i(e, NodeList),
          oe = e => te(e) || (ne(e) || ae(e) || re(e)) && !e.length || ie(e) && !Object.keys(e).length;
      var le, l = te,
          n = ie,
          b = e => ee(e) === Number && !Number.isNaN(e),
          c = ne,
          v = e => ee(e) === Boolean,
          d = se,
          u = ae,
          ce = re,
          y = e => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument,
          h = e => i(e, Event),
          p = e => i(e, KeyboardEvent),
          de = e => i(e, TextTrack) || !te(e) && ne(e.kind),
          ue = e => {
              if (i(e, window.URL)) return !0;
              if (!ne(e)) return !1;
              let t = e;
              e.startsWith("http://") && e.startsWith("https://") || (t = "http://" + e);
              try {
                  return !oe(new URL(t).hostname)
              } catch (e) {
                  return !1
              }
          },
          w = oe;
      const he = (() => {
          const t = document.createElement("span"),
              e = {
                  WebkitTransition: "webkitTransitionEnd",
                  MozTransition: "transitionend",
                  OTransition: "oTransitionEnd otransitionend",
                  transition: "transitionend"
              },
              i = Object.keys(e).find(e => void 0 !== t.style[e]);
          return !!c(i) && e[i]
      })();

      function pe(e, t) {
          setTimeout(() => {
              try {
                  e.hidden = !0, e.offsetHeight, e.hidden = !1
              } catch (e) {}
          }, t)
      }
      const m = {
          isIE: Boolean(window.document.documentMode),
          isEdge: window.navigator.userAgent.includes("Edge"),
          isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
          isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
          isIos: "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
      };

      function me(e, t) {
          return t.split(".").reduce((e, t) => e && e[t], e)
      }

      function g(t = {}, ...e) {
          if (!e.length) return t;
          const i = e.shift();
          return n(i) ? (Object.keys(i).forEach(e => {
              n(i[e]) ? (Object.keys(t).includes(e) || Object.assign(t, {
                  [e]: {}
              }), g(t[e], i[e])) : Object.assign(t, {
                  [e]: i[e]
              })
          }), g(t, ...e)) : t
      }

      function ge(e, s) {
          e = e.length ? e : [e];
          Array.from(e).reverse().forEach((e, t) => {
              var t = 0 < t ? s.cloneNode(!0) : s,
                  i = e.parentNode,
                  n = e.nextSibling;
              t.appendChild(e), n ? i.insertBefore(t, n) : i.appendChild(t)
          })
      }

      function fe(i, e) {
          y(i) && !w(e) && Object.entries(e).filter(([, e]) => !l(e)).forEach(([e, t]) => i.setAttribute(e, t))
      }

      function _(e, t, i) {
          e = document.createElement(e);
          return n(t) && fe(e, t), c(i) && (e.innerText = i), e
      }

      function be(e, t, i, n) {
          y(t) && t.appendChild(_(e, i, n))
      }

      function f(e) {
          ce(e) || u(e) ? Array.from(e).forEach(f) : y(e) && y(e.parentNode) && e.parentNode.removeChild(e)
      }

      function ve(t) {
          if (y(t)) {
              let e = t.childNodes["length"];
              for (; 0 < e;) t.removeChild(t.lastChild), --e
          }
      }

      function ye(e, t) {
          return y(t) && y(t.parentNode) && y(e) ? (t.parentNode.replaceChild(e, t), e) : null
      }

      function E(e, t) {
          if (!c(e) || w(e)) return {};
          const a = {},
              r = g({}, t);
          return e.split(",").forEach(e => {
              var t = e.trim(),
                  i = t.replace(".", ""),
                  e = t.replace(/[[\]]/g, "").split("="),
                  [n] = e,
                  s = 1 < e.length ? e[1].replace(/["']/g, "") : "";
              switch (t.charAt(0)) {
                  case ".":
                      c(r.class) ? a.class = r.class + " " + i : a.class = i;
                      break;
                  case "#":
                      a.id = t.replace("#", "");
                      break;
                  case "[":
                      a[n] = s
              }
          }), g(r, a)
      }

      function x(t, i) {
          if (y(t)) {
              let e = i;
              v(e) || (e = !t.hidden), t.hidden = e
          }
      }

      function C(t, i, n) {
          if (ce(t)) return Array.from(t).map(e => C(e, i, n));
          if (y(t)) {
              let e = void 0 !== n ? n ? "add" : "remove" : "toggle";
              return t.classList[e](i), t.classList.contains(i)
          }
          return !1
      }

      function we(e, t) {
          return y(e) && e.classList.contains(t)
      }

      function T(e, t) {
          var i = Element["prototype"];
          return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
              return Array.from(document.querySelectorAll(t)).includes(this)
          }).call(e, t)
      }

      function s(e) {
          return this.elements.container.querySelectorAll(e)
      }

      function a(e) {
          return this.elements.container.querySelector(e)
      }

      function _e(e = null, t = !1) {
          y(e) && (e.focus({
              preventScroll: !0
          }), t) && C(e, this.config.classNames.tabFocus)
      }
      const Ee = {
              "audio/ogg": "vorbis",
              "audio/wav": "1",
              "video/webm": "vp8, vorbis",
              "video/mp4": "avc1.42E01E, mp4a.40.2",
              "video/ogg": "theora"
          },
          S = {
              audio: "canPlayType" in document.createElement("audio"),
              video: "canPlayType" in document.createElement("video"),
              check(e, t, i) {
                  i = m.isIPhone && i && S.playsinline, t = S[e] || "html5" !== t;
                  return {
                      api: t,
                      ui: t && S.rangeInput && ("video" !== e || !m.isIPhone || i)
                  }
              },
              pip: !(m.isIPhone || !d(_("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || _("video").disablePictureInPicture)),
              airplay: d(window.WebKitPlaybackTargetAvailabilityEvent),
              playsinline: "playsInline" in document.createElement("video"),
              mime(e) {
                  if (w(e)) return !1;
                  var [t] = e.split("/");
                  let i = e;
                  if (!this.isHTML5 || t !== this.type) return !1;
                  Object.keys(Ee).includes(i) && (i += `; codecs="${Ee[e]}"`);
                  try {
                      return Boolean(i && this.media.canPlayType(i).replace(/no/, ""))
                  } catch (e) {
                      return !1
                  }
              },
              textTracks: "textTracks" in document.createElement("video"),
              rangeInput: ((le = document.createElement("input")).type = "range") === le.type,
              touch: "ontouchstart" in document.documentElement,
              transitions: !1 !== he,
              reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
          },
          xe = (() => {
              let e = !1;
              try {
                  var t = Object.defineProperty({}, "passive", {
                      get: () => (e = !0, null)
                  });
                  window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
              } catch (e) {}
              return e
          })();

      function k(i, e, n, s = !1, a = !0, r = !1) {
          if (i && "addEventListener" in i && !w(e) && d(n)) {
              e = e.split(" ");
              let t = r;
              xe && (t = {
                  passive: a,
                  capture: r
              }), e.forEach(e => {
                  this && this.eventListeners && s && this.eventListeners.push({
                      element: i,
                      type: e,
                      callback: n,
                      options: t
                  }), i[s ? "addEventListener" : "removeEventListener"](e, n, t)
              })
          }
      }

      function M(e, t = "", i, n = !0, s = !1) {
          k.call(this, e, t, i, !0, n, s)
      }

      function Ce(e, t = "", i, n = !0, s = !1) {
          k.call(this, e, t, i, !1, n, s)
      }

      function Te(t, i = "", n, s = !0, a = !1) {
          const r = (...e) => {
              Ce(t, i, r, s, a), n.apply(this, e)
          };
          k.call(this, t, i, r, !0, s, a)
      }

      function A(e, t = "", i = !1, n = {}) {
          y(e) && !w(t) && (t = new CustomEvent(t, {
              bubbles: i,
              detail: { ...n,
                  plyr: this
              }
          }), e.dispatchEvent(t))
      }

      function N(e) {
          var t;
          t = e, i(t, Promise) && se(t.then) && e.then(null, () => {})
      }

      function Se(i) {
          return u(i) ? i.filter((e, t) => i.indexOf(e) === t) : i
      }

      function ke(e, i) {
          return u(e) && e.length ? e.reduce((e, t) => Math.abs(t - i) < Math.abs(e - i) ? t : e) : null
      }

      function Me(e) {
          return !(!window || !window.CSS) && window.CSS.supports(e)
      }
      const Ae = [
          [1, 1],
          [4, 3],
          [3, 4],
          [5, 4],
          [4, 5],
          [3, 2],
          [2, 3],
          [16, 10],
          [10, 16],
          [16, 9],
          [9, 16],
          [21, 9],
          [9, 21],
          [32, 9],
          [9, 32]
      ].reduce((e, [t, i]) => ({ ...e,
          [t / i]: [t, i]
      }), {});

      function Ne(e) {
          return (u(e) || c(e) && e.includes(":")) && (u(e) ? e : e.split(":")).map(Number).every(b)
      }

      function Oe(e) {
          if (!u(e) || !e.every(b)) return null;
          const [t, i] = e, n = (e, t) => 0 === t ? e : n(t, e % t), s = n(t, i);
          return [t / s, i / s]
      }

      function De(e) {
          const t = e => Ne(e) ? e.split(":").map(Number) : null;
          let i = t(e);
          if (null === (i = null === i ? t(this.config.ratio) : i) && !w(this.embed) && u(this.embed.ratio) && ({
                  ratio: i
              } = this.embed), null === i && this.isHTML5) {
              const {
                  videoWidth: e,
                  videoHeight: t
              } = this.media;
              i = [e, t]
          }
          return Oe(i)
      }

      function Ie(e) {
          if (!this.isVideo) return {};
          const t = this.elements["wrapper"],
              i = De.call(this, e);
          if (!u(i)) return {};
          var [e, n] = Oe(i), s = 100 / e * n;
          if (Me(`aspect-ratio: ${e}/` + n) ? t.style.aspectRatio = e + "/" + n : t.style.paddingBottom = s + "%", this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
              const e = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
                  i = (e - s) / (e / 50);
              this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i}%)`
          } else this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
          return {
              padding: s,
              ratio: i
          }
      }

      function Le(e, t, i = .05) {
          var n = e / t,
              s = ke(Object.keys(Ae), n);
          return Math.abs(s - n) <= i ? Ae[s] : [e, t]
      }
      const O = {
          getSources() {
              return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(e => {
                  e = e.getAttribute("type");
                  return !!w(e) || S.mime.call(this, e)
              }) : []
          },
          getQualityOptions() {
              return this.config.quality.forced ? this.config.quality.options : O.getSources.call(this).map(e => Number(e.getAttribute("size"))).filter(Boolean)
          },
          setup() {
              if (this.isHTML5) {
                  const o = this;
                  o.options.speed = o.config.speed.options, w(this.config.ratio) || Ie.call(o), Object.defineProperty(o.media, "quality", {
                      get() {
                          var e = O.getSources.call(o).find(e => e.getAttribute("src") === o.source);
                          return e && Number(e.getAttribute("size"))
                      },
                      set(t) {
                          if (o.quality !== t) {
                              if (o.config.quality.forced && d(o.config.quality.onChange)) o.config.quality.onChange(t);
                              else {
                                  var e = O.getSources.call(o).find(e => Number(e.getAttribute("size")) === t);
                                  if (!e) return;
                                  const {
                                      currentTime: i,
                                      paused: n,
                                      preload: s,
                                      readyState: a,
                                      playbackRate: r
                                  } = o.media;
                                  o.media.src = e.getAttribute("src"), "none" === s && !a || (o.once("loadedmetadata", () => {
                                      o.speed = r, o.currentTime = i, n || N(o.play())
                                  }), o.media.load())
                              }
                              A.call(o, o.media, "qualitychange", !1, {
                                  quality: t
                              })
                          }
                      }
                  })
              }
          },
          cancelRequests() {
              this.isHTML5 && (f(O.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
          }
      };

      function $e(e, ...i) {
          return w(e) ? e : e.toString().replace(/{(\d+)}/g, (e, t) => i[t].toString())
      }
      const Pe = (e = "", t = "", i = "") => e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString()),
          je = (e = "") => e.toString().replace(/\w\S*/g, e => e.charAt(0).toUpperCase() + e.substr(1).toLowerCase());

      function Re(e) {
          var t = document.createElement("div");
          return t.appendChild(e), t.innerHTML
      }
      const ze = {
              pip: "PIP",
              airplay: "AirPlay",
              html5: "HTML5",
              vimeo: "Vimeo",
              youtube: "YouTube"
          },
          D = {
              get(e = "", t = {}) {
                  if (w(e) || w(t)) return "";
                  let i = me(t.i18n, e);
                  return w(i) ? Object.keys(ze).includes(e) ? ze[e] : "" : (e = {
                      "{seektime}": t.seekTime,
                      "{title}": t.title
                  }, Object.entries(e).forEach(([e, t]) => {
                      i = Pe(i, e, t)
                  }), i)
              }
          };
      class Be {
          constructor(e) {
              r(this, "get", e => {
                  var t;
                  return !Be.supported || !this.enabled || (t = window.localStorage.getItem(this.key), w(t)) ? null : (t = JSON.parse(t), c(e) && e.length ? t[e] : t)
              }), r(this, "set", t => {
                  if (Be.supported && this.enabled && n(t)) {
                      let e = this.get();
                      g(e = w(e) ? {} : e, t);
                      try {
                          window.localStorage.setItem(this.key, JSON.stringify(e))
                      } catch (t) {}
                  }
              }), this.enabled = e.config.storage.enabled, this.key = e.config.storage.key
          }
          static get supported() {
              try {
                  var e;
                  return "localStorage" in window ? (e = "___test", window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0) : !1
              } catch (e) {
                  return !1
              }
          }
      }

      function Fe(e, n = "text") {
          return new Promise((t, i) => {
              try {
                  const i = new XMLHttpRequest;
                  "withCredentials" in i && (i.addEventListener("load", () => {
                      if ("text" === n) try {
                          t(JSON.parse(i.responseText))
                      } catch (e) {
                          t(i.responseText)
                      } else t(i.response)
                  }), i.addEventListener("error", () => {
                      throw new Error(i.status)
                  }), i.open("GET", e, !0), i.responseType = n, i.send())
              } catch (e) {
                  i(e)
              }
          })
      }

      function He(e, t) {
          if (c(e)) {
              const i = c(t);
              const n = () => null !== document.getElementById(t),
                  s = (e, t) => {
                      e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e)
                  };
              if (!i || !n()) {
                  const n = Be.supported,
                      a = document.createElement("div");
                  if (a.setAttribute("hidden", ""), i && a.setAttribute("id", t), n) {
                      const e = window.localStorage.getItem("cache-" + t);
                      if (null !== e) {
                          const t = JSON.parse(e);
                          s(a, t.content)
                      }
                  }
                  Fe(e).then(e => {
                      if (!w(e)) {
                          if (n) try {
                              window.localStorage.setItem("cache-" + t, JSON.stringify({
                                  content: e
                              }))
                          } catch (e) {}
                          s(a, e)
                      }
                  }).catch(() => {})
              }
          }
      }
      const qe = e => Math.trunc(e / 60 / 60 % 60, 10);

      function Ye(e = 0, t = !1, i = !1) {
          var n, s, a, r;
          return b(e) ? (n = e => ("0" + e).slice(-2), r = qe(e), s = Math.trunc(e / 60 % 60, 10), a = Math.trunc(e % 60, 10), (i && 0 < e ? "-" : "") + (r = t || 0 < r ? r + ":" : "") + n(s) + ":" + n(a)) : Ye(void 0, t, i)
      }
      const I = {
          getIconUrl() {
              var e = new URL(this.config.iconUrl, window.location),
                  t = window.location.host || window.top.location.host,
                  e = e.host !== t || m.isIE && !window.svg4everybody;
              return {
                  url: this.config.iconUrl,
                  cors: e
              }
          },
          findElements() {
              try {
                  return this.elements.controls = a.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                      play: s.call(this, this.config.selectors.buttons.play),
                      pause: a.call(this, this.config.selectors.buttons.pause),
                      restart: a.call(this, this.config.selectors.buttons.restart),
                      rewind: a.call(this, this.config.selectors.buttons.rewind),
                      fastForward: a.call(this, this.config.selectors.buttons.fastForward),
                      mute: a.call(this, this.config.selectors.buttons.mute),
                      pip: a.call(this, this.config.selectors.buttons.pip),
                      airplay: a.call(this, this.config.selectors.buttons.airplay),
                      settings: a.call(this, this.config.selectors.buttons.settings),
                      captions: a.call(this, this.config.selectors.buttons.captions),
                      fullscreen: a.call(this, this.config.selectors.buttons.fullscreen)
                  }, this.elements.progress = a.call(this, this.config.selectors.progress), this.elements.inputs = {
                      seek: a.call(this, this.config.selectors.inputs.seek),
                      volume: a.call(this, this.config.selectors.inputs.volume)
                  }, this.elements.display = {
                      buffer: a.call(this, this.config.selectors.display.buffer),
                      currentTime: a.call(this, this.config.selectors.display.currentTime),
                      duration: a.call(this, this.config.selectors.display.duration)
                  }, y(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector("." + this.config.classNames.tooltip)), !0
              } catch (e) {
                  return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
              }
          },
          createIcon(e, t) {
              var i = "http://www.w3.org/2000/svg",
                  n = I.getIconUrl.call(this),
                  n = `${n.cors ? "" : n.url}#` + this.config.iconPrefix,
                  s = document.createElementNS(i, "svg"),
                  t = (fe(s, g(t, {
                      "aria-hidden": "true",
                      focusable: "false"
                  })), document.createElementNS(i, "use")),
                  i = n + "-" + e;
              return "href" in t && t.setAttributeNS("http://www.w3.org/1999/xlink", "href", i), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", i), s.appendChild(t), s
          },
          createLabel(e, t = {}) {
              e = D.get(e, this.config);
              return _("span", { ...t,
                  class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
              }, e)
          },
          createBadge(e) {
              var t;
              return w(e) ? null : ((t = _("span", {
                  class: this.config.classNames.menu.value
              })).appendChild(_("span", {
                  class: this.config.classNames.menu.badge
              }, e)), t)
          },
          createButton(e, t) {
              const i = g({}, t);
              [t = ""] = [e];
              let n = (t = function(e = "") {
                  e = e.toString(), e = Pe(e, "-", " ");
                  return e = Pe(e, "_", " "), e = je(e), Pe(e, " ", "")
              }(t = t.toString())).charAt(0).toLowerCase() + t.slice(1);
              const s = {
                  element: "button",
                  toggle: !1,
                  label: null,
                  icon: null,
                  labelPressed: null,
                  iconPressed: null
              };
              switch (["element", "icon", "label"].forEach(e => {
                  Object.keys(i).includes(e) && (s[e] = i[e], delete i[e])
              }), "button" !== s.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(e => e === this.config.classNames.control) || g(i, {
                  class: i.class + " " + this.config.classNames.control
              }) : i.class = this.config.classNames.control, e) {
                  case "play":
                      s.toggle = !0, s.label = "play", s.labelPressed = "pause", s.icon = "play", s.iconPressed = "pause";
                      break;
                  case "mute":
                      s.toggle = !0, s.label = "mute", s.labelPressed = "unmute", s.icon = "volume", s.iconPressed = "muted";
                      break;
                  case "captions":
                      s.toggle = !0, s.label = "enableCaptions", s.labelPressed = "disableCaptions", s.icon = "captions-off", s.iconPressed = "captions-on";
                      break;
                  case "fullscreen":
                      s.toggle = !0, s.label = "enterFullscreen", s.labelPressed = "exitFullscreen", s.icon = "enter-fullscreen", s.iconPressed = "exit-fullscreen";
                      break;
                  case "play-large":
                      i.class += ` ${this.config.classNames.control}--overlaid`, n = "play", s.label = "play", s.icon = "play";
                      break;
                  default:
                      w(s.label) && (s.label = n), w(s.icon) && (s.icon = e)
              }
              t = _(s.element);
              return s.toggle ? (t.appendChild(I.createIcon.call(this, s.iconPressed, {
                  class: "icon--pressed"
              })), t.appendChild(I.createIcon.call(this, s.icon, {
                  class: "icon--not-pressed"
              })), t.appendChild(I.createLabel.call(this, s.labelPressed, {
                  class: "label--pressed"
              })), t.appendChild(I.createLabel.call(this, s.label, {
                  class: "label--not-pressed"
              }))) : (t.appendChild(I.createIcon.call(this, s.icon)), t.appendChild(I.createLabel.call(this, s.label))), g(i, E(this.config.selectors.buttons[n], i)), fe(t, i), "play" === n ? (u(this.elements.buttons[n]) || (this.elements.buttons[n] = []), this.elements.buttons[n].push(t)) : this.elements.buttons[n] = t, t
          },
          createRange(e, t) {
              t = _("input", g(E(this.config.selectors.inputs[e]), {
                  type: "range",
                  min: 0,
                  max: 100,
                  step: .01,
                  value: 0,
                  autocomplete: "off",
                  role: "slider",
                  "aria-label": D.get(e, this.config),
                  "aria-valuemin": 0,
                  "aria-valuemax": 100,
                  "aria-valuenow": 0
              }, t));
              return this.elements.inputs[e] = t, I.updateRangeFill.call(this, t), J.setup(t), t
          },
          createProgress(e, t) {
              var i = _("progress", g(E(this.config.selectors.display[e]), {
                  min: 0,
                  max: 100,
                  value: 0,
                  role: "progressbar",
                  "aria-hidden": !0
              }, t));
              if ("volume" !== e) {
                  i.appendChild(_("span", null, "0"));
                  const t = {
                          played: "played",
                          buffer: "buffered"
                      }[e],
                      n = t ? D.get(t, this.config) : "";
                  i.innerText = "% " + n.toLowerCase()
              }
              return this.elements.display[e] = i
          },
          createTime(e, t) {
              t = E(this.config.selectors.display[e], t), t = _("div", g(t, {
                  class: `${t.class || ""} ${this.config.classNames.display.time} `.trim(),
                  "aria-label": D.get(e, this.config)
              }), "00:00");
              return this.elements.display[e] = t
          },
          bindMenuItemShortcuts(n, e) {
              M.call(this, n, "keydown keyup", t => {
                  if ([32, 38, 39, 40].includes(t.which) && (t.preventDefault(), t.stopPropagation(), "keydown" !== t.type)) {
                      var i = T(n, '[role="menuitemradio"]');
                      if (!i && [32, 39].includes(t.which)) I.showMenuPanel.call(this, e, !0);
                      else {
                          let e;
                          32 !== t.which && (40 === t.which || i && 39 === t.which ? (e = n.nextElementSibling, y(e) || (e = n.parentNode.firstElementChild)) : (e = n.previousElementSibling, y(e) || (e = n.parentNode.lastElementChild)), _e.call(this, e, !0))
                      }
                  }
              }, !1), M.call(this, n, "keyup", e => {
                  13 === e.which && I.focusFirstMenuItem.call(this, null, !0)
              })
          },
          createMenuItem({
              value: t,
              list: e,
              type: i,
              title: n,
              badge: s = null,
              checked: a = !1
          }) {
              const r = E(this.config.selectors.inputs[i]),
                  o = _("button", g(r, {
                      type: "button",
                      role: "menuitemradio",
                      class: (this.config.classNames.control + " " + (r.class || "")).trim(),
                      "aria-checked": a,
                      value: t
                  })),
                  l = _("span");
              l.innerHTML = n, y(s) && l.appendChild(s), o.appendChild(l), Object.defineProperty(o, "checked", {
                  enumerable: !0,
                  get: () => "true" === o.getAttribute("aria-checked"),
                  set(e) {
                      e && Array.from(o.parentNode.children).filter(e => T(e, '[role="menuitemradio"]')).forEach(e => e.setAttribute("aria-checked", "false")), o.setAttribute("aria-checked", e ? "true" : "false")
                  }
              }), this.listeners.bind(o, "click keyup", e => {
                  if (!p(e) || 32 === e.which) {
                      switch (e.preventDefault(), e.stopPropagation(), o.checked = !0, i) {
                          case "language":
                              this.currentTrack = Number(t);
                              break;
                          case "quality":
                              this.quality = t;
                              break;
                          case "speed":
                              this.speed = parseFloat(t)
                      }
                      I.showMenuPanel.call(this, "home", p(e))
                  }
              }, i, !1), I.bindMenuItemShortcuts.call(this, o, i), e.appendChild(o)
          },
          formatTime(e = 0, t = !1) {
              return b(e) ? Ye(e, 0 < qe(this.duration), t) : e
          },
          updateTimeDisplay(e = null, t = 0, i = !1) {
              y(e) && b(t) && (e.innerText = I.formatTime(t, i))
          },
          updateVolume() {
              this.supported.ui && (y(this.elements.inputs.volume) && I.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), y(this.elements.buttons.mute)) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume)
          },
          setRange(e, t = 0) {
              y(e) && (e.value = t, I.updateRangeFill.call(this, e))
          },
          updateProgress(e) {
              if (this.supported.ui && h(e)) {
                  var t, i, n = (e, t) => {
                      var t = b(t) ? t : 0,
                          i = y(e) ? e : this.elements.display.buffer;
                      if (y(i)) {
                          i.value = t;
                          const e = i.getElementsByTagName("span")[0];
                          y(e) && (e.childNodes[0].nodeValue = t)
                      }
                  };
                  if (e) switch (e.type) {
                      case "timeupdate":
                      case "seeking":
                      case "seeked":
                          t = this.currentTime, i = this.duration, t = 0 === t || 0 === i || Number.isNaN(t) || Number.isNaN(i) ? 0 : (t / i * 100).toFixed(2), "timeupdate" === e.type && I.setRange.call(this, this.elements.inputs.seek, t);
                          break;
                      case "playing":
                      case "progress":
                          n(this.elements.display.buffer, 100 * this.buffered)
                  }
              }
          },
          updateRangeFill(e) {
              var t = h(e) ? e.target : e;
              if (y(t) && "range" === t.getAttribute("type")) {
                  if (T(t, this.config.selectors.inputs.seek)) {
                      t.setAttribute("aria-valuenow", this.currentTime);
                      const e = I.formatTime(this.currentTime),
                          i = I.formatTime(this.duration),
                          n = D.get("seekLabel", this.config);
                      t.setAttribute("aria-valuetext", n.replace("{currentTime}", e).replace("{duration}", i))
                  } else if (T(t, this.config.selectors.inputs.volume)) {
                      const e = 100 * t.value;
                      t.setAttribute("aria-valuenow", e), t.setAttribute("aria-valuetext", e.toFixed(1) + "%")
                  } else t.setAttribute("aria-valuenow", t.value);
                  m.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%")
              }
          },
          updateSeekTooltip(t) {
              if (this.config.tooltips.seek && y(this.elements.inputs.seek) && y(this.elements.display.seekTooltip) && 0 !== this.duration) {
                  const n = this.config.classNames.tooltip + "--visible",
                      s = e => C(this.elements.display.seekTooltip, n, e);
                  if (this.touch) s(!1);
                  else {
                      let e = 0;
                      var i = this.elements.progress.getBoundingClientRect();
                      if (h(t)) e = 100 / i.width * (t.pageX - i.left);
                      else {
                          if (!we(this.elements.display.seekTooltip, n)) return;
                          e = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                      }
                      e < 0 ? e = 0 : 100 < e && (e = 100), I.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * e), this.elements.display.seekTooltip.style.left = e + "%", h(t) && ["mouseenter", "mouseleave"].includes(t.type) && s("mouseenter" === t.type)
                  }
              }
          },
          timeUpdate(e) {
              var t = !y(this.elements.display.duration) && this.config.invertTime;
              I.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || I.updateProgress.call(this, e)
          },
          durationUpdate() {
              var e;
              !this.supported.ui || !this.config.invertTime && this.currentTime || (this.duration >= 2 ** 32 ? (x(this.elements.display.currentTime, !0), x(this.elements.progress, !0)) : (y(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration), !(e = y(this.elements.display.duration)) && this.config.displayDuration && this.paused && I.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && I.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), I.updateSeekTooltip.call(this)))
          },
          toggleMenuButton(e, t) {
              x(this.elements.settings.buttons[e], !t)
          },
          updateSetting(e, t, i) {
              var n = this.elements.settings.panels[e];
              let s = null,
                  a = t;
              if ("captions" === e) s = this.currentTrack;
              else {
                  if (s = w(i) ? this[e] : i, w(s) && (s = this.config[e].default), !w(this.options[e]) && !this.options[e].includes(s)) return void this.debug.warn(`Unsupported value of '${s}' for ` + e);
                  if (!this.config[e].options.includes(s)) return void this.debug.warn(`Disabled value of '${s}' for ` + e)
              }
              y(a) || (a = n && n.querySelector('[role="menu"]')), y(a) && (this.elements.settings.buttons[e].querySelector("." + this.config.classNames.menu.value).innerHTML = I.getLabel.call(this, e, s), t = a && a.querySelector(`[value="${s}"]`), y(t)) && (t.checked = !0)
          },
          getLabel(e, t) {
              switch (e) {
                  case "speed":
                      return 1 === t ? D.get("normal", this.config) : t + "&times;";
                  case "quality":
                      if (b(t)) {
                          const e = D.get("qualityLabel." + t, this.config);
                          return e.length ? e : t + "p"
                      }
                      return je(t);
                  case "captions":
                      return L.getLabel.call(this);
                  default:
                      return null
              }
          },
          setQualityMenu(e) {
              if (y(this.elements.settings.panels.quality)) {
                  const t = "quality",
                      i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
                  u(e) && (this.options.quality = Se(e).filter(e => this.config.quality.options.includes(e)));
                  e = !w(this.options.quality) && 1 < this.options.quality.length;
                  if (I.toggleMenuButton.call(this, t, e), ve(i), I.checkMenu.call(this), e) {
                      const n = e => {
                          e = D.get("qualityBadge." + e, this.config);
                          return e.length ? I.createBadge.call(this, e) : null
                      };
                      this.options.quality.sort((e, t) => {
                          var i = this.config.quality.options;
                          return i.indexOf(e) > i.indexOf(t) ? 1 : -1
                      }).forEach(e => {
                          I.createMenuItem.call(this, {
                              value: e,
                              list: i,
                              type: t,
                              title: I.getLabel.call(this, "quality", e),
                              badge: n(e)
                          })
                      }), I.updateSetting.call(this, t, i)
                  }
              }
          },
          setCaptionsMenu() {
              if (y(this.elements.settings.panels.captions)) {
                  const i = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
                      t = L.getTracks.call(this),
                      n = Boolean(t.length);
                  var e;
                  I.toggleMenuButton.call(this, "captions", n), ve(i), I.checkMenu.call(this), n && ((e = t.map((e, t) => ({
                      value: t,
                      checked: this.captions.toggled && this.currentTrack === t,
                      title: L.getLabel.call(this, e),
                      badge: e.language && I.createBadge.call(this, e.language.toUpperCase()),
                      list: i,
                      type: "language"
                  }))).unshift({
                      value: -1,
                      checked: !this.captions.toggled,
                      title: D.get("disabled", this.config),
                      list: i,
                      type: "language"
                  }), e.forEach(I.createMenuItem.bind(this)), I.updateSetting.call(this, "captions", i))
              }
          },
          setSpeedMenu() {
              if (y(this.elements.settings.panels.speed)) {
                  const t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
                  this.options.speed = this.options.speed.filter(e => e >= this.minimumSpeed && e <= this.maximumSpeed);
                  var e = !w(this.options.speed) && 1 < this.options.speed.length;
                  I.toggleMenuButton.call(this, "speed", e), ve(t), I.checkMenu.call(this), e && (this.options.speed.forEach(e => {
                      I.createMenuItem.call(this, {
                          value: e,
                          list: t,
                          type: "speed",
                          title: I.getLabel.call(this, "speed", e)
                      })
                  }), I.updateSetting.call(this, "speed", t))
              }
          },
          checkMenu() {
              var e = this.elements.settings["buttons"],
                  e = !w(e) && Object.values(e).some(e => !e.hidden);
              x(this.elements.settings.menu, !e)
          },
          focusFirstMenuItem(t, i = !1) {
              if (!this.elements.settings.popup.hidden) {
                  let e = t;
                  t = (e = y(e) ? e : Object.values(this.elements.settings.panels).find(e => !e.hidden)).querySelector('[role^="menuitem"]');
                  _e.call(this, t, i)
              }
          },
          toggleMenu(t) {
              var i = this.elements.settings["popup"],
                  n = this.elements.buttons.settings;
              if (y(i) && y(n)) {
                  const s = i["hidden"];
                  let e = s;
                  if (v(t)) e = t;
                  else if (p(t) && 27 === t.which) e = !1;
                  else if (h(t)) {
                      const s = d(t.composedPath) ? t.composedPath()[0] : t.target,
                          a = i.contains(s);
                      if (a || !a && t.target !== n && e) return
                  }
                  n.setAttribute("aria-expanded", e), x(i, !e), C(this.elements.container, this.config.classNames.menu.open, e), e && p(t) ? I.focusFirstMenuItem.call(this, null, !0) : e || s || _e.call(this, n, p(t))
              }
          },
          getMenuSize(e) {
              var t = e.cloneNode(!0),
                  e = (t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t), t.scrollWidth),
                  i = t.scrollHeight;
              return f(t), {
                  width: e,
                  height: i
              }
          },
          showMenuPanel(e = "", t = !1) {
              var i = this.elements.container.querySelector(`#plyr-settings-${this.id}-` + e);
              if (y(i)) {
                  const n = i.parentNode,
                      s = Array.from(n.children).find(e => !e.hidden);
                  if (S.transitions && !S.reducedMotion) {
                      n.style.width = s.scrollWidth + "px", n.style.height = s.scrollHeight + "px";
                      const e = I.getMenuSize.call(this, i),
                          t = e => {
                              e.target === n && ["width", "height"].includes(e.propertyName) && (n.style.width = "", n.style.height = "", Ce.call(this, n, he, t))
                          };
                      M.call(this, n, he, t), n.style.width = e.width + "px", n.style.height = e.height + "px"
                  }
                  x(s, !0), x(i, !1), I.focusFirstMenuItem.call(this, i, t)
              }
          },
          setDownloadUrl() {
              var e = this.elements.buttons.download;
              y(e) && e.setAttribute("href", this.download)
          },
          create(a) {
              const {
                  bindMenuItemShortcuts: r,
                  createButton: i,
                  createProgress: e,
                  createRange: n,
                  createTime: o,
                  setQualityMenu: t,
                  setSpeedMenu: s,
                  showMenuPanel: l
              } = I, c = (this.elements.controls = null, u(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large")), _("div", E(this.config.selectors.controls.wrapper))), d = (this.elements.controls = c, {
                  class: "plyr__controls__item"
              });
              return Se(u(this.config.controls) ? this.config.controls : []).forEach(t => {
                  if ("restart" === t && c.appendChild(i.call(this, "restart", d)), "rewind" === t && c.appendChild(i.call(this, "rewind", d)), "play" === t && c.appendChild(i.call(this, "play", d)), "fast-forward" === t && c.appendChild(i.call(this, "fast-forward", d)), "progress" === t) {
                      const r = _("div", {
                              class: d.class + " plyr__progress__container"
                          }),
                          i = _("div", E(this.config.selectors.progress));
                      if (i.appendChild(n.call(this, "seek", {
                              id: "plyr-seek-" + a.id
                          })), i.appendChild(e.call(this, "buffer")), this.config.tooltips.seek) {
                          const a = _("span", {
                              class: this.config.classNames.tooltip
                          }, "00:00");
                          i.appendChild(a), this.elements.display.seekTooltip = a
                      }
                      this.elements.progress = i, r.appendChild(this.elements.progress), c.appendChild(r)
                  }
                  if ("current-time" === t && c.appendChild(o.call(this, "currentTime", d)), "duration" === t && c.appendChild(o.call(this, "duration", d)), "mute" === t || "volume" === t) {
                      let e = this.elements["volume"];
                      if (y(e) && c.contains(e) || (e = _("div", g({}, d, {
                              class: (d.class + " plyr__volume").trim()
                          })), this.elements.volume = e, c.appendChild(e)), "mute" === t && e.appendChild(i.call(this, "mute")), "volume" === t && !m.isIos) {
                          const i = {
                              max: 1,
                              step: .05,
                              value: this.config.volume
                          };
                          e.appendChild(n.call(this, "volume", g(i, {
                              id: "plyr-volume-" + a.id
                          })))
                      }
                  }
                  if ("captions" === t && c.appendChild(i.call(this, "captions", d)), "settings" === t && !w(this.config.settings)) {
                      const e = _("div", g({}, d, {
                              class: (d.class + " plyr__menu").trim(),
                              hidden: ""
                          })),
                          n = (e.appendChild(i.call(this, "settings", {
                              "aria-haspopup": !0,
                              "aria-controls": "plyr-settings-" + a.id,
                              "aria-expanded": !1
                          })), _("div", {
                              class: "plyr__menu__container",
                              id: "plyr-settings-" + a.id,
                              hidden: ""
                          })),
                          o = _("div"),
                          t = _("div", {
                              id: `plyr-settings-${a.id}-home`
                          }),
                          s = _("div", {
                              role: "menu"
                          });
                      t.appendChild(s), o.appendChild(t), this.elements.settings.panels.home = t, this.config.settings.forEach(e => {
                          var t = _("button", g(E(this.config.selectors.buttons.settings), {
                                  type: "button",
                                  class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                                  role: "menuitem",
                                  "aria-haspopup": !0,
                                  hidden: ""
                              })),
                              i = (r.call(this, t, e), M.call(this, t, "click", () => {
                                  l.call(this, e, !1)
                              }), _("span", null, D.get(e, this.config))),
                              n = _("span", {
                                  class: this.config.classNames.menu.value
                              }),
                              n = (n.innerHTML = a[e], i.appendChild(n), t.appendChild(i), s.appendChild(t), _("div", {
                                  id: `plyr-settings-${a.id}-` + e,
                                  hidden: ""
                              })),
                              i = _("button", {
                                  type: "button",
                                  class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
                              });
                          i.appendChild(_("span", {
                              "aria-hidden": !0
                          }, D.get(e, this.config))), i.appendChild(_("span", {
                              class: this.config.classNames.hidden
                          }, D.get("menuBack", this.config))), M.call(this, n, "keydown", e => {
                              37 === e.which && (e.preventDefault(), e.stopPropagation(), l.call(this, "home", !0))
                          }, !1), M.call(this, i, "click", () => {
                              l.call(this, "home", !1)
                          }), n.appendChild(i), n.appendChild(_("div", {
                              role: "menu"
                          })), o.appendChild(n), this.elements.settings.buttons[e] = t, this.elements.settings.panels[e] = n
                      }), n.appendChild(o), e.appendChild(n), c.appendChild(e), this.elements.settings.popup = n, this.elements.settings.menu = e
                  }
                  if ("pip" === t && S.pip && c.appendChild(i.call(this, "pip", d)), "airplay" === t && S.airplay && c.appendChild(i.call(this, "airplay", d)), "download" === t) {
                      const a = g({}, d, {
                              element: "a",
                              href: this.download,
                              target: "_blank"
                          }),
                          r = (this.isHTML5 && (a.download = ""), this.config.urls)["download"];
                      !ue(r) && this.isEmbed && g(a, {
                          icon: "logo-" + this.provider,
                          label: this.provider
                      }), c.appendChild(i.call(this, "download", a))
                  }
                  "fullscreen" === t && c.appendChild(i.call(this, "fullscreen", d))
              }), this.isHTML5 && t.call(this, O.getQualityOptions.call(this)), s.call(this), c
          },
          inject() {
              if (this.config.loadSprite) {
                  const t = I.getIconUrl.call(this);
                  t.cors && He(t.url, "sprite-plyr")
              }
              this.id = Math.floor(1e4 * Math.random());
              let t = null;
              this.elements.controls = null;
              const e = {
                  id: this.id,
                  seektime: this.config.seekTime,
                  title: this.config.title
              };
              let i = !0;
              d(this.config.controls) && (this.config.controls = this.config.controls.call(this, e)), this.config.controls || (this.config.controls = []), y(this.config.controls) || c(this.config.controls) ? t = this.config.controls : (t = I.create.call(this, {
                  id: this.id,
                  seektime: this.config.seekTime,
                  speed: this.speed,
                  quality: this.quality,
                  captions: L.getLabel.call(this)
              }), i = !1);
              let n;
              if (i && c(this.config.controls) && (t = (() => {
                      let i = t;
                      return Object.entries(e).forEach(([e, t]) => {
                          i = Pe(i, `{${e}}`, t)
                      }), i
                  })()), c(this.config.selectors.controls.container) && (n = document.querySelector(this.config.selectors.controls.container)), (n = y(n) ? n : this.elements.container)[y(t) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", t), y(this.elements.controls) || I.findElements.call(this), !w(this.elements.buttons)) {
                  const t = t => {
                      const i = this.config.classNames.controlPressed;
                      Object.defineProperty(t, "pressed", {
                          enumerable: !0,
                          get: () => we(t, i),
                          set(e = !1) {
                              C(t, i, e)
                          }
                      })
                  };
                  Object.values(this.elements.buttons).filter(Boolean).forEach(e => {
                      u(e) || ce(e) ? Array.from(e).filter(Boolean).forEach(t) : t(e)
                  })
              }
              if (m.isEdge && pe(n), this.config.tooltips.controls) {
                  const {
                      classNames: t,
                      selectors: e
                  } = this.config, i = `${e.controls.wrapper} ${e.labels} .` + t.hidden, n = s.call(this, i);
                  Array.from(n).forEach(e => {
                      C(e, this.config.classNames.hidden, !1), C(e, this.config.classNames.tooltip, !0)
                  })
              }
          }
      };

      function We(e, t = !0) {
          let i = e;
          if (t) {
              const e = document.createElement("a");
              e.href = i, i = e.href
          }
          try {
              return new URL(i)
          } catch (e) {
              return null
          }
      }

      function Ue(e) {
          const i = new URLSearchParams;
          return n(e) && Object.entries(e).forEach(([e, t]) => {
              i.set(e, t)
          }), i
      }
      const L = {
              setup() {
                  if (this.supported.ui)
                      if (!this.isVideo || this.isYouTube || this.isHTML5 && !S.textTracks) u(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && I.setCaptionsMenu.call(this);
                      else {
                          var i;
                          if (y(this.elements.captions) || (this.elements.captions = _("div", E(this.config.selectors.captions)), n = this.elements.captions, i = this.elements.wrapper, y(n) && y(i) && i.parentNode.insertBefore(n, i.nextSibling)), m.isIE && window.URL) {
                              const n = this.media.querySelectorAll("track");
                              Array.from(n).forEach(t => {
                                  var e = t.getAttribute("src"),
                                      i = We(e);
                                  null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && Fe(e, "blob").then(e => {
                                      t.setAttribute("src", window.URL.createObjectURL(e))
                                  }).catch(() => {
                                      f(t)
                                  })
                              })
                          }
                          var n = Se((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(e => e.split("-")[0]));
                          let e = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase(),
                              t = ("auto" === e && ([e] = n), this.storage.get("captions"));
                          if (v(t) || ({
                                  active: t
                              } = this.config.captions), Object.assign(this.captions, {
                                  toggled: !1,
                                  active: t,
                                  language: e,
                                  languages: n
                              }), this.isHTML5) {
                              const n = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                              M.call(this, this.media.textTracks, n, L.update.bind(this))
                          }
                          setTimeout(L.update.bind(this), 0)
                      }
              },
              update() {
                  const e = L.getTracks.call(this, !0),
                      {
                          active: t,
                          language: i,
                          meta: n,
                          currentTrackNode: s
                      } = this.captions,
                      a = Boolean(e.find(e => e.language === i));
                  this.isHTML5 && this.isVideo && e.filter(e => !n.get(e)).forEach(e => {
                      this.debug.log("Track added", e), n.set(e, {
                          default: "showing" === e.mode
                      }), "showing" === e.mode && (e.mode = "hidden"), M.call(this, e, "cuechange", () => L.updateCues.call(this))
                  }), (a && this.language !== i || !e.includes(s)) && (L.setLanguage.call(this, i), L.toggle.call(this, t && a)), this.elements && C(this.elements.container, this.config.classNames.captions.enabled, !w(e)), u(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && I.setCaptionsMenu.call(this)
              },
              toggle(e, t = !0) {
                  if (this.supported.ui) {
                      const i = this.captions["toggled"],
                          n = this.config.classNames.captions.active,
                          s = l(e) ? !i : e;
                      if (s !== i) {
                          if (t || (this.captions.active = s, this.storage.set({
                                  captions: s
                              })), !this.language && s && !t) {
                              const e = L.getTracks.call(this),
                                  t = L.findTrack.call(this, [this.captions.language, ...this.captions.languages], !0);
                              return this.captions.language = t.language, void L.set.call(this, e.indexOf(t))
                          }
                          this.elements.buttons.captions && (this.elements.buttons.captions.pressed = s), C(this.elements.container, n, s), this.captions.toggled = s, I.updateSetting.call(this, "captions"), A.call(this, this.media, s ? "captionsenabled" : "captionsdisabled")
                      }
                      setTimeout(() => {
                          s && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden")
                      })
                  }
              },
              set(e, t = !0) {
                  var i, n = L.getTracks.call(this); - 1 !== e ? b(e) ? e in n ? (this.captions.currentTrack !== e && (i = ((n = n[this.captions.currentTrack = e]) || {})["language"], this.captions.currentTrackNode = n, I.updateSetting.call(this, "captions"), t || (this.captions.language = i, this.storage.set({
                      language: i
                  })), this.isVimeo && this.embed.enableTextTrack(i), A.call(this, this.media, "languagechange")), L.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && L.updateCues.call(this)) : this.debug.warn("Track not found", e) : this.debug.warn("Invalid caption argument", e) : L.toggle.call(this, !1, t)
              },
              setLanguage(e, t = !0) {
                  var i, n;
                  c(e) ? (n = e.toLowerCase(), this.captions.language = n, i = L.getTracks.call(this), n = L.findTrack.call(this, [n]), L.set.call(this, i.indexOf(n), t)) : this.debug.warn("Invalid language argument", e)
              },
              getTracks(t = !1) {
                  return Array.from((this.media || {}).textTracks || []).filter(e => !this.isHTML5 || t || this.captions.meta.has(e)).filter(e => ["captions", "subtitles"].includes(e.kind))
              },
              findTrack(e, t = !1) {
                  const i = L.getTracks.call(this),
                      n = e => Number((this.captions.meta.get(e) || {}).default),
                      s = Array.from(i).sort((e, t) => n(t) - n(e));
                  let a;
                  return e.every(t => !(a = s.find(e => e.language === t))), a || (t ? s[0] : void 0)
              },
              getCurrentTrack() {
                  return L.getTracks.call(this)[this.currentTrack]
              },
              getLabel(e) {
                  let t = e;
                  return !de(t) && S.textTracks && this.captions.toggled && (t = L.getCurrentTrack.call(this)), de(t) ? w(t.label) ? w(t.language) ? D.get("enabled", this.config) : e.language.toUpperCase() : t.label : D.get("disabled", this.config)
              },
              updateCues(t) {
                  if (this.supported.ui)
                      if (y(this.elements.captions))
                          if (l(t) || Array.isArray(t)) {
                              let e = t;
                              if (!e) {
                                  const t = L.getCurrentTrack.call(this);
                                  e = Array.from((t || {}).activeCues || []).map(e => e.getCueAsHTML()).map(Re)
                              }
                              var i = e.map(e => e.trim()).join("\n");
                              if (i !== this.elements.captions.innerHTML) {
                                  ve(this.elements.captions);
                                  const t = _("span", E(this.config.selectors.caption));
                                  t.innerHTML = i, this.elements.captions.appendChild(t), A.call(this, this.media, "cuechange")
                              }
                          } else this.debug.warn("updateCues: Invalid input", t);
                  else this.debug.warn("No captions element to render to")
              }
          },
          Ve = {
              enabled: !0,
              title: "",
              debug: !1,
              autoplay: !1,
              autopause: !0,
              playsinline: !0,
              seekTime: 10,
              volume: 1,
              muted: !1,
              duration: null,
              displayDuration: !0,
              invertTime: !0,
              toggleInvert: !0,
              ratio: null,
              clickToPlay: !0,
              hideControls: !0,
              resetOnEnd: !1,
              disableContextMenu: !0,
              loadSprite: !0,
              iconPrefix: "plyr",
              iconUrl: "https://cdn.plyr.io/3.6.12/plyr.svg",
              blankVideo: "https://cdn.plyr.io/static/blank.mp4",
              quality: {
                  default: 576,
                  options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
                  forced: !1,
                  onChange: null
              },
              loop: {
                  active: !1
              },
              speed: {
                  selected: 1,
                  options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
              },
              keyboard: {
                  focused: !0,
                  global: !1
              },
              tooltips: {
                  controls: !1,
                  seek: !0
              },
              captions: {
                  active: !1,
                  language: "auto",
                  update: !1
              },
              fullscreen: {
                  enabled: !0,
                  fallback: !0,
                  iosNative: !1
              },
              storage: {
                  enabled: !0,
                  key: "plyr"
              },
              controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
              settings: ["captions", "quality", "speed"],
              i18n: {
                  restart: "Restart",
                  rewind: "Rewind {seektime}s",
                  play: "Play",
                  pause: "Pause",
                  fastForward: "Forward {seektime}s",
                  seek: "Seek",
                  seekLabel: "{currentTime} of {duration}",
                  played: "Played",
                  buffered: "Buffered",
                  currentTime: "Current time",
                  duration: "Duration",
                  volume: "Volume",
                  mute: "Mute",
                  unmute: "Unmute",
                  enableCaptions: "Enable captions",
                  disableCaptions: "Disable captions",
                  download: "Download",
                  enterFullscreen: "Enter fullscreen",
                  exitFullscreen: "Exit fullscreen",
                  frameTitle: "Player for {title}",
                  captions: "Captions",
                  settings: "Settings",
                  pip: "PIP",
                  menuBack: "Go back to previous menu",
                  speed: "Speed",
                  normal: "Normal",
                  quality: "Quality",
                  loop: "Loop",
                  start: "Start",
                  end: "End",
                  all: "All",
                  reset: "Reset",
                  disabled: "Disabled",
                  enabled: "Enabled",
                  advertisement: "Ad",
                  qualityBadge: {
                      2160: "4K",
                      1440: "HD",
                      1080: "HD",
                      720: "HD",
                      576: "SD",
                      480: "SD"
                  }
              },
              urls: {
                  download: null,
                  vimeo: {
                      sdk: "https://player.vimeo.com/api/player.js",
                      iframe: "https://player.vimeo.com/video/{0}?{1}",
                      api: "https://vimeo.com/api/oembed.json?url={0}"
                  },
                  youtube: {
                      sdk: "https://www.youtube.com/iframe_api",
                      api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
                  },
                  googleIMA: {
                      sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
                  }
              },
              listeners: {
                  seek: null,
                  play: null,
                  pause: null,
                  restart: null,
                  rewind: null,
                  fastForward: null,
                  mute: null,
                  volume: null,
                  captions: null,
                  download: null,
                  fullscreen: null,
                  pip: null,
                  airplay: null,
                  speed: null,
                  quality: null,
                  loop: null,
                  language: null
              },
              events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
              selectors: {
                  editable: "input, textarea, select, [contenteditable]",
                  container: ".plyr",
                  controls: {
                      container: null,
                      wrapper: ".plyr__controls"
                  },
                  labels: "[data-plyr]",
                  buttons: {
                      play: '[data-plyr="play"]',
                      pause: '[data-plyr="pause"]',
                      restart: '[data-plyr="restart"]',
                      rewind: '[data-plyr="rewind"]',
                      fastForward: '[data-plyr="fast-forward"]',
                      mute: '[data-plyr="mute"]',
                      captions: '[data-plyr="captions"]',
                      download: '[data-plyr="download"]',
                      fullscreen: '[data-plyr="fullscreen"]',
                      pip: '[data-plyr="pip"]',
                      airplay: '[data-plyr="airplay"]',
                      settings: '[data-plyr="settings"]',
                      loop: '[data-plyr="loop"]'
                  },
                  inputs: {
                      seek: '[data-plyr="seek"]',
                      volume: '[data-plyr="volume"]',
                      speed: '[data-plyr="speed"]',
                      language: '[data-plyr="language"]',
                      quality: '[data-plyr="quality"]'
                  },
                  display: {
                      currentTime: ".plyr__time--current",
                      duration: ".plyr__time--duration",
                      buffer: ".plyr__progress__buffer",
                      loop: ".plyr__progress__loop",
                      volume: ".plyr__volume--display"
                  },
                  progress: ".plyr__progress",
                  captions: ".plyr__captions",
                  caption: ".plyr__caption"
              },
              classNames: {
                  type: "plyr--{0}",
                  provider: "plyr--{0}",
                  video: "plyr__video-wrapper",
                  embed: "plyr__video-embed",
                  videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
                  embedContainer: "plyr__video-embed__container",
                  poster: "plyr__poster",
                  posterEnabled: "plyr__poster-enabled",
                  ads: "plyr__ads",
                  control: "plyr__control",
                  controlPressed: "plyr__control--pressed",
                  playing: "plyr--playing",
                  paused: "plyr--paused",
                  stopped: "plyr--stopped",
                  loading: "plyr--loading",
                  hover: "plyr--hover",
                  tooltip: "plyr__tooltip",
                  cues: "plyr__cues",
                  hidden: "plyr__sr-only",
                  hideControls: "plyr--hide-controls",
                  isIos: "plyr--is-ios",
                  isTouch: "plyr--is-touch",
                  uiSupported: "plyr--full-ui",
                  noTransition: "plyr--no-transition",
                  display: {
                      time: "plyr__time"
                  },
                  menu: {
                      value: "plyr__menu__value",
                      badge: "plyr__badge",
                      open: "plyr--menu-open"
                  },
                  captions: {
                      enabled: "plyr--captions-enabled",
                      active: "plyr--captions-active"
                  },
                  fullscreen: {
                      enabled: "plyr--fullscreen-enabled",
                      fallback: "plyr--fullscreen-fallback"
                  },
                  pip: {
                      supported: "plyr--pip-supported",
                      active: "plyr--pip-active"
                  },
                  airplay: {
                      supported: "plyr--airplay-supported",
                      active: "plyr--airplay-active"
                  },
                  tabFocus: "plyr__tab-focus",
                  previewThumbnails: {
                      thumbContainer: "plyr__preview-thumb",
                      thumbContainerShown: "plyr__preview-thumb--is-shown",
                      imageContainer: "plyr__preview-thumb__image-container",
                      timeContainer: "plyr__preview-thumb__time-container",
                      scrubbingContainer: "plyr__preview-scrubbing",
                      scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
                  }
              },
              attributes: {
                  embed: {
                      provider: "data-plyr-provider",
                      id: "data-plyr-embed-id",
                      hash: "data-plyr-embed-hash"
                  }
              },
              ads: {
                  enabled: !1,
                  publisherId: "",
                  tagUrl: ""
              },
              previewThumbnails: {
                  enabled: !1,
                  src: ""
              },
              vimeo: {
                  byline: !1,
                  portrait: !1,
                  title: !1,
                  speed: !0,
                  transparent: !1,
                  customControls: !0,
                  referrerPolicy: null,
                  premium: !1
              },
              youtube: {
                  rel: 0,
                  showinfo: 0,
                  iv_load_policy: 3,
                  modestbranding: 1,
                  customControls: !0,
                  noCookie: !1
              }
          },
          Xe = "picture-in-picture",
          $ = {
              html5: "html5",
              youtube: "youtube",
              vimeo: "vimeo"
          },
          Ge = () => {};
      class Ke {
          constructor(e = !1) {
              this.enabled = window.console && e, this.enabled && this.log("Debugging enabled")
          }
          get log() {
              return this.enabled ? Function.prototype.bind.call(console.log, console) : Ge
          }
          get warn() {
              return this.enabled ? Function.prototype.bind.call(console.warn, console) : Ge
          }
          get error() {
              return this.enabled ? Function.prototype.bind.call(console.error, console) : Ge
          }
      }
      class P {
          constructor(e) {
              var t, i;
              r(this, "onChange", () => {
                  var e;
                  this.enabled && (e = this.player.elements.buttons.fullscreen, y(e) && (e.pressed = this.active), e = this.target === this.player.media ? this.target : this.player.elements.container, A.call(this.player, e, this.active ? "enterfullscreen" : "exitfullscreen", !0))
              }), r(this, "toggleFallback", (t = !1) => {
                  if (t ? this.scrollPosition = {
                          x: window.scrollX || 0,
                          y: window.scrollY || 0
                      } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = t ? "hidden" : "", C(this.target, this.player.config.classNames.fullscreen.fallback, t), m.isIos) {
                      let e = document.head.querySelector('meta[name="viewport"]');
                      const n = "viewport-fit=cover";
                      e || (e = document.createElement("meta")).setAttribute("name", "viewport");
                      var i = c(e.content) && e.content.includes(n);
                      t ? (this.cleanupViewport = !i, i || (e.content += "," + n)) : this.cleanupViewport && (e.content = e.content.split(",").filter(e => e.trim() !== n).join(","))
                  }
                  this.onChange()
              }), r(this, "trapFocus", e => {
                  var t, i, n;
                  !m.isIos && this.active && "Tab" === e.key && 9 === e.keyCode && (t = document.activeElement, [i] = n = s.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"), t !== (n = n[n.length - 1]) || e.shiftKey ? t === i && e.shiftKey && (n.focus(), e.preventDefault()) : (i.focus(), e.preventDefault()))
              }), r(this, "update", () => {
                  var e;
                  this.enabled ? (e = this.forceFallback ? "Fallback (forced)" : P.native ? "Native" : "Fallback", this.player.debug.log(e + " fullscreen enabled")) : this.player.debug.log("Fullscreen not supported and fallback disabled"), C(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
              }), r(this, "enter", () => {
                  this.enabled && (m.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !P.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? w(this.prefix) || this.target[this.prefix + "Request" + this.property]() : this.target.requestFullscreen({
                      navigationUI: "hide"
                  }))
              }), r(this, "exit", () => {
                  var e;
                  this.enabled && (m.isIos && this.player.config.fullscreen.iosNative ? (this.target.webkitExitFullscreen(), N(this.player.play())) : !P.native || this.forceFallback ? this.toggleFallback(!1) : this.prefix ? w(this.prefix) || (e = "moz" === this.prefix ? "Cancel" : "Exit", document[this.prefix + e + this.property]()) : (document.cancelFullScreen || document.exitFullscreen).call(document))
              }), r(this, "toggle", () => {
                  this.active ? this.exit() : this.enter()
              }), this.player = e, this.prefix = P.prefix, this.property = P.property, this.scrollPosition = {
                  x: 0,
                  y: 0
              }, this.forceFallback = "force" === e.config.fullscreen.fallback, this.player.elements.fullscreen = e.config.fullscreen.container && (t = this.player.elements.container, i = e.config.fullscreen.container, (Element.prototype.closest || function() {
                  let e = this;
                  do {
                      if (T.matches(e, i)) return e
                  } while (null !== (e = e.parentElement || e.parentNode) && 1 === e.nodeType);
                  return null
              }).call(t, i)), M.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : this.prefix + "fullscreenchange", () => {
                  this.onChange()
              }), M.call(this.player, this.player.elements.container, "dblclick", e => {
                  y(this.player.elements.controls) && this.player.elements.controls.contains(e.target) || this.player.listeners.proxy(e, this.toggle, "fullscreen")
              }), M.call(this, this.player.elements.container, "keydown", e => this.trapFocus(e)), this.update()
          }
          static get native() {
              return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
          }
          get usingNative() {
              return P.native && !this.forceFallback
          }
          static get prefix() {
              if (d(document.exitFullscreen)) return "";
              let t = "";
              return ["webkit", "moz", "ms"].some(e => !(!d(document[e + "ExitFullscreen"]) && !d(document[e + "CancelFullScreen"]) || (t = e, 0))), t
          }
          static get property() {
              return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
          }
          get enabled() {
              return (P.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
          }
          get active() {
              var e;
              return !!this.enabled && (!P.native || this.forceFallback ? we(this.target, this.player.config.classNames.fullscreen.fallback) : (e = this.prefix ? this.target.getRootNode()["" + this.prefix + this.property + "Element"] : this.target.getRootNode().fullscreenElement) && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target)
          }
          get target() {
              return m.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container
          }
      }

      function Ze(s, a = 1) {
          return new Promise((e, t) => {
              const i = new Image,
                  n = () => {
                      delete i.onload, delete i.onerror, (i.naturalWidth >= a ? e : t)(i)
                  };
              Object.assign(i, {
                  onload: n,
                  onerror: n,
                  src: s
              })
          })
      }
      const j = {
          addStyleHook() {
              C(this.elements.container, this.config.selectors.container.replace(".", ""), !0), C(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
          },
          toggleNativeControls(e = !1) {
              e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
          },
          build() {
              this.listeners.media(), this.supported.ui ? (y(this.elements.controls) || (I.inject.call(this), this.listeners.controls()), j.toggleNativeControls.call(this), this.isHTML5 && L.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, I.updateVolume.call(this), I.timeUpdate.call(this), I.durationUpdate.call(this), j.checkPlaying.call(this), C(this.elements.container, this.config.classNames.pip.supported, S.pip && this.isHTML5 && this.isVideo), C(this.elements.container, this.config.classNames.airplay.supported, S.airplay && this.isHTML5), C(this.elements.container, this.config.classNames.isIos, m.isIos), C(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(() => {
                  A.call(this, this.media, "ready")
              }, 0), j.setTitle.call(this), this.poster && j.setPoster.call(this, this.poster, !1).catch(() => {}), this.config.duration && I.durationUpdate.call(this)) : (this.debug.warn(`Basic support only for ${this.provider} ` + this.type), j.toggleNativeControls.call(this, !0))
          },
          setTitle() {
              let t = D.get("play", this.config);
              if (c(this.config.title) && !w(this.config.title) && (t += ", " + this.config.title), Array.from(this.elements.buttons.play || []).forEach(e => {
                      e.setAttribute("aria-label", t)
                  }), this.isEmbed) {
                  const t = a.call(this, "iframe");
                  var e, i;
                  y(t) && (e = w(this.config.title) ? "video" : this.config.title, i = D.get("frameTitle", this.config), t.setAttribute("title", i.replace("{title}", e)))
              }
          },
          togglePoster(e) {
              C(this.elements.container, this.config.classNames.posterEnabled, e)
          },
          setPoster(t, e = !0) {
              return e && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", t), this.elements.poster.removeAttribute("hidden"), function() {
                  return new Promise(e => this.ready ? setTimeout(e, 0) : M.call(this, this.elements.container, "ready", e)).then(() => {})
              }.call(this).then(() => Ze(t)).catch(e => {
                  throw t === this.poster && j.togglePoster.call(this, !1), e
              }).then(() => {
                  if (t !== this.poster) throw new Error("setPoster cancelled by later call to setPoster")
              }).then(() => (Object.assign(this.elements.poster.style, {
                  backgroundImage: `url('${t}')`,
                  backgroundSize: ""
              }), j.togglePoster.call(this, !0), t)))
          },
          checkPlaying(e) {
              C(this.elements.container, this.config.classNames.playing, this.playing), C(this.elements.container, this.config.classNames.paused, this.paused), C(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(e => {
                  Object.assign(e, {
                      pressed: this.playing
                  }), e.setAttribute("aria-label", D.get(this.playing ? "pause" : "play", this.config))
              }), h(e) && "timeupdate" === e.type || j.toggleControls.call(this)
          },
          checkLoading(e) {
              this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(() => {
                  C(this.elements.container, this.config.classNames.loading, this.loading), j.toggleControls.call(this)
              }, this.loading ? 250 : 0)
          },
          toggleControls(e) {
              var t, i = this.elements["controls"];
              i && this.config.hideControls && (t = this.touch && this.lastSeekTime + 2e3 > Date.now(), this.toggleControls(Boolean(e || this.loading || this.paused || i.pressed || i.hover || t)))
          },
          migrateStyles() {
              Object.values({ ...this.media.style
              }).filter(e => !w(e) && c(e) && e.startsWith("--plyr")).forEach(e => {
                  this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e)
              }), w(this.media.style) && this.media.removeAttribute("style")
          }
      };
      class Qe {
          constructor(e) {
              r(this, "firstTouch", () => {
                  var e = this["player"],
                      t = e["elements"];
                  e.touch = !0, C(t.container, e.config.classNames.isTouch, !0)
              }), r(this, "setTabFocus", e => {
                  const t = this["player"],
                      i = t["elements"];
                  var n;
                  clearTimeout(this.focusTimer), "keydown" === e.type && 9 !== e.which || ("keydown" === e.type && (this.lastKeyDown = e.timeStamp), n = e.timeStamp - this.lastKeyDown <= 20, "focus" === e.type && !n) || (n = t.config.classNames.tabFocus, C(s.call(t, "." + n), n, !1), "focusout" === e.type) || (this.focusTimer = setTimeout(() => {
                      var e = document.activeElement;
                      i.container.contains(e) && C(document.activeElement, t.config.classNames.tabFocus, !0)
                  }, 10))
              }), r(this, "global", (e = !0) => {
                  var t = this["player"];
                  t.config.keyboard.global && k.call(t, window, "keydown keyup", this.handleKey, e, !1), k.call(t, document.body, "click", this.toggleMenu, e), Te.call(t, document.body, "touchstart", this.firstTouch), k.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0)
              }), r(this, "container", () => {
                  const r = this["player"],
                      {
                          config: e,
                          elements: o,
                          timers: n
                      } = r,
                      i = (!e.keyboard.global && e.keyboard.focused && M.call(r, o.container, "keydown keyup", this.handleKey, !1), M.call(r, o.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", e => {
                          var t = o["controls"];
                          t && "enterfullscreen" === e.type && (t.pressed = !1, t.hover = !1);
                          let i = 0;
                          ["touchstart", "touchmove", "mousemove"].includes(e.type) && (j.toggleControls.call(r, !0), i = r.touch ? 3e3 : 2e3), clearTimeout(n.controls), n.controls = setTimeout(() => j.toggleControls.call(r, !1), i)
                      }), () => {
                          var e, t, i, n, s, a;
                          r.isVimeo && !r.config.vimeo.premium && (e = o.wrapper, a = r.fullscreen["active"], [t, i] = De.call(r), n = Me(`aspect-ratio: ${t} / ` + i), a ? ([a, s] = [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)], a = t / i < a / s, n ? (e.style.width = a ? "auto" : "100%", e.style.height = a ? "100%" : "auto") : (e.style.maxWidth = a ? s / i * t + "px" : null, e.style.margin = a ? "0 auto" : null)) : n ? (e.style.width = null, e.style.height = null) : (e.style.maxWidth = null, e.style.margin = null))
                      }),
                      s = () => {
                          clearTimeout(n.resized), n.resized = setTimeout(i, 50)
                      };
                  M.call(r, o.container, "enterfullscreen exitfullscreen", e => {
                      var t = r.fullscreen["target"];
                      t !== o.container || !r.isEmbed && w(r.config.ratio) || (i(), ("enterfullscreen" === e.type ? M : Ce).call(r, window, "resize", s))
                  })
              }), r(this, "media", () => {
                  const i = this["player"],
                      n = i["elements"];
                  if (M.call(i, i.media, "timeupdate seeking seeked", e => I.timeUpdate.call(i, e)), M.call(i, i.media, "durationchange loadeddata loadedmetadata", e => I.durationUpdate.call(i, e)), M.call(i, i.media, "ended", () => {
                          i.isHTML5 && i.isVideo && i.config.resetOnEnd && (i.restart(), i.pause())
                      }), M.call(i, i.media, "progress playing seeking seeked", e => I.updateProgress.call(i, e)), M.call(i, i.media, "volumechange", e => I.updateVolume.call(i, e)), M.call(i, i.media, "playing play pause ended emptied timeupdate", e => j.checkPlaying.call(i, e)), M.call(i, i.media, "waiting canplay seeked playing", e => j.checkLoading.call(i, e)), i.supported.ui && i.config.clickToPlay && !i.isAudio) {
                      const t = a.call(i, "." + i.config.classNames.video);
                      if (!y(t)) return;
                      M.call(i, n.container, "click", e => {
                          ![n.container, t].includes(e.target) && !t.contains(e.target) || i.touch && i.config.hideControls || (i.ended ? (this.proxy(e, i.restart, "restart"), this.proxy(e, () => {
                              N(i.play())
                          }, "play")) : this.proxy(e, () => {
                              N(i.togglePlay())
                          }, "play"))
                      })
                  }
                  i.supported.ui && i.config.disableContextMenu && M.call(i, n.wrapper, "contextmenu", e => {
                      e.preventDefault()
                  }, !1), M.call(i, i.media, "volumechange", () => {
                      i.storage.set({
                          volume: i.volume,
                          muted: i.muted
                      })
                  }), M.call(i, i.media, "ratechange", () => {
                      I.updateSetting.call(i, "speed"), i.storage.set({
                          speed: i.speed
                      })
                  }), M.call(i, i.media, "qualitychange", e => {
                      I.updateSetting.call(i, "quality", null, e.detail.quality)
                  }), M.call(i, i.media, "ready qualitychange", () => {
                      I.setDownloadUrl.call(i)
                  });
                  const t = i.config.events.concat(["keyup", "keydown"]).join(" ");
                  M.call(i, i.media, t, e => {
                      let {
                          detail: t = {}
                      } = e;
                      "error" === e.type && (t = i.media.error), A.call(i, n.container, e.type, !0, t)
                  })
              }), r(this, "proxy", (e, t, i) => {
                  var n = this["player"],
                      i = n.config.listeners[i];
                  let s = !0;
                  !1 !== (s = d(i) ? i.call(n, e) : s) && d(t) && t.call(n, e)
              }), r(this, "bind", (e, t, i, n, s = !0) => {
                  var a = this["player"],
                      r = a.config.listeners[n],
                      r = d(r);
                  M.call(a, e, t, e => this.proxy(e, i, n), s && !r)
              }), r(this, "controls", () => {
                  const r = this["player"],
                      n = r["elements"],
                      t = m.isIE ? "change" : "input";
                  if (n.buttons.play && Array.from(n.buttons.play).forEach(e => {
                          this.bind(e, "click", () => {
                              N(r.togglePlay())
                          }, "play")
                      }), this.bind(n.buttons.restart, "click", r.restart, "restart"), this.bind(n.buttons.rewind, "click", () => {
                          r.lastSeekTime = Date.now(), r.rewind()
                      }, "rewind"), this.bind(n.buttons.fastForward, "click", () => {
                          r.lastSeekTime = Date.now(), r.forward()
                      }, "fastForward"), this.bind(n.buttons.mute, "click", () => {
                          r.muted = !r.muted
                      }, "mute"), this.bind(n.buttons.captions, "click", () => r.toggleCaptions()), this.bind(n.buttons.download, "click", () => {
                          A.call(r, r.media, "download")
                      }, "download"), this.bind(n.buttons.fullscreen, "click", () => {
                          r.fullscreen.toggle()
                      }, "fullscreen"), this.bind(n.buttons.pip, "click", () => {
                          r.pip = "toggle"
                      }, "pip"), this.bind(n.buttons.airplay, "click", r.airplay, "airplay"), this.bind(n.buttons.settings, "click", e => {
                          e.stopPropagation(), e.preventDefault(), I.toggleMenu.call(r, e)
                      }, null, !1), this.bind(n.buttons.settings, "keyup", e => {
                          var t = e.which;
                          [13, 32].includes(t) && (13 !== t ? (e.preventDefault(), e.stopPropagation(), I.toggleMenu.call(r, e)) : I.focusFirstMenuItem.call(r, null, !0))
                      }, null, !1), this.bind(n.settings.menu, "keydown", e => {
                          27 === e.which && I.toggleMenu.call(r, e)
                      }), this.bind(n.inputs.seek, "mousedown mousemove", e => {
                          var t = n.progress.getBoundingClientRect(),
                              t = 100 / t.width * (e.pageX - t.left);
                          e.currentTarget.setAttribute("seek-value", t)
                      }), this.bind(n.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", e => {
                          var t = e.currentTarget,
                              i = e.keyCode || e.which,
                              n = "play-on-seeked";
                          p(e) && 39 !== i && 37 !== i || (r.lastSeekTime = Date.now(), i = t.hasAttribute(n), e = ["mouseup", "touchend", "keyup"].includes(e.type), i && e ? (t.removeAttribute(n), N(r.play())) : !e && r.playing && (t.setAttribute(n, ""), r.pause()))
                      }), m.isIos) {
                      const n = s.call(r, 'input[type="range"]');
                      Array.from(n).forEach(e => this.bind(e, t, e => pe(e.target)))
                  }
                  this.bind(n.inputs.seek, t, e => {
                      e = e.currentTarget;
                      let t = e.getAttribute("seek-value");
                      w(t) && (t = e.value), e.removeAttribute("seek-value"), r.currentTime = t / e.max * r.duration
                  }, "seek"), this.bind(n.progress, "mouseenter mouseleave mousemove", e => I.updateSeekTooltip.call(r, e)), this.bind(n.progress, "mousemove touchmove", e => {
                      var t = r["previewThumbnails"];
                      t && t.loaded && t.startMove(e)
                  }), this.bind(n.progress, "mouseleave touchend click", () => {
                      var e = r["previewThumbnails"];
                      e && e.loaded && e.endMove(!1, !0)
                  }), this.bind(n.progress, "mousedown touchstart", e => {
                      var t = r["previewThumbnails"];
                      t && t.loaded && t.startScrubbing(e)
                  }), this.bind(n.progress, "mouseup touchend", e => {
                      var t = r["previewThumbnails"];
                      t && t.loaded && t.endScrubbing(e)
                  }), m.isWebkit && Array.from(s.call(r, 'input[type="range"]')).forEach(e => {
                      this.bind(e, "input", e => I.updateRangeFill.call(r, e.target))
                  }), r.config.toggleInvert && !y(n.display.duration) && this.bind(n.display.currentTime, "click", () => {
                      0 !== r.currentTime && (r.config.invertTime = !r.config.invertTime, I.timeUpdate.call(r))
                  }), this.bind(n.inputs.volume, t, e => {
                      r.volume = e.target.value
                  }, "volume"), this.bind(n.controls, "mouseenter mouseleave", e => {
                      n.controls.hover = !r.touch && "mouseenter" === e.type
                  }), n.fullscreen && Array.from(n.fullscreen.children).filter(e => !e.contains(n.container)).forEach(e => {
                      this.bind(e, "mouseenter mouseleave", e => {
                          n.controls && (n.controls.hover = !r.touch && "mouseenter" === e.type)
                      })
                  }), this.bind(n.controls, "mousedown mouseup touchstart touchend touchcancel", e => {
                      n.controls.pressed = ["mousedown", "touchstart"].includes(e.type)
                  }), this.bind(n.controls, "focusin", () => {
                      const {
                          config: e,
                          timers: t
                      } = r;
                      C(n.controls, e.classNames.noTransition, !0), j.toggleControls.call(r, !0), setTimeout(() => {
                          C(n.controls, e.classNames.noTransition, !1)
                      }, 0);
                      var i = this.touch ? 3e3 : 4e3;
                      clearTimeout(t.controls), t.controls = setTimeout(() => j.toggleControls.call(r, !1), i)
                  }), this.bind(n.inputs.volume, "wheel", e => {
                      const t = e.webkitDirectionInvertedFromDevice,
                          [i, n] = [e.deltaX, -e.deltaY].map(e => t ? -e : e),
                          s = Math.sign(Math.abs(i) > Math.abs(n) ? i : n);
                      r.increaseVolume(s / 50);
                      var a = r.media["volume"];
                      (1 === s && a < 1 || -1 === s && 0 < a) && e.preventDefault()
                  }, "volume", !1)
              }), this.player = e, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
          }
          handleKey(e) {
              const t = this["player"],
                  i = t["elements"],
                  n = e.keyCode || e.which,
                  s = "keydown" === e.type,
                  a = s && n === this.lastKey;
              if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && b(n))
                  if (s) {
                      const s = document.activeElement;
                      if (y(s)) {
                          const n = t.config.selectors["editable"],
                              a = i.inputs["seek"];
                          if (s !== a && T(s, n)) return;
                          if (32 === e.which && T(s, 'button, [role^="menuitem"]')) return
                      }
                      switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(n) && (e.preventDefault(), e.stopPropagation()), n) {
                          case 48:
                          case 49:
                          case 50:
                          case 51:
                          case 52:
                          case 53:
                          case 54:
                          case 55:
                          case 56:
                          case 57:
                              a || (t.currentTime = t.duration / 10 * (n - 48));
                              break;
                          case 32:
                          case 75:
                              a || N(t.togglePlay());
                              break;
                          case 38:
                              t.increaseVolume(.1);
                              break;
                          case 40:
                              t.decreaseVolume(.1);
                              break;
                          case 77:
                              a || (t.muted = !t.muted);
                              break;
                          case 39:
                              t.forward();
                              break;
                          case 37:
                              t.rewind();
                              break;
                          case 70:
                              t.fullscreen.toggle();
                              break;
                          case 67:
                              a || t.toggleCaptions();
                              break;
                          case 76:
                              t.loop = !t.loop
                      }
                      27 === n && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = n
                  } else this.lastKey = null
          }
          toggleMenu(e) {
              I.toggleMenu.call(this.player, e)
          }
      }
      var Je, et = function() {
          var p = function() {},
              r = {},
              d = {},
              u = {};

          function o(e, t) {
              if (e) {
                  var i = u[e];
                  if (d[e] = t, i)
                      for (; i.length;) i[0](e, t), i.splice(0, 1)
              }
          }

          function h(e, t) {
              e.call && (e = {
                  success: e
              }), t.length ? (e.error || p)(t) : (e.success || p)(e)
          }

          function l(e, n, t) {
              for (var s = (e = e.push ? e : [e]).length, i = s, a = [], r = function(e, t, i) {
                      if ("e" == t && a.push(e), "b" == t) {
                          if (!i) return;
                          a.push(e)
                      }--s || n(a)
                  }, o = 0; o < i; o++) ! function i(n, s, a, r) {
                  var o, l, e = document,
                      t = a.async,
                      c = (a.numRetries || 0) + 1,
                      d = a.before || p,
                      u = n.replace(/[\?|#].*$/, ""),
                      h = n.replace(/^(css|img)!/, "");
                  r = r || 0, /(^css!|\.css$)/.test(u) ? ((l = e.createElement("link")).rel = "stylesheet", l.href = h, (o = "hideFocus" in l) && l.relList && (o = 0, l.rel = "preload", l.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(u) ? (l = e.createElement("img")).src = h : ((l = e.createElement("script")).src = n, l.async = void 0 === t || t), l.onload = l.onerror = l.onbeforeload = function(e) {
                      var t = e.type[0];
                      if (o) try {
                          l.sheet.cssText.length || (t = "e")
                      } catch (e) {
                          18 != e.code && (t = "e")
                      }
                      if ("e" == t) {
                          if ((r += 1) < c) return i(n, s, a, r)
                      } else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";
                      s(n, t, e.defaultPrevented)
                  }, !1 !== d(n, l) && e.head.appendChild(l)
              }(e[o], r, t)
          }

          function m(e, t, i) {
              var n, s;
              if (t && t.trim && (n = t), s = (n ? i : t) || {}, n) {
                  if (n in r) throw "LoadJS";
                  r[n] = !0
              }

              function a(t, i) {
                  l(e, function(e) {
                      h(s, e), t && h({
                          success: t,
                          error: i
                      }, e), o(n, e)
                  }, s)
              }
              if (s.returnPromise) return new Promise(a);
              a()
          }
          return m.ready = function(e, t) {
              var i = e,
                  n = function(e) {
                      h(t, e)
                  };
              i = i.push ? i : [i];
              for (var s, a, r = [], o = i.length, l = o, c = function(e, t) {
                      t.length && r.push(e), --l || n(r)
                  }; o--;) s = i[o], (a = d[s]) ? c(s, a) : (u[s] = u[s] || []).push(c);
              return m
          }, m.done = function(e) {
              o(e, [])
          }, m.reset = function() {
              r = {}, d = {}, u = {}
          }, m.isDefined = function(e) {
              return e in r
          }, m
      }();

      function tt(i) {
          return new Promise((e, t) => {
              et(i, {
                  success: e,
                  error: t
              })
          })
      }

      function it(e) {
          e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, A.call(this, this.media, e ? "play" : "pause"))
      }
      const nt = {
          setup() {
              const t = this;
              C(t.elements.wrapper, t.config.classNames.embed, !0), t.options.speed = t.config.speed.options, Ie.call(t), n(window.Vimeo) ? nt.ready.call(t) : tt(t.config.urls.vimeo.sdk).then(() => {
                  nt.ready.call(t)
              }).catch(e => {
                  t.debug.warn("Vimeo SDK (player.js) failed to load", e)
              })
          },
          ready() {
              const r = this,
                  e = r.config.vimeo,
                  {
                      premium: t,
                      referrerPolicy: i,
                      ...n
                  } = e;
              let s = r.media.getAttribute("src"),
                  a = "";
              var o = (a = w(s) ? (s = r.media.getAttribute(r.config.attributes.embed.id), r.media.getAttribute(r.config.attributes.embed.hash)) : (o = s.match(/^.*(?:vimeo.com\/|video\/)(?:\d+)(?:\?.*&*h=|\/)+(?<hash>[\d,a-f]+)/)) ? o.groups.hash : null) ? {
                      h: a
                  } : {},
                  l = (t && Object.assign(n, {
                      controls: !1,
                      sidedock: !1
                  }), Ue({
                      loop: r.config.loop.active,
                      autoplay: r.autoplay,
                      muted: r.muted,
                      gesture: "media",
                      playsinline: !this.config.fullscreen.iosNative,
                      ...o,
                      ...n
                  })),
                  c = w(c = s) ? null : !b(Number(c)) && c.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : c,
                  d = _("iframe"),
                  c = $e(r.config.urls.vimeo.iframe, c, l);
              if (d.setAttribute("src", c), d.setAttribute("allowfullscreen", ""), d.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), w(i) || d.setAttribute("referrerPolicy", i), t || !e.customControls) d.setAttribute("data-poster", r.poster), r.media = ye(d, r.media);
              else {
                  const e = _("div", {
                      class: r.config.classNames.embedContainer,
                      "data-poster": r.poster
                  });
                  e.appendChild(d), r.media = ye(e, r.media)
              }
              e.customControls || Fe($e(r.config.urls.vimeo.api, c)).then(e => {
                  !w(e) && e.thumbnail_url && j.setPoster.call(r, e.thumbnail_url).catch(() => {})
              }), r.embed = new window.Vimeo.Player(d, {
                  autopause: r.config.autopause,
                  muted: r.muted
              }), r.media.paused = !0, r.media.currentTime = 0, r.supported.ui && r.embed.disableTextTrack(), r.media.play = () => (it.call(r, !0), r.embed.play()), r.media.pause = () => (it.call(r, !1), r.embed.pause()), r.media.stop = () => {
                  r.pause(), r.currentTime = 0
              };
              let u = r.media["currentTime"],
                  h = (Object.defineProperty(r.media, "currentTime", {
                      get: () => u,
                      set(e) {
                          const {
                              embed: t,
                              media: i,
                              paused: n,
                              volume: s
                          } = r, a = n && !t.hasPlayed;
                          i.seeking = !0, A.call(r, i, "seeking"), Promise.resolve(a && t.setVolume(0)).then(() => t.setCurrentTime(e)).then(() => a && t.pause()).then(() => a && t.setVolume(s)).catch(() => {})
                      }
                  }), r.config.speed.selected),
                  p = (Object.defineProperty(r.media, "playbackRate", {
                      get: () => h,
                      set(e) {
                          r.embed.setPlaybackRate(e).then(() => {
                              h = e, A.call(r, r.media, "ratechange")
                          }).catch(() => {
                              r.options.speed = [1]
                          })
                      }
                  }), r.config)["volume"],
                  m = (Object.defineProperty(r.media, "volume", {
                      get: () => p,
                      set(e) {
                          r.embed.setVolume(e).then(() => {
                              p = e, A.call(r, r.media, "volumechange")
                          })
                      }
                  }), r.config)["muted"];
              Object.defineProperty(r.media, "muted", {
                  get: () => m,
                  set(e) {
                      const t = !!v(e) && e;
                      r.embed.setVolume(t ? 0 : r.config.volume).then(() => {
                          m = t, A.call(r, r.media, "volumechange")
                      })
                  }
              });
              let g, f = r.config["loop"];
              Object.defineProperty(r.media, "loop", {
                  get: () => f,
                  set(e) {
                      const t = v(e) ? e : r.config.loop.active;
                      r.embed.setLoop(t).then(() => {
                          f = t
                      })
                  }
              }), r.embed.getVideoUrl().then(e => {
                  g = e, I.setDownloadUrl.call(r)
              }).catch(e => {
                  this.debug.warn(e)
              }), Object.defineProperty(r.media, "currentSrc", {
                  get: () => g
              }), Object.defineProperty(r.media, "ended", {
                  get: () => r.currentTime === r.duration
              }), Promise.all([r.embed.getVideoWidth(), r.embed.getVideoHeight()]).then(e => {
                  var [e, t] = e;
                  r.embed.ratio = Le(e, t), Ie.call(this)
              }), r.embed.setAutopause(r.config.autopause).then(e => {
                  r.config.autopause = e
              }), r.embed.getVideoTitle().then(e => {
                  r.config.title = e, j.setTitle.call(this)
              }), r.embed.getCurrentTime().then(e => {
                  u = e, A.call(r, r.media, "timeupdate")
              }), r.embed.getDuration().then(e => {
                  r.media.duration = e, A.call(r, r.media, "durationchange")
              }), r.embed.getTextTracks().then(e => {
                  r.media.textTracks = e, L.setup.call(r)
              }), r.embed.on("cuechange", ({
                  cues: e = []
              }) => {
                  e = e.map(e => {
                      return e = e.text, t = document.createDocumentFragment(), i = document.createElement("div"), t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
                      var t, i
                  });
                  L.updateCues.call(r, e)
              }), r.embed.on("loaded", () => {
                  r.embed.getPaused().then(e => {
                      it.call(r, !e), e || A.call(r, r.media, "playing")
                  }), y(r.embed.element) && r.supported.ui && r.embed.element.setAttribute("tabindex", -1)
              }), r.embed.on("bufferstart", () => {
                  A.call(r, r.media, "waiting")
              }), r.embed.on("bufferend", () => {
                  A.call(r, r.media, "playing")
              }), r.embed.on("play", () => {
                  it.call(r, !0), A.call(r, r.media, "playing")
              }), r.embed.on("pause", () => {
                  it.call(r, !1)
              }), r.embed.on("timeupdate", e => {
                  r.media.seeking = !1, u = e.seconds, A.call(r, r.media, "timeupdate")
              }), r.embed.on("progress", e => {
                  r.media.buffered = e.percent, A.call(r, r.media, "progress"), 1 === parseInt(e.percent, 10) && A.call(r, r.media, "canplaythrough"), r.embed.getDuration().then(e => {
                      e !== r.media.duration && (r.media.duration = e, A.call(r, r.media, "durationchange"))
                  })
              }), r.embed.on("seeked", () => {
                  r.media.seeking = !1, A.call(r, r.media, "seeked")
              }), r.embed.on("ended", () => {
                  r.media.paused = !0, A.call(r, r.media, "ended")
              }), r.embed.on("error", e => {
                  r.media.error = e, A.call(r, r.media, "error")
              }), e.customControls && setTimeout(() => j.build.call(r), 0)
          }
      };

      function st(e) {
          e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, A.call(this, this.media, e ? "play" : "pause"))
      }
      const at = {
              setup() {
                  if (C(this.elements.wrapper, this.config.classNames.embed, !0), n(window.YT) && d(window.YT.Player)) at.ready.call(this);
                  else {
                      const e = window.onYouTubeIframeAPIReady;
                      window.onYouTubeIframeAPIReady = () => {
                          d(e) && e(), at.ready.call(this)
                      }, tt(this.config.urls.youtube.sdk).catch(e => {
                          this.debug.warn("YouTube API failed to load", e)
                      })
                  }
              },
              getTitle(e) {
                  Fe($e(this.config.urls.youtube.api, e)).then(e => {
                      var t, i;
                      n(e) && ({
                          title: e,
                          height: t,
                          width: i
                      } = e, this.config.title = e, j.setTitle.call(this), this.embed.ratio = Le(i, t)), Ie.call(this)
                  }).catch(() => {
                      Ie.call(this)
                  })
              },
              ready() {
                  const s = this,
                      a = s.config.youtube,
                      e = s.media && s.media.getAttribute("id");
                  if (w(e) || !e.startsWith("youtube-")) {
                      let e = s.media.getAttribute("src");
                      w(e) && (e = s.media.getAttribute(this.config.attributes.embed.id));
                      const r = w(t = e) ? null : t.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : t;
                      var t = _("div", {
                          id: s.provider + "-" + Math.floor(1e4 * Math.random()),
                          "data-poster": a.customControls ? s.poster : void 0
                      });
                      if (s.media = ye(t, s.media), a.customControls) {
                          const a = e => `https://i.ytimg.com/vi/${r}/${e}default.jpg`;
                          Ze(a("maxres"), 121).catch(() => Ze(a("sd"), 121)).catch(() => Ze(a("hq"))).then(e => j.setPoster.call(s, e.src)).then(e => {
                              e.includes("maxres") || (s.elements.poster.style.backgroundSize = "cover")
                          }).catch(() => {})
                      }
                      s.embed = new window.YT.Player(s.media, {
                          videoId: r,
                          host: a.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0,
                          playerVars: g({}, {
                              autoplay: s.config.autoplay ? 1 : 0,
                              hl: s.config.hl,
                              controls: s.supported.ui && a.customControls ? 0 : 1,
                              disablekb: 1,
                              playsinline: s.config.fullscreen.iosNative ? 0 : 1,
                              cc_load_policy: s.captions.active ? 1 : 0,
                              cc_lang_pref: s.config.captions.language,
                              widget_referrer: window ? window.location.href : null
                          }, a),
                          events: {
                              onError(e) {
                                  var t;
                                  s.media.error || (t = {
                                      2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                      5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                      100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                      101: "The owner of the requested video does not allow it to be played in embedded players.",
                                      150: "The owner of the requested video does not allow it to be played in embedded players."
                                  }[e = e.data] || "An unknown error occured", s.media.error = {
                                      code: e,
                                      message: t
                                  }, A.call(s, s.media, "error"))
                              },
                              onPlaybackRateChange(e) {
                                  e = e.target;
                                  s.media.playbackRate = e.getPlaybackRate(), A.call(s, s.media, "ratechange")
                              },
                              onReady(e) {
                                  if (!d(s.media.play)) {
                                      const n = e.target;
                                      at.getTitle.call(s, r), s.media.play = () => {
                                          st.call(s, !0), n.playVideo()
                                      }, s.media.pause = () => {
                                          st.call(s, !1), n.pauseVideo()
                                      }, s.media.stop = () => {
                                          n.stopVideo()
                                      }, s.media.duration = n.getDuration(), s.media.paused = !0, s.media.currentTime = 0, Object.defineProperty(s.media, "currentTime", {
                                          get: () => Number(n.getCurrentTime()),
                                          set(e) {
                                              s.paused && !s.embed.hasPlayed && s.embed.mute(), s.media.seeking = !0, A.call(s, s.media, "seeking"), n.seekTo(e)
                                          }
                                      }), Object.defineProperty(s.media, "playbackRate", {
                                          get: () => n.getPlaybackRate(),
                                          set(e) {
                                              n.setPlaybackRate(e)
                                          }
                                      });
                                      let t = s.config["volume"],
                                          i = (Object.defineProperty(s.media, "volume", {
                                              get: () => t,
                                              set(e) {
                                                  t = e, n.setVolume(100 * t), A.call(s, s.media, "volumechange")
                                              }
                                          }), s.config)["muted"];
                                      Object.defineProperty(s.media, "muted", {
                                          get: () => i,
                                          set(e) {
                                              e = v(e) ? e : i;
                                              i = e, n[e ? "mute" : "unMute"](), n.setVolume(100 * t), A.call(s, s.media, "volumechange")
                                          }
                                      }), Object.defineProperty(s.media, "currentSrc", {
                                          get: () => n.getVideoUrl()
                                      }), Object.defineProperty(s.media, "ended", {
                                          get: () => s.currentTime === s.duration
                                      });
                                      e = n.getAvailablePlaybackRates();
                                      s.options.speed = e.filter(e => s.config.speed.options.includes(e)), s.supported.ui && a.customControls && s.media.setAttribute("tabindex", -1), A.call(s, s.media, "timeupdate"), A.call(s, s.media, "durationchange"), clearInterval(s.timers.buffering), s.timers.buffering = setInterval(() => {
                                          s.media.buffered = n.getVideoLoadedFraction(), (null === s.media.lastBuffered || s.media.lastBuffered < s.media.buffered) && A.call(s, s.media, "progress"), s.media.lastBuffered = s.media.buffered, 1 === s.media.buffered && (clearInterval(s.timers.buffering), A.call(s, s.media, "canplaythrough"))
                                      }, 200), a.customControls && setTimeout(() => j.build.call(s), 50)
                                  }
                              },
                              onStateChange(e) {
                                  var t = e.target;
                                  switch (clearInterval(s.timers.playing), s.media.seeking && [1, 2].includes(e.data) && (s.media.seeking = !1, A.call(s, s.media, "seeked")), e.data) {
                                      case -1:
                                          A.call(s, s.media, "timeupdate"), s.media.buffered = t.getVideoLoadedFraction(), A.call(s, s.media, "progress");
                                          break;
                                      case 0:
                                          st.call(s, !1), s.media.loop ? (t.stopVideo(), t.playVideo()) : A.call(s, s.media, "ended");
                                          break;
                                      case 1:
                                          a.customControls && !s.config.autoplay && s.media.paused && !s.embed.hasPlayed ? s.media.pause() : (st.call(s, !0), A.call(s, s.media, "playing"), s.timers.playing = setInterval(() => {
                                              A.call(s, s.media, "timeupdate")
                                          }, 50), s.media.duration !== t.getDuration() && (s.media.duration = t.getDuration(), A.call(s, s.media, "durationchange")));
                                          break;
                                      case 2:
                                          s.muted || s.embed.unMute(), st.call(s, !1);
                                          break;
                                      case 3:
                                          A.call(s, s.media, "waiting")
                                  }
                                  A.call(s, s.elements.container, "statechange", !1, {
                                      code: e.data
                                  })
                              }
                          }
                      })
                  }
              }
          },
          rt = {
              setup() {
                  this.media ? (C(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), C(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && C(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = _("div", {
                      class: this.config.classNames.video
                  }), ge(this.media, this.elements.wrapper), this.elements.poster = _("div", {
                      class: this.config.classNames.poster
                  }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? O.setup.call(this) : this.isYouTube ? at.setup.call(this) : this.isVimeo && nt.setup.call(this)) : this.debug.warn("No media element found!")
              }
          };
      class ot {
          constructor(e) {
              r(this, "load", () => {
                  this.enabled && (n(window.google) && n(window.google.ima) ? this.ready() : tt(this.player.config.urls.googleIMA.sdk).then(() => {
                      this.ready()
                  }).catch(() => {
                      this.trigger("error", new Error("Google IMA SDK failed to load"))
                  }))
              }), r(this, "ready", () => {
                  this.enabled || (this.manager && this.manager.destroy(), this.elements.displayContainer && this.elements.displayContainer.destroy(), this.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(() => {
                      this.clearSafetyTimer("onAdsManagerLoaded()")
                  }), this.listeners(), this.setupIMA()
              }), r(this, "setupIMA", () => {
                  this.elements.container = _("div", {
                      class: this.player.config.classNames.ads
                  }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, e => this.onAdsManagerLoaded(e), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e), !1), this.requestAds()
              }), r(this, "requestAds", () => {
                  var e = this.player.elements["container"];
                  try {
                      var t = new google.ima.AdsRequest;
                      t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t)
                  } catch (e) {
                      this.onAdError(e)
                  }
              }), r(this, "pollCountdown", (e = !1) => {
                  e ? this.countdownTimer = setInterval(() => {
                      var e = Ye(Math.max(this.manager.getRemainingTime(), 0)),
                          e = D.get("advertisement", this.player.config) + " - " + e;
                      this.elements.container.setAttribute("data-badge-text", e)
                  }, 100) : (clearInterval(this.countdownTimer), this.elements.container.removeAttribute("data-badge-text"))
              }), r(this, "onAdsManagerLoaded", e => {
                  var t;
                  this.enabled && ((t = new google.ima.AdsRenderingSettings).restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e)), Object.keys(google.ima.AdEvent.Type).forEach(e => {
                      this.manager.addEventListener(google.ima.AdEvent.Type[e], e => this.onAdEvent(e))
                  }), this.trigger("loaded"))
              }), r(this, "addCuePoints", () => {
                  w(this.cuePoints) || this.cuePoints.forEach(e => {
                      var t, i;
                      0 !== e && -1 !== e && e < this.player.duration && (t = this.player.elements.progress, y(t)) && (e = 100 / this.player.duration * e, (i = _("span", {
                          class: this.player.config.classNames.cues
                      })).style.left = e.toString() + "%", t.appendChild(i))
                  })
              }), r(this, "onAdEvent", e => {
                  var t, i = this.player.elements["container"],
                      n = e.getAd(),
                      s = e.getAdData();
                  switch (t = e.type, A.call(this.player, this.player.media, "ads" + t.replace(/_/g, "").toLowerCase()), e.type) {
                      case google.ima.AdEvent.Type.LOADED:
                          this.trigger("loaded"), this.pollCountdown(!0), n.isLinear() || (n.width = i.offsetWidth, n.height = i.offsetHeight);
                          break;
                      case google.ima.AdEvent.Type.STARTED:
                          this.manager.setVolume(this.player.volume);
                          break;
                      case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                          this.player.ended ? this.loadAds() : this.loader.contentComplete();
                          break;
                      case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                          this.pauseContent();
                          break;
                      case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                          this.pollCountdown(), this.resumeContent();
                          break;
                      case google.ima.AdEvent.Type.LOG:
                          s.adError && this.player.debug.warn("Non-fatal ad error: " + s.adError.getMessage())
                  }
              }), r(this, "onAdError", e => {
                  this.cancel(), this.player.debug.warn("Ads error", e)
              }), r(this, "listeners", () => {
                  const e = this.player.elements["container"];
                  let n;
                  this.player.on("canplay", () => {
                      this.addCuePoints()
                  }), this.player.on("ended", () => {
                      this.loader.contentComplete()
                  }), this.player.on("timeupdate", () => {
                      n = this.player.currentTime
                  }), this.player.on("seeked", () => {
                      const i = this.player.currentTime;
                      w(this.cuePoints) || this.cuePoints.forEach((e, t) => {
                          n < e && e < i && (this.manager.discardAdBreak(), this.cuePoints.splice(t, 1))
                      })
                  }), window.addEventListener("resize", () => {
                      this.manager && this.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL)
                  })
              }), r(this, "play", () => {
                  const e = this.player.elements["container"];
                  this.managerPromise || this.resumeContent(), this.managerPromise.then(() => {
                      this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();
                      try {
                          this.initialized || (this.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = !0
                      } catch (e) {
                          this.onAdError(e)
                      }
                  }).catch(() => {})
              }), r(this, "resumeContent", () => {
                  this.elements.container.style.zIndex = "", this.playing = !1, N(this.player.media.play())
              }), r(this, "pauseContent", () => {
                  this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause()
              }), r(this, "cancel", () => {
                  this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
              }), r(this, "loadAds", () => {
                  this.managerPromise.then(() => {
                      this.manager && this.manager.destroy(), this.managerPromise = new Promise(e => {
                          this.on("loaded", e), this.player.debug.log(this.manager)
                      }), this.initialized = !1, this.requestAds()
                  }).catch(() => {})
              }), r(this, "trigger", (e, ...t) => {
                  e = this.events[e];
                  u(e) && e.forEach(e => {
                      d(e) && e.apply(this, t)
                  })
              }), r(this, "on", (e, t) => (u(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this)), r(this, "startSafetyTimer", (e, t) => {
                  this.player.debug.log("Safety timer invoked from: " + t), this.safetyTimer = setTimeout(() => {
                      this.cancel(), this.clearSafetyTimer("startSafetyTimer()")
                  }, e)
              }), r(this, "clearSafetyTimer", e => {
                  l(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: " + e), clearTimeout(this.safetyTimer), this.safetyTimer = null)
              }), this.player = e, this.config = e.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
                  container: null,
                  displayContainer: null
              }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((e, t) => {
                  this.on("loaded", e), this.on("error", t)
              }), this.load()
          }
          get enabled() {
              var e = this["config"];
              return this.player.isHTML5 && this.player.isVideo && e.enabled && (!w(e.publisherId) || ue(e.tagUrl))
          }
          get tagUrl() {
              var e = this["config"];
              return ue(e.tagUrl) ? e.tagUrl : "https://go.aniview.com/api/adserver6/vast/?" + Ue({
                  AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                  AV_CHANNELID: "5a0458dc28a06145e4519d21",
                  AV_URL: window.location.hostname,
                  cb: Date.now(),
                  AV_WIDTH: 640,
                  AV_HEIGHT: 480,
                  AV_CDIM2: e.publisherId
              })
          }
      }
      const lt = (e, t) => {
          var i = {};
          return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i
      };
      class ct {
          constructor(e) {
              r(this, "load", () => {
                  this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(() => {
                      this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = !0)
                  })
              }), r(this, "getThumbnails", () => new Promise(e => {
                  var t = this.player.config.previewThumbnails["src"];
                  if (w(t)) throw new Error("Missing previewThumbnails.src config attribute");
                  const i = () => {
                      this.thumbnails.sort((e, t) => e.height - t.height), this.player.debug.log("Preview thumbnails", this.thumbnails), e()
                  };
                  if (d(t)) t(e => {
                      this.thumbnails = e, i()
                  });
                  else {
                      const e = (c(t) ? [t] : t).map(e => this.getThumbnail(e));
                      Promise.all(e).then(i)
                  }
              })), r(this, "getThumbnail", s => new Promise(n => {
                  Fe(s).then(e => {
                      const t = {
                              frames: (e => {
                                  const t = [];
                                  return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(e => {
                                      const i = {};
                                      e.split(/\r\n|\n|\r/).forEach(e => {
                                          var t;
                                          b(i.startTime) ? !w(e.trim()) && w(i.text) && (t = e.trim().split("#xywh="), [i.text] = t, t[1]) && ([i.x, i.y, i.w, i.h] = t[1].split(",")) : (t = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/)) && (i.startTime = 60 * Number(t[1] || 0) * 60 + 60 * Number(t[2]) + Number(t[3]) + Number("0." + t[4]), i.endTime = 60 * Number(t[6] || 0) * 60 + 60 * Number(t[7]) + Number(t[8]) + Number("0." + t[9]))
                                      }), i.text && t.push(i)
                                  }), t
                              })(e),
                              height: null,
                              urlPrefix: ""
                          },
                          i = (t.frames[0].text.startsWith("/") || t.frames[0].text.startsWith("http://") || t.frames[0].text.startsWith("https://") || (t.urlPrefix = s.substring(0, s.lastIndexOf("/") + 1)), new Image);
                      i.onload = () => {
                          t.height = i.naturalHeight, t.width = i.naturalWidth, this.thumbnails.push(t), n()
                      }, i.src = t.urlPrefix + t.frames[0].text
                  })
              })), r(this, "startMove", e => {
                  var t;
                  this.loaded && h(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration && ("touchmove" === e.type ? this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100) : (t = 100 / (t = this.player.elements.progress.getBoundingClientRect()).width * (e.pageX - t.left), this.seekTime = this.player.media.duration * (t / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Ye(this.seekTime)), this.showImageAtCurrentTime())
              }), r(this, "endMove", () => {
                  this.toggleThumbContainer(!1, !0)
              }), r(this, "startScrubbing", e => {
                  (l(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration) && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime())
              }), r(this, "endScrubbing", () => {
                  this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : Te.call(this.player, this.player.media, "timeupdate", () => {
                      this.mouseDown || this.toggleScrubbingContainer(!1)
                  })
              }), r(this, "listeners", () => {
                  this.player.on("play", () => {
                      this.toggleThumbContainer(!1, !0)
                  }), this.player.on("seeked", () => {
                      this.toggleThumbContainer(!1)
                  }), this.player.on("timeupdate", () => {
                      this.lastTime = this.player.media.currentTime
                  })
              }), r(this, "render", () => {
                  this.elements.thumb.container = _("div", {
                      class: this.player.config.classNames.previewThumbnails.thumbContainer
                  }), this.elements.thumb.imageContainer = _("div", {
                      class: this.player.config.classNames.previewThumbnails.imageContainer
                  }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                  var e = _("div", {
                      class: this.player.config.classNames.previewThumbnails.timeContainer
                  });
                  this.elements.thumb.time = _("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), y(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = _("div", {
                      class: this.player.config.classNames.previewThumbnails.scrubbingContainer
                  }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)
              }), r(this, "destroy", () => {
                  this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove()
              }), r(this, "showImageAtCurrentTime", () => {
                  this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
                  const i = this.thumbnails[0].frames.findIndex(e => this.seekTime >= e.startTime && this.seekTime <= e.endTime),
                      e = 0 <= i;
                  let n = 0;
                  this.mouseDown || this.toggleThumbContainer(e), e && (this.thumbnails.forEach((e, t) => {
                      this.loadedImages.includes(e.frames[i].text) && (n = t)
                  }), i !== this.showingThumb) && (this.showingThumb = i, this.loadImage(n))
              }), r(this, "loadImage", (e = 0) => {
                  const t = this.showingThumb,
                      i = this.thumbnails[e],
                      n = i["urlPrefix"],
                      s = i.frames[t],
                      a = i.frames[t].text,
                      r = n + a;
                  if (this.currentImageElement && this.currentImageElement.dataset.filename === a) this.showImage(this.currentImageElement, s, e, t, a, !1), this.currentImageElement.dataset.index = t, this.removeOldImages(this.currentImageElement);
                  else {
                      this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
                      const i = new Image;
                      i.src = r, i.dataset.index = t, i.dataset.filename = a, this.showingThumbFilename = a, this.player.debug.log("Loading image: " + r), i.onload = () => this.showImage(i, s, e, t, a, !0), this.loadingImage = i, this.removeOldImages(i)
                  }
              }), r(this, "showImage", (e, t, i, n, s, a = !0) => {
                  this.player.debug.log(`Showing thumb: ${s}. num: ${n}. qual: ${i}. newimg: ` + a), this.setImageSizeAndOffset(e, t), a && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(s) || this.loadedImages.push(s)), this.preloadNearby(n, !0).then(this.preloadNearby(n, !1)).then(this.getHigherQuality(i, e, t, s))
              }), r(this, "removeOldImages", i => {
                  Array.from(this.currentImageContainer.children).forEach(e => {
                      if ("img" === e.tagName.toLowerCase()) {
                          var t = this.usingSprites ? 500 : 1e3;
                          if (e.dataset.index !== i.dataset.index && !e.dataset.deleting) {
                              e.dataset.deleting = !0;
                              const i = this["currentImageContainer"];
                              setTimeout(() => {
                                  i.removeChild(e), this.player.debug.log("Removing thumb: " + e.dataset.filename)
                              }, t)
                          }
                      }
                  })
              }), r(this, "preloadNearby", (t, i = !0) => new Promise(a => {
                  setTimeout(() => {
                      const s = this.thumbnails[0].frames[t].text;
                      if (this.showingThumbFilename === s) {
                          var e = i ? this.thumbnails[0].frames.slice(t) : this.thumbnails[0].frames.slice(0, t).reverse();
                          let n = !1;
                          e.forEach(e => {
                              const t = e.text;
                              if (t !== s && !this.loadedImages.includes(t)) {
                                  n = !0, this.player.debug.log("Preloading thumb filename: " + t);
                                  const e = this.thumbnails[0]["urlPrefix"],
                                      s = e + t,
                                      i = new Image;
                                  i.src = s, i.onload = () => {
                                      this.player.debug.log("Preloaded thumb filename: " + t), this.loadedImages.includes(t) || this.loadedImages.push(t), a()
                                  }
                              }
                          }), n || a()
                      }
                  }, 300)
              })), r(this, "getHigherQuality", (t, i, n, s) => {
                  if (t < this.thumbnails.length - 1) {
                      let e = i.naturalHeight;
                      (e = this.usingSprites ? n.h : e) < this.thumbContainerHeight && setTimeout(() => {
                          this.showingThumbFilename === s && (this.player.debug.log("Showing higher quality thumb for: " + s), this.loadImage(t + 1))
                      }, 300)
                  }
              }), r(this, "toggleThumbContainer", (e = !1, t = !1) => {
                  var i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                  this.elements.thumb.container.classList.toggle(i, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null)
              }), r(this, "toggleScrubbingContainer", (e = !1) => {
                  var t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                  this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null)
              }), r(this, "determineContainerAutoSizing", () => {
                  (20 < this.elements.thumb.imageContainer.clientHeight || 20 < this.elements.thumb.imageContainer.clientWidth) && (this.sizeSpecifiedInCSS = !0)
              }), r(this, "setThumbContainerSizeAndPos", () => {
                  var e;
                  this.sizeSpecifiedInCSS ? 20 < this.elements.thumb.imageContainer.clientHeight && this.elements.thumb.imageContainer.clientWidth < 20 ? (e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio), this.elements.thumb.imageContainer.style.width = e + "px") : this.elements.thumb.imageContainer.clientHeight < 20 && 20 < this.elements.thumb.imageContainer.clientWidth && (e = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio), this.elements.thumb.imageContainer.style.height = e + "px") : (e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio), this.elements.thumb.imageContainer.style.height = this.thumbContainerHeight + "px", this.elements.thumb.imageContainer.style.width = e + "px"), this.setThumbContainerPos()
              }), r(this, "setThumbContainerPos", () => {
                  var e = this.player.elements.progress.getBoundingClientRect(),
                      t = this.player.elements.container.getBoundingClientRect(),
                      i = this.elements.thumb["container"],
                      n = t.left - e.left + 10,
                      t = t.right - e.left - i.clientWidth - 10;
                  let s = this.mousePosX - e.left - i.clientWidth / 2;
                  (s = s < n ? n : s) > t && (s = t), i.style.left = s + "px"
              }), r(this, "setScrubbingContainerSize", () => {
                  var {
                      width: e,
                      height: t
                  } = lt(this.thumbAspectRatio, {
                      width: this.player.media.clientWidth,
                      height: this.player.media.clientHeight
                  });
                  this.elements.scrubbing.container.style.width = e + "px", this.elements.scrubbing.container.style.height = t + "px"
              }), r(this, "setImageSizeAndOffset", (e, t) => {
                  var i;
                  this.usingSprites && (i = this.thumbContainerHeight / t.h, e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = `-${t.x * i}px`, e.style.top = `-${t.y * i}px`)
              }), this.player = e, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                  thumb: {},
                  scrubbing: {}
              }, this.load()
          }
          get enabled() {
              return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled
          }
          get currentImageContainer() {
              return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
          }
          get usingSprites() {
              return Object.keys(this.thumbnails[0].frames[0]).includes("w")
          }
          get thumbAspectRatio() {
              return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height
          }
          get thumbContainerHeight() {
              var e;
              return this.mouseDown ? (e = lt(this.thumbAspectRatio, {
                  width: this.player.media.clientWidth,
                  height: this.player.media.clientHeight
              })["height"], e) : this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4)
          }
          get currentImageElement() {
              return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
          }
          set currentImageElement(e) {
              this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e
          }
      }
      const dt = {
          insertElements(t, e) {
              c(e) ? be(t, this.media, {
                  src: e
              }) : u(e) && e.forEach(e => {
                  be(t, this.media, e)
              })
          },
          change(a) {
              me(a, "sources.length") ? (O.cancelRequests.call(this), this.destroy.call(this, () => {
                  this.options.quality = [], f(this.media), this.media = null, y(this.elements.container) && this.elements.container.removeAttribute("class");
                  var {
                      sources: e,
                      type: t
                  } = a, [{
                      provider: i = $.html5,
                      src: n
                  }] = e, s = "html5" === i ? t : "div", n = "html5" === i ? {} : {
                      src: n
                  };
                  Object.assign(this, {
                      provider: i,
                      type: t,
                      supported: S.check(t, i, this.config.playsinline),
                      media: _(s, n)
                  }), this.elements.container.appendChild(this.media), v(a.autoplay) && (this.config.autoplay = a.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), w(a.poster) || (this.poster = a.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline) && this.media.setAttribute("playsinline", ""), j.addStyleHook.call(this), this.isHTML5 && dt.insertElements.call(this, "source", e), this.config.title = a.title, rt.setup.call(this), this.isHTML5 && Object.keys(a).includes("tracks") && dt.insertElements.call(this, "track", a.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && j.build.call(this), this.isHTML5 && this.media.load(), w(a.previewThumbnails) || (Object.assign(this.config.previewThumbnails, a.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new ct(this))), this.fullscreen.update()
              }, !0)) : this.debug.warn("Invalid source format")
          }
      };
      class ut {
          constructor(e, t) {
              if (r(this, "play", () => d(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(() => this.ads.play()).catch(() => N(this.media.play())), this.media.play()) : null), r(this, "pause", () => this.playing && d(this.media.pause) ? this.media.pause() : null), r(this, "togglePlay", e => (v(e) ? e : !this.playing) ? this.play() : this.pause()), r(this, "stop", () => {
                      this.isHTML5 ? (this.pause(), this.restart()) : d(this.media.stop) && this.media.stop()
                  }), r(this, "restart", () => {
                      this.currentTime = 0
                  }), r(this, "rewind", e => {
                      this.currentTime -= b(e) ? e : this.config.seekTime
                  }), r(this, "forward", e => {
                      this.currentTime += b(e) ? e : this.config.seekTime
                  }), r(this, "increaseVolume", e => {
                      var t = this.media.muted ? 0 : this.volume;
                      this.volume = t + (b(e) ? e : 0)
                  }), r(this, "decreaseVolume", e => {
                      this.increaseVolume(-e)
                  }), r(this, "airplay", () => {
                      S.airplay && this.media.webkitShowPlaybackTargetPicker()
                  }), r(this, "toggleControls", e => {
                      if (!this.supported.ui || this.isAudio) return !1;
                      var t = we(this.elements.container, this.config.classNames.hideControls),
                          i = C(this.elements.container, this.config.classNames.hideControls, void 0 === e ? void 0 : !e);
                      if (i && u(this.config.controls) && this.config.controls.includes("settings") && !w(this.config.settings) && I.toggleMenu.call(this, !1), i !== t) {
                          const e = i ? "controlshidden" : "controlsshown";
                          A.call(this, this.media, e)
                      }
                      return !i
                  }), r(this, "on", (e, t) => {
                      M.call(this, this.elements.container, e, t)
                  }), r(this, "once", (e, t) => {
                      Te.call(this, this.elements.container, e, t)
                  }), r(this, "off", (e, t) => {
                      Ce(this.elements.container, e, t)
                  }), r(this, "destroy", (e, t = !1) => {
                      var i;
                      this.ready && (i = () => {
                          document.body.style.overflow = "", this.embed = null, t ? (Object.keys(this.elements).length && (f(this.elements.buttons.play), f(this.elements.captions), f(this.elements.controls), f(this.elements.wrapper), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null), d(e) && e()) : (function() {
                              this && this.eventListeners && (this.eventListeners.forEach(e => {
                                  var {
                                      element: e,
                                      type: t,
                                      callback: i,
                                      options: n
                                  } = e;
                                  e.removeEventListener(t, i, n)
                              }), this.eventListeners = [])
                          }.call(this), O.cancelRequests.call(this), ye(this.elements.original, this.elements.container), A.call(this, this.elements.original, "destroyed", !0), d(e) && e.call(this.elements.original), this.ready = !1, setTimeout(() => {
                              this.elements = null, this.media = null
                          }, 200))
                      }, this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (j.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && d(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200)))
                  }), r(this, "supports", e => S.mime.call(this, e)), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = S.touch, this.media = e, c(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || ce(this.media) || u(this.media)) && (this.media = this.media[0]), this.config = g({}, Ve, ut.defaults, t || {}, (() => {
                      try {
                          return JSON.parse(this.media.getAttribute("data-plyr-config"))
                      } catch (e) {
                          return {}
                      }
                  })()), this.elements = {
                      container: null,
                      fullscreen: null,
                      captions: null,
                      buttons: {},
                      display: {},
                      progress: {},
                      inputs: {},
                      settings: {
                          popup: null,
                          menu: null,
                          panels: {},
                          buttons: {}
                      }
                  }, this.captions = {
                      active: null,
                      currentTrack: -1,
                      meta: new WeakMap
                  }, this.fullscreen = {
                      active: !1
                  }, this.options = {
                      speed: [],
                      quality: []
                  }, this.debug = new Ke(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", S), l(this.media) || !y(this.media)) this.debug.error("Setup failed: no suitable element passed");
              else if (this.media.plyr) this.debug.warn("Target already setup");
              else if (this.config.enabled)
                  if (S.check().api) {
                      var i, e = this.media.cloneNode(!0),
                          n = (e.autoplay = !1, this.elements.original = e, this.media.tagName.toLowerCase()),
                          s = null,
                          a = null;
                      switch (n) {
                          case "div":
                              if (s = this.media.querySelector("iframe"), y(s)) {
                                  if (a = We(s.getAttribute("src")), this.provider = (i = a.toString(), /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(i) ? $.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(i) ? $.vimeo : null), this.elements.container = this.media, this.media = s, this.elements.container.className = "", a.search.length) {
                                      const r = ["1", "true"];
                                      r.includes(a.searchParams.get("autoplay")) && (this.config.autoplay = !0), r.includes(a.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = r.includes(a.searchParams.get("playsinline")), this.config.youtube.hl = a.searchParams.get("hl")) : this.config.playsinline = !0
                                  }
                              } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                              if (w(this.provider) || !Object.values($).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                              this.type = "video";
                              break;
                          case "video":
                          case "audio":
                              this.type = n, this.provider = $.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                              break;
                          default:
                              return void this.debug.error("Setup failed: unsupported type")
                      }
                      this.supported = S.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Qe(this), this.storage = new Be(this), this.media.plyr = this, y(this.elements.container) || (this.elements.container = _("div", {
                          tabindex: 0
                      }), ge(this.media, this.elements.container)), j.migrateStyles.call(this), j.addStyleHook.call(this), rt.setup.call(this), this.config.debug && M.call(this, this.elements.container, this.config.events.join(" "), e => {
                          this.debug.log("event: " + e.type)
                      }), this.fullscreen = new P(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && j.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new ot(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", () => N(this.play())), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new ct(this))) : this.debug.error("Setup failed: no support")
                  } else this.debug.error("Setup failed: no support");
              else this.debug.error("Setup failed: disabled by config")
          }
          get isHTML5() {
              return this.provider === $.html5
          }
          get isEmbed() {
              return this.isYouTube || this.isVimeo
          }
          get isYouTube() {
              return this.provider === $.youtube
          }
          get isVimeo() {
              return this.provider === $.vimeo
          }
          get isVideo() {
              return "video" === this.type
          }
          get isAudio() {
              return "audio" === this.type
          }
          get playing() {
              return Boolean(this.ready && !this.paused && !this.ended)
          }
          get paused() {
              return Boolean(this.media.paused)
          }
          get stopped() {
              return Boolean(this.paused && 0 === this.currentTime)
          }
          get ended() {
              return Boolean(this.media.ended)
          }
          set currentTime(e) {
              var t;
              this.duration && (t = b(e) && 0 < e, this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`))
          }
          get currentTime() {
              return Number(this.media.currentTime)
          }
          get buffered() {
              var e = this.media["buffered"];
              return b(e) ? e : e && e.length && 0 < this.duration ? e.end(0) / this.duration : 0
          }
          get seeking() {
              return Boolean(this.media.seeking)
          }
          get duration() {
              var e = parseFloat(this.config.duration),
                  t = (this.media || {}).duration,
                  t = b(t) && t !== 1 / 0 ? t : 0;
              return e || t
          }
          set volume(e) {
              let t = e;
              c(t) && (t = Number(t)), b(t) || (t = this.storage.get("volume")), b(t) || ({
                  volume: t
              } = this.config), (t = 1 < t ? 1 : t) < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !w(e) && this.muted && 0 < t && (this.muted = !1)
          }
          get volume() {
              return Number(this.media.volume)
          }
          set muted(e) {
              let t = e;
              v(t) || (t = this.storage.get("muted")), v(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
          }
          get muted() {
              return Boolean(this.media.muted)
          }
          get hasAudio() {
              return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)
          }
          set speed(e) {
              let t = null;
              b(e) && (t = e), b(t) || (t = this.storage.get("speed")), b(t) || (t = this.config.speed.selected);
              var i, {
                  minimumSpeed: e,
                  maximumSpeed: n
              } = this;
              t = ([e = 0, n = 0, i = 255] = [t, e, n], Math.min(Math.max(e, n), i)), this.config.speed.selected = t, setTimeout(() => {
                  this.media && (this.media.playbackRate = t)
              }, 0)
          }
          get speed() {
              return Number(this.media.playbackRate)
          }
          get minimumSpeed() {
              return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? .5 : .0625
          }
          get maximumSpeed() {
              return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16
          }
          set quality(i) {
              var n = this.config.quality,
                  s = this.options.quality;
              if (s.length) {
                  let e = [!w(i) && Number(i), this.storage.get("quality"), n.selected, n.default].find(b),
                      t = !0;
                  if (!s.includes(e)) {
                      const i = ke(s, e);
                      this.debug.warn(`Unsupported quality option: ${e}, using ${i} instead`), e = i, t = !1
                  }
                  n.selected = e, this.media.quality = e, t && this.storage.set({
                      quality: e
                  })
              }
          }
          get quality() {
              return this.media.quality
          }
          set loop(e) {
              e = v(e) ? e : this.config.loop.active;
              this.config.loop.active = e, this.media.loop = e
          }
          get loop() {
              return Boolean(this.media.loop)
          }
          set source(e) {
              dt.change.call(this, e)
          }
          get source() {
              return this.media.currentSrc
          }
          get download() {
              var e = this.config.urls["download"];
              return ue(e) ? e : this.source
          }
          set download(e) {
              ue(e) && (this.config.urls.download = e, I.setDownloadUrl.call(this))
          }
          set poster(e) {
              this.isVideo ? j.setPoster.call(this, e, !1).catch(() => {}) : this.debug.warn("Poster can only be set for video")
          }
          get poster() {
              return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null
          }
          get ratio() {
              var e;
              return this.isVideo ? (e = Oe(De.call(this)), u(e) ? e.join(":") : e) : null
          }
          set ratio(e) {
              this.isVideo ? c(e) && Ne(e) ? (this.config.ratio = Oe(e), Ie.call(this)) : this.debug.error(`Invalid aspect ratio specified (${e})`) : this.debug.warn("Aspect ratio can only be set for video")
          }
          set autoplay(e) {
              e = v(e) ? e : this.config.autoplay;
              this.config.autoplay = e
          }
          get autoplay() {
              return Boolean(this.config.autoplay)
          }
          toggleCaptions(e) {
              L.toggle.call(this, e, !1)
          }
          set currentTrack(e) {
              L.set.call(this, e, !1), L.setup()
          }
          get currentTrack() {
              var {
                  toggled: e,
                  currentTrack: t
              } = this.captions;
              return e ? t : -1
          }
          set language(e) {
              L.setLanguage.call(this, e, !1)
          }
          get language() {
              return (L.getCurrentTrack.call(this) || {}).language
          }
          set pip(e) {
              S.pip && (e = v(e) ? e : !this.pip, d(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(e ? Xe : "inline"), d(this.media.requestPictureInPicture)) && (!this.pip && e ? this.media.requestPictureInPicture() : this.pip && !e && document.exitPictureInPicture())
          }
          get pip() {
              return S.pip ? w(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Xe : null
          }
          setPreviewThumbnails(e) {
              this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new ct(this))
          }
          static supported(e, t, i) {
              return S.check(e, t, i)
          }
          static loadSprite(e, t) {
              return He(e, t)
          }
          static setup(e, t = {}) {
              let i = null;
              return c(e) ? i = Array.from(document.querySelectorAll(e)) : ce(e) ? i = Array.from(e) : u(e) && (i = e.filter(y)), w(i) ? null : i.map(e => new ut(e, t))
          }
      }
      return ut.defaults = (Je = Ve, JSON.parse(JSON.stringify(Je))), ut
  }), $jscomp || {}),
  $jscomp$lookupPolyfilledValue = ($jscomp.scope = {}, $jscomp.arrayIteratorImpl = function(e) {
      var t = 0;
      return function() {
          return t < e.length ? {
              done: !1,
              value: e[t++]
          } : {
              done: !0
          }
      }
  }, $jscomp.arrayIterator = function(e) {
      return {
          next: $jscomp.arrayIteratorImpl(e)
      }
  }, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.ISOLATE_POLYFILLS = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, i) {
      return e != Array.prototype && e != Object.prototype && (e[t] = i.value), e
  }, $jscomp.getGlobal = function(e) {
      e = ["object" == typeof globalThis && globalThis, e, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
      for (var t = 0; t < e.length; ++t) {
          var i = e[t];
          if (i && i.Math == Math) return i
      }
      throw Error("Cannot find global object")
  }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.IS_SYMBOL_NATIVE = "function" == typeof Symbol && "symbol" == typeof Symbol("x"), $jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE, $jscomp.polyfills = {}, $jscomp.propertyToPolyfillSymbol = {}, $jscomp.POLYFILL_PREFIX = "$jscp$", function(e, t) {
      var i = $jscomp.propertyToPolyfillSymbol[t];
      return null != i && void 0 !== (i = e[i]) ? i : e[t]
  }),
  scrollCue = ($jscomp.polyfill = function(e, t, i, n) {
      t && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(e, t, i, n) : $jscomp.polyfillUnisolated(e, t, i, n))
  }, $jscomp.polyfillUnisolated = function(e, t, i, n) {
      for (i = $jscomp.global, e = e.split("."), n = 0; n < e.length - 1; n++) {
          var s = e[n];
          s in i || (i[s] = {}), i = i[s]
      }(t = t(n = i[e = e[e.length - 1]])) != n && null != t && $jscomp.defineProperty(i, e, {
          configurable: !0,
          writable: !0,
          value: t
      })
  }, $jscomp.polyfillIsolated = function(e, t, i, n) {
      var s = e.split(".");
      e = 1 === s.length, n = s[0], n = !e && n in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
      for (var a = 0; a < s.length - 1; a++) {
          var r = s[a];
          r in n || (n[r] = {}), n = n[r]
      }
      s = s[s.length - 1], null != (t = t(i = $jscomp.IS_SYMBOL_NATIVE && "es6" === i ? n[s] : null)) && (e ? $jscomp.defineProperty($jscomp.polyfills, s, {
          configurable: !0,
          writable: !0,
          value: t
      }) : t !== i && ($jscomp.propertyToPolyfillSymbol[s] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(s) : $jscomp.POLYFILL_PREFIX + s, s = $jscomp.propertyToPolyfillSymbol[s], $jscomp.defineProperty(n, s, {
          configurable: !0,
          writable: !0,
          value: t
      })))
  }, $jscomp.initSymbol = function() {}, $jscomp.polyfill("Symbol", function(e) {
      var t, i, n;
      return e || ((t = function(e, t) {
          this.$jscomp$symbol$id_ = e, $jscomp.defineProperty(this, "description", {
              configurable: !0,
              writable: !0,
              value: t
          })
      }).prototype.toString = function() {
          return this.$jscomp$symbol$id_
      }, i = 0, n = function(e) {
          if (this instanceof n) throw new TypeError("Symbol is not a constructor");
          return new t("jscomp_symbol_" + (e || "") + "_" + i++, e)
      })
  }, "es6", "es3"), $jscomp.initSymbolIterator = function() {}, $jscomp.polyfill("Symbol.iterator", function(e) {
      if (!e) {
          e = Symbol("Symbol.iterator");
          for (var t = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), i = 0; i < t.length; i++) {
              var n = $jscomp.global[t[i]];
              "function" == typeof n && "function" != typeof n.prototype[e] && $jscomp.defineProperty(n.prototype, e, {
                  configurable: !0,
                  writable: !0,
                  value: function() {
                      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
                  }
              })
          }
      }
      return e
  }, "es6", "es3"), $jscomp.initSymbolAsyncIterator = function() {}, $jscomp.iteratorPrototype = function(e) {
      return (e = {
          next: e
      })[Symbol.iterator] = function() {
          return this
      }, e
  }, $jscomp.iteratorFromArray = function(t, i) {
      t instanceof String && (t += "");
      var n = 0,
          s = {
              next: function() {
                  var e;
                  return n < t.length ? (e = n++, {
                      value: i(e, t[e]),
                      done: !1
                  }) : (s.next = function() {
                      return {
                          done: !0,
                          value: void 0
                      }
                  }, s.next())
              }
          };
      return s[Symbol.iterator] = function() {
          return s
      }, s
  }, $jscomp.polyfill("Array.prototype.keys", function(e) {
      return e || function() {
          return $jscomp.iteratorFromArray(this, function(e) {
              return e
          })
      }
  }, "es6", "es3"), function() {
      var a, s, r, o = {},
          n = 0,
          l = !0,
          c = !0,
          d = !1,
          t = !1,
          i = {
              duration: 600,
              interval: -.7,
              percentage: .75,
              enable: !0,
              docSlider: !1,
              pageChangeReset: !1
          },
          o = {
              setEvents: function(e) {
                  function t() {
                      l && (requestAnimationFrame(function() {
                          l = !0, c && (o.setQuery(), o.runQuery())
                      }), l = !1)
                  }
                  if (c && !e && window.addEventListener("load", o.runQuery), window.addEventListener("scroll", t), d) {
                      e = docSlider.getElements().pages;
                      for (var i = 0; i < e.length; i++) e[i].addEventListener("scroll", function(e) {
                          if (docSlider.getCurrentIndex() + "" !== (e = e.target.getAttribute("data-ds-index"))) return !1;
                          docSlider._getWheelEnable() && t()
                      })
                  }
                  window.addEventListener("resize", function() {
                      0 < n && clearTimeout(n), n = setTimeout(function() {
                          c && (o.searchElements(), o.setQuery(), o.runQuery())
                      }, 200)
                  })
              },
              setOptions: function(t, i) {
                  var n = {};
                  if (void 0 !== t) return Object.keys(t).forEach(function(e) {
                      "[object Object]" === Object.prototype.toString.call(t[e]) ? n[e] = o.setOptions(t[e], i[e]) : (n[e] = t[e], void 0 !== i && void 0 !== i[e] && (n[e] = i[e]))
                  }), n
              },
              searchElements: function() {
                  a = [];
                  for (var e = document.querySelectorAll("[data-cues]:not([data-disabled])"), t = 0; t < e.length; t++) {
                      for (var i = e[t], n = 0; n < i.children.length; n++) {
                          var s = i.children[n];
                          o.setAttrPtoC(s, "data-cue", i, "data-cues", ""), o.setAttrPtoC(s, "data-duration", i, "data-duration", !1), o.setAttrPtoC(s, "data-interval", i, "data-interval", !1), o.setAttrPtoC(s, "data-sort", i, "data-sort", !1), o.setAttrPtoC(s, "data-addClass", i, "data-addClass", !1), o.setAttrPtoC(s, "data-group", i, "data-group", !1), o.setAttrPtoC(s, "data-delay", i, "data-delay", !1)
                      }
                      i.setAttribute("data-disabled", "true")
                  }
                  for (e = document.querySelectorAll('[data-cue]:not([data-show="true"])'), t = 0; t < e.length; t++) i = e[t], a.push({
                      elm: i,
                      cue: o.getAttr(i, "data-cue", "fadeIn"),
                      duration: Number(o.getAttr(i, "data-duration", r.duration)),
                      interval: Number(o.getAttr(i, "data-interval", r.interval)),
                      order: o.getOrderNumber(i),
                      sort: o.getAttr(i, "data-sort", null),
                      addClass: o.getAttr(i, "data-addClass", null),
                      group: o.getAttr(i, "data-group", null),
                      delay: Number(o.getAttr(i, "data-delay", 0))
                  });
                  if (d)
                      for (e = docSlider.getElements().pages.length, t = 0; t < e; t++)
                          for (i = document.querySelectorAll('[data-ds-index="' + t + '"] [data-cue]:not([data-scpage])'), n = 0; n < i.length; n++) i[n].setAttribute("data-scpage", t)
              },
              sortElements: function() {
                  for (var e = arguments[0], a = [].slice.call(arguments).slice(1), t = {
                          $jscomp$loop$prop$i$4: 0
                      }; t.$jscomp$loop$prop$i$4 < a.length;
                      (t = {
                          $jscomp$loop$prop$i$4: t.$jscomp$loop$prop$i$4
                      }).$jscomp$loop$prop$i$4++) e.sort(function(s) {
                      return function(e, t) {
                          var i = void 0 === a[s.$jscomp$loop$prop$i$4][1] || a[s.$jscomp$loop$prop$i$4][1],
                              n = a[s.$jscomp$loop$prop$i$4][0];
                          return e[n] > t[n] ? i ? 1 : -1 : e[n] < t[n] ? i ? -1 : 1 : 0
                      }
                  }(t))
              },
              randElements: function(e) {
                  for (var t = e.length - 1; 0 < t; t--) {
                      var i = Math.floor(Math.random() * (t + 1)),
                          n = e[t];
                      e[t] = e[i], e[i] = n
                  }
                  return e
              },
              setDurationValue: function(e, t, i) {
                  return void 0 !== t && (t = t.duration, (e = -1 === (i + "").indexOf(".") ? e + t + i : e + t + t * i) < 0) ? 0 : e
              },
              getOrderNumber: function(e) {
                  return e.hasAttribute("data-order") ? 0 <= (e = Number(e.getAttribute("data-order"))) ? e : Math.pow(2, 53) - 1 + e : Math.pow(2, 52) - 1
              },
              setAttrPtoC: function(e, t, i, n, s) {
                  i.hasAttribute(n) ? e.hasAttribute(t) || e.setAttribute(t, i.getAttribute(n)) : !1 !== s && e.setAttribute(t, s)
              },
              getAttr: function(e, t, i) {
                  return e.hasAttribute(t) ? e.getAttribute(t) : i
              },
              getOffsetTop: function(e) {
                  return e.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)
              },
              setClassNames: function(e, t) {
                  if (t) {
                      t = t.split(" ");
                      for (var i = 0; i < t.length; i++) e.classList.add(t[i])
                  }
              },
              setQuery: function() {
                  s = {};
                  for (var e = 0; e < a.length; e++) {
                      var t = a[e],
                          i = t.group || "$" + o.getOffsetTop(t.elm);
                      if (!t.elm.hasAttribute("data-show")) {
                          if (d) {
                              var n = t.elm.getAttribute("data-scpage");
                              if (n !== docSlider.getCurrentIndex() + "" && null !== n) continue
                          }
                          void 0 === s[i] && (s[i] = []), s[i].push(t)
                      }
                  }
              },
              runQuery: function() {
                  for (var e = Object.keys(s), t = {}, i = 0; i < e.length; t = {
                          $jscomp$loop$prop$elms$6: t.$jscomp$loop$prop$elms$6,
                          $jscomp$loop$prop$interval$7: t.$jscomp$loop$prop$interval$7
                      }, i++)
                      if (t.$jscomp$loop$prop$elms$6 = s[e[i]], o.isElementIn(t.$jscomp$loop$prop$elms$6[0].elm)) {
                          "reverse" === t.$jscomp$loop$prop$elms$6[0].sort ? t.$jscomp$loop$prop$elms$6.reverse() : "random" === t.$jscomp$loop$prop$elms$6[0].sort && o.randElements(t.$jscomp$loop$prop$elms$6), o.sortElements(t.$jscomp$loop$prop$elms$6, ["order"]);
                          for (var n = t.$jscomp$loop$prop$interval$7 = 0; n < t.$jscomp$loop$prop$elms$6.length; n++) ! function(t) {
                              return function(e) {
                                  t.$jscomp$loop$prop$elms$6[e].elm.setAttribute("data-show", "true"), o.setClassNames(t.$jscomp$loop$prop$elms$6[e].elm, t.$jscomp$loop$prop$elms$6[e].addClass), t.$jscomp$loop$prop$interval$7 = o.setDurationValue(t.$jscomp$loop$prop$interval$7, t.$jscomp$loop$prop$elms$6[e - 1], t.$jscomp$loop$prop$elms$6[e].interval), t.$jscomp$loop$prop$elms$6[e].elm.style.animationName = t.$jscomp$loop$prop$elms$6[e].cue, t.$jscomp$loop$prop$elms$6[e].elm.style.animationDuration = t.$jscomp$loop$prop$elms$6[e].duration + "ms", t.$jscomp$loop$prop$elms$6[e].elm.style.animationTimingFunction = "ease", t.$jscomp$loop$prop$elms$6[e].elm.style.animationDelay = t.$jscomp$loop$prop$interval$7 + t.$jscomp$loop$prop$elms$6[e].delay + "ms", t.$jscomp$loop$prop$elms$6[e].elm.style.animationDirection = "normal", t.$jscomp$loop$prop$elms$6[e].elm.style.animationFillMode = "both"
                              }
                          }(t)(n);
                          delete s[e[i]]
                      }
              },
              isElementIn: function(e) {
                  var t = e.hasAttribute("data-scpage") ? o.isScrollEndWithDocSlider : o.isScrollEnd;
                  return window.pageYOffset > o.getOffsetTop(e) - window.innerHeight * r.percentage || t()
              },
              isScrollEnd: function() {
                  var e = window.document.documentElement;
                  return (window.document.body.scrollTop || e.scrollTop) >= e.scrollHeight - e.clientHeight
              },
              isScrollEndWithDocSlider: function() {
                  var e = docSlider.getCurrentPage();
                  return e.scrollTop >= e.scrollHeight - e.clientHeight
              }
          };
      return {
          init: function(e) {
              r = o.setOptions(i, e), c = r.enable, d = r.docSlider, t = r.pageChangeReset, d || (o.setEvents(), o.searchElements(), o.setQuery())
          },
          update: function() {
              c && (o.searchElements(), o.setQuery(), o.runQuery())
          },
          enable: function(e) {
              c = void 0 === e ? !c : e, scrollCue.update()
          },
          _hasDocSlider: function() {
              return d
          },
          _hasPageChangeReset: function() {
              return t
          },
          _initWithDocSlider: function(e) {
              o.setEvents(e), o.searchElements(), o.setQuery()
          },
          _updateWithDocSlider: function() {
              c && (o.setQuery(), o.runQuery())
          },
          _searchElements: function() {
              o.searchElements()
          }
      }
  }());
! function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, function() {
  "use strict";

  function n(e) {
      return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
  }

  function s(t, i) {
      void 0 === t && (t = {}), void 0 === i && (i = {}), Object.keys(i).forEach(e => {
          void 0 === t[e] ? t[e] = i[e] : n(i[e]) && n(t[e]) && 0 < Object.keys(i[e]).length && s(t[e], i[e])
      })
  }
  const t = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: {
          blur() {},
          nodeName: ""
      },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({
          initEvent() {}
      }),
      createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => []
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: ""
      }
  };

  function C() {
      var e = "undefined" != typeof document ? document : {};
      return s(e, t), e
  }
  const P = {
      document: t,
      navigator: {
          userAgent: ""
      },
      location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: ""
      },
      history: {
          replaceState() {},
          pushState() {},
          go() {},
          back() {}
      },
      CustomEvent: function() {
          return this
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({
          getPropertyValue: () => ""
      }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
          "undefined" != typeof setTimeout && clearTimeout(e)
      }
  };

  function O() {
      var e = "undefined" != typeof window ? window : {};
      return s(e, P), e
  }
  class r extends Array {
      constructor(e) {
          if ("number" == typeof e) super(e);
          else {
              super(...e || []); {
                  e = this;
                  const t = e.__proto__;
                  Object.defineProperty(e, "__proto__", {
                      get: () => t,
                      set(e) {
                          t.__proto__ = e
                      }
                  })
              }
          }
      }
  }

  function a(e) {
      const t = [];
      return (e = void 0 === e ? [] : e).forEach(e => {
          Array.isArray(e) ? t.push(...a(e)) : t.push(e)
      }), t
  }

  function o(e, t) {
      return Array.prototype.filter.call(e, t)
  }

  function D(e, n) {
      const t = O(),
          s = C();
      let i = [];
      if (!n && e instanceof r) return e;
      if (!e) return new r(i);
      if ("string" == typeof e) {
          const t = e.trim();
          if (0 <= t.indexOf("<") && 0 <= t.indexOf(">")) {
              let e = "div";
              0 === t.indexOf("<li") && (e = "ul"), 0 === t.indexOf("<tr") && (e = "tbody"), 0 !== t.indexOf("<td") && 0 !== t.indexOf("<th") || (e = "tr"), 0 === t.indexOf("<tbody") && (e = "table"), 0 === t.indexOf("<option") && (e = "select");
              const n = s.createElement(e);
              n.innerHTML = t;
              for (let e = 0; e < n.childNodes.length; e += 1) i.push(n.childNodes[e])
          } else i = function(e) {
              if ("string" != typeof e) return [e];
              var t = [],
                  i = (n || s).querySelectorAll(e);
              for (let e = 0; e < i.length; e += 1) t.push(i[e]);
              return t
          }(e.trim())
      } else if (e.nodeType || e === t || e === s) i.push(e);
      else if (Array.isArray(e)) {
          if (e instanceof r) return e;
          i = e
      }
      return new r(function(t) {
          var i = [];
          for (let e = 0; e < t.length; e += 1) - 1 === i.indexOf(t[e]) && i.push(t[e]);
          return i
      }(i))
  }
  D.fn = r.prototype;
  const i = {
      addClass: function() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
          const n = a(t.map(e => e.split(" ")));
          return this.forEach(e => {
              e.classList.add(...n)
          }), this
      },
      removeClass: function() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
          const n = a(t.map(e => e.split(" ")));
          return this.forEach(e => {
              e.classList.remove(...n)
          }), this
      },
      hasClass: function() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
          const n = a(t.map(e => e.split(" ")));
          return 0 < o(this, t => 0 < n.filter(e => t.classList.contains(e)).length).length
      },
      toggleClass: function() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
          const n = a(t.map(e => e.split(" ")));
          this.forEach(t => {
              n.forEach(e => {
                  t.classList.toggle(e)
              })
          })
      },
      attr: function(t, i) {
          if (1 === arguments.length && "string" == typeof t) return this[0] ? this[0].getAttribute(t) : void 0;
          for (let e = 0; e < this.length; e += 1)
              if (2 === arguments.length) this[e].setAttribute(t, i);
              else
                  for (const i in t) this[e][i] = t[i], this[e].setAttribute(i, t[i]);
          return this
      },
      removeAttr: function(t) {
          for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
          return this
      },
      transform: function(t) {
          for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
          return this
      },
      transition: function(t) {
          for (let e = 0; e < this.length; e += 1) this[e].style.transitionDuration = "string" != typeof t ? t + "ms" : t;
          return this
      },
      on: function() {
          for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++) i[e] = arguments[e];
          let [n, s, a, r] = i;

          function o(t) {
              var e = t.target;
              if (e) {
                  var i = t.target.dom7EventData || [];
                  if (i.indexOf(t) < 0 && i.unshift(t), D(e).is(s)) a.apply(e, i);
                  else {
                      const t = D(e).parents();
                      for (let e = 0; e < t.length; e += 1) D(t[e]).is(s) && a.apply(t[e], i)
                  }
              }
          }

          function l(e) {
              var t = e && e.target && e.target.dom7EventData || [];
              t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t)
          }
          "function" == typeof i[1] && ([n, a, r] = i, s = void 0), r = r || !1;
          var c = n.split(" ");
          let d;
          for (let e = 0; e < this.length; e += 1) {
              const i = this[e];
              if (s)
                  for (d = 0; d < c.length; d += 1) {
                      const t = c[d];
                      i.dom7LiveListeners || (i.dom7LiveListeners = {}), i.dom7LiveListeners[t] || (i.dom7LiveListeners[t] = []), i.dom7LiveListeners[t].push({
                          listener: a,
                          proxyListener: o
                      }), i.addEventListener(t, o, r)
                  } else
                      for (d = 0; d < c.length; d += 1) {
                          const t = c[d];
                          i.dom7Listeners || (i.dom7Listeners = {}), i.dom7Listeners[t] || (i.dom7Listeners[t] = []), i.dom7Listeners[t].push({
                              listener: a,
                              proxyListener: l
                          }), i.addEventListener(t, l, r)
                      }
          }
          return this
      },
      off: function() {
          for (var e = arguments.length, i = new Array(e), n = 0; n < e; n++) i[n] = arguments[n];
          let [t, s, a, r] = i;
          "function" == typeof i[1] && ([t, a, r] = i, s = void 0), r = r || !1;
          var o = t.split(" ");
          for (let e = 0; e < o.length; e += 1) {
              const i = o[e];
              for (let e = 0; e < this.length; e += 1) {
                  const n = this[e];
                  let t;
                  if (!s && n.dom7Listeners ? t = n.dom7Listeners[i] : s && n.dom7LiveListeners && (t = n.dom7LiveListeners[i]), t && t.length)
                      for (let e = t.length - 1; 0 <= e; --e) {
                          const s = t[e];
                          (a && s.listener === a || a && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === a || !a) && (n.removeEventListener(i, s.proxyListener, r), t.splice(e, 1))
                      }
              }
          }
          return this
      },
      trigger: function() {
          for (var t = O(), i = arguments.length, n = new Array(i), s = 0; s < i; s++) n[s] = arguments[s];
          const a = n[0].split(" "),
              r = n[1];
          for (let e = 0; e < a.length; e += 1) {
              const s = a[e];
              for (let e = 0; e < this.length; e += 1) {
                  const a = this[e];
                  if (t.CustomEvent) {
                      const i = new t.CustomEvent(s, {
                          detail: r,
                          bubbles: !0,
                          cancelable: !0
                      });
                      a.dom7EventData = n.filter((e, t) => 0 < t), a.dispatchEvent(i), a.dom7EventData = [], delete a.dom7EventData
                  }
              }
          }
          return this
      },
      transitionEnd: function(i) {
          const n = this;
          return i && n.on("transitionend", function e(t) {
              t.target === this && (i.call(this, t), n.off("transitionend", e))
          }), this
      },
      outerWidth: function(e) {
          if (0 < this.length) {
              if (e) {
                  const e = this.styles();
                  return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
              }
              return this[0].offsetWidth
          }
          return null
      },
      outerHeight: function(e) {
          if (0 < this.length) {
              if (e) {
                  const e = this.styles();
                  return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
              }
              return this[0].offsetHeight
          }
          return null
      },
      styles: function() {
          var e = O();
          return this[0] ? e.getComputedStyle(this[0], null) : {}
      },
      offset: function() {
          var e, t, i, n, s, a;
          return 0 < this.length ? (a = O(), n = C(), t = (e = this[0]).getBoundingClientRect(), n = n.body, i = e.clientTop || n.clientTop || 0, n = e.clientLeft || n.clientLeft || 0, s = e === a ? a.scrollY : e.scrollTop, a = e === a ? a.scrollX : e.scrollLeft, {
              top: t.top + s - i,
              left: t.left + a - n
          }) : null
      },
      css: function(e, t) {
          var i = O();
          let n;
          if (1 === arguments.length) {
              if ("string" != typeof e) {
                  for (n = 0; n < this.length; n += 1)
                      for (const t in e) this[n].style[t] = e[t];
                  return this
              }
              if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(e)
          }
          if (2 === arguments.length && "string" == typeof e)
              for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
          return this
      },
      each: function(i) {
          return i && this.forEach((e, t) => {
              i.apply(e, [e, t])
          }), this
      },
      html: function(t) {
          if (void 0 === t) return this[0] ? this[0].innerHTML : null;
          for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
          return this
      },
      text: function(t) {
          if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
          for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
          return this
      },
      is: function(e) {
          var t = O(),
              i = C(),
              n = this[0];
          let s, a;
          if (n && void 0 !== e)
              if ("string" == typeof e) {
                  if (n.matches) return n.matches(e);
                  if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                  if (n.msMatchesSelector) return n.msMatchesSelector(e);
                  for (s = D(e), a = 0; a < s.length; a += 1)
                      if (s[a] === n) return !0
              } else {
                  if (e === i) return n === i;
                  if (e === t) return n === t;
                  if (e.nodeType || e instanceof r)
                      for (s = e.nodeType ? [e] : e, a = 0; a < s.length; a += 1)
                          if (s[a] === n) return !0
              }
          return !1
      },
      index: function() {
          let e, t = this[0];
          if (t) {
              for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
              return e
          }
      },
      eq: function(e) {
          var t;
          return void 0 === e ? this : D((t = this.length) - 1 < e ? [] : e < 0 ? (t = t + e) < 0 ? [] : [this[t]] : [this[e]])
      },
      append: function() {
          var i, n = C();
          for (let e = 0; e < arguments.length; e += 1) {
              i = e < 0 || arguments.length <= e ? void 0 : arguments[e];
              for (let t = 0; t < this.length; t += 1)
                  if ("string" == typeof i) {
                      const C = n.createElement("div");
                      for (C.innerHTML = i; C.firstChild;) this[t].appendChild(C.firstChild)
                  } else if (i instanceof r)
                  for (let e = 0; e < i.length; e += 1) this[t].appendChild(i[e]);
              else this[t].appendChild(i)
          }
          return this
      },
      prepend: function(e) {
          var t = C();
          let i, n;
          for (i = 0; i < this.length; i += 1)
              if ("string" == typeof e) {
                  const C = t.createElement("div");
                  for (C.innerHTML = e, n = C.childNodes.length - 1; 0 <= n; --n) this[i].insertBefore(C.childNodes[n], this[i].childNodes[0])
              } else if (e instanceof r)
              for (n = 0; n < e.length; n += 1) this[i].insertBefore(e[n], this[i].childNodes[0]);
          else this[i].insertBefore(e, this[i].childNodes[0]);
          return this
      },
      next: function(e) {
          return 0 < this.length ? e ? this[0].nextElementSibling && D(this[0].nextElementSibling).is(e) ? D([this[0].nextElementSibling]) : D([]) : this[0].nextElementSibling ? D([this[0].nextElementSibling]) : D([]) : D([])
      },
      nextAll: function(e) {
          var t = [];
          let i = this[0];
          if (!i) return D([]);
          for (; i.nextElementSibling;) {
              var n = i.nextElementSibling;
              e && !D(n).is(e) || t.push(n), i = n
          }
          return D(t)
      },
      prev: function(e) {
          var t;
          return 0 < this.length ? (t = this[0], e ? t.previousElementSibling && D(t.previousElementSibling).is(e) ? D([t.previousElementSibling]) : D([]) : t.previousElementSibling ? D([t.previousElementSibling]) : D([])) : D([])
      },
      prevAll: function(e) {
          var t = [];
          let i = this[0];
          if (!i) return D([]);
          for (; i.previousElementSibling;) {
              var n = i.previousElementSibling;
              e && !D(n).is(e) || t.push(n), i = n
          }
          return D(t)
      },
      parent: function(t) {
          var i = [];
          for (let e = 0; e < this.length; e += 1) null === this[e].parentNode || t && !D(this[e].parentNode).is(t) || i.push(this[e].parentNode);
          return D(i)
      },
      parents: function(i) {
          var n = [];
          for (let t = 0; t < this.length; t += 1) {
              let e = this[t].parentNode;
              for (; e;) i && !D(e).is(i) || n.push(e), e = e.parentNode
          }
          return D(n)
      },
      closest: function(e) {
          let t = this;
          return void 0 === e ? D([]) : t = t.is(e) ? t : t.parents(e).eq(0)
      },
      find: function(t) {
          var i = [];
          for (let e = 0; e < this.length; e += 1) {
              var n = this[e].querySelectorAll(t);
              for (let e = 0; e < n.length; e += 1) i.push(n[e])
          }
          return D(i)
      },
      children: function(t) {
          var i = [];
          for (let e = 0; e < this.length; e += 1) {
              var n = this[e].children;
              for (let e = 0; e < n.length; e += 1) t && !D(n[e]).is(t) || i.push(n[e])
          }
          return D(i)
      },
      filter: function(e) {
          return D(o(this, e))
      },
      remove: function() {
          for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this
      }
  };

  function T(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t)
  }

  function b() {
      return Date.now()
  }

  function I(e, t) {
      void 0 === t && (t = "x");
      var i = O();
      let n, s, a;
      e = function(e) {
          var t = O();
          let i;
          return i = (i = !(i = t.getComputedStyle ? t.getComputedStyle(e, null) : i) && e.currentStyle ? e.currentStyle : i) || e.style
      }(e);
      return i.WebKitCSSMatrix ? (6 < (s = e.transform || e.webkitTransform).split(",").length && (s = s.split(", ").map(e => e.replace(",", ".")).join(", ")), a = new i.WebKitCSSMatrix("none" === s ? "" : s)) : (a = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), n = a.toString().split(",")), "x" === t && (s = i.WebKitCSSMatrix ? a.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])), (s = "y" === t ? i.WebKitCSSMatrix ? a.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5]) : s) || 0
  }

  function c(e) {
      return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
  }

  function m(e) {
      const i = Object(arguments.length <= 0 ? void 0 : e),
          t = ["__proto__", "constructor", "prototype"];
      for (let e = 1; e < arguments.length; e += 1) {
          var n = e < 0 || arguments.length <= e ? void 0 : arguments[e];
          if (null != n && (o = n, !("undefined" != typeof window && void 0 !== window.HTMLElement ? o instanceof HTMLElement : o && (1 === o.nodeType || 11 === o.nodeType)))) {
              var s = Object.keys(Object(n)).filter(e => t.indexOf(e) < 0);
              for (let e = 0, t = s.length; e < t; e += 1) {
                  var a = s[e],
                      r = Object.getOwnPropertyDescriptor(n, a);
                  void 0 !== r && r.enumerable && (c(i[a]) && c(n[a]) ? n[a].__swiper__ ? i[a] = n[a] : m(i[a], n[a]) : c(i[a]) || !c(n[a]) || (i[a] = {}, n[a].__swiper__) ? i[a] = n[a] : m(i[a], n[a]))
              }
          }
      }
      var o;
      return i
  }

  function S(e, t, i) {
      e.style.setProperty(t, i)
  }

  function v(e) {
      let {
          swiper: i,
          targetPosition: n,
          side: s
      } = e;
      const a = O(),
          r = -i.translate;
      let o, l = null;
      const c = i.params.speed,
          d = (i.wrapperEl.style.scrollSnapType = "none", a.cancelAnimationFrame(i.cssModeFrameID), n > r ? "next" : "prev"),
          u = (e, t) => "next" === d && t <= e || "prev" === d && e <= t,
          h = () => {
              o = (new Date).getTime(), null === l && (l = o);
              var e = Math.max(Math.min((o - l) / c, 1), 0),
                  e = .5 - Math.cos(e * Math.PI) / 2;
              let t = r + e * (n - r);
              u(t, n) && (t = n), i.wrapperEl.scrollTo({
                  [s]: t
              }), u(t, n) ? (i.wrapperEl.style.overflow = "hidden", i.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                  i.wrapperEl.style.overflow = "", i.wrapperEl.scrollTo({
                      [s]: t
                  })
              }), a.cancelAnimationFrame(i.cssModeFrameID)) : i.cssModeFrameID = a.requestAnimationFrame(h)
          };
      h()
  }
  let e, d, l;

  function h() {
      return e = e || function() {
          const i = O(),
              e = C();
          return {
              smoothScroll: e.documentElement && "scrollBehavior" in e.documentElement.style,
              touch: !!("ontouchstart" in i || i.DocumentTouch && e instanceof i.DocumentTouch),
              passiveListener: function() {
                  let e = !1;
                  try {
                      var t = Object.defineProperty({}, "passive", {
                          get() {
                              e = !0
                          }
                      });
                      i.addEventListener("testPassiveListener", null, t)
                  } catch (e) {}
                  return e
              }(),
              gestures: "ongesturestart" in i
          }
      }()
  }

  function j() {
      return l = l || function() {
          const e = O();
          return {
              isSafari: 0 <= (t = e.navigator.userAgent.toLowerCase()).indexOf("safari") && t.indexOf("chrome") < 0 && t.indexOf("android") < 0,
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
          };
          var t
      }()
  }

  function u(e) {
      var {
          swiper: e,
          runCallbacks: t,
          direction: i,
          step: n
      } = e, {
          activeIndex: s,
          previousIndex: a
      } = e;
      let r = i;
      if (r = r || (a < s ? "next" : s < a ? "prev" : "reset"), e.emit("transition" + n), t && s !== a) {
          if ("reset" === r) return e.emit("slideResetTransition" + n);
          e.emit("slideChangeTransition" + n), "next" === r ? e.emit("slideNextTransition" + n) : e.emit("slidePrevTransition" + n)
      }
  }

  function p() {
      var e, t, i = this,
          {
              params: n,
              el: s
          } = i;
      s && 0 === s.offsetWidth || (n.breakpoints && i.setBreakpoint(), {
          allowSlideNext: s,
          allowSlidePrev: e,
          snapGrid: t
      } = i, i.allowSlideNext = !0, i.allowSlidePrev = !0, i.updateSize(), i.updateSlides(), i.updateSlidesClasses(), ("auto" === n.slidesPerView || 1 < n.slidesPerView) && i.isEnd && !i.isBeginning && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0), i.autoplay && i.autoplay.running && i.autoplay.paused && i.autoplay.run(), i.allowSlidePrev = e, i.allowSlideNext = s, i.params.watchOverflow && t !== i.snapGrid && i.checkOverflow())
  }
  Object.keys(i).forEach(e => {
      Object.defineProperty(D.fn, e, {
          value: i[e],
          writable: !0
      })
  });
  let g = !1;

  function R() {}
  const f = (e, t) => {
          var i = C(),
              {
                  params: n,
                  touchEvents: s,
                  el: a,
                  wrapperEl: r,
                  device: o,
                  support: l
              } = e,
              c = !!n.nested,
              d = "on" === t ? "addEventListener" : "removeEventListener";
          if (l.touch) {
              const t = !("touchstart" !== s.start || !l.passiveListener || !n.passiveListeners) && {
                  passive: !0,
                  capture: !1
              };
              a[d](s.start, e.onTouchStart, t), a[d](s.move, e.onTouchMove, l.passiveListener ? {
                  passive: !1,
                  capture: c
              } : c), a[d](s.end, e.onTouchEnd, t), s.cancel && a[d](s.cancel, e.onTouchEnd, t)
          } else a[d](s.start, e.onTouchStart, !1), i[d](s.move, e.onTouchMove, c), i[d](s.end, e.onTouchEnd, !1);
          (n.preventClicks || n.preventClicksPropagation) && a[d]("click", e.onClick, !0), n.cssMode && r[d]("scroll", e.onScroll), n.updateOnWindowResize ? e[t](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", p, !0) : e[t]("observerUpdate", p, !0)
      },
      y = (e, t) => e.grid && t.grid && 1 < t.grid.rows;
  var w = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements: "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopedSlidesLimit: !0,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1
  };
  const _ = {
          eventsEmitter: {
              on(e, t, i) {
                  const n = this;
                  if (n.eventsListeners && !n.destroyed && "function" == typeof t) {
                      const s = i ? "unshift" : "push";
                      e.split(" ").forEach(e => {
                          n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][s](t)
                      })
                  }
                  return n
              },
              once(n, s, e) {
                  const a = this;
                  return !a.eventsListeners || a.destroyed || "function" != typeof s ? a : (r.__emitterProxy = s, a.on(n, r, e));

                  function r() {
                      a.off(n, r), r.__emitterProxy && delete r.__emitterProxy;
                      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                      s.apply(a, t)
                  }
              },
              onAny(e, t) {
                  return this.eventsListeners && !this.destroyed && "function" == typeof e && (t = t ? "unshift" : "push", this.eventsAnyListeners.indexOf(e) < 0) && this.eventsAnyListeners[t](e), this
              },
              offAny(e) {
                  return this.eventsListeners && !this.destroyed && this.eventsAnyListeners && 0 <= (e = this.eventsAnyListeners.indexOf(e)) && this.eventsAnyListeners.splice(e, 1), this
              },
              off(e, n) {
                  const s = this;
                  return !s.eventsListeners || s.destroyed || s.eventsListeners && e.split(" ").forEach(i => {
                      void 0 === n ? s.eventsListeners[i] = [] : s.eventsListeners[i] && s.eventsListeners[i].forEach((e, t) => {
                          (e === n || e.__emitterProxy && e.__emitterProxy === n) && s.eventsListeners[i].splice(t, 1)
                      })
                  }), s
              },
              emit() {
                  const s = this;
                  if (s.eventsListeners && !s.destroyed && s.eventsListeners) {
                      let e, i, n;
                      for (var t = arguments.length, a = new Array(t), r = 0; r < t; r++) a[r] = arguments[r];
                      n = "string" == typeof a[0] || Array.isArray(a[0]) ? (e = a[0], i = a.slice(1, a.length), s) : (e = a[0].events, i = a[0].data, a[0].context || s), i.unshift(n), (Array.isArray(e) ? e : e.split(" ")).forEach(t => {
                          s.eventsAnyListeners && s.eventsAnyListeners.length && s.eventsAnyListeners.forEach(e => {
                              e.apply(n, [t, ...i])
                          }), s.eventsListeners && s.eventsListeners[t] && s.eventsListeners[t].forEach(e => {
                              e.apply(n, i)
                          })
                      })
                  }
                  return s
              }
          },
          update: {
              updateSize: function() {
                  var e = this;
                  let t, i;
                  var n = e.$el;
                  t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : n[0].clientWidth, i = void 0 !== e.params.height && null !== e.params.height ? e.params.height : n[0].clientHeight, 0 === t && e.isHorizontal() || 0 === i && e.isVertical() || (t = t - parseInt(n.css("padding-left") || 0, 10) - parseInt(n.css("padding-right") || 0, 10), i = i - parseInt(n.css("padding-top") || 0, 10) - parseInt(n.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), Object.assign(e, {
                      width: t,
                      height: i,
                      size: e.isHorizontal() ? t : i
                  }))
              },
              updateSlides: function() {
                  const i = this;

                  function n(e) {
                      return i.isHorizontal() ? e : {
                          width: "height",
                          "margin-top": "margin-left",
                          "margin-bottom ": "margin-right",
                          "margin-left": "margin-top",
                          "margin-right": "margin-bottom",
                          "padding-left": "padding-top",
                          "padding-right": "padding-bottom",
                          marginRight: "marginBottom"
                      }[e]
                  }

                  function s(e, t) {
                      return parseFloat(e.getPropertyValue(n(t)) || 0)
                  }
                  const a = i.params,
                      {
                          $wrapperEl: r,
                          size: o,
                          rtlTranslate: l,
                          wrongRTL: c
                      } = i,
                      d = i.virtual && a.virtual.enabled,
                      e = (d ? i.virtual : i).slides.length,
                      u = r.children("." + i.params.slideClass),
                      h = (d ? i.virtual.slides : u).length;
                  let p = [];
                  const m = [],
                      g = [];
                  let f = a.slidesOffsetBefore,
                      b = ("function" == typeof f && (f = a.slidesOffsetBefore.call(i)), a.slidesOffsetAfter);
                  "function" == typeof b && (b = a.slidesOffsetAfter.call(i));
                  var v = i.snapGrid.length,
                      y = i.slidesGrid.length;
                  let w = a.spaceBetween,
                      _ = -f,
                      E = 0,
                      x = 0;
                  if (void 0 !== o) {
                      "string" == typeof w && 0 <= w.indexOf("%") && (w = parseFloat(w.replace("%", "")) / 100 * o), i.virtualSize = -w, l ? u.css({
                          marginLeft: "",
                          marginBottom: "",
                          marginTop: ""
                      }) : u.css({
                          marginRight: "",
                          marginBottom: "",
                          marginTop: ""
                      }), a.centeredSlides && a.cssMode && (S(i.wrapperEl, "--swiper-centered-offset-before", ""), S(i.wrapperEl, "--swiper-centered-offset-after", ""));
                      var C = a.grid && 1 < a.grid.rows && i.grid;
                      let t;
                      C && i.grid.initSlides(h);
                      var T = "auto" === a.slidesPerView && a.breakpoints && 0 < Object.keys(a.breakpoints).filter(e => void 0 !== a.breakpoints[e].slidesPerView).length;
                      for (let e = 0; e < h; e += 1) {
                          t = 0;
                          const l = u.eq(e);
                          if (C && i.grid.updateSlide(e, l, h, n), "none" !== l.css("display")) {
                              if ("auto" === a.slidesPerView) {
                                  T && (u[e].style[n("width")] = "");
                                  const o = getComputedStyle(l[0]),
                                      c = l[0].style.transform,
                                      d = l[0].style.webkitTransform;
                                  if (c && (l[0].style.transform = "none"), d && (l[0].style.webkitTransform = "none"), a.roundLengths) t = i.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0);
                                  else {
                                      const i = s(o, "width"),
                                          n = s(o, "padding-left"),
                                          a = s(o, "padding-right"),
                                          r = s(o, "margin-left"),
                                          c = s(o, "margin-right"),
                                          d = o.getPropertyValue("box-sizing");
                                      if (d && "border-box" === d) t = i + r + c;
                                      else {
                                          const {
                                              clientWidth: s,
                                              offsetWidth: o
                                          } = l[0];
                                          t = i + n + a + r + c + (o - s)
                                      }
                                  }
                                  c && (l[0].style.transform = c), d && (l[0].style.webkitTransform = d), a.roundLengths && (t = Math.floor(t))
                              } else t = (o - (a.slidesPerView - 1) * w) / a.slidesPerView, a.roundLengths && (t = Math.floor(t)), u[e] && (u[e].style[n("width")] = t + "px");
                              u[e] && (u[e].swiperSlideSize = t), g.push(t), a.centeredSlides ? (_ = _ + t / 2 + E / 2 + w, 0 === E && 0 !== e && (_ = _ - o / 2 - w), 0 === e && (_ = _ - o / 2 - w), Math.abs(_) < .001 && (_ = 0), a.roundLengths && (_ = Math.floor(_)), x % a.slidesPerGroup == 0 && p.push(_), m.push(_)) : (a.roundLengths && (_ = Math.floor(_)), (x - Math.min(i.params.slidesPerGroupSkip, x)) % i.params.slidesPerGroup == 0 && p.push(_), m.push(_), _ = _ + t + w), i.virtualSize += t + w, E = t, x += 1
                          }
                      }
                      if (i.virtualSize = Math.max(i.virtualSize, o) + b, l && c && ("slide" === a.effect || "coverflow" === a.effect) && r.css({
                              width: i.virtualSize + a.spaceBetween + "px"
                          }), a.setWrapperSize && r.css({
                              [n("width")]: i.virtualSize + a.spaceBetween + "px"
                          }), C && i.grid.updateWrapperSize(t, p, n), !a.centeredSlides) {
                          const n = [];
                          for (let t = 0; t < p.length; t += 1) {
                              let e = p[t];
                              a.roundLengths && (e = Math.floor(e)), p[t] <= i.virtualSize - o && n.push(e)
                          }
                          p = n, 1 < Math.floor(i.virtualSize - o) - Math.floor(p[p.length - 1]) && p.push(i.virtualSize - o)
                      }
                      if (0 === p.length && (p = [0]), 0 !== a.spaceBetween) {
                          const s = i.isHorizontal() && l ? "marginLeft" : n("marginRight");
                          u.filter((e, t) => !a.cssMode || t !== u.length - 1).css({
                              [s]: w + "px"
                          })
                      }
                      if (a.centeredSlides && a.centeredSlidesBounds) {
                          let t = 0;
                          g.forEach(e => {
                              t += e + (a.spaceBetween || 0)
                          });
                          const n = (t -= a.spaceBetween) - o;
                          p = p.map(e => e < 0 ? -f : e > n ? n + b : e)
                      }
                      if (a.centerInsufficientSlides) {
                          let t = 0;
                          if (g.forEach(e => {
                                  t += e + (a.spaceBetween || 0)
                              }), (t -= a.spaceBetween) < o) {
                              const n = (o - t) / 2;
                              p.forEach((e, t) => {
                                  p[t] = e - n
                              }), m.forEach((e, t) => {
                                  m[t] = e + n
                              })
                          }
                      }
                      if (Object.assign(i, {
                              slides: u,
                              snapGrid: p,
                              slidesGrid: m,
                              slidesSizesGrid: g
                          }), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
                          S(i.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"), S(i.wrapperEl, "--swiper-centered-offset-after", i.size / 2 - g[g.length - 1] / 2 + "px");
                          const n = -i.snapGrid[0],
                              s = -i.slidesGrid[0];
                          i.snapGrid = i.snapGrid.map(e => e + n), i.slidesGrid = i.slidesGrid.map(e => e + s)
                      }
                      if (h !== e && i.emit("slidesLengthChange"), p.length !== v && (i.params.watchOverflow && i.checkOverflow(), i.emit("snapGridLengthChange")), m.length !== y && i.emit("slidesGridLengthChange"), a.watchSlidesProgress && i.updateSlidesOffset(), !(d || a.cssMode || "slide" !== a.effect && "fade" !== a.effect)) {
                          const n = a.containerModifierClass + "backface-hidden",
                              s = i.$el.hasClass(n);
                          h <= a.maxBackfaceHiddenSlides ? s || i.$el.addClass(n) : s && i.$el.removeClass(n)
                      }
                  }
              },
              updateAutoHeight: function(e) {
                  const i = this,
                      t = [],
                      n = i.virtual && i.params.virtual.enabled;
                  let s, a = 0;
                  "number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed);
                  var r = t => (n ? i.slides.filter(e => parseInt(e.getAttribute("data-swiper-slide-index"), 10) === t) : i.slides.eq(t))[0];
                  if ("auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView)
                      if (i.params.centeredSlides)(i.visibleSlides || D([])).each(e => {
                          t.push(e)
                      });
                      else
                          for (s = 0; s < Math.ceil(i.params.slidesPerView); s += 1) {
                              const e = i.activeIndex + s;
                              if (e > i.slides.length && !n) break;
                              t.push(r(e))
                          } else t.push(r(i.activeIndex));
                  for (s = 0; s < t.length; s += 1)
                      if (void 0 !== t[s]) {
                          const e = t[s].offsetHeight;
                          a = e > a ? e : a
                      }!a && 0 !== a || i.$wrapperEl.css("height", a + "px")
              },
              updateSlidesOffset: function() {
                  var t = this.slides;
                  for (let e = 0; e < t.length; e += 1) t[e].swiperSlideOffset = this.isHorizontal() ? t[e].offsetLeft : t[e].offsetTop
              },
              updateSlidesProgress: function(e) {
                  void 0 === e && (e = this && this.translate || 0);
                  var n = this,
                      s = n.params,
                      {
                          slides: a,
                          rtlTranslate: r,
                          snapGrid: o
                      } = n;
                  if (0 !== a.length) {
                      void 0 === a[0].swiperSlideOffset && n.updateSlidesOffset();
                      let i = r ? e : -e;
                      a.removeClass(s.slideVisibleClass), n.visibleSlidesIndexes = [], n.visibleSlides = [];
                      for (let t = 0; t < a.length; t += 1) {
                          var l = a[t];
                          let e = l.swiperSlideOffset;
                          s.cssMode && s.centeredSlides && (e -= a[0].swiperSlideOffset);
                          const D = (i + (s.centeredSlides ? n.minTranslate() : 0) - e) / (l.swiperSlideSize + s.spaceBetween),
                              c = (i - o[0] + (s.centeredSlides ? n.minTranslate() : 0) - e) / (l.swiperSlideSize + s.spaceBetween),
                              d = -(i - e),
                              u = d + n.slidesSizesGrid[t];
                          (0 <= d && d < n.size - 1 || 1 < u && u <= n.size || d <= 0 && u >= n.size) && (n.visibleSlides.push(l), n.visibleSlidesIndexes.push(t), a.eq(t).addClass(s.slideVisibleClass)), l.progress = r ? -D : D, l.originalProgress = r ? -c : c
                      }
                      n.visibleSlides = D(n.visibleSlides)
                  }
              },
              updateProgress: function(e) {
                  var t = this;
                  if (void 0 === e) {
                      const i = t.rtlTranslate ? -1 : 1;
                      e = t && t.translate && t.translate * i || 0
                  }
                  const i = t.params,
                      n = t.maxTranslate() - t.minTranslate();
                  let {
                      progress: s,
                      isBeginning: a,
                      isEnd: r
                  } = t;
                  var o = a,
                      l = r;
                  r = 0 == n ? (s = 0, a = !0) : (s = (e - t.minTranslate()) / n, a = s <= 0, 1 <= s), Object.assign(t, {
                      progress: s,
                      isBeginning: a,
                      isEnd: r
                  }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), a && !o && t.emit("reachBeginning toEdge"), r && !l && t.emit("reachEnd toEdge"), (o && !a || l && !r) && t.emit("fromEdge"), t.emit("progress", s)
              },
              updateSlidesClasses: function() {
                  var {
                      slides: e,
                      params: t,
                      $wrapperEl: i,
                      activeIndex: n,
                      realIndex: s
                  } = this, a = this.virtual && t.virtual.enabled;
                  e.removeClass(`${t.slideActiveClass} ${t.slideNextClass} ${t.slidePrevClass} ${t.slideDuplicateActiveClass} ${t.slideDuplicateNextClass} ` + t.slideDuplicatePrevClass), (a = a ? this.$wrapperEl.find(`.${t.slideClass}[data-swiper-slide-index="${n}"]`) : e.eq(n)).addClass(t.slideActiveClass), t.loop && (a.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${s}"]`) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${s}"]`)).addClass(t.slideDuplicateActiveClass);
                  let r = a.nextAll("." + t.slideClass).eq(0).addClass(t.slideNextClass),
                      o = (t.loop && 0 === r.length && (r = e.eq(0)).addClass(t.slideNextClass), a.prevAll("." + t.slideClass).eq(0).addClass(t.slidePrevClass));
                  t.loop && 0 === o.length && (o = e.eq(-1)).addClass(t.slidePrevClass), t.loop && ((r.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`)).addClass(t.slideDuplicateNextClass), (o.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`)).addClass(t.slideDuplicatePrevClass)), this.emitSlidesClasses()
              },
              updateActiveIndex: function(e) {
                  var t = this,
                      i = t.rtlTranslate ? t.translate : -t.translate,
                      {
                          slidesGrid: n,
                          snapGrid: s,
                          params: a,
                          activeIndex: r,
                          realIndex: o,
                          snapIndex: l
                      } = t;
                  let c, d = e;
                  if (void 0 === d) {
                      for (let e = 0; e < n.length; e += 1) void 0 !== n[e + 1] ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2 ? d = e : i >= n[e] && i < n[e + 1] && (d = e + 1) : i >= n[e] && (d = e);
                      a.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0)
                  }
                  if (0 <= s.indexOf(i)) c = s.indexOf(i);
                  else {
                      const e = Math.min(a.slidesPerGroupSkip, d);
                      c = e + Math.floor((d - e) / a.slidesPerGroup)
                  }
                  c >= s.length && (c = s.length - 1), d === r ? c !== l && (t.snapIndex = c, t.emit("snapIndexChange")) : (e = parseInt(t.slides.eq(d).attr("data-swiper-slide-index") || d, 10), Object.assign(t, {
                      snapIndex: c,
                      realIndex: e,
                      previousIndex: r,
                      activeIndex: d
                  }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== e && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange"))
              },
              updateClickedSlide: function(e) {
                  var t = this,
                      i = t.params,
                      n = D(e).closest("." + i.slideClass)[0];
                  let s, a = !1;
                  if (n)
                      for (let e = 0; e < t.slides.length; e += 1)
                          if (t.slides[e] === n) {
                              a = !0, s = e;
                              break
                          }
                  n && a ? (t.clickedSlide = n, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(D(n).attr("data-swiper-slide-index"), 10) : t.clickedIndex = s, i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()) : (t.clickedSlide = void 0, t.clickedIndex = void 0)
              }
          },
          translate: {
              getTranslate: function(e) {
                  void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                  var {
                      params: t,
                      rtlTranslate: i,
                      translate: n,
                      $wrapperEl: s
                  } = this;
                  if (t.virtualTranslate) return i ? -n : n;
                  if (t.cssMode) return n;
                  let a = I(s[0], e);
                  return (a = i ? -a : a) || 0
              },
              setTranslate: function(e, t) {
                  var i = this,
                      {
                          rtlTranslate: n,
                          params: s,
                          $wrapperEl: a,
                          wrapperEl: r,
                          progress: o
                      } = i;
                  let l = 0,
                      c = 0;
                  i.isHorizontal() ? l = n ? -e : e : c = e, s.roundLengths && (l = Math.floor(l), c = Math.floor(c)), s.cssMode ? r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -c : s.virtualTranslate || a.transform(`translate3d(${l}px, ${c}px, 0px)`), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : c;
                  n = i.maxTranslate() - i.minTranslate();
                  (0 == n ? 0 : (e - i.minTranslate()) / n) !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
              },
              minTranslate: function() {
                  return -this.snapGrid[0]
              },
              maxTranslate: function() {
                  return -this.snapGrid[this.snapGrid.length - 1]
              },
              translateTo: function(e, t, i, n, s) {
                  void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === n && (n = !0);
                  const a = this,
                      {
                          params: r,
                          wrapperEl: o
                      } = a;
                  if (a.animating && r.preventInteractionOnTransition) return !1;
                  var l = a.minTranslate(),
                      c = a.maxTranslate(),
                      l = n && l < e ? l : n && e < c ? c : e;
                  if (a.updateProgress(l), r.cssMode) {
                      const e = a.isHorizontal();
                      if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -l;
                      else {
                          if (!a.support.smoothScroll) return v({
                              swiper: a,
                              targetPosition: -l,
                              side: e ? "left" : "top"
                          }), !0;
                          o.scrollTo({
                              [e ? "left" : "top"]: -l,
                              behavior: "smooth"
                          })
                      }
                  } else 0 === t ? (a.setTransition(0), a.setTranslate(l), i && (a.emit("beforeTransitionStart", t, s), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(l), i && (a.emit("beforeTransitionStart", t, s), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function(e) {
                      a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, i) && a.emit("transitionEnd")
                  }), a.$wrapperEl[0].addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd)));
                  return !0
              }
          },
          transition: {
              setTransition: function(e, t) {
                  this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
              },
              transitionStart: function(e, t) {
                  void 0 === e && (e = !0);
                  var i = this["params"];
                  i.cssMode || (i.autoHeight && this.updateAutoHeight(), u({
                      swiper: this,
                      runCallbacks: e,
                      direction: t,
                      step: "Start"
                  }))
              },
              transitionEnd: function(e, t) {
                  void 0 === e && (e = !0);
                  var i = this["params"];
                  this.animating = !1, i.cssMode || (this.setTransition(0), u({
                      swiper: this,
                      runCallbacks: e,
                      direction: t,
                      step: "End"
                  }))
              }
          },
          slide: {
              slideTo: function(e, t, i, n, s) {
                  if (void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "number" != typeof(e = void 0 === e ? 0 : e) && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                  if ("string" == typeof e) {
                      const t = parseInt(e, 10);
                      if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                      e = t
                  }
                  const a = this;
                  let r = e;
                  r < 0 && (r = 0);
                  var {
                      params: e,
                      snapGrid: o,
                      slidesGrid: l,
                      previousIndex: c,
                      activeIndex: d,
                      rtlTranslate: u,
                      wrapperEl: h,
                      enabled: p
                  } = a;
                  if (a.animating && e.preventInteractionOnTransition || !p && !n && !s) return !1;
                  p = Math.min(a.params.slidesPerGroupSkip, r);
                  let m = p + Math.floor((r - p) / a.params.slidesPerGroup);
                  var g = -o[m = m >= o.length ? o.length - 1 : m];
                  if (e.normalizeSlideIndex)
                      for (let e = 0; e < l.length; e += 1) {
                          const t = -Math.floor(100 * g),
                              i = Math.floor(100 * l[e]),
                              n = Math.floor(100 * l[e + 1]);
                          void 0 !== l[e + 1] ? t >= i && t < n - (n - i) / 2 ? r = e : t >= i && t < n && (r = e + 1) : t >= i && (r = e)
                      }
                  if (a.initialized && r !== d) {
                      if (!a.allowSlideNext && g < a.translate && g < a.minTranslate()) return !1;
                      if (!a.allowSlidePrev && g > a.translate && g > a.maxTranslate() && (d || 0) !== r) return !1
                  }
                  let f;
                  if (r !== (c || 0) && i && a.emit("beforeSlideChangeStart"), a.updateProgress(g), f = r > d ? "next" : r < d ? "prev" : "reset", u && -g === a.translate || !u && g === a.translate) return a.updateActiveIndex(r), e.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== e.effect && a.setTranslate(g), "reset" != f && (a.transitionStart(i, f), a.transitionEnd(i, f)), !1;
                  if (e.cssMode) {
                      const e = a.isHorizontal(),
                          i = u ? g : -g;
                      if (0 === t) {
                          const t = a.virtual && a.params.virtual.enabled;
                          t && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), h[e ? "scrollLeft" : "scrollTop"] = i, t && requestAnimationFrame(() => {
                              a.wrapperEl.style.scrollSnapType = "", a._swiperImmediateVirtual = !1
                          })
                      } else {
                          if (!a.support.smoothScroll) return v({
                              swiper: a,
                              targetPosition: i,
                              side: e ? "left" : "top"
                          }), !0;
                          h.scrollTo({
                              [e ? "left" : "top"]: i,
                              behavior: "smooth"
                          })
                      }
                  } else a.setTransition(t), a.setTranslate(g), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, n), a.transitionStart(i, f), 0 === t ? a.transitionEnd(i, f) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
                      a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(i, f))
                  }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd));
                  return !0
              },
              slideToLoop: function(e, t, i, n) {
                  if (void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "string" == typeof(e = void 0 === e ? 0 : e)) {
                      const t = parseInt(e, 10);
                      if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                      e = t
                  }
                  let s = e;
                  return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, i, n)
              },
              slideNext: function(e, t, i) {
                  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                  var n = this,
                      {
                          animating: s,
                          enabled: a,
                          params: r
                      } = n;
                  if (!a) return n;
                  let o = r.slidesPerGroup;
                  "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (o = Math.max(n.slidesPerViewDynamic("current", !0), 1));
                  a = n.activeIndex < r.slidesPerGroupSkip ? 1 : o;
                  if (r.loop) {
                      if (s && r.loopPreventsSlide) return !1;
                      n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft
                  }
                  return r.rewind && n.isEnd ? n.slideTo(0, e, t, i) : n.slideTo(n.activeIndex + a, e, t, i)
              },
              slidePrev: function(e, t, i) {
                  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                  const n = this,
                      {
                          params: s,
                          animating: a,
                          snapGrid: r,
                          slidesGrid: o,
                          rtlTranslate: l,
                          enabled: c
                      } = n;
                  if (!c) return n;
                  if (s.loop) {
                      if (a && s.loopPreventsSlide) return !1;
                      n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft
                  }

                  function d(e) {
                      return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                  }
                  const u = d(l ? n.translate : -n.translate),
                      h = r.map(e => d(e));
                  let p = r[h.indexOf(u) - 1];
                  if (void 0 === p && s.cssMode) {
                      let i;
                      r.forEach((e, t) => {
                          u >= e && (i = t)
                      }), void 0 !== i && (p = r[0 < i ? i - 1 : i])
                  }
                  let m = 0;
                  if (void 0 !== p && ((m = o.indexOf(p)) < 0 && (m = n.activeIndex - 1), "auto" === s.slidesPerView) && 1 === s.slidesPerGroup && s.slidesPerGroupAuto && (m = m - n.slidesPerViewDynamic("previous", !0) + 1, m = Math.max(m, 0)), s.rewind && n.isBeginning) {
                      const s = n.params.virtual && n.params.virtual.enabled && n.virtual ? n.virtual.slides.length - 1 : n.slides.length - 1;
                      return n.slideTo(s, e, t, i)
                  }
                  return n.slideTo(m, e, t, i)
              },
              slideReset: function(e, t, i) {
                  return void 0 === e && (e = this.params.speed), this.slideTo(this.activeIndex, e, t = void 0 === t ? !0 : t, i)
              },
              slideToClosest: function(e, t, i, n) {
                  void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === n && (n = .5);
                  var s = this;
                  let a = s.activeIndex;
                  var r = Math.min(s.params.slidesPerGroupSkip, a),
                      r = r + Math.floor((a - r) / s.params.slidesPerGroup),
                      o = s.rtlTranslate ? s.translate : -s.translate;
                  if (o >= s.snapGrid[r]) {
                      const e = s.snapGrid[r];
                      o - e > (s.snapGrid[r + 1] - e) * n && (a += s.params.slidesPerGroup)
                  } else {
                      const e = s.snapGrid[r - 1];
                      o - e <= (s.snapGrid[r] - e) * n && (a -= s.params.slidesPerGroup)
                  }
                  return a = Math.max(a, 0), a = Math.min(a, s.slidesGrid.length - 1), s.slideTo(a, e, t, i)
              },
              slideToClickedSlide: function() {
                  const e = this,
                      {
                          params: t,
                          $wrapperEl: i
                      } = e,
                      n = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                  let s, a = e.clickedIndex;
                  t.loop ? e.animating || (s = parseInt(D(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? a < e.loopedSlides - n / 2 || a > e.slides.length - e.loopedSlides + n / 2 ? (e.loopFix(), a = i.children(`.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), T(() => {
                      e.slideTo(a)
                  })) : e.slideTo(a) : a > e.slides.length - n ? (e.loopFix(), a = i.children(`.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), T(() => {
                      e.slideTo(a)
                  })) : e.slideTo(a)) : e.slideTo(a)
              }
          },
          loop: {
              loopCreate: function() {
                  const t = this,
                      i = C(),
                      {
                          params: n,
                          $wrapperEl: e
                      } = t,
                      s = 0 < e.children().length ? D(e.children()[0].parentNode) : e;
                  s.children(`.${n.slideClass}.` + n.slideDuplicateClass).remove();
                  let a = s.children("." + n.slideClass);
                  if (n.loopFillGroupWithBlank) {
                      const t = n.slidesPerGroup - a.length % n.slidesPerGroup;
                      if (t !== n.slidesPerGroup) {
                          for (let e = 0; e < t; e += 1) {
                              const t = D(i.createElement("div")).addClass(n.slideClass + " " + n.slideBlankClass);
                              s.append(t)
                          }
                          a = s.children("." + n.slideClass)
                      }
                  }
                  "auto" !== n.slidesPerView || n.loopedSlides || (n.loopedSlides = a.length), t.loopedSlides = Math.ceil(parseFloat(n.loopedSlides || n.slidesPerView, 10)), t.loopedSlides += n.loopAdditionalSlides, t.loopedSlides > a.length && t.params.loopedSlidesLimit && (t.loopedSlides = a.length);
                  var r = [],
                      o = [];
                  a.each((e, t) => {
                      D(e).attr("data-swiper-slide-index", t)
                  });
                  for (let e = 0; e < t.loopedSlides; e += 1) {
                      const t = e - Math.floor(e / a.length) * a.length;
                      o.push(a.eq(t)[0]), r.unshift(a.eq(a.length - t - 1)[0])
                  }
                  for (let e = 0; e < o.length; e += 1) s.append(D(o[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
                  for (let e = r.length - 1; 0 <= e; --e) s.prepend(D(r[e].cloneNode(!0)).addClass(n.slideDuplicateClass))
              },
              loopFix: function() {
                  var e = this,
                      {
                          activeIndex: t,
                          slides: i,
                          loopedSlides: n,
                          allowSlidePrev: s,
                          allowSlideNext: a,
                          snapGrid: r,
                          rtlTranslate: o
                      } = (e.emit("beforeLoopFix"), e);
                  let l;
                  e.allowSlidePrev = !0, e.allowSlideNext = !0;
                  r = -r[t] - e.getTranslate();
                  t < n ? (l = i.length - 3 * n + t, l += n, e.slideTo(l, 0, !1, !0) && 0 != r && e.setTranslate((o ? -e.translate : e.translate) - r)) : t >= i.length - n && (l = -i.length + t + n, l += n, e.slideTo(l, 0, !1, !0)) && 0 != r && e.setTranslate((o ? -e.translate : e.translate) - r), e.allowSlidePrev = s, e.allowSlideNext = a, e.emit("loopFix")
              },
              loopDestroy: function() {
                  var {
                      $wrapperEl: e,
                      params: t,
                      slides: i
                  } = this;
                  e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.` + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
              }
          },
          grabCursor: {
              setGrabCursor: function(e) {
                  var t;
                  this.support.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode || ((t = "container" === this.params.touchEventsTarget ? this.el : this.wrapperEl).style.cursor = "move", t.style.cursor = e ? "grabbing" : "grab")
              },
              unsetGrabCursor: function() {
                  this.support.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this["container" === this.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
              }
          },
          events: {
              attachEvents: function() {
                  var e = this,
                      t = C(),
                      {
                          params: i,
                          support: n
                      } = e;
                  e.onTouchStart = function(e) {
                      var n = this,
                          s = C(),
                          a = O(),
                          r = n.touchEventsData,
                          {
                              params: o,
                              touches: l,
                              enabled: c
                          } = n;
                      if (c && (!n.animating || !o.preventInteractionOnTransition)) {
                          !n.animating && o.cssMode && o.loop && n.loopFix();
                          let t = e,
                              i = D((t = t.originalEvent ? t.originalEvent : t).target);
                          if (("wrapper" !== o.touchEventsTarget || i.closest(n.wrapperEl).length) && (r.isTouchEvent = "touchstart" === t.type, r.isTouchEvent || !("which" in t) || 3 !== t.which) && !(!r.isTouchEvent && "button" in t && 0 < t.button || r.isTouched && r.isMoved)) {
                              var c = !!o.noSwipingClass && "" !== o.noSwipingClass,
                                  d = e.composedPath ? e.composedPath() : e.path,
                                  c = (c && t.target && t.target.shadowRoot && d && (i = D(d[0])), o.noSwipingSelector || "." + o.noSwipingClass),
                                  d = !(!t.target || !t.target.shadowRoot);
                              if (o.noSwiping && (d ? function(n, e) {
                                      return function e(t) {
                                          var i;
                                          return t && t !== C() && t !== O() && ((i = (t = t.assignedSlot ? t.assignedSlot : t).closest(n)) || t.getRootNode) ? i || e(t.getRootNode().host) : null
                                      }(e = void 0 === e ? this : e)
                                  }(c, i[0]) : i.closest(c)[0])) n.allowClick = !0;
                              else if (!o.swipeHandler || i.closest(o.swipeHandler)[0]) {
                                  l.currentX = ("touchstart" === t.type ? t.targetTouches[0] : t).pageX, l.currentY = ("touchstart" === t.type ? t.targetTouches[0] : t).pageY;
                                  var d = l.currentX,
                                      c = l.currentY,
                                      u = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
                                      h = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
                                  if (u && (d <= h || d >= a.innerWidth - h)) {
                                      if ("prevent" !== u) return;
                                      e.preventDefault()
                                  }
                                  if (Object.assign(r, {
                                          isTouched: !0,
                                          isMoved: !1,
                                          allowTouchCallbacks: !0,
                                          isScrolling: void 0,
                                          startMoving: void 0
                                      }), l.startX = d, l.startY = c, r.touchStartTime = b(), n.allowClick = !0, n.updateSize(), n.swipeDirection = void 0, 0 < o.threshold && (r.allowThresholdMove = !1), "touchstart" !== t.type) {
                                      let e = !0;
                                      i.is(r.focusableElements) && (e = !1, "SELECT" === i[0].nodeName) && (r.isTouched = !1), s.activeElement && D(s.activeElement).is(r.focusableElements) && s.activeElement !== i[0] && s.activeElement.blur();
                                      const C = e && n.allowTouchMove && o.touchStartPreventDefault;
                                      !o.touchStartForcePreventDefault && !C || i[0].isContentEditable || t.preventDefault()
                                  }
                                  n.params.freeMode && n.params.freeMode.enabled && n.freeMode && n.animating && !o.cssMode && n.freeMode.onTouchStart(), n.emit("touchStart", t)
                              }
                          }
                      }
                  }.bind(e), e.onTouchMove = function(e) {
                      var s = C(),
                          a = this,
                          r = a.touchEventsData,
                          {
                              params: o,
                              touches: l,
                              rtlTranslate: c,
                              enabled: t
                          } = a;
                      if (t) {
                          let n = e;
                          if (n.originalEvent && (n = n.originalEvent), r.isTouched) {
                              if (!r.isTouchEvent || "touchmove" === n.type) {
                                  t = "touchmove" === n.type && n.targetTouches && (n.targetTouches[0] || n.changedTouches[0]), e = ("touchmove" === n.type ? t : n).pageX, t = ("touchmove" === n.type ? t : n).pageY;
                                  if (n.preventedByNestedSwiper) l.startX = e, l.startY = t;
                                  else if (a.allowTouchMove) {
                                      if (r.isTouchEvent && o.touchReleaseOnEdges && !o.loop)
                                          if (a.isVertical()) {
                                              if (t < l.startY && a.translate <= a.maxTranslate() || t > l.startY && a.translate >= a.minTranslate()) return r.isTouched = !1, void(r.isMoved = !1)
                                          } else if (e < l.startX && a.translate <= a.maxTranslate() || e > l.startX && a.translate >= a.minTranslate()) return;
                                      if (r.isTouchEvent && s.activeElement && n.target === s.activeElement && D(n.target).is(r.focusableElements)) r.isMoved = !0, a.allowClick = !1;
                                      else if (r.allowTouchCallbacks && a.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) {
                                          l.currentX = e, l.currentY = t;
                                          var i, s = l.currentX - l.startX,
                                              d = l.currentY - l.startY;
                                          if (!(a.params.threshold && Math.sqrt(s ** 2 + d ** 2) < a.params.threshold))
                                              if (void 0 === r.isScrolling && (a.isHorizontal() && l.currentY === l.startY || a.isVertical() && l.currentX === l.startX ? r.isScrolling = !1 : 25 <= s * s + d * d && (i = 180 * Math.atan2(Math.abs(d), Math.abs(s)) / Math.PI, r.isScrolling = a.isHorizontal() ? i > o.touchAngle : 90 - i > o.touchAngle)), r.isScrolling && a.emit("touchMoveOpposite", n), void 0 !== r.startMoving || l.currentX === l.startX && l.currentY === l.startY || (r.startMoving = !0), r.isScrolling) r.isTouched = !1;
                                              else if (r.startMoving) {
                                              a.allowClick = !1, !o.cssMode && n.cancelable && n.preventDefault(), o.touchMoveStopPropagation && !o.nested && n.stopPropagation(), r.isMoved || (o.loop && !o.cssMode && a.loopFix(), r.startTranslate = a.getTranslate(), a.setTransition(0), a.animating && a.$wrapperEl.trigger("webkitTransitionEnd transitionend"), r.allowMomentumBounce = !1, !o.grabCursor || !0 !== a.allowSlideNext && !0 !== a.allowSlidePrev || a.setGrabCursor(!0), a.emit("sliderFirstMove", n)), a.emit("sliderMove", n), r.isMoved = !0;
                                              let e = a.isHorizontal() ? s : d,
                                                  t = (l.diff = e, e *= o.touchRatio, c && (e = -e), a.swipeDirection = 0 < e ? "prev" : "next", r.currentTranslate = e + r.startTranslate, !0),
                                                  i = o.resistanceRatio;
                                              if (o.touchReleaseOnEdges && (i = 0), 0 < e && r.currentTranslate > a.minTranslate() ? (t = !1, o.resistance && (r.currentTranslate = a.minTranslate() - 1 + (-a.minTranslate() + r.startTranslate + e) ** i)) : e < 0 && r.currentTranslate < a.maxTranslate() && (t = !1, o.resistance) && (r.currentTranslate = a.maxTranslate() + 1 - (a.maxTranslate() - r.startTranslate - e) ** i), t && (n.preventedByNestedSwiper = !0), !a.allowSlideNext && "next" === a.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), !a.allowSlidePrev && "prev" === a.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), a.allowSlidePrev || a.allowSlideNext || (r.currentTranslate = r.startTranslate), 0 < o.threshold) {
                                                  if (!(Math.abs(e) > o.threshold || r.allowThresholdMove)) return void(r.currentTranslate = r.startTranslate);
                                                  if (!r.allowThresholdMove) return r.allowThresholdMove = !0, l.startX = l.currentX, l.startY = l.currentY, r.currentTranslate = r.startTranslate, void(l.diff = a.isHorizontal() ? l.currentX - l.startX : l.currentY - l.startY)
                                              }
                                              o.followFinger && !o.cssMode && ((o.freeMode && o.freeMode.enabled && a.freeMode || o.watchSlidesProgress) && (a.updateActiveIndex(), a.updateSlidesClasses()), a.params.freeMode && o.freeMode.enabled && a.freeMode && a.freeMode.onTouchMove(), a.updateProgress(r.currentTranslate), a.setTranslate(r.currentTranslate))
                                          }
                                      }
                                  } else D(n.target).is(r.focusableElements) || (a.allowClick = !1), r.isTouched && (Object.assign(l, {
                                      startX: e,
                                      startY: t,
                                      currentX: e,
                                      currentY: t
                                  }), r.touchStartTime = b())
                              }
                          } else r.startMoving && r.isScrolling && a.emit("touchMoveOpposite", n)
                      }
                  }.bind(e), e.onTouchEnd = function(a) {
                      const r = this,
                          e = r.touchEventsData,
                          {
                              params: o,
                              touches: t,
                              rtlTranslate: i,
                              slidesGrid: l,
                              enabled: n
                          } = r;
                      if (n) {
                          let s = a;
                          if (s.originalEvent && (s = s.originalEvent), e.allowTouchCallbacks && r.emit("touchEnd", s), e.allowTouchCallbacks = !1, e.isTouched) {
                              o.grabCursor && e.isMoved && e.isTouched && (!0 === r.allowSlideNext || !0 === r.allowSlidePrev) && r.setGrabCursor(!1);
                              var c, d = b(),
                                  u = d - e.touchStartTime;
                              if (r.allowClick) {
                                  const a = s.path || s.composedPath && s.composedPath();
                                  r.updateClickedSlide(a && a[0] || s.target), r.emit("tap click", s), u < 300 && d - e.lastClickTime < 300 && r.emit("doubleTap doubleClick", s)
                              }
                              if (e.lastClickTime = b(), T(() => {
                                      r.destroyed || (r.allowClick = !0)
                                  }), e.isTouched && e.isMoved && r.swipeDirection && 0 !== t.diff && e.currentTranslate !== e.startTranslate) {
                                  if (e.isTouched = !1, e.isMoved = !1, e.startMoving = !1, c = o.followFinger ? i ? r.translate : -r.translate : -e.currentTranslate, !o.cssMode)
                                      if (r.params.freeMode && o.freeMode.enabled) r.freeMode.onTouchEnd({
                                          currentPos: c
                                      });
                                      else {
                                          let t = 0,
                                              i = r.slidesSizesGrid[0];
                                          for (let e = 0; e < l.length; e += e < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
                                              const r = e < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
                                              void 0 !== l[e + r] ? c >= l[e] && c < l[e + r] && (t = e, i = l[e + r] - l[e]) : c >= l[e] && (t = e, i = l[l.length - 1] - l[l.length - 2])
                                          }
                                          let e = null,
                                              n = null;
                                          o.rewind && (r.isBeginning ? n = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1 : r.isEnd && (e = 0));
                                          a = (c - l[t]) / i, d = t < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
                                          u > o.longSwipesMs ? o.longSwipes ? ("next" === r.swipeDirection && (a >= o.longSwipesRatio ? r.slideTo(o.rewind && r.isEnd ? e : t + d) : r.slideTo(t)), "prev" === r.swipeDirection && (a > 1 - o.longSwipesRatio ? r.slideTo(t + d) : null !== n && a < 0 && Math.abs(a) > o.longSwipesRatio ? r.slideTo(n) : r.slideTo(t))) : r.slideTo(r.activeIndex) : o.shortSwipes ? !r.navigation || s.target !== r.navigation.nextEl && s.target !== r.navigation.prevEl ? ("next" === r.swipeDirection && r.slideTo(null !== e ? e : t + d), "prev" === r.swipeDirection && r.slideTo(null !== n ? n : t)) : s.target === r.navigation.nextEl ? r.slideTo(t + d) : r.slideTo(t) : r.slideTo(r.activeIndex)
                                      }
                              } else e.isTouched = !1, e.isMoved = !1, e.startMoving = !1
                          } else e.isMoved && o.grabCursor && r.setGrabCursor(!1), e.isMoved = !1, e.startMoving = !1
                      }
                  }.bind(e), i.cssMode && (e.onScroll = function() {
                      var e = this,
                          {
                              wrapperEl: t,
                              rtlTranslate: i,
                              enabled: n
                          } = e;
                      n && (e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses(), (0 == (n = e.maxTranslate() - e.minTranslate()) ? 0 : (e.translate - e.minTranslate()) / n) !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1))
                  }.bind(e)), e.onClick = function(e) {
                      this.enabled && !this.allowClick && (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation) && this.animating && (e.stopPropagation(), e.stopImmediatePropagation())
                  }.bind(e), n.touch && !g && (t.addEventListener("touchstart", R), g = !0), f(e, "on")
              },
              detachEvents: function() {
                  f(this, "off")
              }
          },
          breakpoints: {
              setBreakpoint: function() {
                  const n = this,
                      {
                          activeIndex: e,
                          initialized: t,
                          loopedSlides: i = 0,
                          params: s,
                          $el: a
                      } = n,
                      r = s.breakpoints;
                  if (r && 0 !== Object.keys(r).length) {
                      var o = n.getBreakpoint(r, n.params.breakpointsBase, n.el);
                      if (o && n.currentBreakpoint !== o) {
                          const d = (o in r ? r[o] : void 0) || n.originalParams,
                              u = y(n, s),
                              h = y(n, d),
                              p = s.enabled;
                          u && !h ? (a.removeClass(`${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`), n.emitContainerClasses()) : !u && h && (a.addClass(s.containerModifierClass + "grid"), (d.grid.fill && "column" === d.grid.fill || !d.grid.fill && "column" === s.grid.fill) && a.addClass(s.containerModifierClass + "grid-column"), n.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(e => {
                              var t = s[e] && s[e].enabled,
                                  i = d[e] && d[e].enabled;
                              t && !i && n[e].disable(), !t && i && n[e].enable()
                          });
                          var l = d.direction && d.direction !== s.direction,
                              c = s.loop && (d.slidesPerView !== s.slidesPerView || l),
                              l = (l && t && n.changeDirection(), m(n.params, d), n.params.enabled);
                          Object.assign(n, {
                              allowTouchMove: n.params.allowTouchMove,
                              allowSlideNext: n.params.allowSlideNext,
                              allowSlidePrev: n.params.allowSlidePrev
                          }), p && !l ? n.disable() : !p && l && n.enable(), n.currentBreakpoint = o, n.emit("_beforeBreakpoint", d), c && t && (n.loopDestroy(), n.loopCreate(), n.updateSlides(), n.slideTo(e - i + n.loopedSlides, 0, !1)), n.emit("breakpoint", d)
                      }
                  }
              },
              getBreakpoint: function(e, i, n) {
                  if (void 0 === i && (i = "window"), e && ("container" !== i || n)) {
                      let t = !1;
                      const s = O(),
                          a = "window" === i ? s.innerHeight : n.clientHeight,
                          r = Object.keys(e).map(e => {
                              var t;
                              return "string" == typeof e && 0 === e.indexOf("@") ? (t = parseFloat(e.substr(1)), {
                                  value: a * t,
                                  point: e
                              }) : {
                                  value: e,
                                  point: e
                              }
                          });
                      r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                      for (let e = 0; e < r.length; e += 1) {
                          const {
                              point: O,
                              value: a
                          } = r[e];
                          "window" === i ? s.matchMedia(`(min-width: ${a}px)`).matches && (t = O) : a <= n.clientWidth && (t = O)
                      }
                      return t || "max"
                  }
              }
          },
          checkOverflow: {
              checkOverflow: function() {
                  const e = this,
                      {
                          isLocked: t,
                          params: i
                      } = e,
                      n = i["slidesOffsetBefore"];
                  if (n) {
                      const t = e.slides.length - 1,
                          i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
                      e.isLocked = e.size > i
                  } else e.isLocked = 1 === e.snapGrid.length;
                  !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
              }
          },
          classes: {
              addClasses: function() {
                  var {
                      classNames: e,
                      params: t,
                      rtl: i,
                      $el: n,
                      device: s,
                      support: a
                  } = this, a = function(e, i) {
                      const n = [];
                      return e.forEach(t => {
                          "object" == typeof t ? Object.keys(t).forEach(e => {
                              t[e] && n.push(i + e)
                          }) : "string" == typeof t && n.push(i + t)
                      }), n
                  }(["initialized", t.direction, {
                      "pointer-events": !a.touch
                  }, {
                      "free-mode": this.params.freeMode && t.freeMode.enabled
                  }, {
                      autoheight: t.autoHeight
                  }, {
                      rtl: i
                  }, {
                      grid: t.grid && 1 < t.grid.rows
                  }, {
                      "grid-column": t.grid && 1 < t.grid.rows && "column" === t.grid.fill
                  }, {
                      android: s.android
                  }, {
                      ios: s.ios
                  }, {
                      "css-mode": t.cssMode
                  }, {
                      centered: t.cssMode && t.centeredSlides
                  }, {
                      "watch-progress": t.watchSlidesProgress
                  }], t.containerModifierClass);
                  e.push(...a), n.addClass([...e].join(" ")), this.emitContainerClasses()
              },
              removeClasses: function() {
                  var {
                      $el: e,
                      classNames: t
                  } = this;
                  e.removeClass(t.join(" ")), this.emitContainerClasses()
              }
          },
          images: {
              loadImage: function(e, t, i, n, s, a) {
                  var r = O();

                  function o() {
                      a && a()
                  }!(D(e).parent("picture")[0] || e.complete && s) && t ? ((e = new r.Image).onload = o, e.onerror = o, n && (e.sizes = n), i && (e.srcset = i), t && (e.src = t)) : o()
              },
              preloadImages: function() {
                  const t = this;

                  function i() {
                      null != t && t && !t.destroyed && (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1), t.imagesLoaded === t.imagesToLoad.length) && (t.params.updateOnImagesReady && t.update(), t.emit("imagesReady"))
                  }
                  t.imagesToLoad = t.$el.find("img");
                  for (let e = 0; e < t.imagesToLoad.length; e += 1) {
                      var n = t.imagesToLoad[e];
                      t.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, i)
                  }
              }
          }
      },
      E = {};
  class x {
      constructor() {
          let t, i;
          for (var u, e = arguments.length, n = new Array(e), s = 0; s < e; s++) n[s] = arguments[s];
          if (1 === n.length && n[0].constructor && "Object" === Object.prototype.toString.call(n[0]).slice(8, -1) ? i = n[0] : [t, i] = n, i = m({}, i = i || {}), t && !i.el && (i.el = t), i.el && 1 < D(i.el).length) {
              const t = [];
              return D(i.el).each(e => {
                  e = m({}, i, {
                      el: e
                  });
                  t.push(new x(e))
              }), t
          }
          const a = this,
              r = (a.__swiper__ = !0, a.support = h(), a.device = (void 0 === (u = {
                  userAgent: i.userAgent
              }) && (u = {}), d = d || function() {
                  var e = (void 0 === u ? {} : u)["userAgent"],
                      t = h(),
                      i = O(),
                      n = i.navigator.platform,
                      e = e || i.navigator.userAgent,
                      s = {
                          ios: !1,
                          android: !1
                      },
                      a = i.screen.width,
                      i = i.screen.height,
                      r = e.match(/(Android);?[\s\/]+([\d.]+)?/);
                  let o = e.match(/(iPad).*OS\s([\d_]+)/);
                  var l = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                      c = !o && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                      d = "Win32" === n,
                      n = "MacIntel" === n;
                  return !o && n && t.touch && 0 <= ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(a + "x" + i) && (o = (o = e.match(/(Version)\/([\d.]+)/)) || [0, 1, "13_0_0"]), r && !d && (s.os = "android", s.android = !0), (o || c || l) && (s.os = "ios", s.ios = !0), s
              }()), a.browser = j(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], i.modules && Array.isArray(i.modules) && a.modules.push(...i.modules), {});
          a.modules.forEach(e => {
              var n, s;
              e({
                  swiper: a,
                  extendParams: (n = i, s = r, function(e) {
                      void 0 === e && (e = {});
                      var t = Object.keys(e)[0],
                          i = e[t];
                      "object" == typeof i && null !== i && (0 <= ["navigation", "pagination", "scrollbar"].indexOf(t) && !0 === n[t] && (n[t] = {
                          auto: !0
                      }), t in n) && "enabled" in i && (!0 === n[t] && (n[t] = {
                          enabled: !0
                      }), "object" != typeof n[t] || "enabled" in n[t] || (n[t].enabled = !0), n[t] || (n[t] = {
                          enabled: !1
                      })), m(s, e)
                  }),
                  on: a.on.bind(a),
                  once: a.once.bind(a),
                  off: a.off.bind(a),
                  emit: a.emit.bind(a)
              })
          });
          var o, l = m({}, w, r);
          return a.params = m({}, l, E, i), a.originalParams = m({}, a.params), a.passedParams = m({}, i), a.params && a.params.on && Object.keys(a.params.on).forEach(e => {
              a.on(e, a.params.on[e])
          }), a.params && a.params.onAny && a.onAny(a.params.onAny), a.$ = D, Object.assign(a, {
              enabled: a.params.enabled,
              el: t,
              classNames: [],
              slides: D(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === a.params.direction,
              isVertical: () => "vertical" === a.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: a.params.allowSlideNext,
              allowSlidePrev: a.params.allowSlidePrev,
              touchEvents: (l = ["touchstart", "touchmove", "touchend", "touchcancel"], o = ["pointerdown", "pointermove", "pointerup"], a.touchEventsTouch = {
                  start: l[0],
                  move: l[1],
                  end: l[2],
                  cancel: l[3]
              }, a.touchEventsDesktop = {
                  start: o[0],
                  move: o[1],
                  end: o[2]
              }, a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop),
              touchEventsData: {
                  isTouched: void 0,
                  isMoved: void 0,
                  allowTouchCallbacks: void 0,
                  touchStartTime: void 0,
                  isScrolling: void 0,
                  currentTranslate: void 0,
                  startTranslate: void 0,
                  allowThresholdMove: void 0,
                  focusableElements: a.params.focusableElements,
                  lastClickTime: b(),
                  clickTimeout: void 0,
                  velocities: [],
                  allowMomentumBounce: void 0,
                  isTouchEvent: void 0,
                  startMoving: void 0
              },
              allowClick: !0,
              allowTouchMove: a.params.allowTouchMove,
              touches: {
                  startX: 0,
                  startY: 0,
                  currentX: 0,
                  currentY: 0,
                  diff: 0
              },
              imagesToLoad: [],
              imagesLoaded: 0
          }), a.emit("_swiper"), a.params.init && a.init(), a
      }
      enable() {
          this.enabled || (this.enabled = !0, this.params.grabCursor && this.setGrabCursor(), this.emit("enable"))
      }
      disable() {
          this.enabled && (this.enabled = !1, this.params.grabCursor && this.unsetGrabCursor(), this.emit("disable"))
      }
      setProgress(e, t) {
          e = Math.min(Math.max(e, 0), 1);
          var i = this.minTranslate(),
              e = (this.maxTranslate() - i) * e + i;
          this.translateTo(e, void 0 === t ? 0 : t), this.updateActiveIndex(), this.updateSlidesClasses()
      }
      emitContainerClasses() {
          const t = this;
          var e;
          t.params._emitClasses && t.el && (e = t.el.className.split(" ").filter(e => 0 === e.indexOf("swiper") || 0 === e.indexOf(t.params.containerModifierClass)), t.emit("_containerClasses", e.join(" ")))
      }
      getSlideClasses(e) {
          const t = this;
          return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
      }
      emitSlidesClasses() {
          const i = this;
          if (i.params._emitClasses && i.el) {
              const n = [];
              i.slides.each(e => {
                  var t = i.getSlideClasses(e);
                  n.push({
                      slideEl: e,
                      classNames: t
                  }), i.emit("_slideClass", e, t)
              }), i.emit("_slideClasses", n)
          }
      }
      slidesPerViewDynamic(e, t) {
          void 0 === e && (e = "current"), void 0 === t && (t = !1);
          var {
              params: i,
              slides: n,
              slidesGrid: s,
              slidesSizesGrid: a,
              size: r,
              activeIndex: o
          } = this;
          let l = 1;
          if (i.centeredSlides) {
              let t, i = n[o].swiperSlideSize;
              for (let e = o + 1; e < n.length; e += 1) n[e] && !t && (i += n[e].swiperSlideSize, l += 1, i > r) && (t = !0);
              for (let e = o - 1; 0 <= e; --e) n[e] && !t && (i += n[e].swiperSlideSize, l += 1, i > r) && (t = !0)
          } else if ("current" === e)
              for (let e = o + 1; e < n.length; e += 1)(t ? s[e] + a[e] - s[o] < r : s[e] - s[o] < r) && (l += 1);
          else
              for (let e = o - 1; 0 <= e; --e) s[o] - s[e] < r && (l += 1);
          return l
      }
      update() {
          const t = this;
          var e, i;

          function n() {
              var e = t.rtlTranslate ? -1 * t.translate : t.translate,
                  e = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
              t.setTranslate(e), t.updateActiveIndex(), t.updateSlidesClasses()
          }
          t && !t.destroyed && ({
              snapGrid: e,
              params: i
          } = t, i.breakpoints && t.setBreakpoint(), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.params.freeMode && t.params.freeMode.enabled ? (n(), t.params.autoHeight && t.updateAutoHeight()) : (("auto" === t.params.slidesPerView || 1 < t.params.slidesPerView) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0)) || n(), i.watchOverflow && e !== t.snapGrid && t.checkOverflow(), t.emit("update"))
      }
      changeDirection(t, e) {
          void 0 === e && (e = !0);
          var i = this,
              n = i.params.direction;
          return (t = t || ("horizontal" === n ? "vertical" : "horizontal")) === n || "horizontal" !== t && "vertical" !== t || (i.$el.removeClass("" + i.params.containerModifierClass + n).addClass("" + i.params.containerModifierClass + t), i.emitContainerClasses(), i.params.direction = t, i.slides.each(e => {
              "vertical" === t ? e.style.width = "" : e.style.height = ""
          }), i.emit("changeDirection"), e && i.update()), i
      }
      changeLanguageDirection(e) {
          var t = this;
          t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.$el.addClass(t.params.containerModifierClass + "rtl"), t.el.dir = "rtl") : (t.$el.removeClass(t.params.containerModifierClass + "rtl"), t.el.dir = "ltr"), t.update())
      }
      mount(e) {
          const i = this;
          if (!i.mounted) {
              const s = D(e || i.params.el);
              if (!(e = s[0])) return !1;
              e.swiper = i;
              const a = () => "." + (i.params.wrapperClass || "").trim().split(" ").join(".");
              let t = e && e.shadowRoot && e.shadowRoot.querySelector ? ((n = D(e.shadowRoot.querySelector(a()))).children = e => s.children(e), n) : (s.children ? s : D(s)).children(a());
              var n;
              if (0 === t.length && i.params.createElements) {
                  const e = C().createElement("div");
                  t = D(e), e.className = i.params.wrapperClass, s.append(e), s.children("." + i.params.slideClass).each(e => {
                      t.append(e)
                  })
              }
              Object.assign(i, {
                  $el: s,
                  el: e,
                  $wrapperEl: t,
                  wrapperEl: t[0],
                  mounted: !0,
                  rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
                  rtlTranslate: "horizontal" === i.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
                  wrongRTL: "-webkit-box" === t.css("display")
              })
          }
          return !0
      }
      init(e) {
          var t = this;
          return t.initialized || !1 !== t.mount(e) && (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
      }
      destroy(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          const i = this,
              {
                  params: n,
                  $el: s,
                  $wrapperEl: a,
                  slides: r
              } = i;
          if (void 0 !== i.params && !i.destroyed) {
              if (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), s.removeAttr("style"), a.removeAttr("style"), r) && r.length && r.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index"), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(e => {
                      i.off(e)
                  }), !1 !== e) {
                  i.$el[0].swiper = null; {
                      const o = i;
                      Object.keys(o).forEach(e => {
                          try {
                              o[e] = null
                          } catch (e) {}
                          try {
                              delete o[e]
                          } catch (e) {}
                      })
                  }
              }
              i.destroyed = !0
          }
          return null
      }
      static extendDefaults(e) {
          m(E, e)
      }
      static get extendedDefaults() {
          return E
      }
      static get defaults() {
          return w
      }
      static installModule(e) {
          x.prototype.__modules__ || (x.prototype.__modules__ = []);
          var t = x.prototype.__modules__;
          "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
      }
      static use(e) {
          return Array.isArray(e) ? e.forEach(e => x.installModule(e)) : x.installModule(e), x
      }
  }

  function k(i, n, s, a) {
      const r = C();
      return i.params.createElements && Object.keys(a).forEach(t => {
          if (!s[t] && !0 === s.auto) {
              let e = i.$el.children("." + a[t])[0];
              e || ((e = r.createElement("div")).className = a[t], i.$el.append(e)), s[t] = e, n[t] = e
          }
      }), s
  }

  function M(e) {
      return "." + (e = void 0 === e ? "" : e).trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")
  }

  function A(e) {
      const {
          effect: i,
          swiper: n,
          on: t,
          setTranslate: s,
          setTransition: a,
          overwriteParams: r,
          perspective: o,
          recreateShadows: l,
          getEffectParams: c
      } = e;
      let d;
      t("beforeInit", () => {
          var e;
          n.params.effect === i && (n.classNames.push("" + n.params.containerModifierClass + i), o && o() && n.classNames.push(n.params.containerModifierClass + "3d"), e = r ? r() : {}, Object.assign(n.params, e), Object.assign(n.originalParams, e))
      }), t("setTranslate", () => {
          n.params.effect === i && s()
      }), t("setTransition", (e, t) => {
          n.params.effect === i && a(t)
      }), t("transitionEnd", () => {
          n.params.effect === i && l && c && c().slideShadows && (n.slides.each(e => {
              n.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()
          }), l())
      }), t("virtualUpdate", () => {
          n.params.effect === i && (n.slides.length || (d = !0), requestAnimationFrame(() => {
              d && n.slides && n.slides.length && (s(), d = !1)
          }))
      })
  }

  function N(e, t) {
      return e.transformEl ? t.find(e.transformEl).css({
          "backface-visibility": "hidden",
          "-webkit-backface-visibility": "hidden"
      }) : t
  }

  function L(e) {
      let {
          swiper: i,
          duration: t,
          transformEl: n,
          allSlides: s
      } = e;
      const {
          slides: a,
          activeIndex: r,
          $wrapperEl: o
      } = i;
      if (i.params.virtualTranslate && 0 !== t) {
          let e = !1;
          (s ? n ? a.find(n) : a : n ? a.eq(r).find(n) : a.eq(r)).transitionEnd(() => {
              if (!e && i && !i.destroyed) {
                  e = !0, i.animating = !1;
                  var t = ["webkitTransitionEnd", "transitionend"];
                  for (let e = 0; e < t.length; e += 1) o.trigger(t[e])
              }
          })
      }
  }

  function $(e, t, i) {
      var n = "swiper-slide-shadow" + (i ? "-" + i : ""),
          e = e.transformEl ? t.find(e.transformEl) : t;
      let s = e.children("." + n);
      return s.length || (s = D(`<div class="swiper-slide-shadow${i ? "-" + i : ""}"></div>`), e.append(s)), s
  }
  return Object.keys(_).forEach(t => {
      Object.keys(_[t]).forEach(e => {
          x.prototype[e] = _[t][e]
      })
  }), x.use([function(e) {
      let {
          swiper: a,
          on: t,
          emit: i
      } = e;
      const n = O();
      let s = null,
          r = null;
      const o = () => {
              a && !a.destroyed && a.initialized && (i("beforeResize"), i("resize"))
          },
          l = () => {
              a && !a.destroyed && a.initialized && i("orientationchange")
          };
      t("init", () => {
          a.params.resizeObserver && void 0 !== n.ResizeObserver ? a && !a.destroyed && a.initialized && (s = new ResizeObserver(i => {
              r = n.requestAnimationFrame(() => {
                  var {
                      width: e,
                      height: t
                  } = a;
                  let n = e,
                      s = t;
                  i.forEach(e => {
                      var {
                          contentBoxSize: e,
                          contentRect: t,
                          target: i
                      } = e;
                      i && i !== a.el || (n = t ? t.width : (e[0] || e).inlineSize, s = t ? t.height : (e[0] || e).blockSize)
                  }), n === e && s === t || o()
              })
          })).observe(a.el) : (n.addEventListener("resize", o), n.addEventListener("orientationchange", l))
      }), t("destroy", () => {
          r && n.cancelAnimationFrame(r), s && s.unobserve && a.el && (s.unobserve(a.el), s = null), n.removeEventListener("resize", o), n.removeEventListener("orientationchange", l)
      })
  }, function(e) {
      let {
          swiper: i,
          extendParams: t,
          on: n,
          emit: s
      } = e;

      function a(e, t) {
          void 0 === t && (t = {});
          var i = new(o.MutationObserver || o.WebkitMutationObserver)(e => {
              var t;
              1 === e.length ? s("observerUpdate", e[0]) : (t = function() {
                  s("observerUpdate", e[0])
              }, o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0))
          });
          i.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData
          }), r.push(i)
      }
      const r = [],
          o = O();
      t({
          observer: !1,
          observeParents: !1,
          observeSlideChildren: !1
      }), n("init", () => {
          if (i.params.observer) {
              if (i.params.observeParents) {
                  var t = i.$el.parents();
                  for (let e = 0; e < t.length; e += 1) a(t[e])
              }
              a(i.$el[0], {
                  childList: i.params.observeSlideChildren
              }), a(i.$wrapperEl[0], {
                  attributes: !1
              })
          }
      }), n("destroy", () => {
          r.forEach(e => {
              e.disconnect()
          }), r.splice(0, r.length)
      })
  }]), x.use([function(e) {
      let t, {
          swiper: _,
          extendParams: i,
          on: n,
          emit: E
      } = e;

      function x(e, t) {
          var i = _.params.virtual;
          return i.cache && _.virtual.cache[t] ? _.virtual.cache[t] : ((e = i.renderSlide ? D(i.renderSlide.call(_, e, t)) : D(`<div class="${_.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`)).attr("data-swiper-slide-index") || e.attr("data-swiper-slide-index", t), i.cache && (_.virtual.cache[t] = e), e)
      }

      function r(t) {
          const {
              slidesPerView: e,
              slidesPerGroup: i,
              centeredSlides: n
          } = _.params, {
              addSlidesBefore: s,
              addSlidesAfter: a
          } = _.params.virtual, {
              from: r,
              to: o,
              slides: l,
              slidesGrid: c,
              offset: d
          } = _.virtual;
          _.params.cssMode || _.updateActiveIndex();
          var u = _.activeIndex || 0;
          let h, p, m;
          h = _.rtlTranslate ? "right" : _.isHorizontal() ? "left" : "top", m = n ? (p = Math.floor(e / 2) + i + a, Math.floor(e / 2) + i + s) : (p = e + (i - 1) + a, i + s);
          const g = Math.max((u || 0) - m, 0),
              f = Math.min((u || 0) + p, l.length - 1),
              b = (_.slidesGrid[g] || 0) - (_.slidesGrid[0] || 0);

          function v() {
              _.updateSlides(), _.updateProgress(), _.updateSlidesClasses(), _.lazy && _.params.lazy.enabled && _.lazy.load(), E("virtualUpdate")
          }
          if (Object.assign(_.virtual, {
                  from: g,
                  to: f,
                  offset: b,
                  slidesGrid: _.slidesGrid
              }), r !== g || o !== f || t)
              if (_.params.virtual.renderExternal) _.params.virtual.renderExternal.call(_, {
                  offset: b,
                  from: g,
                  to: f,
                  slides: function() {
                      var t = [];
                      for (let e = g; e <= f; e += 1) t.push(l[e]);
                      return t
                  }()
              }), _.params.virtual.renderExternalUpdate ? v() : E("virtualUpdate");
              else {
                  var y = [],
                      w = [];
                  if (t) _.$wrapperEl.find("." + _.params.slideClass).remove();
                  else
                      for (let e = r; e <= o; e += 1)(e < g || e > f) && _.$wrapperEl.find(`.${_.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
                  for (let e = 0; e < l.length; e += 1) e >= g && e <= f && (void 0 === o || t ? w.push(e) : (e > o && w.push(e), e < r && y.push(e)));
                  w.forEach(e => {
                      _.$wrapperEl.append(x(l[e], e))
                  }), y.sort((e, t) => t - e).forEach(e => {
                      _.$wrapperEl.prepend(x(l[e], e))
                  }), _.$wrapperEl.children(".swiper-slide").css(h, b + "px"), v()
              }
          else _.slidesGrid !== c && b !== d && _.slides.css(h, b + "px"), _.updateProgress(), E("virtualUpdate")
      }
      i({
          virtual: {
              enabled: !1,
              slides: [],
              cache: !0,
              renderSlide: null,
              renderExternal: null,
              renderExternalUpdate: !0,
              addSlidesBefore: 0,
              addSlidesAfter: 0
          }
      }), _.virtual = {
          cache: {},
          from: void 0,
          to: void 0,
          slides: [],
          offset: 0,
          slidesGrid: []
      }, n("beforeInit", () => {
          _.params.virtual.enabled && (_.virtual.slides = _.params.virtual.slides, _.classNames.push(_.params.containerModifierClass + "virtual"), _.params.watchSlidesProgress = !0, _.originalParams.watchSlidesProgress = !0, _.params.initialSlide || r())
      }), n("setTranslate", () => {
          _.params.virtual.enabled && (_.params.cssMode && !_._immediateVirtual ? (clearTimeout(t), t = setTimeout(() => {
              r()
          }, 100)) : r())
      }), n("init update resize", () => {
          _.params.virtual.enabled && _.params.cssMode && S(_.wrapperEl, "--swiper-virtual-size", _.virtualSize + "px")
      }), Object.assign(_.virtual, {
          appendSlide: function(t) {
              if ("object" == typeof t && "length" in t)
                  for (let e = 0; e < t.length; e += 1) t[e] && _.virtual.slides.push(t[e]);
              else _.virtual.slides.push(t);
              r(!0)
          },
          prependSlide: function(n) {
              const s = _.activeIndex;
              let e = s + 1,
                  a = 1;
              if (Array.isArray(n)) {
                  for (let e = 0; e < n.length; e += 1) n[e] && _.virtual.slides.unshift(n[e]);
                  e = s + n.length, a = n.length
              } else _.virtual.slides.unshift(n);
              if (_.params.virtual.cache) {
                  const n = _.virtual.cache,
                      s = {};
                  Object.keys(n).forEach(e => {
                      var t = n[e],
                          i = t.attr("data-swiper-slide-index");
                      i && t.attr("data-swiper-slide-index", parseInt(i, 10) + a), s[parseInt(e, 10) + a] = t
                  }), _.virtual.cache = s
              }
              r(!0), _.slideTo(e, 0)
          },
          removeSlide: function(i) {
              if (null != i) {
                  let t = _.activeIndex;
                  if (Array.isArray(i))
                      for (let e = i.length - 1; 0 <= e; --e) _.virtual.slides.splice(i[e], 1), _.params.virtual.cache && delete _.virtual.cache[i[e]], i[e] < t && --t, t = Math.max(t, 0);
                  else _.virtual.slides.splice(i, 1), _.params.virtual.cache && delete _.virtual.cache[i], i < t && --t, t = Math.max(t, 0);
                  r(!0), _.slideTo(t, 0)
              }
          },
          removeAllSlides: function() {
              _.virtual.slides = [], _.params.virtual.cache && (_.virtual.cache = {}), r(!0), _.slideTo(0, 0)
          },
          update: r
      })
  }, function(e) {
      let {
          swiper: u,
          extendParams: t,
          on: i,
          emit: h
      } = e;
      const p = C(),
          m = O();

      function n(t) {
          if (u.enabled) {
              const i = u["rtlTranslate"];
              let e = t;
              const n = (e = e.originalEvent ? e.originalEvent : e).keyCode || e.charCode,
                  s = u.params.keyboard.pageUpDown,
                  a = s && 33 === n,
                  r = s && 34 === n,
                  o = 37 === n,
                  l = 39 === n,
                  c = 38 === n,
                  d = 40 === n;
              if (!u.allowSlideNext && (u.isHorizontal() && l || u.isVertical() && d || r)) return !1;
              if (!u.allowSlidePrev && (u.isHorizontal() && o || u.isVertical() && c || a)) return !1;
              if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || p.activeElement && p.activeElement.nodeName && ("input" === p.activeElement.nodeName.toLowerCase() || "textarea" === p.activeElement.nodeName.toLowerCase()))) {
                  if (u.params.keyboard.onlyInViewport && (a || r || o || l || c || d)) {
                      let t = !1;
                      if (0 < u.$el.parents("." + u.params.slideClass).length && 0 === u.$el.parents("." + u.params.slideActiveClass).length) return;
                      const e = u.$el,
                          n = e[0].clientWidth,
                          s = e[0].clientHeight,
                          h = m.innerWidth,
                          p = m.innerHeight,
                          a = u.$el.offset(),
                          r = (i && (a.left -= u.$el[0].scrollLeft), [
                              [a.left, a.top],
                              [a.left + n, a.top],
                              [a.left, a.top + s],
                              [a.left + n, a.top + s]
                          ]);
                      for (let e = 0; e < r.length; e += 1) {
                          const i = r[e];
                          0 <= i[0] && i[0] <= h && 0 <= i[1] && i[1] <= p && (0 === i[0] && 0 === i[1] || (t = !0))
                      }
                      if (!t) return
                  }
                  u.isHorizontal() ? ((a || r || o || l) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), ((r || l) && !i || (a || o) && i) && u.slideNext(), ((a || o) && !i || (r || l) && i) && u.slidePrev()) : ((a || r || c || d) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (r || d) && u.slideNext(), (a || c) && u.slidePrev()), h("keyPress", n)
              }
          }
      }

      function s() {
          u.keyboard.enabled || (D(p).on("keydown", n), u.keyboard.enabled = !0)
      }

      function a() {
          u.keyboard.enabled && (D(p).off("keydown", n), u.keyboard.enabled = !1)
      }
      u.keyboard = {
          enabled: !1
      }, t({
          keyboard: {
              enabled: !1,
              onlyInViewport: !0,
              pageUpDown: !0
          }
      }), i("init", () => {
          u.params.keyboard.enabled && s()
      }), i("destroy", () => {
          u.keyboard.enabled && a()
      }), Object.assign(u.keyboard, {
          enable: s,
          disable: a
      })
  }, function(e) {
      let {
          swiper: c,
          extendParams: t,
          on: i,
          emit: d
      } = e;
      const n = O();
      let u;
      t({
          mousewheel: {
              enabled: !1,
              releaseOnEdges: !1,
              invert: !1,
              forceToAxis: !1,
              sensitivity: 1,
              eventsTarget: "container",
              thresholdDelta: null,
              thresholdTime: null
          }
      }), c.mousewheel = {
          enabled: !1
      };
      let h, s = b();
      const p = [];

      function a() {
          c.enabled && (c.mouseEntered = !0)
      }

      function r() {
          c.enabled && (c.mouseEntered = !1)
      }

      function m(e) {
          c.params.mousewheel.thresholdDelta && e.delta < c.params.mousewheel.thresholdDelta || c.params.mousewheel.thresholdTime && b() - s < c.params.mousewheel.thresholdTime || 6 <= e.delta && b() - s < 60 || (e.direction < 0 ? c.isEnd && !c.params.loop || c.animating || (c.slideNext(), d("scroll", e.raw)) : c.isBeginning && !c.params.loop || c.animating || (c.slidePrev(), d("scroll", e.raw)), s = (new n.Date).getTime())
      }

      function o(n) {
          let s = n,
              a = !0;
          if (c.enabled) {
              var r = c.params.mousewheel;
              c.params.cssMode && s.preventDefault();
              let e = c.$el;
              if ("container" !== c.params.mousewheel.eventsTarget && (e = D(c.params.mousewheel.eventsTarget)), !c.mouseEntered && !e[0].contains(s.target) && !r.releaseOnEdges) return !0;
              s.originalEvent && (s = s.originalEvent);
              let t = 0;
              var o = c.rtlTranslate ? -1 : 1,
                  l = function(e) {
                      let t = 0,
                          i = 0,
                          n = 0,
                          s = 0;
                      return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, s = 10 * i, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (n = e.deltaX), e.shiftKey && !n && (n = s, s = 0), (n || s) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, s *= 40) : (n *= 800, s *= 800)), n && !t && (t = n < 1 ? -1 : 1), s && !i && (i = s < 1 ? -1 : 1), {
                          spinX: t,
                          spinY: i,
                          pixelX: n,
                          pixelY: s
                      }
                  }(s);
              if (r.forceToAxis)
                  if (c.isHorizontal()) {
                      if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
                      t = -l.pixelX * o
                  } else {
                      if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
                      t = -l.pixelY
                  }
              else t = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
              if (0 === t) return !0;
              r.invert && (t = -t);
              let i = c.getTranslate() + t * r.sensitivity;
              if ((i = i >= c.minTranslate() ? c.minTranslate() : i) <= c.maxTranslate() && (i = c.maxTranslate()), (a = !!c.params.loop || !(i === c.minTranslate() || i === c.maxTranslate())) && c.params.nested && s.stopPropagation(), c.params.freeMode && c.params.freeMode.enabled) {
                  const n = {
                          time: b(),
                          delta: Math.abs(t),
                          direction: Math.sign(t)
                      },
                      a = h && n.time < h.time + 500 && n.delta <= h.delta && n.direction === h.direction;
                  if (!a) {
                      h = void 0, c.params.loop && c.loopFix();
                      let e = c.getTranslate() + t * r.sensitivity;
                      const D = c.isBeginning,
                          b = c.isEnd;
                      if ((e = e >= c.minTranslate() ? c.minTranslate() : e) <= c.maxTranslate() && (e = c.maxTranslate()), c.setTransition(0), c.setTranslate(e), c.updateProgress(), c.updateActiveIndex(), c.updateSlidesClasses(), (!D && c.isBeginning || !b && c.isEnd) && c.updateSlidesClasses(), c.params.freeMode.sticky) {
                          clearTimeout(u), u = void 0, 15 <= p.length && p.shift();
                          const s = p.length ? p[p.length - 1] : void 0,
                              a = p[0];
                          if (p.push(n), s && (n.delta > s.delta || n.direction !== s.direction)) p.splice(0);
                          else if (15 <= p.length && n.time - a.time < 500 && 1 <= a.delta - n.delta && n.delta <= 6) {
                              const s = 0 < t ? .8 : .2;
                              h = n, p.splice(0), u = T(() => {
                                  c.slideToClosest(c.params.speed, !0, void 0, s)
                              }, 0)
                          }
                          u = u || T(() => {
                              h = n, p.splice(0), c.slideToClosest(c.params.speed, !0, void 0, .5)
                          }, 500)
                      }
                      if (a || d("scroll", s), c.params.autoplay && c.params.autoplayDisableOnInteraction && c.autoplay.stop(), e === c.minTranslate() || e === c.maxTranslate()) return !0
                  }
              } else {
                  const s = {
                          time: b(),
                          delta: Math.abs(t),
                          direction: Math.sign(t),
                          raw: n
                      },
                      a = (2 <= p.length && p.shift(), p.length ? p[p.length - 1] : void 0);
                  if (p.push(s), (!a || s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && m(s), function(e) {
                          var t = c.params.mousewheel;
                          if (e.direction < 0) {
                              if (c.isEnd && !c.params.loop && t.releaseOnEdges) return 1
                          } else if (c.isBeginning && !c.params.loop && t.releaseOnEdges) return 1
                      }(s)) return !0
              }
              return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1
          }
      }

      function l(e) {
          let t = c.$el;
          (t = "container" !== c.params.mousewheel.eventsTarget ? D(c.params.mousewheel.eventsTarget) : t)[e]("mouseenter", a), t[e]("mouseleave", r), t[e]("wheel", o)
      }

      function g() {
          return c.params.cssMode ? (c.wrapperEl.removeEventListener("wheel", o), !0) : !c.mousewheel.enabled && (l("on"), c.mousewheel.enabled = !0)
      }

      function f() {
          return c.params.cssMode ? (c.wrapperEl.addEventListener(event, o), !0) : !!c.mousewheel.enabled && (l("off"), !(c.mousewheel.enabled = !1))
      }
      i("init", () => {
          !c.params.mousewheel.enabled && c.params.cssMode && f(), c.params.mousewheel.enabled && g()
      }), i("destroy", () => {
          c.params.cssMode && g(), c.mousewheel.enabled && f()
      }), Object.assign(c.mousewheel, {
          enable: g,
          disable: f
      })
  }, function(e) {
      let {
          swiper: s,
          extendParams: t,
          on: i,
          emit: a
      } = e;

      function n(e) {
          let t;
          return t = e && (t = D(e), s.params.uniqueNavElements) && "string" == typeof e && 1 < t.length && 1 === s.$el.find(e).length ? s.$el.find(e) : t
      }

      function r(e, t) {
          var i = s.params.navigation;
          e && 0 < e.length && (e[t ? "addClass" : "removeClass"](i.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = t), s.params.watchOverflow) && s.enabled && e[s.isLocked ? "addClass" : "removeClass"](i.lockClass)
      }

      function o() {
          var e, t;
          s.params.loop || ({
              $nextEl: e,
              $prevEl: t
          } = s.navigation, r(t, s.isBeginning && !s.params.rewind), r(e, s.isEnd && !s.params.rewind))
      }

      function l(e) {
          e.preventDefault(), s.isBeginning && !s.params.loop && !s.params.rewind || (s.slidePrev(), a("navigationPrev"))
      }

      function c(e) {
          e.preventDefault(), s.isEnd && !s.params.loop && !s.params.rewind || (s.slideNext(), a("navigationNext"))
      }

      function d() {
          var e, t, i = s.params.navigation;
          s.params.navigation = k(s, s.originalParams.navigation, s.params.navigation, {
              nextEl: "swiper-button-next",
              prevEl: "swiper-button-prev"
          }), (i.nextEl || i.prevEl) && (e = n(i.nextEl), t = n(i.prevEl), e && 0 < e.length && e.on("click", c), t && 0 < t.length && t.on("click", l), Object.assign(s.navigation, {
              $nextEl: e,
              nextEl: e && e[0],
              $prevEl: t,
              prevEl: t && t[0]
          }), s.enabled || (e && e.addClass(i.lockClass), t && t.addClass(i.lockClass)))
      }

      function u() {
          var {
              $nextEl: e,
              $prevEl: t
          } = s.navigation;
          e && e.length && (e.off("click", c), e.removeClass(s.params.navigation.disabledClass)), t && t.length && (t.off("click", l), t.removeClass(s.params.navigation.disabledClass))
      }
      t({
          navigation: {
              nextEl: null,
              prevEl: null,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
              navigationDisabledClass: "swiper-navigation-disabled"
          }
      }), s.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null
      }, i("init", () => {
          (!1 === s.params.navigation.enabled ? h : (d(), o))()
      }), i("toEdge fromEdge lock unlock", () => {
          o()
      }), i("destroy", () => {
          u()
      }), i("enable disable", () => {
          var {
              $nextEl: e,
              $prevEl: t
          } = s.navigation;
          e && e[s.enabled ? "removeClass" : "addClass"](s.params.navigation.lockClass), t && t[s.enabled ? "removeClass" : "addClass"](s.params.navigation.lockClass)
      }), i("click", (e, t) => {
          var {
              $nextEl: i,
              $prevEl: n
          } = s.navigation, t = t.target;
          if (s.params.navigation.hideOnClick && !D(t).is(n) && !D(t).is(i) && (!(s.pagination && s.params.pagination && s.params.pagination.clickable) || s.pagination.el !== t && !s.pagination.el.contains(t))) {
              let e;
              i ? e = i.hasClass(s.params.navigation.hiddenClass) : n && (e = n.hasClass(s.params.navigation.hiddenClass)), a(!0 === e ? "navigationShow" : "navigationHide"), i && i.toggleClass(s.params.navigation.hiddenClass), n && n.toggleClass(s.params.navigation.hiddenClass)
          }
      });
      const h = () => {
          s.$el.addClass(s.params.navigation.navigationDisabledClass), u()
      };
      Object.assign(s.navigation, {
          enable: () => {
              s.$el.removeClass(s.params.navigation.navigationDisabledClass), d(), o()
          },
          disable: h,
          update: o,
          init: d,
          destroy: u
      })
  }, function(e) {
      let {
          swiper: l,
          extendParams: t,
          on: i,
          emit: c
      } = e;
      e = "swiper-pagination";
      let d, u = (t({
          pagination: {
              el: null,
              bulletElement: "span",
              clickable: !1,
              hideOnClick: !1,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: !1,
              type: "bullets",
              dynamicBullets: !1,
              dynamicMainBullets: 1,
              formatFractionCurrent: e => e,
              formatFractionTotal: e => e,
              bulletClass: e + "-bullet",
              bulletActiveClass: e + "-bullet-active",
              modifierClass: e + "-",
              currentClass: e + "-current",
              totalClass: e + "-total",
              hiddenClass: e + "-hidden",
              progressbarFillClass: e + "-progressbar-fill",
              progressbarOppositeClass: e + "-progressbar-opposite",
              clickableClass: e + "-clickable",
              lockClass: e + "-lock",
              horizontalClass: e + "-horizontal",
              verticalClass: e + "-vertical",
              paginationDisabledClass: e + "-disabled"
          }
      }), l.pagination = {
          el: null,
          $el: null,
          bullets: []
      }, 0);

      function h() {
          return !l.params.pagination.el || !l.pagination.el || !l.pagination.$el || 0 === l.pagination.$el.length
      }

      function p(e, t) {
          var i = l.params.pagination["bulletActiveClass"];
          e[t]().addClass(i + "-" + t)[t]().addClass(i + `-${t}-` + t)
      }

      function n() {
          const t = l.rtl,
              a = l.params.pagination;
          if (!h()) {
              const r = (l.virtual && l.params.virtual.enabled ? l.virtual : l).slides.length,
                  o = l.pagination.$el;
              let s;
              var i = l.params.loop ? Math.ceil((r - 2 * l.loopedSlides) / l.params.slidesPerGroup) : l.snapGrid.length;
              if (l.params.loop ? ((s = Math.ceil((l.activeIndex - l.loopedSlides) / l.params.slidesPerGroup)) > r - 1 - 2 * l.loopedSlides && (s -= r - 2 * l.loopedSlides), s > i - 1 && (s -= i), s < 0 && "bullets" !== l.params.paginationType && (s = i + s)) : s = void 0 !== l.snapIndex ? l.snapIndex : l.activeIndex || 0, "bullets" === a.type && l.pagination.bullets && 0 < l.pagination.bullets.length) {
                  const r = l.pagination.bullets;
                  let i, n, e;
                  if (a.dynamicBullets && (d = r.eq(0)[l.isHorizontal() ? "outerWidth" : "outerHeight"](!0), o.css(l.isHorizontal() ? "width" : "height", d * (a.dynamicMainBullets + 4) + "px"), 1 < a.dynamicMainBullets && void 0 !== l.previousIndex && ((u += s - (l.previousIndex - l.loopedSlides || 0)) > a.dynamicMainBullets - 1 ? u = a.dynamicMainBullets - 1 : u < 0 && (u = 0)), i = Math.max(s - u, 0), n = i + (Math.min(r.length, a.dynamicMainBullets) - 1), e = (n + i) / 2), r.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => "" + a.bulletActiveClass + e).join(" ")), 1 < o.length) r.each(e => {
                      var e = D(e),
                          t = e.index();
                      t === s && e.addClass(a.bulletActiveClass), a.dynamicBullets && (t >= i && t <= n && e.addClass(a.bulletActiveClass + "-main"), t === i && p(e, "prev"), t === n) && p(e, "next")
                  });
                  else {
                      const t = r.eq(s),
                          o = t.index();
                      if (t.addClass(a.bulletActiveClass), a.dynamicBullets) {
                          const t = r.eq(i),
                              d = r.eq(n);
                          for (let e = i; e <= n; e += 1) r.eq(e).addClass(a.bulletActiveClass + "-main");
                          if (l.params.loop)
                              if (o >= r.length) {
                                  for (let e = a.dynamicMainBullets; 0 <= e; --e) r.eq(r.length - e).addClass(a.bulletActiveClass + "-main");
                                  r.eq(r.length - a.dynamicMainBullets - 1).addClass(a.bulletActiveClass + "-prev")
                              } else p(t, "prev"), p(d, "next");
                          else p(t, "prev"), p(d, "next")
                      }
                  }
                  if (a.dynamicBullets) {
                      const c = Math.min(r.length, a.dynamicMainBullets + 4),
                          o = (d * c - d) / 2 - e * d,
                          u = t ? "right" : "left";
                      r.css(l.isHorizontal() ? u : "top", o + "px")
                  }
              }
              if ("fraction" === a.type && (o.find(M(a.currentClass)).text(a.formatFractionCurrent(s + 1)), o.find(M(a.totalClass)).text(a.formatFractionTotal(i))), "progressbar" === a.type) {
                  var n = a.progressbarOpposite ? l.isHorizontal() ? "vertical" : "horizontal" : l.isHorizontal() ? "horizontal" : "vertical";
                  const r = (s + 1) / i;
                  let e = 1,
                      t = 1;
                  "horizontal" == n ? e = r : t = r, o.find(M(a.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${e}) scaleY(${t})`).transition(l.params.speed)
              }
              "custom" === a.type && a.renderCustom ? (o.html(a.renderCustom(l, s + 1, i)), c("paginationRender", o[0])) : c("paginationUpdate", o[0]), l.params.watchOverflow && l.enabled && o[l.isLocked ? "addClass" : "removeClass"](a.lockClass)
          }
      }

      function s() {
          var n = l.params.pagination;
          if (!h()) {
              var e = (l.virtual && l.params.virtual.enabled ? l.virtual : l).slides.length,
                  s = l.pagination.$el;
              let i = "";
              if ("bullets" === n.type) {
                  let t = l.params.loop ? Math.ceil((e - 2 * l.loopedSlides) / l.params.slidesPerGroup) : l.snapGrid.length;
                  l.params.freeMode && l.params.freeMode.enabled && !l.params.loop && t > e && (t = e);
                  for (let e = 0; e < t; e += 1) n.renderBullet ? i += n.renderBullet.call(l, e, n.bulletClass) : i += `<${n.bulletElement} class="${n.bulletClass}"></${n.bulletElement}>`;
                  s.html(i), l.pagination.bullets = s.find(M(n.bulletClass))
              }
              "fraction" === n.type && (i = n.renderFraction ? n.renderFraction.call(l, n.currentClass, n.totalClass) : `<span class="${n.currentClass}"></span> / <span class="${n.totalClass}"></span>`, s.html(i)), "progressbar" === n.type && (i = n.renderProgressbar ? n.renderProgressbar.call(l, n.progressbarFillClass) : `<span class="${n.progressbarFillClass}"></span>`, s.html(i)), "custom" !== n.type && c("paginationRender", l.pagination.$el[0])
          }
      }

      function a() {
          l.params.pagination = k(l, l.originalParams.pagination, l.params.pagination, {
              el: "swiper-pagination"
          });
          var t = l.params.pagination;
          if (t.el) {
              let e = D(t.el);
              0 !== e.length && (l.params.uniqueNavElements && "string" == typeof t.el && 1 < e.length && 1 < (e = l.$el.find(t.el)).length && (e = e.filter(e => D(e).parents(".swiper")[0] === l.el)), "bullets" === t.type && t.clickable && e.addClass(t.clickableClass), e.addClass(t.modifierClass + t.type), e.addClass(l.isHorizontal() ? t.horizontalClass : t.verticalClass), "bullets" === t.type && t.dynamicBullets && (e.addClass("" + t.modifierClass + t.type + "-dynamic"), u = 0, t.dynamicMainBullets < 1) && (t.dynamicMainBullets = 1), "progressbar" === t.type && t.progressbarOpposite && e.addClass(t.progressbarOppositeClass), t.clickable && e.on("click", M(t.bulletClass), function(e) {
                  e.preventDefault();
                  let t = D(this).index() * l.params.slidesPerGroup;
                  l.params.loop && (t += l.loopedSlides), l.slideTo(t)
              }), Object.assign(l.pagination, {
                  $el: e,
                  el: e[0]
              }), l.enabled || e.addClass(t.lockClass))
          }
      }

      function r() {
          var e, t = l.params.pagination;
          h() || ((e = l.pagination.$el).removeClass(t.hiddenClass), e.removeClass(t.modifierClass + t.type), e.removeClass(l.isHorizontal() ? t.horizontalClass : t.verticalClass), l.pagination.bullets && l.pagination.bullets.removeClass && l.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && e.off("click", M(t.bulletClass)))
      }
      i("init", () => {
          (!1 === l.params.pagination.enabled ? o : (a(), s(), n))()
      }), i("activeIndexChange", () => {
          !l.params.loop && void 0 !== l.snapIndex || n()
      }), i("snapIndexChange", () => {
          l.params.loop || n()
      }), i("slidesLengthChange", () => {
          l.params.loop && (s(), n())
      }), i("snapGridLengthChange", () => {
          l.params.loop || (s(), n())
      }), i("destroy", () => {
          r()
      }), i("enable disable", () => {
          var e = l.pagination["$el"];
          e && e[l.enabled ? "removeClass" : "addClass"](l.params.pagination.lockClass)
      }), i("lock unlock", () => {
          n()
      }), i("click", (e, t) => {
          var t = t.target,
              i = l.pagination["$el"];
          if (l.params.pagination.el && l.params.pagination.hideOnClick && i && 0 < i.length && !D(t).hasClass(l.params.pagination.bulletClass) && (!l.navigation || !(l.navigation.nextEl && t === l.navigation.nextEl || l.navigation.prevEl && t === l.navigation.prevEl))) {
              const e = i.hasClass(l.params.pagination.hiddenClass);
              c(!0 === e ? "paginationShow" : "paginationHide"), i.toggleClass(l.params.pagination.hiddenClass)
          }
      });
      const o = () => {
          l.$el.addClass(l.params.pagination.paginationDisabledClass), l.pagination.$el && l.pagination.$el.addClass(l.params.pagination.paginationDisabledClass), r()
      };
      Object.assign(l.pagination, {
          enable: () => {
              l.$el.removeClass(l.params.pagination.paginationDisabledClass), l.pagination.$el && l.pagination.$el.removeClass(l.params.pagination.paginationDisabledClass), a(), s(), n()
          },
          disable: o,
          render: s,
          update: n,
          init: a,
          destroy: r
      })
  }, function(e) {
      let {
          swiper: l,
          extendParams: t,
          on: i,
          emit: a
      } = e;
      const o = C();
      let r, c, d, n, u = !1,
          h = null,
          p = null;

      function s() {
          if (l.params.scrollbar.el && l.scrollbar.el) {
              const {
                  scrollbar: i,
                  rtlTranslate: n,
                  progress: s
              } = l, {
                  $dragEl: a,
                  $el: r
              } = i, o = l.params.scrollbar;
              let e = c,
                  t = (d - c) * s;
              n ? 0 < (t = -t) ? (e = c - t, t = 0) : -t + c > d && (e = d + t) : t < 0 ? (e = c + t, t = 0) : t + c > d && (e = d - t), l.isHorizontal() ? (a.transform(`translate3d(${t}px, 0, 0)`), a[0].style.width = e + "px") : (a.transform(`translate3d(0px, ${t}px, 0)`), a[0].style.height = e + "px"), o.hide && (clearTimeout(h), r[0].style.opacity = 1, h = setTimeout(() => {
                  r[0].style.opacity = 0, r.transition(400)
              }, 1e3))
          }
      }

      function m() {
          var e, t, i;
          l.params.scrollbar.el && l.scrollbar.el && (e = l["scrollbar"], {
              $dragEl: t,
              $el: i
          } = e, t[0].style.width = "", t[0].style.height = "", d = l.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, n = l.size / (l.virtualSize + l.params.slidesOffsetBefore - (l.params.centeredSlides ? l.snapGrid[0] : 0)), c = "auto" === l.params.scrollbar.dragSize ? d * n : parseInt(l.params.scrollbar.dragSize, 10), l.isHorizontal() ? t[0].style.width = c + "px" : t[0].style.height = c + "px", i[0].style.display = 1 <= n ? "none" : "", l.params.scrollbar.hide && (i[0].style.opacity = 0), l.params.watchOverflow) && l.enabled && e.$el[l.isLocked ? "addClass" : "removeClass"](l.params.scrollbar.lockClass)
      }

      function g(e) {
          return l.isHorizontal() ? ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientX : ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientY
      }

      function f(e) {
          var {
              scrollbar: t,
              rtlTranslate: i
          } = l, t = t["$el"];
          let n;
          n = (g(e) - t.offset()[l.isHorizontal() ? "left" : "top"] - (null !== r ? r : c / 2)) / (d - c), n = Math.max(Math.min(n, 1), 0), i && (n = 1 - n);
          e = l.minTranslate() + (l.maxTranslate() - l.minTranslate()) * n;
          l.updateProgress(e), l.setTranslate(e), l.updateActiveIndex(), l.updateSlidesClasses()
      }

      function b(e) {
          var t = l.params.scrollbar,
              {
                  scrollbar: i,
                  $wrapperEl: n
              } = l,
              {
                  $el: i,
                  $dragEl: s
              } = i;
          u = !0, r = e.target === s[0] || e.target === s ? g(e) - e.target.getBoundingClientRect()[l.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), n.transition(100), s.transition(100), f(e), clearTimeout(p), i.transition(0), t.hide && i.css("opacity", 1), l.params.cssMode && l.$wrapperEl.css("scroll-snap-type", "none"), a("scrollbarDragStart", e)
      }

      function v(e) {
          var {
              scrollbar: t,
              $wrapperEl: i
          } = l, {
              $el: t,
              $dragEl: n
          } = t;
          u && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, f(e), i.transition(0), t.transition(0), n.transition(0), a("scrollbarDragMove", e))
      }

      function y(e) {
          const t = l.params.scrollbar,
              {
                  scrollbar: i,
                  $wrapperEl: n
              } = l,
              s = i["$el"];
          u && (u = !1, l.params.cssMode && (l.$wrapperEl.css("scroll-snap-type", ""), n.transition("")), t.hide && (clearTimeout(p), p = T(() => {
              s.css("opacity", 0), s.transition(400)
          }, 1e3)), a("scrollbarDragEnd", e), t.snapOnRelease) && l.slideToClosest()
      }

      function w(e) {
          var t, {
                  scrollbar: i,
                  touchEventsTouch: n,
                  touchEventsDesktop: s,
                  params: a,
                  support: r
              } = l,
              i = i.$el;
          i && (i = i[0], t = !(!r.passiveListener || !a.passiveListeners) && {
              passive: !1,
              capture: !1
          }, a = !(!r.passiveListener || !a.passiveListeners) && {
              passive: !0,
              capture: !1
          }, i) && (e = "on" === e ? "addEventListener" : "removeEventListener", r.touch ? (i[e](n.start, b, t), i[e](n.move, v, t), i[e](n.end, y, a)) : (i[e](s.start, b, t), o[e](s.move, v, t), o[e](s.end, y, a)))
      }

      function _() {
          var {
              scrollbar: i,
              $el: n
          } = l, s = (l.params.scrollbar = k(l, l.originalParams.scrollbar, l.params.scrollbar, {
              el: "swiper-scrollbar"
          }), l.params.scrollbar);
          if (s.el) {
              let e = D(s.el),
                  t = ((e = l.params.uniqueNavElements && "string" == typeof s.el && 1 < e.length && 1 === n.find(s.el).length ? n.find(s.el) : e).addClass(l.isHorizontal() ? s.horizontalClass : s.verticalClass), e.find("." + l.params.scrollbar.dragClass));
              0 === t.length && (t = D(`<div class="${l.params.scrollbar.dragClass}"></div>`), e.append(t)), Object.assign(i, {
                  $el: e,
                  el: e[0],
                  $dragEl: t,
                  dragEl: t[0]
              }), s.draggable && l.params.scrollbar.el && l.scrollbar.el && w("on"), e && e[l.enabled ? "removeClass" : "addClass"](l.params.scrollbar.lockClass)
          }
      }

      function E() {
          var e = l.params.scrollbar,
              t = l.scrollbar.$el;
          t && t.removeClass(l.isHorizontal() ? e.horizontalClass : e.verticalClass), l.params.scrollbar.el && l.scrollbar.el && w("off")
      }
      t({
          scrollbar: {
              el: null,
              dragSize: "auto",
              hide: !1,
              draggable: !1,
              snapOnRelease: !0,
              lockClass: "swiper-scrollbar-lock",
              dragClass: "swiper-scrollbar-drag",
              scrollbarDisabledClass: "swiper-scrollbar-disabled",
              horizontalClass: "swiper-scrollbar-horizontal",
              verticalClass: "swiper-scrollbar-vertical"
          }
      }), l.scrollbar = {
          el: null,
          dragEl: null,
          $el: null,
          $dragEl: null
      }, i("init", () => {
          (!1 === l.params.scrollbar.enabled ? x : (_(), m(), s))()
      }), i("update resize observerUpdate lock unlock", () => {
          m()
      }), i("setTranslate", () => {
          s()
      }), i("setTransition", (e, t) => {
          t = t, l.params.scrollbar.el && l.scrollbar.el && l.scrollbar.$dragEl.transition(t)
      }), i("enable disable", () => {
          var e = l.scrollbar["$el"];
          e && e[l.enabled ? "removeClass" : "addClass"](l.params.scrollbar.lockClass)
      }), i("destroy", () => {
          E()
      });
      const x = () => {
          l.$el.addClass(l.params.scrollbar.scrollbarDisabledClass), l.scrollbar.$el && l.scrollbar.$el.addClass(l.params.scrollbar.scrollbarDisabledClass), E()
      };
      Object.assign(l.scrollbar, {
          enable: () => {
              l.$el.removeClass(l.params.scrollbar.scrollbarDisabledClass), l.scrollbar.$el && l.scrollbar.$el.removeClass(l.params.scrollbar.scrollbarDisabledClass), _(), m(), s()
          },
          disable: x,
          updateSize: m,
          setTranslate: s,
          init: _,
          destroy: E
      })
  }, function(e) {
      let {
          swiper: l,
          extendParams: t,
          on: i
      } = e;
      t({
          parallax: {
              enabled: !1
          }
      });
      const a = (e, t) => {
              var i = l["rtl"],
                  n = D(e),
                  e = i ? -1 : 1,
                  i = n.attr("data-swiper-parallax") || "0";
              let s = n.attr("data-swiper-parallax-x"),
                  a = n.attr("data-swiper-parallax-y");
              var r = n.attr("data-swiper-parallax-scale"),
                  o = n.attr("data-swiper-parallax-opacity");
              if (s || a ? (s = s || "0", a = a || "0") : l.isHorizontal() ? (s = i, a = "0") : (a = i, s = "0"), s = 0 <= s.indexOf("%") ? parseInt(s, 10) * t * e + "%" : s * t * e + "px", a = 0 <= a.indexOf("%") ? parseInt(a, 10) * t + "%" : a * t + "px", null != o) {
                  const e = o - (o - 1) * (1 - Math.abs(t));
                  n[0].style.opacity = e
              }
              if (null == r) n.transform(`translate3d(${s}, ${a}, 0px)`);
              else {
                  const e = r - (r - 1) * (1 - Math.abs(t));
                  n.transform(`translate3d(${s}, ${a}, 0px) scale(${e})`)
              }
          },
          n = () => {
              const {
                  $el: e,
                  slides: t,
                  progress: n,
                  snapGrid: s
              } = l;
              e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                  a(e, n)
              }), t.each((e, t) => {
                  let i = e.progress;
                  1 < l.params.slidesPerGroup && "auto" !== l.params.slidesPerView && (i += Math.ceil(t / 2) - n * (s.length - 1)), i = Math.min(Math.max(i, -1), 1), D(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                      a(e, i)
                  })
              })
          };
      i("beforeInit", () => {
          l.params.parallax.enabled && (l.params.watchSlidesProgress = !0, l.originalParams.watchSlidesProgress = !0)
      }), i("init", () => {
          l.params.parallax.enabled && n()
      }), i("setTranslate", () => {
          l.params.parallax.enabled && n()
      }), i("setTransition", (e, t) => {
          var i;
          l.params.parallax.enabled && (void 0 === (i = t) && (i = l.params.speed), l.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
              e = D(e);
              let t = parseInt(e.attr("data-swiper-parallax-duration"), 10) || i;
              0 === i && (t = 0), e.transition(t)
          }))
      })
  }, function(e) {
      let {
          swiper: _,
          extendParams: t,
          on: i,
          emit: n
      } = e;
      const E = O();
      t({
          zoom: {
              enabled: !1,
              maxRatio: 3,
              minRatio: 1,
              toggle: !0,
              containerClass: "swiper-zoom-container",
              zoomedSlideClass: "swiper-slide-zoomed"
          }
      }), _.zoom = {
          enabled: !1
      };
      let s, a, r, x = 1,
          o = !1;
      const C = {
              $slideEl: void 0,
              slideWidth: void 0,
              slideHeight: void 0,
              $imageEl: void 0,
              $imageWrapEl: void 0,
              maxRatio: 3
          },
          T = {
              isTouched: void 0,
              isMoved: void 0,
              currentX: void 0,
              currentY: void 0,
              minX: void 0,
              minY: void 0,
              maxX: void 0,
              maxY: void 0,
              width: void 0,
              height: void 0,
              startX: void 0,
              startY: void 0,
              touchesStart: {},
              touchesCurrent: {}
          },
          l = {
              x: void 0,
              y: void 0,
              prevPositionX: void 0,
              prevPositionY: void 0,
              prevTime: void 0
          };
      let c = 1;

      function d(e) {
          var t, i, n;
          return e.targetTouches.length < 2 ? 1 : (t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, n = e.targetTouches[1].pageX, e = e.targetTouches[1].pageY, Math.sqrt((n - t) ** 2 + (e - i) ** 2))
      }

      function u(e) {
          var t = _.support,
              i = _.params.zoom;
          if (a = !1, r = !1, !t.gestures) {
              if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
              a = !0, C.scaleStart = d(e)
          }
          C.$slideEl && C.$slideEl.length || (C.$slideEl = D(e.target).closest("." + _.params.slideClass), 0 === C.$slideEl.length && (C.$slideEl = _.slides.eq(_.activeIndex)), C.$imageEl = C.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), C.$imageWrapEl = C.$imageEl.parent("." + i.containerClass), C.maxRatio = C.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== C.$imageWrapEl.length) ? (C.$imageEl && C.$imageEl.transition(0), o = !0) : C.$imageEl = void 0
      }

      function h(e) {
          var t = _.support,
              i = _.params.zoom,
              n = _.zoom;
          if (!t.gestures) {
              if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
              r = !0, C.scaleMove = d(e)
          }
          C.$imageEl && 0 !== C.$imageEl.length ? (t.gestures ? n.scale = e.scale * x : n.scale = C.scaleMove / C.scaleStart * x, n.scale > C.maxRatio && (n.scale = C.maxRatio - 1 + (n.scale - C.maxRatio + 1) ** .5), n.scale < i.minRatio && (n.scale = i.minRatio + 1 - (i.minRatio - n.scale + 1) ** .5), C.$imageEl.transform(`translate3d(0,0,0) scale(${n.scale})`)) : "gesturechange" === e.type && u(e)
      }

      function p(e) {
          var t = _.device,
              i = _.support,
              n = _.params.zoom,
              s = _.zoom;
          if (!i.gestures) {
              if (!a || !r) return;
              if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !t.android) return;
              a = !1, r = !1
          }
          C.$imageEl && 0 !== C.$imageEl.length && (s.scale = Math.max(Math.min(s.scale, C.maxRatio), n.minRatio), C.$imageEl.transition(_.params.speed).transform(`translate3d(0,0,0) scale(${s.scale})`), x = s.scale, o = !1, 1 === s.scale) && (C.$slideEl = void 0)
      }

      function m(e) {
          var t = _.zoom;
          if (C.$imageEl && 0 !== C.$imageEl.length && (_.allowClick = !1, T.isTouched) && C.$slideEl) {
              T.isMoved || (T.width = C.$imageEl[0].offsetWidth, T.height = C.$imageEl[0].offsetHeight, T.startX = I(C.$imageWrapEl[0], "x") || 0, T.startY = I(C.$imageWrapEl[0], "y") || 0, C.slideWidth = C.$slideEl[0].offsetWidth, C.slideHeight = C.$slideEl[0].offsetHeight, C.$imageWrapEl.transition(0));
              var i = T.width * t.scale,
                  t = T.height * t.scale;
              if (!(i < C.slideWidth && t < C.slideHeight)) {
                  if (T.minX = Math.min(C.slideWidth / 2 - i / 2, 0), T.maxX = -T.minX, T.minY = Math.min(C.slideHeight / 2 - t / 2, 0), T.maxY = -T.minY, T.touchesCurrent.x = ("touchmove" === e.type ? e.targetTouches[0] : e).pageX, T.touchesCurrent.y = ("touchmove" === e.type ? e.targetTouches[0] : e).pageY, !T.isMoved && !o) {
                      if (_.isHorizontal() && (Math.floor(T.minX) === Math.floor(T.startX) && T.touchesCurrent.x < T.touchesStart.x || Math.floor(T.maxX) === Math.floor(T.startX) && T.touchesCurrent.x > T.touchesStart.x)) return void(T.isTouched = !1);
                      if (!_.isHorizontal() && (Math.floor(T.minY) === Math.floor(T.startY) && T.touchesCurrent.y < T.touchesStart.y || Math.floor(T.maxY) === Math.floor(T.startY) && T.touchesCurrent.y > T.touchesStart.y)) return void(T.isTouched = !1)
                  }
                  e.cancelable && e.preventDefault(), e.stopPropagation(), T.isMoved = !0, T.currentX = T.touchesCurrent.x - T.touchesStart.x + T.startX, T.currentY = T.touchesCurrent.y - T.touchesStart.y + T.startY, T.currentX < T.minX && (T.currentX = T.minX + 1 - (T.minX - T.currentX + 1) ** .8), T.currentX > T.maxX && (T.currentX = T.maxX - 1 + (T.currentX - T.maxX + 1) ** .8), T.currentY < T.minY && (T.currentY = T.minY + 1 - (T.minY - T.currentY + 1) ** .8), T.currentY > T.maxY && (T.currentY = T.maxY - 1 + (T.currentY - T.maxY + 1) ** .8), l.prevPositionX || (l.prevPositionX = T.touchesCurrent.x), l.prevPositionY || (l.prevPositionY = T.touchesCurrent.y), l.prevTime || (l.prevTime = Date.now()), l.x = (T.touchesCurrent.x - l.prevPositionX) / (Date.now() - l.prevTime) / 2, l.y = (T.touchesCurrent.y - l.prevPositionY) / (Date.now() - l.prevTime) / 2, Math.abs(T.touchesCurrent.x - l.prevPositionX) < 2 && (l.x = 0), Math.abs(T.touchesCurrent.y - l.prevPositionY) < 2 && (l.y = 0), l.prevPositionX = T.touchesCurrent.x, l.prevPositionY = T.touchesCurrent.y, l.prevTime = Date.now(), C.$imageWrapEl.transform(`translate3d(${T.currentX}px, ${T.currentY}px,0)`)
              }
          }
      }

      function g() {
          var e = _.zoom;
          C.$slideEl && _.previousIndex !== _.activeIndex && (C.$imageEl && C.$imageEl.transform("translate3d(0,0,0) scale(1)"), C.$imageWrapEl && C.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, x = 1, C.$slideEl = void 0, C.$imageEl = void 0, C.$imageWrapEl = void 0)
      }

      function f(v) {
          var y = _.zoom,
              w = _.params.zoom;
          if (C.$slideEl || (v && v.target && (C.$slideEl = D(v.target).closest("." + _.params.slideClass)), C.$slideEl || (_.params.virtual && _.params.virtual.enabled && _.virtual ? C.$slideEl = _.$wrapperEl.children("." + _.params.slideActiveClass) : C.$slideEl = _.slides.eq(_.activeIndex)), C.$imageEl = C.$slideEl.find("." + w.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), C.$imageWrapEl = C.$imageEl.parent("." + w.containerClass)), C.$imageEl && 0 !== C.$imageEl.length && C.$imageWrapEl && 0 !== C.$imageWrapEl.length) {
              let e, t, i, n, s, a, r, o, l, c, d, u, h, p, m, g, f, b;
              _.params.cssMode && (_.wrapperEl.style.overflow = "hidden", _.wrapperEl.style.touchAction = "none"), C.$slideEl.addClass("" + w.zoomedSlideClass), t = void 0 === T.touchesStart.x && v ? (e = ("touchend" === v.type ? v.changedTouches[0] : v).pageX, ("touchend" === v.type ? v.changedTouches[0] : v).pageY) : (e = T.touchesStart.x, T.touchesStart.y), y.scale = C.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, x = C.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, v ? (f = C.$slideEl[0].offsetWidth, b = C.$slideEl[0].offsetHeight, i = C.$slideEl.offset().left + E.scrollX, n = C.$slideEl.offset().top + E.scrollY, s = i + f / 2 - e, a = n + b / 2 - t, l = C.$imageEl[0].offsetWidth, c = C.$imageEl[0].offsetHeight, d = l * y.scale, u = c * y.scale, m = -(h = Math.min(f / 2 - d / 2, 0)), g = -(p = Math.min(b / 2 - u / 2, 0)), r = s * y.scale, o = a * y.scale, (r = r < h ? h : r) > m && (r = m), (o = o < p ? p : o) > g && (o = g)) : (r = 0, o = 0), C.$imageWrapEl.transition(300).transform(`translate3d(${r}px, ${o}px,0)`), C.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${y.scale})`)
          }
      }

      function b() {
          var e = _.zoom,
              t = _.params.zoom;
          C.$slideEl || (_.params.virtual && _.params.virtual.enabled && _.virtual ? C.$slideEl = _.$wrapperEl.children("." + _.params.slideActiveClass) : C.$slideEl = _.slides.eq(_.activeIndex), C.$imageEl = C.$slideEl.find("." + t.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), C.$imageWrapEl = C.$imageEl.parent("." + t.containerClass)), C.$imageEl && 0 !== C.$imageEl.length && C.$imageWrapEl && 0 !== C.$imageWrapEl.length && (_.params.cssMode && (_.wrapperEl.style.overflow = "", _.wrapperEl.style.touchAction = ""), e.scale = 1, x = 1, C.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), C.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), C.$slideEl.removeClass("" + t.zoomedSlideClass), C.$slideEl = void 0)
      }

      function v(e) {
          var t = _.zoom;
          t.scale && 1 !== t.scale ? b() : f(e)
      }

      function y() {
          var e = _.support;
          return {
              passiveListener: !("touchstart" !== _.touchEvents.start || !e.passiveListener || !_.params.passiveListeners) && {
                  passive: !0,
                  capture: !1
              },
              activeListenerWithCapture: !e.passiveListener || {
                  passive: !1,
                  capture: !0
              }
          }
      }

      function w() {
          return "." + _.params.slideClass
      }

      function S(e) {
          var t = y()["passiveListener"],
              i = w();
          _.$wrapperEl[e]("gesturestart", i, u, t), _.$wrapperEl[e]("gesturechange", i, h, t), _.$wrapperEl[e]("gestureend", i, p, t)
      }

      function k() {
          s || (s = !0, S("on"))
      }

      function M() {
          s && (s = !1, S("off"))
      }

      function A() {
          var e, t, i, n = _.zoom;
          n.enabled || (n.enabled = !0, n = _.support, {
              passiveListener: e,
              activeListenerWithCapture: t
          } = y(), i = w(), n.gestures ? (_.$wrapperEl.on(_.touchEvents.start, k, e), _.$wrapperEl.on(_.touchEvents.end, M, e)) : "touchstart" === _.touchEvents.start && (_.$wrapperEl.on(_.touchEvents.start, i, u, e), _.$wrapperEl.on(_.touchEvents.move, i, h, t), _.$wrapperEl.on(_.touchEvents.end, i, p, e), _.touchEvents.cancel) && _.$wrapperEl.on(_.touchEvents.cancel, i, p, e), _.$wrapperEl.on(_.touchEvents.move, "." + _.params.zoom.containerClass, m, t))
      }

      function N() {
          var e, t, i, n = _.zoom;
          n.enabled && (e = _.support, {
              passiveListener: n,
              activeListenerWithCapture: t
          } = (n.enabled = !1, y()), i = w(), e.gestures ? (_.$wrapperEl.off(_.touchEvents.start, k, n), _.$wrapperEl.off(_.touchEvents.end, M, n)) : "touchstart" === _.touchEvents.start && (_.$wrapperEl.off(_.touchEvents.start, i, u, n), _.$wrapperEl.off(_.touchEvents.move, i, h, t), _.$wrapperEl.off(_.touchEvents.end, i, p, n), _.touchEvents.cancel) && _.$wrapperEl.off(_.touchEvents.cancel, i, p, n), _.$wrapperEl.off(_.touchEvents.move, "." + _.params.zoom.containerClass, m, t))
      }
      Object.defineProperty(_.zoom, "scale", {
          get: () => c,
          set(e) {
              var t, i;
              c !== e && (t = C.$imageEl ? C.$imageEl[0] : void 0, i = C.$slideEl ? C.$slideEl[0] : void 0, n("zoomChange", e, t, i)), c = e
          }
      }), i("init", () => {
          _.params.zoom.enabled && A()
      }), i("destroy", () => {
          N()
      }), i("touchStart", (e, t) => {
          var i;
          _.zoom.enabled && (t = t, i = _.device, C.$imageEl) && 0 !== C.$imageEl.length && !T.isTouched && (i.android && t.cancelable && t.preventDefault(), T.isTouched = !0, T.touchesStart.x = ("touchstart" === t.type ? t.targetTouches[0] : t).pageX, T.touchesStart.y = ("touchstart" === t.type ? t.targetTouches[0] : t).pageY)
      }), i("touchEnd", (e, t) => {
          if (_.zoom.enabled) {
              var i = _.zoom;
              if (C.$imageEl && 0 !== C.$imageEl.length) {
                  if (!T.isTouched || !T.isMoved) return void(T.isTouched = !1, T.isMoved = !1);
                  T.isTouched = !1, T.isMoved = !1;
                  let e = 300,
                      t = 300;
                  var n = l.x * e,
                      n = T.currentX + n,
                      s = l.y * t,
                      s = T.currentY + s,
                      a = (0 !== l.x && (e = Math.abs((n - T.currentX) / l.x)), 0 !== l.y && (t = Math.abs((s - T.currentY) / l.y)), Math.max(e, t)),
                      n = (T.currentX = n, T.currentY = s, T.width * i.scale),
                      s = T.height * i.scale;
                  T.minX = Math.min(C.slideWidth / 2 - n / 2, 0), T.maxX = -T.minX, T.minY = Math.min(C.slideHeight / 2 - s / 2, 0), T.maxY = -T.minY, T.currentX = Math.max(Math.min(T.currentX, T.maxX), T.minX), T.currentY = Math.max(Math.min(T.currentY, T.maxY), T.minY), C.$imageWrapEl.transition(a).transform(`translate3d(${T.currentX}px, ${T.currentY}px,0)`)
              }
          }
      }), i("doubleTap", (e, t) => {
          !_.animating && _.params.zoom.enabled && _.zoom.enabled && _.params.zoom.toggle && v(t)
      }), i("transitionEnd", () => {
          _.zoom.enabled && _.params.zoom.enabled && g()
      }), i("slideChange", () => {
          _.zoom.enabled && _.params.zoom.enabled && _.params.cssMode && g()
      }), Object.assign(_.zoom, {
          enable: A,
          disable: N,
          in: f,
          out: b,
          toggle: v
      })
  }, function(e) {
      let {
          swiper: d,
          extendParams: t,
          on: i,
          emit: u
      } = e, o = (t({
          lazy: {
              checkInView: !1,
              enabled: !1,
              loadPrevNext: !1,
              loadPrevNextAmount: 1,
              loadOnTransitionStart: !1,
              scrollingElement: "",
              elementClass: "swiper-lazy",
              loadingClass: "swiper-lazy-loading",
              loadedClass: "swiper-lazy-loaded",
              preloaderClass: "swiper-lazy-preloader"
          }
      }), !(d.lazy = {})), c = !1;

      function h(e, o) {
          void 0 === o && (o = !0);
          const l = d.params.lazy;
          if (void 0 !== e && 0 !== d.slides.length) {
              const c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children(`.${d.params.slideClass}[data-swiper-slide-index="${e}"]`) : d.slides.eq(e),
                  t = c.find(`.${l.elementClass}:not(.${l.loadedClass}):not(.${l.loadingClass})`);
              !c.hasClass(l.elementClass) || c.hasClass(l.loadedClass) || c.hasClass(l.loadingClass) || t.push(c[0]), 0 !== t.length && t.each(e => {
                  const t = D(e),
                      i = (t.addClass(l.loadingClass), t.attr("data-background")),
                      n = t.attr("data-src"),
                      s = t.attr("data-srcset"),
                      a = t.attr("data-sizes"),
                      r = t.parent("picture");
                  d.loadImage(t[0], n || i, s, a, !1, () => {
                      var e;
                      null == d || !d || d && !d.params || d.destroyed || (i ? (t.css("background-image", `url("${i}")`), t.removeAttr("data-background")) : (s && (t.attr("srcset", s), t.removeAttr("data-srcset")), a && (t.attr("sizes", a), t.removeAttr("data-sizes")), r.length && r.children("source").each(e => {
                          e = D(e);
                          e.attr("data-srcset") && (e.attr("srcset", e.attr("data-srcset")), e.removeAttr("data-srcset"))
                      }), n && (t.attr("src", n), t.removeAttr("data-src"))), t.addClass(l.loadedClass).removeClass(l.loadingClass), c.find("." + l.preloaderClass).remove(), d.params.loop && o && (e = c.attr("data-swiper-slide-index"), c.hasClass(d.params.slideDuplicateClass) ? h(d.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${d.params.slideDuplicateClass})`).index(), !1) : h(d.$wrapperEl.children(`.${d.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)), u("lazyImageReady", c[0], t[0]), d.params.autoHeight && d.updateAutoHeight())
                  }), u("lazyImageLoad", c[0], t[0])
              })
          }
      }

      function l() {
          const {
              $wrapperEl: t,
              params: i,
              slides: n,
              activeIndex: s
          } = d, a = d.virtual && i.virtual.enabled, e = i.lazy;
          let r = i.slidesPerView;

          function o(e) {
              if (a) {
                  if (t.children(`.${i.slideClass}[data-swiper-slide-index="${e}"]`).length) return 1
              } else if (n[e]) return 1
          }

          function l(e) {
              return a ? D(e).attr("data-swiper-slide-index") : D(e).index()
          }
          if ("auto" === r && (r = 0), c = c || !0, d.params.watchSlidesProgress) t.children("." + i.slideVisibleClass).each(e => {
              h(a ? D(e).attr("data-swiper-slide-index") : D(e).index())
          });
          else if (1 < r)
              for (let e = s; e < s + r; e += 1) o(e) && h(e);
          else h(s);
          if (e.loadPrevNext)
              if (1 < r || e.loadPrevNextAmount && 1 < e.loadPrevNextAmount) {
                  const t = e.loadPrevNextAmount,
                      d = Math.ceil(r),
                      i = Math.min(s + d + Math.max(t, d), n.length),
                      a = Math.max(s - Math.max(d, t), 0);
                  for (let e = s + d; e < i; e += 1) o(e) && h(e);
                  for (let e = a; e < s; e += 1) o(e) && h(e)
              } else {
                  const d = t.children("." + i.slideNextClass),
                      n = (0 < d.length && h(l(d)), t.children("." + i.slidePrevClass));
                  0 < n.length && h(l(n))
              }
      }

      function p() {
          var e = O();
          if (d && !d.destroyed) {
              var i = d.params.lazy.scrollingElement ? D(d.params.lazy.scrollingElement) : D(e),
                  n = i[0] === e,
                  s = n ? e.innerWidth : i[0].offsetWidth,
                  a = n ? e.innerHeight : i[0].offsetHeight,
                  n = d.$el.offset(),
                  e = d["rtlTranslate"];
              let t = !1;
              e && (n.left -= d.$el[0].scrollLeft);
              var r = [
                  [n.left, n.top],
                  [n.left + d.width, n.top],
                  [n.left, n.top + d.height],
                  [n.left + d.width, n.top + d.height]
              ];
              for (let e = 0; e < r.length; e += 1) {
                  const d = r[e];
                  0 <= d[0] && d[0] <= s && 0 <= d[1] && d[1] <= a && (0 === d[0] && 0 === d[1] || (t = !0))
              }
              e = !("touchstart" !== d.touchEvents.start || !d.support.passiveListener || !d.params.passiveListeners) && {
                  passive: !0,
                  capture: !1
              };
              t ? (l(), i.off("scroll", p, e)) : o || (o = !0, i.on("scroll", p, e))
          }
      }
      i("beforeInit", () => {
          d.params.lazy.enabled && d.params.preloadImages && (d.params.preloadImages = !1)
      }), i("init", () => {
          d.params.lazy.enabled && (d.params.lazy.checkInView ? p : l)()
      }), i("scroll", () => {
          d.params.freeMode && d.params.freeMode.enabled && !d.params.freeMode.sticky && l()
      }), i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
          d.params.lazy.enabled && (d.params.lazy.checkInView ? p : l)()
      }), i("transitionStart", () => {
          d.params.lazy.enabled && (d.params.lazy.loadOnTransitionStart || !d.params.lazy.loadOnTransitionStart && !c) && (d.params.lazy.checkInView ? p : l)()
      }), i("transitionEnd", () => {
          d.params.lazy.enabled && !d.params.lazy.loadOnTransitionStart && (d.params.lazy.checkInView ? p : l)()
      }), i("slideChange", () => {
          var {
              lazy: e,
              cssMode: t,
              watchSlidesProgress: i,
              touchReleaseOnEdges: n,
              resistanceRatio: s
          } = d.params;
          e.enabled && (t || i && (n || 0 === s)) && l()
      }), i("destroy", () => {
          d.$el && d.$el.find("." + d.params.lazy.loadingClass).removeClass(d.params.lazy.loadingClass)
      }), Object.assign(d.lazy, {
          load: l,
          loadInSlide: h
      })
  }, function(e) {
      let {
          swiper: o,
          extendParams: t,
          on: i
      } = e;

      function l(e, t) {
          const i = function() {
              let i, n, s;
              return (e, t) => {
                  for (n = -1, i = e.length; 1 < i - n;) e[s = i + n >> 1] <= t ? n = s : i = s;
                  return i
              }
          }();
          let n, s;
          return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
              return e ? (s = i(this.x, e), n = s - 1, (e - this.x[n]) * (this.y[s] - this.y[n]) / (this.x[s] - this.x[n]) + this.y[n]) : 0
          }, this
      }

      function n() {
          o.controller.control && o.controller.spline && (o.controller.spline = void 0, delete o.controller.spline)
      }
      t({
          controller: {
              control: void 0,
              inverse: !1,
              by: "slide"
          }
      }), o.controller = {
          control: void 0
      }, i("beforeInit", () => {
          o.controller.control = o.params.controller.control
      }), i("update", () => {
          n()
      }), i("resize", () => {
          n()
      }), i("observerUpdate", () => {
          n()
      }), i("setTranslate", (e, t, i) => {
          o.controller.control && o.controller.setTranslate(t, i)
      }), i("setTransition", (e, t, i) => {
          o.controller.control && o.controller.setTransition(t, i)
      }), Object.assign(o.controller, {
          setTranslate: function(e, t) {
              var i = o.controller.control;
              let n, s;
              var a = o.constructor;

              function r(e) {
                  var t, i = o.rtlTranslate ? -o.translate : o.translate;
                  "slide" === o.params.controller.by && (t = e, o.controller.spline || (o.controller.spline = o.params.loop ? new l(o.slidesGrid, t.slidesGrid) : new l(o.snapGrid, t.snapGrid)), s = -o.controller.spline.interpolate(-i)), s && "container" !== o.params.controller.by || (n = (e.maxTranslate() - e.minTranslate()) / (o.maxTranslate() - o.minTranslate()), s = (i - o.minTranslate()) * n + e.minTranslate()), o.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, o), e.updateActiveIndex(), e.updateSlidesClasses()
              }
              if (Array.isArray(i))
                  for (let e = 0; e < i.length; e += 1) i[e] !== t && i[e] instanceof a && r(i[e]);
              else i instanceof a && t !== i && r(i)
          },
          setTransition: function(t, e) {
              const i = o.constructor,
                  n = o.controller.control;
              let s;

              function a(e) {
                  e.setTransition(t, o), 0 !== t && (e.transitionStart(), e.params.autoHeight && T(() => {
                      e.updateAutoHeight()
                  }), e.$wrapperEl.transitionEnd(() => {
                      n && (e.params.loop && "slide" === o.params.controller.by && e.loopFix(), e.transitionEnd())
                  }))
              }
              if (Array.isArray(n))
                  for (s = 0; s < n.length; s += 1) n[s] !== e && n[s] instanceof i && a(n[s]);
              else n instanceof i && e !== n && a(n)
          }
      })
  }, function(e) {
      let {
          swiper: r,
          extendParams: t,
          on: i
      } = e, o = (t({
          a11y: {
              enabled: !0,
              notificationClass: "swiper-notification",
              prevSlideMessage: "Previous slide",
              nextSlideMessage: "Next slide",
              firstSlideMessage: "This is the first slide",
              lastSlideMessage: "This is the last slide",
              paginationBulletMessage: "Go to slide {{index}}",
              slideLabelMessage: "{{index}} / {{slidesLength}}",
              containerMessage: null,
              containerRoleDescriptionMessage: null,
              itemRoleDescriptionMessage: null,
              slideRole: "group",
              id: null
          }
      }), r.a11y = {
          clicked: !1
      }, null);

      function n(e) {
          var t = o;
          0 !== t.length && (t.html(""), t.html(e))
      }

      function s(e) {
          e.attr("tabIndex", "0")
      }

      function a(e) {
          e.attr("tabIndex", "-1")
      }

      function l(e, t) {
          e.attr("role", t)
      }

      function c(e, t) {
          e.attr("aria-roledescription", t)
      }

      function d(e, t) {
          e.attr("aria-label", t)
      }

      function u(e) {
          e.attr("aria-disabled", !0)
      }

      function h(e) {
          e.attr("aria-disabled", !1)
      }

      function p(e) {
          var t;
          13 !== e.keyCode && 32 !== e.keyCode || (t = r.params.a11y, e = D(e.target), r.navigation && r.navigation.$nextEl && e.is(r.navigation.$nextEl) && (r.isEnd && !r.params.loop || r.slideNext(), r.isEnd ? n(t.lastSlideMessage) : n(t.nextSlideMessage)), r.navigation && r.navigation.$prevEl && e.is(r.navigation.$prevEl) && (r.isBeginning && !r.params.loop || r.slidePrev(), r.isBeginning ? n(t.firstSlideMessage) : n(t.prevSlideMessage)), r.pagination && e.is(M(r.params.pagination.bulletClass)) && e[0].click())
      }

      function m() {
          return r.pagination && r.pagination.bullets && r.pagination.bullets.length
      }

      function g() {
          return m() && r.params.pagination.clickable
      }
      const f = (e, t, i) => {
              s(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", p)), d(e, i), e.attr("aria-controls", t)
          },
          b = () => {
              r.a11y.clicked = !0
          },
          v = () => {
              r.a11y.clicked = !1
          },
          y = e => {
              var t, i;
              r.a11y.clicked || (e = e.target.closest("." + r.params.slideClass)) && r.slides.includes(e) && (t = r.slides.indexOf(e) === r.activeIndex, i = r.params.watchSlidesProgress && r.visibleSlides && r.visibleSlides.includes(e), t || i || (r.isHorizontal() ? r.el.scrollLeft = 0 : r.el.scrollTop = 0, r.slideTo(r.slides.indexOf(e), 0)))
          },
          w = () => {
              const i = r.params.a11y,
                  n = (i.itemRoleDescriptionMessage && c(D(r.slides), i.itemRoleDescriptionMessage), i.slideRole && l(D(r.slides), i.slideRole), (r.params.loop ? r.slides.filter(e => !e.classList.contains(r.params.slideDuplicateClass)) : r.slides).length);
              i.slideLabelMessage && r.slides.each((e, t) => {
                  e = D(e), t = r.params.loop ? parseInt(e.attr("data-swiper-slide-index"), 10) : t;
                  d(e, i.slideLabelMessage.replace(/\{\{index\}\}/, t + 1).replace(/\{\{slidesLength\}\}/, n))
              })
          };
      i("beforeInit", () => {
          o = D(`<span class="${r.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
      }), i("afterInit", () => {
          if (r.params.a11y.enabled) {
              var i = r.params.a11y,
                  n = (r.$el.append(o), r.$el),
                  n = (i.containerRoleDescriptionMessage && c(n, i.containerRoleDescriptionMessage), i.containerMessage && d(n, i.containerMessage), r.$wrapperEl),
                  s = i.id || n.attr("id") || "swiper-wrapper-" + "x".repeat(s = void 0 === (s = 16) ? 16 : s).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)),
                  a = r.params.autoplay && r.params.autoplay.enabled ? "off" : "polite";
              let e, t;
              n.attr("id", s), n.attr("aria-live", a), w(), r.navigation && r.navigation.$nextEl && (e = r.navigation.$nextEl), r.navigation && r.navigation.$prevEl && (t = r.navigation.$prevEl), e && e.length && f(e, s, i.nextSlideMessage), t && t.length && f(t, s, i.prevSlideMessage), g() && r.pagination.$el.on("keydown", M(r.params.pagination.bulletClass), p), r.$el.on("focus", y, !0), r.$el.on("pointerdown", b, !0), r.$el.on("pointerup", v, !0)
          }
      }), i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
          r.params.a11y.enabled && w()
      }), i("fromEdge toEdge afterInit lock unlock", () => {
          var e, t;
          r.params.a11y.enabled && !r.params.loop && !r.params.rewind && r.navigation && ({
              $nextEl: e,
              $prevEl: t
          } = r.navigation, t && 0 < t.length && (r.isBeginning ? (u(t), a) : (h(t), s))(t), e && 0 < e.length) && (r.isEnd ? (u(e), a) : (h(e), s))(e)
      }), i("paginationUpdate", () => {
          if (r.params.a11y.enabled) {
              const t = r.params.a11y;
              m() && r.pagination.bullets.each(e => {
                  e = D(e);
                  r.params.pagination.clickable && (s(e), r.params.pagination.renderBullet || (l(e, "button"), d(e, t.paginationBulletMessage.replace(/\{\{index\}\}/, e.index() + 1)))), e.is("." + r.params.pagination.bulletActiveClass) ? e.attr("aria-current", "true") : e.removeAttr("aria-current")
              })
          }
      }), i("destroy", () => {
          if (r.params.a11y.enabled) {
              let e, t;
              o && 0 < o.length && o.remove(), r.navigation && r.navigation.$nextEl && (e = r.navigation.$nextEl), r.navigation && r.navigation.$prevEl && (t = r.navigation.$prevEl), e && e.off("keydown", p), t && t.off("keydown", p), g() && r.pagination.$el.off("keydown", M(r.params.pagination.bulletClass), p), r.$el.off("focus", y, !0), r.$el.off("pointerdown", b, !0), r.$el.off("pointerup", v, !0)
          }
      })
  }, function(e) {
      let {
          swiper: r,
          extendParams: t,
          on: i
      } = e, a = (t({
          history: {
              enabled: !1,
              root: "",
              replaceState: !1,
              key: "slides",
              keepQuery: !1
          }
      }), !1), n = {};
      const o = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
          s = e => {
              var t = O(),
                  e = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter(e => "" !== e),
                  t = e.length;
              return {
                  key: e[t - 2],
                  value: e[t - 1]
              }
          },
          l = (i, e) => {
              var n = O();
              if (a && r.params.history.enabled) {
                  var s = r.params.url ? new URL(r.params.url) : n.location,
                      e = r.slides.eq(e);
                  let t = o(e.attr("data-history"));
                  if (0 < r.params.history.root.length) {
                      let e = r.params.history.root;
                      "/" === e[e.length - 1] && (e = e.slice(0, e.length - 1)), t = e + `/${i}/` + t
                  } else s.pathname.includes(i) || (t = i + "/" + t);
                  r.params.history.keepQuery && (t += s.search);
                  e = n.history.state;
                  e && e.value === t || (r.params.history.replaceState ? n.history.replaceState({
                      value: t
                  }, null, t) : n.history.pushState({
                      value: t
                  }, null, t))
              }
          },
          c = (i, n, s) => {
              if (n)
                  for (let e = 0, t = r.slides.length; e < t; e += 1) {
                      var a = r.slides.eq(e);
                      if (o(a.attr("data-history")) === n && !a.hasClass(r.params.slideDuplicateClass)) {
                          const n = a.index();
                          r.slideTo(n, i, s)
                      }
                  } else r.slideTo(0, i, s)
          },
          d = () => {
              n = s(r.params.url), c(r.params.speed, n.value, !1)
          };
      i("init", () => {
          var e;
          r.params.history.enabled && (e = O(), r.params.history) && (e.history && e.history.pushState ? (a = !0, ((n = s(r.params.url)).key || n.value) && (c(0, n.value, r.params.runCallbacksOnInit), r.params.history.replaceState || e.addEventListener("popstate", d))) : (r.params.history.enabled = !1, r.params.hashNavigation.enabled = !0))
      }), i("destroy", () => {
          var e;
          r.params.history.enabled && (e = O(), r.params.history.replaceState || e.removeEventListener("popstate", d))
      }), i("transitionEnd _freeModeNoMomentumRelease", () => {
          a && l(r.params.history.key, r.activeIndex)
      }), i("slideChange", () => {
          a && r.params.cssMode && l(r.params.history.key, r.activeIndex)
      })
  }, function(e) {
      let {
          swiper: s,
          extendParams: t,
          emit: i,
          on: n
      } = e, a = !1;
      const r = C(),
          o = O(),
          l = (t({
              hashNavigation: {
                  enabled: !1,
                  replaceState: !1,
                  watchState: !1
              }
          }), () => {
              i("hashChange");
              var e = r.location.hash.replace("#", "");
              e !== s.slides.eq(s.activeIndex).attr("data-hash") && void 0 !== (e = s.$wrapperEl.children(`.${s.params.slideClass}[data-hash="${e}"]`).index()) && s.slideTo(e)
          }),
          c = () => {
              var e;
              a && s.params.hashNavigation.enabled && (s.params.hashNavigation.replaceState && o.history && o.history.replaceState ? o.history.replaceState(null, null, "#" + s.slides.eq(s.activeIndex).attr("data-hash") || "") : (e = (e = s.slides.eq(s.activeIndex)).attr("data-hash") || e.attr("data-history"), r.location.hash = e || ""), i("hashSet"))
          };
      n("init", () => {
          if (s.params.hashNavigation.enabled && !(!s.params.hashNavigation.enabled || s.params.history && s.params.history.enabled)) {
              a = !0;
              const n = r.location.hash.replace("#", "");
              if (n)
                  for (let e = 0, t = s.slides.length; e < t; e += 1) {
                      var i = s.slides.eq(e);
                      if ((i.attr("data-hash") || i.attr("data-history")) === n && !i.hasClass(s.params.slideDuplicateClass)) {
                          const n = i.index();
                          s.slideTo(n, 0, s.params.runCallbacksOnInit, !0)
                      }
                  }
              s.params.hashNavigation.watchState && D(o).on("hashchange", l)
          }
      }), n("destroy", () => {
          s.params.hashNavigation.enabled && s.params.hashNavigation.watchState && D(o).off("hashchange", l)
      }), n("transitionEnd _freeModeNoMomentumRelease", () => {
          a && c()
      }), n("slideChange", () => {
          a && s.params.cssMode && c()
      })
  }, function(e) {
      let i, {
          swiper: n,
          extendParams: t,
          on: s,
          emit: a
      } = e;

      function r() {
          if (n.size) {
              var t = n.slides.eq(n.activeIndex);
              let e = n.params.autoplay.delay;
              t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || n.params.autoplay.delay), clearTimeout(i), i = T(() => {
                  let e;
                  n.params.autoplay.reverseDirection ? n.params.loop ? (n.loopFix(), e = n.slidePrev(n.params.speed, !0, !0), a("autoplay")) : n.isBeginning ? n.params.autoplay.stopOnLastSlide ? l() : (e = n.slideTo(n.slides.length - 1, n.params.speed, !0, !0), a("autoplay")) : (e = n.slidePrev(n.params.speed, !0, !0), a("autoplay")) : n.params.loop ? (n.loopFix(), e = n.slideNext(n.params.speed, !0, !0), a("autoplay")) : n.isEnd ? n.params.autoplay.stopOnLastSlide ? l() : (e = n.slideTo(0, n.params.speed, !0, !0), a("autoplay")) : (e = n.slideNext(n.params.speed, !0, !0), a("autoplay")), (n.params.cssMode && n.autoplay.running || !1 === e) && r()
              }, e)
          } else n.autoplay.running = !1, n.autoplay.paused = !1
      }

      function o() {
          return void 0 === i && !n.autoplay.running && (n.autoplay.running = !0, a("autoplayStart"), r(), !0)
      }

      function l() {
          return !!n.autoplay.running && void 0 !== i && (i && (clearTimeout(i), i = void 0), n.autoplay.running = !1, a("autoplayStop"), !0)
      }

      function c(e) {
          !n.autoplay.running || n.autoplay.paused || (i && clearTimeout(i), n.autoplay.paused = !0, 0 !== e && n.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(e => {
              n.$wrapperEl[0].addEventListener(e, u)
          }) : (n.autoplay.paused = !1, r()))
      }

      function d() {
          var e = C();
          "hidden" === e.visibilityState && n.autoplay.running && c(), "visible" === e.visibilityState && n.autoplay.paused && (r(), n.autoplay.paused = !1)
      }

      function u(e) {
          n && !n.destroyed && n.$wrapperEl && e.target === n.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(e => {
              n.$wrapperEl[0].removeEventListener(e, u)
          }), n.autoplay.paused = !1, (n.autoplay.running ? r : l)())
      }

      function h() {
          (n.params.autoplay.disableOnInteraction ? l : (a("autoplayPause"), c))(), ["transitionend", "webkitTransitionEnd"].forEach(e => {
              n.$wrapperEl[0].removeEventListener(e, u)
          })
      }

      function p() {
          n.params.autoplay.disableOnInteraction || (n.autoplay.paused = !1, a("autoplayResume"), r())
      }
      n.autoplay = {
          running: !1,
          paused: !1
      }, t({
          autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !0,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1
          }
      }), s("init", () => {
          n.params.autoplay.enabled && (o(), C().addEventListener("visibilitychange", d), n.params.autoplay.pauseOnMouseEnter) && (n.$el.on("mouseenter", h), n.$el.on("mouseleave", p))
      }), s("beforeTransitionStart", (e, t, i) => {
          n.autoplay.running && (i || !n.params.autoplay.disableOnInteraction ? n.autoplay.pause(t) : l())
      }), s("sliderFirstMove", () => {
          n.autoplay.running && (n.params.autoplay.disableOnInteraction ? l : c)()
      }), s("touchEnd", () => {
          n.params.cssMode && n.autoplay.paused && !n.params.autoplay.disableOnInteraction && r()
      }), s("destroy", () => {
          n.$el.off("mouseenter", h), n.$el.off("mouseleave", p), n.autoplay.running && l(), C().removeEventListener("visibilitychange", d)
      }), Object.assign(n.autoplay, {
          pause: c,
          run: r,
          start: o,
          stop: l
      })
  }, function(e) {
      let {
          swiper: l,
          extendParams: t,
          on: i
      } = e, n = (t({
          thumbs: {
              swiper: null,
              multipleActiveThumbs: !0,
              autoScrollOffset: 0,
              slideThumbActiveClass: "swiper-slide-thumb-active",
              thumbsContainerClass: "swiper-thumbs"
          }
      }), !1), s = !1;

      function a() {
          var e = l.thumbs.swiper;
          if (e && !e.destroyed) {
              const i = e.clickedIndex,
                  n = e.clickedSlide;
              if (!(n && D(n).hasClass(l.params.thumbs.slideThumbActiveClass) || null == i)) {
                  let t;
                  if (t = e.params.loop ? parseInt(D(e.clickedSlide).attr("data-swiper-slide-index"), 10) : i, l.params.loop) {
                      let e = l.activeIndex;
                      l.slides.eq(e).hasClass(l.params.slideDuplicateClass) && (l.loopFix(), l._clientLeft = l.$wrapperEl[0].clientLeft, e = l.activeIndex);
                      const i = l.slides.eq(e).prevAll(`[data-swiper-slide-index="${t}"]`).eq(0).index(),
                          n = l.slides.eq(e).nextAll(`[data-swiper-slide-index="${t}"]`).eq(0).index();
                      t = void 0 === i || void 0 !== n && n - e < e - i ? n : i
                  }
                  l.slideTo(t)
              }
          }
      }

      function r() {
          var e = l.params["thumbs"];
          if (n) return !1;
          n = !0;
          var t = l.constructor;
          return e.swiper instanceof t ? (l.thumbs.swiper = e.swiper, Object.assign(l.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1
          }), Object.assign(l.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1
          })) : c(e.swiper) && (e = Object.assign({}, e.swiper), Object.assign(e, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1
          }), l.thumbs.swiper = new t(e), s = !0), l.thumbs.swiper.$el.addClass(l.params.thumbs.thumbsContainerClass), l.thumbs.swiper.on("tap", a), !0
      }

      function o(n) {
          var s = l.thumbs.swiper;
          if (s && !s.destroyed) {
              const o = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView;
              let t = 1;
              var i = l.params.thumbs.slideThumbActiveClass;
              if (1 < l.params.slidesPerView && !l.params.centeredSlides && (t = l.params.slidesPerView), l.params.thumbs.multipleActiveThumbs || (t = 1), t = Math.floor(t), s.slides.removeClass(i), s.params.loop || s.params.virtual && s.params.virtual.enabled)
                  for (let e = 0; e < t; e += 1) s.$wrapperEl.children(`[data-swiper-slide-index="${l.realIndex + e}"]`).addClass(i);
              else
                  for (let e = 0; e < t; e += 1) s.slides.eq(l.realIndex + e).addClass(i);
              var a = l.params.thumbs.autoScrollOffset,
                  r = a && !s.params.loop;
              if (l.realIndex !== s.realIndex || r) {
                  let e, t, i = s.activeIndex;
                  if (s.params.loop) {
                      s.slides.eq(i).hasClass(s.params.slideDuplicateClass) && (s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft, i = s.activeIndex);
                      const n = s.slides.eq(i).prevAll(`[data-swiper-slide-index="${l.realIndex}"]`).eq(0).index(),
                          o = s.slides.eq(i).nextAll(`[data-swiper-slide-index="${l.realIndex}"]`).eq(0).index();
                      e = void 0 === n ? o : void 0 === o ? n : o - i == i - n ? 1 < s.params.slidesPerGroup ? o : i : o - i < i - n ? o : n, t = l.activeIndex > l.previousIndex ? "next" : "prev"
                  } else e = l.realIndex, t = e > l.previousIndex ? "next" : "prev";
                  r && (e += "next" === t ? a : -1 * a), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(e) < 0 && (s.params.centeredSlides ? e = e > i ? e - Math.floor(o / 2) + 1 : e + Math.floor(o / 2) - 1 : e > i && s.params.slidesPerGroup, s.slideTo(e, n ? 0 : void 0))
              }
          }
      }
      l.thumbs = {
          swiper: null
      }, i("beforeInit", () => {
          var e = l.params["thumbs"];
          e && e.swiper && (r(), o(!0))
      }), i("slideChange update resize observerUpdate", () => {
          o()
      }), i("setTransition", (e, t) => {
          var i = l.thumbs.swiper;
          i && !i.destroyed && i.setTransition(t)
      }), i("beforeDestroy", () => {
          var e = l.thumbs.swiper;
          e && !e.destroyed && s && e.destroy()
      }), Object.assign(l.thumbs, {
          init: r,
          update: o
      })
  }, function(e) {
      let {
          swiper: h,
          extendParams: t,
          emit: p,
          once: m
      } = e;
      t({
          freeMode: {
              enabled: !1,
              momentum: !0,
              momentumRatio: 1,
              momentumBounce: !0,
              momentumBounceRatio: 1,
              momentumVelocityRatio: 1,
              sticky: !1,
              minimumVelocity: .02
          }
      }), Object.assign(h, {
          freeMode: {
              onTouchStart: function() {
                  var e = h.getTranslate();
                  h.setTranslate(e), h.setTransition(0), h.touchEventsData.velocities.length = 0, h.freeMode.onTouchEnd({
                      currentPos: h.rtl ? h.translate : -h.translate
                  })
              },
              onTouchMove: function() {
                  var {
                      touchEventsData: e,
                      touches: t
                  } = h;
                  0 === e.velocities.length && e.velocities.push({
                      position: t[h.isHorizontal() ? "startX" : "startY"],
                      time: e.touchStartTime
                  }), e.velocities.push({
                      position: t[h.isHorizontal() ? "currentX" : "currentY"],
                      time: b()
                  })
              },
              onTouchEnd: function(a) {
                  let r = a["currentPos"];
                  const {
                      params: o,
                      $wrapperEl: l,
                      rtlTranslate: c,
                      snapGrid: d,
                      touchEventsData: u
                  } = h, e = b() - u.touchStartTime;
                  if (r < -h.minTranslate()) h.slideTo(h.activeIndex);
                  else if (r > -h.maxTranslate()) h.slides.length < d.length ? h.slideTo(d.length - 1) : h.slideTo(h.slides.length - 1);
                  else {
                      if (o.freeMode.momentum) {
                          if (1 < u.velocities.length) {
                              const a = u.velocities.pop(),
                                  r = u.velocities.pop(),
                                  p = a.position - r.position,
                                  m = a.time - r.time;
                              h.velocity = p / m, h.velocity /= 2, Math.abs(h.velocity) < o.freeMode.minimumVelocity && (h.velocity = 0), (150 < m || 300 < b() - a.time) && (h.velocity = 0)
                          } else h.velocity = 0;
                          h.velocity *= o.freeMode.momentumVelocityRatio, u.velocities.length = 0;
                          let e = 1e3 * o.freeMode.momentumRatio;
                          const r = h.velocity * e;
                          let i = h.translate + r;
                          c && (i = -i);
                          let t, n = !1;
                          a = 20 * Math.abs(h.velocity) * o.freeMode.momentumBounceRatio;
                          let s;
                          if (i < h.maxTranslate()) o.freeMode.momentumBounce ? (i + h.maxTranslate() < -a && (i = h.maxTranslate() - a), t = h.maxTranslate(), n = !0, u.allowMomentumBounce = !0) : i = h.maxTranslate(), o.loop && o.centeredSlides && (s = !0);
                          else if (i > h.minTranslate()) o.freeMode.momentumBounce ? (i - h.minTranslate() > a && (i = h.minTranslate() + a), t = h.minTranslate(), n = !0, u.allowMomentumBounce = !0) : i = h.minTranslate(), o.loop && o.centeredSlides && (s = !0);
                          else if (o.freeMode.sticky) {
                              let t;
                              for (let e = 0; e < d.length; e += 1)
                                  if (d[e] > -i) {
                                      t = e;
                                      break
                                  }
                              i = -(i = Math.abs(d[t] - i) < Math.abs(d[t - 1] - i) || "next" === h.swipeDirection ? d[t] : d[t - 1])
                          }
                          if (s && m("transitionEnd", () => {
                                  h.loopFix()
                              }), 0 !== h.velocity) {
                              if (e = c ? Math.abs((-i - h.translate) / h.velocity) : Math.abs((i - h.translate) / h.velocity), o.freeMode.sticky) {
                                  const r = Math.abs((c ? -i : i) - h.translate),
                                      p = h.slidesSizesGrid[h.activeIndex];
                                  e = r < p ? o.speed : r < 2 * p ? 1.5 * o.speed : 2.5 * o.speed
                              }
                          } else if (o.freeMode.sticky) return void h.slideToClosest();
                          o.freeMode.momentumBounce && n ? (h.updateProgress(t), h.setTransition(e), h.setTranslate(i), h.transitionStart(!0, h.swipeDirection), h.animating = !0, l.transitionEnd(() => {
                              h && !h.destroyed && u.allowMomentumBounce && (p("momentumBounce"), h.setTransition(o.speed), setTimeout(() => {
                                  h.setTranslate(t), l.transitionEnd(() => {
                                      h && !h.destroyed && h.transitionEnd()
                                  })
                              }, 0))
                          })) : h.velocity ? (p("_freeModeNoMomentumRelease"), h.updateProgress(i), h.setTransition(e), h.setTranslate(i), h.transitionStart(!0, h.swipeDirection), h.animating || (h.animating = !0, l.transitionEnd(() => {
                              h && !h.destroyed && h.transitionEnd()
                          }))) : h.updateProgress(i), h.updateActiveIndex(), h.updateSlidesClasses()
                      } else {
                          if (o.freeMode.sticky) return void h.slideToClosest();
                          o.freeMode && p("_freeModeNoMomentumRelease")
                      }(!o.freeMode.momentum || e >= o.longSwipesMs) && (h.updateProgress(), h.updateActiveIndex(), h.updateSlidesClasses())
                  }
              }
          }
      })
  }, function(e) {
      let u, h, p, {
          swiper: m,
          extendParams: t
      } = e;
      t({
          grid: {
              rows: 1,
              fill: "column"
          }
      }), m.grid = {
          initSlides: e => {
              var t = m.params["slidesPerView"],
                  {
                      rows: i,
                      fill: n
                  } = m.params.grid;
              h = u / i, p = Math.floor(e / i), u = Math.floor(e / i) === e / i ? e : Math.ceil(e / i) * i, "auto" !== t && "row" === n && (u = Math.max(u, t * i))
          },
          updateSlide: (e, t, i, n) => {
              var {
                  slidesPerGroup: s,
                  spaceBetween: a
              } = m.params, {
                  rows: r,
                  fill: o
              } = m.params.grid;
              let l, c, d;
              if ("row" === o && 1 < s) {
                  const h = Math.floor(e / (s * r)),
                      p = e - r * s * h,
                      m = 0 === h ? s : Math.min(Math.ceil((i - h * r * s) / r), s);
                  d = Math.floor(p / m), l = (c = p - d * m + h * s) + d * u / r, t.css({
                      "-webkit-order": l,
                      order: l
                  })
              } else "column" === o ? (c = Math.floor(e / r), d = e - c * r, (c > p || c === p && d === r - 1) && (d += 1) >= r && (d = 0, c += 1)) : (d = Math.floor(e / h), c = e - d * h);
              t.css(n("margin-top"), 0 !== d ? a && a + "px" : "")
          },
          updateWrapperSize: (i, n, e) => {
              var {
                  spaceBetween: t,
                  centeredSlides: s,
                  roundLengths: a
              } = m.params, r = m.params.grid["rows"];
              if (m.virtualSize = (i + t) * u, m.virtualSize = Math.ceil(m.virtualSize / r) - t, m.$wrapperEl.css({
                      [e("width")]: m.virtualSize + t + "px"
                  }), s) {
                  n.splice(0, n.length);
                  const i = [];
                  for (let t = 0; t < n.length; t += 1) {
                      let e = n[t];
                      a && (e = Math.floor(e)), n[t] < m.virtualSize + n[0] && i.push(e)
                  }
                  n.push(...i)
              }
          }
      }
  }, function(e) {
      e = e.swiper;
      Object.assign(e, {
          appendSlide: function(t) {
              var {
                  $wrapperEl: i,
                  params: e
              } = this;
              if (e.loop && this.loopDestroy(), "object" == typeof t && "length" in t)
                  for (let e = 0; e < t.length; e += 1) t[e] && i.append(t[e]);
              else i.append(t);
              e.loop && this.loopCreate(), e.observer || this.update()
          }.bind(e),
          prependSlide: function(t) {
              var {
                  params: e,
                  $wrapperEl: i,
                  activeIndex: n
              } = this;
              e.loop && this.loopDestroy();
              let s = n + 1;
              if ("object" == typeof t && "length" in t) {
                  for (let e = 0; e < t.length; e += 1) t[e] && i.prepend(t[e]);
                  s = n + t.length
              } else i.prepend(t);
              e.loop && this.loopCreate(), e.observer || this.update(), this.slideTo(s, 0, !1)
          }.bind(e),
          addSlide: function(t, i) {
              var n = this,
                  {
                      $wrapperEl: s,
                      params: a,
                      activeIndex: r
                  } = n;
              let o = r;
              if (a.loop && (o -= n.loopedSlides, n.loopDestroy(), n.slides = s.children("." + a.slideClass)), r = n.slides.length, t <= 0) n.prependSlide(i);
              else if (r <= t) n.appendSlide(i);
              else {
                  let e = o > t ? o + 1 : o;
                  var l = [];
                  for (let e = r - 1; e >= t; --e) {
                      const t = n.slides.eq(e);
                      t.remove(), l.unshift(t)
                  }
                  if ("object" == typeof i && "length" in i) {
                      for (let e = 0; e < i.length; e += 1) i[e] && s.append(i[e]);
                      e = o > t ? o + i.length : o
                  } else s.append(i);
                  for (let e = 0; e < l.length; e += 1) s.append(l[e]);
                  a.loop && n.loopCreate(), a.observer || n.update(), a.loop ? n.slideTo(e + n.loopedSlides, 0, !1) : n.slideTo(e, 0, !1)
              }
          }.bind(e),
          removeSlide: function(t) {
              var i = this,
                  {
                      params: e,
                      $wrapperEl: n,
                      activeIndex: s
                  } = i;
              let a = s;
              e.loop && (a -= i.loopedSlides, i.loopDestroy(), i.slides = n.children("." + e.slideClass));
              let r, o = a;
              if ("object" == typeof t && "length" in t)
                  for (let e = 0; e < t.length; e += 1) r = t[e], i.slides[r] && i.slides.eq(r).remove(), r < o && --o;
              else r = t, i.slides[r] && i.slides.eq(r).remove(), r < o && --o;
              o = Math.max(o, 0), e.loop && i.loopCreate(), e.observer || i.update(), e.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1)
          }.bind(e),
          removeAllSlides: function() {
              var t = [];
              for (let e = 0; e < this.slides.length; e += 1) t.push(e);
              this.removeSlide(t)
          }.bind(e)
      })
  }, function(e) {
      let {
          swiper: r,
          extendParams: t,
          on: i
      } = e;
      t({
          fadeEffect: {
              crossFade: !1,
              transformEl: null
          }
      }), A({
          effect: "fade",
          swiper: r,
          on: i,
          setTranslate: () => {
              const n = r["slides"],
                  s = r.params.fadeEffect;
              for (let i = 0; i < n.length; i += 1) {
                  const n = r.slides.eq(i);
                  let e = -n[0].swiperSlideOffset,
                      t = (r.params.virtualTranslate || (e -= r.translate), 0);
                  r.isHorizontal() || (t = e, e = 0);
                  var a = r.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(n[0].progress), 0) : 1 + Math.min(Math.max(n[0].progress, -1), 0);
                  N(s, n).css({
                      opacity: a
                  }).transform(`translate3d(${e}px, ${t}px, 0px)`)
              }
          },
          setTransition: e => {
              var t = r.params.fadeEffect["transformEl"];
              (t ? r.slides.find(t) : r.slides).transition(e), L({
                  swiper: r,
                  duration: e,
                  transformEl: t,
                  allSlides: !0
              })
          },
          overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !r.params.cssMode
          })
      })
  }, function(e) {
      let {
          swiper: g,
          extendParams: t,
          on: i
      } = e;
      t({
          cubeEffect: {
              slideShadows: !0,
              shadow: !0,
              shadowOffset: 20,
              shadowScale: .94
          }
      });
      const f = (e, t, i) => {
          let n = i ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
              s = i ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
          0 === n.length && (n = D(`<div class="swiper-slide-shadow-${i ? "left" : "top"}"></div>`), e.append(n)), 0 === s.length && (s = D(`<div class="swiper-slide-shadow-${i ? "right" : "bottom"}"></div>`), e.append(s)), n.length && (n[0].style.opacity = Math.max(-t, 0)), s.length && (s[0].style.opacity = Math.max(t, 0))
      };
      A({
          effect: "cube",
          swiper: g,
          on: i,
          setTranslate: () => {
              const {
                  $el: e,
                  $wrapperEl: t,
                  slides: o,
                  width: i,
                  height: n,
                  rtlTranslate: l,
                  size: c,
                  browser: s
              } = g, d = g.params.cubeEffect, u = g.isHorizontal(), h = g.virtual && g.params.virtual.enabled;
              let a, p = 0;
              d.shadow && (u ? (0 === (a = t.find(".swiper-cube-shadow")).length && (a = D('<div class="swiper-cube-shadow"></div>'), t.append(a)), a.css({
                  height: i + "px"
              })) : 0 === (a = e.find(".swiper-cube-shadow")).length && (a = D('<div class="swiper-cube-shadow"></div>'), e.append(a)));
              for (let r = 0; r < o.length; r += 1) {
                  const g = o.eq(r);
                  let e = r,
                      t = 90 * (e = h ? parseInt(g.attr("data-swiper-slide-index"), 10) : e),
                      i = Math.floor(t / 360);
                  l && (t = -t, i = Math.floor(-t / 360));
                  const D = Math.max(Math.min(g[0].progress, 1), -1);
                  let n = 0,
                      s = 0,
                      a = 0;
                  e % 4 == 0 ? (n = 4 * -i * c, a = 0) : (e - 1) % 4 == 0 ? (n = 0, a = 4 * -i * c) : (e - 2) % 4 == 0 ? (n = c + 4 * i * c, a = c) : (e - 3) % 4 == 0 && (n = -c, a = 3 * c + 4 * c * i), l && (n = -n), u || (s = n, n = 0);
                  var m = `rotateX(${u ? 0 : -t}deg) rotateY(${u ? t : 0}deg) translate3d(${n}px, ${s}px, ${a}px)`;
                  D <= 1 && -1 < D && (p = 90 * e + 90 * D, l) && (p = 90 * -e - 90 * D), g.transform(m), d.slideShadows && f(g, D, u)
              }
              if (t.css({
                      "-webkit-transform-origin": `50% 50% -${c / 2}px`,
                      "transform-origin": `50% 50% -${c / 2}px`
                  }), d.shadow)
                  if (u) a.transform(`translate3d(0px, ${i / 2 + d.shadowOffset}px, ${-i / 2}px) rotateX(90deg) rotateZ(0deg) scale(${d.shadowScale})`);
                  else {
                      const e = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
                          g = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
                          t = d.shadowScale,
                          o = d.shadowScale / g,
                          f = d.shadowOffset;
                      a.transform(`scale3d(${t}, 1, ${o}) translate3d(0px, ${n / 2 + f}px, ${-n / 2 / o}px) rotateX(-90deg)`)
                  }
              var r = s.isSafari || s.isWebView ? -c / 2 : 0;
              t.transform(`translate3d(0px,0,${r}px) rotateX(${g.isHorizontal() ? 0 : p}deg) rotateY(${g.isHorizontal() ? -p : 0}deg)`), t[0].style.setProperty("--swiper-cube-translate-z", r + "px")
          },
          setTransition: e => {
              var {
                  $el: t,
                  slides: i
              } = g;
              i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), g.params.cubeEffect.shadow && !g.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
          },
          recreateShadows: () => {
              const i = g.isHorizontal();
              g.slides.each(e => {
                  var t = Math.max(Math.min(e.progress, 1), -1);
                  f(D(e), t, i)
              })
          },
          getEffectParams: () => g.params.cubeEffect,
          perspective: () => !0,
          overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0
          })
      })
  }, function(e) {
      let {
          swiper: u,
          extendParams: t,
          on: i
      } = e;
      t({
          flipEffect: {
              slideShadows: !0,
              limitRotation: !0,
              transformEl: null
          }
      });
      const h = (e, t, i) => {
          let n = u.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
              s = u.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
          0 === n.length && (n = $(i, e, u.isHorizontal() ? "left" : "top")), 0 === s.length && (s = $(i, e, u.isHorizontal() ? "right" : "bottom")), n.length && (n[0].style.opacity = Math.max(-t, 0)), s.length && (s[0].style.opacity = Math.max(t, 0))
      };
      A({
          effect: "flip",
          swiper: u,
          on: i,
          setTranslate: () => {
              var {
                  slides: r,
                  rtlTranslate: o
              } = u, l = u.params.flipEffect;
              for (let a = 0; a < r.length; a += 1) {
                  var c = r.eq(a);
                  let e = c[0].progress;
                  u.params.flipEffect.limitRotation && (e = Math.max(Math.min(c[0].progress, 1), -1));
                  var d = c[0].swiperSlideOffset;
                  let t = -180 * e,
                      i = 0,
                      n = u.params.cssMode ? -d - u.translate : -d,
                      s = 0;
                  u.isHorizontal() ? o && (t = -t) : (s = n, n = 0, i = -t, t = 0), c[0].style.zIndex = -Math.abs(Math.round(e)) + r.length, l.slideShadows && h(c, e, l);
                  d = `translate3d(${n}px, ${s}px, 0px) rotateX(${i}deg) rotateY(${t}deg)`;
                  N(l, c).transform(d)
              }
          },
          setTransition: e => {
              var t = u.params.flipEffect["transformEl"];
              (t ? u.slides.find(t) : u.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), L({
                  swiper: u,
                  duration: e,
                  transformEl: t
              })
          },
          recreateShadows: () => {
              const n = u.params.flipEffect;
              u.slides.each(e => {
                  var t = D(e);
                  let i = t[0].progress;
                  u.params.flipEffect.limitRotation && (i = Math.max(Math.min(e.progress, 1), -1)), h(t, i, n)
              })
          },
          getEffectParams: () => u.params.flipEffect,
          perspective: () => !0,
          overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !u.params.cssMode
          })
      })
  }, function(e) {
      let {
          swiper: y,
          extendParams: t,
          on: i
      } = e;
      t({
          coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              scale: 1,
              modifier: 1,
              slideShadows: !0,
              transformEl: null
          }
      }), A({
          effect: "coverflow",
          swiper: y,
          on: i,
          setTranslate: () => {
              const {
                  width: e,
                  height: l,
                  slides: c,
                  slidesSizesGrid: d
              } = y, u = y.params.coverflowEffect, h = y.isHorizontal(), p = y.translate, m = h ? e / 2 - p : l / 2 - p, g = h ? u.rotate : -u.rotate, f = u.depth;
              for (let o = 0, e = c.length; o < e; o += 1) {
                  const y = c.eq(o),
                      l = d[o],
                      p = (m - y[0].swiperSlideOffset - l / 2) / l,
                      v = "function" == typeof u.modifier ? u.modifier(p) : p * u.modifier;
                  let e = h ? g * v : 0,
                      t = h ? 0 : g * v,
                      i = -f * Math.abs(v),
                      n = u.stretch,
                      s = ("string" == typeof n && -1 !== n.indexOf("%") && (n = parseFloat(u.stretch) / 100 * l), h ? 0 : n * v),
                      a = h ? n * v : 0,
                      r = 1 - (1 - u.scale) * Math.abs(v);
                  Math.abs(a) < .001 && (a = 0), Math.abs(s) < .001 && (s = 0), Math.abs(i) < .001 && (i = 0), Math.abs(e) < .001 && (e = 0), Math.abs(t) < .001 && (t = 0), Math.abs(r) < .001 && (r = 0);
                  var b = `translate3d(${a}px,${s}px,${i}px)  rotateX(${t}deg) rotateY(${e}deg) scale(${r})`;
                  if (N(u, y).transform(b), y[0].style.zIndex = 1 - Math.abs(Math.round(v)), u.slideShadows) {
                      let e = h ? y.find(".swiper-slide-shadow-left") : y.find(".swiper-slide-shadow-top"),
                          t = h ? y.find(".swiper-slide-shadow-right") : y.find(".swiper-slide-shadow-bottom");
                      0 === e.length && (e = $(u, y, h ? "left" : "top")), 0 === t.length && (t = $(u, y, h ? "right" : "bottom")), e.length && (e[0].style.opacity = 0 < v ? v : 0), t.length && (t[0].style.opacity = 0 < -v ? -v : 0)
                  }
              }
          },
          setTransition: e => {
              var t = y.params.coverflowEffect["transformEl"];
              (t ? y.slides.find(t) : y.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
          },
          perspective: () => !0,
          overwriteParams: () => ({
              watchSlidesProgress: !0
          })
      })
  }, function(e) {
      let {
          swiper: v,
          extendParams: t,
          on: i
      } = e;
      t({
          creativeEffect: {
              transformEl: null,
              limitProgress: 1,
              shadowPerProgress: !1,
              progressMultiplier: 1,
              perspective: !0,
              prev: {
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                  opacity: 1,
                  scale: 1
              },
              next: {
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                  opacity: 1,
                  scale: 1
              }
          }
      });
      A({
          effect: "creative",
          swiper: v,
          on: i,
          setTranslate: () => {
              const {
                  slides: s,
                  $wrapperEl: e,
                  slidesSizesGrid: a
              } = v, r = v.params.creativeEffect, o = r["progressMultiplier"], l = v.params.centeredSlides;
              if (l) {
                  const s = a[0] / 2 - v.params.slidesOffsetBefore || 0;
                  e.transform(`translateX(calc(50% - ${s}px))`)
              }
              for (let n = 0; n < s.length; n += 1) {
                  const a = s.eq(n),
                      p = a[0].progress,
                      m = Math.min(Math.max(a[0].progress, -r.limitProgress), r.limitProgress);
                  let e = m;
                  l || (e = Math.min(Math.max(a[0].originalProgress, -r.limitProgress), r.limitProgress));
                  const g = a[0].swiperSlideOffset,
                      f = [v.params.cssMode ? -g - v.translate : -g, 0, 0],
                      b = [0, 0, 0];
                  let t = !1,
                      i = (v.isHorizontal() || (f[1] = f[0], f[0] = 0), {
                          translate: [0, 0, 0],
                          rotate: [0, 0, 0],
                          scale: 1,
                          opacity: 1
                      });
                  m < 0 ? (i = r.next, t = !0) : 0 < m && (i = r.prev, t = !0), f.forEach((e, t) => {
                      f[t] = `calc(${e}px + (${e = i.translate[t], "string" == typeof e ? e : e + "px"} * ${Math.abs(m * o)}))`
                  }), b.forEach((e, t) => {
                      b[t] = i.rotate[t] * Math.abs(m * o)
                  }), a[0].style.zIndex = -Math.abs(Math.round(p)) + s.length;
                  var c = f.join(", "),
                      d = `rotateX(${b[0]}deg) rotateY(${b[1]}deg) rotateZ(${b[2]}deg)`,
                      u = e < 0 ? `scale(${1 + (1 - i.scale) * e * o})` : `scale(${1 - (1 - i.scale) * e * o})`,
                      h = e < 0 ? 1 + (1 - i.opacity) * e * o : 1 - (1 - i.opacity) * e * o,
                      c = `translate3d(${c}) ${d} ` + u;
                  if (t && i.shadow || !t) {
                      let e = a.children(".swiper-slide-shadow");
                      if ((e = 0 === e.length && i.shadow ? $(r, a) : e).length) {
                          const v = r.shadowPerProgress ? m * (1 / r.limitProgress) : m;
                          e[0].style.opacity = Math.min(Math.max(Math.abs(v), 0), 1)
                      }
                  }
                  d = N(r, a);
                  d.transform(c).css({
                      opacity: h
                  }), i.origin && d.css("transform-origin", i.origin)
              }
          },
          setTransition: e => {
              var t = v.params.creativeEffect["transformEl"];
              (t ? v.slides.find(t) : v.slides).transition(e).find(".swiper-slide-shadow").transition(e), L({
                  swiper: v,
                  duration: e,
                  transformEl: t,
                  allSlides: !0
              })
          },
          perspective: () => v.params.creativeEffect.perspective,
          overwriteParams: () => ({
              watchSlidesProgress: !0,
              virtualTranslate: !v.params.cssMode
          })
      })
  }, function(e) {
      let {
          swiper: y,
          extendParams: t,
          on: i
      } = e;
      t({
          cardsEffect: {
              slideShadows: !0,
              transformEl: null,
              rotate: !0,
              perSlideRotate: 2,
              perSlideOffset: 8
          }
      }), A({
          effect: "cards",
          swiper: y,
          on: i,
          setTranslate: () => {
              const {
                  slides: o,
                  activeIndex: l
              } = y, c = y.params.cardsEffect, {
                  startTranslate: d,
                  isTouched: u
              } = y.touchEventsData, h = y.translate;
              for (let r = 0; r < o.length; r += 1) {
                  var p = o.eq(r),
                      m = p[0].progress,
                      g = Math.min(Math.max(m, -4), 4);
                  let e = p[0].swiperSlideOffset,
                      t = (y.params.centeredSlides && !y.params.cssMode && y.$wrapperEl.transform(`translateX(${y.minTranslate()}px)`), y.params.centeredSlides && y.params.cssMode && (e -= o[0].swiperSlideOffset), y.params.cssMode ? -e - y.translate : -e),
                      i = 0;
                  var f = -100 * Math.abs(g);
                  let n = 1,
                      s = -c.perSlideRotate * g,
                      a = c.perSlideOffset - .75 * Math.abs(g);
                  var b = y.virtual && y.params.virtual.enabled ? y.virtual.from + r : r,
                      v = (b === l || b === l - 1) && 0 < g && g < 1 && (u || y.params.cssMode) && h < d,
                      b = (b === l || b === l + 1) && g < 0 && -1 < g && (u || y.params.cssMode) && d < h;
                  if (v || b) {
                      const o = (1 - Math.abs((Math.abs(g) - .5) / .5)) ** .5;
                      s += -28 * g * o, n += -.5 * o, a += 96 * o, i = -25 * o * Math.abs(g) + "%"
                  }
                  if (t = g < 0 ? `calc(${t}px + (${a * Math.abs(g)}%))` : 0 < g ? `calc(${t}px + (-${a * Math.abs(g)}%))` : t + "px", !y.isHorizontal()) {
                      const o = i;
                      i = t, t = o
                  }
                  v = g < 0 ? "" + (1 + (1 - n) * g) : "" + (1 - (1 - n) * g), b = `
      translate3d(${t}, ${i}, ${f}px)
      rotateZ(${c.rotate ? s : 0}deg)
      scale(${v})
    `;
                  if (c.slideShadows) {
                      let e = p.find(".swiper-slide-shadow");
                      (e = 0 === e.length ? $(c, p) : e).length && (e[0].style.opacity = Math.min(Math.max((Math.abs(g) - .5) / .5, 0), 1))
                  }
                  p[0].style.zIndex = -Math.abs(Math.round(m)) + o.length, N(c, p).transform(b)
              }
          },
          setTransition: e => {
              var t = y.params.cardsEffect["transformEl"];
              (t ? y.slides.find(t) : y.slides).transition(e).find(".swiper-slide-shadow").transition(e), L({
                  swiper: y,
                  duration: e,
                  transformEl: t
              })
          },
          perspective: () => !0,
          overwriteParams: () => ({
              watchSlidesProgress: !0,
              virtualTranslate: !y.params.cssMode
          })
      })
  }]), x
});
"use strict";
var theme = {
  init: function() {
      theme.bgImage(), theme.bgImageMobile(), theme.scrollTop(), theme.headerSticked(), theme.navbarNav(), theme.changeLanguege(), theme.changeCurrency(), theme.switchMode(), theme.changeThemeColor(), theme.changeAvatar(), theme.rangePrice(), theme.countdown(), theme.scrollCue(), theme.dSelect(), theme.selectGuest(), theme.openCheckAvailabilityModal(), theme.dropdownCheckbox(), theme.datePicker(), theme.swiperSlider(), theme.plyrPlayer(), theme.gLightbox(), theme.bsValidation(), theme.highlight(), theme.codeSnippet(), theme.preloader()
  },
  bgImage() {
      let e = document.querySelectorAll(".bg-image");
      for (let t = 0; t < e.length; t++) {
          let a = e[t].getAttribute("data-image-src");
          e[t].style.backgroundImage = "url('" + a + "')"
      }
  },
  bgImageMobile() {
      (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) && document.querySelectorAll(".image-wrapper").forEach(e => {
          e.classList.add("mobile")
      })
  },
  scrollTop() {
      let e = document.querySelector(".scroll-top");
      if (e) {
          let t = function() {
              window.scrollY > 150 ? e.classList.add("active") : e.classList.remove("active")
          };
          window.addEventListener("load", t), document.addEventListener("scroll", t);
          let a = function() {
              window.scrollTo({
                  top: 0,
                  behavior: "smooth"
              })
          };
          e.addEventListener("click", a)
      }
  },
  headerSticked() {
      let e = document.querySelector("#header");
      e && document.addEventListener("scroll", () => {
          window.scrollY > 200 ? (e.classList.add("sticked"), window.scrollY >= 300 ? e.classList.add("showed") : e.classList.remove("showed")) : e.classList.remove("sticked")
      })
  },
  navbarNav() {
      let e = document.querySelectorAll(".offcanvas.offcanvas-navbar");
      e.forEach(e => {
          let t, a = e.querySelectorAll(".nav-item.dropdown"),
              l = e.querySelectorAll(".dropdown-toggle-icon");
          a.forEach(a => {
              let l = a.querySelector(".dropdown-toggle-hover"),
                  r = a.querySelector(".dropdown-menu");
              l && r && ([l, r].forEach(a => a.addEventListener("mouseenter", () => {
                  e.classList.contains("show") || (clearTimeout(t), e.querySelectorAll(".dropdown-menu.show").forEach(e => e.classList.remove("show")), r.classList.add("show"), r.classList.add("animate", "slideIn"))
              })), [l, r].forEach(a => a.addEventListener("mouseleave", () => {
                  e.classList.contains("show") || (t = setTimeout(() => {
                      r.classList.remove("show"), r.classList.remove("animate", "slideIn")
                  }, 500))
              })))
          }), e.addEventListener("show.bs.offcanvas", () => {
              l.forEach(e => {
                  e.classList.replace("ti-chevron-down", "ti-plus")
              })
          }), e.addEventListener("hide.bs.offcanvas", () => {
              l.forEach(e => {
                  e.classList.replace("ti-plus", "ti-chevron-down"), e.classList.replace("ti-minus", "ti-chevron-down")
              })
          }), l.forEach(t => {
              t.addEventListener("click", function(a) {
                  if (e.classList.contains("show")) {
                      a.preventDefault();
                      let l = this.parentNode;
                      l.classList.toggle("active");
                      let r = l.nextElementSibling;
                      r.classList.toggle("show"), t.classList.toggle("ti-plus"), t.classList.toggle("ti-minus")
                  }
              })
          })
      })
  },
  changeLanguege() {
      let e = document.querySelector("[data-lang-list]");
      e && e.addEventListener("click", function(e) {
          let t = e.target.closest("[data-lang-toggle]");
          if (t) {
              let a = t.getAttribute("data-lang-toggle");
              document.querySelector("#imgFlag").src = "/assets/img/flags/" + a + ".svg", document.querySelector("#spnLang").textContent = a
          }
      })
  },
  changeCurrency() {
      let e = document.querySelector("[data-currency-list]");
      e && e.addEventListener("click", function(e) {
          let t = e.target.closest("[data-currency-toggle]");
          if (t) {
              let a = t.getAttribute("data-currency-toggle");
              document.querySelector("#spnCurrency").textContent = a
          }
      })
  },
  selectGuest() {
      document.querySelectorAll("[data-total-guest]").forEach(function(e) {
          let t = e.querySelector('input[data-input-adults=""]'),
              a = e.querySelector('input[data-input-children=""]'),
              l = e.querySelector('span[data-total-adults=""]'),
              r = e.querySelector('span[data-total-children=""]'),
              i = e.querySelector('button[data-minus-adults=""]'),
              s = e.querySelector('button[data-plus-adults=""]'),
              n = e.querySelector('button[data-minus-children=""]'),
              o = e.querySelector('button[data-plus-children=""]');
          if (t && a) {
              function c(e) {
                  e.addEventListener("keypress", function(e) {
                      let t = e.keyCode || e.which,
                          a = String.fromCharCode(t);
                      /^\d*$/.test(a) || e.preventDefault()
                  })
              }
              "" === t.value.trim() && (t.value = 1), "" === a.value.trim() && (a.value = 0), l.innerText = `${t.value} ${t.value > 1 ? "Adults" : "Adult"}`, r.innerText = `${a.value} ${a.value > 1 ? "Children" : "Child"}`, t.addEventListener("input", () => {
                  let e = parseInt(t.dataset.adultsMax);
                  t.value > e && (t.value = e), t.value < 1 && (t.value = 1), l.innerText = `${t.value} ${t.value > 1 ? "Adults" : "Adult"}`
              }), a.addEventListener("input", () => {
                  let e = parseInt(a.dataset.childrenMax);
                  a.value > e && (a.value = e), r.innerText = `${a.value} ${a.value > 1 ? "Children" : "Child"}`
              }), i.addEventListener("click", () => {
                  let e = parseInt(t.value);
                  e > 1 && (t.value = e - 1, l.innerText = `${t.value} ${t.value > 1 ? "Adults" : "Adult"}`)
              }), s.addEventListener("click", () => {
                  let e = parseInt(t.value),
                      a = parseInt(t.dataset.adultsMax);
                  e < a && (t.value = e + 1, l.innerText = `${t.value} ${t.value > 1 ? "Adults" : "Adult"}`)
              }), n.addEventListener("click", () => {
                  let e = parseInt(a.value);
                  e > 0 && (a.value = e - 1, r.innerText = `${a.value} ${a.value > 1 ? "Children" : "Child"}`)
              }), o.addEventListener("click", () => {
                  let e = parseInt(a.value),
                      t = parseInt(a.dataset.childrenMax);
                  e < t && (a.value = e + 1, r.innerText = `${a.value} ${a.value > 1 ? "Children" : "Child"}`)
              }), c(t), c(a)
          }
      })
  },
  openCheckAvailabilityModal() {
      let e = document.querySelector("#frmCheckAvailability"),
          t = document.getElementById("mdlCheckAvailability");
      e && t && e.addEventListener("submit", function(e) {
          if (this.checkValidity()) {
              e.preventDefault();
              new bootstrap.Modal(t, {
                  keyboard: !1
              }).show()
          }
      })
  },
  dropdownCheckbox() {
      document.querySelectorAll("[data-dropdown-checkbox]").forEach(function(e) {
          let t = e.querySelector('input[data-checkbox-type="all"]'),
              a = e.querySelectorAll('input[data-checkbox-type="one"]'),
              l = e.querySelector("span[data-selected]");

          function r() {
              let r = e.querySelectorAll('input[data-checkbox-type="one"]:checked').length;
              if (r === a.length || r < 1) t.checked = !0, a.forEach(e => {
                  e.checked = !1
              }), l.textContent = t.value;
              else {
                  t.checked = !1;
                  let i = [];
                  a.forEach(e => {
                      e.checked && i.push(e.value)
                  }), l.textContent = i.join(", ")
              }
          }
          t.checked ? (l.textContent = t.value, a.forEach(e => {
              e.checked = !1
          })) : r(), t.addEventListener("change", function() {
              this.checked && (a.forEach(function(e) {
                  e.checked = !1
              }), l.textContent = t.value)
          }), a.forEach(e => {
              e.addEventListener("change", () => {
                  r()
              })
          })
      })
  },
  changeAvatar() {
      let e = document.querySelectorAll("[data-user-avatar]");
      e.forEach(e => {
          let t = e.querySelector("[data-input-avatar]"),
              a = e.querySelector("[data-update-avatar]"),
              l = e.querySelector("[data-show-avatar]");
          t && a && l && t.addEventListener("change", () => {
              if (t.files && t.files[0]) {
                  let e = t.files[0].name.split(".").pop().toLowerCase();
                  if (["jpg", "gif", "png"].includes(e)) {
                      a.classList.remove("d-none");
                      let r = new FileReader;
                      r.addEventListener("load", () => {
                          l.src = r.result, l.srcset = r.result
                      }), r.readAsDataURL(t.files[0])
                  } else a.classList.add("d-none")
              } else a.classList.add("d-none")
          })
      })
  },
  rangePrice() {
      document.querySelectorAll("[data-range-price]").forEach(function(e) {
          let t = e.querySelectorAll(".range-input input"),
              a = e.querySelectorAll(".price-input input"),
              l = e.querySelector(".slider .progress");
          if (t && a && l) {
              a.forEach(e => {
                  e.addEventListener("change", e => {
                      let r = parseInt(a[0].value),
                          i = parseInt(a[1].value);
                      i - r >= 100 && i <= t[1].max && (e.target === a[0] ? (t[0].value = r, l.style.left = r / t[0].max * 100 + "%") : (t[1].value = i, l.style.right = 100 - i / t[1].max * 100 + "%"))
                  })
              }), t.forEach(e => {
                  e.addEventListener("input", e => {
                      let r = parseInt(t[0].value),
                          i = parseInt(t[1].value);
                      i - r < 100 ? "range-min" === e.target.className ? t[0].value = i - 100 : t[1].value = r + 100 : (a[0].value = r, a[1].value = i, l.style.left = r / t[0].max * 100 + "%", l.style.right = 100 - i / t[1].max * 100 + "%")
                  })
              });
              let r = parseInt(t[0].value),
                  i = parseInt(t[1].value);
              l.style.left = r / t[0].max * 100 + "%", l.style.right = 100 - i / t[1].max * 100 + "%"
          }
      })
  },
  switchMode() {
      let e = localStorage.getItem("theme"),
          t = () => e || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
          a = function(e) {
              "auto" === e && window.matchMedia("(prefers-color-scheme: dark)").matches ? document.documentElement.setAttribute("data-bs-theme", "dark") : document.documentElement.setAttribute("data-bs-theme", e)
          };
      a(t());
      let l = (e, t = !1) => {
          let a = document.querySelector("#bd-theme");
          if (!a) return;
          let l = document.querySelector("#bd-theme-text"),
              r = document.querySelector(".theme-icon-active use"),
              i = document.querySelector(`[data-bs-theme-value="${e}"]`),
              s = i.querySelector("svg use").getAttribute("href");
          document.querySelectorAll("[data-bs-theme-value]").forEach(e => {
              e.classList.remove("active"), e.setAttribute("aria-pressed", "false")
          }), i.classList.add("active"), i.setAttribute("aria-pressed", "true"), r.setAttribute("href", s);
          let n = `${l.textContent} (${i.dataset.bsThemeValue})`;
          a.setAttribute("aria-label", n), t && a.focus()
      };
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
          ("light" !== e || "dark" !== e) && a(t())
      }), l(t()), document.querySelectorAll("[data-bs-theme-value]").forEach(e => {
          e.addEventListener("click", () => {
              let t = e.getAttribute("data-bs-theme-value");
              localStorage.setItem("theme", t), a(t), l(t, !0)
          })
      });
      let r = document.documentElement.getAttribute("data-bs-theme"),
          i = document.querySelector("#toggle-theme");
      if (i) {
          let s = i.querySelector("i");
          i.addEventListener("click", () => {
              let e = document.documentElement.getAttribute("data-bs-theme"),
                  t = "dark" === e ? "light" : "dark";
              document.documentElement.setAttribute("data-bs-theme", t), localStorage.setItem("theme", t), n(t)
          });
          let n = e => {
              s && ("dark" === e ? (s.classList.remove("ti-sun"), s.classList.add("ti-moon")) : (s.classList.remove("ti-moon"), s.classList.add("ti-sun")))
          };
          n(r)
      }
  },
  changeThemeColor() {
      let e = document.querySelectorAll("[data-theme-color-toggle]");
      e.forEach(t => {
          t.addEventListener("click", () => {
              let a = t.getAttribute("data-theme-color-toggle"),
                  l = document.createElement("link");
              l.setAttribute("href", `./assets/css/colors/${a}.css`), l.setAttribute("rel", "stylesheet"), document.head.appendChild(l), document.cookie = `color=${a}; path=/`, e.forEach(e => e.classList.remove("selected")), t.classList.add("selected")
          })
      }), window.addEventListener("load", () => {
          let e = document.cookie.split("; "),
              t = e.find(e => e.startsWith("color="));
          if (t) {
              let a = t.split("=")[1],
                  l = document.createElement("link");
              l.setAttribute("href", `./assets/css/colors/${a}.css`), l.setAttribute("rel", "stylesheet"), document.head.appendChild(l);
              let r = document.querySelector(`[data-theme-color-toggle="${a}"]`);
              r && r.classList.add("selected")
          }
      })
  },
  countdown() {
      let e = document.querySelector(".countdown");
      e && new countdown({
          target: ".countdown",
          dayWord: "days",
          hourWord: "hours",
          minWord: "mins",
          secWord: "secs"
      })
  },
  scrollCue() {
      scrollCue.init({
          interval: -500,
          duration: 600,
          percentage: .55
      }), scrollCue.update()
  },
  dSelect() {
      for (let e of document.querySelectorAll(".dselect")) dselect(e)
  },
  datePicker() {
      new flatpickr(".date-of-birth", {
          allowInput: !0,
          minDate: "today",
          static: !0,
          position: "right center",
          wrap: !0,
          disableMobile: "true",
          dateFormat: "M d, Y"
      }), new flatpickr(".departure-date", {
          allowInput: !0,
          minDate: "today",
          static: !0,
          position: "right center",
          wrap: !0,
          disableMobile: "true",
          dateFormat: "M d, Y"
      })
  },
  swiperSlider() {
      document.querySelector(".hero-slider") && new Swiper(".hero-slider", {
          slidesPerView: 1,
          spaceBetween: 24,
          speed: 800,
          loop: !0,
          navigation: {
              nextEl: ".hero-next",
              prevEl: ".hero-prev"
          },
          pagination: {
              el: ".hero-pagination",
              type: "fraction"
          }
      }), document.querySelector(".adventure-type-slider") && new Swiper(".adventure-type-slider", {
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 800,
          loop: !0,
          navigation: {
              nextEl: ".adventure-type-next",
              prevEl: ".adventure-type-prev"
          },
          pagination: {
              el: ".adventure-type-pagination",
              type: "fraction"
          },
          breakpoints: {
              1300: {
                  slidesPerView: 5,
                  spaceBetween: 24
              },
              992: {
                  slidesPerView: 4,
                  spaceBetween: 24
              },
              768: {
                  slidesPerView: 3,
                  spaceBetween: 24
              }
          }
      }), document.querySelector(".special-offer-slider") && new Swiper(".special-offer-slider", {
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 800,
          loop: !0,
          navigation: {
              nextEl: ".special-offer-next",
              prevEl: ".special-offer-prev"
          },
          pagination: {
              el: ".special-offer-pagination",
              type: "fraction"
          },
          breakpoints: {
              1300: {
                  slidesPerView: 4,
                  spaceBetween: 24
              },
              992: {
                  slidesPerView: 3,
                  spaceBetween: 24
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 24
              }
          }
      }), document.querySelector(".special-related-slider") && new Swiper(".special-related-slider", {
          slidesPerView: 1,
          spaceBetween: 16,
          speed: 800,
          loop: !0,
          navigation: {
              nextEl: ".special-related-next",
              prevEl: ".special-related-prev"
          },
          pagination: {
              el: ".special-related-pagination",
              type: "fraction"
          },
          breakpoints: {
              1300: {
                  slidesPerView: 4,
                  spaceBetween: 24
              },
              992: {
                  slidesPerView: 3,
                  spaceBetween: 24
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 24
              }
          }
      }), document.querySelector(".client-review-slider") && new Swiper(".client-review-slider", {
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 800,
          loop: !0,
          navigation: {
              nextEl: ".client-review-next",
              prevEl: ".client-review-prev"
          },
          pagination: {
              el: ".client-review-pagination",
              type: "fraction"
          },
          breakpoints: {
              992: {
                  slidesPerView: 2,
                  spaceBetween: 0
              },
              768: {
                  slidesPerView: 1,
                  spaceBetween: 0
              }
          }
      }), document.querySelector(".related-post-slider") && new Swiper(".related-post-slider", {
          slidesPerView: 1,
          spaceBetween: 16,
          speed: 800,
          loop: !0,
          navigation: {
              nextEl: ".related-post-next",
              prevEl: ".related-post-prev"
          },
          pagination: {
              el: ".related-post-pagination",
              type: "fraction"
          },
          breakpoints: {
              1300: {
                  slidesPerView: 3,
                  spaceBetween: 24
              },
              992: {
                  slidesPerView: 3,
                  spaceBetween: 24
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 24
              }
          }
      }), document.querySelector(".team-slider") && new Swiper(".team-slider", {
          slidesPerView: 1,
          spaceBetween: 32,
          speed: 800,
          loop: !0,
          navigation: {
              nextEl: ".team-next",
              prevEl: ".team-prev"
          },
          pagination: {
              el: ".team-pagination",
              type: "fraction"
          },
          breakpoints: {
              1300: {
                  slidesPerView: 4,
                  spaceBetween: 32
              },
              1120: {
                  slidesPerView: 4,
                  spaceBetween: 32
              },
              992: {
                  slidesPerView: 3,
                  spaceBetween: 32
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 32
              }
          }
      })
  },
  plyrPlayer() {
      new Plyr(".html5-player"), new Plyr(".vimeo-player"), new Plyr(".youtube-player")
  },
  gLightbox() {
      GLightbox({
          selector: ".glightbox"
      }), GLightbox({
          selector: ".media-glightbox",
          touchNavigation: !0,
          loop: !1,
          zoomable: !1,
          autoplayVideos: !0,
          moreLength: 0,
          slideExtraAttributes: {
              poster: ""
          },
          plyr: {
              config: {
                  ratio: "16:9",
                  muted: !1,
                  hideControls: !0,
                  youtube: {
                      noCookie: !1,
                      rel: 0,
                      showinfo: 0,
                      iv_load_policy: 3
                  },
                  vimeo: {
                      byline: !1,
                      portrait: !1,
                      title: !1,
                      speed: !0,
                      transparent: !1
                  }
              }
          }
      })
  },
  bsValidation() {
      let e = document.querySelectorAll(".needs-validation");
      e.forEach(function(e) {
          e.addEventListener("submit", function(t) {
              e.checkValidity() || (t.preventDefault(), t.stopPropagation()), e.classList.add("was-validated")
          }, !1)
      })
  },
  highlight() {
      hljs.highlightAll()
  },
  codeSnippet() {
      document.querySelectorAll(".code-wrapper-inner").forEach(function(e) {
          e.insertAdjacentHTML("beforebegin", '<button type="button" class="btn btn-sm btn-light btn-clipboard">Copy</button>')
      }), new ClipboardJS(".btn-clipboard", {
          target: function(e) {
              return e.nextElementSibling
          }
      }).on("success", e => {
          e.trigger.textContent = "Copied!", e.clearSelection(), setTimeout(function() {
              e.trigger.textContent = "Copy"
          }, 2e3)
      }), new ClipboardJS(".btn-copy-icon").on("success", function(e) {
          e.clearSelection(), e.trigger.textContent = "Copied!", window.setTimeout(function() {
              e.trigger.textContent = "Copy"
          }, 2300)
      })
  },
  preloader() {
      let e = document.querySelector("#preloader");
      if (e) {
          function t() {
              e.remove(), document.body.classList.remove("vh-100", "vw-100", "overflow-hidden")
          }
          setTimeout(() => {
              window.requestAnimationFrame(t)
          }, 1500)
      }
  }
};
document.addEventListener("DOMContentLoaded", e => {
  theme.init()
});