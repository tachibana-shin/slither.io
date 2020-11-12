class PartSnake {
   x = NaN
   y = NaN
   color = "transparent"
   constructor(...props) {
      [this.x, this.y, this.color] = props
   }

   draw() {
      close
      begin
      circle(this.x - camera.xCamera, this.y - camera.yCamera, Snake.width)
      fill(this.color)
   }
}

class Snake {
   static width = 10
   parts = []

   x = 0
   y = 0
   isSnakeUser = false
   constructor(...props) {
      [this.x, this.y, this.isSnakeUser] = props

      for (let index = 0; index < 100; index++) {
         this.parts.push(new PartSnake(this.x, this.y + +index, "#fff"))
      }
   }
   face = new class {
      draw() {
         //draw head
         close
         begin
         circle(width / 2 - sin(camera.rotate - 45) * 5, height / 2 - cos(camera.rotate - 45) * 5, 3)
         fill(0)
         close
         begin
         circle(width / 2 - sin(camera.rotate + 45) * 5, height / 2 - cos(camera.rotate + 45) * 5 , 3)
         fill(0)
         close
         begin
         arc(width / 2 + sin(camera.rotate) * 4, height / 2 + cos(camera.rotate) * 4, 3, 180 - camera.rotate - 90, 180 - camera.rotate + 90, false)
         stroke(0)
      }
   }
   draw() {
      const length = this.parts.length
      let index = length

      this.parts[0].x += camera.speed * sin(camera.rotate)
      this.parts[0].y += camera.speed * cos(camera.rotate)

      if (this.isSnakeUser) {
         while (index > 0) {
            const index2 = length - index
            if (index2 > 0) {
               const [dx, dy] = [
                  this.parts[index2].x - this.parts[index2 - 1].x,
                  this.parts[index2].y - this.parts[index2 - 1].y
               ]
               if (dx ** 2 + dy ** 2 > 1) {
                  const radius = atan2(dx, dy)
                  this.parts[index2].x = this.parts[index2 - 1].x + sin(radius),
                     this.parts[index2].y = this.parts[index2 - 1].y + cos(radius)
               }

            }
            this.parts[--index].draw()
         }
      } else {
         while (index > 0) {
            this.parts[--index].draw()
         }
      }

      this.face.draw()
   }
}