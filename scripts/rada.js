const rada = new class {
   radius = 150 * 360 / 1920
   color = "rgba(200, 200, 200, .2)"

   x = width - 10 - this.radius
   y = height - 10 - this.radius
   
   draw() {
      close
      begin
      circle( this.x, this.y, this.radius )
      fill(this.color)
      close
      begin
      pie( this.x, this.y, this.radius, 0, -90, true )
      fill(10, 10, 10, .5)
      close 
      begin
      pie( this.x, this.y, this.radius, 90, 180 )
      fill(10, 10, 10, .5)
      close
      begin
      
      circle(
         this.x + map(
            camera.xCamera,
            -camera.length / 2 * bgGame.width,
            camera.length / 2 * bgGame.width, 
            -this.radius,
            this.radius),
         this.y + map(
            camera.yCamera,
            -camera.length / 2 * bgGame.height,
            camera.length / 2 * bgGame.height, 
            -this.radius,
            this.radius
         ),
         1
      )
      fill(255)
   }

}