/// <reference types="mocha" />

import * as supertest from 'supertest'
import express from '../src/express'

describe("res.status", () => {
    let app = express();
    let router = app.router;

    router.get('/', (req, res) => {
        res.end('helloworld');
    })

    it('res.status should return 200', (done) => {
        supertest(app.requestHandle)
            .get('/').expect(200, done);
    })
});