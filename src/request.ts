/// <reference types="node" />

import {IncomingMessage} from "http";
import {proxyGetter, proxySetter} from "./util";

export interface ExpressRequest extends IncomingMessage {
    get(name: string): string
    header(name: string): string
}

export function ExpressRequest(req: IncomingMessage): ExpressRequest {
    let request = <ExpressRequest>{
        header: function (name: string): string {
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
                    return this.headers.referrer || this.headers.referer;
                default:
                    return this.headers[lowerCase];
            }
        }
    };

    req = new Proxy<IncomingMessage>(req, {
        get: proxyGetter
    });

    Object.setPrototypeOf(request, req);

    request = new Proxy<ExpressRequest>(request, {
        set: proxySetter(req)
    });

    return request;
}