// recursion
function treeQuantity(root, target) {
    if (!root) return 0;
    const count = root.val === target ? 1 : 0;
    // let count = 0;
    // if (root.val === target){
    //     count += 1
    // }
    return count + treeQuantity(root.left, target) + treeQuantity(root.right, target);
}

// iterative
function treeQuantity(root, target) {
    if (!root) return 0;
    let count = 0;
    const stack = [root];
    while (stack.length) {
        let curr = stack.pop();
        if (curr.val === target) count++;
        if (curr.right) stack.push(curr.right);
        if (curr.left) stack.push(curr.left);
    }
    return count;
}

module.exports = {
    treeQuantity
}