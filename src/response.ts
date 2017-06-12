/// <reference types="node" />

import {ServerResponse} from "http";
import {mime} from "send";

export declare type responseBody = string | number | boolean | Buffer;

export interface ExpressResponse extends ServerResponse {
    status(code: number): ExpressResponse;
    send(body: responseBody): ExpressResponse;
    set(field: string, val: string): ExpressResponse;
    header(field: string, val: string): ExpressResponse;
    get(field: string): string;
}

const charsetRegExp = /;\s*charset\s*=/;

export function ExpressResponse(res: ServerResponse) {
    let response = <ExpressResponse>{
        status(code: number): ExpressResponse {
            this.statusCode = code;
            return this;
        },

        set(field: string, val: string) {
            if (field.toLowerCase() === 'content-type') {
                if (!charsetRegExp.test(val)) {
                    let charset = mime.charsets.lookup(val.split(';')[0]);
                    if (charset) {
                        val += `; charset=${charset.toLowerCase()}`;
                    }
                }
            }

            this.setHeader(field, val);
            return this;
        },

        header(field: string, val: string) {
            return this.set(field, val);
        },

        get(field: string) {
            return this.getHeader(field);
        }
    };

    function proxyHandler(target: any, propKey: PropertyKey) {
        let returnValue = target[propKey];

        // fix this direction
        if (typeof returnValue === 'function') {
            return returnValue.bind(target);
        }

        return returnValue;
    }

    res = new Proxy<ServerResponse>(res, {
        get: proxyHandler,
        set: proxyHandler
    });

    Object.setPrototypeOf(response, res);

    return response;
}