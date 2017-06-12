import * as contentType from 'content-type'

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

export function isString(obj: any) {
    return typeof obj === 'string';
}

export function toString(val: any) {
    return Object.prototype.toString.call(val);
}

export function setCharset(mimeType: string, charset: string) {
    if (!mimeType || !charset) {
        return mimeType;
    }

    let parseInfo = contentType.parse(mimeType);

    parseInfo.parameters.charset = charset;

    return contentType.format(parseInfo);
}