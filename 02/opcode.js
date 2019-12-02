// const input = [[1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], [1, 0, 0, 0, 99], [2, 3, 0, 3, 99], [2, 4, 4, 5, 99, 0], [1, 1, 1, 4, 99, 5, 6, 0, 99]];
const { input } = require('./input');


function executeOpCode(opCode, noun, verb) {
    if (noun && verb) {
        input[1] = 12;
        input[2] = 2;
    }
    let pointerIncrease = 0;
    for (let instructionPointer = 0; opCode[instructionPointer] !== 99; instructionPointer = instructionPointer + pointerIncrease) {
        let doAdd = opCode[instructionPointer] === 1;
        let doMultiply = opCode[instructionPointer] === 2;

        let firstOperantIdx = opCode[instructionPointer + 1];
        let secondOperantIdx = opCode[instructionPointer + 2];
        let resultIdx = opCode[instructionPointer + 3];

        if (doAdd) {
            opCode[resultIdx] = opCode[firstOperantIdx] + opCode[secondOperantIdx];
            pointerIncrease = 4;
            continue;
        } else if (doMultiply) {
            opCode[resultIdx] = opCode[firstOperantIdx] * opCode[secondOperantIdx];
            pointerIncrease = 4;
            continue;
        }

        console.error("Blub")
        return;
    }
    return opCode[0];
}

// console.log(input.map(executeOpCode));
console.log(executeOpCode(input, 12, 2));