const mergeSort = (array) => {
  if (array.length === 1) {
    return array;
  }
  const middleIndex = Math.floor(array.length / 2);

  // sort left half
  let leftHalf = array.slice(0, middleIndex);
  leftHalf = mergeSort(leftHalf);

  // sort right half
  let rightHalf = array.slice(middleIndex);
  rightHalf = mergeSort(rightHalf);

  // merge the sorted halves
  let sorted = [];
  let firstLeft;
  let firstRight;

  while (leftHalf.length > 0 || rightHalf.length > 0) {
    // Always look at the first element
    // and remove them once they are sorted
    if (leftHalf.length > 0 && rightHalf.length === 0) {
      firstLeft = leftHalf.shift();
      sorted.push(firstLeft);
      continue;
    }

    if (leftHalf.length === 0 && rightHalf.length > 0) {
      firstRight = rightHalf.shift();
      sorted.push(firstRight);
      continue;
    }

    if (leftHalf[0] < rightHalf[0]) {
      firstLeft = leftHalf.shift();
      sorted.push(firstLeft);
    } else {
      firstRight = rightHalf.shift();
      sorted.push(firstRight);
    }
  }

  return sorted;
};

export default mergeSort;
