export function proxyHandler(target: any, propKey: PropertyKey) {
    let returnValue = target[propKey];

    // fix this direction
    if (typeof returnValue === 'function') {
        return returnValue.bind(target);
    }

    return returnValue;
}