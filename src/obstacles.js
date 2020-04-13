'use strict'

class Obstacles {
  constructor (canvas, y, speed, src) { // No le he dado speed, pongo una fija
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 40

    this.x = this.canvas.width + this.size // posición en el eje x
    this.y = y // pasamos la posición del eje y como argumento
    this.speed = speed

    // imagen

    this.image = new Image()
    this.image.src = src
  }

  drawObstacle () {
    this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
  }

  updateObsPosition () { // decrease x
    this.x = this.x - this.speed
  }

  isInsideScreen () { // obstacle is inside if +0
    return this.x + this.size > 0
  }
}

class Food {
  constructor (canvas, y, speed, src) { // No le he dado speed, pongo una fija
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 40

    this.x = this.canvas.width + this.size
    this.y = y
    this.speed = speed

    // imagen

    this.image = new Image()
    this.image.src = src
  }

  drawFood () {
    this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
  }

  updateFoodPosition () {
    this.x = this.x - this.speed
  }

  isInsideScreen () {
    return this.x + this.size > 0
  }
}
