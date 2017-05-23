/// <reference types="mocha" />
/// <reference types="node" />

import { ExpressBase } from '../src/expressBase'
import assert = require('assert')
import { execSync } from 'child_process'

describe("Express Base", () => {
    const expressBase = new ExpressBase();

    it('app.set', () => {
        expressBase
            .set('test', 'helloworld')
            .set('test2', 'another')
    });

    it('app.get', () => {
        assert.equal(expressBase.get('test'), 'helloworld');
        assert.equal(expressBase.get('test2'), 'another');

        expressBase.enable('verbose');
        assert.equal(expressBase.enabled('verbose'), true);

        expressBase.disable('verbose');
        assert.equal(expressBase.disabled('verbose'), true);
    })

    it('app.listen()', (done) => {
        var server = expressBase.listen(9999, function() {
            server.close();
            done();
        });
    })
})