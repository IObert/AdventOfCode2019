const { input } = require('./input');
// const input = [[1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], [1, 0, 0, 0, 99], [2, 3, 0, 3, 99], [2, 4, 4, 5, 99, 0], [1, 1, 1, 4, 99, 5, 6, 0, 99]];

function executeOpCode(opCode) {
    for (let i = 0; opCode[i] !== 99; i = i + 4) {
        let doAdd = opCode[i] === 1;
        let doMultiply = opCode[i] === 2;

        let firstOperantIdx = opCode[i + 1];
        let secondOperantIdx = opCode[i + 2];
        let resultIdx = opCode[i + 3];

        if (doAdd) {
            opCode[resultIdx] = opCode[firstOperantIdx] + opCode[secondOperantIdx];
            continue;
        } else if (doMultiply) {
            opCode[resultIdx] = opCode[firstOperantIdx] * opCode[secondOperantIdx];
            continue;
        }

        console.error("Blub")
        return;
    }
    return opCode;
}

// console.log(input.map(executeOpCode));
console.log(executeOpCode(input));