const testInput = [{
    wire1: ['R8', 'U5', 'L5', 'D3'],
    wire2: ['U7', 'R6', 'D4', 'L4']
}, {
    wire1: ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
    wire2: ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
}, {
    wire1: ['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51'],
    wire2: ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7']
}];
const input = require('./input');

var helperMaps = {
    A: {},
    B: {}
};

function absoluteSum(akku, num) {
    if (num < 0) {
        num = -num;
    };
    return akku + num
}

function min(min, num) {
    min = min || num;
    return min > num ? num : min;
}

function convertSegment(segment) {
    const directionKey = segment[0];
    var deltaVector = {
        R: [0, 1],
        L: [0, -1],
        U: [1, 0],
        D: [-1, 0]
    };
    return {
        length: +segment.slice(1),
        addVector: (location) => location.map((coordinate, i) => coordinate + deltaVector[directionKey][i])

    }
}

function calcVisitedNodes(route, id) {
    let currectLocation = [0, 0];
    let takenSteps = 0;
    let path = new Set([]);

    route.map(convertSegment).forEach((move) => {
        for (let step = 0; step < move.length; step++) {
            takenSteps++;
            currectLocation = move.addVector(currectLocation);
            let location = currectLocation.join(',');
            path.add(location); //save as string to allow easy comparison
            helperMaps[id][location] = helperMaps[id][location] || takenSteps;
        }
    });
    return path;
}

function findIntersections(wire1, wire2) {
    const path1 = calcVisitedNodes(wire1, 'A');
    const path2 = calcVisitedNodes(wire2, 'B');
    const intersections = new Set(
        [...path1].filter(x => path2.has(x)));

    return intersections;
}

function calcManhattenDist(input) {
    return input.split(',')
        .map((string) => +string)
        .reduce(absoluteSum, 0)
}

function calcStepDist(input) {
    return helperMaps.A[input] + helperMaps.B[input];
}

function findNearestIntersection(wires) {
    const intersections = findIntersections(wires.wire1, wires.wire2)
    return [...intersections].map(calcManhattenDist).reduce(min);
}

function findClosestIntersection(wires) {
    const intersections = findIntersections(wires.wire1, wires.wire2)
    return [...intersections].map(calcStepDist).reduce(min);
}

console.log(testInput.map(findNearestIntersection));
console.log(findNearestIntersection(input));

console.log(testInput.map(findClosestIntersection));
console.log(findClosestIntersection(input));