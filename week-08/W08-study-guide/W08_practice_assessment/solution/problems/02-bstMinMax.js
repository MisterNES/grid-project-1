function bstMinMax(root, target) {
    if(!root) return root

    let curr = root;
    while (curr.left) curr = curr.left; 
    const min = curr.val;

    curr = root;
    while (curr.right) curr = curr.right;
    const max = curr.val;
    
    return Math.abs(target - min) < Math.abs(target - max) ? min : max;
}

module.exports = { bstMinMax };