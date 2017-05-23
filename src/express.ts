/// <reference types="node" />
/// <reference types="merge-descriptors"/>

/**
 * Express framework written by typescript
 */


import { EventEmitter } from 'events'

export class ExpressApp extends EventEmitter {
    
}

function createExpressApp() {
    return new ExpressApp();
}

export default createExpressApp;