import $ from 'jquery'
import { SnakeGameHTML } from './game'


let game: SnakeGameHTML
const PAGE_TRANSITION_SECONDS = 1000
const CIRCLE_RADIUS = 10

function toMenu() {
  $('#settings-panel-container').fadeOut(PAGE_TRANSITION_SECONDS)
  $('#game-over-div div:nth-child(1)').fadeOut(PAGE_TRANSITION_SECONDS)
  $('#game-over-div div:nth-child(2)').fadeOut(PAGE_TRANSITION_SECONDS)
  $('#game-over-div').fadeOut(PAGE_TRANSITION_SECONDS)
  $('#info-panel-container').fadeOut(PAGE_TRANSITION_SECONDS)
  setTimeout(function() {
    $('body').css('background-color', 'rgb(211, 211, 211)')
    $('#menu-panel-container').fadeIn(PAGE_TRANSITION_SECONDS)
  }, PAGE_TRANSITION_SECONDS)
}

function toSettings() {
  $('#menu-panel-container').fadeOut(PAGE_TRANSITION_SECONDS, function() {
    $('#settings-panel-container').css('visibility', 'visible').hide().fadeIn(PAGE_TRANSITION_SECONDS)
  })
  $('#player-color').val(game.config.graphics.playerColor)
  $('#snake-color').val(game.config.graphics.snakeColor)
  const $snakeLength = $('#snake-length')
  const $snakeLengthOut = $('#snake-length-output')
  $snakeLength.val(game.config.snake.length)
  $snakeLengthOut.html(game.config.snake.length.toString())
  $(document).on('input', '#snake-length', function() {
    $snakeLengthOut.html($snakeLength.val()!.toString())
    game.config.snake.length = Number($snakeLength.val()!)
  })
}

function toInfo() {
  $('#menu-panel-container').fadeOut(PAGE_TRANSITION_SECONDS, function() {
    $('#info-panel-container').css('visibility', 'visible').hide().fadeIn(PAGE_TRANSITION_SECONDS)
  })
}

function saveSettings() {
  game.config.snake.length = $('#snake-length').val() as number
  game.config.graphics.snakeColor = $('#snake-color').val() as string
  game.config.graphics.playerColor = $('#player-color').val() as string
  $('#saved-stamp').fadeIn(PAGE_TRANSITION_SECONDS, function() {
    $('#saved-stamp').fadeOut(PAGE_TRANSITION_SECONDS)
  })
}

function startGame() {
  $('#menu-panel-container').fadeOut(PAGE_TRANSITION_SECONDS, function() {
    $('#game-canvas').fadeIn(PAGE_TRANSITION_SECONDS).css('display', 'block')
  })
  setTimeout(game.start.bind(game), PAGE_TRANSITION_SECONDS)
}

function restartGame() {
  $('#game-over-div div:nth-child(1)').fadeOut(PAGE_TRANSITION_SECONDS)
  $('#game-over-div div:nth-child(2)').fadeOut(PAGE_TRANSITION_SECONDS)
  $('#game-over-div').fadeOut(PAGE_TRANSITION_SECONDS, function() {
    $('#game-canvas').fadeIn(PAGE_TRANSITION_SECONDS).css('display', 'block')
    $('body').css('background-color', 'rgb(211, 211, 211)')
  })
  setTimeout(game.start.bind(game), PAGE_TRANSITION_SECONDS)
}

function onEndGame(gameWon: boolean) {
  (gameWon) ?
    $('#game-over-div div:nth-child(1)').css('display', 'block') :
    $('#game-over-div div:nth-child(2)').css('display', 'block')
  $('#game-canvas').fadeOut(PAGE_TRANSITION_SECONDS, function() {
    $('body').css('background-color', 'black')
    $('#game-over-div').fadeIn(PAGE_TRANSITION_SECONDS)
  })
}

function _resizeCanvas() {
  $('#game-canvas').attr({
    width: window.innerWidth,
    height: window.innerHeight
  })
}

$(async () => {
  _resizeCanvas()

  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
  const context = canvas.getContext('2d') as CanvasRenderingContext2D

  game = new SnakeGameHTML({
    player: {
      speed: 2,
      radius: CIRCLE_RADIUS,
      x: canvas!.width / 2,
      y: canvas!.height - CIRCLE_RADIUS * 4
    },
    snake: {
      length: 20,
      radius: CIRCLE_RADIUS,
      speed: 1.2
    },
    graphics: {
      canvas: canvas,
      context: context,
      snakeColor: 'black',
      playerColor: 'black'
    },
    framesPerSec: 50
  }, onEndGame)

  $(window).on('resize', function() {
    if (game.inProgress) {
      alert("I didn't spend my time making this game just so you could resize the fucking window.")
      game.end(false)
    }
    _resizeCanvas()
  })

  $('#run-start-game').on('click', startGame)
  $('#run-to-info').on('click', toInfo)
  $('#run-to-settings').on('click', toSettings)
  $('#run-save-settings').on('click', saveSettings)
  $('#run-settings-to-menu, #run-info-to-menu, #run-game-to-menu').on('click', toMenu)
  $('#run-restart-game').on('click', restartGame)
})