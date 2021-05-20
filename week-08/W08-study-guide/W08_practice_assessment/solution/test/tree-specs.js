const chai = require('chai');
chai.use(require('chai-spies'));
const { expect, spy } = chai;

const { treeQuantity } = require('../problems/01-treeQuantity');

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function constructTree() {
    let a = new TreeNode(10);
    let b = new TreeNode(15);
    let c = new TreeNode(10);
    let d = new TreeNode(10);
    let e = new TreeNode(17);
    let f = new TreeNode(2);
    let g = new TreeNode(15);

    a.left = b;
    a.right = c;
    b.left = d;
    b.right = e;
    c.left = f;
    c.right = g;

    return a;
};

describe('treeQuantity()', () => {
    it('should return 0 for an empty tree', () => {
        expect(treeQuantity(null, 7)).to.eql(0);
    });

    it('should return 0 if the tree does not contain the target value', () => {
        let root = new TreeNode(5);
        expect(treeQuantity(root, 7)).to.eql(0);

        root = constructTree();
        expect(treeQuantity(root, 7)).to.eql(0);
    });

    it('should return a positive number corresponding to how many times the target value is occurs in the tree', () => {
        let root = constructTree();
        expect(treeQuantity(root, 2)).to.eql(1);
        expect(treeQuantity(root, 15)).to.eql(2);
        expect(treeQuantity(root, 10)).to.eql(3);
    })
})