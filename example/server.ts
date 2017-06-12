import express from '../src/express'

const app = express();
const router = app.router;

router.use(function (req, res, next) {
    try {
        res.set('Content-Type', 'text/html');
    }
    catch (e) {
    }

    res.end('1234');
});

app.listen(8090);
console.log('server listening at localhost:8090');