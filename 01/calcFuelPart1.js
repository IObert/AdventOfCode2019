const { input } = require('./input');

function calcFuelPerModule(weight) {
    return Math.floor(weight / 3) - 2
}

function reduceSum(iAkku, iNext) {
    return iAkku + iNext;
}

// console.log(input.map(calcFuelPerModule));
console.log(input.map(calcFuelPerModule).reduce(reduceSum, 0))