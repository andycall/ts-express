/// <reference types="path-to-regexp" />

import * as pathRegExp from 'path-to-regexp'
import {ExpressRequest} from '../request'
import {ExpressResponse} from '../response'
import {NextFunction, RequestHandler, PathParam} from './base'
import * as finalHandler from 'finalhandler'

export class Layer {
    private regexp: pathRegExp.PathRegExp;
    private regexp_fast_star: boolean;
    private regexp_fsat_slash: boolean;

    public params: any;
    public path: string;
    public keys: pathRegExp.Key[];
    public method: string;
    public handler: RequestHandler;

    constructor(method: string, path: PathParam, options: any = {}, fn: RequestHandler) {
        this.method = method;
        this.regexp = pathRegExp(path, this.keys, options);
        this.regexp_fast_star = path === '*';
        this.regexp_fsat_slash = path === '/' && options.end === false;
        this.handler = fn;
    }

    handleRequest(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
        try {
            this.handler(req, res, next);
        } catch (e) {
            if (process.env.NODE_DEBUG !== 'production') {
                console.error(e);
            }

            finalHandler(req, res)(e);
        }
    }

    handleError(req: ExpressRequest, res: ExpressResponse, err: Error) {
        if (process.env.NODE_DEBUG !== 'production') {
            console.error(err);
        }
        console.log(err);
        finalHandler(req, res)(err);
    }

    matchMethod(method: string = '') {
        if (this.method === '*') {
            return true;
        }

        return this.method.toLowerCase() === method.toLowerCase();
    }

    match(path: string, method: string) {
        let match = null;
        let isMethodMatch = this.matchMethod(method);

        if (!isMethodMatch) {
            return false;
        }

        if (path !== null) {
            if (this.regexp_fast_star) {
                // TODO add params
                return true;
            }

            if (this.regexp_fsat_slash) {
                // TODO add params
                return true;
            }

            match = this.regexp.exec(path);
        }

        return match;
    }
}