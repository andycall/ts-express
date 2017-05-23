/// <reference types="mocha" />

import express from '../src/express'

describe("Express", () => {
    it('should be get express Instance through express()', () => {
        const app = express();
        app.listen(8080);
    });

    it('')

})