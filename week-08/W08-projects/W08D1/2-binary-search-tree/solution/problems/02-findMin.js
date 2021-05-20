function findMin(root) {
    if (!root) return null;
    
    let current = root;
    while (current.left) current = current.left;
    return current;
}


module.exports = {
  findMin
};