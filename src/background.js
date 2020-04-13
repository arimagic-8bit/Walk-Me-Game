class Background {
  constructor (speed, canvas, src) {
    this.speed = speed
    this.x = 0
    this.xSecondary = canvas.width
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.image = new Image()
    this.image.src = src
  }

  move () {
    this.x -= this.speed
    this.xSecondary -= this.speed
    if (this.x <= -this.canvas.width) {
      this.x = this.canvas.width
    }
    if (this.xSecondary <= -this.canvas.width) {
      this.xSecondary = this.canvas.width
    }
  }

  draw () {
    this.ctx.drawImage(this.image, this.x, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.image, this.xSecondary, 0, this.canvas.width, this.canvas.height)
  }
};
