import express from '../src/express'

const app = express();
const router = app.router;

router.get('/', (req, res) => {
    res.end('helloworld');
});

app.listen(8090);
