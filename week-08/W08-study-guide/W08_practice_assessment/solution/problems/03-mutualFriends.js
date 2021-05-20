function mutualFriends(adjacencyList, startName, endName) {
    
    //if the graph is empty return false
    if(!adjacencyList[startName]){
        return false;
    }
    // We're doing BFS so we know we need a QUEUE
    let queue = [startName];
    // Track our visited friends.
    let visited = new Set();
    // While there are friends left to visit
    while (queue.length) {
        // We remove a friend from the queue
        let name = queue.shift();
        // Check if we've already visited them. if we have, we move on
        if (visited.has(name)) continue;
        // If we haven't, we add them to the visited Set 
        visited.add(name);
        // Have we reached Jesse yet?
        if (name === endName) {
            // if so, we know we're done and we can return the number of friends we've
            // visited, which is the length of the visited set (minus Joe)
            return true;
        }
        // Otherwise let's add all the friends at our current friend, and run this again
       
        queue.push(...adjacencyList[name]);
        
    }
    // if our whole loop happened and we didn't get to Jesse, it means he's not a
    // part of the graph or there's no path between Joe and Jesse
    return false;
}

module.exports = {
    mutualFriends
}