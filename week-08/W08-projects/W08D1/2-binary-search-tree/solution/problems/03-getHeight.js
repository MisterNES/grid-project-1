function getHeight(root) {
    if (!root) return -1;
    left = getHeight(root.left)
    right = getHeight(root.right)
    return 1 + Math.max(left, right);
}


function getHeightV2(root) {
    if (!root) return -1;

    let depth = 0;
    const stack = [[0, root]];
    let curr_depth = 0;
    let node = null;
    while (stack.length) {
        [curr_depth, node] = stack.pop()

        depth = Math.max(depth, curr_depth)
        if (node.left) stack.push([curr_depth + 1, node.left])
        if (node.right) stack.push([curr_depth + 1, node.right])
    }

    return depth
};



module.exports = {
    getHeight
};