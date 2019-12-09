const END = 99;


module.exports = {
    execute: (sourceCode, instructionPointer, fnGetInput) => {

        let relativeBasePointer = 0;

        function getParamModifiers(param, instructionPointer) {
            const paramMode = [
                param % 10,
                (param - param % 10) / 10 % 10,
                Math.floor(param / 100),
            ];

            return {
                getOperand: (offset) => paramMode[offset - 1] === 0 ?
                    sourceCode[sourceCode[instructionPointer + offset]] :
                    paramMode[offset - 1] === 1 ?
                        sourceCode[instructionPointer + offset] :
                        sourceCode[relativeBasePointer + sourceCode[instructionPointer + offset]],
                setResult: (offset, result) => {
                    if (paramMode[offset - 1] === 2) {
                        sourceCode[relativeBasePointer + sourceCode[instructionPointer + offset]] = result
                    }
                    sourceCode[sourceCode[instructionPointer + offset]] = result
                }
            }
        }

        return new Promise(function (resolve, reject) {
            while (sourceCode[instructionPointer] !== END) {

                const instruction = sourceCode[instructionPointer];

                let opCode = instruction % 100;
                let paramMode = Math.floor(instruction / 100);

                const { getOperand, setResult } = getParamModifiers(paramMode, instructionPointer);

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
                        setResult(1, fnGetInput());
                        continue;
                    case 4:
                        instructionPointer += 2;

                        console.log(getOperand(1));
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
                    case 9:
                        instructionPointer += 2;

                        relativeBasePointer += getOperand(1);
                        continue;
                }

                reject(`Unknown code: ${opCode}`);
            }

            resolve({ terminated: true });

        });
    }
}