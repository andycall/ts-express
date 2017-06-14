/// <reference types="mocha" />
import express from '../src/express'
import * as supertest from 'supertest'

describe("res",  () => {
    describe(".redirect(url)", () => {
        it('should default to a 302 redirect', done => {
            const app = express();
            const router = app.router;

            router.use((req, res) => {
                res.redirect('http://www.baidu.com')
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('location', 'http://www.baidu.com')
                .expect(302, done)
        });

        it('should encode "url"', done => {
            const app = express();
            const router = app.router;

            router.use((req, res) => {
                res.redirect('https://google.com?q=\u2603 §10')
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Location', 'https://google.com?q=%E2%98%83%20%C2%A710')
                .expect(302, done)
        });

        it('should not touch already-encoded sequences in "url"', done => {
            const app = express();
            const router = app.router;

            router.use((req, res) => {
                res.redirect('https://google.com?q=%A710');
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Location', 'https://google.com?q=%A710')
                .expect(302, done);
        })
    });

    describe('.redirect(url, status)', () => {
        it('should set the response status', done => {
            const app = express()
            const router = app.router;

            router.use((req, res) => {
                res.redirect('https://google.com', 301);
            });

            supertest(app.requestHandle)
                .get('/')
                .expect('Location', 'https://google.com')
                .expect(301, done);
        })
    })
});