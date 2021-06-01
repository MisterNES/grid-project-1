//Please read the README before starting to work on the problem

//  using BFS use a queue
// can I get from point A to point B 
//  If i can then return True, else return False


function mutualFriends(adjacencyList, startName, endName){
    if(!adjacencyList[startName]){
        return false
    };

    let queue = [startName];

    let visited = new Set();

    while (queue.length){
        let curr = queue.shift();
        if(visited.has(curr))continue;
        visited.add(curr);
        if(curr === endName){
            return true;
        };
        queue.push(...adjacencyList[curr])
    }
    return false;
}

module.exports = {
    mutualFriends
}