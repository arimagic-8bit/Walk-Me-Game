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
    this.energyYellow = null

    // background properties

    this.background1 = null
    this.background2 = null
    this.background3 = null
    this.background4 = null
    this.background5 = null
    this.background6 = null

    // check number of elements

    this.maxNumberObstacles = 2

    this.maxNumberFood = 2
  }

  // instantiate player, set the canvas and start canvas loop
  start () {
    // Save reference to canvas and container and create context
    const canvasContainer = document.querySelector('.canvas-container')
    this.canvas = this.gameScreen.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Save reference for energy element
    this.energy = this.gameScreen.querySelector('.energy-bar .value')
    this.energyYellow = this.gameScreen.querySelector('.energy-yellow')

    // Save reference for score element
    this.scoreElement = this.gameScreen.querySelector('.score .value')

    // Set the canvas dimensions
    this.containerWith = canvasContainer.offsetWidth
    this.containerHeight = canvasContainer.offsetHeight

    this.canvas.width = this.containerWith
    this.canvas.height = this.containerHeight

    this.player = new Dog(this.canvas, 5)

    // set background src

    this.background1 = new Background(0, this.canvas, './../img/Background/Hills Layer 01.png')
    this.background2 = new Background(1, this.canvas, './../img/Background/Hills Layer 02.png')
    this.background3 = new Background(2, this.canvas, './../img/Background/Hills Layer 03.png')
    this.background4 = new Background(3, this.canvas, './../img/Background/Hills Layer 04.png')
    this.background5 = new Background(4, this.canvas, './../img/Background/Hills Layer 05.png')
    this.background6 = new Background(5, this.canvas, './../img/Background/Hills Layer 06.png')

    // Event listerner for jump

    function handleKeyDown (event) {
      if (event.key === 'ArrowUp') {
        this.player.setJump('up')
      }
    }

    const boundHandleKeyDown = handleKeyDown.bind(this) // 1.hacemos bind para que ahora se encuentre en el game scope
    document.addEventListener('keydown', boundHandleKeyDown) // 2.event listener se encuentra en el scope de Window

    // Start the canvas loop

    this.startLoop()
  }

  startLoop () {
    const loop = function () {
      // Update the state of player and other elements

      // 1.1 create new obstacles random

      if (Math.random() > 0.80 && this.obstacles.length < this.maxNumberObstacles) {
        const newObstacles = new Obstacles(this.canvas, 490, 5, './../img/Elements/shit-drawing-png-1.png')

        if (this.obstacles.length === 0) {
          this.obstacles.push(newObstacles)
        } else if (this.obstacles[this.obstacles.length - 1].x <= this.canvas.width / 2) {
          this.obstacles.push(newObstacles)
        }
      }

      // 1.2 create new food random

      if (Math.random() > 0.99 && this.food.length < this.maxNumberFood) {
        const randomHeightPositionFood = this.canvas.height * Math.random()
        const newFood = new Food(this.canvas, randomHeightPositionFood, 5, './../img/Elements/bone-drawing-3.png')

        if (this.food.length === 0) {
          this.food.push(newFood)
        } else if (this.food[this.food.length - 1].x <= this.canvas.width / 2) {
          this.food.push(newFood)
        }
      }

      // player hit food

      this.checkCollisions()

      // update player position

      this.player.handleScreenCollision()
      this.player.updateDogPosition()

      // update background

      this.background1.move()
      this.background2.move()
      this.background3.move()
      this.background4.move()
      this.background5.move()
      this.background6.move()

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

      // paint canvas background
      this.background1.draw()
      this.background2.draw()
      this.background3.draw()
      this.background4.draw()
      this.background5.draw()
      this.background6.draw()

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

  removeEnergy () {
    this.energyYellow.style.width -= '50px'
  }

  checkCollisions () {
    this.obstacles.forEach((obstacle) => {
      if (this.player.didCollideWithObs(obstacle)) {
        // this.energyYellow.removeEnergy()

        obstacle.x = -1 * obstacle.size

        if (this.energyYellow.width <= '0px') {
          this.gameOver()
        }
      }
    })

    this.food.forEach((food) => {
      if (this.player.didCollideWithFood(food)) {
        this.player.addEnergy()

        food.x = -1 * food.size
      }
    })
  }

  gameOver () {
    this.gameIsOver = true
    endGame(this.score)
  }

  printEnergy () {
    this.energy.innerHTML = this.player.energy
  }

  printScore () {
    this.score++
    this.scoreElement.innerHTML = this.score
  }
}
