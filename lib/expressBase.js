"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const _debug = require("debug");
const http = require("http");
const debug = _debug('express');
class ExpressBase {
    constructor() {
        this.cache = new Map();
        this.engines = new Map();
        this.settings = new Map();
    }
    requestHandle(req, res) {
        console.log(req.url);
        console.log('.....');
        res.end('1234');
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
    set(key, value) {
        if (arguments.length === 1) {
            console.warn('app.set require two params.');
            return this;
        }
        debug('set %s to %o', key, value);
        this.settings.set(key, value);
        return this;
    }
    /**
     * get server's settings value
     *
     * @param {string} key
     * @return {*}
     * @public
     */
    get(key) {
        return this.settings.get(key);
    }
    /**
     * set a settings key to true
     * @param {string} key
     * @return {ExpressBase}
     * @public
     */
    enable(key) {
        this.settings.set(key, true);
        return this;
    }
    /**
     * check a settings is true
     * @param {string} key
     * @return {boolean}
     * @public
     */
    enabled(key) {
        return !!this.settings.get(key);
    }
    /**
     * set a settings key to false
     * @param {string} key
     * @return {ExpressBase}
     * @public
     */
    disable(key) {
        this.settings.set(key, false);
        return this;
    }
    /**
     * check a settings key is false
     * @param {string} key
     * @return {boolean}
     * @public
     */
    disabled(key) {
        return !this.settings.get(key);
    }
    listen(...args) {
        this._server = http.createServer(this.requestHandle);
        return this._server.listen.apply(this._server, args);
    }
}
exports.ExpressBase = ExpressBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc0Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXhwcmVzc0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhCQUE4Qjs7QUFFOUIsZ0NBQWdDO0FBQ2hDLDZCQUE2QjtBQUc3QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7QUFNL0I7SUFNSTtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7SUFDM0MsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUF5QixFQUFFLEdBQXdCO1FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQztRQUVoRCxZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4QixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFckIsMkJBQTJCO1FBRTNCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVqQyxlQUFlO1FBQ2YsY0FBYztRQUNkLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLHNCQUFzQjtJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUN2QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRWpDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxHQUFHLENBQUMsR0FBVztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsR0FBVztRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE9BQU8sQ0FBQyxHQUFXO1FBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxPQUFPLENBQUMsR0FBVztRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxJQUFVO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQXRIRCxrQ0FzSEMifQ==