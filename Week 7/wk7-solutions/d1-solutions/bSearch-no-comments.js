// Binary Search, Five Different Ways!

// Recursive Boolean
function recurBSearch(nums, target) {
  if (nums.length === 0) {
    return false;
  }

  const midIdx = Math.floor(nums.length / 2);
  const midEl = nums[midIdx];
  const leftHalf = nums.slice(0, midIdx);
  const rightHalf = nums.slice(midIdx + 1);
  if (target < midEl) {
    return recurBSearch(leftHalf, target);
  } else if (target > midEl) {
    return recurBSearch(rightHalf, target);
  } else {
    return true;
  }
}

// Iterative Boolean
function iterBSearch(nums, target) {
  let lowerIdx = 0;
  let upperIdx = array.length - 1;
  let midIdx;

  while (lowerIdx <= upperIdx) {
    midIdx = Math.floor((lowerIdx + upperIdx) / 2);

    if (nums[midIdx] < target) {
      lowerIdx = midIdx + 1;
    } else if (nums[midIdx] > target) {
      upperIdx = midIdx - 1;
    } else {
      return true;
    }
  }

  return false;
}

// Recursive Index
function recurBSearchIdx(nums, target) {
  if (!nums.length) return -1;

  const midIdx = Math.floor(nums.length / 2);
  const midEl = nums[midIdx];

  const leftHalf = nums.slice(0, midIdx);
  const rightHalf = nums.slice(midIdx + 1);

  if (target < midEl) {
    return recurBSearchIdx(leftHalf, target);
  } else if (target > midEl) {
    const idxShift = recurBSearchIdx(rightHalf, target);
    if (idxShift === -1) {
      return -1;
    } else {
      return idxShift + midIdx + 1;
    }
  } else {
    return midIdx;
  }
}

// Recursive Index v2
function recurBSearchIdxV2(nums, target, lo = 0, hi = nums.length - 1) {
  if (lo === hi && nums[lo] !== target) {
    return -1;
  }

  let midIdx = Math.floor((lo + hi) / 2);

  if (target < nums[midIdx]) {
    return recurBSearchIdxV2(nums, target, lo, midIdx);
  } else if (target > nums[midIdx]) {
    return recurBSearchIdxV2(nums, target, midIdx + 1, hi);
  } else {
    return midIdx;
  }
}

// Iterative Index
function iterBSearchIdx(nums, target) {
  let lowerIdx = 0;
  let upperIdx = array.length - 1;
  let midIdx;

  while (lowerIdx <= upperIdx) {
    midIdx = Math.floor((lowerIdx + upperIdx) / 2);
    if (nums[midIdx] < target) {
      lowerIdx = midIdx + 1;
    } else if (nums[midIdx] > target) {
      upperIdx = midIdx - 1;
    } else {
      return midIdx;
    }
  }

  return -1;
}

module.exports = {
  recurBSearch,
  iterBSearch,
  recurBSearchIdx,
  recurBSearchIdxV2,
  iterBSearchIdx,
};
