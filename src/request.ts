/// <reference types="node" />

import { IncomingMessage } from 'http'

export interface ExpressRequest extends IncomingMessage {
    get(name: string): string
    header(name: string): string
}

export class ExpressRequest implements ExpressRequest {
    private _req: IncomingMessage;

    constructor(req: IncomingMessage) {
        this._req = req;

        // change the instance's prototype to http.IncomingMessage
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
