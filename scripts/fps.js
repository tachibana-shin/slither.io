const fps = new class {
   filterStrength = 20
   frameTime = 0
   lastLoop = new Date

   draw() {
      close
      begin
      textBaseline("bottom")
      fontSize(15)
      fill(200)
      fillText(`fps: ${round(1000 / this.frameTime)}ms`, 0, height - 3)
   }
   render() {

      const thisFrameTime = (this.thisLoop = new Date) - this.lastLoop;
      this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
      this.lastLoop = this.thisLoop

      this.draw()
   }
}