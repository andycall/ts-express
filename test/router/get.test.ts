/// <reference types="mocha" />

import express from '../../src/express'
import * as supertest from 'supertest'
import { equal } from 'assert'

describe('router match', () => {
    const app = express();
    const router = app.router;

    it('method: GET, path: /', (done) => {
        router.get('/', (req, res) => {
            res.end('helloworld');
        });

        supertest(app.requestHandle.bind(app))
            .get('/')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    done(err);
                }

                done();
            })
    });
});