// @flow

/**
 * Returns an index of where a given element might be in an array
 * Assumes the array it receives is sorted
 */
export const binarySearch = (
  array: Array<*>,
  elementToFind: number | string | any,
  start: number = 0,
  end: number = array.length - 1,
): number =>  {
  if (end < start) {
    return -1
  }

  var middle = Math.floor((start + end) / 2) // Divide the whole array in two portions

  return elementToFind === array[middle] // Element equals the middle one? Perfect
    ? middle
    : elementToFind < array[middle] // Element is smaller than the middle one
      ? binarySearch(array, elementToFind, start, middle - 1)
      : binarySearch(array, elementToFind, middle + 1, end)
}


