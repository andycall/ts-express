/// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http'

export interface ExpressRequest extends IncomingMessage {
    get(name: string): string
    header(name: string): string
}

export class ExpressRequest implements ExpressRequest {
    private _req: IncomingMessage;
    private _res: ServerResponse

    private proxyHandler(target: any, propKey: PropertyKey) {
        let returnValue = target[propKey];

        // fix this direction
        if (typeof returnValue === 'function') {
            return returnValue.bind(target);
        }

        return returnValue;
    }

    constructor(req: IncomingMessage, res: ServerResponse) {
        this._req = new Proxy<IncomingMessage>(req, this.proxyHandler);
        this._res = new Proxy<ServerResponse>(res, this.proxyHandler);
        
        Object.setPrototypeOf(this, req);
    }

    private getHeader(name: string) {
        if (!name) {
            throw new TypeError('name arguments is required to req.get');
        }

        if (typeof name !== 'string') {
            throw new TypeError('name must be string to req.get');
        }

        let lowerCase = name.toLowerCase();

        switch (lowerCase) {
            case 'referer':
            case 'referrer':
                return this._req.headers.referrer || this._req.headers.referer;
            default:
                return this._req.headers[lowerCase];
        }
    }
}
