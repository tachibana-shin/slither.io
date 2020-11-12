function init() {
   const rqAnimate =
      window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(e) {
         setTimeout(e, 100 / 6)
      },
      isTouch = "ontouchstart" in window || "onmsgesturechange" in window

   let supportPassive = false;
   try {
      let opts = Object.defineProperty({}, 'passive', {
         get: function() {
            supportPassive = true;
         }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
   } catch (e) {}

   function camelCase(str) {
      return str.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, (str, char) => char.toUpperCase())
   }
   const fx = {
      over: isTouch ? "touchstart" : "mousedown",
      out: isTouch ? "touchend" : "mouseup",
      move: isTouch ? "touchmove" : "mousemove"
   }
   const PREFIX = ["", "-webkit-", "-moz-", "-ms-", "-o-", "-khtml-"];
["transition", "animation"].forEach(type => {
      PREFIX.forEach(prefix => {
         if (window["on" + type.replace(/-/g, "") + type + "end"] !== undefined) {
         ["End", "Run", "Start", "Cancel"].forEach(after => {
               fx[type + after] = prefix === "" ? type + after.toLowerCase() : (prefix.replace(/-/g, "") + camelCase("-" + type) + after)
            })
            return fx[type + "Prop"] = prefix === "" ? type : camelCase(prefix + type), false
         }
      })
   })

   const TRANSFORM_Prop = (() => {
      for (let index = 0, length = PREFIX.length; index < length; index++) {
         if (document.documentElement.style[PREFIX[index] + "transform"] != null) {
            return PREFIX[index] + "transform"
         }
      }
   })()



   const windowSizePropertyes = {
      windowWidth: {
         get: () => window.innerWidth || DOMe.clientWidth || DOM.body.clientWidth
      },
      windowHeight: {
         get: () => window.innerHeight || DOMe.clientHeight || DOM.body.clientHeight
      }
   }

   function fnSpread(callback, ...args) {
      args.forEach(item => {
         for (const keyword in item) {
            callback[keyword] = item[keyword]
         }
      })
      return callback
   }

   function converToPx(string) {
      if ((string + "").match(/\w/)) {
         return string
      } else {
         return string + "px"
      }
   }

   function isFunction(e) {
      return typeof e == "function" && typeof e.nodeType != "number"
   }

   function isObject(obj) {
      return obj != null && typeof obj == "object"
   }

   function isLikeArray(arr) {
      if (isFunction(arr) || arr === window)
         return false;
      return isObject(arr) && "length" in arr
   }

   function isNumeric(n) {
      return typeof n === "number" || (typeof n === "string" && !Number.isNaN(n - 0))
   }

   function calculateRemainder2D(xComponent, yComponent) {
      if (xComponent !== 0) {
         this.x = this.x % xComponent;
      }

      if (yComponent !== 0) {
         this.y = this.y % yComponent;
      }

      return this;
   };

   function calculateRemainder3D(xComponent, yComponent, zComponent) {
      if (xComponent !== 0) {
         this.x = this.x % xComponent;
      }

      if (yComponent !== 0) {
         this.y = this.y % yComponent;
      }

      if (zComponent !== 0) {
         this.z = this.z % zComponent;
      }

      return this;
   };


   class Vector {
      constructor(x = 0, y = 0, z = 0) {
      [this.x, this.y, this.z] = [x, y, z]
      }

      set(x, y, z) {
         if (x instanceof Vector) {
            this.x = x.x || 0;
            this.y = x.y || 0;
            this.z = x.z || 0;
            return this;
         }

         if (x instanceof Array) {
            this.x = x[0] || 0;
            this.y = x[1] || 0;
            this.z = x[2] || 0;
            return this;
         }

         this.x = x || 0;
         this.y = y || 0;
         this.z = z || 0;
         return this;
      }
      copy() {
         return new Vector([this.x, this.y, this.z])
      }
      add(x, y, z) {
         if (x instanceof Vector) {
            this.x += x.x || 0;
            this.y += x.y || 0;
            this.z += x.z || 0;
            return this;
         }

         if (x instanceof Array) {
            this.x += x[0] || 0;
            this.y += x[1] || 0;
            this.z += x[2] || 0;
            return this;
         }

         this.x += x || 0;
         this.y += y || 0;
         this.z += z || 0;
         return this;
      }
      rem(x, y, z) {
         if (x instanceof Vector) {
            if (Number.isFinite(x.x) && Number.isFinite(x.y) && Number.isFinite(x.z)) {
               var xComponent = parseFloat(x.x);
               var yComponent = parseFloat(x.y);
               var zComponent = parseFloat(x.z);
               calculateRemainder3D.call(this, xComponent, yComponent, zComponent);
            }
         } else if (x instanceof Array) {
            if (x.every(function(element) {
                  return Number.isFinite(element);
               })) {
               if (x.length === 2) {
                  calculateRemainder2D.call(this, x[0], x[1]);
               }

               if (x.length === 3) {
                  calculateRemainder3D.call(this, x[0], x[1], x[2]);
               }
            }
         } else if (arguments.length === 1) {
            if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
               this.x = this.x % arguments[0];
               this.y = this.y % arguments[0];
               this.z = this.z % arguments[0];
               return this;
            }
         } else if (arguments.length === 2) {
            var vectorComponents = [].slice.call(arguments);

            if (vectorComponents.every(function(element) {
                  return Number.isFinite(element);
               })) {
               if (vectorComponents.length === 2) {
                  calculateRemainder2D.call(this, vectorComponents[0], vectorComponents[1]);
               }
            }
         } else if (arguments.length === 3) {
            var _vectorComponents = [].slice.call(arguments);

            if (_vectorComponents.every(function(element) {
                  return Number.isFinite(element);
               })) {
               if (_vectorComponents.length === 3) {
                  calculateRemainder3D.call(this, _vectorComponents[0], _vectorComponents[1], _vectorComponents[2]);
               }
            }
         }
      }
      sub(x, y, z) {
         if (x instanceof Vector) {
            this.x -= x.x || 0;
            this.y -= x.y || 0;
            this.z -= x.z || 0;
            return this;
         }

         if (x instanceof Array) {
            this.x -= x[0] || 0;
            this.y -= x[1] || 0;
            this.z -= x[2] || 0;
            return this;
         }

         this.x -= x || 0;
         this.y -= y || 0;
         this.z -= z || 0;
         return this;
      }
      mult(n) {
         if (!(typeof n === "number" && (n === Infinite || n === -Infinite))) {
            console.warn("mult:", "n is undefined or not a finite number");
            return this;
         }

         this.x *= n;
         this.y *= n;
         this.z *= n;
         return this;
      }
      div(n) {
         if (!(typeof n === "number" && (n === Infinite || n === -Infinite))) {
            console.warn("div:", "n is undefined or not a finite number");
            return this;
         }

         if (n === 0) {
            console.warn("div:", "divide by 0");
            return this;
         }

         this.x /= n;
         this.y /= n;
         this.z /= n;
         return this;
      }
      mag() {
         return Math.sqrt(this.magSq());
      }
      magSq() {
         const { x, y, z } = this
         return x * x + y * y + z * z;
      }
      dot(x, y, z) {
         if (x instanceof Vector) {
            return this.dot(x.x, x.y, x.z);
         }

         return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
      }
      cross(v) {
         var x = this.y * v.z - this.z * v.y;
         var y = this.z * v.x - this.x * v.z;
         var z = this.x * v.y - this.y * v.x;

         return new Vector([x, y, z]);
      }
      normalize() {
         const len = this.mag();
         if (len !== 0) this.mult(1 / len);
         return this;
      }
      limit(max) {
         const mSq = this.magSq();

         if (mSq > max * max) {
            this.div(Math.sqrt(mSq)) //normalize it
               .mult(max);
         }

         return this;
      }
      setMag(n) {
         return this.normalize().mult(n);
      }
      heading() {
         return getDeg(Math.atan2(this.y, this.x))
      }
      rotate(a) {
         var newHeading = getRadius(this.heading() + a)
         var mag = this.mag();
         this.x = Math.cos(newHeading) * mag;
         this.y = Math.sin(newHeading) * mag;
         return this;
      }
      angleBetween(v) {
         var dotmagmag = this.dot(v) / (this.mag() * v.mag());
         var angle;
         angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
         angle = angle * Math.sign(this.cross(v).z || 1);

         return getDeg(angle)
      }
      lerp(x, y, z, amt) {
         if (x instanceof Vector) {
            return this.lerp(x.x, x.y, x.z, y);
         }

         this.x += (x - this.x) * amt || 0;
         this.y += (y - this.y) * amt || 0;
         this.z += (z - this.z) * amt || 0;
         return this;
      }
      reflect(surfaceNormal) {
         surfaceNormal.normalize();
         return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
      }
      array() {
         return [this.x || 0, this.y || 0, this.z || 0];
      }
      equals(x, y, z) {
         var a, b, c;

         if (x instanceof Vector) {
            a = x.x || 0;
            b = x.y || 0;
            c = x.z || 0;
         } else if (x instanceof Array) {
            a = x[0] || 0;
            b = x[1] || 0;
            c = x[2] || 0;
         } else {
            a = x || 0;
            b = y || 0;
            c = z || 0;
         }

         return this.x === a && this.y === b && this.z === c;
      }
      toString() {
         return "Vector: [" + this.array().join(", ") + "]"
      }
   }

   function createVector(x, y, z) {
      return new Vector(x, y, z)
   }











   Object.defineProperties(window, windowSizePropertyes)

   const angleMode = fnSpread(function angleMode(mode) {
      if (/degrees|radial/i.test(mode)) {
         angleMode._mode = mode.toLowerCase()
      }
   }, {
      _mode: "degrees"
   })
   const figureAlign = fnSpread(mode => {
      figureAlign._mode = figureAlign._modes[mode.toUpperCase()]
   }, {
      _mode: 0,
      _modes: {
         LEFT: 0,
         CENTER: 1,
         RIGHT: 2
      }
   })
   const figureBaseline = fnSpread(mode => {
      figureBaseline._mode = figureBaseline._modes[mode.toUpperCase()]
   }, {
      _mode: 0,
      _modes: {
         TOP: 0,
         MIDDLE: 1,
         BOTTOM: 2
      }
   })

   function handlerFigureMode(x, y, w, h) {
      switch (figureAlign._mode) {
         case 1:
            x -= w / 2
            break
         case 2:
            x -= w
      }
      switch (figureBaseline._mode) {
         case 1:
            y -= h / 2
            break
         case 2:
            y -= h
      }
      return [x, y]
   }

   function getRadius(v) {
      return /degrees/i.test(angleMode._mode) ? v * Math.PI / 180 : v
   }

   function getDeg(e) {
      return /degrees/i.test(angleMode._mode) ? e * 180 / Math.PI : e
   }

   const colorMode = fnSpread(function colorMode(mode) {
      if (/rgb|hsl|hue|hsb/i.test(mode)) {
         colorMode._colorMode = mode.toLowerCase()
      }
   }, {
      _colorMode: "rgb"
   })

   function toRgbColor([red = 0, green = red, blue = green, alpha = 1]) {
      if (isLikeArray(red)) {
         return toRgbColor(red)
      } else {
         return (red + "").match(/^#|[a-z]/i) ? red : `${colorMode._colorMode}a(${red}, ${green}, ${blue}, ${alpha})`
      }
   }

   const canvasLocal = new class {
      _$el = null
      _context2d = null
      constructor(canvas) {
         this.$el = document.createElement("canvas")

         this.width = windowSizePropertyes.windowWidth.get()
         this.height = windowSizePropertyes.windowHeight.get()

         if (canvas !== undefined) {
            this.$el = canvas
         }

         Object.defineProperties(window, {
            canvas: {
               get: () => this.$el,
               set: el => this.$el = el
            },
            context2d: {
               get: () => this.context2d
            },
            width: {
               get: () => this.width,
               set: val => this.width = val
            },
            height: {
               get: () => this.height,
               set: val => this.height = val
            }
         })

      }
      get $el() {
         return this._$el
      }
      set $el(e) {
         if (e instanceof HTMLElement && e + "" == "[object HTMLCanvasElement]") {
            this._$el = e
            this._context2d = this._$el.getContext("2d")
         } else {
            throw new Error("myCanvas.js: when setting the value to canvasLocal. $el must make sure it is a HTMLCanvasElement.")
         }
      }
      get context2d() {
         return this._context2d
      }
      get width() {
         return this.$el.width
      }
      set width(e) {
         this.$el.width = e
      }
      get height() {
         return this.$el.height
      }
      set height(e) {
         this.$el.height = e
      }
   }(window.canvas)

   fnSpread(window, {
      preventTouch: false,
      stopTouch: false,
      touches: [],
      changedTouches: [],
      mouseX: NaN,
      mouseY: NaN,
      interact: false,

      // functions

      junction: {
         Rect(a, b) {
            return (a.x <= b.x + b.width && a.x + a.width >= b.x) && (a.y <= b.y + b.height && a.y + a.height >= b.y);
         },
         Circle(e, f) {
            return (f.x - e.x) ** 2 + (f.y - e.y) ** 2 < (e.radius + f.radius) ** 2
         },
         PointRect(e, x, y) {
            return e.x < x && e.x + e.width > x && e.y < y && e.y + e.height > y
         },
         PointCircle(e, x, y) {
            return (x - e.x) ** 2 + (y - e.y) ** 2 < e.radius ** 2
         },
         RectCircle(box, sphere) {
            const x = Math.max(box.x, Math.min(sphere.x, box.x + box.width));
            const y = Math.max(box.y, Math.min(sphere.y, box.y + box.height))

            const distance = (x - sphere.x) * (x - sphere.x) +
               (y - sphere.y) * (y - sphere.y)

            return distance < sphere.radius ** 2
         }
      },
      getTouchInfo,
      system: {
         get rmax() {
            return Math.max(canvasLocal.width, canvasLocal.height)
         },
         get rmin() {
            return Math.min(canvasLocal.width, canvasLocal.height)
         },
         offset: {
            get x() {
               return canvasLocal.$el.getBoundingClientRect().left
            },
            get y() {
               return canvasLocal.$el.getBoundingClienRect().top
            }
         },
         center: {
            get x() {
               return canvasLocal.width / 2
            },
            get y() {
               return canvasLocal.height / 2
            }
         }
      },
      createVector,
      createMatrix(css) {
         const vnode = document.createElement("div")
         vnode.style.opacity = 0
         vnode.style.position = "fixed"
         vnode.style.top = vnode.style.left = -9e99 + "px"
         vnode.style[TRANSFORM_Prop] = css
         document.documentElement.appendChild(vnode)
         let transform = getComputedStyle(vnode)[TRANSFORM_Prop]

         if (transform == "none")
            transform = "1, 0, 0, 1, 0, 0"
         transform = transform.replace(/^(?:matrix3d|matrix)\(|\s|\)$/g, "").split(",").map(e => +e)
         document.documentElement.removeChild(vnode)
         transform._isMatrix = true

         return transform
      }
   })




   const methods = { map: (a, b, c, d, e) => ((a - b) * (e - d)) / (c - b) + d }


   for (let index = 0, propertyes = ["font", "textAlign", "lineJoin", "textBaseline", "lineCap", "globalAlpha", "shadowBlur", "shadowColor"], length = propertyes.length; index < length; index++) {
      methods[propertyes[index]] = (...args) => {
         if (args.length) {
            return canvasLocal.context2d[propertyes[index]] = args[0]
         } else {
            return canvasLocal.context2d[propertyes[index]]
         }
      }
   }
   methods.globalOperation = (...args) => {
      if (args.length) {
         return canvasLocal.context2d.globalCompositeOperation = args[0]
      } else {
         return canvasLocal.context2d.globalCompositeOperation
      }
   }


   function fontToArray() {
      const _font = font().split(" ")
      if (_font.length === 2)
         return {
            size: _font[0],
            family: _font[1],
            weight: "normal"
         }
      if (_font.length === 3)
         return {
            size: _font[1],
            family: _font[2],
            weight: _font[0].trim()
         }
   }

   function AutoToPx(string, fi) {
      if (typeof string == "string") {
         string = string.replace(/^\s+|\s+$/g, "")
         const number = parseFloat(string)
         const dp = (string.match(/[a-z%]+$/i) || [, "px"])[1]

         switch (dp) {
            case "px":
               return number
            case "em":
               return parseFloat(fontSize()) * number
            case "rem":
               return parseFloat(fontSize()) * 16
            case "vw":
               return windowWidth * number / 100
            case "vh":
               return windowHeight * number / 100
            case "vmin":
               return Math.min(windowWidth, windowHeight) * number / 100
            case "vmax":
               return Math.max(windowWidth, windowHeight) * number / 100
            case "%":
               return fi / 100 * number
            default:
               return number
         }
      } else {
         return string + ""
      }
   }

   function fontSize(size) {
      const _font = fontToArray()
      if (size === undefined)
         return parseFloat(_font.size);
      size = AutoToPx(size)
      font([_font.weight, size, _font.family].join(" "))
      return parseFloat(size)
   }

   function fontFamily(name) {
      var _font = fontToArray()
      if (name === undefined)
         return _font.family;
      font([_font.weight, _font.size, name].join(" "))
      return name
   }

   function fontWeight(type) {
      var _font = fontToArray()
      if (type === undefined)
         return _font.weight;
      font([type, _font.size, _font.family].join(" "))
      return type
   }




   fnSpread(methods, {
      fontSize,
      fontFamily,
      fontWeight,
      angleMode,
      colorMode,
      figureAlign,
      figureBaseline,
      figureMode($1, $2 = $1) {
         figureAlign($1)
         figureBaseline($2)
      },
      loadImage(src) {
         const img = new Image()
         img.src = src
         return new Promise((resolve, reject) => {
            img.addEventListener("load", () => resolve(img))
            img.addEventListener("error", (err) => reject(err))
         })
      },
      random(...args) {
         if (args.length == 1)
            return isLikeArray(args[0]) ? args[0][
            Math.floor(Math.random() * args[0].length)
         ] : Math.random() * args[0]

         if (args.length == 2)
            return args[0] + Math.random() * (args[1] - args[0])
      },
      createCanvas() {
         if (!document.body.contains(canvasLocal.$el)) {
            document.body.appendChild(canvasLocal.$el)
         }
         return canvas
      },
      findCanvas(select = "canvas") {
         const canvasInDom = document.querySelector(select)
         return canvasLocal.$el = canvasInDom
      },
      rotate(deg) {
         if (arguments.length) {
            canvasLocal.context2d.rotate(methods.rotate._rotate = getRadius(deg))
         }
         return methods.rotate._rotate
      },
      ...(() => {
         const result = {}
         for (let index = 0, propertyes = ["stroke", "fill"], length = propertyes.length; index < length; index++) {
            result[propertyes[index]] = (...args) => {
               args.length && (canvasLocal.context2d[propertyes[index] + "Style"] = toRgbColor(args))
               canvasLocal.context2d[propertyes[index]]()
            }
            result[camelCase("get-" + propertyes[index])] = () => canvasLocal.context2d[propertyes[index]]
         }
         return result
      })(),
      lineWidth(...args) {
         if (args.length) {
            canvasLocal.context2d.lineWidth = args[0]
         }
         return canvasLocal.context2d.lineWidth
      },
      miterLimit(...args) {
         if (args.length) {
            if (lineJoin() != "miter") {
               lineJoin("miter")
            }
            canvasLocal.context2d.miterLimit = args[0]
         }
         return context2d.miterLimit
      },
      timeout(timeout) {
         return setTimeout(arguments.callee.caller, timeout)
      },
      loop(fn) {
         rqAnimate(fn || arguments.callee.caller)
      },
      clear(x = 0, y = 0, w = canvasLocal.width, h = canvasLocal.height) {
         canvasLocal.context2d.clearRect(x, y, w, h)
      },
      shadowOffset(...args) {
         if (args.length === 0)
            return {
               x: canvasLocal.context2d.shadowOffsetX,
               y: canvasLocal.context2d.shadowOffsetY
            }

         if (isNumeric(args[0]))
            context2d.shadowOffsetX = args[0]
         if (isNumeric(args[1]))
            context2d.shadowOffsetX = args[1]
      },
      measureText: text => canvasLocal.context2d.measureText(text).width,
      background(...args) {
         begin
         fill(...args)
         fillRect(0, 0, canvasLocal.width, canvasLocal.height)
         close
      },
      range($start, $end, $step) {
         $step = $step || 1
         var arr = [],
            isChar = false;

         if ($end === undefined)
            $end = $start,
            $start = 1;

         if (typeof $start == "string") {
            $start = $start.charCodeAt(0)
            $end = $end.charCodeAt(0)
            isChar = true
         }

         if ($start !== $end && (Math.abs($end - $start) < Math.abs($step)))
            throw new Error("range(): step exceeds the specified range.");

         if ($end > $start) {
            $step < 0 && ($step *= -1)
            while ($start <= $end) {
               arr.push(isChar ? String.fromCharCode($start) : $start)
               $start += $step
            }
         }
         else {
            $step > 0 && ($step *= -1)
            while ($start >= $end) {
               arr.push(isChar ? String.fromCharCode($start) : $start)
               $start += $step
            }
         }

         return arr;
      },
      toDataURL: (...args) => canvasLocal.$el.toDataURL(...args),
      ...(() => {
         const propertyes = {
            quadratic: "quadraticCurveTo",
            bezier: "bezierCurveTo",
            move: "moveTo",
            to: "lineTo",
            fillText: "fillText",
            strokeText: "strokeText",
            fillRect: "fillRect",
            strokeRect: "strokeRect",

            // @begin methods in group transform
            translate: "translate",
            scale: "scale",
            // @end

            clip: "clip",
            arcTo: "arcTo",
            isPoint: "isPointInPath",
            createImageData: "createImageData",
            getImageData: "getImageData",
            putImageData: "putImageData",
            createPattern: "createPattern"
         }
         const result = {}

         for (const property in propertyes) {
            result[property] = (...args) => canvasLocal.context2d[propertyes[property]](...args)
         }

         return result
      })(),
      ...(() => {
         const propertyes = {
            createRadial: "createRadialGradient",
            createLinear: "createLinearGradient"
         }
         CanvasGradient.prototype.add = function(...args) {
            this.addColorStop(...args)
            return this
         }
         const result = {}
         for (const keyword in propertyes) {
            result[keyword] = (...arg) => canvasLocal.context2d[propertyes[keyword]](...args)
         }
         return result
      })(),
      ...(() => {
         const result = {}
         for (let index = 0, propertyes = ["transform", "setTransform"], length = propertyes.length; index < length; index++) {
            result[propertyes[index]] = (...args) => canvasLocal.context2d[propertyes[index]](...(args[0]._isMatrix ? args[0] : args))
         }
         return result
      })(),
      resetTransform: () => canvasLocal.context2d.setTransform(1, 0, 0, 1, 0, 0),
      ...(() => {
         const result = {};
      ["sin", "cos", "tan", "tan2"].forEach(val => {
            result[val] = deg => Math[val](getRadius(deg))
            result["a" + val] = (...args) => getDeg(Math["a" + val](...args))
         })

         result.cot = result.tan2
         result.acot = result.atan2

         return result
      })(),
      ...(() => {
         const result = {}
         for (let index = 0, propertyes = ["abs", "floor", "pow", "round", "sqrt", "PI", "ceil"], length = propertyes.length; index < length; index++) {
            result[propertyes[index]] = Math[propertyes[index]]
         }
         return result
      })(),
      isTouch,
      hypot: typeof Math.hypot === "function" ? Math.hypot : (...args) => {
         const len = args.length
         let i = 0,
            result = 0;
         while (i < len)
            result += Math.pow(args[i++], 2);
         return Math.sqrt(result)
      },
      pie(x, y, r, d1, d2, a) {
         move(x, y)
         arc(x, y, r, d1, d2, a)
         to(x, y)
      },
      line(c, t, e, i) {
         move(c, t)
         to(e, i)
      },
      arc: (c, t, e, i, n, o) => canvasLocal.context2d.arc(c, t, e, getRadius(i) - Math.PI / 2, getRadius(n) - Math.PI / 2, o),
      ellipse: (c, t, e, i, n, o, r) => canvasLocal.context2d.ellipse(c, t, e, i, getRadius(n) - Math.PI / 2, getRadius(o), r === undefined ? !1 : r),
      circle: (x, y, r) => arc(x, y, r, 0, 360),
      triange(a, b, c, d, e, f) {
         begin
         move(a, b)
         to(c, d)
         to(e, f)
         close
      },
      drawImage: (image, ...args) => {
         if (args.length == 2) {
            args = handlerFigureMode(...args, image.width, image.height)
         } else if (args.length == 6) {
            [args[5], args[6]] = handlerFigureMode(...args.slice(3))
         }
         canvasLocal.context2d.drawImage(image, ...args)
      },
      rect(x, y, w, h, $1 = 0, $2 = $1, $3 = $1, $4 = $2) {
         [x, y] = handlerFigureMode(x, y, w, h)

         if (arguments.length < 5) {
            canvasLocal.context2d.rect(x, y, w, h)
         } else {
            const arc = [AutoToPx($1, w), AutoToPx($2, h), AutoToPx($3, w), AutoToPx($4, h)]
            move(x, y)
            arcTo(x + w, y, x + w, y + h - arc[1], arc[1])
            arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2])
            arcTo(x, y + h, x, y + h - arc[3], arc[3])
            arcTo(x, y, x + w - arc[0], y, arc[0])
         }
      }
   })


   Object.defineProperties(window, {
      ...(() => {
         const propertyes = {
            begin: "beginPath",
            close: "closePath",
            save: "save",
            restore: "restore"
         }
         const result = {}

         for (const keyword in propertyes) {
            result[keyword] = {
               get() {
                  canvasLocal.context2d[propertyes[keyword]]()
               }
            }
         }
         return result
      })()
   })


   for (const keyword in methods) {
      Object.defineProperty(window, keyword, {
         configurable: true,
         value: methods[keyword]
      })
   }



   // setup events

   function getTouchInfo(touches) {
      const rect = canvasLocal.$el.getBoundingClientRect();
      const sx = canvasLocal.$el.scrollWidth / canvasLocal.width || 1;
      const sy = canvasLocal.$el.scrollHeight / canvasLocal.height || 1;
      const _touches = [],
         length = touches.length
      let i = 0,
         touch
      while (i < length) {
         touch = touches[i++]
         _touches.push({
            x: (touch.clientX - rect.left) / sx,
            y: (touch.clientY - rect.top) / sy,
            winX: touch.clientX,
            winY: touch.clientY,
            id: touch.identifier
         })
      }
      return _touches
   }


   function handlerEvent(event) {
      try {
         window.touches = getTouchInfo(event.touches || [e])
         window.changedTouches = getTouchInfo(event.changedTouches || [e])
         window.preventTouch && event.preventDefault()
         window.stopTouch && event.stopPropagation()


         if (window.interact = !!window.touches.length) {
            window.mouseX = window.touches[0].x
            window.mouseY = window.touches[0].y
         }
      } catch (e) {
         throw e
      }

   }

   function init() {
      window.addEventListener(fx.over, handlerEvent, supportPassive ? { passive: false } : false);
      window.addEventListener(fx.move, handlerEvent, supportPassive ? { passive: false } : false);
      window.addEventListener(fx.out, handlerEvent, supportPassive ? { passive: false } : false)
   }



   function handlerReady() {

      self.removeEventListener("load", handlerReady)
      document.removeEventListener("DOMContentLoaded", handlerReady)
      init()
      new Promise((resolve, reject) => {
            if (typeof preload == "function") {
               preload = preload()
               if (Array.isArray(preload)) {
                  preload = Promise.all(preload)
               }
               if (preload.then) {
                  preload.then(resolve).catch(reject)
               } else {
                  resolve([])
               }
            } else {
               resolve([])
            }
         })
         .then(result => {
            if (typeof setup == "function") {
               setup(result)
            }

            function _draw() {
               draw(result)
               rqAnimate(_draw)
            }
            if (typeof draw == "function") {
               _draw()
            }
         })
   }
   
   if (document.readyState === "complete") {
      handlerReady()
   } else {
      self.addEventListener("load", handlerReady)
      document.addEventListener("DOMContentLoaded", handlerReady)
   }

}

init()
