'use strict'

class Obstacles {
  constructor (canvas, y) { // No le he dado speed, pongo una fija
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 30

    this.x = this.canvas.width + this.size
    this.y = y
    this.speed = 3
  }

  drawObstacle () {
    this.ctx.fillStyle = 'black'

    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  updateObsPosition () { // decrease x
    this.x = this.x - this.speed
  }

  isInsideScreen () { // obstacle is inside if +0
    return this.x + this.size > 0
  }

  isOutsideScreen () { // obstacle is outside if -0
    return this.x + this.size < 0
  }
}

class Food {
  constructor (canvas, y) { // No le he dado speed, pongo una fija
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 20

    this.x = this.canvas.width + this.size
    this.y = y
    this.speed = 4
  }

  drawFood () {
    this.ctx.fillStyle = 'blue'

    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  updateFoodPosition () {
    this.x = this.x - this.speed
  }

  isInsideScreen () {
    return this.x + this.size > 0
  }

  isOutsideScreen () { // obstacle is outside if -0
    return this.x + this.size < 0
  }
}
