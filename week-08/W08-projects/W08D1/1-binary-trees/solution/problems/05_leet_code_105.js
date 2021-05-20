// View the full problem and run the test cases at:
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

const { TreeNode } = require('./01_tree_node.js');


function buildTree(preorder, inorder) {
    if (!preorder.length && !inorder.length) return null;

    // the first element in the preorder array is the root
    let root = new TreeNode(preorder[0]);
    let rootIdx = inorder.indexOf(preorder[0]);

    // the left subtree is everything in the inorder array to the left of the root
    let leftInorder = inorder.slice(0, rootIdx);

    // the right subtree is everything in the inorder array to the right of the root
    let rightInorder = inorder.slice(rootIdx + 1);

    // to build the left subtree, the values in the leftPreorder array have to be the same as the ones in the leftInorder array
    let leftPreorder = preorder.filter(val => leftInorder.includes(val));

    // to build the left subtree, the values in the leftPreorder array have to be the same as the ones in the leftInorder array
    let rightPreorder = preorder.filter(val => rightInorder.includes(val));

    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);

    return root;
}

function buildTree(preorder, inorder) {
    function helper(start,end){
        if (start > end){
            return null
        }

        let rootVal = preorder.shift()
        let index = inorder_index_map[rootVal]

        let root = new TreeNode(rootVal)
        root.left = helper(start, index - 1)
        root.right = helper(index + 1, end)
        return root
    }
    //the object will store num:idx so we can have O(1)
    // lookup when we are getting the index of the root 
    // in the inorder array
    inorder_index_map = {}
    for (let i = 0; i < inorder.length; i++){
        inorder_index_map[inorder[i]] = i
    }
    return helper(0,inorder.length - 1)
}
