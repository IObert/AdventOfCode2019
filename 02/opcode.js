const testInput = [[1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], [1, 0, 0, 0, 99], [2, 3, 0, 3, 99], [2, 4, 4, 5, 99, 0], [1, 1, 1, 4, 99, 5, 6, 0, 99]];
const { input } = require('./input');


function executeOpCode(opCode, noun, verb) {
    if (noun && verb) {
        input[1] = noun;
        input[2] = verb;
    }
    let opCodeCopy = opCode.slice(0);
    let pointerIncrease = 0;

    for (let instructionPointer = 0; opCodeCopy[instructionPointer] !== 99; instructionPointer = instructionPointer + pointerIncrease) {
        let doAdd = opCodeCopy[instructionPointer] === 1;
        let doMultiply = opCodeCopy[instructionPointer] === 2;

        let firstOperantIdx = opCodeCopy[instructionPointer + 1];
        let secondOperantIdx = opCodeCopy[instructionPointer + 2];
        let resultIdx = opCodeCopy[instructionPointer + 3];

        if (doAdd) {
            opCodeCopy[resultIdx] = opCodeCopy[firstOperantIdx] + opCodeCopy[secondOperantIdx];
            pointerIncrease = 4;
            continue;
        } else if (doMultiply) {
            opCodeCopy[resultIdx] = opCodeCopy[firstOperantIdx] * opCodeCopy[secondOperantIdx];
            pointerIncrease = 4;
            continue;
        }
        throw ("Crash, release magic smoke!")
    }
    return opCodeCopy[0];
}


// Test runs
console.log(testInput.map(executeOpCode));

// Part 1
console.log(executeOpCode(input, 12, 2));

// Part 2
for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        result = 0;
        try {
            result = executeOpCode(input, noun, verb);
        } catch (e) { }
        if (result === 19690720) {
            console.log(`Found solution \n Noun: ${noun} Verb: ${verb}`);
            return;
        }
    }
}
console.error("No solution found :(")