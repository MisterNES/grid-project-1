class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}


class BST {
    constructor() {
        this.root = null
    }

    insert(val) {
        if (!this.root) {
            this.root = new TreeNode(val)
            return;
        }
        let thisValue = this.root;
        while (thisValue) {
            if (val < thisValue.val) {
                if (!thisValue.left) {
                    thisValue.left = new TreeNode(val)
                    return;
                }
                thisValue = thisValue.left;
            } else {
                if (!thisValue.right) {
                    thisValue.right = new TreeNode(val)
                    return;
                }
                thisValue = thisValue.right;
            }
        }
    }

    insertRecur(val, current = this.root){
        if (!this.root) {
            this.root = new TreeNode(val)
            return;
        }

        if (val < current.val){
            if(current.left){
                this.insertRecur(val, current.left)
            }else{
                current.left = new TreeNode(val)
                return
            }
        }else{
            if (current.right) {
                this.insertRecur(val, current.right)
            } else {
                current.right = new TreeNode(val)
                return
            }
        }
    }
    

    searchRecur(val, currentNode = this.root) {
        if (!currentNode) return false;

        if (val < currentNode.val) {
            return this.searchRecur(val, currentNode.left);
        } else if (val > currentNode.val) {
            return this.searchRecur(val, currentNode.right);
        } else {
            return true;
        }
    }

    searchIter(val) {
        let currentNode = this.root;

        while (currentNode) {
            if (val < currentNode.val) {
                currentNode = currentNode.left;
            } else if (val > currentNode.val) {
                currentNode = currentNode.right;
            } else {
                return true;
            }
        }

        return false;
    }
}

module.exports = {
    TreeNode,
    BST
};