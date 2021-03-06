/// <reference types="node" />
import _debug = require('debug')
import http = require('http')
import net = require('net')
import { EventEmitter } from 'events'
import { ExpressRequest } from './request'
import { ExpressResponse } from './response'
import { Router } from './router/index'
import * as finalHandler from 'finalhandler'
const debug = _debug('express')
import {logerror} from './util'

export interface NextFunction {
    (err?: any): void;
}

export class ExpressBase extends EventEmitter {
    cache: Map<string, string>;
    engines: Map<string, string>;
    settings: Map<PropertyKey, any>;
    _server: http.Server;
    request: ExpressRequest;
    response: ExpressResponse;
    router: Router

    requestHandle: (req: http.IncomingMessage, res: http.ServerResponse) => void;

    constructor() {
        super();
        this.cache = new Map<string, string>();
        this.engines = new Map<string, string>();
        this.settings = new Map<string, any>();
        this.router = new Router();

        this.requestHandle = (req: http.IncomingMessage, res: http.ServerResponse) => {
            let request = this.request = ExpressRequest.call(this, req, res);
            let response = this.response = ExpressResponse.call(this, req, res);
            let done = finalHandler(request, response, {
                onerror: logerror
            });
            this.router.handle(request, response, done);
        }
    }

    defaultConfiguration() {
        let env = process.env.NODE_ENV || 'development';

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
    get(key: PropertyKey): any {
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

    /**
     * listening to a port
     * @param args 
     */
    listen(...args: any[]): net.Server {
        this._server = http.createServer(this.requestHandle);

        return this._server.listen.apply(this._server, args);
    }
}