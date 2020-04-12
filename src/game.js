'use strict'

class Game {
  constructor () {
    this.player = null
    this.obstacles = []
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
    this.scoreElement = this.gameScreen.querySelector('.score .value')

    // Set the canvas dimensions
    this.containerWith = canvasContainer.offsetWidth
    this.containerHeight = canvasContainer.offsetHeight

    this.canvas.width = this.containerWith
    this.canvas.height = this.containerHeight

    this.player = new Dog(this.canvas, 5)

    // Event listerner for jump

    function handleKeyUp (event) {
      if (event.key === 'ArrowUp') {
        this.player.setJump('up')
      }
    }

    const boundHandleKeyUp = handleKeyUp.bind(this) // 1.hacemos bind para que ahora se encuentre en el game scope
    document.addEventListener('keyup', boundHandleKeyUp) // 2.event listener se encuentra en el scope de Window

    // Start the canvas loop

    this.startLoop()
  }

  startLoop () {
    const loop = function () {
      // Update the state of player and other elements

      // 1.1 create new obstacles random

      if (Math.random() > 0.98) {
        const randomHeightPositionObs = this.canvas.height * Math.random()
        const newObstacles = new Obstacles(this.canvas, randomHeightPositionObs, 5)

        this.obstacles.push(newObstacles)
      }

      // player hit obstacle

      // 1.2 create new food random

      if (Math.random() > 0.99) {
        const randomHeightPositionFood = this.canvas.height * Math.random()
        const newFood = new Food(this.canvas, randomHeightPositionFood, 5)

        this.food.push(newFood)
      }

      // player hit food

      this.checkCollisions()

      // update player position

      this.player.handleScreenCollision()
      this.player.updateDogPosition()
      // this.player.handleBottomCollision()

      // move elements

      // check if enemies are off screen

      const obsOnScreen = this.obstacles.filter(function (obstacle) {
        obstacle.updateObsPosition()
        const obsIsInside = obstacle.isInsideScreen()

        return obsIsInside // true or false
      })

      this.obstacles = obsOnScreen

      const foodInScreen = this.food.filter(function (food) {
        food.updateFoodPosition()
        const foodIsInside = food.isInsideScreen()

        return foodIsInside
      })

      this.food = foodInScreen

      // clear the canvas

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // paint canvas

      // draw DOG

      this.player.drawDog()

      // draw elements

      this.obstacles.forEach(function (obstacle) {
        obstacle.drawObstacle()
      })

      this.food.forEach(function (food) {
        food.drawFood()
      })

      // terminate loop if game over

      if (this.gameIsOver === false) {
        requestAnimationFrame(loop) // informamos que queremos realizar una animación en loop múltiples veces
      }
      this.printEnergy()
      this.printScore()
    }.bind(this)

    loop() // initial invocation
  }

  checkCollisions () {
    this.obstacles.forEach((obstacle) => {
      if (this.player.didCollideWithObs(obstacle)) {
        this.player.removeEnergy()
        console.log(this.player.energy)

        obstacle.x = -1 * obstacle.size

        if (this.player.energy <= 0) {
          this.gameOver()
        }
      }
    })

    this.food.forEach((food) => {
      if (this.player.didCollideWithFood(food)) {
        this.player.addEnergy()
        console.log(this.player.energy)

        food.x = -1 * food.size
      }
    })
  }

  gameOver () {
    this.gameIsOver = true
    endGame(this.score)
  }

  reduceEnergyBar () {}

  printEnergy () {
    this.energy.innerHTML = this.player.energy
  }

  printScore () {
    this.score++
    this.scoreElement.innerHTML = this.score
  }
}
