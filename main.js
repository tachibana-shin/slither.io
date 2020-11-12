function setup([backgroundImage]) {
   createCanvas()
   bgGame.background = backgroundImage
   //preventTouch = true
   stopTouch = true
}

const foods = []

function preload() {
   for ( const index in range(1, 300) ) {
      foods.push( new Food )
   }
   return [
      loadImage("./assets/background.jpg"),
      new Snake(width / 2, height / 2, true)
   ]
}

function draw([, snakeUser]) {
   clear()
   background(0)
   bgGame.draw()
   camera.update()
   control.draw()
   fps.render()
   foods.forEach((item, index) => {
      if ( junction.Circle({
         ...snakeUser.parts[0],
         radius: Snake.width
      }, item)) {
         foods.splice( index, 1 )
         return false
      }
      item.draw()
      return true
   })
   snakeUser.draw()
   rada.draw()
} 
