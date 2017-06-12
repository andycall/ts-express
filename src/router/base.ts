/// <reference types="mocha" />
import {ExpressRequest} from '../request'
import {ExpressResponse} from '../response'
import {EventEmitter} from 'events'
import {Layer} from './layer'
import * as finalHandler from 'finalhandler'

export interface NextFunction {
    (err?: any): void;
}

export interface RequestHandler {
    (req: ExpressRequest, res: ExpressResponse, next: NextFunction): any;
}

export interface ErrorRequestHandler {
    (err: any, req: ExpressRequest, res: ExpressResponse, next: NextFunction): any;
}

export type PathParam = string | RegExp | (string | RegExp)[];
export type RequestHandlerParams = RequestHandler | ErrorRequestHandler | (RequestHandler | ErrorRequestHandler)[];

interface IRouterMatcher<T> {
    (path: PathParam, ...handlers: RequestHandler[]): T;
    (path: PathParam, ...handlers: RequestHandlerParams[]): T;
}

export class BaseRouter extends EventEmitter {
    private path: string;
    private stack: Layer[];

    constructor() {
        super();
        this.stack = [];
    }

    /**
     * register callbacks and paths
     * @param method
     * @param path
     * @param callbacks
     * @private
     */
    _use(method: string, path: PathParam, callbacks: RequestHandler[]) {
        callbacks.forEach(callback => {
            let layer = new Layer(method, path, {}, callback);
            this.stack.push(layer);
        });
    }

    use(...callbacks: RequestHandler[]) {
        this._use('*', '/', callbacks);
    }

    useWithPath(path: string, ...callbacks: RequestHandler[]) {
        this._use('*', path, callbacks);
    }

    /**
     *
     * @param req
     * @param res
     * @param done
     */
    handle(req: ExpressRequest, res: ExpressResponse, done: (err?: any) => void | RequestHandler) {
        let layerIndex = 0;
        let stack = this.stack;

        next();

        function next() {
            if (layerIndex >= stack.length) {
                setImmediate(done);
                return;
            }

            let baseUrl = BaseRouter._getRequestUrl(req);
            let match = null;
            let selectedLayer = null;
            let method = req.method || '';

            while (!match && layerIndex < stack.length) {
                selectedLayer = stack[layerIndex++];
                match = selectedLayer.match(baseUrl, method);
            }

            if (!match || !selectedLayer) {
                return done();
            }

            selectedLayer.handler_request(req, res, next);
        }
    }

    static _getRequestUrl(req: ExpressRequest) {
        return req.url || '';
    }
}