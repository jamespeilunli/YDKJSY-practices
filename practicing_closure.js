function range(start,end) {
    if (end !== undefined) {
        start = Number(start) || 0;
        end = Number(end) || 0;
        //return [...Array(end-start+1 > 0 ? end-start+1 : 0).keys()].map(i => start + i);

        let res = [];
        for (let i = start; i <= end; i++) {
            res.push(i);
        }
        return res;
    } else {
        return function(end) { return range(start, end); }
    }
}

console.log(
    range(3,3),    // [3]
    range(3,8),    // [3,4,5,6,7,8]
    range(3,0)    // []
)

var start3 = range(3);
var start4 = range(4);

console.log(
    start3(3),     // [3]
    start3(8),     // [3,4,5,6,7,8]
    start3(0),     // []

    start4(6)     // [4,5,6]
)

console.log(
    range(-123, -120),
    range(-6, -22),
    range("I LIKE TRAINS", 2),
    range("E", "EE"),
    range(0, 0),
    range(12390, 12400)
)