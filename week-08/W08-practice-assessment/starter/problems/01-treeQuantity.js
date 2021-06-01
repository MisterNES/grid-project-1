//Please read the README before starting to work on the problem


// Recursive Solution

// What is my base case
// What is my recursive step
// What am I doing each time


// Preorder: Self, Left, Right

function treeQuantity(root, target){
    if (!root) {
        return 0;
    }
    let count = 0;
    if(root.val === target){
        count++;
    }

    return count + treeQuantity(root.left, target) + treeQuantity(root.right, target)
}

// treeQuantity(root.left, target)
// reeQuantity(root.right, target)



// Iterative Solution

function treeQuantity(root, target){
    if (!root) return 0;
    let count = 0;
    let stack = [root];

    while(stack.length) {
        let currentNode = stack.pop();
        if(currentNode.val === target) {
            count++
        };
        if(currentNode.left) stack.push(currentNode.left);
        if(currentNode.right) stack.push(currentNode.right);
    };

    return count;

};

module.exports = {
    treeQuantity
}