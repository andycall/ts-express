/// <reference types="mocha" />
import express from '../src/express'
import * as supertest from 'supertest'

describe('app', () => {
    describe('.VERB()', () => {
        it('should not get invoked without error handler on error', done => {
            const app = express()
            const router = app.router

            router.use((req, res, next) => {
                next(new Error('boom!'))
            });

            router.get('/', (req, res) => {
                res.send('helloworld');
            });

            supertest(app.requestHandle)
                .get('/')
                .expect(500, /Error: boom!/, done);
        })
    })
})