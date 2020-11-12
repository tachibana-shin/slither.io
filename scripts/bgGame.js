const bgGame = new class {
   background = new Image
   width = 320
   height = 320 * 519 / 599
   draw() {
      const [indexXStart, indexYStart] = [
         Math.max(
            camera.xCamera / this.width - 1, -camera.length / 2
         ),
         Math.max(
            camera.yCamera / this.height - 1, -camera.length / 2
         )
      ]

      const [indexXEnd, indexYEnd] = [
         Math.min(
            width / this.width + indexXStart + 1, camera.length / 2
         ),
         Math.min(
            height / this.height + indexYStart + 1, camera.length / 2
         )
      ]

      for (let index1 = round(indexYStart); index1 < ceil(indexYEnd); index1++) {
         for (let index2 = round(indexXStart); index2 < ceil(indexXEnd); index2++) {
            drawImage(
               this.background,
               index2 * this.width - camera.xCamera,
               index1 * this.height - camera.yCamera,
               this.width,
               this.height
            )
         }
      }
   }
}
// vẽ background trước
 