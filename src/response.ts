/// <reference types="node" />
/// <reference path="./index.d.ts" />

import {IncomingMessage, ServerResponse} from "http";
import {mime} from "send";
import {proxyGetter, proxySetter, isString, setCharset} from "./util";
import {ExpressBase} from './expressBase'
import * as encodeurl from 'encodeurl'

export declare type responseBody = string | number | boolean | Buffer | null | any;

export interface ExpressResponse extends ServerResponse {
    status(code: number): ExpressResponse;
    send(body?: responseBody): ExpressResponse;
    set(field: string, val: string | number | string[] | number[]): ExpressResponse;
    header(field: string, val: string): ExpressResponse;
    get(field: string): string;
    json(obj: any): ExpressResponse;
    setContentType(t: string): ExpressResponse;
    redirect(url: string, status?: number): ExpressBase;
    app: ExpressBase
}

const charsetRegExp = /;\s*charset\s*=/;

export function ExpressResponse(this: ExpressBase, req: IncomingMessage, res: ServerResponse) {
    let response = <ExpressResponse>{
        app: this,
        status(code: number): ExpressResponse {
            this.statusCode = code;
            return this;
        },

        set(field: string, val: string | string[] | any[]) {
            if (field.toLowerCase() === 'content-type') {
                if (Array.isArray(val)) {
                    throw new TypeError('Content-Type cannot be set to an Array')
                }

                if (!charsetRegExp.test(val)) {
                    let charset = mime.charsets.lookup(val.split(';')[0]);
                    if (charset) {
                        val += '; charset=' + charset.toLowerCase();
                    }
                }
            }

            if (Array.isArray(val)) {
                val = Array.prototype.map.call(val, String);
            }
            else {
                val = String(val);
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

        send(chunk?: responseBody) {
            let encoding = 'utf-8';

            switch (typeof chunk) {
                case 'string':
                    if (!this.get('Content-Type')) {
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
                    } else if (Buffer.isBuffer(chunk)) {
                        if (!this.get('Content-Type')) {
                            this.setContentType('bin')
                        }
                    } else {
                        return this.json(chunk)
                    }
            }

            if (chunk) {
                if (!Buffer.isBuffer(chunk)) {
                    chunk = Buffer.from(chunk.toString(), encoding);
                }

                let len = chunk.length;
                this.set('Content-Length', len.toString());
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

            if (!this.get('Content-Type')) {
                this.set('Content-Type', 'application/json');
            }

            return this.send(str);
        },

        setContentType(t: string): ExpressResponse {
            let ct = t.indexOf('/') === -1
                ? mime.lookup(t)
                : t;

            return this.set('Content-Type', ct);
        },

        redirect(url: string, status: number = 302) {
            url = encodeurl(url);

            this.set('Location', url);
            this.statusCode = status;

            let body = `<p>${status} Redirecting to <a href="${url}">${url}</a></p>`

            this.set('Content-Length', Buffer.byteLength(body));

            if (this.app.request.method === 'HEAD') {
                this.end();
            } else {
                this.end(body);
            }
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