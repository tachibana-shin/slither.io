const camera = new class {
   length = 100

   _xCamera = 0
   _yCamera = 0
   speed = 1
   set xCamera(e) {
      if (
         (e / bgGame.width > this.length / 2 - 1 - (width % bgGame.width) / bgGame.width + width / 2 / bgGame.width) ||
         (e / bgGame.width < -this.length  / 2 - width / 2 / bgGame.width)
      ) {
         throw new Error("die")
      } else {
         this._xCamera = e
      }
   }
   get xCamera() {
      return this._xCamera
   }
   set yCamera(e) {
      if (
         (e / bgGame.heighg > this.length / 2 - 1 - (height % bgGame.height) / bgGame.height + height / 2 / bgGame.height) ||
         (e / bgGame.height < -this.length / 2 - height / 2 / bgGame.height)
      ) {
         throw new Error("die")
      } else {
         this._yCamera = e
      }
   }
   get yCamera() {
      return this._yCamera
   }

   rotate = 180 // direction camera main
   update() {
      this.xCamera += this.speed * sin(this.rotate)
      this.yCamera += this.speed * cos(this.rotate)
   }
} 