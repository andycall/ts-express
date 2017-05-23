/// <reference types="node" />
/**
 * Express framework written by typescript
 */
import { EventEmitter } from 'events';
export declare class ExpressApp extends EventEmitter {
}
declare function createExpressApp(): ExpressApp;
export default createExpressApp;
