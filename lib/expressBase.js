"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const _debug = require("debug");
const debug = _debug('express');
class ExpressBase {
    constructor() {
        this.cache = new Map();
        this.engines = new Map();
        this.settings = new Map();
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
    set(settings, value) {
        if (arguments.length === 1) {
            console.warn('app.set require two params.');
            return this;
        }
        debug('set %s to %o', settings, value);
        this.settings.set(settings, value);
        return this;
    }
    handle(req, res, callback) {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc0Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXhwcmVzc0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhCQUE4Qjs7QUFFOUIsZ0NBQWdDO0FBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUkvQjtJQUtJO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQztRQUVoRCxZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4QixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFckIsMkJBQTJCO1FBRTNCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVqQyxlQUFlO1FBQ2YsY0FBYztRQUNkLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLHNCQUFzQjtJQUMxQixDQUFDO0lBRUQsR0FBRyxDQUFDLFFBQWdCLEVBQUUsS0FBVTtRQUM1QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXRDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUVsQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBb0IsRUFBRSxHQUFtQixFQUFFLFFBQVk7SUFFOUQsQ0FBQztDQUNKIn0=