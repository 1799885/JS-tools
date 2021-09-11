class SegmentCollision {

    static eps = 0.0000001;
    static between (a, b, c) {
        return a - this.eps <= b && b <= c + this.eps;
    }

    static collide(x1, y1, x2, y2, x3, y3, x4, y4) {
        var x = (( x1 * y2 - y1 * x2 ) * ( x3 - x4 ) - ( x1 - x2 ) * ( x3 * y4 - y3 * x4 )) /
                (( x1 - x2 ) * ( y3 - y4 ) - ( y1 - y2 ) * ( x3 - x4 ));
        var y = (( x1 * y2 - y1 * x2 ) * ( y3 - y4 ) - ( y1 - y2 ) * ( x3 * y4 - y3 * x4 )) /
                (( x1 - x2 ) * ( y3 - y4 ) - ( y1 - y2 ) * ( x3 - x4 ));

        if (isNaN(x) || isNaN(y)) {
            return false;
        }
        else {
            if (x1 >= x2) {
                if (!this.between(x2, x, x1)) {
                    return false;
                }
            } else {
                if (!this.between(x1, x, x2)) {
                    return false;
                }
            }

            if (y1 >= y2) {
                if (!this.between(y2, y, y1)) {
                    return false;
                }
            }
            else {
                if (!this.between(y1, y, y2)) {
                    return false;
                }
            }

            if (x3 >= x4) {
                if (!this.between(x4, x, x3)) {
                    return false;
                }
            } else {
                if (!this.between(x3, x, x4)) {
                    return false;
                }
            }

            if (y3 >= y4) {
                if (!this.between(y4, y, y3)) {
                    return false;
                }
            } else {
                if (!this.between(y3, y, y4)) {
                    return false;
                }
            }
        }
        return {x: x, y: y};
    }
}


if (require && require.main === module) {
    let tests = [
        [
            [ [ 0, 0 ], [ 5, 5 ] ],
            [ [ 0, 5 ], [ 5, 0 ] ]
        ],
        [
            [ [ 0, 0 ], [ 5, 5 ] ],
            [ [ 1, 1 ], [ 5, 5 ] ]
        ],
        [
            [ [ -20, 20 ], [ 18, 5 ] ],
            [ [ -15, 20 ], [ 0, 0 ] ]
        ],
    ];
    
    for (let i = 0; i < tests.length; i++) {
        let t = []
        for (let l = 0; l < 2; l++) {
            for (let p = 0; p < 2; p++) {
                t.push(...tests[i][l][p])
            }
        }
        if (SegmentCollision.collide(...t)) {
            console.log("Lines are intersecting");
        }
        else {
            console.log("Lines are not intersecting");
        }
    }
    
}