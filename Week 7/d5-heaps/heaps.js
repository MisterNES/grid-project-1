

class MaxHeap {
  constructor() {
    this.store = [null];
  }

  buildHeap(li) {
    // O(n)
    li.forEach((n) => this.insert(n));
  }

  insert(value) {
    this.store.push(value);
    this.siftUp(this.store.length - 1);
  }

  siftUp(idx) {
    // O(log n)
    if (idx === 1) return;

    const parentIdx = Math.floor(idx / 2);
    const parentValue = this.store[parentIdx];
    const childValue = this.store[idx];

    if (childValue > parentValue) {
      this.swap(this.store, parentIdx, idx);
      this.siftUp(parentIdx);
    }
  }

  deleteMax() {
    const max = this.store[1];
    this.store[1] = this.store.pop();
    this.siftDown(1);
    return max;
  }

  siftDown(idx) {
    const li = this.store;
    const currValue = li[idx];
    const leftChildIndex = idx * 2;
    const rightChildIndex = idx * 2 + 1;
    let leftValue = li[leftChildIndex];
    let rightValue = li[rightChildIndex];

    // need to set to -Infinity to make sure there is a comparison value
    if (leftValue === undefined) leftValue = -Infinity;
    if (rightValue === undefined) rightValue = -Infinity;

    // is parent larger than both children?
    // (24 > 50 && 24 > 27)
    if (currValue > leftValue && currValue > rightValue) return;

    const swapIdx = leftValue > rightValue ? leftIdx : rightIdx;

    // [null, 24, 50, 27, 32, 42]
    //    [50, 42, 27, 32, 24]
    //         50
    //     42       27
    // 32     24

    // if not larger than both children, pick a swapIdx
    // 50 > 27

    this.swap(li, idx, swapIdx);
    this.siftDown(swapIdx);
  }

  swap(li, i, j) {
    // [null, 24, 50, 27, 32, 42], 1, 2
    [li[i], li[j]] = [li[j], li[i]];
    // res = [null, 50, 24, 27, 32, 42]
  }
}

const maxHeap = new MaxHeap();

maxHeap.buildHeap([12, 14, 5, 2, 100, 11, 8]);

console.log(maxHeap.store);

console.log(maxHeap.deleteMax());

console.log(maxHeap.store);

const heapSort = (array) => {
  // Time O(n log n) - Space O(1)

  buildMaxHeap(array); // [ 8,  11, 2, 12, 5, 14, 100]
  //  heap            sorted

  const sorted = [];
  for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {
    swap(array, 0, endOfHeap);
    heapify(array, endOfHeap, 0);
  }

  return array;
};

const buildMaxHeap = (array) => {
  // simplified T(n / 2) => O(n)
  const midIdx = Math.floor(array.length / 2);

  for (let i = midIdx - 1; i >= 0; i--) {
    heapify(array, array.length, i);
  }
};

const heapify = (array, len, idx) => {
  // O(log n)
  const leftIdx = 2 * idx + 1;
  const rightIdx = 2 * idx + 2;
  const currValue = array[idx];
  let leftValue = array[leftIdx];
  let rightValue = array[rightIdx];

  if (leftIdx >= len) leftValue = -Infinity;
  if (rightIdx >= len) rightValue = -Infinity;

  if (currValue > leftValue && currValue > rightValue) return;

  const swapIdx = leftValue > rightValue ? leftIdx : rightIdx;

  swap(array, idx, swapIdx);
  heapify(array, len, swapIdx);
};

const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};
