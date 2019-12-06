
module.exports = {
    countRelationships: (input) => {
        const outboundRels = {}, inboundRels = {};

        for (let relationship of input) {
            const [from, to] = relationship.split(')');
            outboundRels[from] = outboundRels[from] || [];
            outboundRels[to] = outboundRels[to] || [];
            outboundRels[from].push(to);

            inboundRels[to] = from;
        }

        function countRelationships(node) {
            const parent = inboundRels[node];
            if (!parent) {
                return 0;
            }
            return countRelationships(parent) + 1
        }

        return Object.keys(outboundRels).reduce((akku, node) => akku + countRelationships(node), 0);
    }
};