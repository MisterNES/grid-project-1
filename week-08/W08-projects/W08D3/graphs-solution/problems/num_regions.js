
function numRegions(graph) {
    let visited = new Set();
    let regions = 0;

    for (let node in graph) {
        if(!visited.has(node)){
            isNewRegion(node, graph, visited)
            regions++;
        } 
    }

    return regions;
}

function isNewRegion(node, graph, visited) {
    if (visited.has(node)) return;

    visited.add(node);

    graph[node].forEach((neighbor) => {
        isNewRegion(neighbor, graph, visited);
    });

}


module.exports = {
    numRegions
};