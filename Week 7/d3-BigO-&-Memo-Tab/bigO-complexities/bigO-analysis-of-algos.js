//Linear Search
function search(array, term) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == term) {
      return i;
    }
  }
  return -1;
}

//What do you think the Big-O of Linear Search is?

//Why?

/*****************************************************************/
//Binary Search
function binarySearch(arr, x, start, end) {
  if (start > end) return false;

  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === x) return true;

  if (arr[mid] > x) {
    return binarySearch(arr, x, start, mid - 1);
  } else {
    return binarySearch(arr, x, mid + 1, end);
  }
}

//What do you think the Big-O of Binary Search is?

//Why?

/*****************************************************************/
//Merge Sort
function merge(leftArray, rightArray) {
  const sorted = [];
  while (leftArray.length > 0 && rightArray.length > 0) {
    const leftItem = leftArray[0];
    const rightItem = rightArray[0];

    if (leftItem > rightItem) {
      sorted.push(rightItem);
      rightArray.shift();
    } else {
      sorted.push(leftItem);
      leftArray.shift();
    }
  }

  while (leftArray.length !== 0) {
    const value = leftArray.shift();
    sorted.push(value);
  }

  while (rightArray.length !== 0) {
    const value = rightArray.shift();
    sorted.push(value);
  }

  return sorted;
}

function mergeSort(array) {
  const length = array.length;
  if (length == 1) {
    return array;
  }

  const middleIndex = Math.ceil(length / 2);
  const leftArray = array.slice(0, middleIndex);
  const rightArray = array.slice(middleIndex, length);

  leftArray = mergeSort(leftArray);
  rightArray = mergeSort(rightArray);

  return merge(leftArray, rightArray);
}

//What do you think the Big-O of MergeSort is?

//Why?

/*****************************************************************/
//Bubble Sort
function bubbleSort(items) {
  var length = items.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - i - 1; j++) {
      if (items[j] > items[j + 1]) {
        var tmp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = tmp;
      }
    }
  }
}

//What do you think the Big-O of BubbleSort is?

//Why?

/*****************************************************************/

/*
Answers:
Linear Search: Linear Search has a BigO of O(n) because as the input(n)
increases, so do the number of steps to complete the algorithm.

Binary Search: Binary Search has a time complexity of O(log(n)) because
we cut the size of the input in half after every recursive call, which
limits the number of steps it takes to reach the target. Binary Search
has a space complexity of O(n) since we use slice to create new arrays,
which do take up some additional memory.

Merge Sort: Merge Sort has a time complexity of O(n log(n)) because 
while we split the array in half recursively (O(log(n))), we are 
doing so inside of a while loop(iteratively === O(n)). So the total
complexity is O(n * log(n)).

Bubble Sort: Bubble sort has a time complexity of O(n^2) due to the 
nested loops. The space complexity is O(1) because the space needed 
to sort remains constant.

*/