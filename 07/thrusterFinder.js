const { execute } = require('./intMachine');

function arrayToIterator(arr) {
    return Array.prototype.pop.bind(arr);
}

async function findMaxThrusterA(program, phases) {
    var max = 0;

    for (let prevOutput = 0; prevOutput <= 100; prevOutput++) {
        for (let phase = 0; phase < phases.length; phase++) {
            await execute(program.slice(0), 0, arrayToIterator([prevOutput, phases[phase]]))
                .then(res => prevOutput = res.output);
        }

        max = max < prevOutput ? prevOutput : max
    }
    return max;
}

async function findMaxThrusterB(program, phases, init) {
    let currentAmp = 0, terminated = false;
    const amplifiers = [program.slice(0), program.slice(0), program.slice(0), program.slice(0), program.slice(0)];
    const pointers = [0, 0, 0, 0, 0];
    const input = phases.map((element) => [element]);
    let counter;

    input[currentAmp] = [0, ...input[currentAmp]];

    while (!terminated) {
        await execute(amplifiers[currentAmp], pointers[currentAmp], arrayToIterator(input[currentAmp]))
            .then(res => {
                terminated = res.terminated && currentAmp === 4;
                input[currentAmp] = [];
                pointers[currentAmp] = res.pointer;

                let nextAmp = (currentAmp + 1) % 5;
                input[nextAmp] = [res.output, ...input[nextAmp]];
                counter = res.output || counter;

                currentAmp = nextAmp;

            });

    }
    return counter;
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
    findMaxThrusterA: findMaxThrusterA,
    findMaxThrusterB: findMaxThrusterB,
    getPermutations: perm
}