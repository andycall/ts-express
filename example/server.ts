import express from '../src/express'

const app = express();
const router = app.router;

router.use(function (req, res, next) {
    next();
});

router.get('/', (req, res, next) => {
    res.write('1');
    next();
}, function (req, res) {
    res.end('2');
});

app.listen(8090);
console.log('server listening at localhost:8090');