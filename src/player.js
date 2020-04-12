'use strict'

class Dog {
  constructor (canvas, energy) {
    // dog properties
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.energy = energy
    this.size = 100 // size of the dog
    this.x = 50 // initial x where dog starts
    this.y = this.canvas.height - this.size // // initial y where dog starts

    // handle dog's direction
    this.direction = 0// 0 not moving // -1 while jumping // 1 returning initial position
    this.jumping = false
    this.ySpeed = 0

    // handle collision
    this.dogTop = this.y // parte de arriba del perro
    this.dogBottom = this.y + this.size // parte de abajo del perro

    this.screenTop = 0
    this.screenBottom = this.canvas.height
  }

  setJump (event) {
    if (event === 'up' && this.jumping === false) { // button up
      this.ySpeed -= 9
      this.jumping = true
    }
  }

  handleScreenCollision () {
    Dog.ySpeed *= 1.5 // gravity
    Dog.y *= Dog.ySpeed
    Dog.ySpeed *= 0.9 // friction when dog touches floor and reduce its speed

    if (this.dogTop <= this.screenTop + 200) { // solo tengo que mirar la colisión con el top
      this.ySpeed += 20
    }
    if (this.dogBottom > this.screenBottom) {
      this.ySpeed = 0
      this.y = this.canvas.height - this.size
      this.jumping = false
    }
  }

  updateDogPosition () {
    this.y = this.y + this.ySpeed

    this.dogTop = this.y
    this.dogBottom = this.dogTop + this.size

    this.screenTop = 0
  }

  removeEnergy () { // restar barra energía por tiempo // restar por colisión // aumentar por colisión
    this.energy -= 1
  }

  addEnergy () {
    if (this.energy < 5) { this.energy += 1 }
  }

  drawDog () {
    this.ctx.fillStyle = 'pink'
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  didCollideWithObs (obstacle) { // true or false
    const dogLeft = this.x
    const dogRight = this.x + this.size
    const dogTop = this.y
    const dogBottom = this.y + this.size

    const obstacleLeft = obstacle.x
    const obstacleRight = obstacle.x + obstacle.size
    const obstacleTop = obstacle.y
    const obstacleBottom = obstacle.y + obstacle.size

    const crossLeft = obstacleLeft <= dogRight && obstacleLeft >= dogLeft

    const crossRight = obstacleRight >= dogLeft && obstacleRight <= dogRight

    const crossTop = obstacleTop <= dogBottom && obstacleTop >= dogTop

    const crossBottom = obstacleBottom >= dogTop && obstacleBottom <= dogBottom

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true
    } else {
      return false
    }
  }

  didCollideWithFood (food) {
    const dogLeft = this.x
    const dogRight = this.x + this.size
    const dogTop = this.y
    const dogBottom = this.y + this.size

    const foodLeft = food.x
    const foodRight = food.x + food.size
    const foodTop = food.y
    const foodBottom = food.y + food.size

    const crossLeft = foodLeft <= dogRight && foodLeft >= dogLeft

    const crossRight = foodRight >= dogLeft && foodRight <= dogRight

    const crossTop = foodTop <= dogBottom && foodTop >= dogTop

    const crossBottom = foodBottom >= dogTop && foodBottom <= dogBottom

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true
    } else {
      return false
    }
  }
}
