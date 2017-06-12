/// <reference types="node" />

import {IncomingMessage, ServerResponse} from "http";
import {mime} from "send";
import {proxyGetter, proxySetter, isString, setCharset, toString} from "./util";

export declare type responseBody = string | number | boolean | Buffer;

export interface ExpressResponse extends ServerResponse {
    status(code: number): ExpressResponse;
    send(body: responseBody): ExpressResponse;
    set(field: string, val: string): ExpressResponse;
    header(field: string, val: string): ExpressResponse;
    get(field: string): string;
    json(obj: any): ExpressResponse;
    setContentType(t: string): ExpressResponse
}

const charsetRegExp = /;\s*charset\s*=/;

export function ExpressResponse(req: IncomingMessage, res: ServerResponse) {
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
        },

        send(chunk: responseBody) {
            let encoding = 'utf-8';

            switch (typeof chunk) {
                case 'string':
                    if (this.get('Content-Type')) {
                        this.setContentType('html');
                    }
                    let type = this.get('Content-Type');

                    if (isString(type)) {
                        this.set('Content-Type', setCharset(type, 'utf-8'))
                    }

                    break;

                case 'boolean':
                case 'number':
                case 'object':
                    if (chunk == null) {
                        chunk = ''
                    } else if (Buffer.isBuffer(chunk) && !this.get('Content-Type')) {
                        this.setContentType('bin')
                    } else {
                        return this.json(chunk)
                    }
            }

            if (chunk) {
                if (!Buffer.isBuffer(chunk)) {
                    chunk = Buffer.from(Object.prototype.toString.call(chunk), encoding);
                }

                let len = chunk.length;
                this.set('Content-Length', toString(len));
            }

            let statusCode = this.statusCode;

            if (statusCode === 204 || statusCode === 304) {
                this.removeHeader('Content-Type');
                this.removeHeader('Content-Length');
                this.removeHeader('Transfer-Encoding');
                chunk = '';
            }

            if (req.method === 'HEAD') {
                res.end();
            } else {
                res.end(chunk, encoding);
            }

            return this;
        },

        json(obj: any): ExpressResponse {
            let str = JSON.stringify(obj);

            if (this.get('Content-Type')) {
                this.set('Content-Type', 'application/json');
            }

            return this.send(str);
        },

        setContentType(t: string): ExpressResponse {
            let ct = t.indexOf('/') === -1
                ? mime.lookup(t)
                : t;

            return this.set('Content-Type', ct);
        }
    };

    res = new Proxy<ServerResponse>(res, {
        get: proxyGetter
    });

    Object.setPrototypeOf(response, res);

    response = new Proxy<ExpressResponse>(response, {
        set: proxySetter(res)
    });

    return response;
}