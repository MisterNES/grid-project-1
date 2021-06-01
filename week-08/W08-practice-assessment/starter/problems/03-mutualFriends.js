//Please read the README before starting to work on the problem


// if i can get from point A to point B return true
// else return false

// probs use a queue

function mutualFriends(adjacencyList, startName, endName){
    if(!adjacencyList[startName]) return false;

    let queue = [startName];

    let visited = new Set();

    while (queue.length){
        // do something
        let curr = queue.shift();
        if(visited.has(curr)) continue;
        visited.add(curr);
        if(curr === endName){
            return true;
        };
        // ---------------- We have not reached our end destination

        queue.push(...adjacencyList[curr])
    }
    return false;
}

module.exports = {
    mutualFriends
}