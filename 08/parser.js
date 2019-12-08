module.exports = {
    separateLayers: (input, width, height) => {
        const layers = [];
        let offset = 0;
        while (input.length > offset) {
            layers.push(input.slice(offset, offset + width * height))
            offset += width * height;
        }
        return layers;
    },
    countOccurences: (layer, compare) => {
        let count = 0;
        for (const c of layer) {
            count = c === compare ? count + 1 : count;
        }
        return count;
    }
}