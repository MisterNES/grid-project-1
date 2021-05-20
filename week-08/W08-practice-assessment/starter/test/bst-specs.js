const chai = require('chai');
chai.use(require('chai-spies'));
const { expect, spy } = chai;

const { bstMinMax } = require('../problems/02-bstMinMax');

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function constructBST1() {
  let a = new TreeNode(20);
  let b = new TreeNode(10);
  let c = new TreeNode(35);
  let d = new TreeNode(4);
  let e = new TreeNode(12);
  let f = new TreeNode(27);
  let g = new TreeNode(39);
  let h = new TreeNode(7);
  let i = new TreeNode(31);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.left = f;
  c.right = g;
  d.right = h;
  f.right = i;

  return a;
}

function constructBST2() {
  let a = new TreeNode(20);
  let b = new TreeNode(10);
  let c = new TreeNode(25);
  let d = new TreeNode(4);
  let e = new TreeNode(12);
  let f = new TreeNode(22);
  let g = new TreeNode(29);
  let h = new TreeNode(7);
  let i = new TreeNode(24);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.left = f;
  c.right = g;
  d.right = h;
  f.right = i;

  return a;
}

describe('bstMinMax()', () => {
  it('should return null if the tree does not exist', () => {
    expect(bstMinMax(null, 5)).to.eql(null);
  });

  it('should return the root value if the root has no children', () => {
    let root = new TreeNode(5);
    expect(bstMinMax(root, 9)).to.eql(5);
  });

  it('should return the min value if there is no right child', () => {
    let root = new TreeNode(5);
    let min = new TreeNode(1);
    root.left = min;
    expect(bstMinMax(root, -4)).to.eql(1);
  });

  it('should return the max value if there is no left child', () => {
    let root = new TreeNode(5);
    let max = new TreeNode(7);
    root.right = max;
    expect(bstMinMax(root, 14)).to.eql(7);
  });

  it('should return the min value of the tree if it is closer to the target value than the max', () => {
    let root = new TreeNode(5);
    let min = new TreeNode(1);
    let max = new TreeNode(20);
    root.left = min;
    root.right = max;
    expect(bstMinMax(root, 9)).to.eql(1);
    expect(bstMinMax(constructBST1(), 13)).to.eql(4);
  });

  it('should return the max value of the tree if it is closer to the target value than the min', () => {
    let root = new TreeNode(5);
    let min = new TreeNode(1);
    let max = new TreeNode(7);
    root.left = min;
    root.right = max;
    expect(bstMinMax(root, 6)).to.eql(7);
    expect(bstMinMax(constructBST2(), 30)).to.eql(29);
  });
});