function constructRels(input) {
    const outboundRels = {}, inboundRels = {};

    for (let relationship of input) {
        const [from, to] = relationship.split(')');

        outboundRels[from] = outboundRels[from] || [];
        outboundRels[to] = outboundRels[to] || [];
        outboundRels[from].push(to);

        inboundRels[to] = from;
    }

    return [outboundRels, inboundRels];
}


module.exports = {

    countRelationships: (input) => {
        const [outboundRels, inboundRels] = constructRels(input);

        function countRelationships(node) {
            const parent = inboundRels[node];
            if (!parent) {
                return 0;
            }
            return countRelationships(parent) + 1
        }

        return Object.keys(outboundRels).reduce((akku, node) => akku + countRelationships(node), 0);
    },

    calcDist: (input) => {

        const [outboundRels, inboundRels] = constructRels(input);

        function calcPath(node) {
            const parent = inboundRels[node];
            if (!parent) {
                return new Set([]);
            }
            return calcPath(parent).add(node);
        }

        const jumpsSource2Root = calcPath(inboundRels['YOU']);
        const jumpsDest2Root = calcPath(inboundRels['SAN']);

        let intersection = new Set(
            [...jumpsSource2Root].filter(x => jumpsDest2Root.has(x)));

        return jumpsSource2Root.size + jumpsDest2Root.size - 2 * intersection.size;
    }
};