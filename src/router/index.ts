/// <reference types="node" />
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

export class Router extends EventEmitter {
    private stacks: stackItem[];

    constructor() {
        super();
        this.stacks = [];
    }

    get(path: string, handler: RequestHandler) {
        this.stacks.push({
            method: 'get',
            path: path,
            handler
        });
    }
 
    match(req: ExpressRequest, res: ExpressResponse) {
        let url = req.url;

        for(let stack of this.stacks) {
            let path = stack.path;
            if (path === url) {
                stack.handler(req, res);
            }
        }
    }
}