/**
 * Code taken from https://gist.github.com/gordonwoodhull/50eb65d2f048789f9558, full credit to the author. 
 */
class SegmentCollision {

    static eps = 0.0000001;
    
    static between (a, b, c) {
        return a - this.eps <= b && b <= c + this.eps;
    }
    
    /**
     * Whenever two segments collide.
     * @param {object} x1-y1 First point of the first segment.
     * @param {object} x2-y2 Second point of the first segment.
     * @param {object} x3-y3 First point of the second segment.
     * @param {object} x4-y4 Second point of the second segment.
     * @returns {boolean|object} False if there's no collision. Else, {x: X, y: Y} object with the collision point.
     */
    static collision(x1, y1, x2, y2, x3, y3, x4, y4) {
        // Try to get collision coordinates
        let x = (( x1 * y2 - y1 * x2 ) * ( x3 - x4 ) - ( x1 - x2 ) * ( x3 * y4 - y3 * x4 )) /
                (( x1 - x2 ) * ( y3 - y4 ) - ( y1 - y2 ) * ( x3 - x4 ));
        let y = (( x1 * y2 - y1 * x2 ) * ( y3 - y4 ) - ( y1 - y2 ) * ( x3 * y4 - y3 * x4 )) /
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


    /**
     * Whenever two segments Intersect. This means the collision point is not the vertices of the lines
     * @param {object} x1-y1 First point of the first segment.
     * @param {object} x2-y2 Second point of the first segment.
     * @param {object} x3-y3 First point of the second segment.
     * @param {object} x4-y4 Second point of the second segment.
     * @returns {boolean|object} False if there's no collision. Else, {x: X, y: Y} object with the collision point.
     */
    static intersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        let c = this.collision(x1, y1, x2, y2, x3, y3, x4, y4);
        if (!c) { // If points not colliding
            return false;
        }
        // If collision, check if edges connected (-> intersection = false)

        let l1 = [[x1, y1], [x2, y2]];
        let l2 = [[x3, y3], [x4, y4]];
        
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (l1[i][0] == l2[j][0] && l1[i][1] == l2[j][1]) {
                    return false;
                }
            }
        }

        return c;
    }
}


if (typeof require !== 'undefined' && require.main === module) {
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
        [
            [ [ 99, 214 ], [ 124, 172 ] ],
            [ [ 99, 214 ], [ 161, 301 ] ]
        ]
    ];
    
    for (let i = 0; i < tests.length; i++) {
        let t = []
        for (let l = 0; l < 2; l++) {
            for (let p = 0; p < 2; p++) {
                t.push(...tests[i][l][p])
            }
        }
        console.log(`Test ${i}`);
        let c = SegmentCollision.collision(...t);
        let inter = SegmentCollision.intersection(...t);

        if (c) {
            console.log(" - Lines are colliding");
        }
        else {
            console.log(" - Lines are not colliding");
        }

        if (inter) {
            console.log(" - Lines are intersecting");
        }
        else {
            console.log(" - Lines are not intersecting");
        }
        console.log("\n")
    }
    
}