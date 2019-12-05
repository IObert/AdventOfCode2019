const END = 99;

module.exports = {
    execute: (sourceCode, input) => {
        let instructionPointer = 0;

        function getOperants(param, basePointer) {
            const paramMode = [param % 10 === 1, param % 100 >= 10, param >= 100];

            return {
                getOperator: (offset) => paramMode[offset - 1] ? sourceCode[basePointer + offset] : sourceCode[sourceCode[basePointer + offset]],
                setResult: (offset, result) => { sourceCode[sourceCode[basePointer + offset]] = result }
            }
        }

        while (sourceCode[instructionPointer] !== END) {

            const instruction = sourceCode[instructionPointer];

            let opCode = instruction % 100;
            let paramMode = Math.floor(instruction / 100);

            const { getOperator: getOp, setResult: setRes } = getOperants(paramMode, instructionPointer);

            if (opCode === 1) {
                setRes(3, getOp(1) + getOp(2));
                instructionPointer += 4;
            }
            if (opCode === 2) {
                setRes(3, getOp(1) * getOp(2));
                instructionPointer += 4;
            }
            if (opCode === 3) {
                setRes(1, input);
                instructionPointer += 2;
            }
            if (opCode === 4) {
                console.log(getOp(1))
                instructionPointer += 2;
            }
        }
    }
}