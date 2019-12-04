// Requirement 1: It is a six-digit number.
// Requirement 2: The value is within the range given in your puzzle input.
// Requirement 3: Two adjacent digits are the same (like 22 in 122345).
// Requirement 4: Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

const MIN = 158126; //fullfils requirement 2
const MAX = 624574;

function getNextCandidateA(num) { //fullfils requirement 3 and 4
    const numAsString = (num + '');
    const dig1 = numAsString[0];
    const dig2 = numAsString[1];
    const dig3 = numAsString[2];
    const dig4 = numAsString[3];
    const dig5 = numAsString[4];
    const dig6 = numAsString[5];

    if (dig1 > dig2) {
        return +(dig1 + dig1 + dig1 + dig1 + dig1 + dig1)
    }
    if (dig2 > dig3) {
        return +(dig1 + dig2 + dig2 + dig2 + dig2 + dig2)
    }
    if (dig3 > dig4) {
        return +(dig1 + dig2 + dig3 + dig3 + dig3 + dig3)
    }
    if (dig4 > dig5) {
        return +(dig1 + dig2 + dig3 + dig4 + dig4 + dig4)
    }
    if (dig5 > dig6) {
        return +(dig1 + dig2 + dig3 + dig4 + dig5 + dig5)
    }

    const adjacentsAreSame =
        dig1 === dig2 ||
        dig2 === dig3 ||
        dig3 === dig4 ||
        dig4 === dig5 ||
        dig5 === dig6;

    if (!adjacentsAreSame) {
        return getNextCandidateA(num + 1);
    }
    return num;
}

function getNextCandidateB(num) { //fullfils requirement 3 and 4
    const numAsString = (num + '');
    const dig1 = numAsString[0];
    const dig2 = numAsString[1];
    const dig3 = numAsString[2];
    const dig4 = numAsString[3];
    const dig5 = numAsString[4];
    const dig6 = numAsString[5];

    if (dig1 > dig2) {
        return getNextCandidateB(+(dig1 + dig1 + dig1 + dig1 + dig1 + dig1))
    }
    if (dig2 > dig3) {
        return getNextCandidateB(+(dig1 + dig2 + dig2 + dig2 + dig2 + dig2))
    }
    if (dig3 > dig4) {
        return getNextCandidateB(+(dig1 + dig2 + dig3 + dig3 + dig3 + dig3))
    }
    if (dig4 > dig5) {
        return getNextCandidateB(+(dig1 + dig2 + dig3 + dig4 + dig4 + dig4))
    }
    if (dig5 > dig6) {
        return getNextCandidateB(+(dig1 + dig2 + dig3 + dig4 + dig5 + dig5))
    }

    let onlyTwoSame = false;
    let previousAreSame = false;
    let adjacentsAreSame = numAsString[0] === numAsString[1];

    for (let idx = 0; idx < 5; idx++) {
        let digit1 = numAsString[idx];
        let digit2 = numAsString[idx + 1];
        let digit3 = numAsString[idx + 2];

        let nextAreSame = digit2 === digit3;
        onlyTwoSame = onlyTwoSame ||
            !previousAreSame && adjacentsAreSame && !nextAreSame

        previousAreSame = adjacentsAreSame;
        adjacentsAreSame = nextAreSame;
    }


    if (!onlyTwoSame) {
        return getNextCandidateB(num + 1);
    }
    return num;
}

let candidates = []
for (let number = MIN; number <= MAX;) { //fullfils requirement 1
    let candidate = getNextCandidateB(number);
    if (candidate > MAX) {
        break;
    }
    candidates.push(candidate);
    if (number === candidate) {
        number++;
        continue;
    }
    number = candidate + 1;
}

console.log(candidates.length)