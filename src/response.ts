/// <reference types="node" />

import { ServerResponse, IncomingMessage } from 'http'

export declare type responseBody = string | number | boolean | Buffer;

export interface ExpressResponse extends ServerResponse {
    status(code: number): ExpressResponse;
    send(body: responseBody): ExpressResponse;
}

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

    send(body: responseBody) {
        return this;
    }
}