/// <reference types="node" />
import { ExpressRequest } from '../request'
import { ExpressResponse } from '../response'

export interface NextFunction {
    (err?: any): void;
}

export interface RequestHandler {
    (req: ExpressRequest, res: ExpressResponse, next: NextFunction): any;
}

export class Router {
    private stack: any[];

    constructor() {
        this.stack = [];
    }

    get(path: string, handler: RequestHandler) {
        this.stack.push({
            method: 'get',
            path: path,
            handler
        });
    }

    emit(req: ExpressRequest, res: ExpressResponse) {
        let url = req.url;

        console.log(url);        
    }
}