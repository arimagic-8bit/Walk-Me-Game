class Dog {
  constructor (ctx, energy) {
    this.ctx = ctx
    this.energy = energy
    this.size = 100
    this.x = 50
    this.y = canvas.height / 2 // I take the half of the canvas y
    this.jumping = 0// 0 not moving // -1 while jumping // 1 returning initial position
    this.speed = 5
  }

  setJump (direction) {
    if (direction === 'up') {
      this.direction = -1
    }
  } // button up

  handleScreenCollision () {}

  removeEnergy () {}

  drawPLayer () {}

  handleObstacleCollision () {}

  handleFoodCollision () {}
}
