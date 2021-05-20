function maxValue(node, visited = new Set()) {

    if (visited.has(node.val)) return;
    visited.add(node.val);

    for (let neighbor of node.neighbors) {
        maxValue(neighbor, visited);
    }

    return Math.max(...Array.from(visited));
}



function maxValueBFS(node){
    let queue = [node];
    let visited = new Set();
    let max_value = -Infinity;

    while (queue.length) {
        let node = queue.shift();

        if (visited.has(node)) continue;
        visited.add(node);

        if (node.val > max_value) max_value = node.val;

        queue.push(...node.neighbors);
    }

    return max_value;
}






module.exports = {
    maxValue
};