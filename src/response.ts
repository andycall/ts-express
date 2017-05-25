/// <reference types="node" />

import { ServerResponse, IncomingMessage } from 'http'

export declare type responseBody = string | number | boolean | Buffer;

export interface ExpressResponse extends ServerResponse {
    status(code: number): ExpressResponse;
    send(body: responseBody): ExpressResponse;
}

export class ExpressResponse implements ExpressResponse {
    private _req: IncomingMessage;
    private _res: ServerResponse;

    constructor(req: IncomingMessage, res: ServerResponse) {
        this._res = res;
        this._req = req;

        // change the instance's prototype to http.ServerResponse
        Object.setPrototypeOf(this, res);
    }

    status(code: number): ExpressResponse {
        this.statusCode = code;
        return this;
    }

    send(body: responseBody) {


        return this;
    }

}