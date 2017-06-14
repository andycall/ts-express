/// <reference types="mocha" />
import express from "../src/express";
import * as supertest from "supertest";

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
        });

        it('should coecce to a string', done => {
            const app = express();
            const router = app.router;

            router.use((req, res) => {
                res.set('X-Number', 123);
                res.end(typeof res.get('X-Number'))
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('X-Number', '123')
                .expect(200, 'string', done);
        })
    });

    describe('.set(field, value)', () => {
        it('should set multiple response header fields', done => {
            const app = express();
            const router = app.router;

            router.use((req, res) => {
                res.set('Set-Cookie', ['name=andycall', 'age=21'])
                res.send(res.get('Set-Cookie'))
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('["name=andycall","age=21"]', done)
        });

        it('should convert to an array of string', done => {
            const app = express();
            const router = app.router;

            router.use((req, res) => {
                res.set('X-Numbers', [123, 456]);
                res.end(JSON.stringify(res.get('X-Numbers')));
            });

            supertest(app.requestHandle)
                .get('/')
                .expect(200, '["123","456"]', done)
        })

        it('should not set a charset of one is already set', done => {
            const app = express()
            const router = app.router

            router.use((req, res) => {
                res.set('Content-Type', 'text/html; charset=gbk');
                res.end();
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Content-Type', 'text/html; charset=gbk')
                .expect(200, done)
        })
    })
});