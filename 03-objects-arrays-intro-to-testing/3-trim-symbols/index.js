/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (size === 0) {
        return ''
    }

    const arr = string.split('')
    let l = 0

    for (let r = 1; r < arr.length; r++) {
        if (arr[l] !== arr[r]) {
            l = r
        } else {
            while (r + 1 - l > size) {
                arr[l] = -1
                l++
            }
        }
    }

    return arr.filter((char) => char !== -1).join('')
}
