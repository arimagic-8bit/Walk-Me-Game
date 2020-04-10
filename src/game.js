'use strict'

class Game {
  constructor () {
    this.player = null
    this.obstacle = []
    this.food = []
    this.gameIsOver = false
    this.score = 0
    this.canvas = null
    this.ctx = null
    this.energy = 0
    this.gameScreen = null
  }

  // instantiate player, set the canvas and start canvas loop
  start () {
    // Save reference to canvas and container and create context
    const canvasContainer = document.querySelector('.canvas-container')
    this.canvas = this.gameScreen.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Save reference for energy element
    this.energy = this.gameScreen.querySelector('.energy-bar .value')

    // Save reference for score element
    this.score = this.gameScreen.querySelector('.score .value')

    // Set the canvas dimensions
    this.containerWith = canvasContainer.offsetWidth
    this.containerHeight = canvasContainer.offsetHeight

    this.canvas.width = this.containerWith
    this.canvas.height = this.containerHeight

    this.player = {}

    // Start the canvas loop

    this.startLoop()
  }

  startLoop () {}

  checkCollisions () {}

  gameOver () {}

  reduceEnergyBar () {}

  printEnergy () {}

  printScore () {}
}
