/// <reference types="mocha" />
import express from '../src/express'
import * as supertest from 'supertest'

describe('res.set', () => {
    describe('.set(field, value)', () => {
        it('should set the response header field', done => {
            const app = express();
            const router = app.router;

            router.use((req, res, next) => {
                res.set('Content-Type', 'text/x-foo; charset=utf-8');
                res.end('1234');
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Content-Type', 'text/x-foo; charset=utf-8')
                .end(done);
        })
    })
});