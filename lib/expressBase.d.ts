/// <reference types="node" />
import http = require('http');
import net = require('net');
export interface NextFunction {
    (err?: any): void;
}
export declare class ExpressBase {
    cache: Map<string, string>;
    engines: Map<string, string>;
    settings: Map<string, any>;
    _server: http.Server;
    constructor();
    requestHandle(req: http.IncomingMessage, res: http.ServerResponse): void;
    defaultConfiguration(): void;
    /**
     * Mounted servers inherit their parent server's settings.
     *
     * @param {string} settings
     * @param {*} val
     * @return {ExpressBase} for chaining
     * @public
     */
    set(key: string, value: any): ExpressBase;
    /**
     * get server's settings value
     *
     * @param {string} key
     * @return {*}
     * @public
     */
    get(key: string): any;
    /**
     * set a settings key to true
     * @param {string} key
     * @return {ExpressBase}
     * @public
     */
    enable(key: string): ExpressBase;
    /**
     * check a settings is true
     * @param {string} key
     * @return {boolean}
     * @public
     */
    enabled(key: string): boolean;
    /**
     * set a settings key to false
     * @param {string} key
     * @return {ExpressBase}
     * @public
     */
    disable(key: string): this;
    /**
     * check a settings key is false
     * @param {string} key
     * @return {boolean}
     * @public
     */
    disabled(key: string): boolean;
    listen(...args: any[]): net.Server;
}
