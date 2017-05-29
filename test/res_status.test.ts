/// <reference types="mocha" />

import * as supertest from 'supertest'
import express from '../src/express'

describe("res.status", () => {
    it('res.status should return 200', () => {
        let app = express();
        return supertest(app.requestHandle).get('/');
    })
});