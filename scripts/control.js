const control = new class {
   radius = 205 * 360 / 1920
   radius2 = 100 * 360 / 1920
   color = "rgba(200, 200, 200, .1)"
   color2 = "rgba(200, 200, 200, .2)"

   x = 40 + this.radius
   y = height - 40 - this.radius

   lastTouch = null
   nowTouch = null
   radiusOf = 0

   btnPow = new class {
      radius = 205 * 360 / 1920
      x = width - 55 - this.radius
      y = height - 55 - this.radius
      color = "rgba(200, 200, 200, .1)"
      _active = false
      set active(e) {
         camera.speed = e ? 3 : 1
         this._active = e
      }
      get active() {
         return this._active
      }
      constructor() {
         let lastId = null
         canvas.addEventListener("touchstart", ({ touches }) => {
            getTouchInfo(touches).some(item => {
               if (junction.PointCircle(this, item.x, item.y)) {
                  lastId = item.id
                  return this.active = true
               }
            })
         })
         canvas.addEventListener("touchmove", ({ touches }) => {
            const touchNow = getTouchInfo(touches).some(item => junction.PointCircle(this, item.x, item.y))

            if (touchNow) {
               this.active = true
            } else {
               this.active = false
            }
         })
         canvas.addEventListener("touchend", ({ changedTouches }) => {
            if (getTouchInfo(changedTouches).some(item => item.id == lastId)) {
               this.active = false
               lastId = null
            }
         })
      }

      draw() {
         close
         begin
         circle(this.x, this.y, this.radius)
         fill(this.color)
         triange(
            this.x, this.y - this.radius * .5,
            this.x - this.radius * .5, this.y + this.radius * .25,
            this.x + this.radius * .5, this.y + this.radius * .25
         )
         fill(200, 200, 200, this.active ? 1 : .5)
      }
   }

   constructor() {
      canvas.addEventListener("touchstart", (event) => {
         getTouchInfo(event.touches).some(item => {
            if (junction.PointCircle(this, item.x, item.y)) {
               this.lastTouch = item
               return true
            }
         })
      })
      canvas.addEventListener("touchmove", (event) => {
         if (this.lastTouch) {
            getTouchInfo(event.touches).some(item => {
               if (item.id == this.lastTouch.id) {
                  this.nowTouch = item
                  const [dx, dy] = [item.x - this.lastTouch.x, item.y - this.lastTouch.y]
                  camera.rotate = atan2(dx, dy)
                  this.radiusOf = Math.min(this.radius - this.radius2, hypot(dx, dy))
               }
            })
         }
      })
      canvas.addEventListener("touchend", ({ changedTouches }) => {
         if (this.lastTouch && getTouchInfo(changedTouches).some(item => item.id == this.lastTouch.id)) {
            this.lastTouch = null
            this.radiusOf = 0
         }
      })
   }

   draw() {
      circle(this.x, this.y, this.radius)
      fill(this.color)
      close

      begin
      circle(this.x + this.radiusOf * sin(camera.rotate), this.y + this.radiusOf * cos(camera.rotate), this.radius2)
      fill(this.color2)

      this.btnPow.draw()

   }
}