// @flow

/** Filters data by returning the items that contain at least one entry of a specific prop
 * Ex. Filter by all movies with awards
 */
export const filterByProp = (
  selector: string,
) => (data: Array<*>): Array<*> => {
  if (!data || !data.length) {
    return []
  }

  return data.filter(entry => entry[selector] && entry[selector].length)
}

/** Filters data by returning the items that contain at least one matching value of a specific prop
 * Ex. Filter by all adventure genre movies
*/
export const filterByValue = (
  selector: string,
  value: string,
) => (data: Array<*>): Array<*> => {
  if (!data || !data.length) {
    return []
  }

  return data.filter(entry => entry[selector] && entry[selector].includes(value))
}
