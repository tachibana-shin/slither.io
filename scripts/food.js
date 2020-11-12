class Food {
   x = 0
   y = 0
   size = 0
   colorHue = 0
   radius = 0
   radial = 0
   constructor() {
      [this.x, this.y, this.size, this.colorHue, this.radius] = [
         random(-camera.length / 2 * bgGame.width, camera.length / 2 * bgGame.width),
         random(-camera.length / 2 * bgGame.height, camera.length / 2 * bgGame.height),
         random(3, 5),
         random(0, 360),
         random(0, 3)
      ]
   }

   shadow() {
      for (let index = 0; index < this.size; index++) {
         begin
         circle(-camera.xCamera + this.x + this.radius * sin(this.radial), -camera.yCamera + this.y - this.radius * cos(this.radial), this.size + index + 1)
         fill(`hsla(${this.colorHue}, 50%, 50%, ${map(index, 0, 20, .2, 0)})`)
         close
      }
   }
   draw() {

      const [x, y] = [
         -camera.xCamera + this.x + this.radius * sin(this.radial),
         -camera.yCamera + this.y - this.radius * cos(this.radial)
      ]

      if (x + this.radius >= 0 && y - this.radius >= 0 && x + this.radius <= width && y + this.radius <= height) {

         close
         save
         begin
         circle(x, y, this.size)
         this.radial += 5
         fill(`hsl(${this.colorHue}, 50%, 50%)`)
         close
         restore
         this.shadow()
      }
   }
}