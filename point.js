/**
 * Basic class to represent a vector with some basic operations.
 */
class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    // GETTERS

    /**
     * @returns The current position as an Array.
     */
    get pos() {
        return [this.x, this.y];
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // SETTERS

    /**
     * Overwrites the current position with the new ones.
     * @param {number} x - New horizontal position.
     * @param {number} y - New vertical position.
     */
    moveTo(x, y) {
        this._x = x;
        this._y = y;
    }

    /**
     * Moves the point to the same coordinates as the given point.
     * @param {Point} p - Point with the desired position
     */
    moveToPoint(p) {
        this.checkPoint(p);
        this.moveTo(p.x, p.y);
    }

    /**
     * Move the point relative to the current position.
     * @param {number} x - Amount to travel in the horizontal axis.
     * @param {number} y - Amount to travel in the vertical axis.
     */
    advance(x, y) {
        this._x += x;
        this._y += y;
    }

    /**
     * Advances to the relative position given by the input.
     * @param {Point} p - Point or vector to advance to.
     */
    advanceWithDirection(p) {
        this.checkPoint(p);
        this.advance(p.x, p.y);
    }

    /**
     * Multiplies the vector coordinates by the given number
     * @param {number} n - Number to multiply each coordinate by
     */
    mult(n) {
        this._x *= n;
        this._y *= n;
    }

    /**
     * Normalices the point.
     */
    normalize() {
        this._x = this.x / this.mag();
        this._y = this.y / this.mag();
    }

    /**
     * Changes the magnitude of the point without changing the direction
     * @param {number} mag - New magnitude
     */
    setMagnitude(mag) {
        this.mult(mag / this.mag);
    }


    // Operations

    /**
     * @param {point} p - Point to compare
     * @returns Distance between each point.
     */
    dist(p) {
        this.checkPoint(p);
        let delta = this.minus(p);
        return delta.mag();
    }

    /**
     * @returns Magnitude or length of the point.
     */
    mag() {
        return Point.mag(this.x, this.y);
    }

    /**
     * @returns Magnitude of the vector given by its coordinates. 
     */
    static mag(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    /**
     * @param {Point} p - Point to use.
     * @returns New point with the addition of each coordinate (this + p).
     */
    plus(p) {
        this.checkPoint(p);
        return new Point(this.x + p.x, this.y + p.y);
    }

    /**
     * @param {Point} p - Point to use.
     * @returns The operation this - p; 
     */
    minus(p) {
        this.checkPoint(p);
        return this.plus(p.times(-1));
    }

    /**
     * @param {number} n - Number to multiply by.
     * @returns The operation n * this.
     */
    times(n) {
        return new Point(this.x * n, this.y * n);
    }

    /**
     * @param {Point} p - variable to check.
     * @returns True if the given input is a valid point.
     * 
     * @throws Exception if the input is not a valid point.
     */
    checkPoint(p) {
        if (p instanceof Point) {
            return true;
        }

        console.error(`Error with the given point!\n`, p, "\nIt is not a point!\n");
        throw new Error(`The given argument is not a point!`);
    }
}