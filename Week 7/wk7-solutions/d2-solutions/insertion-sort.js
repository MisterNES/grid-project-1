function insertionSort(list) {
  // for i from 1 to length(list) inclusive do:
  //   /* select value to be inserted */
  //   valueToInsert = list[i]
  //   holePosition = i
  //   /* locate hole position for the element to be inserted */
  //   while holePosition > 0 and list[holePosition-1] > valueToInsert do:
  //     list[holePosition] = list[holePosition-1]
  //     holePosition = holePosition -1
  //   end while
  //   /* insert the number at hole position */
  //   list[holePosition] = valueToInsert
  // end for
}

// Insertion sort keeps a sorted left region working from left to right examining
// each item and comparing it to items on its left. It then inserts the item in
// the correct oposition in the array.
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let valueToInsert = arr[i];

    let holePosition = i;
    while (holePosition > 0 && arr[holePosition - 1] > valueToInsert) {
      arr[holePosition] = arr[holePosition - 1];
      holePosition--;
    }
    arr[holePosition] = valueToInsert;
  }
  return arr;
}
