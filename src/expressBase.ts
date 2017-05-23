/// <reference types="node" />

import _debug = require('debug')
const debug = _debug('express')
 
export interface NextFunction {
    (err?: any): void;
}

export class ExpressBase {
    cache: Map<string, string>
    engines: Map<string, string>
    settings: Map<string, any>

    constructor() {
        this.cache = new Map<string, string>();
        this.engines = new Map<string, string>();
        this.settings = new Map<string, any>();
    }

    defaultConfiguration() {
        let env = process.env.NODE_ENV || 'development';

        // TODO etag
        // TODO query parser
        // TODO subdomain offset
        // TODO trust proxy
        this.set('env', env);

        // TODO proxy configuration

        debug('booting in %s mode', env);

        // TODO mouting
        // TODO locals
        // TODO views
        // TODO moutpath
        // TODO view cache
        // TODO jsonp callback
    }

    /**
     * Mounted servers inherit their parent server's settings.
     * 
     * @param {string} settings 
     * @param {*} val
     * @return {ExpressBase} for chaining
     * @public
     */
    set(key: string, value: any): ExpressBase {
        if (arguments.length === 1) {
            console.warn('app.set require two params.');
            return this;
        }

        debug('set %s to %o', key, value)

        this.settings.set(key, value)

        return this;
    }

    /**
     * get server's settings value
     * 
     * @param {string} key
     * @return {*} 
     * @public
     */
    get(key: string): any {
        return this.settings.get(key);
    }

    /**
     * set a settings key to true
     * @param {string} key
     * @return {ExpressBase}
     * @public 
     */
    enable(key: string): ExpressBase {
        this.settings.set(key, true);
        return this;
    }

    /**
     * check a settings is true
     * @param {string} key
     * @return {boolean}
     * @public
     */
    enabled(key: string): boolean {
        return !!this.settings.get(key);
    }

    /**
     * set a settings key to false
     * @param {string} key
     * @return {ExpressBase}
     * @public 
     */
    disable(key: string) {
        this.settings.set(key, false);
        return this;
    }

    /**
     * check a settings key is false
     * @param {string} key
     * @return {boolean}
     * @public
     */
    disabled(key: string): boolean {
        return !this.settings.get(key);
    }
}