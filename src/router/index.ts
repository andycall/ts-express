/// <reference types="mocha" />
import { ExpressRequest } from '../request'
import { ExpressResponse } from '../response'
import { EventEmitter } from 'events'

export interface NextFunction {
    (err?: any): void;
}

export interface RequestHandler {
    (req: ExpressRequest, res: ExpressResponse, next?: NextFunction): any;
}

type stackItem = {
    method: string;
    path: string;
    handler: RequestHandler
}

type middleWareItem = {
    path: string;
    handler: RequestHandler
}

export class Router extends EventEmitter {
    private stacks: stackItem[];
    private middleware: middleWareItem[];

    constructor() {
        super();
        this.stacks = [];
        this.middleware = [];
    }

    use(path: string, handler: RequestHandler) {
        this.middleware.push({
            path,
            handler
        });
    }

    next() {}

    get(path: string, handler: RequestHandler) {
        this.stacks.push({
            method: 'get',
            path: path,
            handler
        });
    }
 
    match(req: ExpressRequest, res: ExpressResponse) {
        // middlware match
        let url = req.url;

        for(let stack of this.stacks) {
            let path = stack.path;
            if (path === url) {
                stack.handler(req, res);
            }
        }
    }
}