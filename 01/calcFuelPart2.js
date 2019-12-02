const { input } = require('./input');
// const input = [14, 1969, 100756];

function calcFuelPerModule(weight) {
    let fuelweight = Math.floor(weight / 3) - 2;
    if (fuelweight < 0) {
        return 0;
    }
    return fuelweight + calcFuelPerModule(fuelweight);
}

function reduceSum(iAkku, iNext) {
    return iAkku + iNext;
}

// console.log(input.map(calcFuelPerModule));
console.log(input.map(calcFuelPerModule).reduce(reduceSum, 0))