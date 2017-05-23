/// <reference types="mocha" />

import express from '../src/express'
import http = require('http')

describe("Express", () => {
    it('should be get express Instance through express()', () => {
        const app = express();
        app.listen(8080);
    });

    it('use express as http.createServer handler', () => {
        const app = express();
        const server = http.createServer(app.requestHandle);
        server.listen(8090);
    });
})