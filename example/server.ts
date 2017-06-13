import express from '../src/express'

const app = express();
const router = app.router;

router.use(function (req, res, next) {
    res.send('<p>helloworld</p>')
});

app.listen(8090);
console.log('server listening at localhost:8090');