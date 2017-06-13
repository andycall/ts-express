import express from '../src/express'

const app = express();
const router = app.router;

router.use(function (req, res, next) {
    res.set('Content-Type', 'text/html; charset=gbk2312');
    res.send(Buffer.from('helloworld'))
});

app.listen(8090);
console.log('server listening at localhost:8090');