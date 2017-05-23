/// <reference types="node" />
/// <reference types="merge-descriptors"/>

import { ExpressBase } from './expressBase'

export class Express extends ExpressBase {
    constructor() {
        super();
    }
}

function createExpressApp() {
    return new Express ();
}

export default createExpressApp;