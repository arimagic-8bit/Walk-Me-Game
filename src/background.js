class Background {
  constructor (speed, canvas, src) {
    this.speed = speed
    this.x = 0
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.src = null
  }

  move () {
    this.x += this.speed
    this.x %= this.canvas.width
  }

  draw () {
    this.ctx.drawImage(this.src, this.x, 0)
    if (this.speed < 0) {
      this.ctx.drawImage(this.src, this.x + this.canvas.width, 0)
    } else {
      this.ctx.drawImage(this.src, this.x - this.src.width, 0)
    }
  }

  updateCanvas () {
    Background.move()

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    Background.draw()

    // requestAnimationFrame(updateCanvas())
  }

  callUpdateWhenLoad () {
    // this.src.onload = updateCanvas()
  }
};
