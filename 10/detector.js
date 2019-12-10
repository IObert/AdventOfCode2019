function getAsteriods(map) {
    const coordinates = [];
    map.split('\n').forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            if (line[x] === '#') {
                coordinates.push([x, y]);
            }
        }
    });
    return coordinates;
}

function getVector(location1, location2) {
    return [(location1[0] - location2[0]), (location1[1] - location2[1])];
}

function normalizeVector(vector) {
    const angle = Math.atan(Math.abs(vector[0]) / Math.abs(vector[1]));
    if (vector[0] >= 0 && vector[1] >= 0) {
        return angle;
    }
    if (vector[0] < 0 && vector[1] >= 0) { //Not the correct angle, but enought to differentiate
        return angle + 0.5 * Math.PI;
    }
    if (vector[0] < 0) {
        return angle + Math.PI;
    }
    return angle + 1.5 * Math.PI;
}

function countVisibleAsteriods(station, asteroids) {
    const vectors = asteroids
        .map(getVector.bind(null, station))
        .map(normalizeVector)

    return new Set(vectors).size - 1;
}


module.exports = {
    detect: (map) => {
        asteriods = getAsteriods(map);
        return asteriods.reduce((max, station, i) => {
            let visible = countVisibleAsteriods(station, asteriods);
            return visible > max ? visible : max
        }, 0);
    }
}