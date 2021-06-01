//Please read the README before starting to work on the problem



//  Recursively

// What is my base case
// What is my recursive step
// What am I doing each iteration

// function treeQuantity(root, target){
//     if(!root) return 0;

//     let count = 0;

//     if(root.val === target){
//         count++
//     }

//     let left = treeQuantity(root.left, target);
//     let right = treeQuantity(root.right, target);


//     return count + left + right;

// }



// Iteratively

function treeQuantity(root, target){

    if(!root) return 0;

    let count = 0;

    let stack = [root];

    while(stack.length){
        let currentNode = stack.pop();
        if(currentNode.val === target){
            count++
        }
        if(currentNode.left) stack.push(currentNode.left)
        if(currentNode.right) stack.push(currentNode.right)
    }
    return count;
}

module.exports = {
    treeQuantity
}