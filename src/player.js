'use strict'

class Dog {
  constructor (canvas, energy) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.energy = energy
    this.size = 100
    this.x = 50
    this.y = this.canvas.height / 2 // I take the half of the canvas y
    this.initialY = this.canvas.height / 2
    this.initialX = 50
    this.direction = 0// 0 not moving // -1 while jumping // 1 returning initial position
    // this.jumping = true
    this.ySpeed = 2
    this.dogTop = this.y
    this.dogBottom = this.y + this.size

    this.screenTop = 0
    // const screenBottom = this.canvas.height
  }

  setJump (direction) {
    if (direction === 'up') { // button up
      this.direction = -1
    } else if (direction !== 'up') {
      this.direction = 1 // 1 o 0?
    }
  }

  handleScreenCollision () {
    if (this.dogTop <= screenTop) { // solo tengo que mirar la colisión con el top
      this.setJump('down')
    }
  }

  handleBottomCollision () {
    if (this.dogBottom >= this.size + this.initialY) {
      this.direction = 0
    }
  }

  updateDogPosition () {
    this.y = this.y + this.direction * this.ySpeed

    this.dogTop = this.y

    this.screenTop = 0
    // const screenBottom = this.canvas.height
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
