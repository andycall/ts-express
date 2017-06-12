/// <reference types="mocha" />
import express from '../src/express'
import * as supertest from 'supertest'

describe('res', () => {
    describe('.send()', () => {
        it('should set body to ""', done => {
            const app = express();
            const router = app.router;

            router.use((req, res, next) => {
                res.end()
            });

            supertest(app.requestHandle)
                .get('/')
                .expect(200, '', done);
        })
    })
});