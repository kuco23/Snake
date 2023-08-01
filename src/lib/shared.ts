export class Vector {

  constructor(public x: number, public y: number) {}

  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normed() {
    const norm = this.norm()
    return new Vector(this.x / norm, this.y / norm)
  }

  mul(alpha: number) {
    return new Vector(this.x * alpha, this.y * alpha)
  }

}
  
export class Point {

  constructor(public x: number, public y: number) {}

    subtract(point: Point) {
      return new Vector(this.x - point.x, this.y - point.y)
  }
  
}