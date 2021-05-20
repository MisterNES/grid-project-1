// View the full problem and run the test cases at:
//  https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

const { TreeNode } = require("./01-bst");

function sortedArrayToBST(nums) {
    if(!nums.length) return null;
    
    let midIdx = Math.floor(nums.length / 2);

    // we use the middle element of the array as our root
    let root = new TreeNode(nums[midIdx]); 

    // the root's left subtree is a recursive call on the left side of the array
    root.left = sortedArrayToBST(nums.slice(0, midIdx));

    // the root's right subtree is a recursive call on the right side of the array
    root.right = sortedArrayToBST(nums.slice(midIdx + 1));
    
    return root;
}


function sortedArrayToBST(nums) {
    function helper(start, end) {
        if (start > end) {
            return null
        }
        let mid = Math.floor(start + end / 2)
        let root = TreeNode(nums[mid])
        root.left = helper(start, mid - 1)
        root.right = helper(mid + 1, end)
        return root
    }

    return helper(0, nums.length - 1)
}