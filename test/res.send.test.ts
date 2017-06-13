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

        it('should not override Content-Type', done => {
            const app = express();
            let router = app.router;

            router.use((req, res, next) => {
                res.set('Content-Type', 'text/plain')
                    .send('hey')
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Content-Type', 'text/plain; charset=utf-8')
                .expect(200, 'hey', done)
        })

        it('should override charset in Content-Type', done => {
            const app = express();
            const router = app.router;

            router.use((req, res, next) => {
                res.set('Content-Type', 'text/plain; charset=gbk2312')
                    .send('hey')
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Content-Type', 'text/plain; charset=utf-8')
                .expect(200, 'hey', done)
        })

        it('should keep charset in Content-Type for Buffers', done => {
            const app = express();
            const router = app.router;

            router.use((req, res, next) => {
                res.set('Content-Type', 'text/plain; charset=gbk2312')
                    .send(Buffer.from('hey'))
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Content-Type', 'text/plain; charset=gbk2312')
                .expect(200, 'hey', done)
        })
    });


});