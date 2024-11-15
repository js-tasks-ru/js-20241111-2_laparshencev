/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const pathSlices = path.split('.')

    return (obj) => {
        for (const slice of pathSlices) {
            if (!obj.hasOwnProperty(slice)) {
                return
            }

            obj = obj?.[slice]
        }

        return obj
    }
}
