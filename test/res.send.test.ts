/// <reference types="mocha" />
import express from '../src/express'
import * as supertest from 'supertest'

describe('res', () => {
    describe('.send(nil)', () => {
        [undefined, null].forEach(i => {
            it('should set body to ""', done => {
                const app = express();
                const router = app.router;

                router.use((req, res, next) => {
                    res.send()
                });

                supertest(app.requestHandle)
                    .get('/')
                    .expect(200, '', done);
            })
        });
    });

    describe('.send(string)', () => {
        it('should send as html', done => {
            const app = express();
            let router = app.router;

            router.use((req, res, next) => {
                res.send('<p>helloworld</p>')
            })

            supertest(app.requestHandle)
                .get('/')
                .expect(200, '<p>helloworld</p>', done)
        })
    })
});