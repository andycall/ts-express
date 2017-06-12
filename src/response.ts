/// <reference types="node" />

import { ServerResponse, IncomingMessage } from 'http'
import {mime} from 'send'

export declare type responseBody = string | number | boolean | Buffer;

export interface ExpressResponse extends ServerResponse {
    status(code: number): ExpressResponse;
    send(body: responseBody): ExpressResponse;
}

const charsetRegExp = /;\s*charset\s*=/;

export class ExpressResponse implements ExpressResponse {
    public _req: IncomingMessage;
    public _res: ServerResponse;

    private proxyHandler(target: any, propKey: PropertyKey) {
        let returnValue = target[propKey];

        // fix this direction
        if (typeof returnValue === 'function') {
            return returnValue.bind(target);
        }

        return returnValue;
    }

    constructor(req: IncomingMessage, res: ServerResponse) {
        this._req = new Proxy<IncomingMessage>(req, {
            get: this.proxyHandler
        });

        this._res = new Proxy<ServerResponse>(res, {
            get: this.proxyHandler
        });

        Object.setPrototypeOf(this, this._res);
    }

    status(code: number): ExpressResponse {
        this.statusCode = code;
        return this;
    }

    header(field: string, val: string) {
        return this.set(field, val);
    }

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
    }

    get(field: string) {
        return this.getHeader(field);
    }

    type(type: string) {

    };

    send(body: responseBody) {
        let chunk = body;

        return this;
    }
}