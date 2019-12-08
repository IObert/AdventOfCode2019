function separateLayers(input, width, height) {
    const layers = [];
    let offset = 0;
    while (input.length > offset) {
        layers.push(input.slice(offset, offset + width * height))
        offset += width * height;
    }
    return layers;
};

function countOccurences(layer, compare) {
    let count = 0;
    for (const c of layer) {
        count = c === compare ? count + 1 : count;
    }
    return count;
};

function calcPixel(front, back) {
    return (front !== "2") ? front : back;
}

function decodeImage(number, width, height) {
    return separateLayers(number, width, height)
        .reduce((front, back) => {
            let combined = '';
            for (let pos = 0; pos < width * height; pos++) {
                combined += calcPixel(front[pos], back[pos]);
            }
            return combined;

        });
}

module.exports = {
    calcProduct: (number, width, height) => {
        const result = separateLayers(number, width, height)
            .reduce((akku, layer) => {
                const zeros = countOccurences(layer, "0");
                if (akku.fewestZeros > zeros) {
                    return {
                        fewestZeros: zeros,
                        product: countOccurences(layer, "1") * countOccurences(layer, "2")
                    }
                }
                return akku;
            }, { fewestZeros: 99 });
        return result.product;
    },
    decodeImage: decodeImage,
    printImage: (number, width, height) => {
        let output;
        const message = decodeImage(number, width, height);
        for (let pos = 0; pos < width * height; pos++) {
            if (pos % width === 0) {
                console.log(output);
                console.log(output);
                output = '';
            }
            output += message[pos] === "0" ? "■■" : "□□";
        }
    }
}