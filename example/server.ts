import express from '../src/express'

const app = express();
const router = app.router;

router.use(function (req, res, next) {
    next(new Error('1'));
});

app.listen(8090);
console.log('server listening at localhost:8090');