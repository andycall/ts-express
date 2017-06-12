export function proxyGetter(target: any, propKey: PropertyKey) {
    let returnValue = target[propKey];

    // fix this direction
    if (typeof returnValue === 'function') {
        return returnValue.bind(target);
    }

    return returnValue;
}

export function proxySetter(proxyTarget: any) {

    return (target: any, props: PropertyKey, value: any, receiver: any): boolean => {
        Object.defineProperty(proxyTarget, props, {
            value: value,
            writable: true
        });

        target[props] = value;

        return true;
    }
}