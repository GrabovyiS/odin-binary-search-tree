const removeDuplicates = (array) => {
  // The passed in array is a reference (like a pointer), so we could mutate it inside the function
  const copyArray = [];

  for (let i = 0; i < array.length; i++) {
    copyArray[i] = array[i];
  }

  // Iterating through the array like this is very bad for time complexity.
  // This could be made better by using a hash map that is populated during one loop
  // And then during the other loop checking things with the hash map

  for (let i = 0; i < copyArray.length; i++) {
    for (let j = 0; j < copyArray.length; j++) {
      if (i !== j && copyArray[i] === copyArray[j]) {
        copyArray.splice(i, 1);
        // Indices in the array changed
        // Move iterators so that we don't skip anything
        i--;
        j--;
      }
    }
  }

  return copyArray;
};

export default removeDuplicates;
