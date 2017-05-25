/// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http'
import { inherits } from 'util'

interface ExpressRequest extends IncomingMessage {
    get(name: string): string
}

interface ExpressResponse extends ServerResponse {
    jsonp(): string;
}

let req = <ExpressRequest>{};

class ExpressRequest implements ExpressRequest {
    constructor() {

    }
}

let a = new ExpressRequest();