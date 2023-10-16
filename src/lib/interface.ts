interface PlayerConfig {
  speed: number,
  radius: number,
  x: number,
  y: number
}

interface SnakeConfig {
  length: number,
  radius: number,
  speed: number
}

export interface GraphicsConfig {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  snakeColor: string,
  playerColor: string,
}

export interface GameConfig {
  player: PlayerConfig,
  snake: SnakeConfig,
  graphics: GraphicsConfig,
  framesPerSec: number
}