const END = 99;

module.exports = {
    execute: (sourceCode, input) => {
        sourceCode = sourceCode.slice(0);
        let instructionPointer = 0;
        let lastOutput;

        function getOperants(param, basePointer) {
            const paramMode = [param % 10 === 1, param % 100 >= 10, param >= 100];

            return {
                getOperand: (offset) => paramMode[offset - 1] ? sourceCode[basePointer + offset] : sourceCode[sourceCode[basePointer + offset]],
                setResult: (offset, result) => { sourceCode[sourceCode[basePointer + offset]] = result }
            }
        }

        while (sourceCode[instructionPointer] !== END) {

            const instruction = sourceCode[instructionPointer];

            let opCode = instruction % 100;
            let paramMode = Math.floor(instruction / 100);

            const { getOperand, setResult } = getOperants(paramMode, instructionPointer);

            switch (opCode) {
                case 1:
                    instructionPointer += 4;

                    setResult(3, getOperand(1) + getOperand(2));
                    continue;
                case 2:
                    instructionPointer += 4;

                    setResult(3, getOperand(1) * getOperand(2));
                    continue;
                case 3:
                    instructionPointer += 2;
                    setResult(1, input.pop());
                    continue;
                case 4:
                    instructionPointer += 2;

                    // console.log(getOperand(1))
                    lastOutput = getOperand(1);
                    continue;
                case 5:
                    instructionPointer += 3;
                    if (getOperand(1) !== 0) {
                        instructionPointer = getOperand(2);
                    }
                    continue;
                case 6:
                    instructionPointer += 3;
                    if (getOperand(1) === 0) {
                        instructionPointer = getOperand(2);
                    }
                    continue;
                case 7:
                    instructionPointer += 4;

                    setResult(3, getOperand(1) < getOperand(2) ? 1 : 0);
                    continue;
                case 8:
                    instructionPointer += 4;

                    setResult(3, getOperand(1) === getOperand(2) ? 1 : 0);
                    continue;
            }

            throw (`Unknown code: ${opCode}`)
        }
        return lastOutput;
    }
}