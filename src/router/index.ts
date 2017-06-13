/// <reference types="node" />

import {BaseRouter, RequestHandler, PathParam, RequestHandlerParams,} from "./base";
import {methods} from '../lib/methods';

export interface IRouterHandler<T> {
    (path: PathParam, ...handlers: RequestHandler[]): T;
    (path: PathParam, ...handlers: RequestHandlerParams[]): T;
}

export interface IRoute {
    all: IRouterHandler<void>;
    get: IRouterHandler<void>;
    post: IRouterHandler<void>;
    put: IRouterHandler<void>;
    head: IRouterHandler<void>;
    // delete: IRouterHandler<this>;
    // patch: IRouterHandler<this>;
    // options: IRouterHandler<this>;
    // head: IRouterHandler<this>;
    //
    // checkout: IRouterHandler<this>;
    // copy: IRouterHandler<this>;
    // lock: IRouterHandler<this>;
    // merge: IRouterHandler<this>;
    // mkactivity: IRouterHandler<this>;
    // mkcol: IRouterHandler<this>;
    // move: IRouterHandler<this>;
    // "m-search": IRouterHandler<this>;
    // notify: IRouterHandler<this>;
    // purge: IRouterHandler<this>;
    // report: IRouterHandler<this>;
    // search: IRouterHandler<this>;
    // subscribe: IRouterHandler<this>;
    // trace: IRouterHandler<this>;
    // unlock: IRouterHandler<this>;
    // unsubscribe: IRouterHandler<this>
}

export class Router extends BaseRouter implements IRoute {
    constructor() {
        super();
    }

    all(path: PathParam, ...callbacks: RequestHandler[]) {
        this._use('*', path, callbacks);
    }

    get(path: PathParam, ...callbacks: RequestHandler[]) {
        this._use('get', path, callbacks);
    }

    post(path: PathParam, ...callbacks: RequestHandler[]) {
        this._use('post', path, callbacks);
    }

    put(path: PathParam, ...callbacks: RequestHandler[]) {
        this._use('put', path, callbacks);
    }

    head(path: PathParam, ...callbacks: RequestHandler[]) {
        this._use('head', path, callbacks);
    }

    // TODO other methods...
}