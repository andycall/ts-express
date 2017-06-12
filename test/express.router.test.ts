/// <reference types="mocha" />
import express from '../src/express'
import * as supertest from 'supertest'
import * as assert from 'assert'

describe('app.router', () => {
    it('should be .use()able', (done) => {
        const app = express();
        let callbacks: number[] = [];

        const router = app.router;

        router.use(function (req, res, next) {
            callbacks.push(1);
            next();
        });

        router.get('/', function (req, res, next) {
            callbacks.push(2);
            next();
        }, function (req, res, next) {
            callbacks.push(3);
            res.end('ends');
        });

        supertest(app.requestHandle)
            .get('/')
            .end(function (res) {
                assert.deepEqual(callbacks, [1, 2, 3]);
                done();
            });
    });
});