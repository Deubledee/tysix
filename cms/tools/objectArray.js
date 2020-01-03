export function getObjArr(content, withDescription) {
    let obj,
        arr = []
    if (typeof withDescription !== 'boolean') return 'second argument expected to be a boolean'
    for (let par in content) {
        if (par !== 'image') {
            if (!!withDescription) {
                if (par !== 'description') {
                    obj = Object()
                    obj[par] = content[par]
                    arr.push(obj)
                }
            } else {
                if (par === 'description') {
                    obj = Object()
                    obj[par] = content[par]
                    arr.push(obj)
                }
            }
        }
    }
    return arr || []
}
