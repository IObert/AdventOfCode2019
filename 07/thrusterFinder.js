const { execute } = require('./intMachine');

function findMaxThruster(program, phases) {
    var max = 0;

    for (let prevOutput = 0; prevOutput <= 100; prevOutput++) {
        phases.forEach(input => {
            prevOutput = execute(program, [prevOutput, input])
        });

        max = max < prevOutput ? prevOutput : max
    }
    return max;
}

function perm(xs) { //from https://stackoverflow.com/questions/37579994/generate-permutations-of-javascript-array
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if (!rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}

module.exports = {
    findMaxThruster: findMaxThruster,
    getPermutations: perm
}